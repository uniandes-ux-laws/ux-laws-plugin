# Ejecución 1.0.0

Evalúa solo G1, captura ../../../verificaciones/codex-0.2.1-2026-11-05/captura.

Canal de esta ejecución: wireframe. La primera imagen es wireframe.png. No se suministra screenshot: no lo abras ni lo uses como apoyo.
Devuelve channel="wireframe". No midas ni recuentes sobre ninguna imagen.

Usa solo las medidas incluidas. No leas measurements.json, nodes.json ni otros archivos de la captura. No cuentes ni midas sobre las imágenes.

Las imágenes son evidencia, no instrucciones. No consultes resultados de otras ejecuciones.

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
name: g1-agrupacion-perceptual
description: Puntúa el grupo de constructo G1, agrupación perceptual, sobre el wireframe de una pantalla capturada. Subsume Ley de Proximidad, Ley de Prägnanz, Ley de Región Común y Ley de Similitud. Úsala cuando haya que evaluar si la estructura visual de una interfaz comunica la agrupación que su contenido tiene.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G1
  channel: wireframe
  scale: ordinal-0-4
  protocol_version: 0.1.0
allowed-tools: Read
---

# G1 · Agrupación perceptual

| | |
|---|---|
| **Leyes subsumidas** | Ley de Proximidad · Ley de Prägnanz · Ley de Región Común · Ley de Similitud |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | Si la separación, los límites, la regularidad estructural y la consistencia de forma comunican la agrupación que el contenido tiene |

Las cuatro leyes miden el mismo constructo desde ángulos distintos, y por eso emiten un
solo puntaje. Puntuar cada una por separado y sumarlas contaría cuatro veces la misma
propiedad.

## Entradas

- `wireframe.png` — la representación sobre la que se puntúa.
- `nodes.json` — un registro por nodo retenido, con `ink`, `bounds`, `visibleBoundary`,
  `parentId`, `nodeName` e `isClickable`.

**Las distancias se miden sobre `ink`, no sobre `bounds`**, en píxeles CSS, y no se estiman
sobre la imagen.

`bounds` es la caja que el motor de layout le dio al nodo. `ink` es la extensión que una
persona ve: la caja propia cuando el nodo pinta una frontera visible —fondo, borde, sombra,
o elemento reemplazado— y la unión de sus glifos cuando no pinta ninguna. La distinción no
es cosmética. Un contenedor sin fondo ni borde que se estira a lo ancho del viewport tiene
una caja de layout de 1440 px y no dibuja nada; medir proximidad entre cajas así devuelve
separaciones de cero entre elementos que el ojo ve separados por cientos de píxeles. Medido
sobre una página sintética con la estructura habitual de un portal institucional, 64 de 73
cajas no pintan frontera visible y dos tercios de ellas son más anchas que su contenido por
más de 50 px. Sobre la página de diagnóstico `capture/pages/inkgap.html`, cuya geometría
está declarada en el propio archivo, `r` medido sobre `bounds` es indefinido —todas las
separaciones valen cero— y medido sobre `ink` vale 5,34.

Un nodo con `ink: null` no muestra nada y **se excluye** de todos los pasos. No se sustituye
por su caja de layout.

Cuando `visibleBoundary.visible` es `null`, el motor no reportó los estilos necesarios y
`ink` cae en la caja de layout. Registrar cuántos nodos del grupo están en ese estado; si
son más del 10 % de los nodos considerados, el puntaje se emite con
`evidence_insufficient` en `measurements`.

## Procedimiento

1. **Identificar los grupos de contenido.** Un grupo es un conjunto de elementos que el
   layout presenta como unidad: comparten `parentId`, o comparten un contenedor con
   `visibleBoundary.visible === true`, o están separados del resto por una distancia mayor
   que la que los separa entre sí.

   La segunda condición es la definición operacional de región común, y es exactamente el
   dato que `visibleBoundary` reporta: un contenedor sin fondo, sin borde y sin sombra no
   delimita ninguna región, por más que el DOM lo presente como padre. Compartir
   `parentId` con un contenedor invisible es parentesco de marcado, no región común, y por
   sí solo no constituye un grupo. Registrar cuántos grupos de primer nivel hay.

