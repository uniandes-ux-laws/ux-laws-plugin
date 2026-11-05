#!/usr/bin/env node
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('url');
const {execFileSync} = require('child_process');
const {verificarEntrega} = require('./verificar-entrega');
const {capturePage} = require('../capture/capture');
const ROOT = path.resolve(__dirname,'..');

async function main() {
  const soloMedidas = process.argv.includes('--solo-medidas');
  if (process.argv.slice(2).some(a => a !== '--solo-medidas')) throw Error('Uso: node scripts/probar-entrega.js [--solo-medidas]');
  verificarEntrega();
  const cambio = require('../release/dependencias.json');
  assert.equal(require('fast-uri/package.json').version,cambio.actual,'La librería instalada debe coincidir con la entrega.');
  const uri = require('fast-uri');
  for (const entrada of ['%6Aavascript:alert(1)','%u006Aavascript:alert(1)']) {
    assert.ok(uri.parse(entrada).error,'Una dirección con esquema codificado debe rechazarse.');
  }
  assert.equal(uri.parse('https://ejemplo.co/ruta').error,undefined,'Una dirección normal debe seguir aceptándose.');
  const ejecutar = args => execFileSync(process.execPath,args,{cwd:ROOT,stdio:'inherit'});
  if (!soloMedidas) {
    ejecutar(['scripts/validate-result.js','--selftest']);
    ejecutar(['capture/verify-fidelity.js','--tolerance','1']);
  }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(),'ux-entrega-'));
  try {
    const captura = path.join(tmp,'captura');
    await capturePage({url:pathToFileURL(path.join(ROOT,'capture/fixtures/controls.html')).href,out:captura});
    ejecutar(['measure/measure-page.js',captura]);
    ejecutar(['scripts/validate-measurements.js',path.join(captura,'measurements.json')]);
    for (const [modo,total] of soloMedidas ? [] : [['referencia',35],['comparacion',65]]) {
      const salida = path.join(tmp,modo);
      ejecutar(['scripts/orchestrate.js','preparar','--captura',captura,'--out',salida,'--modo',modo,
        '--runtime','prueba-local','--model-id','modelo-prueba-1','--decoding','{"declarado":"Prueba de archivos, sin invocar modelos"}']);
      ejecutar(['scripts/orchestrate.js','verificar','--corrida',salida]);
      assert.equal(fs.readdirSync(path.join(salida,'solicitudes')).length,total);
      assert.equal(fs.readdirSync(path.join(salida,'resultados')).length,0);
    }
  } finally {fs.rmSync(tmp,{recursive:true,force:true});}
  console.log(soloMedidas ? 'Medidas comprobadas sobre una captura local.' :
    'Instalación comprobada: reglas, esquemas, captura local y preparación de 35/65 solicitudes. No se llamó a modelos.');
}
if (require.main === module) main().catch(e => {console.error(e.message);process.exitCode=1;});
