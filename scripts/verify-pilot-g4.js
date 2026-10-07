#!/usr/bin/env node
'use strict';
// Verifica procedencia y preservación. No reclasifica ni corrige respuestas.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const assert = require('node:assert/strict');
const { execFileSync } = require('child_process');
const { validationProblems, promptFor } = require('./pilot-g4-real');
const ROOT = path.resolve(__dirname, '..');
const dir = path.resolve(ROOT, process.argv[2] || 'pilotos/g4-2026-10-07-v3');
const read = f => fs.readFileSync(f, 'utf8'), json = f => JSON.parse(read(f));
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const sha = f => hash(fs.readFileSync(f));
const verifySeal = process.argv.includes('--verify-seal');
if (verifySeal) {
  const lines = read(path.join(dir, 'SELLO-SHA256.tsv')).trim().split('\n');
  for (const line of lines) {
    const [expected, relative] = line.split('\t');
    assert.ok(relative && !path.isAbsolute(relative) && !relative.split('/').includes('..'));
    assert.equal(sha(path.join(dir, relative)), expected, relative + ': sello roto');
  }
  console.log('Sello verificado: ' + lines.length + ' archivos.');
}
const manifest = json(path.join(dir, 'manifiesto.json'));
const rubric = read(path.join(dir, 'RUBRICA.md')), scale = read(path.join(dir, 'ESCALA.md'));
assert.equal(hash(rubric), manifest.rubric_sha256);
if (manifest.base_instructions_sha256) assert.equal(sha(path.join(dir, 'BASE-INSTRUCCIONES.md')), manifest.base_instructions_sha256);
assert.equal(hash(scale), manifest.scale_sha256);
assert.equal(sha(path.join(dir, 'response.schema.json')), manifest.response_schema_sha256);
assert.equal(hash(execFileSync('git', ['show', manifest.git_commit + ':scripts/pilot-g4-real.js'], { cwd: ROOT })), manifest.runner_sha256);
assert.equal(manifest.pages.length, 24); assert.equal(manifest.repetitions, 5); assert.equal(manifest.planned_evaluations, 120);
const threads = new Set(), proofs = [];
let pending = 0;
for (const page of manifest.pages) {
  const inputFile = path.join(dir, 'entradas', page.id + '.json'), input = json(inputFile);
  assert.equal(sha(inputFile), page.input_sha256);
  const prompt = read(path.join(dir, 'prompts', page.id + '.md'));
  assert.equal(hash(prompt), page.prompt_hash);
  // Las fases históricas conservan su ejecutor en git; el prompt actual coincide
  // porque su plantilla no se cambió al corregir la medición.
  assert.equal(promptFor(input, rubric, scale), prompt);
  assert.equal(input.measurements_version, page.measurements_version);
  const capture = path.join(ROOT, page.captura);
  assert.equal(sha(path.join(capture, 'nodes.json')), page.nodes_sha256);
  for (const c of ['wireframe', 'screenshot']) assert.equal(sha(path.join(capture, c + '.png')), page.capture_sha256[c]);
  const ids = new Set(json(path.join(capture, 'nodes.json')).map(n => n.id));
  for (let r = 1; r <= 5; r++) {
    const key = page.id + '-r' + r, proofFile = path.join(dir, 'trazas', key + '.json');
    if (!fs.existsSync(proofFile)) { pending++; continue; }
    const proof = json(proofFile); proofs.push(proof);
    assert.equal(proof.prompt_hash, page.prompt_hash);
    assert.equal(proof.response_schema_sha256, manifest.response_schema_sha256);
    if (proof.thread_id) { assert.ok(!threads.has(proof.thread_id), key + ': sesión reutilizada'); threads.add(proof.thread_id); }
    const traceFile = path.join(dir, 'trazas', key + '.jsonl');
    assert.equal(sha(traceFile), proof.trace_sha256);
    if (proof.raw_sha256) assert.equal(sha(path.join(dir, 'respuestas', key + '.json')), proof.raw_sha256);
    if (!['valido','abstencion','invalido'].includes(proof.status)) continue;
    const originalFile = path.join(dir, 'respuestas', key + '.json');
    assert.ok(proof.raw_sha256);
    const original = json(originalFile);
    const eventsAll = read(traceFile).trim().split('\n').map(JSON.parse);
    const itemsAll = eventsAll.filter(e => e.type === 'item.completed');
    assert.ok(itemsAll.every(e => ['agent_message','reasoning'].includes(e.item.type)));
    assert.deepEqual(JSON.parse(itemsAll.filter(e => e.item.type === 'agent_message').at(-1).item.text), original);
    if (proof.status === 'invalido') {
      const attribution = { model_id: manifest.model_id, runtime: manifest.runtime, repetition: r, prompt_hash: page.prompt_hash, captured_at: page.captured_at, decoding: manifest.decoding, capture_sha256: page.capture_sha256, measurements_version: page.measurements_version, protocol_version: manifest.protocol_version };
      assert.deepEqual(validationProblems(original, input, attribution, ids), proof.errors);
      assert.ok(proof.errors.length); continue;
    }
    assert.equal(proof.status === 'abstencion', !original.not_applicable && original.score === null);
    assert.equal(proof.exit.code, 0); assert.ok(proof.usage); assert.ok(proof.thread_id);
    const resultFile = path.join(dir, 'resultados', key + '.json'), rawFile = path.join(dir, 'respuestas', key + '.json');
    assert.equal(sha(resultFile), proof.result_sha256); assert.equal(sha(rawFile), proof.raw_sha256);
    const raw = json(rawFile), { run, ...unchanged } = json(resultFile);
    assert.deepEqual(unchanged, raw, key + ': juicio alterado');
    assert.deepEqual(run, { model_id: manifest.model_id, runtime: manifest.runtime, repetition: r, prompt_hash: page.prompt_hash,
      captured_at: page.captured_at, decoding: manifest.decoding, capture_sha256: page.capture_sha256,
      measurements_version: page.measurements_version, protocol_version: manifest.protocol_version });
    assert.deepEqual(validationProblems(raw, input, run, ids), []);
    const events = read(traceFile).trim().split('\n').map(JSON.parse);
    assert.equal(events.find(e => e.type === 'thread.started').thread_id, proof.thread_id);
    assert.deepEqual(events.find(e => e.type === 'turn.completed').usage, proof.usage);
    const items = events.filter(e => e.type === 'item.completed');
    assert.ok(items.every(e => ['agent_message', 'reasoning'].includes(e.item.type)), key + ': herramienta no permitida');
    assert.deepEqual(JSON.parse(items.filter(e => e.item.type === 'agent_message').at(-1).item.text), raw);
  }
}
const completedSessions = threads.size;
let archivedTechnical = 0;
for (const name of fs.readdirSync(dir).filter(n => /^REANUDACION-\d+\.json$/.test(n))) {
  const record = json(path.join(dir, name));
  assert.equal(record.configuracion_y_entradas_sin_cambios, true);
  for (const attempt of record.intentos_preservados) {
    assert.equal(attempt.sin_juicio_emitido, true);
    assert.match(attempt.id, /^[A-Za-z0-9]+-r[1-5]$/);
    assert.ok(!path.isAbsolute(attempt.archivo) && !attempt.archivo.split('/').includes('..'));
    const archive = path.join(dir, attempt.archivo);
    for (const file of attempt.hashes) {
      assert.equal(path.basename(file.file), file.file);
      // stderr es auxiliar e ignorado por Git; prueba y traza son primarias.
      if (file.file.endsWith('.log') && !fs.existsSync(path.join(archive, file.file))) continue;
      assert.equal(sha(path.join(archive, file.file)), file.sha256);
    }
    const proof = json(path.join(archive, attempt.id + '.json'));
    assert.equal(proof.status, 'error_tecnico'); assert.equal(proof.thread_id, attempt.thread_id); assert.equal(proof.usage, null); assert.notEqual(proof.exit.code, 0);
    const page = manifest.pages.find(p => attempt.id.startsWith(p.id + '-r'));
    assert.ok(page); assert.equal(proof.prompt_hash, page.prompt_hash);
    assert.equal(proof.response_schema_sha256, manifest.response_schema_sha256);
    const traceFile = path.join(archive, attempt.id + '.jsonl');
    assert.equal(sha(traceFile), proof.trace_sha256);
    const events = read(traceFile).trim().split('\n').map(JSON.parse);
    assert.ok(!events.some(e => e.type === 'turn.completed' || (e.type === 'item.completed' && e.item?.type === 'agent_message')));
    assert.equal(events.find(e => e.type === 'thread.started').thread_id, proof.thread_id);
    assert.ok(!threads.has(proof.thread_id)); threads.add(proof.thread_id); archivedTechnical++;
  }
}
const verification = { verified_at: new Date().toISOString(), phase: path.basename(dir), planned: 120,
  finished: proofs.length, valid: proofs.filter(p => p.status === 'valido').length,
  abstentions: proofs.filter(p => p.status === 'abstencion').length, invalid: proofs.filter(p => p.status === 'invalido').length, technical: proofs.filter(p => p.status === 'error_tecnico').length,
  pending, unique_sessions: threads.size, unique_completed_sessions: completedSessions, archived_technical_attempts: archivedTechnical, total_attempts: proofs.length + archivedTechnical, hashes_and_attribution_verified: true, model_judgments_unmodified: true,
  expert_validity_verified: false };
