# Ejecución 1.0.0

Evalúa solo G3, captura captures/H10.

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
{"pagina":{"id":"H10","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:16:50.359Z","sanity_ok":null,"consent_limpio":null},"group_id":"g3","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g3":{"g3_region_tarea":{"id":2076,"padre":238,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"unidades_ids":[2138,2141,2144,2148,2150,2156,2195],"fraccion_viewport":1},"g3_region_candidatas":[{"id":2076,"padre":238,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"unidades_ids":[2138,2141,2144,2148,2150,2156,2195],"fraccion_viewport":1}],"g3_U_candidatas":7,"g3_unidades":[{"id":2138,"padre":2137,"tipo":"CANVAS","caja":{"x":0,"y":137.015625,"w":1440,"h":635},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":2141,"padre":2129,"tipo":"SR7-SHP","caja":{"x":0,"y":719.015625,"w":1440,"h":180.984375},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":2144,"padre":2143,"tipo":"A","caja":{"x":101,"y":695.015625,"w":140.84375,"h":38},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":2148,"padre":2147,"tipo":"#TEXT","caja":{"x":100,"y":618.015625,"w":373.1875,"h":49},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":2150,"padre":2143,"tipo":"H1","caja":{"x":102,"y":490.015625,"w":536.578125,"h":113},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":2156,"padre":2129,"tipo":"SR7-IMG","caja":{"x":98,"y":193.015625,"w":400,"h":137},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":2195,"padre":2127,"tipo":"CANVAS","caja":{"x":0,"y":767.015625,"w":1440,"h":5},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"}],"g3_B_mayor":0,"g3_tablas":[],"g3_pegajosos":[{"id":246,"padre":243,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":137.015625},"parcial":false,"position":"fixed"},{"id":4069,"padre":238,"tipo":"DIV","caja":{"x":1360,"y":785.203125,"w":50,"h":50},"parcial":false,"position":"fixed"}],"g3_encabezados":[{"id":2150,"padre":2143,"tipo":"H1","caja":{"x":102,"y":490.015625,"w":536.578125,"h":113},"parcial":false}],"g3_nodos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false},{"id":2,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":238,"padre":2,"tipo":"BODY","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":243,"padre":238,"tipo":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":137.015625},"parcial":true},{"id":246,"padre":243,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":137.015625},"parcial":false},{"id":248,"padre":246,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":137.015625},"parcial":true},{"id":250,"padre":248,"tipo":"DIV","caja":{"x":0,"y":0,"w":1385.046875,"h":64.828125},"parcial":true},{"id":252,"padre":250,"tipo":"DIV","caja":{"x":56.953125,"y":0,"w":1328.09375,"h":64.828125},"parcial":false},{"id":254,"padre":252,"tipo":"DIV","caja":{"x":56.953125,"y":10,"w":265.609375,"h":44.828125},"parcial":false},{"id":256,"padre":254,"tipo":"DIV","caja":{"x":56.953125,"y":10,"w":265.609375,"h":44.828125},"parcial":false},{"id":258,"padre":256,"tipo":"A","caja":{"x":56.953125,"y":10,"w":265.609375,"h":44.828125},"parcial":false},{"id":260,"padre":258,"tipo":"IMG","caja":{"x":56.953125,"y":10,"w":265.609375,"h":44.828125},"parcial":false},{"id":265,"padre":252,"tipo":"DIV","caja":{"x":0,"y":0,"w":1385.046875,"h":52.5},"parcial":true},{"id":267,"padre":265,"tipo":"DIV","caja":{"x":0,"y":0,"w":1232.890625,"h":41.5},"parcial":true},{"id":269,"padre":267,"tipo":"NAV","caja":{"x":0,"y":0,"w":1232.890625,"h":41.5},"parcial":true},{"id":286,"padre":269,"tipo":"DIV","caja":{"x":0,"y":0,"w":1232.890625,"h":41.5},"parcial":true},{"id":288,"padre":286,"tipo":"UL","caja":{"x":0,"y":0,"w":1232.890625,"h":41.5},"parcial":true},{"id":290,"padre":288,"tipo":"LI","caja":{"x":0,"y":0,"w":738.96875,"h":41.5},"parcial":true},{"id":292,"padre":290,"tipo":"DIV","caja":{"x":0,"y":0,"w":738.96875,"h":41.5},"parcial":true},{"id":293,"padre":292,"tipo":"::AFTER","caja":{"x":582.421875,"y":26.421875,"w":2,"h":11.953125},"parcial":false},{"id":295,"padre":292,"tipo":"DIV","caja":{"x":421.765625,"y":23.3125,"w":140.65625,"h":18},"parcial":false},{"id":297,"padre":295,"tipo":"SPAN","caja":{"x":546.421875,"y":24.40625,"w":16,"h":16},"parcial":false},{"id":300,"padre":null,"tipo":"SVG","caja":{"x":546.421875,"y":16.40625,"w":16,"h":16},"parcial":false},{"id":303,"padre":297,"tipo":"SPAN","caja":{"x":546.421875,"y":24.40625,"w":16,"h":16},"parcial":false},{"id":304,"padre":303,"tipo":"SVG","caja":{"x":546.421875,"y":24.40625,"w":16,"h":16},"parcial":false},{"id":308,"padre":295,"tipo":"SPAN","caja":{"x":421.765625,"y":23.3125,"w":119.65625,"h":18},"parcial":false},{"id":309,"padre":308,"tipo":"#TEXT","caja":{"x":421.765625,"y":23.3125,"w":119.65625,"h":18},"parcial":false},{"id":379,"padre":288,"tipo":"LI","caja":{"x":0,"y":0,"w":665.578125,"h":41.3125},"parcial":false},{"id":381,"padre":379,"tipo":"DIV","caja":{"x":0,"y":0,"w":665.578125,"h":41.3125},"parcial":false},{"id":382,"padre":381,"tipo":"::AFTER","caja":{"x":663.578125,"y":26.421875,"w":2,"h":11.953125},"parcial":false},{"id":384,"padre":381,"tipo":"A","caja":{"x":599.421875,"y":23.3125,"w":49.15625,"h":18},"parcial":false},{"id":386,"padre":384,"tipo":"SPAN","caja":{"x":599.421875,"y":23.3125,"w":49.15625,"h":18},"parcial":false},{"id":387,"padre":386,"tipo":"#TEXT","caja":{"x":599.421875,"y":23.3125,"w":49.15625,"h":18},"parcial":false},{"id":392,"padre":288,"tipo":"LI","caja":{"x":0,"y":0,"w":772.5,"h":41.3125},"parcial":false},{"id":394,"padre":392,"tipo":"DIV","caja":{"x":0,"y":0,"w":772.5,"h":41.3125},"parcial":false},{"id":395,"padre":394,"tipo":"::AFTER","caja":{"x":770.5,"y":26.421875,"w":2,"h":11.953125},"parcial":false},{"id":397,"padre":394,"tipo":"A","caja":{"x":680.578125,"y":23.3125,"w":74.921875,"h":18},"parcial":false},{"id":399,"padre":397,"tipo":"SPAN","caja":{"x":680.578125,"y":23.3125,"w":74.921875,"h":18},"parcial":false},{"id":400,"padre":399,"tipo":"#TEXT","caja":{"x":680.578125,"y":23.3125,"w":74.921875,"h":18},"parcial":false},{"id":405,"padre":288,"tipo":"LI","caja":{"x":787.5,"y":0,"w":445.390625,"h":41.5},"parcial":true},{"id":407,"padre":405,"tipo":"DIV","caja":{"x":787.5,"y":0,"w":445.390625,"h":41.5},"parcial":true},{"id":409,"padre":407,"tipo":"DIV","caja":{"x":787.5,"y":23.3125,"w":201.9375,"h":18},"parcial":false},{"id":411,"padre":409,"tipo":"SPAN","caja":{"x":973.4375,"y":24.40625,"w":16,"h":16},"parcial":false},{"id":414,"padre":null,"tipo":"SVG","caja":{"x":973.4375,"y":16.40625,"w":16,"h":16},"parcial":false},{"id":417,"padre":411,"tipo":"SPAN","caja":{"x":973.4375,"y":24.40625,"w":16,"h":16},"parcial":false},{"id":418,"padre":417,"tipo":"SVG","caja":{"x":973.4375,"y":24.40625,"w":16,"h":16},"parcial":false},{"id":422,"padre":409,"tipo":"SPAN","caja":{"x":787.5,"y":23.3125,"w":180.9375,"h":18},"parcial":false},{"id":423,"padre":422,"tipo":"#TEXT","caja":{"x":787.5,"y":23.3125,"w":180.9375,"h":18},"parcial":false},{"id":480,"padre":265,"tipo":"DIV","caja":{"x":1026.4375,"y":0,"w":247,"h":52.5},"parcial":true},{"id":482,"padre":480,"tipo":"DIV","caja":{"x":1026.4375,"y":0,"w":247,"h":52.5},"parcial":true},{"id":484,"padre":482,"tipo":"DIV","caja":{"x":1026.4375,"y":0,"w":247,"h":52.5},"parcial":true},{"id":486,"padre":484,"tipo":"DIV","caja":{"x":1026.4375,"y":0,"w":247,"h":52.5},"parcial":true},{"id":487,"padre":486,"tipo":"FORM","caja":{"x":1026.4375,"y":12.3125,"w":247,"h":40.1875},"parcial":false},{"id":489,"padre":487,"tipo":"DIV","caja":{"x":1027.4375,"y":0,"w":190,"h":50.5},"parcial":true},{"id":491,"padre":489,"tipo":"DIV","caja":{"x":1027.4375,"y":0,"w":190,"h":50.5},"parcial":true},{"id":496,"padre":491,"tipo":"INPUT","caja":{"x":1028.4375,"y":14.3125,"w":189,"h":36.1875},"parcial":false},{"id":502,"padre":487,"tipo":"BUTTON","caja":{"x":1227.4375,"y":15.40625,"w":44,"h":34},"parcial":false},{"id":503,"padre":502,"tipo":"SPAN","caja":{"x":1242.4375,"y":25.40625,"w":14,"h":14},"parcial":false},{"id":504,"padre":503,"tipo":"SVG","caja":{"x":1242.4375,"y":25.40625,"w":14,"h":14},"parcial":false},{"id":534,"padre":265,"tipo":"DIV","caja":{"x":0,"y":0,"w":1385.046875,"h":47.40625},"parcial":false},{"id":536,"padre":534,"tipo":"DIV","caja":{"x":0,"y":0,"w":1385.046875,"h":47.40625},"parcial":false},{"id":538,"padre":536,"tipo":"DIV","caja":{"x":0,"y":0,"w":1385.046875,"h":47.40625},"parcial":false},{"id":540,"padre":538,"tipo":"DIV","caja":{"x":0,"y":0,"w":1385.046875,"h":47.40625},"parcial":false},{"id":542,"padre":540,"tipo":"UL","caja":{"x":0,"y":0,"w":1385.046875,"h":47.40625},"parcial":false},{"id":544,"padre":542,"tipo":"LI","caja":{"x":0,"y":0,"w":1385.046875,"h":47.40625},"parcial":false},{"id":546,"padre":544,"tipo":"A","caja":{"x":1289.4375,"y":17.40625,"w":95.609375,"h":30},"parcial":false},{"id":547,"padre":546,"tipo":"::AFTER","caja":{"x":1364.046875,"y":29.59375,"w":10,"h":13},"parcial":false},{"id":549,"padre":546,"tipo":"SPAN","caja":{"x":1300.4375,"y":22.40625,"w":24.296875,"h":21},"parcial":false},{"id":550,"padre":549,"tipo":"#TEXT","caja":{"x":1300.4375,"y":22.40625,"w":24.296875,"h":21},"parcial":false},{"id":572,"padre":248,"tipo":"DIV","caja":{"x":2,"y":80.828125,"w":1438,"h":56.1875},"parcial":false},{"id":574,"padre":572,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":127.015625},"parcial":true},{"id":576,"padre":574,"tipo":"DIV","caja":{"x":0,"y":0,"w":1055.09375,"h":118.015625},"parcial":true},{"id":578,"padre":576,"tipo":"DIV","caja":{"x":0,"y":0,"w":1055.09375,"h":118.015625},"parcial":true},{"id":580,"padre":578,"tipo":"NAV","caja":{"x":0,"y":0,"w":1055.09375,"h":118.015625},"parcial":true},{"id":597,"padre":580,"tipo":"DIV","caja":{"x":0,"y":0,"w":1055.09375,"h":118.015625},"parcial":true},{"id":599,"padre":597,"tipo":"UL","caja":{"x":0,"y":0,"w":1055.09375,"h":118.015625},"parcial":true},{"id":601,"padre":599,"tipo":"LI","caja":{"x":0,"y":0,"w":306.25,"h":118.015625},"parcial":true},{"id":603,"padre":601,"tipo":"DIV","caja":{"x":0,"y":0,"w":306.25,"h":118.015625},"parcial":true},{"id":604,"padre":603,"tipo":"::AFTER","caja":{"x":193.984375,"y":102.9375,"w":2,"h":11.953125},"parcial":false},{"id":606,"padre":603,"tipo":"DIV","caja":{"x":72.953125,"y":99.828125,"w":101.03125,"h":18},"parcial":false},{"id":608,"padre":606,"tipo":"SPAN","caja":{"x":157.984375,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":611,"padre":null,"tipo":"SVG","caja":{"x":157.984375,"y":92.921875,"w":16,"h":16},"parcial":false},{"id":614,"padre":608,"tipo":"SPAN","caja":{"x":157.984375,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":615,"padre":614,"tipo":"SVG","caja":{"x":157.984375,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":619,"padre":606,"tipo":"SPAN","caja":{"x":72.953125,"y":99.828125,"w":80.03125,"h":18},"parcial":false},{"id":620,"padre":619,"tipo":"#TEXT","caja":{"x":72.953125,"y":99.828125,"w":80.03125,"h":18},"parcial":false},{"id":704,"padre":599,"tipo":"LI","caja":{"x":0,"y":0,"w":392.546875,"h":117.828125},"parcial":false},{"id":706,"padre":704,"tipo":"DIV","caja":{"x":0,"y":0,"w":392.546875,"h":117.828125},"parcial":false},{"id":707,"padre":706,"tipo":"::AFTER","caja":{"x":390.546875,"y":102.9375,"w":2,"h":11.953125},"parcial":false},{"id":709,"padre":706,"tipo":"A","caja":{"x":210.984375,"y":99.828125,"w":164.5625,"h":18},"parcial":false},{"id":711,"padre":709,"tipo":"SPAN","caja":{"x":210.984375,"y":99.828125,"w":164.5625,"h":18},"parcial":false},{"id":712,"padre":711,"tipo":"#TEXT","caja":{"x":210.984375,"y":99.828125,"w":164.5625,"h":18},"parcial":false},{"id":717,"padre":599,"tipo":"LI","caja":{"x":0,"y":0,"w":781.046875,"h":118.015625},"parcial":true},{"id":719,"padre":717,"tipo":"DIV","caja":{"x":0,"y":0,"w":781.046875,"h":118.015625},"parcial":true},{"id":720,"padre":719,"tipo":"::AFTER","caja":{"x":596.265625,"y":102.9375,"w":2,"h":11.953125},"parcial":false},{"id":722,"padre":719,"tipo":"DIV","caja":{"x":407.546875,"y":99.828125,"w":168.71875,"h":18},"parcial":false},{"id":724,"padre":722,"tipo":"SPAN","caja":{"x":560.265625,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":727,"padre":null,"tipo":"SVG","caja":{"x":560.265625,"y":92.921875,"w":16,"h":16},"parcial":false},{"id":730,"padre":724,"tipo":"SPAN","caja":{"x":560.265625,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":731,"padre":730,"tipo":"SVG","caja":{"x":560.265625,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":735,"padre":722,"tipo":"SPAN","caja":{"x":407.546875,"y":99.828125,"w":147.71875,"h":18},"parcial":false},{"id":736,"padre":735,"tipo":"#TEXT","caja":{"x":407.546875,"y":99.828125,"w":147.71875,"h":18},"parcial":false},{"id":835,"padre":599,"tipo":"LI","caja":{"x":613.265625,"y":0,"w":441.828125,"h":118.015625},"parcial":true},{"id":837,"padre":835,"tipo":"DIV","caja":{"x":613.265625,"y":0,"w":441.828125,"h":118.015625},"parcial":true},{"id":839,"padre":837,"tipo":"DIV","caja":{"x":613.265625,"y":99.828125,"w":201.703125,"h":18},"parcial":false},{"id":841,"padre":839,"tipo":"SPAN","caja":{"x":798.96875,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":844,"padre":null,"tipo":"SVG","caja":{"x":798.96875,"y":92.921875,"w":16,"h":16},"parcial":false},{"id":847,"padre":841,"tipo":"SPAN","caja":{"x":798.96875,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":848,"padre":847,"tipo":"SVG","caja":{"x":798.96875,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":852,"padre":839,"tipo":"SPAN","caja":{"x":613.265625,"y":99.828125,"w":180.703125,"h":18},"parcial":false},{"id":853,"padre":852,"tipo":"#TEXT","caja":{"x":613.265625,"y":99.828125,"w":180.703125,"h":18},"parcial":false},{"id":914,"padre":574,"tipo":"DIV","caja":{"x":1046.96875,"y":0,"w":393.03125,"h":127.015625},"parcial":true},{"id":916,"padre":914,"tipo":"DIV","caja":{"x":1046.96875,"y":0,"w":393.03125,"h":127.015625},"parcial":true},{"id":918,"padre":916,"tipo":"NAV","caja":{"x":1046.96875,"y":0,"w":393.03125,"h":127.015625},"parcial":true},{"id":935,"padre":918,"tipo":"DIV","caja":{"x":1046.96875,"y":0,"w":393.03125,"h":127.015625},"parcial":true},{"id":937,"padre":935,"tipo":"UL","caja":{"x":1046.96875,"y":0,"w":393.03125,"h":127.015625},"parcial":true},{"id":939,"padre":937,"tipo":"LI","caja":{"x":1046.96875,"y":0,"w":276.796875,"h":127.015625},"parcial":true},{"id":941,"padre":939,"tipo":"DIV","caja":{"x":1046.96875,"y":90.828125,"w":152.828125,"h":36.1875},"parcial":false},{"id":943,"padre":941,"tipo":"DIV","caja":{"x":1063.96875,"y":99.828125,"w":113.828125,"h":18},"parcial":false},{"id":945,"padre":943,"tipo":"SPAN","caja":{"x":1161.796875,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":948,"padre":null,"tipo":"SVG","caja":{"x":1161.796875,"y":92.921875,"w":16,"h":16},"parcial":false},{"id":951,"padre":945,"tipo":"SPAN","caja":{"x":1161.796875,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":952,"padre":951,"tipo":"SVG","caja":{"x":1161.796875,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":956,"padre":943,"tipo":"SPAN","caja":{"x":1063.96875,"y":99.828125,"w":92.828125,"h":18},"parcial":false},{"id":957,"padre":956,"tipo":"#TEXT","caja":{"x":1063.96875,"y":99.828125,"w":92.828125,"h":18},"parcial":false},{"id":1010,"padre":937,"tipo":"LI","caja":{"x":1220.796875,"y":0,"w":219.203125,"h":127.015625},"parcial":true},{"id":1012,"padre":1010,"tipo":"DIV","caja":{"x":1220.796875,"y":90.828125,"w":164.25,"h":36.1875},"parcial":false},{"id":1014,"padre":1012,"tipo":"DIV","caja":{"x":1237.796875,"y":99.828125,"w":125.25,"h":18},"parcial":false},{"id":1016,"padre":1014,"tipo":"SPAN","caja":{"x":1347.046875,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":1019,"padre":null,"tipo":"SVG","caja":{"x":1347.046875,"y":92.921875,"w":16,"h":16},"parcial":false},{"id":1022,"padre":1016,"tipo":"SPAN","caja":{"x":1347.046875,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":1023,"padre":1022,"tipo":"SVG","caja":{"x":1347.046875,"y":100.921875,"w":16,"h":16},"parcial":false},{"id":1027,"padre":1014,"tipo":"SPAN","caja":{"x":1237.796875,"y":99.828125,"w":104.25,"h":18},"parcial":false},{"id":1029,"padre":1027,"tipo":"IMG","caja":{"x":1237.796875,"y":100.921875,"w":20,"h":16},"parcial":false},{"id":1030,"padre":1027,"tipo":"#TEXT","caja":{"x":1267.796875,"y":99.828125,"w":74.25,"h":18},"parcial":false},{"id":2076,"padre":238,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":2116,"padre":2076,"tipo":"DIV","caja":{"x":0,"y":137.015625,"w":1440,"h":762.984375},"parcial":true},{"id":2118,"padre":2116,"tipo":"DIV","caja":{"x":0,"y":137.015625,"w":1440,"h":762.984375},"parcial":true},{"id":2120,"padre":2118,"tipo":"DIV","caja":{"x":0,"y":137.015625,"w":1440,"h":762.984375},"parcial":true},{"id":2123,"padre":2120,"tipo":"SR7-MODULE","caja":{"x":0,"y":137.015625,"w":1440,"h":762.984375},"parcial":true},{"id":2127,"padre":2123,"tipo":"SR7-CONTENT","caja":{"x":0,"y":137.015625,"w":1440,"h":762.984375},"parcial":true},{"id":2129,"padre":2127,"tipo":"SR7-SLIDE","caja":{"x":0,"y":137.015625,"w":1440,"h":762.984375},"parcial":true},{"id":2136,"padre":2129,"tipo":"SR7-MASK","caja":{"x":0,"y":137.015625,"w":1440,"h":635},"parcial":false},{"id":2137,"padre":2136,"tipo":"SR7-BG","caja":{"x":0,"y":137.015625,"w":1440,"h":635},"parcial":false},{"id":2138,"padre":2137,"tipo":"CANVAS","caja":{"x":0,"y":137.015625,"w":1440,"h":635},"parcial":false},{"id":2141,"padre":2129,"tipo":"SR7-SHP","caja":{"x":0,"y":719.015625,"w":1440,"h":180.984375},"parcial":true},{"id":2143,"padre":2129,"tipo":"SR7-GRP","caja":{"x":100,"y":490.015625,"w":538.578125,"h":243},"parcial":false},{"id":2144,"padre":2143,"tipo":"A","caja":{"x":101,"y":695.015625,"w":140.84375,"h":38},"parcial":false},{"id":2145,"padre":2144,"tipo":"#TEXT","caja":{"x":125,"y":704.015625,"w":92.84375,"h":19},"parcial":false},{"id":2147,"padre":2143,"tipo":"SR7-TXT","caja":{"x":100,"y":618.015625,"w":373.1875,"h":49},"parcial":false},{"id":2148,"padre":2147,"tipo":"#TEXT","caja":{"x":100,"y":618.015625,"w":373.1875,"h":49},"parcial":false},{"id":2150,"padre":2143,"tipo":"H1","caja":{"x":102,"y":490.015625,"w":536.578125,"h":113},"parcial":false},{"id":2151,"padre":2150,"tipo":"#TEXT","caja":{"x":102,"y":490.015625,"w":526.078125,"h":61},"parcial":false},{"id":2154,"padre":2150,"tipo":"B","caja":{"x":102,"y":542.015625,"w":536.578125,"h":61},"parcial":false},{"id":2155,"padre":2154,"tipo":"#TEXT","caja":{"x":102,"y":542.015625,"w":536.578125,"h":61},"parcial":false},{"id":2156,"padre":2129,"tipo":"SR7-IMG","caja":{"x":98,"y":193.015625,"w":400,"h":137},"parcial":false},{"id":2191,"padre":2127,"tipo":"SR7-ARROW","caja":{"x":48.015625,"y":438.515625,"w":13.953125,"h":31},"parcial":false},{"id":2192,"padre":2191,"tipo":"::BEFORE","caja":{"x":48.015625,"y":438.515625,"w":13.953125,"h":31},"parcial":false},{"id":2193,"padre":2127,"tipo":"SR7-ARROW","caja":{"x":1378.015625,"y":437.515625,"w":13.953125,"h":31},"parcial":false},{"id":2194,"padre":2193,"tipo":"::BEFORE","caja":{"x":1378.015625,"y":437.515625,"w":13.953125,"h":31},"parcial":false},{"id":2195,"padre":2127,"tipo":"CANVAS","caja":{"x":0,"y":767.015625,"w":1440,"h":5},"parcial":false},{"id":2208,"padre":2076,"tipo":"B","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":2210,"padre":2208,"tipo":"DIV","caja":{"x":0,"y":0,"w":1401,"h":900},"parcial":true},{"id":2212,"padre":2210,"tipo":"DIV","caja":{"x":0,"y":0,"w":1401,"h":900},"parcial":true},{"id":4069,"padre":238,"tipo":"DIV","caja":{"x":1360,"y":785.203125,"w":50,"h":50},"parcial":false},{"id":4073,"padre":null,"tipo":"A","caja":{"x":1158.15625,"y":788.84375,"w":213.84375,"h":47.5},"parcial":false},{"id":4075,"padre":4073,"tipo":"SPAN","caja":{"x":1184.15625,"y":802.84375,"w":161.84375,"h":19},"parcial":false},{"id":4077,"padre":4075,"tipo":"SPAN","caja":{"x":1184.15625,"y":802.84375,"w":161.84375,"h":19},"parcial":false},{"id":4078,"padre":4077,"tipo":"#TEXT","caja":{"x":1184.15625,"y":802.84375,"w":161.84375,"h":19},"parcial":false},{"id":4083,"padre":4069,"tipo":"DIV","caja":{"x":1360,"y":785.203125,"w":50,"h":50},"parcial":false},{"id":4085,"padre":4083,"tipo":"DIV","caja":{"x":1360,"y":785.203125,"w":50,"h":50},"parcial":false},{"id":4087,"padre":4085,"tipo":"A","caja":{"x":1360,"y":785.203125,"w":50,"h":50},"parcial":false},{"id":4089,"padre":4087,"tipo":"SVG","caja":{"x":1360,"y":785.203125,"w":50,"h":50},"parcial":false}],"g3_parentesco":[[0,null],[2,0],[238,2],[243,238],[246,243],[248,246],[250,248],[252,250],[254,252],[256,254],[258,256],[260,258],[265,252],[267,265],[269,267],[286,269],[288,286],[290,288],[292,290],[293,292],[295,292],[297,295],[300,null],[301,300],[303,297],[304,303],[305,304],[308,295],[309,308],[379,288],[381,379],[382,381],[384,381],[386,384],[387,386],[392,288],[394,392],[395,394],[397,394],[399,397],[400,399],[405,288],[407,405],[409,407],[411,409],[414,null],[415,414],[417,411],[418,417],[419,418],[422,409],[423,422],[480,265],[482,480],[484,482],[486,484],[487,486],[489,487],[491,489],[496,491],[502,487],[503,502],[504,503],[505,504],[534,265],[536,534],[538,536],[540,538],[542,540],[544,542],[546,544],[547,546],[549,546],[550,549],[572,248],[574,572],[576,574],[578,576],[580,578],[597,580],[599,597],[601,599],[603,601],[604,603],[606,603],[608,606],[611,null],[612,611],[614,608],[615,614],[616,615],[619,606],[620,619],[704,599],[706,704],[707,706],[709,706],[711,709],[712,711],[717,599],[719,717],[720,719],[722,719],[724,722],[727,null],[728,727],[730,724],[731,730],[732,731],[735,722],[736,735],[835,599],[837,835],[839,837],[841,839],[844,null],[845,844],[847,841],[848,847],[849,848],[852,839],[853,852],[914,574],[916,914],[918,916],[935,918],[937,935],[939,937],[941,939],[943,941],[945,943],[948,null],[949,948],[951,945],[952,951],[953,952],[956,943],[957,956],[1010,937],[1012,1010],[1014,1012],[1016,1014],[1019,null],[1020,1019],[1022,1016],[1023,1022],[1024,1023],[1027,1014],[1029,1027],[1030,1027],[2076,238],[2116,2076],[2118,2116],[2120,2118],[2123,2120],[2127,2123],[2129,2127],[2136,2129],[2137,2136],[2138,2137],[2141,2129],[2143,2129],[2144,2143],[2145,2144],[2147,2143],[2148,2147],[2150,2143],[2151,2150],[2154,2150],[2155,2154],[2156,2129],[2187,2127],[2191,2127],[2192,2191],[2192,2191],[2193,2127],[2194,2193],[2194,2193],[2195,2127],[2208,2076],[2210,2208],[2212,2210],[4069,238],[4073,null],[4075,4073],[4077,4075],[4078,4077],[4083,4069],[4085,4083],[4087,4085],[4089,4087],[4090,4089],[4091,4089],[4092,4089],[4093,4089],[4094,4089]],"g3_limites":["Solo se registra la porción con tinta que intersecta el viewport; una caja visible no certifica ausencia de oclusión.","Unidades y bloques son candidatos estructurales, no unidades semánticas confirmadas. No se cuentan DIV/SPAN transparentes como unidades.","Se conservan todas las regiones y unidades candidatas; un árbol retenido puede omitir ancestros. No reconstruir cajas ni contenido ausente.","Encabezados semánticos H1-H6/role=heading son evidencia parcial; los títulos visuales requieren screenshot.","La pertenencia a la tarea, coherencia, datos requeridos y contenido ajeno requieren lectura de screenshot. La comparación entre canales no es limpia."],"g3_criterios_con_lectura_de_texto":["U","H","V","X"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g3"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["U","segmentacion","B","H","V","X","ninguna","carga_extrinseca_estructural",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","region_id","region_justification","unidades_ids","U","B","H","V","X","blocks","bloques","X_ids","X_compite","X_area_mayor","V_evidencia_ids","segmentacion","difiere_contenido","mejora_ids","inventario_completo"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"region_id":{"type":["integer","null"]},"region_justification":{"type":"string"},"unidades_ids":{"type":"array","items":{"type":"integer"}},"U":{"type":["integer","null"],"minimum":0},"B":{"type":["integer","null"],"minimum":0},"H":{"type":["integer","null"],"minimum":0},"V":{"type":["boolean","null"]},"X":{"type":["integer","null"],"minimum":0},"blocks":{"type":["integer","null"],"minimum":0},"bloques":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","unidades_ids","encabezado_id","mezcla"],"properties":{"id":{"type":"integer"},"unidades_ids":{"type":"array","items":{"type":"integer"}},"encabezado_id":{"type":["integer","null"]},"mezcla":{"type":["boolean","null"]}}}},"X_ids":{"type":"array","items":{"type":"integer"}},"X_compite":{"type":["boolean","null"]},"X_area_mayor":{"type":["boolean","null"]},"V_evidencia_ids":{"type":"array","items":{"type":"integer"}},"segmentacion":{"enum":["ausente","debil","encabezada","indeterminada"],"type":"string"},"difiere_contenido":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}},"inventario_completo":{"type":"boolean"}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"45757ceafd54135292f42c4f070935ff0b49030eedb005a150ca5d64f9c46664","wireframe":"4d153a37267a60477fab132aa0cd010d830a1fe4741d7f5fe9e947ef166cee84"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.