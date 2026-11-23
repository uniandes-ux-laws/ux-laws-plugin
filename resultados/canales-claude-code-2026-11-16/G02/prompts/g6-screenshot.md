# Ejecución 1.0.0

Evalúa solo G6, captura captures/G02.

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
{"pagina":{"id":"G02","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:16:58.538Z","sanity_ok":null,"consent_limpio":null},"group_id":"g6","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g6":{"g6_campos_de_entrada":0,"g6_botones":0,"g6_slots_convencion":{"K1_logo":[{"id":69,"padre":67,"tipo":"IMG","caja":{"x":153,"y":5,"w":73.40625,"h":16},"parcial":false,"identidad":{"alt":"logo"},"enlace_ancestro":67,"href_del_ancestro":"https://www.gov.co"},{"id":101,"padre":100,"tipo":"IMG","caja":{"x":164,"y":41,"w":298,"h":51},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":104,"padre":103,"tipo":"IMG","caja":{"x":1091,"y":41,"w":198,"h":51},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":115,"padre":114,"tipo":"IMG","caja":{"x":120,"y":108,"w":1200,"h":549},"parcial":false,"identidad":{"alt":"Personas rodeadas de naturaleza en una campaña de la DIAN sobre Renta 2025 que resalta el impacto de cada declaración en el bienestar ambiental."},"enlace_ancestro":114,"href_del_ancestro":"https://micrositios.dian.gov.co/renta-personas-naturales-ag-2025/"},{"id":156,"padre":155,"tipo":"IMG","caja":{"x":183.359375,"y":884.203125,"w":22,"h":15.796875},"parcial":true,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":344,"padre":343,"tipo":"IMG","caja":{"x":466.265625,"y":865,"w":35,"h":35},"parcial":true,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":388,"padre":387,"tipo":"IMG","caja":{"x":755.5,"y":865,"w":35,"h":33.25},"parcial":false,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null},{"id":427,"padre":426,"tipo":"IMG","caja":{"x":1044.734375,"y":865,"w":35,"h":35},"parcial":true,"identidad":{},"enlace_ancestro":null,"href_del_ancestro":null}],"K2_buscador":[],"K3_cuenta_carrito":[0,67,114],"K4_navegacion":[73],"K5_campos":[],"K5_etiquetas":[],"K6_pares_de_botones":[],"K7_pie":[],"K8_ruta":[]},"g6_contenedores_vacios_total":0,"g6_contenedores_vacios":[],"g6_separadores_total":1,"g6_separadores":[{"id":121,"padre":94,"tipo":"HR","caja":{"x":0,"y":673,"w":1440,"h":4},"parcial":false}],"g6_elementos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false,"accionable":true,"identidad":{}},{"id":2,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":57,"padre":2,"tipo":"BODY","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":59,"padre":57,"tipo":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":25},"parcial":false,"accionable":false,"identidad":{}},{"id":61,"padre":59,"tipo":"DIV","caja":{"x":0,"y":0,"w":1290,"h":25},"parcial":false,"accionable":false,"identidad":{}},{"id":63,"padre":61,"tipo":"DIV","caja":{"x":0,"y":0,"w":1290,"h":25},"parcial":false,"accionable":false,"identidad":{}},{"id":65,"padre":63,"tipo":"DIV","caja":{"x":153,"y":0,"w":94.75,"h":25},"parcial":false,"accionable":false,"identidad":{}},{"id":67,"padre":65,"tipo":"A","caja":{"x":153,"y":5,"w":73.40625,"h":16},"parcial":false,"accionable":true,"identidad":{"href":"https://www.gov.co"}},{"id":69,"padre":67,"tipo":"IMG","caja":{"x":153,"y":5,"w":73.40625,"h":16},"parcial":false,"accionable":false,"identidad":{"alt":"logo"}},{"id":73,"padre":63,"tipo":"DIV","caja":{"x":247.75,"y":0,"w":1042.25,"h":25},"parcial":false,"accionable":false,"identidad":{}},{"id":75,"padre":73,"tipo":"DIV","caja":{"x":256.75,"y":6,"w":247.484375,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":77,"padre":75,"tipo":"DIV","caja":{"x":256.75,"y":6,"w":247.484375,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":79,"padre":77,"tipo":"P","caja":{"x":256.75,"y":6,"w":247.484375,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":80,"padre":79,"tipo":"#TEXT","caja":{"x":256.75,"y":6,"w":247.484375,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":94,"padre":57,"tipo":"DIV","caja":{"x":0,"y":25,"w":1440,"h":652},"parcial":false,"accionable":false,"identidad":{}},{"id":96,"padre":94,"tipo":"DIV","caja":{"x":153,"y":25,"w":1137,"h":83},"parcial":false,"accionable":false,"identidad":{}},{"id":98,"padre":96,"tipo":"DIV","caja":{"x":153,"y":25,"w":1137,"h":83},"parcial":false,"accionable":false,"identidad":{}},{"id":100,"padre":98,"tipo":"DIV","caja":{"x":153,"y":25,"w":568.5,"h":83},"parcial":false,"accionable":false,"identidad":{}},{"id":101,"padre":100,"tipo":"IMG","caja":{"x":164,"y":41,"w":298,"h":51},"parcial":false,"accionable":false,"identidad":{}},{"id":103,"padre":98,"tipo":"DIV","caja":{"x":721.5,"y":25,"w":568.5,"h":83},"parcial":false,"accionable":false,"identidad":{}},{"id":104,"padre":103,"tipo":"IMG","caja":{"x":1091,"y":41,"w":198,"h":51},"parcial":false,"accionable":false,"identidad":{}},{"id":110,"padre":94,"tipo":"CENTER","caja":{"x":120,"y":108,"w":1200,"h":549},"parcial":false,"accionable":false,"identidad":{}},{"id":112,"padre":110,"tipo":"DIV","caja":{"x":120,"y":108,"w":1200,"h":549},"parcial":false,"accionable":false,"identidad":{}},{"id":114,"padre":112,"tipo":"A","caja":{"x":120,"y":108,"w":1200,"h":549},"parcial":false,"accionable":true,"identidad":{"href":"https://micrositios.dian.gov.co/renta-personas-naturales-ag-2025/"}},{"id":115,"padre":114,"tipo":"IMG","caja":{"x":120,"y":108,"w":1200,"h":549},"parcial":false,"accionable":false,"identidad":{"alt":"Personas rodeadas de naturaleza en una campaña de la DIAN sobre Renta 2025 que resalta el impacto de cada declaración en el bienestar ambiental."}},{"id":121,"padre":94,"tipo":"HR","caja":{"x":0,"y":673,"w":1440,"h":4},"parcial":false,"accionable":false,"identidad":{}},{"id":125,"padre":57,"tipo":"#TEXT","caja":{"x":0,"y":696,"w":4.453125,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":128,"padre":57,"tipo":"DIV","caja":{"x":0,"y":0,"w":1302.953125,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":130,"padre":128,"tipo":"DIV","caja":{"x":0,"y":0,"w":1302.953125,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":132,"padre":130,"tipo":"DIV","caja":{"x":0,"y":0,"w":437.25,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":134,"padre":132,"tipo":"DIV","caja":{"x":153,"y":726,"w":179.09375,"h":78},"parcial":false,"accionable":false,"identidad":{}},{"id":136,"padre":134,"tipo":"H2","caja":{"x":153,"y":726,"w":157.859375,"h":44},"parcial":false,"accionable":false,"identidad":{}},{"id":137,"padre":136,"tipo":"#TEXT","caja":{"x":153,"y":726,"w":157.859375,"h":44},"parcial":false,"accionable":false,"identidad":{}},{"id":139,"padre":134,"tipo":"H5","caja":{"x":153,"y":784,"w":179.09375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":140,"padre":139,"tipo":"#TEXT","caja":{"x":153,"y":784,"w":179.09375,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":147,"padre":132,"tipo":"DIV","caja":{"x":153,"y":845,"w":284.25,"h":55},"parcial":true,"accionable":false,"identidad":{}},{"id":149,"padre":147,"tipo":"DIV","caja":{"x":0,"y":0,"w":437.25,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":151,"padre":149,"tipo":"DIV","caja":{"x":153,"y":845,"w":284.25,"h":55},"parcial":true,"accionable":false,"identidad":{}},{"id":152,"padre":151,"tipo":"#TEXT","caja":{"x":161,"y":856,"w":4.453125,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":153,"padre":151,"tipo":"DIV","caja":{"x":0,"y":0,"w":323.421875,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":155,"padre":153,"tipo":"DIV","caja":{"x":183.359375,"y":884.203125,"w":22,"h":15.796875},"parcial":true,"accionable":false,"identidad":{}},{"id":156,"padre":155,"tipo":"IMG","caja":{"x":183.359375,"y":884.203125,"w":22,"h":15.796875},"parcial":true,"accionable":false,"identidad":{}},{"id":158,"padre":153,"tipo":"DIV","caja":{"x":0,"y":0,"w":323.421875,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":160,"padre":158,"tipo":"#TEXT","caja":{"x":216.703125,"y":885,"w":106.71875,"h":15},"parcial":true,"accionable":false,"identidad":{}},{"id":314,"padre":130,"tipo":"DIV","caja":{"x":0,"y":0,"w":1302.953125,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":316,"padre":314,"tipo":"DIV","caja":{"x":448.25,"y":726,"w":515.28125,"h":78},"parcial":false,"accionable":false,"identidad":{}},{"id":318,"padre":316,"tipo":"H2","caja":{"x":448.25,"y":726,"w":477.875,"h":44},"parcial":false,"accionable":false,"identidad":{}},{"id":319,"padre":318,"tipo":"#TEXT","caja":{"x":448.25,"y":726,"w":477.875,"h":44},"parcial":false,"accionable":false,"identidad":{}},{"id":321,"padre":316,"tipo":"H5","caja":{"x":448.25,"y":784,"w":515.28125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":322,"padre":321,"tipo":"#TEXT","caja":{"x":448.25,"y":784,"w":515.28125,"h":20},"parcial":false,"accionable":false,"identidad":{}},{"id":331,"padre":314,"tipo":"DIV","caja":{"x":0,"y":0,"w":1302.953125,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":333,"padre":331,"tipo":"DIV","caja":{"x":0,"y":0,"w":1302.953125,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":335,"padre":333,"tipo":"DIV","caja":{"x":0,"y":0,"w":724.484375,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":337,"padre":335,"tipo":"DIV","caja":{"x":447.25,"y":845,"w":277.234375,"h":55},"parcial":true,"accionable":false,"identidad":{}},{"id":339,"padre":337,"tipo":"DIV","caja":{"x":0,"y":0,"w":612.890625,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":341,"padre":339,"tipo":"DIV","caja":{"x":0,"y":0,"w":612.890625,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":343,"padre":341,"tipo":"DIV","caja":{"x":466.265625,"y":865,"w":35,"h":35},"parcial":true,"accionable":false,"identidad":{}},{"id":344,"padre":343,"tipo":"IMG","caja":{"x":466.265625,"y":865,"w":35,"h":35},"parcial":true,"accionable":false,"identidad":{}},{"id":347,"padre":341,"tipo":"DIV","caja":{"x":0,"y":0,"w":612.890625,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":349,"padre":347,"tipo":"#TEXT","caja":{"x":521.296875,"y":873,"w":91.59375,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":379,"padre":333,"tipo":"DIV","caja":{"x":0,"y":0,"w":1013.71875,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":381,"padre":379,"tipo":"DIV","caja":{"x":736.484375,"y":845,"w":277.234375,"h":55},"parcial":true,"accionable":false,"identidad":{}},{"id":383,"padre":381,"tipo":"DIV","caja":{"x":0,"y":0,"w":991.484375,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":385,"padre":383,"tipo":"DIV","caja":{"x":0,"y":0,"w":985.6875,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":387,"padre":385,"tipo":"DIV","caja":{"x":755.5,"y":865,"w":35,"h":33.25},"parcial":true,"accionable":false,"identidad":{}},{"id":388,"padre":387,"tipo":"IMG","caja":{"x":755.5,"y":865,"w":35,"h":33.25},"parcial":false,"accionable":false,"identidad":{}},{"id":390,"padre":385,"tipo":"DIV","caja":{"x":0,"y":0,"w":985.6875,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":392,"padre":390,"tipo":"#TEXT","caja":{"x":810.53125,"y":873,"w":175.15625,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":418,"padre":333,"tipo":"DIV","caja":{"x":0,"y":0,"w":1302.953125,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":420,"padre":418,"tipo":"DIV","caja":{"x":1025.71875,"y":845,"w":277.234375,"h":55},"parcial":true,"accionable":false,"identidad":{}},{"id":422,"padre":420,"tipo":"DIV","caja":{"x":0,"y":0,"w":1269.015625,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":424,"padre":422,"tipo":"DIV","caja":{"x":0,"y":0,"w":1209.125,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":426,"padre":424,"tipo":"DIV","caja":{"x":1044.734375,"y":865,"w":35,"h":35},"parcial":true,"accionable":false,"identidad":{}},{"id":427,"padre":426,"tipo":"IMG","caja":{"x":1044.734375,"y":865,"w":35,"h":35},"parcial":true,"accionable":false,"identidad":{}},{"id":430,"padre":424,"tipo":"DIV","caja":{"x":0,"y":0,"w":1209.125,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":432,"padre":430,"tipo":"#TEXT","caja":{"x":1099.765625,"y":873,"w":109.359375,"h":17},"parcial":false,"accionable":false,"identidad":{}}],"g6_parentesco":[[0,null],[2,0],[57,2],[59,57],[61,59],[63,61],[65,63],[67,65],[69,67],[73,63],[75,73],[77,75],[79,77],[80,79],[94,57],[96,94],[98,96],[100,98],[101,100],[103,98],[104,103],[110,94],[112,110],[114,112],[115,114],[121,94],[125,57],[128,57],[130,128],[132,130],[134,132],[136,134],[137,136],[139,134],[140,139],[147,132],[149,147],[151,149],[152,151],[153,151],[155,153],[156,155],[158,153],[160,158],[314,130],[316,314],[318,316],[319,318],[321,316],[322,321],[331,314],[333,331],[335,333],[337,335],[339,337],[341,339],[343,341],[344,343],[347,341],[349,347],[379,333],[381,379],[383,381],[385,383],[387,385],[388,387],[390,385],[392,390],[418,333],[420,418],[422,420],[424,422],[426,424],[427,426],[430,424],[432,430]],"g6_catalogo_convenciones":"v1, 2026-09-10, ocho convenciones K1..K8 en la rubrica de G6","g6_limites":["Se buscan candidatos en todas las posiciones visibles; estar en una ranura no certifica función ni incumplimiento.","Las listas son completas para los nodos retenidos; pueden faltar ancestros o atributos. Sin href observado no se demuestra que el logo carezca de enlace.","La ausencia de un pie o una ruta en el viewport no demuestra que el sitio carezca de ellos. No inferir estructura fuera de pantalla.","No se registran texto, valores de campos ni asociaciones for/id que el snapshot no conserva. Las etiquetas y operaciones requieren screenshot.","Contenedores vacíos y separadores son candidatos a R, no redundancias confirmadas. No contar ancestros y descendientes como el mismo hallazgo duplicado.","La lectura de R, T y convenciones usa screenshot: esta no es una comparación limpia entre canales."],"g6_criterios_con_lectura_de_texto":["R","T","K_ap","K"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g6"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["R","T","K","ninguna",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","R","T","K_ap","K","K_broken","catalog_version","convenciones","R_ids","bloques_ids","R_bloques_ids","R_distribucion","T_operaciones","T_evaluable","elimina_trabajo","mejora_ids"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"R":{"type":["integer","null"],"minimum":0},"T":{"type":["integer","null"],"minimum":0},"K_ap":{"type":"integer","minimum":0},"K":{"type":"integer","minimum":0},"K_broken":{"type":"array","items":{"type":"string"}},"catalog_version":{"type":"string","const":"v1, 2026-09-10"},"convenciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","aplica","cumple","evidencia_ids","razon"],"properties":{"id":{"enum":["K1","K2","K3","K4","K5","K6","K7","K8"],"type":"string"},"aplica":{"type":["boolean","null"]},"cumple":{"type":["boolean","null"]},"evidencia_ids":{"type":"array","items":{"type":"integer"}},"razon":{"type":"string"}}}},"R_ids":{"type":"array","items":{"type":"integer"}},"bloques_ids":{"type":"array","items":{"type":"integer"}},"R_bloques_ids":{"type":"array","items":{"type":"integer"}},"R_distribucion":{"enum":["ninguna","aislada","intermedia","generalizada","indeterminada"],"type":"string"},"T_operaciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","descripcion","datos_ids"],"properties":{"id":{"type":"integer"},"descripcion":{"type":"string"},"datos_ids":{"type":"array","items":{"type":"integer"}}}}},"T_evaluable":{"type":["boolean","null"]},"elimina_trabajo":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"a43f298a53dd2624d10a1a579dfd34a4a728e21fa9604c7f780aa7748075f488","wireframe":"b7efc702cd74bdd303a0e2b027aeb3cb824cb5dde13ff06c8baab728d5f85ffb"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.