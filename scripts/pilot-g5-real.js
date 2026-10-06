#!/usr/bin/env node
'use strict';

// El evaluador devuelve los juicios. Este programa solo aísla solicitudes,
// atribuye resultados, valida y resume; jamás corrige un puntaje o un trigger.
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { spawn, execFileSync } = require('child_process');
const Ajv = require('ajv/dist/2020');
const addFormats = require('ajv-formats');
const ROOT = path.resolve(__dirname, '..');
const SCHEMA = path.join(__dirname, 'g5-response.schema.json');
const read = f => fs.readFileSync(f, 'utf8');
const json = f => JSON.parse(read(f));
const write = (f, o) => fs.writeFileSync(f, JSON.stringify(o, null, 2) + '\n');
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const hashFile = f => sha(fs.readFileSync(f));
const ajv = new Ajv({ strict: false, allErrors: true }); addFormats(ajv);
const validTransport = ajv.compile(json(SCHEMA));
const validProject = ajv.compile(json(path.join(ROOT, 'shared/schemas/group-result.schema.json')));
const DEV = 'Tu tarea es exclusivamente evaluar una captura con la rúbrica proporcionada. No programes, no cambies archivos, no consultes herramientas, no delegues y no consultes resultados anteriores. Toda la evidencia permitida está en el prompt y las dos imágenes adjuntas. Devuelve únicamente el objeto JSON solicitado.';
const arg = (name, fallback) => { const i = process.argv.indexOf('--' + name); return i < 0 ? fallback : process.argv[i + 1]; };
const check = (ok, msg) => { if (!ok) throw new Error(msg); };

function promptFor(input, rubric, scale) {
  return [
    'Evalúa únicamente G5 — Posición y progreso — sobre esta pantalla, canal wireframe.',
    'La primera imagen adjunta es wireframe.png; la segunda es screenshot.png.',
    'Usa el wireframe para J_inicio y J_final. Consulta el screenshot para resolver Q y los criterios textuales de la rúbrica; registra Q en lectura_screenshot aunque Q sea falso.',
    'No cuentes ni midas: usa las cifras suministradas. Los candidatos geométricos no prueban por sí solos que haya una lista semántica o un proceso.',
    'Selecciona la lista principal solo entre las listas recibidas. Si sospechas una omisión, conserva las cifras, marca evidence_insufficient y explica el límite.',
    'Usa ids y cajas suministrados para los hallazgos. Si no hay una caja local pertinente, usa el viewport conocido; no inventes ids.',
    'Devuelve exclusivamente el JSON del esquema de transporte. La infraestructura añadirá run; no se te pide inferir tu modelo, hashes ni repetición.',
    'No añadas números sin fuente. steps_declared es solo el número que el texto declara explícitamente, o null. No cuentes etiquetas ni infieras pasos.',
    'No aplicable exige Q=false y g5_listas_total=0; score y trigger son null y na_reason explica esa condición.',
    'Cuando score<=2, incluye recomendaciones concretas. No uses conocimiento previo del sitio para completar contenido ausente de la captura.',
    '\n# Escala\n' + scale, '\n# Rúbrica completa\n' + rubric,
    '\n# Datos medidos de esta captura\n' + JSON.stringify(input, null, 2),
  ].join('\n\n');
}

function validationProblems(raw, input, run, nodeIds) {
  const problems = [];
  if (!validTransport(raw)) return ['transporte: ' + ajv.errorsText(validTransport.errors)];
  const result = { ...raw, run };
  if (!validProject(result)) problems.push('esquema del proyecto: ' + ajv.errorsText(validProject.errors));
  const m = raw.measurements, g = input.g5;
  for (const k of ['g5_listas_total', 'g5_lista_principal_sugerida']) if (m[k] !== g[k]) problems.push(k + ' cambió respecto a la fuente');
  if (m.main_list_parent_id !== null && !g.g5_listas.some(l => l.id_padre === m.main_list_parent_id)) problems.push('lista principal inexistente en los candidatos suministrados');
  if (m.main_list_parent_id === null && (m.J_inicio !== null || m.J_final !== null)) problems.push('jerarquía declarada sin lista principal');
  if (raw.not_applicable !== (!m.Q && g.g5_listas_total === 0)) problems.push('no aplicabilidad incompatible con las entradas');
  if (raw.not_applicable && (raw.score !== null || raw.trigger !== null || !raw.na_reason)) problems.push('no aplicable sin razón o con puntaje');
  if (!raw.not_applicable && (raw.score === null || raw.trigger === null)) problems.push('aplicable sin puntaje o trigger');
  if (!m.lectura_screenshot.includes('Q')) problems.push('no se declara la lectura textual requerida de Q');
  if (raw.score !== null && raw.score <= 2 && !raw.recommendations.length) problems.push('puntaje bajo sin recomendaciones');
  if (nodeIds && raw.findings.some(f => f.node_ids.some(id => !nodeIds.has(id)))) problems.push('hallazgo con id ausente de la captura');
  return problems;
}

