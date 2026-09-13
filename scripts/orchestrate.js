#!/usr/bin/env node
'use strict';
/**
 * orchestrate.js --- el orquestador. Cero logica de evaluacion.
 *
 *   node scripts/orchestrate.js preparar --url https://ejemplo.com --out corridas/ej
 *   node scripts/orchestrate.js preparar --captura captures/G01 --out corridas/G01 --repeticiones 5
 *   node scripts/orchestrate.js recoger  --corrida corridas/G01
 *
 * QUE HACE. Captura si hace falta, calcula measurements, y emite el LIBRO DE
 * INVOCACIONES: una entrada por (grupo, canal, repeticion), cada una con su prompt
 * ya escrito en disco y su prompt_hash. Despues recoge las salidas, valida cada una
 * contra group-result.schema.json y arma el perfil de los siete.
 *
 * QUE NO HACE, y es lo que lo mantiene honesto: NO asigna niveles, NO interpreta
 * measurements, NO decide triggers y NO arregla una salida invalida. Si una salida
 * no valida, falla ruidoso nombrando el grupo y la repeticion, y no escribe perfil.
 * Un orquestador que "corrige" una salida se convierte en el octavo evaluador, y
 * nadie sabria que lo es.
 *
 * EL REQUISITO NO NEGOCIABLE: CADA REPETICION ES UNA INVOCACION CON CONTEXTO
 * LIMPIO. Mismo prompt, mismo hash, sin historia de las repeticiones anteriores. Si
 * las cinco comparten contexto, lo que se mide es el efecto de anclaje --- la
 * segunda repeticion ve la primera y tiende a repetirla --- y ese sesgo empuja
 * hacia H1, que es justo la hipotesis que la fase 5 existe para falsificar. El
 * libro registra por invocacion `contexto_limpio` y el MECANISMO con el que se
 * garantizo; `recoger` rechaza la corrida si alguna repeticion no lo declara.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const Ajv = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

const RAIZ = path.resolve(__dirname, '..');
const PROTOCOLO = '0.1.0';   // el protocolo congelado bajo el que corre esta grilla
const GRUPOS = [
  { id: 'g1', slug: 'g1-agrupacion-perceptual', nombre: 'Agrupación perceptual', canal: 'wireframe' },
  { id: 'g2', slug: 'g2-arquitectura-decision', nombre: 'Arquitectura de decisión', canal: 'wireframe' },
  { id: 'g3', slug: 'g3-capacidad-segmentacion', nombre: 'Capacidad y segmentación', canal: 'wireframe' },
  { id: 'g4', slug: 'g4-saliencia-visual', nombre: 'Saliencia visual', canal: 'screenshot' },
  { id: 'g5', slug: 'g5-posicion-progreso', nombre: 'Posición y progreso', canal: 'wireframe' },
  { id: 'g6', slug: 'g6-economia-convencion', nombre: 'Economía y convención', canal: 'wireframe' },
  { id: 'g7', slug: 'g7-targeting-motor', nombre: 'Targeting motor', canal: 'wireframe' },
];

const sha = (s) => crypto.createHash('sha256').update(s, 'utf8').digest('hex');
const leer = (p) => fs.readFileSync(p, 'utf8');
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : d; };

/**
 * NINGUN CAMPO DEL QUE DEPENDA LA ATRIBUCION DE UN RESULTADO ADMITE VALOR POR
 * DEFECTO. Un default silencioso en model_id o en runtime produce un dataset
 * donde no se sabe que sistema genero que puntaje, y eso no se arregla despues:
 * la corrida habria que repetirla entera. Falta un valor, falla aqui.
 */
function requerido(nombre, pista) {
  const v = arg(nombre, null);
  if (!v) {
    console.error('falta --' + nombre + '. ' + pista);
    console.error('Ningun campo del que dependa la atribucion admite valor por defecto.');
    process.exit(1);
  }
  return v;
}

