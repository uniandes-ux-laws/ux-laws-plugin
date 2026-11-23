# Ejecución 1.0.0

Evalúa solo G6, captura captures/L08.

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
{"pagina":{"id":"L08","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:19:27.081Z","sanity_ok":null,"consent_limpio":null},"group_id":"g6","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g6":{"g6_campos_de_entrada":1,"g6_botones":11,"g6_slots_convencion":{"K1_logo":[{"id":178,"padre":176,"tipo":"IMG","caja":{"x":84,"y":38.5,"w":245,"h":69},"parcial":false,"identidad":{"alt":"Sodimac Logo"},"enlace_ancestro":175,"href_del_ancestro":"/homecenter-co/"},{"id":195,"padre":192,"tipo":"SVG","caja":{"x":732.265625,"y":53.5,"w":23,"h":39},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":204,"padre":203,"tipo":"SVG","caja":{"x":796.265625,"y":57,"w":32,"h":32},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":216,"padre":215,"tipo":"SVG","caja":{"x":1007.59375,"y":57,"w":30,"h":30},"parcial":false,"identidad":{},"enlace_ancestro":212,"href_del_ancestro":"https://www.homecenter.com.co/homecenter-co/cart/"},{"id":223,"padre":222,"tipo":"IMG","caja":{"x":1067.59375,"y":57,"w":29,"h":29},"parcial":false,"identidad":{"alt":"cmr puntos image"},"enlace_ancestro":222,"href_del_ancestro":"https://www.cmrpuntos.com.co/home?utm_source=sodimac_desktop&utm_medium=acceso_sitio&utm_campaign=acceso_sitio_cmrpuntos&utm_content=--boton_sitio"},{"id":232,"padre":231,"tipo":"SVG","caja":{"x":1204,"y":57,"w":31,"h":31},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":278,"padre":276,"tipo":"IMG","caja":{"x":48.03125,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"identidad":{"alt":"Navidad"},"enlace_ancestro":274,"href_del_ancestro":"https://www.homecenter.com.co/homecenter-co/category/cat40002/navidad/?cid=btnhom1008670#SOFTNAVIDAD"},{"id":286,"padre":284,"tipo":"IMG","caja":{"x":183.625,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"identidad":{"alt":"Muebles y organización"},"enlace_ancestro":282,"href_del_ancestro":"https://www.homecenter.com.co/homecenter-co/category/cat1770069/muebles-y-organizacion/?cid=btnhom1008670#SOFTmuebles"},{"id":294,"padre":292,"tipo":"IMG","caja":{"x":319.21875,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"identidad":{"alt":null},"enlace_ancestro":290,"href_del_ancestro":"https://www.homecenter.com.co/homecenter-co/category/cat10374/electrohogar-tecnologia-y-climatizacion/?cid=btnhom1008670#ACABelectro"},{"id":302,"padre":300,"tipo":"IMG","caja":{"x":454.8125,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"identidad":{"alt":null},"enlace_ancestro":298,"href_del_ancestro":"https://www.homecenter.com.co/homecenter-co/category/cat290011/herramientas-y-maquinarias/?cid=btnhom1008670#HARDherramientas"},{"id":310,"padre":308,"tipo":"IMG","caja":{"x":590.40625,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"identidad":{"alt":"https://www.homecenter.com.co/homecenter-co/category/cat11218/aire-libre-jardin-y-mascotas/?cid=btnhom1008670#SOFTairelibre"},"enlace_ancestro":306,"href_del_ancestro":"https://www.homecenter.com.co/homecenter-co/category/cat11218/aire-libre-jardin-y-mascotas/?cid=btnhom1008670#SOFTairelibre"},{"id":318,"padre":316,"tipo":"IMG","caja":{"x":726,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"identidad":{"alt":null},"enlace_ancestro":314,"href_del_ancestro":"https://www.homecenter.com.co/homecenter-co/category/cat1770067/bano-cocina-y-aseo/?cid=btnhom1008670#ACABbanos"},{"id":326,"padre":324,"tipo":"IMG","caja":{"x":861.59375,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"identidad":{"alt":null},"enlace_ancestro":322,"href_del_ancestro":"https://www.homecenter.com.co/homecenter-co/tiendas/tienda-mascotas-pet-center/?store=petcenter/?cid=btnhom1008670#PET_PETCENTER"},{"id":334,"padre":332,"tipo":"IMG","caja":{"x":997.1875,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"identidad":{"alt":null},"enlace_ancestro":330,"href_del_ancestro":"https://www.homecenter.com.co/homecenter-co/tiendas/compras-por-mayor-grandes-volumenes/?store=grandesvolumenes/?cid=btnhom1008670#GV_PORMAYOR"},{"id":342,"padre":340,"tipo":"IMG","caja":{"x":1132.78125,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"identidad":{"alt":null},"enlace_ancestro":338,"href_del_ancestro":"https://www.homecenter.com.co/homecenter-co/tiendas/servicio-automotriz-carcenter/?store=carcenter/?cid=btnhom1008670#CAR_CARCENTER"},{"id":350,"padre":348,"tipo":"IMG","caja":{"x":1268.375,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"identidad":{"alt":null},"enlace_ancestro":346,"href_del_ancestro":"https://www.homecenter.com.co/homecenter-co/tiendas/constructor/?store=constructor/?cid=btnhom1008670#CONSTRUCTOR"},{"id":367,"padre":364,"tipo":"IMG","caja":{"x":5.5,"y":325.59375,"w":1429,"h":435.390625},"parcial":false,"identidad":{"alt":"TODO PARA TU HOGAR"},"enlace_ancestro":null,"href_del_ancestro":null}],"K2_buscador":[193],"K3_cuenta_carrito":[0,82,111,119,125,131,139,150,155,159,163,167,175,182,193,212,222,274,282,290,298,306,314,322,330,338,346,456,463,470,477,484,491],"K4_navegacion":[108,144,181,182,183,184,185,186,187,278],"K5_campos":[193],"K5_etiquetas":[],"K6_pares_de_botones":[],"K7_pie":[],"K8_ruta":[]},"g6_contenedores_vacios_total":1,"g6_contenedores_vacios":[{"id":194,"padre":192,"tipo":"DIV","caja":{"x":704.21875,"y":60,"w":23.046875,"h":26},"parcial":false}],"g6_separadores_total":0,"g6_separadores":[],"g6_elementos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false,"accionable":true,"identidad":{}},{"id":2,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":82,"padre":2,"tipo":"BODY","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":true,"identidad":{}},{"id":83,"padre":82,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":104,"padre":83,"tipo":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":118},"parcial":false,"accionable":false,"identidad":{}},{"id":105,"padre":104,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":28},"parcial":false,"accionable":false,"identidad":{}},{"id":106,"padre":105,"tipo":"DIV","caja":{"x":105,"y":6,"w":1218,"h":127},"parcial":false,"accionable":false,"identidad":{}},{"id":107,"padre":106,"tipo":"DIV","caja":{"x":105,"y":6,"w":705.78125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":108,"padre":107,"tipo":"NAV","caja":{"x":105,"y":6,"w":705.78125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":109,"padre":108,"tipo":"UL","caja":{"x":105,"y":6,"w":705.78125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":110,"padre":109,"tipo":"LI","caja":{"x":105,"y":6,"w":226.234375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":111,"padre":110,"tipo":"A","caja":{"x":105,"y":6,"w":216.625,"h":15},"parcial":false,"accionable":true,"identidad":{"href":"tel:+3208899933","title":"Ir a Servicio al cliente 2"}},{"id":112,"padre":111,"tipo":"P","caja":{"x":105,"y":6,"w":216.625,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":113,"padre":112,"tipo":"#TEXT","caja":{"x":105,"y":6,"w":123.828125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":114,"padre":112,"tipo":"STRONG","caja":{"x":228.828125,"y":6,"w":92.796875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":115,"padre":114,"tipo":"#TEXT","caja":{"x":228.828125,"y":6,"w":92.796875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":116,"padre":110,"tipo":"DIV","caja":{"x":327.625,"y":6,"w":3.609375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":117,"padre":116,"tipo":"#TEXT","caja":{"x":327.625,"y":6,"w":3.609375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":118,"padre":109,"tipo":"LI","caja":{"x":337.234375,"y":6,"w":59.734375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":119,"padre":118,"tipo":"A","caja":{"x":337.234375,"y":6,"w":50.125,"h":15},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/content/tiendas/?cid=lndTIENDAS#traf-header","title":"Ir a Tiendas"}},{"id":120,"padre":119,"tipo":"P","caja":{"x":337.234375,"y":6,"w":50.125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":121,"padre":120,"tipo":"#TEXT","caja":{"x":337.234375,"y":6,"w":50.125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":122,"padre":118,"tipo":"DIV","caja":{"x":393.359375,"y":6,"w":3.609375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":123,"padre":122,"tipo":"#TEXT","caja":{"x":393.359375,"y":6,"w":3.609375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":124,"padre":109,"tipo":"LI","caja":{"x":402.96875,"y":6,"w":119.0625,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":125,"padre":124,"tipo":"A","caja":{"x":402.96875,"y":6,"w":109.453125,"h":15},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/content/Centro_de_ayuda//?cid=lndCentrodeayuda#traf-header","title":"CENTRO DE AYUDA"}},{"id":126,"padre":125,"tipo":"P","caja":{"x":402.96875,"y":6,"w":109.453125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":127,"padre":126,"tipo":"#TEXT","caja":{"x":402.96875,"y":6,"w":109.453125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":128,"padre":124,"tipo":"DIV","caja":{"x":518.421875,"y":6,"w":3.609375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":129,"padre":128,"tipo":"#TEXT","caja":{"x":518.421875,"y":6,"w":3.609375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":130,"padre":109,"tipo":"LI","caja":{"x":528.03125,"y":6,"w":199.828125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":131,"padre":130,"tipo":"A","caja":{"x":528.03125,"y":6,"w":190.21875,"h":15},"parcial":false,"accionable":true,"identidad":{"href":"tel:+573102427373","title":"Ir a Venta Telefónica"}},{"id":132,"padre":131,"tipo":"P","caja":{"x":528.03125,"y":6,"w":190.21875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":133,"padre":132,"tipo":"#TEXT","caja":{"x":528.03125,"y":6,"w":115.984375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":134,"padre":132,"tipo":"STRONG","caja":{"x":644.015625,"y":6,"w":74.234375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":135,"padre":134,"tipo":"#TEXT","caja":{"x":644.015625,"y":6,"w":74.234375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":136,"padre":130,"tipo":"DIV","caja":{"x":724.25,"y":6,"w":3.609375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":137,"padre":136,"tipo":"#TEXT","caja":{"x":724.25,"y":6,"w":3.609375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":138,"padre":109,"tipo":"LI","caja":{"x":733.859375,"y":6,"w":76.921875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":139,"padre":138,"tipo":"A","caja":{"x":733.859375,"y":6,"w":76.921875,"h":15},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/tarjeta-cmr-en-linea/?cid=lndCMR#traf-header","title":"MUNDO CMR"}},{"id":140,"padre":139,"tipo":"P","caja":{"x":733.859375,"y":6,"w":76.921875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":141,"padre":140,"tipo":"STRONG","caja":{"x":733.859375,"y":6,"w":76.921875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":142,"padre":141,"tipo":"#TEXT","caja":{"x":733.859375,"y":6,"w":76.921875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":143,"padre":106,"tipo":"DIV","caja":{"x":1168.21875,"y":6,"w":154.78125,"h":127},"parcial":false,"accionable":false,"identidad":{}},{"id":144,"padre":143,"tipo":"NAV","caja":{"x":1168.21875,"y":6,"w":154.78125,"h":127},"parcial":false,"accionable":false,"identidad":{}},{"id":145,"padre":144,"tipo":"UL","caja":{"x":1168.21875,"y":6,"w":154.78125,"h":127},"parcial":false,"accionable":false,"identidad":{}},{"id":149,"padre":145,"tipo":"LI","caja":{"x":1234.234375,"y":6,"w":88.765625,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":150,"padre":149,"tipo":"A","caja":{"x":1234.234375,"y":6,"w":88.765625,"h":15},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/tiendas/constructor/?store=constructor/?cid=lndConstructor#traf-header","title":"Constructor"}},{"id":151,"padre":150,"tipo":"P","caja":{"x":1234.234375,"y":6,"w":88.765625,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":152,"padre":151,"tipo":"STRONG","caja":{"x":1234.234375,"y":6,"w":88.765625,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":153,"padre":152,"tipo":"#TEXT","caja":{"x":1234.234375,"y":6,"w":88.765625,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":154,"padre":145,"tipo":"LI","caja":{"x":1259.265625,"y":34,"w":63.734375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":155,"padre":154,"tipo":"A","caja":{"x":1259.265625,"y":34,"w":63.734375,"h":15},"parcial":false,"accionable":true,"identidad":{"href":"https://www.falabella.com.co/falabella-co/","title":"FALABELLA"}},{"id":156,"padre":155,"tipo":"P","caja":{"x":1259.265625,"y":34,"w":63.734375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":157,"padre":156,"tipo":"#TEXT","caja":{"x":1259.265625,"y":34,"w":63.734375,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":158,"padre":145,"tipo":"LI","caja":{"x":1280.203125,"y":62,"w":42.796875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":159,"padre":158,"tipo":"A","caja":{"x":1280.203125,"y":62,"w":42.796875,"h":15},"parcial":false,"accionable":true,"identidad":{"href":"https://www.bancofalabella.com.co/","title":"BANCO"}},{"id":160,"padre":159,"tipo":"P","caja":{"x":1280.203125,"y":62,"w":42.796875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":161,"padre":160,"tipo":"#TEXT","caja":{"x":1280.203125,"y":62,"w":42.796875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":162,"padre":145,"tipo":"LI","caja":{"x":1268.703125,"y":90,"w":54.296875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":163,"padre":162,"tipo":"A","caja":{"x":1268.703125,"y":90,"w":54.296875,"h":15},"parcial":false,"accionable":true,"identidad":{"href":"https://web.segurosfalabella.com/co/?utm_source=Referral&utm_medium=Homecenter&utm_campaign=Home_Homecenter","title":"SEGUROS"}},{"id":164,"padre":163,"tipo":"P","caja":{"x":1268.703125,"y":90,"w":54.296875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":165,"padre":164,"tipo":"#TEXT","caja":{"x":1268.703125,"y":90,"w":54.296875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":166,"padre":145,"tipo":"LI","caja":{"x":1168.21875,"y":118,"w":154.78125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":167,"padre":166,"tipo":"A","caja":{"x":1168.21875,"y":118,"w":154.78125,"h":15},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/landing/web-tracking/order/","title":"SEGUIMIENTO DE COMPRA"}},{"id":168,"padre":167,"tipo":"P","caja":{"x":1168.21875,"y":118,"w":154.78125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":169,"padre":168,"tipo":"STRONG","caja":{"x":1168.21875,"y":118,"w":154.78125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":170,"padre":169,"tipo":"#TEXT","caja":{"x":1168.21875,"y":118,"w":154.78125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":171,"padre":104,"tipo":"DIV","caja":{"x":0,"y":28,"w":1440,"h":90},"parcial":false,"accionable":false,"identidad":{}},{"id":172,"padre":171,"tipo":"DIV","caja":{"x":84,"y":38.5,"w":1214.984375,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":173,"padre":172,"tipo":"DIV","caja":{"x":84,"y":38.5,"w":245,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":174,"padre":173,"tipo":"DIV","caja":{"x":84,"y":38.5,"w":245,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":175,"padre":174,"tipo":"A","caja":{"x":84,"y":38.5,"w":245,"h":69},"parcial":false,"accionable":true,"identidad":{"title":"Home","href":"/homecenter-co/"}},{"id":176,"padre":175,"tipo":"PICTURE","caja":{"x":84,"y":38.5,"w":245,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":178,"padre":176,"tipo":"IMG","caja":{"x":84,"y":38.5,"w":245,"h":69},"parcial":false,"accionable":false,"identidad":{"alt":"Sodimac Logo"}},{"id":179,"padre":172,"tipo":"DIV","caja":{"x":346.1875,"y":53,"w":124.46875,"h":40},"parcial":false,"accionable":false,"identidad":{}},{"id":180,"padre":179,"tipo":"DIV","caja":{"x":346.1875,"y":53,"w":124.46875,"h":40},"parcial":false,"accionable":false,"identidad":{}},{"id":181,"padre":180,"tipo":"DIV","caja":{"x":346.1875,"y":53,"w":124.46875,"h":40},"parcial":false,"accionable":false,"identidad":{}},{"id":182,"padre":181,"tipo":"BUTTON","caja":{"x":346.1875,"y":53,"w":124.46875,"h":40},"parcial":false,"accionable":true,"identidad":{}},{"id":183,"padre":182,"tipo":"DIV","caja":{"x":358.1875,"y":64.75,"w":15,"h":16.5},"parcial":false,"accionable":false,"identidad":{}},{"id":184,"padre":183,"tipo":"SPAN","caja":{"x":358.1875,"y":64.75,"w":15,"h":1.5},"parcial":false,"accionable":false,"identidad":{}},{"id":185,"padre":183,"tipo":"SPAN","caja":{"x":358.1875,"y":72.25,"w":15,"h":1.5},"parcial":false,"accionable":false,"identidad":{}},{"id":186,"padre":183,"tipo":"SPAN","caja":{"x":358.1875,"y":79.75,"w":15,"h":1.5},"parcial":false,"accionable":false,"identidad":{}},{"id":187,"padre":182,"tipo":"SPAN","caja":{"x":384.1875,"y":63,"w":77.46875,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":188,"padre":187,"tipo":"#TEXT","caja":{"x":384.1875,"y":63,"w":77.46875,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":189,"padre":172,"tipo":"DIV","caja":{"x":486.65625,"y":52.5,"w":279.609375,"h":41},"parcial":false,"accionable":false,"identidad":{}},{"id":190,"padre":189,"tipo":"DIV","caja":{"x":486.65625,"y":52.5,"w":279.609375,"h":41},"parcial":false,"accionable":false,"identidad":{}},{"id":191,"padre":190,"tipo":"DIV","caja":{"x":486.65625,"y":52.5,"w":279.609375,"h":41},"parcial":false,"accionable":false,"identidad":{}},{"id":192,"padre":191,"tipo":"DIV","caja":{"x":486.65625,"y":52.5,"w":279.609375,"h":41},"parcial":false,"accionable":false,"identidad":{}},{"id":193,"padre":192,"tipo":"INPUT","caja":{"x":487.65625,"y":53.5,"w":216.5625,"h":39},"parcial":false,"accionable":true,"identidad":{"type":"text"}},{"id":194,"padre":192,"tipo":"DIV","caja":{"x":704.21875,"y":60,"w":23.046875,"h":26},"parcial":false,"accionable":false,"identidad":{}},{"id":195,"padre":192,"tipo":"SVG","caja":{"x":732.265625,"y":53.5,"w":23,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":197,"padre":172,"tipo":"DIV","caja":{"x":791.265625,"y":57,"w":507.71875,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":198,"padre":197,"tipo":"UL","caja":{"x":791.265625,"y":57,"w":507.71875,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":199,"padre":198,"tipo":"LI","caja":{"x":791.265625,"y":57,"w":172.328125,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":200,"padre":199,"tipo":"DIV","caja":{"x":791.265625,"y":57,"w":172.328125,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":201,"padre":200,"tipo":"DIV","caja":{"x":791.265625,"y":57,"w":172.328125,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":202,"padre":201,"tipo":"DIV","caja":{"x":791.265625,"y":57,"w":172.328125,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":203,"padre":202,"tipo":"DIV","caja":{"x":796.265625,"y":57,"w":32,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":204,"padre":203,"tipo":"SVG","caja":{"x":796.265625,"y":57,"w":32,"h":32},"parcial":false,"accionable":false,"identidad":{}},{"id":207,"padre":202,"tipo":"DIV","caja":{"x":836.265625,"y":66,"w":122.328125,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":209,"padre":207,"tipo":"SPAN","caja":{"x":836.265625,"y":66,"w":122.328125,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":210,"padre":209,"tipo":"#TEXT","caja":{"x":836.265625,"y":66,"w":122.328125,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":211,"padre":198,"tipo":"LI","caja":{"x":983.59375,"y":57,"w":54,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":212,"padre":211,"tipo":"A","caja":{"x":983.59375,"y":57,"w":54,"h":30},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/cart/"}},{"id":213,"padre":212,"tipo":"SPAN","caja":{"x":983.59375,"y":60.046875,"w":24,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":214,"padre":213,"tipo":"#TEXT","caja":{"x":992.109375,"y":64.046875,"w":6.96875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":215,"padre":212,"tipo":"SPAN","caja":{"x":1007.59375,"y":57,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":216,"padre":215,"tipo":"SVG","caja":{"x":1007.59375,"y":57,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":219,"padre":198,"tipo":"LI","caja":{"x":1067.59375,"y":57,"w":111.40625,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":220,"padre":219,"tipo":"DIV","caja":{"x":1067.59375,"y":57,"w":111.40625,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":221,"padre":220,"tipo":"DIV","caja":{"x":1067.59375,"y":57,"w":111.40625,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":222,"padre":221,"tipo":"A","caja":{"x":1067.59375,"y":57,"w":111.40625,"h":29},"parcial":false,"accionable":true,"identidad":{"href":"https://www.cmrpuntos.com.co/home?utm_source=sodimac_desktop&utm_medium=acceso_sitio&utm_campaign=acceso_sitio_cmrpuntos&utm_content=--boton_sitio"}},{"id":223,"padre":222,"tipo":"IMG","caja":{"x":1067.59375,"y":57,"w":29,"h":29},"parcial":false,"accionable":false,"identidad":{"alt":"cmr puntos image"}},{"id":224,"padre":222,"tipo":"DIV","caja":{"x":1101.59375,"y":57,"w":77.40625,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":225,"padre":224,"tipo":"DIV","caja":{"x":1101.59375,"y":57,"w":43,"h":12},"parcial":false,"accionable":false,"identidad":{}},{"id":226,"padre":225,"tipo":"#TEXT","caja":{"x":1101.59375,"y":57,"w":43,"h":12},"parcial":false,"accionable":false,"identidad":{}},{"id":227,"padre":224,"tipo":"DIV","caja":{"x":1101.59375,"y":69,"w":77.40625,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":228,"padre":227,"tipo":"#TEXT","caja":{"x":1101.59375,"y":69,"w":77.40625,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":229,"padre":198,"tipo":"LI","caja":{"x":1204,"y":57,"w":94.984375,"h":31},"parcial":false,"accionable":false,"identidad":{}},{"id":230,"padre":229,"tipo":"DIV","caja":{"x":1204,"y":57,"w":94.984375,"h":31},"parcial":false,"accionable":false,"identidad":{}},{"id":231,"padre":230,"tipo":"SPAN","caja":{"x":1204,"y":57,"w":94.984375,"h":31},"parcial":false,"accionable":false,"identidad":{}},{"id":232,"padre":231,"tipo":"SVG","caja":{"x":1204,"y":57,"w":31,"h":31},"parcial":false,"accionable":false,"identidad":{}},{"id":234,"padre":231,"tipo":"DIV","caja":{"x":1235,"y":63.5,"w":63.984375,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":235,"padre":234,"tipo":"#TEXT","caja":{"x":1235,"y":63.5,"w":63.984375,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":264,"padre":83,"tipo":"DIV","caja":{"x":0,"y":118,"w":1440,"h":782},"parcial":true,"accionable":false,"identidad":{}},{"id":267,"padre":264,"tipo":"DIV","caja":{"x":5.5,"y":130,"w":1429,"h":630.984375},"parcial":false,"accionable":false,"identidad":{}},{"id":268,"padre":267,"tipo":"DIV","caja":{"x":5.5,"y":130,"w":1429,"h":630.984375},"parcial":false,"accionable":false,"identidad":{}},{"id":271,"padre":268,"tipo":"DIV","caja":{"x":48.03125,"y":130,"w":1343.9375,"h":174.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":272,"padre":271,"tipo":"DIV","caja":{"x":48.03125,"y":130,"w":1343.9375,"h":174.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":273,"padre":272,"tipo":"DIV","caja":{"x":48.03125,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":274,"padre":273,"tipo":"A","caja":{"x":48.03125,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/category/cat40002/navidad/?cid=btnhom1008670#SOFTNAVIDAD"}},{"id":275,"padre":274,"tipo":"DIV","caja":{"x":48.03125,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":276,"padre":275,"tipo":"PICTURE","caja":{"x":48.03125,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":278,"padre":276,"tipo":"IMG","caja":{"x":48.03125,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{"alt":"Navidad"}},{"id":279,"padre":275,"tipo":"DIV","caja":{"x":80.703125,"y":265.59375,"w":58.25,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":280,"padre":279,"tipo":"#TEXT","caja":{"x":80.703125,"y":265.59375,"w":58.25,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":281,"padre":272,"tipo":"DIV","caja":{"x":183.625,"y":130,"w":123.59375,"h":174.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":282,"padre":281,"tipo":"A","caja":{"x":183.625,"y":130,"w":123.59375,"h":174.59375},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/category/cat1770069/muebles-y-organizacion/?cid=btnhom1008670#SOFTmuebles"}},{"id":283,"padre":282,"tipo":"DIV","caja":{"x":183.625,"y":130,"w":123.59375,"h":174.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":284,"padre":283,"tipo":"PICTURE","caja":{"x":183.625,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":286,"padre":284,"tipo":"IMG","caja":{"x":183.625,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{"alt":"Muebles y organización"}},{"id":287,"padre":283,"tipo":"DIV","caja":{"x":200.671875,"y":265.59375,"w":89.5,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":288,"padre":287,"tipo":"#TEXT","caja":{"x":200.671875,"y":265.59375,"w":89.5,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":289,"padre":272,"tipo":"DIV","caja":{"x":319.21875,"y":130,"w":123.59375,"h":174.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":290,"padre":289,"tipo":"A","caja":{"x":319.21875,"y":130,"w":123.59375,"h":174.59375},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/category/cat10374/electrohogar-tecnologia-y-climatizacion/?cid=btnhom1008670#ACABelectro"}},{"id":291,"padre":290,"tipo":"DIV","caja":{"x":319.21875,"y":130,"w":123.59375,"h":174.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":292,"padre":291,"tipo":"PICTURE","caja":{"x":319.21875,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":294,"padre":292,"tipo":"IMG","caja":{"x":319.21875,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{"alt":null}},{"id":295,"padre":291,"tipo":"DIV","caja":{"x":329.828125,"y":265.59375,"w":102.375,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":296,"padre":295,"tipo":"#TEXT","caja":{"x":329.828125,"y":265.59375,"w":102.375,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":297,"padre":272,"tipo":"DIV","caja":{"x":454.8125,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":298,"padre":297,"tipo":"A","caja":{"x":454.8125,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/category/cat290011/herramientas-y-maquinarias/?cid=btnhom1008670#HARDherramientas"}},{"id":299,"padre":298,"tipo":"DIV","caja":{"x":454.8125,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":300,"padre":299,"tipo":"PICTURE","caja":{"x":454.8125,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":302,"padre":300,"tipo":"IMG","caja":{"x":454.8125,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{"alt":null}},{"id":303,"padre":299,"tipo":"DIV","caja":{"x":468.234375,"y":265.59375,"w":96.734375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":304,"padre":303,"tipo":"#TEXT","caja":{"x":468.234375,"y":265.59375,"w":96.734375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":305,"padre":272,"tipo":"DIV","caja":{"x":590.40625,"y":130,"w":123.59375,"h":174.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":306,"padre":305,"tipo":"A","caja":{"x":590.40625,"y":130,"w":123.59375,"h":174.59375},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/category/cat11218/aire-libre-jardin-y-mascotas/?cid=btnhom1008670#SOFTairelibre"}},{"id":307,"padre":306,"tipo":"DIV","caja":{"x":590.40625,"y":130,"w":123.59375,"h":174.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":308,"padre":307,"tipo":"PICTURE","caja":{"x":590.40625,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":310,"padre":308,"tipo":"IMG","caja":{"x":590.40625,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{"alt":"https://www.homecenter.com.co/homecenter-co/category/cat11218/aire-libre-jardin-y-mascotas/?cid=btnhom1008670#SOFTairelibre"}},{"id":311,"padre":307,"tipo":"DIV","caja":{"x":612.0625,"y":265.59375,"w":80.28125,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":312,"padre":311,"tipo":"#TEXT","caja":{"x":612.0625,"y":265.59375,"w":80.28125,"h":39},"parcial":false,"accionable":false,"identidad":{}},{"id":313,"padre":272,"tipo":"DIV","caja":{"x":726,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":314,"padre":313,"tipo":"A","caja":{"x":726,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/category/cat1770067/bano-cocina-y-aseo/?cid=btnhom1008670#ACABbanos"}},{"id":315,"padre":314,"tipo":"DIV","caja":{"x":726,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":316,"padre":315,"tipo":"PICTURE","caja":{"x":726,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":318,"padre":316,"tipo":"IMG","caja":{"x":726,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{"alt":null}},{"id":319,"padre":315,"tipo":"DIV","caja":{"x":733.0625,"y":265.59375,"w":109.46875,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":320,"padre":319,"tipo":"#TEXT","caja":{"x":733.0625,"y":265.59375,"w":109.46875,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":321,"padre":272,"tipo":"DIV","caja":{"x":861.59375,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":322,"padre":321,"tipo":"A","caja":{"x":861.59375,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/tiendas/tienda-mascotas-pet-center/?store=petcenter/?cid=btnhom1008670#PET_PETCENTER"}},{"id":323,"padre":322,"tipo":"DIV","caja":{"x":861.59375,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":324,"padre":323,"tipo":"PICTURE","caja":{"x":861.59375,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":326,"padre":324,"tipo":"IMG","caja":{"x":861.59375,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{"alt":null}},{"id":327,"padre":323,"tipo":"DIV","caja":{"x":889.796875,"y":265.59375,"w":67.171875,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":328,"padre":327,"tipo":"#TEXT","caja":{"x":889.796875,"y":265.59375,"w":67.171875,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":329,"padre":272,"tipo":"DIV","caja":{"x":997.1875,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":330,"padre":329,"tipo":"A","caja":{"x":997.1875,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/tiendas/compras-por-mayor-grandes-volumenes/?store=grandesvolumenes/?cid=btnhom1008670#GV_PORMAYOR"}},{"id":331,"padre":330,"tipo":"DIV","caja":{"x":997.1875,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":332,"padre":331,"tipo":"PICTURE","caja":{"x":997.1875,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":334,"padre":332,"tipo":"IMG","caja":{"x":997.1875,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{"alt":null}},{"id":335,"padre":331,"tipo":"DIV","caja":{"x":1014.15625,"y":265.59375,"w":89.65625,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":336,"padre":335,"tipo":"#TEXT","caja":{"x":1014.15625,"y":265.59375,"w":89.65625,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":337,"padre":272,"tipo":"DIV","caja":{"x":1132.78125,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":338,"padre":337,"tipo":"A","caja":{"x":1132.78125,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/tiendas/servicio-automotriz-carcenter/?store=carcenter/?cid=btnhom1008670#CAR_CARCENTER"}},{"id":339,"padre":338,"tipo":"DIV","caja":{"x":1132.78125,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":340,"padre":339,"tipo":"PICTURE","caja":{"x":1132.78125,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":342,"padre":340,"tipo":"IMG","caja":{"x":1132.78125,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{"alt":null}},{"id":343,"padre":339,"tipo":"DIV","caja":{"x":1155.75,"y":265.59375,"w":77.65625,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":344,"padre":343,"tipo":"#TEXT","caja":{"x":1155.75,"y":265.59375,"w":77.65625,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":345,"padre":272,"tipo":"DIV","caja":{"x":1268.375,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":346,"padre":345,"tipo":"A","caja":{"x":1268.375,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/tiendas/constructor/?store=constructor/?cid=btnhom1008670#CONSTRUCTOR"}},{"id":347,"padre":346,"tipo":"DIV","caja":{"x":1268.375,"y":130,"w":123.59375,"h":154.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":348,"padre":347,"tipo":"PICTURE","caja":{"x":1268.375,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{}},{"id":350,"padre":348,"tipo":"IMG","caja":{"x":1268.375,"y":130,"w":123.59375,"h":123.59375},"parcial":false,"accionable":false,"identidad":{"alt":null}},{"id":351,"padre":347,"tipo":"DIV","caja":{"x":1287.265625,"y":265.59375,"w":85.796875,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":352,"padre":351,"tipo":"#TEXT","caja":{"x":1287.265625,"y":265.59375,"w":85.796875,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":353,"padre":268,"tipo":"DIV","caja":{"x":5.5,"y":325.59375,"w":1429,"h":435.390625},"parcial":false,"accionable":false,"identidad":{}},{"id":354,"padre":353,"tipo":"DIV","caja":{"x":5.5,"y":325.59375,"w":1429,"h":435.390625},"parcial":false,"accionable":false,"identidad":{}},{"id":355,"padre":354,"tipo":"OL","caja":{"x":627.921875,"y":731.96875,"w":184.15625,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":356,"padre":355,"tipo":"LI","caja":{"x":627.921875,"y":731.96875,"w":14,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":357,"padre":355,"tipo":"LI","caja":{"x":661.953125,"y":731.96875,"w":14,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":358,"padre":355,"tipo":"LI","caja":{"x":695.984375,"y":731.96875,"w":14,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":359,"padre":355,"tipo":"LI","caja":{"x":730.015625,"y":731.96875,"w":14,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":360,"padre":355,"tipo":"LI","caja":{"x":764.046875,"y":731.96875,"w":14,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":361,"padre":355,"tipo":"LI","caja":{"x":798.078125,"y":731.96875,"w":14,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":362,"padre":354,"tipo":"DIV","caja":{"x":5.5,"y":325.59375,"w":1429,"h":435.390625},"parcial":false,"accionable":false,"identidad":{}},{"id":364,"padre":362,"tipo":"DIV","caja":{"x":5.5,"y":325.59375,"w":1429,"h":435.390625},"parcial":false,"accionable":false,"identidad":{}},{"id":367,"padre":364,"tipo":"IMG","caja":{"x":5.5,"y":325.59375,"w":1429,"h":435.390625},"parcial":false,"accionable":false,"identidad":{"alt":"TODO PARA TU HOGAR"}},{"id":429,"padre":264,"tipo":"DIV","caja":{"x":120,"y":767.984375,"w":1200,"h":132.015625},"parcial":true,"accionable":false,"identidad":{}},{"id":430,"padre":429,"tipo":"DIV","caja":{"x":120,"y":767.984375,"w":1200,"h":132.015625},"parcial":true,"accionable":false,"identidad":{}},{"id":431,"padre":430,"tipo":"DIV","caja":{"x":606.1875,"y":767.984375,"w":227.609375,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":432,"padre":431,"tipo":"H4","caja":{"x":606.1875,"y":767.984375,"w":227.609375,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":433,"padre":432,"tipo":"STRONG","caja":{"x":606.1875,"y":767.984375,"w":227.609375,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":434,"padre":433,"tipo":"#TEXT","caja":{"x":606.1875,"y":767.984375,"w":227.609375,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":449,"padre":430,"tipo":"DIV","caja":{"x":608.46875,"y":828.78125,"w":223.046875,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":450,"padre":449,"tipo":"H4","caja":{"x":608.46875,"y":828.78125,"w":223.046875,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":451,"padre":450,"tipo":"STRONG","caja":{"x":608.46875,"y":828.78125,"w":223.046875,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":452,"padre":451,"tipo":"#TEXT","caja":{"x":608.46875,"y":828.78125,"w":223.046875,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":453,"padre":430,"tipo":"DIV","caja":{"x":169.65625,"y":887.578125,"w":1126.46875,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":454,"padre":453,"tipo":"DIV","caja":{"x":169.65625,"y":887.578125,"w":1126.46875,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":455,"padre":454,"tipo":"DIV","caja":{"x":169.65625,"y":887.578125,"w":90.671875,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":456,"padre":455,"tipo":"A","caja":{"x":169.65625,"y":887.578125,"w":90.671875,"h":12.421875},"parcial":true,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/collection/Organizacion/?cid=ctahom1008670#SOFT_Organizadores"}},{"id":457,"padre":456,"tipo":"DIV","caja":{"x":169.65625,"y":887.578125,"w":90.671875,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":460,"padre":457,"tipo":"DIV","caja":{"x":169.65625,"y":887.578125,"w":90.671875,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":461,"padre":460,"tipo":"#TEXT","caja":{"x":169.65625,"y":887.578125,"w":90.671875,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":462,"padre":454,"tipo":"DIV","caja":{"x":325.59375,"y":887.578125,"w":182.8125,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":463,"padre":462,"tipo":"A","caja":{"x":325.59375,"y":887.578125,"w":182.8125,"h":12.421875},"parcial":true,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/category/cat46906043/?cid=ctahom1008670#ACAB_Cocinas"}},{"id":464,"padre":463,"tipo":"DIV","caja":{"x":325.59375,"y":887.578125,"w":182.8125,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":467,"padre":464,"tipo":"DIV","caja":{"x":325.59375,"y":887.578125,"w":182.8125,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":468,"padre":467,"tipo":"#TEXT","caja":{"x":325.59375,"y":887.578125,"w":182.8125,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":469,"padre":454,"tipo":"DIV","caja":{"x":561.5625,"y":887.578125,"w":114.859375,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":470,"padre":469,"tipo":"A","caja":{"x":561.5625,"y":887.578125,"w":114.859375,"h":12.421875},"parcial":true,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/category/cat830124/decohogar-cumpleanos-homecenter/?cid=ctahom1008670#HARD_Puertasdeinterior"}},{"id":471,"padre":470,"tipo":"DIV","caja":{"x":561.5625,"y":887.578125,"w":114.859375,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":474,"padre":471,"tipo":"DIV","caja":{"x":561.5625,"y":887.578125,"w":114.859375,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":475,"padre":474,"tipo":"#TEXT","caja":{"x":561.5625,"y":887.578125,"w":114.859375,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":476,"padre":454,"tipo":"DIV","caja":{"x":757.953125,"y":887.578125,"w":126.09375,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":477,"padre":476,"tipo":"A","caja":{"x":757.953125,"y":887.578125,"w":126.09375,"h":12.421875},"parcial":true,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/category/cat740127/?cid=ctahom1008670#HARD_CerradurasDigitales"}},{"id":478,"padre":477,"tipo":"DIV","caja":{"x":757.953125,"y":887.578125,"w":126.09375,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":481,"padre":478,"tipo":"DIV","caja":{"x":757.953125,"y":887.578125,"w":126.09375,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":482,"padre":481,"tipo":"#TEXT","caja":{"x":757.953125,"y":887.578125,"w":126.09375,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":483,"padre":454,"tipo":"DIV","caja":{"x":961.140625,"y":887.578125,"w":123.71875,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":484,"padre":483,"tipo":"A","caja":{"x":961.140625,"y":887.578125,"w":123.71875,"h":12.421875},"parcial":true,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/category/cat10116/?cid=ctahom1008670#SOFT_Espejos"}},{"id":485,"padre":484,"tipo":"DIV","caja":{"x":961.140625,"y":887.578125,"w":123.71875,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":488,"padre":485,"tipo":"DIV","caja":{"x":961.140625,"y":887.578125,"w":123.71875,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":489,"padre":488,"tipo":"#TEXT","caja":{"x":961.140625,"y":887.578125,"w":123.71875,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":490,"padre":454,"tipo":"DIV","caja":{"x":1153.875,"y":887.578125,"w":142.25,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":491,"padre":490,"tipo":"A","caja":{"x":1153.875,"y":887.578125,"w":142.25,"h":12.421875},"parcial":true,"accionable":true,"identidad":{"href":"https://www.homecenter.com.co/homecenter-co/category/cat46906059/?cid=ctahom1008670#ACAB_AiresAcondicionadosyVentiladores"}},{"id":492,"padre":491,"tipo":"DIV","caja":{"x":1153.875,"y":887.578125,"w":142.25,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":495,"padre":492,"tipo":"DIV","caja":{"x":1153.875,"y":887.578125,"w":142.25,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}},{"id":496,"padre":495,"tipo":"#TEXT","caja":{"x":1153.875,"y":887.578125,"w":142.25,"h":12.421875},"parcial":true,"accionable":false,"identidad":{}}],"g6_parentesco":[[0,null],[2,0],[82,2],[83,82],[104,83],[105,104],[106,105],[107,106],[108,107],[109,108],[110,109],[111,110],[112,111],[113,112],[114,112],[115,114],[116,110],[117,116],[118,109],[119,118],[120,119],[121,120],[122,118],[123,122],[124,109],[125,124],[126,125],[127,126],[128,124],[129,128],[130,109],[131,130],[132,131],[133,132],[134,132],[135,134],[136,130],[137,136],[138,109],[139,138],[140,139],[141,140],[142,141],[143,106],[144,143],[145,144],[149,145],[150,149],[151,150],[152,151],[153,152],[154,145],[155,154],[156,155],[157,156],[158,145],[159,158],[160,159],[161,160],[162,145],[163,162],[164,163],[165,164],[166,145],[167,166],[168,167],[169,168],[170,169],[171,104],[172,171],[173,172],[174,173],[175,174],[176,175],[178,176],[179,172],[180,179],[181,180],[182,181],[183,182],[184,183],[185,183],[186,183],[187,182],[188,187],[189,172],[190,189],[191,190],[192,191],[193,192],[194,192],[195,192],[196,195],[197,172],[198,197],[199,198],[200,199],[201,200],[202,201],[203,202],[204,203],[205,204],[206,204],[207,202],[209,207],[210,209],[211,198],[212,211],[213,212],[214,213],[215,212],[216,215],[217,216],[219,198],[220,219],[221,220],[222,221],[223,222],[224,222],[225,224],[226,225],[227,224],[228,227],[229,198],[230,229],[231,230],[232,231],[233,232],[234,231],[235,234],[264,83],[267,264],[268,267],[271,268],[272,271],[273,272],[274,273],[275,274],[276,275],[278,276],[279,275],[280,279],[281,272],[282,281],[283,282],[284,283],[286,284],[287,283],[288,287],[289,272],[290,289],[291,290],[292,291],[294,292],[295,291],[296,295],[297,272],[298,297],[299,298],[300,299],[302,300],[303,299],[304,303],[305,272],[306,305],[307,306],[308,307],[310,308],[311,307],[312,311],[313,272],[314,313],[315,314],[316,315],[318,316],[319,315],[320,319],[321,272],[322,321],[323,322],[324,323],[326,324],[327,323],[328,327],[329,272],[330,329],[331,330],[332,331],[334,332],[335,331],[336,335],[337,272],[338,337],[339,338],[340,339],[342,340],[343,339],[344,343],[345,272],[346,345],[347,346],[348,347],[350,348],[351,347],[352,351],[353,268],[354,353],[355,354],[356,355],[357,355],[358,355],[359,355],[360,355],[361,355],[362,354],[364,362],[367,364],[368,364],[369,368],[370,368],[429,264],[430,429],[431,430],[432,431],[433,432],[434,433],[449,430],[450,449],[451,450],[452,451],[453,430],[454,453],[455,454],[456,455],[457,456],[460,457],[461,460],[462,454],[463,462],[464,463],[467,464],[468,467],[469,454],[470,469],[471,470],[474,471],[475,474],[476,454],[477,476],[478,477],[481,478],[482,481],[483,454],[484,483],[485,484],[488,485],[489,488],[490,454],[491,490],[492,491],[495,492],[496,495]],"g6_catalogo_convenciones":"v1, 2026-09-10, ocho convenciones K1..K8 en la rubrica de G6","g6_limites":["Se buscan candidatos en todas las posiciones visibles; estar en una ranura no certifica función ni incumplimiento.","Las listas son completas para los nodos retenidos; pueden faltar ancestros o atributos. Sin href observado no se demuestra que el logo carezca de enlace.","La ausencia de un pie o una ruta en el viewport no demuestra que el sitio carezca de ellos. No inferir estructura fuera de pantalla.","No se registran texto, valores de campos ni asociaciones for/id que el snapshot no conserva. Las etiquetas y operaciones requieren screenshot.","Contenedores vacíos y separadores son candidatos a R, no redundancias confirmadas. No contar ancestros y descendientes como el mismo hallazgo duplicado.","La lectura de R, T y convenciones usa screenshot: esta no es una comparación limpia entre canales."],"g6_criterios_con_lectura_de_texto":["R","T","K_ap","K"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g6"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["R","T","K","ninguna",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","R","T","K_ap","K","K_broken","catalog_version","convenciones","R_ids","bloques_ids","R_bloques_ids","R_distribucion","T_operaciones","T_evaluable","elimina_trabajo","mejora_ids"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"R":{"type":["integer","null"],"minimum":0},"T":{"type":["integer","null"],"minimum":0},"K_ap":{"type":"integer","minimum":0},"K":{"type":"integer","minimum":0},"K_broken":{"type":"array","items":{"type":"string"}},"catalog_version":{"type":"string","const":"v1, 2026-09-10"},"convenciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","aplica","cumple","evidencia_ids","razon"],"properties":{"id":{"enum":["K1","K2","K3","K4","K5","K6","K7","K8"],"type":"string"},"aplica":{"type":["boolean","null"]},"cumple":{"type":["boolean","null"]},"evidencia_ids":{"type":"array","items":{"type":"integer"}},"razon":{"type":"string"}}}},"R_ids":{"type":"array","items":{"type":"integer"}},"bloques_ids":{"type":"array","items":{"type":"integer"}},"R_bloques_ids":{"type":"array","items":{"type":"integer"}},"R_distribucion":{"enum":["ninguna","aislada","intermedia","generalizada","indeterminada"],"type":"string"},"T_operaciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","descripcion","datos_ids"],"properties":{"id":{"type":"integer"},"descripcion":{"type":"string"},"datos_ids":{"type":"array","items":{"type":"integer"}}}}},"T_evaluable":{"type":["boolean","null"]},"elimina_trabajo":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"2ba458d1143f102eb5b2694a1c0daa7bb1dfe49a61a9ba39289c8a9dd2168087","wireframe":"82bbd8965aafde8867bd535b663f43dbb5bd722b7cee4da352253b36bf303c52"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.