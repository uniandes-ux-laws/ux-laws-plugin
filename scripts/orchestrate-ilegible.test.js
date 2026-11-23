'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const cli = args => spawnSync(process.execPath, ['scripts/orchestrate.js', ...args], {cwd:ROOT, stdio:'inherit'});
const load = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const save = (p, o) => fs.writeFileSync(p, JSON.stringify(o, null, 2) + '\n');
const series = 'g2-wireframe,g2-screenshot,g4-screenshot,g7-wireframe,g7-screenshot';

// Se usa una carpeta dentro del repositorio: fuera de él, rutas relativas con nombres cortos de Windows
// hacen que el libro no reconozca los resultados.
test('con --conservar-invalidas un JSON ilegible se cuenta como inválida; sin la opción sigue bloqueando', t => {
  const base = path.join(ROOT, 'pruebas-claude-sonnet-2026-11-20');
  fs.mkdirSync(base, {recursive:true});
  const dir = fs.mkdtempSync(path.join(base, 'prueba-ilegible-'));
  t.after(() => {
    const actual = fs.realpathSync(dir);
    assert.equal(path.dirname(actual), fs.realpathSync(base));
    assert.match(path.basename(actual), /^prueba-ilegible-/);
    fs.rmSync(actual, {recursive:true, force:true});
  });
  const out = path.join(dir, 'corrida');
  const prepared = cli(['preparar','--captura','calibracion/C13','--out',out,'--modo','comparacion','--repeticiones','1',
    '--series',series,'--runtime','prueba-local','--model-id','modelo-prueba-1','--decoding','no-expuesto-por-el-runtime']);
  assert.equal(prepared.status, 0);
  const file = path.join(out, 'invocaciones.json'), book = load(file);
  for (const [i, inv] of book.invocaciones.entries()) {
    fs.writeFileSync(path.resolve(ROOT, inv.resultado_esperado), i === 0 ? '{"a":1}}\n' : '{}\n');
    inv.contexto_limpio = true;
    inv.mecanismo_de_aislamiento = 'Datos artificiales sin llamada al modelo';
  }
  save(file, book);
  assert.notEqual(cli(['recoger','--corrida',out]).status, 0);
  assert.equal(fs.existsSync(path.join(out, 'perfil.json')), false);
  const collected = cli(['recoger','--corrida',out,'--conservar-invalidas']);
  assert.equal(collected.status, 0);
  const profile = load(path.join(out, 'perfil.json'));
  assert(profile.perfil.every(p => p.conteos.invalidas === 1));
  assert.equal(profile.invalidas_conservadas.length, 5);
  assert(profile.invalidas_conservadas.some(i => /JSON ilegible/.test(i.errores.join(' '))));
  assert.equal(fs.readFileSync(path.resolve(ROOT, book.invocaciones[0].resultado_esperado), 'utf8'), '{"a":1}}\n');
});
