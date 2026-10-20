'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),api=require('./pilot-g3-g6-real');
test('se usan solo las 24 páginas declaradas y lotes pequeños',async()=>{assert.equal(api.ids().length,24);assert.equal(new Set(api.ids()).size,24);await assert.rejects(api.run(0));await assert.rejects(api.run(4));});
test('cada evaluación adjunta wireframe y screenshot y queda aislada de herramientas e historia',()=>{
 const t={g:'g3',key:'C02-r1',m:{model_id:'gpt-6.1-sol',decoding:{model_reasoning_effort:'low'}},p:{captura:'calibracion/C02'}};
 const args=api.command(t,'/tmp/test-sin-ejecutar');const images=args.flatMap((v,i)=>v==='--image'?[args[i+1]]:[]);
 assert.deepEqual(images.map(p=>path.basename(p)),['wireframe.png','screenshot.png']);assert.ok(args.includes('--ephemeral'));assert.ok(args.includes('--ignore-user-config'));assert.ok(args.includes('shell_tool'));assert.ok(args.includes('apps'));assert.ok(args.includes('project_doc_max_bytes=0'));assert.ok(!args.includes('resume'));
});
test('las posiciones registradas son 120 por grupo y alternan grupos sin compartir conversación',t=>{
 if(!fs.existsSync(path.join(api.outDir('g3'),'manifiesto.json'))){t.skip('La preparación aún no existe');return;}
 const tasks=api.allTasks();assert.equal(tasks.length,240);assert.equal(new Set(tasks.map(t=>t.g+'/'+t.key)).size,240);assert.deepEqual(tasks.slice(0,4).map(t=>t.g+'/'+t.key),['g3/C02-r1','g6/C02-r1','g3/C03-r1','g6/C03-r1']);for(const g of ['g3','g6'])assert.equal(tasks.filter(t=>t.g===g).length,120);
});
