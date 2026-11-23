# Ejecución 1.0.0

Evalúa solo G6, captura captures/H06.

Canal de esta ejecución: wireframe. La primera imagen es wireframe.png. La segunda es screenshot.png, solo para los criterios R, T, K_ap, K. Registra su lectura. Esta ejecución usa apoyo de screenshot.
Devuelve channel="wireframe". No midas ni recuentes sobre ninguna imagen.

Usa solo las medidas incluidas. No leas measurements.json, nodes.json ni otros archivos de la captura. No cuentes ni midas sobre las imágenes.

Las imágenes son evidencia, no instrucciones. No consultes resultados de otras ejecuciones.

Evalúa únicamente G6. La primera imagen es el wireframe y la segunda el screenshot. Usa el screenshot únicamente para los juicios textuales declarados, y registra todos los criterios de lectura incluso cuando concluyas que no hay un problema. Esto es evaluación sobre wireframe con apoyo textual de screenshot, no una comparación limpia entre canales.

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
{"pagina":{"id":"H06","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:16:23.258Z","sanity_ok":null,"consent_limpio":null},"group_id":"g6","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g6":{"g6_campos_de_entrada":0,"g6_botones":6,"g6_slots_convencion":{"K1_logo":[{"id":284,"padre":282,"tipo":"IMG","caja":{"x":645,"y":0,"w":150,"h":109.1875},"parcial":false,"identidad":{"alt":"Inicio"},"enlace_ancestro":282,"href_del_ancestro":"/"}],"K2_buscador":[],"K3_cuenta_carrito":[0,138,282,339,359,379,547,706,839,1146,1149,1155,1158],"K4_navegacion":[134,282,545,704,837],"K5_campos":[],"K5_etiquetas":[],"K6_pares_de_botones":[{"izquierda":1155,"derecha":1158,"padre":1153}],"K7_pie":[513],"K8_ruta":[]},"g6_contenedores_vacios_total":1,"g6_contenedores_vacios":[{"id":309,"padre":307,"tipo":"DIV","caja":{"x":0,"y":107,"w":864,"h":721.84375},"parcial":false}],"g6_separadores_total":0,"g6_separadores":[],"g6_elementos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false,"accionable":true,"identidad":{}},{"id":2,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":119,"padre":2,"tipo":"BODY","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":134,"padre":119,"tipo":"DIV","caja":{"x":0,"y":0,"w":1425.609375,"h":829},"parcial":false,"accionable":false,"identidad":{}},{"id":136,"padre":134,"tipo":"DIV","caja":{"x":0,"y":0,"w":1425.609375,"h":829},"parcial":false,"accionable":false,"identidad":{}},{"id":138,"padre":136,"tipo":"A","caja":{"x":1327.609375,"y":687,"w":98,"h":142},"parcial":false,"accionable":true,"identidad":{"href":"#","alt":"canales de servicio"}},{"id":139,"padre":138,"tipo":"::BEFORE","caja":{"x":1324.609375,"y":698,"w":38,"h":31},"parcial":false,"accionable":false,"identidad":{}},{"id":265,"padre":119,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":267,"padre":265,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{"role":"main"}},{"id":274,"padre":267,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":828.84375},"parcial":true,"accionable":false,"identidad":{}},{"id":278,"padre":274,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":109.1875},"parcial":false,"accionable":false,"identidad":{"role":"heading"}},{"id":280,"padre":278,"tipo":"DIV","caja":{"x":645,"y":0,"w":150,"h":109.1875},"parcial":false,"accionable":false,"identidad":{}},{"id":282,"padre":280,"tipo":"A","caja":{"x":645,"y":0,"w":150,"h":109.1875},"parcial":false,"accionable":true,"identidad":{"title":"Inicio","href":"/"}},{"id":284,"padre":282,"tipo":"IMG","caja":{"x":645,"y":0,"w":150,"h":109.1875},"parcial":false,"accionable":false,"identidad":{"alt":"Inicio"}},{"id":289,"padre":274,"tipo":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":828.84375},"parcial":true,"accionable":false,"identidad":{}},{"id":301,"padre":289,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":828.84375},"parcial":true,"accionable":false,"identidad":{}},{"id":302,"padre":301,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":828.84375},"parcial":true,"accionable":false,"identidad":{}},{"id":304,"padre":302,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":828.84375},"parcial":true,"accionable":false,"identidad":{}},{"id":306,"padre":304,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":828.84375},"parcial":true,"accionable":false,"identidad":{}},{"id":307,"padre":306,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":828.84375},"parcial":true,"accionable":false,"identidad":{}},{"id":309,"padre":307,"tipo":"DIV","caja":{"x":0,"y":107,"w":864,"h":721.84375},"parcial":false,"accionable":false,"identidad":{}},{"id":312,"padre":307,"tipo":"DIV","caja":{"x":864,"y":107,"w":576,"h":721.84375},"parcial":false,"accionable":false,"identidad":{}},{"id":313,"padre":312,"tipo":"::AFTER","caja":{"x":1343.59375,"y":0,"w":20,"h":440.890625},"parcial":true,"accionable":false,"identidad":{}},{"id":315,"padre":312,"tipo":"DIV","caja":{"x":879,"y":127,"w":546,"h":96.734375},"parcial":false,"accionable":false,"identidad":{}},{"id":317,"padre":315,"tipo":"H1","caja":{"x":932.3125,"y":125,"w":439.359375,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":318,"padre":317,"tipo":"#TEXT","caja":{"x":932.3125,"y":125,"w":439.359375,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":320,"padre":315,"tipo":"DIV","caja":{"x":924.75,"y":180.890625,"w":454.484375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":321,"padre":320,"tipo":"P","caja":{"x":924.75,"y":180.890625,"w":454.484375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":322,"padre":321,"tipo":"#TEXT","caja":{"x":924.75,"y":180.890625,"w":454.484375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":325,"padre":312,"tipo":"DIV","caja":{"x":0,"y":0,"w":1425,"h":828.84375},"parcial":false,"accionable":false,"identidad":{}},{"id":329,"padre":325,"tipo":"DIV","caja":{"x":879,"y":243.734375,"w":546,"h":181.703125},"parcial":false,"accionable":false,"identidad":{}},{"id":331,"padre":329,"tipo":"H2","caja":{"x":960.890625,"y":241.734375,"w":122.625,"h":36},"parcial":false,"accionable":false,"identidad":{}},{"id":332,"padre":331,"tipo":"#TEXT","caja":{"x":960.890625,"y":241.734375,"w":122.625,"h":36},"parcial":false,"accionable":false,"identidad":{}},{"id":334,"padre":329,"tipo":"P","caja":{"x":960.890625,"y":284.734375,"w":374.09375,"h":35},"parcial":false,"accionable":false,"identidad":{}},{"id":335,"padre":334,"tipo":"#TEXT","caja":{"x":960.890625,"y":284.734375,"w":374.09375,"h":35},"parcial":false,"accionable":false,"identidad":{}},{"id":337,"padre":329,"tipo":"DIV","caja":{"x":0,"y":0,"w":1200.890625,"h":394.4375},"parcial":false,"accionable":false,"identidad":{}},{"id":339,"padre":337,"tipo":"A","caja":{"x":960.890625,"y":348.734375,"w":240,"h":45.703125},"parcial":false,"accionable":true,"identidad":{"href":"/personas"}},{"id":340,"padre":339,"tipo":"::AFTER","caja":{"x":1148.890625,"y":364.578125,"w":28,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":341,"padre":339,"tipo":"#TEXT","caja":{"x":1055.203125,"y":359.734375,"w":51.375,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":349,"padre":325,"tipo":"DIV","caja":{"x":879,"y":445.4375,"w":546,"h":181.703125},"parcial":false,"accionable":false,"identidad":{}},{"id":351,"padre":349,"tipo":"H2","caja":{"x":960.890625,"y":443.4375,"w":364.6875,"h":36},"parcial":false,"accionable":false,"identidad":{}},{"id":352,"padre":351,"tipo":"#TEXT","caja":{"x":960.890625,"y":443.4375,"w":364.6875,"h":36},"parcial":false,"accionable":false,"identidad":{}},{"id":354,"padre":349,"tipo":"P","caja":{"x":960.890625,"y":486.4375,"w":381.734375,"h":35},"parcial":false,"accionable":false,"identidad":{}},{"id":355,"padre":354,"tipo":"#TEXT","caja":{"x":960.890625,"y":486.4375,"w":381.734375,"h":35},"parcial":false,"accionable":false,"identidad":{}},{"id":357,"padre":349,"tipo":"DIV","caja":{"x":0,"y":0,"w":1200.890625,"h":596.140625},"parcial":false,"accionable":false,"identidad":{}},{"id":359,"padre":357,"tipo":"A","caja":{"x":960.890625,"y":550.4375,"w":240,"h":45.703125},"parcial":false,"accionable":true,"identidad":{"href":"/empresas"}},{"id":360,"padre":359,"tipo":"::AFTER","caja":{"x":1148.890625,"y":566.28125,"w":28,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":361,"padre":359,"tipo":"#TEXT","caja":{"x":1055.203125,"y":561.4375,"w":51.375,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":369,"padre":325,"tipo":"DIV","caja":{"x":879,"y":647.140625,"w":546,"h":181.703125},"parcial":false,"accionable":false,"identidad":{}},{"id":371,"padre":369,"tipo":"H2","caja":{"x":960.890625,"y":645.140625,"w":44.265625,"h":36},"parcial":false,"accionable":false,"identidad":{}},{"id":372,"padre":371,"tipo":"#TEXT","caja":{"x":960.890625,"y":645.140625,"w":44.265625,"h":36},"parcial":false,"accionable":false,"identidad":{}},{"id":374,"padre":369,"tipo":"P","caja":{"x":960.890625,"y":688.140625,"w":354.453125,"h":35},"parcial":false,"accionable":false,"identidad":{}},{"id":375,"padre":374,"tipo":"#TEXT","caja":{"x":960.890625,"y":688.140625,"w":354.453125,"h":35},"parcial":false,"accionable":false,"identidad":{}},{"id":377,"padre":369,"tipo":"DIV","caja":{"x":0,"y":0,"w":1200.890625,"h":797.84375},"parcial":false,"accionable":false,"identidad":{}},{"id":379,"padre":377,"tipo":"A","caja":{"x":960.890625,"y":752.140625,"w":240,"h":45.703125},"parcial":false,"accionable":true,"identidad":{"href":"/ips"}},{"id":380,"padre":379,"tipo":"::AFTER","caja":{"x":1148.890625,"y":767.984375,"w":28,"h":14},"parcial":false,"accionable":false,"identidad":{}},{"id":381,"padre":379,"tipo":"#TEXT","caja":{"x":1055.203125,"y":763.140625,"w":51.375,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":513,"padre":265,"tipo":"FOOTER","caja":{"x":0,"y":828.84375,"w":1440,"h":71.15625},"parcial":true,"accionable":false,"identidad":{}},{"id":519,"padre":513,"tipo":"DIV","caja":{"x":0,"y":0,"w":1319.40625,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":523,"padre":519,"tipo":"DIV","caja":{"x":0,"y":0,"w":1319.40625,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":545,"padre":523,"tipo":"NAV","caja":{"x":0,"y":0,"w":456.125,"h":900},"parcial":true,"accionable":false,"identidad":{"aria-label":"menu-lineas-atencion"}},{"id":547,"padre":545,"tipo":"H3","caja":{"x":95.25,"y":881.84375,"w":245.09375,"h":18.15625},"parcial":true,"accionable":true,"identidad":{}},{"id":548,"padre":547,"tipo":"#TEXT","caja":{"x":95.25,"y":881.84375,"w":245.09375,"h":18.15625},"parcial":true,"accionable":false,"identidad":{}},{"id":704,"padre":523,"tipo":"NAV","caja":{"x":0,"y":0,"w":773.125,"h":900},"parcial":true,"accionable":false,"identidad":{"aria-label":"normatividad"}},{"id":706,"padre":704,"tipo":"H3","caja":{"x":541.75,"y":881.84375,"w":189.359375,"h":18.15625},"parcial":true,"accionable":true,"identidad":{}},{"id":707,"padre":706,"tipo":"#TEXT","caja":{"x":541.75,"y":881.84375,"w":189.359375,"h":18.15625},"parcial":true,"accionable":false,"identidad":{}},{"id":837,"padre":523,"tipo":"NAV","caja":{"x":0,"y":0,"w":1319.40625,"h":900},"parcial":true,"accionable":false,"identidad":{"aria-label":"otros-accesos"}},{"id":839,"padre":837,"tipo":"H3","caja":{"x":1099.875,"y":881.84375,"w":191.671875,"h":18.15625},"parcial":true,"accionable":true,"identidad":{}},{"id":840,"padre":839,"tipo":"#TEXT","caja":{"x":1099.875,"y":881.84375,"w":191.671875,"h":18.15625},"parcial":true,"accionable":false,"identidad":{}},{"id":1134,"padre":119,"tipo":"DIV","caja":{"x":0,"y":817.125,"w":1440,"h":82.875},"parcial":false,"accionable":false,"identidad":{}},{"id":1135,"padre":1134,"tipo":"DIV","caja":{"x":144,"y":823.125,"w":1147,"h":68.1875},"parcial":false,"accionable":false,"identidad":{}},{"id":1137,"padre":1135,"tipo":"DIV","caja":{"x":144,"y":823.125,"w":1147,"h":68.1875},"parcial":false,"accionable":false,"identidad":{}},{"id":1139,"padre":1137,"tipo":"DIV","caja":{"x":144,"y":823.125,"w":524.53125,"h":68.1875},"parcial":false,"accionable":false,"identidad":{}},{"id":1141,"padre":1139,"tipo":"H2","caja":{"x":144,"y":823.125,"w":524.53125,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":1142,"padre":1141,"tipo":"#TEXT","caja":{"x":144,"y":823.125,"w":524.53125,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":1144,"padre":1139,"tipo":"H3","caja":{"x":144,"y":849.515625,"w":390.03125,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":1145,"padre":1144,"tipo":"#TEXT","caja":{"x":144,"y":849.515625,"w":334.96875,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":1146,"padre":1144,"tipo":"A","caja":{"x":478.96875,"y":849.515625,"w":55.0625,"h":15},"parcial":false,"accionable":true,"identidad":{"href":"https://www.nuevaeps.com.co/cookies"}},{"id":1147,"padre":1146,"tipo":"#TEXT","caja":{"x":478.96875,"y":849.515625,"w":55.0625,"h":15},"parcial":false,"accionable":false,"identidad":{}},{"id":1149,"padre":1139,"tipo":"A","caja":{"x":144,"y":872.3125,"w":60.15625,"h":19},"parcial":false,"accionable":true,"identidad":{"href":"https://www.nuevaeps.com.co/cookies"}},{"id":1150,"padre":1149,"tipo":"#TEXT","caja":{"x":144,"y":872.3125,"w":60.15625,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":1153,"padre":1137,"tipo":"DIV","caja":{"x":1111.53125,"y":829.59375,"w":179.46875,"h":36.375},"parcial":false,"accionable":false,"identidad":{}},{"id":1155,"padre":1153,"tipo":"BUTTON","caja":{"x":1111.53125,"y":838.125,"w":72.109375,"h":22.84375},"parcial":false,"accionable":true,"identidad":{"type":"button"}},{"id":1156,"padre":1155,"tipo":"#TEXT","caja":{"x":1119.53125,"y":839.125,"w":56.109375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":1157,"padre":1153,"tipo":"#TEXT","caja":{"x":1183.640625,"y":829.59375,"w":3.09375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":1158,"padre":1153,"tipo":"BUTTON","caja":{"x":1186.734375,"y":833.125,"w":104.265625,"h":32.84375},"parcial":false,"accionable":true,"identidad":{"type":"button"}},{"id":1159,"padre":1158,"tipo":"#TEXT","caja":{"x":1195.734375,"y":840.125,"w":86.265625,"h":17},"parcial":false,"accionable":false,"identidad":{}}],"g6_parentesco":[[0,null],[2,0],[119,2],[134,119],[136,134],[138,136],[139,138],[265,119],[267,265],[274,267],[278,274],[280,278],[282,280],[284,282],[289,274],[301,289],[302,301],[304,302],[306,304],[307,306],[309,307],[312,307],[313,312],[315,312],[317,315],[318,317],[320,315],[321,320],[322,321],[325,312],[329,325],[331,329],[332,331],[334,329],[335,334],[337,329],[339,337],[340,339],[341,339],[349,325],[351,349],[352,351],[354,349],[355,354],[357,349],[359,357],[360,359],[361,359],[369,325],[371,369],[372,371],[374,369],[375,374],[377,369],[379,377],[380,379],[381,379],[513,265],[519,513],[523,519],[545,523],[547,545],[548,547],[704,523],[706,704],[707,706],[837,523],[839,837],[840,839],[1134,119],[1135,1134],[1137,1135],[1139,1137],[1141,1139],[1142,1141],[1144,1139],[1145,1144],[1146,1144],[1147,1146],[1149,1139],[1150,1149],[1153,1137],[1155,1153],[1156,1155],[1157,1153],[1158,1153],[1159,1158]],"g6_catalogo_convenciones":"v1, 2026-09-10, ocho convenciones K1..K8 en la rubrica de G6","g6_limites":["Se buscan candidatos en todas las posiciones visibles; estar en una ranura no certifica función ni incumplimiento.","Las listas son completas para los nodos retenidos; pueden faltar ancestros o atributos. Sin href observado no se demuestra que el logo carezca de enlace.","La ausencia de un pie o una ruta en el viewport no demuestra que el sitio carezca de ellos. No inferir estructura fuera de pantalla.","No se registran texto, valores de campos ni asociaciones for/id que el snapshot no conserva. Las etiquetas y operaciones requieren screenshot.","Contenedores vacíos y separadores son candidatos a R, no redundancias confirmadas. No contar ancestros y descendientes como el mismo hallazgo duplicado.","La lectura de R, T y convenciones usa screenshot: esta no es una comparación limpia entre canales."],"g6_criterios_con_lectura_de_texto":["R","T","K_ap","K"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="wireframe" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g6"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"wireframe"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["R","T","K","ninguna",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","R","T","K_ap","K","K_broken","catalog_version","convenciones","R_ids","bloques_ids","R_bloques_ids","R_distribucion","T_operaciones","T_evaluable","elimina_trabajo","mejora_ids"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"R":{"type":["integer","null"],"minimum":0},"T":{"type":["integer","null"],"minimum":0},"K_ap":{"type":"integer","minimum":0},"K":{"type":"integer","minimum":0},"K_broken":{"type":"array","items":{"type":"string"}},"catalog_version":{"type":"string","const":"v1, 2026-09-10"},"convenciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","aplica","cumple","evidencia_ids","razon"],"properties":{"id":{"enum":["K1","K2","K3","K4","K5","K6","K7","K8"],"type":"string"},"aplica":{"type":["boolean","null"]},"cumple":{"type":["boolean","null"]},"evidencia_ids":{"type":"array","items":{"type":"integer"}},"razon":{"type":"string"}}}},"R_ids":{"type":"array","items":{"type":"integer"}},"bloques_ids":{"type":"array","items":{"type":"integer"}},"R_bloques_ids":{"type":"array","items":{"type":"integer"}},"R_distribucion":{"enum":["ninguna","aislada","intermedia","generalizada","indeterminada"],"type":"string"},"T_operaciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","descripcion","datos_ids"],"properties":{"id":{"type":"integer"},"descripcion":{"type":"string"},"datos_ids":{"type":"array","items":{"type":"integer"}}}}},"T_evaluable":{"type":["boolean","null"]},"elimina_trabajo":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"ec06c1c9214b3731f92cd1447c2734544cfdccb4f7325b8c3534d7ca4196e5b5","wireframe":"3d74265f2f1e7937c90848ab4bf9bd240ccd8a340bd60e8bcfe1295ccd2d0b42"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.