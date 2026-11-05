'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path'), os = require('os');
const {spawnSync} = require('child_process');
const {planificar} = require('./preparar-grilla');
const ROOT = path.resolve(__dirname,'..');
const configuracion = () => ({runtimes:[
  {runtime:'codex-cli',model_id:'modelo-prueba-1',decoding:{declarado:'configuración de prueba'}},
  {runtime:'claude-code',model_id:'modelo-prueba-2',decoding:{declarado:'configuración de prueba'}},
]});

test('treinta páginas y dos runtimes preparan el plan de 3.900 solicitudes',() => {
  const config = configuracion(); config.runtimes[0].campo_ajeno = 'no debe copiarse';
  const plan = planificar(Array.from({length:30},(_,i) => 'P' + i),config);
  assert.equal(plan.solicitudes_previstas,3900);
  assert.equal(plan.corridas.length,60);
  assert.equal(new Set(plan.corridas.map(c => c.carpeta)).size,60);
  assert.equal(Object.hasOwn(plan.corridas[0],'campo_ajeno'),false);
});

test('no acepta modelos pendientes, configuración incompleta, runtimes repetidos ni ids peligrosos',() => {
  assert.throws(() => planificar(['P1'],require('../docs/runtimes-ejemplo.json')),/model_id/);
  const config = configuracion(); config.runtimes[1].runtime = config.runtimes[0].runtime;
  assert.throws(() => planificar(['P1'],config),/distintos/);
  for (const ids of [[],['P1','P1'],['../P1']]) assert.throws(() => planificar(ids,configuracion()),/ids/);
  const vacia = configuracion(); vacia.runtimes[0].decoding = {};
  assert.throws(() => planificar(['P1'],vacia),/decoding/);
});

test('prepara una página en los dos runtimes sin evaluar ni cambiar los archivos de captura',t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(),'ux-grilla-'));
  t.after(() => fs.rmSync(dir,{recursive:true,force:true}));
  const capturas = path.join(dir,'capturas'), origen = path.join(capturas,'C13'), out = path.join(dir,'salida');
  fs.mkdirSync(origen,{recursive:true});
  const archivos = ['meta.json','nodes.json','screenshot.png','wireframe.png'];
  for (const f of archivos) fs.copyFileSync(path.join(ROOT,'calibracion/C13',f),path.join(origen,f));
  const antes = archivos.map(f => fs.readFileSync(path.join(origen,f)));
  const config = path.join(dir,'config.json'), manifiesto = path.join(dir,'paginas.csv');
  fs.writeFileSync(config,JSON.stringify(configuracion()));
  fs.writeFileSync(manifiesto,'id,url\nC13,https://ejemplo.test\n');
  const r = spawnSync(process.execPath,['scripts/preparar-grilla.js','--config',config,
    '--out',out,'--capturas',capturas,'--manifiesto',manifiesto],{cwd:ROOT,encoding:'utf8'});
  assert.equal(r.status,0,r.stderr+r.stdout);
  const plan = JSON.parse(fs.readFileSync(path.join(out,'plan.json')));
  assert.equal(plan.estado,'preparado'); assert.equal(plan.solicitudes_previstas,130);
  const libros = plan.corridas.map(c => JSON.parse(fs.readFileSync(path.join(out,c.carpeta,'invocaciones.json'))));
  assert(libros.every(l => l.invocaciones.length === 65));
  for (const inv of libros[0].invocaciones) {
    const otro = libros[1].invocaciones.find(i => i.id === inv.id);
    assert.equal(inv.prompt_hash,otro.prompt_hash);
    assert.equal(inv.entrada_sha256,otro.entrada_sha256);
    assert.notEqual(inv.model_id,otro.model_id);
    assert.equal(fs.existsSync(path.resolve(ROOT,inv.resultado_esperado)),false);
  }
  assert.deepEqual(archivos.map(f => fs.readFileSync(path.join(origen,f))),antes);
  assert.equal(fs.existsSync(path.join(origen,'measurements.json')),false);
});
