#!/usr/bin/env node
/**
 * pilot-calibracion.js --- piloto de calibracion de las rubricas.
 *
 * QUE RESPONDE. Una sola pregunta: cada rubrica, ejecutada, reparte su escala o
 * se apelotona en un nivel. Una rubrica cuyos niveles medios nunca se asignan se
 * ve en los datos igual que una que discrimina bien --- acuerdo alto --- y la
 * unica forma de distinguirlas es correrla y mirar la distribucion.
 *
 * SOBRE QUE. `corpus/calibracion-v1.csv`, veinticinco paginas fuera del corpus,
 * capturadas con el mismo pipeline. NO sobre el corpus: correr el instrumento
 * sobre el corpus antes de sellarlo destruye el sellado.
 *
 * QUE IMPLEMENTA Y QUE NO. Solo G1, G2 y G7, que son las tres rubricas cuyas
 * anclas son decidibles sobre `nodes.json`. G3, G4, G5 y G6 anclan en juicios
 * semanticos --- que cuenta como unidad de tarea, que es un elemento ajeno, que
 * convencion aplica, cual es el aislado visual --- que no se deciden sobre el
 * arbol de layout y que solo tendran ejecucion cuando existan sus skills. El
 * piloto de esas cuatro se corre sobre estas mismas capturas, entonces.
 *
 * QUE ES ESTE ARCHIVO Y QUE NO ES. Es una implementacion PROVISIONAL de la capa
 * de medicion de tres rubricas, escrita para poder correr el piloto antes de M3.
 * No es la skill publicada. Por lo tanto la distribucion que reporta es una
 * propiedad del par (rubrica, esta implementacion): una distribucion degenerada
 * puede ser culpa de la rubrica o de la convencion que esta implementacion
 * adopto donde la rubrica dejaba un hueco. Cada una de esas convenciones esta
 * marcada abajo con CONVENCION y sale listada en el reporte.
 *
 *   node scripts/pilot-calibracion.js calibracion
 */
const fs = require('fs');
const path = require('path');

const TOL = 2;        // dos medidas que difieren menos de esto cuentan como una (G1, paso 3)
const MIN_WCAG = 24;  // minimo de area de clic, G7
const HOLGURA = 24;   // diametro del circulo de la excepcion por separacion, G7

// Toda decision que la rubrica deja abierta y esta implementacion tuvo que
// cerrar. Se reporta junto a la distribucion: sin esta lista, la distribucion
// parece una propiedad de la rubrica sola.
const CONVENCIONES = [
  ['G1+G2/fondo', 'Un contenedor cuya tinta cubre la mitad del viewport o mas, y HTML/BODY, no cuentan como grupo: son el fondo de la pagina. Sin esta exclusion n1 colapsa a uno.'],
  ['G1/C4', 'La consistencia de equivalentes se evalua sobre alto y alineacion, no sobre ancho: el ancho de un enlace depende de su texto.'],
  ['G1/C2', 'Los limites se evaluan como desbordamiento geometrico: un elemento cuya caja ink sale de la caja ink de su contenedor visible. La rubrica dice "el contenedor que su funcion indica", que es semantico.'],
  ['G1/N4', 'La legibilidad en mas de un nivel se evalua como: existe un contenedor visible que contiene otros contenedores visibles, y la separacion entre secciones supera la separacion interna de sus grupos.'],
  ['G2/n_total', 'Accionable = isClickable, mas INPUT, SELECT, TEXTAREA y BUTTON aunque el motor no los marque.'],
  ['G2/grupos', 'El grupo de un accionable es su ancestro mas externo con visibleBoundary.visible === true. Los que no tienen ninguno se agrupan por enlace simple sobre sus cajas ink, con umbral igual a la mediana de sus distancias al vecino mas cercano.'],
  ['G2/dominancia', 'Una accion domina cuando el accionable de mayor area tiene al menos el doble de area que el segundo. Es la convencion mas debil de las tres rubricas: el peso visual del que habla la rubrica no es solo area.'],
  ['G2/Ap', 'Los apoyos de decision se detectan por lexico en class/id/aria-label: filtro, orden, recomendado, destacado, comparar, mas los nodos SELECT. Es un proxy lexico y sobreestima tanto como subestima.'],
  ['G2/N0', 'La rama "ninguna accion primaria distinguible en una pantalla cuyo proposito exige una decision" no se implementa: el proposito de la pantalla no se decide sobre nodes.json. El nivel 0 se asigna solo por la rama de n1.'],
  ['G2/N4', 'La divulgacion progresiva y la secuenciacion no se deciden sobre el arbol; el nivel 4 se asigna con la condicion que si es decidible, Ap >= 1 sobre un nivel 3.'],
  ['G7/familias', 'Una familia son los objetivos que comparten nodeName y parentId. Es consistente cuando todas sus dimensiones menores caen dentro de 2 px.'],
  ['G7/primario', 'El objetivo primario es el de mayor area, y es "visiblemente mayor" cuando su area es al menos 1,5 veces la del segundo.'],
];

