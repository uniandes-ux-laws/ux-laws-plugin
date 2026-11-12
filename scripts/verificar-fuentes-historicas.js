#!/usr/bin/env node
'use strict';
const path=require('path');
const {execFileSync}=require('child_process');
const {verificarArchivo,entornoAnterior}=require('./fuentes-historicas');
const {verificarEntradas,NOTA_MEDICION}=require('./verificar-pilotos-g3-g6');

// Las entradas de los pilotos G3/G6 se comprueban regenerando su medición con el
// código archivado, no con el hash en bruto de measurements.json: ese archivo no se
// versiona y lleva marca de tiempo, así que su hash solo se reproducía en la máquina
// del piloto (auditoría del 12 de noviembre, B1). Ver verificar-pilotos-g3-g6.js.
function verificar() {
  const comprobacion=verificarArchivo(),entorno=entornoAnterior();
  try {
    const pilotos=verificarEntradas(entorno.carpeta);
    execFileSync(process.execPath,[path.join(entorno.carpeta,'scripts','prueba-alcance-g3-g6.js'),'verificar'],{
      cwd:entorno.carpeta,stdio:'pipe',timeout:60000});
    return {...comprobacion,pilotos_G3_G6:'fuentes y entradas verificadas ('+pilotos.length+' grupos)',prueba_de_desarrollo:'fuentes y entradas verificadas',
      limite:NOTA_MEDICION,
      nota:'Se usó el código anterior en una carpeta temporal. No se ejecutaron modelos ni se cambiaron originales.'};
  } finally {entorno.limpiar();}
}
if(require.main===module)try{console.log(JSON.stringify(verificar(),null,2));}catch(e){console.error(e.message);process.exitCode=1;}
module.exports={verificar};
