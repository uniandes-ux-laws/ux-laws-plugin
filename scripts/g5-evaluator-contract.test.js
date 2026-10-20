'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {withoutClasses,progressAnchor}=require('./g5-evaluator-contract');
const {validateV2}=require('./g5-evaluator-contract');
test('la proyección retira solo las clases, sin modificar medidas ni el original',()=>{
  const input={pagina:{id:'x'},g5:{g5_listas:[{n:4,ids:[1,2,3,4]}],g5_indicador_paso_candidatos:[{id:9,nodeName:'OL',class:'forma recorte',caja:{x:1,y:2,w:300,h:40}}]}};
  const before=JSON.stringify(input),out=withoutClasses(input);assert.equal(JSON.stringify(input),before);
  const expected=structuredClone(input);delete expected.g5.g5_indicador_paso_candidatos[0].class;assert.deepEqual(out,expected);
});
test('nombres sin paso actual reciben nivel 1 y G_actual, sin inventar orientación',()=>{
  assert.deepEqual(progressAnchor({Q:true,G_existe:true,G_nombra:true,G_actual:false,G_forma:false}),{score:1,trigger:'G_actual'});
});
test('el final que compite no eleva a cuatro aunque esté diferenciado',()=>{
  const m={Q:true,G_existe:true,G_nombra:true,G_actual:true,G_forma:true,J_final:true};
  assert.deepEqual(progressAnchor({...m,final_compite_con_inicio:true}),{score:3,trigger:'G_forma'});
  assert.deepEqual(progressAnchor({...m,final_compite_con_inicio:false}),{score:4,trigger:'J_final'});
  assert.deepEqual(progressAnchor({...m,final_compite_con_inicio:null}),{score:3,trigger:'G_forma'});
});
test('un final destacado no compensa la falta de indicador ni la dependencia del color',()=>{
  assert.deepEqual(progressAnchor({Q:true,G_existe:false,J_final:true,final_compite_con_inicio:false}),{score:0,trigger:'G_existe'});
  assert.deepEqual(progressAnchor({Q:true,G_existe:true,G_nombra:true,G_actual:true,G_forma:false,J_final:true,final_compite_con_inicio:false}),{score:2,trigger:'G_forma'});
});
test('el contrato nuevo rechaza un trigger viejo sin normalizar ni tocar el original',()=>{
  // Copia en memoria usada solo como fixture de contrato; no es otra evaluación.
  const fs=require('fs'),path=require('path'),base=path.join(__dirname,'../pilotos/g5-progreso-2026-10-19');
  const result=JSON.parse(fs.readFileSync(path.join(base,'resultados/P04-r1.json'))),{run,...raw}=result;
  raw.measurements.final_compite_con_inicio=null;raw.trigger='G_forma';
  const input=withoutClasses(JSON.parse(fs.readFileSync(path.join(base,'entradas/P04.json'))));
  assert.deepEqual(validateV2(raw,input,run),[]);
  raw.trigger='ninguna';const before=JSON.stringify(raw);assert.ok(validateV2(raw,input,run).length);assert.equal(JSON.stringify(raw),before);
  raw.trigger='G_forma';raw.measurements.g5_listas_total++;assert.ok(validateV2(raw,input,run).some(e=>e.includes('cambió')));
});
