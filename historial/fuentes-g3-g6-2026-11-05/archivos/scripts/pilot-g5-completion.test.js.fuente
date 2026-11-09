'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {experiment}=require('./pilot-g5-completion');
test('las dos series tienen planes distintos y no vuelven a incluir P06 en la comparación histórica',()=>{
 const neutral=experiment('neutral'),coverage=experiment('cobertura');
 const n=neutral.tasks({repetitions:5,pages:neutral.def.ids.map(id=>({id}))}),c=coverage.tasks({repetitions:5,pages:coverage.def.ids.map(id=>({id}))});
 assert.equal(n.length,45);assert.equal(c.length,25);assert.ok(!n.some(t=>t.p.id==='P06'));assert.equal(c[0].key,'E01-r1');
});
test('la ejecución no entrega al modelo expectativas ni archivos fuente',()=>{
 for(const series of ['neutral','cobertura']){
  const api=experiment(series),args=api.command({model_id:'synthetic-1',decoding:{model_reasoning_effort:'medium'}},{id:'x'},'x-r1','/tmp/solo-evaluacion');
  assert.ok(args.includes('--ephemeral')&&args.includes('--ignore-user-config'));
  assert.equal(args.filter(a=>a==='--image').length,2);assert.ok(!args.join(' ').includes('EXPECTATIVAS'));
  assert.ok(args.includes('project_doc_max_bytes=0')&&args.includes('web_search="disabled"'));
 }
});
