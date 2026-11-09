'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { construirInventario } = require('./actionable-inventory');
const { medirCaptura } = require('./measure-page');

const viewport = { width: 1440, height: 900 };
const box = (x = 10, y = 10, w = 40, h = 40) => ({ x, y, w, h });
const node = (id, nodeName, bounds = box(), extra = {}) => ({
  id, nodeName, bounds, ink: { ...bounds }, parentId: 2, paintOrder: id,
  isClickable: false, attributes: {}, visibleBoundary: { visible: false }, ...extra,
});
const roots = () => [
  node(0, '#document', box(0, 0, 1440, 900), { parentId: null, isClickable: true }),
  node(1, 'HTML', box(0, 0, 1440, 900), { parentId: 0, isClickable: true }),
  node(2, 'BODY', box(0, 0, 1440, 900), { parentId: 1, isClickable: true }),
];
const inventario = nodes => construirInventario([...roots(), ...nodes], { viewport, atributosEstadoRegistrados: true });
const ids = inv => inv.objetivos.map(n => n.id);

function medir(t, nodes) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-actionable-test-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.writeFileSync(path.join(dir, 'nodes.json'), JSON.stringify([...roots(), ...nodes]));
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify({
    url: 'https://example.invalid/controlled-fixture', capturedAt: '2026-10-06T12:00:00Z',
    viewport, sha256: {}, nodes: {}, interactionAttributesVersion: '1.0.0',
  }));
  return medirCaptura(dir);
}

test('raíces con listeners no crean opciones ni objetivos de clic', (t) => {
  const m = medir(t, []);
  assert.equal(m.g2.g2_n_total, 0);
  assert.equal(m.g2.g2_no_aplicable, true);
  assert.equal(m.g7.g7_N_obj, 0);
  assert.equal(m.g7.g7_no_aplicable, true);
});

test('controles nativos, enlaces y roles se reconocen sin bandera del motor', (t) => {
  const controles = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].map((tag, i) => node(10 + i, tag, box(i * 60)));
  controles.push(node(20, 'A', box(300), { attributes: { href: '' } }));
  controles.push(node(21, 'DIV', box(360), { attributes: { role: 'button' } }));
  const m = medir(t, controles);
  assert.equal(m.g2.g2_n_total, 6);
  assert.equal(m.g7.g7_N_obj, 6);
});

test('texto, raíces ARIA no operables y enlaces sin destino ni listener no son controles', () => {
  assert.deepEqual(ids(inventario([
    node(10, '#text', box(), { isClickable: true }),
    node(11, '::before', box(), { isClickable: true }),
    node(12, 'NAV', box(), { attributes: { role: 'navigation' } }),
    node(13, 'P'), node(14, 'A'),
  ])), []);
});

test('un icono con clic dentro de un enlace se mide con la caja del enlace', (t) => {
  const m = medir(t, [
    node(10, 'A', box(10, 10, 60, 48), { isClickable: true, attributes: { href: '/' } }),
    node(11, 'IMG', box(20, 20, 12, 12), { parentId: 10, isClickable: true }),
  ]);
  assert.equal(m.g2.g2_n_total, 1);
  assert.equal(m.g7.g7_N_obj, 1);
  assert.equal(m.g7.g7_W_min, 48);
  assert.equal(m.g7.g7_p_T3.afectados, 0);
});

test('contenedores con varios controles no inflan el conteo ni la dominancia', (t) => {
  const m = medir(t, [
    node(10, 'DIV', box(0, 0, 1000, 600), { isClickable: true }),
    node(11, 'BUTTON', box(20, 20, 40, 40), { parentId: 10 }),
    node(12, 'BUTTON', box(100, 20, 40, 40), { parentId: 10 }),
  ]);
  assert.equal(m.g2.g2_n_total, 2);
  assert.equal(m.g2.g2_razon_area_1_2, 1);
  assert.equal(m.g7.g7_N_obj, 2);
  assert.equal(m.g7.g7_razon_area_1_2, 1);
});

test('un control explícito y otro explícito anidado conservan identidades distintas', () => {
  assert.deepEqual(ids(inventario([
    node(10, 'DIV', box(0, 0, 200, 100), { attributes: { role: 'button' } }),
    node(11, 'BUTTON', box(100), { parentId: 10 }),
    node(12, 'IMG', box(110, 20, 10, 10), { parentId: 11, isClickable: true }),
  ])), [10, 11]);
});

