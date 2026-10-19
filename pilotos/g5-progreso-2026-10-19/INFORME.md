# G5: prueba separada de progreso

19 de octubre de 2026. **Las 45 posiciones tienen un intento conservado.** Hay 45 respuestas válidas, 0 inválidas y 0 fallos técnicos. Quedan 0 posiciones pendientes. El piloto general de 120 respuestas se conserva por separado.

**Límite al interpretar la prueba:** algunas clases CSS de las medidas pueden dar pistas sobre la condición del ejemplo. La coincidencia con las expectativas no demuestra por sí sola que el juicio se haya apoyado únicamente en las imágenes. El detalle aparece en «Cómo leer estos ejemplos».

## Qué probamos

Nueve pantallas locales, con cinco conversaciones independientes por pantalla. Ocho tienen un nivel o NA esperado y P10 solo revisa un recorte. P06 quedó excluida antes de empezar porque falta aclarar su ancla con Camilo. Usamos gpt-6.1-sol, razonamiento medium, CLI 0.162.0-alpha.17.2 y medidas 1.0.6. Los [criterios de esta prueba](REGISTRO-PREVIO.md) y las [expectativas](EXPECTATIVAS-PREVIAS.json) se guardaron antes de evaluar; las expectativas no se entregaron al modelo.

## Qué salió

| Caso | Niveles o estado de las cinco repeticiones | Coinciden con el nivel esperado | Marcas de evidencia insuficiente |
|---|---|---|---|
| P01 | 0 / 0 / 0 / 0 / 0 | 5/5 | 0/5 válidas |
| P02 | 1 / 1 / 1 / 1 / 1 | 5/5 | 5/5 válidas |
| P03 | 2 / 2 / 2 / 2 / 2 | 5/5 | 5/5 válidas |
| P04 | 3 / 3 / 3 / 3 / 3 | 5/5 | 0/5 válidas |
| P05 | 3 / 3 / 3 / 3 / 3 | 5/5 | 0/5 válidas |
| P07 | 0 / 0 / 0 / 0 / 0 | 5/5 | 0/5 válidas |
| P08 | 0 / 0 / 0 / 0 / 0 | 5/5 | 0/5 válidas |
| P09 | NA / NA / NA / NA / NA | 5/5 | 0/5 válidas |
| P10 | 3 / 3 / 3 / 3 / 3 | No se compara el nivel | 5/5 válidas |

En las 40 posiciones con nivel esperado hay **40 coincidencias**. Se han intentado 40 de esas 40 posiciones, con 40 respuestas válidas. Las inválidas y los errores no se quitan del total de 40. P10 tiene otras cinco posiciones y no entra en ese denominador. NA significa que el constructo no aplica; no equivale a nivel cero.

Hay 9 pantallas con cinco respuestas válidas: 9 mantuvieron el nivel o NA y 6 mantuvieron la condición justificativa (trigger). Se encontraron 5 respuestas con diferencias frente a algún criterio esperado y 0 con una contradicción en las reglas comprobadas. Las diferencias de criterios se muestran por campo en [resumen.json](resumen.json); no se reescriben las respuestas para resolverlas.

### Respuestas que requieren revisar

- [P02-r1](respuestas/P02-r1.json): evidence_insufficient: se esperaba false y respondió true
- [P02-r2](respuestas/P02-r2.json): evidence_insufficient: se esperaba false y respondió true
- [P02-r3](respuestas/P02-r3.json): evidence_insufficient: se esperaba false y respondió true
- [P02-r4](respuestas/P02-r4.json): evidence_insufficient: se esperaba false y respondió true
- [P02-r5](respuestas/P02-r5.json): evidence_insufficient: se esperaba false y respondió true

## Cómo leer estos ejemplos

**Límite de los ejemplos que preparamos:** los datos medidos conservaron clases CSS que pueden dar pistas: P03 (pasos color ); P04 (pasos forma ); P05 (pasos forma ); P10 (pasos forma recorte). No entregamos las expectativas, pero estos nombres describen la condición del ejemplo y podrían ayudar a inferirla. Es una observación posterior a evaluar. No sabemos cuánto influyeron y no atribuimos la coincidencia solo a las imágenes. Para comprobar eso haría falta otra versión registrada antes de evaluar, con nombres neutros y casos más variados. Esta serie se conserva completa.

- **Sin indicador y barra sin orientación:** P01 dio 0 / 0 / 0 / 0 / 0; P02 dio 1 / 1 / 1 / 1 / 1. La barra de P02 recibió 5 marcas de evidencia insuficiente, frente a cero previstas. El modelo señaló que la barra no llegó como candidato medido y mencionó pérdida del relleno. La [imagen del wireframe](imagenes/P02/wireframe.png) conserva el contorno y la división interior de esa barra: perder el tono no equivale a perder toda su geometría. Esta observación posterior no corrige las respuestas ni confirma por sí sola todos sus argumentos.
- **Color y forma:** P03 dio 2 / 2 / 2 / 2 / 2, con 5 marcas de evidencia insuficiente. P04 y P05 dieron 3 / 3 / 3 / 3 / 3 y 3 / 3 / 3 / 3 / 3. Así se puede revisar por separado el estado que depende del color y el que tiene una forma visible.
- **Total de pasos declarado:** en P04 se registró 4 / 4 / 4 / 4 / 4; en P05, null / null / null / null / null. Un null indica que el texto no declaró un total, aunque se vieran varias etiquetas.
- **Controles sin proceso:** el carrusel P07 dio 0 / 0 / 0 / 0 / 0, la ruta común P08 dio 0 / 0 / 0 / 0 / 0 y el formulario aislado P09 dio NA / NA / NA / NA / NA.
- **Recorte:** P10 recibió 5 marcas de evidencia insuficiente. Se conserva el nivel que emitió cada corrida, pero no se compara con un nivel esperado porque ese valor no se fijó para este caso.
- **Condición justificativa:** P04: ninguna / ninguna / G_forma / ninguna / G_forma; P05: ninguna / G_forma / G_forma / G_forma / ninguna; P10: G_forma / ninguna / ninguna / ninguna / G_forma. Un nivel estable no garantiza que también se repita el trigger. En estos ejemplos varió entre G_forma y ninguna; conviene aclarar cuál debe nombrar el cumplimiento de los cuatro criterios de progreso, sin cambiar ahora los resultados.

## Qué podemos concluir

Esta es una prueba con ejemplos hechos por nosotros. La coincidencia se compara con expectativas de diseño y no mide acuerdo con expertos. Aunque una respuesta coincida, todavía hace falta la validación humana. La ejecución quedó terminada; cualquier diferencia observada sigue siendo un resultado que hay que explicar.

Quedan por resolver el ancla de P06, un ejemplo positivo específico de nivel 4 y la comparación con expertos. Las capturas son nuevas y tienen menos de 50 nodos por su tamaño: se conserva la advertencia de sanidad, sin modificar el umbral. G5 usa el screenshot para los criterios que requieren leer; no es una comparación pura entre dos canales.

## Dónde revisar

- [evaluaciones.csv](evaluaciones.csv): una fila por cada una de las 45 posiciones, con el estado de cada una.
- [resumen.json](resumen.json): niveles, dispersión, diferencias por criterio y estados.
- respuestas/: originales recibidos; resultados/: las mismas respuestas con datos de ejecución añadidos.
- trazas/: eventos, conversación, consumo, hashes y errores de cada intento.

El ejecutor no vuelve a lanzar posiciones que ya tengan un intento, aunque el resultado no coincida con la expectativa. No se publican estos archivos en GitHub desde esta prueba.
