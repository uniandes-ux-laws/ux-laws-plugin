#!/usr/bin/env node
'use strict';
// Solo lee juicios y genera derivados. No solicita evaluaciones ni los corrige.
const fs=require('fs'),path=require('path');
const {OUT,checkFiles,tasks}=require('./pilot-g5-progress');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const write=(f,x)=>fs.writeFileSync(f,JSON.stringify(x,null,2)+'\n');
function compare(raw,expected,diagnostic=false){
  const fields=['Q','evidence_insufficient'];
  if(expected.Q){fields.push('G_existe','steps_declared');if(expected.G_existe)fields.push('G_nombra','G_actual','G_forma');}
  const diffs=[];
  for(const key of fields){
    if(diagnostic&&expected[key]===null)continue;
    const actual=key==='evidence_insufficient'?raw[key]:raw.measurements[key];
    if(actual!==expected[key])diffs.push({campo:key,esperado:expected[key],recibido:actual});
  }
  const levelMatch=diagnostic?null:(raw.not_applicable===expected.not_applicable&&(expected.not_applicable?raw.score===null:raw.score===expected.score));
  return {coincide_nivel:levelMatch,diferencias_criterios:diffs};
}
function anchorAudit(raw){
  if(raw.not_applicable)return [];
  const m=raw.measurements,e=[];
  if(m.Q&&m.G_existe===false&&raw.score!==0)e.push('Q=true y G_existe=false sin nivel 0');
  if(m.Q&&m.G_existe&&m.G_nombra===false&&raw.score!==1)e.push('Indicador sin G_nombra y nivel distinto de 1');
  if(m.Q&&m.G_nombra&&m.G_actual&&m.G_forma===false&&raw.score!==2)e.push('G_nombra/G_actual verdaderos y G_forma falso sin nivel 2');
  if(m.Q&&['G_existe','G_nombra','G_actual','G_forma'].every(k=>m[k]===true)&&raw.score<3)e.push('Los cuatro criterios de progreso verdaderos con nivel menor de 3');
  if(raw.score===4&&m.J_final!==true)e.push('Nivel 4 sin J_final verdadero');
  return e;
}
function analyze(){
  const m=checkFiles(),expected=read(path.join(OUT,'EXPECTATIVAS-PREVIAS.json')).casos;
  const rows=tasks(m).map(t=>{
    const f=path.join(OUT,'trazas',t.key+'.json');
    const base={id:t.key,pagina:t.p.id,repeticion:t.r,uso:t.p.id==='P10'?'limite_sin_nivel_esperado':'nivel_esperado',estado:'pendiente',score:null,not_applicable:null,coincide_nivel:null,diferencias_criterios:[],conflictos_de_anclas:[]};
    if(!fs.existsSync(f))return base;
    const proof=read(f);Object.assign(base,{estado:proof.status,errores:proof.errors,thread_id:proof.thread_id,usage:proof.usage});
    if(proof.status!=='valido')return base;
    const raw=read(path.join(OUT,'respuestas',t.key+'.json')),exp=expected.find(c=>c.id===t.p.id).esperado;
    return {...base,score:raw.score,not_applicable:raw.not_applicable,evidence_insufficient:raw.evidence_insufficient,trigger:raw.trigger,measurements:raw.measurements,
      ...compare(raw,exp,t.p.id==='P10'),conflictos_de_anclas:anchorAudit(raw)};
  });
  const pages=m.pages.map(p=>{
    const all=rows.filter(r=>r.pagina===p.id),valid=all.filter(r=>r.estado==='valido'),values=valid.map(r=>r.not_applicable?'NA':r.score),nums=valid.filter(r=>!r.not_applicable).map(r=>r.score);
    const freq=new Map();for(const v of values)freq.set(v,(freq.get(v)||0)+1);const top=Math.max(0,...freq.values());
    return {id:p.id,estados:all.map(r=>r.estado),niveles:all.map(r=>r.estado==='valido'?(r.not_applicable?'NA':r.score):r.estado),
      validas:valid.length,modas:[...freq].filter(([,n])=>n===top).map(([v])=>v),rango_ordinal:nums.length?Math.max(...nums)-Math.min(...nums):null,
      estable_en_nivel:valid.length===5?new Set(values).size===1:null,estable_en_trigger:valid.length===5?new Set(valid.map(r=>r.trigger)).size===1:null,
      coincidencias_nivel:p.id==='P10'?null:all.filter(r=>r.coincide_nivel===true).length,con_limite:valid.filter(r=>r.evidence_insufficient).length};
  });
  const primary=rows.filter(r=>r.uso==='nivel_esperado');
  return {tipo:'prueba_sintetica; expectativas de diseño, no consenso experto',planeadas:45,intentadas:rows.filter(r=>r.estado!=='pendiente').length,
    validas:rows.filter(r=>r.estado==='valido').length,invalidas:rows.filter(r=>r.estado==='invalido').length,errores_tecnicos:rows.filter(r=>r.estado==='error_tecnico').length,pendientes:rows.filter(r=>r.estado==='pendiente').length,
    posiciones_con_nivel_esperado:40,posiciones_de_limite:5,coincidencias_nivel:primary.filter(r=>r.coincide_nivel===true).length,
    intentadas_con_nivel_esperado:primary.filter(r=>r.estado!=='pendiente').length,validas_con_nivel_esperado:primary.filter(r=>r.estado==='valido').length,
    evaluaciones_con_diferencias_de_criterios:rows.filter(r=>r.diferencias_criterios.length).length,
    evaluaciones_con_conflicto_de_anclas:rows.filter(r=>r.conflictos_de_anclas.length).length,
    paginas_estables_en_nivel:pages.filter(p=>p.estable_en_nivel===true).length,paginas_estables_en_trigger:pages.filter(p=>p.estable_en_trigger===true).length,
    paginas_con_cinco_validas:pages.filter(p=>p.validas===5).length,excluidas:['P06'],paginas:pages,evaluaciones:rows};
}
function report(s){
  const complete=s.pendientes===0;
  return `# G5: prueba separada de progreso\n\n19 de octubre de 2026. **${complete?'Las 45 posiciones tienen un intento conservado.':'Prueba en curso: '+s.intentadas+' de 45 posiciones con intento conservado.'}** Hay ${s.validas} respuestas válidas, ${s.invalidas} inválidas y ${s.errores_tecnicos} fallos técnicos. Quedan ${s.pendientes} posiciones pendientes. El piloto general de 120 respuestas se conserva por separado.\n\n## Qué probamos\n\nNueve pantallas locales, con cinco conversaciones independientes por pantalla. Ocho tienen un nivel o NA esperado y P10 solo revisa un recorte. P06 quedó excluida antes de empezar porque falta aclarar su ancla con Camilo. Usamos gpt-6.1-sol, razonamiento medium, CLI 0.162.0-alpha.17.2 y medidas 1.0.6. Los [criterios de esta prueba](REGISTRO-PREVIO.md) y las [expectativas](EXPECTATIVAS-PREVIAS.json) se guardaron antes de evaluar; las expectativas no se entregaron al modelo.\n\n## Qué salió\n\n| Caso | Niveles o estado de las cinco repeticiones | Coinciden con el nivel esperado | Marcas de evidencia insuficiente |\n|---|---|---|---|\n${s.paginas.map(p=>`| ${p.id} | ${p.niveles.join(' / ')} | ${p.id==='P10'?'No se compara el nivel':p.coincidencias_nivel+'/5'} | ${p.con_limite}/${p.validas} válidas |`).join('\n')}\n\nEn las 40 posiciones con nivel esperado hay **${s.coincidencias_nivel} coincidencias**. Se han intentado ${s.intentadas_con_nivel_esperado} de esas 40 posiciones, con ${s.validas_con_nivel_esperado} respuestas válidas. ${complete?'Las inválidas y los errores no se quitan del total de 40.':'Todavía no se interpreta esta cifra como resultado final.'} P10 tiene otras cinco posiciones y no entra en ese denominador. NA significa que el constructo no aplica; no equivale a nivel cero.\n\nHay ${s.paginas_con_cinco_validas} pantallas con cinco respuestas válidas: ${s.paginas_estables_en_nivel} mantuvieron el nivel y ${s.paginas_estables_en_trigger} mantuvieron el trigger. Se encontraron ${s.evaluaciones_con_diferencias_de_criterios} respuestas con diferencias frente a algún criterio esperado y ${s.evaluaciones_con_conflicto_de_anclas} con una contradicción en las reglas comprobadas. Las diferencias de criterios se muestran por campo en [resumen.json](resumen.json); no se reescriben las respuestas para resolverlas.\n\n${s.evaluaciones.some(r=>r.coincide_nivel===false||r.diferencias_criterios.length||r.conflictos_de_anclas.length)?'### Respuestas que requieren revisar\n\n'+s.evaluaciones.filter(r=>r.coincide_nivel===false||r.diferencias_criterios.length||r.conflictos_de_anclas.length).map(r=>`- [${r.id}](respuestas/${r.id}.json): ${r.coincide_nivel===false?'nivel distinto del esperado; ':''}${r.diferencias_criterios.map(d=>d.campo+': se esperaba '+d.esperado+' y respondió '+d.recibido).join('; ')}${r.conflictos_de_anclas.length?'; '+r.conflictos_de_anclas.join('; '):''}`).join('\n')+'\n\n':''}## Qué podemos concluir\n\nEsta es una prueba con ejemplos hechos por nosotros. La coincidencia se compara con expectativas de diseño y no mide acuerdo con expertos. Aunque una respuesta coincida, todavía hace falta la validación humana. ${complete?'La ejecución quedó terminada; cualquier diferencia observada sigue siendo un resultado que hay que explicar.':'La ejecución está incompleta; no se afirma que la parte de progreso ya esté probada con todas las repeticiones.'}\n\nQuedan por resolver el ancla de P06, un ejemplo positivo específico de nivel 4 y la comparación con expertos. Las capturas son nuevas y tienen menos de 50 nodos por su tamaño: se conserva la advertencia de sanidad, sin modificar el umbral. G5 usa el screenshot para los criterios que requieren leer; no es una comparación pura entre dos canales.\n\n## Dónde revisar\n\n- [evaluaciones.csv](evaluaciones.csv): una fila por cada una de las 45 posiciones, incluidas las pendientes.\n- [resumen.json](resumen.json): niveles, dispersión, diferencias por criterio y estados.\n- respuestas/: originales recibidos; resultados/: las mismas respuestas con datos de ejecución añadidos.\n- trazas/: eventos, conversación, consumo, hashes y errores de cada intento.\n\nEl ejecutor no vuelve a lanzar posiciones que ya tengan un intento, aunque el resultado no coincida con la expectativa. No se publican estos archivos en GitHub desde esta prueba.\n`;
}
function main(){
  const s=analyze();write(path.join(OUT,'resumen.json'),s);
  const cols=['id','pagina','repeticion','uso','estado','score','not_applicable','evidence_insufficient','trigger','coincide_nivel','diferencias_criterios','conflictos_de_anclas'];
  const cell=v=>'"'+(v==null?'':typeof v==='object'?JSON.stringify(v):String(v)).replace(/"/g,'""')+'"';
  fs.writeFileSync(path.join(OUT,'evaluaciones.csv'),cols.join(',')+'\n'+s.evaluaciones.map(r=>cols.map(k=>cell(r[k])).join(',')).join('\n')+'\n');
  fs.writeFileSync(path.join(OUT,'INFORME.md'),report(s));
  console.log(JSON.stringify({intentadas:s.intentadas,validas:s.validas,invalidas:s.invalidas,errores:s.errores_tecnicos,pendientes:s.pendientes,coincidencias:s.coincidencias_nivel}));
}
if(require.main===module)main();
module.exports={compare,anchorAudit,analyze};
