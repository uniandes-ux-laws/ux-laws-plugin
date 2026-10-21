#!/usr/bin/env node
'use strict';
// Revisión posterior del piloto técnico de septiembre. No invoca modelos ni cambia puntajes.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { medirCaptura, VERSION } = require('../measure/measure-page');

const ROOT = path.resolve(__dirname, '..');
const BASE = '2313903177b5430171d7b944286ccce5efd6432b';
const DIR = 'revisiones/g1-cierre-2026-10-21';
const CRITERIA = ['C1', 'C2', 'C3', 'C4'];
const FILES = ['resultados.json', 'paginas.csv', 'INFORME.md', 'VERIFICACION.json', 'FUENTES-SHA256.tsv'];
const json = value => JSON.stringify(value, null, 2) + '\n';
const read = name => JSON.parse(fs.readFileSync(path.join(ROOT, name), 'utf8'));
const sha = name => crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, name))).digest('hex');
const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
const category = p => p === null ? 'no_calculable' : p === 0 ? 'impecable' : p <= .10 ? 'aislado' : p <= .25 ? 'frecuente' : 'generalizado';

function auditHistorical(historical, current) {
  const old = historical.measurements;
  const numerators = [old.fallanC1, old.desbordan, old.fueraDeEje, old.divergentes];
  const denominators = [old.conRazon, old.candidatosC2, old.grupos, old.conjuntos];
  assert.equal(current.g1_grupos_primer_nivel, old.grupos);
  const comparison = CRITERIA.map((criterion, i) => {
    const now = current['g1_p_' + criterion];
    assert.equal(now.afectados, numerators[i], criterion + ': afectados distintos');
    assert.equal(now.denominador, denominators[i], criterion + ': denominador distinto');
    assert.equal(category(old.p[criterion]), category(now.p), criterion + ': categoría distinta');
    assert.equal(old.p[criterion], denominators[i] ? +(numerators[i] / denominators[i]).toFixed(3) : null);
    return { criterio: criterion, afectados: numerators[i], denominador: denominators[i],
      p_historica: old.p[criterion], p_medicion_1_0_6: now.p,
      categoria: category(now.p), diferencia_de_precision: old.p[criterion] !== now.p };
  });
  assert.equal(current.g1_p_conflicto.afectados, old.conflictos);
  assert.equal(current.g1_p_conflicto.denominador, old.elementosEnGrupos);
  return {
    criterios: comparison,
    menos_de_dos_grupos: old.grupos < 2,
    contradice_regla_no_aplica: old.grupos < 2 && historical.not_applicable !== true,
    C1_sin_base: old.p.C1 === null,
    estado: 'no_interpretable_v1',
    // Esta auditoría no transforma el 0 original de C13 en un NA nuevo.
    resultado_original_conservado: true,
  };
}

function summary(rows) {
  const histogram = [0, 0, 0, 0, 0];
  const withoutOneGroup = [0, 0, 0, 0, 0];
  const triggers = {};
  for (const row of rows) {
    histogram[row.historico.score]++;
    triggers[row.historico.trigger] = (triggers[row.historico.trigger] || 0) + 1;
    if (!row.auditoria_posterior.menos_de_dos_grupos) withoutOneGroup[row.historico.score]++;
  }
  return {
    paginas: rows.length, niveles_historicos: histogram, no_aplica_historicos: 0,
    niveles_usados: histogram.filter(n => n > 0).length,
    triggers_historicos: triggers,
    C1_sin_base: rows.filter(r => r.auditoria_posterior.C1_sin_base).map(r => r.id),
    discrepancias_no_aplica: rows.filter(r => r.auditoria_posterior.contradice_regla_no_aplica).map(r => r.id),
    criterios: Object.fromEntries(CRITERIA.map(c => [c, {
      no_calculable: rows.filter(r => r.historico.measurements.p[c] === null).length,
      generalizado: rows.filter(r => r.historico.measurements.p[c] !== null && r.historico.measurements.p[c] > .25).length,
      supera_mitad: rows.filter(r => r.historico.measurements.p[c] !== null && r.historico.measurements.p[c] > .50).length,
    }])),
    comparacion_medidas: {
      paginas_con_mismos_conteos_y_categorias: rows.length,
      paginas_con_distinta_precision: rows.filter(r => r.auditoria_posterior.criterios.some(c => c.diferencia_de_precision)).length,
      nota: 'Las proporciones históricas tienen tres decimales y las actuales cuatro. No se calculan puntajes nuevos.',
    },
    sensibilidad_posterior_sin_paginas_con_menos_de_dos_grupos: {
      paginas: withoutOneGroup.reduce((a, b) => a + b, 0), niveles_historicos: withoutOneGroup,
      es_nuevo_piloto: false, modifica_originales: false,
    },
  };
}

