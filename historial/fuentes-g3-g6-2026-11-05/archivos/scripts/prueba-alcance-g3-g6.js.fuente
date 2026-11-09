#!/usr/bin/env node
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), crypto = require('crypto');
const {execFileSync,spawn} = require('child_process');
const assert = require('node:assert/strict');
const Ajv = require('ajv/dist/2020'), formatos = require('ajv-formats');
const contrato = require('./g3-g6-contract');
const {esquemaPara,validarContrato} = require('./execution-options');
const {revisarEstado} = require('./estado-resultado');
const propuesta = require('./alcance-g3-g6');
const ROOT = path.resolve(__dirname,'..');
const BASE = path.join(ROOT,'verificaciones/alcance-g3-g6-2026-11-05');
const ORIGEN = 'verificaciones/codex-0.2.1-2026-11-05';
const GRUPOS = {g3:'g3-capacidad-segmentacion',g6:'g6-economia-convencion'};
const leer = f => JSON.parse(fs.readFileSync(f,'utf8'));
const texto = f => fs.readFileSync(f,'utf8');
const hash = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const guardar = (f,obj) => fs.writeFileSync(f,JSON.stringify(obj,null,2)+'\n');
const cli = () => execFileSync('codex',['--version'],{encoding:'utf8'}).trim();
const ajv = new Ajv({strict:false,allErrors:true}); formatos(ajv);
const validadores = Object.fromEntries(Object.keys(GRUPOS).map(g=>[g,ajv.compile(esquemaPara(g,'wireframe'))]));

