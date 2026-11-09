# Pilotos de G2 y G7 · 18 y 19 de octubre de 2026

Terminamos los dos pilotos sobre las 24 páginas de calibración. Cada página se evaluó cinco veces por grupo, en conversaciones separadas.

| Grupo | Respuestas | Puntajes | Abstenciones | Respuestas inválidas | Fallos pendientes |
|---|---:|---:|---:|---:|---:|
| G2 | 120 | 41 | 79 | 0 | 0 |
| G7 | 120 | 120 | 0 | 0 | 0 |

En G2, una abstención significa que el modelo no pudo asignar un nivel con las reglas y la información disponibles. Esos casos se guardaron con su explicación. No los contamos como ceros ni como «no aplica».

## Qué encontramos

**G2 todavía deja bastantes casos sin puntaje.** Obtuvimos seis ceros, veinticinco doses y diez treses. Solo siete páginas tuvieron cinco puntajes; seis de ellas conservaron el mismo nivel en las cinco evaluaciones. La regla usada para justificarlo fue la misma en tres de esas siete páginas.

- En C16 hubo dos ceros y tres doses. Cambió el juicio sobre si la acción principal estaba ausente o existía sin destacar; la cantidad de grupos y la agrupación parcial fueron iguales.
- En C10 y R02 hubo respuestas con puntaje y otras con abstención.
- Quince páginas tuvieron cinco abstenciones. Hay que revisar con Camilo qué nivel debería corresponder a esas situaciones.
- En 108 respuestas el modelo indicó que faltaba parte de la evidencia. No identificó apoyos de decisión y no obtuvimos niveles 1 ni 4.

**G7 repitió el nivel y la regla en las 24 páginas.** Hubo 105 ceros, diez unos y cinco doses. En 75 respuestas se marcó falta de evidencia. No aparecieron niveles 3 ni 4, así que aún no sabemos cómo respondería el evaluador en esos casos.

Esta repetición de resultados no demuestra que coincidan con expertos. También hay que tener presente que la rúbrica de G7 contenía cifras del piloto de septiembre; eso pudo influir en las respuestas. Este límite estaba anotado antes de empezar.

## Cómo hicimos las evaluaciones

Usamos `gpt-6.1-sol`, Codex CLI `0.162.0-alpha.17.2`, razonamiento `low` y medición `1.0.6`. La configuración se fijó antes de pedir puntajes. Se mantuvieron las capturas archivadas, las rúbricas y las reglas de evaluación. No se volvieron a capturar las páginas ni se cambiaron los wireframes por versiones con X.

G2 recibió el wireframe y la captura real. La captura real se usó solo para revisar los apoyos de decisión (`Ap`); la organización y la acción principal se juzgaron en el wireframe. G7 recibió únicamente el wireframe y las medidas ya calculadas. Cada conversación tuvo sus propias imágenes e instrucciones, sin consultar otras respuestas de esta serie.

Los niveles, las abstenciones, los «no aplica», las respuestas inválidas y los fallos técnicos se contaron por separado. No se promediaron niveles. Para revisar si el nivel se repetía, se tomaron solo las páginas con cinco respuestas válidas. Las diferencias frente a las reglas de la rúbrica se revisaron aparte de los errores de formato, sin corregir lo que respondió el modelo.

En G2 esa revisión comprueba el nivel según los juicios declarados. La rúbrica no exige una única regla de justificación para los niveles 0 a 3; solo exige `Ap` para el nivel 4. En G7 se revisan tanto el nivel como la condición que lo determina.

## Pausas y problemas durante la ejecución

| Momento | G2 | G7 |
|---|---|---|
| Primera pausa por uso | 24 respuestas: 10 puntajes y 14 abstenciones | 48 puntajes |
| Primera continuación | 60 respuestas: 29 puntajes y 31 abstenciones | 120 puntajes; piloto terminado |
| Pausa por conexión | 117 respuestas: 41 puntajes y 76 abstenciones; tres fallos sin respuesta | Sin cambios |
| Cierre | 120 respuestas: 41 puntajes y 79 abstenciones | Sin cambios |

Las pausas por uso permitieron continuar después de la renovación automática. Se conservaron los reinicios gratuitos y no se compraron créditos.

Los tres fallos fueron R07-r3, R07-r4 y R07-r5. Los registros mostraron una desconexión y no contenían una respuesta que se pudiera recuperar. Se detuvieron las solicitudes y se guardaron los archivos originales y sus copias.

Juan autorizó un único reintento de esas tres posiciones. Las tres devolvieron abstenciones. Los 117 resultados anteriores quedaron iguales. Por eso G2 tiene **123 intentos para 120 respuestas**, contando los tres fallidos. Entre los dos grupos hay 240 conversaciones con respuesta y tres fallidas, todas distintas.

