#!/usr/bin/env node
'use strict';
// Auditoría posterior: no modifica respuestas, entradas ni el instrumento.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const dir = path.resolve(ROOT, process.argv[2] || 'pilotos/g5-2026-10-06');
const read = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const manifest = read(path.join(dir, 'manifiesto.json'));
const inputAudit = [], responseAudit = [];

for (const page of manifest.pages) {
  const input = read(path.join(dir, 'entradas', page.id + '.json')), g = input.g5;
  const nodes = read(path.join(ROOT, page.captura, 'nodes.json'));
  const lists = g.g5_listas;
  const outOfViewport = lists.filter(l => [l.primero.caja, l.ultimo.caja].some(b => b.x < 0 || b.y < 0 || b.x + b.w > input.pagina.viewport.width || b.y + b.h > input.pagina.viewport.height));
  // Un ejemplo concreto, calculado sobre nodos sellados, sin deducir un puntaje.
  // Sus ids permiten revisar las cajas; el ancho no se usa para elegir una lista.
  const semanticLists = nodes.filter(n => ['UL', 'OL'].includes(n.nodeName)).map(parent => {
    const items = nodes.filter(n => n.parentId === parent.id && n.nodeName === 'LI' && n.ink && n.ink.w > 0 && n.ink.h > 0);
    if (items.length < 3) return null;
    const top = items.map(n => n.ink.y), mid = items.map(n => n.ink.y + n.ink.h / 2);
    return { parent: parent.id, ids: items.map(n => n.id), rango_superior: Math.max(...top) - Math.min(...top), rango_centros: Math.max(...mid) - Math.min(...mid), detectada: lists.some(l => l.id_padre === parent.id) };
  }).filter(Boolean);
  inputAudit.push({ id: page.id, listas_recibidas: g.g5_listas_total, listas_entregadas: lists.length,
    listas_de_texto_o_pseudoelementos: lists.filter(l => l.nodeName.startsWith('#') || l.nodeName.startsWith(':')).map(l => l.id_padre),
    listas_con_extremos_fuera_del_viewport: outOfViewport.map(l => l.id_padre),
    listas_semanticas_con_centros_alineados_pero_bordes_superiores_distintos: semanticLists.filter(l => !l.detectada && l.rango_superior > 4 && l.rango_centros <= 4),
    candidatos_de_paso: g.g5_indicador_paso_candidatos.length });

  const responses = [];
  for (let r = 1; r <= 5; r++) {
    const file = path.join(dir, 'resultados', page.id + '-r' + r + '.json');
    if (!fs.existsSync(file)) continue;
    const result = read(file), m = result.measurements, conflicts = [];
    if (result.score >= 3 && !m.Q && m.J_inicio !== true) conflicts.push('nivel 3/4 sin J_inicio en la rama sin proceso');
    if (result.score >= 3 && m.Q && !['G_existe', 'G_nombra', 'G_actual', 'G_forma'].every(k => m[k] === true)) conflicts.push('nivel 3/4 sin los cuatro G verdaderos en la rama de proceso');
    if (result.score === 4 && m.J_final !== true) conflicts.push('nivel 4 sin J_final');
    if (result.score === 0 && !m.Q && (m.J_inicio === true || m.J_final === true)) conflicts.push('nivel 0 declara extremo diferenciado aunque requiere todas las listas planas');
    const chosen = m.main_list_id !== undefined ? lists.find(l => l.id_lista === m.main_list_id) : lists.find(l => l.id_padre === m.main_list_parent_id);
    const missingLimit = Boolean(chosen && (chosen.parcial || chosen.orden_ambiguo || chosen.padre_raiz_virtual) && !result.evidence_insufficient);
    responses.push({ repetition: r, score: result.score, trigger: result.trigger, Q: m.Q, main: m.main_list_id ?? m.main_list_parent_id,
      J_inicio: m.J_inicio, J_final: m.J_final, evidence_insufficient: result.evidence_insufficient,
      limite_geometrico_sin_declarar: missingLimit, conflictos_de_anclas: conflicts });
  }
  responseAudit.push({ id: page.id, evaluaciones: responses.length,
    listas_principales_distintas: new Set(responses.map(r => r.main)).size,
    juicios_J_inicio_distintos: new Set(responses.map(r => r.J_inicio)).size,
    juicios_J_final_distintos: new Set(responses.map(r => r.J_final)).size,
    respuestas_con_conflicto_de_ancla: responses.filter(r => r.conflictos_de_anclas.length).length, respuestas: responses });
}
const audit = { analizado_en: new Date().toISOString(), metodo: 'Auditoría descriptiva posterior, sin cambiar el instrumento ni descartar niveles por su distribución',
  paginas_con_texto_o_pseudoelementos: inputAudit.filter(p => p.listas_de_texto_o_pseudoelementos.length).length,
  paginas_con_cajas_parciales: inputAudit.filter(p => p.listas_con_extremos_fuera_del_viewport.length).length,
  paginas_sin_listas_medidas: inputAudit.filter(p => !p.listas_recibidas).map(p => p.id),
  paginas_con_recorte_de_ocho_listas: inputAudit.filter(p => p.listas_recibidas > p.listas_entregadas).map(p => p.id),
  omisiones_demostrables_por_alineacion: inputAudit.filter(p => p.listas_semanticas_con_centros_alineados_pero_bordes_superiores_distintos.length),
  respuestas_con_conflicto_de_ancla: responseAudit.reduce((sum, p) => sum + p.respuestas_con_conflicto_de_ancla, 0),
  respuestas_con_limite_geometrico_sin_declarar: responseAudit.reduce((sum, p) => sum + p.respuestas.filter(r => r.limite_geometrico_sin_declarar).length, 0),
  paginas_con_seleccion_principal_variable: responseAudit.filter(p => p.listas_principales_distintas > 1).map(p => p.id),
  entradas: inputAudit, respuestas: responseAudit };
fs.writeFileSync(path.join(dir, 'auditoria.json'), JSON.stringify(audit, null, 2) + '\n');
console.log(JSON.stringify({ paginas_con_texto_o_pseudoelementos: audit.paginas_con_texto_o_pseudoelementos, paginas_con_cajas_parciales: audit.paginas_con_cajas_parciales,
  omisiones_por_alineacion: audit.omisiones_demostrables_por_alineacion.map(p => p.id), conflictos_de_ancla: audit.respuestas_con_conflicto_de_ancla }));
