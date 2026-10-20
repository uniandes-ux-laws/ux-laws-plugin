'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {comparison}=require('./g5-completion-results');
function fixture(){
 const expected={Q:true,G_existe:true,G_nombra:true,G_actual:true,G_forma:true,steps_declared:4,
  score:4,not_applicable:false,evidence_insufficient:false,trigger:'J_final',J_inicio:true,J_final:true,final_compite_con_inicio:false};
 const raw={score:4,not_applicable:false,evidence_insufficient:false,trigger:'J_final',measurements:{...expected}};
 return {raw,expected};
}
test('cobertura informa diferencias de trigger y de competencia aunque coincida el nivel',()=>{
 const {raw,expected}=fixture();raw.trigger='G_forma';raw.measurements.final_compite_con_inicio=true;
 const before=JSON.stringify(raw),r=comparison(raw,expected,'cobertura','E03');
 assert.equal(r.coincide_nivel,true);
 assert.deepEqual(r.diferencias_criterios.map(d=>d.campo),['trigger','final_compite_con_inicio']);
 assert.equal(JSON.stringify(raw),before);
});
test('NA y cero se comparan como resultados distintos',()=>{
 const expected={Q:false,evidence_insufficient:false,not_applicable:true,score:null};
 const raw={measurements:{Q:false},evidence_insufficient:false,not_applicable:false,score:0};
 assert.equal(comparison(raw,expected,'neutral','P09').coincide_nivel,false);
 raw.not_applicable=true;raw.score=null;
 assert.equal(comparison(raw,expected,'neutral','P09').coincide_nivel,true);
});
test('P10 mantiene sus límites y no entra en coincidencia de nivel',()=>{
 const {raw,expected}=fixture();expected.score=null;expected.G_actual=null;expected.evidence_insufficient=true;
 const r=comparison(raw,expected,'neutral','P10');
 assert.equal(r.coincide_nivel,null);
 assert.deepEqual(r.diferencias_criterios,[{campo:'evidence_insufficient',esperado:true,recibido:false}]);
});
test('un criterio de progreso distinto no se oculta por coincidir en puntaje',()=>{
 const {raw,expected}=fixture();raw.measurements.G_actual=false;
 const r=comparison(raw,expected,'cobertura','E03');
 assert.equal(r.coincide_nivel,true);
 assert.deepEqual(r.diferencias_criterios,[{campo:'G_actual',esperado:true,recibido:false}]);
});
