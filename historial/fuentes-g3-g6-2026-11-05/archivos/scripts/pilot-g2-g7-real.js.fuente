#!/usr/bin/env node
'use strict';

// El evaluador devuelve los juicios. Este programa solo aísla solicitudes,
// atribuye resultados, valida y resume; jamás corrige un puntaje o un trigger.
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { spawn, execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const groupPaths={g2:'g2-arquitectura-decision',g7:'g7-targeting-motor'};
const {promptFor,validationProblems,anchorAudit}=require('./pilot-g2-g7-contract');
const SUPPORT=['pilot-g2-g7-contract.js','g2-response.schema.json','g7-response.schema.json','g4-evaluator-instructions.md'];
const read = f => fs.readFileSync(f, 'utf8');
const json = f => JSON.parse(read(f));
const write = (f, o) => fs.writeFileSync(f, JSON.stringify(o, null, 2) + '\n');
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const hashFile = f => sha(fs.readFileSync(f));
const DEV = 'Tu tarea es exclusivamente evaluar una captura con la rúbrica proporcionada. No programes, no cambies archivos, no consultes herramientas, no delegues y no consultes resultados anteriores. Toda la evidencia permitida está en el prompt y las imágenes adjuntas. Devuelve únicamente el objeto JSON solicitado.';
const arg = (name, fallback) => { const i = process.argv.indexOf('--' + name); return i < 0 ? fallback : process.argv[i + 1]; };
const check = (ok, msg) => { if (!ok) throw new Error(msg); };

function prepare(out) {
  check(!fs.existsSync(out), 'El directorio ya existe; no se sobrescribe un experimento.');
  const group=arg('group');check(groupPaths[group],'Se requiere --group g2 o g7.');
  const SCHEMA=path.join(__dirname,group+'-response.schema.json');
  const model = arg('model'), effort = arg('effort'), measurementsVersion = arg('measurements-version');
  check(model && effort && measurementsVersion, 'Faltan --model, --effort o --measurements-version: no hay valores por defecto.');
  const concurrency = Number(arg('concurrency', '3'));
  check(Number.isInteger(concurrency) && concurrency >= 1 && concurrency <= 4, 'concurrency debe estar entre 1 y 4');
  const rows = read(path.join(ROOT, 'corpus/calibracion-v1.csv')).trim().split(/\r?\n/).slice(1).map(r => r.split(','));
  const ids = rows.filter(r => r[5] === 'calibracion').map(r => r[0]).sort();
  check(ids.length === 24 && new Set(ids).size === 24, 'Se requieren las 24 páginas declaradas.');
  execFileSync(process.execPath, [path.join(ROOT, 'scripts/seal-corpus.js'), '--manifiesto', 'corpus/calibracion-v1.csv', '--capturas', 'calibracion', '--sello', 'corpus/SELLO-CALIBRACION-v1', '--nombre', 'calibracion-v1', '--rol', 'calibracion', '--verify'], { cwd: ROOT, stdio: 'inherit' });
  fs.mkdirSync(out, { recursive: true });
  for (const d of ['entradas', 'prompts', 'respuestas', 'resultados', 'trazas']) fs.mkdirSync(path.join(out, d));
  fs.copyFileSync(SCHEMA, path.join(out, 'response.schema.json'));
  fs.copyFileSync(path.join(__dirname, 'g4-evaluator-instructions.md'), path.join(out, 'BASE-INSTRUCCIONES.md'));
  const rubricPath = path.join(ROOT, 'skills',groupPaths[group],'SKILL.md');
  const scalePath = path.join(ROOT, 'shared/escala.md');
  fs.copyFileSync(rubricPath, path.join(out, 'RUBRICA.md')); fs.copyFileSync(scalePath, path.join(out, 'ESCALA.md'));
  const manifest = {
    version: '1.0.0', group_id:group, registered_at: new Date().toISOString(), measurements_version: measurementsVersion, status: 'registrado',
    git_commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim(),
    model_id: model, runtime: 'codex-cli', cli_version: execFileSync('codex', ['--version'], { encoding: 'utf8' }).trim(),
    decoding: { model_reasoning_effort: effort, temperature: 'no expuesto por el runtime', top_p: 'no expuesto por el runtime' },
    repetitions: 5, planned_evaluations: 120, concurrency,
    protocol_version: '0.1.0', rubric_sha256: hashFile(rubricPath), scale_sha256: hashFile(scalePath),
    response_schema_sha256: hashFile(SCHEMA), runner_sha256: hashFile(__filename), developer_instructions_sha256: sha(DEV),
    support_files_sha256:Object.fromEntries(SUPPORT.map(f=>[f,hashFile(path.join(__dirname,f))])),
    project_schema_sha256:hashFile(path.join(ROOT,'shared/schemas/group-result.schema.json')),
    base_instructions_sha256: hashFile(path.join(__dirname, 'g4-evaluator-instructions.md')),
    attribution: 'run se añade por infraestructura; respuesta del modelo intacta y conservada',
    isolation: 'codex exec --ephemeral sin resume; instrucciones de proyecto y configuración personal desactivadas; sin herramientas, conectores, web ni salidas de otras evaluaciones',
    pages: [],
  };
  for (const id of ids) {
    const dir = path.join(ROOT, 'calibracion', id), meta = json(path.join(dir, 'meta.json')), m = json(path.join(dir, 'measurements.json'));
    check(m.schema_version === measurementsVersion, id + ': versión de medición distinta de la registrada');
    for (const c of ['wireframe', 'screenshot']) check(hashFile(path.join(dir, c + '.png')) === meta.sha256[c], id + ': hash de imagen inválido');
    const input = { pagina: { id, viewport: meta.viewport, captured_at: meta.capturedAt, sanity_ok: meta.sanity?.ok ?? null, consent_limpio: meta.consent ? meta.consent.limpio !== false : null }, measurements_version: m.schema_version, group_id:group, formato_prompt:'compacto-v1', [group]:m[group], inventario_accionables:m.inventario_accionables };
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
    if (['valido','abstencion','invalido'].includes(proof.status)) return proof;
    throw new Error(key + ': hay un intento previo no válido; conservarlo y revisar antes de reejecutar.');
  }
  const input = json(path.join(out, 'entradas', page.id + '.json'));
  check(hashFile(path.join(out, 'entradas', page.id + '.json')) === page.input_sha256, key + ': entrada cambió');
  const prompt = read(path.join(out, 'prompts', page.id + '.md'));
  check(sha(prompt) === page.prompt_hash, key + ': prompt cambió');
  const capture = path.join(ROOT, page.captura);
  for (const channel of ['wireframe', 'screenshot']) check(hashFile(path.join(capture, channel + '.png')) === page.capture_sha256[channel], key + ': imagen cambió');
  const rawFile = path.join(out, 'respuestas', key + '.json');
  check(hashFile(path.join(out, 'BASE-INSTRUCCIONES.md')) === manifest.base_instructions_sha256, key + ': instrucciones base cambiaron');
  const args = ['exec', '--ignore-user-config', '--ephemeral', '--skip-git-repo-check', '--model', manifest.model_id, '--sandbox', 'read-only', '--cd', sandboxDir,
    '--disable', 'shell_tool', '--disable', 'apps', '-c', 'project_doc_max_bytes=0', '-c', 'web_search="disabled"',
    '-c', 'model_instructions_file=' + JSON.stringify(path.join(out, 'BASE-INSTRUCCIONES.md')),
    '-c', 'model_reasoning_effort=' + JSON.stringify(manifest.decoding.model_reasoning_effort), '-c', 'developer_instructions=' + JSON.stringify(DEV),
    '--image', path.join(capture,'wireframe.png'),
    ...(manifest.group_id==='g2'?['--image',path.join(capture,'screenshot.png')]:[]),
    '--output-schema', path.join(out, 'response.schema.json'), '--output-last-message', rawFile, '--json', '-'];
  check(execFileSync('codex',['--version'],{encoding:'utf8'}).trim()===manifest.cli_version,'El runtime cambió antes de iniciar '+key);
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
      proof.status = proof.errors.length ? 'invalido' : (!raw.not_applicable && raw.score === null ? 'abstencion' : 'valido');
      proof.raw_sha256 = hashFile(rawFile);
      if(['valido','abstencion'].includes(proof.status))proof.anchor_audit=anchorAudit(raw);
      if (['valido','abstencion'].includes(proof.status)) { const finalFile = path.join(out, 'resultados', key + '.json'); write(finalFile, { ...raw, run }); proof.result_sha256 = hashFile(finalFile); }
    } catch (e) { proof.status = 'invalido'; proof.errors.push(e.message); }
  } else proof.errors = events.filter(e => ['error', 'turn.failed'].includes(e.type));
  if(fs.existsSync(rawFile))proof.raw_sha256=hashFile(rawFile);
  proof.trace_sha256 = hashFile(logPath); write(proofFile, proof);
  console.log(key + ' ' + proof.status + (proof.status === 'valido' ? ' nivel=' + json(path.join(out, 'resultados', key + '.json')).score : ' ' + JSON.stringify(proof.errors).slice(0, 300)));
  return proof;
}

