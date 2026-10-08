# Resultado del piloto de G5

G5 revisa la posición de los elementos de una lista y las señales de avance en un proceso. Esta fase quedó incompleta: **41 respuestas válidas de 120 previstas**, sobre 24 capturas con cinco evaluaciones independientes por página. Hay 4 respuestas inválidas, 2 errores técnicos y 73 solicitudes pendientes. Las respuestas originales se conservan. La comparación con expertos sigue pendiente.

## Puntajes obtenidos

Los porcentajes usan los **41 puntajes aplicables**. Los 0 «no aplica» (NA) se cuentan aparte. Para resumir una página se exige que tenga cinco respuestas válidas; se registra el nivel más frecuente y se conservan los empates. Hay 8 páginas con un nivel más frecuente, 0 con NA como resultado más frecuente y 0 con empate. Los niveles no se promedian.

| Nivel | Evaluaciones | % de puntajes | Páginas con ese nivel más frecuente, sin empate |
|---|---:|---:|---:|
| 0 | 20 | 48.8 % | 4 |
| 1 | 5 | 12.2 % | 1 |
| 2 | 11 | 26.8 % | 2 |
| 3 | 5 | 12.2 % | 1 |
| 4 | 0 | 0.0 % | 0 |

Aparecieron **4 de los cinco niveles**. Se mantuvieron los límites de puntuación registrados.

## Cambios entre repeticiones

- Páginas con cinco respuestas válidas: **8/24**.
- Mismo nivel en las cinco repeticiones: **7/8** (87.5 %). Se incluyen las páginas que repiten NA.
- Misma regla usada para justificar el nivel (`trigger`): **8/8**.
- Cambio de lista principal elegida: **1** página: C04.
- Respuestas con evidencia insuficiente: **25/41** (61.0 %). Esta marca señala una duda y puede acompañar un puntaje válido.

La tabla conserva los niveles recibidos. La proporción indica cuántas respuestas repiten el nivel más frecuente. La diferencia de niveles es el mayor menos el menor; no significa que cada salto tenga el mismo peso. Un nivel puede mantenerse aunque cambie la lista elegida o la regla usada.

<details>
<summary>Ver resultados por página</summary>

| Página | Niveles recibidos válidos | Nivel(es) más frecuente(s) | Proporción que lo repite | Diferencia de niveles | Reglas distintas | Evidencia insuficiente |
|---|---|---|---:|---:|---:|---:|
| C02 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 | 5/5 |
| C03 | 2, 2, 2, 2, 2 | 2 | 1.00 | 0 | 1 | 0/5 |
| C04 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 | 0/5 |
| C06 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 | 5/5 |
| C07 | 1, 1, 1, 1, 1 | 1 | 1.00 | 0 | 1 | 5/5 |
| C09 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 | 5/5 |
| C10 | 2, 3, 3, 3, 3 | 3 | 0.80 | 1 | 1 | 5/5 |
| C11 | 2, 2, 2, 2, 2 | 2 | 1.00 | 0 | 1 | 0/5 |
| C12 | — | — | — | — | 0 | 0/0 |
| C13 | 3 | 3 | 1.00 | 0 | 1 | 0/1 |
| C14 | — | — | — | — | 0 | 0/0 |
| C15 | — | — | — | — | 0 | 0/0 |
| C16 | — | — | — | — | 0 | 0/0 |
| C17 | — | — | — | — | 0 | 0/0 |
| C18 | — | — | — | — | 0 | 0/0 |
| C20 | — | — | — | — | 0 | 0/0 |
| C21 | — | — | — | — | 0 | 0/0 |
| C22 | — | — | — | — | 0 | 0/0 |
| C23 | — | — | — | — | 0 | 0/0 |
| C24 | — | — | — | — | 0 | 0/0 |
| C25 | — | — | — | — | 0 | 0/0 |
| R02 | — | — | — | — | 0 | 0/0 |
| R03 | — | — | — | — | 0 | 0/0 |
| R07 | — | — | — | — | 0 | 0/0 |

</details>

## Qué se comprobó y qué falta

La revisión de entradas encontró 0 páginas con fragmentos de texto o elementos decorativos tratados como listas, 0 omisiones comprobadas de menús centrados y 0 páginas con candidatos recortados. La primera fase, con medición 1.0.3, tenía seis, cinco y una respectivamente. Esto comprueba la corrección de esos problemas de medición. Las cajas originales se conservaron; 13 páginas tienen extremos parcialmente fuera de la pantalla.

El control automático encontró **0 contradicciones** entre puntajes y reglas, y **0 respuestas** que omitieran declarar una limitación geométrica. Esta revisión no confirma que la interpretación visual sea correcta.

Hay **0/0 respuestas NA con evidencia insuficiente**. Una marca NA acompañada de esa duda no confirma que no haya listas: la detección puede haber omitido una secuencia visible. El código reconoce listas en una fila o columna, pero puede omitir las repartidas entre varias filas, columnas o contenedores.

Se identificó un proceso con progreso visible (`Q=true`) en **0/41** respuestas. **La parte de progreso quedó sin probar con casos positivos.** Estas páginas de entrada no bastan para validar su uso en compras, registros o formularios por pasos.

**Para cerrar G5 falta comparar con los casos dorados consensuados y los expertos, revisar las dudas de selección y probar la parte de progreso.** Un conjunto adicional de procesos debe quedar separado y tener criterios de selección registrados antes de capturar y evaluar. El panel humano requiere aprobación ética y consentimiento.

<details>
<summary>Configuración y registro de la ejecución</summary>

| Dato | Valor |
|---|---|
| Modelo solicitado | gpt-6.1-sol |
| Herramienta | codex-cli 0.160.0 |
| Esfuerzo de razonamiento | xhigh |
| Medición | 1.0.4 |
| Protocolo | 0.1.0, con los cambios registrados el 6 de octubre |
| Commit del ejecutor | `ef2446297d330ce5e7bb3001442b01560c11133d` |

Cada evaluación usó una conversación nueva, sin herramientas y con las mismas instrucciones por página. Recibió el wireframe para revisar la estructura y la captura original para leer los textos. **41/41** respuestas válidas registraron esa consulta de la captura; los resultados dependen de ambas representaciones. La herramienta no expone temperatura ni top-p, y el nombre del modelo no permite conocer una versión interna más precisa.

Se conservaron las imágenes de septiembre, con su convención histórica de imágenes sin X. La configuración y los hashes están en [manifiesto.json](manifiesto.json).

La primera fase está en `../g5-2026-10-06/`: 23 respuestas, 18 válidas y cinco abstenciones de C03 clasificadas como inválidas por el formato de esa fase. La segunda está en `../g5-2026-10-06-v2/`: 47 intentos, 41 válidos, cuatro inválidos y dos errores por límite de uso. La fase final corrigió la identificación de listas cuyo padre no se conserva y redujo el esfuerzo de xhigh a medium. Las diferencias entre fases no pueden atribuirse a uno solo de esos cambios. Los datos de las fases incompletas se conservan separados de la final.

</details>

[Resumen por página](resumen.csv), [datos por evaluación](evaluaciones.csv), [revisión de datos](auditoria.json) y [plan e historial](../../docs/PILOTO-G5-06OCT.md). Para analizar puntajes, filtrar `estado=valido`; `NA` indica «no aplica» y `null` conserva valores vacíos. Las filas pendientes no son resultados. La repetición comprueba estabilidad de esta configuración, no acuerdo entre expertos.
