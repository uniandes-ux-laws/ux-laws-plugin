# Ejecución 1.0.0

Evalúa solo G4, captura captures/H09.

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
{"pagina":{"id":"H09","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:16:45.829Z","sanity_ok":null,"consent_limpio":null},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[240,240,240],"g4_conjuntos_pares_total":14,"g4_conjuntos_pares":[{"conjunto":"g4:DIV#931","clave":"DIV#931","id_padre":931,"padre_raiz_virtual":false,"n":3,"area_visible_total":1184856,"parcial":true,"mediana_contraste":223.7,"mediana_area":1712144,"atipicos_geometricos":[933,1569,1627],"miembros":[{"id":933,"caja":{"x":-1440,"y":0,"w":18720,"h":366},"rasgos":{"color_medio":[87,108,144],"contraste_con_fondo":223.7,"fraccion_tinta":0.9854,"area":6851520,"area_visible":527040,"pixeles_muestreados":527040}},{"id":1569,"caja":{"x":0,"y":366,"w":1440,"h":46},"rasgos":{"color_medio":[25,73,122],"contraste_con_fondo":296.7,"fraccion_tinta":0.9888,"area":66240,"area_visible":66240,"pixeles_muestreados":66240}},{"id":1627,"caja":{"x":92,"y":429,"w":1256,"h":1363.2},"rasgos":{"color_medio":[185,184,187],"contraste_con_fondo":94.7,"fraccion_tinta":0.6777,"area":1712144,"area_visible":591576,"pixeles_muestreados":591576}}]},{"conjunto":"g4:DIV#1641","clave":"DIV#1641","id_padre":1641,"padre_raiz_virtual":false,"n":6,"area_visible_total":547201,"parcial":true,"mediana_contraste":51.4,"mediana_area":178503,"atipicos_geometricos":[1643,1664,1727],"miembros":[{"id":1643,"caja":{"x":92,"y":429,"w":405.3,"h":440.4},"rasgos":{"color_medio":[181,181,190],"contraste_con_fondo":97.3,"fraccion_tinta":0.7811,"area":178503,"area_visible":178503,"pixeles_muestreados":179046}},{"id":1664,"caja":{"x":517.3,"y":429,"w":405.3,"h":440.4},"rasgos":{"color_medio":[155,162,164],"contraste_con_fondo":138.1,"fraccion_tinta":0.8521,"area":178503,"area_visible":178503,"pixeles_muestreados":179046}},{"id":1685,"caja":{"x":942.7,"y":429,"w":405.3,"h":440.4},"rasgos":{"color_medio":[203,193,194],"contraste_con_fondo":75.5,"fraccion_tinta":0.5888,"area":178510,"area_visible":178510,"pixeles_muestreados":179046}},{"id":1706,"caja":{"x":92,"y":890.4,"w":405.3,"h":440.4},"rasgos":{"color_medio":[219,225,231],"contraste_con_fondo":27.3,"fraccion_tinta":0.1379,"area":178503,"area_visible":3895,"pixeles_muestreados":4060}},{"id":1727,"caja":{"x":517.3,"y":890.4,"w":405.3,"h":440.4},"rasgos":{"color_medio":[234,236,238],"contraste_con_fondo":7.5,"fraccion_tinta":0.0446,"area":178503,"area_visible":3895,"pixeles_muestreados":4060}},{"id":1748,"caja":{"x":942.7,"y":890.4,"w":405.3,"h":440.4},"rasgos":{"color_medio":[227,231,234],"contraste_con_fondo":16.9,"fraccion_tinta":0.0946,"area":178510,"area_visible":3895,"pixeles_muestreados":4060}}]},{"conjunto":"g4:DIV#994","clave":"DIV#994","id_padre":994,"padre_raiz_virtual":false,"n":2,"area_visible_total":504759,"parcial":false,"mediana_contraste":279.4,"mediana_area":252380,"atipicos_geometricos":[997],"miembros":[{"id":997,"caja":{"x":0,"y":86,"w":1440,"h":280},"rasgos":{"color_medio":[39,66,112],"contraste_con_fondo":295.1,"fraccion_tinta":0.9881,"area":403200,"area_visible":403200,"pixeles_muestreados":403200}},{"id":1017,"caja":{"x":50,"y":123,"w":523.5,"h":194},"rasgos":{"color_medio":[40,89,158],"contraste_con_fondo":263.7,"fraccion_tinta":0.9828,"area":101559,"area_visible":101559,"pixeles_muestreados":101656}}]},{"conjunto":"g4:LI#1541","clave":"LI#1541","id_padre":1541,"padre_raiz_virtual":false,"n":6,"area_visible_total":424116,"parcial":false,"mediana_contraste":182.7,"mediana_area":70686,"atipicos_geometricos":[],"miembros":[{"id":1542,"caja":{"x":0,"y":0,"w":148,"h":357},"rasgos":{"color_medio":[93,138,199],"contraste_con_fondo":183.6,"fraccion_tinta":0.9908,"area":52836,"area_visible":52836,"pixeles_muestreados":52836}},{"id":1546,"caja":{"x":0,"y":0,"w":168,"h":357},"rasgos":{"color_medio":[95,139,198],"contraste_con_fondo":181.6,"fraccion_tinta":0.9905,"area":59976,"area_visible":59976,"pixeles_muestreados":59976}},{"id":1550,"caja":{"x":0,"y":0,"w":188,"h":357},"rasgos":{"color_medio":[95,139,198],"contraste_con_fondo":181.6,"fraccion_tinta":0.9893,"area":67116,"area_visible":67116,"pixeles_muestreados":67116}},{"id":1554,"caja":{"x":0,"y":0,"w":208,"h":357},"rasgos":{"color_medio":[95,139,197],"contraste_con_fondo":181.9,"fraccion_tinta":0.9886,"area":74256,"area_visible":74256,"pixeles_muestreados":74256}},{"id":1558,"caja":{"x":0,"y":0,"w":228,"h":357},"rasgos":{"color_medio":[94,138,196],"contraste_con_fondo":183.5,"fraccion_tinta":0.988,"area":81396,"area_visible":81396,"pixeles_muestreados":81396}},{"id":1562,"caja":{"x":0,"y":0,"w":248,"h":357},"rasgos":{"color_medio":[92,136,194],"contraste_con_fondo":186.6,"fraccion_tinta":0.988,"area":88536,"area_visible":88536,"pixeles_muestreados":88536}}]},{"conjunto":"g4:DIV#1643","clave":"DIV#1643","id_padre":1643,"padre_raiz_virtual":false,"n":2,"area_visible_total":170117,"parcial":false,"mediana_contraste":83.4,"mediana_area":85059,"atipicos_geometricos":[1648],"miembros":[{"id":1645,"caja":{"x":128.3,"y":429,"w":332.7,"h":24},"rasgos":{"color_medio":[192,206,220],"contraste_con_fondo":62.1,"fraccion_tinta":0.3236,"area":7986,"area_visible":7986,"pixeles_muestreados":8016}},{"id":1648,"caja":{"x":92,"y":469.4,"w":405.3,"h":400},"rasgos":{"color_medio":[177,177,185],"contraste_con_fondo":104.7,"fraccion_tinta":0.843,"area":162131,"area_visible":162131,"pixeles_muestreados":162806}}]},{"conjunto":"g4:DIV#1664","clave":"DIV#1664","id_padre":1664,"padre_raiz_virtual":false,"n":2,"area_visible_total":168101,"parcial":false,"mediana_contraste":107,"mediana_area":84051,"atipicos_geometricos":[1666,1669],"miembros":[{"id":1666,"caja":{"x":595.6,"y":429,"w":248.8,"h":24},"rasgos":{"color_medio":[190,205,219],"contraste_con_fondo":64.5,"fraccion_tinta":0.3343,"area":5970,"area_visible":5970,"pixeles_muestreados":6000}},{"id":1669,"caja":{"x":517.3,"y":469.4,"w":405.3,"h":400},"rasgos":{"color_medio":[149,155,157],"contraste_con_fondo":149.6,"fraccion_tinta":0.9247,"area":162131,"area_visible":162131,"pixeles_muestreados":162806}}]},{"conjunto":"g4:DIV#1685","clave":"DIV#1685","id_padre":1685,"padre_raiz_virtual":false,"n":2,"area_visible_total":163270,"parcial":false,"mediana_contraste":78.4,"mediana_area":81635,"atipicos_geometricos":[1690],"miembros":[{"id":1687,"caja":{"x":1121.8,"y":429,"w":47.2,"h":24},"rasgos":{"color_medio":[183,200,216],"contraste_con_fondo":73.7,"fraccion_tinta":0.3915,"area":1132,"area_visible":1132,"pixeles_muestreados":1152}},{"id":1690,"caja":{"x":942.7,"y":469.4,"w":405.3,"h":400},"rasgos":{"color_medio":[200,188,189],"contraste_con_fondo":83.1,"fraccion_tinta":0.6448,"area":162138,"area_visible":162138,"pixeles_muestreados":162806}}]},{"conjunto":"g4:DIV#349","clave":"DIV#349","id_padre":349,"padre_raiz_virtual":false,"n":4,"area_visible_total":92773,"parcial":true,"mediana_contraste":10.2,"mediana_area":4383,"atipicos_geometricos":[351,362],"miembros":[{"id":351,"caja":{"x":164.1,"y":25.5,"w":179,"h":35},"rasgos":{"color_medio":[151,174,196],"contraste_con_fondo":119.2,"fraccion_tinta":0.9441,"area":6265,"area_visible":6265,"pixeles_muestreados":6480}},{"id":362,"caja":{"x":0,"y":-11.5,"w":1097.6,"h":86},"rasgos":{"color_medio":[238,243,246],"contraste_con_fondo":7,"fraccion_tinta":0.9871,"area":94390,"area_visible":81768,"pixeles_muestreados":82350}},{"id":439,"caja":{"x":1135.9,"y":18,"w":50,"h":50},"rasgos":{"color_medio":[232,236,238],"contraste_con_fondo":9.2,"fraccion_tinta":0.2922,"area":2500,"area_visible":2500,"pixeles_muestreados":2550}},{"id":472,"caja":{"x":1225.9,"y":15,"w":40,"h":56},"rasgos":{"color_medio":[230,235,240],"contraste_con_fondo":11.2,"fraccion_tinta":1,"area":2240,"area_visible":2240,"pixeles_muestreados":2296}}]},{"conjunto":"g4:P#raiz","clave":"P#raiz","id_padre":null,"padre_raiz_virtual":true,"n":6,"area_visible_total":85676,"parcial":false,"mediana_contraste":119.8,"mediana_area":15509,"atipicos_geometricos":[1656,1677,1695],"miembros":[{"id":1653,"caja":{"x":169.1,"y":553.2,"w":251.1,"h":64},"rasgos":{"color_medio":[173,172,179],"contraste_con_fondo":113.3,"fraccion_tinta":0.8526,"area":16072,"area_visible":16072,"pixeles_muestreados":16380}},{"id":1656,"caja":{"x":142.5,"y":630.2,"w":304.3,"h":79},"rasgos":{"color_medio":[175,178,190],"contraste_con_fondo":102.8,"fraccion_tinta":0.7277,"area":24042,"area_visible":24042,"pixeles_muestreados":24400}},{"id":1674,"caja":{"x":626.3,"y":567.2,"w":187.5,"h":64},"rasgos":{"color_medio":[172,189,192],"contraste_con_fondo":97.6,"fraccion_tinta":0.9338,"area":11997,"area_visible":11997,"pixeles_muestreados":12220}},{"id":1677,"caja":{"x":573.5,"y":644.2,"w":293.1,"h":51},"rasgos":{"color_medio":[95,102,106],"contraste_con_fondo":240.9,"fraccion_tinta":0.9995,"area":14946,"area_visible":14946,"pixeles_muestreados":15288}},{"id":1695,"caja":{"x":1111,"y":581.2,"w":68.6,"h":36},"rasgos":{"color_medio":[150,125,117],"contraste_con_fondo":190.9,"fraccion_tinta":0.9918,"area":2469,"area_visible":2469,"pixeles_muestreados":2553}},{"id":1698,"caja":{"x":987,"y":630.2,"w":316.7,"h":51},"rasgos":{"color_medio":[211,166,142],"contraste_con_fondo":126.2,"fraccion_tinta":0.8236,"area":16150,"area_visible":16150,"pixeles_muestreados":16536}}]},{"conjunto":"g4:LI#369","clave":"LI#369","id_padre":369,"padre_raiz_virtual":false,"n":5,"area_visible_total":37127,"parcial":true,"mediana_contraste":52.5,"mediana_area":2988,"atipicos_geometricos":[371],"miembros":[{"id":371,"caja":{"x":0,"y":-11.5,"w":515.4,"h":65},"rasgos":{"color_medio":[235,241,245],"contraste_con_fondo":7.1,"fraccion_tinta":0.9835,"area":33503,"area_visible":27576,"pixeles_muestreados":27864}},{"id":378,"caja":{"x":552.4,"y":31.5,"w":105.5,"h":22},"rasgos":{"color_medio":[195,211,218],"contraste_con_fondo":57.9,"fraccion_tinta":0.9479,"area":2321,"area_visible":2321,"pixeles_muestreados":2438}},{"id":385,"caja":{"x":695,"y":31.5,"w":136.3,"h":22},"rasgos":{"color_medio":[199,214,220],"contraste_con_fondo":52.5,"fraccion_tinta":0.9395,"area":2998,"area_visible":2998,"pixeles_muestreados":3174}},{"id":392,"caja":{"x":868.2,"y":31.5,"w":135.8,"h":22},"rasgos":{"color_medio":[197,213,219],"contraste_con_fondo":54.9,"fraccion_tinta":0.9451,"area":2988,"area_visible":2988,"pixeles_muestreados":3151}},{"id":399,"caja":{"x":1041,"y":31.5,"w":56.5,"h":22},"rasgos":{"color_medio":[199,214,220],"contraste_con_fondo":52.5,"fraccion_tinta":0.9382,"area":1244,"area_visible":1244,"pixeles_muestreados":1311}}]},{"conjunto":"g4:LI#1576","clave":"LI#1576","id_padre":1576,"padre_raiz_virtual":false,"n":5,"area_visible_total":26390,"parcial":false,"mediana_contraste":273.8,"mediana_area":4949,"atipicos_geometricos":[],"miembros":[{"id":1578,"caja":{"x":240.2,"y":374,"w":215.9,"h":30},"rasgos":{"color_medio":[39,85,130],"contraste_con_fondo":276.6,"fraccion_tinta":0.9724,"area":6476,"area_visible":6476,"pixeles_muestreados":6510}},{"id":1587,"caja":{"x":476,"y":374,"w":144.8,"h":30},"rasgos":{"color_medio":[42,86,132],"contraste_con_fondo":273.1,"fraccion_tinta":0.9708,"area":4344,"area_visible":4344,"pixeles_muestreados":4350}},{"id":1596,"caja":{"x":640.8,"y":374,"w":165,"h":30},"rasgos":{"color_medio":[41,86,132],"contraste_con_fondo":273.8,"fraccion_tinta":0.9751,"area":4949,"area_visible":4949,"pixeles_muestreados":4980}},{"id":1605,"caja":{"x":825.8,"y":374,"w":195.9,"h":30},"rasgos":{"color_medio":[41,87,132],"contraste_con_fondo":273.3,"fraccion_tinta":0.9717,"area":5877,"area_visible":5877,"pixeles_muestreados":5910}},{"id":1614,"caja":{"x":1041.7,"y":374,"w":158.1,"h":30},"rasgos":{"color_medio":[39,85,131],"contraste_con_fondo":276.2,"fraccion_tinta":0.97,"area":4744,"area_visible":4744,"pixeles_muestreados":4770}}]},{"conjunto":"g4:SPAN#raiz","clave":"SPAN#raiz","id_padre":null,"padre_raiz_virtual":true,"n":3,"area_visible_total":23901,"parcial":false,"mediana_contraste":147,"mediana_area":7988,"atipicos_geometricos":[1659,1680],"miembros":[{"id":1659,"caja":{"x":204.7,"y":737.2,"w":179.9,"h":44.4},"rasgos":{"color_medio":[195,180,178],"contraste_con_fondo":97.3,"fraccion_tinta":0.7693,"area":7988,"area_visible":7988,"pixeles_muestreados":8145}},{"id":1680,"caja":{"x":629.2,"y":723.2,"w":181.6,"h":44.4},"rasgos":{"color_medio":[126,134,136],"contraste_con_fondo":187.2,"fraccion_tinta":0.998,"area":8061,"area_visible":8061,"pixeles_muestreados":8190}},{"id":1701,"caja":{"x":1056.9,"y":709.2,"w":176.9,"h":44.4},"rasgos":{"color_medio":[190,149,136],"contraste_con_fondo":147,"fraccion_tinta":0.9999,"area":7852,"area_visible":7852,"pixeles_muestreados":8010}}]},{"conjunto":"g4:BUTTON#938","clave":"BUTTON#938","id_padre":938,"padre_raiz_virtual":false,"n":2,"area_visible_total":5000,"parcial":false,"mediana_contraste":183.1,"mediana_area":2500,"atipicos_geometricos":[],"miembros":[{"id":939,"caja":{"x":1240,"y":272,"w":50,"h":50},"rasgos":{"color_medio":[179,140,117],"contraste_con_fondo":169.9,"fraccion_tinta":0.9912,"area":2500,"area_visible":2500,"pixeles_muestreados":2500}},{"id":1538,"caja":{"x":1303,"y":272,"w":50,"h":50},"rasgos":{"color_medio":[164,124,101],"contraste_con_fondo":196.3,"fraccion_tinta":0.9972,"area":2500,"area_visible":2500,"pixeles_muestreados":2500}}]},{"conjunto":"g4:DIV#472","clave":"DIV#472","id_padre":472,"padre_raiz_virtual":false,"n":3,"area_visible_total":320,"parcial":false,"mediana_contraste":290.4,"mediana_area":120,"atipicos_geometricos":[],"miembros":[{"id":474,"caja":{"x":1215.9,"y":31,"w":30,"h":4},"rasgos":{"color_medio":[29,77,125],"contraste_con_fondo":290.4,"fraccion_tinta":1,"area":120,"area_visible":120,"pixeles_muestreados":124}},{"id":476,"caja":{"x":1225.9,"y":39,"w":20,"h":4},"rasgos":{"color_medio":[36,83,129],"contraste_con_fondo":280.3,"fraccion_tinta":1,"area":80,"area_visible":80,"pixeles_muestreados":84}},{"id":478,"caja":{"x":1215.9,"y":47,"w":30,"h":4},"rasgos":{"color_medio":[29,77,125],"contraste_con_fondo":290.4,"fraccion_tinta":1,"area":120,"area_visible":120,"pixeles_muestreados":124}}]}],"g4_banner_candidatos":[{"id":342,"nodeName":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":86},"contiene_accionables":8},{"id":347,"nodeName":"DIV","caja":{"x":0,"y":-11.5,"w":1265.9,"h":86},"contiene_accionables":8},{"id":349,"nodeName":"DIV","caja":{"x":0,"y":-11.5,"w":1265.9,"h":86},"contiene_accionables":8},{"id":362,"nodeName":"DIV","caja":{"x":0,"y":-11.5,"w":1097.6,"h":86},"contiene_accionables":5},{"id":364,"nodeName":"NAV","caja":{"x":0,"y":-11.5,"w":1097.6,"h":86},"contiene_accionables":5},{"id":369,"nodeName":"UL","caja":{"x":0,"y":-11.5,"w":1097.6,"h":65},"contiene_accionables":5},{"id":933,"nodeName":"DIV","caja":{"x":-1440,"y":0,"w":18720,"h":366},"contiene_accionables":9},{"id":935,"nodeName":"DIV","caja":{"x":-1440,"y":0,"w":18720,"h":366},"contiene_accionables":9},{"id":938,"nodeName":"DIV","caja":{"x":-1440,"y":0,"w":18720,"h":366},"contiene_accionables":9},{"id":943,"nodeName":"DIV","caja":{"x":-1440,"y":86,"w":18720,"h":280},"contiene_accionables":1},{"id":944,"nodeName":"DIV","caja":{"x":-1440,"y":86,"w":18720,"h":280},"contiene_accionables":1},{"id":992,"nodeName":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"contiene_accionables":1},{"id":994,"nodeName":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"contiene_accionables":1},{"id":997,"nodeName":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"contiene_accionables":0},{"id":999,"nodeName":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"contiene_accionables":0},{"id":1001,"nodeName":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"contiene_accionables":0},{"id":1002,"nodeName":"IMG","caja":{"x":0,"y":86,"w":1440,"h":280},"contiene_accionables":0}],"g4_cromo_candidatos":[{"id":342,"caja":{"x":0,"y":0,"w":1440,"h":86},"rasgos":{"color_medio":[243,246,248],"contraste_con_fondo":10.4,"fraccion_tinta":0.9768,"area":123840,"area_visible":123840,"pixeles_muestreados":123840}},{"id":347,"caja":{"x":0,"y":-11.5,"w":1265.9,"h":86},"rasgos":{"color_medio":[239,243,246],"contraste_con_fondo":6.8,"fraccion_tinta":0.9698,"area":108865,"area_visible":94308,"pixeles_muestreados":94950}},{"id":349,"caja":{"x":0,"y":-11.5,"w":1265.9,"h":86},"rasgos":{"color_medio":[239,243,246],"contraste_con_fondo":6.8,"fraccion_tinta":0.9698,"area":108865,"area_visible":94308,"pixeles_muestreados":94950}},{"id":362,"caja":{"x":0,"y":-11.5,"w":1097.6,"h":86},"rasgos":{"color_medio":[238,243,246],"contraste_con_fondo":7,"fraccion_tinta":0.9871,"area":94390,"area_visible":81768,"pixeles_muestreados":82350}},{"id":364,"caja":{"x":0,"y":-11.5,"w":1097.6,"h":86},"rasgos":{"color_medio":[238,243,246],"contraste_con_fondo":7,"fraccion_tinta":0.9871,"area":94390,"area_visible":81768,"pixeles_muestreados":82350}},{"id":366,"caja":{"x":443.1,"y":26.5,"w":375.3,"h":48},"rasgos":{"color_medio":[232,240,243],"contraste_con_fondo":8.5,"fraccion_tinta":0.9768,"area":18014,"area_visible":18014,"pixeles_muestreados":18424}},{"id":369,"caja":{"x":0,"y":-11.5,"w":1097.6,"h":65},"rasgos":{"color_medio":[236,241,244],"contraste_con_fondo":5.7,"fraccion_tinta":0.9826,"area":71342,"area_visible":58720,"pixeles_muestreados":59292}},{"id":371,"caja":{"x":0,"y":-11.5,"w":515.4,"h":65},"rasgos":{"color_medio":[235,241,245],"contraste_con_fondo":7.1,"fraccion_tinta":0.9835,"area":33503,"area_visible":27576,"pixeles_muestreados":27864}},{"id":373,"caja":{"x":0,"y":-11.5,"w":515.4,"h":65},"rasgos":{"color_medio":[235,241,245],"contraste_con_fondo":7.1,"fraccion_tinta":0.9835,"area":33503,"area_visible":27576,"pixeles_muestreados":27864}},{"id":439,"caja":{"x":1135.9,"y":18,"w":50,"h":50},"rasgos":{"color_medio":[232,236,238],"contraste_con_fondo":9.2,"fraccion_tinta":0.2922,"area":2500,"area_visible":2500,"pixeles_muestreados":2550}},{"id":472,"caja":{"x":1225.9,"y":15,"w":40,"h":56},"rasgos":{"color_medio":[230,235,240],"contraste_con_fondo":11.2,"fraccion_tinta":1,"area":2240,"area_visible":2240,"pixeles_muestreados":2296}},{"id":1027,"caja":{"x":50,"y":268,"w":172.8,"h":49},"rasgos":{"color_medio":[232,242,247],"contraste_con_fondo":10.8,"fraccion_tinta":0.9886,"area":8466,"area_visible":8466,"pixeles_muestreados":8477}},{"id":1029,"caja":{"x":50,"y":268,"w":172.8,"h":49},"rasgos":{"color_medio":[232,242,247],"contraste_con_fondo":10.8,"fraccion_tinta":0.9886,"area":8466,"area_visible":8466,"pixeles_muestreados":8477}},{"id":1030,"caja":{"x":50,"y":268,"w":172.8,"h":49},"rasgos":{"color_medio":[232,242,247],"contraste_con_fondo":10.8,"fraccion_tinta":0.9886,"area":8466,"area_visible":8466,"pixeles_muestreados":8477}},{"id":1706,"caja":{"x":92,"y":890.4,"w":405.3,"h":440.4},"rasgos":{"color_medio":[219,225,231],"contraste_con_fondo":27.3,"fraccion_tinta":0.1379,"area":178503,"area_visible":3895,"pixeles_muestreados":4060}},{"id":1727,"caja":{"x":517.3,"y":890.4,"w":405.3,"h":440.4},"rasgos":{"color_medio":[234,236,238],"contraste_con_fondo":7.5,"fraccion_tinta":0.0446,"area":178503,"area_visible":3895,"pixeles_muestreados":4060}},{"id":1748,"caja":{"x":942.7,"y":890.4,"w":405.3,"h":440.4},"rasgos":{"color_medio":[227,231,234],"contraste_con_fondo":16.9,"fraccion_tinta":0.0946,"area":178510,"area_visible":3895,"pixeles_muestreados":4060}}],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[266,2],[316,266],[323,316],[324,323],[325,324],[328,323],[340,266],[342,340],[347,342],[349,347],[351,349],[353,351],[355,353],[357,355],[362,349],[364,362],[366,364],[367,366],[369,364],[371,369],[373,371],[375,373],[378,369],[380,378],[382,380],[385,369],[387,385],[389,387],[392,369],[394,392],[396,394],[399,369],[401,399],[403,401],[439,349],[441,439],[443,441],[453,443],[472,349],[474,472],[476,472],[478,472],[881,340],[927,881],[929,927],[931,929],[933,931],[935,933],[938,935],[939,938],[940,939],[943,938],[944,943],[992,944],[994,992],[997,994],[999,997],[1001,999],[1002,1001],[1017,994],[1019,1017],[1021,1019],[1022,1021],[1024,1019],[1025,1024],[1027,1019],[1029,1027],[1030,1029],[1031,1030],[1538,938],[1539,1538],[1541,938],[1542,1541],[1543,1542],[1544,1543],[1546,1541],[1547,1546],[1548,1547],[1550,1541],[1551,1550],[1552,1551],[1554,1541],[1555,1554],[1556,1555],[1558,1541],[1559,1558],[1560,1559],[1562,1541],[1563,1562],[1564,1563],[1569,931],[1571,1569],[1574,1571],[1576,1574],[1578,1576],[1580,1578],[1582,1580],[1583,1582],[1584,1580],[1587,1576],[1589,1587],[1591,1589],[1592,1591],[1593,1589],[1596,1576],[1598,1596],[1600,1598],[1601,1600],[1602,1598],[1605,1576],[1607,1605],[1609,1607],[1610,1609],[1611,1607],[1614,1576],[1616,1614],[1618,1616],[1619,1618],[1620,1616],[1627,931],[1629,1627],[1632,1629],[1634,1632],[1636,1634],[1641,1636],[1643,1641],[1645,1643],[1646,1645],[1648,1643],[1649,1648],[1653,null],[1654,1653],[1656,null],[1657,1656],[1659,null],[1660,1659],[1664,1641],[1666,1664],[1667,1666],[1669,1664],[1670,1669],[1674,null],[1675,1674],[1677,null],[1678,1677],[1680,null],[1681,1680],[1685,1641],[1687,1685],[1688,1687],[1690,1685],[1691,1690],[1695,null],[1696,1695],[1698,null],[1699,1698],[1701,null],[1702,1701],[1706,1641],[1708,1706],[1709,1708],[1727,1641],[1729,1727],[1730,1729],[1748,1641],[1750,1748],[1751,1750],[3089,266],[3091,3089],[3093,3091],[3094,3093]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"126226517ead1202ac1b5b9e9184ea108d30ddc180eea1cdf44306f8b69ddf4e","wireframe":"abe2a8093e8766424c443a40a18688d3271a4854966a06d7996d1e83d7021b25"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.