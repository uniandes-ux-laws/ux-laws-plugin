# G5: prueba separada de progreso

19 de octubre de 2026. **Prueba en curso: 6 de 45 posiciones con intento conservado.** Hay 6 respuestas válidas, 0 inválidas y 0 fallos técnicos. Quedan 39 posiciones pendientes. El piloto general de 120 respuestas se conserva por separado.

## Qué probamos

Nueve pantallas locales, con cinco conversaciones independientes por pantalla. Ocho tienen un nivel o NA esperado y P10 solo revisa un recorte. P06 quedó excluida antes de empezar porque falta aclarar su ancla con Camilo. Usamos gpt-6.1-sol, razonamiento medium, CLI 0.162.0-alpha.17.2 y medidas 1.0.6. Los [criterios de esta prueba](REGISTRO-PREVIO.md) y las [expectativas](EXPECTATIVAS-PREVIAS.json) se guardaron antes de evaluar; las expectativas no se entregaron al modelo.

## Qué salió

| Caso | Niveles o estado de las cinco repeticiones | Coinciden con el nivel esperado | Marcas de evidencia insuficiente |
|---|---|---|---|
| P01 | 0 / pendiente / pendiente / pendiente / pendiente | 1/5 | 0/1 válidas |
| P02 | 1 / pendiente / pendiente / pendiente / pendiente | 1/5 | 1/1 válidas |
| P03 | 2 / pendiente / pendiente / pendiente / pendiente | 1/5 | 1/1 válidas |
| P04 | 3 / pendiente / pendiente / pendiente / pendiente | 1/5 | 0/1 válidas |
| P05 | 3 / pendiente / pendiente / pendiente / pendiente | 1/5 | 0/1 válidas |
| P07 | 0 / pendiente / pendiente / pendiente / pendiente | 1/5 | 0/1 válidas |
| P08 | pendiente / pendiente / pendiente / pendiente / pendiente | 0/5 | 0/0 válidas |
| P09 | pendiente / pendiente / pendiente / pendiente / pendiente | 0/5 | 0/0 válidas |
| P10 | pendiente / pendiente / pendiente / pendiente / pendiente | No se compara el nivel | 0/0 válidas |

En las 40 posiciones con nivel esperado hay **6 coincidencias**. Se han intentado 6 de esas 40 posiciones, con 6 respuestas válidas. Todavía no se interpreta esta cifra como resultado final. P10 tiene otras cinco posiciones y no entra en ese denominador. NA significa que el constructo no aplica; no equivale a nivel cero.

Hay 0 pantallas con cinco respuestas válidas: 0 mantuvieron el nivel y 0 mantuvieron el trigger. Se encontraron 1 respuestas con diferencias frente a algún criterio esperado y 0 con una contradicción en las reglas comprobadas. Las diferencias de criterios se muestran por campo en [resumen.json](resumen.json); no se reescriben las respuestas para resolverlas.

### Respuestas que requieren revisar

- [P02-r1](respuestas/P02-r1.json): evidence_insufficient: se esperaba false y respondió true

## Qué podemos concluir

Esta es una prueba con ejemplos hechos por nosotros. La coincidencia se compara con expectativas de diseño y no mide acuerdo con expertos. Aunque una respuesta coincida, todavía hace falta la validación humana. La ejecución está incompleta; no se afirma que la parte de progreso ya esté probada con todas las repeticiones.

Quedan por resolver el ancla de P06, un ejemplo positivo específico de nivel 4 y la comparación con expertos. Las capturas son nuevas y tienen menos de 50 nodos por su tamaño: se conserva la advertencia de sanidad, sin modificar el umbral. G5 usa el screenshot para los criterios que requieren leer; no es una comparación pura entre dos canales.

## Dónde revisar

- [evaluaciones.csv](evaluaciones.csv): una fila por cada una de las 45 posiciones, incluidas las pendientes.
- [resumen.json](resumen.json): niveles, dispersión, diferencias por criterio y estados.
- respuestas/: originales recibidos; resultados/: las mismas respuestas con datos de ejecución añadidos.
- trazas/: eventos, conversación, consumo, hashes y errores de cada intento.

El ejecutor no vuelve a lanzar posiciones que ya tengan un intento, aunque el resultado no coincida con la expectativa. No se publican estos archivos en GitHub desde esta prueba.
