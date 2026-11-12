'use strict';
/**
 * panel-comun.js — lo que comparten la plantilla, el importador y el acuerdo del
 * panel de seis evaluadores externos.
 *
 * ANONIMATO. El equipo escoge a los evaluadores y sabe quiénes son. Lo anónimo es lo
 * que se guarda y se publica: cada evaluador es E1…E6 y nada más. La tabla que asocia
 * E1…E6 con personas no entra al repositorio (ver panel/README.md).
 *
 * UNIDADES. Las 30 páginas del corpus sellado (corpus/corpus-v1.csv) por los siete
 * grupos: 210 filas por evaluador, en el orden del manifiesto y G1…G7. Los
 * evaluadores puntúan la página renderizada, nunca el wireframe.
 *
 * TRIGGERS. G2–G7 salen de esquemaPara(), el código que define los esquemas de
 * respuesta vigentes, de modo que la plantilla sigue al contrato si este cambia. G1
 * no tiene enumeración en su esquema; su lista es la de su rúbrica,
 * skills/g1-agrupacion-perceptual/SKILL.md:236-237.
 */
const fs = require('fs'), path = require('path');
const { GRUPOS: GRUPOS_EJECUCION, esquemaPara } = require('./execution-options');

const RAIZ = path.resolve(__dirname, '..');
const MANIFIESTO = path.join(RAIZ, 'corpus', 'corpus-v1.csv');
const EVALUADORES = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'];
const NOMBRE_VALIDO = /^panel-(E[1-6])\.xlsx$/;
const COLUMNAS = ['evaluador', 'pagina', 'grupo', 'nivel', 'trigger', 'justificacion'];
const HOJA = 'Calificar';
const NIVELES = ['0', '1', '2', '3', '4', 'NA'];
const TRIGGERS_G1 = ['C1', 'C2', 'C3', 'C4', 'conflicto', 'ninguna'];   // SKILL.md:236-237

function triggersDe(esquema) {
  const out = new Set();
  (function recorrer(o) {
    if (!o || typeof o !== 'object') return;
    for (const [k, v] of Object.entries(o)) {
      if (k === 'trigger' && v && typeof v === 'object') {
        for (const x of v.enum || []) if (x !== null) out.add(x);
        for (const alt of v.anyOf || v.oneOf || []) for (const x of alt.enum || []) if (x !== null) out.add(x);
      }
      recorrer(v);
    }
  })(esquema);
  return [...out];
}

/** [{id:'G1', clave:'g1', nombre, canal, triggers:[...]}] en orden G1…G7. */
function grupos() {
  return GRUPOS_EJECUCION.map((g) => {
    const canal = g.id === 'g4' ? 'screenshot' : 'wireframe';
    const triggers = g.id === 'g1' ? TRIGGERS_G1 : triggersDe(esquemaPara(g.id, canal));
    if (!triggers.length) throw Error('Sin vocabulario de trigger para ' + g.id);
    return { id: g.id.toUpperCase(), clave: g.id, nombre: g.nombre, canal, triggers };
  });
}

/** Páginas del corpus en el orden del manifiesto: [{id, url}]. */
function paginas(manifiesto = MANIFIESTO) {
  const lineas = fs.readFileSync(manifiesto, 'utf8').replace(/\r\n/g, '\n').trim().split('\n');
  const cab = lineas[0].split(','), iId = cab.indexOf('id'), iUrl = cab.indexOf('url');
  return lineas.slice(1).map((l) => l.split(',')).map((c) => ({ id: c[iId], url: c[iUrl] }));
}

/** Las 210 unidades (pagina, grupo) en el orden de la plantilla. */
function unidades(manifiesto = MANIFIESTO) {
  const gs = grupos();
  return paginas(manifiesto).flatMap((p) => gs.map((g) => ({ pagina: p.id, grupo: g.id })));
}

/** Parte una línea de CSV respetando comillas. */
function partirCsv(linea) {
  const campos = []; let campo = '', comillas = false;
  for (let i = 0; i < linea.length; i++) {
    const c = linea[i];
    if (comillas) { if (c === '"') { if (linea[i + 1] === '"') { campo += '"'; i++; } else comillas = false; } else campo += c; }
    else if (c === '"') comillas = true;
    else if (c === ',') { campos.push(campo); campo = ''; }
    else campo += c;
  }
  campos.push(campo);
  return campos;
}

const csvCampo = (s) => (/[",\n\r]/.test(s) ? '"' + String(s).replace(/"/g, '""') + '"' : String(s));

/** Lee un CSV de respuestas del panel como lista de objetos por columna. */
function leerRespuestas(archivo) {
  // Las justificaciones pueden tener saltos de línea dentro de comillas: se parte a mano.
  const texto = fs.readFileSync(archivo, 'utf8').replace(/\r\n/g, '\n');
  const filas = []; let actual = '', comillas = false;
  for (const ch of texto) {
    if (ch === '"') comillas = !comillas;
    if (ch === '\n' && !comillas) { if (actual) filas.push(actual); actual = ''; } else actual += ch;
  }
  if (actual) filas.push(actual);
  const cab = partirCsv(filas[0]);
  return filas.slice(1).map((l) => Object.fromEntries(partirCsv(l).map((v, i) => [cab[i], v])));
}

module.exports = { RAIZ, MANIFIESTO, EVALUADORES, NOMBRE_VALIDO, COLUMNAS, HOJA, NIVELES, TRIGGERS_G1,
  grupos, paginas, unidades, partirCsv, csvCampo, leerRespuestas };
