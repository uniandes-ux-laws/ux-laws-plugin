'use strict';
// Auditoría del 12 de noviembre, M4: las capturas selladas del corpus traen una medición
// 1.0.0. preparar debe medir de nuevo para la corrida, sin reescribir la captura.
const { test } = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('node:child_process');
const { VERSION } = require('../measure/measure-page');

test('preparar mide de nuevo si la medición guardada es de otra versión y no toca la captura', (t) => {
  const root = path.resolve(__dirname, '..'), tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-medicion-antigua-'));
  t.after(() => fs.rmSync(tmp, { recursive: true, force: true }));
  const cap = path.join(tmp, 'captura'), out = path.join(tmp, 'salida');
  fs.mkdirSync(cap);
  for (const f of ['meta.json', 'nodes.json', 'screenshot.png', 'wireframe.png']) fs.copyFileSync(path.join(root, 'calibracion/C07', f), path.join(cap, f));
  const meta = JSON.parse(fs.readFileSync(path.join(cap, 'meta.json'), 'utf8'));
  const antigua = JSON.stringify({ schema_version: '1.0.0', pagina: { sha256: meta.sha256 }, g1: {} }, null, 2) + '\n';
  fs.writeFileSync(path.join(cap, 'measurements.json'), antigua);

  const r = spawnSync(process.execPath, [path.join(root, 'scripts/orchestrate.js'), 'preparar', '--captura', cap, '--out', out,
    '--runtime', 'synthetic-test', '--model-id', 'synthetic-1', '--decoding', 'no-expuesto-por-el-runtime', '--repeticiones', '1'], { cwd: root, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr + r.stdout);
  assert.match(r.stderr + r.stdout, /Medición guardada 1\.0\.0, vigente/);
  assert.equal(fs.readFileSync(path.join(cap, 'measurements.json'), 'utf8'), antigua, 'la captura no cambia');
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, 'entradas', 'measurements.json'), 'utf8')).schema_version, VERSION);
});
