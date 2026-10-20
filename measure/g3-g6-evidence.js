'use strict';
// Nueva evidencia por grupo. No reescribe las mediciones históricas 1.0.6.
const fs=require('fs'),path=require('path');
const VERSION='1.1.0';
const tag=n=>String(n.nodeName||'').toUpperCase();
const attrs=n=>n.attributes||{};
const identity=n=>Object.entries(attrs(n)).filter(([k])=>['alt','aria-label','href','role','type','title'].includes(k));
const lex=n=>Object.values(attrs(n)).join(' ');
const area=b=>b?b.w*b.h:0;
const container=n=>['DIV','SPAN','SECTION','ARTICLE','ASIDE','MAIN','UL','OL','LI','FORM','FIELDSET'].includes(tag(n));
const atomic=n=>['#TEXT','IMG','SVG','VIDEO','CANVAS','OBJECT','IFRAME','INPUT','SELECT','TEXTAREA','BUTTON','A','P','LABEL','TD','TH','SUMMARY'].includes(tag(n))||/^H[1-6]$/.test(tag(n));
function context(nodes,viewport){
 const byId=new Map(nodes.map(n=>[n.id,n])),children=new Map();
 for(const n of nodes){if(!children.has(n.parentId))children.set(n.parentId,[]);children.get(n.parentId).push(n);}
 const clip=b=>{if(!b||![b.x,b.y,b.w,b.h].every(Number.isFinite)||b.w<=0||b.h<=0)return null;const x=Math.max(0,b.x),y=Math.max(0,b.y),r=Math.min(viewport.width,b.x+b.w),d=Math.min(viewport.height,b.y+b.h);return r>x&&d>y?{x,y,w:r-x,h:d-y}:null;};
 const box=n=>clip(n.visibleInk||n.ink);
 const visible=nodes.filter(n=>box(n)&&!(tag(n)==='INPUT'&&attrs(n).type==='hidden'));
 const ancestors=n=>{const out=[],seen=new Set([n.id]);let a=byId.get(n.parentId);while(a&&!seen.has(a.id)){seen.add(a.id);out.push(a);a=byId.get(a.parentId);}return out;};
 const descendants=n=>{const out=[],seen=new Set([n.id]),queue=[...(children.get(n.id)||[])];while(queue.length){const c=queue.pop();if(seen.has(c.id))continue;seen.add(c.id);out.push(c);queue.push(...(children.get(c.id)||[]));}return out;};
 const partial=n=>{const b=n.ink,c=box(n);if(!b||!c)return false;const e=8*Number.EPSILON*Math.max(1,viewport.width,viewport.height,Math.abs(b.x),Math.abs(b.y),b.w,b.h);return b.x<-e||b.y<-e||b.x+b.w>viewport.width+e||b.y+b.h>viewport.height+e;};
 const record=n=>({id:n.id,padre:n.parentId??null,tipo:tag(n),caja:box(n),parcial:partial(n)||n.clipped===true});
 return {nodes,viewport,byId,children,clip,box,visible,ancestors,descendants,partial,record};
}
function g3(nodes,viewport){
 const c=context(nodes,viewport),{visible,box,ancestors,children,descendants,record}=c;
 const chrome=n=>['HEADER','NAV','FOOTER'].includes(tag(n))||['banner','navigation','contentinfo'].includes(attrs(n).role);
 const outside=n=>chrome(n)||ancestors(n).some(chrome);
 const semantic=n=>['MAIN','ARTICLE','SECTION','FORM'].includes(tag(n))||attrs(n).role==='main';
 let regions=visible.filter(n=>semantic(n)&&!outside(n));
 const large=visible.filter(n=>container(n)&&!outside(n)&&area(box(n))>=viewport.width*viewport.height*.15);
 // Se incluyen alternativas completas; no se pierden regiones por ocupar todo el viewport.
 regions=[...new Map([...regions,...large.filter(n=>!ancestors(n).some(a=>large.includes(a)))].map(n=>[n.id,n])).values()];
 regions.sort((a,b)=>(tag(b)==='MAIN'||attrs(b).role==='main')-(tag(a)==='MAIN'||attrs(a).role==='main')||area(box(b))-area(box(a))||a.id-b.id);
 const frontier=n=>{const out=[],seen=new Set([n.id]);function visit(p){for(const h of children.get(p.id)||[]){if(seen.has(h.id))continue;seen.add(h.id);if(!box(h)){visit(h);continue;}if(atomic(h)||h.visibleBoundary?.visible===true&&!['HTML','BODY'].includes(tag(h)))out.push(h);else visit(h);}}visit(n);return out;};
 const units=new Map();
 for(const region of regions){const queue=[...frontier(region)],seen=new Set();while(queue.length){const u=queue.shift();if(seen.has(u.id))continue;seen.add(u.id);const kids=atomic(u)?[]:frontier(u);const headings=descendants(u).filter(n=>box(n)&&(/^H[1-6]$/.test(tag(n))||attrs(n).role==='heading')).map(n=>n.id);units.set(u.id,{...record(u),hijos_ids:kids.map(n=>n.id),hijos:kids.length,encabezados_ids:headings,estructura:atomic(u)?'contenido_o_control':'bloque_con_superficie'});queue.push(...kids);}}
 const rr=regions.map(n=>({...record(n),unidades_ids:frontier(n).map(u=>u.id),fraccion_viewport:area(box(n))/(viewport.width*viewport.height)}));
 const selected=rr[0]||null,first=selected?selected.unidades_ids.map(id=>units.get(id)):[];
 return {g3_region_tarea:selected,g3_region_candidatas:rr,g3_U_candidatas:first.length,g3_unidades:[...units.values()],g3_B_mayor:first.length?Math.max(...first.map(u=>u.hijos)):0,
  g3_tablas:visible.filter(n=>['TABLE','THEAD','TBODY','TR','TH','TD'].includes(tag(n))).map(record),
  g3_pegajosos:visible.filter(n=>['fixed','sticky'].includes(n.position)).map(n=>({...record(n),position:n.position})),
  g3_encabezados:visible.filter(n=>/^H[1-6]$/.test(tag(n))||attrs(n).role==='heading').map(record),
  g3_nodos:visible.map(record),g3_parentesco:nodes.map(n=>[n.id,n.parentId??null]),
  g3_limites:['Solo se registra la porción con tinta que intersecta el viewport; una caja visible no certifica ausencia de oclusión.','Unidades y bloques son candidatos estructurales, no unidades semánticas confirmadas. No se cuentan DIV/SPAN transparentes como unidades.','Se conservan todas las regiones y unidades candidatas; un árbol retenido puede omitir ancestros. No reconstruir cajas ni contenido ausente.','Encabezados semánticos H1-H6/role=heading son evidencia parcial; los títulos visuales requieren screenshot.','La pertenencia a la tarea, coherencia, datos requeridos y contenido ajeno requieren lectura de screenshot. La comparación entre canales no es limpia.'],
  g3_criterios_con_lectura_de_texto:['U','H','V','X']};
}
function g6(nodes,viewport){
 const c=context(nodes,viewport),{visible,box,ancestors,children,descendants,record}=c;
 const control=n=>['INPUT','SELECT','TEXTAREA','BUTTON'].includes(tag(n))||['button','textbox','searchbox','combobox'].includes(attrs(n).role)||n.isClickable;
 const image=n=>n.isImage||['IMG','SVG','VIDEO','CANVAS','IFRAME','OBJECT','EMBED'].includes(tag(n));
 const button=n=>tag(n)==='BUTTON'||attrs(n).role==='button'||tag(n)==='A'&&/(btn|button)/i.test(lex(n));
 const fields=visible.filter(n=>['INPUT','SELECT','TEXTAREA'].includes(tag(n))&&attrs(n).type!=='hidden');
 const buttons=visible.filter(button).filter(n=>!ancestors(n).some(a=>button(a)&&box(a)));
 const pair=[];const parents=new Map();for(const n of buttons){if(!parents.has(n.parentId))parents.set(n.parentId,[]);parents.get(n.parentId).push(n);}
 for(const group of parents.values()){group.sort((a,b)=>box(a).x-box(b).x);for(let i=0;i<group.length-1;i++){const a=group[i],b=group[i+1],x=box(a),y=box(b),overlap=Math.min(x.y+x.h,y.y+y.h)-Math.max(x.y,y.y),gap=y.x-x.x-x.w;if(gap>=0&&gap<60&&overlap>=Math.min(x.h,y.h)*.5)pair.push({izquierda:a.id,derecha:b.id,padre:a.parentId});}}
 const actionables=visible.filter(n=>control(n)||tag(n)==='A');
 const slots={
  K1_logo:visible.filter(image).map(n=>{const link=[n,...ancestors(n)].find(a=>typeof attrs(a).href==='string');return {...record(n),identidad:Object.fromEntries(identity(n)),enlace_ancestro:link?.id??null,href_del_ancestro:link?attrs(link).href:null};}),
  K2_buscador:visible.filter(n=>tag(n)==='INPUT'||attrs(n).role==='search'||attrs(n).role==='searchbox'||control(n)&&/(search|buscar|busca|recherch)/i.test(lex(n))).map(n=>n.id),
  K3_cuenta_carrito:actionables.map(n=>n.id),
  K4_navegacion:visible.filter(n=>tag(n)==='NAV'||attrs(n).role==='navigation'||/(^|[\s_-])(nav|menu)/i.test(lex(n))).map(n=>n.id),
  K5_campos:fields.map(n=>n.id),K5_etiquetas:visible.filter(n=>tag(n)==='LABEL').map(n=>n.id),
  K6_pares_de_botones:pair,
  K7_pie:visible.filter(n=>tag(n)==='FOOTER'||attrs(n).role==='contentinfo'||/footer/i.test(lex(n))).map(n=>n.id),
  K8_ruta:visible.filter(n=>/(breadcrumb|migaja)/i.test(lex(n))).map(n=>n.id)};
 const hasContent=n=>atomic(n)||control(n)||image(n);
 const empty=visible.filter(n=>container(n)&&n.visibleBoundary?.visible===true&&area(box(n))>400&&!descendants(n).some(d=>box(d)&&hasContent(d)));
 const separators=visible.filter(n=>!control(n)&&!image(n)&&(tag(n)==='HR'||Math.min(box(n).w,box(n).h)<=3&&Math.max(box(n).w,box(n).h)>40));
 return {g6_campos_de_entrada:fields.length,g6_botones:buttons.length,g6_slots_convencion:slots,
  g6_contenedores_vacios_total:empty.length,g6_contenedores_vacios:empty.map(record),g6_separadores_total:separators.length,g6_separadores:separators.map(record),
  g6_elementos:visible.map(n=>({...record(n),accionable:!!control(n),identidad:Object.fromEntries(identity(n))})),g6_parentesco:nodes.map(n=>[n.id,n.parentId??null]),
  g6_catalogo_convenciones:'v1, 2026-09-10, ocho convenciones K1..K8 en la rubrica de G6',
  g6_limites:['Se buscan candidatos en todas las posiciones visibles; estar en una ranura no certifica función ni incumplimiento.','Las listas son completas para los nodos retenidos; pueden faltar ancestros o atributos. Sin href observado no se demuestra que el logo carezca de enlace.','La ausencia de un pie o una ruta en el viewport no demuestra que el sitio carezca de ellos. No inferir estructura fuera de pantalla.','No se registran texto, valores de campos ni asociaciones for/id que el snapshot no conserva. Las etiquetas y operaciones requieren screenshot.','Contenedores vacíos y separadores son candidatos a R, no redundancias confirmadas. No contar ancestros y descendientes como el mismo hallazgo duplicado.','La lectura de R, T y convenciones usa screenshot: esta no es una comparación limpia entre canales.'],
  g6_criterios_con_lectura_de_texto:['R','T','K_ap','K']};
}
function build(dir,group){
 if(!['g3','g6'].includes(group))throw Error('Grupo desconocido');
 const read=f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8')),meta=read('meta.json'),nodes=read('nodes.json');
 return {pagina:{id:path.basename(dir),viewport:meta.viewport,captured_at:meta.capturedAt,sanity_ok:meta.sanity?.ok??null,consent_limpio:meta.consent?meta.consent.limpio!==false:null},group_id:group,measurements_version:VERSION,source_measurements_version:read('measurements.json').schema_version,[group]:(group==='g3'?g3:g6)(nodes,meta.viewport)};
}
module.exports={VERSION,context,g3,g6,build};
