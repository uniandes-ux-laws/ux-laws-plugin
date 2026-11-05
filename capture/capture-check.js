'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const observaciones = require('../corpus/observaciones-capturas-2026-11-04.json').por_screenshot;
const VERSION = '2026-11-04';

function revisarCaptura(meta, nodos = [], hashes = null) {
  const avisos = [], pendientes = [];
  if (!meta) return { version: VERSION, estado: 'sin_verificar', capas_sin_resolver: null,
    advertencias: ['No se pudo leer el registro de esta captura.'] };
  const consent = meta.consent;
  const revision = meta.revisionCapas;
  const controles = [revision?.antes, revision?.despues];
  const comprobada = revision?.version === VERSION && Array.isArray(revision.errores) && !revision.errores.length &&
    controles.every(c => c?.version === VERSION && typeof c.hayInterstitial === 'boolean' &&
      Number.isInteger(c.marcosSinRevisar) && c.marcosSinRevisar >= 0);
  let hayCapa = controles.some(c => c?.hayInterstitial === true) || consent?.limpio === false || !!consent?.overlayRestante;
  if (meta.sanity?.ok === false) avisos.push(...(meta.sanity.razones?.filter(Boolean) || []), 'El control de sanidad marcó esta captura.');
  if (!meta.sanity || typeof meta.sanity.ok !== 'boolean') pendientes.push('El control de sanidad no está registrado.');
  if (meta.httpStatus != null && meta.httpStatus !== 200) avisos.push('La página respondió HTTP ' + meta.httpStatus + '.');
  if (consent?.error) avisos.push('No se pudo completar el descarte de avisos: ' + consent.error);
  if (consent?.descartado === false) avisos.push('El descarte de avisos se desactivó para esta captura.');
  if (!consent) pendientes.push('No hay registro del descarte de avisos.');
  if (revision?.errores?.length) avisos.push('Falló la revisión de capas: ' + revision.errores.join('; '));
  if (!comprobada) pendientes.push('El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.');
  const marcos = Math.max(...controles.map(c => c?.marcosSinRevisar || 0));
  if (marcos) pendientes.push('Hay contenido visible dentro de marcos que este detector no revisa. Puede contener avisos.');

  // En las capturas antiguas, los nodos sirven de señal, no de prueba de oclusión.
  if (!comprobada && Array.isArray(nodos)) {
    const dialogos = nodos.filter(n => {
      const r = n.visibleBounds;
      return r?.w > 0 && r?.h > 0 && (['dialog', 'alertdialog'].includes(n.attributes?.role) ||
        n.attributes?.['aria-modal'] === 'true' || n.nodeName === 'DIALOG');
    });
    if (dialogos.length) avisos.push('Los nodos guardados incluyen un posible diálogo visible (' + dialogos.map(n => n.id).join(', ') + '). Confirmar en la imagen si tapa contenido.');
  }
  const fuente = hashes || meta.sha256;
  const nota = observaciones[fuente?.screenshot];
  if (nota) { avisos.push(...nota.avisos); hayCapa ||= nota.capa_sin_cerrar === true; }
  if (hayCapa) avisos.push('Queda una capa o un aviso sin resolver. No presentar la página como despejada.');
  if (hashes) for (const canal of ['screenshot', 'wireframe']) {
    if (!hashes[canal] || hashes[canal] !== meta.sha256?.[canal]) avisos.push('La imagen ' + canal + ' falta o no coincide con su huella registrada.');
  }
  return { version: VERSION,
    estado: avisos.length ? 'con_advertencias' : pendientes.length ? 'sin_verificar' : 'sin_alertas_automaticas',
    integridad_ok: hashes ? ['screenshot', 'wireframe'].every(c => !!hashes[c] && hashes[c] === meta.sha256?.[c]) : null,
    capas_sin_resolver: hayCapa ? true : comprobada && !consent?.error && !marcos ? false : null,
    advertencias: [...new Set([...avisos, ...pendientes])],
    sha256: fuente || null,
  };
}

function revisarDirectorio(dir) {
  let meta, nodos;
  try { meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8')); }
  catch (_) { return { ...revisarCaptura(null), integridad_ok: false }; }
  try { nodos = JSON.parse(fs.readFileSync(path.join(dir, 'nodes.json'), 'utf8')); }
  catch (_) { nodos = null; }
  const hashes = {};
  for (const canal of ['screenshot', 'wireframe']) {
    try { hashes[canal] = crypto.createHash('sha256').update(fs.readFileSync(path.join(dir, canal + '.png'))).digest('hex'); }
    catch (_) { hashes[canal] = null; }
  }
  const revision = revisarCaptura(meta, nodos, hashes);
  if (!Array.isArray(nodos)) {
    revision.advertencias.push('No se pudieron leer los nodos de la captura.');
    revision.estado = 'con_advertencias';
  }
  return revision;
}

const tituloRevision = revision => ({
  con_advertencias: 'Captura con advertencias',
  sin_verificar: 'Captura pendiente de revisión',
  sin_alertas_automaticas: 'Sin alertas automáticas; revisar también la imagen',
}[revision.estado]);

module.exports = { VERSION, revisarCaptura, revisarDirectorio, tituloRevision };
