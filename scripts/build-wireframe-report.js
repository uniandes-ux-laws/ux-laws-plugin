#!/usr/bin/env node
/**
 * build-wireframe-report.js — el reporte de wireframes.
 *
 * Una pagina HTML con, para cada captura, el screenshot y el wireframe lado a
 * lado a tamano real, sus cuatro metricas y sus notas. Que sea HTML y no
 * diapositivas es deliberado: la unica forma de juzgar cobertura y parsimonia
 * con el ojo es mirar de cerca, que es lo que un asesor va a hacer de todos
 * modos.
 *
 *   node scripts/build-wireframe-report.js captures --out docs/reporte-wireframes.html
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const root = args.find((a) => !a.startsWith('--')) || 'captures';
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : 'docs/reporte-wireframes.html';

const metricas = JSON.parse(fs.readFileSync(path.join(root, '_metricas.json'), 'utf8'));
const resumen = JSON.parse(fs.readFileSync(path.join(root, '_resumen.json'), 'utf8'));
const porId = Object.fromEntries(resumen.map((r) => [r.id, r]));
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const pct = (x) => (x == null ? '—' : (x * 100).toFixed(1) + ' %');
const b64 = (p) => fs.readFileSync(p).toString('base64');

const filas = metricas.map((m) => ({ ...m, meta: porId[m.id] || {} }));
const cov = filas.map((f) => f.coverage).filter((x) => x != null).sort((a, b) => a - b);
const par = filas.map((f) => f.parsimony).filter((x) => x != null).sort((a, b) => a - b);
const mediana = (a) => (a.length ? a[Math.floor(a.length / 2)] : null);

const secciones = filas.map((f) => {
  const dir = path.join(root, f.id);
  const shot = b64(path.join(dir, 'screenshot.png'));
  const wf = b64(path.join(dir, 'wireframe.png'));
  const n = f.meta.nodes || {};
  const notas = (f.meta.notes || []).map((x) => `<li>${esc(x)}</li>`).join('');
  const grandes = (f.largestUnjustified || []).map((u) =>
    `<li><code>${esc(u.nodeName)}</code> ${Math.round(u.bounds.w)}×${Math.round(u.bounds.h)} px en (${Math.round(u.bounds.x)}, ${Math.round(u.bounds.y)}) — ${(u.inkFraction * 100).toFixed(1)} % de tinta dentro</li>`
  ).join('');
  return `
<section id="${esc(f.id)}">
  <header class="ph">
    <h2>${esc(f.id)} <span class="org">${esc(f.meta.url || '')}</span></h2>
    <div class="kpis">
      <div class="kpi ${f.coverage < 0.9 ? 'warn' : ''}"><b>${pct(f.coverage)}</b><span>cobertura</span></div>
      <div class="kpi ${f.parsimony < 0.9 ? 'warn' : ''}"><b>${pct(f.parsimony)}</b><span>parsimonia</span></div>
      <div class="kpi"><b>${n.retained ?? '—'}</b><span>nodos</span></div>
      <div class="kpi"><b>${n.offscreenDropped ?? '—'}</b><span>fuera de pantalla</span></div>
      <div class="kpi"><b>${pct(f.inkFraction)}</b><span>tinta</span></div>
    </div>
  </header>
  <div class="par">
    <figure><img src="data:image/png;base64,${shot}" alt="screenshot de ${esc(f.id)}"><figcaption>screenshot</figcaption></figure>
    <figure><img src="data:image/png;base64,${wf}" alt="wireframe de ${esc(f.id)}"><figcaption>wireframe</figcaption></figure>
  </div>
  ${notas || grandes ? `<details><summary>Notas y cajas sin justificar</summary>
    ${notas ? `<p class="lbl">Notas de captura</p><ul>${notas}</ul>` : ''}
    ${grandes ? `<p class="lbl">Cajas dibujadas sin tinta dentro, de mayor a menor</p><ul>${grandes}</ul>` : ''}
  </details>` : ''}
</section>`;
}).join('\n');

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Reporte de wireframes · corpus v1</title>
<style>
:root{--ink:#141413;--mut:#6b6b66;--rail:#e5e2dc;--paper:#faf9f5;--card:#fff;--warn:#a63a2c}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:40px 20px 80px}
h1{font-size:30px;margin:0 0 6px;letter-spacing:-.01em}
.sub{color:var(--mut);max-width:70ch;margin:0 0 28px}
.resumen{background:var(--card);border:1px solid var(--rail);border-radius:4px;padding:20px 22px;margin-bottom:34px}
.resumen table{width:100%;border-collapse:collapse;font-size:14px}
.resumen td,.resumen th{text-align:left;padding:6px 10px 6px 0;border-bottom:1px solid var(--rail)}
.resumen th{font-weight:600;color:var(--mut);font-size:12px;text-transform:uppercase;letter-spacing:.07em}
.defs{margin-top:18px;font-size:14px;color:var(--mut)}
.defs b{color:var(--ink)}
section{background:var(--card);border:1px solid var(--rail);border-radius:4px;padding:18px 20px;margin-bottom:26px}
.ph{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:baseline;justify-content:space-between;margin-bottom:14px}
h2{font-size:19px;margin:0}
.org{font-weight:400;color:var(--mut);font-size:13px;margin-left:8px;word-break:break-all}
.kpis{display:flex;gap:18px;flex-wrap:wrap}
.kpi{text-align:right}
.kpi b{display:block;font-variant-numeric:tabular-nums;font-size:16px}
.kpi span{font-size:11px;color:var(--mut);text-transform:uppercase;letter-spacing:.05em}
.kpi.warn b{color:var(--warn)}
.par{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:900px){.par{grid-template-columns:1fr}}
figure{margin:0}
figure img{width:100%;height:auto;display:block;border:1px solid var(--rail);border-radius:3px}
figcaption{font-size:11px;color:var(--mut);text-transform:uppercase;letter-spacing:.06em;margin-top:5px}
details{margin-top:14px;font-size:14px}
summary{cursor:pointer;color:var(--mut)}
.lbl{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--mut);margin:12px 0 4px}
ul{margin:0;padding-left:20px}li{margin:3px 0}
code{background:#f0efe9;padding:1px 4px;border-radius:2px;font-size:13px}
</style></head><body><div class="wrap">
<h1>Reporte de wireframes · corpus v1</h1>
<p class="sub">Treinta páginas capturadas a viewport fijo de 1440 × 900, solo el área visible sin scroll. Cada par muestra la página renderizada y el wireframe generado desde el árbol de layout del navegador. Generado el ${new Date().toISOString().slice(0, 10)}.</p>

<div class="resumen">
<table>
<tr><th>Métrica</th><th>Mediana</th><th>Mínimo</th><th>Páginas bajo 90 %</th></tr>
<tr><td>Cobertura</td><td>${pct(mediana(cov))}</td><td>${pct(cov[0])}</td><td>${cov.filter((x) => x < 0.9).length} de ${cov.length}</td></tr>
<tr><td>Parsimonia</td><td>${pct(mediana(par))}</td><td>${pct(par[0])}</td><td>${par.filter((x) => x < 0.9).length} de ${par.length}</td></tr>
</table>
<div class="defs">
<p><b>Cobertura</b> — ¿se perdió algo que sí se ve? Fracción de la tinta del screenshot que cae dentro de alguna caja dibujada. Por píxel.</p>
<p><b>Parsimonia</b> — ¿se dibujó algo que no está? Fracción de las cajas dibujadas cuyo interior contiene tinta. Por caja, no por píxel: un contorno cae sobre el borde de lo que encierra, y contar píxeles mediría el grosor de la línea.</p>
<p>Ninguna de las dos es un umbral que se pase o se falle. Son dos números que describen la representación, y el valor está en la cola: las páginas más bajas dicen qué le falta al generador.</p>
<p>La fidelidad geométrica se verifica aparte, contra fixtures de geometría declarada, y está en 0,000 px. Es necesaria y no alcanza: durante esta misma sesión un wireframe con 18 nodos de una página completa tenía todas sus cajas en 0,000 px.</p>
</div>
</div>

${secciones}
</div></body></html>`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`reporte -> ${out}  (${(fs.statSync(out).size / 1048576).toFixed(1)} MB, ${filas.length} páginas)`);
