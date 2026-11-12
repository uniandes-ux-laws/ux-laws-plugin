'use strict';
// Una captura con sanity_ok=false no produce solicitudes salvo opción explícita, y la
// aceptación queda escrita en el libro (auditoría del 12 de noviembre, A3).
const { test } = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('node:child_process');

const RAIZ = path.resolve(__dirname, '..');
const ORIGEN = path.join(RAIZ, 'captures/G04');   // con_advertencias en la revisión del 4 de noviembre

// Copia sin measurements.json: el orquestador mide en memoria y la prueba no depende
// de un archivo derivado de la copia local.
function preparar(out, extra) {
  const captura = path.join(path.dirname(out), 'G04');
  if (!fs.existsSync(captura)) {
    fs.mkdirSync(captura);
    for (const f of ['meta.json', 'nodes.json', 'screenshot.png', 'wireframe.png']) fs.copyFileSync(path.join(ORIGEN, f), path.join(captura, f));
  }
  return spawnSync(process.execPath, [path.join(RAIZ, 'scripts/orchestrate.js'), 'preparar', '--captura', captura, '--out', out,
    '--runtime', 'synthetic-test', '--model-id', 'synthetic-1', '--decoding', 'no-expuesto-por-el-runtime', '--repeticiones', '1', ...extra],
  { cwd: RAIZ, encoding: 'utf8' });
}

test('sanity_ok=false: preparar se niega y no deja solicitudes', (t) => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-sanidad-')); t.after(() => fs.rmSync(tmp, { recursive: true, force: true }));
  const out = path.join(tmp, 'corrida');
  const r = preparar(out, []);
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /sanity_ok=false/);
  assert.match(r.stderr, /--aceptar-sanidad-fallida/);
  assert.equal(fs.existsSync(path.join(out, 'invocaciones.json')), false);
  const solicitudes = path.join(out, 'solicitudes');
  assert.ok(!fs.existsSync(solicitudes) || fs.readdirSync(solicitudes).length === 0);
});

test('con --aceptar-sanidad-fallida prepara y lo escribe en el libro', (t) => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-sanidad-')); t.after(() => fs.rmSync(tmp, { recursive: true, force: true }));
  const out = path.join(tmp, 'corrida');
  const r = preparar(out, ['--aceptar-sanidad-fallida']);
  assert.equal(r.status, 0, r.stderr + r.stdout);
  const libro = JSON.parse(fs.readFileSync(path.join(out, 'invocaciones.json'), 'utf8'));
  assert.equal(libro.sanidad.sanity_ok, false);
  assert.equal(libro.sanidad.sanidad_fallida_aceptada, true);
  assert.equal(libro.sanidad.opcion, '--aceptar-sanidad-fallida');
  assert.ok(libro.sanidad.advertencias.length > 0);
  assert.ok(libro.invocaciones.length > 0);
});
