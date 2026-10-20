# G4: fase dirigida con reglas propuestas

20 de octubre de 2026. **Ejecución terminada: 85/85 evaluaciones; 0 pendientes.**

Juan autorizó proponer los criterios porque todavía no hay acuerdo con Camilo. Los registramos antes de evaluar y siguen pendientes de revisión con el asesor y los expertos. Una respuesta válida cumple el formato y las reglas comprobables; eso no garantiza que toda su lectura visual sea correcta.

## Qué probamos

Separamos nueve páginas reales dudosas y ocho ejemplos nuevos, con cinco repeticiones por pantalla. Los ejemplos tienen expectativas de diseño nuestras; las páginas reales no tienen un puntaje correcto asignado. El modelo no recibió expectativas ni resultados anteriores.

Las propuestas completan tres casos: nivel 1 sin aislados ni banner funcional; nivel 2 para dos aislados, tengan o no jerarquía; y nivel 2 para foco pertinente con contenido importante presentado como auxiliar. También se pide justificar el conjunto principal y usar una regla concreta para explicar el nivel.

Se mantuvieron gpt-6.1-sol, esfuerzo low y CLI 0.162.0-alpha.17.2, con una conversación nueva por respuesta y solo screenshot como canal. La entrada G4 1.0.7 corrige falsas marcas numéricas de recorte de la fuente 1.0.6 y retira clases CSS de candidatos a banner. No corrige las cajas de la captura. Se conservaron [registro previo](REGISTRO-PREVIO.md), [decisiones](DECISIONES.md) y [expectativas](EXPECTATIVAS-PREVIAS.json).

## Resultados separados

| Tipo | Planeadas | Puntajes o NA válidos | Abstenciones | Inválidas | Fallos técnicos | Pendientes |
|---|---:|---:|---:|---:|---:|---:|
| real | 45 | 12 | 33 | 0 | 0 | 0 |
| sintetico | 40 | 40 | 0 | 0 | 0 | 0 |

En los ejemplos hubo **35/40 coincidencias de nivel**. Hubo 5 respuestas con diferencias en los campos previstos. Comparar con nuestro diseño no equivale a comparar con expertos. No hubo NA; las 85 respuestas quedaron conservadas sin repetirse ni corregirse.

| Pantalla | Cinco respuestas | Coincidencias de nivel | Conjuntos elegidos distintos | Sin elegir principal | Evidencia insuficiente |
|---|---|---|---:|---:|---:|
| S01 | 1 / 1 / 1 / 1 / 1 | 5/5 | 1 | 0 | 0 |
| S02 | 2 / 2 / 2 / 2 / 2 | 5/5 | 1 | 0 | 0 |
| S03 | 2 / 2 / 2 / 2 / 2 | 5/5 | 1 | 0 | 0 |
| S04 | 1 / 1 / 1 / 1 / 1 | 5/5 | 1 | 0 | 0 |
| S05 | 0 / 0 / 0 / 0 / 0 | 5/5 | 1 | 0 | 0 |
| S06 | 2 / 2 / 2 / 2 / 2 | 5/5 | 1 | 0 | 0 |
| S07 | 4 / 4 / 4 / 4 / 4 | 0/5 | 1 | 0 | 0 |
| S08 | 4 / 4 / 4 / 4 / 4 | 5/5 | 1 | 0 | 0 |
| C06 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | Sin referencia | 1 | 0 | 5 |
| C07 | 2 / 4 / 4 / 2 / 2 | Sin referencia | 1 | 0 | 5 |
| C09 | ABSTENCIÓN / 1 / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | Sin referencia | 1 | 4 | 5 |
| C13 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | Sin referencia | 0 | 5 | 5 |
| C17 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | Sin referencia | 0 | 5 | 5 |
| C20 | ABSTENCIÓN / ABSTENCIÓN / 1 / ABSTENCIÓN / ABSTENCIÓN | Sin referencia | 1 | 4 | 5 |
| C25 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | Sin referencia | 0 | 5 | 5 |
| R02 | 1 / 1 / 1 / 1 / 1 | Sin referencia | 2 | 0 | 2 |
| R03 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | Sin referencia | 1 | 0 | 5 |

Una abstención no es cero ni «no aplica». La falta de selección se cuenta aparte, sin inventar otro conjunto para el valor vacío. Los niveles no se promedian. [resumen.json](resumen.json) conserva modas, empates, rangos, reglas y cada repetición.

## Variación y comparación con la fase anterior

De las páginas reales, 2 tienen cinco puntajes: C07 y R02. 1 mantuvo el nivel. La tabla permite distinguir repetir un puntaje de repetir la selección y de abstenerse siempre; no se declara estabilidad de nivel a partir de una sola respuesta numérica.

En estas mismas nueve páginas, la fase anterior tenía 16 puntajes y 29 abstenciones. La nueva tiene 12 puntajes y 33 abstenciones. Comparando las posiciones por página y repetición, 26/45 cambiaron de nivel o de estado y 25/45 cambiaron de selección o pasaron a no elegir conjunto. Cada respuesta viene de una conversación nueva; esta comparación no permite atribuir el cambio a una sola modificación.

Frente a la fase anterior cambiaron reglas, selección, metadatos y CLI. No atribuimos toda la diferencia a las reglas nuevas ni presentamos más o menos abstenciones como una mejora demostrada. Sus 120 respuestas siguen separadas.

## Revisión posterior y límites

La [revisión de esta fase](../../docs/REVISION-G4-FASE2-20OCT.md) explica el desacuerdo del ejemplo S07, las afirmaciones sobre peso tipográfico y las dudas de selección en las páginas reales. Se hizo después de las respuestas; no se convierte en criterio previo ni modifica los originales. La [revisión inicial de conjuntos](../../docs/REVISION-G4-20OCT.md) conserva las observaciones de cajas, recortes y superposiciones.

La ejecución terminó. **G4 sigue pendiente de revisión con Camilo, validación experta y consenso.** El panel humano depende de la aprobación ética. No se fija un umbral nuevo para declarar aprobado el grupo.

## Archivos conservados

- [evaluaciones.csv](evaluaciones.csv): las 85 posiciones y los campos que sostienen sus niveles.
- [resumen.json](resumen.json): resultados y comparación por repetición.
- respuestas/: originales; resultados/: copias con atribución, sin cambiar juicios.
- trazas/: eventos, conversaciones, comandos, consumo y comprobaciones.
- [VERIFICACION.json](VERIFICACION.json) y [SELLO-SHA256.tsv](SELLO-SHA256.tsv): comprobación de originales y sello de integridad.
