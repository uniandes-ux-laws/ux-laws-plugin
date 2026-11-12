#!/usr/bin/env node
'use strict';
// Comprueba la prueba de 0.2.2 sin volver a pedir respuestas al modelo.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {execFileSync}=require('child_process');
const {isDeepStrictEqual}=require('util');
const ROOT=path.resolve(__dirname,'..');
const BASE=path.join(ROOT,'verificaciones/integracion-0.2.2-2026-11-05');
const PAQUETE=path.join(ROOT,'dist/chequeo-codex-0.2.2/ux-laws-0.2.2');
const leer=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const comprobar=(valor,mensaje)=>{if(!valor)throw Error(mensaje);};
const absoluta=f=>path.resolve(PAQUETE,f);

// El ZIP y el paquete descomprimido no se versionan (dist/ está en .gitignore) y no hay
// Release publicada. Sin ellos la verificación completa no puede correr: se dice así,
// en vez de fallar con un ENOENT (auditoría del 12 de noviembre, B1).
const FALTA_PAQUETE='Falta dist/ux-laws-0.2.2.zip o dist/chequeo-codex-0.2.2/ux-laws-0.2.2/. '+
  'La verificación completa necesita el paquete 0.2.2, que no está en el repositorio: se construye con '+
  'node scripts/preparar-reglas.js (requiere LibreOffice) y node scripts/preparar-entrega.js --zip, '+
  'y debe coincidir con la huella registrada. Sin el paquete, '+
  'node scripts/verificar-integracion-real.js --solo-sello comprueba únicamente el sello de la evidencia.';

function verificar() {
  comprobar(fs.existsSync(path.join(ROOT,'dist/ux-laws-0.2.2.zip'))&&fs.existsSync(PAQUETE),FALTA_PAQUETE);
  const registro=leer(path.join(BASE,'REGISTRO-PREVIO.json'));
  comprobar(hash(path.join(ROOT,'scripts/chequeo-integracion-real.js'))===registro.ejecutor_sha256,'Cambió el ejecutor registrado.');
  comprobar(hash(path.join(ROOT,'dist/ux-laws-0.2.2.zip'))===registro.zip_sha256,'Cambió el ZIP registrado.');
  comprobar(hash(path.join(BASE,'BASE-INSTRUCCIONES.md'))===registro.instrucciones_sha256,'Cambiaron las instrucciones.');
  for(const f of registro.archivos_paquete) comprobar(hash(absoluta(f.archivo))===f.sha256,'Cambió el paquete: '+f.archivo);
  execFileSync(process.execPath,[path.join(PAQUETE,'scripts/orchestrate.js'),'verificar','--corrida',path.join(BASE,'corrida')],{stdio:'pipe'});
  const libro=leer(path.join(BASE,'corrida/invocaciones.json'));
  const perfil=leer(path.join(BASE,'corrida/perfil.json'));
  comprobar(libro.invocaciones.length===7&&perfil.perfil.length===7,'Faltan los siete grupos.');
  comprobar(perfil.version_perfil==='2.1.0'&&perfil.revision_g3_g6===registro.revision_g3_g6,'Versión del perfil incorrecta.');
  const Ajv=require(path.join(PAQUETE,'node_modules/ajv/dist/2020'));
  const ajv=new Ajv({strict:false,allErrors:true});require(path.join(PAQUETE,'node_modules/ajv-formats'))(ajv);
  const ids=new Set(leer(path.join(BASE,'captura/nodes.json')).map(n=>n.id));
  const sesiones=new Set(),resultados=[];
  for(const inv of libro.invocaciones) {
    const prefijo=path.join(BASE,'trazas',inv.id),traza=leer(prefijo+'.json');
    const respuesta=fs.readFileSync(absoluta(inv.resultado_esperado),'utf8'),obj=JSON.parse(respuesta);
    const solicitud=leer(absoluta(inv.solicitud)),entrada=leer(absoluta(inv.entrada));
    comprobar(traza.estado==='respuesta_valida'&&traza.proceso.codigo===0,'Posición sin respuesta válida: '+inv.id);
    for(const [archivo,esperado] of [[prefijo+'.jsonl',traza.traza_sha256],[prefijo+'.stderr.log',traza.stderr_sha256],
      [prefijo+'.enviado.txt',traza.texto_enviado_sha256],[absoluta(inv.solicitud),traza.solicitud_sha256],
      [absoluta(inv.resultado_esperado),traza.respuesta_sha256]]) comprobar(hash(archivo)===esperado,'Huella distinta: '+archivo);
    const eventos=fs.readFileSync(prefijo+'.jsonl','utf8').trim().split('\n').map(JSON.parse);
    const mensaje=eventos.filter(e=>e.type==='item.completed'&&e.item?.type==='agent_message').at(-1);
    comprobar(mensaje?.item.text.trimEnd()===respuesta.trimEnd(),'El original difiere del mensaje final: '+inv.id);
    comprobar(eventos.find(e=>e.type==='thread.started')?.thread_id===traza.sesion,'Sesión distinta: '+inv.id);
    comprobar(isDeepStrictEqual(eventos.find(e=>e.type==='turn.completed')?.usage,traza.uso),'Uso distinto: '+inv.id);
    comprobar(!eventos.some(e=>e.item?.type&&!['agent_message','reasoning'].includes(e.item.type)),'Acción no prevista: '+inv.id);
    comprobar(traza.cli===registro.cli&&traza.modelo===registro.modelo,'Atribución distinta: '+inv.id);
    comprobar(inv.contexto_limpio===true&&traza.contexto_limpio===true,'Aislamiento sin declarar: '+inv.id);
    sesiones.add(traza.sesion);
    const enviado=fs.readFileSync(absoluta(inv.prompt),'utf8')+'\n\n# Solicitud individual\n'+JSON.stringify(solicitud)+'\n';
    comprobar(fs.readFileSync(prefijo+'.enviado.txt','utf8')===enviado,'Texto enviado distinto: '+inv.id);
    comprobar(isDeepStrictEqual(traza.imagenes,solicitud.imagenes),'Orden de imágenes distinto: '+inv.id);
    comprobar(isDeepStrictEqual(obj.run,solicitud.run),'Run distinto: '+inv.id);
    comprobar(ajv.compile(leer(absoluta(inv.esquema)))(obj),'Respuesta fuera del esquema: '+inv.id);
    const errores=[...require(path.join(PAQUETE,'scripts/estado-resultado')).revisarEstado(obj).errores,
      ...require(path.join(PAQUETE,'scripts/execution-options')).validarContrato(obj,entrada,inv.channel,ids)];
    if(inv.group_id==='g1')errores.push(...require(path.join(PAQUETE,'measure/g1-input')).revisarG1(obj,entrada));
    comprobar(!errores.length,inv.id+': '+errores.join('; '));
    const grupo=perfil.perfil.find(g=>g.group_id===inv.group_id&&g.channel===inv.channel);
    comprobar(grupo?.evaluaciones.length===1,'Repeticiones distintas: '+inv.id);
    const evaluacion=grupo.evaluaciones[0];
    const estado=obj.not_applicable?'no_aplica':obj.score===null?'abstencion':'puntaje';
    comprobar(evaluacion.score===obj.score&&evaluacion.estado===estado&&evaluacion.trigger===obj.trigger,'El perfil cambió el resultado: '+inv.id);
    const reglas=require(path.join(PAQUETE,'scripts/alcance-g3-g6'));
    if(inv.group_id==='g3')comprobar(isDeepStrictEqual(evaluacion.revision_de_reglas,reglas.auditarG3(obj,entrada)),'Revisión G3 distinta.');
    if(inv.group_id==='g6')comprobar(isDeepStrictEqual(evaluacion.diagnostico,reglas.diagnosticoG6(obj)),'Diagnóstico G6 distinto.');
    resultados.push({grupo:inv.group_id,estado,puntaje:obj.score,trigger:obj.trigger});
  }
  comprobar(sesiones.size===7,'Las sesiones no son distintas.');
  const {perfilLegible}=require(path.join(PAQUETE,'scripts/perfil-legible'));
  comprobar(fs.readFileSync(path.join(BASE,'corrida/perfil.md'),'utf8')===perfilLegible(perfil,path.join(BASE,'corrida'),PAQUETE),'Informe legible distinto.');
  return {version:'0.2.2',sesiones:sesiones.size,respuestas_validas:resultados.length,resultados,
    originales_y_perfil_coinciden:true,llamadas_modelo_en_verificacion:0};
}

