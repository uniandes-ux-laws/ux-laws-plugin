# Piloto de G5 · 6 y 7 de octubre de 2026

G5 revisa la posición de los elementos de una lista y las señales de avance en un proceso. La fase final terminó con **120 respuestas válidas**. En **22 de las 24 páginas** se mantuvo el mismo nivel en las cinco repeticiones. La comparación con expertos y la parte de progreso siguen pendientes.

Aquí se conserva el plan previo, las correcciones y el resultado final. Las fases incompletas permanecen separadas de la final.

## Plan registrado antes de evaluar

Se fijaron **24 capturas de calibración y cinco evaluaciones independientes por página**. Se usaría la skill de G5; el piloto histórico, que calculaba aproximaciones automáticas, se conserva por separado.

La primera configuración fue **gpt-6.1-sol, Codex CLI 0.160.0, razonamiento xhigh**, con tres solicitudes simultáneas. El 6 de octubre se comprobó que la herramienta respondiera; esa prueba no evaluó páginas ni se contó en los resultados. No se cambió de modelo durante las fases. Temperatura y top-p no están disponibles en esta herramienta, por lo que no se conocen sus valores.

Cada evaluación usa una conversación nueva, sin resultados anteriores ni herramientas. Recibe las mismas instrucciones y datos en las cinco repeticiones: medidas de G5, wireframe y captura original. El wireframe sirve para revisar la estructura; la captura permite leer los textos. Cada consulta de la captura queda registrada, incluso si el resultado de `Q` es falso. `Q` indica si se reconoce un proceso con progreso visible.

La primera solicitud se ejecuta sola para comprobar el formato de la respuesta. Si es válida, cuenta entre las 120. Se guardan la respuesta original, la sesión y el uso de tokens. El sistema añade únicamente la identificación de la corrida (`run`) a una copia, manteniendo iguales los puntajes, las reglas (`triggers`), los hallazgos y las recomendaciones.

La fase inicial usó la medición **1.0.3**, incluida la corrección de distancias de G5. Se conservaron las imágenes originales de septiembre, sin sustituirlas por wireframes nuevos con X. Antes de pedir puntajes se registraron los hashes de las capturas, medidas, instrucciones, esquema y ejecutor para poder comprobar su integridad.

También se aclararon dos puntos de las instrucciones: nombres de conteos que no existían en la entrada y la obligación de registrar la consulta de la captura para decidir `Q`. Los niveles y las tolerancias se mantuvieron.

## Cómo se analizaría

Se acordó contar los niveles 0–4, los «no aplica» (NA) y los resultados inválidos por separado. Por página se conservan los cinco niveles y sus reglas, el nivel más frecuente, los empates y la diferencia entre el mayor y el menor. Los niveles no se promedian.

También se revisarían las marcas de evidencia insuficiente, las consultas de la captura, la elección de la lista principal y los valores de `Q`. Las páginas son principalmente de entrada, por lo que no se supone que contengan procesos de varios pasos.

Una respuesta inválida se conserva y se excluye del conteo de puntajes válidos. Los errores técnicos pueden retomarse en una conversación nueva, guardando los intentos. Un puntaje, una abstención o un desacuerdo no se repiten para obtener otro resultado. Los límites de puntuación no se cambian según las frecuencias. La validación con expertos queda fuera de este piloto.

## Fases de la ejecución

### Primera fase: medición 1.0.3

Se interrumpió después de **23 respuestas: 18 válidas y cinco inválidas**. Tres solicitudes en curso se detuvieron y sus registros quedaron guardados.

Las cinco inválidas eran de C03. El único candidato a lista era un grupo de párrafos de cookies y el modelo se abstuvo de puntuar. Esas respuestas no cumplían el formato válido previsto para esta fase, pero se conservaron; no se convirtieron en ceros.

La revisión de la geometría encontró seis páginas con texto o fragmentos decorativos tratados como listas, cinco con menús centrados omitidos y una con listas recortadas. La fase quedó en `pilotos/g5-2026-10-06/`, con el registro de interrupción y la auditoría.

### Segunda fase: medición 1.0.4

Se corrigió la detección antes de evaluar de nuevo. Se excluyeron grupos sin elementos explícitos o controles, y contenedores generales de la página. Se añadieron bordes y centros como referencias de alineación, manteniendo la tolerancia de **4 px**. También se ordenaron las listas por su eje, se entregaron todos los candidatos y se corrigió la mediana cuando había un número par de elementos.

La lista principal sugerida se eligió por área visible. Los elementos parcialmente fuera de la pantalla y los solapamientos quedaron marcados como limitaciones. Las reglas de nivel 0–4 no cambiaron.

Se registró una nueva serie de 24 páginas por cinco evaluaciones en `pilotos/g5-2026-10-06-v2/`, con el mismo modelo, esfuerzo xhigh, imágenes y reglas de análisis. Quedaron **47 intentos: 41 válidos, cuatro inválidos, dos errores por límite de uso y 73 solicitudes pendientes**.

En C12 apareció otro problema: una lista podía tener padre vacío (`id_padre: null`) porque la captura no conservaba su contenedor original. El formato confundía ese caso con no haber elegido una lista. Se comprobó revisando `assignParentIds` de `capture/capture.js` y la entrada archivada. Esta fase también se conserva, con sus respuestas originales.

### Fase final: medición 1.0.5

Se añadieron identificadores propios de lista (`id_lista` y `main_list_id`), separados del identificador del padre. Cuando el padre original no se conserva, se marca una raíz virtual y la duda sobre pertenencia. Los conteos, las cajas, el orden, las áreas y los límites no cambiaron. Se mantiene el formato anterior para verificar las fases históricas.

