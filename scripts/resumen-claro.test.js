'use strict';
// Pruebas de resumen.md, el resultado en lenguaje claro (docs/PLAN-RESUMEN-CLARO.md).
// Nada escribe en corridas existentes: lo que se genera va a carpetas temporales.
const { test } = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('node:child_process');
const { resumenClaro, medidasDesdeCarpeta, cargarDiccionario, codigosDe, SIN_EXPLICACION, SIN_TOTAL_CORTO } = require('./resumen-claro');
const { perfilLegible } = require('./perfil-legible');
const { esquemaPara } = require('./execution-options');

const ROOT = path.resolve(__dirname, '..');
const dic = cargarDiccionario();
const INTEGRACION = path.join(ROOT, 'verificaciones/integracion-0.2.2-2026-11-05/corrida');
const EJEMPLO = path.join(ROOT, 'docs/ejemplo-resumen-integracion.md');
const leer = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const lineas = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n').split('\n');
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const resumenIntegracion = () => resumenClaro(leer(path.join(INTEGRACION, 'perfil.json')), { medidas: medidasDesdeCarpeta(INTEGRACION) });

// ------------------------------------------------------------- perfiles de prueba
const NOMBRES = { g1: 'Agrupación perceptual', g2: 'Arquitectura de decisión', g3: 'Capacidad y segmentación', g4: 'Saliencia visual', g5: 'Posición y progreso', g6: 'Economía y convención', g7: 'Targeting motor' };
/** Perfil artificial: resultados = {g2: [[2,'n1'], [null,'abst','motivo'], ['na','motivo']], ...}. No es una evaluación. */
function perfilDePrueba(resultados) {
  return {
    version_perfil: '2.1.0', modo: 'referencia', contexto_limpio_en_todas: true,
    configuracion: { model_id: 'modelo-prueba-1', runtime: 'prueba-local', decoding: { declarado: 'no expuesto por el runtime' }, captured_at: '2026-11-13T01:02:03.000Z' },
    captura: { url: 'https://ejemplo.test/', revision: { advertencias: [] } },
    perfil: Object.entries(resultados).map(([id, filas]) => ({
      group_id: id, group_name: NOMBRES[id], channel: id === 'g4' ? 'screenshot' : 'wireframe', repeticiones: filas.length,
      ...(id === 'g1' ? { estado_instrumento: 'no_interpretable_v1' } : {}),
      evaluaciones: filas.map(([a, b, c], i) => (typeof a === 'number'
        ? { repeticion: i + 1, estado: 'puntaje', score: a, trigger: b, motivo: null, evidencia_insuficiente: false }
        : { repeticion: i + 1, estado: a === 'na' ? 'no_aplica' : 'abstencion', score: null, trigger: null, motivo: a === 'na' ? b : c, evidencia_insuficiente: a !== 'na' })),
    })),
  };
}
const cinco = (fila) => Array.from({ length: 5 }, () => fila);

// --------------------------------------- qué condiciones define cada rúbrica (no se suponen)
function condicionesDeRubrica(id, archivo) {
  const texto = lineas(archivo).join('\n'), codigos = new Set();
  for (const m of texto.matchAll(/`trigger`[^.\n]*nombra la condición que fijó el nivel:([\s\S]*?)\.(?:\s|$)/g)) for (const c of m[1].matchAll(/`([^`]+)`/g)) codigos.add(c[1]);
  for (const m of texto.matchAll(/`trigger` toma el valor\s+`([^`]+)`/g)) codigos.add(m[1]);
  const ls = texto.split('\n');
  ls.forEach((l, i) => {
    if (!/\|\s*trigger\s*\|\s*$/.test(l)) return;
    for (let k = i + 2; k < ls.length && ls[k].startsWith('|'); k++) {
      const celda = ls[k].split('|').slice(1, -1).pop().trim();
      if (celda && celda !== 'null') codigos.add(celda);
    }
  });
  if (id !== 'g1') (function recorrer(o) {   // el contrato vigente en código; G1 no enumera en su esquema
    if (!o || typeof o !== 'object') return;
    for (const [k, v] of Object.entries(o)) {
      if (k === 'trigger' && v && typeof v === 'object') for (const x of [...(v.enum || []), ...(v.anyOf || v.oneOf || []).flatMap((a) => a.enum || [])]) if (x !== null) codigos.add(x);
      recorrer(v);
    }
  })(esquemaPara(id, id === 'g4' ? 'screenshot' : 'wireframe'));
  return codigos;
}
/** Rango de líneas [desde, hasta) de un bloque que empieza donde `inicio` casa y termina donde `fin` casa. */
function bloque(ls, inicio, fin) {
  const a = ls.findIndex((l) => inicio.test(l));
  if (a < 0) return null;
  let b = ls.findIndex((l, i) => i > a && fin.test(l));
  if (b < 0) b = ls.length;
  return [a + 1, b + 1];
}
const dentro = (p, rango) => { const [x, y] = String(p.lineas).split('-').map(Number); return x >= rango[0] && (y || x) < rango[1]; };