// Escala de tolerancia declarada en shared/escala.md el 2026-09-11. Los cortes NO
// se derivan de ninguna distribucion observada y la regla del ajuste unico
// prohibe volver a moverlos porque el resultado no quede repartido.
const AISLADO = 0.10;
const FRECUENTE = 0.25;
const GRAVE = 0.50;
const etiqueta = (p) => (p === 0 ? 'impecable' : p <= AISLADO ? 'aislado' : p <= FRECUENTE ? 'frecuente' : 'generalizado');

/** Combinacion comun a las rubricas que usan la escala de tolerancia. */
function nivelPorTolerancia(condiciones, condicionAdicional) {
  const cs = condiciones.filter((c) => c.p !== null);
  if (!cs.length) return { score: 3, trigger: 'ninguna' };
  const peor = [...cs].sort((a, b) => b.p - a.p)[0];
  const generalizadas = cs.filter((c) => c.p > FRECUENTE);
  const frecuentes = cs.filter((c) => c.p > AISLADO && c.p <= FRECUENTE);

  if (generalizadas.length >= 2 || cs.some((c) => c.p > GRAVE)) return { score: 0, trigger: peor.nombre };
  if (generalizadas.length === 1 || frecuentes.length >= 2) return { score: 1, trigger: (generalizadas[0] || frecuentes[0]).nombre };
  if (frecuentes.length === 1) return { score: 2, trigger: frecuentes[0].nombre };
  if (cs.every((c) => c.p === 0)) {
    return condicionAdicional ? { score: 4, trigger: 'adicional' } : { score: 3, trigger: 'ninguna' };
  }
  return { score: 3, trigger: peor.nombre };
}

const proporcion = (afectados, total) => (total ? +(afectados / total).toFixed(3) : null);

const leer = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const areaDe = (b) => (b ? b.w * b.h : 0);
const menorDim = (b) => Math.min(b.w, b.h);

/** Distancia entre dos cajas: 0 si se tocan o solapan. */
function distancia(a, b) {
  const dx = Math.max(0, Math.max(a.x - (b.x + b.w), b.x - (a.x + a.w)));
  const dy = Math.max(0, Math.max(a.y - (b.y + b.h), b.y - (a.y + a.h)));
  return Math.hypot(dx, dy);
}
function solapan(a, b) {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}
const mediana = (xs) => {
  if (!xs.length) return null;
  const a = [...xs].sort((p, q) => p - q);
  const m = a.length >> 1;
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
};

/** Indice por id y utilidades de ascendencia. */
function indexar(nodos) {
  const porId = new Map(nodos.map((n) => [n.id, n]));
  const ancestros = (n) => {
    const out = [];
    let p = porId.get(n.parentId);
    let guarda = 0;
    while (p && guarda++ < 200) { out.push(p); p = porId.get(p.parentId); }
    return out;
  };
  return { porId, ancestros };
}

const esAccionable = (n) =>
  (n.isClickable || ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(n.nodeName)) &&
  n.bounds && n.bounds.w > 0 && n.bounds.h > 0;

const pintaFrontera = (n) => n.visibleBoundary && n.visibleBoundary.visible === true;

