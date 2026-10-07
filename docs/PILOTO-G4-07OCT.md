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
