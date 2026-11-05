'use strict';

const VERSION = '1.0.7';

// La corrección se aplica a una copia; la medición 1.0.6 queda como fue guardada.
function prepararG1(entrada) {
  if (entrada.measurements_version !== '1.0.6') throw new Error('G1 necesita la medición de origen 1.0.6');
  const grupos = entrada.g1?.g1_grupos_primer_nivel;
  if (!Number.isInteger(grupos) || grupos < 0) throw new Error('G1 no tiene una cantidad de grupos válida');
  const copia = structuredClone(entrada);
  copia.source_measurements_version = entrada.measurements_version;
  copia.measurements_version = VERSION;
  copia.g1.g1_no_aplicable = grupos < 2;
  if (grupos < 2) {
    copia.g1.g1_no_aplicable_razon = 'La captura tiene ' + grupos + ' grupo(s) de primer nivel; G1 requiere al menos dos.';
    copia.g1.juicios = [];
  } else {
    delete copia.g1.g1_no_aplicable_razon;
  }
  return copia;
}

function revisarG1(resultado, entrada) {
  const errores = [];
  const grupos = entrada.g1?.g1_grupos_primer_nivel;
  if (entrada.measurements_version !== VERSION || entrada.source_measurements_version !== '1.0.6' || !Number.isInteger(grupos) || grupos < 0) {
    return ['la entrada de G1 no tiene versión o cantidad de grupos válida'];
  }
  if (resultado.measurements.g1_grupos_primer_nivel !== grupos) errores.push('G1 cambió la cantidad de grupos de la entrada');
  if (resultado.not_applicable !== (grupos < 2)) errores.push('G1 debe marcar no aplica únicamente con menos de dos grupos');
  return errores;
}

module.exports = { VERSION, prepararG1, revisarG1 };
