# Pruebas previas y estado de la prueba de humo

## Contexto

P1: el primer intento fue inválido porque el token aún no se había fijado. El segundo, con un token aleatorio en la conversación principal y un subagente nuevo con `fork_turns=none`, respondió «no lo sé». P3: otro subagente con el mismo mecanismo, sin usar herramientas, respondió «no lo sé» al preguntar por resultados de acuerdo. Ninguna de estas pruebas comprueba el aislamiento del sistema de archivos.

P2 se había sondeado antes de la nueva decisión: el subagente identificó instrucciones generales, pero ninguna instrucción específica del proyecto en su contexto recibido; no buscó archivos. P4 y P5 dejan de ser compuertas por decisión de David; el acceso observado se declara en aislamiento.md.

## Selector y preparación de P6

El orquestador no ofrecía selección de series. Se añadió `--series`, se validó la selección en preparación, verificación y recogida, y se ajustó la comparación para los pares presentes. Los archivos de skill y las fuentes selladas no se modificaron. La prueba específica `node scripts/orchestrate-series.test.js` terminó con 3 pruebas aprobadas y 0 fallidas; usa respuestas artificiales inválidas para comprobar conservación y no consulta respuestas anteriores.

El comando estándar `node --test scripts/orchestrate-series.test.js` fue bloqueado con `spawn EPERM`; el error y la adaptación del comando están en aislamiento.md.

Se preparó además `scripts/analizar-representacion-codex.js`, que solo lee perfiles y libros de la corrida indicada. La prueba `node scripts/analizar-representacion-codex.test.js` pasó 2/2 con datos artificiales: comprueba los coeficientes, el bootstrap por página, estados sin puntaje, sensibilidad y registro de aislamiento. No se ejecutó el análisis sobre las páginas del estudio.

El empaquetado y registro de respuestas se comprobó con `node scripts/paquetes-codex.test.js`: 1/1 pruebas pasadas. La prueba usa archivos artificiales, comprueba huellas, conservación literal, recuperación idempotente y rechazo de entradas modificadas. Luego se prepararon y verificaron 30 páginas con cinco solicitudes cada una; las cinco aceptaciones de sanidad figuran en sus libros. Los comandos y salidas de cada página están en esta carpeta de registros.

Se preparó la captura de calibración C13, ajena a las 30 páginas, en `pruebas-codex-2026-11-20/humo-C13`, con G7 wireframe, una repetición y `runtime=codex`. `verificar` informó una serie, una solicitud y cero respuestas presentes. Se preparó una carpeta exclusiva para el subagente con las huellas del prompt, la entrada, el esquema y la imagen verificadas. Se lanzó un subagente nuevo con `fork_turns=none` y la restricción de lectura autorizada.

El subagente leyó la copia local de `SKILL.md`, produjo una respuesta y declaró que no podía verificar por sí mismo el identificador del modelo. El entorno principal informa `gpt-6.1-terra`; la herramienta describe la herencia del modelo del padre cuando no se establece una alternativa. El libro de humo registra `gpt-6.1-terra` por esa herencia, no por una comprobación independiente del subagente. La decodificación figura como no expuesta.

La respuesta original se copió sin cambios a la ruta fijada en el libro. Se comprobaron de nuevo las huellas de los insumos, se registró el mecanismo de contexto limpio y `verificar` informó una respuesta presente. `recoger --conservar-invalidas` terminó con código 0: la respuesta fue válida y produjo un puntaje; no hubo respuestas inválidas. Los registros completos están en `pruebas-codex-2026-11-20/verificar-humo.log` y `pruebas-codex-2026-11-20/recoger-humo.log`. Esto prueba la invocación explícita de la skill mediante una copia; el descubrimiento automático de la skill no se verificó.