// Identificador de modelo: algo que nombre una version concreta. Rechaza los
// marcadores de posicion y los nombres comerciales sueltos, que son los dos
// casos que producen un dataset inatribuible sin que nadie lo note.
const PLACEHOLDERS = /^(pendiente|tbd|por-definir|na|n\/a|none|null|modelo|model|claude|gpt|opus|sonnet|haiku|gemini|llama)$/i;
function modeloValido(v) {
  if (!v || PLACEHOLDERS.test(v.trim())) return false;
  if (/\s/.test(v)) return false;                 // "Claude Opus 5" es un nombre comercial, no un id
  if (!/[0-9]/.test(v)) return false;             // un id real lleva version
  if (!/[-._:]/.test(v)) return false;            // y un separador
  return /^[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$/.test(v.trim());
}

const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);
const validarResultado = ajv.compile(require(path.join(RAIZ, 'shared/schemas/group-result.schema.json')));

/**
 * El prompt de una invocacion. Es identico en las cinco repeticiones --- de ahi
 * que el prompt_hash lo sea ---, y no menciona ninguna otra repeticion.
 */
function construirPrompt(grupo, canal, capturaRel, atribucion) {
  const rubrica = leer(path.join(RAIZ, 'skills', grupo.slug, 'SKILL.md'));
  const escala = leer(path.join(RAIZ, 'shared', 'escala.md'));
  return [
    '# Tarea',
    '',
    'Evalúa el grupo de constructo ' + grupo.id.toUpperCase() + ' — ' + grupo.nombre + ' — sobre la pantalla capturada',
    'en `' + capturaRel + '`, canal `' + canal + '`.',
    '',
    'Entradas, todas dentro de ese directorio:',
    '',
    '- `measurements.json` — las cifras ya calculadas. **No recuentes nada.**',
    '- `' + canal + '.png` — el canal de esta corrida.',
    '- `screenshot.png` — solo para los criterios que la rúbrica marca como dependientes del texto.',
    '',
    'Devuelve **un único objeto JSON** conforme a `shared/schemas/group-result.schema.json`,',
    'sin texto alrededor. Reglas que la validación hace cumplir:',
    '',
    '- `measurements` repite los campos de `measurements.json` que sostuvieron el puntaje, con',
    '  sus nombres, más los juicios que emitiste.',
    '- `measurements.lectura_screenshot` lleva la lista de criterios que necesitaste leer; vacía',
    '  si no leíste ninguno.',
    '- `trigger` nombra la condición que fijó el nivel, con los identificadores de la rúbrica.',
    '- `run` lleva los nueve campos que el esquema v0.2.0 exige, con los valores que esta',
    '  invocación te da: model_id MODELO, runtime RUNTIME, repetition, prompt_hash, captured_at,',
    '  decoding, capture_sha256 (objeto con screenshot y wireframe), measurements_version y',
    '  protocol_version. No los inventes ni los omitas: el orquestador los compara con su libro.',
    '',
    '  Los valores de atribución de esta invocación son exactamente estos:',
    '',
    '  ' + JSON.stringify(atribucion),
    '',
    '- Si una cifra te parece equivocada no la sustituyas: marca `evidence_insufficient: true` y',
    '  dilo en un hallazgo.',
    '',
    '---',
    '',
    '# Escala',
    '',
    escala,
    '',
    '---',
    '',
    '# Rúbrica',
    '',
    rubrica,
  ].join('\n');
}

