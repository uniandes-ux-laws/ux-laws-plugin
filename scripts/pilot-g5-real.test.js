'use strict';
// Datos sintéticos: prueban el transporte, no evalúan páginas del estudio.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { promptFor, validationProblems } = require('./pilot-g5-real');
const input = { g5: { g5_listas_total: 2, g5_lista_principal_sugerida: 40, g5_listas: [{ id_padre: 40, n: 4 }] } };
const run = { model_id: 'synthetic-model-1', runtime: 'synthetic-test', repetition: 1, prompt_hash: 'a'.repeat(64), captured_at: '2026-10-06T12:00:00Z', decoding: { declarado: 'synthetic' }, capture_sha256: { wireframe: 'b'.repeat(64), screenshot: 'c'.repeat(64) }, measurements_version: '1.0.3', protocol_version: '0.1.0' };
function response() {
  return { group_id: 'g5', group_name: 'Posición y progreso', laws_subsumed: ['Posición serial', 'Gradiente de meta'], channel: 'wireframe', not_applicable: false, na_reason: null, score: 0, trigger: 'lista_plana', evidence_insufficient: false,
    measurements: { g5_listas_total: 2, g5_lista_principal_sugerida: 40, main_list_parent_id: 40, J_inicio: false, J_final: false, Q: false, G_existe: null, G_nombra: null, G_actual: null, G_forma: null, steps_declared: null, lectura_screenshot: ['Q'] },
    findings: [{ observation: 'Fixture sintético de lista plana', node_ids: [10], region: { x: 0, y: 0, w: 20, h: 20 }, severity: 'alta' }], recommendations: ['Recomendación sintética'] };
}
const check = (raw, source = input) => validationProblems(raw, source, run, new Set([10]));
test('valida la respuesta sin alterar juicios ni añadir run al original', () => {
  const raw = response(), original = JSON.stringify(raw); assert.deepEqual(check(raw), []); assert.equal(JSON.stringify(raw), original); assert.equal(raw.run, undefined);
});
test('rechaza la sustitución de una cifra recibida', () => {
  const raw = response(); raw.measurements.g5_listas_total = 3; assert.ok(check(raw).some(s => s.includes('cambió')));
});
test('rechaza seleccionar un padre que no está en las listas recibidas', () => {
  const raw = response(); raw.measurements.main_list_parent_id = 99; assert.ok(check(raw).some(s => s.includes('inexistente')));
});
test('rechaza no aplicable cuando la fuente sí entrega listas', () => {
  const raw = response(); raw.not_applicable = true; raw.score = null; raw.trigger = null; raw.na_reason = 'Fixture'; assert.ok(check(raw).some(s => s.includes('no aplicabilidad')));
});
test('acepta no aplicable con cero listas, Q falso y jerarquía nula', () => {
  const raw = response(); raw.not_applicable = true; raw.score = null; raw.trigger = null; raw.na_reason = 'Q falso y cero listas';
  Object.assign(raw.measurements, { g5_listas_total: 0, g5_lista_principal_sugerida: null, main_list_parent_id: null, J_inicio: null, J_final: null });
  assert.deepEqual(check(raw, { g5: { g5_listas_total: 0, g5_lista_principal_sugerida: null, g5_listas: [] } }), []);
});
test('exige declarar screenshot incluso si Q es falso', () => {
  const raw = response(); raw.measurements.lectura_screenshot = []; assert.ok(check(raw).some(s => s.includes('lectura textual')));
});
test('rechaza ids de hallazgos inexistentes y puntajes bajos sin recomendaciones', () => {
  const raw = response(); raw.findings[0].node_ids = [999]; raw.recommendations = []; const errors = check(raw); assert.ok(errors.some(s => s.includes('id ausente'))); assert.ok(errors.some(s => s.includes('recomendaciones')));
});
test('el prompt es idéntico entre repeticiones y no incorpora su identificador', () => {
  const first = promptFor(input, 'Rúbrica sintética', 'Escala sintética'); const second = promptFor(input, 'Rúbrica sintética', 'Escala sintética'); assert.equal(first, second); assert.ok(first.includes('g5_listas_total')); assert.ok(!first.includes('r1')); assert.ok(!first.includes('g1_'));
});
function rootSource() { return { measurements_version: '1.0.5', g5: { g5_listas_total: 1,
  g5_lista_principal_sugerida: null, g5_lista_principal_sugerida_id: 'g5:raiz',
  g5_listas: [{ id_lista: 'g5:raiz', id_padre: null, padre_raiz_virtual: true }] } }; }
function rootResponse() {
  const raw = response(); raw.evidence_insufficient = true;
  Object.assign(raw.measurements, { g5_listas_total: 1, g5_lista_principal_sugerida: null,
    g5_lista_principal_sugerida_id: 'g5:raiz', main_list_id: 'g5:raiz', main_list_parent_id: null });
  return raw;
}
test('selección de raíz virtual con padre null se distingue de ausencia de lista', () => {
  assert.deepEqual(check(rootResponse(), rootSource()), []);
});
test('exige declarar el límite de pertenencia en una raíz virtual', () => {
  const raw = rootResponse(); raw.evidence_insufficient = false;
  assert.ok(check(raw, rootSource()).some(s => s.includes('límite estructural')));
});
test('rechaza identidad de lista inventada aunque el padre null coincida', () => {
  const raw = rootResponse(); raw.measurements.main_list_id = 'g5:inventada';
  assert.ok(check(raw, rootSource()).some(s => s.includes('identificador')));
});
test('sin selección los juicios de jerarquía son nulos también en el nuevo contrato', () => {
  const raw = rootResponse(); raw.measurements.main_list_id = null;
  assert.ok(check(raw, rootSource()).some(s => s.includes('sin lista principal')));
});
