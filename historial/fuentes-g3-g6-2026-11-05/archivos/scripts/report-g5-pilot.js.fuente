#!/usr/bin/env node
'use strict';
// Informe descriptivo: lee derivados; no transforma las respuestas originales.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const dir = path.resolve(ROOT, process.argv[2] || 'pilotos/g5-2026-10-07');
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
let naInsufficient = 0;
const detail = [['pagina', 'repeticion', 'estado', 'nivel', 'trigger', 'no_aplicable', 'evidencia_insuficiente',
  'id_lista', 'padre_lista', 'J_inicio', 'J_final', 'Q', 'lectura_screenshot', 'prompt_sha256', 'respuesta_sha256']];
for (const page of m.pages) for (let r = 1; r <= 5; r++) {
  const key = page.id + '-r' + r, proofFile = path.join(dir, 'trazas', key + '.json');
  const proof = fs.existsSync(proofFile) ? JSON.parse(fs.readFileSync(proofFile, 'utf8')) : { status: 'pendiente' };
  const file = path.join(dir, 'respuestas', key + '.json');
  let raw = {};
  if (fs.existsSync(file)) { try { raw = JSON.parse(fs.readFileSync(file, 'utf8')); } catch {} }
  const v = raw.measurements || {};
  if (proof.status === 'valido' && raw.not_applicable && raw.evidence_insufficient) naInsufficient++;
  detail.push([page.id, r, proof.status, raw.not_applicable ? 'NA' : raw.score, raw.trigger,
    raw.not_applicable, raw.evidence_insufficient, v.main_list_id, v.main_list_parent_id, v.J_inicio, v.J_final, v.Q,
    v.lectura_screenshot?.join('|'), page.prompt_hash, proof.raw_sha256]);
}
fs.writeFileSync(path.join(dir, 'evaluaciones.csv'), detail.map(row => row.map(csvCell).join(',')).join('\n') + '\n');
const status = s.ejecucion_completa ? 'Esta fase terminó' : 'Esta fase quedó incompleta';
let text = `# Resultado del piloto de G5\n\nG5 revisa la posición de los elementos de una lista y las señales de avance en un proceso. ${status}: **${s.validas} respuestas válidas de 120 previstas**, sobre ${m.pages.length} capturas con cinco evaluaciones independientes por página. Hay ${s.invalidas} respuestas inválidas, ${s.errores_tecnicos} errores técnicos y ${s.pendientes} solicitudes pendientes. Las respuestas originales se conservan. La comparación con expertos sigue pendiente.\n\n`;
text += `## Puntajes obtenidos\n\nLos porcentajes usan los **${applicable} puntajes aplicables**. Los ${s.no_aplicables} «no aplica» (NA) se cuentan aparte. Para resumir una página se exige que tenga cinco respuestas válidas; se registra el nivel más frecuente y se conservan los empates. Hay ${decidedPages} páginas con un nivel más frecuente, ${naPages.length} con NA como resultado más frecuente y ${tiedPages.length} con empate. Los niveles no se promedian.\n\n| Nivel | Evaluaciones | % de puntajes | Páginas con ese nivel más frecuente, sin empate |\n|---|---:|---:|---:|\n`;
for (let i = 0; i <= 4; i++) text += `| ${i} | ${s.niveles_por_evaluacion[i]} | ${pct(s.niveles_por_evaluacion[i], applicable)} | ${modes[i]} |\n`;
text += `\nAparecieron **${s.niveles_por_evaluacion.filter(n => n > 0).length} de los cinco niveles**. Se mantuvieron los límites de puntuación registrados.\n\n`;
text += `## Cambios entre repeticiones\n\n- Páginas con cinco respuestas válidas: **${s.paginas_con_cinco_validas}/24**.\n- Mismo nivel en las cinco repeticiones: **${s.paginas_estables_en_nivel}/${s.paginas_con_cinco_validas}** (${pct(s.paginas_estables_en_nivel, s.paginas_con_cinco_validas)}). Se incluyen las páginas que repiten NA.\n- Misma regla usada para justificar el nivel (\`trigger\`): **${stableTrigger}/${s.paginas_con_cinco_validas}**.\n- Cambio de lista principal elegida: **${variableMain.length}** ${variableMain.length === 1 ? 'página' : 'páginas'}${variableMain.length ? ': ' + variableMain.join(', ') : ''}.\n- Respuestas con evidencia insuficiente: **${s.evidencia_insuficiente}/${s.validas}** (${pct(s.evidencia_insuficiente, s.validas)}). Esta marca señala una duda y puede acompañar un puntaje válido.\n\nLa tabla conserva los niveles recibidos. La proporción indica cuántas respuestas repiten el nivel más frecuente. La diferencia de niveles es el mayor menos el menor; no significa que cada salto tenga el mismo peso. Un nivel puede mantenerse aunque cambie la lista elegida o la regla usada.\n\n<details>\n<summary>Ver resultados por página</summary>\n\n| Página | Niveles recibidos válidos | Nivel(es) más frecuente(s) | Proporción que lo repite | Diferencia de niveles | Reglas distintas | Evidencia insuficiente |\n|---|---|---|---:|---:|---:|---:|\n`;
for (const p of s.paginas) text += `| ${p.id} | ${p.niveles.map(label).join(', ') || '—'} | ${p.modas.map(label).join(', ') || '—'} | ${p.fraccion_en_moda === null ? '—' : p.fraccion_en_moda.toFixed(2)} | ${p.rango_ordinal ?? '—'} | ${p.triggers_distintos} | ${p.evidencia_insuficiente}/${p.validas} |\n`;
text += `\n</details>\n\n## Qué se comprobó y qué falta\n\nLa revisión de entradas encontró ${a.paginas_con_texto_o_pseudoelementos} páginas con fragmentos de texto o elementos decorativos tratados como listas, ${a.omisiones_demostrables_por_alineacion.length} omisiones comprobadas de menús centrados y ${a.paginas_con_recorte_de_ocho_listas.length} páginas con candidatos recortados. La primera fase, con medición 1.0.3, tenía seis, cinco y una respectivamente. Esto comprueba la corrección de esos problemas de medición. Las cajas originales se conservaron; ${a.paginas_con_cajas_parciales} páginas tienen extremos parcialmente fuera de la pantalla.\n\nEl control automático encontró **${a.respuestas_con_conflicto_de_ancla} contradicciones** entre puntajes y reglas, y **${a.respuestas_con_limite_geometrico_sin_declarar} respuestas** que omitieran declarar una limitación geométrica. Esta revisión no confirma que la interpretación visual sea correcta.\n\n`;
if (problemPages.length) text += `Quedan casos por revisar en ${problemPages.map(p => p.id).join(', ')}. Sus respuestas se conservan en los resultados; el detalle está en [auditoria.json](auditoria.json).\n\n`;
text += `Hay **${naInsufficient}/${s.no_aplicables} respuestas NA con evidencia insuficiente**. Una marca NA acompañada de esa duda no confirma que no haya listas: la detección puede haber omitido una secuencia visible. El código reconoce listas en una fila o columna, pero puede omitir las repartidas entre varias filas, columnas o contenedores.\n\n`;
if (naInsufficient) text += 'Debemos revisar la posible omisión de lista en R02 antes de interpretar su resultado NA.\n\n';
text += `Se identificó un proceso con progreso visible (\`Q=true\`) en **${s.Q_verdadero}/${s.validas}** respuestas. `;
text += s.Q_verdadero
  ? 'Los casos positivos requieren revisar su evidencia.\n\n'
  : '**La parte de progreso quedó sin probar con casos positivos.** Estas páginas de entrada no bastan para validar su uso en compras, registros o formularios por pasos.\n\n';
