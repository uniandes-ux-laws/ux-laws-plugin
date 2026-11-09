'use strict';
const fs = require('fs');
const path = require('path');
const { responseSchema, validationProblems: validarG3G6 } = require('./g3-g6-contract');
const { validationProblems: validarG2G7 } = require('./pilot-g2-g7-contract');
const { validationProblems: validarG4 } = require('./g4-evaluator-contract');
const { validateV2: validarG5 } = require('./g5-evaluator-contract');
const VERSION = '1.0.0';
const GRUPOS = [
  { id:'g1', slug:'g1-agrupacion-perceptual', nombre:'Agrupación perceptual', canal:'wireframe', apoyo:[] },
  { id:'g2', slug:'g2-arquitectura-decision', nombre:'Arquitectura de decisión', canal:'wireframe', apoyo:['Ap'] },
  { id:'g3', slug:'g3-capacidad-segmentacion', nombre:'Capacidad y segmentación', canal:'wireframe', apoyo:['U','H','V','X'] },
  { id:'g4', slug:'g4-saliencia-visual', nombre:'Saliencia visual', canal:'screenshot', apoyo:[] },
  { id:'g5', slug:'g5-posicion-progreso', nombre:'Posición y progreso', canal:'wireframe', apoyo:['Q','G_nombra','G_actual','G_forma'] },
  { id:'g6', slug:'g6-economia-convencion', nombre:'Economía y convención', canal:'wireframe', apoyo:['R','T','K_ap','K'] },
  { id:'g7', slug:'g7-targeting-motor', nombre:'Targeting motor', canal:'wireframe', apoyo:[] },
];

function seriesPara(modo = 'referencia') {
  if (!['referencia','comparacion'].includes(modo)) throw Error('--modo debe ser referencia o comparacion');
  return GRUPOS.flatMap(g => {
    const canales = modo === 'comparacion' && g.id !== 'g4' ? ['wireframe','screenshot'] : [g.canal];
    return canales.map(channel => ({...g, channel}));
  });
}

function esquemaPara(grupo, canal) {
  const proyecto = require('../shared/schemas/group-result.schema.json');
  let esquema;
  if (['g3','g6'].includes(grupo)) esquema = responseSchema(grupo);
  else if (['g2','g7'].includes(grupo)) esquema = require('./' + grupo + '-response.schema.json');
  else if (grupo === 'g4') esquema = require('./g4-response-v2.schema.json');
  else if (grupo === 'g5') esquema = require('./g5-response-v2.schema.json');
  else esquema = proyecto;
  esquema = structuredClone(esquema);
  delete esquema.$id;
  esquema.properties.group_id = {type:'string',const:grupo};
  esquema.properties.channel = {type:'string',const:canal};
  esquema.properties.run = structuredClone(proyecto.properties.run);
  esquema.required = [...new Set([...esquema.required,'run','score','trigger'])];
  const medidas = esquema.properties.measurements;
  medidas.properties = {...medidas.properties, lectura_screenshot:{
    ...(medidas.properties?.lectura_screenshot || {type:'array',items:{type:'string'}}),uniqueItems:true}};
  if (['g1','g7'].includes(grupo)) medidas.properties.lectura_screenshot.maxItems = 0;
  medidas.required = [...new Set([...(medidas.required || []),'lectura_screenshot'])];
  return esquema;
}

function validarContrato(resultado, entrada, canal, nodeIds) {
  if (resultado.channel !== canal) return ['el canal de la respuesta no coincide con el solicitado'];
  const {run, ...raw} = structuredClone(resultado);
  const grupo = resultado.group_id;
  // Los contratos históricos aceptan wireframe. Solo esta copia de validación
  // usa ese nombre; el JSON original y su canal se conservan.
  if (grupo !== 'g4') raw.channel = 'wireframe';
  if (['g2','g7'].includes(grupo)) return validarG2G7(raw, entrada, run, nodeIds);
  if (['g3','g6'].includes(grupo)) return validarG3G6(raw, entrada, run);
  if (grupo === 'g4') return validarG4(raw, entrada, run, nodeIds);
  if (grupo === 'g5') return validarG5(raw, entrada, run, nodeIds);
  return [];
}

