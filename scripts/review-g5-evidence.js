#!/usr/bin/env node
'use strict';
// Revisión posterior de límites. Nunca cambia respuestas ni vuelve a evaluar.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('node:assert/strict');
const { orientacion }=require('../measure/g5-lists');
const ROOT=path.resolve(__dirname,'..');
const PILOT=path.join(ROOT,'pilotos/g5-2026-10-07');
const OUT=path.join(ROOT,'revisiones/g5-2026-10-19');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const rel=f=>path.relative(ROOT,f);
const descriptions={
  recorte_y_solapamiento:'La lista elegida está recortada y tiene cajas superpuestas. No permite asegurar sus extremos.',
  recorte:'Una parte de la lista elegida queda fuera de la pantalla. El juicio se limita a lo visible.',
  solapamiento:'La medición marca orden ambiguo por cajas superpuestas. No basta para asegurar inicio y final.',
  raiz_virtual:'Los elementos comparten una raíz virtual; los datos no aseguran que sean hermanos en el DOM original.',
  opciones_no_retenidas:'La captura muestra opciones en un espacio donde no quedaron los nodos correspondientes. El límite aparece antes de detectar listas.',
  cuadricula_no_detectada:'La lista visible tiene dos filas. El detector exige que el conjunto esté alineado en una sola fila o columna.',
  superposicion_visual:'La respuesta señala publicidad superpuesta sobre una lista secundaria. Otras dos repeticiones no marcaron este límite.'
};

function category(page,result,chosen){
  if(!result.evidence_insufficient)return null;
  if(chosen?.padre_raiz_virtual)return 'raiz_virtual';
  if(chosen?.parcial&&chosen?.orden_ambiguo)return 'recorte_y_solapamiento';
  if(chosen?.parcial)return 'recorte';
  if(chosen?.orden_ambiguo)return 'solapamiento';
  // Estos tres casos se revisaron en las imágenes originales y en sus nodos.
  // No se deduce una causa nueva del puntaje ni de una búsqueda de palabras.
  const reviewed={C07:'opciones_no_retenidas',R02:'cuadricula_no_detectada',C17:'superposicion_visual'};
  assert.ok(reviewed[page],page+': límite sin revisar; no asignar una causa por defecto');
  return reviewed[page];
}