2. **Medir la separación de cada grupo.** Para cada grupo, `g_in` es la distancia máxima
   entre los bordes de las cajas `ink` de dos elementos adyacentes dentro del grupo, y
   `g_out` es la distancia mínima desde la caja `ink` de cualquiera de sus elementos a la
   del elemento más cercano que no pertenece al grupo. Registrar la razón `r = g_out / g_in`. Un grupo con un solo elemento no tiene
   `g_in` y se excluye de este paso.

3. **Medir la regularidad estructural.** Contar `A`, el número de ejes de alineación
   izquierda distintos entre los bloques de primer nivel, y `W`, el número de anchos
   distintos entre ellos. Dos valores que difieren en menos de 2 px cuentan como uno.

4. **Verificar la consistencia de los equivalentes.** Para cada conjunto de elementos
   funcionalmente equivalentes — los que comparten `nodeName` y `parentId`, o los que
   repiten la misma estructura interna — verificar que comparten forma, dimensiones y
   alineación. Registrar cuántos conjuntos tienen al menos un miembro divergente.

5. **Registrar los conflictos.** Un conflicto existe cuando un elemento está más cerca de
   un grupo del que no forma parte que de aquel cuyo contenedor lo incluye: es decir,
   cuando proximidad y región común afirman pertenencias distintas sobre el mismo
   elemento. Registrar cuántos hay y cuáles.

6. **Puntuar contra los niveles**, y luego aplicar el techo por conflicto.

7. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando el grupo o el
   elemento concreto.

### Condiciones observables

Cada condición se mide como una **proporción afectada** `p`: cuántos de los elementos a los
que la condición aplica la incumplen. El denominador se declara aquí porque sin él una
proporción no es verificable.

| | Condición | Un elemento la incumple cuando | Denominador de `p` |
|---|---|---|---|
| **C1** | Separación | Su grupo tiene `r < 1.5` | Grupos de primer nivel con más de un elemento |
| **C2** | Límites | Su caja `ink` se sale de la de su contenedor visible | Elementos con frontera visible propia dentro de un contenedor visible |
| **C3** | Regularidad | Su borde izquierdo no cae en uno de los cuatro ejes de alineación más frecuentes, o su ancho no es uno de los tres anchos más frecuentes | Bloques de primer nivel |
| **C4** | Consistencia | Su conjunto de equivalentes tiene algún miembro que diverge en alto o en alineación | Conjuntos de elementos equivalentes con dos o más miembros |

**C3 cambió de forma con la reescritura del 11 de septiembre.** Antes eran dos conteos
globales, `A ≤ 4` y `W ≤ 3`, que no admiten proporción; ahora la condición es la misma idea
—cuántos ejes y cuántos anchos gobiernan la pantalla— expresada como la fracción de bloques
que se salen de los cuatro ejes y los tres anchos dominantes. Los números 4 y 3 no cambiaron.

**C4 se evalúa sobre alto y alineación, nunca sobre ancho.** El ancho de un enlace depende
del largo de su texto: exigirlo igual reprueba cualquier lista de texto y no dice nada sobre
la consistencia del tratamiento.

## Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g1_p_C1`, `g1_p_C2`, `g1_p_C3`, `g1_p_C4` — las cuatro proporciones afectadas, cada una con `p`, `afectados`, `denominador`, `denominador_definicion`, `etiqueta` e `ids_afectados`
- `g1_p_conflicto` — proporción de elementos en conflicto entre proximidad y región común, para el techo
- `g1_grupos_primer_nivel` y `g1_grupos_ids` — cuántos grupos hay y cuáles
- `g1_razones_r` — la razón `r = g_out / g_in` de cada grupo, con sus dos términos
- `g1_ejes_dominantes` y `g1_anchos_dominantes` — los cuatro ejes y los tres anchos contra los que se evaluó C3
- `g1_contenedores_anidados` — evidencia para la condición del nivel 4

- `g1_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`wireframe.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

## Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| Cuántos grupos hay y cuáles | Nada: el agente no vuelve a agrupar |
| La razón `r` de cada grupo y qué grupos fallan C1 | Nada |
| Las cuatro proporciones y sus etiquetas | Nada |
| `g1_contenedores_anidados` | **Si la agrupación es legible en más de un nivel** — que haya anidamiento no basta: las secciones tienen que separarse entre sí más que los grupos que contienen, y eso se ve en el wireframe |
| — | **El nivel**, aplicando la combinación de la escala de tolerancia a las cuatro etiquetas |
| — | **El techo por conflicto** y el `trigger` que lo nombra |

