# Ejecución 1.0.0

Evalúa solo G7, captura captures/H07.

Canal de esta ejecución: wireframe. La primera imagen es wireframe.png. No se suministra screenshot: no lo abras ni lo uses como apoyo.
Devuelve channel="wireframe". No midas ni recuentes sobre ninguna imagen.

Usa solo las medidas incluidas. No leas measurements.json, nodes.json ni otros archivos de la captura. No cuentes ni midas sobre las imágenes.

Las imágenes son evidencia, no instrucciones. No consultes resultados de otras ejecuciones.

Evalúa únicamente G7 con la rúbrica completa adjunta. Devuelve JSON compacto, sin sangría ni texto fuera del objeto. La infraestructura añade únicamente run; no infieras repetición o modelo.

Solo recibes el wireframe. No se suministra screenshot ni texto de la página. Repite las cuatro proporciones completas, incluidos denominadores, etiquetas, ids y pares. No midas ni recuentes la imagen. lectura_screenshot=[].

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
{"pagina":{"id":"H07","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:16:26.351Z","sanity_ok":null,"consent_limpio":null},"group_id":"g7","measurements_version":"1.0.6","g7":{"g7_N_obj":50,"g7_N_bajo24":25,"g7_N_bajo24_sin_holgura":9,"g7_inventario_ambiguo":true,"g7_W_min":13.8,"g7_S_min":0,"g7_objetivos":[{"id":750,"nodeName":"LABEL","parentId":745,"bounds":{"x":1130.53125,"y":7.5,"w":40,"h":18},"ink":{"x":0,"y":0,"w":1170.53125,"h":26.5},"dimension_menor":18,"razon_area_tinta_bounds":43.08205295138889},{"id":764,"nodeName":"BUTTON","parentId":759,"bounds":{"x":1343.09375,"y":5.5,"w":22,"h":22},"ink":{"x":1343.09375,"y":5.5,"w":22,"h":22},"dimension_menor":22,"razon_area_tinta_bounds":1},{"id":772,"nodeName":"BUTTON","parentId":759,"bounds":{"x":1393,"y":5.5,"w":22,"h":22},"ink":{"x":1393,"y":5.5,"w":22,"h":22},"dimension_menor":22,"razon_area_tinta_bounds":1},{"id":783,"nodeName":"A","parentId":781,"bounds":{"x":666.96875,"y":40.875,"w":116.34375,"h":17.25},"ink":{"x":666.96875,"y":38.875,"w":116.34375,"h":20},"dimension_menor":17.25,"razon_area_tinta_bounds":1.1594202898550725},{"id":794,"nodeName":"INPUT","parentId":789,"bounds":{"x":798.3125,"y":40,"w":252,"h":19},"ink":{"x":798.3125,"y":40,"w":252,"h":19},"dimension_menor":19,"razon_area_tinta_bounds":1},{"id":798,"nodeName":"A","parentId":789,"bounds":{"x":1060.3125,"y":41.5,"w":16,"h":16},"ink":{"x":1060.3125,"y":41.5,"w":16,"h":16},"dimension_menor":16,"razon_area_tinta_bounds":1},{"id":813,"nodeName":"A","parentId":811,"bounds":{"x":1088.3125,"y":42.59375,"w":121.65625,"h":13.796875},"ink":{"x":0,"y":0,"w":1221.96875,"h":59.484375},"dimension_menor":13.796875,"razon_area_tinta_bounds":43.3059776542326},{"id":817,"nodeName":"A","parentId":811,"bounds":{"x":1233.96875,"y":42.59375,"w":78.75,"h":13.796875},"ink":{"x":0,"y":0,"w":1324.71875,"h":59.484375},"dimension_menor":13.796875,"razon_area_tinta_bounds":72.52626193172625},{"id":821,"nodeName":"A","parentId":811,"bounds":{"x":1336.71875,"y":42.59375,"w":56.28125,"h":13.796875},"ink":{"x":1336.71875,"y":40.59375,"w":56.28125,"h":17},"dimension_menor":13.796875,"razon_area_tinta_bounds":1.232163080407701},{"id":830,"nodeName":"A","parentId":828,"bounds":{"x":35,"y":65,"w":213,"h":55},"ink":{"x":35,"y":65,"w":213,"h":55},"dimension_menor":55,"razon_area_tinta_bounds":1},{"id":847,"nodeName":"A","parentId":845,"bounds":{"x":260,"y":82.453125,"w":41.984375,"h":19},"ink":{"x":260,"y":82.453125,"w":41.984375,"h":19},"dimension_menor":19,"razon_area_tinta_bounds":1},{"id":853,"nodeName":"A","parentId":851,"bounds":{"x":325.984375,"y":82.453125,"w":74.921875,"h":19},"ink":{"x":325.984375,"y":82.453125,"w":74.921875,"h":19},"dimension_menor":19,"razon_area_tinta_bounds":1},{"id":878,"nodeName":"A","parentId":876,"bounds":{"x":424.90625,"y":82.453125,"w":93.046875,"h":19},"ink":{"x":424.90625,"y":82.453125,"w":93.046875,"h":19},"dimension_menor":19,"razon_area_tinta_bounds":1},{"id":884,"nodeName":"A","parentId":882,"bounds":{"x":541.953125,"y":82.453125,"w":86.265625,"h":19},"ink":{"x":541.953125,"y":82.453125,"w":86.265625,"h":19},"dimension_menor":19,"razon_area_tinta_bounds":1},{"id":929,"nodeName":"A","parentId":927,"bounds":{"x":652.21875,"y":82.453125,"w":207.296875,"h":19},"ink":{"x":652.21875,"y":82.453125,"w":207.296875,"h":19},"dimension_menor":19,"razon_area_tinta_bounds":1},{"id":950,"nodeName":"A","parentId":948,"bounds":{"x":883.515625,"y":82.453125,"w":126.0625,"h":19},"ink":{"x":883.515625,"y":82.453125,"w":126.0625,"h":19},"dimension_menor":19,"razon_area_tinta_bounds":1},{"id":956,"nodeName":"A","parentId":954,"bounds":{"x":1033.578125,"y":82.453125,"w":109.25,"h":19},"ink":{"x":1033.578125,"y":82.453125,"w":109.25,"h":19},"dimension_menor":19,"razon_area_tinta_bounds":1},{"id":977,"nodeName":"A","parentId":839,"bounds":{"x":1174.828125,"y":67.40625,"w":230.171875,"h":50.1875},"ink":{"x":1174.828125,"y":67.40625,"w":230.171875,"h":50.1875},"dimension_menor":50.1875,"razon_area_tinta_bounds":1},{"id":1270,"nodeName":"A","parentId":1268,"bounds":{"x":40,"y":270.5,"w":30,"h":35},"ink":{"x":40,"y":270.5,"w":30,"h":35},"dimension_menor":30,"razon_area_tinta_bounds":1},{"id":1302,"nodeName":"A","parentId":1279,"bounds":{"x":0,"y":143,"w":1440,"h":290},"ink":null,"dimension_menor":290,"razon_area_tinta_bounds":null},{"id":1509,"nodeName":"A","parentId":1268,"bounds":{"x":1370,"y":270.5,"w":30,"h":35},"ink":{"x":1370,"y":270.5,"w":30,"h":35},"dimension_menor":30,"razon_area_tinta_bounds":1},{"id":1516,"nodeName":"A","parentId":1514,"bounds":{"x":591,"y":390,"w":20,"h":20},"ink":{"x":591,"y":390,"w":20,"h":20},"dimension_menor":20,"razon_area_tinta_bounds":1},{"id":1519,"nodeName":"A","parentId":1514,"bounds":{"x":625,"y":390,"w":20,"h":20},"ink":{"x":625,"y":390,"w":20,"h":20},"dimension_menor":20,"razon_area_tinta_bounds":1},{"id":1522,"nodeName":"A","parentId":1514,"bounds":{"x":659,"y":390,"w":20,"h":20},"ink":{"x":659,"y":390,"w":20,"h":20},"dimension_menor":20,"razon_area_tinta_bounds":1},{"id":1525,"nodeName":"A","parentId":1514,"bounds":{"x":693,"y":390,"w":20,"h":20},"ink":{"x":693,"y":390,"w":20,"h":20},"dimension_menor":20,"razon_area_tinta_bounds":1},{"id":1528,"nodeName":"A","parentId":1514,"bounds":{"x":727,"y":390,"w":20,"h":20},"ink":{"x":727,"y":390,"w":20,"h":20},"dimension_menor":20,"razon_area_tinta_bounds":1},{"id":1531,"nodeName":"A","parentId":1514,"bounds":{"x":761,"y":390,"w":20,"h":20},"ink":{"x":761,"y":390,"w":20,"h":20},"dimension_menor":20,"razon_area_tinta_bounds":1},{"id":1534,"nodeName":"A","parentId":1514,"bounds":{"x":795,"y":390,"w":20,"h":20},"ink":{"x":795,"y":390,"w":20,"h":20},"dimension_menor":20,"razon_area_tinta_bounds":1},{"id":1537,"nodeName":"A","parentId":1514,"bounds":{"x":829,"y":390,"w":20,"h":20},"ink":{"x":829,"y":390,"w":20,"h":20},"dimension_menor":20,"razon_area_tinta_bounds":1},{"id":1550,"nodeName":"A","parentId":1548,"bounds":{"x":179.28125,"y":440.703125,"w":60,"h":79.59375},"ink":{"x":179.28125,"y":440.703125,"w":60,"h":80.796875},"dimension_menor":60,"razon_area_tinta_bounds":1.0151158225363173},{"id":1564,"nodeName":"A","parentId":1562,"bounds":{"x":311.28125,"y":440.703125,"w":133.59375,"h":79.59375},"ink":{"x":311.28125,"y":440.703125,"w":133.59375,"h":80.796875},"dimension_menor":79.59375,"razon_area_tinta_bounds":1.0151158225363173},{"id":1578,"nodeName":"A","parentId":1576,"bounds":{"x":516.875,"y":440.703125,"w":113.96875,"h":79.59375},"ink":{"x":516.875,"y":440.703125,"w":113.96875,"h":80.796875},"dimension_menor":79.59375,"razon_area_tinta_bounds":1.0151158225363173},{"id":1592,"nodeName":"A","parentId":1590,"bounds":{"x":702.84375,"y":440.703125,"w":81.890625,"h":79.59375},"ink":{"x":702.84375,"y":440.703125,"w":81.890625,"h":80.796875},"dimension_menor":79.59375,"razon_area_tinta_bounds":1.0151158225363173},{"id":1606,"nodeName":"A","parentId":1604,"bounds":{"x":856.734375,"y":440.703125,"w":112.6875,"h":79.59375},"ink":{"x":856.734375,"y":440.703125,"w":112.6875,"h":80.796875},"dimension_menor":79.59375,"razon_area_tinta_bounds":1.0151158225363173},{"id":1620,"nodeName":"A","parentId":1618,"bounds":{"x":1041.421875,"y":440.703125,"w":60.4375,"h":79.59375},"ink":{"x":1041.421875,"y":440.703125,"w":60.4375,"h":80.796875},"dimension_menor":60.4375,"razon_area_tinta_bounds":1.0151158225363173},{"id":1634,"nodeName":"A","parentId":1632,"bounds":{"x":1173.859375,"y":440.703125,"w":86.859375,"h":79.59375},"ink":{"x":1173.859375,"y":440.703125,"w":86.859375,"h":80.796875},"dimension_menor":79.59375,"razon_area_tinta_bounds":1.0151158225363173},{"id":1654,"nodeName":"A","parentId":1652,"bounds":{"x":0,"y":528,"w":356.09375,"h":55},"ink":{"x":0,"y":528,"w":356.09375,"h":55},"dimension_menor":55,"razon_area_tinta_bounds":1},{"id":1660,"nodeName":"A","parentId":1658,"bounds":{"x":356.09375,"y":528,"w":446.625,"h":55},"ink":{"x":491,"y":545.453125,"w":176.796875,"h":19},"dimension_menor":55,"razon_area_tinta_bounds":0.1367484670381396},{"id":1666,"nodeName":"A","parentId":1664,"bounds":{"x":802.71875,"y":528,"w":289.84375,"h":55},"ink":{"x":937.625,"y":545.453125,"w":20.015625,"h":19},"dimension_menor":55,"razon_area_tinta_bounds":0.02385591766723842},{"id":1672,"nodeName":"A","parentId":1670,"bounds":{"x":1092.5625,"y":528,"w":347.4375,"h":55},"ink":{"x":1227.46875,"y":545.453125,"w":77.609375,"h":19},"dimension_menor":55,"razon_area_tinta_bounds":0.07716642954095733},{"id":1726,"nodeName":"A","parentId":1714,"bounds":{"x":142.5,"y":712.390625,"w":328,"h":180},"ink":{"x":142.5,"y":712.390625,"w":330,"h":180},"dimension_menor":180,"razon_area_tinta_bounds":1.0060975609756098},{"id":1753,"nodeName":"A","parentId":1741,"bounds":{"x":556,"y":712.390625,"w":328,"h":180},"ink":{"x":556,"y":712.390625,"w":330,"h":180},"dimension_menor":180,"razon_area_tinta_bounds":1.0060975609756098},{"id":1780,"nodeName":"A","parentId":1768,"bounds":{"x":969.5,"y":712.390625,"w":328,"h":180},"ink":{"x":969.5,"y":712.390625,"w":330,"h":180},"dimension_menor":180,"razon_area_tinta_bounds":1.0060975609756098},{"id":2148,"nodeName":"IMG","parentId":2114,"bounds":{"x":1215,"y":607.34375,"w":200,"h":66.65625},"ink":{"x":1215,"y":607.34375,"w":200,"h":66.65625},"dimension_menor":66.65625,"razon_area_tinta_bounds":1},{"id":2390,"nodeName":"BUTTON","parentId":1264,"bounds":{"x":1378,"y":685,"w":40,"h":40},"ink":{"x":1378,"y":685,"w":40,"h":40},"dimension_menor":40,"razon_area_tinta_bounds":1},{"id":2762,"nodeName":"A","parentId":2758,"bounds":{"x":20,"y":801.5,"w":1354.140625,"h":37.5},"ink":{"x":20,"y":801.5,"w":1354.140625,"h":37.5},"dimension_menor":37.5,"razon_area_tinta_bounds":1},{"id":2768,"nodeName":"A","parentId":2767,"bounds":{"x":20,"y":860.5,"w":248.65625,"h":18},"ink":{"x":20,"y":860.5,"w":248.65625,"h":18},"dimension_menor":18,"razon_area_tinta_bounds":1},{"id":2774,"nodeName":"BUTTON","parentId":2772,"bounds":{"x":963.453125,"y":843.90625,"w":146.90625,"h":36.09375},"ink":{"x":963.453125,"y":843.90625,"w":146.90625,"h":36.09375},"dimension_menor":36.09375,"razon_area_tinta_bounds":1},{"id":2777,"nodeName":"BUTTON","parentId":2772,"bounds":{"x":1130.359375,"y":843.90625,"w":118.84375,"h":36.09375},"ink":{"x":1130.359375,"y":843.90625,"w":118.84375,"h":36.09375},"dimension_menor":36.09375,"razon_area_tinta_bounds":1},{"id":2780,"nodeName":"BUTTON","parentId":2772,"bounds":{"x":1269.203125,"y":843.90625,"w":150.796875,"h":36.09375},"ink":{"x":1269.203125,"y":843.90625,"w":150.796875,"h":36.09375},"dimension_menor":36.09375,"razon_area_tinta_bounds":1}],"g7_objetivos_con_tinta_reducida":[{"id":1660,"nodeName":"A","parentId":1658,"bounds":{"x":356.09375,"y":528,"w":446.625,"h":55},"ink":{"x":491,"y":545.453125,"w":176.796875,"h":19},"dimension_menor":55,"razon_area_tinta_bounds":0.1367484670381396},{"id":1666,"nodeName":"A","parentId":1664,"bounds":{"x":802.71875,"y":528,"w":289.84375,"h":55},"ink":{"x":937.625,"y":545.453125,"w":20.015625,"h":19},"dimension_menor":55,"razon_area_tinta_bounds":0.02385591766723842},{"id":1672,"nodeName":"A","parentId":1670,"bounds":{"x":1092.5625,"y":528,"w":347.4375,"h":55},"ink":{"x":1227.46875,"y":545.453125,"w":77.609375,"h":19},"dimension_menor":55,"razon_area_tinta_bounds":0.07716642954095733}],"g7_pares_adyacentes":113,"g7_pares_adyacentes_detalle":[{"ids":[750,813],"separacion":17.09375},{"ids":[764,821],"separacion":15.09375},{"ids":[772,821],"separacion":15.09375},{"ids":[783,794],"separacion":15},{"ids":[783,884],"separacion":45.7539087512272},{"ids":[783,929],"separacion":24.328125},{"ids":[783,950],"separacion":103.11413058248247},{"ids":[783,1302],"separacion":84.875},{"ids":[794,798],"separacion":10},{"ids":[794,813],"separacion":38},{"ids":[794,929],"separacion":23.453125},{"ids":[794,950],"separacion":23.453125},{"ids":[794,956],"separacion":23.453125},{"ids":[794,977],"separacion":124.79906212870002},{"ids":[794,1302],"separacion":84},{"ids":[798,813],"separacion":12},{"ids":[813,817],"separacion":24},{"ids":[813,950],"separacion":82.93585300031963},{"ids":[813,956],"separacion":26.0625},{"ids":[813,977],"separacion":11.015625},{"ids":[813,1302],"separacion":86.609375},{"ids":[817,821],"separacion":24},{"ids":[817,977],"separacion":11.015625},{"ids":[821,977],"separacion":11.015625},{"ids":[830,847],"separacion":12},{"ids":[830,1302],"separacion":23},{"ids":[847,853],"separacion":24},{"ids":[847,1302],"separacion":41.546875},{"ids":[853,878],"separacion":24},{"ids":[853,1302],"separacion":41.546875},{"ids":[878,884],"separacion":24},{"ids":[878,1302],"separacion":41.546875},{"ids":[884,929],"separacion":24},{"ids":[884,1302],"separacion":41.546875},{"ids":[929,950],"separacion":24},{"ids":[929,1302],"separacion":41.546875},{"ids":[950,956],"separacion":24},{"ids":[950,1302],"separacion":41.546875},{"ids":[956,977],"separacion":32},{"ids":[956,1302],"separacion":41.546875},{"ids":[977,1302],"separacion":25.40625},{"ids":[1302,1550],"separacion":7.703125},{"ids":[1302,1564],"separacion":7.703125},{"ids":[1302,1578],"separacion":7.703125},{"ids":[1302,1592],"separacion":7.703125},{"ids":[1302,1606],"separacion":7.703125},{"ids":[1302,1620],"separacion":7.703125},{"ids":[1302,1634],"separacion":7.703125},{"ids":[1302,1654],"separacion":95},{"ids":[1302,1660],"separacion":95},{"ids":[1302,1666],"separacion":95},{"ids":[1302,1672],"separacion":95},{"ids":[1302,1726],"separacion":279.390625},{"ids":[1302,1753],"separacion":279.390625},{"ids":[1302,1780],"separacion":279.390625},{"ids":[1302,2148],"separacion":174.34375},{"ids":[1302,2762],"separacion":368.5},{"ids":[1516,1519],"separacion":14},{"ids":[1519,1522],"separacion":14},{"ids":[1522,1525],"separacion":14},{"ids":[1525,1528],"separacion":14},{"ids":[1528,1531],"separacion":14},{"ids":[1531,1534],"separacion":14},{"ids":[1534,1537],"separacion":14},{"ids":[1550,1564],"separacion":72},{"ids":[1550,1654],"separacion":7.703125},{"ids":[1564,1578],"separacion":72},{"ids":[1564,1654],"separacion":7.703125},{"ids":[1564,1660],"separacion":7.703125},{"ids":[1578,1592],"separacion":72},{"ids":[1578,1660],"separacion":7.703125},{"ids":[1592,1606],"separacion":72},{"ids":[1592,1660],"separacion":7.703125},{"ids":[1592,1666],"separacion":19.564658926397108},{"ids":[1606,1620],"separacion":72},{"ids":[1606,1660],"separacion":54.56212861414271},{"ids":[1606,1666],"separacion":7.703125},{"ids":[1620,1634],"separacion":72},{"ids":[1620,1666],"separacion":7.703125},{"ids":[1620,1672],"separacion":7.703125},{"ids":[1634,1666],"separacion":81.66100672616797},{"ids":[1634,1672],"separacion":7.703125},{"ids":[1654,1660],"separacion":0},{"ids":[1654,1726],"separacion":129.390625},{"ids":[1654,1753],"separacion":238.12694645283872},{"ids":[1654,2762],"separacion":218.5},{"ids":[1660,1666],"separacion":0},{"ids":[1660,1672],"separacion":289.84375},{"ids":[1660,1726],"separacion":129.390625},{"ids":[1660,1753],"separacion":129.390625},{"ids":[1660,1780],"separacion":211.08746810138476},{"ids":[1660,2762],"separacion":218.5},{"ids":[1666,1672],"separacion":0},{"ids":[1666,1753],"separacion":129.390625},{"ids":[1666,1780],"separacion":129.390625},{"ids":[1666,2148],"separacion":124.83412822747032},{"ids":[1666,2762],"separacion":218.5},{"ids":[1672,1753],"separacion":245.4388930959},{"ids":[1672,1780],"separacion":129.390625},{"ids":[1672,2148],"separacion":24.34375},{"ids":[1672,2762],"separacion":218.5},{"ids":[1726,1753],"separacion":85.5},{"ids":[1753,1780],"separacion":85.5},{"ids":[1753,2774],"separacion":79.453125},{"ids":[1780,2148],"separacion":38.390625},{"ids":[2148,2390],"separacion":11},{"ids":[2148,2762],"separacion":127.5},{"ids":[2762,2768],"separacion":21.5},{"ids":[2762,2774],"separacion":4.90625},{"ids":[2762,2777],"separacion":4.90625},{"ids":[2762,2780],"separacion":4.90625},{"ids":[2774,2777],"separacion":20},{"ids":[2777,2780],"separacion":20}],"g7_p_T1":{"p":0.18,"afectados":9,"denominador":50,"denominador_definicion":"todos los objetivos accionables","etiqueta":"frecuente","ids_afectados":[1516,1519,1522,1525,1528,1531,1534,1537,2768]},"g7_p_T2":{"p":0.1947,"afectados":22,"denominador":113,"denominador_definicion":"pares de objetivos adyacentes","etiqueta":"frecuente","ids_afectados":[1302,1550,1564,1578,1592,1606,1620,1634,1654,1660,1666,1672,2762,2774,2777,2780],"pares_afectados":[[1302,1550],[1302,1564],[1302,1578],[1302,1592],[1302,1606],[1302,1620],[1302,1634],[1550,1654],[1564,1654],[1564,1660],[1578,1660],[1592,1660],[1606,1666],[1620,1666],[1620,1672],[1634,1672],[1654,1660],[1660,1666],[1666,1672],[2762,2774],[2762,2777],[2762,2780]]},"g7_p_T3":{"p":0.54,"afectados":27,"denominador":50,"denominador_definicion":"todos los objetivos accionables","etiqueta":"generalizado","ids_afectados":[750,764,772,783,794,798,813,817,821,847,853,878,884,929,950,956,1270,1509,1516,1519,1522,1525,1528,1531,1534,1537,2768]},"g7_p_T4":{"p":0.3333,"afectados":6,"denominador":18,"denominador_definicion":"objetivos que pertenecen a una familia de dos o mas","etiqueta":"generalizado","ids_afectados":[813,817,821,2774,2777,2780]},"g7_familias":5,"g7_familias_detalle":[{"nodeName":"BUTTON","parentId":759,"ids":[764,772],"rango_ancho":0,"rango_alto":0,"consistente":true},{"nodeName":"A","parentId":811,"ids":[813,817,821],"rango_ancho":65.375,"rango_alto":0,"consistente":false},{"nodeName":"A","parentId":1268,"ids":[1270,1509],"rango_ancho":0,"rango_alto":0,"consistente":true},{"nodeName":"A","parentId":1514,"ids":[1516,1519,1522,1525,1528,1531,1534,1537],"rango_ancho":0,"rango_alto":0,"consistente":true},{"nodeName":"BUTTON","parentId":2772,"ids":[2774,2777,2780],"rango_ancho":31.953125,"rango_alto":0,"consistente":false}],"g7_families_consistent":false,"g7_areas_mayores":[{"id":1302,"a":417600},{"id":1726,"a":59040},{"id":1753,"a":59040},{"id":1780,"a":59040},{"id":2762,"a":50780.2734375}],"g7_razon_area_1_2":7.07,"g7_no_aplicable":false,"juicios":[{"campo":"nivel","decide":"El nivel, aplicando la combinacion de la escala de tolerancia a las cuatro proporciones.","evidencia":"g7_p_T1 a g7_p_T4 con sus etiquetas.","requiere_lectura":false},{"campo":"objetivo primario (nivel 4)","decide":"Si el objetivo primario es visiblemente mayor que los secundarios.","evidencia":"g7_areas_mayores y g7_razon_area_1_2 sobre el canal.","requiere_lectura":false}],"g7_criterios_con_lectura_de_texto":[]},"inventario_accionables":{"version":"1.0.0","atributos_estado_registrados":false,"objetivos":[{"id":750,"nodeName":"LABEL","evidencia":"clic_del_motor","bounds":{"x":1130.53125,"y":7.5,"w":40,"h":18},"ink":{"x":0,"y":0,"w":1170.53125,"h":26.5},"en_g2":true},{"id":764,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":1343.09375,"y":5.5,"w":22,"h":22},"ink":{"x":1343.09375,"y":5.5,"w":22,"h":22},"en_g2":true},{"id":772,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":1393,"y":5.5,"w":22,"h":22},"ink":{"x":1393,"y":5.5,"w":22,"h":22},"en_g2":true},{"id":783,"nodeName":"A","evidencia":"enlace","bounds":{"x":666.96875,"y":40.875,"w":116.34375,"h":17.25},"ink":{"x":666.96875,"y":38.875,"w":116.34375,"h":20},"en_g2":true},{"id":794,"nodeName":"INPUT","evidencia":"control_nativo","bounds":{"x":798.3125,"y":40,"w":252,"h":19},"ink":{"x":798.3125,"y":40,"w":252,"h":19},"en_g2":true},{"id":798,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":1060.3125,"y":41.5,"w":16,"h":16},"ink":{"x":1060.3125,"y":41.5,"w":16,"h":16},"en_g2":true},{"id":813,"nodeName":"A","evidencia":"enlace","bounds":{"x":1088.3125,"y":42.59375,"w":121.65625,"h":13.796875},"ink":{"x":0,"y":0,"w":1221.96875,"h":59.484375},"en_g2":true},{"id":817,"nodeName":"A","evidencia":"enlace","bounds":{"x":1233.96875,"y":42.59375,"w":78.75,"h":13.796875},"ink":{"x":0,"y":0,"w":1324.71875,"h":59.484375},"en_g2":true},{"id":821,"nodeName":"A","evidencia":"enlace","bounds":{"x":1336.71875,"y":42.59375,"w":56.28125,"h":13.796875},"ink":{"x":1336.71875,"y":40.59375,"w":56.28125,"h":17},"en_g2":true},{"id":830,"nodeName":"A","evidencia":"enlace","bounds":{"x":35,"y":65,"w":213,"h":55},"ink":{"x":35,"y":65,"w":213,"h":55},"en_g2":true},{"id":847,"nodeName":"A","evidencia":"enlace","bounds":{"x":260,"y":82.453125,"w":41.984375,"h":19},"ink":{"x":260,"y":82.453125,"w":41.984375,"h":19},"en_g2":true},{"id":853,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":325.984375,"y":82.453125,"w":74.921875,"h":19},"ink":{"x":325.984375,"y":82.453125,"w":74.921875,"h":19},"en_g2":true},{"id":878,"nodeName":"A","evidencia":"enlace","bounds":{"x":424.90625,"y":82.453125,"w":93.046875,"h":19},"ink":{"x":424.90625,"y":82.453125,"w":93.046875,"h":19},"en_g2":true},{"id":884,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":541.953125,"y":82.453125,"w":86.265625,"h":19},"ink":{"x":541.953125,"y":82.453125,"w":86.265625,"h":19},"en_g2":true},{"id":929,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":652.21875,"y":82.453125,"w":207.296875,"h":19},"ink":{"x":652.21875,"y":82.453125,"w":207.296875,"h":19},"en_g2":true},{"id":950,"nodeName":"A","evidencia":"enlace","bounds":{"x":883.515625,"y":82.453125,"w":126.0625,"h":19},"ink":{"x":883.515625,"y":82.453125,"w":126.0625,"h":19},"en_g2":true},{"id":956,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":1033.578125,"y":82.453125,"w":109.25,"h":19},"ink":{"x":1033.578125,"y":82.453125,"w":109.25,"h":19},"en_g2":true},{"id":977,"nodeName":"A","evidencia":"enlace","bounds":{"x":1174.828125,"y":67.40625,"w":230.171875,"h":50.1875},"ink":{"x":1174.828125,"y":67.40625,"w":230.171875,"h":50.1875},"en_g2":true},{"id":1270,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":40,"y":270.5,"w":30,"h":35},"ink":{"x":40,"y":270.5,"w":30,"h":35},"en_g2":true},{"id":1302,"nodeName":"A","evidencia":"enlace","bounds":{"x":0,"y":143,"w":1440,"h":290},"ink":null,"en_g2":false},{"id":1509,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":1370,"y":270.5,"w":30,"h":35},"ink":{"x":1370,"y":270.5,"w":30,"h":35},"en_g2":true},{"id":1516,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":591,"y":390,"w":20,"h":20},"ink":{"x":591,"y":390,"w":20,"h":20},"en_g2":true},{"id":1519,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":625,"y":390,"w":20,"h":20},"ink":{"x":625,"y":390,"w":20,"h":20},"en_g2":true},{"id":1522,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":659,"y":390,"w":20,"h":20},"ink":{"x":659,"y":390,"w":20,"h":20},"en_g2":true},{"id":1525,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":693,"y":390,"w":20,"h":20},"ink":{"x":693,"y":390,"w":20,"h":20},"en_g2":true},{"id":1528,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":727,"y":390,"w":20,"h":20},"ink":{"x":727,"y":390,"w":20,"h":20},"en_g2":true},{"id":1531,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":761,"y":390,"w":20,"h":20},"ink":{"x":761,"y":390,"w":20,"h":20},"en_g2":true},{"id":1534,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":795,"y":390,"w":20,"h":20},"ink":{"x":795,"y":390,"w":20,"h":20},"en_g2":true},{"id":1537,"nodeName":"A","evidencia":"clic_del_motor","bounds":{"x":829,"y":390,"w":20,"h":20},"ink":{"x":829,"y":390,"w":20,"h":20},"en_g2":true},{"id":1550,"nodeName":"A","evidencia":"enlace","bounds":{"x":179.28125,"y":440.703125,"w":60,"h":79.59375},"ink":{"x":179.28125,"y":440.703125,"w":60,"h":80.796875},"en_g2":true},{"id":1564,"nodeName":"A","evidencia":"enlace","bounds":{"x":311.28125,"y":440.703125,"w":133.59375,"h":79.59375},"ink":{"x":311.28125,"y":440.703125,"w":133.59375,"h":80.796875},"en_g2":true},{"id":1578,"nodeName":"A","evidencia":"enlace","bounds":{"x":516.875,"y":440.703125,"w":113.96875,"h":79.59375},"ink":{"x":516.875,"y":440.703125,"w":113.96875,"h":80.796875},"en_g2":true},{"id":1592,"nodeName":"A","evidencia":"enlace","bounds":{"x":702.84375,"y":440.703125,"w":81.890625,"h":79.59375},"ink":{"x":702.84375,"y":440.703125,"w":81.890625,"h":80.796875},"en_g2":true},{"id":1606,"nodeName":"A","evidencia":"enlace","bounds":{"x":856.734375,"y":440.703125,"w":112.6875,"h":79.59375},"ink":{"x":856.734375,"y":440.703125,"w":112.6875,"h":80.796875},"en_g2":true},{"id":1620,"nodeName":"A","evidencia":"enlace","bounds":{"x":1041.421875,"y":440.703125,"w":60.4375,"h":79.59375},"ink":{"x":1041.421875,"y":440.703125,"w":60.4375,"h":80.796875},"en_g2":true},{"id":1634,"nodeName":"A","evidencia":"enlace","bounds":{"x":1173.859375,"y":440.703125,"w":86.859375,"h":79.59375},"ink":{"x":1173.859375,"y":440.703125,"w":86.859375,"h":80.796875},"en_g2":true},{"id":1654,"nodeName":"A","evidencia":"enlace","bounds":{"x":0,"y":528,"w":356.09375,"h":55},"ink":{"x":0,"y":528,"w":356.09375,"h":55},"en_g2":true},{"id":1660,"nodeName":"A","evidencia":"enlace","bounds":{"x":356.09375,"y":528,"w":446.625,"h":55},"ink":{"x":491,"y":545.453125,"w":176.796875,"h":19},"en_g2":true},{"id":1666,"nodeName":"A","evidencia":"enlace","bounds":{"x":802.71875,"y":528,"w":289.84375,"h":55},"ink":{"x":937.625,"y":545.453125,"w":20.015625,"h":19},"en_g2":true},{"id":1672,"nodeName":"A","evidencia":"enlace","bounds":{"x":1092.5625,"y":528,"w":347.4375,"h":55},"ink":{"x":1227.46875,"y":545.453125,"w":77.609375,"h":19},"en_g2":true},{"id":1726,"nodeName":"A","evidencia":"enlace","bounds":{"x":142.5,"y":712.390625,"w":328,"h":180},"ink":{"x":142.5,"y":712.390625,"w":330,"h":180},"en_g2":true},{"id":1753,"nodeName":"A","evidencia":"enlace","bounds":{"x":556,"y":712.390625,"w":328,"h":180},"ink":{"x":556,"y":712.390625,"w":330,"h":180},"en_g2":true},{"id":1780,"nodeName":"A","evidencia":"enlace","bounds":{"x":969.5,"y":712.390625,"w":328,"h":180},"ink":{"x":969.5,"y":712.390625,"w":330,"h":180},"en_g2":true},{"id":2148,"nodeName":"IMG","evidencia":"clic_del_motor","bounds":{"x":1215,"y":607.34375,"w":200,"h":66.65625},"ink":{"x":1215,"y":607.34375,"w":200,"h":66.65625},"en_g2":true},{"id":2390,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":1378,"y":685,"w":40,"h":40},"ink":{"x":1378,"y":685,"w":40,"h":40},"en_g2":true},{"id":2762,"nodeName":"A","evidencia":"enlace","bounds":{"x":20,"y":801.5,"w":1354.140625,"h":37.5},"ink":{"x":20,"y":801.5,"w":1354.140625,"h":37.5},"en_g2":true},{"id":2768,"nodeName":"A","evidencia":"enlace","bounds":{"x":20,"y":860.5,"w":248.65625,"h":18},"ink":{"x":20,"y":860.5,"w":248.65625,"h":18},"en_g2":true},{"id":2774,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":963.453125,"y":843.90625,"w":146.90625,"h":36.09375},"ink":{"x":963.453125,"y":843.90625,"w":146.90625,"h":36.09375},"en_g2":true},{"id":2777,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":1130.359375,"y":843.90625,"w":118.84375,"h":36.09375},"ink":{"x":1130.359375,"y":843.90625,"w":118.84375,"h":36.09375},"en_g2":true},{"id":2780,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":1269.203125,"y":843.90625,"w":150.796875,"h":36.09375},"ink":{"x":1269.203125,"y":843.90625,"w":150.796875,"h":36.09375},"en_g2":true}],"excluidos":[{"id":0,"nodeName":"#document","motivo":"raiz_del_documento"},{"id":754,"nodeName":"SPAN","motivo":"contenido_de_control","representado_por":750}],"ambiguos":[{"id":754,"motivo":"cadena_generica_sin_identidad_de_accion","controles":[750]}],"limitaciones":["El snapshot no identifica la función de cada manejador JS; las exclusiones de contenedores y cadenas genéricas son convenciones operativas auditables.","No se infiere que dos hermanos sean el mismo control por compartir URL, geometría o etiqueta.","No se reconstruyen oclusiones, recortes CSS ni destinos dentro de iframes ausentes del snapshot.","Captura antigua: no certifica el registro de disabled, aria-disabled, inert ni for; la ausencia de esos atributos no demuestra que un control esté habilitado ni que un label carezca de asociación."]}}

