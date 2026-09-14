#!/usr/bin/env node
'use strict';
/**
 * dorados-selftest.js --- prueba de scripts/dorados-importar.js.
 *
 *   npm run dorados:selftest
 *
 * DONDE ESCRIBE. En un directorio temporal creado con fs.mkdtempSync y nada mas.
 * Ninguna prueba apunta a dorados/esperados-*.csv, y hay una asercion explicita
 * que lo comprueba: el 13 de septiembre de 2026 una prueba del camino feliz
 * escribio sobre dorados/esperados-david.csv. Estaba vacio, asi que no se perdio
 * nada, pero con la hoja llena se habria perdido el trabajo de un estudiante y la
 * corrida habria dicho "ok". Ese fue el riesgo real, no el parser.
 *
 * DE DONDE SALEN LAS HOJAS. Se construyen aqui: un .xlsx es un zip con XML, y un
 * zip con metodo 0 --- sin comprimir --- se escribe en cuarenta lineas. Una hoja
 * de prueba versionada en binario no se puede revisar en un diff; esta se lee.
 *
 * QUE PRUEBA, y las cinco son de metodo:
 *   1. Camino feliz: setenta filas validas entran y salen setenta filas de CSV.
 *   2. Tres errores sembrados --- nivel 7, trigger inventado, justificacion
 *      vacia --- se detectan los tres y NO se escribe el CSV.
 *   3. Celdas vacias auto-cerradas (<c r="H2" s="13"/>) no desplazan columnas.
 *      Es la regresion concreta: con un patron que exija </c>, el valor de
 *      trigger_esperado aparece bajo nivel_esperado y la hoja pasa validacion
 *      con los datos cambiados de sitio.
 *   4. La guarda: un destino con juicios escritos se rechaza nombrando cuantas
 *      filas, y no se toca el archivo.
 *   5. --force si sobrescribe, porque una guarda sin salida se termina evadiendo
 *      comentando la linea.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const { importar, GRUPOS, MANIFIESTO } = require('./dorados-importar.js');

const VOCAB = {
  G1: 'C1 · C2 · C3 · C4 · conflicto · ninguna',
  G2: 'n1 · agrupacion · dominancia · Ap · ninguna',
  G3: 'U · segmentacion · B · H · V · X · carga_extrinseca_estructural · ninguna',
  G4: 'Bn · I · P · Cn · ninguna',
  G5: 'G_existe · G_nombra · G_actual · G_forma · J_inicio · lista_plana · ninguna',
  G6: 'R · T · K · ninguna',
  G7: 'W_min · holgura · S_min · consistencia · ninguna',
};

// --------------------------------------------------------------- zip minimo
function crc32(buf) {
  let c, crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = (crc ^ buf[i]) & 0xFF;
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xEDB88320 : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function escribirZip(destino, archivos) {
  const locales = [], centrales = [];
  let off = 0;
  for (const [nombre, texto] of Object.entries(archivos)) {
    const datos = Buffer.from(texto, 'utf8');
    const nb = Buffer.from(nombre, 'utf8');
    const crc = crc32(datos);
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(datos.length, 18);
    lh.writeUInt32LE(datos.length, 22); lh.writeUInt16LE(nb.length, 26);
    locales.push(lh, nb, datos);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6);
    ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(datos.length, 20);
    ch.writeUInt32LE(datos.length, 24); ch.writeUInt16LE(nb.length, 28);
    ch.writeUInt32LE(off, 42);
    centrales.push(ch, nb);
    off += 30 + nb.length + datos.length;
  }
  const cuerpo = Buffer.concat(locales), dir = Buffer.concat(centrales);
  const fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0);
  const n = Object.keys(archivos).length;
  fin.writeUInt16LE(n, 8); fin.writeUInt16LE(n, 10);
  fin.writeUInt32LE(dir.length, 12); fin.writeUInt32LE(cuerpo.length, 16);
  fs.writeFileSync(destino, Buffer.concat([cuerpo, dir, fin]));
}

// -------------------------------------------------------------- la hoja
const L = 'ABCDEFGHIJKL'.split('');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Celda con texto; si el texto esta vacio se emite auto-cerrada, que es lo que
 *  hace Excel de verdad y lo que rompio el parser la primera vez. */
