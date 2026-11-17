'use strict';
// Pruebas de la comparación de canales (docs/ANALISIS-CANALES-16NOV.md) con corridas
// artificiales en carpetas temporales. No lee resultados/ ni panel/.
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), os = require('os'), path = require('path');
const { corpus } = require('./panel-consolidado');
const { compararCanales, bootstrap, P_E5, kappa5, DOBLE } = require('./comparar-canales');

const PAGINAS = corpus();
const tmp = (t) => { const d = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-canales-')); t.after(() => fs.rmSync(d, { recursive: true, force: true })); return d; };
const evaluacion = (v) => (v === 'A' ? { estado: 'abstencion', score: null, motivo: 'falta evidencia' } : v === 'NA' ? { estado: 'no_aplica', score: null, motivo: 'no aplica' } : v === 'I' ? { estado: 'invalida', score: null, motivo: 'esquema' } : { estado: 'puntaje', score: v });

/** Escribe una página: niveles[grupo][canal] = valor; huella opcional por grupo/canal. */
function pagina(dir, p, niveles, { modelo = 'm1', huella = () => 'h' } = {}) {
  const d = path.join(dir, p.id); fs.mkdirSync(d, { recursive: true });
  const perfil = [], invocaciones = [];
  for (const [g, canales] of Object.entries(niveles)) for (const [canal, v] of Object.entries(canales)) {
    perfil.push({ group_id: g.toLowerCase(), channel: canal, evaluaciones: [evaluacion(v)] });
    invocaciones.push({ group_id: g.toLowerCase(), channel: canal, model_id: modelo, prompt_hash: huella(g, canal), entrada_sha256: 'e', imagenes: [] });
  }
  fs.writeFileSync(path.join(d, 'perfil.json'), JSON.stringify({ configuracion: { model_id: modelo }, captura: { url: p.url }, perfil }));
  fs.writeFileSync(path.join(d, 'invocaciones.json'), JSON.stringify({ invocaciones }));
}

test('p_e con k = 5 es 0,75 y κ vale 1 con acuerdo perfecto', () => {
  assert.equal(+P_E5.toFixed(10), 0.75);
  assert.equal(kappa5(1), 1);
});

test('el bootstrap es reproducible y descarta réplicas sin dato', () => {
  const items = [{ pagina: 'a', v: 1 }, { pagina: 'b', v: 3 }, { pagina: 'c', v: 2 }];
  const f = (m) => m.reduce((s, x) => s + x.v, 0) / m.length;
  assert.deepEqual(bootstrap(items, f), bootstrap(items, f));
  const r = bootstrap(items, (m) => (m.some((x) => x.pagina === 'a') ? 1 : null));
  assert.ok(r.replicas_validas > 0 && r.replicas_validas < 2000);
  assert.equal(bootstrap([items[0]], f).ic95, null, 'una sola página no da intervalo');
});

test('compara canales, panel por canal y segunda medida con lo no comparable contado', (t) => {
  const d = tmp(t), c1 = path.join(d, 'c1'), c2 = path.join(d, 'c2');
  const [P0, P1, P2] = [PAGINAS[0], PAGINAS[1], PAGINAS.find((p) => p.id === 'G01')];
  // C2: en G7 el screenshot da un nivel más que el wireframe en las tres páginas.
  // G3: el wireframe puntúa y el screenshot se abstiene (P0); al revés en P1.
  for (const [p, w7] of [[P0, 0], [P1, 1], [P2, 2]]) {
    const niv = {};
    for (const g of DOBLE) niv[g] = { wireframe: 2, screenshot: 2 };
    niv.G7 = { wireframe: w7, screenshot: w7 + 1 };
    if (p === P0) niv.G3 = { wireframe: 2, screenshot: 'A' };
    if (p === P1) niv.G3 = { wireframe: 'NA', screenshot: 3 };
    niv.G4 = { screenshot: 3 };
    pagina(c2, p, niv, { huella: (g) => (g === 'G5' && p === P0 ? 'otra' : 'h') });
    // C1: mismo wireframe salvo G2, que dio 3 en lugar de 2.
    const ant = { G4: { screenshot: 3 } };
    for (const g of DOBLE) ant[g] = { wireframe: niv[g].wireframe };
    ant.G2 = { wireframe: 3 };
    pagina(c1, p, ant);
  }
  // Panel: 3 en todo.
  const csv = path.join(d, 'panel.csv');
  fs.writeFileSync(csv, 'evaluador,pagina,grupo,nivel\n' + [P0, P1, P2].flatMap((p) => ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'].map((g) => 'E1,' + p.id + ',' + g + ',3')).join('\n') + '\n');

  const r = compararCanales({ corrida: c2, anterior: c1, panelCsv: csv });
  assert.equal(r.ok, true, (r.problemas || []).join('; '));
  assert.equal(r.paginas_cerradas.length, 3);
  assert.equal(r.paginas_no_ejecutadas.length, 27);

  const g7 = r.todas.entre_canales.por_grupo.G7;
  assert.equal(g7.n, 3);
  assert.equal(g7.diferencia_media_s_menos_w, 1);
  assert.deepEqual(g7.ic95_diferencia, [1, 1]);
  assert.equal(g7.exacto, 0);
  assert.equal(g7.a_un_nivel, 1);
  assert.ok(g7.marcas.includes('n_pequeno'));
  assert.ok(r.todas.entre_canales.por_grupo.G2.marcas.includes('nivel_casi_constante'));
  const nc = r.todas.entre_canales.no_comparables.G3;
  assert.deepEqual(nc.wireframe_puntuo_screenshot_no, { sin_puntaje: 1 });
  assert.deepEqual(nc.screenshot_puntuo_wireframe_no, { no_aplica: 1 });

  // Panel: en G7 el screenshot (1, 2, 3 -> 1, 2, 3) queda más cerca del 3 que el wireframe (0, 1, 2 -> 1, 1, 2).
  const p7 = r.todas.con_panel.por_grupo.G7.comunes;
  assert.equal(p7.n, 3);
  assert.ok(p7.delta_kappa_b_menos_a > 0);
  assert.ok(p7.delta_diferencia_media_b_menos_a > 0);
  assert.equal(r.todas.con_panel.G4_un_solo_canal.n, 3);
  assert.equal(r.todas.con_panel.por_grupo.G3.comunes.n, 1, 'solo P2 tiene los dos brazos en G3');
  assert.equal(r.todas.con_panel.por_grupo.G3.propias.a_wireframe.n, 2);

  // Segunda medida: G2 cambió de 3 a 2 en las tres; G5 de P0 tiene otro prompt y no entra.
  const s2 = r.todas.segunda_medida['G2/wireframe'];
  assert.equal(s2.fraccion_repite, 0);
  assert.equal(s2.rango_maximo, 1);
  assert.equal(r.todas.segunda_medida['G7/wireframe'].fraccion_repite, 1);
  assert.deepEqual(r.todas.segunda_medida['G5/wireframe'].paginas_con_huella_distinta, [P0.id]);
  assert.equal(r.todas.segunda_medida['G4/screenshot'].repiten_nivel, 3);

  // Sin las páginas marcadas sale G01.
  assert.equal(r.sin_marcadas.entre_canales.por_grupo.G7.n, 2);
  assert.equal(r.todas.no_puntuado['G3/screenshot'].sin_puntaje, 1);
});
