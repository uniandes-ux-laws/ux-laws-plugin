#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const RUN = path.join(ROOT, 'resultados/canales-codex-2026-11-20');
const SERIES = ['g2-wireframe','g2-screenshot','g4-screenshot','g7-wireframe','g7-screenshot'];

function registrarCierre(pagina, root = RUN) {
  if (!/^[HGL](0[1-9]|10)$/.test(pagina)) throw Error('Identificador de página inválido.');
  const manifestPath = path.join(root,'MANIFIESTO-PENDIENTE.json'), logPath = path.join(root,'registros','cronologia.jsonl');
  const manifest = JSON.parse(fs.readFileSync(manifestPath,'utf8'));
  const page = manifest.paginas.find(p => p.pagina === pagina);
  if (!page || page.estado !== 'en_ejecucion') throw Error('La página no está registrada en ejecución.');
  const dir = path.join(root,pagina), book = JSON.parse(fs.readFileSync(path.join(dir,'invocaciones.json'),'utf8')),
    perfil = JSON.parse(fs.readFileSync(path.join(dir,'perfil.json'),'utf8'));
  if (book.invocaciones.length !== 5 || perfil.perfil.length !== 5 ||
      SERIES.some(s => !book.invocaciones.some(i => i.group_id + '-' + i.channel === s)) ||
      book.invocaciones.some(i => i.contexto_limpio !== true || !i.mecanismo_de_aislamiento))
    throw Error('Faltan posiciones o declaraciones de aislamiento.');
  const estados = perfil.perfil.map(p => {
    if (!SERIES.includes(p.group_id + '-' + p.channel) || p.evaluaciones?.length !== 1) throw Error('Perfil de página incompleto.');
    return {grupo:p.group_id,canal:p.channel,estado:p.evaluaciones[0].estado};
  });
  const ahora = new Date();
  const eventos = fs.readFileSync(logPath,'utf8').split('\n').filter(Boolean).map(JSON.parse);
  const inicio = eventos.findLast(e => e.evento === 'inicio_pagina' && e.pagina === pagina);
  const minutos = inicio ? +((ahora - new Date(inicio.fecha)) / 60000).toFixed(2) : null;
  page.estado='cerrada'; page.cerrada_en=ahora.toISOString(); page.estados=estados;
  manifest.paginas_cerradas=manifest.paginas.filter(p => p.estado === 'cerrada').length;
  fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
  fs.appendFileSync(logPath,JSON.stringify({evento:'pagina_cerrada',pagina,fecha:ahora.toISOString(),
    solicitudes:5,minutos,tokens:'no verificado',estados})+'\n');
  return {pagina,cerradas:manifest.paginas_cerradas,minutos,estados};
}
if (require.main === module) {
  try {
    if (process.argv.length < 3 || process.argv.length > 4) throw Error('Uso: node scripts/registrar-cierre-codex.js <página> [carpeta de la corrida]');
    // Segundo argumento opcional: otra carpeta de corrida (por defecto, la de Codex).
    console.log(JSON.stringify(process.argv[3] ? registrarCierre(process.argv[2], path.resolve(process.argv[3])) : registrarCierre(process.argv[2])));
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
module.exports = {registrarCierre};
