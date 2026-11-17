#!/usr/bin/env node
'use strict';
/**
 * comparar-canales.js — wireframe frente a screenshot, acuerdo con el panel por canal y
 * segunda medida del wireframe. Aplica docs/ANALISIS-CANALES-16NOV.md, escrita antes de
 * la corrida.
 *
 *   node scripts/comparar-canales.js --corrida <C2> --anterior <C1> \
 *        [--panel panel/respuestas/panel-consolidado.csv] [--out <C2>/comparacion-canales.json]
 *
 * Solo describe: no contrasta hipótesis ni da valores p.
 */
const fs = require('fs'), path = require('path');
const { RAIZ } = require('./panel-comun');
const { cargarConsolidado, corpus, urlNormal } = require('./panel-consolidado');
const { perfilesEn, nivelSistema, tauB, resumen, intervalo, aEscalaPanel, azar, kappa: kappaK4, peso: pesoK4 } = require('./comparar-panel');

const DOBLE = ['G1', 'G2', 'G3', 'G5', 'G6', 'G7'];
const MARCADAS = ['G01', 'G04', 'L01', 'L02', 'L03'];
const REPLICAS = 2000, SEMILLA = 20261113, CASI_CONSTANTE = 0.8, N_MINIMO = 10;
const r4 = (x) => (x === null || x === undefined || Number.isNaN(x) ? null : +x.toFixed(4));

// κ_BP cuadrático sobre la escala 0–4 del sistema (k = 5), para comparar brazos.
const K5 = 5, peso5 = (i, j) => 1 - Math.pow((i - j) / (K5 - 1), 2);
const P_E5 = (() => { let s = 0; for (let i = 0; i < K5; i++) for (let j = 0; j < K5; j++) s += peso5(i, j); return s / (K5 * K5); })();
const kappa5 = (po) => (po - P_E5) / (1 - P_E5);

/** Bootstrap sobre páginas de un estadístico; ignora réplicas sin dato y dice cuántas entraron. */
function bootstrap(items, estadistico, { replicas = REPLICAS, semilla = SEMILLA } = {}) {
  const porPagina = new Map();
  for (const x of items) { if (!porPagina.has(x.pagina)) porPagina.set(x.pagina, []); porPagina.get(x.pagina).push(x); }
  const paginas = [...porPagina.keys()];
  if (paginas.length < 2) return { ic95: null, replicas_validas: 0 };
  const rnd = azar(semilla), vals = [];
  for (let r = 0; r < replicas; r++) {
    const muestra = [];
    for (let i = 0; i < paginas.length; i++) muestra.push(...porPagina.get(paginas[Math.floor(rnd() * paginas.length)]));
    const v = estadistico(muestra);
    if (v !== null && Number.isFinite(v)) vals.push(v);
  }
  if (!vals.length) return { ic95: null, replicas_validas: 0 };
  vals.sort((a, b) => a - b);
  const R = vals.length;
  return { ic95: [r4(vals[Math.floor(0.025 * (R - 1))]), r4(vals[Math.ceil(0.975 * (R - 1))])], replicas_validas: R };
}

const media = (v) => (v.length ? v.reduce((s, x) => s + x, 0) / v.length : null);
const fraccionModal = (v) => { if (!v.length) return null; const c = {}; for (const x of v) c[x] = (c[x] || 0) + 1; return Math.max(...Object.values(c)) / v.length; };

/**
 * Lee una corrida: una carpeta por página con perfil.json e invocaciones.json.
 * @returns {{unidades: Map<string, object>, paginas: string[], modelos: string[], problemas: string[]}}
 *   clave de unidad: 'PAGINA/G#/canal'
 */
