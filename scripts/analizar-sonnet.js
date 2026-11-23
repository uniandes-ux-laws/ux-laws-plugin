#!/usr/bin/env node
'use strict';
/**
 * analizar-sonnet.js — fase del panel y del modelo de docs/ANALISIS-CANALES-SONNET-2026-11-20.md.
 *
 *   node scripts/analizar-sonnet.js --sonnet <corrida> --opus <corrida> [--codex <corrida>] \
 *        [--panel panel/respuestas/panel-consolidado.csv | --panel-json <comparacion-panel.json>] --out <json>
 *
 * Reutiliza las funciones de comparar-canales.js (canales, panel por canal) y añade lo que la
 * regla pide y ese script no tenía: Sonnet frente a Opus en las unidades de referencia
 * (G2 y G7 en wireframe, G4 en screenshot) y el acuerdo con el panel de cada modelo.
 * Solo describe: no contrasta hipótesis ni da valores p.
 */
const fs = require('fs'), path = require('path');
const { RAIZ } = require('./panel-comun');
const { cargarConsolidado } = require('./panel-consolidado');
const { tauB, resumen, intervalo, aEscalaPanel, kappa: kappaK4, peso: pesoK4 } = require('./comparar-panel');
const cc = require('./comparar-canales');

const REFERENCIA = [['G2', 'wireframe'], ['G7', 'wireframe'], ['G4', 'screenshot']];
const N_MINIMO = 5;
const r4 = (x) => (x === null || x === undefined || Number.isNaN(x) ? null : +x.toFixed(4));
const media = (v) => (v.length ? v.reduce((s, x) => s + x, 0) / v.length : null);
const filtrar = (pagina, { sinMarcadas = false } = {}) => !sinMarcadas || !cc.MARCADAS.includes(pagina);
const puntuada = (u) => !!u && u.estado === 'puntaje';
const modal = (v) => { const c = {}; for (const x of v) c[x] = (c[x] || 0) + 1; return v.length ? Math.max(...Object.values(c)) / v.length : 0; };

/** Pares de la misma unidad en dos corridas (b − a) y qué pasó con las que no tienen nivel en ambas. */
function entreModelos(a, b, opciones) {
  const pares = [], transiciones = {}, huellaDistinta = [];
  for (const pagina of b.paginas) {
    if (!filtrar(pagina, opciones) || !a.paginas.includes(pagina)) continue;
    for (const [g, canal] of REFERENCIA) {
      const ua = a.unidades.get(pagina + '/' + g + '/' + canal), ub = b.unidades.get(pagina + '/' + g + '/' + canal);
      if (!ua && !ub) continue;
      if (ua && ub && ua.huella !== ub.huella) huellaDistinta.push(pagina + '/' + g);
      if (puntuada(ua) && puntuada(ub)) pares.push({ pagina, grupo: g, a: ua.nivel, b: ub.nivel });
      else { const k = g + ': ' + (ua ? ua.estado : 'sin_dato') + ' -> ' + (ub ? ub.estado : 'sin_dato'); transiciones[k] = (transiciones[k] || 0) + 1; }
    }
  }
  const describir = (x) => {
    const n = x.length;
    if (!n) return { n: 0 };
    const dif = x.map((p) => p.b - p.a), po = x.reduce((s, p) => s + cc.peso5(p.b, p.a), 0) / n;
    const dist = {}; for (let d = -4; d <= 4; d++) dist[d] = dif.filter((v) => v === d).length;
    const bt = cc.bootstrap(x, (m) => media(m.map((p) => p.b - p.a)));
    return {
      n, diferencia_media_b_menos_a: r4(media(dif)), ic95_diferencia: n < N_MINIMO ? null : bt.ic95, replicas_validas: bt.replicas_validas,
      exacto: r4(dif.filter((v) => v === 0).length / n), a_un_nivel: r4(dif.filter((v) => Math.abs(v) <= 1).length / n),
      tau_b: r4(tauB(x.map((p) => p.a), x.map((p) => p.b))), kappa_bp_k5: r4(cc.kappa5(po)), distribucion_diferencias: dist,
      concentracion_modal: { a: r4(modal(x.map((p) => p.a))), b: r4(modal(x.map((p) => p.b))) },
      marcas: [n < N_MINIMO && 'n_insuficiente', Math.max(modal(x.map((p) => p.a)), modal(x.map((p) => p.b))) >= 0.8 && 'nivel_casi_constante'].filter(Boolean),
    };
  };
  return {
    conjunto: describir(pares),
    por_grupo: Object.fromEntries(REFERENCIA.map(([g]) => [g, describir(pares.filter((p) => p.grupo === g))])),
    sin_nivel_en_alguno: transiciones, pares_con_huella_distinta: huellaDistinta.length, pares,
  };
}

