# Guía de carpetas y documentos

Revisión del 5 de noviembre de 2026.

Esta guía ayuda a encontrar lo que usamos ahora y a reconocer lo que se conserva
de entregas anteriores. Los registros fechados describen el estado de su momento.

## Por dónde empezar

| Para qué | Archivo |
|---|---|
| Entender y preparar la entrega actual | [README del proyecto](../README.md) e [instalación](instalacion.md). |
| Consultar las reglas actuales de evaluación | [Apéndice de rúbricas](apendice-rubricas.md), generado desde `skills/`. |
| Revisar la actualización de la dependencia | [Actualización del 5 de noviembre](ACTUALIZACION-DEPENDENCIA-05NOV.md). |
| Ver la prueba pequeña con modelo real en Codex | [Informe del 5 de noviembre](../verificaciones/codex-0.2.1-2026-11-05/INFORME.md). |
| Entender la propuesta y el contexto original | [Índice del contexto](contexto/00-INDICE.md). Describe el corte de septiembre. |
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
| `verificaciones/` | Comprobaciones pequeñas de funcionamiento, como la prueba de la versión 0.2.1 en Codex. |
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
G3 conserva combinaciones sin regla y G6 se abstuvo en sus 120 evaluaciones del piloto.
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
| Comprobar los datos conservados | [g1-closure.js](../scripts/g1-closure.js), con la opción `verificar`. |

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
de la raíz conservan la versión 0.1.0 por el sello de G1; sus copias de entrega usan 0.2.1.
La explicación está en [el README principal](../README.md).

La [comprobación del orden de archivos](../revisiones/estructura-2026-11-05/COMPROBACION.json)
registra el traslado del ZIP, los archivos retirados y la revisión de enlaces y sellos.
