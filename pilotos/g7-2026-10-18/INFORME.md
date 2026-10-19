# Piloto de G7 · 18 de octubre de 2026

En G7 revisamos el tamaño de los controles, su separación y si mantienen medidas consistentes. El piloto terminó. Recibimos **120/120 respuestas** de las 24 páginas de calibración. Cada página se evaluó cinco veces en conversaciones separadas.

El modelo asignó **120 puntajes** y dejó **0 respuestas sin puntaje (abstenciones)**. En las abstenciones explicó por qué no pudo asignar un nivel. No quedaron respuestas inválidas ni fallos técnicos pendientes.

## Resultados

Los porcentajes se calcularon sobre los 120 puntajes. Las abstenciones y los «no aplica» (NA) se cuentan aparte.

| Nivel | Evaluaciones | Porcentaje |
|---|---:|---:|
| 0 | 105 | 87.5 % |
| 1 | 10 | 8.3 % |
| 2 | 5 | 4.2 % |
| 3 | 0 | 0.0 % |
| 4 | 0 | 0.0 % |

De las 24 páginas con cinco respuestas válidas, **24 repitieron el nivel** en todas las evaluaciones. La regla usada para justificarlo fue igual en **24 de esas 24 páginas**. En **75/120** respuestas el modelo indicó que faltaba parte de la evidencia. La revisión automática encontró **0 diferencias** frente a las reglas registradas. Si aparece una diferencia, queda guardada sin corregir el puntaje.

En G7 la revisión automática comprueba el nivel y la condición que lo determina con las medidas entregadas.

<details>
<summary>Resultados por página</summary>

| Página | Válidas | Abstenciones | Respuestas | Nivel más repetido | Parte con el mismo nivel | Diferencia de niveles | Reglas distintas |
|---|---:|---:|---|---|---:|---:|---:|
| C02 | 5 | 0 | 1, 1, 1, 1, 1 | 1 | 1.00 | 0 | 1 |
| C03 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C04 | 5 | 0 | 2, 2, 2, 2, 2 | 2 | 1.00 | 0 | 1 |
| C06 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C07 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C09 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C10 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C11 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C12 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C13 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C14 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C15 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C16 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C17 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C18 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C20 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C21 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C22 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C23 | 5 | 0 | 1, 1, 1, 1, 1 | 1 | 1.00 | 0 | 1 |
| C24 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| C25 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| R02 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| R03 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |
| R07 | 5 | 0 | 0, 0, 0, 0, 0 | 0 | 1.00 | 0 | 1 |

</details>

No calculamos un promedio de niveles. Para decir que una página repite el nivel, revisamos solo las que tuvieron cinco respuestas válidas, incluidos los NA que se repiten. Las abstenciones y los empates se muestran aparte. En la columna «Parte con el mismo nivel» contamos solo las respuestas válidas; no entran las abstenciones. Las respuestas inválidas quedan fuera de la tabla principal, pero sus puntajes recibidos siguen guardados en `niveles_incluidos_invalidos` del resumen.

## Lo que falta revisar

G7 aplica sus reglas a medidas ya calculadas y no usa la captura real. Si el nivel o la regla cambian con los mismos datos, hay que revisar esa diferencia. Cuando faltan pares o familias de controles, los valores correspondientes quedan sin dato; eso no demuestra que no haya problemas.

No obtuvimos niveles 3 ni 4. Todavía tenemos que probar cómo responde el modelo en esos casos.

La rúbrica incluía cifras del piloto de septiembre. Esto pudo influir en las respuestas y ya estaba anotado antes de empezar. El modelo no recibió resultados de otras evaluaciones de esta serie.

Las capturas de septiembre no guardan todos los estados de los controles. Algunas relaciones entre ellos y algunas cajas recortadas no son claras. Esas limitaciones se conservaron junto con las medidas originales. Todavía no hemos comprobado que los juicios del modelo coincidan con los de expertos.

Para seguir con G7 falta revisar los resultados con Camilo, acordar los casos dorados y comparar lo que respondió el modelo con las calificaciones de expertos. El estado del comité de ética se revisa aparte.

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
