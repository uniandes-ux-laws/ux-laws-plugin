#!/usr/bin/env node
'use strict';

/**
 * capture.js — capture layer for the "Laws of UX" automated evaluation project.
 *
 * Produces four artifacts for a single URL, at a single fixed viewport:
 *
 *   screenshot.png  the rendered page, visible area only (never fullPage)
 *   wireframe.png   the same geometry redrawn from the browser's LAYOUT TREE
 *   nodes.json      one record per retained layout node; `id` indexes the
 *                   rectangles drawn in wireframe.png
 *   meta.json       provenance: url, timestamp, viewport, UA, Chromium build,
 *                   sha256 of both images, retained/total node counts
 *
 * The wireframe is NEVER produced by segmenting the screenshot raster. It comes
 * from `DOMSnapshot.captureSnapshot` over a CDP session, which is the browser's
 * own post-layout box tree. That is the whole point of the double-channel
 * design: the wireframe channel must be a *measurement*, not an interpretation
 * of pixels.
 *
 * Usage:
 *   node capture.js <url> --out <dir> [--viewport 1440x900] [--timeout 30000]
 *
 * Exit codes: 0 success, 1 failure (nothing partial is written on failure).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { chromium } = require('playwright');
const { dismissInterstitials } = require('./dismiss.js');

// ---------------------------------------------------------------------------
// Frozen project decisions
// ---------------------------------------------------------------------------

/**
 * The capture viewport is a frozen decision of the project: every page is
 * evaluated at 1440x900 CSS px, visible area only. It is exposed as a flag so
 * that a deliberate experiment can vary it, but the default never moves.
 */
const DEFAULT_VIEWPORT = { width: 1440, height: 900 };

/**
 * deviceScaleFactor is pinned to 1 so that 1 CSS px == 1 device px. Any other
 * value would make the PNG and the CSS-px boxes in nodes.json disagree, and the
 * fidelity check would be measuring the scale factor instead of the layout.
 */
const DEVICE_SCALE_FACTOR = 1;

/**
 * El user agent es un parametro del protocolo, no un detalle de transporte.
 *
 * Con el user agent que Chromium anuncia en modo headless --- dice literalmente
 * 'HeadlessChrome' --- nueve de las treinta paginas del corpus devolvieron 403,
 * 500, o un 200 con la pagina vacia. Ocho de esas nueve cargan completas con un
 * user agent de Chrome normal. Lo que el WAF bloqueaba no era la peticion sino
 * la etiqueta.
 *
 * Se declara y se registra en meta.json en cada captura. No se anaden otras
 * tecnicas de evasion: si un sitio sigue bloqueando con un user agent honesto,
 * se declara como no capturable y se reemplaza en el manifiesto.
 *
 * El locale acompana por la misma razon: el corpus es colombiano y se evalua la
 * pagina que se le sirve a un usuario colombiano.
 */
const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36';
const DEFAULT_LOCALE = 'es-CO';

/**
 * Control de sanidad. Una captura con muy pocos nodos no es una pagina simple:
 * es una pagina que no cargo. No hace fallar la captura --- el artefacto se
 * escribe igual y se puede mirar --- pero la marca, porque un 200 con la pagina
 * vacia es la falla silenciosa que este corpus ya produjo una vez.
 *
 * El umbral es convencion de este proyecto, fijado con los datos de la primera
 * corrida: las paginas bloqueadas quedaron entre 10 y 37 nodos retenidos y la
 * mas escueta de las que si cargaron quedo en 208.
 */
const MIN_RETAINED_NODES = 50;

/**
 * Reintentos de navegacion.
 *
 * Colpensiones fallo con ERR_CONNECTION_TIMED_OUT en dos corridas y cargo con
 * 2721 elementos en un intento inmediatamente posterior. Una pagina que no
 * responde a la primera es normal, y correr la captura a mano hasta que salga
 * es una intervencion no reproducible: el numero de intentos tiene que ser un
 * parametro declarado del protocolo y quedar registrado por captura.
 *
 * Solo se reintenta el fallo de transporte. Un 403 o un CAPTCHA responden igual
 * las veces que se pidan, y reintentarlos solo gasta tiempo.
 */
const DEFAULT_NAV_ATTEMPTS = 3;
const RETRY_BACKOFF_MS = [0, 3000, 8000];

/**
 * Senales de pagina de bloqueo.
 *
 * Un umbral de conteo detecta una pagina vacia por accidente: EPS Sanitas
 * devolvio un CAPTCHA de Radware con 49 nodos retenidos y el umbral era 50. Se
 * salvo por un nodo. Estas cadenas se buscan en el titulo y en el texto visible
 * y no dependen de cuantos nodos tenga la pagina de bloqueo.
 *
 * La lista es abierta a proposito: cada bloqueo nuevo que aparezca en el corpus
 * se agrega aca con la fecha, y el manifiesto registra que esa pagina se
 * reemplazo por bloqueo y no por criterio de diseno.
 */
const BLOCK_SIGNALS = [
  'captcha', 'hcaptcha', 'recaptcha',
  'soy humano', 'i am human', 'verify you are human', 'verifying you are human',
  'access denied', 'acceso denegado', 'forbidden',
  'unusual traffic', 'trafico inusual',
  'anomaly detected', 'bot manager', 'incident id',
  'checking your browser', 'ddos protection', 'cloudflare ray id',
  '请稍候', 'just a moment',
];

/**
 * Computed styles requested from CDP. We ask for exactly what the nodes.json
 * schema records. Asking for more would bloat the snapshot; asking for less
 * would force us to guess.
 */
