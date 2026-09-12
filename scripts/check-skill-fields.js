#!/usr/bin/env node
'use strict';
/**
 * check-skill-fields.js --- las siete skills solo pueden citar campos que existen.
 *
 *   npm run check:skills
 *
 * POR QUE ES UNA PRUEBA Y NO UNA REVISION. Bajo la decision 9, la skill recibe
 * cifras y no las calcula. Si una SKILL.md nombra `g3_densidad_semantica` y la
 * capa de medicion no lo produce, el agente se encuentra con un campo ausente en
 * mitad de la evaluacion y hara lo unico que puede hacer: estimarlo. Es decir,
 * volvera a medir sobre la imagen, que es exactamente lo que la decision 9
 * prohibe. El desajuste no da error en ningun lado --- por eso hace falta esta
 * prueba ---.
 *
 * Tambien falla al reves: un campo que la capa produce y ninguna skill lee es
 * medicion muerta, y se reporta como aviso porque no rompe nada pero indica que
 * una de las dos capas se movio sin la otra.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const REFERENCIA = path.join(RAIZ, 'captures', 'G01', 'measurements.json');
const GRUPOS = [
  ['g1', 'g1-agrupacion-perceptual'],
  ['g2', 'g2-arquitectura-decision'],
  ['g3', 'g3-capacidad-segmentacion'],
  ['g4', 'g4-saliencia-visual'],
  ['g5', 'g5-posicion-progreso'],
  ['g6', 'g6-economia-convencion'],
  ['g7', 'g7-targeting-motor'],
];

if (!fs.existsSync(REFERENCIA)) {
  console.error('falta ' + path.relative(RAIZ, REFERENCIA) + '. Corre `npm run measure -- captures --todas` primero.');
  process.exit(1);
}
const m = JSON.parse(fs.readFileSync(REFERENCIA, 'utf8'));

let fallos = 0, avisos = 0;
for (const [g, slug] of GRUPOS) {
  const txt = fs.readFileSync(path.join(RAIZ, 'skills', slug, 'SKILL.md'), 'utf8');
  const citados = new Set([...txt.matchAll(/`(g[1-7]_[a-zA-Z0-9_]+)`/g)].map((x) => x[1]));
  const existentes = new Set(Object.keys(m[g]).filter((k) => k !== 'juicios'));

  const inventados = [...citados].filter((c) => !existentes.has(c));
  const deOtroGrupo = [...citados].filter((c) => !c.startsWith(g + '_'));
  const sinLeer = [...existentes].filter((e) => !citados.has(e) && !/^g[1-7]_(no_aplicable|no_aplicable_razon)/.test(e));

  if (inventados.length || deOtroGrupo.length) {
    fallos++;
    console.log('FALLA  ' + slug);
    if (inventados.length) console.log('       cita campos que la capa de medición no produce: ' + inventados.join(', '));
    if (deOtroGrupo.length) console.log('       cita campos de otro grupo: ' + deOtroGrupo.join(', '));
  } else {
    console.log('ok     ' + slug.padEnd(28) + citados.size + ' campos citados, todos existentes');
  }
  if (sinLeer.length) {
    avisos++;
    console.log('       aviso: medidos y no leídos por la skill -> ' + sinLeer.join(', '));
  }
}

console.log('\n' + (GRUPOS.length - fallos) + '/' + GRUPOS.length + ' skills consistentes con la capa de medición' +
  (avisos ? ' · ' + avisos + ' con medición no leída' : ''));
process.exit(fallos === 0 ? 0 : 1);