test('b · cada condición de cada rúbrica tiene entrada en el diccionario, y no sobra ninguna', () => {
  for (const [id, g] of Object.entries(dic.grupos)) {
    const definidas = condicionesDeRubrica(id, g.archivo);
    assert.ok(definidas.size >= 4, id + ': no se pudieron leer las condiciones de la rúbrica');
    for (const c of definidas) assert.ok(g.condiciones[c], id + ': la rúbrica define `' + c + '` y el diccionario no la explica');
    for (const c of Object.keys(g.condiciones)) assert.ok(definidas.has(c), id + ': el diccionario explica `' + c + '`, que la rúbrica no define');
    for (const c of Object.values(g.condiciones)) { assert.ok(c.nombre && c.explicacion, id + ': condición sin nombre o sin explicación'); }

    const ls = lineas(g.archivo), texto = ls.join('\n');
    // Condiciones numeradas en tablas (C1–C4, T1–T4, K1–K8)
    const cubiertas = new Set([...Object.keys(g.condiciones), ...Object.values(g.condiciones).map((c) => c.condicion_rubrica).filter(Boolean), ...Object.keys(g.convenciones || {})]);
    for (const m of texto.matchAll(/^\| \*\*([CTK]\d)\*\* \|/gm)) assert.ok(cubiertas.has(m[1]), id + ': la condición ' + m[1] + ' de la rúbrica no tiene entrada');
    // Los cinco niveles, cada uno citado dentro de su propio bloque
    for (const n of [0, 1, 2, 3, 4]) {
      const rango = bloque(ls, new RegExp('^\\*\\*' + n + '\\*\\* —'), /^(\*\*[0-4]\*\* —|#{2,3} )/);
      assert.ok(rango, id + ': la rúbrica no define el nivel ' + n);
      assert.ok(g.niveles[n]?.texto, id + ': falta el nivel ' + n + ' en el diccionario');
      for (const p of g.niveles[n].procedencia) assert.ok(dentro(p, rango), id + ' nivel ' + n + ': la cita (líneas ' + p.lineas + ') no está en el bloque del nivel (' + rango + ')');
    }
    // No aplicable
    const na = bloque(ls, /^## No aplicable/, /^## /);
    assert.ok(na && g.no_aplica?.texto, id + ': falta «no aplica»');
    for (const p of g.no_aplica.procedencia) assert.ok(dentro(p, na), id + ': la cita de «no aplica» no está en esa sección');
    assert.ok(g.nombre_claro && g.pregunta && g.base?.texto && g.recomendar?.length, id + ': faltan nombre, pregunta, base o regla de mejoras');
  }
  assert.deepEqual(Object.keys(dic.grupos), ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7']);
});

test('b′ · cada cita del diccionario está en las líneas que declara', () => {
  let citas = 0;
  (function recorrer(o, ruta) {
    if (!o || typeof o !== 'object') return;
    for (const [k, v] of Object.entries(o)) {
      if ((k === 'procedencia' || k === 'recomendar') && Array.isArray(v)) {
        assert.ok(v.length, ruta + ': sin procedencia');
        for (const p of v) {
          const [a, b] = String(p.lineas).split('-').map(Number), ls = lineas(p.archivo);
          assert.ok(a >= 1 && (b || a) <= ls.length, ruta + ': líneas fuera del archivo');
          assert.ok(norm(ls.slice(a - 1, b || a).join(' ')).includes(norm(p.cita)), ruta + ': «' + p.cita + '» no está en ' + p.archivo + ':' + p.lineas);
          citas++;
        }
      } else recorrer(v, ruta + '.' + k);
    }
  })(dic, 'diccionario');
  assert.ok(citas > 150, 'se esperaban más de 150 citas y hay ' + citas);
  // Toda entrada con texto para el lector lleva procedencia.
  (function recorrer(o, ruta) {
    if (!o || typeof o !== 'object' || Array.isArray(o)) return;
    if ((o.texto || o.explicacion || (o.nombre && ruta.includes('.'))) && !ruta.endsWith('.cifras')) assert.ok(Array.isArray(o.procedencia) && o.procedencia.length, ruta + ': texto sin procedencia');
    for (const [k, v] of Object.entries(o)) if (k !== 'cifras') recorrer(v, ruta + '.' + k);
  })(dic, 'diccionario');
});

test('a · resumen de la corrida de integración existente', () => {
  const t = resumenIntegracion();
  assert.equal((t.match(/^### 3\.\d /gm) || []).length, 7);
  for (const g of Object.values(dic.grupos)) assert.ok(t.includes(g.nombre_claro) && t.includes(g.pregunta));
  assert.ok(t.includes('gpt-6.1-sol') && t.includes('codex-cli') && t.includes('5 de noviembre de 2026, 14:45 (hora UTC)'));
  assert.ok(t.includes('| Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación | no se pudo evaluar | — |'));
  assert.ok(t.includes('elementos pulsables que miden menos de 32 píxeles en su lado más corto: 5 de 6'), 'cita las cifras de la respuesta');
  assert.ok(t.includes('Con una sola evaluación no hay medida de estabilidad'));
  assert.equal((t.match(/Con una sola evaluación no hay medida de estabilidad/g) || []).length, 1, 'la frase de estabilidad se dice una vez');
  // El ejemplo versionado es este mismo texto: sirve de muestra y de regresión.
  assert.equal(fs.readFileSync(EJEMPLO, 'utf8').replace(/\r\n/g, '\n'), t,
    'docs/ejemplo-resumen-integracion.md no coincide. Si el cambio es deliberado: node scripts/resumen-claro.js verificaciones/integracion-0.2.2-2026-11-05/corrida --out docs/ejemplo-resumen-integracion.md');
});

test('c · determinismo: dos ejecuciones, los mismos bytes, sin rutas ni fecha de hoy', () => {
  const a = resumenIntegracion(), b = resumenIntegracion();
  assert.equal(a, b);
  const cli = () => spawnSync(process.execPath, [path.join(ROOT, 'scripts/resumen-claro.js'), INTEGRACION], { cwd: os.tmpdir(), encoding: 'utf8' });
  const x = cli(), y = cli();
  assert.equal(x.status, 0, x.stderr); assert.equal(x.stdout, y.stdout); assert.equal(x.stdout, a);
  assert.ok(!a.includes(ROOT) && !a.includes(ROOT.replace(/\\/g, '/')), 'no lleva la ruta del repositorio');
  assert.ok(!a.includes(new Date().toISOString().slice(0, 10)), 'no lleva la fecha de hoy');
  assert.ok(!a.includes(leer(path.join(INTEGRACION, 'perfil.json')).cerrada_en), 'no lleva la hora del cierre');
});

test('d · perfil.md de la corrida registrada sigue saliendo byte a byte de su perfil.json', () => {
  const perfil = leer(path.join(INTEGRACION, 'perfil.json'));
  // La corrida se cerró desde el paquete 0.2.2; sus rutas son relativas a esa raíz.
  const raizPaquete = path.join(ROOT, 'dist/chequeo-codex-0.2.2/ux-laws-0.2.2');
  assert.equal(perfilLegible(perfil, INTEGRACION, raizPaquete), fs.readFileSync(path.join(INTEGRACION, 'perfil.md'), 'utf8').replace(/\r\n/g, '\n'));
});

// Fuera de los textos autorizados y de las citas del evaluador, nada de totales ni de venta.
const PROHIBIDO = /promedi|\bmedia\b|\bsuma\b|\bsumatoria\b|\bsumad[oa]s?\b|\btotal|\bglobal|semáforo|%|por ciento|puntos? de 28|sobre 28|\/ ?28|excelente|increíble|potente|revolucionari|innovador|de vanguardia|buena ux|mala ux|buena usabilidad|mala usabilidad|calificación final|nota final/i;
function sinAutorizados(t) {
  return t.split(dic.textos.sin_total.texto).join('').split(SIN_TOTAL_CORTO).join('').replace(/El evaluador lo explicó así: «[^»]*»/g, '');
}

test('e · sin totales, promedios, porcentajes, semáforos ni adjetivos de venta', () => {
  const variado = perfilDePrueba({ g1: [[2, 'C4']], g2: cinco([1, 'dominancia']), g3: [[0, 'V']], g4: [[3, 'P']], g5: [[4, 'J_final']], g6: [['abst', null, 'No se pudo comprobar.']], g7: [['na', 'No hay elementos pulsables.']] });
  for (const t of [resumenIntegracion(), resumenClaro(variado)]) {
    const resto = sinAutorizados(t);
    const m = PROHIBIDO.exec(resto);
    assert.equal(m, null, 'patrón prohibido «' + (m && m[0]) + '» en: ' + (m ? resto.slice(Math.max(0, m.index - 60), m.index + 40) : ''));
    assert.ok(t.includes(dic.textos.sin_total.texto) && t.includes(SIN_TOTAL_CORTO), 'dice que no hay puntaje total');
  }
  // El patrón sí muerde.
  for (const malo of ['Puntaje total: 12', 'promedio de 2,4', '75 %', 'UX excelente', '12 / 28']) assert.ok(PROHIBIDO.test(malo), malo);
});

test('f · abstención total, como G6 en el piloto: ni cero ni mejoras', () => {
  const motivo = 'No se pueden resolver K7 y K8 con la captura.';
  const t = resumenClaro(perfilDePrueba({ g6: cinco(['abst', null, motivo]), g7: cinco(['na', 'No hay elementos pulsables.']) }));
  assert.ok(t.includes('**Resultado.** En las 5 repeticiones: no se pudo evaluar, no se pudo evaluar, no se pudo evaluar, no se pudo evaluar, no se pudo evaluar. Ninguna repetición asignó un nivel.'));
  assert.ok(t.includes('**Resultado.** En las 5 repeticiones: no aplica, no aplica, no aplica, no aplica, no aplica. Ninguna repetición asignó un nivel.'));
  assert.ok(!/nivel más frecuente|[Nn]ivel 0|\| 0 \||nivel 0/.test(t.replace(/un 0 es:/g, '')), 'no presenta un cero');
  assert.ok(t.includes('Con este resultado no hay mejoras que se puedan sostener'));
  assert.ok(!/^1\. \*\*/m.test(t), 'no hay lista de mejoras');
  assert.ok(t.includes('costumbres de ubicación: no se pudo evaluar; no se sabe si está bien o mal.'));
  assert.ok(t.includes('Tamaño y separación de lo que se puede pulsar: no aplica a esta pantalla.'));
  assert.ok(t.includes('«' + motivo + '»') && t.includes('`K7`: los enlaces legales y de contacto van en el pie de página'), 'cita el motivo y explica sus códigos');
  assert.ok(t.includes('«No aplica» y «no se pudo evaluar» no son ceros.'));
});

test('g · dispersión entre repeticiones: moda, rango y la frase de que el modelo varió', () => {
  const t = resumenClaro(perfilDePrueba({ g2: [[2, 'n1'], [2, 'n1'], [3, 'n1'], ['abst', null, 'Sin evidencia.'], [2, 'agrupacion']], g3: [[1, 'H'], [1, 'H'], [3, 'ninguna'], [3, 'ninguna'], [2, 'U']], g7: cinco([0, 'W_min']), g5: [[3, 'J_inicio'], [3, 'J_inicio']] }));
  assert.ok(t.includes('En las 5 repeticiones: 2, 2, 3, no se pudo evaluar, 2. El nivel más frecuente fue 2 (en 3 de 5 repeticiones). Diferencia entre el nivel más alto y el más bajo: 1 nivel. ' + dic.textos.repeticiones_distintas.texto));
  assert.ok(t.includes('No hubo un nivel más frecuente: 1 y 3 aparecieron 2 veces cada uno. Diferencia entre el nivel más alto y el más bajo: 2 niveles.'));
  assert.ok(t.includes('Las 5 repeticiones dieron el mismo nivel.'));
  assert.ok(t.includes('Las 2 repeticiones dieron el mismo nivel; el protocolo pide cinco para hablar de estabilidad.'));
  assert.ok(t.includes('**Qué quiere decir un 2 en este aspecto.**') && t.includes('**Qué quiere decir un 3 en este aspecto.**'));
  assert.ok(t.includes('(código `n1`), en 3 de 5 repeticiones') && t.includes('(código `agrupacion`), en 1 de 5 repeticiones'));
  assert.ok(t.includes('cada aspecto se evaluó entre 2 y 5 veces, cada una por separado y sin ver las demás.'));
  assert.ok(!t.includes('Con una sola evaluación'), 'no habla de una sola evaluación cuando hubo varias');
  assert.ok(/1\. \*\*Tamaño y separación de lo que se puede pulsar\*\* \(nivel 0, en 5 de 5 repeticiones\)/.test(t), 'la mejora del nivel más bajo va primero');
});

test('h · condición desconocida: muestra el código y dice que no hay explicación, sin fallar', () => {
  const t = resumenClaro(perfilDePrueba({ g1: [[1, 'zeta_9']], g2: [[1, 'zeta_9']], g9: [[2, 'otra']] }));
  assert.ok(t.includes('La condición que fijó el nivel tiene el código `zeta_9`: ' + SIN_EXPLICACION + '.'));
  assert.ok(t.includes('código `zeta_9`, ' + SIN_EXPLICACION), 'también en la tabla');
  assert.ok(t.includes('pero la condición con código `zeta_9` no tiene una mejora en el diccionario'));
  assert.ok(t.includes('Este aspecto no está en el diccionario'), 'un grupo desconocido tampoco detiene el resumen');
  const viejo = resumenClaro(perfilDePrueba({ g4: [[3, 'ninguna']] }));
  assert.ok(viejo.includes('«ninguna condición limitante» (código `ninguna`)'), 'respuestas antiguas con `ninguna` en G4 se explican');
});

test('h′ · trigger con varias condiciones («C3, C4», como en el humo del 13 nov.): explica cada una', () => {
  const t = resumenClaro(perfilDePrueba({ g1: [[0, 'C3, C4']], g7: [[0, 'S_min, zeta_9']] }), {
    medidas: (e, s) => (s.group_id === 'g1' ? { g1_p_C3: { afectados: 2, denominador: 5 }, g1_p_C4: { afectados: 1, denominador: 3 } } : null),
  });
  const c3 = dic.grupos.g1.condiciones.C3, c4 = dic.grupos.g1.condiciones.C4;
  assert.ok(t.includes('| ' + c3.nombre + ' y ' + c4.nombre + ' |'), 'la tabla nombra las dos');
  assert.ok(t.includes('**Por qué.** El evaluador nombró 2 condiciones a la vez como las que fijaron el nivel:'));
  assert.ok(t.includes('- «' + c3.nombre + '» (código `C3`). ' + c3.explicacion + ' En esta evaluación: ' + c3.cifras[0].etiqueta + ': 2 de 5.'));
  assert.ok(t.includes('- «' + c4.nombre + '» (código `C4`). ' + c4.explicacion));
  assert.ok(t.includes('- código `zeta_9`: ' + SIN_EXPLICACION + '.'), 'la parte desconocida no detiene el resumen');
  assert.ok(!t.includes('`C3, C4`'), 'el trigger compuesto no se muestra como un código desconocido');
  assert.ok(t.includes(dic.grupos.g7.condiciones.S_min.mejora), 'la parte conocida conserva su mejora');
});

test('i · legibilidad: ningún código interno aparece sin su explicación en la misma línea', () => {
  const codigos = new Map();
  for (const g of Object.values(dic.grupos)) for (const [c, v] of Object.entries(codigosDe(g))) if (c !== 'ninguna') { if (!codigos.has(c)) codigos.set(c, new Set()); codigos.get(c).add(v.nombre); }
  const todo = perfilDePrueba(Object.fromEntries(Object.entries(dic.grupos).map(([id, g]) => [id, Object.keys(g.condiciones).map((c) => [1, c])])));
  const motivo = perfilDePrueba({ g6: [['abst', null, 'Faltan K_ap, K1 y T para decidir R.']], g5: [['abst', null, 'Q no se pudo leer.']] });
  const compuesto = perfilDePrueba({ g1: [[0, 'C3, C4']], g7: [[0, 'S_min, holgura']] });
  for (const t of [resumenIntegracion(), resumenClaro(todo), resumenClaro(motivo), resumenClaro(compuesto)]) {
    const cuerpo = t.split('\n').slice(t.split('\n').findIndex((l) => l.startsWith('## 2.')));   // la sección 1 lleva datos tal cual
    for (const l of cuerpo) for (const [c, nombres] of codigos) {
      if (!new RegExp('(?<![\\wáéíóúñÁÉÍÓÚÑ])' + c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\wáéíóúñÁÉÍÓÚÑ])').test(l)) continue;
      assert.ok([...nombres].some((n) => l.includes(n)), 'el código ' + c + ' aparece sin explicación en: ' + l.slice(0, 160));
    }
    assert.ok(!/\bG[1-7]\b/.test(cuerpo.filter((l) => !l.startsWith('*En los archivos técnicos')).join('\n')), 'G1…G7 solo aparecen junto al nombre del aspecto');
    for (const jerga of ['trigger', 'wireframe', 'abstención', 'ordinal', 'constructo', 'measurements']) assert.ok(!new RegExp('\\b' + jerga + '\\b', 'i').test(cuerpo.join('\n')), 'jerga sin explicar: ' + jerga);
  }
});
