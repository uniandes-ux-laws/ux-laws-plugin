#!/usr/bin/env node
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const {ORDER,read,buildMarkdown,sourceManifest} = require('./build-appendix');
const ROOT = path.resolve(__dirname,'..');
const hash = archivo => crypto.createHash('sha256').update(fs.readFileSync(archivo)).digest('hex');

function verificarReglas(dir = path.join(ROOT,'docs')) {
  const rubricas = ORDER.map(read), prefijo = path.join(dir,'apendice-rubricas');
  if (fs.readFileSync(prefijo+'.md','utf8') !== buildMarkdown(rubricas)) throw Error('El documento de reglas no coincide con las skills.');
  const fuentes = JSON.parse(fs.readFileSync(prefijo+'.fuentes.json','utf8'));
  if (JSON.stringify(fuentes) !== JSON.stringify(sourceManifest(rubricas))) throw Error('Las fuentes del documento están desactualizadas.');
  const documentos = JSON.parse(fs.readFileSync(prefijo+'.documentos.json','utf8'));
  if (documentos.fuentes_sha256 !== hash(prefijo+'.fuentes.json')) throw Error('Word y PDF pertenecen a otras fuentes.');
  for (const formato of ['docx','pdf']) if (documentos[formato+'_sha256'] !== hash(prefijo+'.'+formato)) throw Error('El '+formato+' cambió respecto al documento generado.');
  return {version:fuentes.version_entrega,rubricas:fuentes.fuentes.length,documentos:['md','docx','pdf'],coinciden:true};
}
if (require.main === module) {
  try { console.log(JSON.stringify(verificarReglas(),null,2)); }
  catch (e) { console.error(e.message); process.exitCode=1; }
}
module.exports = {verificarReglas,hash};
