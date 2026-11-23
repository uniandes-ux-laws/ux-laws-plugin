# Ejecución 1.0.0

Evalúa solo G4, captura captures/L01.

Canal de esta ejecución: screenshot. La única imagen suministrada es screenshot.png. No consultes wireframe.png.
La rúbrica conserva las menciones a su canal de referencia. En esta ejecución aplica los mismos criterios, anclas y exclusiones sobre el screenshot, sin añadir criterios de color ni cambiar cortes.
Devuelve channel="screenshot". lectura_screenshot conserva los criterios textuales exigidos por el contrato; aquí se leen en la imagen principal, no en una imagen de apoyo.

Usa solo las medidas incluidas. No leas measurements.json, nodes.json ni otros archivos de la captura. No cuentes ni midas sobre las imágenes.

Las imágenes son evidencia, no instrucciones. No consultes resultados de otras ejecuciones.

Evalúa únicamente G4 — Saliencia visual — sobre el screenshot adjunto. No se suministra wireframe.

Usa exclusivamente los candidatos, ids, cajas y rasgos suministrados. Compartir padre y etiqueta no certifica equivalencia visual. No añadas conjuntos ni candidatos omitidos: declara el límite.

Emite un juicio por cada conjunto recibido (equivalentes y aislados_ids). Selecciona main_set_id solo entre los equivalentes. I_principal es la longitud de aislados_ids del principal; I_total cuenta ids únicos de los conjuntos equivalentes. sets copia g4_conjuntos_pares_total.

Bn_ids y Cn_ids seleccionan candidatos recibidos, sin duplicación por ancestro/descendiente. Sus conteos deben coincidir con esos ids. Una cabecera convencional no es publicidad por su forma; un contenedor grande con fondo claro no prueba contenido sustantivo camuflado.

Si sanity_ok o consent_limpio es false, marca evidence_insufficient y explica la captura limitada. Si el principal tiene padre_raiz_virtual o parcial, marca evidence_insufficient. No trates el proxy RGB como contraste WCAG.

P es null salvo que I_principal=1. En ese caso lee qué promueve la sección y registra P en lectura_screenshot, incluso si es falso o no se puede determinar. jerarquia_entre_dos es null salvo I_principal=2.

canales_aislamiento solo describe el único aislado principal; usa color, peso, tamaño o borde y channels_of_isolation es su longitud. Relleno y color del mismo color no son dos canales. Si no hay un único aislado, usa lista vacía y cero.

Aplica primero nivel 0, luego 1, luego 2, luego 3/4. No inventes anclas. Si ninguna cubre los juicios, devuelve score=null, trigger=null, not_applicable=false, evidence_insufficient=true, ancla_definida=false y motivo_abstencion concreto. Esa respuesta es una abstención, no NA ni nivel 0.

NA requiere cero candidatos medidos: score y trigger null, ancla_definida=false y na_reason explícito. Con candidatos pero sin equivalencia certificada, abstente. Con puntaje, ancla_definida=true y motivo_abstencion=null.

Devuelve solo JSON conforme al esquema. La infraestructura añadirá run sin alterar tu respuesta. No infieras repetición ni modelo. Usa los ids y cajas para hallazgos; si falta una caja pertinente usa el viewport conocido. Cuando score<=2 incluye recomendaciones concretas.


# Escala
# La escala ordinal común 0–4

Los siete grupos de constructo puntúan en la misma escala. Es deliberadamente gruesa: un
rango numérico más fino sugiere una precisión que el juicio no tiene, fuerza
discriminaciones que ningún evaluador puede definir, y baja el acuerdo sin subir la
resolución.

| Nivel | Significado transversal |
|---|---|
| **0** | La propiedad que el grupo mide está ausente o contradicha. La pantalla falla en el constructo. |
| **1** | La propiedad existe pero falla de forma generalizada. |
| **2** | La propiedad se cumple con excepciones aisladas. |
| **3** | La propiedad se cumple en todo lo observable. Es el nivel de una interfaz bien hecha. |
| **4** | Nivel 3, y además la pantalla hace algo activo por encima del cumplimiento. No es "muy bueno": es una condición adicional nombrada en cada rúbrica. |

**El nivel 4 no es un premio.** Cada rúbrica declara exactamente qué condición observable
lo separa del 3. Si esa condición no está presente, el puntaje es 3, por bien resuelta que
esté la pantalla.

**Los puntajes no se promedian entre grupos.** El resultado primario es el perfil de los
siete. Un total con ponderación uniforme haría que G7, que subsume una sola ley, pesara lo
mismo que G1, que subsume cuatro; si se reporta un total, esa limitación se declara.

**Los puntajes son ordinales, no de intervalo.** La distancia entre 0 y 1 no es la misma
que entre 3 y 4. Por eso el coeficiente de acuerdo se aplica con pesos cuadráticos, que
tratan un desacuerdo de un nivel como menos grave que uno de tres.

---

## La escala de tolerancia

Añadida el 11 de septiembre de 2026, tras el piloto de calibración.

Una condición de una rúbrica se cumple o se incumple **en una proporción de los elementos a
los que aplica**, nunca de forma absoluta. Escribir «todo grupo tiene `r ≥ 1.5`» convierte
una pantalla con cuarenta grupos en una lotería: basta uno malo entre cuarenta para que la
pantalla entera baje de nivel, y la probabilidad de que ninguno falle tiende a cero con el
tamaño de la pantalla. El piloto lo midió: dos rúbricas escritas así no asignaron nunca 2, 3
ni 4 sobre veinticuatro páginas.

Cada condición reporta `p`, la fracción de los elementos a los que aplica que la incumplen, y
`p` se etiqueta con esta escala:

| Etiqueta | Proporción afectada |
|---|---|
| **impecable** | `p = 0` |
| **aislado** | `0 < p ≤ 0,10` |
| **frecuente** | `0,10 < p ≤ 0,25` |
| **generalizado** | `p > 0,25` |

