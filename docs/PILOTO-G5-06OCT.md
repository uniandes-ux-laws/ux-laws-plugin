# Piloto real de G5 · 6 de octubre de 2026

## Registro previo a la ejecución

Objetivo: ejecutar la skill publicada de G5 sobre las **24 capturas de calibración selladas**, con **cinco evaluaciones independientes por página**. No son puntajes humanos ni aproximaciones de `scripts/pilot-calibracion.js`. Ese piloto histórico se conserva.

Se usa el modelo **gpt-6.1-sol**, configurado localmente y disponible en el runtime **Codex CLI 0.160.0**, con esfuerzo de razonamiento **xhigh**, como en la configuración del usuario. La comprobación técnica del runtime respondió el 6 de octubre; no evalúa ninguna página y queda fuera de los resultados. No se cambia de modelo a mitad del experimento. Temperatura y top-p no están expuestos por este runtime y se declara su ausencia; no se presume temperatura cero.

Cada evaluación recibe una conversación nueva (`codex exec --ephemeral`, sin resume), el mismo prompt, esquema y par de imágenes dentro de las cinco repeticiones de una página, y ninguna salida anterior. Solo se suministra el bloque medido de G5, sin puntajes de otros grupos ni niveles humanos. No se habilitan consultas web, conectores o comandos del evaluador. La primera imagen es el wireframe y la segunda, el screenshot para los criterios textuales. Las consultas del segundo canal se registran; esto no es una corrida exclusivamente sobre wireframe.

La ejecución usa tres solicitudes a la vez, con aislamiento entre ellas. La primera solicitud se ejecuta sola para comprobar el transporte y su validación; si es válida, cuenta como la primera de las 120 y no se vuelve a pedir. El orden y la cola restantes se mantienen registrados. No son tareas delegadas para implementar código: son muestras del evaluador, sin herramientas ni modificaciones del proyecto.

Los archivos primarios no se recapturan ni modifican. La geometría usa mediciones **1.0.3**, que incluyen la corrección de separación de G5 del 6 de octubre. El wireframe sellado conserva su convención histórica; no se sustituye por uno nuevo con X. Los hashes de captura, medición suministrada, skill, prompt, esquema y script de ejecución se guardan antes de solicitar puntajes.

**Atribución por infraestructura.** El modelo devuelve los juicios y hallazgos en un esquema de transporte estricto. La respuesta original se conserva. La infraestructura añade únicamente el bloque `run` con modelo, runtime, repetición, parámetros y hashes; no modifica puntajes, triggers, mediciones, hallazgos ni recomendaciones. La repetición es un identificador de ejecución, no evidencia de la página, y por ello no se incluye en el prompt común. Se conserva el identificador real de sesión de cada solicitud y su uso de tokens. Esta adaptación del transporte permite mantener idéntico el prompt sin pedir al evaluador que adivine la repetición.

Antes de correr se aclaran dos contradicciones de las instrucciones de G5: los alias de conteos inexistentes se sustituyen por campos de fuente; una consulta del screenshot para decidir `Q` se registra incluso cuando resulta falso. No se modifican niveles, tolerancias ni condiciones para producir una distribución más repartida.

## Análisis predefinido

- Distribución de los niveles 0–4 por evaluación y por página; los no aplicables y resultados inválidos se cuentan aparte, con sus denominadores.
- Por página: cinco niveles y triggers originales, moda (todas las modas si hay empate), fracción en la moda, rango ordinal y número de triggers distintos. No se promedian niveles ordinales como si fueran intervalares.
- Número de casos con evidencia insuficiente, consultas del screenshot, selección de lista y valores de `Q`. Se documenta qué ramas del constructo ejercita este conjunto; son páginas de entrada, por lo que no se presupone presencia de procesos.
- Conformidad con el esquema del proyecto y consistencia de atribución y cifras de fuente. Una salida inválida se conserva y no entra como un puntaje válido.
- Los errores técnicos pueden reintentarse en una conversación nueva, conservando todos los intentos. No se repite una evaluación por obtener un nivel incómodo, una abstención o un desacuerdo.
- No se recalibran umbrales a partir de las frecuencias. Los desacuerdos se revisan como resultados del instrumento. El acuerdo con expertos y casos dorados consensuados queda fuera de este piloto.

