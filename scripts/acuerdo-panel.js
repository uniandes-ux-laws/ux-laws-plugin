#!/usr/bin/env node
'use strict';
/**
 * acuerdo-panel.js — acuerdo entre los evaluadores del panel (E1…E6), antes de
 * comparar nada con el sistema.
 *
 *   node scripts/acuerdo-panel.js [--dir panel/respuestas] [--out panel/acuerdo-panel.json]
 *
 * EL COEFICIENTE. Brennan–Prediger con pesos cuadráticos sobre k = 5 niveles:
 *   w_ij = 1 − ((i − j)/4)²,   p_e = promedio de w sobre las 25 celdas = 0,75
 *   κ_BP = (p_o − 0,75) / 0,25
 * p_e no depende del número de evaluadores: con seis sigue siendo 0,75 (se calcula
 * aquí, no se escribe a mano, y se comprueba).
 *
 * LOS PARES. Con seis evaluadores hay C(6,2) = 15. Para cada par, p_o se calcula sobre
 * las unidades que AMBOS calificaron con un nivel de 0 a 4, y su n se reporta. NA y
 * celdas vacías no entran al coeficiente; se cuentan aparte (ambos NA, solo uno NA,
 * alguno sin calificar). Como n puede diferir entre pares, el valor global y el de cada
 * grupo ponderan cada par por su n: p_o = Σ n·p_o / Σ n, y de ahí κ. Eso es lo mismo
 * que agrupar todos los pares de unidades; el promedio simple de los κ por par se
 * reporta al lado.
 *
 * G1. Se reporta todo con y sin G1, que quedó no interpretable en la versión 1.
 *
 * Esto es acuerdo ENTRE evaluadores humanos, no acuerdo del sistema con ellos.
 */
const fs = require('fs'), path = require('path');
const { RAIZ, EVALUADORES, leerRespuestas } = require('./panel-comun');

const K = 5;
const peso = (i, j) => 1 - Math.pow((i - j) / (K - 1), 2);
const P_E = (() => { let s = 0; for (let i = 0; i < K; i++) for (let j = 0; j < K; j++) s += peso(i, j); return s / (K * K); })();
const kappa = (po) => (po - P_E) / (1 - P_E);
const r4 = (x) => (x === null ? null : +x.toFixed(4));

function cargar(dir) {
  const datos = {};
  for (const e of EVALUADORES) {
    const f = path.join(dir, 'respuestas-' + e + '.csv');
    if (!fs.existsSync(f)) continue;
    datos[e] = new Map(leerRespuestas(f).map((r) => [r.pagina + '/' + r.grupo, (r.nivel || '').trim().toUpperCase()]));
  }
  return datos;
}

/** Estadística de un par sobre un conjunto de claves de unidad. */
function par(a, b, claves) {
  let n = 0, suma = 0, exacto = 0, ambosNA = 0, unoNA = 0, sinCalificar = 0;
  for (const k of claves) {
    const x = a.get(k) || '', y = b.get(k) || '';
    if (!x || !y) { sinCalificar++; continue; }
    if (x === 'NA' && y === 'NA') { ambosNA++; continue; }
    if (x === 'NA' || y === 'NA') { unoNA++; continue; }
    const i = +x, j = +y; n++; suma += peso(i, j); if (i === j) exacto++;
  }
  const po = n ? suma / n : null;
  return { n, p_o: r4(po), kappa_bp: po === null ? null : r4(kappa(po)), acuerdo_exacto: n ? r4(exacto / n) : null,
    ambos_NA: ambosNA, solo_uno_NA: unoNA, alguno_sin_calificar: sinCalificar, _suma: suma };
}