function cargarCorrida(dir, manifiesto) {
  const porUrl = new Map(corpus(manifiesto).map((p) => [urlNormal(p.url), p.id]));
  const unidades = new Map(), paginas = [], modelos = new Set(), problemas = [];
  for (const f of perfilesEn([dir])) {
    const perfil = JSON.parse(fs.readFileSync(f, 'utf8'));
    const pagina = porUrl.get(urlNormal(perfil.captura?.url || ''));
    if (!pagina) { problemas.push(f + ': URL fuera del corpus'); continue; }
    if (path.basename(path.dirname(f)) !== pagina) problemas.push(f + ': la carpeta no coincide con la página ' + pagina);
    paginas.push(pagina);
    modelos.add(perfil.configuracion?.model_id || 'sin_modelo');
    const libro = path.join(path.dirname(f), 'invocaciones.json');
    const invocaciones = fs.existsSync(libro) ? JSON.parse(fs.readFileSync(libro, 'utf8')).invocaciones || [] : [];
    for (const g of perfil.perfil || []) {
      const grupo = String(g.group_id || '').toUpperCase(), canal = g.channel;
      const evals = g.evaluaciones || [];
      const inv = invocaciones.find((i) => String(i.group_id).toUpperCase() === grupo && i.channel === canal);
      unidades.set(pagina + '/' + grupo + '/' + canal, {
        pagina, grupo, canal, ...nivelSistema(evals),
        motivo: evals.map((e) => e.motivo).filter(Boolean)[0] || null,
        model_id: inv?.model_id || perfil.configuracion?.model_id || null,
        huella: inv ? [inv.prompt_hash, inv.entrada_sha256, (inv.imagenes || []).map((x) => x.canal + ':' + x.uso + ':' + x.sha256).join('|')].join('#') : null,
      });
    }
  }
  return { unidades, paginas: paginas.sort(), modelos: [...modelos].sort(), problemas };
}

const filtrar = (u, { sinMarcadas = false } = {}) => !sinMarcadas || !MARCADAS.includes(u.pagina);
const estadoDe = (u) => (!u ? 'sin_dato' : u.estado === 'puntaje' ? 'puntaje' : u.estado);

/** §2. Pares wireframe/screenshot de C2 y unidades no comparables. */
function entreCanales(c2, opciones) {
  const pares = [], noComparables = {};
  for (const g of DOBLE) noComparables[g] = { wireframe_puntuo_screenshot_no: {}, screenshot_puntuo_wireframe_no: {}, ninguno: 0 };
  for (const pagina of c2.paginas) {
    if (!filtrar({ pagina }, opciones)) continue;
    for (const g of DOBLE) {
      const w = c2.unidades.get(pagina + '/' + g + '/wireframe'), s = c2.unidades.get(pagina + '/' + g + '/screenshot');
      const ew = estadoDe(w), es = estadoDe(s);
      if (ew === 'puntaje' && es === 'puntaje') pares.push({ pagina, grupo: g, w: w.nivel, s: s.nivel });
      else if (ew === 'puntaje') { const o = noComparables[g].wireframe_puntuo_screenshot_no; o[es] = (o[es] || 0) + 1; }
      else if (es === 'puntaje') { const o = noComparables[g].screenshot_puntuo_wireframe_no; o[ew] = (o[ew] || 0) + 1; }
      else noComparables[g].ninguno++;
    }
  }
  const describir = (x) => {
    const n = x.length;
    if (!n) return { n: 0 };
    const dif = x.map((p) => p.s - p.w), po = x.reduce((a, p) => a + peso5(p.s, p.w), 0) / n;
    const distribucion = {}; for (let d = -4; d <= 4; d++) distribucion[d] = dif.filter((v) => v === d).length;
    const casiConstante = Math.max(fraccionModal(x.map((p) => p.w)), fraccionModal(x.map((p) => p.s))) >= CASI_CONSTANTE;
    const b = bootstrap(x, (m) => media(m.map((p) => p.s - p.w)));
    return {
      n, diferencia_media_s_menos_w: r4(media(dif)), ic95_diferencia: b.ic95, replicas_validas: b.replicas_validas, distribucion_diferencias: distribucion,
      exacto: r4(dif.filter((v) => v === 0).length / n), a_un_nivel: r4(dif.filter((v) => Math.abs(v) <= 1).length / n),
      tau_b: r4(tauB(x.map((p) => p.w), x.map((p) => p.s))), kappa_bp_k5: r4(kappa5(po)),
      marcas: [casiConstante && 'nivel_casi_constante', n < N_MINIMO && 'n_pequeno'].filter(Boolean),
    };
  };
  return {
    con_G1: describir(pares), sin_G1: describir(pares.filter((p) => p.grupo !== 'G1')),
    por_grupo: Object.fromEntries(DOBLE.map((g) => [g, describir(pares.filter((p) => p.grupo === g))])),
    no_comparables: noComparables, pares,
  };
}

