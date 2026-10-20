# G4: fase dirigida con reglas propuestas

20 de octubre de 2026. **En curso: 1/85 posiciones conservadas; 84 pendientes.**

Juan autorizó proponer los criterios porque todavía no hay acuerdo con Camilo. Se registraron antes de evaluar. Son propuestas operativas del equipo, pendientes de contraste con el asesor y los expertos. Una respuesta válida cumple formato y reglas comprobadas; no garantiza que toda su interpretación visual sea correcta.

## Qué cambió

Nivel 1 si no hay aislados ni Bn; nivel 2 para dos aislados con o sin jerarquía y para foco pertinente con Cn positivo. Se pide justificar la sección elegida y se fija un trigger por condición. La entrada G4 1.0.7 corrige falsas marcas de parcialidad numéricas de la fuente 1.0.6 y retira clases de candidatos a banner. Los recortes reales y las cajas incoherentes siguen requiriendo declarar el límite.

El modelo es gpt-6.1-sol, CLI 0.162.0-alpha.17.2, esfuerzo low, screenshot como único canal y conversación nueva por posición, sin herramientas ni expectativas. Frente a la fase anterior cambian varias piezas; no atribuimos las diferencias a una sola. [Registro previo](REGISTRO-PREVIO.md), [decisiones](DECISIONES.md) y [expectativas sintéticas](EXPECTATIVAS-PREVIAS.json) quedan conservados.

## Resultados por separado

| Estrato | Planeadas | Válidas | Abstenciones | Inválidas | Fallos técnicos | Pendientes |
|---|---:|---:|---:|---:|---:|---:|
| real | 45 | 0 | 0 | 0 | 0 | 45 |
| sintetico | 40 | 1 | 0 | 0 | 0 | 39 |

En los sintéticos hay **1/40 coincidencias de nivel**. La fase está incompleta; no se interpreta como un resultado final. Se comparan con expectativas nuestras, no con juicios expertos. Hay 0 respuestas con diferencias en los campos previstos; coincidir en nivel no asegura coincidir en todos. Las páginas reales no tienen un nivel correcto asignado por nosotros.

| Página | Cinco salidas | Coincidencias de nivel | Conjuntos distintos | Advertencias de evidencia |
|---|---|---|---:|---:|
| S01 | 1 / pendiente / pendiente / pendiente / pendiente | 1/5 | 1 | 0 |
| S02 | pendiente / pendiente / pendiente / pendiente / pendiente | 0/5 | 0 | 0 |
| S03 | pendiente / pendiente / pendiente / pendiente / pendiente | 0/5 | 0 | 0 |
| S04 | pendiente / pendiente / pendiente / pendiente / pendiente | 0/5 | 0 | 0 |
| S05 | pendiente / pendiente / pendiente / pendiente / pendiente | 0/5 | 0 | 0 |
| S06 | pendiente / pendiente / pendiente / pendiente / pendiente | 0/5 | 0 | 0 |
| S07 | pendiente / pendiente / pendiente / pendiente / pendiente | 0/5 | 0 | 0 |
| S08 | pendiente / pendiente / pendiente / pendiente / pendiente | 0/5 | 0 | 0 |
| C06 | pendiente / pendiente / pendiente / pendiente / pendiente | Sin referencia | 0 | 0 |
| C07 | pendiente / pendiente / pendiente / pendiente / pendiente | Sin referencia | 0 | 0 |
| C09 | pendiente / pendiente / pendiente / pendiente / pendiente | Sin referencia | 0 | 0 |
| C13 | pendiente / pendiente / pendiente / pendiente / pendiente | Sin referencia | 0 | 0 |
| C17 | pendiente / pendiente / pendiente / pendiente / pendiente | Sin referencia | 0 | 0 |
| C20 | pendiente / pendiente / pendiente / pendiente / pendiente | Sin referencia | 0 | 0 |
| C25 | pendiente / pendiente / pendiente / pendiente / pendiente | Sin referencia | 0 | 0 |
| R02 | pendiente / pendiente / pendiente / pendiente / pendiente | Sin referencia | 0 | 0 |
| R03 | pendiente / pendiente / pendiente / pendiente / pendiente | Sin referencia | 0 | 0 |

NA significa no aplicable; una abstención conserva incertidumbre y no es cero. Los niveles no se promedian. Modas, empates, rangos, cambios de selección, triggers y cada repetición aparecen en [resumen.json](resumen.json). Solo se declara nivel estable cuando hay cinco puntajes. La consistencia del trigger forma parte del contrato.

## Qué sigue pendiente

La [revisión de conjuntos](../../docs/REVISION-G4-20OCT.md) explica errores de cajas, recortes, oclusión y alcance de sección. Una marca de recorte corregida no elimina esos otros límites. La galería revisa evidencia archivada, no fija una referencia experta. Las explicaciones se revisan aparte y no se corrigen sus originales.

Falta completar las posiciones pendientes. Las reglas propuestas todavía requieren contraste con Camilo. La validación experta, ética y consenso siguen pendientes. No se mezclan estos resultados con las 120 respuestas anteriores ni se declara validado G4.

## Archivos

- [evaluaciones.csv](evaluaciones.csv): todas las posiciones planificadas, con su estado.
- [resumen.json](resumen.json): resultados separados por reales y sintéticos.
- respuestas/: originales; resultados/: copias con atribución, sin cambios en los juicios.
- trazas/: eventos, sesiones, comandos, hashes, consumo y errores.
- VERIFICACION.json y SELLO-SHA256.tsv: comprobación y sello al terminar.
