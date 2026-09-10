#!/usr/bin/env node
/**
 * metrics-wireframe.js — cobertura y parsimonia.
 *
 * La fidelidad geometrica dice que cada caja esta donde el motor la puso. Es
 * necesaria y no alcanza: un wireframe puede tener toda su geometria exacta y
 * seguir siendo una mala representacion, que es justo lo que mostro el problema
 * de la caja de tinta. Faltan las dos formas restantes de equivocarse.
 *
 *   COBERTURA   se perdio algo que si se ve?
 *               fraccion de la tinta del screenshot que cae dentro de alguna
 *               caja retenida. Se mide por pixel.
 *
 *   PARSIMONIA  se dibujo algo que no esta?
 *               fraccion de las cajas dibujadas cuyo interior contiene tinta en
 *               el screenshot. Se mide por caja, no por pixel: un contorno cae
 *               sobre el borde de lo que encierra y un conteo por pixel medira
 *               el grosor de la linea en vez de si la caja se justifica.
 *
 * Ninguna de las dos es un umbral que se pase o se falle. Son dos numeros que
 * describen la representacion, y su valor esta en la cola: las cinco peores
 * paginas dicen que le falta al generador.
 *
 *   node scripts/metrics-wireframe.js captures
 *   node scripts/metrics-wireframe.js captures --page G01
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

// Un pixel cuenta como tinta cuando se aparta del fondo mas de esta distancia
// euclidea en RGB. Convencion de este proyecto: por debajo de 24 el ruido de
// compresion y los degradados suaves empiezan a contar como contenido.
const INK_THRESHOLD = 24;
// Una caja dibujada se considera justificada con esta fraccion de tinta dentro.
const BOX_JUSTIFIED_AT = 0.02;

function readPng(p) {
  return PNG.sync.read(fs.readFileSync(p));
}

/** Color de fondo: el mas frecuente, cuantizado a pasos de 8. */
function backgroundColor(png) {
  const counts = new Map();
  const { width, height, data } = png;
  const step = 4; // muestreo: 1 de cada 4 pixeles en cada eje, suficiente para la moda
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) << 2;
      const key = ((data[i] >> 3) << 10) | ((data[i + 1] >> 3) << 5) | (data[i + 2] >> 3);
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  let best = 0, bestN = -1;
  for (const [k, n] of counts) if (n > bestN) { bestN = n; best = k; }
  return [((best >> 10) & 31) << 3, ((best >> 5) & 31) << 3, (best & 31) << 3];
}

/** Mascara booleana de tinta del screenshot. */
function inkMask(png, bg) {
  const { width, height, data } = png;
  const mask = new Uint8Array(width * height);
  const t2 = INK_THRESHOLD * INK_THRESHOLD;
  for (let p = 0, i = 0; p < width * height; p++, i += 4) {
    const dr = data[i] - bg[0], dg = data[i + 1] - bg[1], db = data[i + 2] - bg[2];
    if (dr * dr + dg * dg + db * db > t2) mask[p] = 1;
  }
  return mask;
}

function clampRect(b, w, h) {
  const x0 = Math.max(0, Math.floor(b.x));
  const y0 = Math.max(0, Math.floor(b.y));
  const x1 = Math.min(w, Math.ceil(b.x + b.w));
  const y1 = Math.min(h, Math.ceil(b.y + b.h));
  return { x0, y0, x1, y1, empty: x1 <= x0 || y1 <= y0 };
}

