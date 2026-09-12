#!/usr/bin/env node
'use strict';
/**
 * measure-page.js --- la capa de medicion publicada.
 *
 *   npm run measure -- captures/G01
 *   npm run measure -- captures --todas
 *
 * QUE ES. Dado un directorio de captura, produce `measurements.json` con todas las
 * cantidades que las siete rubricas necesitan. Es la mitad de codigo de la decision
 * 9: aqui se cuenta y se mide, y en ningun otro lado.
 *
 * QUE NO ES. No asigna niveles, no nombra triggers y no emite juicios. Cada grupo
 * declara al final del bloque, en `juicios`, exactamente que decision queda para el
 * agente y sobre que evidencia. Un campo que este archivo no calcule no puede
 * aparecer despues como si lo hubiera calculado.
 *
 * TODA PROPORCION LLEVA SU DENOMINADOR. `{ p, afectados, denominador,
 * denominador_definicion, etiqueta, ids_afectados }`. Una proporcion sin
 * denominador declarado no es verificable, y la etiqueta sale de la escala de
 * tolerancia de `shared/escala.md`, no de aqui.
 *
 * TODA CANTIDAD LLEVA SU GRUPO EN EL NOMBRE. `g2_n1`, `g7_W_min`. Sin eso, dos
 * grupos que miden cosas parecidas con nombres iguales terminan compartiendo un
 * numero que no significa lo mismo en los dos.
 *
 * EL LIMITE DURO DE ESTA CAPA, y conviene tenerlo presente al leer los resultados:
 * `nodes.json` NO guarda el texto de los nodos --- solo geometria, `nodeName`,
 * `class`, `id`, `href` y `alt` ---. Todo criterio que dependa de lo que la pantalla
 * DICE (que dos campos piden el mismo dato, que una opcion esta marcada como
 * recomendada, que un indicador dice "paso 2 de 3") es inalcanzable para el codigo.
 * Esta capa emite, para esos casos, la posicion exacta de los nodos implicados
 * --- `ids` y caja --- y el agente lee esa region del screenshot para entender que
 * dice, nunca para contar ni para medir. Registrar el texto exigiria recapturar las
 * treinta paginas y romperia el sello del corpus, que es una decision del equipo y
 * no de este archivo.
 *
 * LO QUE ESTA CAPA MIDE MAL, MEDIDO SOBRE LAS 54 PAGINAS DEL CORPUS Y DEL
 * CONJUNTO DE CALIBRACION. Se declara aqui porque una capa de medicion que no
 * conoce sus propios puntos ciegos los transmite a los siete puntajes:
 *
 *   - `g3_U_candidatas` vale 0 o 1 en 15 de las 54 paginas, y en 6 no se
 *     encuentra region de tarea. Puede ser correcto --- una portada con un solo
 *     bloque principal --- o puede ser que la heuristica de region falle. El
 *     agente tiene `g3_region_candidatas` para corregirla, y esa correccion es
 *     uno de los juicios declarados.
 *   - `g3_bloques_con_encabezado` toma solo tres valores distintos --- 0, 1, 2 ---
 *     porque detecta encabezados por `H1` a `H6` y buena parte de la web titula
 *     con `div` y una clase. Sub-cuenta, y el agente lo corrige sobre el canal.
 *   - Los candidatos por lexico de clase (`g2_Ap_candidatos`, `g3_X_candidatos`,
 *     `g5_indicador_paso_candidatos`) sobreestiman y subestiman a la vez: una
 *     clase llamada `promo` puede no serlo y un bloque promocional puede llamarse
 *     `seccion-3`. Son candidatos y nunca cantidades.
 *   - Ninguna de estas cifras distingue lo que la pantalla DICE. Ver el parrafo
 *     anterior sobre el texto.
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const VERSION = '1.0.0';
const TOL = 2;                 // dos medidas que difieren menos de esto cuentan como una
const AISLADO = 0.10;          // escala de tolerancia, shared/escala.md
const FRECUENTE = 0.25;
const MIN_WCAG = 24;           // minimo de area de clic
const HOLGURA = 24;            // diametro del circulo de la excepcion por separacion
const AREA_PAGINA = 0.5;       // un contenedor que cubre esto o mas es fondo de pagina
const BANNER_RATIO = 4;        // franja de 4:1 o mas ancha
const INK_THRESHOLD = 24;      // distancia RGB al fondo para contar como tinta

// ---------------------------------------------------------------- utilidades
const etiqueta = (p) => (p === null ? null : p === 0 ? 'impecable' : p <= AISLADO ? 'aislado' : p <= FRECUENTE ? 'frecuente' : 'generalizado');

function proporcion(idsAfectados, denominador, definicion) {
  const afectados = idsAfectados.length;
  const p = denominador ? +(afectados / denominador).toFixed(4) : null;
  return {
    p, afectados, denominador,
    denominador_definicion: definicion,
    etiqueta: etiqueta(p),
    ids_afectados: idsAfectados.slice(0, 50),
  };
}

function distancia(a, b) {
  const dx = Math.max(0, Math.max(a.x - (b.x + b.w), b.x - (a.x + a.w)));
  const dy = Math.max(0, Math.max(a.y - (b.y + b.h), b.y - (a.y + a.h)));
  return Math.hypot(dx, dy);
}
const solapan = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
const area = (b) => (b ? b.w * b.h : 0);
const menorDim = (b) => Math.min(b.w, b.h);
const caja = (b) => (b ? { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.w.toFixed(1), h: +b.h.toFixed(1) } : null);

const pintaFrontera = (n) => n.visibleBoundary && n.visibleBoundary.visible === true;
const esAccionable = (n) =>
  (n.isClickable || ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(n.nodeName)) &&
  n.bounds && n.bounds.w > 0 && n.bounds.h > 0;
const esEncabezado = (n) => /^H[1-6]$/.test(n.nodeName);
const clase = (n) => [(n.attributes || {}).class, (n.attributes || {}).id].filter(Boolean).join(' ');

/** Agrupa valores parecidos y devuelve los `cuantos` cubos mas poblados. */
function dominantes(vals, cuantos) {
  const cubos = [];
  for (const v of vals) {
    const c = cubos.find((x) => Math.abs(x.v - v) < TOL);
    if (c) c.n++; else cubos.push({ v, n: 1 });
  }
  return cubos.sort((a, b) => b.n - a.n).slice(0, cuantos);
}
const enAlguno = (v, cubos) => cubos.some((c) => Math.abs(c.v - v) < TOL);

