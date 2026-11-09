#!/usr/bin/env node
'use strict';
// Prepara ejemplos locales. No llama al modelo ni toca el piloto general.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
const BASE = path.join(ROOT, 'preparacion/g5-progreso-2026-10-19');
const { capturePage, launchOptions } = require('../capture/capture');
const { medirCaptura, VERSION } = require('../measure/measure-page');
const { chromium } = require('playwright');
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const read = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const write = (f, data) => fs.writeFileSync(f, JSON.stringify(data, null, 2) + '\n');
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const config = () => read(path.join(BASE, 'casos.json'));
const names = ['Datos', 'Entrega', 'Pago', 'Confirmación'];

function steps(c) {
  const color = c.variante === 'color', noCurrent = c.variante === 'sin_actual';
  const total = c.variante === 'sin_total' ? 'Estás en Entrega' : noCurrent ? 'El proceso tiene 4 etapas' : 'Paso 2 de 4 · Entrega';
  return `<section class="indicador" aria-label="Progreso"><p>${total}</p>
    <ol class="pasos ${color ? 'color' : noCurrent ? 'uniforme' : 'forma'} ${c.variante === 'recorte' ? 'recorte' : ''}">${names.map((name,i) =>
    `<li class="etapa ${i===0?'completada':i===1?'actual':'pendiente'}"${!noCurrent && !color && i===1?' aria-current="step"':''}>
      <span class="marca">${!color && !noCurrent && i===0?'<span class="interior"></span>':''}</span>
      <strong>${name}</strong>${!color && !noCurrent?`<span>${i===0?'Completado':i===1?'Actual':'Pendiente'}</span>`:''}</li>`).join('')}</ol>
    ${color?'<p class="leyenda">Verde: completado · Azul: actual · Gris: pendiente</p>':''}</section>`;
}

function render(c) {
  const controls = ['carrusel','ruta','contacto'].includes(c.variante);
  let top = '';
  if (c.variante === 'barra') top = '<div class="indicador"><div class="barra" aria-label="Avance"><div></div></div></div>';
  if (['color','forma','sin_total','sin_actual','recorte'].includes(c.variante)) top = steps(c);
  if (c.variante === 'carrusel') top = '<section class="banner"><h2>Novedades de la biblioteca</h2><p>Conoce las colecciones disponibles.</p><div class="puntos"><i></i><i></i><i></i><i></i></div></section><ul class="temas"><li>Lectura</li><li>Arte</li><li>Ciencia</li><li>Historia</li></ul>';
  if (c.variante === 'ruta') top = '<nav aria-label="Ruta de navegación"><ol class="breadcrumb"><li>Inicio</li><li>Biblioteca</li><li>Catálogo</li></ol></nav><h2>Catálogo de la biblioteca</h2><p>Consulta los materiales disponibles.</p>';
  const form = controls && c.variante !== 'contacto' ? '' : `<section class="formulario"><h2>${controls?'Escríbenos':'Dirección de contacto'}</h2>${controls?'':'<label>Nombre<input value="" aria-label="Nombre"></label>'}<label>${controls?'Mensaje':'Dirección'}<input value="" aria-label="${controls?'Mensaje':'Dirección'}"></label><button type="button">${controls?'Enviar':['sin_indicador','barra'].includes(c.variante)?'Siguiente: entrega':'Siguiente: pago'}</button></section>`;
  return `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(c.id)}</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#fff;color:#222;font:18px Arial,sans-serif}header{padding:22px 80px;border-bottom:1px solid #bbb}header p{margin:0}main{margin:36px 80px;width:1280px}h1{font-size:30px;margin:0 0 28px}h2{font-size:24px}p{line-height:1.5}.indicador{margin:0 0 34px}.pasos{display:flex;gap:20px;list-style:none;padding:0;margin:24px 0;width:1120px}.etapa{flex:0 0 240px;height:132px;border:1px solid #555;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}.marca{display:block;width:24px;height:24px;border:1px solid #222;position:relative}.interior{position:absolute;width:10px;height:10px;top:5px;left:5px;background:#222;border:1px solid #222}.forma .actual .marca{width:32px;height:32px;border:3px double #222}.color .completada .marca{background:#19864b}.color .actual .marca{background:#236bd1}.color .pendiente .marca{background:#aaa}.recorte{margin-left:400px}.formulario{width:640px;border:1px solid #aaa;padding:24px}label{display:block;margin:16px 0}input{display:block;width:100%;height:44px;margin-top:8px;border:1px solid #666;padding:8px;font:inherit}button{padding:12px 22px;background:#fff;border:1px solid #222;font:inherit}.barra{width:1040px;height:24px;background:#ddd;border:1px solid #777}.barra div{height:100%;width:45%;background:#555}.temas,.breadcrumb{display:flex;list-style:none;gap:24px;padding:0}.temas li,.breadcrumb li{padding:14px 20px;border:1px solid #999;width:220px}.banner{padding:30px;border:1px solid #999;width:1040px}.puntos{display:flex;gap:14px}.puntos i{display:block;width:14px;height:14px;border:1px solid #555;border-radius:50%}.puntos i:first-child{background:#555}
</style><header><p>Biblioteca universitaria · Demostración local</p></header><main><h1>${controls?'Servicios de biblioteca':'Solicitud de préstamo'}</h1>${top}${form}</main></html>\n`;
}