function archivos(dir,base=dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?archivos(path.join(dir,e.name),base):
    [path.relative(base,path.join(dir,e.name)).replace(/\\/g,'/')]).filter(f=>f!=='SHA256SUMS').sort();
}
function sello(crear) {
  const archivo=path.join(BASE,'SHA256SUMS');
  if(crear) {
    comprobar(!fs.existsSync(archivo),'El sello ya existe. No se reemplaza.');
    fs.writeFileSync(archivo,archivos(BASE).map(f=>hash(path.join(BASE,f))+'  '+f).join('\n')+'\n',{flag:'wx'});
  }
  const filas=fs.readFileSync(archivo,'utf8').trim().split('\n').map(l=>[l.slice(0,64),l.slice(66)]);
  comprobar(isDeepStrictEqual(filas.map(f=>f[1]),archivos(BASE)),'Cambió la lista de archivos sellados.');
  for(const [esperado,f] of filas)comprobar(hash(path.join(BASE,f))===esperado,'Cambió el archivo sellado: '+f);
  return filas.length;
}
if(require.main===module)try {
  if(process.argv[2]==='--solo-sello'){
    console.log(JSON.stringify({version:'0.2.2',archivos_sellados:sello(false),
      alcance:'solo el sello de verificaciones/integracion-0.2.2-2026-11-05; no comprueba el paquete ni las respuestas contra él'},null,2));
    return;
  }
  const resultado=verificar(),modo=process.argv[2];
  if(modo==='--seal')resultado.archivos_sellados=sello(true);
  else if(modo==='--verify-seal')resultado.archivos_sellados=sello(false);
  else comprobar(!modo,'Uso: node scripts/verificar-integracion-real.js [--seal|--verify-seal|--solo-sello]');
  console.log(JSON.stringify(resultado,null,2));
}catch(e){console.error(e.message);process.exitCode=1;}
module.exports={verificar};
