#!/usr/bin/env node
'use strict';
// Comprueba las cuatro series sin solicitar ni modificar evaluaciones.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {verify:verifyProgress,verifySeal}=require('./verify-g5-progress');
const {verify:verifyCompletion}=require('./g5-completion-results');
const ROOT=path.resolve(__dirname,'..');
const read=f=>JSON.parse(fs.readFileSync(path.join(ROOT,f),'utf8'));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function checkBaseline(relative){
 assert.equal(hash(fs.readFileSync(path.join(ROOT,relative))),
  hash(execFileSync('git',['show','1a5d066:'+relative],{cwd:ROOT})),relative+': cambió el registro histórico');
}
function main(){
 for(const dir of ['pilotos/g5-2026-10-07','pilotos/g5-progreso-2026-10-19'])checkBaseline(dir+'/SELLO-SHA256.tsv');
 for(const name of ['REGISTRO.json','SELLO-CAPTURAS.tsv'])checkBaseline('preparacion/g5-progreso-2026-10-19/'+name);
 const previous=execFileSync(process.execPath,['scripts/verify-pilot-g5.js','pilotos/g5-2026-10-07','--verify-seal'],{cwd:ROOT,encoding:'utf8'}).trim().split('\n').map(line=>{try{return JSON.parse(line);}catch{return null;}}).find(x=>x?.phase);
 assert.equal(previous.finished,120);assert.equal(previous.valid,120);assert.equal(previous.technical,0);
 const progress=verifyProgress();assert.equal(progress.pendientes,0);assert.equal(progress.errores_tecnicos,0);
 const counts={
  'pilotos/g5-2026-10-07':120,
  'pilotos/g5-progreso-2026-10-19':45,
  'pilotos/g5-sin-pistas-2026-10-19':45,
  'pilotos/g5-cierre-2026-10-19':25
 };
 const series=[{carpeta:'pilotos/g5-2026-10-07',planeadas:120,validas:previous.valid,archivos_sellados:534},
  {carpeta:'pilotos/g5-progreso-2026-10-19',...progress,archivos_sellados:verifySeal(path.join(ROOT,'pilotos/g5-progreso-2026-10-19'))}];
 for(const [name,folder] of [['neutral','g5-sin-pistas-2026-10-19'],['cobertura','g5-cierre-2026-10-19']]){
  const v=verifyCompletion(name);assert.equal(v.pendientes,0);assert.equal(v.errores_tecnicos,0);
  series.push({carpeta:'pilotos/'+folder,...v,archivos_sellados:verifySeal(path.join(ROOT,'pilotos',folder))});
 }
 assert.equal(hash(fs.readFileSync(path.join(ROOT,'skills/g5-posicion-progreso/SKILL.md'))),
  hash(fs.readFileSync(path.join(ROOT,'pilotos/g5-cierre-2026-10-19/RUBRICA.md'))),'La rúbrica activa no coincide con la versión probada en cobertura');
 const sessions=new Set();
 for(const [folder,count] of Object.entries(counts)){
  const proofs=fs.readdirSync(path.join(ROOT,folder,'trazas')).filter(f=>f.endsWith('.json'));
  assert.equal(proofs.length,count);
  for(const file of proofs){const p=read(folder+'/trazas/'+file);assert.ok(p.thread_id&&!sessions.has(p.thread_id),folder+'/'+file+': conversación repetida o ausente');sessions.add(p.thread_id);}
 }
 execFileSync(process.execPath,['scripts/prepare-g5-progress.js','verify'],{cwd:ROOT,stdio:'pipe'});
 execFileSync(process.execPath,['scripts/prepare-g5-coverage.js','verify'],{cwd:ROOT,stdio:'pipe'});
 assert.equal(sessions.size,235);
 const result={series,sesiones_distintas_entre_las_cuatro_series:sessions.size,
  archivos_primarios_sellados:series.reduce((s,x)=>s+x.archivos_sellados,0),
  registros_historicos_iguales_al_commit:'1a5d066',rubrica_activa_igual_a_cobertura:true,
  capturas_y_pares_geometricos_comprobados:true,validacion_experta:false};
 const out=path.join(ROOT,'revisiones/g5-cierre-2026-10-19');fs.mkdirSync(out,{recursive:true});
 fs.writeFileSync(path.join(out,'VERIFICACION.json'),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify(result));
}
if(require.main===module)main();
