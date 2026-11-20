'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const {crear,registrar} = require('./paquetes-codex');
const ROOT = path.resolve(__dirname, '..');
const sha = b => crypto.createHash('sha256').update(b).digest('hex');

test('copia insumos, conserva la respuesta literal y permite recuperar el registro', t => {
  const root = fs.realpathSync(path.join(ROOT,'pruebas-codex-2026-11-20'));
  const dir = fs.mkdtempSync(path.join(root,'prueba-paquetes-'));
  t.after(() => {
    const actual = fs.realpathSync(dir);
    assert.equal(path.dirname(actual), root);
    assert.match(path.basename(actual), /^prueba-paquetes-/);
    fs.rmSync(actual, {recursive:true, force:true});
  });
  const corrida = path.join(dir,'corrida'), entradas = path.join(dir,'entradas');
  fs.mkdirSync(path.join(corrida,'resultados'), {recursive:true});
  const source = (name, text) => {
    const file = path.join(corrida,name), bytes = Buffer.from(text);
    fs.writeFileSync(file, bytes);
    return {archivo:path.relative(ROOT,file),sha256:sha(bytes)};
  };
  const solicitud = source('solicitud.json','{}\n'), prompt = source('prompt.md','prompt artificial'),
    entrada = source('entrada.json','{}\n'), esquema = source('esquema.json','{}\n'),
    wire = source('wireframe.png','imagen artificial 1'), screenshot = source('screenshot.png','imagen artificial 2');
  const resultado = path.join(corrida,'resultados','g2-wireframe-r1.json');
  const bookPath = path.join(corrida,'invocaciones.json');
  fs.writeFileSync(bookPath, JSON.stringify({corrida:'H01',invocaciones:[{
    id:'g2-wireframe-r1',solicitud:solicitud.archivo,solicitud_sha256:solicitud.sha256,
    prompt:prompt.archivo,prompt_hash:prompt.sha256,entrada:entrada.archivo,entrada_sha256:entrada.sha256,
    esquema:esquema.archivo,esquema_sha256:esquema.sha256,resultado_esperado:path.relative(ROOT,resultado),
    imagenes:[{canal:'wireframe',...wire},{canal:'screenshot',...screenshot}],
    contexto_limpio:null,mecanismo_de_aislamiento:null,
  }]}));
  assert.deepEqual(crear(corrida,entradas), ['g2-wireframe-r1']);
  assert.throws(() => crear(corrida,entradas), /ya existe/);
  const bundle = path.join(entradas,'H01','g2-wireframe-r1'), bytes = Buffer.from('{"artificial":true}\n');
  fs.writeFileSync(path.join(bundle,'respuesta.json'), bytes);
  assert.equal(registrar(corrida,entradas,'g2-wireframe-r1').sha256, sha(bytes));
  assert.deepEqual(fs.readFileSync(resultado), bytes);
  let book = JSON.parse(fs.readFileSync(bookPath,'utf8'));
  assert.equal(book.invocaciones[0].contexto_limpio, true);
  assert.match(book.invocaciones[0].mecanismo_de_aislamiento, /fork_turns=none/);
  assert.equal(registrar(corrida,entradas,'g2-wireframe-r1').sha256, sha(bytes));
  // Mecanismo propio de otro runtime: se escribe tal cual; uno vacío se rechaza.
  assert.throws(() => registrar(corrida,entradas,'g2-wireframe-r1','  '), /mecanismo/);
  registrar(corrida,entradas,'g2-wireframe-r1','Subagente nuevo sin fork (prueba)');
  assert.equal(JSON.parse(fs.readFileSync(bookPath,'utf8')).invocaciones[0].mecanismo_de_aislamiento, 'Subagente nuevo sin fork (prueba)');
  fs.appendFileSync(path.join(bundle,'prompt.md'), 'cambio');
  assert.throws(() => registrar(corrida,entradas,'g2-wireframe-r1'), /entrada modificada/);
  book = JSON.parse(fs.readFileSync(bookPath,'utf8'));
  assert.equal(book.invocaciones[0].contexto_limpio, true);
  assert.deepEqual(fs.readFileSync(resultado), bytes);
});
