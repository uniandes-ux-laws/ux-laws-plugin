'use strict';
// Separa conformidad de datos y aplicación de anclas. Un desacuerdo de ancla
// se audita, no se borra ni se convierte artificialmente en una respuesta inválida.
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const Ajv=require('ajv/dist/2020'),addFormats=require('ajv-formats');
const ROOT=path.resolve(__dirname,'..'),ajv=new Ajv({strict:false,allErrors:true});addFormats(ajv);
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const schemas=Object.fromEntries(['g2','g7'].map(g=>[g,ajv.compile(load(path.join(__dirname,g+'-response.schema.json')))]));
const project=ajv.compile(load(path.join(ROOT,'shared/schemas/group-result.schema.json')));
const FIELDS={g2:['g2_n_total','g2_n1','g2_n_max','g2_fraccion_agrupada','g2_inventario_ambiguo'],g7:['g7_N_obj','g7_W_min','g7_N_bajo24','g7_N_bajo24_sin_holgura','g7_S_min','g7_families_consistent','g7_inventario_ambiguo','g7_p_T1','g7_p_T2','g7_p_T3','g7_p_T4']};
function expectedG2(m){
  if(m.g2_n_total===0)return null;
  if((m.g2_n1>12&&m.agrupacion==='ausente')||(m.accion_primaria==='ausente'&&m.pantalla_exige_decision===true))return 0;
  if(m.g2_n1>=9&&m.g2_n1<=12&&m.agrupacion==='debil'&&m.varias_acciones_compiten===true)return 1;
  if(m.g2_n1>=6&&m.g2_n1<=8&&m.agrupacion==='parcial'&&m.accion_primaria==='no_domina')return 2;
  if(m.g2_n1<=5&&m.agrupacion==='coherente'&&m.accion_primaria==='clara')return m.Ap>=1&&m.reduccion_activa===true?4:3;
  return null;
}
function expectedG7(m){
  if(m.g7_N_obj===0)return null;
  const ps=[1,2,3,4].map(i=>m['g7_p_T'+i]);
  const observed=ps.filter(p=>p.denominador>0),ratio=p=>p.afectados/p.denominador;
  if(observed.filter(p=>p.etiqueta==='generalizado').length>=2||observed.some(p=>ratio(p)>.5))return 0;
  if(observed.some(p=>p.etiqueta==='generalizado')||observed.filter(p=>p.etiqueta==='frecuente').length>=2)return 1;
  if(observed.some(p=>p.etiqueta==='frecuente'))return 2;
  return ps.every(p=>p.etiqueta==='impecable')&&m.primary_larger===true?4:3;
}
function expectedTriggerG7(m){
  const rows=[1,2,3,4].map(i=>({i,p:m['g7_p_T'+i]})).filter(v=>v.p.denominador>0&&v.p.afectados>0);
  rows.sort((a,b)=>b.p.afectados/b.p.denominador-a.p.afectados/a.p.denominador||a.i-b.i);
  return rows.length?['holgura','S_min','W_min','consistencia'][rows[0].i-1]:'ninguna';
}
function validationProblems(raw,input,run,nodeIds){
  const group=input.group_id,valid=schemas[group];
  if(!valid(raw))return ['transporte: '+ajv.errorsText(valid.errors)];
  const errors=[],m=raw.measurements,g=input[group];
  if(!project({...raw,run}))errors.push('esquema del proyecto: '+ajv.errorsText(project.errors));
  for(const k of FIELDS[group])try{assert.deepEqual(m[k],g[k]);}catch{errors.push(k+' distinto de la fuente');}
  const count=group==='g2'?g.g2_n_total:g.g7_N_obj;
  if(raw.not_applicable!==(count===0))errors.push('no aplicabilidad incompatible con inventario');
  if(raw.not_applicable){if(raw.score!==null||raw.trigger!==null||!raw.na_reason)errors.push('NA sin razón o con puntaje');}
  else if(raw.na_reason!==null)errors.push('razón NA en respuesta aplicable');
  if(!raw.not_applicable&&raw.score===null&&(!raw.evidence_insufficient||!m.motivo_abstencion||raw.trigger!==null))errors.push('abstención sin explicación');
  if(raw.score!==null&&raw.trigger===null)errors.push('puntaje sin trigger');
  if((g[group+'_inventario_ambiguo']||input.pagina.sanity_ok===false||input.pagina.consent_limpio===false)&&!raw.evidence_insufficient)errors.push('límite de captura o inventario sin declarar');
  if(raw.score!==null&&raw.score<=2&&!raw.recommendations.length)errors.push('puntaje bajo sin recomendación');
  if(nodeIds&&raw.findings.some(f=>f.node_ids.some(id=>!nodeIds.has(id))))errors.push('hallazgo con id ausente');
  if(group==='g2'){
    const ids=new Set(g.g2_Ap_candidatos.map(c=>c.id));
    if(new Set(m.apoyos_ids).size!==m.apoyos_ids.length||m.apoyos_ids.some(id=>!ids.has(id))||m.Ap!==m.apoyos_ids.length)errors.push('apoyos incompatibles con candidatos');
    if(new Set(m.lectura_screenshot).size!==m.lectura_screenshot.length||!m.lectura_screenshot.includes('Ap'))errors.push('consulta textual de Ap sin declarar');
    if([m.agrupacion,m.accion_primaria].includes('indeterminada')&&!raw.evidence_insufficient)errors.push('juicio indeterminado sin límite');
  }else if(m.lectura_screenshot.length)errors.push('G7 no recibe screenshot');
  return errors;
}
function anchorAudit(raw){
  const m=raw.measurements,group=raw.group_id,expected=group==='g2'?expectedG2(m):expectedG7(m),problems=[];
  if(raw.not_applicable)return {expected_score:null,expected_trigger:null,issues:[]};
  if(raw.score!==expected)problems.push('nivel distinto de las anclas para sus juicios');
  if(m.ancla_definida!==(expected!==null))problems.push('declaración de ancla incompatible');
  if(expected===null&&!m.motivo_abstencion)problems.push('falta motivo de abstención');
  if(expected!==null&&m.motivo_abstencion!==null)problems.push('motivo de abstención con ancla definida');
  const trigger=group==='g7'?expectedTriggerG7(m):null;
  if(group==='g7'&&raw.score!==null&&raw.trigger!==trigger)problems.push('trigger distinto de la condición de mayor proporción');
  if(group==='g2'&&raw.score===4&&raw.trigger!=='Ap')problems.push('nivel 4 sin trigger Ap');
  return {expected_score:expected,expected_trigger:trigger,issues:problems};
}
function promptFor(input,rubric,scale){
  const group=input.group_id;
  return [
    `Evalúa únicamente ${group.toUpperCase()} con la rúbrica completa adjunta. Devuelve JSON compacto, sin sangría ni texto fuera del objeto. La infraestructura añade únicamente run; no infieras repetición o modelo.`,
    group==='g2'?'La primera imagen es el wireframe: juzga ahí agrupación y jerarquía, sin suponer una tarea externa. La segunda es el screenshot y solo se permite para Ap; registra lectura_screenshot=["Ap"] también al concluir Ap=0. Los candidatos son sugerencias por clase CSS, no apoyos confirmados. No añadas apoyos fuera de g2_Ap_candidatos; si faltan, declara el límite. Ap es la longitud de apoyos_ids. Un candidato con clase default no demuestra un valor por defecto sensato.':'Solo recibes el wireframe. No se suministra screenshot ni texto de la página. Repite las cuatro proporciones completas, incluidos denominadores, etiquetas, ids y pares. No midas ni recuentes la imagen. lectura_screenshot=[].',
    'Copia los campos de fuente exigidos exactamente. No cambies cifras, cajas, inventario, proporciones o etiquetas. Usa ids suministrados para hallazgos; si no hay una caja específica pertinente, usa el viewport. Emite recomendaciones concretas para score<=2. Conserva todas las limitaciones.',
    'Si el inventario es ambiguo o sanity_ok/consent_limpio son false, marca evidence_insufficient=true y explica qué no se puede asegurar. La falta de atributos de estado de las capturas antiguas es un límite conocido: decláralo sin inventar estados deshabilitados.',
    group==='g2'?'Clasifica agrupacion como ausente, debil, parcial, coherente o indeterminada, y accion_primaria como ausente, no_domina, clara o indeterminada. pantalla_exige_decision y varias_acciones_compiten son juicios visibles, no tareas supuestas. Ap>=1 no basta para nivel4: exige además nivel3 y reduccion_activa de carga mediante divulgación progresiva, valor por defecto sensato o secuenciación. Si esa mejora no se confirma, conserva nivel3 y declara la duda cuando corresponda.':'Aplica las anclas en orden 0,1,2,3/4. Usa las etiquetas suministradas; para p>0.50 y desempates usa el cociente afectados/denominador sin redondear. Un denominador cero conserva p y etiqueta null: no es impecable ni NA. Nivel4 exige las cuatro etiquetas impecables y primary_larger=true; si no se confirma ese añadido, conserva el nivel3 y declara la duda.',
    group==='g2'?'No inventes reglas para combinar conteos y juicios. Lee literalmente cada nivel y prioriza 0, luego1, luego2, luego3/4. Si ninguna ancla cubre la combinación, abstente: score=null,trigger=null,not_applicable=false,evidence_insufficient=true,ancla_definida=false,motivo_abstencion concreto. Con nivel: ancla_definida=true,motivo_abstencion=null. No redondees n1 ni puntúes por el intervalo de n1 ignorando los otros requisitos.':'T1→holgura,T2→S_min,T3→W_min,T4→consistencia. El trigger es la condición afectada con mayor p; empate T1,T2,T3,T4. Si ninguna tiene afectados, usa ninguna. Con nivel: ancla_definida=true,motivo_abstencion=null.',
    'NA solo cuando g2_n_total=0 (G2) o g7_N_obj=0 (G7); score y trigger null, razón explícita, ancla_definida=false. Las abstenciones y las respuestas incómodas se conservan, no se sustituyen.',
    'El historial incluido en la skill explica su procedencia; no lo uses como distribución objetivo ni como puntaje esperado de esta página.',
    '# Escala\n'+scale,'# Rúbrica completa\n'+rubric,'# Datos medidos\n'+JSON.stringify(input)
  ].join('\n\n');
}
module.exports={FIELDS,expectedG2,expectedG7,expectedTriggerG7,validationProblems,anchorAudit,promptFor};
