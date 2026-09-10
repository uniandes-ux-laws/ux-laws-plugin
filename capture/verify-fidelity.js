#!/usr/bin/env node
'use strict';

/**
 * verify-fidelity.js — does the wireframe channel reproduce the real geometry?
 *
 * The wireframe is only useful to the structural Laws of UX if the boxes it
 * draws are the boxes the browser actually laid out. This script checks that
 * claim against fixtures whose geometry is known by construction rather than by
 * measurement.
 *
 * Contract with a fixture: every element whose box is being asserted carries
 *
 *     id="exp_<x>_<y>_<w>_<h>"      (CSS px, document-absolute)
 *
 * The check is two-directional:
 *   - every expectation declared in the fixture HTML must appear in nodes.json
 *     (a node that got filtered out or never laid out is a FAILURE, not a skip);
 *   - every retained node in nodes.json that carries an exp_ id must match its
 *     declared box within the tolerance.
 *
 * Retained nodes with no expectation (html, body, #document, text nodes) are
 * counted and reported, never silently ignored.
 *
 * The tolerance is a CLI flag, parsed and printed BEFORE any measurement is
 * taken. Choosing a threshold after seeing the numbers is not a test.
 *
 * Usage:
 *   node verify-fidelity.js [--tolerance 1] [--out <dir>] [--keep]
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { chromium } = require('playwright');
const { capturePage, launchOptions, DEFAULT_VIEWPORT } = require('./capture');

const FIXTURE_DIR = path.join(__dirname, 'fixtures');
const EXP_RE = /^exp_(-?\d+)_(-?\d+)_(\d+)_(\d+)$/;
// `ink_<x>_<y>_<w>_<h>` asserts the INK box — the extent a person sees — rather
// than the layout box. A wrapper that stretches across the viewport but shows
// only its text has a correct layout box and a wrong drawn box, and only this
// assertion catches that. See docs/adr-01-caja-de-tinta.md.
const INK_RE = /^ink_(-?\d+)_(-?\d+)_(\d+)_(\d+)$/;

const USAGE = `
verify-fidelity.js — check wireframe geometry against fixtures with known boxes

  node verify-fidelity.js [options]

  --tolerance <px>   max allowed deviation in CSS px   [default 1]
  --out <dir>        where to write the captures       [default a temp dir]
  --keep             keep the captures on disk
`.trim();

function parseArgs(argv) {
  const opts = { tolerance: 1, out: null, keep: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--tolerance') {
      const raw = argv[++i];
      const n = Number(raw);
      if (!Number.isFinite(n) || n < 0) throw new Error(`--tolerance expects a non-negative number of CSS px, got: ${raw}`);
      opts.tolerance = n;
    } else if (a === '--out') {
      opts.out = argv[++i];
    } else if (a === '--keep') {
      opts.keep = true;
    } else if (a === '--help' || a === '-h') {
      opts.help = true;
    } else {
      throw new Error(`unknown argument: ${a}`);
    }
  }
  return opts;
}

/**
 * Pull every `id="exp_..."` out of the fixture source, in document order.
 * HTML comments are stripped first: the fixtures document the id convention in
 * a comment, and that prose must not be read as an assertion.
 */
function declaredExpectations(html) {
  const source = html.replace(/<!--[\s\S]*?-->/g, '');
  const out = [];
  const re = /\bid\s*=\s*"((?:exp|ink)_[^"]*)"/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    const id = m[1];
    const kind = id.startsWith('ink_') ? 'ink' : 'layout';
    const g = (kind === 'ink' ? INK_RE : EXP_RE).exec(id);
    if (!g) throw new Error(`fixture declares a malformed expectation id: ${id}`);
    out.push({ id, kind, x: Number(g[1]), y: Number(g[2]), w: Number(g[3]), h: Number(g[4]) });
  }
  return out;
}

/**
 * Compare one capture against one fixture.
 * Deviation for a node is the max absolute error over x, y, w and h — the
 * worst corner, not an average, because an average hides a single bad edge.
 */