function gallery() {
  return `<!doctype html><html lang="es"><meta charset="utf-8"><title>Ejemplos de progreso · G5</title><style>body{font:17px Arial;max-width:1100px;margin:40px auto;padding:0 20px;color:#222}article{border-top:1px solid #ccc;padding:20px 0}img{width:48%;border:1px solid #aaa}a{color:#164987}p{line-height:1.5}</style><h1>G5: ejemplos de progreso</h1><p>Preparación de una prueba aparte. Estas pantallas son inventadas para revisar criterios; todavía no tienen evaluaciones del modelo ni de expertos. Las expectativas están guardadas antes de capturar y no deben enviarse al evaluador.</p><p><a href="criterios.md">Criterios</a> · <a href="casos.json">Expectativas propuestas</a> · <a href="CONTROL-CAPTURAS.json">Comprobación técnica</a></p>${config().casos.map(c=>`<article><h2>${escape(c.id+' · '+c.nombre)}</h2><p>${escape(c.objetivo)}</p><p>Uso: ${escape(c.uso)}. <a href="casos/${c.id}.html">Abrir pantalla</a> · <a href="entradas/${c.id}.json">Medidas G5</a></p><a href="capturas/${c.id}/screenshot.png"><img alt="Captura ${c.id}" src="capturas/${c.id}/screenshot.png"></a> <a href="capturas/${c.id}/wireframe.png"><img alt="Wireframe ${c.id}" src="capturas/${c.id}/wireframe.png"></a></article>`).join('')}</html>\n`;
}

function filesIn(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?filesIn(path.join(dir,e.name)):[path.join(dir,e.name)]).sort();
}
function verifyRegistration() {
  const r=read(path.join(BASE,'REGISTRO.json'));
  for(const [f,h] of Object.entries(r.archivos_sha256)) assert.equal(sha(path.join(BASE,f)),h,`${f}: registro cambiado`);
  for(const [f,h] of Object.entries(r.codigo_sha256)) assert.equal(sha(path.join(ROOT,f)),h,`${f}: código cambiado; preparar otra versión`);
  return r;
}
function prepare() {
  assert.ok(!fs.existsSync(path.join(BASE,'REGISTRO.json')),'Ya registrado: no se sobrescribe');
  const data=config();assert.equal(data.casos.length,10);assert.equal(VERSION,'1.0.6');
  fs.mkdirSync(path.join(BASE,'casos'));
  for(const c of data.casos)fs.writeFileSync(path.join(BASE,'casos',c.id+'.html'),render(c));
  fs.writeFileSync(path.join(BASE,'index.html'),gallery());
  for(const [from,to] of [['skills/g5-posicion-progreso/SKILL.md','RUBRICA.md'],['shared/escala.md','ESCALA.md'],['scripts/g5-response.schema.json','response.schema.json']])fs.copyFileSync(path.join(ROOT,from),path.join(BASE,to));
  const sources=[__filename,...filesIn(path.join(ROOT,'capture')).filter(f=>f.endsWith('.js')&&!f.endsWith('.test.js')),...filesIn(path.join(ROOT,'measure')).filter(f=>f.endsWith('.js')&&!f.endsWith('.test.js'))];
  const local=['casos.json','criterios.md','RUBRICA.md','ESCALA.md','response.schema.json','index.html',...data.casos.map(c=>'casos/'+c.id+'.html')];
  write(path.join(BASE,'REGISTRO.json'),{registrado_en:new Date().toISOString(),git_base:execFileSync('git',['rev-parse','HEAD'],{cwd:ROOT,encoding:'utf8'}).trim(),estado:'preparacion_sin_evaluaciones',medicion:VERSION,viewport:data.viewport,casos:10,solicitudes_al_modelo:0,
    archivos_sha256:Object.fromEntries(local.map(f=>[f,sha(path.join(BASE,f))])),codigo_sha256:Object.fromEntries(sources.map(f=>[path.relative(ROOT,f),sha(f)]))});
  console.log('Criterios y diez pantallas registrados antes de capturar. No se han evaluado.');
}