test('una tarjeta personalizada sin controles internos sigue siendo un objetivo', () => {
  assert.deepEqual(ids(inventario([node(10, 'DIV', box(0, 0, 400, 200), { isClickable: true })])), [10]);
});

test('cadena genérica de una rama conserva la caja exterior y registra el supuesto', () => {
  const inv = inventario([
    node(10, 'DIV', box(0, 0, 80, 60), { isClickable: true }),
    node(11, 'SPAN', box(10, 10, 10, 10), { parentId: 10, isClickable: true }),
  ]);
  assert.deepEqual(ids(inv), [10]);
  assert.equal(inv.auditoria.excluidos.find(x => x.id === 11).representado_por, 10);
  assert.ok(inv.auditoria.ambiguos.some(x => x.id === 11));
});

test('varias ramas personalizadas permanecen separadas del contenedor común', () => {
  const inv = inventario([
    node(10, 'DIV', box(0, 0, 400, 100), { isClickable: true }),
    node(11, 'DIV', box(10), { parentId: 10, isClickable: true }),
    node(12, 'SPAN', box(20), { parentId: 11, isClickable: true }),
    node(13, 'DIV', box(100), { parentId: 10, isClickable: true }),
    node(14, 'SPAN', box(110), { parentId: 13, isClickable: true }),
  ]);
  assert.deepEqual(ids(inv), [11, 13]);
});

test('hermanos no se fusionan por URL ni geometría iguales', () => {
  assert.deepEqual(ids(inventario([
    node(10, 'A', box(), { attributes: { href: '/' } }),
    node(11, 'A', box(), { attributes: { href: '/' } }),
  ])), [10, 11]);
});

test('un widget compuesto con componentes no añade un objetivo exterior', () => {
  assert.deepEqual(ids(inventario([
    node(10, 'DIV', box(0, 0, 200, 50), { attributes: { role: 'combobox' } }),
    node(11, 'INPUT', box(), { parentId: 10 }),
    node(12, 'BUTTON', box(70), { parentId: 10 }),
  ])), [11, 12]);
});

test('geometría inválida, área cero e inputs ocultos se excluyen', () => {
  assert.deepEqual(ids(inventario([
    node(10, 'BUTTON', box(10, 10, 0, 40)),
    node(11, 'BUTTON', box(NaN)),
    node(12, 'INPUT', box(), { attributes: { type: 'hidden' } }),
  ])), []);
});

test('se conserva la caja completa de objetivos parcialmente visibles', () => {
  const inv = inventario([
    node(10, 'BUTTON', box(-20, 10, 40, 40)),
    node(11, 'BUTTON', box(1500)),
  ]);
  assert.deepEqual(ids(inv), [10]);
  assert.equal(inv.objetivos[0].bounds.w, 40);
});

test('estados explícitamente inactivos se excluyen sin inventar estados ausentes', () => {
  const inv = inventario([
    node(10, 'BUTTON', box(), { attributes: { disabled: '' } }),
    node(11, 'DIV', box(100), { attributes: { role: 'button', 'aria-disabled': 'true' } }),
    node(12, 'DIV', box(200), { attributes: { inert: '' } }),
    node(13, 'BUTTON', box(210), { parentId: 12 }),
    node(14, 'BUTTON', box(300), { attributes: { 'aria-disabled': 'false' } }),
  ]);
  assert.deepEqual(ids(inv), [14]);
});

test('G2 exige tinta visible y G7 conserva el área de clic', (t) => {
  const m = medir(t, [node(10, 'BUTTON', box(), { ink: null })]);
  assert.equal(m.g2.g2_n_total, 0);
  assert.equal(m.g7.g7_N_obj, 1);
});

test('G2 reparte cada opción una vez entre sus grupos visibles', (t) => {
  const m = medir(t, [
    node(10, 'DIV', box(0, 0, 200, 100), { visibleBoundary: { visible: true }, isClickable: true }),
    node(11, 'BUTTON', box(), { parentId: 10 }),
    node(12, 'BUTTON', box(100), { parentId: 10 }),
    node(20, 'DIV', box(300, 0, 200, 100), { visibleBoundary: { visible: true } }),
    node(21, 'BUTTON', box(310), { parentId: 20 }),
  ]);
  assert.equal(m.g2.g2_n_total, 3);
  assert.equal(m.g2.g2_n1, 2);
  assert.equal(m.g2.g2_n_max, 2);
  assert.equal(m.g2.g2_fraccion_agrupada, 1);
  assert.deepEqual(m.g2.g2_grupos.map(g => g.ids), [[11, 12], [21]]);
});

