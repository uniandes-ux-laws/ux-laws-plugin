'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { medirCaptura } = require('./measure-page');

// Fixtures de geometría controlada: no son páginas ni resultados del estudio.
function medirLista(t, posiciones, { vertical = false, cajasEstiradas = false } = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-g5-spacing-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const nodos = posiciones.map((posicion, i) => {
    const ink = { x: vertical ? 10 : posicion, y: vertical ? posicion : 10, w: 20, h: 20 };
    return {
      id: i + 1, parentId: 0, nodeName: 'BUTTON', paintOrder: i,
      bounds: cajasEstiradas ? { x: 0, y: 0, w: 600, h: 600 } : { ...ink },
      ink, isClickable: true, attributes: {}, visibleBoundary: { visible: false },
    };
  });
  // Orden de almacenamiento distinto del orden espacial.
  fs.writeFileSync(path.join(dir, 'nodes.json'), JSON.stringify(nodos.reverse()));
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify({
    url: 'https://example.invalid/g5-fixture', capturedAt: '2026-10-06T12:00:00.000Z',
    viewport: { width: 1440, height: 900 }, sha256: {}, nodes: { total: nodos.length },
  }));
  return medirCaptura(dir);
}

test('G5 mide el extremo final contra su vecino, no contra el segundo elemento', (t) => {
  const { g5 } = medirLista(t, [0, 40, 80, 300]);
  assert.equal(g5.g5_listas_total, 1);
  const lista = g5.g5_listas[0];
  assert.equal(lista.orientacion, 'horizontal');
  assert.equal(lista.primero.id, 1);
  assert.equal(lista.ultimo.id, 4);
  assert.equal(lista.primero.rasgos.separado, 20);
  assert.equal(lista.ultimo.rasgos.separado, 200);
});

test('G5 conserva separaciones iguales en una lista equidistante', (t) => {
  const lista = medirLista(t, [0, 40, 80, 120]).g5.g5_listas[0];
  assert.equal(lista.primero.rasgos.separado, 20);
  assert.equal(lista.ultimo.rasgos.separado, 20);
});

test('G5 calcula ambos extremos cuando la lista tiene tres elementos', (t) => {
  const lista = medirLista(t, [0, 50, 200]).g5.g5_listas[0];
  assert.equal(lista.n, 3);
  assert.equal(lista.primero.rasgos.separado, 30);
  assert.equal(lista.ultimo.rasgos.separado, 130);
});

test('G5 mide la separación de listas verticales', (t) => {
  const lista = medirLista(t, [10, 110, 150, 370], { vertical: true }).g5.g5_listas[0];
  assert.equal(lista.orientacion, 'vertical');
  assert.equal(lista.primero.rasgos.separado, 80);
  assert.equal(lista.ultimo.rasgos.separado, 200);
});

test('G5 mide sobre ink aunque las cajas de layout sean más grandes', (t) => {
  const lista = medirLista(t, [0, 40, 80, 300], { cajasEstiradas: true }).g5.g5_listas[0];
  assert.equal(lista.primero.rasgos.separado, 20);
  assert.equal(lista.ultimo.rasgos.separado, 200);
});

test('G5 devuelve distancia cero para extremos que tocan o solapan al vecino', (t) => {
  const lista = medirLista(t, [0, 15, 40, 60]).g5.g5_listas[0];
  assert.equal(lista.primero.rasgos.separado, 0);
  assert.equal(lista.ultimo.rasgos.separado, 0);
});

test('G5 conserva la precisión de una décima de píxel', (t) => {
  const lista = medirLista(t, [0, 40.26, 80, 300.26]).g5.g5_listas[0];
  assert.equal(lista.primero.rasgos.separado, 20.3);
  assert.equal(lista.ultimo.rasgos.separado, 200.3);
});

test('G5 no crea una lista con menos de tres elementos', (t) => {
  const { g5 } = medirLista(t, [0, 40]);
  assert.equal(g5.g5_listas_total, 0);
  assert.deepEqual(g5.g5_listas, []);
});
