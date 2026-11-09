'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),{compare,summarizePage}=require('./g4-phase2-results');
test('una coincidencia de nivel no oculta discrepancia en Bn o Cn',()=>{
 const e={score:2,I_principal:1,P:true,Bn:0,Cn:1,trigger:'Cn'},raw={score:2,not_applicable:false,trigger:'Cn',measurements:{...e,Cn:0}};
 const before=JSON.stringify(raw),r=compare(raw,e);assert.equal(r.coincide_nivel,true);assert.deepEqual(r.diferencias,[{campo:'Cn',esperado:1,recibido:0}]);assert.equal(JSON.stringify(raw),before);
});
test('una abstención o NA no coincide con un puntaje numérico esperado',()=>{
 const e={score:1,I_principal:0,P:null,Bn:0,Cn:0,trigger:'I'};
 for(const na of [true,false])assert.equal(compare({score:null,not_applicable:na,trigger:null,measurements:e},e).coincide_nivel,false);
});
test('la ausencia de selección y de trigger no cuenta como otro conjunto ni como otra regla',()=>{
 const abst={estado:'abstencion',score:null,trigger:null,measurements:{main_set_id:null},evidence_insufficient:true};
 const score={estado:'valido',score:1,trigger:'I',measurements:{main_set_id:'g4:LI#1'},evidence_insufficient:true};
 const mixed=summarizePage({id:'C09',tipo:'real'},[abst,score,abst,abst,abst]);
 assert.equal(mixed.conjuntos_distintos,1);assert.equal(mixed.sin_principal,4);
 assert.equal(mixed.triggers_distintos,1);assert.equal(mixed.sin_trigger,4);
 assert.equal(mixed.nivel_estable,null);assert.equal(mixed.trigger_estable,null);
 const empty=summarizePage({id:'C13',tipo:'real'},Array(5).fill(abst));
 assert.equal(empty.conjuntos_distintos,0);assert.equal(empty.sin_principal,5);assert.equal(empty.triggers_distintos,0);
});
