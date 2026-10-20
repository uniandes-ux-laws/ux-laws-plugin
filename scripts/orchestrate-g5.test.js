'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),os=require('os');
const {spawnSync}=require('node:child_process');
test('las corridas nuevas entregan a G5 medidas sin clases y conservan los datos originales',t=>{
 const root=path.resolve(__dirname,'..'),dir=fs.mkdtempSync(path.join(os.tmpdir(),'g5-orchestrate-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const capture=path.join(dir,'captura');fs.mkdirSync(capture);
 const source=path.join(root,'preparacion/g5-progreso-2026-10-19/capturas/P03');
 for(const f of ['meta.json','nodes.json','wireframe.png','screenshot.png'])fs.copyFileSync(path.join(source,f),path.join(capture,f));
 const out=path.join(dir,'corrida');
 const proc=spawnSync(process.execPath,[path.join(root,'scripts/orchestrate.js'),'preparar','--captura',capture,'--out',out,'--runtime','synthetic-test','--model-id','synthetic-1','--decoding','no-expuesto-por-el-runtime','--repeticiones','1'],{cwd:root,encoding:'utf8'});
 assert.equal(proc.status,0,proc.stderr+proc.stdout);
 const input=JSON.parse(fs.readFileSync(path.join(out,'entradas/g5.json'))),raw=JSON.parse(fs.readFileSync(path.join(capture,'measurements.json')));
 assert.ok(raw.g5.g5_indicador_paso_candidatos.some(c=>c.class));assert.ok(input.g5.g5_indicador_paso_candidatos.every(c=>!Object.hasOwn(c,'class')));
 assert.deepEqual(input.g5.g5_listas,raw.g5.g5_listas);
 const prompt=fs.readFileSync(path.join(out,'prompts/g5-wireframe.md'),'utf8');assert.ok(prompt.includes('No leas measurements.json'));assert.ok(!prompt.includes('pasos color'));
 const book=JSON.parse(fs.readFileSync(path.join(out,'invocaciones.json')));
 assert.equal(book.invocaciones.find(i=>i.group_id==='g5').g5_contract_version,'0.2.0');
 assert.ok(book.invocaciones.filter(i=>i.group_id!=='g5').every(i=>!i.g5_contract_version));
});
