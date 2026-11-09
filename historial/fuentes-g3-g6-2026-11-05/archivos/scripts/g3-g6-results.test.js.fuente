'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),{derivedAudit}=require('./g3-g6-results');
test('un aviso superpuesto dentro de la región no queda fuera por tener otro padre DOM',()=>{
 const input={group_id:'g3',g3:{g3_nodos:[{id:1,caja:{x:0,y:0,w:100,h:100}},{id:2,caja:{x:0,y:30,w:100,h:30}},{id:3,caja:{x:0,y:70,w:100,h:30}},{id:99,caja:{x:0,y:0,w:100,h:20}}],g3_parentesco:[[1,0],[2,1],[3,1],[99,0]]}};
 const raw={not_applicable:false,score:1,trigger:'X',measurements:{region_id:1,U:2,B:1,H:0,V:false,X:1,unidades_ids:[2,3],X_ids:[99],X_compite:true,X_area_mayor:false,segmentacion:'encabezada',difiere_contenido:false,ancla_definida:true}};
 const before=JSON.stringify({raw,input}),a=derivedAudit(raw,input);assert.equal(a.expected_score,1);assert.deepEqual(a.X_dentro_ids,[99]);assert.deepEqual(a.issues,[]);assert.equal(JSON.stringify({raw,input}),before);
 raw.measurements.H=null;assert.equal(derivedAudit(raw,input).expected_score,1);
 raw.measurements.X_area_mayor=null;raw.score=null;raw.trigger=null;raw.measurements.ancla_definida=false;
 assert.equal(derivedAudit(raw,input).expected_score,null);assert.deepEqual(derivedAudit(raw,input).issues,[]);
});
