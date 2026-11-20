#!/usr/bin/env node
'use strict';
/**
 * resumen-claro.js — el resultado de una evaluación en español claro.
 *
 *   node scripts/resumen-claro.js <carpeta de la corrida | perfil.json> [--out archivo]
 *
 * `recoger` lo usa para escribir `resumen.md` junto a `perfil.json` y `perfil.md`.
 * Sin `--out`, la línea de comandos imprime el resumen y no escribe nada: sirve para
 * corridas ya cerradas y selladas.
 *
 * NO LLAMA A NINGÚN MODELO. El texto sale de `perfil.json`, de las cifras de las
 * respuestas ya validadas y de `shared/lenguaje-claro.json`. Si lo redactara un modelo,
 * ese modelo sería un octavo evaluador sin que nadie lo supiera. La misma entrada produce
 * los mismos bytes: no usa la hora, el sistema ni rutas absolutas.
 *
 * QUÉ NO HACE, a propósito: no calcula totales ni promedios, no cuenta «no aplica» ni
 * «no se pudo evaluar» como cero, no propone mejoras que el perfil no sostenga y no
 * reescribe lo que dijo el evaluador: lo cita.
 */
const fs = require('fs'), path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const RUTA_DICCIONARIO = path.join(RAIZ, 'shared', 'lenguaje-claro.json');
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const SIN_EXPLICACION = 'sin explicación disponible';
const SIN_TOTAL_CORTO = 'No hay puntaje total ni calificación de la página.';

const cargarDiccionario = (ruta = RUTA_DICCIONARIO) => JSON.parse(fs.readFileSync(ruta, 'utf8'));
const unaLinea = (v) => String(v ?? '').replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
const numero = (v) => String(v).replace('.', ',');
const veces = (n) => (n === 1 ? '1 vez' : n + ' veces');
const repeticiones = (n) => (n === 1 ? '1 repetición' : n + ' repeticiones');
const sinPunto = (s) => s.replace(/[.\s]+$/, '');
const codigo = (c) => '`' + c + '`';

/** Fecha en español y en hora UTC, sin depender del idioma ni de la zona del sistema. */
function fechaClara(iso) {
  const d = new Date(iso);
  if (!iso || Number.isNaN(d.getTime())) return 'no registrada';
  const dos = (n) => String(n).padStart(2, '0');
  return d.getUTCDate() + ' de ' + MESES[d.getUTCMonth()] + ' de ' + d.getUTCFullYear() + ', ' +
    dos(d.getUTCHours()) + ':' + dos(d.getUTCMinutes()) + ' (hora UTC)';
}

/** Códigos explicables de un grupo: condiciones, glosario y, en G6, convenciones. */
function codigosDe(grupo) {
  return { ...(grupo?.glosario || {}), ...(grupo?.convenciones || {}), ...(grupo?.condiciones || {}) };
}

/** Códigos del grupo que aparecen como palabra completa en un texto del evaluador. */
function codigosCitados(texto, grupo) {
  const tabla = codigosDe(grupo);
  return Object.keys(tabla).filter((c) => c !== 'ninguna' &&
    new RegExp('(?<![\\wáéíóúñÁÉÍÓÚÑ])' + c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\wáéíóúñÁÉÍÓÚÑ])').test(texto))
    .map((c) => codigo(c) + ': ' + tabla[c].nombre);
}

/** Cita lo que dijo el evaluador y explica, en la misma línea, los códigos que usó. */
function citaDelEvaluador(texto, grupo) {
  const limpio = unaLinea(texto).replace(/[«»]/g, '"');
  const glosa = codigosCitados(limpio, grupo);
  return 'El evaluador lo explicó así: «' + limpio + '»' +
    (glosa.length ? ' Códigos que aparecen en esa explicación: ' + glosa.join('; ') + '.' : '');
}

/** Una cifra de la respuesta, con su etiqueta. Devuelve null si el campo no está. */
function cifra(def, medidas) {
  if (!medidas || !(def.campo in medidas)) return null;
  const v = medidas[def.campo];
  if (def.tipo === 'proporcion') {
    if (!v || typeof v !== 'object') return null;
    if (!(v.denominador > 0)) return def.etiqueta + ': no hubo casos sobre los cuales comprobarlo';
    return def.etiqueta + ': ' + v.afectados + ' de ' + v.denominador;
  }
  if (v === null) return def.etiqueta + ': no determinado';
  if (def.tipo === 'numero') return typeof v === 'number' ? def.etiqueta + ': ' + numero(v) : null;
  if (def.tipo === 'booleano') return typeof v === 'boolean' ? def.etiqueta + ': ' + (v ? 'sí' : 'no') : null;
  if (def.tipo === 'texto') return typeof v === 'string' ? def.etiqueta + ': «' + unaLinea(v).replace(/_/g, ' ') + '»' : null;
  return null;
}

