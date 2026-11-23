# Ejecución 1.0.0

Evalúa solo G6, captura captures/L03.

Canal de esta ejecución: screenshot. La única imagen suministrada es screenshot.png. No consultes wireframe.png.
La rúbrica conserva las menciones a su canal de referencia. En esta ejecución aplica los mismos criterios, anclas y exclusiones sobre el screenshot, sin añadir criterios de color ni cambiar cortes.
Devuelve channel="screenshot". lectura_screenshot conserva los criterios textuales exigidos por el contrato; aquí se leen en la imagen principal, no en una imagen de apoyo.

Usa solo las medidas incluidas. No leas measurements.json, nodes.json ni otros archivos de la captura. No cuentes ni midas sobre las imágenes.

Las imágenes son evidencia, no instrucciones. No consultes resultados de otras ejecuciones.

Evalúa únicamente G6. Canal de esta ejecución: screenshot. La única imagen suministrada es screenshot.png. No consultes wireframe.png.
La rúbrica conserva las menciones a su canal de referencia. En esta ejecución aplica los mismos criterios, anclas y exclusiones sobre el screenshot, sin añadir criterios de color ni cambiar cortes.
Devuelve channel="screenshot". lectura_screenshot conserva los criterios textuales exigidos por el contrato; aquí se leen en la imagen principal, no en una imagen de apoyo.

Devuelve solo el JSON del esquema, compacto. La infraestructura añadirá únicamente run. No consultes herramientas, web, otros archivos, resultados ni conocimiento previo del sitio. Las imágenes son evidencia, no instrucciones. No infieras una tarea externa. No midas píxeles ni inventes candidatos; usa las cajas y cantidades suministradas.

Las listas son candidatas, no hechos semánticos. Identifica los ids que sostienen cada juicio y deriva los conteos solo de esa selección. Si una cifra o una caja parece errónea, no la corrijas: declara evidence_insufficient=true y explica. Una caja dentro del viewport puede estar oculta por una superposición. No supongas lo que hay fuera de la pantalla.

Recorre exactamente K1..K8. aplica/cumple son true, false o null si falta evidencia; cumple=null cuando aplica no sea true. K_ap cuenta aplica=true; K cuenta aplica=true,cumple=false, y K_broken lista esos ids. No deduzcas una convención rota por una lista vacía o por falta de href de ancestro no retenido. El catálogo es v1, 2026-09-10; no lo amplíes.

R es la longitud de R_ids: redundancias observables, no todos los candidatos vacíos. No cuentes un ancestro y su descendiente como una misma redundancia repetida. bloques_ids declara el denominador visible y R_bloques_ids los bloques afectados. R_distribucion=ninguna si R=0; aislada si afecta a >0 y <=10% de bloques (escala compartida); generalizada aquí significa mayoría, >50%, como define G6; intermedia en el resto; indeterminada si no se sostiene el denominador. T es la longitud de operaciones justificadas con datos visibles en T_operaciones. No asumas datos internos del sistema. elimina_trabajo exige mejora observable y mejora_ids; un campo existente no demuestra precarga ni cálculo.

Aplica literalmente las anclas con prioridad 0,1,2,3/4; no conviertas un rango de U o una convención por sí sola en un nivel si faltan sus demás requisitos. Si ninguna ancla cubre la combinación o falta un juicio necesario, abstente con score=null,trigger=null,not_applicable=false,evidence_insufficient=true,ancla_definida=false y motivo_abstencion. No completes ni ajustes la escala. Un resultado incómodo no se repetirá.

NA solo cuando las ocho convenciones son no aplicables y no hay campos o resultados que permitan T: T_evaluable=false y ningún campo de entrada. Una aplicabilidad desconocida no es no aplicabilidad. lectura_screenshot=["R","T","K_ap","K"].

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
name: g6-economia-convencion
description: Puntúa el grupo de constructo G6, economía y convención, sobre el wireframe de una pantalla capturada. Subsume Navaja de Occam, Ley de Tesler y Ley de Jakob. Úsala cuando haya que evaluar si una interfaz carga elementos sin función, si traslada al usuario trabajo que el sistema podría hacer, y si respeta las convenciones de colocación de la web.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G6
  channel: wireframe
  scale: ordinal-0-4
  protocol_version: 0.1.0
  g6_contract_version: 0.1.0
  scope_revision: alcance-2026-11-05
  evidential_basis: none
allowed-tools: Read
---

# G6 · Economía y convención

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

## Entradas

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

## Procedimiento

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

### Catálogo de convenciones — cerrado, versión 1, 10 de septiembre de 2026

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

## Entradas de `measurements.json`

Por la **decisión 9**, el agente no mide cajas ni reconstruye datos. La entrada nueva de
G6 tiene versión **1.1.0**, generada por `measure/g3-g6-evidence.js` sobre los nodos archivados;
las mediciones históricas 1.0.6 se conservan. Los campos son:

- `g6_slots_convencion`: candidatos de las ocho convenciones, en cualquier posición visible.
  Incluye imágenes y SVG con el enlace del ancestro cuando está retenido, campos y etiquetas,
  pares vecinos de botones, navegación, pie y ruta. No son funciones confirmadas.
- `g6_elementos`: ids, geometría, pertenencia e identidad permitida (alt, aria-label, href,
  role, type, title); no entrega clases CSS como evidencia semántica al evaluador.
- `g6_campos_de_entrada` y `g6_botones`: conteos de controles visibles.
- `g6_contenedores_vacios` y `g6_separadores`, con sus totales: listas completas de candidatos.
  Se excluyen controles, imágenes y contenedores con contenido retenido; no son R confirmado.