## Estado

Registrado antes de ejecutar la primera evaluación de G5. Los resultados se añadirán después de la ejecución y validación; una preparación o un intento fallido no se reportarán como piloto completado.

## Reproducción

```bash
npm run test:pilot-g5
npm run pilot:g5 -- preparar --measurements-version 1.0.3 --model gpt-6.1-sol --effort xhigh --concurrency 3
npm run pilot:g5 -- ejecutar --only C02-r1
npm run pilot:g5 -- ejecutar
npm run pilot:g5 -- analizar
```

Las carpetas nuevas se guardan en `pilotos/g5-2026-10-06/`. No se sobrescribe un experimento existente. Las respuestas crudas, las trazas y los resultados atribuidos se conservan por separado; `resumen.json` y `resumen.csv` son derivados regenerables.

## Registro de fase 2 · antes de reejecutar

La fase inicial 1.0.3 se interrumpe tras 23 respuestas terminadas (18 válidas y 5
inválidas); tres solicitudes en curso se detienen y se conservan sus trazas. Las cinco
inválidas corresponden a C03: el único candidato era un conjunto de párrafos de cookies,
y el modelo se abstuvo de asignar nivel. No se convierte esa abstención en un cero.
La auditoría de geometría, independiente de la distribución de niveles, muestra seis
páginas con fragmentos de texto/pseudoelementos como listas y cinco con menús alineados
por el centro omitidos. La fase se conserva en `pilotos/g5-2026-10-06/`, junto con
`INTERRUPCION.json` y `auditoria.json`; no constituye un piloto completo.

Se corrige la detección y se vuelve a medir con **1.0.4**, según la desviación fechada
en `docs/protocolo.md`. Se excluyen candidatos sin ítems explícitos o controles; se
excluyen además las regiones hermanas de BODY/HTML como opciones, y se mantiene la tolerancia de 4 px, ampliando las referencias geométricas a bordes y centros.
La secuencia se ordena por su eje, y se entregan todos los candidatos e ids, sin recorte
a ocho. Se corrige además la mediana para un cuerpo con longitud par, usando la media de los dos valores centrales como en los demás grupos. La sugerencia de principal usa el área visible; cajas parciales y solapamientos
se declaran como límites. No cambia ninguna ancla 0–4 ni escala de tolerancia.

La nueva fase repite las 24 páginas × 5 solicitudes desde cero, en
`pilotos/g5-2026-10-06-v2/`, con prompt, medición, rúbrica y ejecutor congelados por hash.
La fase anterior no se mezcla con sus resultados. Se mantienen modelo, runtime, esfuerzo,
concurrencia, imágenes originales y reglas de análisis. Una salida inválida se conserva:
no se reintenta para completar artificialmente un denominador de 120 válidas.

```bash
npm run test:g5
npm run test:pilot-g5
npm run pilot:g5 -- preparar --out pilotos/g5-2026-10-06-v2 --measurements-version 1.0.4 --model gpt-6.1-sol --effort xhigh --concurrency 3
npm run pilot:g5 -- ejecutar --out pilotos/g5-2026-10-06-v2 --only C02-r1
npm run pilot:g5 -- ejecutar --out pilotos/g5-2026-10-06-v2
npm run pilot:g5 -- analizar --out pilotos/g5-2026-10-06-v2
```

## Registro de fase final · 7 de octubre de 2026, antes de ejecutar

La fase 2 conserva 47 intentos: 41 válidos, cuatro inválidos y dos errores por límite de
uso; quedaron 73 pendientes. En C12, el candidato de navegación tenía `id_padre: null`:
la captura conserva raíces de un bosque de nodos, cuyo padre es el ancestro retenido más
cercano. El contrato confundía una lista elegida con padre nulo con ausencia de selección.
La definición se demuestra leyendo `assignParentIds` de `capture/capture.js` y el input
sellado de C12, sin depender de sus niveles. Se conserva toda la fase, sin parchear salidas,
en `pilotos/g5-2026-10-06-v2/` y no se mezcla con la fase final.

