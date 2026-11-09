'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs'), os = require('os'), path = require('path');
const { spawnSync } = require('child_process');
const { paginaHtml } = require('./demo');
const { revisarDirectorio } = require('../capture/capture-check');
const root = path.resolve(__dirname, '..');

function copiarCaptura(dir, id) {
  fs.mkdirSync(dir, {recursive:true});
  for (const f of ['meta.json','nodes.json','screenshot.png','wireframe.png']) {
    fs.copyFileSync(path.join(root,'captures',id,f),path.join(dir,f));
  }
}

test('la demo avisa si una capa sigue abierta aunque otra haya cerrado', () => {
  const meta = require('../captures/L03/meta.json'), revision = revisarDirectorio(path.join(root,'captures/L03'));
  const html = paginaHtml({url:meta.url,segundos:'1',meta,met:{coverage:1,parsimony:1},revision});
  assert.match(html, /Queda un aviso sin resolver/);
  assert(html.indexOf('<section class="aviso">') < html.indexOf('<h2>Métricas de esta página</h2>'));
  assert.doesNotMatch(html, /<th>Control de sanidad<\/th><td>pasa/);
});

test('el reporte usa el registro de la captura y muestra el aviso fuera de las notas plegadas', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(),'ux-report-warning-'));
  t.after(() => fs.rmSync(dir,{recursive:true,force:true}));
  copiarCaptura(path.join(dir,'L02'),'L02');
  fs.writeFileSync(path.join(dir,'_metricas.json'),JSON.stringify([{id:'L02',coverage:1,parsimony:1}]));
  fs.writeFileSync(path.join(dir,'_resumen.json'),JSON.stringify([{id:'L02',url:'resumen antiguo',notes:[]}]));
  const out = path.join(dir,'reporte.html');
  const r = spawnSync(process.execPath,['scripts/build-wireframe-report.js',dir,'--out',out],{cwd:root,encoding:'utf8'});
  assert.equal(r.status,0,r.stderr);
  const html = fs.readFileSync(out,'utf8');
  assert.match(html,/aviso de privacidad/);
  assert.match(html,/1 de 1 capturas requieren revisión/);
  assert(html.indexOf('<div class="revision aviso">') < html.indexOf('<div class="kpis">'));
  assert.doesNotMatch(html,/resumen antiguo/);
});

test('los siete prompts y la entrada de G4 reciben el aviso sin reescribir L02', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(),'ux-prompts-warning-'));
  t.after(() => fs.rmSync(dir,{recursive:true,force:true}));
  const captura = path.join(dir,'captura'), out = path.join(dir,'salida');
  copiarCaptura(captura,'L02');
  const antes = fs.readFileSync(path.join(captura,'meta.json'));
  const r = spawnSync(process.execPath,['scripts/orchestrate.js','preparar','--captura',captura,'--out',out,
    '--runtime','prueba-local','--model-id','test-model-1','--decoding','no-expuesto-por-el-runtime','--repeticiones','1'],
  {cwd:root,encoding:'utf8'});
  assert.equal(r.status,0,r.stderr+r.stdout);
  const libro = JSON.parse(fs.readFileSync(path.join(out,'invocaciones.json')));
  assert.equal(libro.captura.sanity_ok,true);
  assert.equal(libro.captura.revision.capas_sin_resolver,true);
  for (const inv of libro.invocaciones) {
    assert.match(fs.readFileSync(path.resolve(root,inv.prompt),'utf8'),/aviso de privacidad/);
  }
  const g4 = JSON.parse(fs.readFileSync(path.join(out,'entradas/g4.json')));
  assert.equal(g4.pagina.consent_limpio,false); assert.equal(g4.pagina.sanity_ok,false);
  assert.deepEqual(fs.readFileSync(path.join(captura,'meta.json')),antes);
});

test('una imagen que no coincide con su huella impide preparar nuevas evaluaciones', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(),'ux-capture-integrity-'));
  t.after(() => fs.rmSync(dir,{recursive:true,force:true}));
  const captura = path.join(dir,'captura'), out = path.join(dir,'salida');
  copiarCaptura(captura,'L02');
  fs.appendFileSync(path.join(captura,'screenshot.png'),'archivo cambiado');
  const r = spawnSync(process.execPath,['scripts/orchestrate.js','preparar','--captura',captura,'--out',out,
    '--runtime','prueba-local','--model-id','test-model-1','--decoding','no-expuesto-por-el-runtime','--repeticiones','1'],
  {cwd:root,encoding:'utf8'});
  assert.equal(r.status,1);
  assert.match(r.stderr,/falló la integridad/);
  assert.equal(fs.existsSync(path.join(out,'invocaciones.json')),false);
});
