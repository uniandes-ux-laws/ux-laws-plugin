'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {compare,anchorAudit}=require('./report-g5-progress');
test('NA y nivel cero no se confunden en la comparación',()=>{
  const raw={score:0,not_applicable:false,evidence_insufficient:false,measurements:{Q:false}};
  assert.equal(compare(raw,{score:null,not_applicable:true,evidence_insufficient:false,Q:false}).coincide_nivel,false);
});
test('el caso de límite no entra en coincidencia de niveles y conserva una marca ausente',()=>{
  const raw={score:3,not_applicable:false,evidence_insufficient:false,measurements:{Q:true,G_existe:true,G_nombra:true,G_actual:true,G_forma:true,steps_declared:4}};
  const expected={score:null,Q:true,G_existe:true,G_nombra:true,G_actual:true,G_forma:null,steps_declared:4,evidence_insufficient:true};
  const result=compare(raw,expected,true);assert.equal(result.coincide_nivel,null);
  assert.deepEqual(result.diferencias_criterios,[{campo:'evidence_insufficient',esperado:true,recibido:false}]);
});
test('una contradicción del ancla se informa sin corregir la respuesta',()=>{
  const raw={score:3,not_applicable:false,measurements:{Q:true,G_existe:false}},before=JSON.stringify(raw);
  assert.ok(anchorAudit(raw).length);assert.equal(JSON.stringify(raw),before);
});