const COMPUTED_STYLES = [
  'position', 'visibility', 'opacity',
  // --- perceptual-boundary group -------------------------------------------
  // These are NOT drawn. They answer one question: does this box put a
  // boundary on the screen that a person can see? A <div> with no background,
  // no border and no shadow is invisible; outlining it on the wireframe adds an
  // edge the screenshot does not have, and every distance measured against that
  // edge is a measurement of the CSS rather than of the layout a person
  // perceives. See ADR-01 in docs/.
  'background-color',
  'background-image',
  'outline-width', 'outline-style',
  'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
  'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
  'box-shadow',
];

// Elements whose own box is their visible extent regardless of CSS: the browser
// paints content inside them.
const REPLACED_ELEMENTS = new Set([
  'IMG', 'SVG', 'VIDEO', 'CANVAS', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'IFRAME', 'OBJECT', 'EMBED',
]);

/** Alpha channel of a computed colour string, or null when unreadable. */
function alphaOf(color) {
  if (typeof color !== 'string') return null;
  const s = color.trim();
  if (s === 'transparent') return 0;
  const m = s.match(/^rgba?\(([^)]+)\)$/);
  if (!m) return null;
  const parts = m[1].split(/[\s,\/]+/).filter(Boolean);
  if (parts.length >= 4) {
    const a = Number.parseFloat(parts[3]);
    return Number.isFinite(a) ? a : null;
  }
  return 1;
}

/**
 * Does this node paint a boundary a person can see?
 *
 * A style the engine did not report leaves the node undecided rather than
 * invisible: `{ visible: null }` means "not determinable", and the caller keeps
 * the box. An unread style must never silently erase a real edge.
 */
function visibleBoundaryOf(style, nodeName) {
  if (REPLACED_ELEMENTS.has(String(nodeName || '').toUpperCase())) {
    return { visible: true, why: 'replaced element' };
  }
  let undecided = false;

  const bg = style['background-color'];
  if (bg === null || bg === undefined) undecided = true;
  else {
    const a = alphaOf(bg);
    if (a === null) undecided = true;
    else if (a > 0) return { visible: true, why: `background-color alpha ${a}` };
  }

  for (const side of ['top', 'right', 'bottom', 'left']) {
    const w = style[`border-${side}-width`];
    const st = style[`border-${side}-style`];
    if (w === null || w === undefined || st === null || st === undefined) { undecided = true; continue; }
    const wv = Number.parseFloat(w);
    if (Number.isFinite(wv) && wv > 0 && st !== 'none' && st !== 'hidden') {
      return { visible: true, why: `border-${side} ${wv}px ${st}` };
    }
  }

  // A surface painted with an image and no background-colour is common (heroes,
  // icon sprites, decorative panels) and is unmistakably visible.
  const bi = style['background-image'];
  if (bi === null || bi === undefined) undecided = true;
  else if (bi !== 'none') return { visible: true, why: 'background-image' };

  const ow = style['outline-width'];
  const os = style['outline-style'];
  if (ow === null || ow === undefined || os === null || os === undefined) undecided = true;
  else {
    const owv = Number.parseFloat(ow);
    if (Number.isFinite(owv) && owv > 0 && os !== 'none' && os !== 'hidden') {
      return { visible: true, why: `outline ${owv}px ${os}` };
    }
  }

  const sh = style['box-shadow'];
  if (sh === null || sh === undefined) undecided = true;
  else if (sh !== 'none') return { visible: true, why: 'box-shadow' };

  if (undecided) return { visible: null, why: 'styles not reported by the engine' };
  return { visible: false, why: 'no background, no border, no shadow' };
}

/** Smallest box containing both. Either may be null. */
function unionBox(a, b) {
  if (!a) return b || null;
  if (!b) return a;
  const x1 = Math.min(a.x, b.x);
  const y1 = Math.min(a.y, b.y);
  const x2 = Math.max(a.x + a.w, b.x + b.w);
  const y2 = Math.max(a.y + a.h, b.y + b.h);
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}

/**
 * Attributes that carry *identity* — the ones an evaluator can reason about
 * (what is this thing, what does it say, where does it go). Everything else
 * (inline `style`, data-*, framework bookkeeping) is dropped.
 */
const IDENTITY_ATTRS = [
  'alt', 'aria-label', 'href', 'role', 'type',
  'placeholder', 'title', 'name', 'id', 'class',
];

const NODE_TYPE_TEXT = 3; // Node.TEXT_NODE

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const opts = {
    url: null,
    out: null,
    viewport: { ...DEFAULT_VIEWPORT },
    timeout: 30000,
    // Perceptual mode is the corrected behaviour and the default. The flag
    // exists so the ablation can be run: the same page captured both ways,
    // scored both ways, with the difference reported.
    perceptual: true,
    // El descarte de interstitials es el comportamiento por defecto. La bandera
    // existe para la ablacion: capturar las mismas paginas con y sin muro.
    dismissConsent: true,
  };

  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') {
      opts.out = argv[++i];
    } else if (a === '--viewport') {
      const raw = argv[++i];
      const m = /^(\d+)x(\d+)$/.exec(raw || '');
      if (!m) throw new Error(`--viewport expects WIDTHxHEIGHT (e.g. 1440x900), got: ${raw}`);
      opts.viewport = { width: Number(m[1]), height: Number(m[2]) };
    } else if (a === '--timeout') {
      const raw = argv[++i];
      const n = Number(raw);
      if (!Number.isFinite(n) || n <= 0) throw new Error(`--timeout expects a positive number of ms, got: ${raw}`);
      opts.timeout = n;
    } else if (a === '--keep-interstitials') {
      opts.dismissConsent = false;
    } else if (a === '--no-perceptual') {
      opts.perceptual = false;
    } else if (a === '--help' || a === '-h') {
      opts.help = true;
    } else if (a.startsWith('--')) {
      throw new Error(`unknown flag: ${a}`);
    } else {
      rest.push(a);
    }
  }

  if (rest.length > 1) throw new Error(`expected exactly one URL, got ${rest.length}: ${rest.join(', ')}`);
  opts.url = rest[0] || null;
  return opts;
}

