#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const { revisarDirectorio, tituloRevision } = require('../capture/capture-check');

const args = process.argv.slice(2);
const root = path.resolve(args[0] || 'captures');
const salida = path.resolve(args.includes('--out') ? args[args.indexOf('--out') + 1] : 'revisiones/capturas-2026-11-04');
const ids = fs.readdirSync(root, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('_')).map(d => d.name).sort();
const capturas = ids.map(id => ({ id, ...revisarDirectorio(path.join(root, id)) }));
const conteos = {};
for (const c of capturas) conteos[c.estado] = (conteos[c.estado] || 0) + 1;
const informe = { generado_en: new Date().toISOString(), carpeta: path.relative(process.cwd(), root) || '.', capturas: capturas.length,
  conteos, nota: 'Revisión posterior de registros, nodos e integridad. No recaptura sitios, no sustituye la revisión visual ni cambia originales o puntajes.',
  detalle: capturas };
fs.mkdirSync(salida, { recursive: true });
fs.writeFileSync(path.join(salida, 'revision.json'), JSON.stringify(informe, null, 2) + '\n');
const celda = texto => String(texto).replace(/\|/g, '/').replace(/[\r\n]/g, ' ');
let texto = '# Revisión de las capturas\n\n' + informe.nota + '\n\n' +
  'Las capturas anteriores al detector nuevo quedan pendientes de comprobación, aunque el registro antiguo dijera que estaban limpias. Las advertencias no cambian las calificaciones.\n\n' +
  '| Captura | Estado actual | Advertencias |\n|---|---|---|\n';
for (const c of capturas) texto += '| ' + c.id + ' | ' + tituloRevision(c) + ' | ' + celda(c.advertencias.join(' / ') || 'Ninguna señal automática; revisar la imagen.') + ' |\n';
fs.writeFileSync(path.join(salida, 'INFORME.md'), texto);
console.log(JSON.stringify({ capturas: capturas.length, conteos, informe: path.join(salida, 'INFORME.md') }, null, 2));