function measure(dir) {
  const shot = readPng(path.join(dir, 'screenshot.png'));
  const nodes = JSON.parse(fs.readFileSync(path.join(dir, 'nodes.json'), 'utf8'));
  const list = Array.isArray(nodes) ? nodes : nodes.nodes;
  const { width: W, height: H } = shot;

  const bg = backgroundColor(shot);
  const ink = inkMask(shot, bg);
  let inkTotal = 0;
  for (let p = 0; p < ink.length; p++) inkTotal += ink[p];

  // --- cobertura: las cajas que el wireframe realmente dibuja -----------------
  // Primero se probo con cajas hoja y quedaba fuera un caso comun: un <section>
  // con imagen de fondo que contiene texto pinta media pantalla y no es hoja, asi
  // que su tinta quedaba sin cubrir. Cinco paginas del corpus con hero grande
  // daban entre 14% y 28% por esa razon y no por un defecto del wireframe.
  //
  // El conjunto correcto es el que el generador dibuja: nodos que pintan frontera
  // visible, mas las barras de texto. Con un guardarrail: una caja que abarca
  // casi todo el viewport no explica nada concreto --- BODY con fondo cubriria
  // cualquier pixel y la metrica volveria a dar 100% siempre. El limite es
  // convencion de este proyecto.
  const MAX_COVER_FRACTION = 0.90;
  const areaViewport = W * H;
  const cubridores = list.filter((n) => {
    const v = n.visibleBoundary ? n.visibleBoundary.visible : null;
    if (!(n.nodeName === '#text' || v === true)) return false;
    const box = n.visibleInk || n.ink || n.visibleBounds || n.bounds;
    if (!box) return false;
    return (box.w * box.h) < MAX_COVER_FRACTION * areaViewport;
  });

  const covered = new Uint8Array(W * H);
  for (const n of cubridores) {
    const r = clampRect(n.visibleInk || n.ink || n.bounds, W, H);
    if (r.empty) continue;
    for (let y = r.y0; y < r.y1; y++) {
      const row = y * W;
      for (let x = r.x0; x < r.x1; x++) covered[row + x] = 1;
    }
  }
  let inkCovered = 0;
  for (let p = 0; p < ink.length; p++) if (ink[p] && covered[p]) inkCovered++;

  // --- parsimonia: cajas dibujadas justificadas por tinta --------------------
  // Se dibuja el contorno de un nodo cuando pinta frontera visible o cuando no
  // se pudo decidir, y una barra por cada nodo de texto.
  const drawn = list.filter((n) => {
    const v = n.visibleBoundary ? n.visibleBoundary.visible : null;
    return n.nodeName === '#text' || v !== false;
  });

  let justified = 0, unjustified = 0, fueraDeVista = 0;
  const worst = [];
  for (const n of drawn) {
    const r = clampRect(n.bounds, W, H);
    // Una caja completamente fuera del area visible no se dibuja y no entra en
    // el denominador. Se cuenta aparte para que el numero de cajas de la tabla
    // y el de la fraccion sean el mismo.
    if (r.empty) { fueraDeVista++; continue; }
    let inside = 0, total = 0;
    for (let y = r.y0; y < r.y1; y++) {
      const row = y * W;
      for (let x = r.x0; x < r.x1; x++) { total++; inside += ink[row + x]; }
    }
    const frac = total ? inside / total : 0;
    if (frac >= BOX_JUSTIFIED_AT) justified++;
    else { unjustified++; worst.push({ id: n.id, nodeName: n.nodeName, bounds: n.bounds, inkFraction: +frac.toFixed(4) }); }
  }

  worst.sort((a, b) => (b.bounds.w * b.bounds.h) - (a.bounds.w * a.bounds.h));

  return {
    viewport: { width: W, height: H },
    background: bg,
    inkPixels: inkTotal,
    inkFraction: +(inkTotal / (W * H)).toFixed(4),
    coverage: inkTotal ? +(inkCovered / inkTotal).toFixed(4) : null,
    coveringBoxes: cubridores.length,
    drawnBoxes: justified + unjustified,
    drawnOffscreen: fueraDeVista,
    parsimony: (justified + unjustified) ? +(justified / (justified + unjustified)).toFixed(4) : null,
    unjustifiedBoxes: unjustified,
    largestUnjustified: worst.slice(0, 5),
  };
}

(async () => {
  const args = process.argv.slice(2);
  const root = args.find((a) => !a.startsWith('--')) || 'captures';
  const only = args.includes('--page') ? args[args.indexOf('--page') + 1] : null;

  let dirs = fs.readdirSync(root).filter((d) => {
    const full = path.join(root, d);
    return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, 'nodes.json'));
  });
  if (only) dirs = dirs.filter((d) => d === only);
  dirs.sort();

  const rows = [];
  console.log('pagina  cobertura  parsimonia  cajas  sin-justificar  tinta');
  for (const d of dirs) {
    try {
      const m = measure(path.join(root, d));
      rows.push({ id: d, ...m });
      console.log(
        d.padEnd(7),
        (m.coverage * 100).toFixed(1).padStart(8) + '%',
        (m.parsimony * 100).toFixed(1).padStart(10) + '%',
        String(m.drawnBoxes).padStart(6),
        String(m.unjustifiedBoxes).padStart(15),
        (m.inkFraction * 100).toFixed(1).padStart(6) + '%'
      );
    } catch (e) {
      console.log(d.padEnd(7), '  ERROR ', e.message.slice(0, 60));
    }
  }

  if (rows.length > 1) {
    const med = (xs) => { const a = [...xs].sort((p, q) => p - q); return a[Math.floor(a.length / 2)]; };
    const cov = rows.map((r) => r.coverage), par = rows.map((r) => r.parsimony);
    console.log('\n--- resumen sobre ' + rows.length + ' paginas ---');
    console.log('cobertura   mediana ' + (med(cov) * 100).toFixed(1) + '%   minimo ' + (Math.min(...cov) * 100).toFixed(1) + '%');
    console.log('parsimonia  mediana ' + (med(par) * 100).toFixed(1) + '%   minimo ' + (Math.min(...par) * 100).toFixed(1) + '%');
    const peores = [...rows].sort((a, b) => a.coverage - b.coverage).slice(0, 5);
    console.log('\npeores por cobertura, que es donde esta el trabajo pendiente:');
    for (const r of peores) console.log('  ' + r.id.padEnd(5) + (r.coverage * 100).toFixed(1) + '%');
  }

  fs.writeFileSync(path.join(root, '_metricas.json'), JSON.stringify(rows, null, 2) + '\n');
  console.log('\ndetalle -> ' + path.join(root, '_metricas.json'));
})();
