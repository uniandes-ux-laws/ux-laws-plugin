'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {areaVisible}=require('./g5-lists'),{clipped,project}=require('./g4-input-v2');
const viewport={width:1440,height:900};
test('un error de área decimal no convierte una caja interior en recortada',()=>{
 const b={x:1230.5,y:27.3,w:37.6,h:16};
 assert.ok(areaVisible(b,viewport)<b.w*b.h);assert.equal(clipped(b,viewport),false);
});
test('se mantienen recortes reales, incluso menores de un píxel',()=>{
 for(const b of [{x:-0.00001,y:1,w:10,h:10},{x:1430,y:1,w:10.001,h:10},{x:1,y:899,w:10,h:1.001}])assert.equal(clipped(b,viewport),true);
 assert.equal(clipped({x:1430,y:890,w:10,h:10},viewport),false);
});
test('la proyección solo cambia parcial, clases de banner y la versión declarada',()=>{
 const source=require('../pilotos/g4-2026-10-07-v3/entradas/C13.json'),before=JSON.stringify(source),out=project(source),expected=structuredClone(source);
 expected.measurements_version='1.0.7';for(const s of expected.g4.g4_conjuntos_pares)s.parcial=s.miembros.some(m=>clipped(m.caja,viewport));for(const b of expected.g4.g4_banner_candidatos)delete b.class;
 assert.deepEqual(out,expected);assert.equal(JSON.stringify(source),before);
 assert.equal(out.g4.g4_conjuntos_pares.find(s=>s.conjunto==='g4:LI#524').parcial,false);
});