function instruccionesCanal(serie) {
  if (serie.channel === 'screenshot') return [
    'Canal de esta ejecución: screenshot. La única imagen suministrada es screenshot.png. No consultes wireframe.png.',
    'La rúbrica conserva las menciones a su canal de referencia. En esta ejecución aplica los mismos criterios, anclas y exclusiones sobre el screenshot, sin añadir criterios de color ni cambiar cortes.',
    'Devuelve channel="screenshot". lectura_screenshot conserva los criterios textuales exigidos por el contrato; aquí se leen en la imagen principal, no en una imagen de apoyo.',
  ].join('\n');
  return 'Canal de esta ejecución: wireframe. La primera imagen es wireframe.png. ' +
    (serie.apoyo.length ? 'La segunda es screenshot.png, solo para los criterios ' + serie.apoyo.join(', ') + '. Registra su lectura. Esta ejecución usa apoyo de screenshot.'
      : 'No se suministra screenshot: no lo abras ni lo uses como apoyo.') +
    '\nDevuelve channel="wireframe". No midas ni recuentes sobre ninguna imagen.';
}

function compararCanales(perfil, modo) {
  if (modo !== 'comparacion') return [];
  return GRUPOS.filter(g => g.id !== 'g4').map(g => {
    const wire = perfil.find(p => p.group_id === g.id && p.channel === 'wireframe');
    const shot = perfil.find(p => p.group_id === g.id && p.channel === 'screenshot');
    const lectura = wire.criterios_leidos_del_screenshot;
    const apoyo = g.apoyo.length > 0 || lectura.length > 0;
    const pares = wire.evaluaciones.map(w => ({repeticion:w.repeticion,wireframe:w,
      screenshot:shot.evaluaciones.find(s => s.repeticion === w.repeticion)}));
    const puntuados = pares.filter(p => p.wireframe.estado === 'puntaje' && p.screenshot.estado === 'puntaje').length;
    return { group_id:g.id,measurements_version:wire.measurements_version,
      interpretable: g.id !== 'g1' && !apoyo && puntuados > 0,
      pares_previstos:pares.length,pares_con_dos_puntajes:puntuados,
      motivo: g.id === 'g1' ? 'G1 es no interpretable v1.' : apoyo
        ? 'El wireframe usa apoyo de screenshot; no aísla el efecto de la representación.'
        : !puntuados ? 'No hay pares con dos puntajes; se conservan los estados sin calcular contraste de nivel.'
        : 'Se prepararon canales separados con las mismas medidas; falta validación experta.',
      criterios_de_apoyo:lectura,
      pares,
    };
  });
}

function guardarComparacion(dir, comparacion, contexto) {
  const celda = v => '"' + String(v ?? '').replace(/"/g,'""') + '"';
  const filas = [['captura','runtime','model_id','measurements_version','screenshot_sha256','wireframe_sha256',
    'grupo','repeticion','estado_wireframe','nivel_wireframe','estado_screenshot','nivel_screenshot','interpretable','motivo']];
  for (const g of comparacion) for (const p of g.pares) filas.push([contexto.captura,contexto.runtime,contexto.model_id,
    g.measurements_version,contexto.capture_sha256.screenshot,contexto.capture_sha256.wireframe,g.group_id,p.repeticion,
    p.wireframe.estado,p.wireframe.score,p.screenshot.estado,p.screenshot.score,g.interpretable,g.motivo]);
  fs.writeFileSync(path.join(dir,'comparacion-canales.csv'),filas.map(f => f.map(celda).join(',')).join('\n') + '\n');
}

module.exports = {VERSION, GRUPOS, seriesPara, esquemaPara, validarContrato, instruccionesCanal, compararCanales, guardarComparacion};