/** §3. Acuerdo de cada brazo con el panel y diferencia (b) − (a). */
function conPanel(c2, panel, opciones) {
  const filas = [];
  for (const f of panel) {
    if (f.nivel === null || !DOBLE.includes(f.grupo) || !filtrar(f, opciones) || !c2.paginas.includes(f.pagina)) continue;
    const w = c2.unidades.get(f.pagina + '/' + f.grupo + '/wireframe'), s = c2.unidades.get(f.pagina + '/' + f.grupo + '/screenshot');
    filas.push({ pagina: f.pagina, grupo: f.grupo, panel: f.nivel,
      w: estadoDe(w) === 'puntaje' ? w.nivel : null, s: estadoDe(s) === 'puntaje' ? s.nivel : null });
  }
  const brazo = (x, campo) => x.filter((r) => r[campo] !== null).map((r) => ({ pagina: r.pagina, grupo: r.grupo, panel: r.panel, original: r[campo], sistema: aEscalaPanel(r[campo]) }));
  const kap = (x, campo) => { const y = x.filter((r) => r[campo] !== null); return y.length ? kappaK4(y.reduce((a, r) => a + pesoK4(aEscalaPanel(r[campo]), r.panel), 0) / y.length) : null; };
  const difMedia = (x, campo) => media(x.filter((r) => r[campo] !== null).map((r) => aEscalaPanel(r[campo]) - r.panel));
  const bloque = (x) => {
    const comunes = x.filter((r) => r.w !== null && r.s !== null);
    const pa = brazo(x, 'w'), pb = brazo(x, 's'), ca = brazo(comunes, 'w'), cb = brazo(comunes, 's');
    const dk = bootstrap(comunes, (m) => { const a = kap(m, 'w'), b = kap(m, 's'); return a === null || b === null ? null : b - a; });
    const dd = bootstrap(comunes, (m) => { const a = difMedia(m, 'w'), b = difMedia(m, 's'); return a === null || b === null ? null : b - a; });
    const dkPropias = bootstrap(x, (m) => { const a = kap(m, 'w'), b = kap(m, 's'); return a === null || b === null ? null : b - a; });
    return {
      comunes: {
        n: comunes.length,
        a_wireframe: { ...resumen(ca), ic95_bootstrap_paginas: intervalo(ca), diferencia_media_sistema_menos_panel: r4(difMedia(comunes, 'w')) },
        b_screenshot: { ...resumen(cb), ic95_bootstrap_paginas: intervalo(cb), diferencia_media_sistema_menos_panel: r4(difMedia(comunes, 's')) },
        delta_kappa_b_menos_a: r4(comunes.length ? kap(comunes, 's') - kap(comunes, 'w') : null), ic95_delta_kappa: dk.ic95, replicas_validas: dk.replicas_validas,
        delta_diferencia_media_b_menos_a: r4(comunes.length ? difMedia(comunes, 's') - difMedia(comunes, 'w') : null), ic95_delta_diferencia_media: dd.ic95,
      },
      propias: {
        a_wireframe: { ...resumen(pa), ic95_bootstrap_paginas: intervalo(pa), diferencia_media_sistema_menos_panel: r4(difMedia(x, 'w')) },
        b_screenshot: { ...resumen(pb), ic95_bootstrap_paginas: intervalo(pb), diferencia_media_sistema_menos_panel: r4(difMedia(x, 's')) },
        delta_kappa_b_menos_a: r4(pa.length && pb.length ? kap(x, 's') - kap(x, 'w') : null), ic95_delta_kappa: dkPropias.ic95, replicas_validas: dkPropias.replicas_validas,
      },
    };
  };
  // G4 aparte: un solo canal, igual en los dos brazos.
  const g4 = [];
  for (const f of panel) {
    if (f.grupo !== 'G4' || f.nivel === null || !filtrar(f, opciones) || !c2.paginas.includes(f.pagina)) continue;
    const u = c2.unidades.get(f.pagina + '/G4/screenshot');
    if (estadoDe(u) === 'puntaje') g4.push({ pagina: f.pagina, grupo: 'G4', panel: f.nivel, original: u.nivel, sistema: aEscalaPanel(u.nivel) });
  }
  return {
    con_G1: bloque(filas), sin_G1: bloque(filas.filter((r) => r.grupo !== 'G1')),
    por_grupo: Object.fromEntries(DOBLE.map((g) => [g, bloque(filas.filter((r) => r.grupo === g))])),
    G4_un_solo_canal: { ...resumen(g4), ic95_bootstrap_paginas: intervalo(g4) },
  };
}

