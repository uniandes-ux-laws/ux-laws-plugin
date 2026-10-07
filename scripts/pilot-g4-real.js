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
const SCHEMA = path.join(__dirname, 'g4-response.schema.json');
const read = f => fs.readFileSync(f, 'utf8');
const json = f => JSON.parse(read(f));
const write = (f, o) => fs.writeFileSync(f, JSON.stringify(o, null, 2) + '\n');
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const hashFile = f => sha(fs.readFileSync(f));
const ajv = new Ajv({ strict: false, allErrors: true }); addFormats(ajv);
const validTransport = ajv.compile(json(SCHEMA));
const validProject = ajv.compile(json(path.join(ROOT, 'shared/schemas/group-result.schema.json')));
const DEV = 'Tu tarea es exclusivamente evaluar una captura con la rúbrica proporcionada. No programes, no cambies archivos, no consultes herramientas, no delegues y no consultes resultados anteriores. Toda la evidencia permitida está en el prompt y el screenshot adjunto. Devuelve únicamente el objeto JSON solicitado.';
const arg = (name, fallback) => { const i = process.argv.indexOf('--' + name); return i < 0 ? fallback : process.argv[i + 1]; };
const check = (ok, msg) => { if (!ok) throw new Error(msg); };

function promptFor(input, rubric, scale) {
  return [
    'Evalúa únicamente G4 — Saliencia visual — sobre el screenshot adjunto. No se suministra wireframe.',
    'Usa exclusivamente los candidatos, ids, cajas y rasgos suministrados. Compartir padre y etiqueta no certifica equivalencia visual. No añadas conjuntos ni candidatos omitidos: declara el límite.',
    'Emite un juicio por cada conjunto recibido (equivalentes y aislados_ids). Selecciona main_set_id solo entre los equivalentes. I_principal es la longitud de aislados_ids del principal; I_total cuenta ids únicos de los conjuntos equivalentes. sets copia g4_conjuntos_pares_total.',
    'Bn_ids y Cn_ids seleccionan candidatos recibidos, sin duplicación por ancestro/descendiente. Sus conteos deben coincidir con esos ids. Una cabecera convencional no es publicidad por su forma; un contenedor grande con fondo claro no prueba contenido sustantivo camuflado.',
    'Si sanity_ok o consent_limpio es false, marca evidence_insufficient y explica la captura limitada. Si el principal tiene padre_raiz_virtual o parcial, marca evidence_insufficient. No trates el proxy RGB como contraste WCAG.',
    'P es null salvo que I_principal=1. En ese caso lee qué promueve la sección y registra P en lectura_screenshot, incluso si es falso o no se puede determinar. jerarquia_entre_dos es null salvo I_principal=2.',
    'canales_aislamiento solo describe el único aislado principal; usa color, peso, tamaño o borde y channels_of_isolation es su longitud. Relleno y color del mismo color no son dos canales. Si no hay un único aislado, usa lista vacía y cero.',
    'Aplica primero nivel 0, luego 1, luego 2, luego 3/4. No inventes anclas. Si ninguna cubre los juicios, devuelve score=null, trigger=null, not_applicable=false, evidence_insufficient=true, ancla_definida=false y motivo_abstencion concreto. Esa respuesta es una abstención, no NA ni nivel 0.',
    'NA requiere cero candidatos medidos: score y trigger null, ancla_definida=false y na_reason explícito. Con candidatos pero sin equivalencia certificada, abstente. Con puntaje, ancla_definida=true y motivo_abstencion=null.',
    'Devuelve solo JSON conforme al esquema. La infraestructura añadirá run sin alterar tu respuesta. No infieras repetición ni modelo. Usa los ids y cajas para hallazgos; si falta una caja pertinente usa el viewport conocido. Cuando score<=2 incluye recomendaciones concretas.',
    '\n# Escala\n'+scale, '\n# Rúbrica completa\n'+rubric,
    '\n# Datos medidos\n'+JSON.stringify(input,null,input.formato_prompt === 'compacto-v2' ? 0 : 2)
  ].join('\n\n');
}
function expectedScore(m) {
  const I=m.I_principal;
  if(m.main_set_id===null||I===null)return null;
  if(m.Bn>=1&&(I===0||I>=3))return 0;
  if(m.Bn>=1||I>=3)return 1;
  if((I===2&&m.jerarquia_entre_dos===false)||(I===1&&m.P===false))return 2;
  if(I===1&&m.P===true&&m.Cn===0)return m.channels_of_isolation>=2?4:3;
  return null;
}
function validationProblems(raw,input,run,nodeIds) {
  if(!validTransport(raw))return ['transporte: '+ajv.errorsText(validTransport.errors)];
  const problems=[],m=raw.measurements,g=input.g4;
  if(!validProject({...raw,run}))problems.push('esquema del proyecto: '+ajv.errorsText(validProject.errors));
  for(const k of ['sets','g4_conjuntos_pares_total'])if(m[k]!==g.g4_conjuntos_pares_total)problems.push(k+' cambió respecto a la fuente');
  const sets=new Map(g.g4_conjuntos_pares.map(s=>[s.conjunto,s]));
  const judged=new Map(m.juicios_conjuntos.map(j=>[j.conjunto,j]));
  if(judged.size!==m.juicios_conjuntos.length||judged.size!==sets.size||[...judged.keys()].some(k=>!sets.has(k)))problems.push('juicios de conjuntos incompletos, duplicados o inventados');
  const isolated=new Set();
  for(const j of m.juicios_conjuntos){const s=sets.get(j.conjunto),ids=new Set(s?.miembros.map(v=>v.id)||[]);
    if(new Set(j.aislados_ids).size!==j.aislados_ids.length||j.aislados_ids.some(id=>!ids.has(id))||(!j.equivalentes&&j.aislados_ids.length))problems.push('aislados incompatibles con su conjunto');
    if(j.equivalentes)for(const id of j.aislados_ids)isolated.add(id);
  }
  if(m.I_total!==isolated.size)problems.push('I_total incompatible con ids únicos');
  const selected=sets.get(m.main_set_id),judgment=judged.get(m.main_set_id);
  if(m.main_set_id!==null&&(!selected||!judgment?.equivalentes))problems.push('conjunto principal inexistente o no equivalente');
  if(selected&&m.I_principal!==judgment?.aislados_ids.length)problems.push('I_principal incompatible con sus ids');
  if(!selected&&m.I_principal!==null)problems.push('I_principal sin conjunto principal');
  if(selected&&(selected.padre_raiz_virtual||selected.parcial)&&!raw.evidence_insufficient)problems.push('límite estructural sin declarar');
  if(m.I_principal!==1&&(m.P!==null||m.canales_aislamiento.length||m.channels_of_isolation!==0))problems.push('P o canales sin único aislado');
  if(m.I_principal===1&&!m.lectura_screenshot.includes('P'))problems.push('lectura de P sin declarar');
  if(m.I_principal!==2&&m.jerarquia_entre_dos!==null)problems.push('jerarquía entre dos sin dos aislados');
  if(new Set(m.canales_aislamiento).size!==m.canales_aislamiento.length||m.channels_of_isolation!==m.canales_aislamiento.length)problems.push('canales duplicados o conteo incompatible');
  const parents=new Map((input.geometria_nodos||[]).map(n=>Array.isArray(n) ? n : [n.id,n.parentId]));
  for(const [key,source,count] of [['Bn_ids','g4_banner_candidatos','Bn'],['Cn_ids','g4_cromo_candidatos','Cn']]){
    const allowed=new Set(g[source].map(n=>n.id)),ids=m[key];
    if(new Set(ids).size!==ids.length||ids.some(id=>!allowed.has(id))||m[count]!==ids.length)problems.push(count+' incompatible con candidatos');
    for(const id of ids){let p=parents.get(id),seen=new Set();while(p!=null&&!seen.has(p)){if(ids.includes(p)){problems.push(count+' duplica ancestro y descendiente');break;}seen.add(p);p=parents.get(p);}}
  }
  if(raw.not_applicable!==(g.g4_conjuntos_pares_total===0))problems.push('no aplicabilidad incompatible con candidatos');
  if(raw.not_applicable){if(raw.score!==null||raw.trigger!==null||!raw.na_reason||m.ancla_definida)problems.push('NA sin razón o con puntaje');}
  else{
    const expected=expectedScore(m);
    if(expected===null){if(raw.score!==null||raw.trigger!==null||m.ancla_definida||!raw.evidence_insufficient||!m.motivo_abstencion)problems.push('combinación sin ancla debe conservarse como abstención');}
    else if(raw.score!==expected||!m.ancla_definida||m.motivo_abstencion!==null||raw.trigger===null)problems.push('puntaje incompatible con anclas declaradas');
    if(raw.na_reason!==null)problems.push('razón NA en resultado aplicable');
  }
  if(raw.score!==null){
    const allowedTriggers = raw.score===0 ? ['Bn','I'] : raw.score===1 ? [m.Bn>=1?'Bn':null,m.I_principal>=3?'I':null] : raw.score===2 ? [m.I_principal===1?'P':'I'] : ['I','P','ninguna'];
    if(!allowedTriggers.includes(raw.trigger))problems.push('trigger incompatible con la condición que fija el nivel');
    if(m.I_principal===1&&m.channels_of_isolation===0)problems.push('único aislado sin canal visual declarado');
  }
  if((input.pagina?.sanity_ok===false||input.pagina?.consent_limpio===false)&&!raw.evidence_insufficient)problems.push('captura limitada sin declarar');
  if(raw.score!==null&&raw.score<=2&&!raw.recommendations.length)problems.push('puntaje bajo sin recomendaciones');
  if(nodeIds&&raw.findings.some(f=>f.node_ids.some(id=>!nodeIds.has(id))))problems.push('hallazgo con id ausente');
  return problems;
}

