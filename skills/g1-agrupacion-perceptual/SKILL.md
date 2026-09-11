---
name: g1-agrupacion-perceptual
description: Puntúa el grupo de constructo G1, agrupación perceptual, sobre el wireframe de una pantalla capturada. Subsume Ley de Proximidad, Ley de Prägnanz, Ley de Región Común y Ley de Similitud. Úsala cuando haya que evaluar si la estructura visual de una interfaz comunica la agrupación que su contenido tiene.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G1
  channel: wireframe
  scale: ordinal-0-4
  protocol_version: unreleased
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
