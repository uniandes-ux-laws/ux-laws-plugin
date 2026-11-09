#!/usr/bin/env node
'use strict';
// Reabre solo solicitudes técnicas sin juicio; preserva íntegro cada intento fallido.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('node:assert/strict');
const sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
function archiveTechnical(dir){
 const moved=[];
 for(const name of fs.readdirSync(path.join(dir,'trazas')).filter(n=>n.endsWith('.json')).sort()){
  const proofFile=path.join(dir,'trazas',name),proof=JSON.parse(fs.readFileSync(proofFile));
  if(proof.status!=='error_tecnico')continue;
  const key=name.slice(0,-5);assert.match(key,/^[A-Za-z0-9]+-r[1-5]$/);
  assert.equal(proof.id,key);assert.notEqual(proof.exit.code,0);assert.equal(proof.usage,null);
  const trace=path.join(dir,'trazas',key+'.jsonl');assert.equal(sha(trace),proof.trace_sha256);
  const events=fs.readFileSync(trace,'utf8').trim().split('\n').map(JSON.parse);
  assert.ok(!events.some(e=>e.type==='turn.completed'||(e.type==='item.completed'&&e.item?.type==='agent_message')),'No se repite una solicitud con juicio emitido');
  assert.ok(!fs.existsSync(path.join(dir,'respuestas',name))&&!fs.existsSync(path.join(dir,'resultados',name)),'Respuesta presente: revisar sin reintentar');
  let index=1;while(fs.existsSync(path.join(dir,'intentos',key+'-intento'+index)))index++;
  const dst=path.join(dir,'intentos',key+'-intento'+index);fs.mkdirSync(dst,{recursive:true});
  const files=[proofFile,trace,path.join(dir,'trazas',key+'.stderr.log')].filter(f=>fs.existsSync(f));
  const hashes=files.map(f=>({file:path.basename(f),sha256:sha(f)}));
  for(const f of files)fs.renameSync(f,path.join(dst,path.basename(f)));
  moved.push({id:key,archivo:path.relative(dir,dst),hashes,thread_id:proof.thread_id,motivo:proof.errors,sin_juicio_emitido:true});
 }
 if(moved.length){let i=1;while(fs.existsSync(path.join(dir,'REANUDACION-'+i+'.json')))i++;
  fs.writeFileSync(path.join(dir,'REANUDACION-'+i+'.json'),JSON.stringify({fechada_en:new Date().toISOString(),configuracion_y_entradas_sin_cambios:true,intentos_preservados:moved},null,2)+'\n');
 }
 return moved;
}
if(require.main===module){const dir=path.resolve(__dirname,'..',process.argv[2]||'pilotos/g4-2026-10-07-v3');console.log(JSON.stringify(archiveTechnical(dir)));}
module.exports={archiveTechnical};