function preparar(base=BASE) {
  assert(!fs.existsSync(base),'La fase ya existe; no se reemplaza.');
  const fuentes = ['scripts/alcance-g3-g6.js','scripts/alcance-g3-g6.test.js',
    'scripts/prueba-alcance-g3-g6.js','scripts/prueba-alcance-g3-g6.test.js',
    'scripts/orchestrate.js','scripts/orchestrate-alcance-g3-g6.test.js',
    'scripts/g3-g6-contract.js','scripts/execution-options.js','scripts/estado-resultado.js',
    'scripts/g4-response.schema.json','shared/schemas/group-result.schema.json',
    'measure/g3-g6-evidence.js','shared/escala.md','scripts/g4-evaluator-instructions.md',
    'docs/PROPUESTA-ALCANCE-G3-G6-05NOV.md',
    ...Object.values(GRUPOS).map(slug=>'skills/'+slug+'/SKILL.md'),
    ...['captura/meta.json','captura/wireframe.png','captura/screenshot.png',
      'corrida/entradas/g3.json','corrida/entradas/g6.json'].map(f=>ORIGEN+'/'+f)];
  const versionCli=cli();
  fs.mkdirSync(base,{recursive:true});
  for(const d of ['captura','entradas','rubricas','esquemas','prompts','solicitudes','respuestas','trazas']) fs.mkdirSync(path.join(base,d));
  for(const f of ['meta.json','wireframe.png','screenshot.png']) fs.copyFileSync(path.join(ROOT,ORIGEN,'captura',f),path.join(base,'captura',f));
  fs.copyFileSync(path.join(ROOT,'scripts/g4-evaluator-instructions.md'),path.join(base,'BASE-INSTRUCCIONES.md'));
  const meta=leer(path.join(base,'captura/meta.json')),posiciones=[];
  for(const g of Object.keys(GRUPOS)) {
    const id=g+'-r1',entrada=leer(path.join(ROOT,ORIGEN,'corrida/entradas',g+'.json'));
    entrada.revision_alcance=propuesta.VERSION;
    guardar(path.join(base,'entradas',g+'.json'),entrada);
    let rubrica=texto(path.join(ROOT,'skills',GRUPOS[g],'SKILL.md'));
    if(g==='g3') rubrica=propuesta.rubricaG3(rubrica);
    fs.writeFileSync(path.join(base,'rubricas',g+'.md'),rubrica);
    const esquema=esquemaPara(g,'wireframe');guardar(path.join(base,'esquemas',g+'.json'),esquema);
    const prompt=[
      'Fase separada '+propuesta.VERSION+'. Propuesta del equipo, sin referencia experta.',
      contrato.promptFor(entrada,rubrica,texto(path.join(ROOT,'shared/escala.md'))),
      '# Solicitud actual',
      'La instrucción histórica de añadir run no se usa aquí: devuelve el objeto completo y copia run de la solicitud individual. Devuelve solo JSON. No se suministran resultados ni niveles esperados.',
      '# Esquema de esta fase\n'+JSON.stringify(esquema),
    ].join('\n\n');
    fs.writeFileSync(path.join(base,'prompts',g+'.md'),prompt);
    const run={model_id:'gpt-6.1-sol',runtime:'codex-cli',repetition:1,prompt_hash:sha(prompt),
      captured_at:meta.capturedAt,decoding:{model_reasoning_effort:'low',temperature:'no expuesto por el runtime',top_p:'no expuesto por el runtime'},
      capture_sha256:meta.sha256,measurements_version:entrada.measurements_version,protocol_version:'0.1.0'};
    const solicitud={id,group_id:g,channel:'wireframe',revision_alcance:propuesta.VERSION,run,
      imagenes:['wireframe','screenshot'].map(c=>({canal:c,archivo:'captura/'+c+'.png',sha256:hash(path.join(base,'captura',c+'.png'))})),
      resultado:'respuestas/'+id+'.json'};
    assert.equal(solicitud.imagenes[0].sha256,meta.sha256.wireframe);
    assert.equal(solicitud.imagenes[1].sha256,meta.sha256.screenshot);
    guardar(path.join(base,'solicitudes',id+'.json'),solicitud);posiciones.push({id,grupo:g});
  }
  const fijos=[];
  for(const d of ['captura','entradas','rubricas','esquemas','prompts','solicitudes'])
    for(const n of fs.readdirSync(path.join(base,d))) fijos.push({archivo:d+'/'+n,sha256:hash(path.join(base,d,n))});
  fijos.push({archivo:'BASE-INSTRUCCIONES.md',sha256:hash(path.join(base,'BASE-INSTRUCCIONES.md'))});
  const registro={fecha:new Date().toISOString(),revision:propuesta.VERSION,estado:'propuesta del equipo, pendiente de revisión con Camilo',
    modelo:'gpt-6.1-sol',esfuerzo:'low',cli:versionCli,posiciones,
    origen:ORIGEN,limite:'Dos evaluaciones de desarrollo de la misma pantalla sintética anterior. No es una muestra independiente ni un piloto completo.',
    reglas:'G3 añade solamente el caso U=6..8, segmentación encabezada, H=0, V=false y X=0 con inventario y unidades completos. G6 conserva catálogo y niveles; el diagnóstico no puntúa subconjuntos.',
    respuestas:'Conservar originales y desacuerdos, sin reintentos ni sustituciones. Un fallo técnico detiene solicitudes nuevas.',
    fuentes:fuentes.map(f=>({archivo:f,sha256:hash(path.join(ROOT,f))})),archivos_fijos:fijos};
  guardar(path.join(base,'REGISTRO-PREVIO.json'),registro);
  return registro;
}

function verificar(base=BASE) {
  const registro=leer(path.join(base,'REGISTRO-PREVIO.json'));
  for(const f of registro.fuentes) assert.equal(hash(path.join(ROOT,f.archivo)),f.sha256,'Cambió la fuente '+f.archivo);
  for(const f of registro.archivos_fijos) assert.equal(hash(path.join(base,f.archivo)),f.sha256,'Cambió la entrada '+f.archivo);
  return registro;
}

function validarRespuesta(raw,entrada,solicitud) {
  const validar=validadores[solicitud.group_id];
  if(!validar || !validar(raw)) return ['Formato de respuesta: '+(validar ? ajv.errorsText(validar.errors) : 'grupo desconocido')];
  const problemas=[];
  try {assert.deepEqual(raw.run,solicitud.run);} catch (_) {problemas.push('run distinto de la solicitud');}
  problemas.push(...validarContrato(raw,entrada,'wireframe'));
  if(!problemas.length) problemas.push(...revisarEstado(raw).errores);
  return problemas;
}

