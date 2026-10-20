'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),os=require('os'),{spawnSync}=require('node:child_process');
test('G4 recibe su proyección nueva y los otros seis grupos conservan versión y fuentes',t=>{
 const root=path.resolve(__dirname,'..'),temp=fs.mkdtempSync(path.join(os.tmpdir(),'g4-orchestrate-'));t.after(()=>fs.rmSync(temp,{recursive:true,force:true}));
 const source=path.join(root,'calibracion/C13'),capture=path.join(temp,'captura'),out=path.join(temp,'salida');fs.mkdirSync(capture);
 for(const f of ['meta.json','nodes.json','screenshot.png','wireframe.png'])fs.copyFileSync(path.join(source,f),path.join(capture,f));
 const p=spawnSync(process.execPath,[path.join(root,'scripts/orchestrate.js'),'preparar','--captura',capture,'--out',out,'--runtime','synthetic-test','--model-id','synthetic-1','--decoding','no-expuesto-por-el-runtime','--repeticiones','1'],{cwd:root,encoding:'utf8'});assert.equal(p.status,0,p.stderr+p.stdout);
 const book=JSON.parse(fs.readFileSync(path.join(out,'invocaciones.json'))),entry=JSON.parse(fs.readFileSync(path.join(out,'entradas/g4.json'))),base=JSON.parse(fs.readFileSync(path.join(capture,'measurements.json')));
 assert.equal(base.schema_version,'1.0.6');assert.equal(base.g4.g4_conjuntos_pares.find(s=>s.conjunto==='g4:LI#524').parcial,true);
 assert.equal(entry.measurements_version,'1.0.7');assert.equal(entry.g4.g4_conjuntos_pares.find(s=>s.conjunto==='g4:LI#524').parcial,false);
 assert.equal(book.invocaciones.find(i=>i.group_id==='g4').g4_contract_version,'0.2.0');assert.ok(book.invocaciones.filter(i=>i.group_id!=='g4').every(i=>i.measurements_version==='1.0.6'&&!i.g4_contract_version));
 assert.ok(fs.readFileSync(path.join(out,'prompts/g4-screenshot.md'),'utf8').includes('No leas measurements.json'));
});
