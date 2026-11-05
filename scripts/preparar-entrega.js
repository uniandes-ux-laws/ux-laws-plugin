#!/usr/bin/env node
'use strict';
const fs = require('fs'), path = require('path');
const {execFileSync} = require('child_process');
const {isDeepStrictEqual} = require('util');
const {verificarReglas,hash} = require('./verificar-reglas');
const VERSION = require('../release/version.json');
const DEPENDENCIA = require('../release/dependencias.json');
const ROOT = path.resolve(__dirname,'..');

const SCRIPTS = [
  'orchestrate.js','execution-options.js','estado-resultado.js',
  'g3-g6-contract.js','g4-evaluator-contract.js','g5-evaluator-contract.js','pilot-g2-g7-contract.js',
  'pilot-g4-real.js','pilot-g5-real.js','report-g4-pilot.js',
  'demo.js','metrics-wireframe.js','build-wireframe-report.js','capture-corpus.js','revisar-capturas.js',
  'preparar-grilla.js','validate-measurements.js','validate-result.js','link-skills.sh',
  'build-appendix.js','preparar-reglas.js','verificar-reglas.js','verificar-entrega.js','probar-entrega.js',
];
const DOCS = ['instalacion.md','LEEME-ENTREGA.md','OPCIONES-EJECUCION-04NOV.md',
  'runtimes-ejemplo.json','adr-01-caja-de-tinta.md','hipotesis-m3.md','ACTUALIZACION-DEPENDENCIA-05NOV.md'];
const FORMATOS = ['md','docx','pdf','fuentes.json','documentos.json'];

function revisarDependencias(base, actual) {
  const nombre = 'node_modules/'+DEPENDENCIA.paquete;
  if (base.packages[nombre]?.version !== DEPENDENCIA.anterior || actual.packages[nombre]?.version !== DEPENDENCIA.actual) {
    throw Error('La versión de fast-uri no coincide con la actualización registrada.');
  }
  const esperado = structuredClone(base);
  esperado.version = VERSION.version;
  esperado.packages[''].version = VERSION.version;
  esperado.packages[nombre] = actual.packages[nombre];
  if (!isDeepStrictEqual(esperado,actual)) throw Error('Se cambiaron otras dependencias además de fast-uri.');
}

