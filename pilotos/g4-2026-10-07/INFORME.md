# Resultado del piloto de G4

G4 revisa qué elementos destacan visualmente en una página. Esta fase quedó incompleta: **34/120 respuestas recibidas**, sobre 24 capturas con cinco evaluaciones independientes por página.

Hay **1 puntajes y 33 abstenciones**. Una abstención significa que las reglas o la evidencia no permitieron asignar un nivel. También hay 0 «no aplica» (NA), 0 respuestas inválidas, 0 errores técnicos actuales y 86 solicitudes pendientes. Se conserva 0 intento técnico anterior; esta fase suma 34 intentos. La comparación con expertos sigue pendiente.

## Puntajes obtenidos

Los porcentajes usan los **1 puntajes**. Las abstenciones, los NA y las respuestas inválidas se cuentan aparte. Para resumir una página se exige que tenga cinco respuestas válidas; se registra el nivel más frecuente y se conservan los empates.

| Nivel | Evaluaciones | % de puntajes | Páginas con ese nivel más frecuente, sin empate |
|---|---:|---:|---:|
| 0 | 0 | 0.0 | 0 |
| 1 | 0 | 0.0 | 0 |
| 2 | 0 | 0.0 | 0 |
| 3 | 0 | 0.0 | 0 |
| 4 | 1 | 100.0 | 0 |

Aparecieron **1 de los cinco niveles**. Hay 0 páginas cuyo resultado más frecuente es NA. Se mantuvieron los límites de puntuación registrados.

## Cambios entre repeticiones

Todavía no hay páginas con cinco respuestas válidas, por lo que no se puede evaluar la estabilidad del nivel. El conjunto completo tiene 24 páginas.

En **1 páginas** se alternó entre puntaje y abstención (C07). En **0** cambió el conjunto principal elegido (ninguna). Hay **34/34** respuestas con evidencia insuficiente, incluidas las abstenciones. Esta marca puede aparecer también en una respuesta que sí tiene puntaje.

La tabla conserva las respuestas recibidas de cada página. «Nivel más frecuente» y «proporción que lo repite» usan solo respuestas válidas. La diferencia de niveles es el mayor menos el menor; los niveles no se promedian. Una página que alterna puntajes y abstenciones no se considera estable.

<details>
<summary>Ver resultados por página</summary>

| Página | Válidas | Abstenciones | Respuestas recibidas | Nivel(es) más frecuente(s) | Proporción que lo repite | Diferencia de niveles | Conjuntos principales distintos |
|---|---:|---:|---|---|---:|---:|---:|
| C02 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C03 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C04 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C06 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C07 | 1 | 4 | 4, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | 4 | 1.00 | 0 | 1 |
| C09 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C10 | 0 | 4 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
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

## Por qué hubo abstenciones

Se guardaron las abstenciones con su explicación. No se convierten en ceros ni en NA, y no se repiten para obtener otro resultado.

| Motivo | Abstenciones |
|---|---:|
| La rúbrica no asigna nivel cuando no hay aislados ni contenido funcional tratado como publicidad (I=0, Bn=0) | 24 |
| No se pudo determinar si el elemento destacado corresponde a lo que la sección promueve (P) | 5 |
| La rúbrica no asigna nivel a dos aislados con jerarquía entre ellos | 4 |

En los datos originales quedan identificadas como `ABSTENCION`, con puntaje y regla vacíos, `not_applicable=false` y `evidence_insufficient=true`.

## Qué se comprobó y qué falta

La medición 1.0.6 incluye grupos de dos elementos y todos los candidatos, corrige la mediana y comprueba la posición de las franjas. Las capturas originales y las medidas de los otros seis grupos se conservan. Los candidatos que propone el código todavía necesitan revisión visual: compartir etiqueta y contenedor no basta para que dos elementos sean equivalentes.

La diferencia de color RGB respecto al fondo es orientativa; no mide contraste WCAG ni legibilidad. También hay elementos parcialmente fuera de pantalla y relaciones de pertenencia que la captura no permite confirmar. Los identificadores permiten revisar cada hallazgo y evitar contarlo dos veces.

En las 34 respuestas hubo 0 casos de contenido funcional tratado como publicidad (Bn), 0 de contenido importante presentado como auxiliar (Cn), 0 con tres o más elementos aislados en el conjunto principal y 1 con un elemento destacado por más de una característica visual. Las situaciones sin casos positivos quedan pendientes de probar.

El control automático encontró **0 contradicciones numéricas** entre los puntajes y las reglas. La interpretación visual aún requiere revisión. Antes de evaluar ya se habían identificado tres situaciones sin regla de puntuación: ningún elemento destacado ni contenido funcional tratado como publicidad; dos elementos destacados con jerarquía; y un único destacado que corresponde a lo que la sección promueve, junto con contenido importante presentado como auxiliar.

**Para cerrar G4 falta acordar las reglas incompletas con Camilo, revisar los casos dudosos y comparar con los casos dorados consensuados y los expertos.** Los cambios de reglas deben registrarse antes de una nueva fase, conservando los resultados de esta.

<details>
<summary>Configuración y registro de la ejecución</summary>

| Dato | Valor |
|---|---|
| Modelo solicitado | gpt-6.1-sol |
| Herramienta | codex-cli 0.160.0 |
| Esfuerzo de razonamiento | medium |
| Medición | 1.0.6 |
| Protocolo | 0.1.0, con el cambio registrado el 7 de octubre |
| Commit del ejecutor | `29c3dd41e953f86dbd56fa2ef34841076e0e9c41` |

Cada evaluación recibió la captura original, las medidas y la geometría. Usó una conversación nueva y las mismas instrucciones por página. La herramienta no expone temperatura ni top-p. Se usaron las instrucciones base incorporadas en la herramienta. El sistema añadió únicamente la identificación de la corrida (`run`) a una copia de la respuesta. La configuración y los hashes están en el manifiesto.

Esta es la fase inicial incompleta. Su registro y respuestas se conservan separados de la ejecución final.

</details>

[Datos por evaluación](evaluaciones.csv), [resumen por página](resumen.csv), [revisión de datos](auditoria.json), [configuración](manifiesto.json) y [plan e historial](../../docs/PILOTO-G4-07OCT.md). Para analizar puntajes, filtrar `estado=valido`. Las sesiones, respuestas originales y registros de ejecución se conservan.