// Un contenedor cuya tinta cubre medio viewport o mas es el fondo de la pagina,
// no un grupo: BODY con color de fondo, o el envoltorio de ancho completo. Si se
// cuenta como grupo, se traga todos los elementos de la pantalla y n1 colapsa a
// uno. La primera version de este piloto no lo excluia y daba n1 <= 2 en 22 de
// 24 paginas, con lo cual G2 nunca podia bajar de 3: la distribucion era de la
// implementacion y no de la rubrica.
const AREA_PAGINA = 0.5;
const esFondoDePagina = (n, areaViewport) =>
  ['HTML', 'BODY', '#document'].includes(n.nodeName) ||
  (n.ink && (n.ink.w * n.ink.h) / areaViewport >= AREA_PAGINA);
const agrupa = (n, areaViewport) => pintaFrontera(n) && !esFondoDePagina(n, areaViewport);

// ---------------------------------------------------------------- G7 · Fitts
function g7(nodos) {
  const objs = nodos.filter(esAccionable);
  const N_obj = objs.length;
  if (!N_obj) {
    return { not_applicable: true, razon: 'ningun objetivo accionable', measurements: { N_obj: 0 } };
  }

  const menores = objs.map((o) => menorDim(o.bounds));
  const W_min = Math.min(...menores);
  const bajo24 = objs.filter((o) => menorDim(o.bounds) < MIN_WCAG);
  const N_bajo24 = bajo24.length;

  // adyacencia: no se solapan y la distancia es menor que la dimension mayor del mas pequeño
  let S_min = Infinity, paresAdyacentes = 0, paresEstrechos = 0;
  for (let i = 0; i < objs.length; i++) {
    for (let j = i + 1; j < objs.length; j++) {
      const a = objs[i].bounds, b = objs[j].bounds;
      if (solapan(a, b)) continue;
      const d = distancia(a, b);
      const menorDeLosDos = areaDe(a) <= areaDe(b) ? a : b;
      if (d < Math.max(menorDeLosDos.w, menorDeLosDos.h)) {
        paresAdyacentes++;
        if (d < 8) paresEstrechos++;
        if (d < S_min) S_min = d;
      }
    }
  }
  if (!Number.isFinite(S_min)) S_min = null;

  // excepcion por separacion: circulo de 24 px centrado en la caja
  const centro = (b) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2, r: HOLGURA / 2 });
  const circuloTocaCaja = (c, b) => {
    const cx = Math.max(b.x, Math.min(c.x, b.x + b.w));
    const cy = Math.max(b.y, Math.min(c.y, b.y + b.h));
    return Math.hypot(c.x - cx, c.y - cy) < c.r;
  };
  const sinHolgura = bajo24.filter((o) => {
    const c = centro(o.bounds);
    const tocaOtro = objs.some((x) => x !== o && circuloTocaCaja(c, x.bounds));
    const tocaCirculo = bajo24.some((x) => {
      if (x === o) return false;
      const c2 = centro(x.bounds);
      return Math.hypot(c.x - c2.x, c.y - c2.y) < c.r + c2.r;
    });
    return tocaOtro || tocaCirculo;
  });
  const N_bajo24_sin_holgura = sinHolgura.length;

  // familias: mismo nodeName y mismo parentId
  const fam = new Map();
  for (const o of objs) {
    const k = o.nodeName + '#' + o.parentId;
    if (!fam.has(k)) fam.set(k, []);
    fam.get(k).push(menorDim(o.bounds));
  }
  const familias = [...fam.values()].filter((v) => v.length > 1);
  const enFamilia = familias.reduce((s, v) => s + v.length, 0);
  const familiasInconsistentes = familias.filter((v) => Math.max(...v) - Math.min(...v) > TOL);
  const objsEnFamiliaInconsistente = familiasInconsistentes.reduce((s, v) => s + v.length, 0);

  const areas = objs.map((o) => areaDe(o.bounds)).sort((a, b) => b - a);
  const primarioMayor = areas.length > 1 ? areas[0] >= 1.5 * areas[1] : false;
  const N_bajo32 = menores.filter((m) => m < 32).length;

  // Las cuatro condiciones, cada una con su denominador declarado en SKILL.md
  const condiciones = [
    { nombre: 'T1', p: proporcion(N_bajo24_sin_holgura, N_obj) },
    { nombre: 'T2', p: proporcion(paresEstrechos, paresAdyacentes) },
    { nombre: 'T3', p: proporcion(N_bajo32, N_obj) },
    { nombre: 'T4', p: proporcion(objsEnFamiliaInconsistente, enFamilia) },
  ];

  const m = {
    N_obj, W_min: +W_min.toFixed(1), N_bajo24, N_bajo24_sin_holgura, N_bajo32,
    S_min: S_min === null ? null : +S_min.toFixed(1), paresAdyacentes, paresEstrechos,
    familias: familias.length, objsEnFamilia: enFamilia, objsEnFamiliaInconsistente,
    primarioMayor,
    p: Object.fromEntries(condiciones.map((c) => [c.nombre, c.p])),
    etiquetas: Object.fromEntries(condiciones.filter((c) => c.p !== null).map((c) => [c.nombre, etiqueta(c.p)])),
  };

  const { score, trigger } = nivelPorTolerancia(condiciones, primarioMayor);
  return { score, trigger, measurements: m };
}

