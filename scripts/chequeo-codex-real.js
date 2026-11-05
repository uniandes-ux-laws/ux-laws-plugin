#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const {spawn,execFileSync}=require('child_process');
const {isDeepStrictEqual}=require('util');
const {pathToFileURL}=require('url');
const ROOT=path.resolve(__dirname,'..');
const BASE=path.join(ROOT,'verificaciones/codex-0.2.1-2026-11-05');
const PAQUETE=path.join(ROOT,'dist/chequeo-codex-0.2.1/ux-laws-0.2.1');
const CORRIDA=path.join(BASE,'corrida');
const leer=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const texto=f=>fs.readFileSync(f,'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const hash=f=>sha(fs.readFileSync(f));
const guardar=(f,obj)=>fs.writeFileSync(f,JSON.stringify(obj,null,2)+'\n');
const absoluta=f=>path.resolve(PAQUETE,f);
const cli=()=>execFileSync('codex',['--version'],{encoding:'utf8'}).trim();
const comprobar=(valor,mensaje)=>{if(!valor)throw Error(mensaje);};
function orquestador(args,log) {
  const salida=execFileSync(process.execPath,[path.join(PAQUETE,'scripts/orchestrate.js'),...args],{cwd:PAQUETE,encoding:'utf8'});
  if(log)fs.writeFileSync(path.join(BASE,log),salida);
  return salida;
}

async function preparar() {
  comprobar(!fs.existsSync(BASE),'La prueba ya existe. No se reemplaza ni se repite.');
  fs.mkdirSync(BASE,{recursive:true});fs.mkdirSync(path.join(BASE,'trazas'));
  const entrega=leer(path.join(PAQUETE,'entrega.json'));
  comprobar(entrega.version==='0.2.1','Se necesita la entrega 0.2.1.');
  comprobar(require(path.join(PAQUETE,'node_modules/fast-uri/package.json')).version==='3.1.9','Falta instalar la dependencia corregida.');
  fs.copyFileSync(path.join(ROOT,'scripts/g4-evaluator-instructions.md'),path.join(BASE,'BASE-INSTRUCCIONES.md'));
  const pagina=path.join(PAQUETE,'capture/pages/portal.html');
  const registro={version:'0.2.1',fecha:new Date().toISOString(),tipo:'Comprobación funcional pequeña; no es un piloto de la tesis',
    modelo:'gpt-6.1-sol',cli:cli(),esfuerzo:'low',modo:'referencia',repeticiones:1,solicitudes:7,
    entrada:'Pantalla sintética portal.html ya incluida en el paquete. No tiene puntajes esperados.',
    pagina_sha256:hash(pagina),zip_sha256:hash(path.join(ROOT,'dist/ux-laws-0.2.1.zip')),
    ejecutor_sha256:hash(__filename),instrucciones_sha256:hash(path.join(BASE,'BASE-INSTRUCCIONES.md')),
    archivos_paquete:entrega.archivos.map(f=>({archivo:f.archivo,sha256:hash(path.join(PAQUETE,f.archivo))})),
    limite:'Una página y una repetición por grupo. Sin Claude, comparación real, estabilidad ni referencia experta.',
    salida_modelo:'JSON por texto; el esquema original va incluido en el prompt, sin adaptar el esquema del paquete al servicio.'};
  guardar(path.join(BASE,'REGISTRO-PREVIO.json'),registro);
  await require(path.join(PAQUETE,'capture/capture')).capturePage({url:pathToFileURL(pagina).href,out:path.join(BASE,'captura')});
  orquestador(['preparar','--captura',path.join(BASE,'captura'),'--out',CORRIDA,'--modo','referencia','--repeticiones','1',
    '--runtime','codex-cli','--model-id',registro.modelo,'--decoding',JSON.stringify({model_reasoning_effort:'low',temperature:'no expuesto por el runtime',top_p:'no expuesto por el runtime'})],'PREPARACION.log');
  orquestador(['verificar','--corrida',CORRIDA],'VERIFICACION-ENTRADAS.log');
  console.log('Preparadas siete solicitudes. Todavía no se llamó al modelo.');
}

function comprobarFuentes() {
  const registro=leer(path.join(BASE,'REGISTRO-PREVIO.json'));
  comprobar(hash(__filename)===registro.ejecutor_sha256,'Cambió el ejecutor de esta comprobación.');
  comprobar(cli()===registro.cli,'Cambió la CLI.');
  comprobar(hash(path.join(BASE,'BASE-INSTRUCCIONES.md'))===registro.instrucciones_sha256,'Cambiaron las instrucciones.');
  for(const f of registro.archivos_paquete) comprobar(hash(path.join(PAQUETE,f.archivo))===f.sha256,'Cambió el paquete: '+f.archivo);
  orquestador(['verificar','--corrida',CORRIDA]);
  return registro;
}

function revisarRespuesta(inv,solicitud,archivo) {
  const Ajv=require(path.join(PAQUETE,'node_modules/ajv/dist/2020'));
  const ajv=new Ajv({strict:false,allErrors:true});require(path.join(PAQUETE,'node_modules/ajv-formats'))(ajv);
  const obj=leer(archivo),validar=ajv.compile(leer(absoluta(inv.esquema)));
  if(!validar(obj))return validar.errors.map(e=>(e.instancePath||'/')+' '+e.message);
  const problemas=[];
  if(!isDeepStrictEqual(obj.run,solicitud.run))problemas.push('run distinto de la solicitud');
  const entrada=leer(absoluta(inv.entrada));
  const ids=new Set(leer(path.join(BASE,'captura/nodes.json')).map(n=>n.id));
  problemas.push(...require(path.join(PAQUETE,'scripts/estado-resultado')).revisarEstado(obj).errores);
  problemas.push(...require(path.join(PAQUETE,'scripts/execution-options')).validarContrato(obj,entrada,inv.channel,ids));
  if(inv.group_id==='g1')problemas.push(...require(path.join(PAQUETE,'measure/g1-input')).revisarG1(obj,entrada));
  return problemas;
}

async function ejecutarUna() {
  const registro=comprobarFuentes(),archivoLibro=path.join(CORRIDA,'invocaciones.json'),libro=leer(archivoLibro);
  const pruebas=libro.invocaciones.map(i=>path.join(BASE,'trazas',i.id+'.json')).filter(f=>fs.existsSync(f)).map(leer);
  comprobar(pruebas.every(p=>p.estado!=='error_tecnico'&&p.estado!=='iniciado'),'Hay un intento fallido o sin cerrar. Se conserva y se detienen solicitudes nuevas.');
  const inv=libro.invocaciones.find(i=>!fs.existsSync(path.join(BASE,'trazas',i.id+'.json')));
  if(!inv){console.log('Ya se conservaron las siete posiciones.');return;}
  const respuesta=absoluta(inv.resultado_esperado),rastro=path.join(BASE,'trazas',inv.id+'.jsonl');
  comprobar(!fs.existsSync(respuesta)&&!fs.existsSync(rastro),'Ya existe evidencia de ese intento. No se repite.');
  const solicitud=leer(absoluta(inv.solicitud));
  const enviado=texto(absoluta(inv.prompt))+'\n\n# Solicitud individual\n'+JSON.stringify(solicitud)+'\n';
  const enviadoArchivo=path.join(BASE,'trazas',inv.id+'.enviado.txt');fs.writeFileSync(enviadoArchivo,enviado,{flag:'wx'});
  const contexto=fs.mkdtempSync(path.join(os.tmpdir(),'ux-codex-evaluador-'));
  const args=['exec','--ignore-user-config','--ephemeral','--skip-git-repo-check','--model',registro.modelo,
    '--sandbox','read-only','--cd',contexto,'--disable','shell_tool','--disable','apps','--disable','multi_agent',
    '-c','project_doc_max_bytes=0','-c','web_search="disabled"',
    '-c','model_reasoning_effort="low"','-c','model_instructions_file='+JSON.stringify(path.join(BASE,'BASE-INSTRUCCIONES.md'))];
  for(const imagen of solicitud.imagenes)args.push('--image',absoluta(imagen.archivo));
  args.push('--output-last-message',respuesta,'--json','-');
  const pruebaArchivo=path.join(BASE,'trazas',inv.id+'.json');
  const prueba={id:inv.id,inicio:new Date().toISOString(),estado:'iniciado',cli:registro.cli,modelo:registro.modelo,
    comando:args,prompt_hash:inv.prompt_hash,solicitud_sha256:hash(absoluta(inv.solicitud)),
    texto_enviado_sha256:hash(enviadoArchivo),imagenes:solicitud.imagenes,contexto_limpio:true};
  guardar(pruebaArchivo,prueba);
  const salida=fs.openSync(rastro,'wx'),erroresArchivo=path.join(BASE,'trazas',inv.id+'.stderr.log'),errores=fs.openSync(erroresArchivo,'wx');
  const hijo=spawn('codex',args,{cwd:contexto,stdio:['pipe',salida,errores]});
  let errorProceso=null;hijo.on('error',e=>{errorProceso=e.message;});hijo.stdin.on('error',()=>{});hijo.stdin.end(enviado);
  const temporizador=setTimeout(()=>hijo.kill('SIGTERM'),240000);
  const fin=await new Promise(resolve=>hijo.on('close',(codigo,senal)=>resolve({codigo,senal})));
  clearTimeout(temporizador);fs.closeSync(salida);fs.closeSync(errores);fs.rmSync(contexto,{recursive:true,force:true});
  Object.assign(prueba,{fin:new Date().toISOString(),proceso:fin,error_proceso:errorProceso,estado:'error_tecnico',
    traza_sha256:hash(rastro),stderr_sha256:hash(erroresArchivo),errores:[]});
  try {
    comprobar(!errorProceso&&fin.codigo===0&&fs.existsSync(respuesta),'La ejecución no produjo una respuesta completa.');
    const eventos=texto(rastro).trim().split('\n').filter(Boolean).map(JSON.parse);
    prueba.sesion=eventos.find(e=>e.type==='thread.started')?.thread_id;
    prueba.uso=eventos.find(e=>e.type==='turn.completed')?.usage;
    const mensaje=eventos.filter(e=>e.type==='item.completed'&&e.item?.type==='agent_message').at(-1);
    comprobar(prueba.sesion&&prueba.uso&&mensaje,'Falta sesión, uso o mensaje final en la traza.');
    comprobar(!eventos.some(e=>e.item?.type&&!['agent_message','reasoning'].includes(e.item.type)),'Se detectó una herramienta o una acción no prevista.');
    comprobar(mensaje.item.text.trimEnd()===texto(respuesta).trimEnd(),'La respuesta no coincide con el mensaje original.');
    prueba.respuesta_sha256=hash(respuesta);
    prueba.estado='respuesta_invalida';
    prueba.errores=revisarRespuesta(inv,solicitud,respuesta);
    if(!prueba.errores.length)prueba.estado='respuesta_valida';
  } catch(e) {prueba.errores.push(e.message);}
  guardar(pruebaArchivo,prueba);
  inv.contexto_limpio=true;inv.mecanismo_de_aislamiento='Proceso codex exec nuevo, carpeta vacía, sin historial, configuración de usuario ni herramientas; imágenes en el orden de la solicitud.';
  inv.estado=prueba.estado;guardar(archivoLibro,libro);
  console.log(inv.id+': '+prueba.estado+(prueba.errores.length?' — '+prueba.errores.join('; '):''));
  if(prueba.estado==='error_tecnico')process.exitCode=1;
}

function cerrar() {
  comprobarFuentes();
  const libro=leer(path.join(CORRIDA,'invocaciones.json'));
  const pruebas=libro.invocaciones.map(i=>leer(path.join(BASE,'trazas',i.id+'.json')));
  comprobar(pruebas.length===7&&new Set(pruebas.map(p=>p.sesion)).size===7,'Faltan siete sesiones distintas.');
  orquestador(['recoger','--corrida',CORRIDA],'CIERRE.log');
  console.log(texto(path.join(BASE,'CIERRE.log')));
}

if(require.main===module)Promise.resolve().then(()=>{
  const modo=process.argv[2];
  if(modo==='preparar')return preparar();
  if(modo==='ejecutar-una')return ejecutarUna();
  if(modo==='cerrar')return cerrar();
  throw Error('Uso: node scripts/chequeo-codex-real.js preparar|ejecutar-una|cerrar');
}).catch(e=>{console.error(e.message);process.exitCode=1;});
