#!/usr/bin/env node
/**
 * probe-blocked.js — averigua por qué una página devolvió 403 o 500.
 *
 * Nueve de las treinta páginas del corpus llegaron con muy pocos nodos. El
 * user agent por defecto de un navegador headless dice literalmente
 * "HeadlessChrome", y un WAF lo lee. Este probe captura cada URL dos veces, con
 * ese user agent y con uno de Chrome normal, y compara estado y número de
 * elementos. No cambia nada: solo mide, para poder decidir con evidencia si el
 * protocolo debe fijar un user agent distinto.
 *
 *   node capture/probe-blocked.js
 *   node capture/probe-blocked.js https://otra.pagina/
 */
const { chromium } = require('playwright');
const { launchOptions } = require('./capture.js');

const UA_REAL = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36';

const SOSPECHOSAS = [
  ['G04-reintento', 'https://www.colpensiones.gov.co/'],
  ['cand-salud-1', 'https://www.compensar.com/'],
  ['cand-salud-2', 'https://www.famisanar.com.co/'],
  ['cand-salud-3', 'https://www.aliansalud.com.co/'],
  ['cand-libre-1', 'https://www.wingo.com/'],
  ['cand-libre-2', 'https://www.latamairlines.com/co/es'],
  ['cand-libre-3', 'https://www.despegar.com.co/'],
];

(async () => {
  const extra = process.argv.slice(2).filter((a) => /^https?:/.test(a));
  const list = extra.length ? extra.map((u, i) => ['X' + (i + 1), u]) : SOSPECHOSAS;

  const browser = await chromium.launch(launchOptions());
  console.log('id   variante      estado  elementos  url');
  const veredicto = [];

  for (const [id, url] of list) {
    const fila = { id, url };
    for (const [nombre, ua] of [['por-defecto', null], ['chrome-real', UA_REAL]]) {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        locale: 'es-CO',
        ...(ua ? { userAgent: ua } : {}),
      });
      const page = await ctx.newPage();
      try {
        const r = await page.goto(url, { waitUntil: 'load', timeout: 30000 });
        await page.waitForTimeout(1500);
        const n = await page.evaluate(() => document.querySelectorAll('*').length);
        fila[nombre] = { status: r ? r.status() : null, elems: n };
        console.log(id.padEnd(4), nombre.padEnd(13), String(fila[nombre].status).padStart(5), String(n).padStart(9), ' ', url);
      } catch (e) {
        fila[nombre] = { error: e.message.split('\n')[0].slice(0, 60) };
        console.log(id.padEnd(4), nombre.padEnd(13), '  ERR', ' '.repeat(6), fila[nombre].error);
      }
      await ctx.close();
    }
    veredicto.push(fila);
  }

  await browser.close();

  console.log('\n--- veredicto ---');
  let arreglaUA = 0;
  for (const f of veredicto) {
    const a = f['por-defecto'], b = f['chrome-real'];
    const ok = (x) => x && x.status === 200 && x.elems > 100;
    if (!ok(a) && ok(b)) { console.log(`${f.id}: el user agent lo explica  (${a.status || 'ERR'} -> 200, ${b.elems} elementos)`); arreglaUA++; }
    else if (ok(a) && ok(b)) console.log(`${f.id}: carga en las dos. El problema no era el user agent`);
    else console.log(`${f.id}: sigue sin cargar en las dos  (${a.status || 'ERR'} / ${b.status || 'ERR'})`);
  }
  console.log(`\n${arreglaUA} de ${veredicto.length} se explican por el user agent.`);
  require('fs').writeFileSync('captures/_probe.json', JSON.stringify(veredicto, null, 2) + '\n');
  console.log('detalle -> captures/_probe.json');
})().catch((e) => { console.error('FALLA:', e.message); process.exit(1); });
