# Ejecución 1.0.0

Evalúa solo G4, captura captures/G08.

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
{"pagina":{"id":"G08","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:17:29.177Z","sanity_ok":null,"consent_limpio":null},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[248,248,248],"g4_conjuntos_pares_total":17,"g4_conjuntos_pares":[{"conjunto":"g4:DIV#1032","clave":"DIV#1032","id_padre":1032,"padre_raiz_virtual":false,"n":3,"area_visible_total":1348042,"parcial":true,"mediana_contraste":157.7,"mediana_area":1488531,"atipicos_geometricos":[1091,1677],"miembros":[{"id":1034,"caja":{"x":500,"y":270,"w":440,"h":40},"rasgos":{"color_medio":[116,173,146],"contraste_con_fondo":182.9,"fraccion_tinta":0.5913,"area":17600,"area_visible":17600,"pixeles_muestreados":17600}},{"id":1091,"caja":{"x":-2380,"y":0,"w":6200,"h":1090},"rasgos":{"color_medio":[146,161,165],"contraste_con_fondo":157.7,"fraccion_tinta":0.5428,"area":6758000,"area_visible":1296000,"pixeles_muestreados":1296000}},{"id":1677,"caja":{"x":840.8,"y":831,"w":499.2,"h":2982.1},"rasgos":{"color_medio":[243,245,246],"contraste_con_fondo":6.2,"fraccion_tinta":0.0297,"area":1488531,"area_visible":34442,"pixeles_muestreados":34500}}]},{"conjunto":"g4:DIV#931","clave":"DIV#931","id_padre":931,"padre_raiz_virtual":false,"n":2,"area_visible_total":1310220,"parcial":true,"mediana_contraste":197.7,"mediana_area":17056312,"atipicos_geometricos":[1009],"miembros":[{"id":933,"caja":{"x":1278,"y":765,"w":158,"h":90},"rasgos":{"color_medio":[79,118,143],"contraste_con_fondo":237.7,"fraccion_tinta":0.8392,"area":14220,"area_visible":14220,"pixeles_muestreados":14220}},{"id":1009,"caja":{"x":-4351.6,"y":0,"w":8171.6,"h":4172.8},"rasgos":{"color_medio":[146,161,165],"contraste_con_fondo":157.7,"fraccion_tinta":0.5428,"area":34098404,"area_visible":1296000,"pixeles_muestreados":1296000}}]},{"conjunto":"g4:LI#724","clave":"LI#724","id_padre":724,"padre_raiz_virtual":false,"n":7,"area_visible_total":814388,"parcial":false,"mediana_contraste":91.5,"mediana_area":124543,"atipicos_geometricos":[784,842,882],"miembros":[{"id":728,"caja":{"x":127.4,"y":188,"w":40,"h":16},"rasgos":{"color_medio":[217,217,217],"contraste_con_fondo":53.7,"fraccion_tinta":0.3125,"area":640,"area_visible":640,"pixeles_muestreados":656}},{"id":734,"caja":{"x":229.8,"y":180,"w":165.5,"h":32},"rasgos":{"color_medio":[218,218,218],"contraste_con_fondo":52,"fraccion_tinta":0.2856,"area":5296,"area_visible":5296,"pixeles_muestreados":5344}},{"id":742,"caja":{"x":0,"y":0,"w":587.5,"h":212},"rasgos":{"color_medio":[180,191,204],"contraste_con_fondo":99,"fraccion_tinta":0.317,"area":124543,"area_visible":124543,"pixeles_muestreados":124656}},{"id":778,"caja":{"x":649.9,"y":188,"w":59.6,"h":16},"rasgos":{"color_medio":[215,215,215],"contraste_con_fondo":57.2,"fraccion_tinta":0.3166,"area":954,"area_visible":954,"pixeles_muestreados":976}},{"id":784,"caja":{"x":0,"y":0,"w":920.3,"h":204},"rasgos":{"color_medio":[181,192,206],"contraste_con_fondo":96.9,"fraccion_tinta":0.2963,"area":187741,"area_visible":187741,"pixeles_muestreados":187884}},{"id":842,"caja":{"x":0,"y":0,"w":1063.4,"h":204},"rasgos":{"color_medio":[181,192,206],"contraste_con_fondo":96.9,"fraccion_tinta":0.2906,"area":216941,"area_visible":216941,"pixeles_muestreados":217056}},{"id":882,"caja":{"x":0,"y":0,"w":1312.6,"h":212},"rasgos":{"color_medio":[185,195,208],"contraste_con_fondo":91.5,"fraccion_tinta":0.2819,"area":278273,"area_visible":278273,"pixeles_muestreados":278356}}]},{"conjunto":"g4:DIV#1092","clave":"DIV#1092","id_padre":1092,"padre_raiz_virtual":false,"n":2,"area_visible_total":787400,"parcial":true,"mediana_contraste":121.7,"mediana_area":1691980,"atipicos_geometricos":[1095,1241],"miembros":[{"id":1095,"caja":{"x":-2380,"y":325,"w":6200,"h":496},"rasgos":{"color_medio":[95,117,118],"contraste_con_fondo":239.7,"fraccion_tinta":0.8355,"area":3075200,"area_visible":714240,"pixeles_muestreados":714240}},{"id":1241,"caja":{"x":100,"y":841,"w":1240,"h":249},"rasgos":{"color_medio":[245,246,247],"contraste_con_fondo":3.7,"fraccion_tinta":0.0216,"area":308760,"area_visible":73160,"pixeles_muestreados":73160}}]},{"conjunto":"g4:LI#1106","clave":"LI#1106","id_padre":1106,"padre_raiz_virtual":false,"n":3,"area_visible_total":714240,"parcial":true,"mediana_contraste":13.6,"mediana_area":615040,"atipicos_geometricos":[1156],"miembros":[{"id":1132,"caja":{"x":-1140,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[255,255,255],"contraste_con_fondo":12.1,"fraccion_tinta":0,"area":615040,"area_visible":49600,"pixeles_muestreados":49600}},{"id":1156,"caja":{"x":100,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[71,95,97],"contraste_con_fondo":278.5,"fraccion_tinta":0.9631,"area":615040,"area_visible":615040,"pixeles_muestreados":615040}},{"id":1180,"caja":{"x":1340,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[237,241,244],"contraste_con_fondo":13.6,"fraccion_tinta":0.0882,"area":615040,"area_visible":49600,"pixeles_muestreados":49600}}]},{"conjunto":"g4:DIV#1156","clave":"DIV#1156","id_padre":1156,"padre_raiz_virtual":false,"n":2,"area_visible_total":624802,"parcial":false,"mediana_contraste":292.9,"mediana_area":312401,"atipicos_geometricos":[1167],"miembros":[{"id":1161,"caja":{"x":115,"y":763,"w":436,"h":22.4},"rasgos":{"color_medio":[78,71,63],"contraste_con_fondo":307.3,"fraccion_tinta":0.9591,"area":9762,"area_visible":9762,"pixeles_muestreados":10028}},{"id":1167,"caja":{"x":100,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[71,95,97],"contraste_con_fondo":278.5,"fraccion_tinta":0.9631,"area":615040,"area_visible":615040,"pixeles_muestreados":615040}}]},{"conjunto":"g4:HEADER#513","clave":"HEADER#513","id_padre":513,"padre_raiz_virtual":false,"n":2,"area_visible_total":358560,"parcial":false,"mediana_contraste":75,"mediana_area":179280,"atipicos_geometricos":[515,693],"miembros":[{"id":515,"caja":{"x":0,"y":0,"w":1440,"h":146},"rasgos":{"color_medio":[161,175,194],"contraste_con_fondo":125.8,"fraccion_tinta":0.3839,"area":210240,"area_visible":210240,"pixeles_muestreados":210240}},{"id":693,"caja":{"x":0,"y":146,"w":1440,"h":103},"rasgos":{"color_medio":[234,234,234],"contraste_con_fondo":24.2,"fraccion_tinta":0.0698,"area":148320,"area_visible":148320,"pixeles_muestreados":148320}}]},{"conjunto":"g4:DIV#515","clave":"DIV#515","id_padre":515,"padre_raiz_virtual":false,"n":2,"area_visible_total":194560,"parcial":false,"mediana_contraste":179.6,"mediana_area":97280,"atipicos_geometricos":[519,631],"miembros":[{"id":519,"caja":{"x":0,"y":0,"w":1440,"h":48},"rasgos":{"color_medio":[10,49,106],"contraste_con_fondo":341.2,"fraccion_tinta":0.9827,"area":69120,"area_visible":69120,"pixeles_muestreados":69120}},{"id":631,"caja":{"x":80,"y":48,"w":1280,"h":98},"rasgos":{"color_medio":[236,238,239],"contraste_con_fondo":18,"fraccion_tinta":0.087,"area":125440,"area_visible":125440,"pixeles_muestreados":125440}}]},{"conjunto":"g4:DIV#1180","clave":"DIV#1180","id_padre":1180,"padre_raiz_virtual":false,"n":2,"area_visible_total":51503,"parcial":true,"mediana_contraste":110.3,"mediana_area":312401,"atipicos_geometricos":[1185,1191],"miembros":[{"id":1185,"caja":{"x":1355,"y":763,"w":436,"h":22.4},"rasgos":{"color_medio":[86,142,175],"contraste_con_fondo":206.9,"fraccion_tinta":0.6818,"area":9762,"area_visible":1903,"pixeles_muestreados":1955}},{"id":1191,"caja":{"x":1340,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[237,241,244],"contraste_con_fondo":13.6,"fraccion_tinta":0.0882,"area":615040,"area_visible":49600,"pixeles_muestreados":49600}}]},{"conjunto":"g4:DIV#650","clave":"DIV#650","id_padre":650,"padre_raiz_virtual":false,"n":2,"area_visible_total":41211,"parcial":false,"mediana_contraste":42.5,"mediana_area":20606,"atipicos_geometricos":[],"miembros":[{"id":653,"caja":{"x":95,"y":56.3,"w":393.3,"h":71.2},"rasgos":{"color_medio":[206,211,209],"contraste_con_fondo":68.2,"fraccion_tinta":0.314,"area":28011,"area_visible":28011,"pixeles_muestreados":28368}},{"id":663,"caja":{"x":1045,"y":75,"w":300,"h":44},"rasgos":{"color_medio":[238,238,239],"contraste_con_fondo":16.8,"fraccion_tinta":0.1333,"area":13200,"area_visible":13200,"pixeles_muestreados":13200}}]},{"conjunto":"g4:DIV#1680","clave":"DIV#1680","id_padre":1680,"padre_raiz_virtual":false,"n":2,"area_visible_total":24599,"parcial":true,"mediana_contraste":0.8,"mediana_area":22476,"atipicos_geometricos":[1688],"miembros":[{"id":1681,"caja":{"x":851.8,"y":842,"w":140,"h":84.8},"rasgos":{"color_medio":[249,249,249],"contraste_con_fondo":1.7,"fraccion_tinta":0,"area":11878,"area_visible":8120,"pixeles_muestreados":8178}},{"id":1688,"caja":{"x":1006.8,"y":846,"w":305.2,"h":108.4},"rasgos":{"color_medio":[248,248,248],"contraste_con_fondo":0,"fraccion_tinta":0.0048,"area":33073,"area_visible":16479,"pixeles_muestreados":16524}}]},{"conjunto":"g4:DIV#raiz","clave":"DIV#raiz","id_padre":null,"padre_raiz_virtual":true,"n":4,"area_visible_total":15071,"parcial":false,"mediana_contraste":25.4,"mediana_area":3115,"atipicos_geometricos":[113],"miembros":[{"id":94,"caja":{"x":43,"y":53.8,"w":109.9,"h":21},"rasgos":{"color_medio":[232,238,235],"contraste_con_fondo":22.9,"fraccion_tinta":0.0897,"area":2308,"area_visible":2308,"pixeles_muestreados":2420}},{"id":104,"caja":{"x":43,"y":53.8,"w":140,"h":21},"rasgos":{"color_medio":[232,237,235],"contraste_con_fondo":23.4,"fraccion_tinta":0.0961,"area":2939,"area_visible":2939,"pixeles_muestreados":3080}},{"id":113,"caja":{"x":43,"y":53.8,"w":311.1,"h":21},"rasgos":{"color_medio":[225,228,229],"contraste_con_fondo":35.9,"fraccion_tinta":0.1645,"area":6534,"area_visible":6534,"pixeles_muestreados":6864}},{"id":122,"caja":{"x":43,"y":53.8,"w":156.7,"h":21},"rasgos":{"color_medio":[230,234,233],"contraste_con_fondo":27.3,"fraccion_tinta":0.1146,"area":3290,"area_visible":3290,"pixeles_muestreados":3454}}]},{"conjunto":"g4:A#1038","clave":"A#1038","id_padre":1038,"padre_raiz_virtual":false,"n":9,"area_visible_total":14400,"parcial":false,"mediana_contraste":221.9,"mediana_area":1600,"atipicos_geometricos":[],"miembros":[{"id":1039,"caja":{"x":500,"y":270,"w":40,"h":40},"rasgos":{"color_medio":[78,151,116],"contraste_con_fondo":236.1,"fraccion_tinta":0.7519,"area":1600,"area_visible":1600,"pixeles_muestreados":1600}},{"id":1048,"caja":{"x":550,"y":270,"w":40,"h":40},"rasgos":{"color_medio":[76,150,115],"contraste_con_fondo":238.5,"fraccion_tinta":0.7438,"area":1600,"area_visible":1600,"pixeles_muestreados":1600}},{"id":1055,"caja":{"x":600,"y":270,"w":40,"h":40},"rasgos":{"color_medio":[91,159,126],"contraste_con_fondo":217.8,"fraccion_tinta":0.7294,"area":1600,"area_visible":1600,"pixeles_muestreados":1600}},{"id":1062,"caja":{"x":650,"y":270,"w":40,"h":40},"rasgos":{"color_medio":[88,157,124],"contraste_con_fondo":221.9,"fraccion_tinta":0.7075,"area":1600,"area_visible":1600,"pixeles_muestreados":1600}},{"id":1066,"caja":{"x":700,"y":270,"w":40,"h":40},"rasgos":{"color_medio":[94,160,128],"contraste_con_fondo":214.1,"fraccion_tinta":0.685,"area":1600,"area_visible":1600,"pixeles_muestreados":1600}},{"id":1070,"caja":{"x":750,"y":270,"w":40,"h":40},"rasgos":{"color_medio":[73,148,112],"contraste_con_fondo":243.1,"fraccion_tinta":0.7438,"area":1600,"area_visible":1600,"pixeles_muestreados":1600}},{"id":1074,"caja":{"x":800,"y":270,"w":40,"h":40},"rasgos":{"color_medio":[94,160,129],"contraste_con_fondo":213.6,"fraccion_tinta":0.695,"area":1600,"area_visible":1600,"pixeles_muestreados":1600}},{"id":1080,"caja":{"x":850,"y":270,"w":40,"h":40},"rasgos":{"color_medio":[95,161,129],"contraste_con_fondo":212.5,"fraccion_tinta":0.6981,"area":1600,"area_visible":1600,"pixeles_muestreados":1600}},{"id":1086,"caja":{"x":900,"y":270,"w":40,"h":40},"rasgos":{"color_medio":[77,150,116],"contraste_con_fondo":237.2,"fraccion_tinta":0.75,"area":1600,"area_visible":1600,"pixeles_muestreados":1600}}]},{"conjunto":"g4:SPAN#raiz","clave":"SPAN#raiz","id_padre":null,"padre_raiz_virtual":true,"n":4,"area_visible_total":13064,"parcial":false,"mediana_contraste":46.6,"mediana_area":3266,"atipicos_geometricos":[],"miembros":[{"id":97,"caja":{"x":167.9,"y":49,"w":103.4,"h":31.6},"rasgos":{"color_medio":[220,222,223],"contraste_con_fondo":45.7,"fraccion_tinta":0.2182,"area":3266,"area_visible":3266,"pixeles_muestreados":3360}},{"id":107,"caja":{"x":198,"y":49,"w":103.4,"h":31.6},"rasgos":{"color_medio":[219,221,223],"contraste_con_fondo":46.9,"fraccion_tinta":0.2274,"area":3266,"area_visible":3266,"pixeles_muestreados":3360}},{"id":116,"caja":{"x":369.1,"y":49,"w":103.4,"h":31.6},"rasgos":{"color_medio":[218,220,221],"contraste_con_fondo":49.1,"fraccion_tinta":0.2365,"area":3266,"area_visible":3266,"pixeles_muestreados":3328}},{"id":125,"caja":{"x":214.7,"y":49,"w":103.4,"h":31.6},"rasgos":{"color_medio":[219,222,223],"contraste_con_fondo":46.3,"fraccion_tinta":0.219,"area":3266,"area_visible":3266,"pixeles_muestreados":3360}}]},{"conjunto":"g4:DIV#1691","clave":"DIV#1691","id_padre":1691,"padre_raiz_virtual":false,"n":2,"area_visible_total":12726,"parcial":true,"mediana_contraste":1.7,"mediana_area":14660,"atipicos_geometricos":[1699],"miembros":[{"id":1694,"caja":{"x":1006.8,"y":846,"w":224.4,"h":14},"rasgos":{"color_medio":[249,249,249],"contraste_con_fondo":1.7,"fraccion_tinta":0,"area":3142,"area_visible":3142,"pixeles_muestreados":3164}},{"id":1699,"caja":{"x":1006.8,"y":868.6,"w":305.2,"h":85.8},"rasgos":{"color_medio":[249,249,249],"contraste_con_fondo":1.7,"fraccion_tinta":0,"area":26178,"area_visible":9584,"pixeles_muestreados":9792}}]},{"conjunto":"g4:DIV#666","clave":"DIV#666","id_padre":666,"padre_raiz_virtual":false,"n":2,"area_visible_total":10524,"parcial":false,"mediana_contraste":44.5,"mediana_area":5262,"atipicos_geometricos":[670],"miembros":[{"id":670,"caja":{"x":1046,"y":80,"w":228,"h":38},"rasgos":{"color_medio":[251,251,251],"contraste_con_fondo":5.2,"fraccion_tinta":0.0426,"area":8664,"area_visible":8664,"pixeles_muestreados":8664}},{"id":675,"caja":{"x":1272,"y":82,"w":60,"h":31},"rasgos":{"color_medio":[198,199,202],"contraste_con_fondo":83.8,"fraccion_tinta":0.3925,"area":1860,"area_visible":1860,"pixeles_muestreados":1860}}]},{"conjunto":"g4:A#1102","clave":"A#1102","id_padre":1102,"padre_raiz_virtual":false,"n":3,"area_visible_total":2401,"parcial":false,"mediana_contraste":192.9,"mediana_area":1029,"atipicos_geometricos":[1235],"miembros":[{"id":1229,"caja":{"x":120,"y":561,"w":25.7,"h":40},"rasgos":{"color_medio":[138,138,134],"contraste_con_fondo":192.9,"fraccion_tinta":0.6913,"area":1029,"area_visible":1029,"pixeles_muestreados":1040}},{"id":1232,"caja":{"x":1294.3,"y":561,"w":25.7,"h":40},"rasgos":{"color_medio":[93,142,157],"contraste_con_fondo":208.7,"fraccion_tinta":0.6856,"area":1029,"area_visible":1029,"pixeles_muestreados":1040}},{"id":1235,"caja":{"x":713.4,"y":795,"w":17.2,"h":20},"rasgos":{"color_medio":[208,216,213],"contraste_con_fondo":62,"fraccion_tinta":0.4333,"area":343,"area_visible":343,"pixeles_muestreados":360}}]}],"g4_banner_candidatos":[{"id":515,"nodeName":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":146},"contiene_accionables":5},{"id":519,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":48},"contiene_accionables":2},{"id":521,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":48},"contiene_accionables":2},{"id":523,"nodeName":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":48},"contiene_accionables":1},{"id":596,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1324.8,"h":32},"contiene_accionables":1},{"id":598,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1324.8,"h":32},"contiene_accionables":1},{"id":631,"nodeName":"DIV","caja":{"x":80,"y":48,"w":1280,"h":98},"contiene_accionables":3},{"id":635,"nodeName":"DIV","caja":{"x":80,"y":48,"w":1280,"h":98},"contiene_accionables":3},{"id":638,"nodeName":"DIV","caja":{"x":80,"y":48,"w":1280,"h":98},"contiene_accionables":3},{"id":640,"nodeName":"DIV","caja":{"x":80,"y":48,"w":1280,"h":98},"contiene_accionables":3},{"id":642,"nodeName":"SECTION","caja":{"x":80,"y":48,"w":1280,"h":98},"contiene_accionables":3},{"id":646,"nodeName":"DIV","caja":{"x":95,"y":56.3,"w":1250,"h":71.2},"contiene_accionables":3},{"id":647,"nodeName":"DIV","caja":{"x":95,"y":56.3,"w":1250,"h":71.2},"contiene_accionables":3},{"id":649,"nodeName":"DIV","caja":{"x":95,"y":56.3,"w":1250,"h":71.2},"contiene_accionables":3},{"id":650,"nodeName":"DIV","caja":{"x":95,"y":56.3,"w":1250,"h":71.2},"contiene_accionables":3},{"id":693,"nodeName":"HEADER","caja":{"x":0,"y":146,"w":1440,"h":103},"contiene_accionables":7},{"id":697,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1312.6,"h":212},"contiene_accionables":7},{"id":701,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1312.6,"h":212},"contiene_accionables":7},{"id":704,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1312.6,"h":212},"contiene_accionables":7},{"id":716,"nodeName":"NAV","caja":{"x":0,"y":0,"w":1312.6,"h":212},"contiene_accionables":7},{"id":720,"nodeName":"SECTION","caja":{"x":0,"y":0,"w":1312.6,"h":212},"contiene_accionables":7},{"id":724,"nodeName":"UL","caja":{"x":0,"y":0,"w":1312.6,"h":212},"contiene_accionables":7},{"id":882,"nodeName":"LI","caja":{"x":0,"y":0,"w":1312.6,"h":212},"contiene_accionables":1},{"id":884,"nodeName":"A","caja":{"x":0,"y":0,"w":1312.6,"h":212},"contiene_accionables":1},{"id":1091,"nodeName":"DIV","caja":{"x":-2380,"y":0,"w":6200,"h":1090},"contiene_accionables":6},{"id":1092,"nodeName":"DIV","caja":{"x":-2380,"y":0,"w":6200,"h":1090},"contiene_accionables":6}],"g4_cromo_candidatos":[{"id":88,"caja":{"x":-1,"y":-1,"w":83.7,"h":783.2},"rasgos":{"color_medio":[238,240,244],"contraste_con_fondo":13.4,"fraccion_tinta":0.061,"area":65528,"area_visible":64662,"pixeles_muestreados":64989}},{"id":94,"caja":{"x":43,"y":53.8,"w":109.9,"h":21},"rasgos":{"color_medio":[232,238,235],"contraste_con_fondo":22.9,"fraccion_tinta":0.0897,"area":2308,"area_visible":2308,"pixeles_muestreados":2420}},{"id":104,"caja":{"x":43,"y":53.8,"w":140,"h":21},"rasgos":{"color_medio":[232,237,235],"contraste_con_fondo":23.4,"fraccion_tinta":0.0961,"area":2939,"area_visible":2939,"pixeles_muestreados":3080}},{"id":122,"caja":{"x":43,"y":53.8,"w":156.7,"h":21},"rasgos":{"color_medio":[230,234,233],"contraste_con_fondo":27.3,"fraccion_tinta":0.1146,"area":3290,"area_visible":3290,"pixeles_muestreados":3454}},{"id":631,"caja":{"x":80,"y":48,"w":1280,"h":98},"rasgos":{"color_medio":[236,238,239],"contraste_con_fondo":18,"fraccion_tinta":0.087,"area":125440,"area_visible":125440,"pixeles_muestreados":125440}},{"id":635,"caja":{"x":80,"y":48,"w":1280,"h":98},"rasgos":{"color_medio":[236,238,239],"contraste_con_fondo":18,"fraccion_tinta":0.087,"area":125440,"area_visible":125440,"pixeles_muestreados":125440}},{"id":638,"caja":{"x":80,"y":48,"w":1280,"h":98},"rasgos":{"color_medio":[236,238,239],"contraste_con_fondo":18,"fraccion_tinta":0.087,"area":125440,"area_visible":125440,"pixeles_muestreados":125440}},{"id":640,"caja":{"x":80,"y":48,"w":1280,"h":98},"rasgos":{"color_medio":[236,238,239],"contraste_con_fondo":18,"fraccion_tinta":0.087,"area":125440,"area_visible":125440,"pixeles_muestreados":125440}},{"id":642,"caja":{"x":80,"y":48,"w":1280,"h":98},"rasgos":{"color_medio":[236,238,239],"contraste_con_fondo":18,"fraccion_tinta":0.087,"area":125440,"area_visible":125440,"pixeles_muestreados":125440}},{"id":646,"caja":{"x":95,"y":56.3,"w":1250,"h":71.2},"rasgos":{"color_medio":[232,235,235],"contraste_con_fondo":24.4,"fraccion_tinta":0.1185,"area":89023,"area_visible":89023,"pixeles_muestreados":90000}},{"id":647,"caja":{"x":95,"y":56.3,"w":1250,"h":71.2},"rasgos":{"color_medio":[232,235,235],"contraste_con_fondo":24.4,"fraccion_tinta":0.1185,"area":89023,"area_visible":89023,"pixeles_muestreados":90000}},{"id":649,"caja":{"x":95,"y":56.3,"w":1250,"h":71.2},"rasgos":{"color_medio":[232,235,235],"contraste_con_fondo":24.4,"fraccion_tinta":0.1185,"area":89023,"area_visible":89023,"pixeles_muestreados":90000}},{"id":650,"caja":{"x":95,"y":56.3,"w":1250,"h":71.2},"rasgos":{"color_medio":[232,235,235],"contraste_con_fondo":24.4,"fraccion_tinta":0.1185,"area":89023,"area_visible":89023,"pixeles_muestreados":90000}},{"id":663,"caja":{"x":1045,"y":75,"w":300,"h":44},"rasgos":{"color_medio":[238,238,239],"contraste_con_fondo":16.8,"fraccion_tinta":0.1333,"area":13200,"area_visible":13200,"pixeles_muestreados":13200}},{"id":664,"caja":{"x":1045,"y":75,"w":300,"h":44},"rasgos":{"color_medio":[238,238,239],"contraste_con_fondo":16.8,"fraccion_tinta":0.1333,"area":13200,"area_visible":13200,"pixeles_muestreados":13200}},{"id":666,"caja":{"x":1045,"y":75,"w":300,"h":44},"rasgos":{"color_medio":[238,238,239],"contraste_con_fondo":16.8,"fraccion_tinta":0.1333,"area":13200,"area_visible":13200,"pixeles_muestreados":13200}},{"id":670,"caja":{"x":1046,"y":80,"w":228,"h":38},"rasgos":{"color_medio":[251,251,251],"contraste_con_fondo":5.2,"fraccion_tinta":0.0426,"area":8664,"area_visible":8664,"pixeles_muestreados":8664}},{"id":672,"caja":{"x":1046,"y":80,"w":228,"h":38},"rasgos":{"color_medio":[251,251,251],"contraste_con_fondo":5.2,"fraccion_tinta":0.0426,"area":8664,"area_visible":8664,"pixeles_muestreados":8664}},{"id":693,"caja":{"x":0,"y":146,"w":1440,"h":103},"rasgos":{"color_medio":[234,234,234],"contraste_con_fondo":24.2,"fraccion_tinta":0.0698,"area":148320,"area_visible":148320,"pixeles_muestreados":148320}},{"id":1180,"caja":{"x":1340,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[237,241,244],"contraste_con_fondo":13.6,"fraccion_tinta":0.0882,"area":615040,"area_visible":49600,"pixeles_muestreados":49600}},{"id":1191,"caja":{"x":1340,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[237,241,244],"contraste_con_fondo":13.6,"fraccion_tinta":0.0882,"area":615040,"area_visible":49600,"pixeles_muestreados":49600}},{"id":1192,"caja":{"x":1340,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[237,241,244],"contraste_con_fondo":13.6,"fraccion_tinta":0.0882,"area":615040,"area_visible":49600,"pixeles_muestreados":49600}},{"id":1193,"caja":{"x":1340,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[237,241,244],"contraste_con_fondo":13.6,"fraccion_tinta":0.0882,"area":615040,"area_visible":49600,"pixeles_muestreados":49600}},{"id":1195,"caja":{"x":1340,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[237,241,244],"contraste_con_fondo":13.6,"fraccion_tinta":0.0882,"area":615040,"area_visible":49600,"pixeles_muestreados":49600}},{"id":1197,"caja":{"x":1340,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[237,241,244],"contraste_con_fondo":13.6,"fraccion_tinta":0.0882,"area":615040,"area_visible":49600,"pixeles_muestreados":49600}},{"id":1199,"caja":{"x":1340,"y":325,"w":1240,"h":496},"rasgos":{"color_medio":[237,241,244],"contraste_con_fondo":13.6,"fraccion_tinta":0.0882,"area":615040,"area_visible":49600,"pixeles_muestreados":49600}},{"id":1241,"caja":{"x":100,"y":841,"w":1240,"h":249},"rasgos":{"color_medio":[245,246,247],"contraste_con_fondo":3.7,"fraccion_tinta":0.0216,"area":308760,"area_visible":73160,"pixeles_muestreados":73160}},{"id":1677,"caja":{"x":840.8,"y":831,"w":499.2,"h":2982.1},"rasgos":{"color_medio":[243,245,246],"contraste_con_fondo":6.2,"fraccion_tinta":0.0297,"area":1488531,"area_visible":34442,"pixeles_muestreados":34500}},{"id":1680,"caja":{"x":840.8,"y":831,"w":499.2,"h":140.2},"rasgos":{"color_medio":[243,245,246],"contraste_con_fondo":6.2,"fraccion_tinta":0.0297,"area":69975,"area_visible":34442,"pixeles_muestreados":34500}}],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[84,2],[88,84],[89,88],[94,null],[95,94],[97,null],[98,97],[99,98],[100,97],[101,100],[104,null],[105,104],[107,null],[108,107],[109,108],[113,null],[114,113],[116,null],[117,116],[118,117],[119,116],[120,119],[122,null],[123,122],[125,null],[126,125],[127,126],[128,125],[129,128],[134,84],[147,134],[509,84],[511,84],[513,511],[515,513],[519,515],[521,519],[523,521],[527,523],[528,527],[530,528],[531,530],[534,531],[535,534],[537,535],[539,537],[541,539],[543,541],[545,541],[547,541],[549,541],[551,541],[553,541],[555,541],[557,541],[559,541],[563,537],[565,563],[567,563],[569,563],[571,563],[573,563],[575,563],[578,537],[580,578],[582,578],[584,578],[596,521],[598,596],[599,598],[600,599],[601,600],[602,600],[603,600],[631,515],[635,631],[638,635],[640,638],[642,640],[646,642],[647,646],[649,647],[650,649],[653,650],[654,653],[656,654],[658,654],[659,658],[661,658],[663,650],[664,663],[666,664],[670,666],[672,670],[675,666],[677,675],[678,677],[679,678],[679,678],[693,513],[697,693],[701,697],[704,701],[712,704],[713,712],[716,704],[720,716],[724,720],[728,724],[730,728],[731,730],[734,724],[736,734],[737,736],[739,736],[742,724],[744,742],[745,744],[746,744],[748,744],[778,724],[780,778],[781,780],[784,724],[786,784],[787,786],[788,786],[842,724],[844,842],[845,844],[846,844],[882,724],[884,882],[885,884],[886,884],[888,884],[931,513],[933,931],[937,933],[940,937],[959,940],[963,959],[965,963],[967,965],[969,967],[1009,931],[1013,1009],[1017,1013],[1021,1017],[1025,1021],[1029,1025],[1031,1029],[1032,1031],[1034,1032],[1035,1034],[1038,1035],[1039,1038],[1040,1039],[1044,1040],[1045,1044],[1046,1045],[1047,1045],[1048,1038],[1049,1048],[1053,1049],[1054,1053],[1055,1038],[1056,1055],[1057,1056],[1058,1057],[1059,1058],[1060,1058],[1061,1058],[1062,1038],[1063,1062],[1064,1063],[1065,1064],[1066,1038],[1067,1066],[1068,1067],[1069,1068],[1070,1038],[1071,1070],[1072,1071],[1073,1072],[1074,1038],[1075,1074],[1076,1075],[1077,1076],[1078,1077],[1079,1077],[1080,1038],[1081,1080],[1082,1081],[1083,1082],[1084,1083],[1085,1083],[1086,1038],[1087,1086],[1088,1087],[1089,1088],[1090,1089],[1091,1032],[1092,1091],[1095,1092],[1096,1095],[1098,1096],[1100,1098],[1102,1100],[1105,1102],[1106,1105],[1132,1106],[1143,1132],[1144,1143],[1145,1144],[1147,1145],[1149,1147],[1151,1149],[1156,1106],[1161,1156],[1163,1161],[1164,1163],[1167,1156],[1168,1167],[1169,1168],[1171,1169],[1173,1171],[1175,1173],[1180,1106],[1185,1180],[1187,1185],[1188,1187],[1191,1180],[1192,1191],[1193,1192],[1195,1193],[1197,1195],[1199,1197],[1229,1102],[1230,1229],[1230,1229],[1232,1102],[1233,1232],[1233,1232],[1235,1102],[1236,1235],[1236,1235],[1241,1092],[1242,1241],[1245,1242],[1246,1245],[1247,1246],[1248,1246],[1677,1032],[1680,1677],[1681,1680],[1682,1681],[1684,1682],[1685,1684],[1688,1680],[1689,1688],[1691,1689],[1694,1691],[1696,1694],[1697,1696],[1699,1691],[1701,1699],[1702,1701]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"b776a7adeeab15fd13848d16289f83d5d25221e038fe090120a9f906c91b01ae","wireframe":"73ff4586b2cc910da16c4c5d4fcbf5ab39f11298f4077f5844915bd3b317ca9f"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.