El [registro del reintento](../pilotos/g2-2026-10-18/REINTENTO-TECNICO-AUTORIZADO-19OCT.json), el [diagnóstico](../pilotos/g2-2026-10-18/DIAGNOSTICO-ERROR-TECNICO-19OCT.json) y la [revisión final](../pilotos/g2-2026-10-18/QA-CIERRE.json) conservan el detalle. Las copias de los fallos están en `fallos-tecnicos/2026-10-19-conexion/`, dentro de G2. Los logs completos se guardan localmente.

## Qué dejamos y qué falta

Los [informes de G2](../pilotos/g2-2026-10-18/INFORME.md) y [G7](../pilotos/g7-2026-10-18/INFORME.md) incluyen las tablas y los resultados por página. Se comprobaron las respuestas originales, sus copias con los datos de cada corrida y los registros de ejecución. Los sellos permiten verificar que siguen iguales: G2 tiene 554 archivos protegidos y G7, 539. Los CSV conservan las 120 posiciones por grupo.

El seguimiento automático ya está desactivado. Los documentos de pausa y sus copias se conservan como historial; no significan que todavía falten respuestas.

Falta acordar con Camilo las situaciones que G2 no alcanza a puntuar, completar el consenso de los casos dorados y comparar los resultados con expertos. El estado del comité de ética se revisa aparte. **Terminar estos pilotos no significa que los grupos ya estén validados.**

## Plan que guardamos antes de empezar

La versión inicial está en el commit `70b7b2b`. El 19 de octubre se simplificó la redacción del resumen y de las notas de avance. El plan original se conserva abajo, con sus criterios y configuración.

<details>
<summary>Ver el plan inicial y los comandos registrados</summary>

## Plan registrado antes de evaluar

Vamos a evaluar las versiones corregidas de G2 y G7 sobre las **24 capturas de calibración**, con **cinco conversaciones independientes por página y grupo**: 120 solicitudes para G2 y 120 para G7. El piloto histórico se conserva por separado porque usaba una aproximación anterior a estas correcciones.

Se usa medición **1.0.6**. Las cifras de G2, G7 y su inventario se recalcularon sobre las 64 capturas archivadas sin encontrar diferencias con los archivos existentes. Las correcciones de estos dos grupos corresponden a 1.0.2 y 1.0.3; los cambios posteriores de G4/G5 no alteraron sus medidas. No se recapturan páginas ni se sustituyen los wireframes antiguos por otros con X.

La configuración fijada es **gpt-6.1-sol**, **Codex CLI 0.162.0-alpha.17.2**, razonamiento **low**, formato JSON compacto y tres solicitudes simultáneas por ejecución. Se elige low antes de observar puntajes, para poder completar ambos grupos con el uso disponible. El modelo es el mismo identificador solicitado en G4/G5, pero cambia la versión de la herramienta: no se atribuyen diferencias entre grupos solo a sus rúbricas. Temperatura y top-p no están expuestos.

La primera solicitud de cada grupo será **C02-r1**. Cuenta como parte del piloto y no se vuelve a pedir por su resultado. Se puede ejecutar la cola en lotes para comprobar el consumo; el orden dentro de cada grupo sigue siendo página y repetición. Los lotes no cambian instrucciones, imágenes ni configuración. Una solicitud ya terminada se conserva, incluso si es inválida o se abstiene. Si hay un error técnico se detiene la cola y se guarda el intento antes de decidir cómo retomarlo.

## Qué recibe cada evaluación

- **G2:** wireframe y screenshot, medidas completas de G2 e inventario calculado. La agrupación y jerarquía se juzgan en el wireframe; el screenshot se permite solo para apoyos de decisión (`Ap`). Esa lectura se declara incluso al concluir que no hay apoyos. Los candidatos detectados por clase CSS no son apoyos confirmados.
- **G7:** wireframe, medidas completas de G7 e inventario. No recibe screenshot. Los tamaños, pares, familias, proporciones e identificadores ya están calculados; el modelo aplica las reglas y localiza los hallazgos.

