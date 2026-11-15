# Ejecución 1.0.0

Evalúa solo G6, captura captures/H01.

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
{"pagina":{"id":"H01","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:15:58.170Z","sanity_ok":null,"consent_limpio":null},"group_id":"g6","measurements_version":"1.1.0","source_measurements_version":"1.0.6","g6":{"g6_campos_de_entrada":1,"g6_botones":13,"g6_slots_convencion":{"K1_logo":[{"id":381,"padre":379,"tipo":"IMG","caja":{"x":98.5,"y":129,"w":77,"h":81.5},"parcial":false,"identidad":{"alt":"Logo del Ministerio de Salud y Protección Social"},"enlace_ancestro":379,"href_del_ancestro":"/"},{"id":777,"padre":775,"tipo":"IMG","caja":{"x":20,"y":290.5,"w":1400,"h":481.46875},"parcial":false,"identidad":{"alt":"Banner promocional con un fondo degradado de verde menta a naranja suave y un borde inferior decorativo geométrico multicolor. En la parte superior izquierda, tres fotos de caras de personas con pintura facial tradicional están enmarcadas en rombos conect"},"enlace_ancestro":775,"href_del_ancestro":"https://forms.cloud.microsoft/r/YLKK663xY0?origin=lprLink"}],"K2_buscador":[400,410],"K3_cuenta_carrito":[0,112,236,379,397,400,410,564,571,578,582,609,616,620,650,654,669,676,680,710,717,724,775,784,793,810,822,823,1807],"K4_navegacion":[355,474,476,478,491,562,563,564,565,566,570,571,572,573,577,578,579,580,582,608,609,610,611,615,616,617,618,620,649,650,651,652,654,668,669,670,671,675,676,677,678,680],"K5_campos":[400],"K5_etiquetas":[397],"K6_pares_de_botones":[{"izquierda":822,"derecha":823,"padre":818}],"K7_pie":[],"K8_ruta":[]},"g6_contenedores_vacios_total":2,"g6_contenedores_vacios":[{"id":355,"padre":351,"tipo":"DIV","caja":{"x":20,"y":40,"w":1400,"h":56},"parcial":false},{"id":410,"padre":395,"tipo":"DIV","caja":{"x":1336.8125,"y":151.75,"w":36,"h":36},"parcial":false}],"g6_separadores_total":0,"g6_separadores":[],"g6_elementos":[{"id":0,"padre":null,"tipo":"#DOCUMENT","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":false,"accionable":true,"identidad":{}},{"id":2,"padre":0,"tipo":"HTML","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":false,"identidad":{}},{"id":112,"padre":2,"tipo":"BODY","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":true,"identidad":{}},{"id":236,"padre":112,"tipo":"FORM","caja":{"x":0,"y":0,"w":1440,"h":900},"parcial":true,"accionable":true,"identidad":{}},{"id":351,"padre":236,"tipo":"HEADER","caja":{"x":20,"y":40,"w":1400,"h":250.5},"parcial":false,"accionable":false,"identidad":{}},{"id":355,"padre":351,"tipo":"DIV","caja":{"x":20,"y":40,"w":1400,"h":56},"parcial":false,"accionable":false,"identidad":{"aria-label":"Barra superior"}},{"id":367,"padre":351,"tipo":"DIV","caja":{"x":98.5,"y":129,"w":1278.3125,"h":81.5},"parcial":false,"accionable":false,"identidad":{}},{"id":369,"padre":367,"tipo":"DIV","caja":{"x":98.5,"y":129,"w":1278.3125,"h":81.5},"parcial":false,"accionable":false,"identidad":{}},{"id":371,"padre":369,"tipo":"DIV","caja":{"x":98.5,"y":129,"w":1278.3125,"h":81.5},"parcial":false,"accionable":false,"identidad":{}},{"id":375,"padre":371,"tipo":"DIV","caja":{"x":98.5,"y":129,"w":1278.3125,"h":81.5},"parcial":false,"accionable":false,"identidad":{}},{"id":377,"padre":375,"tipo":"SPAN","caja":{"x":98.5,"y":129,"w":77,"h":81.5},"parcial":false,"accionable":false,"identidad":{}},{"id":379,"padre":377,"tipo":"A","caja":{"x":98.5,"y":129,"w":77,"h":81.5},"parcial":false,"accionable":true,"identidad":{"href":"/"}},{"id":381,"padre":379,"tipo":"IMG","caja":{"x":98.5,"y":129,"w":77,"h":81.5},"parcial":false,"accionable":false,"identidad":{"alt":"Logo del Ministerio de Salud y Protección Social"}},{"id":385,"padre":375,"tipo":"DIV","caja":{"x":1074.8125,"y":148.75,"w":302,"h":43.5},"parcial":false,"accionable":false,"identidad":{}},{"id":389,"padre":385,"tipo":"DIV","caja":{"x":1074.8125,"y":148.75,"w":302,"h":43.5},"parcial":false,"accionable":false,"identidad":{}},{"id":395,"padre":389,"tipo":"DIV","caja":{"x":1074.8125,"y":148.75,"w":302,"h":43.5},"parcial":false,"accionable":false,"identidad":{}},{"id":397,"padre":395,"tipo":"LABEL","caja":{"x":1074.8125,"y":170.25,"w":136.546875,"h":22},"parcial":false,"accionable":true,"identidad":{}},{"id":398,"padre":397,"tipo":"#TEXT","caja":{"x":1074.8125,"y":170.25,"w":136.546875,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":400,"padre":395,"tipo":"INPUT","caja":{"x":1075.8125,"y":148.75,"w":301,"h":42},"parcial":false,"accionable":true,"identidad":{"type":"text"}},{"id":410,"padre":395,"tipo":"DIV","caja":{"x":1336.8125,"y":151.75,"w":36,"h":36},"parcial":false,"accionable":true,"identidad":{}},{"id":411,"padre":410,"tipo":"::AFTER","caja":{"x":1346.8125,"y":161.75,"w":16,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":474,"padre":351,"tipo":"DIV","caja":{"x":20,"y":218.5,"w":1400,"h":72},"parcial":false,"accionable":false,"identidad":{}},{"id":476,"padre":474,"tipo":"NAV","caja":{"x":60,"y":218.5,"w":1320,"h":69},"parcial":false,"accionable":false,"identidad":{"role":"navigation","aria-label":"Menú Minsalud"}},{"id":478,"padre":476,"tipo":"DIV","caja":{"x":60,"y":218.5,"w":1320,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":491,"padre":478,"tipo":"DIV","caja":{"x":60,"y":218.5,"w":1320,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":562,"padre":491,"tipo":"UL","caja":{"x":60,"y":218.5,"w":1320,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":563,"padre":562,"tipo":"LI","caja":{"x":60,"y":218.5,"w":64.3125,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":564,"padre":563,"tipo":"A","caja":{"x":76,"y":234.5,"w":32.3125,"h":19},"parcial":false,"accionable":true,"identidad":{"href":"/"}},{"id":565,"padre":564,"tipo":"SPAN","caja":{"x":76,"y":234.5,"w":32.3125,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":566,"padre":565,"tipo":"SPAN","caja":{"x":76,"y":234.5,"w":32.3125,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":567,"padre":566,"tipo":"#TEXT","caja":{"x":76,"y":234.5,"w":32.3125,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":570,"padre":562,"tipo":"LI","caja":{"x":162.234375,"y":218.5,"w":216,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":571,"padre":570,"tipo":"A","caja":{"x":178.234375,"y":234.5,"w":170.109375,"h":38},"parcial":false,"accionable":true,"identidad":{"href":"/transparencia/Paginas/transparencia-acceso-informacion.aspx"}},{"id":572,"padre":571,"tipo":"SPAN","caja":{"x":178.234375,"y":234.5,"w":170.109375,"h":38},"parcial":false,"accionable":false,"identidad":{}},{"id":573,"padre":572,"tipo":"SPAN","caja":{"x":178.234375,"y":234.5,"w":170.109375,"h":38},"parcial":false,"accionable":false,"identidad":{}},{"id":574,"padre":573,"tipo":"#TEXT","caja":{"x":178.234375,"y":234.5,"w":170.109375,"h":38},"parcial":false,"accionable":false,"identidad":{}},{"id":577,"padre":562,"tipo":"LI","caja":{"x":416.171875,"y":218.5,"w":220,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":578,"padre":577,"tipo":"A","caja":{"x":432.171875,"y":234.5,"w":196,"h":38},"parcial":false,"accionable":true,"identidad":{"href":"/Atencion-y-servicios-a-la-ciudadania/Paginas/atencion.aspx","role":"button"}},{"id":579,"padre":578,"tipo":"SPAN","caja":{"x":432.171875,"y":234.5,"w":196,"h":38},"parcial":false,"accionable":false,"identidad":{}},{"id":580,"padre":579,"tipo":"SPAN","caja":{"x":432.171875,"y":234.5,"w":152.5,"h":38},"parcial":false,"accionable":false,"identidad":{}},{"id":581,"padre":580,"tipo":"#TEXT","caja":{"x":432.171875,"y":234.5,"w":152.5,"h":38},"parcial":false,"accionable":false,"identidad":{}},{"id":582,"padre":579,"tipo":"SPAN","caja":{"x":618.171875,"y":234.5,"w":10,"h":16},"parcial":false,"accionable":true,"identidad":{"role":"button","aria-label":"Abrir submenú"}},{"id":583,"padre":582,"tipo":"::BEFORE","caja":{"x":618.171875,"y":234.5,"w":10,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":608,"padre":562,"tipo":"LI","caja":{"x":674.09375,"y":218.5,"w":86.796875,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":609,"padre":608,"tipo":"A","caja":{"x":690.09375,"y":234.5,"w":54.796875,"h":19},"parcial":false,"accionable":true,"identidad":{"href":"/Participa"}},{"id":610,"padre":609,"tipo":"SPAN","caja":{"x":690.09375,"y":234.5,"w":54.796875,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":611,"padre":610,"tipo":"SPAN","caja":{"x":690.09375,"y":234.5,"w":54.796875,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":612,"padre":611,"tipo":"#TEXT","caja":{"x":690.09375,"y":234.5,"w":54.796875,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":615,"padre":562,"tipo":"LI","caja":{"x":798.828125,"y":218.5,"w":78.203125,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":616,"padre":615,"tipo":"A","caja":{"x":814.828125,"y":234.5,"w":54.203125,"h":19},"parcial":false,"accionable":true,"identidad":{"href":"/salud/Paginas/inicio.aspx","role":"button"}},{"id":617,"padre":616,"tipo":"SPAN","caja":{"x":814.828125,"y":234.5,"w":54.203125,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":618,"padre":617,"tipo":"SPAN","caja":{"x":814.828125,"y":234.5,"w":36.203125,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":619,"padre":618,"tipo":"#TEXT","caja":{"x":814.828125,"y":234.5,"w":36.203125,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":620,"padre":617,"tipo":"SPAN","caja":{"x":859.03125,"y":234.5,"w":10,"h":16},"parcial":false,"accionable":true,"identidad":{"role":"button","aria-label":"Abrir submenú"}},{"id":621,"padre":620,"tipo":"::BEFORE","caja":{"x":859.03125,"y":234.5,"w":10,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":649,"padre":562,"tipo":"LI","caja":{"x":914.953125,"y":218.5,"w":148.734375,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":650,"padre":649,"tipo":"A","caja":{"x":930.953125,"y":234.5,"w":124.734375,"h":19},"parcial":false,"accionable":true,"identidad":{"href":"/Proteccion-Social/Paginas/Inicio.aspx","role":"button"}},{"id":651,"padre":650,"tipo":"SPAN","caja":{"x":930.953125,"y":234.5,"w":124.734375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":652,"padre":651,"tipo":"SPAN","caja":{"x":930.953125,"y":234.5,"w":106.734375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":653,"padre":652,"tipo":"#TEXT","caja":{"x":930.953125,"y":234.5,"w":106.734375,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":654,"padre":651,"tipo":"SPAN","caja":{"x":1045.6875,"y":234.5,"w":10,"h":16},"parcial":false,"accionable":true,"identidad":{"role":"button","aria-label":"Abrir submenú"}},{"id":655,"padre":654,"tipo":"::BEFORE","caja":{"x":1045.6875,"y":234.5,"w":10,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":668,"padre":562,"tipo":"LI","caja":{"x":1101.625,"y":218.5,"w":97.203125,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":669,"padre":668,"tipo":"A","caja":{"x":1117.625,"y":234.5,"w":65.203125,"h":19},"parcial":false,"accionable":true,"identidad":{"href":"https://www.minsalud.gov.co/Normativa/Paginas/normativa.aspx"}},{"id":670,"padre":669,"tipo":"SPAN","caja":{"x":1117.625,"y":234.5,"w":65.203125,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":671,"padre":670,"tipo":"SPAN","caja":{"x":1117.625,"y":234.5,"w":65.203125,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":672,"padre":671,"tipo":"#TEXT","caja":{"x":1117.625,"y":234.5,"w":65.203125,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":675,"padre":562,"tipo":"LI","caja":{"x":1236.75,"y":218.5,"w":143.25,"h":69},"parcial":false,"accionable":false,"identidad":{}},{"id":676,"padre":675,"tipo":"A","caja":{"x":1252.75,"y":234.5,"w":119.25,"h":19},"parcial":false,"accionable":true,"identidad":{"href":"/Comunicaciones","role":"button"}},{"id":677,"padre":676,"tipo":"SPAN","caja":{"x":1252.75,"y":234.5,"w":119.25,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":678,"padre":677,"tipo":"SPAN","caja":{"x":1252.75,"y":234.5,"w":101.25,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":679,"padre":678,"tipo":"#TEXT","caja":{"x":1252.75,"y":234.5,"w":101.25,"h":19},"parcial":false,"accionable":false,"identidad":{}},{"id":680,"padre":677,"tipo":"SPAN","caja":{"x":1362,"y":234.5,"w":10,"h":16},"parcial":false,"accionable":true,"identidad":{"role":"button","aria-label":"Abrir submenú"}},{"id":681,"padre":680,"tipo":"::BEFORE","caja":{"x":1362,"y":234.5,"w":10,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":708,"padre":236,"tipo":"DIV","caja":{"x":1392,"y":315,"w":48,"h":143},"parcial":false,"accionable":false,"identidad":{}},{"id":710,"padre":708,"tipo":"BUTTON","caja":{"x":1392,"y":327,"w":48,"h":40},"parcial":false,"accionable":true,"identidad":{"type":"button","aria-label":"Activar o desactivar contraste"}},{"id":711,"padre":710,"tipo":"::AFTER","caja":{"x":1404,"y":334.5,"w":24,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":711,"padre":710,"tipo":"::AFTER","caja":{"x":1408,"y":338.5,"w":16,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":717,"padre":708,"tipo":"BUTTON","caja":{"x":1392,"y":367,"w":48,"h":40},"parcial":false,"accionable":true,"identidad":{"type":"button","aria-label":"Reducir tamaño de letra"}},{"id":718,"padre":717,"tipo":"::AFTER","caja":{"x":1404,"y":374,"w":24,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":718,"padre":717,"tipo":"::AFTER","caja":{"x":1408,"y":378,"w":16,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":724,"padre":708,"tipo":"BUTTON","caja":{"x":1392,"y":407,"w":48,"h":40},"parcial":false,"accionable":true,"identidad":{"type":"button","aria-label":"Aumentar tamaño de letra"}},{"id":725,"padre":724,"tipo":"::AFTER","caja":{"x":1404,"y":414,"w":24,"h":24},"parcial":false,"accionable":false,"identidad":{}},{"id":725,"padre":724,"tipo":"::AFTER","caja":{"x":1408,"y":418,"w":16,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":747,"padre":null,"tipo":"DIV","caja":{"x":20,"y":290.5,"w":1420,"h":481.46875},"parcial":true,"accionable":false,"identidad":{}},{"id":749,"padre":747,"tipo":"DIV","caja":{"x":20,"y":290.5,"w":1420,"h":481.46875},"parcial":true,"accionable":false,"identidad":{}},{"id":751,"padre":749,"tipo":"DIV","caja":{"x":20,"y":290.5,"w":1420,"h":481.46875},"parcial":true,"accionable":false,"identidad":{}},{"id":752,"padre":751,"tipo":"DIV","caja":{"x":20,"y":290.5,"w":1420,"h":481.46875},"parcial":true,"accionable":false,"identidad":{}},{"id":759,"padre":752,"tipo":"DIV","caja":{"x":20,"y":290.5,"w":1420,"h":481.46875},"parcial":true,"accionable":false,"identidad":{}},{"id":761,"padre":759,"tipo":"DIV","caja":{"x":20,"y":290.5,"w":1420,"h":481.46875},"parcial":true,"accionable":false,"identidad":{}},{"id":773,"padre":761,"tipo":"DIV","caja":{"x":20,"y":290.5,"w":1420,"h":481.46875},"parcial":true,"accionable":false,"identidad":{}},{"id":775,"padre":773,"tipo":"A","caja":{"x":20,"y":290.5,"w":1420,"h":481.46875},"parcial":true,"accionable":true,"identidad":{"href":"https://forms.cloud.microsoft/r/YLKK663xY0?origin=lprLink","title":"null"}},{"id":777,"padre":775,"tipo":"IMG","caja":{"x":20,"y":290.5,"w":1400,"h":481.46875},"parcial":false,"accionable":false,"identidad":{"alt":"Banner promocional con un fondo degradado de verde menta a naranja suave y un borde inferior decorativo geométrico multicolor. En la parte superior izquierda, tres fotos de caras de personas con pintura facial tradicional están enmarcadas en rombos conect"}},{"id":779,"padre":775,"tipo":"SPAN","caja":{"x":1419,"y":290.5,"w":21,"h":22},"parcial":true,"accionable":false,"identidad":{}},{"id":780,"padre":779,"tipo":"#TEXT","caja":{"x":1419,"y":290.5,"w":21,"h":22},"parcial":true,"accionable":false,"identidad":{}},{"id":784,"padre":759,"tipo":"BUTTON","caja":{"x":1210,"y":483.078125,"w":210,"h":96.3125},"parcial":false,"accionable":true,"identidad":{"type":"button","aria-label":"next"}},{"id":786,"padre":784,"tipo":"SPAN","caja":{"x":1299,"y":490.734375,"w":32,"h":64},"parcial":false,"accionable":false,"identidad":{}},{"id":787,"padre":786,"tipo":"::AFTER","caja":{"x":1299,"y":490.734375,"w":32,"h":64},"parcial":false,"accionable":false,"identidad":{}},{"id":789,"padre":784,"tipo":"SPAN","caja":{"x":1314.5,"y":531.734375,"w":115.578125,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":790,"padre":789,"tipo":"#TEXT","caja":{"x":1314.5,"y":531.734375,"w":115.578125,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":793,"padre":759,"tipo":"BUTTON","caja":{"x":20,"y":483.078125,"w":210,"h":96.3125},"parcial":false,"accionable":true,"identidad":{"type":"button","aria-label":"previous"}},{"id":795,"padre":793,"tipo":"SPAN","caja":{"x":109,"y":490.734375,"w":32,"h":64},"parcial":false,"accionable":false,"identidad":{}},{"id":796,"padre":795,"tipo":"::AFTER","caja":{"x":109,"y":490.734375,"w":32,"h":64},"parcial":false,"accionable":false,"identidad":{}},{"id":798,"padre":793,"tipo":"SPAN","caja":{"x":124.5,"y":531.734375,"w":115.828125,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":799,"padre":798,"tipo":"#TEXT","caja":{"x":124.5,"y":531.734375,"w":115.828125,"h":22},"parcial":false,"accionable":false,"identidad":{}},{"id":802,"padre":759,"tipo":"DIV","caja":{"x":118,"y":726.21875,"w":92.453125,"h":21.75},"parcial":false,"accionable":false,"identidad":{"aria-label":"play"}},{"id":810,"padre":802,"tipo":"BUTTON","caja":{"x":118,"y":727.46875,"w":92.453125,"h":20.5},"parcial":false,"accionable":true,"identidad":{"type":"button","aria-label":"pause"}},{"id":811,"padre":810,"tipo":"::BEFORE","caja":{"x":121.1875,"y":729.21875,"w":14,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":812,"padre":810,"tipo":"#TEXT","caja":{"x":135.1875,"y":730.21875,"w":4.78125,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":813,"padre":810,"tipo":"SPAN","caja":{"x":147.96875,"y":726.21875,"w":59.296875,"h":21},"parcial":false,"accionable":false,"identidad":{}},{"id":814,"padre":813,"tipo":"#TEXT","caja":{"x":147.96875,"y":726.21875,"w":59.296875,"h":21},"parcial":false,"accionable":false,"identidad":{}},{"id":818,"padre":759,"tipo":"DIV","caja":{"x":700,"y":727.96875,"w":40,"h":16},"parcial":false,"accionable":false,"identidad":{}},{"id":822,"padre":818,"tipo":"BUTTON","caja":{"x":700,"y":727.96875,"w":16,"h":16},"parcial":false,"accionable":true,"identidad":{"type":"button","aria-label":"Slide 1"}},{"id":823,"padre":818,"tipo":"BUTTON","caja":{"x":724,"y":727.96875,"w":16,"h":16},"parcial":false,"accionable":true,"identidad":{"type":"button","aria-label":"Slide 2"}},{"id":915,"padre":null,"tipo":"DIV","caja":{"x":72,"y":838.96875,"w":1306.84375,"h":61.03125},"parcial":true,"accionable":false,"identidad":{}},{"id":917,"padre":915,"tipo":"DIV","caja":{"x":72,"y":838.96875,"w":1306.84375,"h":61.03125},"parcial":true,"accionable":false,"identidad":{}},{"id":919,"padre":917,"tipo":"DIV","caja":{"x":72,"y":838.96875,"w":1306.84375,"h":61.03125},"parcial":true,"accionable":false,"identidad":{}},{"id":920,"padre":919,"tipo":"DIV","caja":{"x":72,"y":838.96875,"w":1306.84375,"h":61.03125},"parcial":true,"accionable":false,"identidad":{}},{"id":927,"padre":920,"tipo":"SECTION","caja":{"x":72,"y":838.96875,"w":1306.84375,"h":61.03125},"parcial":true,"accionable":false,"identidad":{}},{"id":929,"padre":927,"tipo":"DIV","caja":{"x":72,"y":838.96875,"w":259.1875,"h":61.03125},"parcial":true,"accionable":false,"identidad":{}},{"id":931,"padre":929,"tipo":"H2","caja":{"x":72,"y":838.96875,"w":113.6875,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":932,"padre":931,"tipo":"#TEXT","caja":{"x":72,"y":838.96875,"w":113.6875,"h":46},"parcial":false,"accionable":false,"identidad":{}},{"id":1805,"padre":236,"tipo":"DIV","caja":{"x":0,"y":0,"w":1440,"h":765},"parcial":false,"accionable":false,"identidad":{}},{"id":1807,"padre":1805,"tipo":"BUTTON","caja":{"x":1386,"y":711,"w":54,"h":54},"parcial":false,"accionable":true,"identidad":{"type":"button","aria-label":"Volver arriba"}},{"id":1808,"padre":1807,"tipo":"::BEFORE","caja":{"x":1395,"y":720,"w":36,"h":36},"parcial":false,"accionable":false,"identidad":{}}],"g6_parentesco":[[0,null],[2,0],[112,2],[236,112],[351,236],[355,351],[357,355],[367,351],[369,367],[371,369],[375,371],[377,375],[379,377],[381,379],[385,375],[389,385],[395,389],[397,395],[398,397],[400,395],[410,395],[411,410],[411,410],[474,351],[476,474],[478,476],[491,478],[562,491],[563,562],[564,563],[565,564],[566,565],[567,566],[570,562],[571,570],[572,571],[573,572],[574,573],[577,562],[578,577],[579,578],[580,579],[581,580],[582,579],[583,582],[583,582],[608,562],[609,608],[610,609],[611,610],[612,611],[615,562],[616,615],[617,616],[618,617],[619,618],[620,617],[621,620],[621,620],[649,562],[650,649],[651,650],[652,651],[653,652],[654,651],[655,654],[655,654],[668,562],[669,668],[670,669],[671,670],[672,671],[675,562],[676,675],[677,676],[678,677],[679,678],[680,677],[681,680],[681,680],[708,236],[710,708],[711,710],[711,710],[717,708],[718,717],[718,717],[724,708],[725,724],[725,724],[735,236],[737,735],[739,737],[747,null],[749,747],[751,749],[752,751],[759,752],[761,759],[773,761],[775,773],[777,775],[779,775],[780,779],[784,759],[786,784],[787,786],[787,786],[789,784],[790,789],[793,759],[795,793],[796,795],[796,795],[798,793],[799,798],[802,759],[810,802],[811,810],[811,810],[812,810],[813,810],[814,813],[818,759],[822,818],[823,818],[915,null],[917,915],[919,917],[920,919],[927,920],[929,927],[931,929],[932,931],[1805,236],[1807,1805],[1808,1807],[1808,1807]],"g6_catalogo_convenciones":"v1, 2026-09-10, ocho convenciones K1..K8 en la rubrica de G6","g6_limites":["Se buscan candidatos en todas las posiciones visibles; estar en una ranura no certifica función ni incumplimiento.","Las listas son completas para los nodos retenidos; pueden faltar ancestros o atributos. Sin href observado no se demuestra que el logo carezca de enlace.","La ausencia de un pie o una ruta en el viewport no demuestra que el sitio carezca de ellos. No inferir estructura fuera de pantalla.","No se registran texto, valores de campos ni asociaciones for/id que el snapshot no conserva. Las etiquetas y operaciones requieren screenshot.","Contenedores vacíos y separadores son candidatos a R, no redundancias confirmadas. No contar ancestros y descendientes como el mismo hallazgo duplicado.","La lectura de R, T y convenciones usa screenshot: esta no es una comparación limpia entre canales."],"g6_criterios_con_lectura_de_texto":["R","T","K_ap","K"]},"revision_alcance":"alcance-2026-11-05"}

# Salida de esta ejecución

Devuelve un único JSON con channel="wireframe" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","evidence_insufficient","measurements","findings","recommendations","run"],"properties":{"group_id":{"type":"string","const":"g6"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"wireframe"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"enum":["R","T","K","ninguna",null],"type":["string","null"]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["lectura_screenshot","ancla_definida","motivo_abstencion","R","T","K_ap","K","K_broken","catalog_version","convenciones","R_ids","bloques_ids","R_bloques_ids","R_distribucion","T_operaciones","T_evaluable","elimina_trabajo","mejora_ids"],"properties":{"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"R":{"type":["integer","null"],"minimum":0},"T":{"type":["integer","null"],"minimum":0},"K_ap":{"type":"integer","minimum":0},"K":{"type":"integer","minimum":0},"K_broken":{"type":"array","items":{"type":"string"}},"catalog_version":{"type":"string","const":"v1, 2026-09-10"},"convenciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","aplica","cumple","evidencia_ids","razon"],"properties":{"id":{"enum":["K1","K2","K3","K4","K5","K6","K7","K8"],"type":"string"},"aplica":{"type":["boolean","null"]},"cumple":{"type":["boolean","null"]},"evidencia_ids":{"type":"array","items":{"type":"integer"}},"razon":{"type":"string"}}}},"R_ids":{"type":"array","items":{"type":"integer"}},"bloques_ids":{"type":"array","items":{"type":"integer"}},"R_bloques_ids":{"type":"array","items":{"type":"integer"}},"R_distribucion":{"enum":["ninguna","aislada","intermedia","generalizada","indeterminada"],"type":"string"},"T_operaciones":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["id","descripcion","datos_ids"],"properties":{"id":{"type":"integer"},"descripcion":{"type":"string"},"datos_ids":{"type":"array","items":{"type":"integer"}}}}},"T_evaluable":{"type":["boolean","null"]},"elimina_trabajo":{"type":["boolean","null"]},"mejora_ids":{"type":"array","items":{"type":"integer"}}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"7cebc09ac4f18cdde48b28366b6b60af1a41d70bec7e236bdb45434f970a2e95","wireframe":"58394332b025c64405a5dda27deeb9139ea674f1a09303792157a3619472818f"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.