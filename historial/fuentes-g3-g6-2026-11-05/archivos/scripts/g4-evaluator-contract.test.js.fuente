'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {expectedScore,triggerFor,validationProblems}=require('./g4-evaluator-contract');
const {project}=require('../measure/g4-input-v2');
const base={main_set_id:'x',I_principal:1,Bn:0,Cn:0,P:true,channels_of_isolation:1};
test('las tres combinaciones nuevas tienen ancla previa sin inferir P para dos',()=>{
 for(const [patch,score,trigger] of [[{I_principal:0,P:null},1,'I'],[{I_principal:2,P:null,jerarquia_entre_dos:true},2,'I'],[{Cn:1},2,'Cn']]){const m={...base,...patch};assert.equal(expectedScore(m),score);assert.equal(triggerFor(m),trigger);}
 assert.equal(expectedScore({...base,P:null}),null);
});
test('se preservan la prioridad de Bn y las condiciones de los niveles altos',()=>{
 for(const [patch,score] of [[{Bn:1,I_principal:0},0],[{Bn:1,I_principal:1},1],[{I_principal:3},1],[{P:false},2],[{},3],[{channels_of_isolation:2},4]])assert.equal(expectedScore({...base,...patch}),score);
});
test('el validador conserva la respuesta y rechaza datos inventados o una regla incoherente',()=>{
 const fs=require('fs'),p='pilotos/g4-2026-10-07-v3/',raw=JSON.parse(fs.readFileSync(p+'respuestas/C13-r1.json'));
 const result=JSON.parse(fs.readFileSync(p+'resultados/C13-r1.json')),input=project(JSON.parse(fs.readFileSync(p+'entradas/C13.json'))),run={...result.run,measurements_version:'1.0.7'};
 raw.measurements.main_set_justification='Par visible de acceso y registro, alcance declarado del encabezado.';raw.trigger='P';
 assert.deepEqual(validationProblems(raw,input,run),[]);raw.trigger='ninguna';const before=JSON.stringify(raw);
 assert.ok(validationProblems(raw,input,run).length);assert.equal(JSON.stringify(raw),before);
 raw.trigger='P';raw.measurements.sets++;assert.ok(validationProblems(raw,input,run).some(e=>e.includes('fuente')));
});
