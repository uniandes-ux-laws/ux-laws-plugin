# Piloto de G4 · 7 de octubre de 2026

G4 revisa qué elementos llaman la atención en una página. El piloto terminó con **120 respuestas: 56 puntajes y 64 abstenciones**. Una abstención significa que no se pudo asignar un nivel con las reglas o la evidencia disponibles. La validación con expertos sigue pendiente.

Este documento conserva la planificación previa, los cambios entre fases y el resultado final. Los datos de cada fase se guardan por separado.

## Plan registrado antes de evaluar

Se fijaron **24 capturas de calibración y cinco evaluaciones independientes por página**, para un total de 120. Cada evaluación usa una conversación nueva, la misma instrucción por página y solo la captura original (`screenshot`), las medidas de G4 y la relación entre elementos. No recibe wireframes, puntajes anteriores ni evaluaciones humanas. Tampoco puede usar herramientas, web, conectores o instrucciones del proyecto.

La primera configuración fue **gpt-6.1-sol, Codex CLI 0.160.0, razonamiento medium**, con tres solicitudes simultáneas. C02-r1 se ejecutó sola para comprobar que la respuesta pudiera guardarse y validarse; contó como parte de las 120. La herramienta no permite configurar temperatura ni top-p, por lo que sus valores no se conocen.

Se conservan las respuestas originales y el registro de cada ejecución. El sistema solo añade los datos de identificación de la corrida (`run`) a una copia. El manifiesto guarda la configuración y los hashes, que permiten comprobar que los archivos no cambiaron. Las capturas originales y la propuesta formal se mantienen.

## Problemas corregidos antes de pedir puntajes

La medición **1.0.5** omitía grupos de dos elementos, aunque la rúbrica los admite. También limitaba la cantidad de grupos y candidatos, incluía fragmentos de texto como si fueran elementos completos y calculaba mal la mediana cuando había un número par de valores. Además, no comprobaba que una franja estuviera arriba y contaba controles por simple solapamiento.

La versión **1.0.6** corrige esos problemas. Se comprobaron con ejemplos de prueba antes de observar los puntajes. Los otros seis grupos y los límites de la escala no cambiaron.

Quedan algunas limitaciones: hay elementos parcialmente fuera de la pantalla y relaciones de pertenencia que la captura no permite asegurar. La diferencia de color RGB respecto al fondo es una medida orientativa; no mide contraste WCAG ni legibilidad. Para identificar una franja superior se usa el cuarto superior de la pantalla, como regla geométrica declarada.

También se encontraron **situaciones que la rúbrica no cubre**, antes de evaluar:

- Ningún elemento aislado y ningún contenido funcional tratado como publicidad (`I=0`, `Bn=0`).
- Dos elementos aislados con una jerarquía entre ellos.
- Un único elemento destacado que corresponde a lo que la sección promueve, junto con contenido importante presentado como auxiliar (`I=1`, `P=true`, `Cn>0`).

En estos casos se conserva una abstención y su explicación. También se permite abstenerse si no se puede confirmar un conjunto de elementos equivalentes. La respuesta queda con puntaje y regla vacíos, `not_applicable=false` y `evidence_insufficient=true`. No se cuenta como cero ni como «no aplica».

El control automático revisa conteos, pertenencia, duplicados y correspondencia entre la regla declarada y el nivel. La interpretación visual y la elección del conjunto principal requieren una revisión adicional.

## Cómo se analizaría

Se acordó contar los niveles 0–4, los «no aplica» (NA), las abstenciones, las respuestas inválidas y los errores por separado. Por página se conservan las cinco respuestas, el nivel más frecuente, los empates, la diferencia entre el nivel mayor y menor y los cambios de conjunto principal o regla (`trigger`). Los niveles no se promedian.

Para hablar de estabilidad en el nivel se exigen cinco respuestas válidas. Las páginas que alternan puntajes y abstenciones se muestran aparte. Las marcas de evidencia insuficiente también incluyen las abstenciones.

No se repite una respuesta por su puntaje, por abstenerse o por resultar inválida. Si hay un fallo técnico, se detiene la cola y se conserva el intento. Las reglas no se ajustan para obtener una distribución más repartida. La comparación con casos dorados consensuados y expertos queda pendiente, y el panel humano depende de la aprobación ética.

## Fases de la ejecución

### Primera fase

La primera fase se guardó en `pilotos/g4-2026-10-07/`. Se detuvo por consumo de uso: tras 27 respuestas, el uso de la ventana de cinco horas había pasado de 0 % a 38 %. Se dejaron terminar las solicitudes en curso.

Quedaron **34 respuestas: un puntaje, 33 abstenciones, cero inválidas y cero errores técnicos**. Faltaban 86. Esta fase es incompleta y sus datos no se mezclan con los finales.

### Configuración intermedia

Se preparó `pilotos/g4-2026-10-07-v2/` con razonamiento **low**, el mismo modelo y tres solicitudes simultáneas. La instrucción se hizo más compacta: JSON sin espacios adicionales y relaciones entre elementos como pares `[id,parentId]`. El formato se llama `compacto-v2` y conserva el mismo contenido.

Esta carpeta quedó como registro: **no se ejecutó ninguna solicitud**. La idea de comenzar de nuevo con C02-r1 no se llevó a cabo en v2.

### Fase final

La ejecución final quedó en `pilotos/g4-2026-10-07-v3/`: **gpt-6.1-sol, CLI 0.160.0, razonamiento low, formato compacto-v2**, 24 capturas y cinco evaluaciones por captura.

