'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {command,tasks}=require('./pilot-g5-progress');
test('cada repetición recorre nueve casos y nunca incluye el caso sin ancla',()=>{
  const m={repetitions:5,pages:['P01','P02','P03','P04','P05','P07','P08','P09','P10'].map(id=>({id}))};
  const rows=tasks(m);assert.equal(rows.length,45);assert.equal(new Set(rows.map(t=>t.key)).size,45);
  assert.equal(rows[8].key,'P10-r1');assert.equal(rows[9].key,'P01-r2');assert.ok(rows.every(t=>t.p.id!=='P06'));
});
test('el comando adjunta solo las dos imágenes, usa contexto nuevo y no entrega expectativas',()=>{
  const args=command({model_id:'synthetic',decoding:{model_reasoning_effort:'medium'}},{id:'P03'},'P03-r1','/tmp/synthetic-evaluator');
  assert.ok(args.includes('--ephemeral')&&args.includes('--ignore-user-config'));assert.ok(args.includes('project_doc_max_bytes=0'));
  const images=args.flatMap((a,i)=>a==='--image'?[args[i+1]]:[]);
  assert.equal(images.length,2);assert.ok(images[0].endsWith('/P03/wireframe.png'));assert.ok(images[1].endsWith('/P03/screenshot.png'));
  assert.ok(!args.join(' ').includes('EXPECTATIVAS'));assert.ok(!args.includes('resume'));
  assert.ok(args.includes('shell_tool')&&args.includes('apps'));assert.ok(args.some(a=>a.startsWith('model_instructions_file=')));
});