// ---------------------------------------------------------- lectura de pixeles
/** Color de fondo del screenshot: el mas frecuente, cuantizado a pasos de 8. */
function fondoDe(png) {
  const cuenta = new Map();
  const { width, height, data } = png;
  for (let y = 0; y < height; y += 4) for (let x = 0; x < width; x += 4) {
    const i = (y * width + x) << 2;
    const k = ((data[i] >> 3) << 10) | ((data[i + 1] >> 3) << 5) | (data[i + 2] >> 3);
    cuenta.set(k, (cuenta.get(k) || 0) + 1);
  }
  let best = 0, bestN = -1;
  for (const [k, n] of cuenta) if (n > bestN) { bestN = n; best = k; }
  return [((best >> 10) & 31) << 3, ((best >> 5) & 31) << 3, (best & 31) << 3];
}

/** Rasgos visuales de una caja sobre el screenshot: color medio, contraste y tinta. */
function rasgosDe(png, fondo, b) {
  const x0 = Math.max(0, Math.floor(b.x)), y0 = Math.max(0, Math.floor(b.y));
  const x1 = Math.min(png.width, Math.ceil(b.x + b.w)), y1 = Math.min(png.height, Math.ceil(b.y + b.h));
  if (x1 <= x0 || y1 <= y0) return null;
  let r = 0, g = 0, bb = 0, n = 0, tinta = 0;
  const t2 = INK_THRESHOLD * INK_THRESHOLD;
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
    const i = (y * png.width + x) << 2;
    r += png.data[i]; g += png.data[i + 1]; bb += png.data[i + 2]; n++;
    const dr = png.data[i] - fondo[0], dg = png.data[i + 1] - fondo[1], db = png.data[i + 2] - fondo[2];
    if (dr * dr + dg * dg + db * db > t2) tinta++;
  }
  if (!n) return null;
  const medio = [Math.round(r / n), Math.round(g / n), Math.round(bb / n)];
  return {
    color_medio: medio,
    contraste_con_fondo: +Math.hypot(medio[0] - fondo[0], medio[1] - fondo[1], medio[2] - fondo[2]).toFixed(1),
    fraccion_tinta: +(tinta / n).toFixed(4),
    area: +area(b).toFixed(0),
  };
}

// =============================================================== G1 · agrupacion
function g1(ctx) {
  const { conInk, ancestros, agrupa } = ctx;
  const contenedores = conInk.filter(agrupa);
  const primerNivel = contenedores.filter((c) => !ancestros(c).some(agrupa));
  const grupos = primerNivel.map((c) => ({ c, hijos: conInk.filter((n) => n.parentId === c.id) }))
    .filter((g) => g.hijos.length > 0);

  if (!grupos.length) {
    return {
      g1_grupos_primer_nivel: 0,
      g1_no_aplicable: true,
      g1_no_aplicable_razon: 'ningun contenedor con frontera visible: la pantalla no delimita ninguna region comun',
      juicios: [],
    };
  }

  const otros = (g) => grupos.filter((o) => o !== g).flatMap((o) => o.hijos);

  // C1 · separacion. g_out se mide contra elementos de OTROS grupos de primer
  // nivel; medirlo contra cualquier nodo del arbol da cero en cualquier pagina
  // densa y ningun grupo puede alcanzar r >= 1.5 por construccion.
  const conR = [], fallanC1 = [];
  for (const g of grupos) {
    if (g.hijos.length < 2) continue;
    let g_in = 0;
    for (const h of g.hijos) {
      const otrosDelGrupo = g.hijos.filter((x) => x !== h);
      if (!otrosDelGrupo.length) continue;
      g_in = Math.max(g_in, Math.min(...otrosDelGrupo.map((x) => distancia(h.ink, x.ink))));
    }
    const ajenos = otros(g);
    if (!ajenos.length || g_in <= 0) continue;
    const g_out = Math.min(...g.hijos.flatMap((h) => ajenos.map((a) => distancia(h.ink, a.ink))));
    const r = +(g_out / g_in).toFixed(3);
    conR.push({ id: g.c.id, r, g_in: +g_in.toFixed(1), g_out: +g_out.toFixed(1) });
    if (r < 1.5) fallanC1.push(g.c.id);
  }

  // C2 · limites. Solo entre nodos que pintan su propia frontera: la caja de un
  // nodo que no pinta es la union de la tinta de sus descendientes y desborda a
  // su padre de forma rutinaria sin que nada se salga en la pantalla.
  const candC2 = [], desbordan = [];
  for (const h of contenedores) {
    if (h.clipped || h.position === 'fixed' || h.position === 'sticky') continue;
    const c = ancestros(h).filter(agrupa)[0];
    if (!c || !c.ink) continue;
    candC2.push(h.id);
    const dentro = h.ink.x >= c.ink.x - TOL && h.ink.y >= c.ink.y - TOL &&
      h.ink.x + h.ink.w <= c.ink.x + c.ink.w + TOL && h.ink.y + h.ink.h <= c.ink.y + c.ink.h + TOL;
    if (!dentro) desbordan.push(h.id);
  }

  // C3 · regularidad, como fraccion de bloques fuera de los cuatro ejes y los
  // tres anchos dominantes. Los numeros 4 y 3 son los de la rubrica.
  const ejes = dominantes(grupos.map((g) => g.c.ink.x), 4);
  const anchos = dominantes(grupos.map((g) => g.c.ink.w), 3);
  const fueraDeEje = grupos.filter((g) => !enAlguno(g.c.ink.x, ejes) || !enAlguno(g.c.ink.w, anchos)).map((g) => g.c.id);

  // C4 · consistencia de equivalentes, sobre alto y alineacion. Nunca sobre
  // ancho: el ancho de un enlace depende del largo de su texto.
  const conj = new Map();
  for (const n of conInk) {
    const k = n.nodeName + '#' + n.parentId;
    if (!conj.has(k)) conj.set(k, []);
    conj.get(k).push(n);
  }
  const conjuntos = [...conj.values()].filter((v) => v.length > 1);
  const divergentes = conjuntos.filter((v) => {
    const hs = v.map((n) => n.ink.h), xs = v.map((n) => n.ink.x), ys = v.map((n) => n.ink.y);
    const mismaFila = Math.max(...ys) - Math.min(...ys) <= TOL;
    const mismaColumna = Math.max(...xs) - Math.min(...xs) <= TOL;
    return (Math.max(...hs) - Math.min(...hs) > TOL) || !(mismaFila || mismaColumna);
  }).map((v) => v[0].id);

  // conflictos entre proximidad y region comun
  const enGrupos = [], conflictos = [];
  for (const g of grupos) {
    const ajenos = otros(g);
    for (const h of g.hijos) {
      const propios = g.hijos.filter((x) => x !== h);
      if (!propios.length || !ajenos.length) continue;
      enGrupos.push(h.id);
      const dPropio = Math.min(...propios.map((x) => distancia(h.ink, x.ink)));
      const dAjeno = Math.min(...ajenos.map((x) => distancia(h.ink, x.ink)));
      if (dAjeno < dPropio) conflictos.push(h.id);
    }
  }

  const anidados = contenedores.filter((c) => ancestros(c).some(agrupa)).length;

  return {
    g1_grupos_primer_nivel: grupos.length,
    g1_grupos_ids: grupos.map((g) => g.c.id),
    g1_razones_r: conR,
    g1_p_C1: proporcion(fallanC1, conR.length, 'grupos de primer nivel con mas de un elemento y r calculable'),
    g1_p_C2: proporcion(desbordan, candC2.length, 'elementos con frontera visible propia dentro de un contenedor visible'),
    g1_p_C3: proporcion(fueraDeEje, grupos.length, 'bloques de primer nivel'),
    g1_p_C4: proporcion(divergentes, conjuntos.length, 'conjuntos de equivalentes (mismo nodeName y parentId) con dos o mas miembros'),
    g1_p_conflicto: proporcion(conflictos, enGrupos.length, 'elementos que pertenecen a algun grupo de primer nivel'),
    g1_ejes_dominantes: ejes.map((e) => +e.v.toFixed(1)),
    g1_anchos_dominantes: anchos.map((a) => +a.v.toFixed(1)),
    g1_contenedores_anidados: anidados,
    g1_no_aplicable: false,
    juicios: [
      {
        campo: 'nivel',
        decide: 'El nivel, aplicando la combinacion de la escala de tolerancia a las cuatro proporciones, y el techo por conflicto.',
        evidencia: 'g1_p_C1 a g1_p_C4 con sus etiquetas, g1_p_conflicto.',
      },
      {
        campo: 'legibilidad en dos niveles (nivel 4)',
        decide: 'Si los grupos se agrupan a su vez en secciones legibles.',
        evidencia: 'g1_contenedores_anidados y la geometria de g1_grupos_ids sobre el wireframe.',
      },
    ],
  };
}

