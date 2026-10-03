'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { test } = require('node:test');
const { PNG } = require('pngjs');
const { chromium } = require('playwright');
const { capturePage, launchOptions, DEFAULT_VIEWPORT } = require('./capture');

const imageIds = [
  'exp_40_60_120_100', 'exp_200_60_120_100', 'exp_360_60_120_100',
  'exp_520_60_120_100', 'exp_680_60_120_100', 'exp_840_60_120_100',
  'exp_1000_60_120_100', 'exp_1160_60_120_100',
  'exp_40_260_120_100', 'exp_200_260_120_100', 'exp_360_260_120_100',
  'exp_520_260_120_100', 'exp_680_260_120_100',
  'exp_40_460_120_100', 'exp_200_460_120_100',
  'exp_-40_640_160_100', 'exp_1380_640_120_100',
];
const plainIds = ['exp_840_260_120_100', 'exp_1000_260_120_100', 'exp_1160_260_120_100'];

function darkAt(png, x, y) {
  const offset = (y * png.width + x) * 4;
  return png.data[offset] < 128 && png.data[offset + 1] < 128 && png.data[offset + 2] < 128;
}

function assertDiagonal(png, box, fraction, descending, label) {
  const x = Math.round(box.x + fraction * box.w);
  const y = Math.round(box.y + (descending ? fraction : 1 - fraction) * box.h);
  if (x < 0 || y < 0 || x >= png.width || y >= png.height) return;
  // Rasterisation can place a one-pixel stroke beside the rounded CSS coordinate.
  let found = false;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (x + dx >= 0 && y + dy >= 0 && x + dx < png.width && y + dy < png.height) {
        found ||= darkAt(png, x + dx, y + dy);
      }
    }
  }
  assert.ok(found, `${label}: missing ${descending ? 'descending' : 'ascending'} diagonal at (${x}, ${y})`);
}

test('wireframes distinguish images with X markers in both rendering modes', async (t) => {
  const outRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-image-markers-'));
  const browser = await chromium.launch(launchOptions());
  try {
    for (const perceptual of [true, false]) {
      await t.test(perceptual ? 'perceptual' : 'every-layout-box', async () => {
        const out = path.join(outRoot, String(perceptual));
        const { records, meta } = await capturePage({
          url: pathToFileURL(path.join(__dirname, 'fixtures/images.html')).href,
          out, browser, perceptual, dismissConsent: false,
        });
        const png = PNG.sync.read(fs.readFileSync(path.join(out, 'wireframe.png')));
        assert.equal(png.width, DEFAULT_VIEWPORT.width);
        assert.equal(png.height, DEFAULT_VIEWPORT.height);
        assert.equal(meta.wireframeImageMarker, 'diagonal-cross');
        const byId = new Map(records.map((r) => [r.attributes.id, r]));
        for (const id of imageIds) {
          const record = byId.get(id);
          assert.ok(record, `${id}: image missing from capture`);
          assert.equal(record.isImage, true, `${id}: not identified as an image`);
          for (const fraction of [0.25, 0.5, 0.75]) {
            assertDiagonal(png, record.bounds, fraction, true, id);
            assertDiagonal(png, record.bounds, fraction, false, id);
          }
        }
        for (const id of plainIds) {
          const record = byId.get(id);
          assert.ok(record, `${id}: non-image missing from capture`);
          assert.equal(record.isImage, false, `${id}: incorrectly identified as an image`);
          const { x, y, w, h } = record.bounds;
          assert.equal(darkAt(png, x + w / 2, y + h / 2), false, `${id}: spurious X`);
        }
        // SVG internals are abstracted as one image, including nested SVGs and text.
        assert.equal(darkAt(png, 540, 100), false, 'SVG text leaked into the placeholder');
        assert.equal(darkAt(png, 545, 135), false, 'nested SVG added its own X');
        assert.equal(byId.has('hidden-image'), false, 'hidden image was retained');
        assert.equal(darkAt(png, 580, 510), false, 'hidden image was drawn');
        // Text over a CSS background remains separate content in the wireframe.
        assert.ok(records.some((r) => r.nodeName === '#text' && r.bounds.x >= 44 && r.bounds.x < 160 && r.bounds.y >= 464 && r.bounds.y < 490));
        assert.ok([...Array(12)].some((_, dy) => darkAt(png, 50, 467 + dy)), 'background overlay text was lost');
      });
    }
  } finally {
    await browser.close();
    fs.rmSync(outRoot, { recursive: true, force: true });
  }
});