/** Cifras de una condición en las repeticiones que la nombraron; avisa si varían. */
function cifrasDe(condicion, evaluaciones, medidasDe) {
  const partes = [];
  for (const def of condicion?.cifras || []) {
    const valores = [...new Set(evaluaciones.map((e) => cifra(def, medidasDe(e))).filter(Boolean))];
    if (valores.length === 1) partes.push(valores[0]);
    else if (valores.length > 1) partes.push(valores.join(' / ') + ' (cambia entre repeticiones)');
  }
  return partes;
}

/**
 * Condiciones que nombra un trigger. Casi siempre es una; si el evaluador escribió varias
 * separadas por comas (por ejemplo «C3, C4»), se explica cada una. Un trigger que ya es un
 * código del diccionario no se parte.
 */
function partesDe(t, g) {
  const entero = String(t ?? '');
  if (g?.condiciones?.[entero] || entero === 'ninguna' || !entero.includes(',')) return [entero];
  return entero.split(',').map((p) => p.trim()).filter(Boolean);
}

function textoEstado(e) {
  return e.estado === 'puntaje' ? String(e.score) : e.estado === 'no_aplica' ? 'no aplica' : e.estado === 'invalida' ? 'respuesta inválida, conservada sin corregir' : 'no se pudo evaluar';
}

/**
 * @param {object} perfil   contenido de perfil.json
 * @param {object} [opciones]
 * @param {object} [opciones.diccionario]  por defecto shared/lenguaje-claro.json
 * @param {(e:object, serie:object)=>object|null} [opciones.medidas]  measurements de una evaluación
 * @returns {string} el resumen en Markdown
 */
