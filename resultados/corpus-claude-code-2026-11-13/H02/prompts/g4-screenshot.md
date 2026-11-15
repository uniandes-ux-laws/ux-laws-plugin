# Ejecución 1.0.0

Evalúa solo G4, captura captures/H02.

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
{"pagina":{"id":"H02","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:16:03.901Z","sanity_ok":null,"consent_limpio":null},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[248,248,248],"g4_conjuntos_pares_total":18,"g4_conjuntos_pares":[{"conjunto":"g4:SECTION#758","clave":"SECTION#758","id_padre":758,"padre_raiz_virtual":false,"n":2,"area_visible_total":2197553,"parcial":true,"mediana_contraste":114.5,"mediana_area":8240268,"atipicos_geometricos":[760],"miembros":[{"id":760,"caja":{"x":-2880,"y":0,"w":18720,"h":755.8},"rasgos":{"color_medio":[161,182,200],"contraste_con_fondo":119.3,"fraccion_tinta":0.5582,"area":14147933,"area_visible":1088303,"pixeles_muestreados":1088640}},{"id":957,"caja":{"x":0,"y":0,"w":1232.5,"h":1892.6},"rasgos":{"color_medio":[168,188,203],"contraste_con_fondo":109.7,"fraccion_tinta":0.553,"area":2332603,"area_visible":1109250,"pixeles_muestreados":1109700}}]},{"conjunto":"g4:DIV#314","clave":"DIV#314","id_padre":314,"padre_raiz_virtual":false,"n":3,"area_visible_total":1781496,"parcial":true,"mediana_contraste":100.6,"mediana_area":480960,"atipicos_geometricos":[316,756,1700],"miembros":[{"id":316,"caja":{"x":0,"y":0,"w":1440,"h":334},"rasgos":{"color_medio":[204,215,233],"contraste_con_fondo":57,"fraccion_tinta":0.2744,"area":480960,"area_visible":480960,"pixeles_muestreados":480960}},{"id":756,"caja":{"x":-2880,"y":0,"w":18720,"h":5248.8},"rasgos":{"color_medio":[175,193,206],"contraste_con_fondo":100.6,"fraccion_tinta":0.5066,"area":98257770,"area_visible":1296000,"pixeles_muestreados":1296000}},{"id":1700,"caja":{"x":1396,"y":220,"w":27,"h":168},"rasgos":{"color_medio":[102,191,203],"contraste_con_fondo":163.1,"fraccion_tinta":0.6362,"area":4536,"area_visible":4536,"pixeles_muestreados":4536}}]},{"conjunto":"g4:DIV#760","clave":"DIV#760","id_padre":760,"padre_raiz_virtual":false,"n":2,"area_visible_total":1419199,"parcial":true,"mediana_contraste":146.3,"mediana_area":7049335,"atipicos_geometricos":[762],"miembros":[{"id":762,"caja":{"x":-2880,"y":0,"w":18720,"h":733.8},"rasgos":{"color_medio":[158,180,198],"contraste_con_fondo":123.4,"fraccion_tinta":0.5737,"area":13736093,"area_visible":1056623,"pixeles_muestreados":1056960}},{"id":912,"caja":{"x":75,"y":483.8,"w":1333,"h":272},"rasgos":{"color_medio":[123,158,178],"contraste_con_fondo":169.2,"fraccion_tinta":0.7716,"area":362576,"area_visible":362576,"pixeles_muestreados":363909}}]},{"conjunto":"g4:DIV#316","clave":"DIV#316","id_padre":316,"padre_raiz_virtual":false,"n":3,"area_visible_total":337770,"parcial":false,"mediana_contraste":40.1,"mediana_area":103680,"atipicos_geometricos":[332,743],"miembros":[{"id":332,"caja":{"x":63,"y":60,"w":1314,"h":165},"rasgos":{"color_medio":[224,232,242],"contraste_con_fondo":29.5,"fraccion_tinta":0.1802,"area":216810,"area_visible":216810,"pixeles_muestreados":216810}},{"id":434,"caja":{"x":0,"y":250,"w":1440,"h":72},"rasgos":{"color_medio":[214,228,241],"contraste_con_fondo":40.1,"fraccion_tinta":0.175,"area":103680,"area_visible":103680,"pixeles_muestreados":103680}},{"id":743,"caja":{"x":0,"y":322,"w":1440,"h":12},"rasgos":{"color_medio":[157,105,68],"contraste_con_fondo":247.2,"fraccion_tinta":0.9992,"area":17280,"area_visible":17280,"pixeles_muestreados":17280}}]},{"conjunto":"g4:SPAN#662","clave":"SPAN#662","id_padre":662,"padre_raiz_virtual":false,"n":2,"area_visible_total":295010,"parcial":false,"mediana_contraste":43.4,"mediana_area":147505,"atipicos_geometricos":[667],"miembros":[{"id":664,"caja":{"x":900.3,"y":265.5,"w":74.6,"h":38},"rasgos":{"color_medio":[216,227,249],"contraste_con_fondo":38.3,"fraccion_tinta":0.2301,"area":2834,"area_visible":2834,"pixeles_muestreados":2925}},{"id":667,"caja":{"x":0,"y":0,"w":998.9,"h":292.5},"rasgos":{"color_medio":[209,220,241],"contraste_con_fondo":48.5,"fraccion_tinta":0.2333,"area":292176,"area_visible":292176,"pixeles_muestreados":292707}}]},{"conjunto":"g4:SPAN#502","clave":"SPAN#502","id_padre":502,"padre_raiz_virtual":false,"n":2,"area_visible_total":206580,"parcial":false,"mediana_contraste":42.3,"mediana_area":103290,"atipicos_geometricos":[507],"miembros":[{"id":504,"caja":{"x":502.4,"y":265.5,"w":155.8,"h":38},"rasgos":{"color_medio":[214,225,248],"contraste_con_fondo":41,"fraccion_tinta":0.2497,"area":5920,"area_visible":5920,"pixeles_muestreados":6123}},{"id":507,"caja":{"x":0,"y":0,"w":686,"h":292.5},"rasgos":{"color_medio":[213,223,241],"contraste_con_fondo":43.6,"fraccion_tinta":0.2142,"area":200660,"area_visible":200660,"pixeles_muestreados":201291}}]},{"conjunto":"g4:DIV#334","clave":"DIV#334","id_padre":334,"padre_raiz_virtual":false,"n":3,"area_visible_total":157536,"parcial":false,"mediana_contraste":41.7,"mediana_area":30730,"atipicos_geometricos":[336,367],"miembros":[{"id":336,"caja":{"x":577,"y":60,"w":788,"h":39},"rasgos":{"color_medio":[109,145,218],"contraste_con_fondo":175.6,"fraccion_tinta":0.7597,"area":30730,"area_visible":30730,"pixeles_muestreados":30732}},{"id":354,"caja":{"x":79.1,"y":112,"w":288,"h":100},"rasgos":{"color_medio":[221,226,225],"contraste_con_fondo":41.7,"fraccion_tinta":0.211,"area":28802,"area_visible":28802,"pixeles_muestreados":28900}},{"id":367,"caja":{"x":587.2,"y":99,"w":777.8,"h":126},"rasgos":{"color_medio":[242,246,247],"contraste_con_fondo":6.4,"fraccion_tinta":0.0981,"area":98004,"area_visible":98004,"pixeles_muestreados":98028}}]},{"conjunto":"g4:DIV#367","clave":"DIV#367","id_padre":367,"padre_raiz_virtual":false,"n":2,"area_visible_total":56749,"parcial":false,"mediana_contraste":21.3,"mediana_area":28375,"atipicos_geometricos":[],"miembros":[{"id":369,"caja":{"x":587.2,"y":134,"w":583.6,"h":56},"rasgos":{"color_medio":[247,247,247],"contraste_con_fondo":1.7,"fraccion_tinta":0.0558,"area":32683,"area_visible":32683,"pixeles_muestreados":32704}},{"id":387,"caja":{"x":1174,"y":99,"w":191,"h":126},"rasgos":{"color_medio":[214,230,234],"contraste_con_fondo":40.9,"fraccion_tinta":0.3236,"area":24066,"area_visible":24066,"pixeles_muestreados":24066}}]},{"conjunto":"g4:LI#478","clave":"LI#478","id_padre":478,"padre_raiz_virtual":false,"n":7,"area_visible_total":51001,"parcial":false,"mediana_contraste":33.3,"mediana_area":6229,"atipicos_geometricos":[480,489,498],"miembros":[{"id":480,"caja":{"x":75,"y":259.5,"w":72.3,"h":50},"rasgos":{"color_medio":[35,98,225],"contraste_con_fondo":261.5,"fraccion_tinta":0.9234,"area":3615,"area_visible":3615,"pixeles_muestreados":3723}},{"id":489,"caja":{"x":192.3,"y":259.5,"w":244.4,"h":50},"rasgos":{"color_medio":[218,229,249],"contraste_con_fondo":35.5,"fraccion_tinta":0.1992,"area":12218,"area_visible":12218,"pixeles_muestreados":12495}},{"id":498,"caja":{"x":481.7,"y":259.5,"w":213.4,"h":50},"rasgos":{"color_medio":[220,230,249],"contraste_con_fondo":33.3,"fraccion_tinta":0.1916,"area":10668,"area_visible":10668,"pixeles_muestreados":10965}},{"id":649,"caja":{"x":740,"y":259.5,"w":98.3,"h":50},"rasgos":{"color_medio":[228,235,251],"contraste_con_fondo":24,"fraccion_tinta":0.1428,"area":4915,"area_visible":4915,"pixeles_muestreados":5049}},{"id":658,"caja":{"x":883.3,"y":259.5,"w":124.6,"h":50},"rasgos":{"color_medio":[224,233,250],"contraste_con_fondo":28.4,"fraccion_tinta":0.1677,"area":6229,"area_visible":6229,"pixeles_muestreados":6375}},{"id":713,"caja":{"x":1052.9,"y":259.5,"w":110.3,"h":50},"rasgos":{"color_medio":[228,236,251],"contraste_con_fondo":23.5,"fraccion_tinta":0.1408,"area":5513,"area_visible":5513,"pixeles_muestreados":5712}},{"id":722,"caja":{"x":1208.1,"y":259.5,"w":156.9,"h":50},"rasgos":{"color_medio":[220,230,249],"contraste_con_fondo":33.3,"fraccion_tinta":0.1926,"area":7843,"area_visible":7843,"pixeles_muestreados":8007}}]},{"conjunto":"g4:A#338","clave":"A#338","id_padre":338,"padre_raiz_virtual":false,"n":4,"area_visible_total":29417,"parcial":false,"mediana_contraste":204.6,"mediana_area":5642,"atipicos_geometricos":[343,349],"miembros":[{"id":340,"caja":{"x":577,"y":60,"w":161.1,"h":39},"rasgos":{"color_medio":[78,122,211],"contraste_con_fondo":214.8,"fraccion_tinta":0.9136,"area":6283,"area_visible":6283,"pixeles_muestreados":6318}},{"id":343,"caja":{"x":748.2,"y":60,"w":377.5,"h":39},"rasgos":{"color_medio":[76,121,210],"contraste_con_fondo":217.2,"fraccion_tinta":0.9261,"area":14722,"area_visible":14722,"pixeles_muestreados":14742}},{"id":346,"caja":{"x":1135.6,"y":60.5,"w":89.8,"h":38},"rasgos":{"color_medio":[94,134,215],"contraste_con_fondo":194.4,"fraccion_tinta":0.8292,"area":3411,"area_visible":3411,"pixeles_muestreados":3549}},{"id":349,"caja":{"x":1233.4,"y":60.5,"w":131.6,"h":38},"rasgos":{"color_medio":[226,232,247],"contraste_con_fondo":27.2,"fraccion_tinta":0.1904,"area":5001,"area_visible":5001,"pixeles_muestreados":5148}}]},{"conjunto":"g4:IMG#354","clave":"IMG#354","id_padre":354,"padre_raiz_virtual":false,"n":2,"area_visible_total":27151,"parcial":false,"mediana_contraste":41.8,"mediana_area":13576,"atipicos_geometricos":[],"miembros":[{"id":356,"caja":{"x":79.1,"y":112,"w":103.5,"h":100},"rasgos":{"color_medio":[226,241,238],"contraste_con_fondo":25.2,"fraccion_tinta":0.2286,"area":10353,"area_visible":10353,"pixeles_muestreados":10400}},{"id":361,"caja":{"x":199.1,"y":112,"w":168,"h":100},"rasgos":{"color_medio":[215,214,214],"contraste_con_fondo":58.3,"fraccion_tinta":0.2202,"area":16798,"area_visible":16798,"pixeles_muestreados":16900}}]},{"conjunto":"g4:DIV#743","clave":"DIV#743","id_padre":743,"padre_raiz_virtual":false,"n":3,"area_visible_total":17280,"parcial":false,"mediana_contraste":305.6,"mediana_area":5184,"atipicos_geometricos":[745],"miembros":[{"id":745,"caja":{"x":0,"y":322,"w":576,"h":12},"rasgos":{"color_medio":[245,177,44],"contraste_con_fondo":216,"fraccion_tinta":1,"area":6912,"area_visible":6912,"pixeles_muestreados":6912}},{"id":748,"caja":{"x":576,"y":322,"w":432,"h":12},"rasgos":{"color_medio":[19,73,133],"contraste_con_fondo":310.3,"fraccion_tinta":1,"area":5184,"area_visible":5184,"pixeles_muestreados":5184}},{"id":751,"caja":{"x":1008,"y":322,"w":432,"h":12},"rasgos":{"color_medio":[176,41,35],"contraste_con_fondo":305.6,"fraccion_tinta":0.9973,"area":5184,"area_visible":5184,"pixeles_muestreados":5184}}]},{"conjunto":"g4:DIV#387","clave":"DIV#387","id_padre":387,"padre_raiz_virtual":false,"n":2,"area_visible_total":13547,"parcial":false,"mediana_contraste":100.5,"mediana_area":6774,"atipicos_geometricos":[389,406],"miembros":[{"id":389,"caja":{"x":1249.4,"y":99,"w":60.3,"h":79},"rasgos":{"color_medio":[106,186,202],"contraste_con_fondo":161.6,"fraccion_tinta":0.6997,"area":4761,"area_visible":4761,"pixeles_muestreados":4819}},{"id":406,"caja":{"x":1174,"y":179,"w":191,"h":46},"rasgos":{"color_medio":[223,226,227],"contraste_con_fondo":39.4,"fraccion_tinta":0.5026,"area":8786,"area_visible":8786,"pixeles_muestreados":8786}}]},{"conjunto":"g4:IMG#406","clave":"IMG#406","id_padre":406,"padre_raiz_virtual":false,"n":2,"area_visible_total":10181,"parcial":false,"mediana_contraste":58.5,"mediana_area":5091,"atipicos_geometricos":[407],"miembros":[{"id":407,"caja":{"x":1174,"y":179,"w":191,"h":46},"rasgos":{"color_medio":[223,226,227],"contraste_con_fondo":39.4,"fraccion_tinta":0.5026,"area":8786,"area_visible":8786,"pixeles_muestreados":8786}},{"id":410,"caja":{"x":1265,"y":195,"w":93,"h":15},"rasgos":{"color_medio":[198,204,208],"contraste_con_fondo":77.7,"fraccion_tinta":0.8867,"area":1395,"area_visible":1395,"pixeles_muestreados":1395}}]},{"conjunto":"g4:BUTTON#920","clave":"BUTTON#920","id_padre":920,"padre_raiz_virtual":false,"n":2,"area_visible_total":3698,"parcial":false,"mediana_contraste":118.6,"mediana_area":1849,"atipicos_geometricos":[],"miembros":[{"id":921,"caja":{"x":75,"y":483.8,"w":43,"h":43},"rasgos":{"color_medio":[205,176,127],"contraste_con_fondo":147.2,"fraccion_tinta":0.9239,"area":1849,"area_visible":1849,"pixeles_muestreados":1892}},{"id":932,"caja":{"x":1365,"y":483.8,"w":43,"h":43},"rasgos":{"color_medio":[196,197,195],"contraste_con_fondo":90.1,"fraccion_tinta":0.3166,"area":1849,"area_visible":1849,"pixeles_muestreados":1892}}]},{"conjunto":"g4:LI#935","clave":"LI#935","id_padre":935,"padre_raiz_virtual":false,"n":6,"area_visible_total":1944,"parcial":false,"mediana_contraste":265.5,"mediana_area":324,"atipicos_geometricos":[939],"miembros":[{"id":936,"caja":{"x":626.8,"y":644.8,"w":18,"h":18},"rasgos":{"color_medio":[47,135,164],"contraste_con_fondo":245.4,"fraccion_tinta":0.9778,"area":324,"area_visible":324,"pixeles_muestreados":361}},{"id":939,"caja":{"x":656.8,"y":644.8,"w":18,"h":18},"rasgos":{"color_medio":[176,209,219],"contraste_con_fondo":86.9,"fraccion_tinta":0.3684,"area":324,"area_visible":324,"pixeles_muestreados":361}},{"id":942,"caja":{"x":686.8,"y":644.8,"w":18,"h":18},"rasgos":{"color_medio":[39,125,145],"contraste_con_fondo":263.5,"fraccion_tinta":0.9778,"area":324,"area_visible":324,"pixeles_muestreados":361}},{"id":945,"caja":{"x":716.8,"y":644.8,"w":18,"h":18},"rasgos":{"color_medio":[37,124,140],"contraste_con_fondo":267.5,"fraccion_tinta":0.9778,"area":324,"area_visible":324,"pixeles_muestreados":361}},{"id":948,"caja":{"x":746.8,"y":644.8,"w":18,"h":18},"rasgos":{"color_medio":[40,116,125],"contraste_con_fondo":275.3,"fraccion_tinta":0.9778,"area":324,"area_visible":324,"pixeles_muestreados":361}},{"id":951,"caja":{"x":776.8,"y":644.8,"w":18,"h":18},"rasgos":{"color_medio":[38,118,129],"contraste_con_fondo":274.2,"fraccion_tinta":0.9778,"area":324,"area_visible":324,"pixeles_muestreados":361}}]},{"conjunto":"g4:DIV#406","clave":"DIV#406","id_padre":406,"padre_raiz_virtual":false,"n":2,"area_visible_total":966,"parcial":false,"mediana_contraste":76.8,"mediana_area":483,"atipicos_geometricos":[],"miembros":[{"id":411,"caja":{"x":1271,"y":196,"w":50.1,"h":12},"rasgos":{"color_medio":[212,218,221],"contraste_con_fondo":54.1,"fraccion_tinta":0.7598,"area":602,"area_visible":602,"pixeles_muestreados":612}},{"id":414,"caja":{"x":1230,"y":197,"w":26,"h":14},"rasgos":{"color_medio":[164,202,221],"contraste_con_fondo":99.5,"fraccion_tinta":1,"area":364,"area_visible":364,"pixeles_muestreados":364}}]},{"conjunto":"g4:DIV#414","clave":"DIV#414","id_padre":414,"padre_raiz_virtual":false,"n":6,"area_visible_total":102,"parcial":false,"mediana_contraste":200,"mediana_area":17,"atipicos_geometricos":[420,421],"miembros":[{"id":416,"caja":{"x":1234,"y":208,"w":2,"h":3},"rasgos":{"color_medio":[57,189,255],"contraste_con_fondo":200,"fraccion_tinta":1,"area":6,"area_visible":6,"pixeles_muestreados":6}},{"id":417,"caja":{"x":1238,"y":206,"w":2,"h":5},"rasgos":{"color_medio":[57,189,255],"contraste_con_fondo":200,"fraccion_tinta":1,"area":10,"area_visible":10,"pixeles_muestreados":10}},{"id":418,"caja":{"x":1242,"y":204,"w":2,"h":7},"rasgos":{"color_medio":[57,189,255],"contraste_con_fondo":200,"fraccion_tinta":1,"area":14,"area_visible":14,"pixeles_muestreados":14}},{"id":419,"caja":{"x":1246,"y":201,"w":2,"h":10},"rasgos":{"color_medio":[57,189,255],"contraste_con_fondo":200,"fraccion_tinta":1,"area":20,"area_visible":20,"pixeles_muestreados":20}},{"id":420,"caja":{"x":1250,"y":199,"w":2,"h":12},"rasgos":{"color_medio":[57,189,255],"contraste_con_fondo":200,"fraccion_tinta":1,"area":24,"area_visible":24,"pixeles_muestreados":24}},{"id":421,"caja":{"x":1254,"y":197,"w":2,"h":14},"rasgos":{"color_medio":[57,189,255],"contraste_con_fondo":200,"fraccion_tinta":1,"area":28,"area_visible":28,"pixeles_muestreados":28}}]}],"g4_banner_candidatos":[{"id":316,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":334},"contiene_accionables":13},{"id":318,"nodeName":"NAV","caja":{"x":0,"y":0,"w":1440,"h":40},"contiene_accionables":0},{"id":332,"nodeName":"DIV","caja":{"x":63,"y":60,"w":1314,"h":165},"contiene_accionables":6},{"id":334,"nodeName":"DIV","caja":{"x":63,"y":60,"w":1314,"h":140},"contiene_accionables":6},{"id":436,"nodeName":"NAV","caja":{"x":0,"y":0,"w":1380,"h":322},"contiene_accionables":7},{"id":438,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1380,"h":322},"contiene_accionables":7},{"id":760,"nodeName":"SECTION","caja":{"x":-2880,"y":0,"w":18720,"h":755.8},"contiene_accionables":10},{"id":762,"nodeName":"DIV","caja":{"x":-2880,"y":0,"w":18720,"h":733.8},"contiene_accionables":1},{"id":764,"nodeName":"DIV","caja":{"x":-2880,"y":0,"w":18720,"h":733.8},"contiene_accionables":1},{"id":765,"nodeName":"DIV","caja":{"x":-2880,"y":0,"w":18720,"h":733.8},"contiene_accionables":1}],"g4_cromo_candidatos":[{"id":332,"caja":{"x":63,"y":60,"w":1314,"h":165},"rasgos":{"color_medio":[224,232,242],"contraste_con_fondo":29.5,"fraccion_tinta":0.1802,"area":216810,"area_visible":216810,"pixeles_muestreados":216810}},{"id":349,"caja":{"x":1233.4,"y":60.5,"w":131.6,"h":38},"rasgos":{"color_medio":[226,232,247],"contraste_con_fondo":27.2,"fraccion_tinta":0.1904,"area":5001,"area_visible":5001,"pixeles_muestreados":5148}},{"id":356,"caja":{"x":79.1,"y":112,"w":103.5,"h":100},"rasgos":{"color_medio":[226,241,238],"contraste_con_fondo":25.2,"fraccion_tinta":0.2286,"area":10353,"area_visible":10353,"pixeles_muestreados":10400}},{"id":367,"caja":{"x":587.2,"y":99,"w":777.8,"h":126},"rasgos":{"color_medio":[242,246,247],"contraste_con_fondo":6.4,"fraccion_tinta":0.0981,"area":98004,"area_visible":98004,"pixeles_muestreados":98028}},{"id":369,"caja":{"x":587.2,"y":134,"w":583.6,"h":56},"rasgos":{"color_medio":[247,247,247],"contraste_con_fondo":1.7,"fraccion_tinta":0.0558,"area":32683,"area_visible":32683,"pixeles_muestreados":32704}},{"id":371,"caja":{"x":587.2,"y":134,"w":583.6,"h":56},"rasgos":{"color_medio":[247,247,247],"contraste_con_fondo":1.7,"fraccion_tinta":0.0558,"area":32683,"area_visible":32683,"pixeles_muestreados":32704}},{"id":478,"caja":{"x":60,"y":250,"w":1320,"h":69},"rasgos":{"color_medio":[224,232,247],"contraste_con_fondo":28.9,"fraccion_tinta":0.1336,"area":91080,"area_visible":91080,"pixeles_muestreados":91080}},{"id":649,"caja":{"x":740,"y":259.5,"w":98.3,"h":50},"rasgos":{"color_medio":[228,235,251],"contraste_con_fondo":24,"fraccion_tinta":0.1428,"area":4915,"area_visible":4915,"pixeles_muestreados":5049}},{"id":651,"caja":{"x":740,"y":259.5,"w":98.3,"h":50},"rasgos":{"color_medio":[228,235,251],"contraste_con_fondo":24,"fraccion_tinta":0.1428,"area":4915,"area_visible":4915,"pixeles_muestreados":5049}},{"id":658,"caja":{"x":883.3,"y":259.5,"w":124.6,"h":50},"rasgos":{"color_medio":[224,233,250],"contraste_con_fondo":28.4,"fraccion_tinta":0.1677,"area":6229,"area_visible":6229,"pixeles_muestreados":6375}},{"id":660,"caja":{"x":883.3,"y":259.5,"w":124.6,"h":50},"rasgos":{"color_medio":[224,233,250],"contraste_con_fondo":28.4,"fraccion_tinta":0.1677,"area":6229,"area_visible":6229,"pixeles_muestreados":6375}},{"id":713,"caja":{"x":1052.9,"y":259.5,"w":110.3,"h":50},"rasgos":{"color_medio":[228,236,251],"contraste_con_fondo":23.5,"fraccion_tinta":0.1408,"area":5513,"area_visible":5513,"pixeles_muestreados":5712}},{"id":715,"caja":{"x":1052.9,"y":259.5,"w":110.3,"h":50},"rasgos":{"color_medio":[228,236,251],"contraste_con_fondo":23.5,"fraccion_tinta":0.1408,"area":5513,"area_visible":5513,"pixeles_muestreados":5712}}],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[131,2],[218,131],[312,218],[314,312],[316,314],[318,316],[320,318],[322,320],[324,322],[332,316],[334,332],[336,334],[338,336],[340,338],[341,340],[343,338],[344,343],[346,338],[347,346],[349,338],[350,349],[354,334],[356,354],[361,354],[367,334],[369,367],[371,369],[382,null],[387,367],[389,387],[391,389],[393,391],[395,391],[396,395],[406,387],[407,406],[410,406],[411,406],[412,411],[413,412],[414,406],[416,414],[417,414],[418,414],[419,414],[420,414],[421,414],[422,414],[434,316],[436,434],[438,436],[449,438],[478,449],[480,478],[482,480],[484,482],[485,484],[489,478],[491,489],[493,491],[494,493],[498,478],[500,498],[502,500],[504,502],[505,504],[507,502],[508,507],[649,478],[651,649],[653,651],[654,653],[658,478],[660,658],[662,660],[664,662],[665,664],[667,662],[668,667],[713,478],[715,713],[717,715],[718,717],[722,478],[724,722],[726,724],[728,726],[729,728],[743,316],[745,743],[748,743],[751,743],[756,314],[758,756],[760,758],[762,760],[764,762],[765,764],[790,765],[791,790],[792,791],[794,791],[795,794],[796,795],[797,796],[798,797],[798,797],[799,796],[800,795],[912,760],[914,912],[916,914],[917,916],[920,912],[921,920],[922,921],[923,922],[923,922],[925,920],[927,925],[928,927],[928,927],[930,925],[932,920],[933,932],[934,933],[934,933],[935,920],[936,935],[937,936],[939,935],[940,939],[942,935],[943,942],[945,935],[946,945],[948,935],[949,948],[951,935],[952,951],[957,758],[959,957],[960,959],[1700,314],[1702,1700]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"fcaad1a2e706e1b5aefe6b86908381afc8a5548bd7b8eb8985061f7ca745d0ca","wireframe":"f67c56c7aaff9e330fab3187d610615f93111658ab04f35ab5410b9c4e004641"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.