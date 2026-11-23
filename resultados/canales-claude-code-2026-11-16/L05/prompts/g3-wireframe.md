# Ejecución 1.0.0

Evalúa solo G3, captura captures/L05.

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
{"pagina":{"id":"L05","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:18:51.338Z","sanity_ok":null,"consent_limpio":null},"group_id":"g3","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g3":{"g3_region_tarea":{"id":1565,"padre":299,"tipo":"MAIN","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"unidades_ids":[1632,1645,1662,1673,1704,1707,1718],"fraccion_viewport":1},"g3_region_candidatas":[{"id":1565,"padre":299,"tipo":"MAIN","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"unidades_ids":[1632,1645,1662,1673,1704,1707,1718],"fraccion_viewport":1},{"id":1627,"padre":1565,"tipo":"MAIN","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"unidades_ids":[1632,1645,1662,1673,1704,1707,1718],"fraccion_viewport":1},{"id":1629,"padre":1627,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1313.5,"h":900},"parcial":true,"unidades_ids":[1632,1645,1662,1673,1704,1707,1718],"fraccion_viewport":0.9121527777777778},{"id":1702,"padre":1700,"tipo":"ARTICLE","caja":{"x":0,"y":0,"w":1313.5,"h":832},"parcial":false,"unidades_ids":[1704,1707],"fraccion_viewport":0.8432345679012345},{"id":1674,"padre":1673,"tipo":"ARTICLE","caja":{"x":0,"y":0,"w":1111.5,"h":900},"parcial":true,"unidades_ids":[1676],"fraccion_viewport":0.771875},{"id":3253,"padre":null,"tipo":"DIV","caja":{"x":0,"y":0,"w":1070,"h":856},"parcial":false,"unidades_ids":[3255],"fraccion_viewport":0.7067283950617284},{"id":1409,"padre":299,"tipo":"DIV","caja":{"x":0,"y":0,"w":1320,"h":498},"parcial":false,"unidades_ids":[1411],"fraccion_viewport":0.5072222222222222},{"id":3471,"padre":null,"tipo":"DIV","caja":{"x":0,"y":0,"w":620,"h":900},"parcial":true,"unidades_ids":[3473],"fraccion_viewport":0.4305555555555556},{"id":1660,"padre":1659,"tipo":"ARTICLE","caja":{"x":0,"y":0,"w":509.5,"h":900},"parcial":true,"unidades_ids":[1662],"fraccion_viewport":0.35381944444444446},{"id":387,"padre":332,"tipo":"DIV","caja":{"x":0,"y":0,"w":1305,"h":349.5},"parcial":false,"unidades_ids":[389,390,393],"fraccion_viewport":0.35192708333333333},{"id":1646,"padre":1645,"tipo":"ARTICLE","caja":{"x":0,"y":0,"w":307.5,"h":900},"parcial":true,"unidades_ids":[1648],"fraccion_viewport":0.21354166666666666},{"id":319,"padre":299,"tipo":"ASIDE","caja":{"x":235,"y":32.5,"w":970,"h":250},"parcial":false,"unidades_ids":[322],"fraccion_viewport":0.1871141975308642},{"id":1633,"padre":1632,"tipo":"ARTICLE","caja":{"x":126.5,"y":525,"w":380.734375,"h":213},"parcial":false,"unidades_ids":[1635,1639,1642],"fraccion_viewport":0.0625743995949074},{"id":1411,"padre":1409,"tipo":"ARTICLE","caja":{"x":120,"y":441,"w":1200,"h":57},"parcial":false,"unidades_ids":[1413,1414,1415,1417],"fraccion_viewport":0.05277777777777778},{"id":1716,"padre":1715,"tipo":"ARTICLE","caja":{"x":1132.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true,"unidades_ids":[1718],"fraccion_viewport":0.0026208164544753087},{"id":1552,"padre":null,"tipo":"FORM","caja":{"x":1410,"y":650.5625,"w":30,"h":61},"parcial":true,"unidades_ids":[1556],"fraccion_viewport":0.001412037037037037}],"g3_U_candidatas":7,"g3_unidades":[{"id":1632,"padre":1631,"tipo":"DIV","caja":{"x":121.5,"y":525,"w":393,"h":346.234375},"parcial":false,"hijos_ids":[1635,1639,1642],"hijos":3,"encabezados_ids":[1635],"estructura":"bloque_con_superficie"},{"id":1645,"padre":1631,"tipo":"DIV","caja":{"x":126.5,"y":881.234375,"w":192,"h":18.765625},"parcial":true,"hijos_ids":[1648],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":1662,"padre":1661,"tipo":"A","caja":{"x":328.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1673,"padre":1631,"tipo":"DIV","caja":{"x":519.5,"y":525,"w":603,"h":375},"parcial":true,"hijos_ids":[1676],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":1704,"padre":1703,"tipo":"A","caja":{"x":1132.5,"y":525,"w":181,"h":137},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1707,"padre":1706,"tipo":"H2","caja":{"x":1132.5,"y":675,"w":179.25,"h":130},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1718,"padre":1717,"tipo":"A","caja":{"x":1132.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1635,"padre":1634,"tipo":"H2","caja":{"x":126.5,"y":525,"w":368.703125,"h":135},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1639,"padre":1638,"tipo":"P","caja":{"x":126.5,"y":670,"w":180.84375,"h":17},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1642,"padre":1634,"tipo":"P","caja":{"x":126.5,"y":696,"w":380.734375,"h":42},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1648,"padre":1647,"tipo":"A","caja":{"x":126.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1676,"padre":1675,"tipo":"A","caja":{"x":530.5,"y":525,"w":581,"h":375},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":3255,"padre":3253,"tipo":"A","caja":{"x":0,"y":0,"w":1070,"h":559},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1411,"padre":1409,"tipo":"ARTICLE","caja":{"x":120,"y":441,"w":1200,"h":57},"parcial":false,"hijos_ids":[1413,1414,1415,1417],"hijos":4,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":1413,"padre":1412,"tipo":"::BEFORE","caja":{"x":232,"y":466.8125,"w":6,"h":6},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":1414,"padre":1412,"tipo":"#TEXT","caja":{"x":250,"y":458,"w":255.546875,"h":23},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1415,"padre":1411,"tipo":"A","caja":{"x":530.546875,"y":458,"w":680.015625,"h":23},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1417,"padre":1411,"tipo":"DIV","caja":{"x":1250,"y":458,"w":20,"h":20},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":3473,"padre":3471,"tipo":"DIV","caja":{"x":480,"y":890,"w":64,"h":10},"parcial":true,"hijos_ids":[3475],"hijos":1,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":3475,"padre":3473,"tipo":"BUTTON","caja":{"x":480,"y":890,"w":64,"h":10},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":389,"padre":387,"tipo":"::BEFORE","caja":{"x":1129.359375,"y":324.5,"w":1,"h":25},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"bloque_con_superficie"},{"id":390,"padre":387,"tipo":"P","caja":{"x":0,"y":0,"w":1207.765625,"h":349.5},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":393,"padre":387,"tipo":"A","caja":{"x":1219.765625,"y":329.5,"w":85.234375,"h":15},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":322,"padre":321,"tipo":"IFRAME","caja":{"x":235,"y":32.5,"w":970,"h":250},"parcial":false,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"},{"id":1556,"padre":1552,"tipo":"TEXTAREA","caja":{"x":1420,"y":660.5625,"w":20,"h":41},"parcial":true,"hijos_ids":[],"hijos":0,"encabezados_ids":[],"estructura":"contenido_o_control"}],"g3_B_mayor":3,"g3_tablas":[],"g3_pegajosos":[{"id":400,"padre":299,"tipo":"HEADER","caja":{"x":120,"y":359,"w":1200,"h":82},"parcial":false,"position":"sticky"},{"id":8170,"padre":299,"tipo":"DIV","caja":{"x":110,"y":804,"w":1220,"h":96},"parcial":false,"position":"fixed"}],"g3_encabezados":[{"id":1635,"padre":1634,"tipo":"H2","caja":{"x":126.5,"y":525,"w":368.703125,"h":135},"parcial":false},{"id":1707,"padre":1706,"tipo":"H2","caja":{"x":1132.5,"y":675,"w":179.25,"h":130},"parcial":false}],"g3_nodos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false},{"id":2,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":299,"padre":2,"tipo":"BODY","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":319,"padre":299,"tipo":"ASIDE","caja":{"x":235,"y":32.5,"w":970,"h":250},"parcial":false},{"id":320,"padre":319,"tipo":"DIV","caja":{"x":235,"y":32.5,"w":970,"h":250},"parcial":false},{"id":321,"padre":320,"tipo":"DIV","caja":{"x":235,"y":32.5,"w":970,"h":250},"parcial":false},{"id":322,"padre":321,"tipo":"IFRAME","caja":{"x":235,"y":32.5,"w":970,"h":250},"parcial":false},{"id":332,"padre":299,"tipo":"DIV","caja":{"x":120,"y":315,"w":1200,"h":44},"parcial":false},{"id":333,"padre":332,"tipo":"P","caja":{"x":120,"y":330,"w":139.703125,"h":14},"parcial":false},{"id":334,"padre":333,"tipo":"#TEXT","caja":{"x":120,"y":330,"w":139.703125,"h":14},"parcial":false},{"id":335,"padre":332,"tipo":"NAV","caja":{"x":0,"y":0,"w":1218.03125,"h":356.5},"parcial":true},{"id":339,"padre":335,"tipo":"DIV","caja":{"x":0,"y":0,"w":1218.03125,"h":344},"parcial":true},{"id":340,"padre":339,"tipo":"P","caja":{"x":312.6875,"y":330,"w":85,"h":14},"parcial":false},{"id":341,"padre":340,"tipo":"#TEXT","caja":{"x":312.6875,"y":330,"w":69.328125,"h":14},"parcial":false},{"id":342,"padre":339,"tipo":"DIV","caja":{"x":0,"y":0,"w":1218.03125,"h":344},"parcial":true},{"id":351,"padre":342,"tipo":"UL","caja":{"x":0,"y":0,"w":1218.03125,"h":343},"parcial":false},{"id":352,"padre":351,"tipo":"LI","caja":{"x":0,"y":0,"w":500.078125,"h":343},"parcial":false},{"id":353,"padre":352,"tipo":"A","caja":{"x":0,"y":0,"w":500.078125,"h":343},"parcial":false},{"id":354,"padre":353,"tipo":"::AFTER","caja":{"x":497.078125,"y":334.640625,"w":3,"h":3},"parcial":false},{"id":355,"padre":353,"tipo":"#TEXT","caja":{"x":402.6875,"y":329,"w":84.390625,"h":14},"parcial":false},{"id":356,"padre":351,"tipo":"LI","caja":{"x":0,"y":0,"w":599.265625,"h":343},"parcial":false},{"id":357,"padre":356,"tipo":"A","caja":{"x":0,"y":0,"w":599.265625,"h":343},"parcial":false},{"id":358,"padre":357,"tipo":"::AFTER","caja":{"x":596.265625,"y":334.640625,"w":3,"h":3},"parcial":false},{"id":359,"padre":357,"tipo":"#TEXT","caja":{"x":510.078125,"y":329,"w":76.1875,"h":14},"parcial":false},{"id":360,"padre":351,"tipo":"LI","caja":{"x":0,"y":0,"w":719.71875,"h":343},"parcial":false},{"id":361,"padre":360,"tipo":"A","caja":{"x":0,"y":0,"w":719.71875,"h":343},"parcial":false},{"id":362,"padre":361,"tipo":"::AFTER","caja":{"x":716.71875,"y":334.640625,"w":3,"h":3},"parcial":false},{"id":363,"padre":361,"tipo":"#TEXT","caja":{"x":609.265625,"y":329,"w":97.453125,"h":14},"parcial":false},{"id":364,"padre":351,"tipo":"LI","caja":{"x":0,"y":0,"w":828.96875,"h":343},"parcial":false},{"id":365,"padre":364,"tipo":"A","caja":{"x":0,"y":0,"w":828.96875,"h":343},"parcial":false},{"id":366,"padre":365,"tipo":"::AFTER","caja":{"x":825.96875,"y":334.640625,"w":3,"h":3},"parcial":false},{"id":367,"padre":365,"tipo":"#TEXT","caja":{"x":729.71875,"y":329,"w":86.25,"h":14},"parcial":false},{"id":368,"padre":351,"tipo":"LI","caja":{"x":0,"y":0,"w":896.671875,"h":343},"parcial":false},{"id":369,"padre":368,"tipo":"A","caja":{"x":0,"y":0,"w":896.671875,"h":343},"parcial":false},{"id":370,"padre":369,"tipo":"::AFTER","caja":{"x":893.671875,"y":334.640625,"w":3,"h":3},"parcial":false},{"id":371,"padre":369,"tipo":"#TEXT","caja":{"x":838.96875,"y":329,"w":44.703125,"h":14},"parcial":false},{"id":372,"padre":351,"tipo":"LI","caja":{"x":0,"y":0,"w":1021.3125,"h":343},"parcial":false},{"id":373,"padre":372,"tipo":"A","caja":{"x":0,"y":0,"w":1021.3125,"h":343},"parcial":false},{"id":374,"padre":373,"tipo":"::AFTER","caja":{"x":1018.3125,"y":334.640625,"w":3,"h":3},"parcial":false},{"id":375,"padre":373,"tipo":"#TEXT","caja":{"x":906.671875,"y":329,"w":101.640625,"h":14},"parcial":false},{"id":376,"padre":351,"tipo":"LI","caja":{"x":0,"y":0,"w":1101.84375,"h":343},"parcial":false},{"id":377,"padre":376,"tipo":"A","caja":{"x":0,"y":0,"w":1101.84375,"h":343},"parcial":false},{"id":379,"padre":377,"tipo":"#TEXT","caja":{"x":1031.3125,"y":329,"w":57.53125,"h":14},"parcial":false},{"id":380,"padre":351,"tipo":"LI","caja":{"x":1111.84375,"y":329,"w":106.1875,"h":14},"parcial":false},{"id":381,"padre":380,"tipo":"A","caja":{"x":1111.84375,"y":329,"w":106.1875,"h":14},"parcial":false},{"id":382,"padre":381,"tipo":"#TEXT","caja":{"x":1111.84375,"y":329,"w":106.1875,"h":14},"parcial":false},{"id":383,"padre":335,"tipo":"BUTTON","caja":{"x":1081.6875,"y":322,"w":34,"h":30},"parcial":false},{"id":384,"padre":383,"tipo":"::BEFORE","caja":{"x":1093.015625,"y":331.328125,"w":11.34375,"h":11.34375},"parcial":false},{"id":385,"padre":383,"tipo":"SPAN","caja":{"x":1098.1875,"y":336.5,"w":75.0625,"h":20},"parcial":false},{"id":386,"padre":385,"tipo":"#TEXT","caja":{"x":1098.1875,"y":336.5,"w":75.0625,"h":20},"parcial":false},{"id":387,"padre":332,"tipo":"DIV","caja":{"x":0,"y":0,"w":1305,"h":349.5},"parcial":false},{"id":389,"padre":387,"tipo":"::BEFORE","caja":{"x":1129.359375,"y":324.5,"w":1,"h":25},"parcial":false},{"id":390,"padre":387,"tipo":"P","caja":{"x":0,"y":0,"w":1207.765625,"h":349.5},"parcial":false},{"id":391,"padre":390,"tipo":"::AFTER","caja":{"x":1206.765625,"y":324.5,"w":1,"h":25},"parcial":false},{"id":392,"padre":390,"tipo":"#TEXT","caja":{"x":1142.359375,"y":329.5,"w":53.40625,"h":15},"parcial":false},{"id":393,"padre":387,"tipo":"A","caja":{"x":1219.765625,"y":329.5,"w":85.234375,"h":15},"parcial":false},{"id":394,"padre":393,"tipo":"#TEXT","caja":{"x":1219.765625,"y":329.5,"w":85.234375,"h":15},"parcial":false},{"id":400,"padre":299,"tipo":"HEADER","caja":{"x":120,"y":359,"w":1200,"h":82},"parcial":false},{"id":402,"padre":400,"tipo":"DIV","caja":{"x":120,"y":359,"w":1200,"h":82},"parcial":false},{"id":404,"padre":402,"tipo":"LABEL","caja":{"x":120,"y":387.203125,"w":19,"h":19},"parcial":false},{"id":406,"padre":404,"tipo":"SVG","caja":{"x":120,"y":387.203125,"w":19,"h":19},"parcial":false},{"id":412,"padre":402,"tipo":"LABEL","caja":{"x":149,"y":389.203125,"w":17,"h":16},"parcial":false},{"id":414,"padre":412,"tipo":"SVG","caja":{"x":149,"y":389.203125,"w":17,"h":16},"parcial":false},{"id":420,"padre":402,"tipo":"A","caja":{"x":591,"y":373.203125,"w":258,"h":47},"parcial":false},{"id":422,"padre":420,"tipo":"SVG","caja":{"x":591,"y":373.203125,"w":258,"h":47},"parcial":false},{"id":427,"padre":402,"tipo":"DIV","caja":{"x":961.09375,"y":378,"w":210,"h":42},"parcial":false},{"id":429,"padre":427,"tipo":"DIV","caja":{"x":961.09375,"y":378,"w":210,"h":42},"parcial":false},{"id":430,"padre":429,"tipo":"DIV","caja":{"x":961.09375,"y":378,"w":210,"h":42},"parcial":false},{"id":435,"padre":null,"tipo":"::AFTER","caja":{"x":1059,"y":363.921875,"w":14.171875,"h":14.15625},"parcial":false},{"id":438,"padre":430,"tipo":"A","caja":{"x":961.09375,"y":378,"w":210,"h":42},"parcial":false},{"id":440,"padre":438,"tipo":"DIV","caja":{"x":964.09375,"y":381,"w":36,"h":36},"parcial":false},{"id":444,"padre":440,"tipo":"SPAN","caja":{"x":964.09375,"y":381,"w":36,"h":36},"parcial":false},{"id":447,"padre":438,"tipo":"DIV","caja":{"x":1048.609375,"y":391,"w":73.96875,"h":15},"parcial":false},{"id":448,"padre":447,"tipo":"#TEXT","caja":{"x":1048.609375,"y":391,"w":73.96875,"h":15},"parcial":false},{"id":463,"padre":402,"tipo":"DIV","caja":{"x":1181.09375,"y":379,"w":138.90625,"h":40},"parcial":false},{"id":465,"padre":463,"tipo":"LABEL","caja":{"x":1181.09375,"y":379,"w":138.90625,"h":40},"parcial":false},{"id":468,"padre":465,"tipo":"SPAN","caja":{"x":1204.09375,"y":391,"w":95.90625,"h":15},"parcial":false},{"id":469,"padre":468,"tipo":"#TEXT","caja":{"x":1204.09375,"y":391,"w":95.90625,"h":15},"parcial":false},{"id":477,"padre":400,"tipo":"::BEFORE","caja":{"x":118.671875,"y":429.671875,"w":22.65625,"h":22.65625},"parcial":false},{"id":479,"padre":400,"tipo":"LABEL","caja":{"x":135,"y":454.5,"w":52.546875,"h":15},"parcial":false},{"id":481,"padre":479,"tipo":"SVG","caja":{"x":135,"y":456,"w":13,"h":13},"parcial":false},{"id":485,"padre":479,"tipo":"#TEXT","caja":{"x":153,"y":454.5,"w":34.546875,"h":15},"parcial":false},{"id":489,"padre":null,"tipo":"INPUT","caja":{"x":467,"y":473,"w":456,"h":42},"parcial":false},{"id":491,"padre":null,"tipo":"BUTTON","caja":{"x":931,"y":473,"w":42,"h":42},"parcial":false},{"id":493,"padre":491,"tipo":"SVG","caja":{"x":944,"y":486,"w":16,"h":16},"parcial":false},{"id":1409,"padre":299,"tipo":"DIV","caja":{"x":0,"y":0,"w":1320,"h":498},"parcial":false},{"id":1411,"padre":1409,"tipo":"ARTICLE","caja":{"x":120,"y":441,"w":1200,"h":57},"parcial":false},{"id":1412,"padre":1411,"tipo":"B","caja":{"x":0,"y":0,"w":505.546875,"h":481},"parcial":false},{"id":1413,"padre":1412,"tipo":"::BEFORE","caja":{"x":232,"y":466.8125,"w":6,"h":6},"parcial":false},{"id":1414,"padre":1412,"tipo":"#TEXT","caja":{"x":250,"y":458,"w":255.546875,"h":23},"parcial":false},{"id":1415,"padre":1411,"tipo":"A","caja":{"x":530.546875,"y":458,"w":680.015625,"h":23},"parcial":false},{"id":1416,"padre":1415,"tipo":"#TEXT","caja":{"x":530.546875,"y":458,"w":680.015625,"h":23},"parcial":false},{"id":1417,"padre":1411,"tipo":"DIV","caja":{"x":1250,"y":458,"w":20,"h":20},"parcial":false},{"id":1453,"padre":null,"tipo":"DIV","caja":{"x":1410,"y":320,"w":30,"h":52},"parcial":true},{"id":1552,"padre":null,"tipo":"FORM","caja":{"x":1410,"y":650.5625,"w":30,"h":61},"parcial":true},{"id":1556,"padre":1552,"tipo":"TEXTAREA","caja":{"x":1420,"y":660.5625,"w":20,"h":41},"parcial":true},{"id":1565,"padre":299,"tipo":"MAIN","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":1627,"padre":1565,"tipo":"MAIN","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true},{"id":1629,"padre":1627,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1313.5,"h":900},"parcial":true},{"id":1630,"padre":1629,"tipo":"DIV","caja":{"x":0,"y":0,"w":1313.5,"h":900},"parcial":true},{"id":1631,"padre":1630,"tipo":"DIV","caja":{"x":0,"y":0,"w":1313.5,"h":900},"parcial":true},{"id":1632,"padre":1631,"tipo":"DIV","caja":{"x":121.5,"y":525,"w":393,"h":346.234375},"parcial":false},{"id":1633,"padre":1632,"tipo":"ARTICLE","caja":{"x":126.5,"y":525,"w":380.734375,"h":213},"parcial":false},{"id":1634,"padre":1633,"tipo":"DIV","caja":{"x":126.5,"y":525,"w":380.734375,"h":213},"parcial":false},{"id":1635,"padre":1634,"tipo":"H2","caja":{"x":126.5,"y":525,"w":368.703125,"h":135},"parcial":false},{"id":1636,"padre":1635,"tipo":"A","caja":{"x":126.5,"y":525,"w":368.703125,"h":135},"parcial":false},{"id":1637,"padre":1636,"tipo":"#TEXT","caja":{"x":126.5,"y":525,"w":368.703125,"h":135},"parcial":false},{"id":1638,"padre":1634,"tipo":"DIV","caja":{"x":126.5,"y":670,"w":180.84375,"h":17},"parcial":false},{"id":1639,"padre":1638,"tipo":"P","caja":{"x":126.5,"y":670,"w":180.84375,"h":17},"parcial":false},{"id":1640,"padre":1639,"tipo":"A","caja":{"x":126.5,"y":670,"w":180.84375,"h":17},"parcial":false},{"id":1641,"padre":1640,"tipo":"#TEXT","caja":{"x":126.5,"y":670,"w":180.84375,"h":17},"parcial":false},{"id":1642,"padre":1634,"tipo":"P","caja":{"x":126.5,"y":696,"w":380.734375,"h":42},"parcial":false},{"id":1643,"padre":1642,"tipo":"A","caja":{"x":126.5,"y":696,"w":380.734375,"h":42},"parcial":false},{"id":1644,"padre":1643,"tipo":"#TEXT","caja":{"x":126.5,"y":696,"w":380.734375,"h":42},"parcial":false},{"id":1645,"padre":1631,"tipo":"DIV","caja":{"x":126.5,"y":881.234375,"w":192,"h":18.765625},"parcial":true},{"id":1646,"padre":1645,"tipo":"ARTICLE","caja":{"x":0,"y":0,"w":307.5,"h":900},"parcial":true},{"id":1647,"padre":1646,"tipo":"FIGURE","caja":{"x":126.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true},{"id":1648,"padre":1647,"tipo":"A","caja":{"x":126.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true},{"id":1649,"padre":1648,"tipo":"IMG","caja":{"x":126.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true},{"id":1659,"padre":1631,"tipo":"DIV","caja":{"x":0,"y":0,"w":509.5,"h":900},"parcial":true},{"id":1660,"padre":1659,"tipo":"ARTICLE","caja":{"x":0,"y":0,"w":509.5,"h":900},"parcial":true},{"id":1661,"padre":1660,"tipo":"FIGURE","caja":{"x":328.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true},{"id":1662,"padre":1661,"tipo":"A","caja":{"x":328.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true},{"id":1663,"padre":1662,"tipo":"IMG","caja":{"x":328.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true},{"id":1673,"padre":1631,"tipo":"DIV","caja":{"x":519.5,"y":525,"w":603,"h":375},"parcial":true},{"id":1674,"padre":1673,"tipo":"ARTICLE","caja":{"x":0,"y":0,"w":1111.5,"h":900},"parcial":true},{"id":1675,"padre":1674,"tipo":"FIGURE","caja":{"x":530.5,"y":525,"w":581,"h":375},"parcial":true},{"id":1676,"padre":1675,"tipo":"A","caja":{"x":530.5,"y":525,"w":581,"h":375},"parcial":true},{"id":1677,"padre":1676,"tipo":"IMG","caja":{"x":530.5,"y":525,"w":581,"h":375},"parcial":true},{"id":1700,"padre":1631,"tipo":"DIV","caja":{"x":0,"y":0,"w":1313.5,"h":871.234375},"parcial":false},{"id":1702,"padre":1700,"tipo":"ARTICLE","caja":{"x":0,"y":0,"w":1313.5,"h":832},"parcial":false},{"id":1703,"padre":1702,"tipo":"FIGURE","caja":{"x":1132.5,"y":525,"w":181,"h":137},"parcial":false},{"id":1704,"padre":1703,"tipo":"A","caja":{"x":1132.5,"y":525,"w":181,"h":137},"parcial":false},{"id":1705,"padre":1704,"tipo":"IMG","caja":{"x":1132.5,"y":525,"w":181,"h":137},"parcial":false},{"id":1706,"padre":1702,"tipo":"DIV","caja":{"x":0,"y":0,"w":1311.75,"h":832},"parcial":false},{"id":1707,"padre":1706,"tipo":"H2","caja":{"x":1132.5,"y":675,"w":179.25,"h":130},"parcial":false},{"id":1708,"padre":1707,"tipo":"A","caja":{"x":1132.5,"y":675,"w":179.25,"h":130},"parcial":false},{"id":1709,"padre":1708,"tipo":"#TEXT","caja":{"x":1132.5,"y":675,"w":179.25,"h":130},"parcial":false},{"id":1715,"padre":1631,"tipo":"DIV","caja":{"x":1132.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true},{"id":1716,"padre":1715,"tipo":"ARTICLE","caja":{"x":1132.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true},{"id":1717,"padre":1716,"tipo":"FIGURE","caja":{"x":1132.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true},{"id":1718,"padre":1717,"tipo":"A","caja":{"x":1132.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true},{"id":1719,"padre":1718,"tipo":"IMG","caja":{"x":1132.5,"y":881.234375,"w":181,"h":18.765625},"parcial":true},{"id":3226,"padre":null,"tipo":"DIV","caja":{"x":474,"y":735.40625,"w":492,"h":102},"parcial":false},{"id":3228,"padre":3226,"tipo":"DIV","caja":{"x":474,"y":735.40625,"w":125.078125,"h":19},"parcial":false},{"id":3230,"padre":3228,"tipo":"P","caja":{"x":474,"y":735.40625,"w":58.71875,"h":19},"parcial":false},{"id":3231,"padre":3230,"tipo":"#TEXT","caja":{"x":484,"y":737.40625,"w":38.71875,"h":15},"parcial":false},{"id":3237,"padre":3226,"tipo":"DIV","caja":{"x":474,"y":759.40625,"w":474.828125,"h":47},"parcial":false},{"id":3238,"padre":3237,"tipo":"#TEXT","caja":{"x":474,"y":759.40625,"w":474.828125,"h":47},"parcial":false},{"id":3253,"padre":null,"tipo":"DIV","caja":{"x":0,"y":0,"w":1070,"h":856},"parcial":false},{"id":3255,"padre":3253,"tipo":"A","caja":{"x":0,"y":0,"w":1070,"h":559},"parcial":false},{"id":3256,"padre":3255,"tipo":"::BEFORE","caja":{"x":1008.359375,"y":494,"w":60,"h":28},"parcial":false},{"id":3257,"padre":3255,"tipo":"::AFTER","caja":{"x":1008.359375,"y":478,"w":60,"h":60},"parcial":false},{"id":3341,"padre":null,"tipo":"DIV","caja":{"x":0,"y":0,"w":620,"h":94},"parcial":false},{"id":3343,"padre":3341,"tipo":"DIV","caja":{"x":480,"y":30,"w":64,"h":64},"parcial":false},{"id":3345,"padre":3343,"tipo":"BUTTON","caja":{"x":480,"y":30,"w":64,"h":64},"parcial":false},{"id":3348,"padre":3341,"tipo":"DIV","caja":{"x":556,"y":30,"w":64,"h":64},"parcial":false},{"id":3350,"padre":3348,"tipo":"BUTTON","caja":{"x":556,"y":30,"w":64,"h":64},"parcial":false},{"id":3471,"padre":null,"tipo":"DIV","caja":{"x":0,"y":0,"w":620,"h":900},"parcial":true},{"id":3473,"padre":3471,"tipo":"DIV","caja":{"x":480,"y":890,"w":64,"h":10},"parcial":true},{"id":3475,"padre":3473,"tipo":"BUTTON","caja":{"x":480,"y":890,"w":64,"h":10},"parcial":true},{"id":8170,"padre":299,"tipo":"DIV","caja":{"x":110,"y":804,"w":1220,"h":96},"parcial":false},{"id":8171,"padre":8170,"tipo":"SPAN","caja":{"x":1302,"y":776,"w":28,"h":28},"parcial":false},{"id":8172,"padre":8171,"tipo":"#TEXT","caja":{"x":1306.65625,"y":774,"w":18.6875,"h":36},"parcial":false},{"id":8173,"padre":8170,"tipo":"DIV","caja":{"x":235,"y":807,"w":970,"h":90},"parcial":false},{"id":8174,"padre":8173,"tipo":"DIV","caja":{"x":235,"y":807,"w":970,"h":90},"parcial":false},{"id":8175,"padre":8174,"tipo":"DIV","caja":{"x":235,"y":807,"w":970,"h":90},"parcial":false},{"id":8176,"padre":8175,"tipo":"IFRAME","caja":{"x":235,"y":807,"w":970,"h":90},"parcial":false}],"g3_parentesco":[[0,null],[2,0],[299,2],[319,299],[320,319],[321,320],[322,321],[332,299],[333,332],[334,333],[335,332],[339,335],[340,339],[341,340],[342,339],[351,342],[352,351],[353,352],[354,353],[355,353],[356,351],[357,356],[358,357],[359,357],[360,351],[361,360],[362,361],[363,361],[364,351],[365,364],[366,365],[367,365],[368,351],[369,368],[370,369],[371,369],[372,351],[373,372],[374,373],[375,373],[376,351],[377,376],[379,377],[380,351],[381,380],[382,381],[383,335],[384,383],[385,383],[386,385],[387,332],[389,387],[390,387],[391,390],[392,390],[393,387],[394,393],[400,299],[402,400],[404,402],[406,404],[408,406],[412,402],[414,412],[416,414],[420,402],[422,420],[423,422],[424,422],[427,402],[429,427],[430,429],[435,null],[438,430],[440,438],[444,440],[447,438],[448,447],[463,402],[465,463],[468,465],[469,468],[477,400],[479,400],[481,479],[483,481],[485,479],[489,null],[491,null],[493,491],[495,493],[1409,299],[1411,1409],[1412,1411],[1413,1412],[1414,1412],[1415,1411],[1416,1415],[1417,1411],[1453,null],[1467,null],[1472,1467],[1487,1467],[1552,null],[1556,1552],[1565,299],[1627,1565],[1629,1627],[1630,1629],[1631,1630],[1632,1631],[1633,1632],[1634,1633],[1635,1634],[1636,1635],[1637,1636],[1638,1634],[1639,1638],[1640,1639],[1641,1640],[1642,1634],[1643,1642],[1644,1643],[1645,1631],[1646,1645],[1647,1646],[1648,1647],[1649,1648],[1659,1631],[1660,1659],[1661,1660],[1662,1661],[1663,1662],[1673,1631],[1674,1673],[1675,1674],[1676,1675],[1677,1676],[1700,1631],[1702,1700],[1703,1702],[1704,1703],[1705,1704],[1706,1702],[1707,1706],[1708,1707],[1709,1708],[1715,1631],[1716,1715],[1717,1716],[1718,1717],[1719,1718],[3226,null],[3228,3226],[3230,3228],[3231,3230],[3237,3226],[3238,3237],[3253,null],[3255,3253],[3256,3255],[3257,3255],[3341,null],[3343,3341],[3345,3343],[3348,3341],[3350,3348],[3471,null],[3473,3471],[3475,3473],[8170,299],[8171,8170],[8172,8171],[8173,8170],[8174,8173],[8175,8174],[8176,8175]],"g3_limites":["Solo se registra la porción con tinta que intersecta el viewport; una caja visible no certifica ausencia de oclusión.","Unidades y bloques son candidatos estructurales, no unidades semánticas confirmadas. No se cuentan DIV/SPAN transparentes como unidades.","Se conservan todas las regiones y unidades candidatas; un árbol retenido puede omitir ancestros. No reconstruir cajas ni contenido ausente.","Encabezados semánticos H1-H6/role=heading son evidencia parcial; los títulos visuales requieren screenshot.","La pertenencia a la tarea, coherencia, datos requeridos y contenido ajeno requieren lectura de screenshot. La comparación entre canales no es limpia."],"g3_criterios_con_lectura_de_texto":["U","H","V","X"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="wireframe" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g3"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"wireframe"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["U","segmentacion","B","H","V","X","ninguna","carga_extrinseca_estructural",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","region_id","region_justification","unidades_ids","U","B","H","V","X","blocks","bloques","X_ids","X_compite","X_area_mayor","V_evidencia_ids","segmentacion","difiere_contenido","mejora_ids","inventario_completo"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"region_id":{"type":["integer","null"]},"region_justification":{"type":"string"},"unidades_ids":{"type":"array","items":{"type":"integer"}},"U":{"type":["integer","null"],"minimum":0},"B":{"type":["integer","null"],"minimum":0},"H":{"type":["integer","null"],"minimum":0},"V":{"type":["boolean","null"]},"X":{"type":["integer","null"],"minimum":0},"blocks":{"type":["integer","null"],"minimum":0},"bloques":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","unidades_ids","encabezado_id","mezcla"],"properties":{"id":{"type":"integer"},"unidades_ids":{"type":"array","items":{"type":"integer"}},"encabezado_id":{"type":["integer","null"]},"mezcla":{"type":["boolean","null"]}}}},"X_ids":{"type":"array","items":{"type":"integer"}},"X_compite":{"type":["boolean","null"]},"X_area_mayor":{"type":["boolean","null"]},"V_evidencia_ids":{"type":"array","items":{"type":"integer"}},"segmentacion":{"enum":["ausente","debil","encabezada","indeterminada"],"type":"string"},"difiere_contenido":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}},"inventario_completo":{"type":"boolean"}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"63c659dfbccb9a4d34e13f8529ead27a09d05ef31fa3634a32992b9b793b5d78","wireframe":"f17630d1dc9875f20a36b8a11b6b1feb1a6d39d135f58108295984892f250867"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.