'use strict';

// Convención operativa registrada antes de medir la fase 2; no asigna niveles.
const { cajaValida } = require('./actionable-inventory');
const TOL_ALINEACION = 4;
const tag = n => String(n.nodeName || '').toUpperCase();
const role = n => String(n.attributes?.role || '').toLowerCase();
const real = n => !tag(n).startsWith('#') && !tag(n).startsWith(':');
const range = values => Math.max(...values) - Math.min(...values);

function areaVisible(b, v) {
  return Math.max(0, Math.min(v.width, b.x + b.w) - Math.max(0, b.x)) *
    Math.max(0, Math.min(v.height, b.y + b.h) - Math.max(0, b.y));
}

function orientacion(items) {
  // Bordes o centros: alturas diferentes no invalidan un menú centrado.
  const aligned = axis => [0, 0.5, 1].some(f => range(items.map(n =>
    n.ink[axis] + f * n.ink[axis === 'x' ? 'w' : 'h'])) <= TOL_ALINEACION);
  const row = aligned('y'), column = aligned('x');
  if (!row && !column) return null;
  if (row && !column) return 'horizontal';
  if (column && !row) return 'vertical';
  return range(items.map(n => n.ink.x)) >= range(items.map(n => n.ink.y)) ? 'horizontal' : 'vertical';
}

function detectarListas({ nodos, viewport, inventarioAccionables, ancestros }) {
  const controls = new Set(inventarioAccionables.objetivosG2.map(n => n.id));
  const containsControl = new Set(controls);
  for (const n of inventarioAccionables.objetivosG2) for (const p of ancestros(n)) containsControl.add(p.id);
  const byParent = new Map(), seen = new Set();
  for (const n of nodos) {
    if (seen.has(n.id) || !real(n) || !cajaValida(n.ink) || !areaVisible(n.ink, viewport)) continue;
    seen.add(n.id);
    if (!byParent.has(n.parentId)) byParent.set(n.parentId, []);
    byParent.get(n.parentId).push(n);
  }
  const candidates = [];
  for (const [parentId, siblings] of byParent) {
    const explicit = siblings.filter(n => tag(n) === 'LI' || role(n).split(/\s+/).includes('listitem'));
    const semantic = explicit.length >= 3;
    // No cualquier conjunto de DIV/P/SPAN. Cada opción genérica debe contener
    // un control del inventario. Los hermanos pueden mezclar A y BUTTON.
    const items = semantic ? explicit : siblings.filter(n => containsControl.has(n.id));
    if (items.length < 3) continue;
    const direction = orientacion(items);
    if (!direction) continue;
    const axis = direction === 'horizontal' ? 'x' : 'y';
    const cross = axis === 'x' ? 'y' : 'x', size = axis === 'x' ? 'w' : 'h';
    const ordered = items.slice().sort((a, b) => (a.ink[axis] - b.ink[axis]) ||
      (a.ink[cross] - b.ink[cross]) || ((a.paintOrder ?? a.id) - (b.paintOrder ?? b.id)) || (a.id - b.id));
    candidates.push({ parentId, items: ordered, orientacion: direction,
      evidencia_pertenencia: semantic ? 'items_explicitos' : 'opciones_con_control',
      area_visible_total: Math.round(ordered.reduce((sum, n) => sum + areaVisible(n.ink, viewport), 0)),
      parcial: ordered.some(n => areaVisible(n.ink, viewport) < n.ink.w * n.ink.h),
      orden_ambiguo: ordered.some((n, i) => i > 0 && ordered[i - 1].ink[axis] + ordered[i - 1].ink[size] > n.ink[axis]),
    });
  }
  return candidates;
}
module.exports = { detectarListas, orientacion, areaVisible, TOL_ALINEACION };
