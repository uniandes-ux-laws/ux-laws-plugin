#!/usr/bin/env node
'use strict';
// Derivados y verificación: no solicita evaluaciones ni altera juicios.
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),crypto=require('crypto'),{execFileSync}=require('node:child_process');
const api=require('./pilot-g4-phase2'),{validationProblems,promptFor}=require('./g4-evaluator-contract'),{primaryFiles,verifySeal}=require('./verify-g5-progress');
const {ROOT,OUT}=api,read=f=>JSON.parse(fs.readFileSync(f,'utf8')),text=f=>fs.readFileSync(f,'utf8'),hash=x=>crypto.createHash('sha256').update(x).digest('hex'),sha=f=>hash(fs.readFileSync(f));
const REGISTRATION_COMMIT='PENDIENTE-REGISTRO';
const write=(f,x)=>fs.writeFileSync(f,JSON.stringify(x,null,2)+'\n');
function compare(raw,expected){return {coincide_nivel:!raw.not_applicable&&raw.score===expected.score,diferencias:['I_principal','P','Bn','Cn','trigger','main_set_id','jerarquia_entre_dos'].filter(k=>Object.hasOwn(expected,k)).filter(k=>(k==='trigger'?raw.trigger:raw.measurements[k])!==expected[k]).map(k=>({campo:k,esperado:expected[k],recibido:k==='trigger'?raw.trigger:raw.measurements[k]}))};}
function verify(partial=false){
 const m=api.checkFiles(),sessions=new Set();let finished=0,valid=0,abst=0,invalid=0,technical=0;
 assert.notEqual(REGISTRATION_COMMIT,'PENDIENTE-REGISTRO','Falta anclar el manifiesto al commit previo');
 assert.equal(sha(path.join(OUT,'manifiesto.json')),hash(execFileSync('git',['show',REGISTRATION_COMMIT+':pilotos/g4-cierre-2026-10-20/manifiesto.json'],{cwd:ROOT})));
 assert.equal(m.runner_sha256,hash(execFileSync('git',['show',m.git_commit+':scripts/pilot-g4-phase2.js'],{cwd:ROOT})));
 for(const p of m.pages)assert.equal(text(path.join(OUT,'prompts',p.id+'.md')),promptFor(read(path.join(OUT,'entradas',p.id+'.json')),text(path.join(OUT,'RUBRICA.md')),text(path.join(OUT,'ESCALA.md'))));
 const planned=new Set(api.tasks(m).map(t=>t.key));
 for(const dir of ['trazas','respuestas','resultados'])for(const f of fs.readdirSync(path.join(OUT,dir))){if(f.endsWith('.log')||f==='.DS_Store')continue;assert.ok(planned.has(f.replace(/\.(jsonl|json)$/,''))&&/\.(jsonl|json)$/.test(f),'Archivo fuera del plan: '+f);}
 for(const t of api.tasks(m)){
  const file=path.join(OUT,'trazas',t.key+'.json');
  if(!fs.existsSync(file)){for(const [d,e] of [['trazas','.jsonl'],['respuestas','.json']])assert.ok(!fs.existsSync(path.join(OUT,d,t.key+e)),'Intento sin cerrar: '+t.key);continue;}
  finished++;const proof=read(file),trace=path.join(OUT,'trazas',t.key+'.jsonl'),events=text(trace).trim().split('\n').filter(Boolean).map(JSON.parse),rawFile=path.join(OUT,'respuestas',t.key+'.json');
  assert.equal(sha(trace),proof.trace_sha256);assert.equal(proof.prompt_hash,t.p.prompt_hash);assert.equal(proof.response_schema_sha256,m.fixed_files_sha256['response.schema.json']);assert.equal(proof.cli_version,m.cli_version);assert.ok(Date.parse(proof.started_at)>=Date.parse(m.registrado_en));
  const cd=proof.command[proof.command.indexOf('--cd')+1];assert.deepEqual(proof.command,api.command(m,t.p,t.key,cd));
  assert.equal(events.find(e=>e.type==='thread.started')?.thread_id??null,proof.thread_id);
  if(proof.thread_id){assert.ok(!sessions.has(proof.thread_id),'Sesión repetida');sessions.add(proof.thread_id);}
  assert.ok(events.filter(e=>['item.started','item.completed'].includes(e.type)).every(e=>['agent_message','reasoning'].includes(e.item.type)),'Herramienta no permitida');
  if(proof.raw_sha256)assert.equal(sha(rawFile),proof.raw_sha256);
  if(proof.status==='error_tecnico'){technical++;continue;}
  assert.equal(proof.exit.code,0);assert.deepEqual(events.find(e=>e.type==='turn.completed').usage,proof.usage);
  const message=events.filter(e=>e.type==='item.completed'&&e.item.type==='agent_message').at(-1);assert.ok(message);
  if(proof.status==='invalido'){
   invalid++;assert.ok(proof.errors.length);assert.ok(!fs.existsSync(path.join(OUT,'resultados',t.key+'.json')));
   if(fs.existsSync(rawFile)){let parsed=false;try{JSON.parse(text(rawFile));parsed=true}catch{}if(parsed)assert.deepEqual(JSON.parse(message.item.text),read(rawFile));else assert.equal(message.item.text.trim(),text(rawFile).trim());}continue;
  }
  assert.ok(['valido','abstencion'].includes(proof.status));const raw=read(rawFile),run=api.attribution(m,t.p,t.r),ids=new Set(read(path.join(ROOT,t.p.captura,'nodes.json')).map(n=>n.id));assert.deepEqual(JSON.parse(message.item.text),raw);
  assert.deepEqual(validationProblems(raw,read(path.join(OUT,'entradas',t.p.id+'.json')),run,ids),[]);assert.equal(proof.status==='abstencion',!raw.not_applicable&&raw.score===null);
  if(proof.status==='abstencion')abst++;else valid++;
  const result=path.join(OUT,'resultados',t.key+'.json');assert.equal(sha(result),proof.result_sha256);const {run:attribution,...unchanged}=read(result);assert.deepEqual(unchanged,raw);assert.deepEqual(attribution,run);
 }
 if(!partial)assert.equal(finished,85,'Quedan posiciones pendientes');
 const oldSessions=new Set(fs.readdirSync(path.join(api.SOURCE,'trazas')).filter(f=>f.endsWith('.json')).map(f=>read(path.join(api.SOURCE,'trazas',f)).thread_id));assert.ok([...sessions].every(id=>!oldSessions.has(id)),'Conversación reutilizada de la fase anterior');
 return {planeadas:85,intentadas:finished,validas:valid,abstenciones:abst,invalidas:invalid,errores_tecnicos:technical,pendientes:85-finished,sesiones_nuevas_distintas:sessions.size,originales_trazas_y_atribuciones_comprobados:true,juicios_sin_modificar:true,validacion_experta:false};
}
function analyze(){
 const m=api.checkFiles(),expect=read(path.join(OUT,'EXPECTATIVAS-PREVIAS.json')).casos;
 const rows=api.tasks(m).map(t=>{
  const r={id:t.key,pagina:t.p.id,tipo:t.p.tipo,repeticion:t.r,estado:'pendiente',score:null,not_applicable:null,trigger:null,coincide_nivel:null,diferencias:[]},f=path.join(OUT,'trazas',t.key+'.json');if(!fs.existsSync(f))return r;
  const proof=read(f);Object.assign(r,{estado:proof.status,errores:proof.errors,thread_id:proof.thread_id,usage:proof.usage});if(!['valido','abstencion'].includes(proof.status))return r;
  const rawFile=path.join(OUT,'respuestas',t.key+'.json');assert.equal(sha(rawFile),proof.raw_sha256);const raw=read(rawFile),mm=raw.measurements;
  Object.assign(r,{score:raw.score,not_applicable:raw.not_applicable,trigger:raw.trigger,evidence_insufficient:raw.evidence_insufficient,measurements:mm});
  if(t.p.tipo==='sintetico'){
   const target={...expect.find(e=>e.id===t.p.id).esperado};
   const input=read(path.join(OUT,'entradas',t.p.id+'.json'));target.main_set_id=input.g4.g4_conjuntos_pares.find(s=>s.clave.startsWith('LI#')&&s.n===9).conjunto;
   if(t.p.id==='S02')target.jerarquia_entre_dos=true;
   Object.assign(r,compare(raw,target));
  }
  else{const before=read(path.join(api.SOURCE,'respuestas',t.key+'.json'));Object.assign(r,{score_anterior:before.score,conjunto_anterior:before.measurements.main_set_id,abstencion_anterior:before.score===null&&!before.not_applicable,insuficiencia_anterior:before.evidence_insufficient,cambio_nivel_o_estado:raw.score!==before.score||raw.not_applicable!==before.not_applicable,cambio_conjunto:mm.main_set_id!==before.measurements.main_set_id});}
  return r;
 });
 const pages=m.pages.map(p=>{
  const all=rows.filter(r=>r.pagina===p.id),valid=all.filter(r=>['valido','abstencion'].includes(r.estado)),scores=valid.filter(r=>r.score!==null),counts=new Map();for(const r of scores)counts.set(r.score,(counts.get(r.score)||0)+1);const top=Math.max(0,...counts.values());
  return {id:p.id,tipo:p.tipo,salidas:all.map(r=>r.estado==='abstencion'?'ABSTENCIÓN':r.estado==='valido'?(r.not_applicable?'NA':r.score):r.estado),coincidencias:p.tipo==='sintetico'?all.filter(r=>r.coincide_nivel===true).length:null,
   modas:[...counts].filter(([,n])=>n===top).map(([v])=>v),rango_ordinal:scores.length?Math.max(...scores.map(r=>r.score))-Math.min(...scores.map(r=>r.score)):null,
   nivel_estable:scores.length===5?new Set(scores.map(r=>r.score)).size===1:null,
   conjuntos_distintos:new Set(valid.map(r=>r.measurements.main_set_id)).size,triggers_distintos:new Set(valid.map(r=>r.trigger)).size,
   insuficiencia:valid.filter(r=>r.evidence_insufficient).length,abstenciones:valid.filter(r=>r.estado==='abstencion').length};
 });
 const strata=Object.fromEntries(['real','sintetico'].map(tipo=>{const a=rows.filter(r=>r.tipo===tipo);return [tipo,{planeadas:a.length,intentadas:a.filter(r=>r.estado!=='pendiente').length,validas:a.filter(r=>r.estado==='valido').length,abstenciones:a.filter(r=>r.estado==='abstencion').length,invalidas:a.filter(r=>r.estado==='invalido').length,errores_tecnicos:a.filter(r=>r.estado==='error_tecnico').length,pendientes:a.filter(r=>r.estado==='pendiente').length,niveles:[0,1,2,3,4].map(n=>a.filter(r=>r.estado==='valido'&&r.score===n).length),NA:a.filter(r=>r.estado==='valido'&&r.not_applicable).length,evidencia_insuficiente:a.filter(r=>r.evidence_insufficient).length}]}));
 return {tipo:'fase dirigida; no repetición completa ni validación experta',planeadas:85,intentadas:rows.filter(r=>r.estado!=='pendiente').length,pendientes:rows.filter(r=>r.estado==='pendiente').length,estratos:strata,coincidencias_sinteticas:rows.filter(r=>r.tipo==='sintetico'&&r.coincide_nivel===true).length,denominador_sintetico:40,juicios_sinteticos_con_diferencias:rows.filter(r=>r.diferencias.length).length,uso_tokens:Object.fromEntries(['input_tokens','cached_input_tokens','output_tokens','reasoning_output_tokens'].map(k=>[k,rows.reduce((s,r)=>s+(r.usage?.[k]||0),0)])),paginas:pages,evaluaciones:rows};
}
function render(s){return `# G4: fase dirigida con reglas propuestas\n\n20 de octubre de 2026. **${s.pendientes?'En curso':'Ejecución terminada'}: ${s.intentadas}/85 posiciones conservadas; ${s.pendientes} pendientes.**\n\nJuan autorizó proponer los criterios porque todavía no hay acuerdo con Camilo. Se registraron antes de evaluar. Son propuestas operativas del equipo, pendientes de contraste con el asesor y los expertos. Una respuesta válida cumple formato y reglas comprobadas; no garantiza que toda su interpretación visual sea correcta.\n\n## Qué cambió\n\nNivel 1 si no hay aislados ni Bn; nivel 2 para dos aislados con o sin jerarquía y para foco pertinente con Cn positivo. Se pide justificar la sección elegida y se fija un trigger por condición. La entrada G4 1.0.7 corrige falsas marcas de parcialidad numéricas de la fuente 1.0.6 y retira clases de candidatos a banner. Los recortes reales y las cajas incoherentes siguen requiriendo declarar el límite.\n\nEl modelo es gpt-6.1-sol, CLI 0.162.0-alpha.17.2, esfuerzo low, screenshot como único canal y conversación nueva por posición, sin herramientas ni expectativas. Frente a la fase anterior cambian varias piezas; no atribuimos las diferencias a una sola. [Registro previo](REGISTRO-PREVIO.md), [decisiones](DECISIONES.md) y [expectativas sintéticas](EXPECTATIVAS-PREVIAS.json) quedan conservados.\n\n## Resultados por separado\n\n| Estrato | Planeadas | Válidas | Abstenciones | Inválidas | Fallos técnicos | Pendientes |\n|---|---:|---:|---:|---:|---:|---:|\n${Object.entries(s.estratos).map(([k,v])=>`| ${k} | ${v.planeadas} | ${v.validas} | ${v.abstenciones} | ${v.invalidas} | ${v.errores_tecnicos} | ${v.pendientes} |`).join('\n')}\n\nEn los sintéticos hay **${s.coincidencias_sinteticas}/40 coincidencias de nivel**. ${s.pendientes?'La fase está incompleta; no se interpreta como un resultado final.':'Las inválidas y los fallos permanecen en el denominador.'} Se comparan con expectativas nuestras, no con juicios expertos. Hay ${s.juicios_sinteticos_con_diferencias} respuestas con diferencias en los campos previstos; coincidir en nivel no asegura coincidir en todos. Las páginas reales no tienen un nivel correcto asignado por nosotros.\n\n| Página | Cinco salidas | Coincidencias de nivel | Conjuntos distintos | Advertencias de evidencia |\n|---|---|---|---:|---:|\n${s.paginas.map(p=>`| ${p.id} | ${p.salidas.join(' / ')} | ${p.coincidencias===null?'Sin referencia':p.coincidencias+'/5'} | ${p.conjuntos_distintos} | ${p.insuficiencia} |`).join('\n')}\n\nNA significa no aplicable; una abstención conserva incertidumbre y no es cero. Los niveles no se promedian. Modas, empates, rangos, cambios de selección, triggers y cada repetición aparecen en [resumen.json](resumen.json). Solo se declara nivel estable cuando hay cinco puntajes. La consistencia del trigger forma parte del contrato.\n\n## Qué sigue pendiente\n\nLa [revisión de conjuntos](../../docs/REVISION-G4-20OCT.md) explica errores de cajas, recortes, oclusión y alcance de sección. Una marca de recorte corregida no elimina esos otros límites. La galería revisa evidencia archivada, no fija una referencia experta. Las explicaciones se revisan aparte y no se corrigen sus originales.\n\n${s.pendientes?'Falta completar las posiciones pendientes.':'La ejecución terminó.'} Las reglas propuestas todavía requieren contraste con Camilo. La validación experta, ética y consenso siguen pendientes. No se mezclan estos resultados con las 120 respuestas anteriores ni se declara validado G4.\n\n## Archivos\n\n- [evaluaciones.csv](evaluaciones.csv): todas las posiciones planificadas, con su estado.\n- [resumen.json](resumen.json): resultados separados por reales y sintéticos.\n- respuestas/: originales; resultados/: copias con atribución, sin cambios en los juicios.\n- trazas/: eventos, sesiones, comandos, hashes, consumo y errores.\n- VERIFICACION.json y SELLO-SHA256.tsv: comprobación y sello al terminar.\n`}
function main(){
 const mode=process.argv[2];if(mode==='analizar'){const s=analyze();write(path.join(OUT,'resumen.json'),s);fs.writeFileSync(path.join(OUT,'INFORME.md'),render(s));const keys=['id','pagina','tipo','repeticion','estado','score','not_applicable','trigger','evidence_insufficient','coincide_nivel','diferencias','score_anterior','conjunto_anterior','cambio_nivel_o_estado','cambio_conjunto'];const cell=v=>'"'+(v==null?'':typeof v==='object'?JSON.stringify(v):String(v)).replace(/"/g,'""')+'"';fs.writeFileSync(path.join(OUT,'evaluaciones.csv'),keys.join(',')+'\n'+s.evaluaciones.map(r=>keys.map(k=>cell(r[k])).join(',')).join('\n')+'\n');console.log(JSON.stringify({intentadas:s.intentadas,pendientes:s.pendientes,estratos:s.estratos}));return;}
 assert.ok(['verificar','sellar'].includes(mode),'Uso: analizar|verificar [--partial|--verify-seal]|sellar');const v=verify(process.argv.includes('--partial'));
 if(mode==='sellar'){assert.equal(v.pendientes,0);assert.equal(v.errores_tecnicos,0);assert.ok(!fs.existsSync(path.join(OUT,'SELLO-SHA256.tsv')),'Ya existe el sello; no se reemplaza');fs.writeFileSync(path.join(OUT,'SELLO-SHA256.tsv'),primaryFiles(OUT).map(f=>sha(f)+'\t'+path.relative(OUT,f)).join('\n')+'\n');}
 if(process.argv.includes('--verify-seal'))v.archivos_sellados=verifySeal(OUT);write(path.join(OUT,'VERIFICACION.json'),v);console.log(JSON.stringify(v));
}
if(require.main===module)main();module.exports={compare,verify,analyze};