test('G7 aplica holgura a un objetivo pequeño aislado sin colisión con raíces', (t) => {
  const m = medir(t, [node(10, 'BUTTON', box(100, 100, 10, 10))]);
  assert.equal(m.g7.g7_N_obj, 1);
  assert.equal(m.g7.g7_p_T1.afectados, 0);
  assert.equal(m.g7.g7_p_T3.p, 1);
});

test('G7 detecta colisión de círculos de holgura entre objetivos pequeños', (t) => {
  const m = medir(t, [node(10, 'BUTTON', box(100, 100, 10, 10)), node(11, 'BUTTON', box(120, 100, 10, 10))]);
  assert.equal(m.g7.g7_N_bajo24, 2);
  assert.equal(m.g7.g7_N_bajo24_sin_holgura, 2);
  assert.equal(m.g7.g7_p_T1.afectados, 2);
  assert.equal(m.g7.g7_p_T1.denominador, 2);
});

test('G7 cuenta pares adyacentes afectados, no sus dos extremos', (t) => {
  const m = medir(t, [node(10, 'BUTTON', box(0, 10, 24, 24)), node(11, 'BUTTON', box(28, 10, 24, 24)), node(12, 'BUTTON', box(56, 10, 24, 24))]);
  assert.equal(m.g7.g7_pares_adyacentes, 2);
  assert.equal(m.g7.g7_p_T2.afectados, 2);
  assert.equal(m.g7.g7_p_T2.denominador, 2);
  assert.equal(m.g7.g7_p_T2.p, 1);
  assert.deepEqual(m.g7.g7_p_T2.pares_afectados, [[10, 11], [11, 12]]);
  assert.deepEqual(m.g7.g7_p_T2.ids_afectados, [10, 11, 12]);
  assert.deepEqual(m.g7.g7_pares_adyacentes_detalle, [
    { ids: [10, 11], separacion: 4 }, { ids: [11, 12], separacion: 4 },
  ]);
});

test('G7 conserva los umbrales exactos de 24, 32 y 8 px', (t) => {
  const m = medir(t, [node(10, 'BUTTON', box(0, 10, 24, 24)), node(11, 'BUTTON', box(32, 10, 32, 32))]);
  assert.equal(m.g7.g7_p_T1.afectados, 0);
  assert.equal(m.g7.g7_p_T3.afectados, 1);
  assert.equal(m.g7.g7_p_T2.afectados, 0);
  assert.equal(m.g7.g7_S_min, 8);
});

test('G7 conserva la tolerancia de 2 px por familia', (t) => {
  const iguales = medir(t, [node(10, 'BUTTON', box(10, 10, 40, 40)), node(11, 'BUTTON', box(100, 10, 42, 42))]);
  assert.equal(iguales.g7.g7_p_T4.afectados, 0);
  const distintos = medir(t, [node(10, 'BUTTON', box(10, 10, 40, 40)), node(11, 'BUTTON', box(100, 10, 43, 43))]);
  assert.equal(distintos.g7.g7_p_T4.afectados, 2);
  assert.equal(distintos.g7.g7_p_T4.denominador, 2);
});

test('G7 verifica el ancho y la altura de la familia aunque la dimensión menor sea igual', (t) => {
  const m = medir(t, [node(10, 'BUTTON', box(10, 10, 40, 40)), node(11, 'BUTTON', box(100, 10, 90, 40))]);
  assert.equal(m.g7.g7_p_T4.afectados, 2);
  assert.equal(m.g7.g7_families_consistent, false);
  assert.deepEqual(m.g7.g7_familias_detalle, [{
    nodeName: 'BUTTON', parentId: 2, ids: [10, 11], rango_ancho: 50, rango_alto: 0, consistente: false,
  }]);
});

