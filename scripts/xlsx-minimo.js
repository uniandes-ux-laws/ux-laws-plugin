'use strict';
/**
 * xlsx-minimo.js — escribe un .xlsx sencillo sin dependencias.
 *
 * Un .xlsx es un zip con XML. Aquí se escribe sin comprimir (método 0) y con la
 * fecha del zip fija, de modo que la misma entrada produce siempre los mismos bytes
 * y una plantilla regenerada no aparece como cambiada en git.
 *
 * Los metadatos del documento (docProps/core.xml) se escriben con creator y
 * lastModifiedBy vacíos y sin fechas: una plantilla del panel no debe identificar a
 * quien la generó ni cuándo.
 */
const fs = require('fs');

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    let c = (crc ^ buf[i]) & 0xFF;
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xEDB88320 : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// 1 de enero de 1980, 00:00: la fecha mínima del formato zip, la misma en todas las entradas.
const FECHA_DOS = 0x0021, HORA_DOS = 0x0000;

function zip(archivos) {
  const locales = [], centrales = [];
  let off = 0;
  for (const [nombre, texto] of archivos) {
    const datos = Buffer.from(texto, 'utf8'), nb = Buffer.from(nombre, 'utf8'), crc = crc32(datos);
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6);
    lh.writeUInt16LE(HORA_DOS, 10); lh.writeUInt16LE(FECHA_DOS, 12);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(datos.length, 18); lh.writeUInt32LE(datos.length, 22); lh.writeUInt16LE(nb.length, 26);
    locales.push(lh, nb, datos);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8);
    ch.writeUInt16LE(HORA_DOS, 12); ch.writeUInt16LE(FECHA_DOS, 14);
    ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(datos.length, 20); ch.writeUInt32LE(datos.length, 24); ch.writeUInt16LE(nb.length, 28);
    ch.writeUInt32LE(off, 42);
    centrales.push(ch, nb);
    off += 30 + nb.length + datos.length;
  }
  const cuerpo = Buffer.concat(locales), dir = Buffer.concat(centrales), fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0); fin.writeUInt16LE(archivos.length, 8); fin.writeUInt16LE(archivos.length, 10);
  fin.writeUInt32LE(dir.length, 12); fin.writeUInt32LE(cuerpo.length, 16);
  return Buffer.concat([cuerpo, dir, fin]);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const columna = (i) => { let s = ''; for (i++; i > 0; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + ((i - 1) % 26)) + s; return s; };

function hojaXml(filas, opciones = {}) {
  const ancho = (opciones.anchos || []).map((w, i) => '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + w + '" customWidth="1"/>').join('');
  const cuerpo = filas.map((fila, r) => '<row r="' + (r + 1) + '">' + fila.map((v, c) => (v === '' || v === null || v === undefined)
    ? '' : '<c r="' + columna(c) + (r + 1) + '" t="inlineStr"' + (r === 0 && opciones.encabezado ? ' s="1"' : '') + '><is><t xml:space="preserve">' + esc(v) + '</t></is></c>').join('') + '</row>').join('');
  const fijar = opciones.encabezado ? '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' : '';
  const validaciones = (opciones.listas || []).map((l) => '<dataValidation type="list" allowBlank="1" showErrorMessage="1" sqref="' + l.rango + '"><formula1>"' + esc(l.valores.join(',')) + '"</formula1></dataValidation>').join('');
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    fijar + (ancho ? '<cols>' + ancho + '</cols>' : '') + '<sheetData>' + cuerpo + '</sheetData>' +
    (validaciones ? '<dataValidations count="' + opciones.listas.length + '">' + validaciones + '</dataValidations>' : '') + '</worksheet>';
}

/**
 * @param {Array<{nombre:string, filas:string[][], opciones?:object}>} hojas
 * @param {{creator?:string, lastModifiedBy?:string, extra?:Array<[string,string]>}} [meta]
 *   Solo para pruebas: imita lo que Excel escribe al guardar. Las plantillas no lo usan.
 * @returns {Buffer}
 */
function xlsx(hojas, meta = {}) {
  const n = hojas.length;
  const archivos = [
    ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
      hojas.map((_, i) => '<Override PartName="/xl/worksheets/sheet' + (i + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>').join('') +
      '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>'],
    ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>'],
    // creator y lastModifiedBy vacíos y sin fechas, a propósito.
    ['docProps/core.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:creator>' +
      esc(meta.creator || '') + '</dc:creator><cp:lastModifiedBy>' + esc(meta.lastModifiedBy || '') + '</cp:lastModifiedBy></cp:coreProperties>'],
    ...(meta.extra || []),
    ['xl/workbook.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' +
      hojas.map((h, i) => '<sheet name="' + esc(h.nombre) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '"/>').join('') + '</sheets></workbook>'],
    ['xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      hojas.map((_, i) => '<Relationship Id="rId' + (i + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + (i + 1) + '.xml"/>').join('') +
      '<Relationship Id="rId' + (n + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
    ['xl/styles.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="2"><xf/><xf fontId="1" applyFont="1"/></cellXfs></styleSheet>'],
    ...hojas.map((h, i) => ['xl/worksheets/sheet' + (i + 1) + '.xml', hojaXml(h.filas, h.opciones)]),
  ];
  return zip(archivos);
}

function escribirXlsx(destino, hojas) { fs.writeFileSync(destino, xlsx(hojas)); }

module.exports = { xlsx, escribirXlsx, zip, columna };
