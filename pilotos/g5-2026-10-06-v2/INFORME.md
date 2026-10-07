# Resultado del piloto real de G5

Ejecución parcial: no declarar cerrado. **41 evaluaciones válidas de 120 previstas**, sobre 24 capturas de calibración con cinco solicitudes independientes por página. Hay 4 respuestas inválidas, 2 errores técnicos y 73 solicitudes pendientes. Las respuestas originales, incluidas las inválidas, se conservan. Este resultado mide distribución y estabilidad del evaluador; no prueba validez frente a expertos.

## Configuración y procedencia

- Modelo solicitado: `gpt-6.1-sol`; runtime `codex-cli 0.160.0`; razonamiento `xhigh`. El runtime no expone temperatura ni top-p. No se afirma conocer una versión interna del servidor más precisa que este identificador.
- Capa de medición: **1.0.4**; protocolo 0.1.0 con desviaciones fechadas del 6 de octubre; código registrado en `ef2446297d330ce5e7bb3001442b01560c11133d`.
- Cada página tiene un prompt idéntico entre sus repeticiones, contextos nuevos y sin herramientas. Los hashes de prompts, rúbrica, esquema, entradas e imágenes están en [manifiesto.json](manifiesto.json).
- Se usan wireframe para jerarquía y screenshot para criterios textuales. **41/41** evaluaciones válidas declaran consulta del segundo canal. No atribuir estos puntajes a una condición exclusivamente sobre wireframe.
- Se conservan las imágenes de septiembre, incluida su convención histórica de imágenes sin X; se evalúa el corpus sellado, sin recapturarlo.

## Distribución ordinal

Denominador por evaluación: **41 resultados válidos aplicables**; 0 no aplicables se cuentan aparte. Denominador por página: **8 páginas con cinco salidas válidas, moda única y aplicable**; 0 tienen moda NA y 0 tienen empate. No se fuerza un desempate ni se promedian niveles.

| Nivel | Evaluaciones | Porcentaje de aplicables | Páginas con moda única |
|---|---:|---:|---:|
| 0 | 20 | 48.8 % | 4 |
| 1 | 5 | 12.2 % | 1 |
| 2 | 11 | 26.8 % | 2 |
| 3 | 5 | 12.2 % | 1 |
| 4 | 0 | 0.0 % | 0 |

Se observaron **4 de los cinco niveles**. Una concentración de puntajes no autoriza a mover umbrales para repartir la escala: puede corresponder a la rúbrica, al evaluador, al canal o al conjunto de páginas.

## Estabilidad entre repeticiones

- Páginas con cinco respuestas válidas: **8/24**.
- Nivel idéntico en las cinco repeticiones: **7/8** (87.5 %); esta cifra incluye una eventual NA estable.
- Trigger idéntico: **8/8**.
- Selección variable de lista principal: **1 páginas**: C04. Un nivel estable puede coexistir con un razonamiento o selección variable.
- Evidencia insuficiente: **25/41** (61.0 %). No equivale a una respuesta inválida ni confirma que el puntaje sea correcto.

| Página | Cinco niveles válidos | Moda(s) | Fracción modal | Rango ordinal | Triggers distintos | Evidencia insuficiente |
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

La unidad del rango es distancia entre niveles ordinales, sin interpretar que los saltos tienen igual magnitud psicológica. La repetición mide estabilidad de esta configuración; **no es acuerdo interexperto**. Los datos para tablas están en [resumen.csv](resumen.csv), y una fila por solicitud en [evaluaciones.csv](evaluaciones.csv). En este último, filtrar `estado=valido` para analizar puntajes; `NA` identifica no aplicabilidad y `null` conserva juicios nulos o abstenciones. Las filas pendientes no son resultados.

## Auditoría y cobertura

La auditoría de entradas encuentra **0 páginas** con texto/pseudoelementos como listas, **0** omisiones demostrables de menús centrados y **0** páginas con candidatos truncados. La fase previa tenía seis, cinco y una respectivamente. Esta comparación verifica defectos de definición, no corrección de puntajes. Las cajas originales se conservan y 13 páginas tienen extremos parcialmente fuera del viewport.

Las salidas válidas presentan **0 contradicciones detectadas por las reglas lógicas auditadas** y **0 omisiones de la marca de límite geométrico**. Son comprobaciones necesarias pero incompletas: cero contradicciones no demuestra que la interpretación visual sea correcta.

**Q verdadero: 0/41.** **La rama de progreso no fue ejercitada.** Estas páginas de entrada no permiten dar por validada la evaluación de checkout, registro o formularios por pasos.

## Alcance para cerrar G5

Falta completar la ejecución prevista, con trazabilidad y resultados preservados. **G5 no queda validado contra humanos ni cerrado metodológicamente por este piloto.** Quedan el consenso de casos dorados, la comparación con expertos y la cobertura de la rama de progreso. Los casos con evidencia insuficiente y selección variable deben revisarse con el equipo; no se inventan niveles de referencia.

Si se amplía el conjunto para procesos, debe registrarse como un conjunto auxiliar separado y aprobarse su criterio de selección antes de capturar y puntuar. No sustituir páginas por su resultado ni alterar el corpus primario. La aprobación ética y el consentimiento siguen siendo condiciones del panel humano.

La fase inicial interrumpida permanece en `../g5-2026-10-06/`: 23 respuestas terminadas, 18 válidas y cinco abstenciones inválidas de C03; no se combina con esta fase. La fase 2 incompleta se conserva en `../g5-2026-10-06-v2/`: 47 intentos, 41 válidos, cuatro inválidos y dos errores por límite de uso. La fase final corrige la identidad de raíces virtuales y cambia el esfuerzo de xhigh a medium; los cambios de nivel no son atribuibles a uno solo de estos cambios. El historial de cambios y su registro previo están en [PILOTO-G5-06OCT.md](../../docs/PILOTO-G5-06OCT.md).
