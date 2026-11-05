'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path'), os = require('os');
const {execFileSync} = require('child_process');
const {ORDER,read,buildMarkdown,sourceManifest,normalizarTablas} = require('./build-appendix');
const {verificarReglas,hash} = require('./verificar-reglas');
const {prepararEntrega,revisarDependencias} = require('./preparar-entrega');
const VERSION = require('../release/version.json');
const DEPENDENCIA = require('../release/dependencias.json');
const ROOT = path.resolve(__dirname,'..');

function temporal(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(),'ux-entrega-test-'));
  t.after(() => fs.rmSync(dir,{recursive:true,force:true}));
  return dir;
}

// Estos bytes solo prueban el copiado y las huellas; no son Word ni PDF reales.
function reglasDePrueba(dir) {
  fs.mkdirSync(dir,{recursive:true});
  const base = path.join(dir,'apendice-rubricas'), rubricas = ORDER.map(read);
  fs.writeFileSync(base+'.md',buildMarkdown(rubricas));
  fs.writeFileSync(base+'.fuentes.json',JSON.stringify(sourceManifest(rubricas),null,2)+'\n');
  for (const formato of ['docx','pdf']) fs.writeFileSync(base+'.'+formato,'Archivo artificial para probar el paquete: '+formato);
  fs.writeFileSync(base+'.documentos.json',JSON.stringify({fuentes_sha256:hash(base+'.fuentes.json'),
    docx_sha256:hash(base+'.docx'),pdf_sha256:hash(base+'.pdf')}));
}