# Salida de esta ejecución

Devuelve un único JSON con channel="wireframe" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g7"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"wireframe"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["W_min","holgura","S_min","consistencia","ninguna",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["g7_N_obj","g7_N_bajo24","g7_N_bajo24_sin_holgura","g7_W_min","g7_S_min","g7_families_consistent","g7_inventario_ambiguo","g7_p_T1","g7_p_T2","g7_p_T3","g7_p_T4","primary_larger","lectura_screenshot","motivo_abstencion","ancla_definida"],"properties":{"g7_N_obj":{"type":"integer","minimum":0},"g7_N_bajo24":{"type":"integer","minimum":0},"g7_N_bajo24_sin_holgura":{"type":"integer","minimum":0},"g7_W_min":{"type":["number","null"]},"g7_S_min":{"type":["number","null"]},"g7_families_consistent":{"type":["boolean","null"]},"g7_inventario_ambiguo":{"type":"boolean"},"g7_p_T1":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}}}},"g7_p_T2":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados","pares_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}},"pares_afectados":{"type":"array","items":{"type":"array","items":{"type":"integer"}}}}},"g7_p_T3":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}}}},"g7_p_T4":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}}}},"primary_larger":{"type":["boolean","null"]},"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true,"maxItems":0},"motivo_abstencion":{"type":["string","null"]},"ancla_definida":{"type":"boolean"}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"3bffb53f00095140a19430bb3a6e71eb00da5a27256b32b2c0eedf7ff882a63a","wireframe":"748fb7ef9da791c7b3a594b1f8d8e08693937b6b20ec3d9aa1b3f15cdf16ca49"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.