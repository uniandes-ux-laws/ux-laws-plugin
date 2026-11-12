#!/usr/bin/env node
'use strict';
/**
 * panel-plantilla.js — genera las plantillas del panel: panel-E1.xlsx … panel-E6.xlsx.
 *
 *   node scripts/panel-plantilla.js                       # -> panel/plantillas/
 *   node scripts/panel-plantilla.js --out <carpeta>
 *
 * Cada libro trae cuatro hojas:
 *   Calificar      evaluador · pagina · grupo · nivel · trigger · justificacion
 *                  210 filas (30 páginas × G1…G7); evaluador, pagina y grupo ya escritos.
 *   Instrucciones  cómo se llena, sin identificar a nadie.
 *   Paginas        id y URL de cada página del corpus (datos públicos).
 *   Triggers       el vocabulario válido de cada grupo.
 *
 * Lo que NO lleva, a propósito: nombre, correo, institución, cargo, fecha ni hora.
 * creator y lastModifiedBy van vacíos. Los bytes son deterministas: regenerar las
 * plantillas no cambia nada en git si el corpus y los contratos no cambiaron.
 *
 * OJO: Excel escribe el nombre de quien guarda el archivo en docProps/core.xml. Por
 * eso el importador descarta esos metadatos y nunca copia nada de ellos.
 */
const fs = require('fs'), path = require('path');
const { RAIZ, EVALUADORES, COLUMNAS, HOJA, NIVELES, grupos, paginas, unidades } = require('./panel-comun');
const { xlsx } = require('./xlsx-minimo');

function libro(evaluador, manifiesto) {
  const gs = grupos(), us = unidades(manifiesto);
  const calificar = [COLUMNAS, ...us.map((u) => [evaluador, u.pagina, u.grupo, '', '', ''])];
  const instrucciones = [
    ['Instrucciones'],
    ['Esta hoja es de ' + evaluador + '. Ese código es lo único que identifica sus calificaciones: no escriba su nombre, correo ni ningún otro dato personal en el archivo, ni en comentarios de celda.'],
    ['Califique la PÁGINA RENDERIZADA de cada sitio (abra la URL de la hoja «Paginas» a 1440 × 900, solo lo visible sin desplazarse). No califique el wireframe.'],
    ['Use el documento de rúbricas que le entregó el equipo. Cada fila es un grupo de una página: G1 a G7.'],
    ['nivel: 0, 1, 2, 3 o 4 según las anclas de la rúbrica; NA solo si la rúbrica dice que el grupo no aplica a esa página; vacío si no la calificó.'],
    ['trigger: obligatorio con un nivel de 0 a 4; uno de los valores del grupo en la hoja «Triggers». Vacío con NA.'],
    ['justificacion: obligatoria con nivel o NA. Una o dos frases sobre lo que observó en la página.'],
    ['No cambie el orden de las filas ni las columnas evaluador, pagina y grupo. No cambie el nombre del archivo (panel-' + evaluador + '.xlsx) ni el de la hoja «' + HOJA + '».'],
    ['Devuelva el archivo al equipo por el canal acordado. El equipo conserva la tabla que asocia ' + evaluador + ' con su nombre fuera del repositorio; los datos que se reporten no permitirán identificarlo.'],
  ];
  const listaPaginas = [['id', 'url'], ...paginas(manifiesto).map((p) => [p.id, p.url])];
  const listaTriggers = [['grupo', 'constructo', 'triggers validos'], ...gs.map((g) => [g.id, g.nombre, g.triggers.join(' · ')])];
  return xlsx([
    { nombre: HOJA, filas: calificar, opciones: { encabezado: true, anchos: [11, 9, 8, 8, 24, 80],
      listas: [{ rango: 'D2:D' + (us.length + 1), valores: NIVELES }] } },
    { nombre: 'Instrucciones', filas: instrucciones, opciones: { encabezado: true, anchos: [140] } },
    { nombre: 'Paginas', filas: listaPaginas, opciones: { encabezado: true, anchos: [8, 70] } },
    { nombre: 'Triggers', filas: listaTriggers, opciones: { encabezado: true, anchos: [8, 30, 80] } },
  ]);
}

function generar(out, manifiesto) {
  fs.mkdirSync(out, { recursive: true });
  return EVALUADORES.map((e) => {
    const destino = path.join(out, 'panel-' + e + '.xlsx');
    fs.writeFileSync(destino, libro(e, manifiesto));
    return destino;
  });
}

module.exports = { libro, generar };

if (require.main === module) {
  const i = process.argv.indexOf('--out');
  const out = i !== -1 && process.argv[i + 1] ? path.resolve(process.argv[i + 1]) : path.join(RAIZ, 'panel', 'plantillas');
  const escritos = generar(out);
  for (const f of escritos) console.log('plantilla -> ' + path.relative(RAIZ, f).replace(/\\/g, '/'));
  console.log(unidades().length + ' filas por evaluador · ' + escritos.length + ' evaluadores · sin metadatos de autor');
}