function csvCell(value) {
  const text = value === null ? '' : String(value);
  return /[",\r\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
}

function csv(rows) {
  const header = ['id', 'url', 'estado', 'score_historico', 'trigger_historico', 'grupos',
    'C1_calculable', 'discrepancia_no_aplica', ...CRITERIA.flatMap(c => [c + '_afectados', c + '_denominador', c + '_p_historica', c + '_p_1_0_6'])];
  return [header, ...rows.map(r => [r.id, r.url, r.auditoria_posterior.estado, r.historico.score,
    r.historico.trigger, r.historico.measurements.grupos, !r.auditoria_posterior.C1_sin_base,
    r.auditoria_posterior.contradice_regla_no_aplica,
    ...r.auditoria_posterior.criterios.flatMap(c => [c.afectados, c.denominador, c.p_historica, c.p_medicion_1_0_6])])]
    .map(row => row.map(csvCell).join(',')).join('\n') + '\n';
}

function preserveHistory() {
  const scopes = ['calibracion', 'captures', 'corpus', 'dorados', 'pilotos'];
  const before = git('ls-tree', '-r', '--name-only', BASE, '--', ...scopes).trim().split('\n');
  const changed = new Set(git('diff', '--name-only', BASE, '--', ...scopes).trim().split('\n'));
  assert.deepEqual(before.filter(name => changed.has(name)), [], 'Se modificaron datos anteriores');
  const seals = [];
  for (const name of fs.readdirSync(path.join(ROOT, 'pilotos')).sort()) {
    const folder = 'pilotos/' + name;
    const seal = folder + '/SELLO-SHA256.tsv';
    if (!fs.existsSync(path.join(ROOT, seal))) continue;
    assert.equal(fs.readFileSync(path.join(ROOT, seal), 'utf8'), git('show', BASE + ':' + seal));
    const seen = new Set();
    for (const line of fs.readFileSync(path.join(ROOT, seal), 'utf8').trim().split('\n')) {
      const [digest, relative] = line.split('\t');
      assert.match(digest, /^[a-f0-9]{64}$/);
      assert(relative && !path.isAbsolute(relative) && !relative.split('/').includes('..') && !seen.has(relative));
      seen.add(relative);
      assert.equal(sha(folder + '/' + relative), digest, seal + ': ' + relative);
    }
    seals.push({ carpeta: folder, archivos: seen.size });
  }
  assert.equal(seals.length, 10, 'La revisión de este cierre espera diez sellos anteriores');
  assert.equal(seals.reduce((s, v) => s + v.archivos, 0), 4160);
  return { base: BASE, archivos_anteriores_sin_cambios: before.length, sellos_pilotos: seals,
    archivos_protegidos_por_sellos_pilotos: 4160 };
}

function sources(ids) {
  return [
    'calibracion/_piloto.json', 'scripts/pilot-calibracion.js',
    'measure/measure-page.js', 'measure/actionable-inventory.js', 'measure/g4-visual.js', 'measure/g5-lists.js',
    'skills/g1-agrupacion-perceptual/SKILL.md', 'shared/escala.md',
    'docs/protocolo.md', 'docs/hipotesis-m3.md', 'corpus/calibracion-v1.csv',
    'corpus/SELLO-CALIBRACION-v1.json', 'corpus/SELLO-CALIBRACION-v1.md',
    'package.json', 'package-lock.json',
    ...ids.flatMap(id => ['nodes.json', 'meta.json', 'screenshot.png', 'wireframe.png'].map(f => 'calibracion/' + id + '/' + f)),
  ].sort();
}

function manifest(names) {
  assert.equal(new Set(names).size, names.length);
  return [...names].sort().map(name => sha(name) + '\t' + name).join('\n') + '\n';
}

function checkManifest(text, expectedNames) {
  const seen = new Set();
  for (const line of text.trim().split('\n')) {
    const [digest, name] = line.split('\t');
    assert.match(digest, /^[a-f0-9]{64}$/);
    assert(name && !path.isAbsolute(name) && !name.split('/').includes('..') && !seen.has(name));
    seen.add(name);
    assert.equal(sha(name), digest, 'Hash distinto: ' + name);
  }
  if (expectedNames) assert.deepEqual([...seen].sort(), [...expectedNames].sort(), 'Lista de archivos incompleta o distinta');
  return seen;
}

function collect() {
  const originalHash = sha('calibracion/_piloto.json');
  const original = read('calibracion/_piloto.json');
  assert.equal(original.paginas, 24);
  const ids = original.paginasDetalle.map(r => r.id).sort();
  assert.equal(new Set(ids).size, 24);
  const sourceBefore = manifest(sources(ids));
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'g1-cierre-'));
  let replay;
  try {
    for (const id of ids) {
      fs.mkdirSync(path.join(temporary, id));
      for (const file of ['nodes.json', 'meta.json']) {
        fs.copyFileSync(path.join(ROOT, 'calibracion', id, file), path.join(temporary, id, file));
      }
    }
    // El script original escribe _piloto.json. Recibe SOLO esta carpeta temporal.
    execFileSync(process.execPath, [path.join(ROOT, 'scripts/pilot-calibracion.js'), temporary], {
      cwd: ROOT, encoding: 'utf8', timeout: 120000, maxBuffer: 4 * 1024 * 1024,
    });
    replay = JSON.parse(fs.readFileSync(path.join(temporary, '_piloto.json'), 'utf8'));
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
  const rerun = new Map(replay.paginasDetalle.map(r => [r.id, r]));
  assert.deepEqual([...rerun.keys()].sort(), ids);
  assert.deepEqual(replay.resumen.g1, original.resumen.g1);
  const rows = original.paginasDetalle.map(row => {
    assert.deepEqual(rerun.get(row.id).g1, row.g1, 'No se reprodujo G1 en ' + row.id);
    // API de lectura: NO ejecutar la CLI que escribiría measurements.json.
    const current = medirCaptura(path.join(ROOT, 'calibracion', row.id)).g1;
    return { id: row.id, url: row.url, historico: row.g1, medidas_1_0_6: current,
      auditoria_posterior: auditHistorical(row.g1, current) };
  });
  assert.equal(sha('calibracion/_piloto.json'), originalHash);
  assert.equal(manifest(sources(ids)), sourceBefore, 'Cambió una fuente durante la revisión');
  const data = {
    version_revision: '1.0.0', fecha_revision: '2026-10-21',
    estado: 'cierre_documental_con_limitacion_no_interpretable_v1',
    piloto_del_modelo_realizado: false, validacion_experta: false, H1_comprobada: false,
    fuente: { ruta: 'calibracion/_piloto.json', sha256: originalHash, corrida_historica: original.corridoEn,
      implementacion: 'scripts/pilot-calibracion.js', base_revision: BASE, medicion_actual: VERSION },
    resumen: summary(rows), paginas: rows,
  };
  assert.deepEqual(data.resumen.niveles_historicos, [23, 1, 0, 0, 0]);
  assert.deepEqual(data.resumen.discrepancias_no_aplica, ['C13']);
  const verification = {
    revision_posterior: true, llamadas_a_modelos: 0,
    reproduccion: { paginas: 24, objetos_g1_iguales: 24, script_historico_sin_cambios: true,
      destino_solo_temporal: true, originales_conservados: true, sha256_piloto_original: originalHash },
    medidas: data.resumen.comparacion_medidas,
    preservacion: preserveHistory(),
    alcance: 'Reproducción técnica, revisión de mediciones y cierre documental. No prueba repetibilidad del modelo ni validez experta.',
  };
  return { data, verification, sourceBefore };
}

