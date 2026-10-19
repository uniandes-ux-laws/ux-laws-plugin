# Piloto de G2 · 18 de octubre de 2026

En G2 revisamos cómo están organizadas las opciones y si se distingue la acción principal. El piloto terminó. Recibimos **120/120 respuestas** de las 24 páginas de calibración. Cada página se evaluó cinco veces en conversaciones separadas.

El modelo asignó **41 puntajes** y dejó **79 respuestas sin puntaje (abstenciones)**. En las abstenciones explicó por qué no pudo asignar un nivel. No quedaron respuestas inválidas ni fallos técnicos pendientes.

Antes de completar el piloto hubo **3 solicitudes fallidas** que no devolvieron una respuesta. Por eso guardamos **123 intentos** para reunir las 120 respuestas. Los fallos no se cuentan como ceros, abstenciones ni NA. El [registro del reintento](REINTENTO-TECNICO-AUTORIZADO-19OCT.json) explica la autorización para repetir solo esas posiciones. Las respuestas que ya teníamos se conservaron.

## Resultados

Los porcentajes se calcularon sobre los 41 puntajes. Las abstenciones y los «no aplica» (NA) se cuentan aparte.

| Nivel | Evaluaciones | Porcentaje |
|---|---:|---:|
| 0 | 6 | 14.6 % |
| 1 | 0 | 0.0 % |
| 2 | 25 | 61.0 % |
| 3 | 10 | 24.4 % |
| 4 | 0 | 0.0 % |

El modelo se abstuvo cuando la situación observada no encajaba en las reglas o no podía asegurar algún juicio. Aquí agrupamos esos casos; la explicación completa está en cada respuesta.

<details>
<summary>Ver los motivos de las abstenciones</summary>

| Situación observada | Abstenciones |
|---|---:|
| 8 grupos de primer nivel; agrupación coherente; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 5 |
| 13 grupos de primer nivel; agrupación parcial; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 9 |
| 20 grupos de primer nivel; agrupación parcial; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 5 |
| 7 grupos de primer nivel; agrupación parcial; acción principal ausente; exige decisión: sin determinar; acciones que compiten: sí | 1 |
| 1 grupo de primer nivel; agrupación coherente; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 5 |
| 4 grupos de primer nivel; agrupación coherente; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 5 |
| 5 grupos de primer nivel; agrupación coherente; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 2 |
| 5 grupos de primer nivel; agrupación coherente; acción principal presente sin destacar; exige decisión: sí; acciones que compiten: sí | 3 |
| 6 grupos de primer nivel; agrupación coherente; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 11 |
| 6 grupos de primer nivel; agrupación coherente; acción principal clara; exige decisión: no; acciones que compiten: no | 1 |
| 11 grupos de primer nivel; agrupación coherente; acción principal clara; exige decisión: no; acciones que compiten: no | 2 |
| 11 grupos de primer nivel; agrupación parcial; acción principal clara; exige decisión: no; acciones que compiten: sí | 2 |
| 11 grupos de primer nivel; agrupación parcial; acción principal clara; exige decisión: no; acciones que compiten: no | 1 |
| 11 grupos de primer nivel; agrupación parcial; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 1 |
| 11 grupos de primer nivel; agrupación parcial; acción principal ausente; exige decisión: no; acciones que compiten: sí | 4 |
| 6 grupos de primer nivel; agrupación coherente; acción principal presente sin destacar; exige decisión: sí; acciones que compiten: sí | 3 |
| 14 grupos de primer nivel; agrupación débil; acción principal presente sin destacar; exige decisión: sí; acciones que compiten: sí | 1 |
| 14 grupos de primer nivel; agrupación débil; acción principal presente sin destacar; exige decisión: sin determinar; acciones que compiten: sí | 1 |
| 14 grupos de primer nivel; agrupación parcial; acción principal presente sin destacar; exige decisión: sí; acciones que compiten: sí | 2 |
| 14 grupos de primer nivel; agrupación parcial; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 1 |
| 7 grupos de primer nivel; agrupación coherente; acción principal clara; exige decisión: no; acciones que compiten: no | 5 |
| 15 grupos de primer nivel; agrupación coherente; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 2 |
| 15 grupos de primer nivel; agrupación parcial; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 3 |
| 6 grupos de primer nivel; agrupación parcial; acción principal ausente; exige decisión: no; acciones que compiten: sí | 3 |
| 13 grupos de primer nivel; agrupación coherente; acción principal presente sin destacar; exige decisión: no; acciones que compiten: sí | 1 |

</details>

De las 7 páginas con cinco respuestas válidas, **6 repitieron el nivel** en todas las evaluaciones. La regla usada para justificarlo fue igual en **3 de esas 7 páginas**. En **108/120** respuestas el modelo indicó que faltaba parte de la evidencia. La revisión automática encontró **0 diferencias** frente a las reglas registradas. Si aparece una diferencia, queda guardada sin corregir el puntaje.

