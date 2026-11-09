#!/usr/bin/env node
/**
 * diagnose-grouping.js — measures the defect Camilo pointed at.
 *
 * A layout box is not what the eye sees. A <div> with no background and no
 * border that stretches across the viewport is invisible; what the eye sees is
 * its text. Drawing that div as an outlined rectangle puts a boundary on the
 * wireframe that is not on the screen, and every proximity measurement taken
 * between such rectangles is a measurement of the CSS, not of the layout a
 * person perceives.
 *
 * This script measures the size of that error on one page, by computing the
 * same grouping ratio twice: once over layout boxes, once over ink boxes.
 *
 *   ink box = union of the post-layout text boxes the node owns
 *             (DOMSnapshot documents[0].textBoxes, indexed by layoutIndex)
 *             plus the node's own box when the node paints something visible
 *             (background-color with alpha > 0, a border with width > 0 and a
 *             visible colour, or a replaced element).
 *
 * Usage:  node capture/diagnose-grouping.js [file-or-url ...]
 */

const path = require('path');
const { chromium } = require('playwright');

const STYLES = [
  'background-color',
  'background-image',
  'outline-width', 'outline-style',
  'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
  'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
  'border-top-color',
  'box-shadow',
  'visibility',
  'opacity',
];

const REPLACED = new Set(['IMG', 'SVG', 'VIDEO', 'CANVAS', 'INPUT', 'TEXTAREA', 'SELECT', 'IFRAME', 'BUTTON']);
const NODE_TYPE_TEXT = 3;

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

/** alpha of a computed colour string; null when unreadable. */
function alphaOf(color) {
  if (typeof color !== 'string') return null;
  const s = color.trim();
  if (s === 'transparent') return 0;
  let m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1].split(/[\s,\/]+/).filter(Boolean);
    if (parts.length >= 4) {
      const a = Number.parseFloat(parts[3]);
      return Number.isFinite(a) ? a : null;
    }
    return 1;
  }
  return null;
}

/** true when this node paints a boundary a person can see. */
function paintsAVisibleBoundary(style, nodeName) {
  if (REPLACED.has(String(nodeName).toUpperCase())) return { visible: true, why: 'replaced element' };

  const bg = alphaOf(style['background-color']);
  if (bg !== null && bg > 0) return { visible: true, why: `background-color alpha ${bg}` };

  const sides = ['top', 'right', 'bottom', 'left'];
  for (const s of sides) {
    const w = Number.parseFloat(style[`border-${s}-width`]);
    const st = style[`border-${s}-style`];
    if (Number.isFinite(w) && w > 0 && st && st !== 'none' && st !== 'hidden') {
      return { visible: true, why: `border-${s} ${w}px ${st}` };
    }
  }
  const bi = style['background-image'];
  if (bi && bi !== 'none') return { visible: true, why: 'background-image' };

  const ow = Number.parseFloat(style['outline-width']);
  const os = style['outline-style'];
  if (Number.isFinite(ow) && ow > 0 && os && os !== 'none' && os !== 'hidden') {
    return { visible: true, why: `outline ${ow}px ${os}` };
  }

  const sh = style['box-shadow'];
  if (sh && sh !== 'none') return { visible: true, why: 'box-shadow' };

  return { visible: false, why: 'no background, no border, no shadow' };
}

function unionBox(a, b) {
  if (!a) return b;
  if (!b) return a;
  const x1 = Math.min(a.x, b.x), y1 = Math.min(a.y, b.y);
  const x2 = Math.max(a.x + a.w, b.x + b.w), y2 = Math.max(a.y + a.h, b.y + b.h);
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}

/** horizontal gap between two boxes; 0 when they touch or overlap. */
function gapX(a, b) {
  const left = a.x <= b.x ? a : b;
  const right = a.x <= b.x ? b : a;
  return Math.max(0, right.x - (left.x + left.w));
}