La medición **1.0.5** añade `id_lista`, `padre_raiz_virtual` y
`g5_lista_principal_sugerida_id`. La salida añade `main_list_id`, distinto del padre
retenido. Una raíz virtual exige declarar evidencia insuficiente sobre la pertenencia;
no se inventa su padre DOM. No cambian conteos, cajas, orden, área, anclas ni tolerancias.
Se conserva un esquema de transporte legado para verificar las fases anteriores.

La fase final utiliza **gpt-6.1-sol, Codex CLI 0.160.0, razonamiento medium**, tres solicitudes
concurrentes, 24 páginas y cinco repeticiones independientes. El esfuerzo cambia por el
agotamiento de uso de xhigh, antes de solicitar nuevos puntajes. **No se atribuyen cambios
de nivel únicamente al arreglo de identidad**, porque también cambia esta configuración.
Temperatura y top-p siguen sin estar expuestos. Los resultados previos no se reutilizan:
las 120 solicitudes pertenecen a la nueva fase `pilotos/g5-2026-10-07/`.
La primera solicitud aislada será C12-r1 para comprobar el caso que motivó la corrección;
si cumple el contrato, cuenta como una de las 120 y no se repite.

La fecha de la fase sigue el calendario del usuario (America/Bogota). Las marcas técnicas
se conservan en UTC. Se mantienen las reglas de análisis y preservación ya registradas.
Una respuesta inválida no se corrige ni se vuelve a pedir por su nivel. Una interrupción
por uso tampoco se presenta como ejecución completa.

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

Para otra ejecución, usar una carpeta nueva: los registros no se sobrescriben. El sello
protege entradas, prompts, rúbrica, esquema y respuestas/trazas primarias; los resúmenes
son derivados regenerables. Verificar el sello no modifica los datos.

## Resultado final verificado · 7 de octubre de 2026

**Ejecución completada: 120/120 salidas válidas**, 24 capturas × 5 contextos independientes;
cero respuestas inválidas, cero errores técnicos y cero pendientes en la fase final.
La verificación comprobó 120 sesiones distintas, prompts e imágenes registrados, cifras de
fuente y respuestas originales sin modificaciones. Se sellaron 534 archivos primarios.
Los 256 archivos primarios de corpus, calibración y dorados conservan sus sellos.

Distribución por evaluación: nivel 0 = 55; 1 = 21; 2 = 9; 3 = 25; 4 = 5; NA = 5.
El denominador de niveles es 115 aplicables. Las modas por página son 11, 4, 2, 5 y 1,
respectivamente, y una página NA. Se ejercitaron los cinco niveles, sin mover anclas.
Hay 22/24 páginas con nivel idéntico en las cinco repeticiones, incluida la NA estable.
C11 presenta 2,2,2,0,2; R03, 1,0,0,0,0. C04 conserva el nivel 0 con selección de lista
variable; C07 conserva el nivel 1 con trigger variable. No se ocultan estas diferencias.

**63/120 salidas declaran evidencia insuficiente**. Los cinco NA de R02 también están
marcados como inciertos por una posible omisión de lista; no certifican ausencia de listas.
Q es falso en 120/120: **la rama de progreso no se ejercitó**. Quedan el consenso dorado,
la referencia experta y un conjunto auxiliar preregistrado de procesos para cerrar la
validación de G5. No se cambia la propuesta ni se afirma aprobación ética.

El informe y los datos están en `pilotos/g5-2026-10-07/INFORME.md`, `resumen.csv`,
`evaluaciones.csv`, `resumen.json`, `auditoria.json` y `VERIFICACION.json`. Las respuestas
crudas, atribuidas y trazas se conservan por repetición. `SELLO-SHA256.tsv` protege la
parte primaria del experimento. Las dos fases incompletas siguen separadas y versionadas.

QA: 22 pruebas de geometría, 12 de transporte, 28 del validador de mediciones,
64/64 mediciones válidas, 7/7 skills con campos existentes y seis comprobaciones de
integridad mediante alteraciones de copias temporales. La verificación final no modifica
ningún juicio del modelo y no demuestra validez frente a humanos.

Para reproducir las fases históricas, usar el commit indicado en su manifiesto y su esquema
de transporte guardado. La configuración final no sustituye retrospectivamente esos registros.
