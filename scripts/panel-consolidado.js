#!/usr/bin/env node
'use strict';
/**
 * panel-consolidado.js — el panel tal como lo diseñó el equipo (13 nov. 2026).
 *
 * Cada evaluador calificó cinco páginas en escala 1–4 con la guía del equipo. Mateo
 * recibió seis archivos y un programa los unió en un libro con las hojas «Experto 1» …
 * «Experto 6». Este script lee ese libro. Las plantillas panel-E<n>.xlsx siguen
 * funcionando con panel-importar.js; este no las reemplaza.
 *
 *   node scripts/panel-consolidado.js importar <libro.xlsx> [--out panel/respuestas] [--force]
 *   node scripts/panel-consolidado.js describir [--csv panel/respuestas/panel-consolidado.csv]
 *                                               [--out panel/descripcion-panel.json]
 *
 * IMPORTAR valida contra el corpus sellado: página y URL del manifiesto, G1…G7, nivel
 * entero 1–4 (o vacío, que se cuenta) y ninguna unidad repetida por el mismo evaluador.
 * Si algo no cuadra no escribe nada y dice qué hoja y fila. Solo lee las hojas
 * «Experto n»: no abre docProps, donde Excel guarda quién editó el archivo. La salida
 * lleva E1…E6 y nada más.
 *
 * DESCRIBIR reporta lo que el diseño permite: distribución por grupo, por evaluador y
 * por estrato, y los perfiles por página. No calcula acuerdo entre evaluadores: con un
 * evaluador por unidad no hay pares (docs/ANALISIS-PANEL-13NOV.md).
 */
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { leerHoja } = require('./dorados-importar');
const { RAIZ, MANIFIESTO, csvCampo, leerRespuestas } = require('./panel-comun');

const GRUPOS = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'];
const NIVELES = [1, 2, 3, 4];
const HOJA_EXPERTO = /^Experto ([1-6])$/;
const SALIDA = 'panel-consolidado.csv';

/** Quita tildes y pasa a minúsculas, para leer encabezados escritos a mano. */
const normal = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
/** URL comparable: sin barra final y con el host en minúsculas. */
const urlNormal = (u) => { try { const x = new URL(String(u).trim()); return (x.protocol + '//' + x.host.toLowerCase() + x.pathname).replace(/\/+$/, '') + x.search; } catch { return String(u).trim(); } };

/** Páginas del manifiesto con id, url y estrato. */
function corpus(manifiesto = MANIFIESTO) {
  const lineas = fs.readFileSync(manifiesto, 'utf8').replace(/\r\n/g, '\n').trim().split('\n');
  const cab = lineas[0].split(',');
  const i = (n) => cab.indexOf(n);
  return lineas.slice(1).map((l) => l.split(',')).map((c) => ({ id: c[i('id')], url: c[i('url')], estrato: c[i('stratum')] }));
}

/** Nombres de las hojas del libro, leídos de xl/workbook.xml a través de leerHoja. */
function hojasDe(archivo) {
  try { leerHoja(archivo, '\u0000'); } catch (e) {
    const m = /Tiene: (.*)$/.exec(e.message);
    if (m) return m[1] ? m[1].split(', ') : [];
    throw e;
  }
  return [];
}

/**
 * Lee el libro y devuelve las filas validadas, o la lista de problemas.
 * @returns {{ok:boolean, filas?:Array<{evaluador,pagina,grupo,nivel}>, vacias?:number, problemas:string[]}}
 */
function leerLibro(archivo, manifiesto = MANIFIESTO) {
  const problemas = [];
  const paginas = new Map(corpus(manifiesto).map((p) => [p.id, p]));
  const hojas = hojasDe(archivo).filter((h) => HOJA_EXPERTO.test(h));
  if (!hojas.length) return { ok: false, problemas: ['el libro no tiene hojas «Experto 1» … «Experto 6»'] };

  const filas = [], vistas = new Set();
  let vacias = 0;
  for (const hoja of hojas) {
    const evaluador = 'E' + HOJA_EXPERTO.exec(hoja)[1];
    const crudas = leerHoja(archivo, hoja);
    if (!crudas.length) { problemas.push(hoja + ': hoja vacía'); continue; }
    const col = {};
    for (const [letra, texto] of Object.entries(crudas[0].celdas)) {
      const t = normal(texto);
      if (t === 'pagina') col.pagina = letra;
      else if (t.startsWith('url')) col.url = letra;
      else if (t === 'grupo') col.grupo = letra;
      else if (t.startsWith('calificacion')) col.nivel = letra;
    }
    const faltan = ['pagina', 'url', 'grupo', 'nivel'].filter((k) => !col[k]);
    if (faltan.length) { problemas.push(hoja + ': faltan las columnas ' + faltan.join(', ')); continue; }

    for (const f of crudas.slice(1)) {
      const c = (k) => (f.celdas[col[k]] || '').trim();
      const donde = hoja + ', fila ' + f.n;
      if (!c('pagina') && !c('grupo') && !c('nivel')) continue;   // fila en blanco al final
      const p = paginas.get(c('pagina'));
      if (!p) { problemas.push(donde + ': la página «' + c('pagina') + '» no está en el corpus'); continue; }
      if (c('url') && urlNormal(c('url')) !== urlNormal(p.url)) problemas.push(donde + ': la URL no coincide con la del corpus para ' + p.id);
      const grupo = c('grupo').toUpperCase();
      if (!GRUPOS.includes(grupo)) { problemas.push(donde + ': grupo «' + c('grupo') + '» no es G1…G7'); continue; }
      const clave = evaluador + '/' + p.id + '/' + grupo;
      if (vistas.has(clave)) { problemas.push(donde + ': ' + p.id + '/' + grupo + ' repetida para ' + evaluador); continue; }
      vistas.add(clave);
      const v = c('nivel');
      if (v === '') { vacias++; filas.push({ evaluador, pagina: p.id, grupo, nivel: '' }); continue; }
      if (!/^[1-4](\.0+)?$/.test(v)) { problemas.push(donde + ': calificación «' + v + '» no es un entero de 1 a 4'); continue; }
      filas.push({ evaluador, pagina: p.id, grupo, nivel: String(parseInt(v, 10)) });
    }
  }
  return problemas.length ? { ok: false, problemas } : { ok: true, filas, vacias, problemas: [] };
}