// ========================================================== G2 · decision
function g2(ctx) {
  const { nodos, ancestros, agrupaNoFondo, mediana } = ctx;
  const acc = nodos.filter((n) => esAccionable(n) && n.ink);
  if (!acc.length) {
    return {
      g2_n_total: 0,
      g2_no_aplicable: true,
      g2_no_aplicable_razon: 'n_total = 0: la pantalla no presenta ningun elemento accionable',
      juicios: [],
    };
  }

  const porContenedor = new Map(), sueltos = [];
  for (const a of acc) {
    const cadena = ancestros(a).filter(agrupaNoFondo);
    const c = cadena.length ? cadena[cadena.length - 1] : null;
    if (c) { if (!porContenedor.has(c.id)) porContenedor.set(c.id, []); porContenedor.get(c.id).push(a); }
    else sueltos.push(a);
  }
  let gruposSueltos = [];
  if (sueltos.length) {
    const vecinos = sueltos.map((a) => {
      const ds = sueltos.filter((b) => b !== a).map((b) => distancia(a.ink, b.ink));
      return ds.length ? Math.min(...ds) : 0;
    });
    const umbral = mediana(vecinos) || 0;
    const g = sueltos.map((x) => [x]);
    let cambio = true;
    while (cambio) {
      cambio = false;
      fuera:
      for (let i = 0; i < g.length; i++) for (let j = i + 1; j < g.length; j++) {
        if (g[i].some((a) => g[j].some((b) => distancia(a.ink, b.ink) <= umbral))) {
          g[i] = g[i].concat(g[j]); g.splice(j, 1); cambio = true; break fuera;
        }
      }
    }
    gruposSueltos = g;
  }
  const grupos = [...porContenedor.values(), ...gruposSueltos];
  const areas = acc.map((a) => ({ id: a.id, a: area(a.ink) })).sort((x, y) => y.a - x.a);

  // Candidatos a apoyo de decision por lexico de atributos. Es un proxy y se
  // reporta como candidato, nunca como Ap: quien decide si un filtro es un apoyo
  // de decision es el agente, con la region a la vista.
  const LEX = /(filtr|filter|orden|sort|recomend|recommend|destac|featured|compar|default)/i;
  const apCand = acc.filter((a) => a.nodeName === 'SELECT' || LEX.test(clase(a) + ' ' + ((a.attributes || {})['aria-label'] || '')))
    .map((a) => ({ id: a.id, nodeName: a.nodeName, class: clase(a).slice(0, 60), caja: caja(a.ink) }));

  return {
    g2_n_total: acc.length,
    g2_n1: grupos.length,
    g2_n_max: grupos.length ? Math.max(...grupos.map((g) => g.length)) : 0,
    g2_fraccion_agrupada: +((acc.length - sueltos.length) / acc.length).toFixed(3),
    g2_grupos: grupos.map((g) => ({ n: g.length, ids: g.map((x) => x.id).slice(0, 30) })),
    g2_areas_mayores: areas.slice(0, 5),
    g2_razon_area_1_2: areas.length > 1 && areas[1].a > 0 ? +(areas[0].a / areas[1].a).toFixed(2) : null,
    g2_Ap_candidatos: apCand,
    g2_no_aplicable: false,
    juicios: [
      {
        campo: 'dominancia',
        decide: 'Si una accion domina la pantalla. El codigo entrega areas y su razon; el peso visual no es solo area.',
        evidencia: 'g2_areas_mayores, g2_razon_area_1_2, y esas cajas sobre el canal.',
      },
      {
        campo: 'Ap',
        decide: 'Cuales de los candidatos son de verdad apoyos de decision --- filtro, orden, recomendado, valor por defecto, tabla comparativa ---.',
        evidencia: 'g2_Ap_candidatos con su caja; el agente lee esa region para entender que ofrece, no para contar.',
      },
      {
        campo: 'nivel',
        decide: 'El nivel contra las anclas de n1, la agrupacion, la dominancia y Ap.',
        evidencia: 'g2_n1, g2_n_max, g2_fraccion_agrupada y los dos juicios anteriores.',
      },
    ],
  };
}

