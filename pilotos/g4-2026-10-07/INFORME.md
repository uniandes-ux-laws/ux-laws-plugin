# Resultado del piloto real de G4

Ejecución parcial. **34/120 solicitudes terminadas**, sobre 24 capturas × cinco contextos independientes. Hay 1 salidas puntuables/NA, 33 abstenciones, 0 respuestas inválidas, 0 errores técnicos y 86 pendientes. Una ejecución terminada no equivale a una rúbrica validada.

## Configuración y procedencia

Modelo solicitado **gpt-6.1-sol**, codex-cli 0.160.0, razonamiento **medium**; medición **1.0.6**, protocolo 0.1.0 y desviación fechada del 7 de octubre. Código registrado: `29c3dd41e953f86dbd56fa2ef34841076e0e9c41`. Temperatura y top-p no están expuestos. Se suministra solo screenshot, cifras y geometría; no wireframe, juicios humanos ni resultados previos. G4 no tiene comparación entre canales. Cada repetición tiene contexto nuevo y prompt idéntico por página; la infraestructura añade únicamente run.

## Distribución ordinal

Denominador: **1 puntajes aplicables**. Los 0 NA, 33 abstenciones y 0 inválidos se cuentan aparte. Las modas por página exigen cinco salidas válidas y una moda única; no se fuerza desempate.

| Nivel | Evaluaciones | % de aplicables | Páginas con moda única |
|---|---:|---:|---:|
| 0 | 0 | 0.0 | 0 |
| 1 | 0 | 0.0 | 0 |
| 2 | 0 | 0.0 | 0 |
| 3 | 0 | 0.0 | 0 |
| 4 | 1 | 100.0 | 0 |

Se observaron 1 de los cinco niveles; modas NA: 0. No se mueven umbrales para repartir la escala.

## Estabilidad y abstenciones

**0/0** páginas con cinco salidas válidas mantuvieron su nivel; el total del conjunto es 24. Esta estabilidad no es acuerdo interexperto. Evidencia insuficiente: **34/34** salidas conformes, incluidas abstenciones.

| Página | Válidas | Abstenciones | Cinco salidas conformes | Moda(s) válidas | Fracción modal | Rango ordinal | Principales distintos |
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

Las abstenciones se conservan con score y trigger nulos, not_applicable=false. No se convierten en NA ni en cero, no entran en el histograma y no se repiten para obtener un nivel.

| Combinación sin ancla | Abstenciones |
|---|---:|
| I=0, Bn=0, P=null, Cn=0, jerarquia=null | 24 |
| I=1, Bn=0, P=null, Cn=0, jerarquia=null | 5 |
| I=2, Bn=0, P=null, Cn=0, jerarquia=true | 4 |

## Auditoría y alcance

La medición 1.0.6 corrige la omisión de pares de dos, los recortes de conjuntos/miembros/candidatos, la mediana par y la posición de franja. Conserva las capturas selladas y los otros seis grupos. Los conjuntos por etiqueta y padre retenido son candidatos: no certifican equivalencia visual. El proxy RGB no es contraste WCAG ni legibilidad; cajas parciales y raíces virtuales se declaran como límites. Los ids permiten verificar pertenencia y evitar doble conteo por anidamiento.

Contradicciones numéricas de ancla detectadas en salidas puntuables: 0. Este control no valida los juicios visuales. La cobertura incompleta de las anclas se declaró **antes** de puntuar: I=0 sin Bn; I=2 con jerarquía; I=1/P verdadero con Cn positivo. Si aparecen, se reportan sin inventar reglas.

**G4 no queda cerrado metodológicamente**: faltan consenso de casos dorados, referencia experta y resolución prospectiva de combinaciones sin ancla. Una revisión de niveles debe discutirse y registrarse antes de otra fase, sin modificar estas respuestas ni el protocolo histórico. No se afirma aprobación ética ni se fabrican juicios humanos.

[Datos por evaluación](evaluaciones.csv), [resumen por página](resumen.csv), [auditoría](auditoria.json), [manifiesto](manifiesto.json) y [registro previo](../../docs/PILOTO-G4-07OCT.md). Filtrar estado=valido para analizar niveles; ABSTENCION identifica abstención explícita. Los ids de sesión, respuestas originales, trazas y hashes se conservan.
