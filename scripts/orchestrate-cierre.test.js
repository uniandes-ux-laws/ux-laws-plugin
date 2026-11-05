'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const grupos = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7'];
const sha = text => crypto.createHash('sha256').update(text).digest('hex');

// Son datos artificiales para probar el cierre; no evalúan una página ni llaman al modelo.
function crearCaso(t, repeticiones = 1) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-cierre-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.mkdirSync(path.join(dir, 'resultados'));
  const libro = { corrida: 'prueba-local', captura: {}, protocolo: 'v0.1.0', repeticiones, invocaciones: [] };
  const guardarResultado = (inv, obj) => fs.writeFileSync(path.resolve(ROOT, inv.resultado_esperado), JSON.stringify(obj));
  const leerResultado = inv => JSON.parse(fs.readFileSync(path.resolve(ROOT, inv.resultado_esperado), 'utf8'));
  for (const group_id of grupos) {
    const channel = group_id === 'g4' ? 'screenshot' : 'wireframe';
    for (let repetition = 1; repetition <= repeticiones; repetition++) {
      const id = group_id + '-' + channel + '-r' + repetition;
      const run = { model_id: 'test-model-1', runtime: 'prueba-local', repetition,
        prompt_hash: sha(group_id), captured_at: '2026-01-01T00:00:00.000Z',
        decoding: { temperature: 0, top_p: 1 },
        capture_sha256: { screenshot: sha('captura'), wireframe: sha('wireframe') },
        measurements_version: '1.0.6', protocol_version: '0.1.0' };
      const inv = { id, group_id, channel, ...run,
        resultado_esperado: path.relative(ROOT, path.join(dir, 'resultados', id + '.json')),
        contexto_limpio: true, mecanismo_de_aislamiento: 'Datos de prueba local' };
      libro.invocaciones.push(inv);
      guardarResultado(inv, { group_id, group_name: 'Grupo de prueba', laws_subsumed: ['Prueba'],
        channel, not_applicable: false, score: 3, trigger: 'ninguna',
        measurements: { lectura_screenshot: [] }, run });
    }
  }
  const guardarLibro = () => fs.writeFileSync(path.join(dir, 'invocaciones.json'), JSON.stringify(libro));
  const recoger = () => spawnSync(process.execPath,
    [path.join(ROOT, 'scripts/orchestrate.js'), 'recoger', '--corrida', dir], { cwd: ROOT, encoding: 'utf8' });
  guardarLibro();
  return { dir, libro, guardarLibro, guardarResultado, leerResultado, recoger };
}

function debeFallar(caso, mensaje) {
  const resultado = caso.recoger();
  assert.equal(resultado.status, 1, resultado.stdout + resultado.stderr);
  assert.match(resultado.stderr, mensaje);
  assert.equal(fs.existsSync(path.join(caso.dir, 'perfil.json')), false);
}

for (const repeticiones of [1, 5]) {
  test('cierra los siete grupos con ' + repeticiones + (repeticiones === 1 ? ' repetición' : ' repeticiones') + ', aunque sus puntajes coincidan', t => {
    const caso = crearCaso(t, repeticiones);
    const antes = caso.libro.invocaciones.map(inv => fs.readFileSync(path.resolve(ROOT, inv.resultado_esperado), 'utf8'));
    const resultado = caso.recoger();
    assert.equal(resultado.status, 0, resultado.stderr);
    const perfil = JSON.parse(fs.readFileSync(path.join(caso.dir, 'perfil.json'), 'utf8')).perfil;
    assert.equal(perfil.length, 7);
    assert(perfil.every(g => g.repeticiones === repeticiones && g.niveles.every(n => n === 3)));
    assert.deepEqual(caso.libro.invocaciones.map(inv => fs.readFileSync(path.resolve(ROOT, inv.resultado_esperado), 'utf8')), antes);
  });
}

test('rechaza el libro incompleto que antes dejaba seis grupos sin respuestas', t => {
  const caso = crearCaso(t, 5);
  caso.libro.invocaciones = caso.libro.invocaciones.filter(inv => inv.group_id === 'g7' && inv.repetition === 1);
  caso.guardarLibro();
  debeFallar(caso, /falta la invocacion g1-wireframe-r1/);
});

