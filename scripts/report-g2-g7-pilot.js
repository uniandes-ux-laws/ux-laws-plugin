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
  return `${groups} ${groups==='1'?'grupo':'grupos'} de primer nivel; agrupación ${grouping}; acción principal ${actions[action]||action}; exige decisión: ${yesNo[decision]}; acciones que compiten: ${yesNo[competition]}`;
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
function report(dir){
  const s=analyze(dir),m=json(path.join(dir,'manifiesto.json')),group=m.group_id.toUpperCase(),applicable=s.validas-s.no_aplicables;
  let text=`# Piloto de ${group} · 18 de octubre de 2026\n\n${group==='G2'?'G2 revisa la organización de las opciones y la claridad de la acción principal.':'G7 revisa tamaños, separaciones y consistencia de los controles.'} ${s.terminadas===120&&s.errores_tecnicos===0?'El piloto terminó':'El piloto sigue incompleto'}. Se recibieron **${s.terminadas}/120 respuestas** sobre 24 páginas, con cinco evaluaciones independientes por página.\n\nHay **${s.validas} respuestas válidas, ${s.abstenciones} abstenciones, ${s.invalidas} inválidas, ${s.errores_tecnicos} errores técnicos y ${s.pendientes} pendientes**. Las respuestas válidas incluyen ${s.no_aplicables} «no aplica» (NA). Las abstenciones conservan la explicación de por qué no pudo asignarse un nivel.\n\n## Resultados\n\nLos porcentajes usan los ${applicable} puntajes aplicables. Los NA y las abstenciones se cuentan aparte.\n\n| Nivel | Evaluaciones | Porcentaje |\n|---|---:|---:|\n`;
  for(let i=0;i<5;i++)text+=`| ${i} | ${s.niveles[i]} | ${applicable?(100*s.niveles[i]/applicable).toFixed(1)+' %':'—'} |\n`;
  if(s.abstenciones){text+='\nEstas situaciones quedaron sin un nivel definido. Se agrupan según los juicios del evaluador; los motivos completos están en los datos por evaluación.\n\n| Situación observada | Abstenciones |\n|---|---:|\n';for(const [reason,count] of Object.entries(s.abstenciones_por_combinacion))text+=`| ${readableReason(reason)} | ${count} |\n`;}
  text+=`\n**${s.paginas_estables}/${s.paginas_con_cinco_validas} páginas** con cinco respuestas válidas mantuvieron el nivel. La regla usada para justificarlo se mantuvo en ${s.paginas_trigger_estable}. Hay **${s.evidencia_insuficiente}/${s.respuestas_conformes}** respuestas con evidencia insuficiente y **${s.desacuerdos_ancla}** discrepancias entre el nivel o su regla y las anclas registradas. Estas discrepancias quedan en la auditoría y en las estadísticas; los puntajes no se corrigen.\n\n<details>\n<summary>Resultados por página</summary>\n\n| Página | Válidas | Abstenciones | Respuestas | Nivel(es) más frecuente(s) | Proporción que lo repite | Diferencia de niveles | Reglas distintas |\n|---|---:|---:|---|---|---:|---:|---:|\n`;
  for(const p of s.paginas)text+=`| ${p.id} | ${p.validas} | ${p.abstenciones} | ${p.todas_respuestas.join(', ')||'—'} | ${p.modas.join(', ')||'—'} | ${p.fraccion_modal?.toFixed(2)??'—'} | ${p.rango??'—'} | ${p.triggers_distintos} |\n`;
  text+='\n</details>\n\nLos niveles no se promedian. La estabilidad del nivel se calcula solo para páginas con cinco respuestas válidas, incluyendo NA estables; las abstenciones y los empates se conservan por separado. Los resultados inválidos se excluyen del histograma principal, pero sus puntajes recibidos también se cuentan en `niveles_incluidos_invalidos` del resumen.\n\n## Límites y pendientes\n\n';
  text+=group==='G2'?'La rúbrica combina intervalos de cantidad con juicios de agrupación y dominancia. Algunas combinaciones no tienen nivel definido: esas respuestas pueden abstenerse. Los apoyos de decisión se revisan sobre el screenshot, y se registra esa lectura incluso al concluir que no hay apoyos. El resultado no representa una evaluación exclusivamente sobre wireframe.\n\n':'La mayor parte de las reglas de G7 se aplica a medidas ya calculadas. Por eso cualquier discrepancia de nivel o trigger ante los mismos datos debe revisarse como variación del evaluador. No hay lectura del screenshot. Las condiciones sin pares o familias conservan proporciones nulas; no prueban ausencia de problemas.\n\n';
  if(group==='G2'&&s.respuestas_conformes&&Object.keys(s.juicios).every(j=>JSON.parse(j).Ap===0))text+=`El evaluador no identificó apoyos de decisión en estas ${s.respuestas_conformes} respuestas. La reducción activa que exige el nivel 4 sigue pendiente de probar con casos apropiados.\n\n`;
  if(group==='G7'&&s.respuestas_conformes&&!s.niveles[3]&&!s.niveles[4])text+='No aparecieron niveles 3 ni 4. Este conjunto no permite comprobar cómo responde el evaluador en esas situaciones.\n\n';
  text+=`Las capturas de septiembre no registran todos los estados de los controles. Las relaciones ambiguas del inventario y las cajas parciales limitan la interpretación; se mantienen las medidas originales. El piloto no valida que los juicios visuales coincidan con expertos.\n\nPara cerrar ${group} falta ${group==='G2'?'acordar con Camilo cómo tratar las combinaciones sin nivel, completar los casos dorados consensuados y contrastar con expertos':'revisar los resultados con Camilo, completar los casos dorados consensuados y contrastar con expertos'}. Los niveles de referencia y la aprobación ética no se suponen.\n\n<details>\n<summary>Configuración y registro</summary>\n\n| Dato | Valor |\n|---|---|\n| Modelo solicitado | ${m.model_id} |\n| Herramienta | ${m.cli_version} |\n| Razonamiento | ${m.decoding.model_reasoning_effort} |\n| Medición | ${m.measurements_version} |\n| Commit del ejecutor | \`${m.git_commit}\` |\n\nCada solicitud usó una conversación nueva, sin herramientas, resultados previos ni instrucciones del proyecto. Se conservaron imágenes, rúbrica, escala, instrucciones, entradas, respuestas y registros de ejecución. La herramienta no expone temperatura ni top-p. El sistema añade únicamente la identificación de la corrida a una copia de la respuesta.\n\n</details>\n\n[Datos por evaluación](evaluaciones.csv), [resumen por página](resumen.csv), [revisión de anclas](auditoria.json), [configuración](manifiesto.json) y [plan registrado](../../docs/PILOTO-G2-G7-18OCT.md).\n`;
  fs.writeFileSync(path.join(dir,'INFORME.md'),text);return s;
}
if(require.main===module)report(path.resolve(__dirname,'..',process.argv[2]||'pilotos/g2-2026-10-18'));
module.exports={analyze,report};