async function capture() {
  verifyRegistration();
  assert.ok(!fs.existsSync(path.join(BASE,'capturas')),'Ya hay capturas: se conservan, no se reemplazan');
  fs.mkdirSync(path.join(BASE,'capturas'));fs.mkdirSync(path.join(BASE,'entradas'));
  const server=require('node:http').createServer((req,res)=>{
    const m=/^\/casos\/(P\d\d)\.html$/.exec(req.url);
    if(!m||!config().casos.some(c=>c.id===m[1])){res.writeHead(404);res.end();return;}
    res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(BASE,'casos',m[1]+'.html')));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  let browser;
  try {
    browser=await chromium.launch(launchOptions());
    for(const c of config().casos){
      const out=path.join(BASE,'capturas',c.id);
      await capturePage({url:`http://127.0.0.1:${server.address().port}/casos/${c.id}.html`,out,viewport:config().viewport,attempts:1,dismissConsent:false,browser});
      const m=medirCaptura(out);
      write(path.join(BASE,'entradas',c.id+'.json'),{pagina:m.pagina,measurements_version:m.schema_version,g5:m.g5});
      console.log(c.id+': captura y medidas guardadas, sin puntuar');
    }
    const outputs=[...filesIn(path.join(BASE,'capturas')),...filesIn(path.join(BASE,'entradas'))];
    fs.writeFileSync(path.join(BASE,'SELLO-CAPTURAS.tsv'),outputs.map(f=>sha(f)+'\t'+path.relative(BASE,f)).join('\n')+'\n');
  } finally {if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
  verify();
}

function verify() {
  const reg=verifyRegistration();
  for(const line of fs.readFileSync(path.join(BASE,'SELLO-CAPTURAS.tsv'),'utf8').trim().split('\n')){
    const [h,f]=line.split('\t');assert.ok(f&&!path.isAbsolute(f)&&!f.split('/').includes('..'));assert.equal(sha(path.join(BASE,f)),h,f+': captura cambiada');
  }
  const cases=config().casos.map(c=>{
    const dir=path.join(BASE,'capturas',c.id),meta=read(path.join(dir,'meta.json')),input=read(path.join(BASE,'entradas',c.id+'.json'));
    assert.ok(Date.parse(meta.capturedAt)>=Date.parse(reg.registrado_en));
    assert.equal(meta.viewport.width,1440);assert.equal(meta.viewport.height,900);assert.equal(meta.wireframeImageMarker,'diagonal-cross');
    for(const type of ['screenshot','wireframe']){assert.equal(sha(path.join(dir,type+'.png')),meta.sha256[type]);const png=require('pngjs').PNG.sync.read(fs.readFileSync(path.join(dir,type+'.png')));assert.equal(png.width,1440);assert.equal(png.height,900);}
    const measured=medirCaptura(dir);assert.deepEqual(input.g5,measured.g5);assert.equal(input.measurements_version,VERSION);
    const ns=read(path.join(dir,'nodes.json')),listIds=new Set(ns.filter(n=>n.attributes?.class?.includes('etapa')).map(n=>n.id));
    const stepList=input.g5.g5_listas.find(l=>l.n===4&&l.ids.every(id=>listIds.has(id)));
    if(['color','forma','sin_total','sin_actual','recorte'].includes(c.variante)){
      assert.ok(stepList,c.id+': no llegó la lista de etapas');assert.equal(stepList.orden_ambiguo,false);assert.equal(stepList.padre_raiz_virtual,false);
      assert.equal(stepList.parcial,c.variante==='recorte',c.id+': recorte distinto del previsto');
    }
    if(c.variante==='contacto')assert.equal(input.g5.g5_listas_total,0);
    if(['carrusel','ruta'].includes(c.variante))assert.ok(input.g5.g5_listas_total>0);
    return {id:c.id,listas:input.g5.g5_listas_total,lista_etapas:stepList?.id_lista??null,etapas_parciales:stepList?.parcial??null,nodos:meta.nodes,notas:meta.notes,sanity:meta.sanity,
      estado:'archivos_y_geometria_comprobados; sin juicio del modelo'};
  });
  write(path.join(BASE,'CONTROL-CAPTURAS.json'),{registrado_antes_de_capturar:true,hashes_y_medidas_comprobados:true,solicitudes_al_modelo:0,referencia_experta:false,casos:cases});
  console.log('Diez casos comprobados. No son diez evaluaciones de G5.');
}

if(require.main===module){
  const command=process.argv[2];
  Promise.resolve().then(()=>{if(command==='prepare')prepare();else if(command==='capture')return capture();else if(command==='verify')verify();else throw Error('Uso: node scripts/prepare-g5-progress.js prepare|capture|verify');}).catch(e=>{console.error(e.message);process.exitCode=1;});
}
module.exports={render};
