# Guía de carpetas y documentos

Revisión del 5 de noviembre de 2026; panel de expertos añadido el 13 de noviembre.

Esta guía ayuda a encontrar lo que usamos ahora y a reconocer lo que se conserva
de entregas anteriores. Los registros fechados describen el estado de su momento.

## Por dónde empezar

| Para qué | Archivo |
|---|---|
| Entender y preparar la entrega actual | [README del proyecto](../README.md) e [instalación](instalacion.md). |
| Consultar las reglas actuales de evaluación | [Apéndice de rúbricas](apendice-rubricas.md), generado desde `skills/`. |
| Ver la integración actual de G3 y G6 | [Alcance de la entrega 0.2.2](ALCANCE-G3-G6-05NOV.md) y [resumen de comprobaciones](INTEGRACION-G3-G6-05NOV.md). Se aplica por defecto en corridas nuevas y permanece local. |
| Ver la prueba real de la entrega integrada | [Prueba de 0.2.2](../verificaciones/integracion-0.2.2-2026-11-05/INFORME.md), con siete respuestas válidas en Codex. Es una comprobación pequeña, sin referencia experta. |
| Revisar la actualización de la dependencia | [Actualización del 5 de noviembre](ACTUALIZACION-DEPENDENCIA-05NOV.md). |
| Ver la prueba anterior de 0.2.1 con modelo real | [Informe del 5 de noviembre](../verificaciones/codex-0.2.1-2026-11-05/INFORME.md). Se conserva sin cambios. |
| Consultar la prueba anterior a la integración | [Propuesta inicial](PROPUESTA-ALCANCE-G3-G6-05NOV.md) y [comprobación separada](../verificaciones/alcance-g3-g6-2026-11-05/INFORME.md). Son registros históricos; la entrega actual es 0.2.2. |
| Consultar la orientación posterior de Juan sobre G3/G6 | [Criterio recomendado para el equipo](CRITERIO-G3-G6-05NOV.md). Camilo les encargó tomar las decisiones; se conservan aparte los registros de la prueba anterior. |
| Entender la propuesta y el contexto original | [Índice del contexto](contexto/00-INDICE.md). Describe el corte de septiembre. |
| Ver la corrida del corpus y su comparación con el panel | [Informe de la corrida](../resultados/corpus-claude-code-2026-11-13/INFORME.md). Parcial: 18 de 30 páginas, una repetición, Claude Code. |
| Usar el panel de expertos y compararlo con el sistema | [Diseño aplicado y regla de comparación](ANALISIS-PANEL-13NOV.md) y [panel/README.md](../panel/README.md). La regla se fijó antes de tener puntajes del sistema sobre el corpus. |
| Consultar las reglas de trabajo y el estado por fecha | [CLAUDE.md](../CLAUDE.md). |

## Qué contiene cada carpeta

| Carpeta | Contenido |
|---|---|
| `capture/` | Código para capturar la página y generar el wireframe. |
| `measure/` | Código para obtener las mediciones. |
| `skills/` | Las siete skills de los grupos y la skill que coordina la evaluación. Es la fuente de las rúbricas. |
| `shared/` | Escala, decisiones y esquemas compartidos. |
| `scripts/` | Ejecución, comprobaciones, informes, preparación de entregas y pruebas del código. |
| `corpus/` | Listas de páginas, decisiones y sellos de los conjuntos de datos. |
| `captures/` | Capturas originales del corpus. A diferencia de `capture/`, esta carpeta contiene datos. |
| `calibracion/` | Capturas usadas en los pilotos. |
| `dorados/` | Casos dorados, hojas recibidas y archivos de acuerdo. |
| `preparacion/` | Pantallas y materiales preparados para las pruebas adicionales de G4 y G5. |
| `pilotos/` | Entradas, respuestas originales, registros, resultados e informes de cada piloto. |
| `revisiones/` | Revisiones de las capturas y de los resultados. Se conservan aparte de las respuestas originales. |
| `resultados/` | Corridas de las skills sobre el corpus, con sus respuestas, perfiles, registros y la comparación con el panel. |
| `verificaciones/` | Comprobaciones pequeñas de funcionamiento, como la prueba de la versión 0.2.1 en Codex. |
| `historial/` | Fuentes anteriores conservadas para comprobar los pilotos con el código y las reglas que usaron. No es la versión para instalar. |
| `docs/` | Instrucciones, contexto de la tesis e informes fechados. |
| `release/` | Versión y dependencias que usa el preparador de la entrega. |
| `dist/` | ZIP, carpetas de instalación y comprobaciones locales de las entregas. No se sube a Git. |
| `demo/` | Páginas generadas por las demostraciones. No se sube a Git. |
| `node_modules/` | Dependencias instaladas por npm. No se sube a Git. |
| `.agents/skills` | Enlace generado para Codex. La fuente sigue siendo `skills/`. |
| `.claude-plugin/` | Manifiesto del plugin. |

