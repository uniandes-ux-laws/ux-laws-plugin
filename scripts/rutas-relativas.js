'use strict';
// Compara comandos registrados por los pilotos sin depender de la carpeta ni del
// sistema donde se clonó el repositorio (auditoría del 12 de noviembre, B1).
//
// Las trazas guardan rutas absolutas de la máquina que corrió el piloto
// (/Users/juan/…). Regenerar el comando en otra máquina da otra raíz y, en
// Windows, otro separador. Lo que se verifica es lo demás: cada argumento, su
// orden y la ruta relativa de cada archivo dentro del repositorio.
const path = require('path');

const MARCA = '<RAIZ>';
const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Raíz del repositorio en un comando registrado: lo que precede a /pilotos/ o /preparacion/. */
function raizGrabada(args) {
  for (const a of args) {
    const m = String(a).match(/((?:[A-Za-z]:)?[^\s"'=]*?)[\\/]+(?:pilotos|preparacion|verificaciones|captures|calibracion)[\\/]/);
    if (m && m[1]) return m[1];
  }
  return null;
}

/** Sustituye la raíz por una marca y normaliza separadores, también dentro de JSON escapado. */
function relativizar(args, raiz) {
  if (!raiz) return args.map(String);
  const formas = new Set([raiz, raiz.replace(/\\/g, '/'), raiz.replace(/\//g, '\\'),
    JSON.stringify(raiz).slice(1, -1), JSON.stringify(raiz.replace(/\//g, '\\')).slice(1, -1)]);
  return args.map((a) => {
    let s = String(a);
    for (const f of [...formas].sort((x, y) => y.length - x.length)) s = s.replace(new RegExp(escapar(f), 'g'), MARCA);
    if (!s.includes(MARCA)) return s;
    return s.replace(/\\\\/g, '/').replace(/\\/g, '/');
  });
}

/** Devuelve [grabado, regenerado] listos para assert.deepEqual. */
function paraComparar(grabado, regenerado, raizActual) {
  return [relativizar(grabado, raizGrabada(grabado)), relativizar(regenerado, path.resolve(raizActual))];
}

module.exports = { raizGrabada, relativizar, paraComparar, MARCA };
