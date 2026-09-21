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
 * Y NO PISA UN JUICIO YA ESCRITO. Si el CSV destino ya tiene celdas de juicio
 * llenas, aborta diciendo cuantas filas, y solo --force sobrescribe. La razon es
 * un incidente real: una prueba del camino feliz del 13 de septiembre de 2026
 * escribio sobre dorados/esperados-david.csv, que estaba vacio y por eso no se
 * perdio nada. Con la hoja llena se habria perdido el trabajo de un estudiante
 * sin dejar rastro en la corrida. El parser no era el riesgo; el destino si. Las
 * pruebas viven en scripts/dorados-selftest.js y escriben en un directorio
 * temporal: ninguna vuelve a apuntar a dorados/.
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

/** Prefijo de espacio de nombres opcional en una etiqueta XML: x:, s:, etc. */
const P = '(?:[A-Za-z_][\\w.-]*:)?';

const desescapar = (s) => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
  .replace(/&amp;/g, '&');

/** Devuelve las filas de la hoja pedida como mapas columna -> texto. */
function leerHoja(archivo, nombreHoja) {
  const buf = fs.readFileSync(archivo);
  const ent = entradasZip(buf);

  const wb = leerEntrada(buf, ent, 'xl/workbook.xml');
  // Las etiquetas pueden venir con prefijo de espacio de nombres --- <x:sheet>,
  // <x:row>, <x:c> --- y eso es OOXML valido. Lo escriben los generadores que no
  // son Excel de escritorio (el SDK de OpenXML, Excel en la web). El 21 de
  // septiembre de 2026 una hoja real llego asi y el importador, que buscaba
  // <sheet> literal, respondio que no tenia ninguna hoja. P es el prefijo opcional.
  const hoja = [...wb.matchAll(new RegExp('<' + P + 'sheet\\b[^>]*name="([^"]+)"[^>]*r:id="([^"]+)"', 'g'))].find((m) => m[1] === nombreHoja);
  if (!hoja) {
    const nombres = [...wb.matchAll(new RegExp('<' + P + 'sheet\\b[^>]*name="([^"]+)"', 'g'))].map((m) => m[1]);
    throw new Error('el archivo no tiene una hoja llamada "' + nombreHoja + '". Tiene: ' + nombres.join(', '));
  }
  const rels = leerEntrada(buf, ent, 'xl/_rels/workbook.xml.rels');
  // Id y Target se leen por separado dentro de cada <Relationship/>: el orden de
  // los atributos no esta fijado por el estandar, y Excel, openpyxl y el SDK de
  // OpenXML los escriben en ordenes distintos. Un patron que exige Id antes que
  // Target rechazo dos hojas reales el 21 de septiembre de 2026.
  const rel = [...rels.matchAll(new RegExp('<' + P + 'Relationship\\b([^>]*)', 'g'))]
    .map((m) => [null, (m[1].match(/\bId="([^"]+)"/) || [])[1], (m[1].match(/\bTarget="([^"]+)"/) || [])[1]])
    .find((m) => m[1] === hoja[2] && m[2]);
  if (!rel) throw new Error('la hoja "' + nombreHoja + '" no tiene destino en workbook.xml.rels');

  let compartidas = [];
  if (ent['xl/sharedStrings.xml']) {
    compartidas = [...leerEntrada(buf, ent, 'xl/sharedStrings.xml').matchAll(new RegExp('<' + P + 'si>([\\s\\S]*?)</' + P + 'si>', 'g'))]
      .map((m) => desescapar(m[1].replace(/<[^>]+>/g, '')));
  }

  const xml = leerEntrada(buf, ent, 'xl/' + rel[2].replace(/^\/?xl\//, ''));
  const filas = [];
  for (const f of xml.matchAll(new RegExp('<' + P + 'row r="(\\d+)"[^>]*>([\\s\\S]*?)</' + P + 'row>', 'g'))) {
    const celdas = {};
    // Las celdas vacias vienen auto-cerradas --- <c r="H2" s="13"/> --- y hay que
    // aceptarlas: si el patron exige </c>, las columnas se desplazan y el valor
    // de una columna aparece bajo el nombre de otra.
    for (const c of f[2].matchAll(new RegExp('<' + P + 'c r="([A-Z]+)\\d+"([^>]*?)(?:/>|>([\\s\\S]*?)</' + P + 'c>)', 'g'))) {
      const tipo = (c[2].match(/t="(\w+)"/) || [])[1];
      const cuerpo = c[3] || '';
      const v = (cuerpo.match(new RegExp('<' + P + 'v>([^<]*)</' + P + 'v>')) || [])[1];
      const inline = (cuerpo.match(new RegExp('<' + P + 'is>[\\s\\S]*?<' + P + 't[^>]*>([\\s\\S]*?)</' + P + 't>')) || [])[1];
      let valor = '';
      if (inline !== undefined) valor = desescapar(inline);
      else if (v !== undefined) valor = tipo === 's' ? (compartidas[+v] || '') : desescapar(v);
      celdas[c[1]] = valor.trim();
    }
    filas.push({ n: +f[1], celdas });
  }
  return filas;
}

// ------------------------------------------------------- guarda de sobrescritura
/** Parte una linea de CSV respetando las comillas. */
function partirCsv(linea) {
  const campos = [];
  let campo = '', comillas = false;
  for (let i = 0; i < linea.length; i++) {
    const c = linea[i];
    if (comillas) {
      if (c === '"') { if (linea[i + 1] === '"') { campo += '"'; i++; } else comillas = false; }
      else campo += c;
    } else if (c === '"') comillas = true;
    else if (c === ',') { campos.push(campo); campo = ''; }
    else campo += c;
  }
  campos.push(campo);
  return campos;
}

/**
 * Cuenta las filas del CSV destino que ya tienen algun juicio escrito ---
 * nivel_esperado, trigger_esperado o justificacion ---. Las cinco primeras
 * columnas son identidad de la fila y las pone la plantilla, asi que no cuentan:
 * una plantilla recien generada tiene setenta filas y cero juicios.
 */
function celdasDeJuicioLlenas(destino) {
  if (!fs.existsSync(destino)) return 0;
  const lineas = fs.readFileSync(destino, 'utf8').replace(/\r\n/g, '\n').trim().split('\n');
  if (lineas.length < 2) return 0;
  const cab = partirCsv(lineas[0]);
  const idx = ['nivel_esperado', 'trigger_esperado', 'justificacion']
    .map((n) => cab.indexOf(n)).filter((i) => i >= 0);
  if (!idx.length) return 0;
  let llenas = 0;
  for (const l of lineas.slice(1)) {
    const c = partirCsv(l);
    if (idx.some((i) => (c[i] || '').trim() !== '')) llenas++;
  }
  return llenas;
}

// ------------------------------------------------------------------ validacion
function importar(archivo, destino, opciones) {
  // La guarda va antes de leer el .xlsx: lo que se protege es el destino, y una
  // hoja invalida no deberia ni llegar a la pregunta de si pisa algo.
  const forzar = !!(opciones && opciones.forzar);
  const llenas = celdasDeJuicioLlenas(destino);
  if (llenas && !forzar) {
    console.error('\nNO SE IMPORTÓ ' + path.basename(archivo) + '.');
    console.error('  ' + path.relative(RAIZ, destino) + ' ya tiene ' + llenas +
      ' fila(s) con juicio escrito, y sobrescribirlo las perdería sin dejar rastro.');
    console.error('  Si de verdad quiere reemplazarlas por lo que dice la hoja, repita con --force.');
    return false;
  }
  if (llenas && forzar) {
    console.error('AVISO  --force: se sobrescriben ' + llenas + ' fila(s) con juicio en ' +
      path.relative(RAIZ, destino) + '.');
  }
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

  // Una fila de datos se identifica por su clave: la columna pagina. La
  // plantilla trae, debajo de las setenta filas, un contador ("Filas completas:
  // 70 de 70") que tiene contenido pero no es un juicio; contarlo como fila hizo
  // que las tres hojas reales del 21 de septiembre se rechazaran por tener 71.
  // Lo que no se tolera es un juicio sin clave: una fila sin pagina cuyo
  // nivel_esperado es un nivel valido es un juicio desplazado, y se reporta.
  const conContenido = filas.slice(1).filter((f) => Object.values(f.celdas).some((v) => v !== ''));
  const datos = conContenido.filter((f) => (f.celdas[col['pagina']] || '') !== '');
  const problemas = [];
  for (const f of conContenido) {
    if ((f.celdas[col['pagina']] || '') !== '') continue;
    const nv = (f.celdas[col['nivel_esperado']] || '').toUpperCase();
    if (/^([0-4]|NA)$/.test(nv)) {
      problemas.push('fila ' + f.n + ': tiene nivel_esperado "' + nv + '" pero no tiene pagina. ' +
        'Es un juicio sin fila de destino; no se descarta en silencio.');
    }
  }

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

function main(argv) {
  const args = argv.slice(2);
  const forzar = args.includes('--force');
  let trabajos = [];

  if (args.includes('--todos')) {
    trabajos = Object.entries(NOMBRES).map(([k, v]) => [path.join(DIR, 'dorados-' + v + '.xlsx'), path.join(DIR, 'esperados-' + k + '.csv')]);
  } else {
    const a = args.find((x) => !x.startsWith('--'));
    if (!a) {
      console.error('uso: npm run dorados:importar -- <david|mateo|juanfrancisco|ruta.xlsx> [--force]');
      console.error('     npm run dorados:importar -- --todos');
      return 1;
    }
    const clave = a.toLowerCase().replace(/\.xlsx$/, '');
    if (NOMBRES[clave]) trabajos = [[path.join(DIR, 'dorados-' + NOMBRES[clave] + '.xlsx'), path.join(DIR, 'esperados-' + clave + '.csv')]];
    else {
      const base = path.basename(a).toLowerCase();
      const quien = Object.keys(NOMBRES).find((k) => base.includes(k));
      if (!quien) { console.error('no puedo deducir de quién es ' + a + '. Use david, mateo o juanfrancisco.'); return 1; }
      trabajos = [[path.resolve(a), path.join(DIR, 'esperados-' + quien + '.csv')]];
    }
  }

  let malos = 0;
  for (const [origen, destino] of trabajos) {
    if (!fs.existsSync(origen)) { console.error('FALTA  ' + path.relative(RAIZ, origen)); malos++; continue; }
    try { if (!importar(origen, destino, { forzar })) malos++; }
    catch (e) { console.error('FALLA  ' + path.basename(origen) + ': ' + e.message); malos++; }
  }
  return malos === 0 ? 0 : 1;
}

module.exports = { importar, leerHoja, celdasDeJuicioLlenas, GRUPOS, CABECERA, HOJA, MANIFIESTO };

if (require.main === module) process.exit(main(process.argv));
