#!/usr/bin/env node
'use strict';
const path=require('path');
const {execFileSync}=require('child_process');
const {verificarArchivo,entornoAnterior}=require('./fuentes-historicas');

function verificar() {
  const comprobacion=verificarArchivo(),entorno=entornoAnterior();
  try {
    for(const [script,modo] of [['pilot-g3-g6-real.js','verificar-entradas'],['prueba-alcance-g3-g6.js','verificar']]) {
      execFileSync(process.execPath,[path.join(entorno.carpeta,'scripts',script),modo],{
        cwd:entorno.carpeta,stdio:'pipe',timeout:60000});
    }
    return {...comprobacion,pilotos_G3_G6:'fuentes y entradas verificadas',prueba_de_desarrollo:'fuentes y entradas verificadas',
      nota:'Se usó el código anterior en una carpeta temporal. No se ejecutaron modelos ni se cambiaron originales.'};
  } finally {entorno.limpiar();}
}
if(require.main===module)try{console.log(JSON.stringify(verificar(),null,2));}catch(e){console.error(e.message);process.exitCode=1;}
module.exports={verificar};