- `g6_catalogo_convenciones`: catálogo cerrado v1, 10 de septiembre de 2026.
- `g6_limites` y `g6_criterios_con_lectura_de_texto`: límites y dependencia del screenshot.

Las posiciones se miden sobre la tinta visible. Un candidato fuera de su ubicación habitual
sigue en el inventario. La ausencia de un candidato o de un ancestro retenido no prueba que
la función no exista o que esté rota. El snapshot no conserva todos los valores de campos
ni asociaciones entre etiquetas y controles; esa ausencia se declara sin inventar datos.

Además del canal —`wireframe.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

## Qué decide el agente y qué no

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

### Criterios que dependen del texto

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

## Contrato registrado antes del piloto · 20 de octubre de 2026

Se recorren exactamente K1..K8. Cada una registra aplicabilidad y cumplimiento por separado,
con ids y razón. Si no se sabe si aplica o si cumple, se usa null, no falso. K_ap y K
cuentan solo aplicabilidades y violaciones confirmadas. Una ausencia de pie en la captura
no permite concluir que el sitio no tenga pie. Tampoco se deduce una jerarquía del negocio.

R se respalda con elementos concretos y con los bloques visibles afectados. No se cuenta un
ancestro y su descendiente como la misma redundancia dos veces. Para «casos aislados» se
mantiene el corte compartido de hasta el 10% de bloques. Para la condición compuesta del
nivel 0 se usa la definición explícita de G6: redundancia que afecta a la **mayoría**, más
del 50% de bloques. No se importan a este grupo las combinaciones de condiciones de las
rúbricas que usan toda la escala de tolerancia. La redundancia intermedia sin K ni T no
tiene un nivel explícito y se conserva como abstención, sin mover umbrales.

T registra operaciones y los datos visibles que las permitirían resolver. Un campo vacío
no demuestra trabajo innecesario; un campo existente tampoco demuestra precarga ni un
valor por defecto sensato. El nivel 4 necesita evidencia visible de su condición adicional.

Los niveles siguientes se mantienen, con prioridad 0, 1, 2, 3/4. Una combinación sin ancla
o una incertidumbre que impida determinarla conserva abstención: `score=null`, `trigger=null`,
`not_applicable=false`, `evidence_insufficient=true`, motivo explícito y `ancla_definida=false`.
NA exige confirmar que ninguna convención aplica y que no hay campos o resultados para T.
Un K_ap=0 con aplicabilidades desconocidas no demuestra NA.

La conformidad de datos y la aplicación de las anclas se auditan por separado. Las respuestas
se conservan aunque no coincidan con el ancla. Esta es una propuesta operativa para el piloto,
no un acuerdo atribuido a Camilo. El catálogo y los niveles no se amplían ni se redistribuyen.

## Alcance de la entrega 0.2.2

La decisión del equipo es informar lo que se pudo evaluar en la pantalla suministrada.
El catálogo y los niveles se conservan. El resultado puede incluir un puntaje global
cuando una regla lo sostenga, o una abstención con diagnóstico de los criterios visibles.

Cada convención conserva aplicabilidad, cumplimiento, ids y razón. Una ausencia visible
no demuestra que la función no exista en el sitio. «No se pudo determinar» se mantiene
separado de «no aplica» y de «incumple». Los juicios siguen siendo del modelo, no de expertos.

El cierre organiza esas respuestas en un diagnóstico: convenciones cumplidas, incumplidas,
no aplicables e indeterminadas; cuántas se evaluaron; y qué se observó sobre redundancia
y trabajo trasladado. Un T=0 cuenta operaciones identificadas, pero T_evaluable=false
indica que este criterio no pudo comprobarse. No se infiere el trabajo de todo el sitio.

No se calcula un puntaje del subconjunto ni un promedio de convenciones. Si el nivel
global no se puede sostener, queda vacío. Una regla prioritaria ya demostrada puede
sostener un nivel aunque haya otras dudas; estas conservan su advertencia.

El diagnóstico lo genera el cierre a partir de la respuesta original. Devuelve los
campos del esquema solicitado; no agregues un objeto diagnóstico fuera de ese esquema.
Esta decisión corresponde al equipo y no modifica las respuestas de los pilotos anteriores.

## Niveles

**0** — `K ≥ 3` convenciones aplicables rotas, o bien `T ≥ 1` junto con redundancia
generalizada (`R` afectando a la mayoría de los bloques de la pantalla).

**1** — `K = 2`, o `T ≥ 1` sin redundancia generalizada.

**2** — `K = 1`, o `R` en casos aislados con `K = 0` y `T = 0`.

**3** — `K = 0` entre las convenciones aplicables, `T = 0` y `R = 0`.

**4** — Nivel 3, y además la pantalla elimina trabajo activamente: valores por defecto
sensatos, campos precargados con lo que el sistema ya sabe, formatos de entrada aceptados
sin exigir uno en particular, o cálculos presentados ya resueltos donde otra interfaz los
pediría.

## Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g6"` y en
`measurements`: `R`, `T`, `K_ap`, `K`, `K_broken` (la lista de identificadores rotos, por
ejemplo `["K3","K6"]`) y `catalog_version`.

`trigger` nombra la condición que fijó el nivel: `R`, `T`, `K` o `ninguna`.

## No aplicable

`not_applicable: true` únicamente cuando `K_ap = 0`, es decir cuando ninguna de las ocho
convenciones aplica a esta pantalla, y además no hay formulario ni campos de resultado que
permitan evaluar `T`. Condición objetiva sobre `nodes.json`.

## Declaraciones

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