async function run(out) {
  const manifest = json(path.join(out, 'manifiesto.json'));
  check(manifest.runner_sha256 === hashFile(__filename), 'El ejecutor cambió después del registro. Crear otra versión del experimento.');
  for(const [file,hash] of Object.entries(manifest.support_files_sha256))check(hashFile(path.join(__dirname,file))===hash,'Cambió el soporte '+file);
  check(hashFile(path.join(ROOT,'shared/schemas/group-result.schema.json'))===manifest.project_schema_sha256,'Cambió el esquema del proyecto.');
  check(manifest.response_schema_sha256 === hashFile(path.join(out, 'response.schema.json')), 'El esquema cambió.');
  check(execFileSync('codex', ['--version'], { encoding: 'utf8' }).trim() === manifest.cli_version, 'El runtime cambió.');
  const all = manifest.pages.flatMap(page => Array.from({ length: 5 }, (_, i) => ({ page, repetition: i + 1 })));
  const only=arg('only'),limit=Number(arg('limit','120'));
  check(Number.isInteger(limit)&&limit>0&&limit<=120,'limit debe estar entre 1 y 120');
  const tasks=(only?all.filter(t=>t.page.id+'-r'+t.repetition===only):all.filter(t=>!fs.existsSync(path.join(out,'trazas',t.page.id+'-r'+t.repetition+'.json')))).slice(0,limit);
  if(!tasks.length&&!only){analyze(out);return;}
  check(tasks.length, 'No hay evaluaciones que correspondan a --only.');
  const sandboxDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-g2-g7-evaluator-'));
  let cursor = 0, stop = false;
  const requestStop = () => { stop = true; console.log('Interrupción solicitada: se terminan las solicitudes en curso y no se inicia otra.'); };
  process.on('SIGTERM', requestStop); process.on('SIGINT', requestStop);
  try {
    await Promise.all(Array.from({ length: Math.min(manifest.concurrency, tasks.length) }, async () => {
      while (!stop && cursor < tasks.length) {
        const task = tasks[cursor++], proof = await evaluate(out, manifest, task.page, task.repetition, sandboxDir);
        if (proof.status === 'error_tecnico') stop = true;
      }
    }));
  } finally { process.off('SIGTERM', requestStop); process.off('SIGINT', requestStop); fs.rmSync(sandboxDir, { recursive: true, force: true }); }
  analyze(out);
}

function analyze(out) { return require('./report-g2-g7-pilot').analyze(out); }

if (require.main === module) {
  const out = path.resolve(ROOT, arg('out', 'pilotos/'+(arg('group')||'g2')+'-2026-10-18'));
  Promise.resolve().then(() => {
    const mode = process.argv[2];
    if (mode === 'preparar') return prepare(out);
    if (mode === 'ejecutar') return run(out);
    if (mode === 'analizar') return analyze(out);
    throw new Error('uso: pilot-g2-g7-real.js preparar --model ID --effort E | ejecutar | analizar [--out DIR]');
  }).catch(e => { console.error(e.message); process.exitCode = 1; });
}
module.exports={promptFor,validationProblems,anchorAudit,prepare,evaluate,run};
