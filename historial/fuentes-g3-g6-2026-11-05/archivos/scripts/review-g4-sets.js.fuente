#!/usr/bin/env node
'use strict';
// Revisión derivada: conserva puntajes y no llama al modelo.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {project}=require('../measure/g4-input-v2');
const ROOT=path.resolve(__dirname,'..'),SOURCE=path.join(ROOT,'pilotos/g4-2026-10-07-v3'),OUT=path.join(ROOT,'revisiones/g4-2026-10-20');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8')),sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const notes={
 C06:'La tarjeta de entretenimiento sí difiere visualmente, pero su caja 688 abarca desde el origen hasta parte de la fila. Área y color de esa caja no describen solo la tarjeta. La fila no declara una prioridad común: P desconocido no debe convertirse automáticamente en falso. Hay cookies visibles.',
 C07:'Las cuatro ofertas permiten comparar tratamientos, aunque el iPhone y el televisor tienen tamaños diferentes. Las respuestas discrepan sobre si hay uno o dos aislados. La fila se ve completa; el aviso inferior puede limitar otras zonas. La nueva regla no decide por sí sola cuántos aislados hay.',
 C09:'El conjunto 798 son puntos del carrusel, un control de estado pequeño. El 815 contiene cajas grandes y superpuestas desde el origen, que no describen por separado las opciones visibles. Ninguno acredita por tamaño ser el contenido principal. Hay elementos flotantes y cookies.',
 C13:'El par de acceso y registro se ve completo en el encabezado. Su marca de parcialidad es un error decimal. El cambio entre 3 y 4 depende de qué canales reconoce el evaluador, no de un recorte visible de ese par. Debe justificarse el alcance del encabezado.',
 C17:'Se alternaron botones de suscripción/acceso y tarjetas de noticias bajas. Son alcances distintos. Las noticias bajas están tapadas en parte por publicidad; esa publicidad real no se cuenta como tarea camuflada (Bn) solo por ser un anuncio.',
 C20:'Se alternaron iconos del encabezado y noticias inferiores. La caja 881 abarca regiones ajenas a su tarjeta; las inferiores también llegan al borde. Seleccionar los iconos completos no demuestra que representen la tarea editorial principal.',
 C25:'La navegación horizontal y la lista lateral son secciones distintas. La lista lateral llega al borde inferior; la horizontal está visible y su marca de recorte es decimal. Ninguna elección se fija como referencia humana: debe explicarse qué sección se evalúa.',
 R02:'Los ocho accesos de Most requested están visibles en dos filas. Su marca de recorte es decimal. La cuadrícula de servicios inferior sí queda cortada. El título de cada sección ayuda a justificar la selección; mezclar ambos alcances cambia lo evaluado.',
 R03:'La tarjeta de entretenimiento difiere de las utilidades vecinas, pero la caja 697 abarca desde el origen. La fila no declara qué opción debe promover. La ausencia de esa declaración no demuestra P=false. Hay cookies visibles.'
};
function analyze(){
 const manifest=read(path.join(SOURCE,'manifiesto.json')),rows=[],changes=[],pages=[];
 for(const p of manifest.pages){
  const inputFile=path.join(SOURCE,'entradas',p.id+'.json'),input=read(inputFile),next=project(input);
  for(let i=0;i<input.g4.g4_conjuntos_pares.length;i++){
   const a=input.g4.g4_conjuntos_pares[i],b=next.g4.g4_conjuntos_pares[i];
   if(a.parcial!==b.parcial)changes.push({pagina:p.id,conjunto:a.conjunto,antes:a.parcial,ahora:b.parcial});
  }
  const group=[];
  for(let r=1;r<=5;r++){
   const id=p.id+'-r'+r,f=path.join(SOURCE,'respuestas',id+'.json'),raw=read(f),m=raw.measurements,s=input.g4.g4_conjuntos_pares.find(s=>s.conjunto===m.main_set_id);
   const row={id,pagina:p.id,original:path.relative(ROOT,f),sha256:sha(f),score:raw.score,trigger:raw.trigger,abstencion:raw.score===null&&!raw.not_applicable,conjunto:m.main_set_id,I:m.I_principal,P:m.P,
    evidence_insufficient:raw.evidence_insufficient,parcial_fuente:s?.parcial??null,parcial_corregido:s?next.g4.g4_conjuntos_pares.find(s=>s.conjunto===m.main_set_id).parcial:null,
    motivo:m.motivo_abstencion,aislados:m.juicios_conjuntos.find(j=>j.conjunto===m.main_set_id)?.aislados_ids??[]};
   rows.push(row);group.push(row);
  }
  const unstable=new Set(group.map(r=>r.conjunto)).size>1||new Set(group.map(r=>r.score)).size>1||group.some(r=>r.I===1&&r.P===null);
  if(unstable)pages.push({id:p.id,observacion_posterior:notes[p.id],referencia_experta:false,
   conjuntos_observados:input.g4.g4_conjuntos_pares.filter(s=>group.some(r=>r.conjunto===s.conjunto)),respuestas:group.map(r=>r.id)});
 }
 return {tipo:'revisión posterior; no referencia experta y sin sustitución de respuestas',fuente:'pilotos/g4-2026-10-07-v3',sello_fuente_sha256:sha(path.join(SOURCE,'SELLO-SHA256.tsv')),
  fuente_entrada:'1.0.6',proyeccion_G4:'1.0.7',respuestas:rows,conjuntos_dudosos:pages,marcas_parcial_corregidas:changes,
  total_marcas_parcial_corregidas:changes.length,respuestas_que_seleccionaron_esos_conjuntos:rows.filter(r=>r.parcial_fuente!==r.parcial_corregido).length,
  advertencia:'110 conjuntos corregidos no son 110 respuestas. Corregir la marca no elimina otros límites ni convierte un juicio en validación experta.'};
}
function main(){
 fs.mkdirSync(OUT,{recursive:true});const s=analyze();fs.writeFileSync(path.join(OUT,'revision.json'),JSON.stringify(s,null,2)+'\n');
 const keys=['id','pagina','score','trigger','abstencion','conjunto','I','P','evidence_insufficient','parcial_fuente','parcial_corregido','motivo','original','sha256'];
 const cell=v=>'"'+(v==null?'':String(v)).replace(/"/g,'""')+'"';
 fs.writeFileSync(path.join(OUT,'revision.csv'),keys.join(',')+'\n'+s.respuestas.map(r=>keys.map(k=>cell(r[k])).join(',')).join('\n')+'\n');
 fs.writeFileSync(path.join(ROOT,'docs/REVISION-G4-20OCT.md'),`# G4: revisión de los conjuntos dudosos\n\n20 de octubre de 2026. Revisamos las 120 respuestas originales. Nueve páginas requieren\nrevisión por cambios de conjunto, nivel, puntaje/abstención o P indeterminado. Se contrastaron\nsus screenshots y las cajas suministradas. Esto no equivale a calificación experta.\n\n## Un problema en las marcas de recorte\n\nLa comparación histórica restaba áreas decimales. Un residuo numérico podía marcar como\nparcial una caja completamente interior. La proyección nueva de G4 compara sus bordes y\nsolo ignora el margen de error de la aritmética de máquina: mantiene recortes reales incluso\nmenores de un píxel. Corrige **${s.total_marcas_parcial_corregidas} conjuntos** de las 24 páginas; **${s.respuestas_que_seleccionaron_esos_conjuntos} respuestas anteriores**\nseleccionaron esos conjuntos. Estos números no son las 111 respuestas con evidencia insuficiente.\n\nLas marcas originales quedan intactas. Quitar una falsa marca no demuestra que la evidencia\nrestante sea suficiente: hay cajas mal asociadas, recortes reales, superposiciones y dudas\nsobre el objetivo de la sección. La entrada nueva declara versión G4 1.0.7 sobre la fuente\n1.0.6; también retira las clases de los candidatos a banner. Los otros grupos se conservan.\n\n## Qué observamos\n\n${s.conjuntos_dudosos.map(p=>'**'+p.id+'**. '+p.observacion_posterior).join('\n\n')}\n\n## Cómo seguimos\n\nSe propone una fase dirigida con estas nueve páginas y ejemplos sintéticos separados.\nLas observaciones y los ids preferidos no se entregan al evaluador. Debe justificar su\nselección con la pantalla y los candidatos; si no alcanza la evidencia, se conserva la\nabstención. No se recapturan páginas ni se arreglan cajas a mano.\n\nLas reglas nuevas están en [las decisiones propuestas](DECISIONES-G4-20OCT.md), pendientes\nde revisión con Camilo. La galería permite ver las cajas de los conjuntos seleccionados\nen la fase anterior, sin asignarles una selección correcta automática.\n\n- [Galería con cajas](../revisiones/g4-2026-10-20/index.html).\n- [Revisión completa y hashes](../revisiones/g4-2026-10-20/revision.json).\n- [Una fila por respuesta](../revisiones/g4-2026-10-20/revision.csv).\n\nLa comparación por áreas también existe en la detección histórica de G5. Esta fase corrige\nsolo la entrada de G4; el alcance sobre G5 requiere una revisión separada antes de tratar\nsus marcas de parcialidad como recortes visualmente confirmados.\n`);
 const data=JSON.stringify(s.conjuntos_dudosos).replace(/</g,'\\u003c');
 fs.writeFileSync(path.join(OUT,'index.html'),`<!doctype html><html lang="es"><meta charset="utf-8"><title>Revisión de G4</title><style>body{font:17px system-ui;max-width:1440px;margin:24px auto;padding:0 16px}article{border-top:1px solid #aaa;margin:30px 0}svg{width:100%;border:1px solid #aaa}select{font:inherit;margin:12px}rect{fill:none;stroke:#ff0088;stroke-width:3}text{fill:#fff;font:bold 15px monospace;paint-order:stroke;stroke:#111;stroke-width:3}</style><h1>G4: conjuntos de la fase anterior</h1><p>Las cajas son evidencia archivada. No indican una selección correcta ni un juicio experto.</p><main></main><script>const pages=${data};for(const p of pages){const a=document.createElement('article'),h=document.createElement('h2');h.textContent=p.id;a.append(h);const t=document.createElement('p');t.textContent=p.observacion_posterior;a.append(t);const sel=document.createElement('select');for(const s of p.conjuntos_observados){const o=document.createElement('option');o.value=s.conjunto;o.textContent=s.conjunto;sel.append(o)}a.append(sel);const box=document.createElement('div');a.append(box);const draw=()=>{const s=p.conjuntos_observados.find(s=>s.conjunto===sel.value);box.innerHTML='<svg viewBox="0 0 1440 900"><image href="../../calibracion/'+p.id+'/screenshot.png" width="1440" height="900"/>'+s.miembros.map(m=>'<rect x="'+m.caja.x+'" y="'+m.caja.y+'" width="'+m.caja.w+'" height="'+m.caja.h+'"/><text x="'+Math.max(4,m.caja.x+4)+'" y="'+Math.max(18,m.caja.y+18)+'">'+m.id+'</text>').join('')+'</svg>'};sel.onchange=draw;draw();document.querySelector('main').append(a)}</script></html>`);
 console.log(JSON.stringify({respuestas:s.respuestas.length,paginas_dudosas:s.conjuntos_dudosos.length,marcas_corregidas:s.total_marcas_parcial_corregidas,respuestas_con_esos_conjuntos:s.respuestas_que_seleccionaron_esos_conjuntos}));
}
if(require.main===module)main();module.exports={analyze};
