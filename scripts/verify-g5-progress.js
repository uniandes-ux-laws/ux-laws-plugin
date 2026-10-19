#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {ROOT,OUT,checkFiles,tasks,attribution,command}=require('./pilot-g5-progress');
const {promptFor,validationProblems}=require('./pilot-g5-real');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8')),text=f=>fs.readFileSync(f,'utf8');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex'),sha=f=>hash(fs.readFileSync(f));
function verify(){
  const m=checkFiles(),sessions=new Set();let finished=0,valid=0,invalid=0,technical=0;
  const registered=execFileSync('git',['show','3cbfc6b9c035520e572ba0e62467c9fb2803101b:pilotos/g5-progreso-2026-10-19/manifiesto.json'],{cwd:ROOT});
  assert.equal(sha(path.join(OUT,'manifiesto.json')),hash(registered),'El manifiesto cambió respecto al registro anterior a las respuestas');
  assert.equal(hash(execFileSync('git',['show',m.git_commit+':scripts/pilot-g5-progress.js'],{cwd:ROOT})),m.runner_sha256);
  for(const p of m.pages)assert.equal(promptFor(read(path.join(OUT,'entradas',p.id+'.json')),text(path.join(OUT,'RUBRICA.md')),text(path.join(OUT,'ESCALA.md'))),text(path.join(OUT,'prompts',p.id+'.md')));
  for(const t of tasks(m)){
    const file=path.join(OUT,'trazas',t.key+'.json');
    if(!fs.existsSync(file)){
      for(const [dir,suffix] of [['trazas','.jsonl'],['respuestas','.json']])assert.ok(!fs.existsSync(path.join(OUT,dir,t.key+suffix)),t.key+': intento sin cierre');
      continue;
    }
    finished++;const proof=read(file),trace=path.join(OUT,'trazas',t.key+'.jsonl');assert.equal(sha(trace),proof.trace_sha256);
    assert.equal(proof.prompt_hash,t.p.prompt_hash);assert.equal(proof.response_schema_sha256,m.fixed_files_sha256['response.schema.json']);assert.equal(proof.cli_version,m.cli_version);
    const cd=proof.command[proof.command.indexOf('--cd')+1];assert.deepEqual(proof.command,command(m,t.p,t.key,cd));
    assert.ok(Date.parse(proof.started_at)>=Date.parse(m.registrado_en));
    const events=text(trace).trim().split('\n').filter(Boolean).map(JSON.parse);
    assert.equal(events.find(e=>e.type==='thread.started')?.thread_id??null,proof.thread_id);
    if(proof.thread_id){assert.ok(!sessions.has(proof.thread_id),t.key+': sesión repetida');sessions.add(proof.thread_id);}
    const rawFile=path.join(OUT,'respuestas',t.key+'.json');if(proof.raw_sha256)assert.equal(sha(rawFile),proof.raw_sha256);
    if(proof.status==='error_tecnico'){technical++;continue;}
    const raw=read(rawFile),messages=events.filter(e=>e.type==='item.completed'&&e.item?.type==='agent_message');
    assert.deepEqual(JSON.parse(messages.at(-1).item.text),raw);assert.deepEqual(events.find(e=>e.type==='turn.completed').usage,proof.usage);
    assert.ok(events.filter(e=>e.type==='item.completed').every(e=>['agent_message','reasoning'].includes(e.item.type)),t.key+': herramienta ejecutada');
    const errors=validationProblems(raw,read(path.join(OUT,'entradas',t.p.id+'.json')),attribution(m,t.p,t.r),new Set(read(path.join(ROOT,t.p.nodes_path)).map(n=>n.id)));
    if(proof.status==='invalido'){invalid++;assert.ok(errors.length||proof.errors.length);continue;}
    assert.equal(proof.status,'valido');assert.deepEqual(errors,[]);assert.equal(proof.exit.code,0);valid++;
    const resultFile=path.join(OUT,'resultados',t.key+'.json');assert.equal(sha(resultFile),proof.result_sha256);const {run,...unchanged}=read(resultFile);
    assert.deepEqual(unchanged,raw);assert.deepEqual(run,attribution(m,t.p,t.r));
  }
  return {planeadas:45,intentadas:finished,validas:valid,invalidas:invalid,errores_tecnicos:technical,pendientes:45-finished,sesiones_unicas:sessions.size,originales_y_trazas_comprobados:true,juicios_sin_modificar:true,referencia_experta:false};
}
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]).sort();}
const derived=new Set(['INFORME.md','resumen.json','evaluaciones.csv','VERIFICACION.json','SELLO-SHA256.tsv']);
function primaryFiles(dir){return files(dir).filter(f=>!derived.has(path.basename(f))&&!f.endsWith('.log')&&path.basename(f)!=='.DS_Store');}
function verifySeal(dir){
  const lines=text(path.join(dir,'SELLO-SHA256.tsv')).trim().split('\n'),sealed=[];
  for(const line of lines){
    const [h,f]=line.split('\t');assert.ok(f&&!path.isAbsolute(f)&&!f.split('/').includes('..'));
    assert.ok(!sealed.includes(f),'Ruta duplicada en el sello: '+f);sealed.push(f);
    assert.equal(sha(path.join(dir,f)),h,f+': hash distinto');
  }
  assert.deepEqual(sealed.slice().sort(),primaryFiles(dir).map(f=>path.relative(dir,f)).sort(),'El sello omite archivos primarios o incluye derivados');
  return lines.length;
}
function main(){
  const v=verify(),partial=process.argv.includes('--partial');
  if(!partial)assert.equal(v.pendientes,0,'Aún hay posiciones pendientes');
  const seal=path.join(OUT,'SELLO-SHA256.tsv');
  if(process.argv.includes('--seal')){
    assert.equal(v.pendientes,0);assert.equal(v.errores_tecnicos,0);assert.ok(!fs.existsSync(seal),'No se sobrescribe un sello');
    const primary=primaryFiles(OUT);
    fs.writeFileSync(seal,primary.map(f=>sha(f)+'\t'+path.relative(OUT,f)).join('\n')+'\n');
  }
  if(process.argv.includes('--verify-seal')){
    v.archivos_sellados=verifySeal(OUT);
  }else fs.writeFileSync(path.join(OUT,'VERIFICACION.json'),JSON.stringify(v,null,2)+'\n');
  console.log(JSON.stringify(v));
}
if(require.main===module)main();
module.exports={verify,verifySeal,primaryFiles};