const USAGE = `
capture.js — capture one page into screenshot.png / wireframe.png / nodes.json / meta.json

  node capture.js <url> --out <dir> [options]

  --out <dir>          output directory (created if missing)   [required]
  --viewport WxH       capture viewport in CSS px              [default 1440x900]
  --timeout <ms>       navigation timeout                      [default 30000]
  --no-perceptual      outline every laid-out box, including the ones that
                       paint no visible boundary. Off by default; kept so the
                       ablation can capture the same page both ways.
`.trim();

// ---------------------------------------------------------------------------
// CDP snapshot decoding
// ---------------------------------------------------------------------------

/**
 * CDP returns a `RareBooleanData` as `{ index: [...] }`: the list of node
 * indices for which the flag is true. Everything not listed is false.
 * Returns a Set so lookups are O(1).
 */
function rareBooleanToSet(rare) {
  const s = new Set();
  if (!rare || !Array.isArray(rare.index)) return s;
  for (const i of rare.index) s.add(i);
  return s;
}

/**
 * Decode the flat `attributes` array for one node ([nameIdx, valueIdx, ...])
 * into an object, keeping only the identity-bearing attributes.
 */
function decodeIdentityAttributes(flat, strings) {
  const out = {};
  if (!Array.isArray(flat)) return out;
  for (let i = 0; i + 1 < flat.length; i += 2) {
    const name = strings[flat[i]];
    if (typeof name !== 'string') continue;
    if (!IDENTITY_ATTRS.includes(name)) continue;
    const value = strings[flat[i + 1]];
    // A present-but-empty attribute is meaningful (e.g. alt=""), so keep '' but
    // never invent a value for a string index we cannot resolve.
    out[name] = typeof value === 'string' ? value : null;
  }
  return out;
}

/**
 * Build the candidate list from documents[0] of a DOMSnapshot.
 *
 * Every entry in `layout` is a box the engine actually laid out. Nodes with
 * `display:none` never appear here at all — the engine produced no box for
 * them, so there is nothing to measure and nothing to draw.
 *
 * Throws if the snapshot is missing a field we depend on. We would rather fail
 * loudly than emit a measurement built on a substituted default.
 */