En G2 revisamos si el nivel corresponde a los juicios del modelo. Para los niveles 0 a 3 la rúbrica permite distintas reglas de justificación. Para el nivel 4 debe reportarse Ap (apoyos de decisión). Por eso mostramos las diferencias de regla sin tratarlas automáticamente como errores.

Hubo respuestas con y sin puntaje en estas páginas: C10, R02. El nivel cambió entre las cinco evaluaciones de: C16.

<details>
<summary>Resultados por página</summary>

| Página | Válidas | Abstenciones | Respuestas | Nivel más repetido | Parte con el mismo nivel | Diferencia de niveles | Reglas distintas |
|---|---:|---:|---|---|---:|---:|---:|
| C02 | 5 | 0 | 3, 3, 3, 3, 3 | 3 | 1.00 | 0 | 2 |
| C03 | 5 | 0 | 3, 3, 3, 3, 3 | 3 | 1.00 | 0 | 2 |
| C04 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C06 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C07 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C09 | 5 | 0 | 2, 2, 2, 2, 2 | 2 | 1.00 | 0 | 2 |
| C10 | 4 | 1 | 0, 0, Sin puntaje, 0, 0 | 0 | 1.00 | 0 | 1 |
| C11 | 5 | 0 | 2, 2, 2, 2, 2 | 2 | 1.00 | 0 | 1 |
| C12 | 5 | 0 | 2, 2, 2, 2, 2 | 2 | 1.00 | 0 | 1 |
| C13 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C14 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C15 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C16 | 5 | 0 | 2, 0, 0, 2, 2 | 2 | 0.60 | 2 | 1 |
| C17 | 5 | 0 | 2, 2, 2, 2, 2 | 2 | 1.00 | 0 | 2 |
| C18 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C20 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C21 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C22 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C23 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C24 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| C25 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| R02 | 2 | 3 | 2, Sin puntaje, 2, Sin puntaje, Sin puntaje | 2 | 1.00 | 0 | 1 |
| R03 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |
| R07 | 0 | 5 | Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje, Sin puntaje | — | — | — | 0 |

</details>

No calculamos un promedio de niveles. Para decir que una página repite el nivel, revisamos solo las que tuvieron cinco respuestas válidas, incluidos los NA que se repiten. Las abstenciones y los empates se muestran aparte. En la columna «Parte con el mismo nivel» contamos solo las respuestas válidas; no entran las abstenciones. Las respuestas inválidas quedan fuera de la tabla principal, pero sus puntajes recibidos siguen guardados en `niveles_incluidos_invalidos` del resumen.

## Lo que falta revisar

En G2 el puntaje depende de la cantidad de grupos, de cómo están organizados y de qué tan clara sea la acción principal. Todavía hay combinaciones para las que la rúbrica no define un nivel. Los apoyos de decisión se revisan en la captura real y se registra esa revisión incluso si no se encuentra ninguno. Por eso G2 combina el wireframe con esa parte de la captura real.

El modelo no identificó apoyos de decisión en estas 120 respuestas. Para probar el nivel 4 todavía faltan casos con apoyos que ayuden a reducir la carga de decisión.

Las capturas de septiembre no guardan todos los estados de los controles. Algunas relaciones entre ellos y algunas cajas recortadas no son claras. Esas limitaciones se conservaron junto con las medidas originales. Todavía no hemos comprobado que los juicios del modelo coincidan con los de expertos.

Para seguir con G2 falta aclarar con Camilo las combinaciones sin nivel, acordar los casos dorados y comparar los resultados con las calificaciones de expertos. El estado del comité de ética se revisa aparte.

<details>
<summary>Cómo se hizo el piloto</summary>

| Dato | Valor |
|---|---|
| Modelo solicitado | gpt-6.1-sol |
| Herramienta | codex-cli 0.162.0-alpha.17.2 |
| Razonamiento | low |
| Medición | 1.0.6 |
| Código usado (commit) | `70b7b2b3a0f428cda4ebc85571f404b89caa9daf` |

Cada evaluación se hizo en una conversación nueva, sin herramientas ni resultados de otras evaluaciones de esta serie. Tampoco recibió las instrucciones del proyecto. Guardamos las imágenes, las reglas, las instrucciones, los datos, las respuestas y los registros de ejecución. La herramienta usada no expone temperatura ni top-p. Los datos de cada corrida se añaden a una copia de la respuesta; la original queda igual.

</details>

[Datos por evaluación](evaluaciones.csv), [resumen por página](resumen.csv), [revisión de las reglas](auditoria.json), [configuración](manifiesto.json) y [plan registrado](../../docs/PILOTO-G2-G7-18OCT.md).
