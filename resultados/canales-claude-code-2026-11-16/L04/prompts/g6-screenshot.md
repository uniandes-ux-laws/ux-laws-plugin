# Ejecución 1.0.0

Evalúa solo G6, captura captures/L04.

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
{"pagina":{"id":"L04","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:18:17.644Z","sanity_ok":null,"consent_limpio":null},"group_id":"g6","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g6":{"g6_campos_de_entrada":2,"g6_botones":19,"g6_slots_convencion":{"K1_logo":[{"id":121,"padre":120,"tipo":"IMG","caja":{"x":35,"y":8,"w":24,"h":24},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":166,"padre":165,"tipo":"IMG","caja":{"x":105,"y":56,"w":144,"h":48},"parcial":false,"identidad":{"alt":"Wingo"},"enlace_ancestro":165,"href_del_ancestro":"/"},{"id":193,"padre":192,"tipo":"IMG","caja":{"x":1265.296875,"y":69.75,"w":20,"h":20},"parcial":false,"identidad":{},"enlace_ancestro":191,"href_del_ancestro":"/"},{"id":218,"padre":214,"tipo":"IMG","caja":{"x":1382,"y":842,"w":36,"h":36},"parcial":false,"identidad":{"alt":null},"enlace_ancestro":null,"href_del_ancestro":null},{"id":223,"padre":null,"tipo":"SVG","caja":{"x":1388,"y":848,"w":24,"h":24},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":484,"padre":477,"tipo":"SVG","caja":{"x":750,"y":193,"w":12,"h":8},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":582,"padre":581,"tipo":"SVG","caja":{"x":1195,"y":191.328125,"w":14,"h":14},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":1403,"padre":1397,"tipo":"SVG","caja":{"x":1119.609375,"y":240.9375,"w":18,"h":18},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":1826,"padre":1825,"tipo":"IMG","caja":{"x":225.8125,"y":762.390625,"w":50,"h":50},"parcial":false,"identidad":{"alt":"Buena Onda"},"enlace_ancestro":null,"href_del_ancestro":null},{"id":1847,"padre":1846,"tipo":"IMG","caja":{"x":582.46875,"y":762.390625,"w":50,"h":50},"parcial":false,"identidad":{"alt":"Precios Bajos"},"enlace_ancestro":null,"href_del_ancestro":null},{"id":1868,"padre":1867,"tipo":"IMG","caja":{"x":939.140625,"y":762.390625,"w":50,"h":50},"parcial":false,"identidad":{"alt":"Vuelos seguros"},"enlace_ancestro":null,"href_del_ancestro":null}],"K2_buscador":[454,469,473,1397,1505],"K3_cuenta_carrito":[0,113,120,126,147,153,157,158,159,160,161,165,175,178,182,185,188,191,214,454,456,458,460,462,469,470,473,474,477,579,587,1113,1115,1116,1397,1414,1418,1469,1503,1505,1760,1766,1770,1774,1778,1782,1786,1790],"K4_navegacion":[162,164,165,170,171,172,173,181,182,184,185,187,188,190,191,192,455],"K5_campos":[469,473],"K5_etiquetas":[470,474,477,590,1119],"K6_pares_de_botones":[{"izquierda":456,"derecha":458,"padre":455},{"izquierda":458,"derecha":460,"padre":455},{"izquierda":460,"derecha":462,"padre":455}],"K7_pie":[],"K8_ruta":[]},"g6_contenedores_vacios_total":1,"g6_contenedores_vacios":[{"id":1474,"padre":1472,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":500},"parcial":false}],"g6_separadores_total":2,"g6_separadores":[{"id":854,"padre":586,"tipo":"#TEXT","caja":{"x":0,"y":898,"w":116.625,"h":2},"parcial":true},{"id":1128,"padre":586,"tipo":"#TEXT","caja":{"x":0,"y":898,"w":96.875,"h":2},"parcial":true}],"g6_elementos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false,"accionable":true,"identidad":{}},{"id":2,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":110,"padre":2,"tipo":"BODY","caja":{"x":0,"y":123.1875,"w":1440,"h":776.8125},"parcial":true,"accionable":false,"identidad":{}},{"id":113,"padre":110,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":true,"identidad":{}},{"id":114,"padre":113,"tipo":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":124},"parcial":true,"accionable":false,"identidad":{}},{"id":115,"padre":114,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":40},"parcial":false,"accionable":false,"identidad":{}},{"id":116,"padre":115,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":40},"parcial":false,"accionable":false,"identidad":{}},{"id":117,"padre":116,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":40},"parcial":true,"accionable":false,"identidad":{}},{"id":118,"padre":117,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":40},"parcial":false,"accionable":false,"identidad":{}},{"id":119,"padre":118,"tipo":"DIV","caja":{"x":0,"y":8,"w":1114.484375,"h":24},"parcial":true,"accionable":false,"identidad":{}},{"id":120,"padre":119,"tipo":"DIV","caja":{"x":35,"y":8,"w":24,"h":24},"parcial":false,"accionable":true,"identidad":{}},{"id":121,"padre":120,"tipo":"IMG","caja":{"x":35,"y":8,"w":24,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":122,"padre":119,"tipo":"DIV","caja":{"x":0,"y":10,"w":1114.484375,"h":20},"parcial":true,"accionable":false,"identidad":{}},{"id":123,"padre":122,"tipo":"DIV","caja":{"x":0,"y":10,"w":1114.484375,"h":20},"parcial":true,"accionable":false,"identidad":{}},{"id":124,"padre":123,"tipo":"#TEXT","caja":{"x":0,"y":10,"w":1114.484375,"h":20},"parcial":true,"accionable":false,"identidad":{}},{"id":125,"padre":119,"tipo":"DIV","caja":{"x":986.9375,"y":9,"w":71.40625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":126,"padre":125,"tipo":"DIV","caja":{"x":986.9375,"y":9,"w":10.53125,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":129,"padre":126,"tipo":"#TEXT","caja":{"x":986.9375,"y":9,"w":10.53125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":132,"padre":125,"tipo":"DIV","caja":{"x":1002.125,"y":9,"w":40.734375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":133,"padre":132,"tipo":"SPAN","caja":{"x":1002.125,"y":9,"w":10.890625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":134,"padre":133,"tipo":"#TEXT","caja":{"x":1002.125,"y":9,"w":6.4375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":136,"padre":133,"tipo":"#TEXT","caja":{"x":1008.5625,"y":9,"w":4.453125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":137,"padre":132,"tipo":"SPAN","caja":{"x":1013.015625,"y":9,"w":23.40625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":140,"padre":137,"tipo":"#TEXT","caja":{"x":1013.015625,"y":9,"w":18.953125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":142,"padre":137,"tipo":"#TEXT","caja":{"x":1031.96875,"y":9,"w":4.453125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":143,"padre":132,"tipo":"SPAN","caja":{"x":1036.421875,"y":9,"w":6.4375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":146,"padre":143,"tipo":"#TEXT","caja":{"x":1036.421875,"y":9,"w":6.4375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":147,"padre":125,"tipo":"DIV","caja":{"x":1047.8125,"y":9,"w":10.53125,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":150,"padre":147,"tipo":"#TEXT","caja":{"x":1047.8125,"y":9,"w":10.53125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":153,"padre":116,"tipo":"A","caja":{"x":0,"y":0,"w":1380,"h":30},"parcial":false,"accionable":true,"identidad":{"href":"https://www.wingo.com/servicio-al-viajero/estado-de-vuelos"}},{"id":154,"padre":153,"tipo":"::BEFORE","caja":{"x":1236.59375,"y":9,"w":1,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":155,"padre":153,"tipo":"#TEXT","caja":{"x":1251.59375,"y":10,"w":128.40625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":156,"padre":116,"tipo":"DIV","caja":{"x":1087,"y":10,"w":125,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":157,"padre":156,"tipo":"I","caja":{"x":1087,"y":13,"w":12,"h":13},"parcial":false,"accionable":true,"identidad":{}},{"id":158,"padre":156,"tipo":"I","caja":{"x":1107,"y":10,"w":16,"h":16},"parcial":false,"accionable":true,"identidad":{}},{"id":159,"padre":156,"tipo":"I","caja":{"x":1139,"y":12,"w":14,"h":14},"parcial":false,"accionable":true,"identidad":{}},{"id":160,"padre":156,"tipo":"I","caja":{"x":1169,"y":14,"w":13,"h":12},"parcial":false,"accionable":true,"identidad":{}},{"id":161,"padre":156,"tipo":"I","caja":{"x":1198,"y":16,"w":14,"h":10},"parcial":false,"accionable":true,"identidad":{}},{"id":162,"padre":114,"tipo":"SECTION","caja":{"x":0,"y":40,"w":1440,"h":84},"parcial":false,"accionable":false,"identidad":{}},{"id":163,"padre":162,"tipo":"DIV","caja":{"x":105,"y":56,"w":1214,"h":48},"parcial":false,"accionable":false,"identidad":{}},{"id":164,"padre":163,"tipo":"DIV","caja":{"x":105,"y":56,"w":1214,"h":48},"parcial":false,"accionable":false,"identidad":{}},{"id":165,"padre":164,"tipo":"A","caja":{"x":105,"y":56,"w":144,"h":48},"parcial":false,"accionable":true,"identidad":{"href":"/","title":"Ir a"}},{"id":166,"padre":165,"tipo":"IMG","caja":{"x":105,"y":56,"w":144,"h":48},"parcial":false,"accionable":false,"identidad":{"alt":"Wingo"}},{"id":170,"padre":164,"tipo":"DIV","caja":{"x":585.3125,"y":64.25,"w":733.6875,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":171,"padre":170,"tipo":"UL","caja":{"x":585.3125,"y":64.25,"w":733.6875,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":172,"padre":171,"tipo":"LI","caja":{"x":585.3125,"y":64.25,"w":179.453125,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":173,"padre":172,"tipo":"DIV","caja":{"x":585.3125,"y":64.25,"w":179.453125,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":174,"padre":173,"tipo":"DIV","caja":{"x":585.3125,"y":64.25,"w":179.453125,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":175,"padre":174,"tipo":"A","caja":{"x":585.3125,"y":69.25,"w":82.09375,"h":20},"parcial":false,"accionable":true,"identidad":{"href":"https://reserva.wingo.com/#/admin/login/es/manage"}},{"id":176,"padre":175,"tipo":"DIV","caja":{"x":585.3125,"y":69.25,"w":82.09375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":177,"padre":176,"tipo":"#TEXT","caja":{"x":585.3125,"y":69.25,"w":82.09375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":178,"padre":174,"tipo":"A","caja":{"x":674.40625,"y":64.25,"w":90.359375,"h":30},"parcial":false,"accionable":true,"identidad":{"href":"https://reserva.wingo.com/#/admin/login/es/check-in"}},{"id":179,"padre":178,"tipo":"DIV","caja":{"x":674.40625,"y":64.25,"w":90.359375,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":180,"padre":179,"tipo":"#TEXT","caja":{"x":681.40625,"y":69.25,"w":76.359375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":181,"padre":171,"tipo":"LI","caja":{"x":794.765625,"y":70.75,"w":176.5,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":182,"padre":181,"tipo":"A","caja":{"x":794.765625,"y":70.75,"w":176.5,"h":20},"parcial":false,"accionable":true,"identidad":{"href":"/"}},{"id":183,"padre":182,"tipo":"#TEXT","caja":{"x":794.765625,"y":70.75,"w":176.5,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":184,"padre":171,"tipo":"LI","caja":{"x":1003.265625,"y":70.75,"w":152,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":185,"padre":184,"tipo":"A","caja":{"x":1003.265625,"y":70.75,"w":152,"h":20},"parcial":false,"accionable":true,"identidad":{"href":"/"}},{"id":186,"padre":185,"tipo":"#TEXT","caja":{"x":1003.265625,"y":70.75,"w":152,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":187,"padre":171,"tipo":"LI","caja":{"x":1187.265625,"y":70.75,"w":46.03125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":188,"padre":187,"tipo":"A","caja":{"x":1187.265625,"y":70.75,"w":46.03125,"h":20},"parcial":false,"accionable":true,"identidad":{"href":"/"}},{"id":189,"padre":188,"tipo":"#TEXT","caja":{"x":1187.265625,"y":70.75,"w":46.03125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":190,"padre":171,"tipo":"LI","caja":{"x":1265.296875,"y":69.75,"w":53.703125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":191,"padre":190,"tipo":"A","caja":{"x":1265.296875,"y":69.75,"w":53.703125,"h":20},"parcial":false,"accionable":true,"identidad":{"href":"/"}},{"id":192,"padre":191,"tipo":"DIV","caja":{"x":1265.296875,"y":69.75,"w":53.703125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":193,"padre":192,"tipo":"IMG","caja":{"x":1265.296875,"y":69.75,"w":20,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":194,"padre":192,"tipo":"DIV","caja":{"x":1289.484375,"y":69.75,"w":29.515625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":195,"padre":194,"tipo":"#TEXT","caja":{"x":1289.484375,"y":69.75,"w":29.515625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":209,"padre":null,"tipo":"DF-MESSENGER-CHAT-BUBBLE","caja":{"x":1376,"y":836,"w":48,"h":48},"parcial":false,"accionable":false,"identidad":{}},{"id":212,"padre":209,"tipo":"DIV","caja":{"x":1376,"y":836,"w":48,"h":48},"parcial":false,"accionable":false,"identidad":{}},{"id":214,"padre":212,"tipo":"BUTTON","caja":{"x":1376,"y":836,"w":48,"h":48},"parcial":false,"accionable":true,"identidad":{"aria-label":"Abrir Violeta"}},{"id":218,"padre":214,"tipo":"IMG","caja":{"x":1382,"y":842,"w":36,"h":36},"parcial":false,"accionable":false,"identidad":{"alt":null}},{"id":223,"padre":null,"tipo":"SVG","caja":{"x":1388,"y":848,"w":24,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":449,"padre":113,"tipo":"MAIN","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":450,"padre":449,"tipo":"SECTION","caja":{"x":0,"y":123.1875,"w":1440,"h":776.8125},"parcial":true,"accionable":false,"identidad":{}},{"id":451,"padre":450,"tipo":"DIV","caja":{"x":0,"y":124,"w":1440,"h":776},"parcial":true,"accionable":false,"identidad":{}},{"id":452,"padre":451,"tipo":"DIV","caja":{"x":0,"y":124,"w":1440,"h":776},"parcial":true,"accionable":false,"identidad":{}},{"id":454,"padre":452,"tipo":"DIV","caja":{"x":208,"y":124,"w":1024,"h":177.890625},"parcial":false,"accionable":true,"identidad":{}},{"id":455,"padre":454,"tipo":"DIV","caja":{"x":224,"y":144,"w":324.578125,"h":32},"parcial":false,"accionable":false,"identidad":{"role":"tablist"}},{"id":456,"padre":455,"tipo":"BUTTON","caja":{"x":224,"y":144,"w":66.921875,"h":32},"parcial":false,"accionable":true,"identidad":{"type":"button","role":"tab"}},{"id":457,"padre":456,"tipo":"#TEXT","caja":{"x":236,"y":150,"w":42.921875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":458,"padre":455,"tipo":"BUTTON","caja":{"x":294.921875,"y":144,"w":123.3125,"h":32},"parcial":false,"accionable":true,"identidad":{"type":"button","role":"tab"}},{"id":459,"padre":458,"tipo":"#TEXT","caja":{"x":306.921875,"y":150,"w":99.3125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":460,"padre":455,"tipo":"BUTTON","caja":{"x":422.234375,"y":144,"w":63.4375,"h":32},"parcial":false,"accionable":true,"identidad":{"type":"button","role":"tab"}},{"id":461,"padre":460,"tipo":"#TEXT","caja":{"x":434.234375,"y":150,"w":39.4375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":462,"padre":455,"tipo":"BUTTON","caja":{"x":489.671875,"y":144,"w":58.90625,"h":32},"parcial":false,"accionable":true,"identidad":{"type":"button","role":"tab"}},{"id":463,"padre":462,"tipo":"#TEXT","caja":{"x":501.671875,"y":150,"w":34.90625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":464,"padre":454,"tipo":"DIV","caja":{"x":0,"y":183,"w":1440,"h":717},"parcial":true,"accionable":false,"identidad":{}},{"id":465,"padre":464,"tipo":"DIV","caja":{"x":0,"y":183,"w":1440,"h":717},"parcial":true,"accionable":false,"identidad":{"role":"tabpanel"}},{"id":466,"padre":465,"tipo":"DIV","caja":{"x":224,"y":183,"w":985,"h":28},"parcial":false,"accionable":false,"identidad":{}},{"id":467,"padre":466,"tipo":"DIV","caja":{"x":224,"y":187,"w":208.328125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":468,"padre":467,"tipo":"DIV","caja":{"x":224,"y":187,"w":107.421875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":469,"padre":468,"tipo":"INPUT","caja":{"x":224,"y":190,"w":14,"h":14},"parcial":false,"accionable":true,"identidad":{"type":"radio"}},{"id":470,"padre":468,"tipo":"LABEL","caja":{"x":245,"y":187,"w":86.421875,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":471,"padre":470,"tipo":"#TEXT","caja":{"x":245,"y":187,"w":86.421875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":472,"padre":467,"tipo":"DIV","caja":{"x":351.421875,"y":187,"w":80.90625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":473,"padre":472,"tipo":"INPUT","caja":{"x":351.421875,"y":190,"w":14,"h":14},"parcial":false,"accionable":true,"identidad":{"type":"radio"}},{"id":474,"padre":472,"tipo":"LABEL","caja":{"x":372.421875,"y":187,"w":59.90625,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":475,"padre":474,"tipo":"#TEXT","caja":{"x":372.421875,"y":187,"w":59.90625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":476,"padre":466,"tipo":"DIV","caja":{"x":633.53125,"y":187,"w":128.46875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":477,"padre":476,"tipo":"LABEL","caja":{"x":633.53125,"y":187,"w":128.46875,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":480,"padre":477,"tipo":"#TEXT","caja":{"x":633.53125,"y":187,"w":63.234375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":481,"padre":477,"tipo":"#TEXT","caja":{"x":696.765625,"y":187,"w":5.1875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":482,"padre":477,"tipo":"SPAN","caja":{"x":708.953125,"y":187,"w":34.046875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":483,"padre":482,"tipo":"#TEXT","caja":{"x":708.953125,"y":187,"w":34.046875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":484,"padre":477,"tipo":"SVG","caja":{"x":750,"y":193,"w":12,"h":8},"parcial":false,"accionable":false,"identidad":{}},{"id":579,"padre":466,"tipo":"BUTTON","caja":{"x":943.1875,"y":183,"w":265.8125,"h":28},"parcial":false,"accionable":true,"identidad":{}},{"id":580,"padre":579,"tipo":"#TEXT","caja":{"x":943.1875,"y":187,"w":241.8125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":581,"padre":579,"tipo":"SPAN","caja":{"x":1195,"y":191.328125,"w":14,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":582,"padre":581,"tipo":"SVG","caja":{"x":1195,"y":191.328125,"w":14,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":584,"padre":465,"tipo":"DIV","caja":{"x":0,"y":218,"w":1440,"h":682},"parcial":true,"accionable":false,"identidad":{}},{"id":585,"padre":584,"tipo":"DIV","caja":{"x":224,"y":218,"w":867.609375,"h":63.890625},"parcial":false,"accionable":false,"identidad":{}},{"id":586,"padre":585,"tipo":"DIV","caja":{"x":0,"y":228,"w":1440,"h":672},"parcial":true,"accionable":false,"identidad":{}},{"id":587,"padre":586,"tipo":"DIV","caja":{"x":238,"y":228,"w":376.453125,"h":38.890625},"parcial":false,"accionable":true,"identidad":{}},{"id":588,"padre":587,"tipo":"DIV","caja":{"x":238,"y":228,"w":376.453125,"h":38.890625},"parcial":false,"accionable":false,"identidad":{}},{"id":589,"padre":588,"tipo":"DIV","caja":{"x":238,"y":228,"w":376.453125,"h":38.890625},"parcial":false,"accionable":false,"identidad":{}},{"id":590,"padre":589,"tipo":"LABEL","caja":{"x":238,"y":228,"w":116.625,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":591,"padre":590,"tipo":"#TEXT","caja":{"x":238,"y":228,"w":116.625,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":592,"padre":589,"tipo":"SPAN","caja":{"x":238,"y":246.890625,"w":115.796875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":593,"padre":592,"tipo":"#TEXT","caja":{"x":238,"y":246.890625,"w":115.796875,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":594,"padre":589,"tipo":"SPAN","caja":{"x":602.453125,"y":246.75,"w":12,"h":9},"parcial":false,"accionable":false,"identidad":{}},{"id":854,"padre":586,"tipo":"#TEXT","caja":{"x":0,"y":898,"w":116.625,"h":2},"parcial":true,"accionable":false,"identidad":{}},{"id":1113,"padre":586,"tipo":"DIV","caja":{"x":640.453125,"y":239.4375,"w":34.703125,"h":19},"parcial":false,"accionable":true,"identidad":{}},{"id":1114,"padre":1113,"tipo":"DIV","caja":{"x":640.453125,"y":239.4375,"w":34.703125,"h":1},"parcial":false,"accionable":false,"identidad":{}},{"id":1115,"padre":1113,"tipo":"BUTTON","caja":{"x":647.796875,"y":240.4375,"w":20,"h":18},"parcial":false,"accionable":true,"identidad":{}},{"id":1116,"padre":586,"tipo":"DIV","caja":{"x":695.15625,"y":228,"w":376.453125,"h":38.890625},"parcial":false,"accionable":true,"identidad":{}},{"id":1117,"padre":1116,"tipo":"DIV","caja":{"x":695.15625,"y":228,"w":376.453125,"h":38.890625},"parcial":false,"accionable":false,"identidad":{}},{"id":1118,"padre":1117,"tipo":"DIV","caja":{"x":695.15625,"y":228,"w":376.453125,"h":38.890625},"parcial":false,"accionable":false,"identidad":{}},{"id":1119,"padre":1118,"tipo":"LABEL","caja":{"x":695.15625,"y":228,"w":96.875,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":1120,"padre":1119,"tipo":"#TEXT","caja":{"x":695.15625,"y":228,"w":96.875,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":1121,"padre":1118,"tipo":"SPAN","caja":{"x":695.15625,"y":246.890625,"w":124.0625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":1122,"padre":1121,"tipo":"#TEXT","caja":{"x":695.15625,"y":246.890625,"w":124.0625,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":1123,"padre":1118,"tipo":"SPAN","caja":{"x":1059.609375,"y":246.75,"w":12,"h":9},"parcial":false,"accionable":false,"identidad":{}},{"id":1128,"padre":586,"tipo":"#TEXT","caja":{"x":0,"y":898,"w":96.875,"h":2},"parcial":true,"accionable":false,"identidad":{}},{"id":1397,"padre":584,"tipo":"BUTTON","caja":{"x":1098.609375,"y":218,"w":117.390625,"h":63.890625},"parcial":false,"accionable":true,"identidad":{}},{"id":1398,"padre":1397,"tipo":"SPAN","caja":{"x":1144.609375,"y":240.234375,"w":50.390625,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":1401,"padre":1398,"tipo":"#TEXT","caja":{"x":1144.609375,"y":240.234375,"w":50.390625,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":1403,"padre":1397,"tipo":"SVG","caja":{"x":1119.609375,"y":240.9375,"w":18,"h":18},"parcial":false,"accionable":false,"identidad":{}},{"id":1408,"padre":450,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":1409,"padre":1408,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":546},"parcial":true,"accionable":false,"identidad":{}},{"id":1410,"padre":1409,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":546},"parcial":true,"accionable":false,"identidad":{}},{"id":1411,"padre":1410,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":546},"parcial":false,"accionable":false,"identidad":{}},{"id":1412,"padre":1411,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":523},"parcial":true,"accionable":false,"identidad":{}},{"id":1413,"padre":1412,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":523},"parcial":true,"accionable":false,"identidad":{}},{"id":1414,"padre":1413,"tipo":"BUTTON","caja":{"x":0,"y":146.1875,"w":122.390625,"h":500},"parcial":false,"accionable":true,"identidad":{"type":"button"}},{"id":1415,"padre":1414,"tipo":"::BEFORE","caja":{"x":68.390625,"y":436.1875,"w":49,"h":49},"parcial":false,"accionable":false,"identidad":{}},{"id":1415,"padre":1414,"tipo":"::BEFORE","caja":{"x":86.21875,"y":436.1875,"w":13.328125,"h":40},"parcial":false,"accionable":false,"identidad":{}},{"id":1418,"padre":1413,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":500},"parcial":true,"accionable":true,"identidad":{}},{"id":1419,"padre":1418,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":500},"parcial":true,"accionable":false,"identidad":{}},{"id":1469,"padre":1419,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":500},"parcial":false,"accionable":true,"identidad":{}},{"id":1471,"padre":1469,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":500},"parcial":false,"accionable":false,"identidad":{}},{"id":1472,"padre":1471,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":500},"parcial":false,"accionable":false,"identidad":{}},{"id":1474,"padre":1472,"tipo":"DIV","caja":{"x":0,"y":123.1875,"w":1440,"h":500},"parcial":false,"accionable":false,"identidad":{}},{"id":1475,"padre":1472,"tipo":"DIV","caja":{"x":185,"y":315.59375,"w":350,"h":249.203125},"parcial":false,"accionable":false,"identidad":{}},{"id":1476,"padre":1475,"tipo":"DIV","caja":{"x":213,"y":329.59375,"w":264.71875,"h":221.203125},"parcial":false,"accionable":false,"identidad":{}},{"id":1477,"padre":1476,"tipo":"P","caja":{"x":213,"y":329.59375,"w":207.609375,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1478,"padre":1477,"tipo":"SPAN","caja":{"x":213,"y":329.59375,"w":68.53125,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1479,"padre":1478,"tipo":"#TEXT","caja":{"x":213,"y":329.59375,"w":68.53125,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1480,"padre":1477,"tipo":"SPAN","caja":{"x":281.53125,"y":329.59375,"w":21.78125,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1481,"padre":1480,"tipo":"#TEXT","caja":{"x":281.53125,"y":329.59375,"w":5.421875,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1482,"padre":1480,"tipo":"#TEXT","caja":{"x":286.953125,"y":329.59375,"w":10.9375,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1483,"padre":1480,"tipo":"#TEXT","caja":{"x":297.890625,"y":329.59375,"w":5.421875,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1484,"padre":1477,"tipo":"SPAN","caja":{"x":303.3125,"y":329.59375,"w":117.296875,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1485,"padre":1484,"tipo":"#TEXT","caja":{"x":303.3125,"y":329.59375,"w":117.296875,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1486,"padre":1476,"tipo":"SPAN","caja":{"x":213,"y":352.59375,"w":39.375,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":1487,"padre":1486,"tipo":"#TEXT","caja":{"x":213,"y":352.59375,"w":39.375,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":1488,"padre":1476,"tipo":"SPAN","caja":{"x":213,"y":365.59375,"w":264.71875,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":1489,"padre":1488,"tipo":"#TEXT","caja":{"x":213,"y":365.59375,"w":264.71875,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":1491,"padre":1476,"tipo":"SPAN","caja":{"x":213,"y":392.59375,"w":91.0625,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":1492,"padre":1491,"tipo":"#TEXT","caja":{"x":213,"y":392.59375,"w":91.0625,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":1493,"padre":1476,"tipo":"P","caja":{"x":213,"y":416.59375,"w":117.59375,"h":52},"parcial":false,"accionable":false,"identidad":{}},{"id":1494,"padre":1493,"tipo":"SPAN","caja":{"x":213,"y":433.3125,"w":11.828125,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":1495,"padre":1494,"tipo":"#TEXT","caja":{"x":213,"y":433.3125,"w":11.828125,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":1496,"padre":1493,"tipo":"SPAN","caja":{"x":224.828125,"y":416.59375,"w":55.375,"h":52},"parcial":false,"accionable":false,"identidad":{}},{"id":1497,"padre":1496,"tipo":"#TEXT","caja":{"x":224.828125,"y":416.59375,"w":55.375,"h":52},"parcial":false,"accionable":false,"identidad":{}},{"id":1498,"padre":1493,"tipo":"SPAN","caja":{"x":280.203125,"y":416.59375,"w":12.0625,"h":52},"parcial":false,"accionable":false,"identidad":{}},{"id":1499,"padre":1498,"tipo":"#TEXT","caja":{"x":280.203125,"y":416.59375,"w":12.0625,"h":52},"parcial":false,"accionable":false,"identidad":{}},{"id":1500,"padre":1493,"tipo":"SPAN","caja":{"x":292.265625,"y":433.3125,"w":38.328125,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":1501,"padre":1500,"tipo":"#TEXT","caja":{"x":292.265625,"y":433.3125,"w":38.328125,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":1502,"padre":1476,"tipo":"P","caja":{"x":213,"y":480,"w":124.1875,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":1503,"padre":1502,"tipo":"A","caja":{"x":213,"y":480,"w":124.1875,"h":16},"parcial":false,"accionable":true,"identidad":{"role":"button","href":"/terminos-y-condiciones-promociones"}},{"id":1504,"padre":1503,"tipo":"#TEXT","caja":{"x":213,"y":480,"w":124.1875,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":1505,"padre":1476,"tipo":"A","caja":{"x":213,"y":508.796875,"w":155.96875,"h":42},"parcial":false,"accionable":true,"identidad":{"href":"https://booking.wingo.com/es/search/BOG/POP/2027-01-18/1/0/0/1/USD/0/0","role":"button"}},{"id":1506,"padre":1505,"tipo":"#TEXT","caja":{"x":241,"y":518.796875,"w":99.96875,"h":21},"parcial":false,"accionable":false,"identidad":{}},{"id":1760,"padre":1413,"tipo":"BUTTON","caja":{"x":1317.609375,"y":146.1875,"w":122.390625,"h":500},"parcial":false,"accionable":true,"identidad":{"type":"button"}},{"id":1761,"padre":1760,"tipo":"::BEFORE","caja":{"x":1322.609375,"y":436.1875,"w":49,"h":49},"parcial":false,"accionable":false,"identidad":{}},{"id":1761,"padre":1760,"tipo":"::BEFORE","caja":{"x":1340.4375,"y":436.1875,"w":13.328125,"h":40},"parcial":false,"accionable":false,"identidad":{}},{"id":1764,"padre":1413,"tipo":"UL","caja":{"x":188,"y":577,"w":344,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":1765,"padre":1764,"tipo":"LI","caja":{"x":213,"y":590,"w":14,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":1766,"padre":1765,"tipo":"BUTTON","caja":{"x":213,"y":590,"w":13,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":1767,"padre":1766,"tipo":"::BEFORE","caja":{"x":219,"y":596,"w":8,"h":8},"parcial":false,"accionable":false,"identidad":{}},{"id":1769,"padre":1764,"tipo":"LI","caja":{"x":250,"y":590,"w":72,"h":25},"parcial":false,"accionable":false,"identidad":{}},{"id":1770,"padre":1769,"tipo":"BUTTON","caja":{"x":250,"y":590,"w":13,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":1771,"padre":1770,"tipo":"::BEFORE","caja":{"x":250,"y":595,"w":72,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":1771,"padre":1770,"tipo":"::BEFORE","caja":{"x":282,"y":601,"w":8,"h":8},"parcial":false,"accionable":false,"identidad":{}},{"id":1773,"padre":1764,"tipo":"LI","caja":{"x":346,"y":590,"w":14,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":1774,"padre":1773,"tipo":"BUTTON","caja":{"x":346,"y":590,"w":13,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":1775,"padre":1774,"tipo":"::BEFORE","caja":{"x":352,"y":596,"w":8,"h":8},"parcial":false,"accionable":false,"identidad":{}},{"id":1777,"padre":1764,"tipo":"LI","caja":{"x":383,"y":590,"w":14,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":1778,"padre":1777,"tipo":"BUTTON","caja":{"x":383,"y":590,"w":13,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":1779,"padre":1778,"tipo":"::BEFORE","caja":{"x":389,"y":596,"w":8,"h":8},"parcial":false,"accionable":false,"identidad":{}},{"id":1781,"padre":1764,"tipo":"LI","caja":{"x":420,"y":590,"w":14,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":1782,"padre":1781,"tipo":"BUTTON","caja":{"x":420,"y":590,"w":13,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":1783,"padre":1782,"tipo":"::BEFORE","caja":{"x":426,"y":596,"w":8,"h":8},"parcial":false,"accionable":false,"identidad":{}},{"id":1785,"padre":1764,"tipo":"LI","caja":{"x":457,"y":590,"w":14,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":1786,"padre":1785,"tipo":"BUTTON","caja":{"x":457,"y":590,"w":13,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":1787,"padre":1786,"tipo":"::BEFORE","caja":{"x":463,"y":596,"w":8,"h":8},"parcial":false,"accionable":false,"identidad":{}},{"id":1789,"padre":1764,"tipo":"LI","caja":{"x":494,"y":590,"w":14,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":1790,"padre":1789,"tipo":"BUTTON","caja":{"x":494,"y":590,"w":13,"h":20},"parcial":false,"accionable":true,"identidad":{}},{"id":1791,"padre":1790,"tipo":"::BEFORE","caja":{"x":500,"y":596,"w":8,"h":8},"parcial":false,"accionable":false,"identidad":{}},{"id":1793,"padre":1408,"tipo":"DIV","caja":{"x":0,"y":623.1875,"w":1440,"h":276.8125},"parcial":true,"accionable":false,"identidad":{}},{"id":1805,"padre":1793,"tipo":"DIV","caja":{"x":0,"y":623.1875,"w":1440,"h":276.8125},"parcial":true,"accionable":false,"identidad":{}},{"id":1807,"padre":1805,"tipo":"DIV","caja":{"x":520.5625,"y":671.1875,"w":398.859375,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":1809,"padre":1807,"tipo":"H1","caja":{"x":520.5625,"y":671.1875,"w":398.859375,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":1811,"padre":1809,"tipo":"P","caja":{"x":520.5625,"y":671.1875,"w":192.625,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":1812,"padre":1811,"tipo":"#TEXT","caja":{"x":520.5625,"y":671.1875,"w":192.625,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":1814,"padre":1809,"tipo":"P","caja":{"x":720.1875,"y":671.1875,"w":199.234375,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":1815,"padre":1814,"tipo":"#TEXT","caja":{"x":720.1875,"y":671.1875,"w":199.234375,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":1819,"padre":1805,"tipo":"DIV","caja":{"x":192,"y":747.390625,"w":1055.984375,"h":152.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1821,"padre":1819,"tipo":"DIV","caja":{"x":192,"y":747.390625,"w":342.65625,"h":137.40625},"parcial":true,"accionable":false,"identidad":{}},{"id":1823,"padre":1821,"tipo":"DIV","caja":{"x":192,"y":747.390625,"w":342.65625,"h":80},"parcial":false,"accionable":false,"identidad":{}},{"id":1825,"padre":1823,"tipo":"DIV","caja":{"x":225.8125,"y":762.390625,"w":50,"h":50},"parcial":false,"accionable":false,"identidad":{}},{"id":1826,"padre":1825,"tipo":"IMG","caja":{"x":225.8125,"y":762.390625,"w":50,"h":50},"parcial":false,"accionable":false,"identidad":{"alt":"Buena Onda"}},{"id":1828,"padre":1823,"tipo":"DIV","caja":{"x":309.640625,"y":778.390625,"w":91.859375,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":1830,"padre":1828,"tipo":"H3","caja":{"x":309.640625,"y":778.390625,"w":91.859375,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":1831,"padre":1830,"tipo":"#TEXT","caja":{"x":309.640625,"y":778.390625,"w":91.859375,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":1835,"padre":1821,"tipo":"DIV","caja":{"x":196,"y":845.390625,"w":290.328125,"h":39.40625},"parcial":true,"accionable":false,"identidad":{}},{"id":1837,"padre":1835,"tipo":"P","caja":{"x":196,"y":845.390625,"w":290.328125,"h":39.40625},"parcial":false,"accionable":false,"identidad":{}},{"id":1838,"padre":1837,"tipo":"#TEXT","caja":{"x":196,"y":845.390625,"w":290.328125,"h":39.40625},"parcial":false,"accionable":false,"identidad":{}},{"id":1842,"padre":1819,"tipo":"DIV","caja":{"x":548.65625,"y":747.390625,"w":342.671875,"h":152.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1844,"padre":1842,"tipo":"DIV","caja":{"x":548.65625,"y":747.390625,"w":342.671875,"h":80},"parcial":false,"accionable":false,"identidad":{}},{"id":1846,"padre":1844,"tipo":"DIV","caja":{"x":582.46875,"y":762.390625,"w":50,"h":50},"parcial":false,"accionable":false,"identidad":{}},{"id":1847,"padre":1846,"tipo":"IMG","caja":{"x":582.46875,"y":762.390625,"w":50,"h":50},"parcial":false,"accionable":false,"identidad":{"alt":"Precios Bajos"}},{"id":1849,"padre":1844,"tipo":"DIV","caja":{"x":666.296875,"y":764.390625,"w":126.609375,"h":45},"parcial":false,"accionable":false,"identidad":{}},{"id":1851,"padre":1849,"tipo":"H3","caja":{"x":666.296875,"y":764.390625,"w":126.609375,"h":45},"parcial":false,"accionable":false,"identidad":{}},{"id":1852,"padre":1851,"tipo":"#TEXT","caja":{"x":666.296875,"y":764.390625,"w":126.609375,"h":45},"parcial":false,"accionable":false,"identidad":{}},{"id":1856,"padre":1842,"tipo":"DIV","caja":{"x":552.65625,"y":845.390625,"w":331.71875,"h":54.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1858,"padre":1856,"tipo":"P","caja":{"x":552.65625,"y":845.390625,"w":331.71875,"h":54.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1859,"padre":1858,"tipo":"#TEXT","caja":{"x":552.65625,"y":845.390625,"w":331.71875,"h":54.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1863,"padre":1819,"tipo":"DIV","caja":{"x":905.328125,"y":747.390625,"w":342.65625,"h":137.40625},"parcial":true,"accionable":false,"identidad":{}},{"id":1865,"padre":1863,"tipo":"DIV","caja":{"x":905.328125,"y":747.390625,"w":342.65625,"h":80},"parcial":false,"accionable":false,"identidad":{}},{"id":1867,"padre":1865,"tipo":"DIV","caja":{"x":939.140625,"y":762.390625,"w":50,"h":50},"parcial":false,"accionable":false,"identidad":{}},{"id":1868,"padre":1867,"tipo":"IMG","caja":{"x":939.140625,"y":762.390625,"w":50,"h":50},"parcial":false,"accionable":false,"identidad":{"alt":"Vuelos seguros"}},{"id":1870,"padre":1865,"tipo":"DIV","caja":{"x":1022.96875,"y":771.390625,"w":116.109375,"h":31},"parcial":false,"accionable":false,"identidad":{}},{"id":1872,"padre":1870,"tipo":"H3","caja":{"x":1022.96875,"y":771.390625,"w":116.109375,"h":31},"parcial":false,"accionable":false,"identidad":{}},{"id":1873,"padre":1872,"tipo":"#TEXT","caja":{"x":1022.96875,"y":771.390625,"w":116.109375,"h":31},"parcial":false,"accionable":false,"identidad":{}},{"id":1877,"padre":1863,"tipo":"DIV","caja":{"x":909.328125,"y":845.390625,"w":266.828125,"h":39.40625},"parcial":true,"accionable":false,"identidad":{}},{"id":1879,"padre":1877,"tipo":"P","caja":{"x":909.328125,"y":845.390625,"w":266.828125,"h":39.40625},"parcial":false,"accionable":false,"identidad":{}},{"id":1880,"padre":1879,"tipo":"#TEXT","caja":{"x":909.328125,"y":845.390625,"w":266.828125,"h":39.40625},"parcial":false,"accionable":false,"identidad":{}}],"g6_parentesco":[[0,null],[2,0],[110,2],[113,110],[114,113],[115,114],[116,115],[117,116],[118,117],[119,118],[120,119],[121,120],[122,119],[123,122],[124,123],[125,119],[126,125],[129,126],[132,125],[133,132],[134,133],[136,133],[137,132],[140,137],[142,137],[143,132],[146,143],[147,125],[150,147],[153,116],[154,153],[155,153],[156,116],[157,156],[158,156],[159,156],[160,156],[161,156],[162,114],[163,162],[164,163],[165,164],[166,165],[170,164],[171,170],[172,171],[173,172],[174,173],[175,174],[176,175],[177,176],[178,174],[179,178],[180,179],[181,171],[182,181],[183,182],[184,171],[185,184],[186,185],[187,171],[188,187],[189,188],[190,171],[191,190],[192,191],[193,192],[194,192],[195,194],[209,null],[212,209],[214,212],[218,214],[223,null],[225,223],[227,223],[449,113],[450,449],[451,450],[452,451],[454,452],[455,454],[456,455],[457,456],[458,455],[459,458],[460,455],[461,460],[462,455],[463,462],[464,454],[465,464],[466,465],[467,466],[468,467],[469,468],[470,468],[471,470],[472,467],[473,472],[474,472],[475,474],[476,466],[477,476],[480,477],[481,477],[482,477],[483,482],[484,477],[485,484],[579,466],[580,579],[581,579],[582,581],[583,582],[584,465],[585,584],[586,585],[587,586],[588,587],[589,588],[590,589],[591,590],[592,589],[593,592],[594,589],[854,586],[1113,586],[1114,1113],[1115,1113],[1116,586],[1117,1116],[1118,1117],[1119,1118],[1120,1119],[1121,1118],[1122,1121],[1123,1118],[1128,586],[1397,584],[1398,1397],[1401,1398],[1403,1397],[1404,1403],[1408,450],[1409,1408],[1410,1409],[1411,1410],[1412,1411],[1413,1412],[1414,1413],[1415,1414],[1415,1414],[1418,1413],[1419,1418],[1469,1419],[1471,1469],[1472,1471],[1474,1472],[1475,1472],[1476,1475],[1477,1476],[1478,1477],[1479,1478],[1480,1477],[1481,1480],[1482,1480],[1483,1480],[1484,1477],[1485,1484],[1486,1476],[1487,1486],[1488,1476],[1489,1488],[1491,1476],[1492,1491],[1493,1476],[1494,1493],[1495,1494],[1496,1493],[1497,1496],[1498,1493],[1499,1498],[1500,1493],[1501,1500],[1502,1476],[1503,1502],[1504,1503],[1505,1476],[1506,1505],[1760,1413],[1761,1760],[1761,1760],[1764,1413],[1765,1764],[1766,1765],[1767,1766],[1767,1766],[1769,1764],[1770,1769],[1771,1770],[1771,1770],[1773,1764],[1774,1773],[1775,1774],[1775,1774],[1777,1764],[1778,1777],[1779,1778],[1779,1778],[1781,1764],[1782,1781],[1783,1782],[1783,1782],[1785,1764],[1786,1785],[1787,1786],[1787,1786],[1789,1764],[1790,1789],[1791,1790],[1791,1790],[1793,1408],[1805,1793],[1807,1805],[1809,1807],[1811,1809],[1812,1811],[1814,1809],[1815,1814],[1819,1805],[1821,1819],[1823,1821],[1825,1823],[1826,1825],[1828,1823],[1830,1828],[1831,1830],[1835,1821],[1837,1835],[1838,1837],[1842,1819],[1844,1842],[1846,1844],[1847,1846],[1849,1844],[1851,1849],[1852,1851],[1856,1842],[1858,1856],[1859,1858],[1863,1819],[1865,1863],[1867,1865],[1868,1867],[1870,1865],[1872,1870],[1873,1872],[1877,1863],[1879,1877],[1880,1879]],"g6_catalogo_convenciones":"v1, 2026-09-10, ocho convenciones K1..K8 en la rubrica de G6","g6_limites":["Se buscan candidatos en todas las posiciones visibles; estar en una ranura no certifica función ni incumplimiento.","Las listas son completas para los nodos retenidos; pueden faltar ancestros o atributos. Sin href observado no se demuestra que el logo carezca de enlace.","La ausencia de un pie o una ruta en el viewport no demuestra que el sitio carezca de ellos. No inferir estructura fuera de pantalla.","No se registran texto, valores de campos ni asociaciones for/id que el snapshot no conserva. Las etiquetas y operaciones requieren screenshot.","Contenedores vacíos y separadores son candidatos a R, no redundancias confirmadas. No contar ancestros y descendientes como el mismo hallazgo duplicado.","La lectura de R, T y convenciones usa screenshot: esta no es una comparación limpia entre canales."],"g6_criterios_con_lectura_de_texto":["R","T","K_ap","K"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g6"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["R","T","K","ninguna",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","R","T","K_ap","K","K_broken","catalog_version","convenciones","R_ids","bloques_ids","R_bloques_ids","R_distribucion","T_operaciones","T_evaluable","elimina_trabajo","mejora_ids"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"R":{"type":["integer","null"],"minimum":0},"T":{"type":["integer","null"],"minimum":0},"K_ap":{"type":"integer","minimum":0},"K":{"type":"integer","minimum":0},"K_broken":{"type":"array","items":{"type":"string"}},"catalog_version":{"type":"string","const":"v1, 2026-09-10"},"convenciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","aplica","cumple","evidencia_ids","razon"],"properties":{"id":{"enum":["K1","K2","K3","K4","K5","K6","K7","K8"],"type":"string"},"aplica":{"type":["boolean","null"]},"cumple":{"type":["boolean","null"]},"evidencia_ids":{"type":"array","items":{"type":"integer"}},"razon":{"type":"string"}}}},"R_ids":{"type":"array","items":{"type":"integer"}},"bloques_ids":{"type":"array","items":{"type":"integer"}},"R_bloques_ids":{"type":"array","items":{"type":"integer"}},"R_distribucion":{"enum":["ninguna","aislada","intermedia","generalizada","indeterminada"],"type":"string"},"T_operaciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","descripcion","datos_ids"],"properties":{"id":{"type":"integer"},"descripcion":{"type":"string"},"datos_ids":{"type":"array","items":{"type":"integer"}}}}},"T_evaluable":{"type":["boolean","null"]},"elimina_trabajo":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"8dbba523869e2a98e037bae9b7e3775c016fdd2d255966440a00eb2ba9e1ec9b","wireframe":"7f05c40dd2d51e24a00b34c9eb87c21268c9f7316f9a91d1904a732e8d94e774"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.