function prepare(out) {
  check(!fs.existsSync(out), 'El directorio ya existe; no se sobrescribe un experimento.');
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
  const rubricPath = path.join(ROOT, 'skills/g4-saliencia-visual/SKILL.md');
  const scalePath = path.join(ROOT, 'shared/escala.md');
  fs.copyFileSync(rubricPath, path.join(out, 'RUBRICA.md')); fs.copyFileSync(scalePath, path.join(out, 'ESCALA.md'));
  const manifest = {
    version: '1.0.0', registered_at: new Date().toISOString(), measurements_version: measurementsVersion, status: 'registrado',
    git_commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim(),
    model_id: model, runtime: 'codex-cli', cli_version: execFileSync('codex', ['--version'], { encoding: 'utf8' }).trim(),
    decoding: { model_reasoning_effort: effort, temperature: 'no expuesto por el runtime', top_p: 'no expuesto por el runtime' },
    repetitions: 5, planned_evaluations: 120, concurrency,
    protocol_version: '0.1.0', rubric_sha256: hashFile(rubricPath), scale_sha256: hashFile(scalePath),
    response_schema_sha256: hashFile(SCHEMA), runner_sha256: hashFile(__filename), developer_instructions_sha256: sha(DEV),
    base_instructions_sha256: hashFile(path.join(__dirname, 'g4-evaluator-instructions.md')),
    attribution: 'run se añade por infraestructura; respuesta del modelo intacta y conservada',
    isolation: 'codex exec --ephemeral sin resume; instrucciones de proyecto y configuración personal desactivadas; sin herramientas, conectores, web ni salidas de otras evaluaciones',
    pages: [],
  };
  for (const id of ids) {
    const dir = path.join(ROOT, 'calibracion', id), meta = json(path.join(dir, 'meta.json')), m = json(path.join(dir, 'measurements.json'));
    check(m.schema_version === measurementsVersion, id + ': versión de medición distinta de la registrada');
    for (const c of ['wireframe', 'screenshot']) check(hashFile(path.join(dir, c + '.png')) === meta.sha256[c], id + ': hash de imagen inválido');
    const input = { pagina: { id, viewport: meta.viewport, captured_at: meta.capturedAt, sanity_ok: meta.sanity?.ok ?? null, consent_limpio: meta.consent ? meta.consent.limpio !== false : null }, measurements_version: m.schema_version, formato_prompt: 'compacto-v2', g4: m.g4, geometria_nodos: json(path.join(dir, 'nodes.json')).map(n => [n.id, n.parentId ?? null]) };
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
    '--image', path.join(capture, 'screenshot.png'),
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
      proof.status = proof.errors.length ? 'invalido' : (!raw.not_applicable && raw.score === null ? 'abstencion' : 'valido');
      proof.raw_sha256 = hashFile(rawFile);
      if (['valido','abstencion'].includes(proof.status)) { const finalFile = path.join(out, 'resultados', key + '.json'); write(finalFile, { ...raw, run }); proof.result_sha256 = hashFile(finalFile); }
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
  const sandboxDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-g4-evaluator-'));
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

function analyze(out) { return require('./report-g4-pilot').analyze(out); }

if (require.main === module) {
  const out = path.resolve(ROOT, arg('out', 'pilotos/g4-2026-10-07-v3'));
  Promise.resolve().then(() => {
    const mode = process.argv[2];
    if (mode === 'preparar') return prepare(out);
    if (mode === 'ejecutar') return run(out);
    if (mode === 'analizar') return analyze(out);
    throw new Error('uso: pilot-g4-real.js preparar --model ID --effort E | ejecutar | analizar [--out DIR]');
  }).catch(e => { console.error(e.message); process.exitCode = 1; });
}
module.exports = { promptFor, validationProblems, expectedScore };