function decodeDocument(doc, strings) {
  const L = doc.layout;
  const N = doc.nodes;

  if (!L || !Array.isArray(L.nodeIndex)) {
    throw new Error('DOMSnapshot: documents[0].layout.nodeIndex missing — cannot locate any box.');
  }
  if (!Array.isArray(L.bounds)) {
    throw new Error('DOMSnapshot: documents[0].layout.bounds missing — cannot measure any box.');
  }
  if (!Array.isArray(L.paintOrders)) {
    throw new Error(
      'DOMSnapshot: documents[0].layout.paintOrders missing. captureSnapshot was ' +
      'called with includePaintOrder:true, so this build of Chromium did not honour it. ' +
      'Without paint order the "does it paint" filter cannot be applied.'
    );
  }
  if (!N || !Array.isArray(N.nodeName) || !Array.isArray(N.parentIndex)) {
    throw new Error('DOMSnapshot: documents[0].nodes is missing nodeName or parentIndex.');
  }

  const clickable = rareBooleanToSet(N.isClickable);

  // --- ink boxes -----------------------------------------------------------
  // `documents[0].textBoxes` is the post-layout inline text: one entry per
  // rendered glyph run, with `layoutIndex` naming the layout node that owns it
  // and `bounds` giving the box the glyphs actually occupy. That box, not the
  // containing element's box, is what the eye sees.
  const inkByLayout = new Map();
  const TB = doc.textBoxes;
  let textBoxCount = 0;
  if (TB && Array.isArray(TB.layoutIndex) && Array.isArray(TB.bounds)) {
    for (let t = 0; t < TB.layoutIndex.length; t++) {
      const b = TB.bounds[t];
      if (!Array.isArray(b) || b.length < 4) continue;
      if (b.some((v) => typeof v !== 'number' || !Number.isFinite(v))) continue;
      if (!(b[2] > 0 && b[3] > 0)) continue;
      const li = TB.layoutIndex[t];
      inkByLayout.set(li, unionBox(inkByLayout.get(li), { x: b[0], y: b[1], w: b[2], h: b[3] }));
      textBoxCount++;
    }
  }

  const styleProp = COMPUTED_STYLES.indexOf('position');   // index into layout.styles[i]
  const visProp = COMPUTED_STYLES.indexOf('visibility');
  const opaProp = COMPUTED_STYLES.indexOf('opacity');

  // Read one computed style off a layout node, or null when the engine did not
  // report it. Never substitutes a default: a guessed value would look like a
  // measurement.
  const styleAt = (styleIdxs, i) => {
    if (!Array.isArray(styleIdxs) || i < 0 || i >= styleIdxs.length) return null;
    const v = strings[styleIdxs[i]];
    return typeof v === 'string' && v.length > 0 ? v : null;
  };

  const candidates = [];
  const problems = { missingBounds: 0, missingPaintOrder: 0, missingPosition: 0, invisible: 0 };

  for (let li = 0; li < L.nodeIndex.length; li++) {
    const nodeIndex = L.nodeIndex[li];
    const b = L.bounds[li];
    const paintOrder = L.paintOrders[li];

    if (!Array.isArray(b) || b.length < 4 || b.some((v) => typeof v !== 'number' || !Number.isFinite(v))) {
      // No usable box. Skipping is the only honest option: a substituted 0,0,0,0
      // would look like a real measurement of a degenerate element.
      problems.missingBounds++;
      continue;
    }
    if (typeof paintOrder !== 'number' || !Number.isFinite(paintOrder)) {
      // Criterion 1: no paint order entry => it does not paint => not retained.
      problems.missingPaintOrder++;
      continue;
    }

    // `position` is read from the per-layout-node style index list. If the
    // engine did not report it, we record null rather than assuming 'static'.
    const styleIdxs = L.styles && L.styles[li];
    const position = styleAt(styleIdxs, styleProp);
    if (position === null) problems.missingPosition++;

    // Criterion 1b: an element the engine gives a paint order to may still paint
    // nothing a person can see. `visibility: hidden` and a fully transparent
    // element occupy layout but are invisible, and a wireframe that outlines them
    // reports geometry no evaluator can check against the screenshot. Only an
    // explicitly invisible value excludes; a style the engine did not report
    // leaves the node in, so an unread style never silently drops a real box.
    const visibility = styleAt(styleIdxs, visProp);
    const opacity = styleAt(styleIdxs, opaProp);
    const transparent = opacity !== null && Number.parseFloat(opacity) === 0;
    if (visibility === 'hidden' || visibility === 'collapse' || transparent) {
      problems.invisible++;
      continue;
    }

    const nodeType = Array.isArray(N.nodeType) ? N.nodeType[nodeIndex] : undefined;
    const nodeNameStr = strings[N.nodeName[nodeIndex]];

    const perceptualStyle = {};
    for (const name of COMPUTED_STYLES) {
      perceptualStyle[name] = styleAt(styleIdxs, COMPUTED_STYLES.indexOf(name));
    }
    const boundary = visibleBoundaryOf(perceptualStyle, nodeNameStr);

    candidates.push({
      id: nodeIndex,
      layoutIndex: li,
      bounds: { x: b[0], y: b[1], w: b[2], h: b[3] },
      visibleBoundary: boundary,
      ownInk: inkByLayout.get(li) || null,
      isClickable: clickable.has(nodeIndex),
      nodeName: typeof nodeNameStr === 'string' ? nodeNameStr : null,
      attributes: decodeIdentityAttributes(N.attributes && N.attributes[nodeIndex], strings),
      position,
      rawParentIndex: typeof N.parentIndex[nodeIndex] === 'number' ? N.parentIndex[nodeIndex] : -1,
      paintOrder,
      isText: nodeType === NODE_TYPE_TEXT,
    });
  }

  return { candidates, problems, domNodeCount: N.nodeName.length, layoutNodeCount: L.nodeIndex.length, textBoxCount };
}

// ---------------------------------------------------------------------------
// Retention filter
// ---------------------------------------------------------------------------

const AREA_EPSILON = 0; // strictly greater than zero in both dimensions

function contains(outer, inner) {
  return (
    outer.x <= inner.x &&
    outer.y <= inner.y &&
    outer.x + outer.w >= inner.x + inner.w &&
    outer.y + outer.h >= inner.y + inner.h
  );
}

/**
 * Apply the three retention criteria:
 *
 *   1. the node paints            — it has a paint order entry (checked above)
 *   2. its box has non-zero area  — w > 0 and h > 0
 *   3. it is not fully covered    — no non-ancestor, non-descendant node with a
 *                                   strictly higher paint order fully contains it
 *
 * Criterion 3 is the "sibling that paints over it" rule. Ancestors and
 * descendants are excluded deliberately: a wrapper containing its own child is
 * ordinary nesting, not occlusion, and a wrapper always paints *before* its
 * children anyway. What criterion 3 removes is the element hidden behind an
 * opaque box drawn later in the same stacking pass.
 *
 * Without this filter the wireframe shows the HTML document structure rather
 * than the page a person sees.
 */
/**
 * Puede este nodo tapar lo que hay debajo?
 *
 * Solo si pinta una superficie OPACA. Un contenedor transparente a pantalla
 * completa --- el envoltorio de un chat, un modal vacio, una capa de gestos ---
 * ocupa el viewport entero y no tapa nada, pero el filtro de oclusion lo trataba
 * como si tapara: en INVIMA borro el encabezado, el buscador, el menu y el
 * carrusel, y dejo 18 nodos de una pagina completa.
 *
 * Un borde tampoco tapa: rodea, no cubre. Por eso solo cuentan como opacos el
 * fondo de color con alfa 1, la imagen de fondo y los elementos reemplazados.
 */
function puedeOcluir(c) {
  const vb = c.visibleBoundary;
  if (!vb || vb.visible !== true) return false;
  const why = vb.why || '';
  if (why === 'replaced element') return true;
  if (why === 'background-image') return true;
  const m = /^background-color alpha ([0-9.]+)$/.exec(why);
  if (m) return Number.parseFloat(m[1]) >= 1;
  return false;   // bordes, sombras y outlines no cubren
}