function preparar() {
  const url = arg('url', null);
  let captura = arg('captura', null);
  const out = path.resolve(RAIZ, requerido('out', 'Nombra la corrida: --out corridas/<nombre>.'));
  // --repeticiones si conserva default porque NO es atribucion: es la constante
  // del protocolo (decision 3, cinco por configuracion) y queda registrada en el
  // libro. Aun asi se valida contra el rango que el esquema admite.
  const reps = parseInt(arg('repeticiones', '5'), 10);
  if (!(reps >= 1 && reps <= 5)) { console.error('--repeticiones fuera de 1..5, que es lo que el esquema admite'); process.exit(1); }
  const runtime = requerido('runtime', 'Cual runtime de agente ejecuta las invocaciones. El nivel 7 compara runtimes: sin este campo la comparacion no es atribuible.');
  const modelo = requerido('model-id', 'El identificador EXACTO del modelo, por ejemplo claude-opus-5. No el nombre comercial.');
  if (!modeloValido(modelo)) {
    console.error('--model-id "' + modelo + '" no parece un identificador de modelo.');
    console.error('Se espera algo como claude-opus-5, gpt-5-codex o us.anthropic.claude-opus-5.');
    console.error('No se aceptan marcadores de posicion, nombres comerciales sueltos ni valores con espacios.');
    process.exit(1);
  }
  // Los parametros de decodificacion cambian la salida: o se declaran, o se
  // declara que el runtime no los expone. Lo que no se admite es el silencio.
  const decodingRaw = requerido('decoding', 'Los parametros de decodificacion como JSON, o el literal no-expuesto-por-el-runtime.');
  let decoding;
  if (decodingRaw === 'no-expuesto-por-el-runtime') decoding = { declarado: 'no expuesto por el runtime' };
  else {
    try { decoding = JSON.parse(decodingRaw); }
    catch (e) { console.error('--decoding no es JSON valido ni el literal no-expuesto-por-el-runtime'); process.exit(1); }
  }
  if (!url && !captura) { console.error('hace falta --url o --captura'); process.exit(1); }

  fs.mkdirSync(out, { recursive: true });
  fs.mkdirSync(path.join(out, 'prompts'), { recursive: true });
  fs.mkdirSync(path.join(out, 'resultados'), { recursive: true });

  if (url) {
    captura = path.join(out, 'captura');
    console.log('capturando ' + url + ' ...');
    execFileSync('node', [path.join(RAIZ, 'capture', 'capture.js'), url, '--out', captura], { stdio: 'inherit' });
  }
  captura = path.resolve(RAIZ, captura);

  console.log('midiendo ...');
  execFileSync('node', [path.join(RAIZ, 'measure', 'measure-page.js'), captura], { stdio: 'inherit' });
  execFileSync('node', [path.join(RAIZ, 'scripts', 'validate-measurements.js'), path.join(captura, 'measurements.json')], { stdio: 'inherit' });

  const meta = JSON.parse(leer(path.join(captura, 'meta.json')));
  const medicion = JSON.parse(leer(path.join(captura, 'measurements.json')));
  const capturaRel = path.relative(RAIZ, captura).replace(/\\/g, '/');

  const invocaciones = [];
  for (const g of GRUPOS) {
    const atribucion = {
      model_id: modelo, runtime, repetition: '1..' + reps, decoding,
      capture_sha256: meta.sha256,
      measurements_version: medicion.schema_version,
      protocol_version: PROTOCOLO,
      captured_at: meta.capturedAt,
    };
    const prompt = construirPrompt(g, g.canal, capturaRel, atribucion);
    const hash = sha(prompt);
    const archivo = path.join(out, 'prompts', g.id + '-' + g.canal + '.md');
    fs.writeFileSync(archivo, prompt);
    for (let r = 1; r <= reps; r++) {
      invocaciones.push({
        id: g.id + '-' + g.canal + '-r' + r,
        group_id: g.id,
        channel: g.canal,
        repetition: r,
        prompt_hash: hash,
        prompt: path.relative(RAIZ, archivo).replace(/\\/g, '/'),
        captura: capturaRel,
        resultado_esperado: path.relative(RAIZ, path.join(out, 'resultados', g.id + '-' + g.canal + '-r' + r + '.json')).replace(/\\/g, '/'),
        model_id: modelo,
        runtime,
        decoding,
        capture_sha256: meta.sha256,
        measurements_version: medicion.schema_version,
        protocol_version: PROTOCOLO,
        captured_at: meta.capturedAt,
        contexto_limpio: null,
        mecanismo_de_aislamiento: null,
        estado: 'pendiente',
      });
    }
  }

  const libro = {
    corrida: path.basename(out),
    creada_en: new Date().toISOString(),
    protocolo: 'v0.1.0',
    captura: { dir: capturaRel, url: meta.url, sha256: meta.sha256, sanity_ok: meta.sanity ? meta.sanity.ok : null },
    repeticiones: reps,
    requisito: 'Cada repeticion es una invocacion con contexto limpio: mismo prompt, mismo hash, sin historia de las repeticiones anteriores. Quien ejecute cada invocacion debe escribir contexto_limpio y mecanismo_de_aislamiento en esta entrada; recoger rechaza la corrida si falta en alguna.',
    invocaciones,
  };
  fs.writeFileSync(path.join(out, 'invocaciones.json'), JSON.stringify(libro, null, 2) + '\n');

  console.log('\ncorrida preparada en ' + path.relative(RAIZ, out));
  console.log(invocaciones.length + ' invocaciones = ' + GRUPOS.length + ' grupos x ' + reps + ' repeticiones');
  console.log('prompt_hash por grupo:');
  for (const g of GRUPOS) console.log('  ' + g.id + ' ' + g.canal.padEnd(10) + invocaciones.find((i) => i.group_id === g.id).prompt_hash.slice(0, 16));
  console.log('\nCada repeticion se ejecuta en UNA INVOCACION NUEVA, sin la historia de las');
  console.log('anteriores. Ver skills/ux-audit/SKILL.md.');
}