text += `**Para cerrar G5 falta comparar con los casos dorados consensuados y los expertos, revisar las dudas de selección y probar la parte de progreso.** Un conjunto adicional de procesos debe quedar separado y tener criterios de selección registrados antes de capturar y evaluar. El panel humano requiere aprobación ética y consentimiento.\n\n`;
text += `<details>\n<summary>Configuración y registro de la ejecución</summary>\n\n| Dato | Valor |\n|---|---|\n| Modelo solicitado | ${m.model_id} |\n| Herramienta | ${m.cli_version} |\n| Esfuerzo de razonamiento | ${m.decoding.model_reasoning_effort} |\n| Medición | ${m.pages[0].measurements_version} |\n| Protocolo | 0.1.0, con los cambios registrados el ${m.pages[0].measurements_version === '1.0.4' ? '6' : '6 y 7'} de octubre |\n| Commit del ejecutor | \`${m.git_commit}\` |\n\nCada evaluación usó una conversación nueva, sin herramientas y con las mismas instrucciones por página. Recibió el wireframe para revisar la estructura y la captura original para leer los textos. **${s.lectura_screenshot}/${s.validas}** respuestas válidas registraron esa consulta de la captura; los resultados dependen de ambas representaciones. La herramienta no expone temperatura ni top-p, y el nombre del modelo no permite conocer una versión interna más precisa.\n\nSe conservaron las imágenes de septiembre, con su convención histórica de imágenes sin X. La configuración y los hashes están en [manifiesto.json](manifiesto.json).\n\n`;
text += `La primera fase está en \`../g5-2026-10-06/\`: 23 respuestas, 18 válidas y cinco abstenciones de C03 clasificadas como inválidas por el formato de esa fase. La segunda está en \`../g5-2026-10-06-v2/\`: 47 intentos, 41 válidos, cuatro inválidos y dos errores por límite de uso. La fase final corrigió la identificación de listas cuyo padre no se conserva y redujo el esfuerzo de xhigh a medium. Las diferencias entre fases no pueden atribuirse a uno solo de esos cambios. Los datos de las fases incompletas se conservan separados de la final.\n\n`;
text += `</details>\n\n[Resumen por página](resumen.csv), [datos por evaluación](evaluaciones.csv), [revisión de datos](auditoria.json) y [plan e historial](../../docs/PILOTO-G5-06OCT.md). Para analizar puntajes, filtrar \`estado=valido\`; \`NA\` indica «no aplica» y \`null\` conserva valores vacíos. Las filas pendientes no son resultados. La repetición comprueba estabilidad de esta configuración, no acuerdo entre expertos.\n`;
fs.writeFileSync(path.join(dir, 'INFORME.md'), text);
console.log('Informe escrito en ' + path.relative(ROOT, path.join(dir, 'INFORME.md')));