function applyRetentionFilter(candidates) {
  // Criterion 2.
  const sized = candidates.filter((c) => c.bounds.w > AREA_EPSILON && c.bounds.h > AREA_EPSILON);

  // Ancestor test needs the raw DOM parent chain, including nodes that were
  // never laid out, so build the map from every candidate we decoded.
  const parentOf = new Map();
  for (const c of candidates) parentOf.set(c.id, c.rawParentIndex);

  const isAncestorOf = (maybeAncestorId, nodeId) => {
    let cur = parentOf.has(nodeId) ? parentOf.get(nodeId) : -1;
    let guard = 0;
    while (cur !== -1 && cur !== undefined && guard++ < 10000) {
      if (cur === maybeAncestorId) return true;
      cur = parentOf.has(cur) ? parentOf.get(cur) : -1;
    }
    return false;
  };

  // Criterion 3. Sorting by paint order lets us only consider strictly-later
  // painters for each node, which is what "paints over" means.
  const byPaint = [...sized].sort((a, b) => a.paintOrder - b.paintOrder);
  const retained = [];

  for (let i = 0; i < byPaint.length; i++) {
    const n = byPaint[i];
    let occluded = false;
    for (let j = i + 1; j < byPaint.length; j++) {
      const m = byPaint[j];
      if (m.paintOrder <= n.paintOrder) continue; // equal paint order does not cover
      if (!puedeOcluir(m)) continue;              // transparente: no tapa nada
      if (!contains(m.bounds, n.bounds)) continue;
      if (isAncestorOf(m.id, n.id)) continue;     // parent wrapping child: not occlusion
      if (isAncestorOf(n.id, m.id)) continue;     // child inside parent: not occlusion
      occluded = true;
      break;
    }
    if (!occluded) retained.push(n);
  }

  return retained;
}

/**
 * `parentId` points at the nearest *retained* ancestor, not at the raw DOM
 * parent. A raw parent index would frequently dangle (the parent may have been
 * filtered out), which makes nodes.json unusable as a tree for a consumer that
 * only sees the retained boxes. This is documented in README.md.
 */
function assignParentIds(retained, candidates) {
  const retainedIds = new Set(retained.map((c) => c.id));
  const parentOf = new Map();
  for (const c of candidates) parentOf.set(c.id, c.rawParentIndex);

  for (const n of retained) {
    let cur = parentOf.has(n.id) ? parentOf.get(n.id) : -1;
    let guard = 0;
    let found = null;
    while (cur !== -1 && cur !== undefined && guard++ < 10000) {
      if (retainedIds.has(cur)) { found = cur; break; }
      cur = parentOf.has(cur) ? parentOf.get(cur) : -1;
    }
    n.parentId = found;
  }
}

/**
 * Give every candidate an `ink` box: the extent a person actually sees.
 *
 *   - a node that paints a visible boundary (background, border, shadow, or a
 *     replaced element) IS its layout box: the edge is on the screen, and it is
 *     also what Palmer (1992) calls a common region.
 *   - a node that paints no visible boundary has no edge of its own. Its extent
 *     is the union of the glyph runs beneath it.
 *   - a node with neither gets `ink: null`. A consumer must not substitute the
 *     layout box for it; null means "this box is not visible on the screen".
 *
 * The propagation walks the raw DOM parent chain and runs over ALL candidates,
 * not only the retained ones, so ink is not lost through a filtered ancestor.
 */
function assignInk(candidates) {
  const byId = new Map();
  for (const c of candidates) byId.set(c.id, c);

  // Self ink: what this node alone puts on the screen.
  //   visible boundary  -> its own box IS on the screen (and is a common region)
  //   undecided         -> keep the box; the rule never erases on missing evidence
  //   otherwise         -> only the glyph runs it owns
  for (const c of candidates) {
    const v = c.visibleBoundary ? c.visibleBoundary.visible : null;
    c.selfInk = (v === true || v === null) ? c.bounds : (c.ownInk || null);
    c.inkFromChildren = null;
  }

  // Propagate every self ink up the raw DOM parent chain, so an invisible
  // wrapper inherits the extent of whatever is visible inside it.
  for (const c of candidates) {
    if (!c.selfInk) continue;
    let cur = c.rawParentIndex;
    let guard = 0;
    while (cur !== -1 && cur !== undefined && guard++ < 10000) {
      const anc = byId.get(cur);
      if (!anc) break;            // ancestor was never laid out; the chain ends
      anc.inkFromChildren = unionBox(anc.inkFromChildren, c.selfInk);
      cur = anc.rawParentIndex;
    }
  }

  for (const c of candidates) {
    c.ink = c.selfInk || c.inkFromChildren || null;
  }
}

/**
 * Interseccion de una caja con el area visible, o null si no toca la pantalla.
 *
 * El alcance de este trabajo es una pantalla: viewport fijo, solo lo visible sin
 * scroll. El screenshot y el wireframe ya respetan eso porque son lienzos de
 * 1440x900, pero el arbol de layout describe el documento entero, y entre el 78%
 * y el 98% de los nodos retenidos caian fuera de la pantalla. Una rubrica que
 * lea esos nodos puntua la pagina completa mientras el screenshot muestra la
 * primera pantalla: rompe el alcance declarado y rompe la comparacion entre
 * canales, porque un canal veria una pantalla y el otro el documento.
 *
 * Un nodo que toca la pantalla aunque sea en parte SI entra, con su caja
 * completa intacta --- es un hecho del layout --- mas la caja recortada y una
 * marca, para que cada rubrica decida cual usar. G7 mide sobre el area que
 * acepta el clic; G1 mide sobre lo que se ve.
 */
