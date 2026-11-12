'use strict';
// Pruebas del panel de seis evaluadores: plantilla sin datos personales, importador que
// descarta metadatos y solo acepta E1–E6, y acuerdo con 15 pares, n desigual, NA y G1.
// Todo se escribe en carpetas temporales; nada toca panel/.
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), os = require('os'), path = require('path'), zlib = require('zlib');
const { COLUMNAS, EVALUADORES, HOJA, unidades } = require('./panel-comun');
const { libro, generar } = require('./panel-plantilla');
const { importar } = require('./panel-importar');
const { calcular, cargar, P_E } = require('./acuerdo-panel');
const { xlsx } = require('./xlsx-minimo');

const tmp = (t) => { const d = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-panel-')); t.after(() => fs.rmSync(d, { recursive: true, force: true })); return d; };

/** Extrae una parte de un zip sin comprimir o deflate. */
function parte(buf, nombre) {
  const fin = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  let p = buf.readUInt32LE(fin + 16);
  for (let i = 0; i < buf.readUInt16LE(fin + 10); i++) {
    const n = buf.readUInt16LE(p + 28), x = buf.readUInt16LE(p + 30), c = buf.readUInt16LE(p + 32);
    if (buf.toString('utf8', p + 46, p + 46 + n) === nombre) {
      const off = buf.readUInt32LE(p + 42), tam = buf.readUInt32LE(p + 20), met = buf.readUInt16LE(p + 10);
      const ini = off + 30 + buf.readUInt16LE(off + 26) + buf.readUInt16LE(off + 28), d = buf.slice(ini, ini + tam);
      return (met === 8 ? zlib.inflateRawSync(d) : d).toString('utf8');
    }
    p += 46 + n + x + c;
  }
  return null;
}

/** Un libro «devuelto» por un evaluador, con metadatos como los que escribe Excel. */
function devuelto(evaluador, nivelDe, meta) {
  const filas = [COLUMNAS, ...unidades().map((u, i) => {
    const v = nivelDe(u, i);
    return [v.evaluador || evaluador, u.pagina, u.grupo, v.nivel ?? '', v.trigger ?? '', v.just ?? ''];
  })];
  return xlsx([{ nombre: HOJA, filas }], meta);
}
const triggerValido = { G1: 'C1', G2: 'n1', G3: 'U', G4: 'Bn', G5: 'G_existe', G6: 'R', G7: 'W_min' };

test('plantilla: seis libros, columnas exactas, sin autor ni fechas, bytes deterministas', (t) => {
  const d = tmp(t);
  const escritos = generar(d);
  assert.deepEqual(escritos.map((f) => path.basename(f)), EVALUADORES.map((e) => 'panel-' + e + '.xlsx'));
  const buf = fs.readFileSync(escritos[2]);
  const core = parte(buf, 'docProps/core.xml');
  assert.match(core, /<dc:creator><\/dc:creator>/);
  assert.match(core, /<cp:lastModifiedBy><\/cp:lastModifiedBy>/);
  assert.ok(!/created|modified|lastPrinted/i.test(core.replace(/lastModifiedBy/g, '')), 'core.xml no lleva fechas');
  assert.equal(parte(buf, 'docProps/app.xml'), null);
  const hoja = parte(buf, 'xl/worksheets/sheet1.xml');
  for (const c of COLUMNAS) assert.ok(hoja.includes('>' + c + '<'), 'columna ' + c);
  for (const prohibida of ['nombre', 'correo', 'email', 'institucion', 'institución', 'cargo', 'fecha', 'hora']) {
    assert.ok(!new RegExp('<t[^>]*>' + prohibida + '</t>', 'i').test(hoja), 'columna prohibida: ' + prohibida);
  }
  assert.ok(buf.equals(libro('E3')), 'misma entrada, mismos bytes');
  assert.equal(unidades().length, 210);
});

test('importar: descarta los metadatos de Office y no copia el nombre del archivo', (t) => {
  const d = tmp(t), entregas = path.join(d, 'entregas'), out = path.join(d, 'respuestas'); fs.mkdirSync(entregas);
  const archivo = path.join(entregas, 'panel-E3.xlsx');
  const comentario = ['xl/comments1.xml', '<comments><authors><author>Persona Real Prueba</author></authors></comments>'];
  fs.writeFileSync(archivo, devuelto('E3', (u, i) => (i % 3 === 0 ? { nivel: String(i % 5), trigger: triggerValido[u.grupo], just: 'observado' } : {}),
    { creator: 'Persona Real Prueba', lastModifiedBy: 'persona@correo.test', extra: [comentario] }));
  const r = importar(archivo, { out });
  assert.equal(r.ok, true, r.problemas.join('\n'));
  assert.equal(r.calificadas, 70);
  const salidas = fs.readdirSync(out);
  assert.deepEqual(salidas, ['respuestas-E3.csv']);
  const texto = fs.readFileSync(path.join(out, salidas[0]), 'utf8');
  assert.ok(!/Persona Real|correo\.test/.test(texto), 'los metadatos no pasan a la salida');
  assert.ok(!texto.includes('panel-E3.xlsx'), 'el nombre del archivo no pasa a la salida');
  assert.equal(texto.split('\n')[0], COLUMNAS.join(','));
});

test('importar: solo acepta panel-E1.xlsx … panel-E6.xlsx', (t) => {
  const d = tmp(t), out = path.join(d, 'respuestas');
  const contenido = devuelto('E3', () => ({}));
  for (const nombre of ['panel-E7.xlsx', 'panel-E0.xlsx', 'calificaciones-maria.xlsx', 'E3.xlsx', 'panel-e3.xlsx', 'panel-E3 (1).xlsx']) {
    const f = path.join(d, nombre); fs.writeFileSync(f, contenido);
    const r = importar(f, { out });
    assert.equal(r.ok, false, nombre);
    assert.match(r.problemas[0], /nombre no admitido/);
  }
  assert.equal(fs.existsSync(out), false, 'no se escribe nada');
});

test('importar: rechaza un evaluador distinto del archivo, vocabulario ajeno y filas reordenadas', (t) => {
  const d = tmp(t), out = path.join(d, 'respuestas');
  const f = path.join(d, 'panel-E3.xlsx');
  fs.writeFileSync(f, devuelto('E3', (u, i) => (i === 0 ? { evaluador: 'E4' } : i === 1 ? { nivel: '2', trigger: 'inventado', just: 'x' } : i === 2 ? { nivel: '7', trigger: 'U', just: 'x' } : {})));
  const r = importar(f, { out });
  assert.equal(r.ok, false);
  const todo = r.problemas.join('\n');
  assert.match(todo, /evaluador dice «E4»/);
  assert.match(todo, /trigger «inventado»/);
  assert.match(todo, /nivel «7»/);
  assert.equal(fs.existsSync(out), false);
});

test('importar: no pisa juicios escritos sin --force', (t) => {
  const d = tmp(t), out = path.join(d, 'respuestas'), f = path.join(d, 'panel-E1.xlsx');
  fs.writeFileSync(f, devuelto('E1', (u, i) => (i < 5 ? { nivel: 'NA', just: 'no aplica' } : {})));
  assert.equal(importar(f, { out }).ok, true);
  const antes = fs.readFileSync(path.join(out, 'respuestas-E1.csv'));
  const r = importar(f, { out });
  assert.equal(r.ok, false); assert.match(r.problemas[0], /5 fila\(s\) con juicio/);
  assert.ok(fs.readFileSync(path.join(out, 'respuestas-E1.csv')).equals(antes));
  assert.equal(importar(f, { out, forzar: true }).ok, true);
});

/** Escribe un CSV de respuestas a mano: [[pagina, grupo, nivel], ...]. */
function respuestas(dir, e, filas) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'respuestas-' + e + '.csv'), COLUMNAS.join(',') + '\n' +
    filas.map(([p, g, n]) => [e, p, g, n, n && n !== 'NA' ? 'x' : '', n ? 'j' : ''].join(',')).join('\n') + '\n');
}

