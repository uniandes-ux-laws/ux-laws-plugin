# Piloto real de G4 · 7 de octubre de 2026

## Registro previo

Objetivo: ejecutar la skill G4 sobre las **24 capturas de calibración selladas**, con
**cinco contextos independientes por página** (120 solicitudes). Es un piloto del
instrumento y su dispersión, no validación contra humanos. No usa el evaluador determinista
histórico, no modifica la propuesta formal ni reemplaza capturas por sus resultados.

Configuración fijada antes de puntuar: **gpt-6.1-sol**, **Codex CLI 0.160.0** y razonamiento
**medium**, la configuración de la fase final de G5. Tres solicitudes simultáneas.
Temperatura y top-p no están expuestos. La primera solicitud C02-r1 se ejecuta sola;
si cumple el transporte, cuenta entre las 120 y no se repite. No se cambia modelo ni
esfuerzo según la distribución.

Cada conversación nueva recibe solo **screenshot**, bloque G4 y geometría de padres/ids;
no recibe wireframe, resultados de otras corridas ni niveles humanos. El mismo prompt por
página se usa en las cinco repeticiones. Herramientas, conectores, web, instrucciones de
proyecto y configuración personal del evaluador están desactivados. Las solicitudes son
muestras estadísticas del evaluador sin herramientas, no agentes para implementar código.

La infraestructura conserva respuesta y traza originales, registra sesión y uso y añade
únicamente `run` a una copia. Guarda hashes de imágenes, nodos, entradas, prompts, rúbrica,
esquema, escala y ejecutor. La repetición se atribuye fuera del prompt. No corrige puntajes
ni transforma una respuesta incómoda en otra. Las fases se guardan en carpetas nuevas.

## Defectos demostrados antes del piloto

La medición 1.0.5 exigía tres miembros aunque la rúbrica declara dos; recortaba ocho conjuntos,
veinte miembros y doce candidatos por tipo; aceptaba texto/pseudoelementos como pares;
calculaba mediana par con el valor central superior; no comprobaba posición superior de
las franjas y contaba accionables por simple solapamiento. Esto se demuestra con código y
fixtures sin mirar una distribución de G4. La medición **1.0.6** corrige estos defectos.

Se declaran los límites de padre retenido/raíz virtual y cajas parciales. El proxy
`contraste_con_fondo` es distancia RGB al fondo global, **no contraste WCAG**. La franja
superior se operacionaliza en el cuarto superior, una convención geométrica declarada.
No se cambian otros grupos, umbrales ordinales, cortes de tolerancia ni archivos primarios.

**Defecto de cobertura de rúbrica, identificado antes de pedir niveles:** las anclas no
cubren I=0/Bn=0; dos aislados con jerarquía; ni I=1/P verdadero/Cn positivo. No se inventan
niveles para cerrarlas. Se permite una abstención explícita: score/trigger null, NA=false,
evidence_insufficient=true y motivo concreto; se guarda separada de puntajes y NA.
Con candidatos pero sin un conjunto equivalente certificado también se abstiene.
Una resolución prospectiva de las anclas requiere discusión y nueva fase registrada.

Los juicios identifican ids; la validación comprueba conteos, pertenencia, canales,
no duplicación por ancestro/descendiente, lectura de P y compatibilidad con las anclas
conservadas. No afirma validar semántica visual ni seleccionar el conjunto principal correcto.

## Análisis fijado

Distribución 0–4 entre puntajes aplicables, NA por separado, abstenciones por combinación,
respuestas inválidas, errores técnicos y pendientes. Por página: cinco salidas originales,
modas válidas (todas si hay empate), fracción modal, rango ordinal, selección principal y
triggers distintos. No se promedian niveles. Estabilidad requiere cinco respuestas válidas;
se informa tanto ese denominador como las 24 páginas del conjunto. Evidencia insuficiente
incluye abstenciones, con denominador de respuestas conformes.

