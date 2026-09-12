# Apéndice · Las siete rúbricas de constructo

Este apéndice se genera automáticamente desde los archivos `SKILL.md` del
repositorio del plugin, que son la fuente única del instrumento. No se edita
a mano: una copia editable aparte derivaría de lo que el sistema ejecuta, y el
protocolo congelado dejaría de describir la medición real.

Generado el 2026-09-12 desde `skills/`.

---
## G1 · Agrupación perceptual

| | |
|---|---|
| **Leyes subsumidas** | Ley de Proximidad · Ley de Prägnanz · Ley de Región Común · Ley de Similitud |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | Si la separación, los límites, la regularidad estructural y la consistencia de forma comunican la agrupación que el contenido tiene |

Las cuatro leyes miden el mismo constructo desde ángulos distintos, y por eso emiten un
solo puntaje. Puntuar cada una por separado y sumarlas contaría cuatro veces la misma
propiedad.

### Entradas

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

### Procedimiento

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

#### Condiciones observables

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

### Entradas de `measurements.json`

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

### Qué decide el agente y qué no

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

#### Criterios que dependen del texto

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

### Niveles

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

#### Techo por conflicto

Los conflictos del paso 5 también se miden en proporción, sobre los elementos que pertenecen
a algún grupo. Un conflicto **frecuente o generalizado** (`p_conf > 0,10`) **fija el techo
del grupo en 1**; uno **aislado** lo fija en 2. La razón no es que un principio le gane al
otro: es que cuando proximidad y región común se contradicen sobre un mismo elemento, la
pantalla es ambigua respecto de a qué pertenece ese elemento, y la ambigüedad es exactamente
el defecto que este grupo mide. El conflicto se nombra en `trigger` y se describe en el
hallazgo.

#### Por qué esta rúbrica se reescribió el 11 de septiembre de 2026

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

### Salida requerida

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

### No aplicable

`not_applicable: true` únicamente cuando la pantalla contiene menos de dos grupos de
primer nivel, es decir cuando no hay agrupación que evaluar. Es una condición objetiva y
verificable sobre `nodes.json`, no un juicio. En cualquier otro caso se puntúa.

### Declaraciones

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

---

## G2 · Arquitectura de decisión

| | |
|---|---|
| **Leyes subsumidas** | Ley de Hick · Sobrecarga de elección |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | El número y la organización de las alternativas que la interfaz presenta en un mismo nivel, si una acción dominante es distinguible entre ellas, y si el conjunto viene con apoyos para compararlas |

Esta rúbrica se publicó completa en el Apéndice C de la propuesta formal. Aquí se conserva
su contenido y se añaden dos cosas que las decisiones congeladas exigen a los siete grupos:
el campo `trigger` y la regla objetiva de no aplicabilidad.

### Entradas

- `wireframe.png`
- `nodes.json` — `isClickable` es indispensable: sobre rectángulos sin etiqueta un enlace y
  un párrafo son la misma caja, y sin distinguirlos no se puede contar nada. `nodeName` y
  `attributes` distinguen además un control de filtro u ordenamiento de un enlace común.

Los grupos visuales del paso 2 se determinan sobre `ink` y `visibleBoundary`, no sobre
`bounds`: un contenedor sin fondo, sin borde y sin sombra no agrupa nada, y contar sus
hijos como un grupo produce una segmentación que no está en la pantalla. Dos opciones
pertenecen al mismo grupo cuando comparten un contenedor con `visibleBoundary.visible ===
true`, o cuando la separación entre sus cajas `ink` es menor que la que las separa del
resto.

### Procedimiento

1. **Enumerar todo elemento accionable**: navegación, botones, enlaces, campos de
   formulario, filtros, pestañas, tarjetas clicables. Registrar `n_total`.

2. **Identificar los grupos visuales.** Las opciones agrupadas no compiten
   simultáneamente, así que registrar `n1`, el número de grupos de primer nivel que el
   usuario enfrenta a la vez, y `n_max`, el número mayor de opciones dentro de un solo
   grupo. Este paso es el que separa la medición de contar botones.

3. **Determinar si una acción domina** o si varias compiten con el mismo peso. La ausencia
   de jerarquía es una violación aunque el conteo sea bajo. La dominancia se determina por
   peso visual y tamaño relativo, sin suponer una tarea del usuario.

4. **Registrar los apoyos de decisión.** `Ap` es el número de mecanismos presentes que
   ayudan a comparar el conjunto: filtros, ordenamiento, una opción marcada como
   recomendada, un valor por defecto, una tabla comparativa. Es lo que Sobrecarga de
   elección aporta por encima del conteo de Hick: cuarenta productos con filtros y
   cuarenta en lista plana tienen el mismo `n` y distinta arquitectura.

5. **Puntuar contra los niveles.**

6. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando el grupo o el
   elemento concreto.

### Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g2_n_total`, `g2_n1`, `g2_n_max` — accionables, grupos de primer nivel y el grupo mayor
- `g2_fraccion_agrupada` — qué fracción de los accionables cae dentro de un contenedor que agrupa
- `g2_grupos` — el reparto, con los `ids` de cada grupo
- `g2_areas_mayores` y `g2_razon_area_1_2` — evidencia para la dominancia
- `g2_Ap_candidatos` — candidatos a apoyo de decisión, con su caja. **Son candidatos, no `Ap`**

- `g2_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`wireframe.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

### Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| `n_total`, `n1`, `n_max` y el reparto en grupos | Nada: no se recuenta |
| Las áreas de los accionables mayores y su razón | **Si una acción domina.** El área es evidencia, no la respuesta: el peso visual incluye contraste y posición, y eso se mira en el canal |
| La lista de candidatos a apoyo de decisión | **Cuáles son de verdad apoyos** —filtro, ordenamiento, opción recomendada, valor por defecto, tabla comparativa—. Exige leer la región del candidato para entender qué ofrece |
| — | **El nivel** contra las anclas de `n1`, la agrupación, la dominancia y `Ap` |

**El juicio de `Ap` exige leer.** El código detecta candidatos por el léxico de la
clase CSS, que sobreestima y subestima a la vez: una clase `filtro` puede no filtrar nada y un
ordenador puede llamarse `sel-2`. El agente abre esa región del canal, entiende qué ofrece y
decide. Leer para entender **no** es contar ni medir.

#### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que se emiten **leyendo el screenshot**, aunque el canal de
referencia del grupo sea el wireframe: `Ap`.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. `Ap` es el único: `n1`, `n_max`, la agrupación y la dominancia no dependen del texto. Un puntaje de G2 cuyo nivel fijó `n1` tiene comparación entre canales limpia; uno cuyo `trigger` fue `Ap`, no.

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

### Niveles

