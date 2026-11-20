'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const {registrarCierre} = require('./registrar-cierre-codex');

test('registra una página con cinco posiciones y no repite el cierre', t => {
  const root = fs.realpathSync(os.tmpdir()), dir = fs.mkdtempSync(path.join(root,'ux-cierre-codex-'));
  t.after(() => {
    const actual = fs.realpathSync(dir);
    assert.equal(path.dirname(actual), root);
    assert.match(path.basename(actual), /^ux-cierre-codex-/);
    fs.rmSync(actual, {recursive:true, force:true});
  });
  fs.mkdirSync(path.join(dir,'registros'));
  fs.mkdirSync(path.join(dir,'G01'));
  const series = [['g2','wireframe'],['g2','screenshot'],['g4','screenshot'],['g7','wireframe'],['g7','screenshot']];
  fs.writeFileSync(path.join(dir,'MANIFIESTO-PENDIENTE.json'),JSON.stringify({paginas:[{pagina:'G01',estado:'en_ejecucion'}]}));
  fs.writeFileSync(path.join(dir,'registros','cronologia.jsonl'),JSON.stringify({evento:'inicio_pagina',pagina:'G01',fecha:new Date().toISOString()})+'\n');
  fs.writeFileSync(path.join(dir,'G01','invocaciones.json'),JSON.stringify({invocaciones:series.map(([group_id,channel]) => ({group_id,channel,contexto_limpio:true,mecanismo_de_aislamiento:'prueba'}))}));
  fs.writeFileSync(path.join(dir,'G01','perfil.json'),JSON.stringify({perfil:series.map(([group_id,channel]) => ({group_id,channel,evaluaciones:[{estado:'puntaje'}]}))}));
  const result=registrarCierre('G01',dir);
  assert.equal(result.cerradas,1);
  assert.equal(result.estados.length,5);
  assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'MANIFIESTO-PENDIENTE.json'),'utf8')).paginas[0].estado,'cerrada');
  assert.throws(() => registrarCierre('G01',dir), /no está registrada en ejecución/);
});
