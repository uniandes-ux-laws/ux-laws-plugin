#!/usr/bin/env node
'use strict';
/**
 * comparar-panel.js — acuerdo del sistema con el panel de expertos.
 *
 *   node scripts/comparar-panel.js <perfil.json | carpeta> ... \
 *        [--panel panel/respuestas/panel-consolidado.csv] [--out panel/comparacion-panel.json]
 *
 * Las carpetas se recorren buscando perfil.json. Cada perfil se asocia a su página del
 * corpus por captura.url. Si hay perfiles de dos runtimes, se compara cada uno aparte.
 *
 * La regla se fijó el 13 nov. 2026, antes de tener puntajes del sistema sobre el corpus
 * (docs/ANALISIS-PANEL-13NOV.md). Resumen:
 *
 *   1. CANAL. Cada grupo se toma del canal donde su criterio es medible: G4 del
 *      screenshot, los demás del wireframe (decisión congelada «doble canal»).
 *   2. NIVEL DEL SISTEMA POR UNIDAD. Si más de la mitad de las repeticiones dieron
 *      puntaje, el nivel es la mediana inferior de esos puntajes. Si no, la unidad queda
 *      sin puntaje (NA, abstención o respuesta inválida) y se cuenta aparte; nunca como cero.
 *   3. ESCALA COMÚN. El panel usa 1–4 y el sistema 0–4. El 0 y el 1 del sistema se juntan
 *      en 1; 2, 3 y 4 quedan iguales. Las dos escalas ponen «bien hecho» en 3 y «algo
 *      más» en 4; el panel no tenía forma de separar 0 de 1.
 *   4. COEFICIENTE PRINCIPAL. Brennan–Prediger con pesos cuadráticos sobre k = 4:
 *      w = 1 − ((i − j)/3)², p_e = 0,7222 (calculado, no escrito a mano). Agrupado sobre
 *      las unidades, con y sin G1. Por grupo, exploratorio, con intervalo bootstrap del
 *      95 % remuestreando páginas (2.000 réplicas, semilla fija).
 *   5. SECUNDARIOS. Tau-b de Kendall por grupo, que no depende de la regla 3; acuerdo
 *      exacto y a ±1 nivel; y cuántas unidades tenían 0 en el sistema, para ver qué
 *      oculta la regla 3.
 *
 * Con un evaluador por unidad, cada unidad se compara con una sola persona; el acuerdo
 * por evaluador se reporta como descripción y queda confundido con el estrato.
 */
const fs = require('fs'), path = require('path');
const { RAIZ } = require('./panel-comun');
const { cargarConsolidado, corpus, urlNormal, GRUPOS } = require('./panel-consolidado');

const K = 4;
const peso = (i, j) => 1 - Math.pow((i - j) / (K - 1), 2);
const P_E = (() => { let s = 0; for (let i = 1; i <= K; i++) for (let j = 1; j <= K; j++) s += peso(i, j); return s / (K * K); })();
const kappa = (po) => (po - P_E) / (1 - P_E);
const r4 = (x) => (x === null || x === undefined || Number.isNaN(x) ? null : +x.toFixed(4));
const CANAL = (g) => (g === 'G4' ? 'screenshot' : 'wireframe');
const aEscalaPanel = (s) => Math.max(1, s);

/** Mediana inferior de una lista de enteros. */
function medianaInferior(v) { const s = [...v].sort((a, b) => a - b); return s[Math.floor((s.length - 1) / 2)]; }

/** Nivel del sistema en una unidad a partir de sus evaluaciones (regla 2). */
function nivelSistema(evaluaciones) {
  const total = evaluaciones.length;
  const puntajes = evaluaciones.filter((e) => e.estado === 'puntaje' && Number.isInteger(e.score)).map((e) => e.score);
  if (total && puntajes.length * 2 > total) return { estado: 'puntaje', nivel: medianaInferior(puntajes), repeticiones: total, con_puntaje: puntajes.length };
  const na = evaluaciones.filter((e) => e.estado === 'no_aplica').length;
  const invalidas = evaluaciones.filter((e) => e.estado === 'invalida').length;
  const estado = na * 2 > total ? 'no_aplica' : invalidas * 2 > total ? 'invalida' : 'sin_puntaje';
  return { estado, nivel: null, repeticiones: total, con_puntaje: puntajes.length };
}

/** Tau-b de Kendall entre dos listas de igual largo; null si alguna es constante. */
function tauB(x, y) {
  let c = 0, d = 0, tx = 0, ty = 0;
  for (let i = 0; i < x.length; i++) for (let j = i + 1; j < x.length; j++) {
    const a = Math.sign(x[i] - x[j]), b = Math.sign(y[i] - y[j]);
    if (a === 0 && b === 0) continue;
    if (a === 0) tx++; else if (b === 0) ty++; else if (a === b) c++; else d++;
  }
  const den = Math.sqrt((c + d + tx) * (c + d + ty));
  return den ? (c - d) / den : null;
}

