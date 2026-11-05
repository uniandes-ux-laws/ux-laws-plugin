'use strict';
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs'), os = require('os'), path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');
const { medirOverlay, dismissInterstitials } = require('./dismiss');
const { capturePage, launchOptions } = require('./capture');
let browser;
before(async () => { browser = await chromium.launch(launchOptions()); });
after(async () => { if (browser) await browser.close(); });

const base = '<style>body{margin:0}main{padding:20px}</style><main>' +
  Array.from({length:100}, (_,i) => '<span>Contenido ' + i + ' </span>').join('') + '</main>';
const estilo = 'position:fixed;left:25px;top:720px;width:220px;height:110px;background:white;z-index:10;border:1px solid';

for (const atributos of ['role="dialog"', 'role="alertdialog"', 'aria-modal="true"']) {
  test('detecta un diálogo pequeño con ' + atributos + ' fuera de los puntos centrales', async () => {
    const page = await browser.newPage({ viewport: {width:1440,height:900} });
    try {
      await page.setContent(base + '<aside ' + atributos + ' style="' + estilo + '">Aviso importante</aside>');
      const revision = await medirOverlay(page);
      assert.equal(revision.hayInterstitial, true);
      assert(revision.mayorFraccion < 0.5);
    } finally { await page.close(); }
  });
}

test('no confunde un encabezado, un chat o un contenedor transparente con un aviso', async () => {
  const page = await browser.newPage();
  try {
    await page.setContent(base +
      '<header style="position:fixed;top:0;height:60px;width:100%;background:white">Navegación</header>' +
      '<aside style="position:fixed;bottom:0;right:0;width:80px;height:80px;background:blue">Chat</aside>' +
      '<div style="position:fixed;inset:0;pointer-events:none"></div>');
    assert.equal((await medirOverlay(page)).hayInterstitial, false);
  } finally { await page.close(); }
});

test('no cuenta diálogos ocultos, fuera del viewport o dentro de un padre invisible', async () => {
  const page = await browser.newPage();
  try {
    await page.setContent(base +
      '<aside role="dialog" style="display:none">Oculto</aside>' +
      '<aside role="dialog" style="position:fixed;left:-900px;width:200px;height:100px">Fuera</aside>' +
      '<div style="opacity:0"><aside role="dialog" style="position:fixed;inset:0">Invisible</aside></div>');
    assert.equal((await medirOverlay(page)).hayInterstitial, false);
  } finally { await page.close(); }
});

test('distingue un dialog nativo abierto de uno cerrado', async () => {
  const page = await browser.newPage();
  try {
    await page.setContent(base + '<dialog open>Aviso importante</dialog>');
    assert.equal((await medirOverlay(page)).hayInterstitial,true);
    await page.locator('dialog').evaluate(el => el.removeAttribute('open'));
    assert.equal((await medirOverlay(page)).hayInterstitial,false);
  } finally { await page.close(); }
});

test('una superficie visible no deja de tapar por tener pointer-events none', async () => {
  const page = await browser.newPage();
  try {
    await page.setContent(base + '<aside style="position:fixed;inset:0;background:white;pointer-events:none">Aviso</aside>');
    assert.equal((await medirOverlay(page)).hayInterstitial, true);
  } finally { await page.close(); }
});

test('detecta una franja de cookies y conserva el catálogo para cerrarla', async () => {
  const page = await browser.newPage({viewport:{width:1440,height:900}});
  try {
    await page.setContent(base + '<aside style="position:fixed;bottom:0;width:100%;height:100px;background:white">Cookies' +
      '<button onclick="this.parentElement.remove()">Aceptar</button></aside>');
    assert.equal((await medirOverlay(page)).hayInterstitial, true);
    const registro = await dismissInterstitials(page);
    assert.equal(registro.catalogVersion, '2026-09-10');
    assert.equal(registro.limpio, true);
    assert.equal(registro.rondas.length, 1);
  } finally { await page.close(); }
});

test('cuenta marcos visibles cuyo contenido no se revisó', async () => {
  const page = await browser.newPage();
  try {
    await page.setContent(base + '<iframe srcdoc="<p>Aviso</p>" style="width:300px;height:120px"></iframe>');
    assert.equal((await medirOverlay(page)).marcosSinRevisar, 1);
  } finally { await page.close(); }
});

test('capturar conserva capas no cerradas, errores y descarte desactivado como advertencias', async t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-overlay-capture-'));
  t.after(() => fs.rmSync(dir, {recursive:true,force:true}));
  for (const caso of ['sin_control', 'sin_descarte', 'error']) {
    await t.test(caso, async () => {
      const html = path.join(dir, caso + '.html'), out = path.join(dir, caso);
      const extra = '<aside role="alertdialog" style="' + estilo + '">Aviso<button>Personalizar opciones</button></aside>' +
        (caso === 'error' ? '<script>document.elementFromPoint=()=>{throw Error("Error de prueba")}</script>' : '');
      fs.writeFileSync(html, base + extra);
      const {meta} = await capturePage({url:pathToFileURL(html).href,out,browser,dismissConsent:caso !== 'sin_descarte'});
      assert.equal(meta.sanity.ok, false);
      assert.notEqual(meta.consent.limpio, true);
      assert(fs.existsSync(path.join(out, 'screenshot.png')));
      if (caso === 'error') { assert(meta.consent.error); assert.equal(meta.revisionCapas.errores.length, 2); }
      else assert.equal(meta.revisionCapas.despues.hayInterstitial, true);
    });
  }
});

test('un aviso aparecido entre screenshot y snapshot queda marcado', async t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-overlay-tarde-'));
  t.after(() => fs.rmSync(dir, {recursive:true,force:true}));
  const html = path.join(dir, 'pagina.html'); fs.writeFileSync(html, base);
  const navegador = { version: () => browser.version(), newContext: async opciones => {
    const context = await browser.newContext(opciones), crearPagina = context.newPage.bind(context);
    let primera = true;
    context.newPage = async () => {
      const page = await crearPagina();
      if (primera) {
        primera = false;
        const screenshot = page.screenshot.bind(page);
        page.screenshot = async opciones => {
          const imagen = await screenshot(opciones);
          await page.evaluate(() => {
            const aviso = document.createElement('aside'); aviso.setAttribute('role','alertdialog');
            aviso.style.cssText = 'position:fixed;inset:0;background:white'; aviso.textContent = 'Aviso tardío';
            document.body.append(aviso);
          });
          return imagen;
        };
      }
      return page;
    };
    return context;
  }};
  const {meta} = await capturePage({url:pathToFileURL(html).href,out:path.join(dir,'salida'),browser:navegador});
  assert.equal(meta.revisionCapas.antes.hayInterstitial, false);
  assert.equal(meta.revisionCapas.despues.hayInterstitial, true);
  assert.equal(meta.sanity.ok, false);
  assert.equal(meta.consent.limpio, false);
});
