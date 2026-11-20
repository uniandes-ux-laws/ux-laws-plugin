'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const {seleccionarSeries, revisarLibro} = require('./orchestrate');

const ROOT = path.resolve(__dirname, '..');
// El sandbox de Windows rechaza los pipes de spawnSync; la salida heredada sí funciona.
const cli = args => spawnSync(process.execPath, ['scripts/orchestrate.js', ...args], {cwd:ROOT, stdio:'inherit'});
const load = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const save = (p, o) => fs.writeFileSync(p, JSON.stringify(o, null, 2) + '\n');
const selected = ['g2-wireframe','g2-screenshot','g4-screenshot','g7-wireframe','g7-screenshot'];

function temp(t) {
  const root = fs.realpathSync(os.tmpdir());
  const dir = fs.mkdtempSync(path.join(root, 'ux-series-'));
  t.after(() => {
    const actual = fs.realpathSync(dir);
    assert.equal(path.dirname(actual), root);
    assert.match(path.basename(actual), /^ux-series-/);
    fs.rmSync(actual, {recursive:true, force:true});
  });
  return dir;
}

function prepare(out, series) {
  return cli(['preparar','--captura','calibracion/C13','--out',out,
    '--modo','comparacion','--repeticiones','1','--series',series,
    '--runtime','prueba-local','--model-id','modelo-prueba-1',
    '--decoding','no-expuesto-por-el-runtime']);
}

test('la grilla anterior se conserva y se rechazan selecciones ambiguas', () => {
  assert.equal(seleccionarSeries('referencia').length, 7);
  assert.equal(seleccionarSeries('comparacion').length, 13);
  assert.deepEqual(seleccionarSeries('comparacion', selected).map(s => s.id + '-' + s.channel), selected);
  for (const invalid of [[], ['g4-wireframe'], ['g2-wireframe','g2-wireframe'], ['g2-wireframe','']]) {
    assert.throws(() => seleccionarSeries('comparacion', invalid));
  }
});

test('prepara y recoge exactamente las cinco series declaradas', t => {
  const out = path.join(temp(t), 'corrida');
  const prepared = prepare(out, selected.join(','));
  assert.equal(prepared.status, 0, String(prepared.error || 'preparar fallo'));
  const file = path.join(out, 'invocaciones.json');
  const book = load(file);
  assert.deepEqual(book.series_seleccionadas, selected);
  assert.deepEqual(book.invocaciones.map(i => i.group_id + '-' + i.channel), selected);
  const verify = cli(['verificar','--corrida',out]);
  assert.equal(verify.status, 0, String(verify.error || 'verificar fallo'));
  const g2 = book.invocaciones.find(i => i.group_id === 'g2' && i.channel === 'wireframe');
  const g7 = book.invocaciones.find(i => i.group_id === 'g7' && i.channel === 'wireframe');
  assert.deepEqual(g2.imagenes.map(i => i.canal), ['wireframe','screenshot']);
  assert.deepEqual(g2.imagenes[1].criterios, ['Ap']);
  assert.deepEqual(g7.imagenes.map(i => i.canal), ['wireframe']);

  for (const inv of book.invocaciones) {
    fs.writeFileSync(path.resolve(ROOT, inv.resultado_esperado), '{}\n');
    inv.contexto_limpio = true;
    inv.mecanismo_de_aislamiento = 'Datos artificiales sin llamada al modelo';
  }
  save(file, book);
  const collected = cli(['recoger','--corrida',out,'--conservar-invalidas']);
  assert.equal(collected.status, 0, String(collected.error || 'recoger fallo'));
  const profile = load(path.join(out, 'perfil.json'));
  assert.deepEqual(profile.series_seleccionadas, selected);
  assert.equal(profile.perfil.length, 5);
  assert(profile.perfil.every(p => p.conteos.invalidas === 1));
  assert.deepEqual(profile.comparacion_canales.map(p => p.group_id), ['g2','g7']);
  assert.match(fs.readFileSync(path.join(out, 'resumen.md'), 'utf8'), /perfil de 3 aspectos seleccionados/);
  assert.equal(fs.readFileSync(path.resolve(ROOT, g2.resultado_esperado), 'utf8'), '{}\n');
});

test('faltantes, duplicados y canales no admitidos detienen la preparacion o verificacion', t => {
  const root = temp(t), out = path.join(root, 'corrida');
  const bad = prepare(path.join(root, 'invalida'), 'g4-wireframe');
  assert.notEqual(bad.status, 0);
  assert.equal(fs.existsSync(path.join(root, 'invalida')), false);
  const duplicate = prepare(path.join(root, 'duplicada'), 'g7-wireframe,g7-wireframe');
  assert.notEqual(duplicate.status, 0);
  assert.equal(fs.existsSync(path.join(root, 'duplicada')), false);
  const prepared = prepare(out, selected.join(','));
  assert.equal(prepared.status, 0, String(prepared.error || 'preparar fallo'));
  const file = path.join(out, 'invocaciones.json'), book = load(file);
  book.invocaciones.pop();
  save(file, book);
  const verify = cli(['verificar','--corrida',out]);
  assert.notEqual(verify.status, 0);
  assert(revisarLibro(book, out).some(p => /falta la invocacion/.test(p)));
});
