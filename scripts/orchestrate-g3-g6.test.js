'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),os=require('os'),{spawnSync}=require('node:child_process');
test('G3/G6 reciben evidencia nueva y preparar una corrida no reescribe la medición archivada',t=>{
 const root=path.resolve(__dirname,'..'),tmp=fs.mkdtempSync(path.join(os.tmpdir(),'ux-orchestrate-36-'));t.after(()=>fs.rmSync(tmp,{recursive:true,force:true}));
 const cap=path.join(tmp,'captura'),out=path.join(tmp,'salida');fs.mkdirSync(cap);for(const f of ['meta.json','nodes.json','measurements.json','screenshot.png','wireframe.png'])fs.copyFileSync(path.join(root,'calibracion/C07',f),path.join(cap,f));
 const before=fs.readFileSync(path.join(cap,'measurements.json'));
 const r=spawnSync(process.execPath,[path.join(root,'scripts/orchestrate.js'),'preparar','--captura',cap,'--out',out,'--runtime','synthetic-test','--model-id','synthetic-1','--decoding','no-expuesto-por-el-runtime','--repeticiones','1'],{cwd:root,encoding:'utf8'});assert.equal(r.status,0,r.stderr+r.stdout);assert.deepEqual(fs.readFileSync(path.join(cap,'measurements.json')),before);
 const book=JSON.parse(fs.readFileSync(path.join(out,'invocaciones.json')));for(const g of ['g3','g6']){const row=book.invocaciones.find(i=>i.group_id===g);assert.equal(row.measurements_version,'1.1.0');assert.equal(row.contrato_g3_g6,'0.1.0');const prompt=fs.readFileSync(path.join(root,row.prompt),'utf8');assert.ok(prompt.includes('Esto es evaluación sobre wireframe con apoyo textual de screenshot'));assert.ok(fs.existsSync(path.join(out,'entradas',g+'.json')));}
 for(const g of ['g2','g5','g7'])assert.equal(book.invocaciones.find(i=>i.group_id===g).measurements_version,'1.0.6');for(const g of ['g1','g4'])assert.equal(book.invocaciones.find(i=>i.group_id===g).measurements_version,'1.0.7');
});