/** §4. Segunda medida: el mismo canal en C1 y en C2. */
function segundaMedida(c1, c2, opciones) {
  const claves = [...DOBLE.map((g) => [g, 'wireframe']), ['G4', 'screenshot']];
  const out = {};
  for (const [g, canal] of claves) {
    const transiciones = {}, pares = [], huellaDistinta = [];
    for (const pagina of c2.paginas) {
      if (!filtrar({ pagina }, opciones) || !c1.paginas.includes(pagina)) continue;
      const a = c1.unidades.get(pagina + '/' + g + '/' + canal), b = c2.unidades.get(pagina + '/' + g + '/' + canal);
      if (a && b && a.huella !== b.huella) { huellaDistinta.push(pagina); continue; }
      const k = estadoDe(a) + ' -> ' + estadoDe(b); transiciones[k] = (transiciones[k] || 0) + 1;
      if (estadoDe(a) === 'puntaje' && estadoDe(b) === 'puntaje') pares.push({ pagina, c1: a.nivel, c2: b.nivel });
    }
    const dif = pares.map((p) => Math.abs(p.c2 - p.c1)), distribucion = {};
    for (let d = 0; d <= 4; d++) distribucion[d] = dif.filter((v) => v === d).length;
    out[g + '/' + canal] = {
      n_con_nivel_en_ambas: pares.length,
      repiten_nivel: pares.filter((p) => p.c1 === p.c2).length,
      fraccion_repite: r4(pares.length ? pares.filter((p) => p.c1 === p.c2).length / pares.length : null),
      rango_maximo: dif.length ? Math.max(...dif) : null, distribucion_abs_diferencia: distribucion,
      transiciones_de_estado: transiciones, paginas_con_huella_distinta: huellaDistinta,
    };
  }
  return out;
}

/** §6. Lo no puntuado por grupo y canal, con el motivo de cada unidad. */
function noPuntuado(c2, opciones) {
  const out = {};
  for (const u of c2.unidades.values()) {
    if (!filtrar(u, opciones)) continue;
    const k = u.grupo + '/' + u.canal;
    if (!out[k]) out[k] = { puntaje: 0, no_aplica: 0, sin_puntaje: 0, invalida: 0, motivos: [] };
    out[k][u.estado === 'puntaje' ? 'puntaje' : u.estado]++;
    if (u.estado !== 'puntaje') out[k].motivos.push({ pagina: u.pagina, estado: u.estado, motivo: u.motivo });
  }
  return Object.fromEntries(Object.entries(out).sort());
}

