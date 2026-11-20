'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {analizar,intervaloMedia,resumirPares,tauB} = require('./analizar-representacion-codex');

test('calcula acuerdo y bootstrap pareado con valores artificiales', () => {
  const pares = [0,1,2,3,4].map((v, i) => ({pagina:'P' + i, w:v, s:v}));
  const res = resumirPares(pares);
  assert.equal(res.n, 5);
  assert.equal(res.diferencia_media, 0);
  assert.deepEqual(res.intervalo.ic95, [0,0]);
  assert.equal(res.intervalo.replicas_validas, 2000);
  assert.equal(res.exacto, 1);
  assert.equal(res.a_un_nivel, 1);
  assert.equal(res.tau_b, 1);
  assert.equal(res.bp_cuadratico_k5, 1);
  assert.deepEqual(intervaloMedia(pares.slice(0,4)).ic95, null);
  assert.equal(intervaloMedia(pares.slice(0,4)).motivo, 'n insuficiente');
  assert.equal(tauB([{w:1,s:1},{w:1,s:2},{w:2,s:2}]), 0.5);
  assert.equal(tauB([{w:1,s:1},{w:1,s:2}]), null);
});

test('cuenta ausencias y sensibilidad sin abrir otros datos', t => {
  const root = fs.realpathSync(os.tmpdir()), dir = fs.mkdtempSync(path.join(root, 'ux-representacion-'));
  t.after(() => {
    const actual = fs.realpathSync(dir);
    assert.equal(path.dirname(actual), root);
    assert.match(path.basename(actual), /^ux-representacion-/);
    fs.rmSync(actual, {recursive:true, force:true});
  });
  const series = [['g2','wireframe'],['g2','screenshot'],['g4','screenshot'],['g7','wireframe'],['g7','screenshot']];
  function pagina(id) {
    const paginaDir = path.join(dir, id);
    fs.mkdirSync(paginaDir);
    const perfil = {perfil:series.map(([group_id,channel]) => ({group_id,channel,evaluaciones:[{
      estado:(id === 'G01' && group_id === 'g2' && channel === 'screenshot') ? 'abstencion' :
        (id === 'H01' && group_id === 'g4') ? 'invalida' : 'puntaje',
      score:(id === 'G01' && group_id === 'g2' && channel === 'screenshot') || (id === 'H01' && group_id === 'g4') ? null : 2,
      motivo:(id === 'G01' && group_id === 'g2' && channel === 'screenshot') ? 'motivo artificial' : null,
    }]}))};
    const libro = {captura:{dir:'captures/' + id},repeticiones:1,invocaciones:series.map(([group_id,channel]) => ({
      group_id,channel,repetition:1,model_id:'modelo-prueba-1',contexto_limpio:true,mecanismo_de_aislamiento:'prueba artificial',
    }))};
    fs.writeFileSync(path.join(paginaDir,'perfil.json'), JSON.stringify(perfil));
    fs.writeFileSync(path.join(paginaDir,'invocaciones.json'), JSON.stringify(libro));
  }
  pagina('H01'); pagina('G01');
  const result = analizar(dir), todas = result.por_modelo['modelo-prueba-1'].todas;
  assert.deepEqual(result.paginas_cerradas, ['H01','G01']);
  assert.equal(todas.representacion.g2.n, 1);
  assert.equal(todas.representacion.g7.n, 2);
  assert.equal(todas.no_comparables.g2.wireframe_puntuo_screenshot_no.abstencion, 1);
  assert.equal(todas.distribuciones['g2/screenshot'].motivos['motivo artificial'], 1);
  assert.equal(todas.distribuciones['g4/screenshot'].invalida, 1);
  const sensible = result.por_modelo['modelo-prueba-1'].sin_marcadas;
  assert.deepEqual(sensible.paginas, ['H01']);
  assert.equal(sensible.representacion.g7.n, 1);
  assert.equal(sensible.no_comparables.g2.wireframe_puntuo_screenshot_no.abstencion, undefined);
  const bookPath = path.join(dir,'H01','invocaciones.json'), book = JSON.parse(fs.readFileSync(bookPath,'utf8'));
  book.invocaciones[0].contexto_limpio = false;
  fs.writeFileSync(bookPath, JSON.stringify(book));
  assert.throws(() => analizar(dir), /falta el registro de aislamiento/);
});