function report(data, verification) {
  const s = data.resumen;
  return `# G1: cierre con una limitación conocida

21 de octubre de 2026. **Estado: no interpretable en la versión 1.** Cerramos la
revisión técnica y dejamos documentado que G1 no distingue suficientemente entre
estas páginas. Esto no equivale a validar sus puntajes.

## Qué se revisó

El piloto técnico del 11 de septiembre contiene 24 páginas. Se ejecutó el mismo
script sobre copias temporales de sus nodos y metadatos: los **24 resultados de G1
coincidieron completos** con los originales, incluidos sus criterios y triggers.
El archivo histórico no se sobrescribió. Es código provisional; **no es un piloto
del modelo ni una ejecución de la skill publicada**. No hubo solicitudes al modelo.

| Grupo y estado | Nivel 0 | Nivel 1 | Nivel 2 | Nivel 3 | Nivel 4 | NA histórico |
|---|---:|---:|---:|---:|---:|---:|
| G1 — no interpretable v1 | 23 | 1 | 0 | 0 | 0 | 0 |

C04 fue la única página con nivel 1. Las demás recibieron 0: 23 de 24 (95,8 %).
Esta concentración limita su uso para comparar páginas. No demuestra que las
páginas tengan la misma calidad ni que los principios Gestalt fallen en general.
El alcance es esta rúbrica, su implementación provisional y estas capturas.

## Qué encontramos en las mediciones

| Criterio | Qué cuenta esta implementación | Sin base de cálculo | Proporción > 0,25 | Proporción > 0,50 |
|---|---|---:|---:|---:|
| C1 | Grupos cuya separación queda bajo el corte | ${s.criterios.C1.no_calculable} | ${s.criterios.C1.generalizado} | ${s.criterios.C1.supera_mitad} |
| C2 | Elementos que desbordan su contenedor visible | ${s.criterios.C2.no_calculable} | ${s.criterios.C2.generalizado} | ${s.criterios.C2.supera_mitad} |
| C3 | Bloques fuera de los ejes o anchos dominantes | ${s.criterios.C3.no_calculable} | ${s.criterios.C3.generalizado} | ${s.criterios.C3.supera_mitad} |
| C4 | Conjuntos con diferencias de altura o alineación | ${s.criterios.C4.no_calculable} | ${s.criterios.C4.generalizado} | ${s.criterios.C4.supera_mitad} |

C4 queda generalizado en las 24 páginas. En 20 supera 0,50 y basta por sí solo
para activar el nivel 0. Sus proporciones sí varían; lo que se concentra es el
nivel final. Usar la misma etiqueta HTML y el mismo padre para formar conjuntos
puede juntar elementos de funciones distintas. Es una limitación de la definición
operativa que merece revisión futura, no una causa única ya demostrada.

Se recalcularon las mediciones 1.0.6 en memoria, sin escribir sobre las capturas.
Coincidieron los afectados, denominadores y categorías de C1–C4 en las 24 páginas.
En ${s.comparacion_medidas.paginas_con_distinta_precision} páginas hay diferencias de precisión: el histórico guarda tres decimales
y la capa actual cuatro. No se igualaron ni se convirtieron en puntajes nuevos.

Hay dos advertencias adicionales, registradas después del piloto:

- **C1 no se pudo calcular en ocho páginas:** ${s.C1_sin_base.join(', ')}.
  Un valor nulo no significa que la separación sea correcta. El código histórico
  omite esa condición al combinar el nivel; no hay cobertura completa en esos casos.
- **C13 tiene un solo grupo.** Conservamos su 0 original, pero tanto el piloto
  provisional como la capa 1.0.6 usan NA solo si no hay grupos. La skill exige
  menos de dos. Por eso ese 0 no cumple la regla de aplicabilidad publicada.
  No se reemplazó por un NA. Al revisar por separado las otras 23 páginas siguen
  apareciendo 22 ceros y un uno: la concentración no depende solo de C13.

En C04, C4 vale exactamente 0,50 y C3 vale 0,25. Por eso no activa el corte
estricto > 0,50 y conserva nivel 1 con trigger C4. Esto explica el cálculo;
no demuestra que su evaluación sea correcta frente a expertos.

## Cómo queda cerrado

Juan confirmó el 21 de octubre que el cierre debe conservar esta limitación,
según lo acordado con Camilo. Registramos ese alcance; no se atribuye al asesor
una aprobación experta de los puntajes ni reglas adicionales.

Se conserva la rúbrica sin mover cortes para repartir resultados. En el perfil
de resultados G1 debe figurar **no interpretable v1**, en la misma tabla.
Si más adelante se calcula acuerdo global con expertos, se reportará con y sin
G1, como exige el [protocolo](../../docs/protocolo.md). No hay datos humanos para
calcularlo ahora. Proximidad, Prägnanz, Región común y Similitud siguen sin un
resultado interpretable en esta versión; tampoco se resolvió su correspondencia
con el juicio experto. La reproducción local no prueba la hipótesis H1 del modelo.

Los cortes son convenciones del proyecto, no umbrales derivados de esas leyes.
Prägnanz se aproxima mediante regularidad geométrica; no equivale al principio
original. La similitud se evalúa sin color. Estas restricciones se mantienen.

El 21/3 descrito para una corrida anterior solo tiene respaldo narrativo en el
informe histórico. El artefacto versionado reproduce 23/1. No se reconstruyeron
datos ausentes ni se separó el efecto de correcciones publicadas juntas.

Una futura versión tendría que resolver aplicabilidad, C1 sin base y equivalencia
de conjuntos, registrar las reglas antes de evaluar y conservar esta versión.
La validación experta y el consenso siguen pendientes; el panel depende de ética.
No son necesarios para reconocer y documentar la limitación observada, pero sí
para afirmar correspondencia con el juicio humano.

## Archivos y comprobación

- [Datos y mediciones por página](resultados.json) y [tabla CSV](paginas.csv).
- [Comprobaciones](VERIFICACION.json) y [fuentes por hash](FUENTES-SHA256.tsv).
- [Resumen del cierre](../../docs/CIERRE-G1-21OCT.md).

Se conservaron ${verification.preservacion.archivos_anteriores_sin_cambios} archivos anteriores frente a 2313903 y se verificaron los
diez sellos de pilotos (4.160 archivos protegidos), sin regenerarlos. Los sellos
de corpus, calibración y dorados se comprueban también con sus comandos existentes.
El sello de este cierre usa rutas relativas a la raíz del repositorio.

Para repetir la revisión sin solicitar respuestas ni sobrescribir resultados:

\`\`\`bash
node scripts/g1-closure.js verificar
\`\`\`
`;
}