Antes de iniciar se añadieron instrucciones base específicas de evaluación mediante `model_instructions_file`, conservadas en `BASE-INSTRUCCIONES.md`. La opción se consultó el 7 de octubre en la [referencia oficial de configuración](https://developers.openai.com/codex/config-reference/). Se mantuvieron las restricciones de herramientas, la rúbrica, el esquema y las medidas de G4.

Entre la fase inicial y la final cambiaron el esfuerzo, el formato y las instrucciones base. Por eso cualquier diferencia entre sus resultados no puede atribuirse a un solo cambio.

### Interrupción y reanudación

La fase final se detuvo por límite de uso después de **71 intentos: 40 puntajes, 30 abstenciones y un fallo técnico en C18-r1**. Quedaban 49 solicitudes sin iniciar. C18-r1 falló antes de producir una respuesta.

Al renovarse el límite se retomaron ese intento y las 49 solicitudes pendientes. Los 70 juicios ya recibidos se conservaron. El intento fallido quedó en `intentos/C18-r1-intento1/` y `REANUDACION-1.json`, con su registro y hashes. La herramienta de reanudación rechaza archivar respuestas existentes, ejecuciones completadas o registros alterados. No se usó un reinicio gratuito ni se compraron créditos.

## Resultado final

Se completaron las **120 respuestas**, con **56 puntajes, 64 abstenciones, cero NA, cero inválidas y cero pendientes**. Hubo **121 intentos** al incluir el fallo técnico conservado. Se verificaron 120 sesiones completadas distintas y la sesión fallida. Los **540 archivos del experimento protegidos por el sello** y los 256 archivos originales quedaron comprobados.

| Nivel | Evaluaciones |
|---|---:|
| 0 | 0 |
| 1 | 0 |
| 2 | 5 |
| 3 | 32 |
| 4 | 19 |

La tabla usa los **56 puntajes**. Las abstenciones se explican así:

- **55** por no haber elementos aislados ni contenido funcional tratado como publicidad (`I=0`, `Bn=0`).
- **4** por haber dos aislados con jerarquía.
- **5** por no poder determinar si el elemento destacado correspondía a lo que la sección promueve (`P`).

Las primeras **59** corresponden a reglas incompletas; las otras cinco, a evidencia insuficiente para resolver `P`.

Nueve páginas tuvieron cinco puntajes y **ocho mantuvieron el mismo nivel**. C13 obtuvo 3, 4, 3, 4, 4. C06, C07, C09, C17 y R03 alternaron puntaje y abstención. En C09, C17, C20, C25 y R02 cambió el conjunto principal elegido.

Hubo **111/120** respuestas con evidencia insuficiente. No aparecieron casos positivos de contenido funcional tratado como publicidad (`Bn`), contenido importante presentado como auxiliar (`Cn`) ni tres o más aislados principales. Los niveles 0 y 1, y esas partes de la rúbrica, quedaron sin probar. Las verificaciones no encontraron contradicciones numéricas, pero eso no confirma que la interpretación visual sea correcta.

## Comprobaciones y archivos

Se aprobaron nueve pruebas de geometría, 13 de formato y validación de respuestas, cinco de reanudación y 28 del validador de mediciones. Las 64 mediciones fueron válidas y los campos de las siete skills fueron compatibles. Se comprobó que las medidas de los otros seis grupos siguieran iguales en las 64 páginas.

También se hicieron siete pruebas de integridad y cuatro de conservación de intentos, usando copias temporales alteradas. Se verificaron los **1.171 elementos** de los conjuntos, incluidos **212 candidatos de dos elementos** que antes se omitían. Las 24 entradas conservaron las mismas medidas de G4 y relaciones entre elementos al cambiar de formato.

El [informe](../pilotos/g4-2026-10-07-v3/INFORME.md), `evaluaciones.csv`, `resumen.csv`, la auditoría, la verificación y el sello están en la carpeta final. Las carpetas preliminares se conservan por separado.

## Qué falta para cerrar G4

Debemos acordar con Camilo las reglas que faltan y registrarlas antes de una nueva fase. También falta revisar la elección del conjunto principal, preparar casos separados para las situaciones que no aparecieron y comparar con los casos dorados consensuados y los expertos.

<details>
<summary>Comandos para repetir las comprobaciones</summary>

Estos comandos corresponden a la fase inicial. Para una ejecución nueva se debe usar otra carpeta. La fase final usó `--out pilotos/g4-2026-10-07-v3` y `--effort low`; la configuración intermedia registrada usaba v2 y low. El commit exacto de cada fase está en su manifiesto.

```bash
npm run test:g4
npm run test:pilot-g4
npm run pilot:g4 -- preparar --out pilotos/g4-2026-10-07 --measurements-version 1.0.6 --model gpt-6.1-sol --effort medium --concurrency 3
npm run pilot:g4 -- ejecutar --out pilotos/g4-2026-10-07 --only C02-r1
npm run pilot:g4 -- ejecutar --out pilotos/g4-2026-10-07
node scripts/report-g4-pilot.js pilotos/g4-2026-10-07
node scripts/verify-pilot-g4.js pilotos/g4-2026-10-07 --seal
node scripts/verify-pilot-g4.js pilotos/g4-2026-10-07 --verify-seal
```

</details>

Los informes y resúmenes se pueden volver a generar; las respuestas, entradas e instrucciones originales se mantienen protegidas por sus sellos.