/** Importa el libro a <out>/panel-consolidado.csv y deja al lado la huella de la fuente. */
function importar(archivo, { out = path.join(RAIZ, 'panel', 'respuestas'), forzar = false, manifiesto = MANIFIESTO } = {}) {
  const destino = path.join(out, SALIDA);
  if (fs.existsSync(destino) && !forzar) {
    return { ok: false, problemas: [SALIDA + ' ya existe; repita con --force para reemplazarlo'] };
  }
  const r = leerLibro(archivo, manifiesto);
  if (!r.ok) return r;
  const orden = new Map(corpus(manifiesto).map((p, i) => [p.id, i]));
  r.filas.sort((a, b) => a.evaluador.localeCompare(b.evaluador) || orden.get(a.pagina) - orden.get(b.pagina) || a.grupo.localeCompare(b.grupo));
  const csv = ['evaluador,pagina,grupo,nivel', ...r.filas.map((f) => [f.evaluador, f.pagina, f.grupo, f.nivel].map(csvCampo).join(','))].join('\n') + '\n';
  const fuente = {
    descripcion: 'Libro consolidado del panel: seis archivos de evaluadores unidos por un programa del equipo. Escala 1–4.',
    sha256: crypto.createHash('sha256').update(fs.readFileSync(archivo)).digest('hex'),
    filas: r.filas.length,
    sin_calificar: r.vacias,
    evaluadores: [...new Set(r.filas.map((f) => f.evaluador))],
    csv_sha256: crypto.createHash('sha256').update(csv).digest('hex'),
  };
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(destino, csv);
  fs.writeFileSync(path.join(out, 'panel-consolidado.fuente.json'), JSON.stringify(fuente, null, 2) + '\n');
  return { ok: true, destino, ...fuente, problemas: [] };
}

/** Lee el CSV importado: [{evaluador, pagina, grupo, nivel:number|null}]. */
function cargarConsolidado(csv) {
  return leerRespuestas(csv).map((f) => ({ evaluador: f.evaluador, pagina: f.pagina, grupo: f.grupo, nivel: f.nivel === '' ? null : +f.nivel }));
}

const conteo = (vals) => Object.fromEntries(NIVELES.map((n) => [n, vals.filter((v) => v === n).length]));

