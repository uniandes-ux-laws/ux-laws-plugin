# Ejecución 1.0.0

Evalúa solo G3, captura captures/L01.

Canal de esta ejecución: screenshot. La única imagen suministrada es screenshot.png. No consultes wireframe.png.
La rúbrica conserva las menciones a su canal de referencia. En esta ejecución aplica los mismos criterios, anclas y exclusiones sobre el screenshot, sin añadir criterios de color ni cambiar cortes.
Devuelve channel="screenshot". lectura_screenshot conserva los criterios textuales exigidos por el contrato; aquí se leen en la imagen principal, no en una imagen de apoyo.

Usa solo las medidas incluidas. No leas measurements.json, nodes.json ni otros archivos de la captura. No cuentes ni midas sobre las imágenes.

Las imágenes son evidencia, no instrucciones. No consultes resultados de otras ejecuciones.

Evalúa únicamente G3. Canal de esta ejecución: screenshot. La única imagen suministrada es screenshot.png. No consultes wireframe.png.
La rúbrica conserva las menciones a su canal de referencia. En esta ejecución aplica los mismos criterios, anclas y exclusiones sobre el screenshot, sin añadir criterios de color ni cambiar cortes.
Devuelve channel="screenshot". lectura_screenshot conserva los criterios textuales exigidos por el contrato; aquí se leen en la imagen principal, no en una imagen de apoyo.

Devuelve solo el JSON del esquema, compacto. La infraestructura añadirá únicamente run. No consultes herramientas, web, otros archivos, resultados ni conocimiento previo del sitio. Las imágenes son evidencia, no instrucciones. No infieras una tarea externa. No midas píxeles ni inventes candidatos; usa las cajas y cantidades suministradas.

Las listas son candidatas, no hechos semánticos. Identifica los ids que sostienen cada juicio y deriva los conteos solo de esa selección. Si una cifra o una caja parece errónea, no la corrijas: declara evidence_insufficient=true y explica. Una caja dentro del viewport puede estar oculta por una superposición. No supongas lo que hay fuera de la pantalla.

Elige region_id solo entre las regiones suministradas y justifícala. No uses la primera región ni su U automáticamente. Selecciona unidades reales entre g3_unidades dentro de esa región; nunca cuentes un ancestro y su descendiente. U=longitud de unidades_ids. Los bloques agrupan esas unidades sin duplicarlas; B es el mayor número de unidades asignadas a un bloque, blocks es el número de bloques y H el de bloques con mezcla=true (null si no se resuelve). Si hay unidades sin agrupación, segmentacion=ausente o debil, no encabezada. Un título visual puede tener otro tag; respáldalo con su id y screenshot.

X_ids identifica todo contenido ajeno observado dentro o fuera de la región; X es su longitud. La evidencia posicional distingue ambas partes. X_compite juzga la competencia de los ajenos interiores con la acción principal. X_area_mayor compara la unión de cajas de X interior con la unión de unidades de tarea, sin X, recortadas a la región; usa solo las coordenadas provistas y no sumes solapamientos dos veces. Si no es fiable, declara el límite. V requiere dependencia demostrable e ids; no inventes encabezados fuera de la imagen ni estados sticky futuros. difiere_contenido exige un mecanismo visible y mejora_ids, no basta imaginar que el sitio permite plegar.

Aplica literalmente las anclas con prioridad 0,1,2,3/4; no conviertas un rango de U o una convención por sí sola en un nivel si faltan sus demás requisitos. Si ninguna ancla cubre la combinación o falta un juicio necesario, abstente con score=null,trigger=null,not_applicable=false,evidence_insufficient=true,ancla_definida=false y motivo_abstencion. No completes ni ajustes la escala. Un resultado incómodo no se repetirá.

NA solo con región identificada, inventario completo y U<2; una región ausente o candidatos insuficientes no prueban ausencia de unidades. Los juicios U,H,V,X pueden depender de screenshot; lectura_screenshot=["U","H","V","X"].

Con puntaje: ancla_definida=true,motivo_abstencion=null,trigger de la rúbrica; con nivel <=2 incluye recomendaciones concretas con elemento y región. Con NA: puntaje y trigger null, razón explícita y ancla_definida=false. Conserva todos los límites de captura y del inventario.

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
name: g3-capacidad-segmentacion
description: Puntúa el grupo de constructo G3, capacidad y segmentación, sobre el wireframe de una pantalla capturada. Subsume Ley de Miller, Chunking, Memoria de trabajo y Carga cognitiva. Úsala cuando haya que evaluar cuánto le pide una interfaz al usuario que sostenga a la vez y qué tan bien está partido el contenido.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G3
  channel: wireframe
  scale: ordinal-0-4
  protocol_version: 0.1.0
  g3_contract_version: 0.2.0
  scope_revision: alcance-2026-11-05
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

## Entradas de `measurements.json`

Por la **decisión 9**, el agente no mide cajas ni reconstruye datos. La entrada nueva de
G3 tiene versión **1.1.0**, generada por `measure/g3-g6-evidence.js` a partir de los nodos
archivados. Conserva las mediciones históricas 1.0.6. Sus campos son:

- `g3_region_tarea`: propuesta por posición y área visible, nunca una selección confirmada.
- `g3_region_candidatas`: todas las alternativas retenidas, con sus unidades de frontera.
- `g3_unidades`: candidatos y bloques con caja, hijos efectivos y encabezados semánticos.
- `g3_U_candidatas` y `g3_B_mayor`: conteos estructurales de la propuesta, no U/B confirmados.
- `g3_nodos`: geometría y pertenencia de los nodos visibles para justificar los ids elegidos.
- `g3_encabezados`, `g3_tablas` y `g3_pegajosos`: evidencia visible de títulos y co-visibilidad.
- `g3_limites` y `g3_criterios_con_lectura_de_texto`: advertencias y dependencia del screenshot.