test('acuerdo: seis evaluadores dan 15 pares y p_e = 0,75', (t) => {
  const d = tmp(t);
  for (const e of EVALUADORES) respuestas(d, e, [['P1', 'G2', '3'], ['P2', 'G2', '1']]);
  const r = calcular(cargar(d));
  assert.equal(r.pares, 15); assert.equal(r.con_G1.por_par.length, 15);
  assert.equal(P_E, 0.75); assert.equal(r.p_e, 0.75);
  assert.ok(r.con_G1.por_par.every((p) => p.kappa_bp === 1 && p.n === 2));
});

test('acuerdo: n desigual por par, ponderado por n, NA aparte y G1 con y sin', (t) => {
  const d = tmp(t);
  const e1 = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4], e3 = [1, 1, 2, 3, 4, 0, 1, 2, 3, 4], e2 = [0, 1, 2, 3, 3];
  respuestas(d, 'E1', [...e1.map((n, i) => ['P' + (i + 1), 'G2', String(n)]), ['P11', 'G2', 'NA'], ['P12', 'G1', '4']]);
  respuestas(d, 'E2', [...e2.map((n, i) => ['P' + (i + 1), 'G2', String(n)]), ...[6, 7, 8, 9, 10].map((i) => ['P' + i, 'G2', '']), ['P11', 'G2', 'NA'], ['P12', 'G1', '']]);
  respuestas(d, 'E3', [...e3.map((n, i) => ['P' + (i + 1), 'G2', String(n)]), ['P11', 'G2', '2'], ['P12', 'G1', '0']]);
  const r = calcular(cargar(d));
  const sin = Object.fromEntries(r.sin_G1.por_par.map((p) => [p.par, p]));
  // A mano: E1/E2 n=5, una diferencia de 1 (0,9375) -> p_o 0,9875, κ 0,95.
  assert.deepEqual([sin['E1/E2'].n, sin['E1/E2'].p_o, sin['E1/E2'].kappa_bp], [5, 0.9875, 0.95]);
  // E1/E3 n=10, una diferencia de 1 -> p_o 0,99375, κ 0,975.
  assert.deepEqual([sin['E1/E3'].n, sin['E1/E3'].kappa_bp], [10, 0.975]);
  // E2/E3 n=5, dos diferencias de 1 -> p_o 0,975, κ 0,9.
  assert.deepEqual([sin['E2/E3'].n, sin['E2/E3'].kappa_bp], [5, 0.9]);
  // Ponderado por n: (4,9375 + 9,9375 + 4,875) / 20 = 0,9875 -> κ 0,95. Promedio simple: 0,9417.
  assert.equal(r.sin_G1.global.n_total, 20);
  assert.equal(r.sin_G1.global.kappa_bp_ponderado_por_n, 0.95);
  assert.equal(r.sin_G1.global.kappa_bp_promedio_simple, 0.9417);
  // NA: E1/E2 ambos NA en P11; E1/E3 y E2/E3, solo uno.
  assert.equal(sin['E1/E2'].ambos_NA, 1); assert.equal(sin['E1/E3'].solo_uno_NA, 1); assert.equal(sin['E2/E3'].solo_uno_NA, 1);
  assert.equal(sin['E1/E2'].alguno_sin_calificar, 5);
  // Con G1: E1/E3 suma P12 (4 contra 0, peso 0) -> n 11.
  const con = Object.fromEntries(r.con_G1.por_par.map((p) => [p.par, p]));
  assert.equal(con['E1/E3'].n, 11);
  assert.equal(con['E1/E3'].p_o, +(9.9375 / 11).toFixed(4));
  assert.ok(r.con_G1.global.kappa_bp_ponderado_por_n < r.sin_G1.global.kappa_bp_ponderado_por_n);
  assert.equal(r.por_grupo.G1.n_total, 1);
});