function sealNames() {
  return [...sources(read('calibracion/_piloto.json').paginasDetalle.map(r => r.id)),
    ...FILES.map(f => DIR + '/' + f), 'scripts/g1-closure.js', 'scripts/g1-closure.test.js', 'docs/CIERRE-G1-21OCT.md'];
}

function main(command, requireSeal = true) {
  const folder = path.join(ROOT, DIR);
  const sealPath = path.join(folder, 'SELLO-SHA256.tsv');
  if (command === 'sellar') {
    assert(!fs.existsSync(sealPath), 'El sello ya existe; verificarlo, no regenerarlo');
    main('verificar', false);
    const names = sealNames();
    fs.writeFileSync(sealPath, manifest(names), { flag: 'wx' });
    textResult({ sello_creado: true, archivos: names.length });
    return;
  }
  assert(['generar', 'verificar'].includes(command), 'Uso: node scripts/g1-closure.js generar | verificar | sellar');
  if (command === 'generar') {
    assert(!fs.existsSync(folder), 'El cierre ya existe; usar verificar');
  } else {
    assert(!requireSeal || fs.existsSync(sealPath), 'Falta el sello del cierre');
    checkManifest(fs.readFileSync(path.join(folder, 'FUENTES-SHA256.tsv'), 'utf8'),
      sources(read('calibracion/_piloto.json').paginasDetalle.map(r => r.id)));
    if (fs.existsSync(sealPath)) checkManifest(fs.readFileSync(sealPath, 'utf8'), sealNames());
  }
  const { data, verification, sourceBefore } = collect();
  const contents = { 'resultados.json': json(data), 'paginas.csv': csv(data.paginas),
    'INFORME.md': report(data, verification), 'VERIFICACION.json': json(verification),
    'FUENTES-SHA256.tsv': sourceBefore };
  if (command === 'generar') fs.mkdirSync(folder, { recursive: true });
  for (const [name, content] of Object.entries(contents)) {
    if (command === 'generar') fs.writeFileSync(path.join(folder, name), content, { flag: 'wx' });
    else assert.equal(fs.readFileSync(path.join(folder, name), 'utf8'), content, 'No coincide: ' + name);
  }
  textResult({ estado: data.estado, paginas_reproducidas: 24, niveles: data.resumen.niveles_historicos,
    discrepancia_no_aplica: data.resumen.discrepancias_no_aplica, llamadas_modelo: 0,
    historicos_sin_cambios: verification.preservacion.archivos_anteriores_sin_cambios,
    sellos_anteriores: verification.preservacion.sellos_pilotos.length, sello_cierre_verificado: fs.existsSync(sealPath) });
}

function textResult(value) { process.stdout.write(json(value)); }
module.exports = { auditHistorical, summary, csv, checkManifest, category };
if (require.main === module) {
  try { main(process.argv[2]); }
  catch (error) { process.stderr.write(error.stack + '\n'); process.exitCode = 1; }
}