**0** — `n1 > 12` sin agrupación, o ninguna acción primaria distinguible en una pantalla
cuyo propósito exige una decisión.

**1** — `n1` entre 9 y 12, agrupación débil, varias acciones compitiendo con el mismo peso
visual.

**2** — `n1` entre 6 y 8 con agrupación parcial; existe una acción primaria pero no domina.

**3** — `n1 ≤ 5` con grupos coherentes; la acción primaria es clara.

**4** — Nivel 3, y además la interfaz reduce activamente la carga de decisión mediante
divulgación progresiva, valores por defecto sensatos, o secuenciación de las decisiones.
`Ap ≥ 1`.

### Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g2"`,
`channel` según la corrida, y en `measurements` los valores crudos `n_total`, `n1`,
`n_max` y `Ap`. Un puntaje sin esos números no es auditable.

`trigger` nombra la condición que fijó el nivel: `n1`, `agrupacion`, `dominancia`, `Ap` o
`ninguna`.

### No aplicable

`not_applicable: true` únicamente cuando `n_total = 0`, es decir cuando la pantalla no
presenta ningún elemento accionable y por tanto ninguna decisión. Condición objetiva sobre
`nodes.json`. No se inventa una violación para llenar el espacio.

### Declaraciones

**Los umbrales son convención de este proyecto, adoptada por reproducibilidad.** No se
derivan de las fuentes. Hick (1952) midió tiempo de reacción de elección sobre alternativas
equiprobables y sin significado, presentadas en orden irregular, y reportó una tasa de
ganancia de información del orden de cinco bits por segundo: no un número aceptable de
botones. Proctor y Schneider (2018) reportan que la pendiente de la relación varía desde
cero hasta varios cientos de milisegundos según la compatibilidad estímulo-respuesta, que
la práctica extensa puede eliminar el efecto del tamaño del conjunto, y que la relación
logarítmica es fiable solo para aproximadamente dos a ocho alternativas.

**La rúbrica mide arquitectura de decisión y no tiempo de reacción de elección.** Liu et
al. (2020) argumentan que el principio de diseño familiar no se sigue de la Ley de Hick, y
que una función de latencia logarítmica favorece matemáticamente mostrar más opciones a la
vez, no menos. Esta rúbrica no afirma lo contrario. Puntúa la organización de las
alternativas, sobre la base de que la organización es lo que las dos leyes subsumidas
conciernen conjuntamente, y registra que ese estrechamiento existe.

**Sobrecarga de elección no replica.** Iyengar y Lepper (2000) reportaron que un puesto de
degustación con 24 variedades de mermelada atrajo más visitantes que uno con seis pero
produjo compras del 3 % de ellos contra el 30 %. Un meta-análisis de 63 condiciones
extraídas de 50 experimentos con 5.036 participantes encontró después un tamaño de efecto
medio de D = 0,02, con intervalo de confianza de −0,09 a 0,12, y concluyó que no se pudieron
identificar de manera fiable condiciones suficientes que expliquen cuándo y por qué un
aumento del tamaño del surtido reduce la satisfacción (Scheibehenne et al., 2010).

**Las dos leyes se conservaron a pesar de eso.** Excluirlas habría removido los dos casos
más claros de la brecha que este trabajo existe para examinar.

---

## G3 · Capacidad y segmentación

| | |
|---|---|
| **Leyes subsumidas** | Ley de Miller · Chunking · Memoria de trabajo · Carga cognitiva |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | Cuántas unidades se exponen a la vez, si están segmentadas en bloques coherentes, si algún dato requerido queda fuera de vista, y cuánto contenido ajeno a la tarea compite con ella |

Este grupo junta cuatro constructos de tres tradiciones distintas y emite un solo puntaje.
Por eso el campo `trigger` es obligatorio aquí y no opcional: sin él, un G3 bajo no dice
cuál de los cuatro se violó y el hallazgo no es accionable.

### Entradas

- `wireframe.png`
- `nodes.json` — se usan `ink`, `bounds`, `visibleBoundary`, `parentId`, `nodeName`,
  `isClickable` y `position`.

Las áreas y las distancias se miden sobre `ink`. La regla del paso 2 —«los elementos
puramente contenedores no cuentan»— deja de ser un juicio y pasa a ser una condición
verificable: un nodo con `visibleBoundary.visible === false` que no aporta tinta propia es
un contenedor puro y no es una unidad. Un nodo con `ink: null` no muestra nada y se excluye.

### Procedimiento

1. **Delimitar la región de la tarea.** Es el bloque de primer nivel de mayor área que no
   es encabezado, navegación global ni pie. Todo lo demás es periferia.

2. **Contar las unidades expuestas.** `U` es el número de unidades de primer nivel
   simultáneamente visibles en la región de la tarea. Una unidad es un elemento que el
   usuario tiene que leer o decidir por separado: un campo, una tarjeta, una fila, un
   bloque de texto. Los elementos puramente contenedores no cuentan.

3. **Medir la segmentación.** Registrar si las unidades están agrupadas en bloques y si
   cada bloque tiene un encabezado propio. `B` es el número de unidades del bloque más
   grande.

4. **Verificar la coherencia temática de los bloques.** Un bloque es coherente cuando todo
   lo que contiene pertenece a la misma clase de contenido. Registrar `H` como el número de
   bloques que mezclan clases distintas — por ejemplo un bloque que junta datos del
   producto, dirección de envío y precio, cuando la pantalla trata esas tres como cosas
   separadas en otro lugar.

5. **Buscar datos fuera de vista.** `V` es verdadero cuando existe un campo o una acción
   cuyo cumplimiento exige un dato que no está visible al mismo tiempo que él. Sobre una
   sola pantalla capturada esto se observa como un encabezado de tabla o de columna que
   sale del área visible mientras sus filas siguen presentes, o como un valor de referencia
   que la pantalla muestra arriba y vuelve a pedir abajo sin dejarlo a la vista. El campo
   `position` distingue el caso resuelto: un encabezado `sticky` o `fixed` permanece.

6. **Contar los elementos ajenos.** `X` es el número de elementos de primer nivel dentro
   de la región de la tarea que no pertenecen ni a la tarea ni a la navegación: promociones,
   contenido relacionado, suscripciones, avisos no vinculados a lo que la pantalla pide.

7. **Puntuar contra los niveles.**

8. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando el bloque o el
   elemento concreto.

### Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g3_region_tarea` y `g3_region_candidatas` — la región propuesta por área y las alternativas
- `g3_U_candidatas` y `g3_unidades` — cuántas unidades de primer nivel hay en la región y, de cada una, su caja, cuántos hijos tiene y si contiene un encabezado `H1`–`H6`
- `g3_B_mayor` — el número de hijos del bloque mayor
- `g3_bloques_con_encabezado` — cuántas unidades traen encabezado detectable
- `g3_pegajosos` — nodos `fixed` o `sticky`, con su `position`
- `g3_X_candidatos` — candidatos a elemento ajeno por léxico de clase
- `g3_tablas` — tablas y encabezados de tabla, con si su caja cae dentro del viewport
- `g3_envoltorios_atravesados` — cuántos contenedores sin contenido propio hubo que atravesar para llegar a las unidades. Un número alto avisa de que la región puede estar mal elegida

- `g3_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`wireframe.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

### Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| Cuántas unidades candidatas hay y dónde está cada una | **`U`: cuáles de esas candidatas son unidades de tarea reales** —algo que el usuario lee o decide por separado— y cuáles son solo contenedores |
| La región propuesta y las cinco alternativas | **Confirmar o corregir la región de la tarea.** La heurística escoge por área y se equivoca: en 15 de 54 páginas del corpus dejó `U ≤ 1` |
| Qué unidades contienen un `H1`–`H6` | **Si el bloque tiene encabezado propio de verdad.** La detección sub-cuenta porque media web titula con `div` y una clase |
| — | **`H`: si algún bloque mezcla clases distintas de contenido.** Es semántico de principio a fin: exige entender de qué trata cada cosa dentro del bloque |
| `g3_tablas` y `g3_pegajosos` | **`V`: si un campo o una acción exige un dato que no está visible al mismo tiempo.** Un encabezado `sticky` resuelve el caso, y por eso `position` viene medido |
| La lista de candidatos a ajeno | **`X`: cuáles son de verdad ajenos a la tarea.** El léxico de clase solo propone |
| — | **El nivel** contra las anclas de `U`, la segmentación, `H`, `V` y `X` |

**Los cuatro juicios de esta rúbrica —`U`, `H`, `V`, `X`— son irreductiblemente
semánticos**, y por eso G3 no puede ser determinista: son la razón de la hipótesis H2. Cada uno
se emite nombrando los `id` de `g3_unidades` sobre los que se decidió, de modo que otra
persona pueda mirar las mismas cajas y discrepar con algo concreto en la mano.

#### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que se emiten **leyendo el screenshot**, aunque el canal de
referencia del grupo sea el wireframe: `U`, `H`, `V` y `X`.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. Son cuatro de los cinco juicios del grupo, así que **en G3 la comparación entre canales está contaminada casi siempre**. Es el grupo donde el asesor advirtió que el wireframe pierde carga extrínseca, y esta es la forma concreta que toma esa pérdida.

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

### Niveles

**0** — Cualquiera de estas tres: `U > 12` sin segmentación en bloques; o `V` verdadero,
un dato requerido queda fuera de vista; o `X` ocupa más área que la tarea dentro de su
propia región.

**1** — `U` entre 9 y 12 con segmentación débil (bloques sin encabezado o de tamaño muy
desigual), o `H ≥ 1`, un bloque mezcla clases distintas de contenido, o `X ≥ 1`
compitiendo por posición con la acción de la tarea.

**2** — `U` entre 6 y 8, segmentadas en bloques con encabezado, `H = 0`, `V` falso, y
`X ≥ 1` pero fuera de la región de la tarea.

**3** — `U ≤ 5` bloques de primer nivel, cada uno con encabezado, `B ≤ 5`, `H = 0`,
`V` falso y `X = 0` en la región de la tarea.

**4** — Nivel 3, y además la pantalla difiere lo que no se necesita ahora: hay divulgación
progresiva, o secciones plegadas, o pasos secuenciados, de modo que el bloque activo es
identificable sin leer los demás.

### Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g3"` y en
`measurements` los valores crudos: `U`, `B`, `H`, `V`, `X` y `blocks` (número de bloques
de primer nivel).

`trigger` es **obligatorio** y nombra la condición que fijó el nivel: `U`, `segmentacion`,
`B`, `H`, `V`, `X` o `ninguna`. Un G3 sin `trigger` se rechaza en validación.

### No aplicable

`not_applicable: true` únicamente cuando la región de la tarea contiene menos de dos
unidades, es decir cuando no hay nada que segmentar. Condición objetiva sobre
`nodes.json`.

### Declaraciones

**Los umbrales son convención de este proyecto y no salen de Miller.** Miller (1956)
declinó tratar la recurrencia del número como significativa, y escribió de los sietes que
sospechaba que era "only a pernicious, Pythagorean coincidence". Su artículo trata sobre
recodificación: la salida del límite es formar chunks con más bits cada uno, que es
justamente por qué Chunking y la Ley de Miller son dos lecturas de una sola fuente y
comparten grupo.

**La capacidad citada popularmente está desactualizada.** Cowan (2001) ubica la capacidad
cerca de cuatro chunks y no de siete, y solo bajo condiciones que impiden el repaso y la
recodificación, que es lo contrario de lo que una interfaz permite. Los umbrales de esta
rúbrica no pretenden ser ninguna de las dos cifras.

**La carga cognitiva viene de otro dominio, y lo que esta rúbrica mide es una parte de
ella.** Sweller (1988) introdujo el constructo estudiando instrucción en matemáticas
—cinemática, geometría y trigonometría— y ninguna parte de ese trabajo trata de interfaces.
Llevarlo a una página web es una transferencia entre dominios.

La teoría distingue componentes, y la distinción decide qué es observable acá. Sweller, van
Merriënboer y Paas (2019) —los mismos autores de la formulación de 1998— definen la carga
**intrínseca** como la complejidad del material y su interactividad entre elementos, y la
**extrínseca** como *"how the information is presented and what the learner is required to
do by the instructional procedure"*. En el mismo artículo revisan la carga **germana** y
concluyen que ya no es una categoría aditiva sino una redistribución de recursos, de modo
que *"only intrinsic and extraneous cognitive load are distinguished as basic categories of
cognitive load"*. Esta rúbrica no invoca carga germana.

De ahí sale el alcance declarado: **el término de carga cognitiva de G3 mide carga
extrínseca de origen estructural**, la que produce la disposición de la información en la
pantalla. Deja fuera dos cosas por razones distintas:

- La **carga intrínseca** es una propiedad del contenido y no de su presentación. No es
  observable en ninguna captura y tampoco es lo que un diseñador manipula. Fuera de alcance
  por definición del constructo, no por límite del canal.
- La parte **no estructural de la carga extrínseca** —contraste, jerarquía tipográfica,
  densidad visual, redundancia gráfica— sí es presentación, pero el wireframe la abstrae.
  Fuera de alcance **de este canal**.