const celda = (ref, txt) => (txt === ''
  ? '<c r="' + ref + '" s="13"/>'
  : '<c r="' + ref + '" t="inlineStr"><is><t>' + esc(txt) + '</t></is></c>');

const CABECERA_HOJA = ['pagina', 'sitio', 'url (solo referencia)', 'grupo', 'constructo',
  'canal', 'Que mirar', 'nivel_esperado', 'trigger_esperado', 'justificacion',
  'triggers validos', 'Cuando es NA'];

/**
 * Construye una hoja "Calificar" de setenta filas.
 * @param {object} defectos  fila (1-based dentro de las setenta) -> parche
 */
function construirHoja(destino, defectos) {
  const paginas = fs.readFileSync(MANIFIESTO, 'utf8').replace(/\r\n/g, '\n')
    .trim().split('\n').slice(1).map((l) => l.split(','));

  let filas = '<row r="1">' + CABECERA_HOJA.map((t, i) => celda(L[i] + '1', t)).join('') + '</row>';
  let i = 0;
  for (const p of paginas) {
    for (const g of GRUPOS) {
      i++;
      const r = i + 1;
      const vocab = VOCAB[g[0]].split('·').map((s) => s.trim());
      const base = {
        nivel: String(i % 5),
        trigger: vocab[i % (vocab.length - 1)],
        just: 'Justificacion de prueba para ' + p[0] + ' ' + g[0] + '.',
      };
      const v = Object.assign(base, (defectos && defectos[i]) || {});
      const vals = [p[0], p[1], p[2], g[0], g[1], g[2], 'dorados/' + p[0] + '/wireframe.png',
        v.nivel, v.trigger, v.just, VOCAB[g[0]], 'condicion objetiva del grupo'];
      filas += '<row r="' + r + '">' + vals.map((t, k) => celda(L[k] + r, t)).join('') + '</row>';
    }
  }

  escribirZip(destino, {
    '[Content_Types].xml': '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
    '_rels/.rels': '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
    'xl/workbook.xml': '<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Calificar" sheetId="1" r:id="rId1"/></sheets></workbook>',
    'xl/_rels/workbook.xml.rels': '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',
    'xl/worksheets/sheet1.xml': '<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>' + filas + '</sheetData></worksheet>',
  });
}

// --------------------------------------------------------------- aserciones
let fallas = 0;
function comprobar(nombre, condicion, detalle) {
  if (condicion) console.log('  ok    ' + nombre);
  else { console.log('  FALLA ' + nombre + (detalle ? ' — ' + detalle : '')); fallas++; }
}

/** Captura lo que el importador escribe en stderr, que es donde reporta. */
function correr(origen, destino, opciones) {
  const lineas = [];
  const orig = console.error;
  console.error = (...a) => lineas.push(a.join(' '));
  const origLog = console.log;
  console.log = () => {};
  let ok;
  try { ok = importar(origen, destino, opciones); }
  finally { console.error = orig; console.log = origLog; }
  return { ok, salida: lineas.join('\n') };
}

const DORADOS = path.join(RAIZ, 'dorados');

/** sha256 de cada CSV de dorados/, para comprobar al final que nada se movio. */
function huellaDorados() {
  const crypto = require('crypto');
  const h = {};
  for (const f of fs.readdirSync(DORADOS).filter((f) => f.endsWith('.csv'))) {
    h[f] = crypto.createHash('sha256').update(fs.readFileSync(path.join(DORADOS, f))).digest('hex');
  }
  return h;
}

