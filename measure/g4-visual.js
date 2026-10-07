'use strict';
// Convenciones métricas de G4, registradas el 2026-10-07 antes del piloto.
const { cajaValida } = require('./actionable-inventory');
const { areaVisible } = require('./g5-lists');
const real = n => !String(n.nodeName).startsWith('#') && !String(n.nodeName).startsWith(':') && !['HTML', 'BODY'].includes(String(n.nodeName).toUpperCase());
const area = b => b.w * b.h;
const median = xs => { const a = [...xs].sort((a,b)=>a-b), i = a.length >> 1; return a.length % 2 ? a[i] : (a[i-1]+a[i])/2; };
const box = b => Object.fromEntries(Object.entries(b).filter(([k])=>['x','y','w','h'].includes(k)).map(([k,v])=>[k,+v.toFixed(1)]));
function fondoDe(png) {
  const counts = new Map();
  for (let y=0;y<png.height;y+=4) for(let x=0;x<png.width;x+=4) {
    const i=(y*png.width+x)*4, k=((png.data[i]>>3)<<10)|((png.data[i+1]>>3)<<5)|(png.data[i+2]>>3);
    counts.set(k,(counts.get(k)||0)+1);
  }
  let best=0,n=-1; for(const [k,v] of counts) if(v>n){best=k;n=v;}
  return [((best>>10)&31)<<3,((best>>5)&31)<<3,(best&31)<<3];
}
function rasgosDe(png,fondo,b) {
  const x0=Math.max(0,Math.floor(b.x)),y0=Math.max(0,Math.floor(b.y));
  const x1=Math.min(png.width,Math.ceil(b.x+b.w)),y1=Math.min(png.height,Math.ceil(b.y+b.h));
  if(x1<=x0||y1<=y0)return null;
  let r=0,g=0,bl=0,n=0,ink=0;
  for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){
    const i=(y*png.width+x)*4, R=png.data[i],G=png.data[i+1],B=png.data[i+2];
    r+=R;g+=G;bl+=B;n++;
    if((R-fondo[0])**2+(G-fondo[1])**2+(B-fondo[2])**2>24**2)ink++;
  }
  const color=[Math.round(r/n),Math.round(g/n),Math.round(bl/n)];
  return {color_medio:color,contraste_con_fondo:+Math.hypot(...color.map((v,i)=>v-fondo[i])).toFixed(1),
    fraccion_tinta:+(ink/n).toFixed(4),area:Math.round(area(b)),area_visible:Math.round(areaVisible(b,{width:png.width,height:png.height})),pixeles_muestreados:n};
}
function medirG4({conInk,png,fondo,viewport,inventarioAccionables,ancestros,porId}) {
  if(!png)return {g4_sin_screenshot:true,juicios:[]};
  const nodes=conInk.filter(n=>real(n)&&cajaValida(n.ink)&&areaVisible(n.ink,viewport)>0);
  const byParent=new Map();
  for(const n of nodes){
    // Las regiones directas de BODY/HTML no certifican equivalencia visual.
    if(['HTML','BODY','#DOCUMENT'].includes(String(porId.get(n.parentId)?.nodeName).toUpperCase()))continue;
    const k=String(n.nodeName).toUpperCase()+'#'+(n.parentId??'raiz');
    if(!byParent.has(k))byParent.set(k,[]);byParent.get(k).push(n);
  }
  const conjuntos=[...byParent.entries()].filter(([,v])=>v.length>=2).map(([k,v])=>{
    const miembros=v.map(n=>({id:n.id,caja:box(n.ink),rasgos:rasgosDe(png,fondo,n.ink)})).filter(m=>m.rasgos);
    if(miembros.length<2)return null;
    const medC=median(miembros.map(m=>m.rasgos.contraste_con_fondo)),medA=median(miembros.map(m=>m.rasgos.area));
    return {conjunto:'g4:'+k,clave:k,id_padre:v[0].parentId??null,padre_raiz_virtual:v[0].parentId==null,n:miembros.length,
      area_visible_total:miembros.reduce((s,m)=>s+m.rasgos.area_visible,0),
      parcial:miembros.some(m=>areaVisible(m.caja,viewport)<area(m.caja)),mediana_contraste:+medC.toFixed(1),mediana_area:Math.round(medA),
      atipicos_geometricos:miembros.filter(m=>Math.abs(m.rasgos.contraste_con_fondo-medC)>40||(medA>0&&m.rasgos.area/medA>1.4)).map(m=>m.id),miembros};
  }).filter(Boolean).sort((a,b)=>b.area_visible_total-a.area_visible_total||a.conjunto.localeCompare(b.conjunto));
  const controls=inventarioAccionables?.objetivosG2||[];
  const banners=nodes.filter(n=>{
    const b=n.ink;
    if(b.w<200)return false;
    const top=b.w/Math.max(1,b.h)>=4&&b.w>=viewport.width*.75&&b.y<=viewport.height*.25;
    const side=b.h/Math.max(1,b.w)>=2&&b.x>viewport.width*.6;
    return top||side;
  }).map(n=>({id:n.id,nodeName:n.nodeName,caja:box(n.ink),class:[n.attributes?.class,n.attributes?.id].filter(Boolean).join(' ').slice(0,50),
    contiene_accionables:controls.filter(m=>m.id===n.id||ancestros(m).some(p=>p.id===n.id)).length}));
  const chrome=nodes.map(n=>({id:n.id,caja:box(n.ink),rasgos:rasgosDe(png,fondo,n.ink)}))
    .filter(m=>m.rasgos&&m.rasgos.contraste_con_fondo<30&&m.rasgos.fraccion_tinta>.02&&m.rasgos.area>2000);
  return {g4_fondo_pagina:fondo,g4_conjuntos_pares_total:conjuntos.length,g4_conjuntos_pares:conjuntos,
    g4_banner_candidatos:banners,g4_cromo_candidatos:chrome,
    g4_limites_medicion:['Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.',
      'contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.',
      'La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.',
      'Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.',
      'La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala.'],
    juicios:[
      {campo:'conjunto principal',decide:'Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.',evidencia:'conjuntos completos y screenshot'},
      {campo:'I',decide:'Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.',evidencia:'rasgos, atípicos y screenshot; atípico geométrico no certifica aislado'},
      {campo:'P',decide:'Si el único aislado coincide con lo que la pantalla promueve.',evidencia:'etiquetas y jerarquía del screenshot'},
      {campo:'Bn',decide:'Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.',evidencia:'candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma'},
      {campo:'Cn',decide:'Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.',evidencia:'proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local'}]};
}
module.exports={medirG4,fondoDe,rasgosDe,median};
