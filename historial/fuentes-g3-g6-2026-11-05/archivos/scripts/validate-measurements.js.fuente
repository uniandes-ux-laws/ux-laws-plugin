#!/usr/bin/env node
'use strict';
/**
 * validate-measurements.js --- valida la salida de la capa de medicion.
 *
 *   node scripts/validate-measurements.js captures/G01/measurements.json
 *   node scripts/validate-measurements.js --todas captures calibracion
 *   node scripts/validate-measurements.js --selftest
 *
 * Por que existe aparte del validador de resultados: la capa de medicion es la
 * entrada de las siete skills, y una cifra mal formada ahi se propaga a los siete
 * puntajes sin que ninguna validacion posterior la vea. El esquema exige, ademas
 * de la forma, dos cosas que son de metodo: que toda proporcion lleve su
 * denominador con su definicion en palabras, y que cada grupo declare los juicios
 * que NO calculo.
 */
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv/dist/2020');
const addFormats = require('ajv-formats');
const { cajaValida } = require('../measure/actionable-inventory');

const schema = require(path.resolve(__dirname, '../shared/schemas/measurements.schema.json'));
const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

function revisar(nombre, obj) {
  const ok = validate(obj);
  if (!ok) {
    console.log('FALLA  ' + nombre);
    for (const e of validate.errors.slice(0, 6)) console.log('       ' + (e.instancePath || '(raíz)') + ' ' + e.message);
    return false;
  }
  // Controles que el esquema no puede expresar por si solo.
  const problemas = [];
  if (obj.inventario_accionables) {
    const inv = obj.inventario_accionables;
    const ids = inv.objetivos.map(n => n.id);
    const aceptados = new Set(ids);
    const idsG2 = inv.objetivos.filter(n => n.en_g2).map(n => n.id);
    const esperadosG2 = new Set(idsG2);
    if (aceptados.size !== ids.length) problemas.push('inventario: objetivos duplicados');
    if (inv.objetivos.some(n => ['#DOCUMENT', 'HTML', 'BODY'].includes(n.nodeName.toUpperCase()))) problemas.push('inventario: contiene una raíz del documento');
    for (const excluido of inv.excluidos) {
      if (aceptados.has(excluido.id)) problemas.push('inventario: un objetivo aparece también como excluido');
      if (excluido.representado_por !== undefined && !aceptados.has(excluido.representado_por)) problemas.push('inventario: representante inexistente');
    }
    if (obj.g7.g7_N_obj !== ids.length) problemas.push('g7: N_obj no coincide con el inventario');
    if (obj.g2.g2_n_total !== idsG2.length) problemas.push('g2: n_total no coincide con el inventario visible');
    if (obj.g2.g2_no_aplicable !== (idsG2.length === 0)) problemas.push('g2: no aplicable contradice el inventario');
    if (obj.g7.g7_no_aplicable !== (ids.length === 0)) problemas.push('g7: no aplicable contradice el inventario');
    const ambiguo = inv.ambiguos.length > 0;
    if (obj.g2.g2_inventario_ambiguo !== ambiguo || obj.g7.g7_inventario_ambiguo !== ambiguo) problemas.push('inventario: declaración de ambigüedad inconsistente');
    if (idsG2.length) {
      const grupos = obj.g2.g2_grupos || [];
      const repartidos = grupos.flatMap(g => g.ids || []);
      if (grupos.some(g => g.n !== (g.ids || []).length) || repartidos.length !== idsG2.length ||
        new Set(repartidos).size !== repartidos.length || repartidos.some(id => !esperadosG2.has(id))) problemas.push('g2: reparto incompleto o duplicado de opciones');
      if (obj.g2.g2_n1 !== grupos.length || obj.g2.g2_n_max !== Math.max(0, ...grupos.map(g => g.n))) problemas.push('g2: conteos incompatibles con sus grupos');
    }
    for (const k of ['g7_p_T1', 'g7_p_T3']) if (obj.g7[k] && obj.g7[k].denominador !== ids.length) problemas.push('g7: denominador distinto del inventario en ' + k);
    if (obj.g7.g7_objetivos) {
      const g = obj.g7, objetivos = g.g7_objetivos, porId = new Map(objetivos.map(o => [o.id, o]));
      const mismaLista = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const mismosIds = (a, b) => mismaLista([...a].sort((x, y) => x - y), [...b].sort((x, y) => x - y));
      if (porId.size !== objetivos.length || !mismosIds(objetivos.map(o => o.id), ids)) problemas.push('g7: detalle de objetivos incompatible con el inventario');
      const fuente = new Map(inv.objetivos.map(o => [o.id, o]));
      for (const o of objetivos) {
        const f = fuente.get(o.id);
        if (!f || !mismaLista(o.bounds, f.bounds) || !mismaLista(o.ink, cajaValida(f.ink) ? f.ink : null)) problemas.push('g7: cajas del objetivo distintas de la auditoría');
        if (o.dimension_menor !== Math.min(o.bounds.w, o.bounds.h)) problemas.push('g7: dimensión menor incompatible con bounds');
        const razon = o.ink ? o.ink.w * o.ink.h / (o.bounds.w * o.bounds.h) : null;
        if (o.razon_area_tinta_bounds !== razon) problemas.push('g7: razón de tinta incompatible con sus cajas');
      }
      if (g.g7_N_bajo24 !== objetivos.filter(o => o.dimension_menor < 24).length ||
        g.g7_N_bajo24_sin_holgura !== g.g7_p_T1.afectados || g.g7_N_bajo24_sin_holgura > g.g7_N_bajo24) problemas.push('g7: conteos bajo 24 incompatibles');
      if (g.g7_W_min !== (objetivos.length ? +Math.min(...objetivos.map(o => o.dimension_menor)).toFixed(1) : null)) problemas.push('g7: W_min incompatible con sus objetivos');
      const tintaReducida = objetivos.filter(o => o.razon_area_tinta_bounds !== null && o.razon_area_tinta_bounds < 0.5);
      if (!mismaLista(g.g7_objetivos_con_tinta_reducida, tintaReducida)) problemas.push('g7: diagnóstico de tinta reducida incompatible');
      const pares = g.g7_pares_adyacentes_detalle, claves = pares.map(p => p.ids.join(':'));
      if (new Set(claves).size !== claves.length || pares.some(p => p.ids[0] >= p.ids[1] || p.ids.some(id => !aceptados.has(id)))) problemas.push('g7: par duplicado o con objetivo inexistente');
      if (g.g7_pares_adyacentes !== pares.length || g.g7_p_T2.denominador !== pares.length) problemas.push('g7: denominador de pares incompatible');
      const estrechos = pares.filter(p => p.separacion < 8).map(p => p.ids);
      if (!mismaLista(g.g7_p_T2.pares_afectados, estrechos) || g.g7_p_T2.afectados !== estrechos.length ||
        !mismosIds(g.g7_p_T2.ids_afectados || [], [...new Set(estrechos.flat())])) problemas.push('g7: pares afectados incompatibles con T2');
      if (g.g7_S_min !== (pares.length ? +Math.min(...pares.map(p => p.separacion)).toFixed(1) : null)) problemas.push('g7: S_min incompatible con sus pares');
      const familias = g.g7_familias_detalle, enFamilias = familias.flatMap(f => f.ids);
      if (g.g7_familias !== familias.length || new Set(enFamilias).size !== enFamilias.length || enFamilias.some(id => !aceptados.has(id))) problemas.push('g7: integrantes de familias incompatibles');
      for (const f of familias) {
        const miembros = f.ids.map(id => porId.get(id));
        if (miembros.some(o => !o || o.nodeName !== f.nodeName || o.parentId !== f.parentId)) { problemas.push('g7: familia con identidad incompatible'); continue; }
        const anchos = miembros.map(o => o.bounds.w), altos = miembros.map(o => o.bounds.h);
        if (f.rango_ancho !== Math.max(...anchos) - Math.min(...anchos) || f.rango_alto !== Math.max(...altos) - Math.min(...altos) ||
          f.consistente !== (f.rango_ancho <= 2 && f.rango_alto <= 2)) problemas.push('g7: consistencia de familia incompatible con sus cajas');
      }
      const inconsistentes = familias.filter(f => !f.consistente).flatMap(f => f.ids);
      if (g.g7_p_T4.denominador !== enFamilias.length || g.g7_p_T4.afectados !== inconsistentes.length ||
        !mismosIds(g.g7_p_T4.ids_afectados || [], inconsistentes) ||
        g.g7_families_consistent !== (familias.length ? inconsistentes.length === 0 : null)) problemas.push('g7: proporción o resumen de familias incompatible');
      const bajo32 = objetivos.filter(o => o.dimension_menor < 32).map(o => o.id);
      if (g.g7_p_T3.afectados !== bajo32.length || !mismosIds(g.g7_p_T3.ids_afectados || [], bajo32)) problemas.push('g7: tamaño cómodo incompatible con sus objetivos');
      const t1Ids = g.g7_p_T1.ids_afectados || [];
      if (t1Ids.length !== g.g7_p_T1.afectados || new Set(t1Ids).size !== t1Ids.length ||
        t1Ids.some(id => !porId.has(id) || porId.get(id).dimension_menor >= 24)) problemas.push('g7: objetivos afectados por holgura incompatibles');
      for (const k of ['g7_p_T1', 'g7_p_T2', 'g7_p_T3', 'g7_p_T4']) {
        const v = g[k], p = v.denominador ? +(v.afectados / v.denominador).toFixed(4) : null;
        const etiqueta = p === null ? null : p === 0 ? 'impecable' : p <= 0.1 ? 'aislado' : p <= 0.25 ? 'frecuente' : 'generalizado';
        if (v.p !== p || v.etiqueta !== etiqueta) problemas.push('g7: proporción o etiqueta incompatible con los conteos en ' + k);
      }
    }
  }
  for (const g of ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7']) {
    for (const [k, v] of Object.entries(obj[g])) {
      if (!/^g[1-7]_p_/.test(k)) continue;
      if (v.p !== null && v.denominador === 0) problemas.push(g + '.' + k + ': p no nula con denominador cero');
      if (v.afectados > v.denominador) problemas.push(g + '.' + k + ': afectados > denominador');
      if (!k.startsWith(g + '_')) problemas.push(g + '.' + k + ': el nombre no lleva su grupo');
    }
    for (const [k] of Object.entries(obj[g])) {
      if (k !== 'juicios' && !k.startsWith(g + '_')) problemas.push(g + '.' + k + ': el nombre no lleva su grupo');
    }
  }
  if (problemas.length) {
    console.log('FALLA  ' + nombre);
    for (const p of problemas.slice(0, 6)) console.log('       ' + p);
    return false;
  }
  console.log('ok     ' + nombre);
  return true;
}

