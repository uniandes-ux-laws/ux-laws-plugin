#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('node:assert/strict');
const {execFileSync}=require('child_process');
const {promptFor,validationProblems,anchorAudit}=require('./pilot-g2-g7-contract');
const {medirCaptura,VERSION}=require('../measure/measure-page');
const ROOT=path.resolve(__dirname,'..'),dir=path.resolve(ROOT,process.argv[2]||'pilotos/g2-2026-10-18');
const read=f=>fs.readFileSync(f,'utf8'),json=f=>JSON.parse(read(f)),hash=b=>crypto.createHash('sha256').update(b).digest('hex'),sha=f=>hash(fs.readFileSync(f));
const verifySeal=process.argv.includes('--verify-seal');
if(verifySeal){const lines=read(path.join(dir,'SELLO-SHA256.tsv')).trim().split('\n');for(const line of lines){const [h,f]=line.split('\t');assert.ok(f&&!path.isAbsolute(f)&&!f.split('/').includes('..'));assert.equal(sha(path.join(dir,f)),h,f+': sello roto');}console.log('Sello verificado: '+lines.length+' archivos.');}
const m=json(path.join(dir,'manifiesto.json')),rubric=read(path.join(dir,'RUBRICA.md')),scale=read(path.join(dir,'ESCALA.md'));
assert.ok(['g2','g7'].includes(m.group_id));assert.equal(m.pages.length,24);assert.equal(m.repetitions,5);assert.equal(m.planned_evaluations,120);
for(const [name,h] of [['RUBRICA.md',m.rubric_sha256],['ESCALA.md',m.scale_sha256],['BASE-INSTRUCCIONES.md',m.base_instructions_sha256],['response.schema.json',m.response_schema_sha256]])assert.equal(sha(path.join(dir,name)),h,name);
assert.equal(hash(execFileSync('git',['show',m.git_commit+':scripts/pilot-g2-g7-real.js'],{cwd:ROOT})),m.runner_sha256);
for(const [file,h] of Object.entries(m.support_files_sha256)){assert.equal(hash(execFileSync('git',['show',m.git_commit+':scripts/'+file],{cwd:ROOT})),h,file+': versión registrada');assert.equal(sha(path.join(__dirname,file)),h,file+': usar código histórico para verificar');}
assert.equal(sha(path.join(ROOT,'shared/schemas/group-result.schema.json')),m.project_schema_sha256);
assert.equal(VERSION,m.measurements_version,'Usar la medición registrada para verificar');
for(const file of execFileSync('git',['ls-tree','-r','--name-only',m.git_commit,'measure'],{cwd:ROOT,encoding:'utf8'}).trim().split('\n').filter(f=>f.endsWith('.js')&&!f.endsWith('.test.js'))){assert.equal(sha(path.join(ROOT,file)),hash(execFileSync('git',['show',m.git_commit+':'+file],{cwd:ROOT})),file+': código de medición cambiado');}
const sessions=new Set(),proofs=[];let pending=0,anchorIssues=0;
for(const p of m.pages){
  const inputFile=path.join(dir,'entradas',p.id+'.json'),input=json(inputFile),prompt=read(path.join(dir,'prompts',p.id+'.md')),capture=path.join(ROOT,p.captura);
  assert.equal(sha(inputFile),p.input_sha256);assert.equal(hash(prompt),p.prompt_hash);assert.equal(prompt,promptFor(input,rubric,scale));
  assert.equal(input.group_id,m.group_id);assert.equal(input.measurements_version,m.measurements_version);
  assert.equal(sha(path.join(capture,'nodes.json')),p.nodes_sha256);
  for(const channel of ['wireframe','screenshot'])assert.equal(sha(path.join(capture,channel+'.png')),p.capture_sha256[channel]);
  // measurements.json es un derivado ignorado por Git. Una copia nueva del repo
  // debe poder verificar las entradas partiendo solo de las capturas versionadas.
  const measured=medirCaptura(capture);
  assert.deepEqual(input[m.group_id],measured[m.group_id]);assert.deepEqual(input.inventario_accionables,measured.inventario_accionables);
  const ids=new Set(json(path.join(capture,'nodes.json')).map(n=>n.id));
  for(let r=1;r<=5;r++){
    const key=p.id+'-r'+r,pf=path.join(dir,'trazas',key+'.json');if(!fs.existsSync(pf)){pending++;continue;}
    const proof=json(pf);proofs.push(proof);assert.equal(proof.id,key);assert.equal(proof.prompt_hash,p.prompt_hash);assert.equal(proof.response_schema_sha256,m.response_schema_sha256);
    const traceFile=path.join(dir,'trazas',key+'.jsonl');assert.equal(sha(traceFile),proof.trace_sha256);
    const events=read(traceFile).trim().split('\n').filter(Boolean).map(JSON.parse);
    if(proof.thread_id){assert.ok(!sessions.has(proof.thread_id),key+': sesión repetida');sessions.add(proof.thread_id);assert.equal(events.find(e=>e.type==='thread.started').thread_id,proof.thread_id);}
    const rawFile=path.join(dir,'respuestas',key+'.json');if(proof.raw_sha256)assert.equal(sha(rawFile),proof.raw_sha256);
    if(!['valido','abstencion'].includes(proof.status)){
      if(proof.status==='invalido'){
        assert.ok(proof.errors.length,key+': inválido sin motivo');
        const message=events.filter(e=>e.type==='item.completed'&&e.item?.type==='agent_message').at(-1);
        if(proof.raw_sha256&&message){
          try{assert.deepEqual(JSON.parse(message.item.text),json(rawFile));}
          catch(error){if(error instanceof SyntaxError)assert.equal(message.item.text.trim(),read(rawFile).trim());else throw error;}
        }
      }
      continue;
    }
    assert.equal(proof.exit.code,0);assert.ok(proof.thread_id&&proof.usage);
    const raw=json(rawFile),{run,...original}=json(path.join(dir,'resultados',key+'.json'));
    assert.equal(sha(path.join(dir,'resultados',key+'.json')),proof.result_sha256);assert.deepEqual(raw,original);
    assert.deepEqual(run,{model_id:m.model_id,runtime:m.runtime,repetition:r,prompt_hash:p.prompt_hash,captured_at:p.captured_at,decoding:m.decoding,capture_sha256:p.capture_sha256,measurements_version:p.measurements_version,protocol_version:m.protocol_version});
    assert.deepEqual(validationProblems(raw,input,run,ids),[]);assert.equal(proof.status==='abstencion',!raw.not_applicable&&raw.score===null);
    const items=events.filter(e=>e.type==='item.completed');assert.ok(items.every(e=>['agent_message','reasoning'].includes(e.item.type)),key+': usó herramientas');
    assert.deepEqual(JSON.parse(items.filter(e=>e.item.type==='agent_message').at(-1).item.text),raw);
    assert.deepEqual(events.find(e=>e.type==='turn.completed').usage,proof.usage);assert.deepEqual(proof.anchor_audit,anchorAudit(raw));
    if(proof.anchor_audit.issues.length)anchorIssues++;
  }
}
const result={verified_at:new Date().toISOString(),phase:path.basename(dir),group:m.group_id,planned:120,finished:proofs.length,valid:proofs.filter(p=>p.status==='valido').length,abstentions:proofs.filter(p=>p.status==='abstencion').length,invalid:proofs.filter(p=>p.status==='invalido').length,technical:proofs.filter(p=>p.status==='error_tecnico').length,pending,unique_sessions:sessions.size,anchor_issues_preserved:anchorIssues,hashes_and_attribution_verified:true,model_judgments_unmodified:true,expert_validity_verified:false};
if(!verifySeal)fs.writeFileSync(path.join(dir,'VERIFICACION.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
if(!process.argv.includes('--partial'))assert.equal(pending,0,'Faltan solicitudes');
if(process.argv.includes('--seal')){
  assert.equal(pending,0);assert.equal(result.technical,0,'Conservar y resolver los fallos técnicos antes de sellar');
  const derived=new Set(['resumen.json','resumen.csv','auditoria.json','INFORME.md','evaluaciones.csv','VERIFICACION.json','SELLO-SHA256.tsv']),files=[];
  function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())walk(f);else if(!derived.has(e.name)&&!e.name.endsWith('.log')&&e.name!=='.DS_Store')files.push(f);}}
  walk(dir);files.sort();fs.writeFileSync(path.join(dir,'SELLO-SHA256.tsv'),files.map(f=>sha(f)+'\t'+path.relative(dir,f)).join('\n')+'\n');console.log('Sellados '+files.length+' archivos.');
}