async function analyse(target) {
  const browser = await chromium.launch(launchOptions());
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const url = /^https?:/i.test(target) ? target : 'file://' + path.resolve(target);
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(200);

  const cdp = await context.newCDPSession(page);
  const snap = await cdp.send('DOMSnapshot.captureSnapshot', {
    computedStyles: STYLES,
    includePaintOrder: true,
    includeDOMRects: true,
  });

  const S = snap.strings;
  const doc = snap.documents[0];
  const L = doc.layout;
  const N = doc.nodes;
  const TB = doc.textBoxes;

  if (!TB || !Array.isArray(TB.layoutIndex)) {
    throw new Error('documents[0].textBoxes missing — this build of the protocol does not return post-layout text boxes.');
  }

  // ink contributed by text: map each text box onto the layout node that owns it,
  // then onto that node's nearest element ancestor.
  const inkByLayout = new Map();
  for (let t = 0; t < TB.layoutIndex.length; t++) {
    const li = TB.layoutIndex[t];
    const b = TB.bounds[t];
    if (!Array.isArray(b) || b.length < 4) continue;
    const box = { x: b[0], y: b[1], w: b[2], h: b[3] };
    inkByLayout.set(li, unionBox(inkByLayout.get(li), box));
  }

  const styleAt = (li, name) => {
    const i = STYLES.indexOf(name);
    const idxs = L.styles && L.styles[li];
    if (!Array.isArray(idxs) || i < 0 || i >= idxs.length) return null;
    const v = S[idxs[i]];
    return typeof v === 'string' && v.length ? v : null;
  };

  // element records
  const byNode = new Map();  // nodeIndex -> record
  const layoutOfNode = new Map();
  for (let li = 0; li < L.nodeIndex.length; li++) {
    const ni = L.nodeIndex[li];
    const b = L.bounds[li];
    if (!Array.isArray(b) || b.length < 4) continue;
    layoutOfNode.set(ni, li);
    const style = {};
    for (const s of STYLES) style[s] = styleAt(li, s);
    const nodeName = S[N.nodeName[ni]];
    const isText = N.nodeType && N.nodeType[ni] === NODE_TYPE_TEXT;
    byNode.set(ni, {
      nodeIndex: ni, layoutIndex: li, nodeName, isText,
      box: { x: b[0], y: b[1], w: b[2], h: b[3] },
      style,
      parent: N.parentIndex ? N.parentIndex[ni] : -1,
      id: readAttr(N.attributes && N.attributes[ni], S, 'id'),
      ink: inkByLayout.get(li) || null,
    });
  }

  // propagate text ink up to element ancestors
  for (const rec of byNode.values()) {
    if (!rec.ink) continue;
    let p = rec.parent;
    let guard = 0;
    while (p >= 0 && guard++ < 200) {
      const anc = byNode.get(p);
      if (anc) anc.inkFromChildren = unionBox(anc.inkFromChildren, rec.ink);
      p = anc ? anc.parent : (N.parentIndex ? N.parentIndex[p] : -1);
    }
  }

  const out = [];
  for (const rec of byNode.values()) {
    if (rec.isText) continue;
    const vis = paintsAVisibleBoundary(rec.style, rec.nodeName);
    const ink = vis.visible ? rec.box : (rec.ink || rec.inkFromChildren || null);
    out.push({
      id: rec.id, nodeName: rec.nodeName, box: rec.box, ink, visible: vis.visible, why: vis.why,
      inflationW: ink ? +(rec.box.w - ink.w).toFixed(1) : null,
      inflationH: ink ? +(rec.box.h - ink.h).toFixed(1) : null,
    });
  }

  await browser.close();
  return out;
}

function readAttr(attrs, S, want) {
  if (!Array.isArray(attrs)) return null;
  for (let i = 0; i + 1 < attrs.length; i += 2) {
    if (S[attrs[i]] === want) return S[attrs[i + 1]];
  }
  return null;
}

function ratio(gaps) {
  const nz = gaps.filter((g) => g > 0);
  if (!nz.length) return null;
  return +(Math.max(...gaps) / Math.min(...nz)).toFixed(2);
}

(async () => {
  const targets = process.argv.slice(2);
  if (!targets.length) targets.push(path.join(__dirname, 'pages', 'inkgap.html'));

  for (const t of targets) {
    console.log('\n=== ' + t + ' ===');
    const recs = await analyse(t);

    const named = recs.filter((r) => r.id).sort((a, b) => a.box.x - b.box.x);
    console.log('\nelement    visible boundary?   layout box            ink box               inflation');
    for (const r of named) {
      const fmt = (b) => (b ? `${b.x.toFixed(0)},${b.y.toFixed(0)} ${b.w.toFixed(0)}x${b.h.toFixed(0)}` : '—');
      console.log(
        `#${(r.id || '').padEnd(9)} ${(r.visible ? 'yes' : 'no ').padEnd(4)} ${r.why.slice(0, 22).padEnd(24)}` +
        `${fmt(r.box).padEnd(22)}${fmt(r.ink).padEnd(22)}${r.inflationW ?? '—'} px wide`
      );
    }

    // aggregate: how much of the drawn wireframe is boundary the eye cannot see
    const drawable = recs.filter((r) => r.box.w > 0 && r.box.h > 0);
    const invisible = drawable.filter((r) => !r.visible);
    const withInk = invisible.filter((r) => r.ink);
    const infl = withInk.map((r) => r.inflationW).sort((a, b) => a - b);
    const pct = (n, d) => (d ? ((100 * n) / d).toFixed(1) : '0.0');
    const q = (a, p) => (a.length ? a[Math.min(a.length - 1, Math.floor(p * a.length))] : null);
    console.log('\nboxes with a layout box: ' + drawable.length);
    console.log('  of those, no visible boundary (background/border/shadow/replaced): ' +
      invisible.length + '  (' + pct(invisible.length, drawable.length) + '%)');
    console.log('  of those invisible ones, carrying ink: ' + withInk.length);
    if (infl.length) {
      console.log('  horizontal inflation (layout width - ink width), px: ' +
        'median ' + q(infl, 0.5) + ' | p75 ' + q(infl, 0.75) + ' | p90 ' + q(infl, 0.9) + ' | max ' + infl[infl.length - 1]);
      console.log('  invisible boxes inflated by more than 50 px: ' +
        infl.filter((v) => v > 50).length + '  (' + pct(infl.filter((v) => v > 50).length, infl.length) + '% of them)');
    }

    const wraps = named.filter((r) => /^w\d$/.test(r.id || ''));
    if (wraps.length >= 3) {
      const boxGaps = [], inkGaps = [];
      for (let i = 1; i < wraps.length; i++) {
        boxGaps.push(gapX(wraps[i - 1].box, wraps[i].box));
        if (wraps[i - 1].ink && wraps[i].ink) inkGaps.push(gapX(wraps[i - 1].ink, wraps[i].ink));
      }
      console.log('\ngrouping ratio r = largest gap / smallest non-zero gap   (rubric G1 threshold: r >= 1.5)');
      console.log('  over layout boxes: gaps ' + JSON.stringify(boxGaps) + '  ->  r = ' + (ratio(boxGaps) ?? 'undefined (every gap is 0)'));
      console.log('  over ink boxes:    gaps ' + JSON.stringify(inkGaps) + '  ->  r = ' + (ratio(inkGaps) ?? 'undefined'));
    }
  }
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