/** Controles negativos: el validador tiene que rechazar, no solo aceptar. */
function selftest() {
  // Derivar en memoria: un clon limpio no depende de un measurements.json viejo
  // ni necesita escribir datos del estudio para comprobar el esquema vigente.
  const { medirCaptura } = require('../measure/measure-page');
  const base = medirCaptura(path.resolve(__dirname, '..', 'captures', 'G01'));
  const clonar = () => JSON.parse(JSON.stringify(base));
  const casos = [];

  casos.push(['medición válida', base, true]);

  let a = clonar(); delete a.g4; casos.push(['sin el bloque g4', a, false]);
  a = clonar(); delete a.g1.juicios; casos.push(['un grupo sin juicios declarados', a, false]);
  a = clonar(); delete a.g7.g7_p_T1.denominador_definicion; casos.push(['proporción sin definición de denominador', a, false]);
  a = clonar(); a.g7.g7_p_T1.afectados = a.g7.g7_p_T1.denominador + 1; casos.push(['afectados mayor que el denominador', a, false]);
  a = clonar(); a.g7.g7_p_T1.etiqueta = 'medio'; casos.push(['etiqueta fuera de la escala de tolerancia', a, false]);
  a = clonar(); a.escala_tolerancia.frecuente = 0.4; casos.push(['corte de la escala alterado', a, false]);
  a = clonar(); a.g2.n1_sin_grupo = 3; casos.push(['cantidad sin su grupo en el nombre', a, false]);
  a = clonar(); a.g1.g1_p_C1.p = 1.4; casos.push(['proporción fuera de 0 a 1', a, false]);
  a = clonar(); delete a.pagina.sha256; casos.push(['página sin los sha256 de la captura', a, false]);
  a = clonar(); delete a.inventario_accionables; casos.push(['inventario nuevo sin auditoría', a, false]);
  a = clonar(); a.inventario_accionables.objetivos.push(a.inventario_accionables.objetivos[0]); casos.push(['objetivo duplicado en el inventario', a, false]);
  a = clonar(); a.g7.g7_N_obj++; casos.push(['N_obj distinto del inventario', a, false]);
  a = clonar(); a.g2.g2_n_total++; casos.push(['n_total distinto del inventario visible', a, false]);
  a = clonar(); a.g2.g2_grupos[0].ids.push(a.g2.g2_grupos[0].ids[0]); casos.push(['opción repetida en el reparto de G2', a, false]);
  a = clonar(); a.g7.g7_no_aplicable = true; casos.push(['G7 no aplicable con objetivos', a, false]);
  a = clonar(); a.g7.g7_p_T1.denominador++; casos.push(['denominador T1 distinto del inventario', a, false]);
  a = clonar(); a.g2.g2_inventario_ambiguo = !a.g2.g2_inventario_ambiguo; casos.push(['ambigüedad distinta de la auditoría', a, false]);
  a = clonar(); delete a.g7.g7_objetivos; casos.push(['medición 1.0.3 sin detalle de objetivos', a, false]);
  a = clonar(); a.g7.g7_N_bajo24++; casos.push(['conteo bajo 24 distinto de las dimensiones', a, false]);
  a = clonar(); a.g7.g7_objetivos[0].dimension_menor++; casos.push(['dimensión menor distinta de bounds', a, false]);
  a = clonar(); a.g7.g7_p_T2.pares_afectados = []; casos.push(['T2 sin identificación de pares afectados', a, false]);
  a = clonar(); a.g7.g7_pares_adyacentes_detalle.push(a.g7.g7_pares_adyacentes_detalle[0]); casos.push(['par adyacente repetido', a, false]);
  a = clonar(); a.g7.g7_p_T2.ids_afectados = [987654]; casos.push(['T2 con extremo inexistente', a, false]);
  a = clonar(); a.g7.g7_familias_detalle[0].consistente = !a.g7.g7_familias_detalle[0].consistente; casos.push(['consistencia distinta de las dimensiones de la familia', a, false]);
  a = clonar(); a.g7.g7_objetivos[0].razon_area_tinta_bounds = 987; casos.push(['razón de tinta distinta de las cajas', a, false]);
  a = clonar(); a.g7.g7_p_T1.p = a.g7.g7_p_T1.p === 0.5 ? 0.6 : 0.5; casos.push(['proporción plausible distinta del cociente', a, false]);
  a = clonar(); a.g7.g7_p_T1.etiqueta = a.g7.g7_p_T1.etiqueta === 'impecable' ? 'generalizado' : 'impecable'; casos.push(['etiqueta válida contradictoria con la proporción', a, false]);

  let malos = 0;
  for (const [nombre, obj, esperado] of casos) {
    const got = revisarSilencioso(obj);
    const pasa = got === esperado;
    if (!pasa) malos++;
    console.log((pasa ? 'ok   ' : 'FALLA') + '  ' + nombre + ' -> ' + got + ' (esperado ' + esperado + ')');
  }
  console.log(malos === 0 ? '\n' + casos.length + '/' + casos.length + ' casos correctos.' : '\n' + malos + ' caso(s) incorrectos.');
  process.exit(malos === 0 ? 0 : 1);
}

function revisarSilencioso(obj) {
  const log = console.log;
  console.log = () => {};
  const r = revisar('', obj);
  console.log = log;
  return r;
}

const args = process.argv.slice(2);
if (args.includes('--selftest')) selftest();

let objetivos = args.filter((a) => !a.startsWith('--'));
if (args.includes('--todas')) {
  objetivos = objetivos.flatMap((root) => fs.readdirSync(root)
    .map((d) => path.join(root, d, 'measurements.json'))
    .filter((f) => fs.existsSync(f)));
}
if (!objetivos.length) { console.error('uso: node scripts/validate-measurements.js <measurements.json ...> | --todas <dir ...> | --selftest'); process.exit(1); }

let malos = 0;
for (const f of objetivos) {
  try { if (!revisar(f, JSON.parse(fs.readFileSync(f, 'utf8')))) malos++; }
  catch (e) { console.log('FALLA  ' + f + ': ' + e.message); malos++; }
}
console.log('\n' + (objetivos.length - malos) + '/' + objetivos.length + ' válidos');
process.exit(malos === 0 ? 0 : 1);
