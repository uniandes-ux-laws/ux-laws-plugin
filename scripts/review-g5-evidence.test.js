'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {analyze,category}=require('./review-g5-evidence');
test('la revisión conserva los 120 juicios y distingue los dos desacuerdos de C17',()=>{
  const a=analyze();assert.equal(a.con_evidencia_insuficiente,63);assert.equal(a.archivos_primarios_verificados,534);
  assert.equal(Object.values(a.motivos).reduce((s,n)=>s+n,0),63);
  assert.deepEqual(a.evaluaciones.filter(r=>r.pagina==='C17'&&!r.evidence_insufficient).map(r=>r.repeticion),[1,3]);
  assert.equal(a.evaluaciones.filter(r=>r.not_applicable).length,5);
});
test('una marca nueva sin causa revisada hace fallar el informe en lugar de inventar una explicación',()=>{
  assert.throws(()=>category('NUEVA',{evidence_insufficient:true},null),/sin revisar/);
  assert.equal(category('C17',{evidence_insufficient:false},null),null);
});
