'use strict';
/**
 * huella-medicion.js — huella de un JSON derivado sin sus marcas de tiempo.
 *
 * measurements.json lleva `medido_en` y acuerdo-inicial.json `calculado_en`. Con la
 * marca dentro, dos corridas idénticas producen bytes distintos, y un hash del
 * archivo en bruto no se puede reproducir en otra máquina ni otro día (auditoría
 * del 12 de noviembre, B-5; fue la causa de B1). La huella se calcula sobre el
 * contenido sin esas claves.
 *
 * measure/measure-page.js no se modifica: su hash está registrado en el cierre de
 * G1 (revisiones/g1-cierre-2026-10-21/FUENTES-SHA256.tsv). Por eso la marca sigue
 * en el archivo y se excluye aquí, al hashear.
 */
const crypto = require('crypto');

const MARCAS = ['medido_en', 'calculado_en'];

/** Copia del objeto sin las marcas de tiempo de primer nivel. */
function sinMarcas(obj) {
  const copia = { ...obj };
  for (const k of MARCAS) delete copia[k];
  return copia;
}

/** sha256 del contenido sin marcas, serializado igual que lo escriben los scripts. */
function huella(obj) {
  return crypto.createHash('sha256').update(JSON.stringify(sinMarcas(obj), null, 2) + '\n').digest('hex');
}

/** true si los dos objetos solo difieren en sus marcas de tiempo. */
function mismoContenido(a, b) {
  return huella(a) === huella(b);
}

module.exports = { MARCAS, sinMarcas, huella, mismoContenido };
