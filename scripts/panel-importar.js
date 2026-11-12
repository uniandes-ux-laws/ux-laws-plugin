#!/usr/bin/env node
'use strict';
/**
 * panel-importar.js — convierte la hoja «Calificar» de panel-E1.xlsx … panel-E6.xlsx
 * en panel/respuestas/respuestas-E<n>.csv.
 *
 *   node scripts/panel-importar.js panel/entregas/panel-E3.xlsx [--force]
 *   node scripts/panel-importar.js --todos [--force]          # panel/entregas/panel-E*.xlsx
 *   opciones: --out <carpeta de respuestas>  (por defecto panel/respuestas)
 *
 * Basado en dorados-importar.js, con cuatro diferencias que vienen del anonimato:
 *
 *   1. SOLO ACEPTA panel-E1.xlsx … panel-E6.xlsx. Cualquier otro nombre se rechaza,
 *      porque un archivo devuelto como «calificaciones-maria.xlsx» ya identifica a
 *      alguien. El evaluador sale del nombre y debe coincidir con la columna
 *      «evaluador» de cada fila.
 *   2. DESCARTA docProps/core.xml y docProps/app.xml. Excel escribe ahí el nombre de
 *      quien guardó el archivo. El lector nunca abre esas partes ni los comentarios
 *      de celda; solo lee la hoja «Calificar» y sus textos compartidos.
 *   3. NO COPIA EL NOMBRE DEL ARCHIVO ORIGINAL a la salida: el CSV lleva E<n>, y nada más.
 *   4. ADMITE FILAS SIN CALIFICAR (nivel vacío): un evaluador puede entregar parcial.
 *      El acuerdo trabaja sobre las unidades que ambos de cada par calificaron.
 *
 * Igual que el de dorados: valida orden y vocabulario, no escribe nada si algo no
 * cuadra, y no pisa un CSV con juicios ya escritos sin --force.
 */
const fs = require('fs'), path = require('path');
const { leerHoja } = require('./dorados-importar');
const { RAIZ, NOMBRE_VALIDO, COLUMNAS, HOJA, NIVELES, grupos, unidades, csvCampo, leerRespuestas } = require('./panel-comun');

const ENTREGAS = path.join(RAIZ, 'panel', 'entregas');
const RESPUESTAS = path.join(RAIZ, 'panel', 'respuestas');

/** Filas con algún juicio en un CSV de respuestas ya escrito. */
function juiciosEscritos(destino) {
  if (!fs.existsSync(destino)) return 0;
  return leerRespuestas(destino).filter((f) => ['nivel', 'trigger', 'justificacion'].some((k) => (f[k] || '').trim())).length;
}

/**
 * @returns {{ok:boolean, evaluador?:string, destino?:string, calificadas?:number, problemas:string[]}}
 */