/** Agregado de varios pares, ponderado por n; y el promedio simple de sus κ. */
function agregado(pares) {
  const conN = pares.filter((p) => p.n > 0);
  const n = conN.reduce((s, p) => s + p.n, 0);
  const po = n ? conN.reduce((s, p) => s + p._suma, 0) / n : null;
  return { pares_con_datos: conN.length, n_total: n, p_o: r4(po), kappa_bp_ponderado_por_n: po === null ? null : r4(kappa(po)),
    kappa_bp_promedio_simple: conN.length ? r4(conN.reduce((s, p) => s + kappa(p._suma / p.n), 0) / conN.length) : null };
}

const limpiar = (p) => { const { _suma, ...resto } = p; return resto; };

function calcular(datos) {
  const quienes = Object.keys(datos);
  if (quienes.length < 2) throw Error('Hacen falta al menos dos evaluadores con respuestas; hay ' + quienes.length + '.');
  const claves = [...new Set(quienes.flatMap((e) => [...datos[e].keys()]))].sort();
  const grupos = [...new Set(claves.map((k) => k.split('/')[1]))].sort();
  const pares = [];
  for (let i = 0; i < quienes.length; i++) for (let j = i + 1; j < quienes.length; j++) pares.push([quienes[i], quienes[j]]);

  const calc = (subconjunto) => {
    const porPar = pares.map(([a, b]) => ({ par: a + '/' + b, ...par(datos[a], datos[b], subconjunto) }));
    return { por_par: porPar.map(limpiar), global: agregado(porPar) };
  };
  const sinG1 = claves.filter((k) => !k.endsWith('/G1'));
  return {
    evaluadores: quienes,
    pares: pares.length,
    unidades: claves.length,
    k: K, pesos: 'cuadráticos', p_e: r4(P_E),
    con_G1: calc(claves),
    sin_G1: calc(sinG1),
    por_grupo: Object.fromEntries(grupos.map((g) => [g, calc(claves.filter((k) => k.endsWith('/' + g))).global])),
    nota: 'Acuerdo entre evaluadores humanos del panel, no acuerdo del sistema con ellos. NA y celdas vacías no entran al coeficiente. G1 es no interpretable en la versión 1: se reporta con y sin él.',
  };
}

function main(argv) {
  const a = argv.slice(2), opt = (n, d) => { const i = a.indexOf(n); return i !== -1 && a[i + 1] ? path.resolve(a[i + 1]) : d; };
  const dir = opt('--dir', path.join(RAIZ, 'panel', 'respuestas'));
  const out = opt('--out', path.join(RAIZ, 'panel', 'acuerdo-panel.json'));
  const r = calcular(cargar(dir));
  if (Math.abs(r.p_e - 0.75) > 1e-9) throw Error('p_e distinto de 0,75: revisar los pesos');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(r, null, 2) + '\n');
  console.log(r.evaluadores.length + ' evaluadores · ' + r.pares + ' pares · ' + r.unidades + ' unidades · p_e = ' + r.p_e);
  for (const [nombre, b] of [['con G1', r.con_G1], ['sin G1', r.sin_G1]]) {
    console.log('\n' + nombre + ': κ_BP ponderado por n = ' + b.global.kappa_bp_ponderado_por_n + ' (n = ' + b.global.n_total + '), promedio simple de pares = ' + b.global.kappa_bp_promedio_simple);
  }
  console.log('\npar          n    κ_BP   exacto  ambosNA  unoNA  sinCalif');
  for (const p of r.con_G1.por_par) console.log(p.par.padEnd(10) + String(p.n).padStart(5) + String(p.kappa_bp).padStart(8) + String(p.acuerdo_exacto).padStart(8) + String(p.ambos_NA).padStart(9) + String(p.solo_uno_NA).padStart(7) + String(p.alguno_sin_calificar).padStart(10));
  console.log('\n-> ' + path.relative(RAIZ, out).replace(/\\/g, '/'));
  return 0;
}

module.exports = { calcular, cargar, par, agregado, P_E, peso, kappa };
if (require.main === module) { try { process.exit(main(process.argv)); } catch (e) { console.error(e.message); process.exit(1); } }
