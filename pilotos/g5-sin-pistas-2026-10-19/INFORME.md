# G5: comprobación sin clases CSS

Registro fechado el 19 de octubre de 2026. **Serie ejecutada: 45/45 posiciones.** Hay 45 respuestas válidas, 0 inválidas y 0 errores técnicos. Quedan 0 pendientes.

Válida significa que la respuesta cumple el formato y las reglas comprobadas, con sus fuentes conservadas. No garantiza que cada juicio visual o cada frase sea correcto.

## Qué hicimos

Se reutilizaron las mismas imágenes, medidas, modelo, instrucciones, rúbrica y esquema de la serie anterior. Solo se retiraron las clases CSS de los candidatos a indicador. P06 continúa excluido de esta comparación histórica. P10 se revisa aparte, sin nivel esperado.

Ambas series usan gpt-6.1-sol, esfuerzo medium, CLI 0.162.0-alpha.17.2 y medidas 1.0.6. Cada posición tiene una conversación nueva, sin herramientas ni respuestas anteriores. Las expectativas de diseño quedaron separadas del prompt antes de evaluar. El [registro previo](REGISTRO-PREVIO.md) y las [expectativas](EXPECTATIVAS-PREVIAS.json) se conservan completos.

## Resultados

NA significa no aplicable; no equivale a nivel cero.

| Caso | Cinco repeticiones | Coincidencia de nivel | Evidencia insuficiente |
|---|---|---|---|
| P01 | 0 / 0 / 0 / 0 / 0 | 5/5 | 0/5 válidas |
| P02 | 1 / 1 / 1 / 1 / 1 | 5/5 | 5/5 válidas |
| P03 | 2 / 2 / 2 / 2 / 2 | 5/5 | 5/5 válidas |
| P04 | 3 / 3 / 3 / 3 / 3 | 5/5 | 0/5 válidas |
| P05 | 3 / 3 / 3 / 3 / 3 | 5/5 | 0/5 válidas |
| P07 | 0 / 0 / 0 / 0 / 0 | 5/5 | 0/5 válidas |
| P08 | 0 / 0 / 0 / 0 / 0 | 5/5 | 0/5 válidas |
| P09 | NA / NA / NA / NA / NA | 5/5 | 0/5 válidas |
| P10 | 3 / 3 / 3 / 3 / 3 | No se compara | 5/5 válidas |

Hay **40/40 coincidencias** con el nivel o NA esperado. Las posiciones inválidas o con error permanecen en el total planificado. 9/9 pantallas mantuvieron nivel o NA y 6/9 mantuvieron trigger entre las cinco respuestas válidas. Las modas, empates, rangos ordinales y triggers de cada repetición están en [resumen.json](resumen.json). No se promedian los niveles.

Se marcaron 15 respuestas con evidencia insuficiente. Hay 5 respuestas con algún criterio distinto de lo previsto. Coincidir en nivel no equivale a coincidir en todos los juicios.

Comparadas por página y número de repetición con la serie anterior, 45/45 conservaron nivel o NA. Esto describe dos series de conversaciones nuevas; no significa que compartieran una semilla aleatoria ni demuestra causalidad. Las diferencias de campos, trigger y marca de insuficiencia se guardan por posición.

P02 permite revisar la advertencia no prevista de la barra: retirar clases no añade un candidato que faltaba en las medidas. Su wireframe conserva el contorno y la división interior, aunque se pierda el tono; eso no permite afirmar que desapareció toda la geometría. P03 comprueba la distinción que solo dependía del color. P10 se lee como límite por recorte, sin convertir su nivel en un acierto o error.

## Diferencias conservadas

- [P02-r1](respuestas/P02-r1.json): evidence_insufficient: false → true
- [P02-r2](respuestas/P02-r2.json): evidence_insufficient: false → true
- [P02-r3](respuestas/P02-r3.json): evidence_insufficient: false → true
- [P02-r4](respuestas/P02-r4.json): evidence_insufficient: false → true
- [P02-r5](respuestas/P02-r5.json): evidence_insufficient: false → true

## Qué podemos concluir

Terminó la ejecución de esta serie. Son ejemplos hechos por nosotros, con expectativas propuestas por nosotros. No son juicios de expertos ni una muestra representativa de todas las páginas web. La lectura del screenshot sigue siendo necesaria para los criterios textuales; no se afirma una comparación pura de canales.

Las advertencias por pocas cajas en pantallas sintéticas se conservan; no se bajó el umbral general de captura. Los pilotos anteriores, sus puntajes y sus limitaciones no se sustituyen. No se vuelve a solicitar una posición para conseguir una respuesta mejor. La validación con expertos y el consenso siguen pendientes.

## Archivos

- [evaluaciones.csv](evaluaciones.csv): una fila por posición planificada, incluido su estado.
- [resumen.json](resumen.json): comparación de criterios y dispersión.
- respuestas/: originales; resultados/: originales con atribución añadida.
- trazas/: conversación, consumo, comandos, errores y hashes.
- VERIFICACION.json y SELLO-SHA256.tsv: comprobación y sello de los archivos primarios.
