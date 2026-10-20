#!/usr/bin/env node
'use strict';
// Solo derivados y verificación; no pide respuestas ni corrige juicios.
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),crypto=require('crypto'),{execFileSync}=require('node:child_process');
const api=require('./pilot-g3-g6-real'),contract=require('./g3-g6-contract'),{primaryFiles,verifySeal}=require('./verify-g5-progress');
const REGISTRATION_COMMIT='0dfbdd9462c9580513c79f8e63c54b2e58169463';
const read=f=>JSON.parse(fs.readFileSync(f,'utf8')),text=f=>fs.readFileSync(f,'utf8'),hash=x=>crypto.createHash('sha256').update(x).digest('hex'),sha=f=>hash(fs.readFileSync(f));
const write=(f,o)=>fs.writeFileSync(f,JSON.stringify(o,null,2)+'\n');
function derivedAudit(raw,input){
 if(input.group_id!=='g3')return contract.anchorAudit(raw,input);
 const m=raw.measurements,by=new Map(input.g3.g3_nodos.map(n=>[n.id,n.caja])),region=by.get(m.region_id);
 const clip=id=>{const b=by.get(id);if(!b||!region)return null;const x=Math.max(b.x,region.x),y=Math.max(b.y,region.y),r=Math.min(b.x+b.w,region.x+region.w),d=Math.min(b.y+b.h,region.y+region.h);return r>x&&d>y?{x,y,w:r-x,h:d-y}:null;};
 const dentro=m.X_ids.filter(id=>clip(id)),fuera=m.X_ids.filter(id=>!clip(id)),areaX=contract.unionArea(dentro.map(clip)),areaTask=contract.unionArea(m.unidades_ids.filter(id=>!m.X_ids.includes(id)).map(clip));
 const areaMayor=region?areaX>areaTask:null;
 let expected={score:null,triggers:[],motivo:'combinación sin ancla o juicio indeterminado'};
 if(m.region_id!==null&&m.U!==null&&m.U>=2){
  if(m.V===true)expected={score:0,triggers:['V']};
  else if(m.X_area_mayor===true&&dentro.length)expected={score:0,triggers:['X','carga_extrinseca_estructural']};
  else if(m.U>12&&m.segmentacion==='ausente')expected={score:0,triggers:['U','segmentacion','carga_extrinseca_estructural']};
  else if(m.V===false&&m.X!==null&&!(dentro.length&&m.X_area_mayor===null)){
   if(m.H!==null&&m.H>=1)expected={score:1,triggers:['H']};
   else if(dentro.length&&m.X_compite===true)expected={score:1,triggers:['X','carga_extrinseca_estructural']};
   else if(m.U>=9&&m.U<=12&&m.segmentacion==='debil')expected={score:1,triggers:['U','segmentacion','carga_extrinseca_estructural']};
   else if(m.H!==null&&m.U>=6&&m.U<=8&&m.segmentacion==='encabezada'&&m.H===0&&m.V===false&&!dentro.length&&fuera.length)expected={score:2,triggers:['segmentacion','U','X','carga_extrinseca_estructural']};
   else if(m.H!==null&&m.U<=5&&m.segmentacion==='encabezada'&&m.B!==null&&m.B<=5&&m.H===0&&m.V===false&&!dentro.length&&m.difiere_contenido!==null)expected={score:m.difiere_contenido?4:3,triggers:m.difiere_contenido?['segmentacion']:['ninguna']};
  }
 }
 const issues=[];if(!raw.not_applicable){if(raw.score!==expected.score)issues.push(raw.score===null&&m.inventario_completo===false?'abstención prudente aunque los juicios parciales cubran un ancla':'nivel distinto de las anclas para sus propios juicios');if(raw.score!==null&&!expected.triggers.includes(raw.trigger))issues.push('trigger no corresponde a la condición que sostiene el nivel');if(m.ancla_definida!==(expected.score!==null))issues.push('declaración de cobertura de ancla incompatible');if(m.X_area_mayor!==null&&m.X_area_mayor!==areaMayor)issues.push('comparación de áreas distinta de la unión de cajas suministradas');}
 return {version:'auditoria-geometrica-1.0.2',expected_score:raw.not_applicable?null:expected.score,expected_triggers:raw.not_applicable?[]:expected.triggers,issues,X_dentro_ids:dentro,X_fuera_ids:fuera,area_X:areaX,area_tarea:areaTask,nota:'Revisión posterior: interior por intersección con la región, no por parentesco DOM. Se conserva la auditoría original en la traza.'};
}
function verify(g,partial=false){
 const out=api.outDir(g),m=api.checkFiles(g),tasks=api.allTasks().filter(t=>t.g===g),sessions=new Set();let finished=0,valid=0,abst=0,invalid=0,technical=0,auditIssues=0;
 assert.notEqual(REGISTRATION_COMMIT,'PENDIENTE','Falta registrar el commit anterior a las respuestas');
 assert.equal(sha(path.join(out,'manifiesto.json')),hash(execFileSync('git',['show',REGISTRATION_COMMIT+':'+path.relative(api.ROOT,path.join(out,'manifiesto.json'))],{cwd:api.ROOT})));
 assert.equal(m.runner_sha256,hash(execFileSync('git',['show',m.git_commit+':scripts/pilot-g3-g6-real.js'],{cwd:api.ROOT})));
 const registered=Number(execFileSync('git',['show','-s','--format=%ct',REGISTRATION_COMMIT],{cwd:api.ROOT,encoding:'utf8'}).trim())*1000;
 for(const p of m.pages)assert.equal(text(path.join(out,'prompts',p.id+'.md')),contract.promptFor(read(path.join(out,'entradas',p.id+'.json')),text(path.join(out,'RUBRICA.md')),text(path.join(out,'ESCALA.md'))));
 const planned=new Set(tasks.map(t=>t.key));for(const d of ['trazas','respuestas','resultados'])for(const f of fs.readdirSync(path.join(out,d))){if(f.endsWith('.log')||f==='.DS_Store')continue;assert.ok(/\.(jsonl|json)$/.test(f)&&planned.has(f.replace(/\.(jsonl|json)$/, '')),'Archivo fuera del plan: '+f);}
 for(const t of tasks){
  const file=path.join(out,'trazas',t.key+'.json'),rawFile=path.join(out,'respuestas',t.key+'.json');
  if(!fs.existsSync(file)){for(const [d,e] of [['trazas','.jsonl'],['respuestas','.json']])assert.ok(!fs.existsSync(path.join(out,d,t.key+e)),'Intento sin cerrar: '+g+'/'+t.key);continue;}
  finished++;const proof=read(file),trace=path.join(out,'trazas',t.key+'.jsonl'),events=text(trace).trim().split('\n').filter(Boolean).map(line=>{try{return JSON.parse(line);}catch{return {type:'unparseable',line};}});
  assert.equal(sha(trace),proof.trace_sha256);assert.equal(proof.id,t.key);assert.equal(proof.group_id,g);assert.equal(proof.prompt_hash,t.p.prompt_hash);assert.equal(proof.cli_version,m.cli_version);assert.equal(proof.response_schema_sha256,m.fixed_files_sha256['response.schema.json']);assert.ok(Date.parse(proof.started_at)>=Math.max(registered,Date.parse(m.registered_at)));
  const cd=proof.command[proof.command.indexOf('--cd')+1];assert.deepEqual(proof.command,api.command(t,cd));
  assert.equal(events.find(e=>e.type==='thread.started')?.thread_id??null,proof.thread_id);if(proof.thread_id){assert.ok(!sessions.has(proof.thread_id),'Conversación repetida');sessions.add(proof.thread_id);}
  assert.ok(events.filter(e=>['item.started','item.completed'].includes(e.type)).every(e=>['agent_message','reasoning'].includes(e.item?.type)),'Herramienta no permitida');
  if(proof.raw_sha256)assert.equal(sha(rawFile),proof.raw_sha256);
  if(proof.status==='error_tecnico'){technical++;continue;}
  assert.equal(proof.exit.code,0);assert.deepEqual(events.find(e=>e.type==='turn.completed').usage,proof.usage);
  const message=events.filter(e=>e.type==='item.completed'&&e.item?.type==='agent_message').at(-1);assert.ok(message);
  if(proof.status==='invalido'){invalid++;assert.ok(proof.errors.length);assert.ok(!fs.existsSync(path.join(out,'resultados',t.key+'.json')));if(fs.existsSync(rawFile)){let parsed;try{parsed=read(rawFile);}catch{}if(parsed)assert.deepEqual(JSON.parse(message.item.text),parsed);else assert.equal(message.item.text.trim(),text(rawFile).trim());}continue;}
  assert.ok(['valido','abstencion'].includes(proof.status));const raw=read(rawFile),run=api.attribution(m,t.p,t.r),input=read(path.join(out,'entradas',t.p.id+'.json'));assert.deepEqual(JSON.parse(message.item.text),raw);assert.deepEqual(contract.validationProblems(raw,input,run),[]);assert.equal(proof.status==='abstencion',!raw.not_applicable&&raw.score===null);
  if(proof.status==='abstencion')abst++;else valid++;assert.deepEqual(proof.anchor_audit,contract.anchorAudit(raw,input));if(derivedAudit(raw,input).issues.length)auditIssues++;
  const result=path.join(out,'resultados',t.key+'.json');assert.equal(sha(result),proof.result_sha256);const {run:attribution,...unchanged}=read(result);assert.deepEqual(unchanged,raw);assert.deepEqual(attribution,run);
 }
 if(!partial)assert.equal(finished,120,'Quedan posiciones pendientes');
 return {group_id:g,planeadas:120,intentadas:finished,validas:valid,abstenciones:abst,invalidas:invalid,errores_tecnicos:technical,pendientes:120-finished,respuestas_con_observaciones_de_ancla:auditIssues,sesiones_distintas:sessions.size,originales_trazas_y_atribuciones_comprobados:true,juicios_sin_modificar:true,validacion_experta:false};
}
function analyze(g){
 const out=api.outDir(g),m=api.checkFiles(g),rows=api.allTasks().filter(t=>t.g===g).map(t=>{
  const row={id:t.key,pagina:t.p.id,repeticion:t.r,estado:'pendiente',score:null,not_applicable:null,trigger:null},f=path.join(out,'trazas',t.key+'.json');if(!fs.existsSync(f))return row;
  const proof=read(f);Object.assign(row,{estado:proof.status,errores:proof.errors,thread_id:proof.thread_id,usage:proof.usage,anchor_audit:proof.anchor_audit??null});
  if(['valido','abstencion'].includes(proof.status)){const rawFile=path.join(out,'respuestas',t.key+'.json');assert.equal(sha(rawFile),proof.raw_sha256);const raw=read(rawFile);Object.assign(row,{score:raw.score,not_applicable:raw.not_applicable,trigger:raw.trigger,evidence_insufficient:raw.evidence_insufficient,measurements:raw.measurements,anchor_audit_original:proof.anchor_audit,anchor_audit:derivedAudit(raw,read(path.join(out,'entradas',t.p.id+'.json')))});}return row;
 });
 const pages=m.pages.map(p=>{
  const all=rows.filter(r=>r.pagina===p.id),valid=all.filter(r=>['valido','abstencion'].includes(r.estado)),scores=valid.filter(r=>r.score!==null),counts=new Map();for(const r of scores)counts.set(r.score,(counts.get(r.score)||0)+1);const max=Math.max(0,...counts.values());
  const selections=valid.map(r=>g==='g3'?r.measurements.region_id:r.measurements.convenciones.filter(k=>k.aplica===true).map(k=>k.id).join(','));
  return {id:p.id,salidas:all.map(r=>r.estado==='abstencion'?'ABSTENCIÓN':r.estado==='valido'?(r.not_applicable?'NA':r.score):r.estado),modas:[...counts].filter(([,n])=>n===max).map(([v])=>v),rango_ordinal:scores.length?Math.max(...scores.map(r=>r.score))-Math.min(...scores.map(r=>r.score)):null,nivel_estable:scores.length===5?new Set(scores.map(r=>r.score)).size===1:null,trigger_estable:scores.length===5?new Set(scores.map(r=>r.trigger)).size===1:null,selecciones_distintas:new Set(selections.filter(v=>v!==null)).size,sin_seleccion:selections.filter(v=>v===null).length,abstenciones:valid.filter(r=>r.estado==='abstencion').length,evidencia_insuficiente:valid.filter(r=>r.evidence_insufficient).length,observaciones_ancla:all.filter(r=>r.anchor_audit?.issues.length).length};
 });
 const statuses=Object.fromEntries(['valido','abstencion','invalido','error_tecnico','pendiente'].map(s=>[s,rows.filter(r=>r.estado===s).length]));
 return {group_id:g,registro:'2026-10-20',planeadas:120,intentadas:120-statuses.pendiente,pendientes:statuses.pendiente,estados:statuses,puntajes:rows.filter(r=>r.score!==null).length,NA:rows.filter(r=>r.not_applicable===true).length,niveles:[0,1,2,3,4].map(n=>rows.filter(r=>r.score===n).length),evidencia_insuficiente:rows.filter(r=>r.evidence_insufficient).length,observaciones_ancla:rows.filter(r=>r.anchor_audit?.issues.length).length,paginas:pages,evaluaciones:rows,uso_tokens:Object.fromEntries(['input_tokens','cached_input_tokens','output_tokens','reasoning_output_tokens'].map(k=>[k,rows.reduce((s,r)=>s+(r.usage?.[k]||0),0)]))};
}
function render(s){
 const full=s.paginas.filter(p=>p.nivel_estable!==null),names={g3:'Capacidad y segmentación',g6:'Economía y convención'};
 return `# ${s.group_id.toUpperCase()}: ${names[s.group_id]}

Registro del 20 de octubre de 2026. **${s.pendientes?'Piloto en curso':'Ejecución terminada'}: ${s.intentadas}/120 posiciones; ${s.pendientes} pendientes.**

Se usan las 24 páginas de calibración, con cinco conversaciones nuevas por página. Se conservan las capturas archivadas y sus límites. Modelo gpt-6.1-sol, esfuerzo low, CLI 0.162.0-alpha.17.2 y evidencia de medición 1.1.0 sobre la fuente 1.0.6. La primera imagen es el wireframe; el screenshot se usa para los criterios que requieren leer. Esta no es una comparación limpia entre canales.

## Resultados

- Puntajes: **${s.puntajes}**; no aplicables: **${s.NA}**; abstenciones: **${s.estados.abstencion}**.
- Respuestas inválidas: **${s.estados.invalido}**; fallos técnicos: **${s.estados.error_tecnico}**.
- Niveles 0, 1, 2, 3 y 4: **${s.niveles.join(', ')}**.
- Marcas de evidencia insuficiente: **${s.evidencia_insuficiente}**, incluidas las abstenciones.
- Respuestas con observaciones al aplicar sus propias anclas: **${s.observaciones_ancla}**.

Una abstención conserva incertidumbre o una combinación que la rúbrica no cubre. No es cero ni «no aplica». Una respuesta que cumple formato puede aplicar mal un ancla o interpretar mal la imagen: eso se registra sin arreglarla ni repetirla.

| Página | Cinco respuestas | Evidencia insuficiente | Observaciones de ancla |
|---|---|---:|---:|
${s.paginas.map(p=>`| ${p.id} | ${p.salidas.join(' / ')} | ${p.evidencia_insuficiente} | ${p.observaciones_ancla} |`).join('\n')}

Hay ${full.length} páginas con cinco puntajes numéricos; ${full.filter(p=>p.nivel_estable).length} mantuvieron nivel y ${full.filter(p=>p.trigger_estable).length} mantuvieron regla. Los casos mixtos y los no aplicables se conservan aparte; no se declaran estables por una sola respuesta numérica. Los niveles no se promedian. Modas, empates, rangos y cambios de región o aplicabilidad aparecen en [resumen.json](resumen.json).

## Qué se revisó antes de evaluar

La [revisión de mediciones](../../docs/REVISION-MEDICIONES-G3-G6-20OCT.md) registra los problemas encontrados y las correcciones. La evidencia nueva conserva las listas completas, las cajas visibles y los datos originales; no certifica equivalencia, función, ausencia de oclusión ni una tarea del negocio. Se mantienen las combinaciones sin ancla.

Las [observaciones posteriores](../../docs/OBSERVACIONES-G3-G6-20OCT.md) separan los problemas detectados al ejecutar. En G3 la auditoría geométrica derivada clasifica X por intersección con la región; conserva aparte la auditoría original que usaba parentesco. Esa corrección no cambia prompts, datos, niveles ni trazas.

${s.group_id==='g3'?'G3 exige justificar la región y las unidades. U, B, H y X se respaldan con ids; los envoltorios transparentes no se cuentan automáticamente. Los juicios semánticos usan screenshot y no equivalen a medir memoria o carga cognitiva humana.':'G6 mantiene el catálogo cerrado v1 del 10 de septiembre. Una lista vacía no demuestra una convención rota; aplicabilidad desconocida no es no aplicabilidad. Sus principios son heurísticas de práctica, no leyes experimentales. Los candidatos vacíos y los separadores no son redundancias confirmadas.'}

## Archivos y pendientes

[Registro previo](REGISTRO-PREVIO.md), [rúbrica](RUBRICA.md), [CSV](evaluaciones.csv), [resumen](resumen.json), originales en respuestas/, copias con atribución en resultados/ y registros de cada conversación en trazas/. La verificación y el sello se guardan al terminar. Los resultados anteriores no se sobrescriben.

${s.pendientes?'Falta completar las posiciones pendientes.':'La ejecución terminó.'} **La validación experta, el consenso y la revisión con Camilo siguen pendientes.** El panel humano depende de aprobación ética. No se presentan las salidas del modelo como referencia humana.
`;
}
function report(g){const out=api.outDir(g),s=analyze(g);write(path.join(out,'resumen.json'),s);fs.writeFileSync(path.join(out,'INFORME.md'),render(s));const keys=['id','pagina','repeticion','estado','errores','score','not_applicable','trigger','evidence_insufficient','region_id','U','B','H','V','X','blocks','R','T','K_ap','K','K_broken','R_distribucion','catalog_version','anchor_audit'];const cell=v=>'"'+(v==null?'':typeof v==='object'?JSON.stringify(v):String(v)).replace(/"/g,'""')+'"';fs.writeFileSync(path.join(out,'evaluaciones.csv'),keys.join(',')+'\n'+s.evaluaciones.map(r=>keys.map(k=>cell(Object.hasOwn(r,k)?r[k]:r.measurements?.[k])).join(',')).join('\n')+'\n');return {group_id:g,intentadas:s.intentadas,pendientes:s.pendientes,estados:s.estados,observaciones_ancla:s.observaciones_ancla};}
function main(){
 const mode=process.argv[2],only=process.argv[3],groups=Object.keys(api.GROUPS).filter(g=>!only||only.startsWith('--')||only===g);assert.ok(groups.length,'Grupo inválido');
 if(mode==='analizar'){console.log(JSON.stringify(groups.map(report)));return;}
 assert.ok(['verificar','sellar'].includes(mode),'Uso: analizar|verificar [g3|g6] [--partial|--verify-seal]|sellar [g3|g6]');const results=[];
 for(const g of groups){const out=api.outDir(g),v=verify(g,process.argv.includes('--partial'));if(mode==='sellar'){assert.equal(v.pendientes,0);assert.equal(v.errores_tecnicos,0);assert.ok(!fs.existsSync(path.join(out,'SELLO-SHA256.tsv')),'Sello existente; se conserva');fs.writeFileSync(path.join(out,'SELLO-SHA256.tsv'),primaryFiles(out).map(f=>sha(f)+'\t'+path.relative(out,f)).join('\n')+'\n');}if(process.argv.includes('--verify-seal'))v.archivos_sellados=verifySeal(out);write(path.join(out,'VERIFICACION.json'),v);results.push(v);}
 if(groups.length===2){const sessions=api.allTasks().map(t=>path.join(api.outDir(t.g),'trazas',t.key+'.json')).filter(fs.existsSync).map(f=>read(f).thread_id).filter(Boolean);assert.equal(new Set(sessions).size,sessions.length,'Conversación compartida entre G3 y G6');}
 console.log(JSON.stringify(results));
}
if(require.main===module)main();module.exports={verify,analyze,report,derivedAudit};