Esa segunda exclusión es una hipótesis medible y no una excusa: G3 se corre también sobre el
screenshot como canal alterno, y la diferencia entre los dos puntajes sobre las mismas
páginas es la estimación de cuánta carga extrínseca se pierde al abstraer. Si la diferencia
es sistemática y grande, el hallazgo a reportar es que el wireframe no basta para este
término, no que la rúbrica falló.

Cuando el nivel de G3 lo fija el término de carga cognitiva, `trigger` toma el valor
`carga_extrinseca_estructural` y `measurements` registra `U`, `X` y la segmentación que lo
sostienen. Ese campo es lo que permite contar, sobre el corpus, con qué frecuencia este
término gobierna el puntaje del grupo.

*Sweller, J., van Merriënboer, J. J. G., & Paas, F. (2019). Cognitive architecture and
instructional design: 20 years later.* Educational Psychology Review, 31(2), 261–292.
doi:10.1007/s10648-019-09465-5

**La memoria de trabajo se puntúa como co-visibilidad.** Baddeley y Hitch (1974) proponen
un modelo de la arquitectura de la memoria, no una regla de diseño. Lo que el paso 5 mide
es si un dato requerido está visible junto al campo que lo requiere, que es observable.
No mide carga de memoria, y no lo afirma.

---

## G4 · Saliencia visual

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

### Entradas

- `screenshot.png` — la representación sobre la que se puntúa.
- `nodes.json` — se usa **solo** para geometría: posición, proporción y área de las cajas,
  que es lo que decide si un elemento está en posición y proporción de banner. El juicio de
  tratamiento visual sale de la imagen.

Es el único grupo que lee las dos entradas, y la razón está declarada abajo.

### Procedimiento

1. **Formar los conjuntos de pares.** Un conjunto de pares es un grupo de elementos que la
   pantalla presenta como equivalentes: las tarjetas de una fila, los ítems de una
   navegación, los planes de una tabla de precios, las filas de un listado.

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

### Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g4_conjuntos_pares` — los conjuntos de elementos equivalentes, cada miembro con su caja y sus rasgos medidos sobre el screenshot: `color_medio`, `contraste_con_fondo`, `fraccion_tinta` y `area`
- `atipicos_geometricos` dentro de cada conjunto — los miembros que se apartan de la mediana del conjunto en color o en área
- `g4_fondo_pagina` — el color de fondo contra el que se calculó todo contraste
- `g4_banner_candidatos` — elementos con forma y posición de banner, con cuántos accionables contienen
- `g4_cromo_candidatos` — elementos de bajo contraste y área apreciable
- `g4_conjuntos_pares_total` — **cuántos conjuntos hay en total**. `g4_conjuntos_pares` va recortada a los ocho mayores: sin el total, ocho parecería el dato

- `g4_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`screenshot.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

### Qué decide el agente y qué no

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

#### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que se emiten **leyendo el screenshot**, aunque el canal de
referencia del grupo sea el wireframe: `P`.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. G4 corre solo sobre screenshot, así que no tiene comparación entre canales que contaminar. Se marca igual, porque `P` depende de leer lo que la sección promueve y eso pesa en la interpretación del puntaje aunque no haya segundo canal.

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

### Niveles

**0** — `Bn ≥ 1` y además `I = 0` o `I ≥ 3` en el conjunto principal: hay contenido con
función camuflado como publicidad, y al mismo tiempo o no destaca nada o compiten varios.
Es el peor caso combinado: lo importante está escondido y la pantalla no orienta.

**1** — `Bn ≥ 1`, o `I ≥ 3` en el conjunto principal. Tres o más énfasis compitiendo
equivalen, para efectos del constructo, a ninguno.

**2** — `I = 2` sin jerarquía entre los dos aislados, o `I = 1` pero `P` falso: destaca
algo que no es lo que la sección promueve. Sin `Bn`.

**3** — `I = 1` en el conjunto principal y `P` verdadero. `Bn = 0` y `Cn = 0`.

**4** — Nivel 3, y además el aislamiento se sostiene en más de un canal visual a la vez
— por ejemplo color y peso, o color y tamaño — de modo que no depende únicamente del
color y sobrevive a una visión que no lo distingue.

### Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g4"`,
`channel: "screenshot"`, y en `measurements`: `sets` (número de conjuntos de pares),
`I_principal`, `I_total`, `P`, `Bn`, `Cn`, y `channels_of_isolation` (cuántos canales
visuales sostienen el aislamiento, para distinguir el nivel 4).

`trigger` nombra la condición que fijó el nivel: `Bn`, `I`, `P`, `Cn` o `ninguna`.

### No aplicable

`not_applicable: true` únicamente cuando la pantalla no contiene ningún conjunto de dos o
más elementos presentados como equivalentes. Sin conjunto de pares no hay contexto de
similitud contra el cual algo pueda ser distintivo, y el constructo no tiene objeto.
Condición objetiva sobre `nodes.json`.

### Declaraciones

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

---

## G5 · Posición y progreso en una secuencia

| | |
|---|---|
| **Leyes subsumidas** | Efecto de posición serial · Efecto de gradiente de meta |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | Si las listas ordenadas marcan jerarquía por posición, y si la pantalla ubica al usuario dentro del proceso al que pertenece |

### Entradas

- `wireframe.png`
- `nodes.json` — se usan `ink`, `bounds`, `parentId` y `paintOrder`. El orden de lectura de
  una lista sale de combinar geometría con orden de pintura; la pertenencia a una misma
  lista sale de `parentId`.

  La posición de cada ítem se toma de `ink`, la extensión que una persona ve, y no de
  `bounds`: en una lista cuyos ítems son contenedores estirados al ancho del contenedor
  padre, todas las cajas de layout empiezan en la misma x y el orden espacial se pierde. Un
  ítem con `ink: null` no muestra nada y no ocupa posición en la serie.

### Procedimiento

1. **Identificar las listas ordenadas de primer nivel.** Una lista es un conjunto de tres o
   más elementos hermanos, dispuestos en secuencia por geometría, que el usuario recorre en
   orden: una navegación, un menú, un listado de opciones, una tabla de contenidos. La
   lista principal es la de mayor peso en la jerarquía de la pantalla.

2. **Evaluar la jerarquía de orden.** `J_inicio` es verdadero cuando el elemento en la
   posición inicial de la lista principal está diferenciado del cuerpo de la lista por
   forma, tamaño, separación o agrupación propia. `J_final` es lo mismo para la posición
   final. Una lista donde todos los elementos son idénticos y equidistantes es plana:
   ambos falsos.

3. **Determinar si la pantalla pertenece a una secuencia.** `Q` es verdadero cuando la
   pantalla es un paso de un proceso de varios: lo declara un indicador de pasos, una ruta
   de navegación de proceso, una numeración, o un botón que nombra un paso siguiente
   distinto de "enviar".

