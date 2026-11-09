
'use strict';
// Comprobaciones estructurales adaptadas del ejecutor histórico; reglas nuevas versionadas.
const fs=require('fs'),path=require('path'),Ajv=require('ajv/dist/2020'),addFormats=require('ajv-formats');
const ajv=new Ajv({strict:false,allErrors:true});addFormats(ajv);
const validTransport=ajv.compile(JSON.parse(fs.readFileSync(path.join(__dirname,'g4-response-v2.schema.json'))));
const validProject=ajv.compile(JSON.parse(fs.readFileSync(path.join(__dirname,'../shared/schemas/group-result.schema.json'))));
function expectedScore(m){
 const I=m.I_principal;if(m.main_set_id===null||I===null)return null;
 if(m.Bn>=1&&(I===0||I>=3))return 0;
 if(m.Bn>=1||I===0||I>=3)return 1;
 if(I===2||I===1&&m.P===false||I===1&&m.P===true&&m.Cn>0)return 2;
 if(I===1&&m.P===true&&m.Cn===0)return m.channels_of_isolation>=2?4:3;
 return null;
}
function triggerFor(m){
 const level=expectedScore(m);if(level===null)return null;
 if(m.Bn>=1)return 'Bn';
 if(m.I_principal===0||m.I_principal>=2)return 'I';
 if(m.P===false)return 'P';if(m.Cn>0)return 'Cn';
 return level===4?'canales':'P';
}
function promptFor(input,rubric,scale){return require('./pilot-g4-real').promptFor(input,rubric,scale)+'\n\nContrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.';}
function validationProblems(raw,input,run,nodeIds) {
  if(!validTransport(raw))return ['transporte: '+ajv.errorsText(validTransport.errors)];
  const problems=[],m=raw.measurements,g=input.g4;
  if(!validProject({...raw,run}))problems.push('esquema del proyecto: '+ajv.errorsText(validProject.errors));
  for(const k of ['sets','g4_conjuntos_pares_total'])if(m[k]!==g.g4_conjuntos_pares_total)problems.push(k+' cambió respecto a la fuente');
  const sets=new Map(g.g4_conjuntos_pares.map(s=>[s.conjunto,s]));
  const judged=new Map(m.juicios_conjuntos.map(j=>[j.conjunto,j]));
  if(judged.size!==m.juicios_conjuntos.length||judged.size!==sets.size||[...judged.keys()].some(k=>!sets.has(k)))problems.push('juicios de conjuntos incompletos, duplicados o inventados');
  const isolated=new Set();
  for(const j of m.juicios_conjuntos){const s=sets.get(j.conjunto),ids=new Set(s?.miembros.map(v=>v.id)||[]);
    if(new Set(j.aislados_ids).size!==j.aislados_ids.length||j.aislados_ids.some(id=>!ids.has(id))||(!j.equivalentes&&j.aislados_ids.length))problems.push('aislados incompatibles con su conjunto');
    if(j.equivalentes)for(const id of j.aislados_ids)isolated.add(id);
  }
  if(m.I_total!==isolated.size)problems.push('I_total incompatible con ids únicos');
  const selected=sets.get(m.main_set_id),judgment=judged.get(m.main_set_id);
  if(m.main_set_id!==null&&(!selected||!judgment?.equivalentes))problems.push('conjunto principal inexistente o no equivalente');
  if(selected&&m.I_principal!==judgment?.aislados_ids.length)problems.push('I_principal incompatible con sus ids');
  if(!selected&&m.I_principal!==null)problems.push('I_principal sin conjunto principal');
  if(selected&&(selected.padre_raiz_virtual||selected.parcial)&&!raw.evidence_insufficient)problems.push('límite estructural sin declarar');
  if(m.I_principal!==1&&(m.P!==null||m.canales_aislamiento.length||m.channels_of_isolation!==0))problems.push('P o canales sin único aislado');
  if(m.I_principal===1&&!m.lectura_screenshot.includes('P'))problems.push('lectura de P sin declarar');
  if(m.I_principal!==2&&m.jerarquia_entre_dos!==null)problems.push('jerarquía entre dos sin dos aislados');
  if(new Set(m.canales_aislamiento).size!==m.canales_aislamiento.length||m.channels_of_isolation!==m.canales_aislamiento.length)problems.push('canales duplicados o conteo incompatible');
  const parents=new Map((input.geometria_nodos||[]).map(n=>Array.isArray(n) ? n : [n.id,n.parentId]));
  for(const [key,source,count] of [['Bn_ids','g4_banner_candidatos','Bn'],['Cn_ids','g4_cromo_candidatos','Cn']]){
    const allowed=new Set(g[source].map(n=>n.id)),ids=m[key];
    if(new Set(ids).size!==ids.length||ids.some(id=>!allowed.has(id))||m[count]!==ids.length)problems.push(count+' incompatible con candidatos');
    for(const id of ids){let p=parents.get(id),seen=new Set();while(p!=null&&!seen.has(p)){if(ids.includes(p)){problems.push(count+' duplica ancestro y descendiente');break;}seen.add(p);p=parents.get(p);}}
  }
  if(raw.not_applicable!==(g.g4_conjuntos_pares_total===0))problems.push('no aplicabilidad incompatible con candidatos');
  if(raw.not_applicable){if(raw.score!==null||raw.trigger!==null||!raw.na_reason||m.ancla_definida)problems.push('NA sin razón o con puntaje');}
  else{
    const expected=expectedScore(m);
    if(expected===null){if(raw.score!==null||raw.trigger!==null||m.ancla_definida||!raw.evidence_insufficient||!m.motivo_abstencion)problems.push('combinación sin ancla debe conservarse como abstención');}
    else if(raw.score!==expected||!m.ancla_definida||m.motivo_abstencion!==null||raw.trigger===null)problems.push('puntaje incompatible con anclas declaradas');
    if(raw.na_reason!==null)problems.push('razón NA en resultado aplicable');
  }
  if(raw.score!==null){
    if(raw.trigger!==triggerFor(m))problems.push('trigger incompatible con la condición que fija el nivel');
    if(m.I_principal===1&&m.channels_of_isolation===0)problems.push('único aislado sin canal visual declarado');
  }
  if((input.pagina?.sanity_ok===false||input.pagina?.consent_limpio===false)&&!raw.evidence_insufficient)problems.push('captura limitada sin declarar');
  if(raw.score!==null&&raw.score<=2&&!raw.recommendations.length)problems.push('puntaje bajo sin recomendaciones');
  if(nodeIds&&raw.findings.some(f=>f.node_ids.some(id=>!nodeIds.has(id))))problems.push('hallazgo con id ausente');
  if(m.I_principal===2&&m.jerarquia_entre_dos===null&&!raw.evidence_insufficient)problems.push('jerarquía indeterminada sin declarar');
  return problems;
}

module.exports={expectedScore,triggerFor,promptFor,validationProblems};
