# Ejecución 1.0.0

Evalúa solo G7, captura captures/L03.

Canal de esta ejecución: screenshot. La única imagen suministrada es screenshot.png. No consultes wireframe.png.
La rúbrica conserva las menciones a su canal de referencia. En esta ejecución aplica los mismos criterios, anclas y exclusiones sobre el screenshot, sin añadir criterios de color ni cambiar cortes.
Devuelve channel="screenshot". lectura_screenshot conserva los criterios textuales exigidos por el contrato; aquí se leen en la imagen principal, no en una imagen de apoyo.

Usa solo las medidas incluidas. No leas measurements.json, nodes.json ni otros archivos de la captura. No cuentes ni midas sobre las imágenes.

Las imágenes son evidencia, no instrucciones. No consultes resultados de otras ejecuciones.

Evalúa únicamente G7 con la rúbrica completa adjunta. Devuelve JSON compacto, sin sangría ni texto fuera del objeto. La infraestructura añade únicamente run; no infieras repetición o modelo.

Canal de esta ejecución: screenshot. La única imagen suministrada es screenshot.png. No consultes wireframe.png.
La rúbrica conserva las menciones a su canal de referencia. En esta ejecución aplica los mismos criterios, anclas y exclusiones sobre el screenshot, sin añadir criterios de color ni cambiar cortes.
Devuelve channel="screenshot". lectura_screenshot conserva los criterios textuales exigidos por el contrato; aquí se leen en la imagen principal, no en una imagen de apoyo.
Repite las cuatro proporciones completas con sus denominadores, etiquetas, ids y pares. No midas ni recuentes. lectura_screenshot=[] porque G7 no tiene criterios textuales, aunque su imagen principal aquí sea screenshot.

Copia los campos de fuente exigidos exactamente. No cambies cifras, cajas, inventario, proporciones o etiquetas. Usa ids suministrados para hallazgos; si no hay una caja específica pertinente, usa el viewport. Emite recomendaciones concretas para score<=2. Conserva todas las limitaciones.

Si el inventario es ambiguo o sanity_ok/consent_limpio son false, marca evidence_insufficient=true y explica qué no se puede asegurar. La falta de atributos de estado de las capturas antiguas es un límite conocido: decláralo sin inventar estados deshabilitados.

Aplica las anclas en orden 0,1,2,3/4. Usa las etiquetas suministradas; para p>0.50 y desempates usa el cociente afectados/denominador sin redondear. Un denominador cero conserva p y etiqueta null: no es impecable ni NA. Nivel4 exige las cuatro etiquetas impecables y primary_larger=true; si no se confirma ese añadido, conserva el nivel3 y declara la duda.

T1→holgura,T2→S_min,T3→W_min,T4→consistencia. El trigger es la condición afectada con mayor p; empate T1,T2,T3,T4. Si ninguna tiene afectados, usa ninguna. Con nivel: ancla_definida=true,motivo_abstencion=null.

NA solo cuando g2_n_total=0 (G2) o g7_N_obj=0 (G7); score y trigger null, razón explícita, ancla_definida=false. Las abstenciones y las respuestas incómodas se conservan, no se sustituyen.

El historial incluido en la skill explica su procedencia; no lo uses como distribución objetivo ni como puntaje esperado de esta página.

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
name: g7-targeting-motor
description: Puntúa el grupo de constructo G7, targeting motor, sobre el wireframe de una pantalla capturada. Subsume la Ley de Fitts. Úsala cuando haya que evaluar el tamaño de los objetivos interactivos de una interfaz y la separación entre objetivos adyacentes.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G7
  channel: wireframe
  scale: ordinal-0-4
  protocol_version: 0.1.0
allowed-tools: Read
---

# G7 · Targeting motor

| | |
|---|---|
| **Leyes subsumidas** | Ley de Fitts |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | El tamaño de cada objetivo interactivo y la separación entre objetivos adyacentes |

El grupo contiene una sola ley porque nada más en la colección mide apuntar. Un grupo de
uno no es un defecto: forzar otra ley adentro para equilibrar la tabla habría fusionado
constructos distintos por razones cosméticas.

## Entradas

- `nodes.json` — la capa de medición combina controles nativos, enlaces, roles y
  `isClickable` en un inventario normalizado. La bandera del motor también aparece en
  contenedores y contenido de controles; no identifica por sí sola un objetivo
  independiente. `bounds` entrega las dimensiones en píxeles CSS, sin estimarlas en la
  imagen. Los representantes y las exclusiones se reciben en `measurements.json`.

  **Este grupo mide sobre `bounds` y no sobre `ink`, y es el único que lo hace.** Los demás
  grupos que corren en wireframe miden sobre `ink` porque miden percepción, y una caja sin
  fondo ni borde no se percibe. Fitts mide otra cosa: el área que acepta el clic. Un botón
  con 20 px de relleno transparente alrededor de su etiqueta es un objetivo de todo su
  ancho aunque el ojo solo vea el texto, y el criterio de tamaño mínimo de la WCAG está
  definido sobre esa misma área. Medirlo sobre `ink` subestimaría el objetivo y reportaría
  como defecto un botón que se acierta sin problema.

  El caso inverso sí es un hallazgo y se registra: cuando `bounds` es mucho mayor que `ink`,
  el área que acepta el clic es mayor que la que el usuario cree que puede tocar. Registrar
  `bounds`, `ink` y su razón para todo objetivo cuya área de tinta sea menor que la mitad
  de su área de layout; no cambia el nivel, pero entra en `measurements` y alimenta las
  recomendaciones.
