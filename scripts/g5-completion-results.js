#!/usr/bin/env node
'use strict';
// Verifica y describe; no llama al modelo y nunca corrige sus respuestas.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {experiment}=require('./pilot-g5-completion');
const {promptFor,validationProblems}=require('./pilot-g5-real');
const {promptV2,validateV2}=require('./g5-evaluator-contract');
const {compare}=require('./report-g5-progress');
const {primaryFiles,verifySeal}=require('./verify-g5-progress');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8')),text=f=>fs.readFileSync(f,'utf8');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex'),sha=f=>hash(fs.readFileSync(f));
const write=(f,o)=>fs.writeFileSync(f,JSON.stringify(o,null,2)+'\n');
function comparison(raw,expected,series,id){
 const value=compare(raw,expected,series==='neutral'&&id==='P10');
 if(series==='cobertura')for(const k of ['trigger','J_inicio','J_final','final_compite_con_inicio']){
  const actual=k==='trigger'?raw[k]:raw.measurements[k];if(actual!==expected[k])value.diferencias_criterios.push({campo:k,esperado:expected[k],recibido:actual});
 }
 return value;
}
function verify(series,{partial=false}={}){
 const api=experiment(series),{OUT,ROOT,def}=api,m=api.checkFiles(),sessions=new Set();
 const manifestPath=path.relative(ROOT,path.join(OUT,'manifiesto.json'));
 assert.equal(sha(path.join(OUT,'manifiesto.json')),hash(execFileSync('git',['show','782dd665cc3a5763093d5cf370324663b9726b9f:'+manifestPath],{cwd:ROOT})),'El manifiesto cambió después del registro');
 assert.equal(m.runner_sha256,hash(execFileSync('git',['show',m.git_commit+':scripts/pilot-g5-completion.js'],{cwd:ROOT})));
 if(series==='neutral'){
  const before=read(path.join(api.SOURCE,'manifiesto.json'));
  for(const k of ['model_id','runtime','cli_version','decoding','protocol_version','measurements_version','developer_instructions_sha256'])assert.deepEqual(m[k],before[k]);
  for(const f of ['RUBRICA.md','ESCALA.md','response.schema.json','BASE-INSTRUCCIONES.md'])assert.equal(sha(path.join(OUT,f)),sha(path.join(api.SOURCE,f)),f+': no es una comparación aislada de clases');
 }
 for(const page of m.pages){
  const input=read(path.join(OUT,'entradas',page.id+'.json'));assert.ok(input.g5.g5_indicador_paso_candidatos.every(c=>!Object.hasOwn(c,'class')));
  assert.equal(text(path.join(OUT,'prompts',page.id+'.md')),(def.version==='legacy'?promptFor:promptV2)(input,text(path.join(OUT,'RUBRICA.md')),text(path.join(OUT,'ESCALA.md'))));
 }
 const planned=new Set(api.tasks(m).map(t=>t.key));
 for(const dir of ['respuestas','resultados','trazas'])for(const f of fs.readdirSync(path.join(OUT,dir))){
  if(f.endsWith('.log')||f==='.DS_Store')continue;
  assert.ok(planned.has(f.replace(/\.(jsonl|json)$/,''))&&/\.(jsonl|json)$/.test(f),dir+': archivo fuera del plan: '+f);
 }
 let finished=0,valid=0,invalid=0,technical=0;
 for(const t of api.tasks(m)){
  const proofFile=path.join(OUT,'trazas',t.key+'.json');
  if(!fs.existsSync(proofFile)){
   for(const [dir,ext] of [['trazas','.jsonl'],['respuestas','.json']])assert.ok(!fs.existsSync(path.join(OUT,dir,t.key+ext)),t.key+': intento sin cierre');continue;
  }
  finished++;const proof=read(proofFile),trace=path.join(OUT,'trazas',t.key+'.jsonl'),events=text(trace).trim().split('\n').filter(Boolean).map(JSON.parse);
  assert.equal(sha(trace),proof.trace_sha256);assert.equal(proof.prompt_hash,t.p.prompt_hash);assert.equal(proof.response_schema_sha256,m.fixed_files_sha256['response.schema.json']);assert.equal(proof.cli_version,m.cli_version);
  const cd=proof.command[proof.command.indexOf('--cd')+1];assert.deepEqual(proof.command,api.command(m,t.p,t.key,cd));assert.ok(Date.parse(proof.started_at)>=Date.parse(m.registrado_en));
  assert.equal(events.find(e=>e.type==='thread.started')?.thread_id??null,proof.thread_id);
  if(proof.thread_id){assert.ok(!sessions.has(proof.thread_id),t.key+': sesión reutilizada');sessions.add(proof.thread_id);}
  assert.ok(events.filter(e=>['item.started','item.completed'].includes(e.type)).every(e=>['agent_message','reasoning'].includes(e.item.type)),t.key+': herramienta ejecutada');
  const rawFile=path.join(OUT,'respuestas',t.key+'.json');if(proof.raw_sha256)assert.equal(sha(rawFile),proof.raw_sha256);
  if(proof.status==='error_tecnico'){technical++;continue;}
  assert.deepEqual(events.find(e=>e.type==='turn.completed').usage,proof.usage);
  const message=events.filter(e=>e.type==='item.completed'&&e.item.type==='agent_message').at(-1);assert.ok(message);
  if(proof.status==='invalido'){
   invalid++;assert.ok(proof.errors.length);assert.equal(proof.exit.code,0);
   assert.ok(!fs.existsSync(path.join(OUT,'resultados',t.key+'.json')),'Inválida publicada como resultado válido');
   if(fs.existsSync(rawFile)){
    let parsed=false;try{JSON.parse(text(rawFile));parsed=true;}catch{}
    if(parsed)assert.deepEqual(JSON.parse(message.item.text),read(rawFile));
    else assert.equal(message.item.text.trim(),text(rawFile).trim());
   }
   continue;
  }
  assert.equal(proof.status,'valido');valid++;const raw=read(rawFile);assert.deepEqual(JSON.parse(message.item.text),raw);
  const ids=new Set(read(path.join(ROOT,t.p.nodes_path)).map(n=>n.id)),run=api.attribution(m,t.p,t.r);
  assert.deepEqual((def.version==='legacy'?validationProblems:validateV2)(raw,read(path.join(OUT,'entradas',t.p.id+'.json')),run,ids),[]);
  const result=path.join(OUT,'resultados',t.key+'.json');assert.equal(sha(result),proof.result_sha256);const {run:attribution,...unchanged}=read(result);assert.deepEqual(unchanged,raw);assert.deepEqual(attribution,run);assert.equal(proof.exit.code,0);
 }
 if(!partial)assert.equal(finished,m.planned_evaluations,'Posiciones pendientes');
 return {serie:series,planeadas:m.planned_evaluations,intentadas:finished,validas:valid,invalidas:invalid,errores_tecnicos:technical,pendientes:m.planned_evaluations-finished,sesiones_unicas:sessions.size,originales_trazas_y_atribuciones_comprobados:true,juicios_sin_modificar:true,referencia_experta:false};
}
function analyze(series){
 const api=experiment(series),{OUT}=api,m=api.checkFiles(),expected=read(path.join(OUT,'EXPECTATIVAS-PREVIAS.json')).casos;
 const rows=api.tasks(m).map(t=>{
  const row={id:t.key,pagina:t.p.id,repeticion:t.r,estado:'pendiente',score:null,not_applicable:null,trigger:null,coincide_nivel:null,diferencias_criterios:[]},file=path.join(OUT,'trazas',t.key+'.json');
  if(!fs.existsSync(file))return row;const proof=read(file);Object.assign(row,{estado:proof.status,thread_id:proof.thread_id,usage:proof.usage,errores:proof.errors});
  if(proof.status!=='valido')return row;
  const rawFile=path.join(OUT,'respuestas',t.key+'.json');assert.equal(sha(rawFile),proof.raw_sha256);const raw=read(rawFile),target=expected.find(c=>c.id===t.p.id).esperado;
  Object.assign(row,{score:raw.score,not_applicable:raw.not_applicable,trigger:raw.trigger,evidence_insufficient:raw.evidence_insufficient,measurements:raw.measurements},comparison(raw,target,series,t.p.id));
  if(series==='neutral'){
   const old=read(path.join(api.SOURCE,'respuestas',t.key+'.json'));
   row.coincide_nivel_anterior=old.not_applicable===raw.not_applicable&&old.score===raw.score;
   row.trigger_anterior=old.trigger;row.insuficiencia_anterior=old.evidence_insufficient;
   row.diferencias_con_serie_anterior=['Q','G_existe','G_nombra','G_actual','G_forma','steps_declared','J_inicio','J_final','main_list_id'].filter(k=>old.measurements[k]!==raw.measurements[k]);
  }
  return row;
 });
 const pages=m.pages.map(p=>{
  const all=rows.filter(r=>r.pagina===p.id),valid=all.filter(r=>r.estado==='valido'),values=valid.map(r=>r.not_applicable?'NA':r.score),nums=valid.filter(r=>!r.not_applicable).map(r=>r.score);
  const counts=new Map();for(const v of values)counts.set(v,(counts.get(v)||0)+1);const max=Math.max(0,...counts.values());
  return {id:p.id,niveles:all.map(r=>r.estado==='valido'?(r.not_applicable?'NA':r.score):r.estado),triggers:all.map(r=>r.trigger),validas:valid.length,
   modas:[...counts].filter(([,n])=>n===max).map(([v])=>v),rango_ordinal:nums.length?Math.max(...nums)-Math.min(...nums):null,
   nivel_estable:valid.length===5?new Set(values).size===1:null,trigger_estable:valid.length===5?new Set(valid.map(r=>r.trigger)).size===1:null,
   coincidencias:series==='neutral'&&p.id==='P10'?null:all.filter(r=>r.coincide_nivel===true).length,con_limite:valid.filter(r=>r.evidence_insufficient).length};
 });
 const primary=rows.filter(r=>!(series==='neutral'&&r.pagina==='P10'));
 return {serie:series,tipo:'prueba sintetica; expectativas de diseño, no referencia experta',contrato:m.contrato,planeadas:m.planned_evaluations,
  intentadas:rows.filter(r=>r.estado!=='pendiente').length,validas:rows.filter(r=>r.estado==='valido').length,invalidas:rows.filter(r=>r.estado==='invalido').length,errores_tecnicos:rows.filter(r=>r.estado==='error_tecnico').length,pendientes:rows.filter(r=>r.estado==='pendiente').length,
  posiciones_con_nivel_esperado:primary.length,coincidencias_nivel:primary.filter(r=>r.coincide_nivel===true).length,
  con_diferencias_de_criterios:rows.filter(r=>r.diferencias_criterios.length).length,evidencia_insuficiente:rows.filter(r=>r.evidence_insufficient).length,
  niveles_por_evaluacion:[0,1,2,3,4].map(level=>rows.filter(r=>r.estado==='valido'&&!r.not_applicable&&r.score===level).length),
  no_aplicables:rows.filter(r=>r.estado==='valido'&&r.not_applicable).length,
  Q_verdadero:rows.filter(r=>r.estado==='valido'&&r.measurements.Q).length,
  uso_tokens:Object.fromEntries(['input_tokens','cached_input_tokens','output_tokens','reasoning_output_tokens'].map(k=>[k,rows.reduce((sum,r)=>sum+(r.usage?.[k]||0),0)])),
  paginas_estables:pages.filter(p=>p.nivel_estable===true).length,paginas_con_trigger_estable:pages.filter(p=>p.trigger_estable===true).length,
  coincidencias_nivel_anterior:series==='neutral'?rows.filter(r=>r.coincide_nivel_anterior===true).length:null,
  evaluaciones:rows,paginas:pages};
}
function render(s){
 const complete=s.pendientes===0;
 return `# G5: ${s.serie==='neutral'?'comprobación sin clases CSS':'cobertura del contrato 0.2.0'}\n\nRegistro fechado el 19 de octubre de 2026. **${complete?'Serie ejecutada':'Serie en curso'}: ${s.intentadas}/${s.planeadas} posiciones.** Hay ${s.validas} respuestas válidas, ${s.invalidas} inválidas y ${s.errores_tecnicos} errores técnicos. Quedan ${s.pendientes} pendientes.\n\n## Qué hicimos\n\n${s.serie==='neutral'?'Se reutilizaron las mismas imágenes, medidas, modelo, instrucciones, rúbrica y esquema de la serie anterior. Solo se retiraron las clases CSS de los candidatos a indicador. P06 continúa excluido de esta comparación histórica. P10 se revisa aparte, sin nivel esperado.':'Se aplicó el contrato nuevo después de registrar la decisión autorizada por Juan. E01 reutiliza P06: indicador con nombres, sin paso actual, ahora con nivel 1 definido antes de evaluarlo. Los pares E02/E03 y E04/E05 prueban la diferencia entre 3 y 4 en horizontal y vertical. El nivel 4 requiere final diferenciado y de menor peso que el inicio. Los HTML nuevos y los datos entregados no dan nombres de clases que describan su condición.'}\n\nAmbas series usan gpt-6.1-sol, esfuerzo medium, CLI 0.162.0-alpha.17.2 y medidas 1.0.6. Cada posición tiene una conversación nueva, sin herramientas ni respuestas anteriores. Las expectativas de diseño quedaron separadas del prompt antes de evaluar. El [registro previo](REGISTRO-PREVIO.md) y las [expectativas](EXPECTATIVAS-PREVIAS.json) se conservan completos.\n\n## Resultados\n\n| Caso | Cinco repeticiones | Coincidencia de nivel | Evidencia insuficiente |\n|---|---|---|---|\n${s.paginas.map(p=>`| ${p.id} | ${p.niveles.join(' / ')} | ${p.coincidencias===null?'No se compara':p.coincidencias+'/5'} | ${p.con_limite}/${p.validas} válidas |`).join('\n')}\n\nHay **${s.coincidencias_nivel}/${s.posiciones_con_nivel_esperado} coincidencias** con el nivel o NA esperado. Las posiciones inválidas o con error permanecen en el total planificado. ${s.paginas_estables}/${s.paginas.length} pantallas mantuvieron nivel o NA y ${s.paginas_con_trigger_estable}/${s.paginas.length} mantuvieron trigger entre las cinco respuestas válidas. Las modas, empates, rangos ordinales y triggers de cada repetición están en [resumen.json](resumen.json). No se promedian los niveles.\n\nSe marcaron ${s.evidencia_insuficiente} respuestas con evidencia insuficiente. Hay ${s.con_diferencias_de_criterios} respuestas con algún criterio distinto de lo previsto. Coincidir en nivel no equivale a coincidir en todos los juicios.\n\n${s.serie==='neutral'?`Comparadas por página y número de repetición con la serie anterior, ${s.coincidencias_nivel_anterior}/45 conservaron nivel o NA. Esto describe dos series de conversaciones nuevas; no significa que compartieran una semilla aleatoria ni demuestra causalidad. Las diferencias de campos, trigger y marca de insuficiencia se guardan por posición.\n\nP02 permite revisar la advertencia no prevista de la barra: retirar clases no añade un candidato que faltaba en las medidas. Su wireframe conserva el contorno y la división interior, aunque se pierda el tono; eso no permite afirmar que desapareció toda la geometría. P03 comprueba la distinción que solo dependía del color. P10 se lee como límite por recorte, sin convertir su nivel en un acierto o error.\n\n`:'**Revisión posterior de las explicaciones:** siete respuestas atribuyen al wireframe un relleno que aparece en el screenshot. En el wireframe queda una forma interior con centro blanco. Los campos coinciden con lo previsto, pero esa frase es imprecisa. Esta observación no formaba parte de los criterios previos y se conserva aparte, sin cambiar puntajes. [Detalle y originales](../../revisiones/g5-cierre-2026-10-19/REVISION-EXPLICACIONES.md).\n\nEl trigger único se exige por contrato: su consistencia no se presenta como una mejora espontánea del razonamiento. La nueva regla de nivel 1 es una decisión de desarrollo autorizada por Juan, no una aprobación atribuida a Camilo.\n\n'}${s.evaluaciones.some(r=>r.diferencias_criterios.length||r.coincide_nivel===false||r.estado==='invalido')?'## Diferencias conservadas\n\n'+s.evaluaciones.filter(r=>r.diferencias_criterios.length||r.coincide_nivel===false||r.estado==='invalido').map(r=>`- [${r.id}](respuestas/${r.id}.json): ${r.estado==='invalido'?'inválida: '+r.errores.join('; '):[r.coincide_nivel===false?'nivel distinto del esperado':'',...r.diferencias_criterios.map(d=>d.campo+': '+d.esperado+' → '+d.recibido)].filter(Boolean).join('; ')}`).join('\n')+'\n\n':''}## Qué podemos concluir\n\n${complete?'Terminó la ejecución de esta serie.':'La serie todavía está incompleta.'} Son ejemplos hechos por nosotros, con expectativas propuestas por nosotros. No son juicios de expertos ni una muestra representativa de todas las páginas web. La lectura del screenshot sigue siendo necesaria para los criterios textuales; no se afirma una comparación pura de canales.\n\nLas advertencias por pocas cajas en pantallas sintéticas se conservan; no se bajó el umbral general de captura. Los pilotos anteriores, sus puntajes y sus limitaciones no se sustituyen. No se vuelve a solicitar una posición para conseguir una respuesta mejor. La validación con expertos y el consenso siguen pendientes.\n\n## Archivos\n\n- [evaluaciones.csv](evaluaciones.csv): una fila por posición planificada, incluido su estado.\n- [resumen.json](resumen.json): comparación de criterios y dispersión.\n- respuestas/: originales; resultados/: originales con atribución añadida.\n- trazas/: conversación, consumo, comandos, errores y hashes.\n- VERIFICACION.json y SELLO-SHA256.tsv: comprobación y sello de los archivos primarios.\n`;
}
function main(){
 const mode=process.argv[2],series=process.argv[3],api=experiment(series),{OUT}=api;
 if(mode==='analizar'){
  const s=analyze(series);write(path.join(OUT,'resumen.json'),s);fs.writeFileSync(path.join(OUT,'INFORME.md'),render(s));
  const keys=['id','pagina','repeticion','estado','score','not_applicable','trigger','evidence_insufficient','coincide_nivel','diferencias_criterios','coincide_nivel_anterior','trigger_anterior','insuficiencia_anterior','diferencias_con_serie_anterior'];
  const cell=v=>'"'+(v==null?'':typeof v==='object'?JSON.stringify(v):String(v)).replace(/"/g,'""')+'"';
  fs.writeFileSync(path.join(OUT,'evaluaciones.csv'),keys.join(',')+'\n'+s.evaluaciones.map(r=>keys.map(k=>cell(r[k])).join(',')).join('\n')+'\n');
  console.log(JSON.stringify({serie:series,validas:s.validas,invalidas:s.invalidas,pendientes:s.pendientes,coincidencias:s.coincidencias_nivel}));return;
 }
 if(mode!=='verificar'&&mode!=='sellar')throw Error('Uso: g5-completion-results.js analizar|verificar|sellar neutral|cobertura [--partial|--verify-seal]');
 const v=verify(series,{partial:process.argv.includes('--partial')});
 if(mode==='sellar'){
  assert.equal(v.pendientes,0);assert.equal(v.errores_tecnicos,0);const seal=path.join(OUT,'SELLO-SHA256.tsv');assert.ok(!fs.existsSync(seal),'El sello ya existe; no se reemplaza');
  fs.writeFileSync(seal,primaryFiles(OUT).map(f=>sha(f)+'\t'+path.relative(OUT,f)).join('\n')+'\n');
 }
 if(process.argv.includes('--verify-seal'))v.archivos_sellados=verifySeal(OUT);
 write(path.join(OUT,'VERIFICACION.json'),v);
 console.log(JSON.stringify(v));
}
if(require.main===module)main();
module.exports={comparison,verify,analyze};
