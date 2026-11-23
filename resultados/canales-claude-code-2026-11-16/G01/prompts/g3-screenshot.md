# Ejecución 1.0.0

Evalúa solo G3, captura captures/G01.

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
{"pagina":{"id":"G01","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:16:55.543Z","sanity_ok":false,"consent_limpio":false},"group_id":"g3","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g3":{"g3_region_tarea":{"id":357,"padre":170,"tipo":"SECTION","caja":{"x":0,"y":172,"w":1440,"h":728},"parcial":true,"unidades_ids":[378,449,451,453,464,468,470,472,485,498,511,524,537,550,563,576,589,719],"fraccion_viewport":0.8088888888888889},"g3_region_candidatas":[{"id":357,"padre":170,"tipo":"SECTION","caja":{"x":0,"y":172,"w":1440,"h":728},"parcial":true,"unidades_ids":[378,449,451,453,464,468,470,472,485,498,511,524,537,550,563,576,589,719],"fraccion_viewport":0.8088888888888889},{"id":172,"padre":171,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":330.546875},"parcial":true,"unidades_ids":[180,181],"fraccion_viewport":0.36727430555555557}],"g3_U_candidatas":18,"g3_unidades":[{"id":378,"padre":377,"tipo":"DIV","caja":{"x":0,"y":172,"w":1440,"h":320},"parcial":false,"hijos_ids":[379,382],"hijos":2,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":449,"padre":364,"tipo":"BUTTON","caja":{"x":10,"y":307,"w":28.390625,"h":50},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":451,"padre":364,"tipo":"BUTTON","caja":{"x":1401.609375,"y":307,"w":28.390625,"h":50},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":453,"padre":364,"tipo":"BUTTON","caja":{"x":10,"y":456,"w":77.234375,"h":26},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":464,"padre":463,"tipo":"H2","caja":{"x":554.859375,"y":551,"w":330.265625,"h":29},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":468,"padre":462,"tipo":"#TEXT","caja":{"x":162,"y":602,"w":75.015625,"h":187},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":470,"padre":462,"tipo":"#TEXT","caja":{"x":162,"y":602,"w":104.125,"h":298},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":472,"padre":471,"tipo":"A","caja":{"x":147,"y":749,"w":37,"h":37},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":485,"padre":483,"tipo":"A","caja":{"x":211,"y":608.59375,"w":323.328125,"h":102.8125},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":498,"padre":496,"tipo":"A","caja":{"x":558.328125,"y":608.59375,"w":323.328125,"h":102.8125},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":511,"padre":509,"tipo":"A","caja":{"x":905.65625,"y":608.59375,"w":323.328125,"h":102.8125},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":524,"padre":522,"tipo":"A","caja":{"x":211,"y":718.59375,"w":323.328125,"h":102.8125},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":537,"padre":535,"tipo":"A","caja":{"x":558.328125,"y":718.59375,"w":323.328125,"h":102.8125},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":550,"padre":548,"tipo":"A","caja":{"x":905.65625,"y":718.59375,"w":323.328125,"h":102.8125},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":563,"padre":561,"tipo":"A","caja":{"x":211,"y":828.59375,"w":323.328125,"h":71.40625},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":576,"padre":574,"tipo":"A","caja":{"x":558.328125,"y":828.59375,"w":323.328125,"h":71.40625},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":589,"padre":587,"tipo":"A","caja":{"x":905.65625,"y":828.59375,"w":323.328125,"h":71.40625},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":719,"padre":471,"tipo":"A","caja":{"x":1256,"y":749,"w":37,"h":37},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":379,"padre":378,"tipo":"IMG","caja":{"x":0,"y":172,"w":1440,"h":360},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":382,"padre":381,"tipo":"A","caja":{"x":708.015625,"y":315.1875,"w":23.953125,"h":35},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":180,"padre":178,"tipo":"#TEXT","caja":{"x":0,"y":1,"w":200.640625,"h":19},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":181,"padre":178,"tipo":"NAV","caja":{"x":0,"y":0,"w":1440,"h":164},"parcial":false,"hijos_ids":[182,200,208,237,264,267,269],"hijos":7,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":182,"padre":181,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":42},"parcial":false,"hijos_ids":[187,191],"hijos":2,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":200,"padre":199,"tipo":"A","caja":{"x":153,"y":63.484375,"w":119.328125,"h":38.015625},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":208,"padre":207,"tipo":"LABEL","caja":{"x":309.328125,"y":63,"w":176,"h":42},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":237,"padre":236,"tipo":"DIV","caja":{"x":484.71875,"y":63,"w":452,"h":42},"parcial":false,"hijos_ids":[239,249,254],"hijos":3,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":264,"padre":263,"tipo":"A","caja":{"x":952.515625,"y":63.703125,"w":116.296875,"h":37.59375},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":267,"padre":266,"tipo":"A","caja":{"x":1116.8125,"y":61.5,"w":110.1875,"h":37.3125},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":269,"padre":195,"tipo":"DIV","caja":{"x":0,"y":123,"w":1440,"h":41},"parcial":false,"hijos_ids":[273,274,280,298],"hijos":4,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":187,"padre":186,"tipo":"A","caja":{"x":153,"y":6,"w":98.140625,"h":30},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":191,"padre":190,"tipo":"DIV","caja":{"x":1194,"y":0,"w":42,"h":42},"parcial":false,"hijos_ids":[192],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":239,"padre":238,"tipo":"INPUT","caja":{"x":486.71875,"y":69,"w":315.9375,"h":30},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":249,"padre":248,"tipo":"BUTTON","caja":{"x":861.71875,"y":65.5,"w":32,"h":32},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":254,"padre":253,"tipo":"BUTTON","caja":{"x":893.71875,"y":66,"w":36,"h":36},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":273,"padre":272,"tipo":"IMG","caja":{"x":174,"y":133.5,"w":20,"h":20},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":274,"padre":272,"tipo":"A","caja":{"x":199,"y":127.5,"w":68.765625,"h":33},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":280,"padre":272,"tipo":"DIV","caja":{"x":165,"y":173,"w":350,"h":157.546875},"parcial":false,"hijos_ids":[281,284,286,289,292],"hijos":5,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":298,"padre":297,"tipo":"DIV","caja":{"x":350,"y":123,"w":847.90625,"h":41},"parcial":false,"hijos_ids":[299,305,311,317,323,327],"hijos":6,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":192,"padre":191,"tipo":"A","caja":{"x":1194,"y":0,"w":42,"h":42},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":281,"padre":280,"tipo":"DIV","caja":{"x":210.890625,"y":162.890625,"w":21.21875,"h":21.21875},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":284,"padre":283,"tipo":"P","caja":{"x":180,"y":190,"w":173.5625,"h":18},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":286,"padre":283,"tipo":"A","caja":{"x":478,"y":188,"w":22,"h":22},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":289,"padre":288,"tipo":"P","caja":{"x":180,"y":227.515625,"w":247.71875,"h":35.515625},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":292,"padre":291,"tipo":"A","caja":{"x":185,"y":273.546875,"w":212,"h":42},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":299,"padre":298,"tipo":"LI","caja":{"x":351,"y":123,"w":57.5,"h":41},"parcial":false,"hijos_ids":[300],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":305,"padre":304,"tipo":"A","caja":{"x":418.5,"y":134.734375,"w":63.0625,"h":16},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":311,"padre":310,"tipo":"A","caja":{"x":501.5625,"y":134.734375,"w":144.15625,"h":16},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":317,"padre":316,"tipo":"A","caja":{"x":665.71875,"y":134.734375,"w":63.671875,"h":16},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":323,"padre":322,"tipo":"A","caja":{"x":749.390625,"y":134.734375,"w":111.125,"h":16},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":327,"padre":298,"tipo":"DIV","caja":{"x":870.515625,"y":123,"w":86,"h":41},"parcial":false,"hijos_ids":[329],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":300,"padre":299,"tipo":"A","caja":{"x":362,"y":134.734375,"w":35.5,"h":16},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":329,"padre":328,"tipo":"A","caja":{"x":880.515625,"y":134.734375,"w":65,"h":16},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"}],"g3_B_mayor":2,"g3_tablas":[],"g3_pegajosos":[{"id":147,"padre":145,"tipo":"DIV","caja":{"x":1390,"y":439,"w":32,"h":32},"parcial":false,"position":"fixed"},{"id":181,"padre":178,"tipo":"NAV","caja":{"x":0,"y":0,"w":1440,"h":164},"parcial":false,"position":"fixed"},{"id":1182,"padre":145,"tipo":"DIV","caja":{"x":1232,"y":624.828125,"w":180,"h":122.34375},"parcial":false,"position":"fixed"},{"id":1187,"padre":145,"tipo":"BUTTON","caja":{"x":1282,"y":742,"w":130,"h":130},"parcial":false,"position":"fixed"}],"g3_encabezados":[{"id":464,"padre":463,"tipo":"H2","caja":{"x":554.859375,"y":551,"w":330.265625,"h":29},"parcial":false}],"g3_nodos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false},{"id":3,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":145,"padre":3,"tipo":"BODY","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":147,"padre":145,"tipo":"DIV","caja":{"x":1390,"y":439,"w":32,"h":32},"parcial":false},{"id":153,"padre":147,"tipo":"DIV","caja":{"x":1390,"y":439,"w":32,"h":32},"parcial":false},{"id":154,"padre":153,"tipo":"SPAN","caja":{"x":1390,"y":439,"w":32,"h":32},"parcial":false},{"id":155,"padre":154,"tipo":"IMG","caja":{"x":1390,"y":439,"w":32,"h":32},"parcial":false},{"id":170,"padre":145,"tipo":"APP-ROOT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":171,"padre":170,"tipo":"GOVCO-HEADER-4","caja":{"x":0,"y":0,"w":1440,"h":330.546875},"parcial":true},{"id":172,"padre":171,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":330.546875},"parcial":true},{"id":177,"padre":172,"tipo":"GOVCO-HEADER-DESKTOP-4","caja":{"x":0,"y":0,"w":1440,"h":330.546875},"parcial":true},{"id":178,"padre":177,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":330.546875},"parcial":true},{"id":180,"padre":178,"tipo":"#TEXT","caja":{"x":0,"y":1,"w":200.640625,"h":19},"parcial":true},{"id":181,"padre":178,"tipo":"NAV","caja":{"x":0,"y":0,"w":1440,"h":164},"parcial":false},{"id":182,"padre":181,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":42},"parcial":false},{"id":183,"padre":182,"tipo":"DIV","caja":{"x":153,"y":0,"w":1083,"h":42},"parcial":false},{"id":184,"padre":183,"tipo":"DIV","caja":{"x":153,"y":0,"w":1083,"h":42},"parcial":false},{"id":185,"padre":184,"tipo":"DIV","caja":{"x":153,"y":6,"w":98.140625,"h":30},"parcial":false},{"id":186,"padre":185,"tipo":"DIV","caja":{"x":153,"y":6,"w":98.140625,"h":30},"parcial":false},{"id":187,"padre":186,"tipo":"A","caja":{"x":153,"y":6,"w":98.140625,"h":30},"parcial":false},{"id":188,"padre":187,"tipo":"IMG","caja":{"x":153,"y":6,"w":98.140625,"h":30},"parcial":false},{"id":189,"padre":184,"tipo":"DIV","caja":{"x":1194,"y":0,"w":42,"h":42},"parcial":false},{"id":190,"padre":189,"tipo":"GOVCO-CANDYBOX","caja":{"x":1194,"y":0,"w":42,"h":42},"parcial":false},{"id":191,"padre":190,"tipo":"DIV","caja":{"x":1194,"y":0,"w":42,"h":42},"parcial":false},{"id":192,"padre":191,"tipo":"A","caja":{"x":1194,"y":0,"w":42,"h":42},"parcial":false},{"id":193,"padre":192,"tipo":"IMG","caja":{"x":1203,"y":9,"w":24,"h":24},"parcial":false},{"id":195,"padre":181,"tipo":"DIV","caja":{"x":0,"y":61.5,"w":1440,"h":269.046875},"parcial":false},{"id":196,"padre":195,"tipo":"DIV","caja":{"x":153,"y":61.5,"w":1074,"h":43.5},"parcial":false},{"id":197,"padre":196,"tipo":"DIV","caja":{"x":153,"y":61.5,"w":1074,"h":43.5},"parcial":false},{"id":198,"padre":197,"tipo":"DIV","caja":{"x":153,"y":63,"w":783.71875,"h":42},"parcial":false},{"id":199,"padre":198,"tipo":"DIV","caja":{"x":153,"y":63.484375,"w":119.328125,"h":38.015625},"parcial":false},{"id":200,"padre":199,"tipo":"A","caja":{"x":153,"y":63.484375,"w":119.328125,"h":38.015625},"parcial":false},{"id":201,"padre":200,"tipo":"IMG","caja":{"x":153,"y":63.484375,"w":119.328125,"h":38.015625},"parcial":false},{"id":202,"padre":198,"tipo":"DIV","caja":{"x":309.328125,"y":63,"w":627.390625,"h":42},"parcial":false},{"id":203,"padre":202,"tipo":"GOVCO-BUSCADOR-HOME-COMPONENT","caja":{"x":309.328125,"y":63,"w":627.390625,"h":42},"parcial":false},{"id":205,"padre":203,"tipo":"DIV","caja":{"x":309.328125,"y":63,"w":627.390625,"h":42},"parcial":false},{"id":206,"padre":205,"tipo":"DIV","caja":{"x":309.328125,"y":63,"w":176,"h":42},"parcial":false},{"id":207,"padre":206,"tipo":"DIV","caja":{"x":309.328125,"y":63,"w":176,"h":42},"parcial":false},{"id":208,"padre":207,"tipo":"LABEL","caja":{"x":309.328125,"y":63,"w":176,"h":42},"parcial":false},{"id":209,"padre":208,"tipo":"DIV","caja":{"x":333.328125,"y":76,"w":67.859375,"h":19},"parcial":false},{"id":210,"padre":209,"tipo":"#TEXT","caja":{"x":333.328125,"y":76,"w":67.859375,"h":19},"parcial":false},{"id":212,"padre":208,"tipo":"SVG","caja":{"x":458.328125,"y":83,"w":11,"h":6},"parcial":false},{"id":236,"padre":205,"tipo":"DIV","caja":{"x":484.71875,"y":63,"w":452,"h":42},"parcial":false},{"id":237,"padre":236,"tipo":"DIV","caja":{"x":484.71875,"y":63,"w":452,"h":42},"parcial":false},{"id":238,"padre":237,"tipo":"DIV","caja":{"x":486.71875,"y":69,"w":315.9375,"h":30},"parcial":false},{"id":239,"padre":238,"tipo":"INPUT","caja":{"x":486.71875,"y":69,"w":315.9375,"h":30},"parcial":false},{"id":240,"padre":237,"tipo":"DIV","caja":{"x":861.71875,"y":65.5,"w":68,"h":36.5},"parcial":false},{"id":247,"padre":240,"tipo":"GOVCO-DICTADO-VOZ","caja":{"x":861.71875,"y":65.5,"w":32,"h":32},"parcial":false},{"id":248,"padre":247,"tipo":"DIV","caja":{"x":861.71875,"y":65.5,"w":32,"h":32},"parcial":false},{"id":249,"padre":248,"tipo":"BUTTON","caja":{"x":861.71875,"y":65.5,"w":32,"h":32},"parcial":false},{"id":250,"padre":249,"tipo":"SPAN","caja":{"x":861.71875,"y":66.5,"w":30,"h":30},"parcial":false},{"id":251,"padre":250,"tipo":"SVG","caja":{"x":868.71875,"y":66.5,"w":16,"h":23},"parcial":false},{"id":253,"padre":240,"tipo":"DIV","caja":{"x":893.71875,"y":66,"w":36,"h":36},"parcial":false},{"id":254,"padre":253,"tipo":"BUTTON","caja":{"x":893.71875,"y":66,"w":36,"h":36},"parcial":false},{"id":255,"padre":254,"tipo":"SPAN","caja":{"x":893.71875,"y":69,"w":30,"h":23},"parcial":false},{"id":256,"padre":255,"tipo":"SVG","caja":{"x":893.71875,"y":69,"w":30,"h":23},"parcial":false},{"id":261,"padre":197,"tipo":"DIV","caja":{"x":952.515625,"y":61.5,"w":274.484375,"h":39.796875},"parcial":false},{"id":262,"padre":261,"tipo":"DIV","caja":{"x":952.515625,"y":61.5,"w":274.484375,"h":39.796875},"parcial":false},{"id":263,"padre":262,"tipo":"DIV","caja":{"x":952.515625,"y":63.703125,"w":116.296875,"h":37.59375},"parcial":false},{"id":264,"padre":263,"tipo":"A","caja":{"x":952.515625,"y":63.703125,"w":116.296875,"h":37.59375},"parcial":false},{"id":265,"padre":264,"tipo":"#TEXT","caja":{"x":962.515625,"y":72.5,"w":96.296875,"h":19},"parcial":false},{"id":266,"padre":262,"tipo":"DIV","caja":{"x":1116.8125,"y":61.5,"w":110.1875,"h":37.3125},"parcial":false},{"id":267,"padre":266,"tipo":"A","caja":{"x":1116.8125,"y":61.5,"w":110.1875,"h":37.3125},"parcial":false},{"id":268,"padre":267,"tipo":"#TEXT","caja":{"x":1133.8125,"y":70.5,"w":76.1875,"h":18},"parcial":false},{"id":269,"padre":195,"tipo":"DIV","caja":{"x":0,"y":123,"w":1440,"h":41},"parcial":false},{"id":270,"padre":269,"tipo":"DIV","caja":{"x":165,"y":123,"w":1032.90625,"h":207.546875},"parcial":false},{"id":271,"padre":270,"tipo":"DIV","caja":{"x":165,"y":127.5,"w":350,"h":203.046875},"parcial":false},{"id":272,"padre":271,"tipo":"DIV","caja":{"x":165,"y":127.5,"w":350,"h":203.046875},"parcial":false},{"id":273,"padre":272,"tipo":"IMG","caja":{"x":174,"y":133.5,"w":20,"h":20},"parcial":false},{"id":274,"padre":272,"tipo":"A","caja":{"x":199,"y":127.5,"w":68.765625,"h":33},"parcial":false},{"id":275,"padre":274,"tipo":"SPAN","caja":{"x":199,"y":127.5,"w":68.765625,"h":33},"parcial":false},{"id":276,"padre":275,"tipo":"#TEXT","caja":{"x":199,"y":127.5,"w":60.953125,"h":15},"parcial":false},{"id":277,"padre":275,"tipo":"SPAN","caja":{"x":199,"y":142.5,"w":68.765625,"h":18},"parcial":false},{"id":278,"padre":277,"tipo":"#TEXT","caja":{"x":199,"y":142.5,"w":68.765625,"h":18},"parcial":false},{"id":280,"padre":272,"tipo":"DIV","caja":{"x":165,"y":173,"w":350,"h":157.546875},"parcial":false},{"id":281,"padre":280,"tipo":"DIV","caja":{"x":210.890625,"y":162.890625,"w":21.21875,"h":21.21875},"parcial":false},{"id":282,"padre":280,"tipo":"DIV","caja":{"x":180,"y":188,"w":320,"h":127.546875},"parcial":false},{"id":283,"padre":282,"tipo":"DIV","caja":{"x":180,"y":188,"w":320,"h":22},"parcial":false},{"id":284,"padre":283,"tipo":"P","caja":{"x":180,"y":190,"w":173.5625,"h":18},"parcial":false},{"id":285,"padre":284,"tipo":"#TEXT","caja":{"x":180,"y":190,"w":173.5625,"h":18},"parcial":false},{"id":286,"padre":283,"tipo":"A","caja":{"x":478,"y":188,"w":22,"h":22},"parcial":false},{"id":287,"padre":286,"tipo":"IMG","caja":{"x":478,"y":188,"w":22,"h":22},"parcial":false},{"id":288,"padre":282,"tipo":"DIV","caja":{"x":180,"y":227.515625,"w":247.71875,"h":35.515625},"parcial":false},{"id":289,"padre":288,"tipo":"P","caja":{"x":180,"y":227.515625,"w":247.71875,"h":35.515625},"parcial":false},{"id":290,"padre":289,"tipo":"#TEXT","caja":{"x":180,"y":227.515625,"w":247.71875,"h":35.515625},"parcial":false},{"id":291,"padre":282,"tipo":"DIV","caja":{"x":185,"y":273.546875,"w":212,"h":42},"parcial":false},{"id":292,"padre":291,"tipo":"A","caja":{"x":185,"y":273.546875,"w":212,"h":42},"parcial":false},{"id":293,"padre":292,"tipo":"#TEXT","caja":{"x":221.34375,"y":285.546875,"w":139.296875,"h":18},"parcial":false},{"id":294,"padre":270,"tipo":"DIV","caja":{"x":350,"y":123,"w":847.90625,"h":41},"parcial":false},{"id":295,"padre":294,"tipo":"GOVCO-TOPBAR","caja":{"x":350,"y":123,"w":847.90625,"h":41},"parcial":false},{"id":296,"padre":295,"tipo":"DIV","caja":{"x":350,"y":123,"w":847.90625,"h":41},"parcial":false},{"id":297,"padre":296,"tipo":"LI","caja":{"x":350,"y":123,"w":847.90625,"h":41},"parcial":false},{"id":298,"padre":297,"tipo":"DIV","caja":{"x":350,"y":123,"w":847.90625,"h":41},"parcial":false},{"id":299,"padre":298,"tipo":"LI","caja":{"x":351,"y":123,"w":57.5,"h":41},"parcial":false},{"id":300,"padre":299,"tipo":"A","caja":{"x":362,"y":134.734375,"w":35.5,"h":16},"parcial":false},{"id":301,"padre":300,"tipo":"SPAN","caja":{"x":362,"y":134.734375,"w":35.5,"h":16},"parcial":false},{"id":302,"padre":301,"tipo":"#TEXT","caja":{"x":362,"y":134.734375,"w":35.5,"h":16},"parcial":false},{"id":303,"padre":298,"tipo":"DIV","caja":{"x":418.5,"y":134.734375,"w":63.0625,"h":16},"parcial":false},{"id":304,"padre":303,"tipo":"LI","caja":{"x":418.5,"y":134.734375,"w":63.0625,"h":16},"parcial":false},{"id":305,"padre":304,"tipo":"A","caja":{"x":418.5,"y":134.734375,"w":63.0625,"h":16},"parcial":false},{"id":306,"padre":305,"tipo":"SPAN","caja":{"x":418.5,"y":134.734375,"w":63.0625,"h":16},"parcial":false},{"id":307,"padre":306,"tipo":"#TEXT","caja":{"x":418.5,"y":134.734375,"w":63.0625,"h":16},"parcial":false},{"id":309,"padre":298,"tipo":"DIV","caja":{"x":501.5625,"y":134.734375,"w":144.15625,"h":16},"parcial":false},{"id":310,"padre":309,"tipo":"LI","caja":{"x":501.5625,"y":134.734375,"w":144.15625,"h":16},"parcial":false},{"id":311,"padre":310,"tipo":"A","caja":{"x":501.5625,"y":134.734375,"w":144.15625,"h":16},"parcial":false},{"id":312,"padre":311,"tipo":"SPAN","caja":{"x":501.5625,"y":134.734375,"w":144.15625,"h":16},"parcial":false},{"id":313,"padre":312,"tipo":"#TEXT","caja":{"x":501.5625,"y":134.734375,"w":144.15625,"h":16},"parcial":false},{"id":315,"padre":298,"tipo":"DIV","caja":{"x":665.71875,"y":134.734375,"w":63.671875,"h":16},"parcial":false},{"id":316,"padre":315,"tipo":"LI","caja":{"x":665.71875,"y":134.734375,"w":63.671875,"h":16},"parcial":false},{"id":317,"padre":316,"tipo":"A","caja":{"x":665.71875,"y":134.734375,"w":63.671875,"h":16},"parcial":false},{"id":318,"padre":317,"tipo":"SPAN","caja":{"x":665.71875,"y":134.734375,"w":63.671875,"h":16},"parcial":false},{"id":319,"padre":318,"tipo":"#TEXT","caja":{"x":665.71875,"y":134.734375,"w":63.671875,"h":16},"parcial":false},{"id":321,"padre":298,"tipo":"DIV","caja":{"x":749.390625,"y":134.734375,"w":111.125,"h":16},"parcial":false},{"id":322,"padre":321,"tipo":"LI","caja":{"x":749.390625,"y":134.734375,"w":111.125,"h":16},"parcial":false},{"id":323,"padre":322,"tipo":"A","caja":{"x":749.390625,"y":134.734375,"w":111.125,"h":16},"parcial":false},{"id":324,"padre":323,"tipo":"SPAN","caja":{"x":749.390625,"y":134.734375,"w":111.125,"h":16},"parcial":false},{"id":325,"padre":324,"tipo":"#TEXT","caja":{"x":749.390625,"y":134.734375,"w":111.125,"h":16},"parcial":false},{"id":327,"padre":298,"tipo":"DIV","caja":{"x":870.515625,"y":123,"w":86,"h":41},"parcial":false},{"id":328,"padre":327,"tipo":"LI","caja":{"x":880.515625,"y":134.734375,"w":65,"h":16},"parcial":false},{"id":329,"padre":328,"tipo":"A","caja":{"x":880.515625,"y":134.734375,"w":65,"h":16},"parcial":false},{"id":330,"padre":329,"tipo":"SPAN","caja":{"x":880.515625,"y":134.734375,"w":65,"h":16},"parcial":false},{"id":331,"padre":330,"tipo":"#TEXT","caja":{"x":880.515625,"y":134.734375,"w":65,"h":16},"parcial":false},{"id":357,"padre":170,"tipo":"SECTION","caja":{"x":0,"y":172,"w":1440,"h":728},"parcial":true},{"id":359,"padre":357,"tipo":"APP-HOME","caja":{"x":0,"y":172,"w":1440,"h":728},"parcial":true},{"id":362,"padre":359,"tipo":"DIV","caja":{"x":0,"y":172,"w":1440,"h":360},"parcial":false},{"id":363,"padre":362,"tipo":"BUSCADOR-HOME","caja":{"x":0,"y":172,"w":1440,"h":360},"parcial":false},{"id":364,"padre":363,"tipo":"DIV","caja":{"x":0,"y":172,"w":1440,"h":360},"parcial":false},{"id":377,"padre":364,"tipo":"DIV","caja":{"x":0,"y":172,"w":1440,"h":360},"parcial":false},{"id":378,"padre":377,"tipo":"DIV","caja":{"x":0,"y":172,"w":1440,"h":320},"parcial":false},{"id":379,"padre":378,"tipo":"IMG","caja":{"x":0,"y":172,"w":1440,"h":360},"parcial":false},{"id":380,"padre":378,"tipo":"DIV","caja":{"x":708.015625,"y":315.1875,"w":23.953125,"h":35},"parcial":false},{"id":381,"padre":380,"tipo":"DIV","caja":{"x":708.015625,"y":315.1875,"w":23.953125,"h":35},"parcial":false},{"id":382,"padre":381,"tipo":"A","caja":{"x":708.015625,"y":315.1875,"w":23.953125,"h":35},"parcial":false},{"id":383,"padre":382,"tipo":"P","caja":{"x":708.015625,"y":315.1875,"w":23.953125,"h":35},"parcial":false},{"id":384,"padre":383,"tipo":"#TEXT","caja":{"x":708.015625,"y":315.1875,"w":23.953125,"h":35},"parcial":false},{"id":449,"padre":364,"tipo":"BUTTON","caja":{"x":10,"y":307,"w":28.390625,"h":50},"parcial":false},{"id":450,"padre":449,"tipo":"#TEXT","caja":{"x":16,"y":312,"w":16.390625,"h":39},"parcial":false},{"id":451,"padre":364,"tipo":"BUTTON","caja":{"x":1401.609375,"y":307,"w":28.390625,"h":50},"parcial":false},{"id":452,"padre":451,"tipo":"#TEXT","caja":{"x":1407.609375,"y":312,"w":16.390625,"h":39},"parcial":false},{"id":453,"padre":364,"tipo":"BUTTON","caja":{"x":10,"y":456,"w":77.234375,"h":26},"parcial":false},{"id":454,"padre":453,"tipo":"I","caja":{"x":16,"y":460,"w":13.71875,"h":16},"parcial":false},{"id":455,"padre":454,"tipo":"::BEFORE","caja":{"x":16,"y":460,"w":13.71875,"h":16},"parcial":false},{"id":456,"padre":453,"tipo":"SPAN","caja":{"x":34.71875,"y":463,"w":46.515625,"h":14},"parcial":false},{"id":457,"padre":456,"tipo":"#TEXT","caja":{"x":34.71875,"y":463,"w":46.515625,"h":14},"parcial":false},{"id":459,"padre":359,"tipo":"DIV","caja":{"x":147,"y":551,"w":1275.3125,"h":349},"parcial":true},{"id":460,"padre":459,"tipo":"TRAMITES-MAS-CONSULTADOS","caja":{"x":147,"y":551,"w":1275.3125,"h":349},"parcial":true},{"id":461,"padre":460,"tipo":"DIV","caja":{"x":147,"y":551,"w":1275.3125,"h":349},"parcial":true},{"id":462,"padre":461,"tipo":"DIV","caja":{"x":147,"y":551,"w":1275.3125,"h":349},"parcial":true},{"id":463,"padre":462,"tipo":"DIV","caja":{"x":554.859375,"y":551,"w":330.265625,"h":29},"parcial":false},{"id":464,"padre":463,"tipo":"H2","caja":{"x":554.859375,"y":551,"w":330.265625,"h":29},"parcial":false},{"id":465,"padre":464,"tipo":"#TEXT","caja":{"x":554.859375,"y":551,"w":330.265625,"h":29},"parcial":false},{"id":468,"padre":462,"tipo":"#TEXT","caja":{"x":162,"y":602,"w":75.015625,"h":187},"parcial":false},{"id":470,"padre":462,"tipo":"#TEXT","caja":{"x":162,"y":602,"w":104.125,"h":298},"parcial":true},{"id":471,"padre":462,"tipo":"DIV","caja":{"x":147,"y":608.59375,"w":1275.3125,"h":291.40625},"parcial":true},{"id":472,"padre":471,"tipo":"A","caja":{"x":147,"y":749,"w":37,"h":37},"parcial":false},{"id":473,"padre":472,"tipo":"I","caja":{"x":161.125,"y":753.75,"w":8.75,"h":24},"parcial":false},{"id":474,"padre":473,"tipo":"::BEFORE","caja":{"x":161.125,"y":753.75,"w":8.75,"h":24},"parcial":false},{"id":475,"padre":472,"tipo":"SPAN","caja":{"x":165,"y":767.5,"w":146.40625,"h":19},"parcial":false},{"id":476,"padre":475,"tipo":"#TEXT","caja":{"x":165,"y":767.5,"w":146.40625,"h":19},"parcial":false},{"id":477,"padre":471,"tipo":"DIV","caja":{"x":211,"y":608.59375,"w":1017.984375,"h":291.40625},"parcial":true},{"id":478,"padre":477,"tipo":"DIV","caja":{"x":211,"y":608.59375,"w":1017.984375,"h":291.40625},"parcial":true},{"id":481,"padre":478,"tipo":"DIV","caja":{"x":211,"y":608.59375,"w":1017.984375,"h":291.40625},"parcial":true},{"id":482,"padre":481,"tipo":"DIV","caja":{"x":211,"y":608.59375,"w":1017.984375,"h":291.40625},"parcial":true},{"id":483,"padre":482,"tipo":"DIV","caja":{"x":211,"y":608.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":485,"padre":483,"tipo":"A","caja":{"x":211,"y":608.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":486,"padre":485,"tipo":"DIV","caja":{"x":211,"y":610,"w":323.328125,"h":100},"parcial":false},{"id":488,"padre":486,"tipo":"DIV","caja":{"x":212,"y":608.59375,"w":128.53125,"h":102.8125},"parcial":false},{"id":489,"padre":488,"tipo":"IMG","caja":{"x":224.859375,"y":608.59375,"w":102.8125,"h":102.8125},"parcial":false},{"id":491,"padre":486,"tipo":"DIV","caja":{"x":350.53125,"y":644.203125,"w":177.21875,"h":30.796875},"parcial":false},{"id":492,"padre":491,"tipo":"SPAN","caja":{"x":350.53125,"y":644.203125,"w":177.21875,"h":30.796875},"parcial":false},{"id":493,"padre":492,"tipo":"#TEXT","caja":{"x":350.53125,"y":644.203125,"w":177.21875,"h":30.796875},"parcial":false},{"id":496,"padre":482,"tipo":"DIV","caja":{"x":558.328125,"y":608.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":498,"padre":496,"tipo":"A","caja":{"x":558.328125,"y":608.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":499,"padre":498,"tipo":"DIV","caja":{"x":558.328125,"y":610,"w":323.328125,"h":100},"parcial":false},{"id":501,"padre":499,"tipo":"DIV","caja":{"x":559.328125,"y":608.59375,"w":128.53125,"h":102.8125},"parcial":false},{"id":502,"padre":501,"tipo":"IMG","caja":{"x":572.1875,"y":608.59375,"w":102.8125,"h":102.8125},"parcial":false},{"id":504,"padre":499,"tipo":"DIV","caja":{"x":697.859375,"y":652.59375,"w":164.75,"h":14},"parcial":false},{"id":505,"padre":504,"tipo":"SPAN","caja":{"x":697.859375,"y":652.59375,"w":164.75,"h":14},"parcial":false},{"id":506,"padre":505,"tipo":"#TEXT","caja":{"x":697.859375,"y":652.59375,"w":164.75,"h":14},"parcial":false},{"id":509,"padre":482,"tipo":"DIV","caja":{"x":905.65625,"y":608.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":511,"padre":509,"tipo":"A","caja":{"x":905.65625,"y":608.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":512,"padre":511,"tipo":"DIV","caja":{"x":905.65625,"y":610,"w":323.328125,"h":100},"parcial":false},{"id":514,"padre":512,"tipo":"DIV","caja":{"x":906.65625,"y":608.59375,"w":128.53125,"h":102.8125},"parcial":false},{"id":515,"padre":514,"tipo":"IMG","caja":{"x":919.515625,"y":608.59375,"w":102.8125,"h":102.8125},"parcial":false},{"id":517,"padre":512,"tipo":"DIV","caja":{"x":1045.1875,"y":644.203125,"w":143.765625,"h":30.796875},"parcial":false},{"id":518,"padre":517,"tipo":"SPAN","caja":{"x":1045.1875,"y":644.203125,"w":143.765625,"h":30.796875},"parcial":false},{"id":519,"padre":518,"tipo":"#TEXT","caja":{"x":1045.1875,"y":644.203125,"w":143.765625,"h":30.796875},"parcial":false},{"id":522,"padre":482,"tipo":"DIV","caja":{"x":211,"y":718.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":524,"padre":522,"tipo":"A","caja":{"x":211,"y":718.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":525,"padre":524,"tipo":"DIV","caja":{"x":211,"y":720,"w":323.328125,"h":100},"parcial":false},{"id":527,"padre":525,"tipo":"DIV","caja":{"x":212,"y":718.59375,"w":128.53125,"h":102.8125},"parcial":false},{"id":528,"padre":527,"tipo":"IMG","caja":{"x":224.859375,"y":718.59375,"w":102.8125,"h":102.8125},"parcial":false},{"id":530,"padre":525,"tipo":"DIV","caja":{"x":350.53125,"y":754.203125,"w":147.921875,"h":30.796875},"parcial":false},{"id":531,"padre":530,"tipo":"SPAN","caja":{"x":350.53125,"y":754.203125,"w":147.921875,"h":30.796875},"parcial":false},{"id":532,"padre":531,"tipo":"#TEXT","caja":{"x":350.53125,"y":754.203125,"w":147.921875,"h":30.796875},"parcial":false},{"id":535,"padre":482,"tipo":"DIV","caja":{"x":558.328125,"y":718.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":537,"padre":535,"tipo":"A","caja":{"x":558.328125,"y":718.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":538,"padre":537,"tipo":"DIV","caja":{"x":558.328125,"y":720,"w":323.328125,"h":100},"parcial":false},{"id":540,"padre":538,"tipo":"DIV","caja":{"x":559.328125,"y":718.59375,"w":128.53125,"h":102.8125},"parcial":false},{"id":541,"padre":540,"tipo":"IMG","caja":{"x":572.1875,"y":718.59375,"w":102.8125,"h":102.8125},"parcial":false},{"id":543,"padre":538,"tipo":"DIV","caja":{"x":697.859375,"y":754.203125,"w":179.859375,"h":30.796875},"parcial":false},{"id":544,"padre":543,"tipo":"SPAN","caja":{"x":697.859375,"y":754.203125,"w":179.859375,"h":30.796875},"parcial":false},{"id":545,"padre":544,"tipo":"#TEXT","caja":{"x":697.859375,"y":754.203125,"w":179.859375,"h":30.796875},"parcial":false},{"id":548,"padre":482,"tipo":"DIV","caja":{"x":905.65625,"y":718.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":550,"padre":548,"tipo":"A","caja":{"x":905.65625,"y":718.59375,"w":323.328125,"h":102.8125},"parcial":false},{"id":551,"padre":550,"tipo":"DIV","caja":{"x":905.65625,"y":720,"w":323.328125,"h":100},"parcial":false},{"id":553,"padre":551,"tipo":"DIV","caja":{"x":906.65625,"y":718.59375,"w":128.53125,"h":102.8125},"parcial":false},{"id":554,"padre":553,"tipo":"IMG","caja":{"x":919.515625,"y":718.59375,"w":102.8125,"h":102.8125},"parcial":false},{"id":556,"padre":551,"tipo":"DIV","caja":{"x":1045.1875,"y":754.203125,"w":145.78125,"h":30.796875},"parcial":false},{"id":557,"padre":556,"tipo":"SPAN","caja":{"x":1045.1875,"y":754.203125,"w":145.78125,"h":30.796875},"parcial":false},{"id":558,"padre":557,"tipo":"#TEXT","caja":{"x":1045.1875,"y":754.203125,"w":145.78125,"h":30.796875},"parcial":false},{"id":561,"padre":482,"tipo":"DIV","caja":{"x":211,"y":828.59375,"w":323.328125,"h":71.40625},"parcial":true},{"id":563,"padre":561,"tipo":"A","caja":{"x":211,"y":828.59375,"w":323.328125,"h":71.40625},"parcial":true},{"id":564,"padre":563,"tipo":"DIV","caja":{"x":211,"y":830,"w":323.328125,"h":70},"parcial":true},{"id":566,"padre":564,"tipo":"DIV","caja":{"x":212,"y":828.59375,"w":128.53125,"h":71.40625},"parcial":true},{"id":567,"padre":566,"tipo":"IMG","caja":{"x":224.859375,"y":828.59375,"w":102.8125,"h":71.40625},"parcial":true},{"id":569,"padre":564,"tipo":"DIV","caja":{"x":350.53125,"y":872.59375,"w":154.296875,"h":14},"parcial":false},{"id":570,"padre":569,"tipo":"SPAN","caja":{"x":350.53125,"y":872.59375,"w":154.296875,"h":14},"parcial":false},{"id":571,"padre":570,"tipo":"#TEXT","caja":{"x":350.53125,"y":872.59375,"w":154.296875,"h":14},"parcial":false},{"id":574,"padre":482,"tipo":"DIV","caja":{"x":558.328125,"y":828.59375,"w":323.328125,"h":71.40625},"parcial":true},{"id":576,"padre":574,"tipo":"A","caja":{"x":558.328125,"y":828.59375,"w":323.328125,"h":71.40625},"parcial":true},{"id":577,"padre":576,"tipo":"DIV","caja":{"x":558.328125,"y":830,"w":323.328125,"h":70},"parcial":true},{"id":579,"padre":577,"tipo":"DIV","caja":{"x":559.328125,"y":828.59375,"w":128.53125,"h":71.40625},"parcial":true},{"id":580,"padre":579,"tipo":"IMG","caja":{"x":572.1875,"y":828.59375,"w":102.8125,"h":71.40625},"parcial":true},{"id":582,"padre":577,"tipo":"DIV","caja":{"x":697.859375,"y":872.59375,"w":160.234375,"h":14},"parcial":false},{"id":583,"padre":582,"tipo":"SPAN","caja":{"x":697.859375,"y":872.59375,"w":160.234375,"h":14},"parcial":false},{"id":584,"padre":583,"tipo":"#TEXT","caja":{"x":697.859375,"y":872.59375,"w":160.234375,"h":14},"parcial":false},{"id":587,"padre":482,"tipo":"DIV","caja":{"x":905.65625,"y":828.59375,"w":323.328125,"h":71.40625},"parcial":true},{"id":589,"padre":587,"tipo":"A","caja":{"x":905.65625,"y":828.59375,"w":323.328125,"h":71.40625},"parcial":true},{"id":590,"padre":589,"tipo":"DIV","caja":{"x":905.65625,"y":830,"w":323.328125,"h":70},"parcial":true},{"id":592,"padre":590,"tipo":"DIV","caja":{"x":906.65625,"y":828.59375,"w":128.53125,"h":71.40625},"parcial":true},{"id":593,"padre":592,"tipo":"IMG","caja":{"x":919.515625,"y":828.59375,"w":102.8125,"h":71.40625},"parcial":true},{"id":595,"padre":590,"tipo":"DIV","caja":{"x":1045.1875,"y":864.203125,"w":151.234375,"h":30.796875},"parcial":false},{"id":596,"padre":595,"tipo":"SPAN","caja":{"x":1045.1875,"y":864.203125,"w":151.234375,"h":30.796875},"parcial":false},{"id":597,"padre":596,"tipo":"#TEXT","caja":{"x":1045.1875,"y":864.203125,"w":151.234375,"h":30.796875},"parcial":false},{"id":719,"padre":471,"tipo":"A","caja":{"x":1256,"y":749,"w":37,"h":37},"parcial":false},{"id":720,"padre":719,"tipo":"I","caja":{"x":1270.125,"y":753.75,"w":8.75,"h":24},"parcial":false},{"id":721,"padre":720,"tipo":"::BEFORE","caja":{"x":1270.125,"y":753.75,"w":8.75,"h":24},"parcial":false},{"id":722,"padre":719,"tipo":"SPAN","caja":{"x":1274,"y":767.5,"w":148.3125,"h":19},"parcial":false},{"id":723,"padre":722,"tipo":"#TEXT","caja":{"x":1274,"y":767.5,"w":148.3125,"h":19},"parcial":false},{"id":1015,"padre":null,"tipo":"BUTTON","caja":{"x":1391,"y":835,"w":49,"h":48},"parcial":true},{"id":1016,"padre":1015,"tipo":"SPAN","caja":{"x":1399,"y":843,"w":32,"h":32},"parcial":false},{"id":1017,"padre":1016,"tipo":"::BEFORE","caja":{"x":1399,"y":843,"w":32,"h":32},"parcial":false},{"id":1182,"padre":145,"tipo":"DIV","caja":{"x":1232,"y":624.828125,"w":180,"h":122.34375},"parcial":false},{"id":1183,"padre":1182,"tipo":"DIV","caja":{"x":1232,"y":624.828125,"w":180,"h":101.171875},"parcial":false},{"id":1184,"padre":1183,"tipo":"#TEXT","caja":{"x":1255,"y":642.828125,"w":124.65625,"h":63.78125},"parcial":false},{"id":1185,"padre":1183,"tipo":"SPAN","caja":{"x":1337.015625,"y":724.828125,"w":19.40625,"h":22.34375},"parcial":false},{"id":1186,"padre":1183,"tipo":"SPAN","caja":{"x":1339.21875,"y":724,"w":15,"h":17},"parcial":false},{"id":1187,"padre":145,"tipo":"BUTTON","caja":{"x":1282,"y":742,"w":130,"h":130},"parcial":false},{"id":1188,"padre":1187,"tipo":"IMG","caja":{"x":1282,"y":742,"w":130,"h":130},"parcial":false}],"g3_parentesco":[[0,null],[3,0],[145,3],[147,145],[153,147],[154,153],[155,154],[158,153],[170,145],[171,170],[172,171],[177,172],[178,177],[180,178],[181,178],[182,181],[183,182],[184,183],[185,184],[186,185],[187,186],[188,187],[189,184],[190,189],[191,190],[192,191],[193,192],[195,181],[196,195],[197,196],[198,197],[199,198],[200,199],[201,200],[202,198],[203,202],[205,203],[206,205],[207,206],[208,207],[209,208],[210,209],[212,208],[213,212],[236,205],[237,236],[238,237],[239,238],[240,237],[241,240],[247,240],[248,247],[249,248],[250,249],[251,250],[252,251],[253,240],[254,253],[255,254],[256,255],[257,256],[261,197],[262,261],[263,262],[264,263],[265,264],[266,262],[267,266],[268,267],[269,195],[270,269],[271,270],[272,271],[273,272],[274,272],[275,274],[276,275],[277,275],[278,277],[280,272],[281,280],[282,280],[283,282],[284,283],[285,284],[286,283],[287,286],[288,282],[289,288],[290,289],[291,282],[292,291],[293,292],[294,270],[295,294],[296,295],[297,296],[298,297],[299,298],[300,299],[301,300],[302,301],[303,298],[304,303],[305,304],[306,305],[307,306],[309,298],[310,309],[311,310],[312,311],[313,312],[315,298],[316,315],[317,316],[318,317],[319,318],[321,298],[322,321],[323,322],[324,323],[325,324],[327,298],[328,327],[329,328],[330,329],[331,330],[335,178],[357,170],[359,357],[362,359],[363,362],[364,363],[377,364],[378,377],[379,378],[380,378],[381,380],[382,381],[383,382],[384,383],[449,364],[450,449],[451,364],[452,451],[453,364],[454,453],[455,454],[455,454],[456,453],[457,456],[459,359],[460,459],[461,460],[462,461],[463,462],[464,463],[465,464],[468,462],[470,462],[471,462],[472,471],[473,472],[474,473],[474,473],[475,472],[476,475],[477,471],[478,477],[481,478],[482,481],[483,482],[485,483],[486,485],[488,486],[489,488],[491,486],[492,491],[493,492],[496,482],[498,496],[499,498],[501,499],[502,501],[504,499],[505,504],[506,505],[509,482],[511,509],[512,511],[514,512],[515,514],[517,512],[518,517],[519,518],[522,482],[524,522],[525,524],[527,525],[528,527],[530,525],[531,530],[532,531],[535,482],[537,535],[538,537],[540,538],[541,540],[543,538],[544,543],[545,544],[548,482],[550,548],[551,550],[553,551],[554,553],[556,551],[557,556],[558,557],[561,482],[563,561],[564,563],[566,564],[567,566],[569,564],[570,569],[571,570],[574,482],[576,574],[577,576],[579,577],[580,579],[582,577],[583,582],[584,583],[587,482],[589,587],[590,589],[592,590],[593,592],[595,590],[596,595],[597,596],[719,471],[720,719],[721,720],[721,720],[722,719],[723,722],[1015,null],[1016,1015],[1017,1016],[1017,1016],[1018,1015],[1182,145],[1183,1182],[1184,1183],[1185,1183],[1186,1183],[1187,145],[1188,1187]],"g3_limites":["Solo se registra la porción con tinta que intersecta el viewport; una caja visible no certifica ausencia de oclusión.","Unidades y bloques son candidatos estructurales, no unidades semánticas confirmadas. No se cuentan DIV/SPAN transparentes como unidades.","Se conservan todas las regiones y unidades candidatas; un árbol retenido puede omitir ancestros. No reconstruir cajas ni contenido ausente.","Encabezados semánticos H1-H6/role=heading son evidencia parcial; los títulos visuales requieren screenshot.","La pertenencia a la tarea, coherencia, datos requeridos y contenido ajeno requieren lectura de screenshot. La comparación entre canales no es limpia."],"g3_criterios_con_lectura_de_texto":["U","H","V","X"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g3"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["U","segmentacion","B","H","V","X","ninguna","carga_extrinseca_estructural",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","region_id","region_justification","unidades_ids","U","B","H","V","X","blocks","bloques","X_ids","X_compite","X_area_mayor","V_evidencia_ids","segmentacion","difiere_contenido","mejora_ids","inventario_completo"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"region_id":{"type":["integer","null"]},"region_justification":{"type":"string"},"unidades_ids":{"type":"array","items":{"type":"integer"}},"U":{"type":["integer","null"],"minimum":0},"B":{"type":["integer","null"],"minimum":0},"H":{"type":["integer","null"],"minimum":0},"V":{"type":["boolean","null"]},"X":{"type":["integer","null"],"minimum":0},"blocks":{"type":["integer","null"],"minimum":0},"bloques":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","unidades_ids","encabezado_id","mezcla"],"properties":{"id":{"type":"integer"},"unidades_ids":{"type":"array","items":{"type":"integer"}},"encabezado_id":{"type":["integer","null"]},"mezcla":{"type":["boolean","null"]}}}},"X_ids":{"type":"array","items":{"type":"integer"}},"X_compite":{"type":["boolean","null"]},"X_area_mayor":{"type":["boolean","null"]},"V_evidencia_ids":{"type":"array","items":{"type":"integer"}},"segmentacion":{"enum":["ausente","debil","encabezada","indeterminada"],"type":"string"},"difiere_contenido":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}},"inventario_completo":{"type":"boolean"}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"con_advertencias","integridad_ok":true,"capas_sin_resolver":true,"advertencias":["Los nodos guardados incluyen un posible diálogo visible (280). Confirmar en la imagen si tapa contenido.","Se ve un cuadro de ubicación sobre parte del banner. No cubre toda la página, pero sigue visible aunque el registro haya dado otro aviso por cerrado.","Queda una capa o un aviso sin resolver. No presentar la página como despejada.","El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"b202e20e1de752c6f7ef644245a37c6792741ab3c620126b2cf5d1a0c2d2dd7c","wireframe":"04161531c6f284defd41b24fa043b2747c9908ebd27a4f623c1a4ed8706af8cc"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.