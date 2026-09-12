#!/usr/bin/env node
/**
 * demo.js --- una URL, una pagina HTML, en vivo.
 *
 *   npm run demo -- https://ejemplo.com
 *
 * PARA QUE SIRVE. Para que alguien diga una URL en el momento y se vea, en menos
 * de medio minuto, que es lo que el sistema hace con ella: la pantalla capturada,
 * el wireframe generado desde el arbol de layout, las metricas de fidelidad de esa
 * pagina, cuantos nodos entraron y cuantos quedaron fuera, y si hubo que cerrar un
 * interstitial y con que regla del catalogo.
 *
 * LO QUE NO ES. No puntua las rubricas: eso es el orquestador y es M3. Esto muestra
 * la capa de captura y su fidelidad, que es lo que esta verificado.
 *
 * DOS COSAS QUE NUNCA HACE EN SILENCIO.
 *
 *   1. Si la pagina falla o no pasa el control de sanidad, lo dice EN LA PAGINA con
 *      la razon. Una demostracion que no muestra nada cuando algo sale mal entrena
 *      a quien la ve a no creerle cuando muestra algo.
 *   2. Si le pasan la ruta de una imagen, la rechaza explicando por que. El
 *      wireframe no se segmenta de la imagen: se genera desde el arbol de layout, y
 *      una imagen no tiene arbol de layout.
 *
 * La medicion la hace `scripts/metrics-wireframe.js`, el mismo codigo que corre
 * sobre el corpus. No hay una copia aqui.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');
const { chromium } = require('playwright');
const { capturePage, launchOptions } = require('../capture/capture.js');
const { measure } = require('./metrics-wireframe.js');

const SALIDA = path.resolve(__dirname, '..', 'demo');
const TIMEOUT_NAV = 20000;   // el presupuesto total es 30 s; la navegacion no se lleva mas de 20
const EXT_IMAGEN = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg', '.tiff', '.tif', '.avif', '.heic'];

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Una imagen no tiene arbol de layout: se rechaza antes de abrir el navegador. */
function pareceImagen(entrada) {
  const sinQuery = entrada.split('?')[0].split('#')[0];
  const ext = path.extname(sinQuery).toLowerCase();
  if (EXT_IMAGEN.includes(ext)) return ext;
  try { if (fs.existsSync(entrada) && fs.statSync(entrada).isFile()) return ext || '(archivo local)'; } catch (_) {}
  return null;
}

