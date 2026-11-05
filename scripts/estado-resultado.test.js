'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { revisarEstado } = require('./estado-resultado');

const puntaje = { not_applicable: false, score: 0, trigger: 'ninguna', measurements: {} };
const na = { not_applicable: true, score: null, trigger: null, na_reason: 'No hay controles', measurements: {} };
const abstencion = { not_applicable: false, score: null, trigger: null, evidence_insufficient: true,
  measurements: { motivo_abstencion: 'La combinación no tiene nivel definido' } };

test('distingue un cero, un no aplica y una abstención', () => {
  assert.deepEqual(revisarEstado(puntaje), { estado: 'puntaje', motivo: null, errores: [] });
  assert.deepEqual(revisarEstado(na), { estado: 'no_aplica', motivo: na.na_reason, errores: [] });
  assert.deepEqual(revisarEstado(abstencion), { estado: 'abstencion',
    motivo: abstencion.measurements.motivo_abstencion, errores: [] });
});

test('una advertencia de evidencia no borra el puntaje recibido', () => {
  const resultado = { ...puntaje, evidence_insufficient: true };
  const antes = structuredClone(resultado);
  assert.equal(revisarEstado(resultado).estado, 'puntaje');
  assert.deepEqual(revisarEstado(resultado).errores, []);
  assert.deepEqual(resultado, antes);
});

for (const [nombre, resultado, mensaje] of [
  ['NA con puntaje', { ...na, score: 0 }, /score y trigger nulos/],
  ['NA con trigger', { ...na, trigger: 'ninguna' }, /score y trigger nulos/],
  ['NA sin razón', { ...na, na_reason: '  ' }, /necesita una razón/],
  ['NA con motivo de abstención', { ...na, measurements: abstencion.measurements }, /no debe llevar un motivo/],
  ['abstención sin advertencia', { ...abstencion, evidence_insufficient: false }, /evidencia insuficiente/],
  ['abstención sin motivo', { ...abstencion, measurements: {} }, /necesita motivo/],
  ['abstención con razón de NA', { ...abstencion, na_reason: 'No hay controles' }, /no debe llevar na_reason/],
  ['puntaje con motivo de abstención', { ...puntaje, measurements: abstencion.measurements }, /no debe llevar un motivo/],
  ['puntaje sin trigger', { ...puntaje, trigger: '  ' }, /necesita trigger/],
  ['nivel fuera de escala', { ...puntaje, score: 5 }, /no define/],
]) {
  test('rechaza ' + nombre, () => assert.match(revisarEstado(resultado).errores.join('; '), mensaje));
}