Cada solicitud usa una conversación nueva, sin herramientas, web, conectores, instrucciones del proyecto ni archivos de resultados anteriores. La rúbrica completa de G7 sí contiene las cifras agregadas del piloto de septiembre como explicación histórica; se conservan porque forman parte de la skill publicada y se declaran como posible influencia. No se suministran puntajes del piloto nuevo. Las instrucciones base de evaluación y la configuración se conservan con hashes. El sistema añade únicamente `run` a una copia de la respuesta original; no modifica puntajes ni explicaciones. La [documentación oficial de ejecución](https://learn.chatgpt.com/docs/non-interactive-mode) y la [referencia de configuración](https://learn.chatgpt.com/docs/config-file/config-reference) se consultaron el 18 de octubre para comprobar el mecanismo; la versión y opciones instaladas se comprobaron localmente.

## Precauciones de G2

La rúbrica combina intervalos de cantidad con juicios de agrupación y acción primaria. **Algunas combinaciones no tienen nivel explícito**, por ejemplo seis a ocho grupos que se juzgan coherentes con una acción clara. Se conserva una abstención aplicable con explicación, distinta de NA y de nivel cero. Esta decisión se registra antes de pedir puntajes; no amplía las anclas.

Se explicitan los juicios usados: agrupación ausente, débil, parcial, coherente o indeterminada; acción primaria ausente, existente sin dominar, clara o indeterminada; competencia entre acciones; y si la pantalla exige una decisión observable. No se supone una tarea externa. Se aplican los niveles en orden 0, 1, 2 y 3/4. El nivel 4 exige nivel 3 y reducción activa de carga, no solo la presencia de una clase llamada `default`.

Los apoyos seleccionados usan los ids de candidatos recibidos. Si faltan candidatos pertinentes, se declara la limitación. No se vuelve a contar ni a cambiar el reparto de opciones para obtener un nivel.

## Precauciones de G7

Se mantienen los límites de 24, 32, 8 y 2 px y las tolerancias existentes. Los denominadores cero conservan proporción y etiqueta nulas: no son impecables ni hacen que todo el grupo sea NA. El nivel 4 exige las cuatro condiciones impecables y una jerarquía de tamaño visible.

Para el corte estricto `p>0,50` y los desempates se usa el cociente de afectados y denominador, sin redondearlo. El trigger sigue la condición de mayor proporción afectada; en empate, T1, T2, T3 y T4. La correspondencia es T1→holgura, T2→S_min, T3→W_min y T4→consistencia. Si no hay afectados, se usa `ninguna`.

## Qué se comprobará

La validación revisa formato, cifras de fuente, identificadores, no aplicabilidad y límites de inventario. Una respuesta que cambie cifras o use herramientas queda inválida y se conserva. **Una discrepancia entre el nivel o trigger y las anclas se audita por separado**: no se elimina del histograma si los datos y el formato son conformes. Así podemos observar los errores del evaluador sin corregirlos ni esconderlos dentro de la exclusión de respuestas inválidas.

Se informarán niveles 0–4, NA, abstenciones, inválidas, errores y pendientes por separado. Por página se conservarán las cinco respuestas, el nivel más frecuente con sus empates, la diferencia entre niveles y los triggers. La estabilidad requiere cinco respuestas válidas, incluyendo NA estables. Se publicará además el conteo de puntajes recibidos incluyendo inválidos para revisar el efecto de excluirlos. No se promedian los niveles ni se ajustan reglas según las frecuencias.

Las capturas antiguas no registran todos los estados de los controles. La ambigüedad del inventario exige declarar evidencia insuficiente. La ausencia de otros atributos se informa como limitación del conjunto, aunque no todas las respuestas marquen la misma duda.

## Archivos y pasos

Las carpetas serán `pilotos/g2-2026-10-18/` y `pilotos/g7-2026-10-18/`. Cada una conserva rúbrica, escala, instrucciones base, esquema de salida, manifiesto, entradas, prompts, respuestas, resultados atribuidos y trazas. Los informes, tablas y auditorías se pueden regenerar. El código se guarda antes de preparar los manifiestos y solicitar puntajes.

Se aprobaron 31 pruebas de las correcciones G2/G7 y 28 del validador de medidas. El transporte y la auditoría se prueban antes de iniciar. Los resultados del piloto se añadirán después.

```bash
npm run test:pilot-g2-g7
npm run pilot:g2-g7 -- preparar --group g2 --out pilotos/g2-2026-10-18 --measurements-version 1.0.6 --model gpt-6.1-sol --effort low --concurrency 3
npm run pilot:g2-g7 -- preparar --group g7 --out pilotos/g7-2026-10-18 --measurements-version 1.0.6 --model gpt-6.1-sol --effort low --concurrency 3
npm run pilot:g2-g7 -- ejecutar --out pilotos/g2-2026-10-18 --only C02-r1
npm run pilot:g2-g7 -- ejecutar --out pilotos/g7-2026-10-18 --only C02-r1
```

Para repetir el experimento se usan carpetas nuevas. Estos pilotos comprueban funcionamiento y variación del evaluador. Los casos dorados consensuados y la evaluación experta siguen pendientes; no se completan con resultados del modelo ni se supone aprobación ética.

</details>
