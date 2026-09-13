#!/usr/bin/env node
'use strict';
/**
 * dorados-importar.js --- convierte la hoja "Calificar" de un .xlsx en el CSV
 * de niveles esperados, sin tocar una sola celda de juicio.
 *
 *   npm run dorados:importar -- david
 *   npm run dorados:importar -- dorados/dorados-MATEO.xlsx
 *   npm run dorados:importar -- --todos
 *
 * POR QUE EXISTE. Los tres estudiantes llenan una hoja de calculo, que es donde
 * se trabaja comodo, y el analisis lee CSV. La conversion a mano es justo el
 * punto donde un numero se cae de una fila y nadie lo nota.
 *
 * QUE NO HACE. No rellena, no interpreta, no corrige y no completa. Si algo no
 * cuadra, NO ESCRIBE EL CSV: falla nombrando la fila y la celda. Un CSV a medias
 * es peor que ninguno, porque el script de acuerdo lo leeria como completo.
 *
 * QUE VALIDA, y las cuatro son de metodo y no de formato:
 *   1. Setenta filas exactas, y las mismas setenta combinaciones pagina-grupo
 *      que corpus/dorados-v1.csv, en el mismo orden. Una fila reordenada o
 *      repetida cambia a que pagina pertenece un juicio.
 *   2. nivel_esperado en 0..4 o NA. Nada mas.
 *   3. trigger_esperado dentro del vocabulario del grupo --- el que la propia
 *      hoja publica en su columna "triggers validos" ---. Un trigger inventado
 *      no se puede comparar contra el que emite la skill.
 *   4. justificacion no vacia, salvo en NA, donde se exige la condicion objetiva.
 *
 * SIN DEPENDENCIAS. Un .xlsx es un zip con XML adentro, y Node trae zlib. Meter
 * una libreria de hojas de calculo para leer tres archivos le añadiria al lector
 * del plugin un arbol de dependencias que no necesita para nada mas.
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const RAIZ = path.resolve(__dirname, '..');
const DIR = path.join(RAIZ, 'dorados');
const MANIFIESTO = path.join(RAIZ, 'corpus', 'dorados-v1.csv');
const HOJA = 'Calificar';
const GRUPOS = [
  ['G1', 'Agrupacion perceptual', 'wireframe'],
  ['G2', 'Arquitectura de decision', 'wireframe'],
  ['G3', 'Capacidad y segmentacion', 'wireframe'],
  ['G4', 'Saliencia visual', 'screenshot'],
  ['G5', 'Posicion y progreso', 'wireframe'],
  ['G6', 'Economia y convencion', 'wireframe'],
  ['G7', 'Targeting motor', 'wireframe'],
];
const CABECERA = 'pagina,url,grupo,constructo,canal,nivel_esperado,trigger_esperado,justificacion';

// ----------------------------------------------------------------- zip minimo
function entradasZip(buf) {
  const fin = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (fin < 0) throw new Error('no parece un archivo .xlsx: no se encontró el directorio del zip');
  const total = buf.readUInt16LE(fin + 10);
  let p = buf.readUInt32LE(fin + 16);
  const ent = {};
  for (let i = 0; i < total; i++) {
    const nLen = buf.readUInt16LE(p + 28), eLen = buf.readUInt16LE(p + 30), cLen = buf.readUInt16LE(p + 32);
    ent[buf.toString('utf8', p + 46, p + 46 + nLen)] = {
      offset: buf.readUInt32LE(p + 42),
      metodo: buf.readUInt16LE(p + 10),
      comprimido: buf.readUInt32LE(p + 20),
    };
    p += 46 + nLen + eLen + cLen;
  }
  return ent;
}

function leerEntrada(buf, ent, nombre) {
  const e = ent[nombre];
  if (!e) throw new Error('el .xlsx no contiene ' + nombre);
  const o = e.offset;
  const nLen = buf.readUInt16LE(o + 26), eLen = buf.readUInt16LE(o + 28);
  const ini = o + 30 + nLen + eLen;
  const datos = buf.slice(ini, ini + e.comprimido);
  if (e.metodo === 0) return datos.toString('utf8');
  if (e.metodo === 8) return zlib.inflateRawSync(datos).toString('utf8');
  throw new Error('método de compresión ' + e.metodo + ' no soportado en ' + nombre);
}

const desescapar = (s) => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
  .replace(/&amp;/g, '&');

/** Devuelve las filas de la hoja pedida como mapas columna -> texto. */
function leerHoja(archivo, nombreHoja) {
  const buf = fs.readFileSync(archivo);
  const ent = entradasZip(buf);

  const wb = leerEntrada(buf, ent, 'xl/workbook.xml');
  const hoja = [...wb.matchAll(/<sheet[^>]*name="([^"]+)"[^>]*r:id="([^"]+)"/g)].find((m) => m[1] === nombreHoja);
  if (!hoja) {
    const nombres = [...wb.matchAll(/<sheet[^>]*name="([^"]+)"/g)].map((m) => m[1]);
    throw new Error('el archivo no tiene una hoja llamada "' + nombreHoja + '". Tiene: ' + nombres.join(', '));
  }
  const rels = leerEntrada(buf, ent, 'xl/_rels/workbook.xml.rels');
  const rel = [...rels.matchAll(/Id="([^"]+)"[^>]*Target="([^"]+)"/g)].find((m) => m[1] === hoja[2]);
  if (!rel) throw new Error('la hoja "' + nombreHoja + '" no tiene destino en workbook.xml.rels');

  let compartidas = [];
  if (ent['xl/sharedStrings.xml']) {
    compartidas = [...leerEntrada(buf, ent, 'xl/sharedStrings.xml').matchAll(/<si>([\s\S]*?)<\/si>/g)]
      .map((m) => desescapar(m[1].replace(/<[^>]+>/g, '')));
  }

  const xml = leerEntrada(buf, ent, 'xl/' + rel[2].replace(/^\/?xl\//, ''));
  const filas = [];
  for (const f of xml.matchAll(/<row r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)) {
    const celdas = {};
    // Las celdas vacias vienen auto-cerradas --- <c r="H2" s="13"/> --- y hay que
    // aceptarlas: si el patron exige </c>, las columnas se desplazan y el valor
    // de una columna aparece bajo el nombre de otra.
    for (const c of f[2].matchAll(/<c r="([A-Z]+)\d+"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const tipo = (c[2].match(/t="(\w+)"/) || [])[1];
      const cuerpo = c[3] || '';
      const v = (cuerpo.match(/<v>([^<]*)<\/v>/) || [])[1];
      const inline = (cuerpo.match(/<is>[\s\S]*?<t[^>]*>([\s\S]*?)<\/t>/) || [])[1];
      let valor = '';
      if (inline !== undefined) valor = desescapar(inline);
      else if (v !== undefined) valor = tipo === 's' ? (compartidas[+v] || '') : desescapar(v);
      celdas[c[1]] = valor.trim();
    }
    filas.push({ n: +f[1], celdas });
  }
  return filas;
}

// ------------------------------------------------------------------ validacion
function importar(archivo, destino) {
  const paginas = fs.readFileSync(MANIFIESTO, 'utf8').replace(/\r\n/g, '\n').trim().split('\n').slice(1)
    .map((l) => l.split(','));
  const esperadas = [];
  for (const p of paginas) for (const g of GRUPOS) esperadas.push({ pagina: p[0], url: p[2], grupo: g[0], constructo: g[1], canal: g[2] });

  const filas = leerHoja(archivo, HOJA);
  if (!filas.length) throw new Error('la hoja "' + HOJA + '" está vacía');

  const cabecera = filas[0].celdas;
  const col = {};
  for (const [letra, texto] of Object.entries(cabecera)) col[texto.toLowerCase()] = letra;
  for (const req of ['pagina', 'grupo', 'nivel_esperado', 'trigger_esperado', 'justificacion']) {
    if (!col[req]) throw new Error('la hoja no tiene una columna "' + req + '" en su primera fila');
  }
  const colTriggers = col['triggers validos'] || col['triggers válidos'] || null;

  const datos = filas.slice(1).filter((f) => Object.values(f.celdas).some((v) => v !== ''));
  const problemas = [];

  if (datos.length !== esperadas.length) {
    problemas.push('la hoja tiene ' + datos.length + ' filas con contenido y se esperaban ' + esperadas.length +
      ' (10 páginas × 7 grupos). No se importa una hoja con filas de más o de menos: cambiaría a qué página pertenece cada juicio.');
  }

  const salida = [];
  datos.forEach((f, i) => {
    const e = esperadas[i];
    const fila = 'fila ' + f.n;
    if (!e) return;
    const pagina = f.celdas[col['pagina']] || '';
    const grupo = f.celdas[col['grupo']] || '';
    if (pagina !== e.pagina || grupo !== e.grupo) {
      problemas.push(fila + ': dice ' + (pagina || '(vacío)') + '/' + (grupo || '(vacío)') +
        ' y en ese lugar va ' + e.pagina + '/' + e.grupo + '. El orden de las filas no se puede alterar.');
      return;
    }

    const nivel = (f.celdas[col['nivel_esperado']] || '').toUpperCase();
    const trigger = f.celdas[col['trigger_esperado']] || '';
    const just = f.celdas[col['justificacion']] || '';

    if (nivel === '') problemas.push(fila + ' (' + e.pagina + '/' + e.grupo + '): nivel_esperado vacío');
    else if (!/^[0-4]$/.test(nivel) && nivel !== 'NA') {
      problemas.push(fila + ' (' + e.pagina + '/' + e.grupo + '): nivel_esperado "' + nivel + '" no es 0, 1, 2, 3, 4 ni NA');
    }

    if (nivel !== 'NA' && nivel !== '') {
      if (!trigger) problemas.push(fila + ' (' + e.pagina + '/' + e.grupo + '): falta trigger_esperado');
      else if (colTriggers) {
        const vocab = (f.celdas[colTriggers] || '').split(/[·|,;]/).map((s) => s.trim()).filter(Boolean);
        if (vocab.length && !vocab.includes(trigger)) {
          problemas.push(fila + ' (' + e.pagina + '/' + e.grupo + '): trigger "' + trigger +
            '" no está en el vocabulario del grupo: ' + vocab.join(', '));
        }
      }
    }

    if (!just) {
      problemas.push(fila + ' (' + e.pagina + '/' + e.grupo + '): justificación vacía' +
        (nivel === 'NA' ? '. En NA se escribe la condición objetiva de no aplicabilidad.' : ''));
    }

    const csv = (s) => (/[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s);
    salida.push([e.pagina, e.url, e.grupo, e.constructo, e.canal, nivel, trigger, just].map(csv).join(','));
  });

  if (problemas.length) {
    console.error('\nNO SE IMPORTÓ ' + path.basename(archivo) + '. ' + problemas.length + ' problema(s):\n');
    for (const p of problemas.slice(0, 20)) console.error('  ' + p);
    if (problemas.length > 20) console.error('  … y ' + (problemas.length - 20) + ' más');
    console.error('\nNo se escribe un CSV a medias: el cálculo de acuerdo lo leería como completo.');
    return false;
  }

  fs.writeFileSync(destino, CABECERA + '\n' + salida.join('\n') + '\n');
  console.log('ok  ' + path.basename(archivo) + ' -> ' + path.relative(RAIZ, destino) + '  (' + salida.length + ' filas)');
  return true;
}

// ----------------------------------------------------------------------- CLI
const NOMBRES = { david: 'DAVID', mateo: 'MATEO', juanfrancisco: 'JUANFRANCISCO' };
const args = process.argv.slice(2);
let trabajos = [];

if (args.includes('--todos')) {
  trabajos = Object.entries(NOMBRES).map(([k, v]) => [path.join(DIR, 'dorados-' + v + '.xlsx'), path.join(DIR, 'esperados-' + k + '.csv')]);
} else {
  const a = args.find((x) => !x.startsWith('--'));
  if (!a) {
    console.error('uso: npm run dorados:importar -- <david|mateo|juanfrancisco|ruta.xlsx>');
    console.error('     npm run dorados:importar -- --todos');
    process.exit(1);
  }
  const clave = a.toLowerCase().replace(/\.xlsx$/, '');
  if (NOMBRES[clave]) trabajos = [[path.join(DIR, 'dorados-' + NOMBRES[clave] + '.xlsx'), path.join(DIR, 'esperados-' + clave + '.csv')]];
  else {
    const base = path.basename(a).toLowerCase();
    const quien = Object.keys(NOMBRES).find((k) => base.includes(k));
    if (!quien) { console.error('no puedo deducir de quién es ' + a + '. Use david, mateo o juanfrancisco.'); process.exit(1); }
    trabajos = [[path.resolve(a), path.join(DIR, 'esperados-' + quien + '.csv')]];
  }
}

let malos = 0;
for (const [origen, destino] of trabajos) {
  if (!fs.existsSync(origen)) { console.error('FALTA  ' + path.relative(RAIZ, origen)); malos++; continue; }
  try { if (!importar(origen, destino)) malos++; }
  catch (e) { console.error('FALLA  ' + path.basename(origen) + ': ' + e.message); malos++; }
}
process.exit(malos === 0 ? 0 : 1);
