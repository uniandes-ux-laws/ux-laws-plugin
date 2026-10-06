'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { detectarListas, orientacion } = require('./g5-lists');
function node(id, name, x, y, w = 20, h = 20, parentId = 10) {
  return { id, nodeName: name, parentId, ink: { x, y, w, h }, paintOrder: id, attributes: {} };
}
function detect(nodes, controls = []) {
  const byId = new Map(nodes.map(n => [n.id, n]));
  return detectarListas({ nodos: nodes, viewport: { width: 1440, height: 900 },
    inventarioAccionables: { objetivosG2: nodes.filter(n => controls.includes(n.id)) },
    ancestros: n => { const result = []; let p = byId.get(n.parentId); while (p) { result.push(p); p = byId.get(p.parentId); } return result; } });
}
test('menú de LI de alturas distintas alineado por el centro', () => {
  const nodes = [node(1, 'LI', 10, 20, 20, 32), node(2, 'LI', 100, 28, 20, 16), node(3, 'LI', 200, 24, 20, 24)];
  const [list] = detect(nodes.reverse()); assert.equal(list.orientacion, 'horizontal'); assert.deepEqual(list.items.map(n => n.id), [1, 2, 3]);
});
test('columna de anchos distintos alineada por el centro', () => {
  assert.equal(orientacion([node(1, 'LI', 10, 10, 40), node(2, 'LI', 20, 100, 20), node(3, 'LI', 15, 200, 30)]), 'vertical');
});
test('fila alineada por el borde inferior', () => {
  assert.equal(orientacion([node(1, 'LI', 10, 10, 20, 40), node(2, 'LI', 100, 20, 20, 30), node(3, 'LI', 200, 30, 20, 20)]), 'horizontal');
});
test('texto y pseudoelementos no constituyen listas', () => {
  for (const name of ['#text', '::after', '::before']) assert.equal(detect([0, 40, 80].map((x, i) => node(i + 1, name, x, 10))).length, 0);
});
test('párrafos alineados sin opciones no constituyen listas', () => {
  assert.equal(detect([10, 50, 90].map((y, i) => node(i + 1, 'P', 10, y))).length, 0);
});
test('opciones de A y BUTTON hermanos forman una sola secuencia', () => {
  const nodes = [node(1, 'BUTTON', 10, 10), node(2, 'BUTTON', 80, 10), node(3, 'A', 200, 10)];
  assert.equal(detect(nodes, [1, 2, 3]).length, 1);
});
test('tarjetas con controles pueden ser opciones; un título sin control queda fuera', () => {
  const nodes = [node(1, 'DIV', 10, 10), node(2, 'DIV', 80, 10), node(3, 'DIV', 150, 10), node(4, 'H2', 220, 10),
    node(11, 'A', 10, 10, 10, 10, 1), node(12, 'A', 80, 10, 10, 10, 2), node(13, 'A', 150, 10, 10, 10, 3)];
  const [list] = detect(nodes, [11, 12, 13]); assert.deepEqual(list.items.map(n => n.id), [1, 2, 3]);
});
test('geometría sin alineación no se convierte en lista', () => {
  assert.equal(orientacion([node(1, 'LI', 10, 10), node(2, 'LI', 100, 100), node(3, 'LI', 200, 200)]), null);
});
test('tolera cuatro píxeles, sin ampliar el umbral', () => {
  assert.equal(orientacion([node(1, 'LI', 10, 10), node(2, 'LI', 100, 14), node(3, 'LI', 200, 10)]), 'horizontal');
  assert.equal(orientacion([node(1, 'LI', 10, 10), node(2, 'LI', 100, 14.1), node(3, 'LI', 200, 10)]), null);
});
test('declara recorte y solapamiento sin sustituir ink por bounds', () => {
  const list = detect([node(1, 'LI', -10, 10), node(2, 'LI', 5, 10), node(3, 'LI', 40, 10)])[0];
  assert.equal(list.parcial, true); assert.equal(list.orden_ambiguo, true); assert.equal(list.items[0].ink.x, -10); assert.equal(list.area_visible_total, 1000);
});
test('no trunca a ocho listas ni duplica registros', () => {
  const nodes = Array.from({ length: 9 }, (_, p) => [0, 30, 60].map((x, i) => node(p * 3 + i + 1, 'LI', x, p * 30, 20, 20, 100 + p))).flat();
  assert.equal(detect([...nodes, nodes[0]]).length, 9);
});
