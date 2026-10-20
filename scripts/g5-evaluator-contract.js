'use strict';
// Datos de evaluación: no cambia las mediciones originales ni asigna juicios visuales.
const fs=require('fs'),path=require('path');
const Ajv=require('ajv/dist/2020'),addFormats=require('ajv-formats');
const {promptFor:legacyPrompt}=require('./pilot-g5-real');
const ajv=new Ajv({strict:false,allErrors:true});addFormats(ajv);
const schema=JSON.parse(fs.readFileSync(path.join(__dirname,'g5-response-v2.schema.json')));
const valid=ajv.compile(schema);
const project=ajv.compile(JSON.parse(fs.readFileSync(path.join(__dirname,'../shared/schemas/group-result.schema.json'))));
function withoutClasses(input){
  const out=structuredClone(input);
  for(const c of out.g5.g5_indicador_paso_candidatos)delete c.class;
  return out;
}
function progressAnchor(m){
  if(m.Q!==true)return null;
  if(m.G_existe===false)return {score:0,trigger:'G_existe'};
  if(m.G_existe!==true)return null;
  if(m.G_nombra===false)return {score:1,trigger:'G_nombra'};
  if(m.G_nombra!==true)return null;
  if(m.G_actual===false)return {score:1,trigger:'G_actual'};
  if(m.G_actual!==true)return null;
  if(m.G_forma===false)return {score:2,trigger:'G_forma'};
  if(m.G_forma!==true)return null;
  return m.J_final===true&&m.final_compite_con_inicio===false?{score:4,trigger:'J_final'}:{score:3,trigger:'G_forma'};
}
function promptV2(input,rubric,scale){
  return legacyPrompt(input,rubric,scale)+'\n\n'+[
    'Contrato G5 0.2.0. Si Q=true, aplica las condiciones en orden: sin indicador=0/G_existe; si no nombra=1/G_nombra; si nombra pero no marca el actual=1/G_actual; si nombra y marca el actual pero G_forma=false=2/G_forma; si los cuatro G son verdaderos=3/G_forma.',
    'El nivel 4 añade J_final=true y final_compite_con_inicio=false. Este último es un juicio sobre el wireframe: el final no puede tener un peso igual o mayor que el inicio. Si compite, conserva 3; si no puedes decidir, no acredites el extra y declara el límite. No uses un umbral inventado.',
    'Si J_final no es verdadero, final_compite_con_inicio es null. No uses ninguna como trigger. Q=false: nivel 0 usa lista_plana, niveles 1/2/3 usan J_inicio y nivel 4 usa J_final; NA mantiene score y trigger nulos.',
    'Los candidatos a indicador conservan ids, etiquetas de elemento y cajas. Sus clases CSS no se entregan. Esta retirada de metadatos no significa por sí sola que haya evidencia insuficiente: decide si la evidencia geométrica y la lectura autorizada permiten el juicio.',
  ].join('\n\n');
}
function validateV2(raw,input,run,nodeIds){
  if(!valid(raw))return ['transporte: '+ajv.errorsText(valid.errors)];
  const errors=[],m=raw.measurements,g=input.g5;
  if(!project({...raw,run}))errors.push('esquema del proyecto: '+ajv.errorsText(project.errors));
  for(const k of ['g5_listas_total','g5_lista_principal_sugerida','g5_lista_principal_sugerida_id'])if(m[k]!==g[k])errors.push(k+' cambió respecto a la fuente');
  const selected=g.g5_listas.find(l=>l.id_lista===m.main_list_id);
  if(m.main_list_id!==null&&!selected)errors.push('lista principal inexistente');
  if(selected&&selected.id_padre!==m.main_list_parent_id)errors.push('padre distinto de la lista seleccionada');
  if(!selected&&(m.main_list_parent_id!==null||m.J_inicio!==null||m.J_final!==null))errors.push('juicios de extremos sin lista principal');
  if(selected&&(selected.parcial||selected.orden_ambiguo||selected.padre_raiz_virtual)&&!raw.evidence_insufficient)errors.push('límite estructural sin declarar');
  const na=!m.Q&&g.g5_listas_total===0;
  if(raw.not_applicable!==na)errors.push('no aplicabilidad incompatible con la fuente');
  if(na){if(raw.score!==null||raw.trigger!==null||!raw.na_reason)errors.push('NA sin razón o con puntaje');}
  else if(raw.score===null||raw.trigger===null)errors.push('aplicable sin puntaje o trigger');
  if(!na&&raw.na_reason!==null)errors.push('razón de NA en una respuesta aplicable');
  if(m.Q&&!na){const anchor=progressAnchor(m);if(!anchor||raw.score!==anchor.score||raw.trigger!==anchor.trigger)errors.push('nivel o trigger incompatible con los juicios de progreso');}
  if(!m.Q&&!na){
    const trigger=raw.score===0?'lista_plana':raw.score===4?'J_final':'J_inicio';
    if(raw.trigger!==trigger)errors.push('trigger no corresponde a la jerarquía de posición');
    if(raw.score>=3&&m.J_inicio!==true)errors.push('nivel 3/4 sin J_inicio');
    if(raw.score===4&&(m.J_final!==true||m.final_compite_con_inicio!==false))errors.push('nivel 4 sin final diferenciado de menor peso');
  }
  if(m.J_final!==true&&m.final_compite_con_inicio!==null)errors.push('competencia declarada cuando J_final no es verdadero');
  if(m.J_final===true&&m.final_compite_con_inicio===null&&!raw.evidence_insufficient)errors.push('juicio de competencia indeterminado sin declarar');
  if(m.Q&&m.G_nombra&&m.G_actual&&m.G_forma===false&&!raw.evidence_insufficient)errors.push('límite del estado en wireframe sin declarar');
  if(!m.lectura_screenshot.includes('Q'))errors.push('lectura de Q sin registrar');
  if(m.Q)for(const k of ['G_nombra','G_actual','G_forma'])if(!m.lectura_screenshot.includes(k))errors.push('lectura sin registrar: '+k);
  if(raw.score!==null&&raw.score<=2&&!raw.recommendations.length)errors.push('puntaje bajo sin recomendaciones');
  if(nodeIds&&raw.findings.some(f=>f.node_ids.some(id=>!nodeIds.has(id))))errors.push('id de hallazgo inexistente');
  return errors;
}
module.exports={withoutClasses,progressAnchor,promptV2,validateV2};
