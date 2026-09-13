#!/usr/bin/env node
'use strict';
/**
 * validate-result.js — valida una salida de skill contra el esquema del proyecto.
 *
 *   node scripts/validate-result.js resultado.json [otro.json ...]
 *   node scripts/validate-result.js --selftest
 *
 * El orquestador rechaza una salida que no valide. Un puntaje sin measurements o
 * sin trigger no es auditable, y ablandar la validación para dejarlo pasar
 * convertiría el instrumento en otra cosa.
 */
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

const schema = require(path.resolve(__dirname, '../shared/schemas/group-result.schema.json'));
const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

function report(name, obj) {
  const ok = validate(obj);
  if (ok) { console.log(`ok     ${name}`); return true; }
  console.log(`FALLA  ${name}`);
  for (const e of validate.errors) {
    console.log(`       ${e.instancePath || '(raíz)'} ${e.message}`);
  }
  return false;
}

function selftest() {
  const base = {
    group_id: 'g2', group_name: 'Arquitectura de decisión',
    laws_subsumed: ['Ley de Hick', 'Sobrecarga de elección'],
    channel: 'wireframe', not_applicable: false, score: 1, trigger: 'n1',
    measurements: { n_total: 38, n1: 38, n_max: 38, Ap: 0 },
    run: {
      model_id: 'claude-opus-5', prompt_hash: 'a'.repeat(64), repetition: 1,
      runtime: 'claude-code', captured_at: new Date().toISOString(),
      decoding: { declarado: 'no expuesto por el runtime' },
      capture_sha256: { screenshot: 'b'.repeat(64), wireframe: 'c'.repeat(64) },
      measurements_version: '1.0.0', protocol_version: '0.1.0',
    },
  };
  const drop = (o, k) => { const c = { ...o }; delete c[k]; return c; };
  const sinRun = (k) => { const c = { ...base, run: { ...base.run } }; delete c.run[k]; return c; };
  const cases = [
    ['resultado válido', base, true],
    ['sin trigger', drop(base, 'trigger'), false],
    ['sin measurements', drop(base, 'measurements'), false],
    ['N/A con razón', { ...base, not_applicable: true, score: null, trigger: null, na_reason: 'n_total = 0' }, true],
    ['N/A sin razón', { ...base, not_applicable: true, score: null, trigger: null }, false],
    ['score fuera de 0-4', { ...base, score: 7 }, false],
    ['grupo inexistente', { ...base, group_id: 'g9' }, false],
    ['repetición fuera de 1-5', { ...base, run: { ...base.run, repetition: 9 } }, false],
    ['hash de prompt mal formado', { ...base, run: { ...base.run, prompt_hash: 'corto' } }, false],
    ['campo extra no declarado', { ...base, inventado: 1 }, false],
    // v0.2.0 · atribución. Los seis de abajo VALIDABAN en v0.1.0.
    ['sin decoding', sinRun('decoding'), false],
    ['sin capture_sha256', sinRun('capture_sha256'), false],
    ['sin measurements_version', sinRun('measurements_version'), false],
    ['sin protocol_version', sinRun('protocol_version'), false],
    ['model_id marcador de posición', { ...base, run: { ...base.run, model_id: 'pendiente' } }, false],
    ['model_id nombre comercial con espacios', { ...base, run: { ...base.run, model_id: 'Claude Opus 5' } }, false],
    ['capture_sha256 como cadena suelta', { ...base, run: { ...base.run, capture_sha256: 'd'.repeat(64) } }, false],
    ['capture_sha256 sin el wireframe', { ...base, run: { ...base.run, capture_sha256: { screenshot: 'b'.repeat(64) } } }, false],
  ];
  let bad = 0;
  for (const [name, obj, expected] of cases) {
    const got = validate(obj);
    const pass = got === expected;
    if (!pass) bad++;
    console.log(`${pass ? 'ok   ' : 'FALLA'}  ${name} -> ${got} (esperado ${expected})`);
  }
  console.log(bad === 0 ? `\n${cases.length}/${cases.length} casos correctos.` : `\n${bad} caso(s) incorrectos.`);
  process.exit(bad === 0 ? 0 : 1);
}

const args = process.argv.slice(2);
if (args.includes('--selftest') || args.length === 0) selftest();

let bad = 0;
for (const f of args) {
  try { if (!report(f, JSON.parse(fs.readFileSync(f, 'utf8')))) bad++; }
  catch (e) { console.log(`FALLA  ${f}: ${e.message}`); bad++; }
}
process.exit(bad === 0 ? 0 : 1);
