'use strict';
// Alcance adoptado para 0.2.2. Las respuestas de los pilotos conservan sus reglas.
const {expectedG3} = require('./g3-g6-contract');
const VERSION = 'alcance-2026-11-05';
const PROPUESTA_ANTERIOR = 'propuesta-2026-11-05';

function reglaG3(m, entrada) {
  const anterior = expectedG3(m, entrada);
  if (anterior.score !== null) return anterior;
  const casoNuevo = m.region_id !== null && m.U >= 6 && m.U <= 8 &&
    m.segmentacion === 'encabezada' && m.H === 0 && m.V === false &&
    m.X === 0 && m.X_ids.length === 0;
  if (!casoNuevo) return anterior;
  const nodos = new Map(entrada.g3.g3_nodos.map(n => [n.id,n]));
  if (!m.inventario_completo || m.unidades_ids.some(id => !nodos.has(id) || nodos.get(id).parcial)) {
    return {score:null,triggers:[],motivo:'El inventario o las unidades no permiten confirmar la nueva regla.'};
  }
  return {score:2,triggers:['segmentacion','U','carga_extrinseca_estructural']};
}

function auditarG3(raw, entrada) {
  if (raw.not_applicable) return {tipo:'revisión de sus propios juicios',nivel_segun_regla:null,observaciones:[]};
  const esperado = reglaG3(raw.measurements, entrada), observaciones = [];
  if (raw.score !== esperado.score) observaciones.push('El nivel no coincide con la regla para los juicios declarados.');
  if (raw.score !== null && !esperado.triggers.includes(raw.trigger)) observaciones.push('El trigger no corresponde a la condición declarada.');
  if (raw.measurements.ancla_definida !== (esperado.score !== null)) observaciones.push('La declaración de regla disponible no coincide con esos juicios.');
  return {tipo:'revisión de sus propios juicios; no calificación experta',nivel_segun_regla:esperado.score,
    motivo:esperado.motivo || null,observaciones};
}

function diagnosticoG6(raw) {
  const m = raw.measurements, ks = m.convenciones;
  if (ks.length !== 8 || new Set(ks.map(k => k.id)).size !== 8 ||
      ks.some(k => !/^K[1-8]$/.test(k.id))) throw Error('El diagnóstico necesita las ocho convenciones sin duplicados.');
  const cumplidas = [], incumplidas = [], noAplicables = [], indeterminadas = [];
  for (const k of ks) {
    const fila = {id:k.id,evidencia_ids:[...k.evidencia_ids],razon:k.razon};
    if (k.aplica === false) noAplicables.push(fila);
    else if (k.aplica === true && k.cumple === true) cumplidas.push(fila);
    else if (k.aplica === true && k.cumple === false) incumplidas.push(fila);
    else indeterminadas.push(fila);
  }
  return {
    alcance:'Evidencia de la pantalla suministrada, no evaluación de todo el sitio.',
    catalogo:m.catalog_version,
    resultado_global:{estado:raw.not_applicable ? 'no_aplica' : raw.score === null ? 'abstencion' : 'puntaje',
      puntaje:raw.score,motivo:raw.na_reason || m.motivo_abstencion || null},
    cobertura:{catalogadas:8,evaluadas:cumplidas.length+incumplidas.length,
      no_aplicables_confirmadas:noAplicables.length,indeterminadas:indeterminadas.length},
    convenciones:{cumplidas,incumplidas,no_aplicables:noAplicables,indeterminadas},
    observaciones_visibles:{redundancias:m.R,operaciones_trasladadas:m.T,trabajo_evaluable:m.T_evaluable},
    lectura:'Las convenciones sin evidencia se conservan aparte. No se calcula un puntaje del subconjunto ni se cambian los umbrales del puntaje global.',
  };
}

module.exports = {VERSION,PROPUESTA_ANTERIOR,reglaG3,auditarG3,diagnosticoG6};