// ============================================= G3 · capacidad y segmentacion
function g3(ctx) {
  const { conInk, nodos, agrupa, ancestros, viewport } = ctx;
  const esCromo = (n) => /(header|nav|footer|menu|banner|cookie)/i.test(clase(n)) || ['HEADER', 'NAV', 'FOOTER'].includes(n.nodeName);
  // La region de la tarea NO se busca entre los contenedores que agrupan: el
  // filtro de fondo de pagina excluye todo lo que cubra medio viewport, y el area
  // principal de una pagina casi siempre lo cubre. Con ese filtro, U valia 0 o 1
  // en 28 de 54 paginas porque la region elegida era un recuadro lateral.
  // Aqui se busca entre las marcas de region --- MAIN, ARTICLE, SECTION --- y, si
  // no hay ninguna, entre los bloques grandes que no son cromo, descartando el
  // envoltorio de pagina completa.
  const areaVp = viewport.width * viewport.height;
  const esEnvoltorioTotal = (n) => ['HTML', 'BODY', '#document'].includes(n.nodeName) || area(n.ink) > areaVp * 0.92;
  const marcas = conInk.filter((n) => ['MAIN', 'ARTICLE', 'SECTION'].includes(n.nodeName) && !esEnvoltorioTotal(n) && !esCromo(n));
  const grandes = conInk.filter((n) => !esEnvoltorioTotal(n) && !esCromo(n) && area(n.ink) > areaVp * 0.15 &&
    !ancestros(n).some((a) => ['MAIN', 'ARTICLE', 'SECTION'].includes(a.nodeName)));
  const candidatosRegion = (marcas.length ? marcas : grandes).sort((a, b) => area(b.ink) - area(a.ink));
  const region = candidatosRegion[0] || null;

  const dentroDe = (r, n) => r && n !== r && ancestros(n).some((a) => a.id === r.id);
  const sub = region ? conInk.filter((n) => dentroDe(region, n)) : [];

  // Desenvolver las cadenas de un solo hijo. Un contenedor cuyo unico hijo con
  // tinta es otro contenedor no es una unidad de tarea: es envoltorio. Sin este
  // paso, U valia 0 o 1 en casi todas las paginas --- el patron habitual es
  // main > div > div > contenido --- y una cantidad que no varia no mide nada.
  // Las unidades son los primeros descendientes CON TINTA, atravesando los nodos
  // que no pintan nada: filtrar por hijo directo con tinta daba cero o uno en 28
  // de las 54 paginas, porque el patron habitual es main > div > div > contenido
  // y los envoltorios intermedios no tienen tinta propia.
  const hijosDe = (n) => nodos.filter((m) => m.parentId === n.id);
  function primerasUnidades(n, prof = 0) {
    if (prof > 14) return [];
    const out = [];
    for (const h of hijosDe(n)) {
      if (h.ink && h.ink.w > 0 && h.ink.h > 0) out.push(h);
      else out.push(...primerasUnidades(h, prof + 1));
    }
    return out;
  }
  let unidades = region ? primerasUnidades(region) : [];
  let envoltorios_atravesados = 0;
  while (unidades.length === 1 && envoltorios_atravesados < 12) {
    const siguiente = primerasUnidades(unidades[0]);
    if (!siguiente.length) break;
    unidades = siguiente; envoltorios_atravesados++;
  }

  const bloquesConEncabezado = unidades.map((u) => ({
    id: u.id,
    hijos: conInk.filter((n) => n.parentId === u.id).length,
    tiene_encabezado: sub.some((n) => esEncabezado(n) && (n.parentId === u.id || ancestros(n).some((a) => a.id === u.id))),
    caja: caja(u.ink),
  }));

  const pegajosos = nodos.filter((n) => n.position === 'fixed' || n.position === 'sticky')
    .map((n) => ({ id: n.id, nodeName: n.nodeName, position: n.position, caja: caja(n.bounds) }));

  // Candidatos a elemento ajeno: dentro de la region de la tarea y con lexico de
  // promocion o contenido relacionado. Candidatos, no X: quien decide si algo
  // pertenece a la tarea es el agente.
  const LEX_AJENO = /(promo|publicidad|ad[-_]|banner|newsletter|suscri|subscribe|relacionad|related|recomend|sidebar|widget)/i;
  const ajenosCand = unidades.filter((u) => LEX_AJENO.test(clase(u)))
    .map((u) => ({ id: u.id, class: clase(u).slice(0, 60), caja: caja(u.ink) }));

  // Evidencia de dato fuera de vista: filas cuyo encabezado de tabla o columna
  // quedo fuera del viewport mientras ellas siguen presentes.
  const tablas = nodos.filter((n) => ['TABLE', 'THEAD', 'TH'].includes(n.nodeName))
    .map((n) => ({ id: n.id, nodeName: n.nodeName, caja: caja(n.bounds), dentro_del_viewport: n.bounds.y >= 0 && n.bounds.y < viewport.height }));

  return {
    g3_region_tarea: region ? { id: region.id, caja: caja(region.ink), fraccion_viewport: +(area(region.ink) / (viewport.width * viewport.height)).toFixed(3) } : null,
    g3_region_candidatas: candidatosRegion.slice(0, 5).map((c) => ({ id: c.id, caja: caja(c.ink), class: clase(c).slice(0, 50) })),
    g3_U_candidatas: bloquesConEncabezado.length,
    g3_envoltorios_atravesados: envoltorios_atravesados,
    g3_unidades: bloquesConEncabezado.slice(0, 40),
    g3_B_mayor: bloquesConEncabezado.length ? Math.max(...bloquesConEncabezado.map((b) => b.hijos)) : 0,
    g3_bloques_con_encabezado: bloquesConEncabezado.filter((b) => b.tiene_encabezado).length,
    g3_pegajosos: pegajosos.slice(0, 20),
    g3_X_candidatos: ajenosCand,
    g3_tablas: tablas.slice(0, 20),
    juicios: [
      {
        campo: 'U',
        decide: 'Cuales de las unidades candidatas son unidades de tarea reales --- algo que el usuario lee o decide por separado --- y cuales son solo contenedores.',
        evidencia: 'g3_unidades con su caja y cuantos hijos tiene cada una, sobre el canal.',
      },
      { campo: 'region de la tarea', decide: 'Confirmar o corregir la region propuesta por area.', evidencia: 'g3_region_tarea y g3_region_candidatas.' },
      { campo: 'H', decide: 'Si algun bloque mezcla clases distintas de contenido.', evidencia: 'g3_unidades y lo que el canal muestra dentro de cada caja.' },
      { campo: 'V', decide: 'Si algun campo o accion exige un dato que no esta visible a la vez que el.', evidencia: 'g3_tablas, g3_pegajosos y el canal. Un encabezado sticky resuelve el caso y por eso se reporta position.' },
      { campo: 'X', decide: 'Cuales candidatos son de verdad ajenos a la tarea.', evidencia: 'g3_X_candidatos con su caja; el lexico de clase solo propone.' },
    ],
  };
}