function compararCanales({ corrida, anterior, panelCsv, manifiesto }) {
  const c2 = cargarCorrida(corrida, manifiesto), c1 = cargarCorrida(anterior, manifiesto);
  const problemas = [...c2.problemas, ...c1.problemas];
  if (problemas.length) return { ok: false, problemas };
  const panel = cargarConsolidado(panelCsv);
  const variante = (opciones) => ({
    entre_canales: entreCanales(c2, opciones), con_panel: conPanel(c2, panel, opciones),
    segunda_medida: segundaMedida(c1, c2, opciones), no_puntuado: noPuntuado(c2, opciones),
  });
  return {
    ok: true, regla: 'docs/ANALISIS-CANALES-16NOV.md',
    corrida: path.relative(RAIZ, path.resolve(corrida)).replace(/\\/g, '/'), anterior: path.relative(RAIZ, path.resolve(anterior)).replace(/\\/g, '/'),
    paginas_cerradas: c2.paginas, paginas_no_ejecutadas: corpus(manifiesto).map((p) => p.id).filter((p) => !c2.paginas.includes(p)),
    modelos: { corrida: c2.modelos, anterior: c1.modelos },
    p_e_k5: r4(P_E5), replicas: REPLICAS, semilla: SEMILLA, umbral_casi_constante: CASI_CONSTANTE, n_minimo: N_MINIMO, marcadas: MARCADAS,
    todas: variante({}), sin_marcadas: variante({ sinMarcadas: true }),
    nota: 'Descriptivo. G2, G3, G5 y G6 tienen screenshot de apoyo en el brazo de wireframe y las mismas medidas en ambos brazos; G1 es no interpretable v1. Un evaluador por unidad en el panel.',
  };
}

function main(argv) {
  const a = argv.slice(2), opt = (n, d) => { const i = a.indexOf(n); return i !== -1 && a[i + 1] ? path.resolve(a[i + 1]) : d; };
  const corrida = opt('--corrida'), anterior = opt('--anterior');
  if (!corrida || !anterior) { console.error('Uso: node scripts/comparar-canales.js --corrida <C2> --anterior <C1> [--panel csv] [--out json]'); return 1; }
  const panelCsv = opt('--panel', path.join(RAIZ, 'panel', 'respuestas', 'panel-consolidado.csv'));
  const out = opt('--out', path.join(corrida, 'comparacion-canales.json'));
  if (!fs.existsSync(panelCsv)) { console.error('No existe ' + panelCsv); return 1; }
  const r = compararCanales({ corrida, anterior, panelCsv });
  if (!r.ok) { console.error('No se comparó nada:\n  - ' + r.problemas.join('\n  - ')); return 1; }
  fs.writeFileSync(out, JSON.stringify(r, null, 2) + '\n');
  const t = r.todas;
  console.log(r.paginas_cerradas.length + ' páginas cerradas · modelos ' + JSON.stringify(r.modelos));
  console.log('grupo  n  dif(s-w)  IC95            exacto  ±1    κ5     marcas');
  for (const g of DOBLE) { const x = t.entre_canales.por_grupo[g]; console.log(g.padEnd(5) + String(x.n).padStart(3) + String(x.diferencia_media_s_menos_w ?? '-').padStart(9) + ('  ' + JSON.stringify(x.ic95_diferencia ?? null)).padEnd(18) + String(x.exacto ?? '-').padStart(6) + String(x.a_un_nivel ?? '-').padStart(6) + String(x.kappa_bp_k5 ?? '-').padStart(8) + '  ' + (x.marcas || []).join(',')); }
  for (const v of ['con_G1', 'sin_G1']) { const c = t.con_panel[v].comunes; console.log('panel ' + v + ': n=' + c.n + ' κa=' + c.a_wireframe.kappa_bp + ' κb=' + c.b_screenshot.kappa_bp + ' Δ=' + c.delta_kappa_b_menos_a + ' ' + JSON.stringify(c.ic95_delta_kappa)); }
  console.log('-> ' + path.relative(RAIZ, out).replace(/\\/g, '/'));
  return 0;
}

if (require.main === module) process.exit(main(process.argv));
module.exports = { compararCanales, cargarCorrida, entreCanales, conPanel, segundaMedida, noPuntuado, bootstrap, P_E5, peso5, kappa5, DOBLE, MARCADAS };
