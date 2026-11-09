#!/usr/bin/env node
/**
 * seal-corpus.js --- sello del corpus.
 *
 * QUE SELLA. Tres cosas distintas que se suelen confundir:
 *
 *   1. QUE PAGINAS. El manifiesto que se le pase --- `corpus/corpus-v1.csv`,
 *      `corpus/calibracion-v1.csv` o `corpus/dorados-v1.csv` ---, con su estrato,
 *      su fecha de verificacion y su fecha de captura.
 *   2. QUE SE CAPTURO DE ELLAS. Los cuatro artefactos de cada pagina, por hash.
 *   3. EN QUE CONDICIONES. Version de Chromium, user agent, viewport, version del
 *      catalogo de descarte de interstitials, y el estado del control de sanidad.
 *
 * POR QUE NO BASTA CON HASHEAR EL CSV. Un manifiesto de URLs no dice nada sobre lo
 * que se midio: la misma URL sirve una pagina distinta cada semana. El sello
 * certifica los BYTES de las capturas, que es lo unico que el analisis va a leer.
 *
 * CERTIFICACION CRUZADA. Cada `meta.json` guarda el sha256 que la captura calculo
 * de su propio screenshot y su wireframe. El sello los RECALCULA de los archivos en
 * disco y falla si no coinciden: detecta que un PNG se haya reemplazado despues de
 * capturarlo, que es la forma silenciosa de romper un corpus.
 *
 * NINGUNA FRASE DE ESTE GENERADOR PUEDE HABLAR DE UN CONJUNTO EN PARTICULAR. El
 * mismo codigo sella el corpus, el conjunto de calibracion y los casos dorados, y
 * cuatro frases con "treinta paginas" y "la noche del 10 de septiembre" hacian que
 * el sello de los dorados --- diez paginas, capturadas el 12 y el 13 --- afirmara
 * las dos cosas y las dos fueran falsas. Es el mismo defecto que las siete filas
 * del manifiesto con la nota en la columna capture_date: un campo de plantilla que
 * arrastra texto de otro conjunto. Y se lee peor, porque el archivo dice en su
 * segunda linea "no se edita a mano", es decir, le pide al lector que confie en el
 * generador justo donde el generador mentia. Toda cifra sale de `sello`.
 *
 * COMO SE HASHEA, y esto hay que poder repetirlo a mano:
 *   - Los PNG, byte a byte.
 *   - Los archivos de texto (json, csv), normalizando CRLF a LF y quitando el BOM.
 *     Sin esa normalizacion el sello no verifica en una maquina que clone el
 *     repositorio con `core.autocrlf` activo. `.gitattributes` fija ademas LF en el
 *     arbol de trabajo, de modo que `sha256sum` a secas da el mismo numero.
 *   - El hash del sello es el sha256 del bloque canonico que el propio SELLO-v1.md
 *     transcribe: una linea por pagina, ordenadas por id, precedidas por la linea
 *     del manifiesto, cada una terminada en \n.
 *
 *   node scripts/seal-corpus.js            sella y escribe corpus/SELLO-v1.{json,md}
 *   node scripts/seal-corpus.js --verify   recalcula y compara; sale 1 si algo cambio
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RAIZ = path.resolve(__dirname, '..');

// El mismo procedimiento sella el corpus y el conjunto de calibracion. Se
// parametriza en vez de duplicarse: dos selladores distintos se desincronizan y
// entonces el hash de uno deja de significar lo mismo que el del otro.
const arg = (nombre, porDefecto) => {
  const i = process.argv.indexOf('--' + nombre);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : porDefecto;
};
const MANIFIESTO = path.resolve(RAIZ, arg('manifiesto', 'corpus/corpus-v1.csv'));
const CAPTURAS = path.resolve(RAIZ, arg('capturas', 'captures'));
const SELLO_BASE = path.resolve(RAIZ, arg('sello', 'corpus/SELLO-v1'));
const SELLO_JSON = SELLO_BASE + '.json';
const SELLO_MD = SELLO_BASE + '.md';
const VERSION_CORPUS = arg('nombre', 'v1');
// Filtro opcional por columna del manifiesto: --rol calibracion deja fuera las
// filas descartadas y las de reserva, que no tienen captura.
const FILTRO_ROL = arg('rol', null);

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const shaBinario = (p) => sha(fs.readFileSync(p));
/** Texto: CRLF -> LF y sin BOM, para que el hash no dependa de la plataforma. */
const shaTexto = (p) =>
  sha(Buffer.from(fs.readFileSync(p, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n'), 'utf8'));

function leerManifiesto() {
  const lineas = fs.readFileSync(MANIFIESTO, 'utf8').replace(/\r\n/g, '\n').trim().split('\n');
  const cols = lineas[0].split(',');
  return lineas.slice(1).map((l) => {
    const v = l.split(',');
    const fila = {};
    cols.forEach((c, i) => { fila[c] = (v[i] || '').trim(); });
    return fila;
  });
}

function sellarPagina(id) {
  const dir = path.join(CAPTURAS, id);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
  const shots = {
    screenshot: shaBinario(path.join(dir, 'screenshot.png')),
    wireframe: shaBinario(path.join(dir, 'wireframe.png')),
  };
  const desajustes = [];
  for (const k of ['screenshot', 'wireframe']) {
    if (meta.sha256[k] !== shots[k]) {
      desajustes.push(k + ': meta.json dice ' + meta.sha256[k].slice(0, 12) +
                      ', el archivo en disco es ' + shots[k].slice(0, 12));
    }
  }
  return {
    id,
    url: meta.url,
    finalUrl: meta.finalUrl,
    httpStatus: meta.httpStatus,
    capturedAt: meta.capturedAt,
    pageTitle: meta.pageTitle,
    wireframeMode: meta.wireframeMode,
    catalogoDescarte: meta.consent ? meta.consent.catalogVersion : null,
    interstitialCerrado: meta.consent ? (meta.consent.rondas || []).some((r) => r.cerrado) : false,
    consentLimpio: meta.consent ? meta.consent.limpio !== false : true,
    sanityOk: meta.sanity ? meta.sanity.ok : null,
    sanityRazones: meta.sanity ? meta.sanity.razones : [],
    nodosRetenidos: meta.nodes.retained,
    sha256: {
      screenshot: shots.screenshot,
      wireframe: shots.wireframe,
      nodes: shaTexto(path.join(dir, 'nodes.json')),
      meta: shaTexto(path.join(dir, 'meta.json')),
    },
    desajustes,
  };
}

/** El bloque que se hashea. Se transcribe literal en SELLO-v1.md. */
function bloqueCanonico(shaManifiesto, paginas) {
  const lineas = ['MANIFEST ' + shaManifiesto];
  for (const p of [...paginas].sort((a, b) => a.id.localeCompare(b.id))) {
    lineas.push([p.id, p.sha256.screenshot, p.sha256.wireframe, p.sha256.nodes, p.sha256.meta].join(' '));
  }
  return lineas.join('\n') + '\n';
}

function construir() {
  const manifiesto = leerManifiesto();
  const dirs = fs.readdirSync(CAPTURAS)
    .filter((d) => fs.existsSync(path.join(CAPTURAS, d, 'meta.json')))
    .sort();
  const filas = FILTRO_ROL ? manifiesto.filter((f) => f.role === FILTRO_ROL) : manifiesto;
  const idsManifiesto = filas.map((f) => f.id).sort();

  const faltan = idsManifiesto.filter((i) => !dirs.includes(i));
  const sobran = dirs.filter((i) => !idsManifiesto.includes(i));
  if (faltan.length || sobran.length) {
    throw new Error('el manifiesto y las capturas no coinciden' +
      (faltan.length ? '; sin captura: ' + faltan.join(', ') : '') +
      (sobran.length ? '; sin entrada en el manifiesto: ' + sobran.join(', ') : ''));
  }

  const paginas = dirs.map(sellarPagina);
  const shaManifiesto = shaTexto(MANIFIESTO);
  const bloque = bloqueCanonico(shaManifiesto, paginas);

  const metas = paginas.map((p) => JSON.parse(fs.readFileSync(path.join(CAPTURAS, p.id, 'meta.json'), 'utf8')));
  const unico = (xs) => [...new Set(xs)];
  const fechas = paginas.map((p) => p.capturedAt).sort();

  return {
    bloque,
    sello: {
      corpus: VERSION_CORPUS,
      rol: FILTRO_ROL,
      manifiesto: path.relative(RAIZ, MANIFIESTO).replace(/\\/g, '/'),
      shaManifiesto,
      selladoEn: new Date().toISOString(),
      paginas: paginas.length,
      condiciones: {
        chromium: unico(metas.map((m) => m.chromiumVersion)),
        userAgent: unico(metas.map((m) => m.userAgent)),
        viewport: unico(metas.map((m) => m.viewport.width + 'x' + m.viewport.height + '@' + m.viewport.deviceScaleFactor)),
        wireframeMode: unico(metas.map((m) => m.wireframeMode)),
        catalogoDescarte: unico(paginas.map((p) => p.catalogoDescarte)),
        capturadoEntre: [fechas[0], fechas[fechas.length - 1]],
      },
      declarado: {
        conInterstitialCerrado: paginas.filter((p) => p.interstitialCerrado).map((p) => p.id),
        conCapaSinCerrar: paginas.filter((p) => !p.consentLimpio).map((p) => p.id),
        conSanidadFallida: paginas.filter((p) => p.sanityOk === false).map((p) => p.id),
      },
      recetaDelHash:
        'sha256 del bloque canonico: la linea "MANIFEST <sha del csv>" seguida de una linea por ' +
        'pagina "<id> <screenshot> <wireframe> <nodes> <meta>", ordenadas por id, cada una ' +
        'terminada en LF. Los PNG se hashean byte a byte; los archivos de texto con CRLF ' +
        'normalizado a LF y sin BOM.',
      hashDelSello: sha(Buffer.from(bloque, 'utf8')),
      paginasSelladas: paginas,
    },
  };
}

function escribirMd(sello, bloque) {
  const c = sello.condiciones;
  const filas = sello.paginasSelladas.map((x) => '| ' + [
    x.id,
    x.url,
    x.httpStatus,
    x.capturedAt.slice(0, 19).replace('T', ' ') + 'Z',
    x.nodosRetenidos,
    x.sanityOk ? 'ok' : '**revisar**',
    '`' + x.sha256.screenshot.slice(0, 12) + '`',
    '`' + x.sha256.wireframe.slice(0, 12) + '`',
  ].join(' | ') + ' |').join('\n');

  const md = [
    '# Sello del corpus ' + sello.corpus,
    '',
    'Generado por `scripts/seal-corpus.js`. No se edita a mano.',
    '',
    '**Hash del sello: `' + sello.hashDelSello + '`**',
    '',
    'Este es el numero que citan el protocolo y el documento de tesis. Certifica *que paginas*',
    'se evaluaron, *que se capturo de ellas* y *en que condiciones*.',
    '',
    'Sellado el **' + sello.selladoEn + '**, que son las ' +
      new Date(new Date(sello.selladoEn).getTime() - 5 * 3600 * 1000).toISOString().slice(0, 16).replace('T', ' ') +
      ' en Bogota (UTC-5). Todas las marcas de tiempo de este documento estan en UTC, incluida la',
    'de captura, que es la fila "Capturadas entre" de la tabla de abajo.',
    '',
    '| | |',
    '|---|---|',
    '| Manifiesto | `' + sello.manifiesto + '` · sha256 `' + sello.shaManifiesto + '` |',
    '| Paginas | ' + sello.paginas + ' · ' + sello.paginas * 4 + ' archivos sellados |',
    '| Capturadas entre | ' + c.capturadoEntre[0] + ' y ' + c.capturadoEntre[1] + ' |',
    '| Chromium | ' + c.chromium.join(', ') + ' |',
    '| Viewport | ' + c.viewport.join(', ') + ' |',
    '| Modo de wireframe | ' + c.wireframeMode.join(', ') + ' |',
    '| Catalogo de descarte | ' + c.catalogoDescarte.join(', ') + ' |',
    '| User agent | `' + c.userAgent.join('`, `') + '` |',
    '',
    'Que las cinco primeras filas tengan un solo valor es parte de lo que se certifica: las',
    sello.paginas + ' paginas se capturaron con la misma configuracion. Un conjunto capturado con dos',
    'configuraciones distintas no es un conjunto: cualquier diferencia entre sus paginas podria',
    'venir de que unas se sirvieron a un navegador y otras a otro.',
    '',
    '## Lo que queda declarado',
    '',
    'Un sello que solo dijera «todo bien» no serviria. Lo que lo hace util es que nombra las',
    'paginas que no estan limpias, para que su puntaje se lea con la advertencia puesta.',
    '',
    '- **Interstitial cerrado por el catalogo:** ' +
      (sello.declarado.conInterstitialCerrado.join(', ') || 'ninguna') + '.',
    '- **Capa sin cerrar al capturar:** ' +
      (sello.declarado.conCapaSinCerrar.join(', ') || 'ninguna') + '.',
    '- **Control de sanidad fallido:** ' +
      (sello.declarado.conSanidadFallida.join(', ') || 'ninguna') + '.',
    '',
    '## Como se verifica',
    '',
    '```bash',
    'npm run seal:verify',
    '```',
    '',
    'Recalcula los hashes de los ' + sello.paginas * 4 + ' archivos, los compara contra este sello y',
    'contra el sha256 que cada `meta.json` guardo de su propio screenshot y su wireframe, y sale',
    'con codigo 1 si algo cambio. La receta del hash esta en `SELLO-v1.json`, de modo que se',
    'puede reproducir sin este repositorio:',
    '',
    '> ' + sello.recetaDelHash,
    '',
    '## Las ' + sello.paginas + ' paginas',
    '',
    '| id | url | http | capturada (UTC) | nodos | sanidad | screenshot | wireframe |',
    '|---|---|---|---|---|---|---|---|',
    filas,
    '',
    'Los hashes van truncados a doce caracteres por legibilidad. Los completos, y los de',
    '`nodes.json` y `meta.json` de cada pagina, estan en `SELLO-v1.json`.',
    '',
    '## Bloque canonico',
    '',
    'Es exactamente lo que se hashea para obtener el hash del sello:',
    '',
    '```',
    bloque.trimEnd(),
    '```',
    '',
    '## Lo que este sello no dice',
    '',
    'No dice que las ' + sello.paginas + ' paginas sigan hoy como estaban: dice que estos bytes son los que',
    'se midieron. Una recaptura futura sobre las mismas URLs va a diferir, y esa diferencia es un',
    'dato sobre la web, no un fallo del sello.',
    '',
    'Tampoco dice que la captura sea una buena representacion de la pagina. Eso lo miden los',
    'niveles 1a a 1e de `docs/contexto/13-PLAN-DE-PRUEBAS.md`, y para L03 la respuesta esta',
    'declarada arriba.',
    '',
  ].join('\n');
  fs.writeFileSync(SELLO_MD, md);
}

function main() {
  const verificar = process.argv.includes('--verify');
  const { sello, bloque } = construir();

  const desajustes = sello.paginasSelladas.filter((p) => p.desajustes.length);
  if (desajustes.length) {
    console.error('FALLA: el sha256 guardado en meta.json no corresponde al archivo en disco\n');
    for (const d of desajustes) console.error('  ' + d.id + ': ' + d.desajustes.join(' | '));
    process.exit(1);
  }

  if (verificar) {
    if (!fs.existsSync(SELLO_JSON)) {
      console.error('FALLA: no existe ' + path.relative(RAIZ, SELLO_JSON) + '. Corre `npm run seal` primero.');
      process.exit(1);
    }
    const previo = JSON.parse(fs.readFileSync(SELLO_JSON, 'utf8'));
    const problemas = [];
    if (previo.shaManifiesto !== sello.shaManifiesto) problemas.push('el manifiesto cambio');
    const antes = new Map(previo.paginasSelladas.map((p) => [p.id, p.sha256]));
    for (const p of sello.paginasSelladas) {
      const a = antes.get(p.id);
      if (!a) { problemas.push(p.id + ': no estaba en el sello'); continue; }
      for (const k of Object.keys(p.sha256)) {
        if (a[k] !== p.sha256[k]) {
          problemas.push(p.id + '/' + k + ': ' + a[k].slice(0, 12) + ' -> ' + p.sha256[k].slice(0, 12));
        }
      }
    }
    for (const id of antes.keys()) {
      if (!sello.paginasSelladas.find((p) => p.id === id)) problemas.push(id + ': la captura ya no esta');
    }
    if (previo.hashDelSello !== sello.hashDelSello) {
      problemas.push('el hash del sello cambio: ' + previo.hashDelSello + ' -> ' + sello.hashDelSello);
    }

    if (problemas.length) {
      console.error('FALLA: el corpus no corresponde al sello\n');
      for (const p of problemas) console.error('  ' + p);
      process.exit(1);
    }
    console.log('sello verificado sobre ' + sello.paginas + ' paginas y ' + sello.paginas * 4 + ' archivos');
    console.log('hash del sello  ' + sello.hashDelSello);
    console.log('manifiesto      ' + sello.shaManifiesto);
    return;
  }

  fs.writeFileSync(SELLO_JSON, JSON.stringify(sello, null, 2) + '\n');
  escribirMd(sello, bloque);
  console.log('corpus ' + sello.corpus + ' sellado: ' + sello.paginas + ' paginas, ' + sello.paginas * 4 + ' archivos');
  console.log('hash del sello  ' + sello.hashDelSello);
  console.log('manifiesto      ' + sello.shaManifiesto);
  console.log('declarado       interstitial cerrado en ' + sello.declarado.conInterstitialCerrado.length +
              '; capa sin cerrar en ' + (sello.declarado.conCapaSinCerrar.join(', ') || 'ninguna') +
              '; sanidad fallida en ' + (sello.declarado.conSanidadFallida.join(', ') || 'ninguna'));
  console.log('->  ' + path.relative(RAIZ, SELLO_JSON) + '  y  ' + path.relative(RAIZ, SELLO_MD));
}

main();
