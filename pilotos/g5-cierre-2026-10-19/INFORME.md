# G5: cobertura del contrato 0.2.0

Registro fechado el 19 de octubre de 2026. **Serie ejecutada: 25/25 posiciones.** Hay 25 respuestas válidas, 0 inválidas y 0 errores técnicos. Quedan 0 pendientes.

Válida significa que la respuesta cumple el formato y las reglas comprobadas, con sus fuentes conservadas. No garantiza que cada juicio visual o cada frase sea correcto.

## Qué hicimos

Se aplicó el contrato nuevo después de registrar la decisión autorizada por Juan. E01 reutiliza P06: indicador con nombres, sin paso actual, ahora con nivel 1 definido antes de evaluarlo. Los pares E02/E03 y E04/E05 prueban la diferencia entre 3 y 4 en horizontal y vertical. El nivel 4 requiere final diferenciado y de menor peso que el inicio. Los HTML nuevos y los datos entregados no dan nombres de clases que describan su condición.

Ambas series usan gpt-6.1-sol, esfuerzo medium, CLI 0.162.0-alpha.17.2 y medidas 1.0.6. Cada posición tiene una conversación nueva, sin herramientas ni respuestas anteriores. Las expectativas de diseño quedaron separadas del prompt antes de evaluar. El [registro previo](REGISTRO-PREVIO.md) y las [expectativas](EXPECTATIVAS-PREVIAS.json) se conservan completos.

## Resultados

NA significa no aplicable; no equivale a nivel cero.

| Caso | Cinco repeticiones | Coincidencia de nivel | Evidencia insuficiente |
|---|---|---|---|
| E01 | 1 / 1 / 1 / 1 / 1 | 5/5 | 0/5 válidas |
| E02 | 3 / 3 / 3 / 3 / 3 | 5/5 | 0/5 válidas |
| E03 | 4 / 4 / 4 / 4 / 4 | 5/5 | 0/5 válidas |
| E04 | 3 / 3 / 3 / 3 / 3 | 5/5 | 0/5 válidas |
| E05 | 4 / 4 / 4 / 4 / 4 | 5/5 | 0/5 válidas |

Hay **25/25 coincidencias** con el nivel o NA esperado. Las posiciones inválidas o con error permanecen en el total planificado. 5/5 pantallas mantuvieron nivel o NA y 5/5 mantuvieron trigger entre las cinco respuestas válidas. Las modas, empates, rangos ordinales y triggers de cada repetición están en [resumen.json](resumen.json). No se promedian los niveles.

Se marcaron 0 respuestas con evidencia insuficiente. Hay 0 respuestas con algún criterio distinto de lo previsto. Coincidir en nivel no equivale a coincidir en todos los juicios.

**Revisión posterior de las explicaciones:** siete respuestas atribuyen al wireframe un relleno que aparece en el screenshot. En el wireframe queda una forma interior con centro blanco. Los campos coinciden con lo previsto, pero esa frase es imprecisa. Esta observación no formaba parte de los criterios previos y se conserva aparte, sin cambiar puntajes. [Detalle y originales](../../revisiones/g5-cierre-2026-10-19/REVISION-EXPLICACIONES.md).

El trigger único se exige por contrato: su consistencia no se presenta como una mejora espontánea del razonamiento. La nueva regla de nivel 1 es una decisión de desarrollo autorizada por Juan, no una aprobación atribuida a Camilo.

## Qué podemos concluir

Terminó la ejecución de esta serie. Son ejemplos hechos por nosotros, con expectativas propuestas por nosotros. No son juicios de expertos ni una muestra representativa de todas las páginas web. La lectura del screenshot sigue siendo necesaria para los criterios textuales; no se afirma una comparación pura de canales.

Las advertencias por pocas cajas en pantallas sintéticas se conservan; no se bajó el umbral general de captura. Los pilotos anteriores, sus puntajes y sus limitaciones no se sustituyen. No se vuelve a solicitar una posición para conseguir una respuesta mejor. La validación con expertos y el consenso siguen pendientes.

## Archivos

- [evaluaciones.csv](evaluaciones.csv): una fila por posición planificada, incluido su estado.
- [resumen.json](resumen.json): comparación de criterios y dispersión.
- respuestas/: originales; resultados/: originales con atribución añadida.
- trazas/: conversación, consumo, comandos, errores y hashes.
- VERIFICACION.json y SELLO-SHA256.tsv: comprobación y sello de los archivos primarios.
