'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs'), os = require('os'), path = require('path');
const { revisarCaptura, revisarDirectorio, VERSION } = require('./capture-check');
const root = path.resolve(__dirname, '..');

function metaComprobada() {
  const control = { version: VERSION, hayInterstitial: false, marcosSinRevisar: 0 };
  return { httpStatus: 200, sanity: { ok: true, razones: [] }, consent: { limpio: true, rondas: [] },
    revisionCapas: { version: VERSION, antes: { ...control }, despues: { ...control }, errores: [] } };
}

test('sin alertas exige una revisión completa, no solo el limpio antiguo', () => {
  const meta = metaComprobada();
  assert.equal(revisarCaptura(meta).estado, 'sin_alertas_automaticas');
  delete meta.revisionCapas;
  const revision = revisarCaptura(meta);
  assert.equal(revision.estado, 'sin_verificar');
  assert.equal(revision.capas_sin_resolver, null);
  assert.equal(revisarCaptura(null).estado, 'sin_verificar');
});

test('Bancolombia conserva el registro antiguo y muestra la observación posterior', () => {
  const dir = path.join(root, 'captures/L02'), archivo = path.join(dir, 'meta.json');
  const antes = fs.readFileSync(archivo);
  const revision = revisarDirectorio(dir);
  assert.equal(JSON.parse(antes).consent.limpio, true);
  assert.equal(revision.capas_sin_resolver, true);
  assert.equal(revision.estado, 'con_advertencias');
  assert.match(revision.advertencias.join(' '), /aviso de privacidad/);
  assert.deepEqual(fs.readFileSync(archivo), antes);
});

test('las observaciones se aplican por la imagen, no por el nombre de la carpeta', () => {
  const meta = require('../captures/L02/meta.json');
  const revision = revisarCaptura(meta, [], { screenshot: 'otra-imagen', wireframe: meta.sha256.wireframe });
  assert.doesNotMatch(revision.advertencias.join(' '), /imagen guardada tiene un aviso de privacidad/);
  assert.match(revision.advertencias.join(' '), /no coincide/);
  assert.match(revisarDirectorio(path.join(root, 'captures/G04')).advertencias.join(' '), /carrusel central vacío/);
});

for (const momento of ['antes', 'despues']) {
  test('una capa detectada ' + momento + ' impide presentar la captura como despejada', () => {
    const meta = metaComprobada();
    meta.revisionCapas[momento].hayInterstitial = true;
    const revision = revisarCaptura(meta);
    assert.equal(revision.estado, 'con_advertencias');
    assert.equal(revision.capas_sin_resolver, true);
  });
}

test('errores, descarte desactivado y falta de revisión no se convierten en limpio', () => {
  for (const cambiar of [
    m => { m.consent.error = 'No respondió el detector'; },
    m => { m.consent.descartado = false; },
    m => { m.revisionCapas.errores = ['despues: error']; m.revisionCapas.despues = null; },
    m => { m.revisionCapas.despues = null; },
    m => { delete m.consent; },
    m => { m.sanity = { ok: false, razones: [] }; },
  ]) {
    const meta = metaComprobada(); cambiar(meta);
    assert.notEqual(revisarCaptura(meta).estado, 'sin_alertas_automaticas');
    assert(revisarCaptura(meta).advertencias.length);
  }
});

test('el contenido de un marco no se declara revisado', () => {
  const meta = metaComprobada(); meta.revisionCapas.despues.marcosSinRevisar = 1;
  const revision = revisarCaptura(meta);
  assert.equal(revision.estado, 'sin_verificar');
  assert.equal(revision.capas_sin_resolver, null);
});

test('una versión escrita sin el resultado de las comprobaciones no acredita limpieza', () => {
  const meta = metaComprobada();
  meta.revisionCapas.antes = {version: VERSION};
  assert.equal(revisarCaptura(meta).estado,'sin_verificar');
  assert.equal(revisarCaptura(meta).capas_sin_resolver,null);
});

test('metadatos ilegibles, nodos ausentes e imágenes cambiadas dejan advertencia', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-check-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.writeFileSync(path.join(dir, 'meta.json'), '{');
  assert.equal(revisarDirectorio(dir).estado, 'sin_verificar');
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(metaComprobada()));
  const revision = revisarDirectorio(dir);
  assert.equal(revision.estado, 'con_advertencias');
  assert.match(revision.advertencias.join(' '), /imagen screenshot falta/);
  assert.match(revision.advertencias.join(' '), /leer los nodos/);
});