/** Acuerdo con el panel de cada corrida sobre las unidades donde ambas tienen nivel y existe el panel. */
function panelPorModelo(a, b, panel, opciones) {
  const filas = [];
  for (const f of panel) {
    if (f.nivel === null || !filtrar(f.pagina, opciones)) continue;
    const ref = REFERENCIA.find(([g]) => g === f.grupo);
    if (!ref || !a.paginas.includes(f.pagina) || !b.paginas.includes(f.pagina)) continue;
    const ua = a.unidades.get(f.pagina + '/' + ref[0] + '/' + ref[1]), ub = b.unidades.get(f.pagina + '/' + ref[0] + '/' + ref[1]);
    if (puntuada(ua) && puntuada(ub)) filas.push({ pagina: f.pagina, grupo: f.grupo, panel: f.nivel, a: ua.nivel, b: ub.nivel });
  }
  const kap = (x, c) => (x.length ? kappaK4(x.reduce((s, r) => s + pesoK4(aEscalaPanel(r[c]), r.panel), 0) / x.length) : null);
  const difm = (x, c) => media(x.map((r) => aEscalaPanel(r[c]) - r.panel));
  const brazo = (x, c) => x.map((r) => ({ pagina: r.pagina, grupo: r.grupo, panel: r.panel, original: r[c], sistema: aEscalaPanel(r[c]) }));
  const bloque = (x) => {
    if (!x.length) return { n: 0 };
    const da = cc.bootstrap(x, (m) => { const p = kap(m, 'a'), q = kap(m, 'b'); return p === null || q === null ? null : q - p; });
    return {
      n: x.length,
      corrida_a: { ...resumen(brazo(x, 'a')), ic95_bootstrap_paginas: x.length < N_MINIMO ? null : intervalo(brazo(x, 'a')), diferencia_media_sistema_menos_panel: r4(difm(x, 'a')) },
      corrida_b: { ...resumen(brazo(x, 'b')), ic95_bootstrap_paginas: x.length < N_MINIMO ? null : intervalo(brazo(x, 'b')), diferencia_media_sistema_menos_panel: r4(difm(x, 'b')) },
      delta_kappa_b_menos_a: r4(kap(x, 'b') - kap(x, 'a')), ic95_delta_kappa: x.length < N_MINIMO ? null : da.ic95, replicas_validas: da.replicas_validas,
      marcas: x.length < N_MINIMO ? ['n_insuficiente'] : [],
    };
  };
  return { conjunto: bloque(filas), por_grupo: Object.fromEntries(REFERENCIA.map(([g]) => [g, bloque(filas.filter((r) => r.grupo === g))])) };
}

function cargarPanel(csv, json) {
  if (csv && fs.existsSync(csv)) return { panel: cargarConsolidado(csv), fuente: path.basename(csv), parcial: false };
  if (json && fs.existsSync(json)) {
    const d = JSON.parse(fs.readFileSync(json, 'utf8'));
    const panel = [];
    for (const u of Object.values(d.runtimes)[0].unidades) panel.push({ pagina: u.pagina, grupo: u.grupo, evaluador: u.evaluador, nivel: u.panel_1a4 });
    return { panel, fuente: path.basename(json) + ' (unidades)', parcial: true };
  }
  return { panel: null, fuente: null, parcial: null };
}

function analizar({ sonnet, opus, codex, panelCsv, panelJson }) {
  const S = cc.cargarCorrida(sonnet), O = cc.cargarCorrida(opus), C = codex ? cc.cargarCorrida(codex) : null;
  const problemas = [...S.problemas, ...O.problemas, ...(C ? C.problemas : [])];
  if (problemas.length) return { ok: false, problemas };
  const { panel, fuente, parcial } = cargarPanel(panelCsv, panelJson);
  const variante = (op) => ({
    representacion: cc.entreCanales(S, op),
    panel_por_canal: panel ? cc.conPanel(S, panel, op) : null,
    modelo_sonnet_menos_opus: entreModelos(O, S, op),
    panel_por_modelo: panel ? panelPorModelo(O, S, panel, op) : null,
    no_puntuado: cc.noPuntuado(S, op),
  });
  return {
    ok: true, regla: 'docs/ANALISIS-CANALES-SONNET-2026-11-20.md',
    sonnet: { paginas: S.paginas, modelos: S.modelos }, opus: { paginas: O.paginas.length, modelos: O.modelos },
    panel: { fuente, parcial, aviso: parcial ? 'Solo unidades donde Opus tuvo nivel; no sirve para el contraste principal.' : null },
    replicas: 2000, semilla: 20261113, marcadas: cc.MARCADAS,
    todas: variante({}), sin_marcadas: variante({ sinMarcadas: true }),
    piloto_codex: C ? {
      paginas: C.paginas, modelos: C.modelos,
      codex_menos_opus: entreModelos(O, C, {}), codex_menos_sonnet: entreModelos(S, C, {}),
    } : null,
  };
}

function main(argv) {
  const a = argv.slice(2), opt = (n) => { const i = a.indexOf(n); return i !== -1 && a[i + 1] ? path.resolve(a[i + 1]) : null; };
  const sonnet = opt('--sonnet'), opus = opt('--opus'), out = opt('--out');
  if (!sonnet || !opus || !out) { console.error('Uso: node scripts/analizar-sonnet.js --sonnet <dir> --opus <dir> [--codex <dir>] [--panel csv | --panel-json json] --out <json>'); return 1; }
  const r = analizar({ sonnet, opus, codex: opt('--codex'), panelCsv: opt('--panel'), panelJson: opt('--panel-json') });
  if (!r.ok) { console.error('No se analizó nada:\n  - ' + r.problemas.join('\n  - ')); return 1; }
  fs.writeFileSync(out, JSON.stringify(r, null, 2) + '\n');
  console.log(r.sonnet.paginas.length + ' páginas Sonnet · panel: ' + (r.panel.fuente || 'sin panel') + (r.panel.parcial ? ' (PARCIAL)' : ''));
  const m = r.todas.modelo_sonnet_menos_opus.conjunto;
  console.log('Sonnet − Opus: n=' + m.n + ' dif=' + m.diferencia_media_b_menos_a + ' exacto=' + m.exacto + ' ±1=' + m.a_un_nivel + ' τb=' + m.tau_b);
  return 0;
}

if (require.main === module) process.exit(main(process.argv));
module.exports = { analizar, entreModelos, panelPorModelo, cargarPanel, REFERENCIA };