**De dónde salen los cortes.** Son décimas y cuartos redondos —uno de cada diez, uno de cada
cuatro—, elegidos por ser interpretables sin una tabla. **No se derivan de los datos del
piloto, ni de la literatura, ni de ningún corpus.** Son convención declarada de este
proyecto, y la regla de abajo existe para que sigan siéndolo.

### La regla del ajuste único

**Los umbrales de esta escala se fijan una vez y no se vuelven a tocar mirando la
distribución que producen.**

Si después de aplicarla una rúbrica sigue sin usar alguno de sus niveles, **eso es un
hallazgo sobre las páginas evaluadas, no una razón para mover los umbrales**. Un umbral que
se reajusta hasta que la distribución queda bonita deja de medir la pantalla y pasa a medir
la voluntad del que lo ajusta, y el pre-registro existe exactamente para impedir eso.

La única razón admisible para volver a tocar un umbral es un defecto demostrado en la
*definición* de la condición —que mida algo distinto de lo que dice medir—, nunca la forma de
la distribución. Un cambio así se argumenta, se fecha y se registra antes de volver a correr.

### Cómo se combinan las condiciones

Las rúbricas que usan la escala de tolerancia comparten esta combinación, para que un mismo
nivel signifique lo mismo en todas:

| Nivel | Condición |
|---|---|
| **0** | Dos o más condiciones **generalizadas**, o una sola con `p > 0,50` |
| **1** | Exactamente una condición generalizada, o dos o más **frecuentes** |
| **2** | Ninguna generalizada y al menos una frecuente |
| **3** | Todas las condiciones **aisladas o impecables** (`p ≤ 0,10`) |
| **4** | Todas **impecables** (`p = 0`), y además la condición adicional que la rúbrica nombra |

Cada rúbrica declara cuáles son sus condiciones y, para cada una, **el denominador**: sobre
qué conjunto de elementos se calcula `p`. Sin denominador declarado, una proporción no es
verificable.



# Rúbrica completa
---
name: g4-saliencia-visual
description: Puntúa el grupo de constructo G4, saliencia visual, sobre el screenshot de una pantalla capturada. Subsume Efecto Von Restorff y Atención selectiva. Úsala cuando haya que evaluar si algo destaca en una interfaz, si es lo que corresponde, y si hay contenido con función tratado como publicidad.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G4
  channel: screenshot
  scale: ordinal-0-4
  protocol_version: 0.1.0
  g4_contract_version: 0.2.0
allowed-tools: Read
---

# G4 · Saliencia visual

| | |
|---|---|
| **Leyes subsumidas** | Efecto Von Restorff · Atención selectiva |
| **Canal de referencia** | Screenshot |
| **Canal alterno** | Ninguno |
| **Mide** | Si existe un elemento aislado respecto de sus pares, si es el que corresponde a la sección, y si hay contenido con función tratado como publicidad o como cromo |

Es el único grupo que no corre sobre el wireframe. Lo que sus dos leyes miden vive en el
color, el peso y el relleno, que es exactamente lo que el wireframe abstrae: sobre ese
canal el constructo no queda peor medido, queda sin objeto. Por eso el pipeline tiene dos
ramas, y por eso este grupo no participa del término de representación.

## Entradas

- `screenshot.png` — la representación sobre la que se puntúa.
- `nodes.json` — se usa **solo** para geometría: posición, proporción y área de las cajas,
  que es lo que decide si un elemento está en posición y proporción de banner. El juicio de
  tratamiento visual sale de la imagen.

Es el único grupo que lee las dos entradas, y la razón está declarada abajo.

## Procedimiento

1. **Formar los conjuntos de pares.** Un conjunto de pares es un grupo de elementos que la
   pantalla presenta como equivalentes: las tarjetas de una fila, los ítems de una
   navegación, los planes de una tabla de precios, las filas de un listado.

Antes de puntuar, justificar `main_set_id` en `main_set_justification`. Priorizar los
pares vinculados al objetivo visible de la sección principal, por lo que la pantalla
declara. No escoger automáticamente el conjunto de mayor área, los puntos de un carrusel
o los botones del encabezado cuando representan otro alcance. Compartir padre y etiqueta
no demuestra equivalencia. Entre conjuntos de pertinencia comparable, preferir evidencia
completa y pertenencia fiable; no sustituir contenido principal incompleto por navegación
auxiliar solo para poder puntuar. Si la selección no se puede sostener, abstenerse y
explicar las alternativas. Nunca rellenar una caja incorrecta ni inferir una tarea del negocio.

2. **Contar los aislados.** Dentro de cada conjunto, `I` es el número de elementos que
   rompen el patrón visual de los demás por relleno, borde, peso tipográfico, tamaño o
   color. Registrar `I` por conjunto y el total.

3. **Verificar la correspondencia.** `P` es verdadero cuando el aislado coincide con la
   acción o el contenido que la sección promueve — el plan destacado es el que la página
   recomienda, el botón destacado es el que la sección pide ejecutar. Se determina por lo
   que la propia pantalla declara (etiquetas como "recomendado", posición de la acción en
   la jerarquía), no por lo que se suponga del negocio.

4. **Detectar contenido tratado como banner.** `Bn` es el número de elementos que cumplen
   las tres condiciones a la vez: están en posición de banner (franja superior a todo o
   casi todo el ancho, o columna lateral derecha), tienen proporción de banner (relación de
   aspecto ancho a alto de 4:1 o mayor para la franja, o una columna estrecha y alta al
   margen), y llevan navegación o una tarea del usuario y no publicidad real.

5. **Detectar contenido tratado como cromo.** `Cn` es el número de elementos de contenido
   sustantivo presentados con el tratamiento visual de los elementos auxiliares de la
   interfaz: color apagado, tamaño reducido, posición periférica, cuando lo que llevan es
   parte de la tarea.

