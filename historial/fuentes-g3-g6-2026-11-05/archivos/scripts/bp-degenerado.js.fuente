#!/usr/bin/env node
/**
 * bp-degenerado.js --- por que una rubrica que no ejercita su escala destruye el
 * resultado principal de la tesis, y no solo el piloto.
 *
 * EL PROBLEMA. Brennan y Prediger (1981) corrigen el acuerdo por azar con una
 * probabilidad de acuerdo esperado FIJA, 1/k, que no depende de las marginales de
 * los evaluadores. Esa es justamente su ventaja sobre kappa de Cohen --- no sufre
 * la paradoja de las marginales sesgadas --- y es tambien lo que hace que una
 * rubrica degenerada lo enganie por completo: si la rubrica solo puede asignar un
 * nivel, el sistema y los humanos coinciden en ese nivel, el acuerdo observado es
 * 1, y el coeficiente sale 1,000. Acuerdo perfecto sobre nada.
 *
 * Con pesos cuadraticos sobre k = 5 categorias, w_ij = 1 - ((i-j)/(k-1))^2, el
 * acuerdo esperado es el promedio de los pesos sobre las k^2 celdas y vale
 * exactamente 0,75. El coeficiente es (p_o - p_e) / (1 - p_e).
 *
 *   node scripts/bp-degenerado.js
 */
const K = 5;
const peso = (i, j) => 1 - Math.pow((i - j) / (K - 1), 2);

/** Acuerdo esperado de Brennan-Prediger: promedio de los pesos sobre k^2 celdas. */
function acuerdoEsperado() {
  let s = 0;
  for (let i = 0; i < K; i++) for (let j = 0; j < K; j++) s += peso(i, j);
  return s / (K * K);
}

/** Coeficiente entre dos vectores de puntajes de la misma longitud. */
function bp(a, b) {
  if (a.length !== b.length || !a.length) throw new Error('vectores incompatibles');
  const p_o = a.reduce((s, x, i) => s + peso(x, b[i]), 0) / a.length;
  const p_e = acuerdoEsperado();
  return { p_o: +p_o.toFixed(4), p_e: +p_e.toFixed(4), kappa: +((p_o - p_e) / (1 - p_e)).toFixed(4) };
}

const repetir = (v, n) => Array(n).fill(v);
const N = 24;   // las 24 paginas del conjunto de calibracion

const casos = [
  {
    nombre: 'Ambos convergen en 0 sobre las 24 unidades',
    detalle: 'El caso limite: la rubrica solo puede asignar 0 y los humanos, leyendola, tambien.',
    a: repetir(0, N), b: repetir(0, N),
  },
  {
    nombre: 'G1 antes de la reescritura (21 ceros y 3 unos) contra humanos que convergen en 0',
    detalle: 'Distribucion real medida el 2026-09-10 sobre el conjunto de calibracion.',
    a: [...repetir(0, 21), ...repetir(1, 3)], b: repetir(0, N),
  },
  {
    nombre: 'G7 antes de la reescritura (21 ceros y 3 unos) contra humanos que convergen en 0',
    detalle: 'Misma distribucion medida el 2026-09-10.',
    a: [...repetir(0, 21), ...repetir(1, 3)], b: repetir(0, N),
  },
  {
    nombre: 'Contraste: dos evaluadores que usan la escala y discrepan un nivel en la mitad de los casos',
    detalle: 'Para ver cuanto mas bajo sale un acuerdo que si mide algo. Exactamente 12 de 24 unidades con desacuerdo de un nivel.',
    // a recorre los cinco niveles; b discrepa un nivel en las primeras 12
    // unidades y coincide en las otras 12. Construido asi, y no a mano, porque
    // la primera version de esta fila tenia 10 desacuerdos de 24 --- cinco
    // doceavos --- con la etiqueta "la mitad", y reportaba 0,8958 donde la
    // mitad da 0,8750.
    a: Array.from({ length: N }, (_, i) => i % 5),
    b: Array.from({ length: N }, (_, i) => {
      const v = i % 5;
      return i < N / 2 ? (v === 4 ? 3 : v + 1) : v;
    }),
  },
];

/** Conteo de desacuerdos por distancia, para que la etiqueta de cada caso sea verificable. */
function desacuerdos(a, b) {
  const d = {};
  a.forEach((x, i) => { const k = Math.abs(x - b[i]); if (k) d[k] = (d[k] || 0) + 1; });
  const total = Object.values(d).reduce((s, n) => s + n, 0);
  const partes = Object.entries(d).map(([k, n]) => n + ' de ' + k + ' nivel' + (k > 1 ? 'es' : ''));
  return total ? total + ' de ' + a.length + ' unidades (' + partes.join(', ') + ')' : 'ninguno';
}

console.log('Brennan-Prediger con pesos cuadraticos, k = 5, n = ' + N + ' unidades');
console.log('acuerdo esperado por azar (fijo, no depende de las marginales): p_e = ' + acuerdoEsperado().toFixed(4) + '\n');

for (const c of casos) {
  const r = bp(c.a, c.b);
  console.log(c.nombre);
  console.log('  ' + c.detalle);
  console.log('  desacuerdos: ' + desacuerdos(c.a, c.b));
  console.log('  p_o = ' + r.p_o.toFixed(4) + '   p_e = ' + r.p_e.toFixed(4) + '   kappa_BP = ' + r.kappa.toFixed(4) + '\n');
}

console.log('Lectura: un coeficiente de 1,000 --- o de 0,97 --- sobre una rubrica que solo');
console.log('asigna un nivel no dice que el sistema acierte. Dice que ni el sistema ni el');
console.log('humano tenian otra cosa que decir. Sin el piloto, ese numero habria entrado al');
console.log('documento como resultado confirmatorio.');
