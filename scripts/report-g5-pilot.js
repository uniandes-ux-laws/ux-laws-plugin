#!/usr/bin/env node
'use strict';
// Informe descriptivo: lee derivados; no transforma las respuestas originales.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const dir = path.resolve(ROOT, process.argv[2] || 'pilotos/g5-2026-10-06-v2');
const json = f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const s = json('resumen.json'), a = json('auditoria.json'), m = json('manifiesto.json');
const pct = (n, d) => d ? (100 * n / d).toFixed(1) + ' %' : 'no calculable';
const label = v => v === null ? 'NA' : String(v);
const applicable = s.validas - s.no_aplicables;
const modes = [0, 0, 0, 0, 0], naPages = [], tiedPages = [];
for (const p of s.paginas) {
  if (p.validas !== 5) continue;
  if (p.modas.length > 1) tiedPages.push(p.id);
  else if (p.modas[0] === null) naPages.push(p.id);
  else modes[p.modas[0]]++;
}
const decidedPages = modes.reduce((sum, n) => sum + n, 0);
const stableTrigger = s.paginas.filter(p => p.validas === 5 && p.triggers_distintos === 1).length;
const variableMain = a.paginas_con_seleccion_principal_variable;
const problemPages = a.respuestas.filter(p => p.respuestas_con_conflicto_de_ancla || p.respuestas.some(r => r.limite_geometrico_sin_declarar));
const csvCell = v => v === undefined ? '' : v === null ? 'null' : '"' + String(v).replaceAll('"', '""') + '"';
const detail = [['pagina', 'repeticion', 'estado', 'nivel', 'trigger', 'no_aplicable', 'evidencia_insuficiente',
  'padre_lista', 'J_inicio', 'J_final', 'Q', 'lectura_screenshot', 'prompt_sha256', 'respuesta_sha256']];