// ------------------------------------------------- grupos visuales (G1 y G2)
/** Ancestro mas externo con frontera visible. null si no tiene ninguno. */
function contenedorVisible(n, ancestros, areaViewport) {
  const cadena = ancestros(n).filter((a) => agrupa(a, areaViewport));
  return cadena.length ? cadena[cadena.length - 1] : null;
}

/** Enlace simple sobre cajas ink con umbral dado. Devuelve array de arrays. */
function agruparPorProximidad(items, umbral) {
  const grupos = items.map((x) => [x]);
  let cambio = true;
  while (cambio) {
    cambio = false;
    fuera:
    for (let i = 0; i < grupos.length; i++) {
      for (let j = i + 1; j < grupos.length; j++) {
        const cerca = grupos[i].some((a) => grupos[j].some((b) => distancia(a.ink, b.ink) <= umbral));
        if (cerca) { grupos[i] = grupos[i].concat(grupos[j]); grupos.splice(j, 1); cambio = true; break fuera; }
      }
    }
  }
  return grupos;
}

// ------------------------------------------- G2 · arquitectura de decision
function g2(nodos, ancestros, areaViewport) {
  const acc = nodos.filter((n) => esAccionable(n) && n.ink);
  const n_total = acc.length;
  if (!n_total) {
    return { not_applicable: true, razon: 'n_total = 0', measurements: { n_total: 0 } };
  }

  const porContenedor = new Map();
  const sueltos = [];
  for (const a of acc) {
    const c = contenedorVisible(a, ancestros, areaViewport);
    if (c) {
      if (!porContenedor.has(c.id)) porContenedor.set(c.id, []);
      porContenedor.get(c.id).push(a);
    } else sueltos.push(a);
  }

  let gruposSueltos = [];
  if (sueltos.length) {
    const vecino = sueltos.map((a) => {
      const ds = sueltos.filter((b) => b !== a).map((b) => distancia(a.ink, b.ink));
      return ds.length ? Math.min(...ds) : 0;
    });
    gruposSueltos = agruparPorProximidad(sueltos, mediana(vecino) || 0);
  }

  const grupos = [...porContenedor.values(), ...gruposSueltos];
  const n1 = grupos.length;
  const n_max = grupos.length ? Math.max(...grupos.map((g) => g.length)) : 0;
  const agrupados = acc.length - sueltos.length;
  const fraccionAgrupada = +(agrupados / acc.length).toFixed(2);

  const areas = acc.map((a) => areaDe(a.ink)).sort((x, y) => y - x);
  const domina = areas.length > 1 ? areas[0] >= 2 * areas[1] : true;

  const LEX = /(filtr|filter|orden|sort|recomend|recommend|destac|featured|compar|default)/i;
  const Ap = acc.filter((a) => {
    if (a.nodeName === 'SELECT') return true;
    const at = a.attributes || {};
    return LEX.test([at.class, at.id, at['aria-label'], at.role].filter(Boolean).join(' '));
  }).length;

  const m = { n_total, n1, n_max, Ap, fraccionAgrupada, domina };

  if (n1 > 12 && fraccionAgrupada < 0.5) return { score: 0, trigger: 'n1', measurements: m };
  if (n1 >= 9) return { score: 1, trigger: 'n1', measurements: m };
  if (n1 >= 6) return { score: 2, trigger: domina ? 'n1' : 'dominancia', measurements: m };
  if (!domina) return { score: 2, trigger: 'dominancia', measurements: m };
  if (Ap >= 1) return { score: 4, trigger: 'Ap', measurements: m };
  return { score: 3, trigger: 'n1', measurements: m };
}