// ============================================== G4 · saliencia (screenshot)
function g4(ctx) {
  const { conInk, png, fondo, viewport } = ctx;
  if (!png) return { g4_sin_screenshot: true, juicios: [] };

  // Conjuntos de pares: hermanos con el mismo nodeName, tres o mas, con caja.
  const porPadre = new Map();
  for (const n of conInk) {
    const k = n.nodeName + '#' + n.parentId;
    if (!porPadre.has(k)) porPadre.set(k, []);
    porPadre.get(k).push(n);
  }
  const conjuntos = [...porPadre.entries()].filter(([, v]) => v.length >= 3)
    .sort((a, b) => b[1].length - a[1].length).slice(0, 8)
    .map(([k, v], idx) => {
      const miembros = v.map((n) => ({ id: n.id, caja: caja(n.ink), rasgos: rasgosDe(png, fondo, n.ink) })).filter((m) => m.rasgos);
      if (miembros.length < 3) return null;
      const cs = miembros.map((m) => m.rasgos.contraste_con_fondo);
      const as = miembros.map((m) => m.rasgos.area);
      const medC = cs.slice().sort((x, y) => x - y)[cs.length >> 1];
      const medA = as.slice().sort((x, y) => x - y)[as.length >> 1];
      // Atipico: se aparta de la mediana de su conjunto en color o en area.
      const atipicos = miembros.filter((m) =>
        Math.abs(m.rasgos.contraste_con_fondo - medC) > 40 || (medA > 0 && m.rasgos.area / medA > 1.4)
      ).map((m) => m.id);
      return {
        conjunto: 'S' + (idx + 1), clave: k, n: miembros.length,
        mediana_contraste: +medC.toFixed(1), mediana_area: Math.round(medA),
        atipicos_geometricos: atipicos, miembros: miembros.slice(0, 20),
      };
    }).filter(Boolean);

  const bannerCand = conInk.filter((n) => {
    const b = n.ink; if (!b || b.w < 200) return false;
    const franja = b.w / Math.max(1, b.h) >= BANNER_RATIO && b.w >= viewport.width * 0.75;
    const columna = b.h / Math.max(1, b.w) >= 2 && b.x > viewport.width * 0.6;
    return franja || columna;
  }).slice(0, 12).map((n) => ({ id: n.id, nodeName: n.nodeName, caja: caja(n.ink), class: clase(n).slice(0, 50), contiene_accionables: conInk.filter((m) => esAccionable(m) && solapan(m.ink, n.ink)).length }));

  const cromoCand = conInk.filter((n) => {
    const r = rasgosDe(png, fondo, n.ink);
    return r && r.contraste_con_fondo < 30 && r.fraccion_tinta > 0.02 && area(n.ink) > 2000;
  }).slice(0, 12).map((n) => ({ id: n.id, caja: caja(n.ink), rasgos: rasgosDe(png, fondo, n.ink) }));

  return {
    g4_fondo_pagina: fondo,
    g4_conjuntos_pares_total: [...porPadre.values()].filter((v) => v.length >= 3).length,
    g4_conjuntos_pares: conjuntos,
    g4_banner_candidatos: bannerCand,
    g4_cromo_candidatos: cromoCand,
    juicios: [
      { campo: 'conjunto principal', decide: 'Cual de los conjuntos de pares es el principal de la pantalla.', evidencia: 'g4_conjuntos_pares con su tamaño y su geometria.' },
      { campo: 'I', decide: 'Cuantos miembros rompen de verdad el patron visual. El codigo marca los que se apartan en color o area; peso tipografico y borde los juzga el agente sobre el screenshot.', evidencia: 'atipicos_geometricos y los rasgos de cada miembro.' },
      { campo: 'P', decide: 'Si el aislado coincide con lo que la seccion promueve. Exige leer lo que la pantalla dice, y por eso es juicio.', evidencia: 'la region del aislado en el screenshot.' },
      { campo: 'Bn', decide: 'Cuales candidatos con forma de banner llevan navegacion o tarea, y no publicidad real.', evidencia: 'g4_banner_candidatos con cuantos accionables contienen.' },
      { campo: 'Cn', decide: 'Cual contenido sustantivo esta tratado como cromo.', evidencia: 'g4_cromo_candidatos con su contraste medido.' },
    ],
  };
}