function prepare(out) {
  check(!fs.existsSync(out), 'El directorio ya existe; no se sobrescribe un experimento.');
  const model = arg('model'), effort = arg('effort');
  check(model && effort, 'Faltan --model y --effort: la atribución no tiene valores por defecto.');
  const concurrency = Number(arg('concurrency', '3'));
  check(Number.isInteger(concurrency) && concurrency >= 1 && concurrency <= 4, 'concurrency debe estar entre 1 y 4');
  const rows = read(path.join(ROOT, 'corpus/calibracion-v1.csv')).trim().split(/\r?\n/).slice(1).map(r => r.split(','));
  const ids = rows.filter(r => r[5] === 'calibracion').map(r => r[0]).sort();
  check(ids.length === 24 && new Set(ids).size === 24, 'Se requieren las 24 páginas declaradas.');
  execFileSync(process.execPath, [path.join(ROOT, 'scripts/seal-corpus.js'), '--manifiesto', 'corpus/calibracion-v1.csv', '--capturas', 'calibracion', '--sello', 'corpus/SELLO-CALIBRACION-v1', '--nombre', 'calibracion-v1', '--rol', 'calibracion', '--verify'], { cwd: ROOT, stdio: 'inherit' });
  fs.mkdirSync(out, { recursive: true });
  for (const d of ['entradas', 'prompts', 'respuestas', 'resultados', 'trazas']) fs.mkdirSync(path.join(out, d));
  fs.copyFileSync(SCHEMA, path.join(out, 'response.schema.json'));
  const rubricPath = path.join(ROOT, 'skills/g5-posicion-progreso/SKILL.md');
  const scalePath = path.join(ROOT, 'shared/escala.md');
  fs.copyFileSync(rubricPath, path.join(out, 'RUBRICA.md')); fs.copyFileSync(scalePath, path.join(out, 'ESCALA.md'));
  const manifest = {
    version: '1.0.0', registered_at: new Date().toISOString(), status: 'registrado',
    git_commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim(),
    model_id: model, runtime: 'codex-cli', cli_version: execFileSync('codex', ['--version'], { encoding: 'utf8' }).trim(),
    decoding: { model_reasoning_effort: effort, temperature: 'no expuesto por el runtime', top_p: 'no expuesto por el runtime' },
    repetitions: 5, planned_evaluations: 120, concurrency,
    protocol_version: '0.1.0', rubric_sha256: hashFile(rubricPath), scale_sha256: hashFile(scalePath),
    response_schema_sha256: hashFile(SCHEMA), runner_sha256: hashFile(__filename), developer_instructions_sha256: sha(DEV),
    attribution: 'run se añade por infraestructura; respuesta del modelo intacta y conservada',
    isolation: 'codex exec --ephemeral sin resume; instrucciones de proyecto y configuración personal desactivadas; sin herramientas, conectores, web ni salidas de otras evaluaciones',
    pages: [],
  };
  for (const id of ids) {
    const dir = path.join(ROOT, 'calibracion', id), meta = json(path.join(dir, 'meta.json')), m = json(path.join(dir, 'measurements.json'));
    check(m.schema_version === '1.0.3', id + ': medición distinta de 1.0.3');
    for (const c of ['wireframe', 'screenshot']) check(hashFile(path.join(dir, c + '.png')) === meta.sha256[c], id + ': hash de imagen inválido');
    const input = { pagina: { id, viewport: meta.viewport, captured_at: meta.capturedAt }, measurements_version: m.schema_version, g5: m.g5 };
    write(path.join(out, 'entradas', id + '.json'), input);
    const prompt = promptFor(input, read(rubricPath), read(scalePath));
    fs.writeFileSync(path.join(out, 'prompts', id + '.md'), prompt);
    manifest.pages.push({ id, captura: 'calibracion/' + id, prompt_hash: sha(prompt), input_sha256: hashFile(path.join(out, 'entradas', id + '.json')), captured_at: meta.capturedAt, capture_sha256: meta.sha256, nodes_sha256: hashFile(path.join(dir, 'nodes.json')), measurements_version: m.schema_version });
  }
  write(path.join(out, 'manifiesto.json'), manifest);
  console.log('Registradas 24 páginas × 5 repeticiones = 120 evaluaciones.');
}

