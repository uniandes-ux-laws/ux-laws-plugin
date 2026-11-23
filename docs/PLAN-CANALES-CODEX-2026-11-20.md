# Plan de ejecución: canales con Codex

Antes de la primera solicitud del estudio deben estar en commits locales la regla de análisis y los registros de pruebas previas. Un archivo sin commit es un borrador operativo y no habilita evaluaciones. Se conserva la rama local solicitada y no se hace push.

## Alcance y orden

Preparar una repetición de G2 y G7 sobre wireframe y screenshot, y de G4 sobre screenshot: cinco solicitudes por página, 150 en total. G1, G3, G5 y G6 quedan fuera. Ejecutar una página a la vez, intercalando H01, G01, L01, H02, G02, L02 y así sucesivamente. G01, G04, L01, L02 y L03 requieren `--aceptar-sanidad-fallida`; registrar la advertencia y repetir los análisis sin esas páginas.

El selector `--series g2-wireframe,g2-screenshot,g4-screenshot,g7-wireframe,g7-screenshot` declara las cinco posiciones en el libro. `verificar` debe confirmar cinco solicitudes y ninguna respuesta antes de evaluar. La página de humo usa una captura de calibración que no pertenece a las 30 páginas.

## Una solicitud por subagente

Para cada solicitud se construye una carpeta exclusiva con copias de la solicitud, el prompt, la entrada, el esquema, las imágenes autorizadas y la skill. Se cotejan sus huellas con el libro. El subagente se crea con `fork_turns=none` y recibe: «lee solo tu carpeta de entrada; no abras panel/, resultados/ ni historial Git». Guarda la respuesta completa en su carpeta; el ejecutor la conserva sin modificarla en la ruta del libro.

En el libro se consigna `contexto_limpio: true` y `mecanismo_de_aislamiento: subagente nuevo con fork_turns=none; sin transcripción previa; lectura limitada por encargo` para cada respuesta. El canario P1 y el sondeo P3 respaldan la ausencia de ese contexto en este mecanismo, no prueban una barrera de lectura del sistema de archivos. Los subagentes pueden leer el repositorio; su encargo se lo prohíbe fuera de la entrada. El modelo real de cada solicitud y los parámetros de decodificación expuestos o no expuestos se conservan sin inferencias.

Al recibir las cinco respuestas, registrar el aislamiento, verificar el libro y ejecutar `recoger --conservar-invalidas`. Conservar una respuesta inválida y su motivo sin corregir ni repetir. Cerrar y commitear avances con regularidad. No iniciar una nueva página si una anterior sigue sin registrar sus cinco posiciones, salvo que se declare la interrupción y el estado de reanudación.

## Ventanas de uso y reanudación

Medir solicitudes, tiempo y tokens visibles de la primera página cerrada. Con ellos hacer una estimación explícitamente marcada como tal de la cobertura posible antes del plazo; no tratarla como límite de uso verificado. Usar el máximo de subagentes concurrentes realmente permitido, uno por solicitud. Si aparece un límite, dejar las entradas, respuestas y libro en su estado real y continuar en la siguiente ventana disponible, sin volver a generar respuestas que ya existan. Si un subagente se detiene después de escribir, conservar su archivo y registrar que no entregó reporte.

**Estimación tras la primera página:** H01 requirió cinco solicitudes y 8,56 minutos desde el inicio de los subagentes hasta el cierre. Los tokens no están verificados. Extrapolando ese ritmo sin interrupciones hasta el comienzo del día límite, cabrían las 30 páginas previstas. La estimación no incorpora límites de uso desconocidos ni pausas y no garantiza esa cobertura.

Al completar la muestra o al llegar al plazo, calcular solo representación y estados sin puntaje con `scripts/analizar-representacion-codex.js`, que lee exclusivamente los perfiles de esta corrida. La herramienta existente `comparar-canales.js` requiere también el panel y una corrida anterior: no se ejecuta en esta sesión. No ejecutar `comparar-panel` ni la fase con el panel. Escribir el informe, cerrar la fase y dejar identificados el commit y la cobertura reales. Si un permiso impide continuar antes de cumplir las condiciones de cierre, conservar un estado reanudable y declarar la barrera.
