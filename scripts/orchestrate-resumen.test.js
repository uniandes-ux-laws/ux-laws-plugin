'use strict';
// recoger escribe resumen.md junto al perfil (docs/PLAN-RESUMEN-CLARO.md). Las corridas de
// estas pruebas se arman en carpetas temporales con datos artificiales; no son evaluaciones.
const { test } = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('node:child_process');
const { resumenClaro, medidasDesdeCarpeta, cargarDiccionario, SIN_TOTAL_CORTO } = require('./resumen-claro');
const { perfilLegible } = require('./perfil-legible');

const ROOT = path.resolve(__dirname, '..');
const dic = cargarDiccionario();
const leer = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const PROHIBIDO = /promedi|\bsuma\b|\btotal|\bglobal|semáforo|%|por ciento|sobre 28|\/ ?28/i;
const sinAutorizados = (t) => t.split(dic.textos.sin_total.texto).join('').split(SIN_TOTAL_CORTO).join('').replace(/El evaluador lo explicó así: «[^»]*»/g, '');

// -------------------------------------------------------------- recoger, de punta a punta
const cli = (args) => spawnSync(process.execPath, ['scripts/orchestrate.js', ...args], { cwd: ROOT, encoding: 'utf8' });
/** Corrida temporal sobre C13 con datos artificiales y respuestas de los pilotos. No es una evaluación nueva. */
function corridaDePrueba(t, repeticiones) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-resumen-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const captura = path.join(dir, 'C13'), out = path.join(dir, 'corrida');
  fs.mkdirSync(captura);
  for (const f of ['meta.json', 'nodes.json', 'screenshot.png', 'wireframe.png']) fs.copyFileSync(path.join(ROOT, 'calibracion/C13', f), path.join(captura, f));
  const r = cli(['preparar', '--captura', captura, '--out', out, '--repeticiones', String(repeticiones), '--runtime', 'prueba-local', '--model-id', 'modelo-prueba-1', '--decoding', 'no-expuesto-por-el-runtime']);
  assert.equal(r.status, 0, r.stderr + r.stdout);
  const archivo = path.join(out, 'invocaciones.json'), libro = leer(archivo);
  const carpetas = { g2: 'g2-2026-10-18', g3: 'g3-2026-10-20', g4: 'g4-cierre-2026-10-20', g6: 'g6-2026-10-20', g7: 'g7-2026-10-18' };
  for (const inv of libro.invocaciones) {
    const entrada = leer(path.resolve(ROOT, inv.entrada));
    let raw;
    if (inv.group_id === 'g1') raw = { group_id: 'g1', group_name: 'Agrupación perceptual', laws_subsumed: ['Proximidad'], not_applicable: true, score: null, trigger: null, na_reason: 'Menos de dos grupos',
      measurements: { g1_grupos_primer_nivel: entrada.g1.g1_grupos_primer_nivel, lectura_screenshot: [] }, findings: [], recommendations: [], evidence_insufficient: false };
    else if (inv.group_id === 'g5') { const g = entrada.g5; raw = { group_id: 'g5', group_name: 'Posición y progreso', laws_subsumed: ['Posición serial'], not_applicable: false, na_reason: null, score: 0, trigger: 'G_existe', evidence_insufficient: true,
      findings: [], recommendations: ['Dato artificial para comprobar la salida.'],
      measurements: { g5_listas_total: g.g5_listas_total, g5_lista_principal_sugerida: g.g5_lista_principal_sugerida, g5_lista_principal_sugerida_id: g.g5_lista_principal_sugerida_id, main_list_id: null, main_list_parent_id: null,
        J_inicio: null, J_final: null, final_compite_con_inicio: null, Q: true, G_existe: false, G_nombra: false, G_actual: false, G_forma: false, steps_declared: null, lectura_screenshot: ['Q', 'G_nombra', 'G_actual', 'G_forma'] } }; }
    else raw = leer(path.join(ROOT, 'pilotos', carpetas[inv.group_id], 'resultados/C13-r1.json'));
    fs.writeFileSync(path.resolve(ROOT, inv.resultado_esperado), JSON.stringify({ ...raw, channel: inv.channel, run: leer(path.resolve(ROOT, inv.solicitud)).run }, null, 2));
    inv.contexto_limpio = true; inv.mecanismo_de_aislamiento = 'Datos artificiales, sin llamadas al modelo';
  }
  fs.writeFileSync(archivo, JSON.stringify(libro, null, 2));
  return out;
}

test('recoger escribe resumen.md sin cambiar perfil.json ni perfil.md, y es idéntico entre dos cierres', (t) => {
  const out = corridaDePrueba(t, 5);
  const cerrar = () => {
    const r = cli(['recoger', '--corrida', out]); assert.equal(r.status, 0, r.stderr + r.stdout);
    const { cerrada_en, ...perfil } = leer(path.join(out, 'perfil.json'));
    return { salida: r.stdout, perfil, md: fs.readFileSync(path.join(out, 'perfil.md'), 'utf8'), resumen: fs.readFileSync(path.join(out, 'resumen.md'), 'utf8') };
  };
  const a = cerrar(); fs.rmSync(path.join(out, 'resumen.md')); const b = cerrar();
  assert.equal(a.resumen, b.resumen, 'resumen.md idéntico entre dos cierres');
  assert.equal(a.md, b.md); assert.deepEqual(a.perfil, b.perfil);
  // perfil.md es exactamente lo que da su generador, que este cambio no toca.
  assert.equal(a.md, perfilLegible({ ...a.perfil }, out, ROOT));
  assert.ok(a.salida.includes('resumen.md'));
  assert.equal(a.resumen, resumenClaro(leer(path.join(out, 'perfil.json')), { medidas: medidasDesdeCarpeta(out) }), 'recoger y la línea de comandos dan el mismo resumen');
  assert.ok(a.resumen.includes('**Por qué no aplica (5 de 5 repeticiones).**') && a.resumen.includes('«Menos de dos grupos»'));
  assert.ok(a.resumen.includes('hay indicador de avance: no'), 'cita las cifras desde la memoria del cierre');
  assert.equal(PROHIBIDO.exec(sinAutorizados(a.resumen)), null);
  assert.deepEqual(fs.readdirSync(out).filter((f) => /^(perfil|resumen)/.test(f)).sort(), ['perfil.json', 'perfil.md', 'resumen.md']);
});

test('si el resumen no se puede generar, recoger avisa y el perfil queda escrito', (t) => {
  const out = corridaDePrueba(t, 1);
  // Se simula un diccionario dañado sin tocar el del repositorio: un módulo cargado antes
  // hace que la lectura de ese archivo devuelva JSON inválido.
  const previo = path.join(path.dirname(out), 'diccionario-roto.js');
  fs.writeFileSync(previo, "const fs=require('fs');const real=fs.readFileSync;fs.readFileSync=function(f,...a){return String(f).endsWith('lenguaje-claro.json')?'{roto':real.call(this,f,...a)};");
  const r = spawnSync(process.execPath, ['-r', previo, 'scripts/orchestrate.js', 'recoger', '--corrida', out], { cwd: ROOT, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr + r.stdout);
  assert.match(r.stderr, /AVISO: no se pudo generar resumen\.md/);
  assert.ok(fs.existsSync(path.join(out, 'perfil.json')) && fs.existsSync(path.join(out, 'perfil.md')) && !fs.existsSync(path.join(out, 'resumen.md')));
});