test('El apéndice conserva el cuerpo de las siete rúbricas y sus fuentes', () => {
  const rubricas = ORDER.map(read), md = buildMarkdown(rubricas), fuentes = sourceManifest(rubricas);
  assert.equal(fuentes.fuentes.length,7);
  let anterior = -1;
  for (const r of rubricas) {
    const cuerpo = normalizarTablas(r.body.replace(/^(#{1,5}) /gm,(_,h) => '#'.repeat(h.length+1)+' ')).trim();
    const posicion = md.indexOf(cuerpo);
    assert.ok(posicion > anterior); anterior = posicion;
    assert.equal(fuentes.fuentes.find(f => f.archivo === path.relative(ROOT,r.path)).sha256,hash(r.path));
  }
});

test('El documento alinea cabeceras antiguas sin cambiar las celdas de las reglas', () => {
  const tabla = '| | Lo trae | Lo decide |\n|---|---|---|\n| medida | juicio |';
  assert.equal(normalizarTablas(tabla),'| Lo trae | Lo decide |\n| --- | --- |\n| medida | juicio |');
  const correcta = '| | Condición | Detalle |\n|---|---|---|\n| C1 | espacio | razón |';
  assert.equal(normalizarTablas(correcta),correcta);
});

test('La comprobación rechaza reglas o documentos cambiados', t => {
  const dir = temporal(t); reglasDePrueba(dir);
  assert.equal(verificarReglas(dir).coinciden,true);
  fs.appendFileSync(path.join(dir,'apendice-rubricas.pdf'),'cambio');
  assert.throws(() => verificarReglas(dir),/pdf cambió/);
  reglasDePrueba(dir);
  fs.appendFileSync(path.join(dir,'apendice-rubricas.md'),'cambio');
  assert.throws(() => verificarReglas(dir),/no coincide/);
  reglasDePrueba(dir);
  const f = path.join(dir,'apendice-rubricas.fuentes.json');
  const fuentes = JSON.parse(fs.readFileSync(f)); fuentes.fuentes[0].sha256 = '0'.repeat(64);
  fs.writeFileSync(f,JSON.stringify(fuentes));
  assert.throws(() => verificarReglas(dir),/fuentes.*desactualizadas/);
});

test('La entrega actualiza solo copias, incluye dependencias locales y detecta cambios', t => {
  const dir = temporal(t), reglas = path.join(dir,'reglas'), out = path.join(dir,'paquete');
  reglasDePrueba(reglas);
  const originales = ['package.json','package-lock.json','.claude-plugin/plugin.json'].map(n => [n,hash(path.join(ROOT,n))]);
  prepararEntrega(out,{reglasDir:reglas});
  const ejecutar = () => execFileSync(process.execPath,[path.join(out,'scripts/verificar-entrega.js')],{encoding:'utf8',stdio:'pipe'});
  assert.equal(JSON.parse(ejecutar()).version,VERSION.version);
  for (const [nombre,huella] of originales) assert.equal(hash(path.join(ROOT,nombre)),huella);
  const paquete = JSON.parse(fs.readFileSync(path.join(out,'package.json')));
  const lock = JSON.parse(fs.readFileSync(path.join(out,'package-lock.json')));
  assert.equal(lock.packages['node_modules/fast-uri'].version,DEPENDENCIA.actual);
  assert.equal(hash(path.join(out,'package-lock.json')),hash(path.join(ROOT,DEPENDENCIA.archivo_entrega)));
  assert.equal(paquete.scripts.test,'node scripts/probar-entrega.js');
  for (const n of ['capture/capture-check.js','corpus/observaciones-capturas-2026-11-04.json','scripts/g5-response-v2.schema.json']) {
    assert.equal(hash(path.join(out,n)),hash(path.join(ROOT,n)));
  }
  for (const n of ['node_modules','pilotos','captures','.git','calibracion']) assert.equal(fs.existsSync(path.join(out,n)),false);
  assert.throws(() => prepararEntrega(out,{reglasDir:reglas}),/ya tiene archivos/);
  fs.appendFileSync(path.join(out,'skills/g4-saliencia-visual/SKILL.md'),'cambio');
  assert.throws(ejecutar,/Cambió un archivo/);
});

test('La entrega admite solo el cambio de fast-uri y su versión de instalación', () => {
  const base = JSON.parse(fs.readFileSync(path.join(ROOT,DEPENDENCIA.archivo_original)));
  const actual = JSON.parse(fs.readFileSync(path.join(ROOT,DEPENDENCIA.archivo_entrega)));
  assert.doesNotThrow(() => revisarDependencias(base,actual));
  const otro = structuredClone(actual);
  otro.packages['node_modules/ajv'].version = '0.0.0';
  assert.throws(() => revisarDependencias(base,otro),/otras dependencias/);
});

test('La entrega rechaza una versión antigua o no registrada de fast-uri', () => {
  const base = JSON.parse(fs.readFileSync(path.join(ROOT,DEPENDENCIA.archivo_original)));
  const actual = JSON.parse(fs.readFileSync(path.join(ROOT,DEPENDENCIA.archivo_entrega)));
  for (const version of [DEPENDENCIA.anterior,'4.0.0']) {
    actual.packages['node_modules/fast-uri'].version = version;
    assert.throws(() => revisarDependencias(base,actual),/versión de fast-uri/);
  }
});

test('No se prepara un paquete con reglas desactualizadas', t => {
  const dir = temporal(t), reglas = path.join(dir,'reglas'), out = path.join(dir,'salida');
  reglasDePrueba(reglas);
  fs.appendFileSync(path.join(reglas,'apendice-rubricas.md'),'cambio');
  assert.throws(() => prepararEntrega(out,{reglasDir:reglas}),/no coincide/);
  assert.equal(fs.existsSync(out),false);
});

test('El enlace de Codex admite repetición y copia sin borrar contenido ajeno', t => {
  const dir = temporal(t);
  fs.mkdirSync(path.join(dir,'scripts')); fs.mkdirSync(path.join(dir,'skills'));
  fs.writeFileSync(path.join(dir,'skills/SKILL.md'),'ejemplo');
  fs.copyFileSync(path.join(ROOT,'scripts/link-skills.sh'),path.join(dir,'scripts/link-skills.sh'));
  const ejecutar = args => execFileSync('bash',[path.join(dir,'scripts/link-skills.sh'),...args],{encoding:'utf8',stdio:'pipe'});
  ejecutar([]); ejecutar([]);
  assert.equal(fs.readlinkSync(path.join(dir,'.agents/skills')),'../skills');
  ejecutar(['--copy']); ejecutar(['--copy']);
  assert.equal(fs.lstatSync(path.join(dir,'.agents/skills')).isDirectory(),true);
  fs.writeFileSync(path.join(dir,'.agents/skills/ajeno.txt'),'no borrar');
  assert.throws(() => ejecutar(['--copy']),/Ya hay una carpeta/);
  assert.equal(fs.readFileSync(path.join(dir,'.agents/skills/ajeno.txt'),'utf8'),'no borrar');
  assert.throws(() => ejecutar(['--desconocido']),/Uso:/);
  fs.rmSync(path.join(dir,'.agents/skills'),{recursive:true});
  fs.symlinkSync('../otra-carpeta',path.join(dir,'.agents/skills'));
  assert.throws(() => ejecutar([]),/enlace distinto/);
  assert.equal(fs.readlinkSync(path.join(dir,'.agents/skills')),'../otra-carpeta');
});
