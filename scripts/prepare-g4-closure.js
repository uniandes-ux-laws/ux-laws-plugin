#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),crypto=require('crypto');
const {capturePage,launchOptions}=require('../capture/capture'),{medirCaptura}=require('../measure/measure-page'),{chromium}=require('playwright');
const ROOT=path.resolve(__dirname,'..'),BASE=path.join(ROOT,'preparacion/g4-cierre-2026-10-20');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8')),sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const write=(f,o)=>fs.writeFileSync(f,JSON.stringify(o,null,2)+'\n');
const cases=[
 {id:'S01',condition:'flat',esperado:{I_principal:0,P:null,Bn:0,Cn:0,score:1,trigger:'I'}},
 {id:'S02',condition:'two',esperado:{I_principal:2,P:null,Bn:0,Cn:0,score:2,trigger:'I'}},
 {id:'S03',condition:'chrome',esperado:{I_principal:1,P:true,Bn:0,Cn:1,score:2,trigger:'Cn'}},
 {id:'S04',condition:'three',esperado:{I_principal:3,P:null,Bn:0,Cn:0,score:1,trigger:'I'}},
 {id:'S05',condition:'banner',esperado:{I_principal:0,P:null,Bn:1,Cn:0,score:0,trigger:'Bn'}},
 {id:'S06',condition:'wrong',esperado:{I_principal:1,P:false,Bn:0,Cn:0,score:2,trigger:'P'}},
 {id:'S07',condition:'one',esperado:{I_principal:1,P:true,Bn:0,Cn:0,score:3,trigger:'P'}},
 {id:'S08',condition:'multi',esperado:{I_principal:1,P:true,Bn:0,Cn:0,score:4,trigger:'canales'}}
];
function render(c){
 const letter=i=>String.fromCharCode(65+i),variant=i=>{
  const color='background:#1769b1;color:white;',second='background:#80c3ef;color:#111;',border='border:7px double #111;';
  if(c.condition==='two')return i===3?color+border:i===7?second:'';
  if(c.condition==='three')return [1,3,6].includes(i)?color:'';
  if(c.condition==='wrong')return i===5?color:'';
  if(['one','multi','chrome'].includes(c.condition)&&i===3)return color+(c.condition==='one'?'':border);
  return '';
 };
 const banner=c.condition==='banner'?'<aside class="n3"><strong>¡CONTINÚA HOY TU SOLICITUD!</strong><span>Tu trámite te espera · confirma los datos requeridos</span><a href="#formulario">CONTINUAR INSCRIPCIÓN</a></aside>':'';
 const low=c.condition==='chrome'?'<aside class="n4">Documento obligatorio para continuar: adjunta tu certificado vigente antes de enviar la solicitud. Sin este documento el trámite no puede completarse.</aside>':'';
 return `<!doctype html><html lang="es"><meta charset="utf-8"><title>${c.id}</title><style>*{box-sizing:border-box}body{margin:0;background:#fff;color:#222;font:18px Arial}header{height:70px;padding:22px 80px;border-bottom:1px solid #bbb}main{margin:20px 80px}h1{font-size:28px}h2{font-size:18px;font-weight:400;margin:0}p{line-height:1.4}.n0{list-style:none;padding:0;display:flex;gap:12px;margin-top:36px}.n1{width:128px;height:250px;flex-shrink:0;border:1px solid #aaa;background:#fff;display:flex;flex-direction:column;justify-content:space-around;align-items:center;padding:12px}.n1 p{font-size:16px;margin:0}.n1 button{font:inherit;font-size:16px;color:inherit;background:transparent;border:1px solid currentColor;padding:10px}.n3{height:110px;width:1280px;background:linear-gradient(100deg,#ffdc00,#ff7914);border:6px dashed #aa1d11;display:flex;align-items:center;justify-content:space-around;gap:15px}.n3 strong{font-size:26px;font-style:italic;max-width:350px}.n3 span{max-width:350px;font-size:20px}.n3 a{background:#cb0021;color:white;font-size:20px;font-weight:bold;padding:14px;text-decoration:none;max-width:300px}.n4{position:absolute;left:80px;top:740px;width:1280px;height:80px;padding:20px;background:#f9f9f9;color:#aaa;border:1px solid #eee;font-size:12px}</style><header>Biblioteca universitaria · Solicitudes</header><main>${banner}<h1>Elige una opción para continuar</h1><p>Para completar esta solicitud, selecciona la opción D.</p><ul class="n0">${Array.from({length:9},(_,i)=>`<li class="n1" style="${variant(i)}"><h2>Opción ${letter(i)}</h2><p>Solicitud de servicio</p><button type="button">Elegir ${letter(i)}</button></li>`).join('')}</ul><section id="formulario"><h2>Revisa la selección y continúa con tus datos</h2><p>La solicitud se prepara en esta pantalla.</p></section>${low}</main></html>`;
}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]).sort();}
function registered(){const r=read(path.join(BASE,'REGISTRO.json'));assert.equal(sha(__filename),r.generador_sha256);for(const [f,h] of Object.entries(r.archivos_sha256))assert.equal(sha(path.join(BASE,f)),h,f);return r;}
function prepare(){
 assert.ok(!fs.existsSync(BASE),'Ya existe la preparación; no se sobrescribe');fs.mkdirSync(BASE,{recursive:true});fs.mkdirSync(path.join(BASE,'casos'));
 write(path.join(BASE,'casos.json'),{casos:cases,tipo:'expectativas de diseño previas; no referencia experta',principal_propuesto:'grupo LI de nueve opciones',not_applicable:false});
 for(const c of cases)fs.writeFileSync(path.join(BASE,'casos',c.id+'.html'),render(c));
 fs.copyFileSync(path.join(ROOT,'docs/FASE-G4-20OCT.md'),path.join(BASE,'CRITERIOS-PREVIOS.md'));
 const files=[path.join(BASE,'casos.json'),path.join(BASE,'CRITERIOS-PREVIOS.md'),...walk(path.join(BASE,'casos'))];
 write(path.join(BASE,'REGISTRO.json'),{registrado_en:new Date().toISOString(),generador_sha256:sha(__filename),archivos_sha256:Object.fromEntries(files.map(f=>[path.relative(BASE,f),sha(f)]))});console.log('Ocho diseños registrados antes de capturar y evaluar.');
}
async function capture(){
 registered();assert.ok(!fs.existsSync(path.join(BASE,'capturas')));fs.mkdirSync(path.join(BASE,'capturas'));fs.mkdirSync(path.join(BASE,'entradas'));
 const server=require('http').createServer((req,res)=>{const m=/^\/(S0[1-8])\.html$/.exec(req.url);if(!m){res.writeHead(404);res.end();return;}res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(BASE,'casos',m[1]+'.html')));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch(launchOptions());for(const c of cases){const out=path.join(BASE,'capturas',c.id);await capturePage({url:`http://127.0.0.1:${server.address().port}/${c.id}.html`,out,browser,attempts:1,dismissConsent:false});const m=medirCaptura(out),meta=read(path.join(out,'meta.json'));write(path.join(BASE,'entradas',c.id+'.json'),{pagina:{id:c.id,viewport:meta.viewport,captured_at:meta.capturedAt,sanity_ok:meta.sanity.ok,consent_limpio:null},measurements_version:m.schema_version,formato_prompt:'compacto-v2',g4:m.g4,geometria_nodos:read(path.join(out,'nodes.json')).map(n=>[n.id,n.parentId??null])});}}
 finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
 fs.writeFileSync(path.join(BASE,'SELLO-CAPTURAS.tsv'),[...walk(path.join(BASE,'capturas')),...walk(path.join(BASE,'entradas'))].map(f=>sha(f)+'\t'+path.relative(BASE,f)).join('\n')+'\n');verify();
 fs.writeFileSync(path.join(BASE,'index.html'),`<!doctype html><html lang="es"><meta charset="utf-8"><title>Ejemplos G4</title><style>body{font:18px system-ui;max-width:1440px;margin:24px auto}img{width:100%}article{border-top:1px solid #aaa}</style><h1>G4: ejemplos sintéticos separados</h1><p>Expectativas propuestas antes de evaluar, no juicios expertos.</p>${cases.map(c=>`<article><h2>${c.id}</h2><p>Nivel esperado ${c.esperado.score}; ${c.condition}. Las expectativas no se entregan al modelo.</p><img src="capturas/${c.id}/screenshot.png"></article>`).join('')}</html>`);
}
function verify(){
 const reg=registered();for(const row of fs.readFileSync(path.join(BASE,'SELLO-CAPTURAS.tsv'),'utf8').trim().split('\n')){const [h,f]=row.split('\t');assert.equal(sha(path.join(BASE,f)),h,f);}
 const controls=cases.map(c=>{const out=path.join(BASE,'capturas',c.id),input=read(path.join(BASE,'entradas',c.id+'.json')),meta=read(path.join(out,'meta.json'));
  for(const channel of ['screenshot','wireframe'])assert.equal(sha(path.join(out,channel+'.png')),meta.sha256[channel]);assert.equal(meta.viewport.width,1440);assert.equal(meta.viewport.height,900);assert.ok(Date.parse(meta.capturedAt)>=Date.parse(reg.registrado_en));assert.deepEqual(medirCaptura(out).g4,input.g4);
  const projection=require('../measure/g4-input-v2').project(input),set=projection.g4.g4_conjuntos_pares.find(s=>s.clave.startsWith('LI#')&&s.n===9);assert.ok(set);assert.equal(set.parcial,false);assert.equal(new Set(set.miembros.map(m=>m.id)).size,9);
  if(c.condition==='banner')assert.ok(input.g4.g4_banner_candidatos.length);if(c.condition==='chrome')assert.ok(input.g4.g4_cromo_candidatos.length);
  return {id:c.id,conjunto:set.conjunto,miembros:set.miembros.map(m=>m.id),sanity:meta.sanity,banner_candidatos:input.g4.g4_banner_candidatos.length,cromo_candidatos:input.g4.g4_cromo_candidatos.length,nota:'Estos controles no califican saliencia ni certifican Bn o Cn.'};});
 write(path.join(BASE,'CONTROL-CAPTURAS.json'),{casos:controls,referencia_experta:false});console.log('Ocho capturas comprobadas, sin puntuar.');
}
if(require.main===module)Promise.resolve().then(()=>{if(process.argv[2]==='preparar')return prepare();if(process.argv[2]==='capturar')return capture();if(process.argv[2]==='verificar')return verify();throw Error('Uso: preparar|capturar|verificar');}).catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={cases,render};