test('rechaza una repetición duplicada aunque la cantidad total de filas sea correcta', t => {
  const caso = crearCaso(t, 2);
  const anterior = caso.libro.invocaciones.at(-1);
  fs.unlinkSync(path.resolve(ROOT, anterior.resultado_esperado));
  const copia = { ...caso.libro.invocaciones[0], id: 'otra-entrada',
    resultado_esperado: path.relative(ROOT, path.join(caso.dir, 'resultados', 'otra-entrada.json')) };
  caso.guardarResultado(copia, caso.leerResultado(caso.libro.invocaciones[0]));
  caso.libro.invocaciones[caso.libro.invocaciones.length - 1] = copia;
  caso.guardarLibro();
  debeFallar(caso, /posicion duplicada/);
});

test('rechaza ids repetidos en grupos distintos', t => {
  const caso = crearCaso(t);
  caso.libro.invocaciones[1].id = caso.libro.invocaciones[0].id;
  caso.guardarLibro();
  debeFallar(caso, /id duplicado/);
});

test('rechaza dos entradas que apuntan al mismo archivo con rutas distintas', t => {
  const caso = crearCaso(t);
  const primera = caso.libro.invocaciones[0], segunda = caso.libro.invocaciones[1];
  segunda.resultado_esperado = path.join(path.dirname(primera.resultado_esperado), '..', 'resultados', path.basename(primera.resultado_esperado));
  caso.guardarLibro();
  debeFallar(caso, /archivo de resultado repetido/);
});

test('también detecta un archivo repetido a través de un enlace simbólico', t => {
  const caso = crearCaso(t);
  const primera = caso.libro.invocaciones[0], segunda = caso.libro.invocaciones[1];
  const destino = path.resolve(ROOT, segunda.resultado_esperado);
  fs.unlinkSync(destino);
  fs.symlinkSync(path.resolve(ROOT, primera.resultado_esperado), destino);
  caso.guardarLibro();
  debeFallar(caso, /archivo de resultado repetido/);
});

test('rechaza un resultado extra que no está registrado en el libro', t => {
  const caso = crearCaso(t);
  fs.copyFileSync(path.resolve(ROOT, caso.libro.invocaciones[0].resultado_esperado), path.join(caso.dir, 'resultados', 'copia.json'));
  debeFallar(caso, /resultado no registrado.*copia.json/);
});

test('rechaza un enlace extra aunque apunte a un resultado registrado', t => {
  const caso = crearCaso(t);
  fs.symlinkSync(path.resolve(ROOT, caso.libro.invocaciones[0].resultado_esperado), path.join(caso.dir, 'resultados', 'enlace.json'));
  debeFallar(caso, /resultado no registrado.*enlace.json/);
});

test('un enlace roto se informa como resultado faltante', t => {
  const caso = crearCaso(t), archivo = path.resolve(ROOT, caso.libro.invocaciones[0].resultado_esperado);
  fs.unlinkSync(archivo); fs.symlinkSync(path.join(caso.dir, 'archivo-ausente.json'), archivo);
  debeFallar(caso, /falta el resultado/);
});

test('acepta una carpeta enlazada cuando cada resultado sigue siendo distinto', t => {
  const caso = crearCaso(t), enlace = caso.dir + '-enlace';
  fs.symlinkSync(caso.dir, enlace, 'dir'); t.after(() => fs.unlinkSync(enlace));
  for (const inv of caso.libro.invocaciones) {
    inv.resultado_esperado = path.relative(ROOT, path.join(enlace, 'resultados', path.basename(inv.resultado_esperado)));
  }
  caso.guardarLibro();
  const r = caso.recoger(); assert.equal(r.status, 0, r.stderr);
});

test('informa si resultados dejó de ser una carpeta', t => {
  const caso = crearCaso(t), carpeta = path.join(caso.dir, 'resultados');
  fs.rmSync(carpeta, { recursive: true }); fs.writeFileSync(carpeta, 'contenido');
  debeFallar(caso, /resultados debe ser una carpeta/);
});

test('rechaza la ausencia de un archivo de resultado sin modificar los demás', t => {
  const caso = crearCaso(t), inv = caso.libro.invocaciones[0];
  fs.unlinkSync(path.resolve(ROOT, inv.resultado_esperado));
  const restantes = caso.libro.invocaciones.slice(1).map(i => fs.readFileSync(path.resolve(ROOT, i.resultado_esperado), 'utf8'));
  debeFallar(caso, /falta el resultado/);
  assert.deepEqual(caso.libro.invocaciones.slice(1).map(i => fs.readFileSync(path.resolve(ROOT, i.resultado_esperado), 'utf8')), restantes);
});