async function ejecutarUna(base=BASE) {
  const registro=verificar(base);assert.equal(cli(),registro.cli,'Cambió la CLI registrada.');
  const pruebas=registro.posiciones.map(p=>path.join(base,'trazas',p.id+'.json')).filter(fs.existsSync).map(leer);
  assert(pruebas.every(p=>!['iniciado','error_tecnico'].includes(p.estado)),'Hay un intento abierto o fallido. Se detienen solicitudes nuevas.');
  const posicion=registro.posiciones.find(p=>!fs.existsSync(path.join(base,'trazas',p.id+'.json')));
  if(!posicion) return console.log('Las dos posiciones ya están conservadas.');
  const {id,grupo}=posicion,solicitud=leer(path.join(base,'solicitudes',id+'.json'));
  const respuesta=path.join(base,solicitud.resultado),rastro=path.join(base,'trazas',id+'.jsonl');
  assert(!fs.existsSync(respuesta)&&!fs.existsSync(rastro),'Existe evidencia de ese intento; no se repite.');
  const enviado=texto(path.join(base,'prompts',grupo+'.md'))+'\n\n'+JSON.stringify(solicitud)+'\n';
  const enviadoArchivo=path.join(base,'trazas',id+'.enviado.txt');fs.writeFileSync(enviadoArchivo,enviado,{flag:'wx'});
  const temporal=fs.mkdtempSync(path.join(os.tmpdir(),'ux-alcance-evaluador-'));
  const args=['exec','--ignore-user-config','--ephemeral','--skip-git-repo-check','--model',registro.modelo,
    '--sandbox','read-only','--cd',temporal,'--disable','shell_tool','--disable','apps','--disable','multi_agent',
    '-c','project_doc_max_bytes=0','-c','web_search="disabled"','-c','model_reasoning_effort="low"',
    '-c','model_instructions_file='+JSON.stringify(path.join(base,'BASE-INSTRUCCIONES.md'))];
  for(const img of solicitud.imagenes) args.push('--image',path.join(base,img.archivo));
  args.push('--output-last-message',respuesta,'--json','-');
  const pruebaArchivo=path.join(base,'trazas',id+'.json');
  const prueba={id,inicio:new Date().toISOString(),estado:'iniciado',comando:args,
    texto_enviado_sha256:hash(enviadoArchivo),errores:[]};guardar(pruebaArchivo,prueba);
  const stderr=path.join(base,'trazas',id+'.stderr.log');
  const out=fs.openSync(rastro,'wx'),err=fs.openSync(stderr,'wx');
  const hijo=spawn('codex',args,{cwd:temporal,stdio:['pipe',out,err]});let fallo=null;
  hijo.on('error',e=>{fallo=e.message;});hijo.stdin.on('error',()=>{});hijo.stdin.end(enviado);
  const limite=setTimeout(()=>hijo.kill('SIGTERM'),240000);
  const fin=await new Promise(resolve=>hijo.on('close',(codigo,senal)=>resolve({codigo,senal})));
  clearTimeout(limite);fs.closeSync(out);fs.closeSync(err);fs.rmSync(temporal,{recursive:true,force:true});
  Object.assign(prueba,{fin:new Date().toISOString(),proceso:fin,error_proceso:fallo,estado:'error_tecnico',
    traza_sha256:hash(rastro),stderr_sha256:hash(stderr)});
  try {
    assert(!fallo&&fin.codigo===0&&fs.existsSync(respuesta),'La ejecución no produjo una respuesta completa.');
    const eventos=texto(rastro).trim().split('\n').map(JSON.parse);
    prueba.sesion=eventos.find(e=>e.type==='thread.started')?.thread_id;
    prueba.uso=eventos.find(e=>e.type==='turn.completed')?.usage;
    const mensaje=eventos.filter(e=>e.type==='item.completed'&&e.item?.type==='agent_message').at(-1);
    assert(prueba.sesion&&prueba.uso&&mensaje,'Falta la sesión, uso o mensaje final.');
    assert(!eventos.some(e=>e.item?.type&&!['agent_message','reasoning'].includes(e.item.type)),'Hubo una acción no prevista.');
    assert.equal(mensaje.item.text.trimEnd(),texto(respuesta).trimEnd(),'La respuesta no coincide con el original.');
    prueba.respuesta_sha256=hash(respuesta);prueba.estado='respuesta_invalida';
    try {
      const raw=leer(respuesta),entrada=leer(path.join(base,'entradas',grupo+'.json'));
      prueba.errores=validarRespuesta(raw,entrada,solicitud);
      if(!prueba.errores.length) prueba.estado='respuesta_valida';
    } catch(e) {prueba.errores=[e.message];}
  } catch(e) {prueba.errores=[e.message];}
  guardar(pruebaArchivo,prueba);
  console.log(id+': '+prueba.estado+(prueba.errores.length?' — '+prueba.errores.join('; '):''));
  if(prueba.estado==='error_tecnico') process.exitCode=1;
}

