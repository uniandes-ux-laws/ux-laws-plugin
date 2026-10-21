'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { auditHistorical, csv, checkManifest, category } = require('./g1-closure');

function fixture() {
  const old = { score: 0, trigger: 'C4', measurements: { grupos: 1, conRazon: 0, fallanC1: 0,
    desbordan: 0, candidatosC2: 2, fueraDeEje: 0, divergentes: 2, conjuntos: 3,
    conflictos: 0, elementosEnGrupos: 0, p: { C1: null, C2: 0, C3: 0, C4: .667 } } };
  const now = { g1_grupos_primer_nivel: 1, g1_p_C1: { afectados: 0, denominador: 0, p: null },
    g1_p_C2: { afectados: 0, denominador: 2, p: 0 }, g1_p_C3: { afectados: 0, denominador: 1, p: 0 },
    g1_p_C4: { afectados: 2, denominador: 3, p: .6667 },
    g1_p_conflicto: { afectados: 0, denominador: 0, p: null } };
  return { old, now };
}

test('detecta NA y C1 sin base sin reemplazar el puntaje histórico', () => {
  const { old, now } = fixture(), before = JSON.stringify({ old, now });
  const audit = auditHistorical(old, now);
  assert.equal(audit.contradice_regla_no_aplica, true);
  assert.equal(audit.C1_sin_base, true);
  assert.equal(audit.criterios[0].categoria, 'no_calculable');
  assert.equal(audit.criterios[3].diferencia_de_precision, true);
  assert.equal(JSON.stringify({ old, now }), before);
});

test('una variación de afectados no pasa como diferencia de redondeo', () => {
  const { old, now } = fixture();
  now.g1_p_C4.afectados = 1;
  assert.throws(() => auditHistorical(old, now), /afectados distintos/);
});

test('el CSV conserva el cero, los nulos vacíos y la limitación en la misma fila', () => {
  const { old, now } = fixture();
  const audit = auditHistorical(old, now);
  const result = csv([{ id: 'C13', url: 'https://example.org/?a=1,b=2', historico: old, auditoria_posterior: audit }]);
  assert(result.includes('C13,"https://example.org/?a=1,b=2",no_interpretable_v1,0,C4,1,false,true,0,0,,,0,2,0,0'));
  assert.equal(result.trim().split('\n').length, 2);
  assert.equal(category(null), 'no_calculable');
});

test('el verificador de integridad rechaza una fuente alterada', () => {
  const name = 'scripts/g1-closure.js';
  assert(fs.existsSync(path.join(__dirname, '..', name)));
  assert.throws(() => checkManifest('0'.repeat(64) + '\t' + name + '\n'), /Hash distinto/);
  assert.throws(() => checkManifest('0'.repeat(64) + '\t../fuera\n'));
});

test('quitar una fila del sello no deja pasar una lista incompleta', () => {
  const name = 'scripts/g1-closure.js';
  const digest = crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, '..', name))).digest('hex');
  assert.throws(() => checkManifest(digest + '\t' + name + '\n', [name, 'docs/CIERRE-G1-21OCT.md']), /Lista de archivos incompleta/);
});