4. **Evaluar el indicador de progreso.** Cuando `Q` es verdadero, registrar: `G_existe`
   (hay indicador), `G_nombra` (nombra los pasos o dice cuántos son), `G_actual` (marca
   cuál es el paso actual) y `G_forma` (distingue completado de pendiente por forma, borde
   o relleno, y no únicamente por color). Sobre el wireframe, una distinción que solo
   existía en color no aparece: en ese caso `G_forma` es falso y el hallazgo lo dice
   explícitamente, en vez de inventar el estado.

5. **Puntuar contra los niveles.**

6. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando la lista o el
   indicador concreto.

### Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g5_listas` — las listas alineadas de tres o más elementos, con su orientación, su área y, para el primero y el último, alto y ancho relativos a la mediana del cuerpo, si pintan frontera propia y su separación
- `g5_lista_principal_sugerida` — la de mayor área
- `g5_indicador_paso_candidatos` — nodos con léxico de paso, proceso o ruta, y los `OL`, con su caja
- `g5_listas_total` — **cuántas listas alineadas hay en total**. `g5_listas` va recortada a las ocho de mayor área

- `g5_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`wireframe.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

### Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| Las listas, su geometría y los rasgos de primero y último | **Cuál es la lista principal.** El código propone la de mayor área; el peso en la jerarquía no es solo área |
| Cuánto se apartan primero y último de la mediana del cuerpo | **`J_inicio` y `J_final`: si esa diferencia es una diferenciación real** o ruido de una celda más alta |
| Los candidatos a indicador de paso, con su caja | **`Q`: si la pantalla es un paso de un proceso.** Exige leer el indicador: un `OL` puede ser una lista cualquiera |
| — | **`G_nombra`, `G_actual` y `G_forma`**: si el indicador nombra los pasos o dice cuántos son, marca el actual, y distingue completado de pendiente por forma y no solo por color |
| — | **El nivel**, y `evidence_insufficient` cuando la distinción existía solo en color y el canal es el wireframe |

**`G_forma` es el caso que obliga a marcar en vez de inventar.** Sobre el
wireframe, una distinción que solo vivía en el color no aparece. La rúbrica no autoriza a
suponer que existe ni a suponer que no: se emite el puntaje con `evidence_insufficient: true`
y el hallazgo dice exactamente eso.

#### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que se emiten **leyendo el screenshot**, aunque el canal de
referencia del grupo sea el wireframe: `Q`, `G_nombra`, `G_actual` y `G_forma`.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. `J_inicio` y `J_final` no dependen del texto: son geometría. Un puntaje de G5 sobre una pantalla con `Q` falso —que no es un paso de un proceso— tiene comparación limpia; uno con `Q` verdadero, no.

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

### Niveles

**0** — `Q` verdadero y `G_existe` falso: la pantalla es un paso de un proceso y no lo
dice. O bien `Q` falso y todas las listas de primer nivel son planas.

**1** — Hay indicador pero no ubica: `G_nombra` falso, muestra avance sin decir cuántos
pasos son ni cuál es este. O bien la jerarquía de orden aparece solo en una lista
secundaria y la principal es plana.

**2** — `G_nombra` y `G_actual` verdaderos, pero `G_forma` falso: la diferencia entre
completado y pendiente depende solo del color y no sobrevive al canal. O bien, cuando `Q`
es falso, la lista principal marca jerarquía únicamente de manera débil (un solo elemento
apenas diferenciado).

**3** — Cuando `Q` es verdadero: `G_existe`, `G_nombra`, `G_actual` y `G_forma`, los
cuatro. Cuando `Q` es falso: `J_inicio` verdadero en la lista principal.

**4** — Nivel 3, y además `J_final` verdadero: la posición final de la lista principal
también está diferenciada del cuerpo, sin competir con la inicial por el mismo peso.

#### Ponderación de primacía sobre recencia

El nivel 3 exige la posición inicial y el nivel 4 añade la final. La asimetría es
deliberada y está fundamentada abajo: la mitad de recencia de la curva no sobrevive al
patrón de uso de una interfaz, así que exigirla para aprobar puntuaría una propiedad que el
usuario no llega a aprovechar. Marcarla igual suma, y por eso está en el nivel 4.

### Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g5"` y en
`measurements`: `lists` (número de listas de primer nivel), `main_list_length`,
`J_inicio`, `J_final`, `Q`, `G_existe`, `G_nombra`, `G_actual`, `G_forma`, y
`steps_declared` (cuántos pasos nombra el indicador, o null).

`trigger` nombra la condición que fijó el nivel: `G_existe`, `G_nombra`, `G_actual`,
`G_forma`, `J_inicio`, `lista_plana` o `ninguna`.

### No aplicable

`not_applicable: true` únicamente cuando `Q` es falso **y** la pantalla no contiene
ninguna lista de tres o más elementos hermanos en secuencia. Sin secuencia ni lista, el
constructo no tiene objeto. Condición objetiva sobre `nodes.json`.

### Declaraciones

**La recencia tiene una frontera temporal y la interfaz la cruza.** Glanzer y Cunitz (1966)
separaron las dos mitades de la curva experimentalmente: retardar la presentación elevó el
recuerdo del inicio de la lista y dejó el final intacto, mientras que insertar una tarea de
conteo entre presentación y recuerdo eliminó el pico final. Su resultado está enunciado sin
rodeos: diez segundos bastaron para remover la mayor parte del pico final, y con treinta no
queda rastro de él. Un usuario que recorre un menú, mueve el mouse, lee una etiqueta y
actúa ya gastó ese presupuesto. La mitad de primacía no carga la misma restricción, y por
eso la rúbrica pondera las dos posiciones distinto en vez de tratarlas como equivalentes.

**El gradiente de meta se puntúa como affordance, no como efecto.** El aumento de
motivación al acercarse a una meta no es observable en una imagen capturada. Lo que sí es
observable es la condición de diseño de la que el efecto depende: si el avance hacia la
meta se hace visible, y cómo. Esta rúbrica puntúa eso y lo declara. Es el mismo
estrechamiento que se aplica a la Ley de Hick en G2, y el análisis reporta ambas leyes
entre los casos donde la distancia entre el hallazgo y la operacionalización es más ancha.

**El original de Hull no se leyó directamente.** El trabajo de Hull sobre el gradiente de
meta se cita a través de Kivetz et al. (2006), que lo reformulan y, más útil para este
proyecto, replican el efecto en humanos: los clientes de un programa de recompensas de
cafetería compraron con más frecuencia a medida que se acercaban al premio, con el tiempo
medio entre compras cayendo alrededor de un 20 %, y la aceleración también apareció cuando
el progreso era ilusorio, producido por sellos de bonificación que cambiaban la distancia
percibida a la meta sin cambiar la real. Ese segundo resultado es el que la rúbrica puntúa,
porque un indicador de progreso es exactamente una afirmación sobre distancia percibida.

