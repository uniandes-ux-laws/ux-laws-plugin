#!/usr/bin/env node
'use strict';
/**
 * acuerdo-dorados.js --- el desacuerdo INICIAL entre los tres, antes del consenso.
 *
 *   node scripts/acuerdo-dorados.js
 *
 * QUE MIDE. Los tres estudiantes escriben, cada uno por separado y sin ver a los
 * otros, el nivel que esperan de cada grupo en cada una de las diez paginas.
 * Setenta juicios por persona. Este script compara los tres antes de que se
 * reunan a consensuar, y reporta por pareja y por grupo: acuerdo exacto, acuerdo
 * dentro de un nivel, y Brennan-Prediger con pesos cuadraticos.
 *
 * POR QUE IMPORTA MAS QUE LOS CASOS DORADOS. Es una **estimacion temprana del
 * acuerdo entre humanos con estas rubricas**, y esta disponible sin esperar al
 * comite de etica, que es lo que bloquea el ground truth de verdad. Si tres
 * personas que escribieron el instrumento no coinciden leyendolo, cuatro
 * evaluadores externos no van a coincidir mas.
 *
 * LO QUE NO ES, y el documento lo dice con las mismas palabras: NO es el ground
 * truth. Los tres son los autores, conocen el instrumento por dentro y comparten
 * todos sus supuestos. Su acuerdo es una cota OPTIMISTA: sirve como senal de
 * aplicabilidad de la rubrica, no como referencia contra la cual validar el
 * sistema. Usarlo como referencia seria validar el instrumento contra las mismas
 * personas que lo escribieron.
 *
 * El script no rellena ninguna celda y se niega a estimar una que falte.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const DIR = path.join(RAIZ, 'dorados');
const QUIENES = ['david', 'mateo', 'juanfrancisco'];
const K = 5;
const peso = (i, j) => 1 - Math.pow((i - j) / (K - 1), 2);
const P_E = (() => { let s = 0; for (let i = 0; i < K; i++) for (let j = 0; j < K; j++) s += peso(i, j); return s / (K * K); })();

function leerPlantilla(quien) {
  const f = path.join(DIR, 'esperados-' + quien + '.csv');
  if (!fs.existsSync(f)) { console.error('falta ' + path.relative(RAIZ, f)); process.exit(1); }
  const lineas = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n').trim().split('\n');
  const cols = lineas[0].split(',');
  const iNivel = cols.indexOf('nivel_esperado'), iTrigger = cols.indexOf('trigger_esperado');
  const filas = lineas.slice(1).map((l) => {
    const v = l.split(',');
    return { clave: v[0] + '/' + v[2], pagina: v[0], grupo: v[2], nivel: (v[iNivel] || '').trim(), trigger: (v[iTrigger] || '').trim() };
  });
  return filas;
}

const tablas = {};
const vacias = [];
for (const q of QUIENES) {
  tablas[q] = leerPlantilla(q);
  for (const f of tablas[q]) {
    if (f.nivel === '') vacias.push(q + ' ' + f.clave + ': nivel_esperado vacío');
    else if (!/^[0-4]$/.test(f.nivel) && f.nivel.toUpperCase() !== 'NA') vacias.push(q + ' ' + f.clave + ': "' + f.nivel + '" no es 0–4 ni NA');
    else if (f.nivel !== '' && f.trigger === '' && f.nivel.toUpperCase() !== 'NA') vacias.push(q + ' ' + f.clave + ': falta trigger_esperado');
  }
}
if (vacias.length) {
  console.error('LAS PLANTILLAS NO ESTÁN COMPLETAS. ' + vacias.length + ' celda(s):\n');
  for (const v of vacias.slice(0, 15)) console.error('  ' + v);
  if (vacias.length > 15) console.error('  … y ' + (vacias.length - 15) + ' más');
  console.error('\nEste script no rellena ni estima ninguna celda. El paso humano lo hacen los tres.');
  process.exit(1);
}

const claves = tablas[QUIENES[0]].map((f) => f.clave);
const nivelDe = (q, clave) => {
  const f = tablas[q].find((x) => x.clave === clave);
  return f.nivel.toUpperCase() === 'NA' ? null : parseInt(f.nivel, 10);
};

function comparar(a, b, subconjunto) {
  const pares = (subconjunto || claves)
    .map((c) => [nivelDe(a, c), nivelDe(b, c)])
    .filter(([x, y]) => x !== null && y !== null);
  if (!pares.length) return null;
  const exacto = pares.filter(([x, y]) => x === y).length / pares.length;
  const dentro1 = pares.filter(([x, y]) => Math.abs(x - y) <= 1).length / pares.length;
  const p_o = pares.reduce((s, [x, y]) => s + peso(x, y), 0) / pares.length;
  return {
    n: pares.length,
    acuerdo_exacto: +exacto.toFixed(3),
    acuerdo_dentro_de_uno: +dentro1.toFixed(3),
    p_o: +p_o.toFixed(4),
    kappa_bp: +((p_o - P_E) / (1 - P_E)).toFixed(4),
  };
}

const parejas = [['david', 'mateo'], ['david', 'juanfrancisco'], ['mateo', 'juanfrancisco']];
const grupos = [...new Set(tablas[QUIENES[0]].map((f) => f.grupo))].sort();

console.log('Desacuerdo inicial entre los tres · antes del consenso · p_e = ' + P_E.toFixed(4) + '\n');
console.log('pareja                        n  exacto  ±1 nivel  kappa_BP');
const porPareja = {};
for (const [a, b] of parejas) {
  const r = comparar(a, b);
  porPareja[a + '/' + b] = r;
  console.log((a + ' vs ' + b).padEnd(28), String(r.n).padStart(3), String(r.acuerdo_exacto).padStart(7), String(r.acuerdo_dentro_de_uno).padStart(9), String(r.kappa_bp).padStart(9));
}

console.log('\npor grupo (las tres parejas juntas)');
console.log('grupo   n  exacto  ±1 nivel  kappa_BP  desacuerdo máximo');
const porGrupo = {};
for (const g of grupos) {
  const sub = claves.filter((c) => c.endsWith('/' + g));
  const rs = parejas.map(([a, b]) => comparar(a, b, sub)).filter(Boolean);
  if (!rs.length) continue;
  const prom = (k) => +(rs.reduce((s, r) => s + r[k], 0) / rs.length).toFixed(3);
  const maxDif = Math.max(...sub.map((c) => {
    const ns = QUIENES.map((q) => nivelDe(q, c)).filter((x) => x !== null);
    return ns.length > 1 ? Math.max(...ns) - Math.min(...ns) : 0;
  }));
  porGrupo[g] = { n: rs[0].n, acuerdo_exacto: prom('acuerdo_exacto'), acuerdo_dentro_de_uno: prom('acuerdo_dentro_de_uno'), kappa_bp: prom('kappa_bp'), desacuerdo_maximo: maxDif };
  console.log(g.padEnd(6), String(rs[0].n).padStart(3), String(porGrupo[g].acuerdo_exacto).padStart(7), String(porGrupo[g].acuerdo_dentro_de_uno).padStart(9), String(porGrupo[g].kappa_bp).padStart(9), String(maxDif).padStart(18));
}

const unanimes = claves.filter((c) => new Set(QUIENES.map((q) => nivelDe(q, c))).size === 1).length;
console.log('\nunidades donde los tres coinciden exactamente: ' + unanimes + ' de ' + claves.length);

fs.writeFileSync(path.join(DIR, 'acuerdo-inicial.json'), JSON.stringify({
  calculado_en: new Date().toISOString(),
  unidades: claves.length,
  evaluadores: QUIENES,
  p_e: +P_E.toFixed(4),
  por_pareja: porPareja,
  por_grupo: porGrupo,
  unanimes,
  advertencia: 'NO es ground truth. Los tres son los autores del instrumento, comparten sus supuestos y su acuerdo es una cota optimista. Sirve como senal de aplicabilidad de la rubrica, no como referencia para validar el sistema.',
}, null, 2) + '\n');
console.log('\n-> dorados/acuerdo-inicial.json');