test('rechaza un grupo o canal que no pertenece al plan actual', t => {
  const caso = crearCaso(t);
  caso.libro.invocaciones[0].group_id = 'g8';
  caso.libro.invocaciones[1].channel = 'screenshot';
  caso.guardarLibro();
  debeFallar(caso, /grupo desconocido/);
});

test('rechaza una repetición fuera de las declaradas', t => {
  const caso = crearCaso(t), inv = caso.libro.invocaciones[0];
  inv.repetition = 2;
  const obj = caso.leerResultado(inv); obj.run.repetition = 2;
  caso.guardarResultado(inv, obj); caso.guardarLibro();
  debeFallar(caso, /repeticion fuera de 1\.\.1/);
});

test('exige el mismo prompt entre repeticiones de un grupo', t => {
  const caso = crearCaso(t, 2), inv = caso.libro.invocaciones[1];
  inv.prompt_hash = sha('otro prompt');
  const obj = caso.leerResultado(inv); obj.run.prompt_hash = inv.prompt_hash;
  caso.guardarResultado(inv, obj); caso.guardarLibro();
  debeFallar(caso, /prompts distintos/);
});

test('informa un libro o un resultado con JSON ilegible', t => {
  const caso = crearCaso(t);
  fs.writeFileSync(path.join(caso.dir, 'invocaciones.json'), '{');
  debeFallar(caso, /libro no contiene JSON valido/);
  caso.guardarLibro();
  fs.writeFileSync(path.resolve(ROOT, caso.libro.invocaciones[0].resultado_esperado), '{');
  debeFallar(caso, /JSON ilegible/);
});

test('rechaza un libro vacío, repeticiones fraccionarias y entradas mal formadas', t => {
  const caso = crearCaso(t);
  for (const valor of [null, {}, { repeticiones: 1.5, invocaciones: [] }, { repeticiones: 1, invocaciones: [null] }]) {
    fs.writeFileSync(path.join(caso.dir, 'invocaciones.json'), JSON.stringify(valor));
    debeFallar(caso, /libro|repeticiones|invocacion/);
  }
});

test('rechaza una entrada sin ruta y una lista vacía', t => {
  const caso = crearCaso(t);
  caso.libro.invocaciones[0].resultado_esperado = null; caso.guardarLibro();
  debeFallar(caso, /falta la ruta del resultado/);
  caso.libro.invocaciones = []; caso.guardarLibro();
  debeFallar(caso, /se esperaban 7 invocaciones y hay 0/);
});

test('comprueba la fecha de captura y los parámetros de la respuesta', t => {
  const caso = crearCaso(t), inv = caso.libro.invocaciones[0], obj = caso.leerResultado(inv);
  obj.run.captured_at = '2026-01-02T00:00:00.000Z'; caso.guardarResultado(inv, obj);
  debeFallar(caso, /captured_at no coincide/);
  obj.run.captured_at = inv.captured_at; obj.run.decoding.temperature = 1; caso.guardarResultado(inv, obj);
  debeFallar(caso, /decoding no coincide/);
});

test('acepta las mismas propiedades aunque cambie su orden en el JSON', t => {
  const caso = crearCaso(t), inv = caso.libro.invocaciones[0], obj = caso.leerResultado(inv);
  obj.run.capture_sha256 = { wireframe: inv.capture_sha256.wireframe, screenshot: inv.capture_sha256.screenshot };
  obj.run.decoding = { top_p: 1, temperature: 0 }; caso.guardarResultado(inv, obj);
  const r = caso.recoger(); assert.equal(r.status, 0, r.stderr);
});

test('ordena las cinco respuestas por repetición al armar el perfil', t => {
  const caso = crearCaso(t, 5);
  for (const inv of caso.libro.invocaciones.filter(i => i.group_id === 'g7')) {
    const obj = caso.leerResultado(inv); obj.score = inv.repetition - 1;
    caso.guardarResultado(inv, obj);
  }
  caso.libro.invocaciones.reverse(); caso.guardarLibro();
  const r = caso.recoger(); assert.equal(r.status, 0, r.stderr);
  const perfil = JSON.parse(fs.readFileSync(path.join(caso.dir, 'perfil.json'), 'utf8')).perfil;
  assert.deepEqual(perfil.find(g => g.group_id === 'g7').niveles, [0, 1, 2, 3, 4]);
});

