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