function recoger() {
  const dir = path.resolve(RAIZ, arg('corrida', ''));
  const libroPath = path.join(dir, 'invocaciones.json');
  if (!fs.existsSync(libroPath)) { console.error('no existe ' + libroPath); process.exit(1); }
  const libro = JSON.parse(leer(libroPath));

  const problemas = [];
  const resultados = [];
  for (const inv of libro.invocaciones) {
    const f = path.join(RAIZ, inv.resultado_esperado);
    if (!fs.existsSync(f)) { problemas.push(inv.id + ': falta el resultado'); continue; }

    let obj;
    try { obj = JSON.parse(leer(f)); }
    catch (e) { problemas.push(inv.id + ': JSON ilegible — ' + e.message); continue; }

    if (!validarResultado(obj)) {
      const e = validarResultado.errors[0];
      problemas.push(inv.id + ' [' + inv.group_id + ']: no valida contra el esquema — ' + (e.instancePath || '(raíz)') + ' ' + e.message);
      continue;
    }
    if (obj.group_id !== inv.group_id) problemas.push(inv.id + ': el resultado dice group_id ' + obj.group_id);
    if (obj.channel !== inv.channel) problemas.push(inv.id + ': el resultado dice channel ' + obj.channel);
    if (obj.run.repetition !== inv.repetition) problemas.push(inv.id + ': repetition ' + obj.run.repetition + ' no coincide con la invocacion');
    if (obj.run.prompt_hash !== inv.prompt_hash) problemas.push(inv.id + ': prompt_hash distinto del que el libro fijo — las repeticiones no recibieron el mismo prompt');
    if (!modeloValido(obj.run.model_id)) problemas.push(inv.id + ': run.model_id "' + obj.run.model_id + '" no es un identificador de modelo valido');
    if (obj.run.model_id !== inv.model_id) problemas.push(inv.id + ': el resultado dice model_id ' + obj.run.model_id + ' y el libro fijo ' + inv.model_id);
    if (obj.run.runtime !== inv.runtime) problemas.push(inv.id + ': el resultado dice runtime ' + obj.run.runtime + ' y el libro fijo ' + inv.runtime);
    if (obj.run.measurements_version !== inv.measurements_version) problemas.push(inv.id + ': measurements_version ' + obj.run.measurements_version + ' no es la que midio esta captura (' + inv.measurements_version + ')');
    if (obj.run.protocol_version !== inv.protocol_version) problemas.push(inv.id + ': protocol_version ' + obj.run.protocol_version + ' no coincide con ' + inv.protocol_version);
    if (JSON.stringify(obj.run.capture_sha256) !== JSON.stringify(inv.capture_sha256)) problemas.push(inv.id + ': capture_sha256 no corresponde a la captura que el libro asigno');
    if (inv.contexto_limpio !== true) problemas.push(inv.id + ': la invocacion no declara contexto_limpio');
    if (inv.contexto_limpio === true && !inv.mecanismo_de_aislamiento) problemas.push(inv.id + ': declara contexto limpio sin decir con que mecanismo');

    resultados.push({ inv, obj });
  }

  if (problemas.length) {
    console.error('\nLA CORRIDA NO SE PUEDE CERRAR. ' + problemas.length + ' problema(s):\n');
    for (const p of problemas) console.error('  ' + p);
    console.error('\nNo se escribe perfil. El orquestador no arregla salidas: las rechaza.');
    process.exit(1);
  }

  const perfil = GRUPOS.map((g) => {
    const rs = resultados.filter((r) => r.inv.group_id === g.id);
    const niveles = rs.map((r) => r.obj.score);
    const triggers = rs.map((r) => r.obj.trigger);
    const cuenta = new Map();
    for (const n of niveles) cuenta.set(n, (cuenta.get(n) || 0) + 1);
    const modal = [...cuenta.entries()].sort((a, b) => b[1] - a[1])[0];
    const numericos = niveles.filter((n) => n !== null);
    const lectura = [...new Set(rs.flatMap((r) => (r.obj.measurements || {}).lectura_screenshot || []))];
    return {
      group_id: g.id, group_name: g.nombre, channel: g.canal,
      repeticiones: rs.length,
      niveles, triggers,
      nivel_modal: modal ? modal[0] : null,
      fraccion_en_el_modo: modal ? +(modal[1] / rs.length).toFixed(3) : null,
      rango: numericos.length ? Math.max(...numericos) - Math.min(...numericos) : null,
      triggers_distintos: new Set(triggers).size,
      criterios_leidos_del_screenshot: lectura,
      comparacion_entre_canales_limpia: lectura.length === 0,
    };
  });

  const salida = {
    corrida: libro.corrida,
    cerrada_en: new Date().toISOString(),
    captura: libro.captura,
    protocolo: libro.protocolo,
    contexto_limpio_en_todas: libro.invocaciones.every((i) => i.contexto_limpio === true),
    perfil,
  };
  fs.writeFileSync(path.join(dir, 'perfil.json'), JSON.stringify(salida, null, 2) + '\n');

  console.log('perfil de los siete grupos · ' + libro.corrida + '\n');
  console.log('grupo  canal       niveles           modal  fracción  rango  triggers  lectura');
  for (const p of perfil) {
    console.log(
      p.group_id.toUpperCase().padEnd(6),
      p.channel.padEnd(11),
      ('[' + p.niveles.join(',') + ']').padEnd(17),
      String(p.nivel_modal).padStart(5),
      String(p.fraccion_en_el_modo).padStart(9),
      String(p.rango).padStart(6),
      String(p.triggers_distintos).padStart(9),
      p.criterios_leidos_del_screenshot.length ? '  ' + p.criterios_leidos_del_screenshot.join(',') : '  —'
    );
  }
  console.log('\n-> ' + path.relative(RAIZ, path.join(dir, 'perfil.json')));
}

const modo = process.argv[2];
if (modo === 'preparar') preparar();
else if (modo === 'recoger') recoger();
else { console.error('uso: node scripts/orchestrate.js preparar|recoger [opciones]'); process.exit(1); }
