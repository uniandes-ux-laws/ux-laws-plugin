'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),{tasks,realIds,synthIds,command}=require('./pilot-g4-phase2');
test('la fase dirigida tiene nueve reales y ocho sintéticos, con cinco posiciones distintas por página',()=>{
 const t=tasks({repetitions:5,pages:[...synthIds,...realIds].map(id=>({id}))});assert.equal(t.length,85);assert.equal(new Set(t.map(t=>t.key)).size,85);
 for(const id of [...synthIds,...realIds])assert.equal(t.filter(t=>t.p.id===id).length,5);
});
test('el evaluador recibe solo screenshot y se aísla de herramientas, proyecto y expectativas',()=>{
 const args=command({model_id:'gpt-6.1-sol',decoding:{model_reasoning_effort:'low'}},{captura:'calibracion/C13'},'C13-r1','/tmp/empty');
 assert.equal(args.filter(x=>x==='--image').length,1);assert.ok(args.includes('--ephemeral'));assert.ok(args.includes('project_doc_max_bytes=0'));assert.ok(!args.some(x=>/EXPECTATIVAS|revision\.json|wireframe\.png/.test(x)));
});