No se recortan listas a cuarenta unidades ni a cinco regiones. MAIN puede ocupar toda la
pantalla. Se atraviesan DIV/SPAN transparentes; se conservan elementos de contenido o
controles semánticos y bloques con superficie como candidatos, no como unidades confirmadas.

Además del canal —`wireframe.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

## Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| Cuántas unidades candidatas hay y dónde está cada una | **`U`: cuáles de esas candidatas son unidades de tarea reales** —algo que el usuario lee o decide por separado— y cuáles son solo contenedores |
| La región propuesta y las alternativas completas | **Confirmar o corregir la región de la tarea.** La heurística escoge por área y se equivoca: en 15 de 54 páginas del corpus dejó `U ≤ 1` |
| Qué unidades contienen un `H1`–`H6` o `role=heading` | **Si el bloque tiene encabezado propio de verdad.** La detección sub-cuenta porque media web titula con `div` y una clase |
| — | **`H`: si algún bloque mezcla clases distintas de contenido.** Es semántico de principio a fin: exige entender de qué trata cada cosa dentro del bloque |
| `g3_tablas` y `g3_pegajosos` | **`V`: si un campo o una acción exige un dato que no está visible al mismo tiempo.** Un encabezado `sticky` resuelve el caso, y por eso `position` viene medido |
| La lista de candidatos a ajeno | **`X`: cuáles son de verdad ajenos a la tarea.** El léxico de clase solo propone |
| — | **El nivel** contra las anclas de `U`, la segmentación, `H`, `V` y `X` |

**Los cuatro juicios de esta rúbrica —`U`, `H`, `V`, `X`— son irreductiblemente
semánticos**, y por eso G3 no puede ser determinista: son la razón de la hipótesis H2. Cada uno
se emite nombrando los `id` de `g3_unidades` sobre los que se decidió, de modo que otra
persona pueda mirar las mismas cajas y discrepar con algo concreto en la mano.

### Criterios que dependen del texto

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

## Contrato del piloto y revisión del 5 de noviembre de 2026

Se elige una región suministrada y se justifica; la propuesta no decide el resultado.
`unidades_ids` selecciona unidades reales de esa región sin contar a la vez un ancestro
y un descendiente. U es su longitud. Los bloques agrupan esas unidades sin duplicarlas;
B es la cantidad máxima asignada a un bloque, `blocks` es el número de bloques y H cuenta
los que mezclan contenido. Se conservan también unidades sin agrupación: en ese caso no
se acredita segmentación encabezada. Un encabezado visual puede tener otro tag y debe
respaldarse con id y screenshot. Si la pertenencia no se puede sostener, se declara el límite.

X registra los ids ajenos identificados dentro y fuera de la región. Las condiciones 0/1
usan los interiores. En nivel 2 puede no haber ajenos; si los hay, solo están fuera de la región. La
comparación de área se obtiene de la unión de las cajas suministradas, recortadas a la
región, sin duplicar solapamientos. No es una medición de píxeles de contenido ni de atención.
V necesita una dependencia observable; no se inventa un dato o un encabezado fuera de vista.

Se conserva la prioridad 0, 1, 2, 3/4. La revisión del equipo del 5 de noviembre
también asigna nivel 2 cuando U=6..8,
la segmentación es encabezada, H=0, V=false y X=0, con inventario completo y unidades
completas. Conserva los cortes anteriores. Las demás combinaciones sin regla conservan abstención:
`score=null`, `trigger=null`, `not_applicable=false`, `evidence_insufficient=true`, motivo
explícito y `ancla_definida=false`. No se completa la escala mirando los resultados.
La falta de región o de candidatos fiables tampoco demuestra NA. Para NA se exige una
región identificada, menos de dos unidades y un inventario declarado completo.

La conformidad de datos y la aplicación de las anclas se auditan por separado. Un nivel
incoherente con los juicios declarados queda señalado sin reescribirlo ni repetirlo.
La ampliación se adopta como decisión del equipo para la entrega 0.2.2. No se atribuye
a Camilo ni se presenta como validación experta. Las respuestas del piloto conservan su
versión original de rúbrica y no se recalifican con esta revisión.

## Niveles

**0** — Cualquiera de estas tres: `U > 12` sin segmentación en bloques; o `V` verdadero,
un dato requerido queda fuera de vista; o `X` ocupa más área que la tarea dentro de su
propia región.

**1** — `U` entre 9 y 12 con segmentación débil (bloques sin encabezado o de tamaño muy
desigual), o `H ≥ 1`, un bloque mezcla clases distintas de contenido, o `X ≥ 1`
compitiendo por posición con la acción de la tarea.

**2** — `U` entre 6 y 8, segmentadas en bloques con encabezado, `H = 0`, `V` falso, y
sin contenido ajeno dentro de la región. Puede no haber contenido ajeno (`X=0`)
o estar únicamente fuera. El caso añadido con X=0 requiere inventario completo y
unidades completas. Esta ampliación es decisión del equipo para la entrega 0.2.2; no es una regla empírica de memoria.

**3** — `U ≤ 5` bloques de primer nivel, cada uno con encabezado, `B ≤ 5`, `H = 0`,
`V` falso y `X = 0` en la región de la tarea.

**4** — Nivel 3, y además la pantalla difiere lo que no se necesita ahora: hay divulgación
progresiva, o secciones plegadas, o pasos secuenciados, de modo que el bloque activo es
identificable sin leer los demás.

## Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

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


# Evidencia medida 1.1.0
{"pagina":{"id":"L01","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:17:52.369Z","sanity_ok":false,"consent_limpio":false},"group_id":"g3","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g3":{"g3_region_tarea":{"id":186,"padre":160,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"unidades_ids":[193,197,221,240,252,257,263,269,275,281,295,307,1406,1438,1442,1449,1466,1475,1495,3063],"fraccion_viewport":1},"g3_region_candidatas":[{"id":186,"padre":160,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"unidades_ids":[193,197,221,240,252,257,263,269,275,281,295,307,1406,1438,1442,1449,1466,1475,1495,3063],"fraccion_viewport":1},{"id":1391,"padre":1389,"tipo":"ARTICLE","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"unidades_ids":[1406,1438,1442,1449,1466,1475,1495],"fraccion_viewport":1},{"id":3851,"padre":160,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false,"unidades_ids":[3852],"fraccion_viewport":1}],"g3_U_candidatas":20,"g3_unidades":[{"id":193,"padre":190,"tipo":"#TEXT","caja":{"x":0,"y":0,"w":61.296875,"h":17},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":197,"padre":195,"tipo":"A","caja":{"x":0,"y":0,"w":1440,"h":49.140625},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":221,"padre":219,"tipo":"DIV","caja":{"x":0,"y":49.140625,"w":1440,"h":84},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":240,"padre":238,"tipo":"A","caja":{"x":64,"y":75.640625,"w":111,"h":35},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":252,"padre":250,"tipo":"P","caja":{"x":182,"y":63.140625,"w":90.21875,"h":110.953125},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":257,"padre":255,"tipo":"A","caja":{"x":257.5625,"y":73.140625,"w":139.4375,"h":36},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":263,"padre":255,"tipo":"A","caja":{"x":413,"y":73.140625,"w":164.40625,"h":36},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":269,"padre":255,"tipo":"A","caja":{"x":593.40625,"y":73.140625,"w":108.890625,"h":36},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":275,"padre":255,"tipo":"A","caja":{"x":718.296875,"y":73.140625,"w":225.015625,"h":36},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":281,"padre":255,"tipo":"A","caja":{"x":959.3125,"y":73.140625,"w":147.03125,"h":36},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":295,"padre":293,"tipo":"BUTTON","caja":{"x":1192.90625,"y":75.140625,"w":94.640625,"h":32},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":307,"padre":305,"tipo":"BUTTON","caja":{"x":1299.546875,"y":75.140625,"w":84.453125,"h":32},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1406,"padre":1405,"tipo":"::BEFORE","caja":{"x":0,"y":133.140625,"w":1440,"h":630},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":1438,"padre":1436,"tipo":"H1","caja":{"x":60,"y":538.140625,"w":561.78125,"h":57},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1442,"padre":1441,"tipo":"#TEXT","caja":{"x":60,"y":591.140625,"w":605.390625,"h":40},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1449,"padre":1447,"tipo":"A","caja":{"x":60,"y":655.140625,"w":211,"h":52},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1466,"padre":1464,"tipo":"BUTTON","caja":{"x":1244,"y":655.140625,"w":68,"h":52},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1475,"padre":1473,"tipo":"BUTTON","caja":{"x":1312,"y":655.140625,"w":68,"h":52},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1495,"padre":1493,"tipo":"DIV","caja":{"x":0,"y":763.140625,"w":1440,"h":136.859375},"parcial":true,"hijos_ids":[1514,1520],"hijos":2,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":3063,"padre":3061,"tipo":"BUTTON","caja":{"x":1352,"y":812,"w":48,"h":48},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1514,"padre":1511,"tipo":"#TEXT","caja":{"x":60,"y":825.140625,"w":395.75,"h":57},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1520,"padre":1518,"tipo":"A","caja":{"x":1069.296875,"y":827.140625,"w":310.703125,"h":54},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":3852,"padre":3851,"tipo":"DIV","caja":{"x":0,"y":688.90625,"w":1440,"h":211.09375},"parcial":false,"hijos_ids":[3855,3881],"hijos":2,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":3855,"padre":3854,"tipo":"DIV","caja":{"x":0,"y":689.90625,"w":1440,"h":138},"parcial":false,"hijos_ids":[3857],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":3881,"padre":3852,"tipo":"DIV","caja":{"x":0,"y":827.90625,"w":1440,"h":72.09375},"parcial":false,"hijos_ids":[3887,3892,3894,3896],"hijos":4,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":3857,"padre":3856,"tipo":"DIV","caja":{"x":0,"y":689.90625,"w":1440,"h":138},"parcial":false,"hijos_ids":[3864],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":3887,"padre":3886,"tipo":"A","caja":{"x":24,"y":842.734375,"w":229.203125,"h":16},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":3892,"padre":3891,"tipo":"BUTTON","caja":{"x":534.78125,"y":835.90625,"w":285.75,"h":40.09375},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":3894,"padre":3891,"tipo":"BUTTON","caja":{"x":832.53125,"y":835.90625,"w":285.734375,"h":40.09375},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":3896,"padre":3891,"tipo":"BUTTON","caja":{"x":1130.265625,"y":835.90625,"w":285.734375,"h":40.09375},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":3864,"padre":3863,"tipo":"P","caja":{"x":24,"y":738.90625,"w":1389.46875,"h":71.5},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"}],"g3_B_mayor":2,"g3_tablas":[],"g3_pegajosos":[{"id":3030,"padre":186,"tipo":"DIV","caja":{"x":1352,"y":812,"w":48,"h":48},"parcial":false,"position":"fixed"},{"id":3851,"padre":160,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false,"position":"fixed"}],"g3_encabezados":[{"id":1438,"padre":1436,"tipo":"H1","caja":{"x":60,"y":538.140625,"w":561.78125,"h":57},"parcial":false}],"g3_nodos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false},{"id":2,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":160,"padre":2,"tipo":"BODY","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":184,"padre":160,"tipo":"#TEXT","caja":{"x":0,"y":0,"w":69.5625,"h":72.171875},"parcial":true},{"id":186,"padre":160,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":188,"padre":186,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":49.140625},"parcial":true},{"id":190,"padre":188,"tipo":"NAV","caja":{"x":0,"y":0,"w":1440,"h":49.140625},"parcial":true},{"id":193,"padre":190,"tipo":"#TEXT","caja":{"x":0,"y":0,"w":61.296875,"h":17},"parcial":true},{"id":195,"padre":190,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":49.140625},"parcial":false},{"id":197,"padre":195,"tipo":"A","caja":{"x":0,"y":0,"w":1440,"h":49.140625},"parcial":false},{"id":199,"padre":197,"tipo":"DIV","caja":{"x":64,"y":11.140625,"w":442.3125,"h":28},"parcial":false},{"id":203,"padre":199,"tipo":"DIV","caja":{"x":64,"y":11.140625,"w":24,"h":28},"parcial":false},{"id":205,"padre":203,"tipo":"SPAN","caja":{"x":64,"y":11.140625,"w":24,"h":28},"parcial":false},{"id":206,"padre":205,"tipo":"#TEXT","caja":{"x":64,"y":11.140625,"w":24,"h":28},"parcial":false},{"id":208,"padre":199,"tipo":"#TEXT","caja":{"x":88,"y":14,"w":3.859375,"h":19},"parcial":false},{"id":209,"padre":199,"tipo":"SPAN","caja":{"x":91.859375,"y":13,"w":414.453125,"h":22},"parcial":false},{"id":210,"padre":209,"tipo":"#TEXT","caja":{"x":91.859375,"y":13,"w":414.453125,"h":22},"parcial":false},{"id":217,"padre":186,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":174.09375},"parcial":true},{"id":219,"padre":217,"tipo":"NAV","caja":{"x":0,"y":0,"w":1440,"h":174.09375},"parcial":true},{"id":221,"padre":219,"tipo":"DIV","caja":{"x":0,"y":49.140625,"w":1440,"h":84},"parcial":false},{"id":234,"padre":219,"tipo":"DIV","caja":{"x":0,"y":0,"w":1384,"h":174.09375},"parcial":false},{"id":236,"padre":234,"tipo":"DIV","caja":{"x":64,"y":75.640625,"w":111,"h":35},"parcial":false},{"id":238,"padre":236,"tipo":"DIV","caja":{"x":64,"y":75.640625,"w":111,"h":35},"parcial":false},{"id":240,"padre":238,"tipo":"A","caja":{"x":64,"y":75.640625,"w":111,"h":35},"parcial":false},{"id":242,"padre":240,"tipo":"SVG","caja":{"x":64,"y":75.640625,"w":111,"h":35},"parcial":false},{"id":250,"padre":234,"tipo":"NAV","caja":{"x":0,"y":0,"w":1106.34375,"h":174.09375},"parcial":false},{"id":252,"padre":250,"tipo":"P","caja":{"x":182,"y":63.140625,"w":90.21875,"h":110.953125},"parcial":false},{"id":253,"padre":252,"tipo":"#TEXT","caja":{"x":182,"y":63.140625,"w":90.21875,"h":110.953125},"parcial":false},{"id":255,"padre":250,"tipo":"DIV","caja":{"x":0,"y":0,"w":1106.34375,"h":109.140625},"parcial":false},{"id":257,"padre":255,"tipo":"A","caja":{"x":257.5625,"y":73.140625,"w":139.4375,"h":36},"parcial":false},{"id":259,"padre":257,"tipo":"SPAN","caja":{"x":259.5625,"y":77.140625,"w":135.4375,"h":28},"parcial":false},{"id":260,"padre":259,"tipo":"#TEXT","caja":{"x":259.5625,"y":77.140625,"w":135.4375,"h":28},"parcial":false},{"id":263,"padre":255,"tipo":"A","caja":{"x":413,"y":73.140625,"w":164.40625,"h":36},"parcial":false},{"id":265,"padre":263,"tipo":"SPAN","caja":{"x":415,"y":77.140625,"w":160.40625,"h":28},"parcial":false},{"id":266,"padre":265,"tipo":"#TEXT","caja":{"x":415,"y":77.140625,"w":160.40625,"h":28},"parcial":false},{"id":269,"padre":255,"tipo":"A","caja":{"x":593.40625,"y":73.140625,"w":108.890625,"h":36},"parcial":false},{"id":271,"padre":269,"tipo":"SPAN","caja":{"x":595.40625,"y":77.140625,"w":104.890625,"h":28},"parcial":false},{"id":272,"padre":271,"tipo":"#TEXT","caja":{"x":595.40625,"y":77.140625,"w":104.890625,"h":28},"parcial":false},{"id":275,"padre":255,"tipo":"A","caja":{"x":718.296875,"y":73.140625,"w":225.015625,"h":36},"parcial":false},{"id":277,"padre":275,"tipo":"SPAN","caja":{"x":720.296875,"y":77.140625,"w":221.015625,"h":28},"parcial":false},{"id":278,"padre":277,"tipo":"#TEXT","caja":{"x":720.296875,"y":77.140625,"w":221.015625,"h":28},"parcial":false},{"id":281,"padre":255,"tipo":"A","caja":{"x":959.3125,"y":73.140625,"w":147.03125,"h":36},"parcial":false},{"id":283,"padre":281,"tipo":"SPAN","caja":{"x":961.3125,"y":77.140625,"w":143.03125,"h":28},"parcial":false},{"id":284,"padre":283,"tipo":"#TEXT","caja":{"x":961.3125,"y":77.140625,"w":143.03125,"h":28},"parcial":false},{"id":289,"padre":234,"tipo":"DIV","caja":{"x":1192.90625,"y":75.140625,"w":191.09375,"h":32},"parcial":false},{"id":291,"padre":289,"tipo":"DIV","caja":{"x":1192.90625,"y":75.140625,"w":191.09375,"h":32},"parcial":false},{"id":293,"padre":291,"tipo":"DIV","caja":{"x":1192.90625,"y":75.140625,"w":94.640625,"h":32},"parcial":false},{"id":295,"padre":293,"tipo":"BUTTON","caja":{"x":1192.90625,"y":75.140625,"w":94.640625,"h":32},"parcial":false},{"id":297,"padre":295,"tipo":"SPAN","caja":{"x":1202.90625,"y":79.140625,"w":20,"h":24},"parcial":false},{"id":298,"padre":297,"tipo":"#TEXT","caja":{"x":1202.90625,"y":79.140625,"w":20,"h":24},"parcial":false},{"id":300,"padre":295,"tipo":"SPAN","caja":{"x":1226.90625,"y":80.140625,"w":50.640625,"h":22},"parcial":false},{"id":301,"padre":300,"tipo":"#TEXT","caja":{"x":1226.90625,"y":80.140625,"w":50.640625,"h":22},"parcial":false},{"id":305,"padre":291,"tipo":"DIV","caja":{"x":1299.546875,"y":75.140625,"w":84.453125,"h":32},"parcial":false},{"id":307,"padre":305,"tipo":"BUTTON","caja":{"x":1299.546875,"y":75.140625,"w":84.453125,"h":32},"parcial":false},{"id":309,"padre":307,"tipo":"SPAN","caja":{"x":1309.546875,"y":79.140625,"w":20,"h":24},"parcial":false},{"id":310,"padre":309,"tipo":"#TEXT","caja":{"x":1309.546875,"y":79.140625,"w":20,"h":24},"parcial":false},{"id":312,"padre":307,"tipo":"SPAN","caja":{"x":1333.546875,"y":80.140625,"w":40.453125,"h":22},"parcial":false},{"id":313,"padre":312,"tipo":"#TEXT","caja":{"x":1333.546875,"y":80.140625,"w":40.453125,"h":22},"parcial":false},{"id":1221,"padre":186,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":1389,"padre":1221,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":1391,"padre":1389,"tipo":"ARTICLE","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":1393,"padre":1391,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":1395,"padre":1393,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":1397,"padre":1395,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":763.140625},"parcial":false},{"id":1399,"padre":1397,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":763.140625},"parcial":false},{"id":1401,"padre":1399,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":763.140625},"parcial":false},{"id":1403,"padre":1401,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":763.140625},"parcial":false},{"id":1405,"padre":1403,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":763.140625},"parcial":false},{"id":1406,"padre":1405,"tipo":"::BEFORE","caja":{"x":0,"y":133.140625,"w":1440,"h":630},"parcial":false},{"id":1426,"padre":1405,"tipo":"DIV","caja":{"x":60,"y":538.140625,"w":1320,"h":169},"parcial":false},{"id":1428,"padre":1426,"tipo":"DIV","caja":{"x":60,"y":538.140625,"w":1320,"h":169},"parcial":false},{"id":1430,"padre":1428,"tipo":"DIV","caja":{"x":60,"y":538.140625,"w":1320,"h":169},"parcial":false},{"id":1432,"padre":1430,"tipo":"DIV","caja":{"x":60,"y":538.140625,"w":605.390625,"h":169},"parcial":false},{"id":1434,"padre":1432,"tipo":"DIV","caja":{"x":60,"y":538.140625,"w":605.390625,"h":169},"parcial":false},{"id":1436,"padre":1434,"tipo":"DIV","caja":{"x":60,"y":538.140625,"w":605.390625,"h":93},"parcial":false},{"id":1438,"padre":1436,"tipo":"H1","caja":{"x":60,"y":538.140625,"w":561.78125,"h":57},"parcial":false},{"id":1439,"padre":1438,"tipo":"#TEXT","caja":{"x":60,"y":538.140625,"w":561.78125,"h":57},"parcial":false},{"id":1441,"padre":1436,"tipo":"SPAN","caja":{"x":60,"y":591.140625,"w":605.390625,"h":40},"parcial":false},{"id":1442,"padre":1441,"tipo":"#TEXT","caja":{"x":60,"y":591.140625,"w":605.390625,"h":40},"parcial":false},{"id":1445,"padre":1434,"tipo":"DIV","caja":{"x":60,"y":655.140625,"w":211,"h":52},"parcial":false},{"id":1447,"padre":1445,"tipo":"DIV","caja":{"x":60,"y":655.140625,"w":211,"h":52},"parcial":false},{"id":1449,"padre":1447,"tipo":"A","caja":{"x":60,"y":655.140625,"w":211,"h":52},"parcial":false},{"id":1451,"padre":1449,"tipo":"SPAN","caja":{"x":84,"y":668.140625,"w":100.25,"h":25},"parcial":false},{"id":1452,"padre":1451,"tipo":"#TEXT","caja":{"x":84,"y":668.140625,"w":100.25,"h":25},"parcial":false},{"id":1454,"padre":1449,"tipo":"SPAN","caja":{"x":227,"y":669.140625,"w":20,"h":24},"parcial":false},{"id":1455,"padre":1454,"tipo":"#TEXT","caja":{"x":227,"y":669.140625,"w":20,"h":24},"parcial":false},{"id":1462,"padre":1430,"tipo":"DIV","caja":{"x":1244,"y":655.140625,"w":136,"h":52},"parcial":false},{"id":1464,"padre":1462,"tipo":"DIV","caja":{"x":1244,"y":655.140625,"w":68,"h":52},"parcial":false},{"id":1466,"padre":1464,"tipo":"BUTTON","caja":{"x":1244,"y":655.140625,"w":68,"h":52},"parcial":false},{"id":1468,"padre":1466,"tipo":"SPAN","caja":{"x":1258,"y":657.140625,"w":40,"h":48},"parcial":false},{"id":1469,"padre":1468,"tipo":"#TEXT","caja":{"x":1258,"y":657.140625,"w":40,"h":48},"parcial":false},{"id":1473,"padre":1462,"tipo":"DIV","caja":{"x":1312,"y":655.140625,"w":68,"h":52},"parcial":false},{"id":1475,"padre":1473,"tipo":"BUTTON","caja":{"x":1312,"y":655.140625,"w":68,"h":52},"parcial":false},{"id":1477,"padre":1475,"tipo":"SPAN","caja":{"x":1326,"y":657.140625,"w":40,"h":48},"parcial":false},{"id":1478,"padre":1477,"tipo":"#TEXT","caja":{"x":1326,"y":657.140625,"w":40,"h":48},"parcial":false},{"id":1491,"padre":1395,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":1493,"padre":1491,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":1495,"padre":1493,"tipo":"DIV","caja":{"x":0,"y":763.140625,"w":1440,"h":136.859375},"parcial":true},{"id":1497,"padre":1495,"tipo":"DIV","caja":{"x":0,"y":0,"w":1380,"h":900},"parcial":true},{"id":1499,"padre":1497,"tipo":"DIV","caja":{"x":0,"y":0,"w":1380,"h":900},"parcial":true},{"id":1501,"padre":1499,"tipo":"DIV","caja":{"x":0,"y":0,"w":1380,"h":900},"parcial":true},{"id":1503,"padre":1501,"tipo":"DIV","caja":{"x":0,"y":0,"w":1380,"h":900},"parcial":true},{"id":1505,"padre":1503,"tipo":"DIV","caja":{"x":0,"y":0,"w":1380,"h":900},"parcial":true},{"id":1507,"padre":1505,"tipo":"DIV","caja":{"x":0,"y":0,"w":1380,"h":900},"parcial":true},{"id":1509,"padre":1507,"tipo":"DIV","caja":{"x":0,"y":0,"w":1380,"h":900},"parcial":true},{"id":1511,"padre":1509,"tipo":"DIV","caja":{"x":60,"y":825.140625,"w":1320,"h":57},"parcial":false},{"id":1514,"padre":1511,"tipo":"#TEXT","caja":{"x":60,"y":825.140625,"w":395.75,"h":57},"parcial":false},{"id":1516,"padre":1511,"tipo":"DIV","caja":{"x":1069.296875,"y":827.140625,"w":310.703125,"h":54},"parcial":false},{"id":1518,"padre":1516,"tipo":"DIV","caja":{"x":1069.296875,"y":827.140625,"w":310.703125,"h":54},"parcial":false},{"id":1520,"padre":1518,"tipo":"A","caja":{"x":1069.296875,"y":827.140625,"w":310.703125,"h":54},"parcial":false},{"id":3030,"padre":186,"tipo":"DIV","caja":{"x":1352,"y":812,"w":48,"h":48},"parcial":false},{"id":3061,"padre":3030,"tipo":"DIV","caja":{"x":1352,"y":812,"w":48,"h":48},"parcial":false},{"id":3063,"padre":3061,"tipo":"BUTTON","caja":{"x":1352,"y":812,"w":48,"h":48},"parcial":false},{"id":3077,"padre":3063,"tipo":"SPAN","caja":{"x":1366,"y":824,"w":20,"h":24},"parcial":false},{"id":3079,"padre":3077,"tipo":"SPAN","caja":{"x":1366,"y":824,"w":20,"h":24},"parcial":false},{"id":3080,"padre":3079,"tipo":"#TEXT","caja":{"x":1366,"y":824,"w":20,"h":24},"parcial":false},{"id":3845,"padre":null,"tipo":"DIV","caja":{"x":12,"y":808,"w":40,"h":40},"parcial":false},{"id":3846,"padre":3845,"tipo":"SVG","caja":{"x":12,"y":808,"w":40,"h":40},"parcial":false},{"id":3851,"padre":160,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false},{"id":3852,"padre":3851,"tipo":"DIV","caja":{"x":0,"y":688.90625,"w":1440,"h":211.09375},"parcial":false},{"id":3853,"padre":3852,"tipo":"DIV","caja":{"x":0,"y":689.90625,"w":1440,"h":138},"parcial":false},{"id":3854,"padre":3853,"tipo":"DIV","caja":{"x":0,"y":689.90625,"w":1440,"h":138},"parcial":false},{"id":3855,"padre":3854,"tipo":"DIV","caja":{"x":0,"y":689.90625,"w":1440,"h":138},"parcial":false},{"id":3856,"padre":3855,"tipo":"DIV","caja":{"x":0,"y":689.90625,"w":1440,"h":138},"parcial":false},{"id":3857,"padre":3856,"tipo":"DIV","caja":{"x":0,"y":689.90625,"w":1440,"h":138},"parcial":false},{"id":3858,"padre":3857,"tipo":"DIV","caja":{"x":24,"y":738.90625,"w":1389.46875,"h":71.5},"parcial":false},{"id":3862,"padre":3858,"tipo":"DIV","caja":{"x":24,"y":738.90625,"w":1389.46875,"h":71.5},"parcial":false},{"id":3863,"padre":3862,"tipo":"DIV","caja":{"x":24,"y":738.90625,"w":1389.46875,"h":71.5},"parcial":false},{"id":3864,"padre":3863,"tipo":"P","caja":{"x":24,"y":738.90625,"w":1389.46875,"h":71.5},"parcial":false},{"id":3865,"padre":3864,"tipo":"B","caja":{"x":24,"y":738.90625,"w":196.84375,"h":19},"parcial":false},{"id":3866,"padre":3865,"tipo":"SPAN","caja":{"x":24,"y":738.90625,"w":196.84375,"h":19},"parcial":false},{"id":3867,"padre":3866,"tipo":"#TEXT","caja":{"x":24,"y":738.90625,"w":196.84375,"h":19},"parcial":false},{"id":3868,"padre":3864,"tipo":"SPAN","caja":{"x":220.84375,"y":738.90625,"w":7.234375,"h":19},"parcial":false},{"id":3869,"padre":3868,"tipo":"#TEXT","caja":{"x":220.84375,"y":738.90625,"w":7.234375,"h":19},"parcial":false},{"id":3870,"padre":3864,"tipo":"#TEXT","caja":{"x":228.078125,"y":738.90625,"w":268.34375,"h":19},"parcial":false},{"id":3871,"padre":3864,"tipo":"SPAN","caja":{"x":496.421875,"y":738.90625,"w":233.9375,"h":19},"parcial":false},{"id":3872,"padre":3871,"tipo":"SPAN","caja":{"x":496.421875,"y":738.90625,"w":233.9375,"h":19},"parcial":false},{"id":3873,"padre":3872,"tipo":"SPAN","caja":{"x":496.421875,"y":738.90625,"w":233.9375,"h":19},"parcial":false},{"id":3874,"padre":3873,"tipo":"#TEXT","caja":{"x":496.421875,"y":738.90625,"w":233.9375,"h":19},"parcial":false},{"id":3875,"padre":3864,"tipo":"#TEXT","caja":{"x":24,"y":738.90625,"w":1389.46875,"h":71.5},"parcial":false},{"id":3876,"padre":3864,"tipo":"A","caja":{"x":74.765625,"y":791.40625,"w":266,"h":19},"parcial":false},{"id":3877,"padre":3876,"tipo":"SPAN","caja":{"x":74.765625,"y":791.40625,"w":266,"h":19},"parcial":false},{"id":3878,"padre":3877,"tipo":"#TEXT","caja":{"x":74.765625,"y":791.40625,"w":266,"h":19},"parcial":false},{"id":3881,"padre":3852,"tipo":"DIV","caja":{"x":0,"y":827.90625,"w":1440,"h":72.09375},"parcial":false},{"id":3882,"padre":3881,"tipo":"DIV","caja":{"x":24,"y":835.90625,"w":1392,"h":40.09375},"parcial":false},{"id":3883,"padre":3882,"tipo":"DIV","caja":{"x":24,"y":835.90625,"w":1392,"h":40.09375},"parcial":false},{"id":3884,"padre":3883,"tipo":"DIV","caja":{"x":24,"y":842.734375,"w":229.203125,"h":16},"parcial":false},{"id":3885,"padre":3884,"tipo":"DIV","caja":{"x":24,"y":842.734375,"w":229.203125,"h":16},"parcial":false},{"id":3886,"padre":3885,"tipo":"DIV","caja":{"x":24,"y":842.734375,"w":229.203125,"h":16},"parcial":false},{"id":3887,"padre":3886,"tipo":"A","caja":{"x":24,"y":842.734375,"w":229.203125,"h":16},"parcial":false},{"id":3888,"padre":3887,"tipo":"#TEXT","caja":{"x":24,"y":842.734375,"w":229.203125,"h":16},"parcial":false},{"id":3890,"padre":3883,"tipo":"DIV","caja":{"x":534.78125,"y":835.90625,"w":881.21875,"h":40.09375},"parcial":false},{"id":3891,"padre":3890,"tipo":"DIV","caja":{"x":534.78125,"y":835.90625,"w":881.21875,"h":40.09375},"parcial":false},{"id":3892,"padre":3891,"tipo":"BUTTON","caja":{"x":534.78125,"y":835.90625,"w":285.75,"h":40.09375},"parcial":false},{"id":3893,"padre":3892,"tipo":"#TEXT","caja":{"x":637.703125,"y":845.90625,"w":79.90625,"h":19},"parcial":false},{"id":3894,"padre":3891,"tipo":"BUTTON","caja":{"x":832.53125,"y":835.90625,"w":285.734375,"h":40.09375},"parcial":false},{"id":3895,"padre":3894,"tipo":"#TEXT","caja":{"x":947.53125,"y":845.90625,"w":55.71875,"h":19},"parcial":false},{"id":3896,"padre":3891,"tipo":"BUTTON","caja":{"x":1130.265625,"y":835.90625,"w":285.734375,"h":40.09375},"parcial":false},{"id":3897,"padre":3896,"tipo":"#TEXT","caja":{"x":1229.921875,"y":845.90625,"w":86.421875,"h":19},"parcial":false}],"g3_parentesco":[[0,null],[2,0],[160,2],[184,160],[186,160],[188,186],[190,188],[193,190],[195,190],[197,195],[199,197],[203,199],[205,203],[206,205],[208,199],[209,199],[210,209],[217,186],[219,217],[221,219],[234,219],[236,234],[238,236],[240,238],[242,240],[244,242],[250,234],[252,250],[253,252],[255,250],[257,255],[259,257],[260,259],[263,255],[265,263],[266,265],[269,255],[271,269],[272,271],[275,255],[277,275],[278,277],[281,255],[283,281],[284,283],[289,234],[291,289],[293,291],[295,293],[297,295],[298,297],[300,295],[301,300],[305,291],[307,305],[309,307],[310,309],[312,307],[313,312],[1221,186],[1389,1221],[1391,1389],[1393,1391],[1395,1393],[1397,1395],[1399,1397],[1401,1399],[1403,1401],[1405,1403],[1406,1405],[1426,1405],[1428,1426],[1430,1428],[1432,1430],[1434,1432],[1436,1434],[1438,1436],[1439,1438],[1441,1436],[1442,1441],[1445,1434],[1447,1445],[1449,1447],[1451,1449],[1452,1451],[1454,1449],[1455,1454],[1462,1430],[1464,1462],[1466,1464],[1468,1466],[1469,1468],[1473,1462],[1475,1473],[1477,1475],[1478,1477],[1491,1395],[1493,1491],[1495,1493],[1497,1495],[1499,1497],[1501,1499],[1503,1501],[1505,1503],[1507,1505],[1509,1507],[1511,1509],[1514,1511],[1516,1511],[1518,1516],[1520,1518],[3030,186],[3061,3030],[3063,3061],[3077,3063],[3079,3077],[3080,3079],[3845,null],[3846,3845],[3847,3846],[3848,3846],[3851,160],[3852,3851],[3853,3852],[3854,3853],[3855,3854],[3856,3855],[3857,3856],[3858,3857],[3860,3858],[3862,3858],[3863,3862],[3864,3863],[3865,3864],[3866,3865],[3867,3866],[3868,3864],[3869,3868],[3870,3864],[3871,3864],[3872,3871],[3873,3872],[3874,3873],[3875,3864],[3876,3864],[3877,3876],[3878,3877],[3881,3852],[3882,3881],[3883,3882],[3884,3883],[3885,3884],[3886,3885],[3887,3886],[3888,3887],[3890,3883],[3891,3890],[3892,3891],[3893,3892],[3894,3891],[3895,3894],[3896,3891],[3897,3896]],"g3_limites":["Solo se registra la porción con tinta que intersecta el viewport; una caja visible no certifica ausencia de oclusión.","Unidades y bloques son candidatos estructurales, no unidades semánticas confirmadas. No se cuentan DIV/SPAN transparentes como unidades.","Se conservan todas las regiones y unidades candidatas; un árbol retenido puede omitir ancestros. No reconstruir cajas ni contenido ausente.","Encabezados semánticos H1-H6/role=heading son evidencia parcial; los títulos visuales requieren screenshot.","La pertenencia a la tarea, coherencia, datos requeridos y contenido ajeno requieren lectura de screenshot. La comparación entre canales no es limpia."],"g3_criterios_con_lectura_de_texto":["U","H","V","X"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g3"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["U","segmentacion","B","H","V","X","ninguna","carga_extrinseca_estructural",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","region_id","region_justification","unidades_ids","U","B","H","V","X","blocks","bloques","X_ids","X_compite","X_area_mayor","V_evidencia_ids","segmentacion","difiere_contenido","mejora_ids","inventario_completo"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"region_id":{"type":["integer","null"]},"region_justification":{"type":"string"},"unidades_ids":{"type":"array","items":{"type":"integer"}},"U":{"type":["integer","null"],"minimum":0},"B":{"type":["integer","null"],"minimum":0},"H":{"type":["integer","null"],"minimum":0},"V":{"type":["boolean","null"]},"X":{"type":["integer","null"],"minimum":0},"blocks":{"type":["integer","null"],"minimum":0},"bloques":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","unidades_ids","encabezado_id","mezcla"],"properties":{"id":{"type":"integer"},"unidades_ids":{"type":"array","items":{"type":"integer"}},"encabezado_id":{"type":["integer","null"]},"mezcla":{"type":["boolean","null"]}}}},"X_ids":{"type":"array","items":{"type":"integer"}},"X_compite":{"type":["boolean","null"]},"X_area_mayor":{"type":["boolean","null"]},"V_evidencia_ids":{"type":"array","items":{"type":"integer"}},"segmentacion":{"enum":["ausente","debil","encabezada","indeterminada"],"type":"string"},"difiere_contenido":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}},"inventario_completo":{"type":"boolean"}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"con_advertencias","integridad_ok":true,"capas_sin_resolver":true,"advertencias":["Los nodos guardados incluyen un posible diálogo visible (3851). Confirmar en la imagen si tapa contenido.","La imagen guardada tiene una franja de cookies que cubre la parte inferior de la portada. El registro antiguo la marcó como limpia; conservar la advertencia sin cambiar la imagen.","Queda una capa o un aviso sin resolver. No presentar la página como despejada.","El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"dc3727f6a61912b1ef1fc02328917c1cc65d22a2a9f7f392dfcf7ae7b57003dc","wireframe":"c5211f6c7ea8a3cc9b89a3055265b5e1e0a61d3d361c83b928586b5b916463f0"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.