## Dónde están los resultados de cada grupo

| Grupo | Lectura recomendada |
|---|---|
| G1 | [Cierre de G1](CIERRE-G1-21OCT.md). Conserva su limitación como instrumento no interpretable en v1. |
| G2 y G7 | [Informe de G2](../pilotos/g2-2026-10-18/INFORME.md) e [informe de G7](../pilotos/g7-2026-10-18/INFORME.md). |
| G3 y G6 | [Cierre conjunto](CIERRE-G3-G6-21OCT.md). Incluye los puntajes, abstenciones e inválidas. |
| G4 | [Última fase](../pilotos/g4-cierre-2026-10-20/INFORME.md) y [revisión posterior](REVISION-G4-FASE2-20OCT.md). |
| G5 | [Cierre conjunto de sus pruebas](CIERRE-G5-19OCT.md). |

Los pilotos terminaron de ejecutarse, pero eso no equivale a validación experta.
El piloto anterior de G3 conserva sus combinaciones sin regla y G6 sus 120 abstenciones.
La entrega 0.2.2 amplía una condición de G3 y muestra el diagnóstico de G6 sin recalificar esos resultados.
Las reglas propuestas de G4 y G5 siguen pendientes de revisión con Camilo.

Los archivos `CONTINUAR-*` conservan puntos de reanudación e instrucciones de las
ejecuciones anteriores. Antes de seguirlos, leer su estado final y el informe del grupo.

## Cómo ubicarse en scripts

No se cambiaron sus rutas: algunos pilotos guardan las rutas y las huellas de los
archivos con los que se hicieron. Moverlos exigiría revisar esas referencias.

| Tarea | Archivos principales |
|---|---|
| Demo de una página | [demo.js](../scripts/demo.js). |
| Preparar y cerrar evaluaciones | [orchestrate.js](../scripts/orchestrate.js). |
| Preparar la grilla | [preparar-grilla.js](../scripts/preparar-grilla.js). |
| Revisar capturas | [revisar-capturas.js](../scripts/revisar-capturas.js). |
| Preparar y comprobar la entrega | [preparar-entrega.js](../scripts/preparar-entrega.js), [verificar-entrega.js](../scripts/verificar-entrega.js) y [probar-entrega.js](../scripts/probar-entrega.js). |
| Generar las reglas | [preparar-reglas.js](../scripts/preparar-reglas.js) y [build-appendix.js](../scripts/build-appendix.js). |
| Importar, describir y comparar el panel | [panel-consolidado.js](../scripts/panel-consolidado.js) y [comparar-panel.js](../scripts/comparar-panel.js). |
| Comprobar los datos conservados | [g1-closure.js](../scripts/g1-closure.js), con la opción `verificar`. |
| Comprobar las fuentes anteriores de G3/G6 | [verificar-fuentes-historicas.js](../scripts/verificar-fuentes-historicas.js). Solo verifica; no solicita respuestas. |

Los archivos `*.test.js` prueban el código. Los `pilot-*`, `report-*`, `verify-*` y
los que nombran un grupo sirven para ejecutar o revisar sus fases específicas.
No son copias sobrantes por tener nombres parecidos.

[review-g4-sets.js](../scripts/review-g4-sets.js) genera la revisión de conjuntos de G4.
[chequeo-codex-real.js](../scripts/chequeo-codex-real.js) se usó en la prueba pequeña del
5 de noviembre. Ambos se conservan para explicar cómo se obtuvieron esos archivos;
no hace falta ejecutarlos para usar la entrega.

## Qué se ordenó y qué se conserva