function intersectViewport(box, viewport) {
  if (!box) return null;
  const x0 = Math.max(box.x, 0);
  const y0 = Math.max(box.y, 0);
  const x1 = Math.min(box.x + box.w, viewport.width);
  const y1 = Math.min(box.y + box.h, viewport.height);
  if (x1 <= x0 || y1 <= y0) return null;
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

/** Project a retained candidate onto the exact nodes.json record schema. */
function toRecord(n, viewport) {
  const visibleBounds = intersectViewport(n.bounds, viewport);
  const visibleInk = intersectViewport(n.ink, viewport);
  return {
    id: n.id,
    bounds: n.bounds,
    isClickable: n.isClickable,
    nodeName: n.nodeName,
    attributes: n.attributes,
    position: n.position,
    parentId: n.parentId === undefined ? null : n.parentId,
    paintOrder: n.paintOrder,
    // The extent a person sees. G1, G3 and G5 measure over `ink`; G7 measures
    // over `bounds`, because the hit target is the layout box even when the box
    // has no visible edge. See docs/adr-01-caja-de-tinta.md.
    ink: n.ink || null,
    visibleBounds,
    visibleInk,
    clipped: !!(visibleBounds &&
      (visibleBounds.w < n.bounds.w - 0.5 || visibleBounds.h < n.bounds.h - 0.5)),
    visibleBoundary: n.visibleBoundary
      ? { visible: n.visibleBoundary.visible, reason: n.visibleBoundary.why }
      : null,
  };
}

// ---------------------------------------------------------------------------
// Wireframe rendering
// ---------------------------------------------------------------------------

function esc(n) {
  // Guard against NaN sneaking into the SVG, which would silently drop a rect.
  if (typeof n !== 'number' || !Number.isFinite(n)) {
    throw new Error(`wireframe: refusing to draw a non-finite coordinate (${n})`);
  }
  return Math.round(n * 100) / 100;
}

/**
 * Build the wireframe as SVG from the retained boxes, then rasterise it in the
 * same browser at the same viewport. Element boxes are outlined rectangles;
 * text nodes are filled bars. No colour, no typography, no imagery — that is
 * the abstraction the structural laws are supposed to be evaluated on.
 *
 * Boxes are emitted in ascending paint order so that overlaps stack the way the
 * page does.
 */
function buildWireframeSVG(retained, viewport, opts = {}) {
  const perceptual = opts.perceptual !== false;
  const ordered = [...retained].sort((a, b) => a.paintOrder - b.paintOrder || a.id - b.id);
  const parts = [];
  for (const n of ordered) {
    const { x, y, w, h } = n.bounds;
    if (n.isText) {
      parts.push(`<rect id="n${n.id}" x="${esc(x)}" y="${esc(y)}" width="${esc(w)}" height="${esc(h)}" fill="#000"/>`);
    } else {
      // An element that paints no boundary a person can see gets no outline.
      // Drawing it would put an edge on the wireframe that is not on the
      // screen, and the structural laws would then be scored against it.
      // `visible === null` (styles unreported) keeps the outline: the rule
      // never removes a box on missing evidence.
      if (perceptual && n.visibleBoundary && n.visibleBoundary.visible === false) continue;
      parts.push(`<rect id="n${n.id}" x="${esc(x)}" y="${esc(y)}" width="${esc(w)}" height="${esc(h)}" fill="none" stroke="#000" stroke-width="1"/>`);
    }
  }
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${viewport.width}" height="${viewport.height}" ` +
    `viewBox="0 0 ${viewport.width} ${viewport.height}" shape-rendering="crispEdges">` +
    `<rect x="0" y="0" width="${viewport.width}" height="${viewport.height}" fill="#fff"/>` +
    parts.join('') +
    `</svg>`
  );
}

async function renderWireframePNG(context, svg, viewport) {
  const page = await context.newPage();
  try {
    await page.setViewportSize(viewport);
    await page.setContent(
      `<!doctype html><html><head><meta charset="utf-8"><style>` +
      `html,body{margin:0;padding:0;background:#fff;overflow:hidden}svg{display:block}` +
      `</style></head><body>${svg}</body></html>`,
      { waitUntil: 'load' }
    );
    // Not fullPage: the wireframe must be exactly viewport-sized so it is
    // pixel-comparable with screenshot.png.
    return await page.screenshot({ type: 'png', fullPage: false });
  } finally {
    await page.close();
  }
}

// ---------------------------------------------------------------------------
// Capture
// ---------------------------------------------------------------------------

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

/**
 * Launch options for Chromium.
 *
 * Chromium does not read HTTPS_PROXY/NO_PROXY from the environment the way a
 * CLI tool does, so in a proxied container every navigation fails with
 * ERR_TUNNEL_CONNECTION_FAILED unless the proxy is passed explicitly. This is
 * environment plumbing, not a capture option: it never changes what is
 * measured, only whether the page can be fetched at all.
 *
 * CHROMIUM_PATH overrides the binary; the default is the browser shipped in
 * this container.
 */
