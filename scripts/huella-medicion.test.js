'use strict';
// La huella sin marcas de tiempo: idéntica entre dos mediciones de la misma captura,
// distinta si cambia el contenido (auditoría del 12 de noviembre, B-5).
const test = require('node:test'), assert = require('node:assert/strict'), path = require('path');
const { sinMarcas, huella, mismoContenido } = require('./huella-medicion');
const { medirCaptura } = require('../measure/measure-page');

test('dos mediciones de la misma captura tienen la misma huella aunque difiera medido_en', () => {
  const dir = path.join(__dirname, '../calibracion/C02');
  const a = medirCaptura(dir), b = { ...medirCaptura(dir), medido_en: '2000-01-01T00:00:00.000Z' };
  assert.notEqual(a.medido_en, b.medido_en);
  assert.equal(huella(a), huella(b));
  assert.ok(mismoContenido(a, b));
});

test('un cambio de contenido cambia la huella; una marca de tiempo no', () => {
  const base = { calculado_en: '2026-09-21T07:15:32.188Z', p_e: 0.75, unanimes: 26 };
  assert.equal(huella(base), huella({ ...base, calculado_en: '2026-09-21T17:47:31.925Z' }));
  assert.notEqual(huella(base), huella({ ...base, unanimes: 27 }));
  assert.deepEqual(Object.keys(sinMarcas(base)), ['p_e', 'unanimes']);
});