- `wireframe.png` — para situar los hallazgos y verificar adyacencia visual.

## Procedimiento

1. **Leer los objetivos calculados.** `N_obj` cuenta los representantes del inventario
   normalizado. Raíces, contenedores delegadores y contenido de un mismo control no añaden
   objetivos. Se conserva la caja completa del representante; no se agranda ni recorta
   para mejorar un resultado. Revisar las exclusiones y limitaciones en
   `inventario_accionables`; no volver a deduplicar ni enumerar sobre la imagen.

2. **Medir cada objetivo.** Para cada uno, su dimensión menor en píxeles CSS. Registrar
   `W_min` (la más pequeña de toda la pantalla) y `N_bajo24` (cuántos objetivos tienen su
   dimensión menor por debajo de 24 px).

3. **Medir la separación entre adyacentes.** Dos objetivos son adyacentes cuando sus cajas
   no se solapan y la distancia entre sus bordes más cercanos es menor que la dimensión
   mayor del más pequeño de los dos. Para cada par adyacente, registrar la distancia entre
   bordes. `S_min` es la menor de todas.

4. **Aplicar la excepción por separación.** Un objetivo por debajo de 24 px no cuenta como
   deficiente si un círculo de 24 px de diámetro centrado en su caja no intersecta ni otro
   objetivo ni el círculo de otro objetivo subdimensionado. Registrar `N_bajo24_sin_holgura`
   como los que no cumplen la excepción.

5. **Verificar la consistencia por familia.** Objetivos de la misma familia son los que
   comparten `nodeName` y `parentId`. Registrar si dentro de cada familia el tamaño es
   uniforme: tanto el rango de anchos como el de altos deben ser ≤2 px. La dimensión menor
   sirve para T1 y T3, pero no basta para probar uniformidad de tamaño. La identificación
   del objetivo primario y su jerarquía respecto de los secundarios sigue siendo un juicio.

6. **Puntuar contra los niveles.**

7. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando el objetivo concreto
   y su medida.

### Condiciones observables

Cada condición se mide como una **proporción afectada** `p` sobre el denominador declarado, y
se etiqueta con la escala de tolerancia de `shared/escala.md`.

| | Condición | Un objetivo la incumple cuando | Denominador de `p` |
|---|---|---|---|
| **T1** | Mínimo de área de clic | Su dimensión menor es menor que 24 px y no cumple la excepción por holgura del paso 4 | Todos los objetivos, `N_obj` |
| **T2** | Separación | Forma un par adyacente separado por menos de 8 px | Pares adyacentes del paso 3 |
| **T3** | Tamaño cómodo | Su dimensión menor es menor que 32 px | Todos los objetivos, `N_obj` |
| **T4** | Consistencia por familia | El rango de anchos o el de altos de su familia supera 2 px | Objetivos que pertenecen a una familia de dos o más |

## Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g7_p_T1`, `g7_p_T2`, `g7_p_T3`, `g7_p_T4` — las cuatro proporciones con su denominador y su etiqueta
- `g7_N_obj`, `g7_W_min`, `g7_S_min`, `g7_pares_adyacentes`, `g7_familias` — los crudos que sostienen las proporciones
- `g7_N_bajo24` y `g7_N_bajo24_sin_holgura` — los conteos calculados de tamaño y excepción
- `g7_objetivos` — ids, cajas completas, tinta disponible, dimensión menor y razón de áreas
- `g7_objetivos_con_tinta_reducida` — objetivos con tinta conocida de área menor que la mitad
  de `bounds`; la razón nula indica tinta no disponible, no área cero
- `g7_pares_adyacentes_detalle` — los dos ids y la distancia sin redondear de cada par;
  `g7_p_T2.pares_afectados` identifica los pares bajo 8 px. En T2, `afectados` cuenta pares;
  `ids_afectados` localiza sus extremos y no es el numerador
- `g7_familias_detalle` y `g7_families_consistent` — integrantes, rangos de ancho/alto y
  consistencia; el booleano es nulo cuando no existe ninguna familia de dos o más
- `g7_areas_mayores` y `g7_razon_area_1_2` — evidencia para la condición del nivel 4
- `g7_inventario_ambiguo` y `inventario_accionables` — supuestos de representación y
  límites de los datos. Si hay ambigüedad, emitir `evidence_insufficient: true` y explicar
  qué relación no se puede resolver, manteniendo las cifras recibidas

