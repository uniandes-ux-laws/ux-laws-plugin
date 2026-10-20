'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),{g3}=require('../measure/g3-g6-evidence'),{expectedG3,expectedG6,distribution,unionArea,validationProblems,anchorAudit}=require('./g3-g6-contract');
const vp={width:1440,height:900};
const nodes=[{id:1,parentId:0,nodeName:'MAIN',ink:{x:0,y:0,w:1440,h:900},visibleBoundary:{visible:false}},...Array.from({length:8},(_,i)=>({id:i+2,parentId:1,nodeName:'P',ink:{x:20,y:20+i*90,w:400,h:70},visibleBoundary:{visible:false}}))];
const input={group_id:'g3',pagina:{viewport:vp,sanity_ok:true,consent_limpio:true},g3:g3(nodes,vp)};
const m3=()=>({region_id:1,U:2,B:2,H:0,V:false,X:0,blocks:1,unidades_ids:[2,3],bloques:[{id:1,unidades_ids:[2,3],encabezado_id:2,mezcla:false}],X_ids:[],X_compite:false,X_area_mayor:false,V_evidencia_ids:[],segmentacion:'encabezada',difiere_contenido:false,mejora_ids:[],inventario_completo:true,region_justification:'Dos unidades de la región visible',lectura_screenshot:['U','H','V','X'],ancla_definida:true,motivo_abstencion:null});
const run={model_id:'gpt-6.1-sol',runtime:'codex-cli',repetition:1,prompt_hash:'a'.repeat(64),captured_at:'2026-10-20T00:00:00Z',decoding:{model_reasoning_effort:'low'},capture_sha256:{screenshot:'a'.repeat(64),wireframe:'b'.repeat(64)},measurements_version:'1.1.0',protocol_version:'0.1.0'};
const raw3=()=>({group_id:'g3',group_name:'Capacidad y segmentación',laws_subsumed:['Miller'],channel:'wireframe',not_applicable:false,na_reason:null,score:3,trigger:'ninguna',evidence_insufficient:false,measurements:m3(),findings:[],recommendations:[]});
test('G3 conserva los huecos de las anclas y prioriza dependencia de datos visible',()=>{
 const m={...m3(),U:6,unidades_ids:[2,3,4,5,6,7]};assert.equal(expectedG3(m,input).score,null);
 assert.equal(expectedG3({...m,V:true},input).score,0);
 assert.equal(expectedG3({...m,U:10,segmentacion:'debil'},input).score,1);
 assert.equal(expectedG3({...m3(),difiere_contenido:true},input).score,4);
});
test('la unión de áreas no duplica cajas superpuestas',()=>{assert.equal(unionArea([{x:0,y:0,w:10,h:10},{x:5,y:0,w:10,h:10}]),150);});
test('G3 rechaza ids y conteos inventados sin alterar la respuesta',()=>{
 const raw=raw3();assert.deepEqual(validationProblems(raw,input,run),[]);
 raw.measurements.unidades_ids.push(999);const before=JSON.stringify(raw);assert.ok(validationProblems(raw,input,run).length);assert.equal(JSON.stringify(raw),before);
});
test('un desacuerdo con el ancla se conserva y se audita separado del transporte',()=>{
 const raw=raw3();raw.score=4;raw.trigger='segmentacion';const before=JSON.stringify(raw);
 assert.deepEqual(validationProblems(raw,input,run),[]);assert.ok(anchorAudit(raw,input).issues.length);assert.equal(JSON.stringify(raw),before);
});
test('G3 no convierte falta de región en NA',()=>{const raw=raw3();raw.not_applicable=true;raw.na_reason='No hay región';raw.score=null;raw.trigger=null;raw.measurements.region_id=null;assert.ok(validationProblems(raw,input,run).some(e=>e.includes('NA no demostrado')));});
function m6(){return {R:0,T:0,K_ap:1,K:0,elimina_trabajo:false,R_ids:[],bloques_ids:[1],R_bloques_ids:[],convenciones:Array.from({length:8},(_,i)=>({id:'K'+(i+1),aplica:i===0,cumple:i===0?true:null}))};}
test('G6 no trata una convención indeterminada como cumplida ni no aplicable',()=>{
 const m=m6();m.convenciones[1].aplica=null;assert.equal(expectedG6(m).score,null);m.K=3;assert.equal(expectedG6(m).score,0);
});
test('G6 distingue mayoría, caso aislado y combinación de R no cubierta',()=>{
 const m={...m6(),R:1,T:1,bloques_ids:[1,2,3,4],R_bloques_ids:[1,2]};assert.equal(distribution(m),'intermedia');assert.equal(expectedG6(m).score,1);
 m.R_bloques_ids=[1,2,3];assert.equal(expectedG6(m).score,0);
 m.T=0;m.K_ap=1;m.bloques_ids=Array.from({length:10},(_,i)=>i+1);m.R_bloques_ids=[1];assert.equal(expectedG6(m).score,2);
 m.bloques_ids=[1,2,3,4];assert.equal(expectedG6(m).score,null);
});
