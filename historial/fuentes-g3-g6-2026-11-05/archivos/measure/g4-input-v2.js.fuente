'use strict';
// Proyección G4 1.0.7 sobre la fuente 1.0.6. No modifica capturas ni otros grupos.
const assert=require('node:assert/strict');
const VERSION='1.0.7';
function greater(a,b){return a-b>8*Number.EPSILON*Math.max(1,Math.abs(a),Math.abs(b));}
function clipped(b,v){
 for(const k of ['x','y','w','h'])assert.ok(Number.isFinite(b[k]),'Caja no finita');
 assert.ok(b.w>0&&b.h>0&&v.width>0&&v.height>0);
 return greater(0,b.x)||greater(0,b.y)||greater(b.x+b.w,v.width)||greater(b.y+b.h,v.height);
}
function project(input){
 assert.equal(input.measurements_version,'1.0.6','La proyección requiere la fuente registrada 1.0.6');
 const out=structuredClone(input),v=input.pagina.viewport;
 for(const s of out.g4.g4_conjuntos_pares)s.parcial=s.miembros.some(m=>clipped(m.caja,v));
 for(const b of out.g4.g4_banner_candidatos)delete b.class;
 out.measurements_version=VERSION;return out;
}
module.exports={VERSION,clipped,project};