if (!verifySeal) fs.writeFileSync(path.join(dir, 'VERIFICACION.json'), JSON.stringify(verification, null, 2) + '\n');
console.log(JSON.stringify(verification));
if (!process.argv.includes('--partial')) assert.equal(pending, 0, 'El piloto aún tiene solicitudes pendientes');
if (process.argv.includes('--seal')) {
  assert.equal(pending, 0, 'No se sella una fase incompleta');
  const files = [];
  // Los resúmenes se regeneran; el sello protege entradas y salidas primarias.
  const derived = new Set(['resumen.json', 'resumen.csv', 'auditoria.json', 'INFORME.md', 'evaluaciones.csv', 'VERIFICACION.json']);
  function walk(d) { for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, entry.name);
    if (entry.isDirectory()) walk(f);
    else if (!entry.name.endsWith('.log') && entry.name !== 'SELLO-SHA256.tsv' && entry.name !== '.DS_Store' && !derived.has(entry.name)) files.push(f);
  } }
  walk(dir); files.sort();
  fs.writeFileSync(path.join(dir, 'SELLO-SHA256.tsv'), files.map(f => sha(f) + '\t' + path.relative(dir, f)).join('\n') + '\n');
  console.log('Sellados ' + files.length + ' archivos de la fase.');
}
