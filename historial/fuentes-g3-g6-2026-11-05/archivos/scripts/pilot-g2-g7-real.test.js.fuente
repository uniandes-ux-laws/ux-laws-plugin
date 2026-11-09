'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {expectedG2,expectedG7,expectedTriggerG7,validationProblems,anchorAudit,FIELDS,promptFor}=require('./pilot-g2-g7-contract');
const source=JSON.parse(fs.readFileSync(path.join(__dirname,'../calibracion/C02/measurements.json')));
const run={model_id:'gpt-6.1-sol',runtime:'codex-cli',repetition:1,prompt_hash:'a'.repeat(64),captured_at:'2026-09-10T00:00:00Z',decoding:{model_reasoning_effort:'low'},capture_sha256:{wireframe:'b'.repeat(64),screenshot:'c'.repeat(64)},measurements_version:'1.0.6',protocol_version:'0.1.0'};
const copy=v=>JSON.parse(JSON.stringify(v));
function sample(group){
  const input={group_id:group,[group]:copy(source[group]),pagina:{sanity_ok:true,consent_limpio:true}};
  const m=Object.fromEntries(FIELDS[group].map(k=>[k,copy(input[group][k])]));
  Object.assign(m,{motivo_abstencion:null,ancla_definida:true,lectura_screenshot:group==='g2'?['Ap']:[]});
  if(group==='g2')Object.assign(m,{agrupacion:'coherente',accion_primaria:'clara',pantalla_exige_decision:true,varias_acciones_compiten:false,Ap:0,apoyos_ids:[],reduccion_activa:false});
  else m.primary_larger=null;
  const raw={group_id:group,group_name:group,laws_subsumed:group==='g2'?['Ley de Hick','Sobrecarga de elección']:['Ley de Fitts'],channel:'wireframe',not_applicable:false,na_reason:null,score:group==='g2'?3:1,trigger:group==='g2'?'dominancia':'W_min',evidence_insufficient:true,measurements:m,findings:[],recommendations:['Revisar el objetivo afectado.']};
  return {input,raw};
}
const proportion=(n,d)=>({afectados:n,denominador:d,p:d?n/d:null,etiqueta:!d?null:!n?'impecable':n/d<=.1?'aislado':n/d<=.25?'frecuente':'generalizado'});
function motor(ns,ds=[100,100,100,100],larger=false){return Object.assign({g7_N_obj:100,primary_larger:larger},Object.fromEntries(ns.map((n,i)=>['g7_p_T'+(i+1),proportion(n,ds[i])])));}
test('G7 respeta límites 0,10, 0,25 y 0,50 y prioridad de combinaciones',()=>{
  assert.equal(expectedG7(motor([0,0,0,0])),3);assert.equal(expectedG7(motor([0,0,0,0],undefined,true)),4);
  assert.equal(expectedG7(motor([10,0,0,0])),3);assert.equal(expectedG7(motor([11,0,0,0])),2);
  assert.equal(expectedG7(motor([25,0,0,0])),2);assert.equal(expectedG7(motor([26,0,0,0])),1);
  assert.equal(expectedG7(motor([50,0,0,0])),1);assert.equal(expectedG7(motor([51,0,0,0])),0);
  assert.equal(expectedG7(motor([11,11,0,0])),1);assert.equal(expectedG7(motor([26,26,0,0])),0);
});
test('G7 no convierte denominadores cero en impecables ni en NA',()=>{assert.equal(expectedG7(motor([0,0,0,0],[100,0,100,0],true)),3);assert.equal(expectedG7({...motor([0,0,0,0]),g7_N_obj:0}),null);});
test('G7 desempata por T1,T2,T3,T4 y usa cocientes sin redondear',()=>{assert.equal(expectedTriggerG7(motor([20,20,0,0])),'holgura');assert.equal(expectedTriggerG7(motor([0,0,0,0])),'ninguna');const m=motor([0,0,0,0]);m.g7_p_T2=proportion(500001,1000000);m.g7_p_T2.p=.5;assert.equal(expectedG7(m),0);});
test('G2 exige todos los requisitos de cada ancla, no solo n1',()=>{
  const {raw}=sample('g2'),m=raw.measurements;assert.equal(expectedG2(m),3);
  assert.equal(expectedG2({...m,Ap:1,reduccion_activa:false}),3);assert.equal(expectedG2({...m,Ap:1,reduccion_activa:true}),4);
  assert.equal(expectedG2({...m,g2_n1:7,agrupacion:'parcial',accion_primaria:'no_domina'}),2);
  assert.equal(expectedG2({...m,g2_n1:10,agrupacion:'debil',varias_acciones_compiten:true}),1);
  assert.equal(expectedG2({...m,g2_n1:13,agrupacion:'ausente'}),0);
  assert.equal(expectedG2({...m,accion_primaria:'ausente',pantalla_exige_decision:true}),0);
  assert.equal(expectedG2({...m,g2_n1:7,agrupacion:'coherente'}),null);
});
for(const group of ['g2','g7']){
  test(group+': valida respuesta atribuida y rechaza una cifra cambiada',()=>{const {raw,input}=sample(group);assert.deepEqual(validationProblems(raw,input,run),[]);raw.measurements[FIELDS[group][0]]++;assert.ok(validationProblems(raw,input,run).some(e=>e.includes('fuente')));});
  test(group+': el límite ambiguo debe declararse',()=>{const {raw,input}=sample(group);raw.evidence_insufficient=false;assert.ok(validationProblems(raw,input,run).some(e=>e.includes('inventario')));});
  test(group+': no permite NA con objetivos',()=>{const {raw,input}=sample(group);raw.not_applicable=true;raw.score=null;raw.trigger=null;raw.na_reason='No veo controles';assert.ok(validationProblems(raw,input,run).some(e=>e.includes('no aplicabilidad')));});
  test(group+': un desacuerdo de ancla se conserva como hallazgo independiente de la conformidad',()=>{const {raw,input}=sample(group);raw.score=4;assert.deepEqual(validationProblems(raw,input,run),[]);assert.ok(anchorAudit(raw).issues.length);});
}
test('G2 conserva abstención aplicable, distinta de NA y nivel cero',()=>{const {raw,input}=sample('g2');raw.measurements.g2_n1=input.g2.g2_n1=7;raw.score=null;raw.trigger=null;raw.measurements.ancla_definida=false;raw.measurements.motivo_abstencion='No hay ancla para siete grupos coherentes.';assert.deepEqual(validationProblems(raw,input,run),[]);assert.deepEqual(anchorAudit(raw).issues,[]);});
test('G2 no acepta apoyos inventados ni recuentos duplicados',()=>{const {raw,input}=sample('g2');raw.measurements.Ap=1;raw.measurements.apoyos_ids=[-1];assert.ok(validationProblems(raw,input,run).some(e=>e.includes('apoyos')));});
test('G7 no acepta lectura de un screenshot que no recibió',()=>{const {raw,input}=sample('g7');raw.measurements.lectura_screenshot=['Ap'];assert.ok(validationProblems(raw,input,run).some(e=>e.includes('screenshot')));});
test('Los prompts no incluyen identidad de repetición ni resultados previos',()=>{for(const group of ['g2','g7']){const {input}=sample(group);const p=promptFor(input,'rubrica','escala');assert.equal(p,promptFor(copy(input),'rubrica','escala'));assert.ok(!p.includes('repetition'));}});