- El ZIP de `_to_delete/` pasó a [contexto/originales/contexto.zip](contexto/originales/contexto.zip), sin cambiar su contenido. Diez documentos coinciden con el contexto actual y tres son diferentes. Es un original histórico, no la fuente para consultar las reglas actuales.
- Se retiraron cinco archivos `.DS_Store`, que macOS crea para guardar la vista de las carpetas. Ahora Git los ignora.
- Se dejó de ignorar los registros `.log` de `verificaciones/`, porque forman parte de la evidencia de las pruebas.
- Los pilotos anteriores, los intentos fallidos y sus registros se conservan. También se mantienen los documentos de septiembre y octubre para poder seguir las decisiones.
- Las copias de instalación y las imágenes de revisión dentro de `dist/` ocupan espacio local, pero sirven de respaldo de las comprobaciones anteriores. Se conservaron con sus rutas actuales.

El repositorio de trabajo incluye investigación e historial. El ZIP de entrega contiene
solo lo necesario para usar la herramienta. El `package.json` y el manifiesto de Claude
de la raíz conservan la versión 0.1.0 por el sello de G1; sus copias de entrega usan 0.2.2.
La explicación está en [el README principal](../README.md).

La [comprobación del orden de archivos](../revisiones/estructura-2026-11-05/COMPROBACION.json)
registra el traslado del ZIP, los archivos retirados y la revisión de enlaces y sellos.

## Documentos fechados

Los documentos fechados conservan su redacción original. El 12 de noviembre de 2026 se
actualizaron los textos que se leen hoy (`CLAUDE.md`, el README, `docs/casos-dorados.md`,
`docs/contexto/` y otros). No se tocaron la propuesta entregada
(`docs/contexto/01-PROPUESTA-FORMAL.md`), los documentos con fecha en el nombre, `historial/`,
`pilotos/`, `preparacion/` ni los scripts que generan informes sellados. `docs/protocolo.md`
tampoco: su hash está registrado en el cierre sellado de G1. Ni `corpus/DECISIONES-CORPUS.md`:
los cierres de G1 y de G3/G6 exigen que nada en `corpus/` cambie desde su base, y una edición
de ese archivo rompió los dos verificadores, así que se revirtió. Esos textos describen lo que
se sabía en su fecha.

## Límites conocidos, fuera de la ronda del 12 de noviembre

De `docs/AUDITORIA-SKILL-2026-11-12.md`, diferidos a propósito:

- **M1** — `capture/capture.js` acepta `file://` y cualquier host (localhost, redes privadas).
- **M4** — `orchestrate.js preparar` usa un `measurements.json` existente sin comprobar su versión.
- **M11** — la captura no tiene un tiempo máximo total; un DOM muy denso no terminó en 280 s.
- **M2** — Codex CLI 0.154.0 cargó skills del usuario pese a `--ignore-user-config`; no
  verificado con la CLI de los pilotos.
- **M8** — no hay Release ni ZIP publicado; construirlo exige LibreOffice.
- **M10** — 474 archivos versionados llevan rutas `/Users/juan/…`.
- **B-1** — `package-lock.json` de la raíz con `fast-uri` < 3.1.9 (la entrega ya usa 3.1.9).
- **B-2** — `compatibility` y `allowed-tools` de las skills no siguen el estándar; corregirlo
  cambia el hash del `SKILL.md` de G1 sellado.
- **B-3** — cuatro documentos citados por las skills no entran en el ZIP.
- **B-7** — G2 y G7 comparten el inventario de accionables; no es doble conteo mientras no
  se calcule un total.
- **No verificado** — estabilidad con tres repeticiones, inyección desde la página con
  modelo, y comparación Claude–Codex. Las corre Juan, con autorización.

Encontrado al aplicar la auditoría, también pendiente:

- **Fin de línea fuera de `pilotos/`**: `package-lock.json`, `release/` y `revisiones/` no
  están fijados en `.gitattributes`. En Windows con la configuración por defecto de Git,
  `entrega.test.js:65` y `g1-closure.js verificar` fallan por eso.
- **`verify-g5-closure.js`** falla desde `15f158b` (4 nov.): `capture/capture.js` y
  `capture/dismiss.js` cambiaron después del registro de G5. Verificarlo exige reconstruir el
  código de la fecha del cierre.
- **`docs/protocolo.md`** no recibió la desviación de G3/G6, la reformulación de la decisión
  9, la cifra 71/71 ni la limpieza del comité: su hash está registrado en el cierre sellado de
  G1 (`revisiones/g1-cierre-2026-10-21/FUENTES-SHA256.tsv`), igual que `package.json`,
  `package-lock.json`, `shared/escala.md`, `docs/hipotesis-m3.md` y el código de `measure/`.
  Cambiarlos rompe `g1-closure.js verificar`. Requiere una decisión del equipo.
