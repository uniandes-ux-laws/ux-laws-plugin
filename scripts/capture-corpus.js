#!/usr/bin/env node
/**
 * capture-corpus.js — captura todas las páginas del manifiesto, una por una.
 *
 *   node scripts/capture-corpus.js corpus/corpus-v1.csv --out captures
 *   node scripts/capture-corpus.js corpus/corpus-v1.csv --out captures --only H01,G02
 *
 * Cada página va en su propia carpeta, nombrada por el id del manifiesto. Una
 * página que falla NO detiene la corrida: se registra en el resumen con su error
 * y se sigue. Un corpus de treinta páginas donde la número 4 tumba las
 * veintiséis restantes es una tarde perdida.
 *
 * Al final escribe captures/_resumen.json con una fila por página: id, url,
 * estado, hashes, conteos de nodos y las notas que la captura haya dejado. Ese
 * archivo es lo que se lee para decidir qué páginas hay que revisar a mano.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { capturePage, launchOptions } = require('../capture/capture.js');
const { revisarDirectorio } = require('../capture/capture-check');

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
  const head = lines[0].split(',').map((h) => h.trim());
  const iId = head.indexOf('id'), iUrl = head.indexOf('url');
  if (iId < 0 || iUrl < 0) throw new Error("el manifiesto debe tener columnas 'id' y 'url'");
  return lines.slice(1).map((l) => {
    const c = l.split(',');
    return { id: c[iId].trim(), url: c[iUrl].trim(), stratum: (c[head.indexOf('stratum')] || '').trim() };
  }).filter((r) => r.id && r.url);
}

(async () => {
  const args = process.argv.slice(2);
  const manifest = args.find((a) => !a.startsWith('--'));
  const outRoot = args.includes('--out') ? args[args.indexOf('--out') + 1] : 'captures';
  const only = args.includes('--only') ? new Set(args[args.indexOf('--only') + 1].split(',')) : null;
  if (!manifest) { console.error('uso: node scripts/capture-corpus.js <manifiesto.csv> --out <dir>'); process.exit(1); }

  let rows = parseCsv(fs.readFileSync(manifest, 'utf8'));
  if (only) rows = rows.filter((r) => only.has(r.id));
  console.log(`${rows.length} página(s) por capturar -> ${outRoot}/\n`);

  fs.mkdirSync(outRoot, { recursive: true });
  const browser = await chromium.launch(launchOptions());
  const summary = [];

  for (const [i, row] of rows.entries()) {
    const out = path.join(outRoot, row.id);
    process.stdout.write(`[${String(i + 1).padStart(2)}/${rows.length}] ${row.id.padEnd(4)} ${row.url} ... `);
    const t0 = Date.now();
    try {
      await capturePage({ url: row.url, out, browser, timeout: 120000, log: () => {} });
      const meta = JSON.parse(fs.readFileSync(path.join(out, 'meta.json'), 'utf8'));
      const revision = revisarDirectorio(out);
      summary.push({
        id: row.id, stratum: row.stratum, url: row.url, ok: true,
        httpStatus: meta.httpStatus, capturedAt: meta.capturedAt,
        sha256: meta.sha256, nodes: meta.nodes, notes: meta.notes, sanity: meta.sanity, consent: meta.consent, revision, userAgent: meta.userAgent,
        seconds: +((Date.now() - t0) / 1000).toFixed(1),
      });
      const flag = revision.advertencias.length ? '  <-- REVISAR: ' + revision.advertencias.join('; ') : '';
      console.log(`ok  ${meta.nodes.retained} nodos, ${((Date.now() - t0) / 1000).toFixed(1)}s` + flag);
    } catch (err) {
      summary.push({ id: row.id, stratum: row.stratum, url: row.url, ok: false, error: err.message });
      console.log(`FALLA  ${err.message.split('\n')[0]}`);
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(outRoot, '_resumen.json'), JSON.stringify(summary, null, 2) + '\n');

  const ok = summary.filter((s) => s.ok);
  const conNotas = ok.filter((s) => s.notes && s.notes.length);
  const sospechosas = ok.filter(s => s.revision.estado !== 'sin_alertas_automaticas');
  console.log(`\n${ok.length}/${summary.length} capturadas`);
  if (ok.length < summary.length) {
    console.log('fallaron: ' + summary.filter((s) => !s.ok).map((s) => s.id).join(', '));
  }
  console.log(`${conNotas.length} con notas`);
  if (sospechosas.length) {
    console.log(`\n${sospechosas.length} capturas requieren revisión antes de incluirlas en el corpus:`);
    for (const s2 of sospechosas) console.log(`  ${s2.id}  ${s2.url}  ->  ${s2.revision.advertencias.join('; ')}`);
  } else {
    console.log('sin alertas automáticas; revisar también las imágenes');
  }
  console.log(`resumen -> ${path.join(outRoot, '_resumen.json')}`);
})().catch((e) => { console.error('FALLA GENERAL:', e.message); process.exit(1); });