test('conserva el perfil anterior y avisa cuando un cierre nuevo falla', t => {
  const caso = crearCaso(t);
  assert.equal(caso.recoger().status, 0);
  const archivo = path.join(caso.dir, 'perfil.json'), anterior = fs.readFileSync(archivo, 'utf8');
  caso.libro.invocaciones.pop(); caso.guardarLibro();
  const r = caso.recoger(); assert.equal(r.status, 1);
  assert.match(r.stderr, /perfil anterior.*sin actualizar/);
  assert.equal(fs.readFileSync(archivo, 'utf8'), anterior);
});

test('preparar no convierte una cantidad inválida de repeticiones en un entero válido', () => {
  for (const valor of ['2.5', '2abc']) {
    const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts/orchestrate.js'), 'preparar',
      '--out', 'salida-no-usada', '--repeticiones', valor], { cwd: ROOT, encoding: 'utf8' });
    assert.equal(r.status, 1); assert.match(r.stderr, /entero entre 1 y 5/);
  }
});

function leerGrupo(caso, grupo) {
  return JSON.parse(fs.readFileSync(path.join(caso.dir, 'perfil.json'), 'utf8')).perfil.find(g => g.group_id === grupo);
}

function cambiarGrupo(caso, grupo, cambiar) {
  for (const inv of caso.libro.invocaciones.filter(i => i.group_id === grupo)) {
    const obj = caso.leerResultado(inv);
    cambiar(obj, inv);
    caso.guardarResultado(inv, obj);
  }
}

for (const estado of ['no_aplica', 'abstencion']) {
  test('cinco respuestas de ' + estado + ' conservan sus motivos y no generan una moda numérica', t => {
    const caso = crearCaso(t, 5);
    cambiarGrupo(caso, 'g2', (obj, inv) => {
      obj.score = null; obj.trigger = null; obj.not_applicable = estado === 'no_aplica';
      if (obj.not_applicable) obj.na_reason = 'No hay decisiones visibles, repetición ' + inv.repetition;
      else {
        obj.evidence_insufficient = true;
        obj.measurements.motivo_abstencion = 'Combinación sin nivel, repetición ' + inv.repetition;
      }
    });
    const originales = caso.libro.invocaciones.map(inv => caso.leerResultado(inv));
    const r = caso.recoger(); assert.equal(r.status, 0, r.stderr);
    const g = leerGrupo(caso, 'g2');
    assert.deepEqual(g.niveles, [null, null, null, null, null]);
    for (const campo of ['nivel_modal', 'fraccion_en_el_modo', 'rango']) assert.equal(g[campo], null);
    assert.equal(g.triggers_distintos, 0); assert.equal(g.estabilidad_nivel, 'sin_puntajes');
    assert.equal(g.conteos.puntajes, 0);
    assert.equal(g.conteos.no_aplicables, estado === 'no_aplica' ? 5 : 0);
    assert.equal(g.conteos.abstenciones, estado === 'abstencion' ? 5 : 0);
    assert(g.evaluaciones.every(e => e.estado === estado && e.motivo.endsWith(String(e.repeticion))));
    assert.match(r.stdout, estado === 'no_aplica' ? /\[NA,NA,NA,NA,NA\]/ : /\[ABST,ABST,ABST,ABST,ABST\]/);
    assert.deepEqual(caso.libro.invocaciones.map(inv => caso.leerResultado(inv)), originales);
  });
}

test('un cero y cuatro abstenciones no se reportan como cinco ceros estables', t => {
  const caso = crearCaso(t, 5);
  cambiarGrupo(caso, 'g2', (obj, inv) => {
    obj.evidence_insufficient = true;
    if (inv.repetition === 1) obj.score = 0;
    else {
      obj.score = null; obj.trigger = null;
      obj.measurements.motivo_abstencion = 'Falta un ancla';
    }
  });
  const r = caso.recoger(); assert.equal(r.status, 0, r.stderr);
  const g = leerGrupo(caso, 'g2');
  assert.equal(g.nivel_modal, 0); assert.equal(g.fraccion_en_el_modo, 0.2);
  assert.equal(g.rango, 0); assert.equal(g.estabilidad_nivel, 'serie_mixta');
  assert.equal(g.triggers_distintos, 1);
  assert.deepEqual(g.conteos, { puntajes: 1, no_aplicables: 0, abstenciones: 4, evidencia_insuficiente: 5 });
  assert.equal(g.evaluaciones[0].estado, 'puntaje'); assert.equal(g.evaluaciones[0].evidencia_insuficiente, true);
});