function launchOptions() {
  // El binario: por defecto el que Playwright instala y resuelve solo. Un
  // executablePath fijo ata la captura a una maquina concreta, que es lo
  // contrario de lo que el artefacto promete. CHROMIUM_PATH lo fuerza cuando el
  // entorno trae su propio Chromium (contenedores, CI).
  const opts = { args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-device-scale-factor=1', '--hide-scrollbars'] };
  if (process.env.CHROMIUM_PATH) opts.executablePath = process.env.CHROMIUM_PATH;
  const server = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (server) {
    opts.proxy = { server };
    const bypass = process.env.NO_PROXY || process.env.no_proxy;
    if (bypass) opts.proxy.bypass = bypass;
  }
  return opts;
}

/**
 * Capture one URL. Returns a summary object. Writes nothing until every
 * artifact has been produced, so a failure never leaves a half-written capture
 * that a downstream step could mistake for a good one.
 */
async function capturePage({ url, out, viewport = DEFAULT_VIEWPORT, timeout = 30000, perceptual = true, userAgent = DEFAULT_USER_AGENT, attempts = DEFAULT_NAV_ATTEMPTS, dismissConsent = true, browser = null, log = () => {} }) {
  let ownBrowser = null;
  const notes = [];

  if (!browser) {
    ownBrowser = await chromium.launch(launchOptions());
    browser = ownBrowser;
  }

  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    userAgent,
    locale: DEFAULT_LOCALE,
  });

  try {
    const page = await context.newPage();

    // --- navigate ----------------------------------------------------------
    let response = null;
    let navAttempts = 0;
    let lastNavError = null;
    for (let i = 0; i < attempts; i++) {
      navAttempts = i + 1;
      if (RETRY_BACKOFF_MS[i]) await page.waitForTimeout(RETRY_BACKOFF_MS[i]);
      try {
        response = await page.goto(url, { waitUntil: 'load', timeout });
        lastNavError = null;
        break;
      } catch (err) {
        lastNavError = err.message.split('\n')[0];
        if (i === attempts - 1) {
          throw new Error(`navigation failed for ${url} after ${attempts} attempt(s): ${lastNavError}`);
        }
        log(`  intento ${i + 1}/${attempts} fallo (${lastNavError}); reintentando`);
      }
    }
    if (!response) {
      throw new Error(`navigation to ${url} produced no response (redirect to a non-HTTP scheme, or aborted).`);
    }
    if (!response.ok()) {
      // Not fatal — a 404 page is still a page, and evaluating it may be
      // intentional — but it must be visible in meta.json, not swallowed.
      notes.push(`HTTP status ${response.status()} ${response.statusText()}`);
    }

    // Best effort settle. A page that never goes idle (polling, animation) is
    // common and is not an error; we record that we gave up waiting.
    try {
      await page.waitForLoadState('networkidle', { timeout: Math.min(5000, timeout) });
    } catch (_) {
      notes.push('networkidle not reached within 5000ms; captured at load event instead');
    }

    // --- screenshot --------------------------------------------------------
    // fullPage:false is a frozen decision: only what is visible without
    // scrolling. Laws about first impression and visual hierarchy are about the
    // first screen, not about a 12000px tall stitched image.
    // Descarte de interstitials ANTES del screenshot y del snapshot de layout,
    // para que las dos representaciones vean la misma pantalla. Todo lo que hace
    // queda registrado en meta.json: una intervencion sin registro es una
    // intervencion invisible.
    let consent = null;
    if (dismissConsent) {
      try {
        consent = await dismissInterstitials(page, { log });
      } catch (err) {
        consent = { error: err.message.split('\n')[0] };
        notes.push(`el descarte de interstitials fallo: ${consent.error}`);
      }
      if (consent && consent.overlayRestante) {
        notes.push(`queda una capa que cubre el ${(consent.overlayRestante.mayorFraccion * 100).toFixed(0)}% del viewport: ${consent.overlayRestante.elemento}`);
      }
    }

    const screenshotBuf = await page.screenshot({ type: 'png', fullPage: false });

    // Titulo y una muestra del texto visible. No entran en ninguna puntuacion:
    // sirven para saber, al auditar, que fue lo que realmente se capturo.
    let pageTitle = null, textSample = '';
    try {
      pageTitle = await page.title();
      textSample = await page.evaluate(() => (document.body ? document.body.innerText : '').slice(0, 600));
    } catch (_) { /* una pagina que no deja leer su texto se registra como null */ }
    const haystack = ((pageTitle || '') + ' ' + textSample).toLowerCase();
    const blockSignals = BLOCK_SIGNALS.filter((sig) => haystack.includes(sig));

    // --- layout snapshot ---------------------------------------------------
    const cdp = await context.newCDPSession(page);
    let snap;
    try {
      snap = await cdp.send('DOMSnapshot.captureSnapshot', {
        computedStyles: COMPUTED_STYLES,
        includePaintOrder: true,
        includeDOMRects: false,
      });
    } catch (err) {
      throw new Error(`DOMSnapshot.captureSnapshot failed: ${err.message}`);
    }

    if (!snap || !Array.isArray(snap.documents) || snap.documents.length === 0) {
      throw new Error('DOMSnapshot returned no documents.');
    }
    if (!Array.isArray(snap.strings)) {
      throw new Error('DOMSnapshot returned no string table; every name/value would be unresolvable.');
    }

    // Only the main frame is decoded. Boxes inside an iframe are expressed in
    // that frame's own coordinate space, so merging them would silently corrupt
    // the geometry. See README.md.
    const doc = snap.documents[0];
    if (snap.documents.length > 1) {
      notes.push(`${snap.documents.length - 1} sub-document(s) (iframes) present in the snapshot and NOT included`);
    }
    if (doc.scrollOffsetX !== 0 || doc.scrollOffsetY !== 0) {
      notes.push(`document was scrolled at capture time (${doc.scrollOffsetX}, ${doc.scrollOffsetY}); bounds are document-absolute`);
    }

    const decoded = decodeDocument(doc, snap.strings);
    if (decoded.problems.missingBounds > 0) {
      notes.push(`${decoded.problems.missingBounds} layout entr(ies) had unusable bounds and were dropped`);
    }
    if (decoded.problems.missingPaintOrder > 0) {
      notes.push(`${decoded.problems.missingPaintOrder} layout entr(ies) had no paint order and were dropped`);
    }
    if (decoded.problems.missingPosition > 0) {
      notes.push(`${decoded.problems.missingPosition} retained-candidate node(s) reported no computed 'position'; recorded as null, not defaulted`);
    }

    const retainedAll = applyRetentionFilter(decoded.candidates);
    // El recorte al area visible va ANTES de asignar parentId, o un parentId
    // quedaria apuntando a un ancestro que ya no esta en el archivo.
    const retained = retainedAll.filter((c) => intersectViewport(c.bounds, viewport) !== null);
    const offscreenDropped = retainedAll.length - retained.length;
    assignParentIds(retained, decoded.candidates);
    assignInk(decoded.candidates);
    const records = retained.map((r) => toRecord(r, viewport)).sort((a, b) => a.id - b.id);

    const boundaryCounts = { visible: 0, invisible: 0, undecided: 0, withInk: 0, withoutInk: 0 };
    for (const r of records) {
      const v = r.visibleBoundary ? r.visibleBoundary.visible : null;
      if (v === true) boundaryCounts.visible++;
      else if (v === false) boundaryCounts.invisible++;
      else boundaryCounts.undecided++;
      if (r.ink) boundaryCounts.withInk++; else boundaryCounts.withoutInk++;
    }
    if (decoded.textBoxCount === 0) {
      notes.push('documents[0].textBoxes was empty: no ink box could be computed for any node');
    }

    // --- wireframe ---------------------------------------------------------
    const svg = buildWireframeSVG(retained, viewport, { perceptual });
    const wireframeBuf = await renderWireframePNG(context, svg, viewport);

    // --- meta --------------------------------------------------------------
    const userAgent = await page.evaluate(() => navigator.userAgent);
    const meta = {
      url,
      finalUrl: page.url(),
      httpStatus: response.status(),
      capturedAt: new Date().toISOString(),
      viewport: { width: viewport.width, height: viewport.height, deviceScaleFactor: DEVICE_SCALE_FACTOR },
      userAgent,
      chromiumVersion: browser.version(),
      sha256: {
        screenshot: sha256(screenshotBuf),
        wireframe: sha256(wireframeBuf),
      },
      nodes: {
        retained: records.length,
        totalLayoutNodes: decoded.layoutNodeCount,
        totalDomNodes: decoded.domNodeCount,
        offscreenDropped,
        textBoxes: decoded.textBoxCount,
        visibleBoundary: boundaryCounts.visible,
        noVisibleBoundary: boundaryCounts.invisible,
        boundaryUndecided: boundaryCounts.undecided,
        withInk: boundaryCounts.withInk,
        withoutInk: boundaryCounts.withoutInk,
      },
      wireframeMode: perceptual ? 'perceptual' : 'every-layout-box',
      pageTitle,
      navAttempts,
      consent,
      sanity: (() => {
        const razones = [];
        if (response && response.status() !== 200) razones.push(`HTTP ${response.status()}`);
        if (consent && consent.overlayRestante) razones.push();
        if (consent && consent.overlayRestante) {
          razones.push(`capa sin cerrar sobre el ${(consent.overlayRestante.mayorFraccion * 100).toFixed(0)}% del viewport`);
        }
        if (blockSignals.length) razones.push(`pagina de bloqueo: ${blockSignals.join(", ")}`);
        if (records.length < MIN_RETAINED_NODES) razones.push(`solo ${records.length} nodos retenidos (minimo esperado ${MIN_RETAINED_NODES})`);
        return { ok: razones.length === 0, razones };
      })(),
      notes,
    };

    // --- write -------------------------------------------------------------
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, 'screenshot.png'), screenshotBuf);
    fs.writeFileSync(path.join(out, 'wireframe.png'), wireframeBuf);
    fs.writeFileSync(path.join(out, 'nodes.json'), JSON.stringify(records, null, 2));
    fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify(meta, null, 2));

    log(`captured ${url} -> ${out}`);
    if (records.length < MIN_RETAINED_NODES) {
      log(`  AVISO: solo ${records.length} nodos retenidos. Revisar: una pagina asi normalmente no cargo.`);
    }
    log(`  retained ${records.length} / ${decoded.layoutNodeCount} layout nodes (${decoded.domNodeCount} DOM nodes)`);
    for (const n of notes) log(`  note: ${n}`);

    return { meta, records };
  } finally {
    await context.close().catch(() => {});
    if (ownBrowser) await ownBrowser.close().catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`error: ${err.message}\n\n${USAGE}`);
    process.exit(1);
  }

  if (opts.help || !opts.url) {
    console.error(USAGE);
    process.exit(opts.help ? 0 : 1);
  }
  if (!opts.out) {
    console.error('error: --out <dir> is required\n\n' + USAGE);
    process.exit(1);
  }

  try {
    await capturePage({ ...opts, log: (m) => console.log(m) });
  } catch (err) {
    console.error(`capture failed: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = {
  capturePage,
  launchOptions,
  parseArgs,
  applyRetentionFilter,
  decodeDocument,
  buildWireframeSVG,
  DEFAULT_VIEWPORT,
};
