#!/usr/bin/env node
'use strict';
/**
 * verificar-pilotos-g3-g6.js — verifica las entradas y el cierre de los pilotos de
 * G3 y G6 (20-21 de octubre) desde un clon limpio, sin pedir respuestas al modelo.
 *
 *   node scripts/verificar-pilotos-g3-g6.js entradas
 *   node scripts/verificar-pilotos-g3-g6.js cierre
 *
 * POR QUÉ EXISTE (auditoría del 12 de noviembre, B1). La verificación original,
 * `pilot-g3-g6-real.js verificar-entradas`, exige el sha256 en bruto del
 * `measurements.json` de cada página de calibración tal como estaba en octubre.
 * Ese archivo no se versiona y lleva la marca de tiempo `medido_en`, así que su
 * hash solo se reproduce en la máquina que corrió el piloto. El runner no se puede
 * modificar: su propio hash está sellado en el manifiesto.
 *
 * QUÉ HACE EN SU LUGAR. Corre sobre el código archivado en
 * `historial/fuentes-g3-g6-2026-11-05` (verificado contra su MANIFIESTO; incluye el
 * SKILL.md de G3 de f7e4663, el que registró el piloto) y repite cada comprobación
 * de `checkFiles` salvo una: en vez del hash en bruto de `measurements.json`,
 * **regenera la medición** con el `measure-page.js` archivado a partir de
 * `meta.json` y `nodes.json` sellados, y exige que la entrada versionada del piloto
 * sea idéntica a la que se construye con ella. Eso comprueba el contenido; lo único
 * que no comprueba es la marca de tiempo, y lo dice en la salida.
 *
 * QUÉ NO HACE. No escribe en el repositorio: la medición regenerada va a una
 * carpeta temporal y `VERIFICACION.json` no se reescribe.
 */
const fs = require('fs'), path = require('path'), os = require('os'), crypto = require('crypto');
const assert = require('node:assert/strict');
const { execFileSync } = require('child_process');
const { entornoAnterior } = require('./fuentes-historicas');
const { raizGrabada, relativizar, MARCA } = require('./rutas-relativas');

const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const hash = (x) => crypto.createHash('sha256').update(x).digest('hex');
const read = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const NOTA_MEDICION = 'hash en bruto de measurements.json no verificable desde un clon: el archivo no se versiona y contiene medido_en; se verificó su contenido regenerándolo con el código archivado';

function modulos(carpeta) {
  const req = (rel) => require(path.join(carpeta, rel));
  return { api: req('scripts/pilot-g3-g6-real.js'), evid: req('measure/g3-g6-evidence.js'), contract: req('scripts/g3-g6-contract.js') };
}