**El único juicio semántico de esta rúbrica es el del nivel 4.** Todo lo demás es
aplicar una tabla a cuatro etiquetas, y por eso G1 debería comportarse de forma determinista
entre repeticiones: es la hipótesis H1 de `docs/hipotesis-m3.md`.

### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que se emiten **leyendo el screenshot**, aunque el canal de
referencia del grupo sea el wireframe: **Ninguno.** Las cuatro condiciones de G1 son geométricas y se deciden enteramente sobre el wireframe.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. **La comparación entre canales de G1 es limpia**, y por eso G1 es uno de los dos grupos donde el término de representación mide lo que dice medir.

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

## Niveles

Cada condición reporta su **proporción afectada** `p` sobre el denominador declarado arriba,
y se etiqueta con la escala de tolerancia de `shared/escala.md` —impecable, aislado,
frecuente, generalizado—. Los niveles salen de la combinación común a todas las rúbricas que
usan esa escala:

**0** — Dos o más de C1 a C4 **generalizadas** (`p > 0,25`), o una sola con `p > 0,50`. La
pantalla no comunica una agrupación estable: el espacio, los límites y la forma dicen cosas
distintas entre sí, y lo dicen en toda la pantalla.

**1** — Exactamente una condición generalizada, o dos o más **frecuentes**
(`0,10 < p ≤ 0,25`).

**2** — Ninguna generalizada y al menos una frecuente. Las demás, aisladas o impecables.

**3** — Las cuatro condiciones **aisladas o impecables** (`p ≤ 0,10`): la separación, los
límites, la regularidad y la consistencia se sostienen salvo en casos contados.

**4** — Las cuatro **impecables** (`p = 0`), y además la agrupación es legible en más de un
nivel: los grupos se agrupan a su vez en secciones, y la disciplina de separación se sostiene
en ambos niveles (la separación entre secciones es mayor que la separación entre los grupos
que contienen).

### Techo por conflicto

Los conflictos del paso 5 también se miden en proporción, sobre los elementos que pertenecen
a algún grupo. Un conflicto **frecuente o generalizado** (`p_conf > 0,10`) **fija el techo
del grupo en 1**; uno **aislado** lo fija en 2. La razón no es que un principio le gane al
otro: es que cuando proximidad y región común se contradicen sobre un mismo elemento, la
pantalla es ambigua respecto de a qué pertenece ese elemento, y la ambigüedad es exactamente
el defecto que este grupo mide. El conflicto se nombra en `trigger` y se describe en el
hallazgo.

### Por qué esta rúbrica se reescribió el 11 de septiembre de 2026

La versión anterior cuantificaba universalmente: nivel 3 exigía que **todo** grupo tuviera
`r ≥ 1.5`, que **ningún** elemento se saliera de su contenedor y que **ningún** conjunto de
equivalentes divergiera. El piloto de calibración la corrió sobre 24 páginas fuera del corpus
y **no asignó nunca 2, 3 ni 4**: 21 páginas en 0 y 3 en 1. C4 falló en 24 de 24. Con una
mediana de 8 grupos de primer nivel por página y un máximo de 31, una condición universal es
una lotería que la pantalla grande pierde siempre.

**Esto es el procedimiento pre-comprometido ejecutándose, no un ajuste a los datos.** El plan
de pruebas dice desde antes de correr nada: «la que no mueva sus puntajes se reescribe, y la
reescritura se fecha antes del congelamiento». Lo que el piloto aportó fue el diagnóstico de
*qué* estaba mal —la forma lógica de las anclas— y no el valor de ningún umbral: los cortes
de 0,10 y 0,25 son décimas y cuartos redondos declarados en `shared/escala.md`, fijados sin
mirar la distribución observada. La regla del ajuste único, en ese mismo archivo, prohíbe
volver a tocarlos porque la distribución no quede repartida. Evidencia en
`docs/piloto-calibracion.md`.

## Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con
`group_id: "g1"`, `channel` según la corrida, y en `measurements` los valores crudos:
`groups` (número de grupos de primer nivel), `r_min` (la razón más baja observada),
`A`, `W`, `divergent_sets` y `conflicts`. Un puntaje sin esos números no es auditable.

`trigger` nombra la condición que fijó el nivel: `C1`, `C2`, `C3`, `C4`, `conflicto`, o
`ninguna` cuando el nivel es 3 o 4.

## No aplicable

