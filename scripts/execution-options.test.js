'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const Ajv = require('ajv/dist/2020'), formats = require('ajv-formats');
const {seriesPara,esquemaPara,validarContrato,compararCanales} = require('./execution-options');

test('los esquemas de los trece pares de grupo y canal compilan sin cambiar los originales',() => {
  const original = require('./g7-response.schema.json'), antes = structuredClone(original);
  const ajv = new Ajv({strict:false}); formats(ajv);
  for (const serie of seriesPara('comparacion')) {
    const esquema = esquemaPara(serie.id,serie.channel);
    assert.equal(esquema.properties.channel.const,serie.channel);
    assert.doesNotThrow(() => ajv.compile(esquema));
  }
  assert.deepEqual(original,antes);
  assert.throws(() => seriesPara('otro'),/referencia o comparacion/);
});

test('la adaptación de canal valida una copia y no corrige la respuesta ni sus cifras',() => {
  const base = path.join(__dirname,'../pilotos/g7-2026-10-18');
  const resultado = JSON.parse(fs.readFileSync(path.join(base,'resultados/C13-r1.json')));
  const entrada = JSON.parse(fs.readFileSync(path.join(base,'entradas/C13.json')));
  resultado.channel = 'screenshot';
  const antes = structuredClone(resultado);
  assert.deepEqual(validarContrato(resultado,entrada,'screenshot'),[]);
  assert.deepEqual(resultado,antes);
  assert.match(validarContrato(resultado,entrada,'wireframe').join(' '),/canal/);
  resultado.measurements.g7_N_obj++;
  assert.match(validarContrato(resultado,entrada,'screenshot').join(' '),/distinto de la fuente/);
  assert.equal(resultado.measurements.g7_N_obj,antes.measurements.g7_N_obj + 1);
});

test('la comparación conserva NA, abstenciones y ceros como estados distintos',() => {
  const perfil = seriesPara('comparacion').map(s => ({group_id:s.id,channel:s.channel,
    criterios_leidos_del_screenshot:[],evaluaciones:[
      {repeticion:1,estado:s.channel === 'wireframe' ? 'no_aplica' : 'abstencion',score:null},
      {repeticion:2,estado:'puntaje',score:0},
    ]}));
  const comparacion = compararCanales(perfil,'comparacion');
  const g7 = comparacion.find(g => g.group_id === 'g7');
  assert.equal(g7.pares[0].wireframe.estado,'no_aplica');
  assert.equal(g7.pares[0].screenshot.estado,'abstencion');
  assert.equal(g7.pares[1].wireframe.score,0);
  assert.equal(comparacion.find(g => g.group_id === 'g1').interpretable,false);
  assert.equal(comparacion.find(g => g.group_id === 'g3').interpretable,false);
  assert.equal(comparacion.some(g => g.group_id === 'g4'),false);
  for (const g of perfil) g.evaluaciones = [{repeticion:1,estado:'no_aplica',score:null}];
  const sinPuntajes = compararCanales(perfil,'comparacion').find(g => g.group_id === 'g7');
  assert.equal(sinPuntajes.pares_con_dos_puntajes,0);
  assert.equal(sinPuntajes.interpretable,false);
});