function cerrar(base=BASE) {
  const registro=verificar(base),resultados=[];
  for(const p of registro.posiciones) {
    const prueba=leer(path.join(base,'trazas',p.id+'.json'));
    assert(['respuesta_valida','respuesta_invalida'].includes(prueba.estado),'Falta una posición cerrada: '+p.id);
    const r=path.join(base,'respuestas',p.id+'.json');assert.equal(hash(r),prueba.respuesta_sha256);
    assert.equal(hash(path.join(base,'trazas',p.id+'.jsonl')),prueba.traza_sha256);
    assert.equal(hash(path.join(base,'trazas',p.id+'.stderr.log')),prueba.stderr_sha256);
    assert.equal(hash(path.join(base,'trazas',p.id+'.enviado.txt')),prueba.texto_enviado_sha256);
    const eventos=texto(path.join(base,'trazas',p.id+'.jsonl')).trim().split('\n').map(JSON.parse);
    assert.equal(eventos.find(e=>e.type==='thread.started')?.thread_id,prueba.sesion);
    assert.deepEqual(eventos.find(e=>e.type==='turn.completed')?.usage,prueba.uso);
    const mensaje=eventos.filter(e=>e.type==='item.completed'&&e.item?.type==='agent_message').at(-1);
    assert(mensaje,'Falta el mensaje original.');assert.equal(mensaje.item.text.trimEnd(),texto(r).trimEnd());
    assert(!eventos.some(e=>e.item?.type&&!['agent_message','reasoning'].includes(e.item.type)),'Hubo una acción no prevista.');
    const fila={id:p.id,estado:prueba.estado,sesion:prueba.sesion,errores:prueba.errores};
    if(prueba.estado==='respuesta_valida') {
      const raw=leer(r),entrada=leer(path.join(base,'entradas',p.grupo+'.json'));
      assert.deepEqual(validarRespuesta(raw,entrada,leer(path.join(base,'solicitudes',p.id+'.json'))),[]);
      fila.puntaje_del_modelo=raw.score;
      if(p.grupo==='g3') fila.revision_de_reglas=propuesta.auditarG3(raw,entrada);
      else fila.diagnostico=propuesta.diagnosticoG6(raw);
    }
    resultados.push(fila);
  }
  assert.equal(new Set(resultados.map(r=>r.sesion)).size,2,'Las sesiones no son independientes.');
  const cierre={fecha:new Date().toISOString(),revision:registro.revision,tipo:'Comprobación de desarrollo, sin referencia experta',resultados};
  guardar(path.join(base,'RESULTADOS.json'),cierre);return cierre;
}

if(require.main===module) Promise.resolve().then(()=>{
  const modo=process.argv[2];
  if(modo==='preparar') return console.log('Preparadas '+preparar().posiciones.length+' posiciones, sin llamar al modelo.');
  if(modo==='verificar') return console.log('Fuentes y entradas intactas: '+verificar().revision);
  if(modo==='ejecutar-una') return ejecutarUna();
  if(modo==='cerrar') return console.log(JSON.stringify(cerrar(),null,2));
  throw Error('Uso: preparar|verificar|ejecutar-una|cerrar');
}).catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={preparar,verificar,validarRespuesta,cerrar};
