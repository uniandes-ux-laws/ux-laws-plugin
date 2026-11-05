#!/usr/bin/env node
'use strict';
const fs = require('fs'), path = require('path');
const crypto = require('crypto');
const {execFileSync} = require('child_process');
const {modeloValido} = require('./orchestrate');
const ROOT = path.resolve(__dirname,'..');
const leer = archivo => JSON.parse(fs.readFileSync(archivo,'utf8'));
const guardar = (archivo,obj) => fs.writeFileSync(archivo,JSON.stringify(obj,null,2) + '\n');

function planificar(ids, configuracion) {
  if (!Array.isArray(ids) || !ids.length || new Set(ids).size !== ids.length ||
    ids.some(id => !/^[a-z0-9_-]+$/i.test(id))) throw Error('El manifiesto necesita ids válidos, únicos y no vacíos.');
  const runtimes = configuracion.runtimes;
  if (!Array.isArray(runtimes) || runtimes.length !== 2) throw Error('La grilla necesita dos runtimes declarados.');
  if (runtimes.some(r => !r || typeof r.runtime !== 'string')) throw Error('Falta un nombre de runtime.');
  if (new Set(runtimes.map(r => r.runtime?.toLowerCase())).size !== 2) throw Error('Los runtimes deben ser distintos.');
  for (const r of runtimes) {
    if (!/^[a-z0-9][a-z0-9_-]*$/i.test(r.runtime || '')) throw Error('Falta un nombre de runtime válido.');
    if (!modeloValido(r.model_id)) throw Error('Falta el model_id exacto de ' + r.runtime + '.');
    if (!r.decoding || Array.isArray(r.decoding) || typeof r.decoding !== 'object' || !Object.keys(r.decoding).length) throw Error('Falta decoding de ' + r.runtime + '.');
  }
  return {modo:'comparacion',repeticiones:5,solicitudes_por_pagina_y_runtime:65,
    solicitudes_previstas:ids.length * 2 * 65,
    corridas:ids.flatMap(id => runtimes.map(r => ({id,runtime:r.runtime,model_id:r.model_id,
      decoding:r.decoding,carpeta:r.runtime + '/' + id})))};
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help')) {
    console.log('node scripts/preparar-grilla.js --config <runtimes.json> --out <carpeta nueva> [--manifiesto corpus/corpus-v1.csv] [--capturas captures]');
    console.log('Prepara cinco repeticiones por grupo/canal y página en dos runtimes. No ejecuta modelos.');
    return;
  }
  const usadas = new Set();
  for (const flag of args.filter(v => v.startsWith('--'))) {
    if (!['--config','--out','--manifiesto','--capturas'].includes(flag)) throw Error('Opción desconocida: ' + flag);
    if (usadas.has(flag)) throw Error('Opción repetida: ' + flag);
    usadas.add(flag);
  }
  const opcion = (nombre,defecto) => {
    const i = args.indexOf('--' + nombre);
    if (i < 0) return defecto;
    if (!args[i+1] || args[i+1].startsWith('--')) throw Error('Falta el valor de --' + nombre);
    return args[i+1];
  };
  const config = opcion('config',null), salida = opcion('out',null);
  if (!config || !salida) throw Error('Uso: node scripts/preparar-grilla.js --config <runtimes.json> --out <carpeta nueva> [--manifiesto corpus/corpus-v1.csv] [--capturas captures]');
  const manifiesto = path.resolve(ROOT,opcion('manifiesto','corpus/corpus-v1.csv'));
  const capturas = path.resolve(ROOT,opcion('capturas','captures')), out = path.resolve(ROOT,salida);
  const lineas = fs.readFileSync(manifiesto,'utf8').trim().split(/\r?\n/), indice = lineas.shift().split(',').indexOf('id');
  if (indice < 0) throw Error('El manifiesto debe tener la columna id.');
  const ids = lineas.filter(l => l.trim()).map(l => l.split(',')[indice].trim());
  const plan = planificar(ids,leer(path.resolve(ROOT,config)));
  const huella = archivo => crypto.createHash('sha256').update(fs.readFileSync(archivo)).digest('hex');
  plan.manifiesto_sha256 = huella(manifiesto);
  plan.configuracion_sha256 = huella(path.resolve(ROOT,config));
  plan.capturas = path.relative(ROOT,capturas);
  if (fs.existsSync(out) && (!fs.statSync(out).isDirectory() || fs.readdirSync(out).length)) throw Error('La salida ya tiene contenido; usa otra carpeta.');
  for (const id of ids) for (const archivo of ['meta.json','nodes.json','screenshot.png','wireframe.png']) {
    if (!fs.existsSync(path.join(capturas,id,archivo))) throw Error('Falta ' + id + '/' + archivo);
  }
  fs.mkdirSync(out,{recursive:true});
  plan.estado = 'preparando'; guardar(path.join(out,'plan.json'),plan);
  try {
    for (const corrida of plan.corridas) {
      execFileSync(process.execPath,[path.join(__dirname,'orchestrate.js'),'preparar',
        '--captura',path.join(capturas,corrida.id),'--out',path.join(out,corrida.carpeta),
        '--modo','comparacion','--repeticiones','5','--runtime',corrida.runtime,
        '--model-id',corrida.model_id,'--decoding',JSON.stringify(corrida.decoding)],{stdio:'inherit'});
      corrida.preparada = true; guardar(path.join(out,'plan.json'),plan);
    }
    plan.estado = 'preparado'; guardar(path.join(out,'plan.json'),plan);
    console.log(plan.solicitudes_previstas + ' solicitudes preparadas. No se ejecutó ningún modelo.');
  } catch (e) {
    plan.estado = 'preparacion_interrumpida'; guardar(path.join(out,'plan.json'),plan);
    throw Error('La preparación se detuvo; se conserva lo generado. ' + e.message);
  }
}
if (require.main === module) { try { main(); } catch(e) {console.error(e.message);process.exitCode = 1;} }
module.exports = {planificar};
