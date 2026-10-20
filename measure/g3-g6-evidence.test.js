'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),{g3,g6}=require('./g3-g6-evidence');
const vp={width:1440,height:900};
function n(id,tipo,padre,x,y,w,h,visible=true,attributes={}){return {id,nodeName:tipo,parentId:padre,bounds:{x,y,w,h},ink:{x,y,w,h},visibleBoundary:{visible},attributes};}
test('G3 conserva MAIN de pantalla completa y atraviesa envoltorios transparentes',()=>{
 const nodes=[n(1,'MAIN',0,0,0,1440,1800,false),n(2,'DIV',1,0,0,1440,800,false),n(3,'P',2,10,40,200,40,false),n(4,'P',2,10,100,200,40,false)];
 const r=g3(nodes,vp);assert.equal(r.g3_region_tarea.id,1);assert.deepEqual(r.g3_region_tarea.unidades_ids,[3,4]);assert.equal(r.g3_region_tarea.caja.h,900);assert.equal(r.g3_U_candidatas,2);assert.ok(!r.g3_unidades.some(u=>u.id===2));
});
test('G3 no recorta listas de candidatos a 40 ni calcula B sobre envoltorios',()=>{
 const nodes=[n(1,'MAIN',0,0,0,1400,850,false),n(2,'DIV',1,10,10,1200,800,true),n(3,'DIV',2,10,10,1200,800,false),...Array.from({length:45},(_,i)=>n(i+10,'P',3,20+(i%9)*100,20+Math.floor(i/9)*100,80,40,false))];
 const r=g3(nodes,vp);assert.equal(r.g3_B_mayor,45);assert.equal(r.g3_unidades.find(u=>u.id===2).hijos_ids.length,45);assert.equal(r.g3_unidades.length,46);
});
test('G6 conserva logos fuera de la posición esperada y encuentra el enlace real',()=>{
 const r=g6([n(1,'A',0,1100,600,200,70,false,{href:'/'}),n(2,'svg',1,1100,600,200,70,true,{'aria-label':'Inicio'})],vp);
 assert.equal(r.g6_slots_convencion.K1_logo.length,1);assert.equal(r.g6_slots_convencion.K1_logo[0].href_del_ancestro,'/');assert.equal(r.g6_slots_convencion.K1_logo[0].enlace_ancestro,1);
});
test('G6 no llama vacíos a imágenes, campos, botones ni contenedores con texto retenido',()=>{
 const nodes=[n(1,'IMG',0,0,0,100,100),n(2,'INPUT',0,0,110,100,40),n(3,'BUTTON',0,0,160,100,40),n(4,'DIV',0,150,0,200,100),n(5,'DIV',4,150,0,200,100,false),n(6,'#text',5,160,10,100,30),n(7,'DIV',0,400,0,200,100)];
 assert.deepEqual(g6(nodes,vp).g6_contenedores_vacios.map(r=>r.id),[7]);
});
test('G6 limita candidatos a tinta visible y exige pares de botones vecinos sin solaparse',()=>{
 const nodes=[n(1,'BUTTON',10,0,10,80,40),n(2,'BUTTON',10,90,10,80,40),n(3,'BUTTON',11,180,10,80,40),n(4,'INPUT',10,0,1000,100,40),n(5,'INPUT',10,0,80,100,40,true,{type:'hidden'})];
 const r=g6(nodes,vp);assert.deepEqual(r.g6_slots_convencion.K6_pares_de_botones,[{izquierda:1,derecha:2,padre:10}]);assert.equal(r.g6_campos_de_entrada,0);
});