/** checkFiles del runner archivado, con la medición regenerada en vez de su hash en bruto. */
function checkFilesSinMarca(carpeta, g) {
  const { api, evid, contract } = modulos(carpeta);
  const out = api.outDir(g), m = read(path.join(out, 'manifiesto.json'));
  const runner = path.join(carpeta, 'scripts/pilot-g3-g6-real.js');
  const dev = (fs.readFileSync(runner, 'utf8').match(/const DEV='([^']*)'/) || [])[1];
  assert.ok(dev, 'No se encontró DEV en el runner archivado');
  assert.equal(m.group_id, g);
  assert.equal(sha(runner), m.runner_sha256, 'runner distinto del registrado');
  assert.equal(hash(dev), m.developer_instructions_sha256);
  assert.equal(m.planned_evaluations, 120); assert.equal(m.repetitions, 5);
  assert.equal(m.measurements_version, evid.VERSION);
  assert.deepEqual(m.pages.map((p) => p.id), api.ids());
  for (const [f, h] of Object.entries(m.support_files_sha256)) assert.equal(sha(path.join(carpeta, f)), h, f);
  for (const [f, h] of Object.entries(m.fixed_files_sha256)) assert.equal(sha(path.join(out, f)), h, f);
  assert.deepEqual(read(path.join(out, 'response.schema.json')), contract.responseSchema(g));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-medicion-' + g + '-'));
  try {
    for (const p of m.pages) {
      const dir = path.join(carpeta, p.captura);
      for (const [f, h] of Object.entries(p.source_sha256)) if (f !== 'measurements.json') assert.equal(sha(path.join(dir, f)), h, p.id + ': ' + f);
      for (const c of ['screenshot', 'wireframe']) assert.equal(sha(path.join(dir, c + '.png')), p.capture_sha256[c], p.id + ': ' + c);
      // La copia lleva el id de la página por nombre: build() lo toma de la carpeta.
      const copia = path.join(tmp, p.id); fs.mkdirSync(copia);
      for (const f of ['meta.json', 'nodes.json', 'screenshot.png', 'wireframe.png']) fs.copyFileSync(path.join(dir, f), path.join(copia, f));
      execFileSync(process.execPath, [path.join(carpeta, 'measure/measure-page.js'), copia], { cwd: carpeta, stdio: 'pipe' });
      const entrada = path.join(out, 'entradas', p.id + '.json');
      assert.equal(sha(entrada), p.input_sha256, p.id + ': entrada');
      assert.deepEqual(read(entrada), evid.build(copia, g), p.id + ': la entrada no se reconstruye desde la medición');
      assert.equal(sha(path.join(out, 'prompts', p.id + '.md')), p.prompt_hash, p.id + ': prompt');
    }
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
  return m;
}

/** verifySeal archivado, con las rutas relativas normalizadas a '/' para Windows. */
function verifySealPortable(vg5, dir) {
  const lineas = fs.readFileSync(path.join(dir, 'SELLO-SHA256.tsv'), 'utf8').trim().split('\n'), sellados = [];
  for (const linea of lineas) {
    const [h, f] = linea.split('\t');
    assert.ok(f && !path.isAbsolute(f) && !f.split('/').includes('..'));
    assert.ok(!sellados.includes(f), 'Ruta duplicada en el sello: ' + f); sellados.push(f);
    assert.equal(sha(path.join(dir, f)), h, f + ': hash distinto');
  }
  assert.deepEqual(sellados.slice().sort(), vg5.primaryFiles(dir).map((f) => path.relative(dir, f).replace(/\\/g, '/')).sort(),
    'El sello omite archivos primarios o incluye derivados');
  return lineas.length;
}

function verificarEntradas(carpeta) {
  return ['g3', 'g6'].map((g) => { checkFilesSinMarca(carpeta, g); return { grupo: g, entradas: 'reconstruidas e idénticas', nota: NOTA_MEDICION }; });
}

const RAIZ_REPO = path.resolve(__dirname, '..');

/**
 * Cuatro sustituciones declaradas, todas antes de cargar g3-g6-results (que las
 * desestructura al cargarse) y todas deshechas al terminar:
 *   1. checkFiles -> checkFilesSinMarca (ver cabecera).
 *   2. verifySeal -> la misma comprobación con rutas en '/' (Windows).
 *   3. `git show <commit>:<ruta>` se ejecuta en el repositorio real y con '/': el
 *      código archivado corre en una carpeta temporal que no es un repositorio.
 */
function verificarCierre(carpeta) {
  const { api } = modulos(carpeta);
  const vg5 = require(path.join(carpeta, 'scripts/verify-g5-progress.js'));
  const cp = require('child_process'), execOriginal = cp.execFileSync;
  const checkOriginal = api.checkFiles, sealOriginal = vg5.verifySeal, comandoOriginal = api.command;
  api.checkFiles = (g) => checkFilesSinMarca(carpeta, g);
  vg5.verifySeal = (dir) => verifySealPortable(vg5, dir);
  // 4. El comando se regenera con la raíz que grabó la traza del piloto, no con la
  //    de esta máquina: así se compara argumento por argumento y ruta relativa por
  //    ruta relativa, que es lo que la traza puede atestiguar.
  const trazas = path.join(api.outDir('g3'), 'trazas');
  const primera = fs.readdirSync(trazas).filter((f) => f.endsWith('.json')).sort()[0];
  const raizPiloto = raizGrabada(read(path.join(trazas, primera)).command);
  assert.ok(raizPiloto, 'No se pudo leer la raíz grabada en las trazas');
  api.command = function (...a) {
    return relativizar(comandoOriginal.apply(this, a), carpeta).map((s) => s.split(MARCA).join(raizPiloto));
  };
  cp.execFileSync = function (cmd, args, opts) {
    if (cmd === 'git' && Array.isArray(args)) {
      args = args.map((a) => (typeof a === 'string' && /^[0-9a-f]{7,40}:/.test(a) ? a.replace(/\\/g, '/') : a));
      opts = { ...(opts || {}), cwd: RAIZ_REPO };
    }
    return execOriginal.call(this, cmd, args, opts);
  };
  try {
    const resultados = require(path.join(carpeta, 'scripts/g3-g6-results.js'));
    const salida = [];
    for (const g of ['g3', 'g6']) {
      const v = resultados.verify(g, false);
      v.archivos_sellados = vg5.verifySeal(api.outDir(g));
      v.nota_medicion = NOTA_MEDICION;
      salida.push(v);
    }
    const sesiones = api.allTasks().map((t) => path.join(api.outDir(t.g), 'trazas', t.key + '.json')).filter(fs.existsSync).map((f) => read(f).thread_id).filter(Boolean);
    assert.equal(new Set(sesiones).size, sesiones.length, 'Conversación compartida entre G3 y G6');
    return salida;
  } finally {
    cp.execFileSync = execOriginal; api.checkFiles = checkOriginal; vg5.verifySeal = sealOriginal; api.command = comandoOriginal;
  }
}

function main() {
  const modo = process.argv[2];
  if (!['entradas', 'cierre'].includes(modo)) throw Error('Uso: node scripts/verificar-pilotos-g3-g6.js entradas|cierre');
  const entorno = entornoAnterior();
  try { console.log(JSON.stringify(modo === 'entradas' ? verificarEntradas(entorno.carpeta) : verificarCierre(entorno.carpeta))); }
  finally { entorno.limpiar(); }
}

module.exports = { checkFilesSinMarca, verificarEntradas, verificarCierre, NOTA_MEDICION };
if (require.main === module) try { main(); } catch (e) { console.error(e.message); process.exitCode = 1; }