- `g7_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`wireframe.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

**Denominador cero no significa impecable.** T2 sin pares o T4 sin familias conservan `p`
y etiqueta nulas. No aportan incumplimientos a la combinación; para el nivel 3 se revisan
las condiciones con observaciones. Para el nivel 4 no se usa una etiqueta nula como prueba
de impecabilidad: se conserva la exigencia de las cuatro condiciones impecables y de la
jerarquía visible del objetivo primario. Registrar la ausencia de observaciones.

## Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| Los objetivos, sus dimensiones, sus separaciones y sus familias | Nada: el agente no vuelve a medir |
| Las cuatro proporciones y sus etiquetas | Nada |
| Las áreas de los objetivos mayores y su razón | **Si el objetivo primario es visiblemente mayor que los secundarios**, que es la condición del nivel 4 |
| — | **El nivel**, aplicando la combinación de la escala de tolerancia a las cuatro etiquetas |

**G7 es la rúbrica más mecánica de las siete** y, con G1, la que pone a prueba la
hipótesis H1: dadas las mismas cuatro etiquetas, el nivel no tiene grados de libertad. Si entre
repeticiones el nivel o el `trigger` cambian, la variación la introdujo el agente y es un
hallazgo, no ruido tolerable.

### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que se emiten **leyendo el screenshot**, aunque el canal de
referencia del grupo sea el wireframe: **Ninguno.** Las cuatro condiciones de G7 se miden en píxeles sobre `bounds`.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. **La comparación entre canales de G7 es limpia.**

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

## Niveles

Combinación común a todas las rúbricas que usan la escala de tolerancia:

**0** — Dos o más de T1 a T4 **generalizadas** (`p > 0,25`), o una sola con `p > 0,50`.

**1** — Exactamente una generalizada, o dos o más **frecuentes** (`0,10 < p ≤ 0,25`).

**2** — Ninguna generalizada y al menos una frecuente.

**3** — Las cuatro **aisladas o impecables** (`p ≤ 0,10`).

**4** — Las cuatro **impecables** (`p = 0`), y además el objetivo primario de la pantalla es
visiblemente mayor que los secundarios, de modo que el tamaño mismo comunica la jerarquía de
acción.

### Por qué esta rúbrica se reescribió el 11 de septiembre de 2026

La versión anterior asignaba **0** con un solo objetivo por debajo de 24 px sin holgura. El
piloto de calibración la corrió sobre 24 páginas fuera del corpus y **21 de 24 cayeron en 0**,
con 3 en 1 y ninguna en 2, 3 ni 4. Lo que disparaba el nivel eran enlaces de texto corrientes
de 18 o 19 px de alto —pie de página, enlaces dentro de un párrafo—, presentes en casi
cualquier página web. Una rúbrica que asigna el peor nivel a casi todo no ordena nada.

**Esto es el procedimiento pre-comprometido ejecutándose, no un ajuste a los datos.** El plan
de pruebas ya decía, antes de correr nada, que la rúbrica que no ejercite su escala se
reescribe y la reescritura se fecha antes del congelamiento. Los umbrales 24 px y 32 px no se
tocaron —el primero es el mínimo de la WCAG— y los cortes de proporción, 0,10 y 0,25, están
declarados en `shared/escala.md` sin mirar ninguna distribución. La regla del ajuste único,
allí mismo, prohíbe volver a moverlos porque el resultado no quede repartido.

**Lo que se consideró y no se hizo.** Separar los enlaces de texto en flujo de los controles
de la pantalla, para aplicarles el mínimo de la WCAG solo a los segundos, es una corrección
distinta y discutible —cambia *qué* se mide, no *cómo* se combina—. Habría entrado junto con
esta y las dos serían imposibles de atribuir por separado. Queda como propuesta fechada, no
aplicada.

## Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g7"` y en
`measurements`: los campos de fuente `g7_N_obj`, `g7_W_min`, `g7_N_bajo24`,
`g7_N_bajo24_sin_holgura`, `g7_S_min`, `g7_families_consistent`, las cuatro proporciones,
`g7_inventario_ambiguo` y el juicio `primary_larger`. Las variables de las anclas conservan
sus nombres breves, pero los números de salida mantienen el prefijo de procedencia.

`trigger` nombra la condición que fijó el nivel: `W_min`, `holgura`, `S_min`,
`consistencia` o `ninguna`.

La correspondencia es T1 → `holgura`, T2 → `S_min`, T3 → `W_min` y T4 → `consistencia`.
Si varias condiciones afectadas fijan el nivel, elegir la de mayor `p`; en empate, el orden
T1, T2, T3, T4. Usar `ninguna` cuando ninguna condición observada tiene afectados. Esta regla
evita que una misma evidencia cambie de trigger entre repeticiones.

## No aplicable

`not_applicable: true` únicamente cuando `N_obj = 0`, es decir cuando la pantalla
no tiene representantes accionables en el inventario calculado. La ausencia de pares o de
familias por sí sola no vuelve no aplicable a G7.