function resumenClaro(perfil, opciones = {}) {
  const dic = opciones.diccionario || cargarDiccionario();
  const medidas = opciones.medidas || (() => null);
  const T = dic.textos, limite = dic.recomendar_hasta_nivel;
  const series = perfil.perfil || [];
  const comparacion = perfil.modo === 'comparacion';
  const conf = perfil.configuracion || {};
  const L = [];
  const canal = (c) => (c === 'screenshot' ? 'la imagen de la página' : 'el esquema de cajas de la página');
  const nombreDe = (s) => (dic.grupos[s.group_id]?.nombre_claro || s.group_name || s.group_id.toUpperCase()) +
    (comparacion ? ' (sobre ' + canal(s.channel) + ')' : '');

  // ------------------------------------------------------------ 1. Qué se evaluó
  const nReps = [...new Set(series.map((s) => s.repeticiones))].sort((a, b) => a - b);
  const cuantas = nReps.length === 1 ? veces(nReps[0]) : 'entre ' + nReps[0] + ' y ' + nReps[nReps.length - 1] + ' veces';
  const variasVeces = nReps.some((n) => n > 1);
  const soloUna = nReps.length === 1 && nReps[0] === 1;   // todo se evaluó una vez: se dice una sola vez
  // `preparar` guarda {declarado: 'no expuesto por el runtime'} cuando el runtime no muestra
  // los parámetros; eso se dice como frase, no como «declarado = …».
  const soloDeclaracion = conf.decoding && typeof conf.decoding === 'object' && Object.keys(conf.decoding).length === 1 &&
    typeof conf.decoding.declarado === 'string';
  const decoding = soloDeclaracion ? ''
    : conf.decoding && typeof conf.decoding === 'object'
      ? Object.entries(conf.decoding).map(([k, v]) => k + ' = ' + unaLinea(typeof v === 'object' ? JSON.stringify(v) : v)).join('; ') : '';
  L.push('# Resumen de la evaluación', '',
    'Lo arma un programa a partir del resultado (`perfil.json`) y de un diccionario fijo. No lo redacta un modelo ni agrega opiniones a las del evaluador.', '',
    '## 1. Qué se evaluó', '',
    '- **Página:** ' + (unaLinea(perfil.captura?.url) || 'no registrada'),
    '- **Fecha de la captura:** ' + fechaClara(conf.captured_at),
    '- **Alcance:** ' + T.una_pantalla.texto,
    '- **Quién evaluó:** el modelo `' + (unaLinea(conf.model_id) || 'no registrado') + '`, ejecutado en `' + (unaLinea(conf.runtime) || 'no registrado') + '`. En este resumen, «el evaluador» es ese modelo.' +
      (soloDeclaracion ? ' Parámetros de generación del modelo: ' + unaLinea(conf.decoding.declarado) + '.'
        : decoding ? ' Parámetros de generación declarados: ' + decoding + '.' : ' Parámetros del modelo: no registrados.'),
    '- **Cuántas veces:** cada aspecto se evaluó ' + cuantas +
      (variasVeces && perfil.contexto_limpio_en_todas === true ? ', cada una por separado y sin ver las demás' : '') + '.' +
      (soloUna ? ' ' + T.una_repeticion.texto : ''));
  for (const aviso of perfil.captura?.revision?.advertencias || []) L.push('- **Aviso sobre la captura:** ' + unaLinea(aviso));
  L.push('');

  // --------------------------------------------------------------- 2. Cómo leerlo
  L.push('## 2. Cómo leerlo', '',
    '1. Cada aspecto recibe un nivel de 0 a 4. En general: 0, ' + dic.escala[0].texto + '; 3, ' + dic.escala[3].texto + '; 4, ' + dic.escala[4].texto + '. Qué es un 0 y un 4 en cada aspecto está escrito en cada uno.',
    '2. El resultado es un perfil de ' + (perfil.series_seleccionadas
      ? new Set(series.map(s => s.group_id)).size + ' aspectos seleccionados'
      : 'siete aspectos') + ', no una calificación de la página.',
    '3. ' + T.sin_total.texto, '',
    T.no_aplica.texto + ' ' + T.abstencion.texto + ' Ninguno de los dos es un cero.', '');

  // ----------------------------------------------------------- 3. Los siete aspectos
  L.push('## 3. Los ' + (series.length === 7 ? 'siete' : series.length) + ' aspectos', '');
  L.push('De un vistazo:', '', '| Aspecto | Resultado | Condición que lo fijó |', '|---|---|---|');
  for (const s of series) {
    const g = dic.grupos[s.group_id], evs = s.evaluaciones || [];
    const cond = [...new Set(evs.filter((e) => e.estado === 'puntaje').map((e) => e.trigger))]
      .map((t) => partesDe(t, g).map((p) => (g?.condiciones?.[p] || (p === 'ninguna' ? T.condicion_ninguna : null))?.nombre ||
        'código ' + codigo(p) + ', ' + SIN_EXPLICACION).join(' y '));
    L.push('| ' + nombreDe(s) + ' | ' + evs.map((e) => (e.estado === 'puntaje' ? 'nivel ' + e.score : textoEstado(e))).join(', ') +
      (s.estado_instrumento === 'no_interpretable_v1' ? ' (no interpretable)' : '') + ' | ' + (cond.join('; ') || '—') + ' |');
  }
  L.push('', 'El detalle de cada aspecto sigue abajo.', '');
  const mejoras = [], sinMejora = [];
  series.forEach((s, i) => {
    const g = dic.grupos[s.group_id], id = s.group_id.toUpperCase(), n = s.repeticiones;
    const evs = s.evaluaciones || [];
    const puntuadas = evs.filter((e) => e.estado === 'puntaje');
    const medidasDe = (e) => medidas(e, s);
    L.push('### 3.' + (i + 1) + ' ' + nombreDe(s), '',
      '*En los archivos técnicos: ' + unaLinea(s.group_name || '') + ' (' + id + ').*', '');
    L.push('**Pregunta.** ' + (g?.pregunta || 'Este aspecto no está en el diccionario: ' + SIN_EXPLICACION + '.'), '');

    // Resultado y estabilidad
    if (n === 1) {
      const e = evs[0];
      L.push('**Resultado.** ' + (e.estado === 'puntaje' ? 'Nivel ' + e.score + ' (escala de 0 a 4).' : e.estado === 'no_aplica' ? 'No aplica.' : 'No se pudo evaluar.') + (soloUna ? '' : ' ' + T.una_repeticion.texto), '');
    } else {
      const lista = evs.map(textoEstado).join(', ');
      let frase = '**Resultado.** En las ' + n + ' repeticiones: ' + lista + '.';
      const niveles = puntuadas.map((e) => e.score);
      if (niveles.length) {
        const cuenta = new Map(); for (const v of niveles) cuenta.set(v, (cuenta.get(v) || 0) + 1);
        const max = Math.max(...cuenta.values());
        const modas = [...cuenta.entries()].filter(([, c]) => c === max).map(([v]) => v).sort((a, b) => a - b);
        const rango = Math.max(...niveles) - Math.min(...niveles);
        frase += modas.length === 1
          ? ' El nivel más frecuente fue ' + modas[0] + ' (en ' + max + ' de ' + n + ' repeticiones).'
          : ' No hubo un nivel más frecuente: ' + modas.join(' y ') + ' aparecieron ' + veces(max) + ' cada uno.';
        frase += ' Diferencia entre el nivel más alto y el más bajo: ' + rango + (rango === 1 ? ' nivel.' : ' niveles.');
        const iguales = rango === 0 && niveles.length === n;
        frase += iguales
          ? ' Las ' + n + ' repeticiones dieron el mismo nivel' + (n < 5 ? '; el protocolo pide cinco para hablar de estabilidad.' : '.')
          : ' ' + T.repeticiones_distintas.texto;
      } else {
        frase += ' Ninguna repetición asignó un nivel.';
      }
      L.push(frase, '');
    }

    // Qué quiere decir cada nivel observado
    const observados = [...new Set(puntuadas.map((e) => e.score))].sort((a, b) => a - b);
    for (const nivel of observados) {
      L.push('**Qué quiere decir un ' + nivel + ' en este aspecto.** ' +
        (g?.niveles?.[nivel] ? g.niveles[nivel].texto.charAt(0).toUpperCase() + g.niveles[nivel].texto.slice(1) + '.' : SIN_EXPLICACION.charAt(0).toUpperCase() + SIN_EXPLICACION.slice(1) + '.'), '');
    }

    // Por qué: la condición que fijó el nivel, con las cifras de la respuesta
    const porCondicion = new Map();
    for (const e of puntuadas) { if (!porCondicion.has(e.trigger)) porCondicion.set(e.trigger, []); porCondicion.get(e.trigger).push(e); }
    const condiciones = [...porCondicion.entries()].sort((a, b) => b[1].length - a[1].length);
    for (const [t, es] of condiciones) {
      const c = g?.condiciones?.[t] || (t === 'ninguna' ? T.condicion_ninguna : null);
      const cuantasReps = n > 1 ? ', en ' + es.length + ' de ' + n + ' repeticiones' : '';
      const partes = partesDe(t, g);
      if (partes.length > 1) {
        const explicadas = partes.map((p) => {
          const cp = g?.condiciones?.[p] || (p === 'ninguna' ? T.condicion_ninguna : null);
          if (!cp) return 'código ' + codigo(p) + ': ' + SIN_EXPLICACION + '.';
          const datos = cifrasDe(cp, es, medidasDe);
          return '«' + cp.nombre + '» (código ' + codigo(p) + '). ' + cp.explicacion + (datos.length ? ' En esta evaluación: ' + datos.join('; ') + '.' : '');
        });
        L.push('**Por qué.** El evaluador nombró ' + partes.length + ' condiciones a la vez como las que fijaron el nivel' + cuantasReps + ':', '',
          ...explicadas.map((x) => '- ' + x), '');
        continue;
      }
      if (!c) {
        L.push('**Por qué.** La condición que fijó el nivel tiene el código ' + codigo(t) + cuantasReps + ': ' + SIN_EXPLICACION + '.', '');
        continue;
      }
      const datos = cifrasDe(c, es, medidasDe);
      L.push('**Por qué.** La condición que fijó el nivel fue «' + c.nombre + '» (código ' + codigo(t) + ')' + cuantasReps + '. ' + c.explicacion +
        (datos.length ? ' En esta evaluación: ' + datos.join('; ') + '.' : ''), '');
    }

    // Sin nivel: no aplica o no se pudo evaluar
    const na = evs.filter((e) => e.estado === 'no_aplica'), abst = evs.filter((e) => e.estado === 'abstencion');
    if (na.length) {
      const motivos = [...new Set(na.map((e) => e.motivo).filter(Boolean))];
      L.push('**Por qué no aplica' + (n > 1 ? ' (' + na.length + ' de ' + n + ' repeticiones)' : '') + '.** ' + (g?.no_aplica?.texto || T.no_aplica.texto) +
        motivos.map((m) => ' ' + citaDelEvaluador(m, g)).join(''), '');
    }
    if (abst.length) {
      const motivos = [...new Set(abst.map((e) => e.motivo).filter(Boolean))];
      L.push('**Por qué no hay nivel' + (n > 1 ? ' (' + abst.length + ' de ' + n + ' repeticiones)' : '') + '.** ' + (g?.sin_puntaje?.texto || T.abstencion.texto) +
        motivos.map((m) => ' ' + citaDelEvaluador(m, g)).join(''), '');
    }

    // G6: lo que sí se pudo revisar, por convención
    for (const e of evs) {
      const d = e.diagnostico; if (!d?.cobertura) continue;
      const k = d.cobertura, cv = d.convenciones || {};
      const nombres = (lista) => (lista || []).map((f) => (g?.convenciones?.[f.id]?.nombre || SIN_EXPLICACION) + ' (código ' + codigo(f.id) + ')').join('; ');
      let frase = '**Lo que sí se pudo revisar' + (n > 1 ? ' (repetición ' + e.repeticion + ')' : '') + '.** De las ' + k.catalogadas +
        ' costumbres de ubicación del catálogo: comprobadas, ' + k.evaluadas + ' (se cumplen: ' + (cv.cumplidas || []).length + '; no se cumplen: ' +
        (cv.incumplidas || []).length + '); no aplican a esta pantalla, ' + k.no_aplicables_confirmadas + '; sin determinar, ' + k.indeterminadas + '.';
      if (n === 1) {
        if ((cv.cumplidas || []).length) frase += ' Se cumple: ' + nombres(cv.cumplidas) + '.';
        if ((cv.incumplidas || []).length) frase += ' No se cumple: ' + nombres(cv.incumplidas) + '.';
      }
      L.push(frase, '');
    }

    const avisos = evs.filter((e) => e.evidencia_insuficiente && e.estado === 'puntaje').length;
    if (avisos) L.push('**Advertencia del evaluador.** ' + T.evidencia_insuficiente.texto + (n > 1 ? ' Pasó en ' + avisos + ' de ' + n + ' repeticiones.' : ''), '');
    if (g?.niveles) L.push('**Para comparar.** En este aspecto, un 0 es: ' + g.niveles[0].texto + '. Un 4 es: ' + g.niveles[4].texto + '.', '');
    if (g?.base) L.push('**Qué tan firme es la base.** ' + g.base.texto, '');
    const noInterpretable = s.estado_instrumento === 'no_interpretable_v1';
    if (noInterpretable) L.push('**Advertencia.** ' + T.g1_no_interpretable.texto, '');

    // Material para la sección 4
    if (noInterpretable) { sinMejora.push(nombreDe(s) + ': no es interpretable en la versión 1.'); return; }
    if (!puntuadas.length) { sinMejora.push(nombreDe(s) + ': ' + (na.length === evs.length ? 'no aplica a esta pantalla.' : 'no se pudo evaluar; no se sabe si está bien o mal.')); return; }
    const bajas = puntuadas.filter((e) => e.score <= limite);
    if (!bajas.length) { sinMejora.push(nombreDe(s) + ': obtuvo nivel ' + observados.join(' y ') + '; las rúbricas solo piden mejoras con nivel ' + limite + ' o menor.'); return; }
    const porT = new Map();
    for (const e of bajas) for (const p of partesDe(e.trigger, g)) { if (!porT.has(p)) porT.set(p, []); porT.get(p).push(e); }
    for (const [t, es] of porT) {
      const c = g?.condiciones?.[t];
      if (!c?.mejora) {
        const conocida = c || (t === 'ninguna' ? T.condicion_ninguna : null);
        sinMejora.push(nombreDe(s) + ': nivel ' + Math.min(...es.map((e) => e.score)) + ', pero la condición ' +
          (conocida ? '«' + conocida.nombre + '» (código ' + codigo(t) + ') no tiene una mejora asociada.'
            : 'con código ' + codigo(t) + ' no tiene una mejora en el diccionario (' + SIN_EXPLICACION + ').'));
        continue;
      }
      mejoras.push({ orden: i, nivel: Math.min(...es.map((e) => e.score)), cuantas: es.length, n, nombre: nombreDe(s), t, c });
    }
  });

  // ------------------------------------------------------------ 4. Qué mejorar primero
  L.push('## 4. Qué mejorar primero', '');
  mejoras.sort((a, b) => a.nivel - b.nivel || b.cuantas / b.n - a.cuantas / a.n || a.orden - b.orden);
  if (mejoras.length) {
    L.push('Solo salen de un nivel ' + limite + ' o menor y de la condición que lo fijó, del nivel más bajo al más alto. Son la lectura directa de cada condición, no un plan revisado por expertos; el elemento exacto sobre el que actuar está en la carpeta `resultados`.', '');
    mejoras.forEach((m, k) => L.push((k + 1) + '. **' + m.nombre + '** (nivel ' + m.nivel + (m.n > 1 ? ', en ' + m.cuantas + ' de ' + m.n + ' repeticiones' : '') + '). ' + m.c.mejora +
      ' Sale de la condición «' + m.c.nombre + '».'));
    L.push('');
  } else {
    L.push('Con este resultado no hay mejoras que se puedan sostener: ningún aspecto interpretable obtuvo nivel ' + limite + ' o menor con una condición identificada.', '');
  }
  if (sinMejora.length) { L.push('Sin mejoras propuestas:', ''); for (const x of sinMejora) L.push('- ' + x); L.push(''); }

  // ------------------------------------------------- 5. Qué este resultado no dice
  const sinEvaluar = series.filter((s) => (s.evaluaciones || []).some((e) => e.estado === 'abstencion')).map(nombreDe);
  L.push('## 5. Qué este resultado no dice', '',
    '- Describe una sola pantalla, la que se ve sin desplazarse. No describe la página completa ni el sitio.',
    '- Viene de ' + (nReps.length === 1 ? repeticiones(nReps[0]) : 'entre ' + nReps[0] + ' y ' + nReps[nReps.length - 1] + ' repeticiones') + ' por aspecto, de un solo modelo (`' + (unaLinea(conf.model_id) || 'no registrado') + '`). Otro modelo, u otra repetición, puede dar otro resultado.',
    '- Los niveles son juicios de un modelo sobre medidas que calcula un programa. No sustituyen la revisión de una persona experta, y este resultado no se ha comparado con una.');
  if (series.some((s) => s.estado_instrumento === 'no_interpretable_v1')) L.push('- «' + (dic.grupos.g1?.nombre_claro || 'G1') + '» no es interpretable en la versión 1 del instrumento: su nivel no sirve para comparar páginas.');
  L.push('- Un aspecto que no se pudo evaluar no está bien ni mal: no se sabe.' + (sinEvaluar.length ? ' En este resultado: ' + [...new Set(sinEvaluar)].join('; ') + '.' : ''),
    '- «No aplica» y «no se pudo evaluar» no son ceros.',
    '- ' + SIN_TOTAL_CORTO, '',
    '---', '',
    'Detalle técnico: `perfil.md` y `perfil.json`, en esta misma carpeta. Diccionario de lenguaje claro: versión ' + dic.version + ' (`shared/lenguaje-claro.json`).');
  return L.join('\n') + '\n';
}