// ============================================== G5 · posicion y progreso
function g5(ctx) {
  const { conInk, nodos } = ctx;
  const porPadre = new Map();
  for (const n of conInk) {
    const k = n.nodeName + '#' + n.parentId;
    if (!porPadre.has(k)) porPadre.set(k, []);
    porPadre.get(k).push(n);
  }
  // Una lista no es cualquier conjunto de hermanos: es una secuencia que el
  // usuario recorre en orden, y eso exige alineacion. Sin esta condicion, G5
  // extraia exactamente los mismos conjuntos que G4 --- el conteo coincidia en
  // las 54 paginas --- y dos grupos que miden cosas distintas compartian numero.
  const alineados = (v) => {
    const xs = v.map((n) => n.ink.x), ys = v.map((n) => n.ink.y);
    const columna = Math.max(...xs) - Math.min(...xs) <= 4;
    const fila = Math.max(...ys) - Math.min(...ys) <= 4;
    return columna || fila;
  };
  const listas = [...porPadre.values()].filter((v) => v.length >= 3 && alineados(v)).map((v) => {
    const ord = v.slice().sort((a, b) => (a.ink.y - b.ink.y) || (a.ink.x - b.ink.x));
    const primero = ord[0], ultimo = ord[ord.length - 1];
    const cuerpo = ord.slice(1, -1);
    const dif = (x) => {
      if (!cuerpo.length) return null;
      const hs = cuerpo.map((c) => c.ink.h), ws = cuerpo.map((c) => c.ink.w);
      const medH = hs.sort((a, b) => a - b)[hs.length >> 1], medW = ws.sort((a, b) => a - b)[ws.length >> 1];
      return {
        alto_vs_cuerpo: +(x.ink.h / (medH || 1)).toFixed(2),
        ancho_vs_cuerpo: +(x.ink.w / (medW || 1)).toFixed(2),
        pinta_frontera_propia: pintaFrontera(x),
        separado: cuerpo.length > 1 ? +(distancia(x.ink, ord[ord === cuerpo ? 0 : 1].ink)).toFixed(1) : null,
      };
    };
    return {
      id_padre: ord[0].parentId, n: ord.length, nodeName: ord[0].nodeName,
      orientacion: Math.abs(ord[0].ink.y - ultimo.ink.y) > Math.abs(ord[0].ink.x - ultimo.ink.x) ? 'vertical' : 'horizontal',
      primero: { id: primero.id, caja: caja(primero.ink), rasgos: dif(primero) },
      ultimo: { id: ultimo.id, caja: caja(ultimo.ink), rasgos: dif(ultimo) },
      area_total: Math.round(ord.reduce((s, x) => s + area(x.ink), 0)),
    };
  }).sort((a, b) => b.area_total - a.area_total).slice(0, 8);

  const LEX_PASO = /(step|paso|wizard|progress|breadcrumb|migaja|stepper|checkout)/i;
  const pasoCand = nodos.filter((n) => LEX_PASO.test(clase(n)) || n.nodeName === 'OL')
    .slice(0, 10).map((n) => ({ id: n.id, nodeName: n.nodeName, class: clase(n).slice(0, 60), caja: caja(n.bounds) }));

  return {
    g5_listas_total: [...porPadre.values()].filter((v) => v.length >= 3 && alineados(v)).length,
    g5_listas: listas,
    g5_lista_principal_sugerida: listas.length ? listas[0].id_padre : null,
    g5_indicador_paso_candidatos: pasoCand,
    juicios: [
      { campo: 'lista principal', decide: 'Cual lista es la de mayor peso en la jerarquia. El codigo propone la de mayor area.', evidencia: 'g5_listas con su tamaño, orientacion y area.' },
      { campo: 'J_inicio y J_final', decide: 'Si la posicion inicial y la final estan diferenciadas del cuerpo.', evidencia: 'los rasgos medidos de primero y ultimo contra la mediana del cuerpo, mas el canal.' },
      { campo: 'Q', decide: 'Si la pantalla es un paso de un proceso. Exige leer lo que dice el indicador.', evidencia: 'g5_indicador_paso_candidatos con su caja.' },
      { campo: 'G_nombra, G_actual, G_forma', decide: 'Si el indicador nombra los pasos, marca el actual y distingue completado de pendiente por forma y no solo por color.', evidencia: 'la region del indicador; sobre wireframe, una distincion que solo existia en color no aparece y se marca evidence_insufficient.' },
    ],
  };
}