function analyze(){
  const seal=fs.readFileSync(path.join(PILOT,'SELLO-SHA256.tsv'),'utf8').trim().split('\n');
  for(const line of seal){const [h,f]=line.split('\t');assert.ok(f&&!path.isAbsolute(f)&&!f.split('/').includes('..'));assert.equal(sha(path.join(PILOT,f)),h,f+': sello cambiado');}
  const pages=read(path.join(PILOT,'manifiesto.json')).pages;
  const rows=[],summary=[];
  for(const page of pages){
    const inputFile=path.join(PILOT,'entradas',page.id+'.json'),input=read(inputFile),lists=input.g5.g5_listas;
    const nodesFile=path.join(ROOT,page.captura,'nodes.json');assert.equal(sha(nodesFile),page.nodes_sha256);
    for(const channel of ['wireframe','screenshot'])assert.equal(sha(path.join(ROOT,page.captura,channel+'.png')),page.capture_sha256[channel]);
    const before=rows.length;
    for(let r=1;r<=5;r++){
      const file=path.join(PILOT,'respuestas',page.id+'-r'+r+'.json'),result=read(file),m=result.measurements;
      const chosen=lists.find(l=>l.id_lista===m.main_list_id);
      assert.ok(m.main_list_id===null||chosen,page.id+': lista no recibida');
      const cause=category(page.id,result,chosen);
      rows.push({pagina:page.id,repeticion:r,score:result.score,not_applicable:result.not_applicable,trigger:result.trigger,evidence_insufficient:result.evidence_insufficient,
        main_list_id:m.main_list_id,J_inicio:m.J_inicio,J_final:m.J_final,Q:m.Q,
        lista_parcial:chosen?.parcial??null,orden_ambiguo:chosen?.orden_ambiguo??null,raiz_virtual:chosen?.padre_raiz_virtual??null,
        motivo_principal: cause,explicacion:cause?descriptions[cause]:null,
        respuesta:rel(file),respuesta_sha256:sha(file),entrada:rel(inputFile),wireframe:page.captura+'/wireframe.png',screenshot:page.captura+'/screenshot.png',
        hallazgos_originales:result.findings});
    }
    const values=rows.slice(before);
    summary.push({pagina:page.id,insuficientes:values.filter(r=>r.evidence_insufficient).length,total:5,puntajes:values.map(r=>r.score),
      motivos:[...new Set(values.map(r=>r.motivo_principal).filter(Boolean))],insuficiencia_variable:new Set(values.map(r=>r.evidence_insufficient)).size>1});
  }
  assert.equal(rows.length,120);assert.equal(rows.filter(r=>r.evidence_insufficient).length,63);assert.equal(rows.filter(r=>r.Q).length,0);
  const r02=read(path.join(ROOT,'calibracion/R02/nodes.json'));
  const r02items=r02.filter(n=>n.parentId===1829&&n.nodeName==='LI'&&n.ink);
  assert.equal(r02items.length,8);assert.equal(orientacion(r02items),null);
  const c07=read(path.join(ROOT,'calibracion/C07/nodes.json'));
  assert.deepEqual(c07.filter(n=>n.id>668&&n.id<681),[]);
  return {tipo:'revision_posterior_tecnica; no es validacion experta',piloto:rel(PILOT),sello_sha256:sha(path.join(PILOT,'SELLO-SHA256.tsv')),archivos_primarios_verificados:seal.length,
    respuestas:120,con_evidencia_insuficiente:63,sin_marca:57,paginas_con_marca:summary.filter(p=>p.insuficientes).length,
    motivos:Object.fromEntries(Object.keys(descriptions).map(k=>[k,rows.filter(r=>r.motivo_principal===k).length])),
    comprobaciones:{R02:{padre_retenido:1829,items:r02items.map(n=>({id:n.id,caja:n.ink})),orientacion_admitida:orientacion(r02items),conclusion:'Omisión confirmada por la limitación a una fila o columna; se conserva el NA original.'},
      C07:{antes_del_hueco:663,despues_del_hueco:681,ids_entre_669_y_680_retenidos:[],conclusion:'En la imagen aparecen Mercado y Reacondicionados; esos elementos no están representados en este tramo de nodos. No se puede saber con el archivo reducido por qué se descartaron.'},
      C17:{marcan_limite:[2,4,5],no_marcan_limite:[1,3],conclusion:'La publicidad tapa parte de la zona de noticias; se conserva el desacuerdo sobre la suficiencia.'}},
    paginas:summary,evaluaciones:rows};
}

function main(){
  const a=analyze();fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(path.join(OUT,'revision.json'),JSON.stringify(a,null,2)+'\n');
  const keys=['pagina','repeticion','score','not_applicable','trigger','main_list_id','J_inicio','J_final','lista_parcial','orden_ambiguo','raiz_virtual','motivo_principal','explicacion','respuesta','respuesta_sha256','entrada','wireframe','screenshot','hallazgos_originales'];
  const cell=x=>'"'+(x===null?'':typeof x==='object'?JSON.stringify(x):String(x)).replace(/"/g,'""')+'"';
  fs.writeFileSync(path.join(OUT,'respuestas-con-limite.csv'),keys.join(',')+'\n'+a.evaluaciones.filter(r=>r.evidence_insufficient).map(r=>keys.map(k=>cell(r[k])).join(',')).join('\n')+'\n');
  console.log(JSON.stringify({respuestas:a.respuestas,con_limite:a.con_evidencia_insuficiente,motivos:a.motivos}));
}
if(require.main===module)main();
module.exports={analyze,category};
