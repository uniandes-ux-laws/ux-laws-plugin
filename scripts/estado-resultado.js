'use strict';

const tieneTexto = valor => typeof valor === 'string' && valor.trim().length > 0;

function revisarEstado(resultado) {
  const errores = [];
  const motivoAbstencion = resultado.measurements?.motivo_abstencion;
  let estado = null, motivo = null;

  if (resultado.not_applicable === true) {
    estado = 'no_aplica';
    motivo = resultado.na_reason;
    if (resultado.score !== null || resultado.trigger !== null) errores.push('no aplica debe tener score y trigger nulos');
    if (!tieneTexto(motivo)) errores.push('no aplica necesita una razón');
    if (tieneTexto(motivoAbstencion)) errores.push('no aplica no debe llevar un motivo de abstención');
  } else if (resultado.not_applicable === false && resultado.score === null) {
    estado = 'abstencion';
    motivo = motivoAbstencion;
    if (resultado.trigger !== null) errores.push('una abstención debe tener trigger nulo');
    if (resultado.evidence_insufficient !== true) errores.push('una abstención debe declarar evidencia insuficiente');
    if (!tieneTexto(motivo)) errores.push('una abstención necesita motivo_abstencion');
    if (tieneTexto(resultado.na_reason)) errores.push('una abstención no debe llevar na_reason');
  } else if (resultado.not_applicable === false && Number.isInteger(resultado.score) && resultado.score >= 0 && resultado.score <= 4) {
    estado = 'puntaje';
    if (!tieneTexto(resultado.trigger)) errores.push('un puntaje necesita trigger');
    if (tieneTexto(motivoAbstencion)) errores.push('un puntaje no debe llevar un motivo de abstención');
    if (tieneTexto(resultado.na_reason)) errores.push('un puntaje no debe llevar na_reason');
  } else {
    errores.push('el resultado no define un puntaje, no aplica o abstención válidos');
  }

  return { estado, motivo: tieneTexto(motivo) ? motivo : null, errores };
}

module.exports = { revisarEstado };