La fase final se registró el **7 de octubre**, en `pilotos/g5-2026-10-07/`, con **gpt-6.1-sol, CLI 0.160.0, razonamiento medium**, tres solicitudes simultáneas y otras 120 evaluaciones independientes. El esfuerzo se redujo por el consumo de uso de xhigh, antes de pedir nuevos puntajes. La primera solicitud fue C12-r1 para comprobar el caso que motivó la corrección; contó entre las 120.

Entre fases cambiaron la identificación de listas y el esfuerzo de razonamiento. Las diferencias de puntaje no se pueden atribuir a uno solo de esos cambios. Se mantiene la fecha local de Bogotá y los registros técnicos en UTC.

## Resultado final

Se completaron **120/120 respuestas válidas**, sin respuestas inválidas, errores técnicos ni pendientes en la fase final. Se verificaron 120 sesiones distintas, las instrucciones e imágenes registradas y las respuestas originales. Los **534 archivos protegidos por el sello del piloto** y los 256 archivos originales del estudio quedaron comprobados.

| Nivel | Evaluaciones | Páginas con ese nivel más frecuente |
|---|---:|---:|
| 0 | 55 | 11 |
| 1 | 21 | 4 |
| 2 | 9 | 2 |
| 3 | 25 | 5 |
| 4 | 5 | 1 |
| NA | 5 | 1 |

Los porcentajes de niveles usan los **115 puntajes aplicables**; los cinco NA se cuentan aparte. Aparecieron los cinco niveles sin modificar las reglas para repartirlos.

**22/24 páginas** mantuvieron el mismo nivel, incluida la página con cinco NA. C11 obtuvo 2, 2, 2, 0, 2, y R03 obtuvo 1, 0, 0, 0, 0. C04 mantuvo el nivel 0 aunque cambió la lista principal elegida. C07 mantuvo el nivel 1 aunque cambió la regla usada para justificarlo.

Hubo **63/120 respuestas con evidencia insuficiente**. Los cinco NA de R02 también tienen esa marca: puede haberse omitido una lista y debemos revisarlo antes de interpretar que G5 no aplica allí.

`Q` fue falso en las 120 respuestas. Por tanto, **la parte de progreso quedó sin probar con casos positivos**. Estos resultados tampoco sustituyen la comparación con expertos.

## Comprobaciones y archivos

Se aprobaron 22 pruebas de geometría, 12 de formato y validación de respuestas y 28 del validador de mediciones. Las 64 mediciones fueron válidas y las siete skills usaban campos existentes. También se hicieron seis pruebas de integridad sobre copias temporales alteradas.

El [informe final](../pilotos/g5-2026-10-07/INFORME.md), `resumen.csv`, `evaluaciones.csv`, `resumen.json`, `auditoria.json` y `VERIFICACION.json` están en la carpeta final. Allí se conservan las respuestas originales, las copias con identificación de corrida, los registros por repetición y `SELLO-SHA256.tsv`. Las dos fases incompletas siguen separadas.

## Qué falta para cerrar G5

Debemos completar el consenso de casos dorados y comparar con expertos. También falta un conjunto separado de procesos, con criterios de selección registrados antes de capturar y evaluar, para probar la parte de progreso. El panel humano requiere aprobación ética y consentimiento. La propuesta formal y el corpus original se conservan.

<details>
<summary>Comandos para repetir las comprobaciones</summary>

Para una ejecución nueva se debe usar otra carpeta. Para recuperar una fase histórica, se usa el commit y el esquema indicados en su manifiesto.

Primera fase, con 1.0.3 y xhigh:

```bash
npm run test:pilot-g5
npm run pilot:g5 -- preparar --measurements-version 1.0.3 --model gpt-6.1-sol --effort xhigh --concurrency 3
npm run pilot:g5 -- ejecutar --only C02-r1
npm run pilot:g5 -- ejecutar
npm run pilot:g5 -- analizar
```

Segunda fase, con 1.0.4 y xhigh:

```bash
npm run test:g5
npm run test:pilot-g5
npm run pilot:g5 -- preparar --out pilotos/g5-2026-10-06-v2 --measurements-version 1.0.4 --model gpt-6.1-sol --effort xhigh --concurrency 3
npm run pilot:g5 -- ejecutar --out pilotos/g5-2026-10-06-v2 --only C02-r1
npm run pilot:g5 -- ejecutar --out pilotos/g5-2026-10-06-v2
npm run pilot:g5 -- analizar --out pilotos/g5-2026-10-06-v2
```

Fase final, con 1.0.5 y medium:

```bash
npm run pilot:g5 -- preparar --out pilotos/g5-2026-10-07 --measurements-version 1.0.5 --model gpt-6.1-sol --effort medium --concurrency 3
npm run pilot:g5 -- ejecutar --out pilotos/g5-2026-10-07 --only C12-r1
npm run pilot:g5 -- ejecutar --out pilotos/g5-2026-10-07
npm run pilot:g5 -- analizar --out pilotos/g5-2026-10-07
node scripts/audit-g5-pilot.js pilotos/g5-2026-10-07
node scripts/report-g5-pilot.js pilotos/g5-2026-10-07
node scripts/verify-pilot-g5.js pilotos/g5-2026-10-07 --seal
node scripts/verify-pilot-g5.js pilotos/g5-2026-10-07 --verify-seal
```

</details>

Los informes y resúmenes se pueden regenerar. El sello protege las entradas, instrucciones y respuestas originales del experimento.
