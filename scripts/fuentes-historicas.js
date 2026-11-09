'use strict';
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const ROOT=path.resolve(__dirname,'..');
const CARPETA=path.join(ROOT,'historial/fuentes-g3-g6-2026-11-05');
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

function archivoAnterior(nombre,carpeta=CARPETA) {
  if (path.isAbsolute(nombre)||nombre.split(/[\\/]/).includes('..')) throw Error('Ruta histórica fuera del archivo.');
  const manifiesto=JSON.parse(fs.readFileSync(path.join(carpeta,'MANIFIESTO.json')));
  const fila=manifiesto.archivos.find(f=>f.archivo===nombre);
  if(!fila) throw Error('La fuente anterior no está registrada: '+nombre);
  if(fila.copia!=='archivos/'+nombre+'.fuente') throw Error('Ruta de copia histórica inesperada.');
  const archivo=path.join(carpeta,fila.copia);
  if(hash(archivo)!==fila.sha256) throw Error('Cambió la fuente histórica: '+nombre);
  return archivo;
}

function verificarArchivo(carpeta=CARPETA) {
  const manifiesto=JSON.parse(fs.readFileSync(path.join(carpeta,'MANIFIESTO.json')));
  for(const f of manifiesto.archivos) archivoAnterior(f.archivo,carpeta);
  for(const r of manifiesto.registros_anteriores) {
    const registro=path.join(ROOT,r.archivo);
    if(hash(registro)!==r.sha256) throw Error('Cambió el registro anterior: '+r.archivo);
    const data=JSON.parse(fs.readFileSync(registro));
    const fuentes=data.support_files_sha256||Object.fromEntries(data.fuentes.map(f=>[f.archivo,f.sha256]));
    for(const [nombre,esperado] of Object.entries(fuentes)) {
      if(hash(archivoAnterior(nombre,carpeta))!==esperado) throw Error('La copia no coincide con el registro anterior: '+nombre);
    }
  }
  return {fuentes:manifiesto.archivos.length,registros:manifiesto.registros_anteriores.length};
}

// Se consulta la copia que corresponde al registro; no se cambia su huella.
function comprobarFuente(f,anterior=false) {
  const archivo=anterior?archivoAnterior(f.archivo):path.join(ROOT,f.archivo);
  if(hash(archivo)!==f.sha256) throw Error('Huella distinta: '+f.archivo);
}

function entornoAnterior() {
  verificarArchivo();
  const temporal=fs.mkdtempSync(path.join(os.tmpdir(),'ux-fuentes-anteriores-'));
  const manifiesto=JSON.parse(fs.readFileSync(path.join(CARPETA,'MANIFIESTO.json')));
  for(const f of manifiesto.archivos) {
    const destino=path.join(temporal,f.archivo);fs.mkdirSync(path.dirname(destino),{recursive:true});
    fs.copyFileSync(archivoAnterior(f.archivo),destino);
  }
  function completar(origen,destino) {
    if(!fs.existsSync(destino)) {fs.symlinkSync(origen,destino,'dir');return;}
    for(const n of fs.readdirSync(origen,{withFileTypes:true})) {
      const a=path.join(origen,n.name),b=path.join(destino,n.name);
      if(!fs.existsSync(b)) fs.symlinkSync(a,b,n.isDirectory()?'dir':'file');
      else if(n.isDirectory()&&fs.lstatSync(b).isDirectory()) completar(a,b);
    }
  }
  for(const nombre of ['node_modules','calibracion','captures','corpus','dorados','pilotos','preparacion','verificaciones']) {
    if(fs.existsSync(path.join(ROOT,nombre))) completar(path.join(ROOT,nombre),path.join(temporal,nombre));
  }
  return {carpeta:temporal,limpiar:()=>fs.rmSync(temporal,{recursive:true,force:true})};
}

function reglasPropuestaAnterior() {
  const entorno=entornoAnterior();
  try {return require(path.join(entorno.carpeta,'scripts/alcance-g3-g6.js'));}
  finally {entorno.limpiar();}
}

module.exports={CARPETA,archivoAnterior,verificarArchivo,comprobarFuente,entornoAnterior,reglasPropuestaAnterior};
