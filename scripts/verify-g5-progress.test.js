'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('fs'),os=require('os'),path=require('path'),crypto=require('crypto');
const {verifySeal}=require('./verify-g5-progress');
function fixture(t){
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'g5-seal-test-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
  for(const f of ['respuesta.json','traza.jsonl'])fs.writeFileSync(path.join(dir,f),'original '+f);
  fs.writeFileSync(path.join(dir,'INFORME.md'),'Derivado');
  const lines=['respuesta.json','traza.jsonl'].map(f=>crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,f))).digest('hex')+'\t'+f);
  fs.writeFileSync(path.join(dir,'SELLO-SHA256.tsv'),lines.join('\n')+'\n');return {dir,lines};
}
test('el sello verifica originales aunque se actualice el informe derivado',t=>{
  const {dir}=fixture(t);fs.writeFileSync(path.join(dir,'INFORME.md'),'Informe actualizado');assert.equal(verifySeal(dir),2);
});
test('el sello detecta una respuesta modificada',t=>{
  const {dir}=fixture(t);fs.writeFileSync(path.join(dir,'respuesta.json'),'modificada');assert.throws(()=>verifySeal(dir),/hash distinto/);
});
test('el sello detecta un archivo primario omitido',t=>{
  const {dir,lines}=fixture(t);fs.writeFileSync(path.join(dir,'SELLO-SHA256.tsv'),lines[0]+'\n');assert.throws(()=>verifySeal(dir),/omite archivos/);
});
test('el sello detecta una fila duplicada',t=>{
  const {dir,lines}=fixture(t);fs.writeFileSync(path.join(dir,'SELLO-SHA256.tsv'),[...lines,lines[0]].join('\n')+'\n');assert.throws(()=>verifySeal(dir),/duplicada/);
});