Una abstención o respuesta inválida no se repite para obtener puntaje. Ante error técnico
se detiene la cola, se preserva el intento y no se presenta el piloto como terminado.
No se ajustan umbrales por frecuencias. Faltan consenso dorado y referencia experta;
no se inventan y no se afirma aprobación ética.

## Reproducción

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

El manifiesto fija el commit de código. El sello protege entradas y salidas primarias;
los informes y resúmenes son derivados regenerables. No se sobrescribe un experimento.

## Fase 2 · consumo y cambio de configuración, antes de puntuar

La fase inicial se detiene preventivamente: tras 27 respuestas el runtime informa
38 % de uso en la ventana de cinco horas, frente a 0 % antes de preparar el piloto.
Ese consumo no permite proyectar 120 solicitudes dentro del margen disponible.
Se deja terminar las solicitudes en curso, se conservan todos los juicios y se documenta
la interrupción; no se mezcla esa fase parcial con una nueva serie.

La fase 2 utiliza **gpt-6.1-sol, Codex CLI 0.160.0, razonamiento low**, tres solicitudes
simultáneas y otras 120 evaluaciones desde cero, en `pilotos/g4-2026-10-07-v2/`.
Se conserva medición 1.0.6, esquema, imágenes, rúbrica, anclas y análisis. El JSON del prompt
se escribe sin indentación y la geometría auxiliar de padres se codifica como pares
`[id,parentId]`; conserva el mismo árbol. Se identifica con `formato_prompt=compacto-v2`.
La primera solicitud C02-r1 vuelve a ejecutarse sola como parte de la nueva configuración.
**No se atribuyen diferencias únicamente al esfuerzo**, porque también cambia el formato
numérico del prompt. No se elige esta configuración por la distribución observada.

Usar los mismos comandos anteriores con `--out pilotos/g4-2026-10-07-v2` y `--effort low`.
El verificador conserva compatibilidad con el formato inicial; el ejecutor previo se
recupera del commit indicado en su manifiesto. No se sobrescriben respuestas ni se
reintentan abstenciones para fabricar puntajes.

## Configuración final · antes de solicitar puntajes