async function evaluate(out, manifest, page, repetition, sandboxDir) {
  const key = page.id + '-r' + repetition, proofFile = path.join(out, 'trazas', key + '.json');
  if (fs.existsSync(proofFile)) {
    const proof = json(proofFile);
    if (proof.status === 'valido') return proof;
    throw new Error(key + ': hay un intento previo no válido; conservarlo y revisar antes de reejecutar.');
  }
  const input = json(path.join(out, 'entradas', page.id + '.json'));
  check(hashFile(path.join(out, 'entradas', page.id + '.json')) === page.input_sha256, key + ': entrada cambió');
  const prompt = read(path.join(out, 'prompts', page.id + '.md'));
  check(sha(prompt) === page.prompt_hash, key + ': prompt cambió');
  const capture = path.join(ROOT, page.captura);
  for (const channel of ['wireframe', 'screenshot']) check(hashFile(path.join(capture, channel + '.png')) === page.capture_sha256[channel], key + ': imagen cambió');
  const rawFile = path.join(out, 'respuestas', key + '.json');
  const args = ['exec', '--ignore-user-config', '--ephemeral', '--skip-git-repo-check', '--model', manifest.model_id, '--sandbox', 'read-only', '--cd', sandboxDir,
    '--disable', 'shell_tool', '--disable', 'apps', '-c', 'project_doc_max_bytes=0', '-c', 'web_search="disabled"',
    '-c', 'model_reasoning_effort=' + JSON.stringify(manifest.decoding.model_reasoning_effort), '-c', 'developer_instructions=' + JSON.stringify(DEV),
    '--image', path.join(capture, 'wireframe.png'), '--image', path.join(capture, 'screenshot.png'),
    '--output-schema', path.join(out, 'response.schema.json'), '--output-last-message', rawFile, '--json', '-'];
  const started = new Date().toISOString(), logPath = path.join(out, 'trazas', key + '.jsonl');
  const log = fs.createWriteStream(logPath), errLog = fs.createWriteStream(path.join(out, 'trazas', key + '.stderr.log'));
  const child = spawn('codex', args, { cwd: sandboxDir, stdio: ['pipe', 'pipe', 'pipe'] });
  const events = []; let buffer = '', spawnError = null;
  child.stdout.on('data', data => { log.write(data); buffer += data.toString(); const lines = buffer.split('\n'); buffer = lines.pop(); for (const line of lines) if (line.trim()) { try { events.push(JSON.parse(line)); } catch {} } });
  child.stderr.pipe(errLog);
  child.on('error', e => { spawnError = e.message; });
  const timer = setTimeout(() => child.kill('SIGTERM'), 600000);
  child.stdin.on('error', () => {}); child.stdin.end(prompt);
  const exit = await new Promise(resolve => child.on('close', (code, signal) => resolve({ code, signal })));
  clearTimeout(timer); await new Promise(resolve => log.end(resolve));
  const run = { model_id: manifest.model_id, runtime: manifest.runtime, repetition, prompt_hash: page.prompt_hash,
    captured_at: page.captured_at, decoding: manifest.decoding, capture_sha256: page.capture_sha256,
    measurements_version: page.measurements_version, protocol_version: manifest.protocol_version };
  const proof = { id: key, started_at: started, ended_at: new Date().toISOString(), exit, spawn_error: spawnError,
    thread_id: events.find(e => e.type === 'thread.started')?.thread_id || null,
    usage: events.find(e => e.type === 'turn.completed')?.usage || null,
    prompt_hash: page.prompt_hash, response_schema_sha256: manifest.response_schema_sha256,
    contexto_limpio: true, mecanismo_de_aislamiento: manifest.isolation, status: 'error_tecnico', errors: [] };
  if (exit.code === 0 && fs.existsSync(rawFile)) {
    try {
      const raw = json(rawFile), messages = events.filter(e => e.type === 'item.completed' && e.item?.type === 'agent_message');
      check(messages.length && JSON.stringify(JSON.parse(messages.at(-1).item.text)) === JSON.stringify(raw), key + ': respuesta no coincide con la traza');
      const nodeIds = new Set(json(path.join(capture, 'nodes.json')).map(n => n.id));
      proof.errors = validationProblems(raw, input, run, nodeIds);
      if (events.some(e => e.type === 'item.completed' && !['agent_message', 'reasoning'].includes(e.item?.type))) proof.errors.push('el evaluador usó herramientas no permitidas');
      check(proof.thread_id && proof.usage, key + ': falta prueba de una sesión terminada');
      proof.status = proof.errors.length ? 'invalido' : 'valido';
      proof.raw_sha256 = hashFile(rawFile);
      if (proof.status === 'valido') { const finalFile = path.join(out, 'resultados', key + '.json'); write(finalFile, { ...raw, run }); proof.result_sha256 = hashFile(finalFile); }
    } catch (e) { proof.status = 'invalido'; proof.errors.push(e.message); }
  } else proof.errors = events.filter(e => ['error', 'turn.failed'].includes(e.type));
  proof.trace_sha256 = hashFile(logPath); write(proofFile, proof);
  console.log(key + ' ' + proof.status + (proof.status === 'valido' ? ' nivel=' + json(path.join(out, 'resultados', key + '.json')).score : ' ' + JSON.stringify(proof.errors).slice(0, 300)));
  return proof;
}

