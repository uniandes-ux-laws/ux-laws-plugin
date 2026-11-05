#!/usr/bin/env node
'use strict';
const fs = require('fs'), path = require('path');
const {verificarReglas,hash} = require('./verificar-reglas');
const ROOT = path.resolve(__dirname,'..');

function verificarEntrega(dir = ROOT) {
  const leer = nombre => JSON.parse(fs.readFileSync(path.join(dir,nombre),'utf8'));
  const entrega = leer('entrega.json'), version = leer('release/version.json').version;
  if (entrega.version !== version) throw Error('La versión del registro no coincide.');
  const nombres = new Set();
  for (const f of entrega.archivos) {
    if (nombres.has(f.archivo) || path.isAbsolute(f.archivo) || f.archivo.split(/[\\/]/).includes('..')) throw Error('Ruta repetida o fuera de la entrega: '+f.archivo);
    nombres.add(f.archivo);
    if (hash(path.join(dir,f.archivo)) !== f.sha256) throw Error('Cambió un archivo de la entrega: '+f.archivo);
    if (!f.cambio && f.sha256 !== f.fuente_sha256) throw Error('La copia difiere de la fuente: '+f.archivo);
  }
  const p = leer('package.json'), lock = leer('package-lock.json'), plugin = leer('.claude-plugin/plugin.json');
  if ([p.version,lock.version,lock.packages[''].version,plugin.version].some(v => v !== version)) throw Error('Las versiones de instalación no coinciden.');
  const cambio = leer('release/dependencias.json');
  if (lock.packages['node_modules/'+cambio.paquete]?.version !== cambio.actual) throw Error('La entrega no incluye la corrección de fast-uri.');
  if (hash(path.join(dir,'package-lock.json')) !== hash(path.join(dir,cambio.archivo_entrega))) throw Error('Las copias del archivo de dependencias no coinciden.');
  const skills = fs.readdirSync(path.join(dir,'skills')).filter(n => fs.existsSync(path.join(dir,'skills',n,'SKILL.md')));
  if (skills.length !== 8 || !skills.includes('ux-audit')) throw Error('Falta alguna de las siete skills o el orquestador.');
  verificarReglas(path.join(dir,'docs'));
  return {version,archivos:nombres.size,grupos:7,fast_uri:cambio.actual,coinciden:true};
}
if (require.main === module) {
  try {console.log(JSON.stringify(verificarEntrega(),null,2));}
  catch(e) {console.error(e.message);process.exitCode=1;}
}
module.exports = {verificarEntrega};
