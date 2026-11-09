'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('fs'),os=require('os'),path=require('path');
const {archivoAnterior,verificarArchivo,comprobarFuente,CARPETA}=require('./fuentes-historicas');

test('las fuentes archivadas coinciden con los registros anteriores',()=>{
  const r=verificarArchivo();assert.equal(r.registros,3);assert(r.fuentes>0);
  assert.throws(()=>archivoAnterior('../otro'),/fuera/);
  assert.throws(()=>archivoAnterior('inexistente.js'),/no está registrada/);
});
test('la verificación anterior usa su fuente archivada y no sustituye su huella por la actual',()=>{
  const nombre='skills/g3-capacidad-segmentacion/SKILL.md';
  const m=JSON.parse(fs.readFileSync(path.join(CARPETA,'MANIFIESTO.json'))),f=m.archivos.find(f=>f.archivo===nombre);
  assert.throws(()=>comprobarFuente(f,false),/Huella distinta/);
  assert.doesNotThrow(()=>comprobarFuente(f,true));
});
test('un cambio de una copia histórica se detecta sin cambiar el archivo original',t=>{
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'ux-historial-test-'));t.after(()=>fs.rmSync(tmp,{recursive:true,force:true}));
  const nombre='scripts/alcance-g3-g6.js',fuente=archivoAnterior(nombre),antes=fs.readFileSync(fuente);
  fs.mkdirSync(path.join(tmp,'archivos/scripts'),{recursive:true});
  fs.copyFileSync(path.join(CARPETA,'MANIFIESTO.json'),path.join(tmp,'MANIFIESTO.json'));
  fs.copyFileSync(fuente,path.join(tmp,'archivos',nombre+'.fuente'));
  fs.appendFileSync(path.join(tmp,'archivos',nombre+'.fuente'),'\n// cambio de prueba\n');
  assert.throws(()=>archivoAnterior(nombre,tmp),/Cambió la fuente histórica/);assert.deepEqual(fs.readFileSync(fuente),antes);
});