async function run(out) {
  const manifest = json(path.join(out, 'manifiesto.json'));
  check(manifest.runner_sha256 === hashFile(__filename), 'El ejecutor cambió después del registro. Crear otra versión del experimento.');
  check(manifest.response_schema_sha256 === hashFile(path.join(out, 'response.schema.json')), 'El esquema cambió.');
  check(execFileSync('codex', ['--version'], { encoding: 'utf8' }).trim() === manifest.cli_version, 'El runtime cambió.');
  const all = manifest.pages.flatMap(page => Array.from({ length: 5 }, (_, i) => ({ page, repetition: i + 1 })));
  const only = arg('only'), tasks = only ? all.filter(t => t.page.id + '-r' + t.repetition === only) : all;
  check(tasks.length, 'No hay evaluaciones que correspondan a --only.');
  const sandboxDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-g5-evaluator-'));
  let cursor = 0, stop = false;
  try {
    await Promise.all(Array.from({ length: Math.min(manifest.concurrency, tasks.length) }, async () => {
      while (!stop && cursor < tasks.length) {
        const task = tasks[cursor++], proof = await evaluate(out, manifest, task.page, task.repetition, sandboxDir);
        if (proof.status === 'error_tecnico') stop = true;
      }
    }));
  } finally { fs.rmSync(sandboxDir, { recursive: true, force: true }); }
  analyze(out);
}

