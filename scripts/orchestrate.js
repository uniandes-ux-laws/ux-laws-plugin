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
const { isDeepStrictEqual } = require('util');
const Ajv = require('ajv/dist/2020');
const addFormats = require('ajv-formats');
const { withoutClasses, validateV2: validarG5 } = require('./g5-evaluator-contract');
const { project: proyectarG4 } = require('../measure/g4-input-v2');
const { validationProblems: validarG4 } = require('./g4-evaluator-contract');
const { build: construirG3G6 } = require('../measure/g3-g6-evidence');
const { validationProblems: validarG3G6, promptFor: promptG3G6 } = require('./g3-g6-contract');
const { VERSION: VERSION_G1, prepararG1, revisarG1 } = require('../measure/g1-input');
const { revisarEstado } = require('./estado-resultado');

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
function construirPrompt(grupo, canal, capturaRel, atribucion, entradaG5 = null, entradaG4 = null, entradaG3G6 = null, entradaG1 = null) {
  const rubrica = leer(path.join(RAIZ, 'skills', grupo.slug, 'SKILL.md'));
  const escala = leer(path.join(RAIZ, 'shared', 'escala.md'));
  if (entradaG3G6) return promptG3G6(entradaG3G6,rubrica,escala).replace('La infraestructura añadirá únicamente run.','Incluye run con la atribución exacta entregada al final.') + '\n# Atribución exacta: añádela como run a la salida de la corrida\n' + JSON.stringify(atribucion);
  return [
    '# Tarea',
    '',
    'Evalúa el grupo de constructo ' + grupo.id.toUpperCase() + ' — ' + grupo.nombre + ' — sobre la pantalla capturada',
    'en `' + capturaRel + '`, canal `' + canal + '`.',
    '',
    'Entradas de la evaluación:',
    '',
    grupo.id === 'g1'
      ? '- Para G1 usa solo el bloque de medidas incluido al final, versión 1.0.7. No leas measurements.json ni las medidas originales: conservan la versión histórica 1.0.6.'
      : grupo.id === 'g4'
      ? '- Para G4 usa solo el bloque de medidas incluido al final, con proyección 1.0.7. No leas measurements.json, nodes.json ni metadatos originales: conservan la fuente histórica 1.0.6.'
      : grupo.id === 'g5'
      ? '- Para G5 usa solo el bloque de medidas incluido al final. No leas measurements.json, nodes.json ni metadatos de la captura: los originales conservan atributos que no forman parte de esta entrada de evaluación.'
      : '- `measurements.json` — las cifras ya calculadas. **No recuentes nada.**',
    '- `' + canal + '.png` — el canal de esta corrida.',
    '- `screenshot.png` — solo para los criterios que la rúbrica marca como dependientes del texto.',
    '',
    'Devuelve **un único objeto JSON** conforme a `shared/schemas/group-result.schema.json`,',
    'sin texto alrededor. Reglas que la validación hace cumplir:',
    '',
    '- `measurements` repite los campos de la entrada de medidas que sostuvieron el resultado, con',
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
    '- No aplica: not_applicable=true, score=null, trigger=null y na_reason con la condición objetiva.',
    '- Si la rúbrica permite abstenerse: not_applicable=false, score=null, trigger=null,',
    '  evidence_insufficient=true y measurements.motivo_abstencion con la razón. No uses na_reason.',
    '- Un puntaje de 0 a 4 puede llevar una advertencia de evidencia insuficiente; eso no lo convierte en abstención.',
    ...(grupo.id === 'g1' ? [
      '- G1: copia g1_grupos_primer_nivel de la entrada en measurements. Con cero o un grupo,',
      '  devuelve no aplica y explica la cantidad observada. No inventes un puntaje.',
      '- G1 conserva la limitación no interpretable v1; no se cambiaron sus cortes para repartir niveles.',
    ] : []),
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
    ...(grupo.id === 'g1' ? ['', '# Medidas de G1 1.0.7', '', JSON.stringify(entradaG1, null, 2)] : []),
    ...(grupo.id === 'g4' ? ['', '# Entrada de G4 1.0.7', '', JSON.stringify(entradaG4, null, 2)] : []),
    ...(grupo.id === 'g5' ? ['', '# Medidas de G5 sin clases CSS', '', JSON.stringify(entradaG5, null, 2)] : []),
  ].join('\n');
}