test('G7 informa la tinta reducida sin usarla como área de clic ni inventar tinta ausente', (t) => {
  const m = medir(t, [
    node(10, 'BUTTON', box(10, 10, 80, 40), { ink: box(20, 20, 20, 10) }),
    node(11, 'INPUT', box(200, 10, 60, 40), { ink: null }),
    node(12, 'A', box(300, 10, 60, 40), { attributes: { href: '/' }, ink: box(330, 30, 0, 0) }),
  ]);
  assert.equal(m.g7.g7_W_min, 40);
  assert.equal(m.g7.g7_objetivos[0].dimension_menor, 40);
  assert.equal(m.g7.g7_objetivos[0].razon_area_tinta_bounds, 0.0625);
  assert.equal(m.g7.g7_objetivos[1].razon_area_tinta_bounds, null);
  assert.equal(m.g7.g7_objetivos[2].ink, null);
  assert.equal(m.g7.g7_objetivos[2].razon_area_tinta_bounds, null);
  assert.deepEqual(m.g7.g7_objetivos_con_tinta_reducida.map(o => o.id), [10]);
});

test('G7 distingue falta de pares o familias de una proporción impecable', (t) => {
  const m = medir(t, [node(10, 'BUTTON')]);
  assert.equal(m.g7.g7_p_T2.p, null);
  assert.equal(m.g7.g7_p_T4.p, null);
  assert.equal(m.g7.g7_families_consistent, null);
  assert.deepEqual(m.g7.g7_pares_adyacentes_detalle, []);
  assert.deepEqual(m.g7.g7_familias_detalle, []);
});

test('G7 acepta círculos de holgura tangentes sin cambiarlos por solapamiento', (t) => {
  const m = medir(t, [node(10, 'BUTTON', box(100, 100, 10, 10)), node(11, 'BUTTON', box(124, 100, 10, 10))]);
  assert.equal(m.g7.g7_N_bajo24, 2);
  assert.equal(m.g7.g7_N_bajo24_sin_holgura, 0);
});

test('G7 conserva la separación sin redondear para explicar el umbral de 8 px', (t) => {
  const m = medir(t, [node(10, 'BUTTON', box(0, 10, 24, 24)), node(11, 'BUTTON', box(31.96, 10, 24, 24))]);
  assert.equal(m.g7.g7_p_T2.afectados, 1);
  assert.ok(m.g7.g7_pares_adyacentes_detalle[0].separacion < 8);
});

test('el inventario es estable aunque cambie el orden del archivo de nodos', () => {
  const nodes = [node(11, 'BUTTON', box()), node(10, 'A', box(100), { attributes: { href: '/' } })];
  assert.deepEqual(inventario(nodes).auditoria, inventario(nodes.reverse()).auditoria);
});

test('ids duplicados y ciclos de ancestros se rechazan explícitamente', () => {
  assert.throws(() => inventario([node(10, 'BUTTON'), node(10, 'INPUT')]), /duplicado/);
  assert.throws(() => inventario([node(10, 'BUTTON', box(), { parentId: 11 }), node(11, 'DIV', box(), { parentId: 10 })]), /ciclo/);
});

test('las capturas antiguas declaran la ausencia de metadatos de estado', () => {
  const inv = construirInventario([node(10, 'BUTTON')], { viewport });
  assert.equal(inv.auditoria.atributos_estado_registrados, false);
  assert.ok(inv.auditoria.limitaciones.some(l => l.startsWith('Captura antigua')));
});

test('fragmentos decorativos del mismo nodo y controles idénticos no se cuentan dos veces', () => {
  const control = node(10, 'BUTTON');
  const pseudo = node(20, '::before', box(), { parentId: 10 });
  assert.deepEqual(ids(inventario([control, { ...control }, pseudo, { ...pseudo, ink: null }])), [10]);
});

test('un fieldset deshabilitado conserva la excepción de su primera leyenda', () => {
  const inv = inventario([
    node(10, 'FIELDSET', box(0, 0, 400, 200), { attributes: { disabled: '' } }),
    node(11, 'LEGEND', box(), { parentId: 10 }),
    node(12, 'BUTTON', box(), { parentId: 11 }),
    node(13, 'BUTTON', box(100), { parentId: 10 }),
    node(14, 'LEGEND', box(200), { parentId: 10 }),
    node(15, 'BUTTON', box(200), { parentId: 14 }),
  ]);
  assert.deepEqual(ids(inv), [12]);
});
