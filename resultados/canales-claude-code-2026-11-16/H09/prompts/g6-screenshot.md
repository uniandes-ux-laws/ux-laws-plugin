# Ejecución 1.0.0

Evalúa solo G6, captura captures/H09.

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
{"pagina":{"id":"H09","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:16:45.829Z","sanity_ok":null,"consent_limpio":null},"group_id":"g6","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g6":{"g6_campos_de_entrada":1,"g6_botones":9,"g6_slots_convencion":{"K1_logo":[{"id":325,"padre":324,"tipo":"IMG","caja":{"x":1355,"y":823,"w":64,"h":64},"parcial":false,"identidad":{"role":"presentation","alt":null},"enlace_ancestro":null,"href_del_ancestro":null},{"id":357,"padre":355,"tipo":"IMG","caja":{"x":164.125,"y":25.5,"w":179,"h":35},"parcial":false,"identidad":{"alt":"Inicio"},"enlace_ancestro":355,"href_del_ancestro":"/"},{"id":1002,"padre":1001,"tipo":"IMG","caja":{"x":0,"y":86,"w":1440,"h":280},"parcial":false,"identidad":{"alt":"banner nariño"},"enlace_ancestro":null,"href_del_ancestro":null},{"id":1583,"padre":1582,"tipo":"IMG","caja":{"x":240.15625,"y":374,"w":30,"h":30},"parcial":false,"identidad":{"alt":"icon menu","role":"img"},"enlace_ancestro":1580,"href_del_ancestro":"/afiliados/pbs/derechos-deberes"},{"id":1592,"padre":1591,"tipo":"IMG","caja":{"x":476.03125,"y":374,"w":30,"h":30},"parcial":false,"identidad":{"alt":"icon menu","role":"img"},"enlace_ancestro":1589,"href_del_ancestro":"/afiliados/pac-pbs/directorio-medico"},{"id":1601,"padre":1600,"tipo":"IMG","caja":{"x":640.828125,"y":374,"w":30,"h":30},"parcial":false,"identidad":{"alt":"icon menu","role":"img"},"enlace_ancestro":1598,"href_del_ancestro":"/contactanos"},{"id":1610,"padre":1609,"tipo":"IMG","caja":{"x":825.796875,"y":374,"w":30,"h":30},"parcial":false,"identidad":{"alt":"icon menu","role":"img"},"enlace_ancestro":1607,"href_del_ancestro":"/famisanar-mas-cerca-de-ti"},{"id":1619,"padre":1618,"tipo":"IMG","caja":{"x":1041.6875,"y":374,"w":30,"h":30},"parcial":false,"identidad":{"alt":"icon menu","role":"img"},"enlace_ancestro":1616,"href_del_ancestro":"/participacion-social"},{"id":1649,"padre":1648,"tipo":"IMG","caja":{"x":93,"y":470.390625,"w":403.328125,"h":398},"parcial":false,"identidad":{"alt":"PAC"},"enlace_ancestro":null,"href_del_ancestro":null},{"id":1670,"padre":1669,"tipo":"IMG","caja":{"x":518.328125,"y":470.390625,"w":403.328125,"h":398},"parcial":false,"identidad":{"alt":"Asesor Virtual"},"enlace_ancestro":null,"href_del_ancestro":null},{"id":1691,"padre":1690,"tipo":"IMG","caja":{"x":943.65625,"y":470.390625,"w":403.34375,"h":398},"parcial":false,"identidad":{"alt":"Pagos PSE"},"enlace_ancestro":null,"href_del_ancestro":null},{"id":3093,"padre":3091,"tipo":"SVG","caja":{"x":1377.5,"y":745,"w":30,"h":55},"parcial":false,"identidad":{"role":"img"},"enlace_ancestro":3091,"href_del_ancestro":"https://wa.me/573006438831?text=Hola+Camila%2C+Requiero+de+tu+ayuda"}],"K2_buscador":[453],"K3_cuenta_carrito":[0,323,355,373,380,387,394,401,453,472,939,943,1030,1538,1542,1543,1546,1547,1550,1551,1554,1555,1558,1559,1562,1563,1580,1589,1598,1607,1616,1648,1669,1690,3091],"K4_navegacion":[349,353,355,362,364,366,369,371,373,378,380,385,387,392,394,399,401,1571,1574,1576,1578,1580,1582,1583,1587,1589,1591,1592,1596,1598,1600,1601,1605,1607,1609,1610,1614,1616,1618,1619],"K5_campos":[453],"K5_etiquetas":[],"K6_pares_de_botones":[{"izquierda":939,"derecha":1538,"padre":938}],"K7_pie":[],"K8_ruta":[]},"g6_contenedores_vacios_total":1,"g6_contenedores_vacios":[{"id":472,"padre":349,"tipo":"DIV","caja":{"x":1225.875,"y":15,"w":40,"h":56},"parcial":false}],"g6_separadores_total":0,"g6_separadores":[],"g6_elementos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false,"accionable":true,"identidad":{}},{"id":2,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":266,"padre":2,"tipo":"BODY","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":316,"padre":266,"tipo":"DIV","caja":{"x":1355,"y":823,"w":64,"h":64},"parcial":false,"accionable":false,"identidad":{}},{"id":323,"padre":316,"tipo":"DIV","caja":{"x":1355,"y":823,"w":64,"h":64},"parcial":false,"accionable":true,"identidad":{"aria-label":"Menú de Accesibilidad","role":"button","title":"Menú de Accesibilidad"}},{"id":324,"padre":323,"tipo":"SPAN","caja":{"x":1355,"y":823,"w":64,"h":64},"parcial":false,"accionable":false,"identidad":{}},{"id":325,"padre":324,"tipo":"IMG","caja":{"x":1355,"y":823,"w":64,"h":64},"parcial":false,"accionable":false,"identidad":{"role":"presentation","alt":null}},{"id":340,"padre":266,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":342,"padre":340,"tipo":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":86},"parcial":false,"accionable":false,"identidad":{}},{"id":347,"padre":342,"tipo":"DIV","caja":{"x":0,"y":0,"w":1265.875,"h":74.5},"parcial":true,"accionable":false,"identidad":{}},{"id":349,"padre":347,"tipo":"DIV","caja":{"x":0,"y":0,"w":1265.875,"h":74.5},"parcial":true,"accionable":false,"identidad":{}},{"id":351,"padre":349,"tipo":"DIV","caja":{"x":164.125,"y":25.5,"w":179,"h":35},"parcial":false,"accionable":false,"identidad":{}},{"id":353,"padre":351,"tipo":"SECTION","caja":{"x":164.125,"y":25.5,"w":179,"h":35},"parcial":false,"accionable":false,"identidad":{}},{"id":355,"padre":353,"tipo":"A","caja":{"x":164.125,"y":25.5,"w":179,"h":35},"parcial":false,"accionable":true,"identidad":{"href":"/","title":"Inicio"}},{"id":357,"padre":355,"tipo":"IMG","caja":{"x":164.125,"y":25.5,"w":179,"h":35},"parcial":false,"accionable":false,"identidad":{"alt":"Inicio"}},{"id":362,"padre":349,"tipo":"DIV","caja":{"x":0,"y":0,"w":1097.5625,"h":74.5},"parcial":true,"accionable":false,"identidad":{}},{"id":364,"padre":362,"tipo":"NAV","caja":{"x":0,"y":0,"w":1097.5625,"h":74.5},"parcial":true,"accionable":false,"identidad":{"role":"navigation"}},{"id":366,"padre":364,"tipo":"H2","caja":{"x":443.078125,"y":26.5,"w":375.28125,"h":48},"parcial":false,"accionable":false,"identidad":{}},{"id":367,"padre":366,"tipo":"#TEXT","caja":{"x":443.078125,"y":26.5,"w":375.28125,"h":48},"parcial":false,"accionable":false,"identidad":{}},{"id":369,"padre":364,"tipo":"UL","caja":{"x":0,"y":0,"w":1097.5625,"h":53.5},"parcial":true,"accionable":false,"identidad":{}},{"id":371,"padre":369,"tipo":"LI","caja":{"x":0,"y":0,"w":515.4375,"h":53.5},"parcial":true,"accionable":false,"identidad":{}},{"id":373,"padre":371,"tipo":"A","caja":{"x":0,"y":0,"w":515.4375,"h":53.5},"parcial":true,"accionable":true,"identidad":{"href":"/afiliados"}},{"id":375,"padre":373,"tipo":"#TEXT","caja":{"x":444.078125,"y":31.5,"w":71.359375,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":378,"padre":369,"tipo":"LI","caja":{"x":552.4375,"y":31.5,"w":105.515625,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":380,"padre":378,"tipo":"A","caja":{"x":552.4375,"y":31.5,"w":105.515625,"h":22},"parcial":false,"accionable":true,"identidad":{"href":"/empleadores"}},{"id":382,"padre":380,"tipo":"#TEXT","caja":{"x":552.4375,"y":31.5,"w":105.515625,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":385,"padre":369,"tipo":"LI","caja":{"x":694.953125,"y":31.5,"w":136.25,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":387,"padre":385,"tipo":"A","caja":{"x":694.953125,"y":31.5,"w":136.25,"h":22},"parcial":false,"accionable":true,"identidad":{"href":"/proveedores"}},{"id":389,"padre":387,"tipo":"#TEXT","caja":{"x":694.953125,"y":31.5,"w":136.25,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":392,"padre":369,"tipo":"LI","caja":{"x":868.203125,"y":31.5,"w":135.828125,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":394,"padre":392,"tipo":"A","caja":{"x":868.203125,"y":31.5,"w":135.828125,"h":22},"parcial":false,"accionable":true,"identidad":{"href":"https://www.famisanar.com.co/afiliados/pbs/promocion-y-prevencion/estrategias-educativas"}},{"id":396,"padre":394,"tipo":"#TEXT","caja":{"x":868.203125,"y":31.5,"w":135.828125,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":399,"padre":369,"tipo":"LI","caja":{"x":1041.03125,"y":31.5,"w":56.53125,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":401,"padre":399,"tipo":"A","caja":{"x":1041.03125,"y":31.5,"w":56.53125,"h":22},"parcial":false,"accionable":true,"identidad":{"href":"/espacio-de-prensa"}},{"id":403,"padre":401,"tipo":"#TEXT","caja":{"x":1041.03125,"y":31.5,"w":56.53125,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":439,"padre":349,"tipo":"DIV","caja":{"x":1135.875,"y":18,"w":50,"h":50},"parcial":false,"accionable":false,"identidad":{}},{"id":441,"padre":439,"tipo":"SECTION","caja":{"x":1147.875,"y":24,"w":26,"h":38},"parcial":false,"accionable":false,"identidad":{}},{"id":443,"padre":441,"tipo":"DIV","caja":{"x":1147.875,"y":24,"w":26,"h":38},"parcial":false,"accionable":false,"identidad":{}},{"id":453,"padre":443,"tipo":"INPUT","caja":{"x":1147.875,"y":24,"w":26,"h":38},"parcial":false,"accionable":true,"identidad":{"type":"text","aria-label":"Buscar"}},{"id":472,"padre":349,"tipo":"DIV","caja":{"x":1225.875,"y":15,"w":40,"h":56},"parcial":false,"accionable":true,"identidad":{}},{"id":474,"padre":472,"tipo":"DIV","caja":{"x":1215.875,"y":31,"w":30,"h":4},"parcial":false,"accionable":false,"identidad":{}},{"id":476,"padre":472,"tipo":"DIV","caja":{"x":1225.875,"y":39,"w":20,"h":4},"parcial":false,"accionable":false,"identidad":{}},{"id":478,"padre":472,"tipo":"DIV","caja":{"x":1215.875,"y":47,"w":30,"h":4},"parcial":false,"accionable":false,"identidad":{}},{"id":881,"padre":340,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":927,"padre":881,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":929,"padre":927,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":931,"padre":929,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":933,"padre":931,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":366},"parcial":true,"accionable":false,"identidad":{}},{"id":935,"padre":933,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":366},"parcial":true,"accionable":false,"identidad":{}},{"id":938,"padre":935,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":366},"parcial":true,"accionable":false,"identidad":{}},{"id":939,"padre":938,"tipo":"BUTTON","caja":{"x":1240,"y":272,"w":50,"h":50},"parcial":false,"accionable":true,"identidad":{"aria-label":"Previous","type":"button"}},{"id":940,"padre":939,"tipo":"::BEFORE","caja":{"x":1262,"y":291.5,"w":6,"h":11},"parcial":false,"accionable":false,"identidad":{}},{"id":943,"padre":938,"tipo":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"parcial":true,"accionable":true,"identidad":{}},{"id":944,"padre":943,"tipo":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"parcial":true,"accionable":false,"identidad":{}},{"id":992,"padre":944,"tipo":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"parcial":false,"accionable":false,"identidad":{"role":"tabpanel"}},{"id":994,"padre":992,"tipo":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"parcial":false,"accionable":false,"identidad":{}},{"id":997,"padre":994,"tipo":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"parcial":false,"accionable":false,"identidad":{}},{"id":999,"padre":997,"tipo":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"parcial":false,"accionable":false,"identidad":{}},{"id":1001,"padre":999,"tipo":"DIV","caja":{"x":0,"y":86,"w":1440,"h":280},"parcial":false,"accionable":false,"identidad":{}},{"id":1002,"padre":1001,"tipo":"IMG","caja":{"x":0,"y":86,"w":1440,"h":280},"parcial":false,"accionable":false,"identidad":{"alt":"banner nariño"}},{"id":1017,"padre":994,"tipo":"DIV","caja":{"x":50,"y":123,"w":523.5,"h":194},"parcial":false,"accionable":false,"identidad":{}},{"id":1019,"padre":1017,"tipo":"DIV","caja":{"x":50,"y":123,"w":523.5,"h":194},"parcial":false,"accionable":false,"identidad":{}},{"id":1021,"padre":1019,"tipo":"H2","caja":{"x":50,"y":123,"w":363.625,"h":29},"parcial":false,"accionable":false,"identidad":{"role":"heading"}},{"id":1022,"padre":1021,"tipo":"#TEXT","caja":{"x":50,"y":123,"w":363.625,"h":29},"parcial":false,"accionable":false,"identidad":{}},{"id":1024,"padre":1019,"tipo":"P","caja":{"x":50,"y":171,"w":523.5,"h":77},"parcial":false,"accionable":false,"identidad":{}},{"id":1025,"padre":1024,"tipo":"#TEXT","caja":{"x":50,"y":171,"w":523.5,"h":77},"parcial":false,"accionable":false,"identidad":{}},{"id":1027,"padre":1019,"tipo":"DIV","caja":{"x":50,"y":268,"w":172.78125,"h":49},"parcial":false,"accionable":false,"identidad":{}},{"id":1029,"padre":1027,"tipo":"DIV","caja":{"x":50,"y":268,"w":172.78125,"h":49},"parcial":false,"accionable":false,"identidad":{}},{"id":1030,"padre":1029,"tipo":"A","caja":{"x":50,"y":268,"w":172.78125,"h":49},"parcial":false,"accionable":true,"identidad":{"href":"https://cutt.ly/aykw0LWZ","aria-label":"Conoce más - Se abre en una pestaña nueva."}},{"id":1031,"padre":1030,"tipo":"#TEXT","caja":{"x":70,"y":281,"w":132.78125,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":1538,"padre":938,"tipo":"BUTTON","caja":{"x":1303,"y":272,"w":50,"h":50},"parcial":false,"accionable":true,"identidad":{"aria-label":"Next","type":"button"}},{"id":1539,"padre":1538,"tipo":"::BEFORE","caja":{"x":1325,"y":291.5,"w":6,"h":11},"parcial":false,"accionable":false,"identidad":{}},{"id":1541,"padre":938,"tipo":"UL","caja":{"x":0,"y":0,"w":248,"h":357},"parcial":false,"accionable":false,"identidad":{"role":"tablist"}},{"id":1542,"padre":1541,"tipo":"LI","caja":{"x":0,"y":0,"w":148,"h":357},"parcial":false,"accionable":true,"identidad":{"role":"presentation"}},{"id":1543,"padre":1542,"tipo":"BUTTON","caja":{"x":86,"y":347,"w":62,"h":10},"parcial":false,"accionable":true,"identidad":{"type":"button","role":"tab","aria-label":"1 of 6"}},{"id":1544,"padre":1543,"tipo":"::BEFORE","caja":{"x":86,"y":347,"w":62,"h":10},"parcial":false,"accionable":false,"identidad":{}},{"id":1546,"padre":1541,"tipo":"LI","caja":{"x":0,"y":0,"w":168,"h":357},"parcial":false,"accionable":true,"identidad":{"role":"presentation"}},{"id":1547,"padre":1546,"tipo":"BUTTON","caja":{"x":158,"y":347,"w":10,"h":10},"parcial":false,"accionable":true,"identidad":{"type":"button","role":"tab","aria-label":"2 of 6"}},{"id":1548,"padre":1547,"tipo":"::BEFORE","caja":{"x":158,"y":347,"w":10,"h":10},"parcial":false,"accionable":false,"identidad":{}},{"id":1550,"padre":1541,"tipo":"LI","caja":{"x":0,"y":0,"w":188,"h":357},"parcial":false,"accionable":true,"identidad":{"role":"presentation"}},{"id":1551,"padre":1550,"tipo":"BUTTON","caja":{"x":178,"y":347,"w":10,"h":10},"parcial":false,"accionable":true,"identidad":{"type":"button","role":"tab","aria-label":"3 of 6"}},{"id":1552,"padre":1551,"tipo":"::BEFORE","caja":{"x":178,"y":347,"w":10,"h":10},"parcial":false,"accionable":false,"identidad":{}},{"id":1554,"padre":1541,"tipo":"LI","caja":{"x":0,"y":0,"w":208,"h":357},"parcial":false,"accionable":true,"identidad":{"role":"presentation"}},{"id":1555,"padre":1554,"tipo":"BUTTON","caja":{"x":198,"y":347,"w":10,"h":10},"parcial":false,"accionable":true,"identidad":{"type":"button","role":"tab","aria-label":"4 of 6"}},{"id":1556,"padre":1555,"tipo":"::BEFORE","caja":{"x":198,"y":347,"w":10,"h":10},"parcial":false,"accionable":false,"identidad":{}},{"id":1558,"padre":1541,"tipo":"LI","caja":{"x":0,"y":0,"w":228,"h":357},"parcial":false,"accionable":true,"identidad":{"role":"presentation"}},{"id":1559,"padre":1558,"tipo":"BUTTON","caja":{"x":218,"y":347,"w":10,"h":10},"parcial":false,"accionable":true,"identidad":{"type":"button","role":"tab","aria-label":"5 of 6"}},{"id":1560,"padre":1559,"tipo":"::BEFORE","caja":{"x":218,"y":347,"w":10,"h":10},"parcial":false,"accionable":false,"identidad":{}},{"id":1562,"padre":1541,"tipo":"LI","caja":{"x":0,"y":0,"w":248,"h":357},"parcial":false,"accionable":true,"identidad":{"role":"presentation"}},{"id":1563,"padre":1562,"tipo":"BUTTON","caja":{"x":238,"y":347,"w":10,"h":10},"parcial":false,"accionable":true,"identidad":{"type":"button","role":"tab","aria-label":"6 of 6"}},{"id":1564,"padre":1563,"tipo":"::BEFORE","caja":{"x":238,"y":347,"w":10,"h":10},"parcial":false,"accionable":false,"identidad":{}},{"id":1569,"padre":931,"tipo":"DIV","caja":{"x":0,"y":366,"w":1440,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":1571,"padre":1569,"tipo":"DIV","caja":{"x":0,"y":366,"w":1440,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":1574,"padre":1571,"tipo":"DIV","caja":{"x":0,"y":366,"w":1440,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":1576,"padre":1574,"tipo":"UL","caja":{"x":0,"y":366,"w":1440,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":1578,"padre":1576,"tipo":"LI","caja":{"x":240.15625,"y":374,"w":215.875,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":1580,"padre":1578,"tipo":"A","caja":{"x":240.15625,"y":374,"w":215.875,"h":30},"parcial":false,"accionable":true,"identidad":{"href":"/afiliados/pbs/derechos-deberes"}},{"id":1582,"padre":1580,"tipo":"DIV","caja":{"x":240.15625,"y":374,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":1583,"padre":1582,"tipo":"IMG","caja":{"x":240.15625,"y":374,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{"alt":"icon menu","role":"img"}},{"id":1584,"padre":1580,"tipo":"#TEXT","caja":{"x":280.15625,"y":380.5,"w":175.875,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":1587,"padre":1576,"tipo":"LI","caja":{"x":476.03125,"y":374,"w":144.796875,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":1589,"padre":1587,"tipo":"A","caja":{"x":476.03125,"y":374,"w":144.796875,"h":30},"parcial":false,"accionable":true,"identidad":{"href":"/afiliados/pac-pbs/directorio-medico"}},{"id":1591,"padre":1589,"tipo":"DIV","caja":{"x":476.03125,"y":374,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":1592,"padre":1591,"tipo":"IMG","caja":{"x":476.03125,"y":374,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{"alt":"icon menu","role":"img"}},{"id":1593,"padre":1589,"tipo":"#TEXT","caja":{"x":516.03125,"y":380.5,"w":104.796875,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":1596,"padre":1576,"tipo":"LI","caja":{"x":640.828125,"y":374,"w":164.96875,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":1598,"padre":1596,"tipo":"A","caja":{"x":640.828125,"y":374,"w":164.96875,"h":30},"parcial":false,"accionable":true,"identidad":{"href":"/contactanos"}},{"id":1600,"padre":1598,"tipo":"DIV","caja":{"x":640.828125,"y":374,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":1601,"padre":1600,"tipo":"IMG","caja":{"x":640.828125,"y":374,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{"alt":"icon menu","role":"img"}},{"id":1602,"padre":1598,"tipo":"#TEXT","caja":{"x":680.828125,"y":380.5,"w":124.96875,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":1605,"padre":1576,"tipo":"LI","caja":{"x":825.796875,"y":374,"w":195.890625,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":1607,"padre":1605,"tipo":"A","caja":{"x":825.796875,"y":374,"w":195.890625,"h":30},"parcial":false,"accionable":true,"identidad":{"href":"/famisanar-mas-cerca-de-ti"}},{"id":1609,"padre":1607,"tipo":"DIV","caja":{"x":825.796875,"y":374,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":1610,"padre":1609,"tipo":"IMG","caja":{"x":825.796875,"y":374,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{"alt":"icon menu","role":"img"}},{"id":1611,"padre":1607,"tipo":"#TEXT","caja":{"x":865.796875,"y":380.5,"w":155.890625,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":1614,"padre":1576,"tipo":"LI","caja":{"x":1041.6875,"y":374,"w":158.140625,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":1616,"padre":1614,"tipo":"A","caja":{"x":1041.6875,"y":374,"w":158.140625,"h":30},"parcial":false,"accionable":true,"identidad":{"href":"/participacion-social"}},{"id":1618,"padre":1616,"tipo":"DIV","caja":{"x":1041.6875,"y":374,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{}},{"id":1619,"padre":1618,"tipo":"IMG","caja":{"x":1041.6875,"y":374,"w":30,"h":30},"parcial":false,"accionable":false,"identidad":{"alt":"icon menu","role":"img"}},{"id":1620,"padre":1616,"tipo":"#TEXT","caja":{"x":1081.6875,"y":380.5,"w":118.140625,"h":17},"parcial":false,"accionable":false,"identidad":{}},{"id":1627,"padre":931,"tipo":"DIV","caja":{"x":92,"y":429,"w":1256,"h":471},"parcial":true,"accionable":false,"identidad":{}},{"id":1629,"padre":1627,"tipo":"DIV","caja":{"x":92,"y":429,"w":1256,"h":471},"parcial":true,"accionable":false,"identidad":{}},{"id":1632,"padre":1629,"tipo":"DIV","caja":{"x":92,"y":429,"w":1256,"h":471},"parcial":true,"accionable":false,"identidad":{}},{"id":1634,"padre":1632,"tipo":"DIV","caja":{"x":92,"y":429,"w":1256,"h":471},"parcial":true,"accionable":false,"identidad":{}},{"id":1636,"padre":1634,"tipo":"DIV","caja":{"x":92,"y":429,"w":1256,"h":471},"parcial":true,"accionable":false,"identidad":{}},{"id":1641,"padre":1636,"tipo":"DIV","caja":{"x":92,"y":429,"w":1256,"h":471},"parcial":true,"accionable":false,"identidad":{}},{"id":1643,"padre":1641,"tipo":"DIV","caja":{"x":92,"y":429,"w":405.328125,"h":440.390625},"parcial":false,"accionable":false,"identidad":{}},{"id":1645,"padre":1643,"tipo":"DIV","caja":{"x":128.296875,"y":429,"w":332.734375,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1646,"padre":1645,"tipo":"#TEXT","caja":{"x":128.296875,"y":429,"w":332.734375,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1648,"padre":1643,"tipo":"DIV","caja":{"x":92,"y":469.390625,"w":405.328125,"h":400},"parcial":false,"accionable":true,"identidad":{}},{"id":1649,"padre":1648,"tipo":"IMG","caja":{"x":93,"y":470.390625,"w":403.328125,"h":398},"parcial":false,"accionable":false,"identidad":{"alt":"PAC"}},{"id":1653,"padre":null,"tipo":"P","caja":{"x":169.09375,"y":553.1875,"w":251.125,"h":64},"parcial":false,"accionable":false,"identidad":{}},{"id":1654,"padre":1653,"tipo":"#TEXT","caja":{"x":169.09375,"y":553.1875,"w":251.125,"h":64},"parcial":false,"accionable":false,"identidad":{}},{"id":1656,"padre":null,"tipo":"P","caja":{"x":142.5,"y":630.1875,"w":304.328125,"h":79},"parcial":false,"accionable":false,"identidad":{}},{"id":1657,"padre":1656,"tipo":"#TEXT","caja":{"x":142.5,"y":630.1875,"w":304.328125,"h":79},"parcial":false,"accionable":false,"identidad":{}},{"id":1659,"padre":null,"tipo":"SPAN","caja":{"x":204.6875,"y":737.1875,"w":179.9375,"h":44.390625},"parcial":false,"accionable":false,"identidad":{}},{"id":1660,"padre":1659,"tipo":"#TEXT","caja":{"x":239.6875,"y":749.1875,"w":109.9375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":1664,"padre":1641,"tipo":"DIV","caja":{"x":517.328125,"y":429,"w":405.328125,"h":440.390625},"parcial":false,"accionable":false,"identidad":{}},{"id":1666,"padre":1664,"tipo":"DIV","caja":{"x":595.609375,"y":429,"w":248.765625,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1667,"padre":1666,"tipo":"#TEXT","caja":{"x":595.609375,"y":429,"w":248.765625,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1669,"padre":1664,"tipo":"DIV","caja":{"x":517.328125,"y":469.390625,"w":405.328125,"h":400},"parcial":false,"accionable":true,"identidad":{}},{"id":1670,"padre":1669,"tipo":"IMG","caja":{"x":518.328125,"y":470.390625,"w":403.328125,"h":398},"parcial":false,"accionable":false,"identidad":{"alt":"Asesor Virtual"}},{"id":1674,"padre":null,"tipo":"P","caja":{"x":626.265625,"y":567.1875,"w":187.453125,"h":64},"parcial":false,"accionable":false,"identidad":{}},{"id":1675,"padre":1674,"tipo":"#TEXT","caja":{"x":626.265625,"y":567.1875,"w":187.453125,"h":64},"parcial":false,"accionable":false,"identidad":{}},{"id":1677,"padre":null,"tipo":"P","caja":{"x":573.453125,"y":644.1875,"w":293.0625,"h":51},"parcial":false,"accionable":false,"identidad":{}},{"id":1678,"padre":1677,"tipo":"#TEXT","caja":{"x":573.453125,"y":644.1875,"w":293.0625,"h":51},"parcial":false,"accionable":false,"identidad":{}},{"id":1680,"padre":null,"tipo":"SPAN","caja":{"x":629.1875,"y":723.1875,"w":181.59375,"h":44.390625},"parcial":false,"accionable":false,"identidad":{}},{"id":1681,"padre":1680,"tipo":"#TEXT","caja":{"x":664.1875,"y":735.1875,"w":111.59375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":1685,"padre":1641,"tipo":"DIV","caja":{"x":942.65625,"y":429,"w":405.34375,"h":440.390625},"parcial":false,"accionable":false,"identidad":{}},{"id":1687,"padre":1685,"tipo":"DIV","caja":{"x":1121.75,"y":429,"w":47.15625,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1688,"padre":1687,"tipo":"#TEXT","caja":{"x":1121.75,"y":429,"w":47.15625,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":1690,"padre":1685,"tipo":"DIV","caja":{"x":942.65625,"y":469.390625,"w":405.34375,"h":400},"parcial":false,"accionable":true,"identidad":{}},{"id":1691,"padre":1690,"tipo":"IMG","caja":{"x":943.65625,"y":470.390625,"w":403.34375,"h":398},"parcial":false,"accionable":false,"identidad":{"alt":"Pagos PSE"}},{"id":1695,"padre":null,"tipo":"P","caja":{"x":1111.03125,"y":581.1875,"w":68.59375,"h":36},"parcial":false,"accionable":false,"identidad":{}},{"id":1696,"padre":1695,"tipo":"#TEXT","caja":{"x":1111.03125,"y":581.1875,"w":68.59375,"h":36},"parcial":false,"accionable":false,"identidad":{}},{"id":1698,"padre":null,"tipo":"P","caja":{"x":986.984375,"y":630.1875,"w":316.671875,"h":51},"parcial":false,"accionable":false,"identidad":{}},{"id":1699,"padre":1698,"tipo":"#TEXT","caja":{"x":986.984375,"y":630.1875,"w":316.671875,"h":51},"parcial":false,"accionable":false,"identidad":{}},{"id":1701,"padre":null,"tipo":"SPAN","caja":{"x":1056.875,"y":709.1875,"w":176.890625,"h":44.390625},"parcial":false,"accionable":false,"identidad":{}},{"id":1702,"padre":1701,"tipo":"#TEXT","caja":{"x":1091.875,"y":721.1875,"w":106.890625,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":1706,"padre":1641,"tipo":"DIV","caja":{"x":92,"y":890.390625,"w":405.328125,"h":9.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1708,"padre":1706,"tipo":"DIV","caja":{"x":153.59375,"y":890.390625,"w":282.125,"h":9.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1709,"padre":1708,"tipo":"#TEXT","caja":{"x":153.59375,"y":890.390625,"w":282.125,"h":9.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1727,"padre":1641,"tipo":"DIV","caja":{"x":517.328125,"y":890.390625,"w":405.328125,"h":9.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1729,"padre":1727,"tipo":"DIV","caja":{"x":682.78125,"y":890.390625,"w":74.40625,"h":9.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1730,"padre":1729,"tipo":"#TEXT","caja":{"x":682.78125,"y":890.390625,"w":74.40625,"h":9.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1748,"padre":1641,"tipo":"DIV","caja":{"x":942.65625,"y":890.390625,"w":405.34375,"h":9.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1750,"padre":1748,"tipo":"DIV","caja":{"x":1065.796875,"y":890.390625,"w":159.046875,"h":9.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":1751,"padre":1750,"tipo":"#TEXT","caja":{"x":1065.796875,"y":890.390625,"w":159.046875,"h":9.609375},"parcial":true,"accionable":false,"identidad":{}},{"id":3089,"padre":266,"tipo":"DIV","caja":{"x":1365,"y":745,"w":55,"h":55},"parcial":false,"accionable":false,"identidad":{}},{"id":3091,"padre":3089,"tipo":"A","caja":{"x":1365,"y":745,"w":55,"h":55},"parcial":false,"accionable":true,"identidad":{"href":"https://wa.me/573006438831?text=Hola+Camila%2C+Requiero+de+tu+ayuda"}},{"id":3093,"padre":3091,"tipo":"SVG","caja":{"x":1377.5,"y":745,"w":30,"h":55},"parcial":false,"accionable":false,"identidad":{"role":"img"}}],"g6_parentesco":[[0,null],[2,0],[266,2],[316,266],[323,316],[324,323],[325,324],[328,323],[340,266],[342,340],[347,342],[349,347],[351,349],[353,351],[355,353],[357,355],[362,349],[364,362],[366,364],[367,366],[369,364],[371,369],[373,371],[375,373],[378,369],[380,378],[382,380],[385,369],[387,385],[389,387],[392,369],[394,392],[396,394],[399,369],[401,399],[403,401],[439,349],[441,439],[443,441],[453,443],[472,349],[474,472],[476,472],[478,472],[881,340],[927,881],[929,927],[931,929],[933,931],[935,933],[938,935],[939,938],[940,939],[943,938],[944,943],[992,944],[994,992],[997,994],[999,997],[1001,999],[1002,1001],[1017,994],[1019,1017],[1021,1019],[1022,1021],[1024,1019],[1025,1024],[1027,1019],[1029,1027],[1030,1029],[1031,1030],[1538,938],[1539,1538],[1541,938],[1542,1541],[1543,1542],[1544,1543],[1546,1541],[1547,1546],[1548,1547],[1550,1541],[1551,1550],[1552,1551],[1554,1541],[1555,1554],[1556,1555],[1558,1541],[1559,1558],[1560,1559],[1562,1541],[1563,1562],[1564,1563],[1569,931],[1571,1569],[1574,1571],[1576,1574],[1578,1576],[1580,1578],[1582,1580],[1583,1582],[1584,1580],[1587,1576],[1589,1587],[1591,1589],[1592,1591],[1593,1589],[1596,1576],[1598,1596],[1600,1598],[1601,1600],[1602,1598],[1605,1576],[1607,1605],[1609,1607],[1610,1609],[1611,1607],[1614,1576],[1616,1614],[1618,1616],[1619,1618],[1620,1616],[1627,931],[1629,1627],[1632,1629],[1634,1632],[1636,1634],[1641,1636],[1643,1641],[1645,1643],[1646,1645],[1648,1643],[1649,1648],[1653,null],[1654,1653],[1656,null],[1657,1656],[1659,null],[1660,1659],[1664,1641],[1666,1664],[1667,1666],[1669,1664],[1670,1669],[1674,null],[1675,1674],[1677,null],[1678,1677],[1680,null],[1681,1680],[1685,1641],[1687,1685],[1688,1687],[1690,1685],[1691,1690],[1695,null],[1696,1695],[1698,null],[1699,1698],[1701,null],[1702,1701],[1706,1641],[1708,1706],[1709,1708],[1727,1641],[1729,1727],[1730,1729],[1748,1641],[1750,1748],[1751,1750],[3089,266],[3091,3089],[3093,3091],[3094,3093]],"g6_catalogo_convenciones":"v1, 2026-09-10, ocho convenciones K1..K8 en la rubrica de G6","g6_limites":["Se buscan candidatos en todas las posiciones visibles; estar en una ranura no certifica función ni incumplimiento.","Las listas son completas para los nodos retenidos; pueden faltar ancestros o atributos. Sin href observado no se demuestra que el logo carezca de enlace.","La ausencia de un pie o una ruta en el viewport no demuestra que el sitio carezca de ellos. No inferir estructura fuera de pantalla.","No se registran texto, valores de campos ni asociaciones for/id que el snapshot no conserva. Las etiquetas y operaciones requieren screenshot.","Contenedores vacíos y separadores son candidatos a R, no redundancias confirmadas. No contar ancestros y descendientes como el mismo hallazgo duplicado.","La lectura de R, T y convenciones usa screenshot: esta no es una comparación limpia entre canales."],"g6_criterios_con_lectura_de_texto":["R","T","K_ap","K"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g6"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["R","T","K","ninguna",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","R","T","K_ap","K","K_broken","catalog_version","convenciones","R_ids","bloques_ids","R_bloques_ids","R_distribucion","T_operaciones","T_evaluable","elimina_trabajo","mejora_ids"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"R":{"type":["integer","null"],"minimum":0},"T":{"type":["integer","null"],"minimum":0},"K_ap":{"type":"integer","minimum":0},"K":{"type":"integer","minimum":0},"K_broken":{"type":"array","items":{"type":"string"}},"catalog_version":{"type":"string","const":"v1, 2026-09-10"},"convenciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","aplica","cumple","evidencia_ids","razon"],"properties":{"id":{"enum":["K1","K2","K3","K4","K5","K6","K7","K8"],"type":"string"},"aplica":{"type":["boolean","null"]},"cumple":{"type":["boolean","null"]},"evidencia_ids":{"type":"array","items":{"type":"integer"}},"razon":{"type":"string"}}}},"R_ids":{"type":"array","items":{"type":"integer"}},"bloques_ids":{"type":"array","items":{"type":"integer"}},"R_bloques_ids":{"type":"array","items":{"type":"integer"}},"R_distribucion":{"enum":["ninguna","aislada","intermedia","generalizada","indeterminada"],"type":"string"},"T_operaciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","descripcion","datos_ids"],"properties":{"id":{"type":"integer"},"descripcion":{"type":"string"},"datos_ids":{"type":"array","items":{"type":"integer"}}}}},"T_evaluable":{"type":["boolean","null"]},"elimina_trabajo":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"126226517ead1202ac1b5b9e9184ea108d30ddc180eea1cdf44306f8b69ddf4e","wireframe":"abe2a8093e8766424c443a40a18688d3271a4854966a06d7996d1e83d7021b25"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.