'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { prepararG1, revisarG1 } = require('./g1-input');

for (const grupos of [0, 1, 2]) {
  test('G1 prepara una copia con ' + grupos + ' grupos sin cambiar la fuente', () => {
    const original = { measurements_version: '1.0.6', pagina: { id: 'prueba' },
      g1: { g1_grupos_primer_nivel: grupos, g1_no_aplicable: false,
        g1_p_C1: { p: null }, juicios: [{ criterio: 'C1' }] } };
    const antes = structuredClone(original);
    const entrada = prepararG1(original);
    assert.deepEqual(original, antes);
    assert.equal(entrada.measurements_version, '1.0.7');
    assert.equal(entrada.source_measurements_version, '1.0.6');
    assert.equal(entrada.g1.g1_no_aplicable, grupos < 2);
    assert.deepEqual(entrada.g1.g1_p_C1, original.g1.g1_p_C1);
    if (grupos < 2) {
      assert.match(entrada.g1.g1_no_aplicable_razon, /al menos dos/);
      assert.deepEqual(entrada.g1.juicios, []);
    } else {
      assert.deepEqual(entrada.g1.juicios, original.g1.juicios);
    }
    assert.deepEqual(revisarG1({ not_applicable: grupos < 2,
      measurements: { g1_grupos_primer_nivel: grupos } }, entrada), []);
  });
}

test('G1 no confunde un conteo ausente o inválido con cero grupos', () => {
  for (const grupos of [undefined, null, -1, 1.5, '1']) {
    assert.throws(() => prepararG1({ measurements_version: '1.0.6',
      g1: { g1_grupos_primer_nivel: grupos } }), /cantidad de grupos/);
  }
  assert.throws(() => prepararG1({ measurements_version: 'otra' }), /origen 1.0.6/);
});

test('G1 rechaza cambiar el conteo o la aplicabilidad recibidos', () => {
  const entrada = prepararG1({ measurements_version: '1.0.6', g1: { g1_grupos_primer_nivel: 1 } });
  const errores = revisarG1({ not_applicable: false, measurements: { g1_grupos_primer_nivel: 2 } }, entrada);
  assert.equal(errores.length, 2);
  entrada.source_measurements_version = 'otra';
  assert.match(revisarG1({}, entrada)[0], /versión/);
});
