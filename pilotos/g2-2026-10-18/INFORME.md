# Piloto de G2 · 18 de octubre de 2026

G2 revisa la organización de las opciones y la claridad de la acción principal. El piloto sigue incompleto. Se recibieron **24/120 respuestas** sobre 24 páginas, con cinco evaluaciones independientes por página.

Hay **10 respuestas válidas, 14 abstenciones, 0 inválidas, 0 errores técnicos y 96 pendientes**. Las respuestas válidas incluyen 0 «no aplica» (NA). Las abstenciones conservan la explicación de por qué no pudo asignarse un nivel.

## Resultados

Los porcentajes usan los 10 puntajes aplicables. Los NA y las abstenciones se cuentan aparte.

| Nivel | Evaluaciones | Porcentaje |
|---|---:|---:|
| 0 | 0 | 0.0 % |
| 1 | 0 | 0.0 % |
| 2 | 0 | 0.0 % |
| 3 | 10 | 100.0 % |
| 4 | 0 | 0.0 % |

Las abstenciones se agrupan por los juicios recibidos. Los motivos completos están en los datos por evaluación. «Acción clara» indica una acción primaria distinguible; «no_domina», una acción existente sin dominar.

| Combinación | Abstenciones |
|---|---:|
| n1=8; agrupación=coherente; acción=no_domina; exige decisión=false; competencia=true | 5 |
| n1=13; agrupación=parcial; acción=no_domina; exige decisión=false; competencia=true | 5 |
| n1=20; agrupación=parcial; acción=no_domina; exige decisión=false; competencia=true | 4 |

**2/2 páginas** con cinco respuestas válidas mantuvieron el nivel. La regla usada para justificarlo se mantuvo en 0. Hay **19/24** respuestas con evidencia insuficiente y **0** discrepancias entre el nivel o su regla y las anclas registradas. Estas discrepancias quedan en la auditoría y en las estadísticas; los puntajes no se corrigen.

<details>
<summary>Resultados por página</summary>

| Página | Válidas | Abstenciones | Respuestas | Nivel(es) más frecuente(s) | Proporción que lo repite | Diferencia de niveles | Reglas distintas |
|---|---:|---:|---|---|---:|---:|---:|
| C02 | 5 | 0 | 3, 3, 3, 3, 3 | 3 | 1.00 | 0 | 2 |
| C03 | 5 | 0 | 3, 3, 3, 3, 3 | 3 | 1.00 | 0 | 2 |
| C04 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 0 |
| C06 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 0 |
| C07 | 0 | 4 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 0 |
| C09 | 0 | 0 | — | — | — | — | 0 |
| C10 | 0 | 0 | — | — | — | — | 0 |
| C11 | 0 | 0 | — | — | — | — | 0 |
| C12 | 0 | 0 | — | — | — | — | 0 |
| C13 | 0 | 0 | — | — | — | — | 0 |
| C14 | 0 | 0 | — | — | — | — | 0 |
| C15 | 0 | 0 | — | — | — | — | 0 |
| C16 | 0 | 0 | — | — | — | — | 0 |
| C17 | 0 | 0 | — | — | — | — | 0 |
| C18 | 0 | 0 | — | — | — | — | 0 |
| C20 | 0 | 0 | — | — | — | — | 0 |
| C21 | 0 | 0 | — | — | — | — | 0 |
| C22 | 0 | 0 | — | — | — | — | 0 |
| C23 | 0 | 0 | — | — | — | — | 0 |
| C24 | 0 | 0 | — | — | — | — | 0 |
| C25 | 0 | 0 | — | — | — | — | 0 |
| R02 | 0 | 0 | — | — | — | — | 0 |
| R03 | 0 | 0 | — | — | — | — | 0 |
| R07 | 0 | 0 | — | — | — | — | 0 |

</details>

Los niveles no se promedian. La estabilidad del nivel se calcula solo para páginas con cinco respuestas válidas, incluyendo NA estables; las abstenciones y los empates se conservan por separado. Los resultados inválidos se excluyen del histograma principal, pero sus puntajes recibidos también se cuentan en `niveles_incluidos_invalidos` del resumen.

## Límites y pendientes

La rúbrica combina intervalos de cantidad con juicios de agrupación y dominancia. Algunas combinaciones no tienen nivel definido: esas respuestas pueden abstenerse. Los apoyos de decisión se revisan sobre el screenshot, y se registra esa lectura incluso al concluir que no hay apoyos. El resultado no representa una evaluación exclusivamente sobre wireframe.

Las capturas de septiembre no registran todos los estados de los controles. Las relaciones ambiguas del inventario y las cajas parciales limitan la interpretación; se mantienen las medidas originales. El piloto no valida que los juicios visuales coincidan con expertos.

Para cerrar G2 falta revisar discrepancias, completar los casos dorados consensuados y contrastar con expertos. Los niveles de referencia y la aprobación ética no se suponen.

<details>
<summary>Configuración y registro</summary>

| Dato | Valor |
|---|---|
| Modelo solicitado | gpt-6.1-sol |
| Herramienta | codex-cli 0.162.0-alpha.17.2 |
| Razonamiento | low |
| Medición | 1.0.6 |
| Commit del ejecutor | `70b7b2b3a0f428cda4ebc85571f404b89caa9daf` |

Cada solicitud usó una conversación nueva, sin herramientas, resultados previos ni instrucciones del proyecto. Se conservaron imágenes, rúbrica, escala, instrucciones, entradas, respuestas y registros de ejecución. La herramienta no expone temperatura ni top-p. El sistema añade únicamente la identificación de la corrida a una copia de la respuesta.

</details>

[Datos por evaluación](evaluaciones.csv), [resumen por página](resumen.csv), [revisión de anclas](auditoria.json), [configuración](manifiesto.json) y [plan registrado](../../docs/PILOTO-G2-G7-18OCT.md).