---

## G6 · Economía y convención

| | |
|---|---|
| **Leyes subsumidas** | Navaja de Occam · Ley de Tesler · Ley de Jakob |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | Elementos sin función, trabajo trasladado al usuario que el sistema podría resolver, y desvíos de un catálogo cerrado de convenciones de colocación |

**Ninguna de las tres leyes de este grupo tiene fuente empírica, y están juntas por eso.**
No es un defecto del agrupamiento: es su propósito. Aislar en un grupo las tres entradas
sin publicación detrás permite comparar el acuerdo que se alcanza sobre principios sin
respaldo experimental contra el que se alcanza sobre principios que sí lo tienen. Cualquier
acuerdo que este grupo obtenga es una afirmación sobre esta rúbrica, no sobre una ley.

### Entradas

- `wireframe.png`
- `nodes.json` — se usan `ink`, `bounds`, `visibleBoundary`, `nodeName`, `attributes`,
  `parentId` e `isClickable`.

La distinción contenedor/contenido que este grupo necesita para la Navaja de Occam la da
`visibleBoundary`: un nodo que no pinta frontera visible y no aporta tinta propia es
estructura de marcado y no un elemento de la interfaz, y no se cuenta como elemento
eliminable.
  Los atributos son indispensables aquí: sobre rectángulos en blanco no se distingue un
  logo de cualquier imagen, y `alt`, `aria-label`, `href` y `role` dan esa identidad sin
  necesidad de dibujar texto.

### Procedimiento

1. **Contar la redundancia.** `R` es el número de elementos que no llevan información ni
   habilitan una acción: separadores puramente decorativos, contenedores vacíos con peso
   visual, y sobre todo repeticiones del mismo dato — una etiqueta, un marcador de posición
   que repite la etiqueta y un texto de ayuda que la repite por tercera vez cuentan como
   dos redundancias, no como tres elementos.

2. **Contar el trabajo trasladado.** `T` es el número de operaciones que la pantalla exige
   al usuario y que el sistema tiene los datos para resolver: sumar valores que ya muestra,
   transcribir un dato de una parte de la pantalla a otra, elegir un formato cuando podría
   aceptar varios, calcular una diferencia entre dos cifras presentes. Se determina
   distinguiendo campos de entrada de campos de resultado, que es lo que `nodeName` y
   `attributes` permiten.

3. **Evaluar el catálogo de convenciones.** Recorrer las ocho convenciones de la tabla de
   abajo. Para cada una, determinar primero si **aplica** a esta pantalla. Registrar `K_ap`
   (cuántas aplican) y `K` (cuántas de las aplicables están rotas sin razón funcional
   visible).

4. **Puntuar contra los niveles.**

5. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando el elemento o la
   convención concreta.

#### Catálogo de convenciones — cerrado, versión 1, 10 de septiembre de 2026

Se juzga únicamente contra estas ocho. El catálogo es cerrado a propósito: sin una lista
fija, "romper la convención" es una opinión, y con ella el criterio es reproducible aunque
su base sea convención y no evidencia.

| | Convención | No aplica cuando |
|---|---|---|
| **K1** | El logo está arriba a la izquierda y enlaza al inicio | La pantalla es la propia página de inicio de un sitio de una sola página |
| **K2** | El buscador está arriba, centrado o a la derecha | El sitio no ofrece búsqueda |
| **K3** | El carrito o el acceso a la cuenta está arriba a la derecha | No hay carrito ni sesión de usuario |
| **K4** | La navegación principal es horizontal arriba o vertical a la izquierda | La pantalla es un paso de un flujo que suprime la navegación deliberadamente |
| **K5** | La etiqueta de un campo va encima o a la izquierda de él | No hay formulario |
| **K6** | En un par de botones, la acción primaria va a la derecha | No hay pares de botones |
| **K7** | Los enlaces legales y de contacto están en el pie | No hay pie |
| **K8** | La ruta de navegación va inmediatamente bajo el encabezado | El sitio no tiene jerarquía de secciones |

El catálogo es de convenciones **web** y de esta fecha. Una convención de aplicación móvil
no es la misma, y la de dentro de cinco años tampoco. Cualquier reporte de este grupo lleva
la versión del catálogo.

### Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g6_slots_convencion` — la evidencia posicional de las ocho convenciones: `K1_logo`, `K2_buscador`, `K3_cuenta_carrito`, `K4_navegacion` (con si está en la franja superior o en la columna izquierda), `K5_campos`, `K6_pares_de_botones` (con cuál queda a la izquierda y cuál a la derecha), `K7_pie`, `K8_ruta`
- `g6_campos_de_entrada` y `g6_botones` — conteos
- `g6_contenedores_vacios` y `g6_separadores`, con sus totales — candidatos a redundancia estructural
- `g6_contenedores_vacios_total` y `g6_separadores_total` — los conteos completos; las listas van recortadas a quince
- `g6_catalogo_convenciones` — la versión del catálogo contra la que se juzga, que todo reporte de este grupo debe citar

- `g6_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`wireframe.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

### Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| Qué hay en cada ranura de convención y dónde | **`K_ap`: cuáles de las ocho convenciones aplican a esta pantalla**, y **`K`: cuáles de las aplicables están rotas sin razón funcional visible** |
| Contenedores con frontera y sin contenido, y separadores de una dimensión | **`R`: cuánta redundancia hay.** El dato repetido —una etiqueta, un marcador que la repite y una ayuda que la repite otra vez— **exige leer el texto**, y por eso es juicio y no conteo |
| Cuántos campos de entrada y cuántos botones hay | **`T`: cuántas operaciones traslada la pantalla al usuario que el sistema tiene los datos para resolver** |
| — | **El nivel** contra las anclas de `K`, `T` y `R` |

**El catálogo de convenciones es cerrado y fechado —ocho, versión 1, 10 de
septiembre de 2026— y el agente no lo amplía.** Si encuentra una convención rota que no está
entre las ocho, no la puntúa: la escribe como hallazgo. Ampliar el catálogo sobre la marcha
produce un criterio distinto por página, que es lo contrario de un criterio.

**`R` es el juicio que más depende del texto y el que peor sostiene esta capa.** El código no
ve que dos campos pidan el mismo dato. Entrega los contenedores vacíos y los separadores, que
son la parte estructural de la redundancia, y la parte de contenido queda enteramente en la
lectura de la región.

#### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que se emiten **leyendo el screenshot**, aunque el canal de
referencia del grupo sea el wireframe: `R`, `T`, `K_ap` y `K`.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. Son todos los juicios del grupo. **G6 no tiene comparación entre canales limpia en ningún caso**, y ese es el precio de que sus ocho convenciones se definan por lo que hay en cada ranura y no por su geometría.

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

### Niveles

**0** — `K ≥ 3` convenciones aplicables rotas, o bien `T ≥ 1` junto con redundancia
generalizada (`R` afectando a la mayoría de los bloques de la pantalla).

**1** — `K = 2`, o `T ≥ 1` sin redundancia generalizada.

**2** — `K = 1`, o `R` en casos aislados con `K = 0` y `T = 0`.

**3** — `K = 0` entre las convenciones aplicables, `T = 0` y `R = 0`.

**4** — Nivel 3, y además la pantalla elimina trabajo activamente: valores por defecto
sensatos, campos precargados con lo que el sistema ya sabe, formatos de entrada aceptados
sin exigir uno en particular, o cálculos presentados ya resueltos donde otra interfaz los
pediría.

### Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g6"` y en
`measurements`: `R`, `T`, `K_ap`, `K`, `K_broken` (la lista de identificadores rotos, por
ejemplo `["K3","K6"]`) y `catalog_version`.

`trigger` nombra la condición que fijó el nivel: `R`, `T`, `K` o `ninguna`.

### No aplicable

`not_applicable: true` únicamente cuando `K_ap = 0`, es decir cuando ninguna de las ocho
convenciones aplica a esta pantalla, y además no hay formulario ni campos de resultado que
permitan evaluar `T`. Condición objetiva sobre `nodes.json`.

### Declaraciones

**Las tres entradas carecen de fuente empírica, y eso está verificado, no supuesto.**

La Navaja de Occam es un principio de selección de teorías atribuido a un filósofo del
siglo XIV. No es un resultado sobre percepción humana ni sobre interfaces, y lo que esta
rúbrica puntúa bajo ese nombre — redundancia observable — es una definición de este
proyecto.

La Ley de Tesler se atribuye a Larry Tesler en Xerox PARC y se escribió por primera vez en
una entrevista, sin estudio detrás. La idea de que la complejidad se conserva y solo se
traslada entre sistema y usuario es una observación de práctica profesional.

La Ley de Jakob tiene origen localizable en Nielsen (2000). Ese artículo enuncia el
principio como consejo profesional apoyado en ejemplos, y no reporta estudio empírico
alguno. Nielsen (2000) se abrió y se leyó para confirmarlo.

**Los umbrales y el catálogo son convención de este proyecto.** `K ≥ 3`, `K = 2`, `K = 1` y
las ocho convenciones mismas se adoptaron por reproducibilidad. No se derivan de ninguna
fuente porque no hay fuente de la cual derivarlas, que es precisamente lo que este grupo
existe para poner a prueba.

**Lo que este grupo aporta al análisis.** Si el acuerdo alcanzado aquí resulta comparable
al de los grupos con respaldo experimental, eso dice algo sobre qué tan poco depende la
operacionalizabilidad de la evidencia detrás del principio. Si resulta mucho menor, dice lo
contrario. La comparación es de un grupo contra seis y esos grupos difieren además en
constructo, en número de leyes y en canal, así que se reporta como observación descriptiva
exploratoria y no como un contraste con réplicas.

---

## G7 · Targeting motor

| | |
|---|---|
| **Leyes subsumidas** | Ley de Fitts |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | El tamaño de cada objetivo interactivo y la separación entre objetivos adyacentes |

El grupo contiene una sola ley porque nada más en la colección mide apuntar. Un grupo de
uno no es un defecto: forzar otra ley adentro para equilibrar la tabla habría fusionado
constructos distintos por razones cosméticas.

### Entradas

- `nodes.json` — es la entrada principal. `isClickable` identifica qué caja es un objetivo
  y `bounds` da sus dimensiones en píxeles CSS. Este grupo es el mejor servido por el
  canal: el árbol de layout entrega la medición directamente, sin estimarla sobre la
  imagen.

  **Este grupo mide sobre `bounds` y no sobre `ink`, y es el único que lo hace.** Los demás
  grupos que corren en wireframe miden sobre `ink` porque miden percepción, y una caja sin
  fondo ni borde no se percibe. Fitts mide otra cosa: el área que acepta el clic. Un botón
  con 20 px de relleno transparente alrededor de su etiqueta es un objetivo de todo su
  ancho aunque el ojo solo vea el texto, y el criterio de tamaño mínimo de la WCAG está
  definido sobre esa misma área. Medirlo sobre `ink` subestimaría el objetivo y reportaría
  como defecto un botón que se acierta sin problema.

  El caso inverso sí es un hallazgo y se registra: cuando `bounds` es mucho mayor que `ink`,
  el área que acepta el clic es mayor que la que el usuario cree que puede tocar. Registrar
  `bounds`, `ink` y su razón para todo objetivo cuya área de tinta sea menor que la mitad
  de su área de layout; no cambia el nivel, pero entra en `measurements` y alimenta las
  recomendaciones.
- `wireframe.png` — para situar los hallazgos y verificar adyacencia visual.

### Procedimiento

1. **Enumerar los objetivos.** Todo nodo con `isClickable` verdadero y área mayor que
   cero. Registrar `N_obj`.

2. **Medir cada objetivo.** Para cada uno, su dimensión menor en píxeles CSS. Registrar
   `W_min` (la más pequeña de toda la pantalla) y `N_bajo24` (cuántos objetivos tienen su
   dimensión menor por debajo de 24 px).

3. **Medir la separación entre adyacentes.** Dos objetivos son adyacentes cuando sus cajas
   no se solapan y la distancia entre sus bordes más cercanos es menor que la dimensión
   mayor del más pequeño de los dos. Para cada par adyacente, registrar la distancia entre
   bordes. `S_min` es la menor de todas.

4. **Aplicar la excepción por separación.** Un objetivo por debajo de 24 px no cuenta como
   deficiente si un círculo de 24 px de diámetro centrado en su caja no intersecta ni otro
   objetivo ni el círculo de otro objetivo subdimensionado. Registrar `N_bajo24_sin_holgura`
   como los que no cumplen la excepción.

5. **Verificar la consistencia por familia.** Objetivos de la misma familia son los que
   comparten `nodeName` y `parentId`. Registrar si dentro de cada familia el tamaño es
   uniforme, y si el objetivo primario de la pantalla es mayor que los secundarios.

6. **Puntuar contra los niveles.**

7. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando el objetivo concreto
   y su medida.

#### Condiciones observables

Cada condición se mide como una **proporción afectada** `p` sobre el denominador declarado, y
se etiqueta con la escala de tolerancia de `shared/escala.md`.