La carpeta v2 conserva un registro **sin ninguna solicitud ejecutada**. Antes de correr,
se completa la configuración de aislamiento con `model_instructions_file`: instrucciones
base específicas de evaluación en vez del contexto genérico de programación del runtime.
Esta opción está descrita en la [referencia oficial de configuración](https://developers.openai.com/codex/config-reference/), consultada el 7 de octubre. El texto íntegro se conserva como
`BASE-INSTRUCCIONES.md` y se fija por hash en el manifiesto. No habilita herramientas ni
reduce la rúbrica o los candidatos. Se conserva también la instrucción de desarrollador.

La serie final se registra en **`pilotos/g4-2026-10-07-v3/`**, con gpt-6.1-sol, CLI 0.160.0,
esfuerzo **low**, formato compacto-v2 y cinco contextos por cada una de las 24 capturas.
Este cambio se registra con cero evaluaciones de v2; ninguna respuesta se sustituye.
Las diferencias respecto de la fase inicial no se atribuyen exclusivamente al esfuerzo:
también cambia formato e instrucciones base. Las inferencias sobre estabilidad se limitan
a cada configuración. Para reproducir, usar los comandos con `--out pilotos/g4-2026-10-07-v3`
y `--effort low`. Rúbrica, esquema y mediciones de G4 siguen iguales.

Fase inicial conservada: 34 solicitudes terminadas, un puntaje válido, 33 abstenciones,
cero inválidos, cero errores técnicos y 86 pendientes. No es piloto terminado.

## Reanudación de la fase final · 7 de octubre, antes de volver a solicitar C18-r1

La cola se detuvo por límite de uso tras 71 intentos: 40 puntajes, 30 abstenciones y
un error técnico en **C18-r1**; 49 solicitudes no se iniciaron. La traza de C18-r1 tiene
thread.started, turn.started, error y turn.failed: **no hay respuesta, juicio ni uso de
una sesión completada**. El límite se renovó naturalmente antes de reanudar; no se
consume un reinicio gratuito ni se compran créditos.

Se conserva el intento íntegro en `intentos/C18-r1-intento1/` y sus hashes y atribución
en `REANUDACION-1.json`. Solo se vuelve a solicitar ese fallo sin juicio y las 49 pendientes:
50 solicitudes. `scripts/resume-g4-technical.js` rechaza archivar una respuesta presente,
un turno completado, una traza alterada, un puntaje, una abstención o un inválido.
El ejecutor, rúbrica, prompts, esquema, entradas, imágenes, modelo, esfuerzo y configuración
siguen siendo los fijados en el manifiesto final. No se reevalúa ninguno de los 70 juicios.
Se informa el error técnico histórico aparte, aunque la serie final quede completa.


## Resultado final verificado

**120/120 respuestas conformes**, todas las páginas con cinco contextos completados:
**56 puntajes, 64 abstenciones, cero NA, cero inválidos y cero pendientes**. La fase final
incluye 121 intentos: los 120 completados y el fallo técnico de uso sin juicio preservado.
El verificador comprobó 120 sesiones completadas distintas, más la sesión fallida archivada;
entradas, prompts, imágenes, respuestas, configuración y atribución coinciden por hash.
Se sellaron **540 archivos primarios** y los 256 archivos originales siguen intactos.

Distribución 0–4: **0, 0, 5, 32, 19**, denominador 56. Las abstenciones son 55 por I=0/Bn=0,
cuatro por dos aislados con jerarquía y cinco por P indeterminado. Las dos primeras son
**59 combinaciones sin ancla**; la última es evidencia indeterminada, no un defecto de
cobertura. No se convierten en nivel ni NA.

Nueve páginas tienen cinco puntajes; ocho conservan su nivel. C13 varía 3,4,3,4,4.
C06, C07, C09, C17 y R03 alternan puntaje y abstención. C09, C17, C20, C25 y R02 varían
selección principal. Hay **111/120** marcas de evidencia insuficiente. No hay juicios
positivos de Bn, Cn ni I≥3; esas ramas y los niveles 0/1 no quedaron ejercitados.
Cero contradicciones numéricas de ancla no prueba que los juicios visuales sean correctos.

Se corrigieron defectos de medición antes de pedir niveles, no por sus frecuencias.
QA: nueve pruebas de geometría, 13 de transporte, cinco de reanudación; 28 controles del
validador de mediciones; 64/64 mediciones válidas, siete skills con campos existentes;
comparación de los otros seis grupos en 64 páginas; siete controles de integridad en copias
más cuatro de archivo/reanudación, incluyendo mutaciones con hashes recalculados.
Los 1.171 miembros de conjuntos de las 24 entradas tienen ids, cajas y áreas verificados;
212 candidatos de dos miembros ya no se omiten. La comparación de formato confirma 24/24
bloques G4 y árboles de padres idénticos entre fases.

Informe: `pilotos/g4-2026-10-07-v3/INFORME.md`; detalle por solicitud: `evaluaciones.csv`;
resumen por página: `resumen.csv`; auditoría, verificación y sello en la misma carpeta.
Los datos preliminares no se mezclan. El registro v2 no contiene solicitudes.

**Para cerrar G4 metodológicamente:** discutir y preregistrar la resolución de combinaciones
sin ancla; precisar la selección principal y revisar los límites de pertenencia y recorte;
preparar casos auxiliares de Bn/Cn y competencia de aislados con criterio definido antes de
capturar/puntuar; completar consenso dorado y referencia experta. No se asignan niveles
humanos ficticios ni se cambia la propuesta formal o el corpus primario.
