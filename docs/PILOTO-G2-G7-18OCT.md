# Pilotos de G2 y G7 · 18 de octubre de 2026

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


## Punto de avance antes de la renovación de uso

Se conservaron **24 respuestas de G2**: diez puntajes de nivel 3 y 14 abstenciones. En G7 quedaron **48 respuestas válidas**: 38 de nivel 0, cinco de nivel 1 y cinco de nivel 2. No hay respuestas inválidas ni errores técnicos. Son resultados **parciales**; faltan 96 solicitudes de G2 y 72 de G7.

Las abstenciones iniciales de G2 corresponden a combinaciones de cantidad, agrupación y jerarquía que no tienen nivel explícito. Las dos páginas con cinco puntajes mantuvieron el nivel, aunque variaron los triggers. En G7 las nueve páginas con cinco respuestas mantuvieron nivel y trigger. No se cambian instrucciones por esos resultados.

El usuario indicó conservar los reinicios gratuitos y continuar tras la renovación automática. La cola terminó las solicitudes en curso y se detuvo antes de agotar la ventana. El punto de reanudación está en `docs/CONTINUAR-PILOTOS-G2-G7.md`; los intentos completados no se repiten.

Se comprobó además que la verificación funciona sin los archivos `measurements.json` ignorados por Git: recalcula los datos desde las capturas y comprueba la versión del código. Los informes y el CSV se revisaron sin modificar las respuestas originales. Las pruebas de integridad se ejecutan en copias temporales. El sello final se generará cuando termine cada grupo.

## Reanudación del 19 de octubre

Tras la renovación automática se añadieron **36 respuestas de G2 y 72 de G7**. Se conservaron las 72 anteriores y sus archivos siguen intactos. Las 180 conversaciones acumuladas son distintas. No se usaron reinicios gratuitos ni se compraron créditos; tampoco se cambiaron imágenes, modelo, esfuerzo, medición, prompts, rúbricas ni reglas de validación.

**G7 terminó con 120 respuestas válidas:** 105 de nivel 0, diez de nivel 1 y cinco de nivel 2. Las 24 páginas mantuvieron el nivel y la regla en sus cinco repeticiones. La auditoría no encontró discrepancias con las anclas registradas, pero 75 respuestas declaran evidencia insuficiente. Este conjunto no ejercitó los niveles 3 y 4; no se modifican los umbrales para repartir los puntajes. Los originales y las trazas se verificaron y se sellaron 539 archivos primarios. El [informe de G7](../pilotos/g7-2026-10-18/INFORME.md) conserva el resultado final del piloto; la validación experta sigue pendiente.

**G2 quedó en 60 respuestas:** 29 puntajes y 31 abstenciones. Los puntajes son cuatro de nivel 0, quince de nivel 2 y diez de nivel 3. Las cinco páginas con cinco puntajes mantuvieron el nivel, aunque solo dos mantuvieron la regla. Hay 50 respuestas con evidencia insuficiente. En C10 se recibieron cuatro ceros y una abstención: la diferencia está en si se puede asegurar que la pantalla exige una decisión. Es un ejemplo para revisar con Camilo, junto con las combinaciones que no tienen nivel definido. No se sustituye ninguna respuesta ni se amplía la rúbrica durante este piloto. El evaluador no identificó apoyos de decisión en estas primeras 60 respuestas; la rama de reducción activa no quedó probada.

No hubo respuestas inválidas, fallos técnicos ni discrepancias de anclas en ninguno de los grupos. Se revisaron los CSV, con las 120 posiciones de cada grupo y los pendientes explícitos, y se simplificó únicamente la redacción del informe. El ejecutor y sus archivos de contrato siguen congelados. Las comprobaciones de esta reanudación están en `QA-REANUDACION-1.json` de cada carpeta.

La pausa de G2 es preventiva: el último uso observado era 77 %. Quedan **60 posiciones pendientes desde C16-r1**, con un nuevo snapshot de 300 archivos y `PAUSA-POR-USO-2.json`. No quedan solicitudes en curso. El seguimiento permanece activo para continuar G2 tras otra renovación automática; G7 no se vuelve a consultar. La [guía de continuación](CONTINUAR-PILOTOS-G2-G7.md) contiene el punto actual. El consenso de casos dorados, los expertos y la aprobación ética no se dan por hechos.