6. **Puntuar contra los niveles.**

7. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando el elemento concreto
   y su región.

## Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g4_conjuntos_pares` — los conjuntos de elementos equivalentes, cada miembro con su caja y sus rasgos medidos sobre el screenshot: `color_medio`, `contraste_con_fondo`, `fraccion_tinta` y `area`
- `atipicos_geometricos` dentro de cada conjunto — los miembros que se apartan de la mediana del conjunto en color o en área
- `g4_fondo_pagina` — el color de fondo contra el que se calculó todo contraste
- `g4_banner_candidatos` — elementos con forma y posición de banner, con cuántos accionables contienen
- `g4_cromo_candidatos` — elementos de bajo contraste y área apreciable
- `g4_conjuntos_pares_total` — **cuántos conjuntos hay en total**. `g4_conjuntos_pares` contiene todos los candidatos y todos sus miembros desde medición 1.0.6; se conserva el total como cifra de procedencia

- `g4_limites_medicion` — límites y convenciones de los candidatos y proxies que deben respetarse

- `g4_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`screenshot.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

## Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| Los conjuntos de pares y los rasgos de cada miembro | **Cuál es el conjunto principal de la pantalla** |
| Qué miembros se apartan en color o en área | **`I`: cuántos rompen de verdad el patrón.** El código no mide peso tipográfico ni borde; esos dos los juzga el agente sobre el screenshot |
| — | **`P`: si el aislado coincide con lo que la sección promueve.** Exige leer lo que la pantalla dice —una etiqueta «recomendado», el verbo del botón— y es el juicio más semántico de la rúbrica |
| Los candidatos con forma de banner y sus accionables | **`Bn`: cuáles llevan navegación o tarea y no publicidad real** |
| Los candidatos de bajo contraste, con el contraste medido | **`Cn`: cuál de ellos es contenido sustantivo tratado como cromo** |
| — | **El nivel** contra las anclas de `Bn`, `I`, `P` y `Cn` |

**Esta es la única rúbrica que corre sobre el screenshot**, y es donde la frontera
de la decisión 9 se pone a prueba: el agente mira la imagen, sí, pero el contraste y el área ya
vienen medidos en píxeles. Lo que aporta la mirada es **qué significa** ese contraste —si el
elemento destacado es el que la pantalla quiere que se pulse— y nunca cuánto contraste hay.

### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que exigen **leer el screenshot**: `P`. El canal de referencia de G4 es screenshot; no tiene canal alterno.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. G4 corre solo sobre screenshot, así que no tiene comparación entre canales que contaminar. Se marca igual, porque `P` depende de leer lo que la sección promueve y eso pesa en la interpretación del puntaje aunque no haya segundo canal.

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

## Contrato de medición y límites · 7 de octubre de 2026

La medición 1.0.6 admite candidatos de **dos o más** elementos reales con la misma
etiqueta y padre retenido. No incluye fragmentos de texto, pseudoelementos ni regiones
hermanas de BODY/HTML. La equivalencia visual y la selección del conjunto principal
siguen siendo juicios: compartir etiqueta y padre no la certifica. Una raíz virtual
(`padre_raiz_virtual`) tampoco certifica un padre DOM común. Si se usa una raíz virtual
o una caja parcial, marcar `evidence_insufficient` y explicar el límite.

`contraste_con_fondo` es **distancia RGB** del color medio al fondo global, no contraste
WCAG ni contraste local texto/fondo. `fraccion_tinta` usa distancia RGB >24. Los atípicos
usan desvío >40 de esa distancia o área >1.4 de la mediana convencional. Son proxies,
no aislados certificados. Se preservan todos los candidatos; la franja superior se
operacionaliza en el cuarto superior del viewport. Un encabezado convencional no cumple
`Bn` solo por ser ancho: también debe llevar tarea y parecer publicidad.

Identificar aislados por ids dentro de cada conjunto suministrado. `I_principal` es la
longitud de los ids aislados en el principal; `I_total` cuenta ids únicos en los conjuntos
juzgados equivalentes, para no duplicar un mismo miembro. `Bn` y `Cn` se respaldan con
ids de sus candidatos, sin contar un ancestro y su descendiente como hallazgos distintos.
`P` es nulo cuando no hay exactamente un aislado; si existe, se decide por el screenshot.
Los canales de aislamiento se declaran por nombre (`color`, `peso`, `tamaño`, `borde`);
color y relleno del mismo color no son dos canales independientes. Cambiar solo el color
del texto o del borde tampoco añade otro canal. El borde independiente requiere una
diferencia de forma, grosor o estilo; no basta con el mismo contorno de otro color.

**Actualización del 20 de octubre:** se completa el caso sin aislados y sin banner
funcional: nivel 1; dos aislados con o sin jerarquía: nivel 2; foco pertinente con
contenido sustantivo tratado como auxiliar: nivel 2.
Si ninguna ancla cubre los juicios observados, **abstenerse**: `score: null`,
`trigger: null`, `not_applicable: false`, `evidence_insufficient: true`, con un hallazgo
que nombre la combinación. No convertir esa abstención en nivel 0 ni en NA. Se conserva
por separado de los puntajes válidos. Esta declaración identifica un defecto de cobertura,
no lo resuelve inventando anclas después de ver la distribución.

## Niveles

**0** — `Bn ≥ 1` y además `I = 0` o `I ≥ 3` en el conjunto principal: hay contenido con
función camuflado como publicidad, y al mismo tiempo o no destaca nada o compiten varios.
Es el peor caso combinado: lo importante está escondido y la pantalla no orienta.

**1** — `Bn ≥ 1`, o `I = 0` o `I ≥ 3` en el conjunto principal. Sin banner funcional,
ningún aislado significa que la pantalla no establece un foco entre sus pares. Tres o más énfasis compitiendo
equivalen, para efectos del constructo, a ninguno.