function normalizarUrl(entrada) {
  if (/^https?:\/\//i.test(entrada)) return entrada;
  if (/^[a-z][a-z0-9+.-]*:/i.test(entrada)) return null;   // otro esquema: file:, data:, ftp:
  return 'https://' + entrada;
}

const b64 = (p) => fs.readFileSync(p).toString('base64');

function fila(k, v, nota) {
  return '<tr><th>' + esc(k) + '</th><td>' + v + (nota ? ' <span class="nota">' + esc(nota) + '</span>' : '') + '</td></tr>';
}

function paginaHtml({ url, segundos, meta, met, error, aviso }) {
  const hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const pct = (x) => (x === null || x === undefined ? '—' : (x * 100).toFixed(1) + ' %');

  const bloqueError = error ? `
    <section class="fallo">
      <h2>Esta página no se pudo capturar</h2>
      <p class="razon">${esc(error)}</p>
      <p>No es un fallo de la demostración: es el resultado. Un sitio que responde 403 a un
      navegador automatizado, o que sirve una página de verificación con estado 200, no admite
      evaluación automatizada, y eso se reporta como dato en vez de esconderse. Los dos
      reemplazos del corpus se decidieron exactamente así.</p>
    </section>` : '';

  const bloqueAviso = aviso ? `
    <section class="aviso">
      <h2>Capturada, pero el control de sanidad la marcó</h2>
      <p class="razon">${esc(aviso)}</p>
      <p>La captura existe y se muestra abajo, pero su puntaje se leería con esta advertencia
      puesta. El control de sanidad marca estado HTTP distinto de 200, menos de 50 nodos
      retenidos, señales textuales de página de bloqueo, o una capa sin cerrar sobre el
      viewport.</p>
    </section>` : '';

  const consent = meta && meta.consent ? meta.consent : null;
  const rondas = consent && consent.rondas ? consent.rondas : [];
  const cerradas = rondas.filter((r) => r.cerrado);
  const textoConsent = !consent ? '—'
    : cerradas.length
      ? cerradas.map((r) => 'cerrado por <code>' + esc(r.regla) + '</code> <span class="nota">vía ' + esc(r.via) + '</span>').join('<br>')
      : (consent.overlayRestante ? 'detectado y <strong>no</strong> cerrado' : 'ninguno');

  const n = meta ? meta.nodes : null;
  const bloqueMetricas = met ? `
    <table class="datos">
      ${fila('Cobertura', '<strong>' + pct(met.coverage) + '</strong>', 'de la tinta del screenshot cae dentro de alguna caja')}
      ${fila('Parsimonia', '<strong>' + pct(met.parsimony) + '</strong>', 'de las cajas dibujadas contienen tinta')}
      ${fila('Cajas dibujadas', met.drawnBoxes + ' <span class="nota">' + met.unjustifiedBoxes + ' sin justificar</span>')}
      ${fila('Fracción de tinta', pct(met.inkFraction), 'del viewport pinta algo distinto del fondo')}
    </table>
    <p class="pie">Fidelidad geométrica y de tinta —1a y 1b del plan de pruebas— no aparecen aquí
    porque se verifican contra fixtures de geometría declarada, no sobre una página arbitraria:
    nadie sabe dónde <em>debería</em> estar cada caja de un sitio ajeno. Sobre los fixtures dan
    0,000 px, y <code>npm run fidelity</code> lo reproduce.</p>` : '<p class="pie">Sin métricas: no hubo captura.</p>';

  const bloqueImagenes = meta ? `
    <section>
      <h2>Las dos representaciones, a tamaño real</h2>
      <p class="pie">1440 × 900, solo lo visible sin scroll. Desplace horizontalmente para
      comparar. El wireframe no se segmentó de la imagen: se generó desde el árbol de layout
      del navegador, y solo dibuja el contorno de los nodos que pintan una frontera visible.</p>
      <div class="lado-a-lado">
        <figure><figcaption>Screenshot</figcaption><img src="data:image/png;base64,${meta.__shot}" width="1440" height="900" alt="screenshot"></figure>
        <figure><figcaption>Wireframe</figcaption><img src="data:image/png;base64,${meta.__wire}" width="1440" height="900" alt="wireframe"></figure>
      </div>
    </section>` : '';

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<title>Demostración · ${esc(url)}</title>
<style>
  :root { color-scheme: light; }
  body { margin: 0; padding: 32px; font: 15px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif;
         color: #1a1a1a; background: #f6f6f4; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  h2 { font-size: 15px; margin: 28px 0 8px; text-transform: uppercase; letter-spacing: .06em; color: #555; }
  .url { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 13px; color: #333; word-break: break-all; }
  .cronometro { float: right; font-size: 13px; color: #555; }
  table.datos { border-collapse: collapse; margin: 0; }
  table.datos th { text-align: left; font-weight: 600; padding: 5px 18px 5px 0; vertical-align: top; white-space: nowrap; }
  table.datos td { padding: 5px 0; }
  .nota { color: #777; font-size: 13px; }
  .pie { color: #555; font-size: 13px; max-width: 62em; }
  .lado-a-lado { display: flex; gap: 20px; overflow-x: auto; padding-bottom: 12px; background: #fff;
                 border: 1px solid #ddd; border-radius: 6px; padding: 12px; }
  figure { margin: 0; flex: 0 0 auto; }
  figcaption { font-size: 12px; color: #666; margin-bottom: 6px; text-transform: uppercase; letter-spacing: .06em; }
  img { display: block; border: 1px solid #ccc; }
  .fallo, .aviso { border-left: 4px solid; padding: 12px 16px; border-radius: 0 6px 6px 0; margin: 20px 0; max-width: 62em; }
  .fallo { border-color: #b3261e; background: #fdf0ef; }
  .aviso { border-color: #a06800; background: #fdf7e8; }
  .fallo h2, .aviso h2 { margin-top: 0; color: inherit; }
  .razon { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 13px; }
  code { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 13px; }
  footer { margin-top: 32px; border-top: 1px solid #ddd; padding-top: 12px; color: #777; font-size: 13px; max-width: 62em; }
</style></head><body>

<span class="cronometro">${segundos} s · ${esc(hoy)}</span>
<h1>Captura y wireframe</h1>
<p class="url">${esc(url)}</p>

${bloqueError}${bloqueAviso}

<h2>Métricas de esta página</h2>
${bloqueMetricas}

<h2>Qué entró en la representación</h2>
<table class="datos">
  ${fila('Estado HTTP', meta ? esc(meta.httpStatus) : '—')}
  ${fila('Nodos retenidos', n ? n.retained : '—', n ? 'de ' + n.totalLayoutNodes + ' nodos de layout y ' + n.totalDomNodes + ' del DOM' : '')}
  ${fila('Descartados por quedar fuera del viewport', n ? n.offscreenDropped : '—', 'el árbol describe el documento entero; solo entra lo visible')}
  ${fila('Con frontera visible', n ? n.visibleBoundary : '—', n ? n.noVisibleBoundary + ' no pintan ninguna y por eso no se dibujan' : '')}
  ${fila('Interstitial', textoConsent, consent ? 'catálogo ' + esc(consent.catalogVersion) : '')}
  ${fila('Control de sanidad', meta && meta.sanity ? (meta.sanity.ok ? 'pasa' : '<strong>marca</strong>: ' + esc((meta.sanity.razones || []).join('; '))) : '—')}
  ${fila('Chromium', meta ? esc(meta.chromiumVersion) : '—', 'viewport 1440×900 a escala 1')}
</table>

${bloqueImagenes}

<footer>
  Generado por <code>npm run demo</code> sobre el protocolo <code>v0.1.0</code>. Esta página
  muestra la capa de captura, que es la parte verificada del sistema; no puntúa las siete
  rúbricas, que es el orquestador y va en M3. Las métricas las calcula el mismo
  <code>scripts/metrics-wireframe.js</code> que corre sobre el corpus.
</footer>
</body></html>`;
}

function abrir(archivo) {
  if (process.platform === 'win32') execFile('cmd', ['/c', 'start', '', archivo], () => {});
  else if (process.platform === 'darwin') execFile('open', [archivo], () => {});
  else execFile('xdg-open', [archivo], () => {});
}

(async () => {
  const entrada = process.argv.slice(2).find((a) => !a.startsWith('--'));
  if (!entrada) {
    console.error('uso: npm run demo -- <url>\n\n  ejemplo: npm run demo -- https://www.banrep.gov.co/');
    process.exit(1);
  }

  const ext = pareceImagen(entrada);
  if (ext) {
    console.error(
      '\nEsto parece una imagen (' + ext + ') y no una URL, así que no se puede evaluar.\n\n' +
      'El wireframe NO se obtiene segmentando el screenshot: se genera desde el árbol de\n' +
      'layout del navegador, que es lo que dice, para cada nodo, dónde está su caja, si pinta\n' +
      'una frontera visible y si acepta clic. Una imagen no tiene árbol de layout, así que de\n' +
      'una imagen solo se podría adivinar la estructura con un segmentador --- y eso metería\n' +
      'un segundo modelo cuyos errores caerían dentro del mismo pipeline, sin forma de\n' +
      'separarlos de los del instrumento.\n\n' +
      'Pase la URL de la página y el navegador hace el resto.\n');
    process.exit(2);
  }

  const url = normalizarUrl(entrada);
  if (!url) {
    console.error('\nSolo se aceptan URLs http o https. Recibido: ' + entrada + '\n');
    process.exit(2);
  }

  const t0 = Date.now();
  const slug = url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/-+$/,'').slice(0, 60) || 'demo';
  const out = path.join(SALIDA, slug);
  fs.mkdirSync(out, { recursive: true });

  console.log('capturando ' + url + ' ...');
  let meta = null, met = null, error = null, aviso = null, browser = null;
  try {
    browser = await chromium.launch(launchOptions());
    await capturePage({ url, out, browser, timeout: TIMEOUT_NAV, log: () => {} });
    meta = JSON.parse(fs.readFileSync(path.join(out, 'meta.json'), 'utf8'));
    if (meta.sanity && !meta.sanity.ok) aviso = (meta.sanity.razones || []).join('; ');
    try {
      met = measure(out);
    } catch (e) {
      aviso = (aviso ? aviso + ' · ' : '') + 'las métricas no se pudieron calcular: ' + e.message;
    }
    meta.__shot = b64(path.join(out, 'screenshot.png'));
    meta.__wire = b64(path.join(out, 'wireframe.png'));
  } catch (e) {
    error = e.message.split('\n')[0].slice(0, 300);
  } finally {
    if (browser) await browser.close().catch(() => {});
  }

  const segundos = ((Date.now() - t0) / 1000).toFixed(1);
  const archivo = path.join(out, 'demo.html');
  fs.writeFileSync(archivo, paginaHtml({ url, segundos, meta, met, error, aviso }));

  console.log(error ? 'FALLO: ' + error : (aviso ? 'capturada CON AVISO: ' + aviso : 'capturada'));
  if (met) console.log('cobertura ' + (met.coverage * 100).toFixed(1) + ' %   parsimonia ' + (met.parsimony * 100).toFixed(1) + ' %');
  console.log(segundos + ' s  ->  ' + archivo);
  // --no-abrir existe para poder probar el comando sin llenar la pantalla de
  // ventanas; en vivo nunca se usa.
  if (!process.argv.includes('--no-abrir')) abrir(archivo);
})();
