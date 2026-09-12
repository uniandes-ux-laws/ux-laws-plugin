#!/usr/bin/env node
'use strict';
/**
 * sample-golden.js --- muestrea los casos dorados del universo declarado.
 *
 *   node scripts/sample-golden.js --semilla 20260912 --n 10
 *
 * POR QUE UN MUESTREO Y NO UNA ELECCION. Si quien conoce las rubricas elige las
 * paginas, elige --- aunque no quiera --- paginas donde la rubrica se porta bien.
 * El universo se declara ANTES, con sus propiedades estructurales, y el sorteo lo
 * decide una semilla registrada: cualquiera puede repetir el sorteo y obtener la
 * misma muestra.
 *
 * LAS PROPIEDADES CON LAS QUE SE DIVERSIFICA SON ESTRUCTURALES Y ESTAN DECLARADAS
 * EN EL UNIVERSO: tipo de pagina, si tiene formulario, si tiene un proceso por
 * pasos y su densidad esperada. **Ninguna es el nivel esperado de ninguna
 * rubrica.** Diversificar por nivel esperado seria construir la muestra con la
 * respuesta puesta.
 *
 * El muestreo es estratificado por `tipo` y proporcional, y dentro de cada estrato
 * sortea sin reemplazo con el generador sembrado. Se garantiza ademas que la
 * muestra contenga al menos dos paginas con formulario y al menos dos con proceso
 * por pasos: sin eso, G5 y G6 podrian quedarse sin un solo caso donde su criterio
 * aplique, y cinco juicios "no aplicable" no calibran nada.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RAIZ = path.resolve(__dirname, '..');
const UNIVERSO = path.join(RAIZ, 'corpus', 'universo-dorados-v1.csv');
const SALIDA = path.join(RAIZ, 'corpus', 'dorados-v1.csv');
const REGISTRO = path.join(RAIZ, 'corpus', 'dorados-v1-sorteo.json');

const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : d; };

/** mulberry32: generador sembrado, corto y reproducible en cualquier maquina. */
function prng(semilla) {
  let a = semilla >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function barajar(xs, rnd) {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const semilla = parseInt(arg('semilla', ''), 10);
if (!Number.isInteger(semilla)) {
  console.error('falta --semilla <entero>. La semilla se registra: sin ella el sorteo no es repetible.');
  process.exit(1);
}
const n = parseInt(arg('n', '10'), 10);

const texto = fs.readFileSync(UNIVERSO, 'utf8').replace(/\r\n/g, '\n').trim();
const lineas = texto.split('\n');
const cols = lineas[0].split(',');
const filas = lineas.slice(1).map((l) => {
  const v = l.split(',');
  const o = {};
  cols.forEach((c, i) => { o[c] = (v[i] || '').trim(); });
  return o;
});

// Paginas que el control de sanidad rechazo en una corrida anterior. Salen del
// universo y la MISMA semilla decide las sustitutas: el reemplazo es mecanico y
// repetible, y no una eleccion de quien conoce las rubricas. El criterio de
// rechazo es el mismo del corpus y del conjunto de calibracion --- HTTP distinto
// de 200, menos de 50 nodos retenidos, senales textuales de pagina de bloqueo, o
// una capa sin cerrar sobre el viewport --- y estaba declarado antes de capturar.
const rechazadas = (arg('rechazadas', '') || '').split(',').map((x) => x.trim()).filter(Boolean);
const descartadas = filas.filter((f) => rechazadas.includes(f.id));
const disponibles = filas.filter((f) => !rechazadas.includes(f.id));

const rnd = prng(semilla);
const tipos = [...new Set(disponibles.map((f) => f.tipo))].sort();

// Reparto proporcional por tipo, con al menos uno por tipo.
const cuota = {};
let asignadas = 0;
for (const t of tipos) {
  const k = Math.max(1, Math.round((disponibles.filter((f) => f.tipo === t).length / disponibles.length) * n));
  cuota[t] = k; asignadas += k;
}
// Ajuste para cuadrar exactamente n, quitando o poniendo del tipo mas poblado.
const porTamano = tipos.slice().sort((a, b) => disponibles.filter((f) => f.tipo === b).length - disponibles.filter((f) => f.tipo === a).length);
let i = 0;
while (asignadas > n) { const t = porTamano[i % porTamano.length]; if (cuota[t] > 1) { cuota[t]--; asignadas--; } i++; }
while (asignadas < n) { const t = porTamano[i % porTamano.length]; cuota[t]++; asignadas++; i++; }

let muestra = [];
for (const t of tipos) muestra.push(...barajar(disponibles.filter((f) => f.tipo === t), rnd).slice(0, cuota[t]));

// Garantias estructurales: al menos dos con formulario y dos con pasos.
function garantizar(pred, minimo, etiqueta) {
  const cumplen = () => muestra.filter(pred).length;
  const sustituciones = [];
  const candidatos = barajar(disponibles.filter((f) => pred(f) && !muestra.includes(f)), rnd);
  while (cumplen() < minimo && candidatos.length) {
    const entra = candidatos.shift();
    // Sale la que menos daña el reparto: una del mismo tipo que no cumple el predicado.
    const sale = muestra.find((f) => f.tipo === entra.tipo && !pred(f)) || muestra.find((f) => !pred(f));
    if (!sale) break;
    muestra[muestra.indexOf(sale)] = entra;
    sustituciones.push({ sale: sale.id, entra: entra.id, motivo: etiqueta });
  }
  return sustituciones;
}
const sustituciones = [
  ...garantizar((f) => f.form_declarado === 'si', 2, 'garantizar al menos dos paginas con formulario'),
  ...garantizar((f) => f.pasos_declarado === 'si', 2, 'garantizar al menos dos paginas con proceso por pasos'),
];

muestra.sort((a, b) => a.id.localeCompare(b.id));

const salidaCols = ['id', 'organization', 'url', 'tipo', 'form_declarado', 'pasos_declarado', 'densidad_declarada', 'notes'];
fs.writeFileSync(SALIDA, [salidaCols.join(','), ...muestra.map((f) => salidaCols.map((c) => f[c] || '').join(','))].join('\n') + '\n');

const registro = {
  sorteado_en: new Date().toISOString(),
  semilla,
  n,
  algoritmo: 'mulberry32 sembrado; barajado de Fisher-Yates por estrato; reparto proporcional por `tipo` con minimo uno por estrato; garantias estructurales aplicadas despues',
  universo: { archivo: 'corpus/universo-dorados-v1.csv', paginas: filas.length, disponibles: disponibles.length, sha256: crypto.createHash('sha256').update(texto + '\n', 'utf8').digest('hex') },
  rechazadas_por_sanidad: descartadas.map((f) => ({ id: f.id, url: f.url })),
  cuota_por_tipo: cuota,
  garantias: ['al menos dos paginas con formulario declarado', 'al menos dos paginas con proceso por pasos declarado'],
  sustituciones,
  seleccionadas: muestra.map((f) => f.id),
  declaracion: 'Ninguna propiedad usada para diversificar es el nivel esperado de ninguna rubrica. El universo y sus propiedades se declararon antes de sortear.',
};
fs.writeFileSync(REGISTRO, JSON.stringify(registro, null, 2) + '\n');

console.log('universo   ' + filas.length + ' paginas, sha256 ' + registro.universo.sha256.slice(0, 16));
console.log('semilla    ' + semilla);
console.log('cuota      ' + JSON.stringify(cuota));
console.log('muestra    ' + muestra.map((f) => f.id).join(' '));
console.log('con formulario ' + muestra.filter((f) => f.form_declarado === 'si').length +
  ' · con pasos ' + muestra.filter((f) => f.pasos_declarado === 'si').length +
  ' · densidad alta ' + muestra.filter((f) => f.densidad_declarada === 'alta').length);
if (sustituciones.length) console.log('sustituciones por garantia estructural: ' + sustituciones.map((s) => s.sale + '->' + s.entra).join(', '));
console.log('\n-> corpus/dorados-v1.csv y corpus/dorados-v1-sorteo.json');