function compare(records, expectations) {
  const byExpId = new Map();
  for (const r of records) {
    const id = r.attributes && r.attributes.id;
    if (typeof id === 'string' && (EXP_RE.test(id) || INK_RE.test(id))) byExpId.set(id, r);
  }

  const rows = [];
  const missing = [];

  for (const e of expectations) {
    const rec = byExpId.get(e.id);
    if (!rec) { missing.push(e.id); continue; }
    const b = e.kind === 'ink' ? rec.ink : rec.bounds;
    if (e.kind === 'ink' && !b) {
      throw new Error(
        `nodes.json record ${rec.id} (${e.id}) has no ink box. Either the node shows nothing ` +
        `on screen, or documents[0].textBoxes was empty for this capture.`
      );
    }
    if (!b || ['x', 'y', 'w', 'h'].some((k) => typeof b[k] !== 'number' || !Number.isFinite(b[k]))) {
      throw new Error(`nodes.json record ${rec.id} (${e.id}) has non-numeric ${e.kind} box; refusing to score it`);
    }
    const dev = {
      x: Math.abs(b.x - e.x),
      y: Math.abs(b.y - e.y),
      w: Math.abs(b.w - e.w),
      h: Math.abs(b.h - e.h),
    };
    rows.push({ id: e.id, nodeId: rec.id, expected: e, actual: b, dev, max: Math.max(dev.x, dev.y, dev.w, dev.h) });
  }

  const undeclared = records.filter((r) => {
    const id = r.attributes && r.attributes.id;
    return !(typeof id === 'string' && (EXP_RE.test(id) || INK_RE.test(id)));
  });

  return { rows, missing, undeclared };
}

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`error: ${err.message}\n\n${USAGE}`);
    process.exit(1);
  }
  if (opts.help) { console.log(USAGE); process.exit(0); }

  // Tolerance is fixed here, before a single box is measured.
  const TOLERANCE = opts.tolerance;
  console.log(`tolerance: ${TOLERANCE} CSS px (fixed before measuring)`);
  console.log(`viewport:  ${DEFAULT_VIEWPORT.width}x${DEFAULT_VIEWPORT.height}`);

  const fixtures = fs.readdirSync(FIXTURE_DIR).filter((f) => f.endsWith('.html')).sort();
  if (fixtures.length === 0) {
    console.error(`error: no fixtures found in ${FIXTURE_DIR}`);
    process.exit(1);
  }

  const outRoot = opts.out || fs.mkdtempSync(path.join(os.tmpdir(), 'ux-fidelity-'));
  fs.mkdirSync(outRoot, { recursive: true });

  // Fixtures load over file://, but reuse the same launch options so the
  // fidelity check runs in exactly the browser configuration capture.js uses.
  const browser = await chromium.launch(launchOptions());

  let allPass = true;
  let worstOverall = 0;

  try {
    for (const file of fixtures) {
      const abs = path.join(FIXTURE_DIR, file);
      const html = fs.readFileSync(abs, 'utf8');
      const expectations = declaredExpectations(html);
      const outDir = path.join(outRoot, path.basename(file, '.html'));

      console.log(`\n--- ${file} ---`);
      if (expectations.length === 0) {
        console.log('  FAIL: fixture declares no exp_ ids, so it asserts nothing');
        allPass = false;
        continue;
      }

      let result;
      try {
        result = await capturePage({
          url: 'file://' + abs,
          out: outDir,
          viewport: DEFAULT_VIEWPORT,
          timeout: 15000,
          browser,
        });
      } catch (err) {
        console.log(`  FAIL: capture error: ${err.message}`);
        allPass = false;
        continue;
      }

      const { rows, missing, undeclared } = compare(result.records, expectations);

      let worst = 0;
      for (const r of rows) {
        if (r.max > worst) worst = r.max;
        const verdict = r.max <= TOLERANCE ? 'ok  ' : 'FAIL';
        console.log(
          `  ${verdict} ${r.id.padEnd(24)} node ${String(r.nodeId).padStart(3)}  ` +
          `expected (${r.expected.x},${r.expected.y},${r.expected.w},${r.expected.h})  ` +
          `actual (${r.actual.x},${r.actual.y},${r.actual.w},${r.actual.h})  ` +
          `dev ${r.max.toFixed(3)} px`
        );
        if (r.max > TOLERANCE) allPass = false;
      }

      for (const id of missing) {
        console.log(`  FAIL ${id.padEnd(24)} declared by the fixture but absent from nodes.json (not laid out, or filtered out)`);
        allPass = false;
      }

      if (worst > worstOverall) worstOverall = worst;

      console.log(
        `  checked ${rows.length}/${expectations.length} expectations; ` +
        `${undeclared.length} retained node(s) carried no expectation ` +
        `(${undeclared.map((u) => u.nodeName).join(', ') || 'none'})`
      );
      console.log(
        `  retained ${result.meta.nodes.retained} / ${result.meta.nodes.totalLayoutNodes} layout nodes; ` +
        `MAX DEVIATION ${worst.toFixed(3)} px  =>  ${worst <= TOLERANCE && missing.length === 0 ? 'PASS' : 'FAIL'}`
      );
    }
  } finally {
    await browser.close().catch(() => {});
  }

  console.log(`\n=====================================`);
  console.log(`tolerance         : ${TOLERANCE} CSS px`);
  console.log(`worst deviation   : ${worstOverall.toFixed(3)} CSS px`);
  console.log(`result            : ${allPass ? 'PASS' : 'FAIL'}`);
  console.log(`captures          : ${outRoot}${opts.keep || opts.out ? '' : ' (temp)'}`);

  if (!opts.keep && !opts.out) {
    fs.rmSync(outRoot, { recursive: true, force: true });
  }

  process.exit(allPass ? 0 : 1);
}

if (require.main === module) main();