| | Condición | Un objetivo la incumple cuando | Denominador de `p` |
|---|---|---|---|
| **T1** | Mínimo de área de clic | Su dimensión menor es menor que 24 px y no cumple la excepción por holgura del paso 4 | Todos los objetivos, `N_obj` |
| **T2** | Separación | Forma un par adyacente separado por menos de 8 px | Pares adyacentes del paso 3 |
| **T3** | Tamaño cómodo | Su dimensión menor es menor que 32 px | Todos los objetivos, `N_obj` |
| **T4** | Consistencia por familia | Su familia tiene tamaños que difieren en más de 2 px | Objetivos que pertenecen a una familia de dos o más |

### Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g7_p_T1`, `g7_p_T2`, `g7_p_T3`, `g7_p_T4` — las cuatro proporciones con su denominador y su etiqueta
- `g7_N_obj`, `g7_W_min`, `g7_S_min`, `g7_pares_adyacentes`, `g7_familias` — los crudos que sostienen las proporciones
- `g7_areas_mayores` y `g7_razon_area_1_2` — evidencia para la condición del nivel 4

- `g7_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`wireframe.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

### Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| Los objetivos, sus dimensiones, sus separaciones y sus familias | Nada: el agente no vuelve a medir |
| Las cuatro proporciones y sus etiquetas | Nada |
| Las áreas de los objetivos mayores y su razón | **Si el objetivo primario es visiblemente mayor que los secundarios**, que es la condición del nivel 4 |
| — | **El nivel**, aplicando la combinación de la escala de tolerancia a las cuatro etiquetas |

**G7 es la rúbrica más mecánica de las siete** y, con G1, la que pone a prueba la
hipótesis H1: dadas las mismas cuatro etiquetas, el nivel no tiene grados de libertad. Si entre
repeticiones el nivel o el `trigger` cambian, la variación la introdujo el agente y es un
hallazgo, no ruido tolerable.

#### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que se emiten **leyendo el screenshot**, aunque el canal de
referencia del grupo sea el wireframe: **Ninguno.** Las cuatro condiciones de G7 se miden en píxeles sobre `bounds`.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. **La comparación entre canales de G7 es limpia.**

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

### Niveles

Combinación común a todas las rúbricas que usan la escala de tolerancia:

**0** — Dos o más de T1 a T4 **generalizadas** (`p > 0,25`), o una sola con `p > 0,50`.

**1** — Exactamente una generalizada, o dos o más **frecuentes** (`0,10 < p ≤ 0,25`).

**2** — Ninguna generalizada y al menos una frecuente.

**3** — Las cuatro **aisladas o impecables** (`p ≤ 0,10`).

**4** — Las cuatro **impecables** (`p = 0`), y además el objetivo primario de la pantalla es
visiblemente mayor que los secundarios, de modo que el tamaño mismo comunica la jerarquía de
acción.

#### Por qué esta rúbrica se reescribió el 11 de septiembre de 2026

La versión anterior asignaba **0** con un solo objetivo por debajo de 24 px sin holgura. El
piloto de calibración la corrió sobre 24 páginas fuera del corpus y **21 de 24 cayeron en 0**,
con 3 en 1 y ninguna en 2, 3 ni 4. Lo que disparaba el nivel eran enlaces de texto corrientes
de 18 o 19 px de alto —pie de página, enlaces dentro de un párrafo—, presentes en casi
cualquier página web. Una rúbrica que asigna el peor nivel a casi todo no ordena nada.

**Esto es el procedimiento pre-comprometido ejecutándose, no un ajuste a los datos.** El plan
de pruebas ya decía, antes de correr nada, que la rúbrica que no ejercite su escala se
reescribe y la reescritura se fecha antes del congelamiento. Los umbrales 24 px y 32 px no se
tocaron —el primero es el mínimo de la WCAG— y los cortes de proporción, 0,10 y 0,25, están
declarados en `shared/escala.md` sin mirar ninguna distribución. La regla del ajuste único,
allí mismo, prohíbe volver a moverlos porque el resultado no quede repartido.

**Lo que se consideró y no se hizo.** Separar los enlaces de texto en flujo de los controles
de la pantalla, para aplicarles el mínimo de la WCAG solo a los segundos, es una corrección
distinta y discutible —cambia *qué* se mide, no *cómo* se combina—. Habría entrado junto con
esta y las dos serían imposibles de atribuir por separado. Queda como propuesta fechada, no
aplicada.

### Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g7"` y en
`measurements`: `N_obj`, `W_min`, `N_bajo24`, `N_bajo24_sin_holgura`, `S_min`,
`families_consistent` y `primary_larger`.

`trigger` nombra la condición que fijó el nivel: `W_min`, `holgura`, `S_min`,
`consistencia` o `ninguna`.

### No aplicable

`not_applicable: true` únicamente cuando `N_obj = 0`, es decir cuando la pantalla no
contiene ningún elemento interactivo. Condición objetiva sobre `nodes.json`.

### Declaraciones

**Solo la mitad del índice de dificultad es observable.** La Ley de Fitts relaciona el
tiempo de movimiento con la amplitud — la distancia desde donde arranca el puntero — y el
ancho del objetivo. En una captura estática no existe posición inicial del puntero, así que
de los dos términos únicamente el ancho es observable. Esta rúbrica puntúa tamaño de
objetivo y separación entre objetivos adyacentes, y no afirma nada sobre tiempo de
movimiento. Fitts (1954) midió tiempo, no tamaños aceptables de botón.

**El umbral de 24 px y su excepción no son convención de este proyecto.** Vienen del
criterio de conformidad 2.5.8 de WCAG 2.2, Target Size (Minimum), nivel AA, que exige que
el objetivo para entradas de puntero sea de al menos 24 por 24 píxeles CSS, con una
excepción por espaciado: los objetivos subdimensionados se aceptan cuando un círculo de
24 px de diámetro centrado en la caja de cada uno no intersecta otro objetivo ni el círculo
de otro objetivo subdimensionado. Los umbrales de 32 px de los niveles 2 y 3, y el de 8 px
de separación, sí son convención de este proyecto.

**Este es el grupo más cercano a lo que los linters ya resuelven, y conviene decirlo.** El
tamaño de objetivo es un criterio de accesibilidad verificable por regla, y la propuesta de
este trabajo cita "target sizes" como ejemplo de lo que la automatización sintáctica ya
cubre. Lo que distingue a esta rúbrica de esa comprobación es la separación entre objetivos
adyacentes, la excepción por holgura y la consistencia por familia, que son relaciones
entre elementos y no propiedades de un elemento aislado. Si el análisis muestra que G7
alcanza acuerdo alto, ese resultado hay que leerlo teniendo presente que parte del
constructo es sintácticamente verificable.