// ============================================= G6 · economia y convencion
function g6(ctx) {
  const { conInk, nodos, viewport } = ctx;
  const en = (n, zx, zy, zw, zh) => n.bounds && n.bounds.x < zx + zw && n.bounds.x + n.bounds.w > zx &&
    n.bounds.y < zy + zh && n.bounds.y + n.bounds.h > zy;
  const franjaSuperior = (n) => en(n, 0, 0, viewport.width, 140);
  const izquierda = (n) => n.bounds && n.bounds.x < viewport.width * 0.33;
  const derecha = (n) => n.bounds && n.bounds.x + n.bounds.w > viewport.width * 0.67;

  const campos = nodos.filter((n) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(n.nodeName))
    .map((n) => ({ id: n.id, nodeName: n.nodeName, caja: caja(n.bounds) }));
  const botones = nodos.filter((n) => n.nodeName === 'BUTTON' || (n.isClickable && /(btn|button)/i.test(clase(n))))
    .map((n) => ({ id: n.id, caja: caja(n.bounds) }));

  // Pares de botones adyacentes: la convencion K6 habla del orden dentro del par.
  const pares = [];
  for (let i = 0; i < botones.length; i++) for (let j = i + 1; j < botones.length; j++) {
    const a = botones[i].caja, b = botones[j].caja;
    if (Math.abs(a.y - b.y) <= 8 && distancia(a, b) < 60) pares.push({ izquierda: a.x < b.x ? botones[i].id : botones[j].id, derecha: a.x < b.x ? botones[j].id : botones[i].id });
  }

  const slots = {
    K1_logo: conInk.filter((n) => n.nodeName === 'IMG' && franjaSuperior(n) && izquierda(n))
      .slice(0, 5).map((n) => ({ id: n.id, caja: caja(n.bounds), href_del_ancestro: null, alt: ((n.attributes || {}).alt || '').slice(0, 40) })),
    K2_buscador: nodos.filter((n) => n.nodeName === 'INPUT' && franjaSuperior(n)).slice(0, 5).map((n) => ({ id: n.id, caja: caja(n.bounds) })),
    K3_cuenta_carrito: nodos.filter((n) => esAccionable(n) && franjaSuperior(n) && derecha(n)).slice(0, 8).map((n) => ({ id: n.id, caja: caja(n.bounds), class: clase(n).slice(0, 40) })),
    K4_navegacion: nodos.filter((n) => n.nodeName === 'NAV' || /(^|\s)(nav|menu)/i.test(clase(n))).slice(0, 5).map((n) => ({ id: n.id, caja: caja(n.bounds), franja_superior: franjaSuperior(n), columna_izquierda: izquierda(n) })),
    K5_campos: campos.slice(0, 15),
    K6_pares_de_botones: pares.slice(0, 10),
    K7_pie: conInk.filter((n) => n.nodeName === 'FOOTER' || /footer/i.test(clase(n))).slice(0, 3).map((n) => ({ id: n.id, caja: caja(n.ink) })),
    K8_ruta: nodos.filter((n) => /(breadcrumb|migaja)/i.test(clase(n))).slice(0, 3).map((n) => ({ id: n.id, caja: caja(n.bounds) })),
  };

  // Candidatos a redundancia: contenedores con frontera visible y sin contenido
  // con tinta dentro, y separadores decorativos de una sola dimension.
  const vaciosTodos = conInk.filter((n) => pintaFrontera(n) && !conInk.some((m) => m.parentId === n.id))
    .filter((n) => area(n.ink) > 400);
  const vacios = vaciosTodos.slice(0, 15).map((n) => ({ id: n.id, caja: caja(n.ink) }));
  const separadoresTodos = conInk.filter((n) => n.ink && (n.ink.h <= 3 || n.ink.w <= 3) && Math.max(n.ink.w, n.ink.h) > 40);
  const separadores = separadoresTodos.slice(0, 15).map((n) => ({ id: n.id, caja: caja(n.ink) }));

  return {
    g6_campos_de_entrada: campos.length,
    g6_botones: botones.length,
    g6_slots_convencion: slots,
    g6_contenedores_vacios_total: vaciosTodos.length,
    g6_contenedores_vacios: vacios,
    g6_separadores_total: separadoresTodos.length,
    g6_separadores: separadores,
    g6_catalogo_convenciones: 'v1, 2026-09-10, ocho convenciones K1..K8 en la rubrica de G6',
    juicios: [
      { campo: 'R', decide: 'Cuanta redundancia hay: dato repetido, contenedor vacio con peso, separador puramente decorativo. El dato repetido EXIGE leer el texto y por eso es juicio, no conteo.', evidencia: 'g6_contenedores_vacios, g6_separadores y las regiones del canal.' },
      { campo: 'T', decide: 'Cuantas operaciones traslada la pantalla al usuario que el sistema podria resolver.', evidencia: 'g6_campos_de_entrada y las regiones donde hay campos y resultados.' },
      { campo: 'K_ap y K', decide: 'Cuales de las ocho convenciones aplican a esta pantalla y cuales de las aplicables estan rotas sin razon funcional visible. El codigo entrega la evidencia posicional de cada ranura; la lectura de que hay en ella es del agente.', evidencia: 'g6_slots_convencion, ranura por ranura.' },
    ],
  };
}

