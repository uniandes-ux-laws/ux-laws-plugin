'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { test } = require('node:test');
const { chromium } = require('playwright');
const { capturePage, launchOptions } = require('./capture');
const { medirCaptura } = require('../measure/measure-page');

test('una captura real conserva atributos de estado y normaliza controles de G2/G7', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-controls-capture-'));
  const browser = await chromium.launch(launchOptions());
  try {
    const { records, meta } = await capturePage({
      url: pathToFileURL(path.join(__dirname, 'fixtures/controls.html')).href,
      out: dir, browser, dismissConsent: false,
    });
    const porNombre = new Map(records.map(n => [n.attributes.id, n]));
    assert.equal(meta.interactionAttributesVersion, '1.0.0');
    assert.ok(Object.hasOwn(porNombre.get('disabled').attributes, 'disabled'));
    assert.equal(porNombre.get('aria-disabled').attributes['aria-disabled'], 'true');
    assert.ok(Object.hasOwn(porNombre.get('inert').attributes, 'inert'));
    assert.equal(porNombre.get('label').attributes.for, 'field');
    const m = medirCaptura(dir);
    const objetivos = new Set(m.inventario_accionables.objetivos.map(n => n.id));
    for (const nombre of ['one', 'two', 'exp_600_20_100_50', 'role', 'custom', 'field', 'legend-button']) {
      assert.ok(objetivos.has(porNombre.get(nombre).id), nombre + ': objetivo ausente');
    }
    for (const nombre of ['wrapper', 'icon', 'disabled', 'aria-disabled', 'inert-child', 'fieldset-button']) {
      assert.ok(!objetivos.has(porNombre.get(nombre).id), nombre + ': objetivo espurio');
    }
    assert.equal(m.g7.g7_N_obj, objetivos.size);
    assert.equal(m.inventario_accionables.atributos_estado_registrados, true);
    assert.equal(m.g2.g2_inventario_ambiguo, true);
  } finally {
    await browser.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