function main() {
  const antesDorados = huellaDorados();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dorados-selftest-'));
  const hoja = (n) => path.join(tmp, n + '.xlsx');
  const csv = (n) => path.join(tmp, n + '.csv');
  console.log('temporal  ' + tmp + '\n');

  // 0. Ninguna ruta de esta prueba cae dentro de dorados/.
  const rutas = [hoja('x'), csv('x'), tmp];
  comprobar('ninguna ruta de prueba apunta a dorados/',
    rutas.every((r) => !path.resolve(r).startsWith(DORADOS)));

  // 1. Camino feliz.
  construirHoja(hoja('valida'), null);
  const r1 = correr(hoja('valida'), csv('valida'));
  const filas1 = fs.existsSync(csv('valida'))
    ? fs.readFileSync(csv('valida'), 'utf8').trim().split('\n').length - 1 : 0;
  comprobar('hoja valida: importa', r1.ok === true, r1.salida);
  comprobar('hoja valida: setenta filas', filas1 === 70, 'escribio ' + filas1);

  // 2. Tres errores sembrados, uno de cada clase.
  construirHoja(hoja('rota'), {
    4: { nivel: '7' },
    9: { trigger: 'inventado' },
    13: { just: '' },
  });
  const r2 = correr(hoja('rota'), csv('rota'));
  comprobar('hoja rota: no importa', r2.ok === false);
  comprobar('hoja rota: no deja CSV a medias', !fs.existsSync(csv('rota')));
  comprobar('hoja rota: detecta el nivel 7', /no es 0, 1, 2, 3, 4 ni NA/.test(r2.salida));
  comprobar('hoja rota: detecta el trigger inventado', /no está en el vocabulario/.test(r2.salida));
  comprobar('hoja rota: detecta la justificacion vacia', /justificación vacía/.test(r2.salida));

  // 3. Celdas auto-cerradas: nivel vacio con trigger lleno en la fila siguiente.
  //    Si el parser desplaza columnas, el trigger se lee como nivel y el error
  //    reportado deja de ser "nivel vacio" para pasar a ser un nivel invalido.
  construirHoja(hoja('vacias'), { 5: { nivel: '', trigger: 'Bn' } });
  const r3 = correr(hoja('vacias'), csv('vacias'));
  comprobar('celdas auto-cerradas: reporta nivel vacio',
    /nivel_esperado vacío/.test(r3.salida), r3.salida);
  comprobar('celdas auto-cerradas: no lee el trigger como nivel',
    !/nivel_esperado "BN"/i.test(r3.salida), r3.salida);

  // 4. La guarda de sobrescritura.
  const antes = fs.readFileSync(csv('valida'), 'utf8');
  const r4 = correr(hoja('valida'), csv('valida'));
  comprobar('guarda: rechaza un destino con juicios', r4.ok === false);
  comprobar('guarda: dice cuantas filas', /ya tiene 70 fila\(s\) con juicio/.test(r4.salida), r4.salida);
  comprobar('guarda: menciona --force', /--force/.test(r4.salida));
  comprobar('guarda: no toca el archivo', fs.readFileSync(csv('valida'), 'utf8') === antes);

  // 5. --force si sobrescribe.
  const r5 = correr(hoja('valida'), csv('valida'), { forzar: true });
  comprobar('--force: sobrescribe', r5.ok === true, r5.salida);
  comprobar('--force: avisa de las filas pisadas', /AVISO {2}--force/.test(r5.salida));

  // 6. Una plantilla vacia no dispara la guarda: sus setenta filas no son juicios.
  fs.writeFileSync(csv('plantilla'),
    fs.readFileSync(path.join(DORADOS, 'esperados-david.csv'), 'utf8'));
  const r6 = correr(hoja('valida'), csv('plantilla'));
  comprobar('plantilla vacia: la guarda no la confunde con juicios', r6.ok === true, r6.salida);

  // 7. dorados/ quedo byte a byte como estaba. Se compara contra la huella
  //    tomada al empezar, no contra "vacio": cuando los tres llenen sus hojas,
  //    la prueba tiene que seguir siendo valida sin reescribirla.
  const despues = huellaDorados();
  const tocados = Object.keys(antesDorados).filter((f) => antesDorados[f] !== despues[f])
    .concat(Object.keys(despues).filter((f) => !(f in antesDorados)));
  comprobar('dorados/ byte a byte igual que antes de la prueba', tocados.length === 0,
    'cambiaron: ' + tocados.join(', '));

  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('\n' + (fallas ? fallas + ' FALLA(S)' : 'todo ok') + '  ·  temporal borrado');
  return fallas ? 1 : 0;
}

if (require.main === module) process.exit(main());
