---
name: g3-capacidad-segmentacion
description: Puntúa el grupo de constructo G3, capacidad y segmentación, sobre el wireframe de una pantalla capturada. Subsume Ley de Miller, Chunking, Memoria de trabajo y Carga cognitiva. Úsala cuando haya que evaluar cuánto le pide una interfaz al usuario que sostenga a la vez y qué tan bien está partido el contenido.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G3
  channel: wireframe
  scale: ordinal-0-4
  protocol_version: unreleased
allowed-tools: Read
---

# G3 · Capacidad y segmentación

| | |
|---|---|
| **Leyes subsumidas** | Ley de Miller · Chunking · Memoria de trabajo · Carga cognitiva |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | Cuántas unidades se exponen a la vez, si están segmentadas en bloques coherentes, si algún dato requerido queda fuera de vista, y cuánto contenido ajeno a la tarea compite con ella |

Este grupo junta cuatro constructos de tres tradiciones distintas y emite un solo puntaje.
Por eso el campo `trigger` es obligatorio aquí y no opcional: sin él, un G3 bajo no dice
cuál de los cuatro se violó y el hallazgo no es accionable.

## Entradas

- `wireframe.png`
- `nodes.json` — se usan `ink`, `bounds`, `visibleBoundary`, `parentId`, `nodeName`,
  `isClickable` y `position`.

Las áreas y las distancias se miden sobre `ink`. La regla del paso 2 —«los elementos
puramente contenedores no cuentan»— deja de ser un juicio y pasa a ser una condición
verificable: un nodo con `visibleBoundary.visible === false` que no aporta tinta propia es
un contenedor puro y no es una unidad. Un nodo con `ink: null` no muestra nada y se excluye.

## Procedimiento

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

## Niveles

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

## Salida requerida

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g3"` y en
`measurements` los valores crudos: `U`, `B`, `H`, `V`, `X` y `blocks` (número de bloques
de primer nivel).

`trigger` es **obligatorio** y nombra la condición que fijó el nivel: `U`, `segmentacion`,
`B`, `H`, `V`, `X` o `ninguna`. Un G3 sin `trigger` se rechaza en validación.

## No aplicable

`not_applicable: true` únicamente cuando la región de la tarea contiene menos de dos
unidades, es decir cuando no hay nada que segmentar. Condición objetiva sobre
`nodes.json`.

## Declaraciones

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