function preparar() {
  const url = arg('url', null);
  let captura = arg('captura', null);
  const out = path.resolve(RAIZ, requerido('out', 'Nombra la corrida: --out corridas/<nombre>.'));
  // --repeticiones si conserva default porque NO es atribucion: es la constante
  // del protocolo (decision 3, cinco por configuracion) y queda registrada en el
  // libro. Aun asi se valida contra el rango que el esquema admite.
  const reps = Number(arg('repeticiones', '5'));
  if (!Number.isInteger(reps) || reps < 1 || reps > 5) { console.error('--repeticiones debe ser un entero entre 1 y 5'); process.exit(1); }
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

  console.log('verificando mediciones ...');
  if (!fs.existsSync(path.join(captura,'measurements.json'))) execFileSync('node', [path.join(RAIZ, 'measure', 'measure-page.js'), captura], { stdio: 'inherit' });
  execFileSync('node', [path.join(RAIZ, 'scripts', 'validate-measurements.js'), path.join(captura, 'measurements.json')], { stdio: 'inherit' });

  const meta = JSON.parse(leer(path.join(captura, 'meta.json')));
  const medicion = JSON.parse(leer(path.join(captura, 'measurements.json')));
  if (JSON.stringify(medicion.pagina.sha256)!==JSON.stringify(meta.sha256)) throw Error('Mediciones e imágenes no corresponden; conservar la captura y preparar otra carpeta.');
  const capturaRel = path.relative(RAIZ, captura).replace(/\\/g, '/');
  const entradaG5 = withoutClasses({ pagina: { id: path.basename(captura), viewport: meta.viewport, captured_at: meta.capturedAt }, measurements_version: medicion.schema_version, g5: medicion.g5 });
  fs.mkdirSync(path.join(out, 'entradas'), { recursive: true });
  const entradaG5Path = path.join(out, 'entradas', 'g5.json');
  fs.writeFileSync(entradaG5Path, JSON.stringify(entradaG5, null, 2) + '\n');

  const entradaG1 = prepararG1({ pagina: { id: path.basename(captura), viewport: meta.viewport, captured_at: meta.capturedAt }, measurements_version: medicion.schema_version, g1: medicion.g1 });
  const entradaG1Path = path.join(out, 'entradas', 'g1.json');
  fs.writeFileSync(entradaG1Path, JSON.stringify(entradaG1, null, 2) + '\n');

  const entradaG4 = proyectarG4({ pagina: { id: path.basename(captura), viewport: meta.viewport, captured_at: meta.capturedAt, sanity_ok: meta.sanity?.ok ?? null, consent_limpio: meta.consent ? meta.consent.limpio !== false : null }, measurements_version: medicion.schema_version, formato_prompt: 'compacto-v2', g4: medicion.g4, geometria_nodos: JSON.parse(leer(path.join(captura, 'nodes.json'))).map(n => [n.id, n.parentId ?? null]) });
  const entradaG4Path = path.join(out, 'entradas', 'g4.json');
  fs.writeFileSync(entradaG4Path, JSON.stringify(entradaG4, null, 2) + '\n');

  const entradasG3G6 = Object.fromEntries(['g3','g6'].map(g=>[g,construirG3G6(captura,g)]));
  for (const [g,input] of Object.entries(entradasG3G6)) fs.writeFileSync(path.join(out,'entradas',g+'.json'),JSON.stringify(input,null,2)+'\n');
  const invocaciones = [];
  for (const g of GRUPOS) {
    const versionMedidas = entradasG3G6[g.id]?.measurements_version ?? (g.id === 'g1' ? entradaG1.measurements_version : g.id === 'g4' ? entradaG4.measurements_version : medicion.schema_version);
    const atribucion = {
      model_id: modelo, runtime, repetition: '1..' + reps, decoding,
      capture_sha256: meta.sha256,
      measurements_version: versionMedidas,
      protocol_version: PROTOCOLO,
      captured_at: meta.capturedAt,
    };
    const prompt = construirPrompt(g, g.canal, capturaRel, atribucion, entradaG5, entradaG4, entradasG3G6[g.id] ?? null, entradaG1);
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
        measurements_version: versionMedidas,
        protocol_version: PROTOCOLO,
        captured_at: meta.capturedAt,
        contexto_limpio: null,
        mecanismo_de_aislamiento: null,
        estado: 'pendiente',
        ...(g.id === 'g1' ? { g1_input_version: VERSION_G1, entrada: path.relative(RAIZ, entradaG1Path).replace(/\\/g, '/'), entrada_sha256: sha(leer(entradaG1Path)) } : {}),
        ...(['g3','g6'].includes(g.id) ? { contrato_g3_g6: '0.1.0', entrada: path.relative(RAIZ,path.join(out,'entradas',g.id+'.json')), entrada_sha256: sha(leer(path.join(out,'entradas',g.id+'.json'))) } : {}),
        ...(g.id === 'g4' ? { g4_contract_version: '0.2.0', entrada: path.relative(RAIZ, entradaG4Path).replace(/\\/g, '/'), entrada_sha256: sha(leer(entradaG4Path)) } : {}),
        ...(g.id === 'g5' ? { g5_contract_version: '0.2.0', entrada: path.relative(RAIZ, entradaG5Path).replace(/\\/g, '/'), entrada_sha256: sha(leer(entradaG5Path)) } : {}),
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

function revisarLibro(libro, dir) {
  if (!libro || typeof libro !== 'object' || Array.isArray(libro)) return ['el libro debe ser un objeto JSON'];
  if (!Number.isInteger(libro.repeticiones) || libro.repeticiones < 1 || libro.repeticiones > 5) {
    return ['repeticiones debe ser un entero entre 1 y 5'];
  }
  if (!Array.isArray(libro.invocaciones)) return ['falta la lista de invocaciones'];

  const problemas = [];
  const ids = new Set();
  const posiciones = new Set();
  const archivos = new Set();
  const rutas = new Set();
  const prompts = new Map();
  const esperadas = GRUPOS.length * libro.repeticiones;
  if (libro.invocaciones.length !== esperadas) {
    problemas.push('se esperaban ' + esperadas + ' invocaciones y hay ' + libro.invocaciones.length);
  }

  for (const [indice, inv] of libro.invocaciones.entries()) {
    if (!inv || typeof inv !== 'object' || Array.isArray(inv)) {
      problemas.push('invocacion ' + (indice + 1) + ': debe ser un objeto');
      continue;
    }
    const nombre = typeof inv.id === 'string' && inv.id.trim() ? inv.id : 'invocacion ' + (indice + 1);
    if (nombre !== inv.id) problemas.push(nombre + ': falta un id');
    else if (ids.has(inv.id)) problemas.push(nombre + ': id duplicado');
    else ids.add(inv.id);

    const grupo = GRUPOS.find(g => g.id === inv.group_id);
    if (!grupo) problemas.push(nombre + ': grupo desconocido (' + inv.group_id + ')');
    else if (inv.channel !== grupo.canal) problemas.push(nombre + ': canal distinto del previsto para ' + grupo.id);
    const repeticionValida = Number.isInteger(inv.repetition) && inv.repetition >= 1 && inv.repetition <= libro.repeticiones;
    if (!repeticionValida) problemas.push(nombre + ': repeticion fuera de 1..' + libro.repeticiones);
    if (grupo && inv.channel === grupo.canal && repeticionValida) {
      const posicion = inv.group_id + '-' + inv.channel + '-r' + inv.repetition;
      if (posiciones.has(posicion)) problemas.push(nombre + ': posicion duplicada (' + posicion + ')');
      posiciones.add(posicion);
    }

    if (typeof inv.prompt_hash !== 'string' || !/^[a-f0-9]{64}$/.test(inv.prompt_hash)) {
      problemas.push(nombre + ': falta un prompt_hash valido');
    } else if (grupo) {
      if (prompts.has(grupo.id) && prompts.get(grupo.id) !== inv.prompt_hash) {
        problemas.push(nombre + ': las repeticiones de ' + grupo.id + ' tienen prompts distintos');
      }
      prompts.set(grupo.id, inv.prompt_hash);
    }

    if (typeof inv.resultado_esperado !== 'string' || !inv.resultado_esperado.trim()) {
      problemas.push(nombre + ': falta la ruta del resultado');
      continue;
    }
    const ruta = path.resolve(RAIZ, inv.resultado_esperado);
    const padre = path.dirname(ruta);
    rutas.add(path.join(fs.existsSync(padre) ? fs.realpathSync(padre) : padre, path.basename(ruta)));
    const archivo = fs.existsSync(ruta) ? fs.realpathSync(ruta) : ruta;
    if (archivos.has(archivo)) problemas.push(nombre + ': archivo de resultado repetido');
    archivos.add(archivo);
  }

  // Contar filas no basta: una repetición duplicada puede ocultar otra que falta.
  for (const grupo of GRUPOS) {
    for (let r = 1; r <= libro.repeticiones; r++) {
      const posicion = grupo.id + '-' + grupo.canal + '-r' + r;
      if (!posiciones.has(posicion)) problemas.push('falta la invocacion ' + posicion);
    }
  }
  const carpeta = path.join(dir, 'resultados');
  if (fs.existsSync(carpeta)) {
    if (!fs.statSync(carpeta).isDirectory()) problemas.push('resultados debe ser una carpeta');
    else for (const nombre of fs.readdirSync(carpeta).filter(f => f.endsWith('.json'))) {
      if (!rutas.has(path.join(fs.realpathSync(carpeta), nombre))) problemas.push('resultado no registrado en el libro: ' + nombre);
    }
  }
  return problemas;
}

function detenerCierre(problemas, dir) {
  if (!problemas.length) return;
  console.error('\nNo se puede cerrar la corrida. ' + problemas.length + ' problema(s):\n');
  for (const problema of problemas) console.error('  ' + problema);
  console.error('\nNo se escribe perfil ni se corrigen las respuestas.');
  if (fs.existsSync(path.join(dir, 'perfil.json'))) {
    console.error('Hay un perfil anterior: se conserva sin actualizar; no corresponde a este intento de cierre.');
  }
  process.exit(1);
}

function recoger() {
  const dir = path.resolve(RAIZ, arg('corrida', ''));
  const libroPath = path.join(dir, 'invocaciones.json');
  if (!fs.existsSync(libroPath)) { console.error('no existe ' + libroPath); process.exit(1); }
  let libro;
  try { libro = JSON.parse(leer(libroPath)); }
  catch (e) { detenerCierre(['el libro no contiene JSON valido: ' + e.message], dir); }

  const problemas = revisarLibro(libro, dir);
  detenerCierre(problemas, dir);
  const resultados = [];
  for (const inv of libro.invocaciones) {
    const f = path.resolve(RAIZ, inv.resultado_esperado);
    if (!fs.existsSync(f)) { problemas.push(inv.id + ': falta el resultado'); continue; }

    let obj;
    try { obj = JSON.parse(leer(f)); }
    catch (e) { problemas.push(inv.id + ': JSON ilegible — ' + e.message); continue; }

    if (!validarResultado(obj)) {
      const e = validarResultado.errors[0];
      problemas.push(inv.id + ' [' + inv.group_id + ']: no valida contra el esquema — ' + (e.instancePath || '(raíz)') + ' ' + e.message);
      continue;
    }
    const revision = revisarEstado(obj);
    for (const error of revision.errores) problemas.push(inv.id + ': ' + error);
    if (revision.errores.length) continue;
    if (obj.group_id !== inv.group_id) problemas.push(inv.id + ': el resultado dice group_id ' + obj.group_id);
    if (obj.channel !== inv.channel) problemas.push(inv.id + ': el resultado dice channel ' + obj.channel);
    if (inv.group_id === 'g1' && (inv.g1_input_version !== undefined || inv.measurements_version === VERSION_G1)) {
      try {
        if (inv.g1_input_version !== VERSION_G1 || inv.measurements_version !== VERSION_G1) throw Error('versión de entrada de G1 distinta');
        const entrada = leer(path.resolve(RAIZ, inv.entrada));
        if (sha(entrada) !== inv.entrada_sha256) throw Error('entrada de G1 modificada');
        for (const error of revisarG1(obj, JSON.parse(entrada))) problemas.push(inv.id + ': ' + error);
      } catch (e) {
        problemas.push(inv.id + ': no se puede comprobar la entrada de G1 — ' + e.message);
      }
    }
    if (['g3','g6'].includes(inv.group_id) && inv.contrato_g3_g6 === '0.1.0') {
      const inputPath=path.join(RAIZ,inv.entrada);
      if (sha(leer(inputPath))!==inv.entrada_sha256) problemas.push(inv.id+': entrada G3/G6 modificada');
      const {run,...raw}=obj;
      for(const error of validarG3G6(raw,JSON.parse(leer(inputPath)),run)) problemas.push(inv.id+': '+error);
    }
    if (inv.group_id === 'g4' && inv.g4_contract_version === '0.2.0') {
      const inputPath = path.join(RAIZ, inv.entrada);
      if (sha(leer(inputPath)) !== inv.entrada_sha256) problemas.push(inv.id + ': entrada G4 modificada');
      const { run, ...raw } = obj;
      const nodeIds = new Set(JSON.parse(leer(path.join(RAIZ, inv.captura, 'nodes.json'))).map(n => n.id));
      for (const error of validarG4(raw, JSON.parse(leer(inputPath)), run, nodeIds)) problemas.push(inv.id + ': ' + error);
    }
    if (inv.group_id === 'g5' && inv.g5_contract_version === '0.2.0') {
      const inputPath = path.join(RAIZ, inv.entrada);
      if (sha(leer(inputPath)) !== inv.entrada_sha256) problemas.push(inv.id + ': entrada G5 modificada');
      const { run, ...raw } = obj;
      const nodeIds = new Set(JSON.parse(leer(path.join(RAIZ, inv.captura, 'nodes.json'))).map(n => n.id));
      for (const error of validarG5(raw, JSON.parse(leer(inputPath)), run, nodeIds)) problemas.push(inv.id + ': ' + error);
    }
    if (obj.run.repetition !== inv.repetition) problemas.push(inv.id + ': repetition ' + obj.run.repetition + ' no coincide con la invocacion');
    if (obj.run.prompt_hash !== inv.prompt_hash) problemas.push(inv.id + ': prompt_hash distinto del que el libro fijo — las repeticiones no recibieron el mismo prompt');
    if (!modeloValido(obj.run.model_id)) problemas.push(inv.id + ': run.model_id "' + obj.run.model_id + '" no es un identificador de modelo valido');
    if (obj.run.model_id !== inv.model_id) problemas.push(inv.id + ': el resultado dice model_id ' + obj.run.model_id + ' y el libro fijo ' + inv.model_id);
    if (obj.run.runtime !== inv.runtime) problemas.push(inv.id + ': el resultado dice runtime ' + obj.run.runtime + ' y el libro fijo ' + inv.runtime);
    if (obj.run.measurements_version !== inv.measurements_version) problemas.push(inv.id + ': measurements_version ' + obj.run.measurements_version + ' no es la que midio esta captura (' + inv.measurements_version + ')');
    if (obj.run.protocol_version !== inv.protocol_version) problemas.push(inv.id + ': protocol_version ' + obj.run.protocol_version + ' no coincide con ' + inv.protocol_version);
    if (obj.run.captured_at !== inv.captured_at) problemas.push(inv.id + ': captured_at no coincide con la captura registrada');
    if (!isDeepStrictEqual(obj.run.decoding, inv.decoding)) problemas.push(inv.id + ': decoding no coincide con la configuracion registrada');
    if (!isDeepStrictEqual(obj.run.capture_sha256, inv.capture_sha256)) problemas.push(inv.id + ': capture_sha256 no corresponde a la captura que el libro asigno');
    if (inv.contexto_limpio !== true) problemas.push(inv.id + ': la invocacion no declara contexto_limpio');
    if (inv.contexto_limpio === true && !inv.mecanismo_de_aislamiento) problemas.push(inv.id + ': declara contexto limpio sin decir con que mecanismo');

    resultados.push({ inv, obj, estado: revision.estado, motivo: revision.motivo });
  }

  detenerCierre(problemas, dir);

  const perfil = GRUPOS.map((g) => {
    const rs = resultados.filter((r) => r.inv.group_id === g.id).sort((a, b) => a.inv.repetition - b.inv.repetition);
    const niveles = rs.map((r) => r.obj.score);
    const triggers = rs.map((r) => r.obj.trigger);
    const evaluaciones = rs.map(r => ({ repeticion: r.inv.repetition, estado: r.estado,
      score: r.obj.score, trigger: r.obj.trigger, motivo: r.motivo,
      evidencia_insuficiente: r.obj.evidence_insufficient === true }));
    const puntuadas = evaluaciones.filter(e => e.estado === 'puntaje');
    const numericos = puntuadas.map(e => e.score);
    const cuenta = new Map();
    for (const n of numericos) cuenta.set(n, (cuenta.get(n) || 0) + 1);
    const modal = [...cuenta.entries()].sort((a, b) => b[1] - a[1])[0];
    const rango = numericos.length ? Math.max(...numericos) - Math.min(...numericos) : null;
    const estabilidad = !numericos.length ? 'sin_puntajes' : numericos.length < rs.length ? 'serie_mixta'
      : rs.length < 5 ? 'repeticiones_insuficientes' : rango === 0 ? 'estable' : 'variable';
    const lectura = [...new Set(rs.flatMap((r) => (r.obj.measurements || {}).lectura_screenshot || []))];
    return {
      group_id: g.id, group_name: g.nombre, channel: g.canal,
      repeticiones: rs.length,
      niveles, triggers,
      evaluaciones,
      conteos: { puntajes: puntuadas.length, no_aplicables: evaluaciones.filter(e => e.estado === 'no_aplica').length,
        abstenciones: evaluaciones.filter(e => e.estado === 'abstencion').length,
        evidencia_insuficiente: evaluaciones.filter(e => e.evidencia_insuficiente).length },
      nivel_modal: modal ? modal[0] : null,
      fraccion_en_el_modo: modal ? +(modal[1] / rs.length).toFixed(3) : null,
      rango,
      estabilidad_nivel: estabilidad,
      triggers_distintos: new Set(puntuadas.map(e => e.trigger)).size,
      criterios_leidos_del_screenshot: lectura,
      comparacion_entre_canales_limpia: lectura.length === 0,
      ...(g.id === 'g1' ? { estado_instrumento: 'no_interpretable_v1',
        advertencias: ['G1 no distingue suficientemente entre las páginas del piloto. Sus puntajes se conservan como diagnóstico, sin presentarlos como una medida validada de calidad.'] } : {}),
    };
  });

  const salida = {
    version_perfil: '1.0.0',
    corrida: libro.corrida,
    cerrada_en: new Date().toISOString(),
    captura: libro.captura,
    protocolo: libro.protocolo,
    contexto_limpio_en_todas: libro.invocaciones.every((i) => i.contexto_limpio === true),
    perfil,
  };
  fs.writeFileSync(path.join(dir, 'perfil.json'), JSON.stringify(salida, null, 2) + '\n');

  console.log('perfil de los siete grupos · ' + libro.corrida + '\n');
  console.log('NA = no aplica; ABST = no se puede puntuar. Los motivos están en perfil.json.\n');
  console.log('grupo  canal       resultados                  modal  fracción  rango  triggers  lectura  estabilidad');
  for (const p of perfil) {
    console.log(
      p.group_id.toUpperCase().padEnd(6),
      p.channel.padEnd(11),
      ('[' + p.evaluaciones.map(e => e.estado === 'puntaje' ? e.score : e.estado === 'no_aplica' ? 'NA' : 'ABST').join(',') + ']').padEnd(28),
      String(p.nivel_modal).padStart(5),
      String(p.fraccion_en_el_modo).padStart(9),
      String(p.rango).padStart(6),
      String(p.triggers_distintos).padStart(9),
      p.criterios_leidos_del_screenshot.join(',') || '—',
      p.estabilidad_nivel,
      p.estado_instrumento === 'no_interpretable_v1' ? ' | No interpretable v1' : ''
    );
  }
  console.log('\n-> ' + path.relative(RAIZ, path.join(dir, 'perfil.json')));
}

const modo = process.argv[2];
if (modo === 'preparar') preparar();
else if (modo === 'recoger') recoger();
else { console.error('uso: node scripts/orchestrate.js preparar|recoger [opciones]'); process.exit(1); }