// ============================================================ G7 · targeting
function g7(ctx) {
  const { nodos } = ctx;
  const objs = nodos.filter(esAccionable);
  if (!objs.length) {
    return { g7_N_obj: 0, g7_no_aplicable: true, g7_no_aplicable_razon: 'N_obj = 0: la pantalla no contiene ningun elemento interactivo', juicios: [] };
  }
  const menores = objs.map((o) => menorDim(o.bounds));
  const bajo24 = objs.filter((o) => menorDim(o.bounds) < MIN_WCAG);

  let paresAdyacentes = 0; const estrechos = []; let S_min = Infinity;
  for (let i = 0; i < objs.length; i++) for (let j = i + 1; j < objs.length; j++) {
    const a = objs[i].bounds, b = objs[j].bounds;
    if (solapan(a, b)) continue;
    const d = distancia(a, b);
    const menor = area(a) <= area(b) ? a : b;
    if (d < Math.max(menor.w, menor.h)) {
      paresAdyacentes++;
      if (d < 8) estrechos.push(objs[i].id);
      if (d < S_min) S_min = d;
    }
  }
  if (!Number.isFinite(S_min)) S_min = null;

  const centro = (b) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2, r: HOLGURA / 2 });
  const tocaCaja = (c, b) => {
    const cx = Math.max(b.x, Math.min(c.x, b.x + b.w)), cy = Math.max(b.y, Math.min(c.y, b.y + b.h));
    return Math.hypot(c.x - cx, c.y - cy) < c.r;
  };
  const sinHolgura = bajo24.filter((o) => {
    const c = centro(o.bounds);
    return objs.some((x) => x !== o && tocaCaja(c, x.bounds)) ||
      bajo24.some((x) => x !== o && Math.hypot(c.x - centro(x.bounds).x, c.y - centro(x.bounds).y) < HOLGURA);
  }).map((o) => o.id);

  const fam = new Map();
  for (const o of objs) {
    const k = o.nodeName + '#' + o.parentId;
    if (!fam.has(k)) fam.set(k, []);
    fam.get(k).push(o);
  }
  const familias = [...fam.values()].filter((v) => v.length > 1);
  const enFamilia = familias.flatMap((v) => v.map((o) => o.id));
  const inconsistentes = familias.filter((v) => {
    const ms = v.map((o) => menorDim(o.bounds));
    return Math.max(...ms) - Math.min(...ms) > TOL;
  }).flatMap((v) => v.map((o) => o.id));

  const areas = objs.map((o) => ({ id: o.id, a: area(o.bounds) })).sort((x, y) => y.a - x.a);

  return {
    g7_N_obj: objs.length,
    g7_W_min: +Math.min(...menores).toFixed(1),
    g7_S_min: S_min === null ? null : +S_min.toFixed(1),
    g7_pares_adyacentes: paresAdyacentes,
    g7_p_T1: proporcion(sinHolgura, objs.length, 'todos los objetivos accionables'),
    g7_p_T2: proporcion(estrechos, paresAdyacentes, 'pares de objetivos adyacentes'),
    g7_p_T3: proporcion(objs.filter((o) => menorDim(o.bounds) < 32).map((o) => o.id), objs.length, 'todos los objetivos accionables'),
    g7_p_T4: proporcion(inconsistentes, enFamilia.length, 'objetivos que pertenecen a una familia de dos o mas'),
    g7_familias: familias.length,
    g7_areas_mayores: areas.slice(0, 5),
    g7_razon_area_1_2: areas.length > 1 && areas[1].a > 0 ? +(areas[0].a / areas[1].a).toFixed(2) : null,
    g7_no_aplicable: false,
    juicios: [
      { campo: 'nivel', decide: 'El nivel, aplicando la combinacion de la escala de tolerancia a las cuatro proporciones.', evidencia: 'g7_p_T1 a g7_p_T4 con sus etiquetas.' },
      { campo: 'objetivo primario (nivel 4)', decide: 'Si el objetivo primario es visiblemente mayor que los secundarios.', evidencia: 'g7_areas_mayores y g7_razon_area_1_2 sobre el canal.' },
    ],
  };
}

// ==================================================================== driver
function medirCaptura(dir) {
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
  const nodos = JSON.parse(fs.readFileSync(path.join(dir, 'nodes.json'), 'utf8'));
  const viewport = meta.viewport;
  const areaViewport = viewport.width * viewport.height;

  const porId = new Map(nodos.map((n) => [n.id, n]));
  const ancestros = (n) => { const o = []; let p = porId.get(n.parentId), g = 0; while (p && g++ < 200) { o.push(p); p = porId.get(p.parentId); } return o; };
  const esFondo = (n) => ['HTML', 'BODY', '#document'].includes(n.nodeName) || (n.ink && area(n.ink) / areaViewport >= AREA_PAGINA);
  const agrupa = (n) => pintaFrontera(n) && !esFondo(n);
  const mediana = (xs) => { if (!xs.length) return null; const a = [...xs].sort((p, q) => p - q); const m = a.length >> 1; return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2; };
  const conInk = nodos.filter((n) => n.ink && n.ink.w > 0 && n.ink.h > 0);

  let png = null, fondo = null;
  const shot = path.join(dir, 'screenshot.png');
  if (fs.existsSync(shot)) { png = PNG.sync.read(fs.readFileSync(shot)); fondo = fondoDe(png); }

  const ctx = { nodos, conInk, porId, ancestros, agrupa, agrupaNoFondo: agrupa, mediana, viewport, png, fondo };

  return {
    schema_version: VERSION,
    medido_en: new Date().toISOString(),
    pagina: {
      id: path.basename(dir),
      url: meta.url,
      capturada_en: meta.capturedAt,
      viewport,
      sha256: meta.sha256,
      sanity_ok: meta.sanity ? meta.sanity.ok : null,
      consent_limpio: meta.consent ? meta.consent.limpio !== false : null,
    },
    nodos: meta.nodes,
    escala_tolerancia: { aislado: AISLADO, frecuente: FRECUENTE, fuente: 'shared/escala.md' },
    g1: g1(ctx), g2: g2(ctx), g3: g3(ctx), g4: g4(ctx), g5: g5(ctx), g6: g6(ctx), g7: g7(ctx),
  };
}

module.exports = { medirCaptura, VERSION };

if (require.main === module) {
  const args = process.argv.slice(2);
  const objetivo = args.find((a) => !a.startsWith('--'));
  if (!objetivo) { console.error('uso: npm run measure -- <directorio-de-captura> [--todas]'); process.exit(1); }

  const dirs = args.includes('--todas')
    ? fs.readdirSync(objetivo).filter((d) => fs.existsSync(path.join(objetivo, d, 'nodes.json'))).sort().map((d) => path.join(objetivo, d))
    : [objetivo];

  let n = 0;
  for (const d of dirs) {
    const m = medirCaptura(d);
    fs.writeFileSync(path.join(d, 'measurements.json'), JSON.stringify(m, null, 2) + '\n');
    console.log(path.basename(d).padEnd(8) +
      ' G1 grupos ' + String(m.g1.g1_grupos_primer_nivel).padStart(3) +
      ' | G2 n1 ' + String(m.g2.g2_n1 ?? '-').padStart(3) +
      ' | G3 U ' + String(m.g3.g3_U_candidatas).padStart(3) +
      ' | G4 conj ' + String((m.g4.g4_conjuntos_pares || []).length).padStart(2) +
      ' | G5 listas ' + String((m.g5.g5_listas || []).length).padStart(2) +
      ' | G6 ranuras ' + String(Object.values(m.g6.g6_slots_convencion).filter((v) => v.length).length).padStart(2) +
      ' | G7 obj ' + String(m.g7.g7_N_obj).padStart(3));
    n++;
  }
  console.log('\n' + n + ' measurements.json escritos');
}