function prepararEntrega(salida, {reglasDir = path.join(ROOT,'docs')} = {}) {
  const out = path.resolve(salida);
  if (fs.existsSync(out) && fs.readdirSync(out).length) throw Error('La carpeta de entrega ya tiene archivos. Usa otra carpeta.');
  verificarReglas(reglasDir);
  const original = path.join(ROOT,DEPENDENCIA.archivo_original);
  const dependencias = path.join(ROOT,DEPENDENCIA.archivo_entrega);
  if (hash(original) !== DEPENDENCIA.original_sha256) throw Error('Cambió el archivo de dependencias histórico.');
  revisarDependencias(JSON.parse(fs.readFileSync(original)),JSON.parse(fs.readFileSync(dependencias)));
  fs.mkdirSync(out,{recursive:true});
  const archivos = [];
  function copiar(origen, destino, cambio) {
    const final = path.join(out,destino);
    fs.mkdirSync(path.dirname(final),{recursive:true});
    fs.copyFileSync(origen,final);
    const fuente = {archivo:destino,origen:path.relative(ROOT,origen).replace(/\\/g,'/'),fuente_sha256:hash(origen)};
    if (cambio) { cambio(final); fuente.cambio = 'Metadatos de instalación; no modifica el código ni las rúbricas.'; }
    archivos.push({...fuente,sha256:hash(final)});
  }
  function carpeta(nombre) {
    for (const entrada of fs.readdirSync(path.join(ROOT,nombre),{withFileTypes:true})) {
      if (entrada.name === '.DS_Store' || entrada.name.endsWith('.test.js')) continue;
      const relativo = path.join(nombre,entrada.name);
      if (entrada.isDirectory()) carpeta(relativo);
      else if (entrada.isFile()) copiar(path.join(ROOT,relativo),relativo);
      else throw Error('No se esperaba un enlace en '+relativo);
    }
  }
  for (const nombre of ['capture','measure','shared','skills','release']) carpeta(nombre);
  for (const nombre of SCRIPTS.concat(fs.readdirSync(path.join(ROOT,'scripts')).filter(n => n.endsWith('.schema.json')))) {
    copiar(path.join(ROOT,'scripts',nombre),'scripts/'+nombre);
  }
  for (const nombre of DOCS) copiar(path.join(ROOT,'docs',nombre),'docs/'+nombre);
  for (const formato of FORMATOS) copiar(path.join(reglasDir,'apendice-rubricas.'+formato),'docs/apendice-rubricas.'+formato);
  copiar(path.join(ROOT,'docs/LEEME-ENTREGA.md'),'README.md');
  copiar(path.join(ROOT,'LICENSE'),'LICENSE');
  copiar(path.join(ROOT,'corpus/observaciones-capturas-2026-11-04.json'),'corpus/observaciones-capturas-2026-11-04.json');
  function editarJSON(archivo, editar) {
    const datos = JSON.parse(fs.readFileSync(archivo,'utf8'));
    editar(datos);
    fs.writeFileSync(archivo,JSON.stringify(datos,null,2)+'\n');
  }
  copiar(path.join(ROOT,'package.json'),'package.json',archivo => editarJSON(archivo,p => {
    p.version = VERSION.version;
    p.scripts = {
      link:'bash scripts/link-skills.sh',test:'node scripts/probar-entrega.js',
      verify:'node scripts/verificar-entrega.js',
      validate:'node scripts/validate-result.js --selftest',
      'validate:measurements':'node scripts/probar-entrega.js --solo-medidas',
      fidelity:'node capture/verify-fidelity.js --tolerance 1',
      capture:'node capture/capture.js',demo:'node scripts/demo.js',
      measure:'node measure/measure-page.js',orchestrate:'node scripts/orchestrate.js',
      appendix:'node scripts/preparar-reglas.js',
    };
  }));
  copiar(dependencias,'package-lock.json');
  copiar(path.join(ROOT,'.claude-plugin/plugin.json'),'.claude-plugin/plugin.json',archivo => editarJSON(archivo,p => {p.version = VERSION.version;}));
  const commit = execFileSync('git',['rev-parse','HEAD'],{cwd:ROOT,encoding:'utf8'}).trim();
  fs.writeFileSync(path.join(out,'entrega.json'),JSON.stringify({
    version:VERSION.version,fecha:VERSION.fecha,estado:VERSION.estado,
    dependencia_actualizada:{paquete:DEPENDENCIA.paquete,anterior:DEPENDENCIA.anterior,actual:DEPENDENCIA.actual},
    commit_base:commit,nota:'Incluye cambios locales posteriores al commit base. Las huellas identifican los archivos entregados.',
    archivos:archivos.sort((a,b) => a.archivo.localeCompare(b.archivo)),
  },null,2)+'\n');
  return out;
}

function main() {
  const args = process.argv.slice(2);
  let salida = path.join(ROOT,'dist','ux-laws-'+VERSION.version), zip = false;
  for (let i=0;i<args.length;i++) {
    if (args[i] === '--out' && args[i+1]) salida = path.resolve(args[++i]);
    else if (args[i] === '--zip') zip = true;
    else throw Error('Uso: node scripts/preparar-entrega.js [--out carpeta-nueva] [--zip]');
  }
  const archivo = salida+'.zip';
  if (zip && (fs.existsSync(archivo) || fs.existsSync(archivo+'.sha256'))) throw Error('Ya existe el ZIP o su huella. No se reemplaza.');
  prepararEntrega(salida);
  execFileSync(process.execPath,[path.join(salida,'scripts/verificar-entrega.js')],{stdio:'inherit'});
  if (zip) {
    execFileSync('/usr/bin/zip',['-qr',archivo,path.basename(salida)],{cwd:path.dirname(salida)});
    fs.writeFileSync(archivo+'.sha256',hash(archivo)+'  '+path.basename(archivo)+'\n');
    console.log('ZIP listo: '+archivo);
  }
  console.log('Entrega local: '+salida+'. Falta la revisión de Juan para publicar.');
}
if (require.main === module) { try { main(); } catch(e) {console.error(e.message);process.exitCode=1;} }
module.exports = {prepararEntrega,revisarDependencias};
