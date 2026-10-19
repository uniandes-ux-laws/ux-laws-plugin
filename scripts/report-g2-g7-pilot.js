#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {anchorAudit}=require('./pilot-g2-g7-contract');
const json=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const write=(f,o)=>fs.writeFileSync(f,JSON.stringify(o,null,2)+'\n');
const sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const csv=v=>v==null?'':'"'+String(typeof v==='object'?JSON.stringify(v):v).replaceAll('"','""')+'"';
function readableReason(reason){
  const match=/^n1=(\d+); agrupación=(\w+); acción=(\w+); exige decisión=(true|false|null); competencia=(true|false|null)$/.exec(reason);
  if(!match)return reason;
  const [,groups,grouping,action,decision,competition]=match;
  const yesNo={true:'sí',false:'no',null:'sin determinar'};
  const actions={clara:'clara',ausente:'ausente',no_domina:'presente sin destacar',indeterminada:'sin determinar'};
  return `${groups} ${groups==='1'?'grupo':'grupos'} de primer nivel; agrupación ${grouping==='debil'?'débil':grouping}; acción principal ${actions[action]||action}; exige decisión: ${yesNo[decision]}; acciones que compiten: ${yesNo[competition]}`;
}
function analyze(dir){
  const manifest=json(path.join(dir,'manifiesto.json')),pages=[],rows=[],audits=[],reasons={},judgments={};
  const totals={planeadas:120,terminadas:0,validas:0,abstenciones:0,invalidas:0,errores_tecnicos:0,pendientes:0,no_aplicables:0,evidencia_insuficiente:0,lectura_screenshot:0,niveles:[0,0,0,0,0],niveles_incluidos_invalidos:[0,0,0,0,0],uso_tokens:{}};
  for(const page of manifest.pages){
    const records=[];
    for(let r=1;r<=5;r++){
      const key=page.id+'-r'+r,file=path.join(dir,'trazas',key+'.json');
      if(!fs.existsSync(file)){totals.pendientes++;rows.push([page.id,r,'pendiente']);continue;}
      const proof=json(file);totals.terminadas++;
      for(const [k,v] of Object.entries(proof.usage||{}))if(typeof v==='number')totals.uso_tokens[k]=(totals.uso_tokens[k]||0)+v;
      const rawFile=path.join(dir,'respuestas',key+'.json');let raw=null;
      if(proof.raw_sha256){if(sha(rawFile)!==proof.raw_sha256)throw Error(key+': respuesta cambió');try{raw=json(rawFile);}catch{}}
      if(raw&&Number.isInteger(raw.score)&&raw.score>=0&&raw.score<=4)totals.niveles_incluidos_invalidos[raw.score]++;
      if(proof.status==='valido'||proof.status==='abstencion'){
        const finalFile=path.join(dir,'resultados',key+'.json');if(sha(finalFile)!==proof.result_sha256)throw Error(key+': atribución cambió');
        const {run,...original}=json(finalFile);if(JSON.stringify(original)!==JSON.stringify(raw)||run.repetition!==r||run.prompt_hash!==page.prompt_hash)throw Error(key+': juicio alterado');
        records.push({r,raw,status:proof.status});
        if(raw.evidence_insufficient)totals.evidencia_insuficiente++;
        if(raw.measurements.lectura_screenshot.length)totals.lectura_screenshot++;
        const audit=anchorAudit(raw);audits.push({id:key,...audit});
        const v=raw.measurements;
        const judgment=manifest.group_id==='g2'?JSON.stringify({agrupacion:v.agrupacion,accion_primaria:v.accion_primaria,Ap:v.Ap,reduccion_activa:v.reduccion_activa}):JSON.stringify({primary_larger:v.primary_larger});
        judgments[judgment]=(judgments[judgment]||0)+1;
        if(proof.status==='abstencion'){
          const reason=manifest.group_id==='g2'?`n1=${v.g2_n1}; agrupación=${v.agrupacion}; acción=${v.accion_primaria}; exige decisión=${v.pantalla_exige_decision}; competencia=${v.varias_acciones_compiten}`:v.motivo_abstencion;
          reasons[reason]=(reasons[reason]||0)+1;
        }
      }
      if(proof.status==='valido'){totals.validas++;if(raw.not_applicable)totals.no_aplicables++;else totals.niveles[raw.score]++;}
      else if(proof.status==='abstencion')totals.abstenciones++;
      else if(proof.status==='invalido')totals.invalidas++;
      else totals.errores_tecnicos++;
      rows.push([page.id,r,proof.status,raw?.not_applicable?'NA':raw?.score===null?'ABSTENCION':raw?.score,raw?.trigger,raw?.evidence_insufficient,raw?.measurements?.motivo_abstencion,JSON.stringify(proof.errors),proof.prompt_hash,proof.raw_sha256]);
    }
    const valid=records.filter(v=>v.status==='valido'),labels=valid.map(v=>v.raw.not_applicable?'NA':v.raw.score),count=new Map();
    for(const label of labels)count.set(label,(count.get(label)||0)+1);
    const max=Math.max(0,...count.values()),modes=[...count].filter(([,n])=>n===max).map(([v])=>v),numeric=labels.filter(v=>v!=='NA');
    pages.push({id:page.id,validas:valid.length,abstenciones:records.length-valid.length,niveles:labels,todas_respuestas:records.map(v=>v.raw.not_applicable?'NA':v.raw.score===null?'ABSTENCION':v.raw.score),modas:modes,fraccion_modal:valid.length?max/valid.length:null,rango:numeric.length?Math.max(...numeric)-Math.min(...numeric):null,triggers_distintos:new Set(valid.map(v=>v.raw.trigger)).size,evidencia_insuficiente:records.filter(v=>v.raw.evidence_insufficient).length});
  }
  const summary={analizado_en:new Date().toISOString(),grupo:manifest.group_id,...totals,respuestas_conformes:totals.validas+totals.abstenciones,paginas_con_cinco_validas:pages.filter(p=>p.validas===5).length,paginas_estables:pages.filter(p=>p.validas===5&&new Set(p.niveles).size===1).length,paginas_trigger_estable:pages.filter(p=>p.validas===5&&p.triggers_distintos===1).length,desacuerdos_ancla:audits.filter(a=>a.issues.length).length,abstenciones_por_combinacion:reasons,juicios:judgments,paginas:pages};
  write(path.join(dir,'resumen.json'),summary);
  write(path.join(dir,'auditoria.json'),{auditada_en:new Date().toISOString(),comparacion_con_expertos:false,desacuerdos:audits.filter(a=>a.issues.length),detalle:audits});
  fs.writeFileSync(path.join(dir,'evaluaciones.csv'),[['pagina','repeticion','estado','nivel','trigger','evidencia_insuficiente','motivo_abstencion','errores','prompt_sha256','respuesta_sha256'],...rows.map(r=>Array.from({length:10},(_,i)=>r[i]))].map(r=>r.map(csv).join(',')).join('\n')+'\n');
  fs.writeFileSync(path.join(dir,'resumen.csv'),[['pagina','validas','abstenciones','respuestas','nivel_mas_frecuente','fraccion_modal','rango','triggers_distintos','evidencia_insuficiente'],...pages.map(p=>[p.id,p.validas,p.abstenciones,p.todas_respuestas.join('|'),p.modas.join('|'),p.fraccion_modal,p.rango,p.triggers_distintos,p.evidencia_insuficiente])].map(r=>r.map(csv).join(',')).join('\n')+'\n');
  console.log(JSON.stringify(Object.fromEntries(Object.entries(summary).filter(([k])=>!['paginas','uso_tokens'].includes(k)))));
  return summary;
}
function historicalTechnicalAttempts(dir){
  const root=path.join(dir,'fallos-tecnicos'),found=new Map();
  if(!fs.existsSync(root))return [];
  function walk(folder){for(const entry of fs.readdirSync(folder,{withFileTypes:true})){
    const file=path.join(folder,entry.name);
    if(entry.isDirectory())walk(file);
    else if(entry.name.endsWith('.json')){
      const proof=json(file);if(proof.status!=='error_tecnico'||!proof.id||!proof.thread_id)continue;
      const activeFile=path.join(dir,'trazas',proof.id+'.json'),active=fs.existsSync(activeFile)?json(activeFile):null;
      if(!active||active.thread_id!==proof.thread_id||active.trace_sha256!==proof.trace_sha256)found.set(proof.id+'|'+proof.thread_id,proof);
    }
  }}
  walk(root);return [...found.values()];
}
function report(dir){
  const s=analyze(dir),m=json(path.join(dir,'manifiesto.json')),group=m.group_id.toUpperCase(),applicable=s.validas-s.no_aplicables;
  const received=s.terminadas-s.errores_tecnicos,technicalIds=fs.readdirSync(path.join(dir,'trazas')).filter(f=>f.endsWith('.json')).map(f=>json(path.join(dir,'trazas',f))).filter(p=>p.status==='error_tecnico').map(p=>p.id).sort();
  const historical=historicalTechnicalAttempts(dir),registeredAttempts=s.terminadas+historical.length;
  const resultText=`El modelo asignó **${applicable} puntajes** y dejó **${s.abstenciones} respuestas sin puntaje (abstenciones)**.`+(s.no_aplicables?` Además, ${s.no_aplicables} respuestas fueron «no aplica» (NA).`:'')+' En las abstenciones explicó por qué no pudo asignar un nivel.';
  const pendingText=s.invalidas||s.errores_tecnicos||s.pendientes?`Hay ${s.invalidas} respuestas inválidas, ${s.errores_tecnicos} fallos técnicos pendientes y ${s.pendientes} posiciones pendientes de evaluar.`:'No quedaron respuestas inválidas ni fallos técnicos pendientes.';
  const auditScope=group==='G2'?'En G2 revisamos si el nivel corresponde a los juicios del modelo. Para los niveles 0 a 3 la rúbrica permite distintas reglas de justificación. Para el nivel 4 debe reportarse Ap (apoyos de decisión). Por eso mostramos las diferencias de regla sin tratarlas automáticamente como errores.':'En G7 la revisión automática comprueba el nivel y la condición que lo determina con las medidas entregadas.';
  const mixed=s.paginas.filter(p=>p.validas>0&&p.abstenciones>0).map(p=>p.id),varied=s.paginas.filter(p=>p.validas===5&&new Set(p.niveles).size>1).map(p=>p.id);
  const observations=[mixed.length?`Hubo respuestas con y sin puntaje en estas páginas: ${mixed.join(', ')}.`:'',varied.length?`El nivel cambió entre las cinco evaluaciones de: ${varied.join(', ')}.`:''].filter(Boolean).join(' ');
  let text=`# Piloto de ${group} · 18 de octubre de 2026\n\n${group==='G2'?'En G2 revisamos cómo están organizadas las opciones y si se distingue la acción principal.':'En G7 revisamos el tamaño de los controles, su separación y si mantienen medidas consistentes.'} ${s.terminadas===120&&s.errores_tecnicos===0?'El piloto terminó':'El piloto sigue incompleto'}. Recibimos **${received}/120 respuestas** de las 24 páginas de calibración. Cada página se evaluó cinco veces en conversaciones separadas.\n\n${resultText} ${pendingText}\n\n## Resultados\n\nLos porcentajes se calcularon sobre los ${applicable} puntajes. Las abstenciones y los «no aplica» (NA) se cuentan aparte.\n\n| Nivel | Evaluaciones | Porcentaje |\n|---|---:|---:|\n`;
  if(s.errores_tecnicos)text=text.replace('## Resultados',`**El piloto está incompleto por los fallos técnicos de ${technicalIds.join(', ')}.** Hay ${registeredAttempts} intentos registrados, pero solo ${received} respuestas recibidas. Los fallos no se cuentan como ceros, abstenciones ni NA. Se detuvieron las solicitudes nuevas y se guardaron los registros.\n\n## Resultados`);
  if(historical.length)text=text.replace('## Resultados',`Antes de completar el piloto hubo **${historical.length} solicitudes fallidas** que no devolvieron una respuesta. Por eso guardamos **${registeredAttempts} intentos** para reunir las 120 respuestas. Los fallos no se cuentan como ceros, abstenciones ni NA. El [registro del reintento](REINTENTO-TECNICO-AUTORIZADO-19OCT.json) explica la autorización para repetir solo esas posiciones. Las respuestas que ya teníamos se conservaron.\n\n## Resultados`);
  for(let i=0;i<5;i++)text+=`| ${i} | ${s.niveles[i]} | ${applicable?(100*s.niveles[i]/applicable).toFixed(1)+' %':'—'} |\n`;
  if(s.abstenciones){text+='\nEl modelo se abstuvo cuando la situación observada no encajaba en las reglas o no podía asegurar algún juicio. Aquí agrupamos esos casos; la explicación completa está en cada respuesta.\n\n<details>\n<summary>Ver los motivos de las abstenciones</summary>\n\n| Situación observada | Abstenciones |\n|---|---:|\n';for(const [reason,count] of Object.entries(s.abstenciones_por_combinacion))text+=`| ${readableReason(reason)} | ${count} |\n`;text+='\n</details>\n';}
  text+=`\nDe las ${s.paginas_con_cinco_validas} páginas con cinco respuestas válidas, **${s.paginas_estables} repitieron el nivel** en todas las evaluaciones. La regla usada para justificarlo fue igual en **${s.paginas_trigger_estable} de esas ${s.paginas_con_cinco_validas} páginas**. En **${s.evidencia_insuficiente}/${s.respuestas_conformes}** respuestas el modelo indicó que faltaba parte de la evidencia. La revisión automática encontró **${s.desacuerdos_ancla} diferencias** frente a las reglas registradas. Si aparece una diferencia, queda guardada sin corregir el puntaje.\n\n${auditScope}\n\n${observations?observations+'\n\n':''}<details>\n<summary>Resultados por página</summary>\n\n| Página | Válidas | Abstenciones | Respuestas | Nivel más repetido | Parte con el mismo nivel | Diferencia de niveles | Reglas distintas |\n|---|---:|---:|---|---|---:|---:|---:|\n`;
  for(const p of s.paginas)text+=`| ${p.id} | ${p.validas} | ${p.abstenciones} | ${p.todas_respuestas.map(v=>v==='ABSTENCION'?'Sin puntaje':v).join(', ')||'—'} | ${p.modas.join(', ')||'—'} | ${p.fraccion_modal?.toFixed(2)??'—'} | ${p.rango??'—'} | ${p.triggers_distintos} |\n`;
  text+='\n</details>\n\nNo calculamos un promedio de niveles. Para decir que una página repite el nivel, revisamos solo las que tuvieron cinco respuestas válidas, incluidos los NA que se repiten. Las abstenciones y los empates se muestran aparte. En la columna «Parte con el mismo nivel» contamos solo las respuestas válidas; no entran las abstenciones. Las respuestas inválidas quedan fuera de la tabla principal, pero sus puntajes recibidos siguen guardados en `niveles_incluidos_invalidos` del resumen.\n\n## Lo que falta revisar\n\n';
  text+=group==='G2'?'En G2 el puntaje depende de la cantidad de grupos, de cómo están organizados y de qué tan clara sea la acción principal. Todavía hay combinaciones para las que la rúbrica no define un nivel. Los apoyos de decisión se revisan en la captura real y se registra esa revisión incluso si no se encuentra ninguno. Por eso G2 combina el wireframe con esa parte de la captura real.\n\n':'G7 aplica sus reglas a medidas ya calculadas y no usa la captura real. Si el nivel o la regla cambian con los mismos datos, hay que revisar esa diferencia. Cuando faltan pares o familias de controles, los valores correspondientes quedan sin dato; eso no demuestra que no haya problemas.\n\n';
  if(group==='G2'&&s.respuestas_conformes&&Object.keys(s.juicios).every(j=>JSON.parse(j).Ap===0))text+=`El modelo no identificó apoyos de decisión en estas ${s.respuestas_conformes} respuestas. Para probar el nivel 4 todavía faltan casos con apoyos que ayuden a reducir la carga de decisión.\n\n`;
  if(group==='G7'&&s.respuestas_conformes&&!s.niveles[3]&&!s.niveles[4])text+='No obtuvimos niveles 3 ni 4. Todavía tenemos que probar cómo responde el modelo en esos casos.\n\n';
  if(group==='G7')text+='La rúbrica incluía cifras del piloto de septiembre. Esto pudo influir en las respuestas y ya estaba anotado antes de empezar. El modelo no recibió resultados de otras evaluaciones de esta serie.\n\n';
  text+=`Las capturas de septiembre no guardan todos los estados de los controles. Algunas relaciones entre ellos y algunas cajas recortadas no son claras. Esas limitaciones se conservaron junto con las medidas originales. Todavía no hemos comprobado que los juicios del modelo coincidan con los de expertos.\n\nPara seguir con ${group} falta ${group==='G2'?'aclarar con Camilo las combinaciones sin nivel, acordar los casos dorados y comparar los resultados con las calificaciones de expertos':'revisar los resultados con Camilo, acordar los casos dorados y comparar lo que respondió el modelo con las calificaciones de expertos'}. El estado del comité de ética se revisa aparte.\n\n<details>\n<summary>Cómo se hizo el piloto</summary>\n\n| Dato | Valor |\n|---|---|\n| Modelo solicitado | ${m.model_id} |\n| Herramienta | ${m.cli_version} |\n| Razonamiento | ${m.decoding.model_reasoning_effort} |\n| Medición | ${m.measurements_version} |\n| Código usado (commit) | \`${m.git_commit}\` |\n\nCada evaluación se hizo en una conversación nueva, sin herramientas ni resultados de otras evaluaciones de esta serie. Tampoco recibió las instrucciones del proyecto. Guardamos las imágenes, las reglas, las instrucciones, los datos, las respuestas y los registros de ejecución. La herramienta usada no expone temperatura ni top-p. Los datos de cada corrida se añaden a una copia de la respuesta; la original queda igual.\n\n</details>\n\n[Datos por evaluación](evaluaciones.csv), [resumen por página](resumen.csv), [revisión de las reglas](auditoria.json), [configuración](manifiesto.json) y [plan registrado](../../docs/PILOTO-G2-G7-18OCT.md).\n`;
  fs.writeFileSync(path.join(dir,'INFORME.md'),text);return s;
}
if(require.main===module)report(path.resolve(__dirname,'..',process.argv[2]||'pilotos/g2-2026-10-18'));
module.exports={analyze,report};