/** Descripción del panel: lo que el diseño de un evaluador por unidad permite reportar. */
function describir(filas, manifiesto = MANIFIESTO) {
  const estrato = new Map(corpus(manifiesto).map((p) => [p.id, p.estrato]));
  const con = filas.filter((f) => f.nivel !== null);
  const evaluadores = [...new Set(filas.map((f) => f.evaluador))].sort();
  const porPagina = new Map();
  for (const f of con) {
    if (!porPagina.has(f.pagina)) porPagina.set(f.pagina, { evaluadores: new Set(), niveles: {} });
    porPagina.get(f.pagina).evaluadores.add(f.evaluador);
    porPagina.get(f.pagina).niveles[f.grupo] = f.nivel;
  }
  const perfiles = new Map();
  for (const [pagina, d] of porPagina) {
    if (GRUPOS.some((g) => d.niveles[g] === undefined)) continue;
    const clave = GRUPOS.map((g) => d.niveles[g]).join(' ');
    if (!perfiles.has(clave)) perfiles.set(clave, { perfil: clave, paginas: [], evaluadores: new Set() });
    perfiles.get(clave).paginas.push(pagina);
    for (const e of d.evaluadores) perfiles.get(clave).evaluadores.add(e);
  }
  const unidadesPorEvaluador = new Map();
  for (const f of filas) unidadesPorEvaluador.set(f.pagina + '/' + f.grupo, (unidadesPorEvaluador.get(f.pagina + '/' + f.grupo) || 0) + (f.nivel !== null ? 1 : 0));
  const maxPorUnidad = Math.max(0, ...unidadesPorEvaluador.values());

  return {
    calificaciones: con.length,
    sin_calificar: filas.length - con.length,
    paginas: porPagina.size,
    evaluadores,
    calificaciones_por_unidad_max: maxPorUnidad,
    acuerdo_entre_evaluadores: maxPorUnidad >= 2 ? 'calculable sobre las unidades compartidas' : 'no calculable: ninguna unidad tiene dos calificaciones',
    distribucion_total: conteo(con.map((f) => f.nivel)),
    por_grupo: Object.fromEntries(GRUPOS.map((g) => {
      const v = con.filter((f) => f.grupo === g).map((f) => f.nivel);
      return [g, { n: v.length, distribucion: conteo(v), min: v.length ? Math.min(...v) : null, max: v.length ? Math.max(...v) : null }];
    })),
    por_evaluador: Object.fromEntries(evaluadores.map((e) => {
      const fs_ = con.filter((f) => f.evaluador === e);
      return [e, { paginas: [...new Set(fs_.map((f) => f.pagina))], estratos: [...new Set(fs_.map((f) => estrato.get(f.pagina)))], n: fs_.length, distribucion: conteo(fs_.map((f) => f.nivel)) }];
    })),
    por_estrato: Object.fromEntries([...new Set(con.map((f) => estrato.get(f.pagina)))].map((s) => {
      const v = con.filter((f) => estrato.get(f.pagina) === s);
      return [s, { n: v.length, evaluadores: [...new Set(v.map((f) => f.evaluador))].sort(), distribucion: conteo(v.map((f) => f.nivel)) }];
    })),
    perfiles_distintos: perfiles.size,
    perfiles_repetidos: [...perfiles.values()].filter((p) => p.paginas.length > 1)
      .map((p) => ({ perfil: p.perfil, paginas: p.paginas, evaluadores: [...p.evaluadores].sort() }))
      .sort((a, b) => b.paginas.length - a.paginas.length || a.perfil.localeCompare(b.perfil)),
  };
}

function main(argv) {
  const a = argv.slice(2), opt = (n, d) => { const i = a.indexOf(n); return i !== -1 && a[i + 1] ? path.resolve(a[i + 1]) : d; };
  const orden = a[0];
  if (orden === 'importar' && a[1] && !a[1].startsWith('--')) {
    const r = importar(path.resolve(a[1]), { out: opt('--out', path.join(RAIZ, 'panel', 'respuestas')), forzar: a.includes('--force') });
    if (!r.ok) { console.error('No se importó nada:\n  - ' + r.problemas.join('\n  - ')); return 1; }
    console.log(r.filas + ' filas de ' + r.evaluadores.join(', ') + ' (' + r.sin_calificar + ' sin calificar) -> ' + path.relative(RAIZ, r.destino).replace(/\\/g, '/'));
    console.log('fuente sha256 ' + r.sha256);
    return 0;
  }
  if (orden === 'describir') {
    const csv = opt('--csv', path.join(RAIZ, 'panel', 'respuestas', SALIDA));
    const out = opt('--out', path.join(RAIZ, 'panel', 'descripcion-panel.json'));
    if (!fs.existsSync(csv)) { console.error('No existe ' + csv + '. Primero: node scripts/panel-consolidado.js importar <libro.xlsx>'); return 1; }
    const d = describir(cargarConsolidado(csv));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify(d, null, 2) + '\n');
    console.log(d.calificaciones + ' calificaciones · ' + d.paginas + ' páginas · ' + d.evaluadores.length + ' evaluadores · acuerdo entre evaluadores: ' + d.acuerdo_entre_evaluadores);
    console.log('\ngrupo   n   1   2   3   4');
    for (const g of GRUPOS) { const x = d.por_grupo[g]; console.log(g.padEnd(5) + String(x.n).padStart(4) + NIVELES.map((n) => String(x.distribucion[n]).padStart(4)).join('')); }
    console.log('\nevaluador  estratos      1   2   3   4');
    for (const [e, x] of Object.entries(d.por_evaluador)) console.log(e.padEnd(10) + x.estratos.join('+').padEnd(12) + NIVELES.map((n) => String(x.distribucion[n]).padStart(4)).join(''));
    console.log('\n' + d.perfiles_distintos + ' perfiles distintos; repetidos en más de una página: ' + d.perfiles_repetidos.length);
    console.log('-> ' + path.relative(RAIZ, out).replace(/\\/g, '/'));
    return 0;
  }
  console.error('Uso:\n  node scripts/panel-consolidado.js importar <libro.xlsx> [--out dir] [--force]\n  node scripts/panel-consolidado.js describir [--csv archivo] [--out archivo]');
  return 1;
}

if (require.main === module) process.exit(main(process.argv));
module.exports = { leerLibro, importar, describir, cargarConsolidado, corpus, urlNormal, GRUPOS };