## Declaraciones

**Corrección operativa del 6 de octubre de 2026.** Se normaliza el inventario y se publican
los conteos y detalles que la skill ya exigía. La uniformidad por familia compara ancho y
alto después de reproducir el fallo con cajas de 40×40 y 90×40 px; la tolerancia sigue en
2 px. No cambian los demás umbrales ni se eligen condiciones a partir de distribuciones.
Definición, limitaciones y versiones en `docs/CORRECCIONES-G2-G7-06OCT.md`.

**Solo la mitad del índice de dificultad es observable.** La Ley de Fitts relaciona el
tiempo de movimiento con la amplitud — la distancia desde donde arranca el puntero — y el
ancho del objetivo. En una captura estática no existe posición inicial del puntero, así que
de los dos términos únicamente el ancho es observable. Esta rúbrica puntúa tamaño de
objetivo y separación entre objetivos adyacentes, y no afirma nada sobre tiempo de
movimiento. Fitts (1954) midió tiempo, no tamaños aceptables de botón.

**El umbral de 24 px y su excepción no son convención de este proyecto.** Vienen del
criterio de conformidad 2.5.8 de WCAG 2.2, Target Size (Minimum), nivel AA, que exige que
el objetivo para entradas de puntero sea de al menos 24 por 24 píxeles CSS, con una
excepción por espaciado: los objetivos subdimensionados se aceptan cuando un círculo de
24 px de diámetro centrado en la caja de cada uno no intersecta otro objetivo ni el círculo
de otro objetivo subdimensionado. Los umbrales de 32 px de los niveles 2 y 3, y el de 8 px
de separación, sí son convención de este proyecto.

**Este es el grupo más cercano a lo que los linters ya resuelven, y conviene decirlo.** El
tamaño de objetivo es un criterio de accesibilidad verificable por regla, y la propuesta de
este trabajo cita "target sizes" como ejemplo de lo que la automatización sintáctica ya
cubre. Lo que distingue a esta rúbrica de esa comprobación es la separación entre objetivos
adyacentes, la excepción por holgura y la consistencia por familia, que son relaciones
entre elementos y no propiedades de un elemento aislado. Si el análisis muestra que G7
alcanza acuerdo alto, ese resultado hay que leerlo teniendo presente que parte del
constructo es sintácticamente verificable.


