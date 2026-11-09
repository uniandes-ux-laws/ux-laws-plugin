# G5: registro de la prueba de progreso

19 de octubre de 2026. Se escribe antes de solicitar las evaluaciones.

Esta prueba continúa la preparación de [los diez ejemplos locales](../preparacion/g5-progreso-2026-10-19/README.md). El piloto general de 120 respuestas se conserva completo. No vamos a usar estos ejemplos para corregirlo ni a mezclarlos con páginas reales o casos dorados.

## Qué vamos a ejecutar

Se incluyen P01, P02, P03, P04, P05, P07, P08, P09 y P10: nueve pantallas, cinco repeticiones por pantalla, **45 solicitudes**. P06 queda fuera: aún falta acordar el nivel para un indicador que nombra las etapas pero no marca la actual.

El orden será por repetición: primero una evaluación de cada pantalla, después la segunda, y así hasta la quinta. Cada solicitud empieza en una conversación nueva. Se mantiene gpt-6.1-sol y razonamiento medium, como en el piloto general de G5. La CLI se fija en la versión instalada 0.162.0-alpha.17.2. Las capturas nuevas tienen medición 1.0.6 y el generador actual con X. Son diferencias registradas respecto al piloto del 7 de octubre, que usó otra CLI y medición 1.0.5; esta prueba no mide por sí sola el efecto de esos cambios.

El ejecutor nuevo es scripts/pilot-g5-progress.js. Reutiliza la plantilla de prompt y la validación de scripts/pilot-g5-real.js sin editar ese archivo. La ejecución se registra en pilotos/g5-progreso-2026-10-19, con copias de la rúbrica, escala, esquema e instrucciones base, imágenes, entradas, prompts y hashes. No se sustituye el ejecutor del piloto general.

## Qué puede ver el evaluador

Solo recibe el wireframe, el screenshot, las medidas de su pantalla, la escala, la rúbrica completa y el contrato de salida. No recibe casos.json, la galería, este registro, expectativas ni respuestas de otras corridas. Se desactivan herramientas, conectores y web; se trabaja en una carpeta temporal sin documentos del proyecto. Se usa una instrucción base de evaluación en vez de la instrucción de programación. Las trazas permiten comprobar que no llamó herramientas.

La documentación oficial describe la ejecución sin interacción, los eventos JSON y la salida con esquema: [modo no interactivo de Codex](https://learn.chatgpt.com/docs/non-interactive-mode). También se comprobaron las opciones de la CLI local antes de registrar la prueba.

Las pantallas sintéticas son pequeñas y el control general de captura dejó sanity_ok=false por tener menos de 50 nodos. La preparación comprobó que cargaron y que sus listas llegaron a la medición. Se conserva esa advertencia en la evidencia; no se cambia el umbral. El evaluador recibe los mismos campos de página que la plantilla histórica de G5, sin convertir esa advertencia en una etiqueta de respuesta.

## Cómo vamos a leer los resultados

Las expectativas ya estaban en preparacion/g5-progreso-2026-10-19/casos.json antes de capturar. Se copian aparte para compararlas después, sin añadirlas al prompt.

- P01–P05 y P07–P09: comparar score y not_applicable exactamente con la expectativa propuesta. Son **40 posiciones**. NA no cuenta como cero.
- En esos ocho ejemplos también se informa si la decisión Q coincide. Para Q=true se compara G_existe y steps_declared; si hay indicador se comparan G_nombra, G_actual y G_forma. Se informa la marca de evidencia insuficiente. Los G de una pantalla sin proceso no se fuerzan a falso: no aplican.
- P10: comprobar Q, G_existe, G_nombra, G_actual, steps_declared y evidence_insufficient. Su nivel y G_forma no tienen una respuesta esperada fijada. Sus **cinco posiciones** se reportan aparte y nunca entran en el denominador de coincidencia de niveles.
- Mostrar cada repetición, el nivel más frecuente, empates y rango ordinal. La estabilidad del nivel y la del trigger se informan por separado. No promediar niveles ni llamar acuerdo experto a la coincidencia con expectativas de diseño.
- Una respuesta inválida se conserva como inválida, cuenta en las posiciones planificadas y no se repite. Se muestra el motivo. No se elimina del denominador para mejorar la coincidencia. Un error técnico queda separado de una respuesta del modelo.
- No hay un umbral global nuevo para declarar validado G5. Se informa qué coincide y qué falla. Estos ejemplos permiten revisar situaciones concretas, no estimar desempeño en todas las páginas web.

## Uso y conservación

Se ejecutan lotes pequeños, con concurrencia uno, revisando el uso entre lotes. Se deja margen al llegar al 94 % de la ventana. No se usan reinicios gratuitos ni se compran créditos. Ante un fallo técnico se conservan los archivos y se detienen solicitudes nuevas. Una posición ya intentada no se vuelve a lanzar automáticamente.

Antes de cada lote se comprueban los hashes del ejecutor, sus dependencias, las imágenes y los prompts. Al finalizar se verifican los originales contra las trazas, las conversaciones independientes y los hashes. Se generan CSV, resumen e informe en español y un sello de los archivos primarios. Si queda incompleta por uso o por error, se indica el punto exacto para continuar.

Terminar las 45 posiciones no resuelve P06, no añade un ejemplo positivo de nivel 4 y no sustituye la evaluación experta. Tampoco convierte la expectativa de diseño en un juicio humano ya recogido.