/** Lector de medidas para una corrida en disco: busca cada respuesta en su carpeta `resultados`. */
function medidasDesdeCarpeta(carpeta) {
  const cache = new Map();
  return (e) => {
    if (!e?.archivo) return null;
    const f = path.join(carpeta, 'resultados', path.basename(String(e.archivo).replace(/\\/g, '/')));
    if (!cache.has(f)) {
      try { cache.set(f, JSON.parse(fs.readFileSync(f, 'utf8')).measurements || null); } catch { cache.set(f, null); }
    }
    return cache.get(f);
  };
}

function main(argv) {
  const args = argv.slice(2), iOut = args.indexOf('--out');
  const entrada = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--out');
  if (!entrada) { console.error('uso: node scripts/resumen-claro.js <carpeta de la corrida | perfil.json> [--out archivo]'); return 1; }
  const archivo = fs.statSync(entrada).isDirectory() ? path.join(entrada, 'perfil.json') : entrada;
  const carpeta = path.dirname(archivo);
  const texto = resumenClaro(JSON.parse(fs.readFileSync(archivo, 'utf8')), { medidas: medidasDesdeCarpeta(carpeta) });
  if (iOut !== -1 && args[iOut + 1]) fs.writeFileSync(args[iOut + 1], texto);
  else process.stdout.write(texto);
  return 0;
}

module.exports = { resumenClaro, medidasDesdeCarpeta, cargarDiccionario, codigosDe, RUTA_DICCIONARIO, SIN_EXPLICACION, SIN_TOTAL_CORTO };
if (require.main === module) { try { process.exitCode = main(process.argv); } catch (e) { console.error(e.message); process.exitCode = 1; } }