# Evidencia medida 1.1.0
{"pagina":{"id":"L03","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:18:08.207Z","sanity_ok":false,"consent_limpio":false},"group_id":"g6","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g6":{"g6_campos_de_entrada":1,"g6_botones":6,"g6_slots_convencion":{"K1_logo":[{"id":90,"padre":89,"tipo":"IMG","caja":{"x":37,"y":25.5,"w":88.59375,"h":35},"parcial":false,"identidad":{"alt":"Logo exito.com"},"enlace_ancestro":89,"href_del_ancestro":"/"},{"id":102,"padre":101,"tipo":"IMG","caja":{"x":1059.453125,"y":33,"w":20,"h":20},"parcial":false,"identidad":{"alt":null},"enlace_ancestro":null,"href_del_ancestro":null},{"id":109,"padre":100,"tipo":"SVG","caja":{"x":1224.046875,"y":36.5,"w":13,"h":13},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":118,"padre":117,"tipo":"IMG","caja":{"x":1288.5625,"y":22.953125,"w":24,"h":24},"parcial":false,"identidad":{"alt":"Mi cuenta"},"enlace_ancestro":116,"href_del_ancestro":"https://tienda.exito.com/authentication?returnUrl=/_v/private/host-picker/www.exito.com?currentPage=/"},{"id":125,"padre":124,"tipo":"IMG","caja":{"x":1366.546875,"y":22.953125,"w":24,"h":24},"parcial":false,"identidad":{"alt":"Carrito"},"enlace_ancestro":null,"href_del_ancestro":null},{"id":174,"padre":173,"tipo":"IMG","caja":{"x":37,"y":86,"w":20,"h":20},"parcial":false,"identidad":{"alt":"Menu"},"enlace_ancestro":null,"href_del_ancestro":null},{"id":211,"padre":210,"tipo":"IMG","caja":{"x":1355,"y":88,"w":16,"h":16},"parcial":false,"identidad":{"alt":null},"enlace_ancestro":210,"href_del_ancestro":"/home-centro-de-ayuda"},{"id":213,"padre":212,"tipo":"IMG","caja":{"x":1387,"y":88,"w":16,"h":16},"parcial":false,"identidad":{"alt":null},"enlace_ancestro":212,"href_del_ancestro":"https://api.whatsapp.com/send?phone=573054829046&text=Hola,%20quiero%20realizar%20una%20compra"},{"id":262,"padre":261,"tipo":"IMG","caja":{"x":37,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"identidad":{"alt":"Iphone 17 Pro Max","title":"Iphone 17 Pro Max"},"enlace_ancestro":261,"href_del_ancestro":"/coleccion/31792"},{"id":265,"padre":264,"tipo":"IMG","caja":{"x":501,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"identidad":{"alt":"Vinos, mercado y aseos","title":"Vinos, mercado y aseos"},"enlace_ancestro":264,"href_del_ancestro":"/coleccion/31400?productClusterIds=31400&facets=productClusterIds&sort=orders_desc&page=0"},{"id":268,"padre":267,"tipo":"IMG","caja":{"x":965,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"identidad":{"alt":"Web-Convertidor-textil-hogar","title":"Colchón Spring"},"enlace_ancestro":267,"href_del_ancestro":"/coleccion/10532"},{"id":403,"padre":402,"tipo":"IMG","caja":{"x":37,"y":758.5625,"w":1366,"h":141.4375},"parcial":true,"identidad":{"alt":null,"title":null},"enlace_ancestro":null,"href_del_ancestro":null},{"id":414,"padre":413,"tipo":"IMG","caja":{"x":57,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"identidad":{"title":"Proyector Samsung 100\"","alt":"Web-Crono-Tras-AyV"},"enlace_ancestro":413,"href_del_ancestro":"/proyector-samsung-100-pulgadas-led-fhd-lifestyle-sp-lff3claxxzl-3156490/p"},{"id":417,"padre":416,"tipo":"IMG","caja":{"x":378,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"identidad":{"title":"Nevera LG 420 Lts","alt":"Web-Crono-Tras-Electro"},"enlace_ancestro":416,"href_del_ancestro":"/nevera-bottom-freezer-tecnolog-lg-gb41wppapzcclm-3039571/p"},{"id":420,"padre":419,"tipo":"IMG","caja":{"x":699,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"identidad":{"title":"All in One ACER C24 AMD","alt":"Web-Crono-Tras-informatica"},"enlace_ancestro":419,"href_del_ancestro":"/all-in-one-acer-aio-c24-2g-lr1a-amd-ryzen-7-5825u-ryzen-7-5825u-ram-16-gb-1-tb-ssd-c24-2g-lr1a-3248110/p"},{"id":423,"padre":422,"tipo":"IMG","caja":{"x":1020,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"identidad":{"title":"Note Edge 256GB","alt":"Web-Crono-Tras-Celulares"},"enlace_ancestro":422,"href_del_ancestro":"/coleccion/22509"},{"id":426,"padre":425,"tipo":"IMG","caja":{"x":1341,"y":864.3125,"w":99,"h":35.6875},"parcial":true,"identidad":{"title":"Consola Nintendo Switch 2","alt":"Web-Crono-Tras-MKP"},"enlace_ancestro":425,"href_del_ancestro":"/coleccion/2676"},{"id":3019,"padre":3018,"tipo":"SVG","caja":{"x":913,"y":102,"w":26,"h":26},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":3023,"padre":3022,"tipo":"IMG","caja":{"x":517,"y":148,"w":406,"h":604},"parcial":false,"identidad":{"alt":"HP Táctil Intel Core Ultra 5","title":"HP Táctil Intel Core Ultra 5"},"enlace_ancestro":3022,"href_del_ancestro":"/computador-portatil-hp-intel-core-ultra-5-225u-core-ultra-5-225u-ram-16-gb-512-gb-ssd-15-fd2359la-3248884/p"}],"K2_buscador":[93,94,95],"K3_cuenta_carrito":[0,81,82,89,94,95,100,116,122,172,178,182,186,195,198,201,204,207,210,212,258,261,264,267,410,413,416,419,422,425,3013,3015,3018,3022],"K4_navegacion":[85,174,192,193,194,197,200,203],"K5_campos":[94],"K5_etiquetas":[],"K6_pares_de_botones":[{"izquierda":116,"derecha":122,"padre":114}],"K7_pie":[],"K8_ruta":[]},"g6_contenedores_vacios_total":1,"g6_contenedores_vacios":[{"id":98,"padre":97,"tipo":"SPAN","caja":{"x":1002.453125,"y":32,"w":22,"h":22},"parcial":false}],"g6_separadores_total":0,"g6_separadores":[],"g6_elementos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false,"accionable":true,"identidad":{}},{"id":2,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":81,"padre":2,"tipo":"BODY","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":true,"identidad":{}},{"id":82,"padre":81,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":true,"identidad":{}},{"id":85,"padre":82,"tipo":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":122},"parcial":false,"accionable":false,"identidad":{}},{"id":86,"padre":85,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":122},"parcial":false,"accionable":false,"identidad":{}},{"id":87,"padre":86,"tipo":"DIV","caja":{"x":37,"y":20,"w":1366,"h":90},"parcial":false,"accionable":false,"identidad":{}},{"id":88,"padre":87,"tipo":"DIV","caja":{"x":37,"y":20,"w":1366,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":89,"padre":88,"tipo":"A","caja":{"x":37,"y":25.5,"w":88.59375,"h":35},"parcial":false,"accionable":true,"identidad":{"aria-label":"Volver al inicio","title":"Volver al inicio","href":"/"}},{"id":90,"padre":89,"tipo":"IMG","caja":{"x":37,"y":25.5,"w":88.59375,"h":35},"parcial":false,"accionable":false,"identidad":{"alt":"Logo exito.com"}},{"id":91,"padre":88,"tipo":"DIV","caja":{"x":149.59375,"y":25,"w":883.859375,"h":36},"parcial":false,"accionable":false,"identidad":{}},{"id":92,"padre":91,"tipo":"DIV","caja":{"x":149.59375,"y":25,"w":883.859375,"h":36},"parcial":false,"accionable":false,"identidad":{}},{"id":93,"padre":92,"tipo":"FORM","caja":{"x":149.59375,"y":25,"w":883.859375,"h":36},"parcial":false,"accionable":false,"identidad":{"role":"search"}},{"id":94,"padre":93,"tipo":"INPUT","caja":{"x":149.59375,"y":25,"w":883.859375,"h":36},"parcial":false,"accionable":true,"identidad":{"aria-label":"search"}},{"id":95,"padre":93,"tipo":"BUTTON","caja":{"x":993.453125,"y":25,"w":40,"h":36},"parcial":false,"accionable":true,"identidad":{"type":"submit","aria-label":"Submit Search"}},{"id":96,"padre":95,"tipo":"SPAN","caja":{"x":1002.453125,"y":32,"w":22,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":97,"padre":96,"tipo":"SPAN","caja":{"x":1002.453125,"y":32,"w":22,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":98,"padre":97,"tipo":"SPAN","caja":{"x":1002.453125,"y":32,"w":22,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":99,"padre":88,"tipo":"DIV","caja":{"x":1057.453125,"y":20,"w":181.59375,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":100,"padre":99,"tipo":"BUTTON","caja":{"x":1057.453125,"y":20,"w":181.59375,"h":46},"parcial":false,"accionable":true,"identidad":{}},{"id":101,"padre":100,"tipo":"DIV","caja":{"x":1059.453125,"y":33,"w":20,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":102,"padre":101,"tipo":"IMG","caja":{"x":1059.453125,"y":33,"w":20,"h":20},"parcial":false,"accionable":false,"identidad":{"alt":null}},{"id":103,"padre":100,"tipo":"DIV","caja":{"x":1087.453125,"y":24.90625,"w":128.59375,"h":36.09375},"parcial":false,"accionable":false,"identidad":{}},{"id":104,"padre":103,"tipo":"DIV","caja":{"x":1087.453125,"y":24.90625,"w":128.59375,"h":36.09375},"parcial":false,"accionable":false,"identidad":{}},{"id":105,"padre":104,"tipo":"P","caja":{"x":1096.28125,"y":24.90625,"w":110.9375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":106,"padre":105,"tipo":"#TEXT","caja":{"x":1096.28125,"y":24.90625,"w":110.9375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":107,"padre":104,"tipo":"P","caja":{"x":1087.453125,"y":41,"w":128.59375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":108,"padre":107,"tipo":"#TEXT","caja":{"x":1087.453125,"y":41,"w":128.59375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":109,"padre":100,"tipo":"SVG","caja":{"x":1224.046875,"y":36.5,"w":13,"h":13},"parcial":false,"accionable":false,"identidad":{}},{"id":113,"padre":88,"tipo":"DIV","caja":{"x":1263.046875,"y":20,"w":139.953125,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":114,"padre":113,"tipo":"DIV","caja":{"x":1263.046875,"y":20,"w":139.953125,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":116,"padre":114,"tipo":"A","caja":{"x":1263.046875,"y":20,"w":75.046875,"h":46},"parcial":false,"accionable":true,"identidad":{"href":"https://tienda.exito.com/authentication?returnUrl=/_v/private/host-picker/www.exito.com?currentPage=/","aria-label":"Sign in button"}},{"id":117,"padre":116,"tipo":"DIV","caja":{"x":1288.5625,"y":22.953125,"w":24,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":118,"padre":117,"tipo":"IMG","caja":{"x":1288.5625,"y":22.953125,"w":24,"h":24},"parcial":false,"accionable":false,"identidad":{"alt":"Mi cuenta"}},{"id":119,"padre":116,"tipo":"SPAN","caja":{"x":1265.046875,"y":44.953125,"w":71.046875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":120,"padre":119,"tipo":"#TEXT","caja":{"x":1265.046875,"y":44.953125,"w":71.046875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":122,"padre":114,"tipo":"BUTTON","caja":{"x":1354.09375,"y":20,"w":48.90625,"h":46},"parcial":false,"accionable":true,"identidad":{"aria-label":"Cart toggle button"}},{"id":123,"padre":122,"tipo":"DIV","caja":{"x":1366.546875,"y":22.953125,"w":24,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":124,"padre":123,"tipo":"DIV","caja":{"x":1366.546875,"y":22.953125,"w":24,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":125,"padre":124,"tipo":"IMG","caja":{"x":1366.546875,"y":22.953125,"w":24,"h":24},"parcial":false,"accionable":false,"identidad":{"alt":"Carrito"}},{"id":126,"padre":122,"tipo":"SPAN","caja":{"x":1354.09375,"y":44.953125,"w":48.90625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":127,"padre":126,"tipo":"#TEXT","caja":{"x":1354.09375,"y":44.953125,"w":48.90625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":171,"padre":87,"tipo":"DIV","caja":{"x":37,"y":82,"w":1366,"h":28},"parcial":false,"accionable":false,"identidad":{}},{"id":172,"padre":171,"tipo":"BUTTON","caja":{"x":37,"y":86,"w":70.125,"h":20},"parcial":false,"accionable":true,"identidad":{"aria-label":"Abrir menú"}},{"id":173,"padre":172,"tipo":"DIV","caja":{"x":37,"y":86,"w":20,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":174,"padre":173,"tipo":"IMG","caja":{"x":37,"y":86,"w":20,"h":20},"parcial":false,"accionable":false,"identidad":{"alt":"Menu"}},{"id":175,"padre":172,"tipo":"SPAN","caja":{"x":61,"y":84,"w":46.125,"h":23},"parcial":false,"accionable":false,"identidad":{}},{"id":176,"padre":175,"tipo":"#TEXT","caja":{"x":61,"y":84,"w":46.125,"h":23},"parcial":false,"accionable":false,"identidad":{}},{"id":177,"padre":171,"tipo":"DIV","caja":{"x":135.125,"y":85.953125,"w":323.65625,"h":20.046875},"parcial":false,"accionable":false,"identidad":{}},{"id":178,"padre":177,"tipo":"A","caja":{"x":135.125,"y":85.953125,"w":87.8125,"h":20.046875},"parcial":false,"accionable":true,"identidad":{"href":"/mercado/home"}},{"id":179,"padre":178,"tipo":"SPAN","caja":{"x":135.125,"y":86,"w":20,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":180,"padre":178,"tipo":"SPAN","caja":{"x":159.125,"y":85.953125,"w":63.8125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":181,"padre":180,"tipo":"#TEXT","caja":{"x":159.125,"y":85.953125,"w":63.8125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":182,"padre":177,"tipo":"A","caja":{"x":254.9375,"y":85.953125,"w":103.875,"h":20.046875},"parcial":false,"accionable":true,"identidad":{"href":"/tecnologia"}},{"id":183,"padre":182,"tipo":"SPAN","caja":{"x":254.9375,"y":86,"w":20,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":184,"padre":182,"tipo":"SPAN","caja":{"x":278.9375,"y":85.953125,"w":79.875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":185,"padre":184,"tipo":"#TEXT","caja":{"x":278.9375,"y":85.953125,"w":79.875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":186,"padre":177,"tipo":"A","caja":{"x":390.8125,"y":85.953125,"w":67.96875,"h":20.046875},"parcial":false,"accionable":true,"identidad":{"href":"/home-hogar"}},{"id":187,"padre":186,"tipo":"SPAN","caja":{"x":390.8125,"y":86,"w":20,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":188,"padre":186,"tipo":"SPAN","caja":{"x":414.8125,"y":85.953125,"w":43.96875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":189,"padre":188,"tipo":"#TEXT","caja":{"x":414.8125,"y":85.953125,"w":43.96875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":190,"padre":171,"tipo":"SPAN","caja":{"x":490.78125,"y":83.796875,"w":5.359375,"h":23},"parcial":false,"accionable":false,"identidad":{}},{"id":191,"padre":190,"tipo":"#TEXT","caja":{"x":490.78125,"y":83.796875,"w":5.359375,"h":23},"parcial":false,"accionable":false,"identidad":{}},{"id":192,"padre":171,"tipo":"NAV","caja":{"x":516.140625,"y":87,"w":510.453125,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":193,"padre":192,"tipo":"UL","caja":{"x":516.140625,"y":87,"w":510.453125,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":194,"padre":193,"tipo":"LI","caja":{"x":516.140625,"y":87,"w":141.15625,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":195,"padre":194,"tipo":"A","caja":{"x":516.140625,"y":87,"w":141.15625,"h":17},"parcial":false,"accionable":true,"identidad":{"href":"/ofertas-y-promociones?itm_source=Promociones&itm_medium=Promo&itm_campaign=ExclusivosOn"}},{"id":196,"padre":195,"tipo":"#TEXT","caja":{"x":516.140625,"y":87,"w":141.15625,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":197,"padre":193,"tipo":"LI","caja":{"x":673.296875,"y":87,"w":89.75,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":198,"padre":197,"tipo":"A","caja":{"x":673.296875,"y":87,"w":89.75,"h":17},"parcial":false,"accionable":true,"identidad":{"href":"/super-combos"}},{"id":199,"padre":198,"tipo":"#TEXT","caja":{"x":673.296875,"y":87,"w":89.75,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":200,"padre":193,"tipo":"LI","caja":{"x":779.046875,"y":87,"w":100.265625,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":201,"padre":200,"tipo":"A","caja":{"x":779.046875,"y":87,"w":100.265625,"h":17},"parcial":false,"accionable":true,"identidad":{"href":"/referidos-exito"}},{"id":202,"padre":201,"tipo":"#TEXT","caja":{"x":779.046875,"y":87,"w":100.265625,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":203,"padre":193,"tipo":"LI","caja":{"x":895.3125,"y":87,"w":131.28125,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":204,"padre":203,"tipo":"A","caja":{"x":895.3125,"y":87,"w":131.28125,"h":17},"parcial":false,"accionable":true,"identidad":{"href":"/mercado/home"}},{"id":205,"padre":204,"tipo":"#TEXT","caja":{"x":895.3125,"y":87,"w":131.28125,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":206,"padre":171,"tipo":"DIV","caja":{"x":1215.53125,"y":87.09375,"w":187.46875,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":207,"padre":206,"tipo":"A","caja":{"x":1215.53125,"y":87.09375,"w":123.46875,"h":17},"parcial":false,"accionable":true,"identidad":{"href":"/marketplace"}},{"id":208,"padre":207,"tipo":"SPAN","caja":{"x":1215.53125,"y":87.09375,"w":123.46875,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":209,"padre":208,"tipo":"#TEXT","caja":{"x":1215.53125,"y":87.09375,"w":123.46875,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":210,"padre":206,"tipo":"A","caja":{"x":1355,"y":88,"w":16,"h":16},"parcial":false,"accionable":true,"identidad":{"href":"/home-centro-de-ayuda"}},{"id":211,"padre":210,"tipo":"IMG","caja":{"x":1355,"y":88,"w":16,"h":16},"parcial":false,"accionable":false,"identidad":{"alt":null}},{"id":212,"padre":206,"tipo":"A","caja":{"x":1387,"y":88,"w":16,"h":16},"parcial":false,"accionable":true,"identidad":{"href":"https://api.whatsapp.com/send?phone=573054829046&text=Hola,%20quiero%20realizar%20una%20compra"}},{"id":213,"padre":212,"tipo":"IMG","caja":{"x":1387,"y":88,"w":16,"h":16},"parcial":false,"accionable":false,"identidad":{"alt":null}},{"id":214,"padre":82,"tipo":"MAIN","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":256,"padre":214,"tipo":"DIV","caja":{"x":37,"y":449.515625,"w":1366,"h":167.046875},"parcial":false,"accionable":false,"identidad":{}},{"id":257,"padre":256,"tipo":"DIV","caja":{"x":37,"y":449.515625,"w":1366,"h":167.046875},"parcial":false,"accionable":false,"identidad":{}},{"id":258,"padre":257,"tipo":"DIV","caja":{"x":37,"y":449.515625,"w":1366,"h":167.046875},"parcial":false,"accionable":true,"identidad":{}},{"id":259,"padre":258,"tipo":"DIV","caja":{"x":37,"y":449.515625,"w":1366,"h":167.046875},"parcial":false,"accionable":false,"identidad":{}},{"id":260,"padre":259,"tipo":"DIV","caja":{"x":37,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"accionable":false,"identidad":{}},{"id":261,"padre":260,"tipo":"A","caja":{"x":37,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"accionable":true,"identidad":{"href":"/coleccion/31792"}},{"id":262,"padre":261,"tipo":"IMG","caja":{"x":37,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"accionable":false,"identidad":{"alt":"Iphone 17 Pro Max","title":"Iphone 17 Pro Max"}},{"id":263,"padre":259,"tipo":"DIV","caja":{"x":501,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"accionable":false,"identidad":{}},{"id":264,"padre":263,"tipo":"A","caja":{"x":501,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"accionable":true,"identidad":{"href":"/coleccion/31400?productClusterIds=31400&facets=productClusterIds&sort=orders_desc&page=0"}},{"id":265,"padre":264,"tipo":"IMG","caja":{"x":501,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"accionable":false,"identidad":{"alt":"Vinos, mercado y aseos","title":"Vinos, mercado y aseos"}},{"id":266,"padre":259,"tipo":"DIV","caja":{"x":965,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"accionable":false,"identidad":{}},{"id":267,"padre":266,"tipo":"A","caja":{"x":965,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"accionable":true,"identidad":{"href":"/coleccion/10532"}},{"id":268,"padre":267,"tipo":"IMG","caja":{"x":965,"y":449.515625,"w":438,"h":167.046875},"parcial":false,"accionable":false,"identidad":{"alt":"Web-Convertidor-textil-hogar","title":"Colchón Spring"}},{"id":286,"padre":214,"tipo":"DIV","caja":{"x":856.078125,"y":624.0625,"w":583.921875,"h":28},"parcial":true,"accionable":false,"identidad":{}},{"id":291,"padre":286,"tipo":"P","caja":{"x":962.71875,"y":624.0625,"w":477.28125,"h":28},"parcial":true,"accionable":false,"identidad":{}},{"id":293,"padre":291,"tipo":"B","caja":{"x":1437.953125,"y":624.0625,"w":2.046875,"h":28},"parcial":true,"accionable":false,"identidad":{}},{"id":294,"padre":293,"tipo":"#TEXT","caja":{"x":1437.953125,"y":624.0625,"w":2.046875,"h":28},"parcial":true,"accionable":false,"identidad":{}},{"id":395,"padre":214,"tipo":"DIV","caja":{"x":37,"y":704.0625,"w":1403,"h":195.9375},"parcial":true,"accionable":false,"identidad":{}},{"id":396,"padre":395,"tipo":"SECTION","caja":{"x":37,"y":704.0625,"w":1403,"h":195.9375},"parcial":true,"accionable":false,"identidad":{}},{"id":402,"padre":396,"tipo":"DIV","caja":{"x":37,"y":758.5625,"w":1403,"h":141.4375},"parcial":true,"accionable":false,"identidad":{}},{"id":403,"padre":402,"tipo":"IMG","caja":{"x":37,"y":758.5625,"w":1366,"h":141.4375},"parcial":true,"accionable":false,"identidad":{"alt":null,"title":null}},{"id":407,"padre":402,"tipo":"SPAN","caja":{"x":1193.703125,"y":778.5625,"w":189.296875,"h":63},"parcial":false,"accionable":false,"identidad":{}},{"id":408,"padre":407,"tipo":"#TEXT","caja":{"x":1193.703125,"y":778.5625,"w":189.296875,"h":63},"parcial":false,"accionable":false,"identidad":{}},{"id":410,"padre":402,"tipo":"DIV","caja":{"x":57,"y":864.3125,"w":1383,"h":35.6875},"parcial":true,"accionable":true,"identidad":{}},{"id":411,"padre":410,"tipo":"DIV","caja":{"x":57,"y":864.3125,"w":1383,"h":35.6875},"parcial":true,"accionable":false,"identidad":{}},{"id":412,"padre":411,"tipo":"DIV","caja":{"x":57,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":false,"identidad":{}},{"id":413,"padre":412,"tipo":"A","caja":{"x":57,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":true,"identidad":{"href":"/proyector-samsung-100-pulgadas-led-fhd-lifestyle-sp-lff3claxxzl-3156490/p"}},{"id":414,"padre":413,"tipo":"IMG","caja":{"x":57,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":false,"identidad":{"title":"Proyector Samsung 100\"","alt":"Web-Crono-Tras-AyV"}},{"id":415,"padre":411,"tipo":"DIV","caja":{"x":378,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":false,"identidad":{}},{"id":416,"padre":415,"tipo":"A","caja":{"x":378,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":true,"identidad":{"href":"/nevera-bottom-freezer-tecnolog-lg-gb41wppapzcclm-3039571/p"}},{"id":417,"padre":416,"tipo":"IMG","caja":{"x":378,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":false,"identidad":{"title":"Nevera LG 420 Lts","alt":"Web-Crono-Tras-Electro"}},{"id":418,"padre":411,"tipo":"DIV","caja":{"x":699,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":false,"identidad":{}},{"id":419,"padre":418,"tipo":"A","caja":{"x":699,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":true,"identidad":{"href":"/all-in-one-acer-aio-c24-2g-lr1a-amd-ryzen-7-5825u-ryzen-7-5825u-ram-16-gb-1-tb-ssd-c24-2g-lr1a-3248110/p"}},{"id":420,"padre":419,"tipo":"IMG","caja":{"x":699,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":false,"identidad":{"title":"All in One ACER C24 AMD","alt":"Web-Crono-Tras-informatica"}},{"id":421,"padre":411,"tipo":"DIV","caja":{"x":1020,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":false,"identidad":{}},{"id":422,"padre":421,"tipo":"A","caja":{"x":1020,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":true,"identidad":{"href":"/coleccion/22509"}},{"id":423,"padre":422,"tipo":"IMG","caja":{"x":1020,"y":864.3125,"w":308,"h":35.6875},"parcial":true,"accionable":false,"identidad":{"title":"Note Edge 256GB","alt":"Web-Crono-Tras-Celulares"}},{"id":424,"padre":411,"tipo":"DIV","caja":{"x":1341,"y":864.3125,"w":99,"h":35.6875},"parcial":true,"accionable":false,"identidad":{}},{"id":425,"padre":424,"tipo":"A","caja":{"x":1341,"y":864.3125,"w":99,"h":35.6875},"parcial":true,"accionable":true,"identidad":{"href":"/coleccion/2676"}},{"id":426,"padre":425,"tipo":"IMG","caja":{"x":1341,"y":864.3125,"w":99,"h":35.6875},"parcial":true,"accionable":false,"identidad":{"title":"Consola Nintendo Switch 2","alt":"Web-Crono-Tras-MKP"}},{"id":2520,"padre":214,"tipo":"::BEFORE","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false,"accionable":false,"identidad":{}},{"id":3013,"padre":81,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false,"accionable":true,"identidad":{"role":"presentation"}},{"id":3015,"padre":3013,"tipo":"DIV","caja":{"x":504,"y":102,"w":435,"h":663},"parcial":false,"accionable":true,"identidad":{"role":"dialog"}},{"id":3016,"padre":3015,"tipo":"DIV","caja":{"x":504,"y":135,"w":432,"h":630},"parcial":false,"accionable":false,"identidad":{}},{"id":3018,"padre":3016,"tipo":"BUTTON","caja":{"x":530,"y":112,"w":4,"h":46},"parcial":false,"accionable":true,"identidad":{}},{"id":3019,"padre":3018,"tipo":"SVG","caja":{"x":913,"y":102,"w":26,"h":26},"parcial":false,"accionable":false,"identidad":{}},{"id":3021,"padre":3016,"tipo":"DIV","caja":{"x":517,"y":148,"w":406,"h":604},"parcial":false,"accionable":false,"identidad":{}},{"id":3022,"padre":3021,"tipo":"A","caja":{"x":517,"y":148,"w":406,"h":604},"parcial":false,"accionable":true,"identidad":{"href":"/computador-portatil-hp-intel-core-ultra-5-225u-core-ultra-5-225u-ram-16-gb-512-gb-ssd-15-fd2359la-3248884/p"}},{"id":3023,"padre":3022,"tipo":"IMG","caja":{"x":517,"y":148,"w":406,"h":604},"parcial":false,"accionable":false,"identidad":{"alt":"HP Táctil Intel Core Ultra 5","title":"HP Táctil Intel Core Ultra 5"}}],"g6_parentesco":[[0,null],[2,0],[81,2],[82,81],[85,82],[86,85],[87,86],[88,87],[89,88],[90,89],[91,88],[92,91],[93,92],[94,93],[95,93],[96,95],[97,96],[98,97],[99,88],[100,99],[101,100],[102,101],[103,100],[104,103],[105,104],[106,105],[107,104],[108,107],[109,100],[110,109],[111,110],[112,111],[113,88],[114,113],[116,114],[117,116],[118,117],[119,116],[120,119],[122,114],[123,122],[124,123],[125,124],[126,122],[127,126],[171,87],[172,171],[173,172],[174,173],[175,172],[176,175],[177,171],[178,177],[179,178],[180,178],[181,180],[182,177],[183,182],[184,182],[185,184],[186,177],[187,186],[188,186],[189,188],[190,171],[191,190],[192,171],[193,192],[194,193],[195,194],[196,195],[197,193],[198,197],[199,198],[200,193],[201,200],[202,201],[203,193],[204,203],[205,204],[206,171],[207,206],[208,207],[209,208],[210,206],[211,210],[212,206],[213,212],[214,82],[256,214],[257,256],[258,257],[259,258],[260,259],[261,260],[262,261],[263,259],[264,263],[265,264],[266,259],[267,266],[268,267],[286,214],[291,286],[293,291],[294,293],[395,214],[396,395],[402,396],[403,402],[407,402],[408,407],[410,402],[411,410],[412,411],[413,412],[414,413],[415,411],[416,415],[417,416],[418,411],[419,418],[420,419],[421,411],[422,421],[423,422],[424,411],[425,424],[426,425],[2520,214],[2972,82],[3013,81],[3015,3013],[3016,3015],[3018,3016],[3019,3018],[3020,3019],[3021,3016],[3022,3021],[3023,3022]],"g6_catalogo_convenciones":"v1, 2026-09-10, ocho convenciones K1..K8 en la rubrica de G6","g6_limites":["Se buscan candidatos en todas las posiciones visibles; estar en una ranura no certifica función ni incumplimiento.","Las listas son completas para los nodos retenidos; pueden faltar ancestros o atributos. Sin href observado no se demuestra que el logo carezca de enlace.","La ausencia de un pie o una ruta en el viewport no demuestra que el sitio carezca de ellos. No inferir estructura fuera de pantalla.","No se registran texto, valores de campos ni asociaciones for/id que el snapshot no conserva. Las etiquetas y operaciones requieren screenshot.","Contenedores vacíos y separadores son candidatos a R, no redundancias confirmadas. No contar ancestros y descendientes como el mismo hallazgo duplicado.","La lectura de R, T y convenciones usa screenshot: esta no es una comparación limpia entre canales."],"g6_criterios_con_lectura_de_texto":["R","T","K_ap","K"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g6"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["R","T","K","ninguna",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","R","T","K_ap","K","K_broken","catalog_version","convenciones","R_ids","bloques_ids","R_bloques_ids","R_distribucion","T_operaciones","T_evaluable","elimina_trabajo","mejora_ids"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"R":{"type":["integer","null"],"minimum":0},"T":{"type":["integer","null"],"minimum":0},"K_ap":{"type":"integer","minimum":0},"K":{"type":"integer","minimum":0},"K_broken":{"type":"array","items":{"type":"string"}},"catalog_version":{"type":"string","const":"v1, 2026-09-10"},"convenciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","aplica","cumple","evidencia_ids","razon"],"properties":{"id":{"enum":["K1","K2","K3","K4","K5","K6","K7","K8"],"type":"string"},"aplica":{"type":["boolean","null"]},"cumple":{"type":["boolean","null"]},"evidencia_ids":{"type":"array","items":{"type":"integer"}},"razon":{"type":"string"}}}},"R_ids":{"type":"array","items":{"type":"integer"}},"bloques_ids":{"type":"array","items":{"type":"integer"}},"R_bloques_ids":{"type":"array","items":{"type":"integer"}},"R_distribucion":{"enum":["ninguna","aislada","intermedia","generalizada","indeterminada"],"type":"string"},"T_operaciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","descripcion","datos_ids"],"properties":{"id":{"type":"integer"},"descripcion":{"type":"string"},"datos_ids":{"type":"array","items":{"type":"integer"}}}}},"T_evaluable":{"type":["boolean","null"]},"elimina_trabajo":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"con_advertencias","integridad_ok":true,"capas_sin_resolver":true,"advertencias":["capa sin cerrar sobre el 100% del viewport","El control de sanidad marcó esta captura.","Los nodos guardados incluyen un posible diálogo visible (3015). Confirmar en la imagen si tapa contenido.","Queda una capa o un aviso sin resolver. No presentar la página como despejada.","El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"2835cfbb71c3795bf682eac99d5e5044c50fffd222cd4bdbd53de06c057dc6a1","wireframe":"293bf55dd3966c567408a91cad78ee759e79d4631d9a05d764a2013a39a381ec"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.