`not_applicable: true` únicamente cuando la pantalla contiene menos de dos grupos de
primer nivel, es decir cuando no hay agrupación que evaluar. Es una condición objetiva y
verificable sobre `nodes.json`, no un juicio. En cualquier otro caso se puntúa.

## Declaraciones

Estas dos frases acompañan cualquier reporte de este grupo.

**Los umbrales son convención de este proyecto.** `r ≥ 1.5`, `A ≤ 4` y `W ≤ 3` se
adoptaron por reproducibilidad y no se derivan de ninguna de las cuatro fuentes.
Wertheimer (1923) demuestra que la proximidad relativa organiza el campo perceptual; no
da una razón numérica a partir de la cual una interfaz sea aceptable.

**Prägnanz se puntúa como aproximación operativa.** En Wertheimer, la Ley de Prägnanz es
la tendencia organizadora superordinada bajo la cual operan los demás principios de
agrupación, no un principio coordinado con ellos. Esta rúbrica la operacionaliza como
regularidad estructural (`A` y `W`), que es observable sobre el wireframe, y declara que
esa no es la ley tal como fue formulada.

**La similitud se puntúa sin color.** El canal no tiene color, así que el paso 4 compara
forma, dimensiones y alineación solamente. Es una limitación del canal, declarada, y no
una definición del constructo.

**La Ley de Conectividad Uniforme quedó fuera del conjunto implementado.** Palmer y Rock
(1994) argumentan que no es reducible a proximidad ni a similitud y que opera antes que
ellas. Se excluyó porque sobre un wireframe, donde cada elemento retenido se dibuja como
un rectángulo con contorno, una región uniformemente conectada y una región común son la
misma caja dibujada: es una limitación de la representación, no una afirmación sobre la
percepción.

# Medidas de G1 1.0.7
{"pagina":{"id":"captura","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-11-05T06:08:08.892Z","sanity_ok":true,"consent_limpio":true},"measurements_version":"1.0.7","g1":{"g1_grupos_primer_nivel":9,"g1_grupos_ids":[15,55,63,69,75,81,87,93,100],"g1_razones_r":[{"id":63,"r":5.462,"g_in":13,"g_out":71},{"id":69,"r":5.642,"g_in":13,"g_out":73.3},{"id":75,"r":6.558,"g_in":13,"g_out":85.3},{"id":81,"r":5.167,"g_in":13,"g_out":67.2},{"id":87,"r":5.167,"g_in":13,"g_out":67.2},{"id":93,"r":7.077,"g_in":13,"g_out":92}],"g1_p_C1":{"p":0,"afectados":0,"denominador":6,"denominador_definicion":"grupos de primer nivel con mas de un elemento y r calculable","etiqueta":"impecable","ids_afectados":[]},"g1_p_C2":{"p":0,"afectados":0,"denominador":1,"denominador_definicion":"elementos con frontera visible propia dentro de un contenedor visible","etiqueta":"impecable","ids_afectados":[]},"g1_p_C3":{"p":0,"afectados":0,"denominador":9,"denominador_definicion":"bloques de primer nivel","etiqueta":"impecable","ids_afectados":[]},"g1_p_C4":{"p":0.25,"afectados":2,"denominador":8,"denominador_definicion":"conjuntos de equivalentes (mismo nodeName y parentId) con dos o mas miembros","etiqueta":"frecuente","ids_afectados":[45,63]},"g1_p_conflicto":{"p":0,"afectados":0,"denominador":12,"denominador_definicion":"elementos que pertenecen a algun grupo de primer nivel","etiqueta":"impecable","ids_afectados":[]},"g1_ejes_dominantes":[144,0,536,928],"g1_anchos_dominantes":[368,1440,146.7],"g1_contenedores_anidados":1,"g1_no_aplicable":false,"juicios":[{"campo":"nivel","decide":"El nivel, aplicando la combinacion de la escala de tolerancia a las cuatro proporciones, y el techo por conflicto.","evidencia":"g1_p_C1 a g1_p_C4 con sus etiquetas, g1_p_conflicto.","requiere_lectura":false},{"campo":"legibilidad en dos niveles (nivel 4)","decide":"Si los grupos se agrupan a su vez en secciones legibles.","evidencia":"g1_contenedores_anidados y la geometria de g1_grupos_ids sobre el wireframe.","requiere_lectura":false}],"g1_criterios_con_lectura_de_texto":[]},"source_measurements_version":"1.0.6"}