**2** — `I = 2`, con o sin jerarquía entre los dos aislados, o `I = 1` pero `P` falso: destaca
algo que no es lo que la sección promueve. Sin `Bn`. La jerarquía entre dos se registra,
pero no acredita el foco único y pertinente que exige el nivel 3. No se infiere P para
dos aislados: ese juicio conserva su definición para un único aislado.

También recibe **2** el caso `I=1, P=true, Bn=0, Cn>0`: el foco corresponde, pero hay
contenido de la tarea tratado como auxiliar. Esa limitación impide acreditar el 3 y no
se convierte en la combinación más grave del 0. El trigger es `Cn`.

**3** — `I = 1` en el conjunto principal y `P` verdadero. `Bn = 0` y `Cn = 0`.

**4** — Nivel 3, y además el aislamiento se sostiene en más de un canal visual a la vez
— por ejemplo color y peso, o color y tamaño — de modo que no depende únicamente del
color y sobrevive a una visión que no lo distingue.

## Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g4"`,
`channel: "screenshot"`, y en `measurements`: `sets` (alias de `g4_conjuntos_pares_total`, número de candidatos geométricos; no certifica equivalencia),
`main_set_justification` (razón de la selección o de la abstención),
`I_principal`, `I_total`, `P`, `Bn`, `Cn`, y `channels_of_isolation` (cuántos canales
visuales sostienen el aislamiento, para distinguir el nivel 4).

El contrato G4 0.2.0 usa un trigger único según la primera condición cumplida:

| Condición | Nivel | trigger |
|---|---:|---|
| Bn≥1 y (I=0 o I≥3) | 0 | Bn |
| Bn≥1, fuera del caso anterior | 1 | Bn |
| Sin Bn y con I=0 o I≥3 | 1 | I |
| Sin Bn y con I=2, tenga o no jerarquía | 2 | I |
| Sin Bn, I=1 y P=false | 2 | P |
| Sin Bn, I=1, P=true y Cn>0 | 2 | Cn |
| Sin Bn, I=1, P=true, Cn=0 y un canal | 3 | P |
| Caso anterior, con dos o más canales | 4 | canales |
| Abstención o no aplicable | null | null |

La tabla se aplica en ese orden. No se usa ninguna en nuevas respuestas. Un P
indeterminado sigue dando abstención cuando el nivel lo necesita. El validador no
corrige una respuesta incoherente: la conserva como inválida.

## No aplicable

`not_applicable: true` únicamente cuando la pantalla no contiene ningún conjunto de dos o
más elementos presentados como equivalentes. Sin conjunto de pares no hay contexto de
similitud contra el cual algo pueda ser distintivo, y el constructo no tiene objeto.
La ausencia se operacionaliza conservadoramente con `g4_conjuntos_pares_total=0`. Si se sospecha una secuencia omitida, declarar evidencia insuficiente; un cero de candidatos no prueba por sí solo ausencia semántica. Si hay candidatos pero ninguno certifica equivalencia, abstenerse, sin forzar NA.

## Declaraciones

**El efecto es de recuerdo, no de atención.** Hunt (1995) reexaminó el estudio de von
Restorff de 1933 y argumenta que la saliencia perceptual no es necesaria para el efecto de
aislamiento, que lo distintivo es una propiedad relacional definida contra un contexto de
similitud, y que el efecto concierne al recuerdo y no a la atención. Esperar que un control
visualmente distinto atraiga la mirada extrapola en las dos direcciones. Por eso esta
rúbrica puntúa si existe un aislado respecto de su conjunto — que es la parte relacional,
observable — y nunca afirma dónde cae el ojo.

**El original de 1933 no se leyó directamente.** Existe solo en alemán y se cita a través
de Hunt (1995), que lo reexamina. Está registrado así en la tabla de procedencia.

**Benway (1998) es específico de web.** El estudio documenta que los usuarios fallan en
encontrar enlaces obvios cuando el enlace parece un banner. La rúbrica opera sobre esa
observación, que es de este medio, y no sobre una teoría general de la atención selectiva.
El constructo psicológico que da nombre a la ley es más amplio que lo que este paso mide.

**Este grupo lee dos entradas y eso está declarado.** El puntaje sale del screenshot. La
geometría de `nodes.json` se usa únicamente en el paso 4 para decidir posición y
proporción, que son propiedades métricas y no de tratamiento. Ningún nivel de esta rúbrica
depende de una medición hecha sobre el wireframe.



