#!/usr/bin/env node
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const {execFileSync} = require('child_process');
const {verificarReglas,hash} = require('./verificar-reglas');
const ROOT = path.resolve(__dirname,'..');

function main() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(),'ux-reglas-'));
  const prefijo = path.join(tmp,'apendice-rubricas');
  try {
    execFileSync(process.execPath,[path.join(__dirname,'build-appendix.js'),'--out',prefijo+'.docx'],{stdio:'inherit'});
    execFileSync(process.env.SOFFICE_PATH || 'soffice',['-env:UserInstallation=file://'+path.join(tmp,'perfil-office'),
      '--headless','--convert-to','pdf','--outdir',tmp,prefijo+'.docx'],{stdio:'inherit',timeout:120000});
    if (!fs.existsSync(prefijo+'.pdf')) throw Error('LibreOffice no generó el PDF.');
    fs.writeFileSync(prefijo+'.documentos.json',JSON.stringify({
      fuentes_sha256:hash(prefijo+'.fuentes.json'),docx_sha256:hash(prefijo+'.docx'),pdf_sha256:hash(prefijo+'.pdf'),
    },null,2)+'\n');
    verificarReglas(tmp);
    const docs = path.join(ROOT,'docs'), respaldo = path.join(ROOT,'dist','reglas-anteriores');
    fs.mkdirSync(respaldo,{recursive:true});
    for (const formato of ['md','docx','pdf','fuentes.json','documentos.json']) {
      const nombre = 'apendice-rubricas.'+formato, anterior = path.join(docs,nombre);
      if (fs.existsSync(anterior) && !fs.existsSync(path.join(respaldo,nombre))) fs.copyFileSync(anterior,path.join(respaldo,nombre));
      fs.copyFileSync(prefijo+'.'+formato,anterior);
    }
    console.log('Reglas actualizadas en Markdown, Word y PDF. Las copias anteriores están en dist/reglas-anteriores.');
  } finally { fs.rmSync(tmp,{recursive:true,force:true}); }
}
if (require.main === module) { try {main();} catch(e) {console.error(e.message);process.exitCode=1;} }
