# Resultado del piloto real de G4

Ejecución terminada. **120/120 solicitudes terminadas**, sobre 24 capturas × cinco contextos independientes. Hay 56 salidas puntuables/NA, 64 abstenciones, 0 respuestas inválidas, 0 errores técnicos y 0 pendientes. Intentos técnicos históricos preservados: **1**; solicitudes totales de esta fase: **121**. Una ejecución terminada no equivale a una rúbrica validada.

## Configuración y procedencia

Modelo solicitado **gpt-6.1-sol**, codex-cli 0.160.0, razonamiento **low**; medición **1.0.6**, protocolo 0.1.0 y desviación fechada del 7 de octubre. Código registrado: `e4849cc205b1d04c8c643a58e511a4046da7dc5c`. Temperatura y top-p no están expuestos. Se suministra solo screenshot, cifras y geometría; no wireframe, juicios humanos ni resultados previos. G4 no tiene comparación entre canales. Formato e instrucciones base se conservan en el manifiesto; se usan instrucciones explícitas de evaluación, fijadas por hash. Cada repetición tiene contexto nuevo y prompt idéntico por página; la infraestructura añade únicamente run.

## Distribución ordinal

Denominador: **56 puntajes aplicables**. Los 0 NA, 64 abstenciones y 0 inválidos se cuentan aparte. Las páginas contadas por moda en esta tabla exigen cinco salidas válidas y una moda única; no se fuerza desempate.

| Nivel | Evaluaciones | % de aplicables | Páginas con moda única |
|---|---:|---:|---:|
| 0 | 0 | 0.0 | 0 |
| 1 | 0 | 0.0 | 0 |
| 2 | 5 | 8.9 | 0 |
| 3 | 32 | 57.1 | 5 |
| 4 | 19 | 33.9 | 4 |

Se observaron 3 de los cinco niveles; modas NA: 0. No se mueven umbrales para repartir la escala.

## Estabilidad y abstenciones

**8/9** páginas con cinco salidas válidas mantuvieron su nivel; el total del conjunto es 24. Esta estabilidad no es acuerdo interexperto. Páginas que alternan puntaje y abstención: **5** (C06, C07, C09, C17, R03); selección principal variable: **5** (C09, C17, C20, C25, R02). Evidencia insuficiente: **111/120** salidas conformes, incluidas abstenciones.

| Página | Válidas | Abstenciones | Cinco salidas conformes | Moda(s) de salidas válidas | Fracción modal | Rango ordinal | Principales distintos |
|---|---:|---:|---|---|---:|---:|---:|
| C02 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C03 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C04 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C06 | 4 | 1 | 2, 2, 2, 2, ABSTENCION | 2 | 1.00 | 0 | 1 |
| C07 | 1 | 4 | ABSTENCION, 4, ABSTENCION, ABSTENCION, ABSTENCION | 4 | 1.00 | 0 | 1 |
| C09 | 1 | 4 | 3, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | 3 | 1.00 | 0 | 2 |
| C10 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C11 | 5 | 0 | 4, 4, 4, 4, 4 | 4 | 1.00 | 0 | 1 |
| C12 | 5 | 0 | 4, 4, 4, 4, 4 | 4 | 1.00 | 0 | 1 |
| C13 | 5 | 0 | 3, 4, 3, 4, 4 | 4 | 0.60 | 1 | 1 |
| C14 | 5 | 0 | 4, 4, 4, 4, 4 | 4 | 1.00 | 0 | 1 |
| C15 | 5 | 0 | 3, 3, 3, 3, 3 | 3 | 1.00 | 0 | 1 |
| C16 | 5 | 0 | 3, 3, 3, 3, 3 | 3 | 1.00 | 0 | 1 |
| C17 | 4 | 1 | 3, ABSTENCION, 3, 3, 3 | 3 | 1.00 | 0 | 2 |
| C18 | 5 | 0 | 3, 3, 3, 3, 3 | 3 | 1.00 | 0 | 1 |
| C20 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 2 |
| C21 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C22 | 5 | 0 | 3, 3, 3, 3, 3 | 3 | 1.00 | 0 | 1 |
| C23 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C24 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 1 |
| C25 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 2 |
| R02 | 0 | 5 | ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | — | — | — | 2 |
| R03 | 1 | 4 | 2, ABSTENCION, ABSTENCION, ABSTENCION, ABSTENCION | 2 | 1.00 | 0 | 1 |
| R07 | 5 | 0 | 3, 3, 3, 3, 3 | 3 | 1.00 | 0 | 1 |

En la tabla por página, moda, fracción modal y rango usan solo salidas válidas; no incluyen abstenciones ni permiten llamar estable a una página que alterna puntaje y abstención. El rango numérico tampoco incluye NA.

Las abstenciones se conservan con score y trigger nulos, not_applicable=false. No se convierten en NA ni en cero, no entran en el histograma y no se repiten para obtener un nivel.

| Motivo de abstención: cobertura o evidencia | Abstenciones |
|---|---:|
| Cobertura: I=0, Bn=0, P=null, Cn=0, jerarquia=null | 55 |
| Evidencia: P indeterminado | 5 |
| Cobertura: I=2, Bn=0, P=null, Cn=0, jerarquia=true | 4 |

## Auditoría y alcance

La medición 1.0.6 corrige la omisión de pares de dos, los recortes de conjuntos/miembros/candidatos, la mediana par y la posición de franja. Conserva las capturas selladas y los otros seis grupos. Los conjuntos por etiqueta y padre retenido son candidatos: no certifican equivalencia visual. El proxy RGB no es contraste WCAG ni legibilidad; cajas parciales y raíces virtuales se declaran como límites. Los ids permiten verificar pertenencia y evitar doble conteo por anidamiento.

Cobertura de juicios en 120 salidas conformes: Bn positivo = 0; Cn positivo = 0; tres o más aislados principales = 0; aislamiento multicanal = 19. Una rama sin casos positivos no queda validada por este conjunto.

Contradicciones numéricas de ancla detectadas en salidas puntuables: 0. Este control no valida los juicios visuales. La cobertura incompleta de las anclas se declaró **antes** de puntuar: I=0 sin Bn; I=2 con jerarquía; I=1/P verdadero con Cn positivo. Si aparecen, se reportan sin inventar reglas.

**G4 no queda cerrado metodológicamente**: faltan consenso de casos dorados, referencia experta y resolución prospectiva de combinaciones sin ancla. Una revisión de niveles debe discutirse y registrarse antes de otra fase, sin modificar estas respuestas ni el protocolo histórico. No se afirma aprobación ética ni se fabrican juicios humanos.

La fase inicial incompleta permanece en `../g4-2026-10-07/` (34 respuestas: un puntaje y 33 abstenciones); `../g4-2026-10-07-v2/` conserva únicamente un registro sin solicitudes. No se combinan sus datos con esta configuración. La fase final también registra formato compacto, instrucciones base y esfuerzo low; los cambios entre fases no se atribuyen a un solo factor. El fallo de uso y la reanudación se conservan en `intentos/` y `REANUDACION-1.json`, si están presentes.

[Datos por evaluación](evaluaciones.csv), [resumen por página](resumen.csv), [auditoría](auditoria.json), [manifiesto](manifiesto.json) y [registro previo](../../docs/PILOTO-G4-07OCT.md). Filtrar estado=valido para analizar niveles; ABSTENCION identifica abstención explícita. Los ids de sesión, respuestas originales, trazas y hashes se conservan.
