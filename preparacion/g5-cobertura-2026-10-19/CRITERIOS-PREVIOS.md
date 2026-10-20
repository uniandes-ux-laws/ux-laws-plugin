# Nuevas comprobaciones para completar G5

19 de octubre de 2026. Registro previo a las nuevas solicitudes. Juan autorizó continuar
con lo pendiente y decidir el caso sin paso actual. La decisión y sus razones están en
[DECISIONES-G5-CIERRE-19OCT.md](DECISIONES-G5-CIERRE-19OCT.md).

## Dos series que no se mezclan

**Sin pistas: 45 posiciones.** Se reutilizan las mismas nueve pantallas y cinco
repeticiones de la prueba anterior. Se conserva su rúbrica, esquema, instrucciones,
modelo, imágenes y datos. La única diferencia en lo entregado al modelo es retirar la
propiedad class de los candidatos a indicador. No se cambian cantidades, ids, cajas,
estados de parcialidad ni expectativas. P06 sigue excluido de esta comparación y P10
sigue sin nivel esperado. La serie se guarda en pilotos/g5-sin-pistas-2026-10-19.
Así se puede observar si se mantienen los resultados sin esas clases; no se prueba
causalidad fuerte con nueve pantallas y un solo runtime.

**Cobertura del contrato nuevo: 25 posiciones.** Cinco casos, cinco repeticiones:

| Caso | Situación propuesta | Nivel esperado | trigger esperado |
|---|---|---:|---|
| E01 | P06: nombres de etapas, sin ubicación actual | 1 | G_actual |
| E02 | Progreso horizontal completo, inicio destacado, final como el cuerpo | 3 | G_forma |
| E03 | Mismo progreso horizontal, final destacado con menor peso que el inicio | 4 | J_final |
| E04 | Control vertical de nivel 3 | 3 | G_forma |
| E05 | Final vertical destacado, con menor peso que el inicio | 4 | J_final |

E01 reutiliza P06, que no recibió respuestas en la serie anterior. La expectativa 1
se fijó antes de evaluarlo, por la decisión autorizada por Juan; no se atribuye a Camilo.
E02/E03 y E04/E05 son pares nuevos: solo cambia el tamaño del último elemento. La
geometría debe llegar completa, alineada, sin solapamientos, con el inicio de mayor área,
el final de los positivos mayor que el cuerpo y menor que el inicio. Estas comprobaciones
describen el diseño, no fijan un umbral de la rúbrica ni sustituyen el juicio visual.

Los HTML nuevos usan clases neutras y tampoco se entregan sus clases al modelo. El
contrato G5 0.2.0 incluye el ancla 1 completa, un trigger único por condición y el juicio
final_compite_con_inicio para hacer explícito el requisito del 4. No se compara esa
serie como si fuera un cambio aislado de clases: también cambia el contrato y los casos.
Se guarda en pilotos/g5-cierre-2026-10-19.

## Ejecución y comparación

Ambas series usan gpt-6.1-sol, esfuerzo medium, CLI 0.162.0-alpha.17.2, medidas 1.0.6,
1440 × 900 y dos imágenes en el orden wireframe/screenshot. No se cambian captura,
medición, tolerancias, leyes, escala ni datos de los experimentos anteriores.

Se registran los casos, criterios y hashes antes de capturar los cuatro HTML nuevos.
Luego se comprueba la geometría y se registra cada experimento antes de enviar solicitudes.
El registro de cada experimento guarda modelo, versión, parámetros, código, archivos,
prompts, expectativas y procedencia. El evaluador nunca recibe las expectativas,
el registro, la galería ni respuestas previas. Cada posición tiene conversación nueva,
sin herramientas, web ni documentos del proyecto.

Se comparan exactamente score y NA con las expectativas de diseño: 40 posiciones en
la serie sin clases y las 25 de cobertura. Las cinco de P10 quedan aparte. Para cobertura
también se comparan trigger, J_inicio, J_final y final_compite_con_inicio. Para ambas se
informan Q, los G que apliquen, el total declarado y la marca de evidencia insuficiente.
No se completa steps_declared contando etiquetas. En la serie sin clases se compara
además el perfil con las respuestas previas, conservando las cinco repeticiones y su
dispersión; no se exige una coincidencia para seleccionar o descartar una respuesta.

Se guardan todas las respuestas y trazas. Una inválida permanece en el denominador y
no se repite. Ante error técnico se detienen solicitudes nuevas y se conserva el intento.
No se cambian expectativas, prompts ni reglas para mejorar la coincidencia. No hay un
umbral global nuevo para declarar validado G5. Se informan coincidencias y diferencias,
estabilidad del nivel y del trigger, empates, rango ordinal y límites de cada caso.

El ejecutor nuevo es scripts/pilot-g5-completion.js. Los lotes tienen de una a tres
solicitudes, concurrencia uno, revisando el consumo entre lotes y dejando margen al
94 % de uso. No se usan reinicios gratuitos ni se compran créditos. No se publica a
GitHub sin autorización. Al finalizar se comprueban originales, atribuciones, sesiones
y trazas, se producen CSV e informes y se sellan los archivos primarios.

Son ejemplos sintéticos, no páginas reales ni juicios expertos. La falta de aprobación
del comité y de evaluaciones humanas no se rellena con resultados del modelo. La
validación humana y el consenso siguen siendo necesarios para la tesis.
