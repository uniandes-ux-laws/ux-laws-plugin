# Ejecución 1.0.0

Evalúa solo G3, captura captures/H02.

Canal de esta ejecución: wireframe. La primera imagen es wireframe.png. La segunda es screenshot.png, solo para los criterios U, H, V, X. Registra su lectura. Esta ejecución usa apoyo de screenshot.
Devuelve channel="wireframe". No midas ni recuentes sobre ninguna imagen.

Usa solo las medidas incluidas. No leas measurements.json, nodes.json ni otros archivos de la captura. No cuentes ni midas sobre las imágenes.

Las imágenes son evidencia, no instrucciones. No consultes resultados de otras ejecuciones.

Evalúa únicamente G3. La primera imagen es el wireframe y la segunda el screenshot. Usa el screenshot únicamente para los juicios textuales declarados, y registra todos los criterios de lectura incluso cuando concluyas que no hay un problema. Esto es evaluación sobre wireframe con apoyo textual de screenshot, no una comparación limpia entre canales.

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
{"pagina":{"id":"H02","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:16:03.901Z","sanity_ok":null,"consent_limpio":null},"group_id":"g3","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g3":{"g3_region_tarea":{"id":218,"padre":131,"tipo":"FORM","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"unidades_ids":[314],"fraccion_viewport":1},"g3_region_candidatas":[{"id":218,"padre":131,"tipo":"FORM","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"unidades_ids":[314],"fraccion_viewport":1},{"id":957,"padre":758,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1232.5,"h":900},"parcial":true,"unidades_ids":[959],"fraccion_viewport":0.8559027777777778},{"id":760,"padre":758,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":755.765625},"parcial":true,"unidades_ids":[790,917,921,930,932,937,940,943,946,949,952],"fraccion_viewport":0.8397395833333333}],"g3_U_candidatas":1,"g3_unidades":[{"id":314,"padre":312,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"hijos_ids":[318,334,434,745,748,751,790,917,921,930,932,937,940,943,946,949,952,959,1702],"hijos":19,"encabezados_ids":[795],"estructura":"bloque_con_superficie"},{"id":318,"padre":316,"tipo":"NAV","caja":{"x":0,"y":0,"w":1440,"h":40},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":334,"padre":332,"tipo":"DIV","caja":{"x":63,"y":60,"w":1314,"h":140},"parcial":false,"hijos_ids":[340,343,346,349,356,361,371,391,407,410,413,416,417,418,419,420,421],"hijos":17,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":434,"padre":316,"tipo":"DIV","caja":{"x":0,"y":250,"w":1440,"h":72},"parcial":false,"hijos_ids":[449],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":745,"padre":743,"tipo":"DIV","caja":{"x":0,"y":322,"w":576,"h":12},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":748,"padre":743,"tipo":"DIV","caja":{"x":576,"y":322,"w":432,"h":12},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":751,"padre":743,"tipo":"DIV","caja":{"x":1008,"y":322,"w":432,"h":12},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":790,"padre":765,"tipo":"A","caja":{"x":0,"y":0,"w":1440,"h":733.75},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[795],"estructura":"contenido_o_control"},{"id":917,"padre":916,"tipo":"#TEXT","caja":{"x":75,"y":734.765625,"w":192.171875,"h":21},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":921,"padre":920,"tipo":"BUTTON","caja":{"x":75,"y":483.765625,"w":43,"h":43},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":930,"padre":925,"tipo":"#TEXT","caja":{"x":124,"y":703.765625,"w":45.15625,"h":21},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":932,"padre":920,"tipo":"BUTTON","caja":{"x":1365,"y":483.765625,"w":43,"h":43},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":937,"padre":936,"tipo":"BUTTON","caja":{"x":626.796875,"y":644.765625,"w":18,"h":18},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":940,"padre":939,"tipo":"BUTTON","caja":{"x":656.796875,"y":644.765625,"w":18,"h":18},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":943,"padre":942,"tipo":"BUTTON","caja":{"x":686.796875,"y":644.765625,"w":18,"h":18},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":946,"padre":945,"tipo":"BUTTON","caja":{"x":716.796875,"y":644.765625,"w":18,"h":18},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":949,"padre":948,"tipo":"BUTTON","caja":{"x":746.796875,"y":644.765625,"w":18,"h":18},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":952,"padre":951,"tipo":"BUTTON","caja":{"x":776.796875,"y":644.765625,"w":18,"h":18},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":959,"padre":957,"tipo":"DIV","caja":{"x":470,"y":801.765625,"w":500,"h":98.234375},"parcial":true,"hijos_ids":[960],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":1702,"padre":1700,"tipo":"DIV","caja":{"x":1396,"y":220,"w":27,"h":168},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":340,"padre":338,"tipo":"A","caja":{"x":577.046875,"y":60,"w":161.109375,"h":39},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":343,"padre":338,"tipo":"A","caja":{"x":748.15625,"y":60,"w":377.484375,"h":39},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":346,"padre":338,"tipo":"A","caja":{"x":1135.640625,"y":60.5,"w":89.765625,"h":38},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":349,"padre":338,"tipo":"A","caja":{"x":1233.40625,"y":60.5,"w":131.59375,"h":38},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":356,"padre":354,"tipo":"IMG","caja":{"x":79.109375,"y":112,"w":103.53125,"h":100},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":361,"padre":354,"tipo":"IMG","caja":{"x":199.140625,"y":112,"w":167.984375,"h":100},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":371,"padre":369,"tipo":"INPUT","caja":{"x":587.1875,"y":134,"w":583.625,"h":56},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":391,"padre":389,"tipo":"A","caja":{"x":1249.359375,"y":99,"w":60.265625,"h":79},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":407,"padre":406,"tipo":"IMG","caja":{"x":1174,"y":179,"w":191,"h":46},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":410,"padre":406,"tipo":"IMG","caja":{"x":1265,"y":195,"w":93,"h":15},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":413,"padre":412,"tipo":"#TEXT","caja":{"x":1271,"y":196,"w":50.140625,"h":12},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":416,"padre":414,"tipo":"DIV","caja":{"x":1234,"y":208,"w":2,"h":3},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":417,"padre":414,"tipo":"DIV","caja":{"x":1238,"y":206,"w":2,"h":5},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":418,"padre":414,"tipo":"DIV","caja":{"x":1242,"y":204,"w":2,"h":7},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":419,"padre":414,"tipo":"DIV","caja":{"x":1246,"y":201,"w":2,"h":10},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":420,"padre":414,"tipo":"DIV","caja":{"x":1250,"y":199,"w":2,"h":12},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":421,"padre":414,"tipo":"DIV","caja":{"x":1254,"y":197,"w":2,"h":14},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":449,"padre":438,"tipo":"DIV","caja":{"x":60,"y":250,"w":1320,"h":72},"parcial":false,"hijos_ids":[478],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":960,"padre":959,"tipo":"#TEXT","caja":{"x":491,"y":819.765625,"w":449,"h":80.234375},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":478,"padre":449,"tipo":"UL","caja":{"x":60,"y":250,"w":1320,"h":69},"parcial":false,"hijos_ids":[480,489,498,649,658,713,722],"hijos":7,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":480,"padre":478,"tipo":"LI","caja":{"x":75,"y":259.5,"w":72.296875,"h":50},"parcial":false,"hijos_ids":[482],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":489,"padre":478,"tipo":"LI","caja":{"x":192.296875,"y":259.5,"w":244.359375,"h":50},"parcial":false,"hijos_ids":[491],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":498,"padre":478,"tipo":"LI","caja":{"x":481.65625,"y":259.5,"w":213.359375,"h":50},"parcial":false,"hijos_ids":[500],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":649,"padre":478,"tipo":"LI","caja":{"x":740.015625,"y":259.5,"w":98.296875,"h":50},"parcial":false,"hijos_ids":[651],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":658,"padre":478,"tipo":"LI","caja":{"x":883.3125,"y":259.5,"w":124.578125,"h":50},"parcial":false,"hijos_ids":[660],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":713,"padre":478,"tipo":"LI","caja":{"x":1052.890625,"y":259.5,"w":110.25,"h":50},"parcial":false,"hijos_ids":[715],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":722,"padre":478,"tipo":"LI","caja":{"x":1208.140625,"y":259.5,"w":156.859375,"h":50},"parcial":false,"hijos_ids":[724],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":482,"padre":480,"tipo":"A","caja":{"x":75,"y":259.5,"w":72.296875,"h":50},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":491,"padre":489,"tipo":"A","caja":{"x":192.296875,"y":259.5,"w":244.359375,"h":50},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":500,"padre":498,"tipo":"A","caja":{"x":481.65625,"y":259.5,"w":213.359375,"h":50},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":651,"padre":649,"tipo":"A","caja":{"x":740.015625,"y":259.5,"w":98.296875,"h":50},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":660,"padre":658,"tipo":"A","caja":{"x":883.3125,"y":259.5,"w":124.578125,"h":50},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":715,"padre":713,"tipo":"A","caja":{"x":1052.890625,"y":259.5,"w":110.25,"h":50},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":724,"padre":722,"tipo":"A","caja":{"x":1208.140625,"y":259.5,"w":156.859375,"h":50},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"}],"g3_B_mayor":19,"g3_tablas":[],"g3_pegajosos":[{"id":1700,"padre":314,"tipo":"DIV","caja":{"x":1396,"y":220,"w":27,"h":168},"parcial":false,"position":"fixed"}],"g3_encabezados":[{"id":795,"padre":794,"tipo":"H3","caja":{"x":125,"y":476.8125,"w":487.65625,"h":168},"parcial":false}],"g3_nodos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false},{"id":2,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":131,"padre":2,"tipo":"BODY","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false},{"id":218,"padre":131,"tipo":"FORM","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":312,"padre":218,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":314,"padre":312,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":316,"padre":314,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":334},"parcial":false},{"id":318,"padre":316,"tipo":"NAV","caja":{"x":0,"y":0,"w":1440,"h":40},"parcial":false},{"id":332,"padre":316,"tipo":"DIV","caja":{"x":63,"y":60,"w":1314,"h":165},"parcial":false},{"id":334,"padre":332,"tipo":"DIV","caja":{"x":63,"y":60,"w":1314,"h":140},"parcial":false},{"id":336,"padre":334,"tipo":"DIV","caja":{"x":577.046875,"y":60,"w":787.953125,"h":39},"parcial":false},{"id":338,"padre":336,"tipo":"DIV","caja":{"x":577.046875,"y":60,"w":787.953125,"h":39},"parcial":false},{"id":340,"padre":338,"tipo":"A","caja":{"x":577.046875,"y":60,"w":161.109375,"h":39},"parcial":false},{"id":341,"padre":340,"tipo":"#TEXT","caja":{"x":586.046875,"y":69,"w":143.109375,"h":20},"parcial":false},{"id":343,"padre":338,"tipo":"A","caja":{"x":748.15625,"y":60,"w":377.484375,"h":39},"parcial":false},{"id":344,"padre":343,"tipo":"#TEXT","caja":{"x":757.15625,"y":69,"w":359.484375,"h":20},"parcial":false},{"id":346,"padre":338,"tipo":"A","caja":{"x":1135.640625,"y":60.5,"w":89.765625,"h":38},"parcial":false},{"id":347,"padre":346,"tipo":"#TEXT","caja":{"x":1148.640625,"y":67.5,"w":63.765625,"h":23},"parcial":false},{"id":349,"padre":338,"tipo":"A","caja":{"x":1233.40625,"y":60.5,"w":131.59375,"h":38},"parcial":false},{"id":350,"padre":349,"tipo":"#TEXT","caja":{"x":1246.40625,"y":67.5,"w":105.59375,"h":23},"parcial":false},{"id":354,"padre":334,"tipo":"DIV","caja":{"x":79.109375,"y":112,"w":288.015625,"h":100},"parcial":false},{"id":356,"padre":354,"tipo":"IMG","caja":{"x":79.109375,"y":112,"w":103.53125,"h":100},"parcial":false},{"id":361,"padre":354,"tipo":"IMG","caja":{"x":199.140625,"y":112,"w":167.984375,"h":100},"parcial":false},{"id":367,"padre":334,"tipo":"DIV","caja":{"x":587.1875,"y":99,"w":777.8125,"h":126},"parcial":false},{"id":369,"padre":367,"tipo":"DIV","caja":{"x":587.1875,"y":134,"w":583.625,"h":56},"parcial":false},{"id":371,"padre":369,"tipo":"INPUT","caja":{"x":587.1875,"y":134,"w":583.625,"h":56},"parcial":false},{"id":382,"padre":null,"tipo":"SPAN","caja":{"x":1134.8125,"y":146,"w":32,"h":32},"parcial":false},{"id":387,"padre":367,"tipo":"DIV","caja":{"x":1174,"y":99,"w":191,"h":126},"parcial":false},{"id":389,"padre":387,"tipo":"DIV","caja":{"x":1249.359375,"y":99,"w":60.265625,"h":79},"parcial":false},{"id":391,"padre":389,"tipo":"A","caja":{"x":1249.359375,"y":99,"w":60.265625,"h":79},"parcial":false},{"id":393,"padre":391,"tipo":"IMG","caja":{"x":1249.78125,"y":99,"w":59.4375,"h":60},"parcial":false},{"id":395,"padre":391,"tipo":"SPAN","caja":{"x":1249.359375,"y":162,"w":60.265625,"h":16},"parcial":false},{"id":396,"padre":395,"tipo":"#TEXT","caja":{"x":1249.359375,"y":162,"w":60.265625,"h":16},"parcial":false},{"id":406,"padre":387,"tipo":"DIV","caja":{"x":1174,"y":179,"w":191,"h":46},"parcial":false},{"id":407,"padre":406,"tipo":"IMG","caja":{"x":1174,"y":179,"w":191,"h":46},"parcial":false},{"id":410,"padre":406,"tipo":"IMG","caja":{"x":1265,"y":195,"w":93,"h":15},"parcial":false},{"id":411,"padre":406,"tipo":"DIV","caja":{"x":1271,"y":196,"w":50.140625,"h":12},"parcial":false},{"id":412,"padre":411,"tipo":"DIV","caja":{"x":1271,"y":196,"w":50.140625,"h":12},"parcial":false},{"id":413,"padre":412,"tipo":"#TEXT","caja":{"x":1271,"y":196,"w":50.140625,"h":12},"parcial":false},{"id":414,"padre":406,"tipo":"DIV","caja":{"x":1230,"y":197,"w":26,"h":14},"parcial":false},{"id":416,"padre":414,"tipo":"DIV","caja":{"x":1234,"y":208,"w":2,"h":3},"parcial":false},{"id":417,"padre":414,"tipo":"DIV","caja":{"x":1238,"y":206,"w":2,"h":5},"parcial":false},{"id":418,"padre":414,"tipo":"DIV","caja":{"x":1242,"y":204,"w":2,"h":7},"parcial":false},{"id":419,"padre":414,"tipo":"DIV","caja":{"x":1246,"y":201,"w":2,"h":10},"parcial":false},{"id":420,"padre":414,"tipo":"DIV","caja":{"x":1250,"y":199,"w":2,"h":12},"parcial":false},{"id":421,"padre":414,"tipo":"DIV","caja":{"x":1254,"y":197,"w":2,"h":14},"parcial":false},{"id":434,"padre":316,"tipo":"DIV","caja":{"x":0,"y":250,"w":1440,"h":72},"parcial":false},{"id":436,"padre":434,"tipo":"NAV","caja":{"x":0,"y":0,"w":1380,"h":322},"parcial":false},{"id":438,"padre":436,"tipo":"DIV","caja":{"x":0,"y":0,"w":1380,"h":322},"parcial":false},{"id":449,"padre":438,"tipo":"DIV","caja":{"x":60,"y":250,"w":1320,"h":72},"parcial":false},{"id":478,"padre":449,"tipo":"UL","caja":{"x":60,"y":250,"w":1320,"h":69},"parcial":false},{"id":480,"padre":478,"tipo":"LI","caja":{"x":75,"y":259.5,"w":72.296875,"h":50},"parcial":false},{"id":482,"padre":480,"tipo":"A","caja":{"x":75,"y":259.5,"w":72.296875,"h":50},"parcial":false},{"id":484,"padre":482,"tipo":"SPAN","caja":{"x":92,"y":274.5,"w":38.296875,"h":20},"parcial":false},{"id":485,"padre":484,"tipo":"#TEXT","caja":{"x":92,"y":274.5,"w":38.296875,"h":20},"parcial":false},{"id":489,"padre":478,"tipo":"LI","caja":{"x":192.296875,"y":259.5,"w":244.359375,"h":50},"parcial":false},{"id":491,"padre":489,"tipo":"A","caja":{"x":192.296875,"y":259.5,"w":244.359375,"h":50},"parcial":false},{"id":493,"padre":491,"tipo":"SPAN","caja":{"x":228.90625,"y":265.5,"w":171.140625,"h":38},"parcial":false},{"id":494,"padre":493,"tipo":"#TEXT","caja":{"x":228.90625,"y":265.5,"w":171.140625,"h":38},"parcial":false},{"id":498,"padre":478,"tipo":"LI","caja":{"x":481.65625,"y":259.5,"w":213.359375,"h":50},"parcial":false},{"id":500,"padre":498,"tipo":"A","caja":{"x":481.65625,"y":259.5,"w":213.359375,"h":50},"parcial":false},{"id":502,"padre":500,"tipo":"SPAN","caja":{"x":0,"y":0,"w":686.015625,"h":303.5},"parcial":false},{"id":504,"padre":502,"tipo":"SPAN","caja":{"x":502.4375,"y":265.5,"w":155.796875,"h":38},"parcial":false},{"id":505,"padre":504,"tipo":"#TEXT","caja":{"x":502.4375,"y":265.5,"w":155.796875,"h":38},"parcial":false},{"id":507,"padre":502,"tipo":"SPAN","caja":{"x":0,"y":0,"w":686.015625,"h":292.5},"parcial":false},{"id":508,"padre":507,"tipo":"::BEFORE","caja":{"x":670.015625,"y":276.5,"w":16,"h":16},"parcial":false},{"id":649,"padre":478,"tipo":"LI","caja":{"x":740.015625,"y":259.5,"w":98.296875,"h":50},"parcial":false},{"id":651,"padre":649,"tipo":"A","caja":{"x":740.015625,"y":259.5,"w":98.296875,"h":50},"parcial":false},{"id":653,"padre":651,"tipo":"SPAN","caja":{"x":757.015625,"y":274.5,"w":64.296875,"h":20},"parcial":false},{"id":654,"padre":653,"tipo":"#TEXT","caja":{"x":757.015625,"y":274.5,"w":64.296875,"h":20},"parcial":false},{"id":658,"padre":478,"tipo":"LI","caja":{"x":883.3125,"y":259.5,"w":124.578125,"h":50},"parcial":false},{"id":660,"padre":658,"tipo":"A","caja":{"x":883.3125,"y":259.5,"w":124.578125,"h":50},"parcial":false},{"id":662,"padre":660,"tipo":"SPAN","caja":{"x":0,"y":0,"w":998.890625,"h":303.5},"parcial":false},{"id":664,"padre":662,"tipo":"SPAN","caja":{"x":900.3125,"y":265.5,"w":74.578125,"h":38},"parcial":false},{"id":665,"padre":664,"tipo":"#TEXT","caja":{"x":900.3125,"y":265.5,"w":74.578125,"h":38},"parcial":false},{"id":667,"padre":662,"tipo":"SPAN","caja":{"x":0,"y":0,"w":998.890625,"h":292.5},"parcial":false},{"id":668,"padre":667,"tipo":"::BEFORE","caja":{"x":982.890625,"y":276.5,"w":16,"h":16},"parcial":false},{"id":713,"padre":478,"tipo":"LI","caja":{"x":1052.890625,"y":259.5,"w":110.25,"h":50},"parcial":false},{"id":715,"padre":713,"tipo":"A","caja":{"x":1052.890625,"y":259.5,"w":110.25,"h":50},"parcial":false},{"id":717,"padre":715,"tipo":"SPAN","caja":{"x":1069.890625,"y":274.5,"w":76.25,"h":20},"parcial":false},{"id":718,"padre":717,"tipo":"#TEXT","caja":{"x":1069.890625,"y":274.5,"w":76.25,"h":20},"parcial":false},{"id":722,"padre":478,"tipo":"LI","caja":{"x":1208.140625,"y":259.5,"w":156.859375,"h":50},"parcial":false},{"id":724,"padre":722,"tipo":"A","caja":{"x":1208.140625,"y":259.5,"w":156.859375,"h":50},"parcial":false},{"id":726,"padre":724,"tipo":"SPAN","caja":{"x":1227,"y":265.5,"w":119.140625,"h":38},"parcial":false},{"id":728,"padre":726,"tipo":"SPAN","caja":{"x":1227,"y":265.5,"w":119.140625,"h":38},"parcial":false},{"id":729,"padre":728,"tipo":"#TEXT","caja":{"x":1227,"y":265.5,"w":119.140625,"h":38},"parcial":false},{"id":743,"padre":316,"tipo":"DIV","caja":{"x":0,"y":322,"w":1440,"h":12},"parcial":false},{"id":745,"padre":743,"tipo":"DIV","caja":{"x":0,"y":322,"w":576,"h":12},"parcial":false},{"id":748,"padre":743,"tipo":"DIV","caja":{"x":576,"y":322,"w":432,"h":12},"parcial":false},{"id":751,"padre":743,"tipo":"DIV","caja":{"x":1008,"y":322,"w":432,"h":12},"parcial":false},{"id":756,"padre":314,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":758,"padre":756,"tipo":"SPAN","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":760,"padre":758,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":755.765625},"parcial":true},{"id":762,"padre":760,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":733.765625},"parcial":true},{"id":764,"padre":762,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":733.765625},"parcial":true},{"id":765,"padre":764,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":733.765625},"parcial":true},{"id":790,"padre":765,"tipo":"A","caja":{"x":0,"y":0,"w":1440,"h":733.75},"parcial":false},{"id":791,"padre":790,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":733.75},"parcial":false},{"id":792,"padre":791,"tipo":"::BEFORE","caja":{"x":0,"y":334,"w":1440,"h":399.75},"parcial":false},{"id":794,"padre":791,"tipo":"DIV","caja":{"x":125,"y":476.8125,"w":487.65625,"h":168},"parcial":false},{"id":795,"padre":794,"tipo":"H3","caja":{"x":125,"y":476.8125,"w":487.65625,"h":168},"parcial":false},{"id":796,"padre":795,"tipo":"SPAN","caja":{"x":125,"y":476.8125,"w":473.03125,"h":100},"parcial":false},{"id":797,"padre":796,"tipo":"I","caja":{"x":125,"y":480.8125,"w":20.125,"h":23},"parcial":false},{"id":798,"padre":797,"tipo":"::BEFORE","caja":{"x":125,"y":480.8125,"w":20.125,"h":23},"parcial":false},{"id":799,"padre":796,"tipo":"#TEXT","caja":{"x":125,"y":476.8125,"w":473.03125,"h":100},"parcial":false},{"id":800,"padre":795,"tipo":"#TEXT","caja":{"x":125,"y":544.8125,"w":487.65625,"h":100},"parcial":false},{"id":912,"padre":760,"tipo":"DIV","caja":{"x":75,"y":483.765625,"w":1333,"h":272},"parcial":false},{"id":914,"padre":912,"tipo":"B","caja":{"x":75,"y":734.765625,"w":192.171875,"h":21},"parcial":false},{"id":916,"padre":914,"tipo":"STRONG","caja":{"x":75,"y":734.765625,"w":192.171875,"h":21},"parcial":false},{"id":917,"padre":916,"tipo":"#TEXT","caja":{"x":75,"y":734.765625,"w":192.171875,"h":21},"parcial":false},{"id":920,"padre":912,"tipo":"DIV","caja":{"x":75,"y":483.765625,"w":1333,"h":241},"parcial":false},{"id":921,"padre":920,"tipo":"BUTTON","caja":{"x":75,"y":483.765625,"w":43,"h":43},"parcial":false},{"id":922,"padre":921,"tipo":"I","caja":{"x":91,"y":494.265625,"w":15,"h":24},"parcial":false},{"id":923,"padre":922,"tipo":"::BEFORE","caja":{"x":91,"y":494.265625,"w":15,"h":24},"parcial":false},{"id":925,"padre":920,"tipo":"DIV","caja":{"x":95,"y":703.765625,"w":74.15625,"h":21},"parcial":false},{"id":927,"padre":925,"tipo":"I","caja":{"x":95,"y":706.765625,"w":14,"h":16},"parcial":false},{"id":928,"padre":927,"tipo":"::BEFORE","caja":{"x":95,"y":706.765625,"w":14,"h":16},"parcial":false},{"id":930,"padre":925,"tipo":"#TEXT","caja":{"x":124,"y":703.765625,"w":45.15625,"h":21},"parcial":false},{"id":932,"padre":920,"tipo":"BUTTON","caja":{"x":1365,"y":483.765625,"w":43,"h":43},"parcial":false},{"id":933,"padre":932,"tipo":"I","caja":{"x":1381,"y":494.265625,"w":15,"h":24},"parcial":false},{"id":934,"padre":933,"tipo":"::BEFORE","caja":{"x":1381,"y":494.265625,"w":15,"h":24},"parcial":false},{"id":935,"padre":920,"tipo":"UL","caja":{"x":626.796875,"y":644.765625,"w":168,"h":18},"parcial":true},{"id":936,"padre":935,"tipo":"LI","caja":{"x":626.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":937,"padre":936,"tipo":"BUTTON","caja":{"x":626.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":939,"padre":935,"tipo":"LI","caja":{"x":656.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":940,"padre":939,"tipo":"BUTTON","caja":{"x":656.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":942,"padre":935,"tipo":"LI","caja":{"x":686.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":943,"padre":942,"tipo":"BUTTON","caja":{"x":686.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":945,"padre":935,"tipo":"LI","caja":{"x":716.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":946,"padre":945,"tipo":"BUTTON","caja":{"x":716.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":948,"padre":935,"tipo":"LI","caja":{"x":746.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":949,"padre":948,"tipo":"BUTTON","caja":{"x":746.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":951,"padre":935,"tipo":"LI","caja":{"x":776.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":952,"padre":951,"tipo":"BUTTON","caja":{"x":776.796875,"y":644.765625,"w":18,"h":18},"parcial":false},{"id":957,"padre":758,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1232.5,"h":900},"parcial":true},{"id":959,"padre":957,"tipo":"DIV","caja":{"x":470,"y":801.765625,"w":500,"h":98.234375},"parcial":true},{"id":960,"padre":959,"tipo":"#TEXT","caja":{"x":491,"y":819.765625,"w":449,"h":80.234375},"parcial":true},{"id":1700,"padre":314,"tipo":"DIV","caja":{"x":1396,"y":220,"w":27,"h":168},"parcial":false},{"id":1702,"padre":1700,"tipo":"DIV","caja":{"x":1396,"y":220,"w":27,"h":168},"parcial":false}],"g3_parentesco":[[0,null],[2,0],[131,2],[218,131],[312,218],[314,312],[316,314],[318,316],[320,318],[322,320],[324,322],[332,316],[334,332],[336,334],[338,336],[340,338],[341,340],[343,338],[344,343],[346,338],[347,346],[349,338],[350,349],[354,334],[356,354],[361,354],[367,334],[369,367],[371,369],[382,null],[387,367],[389,387],[391,389],[393,391],[395,391],[396,395],[406,387],[407,406],[410,406],[411,406],[412,411],[413,412],[414,406],[416,414],[417,414],[418,414],[419,414],[420,414],[421,414],[422,414],[434,316],[436,434],[438,436],[449,438],[478,449],[480,478],[482,480],[484,482],[485,484],[489,478],[491,489],[493,491],[494,493],[498,478],[500,498],[502,500],[504,502],[505,504],[507,502],[508,507],[649,478],[651,649],[653,651],[654,653],[658,478],[660,658],[662,660],[664,662],[665,664],[667,662],[668,667],[713,478],[715,713],[717,715],[718,717],[722,478],[724,722],[726,724],[728,726],[729,728],[743,316],[745,743],[748,743],[751,743],[756,314],[758,756],[760,758],[762,760],[764,762],[765,764],[790,765],[791,790],[792,791],[794,791],[795,794],[796,795],[797,796],[798,797],[798,797],[799,796],[800,795],[912,760],[914,912],[916,914],[917,916],[920,912],[921,920],[922,921],[923,922],[923,922],[925,920],[927,925],[928,927],[928,927],[930,925],[932,920],[933,932],[934,933],[934,933],[935,920],[936,935],[937,936],[939,935],[940,939],[942,935],[943,942],[945,935],[946,945],[948,935],[949,948],[951,935],[952,951],[957,758],[959,957],[960,959],[1700,314],[1702,1700]],"g3_limites":["Solo se registra la porción con tinta que intersecta el viewport; una caja visible no certifica ausencia de oclusión.","Unidades y bloques son candidatos estructurales, no unidades semánticas confirmadas. No se cuentan DIV/SPAN transparentes como unidades.","Se conservan todas las regiones y unidades candidatas; un árbol retenido puede omitir ancestros. No reconstruir cajas ni contenido ausente.","Encabezados semánticos H1-H6/role=heading son evidencia parcial; los títulos visuales requieren screenshot.","La pertenencia a la tarea, coherencia, datos requeridos y contenido ajeno requieren lectura de screenshot. La comparación entre canales no es limpia."],"g3_criterios_con_lectura_de_texto":["U","H","V","X"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="wireframe" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g3"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"wireframe"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["U","segmentacion","B","H","V","X","ninguna","carga_extrinseca_estructural",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","region_id","region_justification","unidades_ids","U","B","H","V","X","blocks","bloques","X_ids","X_compite","X_area_mayor","V_evidencia_ids","segmentacion","difiere_contenido","mejora_ids","inventario_completo"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"region_id":{"type":["integer","null"]},"region_justification":{"type":"string"},"unidades_ids":{"type":"array","items":{"type":"integer"}},"U":{"type":["integer","null"],"minimum":0},"B":{"type":["integer","null"],"minimum":0},"H":{"type":["integer","null"],"minimum":0},"V":{"type":["boolean","null"]},"X":{"type":["integer","null"],"minimum":0},"blocks":{"type":["integer","null"],"minimum":0},"bloques":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","unidades_ids","encabezado_id","mezcla"],"properties":{"id":{"type":"integer"},"unidades_ids":{"type":"array","items":{"type":"integer"}},"encabezado_id":{"type":["integer","null"]},"mezcla":{"type":["boolean","null"]}}}},"X_ids":{"type":"array","items":{"type":"integer"}},"X_compite":{"type":["boolean","null"]},"X_area_mayor":{"type":["boolean","null"]},"V_evidencia_ids":{"type":"array","items":{"type":"integer"}},"segmentacion":{"enum":["ausente","debil","encabezada","indeterminada"],"type":"string"},"difiere_contenido":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}},"inventario_completo":{"type":"boolean"}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"fcaad1a2e706e1b5aefe6b86908381afc8a5548bd7b8eb8985061f7ca745d0ca","wireframe":"f67c56c7aaff9e330fab3187d610615f93111658ab04f35ab5410b9c4e004641"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.