/** Generador con semilla (mulberry32): el intervalo sale igual en cada corrida. */
function azar(semilla) {
  let a = semilla >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/** Coeficiente y descriptivos de una lista de pares {pagina, sistema(1–4), panel(1–4), original(0–4)}. */
function resumen(pares) {
  const n = pares.length;
  if (!n) return { n: 0, kappa_bp: null, p_o: null, exacto: null, a_un_nivel: null, tau_b: null, ceros_del_sistema: 0 };
  const po = pares.reduce((s, p) => s + peso(p.sistema, p.panel), 0) / n;
  return {
    n,
    p_o: r4(po),
    kappa_bp: r4(kappa(po)),
    exacto: r4(pares.filter((p) => p.sistema === p.panel).length / n),
    a_un_nivel: r4(pares.filter((p) => Math.abs(p.sistema - p.panel) <= 1).length / n),
    tau_b: r4(tauB(pares.map((p) => p.sistema), pares.map((p) => p.panel))),
    ceros_del_sistema: pares.filter((p) => p.original === 0).length,
  };
}

/** Intervalo bootstrap del 95 % de κ_BP remuestreando páginas. */
function intervalo(pares, { replicas = 2000, semilla = 20261113 } = {}) {
  const porPagina = new Map();
  for (const p of pares) { if (!porPagina.has(p.pagina)) porPagina.set(p.pagina, []); porPagina.get(p.pagina).push(p); }
  const paginas = [...porPagina.keys()];
  if (paginas.length < 2) return null;
  const rnd = azar(semilla), vals = [];
  for (let r = 0; r < replicas; r++) {
    let suma = 0, n = 0;
    for (let i = 0; i < paginas.length; i++) for (const p of porPagina.get(paginas[Math.floor(rnd() * paginas.length)])) { suma += peso(p.sistema, p.panel); n++; }
    vals.push(kappa(suma / n));
  }
  vals.sort((a, b) => a - b);
  return [r4(vals[Math.floor(0.025 * (replicas - 1))]), r4(vals[Math.ceil(0.975 * (replicas - 1))])];
}

/** Busca perfil.json en las rutas dadas (archivos o carpetas). */
function perfilesEn(rutas) {
  const out = [];
  const recorrer = (r) => {
    const st = fs.statSync(r);
    if (st.isFile()) { if (path.basename(r) === 'perfil.json') out.push(r); return; }
    for (const e of fs.readdirSync(r)) { const x = path.join(r, e); if (fs.statSync(x).isDirectory() || e === 'perfil.json') recorrer(x); }
  };
  for (const r of rutas) recorrer(path.resolve(r));
  return out.sort();
}

/**
 * Niveles del sistema por runtime y unidad.
 * @returns {{porRuntime: Map<string, Map<string, object>>, problemas: string[]}}
 */
function cargarSistema(archivos, manifiesto) {
  const porUrl = new Map(corpus(manifiesto).map((p) => [urlNormal(p.url), p.id]));
  const porRuntime = new Map(), problemas = [];
  for (const f of archivos) {
    const perfil = JSON.parse(fs.readFileSync(f, 'utf8'));
    const pagina = porUrl.get(urlNormal(perfil.captura?.url || ''));
    const rel = path.relative(RAIZ, f).replace(/\\/g, '/');
    if (!pagina) { problemas.push(rel + ': la URL «' + (perfil.captura?.url || '') + '» no es una página del corpus'); continue; }
    const runtime = (perfil.configuracion?.runtime || 'sin_runtime') + ' · ' + (perfil.configuracion?.model_id || 'sin_modelo');
    if (!porRuntime.has(runtime)) porRuntime.set(runtime, new Map());
    const mapa = porRuntime.get(runtime);
    for (const g of perfil.perfil || []) {
      const grupo = String(g.group_id || '').toUpperCase();
      if (!GRUPOS.includes(grupo) || g.channel !== CANAL(grupo)) continue;
      const clave = pagina + '/' + grupo;
      if (mapa.has(clave)) { problemas.push(rel + ': ' + clave + ' ya venía de ' + mapa.get(clave).archivo + ' para ' + runtime); continue; }
      mapa.set(clave, { ...nivelSistema(g.evaluaciones || []), archivo: rel });
    }
  }
  return { porRuntime, problemas };
}

/** Compara un runtime con el panel. */
function compararRuntime(sistema, panel) {
  const pares = [], excluidas = { sin_dato_del_sistema: 0, no_aplica_del_sistema: 0, invalida_del_sistema: 0, sin_puntaje_del_sistema: 0, panel_sin_calificar: 0 };
  for (const f of panel) {
    const clave = f.pagina + '/' + f.grupo;
    if (f.nivel === null) { excluidas.panel_sin_calificar++; continue; }
    const s = sistema.get(clave);
    if (!s) { excluidas.sin_dato_del_sistema++; continue; }
    if (s.estado === 'no_aplica') { excluidas.no_aplica_del_sistema++; continue; }
    if (s.estado === 'invalida') { excluidas.invalida_del_sistema++; continue; }
    if (s.estado !== 'puntaje') { excluidas.sin_puntaje_del_sistema++; continue; }
    pares.push({ pagina: f.pagina, grupo: f.grupo, evaluador: f.evaluador, original: s.nivel, sistema: aEscalaPanel(s.nivel), panel: f.nivel });
  }
  const sinG1 = pares.filter((p) => p.grupo !== 'G1');
  return {
    excluidas,
    con_G1: { ...resumen(pares), ic95_bootstrap_paginas: intervalo(pares) },
    sin_G1: { ...resumen(sinG1), ic95_bootstrap_paginas: intervalo(sinG1) },
    por_grupo: Object.fromEntries(GRUPOS.map((g) => { const x = pares.filter((p) => p.grupo === g); return [g, { ...resumen(x), ic95_bootstrap_paginas: intervalo(x) }]; })),
    por_evaluador_descriptivo: Object.fromEntries([...new Set(pares.map((p) => p.evaluador))].sort().map((e) => [e, resumen(pares.filter((p) => p.evaluador === e))])),
    unidades: pares.map(({ pagina, grupo, evaluador, original, panel }) => ({ pagina, grupo, evaluador, sistema_0a4: original, panel_1a4: panel })),
  };
}

function comparar(archivosPerfil, csvPanel, manifiesto) {
  const panel = cargarConsolidado(csvPanel);
  const { porRuntime, problemas } = cargarSistema(archivosPerfil, manifiesto);
  if (problemas.length) return { ok: false, problemas };
  return {
    ok: true,
    regla: 'docs/ANALISIS-PANEL-13NOV.md',
    escala_comun: 'panel 1–4; sistema 0 y 1 -> 1, 2 -> 2, 3 -> 3, 4 -> 4',
    k: K, pesos: 'cuadráticos', p_e: r4(P_E),
    perfiles: archivosPerfil.length,
    runtimes: Object.fromEntries([...porRuntime].map(([rt, mapa]) => [rt, compararRuntime(mapa, panel)])),
    nota: 'Un evaluador por unidad: es acuerdo del sistema con el evaluador de cada página, no con un consenso. G1 es no interpretable en la versión 1. NA y abstenciones del sistema no entran al coeficiente y se cuentan aparte.',
    problemas: [],
  };
}

function main(argv) {
  const a = argv.slice(2), opt = (n, d) => { const i = a.indexOf(n); return i !== -1 && a[i + 1] ? path.resolve(a[i + 1]) : d; };
  const conValor = new Set(['--panel', '--out']);
  const rutas = a.filter((x, i) => !x.startsWith('--') && !conValor.has(a[i - 1]));
  const csv = opt('--panel', path.join(RAIZ, 'panel', 'respuestas', 'panel-consolidado.csv'));
  const out = opt('--out', path.join(RAIZ, 'panel', 'comparacion-panel.json'));
  if (!rutas.length) { console.error('Uso: node scripts/comparar-panel.js <perfil.json | carpeta> ... [--panel csv] [--out json]'); return 1; }
  if (!fs.existsSync(csv)) { console.error('No existe ' + csv + '. Primero: node scripts/panel-consolidado.js importar <libro.xlsx>'); return 1; }
  const archivos = perfilesEn(rutas);
  if (!archivos.length) { console.error('No se encontró ningún perfil.json en ' + rutas.join(', ')); return 1; }
  const r = comparar(archivos, csv);
  if (!r.ok) { console.error('No se comparó nada:\n  - ' + r.problemas.join('\n  - ')); return 1; }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(r, null, 2) + '\n');
  console.log(archivos.length + ' perfiles · p_e = ' + r.p_e + ' (k = 4, pesos cuadráticos)');
  for (const [rt, x] of Object.entries(r.runtimes)) {
    console.log('\n' + rt);
    console.log('  con G1: κ_BP = ' + x.con_G1.kappa_bp + ' ' + JSON.stringify(x.con_G1.ic95_bootstrap_paginas) + ', n = ' + x.con_G1.n);
    console.log('  sin G1: κ_BP = ' + x.sin_G1.kappa_bp + ' ' + JSON.stringify(x.sin_G1.ic95_bootstrap_paginas) + ', n = ' + x.sin_G1.n);
    console.log('  excluidas: ' + JSON.stringify(x.excluidas));
    console.log('  grupo   n   κ_BP   tau_b  exacto  ±1');
    for (const g of GRUPOS) { const y = x.por_grupo[g]; console.log('  ' + g.padEnd(5) + String(y.n).padStart(4) + String(y.kappa_bp).padStart(8) + String(y.tau_b).padStart(8) + String(y.exacto).padStart(8) + String(y.a_un_nivel).padStart(7)); }
  }
  console.log('\n-> ' + path.relative(RAIZ, out).replace(/\\/g, '/'));
  return 0;
}

if (require.main === module) process.exit(main(process.argv));
module.exports = { comparar, compararRuntime, nivelSistema, medianaInferior, tauB, resumen, intervalo, aEscalaPanel, P_E, peso, kappa };
