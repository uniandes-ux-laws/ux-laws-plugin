#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('node:assert/strict');
const {capturePage,launchOptions}=require('../capture/capture');
const {medirCaptura}=require('../measure/measure-page');
const {chromium}=require('playwright');
const ROOT=path.resolve(__dirname,'..'),BASE=path.join(ROOT,'preparacion/g5-cobertura-2026-10-19');
const json=f=>JSON.parse(fs.readFileSync(f,'utf8')),sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const write=(f,o)=>fs.writeFileSync(f,JSON.stringify(o,null,2)+'\n');
const cases=[
 {id:'E01',origen:'P06 previo, sin evaluaciones recibidas',vertical:false,last:false,esperado:{score:1,not_applicable:false,trigger:'G_actual',Q:true,G_existe:true,G_nombra:true,G_actual:false,G_forma:false,steps_declared:4,J_inicio:false,J_final:false,final_compite_con_inicio:null,evidence_insufficient:false}},
 {id:'E02',origen:'nuevo control horizontal',vertical:false,last:false,esperado:{score:3,not_applicable:false,trigger:'G_forma',Q:true,G_existe:true,G_nombra:true,G_actual:true,G_forma:true,steps_declared:4,J_inicio:true,J_final:false,final_compite_con_inicio:null,evidence_insufficient:false}},
 {id:'E03',origen:'nuevo final horizontal diferenciado',vertical:false,last:true,esperado:{score:4,not_applicable:false,trigger:'J_final',Q:true,G_existe:true,G_nombra:true,G_actual:true,G_forma:true,steps_declared:4,J_inicio:true,J_final:true,final_compite_con_inicio:false,evidence_insufficient:false}},
 {id:'E04',origen:'nuevo control vertical',vertical:true,last:false,esperado:{score:3,not_applicable:false,trigger:'G_forma',Q:true,G_existe:true,G_nombra:true,G_actual:true,G_forma:true,steps_declared:4,J_inicio:true,J_final:false,final_compite_con_inicio:null,evidence_insufficient:false}},
 {id:'E05',origen:'nuevo final vertical diferenciado',vertical:true,last:true,esperado:{score:4,not_applicable:false,trigger:'J_final',Q:true,G_existe:true,G_nombra:true,G_actual:true,G_forma:true,steps_declared:4,J_inicio:true,J_final:true,final_compite_con_inicio:false,evidence_insufficient:false}}
];
function render(c){
 const sizes=c.vertical?[[380,145],[300,90],[300,90],c.last?[340,115]:[300,90]]:[[300,190],[190,115],[190,115],c.last?[250,150]:[190,115]];
 const names=['Datos','Entrega','Pago','Confirmación'];
 return `<!doctype html><html lang="es"><meta charset="utf-8"><title>${c.id}</title><style>*{box-sizing:border-box}body{margin:0;color:#222;background:#fff;font:18px Arial}header{padding:20px 80px;border-bottom:1px solid #999}h1{font-size:28px;margin:24px 0}main{margin:0 80px}p{line-height:1.4}.n0{list-style:none;padding:0;display:flex;flex-direction:${c.vertical?'column':'row'};align-items:flex-start;gap:${c.vertical?18:25}px}.n1{border:1px solid #333;display:flex;flex-direction:${c.vertical?'row':'column'};align-items:center;justify-content:center;gap:14px}.n2{position:relative;display:block;width:24px;height:24px;border:1px solid #111;flex-shrink:0}.n3{position:absolute;left:5px;top:5px;width:10px;height:10px;border:1px solid #111;background:#111}.n4{width:32px;height:32px;border:3px double #111}.n5{position:absolute;left:${c.vertical?650:80}px;top:${c.vertical?235:500}px;width:470px;border:1px solid #999;padding:24px}label,input{display:block}input{margin:12px 0 20px;width:100%;height:42px;border:1px solid #555}button{font:inherit;background:#fff;border:1px solid #222;padding:12px}</style><header>Biblioteca universitaria · Demostración local</header><main><h1>Solicitud de préstamo</h1><p>Paso 2 de 4 · Entrega</p><ol class="n0">${names.map((name,i)=>`<li class="n1" style="width:${sizes[i][0]}px;height:${sizes[i][1]}px"><span class="n2${i===1?' n4':''}">${i===0?'<span class="n3"></span>':''}</span><strong>${name}</strong><span>${i===0?'Completado':i===1?'Actual':'Pendiente'}</span></li>`).join('')}</ol><section class="n5"><label>Dirección<input aria-label="Dirección"></label><button type="button">Siguiente: pago</button></section></main></html>\n`;
}
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]).sort();}
function registered(){const r=json(path.join(BASE,'REGISTRO.json'));for(const [f,h] of Object.entries(r.archivos_sha256))assert.equal(sha(path.join(BASE,f)),h,f);assert.equal(sha(__filename),r.generador_sha256);return r;}
function prepare(){
 assert.ok(!fs.existsSync(BASE),'La preparación ya existe; no se sustituye');fs.mkdirSync(BASE,{recursive:true});fs.mkdirSync(path.join(BASE,'casos'));
 write(path.join(BASE,'casos.json'),{tipo:'expectativas de diseño, no resultados ni referencia experta',casos:cases});
 for(const c of cases.filter(c=>c.id!=='E01'))fs.writeFileSync(path.join(BASE,'casos',c.id+'.html'),render(c));
 fs.copyFileSync(path.join(ROOT,'docs/PRUEBAS-G5-CIERRE-19OCT.md'),path.join(BASE,'CRITERIOS-PREVIOS.md'));
 const html='<!doctype html><html lang="es"><meta charset="utf-8"><title>Cobertura de G5</title><style>body{font:18px Arial;max-width:1200px;margin:30px auto}img{width:48%}article{border-top:1px solid #bbb;padding:20px 0}</style><h1>G5: ejemplos adicionales</h1><p>Expectativas de diseño propuestas antes de evaluar. E01 reutiliza la captura pendiente; E02/E03 y E04/E05 forman pares para distinguir 3 de 4. Las expectativas no se entregan al modelo.</p>'+cases.map(c=>`<article><h2>${c.id}</h2><p>${c.origen}</p><img src="capturas/${c.id}/screenshot.png"><img src="capturas/${c.id}/wireframe.png"></article>`).join('')+'</html>';
 fs.writeFileSync(path.join(BASE,'index.html'),html);
 const paths=files(BASE);write(path.join(BASE,'REGISTRO.json'),{registrado_en:new Date().toISOString(),generador_sha256:sha(__filename),archivos_sha256:Object.fromEntries(paths.map(f=>[path.relative(BASE,f),sha(f)])),nota:'E01 reutiliza P06; los otros cuatro casos se capturan después de este registro, antes de evaluar.'});
 console.log('Cinco casos registrados antes de evaluar; cuatro HTML nuevos antes de capturar.');
}
async function capture(){
 registered();assert.ok(!fs.existsSync(path.join(BASE,'capturas')),'Ya hay capturas; conservarlas');fs.mkdirSync(path.join(BASE,'capturas'));fs.mkdirSync(path.join(BASE,'entradas'));
 const e01=path.join(BASE,'capturas/E01');fs.mkdirSync(e01);
 for(const f of ['meta.json','nodes.json','wireframe.png','screenshot.png'])fs.copyFileSync(path.join(ROOT,'preparacion/g5-progreso-2026-10-19/capturas/P06',f),path.join(e01,f));
 const old=json(path.join(ROOT,'preparacion/g5-progreso-2026-10-19/entradas/P06.json'));old.pagina.id='E01';write(path.join(BASE,'entradas/E01.json'),old);
 const server=require('node:http').createServer((req,res)=>{const m=/^\/(E0[2-5])\.html$/.exec(req.url);if(!m){res.writeHead(404);res.end();return;}res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(BASE,'casos',m[1]+'.html')));});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let browser;
 try{browser=await chromium.launch(launchOptions());for(const c of cases.filter(c=>c.id!=='E01')){const out=path.join(BASE,'capturas',c.id);await capturePage({url:`http://127.0.0.1:${server.address().port}/${c.id}.html`,out,browser,attempts:1,dismissConsent:false});const m=medirCaptura(out);write(path.join(BASE,'entradas',c.id+'.json'),{pagina:m.pagina,measurements_version:m.schema_version,g5:m.g5});}}
 finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
 const outputs=[...files(path.join(BASE,'capturas')),...files(path.join(BASE,'entradas'))];fs.writeFileSync(path.join(BASE,'SELLO-CAPTURAS.tsv'),outputs.map(f=>sha(f)+'\t'+path.relative(BASE,f)).join('\n')+'\n');verify();
}
function verify(){
 const reg=registered();for(const line of fs.readFileSync(path.join(BASE,'SELLO-CAPTURAS.tsv'),'utf8').trim().split('\n')){const [h,f]=line.split('\t');assert.equal(sha(path.join(BASE,f)),h,f);}
 const control=cases.map(c=>{
  const dir=path.join(BASE,'capturas',c.id),meta=json(path.join(dir,'meta.json')),input=json(path.join(BASE,'entradas',c.id+'.json'));
  assert.equal(meta.viewport.width,1440);assert.equal(meta.viewport.height,900);for(const type of ['screenshot','wireframe'])assert.equal(sha(path.join(dir,type+'.png')),meta.sha256[type]);
  assert.deepEqual(medirCaptura(dir).g5,input.g5);const list=input.g5.g5_listas.find(l=>l.n===4&&l.nodeName==='LI');assert.ok(list);assert.equal(list.parcial,false);assert.equal(list.orden_ambiguo,false);
  if(c.id!=='E01'){
   assert.ok(Date.parse(meta.capturedAt)>=Date.parse(reg.registrado_en));
   const nodes=json(path.join(dir,'nodes.json'));assert.ok(nodes.every(n=>!n.attributes?.class||/^n\d+( n\d+)*$/.test(n.attributes.class)));
   const middle=list.items[1].caja,first=list.primero.caja,last=list.ultimo.caja,area=b=>b.w*b.h;
   assert.ok(area(first)>area(middle));if(c.last)assert.ok(area(first)>area(last)&&area(last)>area(middle));else assert.equal(area(last),area(middle));
  }
  return {id:c.id,lista:list.id_lista,primero:list.primero.caja,ultimo:list.ultimo.caja,sanity:meta.sanity,nota:'Geometría comprobada; el juicio de jerarquía lo emite el evaluador, no este control.'};
 });
 write(path.join(BASE,'CONTROL-CAPTURAS.json'),{casos:control,referencia_experta:false});console.log('Capturas y pares geométricos comprobados, sin puntuar.');
}
if(require.main===module)Promise.resolve().then(()=>{const mode=process.argv[2];if(mode==='prepare')return prepare();if(mode==='capture')return capture();if(mode==='verify')return verify();throw Error('Uso: prepare-g5-coverage.js prepare|capture|verify');}).catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={render,cases};