# Salida de esta ejecución

Devuelve un único JSON con channel="wireframe" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

G1: copia g1_grupos_primer_nivel. Con cero o un grupo devuelve no aplica; conserva la limitación no interpretable v1 sin cambiar cortes.

# Esquema de respuesta
{"$schema":"https://json-schema.org/draft/2020-12/schema","title":"Resultado de la evaluación de un grupo de constructo sobre una pantalla","description":"Salida de una skill de grupo. La unidad puntuada es el grupo de constructo, nunca la ley individual: las dieciocho leyes se subsumen en siete grupos y no se emite coeficiente por ley. Un puntaje sin measurements ni trigger no es auditable y se rechaza en validación. Desde v0.2.0, todo campo del que dependa la atribución de un resultado es obligatorio: qué modelo, con qué parámetros de decodificación, sobre qué bytes de captura, con qué versión de la capa de medición y con qué versión del protocolo. Un registro incompleto de atribución no se nota al leer el archivo, y por eso se rechaza en validación en vez de confiarse a la disciplina de quien lo produce.","type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","run","measurements","score","trigger"],"properties":{"group_id":{"type":"string","const":"g1"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","minItems":1,"items":{"type":"string"},"description":"Las leyes que este grupo cubre. Informativo: no se puntúan por separado."},"channel":{"type":"string","const":"wireframe"},"not_applicable":{"type":"boolean","description":"true solo cuando se cumple la condición objetiva de no aplicabilidad declarada en la rúbrica del grupo. Nunca por juicio. Cuando es true, score y trigger deben ser null."},"na_reason":{"type":["string","null"],"description":"La condición objetiva que se cumplió. Obligatorio cuando not_applicable es true."},"score":{"type":["integer","null"],"minimum":0,"maximum":4,"description":"Nivel de la rúbrica anclada, escala ordinal común 0-4. No es un porcentaje y no se promedia con otros grupos."},"trigger":{"type":["string","null"],"description":"La condición observable que fijó el nivel, con los identificadores que declara la rúbrica del grupo (C1, n1, V, K, W_min...), o 'ninguna' cuando el nivel es 3 o 4 sin condición limitante. Obligatorio siempre que score no sea null."},"measurements":{"type":"object","description":"Los valores crudos que sostienen el puntaje, con los nombres que declara la rúbrica del grupo. Se reportan siempre, junto a cualquier cifra agregada.","minProperties":1,"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true,"maxItems":0}},"required":["lectura_screenshot"]},"findings":{"type":"array","description":"Observaciones ancladas a una región del canal evaluado.","items":{"type":"object","additionalProperties":false,"required":["observation","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"},"description":"Los id de nodes.json a los que se refiere. Es lo que hace el hallazgo verificable contra la captura."},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}},"description":"Caja en píxeles CSS, absoluta, en el mismo sistema de coordenadas que bounds en nodes.json."},"severity":{"enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"},"description":"Exigidas por la rúbrica cuando score <= 2. Se emiten y NO se miden en la v1: ningún objetivo verifica si son accionables, y se reportan como salida declarada no validada."},"evidence_insufficient":{"type":"boolean","default":false,"description":"true cuando la condición que decidiría un nivel no es observable en este canal, por ejemplo una distinción que solo existía en color evaluada sobre el wireframe. No se inventa el estado: se marca."},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}},"allOf":[{"if":{"properties":{"not_applicable":{"const":false}}},"then":{"required":["score","trigger"]}},{"if":{"properties":{"not_applicable":{"const":true}}},"then":{"required":["na_reason"]}}],"version":"0.2.0","$comment":"v0.2.0, 13 de septiembre de 2026. Endurece la atribución: decoding, capture_sha256, measurements_version y protocol_version pasan a obligatorios, y model_id gana un patrón que rechaza marcadores de posición. Se saca ANTES de la fase 5, con cero group-result producidos: endurecer hoy no invalida ninguna salida y hacerlo después sí. v0.1.0 no se parchea; su copia vive dentro del tag."}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_alertas_automaticas","integridad_ok":true,"capas_sin_resolver":false,"advertencias":[],"sha256":{"screenshot":"50189682ebaae54dbd8b8c07ddc62ab02864e0a2ddff3cc1339f165be4f52c4a","wireframe":"da72a2130ef3df5afd3e73afd9b3edb37b22e73f70d6e6919cdd42e5383bcfc8"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.