// ----------------------------------------- G1 · agrupacion perceptual
function g1(nodos, ancestros, porId, areaViewport) {
  const conInk = nodos.filter((n) => n.ink && n.ink.w > 0 && n.ink.h > 0);
  const contenedores = conInk.filter((n) => agrupa(n, areaViewport));
  // grupos de primer nivel: contenedores que agrupan y no tienen otro encima
  const primerNivel = contenedores.filter((c) => !ancestros(c).some((a) => agrupa(a, areaViewport)));

  const miembros = (c) => conInk.filter((n) => n.parentId === c.id);
  const grupos = primerNivel.map((c) => ({ c, hijos: miembros(c) })).filter((g) => g.hijos.length > 0);

  if (grupos.length === 0) {
    return { not_applicable: true, razon: 'ningun contenedor con frontera visible', measurements: { grupos: 0 } };
  }

  // Elementos de los demas grupos de primer nivel.
  const otrosGrupos = (g) => grupos.filter((o) => o !== g).flatMap((o) => o.hijos);

  // C1 · separacion
  const rs = [];
  for (const g of grupos) {
    if (g.hijos.length < 2) continue;
    let g_in = 0;
    for (let i = 0; i < g.hijos.length; i++) {
      let cercano = Infinity;
      for (let j = 0; j < g.hijos.length; j++) {
        if (i === j) continue;
        cercano = Math.min(cercano, distancia(g.hijos[i].ink, g.hijos[j].ink));
      }
      if (Number.isFinite(cercano)) g_in = Math.max(g_in, cercano);
    }
    // Los ajenos son los elementos de OTROS grupos de primer nivel, no cualquier
    // nodo del arbol. Medir g_out contra cualquier nodo externo da cero en
    // cualquier pagina densa --- siempre hay un envoltorio o un texto tocando ---
    // y con g_out = 0 ningun grupo puede llegar a r >= 1.5 jamas. Medido: p_C1
    // valia 1,000 en el 100% de las paginas donde era calculable.
    const ajenos = otrosGrupos(g);
    let g_out = Infinity;
    for (const h of g.hijos) for (const a of ajenos) g_out = Math.min(g_out, distancia(h.ink, a.ink));
    if (!Number.isFinite(g_out)) continue;
    rs.push({ id: g.c.id, r: g_in > 0 ? +(g_out / g_in).toFixed(2) : null });
  }
  const conR = rs.filter((x) => x.r !== null);
  const fallanC1 = conR.filter((x) => x.r < 1.5).length;
  const C1 = fallanC1 === 0;

  // C2 · limites, como desbordamiento geometrico (CONVENCION).
  //
  // Solo entre nodos que pintan su propia frontera. Comparar la caja de un
  // contenedor que pinta contra la de un hijo que NO pinta es comparar dos cosas
  // distintas: la del hijo es la union de la tinta de sus descendientes (ADR-01),
  // y esa union desborda a su padre de forma rutinaria sin que nada se salga en
  // la pantalla. La primera version de este piloto hacia esa comparacion y daba
  // C2 fallido en 16 de 18 paginas, que es la senal de una metrica que no mide.
  // Se excluyen ademas los nodos que el motor reporta recortados y los anclados
  // al viewport, que escapan de su contenedor por diseno.
  let desbordan = 0, candidatosC2 = 0;
  for (const h of contenedores) {
    if (h.clipped) continue;
    if (h.position === 'fixed' || h.position === 'sticky') continue;
    const cadena = ancestros(h).filter((a) => agrupa(a, areaViewport));
    const c = cadena[0];
    if (!c || !c.ink) continue;
    candidatosC2++;
    const dentro = h.ink.x >= c.ink.x - TOL && h.ink.y >= c.ink.y - TOL &&
      h.ink.x + h.ink.w <= c.ink.x + c.ink.w + TOL && h.ink.y + h.ink.h <= c.ink.y + c.ink.h + TOL;
    if (!dentro) desbordan++;
  }
  const C2 = desbordan === 0;

  // C3 · regularidad sobre los bloques de primer nivel
  const distintos = (vals) => {
    const out = [];
    for (const v of vals.sort((a, b) => a - b)) if (!out.some((o) => Math.abs(o - v) < TOL)) out.push(v);
    return out.length;
  };
  const A = distintos(grupos.map((g) => g.c.ink.x));
  const W = distintos(grupos.map((g) => g.c.ink.w));
  const C3 = A <= 4 && W <= 3;

  // C3 como proporcion: cuantos bloques se salen de los cuatro ejes de
  // alineacion y los tres anchos mas frecuentes. Los numeros 4 y 3 son los
  // mismos de la version anterior; lo que cambia es que el resultado es una
  // fraccion y no un si o un no sobre la pantalla entera.
  const dominantes = (vals, cuantos) => {
    const cubos = [];
    for (const v of vals) {
      const c = cubos.find((x) => Math.abs(x.v - v) < TOL);
      if (c) c.n++; else cubos.push({ v, n: 1 });
    }
    return cubos.sort((a, b) => b.n - a.n).slice(0, cuantos);
  };
  const ejes = dominantes(grupos.map((g) => g.c.ink.x), 4);
  const anchos = dominantes(grupos.map((g) => g.c.ink.w), 3);
  const enAlguno = (v, cubos) => cubos.some((c) => Math.abs(c.v - v) < TOL);
  const fueraDeEje = grupos.filter((g) => !enAlguno(g.c.ink.x, ejes) || !enAlguno(g.c.ink.w, anchos)).length;

  // C4 · consistencia de equivalentes
  const conj = new Map();
  for (const n of conInk) {
    const k = n.nodeName + '#' + n.parentId;
    if (!conj.has(k)) conj.set(k, []);
    conj.get(k).push(n);
  }
  const conjuntos = [...conj.values()].filter((v) => v.length > 1);
  // Sobre ALTO y alineacion, nunca sobre ancho: dos enlaces de una misma
  // navegacion tienen anchos distintos porque su texto es distinto, y exigir
  // ancho igual reprueba cualquier lista de texto. La primera version de este
  // piloto lo exigia y hacia fallar C4 en 21 de 24 paginas.
  const divergentes = conjuntos.filter((v) => {
    const hs = v.map((n) => n.ink.h);
    const xs = v.map((n) => n.ink.x), ys = v.map((n) => n.ink.y);
    const mismaFila = Math.max(...ys) - Math.min(...ys) <= TOL;
    const mismaColumna = Math.max(...xs) - Math.min(...xs) <= TOL;
    return (Math.max(...hs) - Math.min(...hs) > TOL) || !(mismaFila || mismaColumna);
  }).length;
  const C4 = divergentes === 0;
  const elementosEnConjuntos = conjuntos.reduce((s, v) => s + v.length, 0);

  // paso 5 · conflictos entre proximidad y region comun
  let conflictos = 0, elementosEnGrupos = 0;
  for (const g of grupos) {
    const ajenos = otrosGrupos(g);   // misma correccion que en C1
    for (const h of g.hijos) {
      const propios = g.hijos.filter((x) => x !== h);
      if (!propios.length || !ajenos.length) continue;
      elementosEnGrupos++;
      const dPropio = Math.min(...propios.map((x) => distancia(h.ink, x.ink)));
      const dAjeno = Math.min(...ajenos.map((x) => distancia(h.ink, x.ink)));
      if (dAjeno < dPropio) conflictos++;
    }
  }

  // nivel 4 · legibilidad en dos niveles (CONVENCION)
  const anidados = contenedores.filter((c) => ancestros(c).some((a) => agrupa(a, areaViewport))).length;
  const dosNiveles = anidados > 0;

  // Las cuatro condiciones como proporcion afectada, con los denominadores que
  // SKILL.md declara. C3 dejo de ser dos conteos globales (A <= 4, W <= 3) y
  // pasa a ser la fraccion de bloques que se salen de los cuatro ejes y los tres
  // anchos dominantes: la misma idea, expresada de forma que admita proporcion.
  const condiciones = [
    { nombre: 'C1', p: proporcion(fallanC1, conR.length) },
    { nombre: 'C2', p: proporcion(desbordan, candidatosC2) },
    { nombre: 'C3', p: proporcion(fueraDeEje, grupos.length) },
    { nombre: 'C4', p: proporcion(divergentes, conjuntos.length) },
  ];
  const p_conf = proporcion(conflictos, elementosEnGrupos);

  const m = {
    grupos: grupos.length, conRazon: conR.length, fallanC1,
    desbordan, candidatosC2, A, W, fueraDeEje,
    conjuntos: conjuntos.length, divergentes, elementosEnConjuntos,
    conflictos, elementosEnGrupos, p_conf, dosNiveles,
    C1, C2, C3, C4,
    p: Object.fromEntries(condiciones.map((c) => [c.nombre, c.p])),
    etiquetas: Object.fromEntries(condiciones.filter((c) => c.p !== null).map((c) => [c.nombre, etiqueta(c.p)])),
  };

  let { score, trigger } = nivelPorTolerancia(condiciones, dosNiveles);

  // Techo por conflicto, tambien por proporcion: frecuente o generalizado fija
  // el techo en 1; aislado lo fija en 2.
  if (p_conf !== null && p_conf > 0) {
    const techo = p_conf > AISLADO ? 1 : 2;
    if (score > techo) { score = techo; trigger = 'conflicto'; }
  }
  return { score, trigger, measurements: m };
}

