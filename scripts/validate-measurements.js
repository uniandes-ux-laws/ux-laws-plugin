#!/usr/bin/env node
'use strict';
/**
 * validate-measurements.js --- valida la salida de la capa de medicion.
 *
 *   node scripts/validate-measurements.js captures/G01/measurements.json
 *   node scripts/validate-measurements.js --todas captures calibracion
 *   node scripts/validate-measurements.js --selftest
 *
 * Por que existe aparte del validador de resultados: la capa de medicion es la
 * entrada de las siete skills, y una cifra mal formada ahi se propaga a los siete
 * puntajes sin que ninguna validacion posterior la vea. El esquema exige, ademas
 * de la forma, dos cosas que son de metodo: que toda proporcion lleve su
 * denominador con su definicion en palabras, y que cada grupo declare los juicios
 * que NO calculo.
 */
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

const schema = require(path.resolve(__dirname, '../shared/schemas/measurements.schema.json'));
const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

function revisar(nombre, obj) {
  const ok = validate(obj);
  if (!ok) {
    console.log('FALLA  ' + nombre);
    for (const e of validate.errors.slice(0, 6)) console.log('       ' + (e.instancePath || '(raíz)') + ' ' + e.message);
    return false;
  }
  // Controles que el esquema no puede expresar por si solo.
  const problemas = [];
  for (const g of ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7']) {
    for (const [k, v] of Object.entries(obj[g])) {
      if (!/^g[1-7]_p_/.test(k)) continue;
      if (v.p !== null && v.denominador === 0) problemas.push(g + '.' + k + ': p no nula con denominador cero');
      if (v.afectados > v.denominador) problemas.push(g + '.' + k + ': afectados > denominador');
      if (!k.startsWith(g + '_')) problemas.push(g + '.' + k + ': el nombre no lleva su grupo');
    }
    for (const [k] of Object.entries(obj[g])) {
      if (k !== 'juicios' && !k.startsWith(g + '_')) problemas.push(g + '.' + k + ': el nombre no lleva su grupo');
    }
  }
  if (problemas.length) {
    console.log('FALLA  ' + nombre);
    for (const p of problemas.slice(0, 6)) console.log('       ' + p);
    return false;
  }
  console.log('ok     ' + nombre);
  return true;
}

/** Controles negativos: el validador tiene que rechazar, no solo aceptar. */
function selftest() {
  const base = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'captures', 'G01', 'measurements.json'), 'utf8'));
  const clonar = () => JSON.parse(JSON.stringify(base));
  const casos = [];

  casos.push(['medición válida', base, true]);

  let a = clonar(); delete a.g4; casos.push(['sin el bloque g4', a, false]);
  a = clonar(); delete a.g1.juicios; casos.push(['un grupo sin juicios declarados', a, false]);
  a = clonar(); delete a.g7.g7_p_T1.denominador_definicion; casos.push(['proporción sin definición de denominador', a, false]);
  a = clonar(); a.g7.g7_p_T1.afectados = a.g7.g7_p_T1.denominador + 1; casos.push(['afectados mayor que el denominador', a, false]);
  a = clonar(); a.g7.g7_p_T1.etiqueta = 'medio'; casos.push(['etiqueta fuera de la escala de tolerancia', a, false]);
  a = clonar(); a.escala_tolerancia.frecuente = 0.4; casos.push(['corte de la escala alterado', a, false]);
  a = clonar(); a.g2.n1_sin_grupo = 3; casos.push(['cantidad sin su grupo en el nombre', a, false]);
  a = clonar(); a.g1.g1_p_C1.p = 1.4; casos.push(['proporción fuera de 0 a 1', a, false]);
  a = clonar(); delete a.pagina.sha256; casos.push(['página sin los sha256 de la captura', a, false]);

  let malos = 0;
  for (const [nombre, obj, esperado] of casos) {
    const got = revisarSilencioso(obj);
    const pasa = got === esperado;
    if (!pasa) malos++;
    console.log((pasa ? 'ok   ' : 'FALLA') + '  ' + nombre + ' -> ' + got + ' (esperado ' + esperado + ')');
  }
  console.log(malos === 0 ? '\n' + casos.length + '/' + casos.length + ' casos correctos.' : '\n' + malos + ' caso(s) incorrectos.');
  process.exit(malos === 0 ? 0 : 1);
}

function revisarSilencioso(obj) {
  const log = console.log;
  console.log = () => {};
  const r = revisar('', obj);
  console.log = log;
  return r;
}

const args = process.argv.slice(2);
if (args.includes('--selftest')) selftest();

let objetivos = args.filter((a) => !a.startsWith('--'));
if (args.includes('--todas')) {
  objetivos = objetivos.flatMap((root) => fs.readdirSync(root)
    .map((d) => path.join(root, d, 'measurements.json'))
    .filter((f) => fs.existsSync(f)));
}
if (!objetivos.length) { console.error('uso: node scripts/validate-measurements.js <measurements.json ...> | --todas <dir ...> | --selftest'); process.exit(1); }

let malos = 0;
for (const f of objetivos) {
  try { if (!revisar(f, JSON.parse(fs.readFileSync(f, 'utf8')))) malos++; }
  catch (e) { console.log('FALLA  ' + f + ': ' + e.message); malos++; }
}
console.log('\n' + (objetivos.length - malos) + '/' + objetivos.length + ' válidos');
process.exit(malos === 0 ? 0 : 1);