function analyze(out) {
  const manifest = json(path.join(out, 'manifiesto.json')), pages = [], distribution = [0, 0, 0, 0, 0];
  let valid = 0, invalid = 0, technical = 0, na = 0, insufficient = 0, readScreenshot = 0, qTrue = 0;
  const threads = new Set(), usage = {};
  for (const page of manifest.pages) {
    const results = [], states = [];
    for (let r = 1; r <= 5; r++) {
      const key = page.id + '-r' + r, proofFile = path.join(out, 'trazas', key + '.json');
      if (!fs.existsSync(proofFile)) { states.push('pendiente'); continue; }
      const proof = json(proofFile); states.push(proof.status);
      if (proof.thread_id) { check(!threads.has(proof.thread_id), 'Sesión repetida: no demuestra contexto limpio'); threads.add(proof.thread_id); }
      for (const [k, v] of Object.entries(proof.usage || {})) if (typeof v === 'number') usage[k] = (usage[k] || 0) + v;
      if (proof.status !== 'valido') { if (proof.status === 'invalido') invalid++; else technical++; continue; }
      const finalFile = path.join(out, 'resultados', key + '.json'), rawFile = path.join(out, 'respuestas', key + '.json');
      check(hashFile(finalFile) === proof.result_sha256 && hashFile(rawFile) === proof.raw_sha256, key + ': archivo de respuesta cambió');
      const result = json(finalFile), { run: attribution, ...unchanged } = result;
      check(JSON.stringify(unchanged) === JSON.stringify(json(rawFile)), key + ': se modificó el juicio del modelo');
      check(attribution.prompt_hash === page.prompt_hash && attribution.repetition === r, key + ': atribución incorrecta');
      valid++; results.push(result); if (result.not_applicable) na++; else distribution[result.score]++;
      if (result.evidence_insufficient) insufficient++;
      if (result.measurements.lectura_screenshot.length) readScreenshot++;
      if (result.measurements.Q) qTrue++;
    }
    const counts = new Map(); for (const result of results) counts.set(result.score, (counts.get(result.score) || 0) + 1);
    const max = Math.max(0, ...counts.values()), modes = [...counts].filter(([, n]) => n === max).map(([level]) => level);
    const numeric = results.filter(r => !r.not_applicable).map(r => r.score);
    pages.push({ id: page.id, estados: states, validas: results.length, niveles: results.map(r => r.score), triggers: results.map(r => r.trigger),
      modas: modes, fraccion_en_moda: results.length ? max / results.length : null, rango_ordinal: numeric.length ? Math.max(...numeric) - Math.min(...numeric) : null,
      triggers_distintos: new Set(results.map(r => r.trigger)).size, evidencia_insuficiente: results.filter(r => r.evidence_insufficient).length,
      Q_verdadero: results.filter(r => r.measurements.Q).length, listas_principales: results.map(r => r.measurements.main_list_parent_id) });
  }
  const summary = { analizado_en: new Date().toISOString(), planeadas: 120, validas: valid, invalidas: invalid, errores_tecnicos: technical,
    pendientes: 120 - valid - invalid - technical, completado: valid === 120, niveles_por_evaluacion: distribution, no_aplicables: na,
    evidencia_insuficiente: insufficient, lectura_screenshot: readScreenshot, Q_verdadero: qTrue,
    paginas_con_cinco_validas: pages.filter(p => p.validas === 5).length, paginas_estables_en_nivel: pages.filter(p => p.validas === 5 && new Set(p.niveles).size === 1).length,
    paginas_con_empate_modal: pages.filter(p => p.modas.length > 1).map(p => p.id), uso_tokens: usage, paginas: pages };
  write(path.join(out, 'resumen.json'), summary);
  const rows = pages.map(p => [p.id, p.validas, p.niveles.join('|'), p.triggers.join('|'), p.modas.join('|'), p.fraccion_en_moda, p.rango_ordinal, p.triggers_distintos, p.evidencia_insuficiente, p.Q_verdadero].join(','));
  fs.writeFileSync(path.join(out, 'resumen.csv'), 'pagina,validas,niveles,triggers,modas,fraccion_en_moda,rango_ordinal,triggers_distintos,evidencia_insuficiente,Q_verdadero\n' + rows.join('\n') + '\n');
  console.log(JSON.stringify({ validas: valid, invalidas: invalid, errores_tecnicos: technical, pendientes: summary.pendientes, distribucion: distribution, no_aplicables: na }));
  return summary;
}

if (require.main === module) {
  const out = path.resolve(ROOT, arg('out', 'pilotos/g5-2026-10-06'));
  Promise.resolve().then(() => {
    const mode = process.argv[2];
    if (mode === 'preparar') return prepare(out);
    if (mode === 'ejecutar') return run(out);
    if (mode === 'analizar') return analyze(out);
    throw new Error('uso: pilot-g5-real.js preparar --model ID --effort E | ejecutar | analizar [--out DIR]');
  }).catch(e => { console.error(e.message); process.exitCode = 1; });
}
module.exports = { promptFor, validationProblems };
