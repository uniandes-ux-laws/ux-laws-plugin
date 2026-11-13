'use strict';
// Pruebas del libro consolidado del panel (seis hojas «Experto n», escala 1–4) y de la
// comparación del sistema con el panel. Todo en carpetas temporales; nada toca panel/.
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), os = require('os'), path = require('path');
const { xlsx } = require('./xlsx-minimo');
const { leerLibro, importar, describir, cargarConsolidado, corpus, GRUPOS } = require('./panel-consolidado');
const { comparar, nivelSistema, medianaInferior, tauB, resumen, aEscalaPanel, P_E, peso } = require('./comparar-panel');

const tmp = (t) => { const d = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-consolidado-')); t.after(() => fs.rmSync(d, { recursive: true, force: true })); return d; };
const PAGINAS = corpus();
const CAB = ['pagina', 'sitio', 'url (solo referencia)', 'grupo', 'descripcion', 'calificación (1-4)'];

/** Libro como el del equipo: guía + seis hojas de cinco páginas cada una. */
function libro(nivel = () => 2, cambiar = (h) => h) {
  const hojas = [{ nombre: 'Guia de Grupos', filas: [['Grupo', 'Nombre'], ['G1', 'Agrupación perceptual']] }];
  for (let e = 1; e <= 6; e++) {
    const filas = [CAB];
    for (const p of PAGINAS.slice((e - 1) * 5, e * 5)) for (const g of GRUPOS) filas.push([p.id, 'sitio', p.url, g, 'desc', String(nivel(p, g, e))]);
    hojas.push(cambiar({ nombre: 'Experto ' + e, filas }, e));
  }
  return xlsx(hojas, { creator: 'openpyxl', lastModifiedBy: 'Alguien del equipo' });
}

test('importa las 210 filas como E1…E6 sin copiar metadatos', (t) => {
  const d = tmp(t), f = path.join(d, 'libro.xlsx');
  fs.writeFileSync(f, libro((p, g, e) => 1 + ((e + GRUPOS.indexOf(g)) % 4)));
  const r = importar(f, { out: d });
  assert.equal(r.ok, true, r.problemas.join('; '));
  assert.equal(r.filas, 210);
  assert.deepEqual(r.evaluadores, ['E1', 'E2', 'E3', 'E4', 'E5', 'E6']);
  const csv = fs.readFileSync(path.join(d, 'panel-consolidado.csv'), 'utf8');
  assert.equal(csv.split('\n')[0], 'evaluador,pagina,grupo,nivel');
  assert.ok(!/Alguien|openpyxl/.test(csv + fs.readFileSync(path.join(d, 'panel-consolidado.fuente.json'), 'utf8')));
  assert.equal(importar(f, { out: d }).ok, false, 'no pisa sin --force');
  assert.equal(importar(f, { out: d, forzar: true }).ok, true);
});

test('rechaza niveles fuera de 1–4, páginas ajenas, URL distinta y unidades repetidas', (t) => {
  const d = tmp(t);
  const casos = [
    [libro((p, g) => (p.id === PAGINAS[0].id && g === 'G3' ? 0 : 2)), /no es un entero de 1 a 4/],
    [libro(() => 2, (h, e) => (e === 2 ? { ...h, filas: [...h.filas, ['Z99', 's', 'https://x.co/', 'G1', 'd', '2']] } : h)), /no está en el corpus/],
    [libro(() => 2, (h, e) => (e === 3 ? { ...h, filas: h.filas.map((r, i) => (i === 1 ? [r[0], r[1], 'https://otra.gov.co/', ...r.slice(3)] : r)) } : h)), /URL no coincide/],
    [libro(() => 2, (h, e) => (e === 4 ? { ...h, filas: [...h.filas, h.filas[1]] } : h)), /repetida para E4/],
    [libro(() => 2, (h, e) => (e === 5 ? { ...h, filas: h.filas.map((r, i) => (i === 2 ? [...r.slice(0, 3), 'G9', ...r.slice(4)] : r)) } : h)), /no es G1…G7/],
  ];
  for (const [buf, patron] of casos) {
    const f = path.join(d, 'x.xlsx'); fs.writeFileSync(f, buf);
    const r = leerLibro(f);
    assert.equal(r.ok, false); assert.match(r.problemas.join('\n'), patron);
    assert.equal(importar(f, { out: d }).ok, false);
    assert.ok(!fs.existsSync(path.join(d, 'panel-consolidado.csv')), 'no escribe nada si algo no cuadra');
  }
});

test('describir cuenta por grupo, evaluador y estrato, y detecta perfiles repetidos', (t) => {
  const d = tmp(t), f = path.join(d, 'libro.xlsx');
  // Todas las páginas con el mismo perfil salvo la primera de E1.
  fs.writeFileSync(f, libro((p, g) => (p.id === PAGINAS[0].id ? 4 : (g === 'G6' ? 3 : 2))));
  importar(f, { out: d });
  const x = describir(cargarConsolidado(path.join(d, 'panel-consolidado.csv')));
  assert.equal(x.calificaciones, 210);
  assert.equal(x.calificaciones_por_unidad_max, 1);
  assert.match(x.acuerdo_entre_evaluadores, /no calculable/);
  assert.deepEqual(x.por_grupo.G6.distribucion, { 1: 0, 2: 0, 3: 29, 4: 1 });
  assert.equal(x.perfiles_distintos, 2);
  assert.equal(x.perfiles_repetidos[0].perfil, '2 2 2 2 2 3 2');
  assert.equal(x.perfiles_repetidos[0].paginas.length, 29);
  assert.deepEqual(x.por_evaluador.E1.estratos, [PAGINAS[0].estrato]);
});

test('reglas de la comparación: mediana inferior, mayoría, escala común y p_e', () => {
  assert.equal(medianaInferior([3, 1, 2, 4]), 2);
  assert.equal(medianaInferior([2]), 2);
  const ev = (estado, score) => ({ estado, score });
  assert.deepEqual(nivelSistema([ev('puntaje', 3), ev('puntaje', 2), ev('abstencion', null)]).nivel, 2);
  assert.equal(nivelSistema([ev('puntaje', 3), ev('abstencion', null)]).estado, 'sin_puntaje', 'la mitad no es mayoría');
  assert.equal(nivelSistema([ev('no_aplica', null), ev('no_aplica', null), ev('puntaje', 1)]).estado, 'no_aplica');
  assert.deepEqual([0, 1, 2, 3, 4].map(aEscalaPanel), [1, 1, 2, 3, 4]);
  assert.ok(Math.abs(P_E - 104 / 144) < 1e-12, 'p_e con k = 4 y pesos cuadráticos es 104/144');
  assert.equal(peso(1, 4), 0); assert.ok(Math.abs(peso(2, 3) - 8 / 9) < 1e-12);
});

test('tau-b y κ_BP en casos conocidos', () => {
  assert.equal(tauB([1, 2, 3, 4], [1, 2, 3, 4]), 1);
  assert.equal(tauB([1, 2, 3, 4], [4, 3, 2, 1]), -1);
  assert.equal(tauB([2, 2, 2], [1, 2, 3]), null, 'constante: no definido');
  // Con empates: x = 1 1 2 2, y = 1 2 1 2 -> c = 1, d = 1 -> 0.
  assert.equal(tauB([1, 1, 2, 2], [1, 2, 1, 2]), 0);
  const perfecto = resumen([1, 2, 3, 4].map((v, i) => ({ pagina: 'p' + i, sistema: v, panel: v, original: v })));
  assert.equal(perfecto.kappa_bp, 1); assert.equal(perfecto.exacto, 1);
  // Desacuerdo máximo en todas: p_o = 0 -> κ = (0 − p_e)/(1 − p_e).
  const peor = resumen([{ pagina: 'a', sistema: 1, panel: 4, original: 0 }]);
  assert.equal(peor.kappa_bp, +((-P_E) / (1 - P_E)).toFixed(4));
  assert.equal(peor.ceros_del_sistema, 1);
});

test('compara perfiles reales en forma con el panel, por runtime, con exclusiones contadas', (t) => {
  const d = tmp(t), f = path.join(d, 'libro.xlsx');
  fs.writeFileSync(f, libro((p, g) => (g === 'G4' ? 4 : 3)));
  importar(f, { out: d });
  const escribirPerfil = (nombre, pagina, runtime, nivelDe) => {
    const dir = path.join(d, nombre); fs.mkdirSync(dir, { recursive: true });
    const perfil = GRUPOS.flatMap((g) => ['wireframe', 'screenshot'].map((canal) => ({
      group_id: g.toLowerCase(), channel: canal,
      evaluaciones: nivelDe(g, canal).map((s) => (s === null ? { estado: 'abstencion', score: null } : s === 'NA' ? { estado: 'no_aplica', score: null } : { estado: 'puntaje', score: s })),
    })));
    fs.writeFileSync(path.join(dir, 'perfil.json'), JSON.stringify({ configuracion: { runtime, model_id: 'm' }, captura: { url: pagina.url + '/' }, perfil }));
    return path.join(dir, 'perfil.json');
  };
  // Página 1: el sistema coincide salvo G4 en wireframe, que no cuenta (G4 se toma del screenshot).
  const a = escribirPerfil('a', PAGINAS[0], 'rt1', (g, c) => (g === 'G4' ? (c === 'screenshot' ? [4, 4, 4] : [0, 0, 0]) : [3, 3, 2]));
  // Página 2: G1 con 0 (se lee como 1), G2 abstiene, G3 NA.
  const b = escribirPerfil('b', PAGINAS[1], 'rt1', (g) => (g === 'G1' ? [0] : g === 'G2' ? [null, null, 3] : g === 'G3' ? ['NA', 'NA', 2] : [3]));
  const c = escribirPerfil('c', PAGINAS[0], 'rt2', () => [1]);
  const r = comparar([a, b, c], path.join(d, 'panel-consolidado.csv'));
  assert.equal(r.ok, true, (r.problemas || []).join('; '));
  const rt1 = r.runtimes['rt1 · m'];
  assert.equal(rt1.con_G1.n, 7 + 5);
  assert.equal(rt1.excluidas.sin_puntaje_del_sistema, 1);
  assert.equal(rt1.excluidas.no_aplica_del_sistema, 1);
  assert.equal(rt1.excluidas.sin_dato_del_sistema, 210 - 14);
  const g4a = rt1.unidades.find((u) => u.pagina === PAGINAS[0].id && u.grupo === 'G4');
  assert.equal(g4a.sistema_0a4, 4, 'G4 sale del screenshot, no del wireframe');
  assert.equal(rt1.unidades.find((u) => u.pagina === PAGINAS[0].id && u.grupo === 'G2').sistema_0a4, 3, 'mediana inferior de 3, 3, 2');
  assert.equal(rt1.por_grupo.G1.ceros_del_sistema, 1);
  assert.equal(rt1.sin_G1.n, 10);
  assert.ok(r.runtimes['rt2 · m'], 'cada runtime aparte');
  // Una página fuera del corpus detiene la comparación.
  const z = escribirPerfil('z', { url: 'https://no-esta.example' }, 'rt1', () => [3]);
  assert.equal(comparar([z], path.join(d, 'panel-consolidado.csv')).ok, false);
});