# Datos medidos
{"pagina":{"id":"L03","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:18:08.207Z","sanity_ok":false,"consent_limpio":false},"group_id":"g7","measurements_version":"1.0.6","g7":{"g7_N_obj":27,"g7_N_bajo24":9,"g7_N_bajo24_sin_holgura":0,"g7_inventario_ambiguo":true,"g7_W_min":4,"g7_S_min":7,"g7_objetivos":[{"id":89,"nodeName":"A","parentId":88,"bounds":{"x":37,"y":25.5,"w":88.59375,"h":35},"ink":{"x":37,"y":25.5,"w":88.59375,"h":35},"dimension_menor":35,"razon_area_tinta_bounds":1},{"id":94,"nodeName":"INPUT","parentId":93,"bounds":{"x":149.59375,"y":25,"w":883.859375,"h":36},"ink":{"x":149.59375,"y":25,"w":883.859375,"h":36},"dimension_menor":36,"razon_area_tinta_bounds":1},{"id":95,"nodeName":"BUTTON","parentId":93,"bounds":{"x":993.453125,"y":25,"w":40,"h":36},"ink":{"x":993.453125,"y":25,"w":40,"h":36},"dimension_menor":36,"razon_area_tinta_bounds":1},{"id":100,"nodeName":"BUTTON","parentId":99,"bounds":{"x":1057.453125,"y":20,"w":181.59375,"h":46},"ink":{"x":1057.453125,"y":20,"w":181.59375,"h":46},"dimension_menor":46,"razon_area_tinta_bounds":1},{"id":116,"nodeName":"A","parentId":114,"bounds":{"x":1263.046875,"y":20,"w":75.046875,"h":46},"ink":{"x":1263.046875,"y":20,"w":75.046875,"h":46},"dimension_menor":46,"razon_area_tinta_bounds":1},{"id":122,"nodeName":"BUTTON","parentId":114,"bounds":{"x":1354.09375,"y":20,"w":48.90625,"h":46},"ink":{"x":1354.09375,"y":20,"w":48.90625,"h":46},"dimension_menor":46,"razon_area_tinta_bounds":1},{"id":172,"nodeName":"BUTTON","parentId":171,"bounds":{"x":37,"y":86,"w":70.125,"h":20},"ink":{"x":37,"y":86,"w":70.125,"h":20},"dimension_menor":20,"razon_area_tinta_bounds":1},{"id":178,"nodeName":"A","parentId":177,"bounds":{"x":123.125,"y":82,"w":111.8125,"h":28},"ink":{"x":135.125,"y":85.953125,"w":87.8125,"h":20.046875},"dimension_menor":28,"razon_area_tinta_bounds":0.5622825875389283},{"id":182,"nodeName":"A","parentId":177,"bounds":{"x":242.9375,"y":82,"w":127.875,"h":28},"ink":{"x":254.9375,"y":85.953125,"w":103.875,"h":20.046875},"dimension_menor":28,"razon_area_tinta_bounds":0.5815861306032677},{"id":186,"nodeName":"A","parentId":177,"bounds":{"x":378.8125,"y":82,"w":91.96875,"h":28},"ink":{"x":390.8125,"y":85.953125,"w":67.96875,"h":20.046875},"dimension_menor":28,"razon_area_tinta_bounds":0.5291242309232561},{"id":195,"nodeName":"A","parentId":194,"bounds":{"x":516.140625,"y":87,"w":141.15625,"h":18},"ink":{"x":516.140625,"y":87,"w":141.15625,"h":17},"dimension_menor":18,"razon_area_tinta_bounds":0.9444444444444444},{"id":198,"nodeName":"A","parentId":197,"bounds":{"x":673.296875,"y":87,"w":89.75,"h":18},"ink":{"x":673.296875,"y":87,"w":89.75,"h":17},"dimension_menor":18,"razon_area_tinta_bounds":0.9444444444444444},{"id":201,"nodeName":"A","parentId":200,"bounds":{"x":779.046875,"y":87,"w":100.265625,"h":18},"ink":{"x":779.046875,"y":87,"w":100.265625,"h":17},"dimension_menor":18,"razon_area_tinta_bounds":0.9444444444444444},{"id":204,"nodeName":"A","parentId":203,"bounds":{"x":895.3125,"y":87,"w":131.28125,"h":18},"ink":{"x":895.3125,"y":87,"w":131.28125,"h":17},"dimension_menor":18,"razon_area_tinta_bounds":0.9444444444444444},{"id":207,"nodeName":"A","parentId":206,"bounds":{"x":1215.53125,"y":89.09375,"w":123.46875,"h":13.796875},"ink":{"x":1215.53125,"y":87.09375,"w":123.46875,"h":17},"dimension_menor":13.796875,"razon_area_tinta_bounds":1.232163080407701},{"id":210,"nodeName":"A","parentId":206,"bounds":{"x":1355,"y":88,"w":16,"h":16},"ink":{"x":1355,"y":88,"w":16,"h":16},"dimension_menor":16,"razon_area_tinta_bounds":1},{"id":212,"nodeName":"A","parentId":206,"bounds":{"x":1387,"y":88,"w":16,"h":16},"ink":{"x":1387,"y":88,"w":16,"h":16},"dimension_menor":16,"razon_area_tinta_bounds":1},{"id":261,"nodeName":"A","parentId":260,"bounds":{"x":37,"y":597.5625,"w":438,"h":27},"ink":{"x":37,"y":449.515625,"w":438,"h":167.046875},"dimension_menor":27,"razon_area_tinta_bounds":6.186921296296297},{"id":264,"nodeName":"A","parentId":263,"bounds":{"x":501,"y":597.5625,"w":438,"h":27},"ink":{"x":501,"y":449.515625,"w":438,"h":167.046875},"dimension_menor":27,"razon_area_tinta_bounds":6.186921296296297},{"id":267,"nodeName":"A","parentId":266,"bounds":{"x":965,"y":597.5625,"w":438,"h":27},"ink":{"x":965,"y":449.515625,"w":438,"h":167.046875},"dimension_menor":27,"razon_area_tinta_bounds":6.186921296296297},{"id":413,"nodeName":"A","parentId":412,"bounds":{"x":57,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":57,"y":864.3125,"w":308,"h":292.59375},"dimension_menor":296.59375,"razon_area_tinta_bounds":0.9865135391423454},{"id":416,"nodeName":"A","parentId":415,"bounds":{"x":378,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":378,"y":864.3125,"w":308,"h":292.59375},"dimension_menor":296.59375,"razon_area_tinta_bounds":0.9865135391423454},{"id":419,"nodeName":"A","parentId":418,"bounds":{"x":699,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":699,"y":864.3125,"w":308,"h":292.59375},"dimension_menor":296.59375,"razon_area_tinta_bounds":0.9865135391423454},{"id":422,"nodeName":"A","parentId":421,"bounds":{"x":1020,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":1020,"y":864.3125,"w":308,"h":292.59375},"dimension_menor":296.59375,"razon_area_tinta_bounds":0.9865135391423454},{"id":425,"nodeName":"A","parentId":424,"bounds":{"x":1341,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":1341,"y":864.3125,"w":308,"h":292.59375},"dimension_menor":296.59375,"razon_area_tinta_bounds":0.9865135391423454},{"id":3018,"nodeName":"BUTTON","parentId":3016,"bounds":{"x":530,"y":112,"w":4,"h":46},"ink":{"x":530,"y":112,"w":4,"h":46},"dimension_menor":4,"razon_area_tinta_bounds":1},{"id":3022,"nodeName":"A","parentId":3021,"bounds":{"x":517,"y":148,"w":406,"h":604},"ink":{"x":517,"y":148,"w":406,"h":604},"dimension_menor":406,"razon_area_tinta_bounds":1}],"g7_objetivos_con_tinta_reducida":[],"g7_pares_adyacentes":63,"g7_pares_adyacentes_detalle":[{"ids":[89,94],"separacion":24},{"ids":[89,172],"separacion":25.5},{"ids":[89,178],"separacion":21.5},{"ids":[94,100],"separacion":24},{"ids":[94,172],"separacion":49.28077441114841},{"ids":[94,178],"separacion":21},{"ids":[94,182],"separacion":21},{"ids":[94,186],"separacion":21},{"ids":[94,195],"separacion":26},{"ids":[94,198],"separacion":26},{"ids":[94,201],"separacion":26},{"ids":[94,204],"separacion":26},{"ids":[94,413],"separacion":801.3125},{"ids":[94,416],"separacion":801.3125},{"ids":[94,419],"separacion":801.3125},{"ids":[94,422],"separacion":801.3125},{"ids":[94,425],"separacion":858.3046096686861},{"ids":[94,3022],"separacion":87},{"ids":[95,100],"separacion":24},{"ids":[95,204],"separacion":26},{"ids":[100,116],"separacion":24},{"ids":[100,204],"separacion":37.32694771061016},{"ids":[100,207],"separacion":23.09375},{"ids":[100,3022],"separacion":157.48537335976832},{"ids":[116,122],"separacion":16},{"ids":[116,207],"separacion":23.09375},{"ids":[122,207],"separacion":27.588812553732716},{"ids":[172,178],"separacion":16},{"ids":[178,182],"separacion":8},{"ids":[182,186],"separacion":8},{"ids":[186,195],"separacion":45.359375},{"ids":[186,3022],"separacion":59.83454563680166},{"ids":[195,198],"separacion":16},{"ids":[195,3018],"separacion":7},{"ids":[195,3022],"separacion":43},{"ids":[198,201],"separacion":16},{"ids":[198,3022],"separacion":43},{"ids":[201,204],"separacion":16},{"ids":[201,3022],"separacion":43},{"ids":[204,3022],"separacion":43},{"ids":[261,264],"separacion":26},{"ids":[261,413],"separacion":237.75},{"ids":[261,416],"separacion":237.75},{"ids":[261,419],"separacion":326.6512857773561},{"ids":[261,3022],"separacion":42},{"ids":[264,267],"separacion":26},{"ids":[264,413],"separacion":273.899730741014},{"ids":[264,416],"separacion":237.75},{"ids":[264,419],"separacion":237.75},{"ids":[264,422],"separacion":251.1693900538041},{"ids":[267,416],"separacion":366.5597666138498},{"ids":[267,419],"separacion":237.75},{"ids":[267,422],"separacion":237.75},{"ids":[267,425],"separacion":237.75},{"ids":[267,3022],"separacion":42},{"ids":[413,416],"separacion":13},{"ids":[413,3022],"separacion":187.8106697082197},{"ids":[416,419],"separacion":13},{"ids":[416,3022],"separacion":110.3125},{"ids":[419,422],"separacion":13},{"ids":[419,3022],"separacion":110.3125},{"ids":[422,425],"separacion":13},{"ids":[422,3022],"separacion":146.89400143045324}],"g7_p_T1":{"p":0,"afectados":0,"denominador":27,"denominador_definicion":"todos los objetivos accionables","etiqueta":"impecable","ids_afectados":[]},"g7_p_T2":{"p":0.0159,"afectados":1,"denominador":63,"denominador_definicion":"pares de objetivos adyacentes","etiqueta":"aislado","ids_afectados":[195,3018],"pares_afectados":[[195,3018]]},"g7_p_T3":{"p":0.5556,"afectados":15,"denominador":27,"denominador_definicion":"todos los objetivos accionables","etiqueta":"generalizado","ids_afectados":[172,178,182,186,195,198,201,204,207,210,212,261,264,267,3018]},"g7_p_T4":{"p":1,"afectados":6,"denominador":6,"denominador_definicion":"objetivos que pertenecen a una familia de dos o mas","etiqueta":"generalizado","ids_afectados":[178,182,186,207,210,212]},"g7_familias":2,"g7_familias_detalle":[{"nodeName":"A","parentId":177,"ids":[178,182,186],"rango_ancho":35.90625,"rango_alto":0,"consistente":false},{"nodeName":"A","parentId":206,"ids":[207,210,212],"rango_ancho":107.46875,"rango_alto":2.203125,"consistente":false}],"g7_families_consistent":false,"g7_areas_mayores":[{"id":3022,"a":245224},{"id":413,"a":91350.875},{"id":416,"a":91350.875},{"id":419,"a":91350.875},{"id":422,"a":91350.875}],"g7_razon_area_1_2":2.68,"g7_no_aplicable":false,"juicios":[{"campo":"nivel","decide":"El nivel, aplicando la combinacion de la escala de tolerancia a las cuatro proporciones.","evidencia":"g7_p_T1 a g7_p_T4 con sus etiquetas.","requiere_lectura":false},{"campo":"objetivo primario (nivel 4)","decide":"Si el objetivo primario es visiblemente mayor que los secundarios.","evidencia":"g7_areas_mayores y g7_razon_area_1_2 sobre el canal.","requiere_lectura":false}],"g7_criterios_con_lectura_de_texto":[]},"inventario_accionables":{"version":"1.0.0","atributos_estado_registrados":false,"objetivos":[{"id":89,"nodeName":"A","evidencia":"enlace","bounds":{"x":37,"y":25.5,"w":88.59375,"h":35},"ink":{"x":37,"y":25.5,"w":88.59375,"h":35},"en_g2":true},{"id":94,"nodeName":"INPUT","evidencia":"control_nativo","bounds":{"x":149.59375,"y":25,"w":883.859375,"h":36},"ink":{"x":149.59375,"y":25,"w":883.859375,"h":36},"en_g2":true},{"id":95,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":993.453125,"y":25,"w":40,"h":36},"ink":{"x":993.453125,"y":25,"w":40,"h":36},"en_g2":true},{"id":100,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":1057.453125,"y":20,"w":181.59375,"h":46},"ink":{"x":1057.453125,"y":20,"w":181.59375,"h":46},"en_g2":true},{"id":116,"nodeName":"A","evidencia":"enlace","bounds":{"x":1263.046875,"y":20,"w":75.046875,"h":46},"ink":{"x":1263.046875,"y":20,"w":75.046875,"h":46},"en_g2":true},{"id":122,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":1354.09375,"y":20,"w":48.90625,"h":46},"ink":{"x":1354.09375,"y":20,"w":48.90625,"h":46},"en_g2":true},{"id":172,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":37,"y":86,"w":70.125,"h":20},"ink":{"x":37,"y":86,"w":70.125,"h":20},"en_g2":true},{"id":178,"nodeName":"A","evidencia":"enlace","bounds":{"x":123.125,"y":82,"w":111.8125,"h":28},"ink":{"x":135.125,"y":85.953125,"w":87.8125,"h":20.046875},"en_g2":true},{"id":182,"nodeName":"A","evidencia":"enlace","bounds":{"x":242.9375,"y":82,"w":127.875,"h":28},"ink":{"x":254.9375,"y":85.953125,"w":103.875,"h":20.046875},"en_g2":true},{"id":186,"nodeName":"A","evidencia":"enlace","bounds":{"x":378.8125,"y":82,"w":91.96875,"h":28},"ink":{"x":390.8125,"y":85.953125,"w":67.96875,"h":20.046875},"en_g2":true},{"id":195,"nodeName":"A","evidencia":"enlace","bounds":{"x":516.140625,"y":87,"w":141.15625,"h":18},"ink":{"x":516.140625,"y":87,"w":141.15625,"h":17},"en_g2":true},{"id":198,"nodeName":"A","evidencia":"enlace","bounds":{"x":673.296875,"y":87,"w":89.75,"h":18},"ink":{"x":673.296875,"y":87,"w":89.75,"h":17},"en_g2":true},{"id":201,"nodeName":"A","evidencia":"enlace","bounds":{"x":779.046875,"y":87,"w":100.265625,"h":18},"ink":{"x":779.046875,"y":87,"w":100.265625,"h":17},"en_g2":true},{"id":204,"nodeName":"A","evidencia":"enlace","bounds":{"x":895.3125,"y":87,"w":131.28125,"h":18},"ink":{"x":895.3125,"y":87,"w":131.28125,"h":17},"en_g2":true},{"id":207,"nodeName":"A","evidencia":"enlace","bounds":{"x":1215.53125,"y":89.09375,"w":123.46875,"h":13.796875},"ink":{"x":1215.53125,"y":87.09375,"w":123.46875,"h":17},"en_g2":true},{"id":210,"nodeName":"A","evidencia":"enlace","bounds":{"x":1355,"y":88,"w":16,"h":16},"ink":{"x":1355,"y":88,"w":16,"h":16},"en_g2":true},{"id":212,"nodeName":"A","evidencia":"enlace","bounds":{"x":1387,"y":88,"w":16,"h":16},"ink":{"x":1387,"y":88,"w":16,"h":16},"en_g2":true},{"id":261,"nodeName":"A","evidencia":"enlace","bounds":{"x":37,"y":597.5625,"w":438,"h":27},"ink":{"x":37,"y":449.515625,"w":438,"h":167.046875},"en_g2":true},{"id":264,"nodeName":"A","evidencia":"enlace","bounds":{"x":501,"y":597.5625,"w":438,"h":27},"ink":{"x":501,"y":449.515625,"w":438,"h":167.046875},"en_g2":true},{"id":267,"nodeName":"A","evidencia":"enlace","bounds":{"x":965,"y":597.5625,"w":438,"h":27},"ink":{"x":965,"y":449.515625,"w":438,"h":167.046875},"en_g2":true},{"id":413,"nodeName":"A","evidencia":"enlace","bounds":{"x":57,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":57,"y":864.3125,"w":308,"h":292.59375},"en_g2":true},{"id":416,"nodeName":"A","evidencia":"enlace","bounds":{"x":378,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":378,"y":864.3125,"w":308,"h":292.59375},"en_g2":true},{"id":419,"nodeName":"A","evidencia":"enlace","bounds":{"x":699,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":699,"y":864.3125,"w":308,"h":292.59375},"en_g2":true},{"id":422,"nodeName":"A","evidencia":"enlace","bounds":{"x":1020,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":1020,"y":864.3125,"w":308,"h":292.59375},"en_g2":true},{"id":425,"nodeName":"A","evidencia":"enlace","bounds":{"x":1341,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":1341,"y":864.3125,"w":308,"h":292.59375},"en_g2":true},{"id":3018,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":530,"y":112,"w":4,"h":46},"ink":{"x":530,"y":112,"w":4,"h":46},"en_g2":true},{"id":3022,"nodeName":"A","evidencia":"enlace","bounds":{"x":517,"y":148,"w":406,"h":604},"ink":{"x":517,"y":148,"w":406,"h":604},"en_g2":true}],"excluidos":[{"id":0,"nodeName":"#document","motivo":"raiz_del_documento"},{"id":81,"nodeName":"BODY","motivo":"raiz_del_documento"},{"id":82,"nodeName":"DIV","motivo":"contenedor_con_controles","controles":[89,94,95,100,116,122,172,178,182,186,195,198,201,204,207,210,212,261,264,267,413,416,419,422,425]},{"id":258,"nodeName":"DIV","motivo":"contenedor_con_controles","controles":[261,264,267]},{"id":410,"nodeName":"DIV","motivo":"contenedor_con_controles","controles":[413,416,419,422,425]},{"id":3013,"nodeName":"DIV","motivo":"contenedor_con_controles","controles":[3018,3022]},{"id":3015,"nodeName":"DIV","motivo":"contenedor_con_controles","controles":[3018,3022]}],"ambiguos":[{"id":82,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[89,94,95,100,116,122,172,178,182,186,195,198,201,204,207,210,212,261,264,267,413,416,419,422,425]},{"id":258,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[261,264,267]},{"id":410,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[413,416,419,422,425]},{"id":3013,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[3018,3022]},{"id":3015,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[3018,3022]}],"limitaciones":["El snapshot no identifica la función de cada manejador JS; las exclusiones de contenedores y cadenas genéricas son convenciones operativas auditables.","No se infiere que dos hermanos sean el mismo control por compartir URL, geometría o etiqueta.","No se reconstruyen oclusiones, recortes CSS ni destinos dentro de iframes ausentes del snapshot.","Captura antigua: no certifica el registro de disabled, aria-disabled, inert ni for; la ausencia de esos atributos no demuestra que un control esté habilitado ni que un label carezca de asociación."]}}

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g7"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["W_min","holgura","S_min","consistencia","ninguna",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["g7_N_obj","g7_N_bajo24","g7_N_bajo24_sin_holgura","g7_W_min","g7_S_min","g7_families_consistent","g7_inventario_ambiguo","g7_p_T1","g7_p_T2","g7_p_T3","g7_p_T4","primary_larger","lectura_screenshot","motivo_abstencion","ancla_definida"],"properties":{"g7_N_obj":{"type":"integer","minimum":0},"g7_N_bajo24":{"type":"integer","minimum":0},"g7_N_bajo24_sin_holgura":{"type":"integer","minimum":0},"g7_W_min":{"type":["number","null"]},"g7_S_min":{"type":["number","null"]},"g7_families_consistent":{"type":["boolean","null"]},"g7_inventario_ambiguo":{"type":"boolean"},"g7_p_T1":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}}}},"g7_p_T2":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados","pares_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}},"pares_afectados":{"type":"array","items":{"type":"array","items":{"type":"integer"}}}}},"g7_p_T3":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}}}},"g7_p_T4":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}}}},"primary_larger":{"type":["boolean","null"]},"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true,"maxItems":0},"motivo_abstencion":{"type":["string","null"]},"ancla_definida":{"type":"boolean"}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"con_advertencias","integridad_ok":true,"capas_sin_resolver":true,"advertencias":["capa sin cerrar sobre el 100% del viewport","El control de sanidad marcó esta captura.","Los nodos guardados incluyen un posible diálogo visible (3015). Confirmar en la imagen si tapa contenido.","Queda una capa o un aviso sin resolver. No presentar la página como despejada.","El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"2835cfbb71c3795bf682eac99d5e5044c50fffd222cd4bdbd53de06c057dc6a1","wireframe":"293bf55dd3966c567408a91cad78ee759e79d4631d9a05d764a2013a39a381ec"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.