// ------------------------------------------------------------------ reporte
function histograma(valores) {
  const h = [0, 0, 0, 0, 0];
  let na = 0;
  for (const v of valores) (v === null ? na++ : h[v]++);
  return { h, na };
}

(async () => {
  const root = process.argv.find((a) => !a.startsWith('--') && a !== process.argv[0] && a !== process.argv[1]) || 'calibracion';
  const dirs = fs.readdirSync(root)
    .filter((d) => fs.existsSync(path.join(root, d, 'nodes.json')))
    .sort();

  const filas = [];
  for (const d of dirs) {
    const nodos = leer(path.join(root, d, 'nodes.json'));
    const meta = leer(path.join(root, d, 'meta.json'));
    const { porId, ancestros } = indexar(nodos);
    const areaViewport = meta.viewport.width * meta.viewport.height;
    const r = {
      id: d, url: meta.url, sanityOk: meta.sanity ? meta.sanity.ok : null,
      nodos: nodos.length,
      g1: g1(nodos, ancestros, porId, areaViewport),
      g2: g2(nodos, ancestros, areaViewport),
      g7: g7(nodos),
    };
    filas.push(r);
  }

  const nivel = (x) => (x.not_applicable ? null : x.score);
  console.log('pagina  G1  G2  G7   trigger G1        trigger G2      trigger G7');
  for (const f of filas) {
    const n = (x) => (x.not_applicable ? 'NA' : String(x.score));
    console.log(
      f.id.padEnd(7),
      n(f.g1).padStart(2), n(f.g2).padStart(3), n(f.g7).padStart(3), '  ',
      (f.g1.trigger || f.g1.razon || '').padEnd(17),
      (f.g2.trigger || f.g2.razon || '').padEnd(15),
      (f.g7.trigger || f.g7.razon || '')
    );
  }

  console.log('\n--- distribucion de niveles sobre ' + filas.length + ' paginas ---');
  console.log('grupo     0     1     2     3     4    N/A   niveles usados');
  const resumen = {};
  for (const g of ['g1', 'g2', 'g7']) {
    const { h, na } = histograma(filas.map((f) => nivel(f[g])));
    const usados = h.filter((x) => x > 0).length;
    resumen[g] = { histograma: h, na, nivelesUsados: usados };
    console.log(
      g.toUpperCase().padEnd(6),
      ...h.map((x) => String(x).padStart(5)),
      String(na).padStart(6),
      String(usados).padStart(10) + ' de 5'
    );
  }

  console.log('\nconvenciones que esta implementacion tuvo que cerrar:');
  for (const [donde, texto] of CONVENCIONES) console.log('  ' + donde.padEnd(14) + texto);

  const salida = path.join(root, '_piloto.json');
  fs.writeFileSync(salida, JSON.stringify({
    corridoEn: new Date().toISOString(),
    conjunto: root,
    paginas: filas.length,
    implementadas: ['G1', 'G2', 'G7'],
    sinImplementar: ['G3', 'G4', 'G5', 'G6'],
    convenciones: CONVENCIONES.map(([donde, texto]) => ({ donde, texto })),
    resumen,
    paginasDetalle: filas,
  }, null, 2) + '\n');
  console.log('\ndetalle -> ' + salida);
})();