for (const repeticiones of [1, 5]) {
  test('muestra la limitación de G1 aunque coincidan sus ' + repeticiones + ' puntajes', t => {
    const caso = crearCaso(t, repeticiones), r = caso.recoger();
    assert.equal(r.status, 0, r.stderr);
    const g = leerGrupo(caso, 'g1');
    assert.equal(g.estado_instrumento, 'no_interpretable_v1');
    assert.equal(g.estabilidad_nivel, repeticiones === 5 ? 'estable' : 'repeticiones_insuficientes');
    assert.equal(g.nivel_modal, 3); assert.equal(g.fraccion_en_el_modo, 1);
    assert.equal(g.advertencias.length, 1);
    assert.match(r.stdout, /G1.*No interpretable v1/);
  });
}

test('una abstención sin motivo bloquea el cierre y conserva el perfil anterior', t => {
  const caso = crearCaso(t);
  assert.equal(caso.recoger().status, 0);
  const archivo = path.join(caso.dir, 'perfil.json'), antes = fs.readFileSync(archivo, 'utf8');
  cambiarGrupo(caso, 'g2', obj => { obj.score = null; obj.trigger = null; obj.evidence_insufficient = true; });
  const inv = caso.libro.invocaciones.find(i => i.group_id === 'g2');
  const original = caso.leerResultado(inv), r = caso.recoger();
  assert.equal(r.status, 1); assert.match(r.stderr, /necesita motivo_abstencion/);
  assert.match(r.stderr, /perfil anterior.*sin actualizar/);
  assert.equal(fs.readFileSync(archivo, 'utf8'), antes);
  assert.deepEqual(caso.leerResultado(inv), original);
});

function registrarG1(caso, grupos) {
  const { prepararG1 } = require('../measure/g1-input');
  const entrada = prepararG1({ measurements_version: '1.0.6', g1: { g1_grupos_primer_nivel: grupos } });
  const archivo = path.join(caso.dir, 'g1.json');
  fs.writeFileSync(archivo, JSON.stringify(entrada));
  const inv = caso.libro.invocaciones.find(i => i.group_id === 'g1');
  Object.assign(inv, { measurements_version: '1.0.7', g1_input_version: '1.0.7',
    entrada: path.relative(ROOT, archivo), entrada_sha256: sha(fs.readFileSync(archivo)) });
  const obj = caso.leerResultado(inv);
  obj.run.measurements_version = '1.0.7'; obj.measurements.g1_grupos_primer_nivel = grupos;
  if (grupos < 2) Object.assign(obj, { not_applicable: true, score: null, trigger: null, na_reason: 'Menos de dos grupos' });
  caso.guardarResultado(inv, obj); caso.guardarLibro();
  return { archivo, inv, obj };
}

for (const grupos of [0, 1, 2]) {
  test('cierra G1 con la aplicabilidad prevista para ' + grupos + ' grupos', t => {
    const caso = crearCaso(t); registrarG1(caso, grupos);
    const r = caso.recoger(); assert.equal(r.status, 0, r.stderr);
    assert.equal(leerGrupo(caso, 'g1').evaluaciones[0].estado, grupos < 2 ? 'no_aplica' : 'puntaje');
  });
}

for (const grupos of [1, 2]) {
  test('rechaza invertir la aplicabilidad de G1 con ' + grupos + ' grupos', t => {
    const caso = crearCaso(t), { inv, obj } = registrarG1(caso, grupos);
    if (grupos === 1) Object.assign(obj, { not_applicable: false, score: 0, trigger: 'ninguna', na_reason: null });
    else Object.assign(obj, { not_applicable: true, score: null, trigger: null, na_reason: 'No corresponde' });
    caso.guardarResultado(inv, obj);
    debeFallar(caso, /no aplica únicamente con menos de dos grupos/);
  });
}

for (const problema of ['conteo', 'hash', 'archivo', 'versión', 'registro']) {
  test('no cierra G1 si se cambia su ' + problema, t => {
    const caso = crearCaso(t), { inv, obj, archivo } = registrarG1(caso, 1);
    if (problema === 'conteo') { obj.measurements.g1_grupos_primer_nivel = 0; caso.guardarResultado(inv, obj); }
    if (problema === 'hash') fs.appendFileSync(archivo, '\n');
    if (problema === 'archivo') fs.unlinkSync(archivo);
    if (problema === 'versión') inv.g1_input_version = 'otra';
    if (problema === 'registro') delete inv.g1_input_version;
    caso.guardarLibro();
    debeFallar(caso, /cantidad de grupos|entrada de G1/);
  });
}