function importar(archivo, { out = RESPUESTAS, forzar = false, manifiesto } = {}) {
  const base = path.basename(archivo);
  const m = NOMBRE_VALIDO.exec(base);
  if (!m) return { ok: false, problemas: ['nombre no admitido: solo panel-E1.xlsx … panel-E6.xlsx. Renombre el archivo al código del evaluador antes de importarlo.'] };
  const evaluador = m[1];
  const destino = path.join(out, 'respuestas-' + evaluador + '.csv');

  const previos = juiciosEscritos(destino);
  if (previos && !forzar) {
    return { ok: false, evaluador, problemas: [path.basename(destino) + ' ya tiene ' + previos + ' fila(s) con juicio escrito; sobrescribirlo las perdería. Repita con --force si de verdad quiere reemplazarlas.'] };
  }

  let filas;
  try { filas = leerHoja(archivo, HOJA); } catch (e) { return { ok: false, evaluador, problemas: [e.message] }; }
  if (!filas.length) return { ok: false, evaluador, problemas: ['la hoja «' + HOJA + '» está vacía'] };

  const col = {};
  for (const [letra, texto] of Object.entries(filas[0].celdas)) col[texto.toLowerCase()] = letra;
  const faltan = COLUMNAS.filter((c) => !col[c]);
  if (faltan.length) return { ok: false, evaluador, problemas: ['faltan columnas en la primera fila: ' + faltan.join(', ')] };

  const vocab = Object.fromEntries(grupos().map((g) => [g.id, g.triggers]));
  const esperadas = unidades(manifiesto);
  const datos = filas.slice(1).filter((f) => Object.values(f.celdas).some((v) => v !== ''));
  const problemas = [];
  if (datos.length !== esperadas.length) {
    problemas.push('la hoja tiene ' + datos.length + ' filas y la plantilla ' + esperadas.length + '. No se importa con filas de más o de menos: cambiaría a qué unidad pertenece cada juicio.');
  }

  const salida = [];
  datos.forEach((f, i) => {
    const e = esperadas[i]; if (!e) return;
    const c = (k) => (f.celdas[col[k]] || '').trim();
    const donde = 'fila ' + f.n + ' (' + e.pagina + '/' + e.grupo + ')';
    if (c('pagina') !== e.pagina || c('grupo') !== e.grupo) {
      problemas.push(donde + ': dice ' + (c('pagina') || '(vacío)') + '/' + (c('grupo') || '(vacío)') + '. El orden de las filas no se puede alterar.');
      return;
    }
    if (c('evaluador') !== evaluador) problemas.push(donde + ': la columna evaluador dice «' + c('evaluador') + '» y el archivo es de ' + evaluador);
    const nivel = c('nivel').toUpperCase(), trigger = c('trigger'), just = c('justificacion');
    if (nivel === '') {
      if (trigger || just) problemas.push(donde + ': tiene trigger o justificación pero no nivel');
    } else if (!NIVELES.includes(nivel)) {
      problemas.push(donde + ': nivel «' + nivel + '» no es 0, 1, 2, 3, 4 ni NA');
    } else if (nivel === 'NA') {
      if (trigger) problemas.push(donde + ': NA no lleva trigger');
      if (!just) problemas.push(donde + ': NA exige la justificación de por qué no aplica');
    } else {
      if (!trigger) problemas.push(donde + ': falta trigger');
      else if (!vocab[e.grupo].includes(trigger)) problemas.push(donde + ': trigger «' + trigger + '» no está en el vocabulario de ' + e.grupo + ': ' + vocab[e.grupo].join(', '));
      if (!just) problemas.push(donde + ': falta justificación');
    }
    salida.push([evaluador, e.pagina, e.grupo, nivel, trigger, just]);
  });

  if (problemas.length) return { ok: false, evaluador, problemas };
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(destino, COLUMNAS.join(',') + '\n' + salida.map((r) => r.map(csvCampo).join(',')).join('\n') + '\n');
  return { ok: true, evaluador, destino, calificadas: salida.filter((r) => r[3] !== '').length, problemas: [] };
}

function main(argv) {
  const args = argv.slice(2), forzar = args.includes('--force');
  const iOut = args.indexOf('--out'), out = iOut !== -1 ? path.resolve(args[iOut + 1]) : RESPUESTAS;
  const archivos = args.includes('--todos')
    ? (fs.existsSync(ENTREGAS) ? fs.readdirSync(ENTREGAS).filter((f) => f.endsWith('.xlsx')).sort().map((f) => path.join(ENTREGAS, f)) : [])
    : args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--out');
  if (!archivos.length) {
    console.error('uso: node scripts/panel-importar.js panel/entregas/panel-E3.xlsx [--force] [--out <carpeta>]');
    console.error('     node scripts/panel-importar.js --todos [--force]');
    return 1;
  }
  let malos = 0;
  for (const a of archivos) {
    const r = importar(a, { out, forzar });
    if (r.ok) console.log('ok     ' + r.evaluador + ' -> ' + path.relative(RAIZ, r.destino).replace(/\\/g, '/') + '  (' + r.calificadas + ' unidades calificadas de ' + unidades().length + ')');
    else {
      malos++;
      // Se nombra el evaluador, no el archivo: el nombre original podría identificar a alguien.
      console.error('\nNO SE IMPORTÓ ' + (r.evaluador || 'un archivo con nombre no admitido') + '. ' + r.problemas.length + ' problema(s):');
      for (const p of r.problemas.slice(0, 20)) console.error('  ' + p);
      if (r.problemas.length > 20) console.error('  … y ' + (r.problemas.length - 20) + ' más');
    }
  }
  return malos ? 1 : 0;
}

module.exports = { importar, juiciosEscritos };
if (require.main === module) process.exit(main(process.argv));