for (const page of m.pages) for (let r = 1; r <= 5; r++) {
  const key = page.id + '-r' + r, proofFile = path.join(dir, 'trazas', key + '.json');
  const proof = fs.existsSync(proofFile) ? JSON.parse(fs.readFileSync(proofFile, 'utf8')) : { status: 'pendiente' };
  const file = path.join(dir, 'respuestas', key + '.json');
  let raw = {};
  if (fs.existsSync(file)) { try { raw = JSON.parse(fs.readFileSync(file, 'utf8')); } catch {} }
  const v = raw.measurements || {};
  detail.push([page.id, r, proof.status, raw.not_applicable ? 'NA' : raw.score, raw.trigger,
    raw.not_applicable, raw.evidence_insufficient, v.main_list_parent_id, v.J_inicio, v.J_final, v.Q,
    v.lectura_screenshot?.join('|'), page.prompt_hash, proof.raw_sha256]);
}
fs.writeFileSync(path.join(dir, 'evaluaciones.csv'), detail.map(row => row.map(csvCell).join(',')).join('\n') + '\n');
const status = s.ejecucion_completa ? 'Ejecución terminada' : 'Ejecución parcial: no declarar cerrado';
let text = `# Resultado del piloto real de G5\n\n${status}. **${s.validas} evaluaciones válidas de 120 previstas**, sobre ${m.pages.length} capturas de calibración con cinco solicitudes independientes por página. Hay ${s.invalidas} respuestas inválidas, ${s.errores_tecnicos} errores técnicos y ${s.pendientes} solicitudes pendientes. Las respuestas originales, incluidas las inválidas, se conservan. Este resultado mide distribución y estabilidad del evaluador; no prueba validez frente a expertos.\n\n`;
text += `## Configuración y procedencia\n\n- Modelo solicitado: \`${m.model_id}\`; runtime \`${m.cli_version}\`; razonamiento \`${m.decoding.model_reasoning_effort}\`. El runtime no expone temperatura ni top-p. No se afirma conocer una versión interna del servidor más precisa que este identificador.\n- Capa de medición: **${m.pages[0].measurements_version}**; protocolo 0.1.0 con desviaciones fechadas del 6 de octubre; código registrado en \`${m.git_commit}\`.\n- Cada página tiene un prompt idéntico entre sus repeticiones, contextos nuevos y sin herramientas. Los hashes de prompts, rúbrica, esquema, entradas e imágenes están en [manifiesto.json](manifiesto.json).\n- Se usan wireframe para jerarquía y screenshot para criterios textuales. **${s.lectura_screenshot}/${s.validas}** evaluaciones válidas declaran consulta del segundo canal. No atribuir estos puntajes a una condición exclusivamente sobre wireframe.\n- Se conservan las imágenes de septiembre, incluida su convención histórica de imágenes sin X; se evalúa el corpus sellado, sin recapturarlo.\n\n`;
text += `## Distribución ordinal\n\nDenominador por evaluación: **${applicable} resultados válidos aplicables**; ${s.no_aplicables} no aplicables se cuentan aparte. Denominador por página: **${decidedPages} páginas con cinco salidas válidas, moda única y aplicable**; ${naPages.length} tienen moda NA y ${tiedPages.length} tienen empate. No se fuerza un desempate ni se promedian niveles.\n\n| Nivel | Evaluaciones | Porcentaje de aplicables | Páginas con moda única |\n|---|---:|---:|---:|\n`;
for (let i = 0; i <= 4; i++) text += `| ${i} | ${s.niveles_por_evaluacion[i]} | ${pct(s.niveles_por_evaluacion[i], applicable)} | ${modes[i]} |\n`;
text += `\nSe observaron **${s.niveles_por_evaluacion.filter(n => n > 0).length} de los cinco niveles**. Una concentración de puntajes no autoriza a mover umbrales para repartir la escala: puede corresponder a la rúbrica, al evaluador, al canal o al conjunto de páginas.\n\n`;
text += `## Estabilidad entre repeticiones\n\n- Páginas con cinco respuestas válidas: **${s.paginas_con_cinco_validas}/24**.\n- Nivel idéntico en las cinco repeticiones: **${s.paginas_estables_en_nivel}/${s.paginas_con_cinco_validas}** (${pct(s.paginas_estables_en_nivel, s.paginas_con_cinco_validas)}); esta cifra incluye una eventual NA estable.\n- Trigger idéntico: **${stableTrigger}/${s.paginas_con_cinco_validas}**.\n- Selección variable de lista principal: **${variableMain.length} páginas**${variableMain.length ? ': ' + variableMain.join(', ') : ''}. Un nivel estable puede coexistir con un razonamiento o selección variable.\n- Evidencia insuficiente: **${s.evidencia_insuficiente}/${s.validas}** (${pct(s.evidencia_insuficiente, s.validas)}). No equivale a una respuesta inválida ni confirma que el puntaje sea correcto.\n\n| Página | Cinco niveles válidos | Moda(s) | Fracción modal | Rango ordinal | Triggers distintos | Evidencia insuficiente |\n|---|---|---|---:|---:|---:|---:|\n`;
for (const p of s.paginas) text += `| ${p.id} | ${p.niveles.map(label).join(', ') || '—'} | ${p.modas.map(label).join(', ') || '—'} | ${p.fraccion_en_moda === null ? '—' : p.fraccion_en_moda.toFixed(2)} | ${p.rango_ordinal ?? '—'} | ${p.triggers_distintos} | ${p.evidencia_insuficiente}/${p.validas} |\n`;
text += `\nLa unidad del rango es distancia entre niveles ordinales, sin interpretar que los saltos tienen igual magnitud psicológica. La repetición mide estabilidad de esta configuración; **no es acuerdo interexperto**. Los datos para tablas están en [resumen.csv](resumen.csv), y una fila por solicitud en [evaluaciones.csv](evaluaciones.csv). En este último, filtrar \`estado=valido\` para analizar puntajes; \`NA\` identifica no aplicabilidad y \`null\` conserva juicios nulos o abstenciones. Las filas pendientes no son resultados.\n\n`;
text += `## Auditoría y cobertura\n\nLa auditoría de entradas encuentra **${a.paginas_con_texto_o_pseudoelementos} páginas** con texto/pseudoelementos como listas, **${a.omisiones_demostrables_por_alineacion.length}** omisiones demostrables de menús centrados y **${a.paginas_con_recorte_de_ocho_listas.length}** páginas con candidatos truncados. La fase previa tenía seis, cinco y una respectivamente. Esta comparación verifica defectos de definición, no corrección de puntajes. Las cajas originales se conservan y ${a.paginas_con_cajas_parciales} páginas tienen extremos parcialmente fuera del viewport.\n\nLas salidas válidas presentan **${a.respuestas_con_conflicto_de_ancla} contradicciones detectadas por las reglas lógicas auditadas** y **${a.respuestas_con_limite_geometrico_sin_declarar} omisiones de la marca de límite geométrico**. Son comprobaciones necesarias pero incompletas: cero contradicciones no demuestra que la interpretación visual sea correcta.\n\n`;
if (problemPages.length) text += `Revisión necesaria en: ${problemPages.map(p => p.id).join(', ')}. Las respuestas no se corrigen a posteriori ni se retiran de la distribución por este diagnóstico; consultar [auditoria.json](auditoria.json).\n\n`;
text += `**Q verdadero: ${s.Q_verdadero}/${s.validas}.** `;
text += s.Q_verdadero ? 'Revisar los casos positivos y su evidencia antes de atribuirlos a un proceso real.\n\n' : '**La rama de progreso no fue ejercitada.** Estas páginas de entrada no permiten dar por validada la evaluación de checkout, registro o formularios por pasos.\n\n';
text += `## Alcance para cerrar G5\n\n${s.ejecucion_completa ? 'Se completó la ejecución prevista del piloto' : 'Falta completar la ejecución prevista'}, con trazabilidad y resultados preservados. **G5 no queda validado contra humanos ni cerrado metodológicamente por este piloto.** Quedan el consenso de casos dorados, la comparación con expertos y la cobertura de la rama de progreso. Los casos con evidencia insuficiente y selección variable deben revisarse con el equipo; no se inventan niveles de referencia.\n\nSi se amplía el conjunto para procesos, debe registrarse como un conjunto auxiliar separado y aprobarse su criterio de selección antes de capturar y puntuar. No sustituir páginas por su resultado ni alterar el corpus primario. La aprobación ética y el consentimiento siguen siendo condiciones del panel humano.\n\nLa fase inicial interrumpida permanece en \`../g5-2026-10-06/\`: 23 respuestas terminadas, 18 válidas y cinco abstenciones inválidas de C03; no se combina con esta fase. El historial de cambios y su registro previo están en [PILOTO-G5-06OCT.md](../../docs/PILOTO-G5-06OCT.md).\n`;
fs.writeFileSync(path.join(dir, 'INFORME.md'), text);
console.log('Informe escrito en ' + path.relative(ROOT, path.join(dir, 'INFORME.md')));