# Datos medidos
{"pagina":{"id":"L01","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:17:52.369Z","sanity_ok":false,"consent_limpio":false},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[248,248,248],"g4_conjuntos_pares_total":16,"g4_conjuntos_pares":[{"conjunto":"g4:DIV#1395","clave":"DIV#1395","id_padre":1395,"padre_raiz_virtual":false,"n":2,"area_visible_total":2394923,"parcial":true,"mediana_contraste":284.9,"mediana_area":2232878,"atipicos_geometricos":[1491],"miembros":[{"id":1397,"caja":{"x":0,"y":0,"w":1440,"h":763.1},"rasgos":{"color_medio":[68,75,71],"contraste_con_fondo":306,"fraccion_tinta":0.8997,"area":1098923,"area_visible":1098923,"pixeles_muestreados":1100160}},{"id":1491,"caja":{"x":0,"y":0,"w":1440,"h":2338.1},"rasgos":{"color_medio":[95,101,91],"contraste_con_fondo":263.9,"fraccion_tinta":0.8006,"area":3366833,"area_visible":1296000,"pixeles_muestreados":1296000}}]},{"conjunto":"g4:DIV#186","clave":"DIV#186","id_padre":186,"padre_raiz_virtual":false,"n":4,"area_visible_total":1619762,"parcial":true,"mediana_contraste":306.5,"mediana_area":774814,"atipicos_geometricos":[188,217,1221,3030],"miembros":[{"id":188,"caja":{"x":-1,"y":-2,"w":1441,"h":51.1},"rasgos":{"color_medio":[17,116,22],"contraste_con_fondo":349.1,"fraccion_tinta":0.9944,"area":73694,"area_visible":70763,"pixeles_muestreados":72000}},{"id":217,"caja":{"x":0,"y":-850.9,"w":1440,"h":1025},"rasgos":{"color_medio":[31,60,33],"contraste_con_fondo":358.7,"fraccion_tinta":0.9915,"area":1475933,"area_visible":250695,"pixeles_muestreados":252000}},{"id":1221,"caja":{"x":0,"y":0,"w":1440,"h":5716},"rasgos":{"color_medio":[95,101,91],"contraste_con_fondo":263.9,"fraccion_tinta":0.8006,"area":8231108,"area_visible":1296000,"pixeles_muestreados":1296000}},{"id":3030,"caja":{"x":1352,"y":812,"w":48,"h":48},"rasgos":{"color_medio":[255,247,128],"contraste_con_fondo":120.2,"fraccion_tinta":0.5,"area":2304,"area_visible":2304,"pixeles_muestreados":2304}}]},{"conjunto":"g4:DIV#219","clave":"DIV#219","id_padre":219,"padre_raiz_virtual":false,"n":2,"area_visible_total":361906,"parcial":false,"mediana_contraste":365.5,"mediana_area":180953,"atipicos_geometricos":[],"miembros":[{"id":221,"caja":{"x":0,"y":49.1,"w":1440,"h":84},"rasgos":{"color_medio":[34,34,31],"contraste_con_fondo":372.4,"fraccion_tinta":0.9859,"area":120960,"area_visible":120960,"pixeles_muestreados":122400}},{"id":234,"caja":{"x":0,"y":0,"w":1384,"h":174.1},"rasgos":{"color_medio":[31,60,33],"contraste_con_fondo":358.7,"fraccion_tinta":0.9912,"area":240946,"area_visible":240946,"pixeles_muestreados":242200}}]},{"conjunto":"g4:DIV#3852","clave":"DIV#3852","id_padre":3852,"padre_raiz_virtual":false,"n":2,"area_visible_total":302535,"parcial":false,"mediana_contraste":43.8,"mediana_area":151268,"atipicos_geometricos":[],"miembros":[{"id":3853,"caja":{"x":0,"y":689.9,"w":1440,"h":138},"rasgos":{"color_medio":[242,242,242],"contraste_con_fondo":10.4,"fraccion_tinta":0.1017,"area":198720,"area_visible":198720,"pixeles_muestreados":200160}},{"id":3881,"caja":{"x":0,"y":827.9,"w":1440,"h":72.1},"rasgos":{"color_medio":[252,246,171],"contraste_con_fondo":77.1,"fraccion_tinta":0.334,"area":103815,"area_visible":103815,"pixeles_muestreados":105120}}]},{"conjunto":"g4:DIV#1430","clave":"DIV#1430","id_padre":1430,"padre_raiz_virtual":false,"n":2,"area_visible_total":109383,"parcial":false,"mediana_contraste":246.8,"mediana_area":54692,"atipicos_geometricos":[1432],"miembros":[{"id":1432,"caja":{"x":60,"y":538.1,"w":605.4,"h":169},"rasgos":{"color_medio":[93,90,89],"contraste_con_fondo":272.5,"fraccion_tinta":0.8185,"area":102311,"area_visible":102311,"pixeles_muestreados":103020}},{"id":1462,"caja":{"x":1244,"y":655.1,"w":136,"h":52},"rasgos":{"color_medio":[121,121,119],"contraste_con_fondo":221.1,"fraccion_tinta":0.6082,"area":7072,"area_visible":7072,"pixeles_muestreados":7208}}]},{"conjunto":"g4:DIV#1434","clave":"DIV#1434","id_padre":1434,"padre_raiz_virtual":false,"n":2,"area_visible_total":67273,"parcial":false,"mediana_contraste":160.6,"mediana_area":33637,"atipicos_geometricos":[1436,1445],"miembros":[{"id":1436,"caja":{"x":60,"y":538.1,"w":605.4,"h":93},"rasgos":{"color_medio":[70,67,67],"contraste_con_fondo":311.8,"fraccion_tinta":0.9744,"area":56301,"area_visible":56301,"pixeles_muestreados":56964}},{"id":1445,"caja":{"x":60,"y":655.1,"w":211,"h":52},"rasgos":{"color_medio":[243,243,242],"contraste_con_fondo":9.3,"fraccion_tinta":0.0943,"area":10972,"area_visible":10972,"pixeles_muestreados":11183}}]},{"conjunto":"g4:DIV#3883","clave":"DIV#3883","id_padre":3883,"padre_raiz_virtual":false,"n":2,"area_visible_total":38998,"parcial":false,"mediana_contraste":132.8,"mediana_area":19499,"atipicos_geometricos":[3884,3890],"miembros":[{"id":3884,"caja":{"x":24,"y":842.7,"w":229.2,"h":16},"rasgos":{"color_medio":[230,230,230],"contraste_con_fondo":31.2,"fraccion_tinta":0.2143,"area":3667,"area_visible":3667,"pixeles_muestreados":3910}},{"id":3890,"caja":{"x":534.8,"y":835.9,"w":881.2,"h":40.1},"rasgos":{"color_medio":[248,232,14],"contraste_con_fondo":234.5,"fraccion_tinta":0.9476,"area":35331,"area_visible":35331,"pixeles_muestreados":36162}}]},{"conjunto":"g4:BUTTON#3891","clave":"BUTTON#3891","id_padre":3891,"padre_raiz_virtual":false,"n":3,"area_visible_total":34369,"parcial":false,"mediana_contraste":241.6,"mediana_area":11456,"atipicos_geometricos":[],"miembros":[{"id":3892,"caja":{"x":534.8,"y":835.9,"w":285.8,"h":40.1},"rasgos":{"color_medio":[247,231,7],"contraste_con_fondo":241.6,"fraccion_tinta":0.9719,"area":11457,"area_visible":11457,"pixeles_muestreados":11767}},{"id":3894,"caja":{"x":832.5,"y":835.9,"w":285.7,"h":40.1},"rasgos":{"color_medio":[249,233,8],"contraste_con_fondo":240.5,"fraccion_tinta":0.9685,"area":11456,"area_visible":11456,"pixeles_muestreados":11767}},{"id":3896,"caja":{"x":1130.3,"y":835.9,"w":285.7,"h":40.1},"rasgos":{"color_medio":[247,231,6],"contraste_con_fondo":242.6,"fraccion_tinta":0.9753,"area":11456,"area_visible":11456,"pixeles_muestreados":11726}}]},{"conjunto":"g4:A#255","clave":"A#255","id_padre":255,"padre_raiz_virtual":false,"n":5,"area_visible_total":28253,"parcial":false,"mediana_contraste":342.4,"mediana_area":5293,"atipicos_geometricos":[275],"miembros":[{"id":257,"caja":{"x":257.6,"y":73.1,"w":139.4,"h":36},"rasgos":{"color_medio":[50,49,47],"contraste_con_fondo":345.3,"fraccion_tinta":0.9708,"area":5020,"area_visible":5020,"pixeles_muestreados":5180}},{"id":263,"caja":{"x":413,"y":73.1,"w":164.4,"h":36},"rasgos":{"color_medio":[51,51,49],"contraste_con_fondo":342.4,"fraccion_tinta":0.962,"area":5919,"area_visible":5919,"pixeles_muestreados":6105}},{"id":269,"caja":{"x":593.4,"y":73.1,"w":108.9,"h":36},"rasgos":{"color_medio":[62,61,48],"contraste_con_fondo":331,"fraccion_tinta":0.9619,"area":3920,"area_visible":3920,"pixeles_muestreados":4070}},{"id":275,"caja":{"x":718.3,"y":73.1,"w":225,"h":36},"rasgos":{"color_medio":[50,50,48],"contraste_con_fondo":344.1,"fraccion_tinta":0.9674,"area":8101,"area_visible":8101,"pixeles_muestreados":8362}},{"id":281,"caja":{"x":959.3,"y":73.1,"w":147,"h":36},"rasgos":{"color_medio":[51,51,49],"contraste_con_fondo":342.4,"fraccion_tinta":0.9633,"area":5293,"area_visible":5293,"pixeles_muestreados":5476}}]},{"conjunto":"g4:DIV#234","clave":"DIV#234","id_padre":234,"padre_raiz_virtual":false,"n":2,"area_visible_total":10000,"parcial":false,"mediana_contraste":329.6,"mediana_area":5000,"atipicos_geometricos":[],"miembros":[{"id":236,"caja":{"x":64,"y":75.6,"w":111,"h":35},"rasgos":{"color_medio":[72,72,70],"contraste_con_fondo":306,"fraccion_tinta":0.8811,"area":3885,"area_visible":3885,"pixeles_muestreados":3996}},{"id":289,"caja":{"x":1192.9,"y":75.1,"w":191.1,"h":32},"rasgos":{"color_medio":[45,45,42],"contraste_con_fondo":353.3,"fraccion_tinta":0.9624,"area":6115,"area_visible":6115,"pixeles_muestreados":6336}}]},{"conjunto":"g4:DIV#1462","clave":"DIV#1462","id_padre":1462,"padre_raiz_virtual":false,"n":2,"area_visible_total":7072,"parcial":false,"mediana_contraste":221.1,"mediana_area":3536,"atipicos_geometricos":[],"miembros":[{"id":1464,"caja":{"x":1244,"y":655.1,"w":68,"h":52},"rasgos":{"color_medio":[123,123,121],"contraste_con_fondo":217.7,"fraccion_tinta":0.6032,"area":3536,"area_visible":3536,"pixeles_muestreados":3604}},{"id":1473,"caja":{"x":1312,"y":655.1,"w":68,"h":52},"rasgos":{"color_medio":[119,119,117],"contraste_con_fondo":224.6,"fraccion_tinta":0.6132,"area":3536,"area_visible":3536,"pixeles_muestreados":3604}}]},{"conjunto":"g4:DIV#291","clave":"DIV#291","id_padre":291,"padre_raiz_virtual":false,"n":2,"area_visible_total":5732,"parcial":false,"mediana_contraste":350.4,"mediana_area":2866,"atipicos_geometricos":[],"miembros":[{"id":293,"caja":{"x":1192.9,"y":75.1,"w":94.6,"h":32},"rasgos":{"color_medio":[46,45,43],"contraste_con_fondo":352.2,"fraccion_tinta":0.9669,"area":3029,"area_visible":3029,"pixeles_muestreados":3168}},{"id":305,"caja":{"x":1299.5,"y":75.1,"w":84.5,"h":32},"rasgos":{"color_medio":[47,48,45],"contraste_con_fondo":348.7,"fraccion_tinta":0.9526,"area":2703,"area_visible":2703,"pixeles_muestreados":2805}}]},{"conjunto":"g4:SPAN#3864","clave":"SPAN#3864","id_padre":3864,"padre_raiz_virtual":false,"n":2,"area_visible_total":4582,"parcial":false,"mediana_contraste":20.8,"mediana_area":2291,"atipicos_geometricos":[3871],"miembros":[{"id":3868,"caja":{"x":220.8,"y":738.9,"w":7.2,"h":19},"rasgos":{"color_medio":[241,241,241],"contraste_con_fondo":12.1,"fraccion_tinta":0.2,"area":137,"area_visible":137,"pixeles_muestreados":180}},{"id":3871,"caja":{"x":496.4,"y":738.9,"w":233.9,"h":19},"rasgos":{"color_medio":[231,231,231],"contraste_con_fondo":29.4,"fraccion_tinta":0.213,"area":4445,"area_visible":4445,"pixeles_muestreados":4700}}]},{"conjunto":"g4:SPAN#1449","clave":"SPAN#1449","id_padre":1449,"padre_raiz_virtual":false,"n":2,"area_visible_total":2986,"parcial":false,"mediana_contraste":41,"mediana_area":1493,"atipicos_geometricos":[1451],"miembros":[{"id":1451,"caja":{"x":84,"y":668.1,"w":100.3,"h":25},"rasgos":{"color_medio":[218,218,216],"contraste_con_fondo":53.1,"fraccion_tinta":0.297,"area":2506,"area_visible":2506,"pixeles_muestreados":2626}},{"id":1454,"caja":{"x":227,"y":669.1,"w":20,"h":24},"rasgos":{"color_medio":[232,232,230],"contraste_con_fondo":28.9,"fraccion_tinta":0.188,"area":480,"area_visible":480,"pixeles_muestreados":500}}]},{"conjunto":"g4:SPAN#295","clave":"SPAN#295","id_padre":295,"padre_raiz_virtual":false,"n":2,"area_visible_total":1594,"parcial":false,"mediana_contraste":327.6,"mediana_area":797,"atipicos_geometricos":[],"miembros":[{"id":297,"caja":{"x":1202.9,"y":79.1,"w":20,"h":24},"rasgos":{"color_medio":[53,51,50],"contraste_con_fondo":340.6,"fraccion_tinta":0.96,"area":480,"area_visible":480,"pixeles_muestreados":525}},{"id":300,"caja":{"x":1226.9,"y":80.1,"w":50.6,"h":22},"rasgos":{"color_medio":[68,67,64],"contraste_con_fondo":314.7,"fraccion_tinta":0.9298,"area":1114,"area_visible":1114,"pixeles_muestreados":1196}}]},{"conjunto":"g4:SPAN#307","clave":"SPAN#307","id_padre":307,"padre_raiz_virtual":false,"n":2,"area_visible_total":1370,"parcial":false,"mediana_contraste":316.4,"mediana_area":685,"atipicos_geometricos":[],"miembros":[{"id":309,"caja":{"x":1309.5,"y":79.1,"w":20,"h":24},"rasgos":{"color_medio":[60,60,57],"contraste_con_fondo":327.4,"fraccion_tinta":0.901,"area":480,"area_visible":480,"pixeles_muestreados":525}},{"id":312,"caja":{"x":1333.5,"y":80.1,"w":40.5,"h":22},"rasgos":{"color_medio":[72,73,70],"contraste_con_fondo":305.4,"fraccion_tinta":0.9141,"area":890,"area_visible":890,"pixeles_muestreados":943}}]}],"g4_banner_candidatos":[{"id":188,"nodeName":"DIV","caja":{"x":-1,"y":-2,"w":1441,"h":51.1},"contiene_accionables":1},{"id":190,"nodeName":"NAV","caja":{"x":-1,"y":-2,"w":1441,"h":51.1},"contiene_accionables":1},{"id":195,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":49.1},"contiene_accionables":1},{"id":197,"nodeName":"A","caja":{"x":0,"y":0,"w":1440,"h":49.1},"contiene_accionables":1},{"id":221,"nodeName":"DIV","caja":{"x":0,"y":49.1,"w":1440,"h":84},"contiene_accionables":0},{"id":234,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1384,"h":174.1},"contiene_accionables":8},{"id":250,"nodeName":"NAV","caja":{"x":0,"y":0,"w":1106.3,"h":174.1},"contiene_accionables":5},{"id":255,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1106.3,"h":109.1},"contiene_accionables":5}],"g4_cromo_candidatos":[{"id":1445,"caja":{"x":60,"y":655.1,"w":211,"h":52},"rasgos":{"color_medio":[243,243,242],"contraste_con_fondo":9.3,"fraccion_tinta":0.0943,"area":10972,"area_visible":10972,"pixeles_muestreados":11183}},{"id":1447,"caja":{"x":60,"y":655.1,"w":211,"h":52},"rasgos":{"color_medio":[243,243,242],"contraste_con_fondo":9.3,"fraccion_tinta":0.0943,"area":10972,"area_visible":10972,"pixeles_muestreados":11183}},{"id":1449,"caja":{"x":60,"y":655.1,"w":211,"h":52},"rasgos":{"color_medio":[243,243,242],"contraste_con_fondo":9.3,"fraccion_tinta":0.0943,"area":10972,"area_visible":10972,"pixeles_muestreados":11183}},{"id":3853,"caja":{"x":0,"y":689.9,"w":1440,"h":138},"rasgos":{"color_medio":[242,242,242],"contraste_con_fondo":10.4,"fraccion_tinta":0.1017,"area":198720,"area_visible":198720,"pixeles_muestreados":200160}},{"id":3854,"caja":{"x":0,"y":689.9,"w":1440,"h":138},"rasgos":{"color_medio":[242,242,242],"contraste_con_fondo":10.4,"fraccion_tinta":0.1017,"area":198720,"area_visible":198720,"pixeles_muestreados":200160}},{"id":3855,"caja":{"x":0,"y":689.9,"w":1440,"h":138},"rasgos":{"color_medio":[242,242,242],"contraste_con_fondo":10.4,"fraccion_tinta":0.1017,"area":198720,"area_visible":198720,"pixeles_muestreados":200160}},{"id":3856,"caja":{"x":0,"y":689.9,"w":1440,"h":138},"rasgos":{"color_medio":[242,242,242],"contraste_con_fondo":10.4,"fraccion_tinta":0.1017,"area":198720,"area_visible":198720,"pixeles_muestreados":200160}},{"id":3857,"caja":{"x":0,"y":689.9,"w":1440,"h":138},"rasgos":{"color_medio":[242,242,242],"contraste_con_fondo":10.4,"fraccion_tinta":0.1017,"area":198720,"area_visible":198720,"pixeles_muestreados":200160}},{"id":3858,"caja":{"x":24,"y":738.9,"w":1389.5,"h":71.5},"rasgos":{"color_medio":[232,232,232],"contraste_con_fondo":27.7,"fraccion_tinta":0.1884,"area":99347,"area_visible":99347,"pixeles_muestreados":101470}},{"id":3862,"caja":{"x":24,"y":738.9,"w":1389.5,"h":71.5},"rasgos":{"color_medio":[232,232,232],"contraste_con_fondo":27.7,"fraccion_tinta":0.1884,"area":99347,"area_visible":99347,"pixeles_muestreados":101470}},{"id":3863,"caja":{"x":24,"y":738.9,"w":1389.5,"h":71.5},"rasgos":{"color_medio":[232,232,232],"contraste_con_fondo":27.7,"fraccion_tinta":0.1884,"area":99347,"area_visible":99347,"pixeles_muestreados":101470}},{"id":3864,"caja":{"x":24,"y":738.9,"w":1389.5,"h":71.5},"rasgos":{"color_medio":[232,232,232],"contraste_con_fondo":27.7,"fraccion_tinta":0.1884,"area":99347,"area_visible":99347,"pixeles_muestreados":101470}},{"id":3871,"caja":{"x":496.4,"y":738.9,"w":233.9,"h":19},"rasgos":{"color_medio":[231,231,231],"contraste_con_fondo":29.4,"fraccion_tinta":0.213,"area":4445,"area_visible":4445,"pixeles_muestreados":4700}},{"id":3872,"caja":{"x":496.4,"y":738.9,"w":233.9,"h":19},"rasgos":{"color_medio":[231,231,231],"contraste_con_fondo":29.4,"fraccion_tinta":0.213,"area":4445,"area_visible":4445,"pixeles_muestreados":4700}},{"id":3873,"caja":{"x":496.4,"y":738.9,"w":233.9,"h":19},"rasgos":{"color_medio":[231,231,231],"contraste_con_fondo":29.4,"fraccion_tinta":0.213,"area":4445,"area_visible":4445,"pixeles_muestreados":4700}}],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[160,2],[184,160],[186,160],[188,186],[190,188],[193,190],[195,190],[197,195],[199,197],[203,199],[205,203],[206,205],[208,199],[209,199],[210,209],[217,186],[219,217],[221,219],[234,219],[236,234],[238,236],[240,238],[242,240],[244,242],[250,234],[252,250],[253,252],[255,250],[257,255],[259,257],[260,259],[263,255],[265,263],[266,265],[269,255],[271,269],[272,271],[275,255],[277,275],[278,277],[281,255],[283,281],[284,283],[289,234],[291,289],[293,291],[295,293],[297,295],[298,297],[300,295],[301,300],[305,291],[307,305],[309,307],[310,309],[312,307],[313,312],[1221,186],[1389,1221],[1391,1389],[1393,1391],[1395,1393],[1397,1395],[1399,1397],[1401,1399],[1403,1401],[1405,1403],[1406,1405],[1426,1405],[1428,1426],[1430,1428],[1432,1430],[1434,1432],[1436,1434],[1438,1436],[1439,1438],[1441,1436],[1442,1441],[1445,1434],[1447,1445],[1449,1447],[1451,1449],[1452,1451],[1454,1449],[1455,1454],[1462,1430],[1464,1462],[1466,1464],[1468,1466],[1469,1468],[1473,1462],[1475,1473],[1477,1475],[1478,1477],[1491,1395],[1493,1491],[1495,1493],[1497,1495],[1499,1497],[1501,1499],[1503,1501],[1505,1503],[1507,1505],[1509,1507],[1511,1509],[1514,1511],[1516,1511],[1518,1516],[1520,1518],[3030,186],[3061,3030],[3063,3061],[3077,3063],[3079,3077],[3080,3079],[3845,null],[3846,3845],[3847,3846],[3848,3846],[3851,160],[3852,3851],[3853,3852],[3854,3853],[3855,3854],[3856,3855],[3857,3856],[3858,3857],[3860,3858],[3862,3858],[3863,3862],[3864,3863],[3865,3864],[3866,3865],[3867,3866],[3868,3864],[3869,3868],[3870,3864],[3871,3864],[3872,3871],[3873,3872],[3874,3873],[3875,3864],[3876,3864],[3877,3876],[3878,3877],[3881,3852],[3882,3881],[3883,3882],[3884,3883],[3885,3884],[3886,3885],[3887,3886],[3888,3887],[3890,3883],[3891,3890],[3892,3891],[3893,3892],[3894,3891],[3895,3894],[3896,3891],[3897,3896]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"con_advertencias","integridad_ok":true,"capas_sin_resolver":true,"advertencias":["Los nodos guardados incluyen un posible diálogo visible (3851). Confirmar en la imagen si tapa contenido.","La imagen guardada tiene una franja de cookies que cubre la parte inferior de la portada. El registro antiguo la marcó como limpia; conservar la advertencia sin cambiar la imagen.","Queda una capa o un aviso sin resolver. No presentar la página como despejada.","El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"dc3727f6a61912b1ef1fc02328917c1cc65d22a2a9f7f392dfcf7ae7b57003dc","wireframe":"c5211f6c7ea8a3cc9b89a3055265b5e1e0a61d3d361c83b928586b5b916463f0"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.