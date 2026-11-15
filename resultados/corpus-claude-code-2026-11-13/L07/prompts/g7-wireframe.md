# Ejecución 1.0.0

Evalúa solo G7, captura captures/L07.

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
{"pagina":{"id":"L07","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:19:15.671Z","sanity_ok":null,"consent_limpio":null},"group_id":"g7","measurements_version":"1.0.6","g7":{"g7_N_obj":37,"g7_N_bajo24":1,"g7_N_bajo24_sin_holgura":0,"g7_inventario_ambiguo":true,"g7_W_min":16,"g7_S_min":0,"g7_objetivos":[{"id":197,"nodeName":"A","parentId":196,"bounds":{"x":100,"y":0,"w":74.703125,"h":36},"ink":{"x":0,"y":0,"w":174.703125,"h":26},"dimension_menor":36,"razon_area_tinta_bounds":1.6890120616328523},{"id":201,"nodeName":"A","parentId":200,"bounds":{"x":174.703125,"y":0,"w":75.203125,"h":36},"ink":{"x":182.703125,"y":9,"w":59.203125,"h":17},"dimension_menor":36,"razon_area_tinta_bounds":0.3717535840432163},{"id":205,"nodeName":"A","parentId":204,"bounds":{"x":249.90625,"y":0,"w":78.203125,"h":36},"ink":{"x":257.90625,"y":9,"w":62.203125,"h":17},"dimension_menor":36,"razon_area_tinta_bounds":0.3756077256077256},{"id":216,"nodeName":"SPAN","parentId":215,"bounds":{"x":838.625,"y":0,"w":261.65625,"h":36},"ink":{"x":838.625,"y":9,"w":261.65625,"h":17},"dimension_menor":36,"razon_area_tinta_bounds":0.4722222222222222},{"id":308,"nodeName":"DIV","parentId":213,"bounds":{"x":1120.28125,"y":0,"w":101.0625,"h":36},"ink":{"x":1120.28125,"y":9,"w":101.0625,"h":17},"dimension_menor":36,"razon_area_tinta_bounds":0.4722222222222222},{"id":320,"nodeName":"SPAN","parentId":319,"bounds":{"x":1237.34375,"y":0,"w":102.65625,"h":36},"ink":{"x":1237.34375,"y":8,"w":102.65625,"h":18},"dimension_menor":36,"razon_area_tinta_bounds":0.5},{"id":411,"nodeName":"A","parentId":410,"bounds":{"x":100,"y":49,"w":90,"h":32},"ink":{"x":100,"y":49,"w":90,"h":32},"dimension_menor":32,"razon_area_tinta_bounds":1},{"id":421,"nodeName":"A","parentId":420,"bounds":{"x":210,"y":36,"w":119.1875,"h":64},"ink":{"x":210,"y":36,"w":119.1875,"h":64},"dimension_menor":64,"razon_area_tinta_bounds":1},{"id":541,"nodeName":"A","parentId":540,"bounds":{"x":689.796875,"y":207,"w":218.109375,"h":37.59375},"ink":{"x":689.796875,"y":213,"w":166.640625,"h":26},"dimension_menor":37.59375,"razon_area_tinta_bounds":0.5284017551221881},{"id":548,"nodeName":"A","parentId":547,"bounds":{"x":721.796875,"y":248.59375,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":252.59375,"w":186.109375,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.6988505747126437},{"id":552,"nodeName":"A","parentId":551,"bounds":{"x":721.796875,"y":275.78125,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":279.78125,"w":125.890625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.4727259743480623},{"id":556,"nodeName":"A","parentId":555,"bounds":{"x":721.796875,"y":302.96875,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":306.96875,"w":94.796875,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.3559672938276895},{"id":560,"nodeName":"A","parentId":559,"bounds":{"x":721.796875,"y":330.15625,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":334.15625,"w":138,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.5181973197768507},{"id":564,"nodeName":"A","parentId":563,"bounds":{"x":721.796875,"y":357.34375,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":361.34375,"w":63.4375,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.23821117734307223},{"id":568,"nodeName":"A","parentId":567,"bounds":{"x":721.796875,"y":384.53125,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":388.53125,"w":77.3125,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.2903125382988969},{"id":572,"nodeName":"A","parentId":571,"bounds":{"x":721.796875,"y":411.71875,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":415.71875,"w":36.453125,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.13688341791659792},{"id":576,"nodeName":"A","parentId":575,"bounds":{"x":689.796875,"y":459.90625,"w":218.109375,"h":37.59375},"ink":{"x":689.796875,"y":465.90625,"w":117.71875,"h":26},"dimension_menor":37.59375,"razon_area_tinta_bounds":0.3732750888973807},{"id":581,"nodeName":"A","parentId":580,"bounds":{"x":341.1875,"y":36,"w":102.265625,"h":64},"ink":{"x":357.1875,"y":58,"w":74.265625,"h":18},"dimension_menor":64,"razon_area_tinta_bounds":0.20424465240641712},{"id":715,"nodeName":"A","parentId":714,"bounds":{"x":455.453125,"y":36,"w":130.625,"h":64},"ink":{"x":471.453125,"y":58,"w":102.625,"h":18},"dimension_menor":64,"razon_area_tinta_bounds":0.22096291866028708},{"id":770,"nodeName":"A","parentId":769,"bounds":{"x":598.078125,"y":36,"w":111.328125,"h":64},"ink":{"x":614.078125,"y":58,"w":83.328125,"h":18},"dimension_menor":64,"razon_area_tinta_bounds":0.21051315789473685},{"id":789,"nodeName":"A","parentId":788,"bounds":{"x":100,"y":207,"w":320,"h":37.59375},"ink":{"x":100,"y":213,"w":119.71875,"h":26},"dimension_menor":37.59375,"razon_area_tinta_bounds":0.2587437655860349},{"id":796,"nodeName":"A","parentId":795,"bounds":{"x":132,"y":248.59375,"w":288,"h":27.1875},"ink":{"x":132,"y":252.59375,"w":108.90625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.26426803959131545},{"id":800,"nodeName":"A","parentId":799,"bounds":{"x":132,"y":275.78125,"w":288,"h":27.1875},"ink":{"x":132,"y":279.78125,"w":87.046875,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.21122485632183907},{"id":804,"nodeName":"A","parentId":803,"bounds":{"x":132,"y":302.96875,"w":288,"h":27.1875},"ink":{"x":132,"y":306.96875,"w":58.390625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.14168861749680714},{"id":808,"nodeName":"A","parentId":807,"bounds":{"x":132,"y":330.15625,"w":288,"h":27.1875},"ink":{"x":132,"y":334.15625,"w":105.0625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.25494093231162196},{"id":812,"nodeName":"A","parentId":811,"bounds":{"x":100,"y":378.34375,"w":320,"h":37.59375},"ink":{"x":100,"y":384.34375,"w":137.9375,"h":26},"dimension_menor":37.59375,"razon_area_tinta_bounds":0.298119285120532},{"id":819,"nodeName":"A","parentId":818,"bounds":{"x":132,"y":419.9375,"w":288,"h":27.1875},"ink":{"x":132,"y":423.9375,"w":108.90625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.26426803959131545},{"id":823,"nodeName":"A","parentId":822,"bounds":{"x":132,"y":447.125,"w":288,"h":27.1875},"ink":{"x":132,"y":451.125,"w":177.515625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.4307531130268199},{"id":827,"nodeName":"A","parentId":826,"bounds":{"x":132,"y":474.3125,"w":288,"h":27.1875},"ink":{"x":132,"y":478.3125,"w":105.0625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.25494093231162196},{"id":831,"nodeName":"A","parentId":830,"bounds":{"x":100,"y":522.5,"w":320,"h":37.59375},"ink":{"x":100,"y":528.5,"w":131.53125,"h":26},"dimension_menor":37.59375,"razon_area_tinta_bounds":0.28427369077306736},{"id":836,"nodeName":"A","parentId":835,"bounds":{"x":100,"y":569.09375,"w":320,"h":37.59375},"ink":{"x":100,"y":575.09375,"w":207.1875,"h":26},"dimension_menor":37.59375,"razon_area_tinta_bounds":0.447786783042394},{"id":862,"nodeName":"A","parentId":861,"bounds":{"x":1136,"y":36,"w":48,"h":64},"ink":{"x":1148,"y":55,"w":24,"h":25},"dimension_menor":48,"razon_area_tinta_bounds":0.1953125},{"id":867,"nodeName":"A","parentId":866,"bounds":{"x":1200,"y":48,"w":140,"h":40},"ink":{"x":1200,"y":48,"w":140,"h":40},"dimension_menor":40,"razon_area_tinta_bounds":1},{"id":1162,"nodeName":"A","parentId":1159,"bounds":{"x":498,"y":666,"w":793.8125,"h":16},"ink":{"x":498,"y":664,"w":793.8125,"h":19},"dimension_menor":16,"razon_area_tinta_bounds":1.1875},{"id":1165,"nodeName":"BUTTON","parentId":1164,"bounds":{"x":931,"y":614,"w":160,"h":40},"ink":{"x":931,"y":614,"w":160,"h":40},"dimension_menor":40,"razon_area_tinta_bounds":1},{"id":1406,"nodeName":"A","parentId":1405,"bounds":{"x":1100,"y":799.984375,"w":200,"h":40},"ink":{"x":1100,"y":799.984375,"w":200,"h":40},"dimension_menor":40,"razon_area_tinta_bounds":1},{"id":2779,"nodeName":"DIV","parentId":929,"bounds":{"x":1268.15625,"y":832,"w":151.84375,"h":48},"ink":{"x":1268.15625,"y":832,"w":151.84375,"h":48},"dimension_menor":48,"razon_area_tinta_bounds":1}],"g7_objetivos_con_tinta_reducida":[{"id":201,"nodeName":"A","parentId":200,"bounds":{"x":174.703125,"y":0,"w":75.203125,"h":36},"ink":{"x":182.703125,"y":9,"w":59.203125,"h":17},"dimension_menor":36,"razon_area_tinta_bounds":0.3717535840432163},{"id":205,"nodeName":"A","parentId":204,"bounds":{"x":249.90625,"y":0,"w":78.203125,"h":36},"ink":{"x":257.90625,"y":9,"w":62.203125,"h":17},"dimension_menor":36,"razon_area_tinta_bounds":0.3756077256077256},{"id":216,"nodeName":"SPAN","parentId":215,"bounds":{"x":838.625,"y":0,"w":261.65625,"h":36},"ink":{"x":838.625,"y":9,"w":261.65625,"h":17},"dimension_menor":36,"razon_area_tinta_bounds":0.4722222222222222},{"id":308,"nodeName":"DIV","parentId":213,"bounds":{"x":1120.28125,"y":0,"w":101.0625,"h":36},"ink":{"x":1120.28125,"y":9,"w":101.0625,"h":17},"dimension_menor":36,"razon_area_tinta_bounds":0.4722222222222222},{"id":552,"nodeName":"A","parentId":551,"bounds":{"x":721.796875,"y":275.78125,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":279.78125,"w":125.890625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.4727259743480623},{"id":556,"nodeName":"A","parentId":555,"bounds":{"x":721.796875,"y":302.96875,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":306.96875,"w":94.796875,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.3559672938276895},{"id":564,"nodeName":"A","parentId":563,"bounds":{"x":721.796875,"y":357.34375,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":361.34375,"w":63.4375,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.23821117734307223},{"id":568,"nodeName":"A","parentId":567,"bounds":{"x":721.796875,"y":384.53125,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":388.53125,"w":77.3125,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.2903125382988969},{"id":572,"nodeName":"A","parentId":571,"bounds":{"x":721.796875,"y":411.71875,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":415.71875,"w":36.453125,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.13688341791659792},{"id":576,"nodeName":"A","parentId":575,"bounds":{"x":689.796875,"y":459.90625,"w":218.109375,"h":37.59375},"ink":{"x":689.796875,"y":465.90625,"w":117.71875,"h":26},"dimension_menor":37.59375,"razon_area_tinta_bounds":0.3732750888973807},{"id":581,"nodeName":"A","parentId":580,"bounds":{"x":341.1875,"y":36,"w":102.265625,"h":64},"ink":{"x":357.1875,"y":58,"w":74.265625,"h":18},"dimension_menor":64,"razon_area_tinta_bounds":0.20424465240641712},{"id":715,"nodeName":"A","parentId":714,"bounds":{"x":455.453125,"y":36,"w":130.625,"h":64},"ink":{"x":471.453125,"y":58,"w":102.625,"h":18},"dimension_menor":64,"razon_area_tinta_bounds":0.22096291866028708},{"id":770,"nodeName":"A","parentId":769,"bounds":{"x":598.078125,"y":36,"w":111.328125,"h":64},"ink":{"x":614.078125,"y":58,"w":83.328125,"h":18},"dimension_menor":64,"razon_area_tinta_bounds":0.21051315789473685},{"id":789,"nodeName":"A","parentId":788,"bounds":{"x":100,"y":207,"w":320,"h":37.59375},"ink":{"x":100,"y":213,"w":119.71875,"h":26},"dimension_menor":37.59375,"razon_area_tinta_bounds":0.2587437655860349},{"id":796,"nodeName":"A","parentId":795,"bounds":{"x":132,"y":248.59375,"w":288,"h":27.1875},"ink":{"x":132,"y":252.59375,"w":108.90625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.26426803959131545},{"id":800,"nodeName":"A","parentId":799,"bounds":{"x":132,"y":275.78125,"w":288,"h":27.1875},"ink":{"x":132,"y":279.78125,"w":87.046875,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.21122485632183907},{"id":804,"nodeName":"A","parentId":803,"bounds":{"x":132,"y":302.96875,"w":288,"h":27.1875},"ink":{"x":132,"y":306.96875,"w":58.390625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.14168861749680714},{"id":808,"nodeName":"A","parentId":807,"bounds":{"x":132,"y":330.15625,"w":288,"h":27.1875},"ink":{"x":132,"y":334.15625,"w":105.0625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.25494093231162196},{"id":812,"nodeName":"A","parentId":811,"bounds":{"x":100,"y":378.34375,"w":320,"h":37.59375},"ink":{"x":100,"y":384.34375,"w":137.9375,"h":26},"dimension_menor":37.59375,"razon_area_tinta_bounds":0.298119285120532},{"id":819,"nodeName":"A","parentId":818,"bounds":{"x":132,"y":419.9375,"w":288,"h":27.1875},"ink":{"x":132,"y":423.9375,"w":108.90625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.26426803959131545},{"id":823,"nodeName":"A","parentId":822,"bounds":{"x":132,"y":447.125,"w":288,"h":27.1875},"ink":{"x":132,"y":451.125,"w":177.515625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.4307531130268199},{"id":827,"nodeName":"A","parentId":826,"bounds":{"x":132,"y":474.3125,"w":288,"h":27.1875},"ink":{"x":132,"y":478.3125,"w":105.0625,"h":19},"dimension_menor":27.1875,"razon_area_tinta_bounds":0.25494093231162196},{"id":831,"nodeName":"A","parentId":830,"bounds":{"x":100,"y":522.5,"w":320,"h":37.59375},"ink":{"x":100,"y":528.5,"w":131.53125,"h":26},"dimension_menor":37.59375,"razon_area_tinta_bounds":0.28427369077306736},{"id":836,"nodeName":"A","parentId":835,"bounds":{"x":100,"y":569.09375,"w":320,"h":37.59375},"ink":{"x":100,"y":575.09375,"w":207.1875,"h":26},"dimension_menor":37.59375,"razon_area_tinta_bounds":0.447786783042394},{"id":862,"nodeName":"A","parentId":861,"bounds":{"x":1136,"y":36,"w":48,"h":64},"ink":{"x":1148,"y":55,"w":24,"h":25},"dimension_menor":48,"razon_area_tinta_bounds":0.1953125}],"g7_pares_adyacentes":142,"g7_pares_adyacentes_detalle":[{"ids":[197,201],"separacion":0},{"ids":[197,411],"separacion":13},{"ids":[197,421],"separacion":35.296875},{"ids":[201,205],"separacion":0},{"ids":[201,411],"separacion":13},{"ids":[201,421],"separacion":0},{"ids":[205,411],"separacion":61.30056108277069},{"ids":[205,421],"separacion":0},{"ids":[205,581],"separacion":13.078125},{"ids":[216,308],"separacion":20},{"ids":[216,541],"separacion":171},{"ids":[216,862],"separacion":35.71875},{"ids":[216,867],"separacion":100.43818547525886},{"ids":[308,320],"separacion":16},{"ids":[308,862],"separacion":0},{"ids":[308,867],"separacion":12},{"ids":[320,862],"separacion":53.34375},{"ids":[320,867],"separacion":12},{"ids":[411,421],"separacion":20},{"ids":[421,581],"separacion":12},{"ids":[421,789],"separacion":107},{"ids":[541,548],"separacion":4},{"ids":[541,552],"separacion":31.1875},{"ids":[541,556],"separacion":58.375},{"ids":[541,560],"separacion":85.5625},{"ids":[541,564],"separacion":112.75},{"ids":[541,568],"separacion":139.9375},{"ids":[541,572],"separacion":167.125},{"ids":[541,576],"separacion":215.3125},{"ids":[541,715],"separacion":149.01872064127545},{"ids":[541,770],"separacion":107},{"ids":[541,796],"separacion":269.8265253079571},{"ids":[541,800],"separacion":271.59347178460604},{"ids":[541,804],"separacion":276.03984202423686},{"ids":[541,808],"separacion":283.03938801166106},{"ids":[548,552],"separacion":0},{"ids":[548,556],"separacion":27.1875},{"ids":[548,560],"separacion":54.375},{"ids":[548,564],"separacion":81.5625},{"ids":[548,568],"separacion":108.75},{"ids":[548,572],"separacion":135.9375},{"ids":[548,576],"separacion":184.125},{"ids":[548,770],"separacion":149.10945686626695},{"ids":[552,556],"separacion":0},{"ids":[552,560],"separacion":27.1875},{"ids":[552,564],"separacion":54.375},{"ids":[552,568],"separacion":81.5625},{"ids":[552,572],"separacion":108.75},{"ids":[552,576],"separacion":156.9375},{"ids":[552,770],"separacion":176.21740958104317},{"ids":[556,560],"separacion":0},{"ids":[556,564],"separacion":27.1875},{"ids":[556,568],"separacion":54.375},{"ids":[556,572],"separacion":81.5625},{"ids":[556,576],"separacion":129.75},{"ids":[560,564],"separacion":0},{"ids":[560,568],"separacion":27.1875},{"ids":[560,572],"separacion":54.375},{"ids":[560,576],"separacion":102.5625},{"ids":[564,568],"separacion":0},{"ids":[564,572],"separacion":27.1875},{"ids":[564,576],"separacion":75.375},{"ids":[568,572],"separacion":0},{"ids":[568,576],"separacion":48.1875},{"ids":[572,576],"separacion":21},{"ids":[572,1165],"separacion":176.61014290839864},{"ids":[576,819],"separacion":270.099452260326},{"ids":[576,823],"separacion":269.796875},{"ids":[576,827],"separacion":269.796875},{"ids":[576,1162],"separacion":168.5},{"ids":[576,1165],"separacion":118.76687791241504},{"ids":[581,715],"separacion":12},{"ids":[715,770],"separacion":12},{"ids":[715,789],"separacion":112.72055745189351},{"ids":[715,796],"separacion":152.7646117768383},{"ids":[715,800],"separacion":179.32086304674124},{"ids":[715,804],"separacion":206.04183446287826},{"ids":[715,808],"separacion":232.87083004603247},{"ids":[789,796],"separacion":4},{"ids":[789,800],"separacion":31.1875},{"ids":[789,804],"separacion":58.375},{"ids":[789,808],"separacion":85.5625},{"ids":[789,812],"separacion":133.75},{"ids":[789,819],"separacion":175.34375},{"ids":[789,823],"separacion":202.53125},{"ids":[789,827],"separacion":229.71875},{"ids":[789,831],"separacion":277.90625},{"ids":[796,800],"separacion":0},{"ids":[796,804],"separacion":27.1875},{"ids":[796,808],"separacion":54.375},{"ids":[796,812],"separacion":102.5625},{"ids":[796,819],"separacion":144.15625},{"ids":[796,823],"separacion":171.34375},{"ids":[796,827],"separacion":198.53125},{"ids":[796,831],"separacion":246.71875},{"ids":[800,804],"separacion":0},{"ids":[800,808],"separacion":27.1875},{"ids":[800,812],"separacion":75.375},{"ids":[800,819],"separacion":116.96875},{"ids":[800,823],"separacion":144.15625},{"ids":[800,827],"separacion":171.34375},{"ids":[800,831],"separacion":219.53125},{"ids":[800,836],"separacion":266.125},{"ids":[804,808],"separacion":0},{"ids":[804,812],"separacion":48.1875},{"ids":[804,819],"separacion":89.78125},{"ids":[804,823],"separacion":116.96875},{"ids":[804,827],"separacion":144.15625},{"ids":[804,831],"separacion":192.34375},{"ids":[804,836],"separacion":238.9375},{"ids":[808,812],"separacion":21},{"ids":[808,819],"separacion":62.59375},{"ids":[808,823],"separacion":89.78125},{"ids":[808,827],"separacion":116.96875},{"ids":[808,831],"separacion":165.15625},{"ids":[808,836],"separacion":211.75},{"ids":[812,819],"separacion":4},{"ids":[812,823],"separacion":31.1875},{"ids":[812,827],"separacion":58.375},{"ids":[812,831],"separacion":106.5625},{"ids":[812,836],"separacion":153.15625},{"ids":[812,1162],"separacion":261.94513529792835},{"ids":[819,823],"separacion":0},{"ids":[819,827],"separacion":27.1875},{"ids":[819,831],"separacion":75.375},{"ids":[819,836],"separacion":121.96875},{"ids":[819,1162],"separacion":232.35805478829434},{"ids":[823,827],"separacion":0},{"ids":[823,831],"separacion":48.1875},{"ids":[823,836],"separacion":94.78125},{"ids":[823,1162],"separacion":206.9495050881978},{"ids":[827,831],"separacion":21},{"ids":[827,836],"separacion":67.59375},{"ids":[827,1162],"separacion":182.05562336824423},{"ids":[831,836],"separacion":9},{"ids":[831,1162],"separacion":131.52997296837896},{"ids":[836,1162],"separacion":97.98965586351449},{"ids":[862,867],"separacion":16},{"ids":[1162,1165],"separacion":12},{"ids":[1162,1406],"separacion":117.984375},{"ids":[1162,2779],"separacion":150},{"ids":[1165,1406],"separacion":146.26153884101117}],"g7_p_T1":{"p":0,"afectados":0,"denominador":37,"denominador_definicion":"todos los objetivos accionables","etiqueta":"impecable","ids_afectados":[]},"g7_p_T2":{"p":0.1338,"afectados":19,"denominador":142,"denominador_definicion":"pares de objetivos adyacentes","etiqueta":"frecuente","ids_afectados":[197,201,205,308,421,541,548,552,556,560,564,568,572,789,796,800,804,808,812,819,823,827,862],"pares_afectados":[[197,201],[201,205],[201,421],[205,421],[308,862],[541,548],[548,552],[552,556],[556,560],[560,564],[564,568],[568,572],[789,796],[796,800],[800,804],[804,808],[812,819],[819,823],[823,827]]},"g7_p_T3":{"p":0.4054,"afectados":15,"denominador":37,"denominador_definicion":"todos los objetivos accionables","etiqueta":"generalizado","ids_afectados":[548,552,556,560,564,568,572,796,800,804,808,819,823,827,1162]},"g7_p_T4":{"p":null,"afectados":0,"denominador":0,"denominador_definicion":"objetivos que pertenecen a una familia de dos o mas","etiqueta":null,"ids_afectados":[]},"g7_familias":0,"g7_familias_detalle":[],"g7_families_consistent":null,"g7_areas_mayores":[{"id":1162,"a":12701},{"id":789,"a":12030},{"id":812,"a":12030},{"id":831,"a":12030},{"id":836,"a":12030}],"g7_razon_area_1_2":1.06,"g7_no_aplicable":false,"juicios":[{"campo":"nivel","decide":"El nivel, aplicando la combinacion de la escala de tolerancia a las cuatro proporciones.","evidencia":"g7_p_T1 a g7_p_T4 con sus etiquetas.","requiere_lectura":false},{"campo":"objetivo primario (nivel 4)","decide":"Si el objetivo primario es visiblemente mayor que los secundarios.","evidencia":"g7_areas_mayores y g7_razon_area_1_2 sobre el canal.","requiere_lectura":false}],"g7_criterios_con_lectura_de_texto":[]},"inventario_accionables":{"version":"1.0.0","atributos_estado_registrados":false,"objetivos":[{"id":197,"nodeName":"A","evidencia":"enlace","bounds":{"x":100,"y":0,"w":74.703125,"h":36},"ink":{"x":0,"y":0,"w":174.703125,"h":26},"en_g2":true},{"id":201,"nodeName":"A","evidencia":"enlace","bounds":{"x":174.703125,"y":0,"w":75.203125,"h":36},"ink":{"x":182.703125,"y":9,"w":59.203125,"h":17},"en_g2":true},{"id":205,"nodeName":"A","evidencia":"enlace","bounds":{"x":249.90625,"y":0,"w":78.203125,"h":36},"ink":{"x":257.90625,"y":9,"w":62.203125,"h":17},"en_g2":true},{"id":216,"nodeName":"SPAN","evidencia":"clic_del_motor","bounds":{"x":838.625,"y":0,"w":261.65625,"h":36},"ink":{"x":838.625,"y":9,"w":261.65625,"h":17},"en_g2":true},{"id":308,"nodeName":"DIV","evidencia":"clic_del_motor","bounds":{"x":1120.28125,"y":0,"w":101.0625,"h":36},"ink":{"x":1120.28125,"y":9,"w":101.0625,"h":17},"en_g2":true},{"id":320,"nodeName":"SPAN","evidencia":"clic_del_motor","bounds":{"x":1237.34375,"y":0,"w":102.65625,"h":36},"ink":{"x":1237.34375,"y":8,"w":102.65625,"h":18},"en_g2":true},{"id":411,"nodeName":"A","evidencia":"enlace","bounds":{"x":100,"y":49,"w":90,"h":32},"ink":{"x":100,"y":49,"w":90,"h":32},"en_g2":true},{"id":421,"nodeName":"A","evidencia":"enlace","bounds":{"x":210,"y":36,"w":119.1875,"h":64},"ink":{"x":210,"y":36,"w":119.1875,"h":64},"en_g2":true},{"id":541,"nodeName":"A","evidencia":"enlace","bounds":{"x":689.796875,"y":207,"w":218.109375,"h":37.59375},"ink":{"x":689.796875,"y":213,"w":166.640625,"h":26},"en_g2":true},{"id":548,"nodeName":"A","evidencia":"enlace","bounds":{"x":721.796875,"y":248.59375,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":252.59375,"w":186.109375,"h":19},"en_g2":true},{"id":552,"nodeName":"A","evidencia":"enlace","bounds":{"x":721.796875,"y":275.78125,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":279.78125,"w":125.890625,"h":19},"en_g2":true},{"id":556,"nodeName":"A","evidencia":"enlace","bounds":{"x":721.796875,"y":302.96875,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":306.96875,"w":94.796875,"h":19},"en_g2":true},{"id":560,"nodeName":"A","evidencia":"enlace","bounds":{"x":721.796875,"y":330.15625,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":334.15625,"w":138,"h":19},"en_g2":true},{"id":564,"nodeName":"A","evidencia":"enlace","bounds":{"x":721.796875,"y":357.34375,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":361.34375,"w":63.4375,"h":19},"en_g2":true},{"id":568,"nodeName":"A","evidencia":"enlace","bounds":{"x":721.796875,"y":384.53125,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":388.53125,"w":77.3125,"h":19},"en_g2":true},{"id":572,"nodeName":"A","evidencia":"enlace","bounds":{"x":721.796875,"y":411.71875,"w":186.109375,"h":27.1875},"ink":{"x":721.796875,"y":415.71875,"w":36.453125,"h":19},"en_g2":true},{"id":576,"nodeName":"A","evidencia":"enlace","bounds":{"x":689.796875,"y":459.90625,"w":218.109375,"h":37.59375},"ink":{"x":689.796875,"y":465.90625,"w":117.71875,"h":26},"en_g2":true},{"id":581,"nodeName":"A","evidencia":"enlace","bounds":{"x":341.1875,"y":36,"w":102.265625,"h":64},"ink":{"x":357.1875,"y":58,"w":74.265625,"h":18},"en_g2":true},{"id":715,"nodeName":"A","evidencia":"enlace","bounds":{"x":455.453125,"y":36,"w":130.625,"h":64},"ink":{"x":471.453125,"y":58,"w":102.625,"h":18},"en_g2":true},{"id":770,"nodeName":"A","evidencia":"enlace","bounds":{"x":598.078125,"y":36,"w":111.328125,"h":64},"ink":{"x":614.078125,"y":58,"w":83.328125,"h":18},"en_g2":true},{"id":789,"nodeName":"A","evidencia":"enlace","bounds":{"x":100,"y":207,"w":320,"h":37.59375},"ink":{"x":100,"y":213,"w":119.71875,"h":26},"en_g2":true},{"id":796,"nodeName":"A","evidencia":"enlace","bounds":{"x":132,"y":248.59375,"w":288,"h":27.1875},"ink":{"x":132,"y":252.59375,"w":108.90625,"h":19},"en_g2":true},{"id":800,"nodeName":"A","evidencia":"enlace","bounds":{"x":132,"y":275.78125,"w":288,"h":27.1875},"ink":{"x":132,"y":279.78125,"w":87.046875,"h":19},"en_g2":true},{"id":804,"nodeName":"A","evidencia":"enlace","bounds":{"x":132,"y":302.96875,"w":288,"h":27.1875},"ink":{"x":132,"y":306.96875,"w":58.390625,"h":19},"en_g2":true},{"id":808,"nodeName":"A","evidencia":"enlace","bounds":{"x":132,"y":330.15625,"w":288,"h":27.1875},"ink":{"x":132,"y":334.15625,"w":105.0625,"h":19},"en_g2":true},{"id":812,"nodeName":"A","evidencia":"enlace","bounds":{"x":100,"y":378.34375,"w":320,"h":37.59375},"ink":{"x":100,"y":384.34375,"w":137.9375,"h":26},"en_g2":true},{"id":819,"nodeName":"A","evidencia":"enlace","bounds":{"x":132,"y":419.9375,"w":288,"h":27.1875},"ink":{"x":132,"y":423.9375,"w":108.90625,"h":19},"en_g2":true},{"id":823,"nodeName":"A","evidencia":"enlace","bounds":{"x":132,"y":447.125,"w":288,"h":27.1875},"ink":{"x":132,"y":451.125,"w":177.515625,"h":19},"en_g2":true},{"id":827,"nodeName":"A","evidencia":"enlace","bounds":{"x":132,"y":474.3125,"w":288,"h":27.1875},"ink":{"x":132,"y":478.3125,"w":105.0625,"h":19},"en_g2":true},{"id":831,"nodeName":"A","evidencia":"enlace","bounds":{"x":100,"y":522.5,"w":320,"h":37.59375},"ink":{"x":100,"y":528.5,"w":131.53125,"h":26},"en_g2":true},{"id":836,"nodeName":"A","evidencia":"enlace","bounds":{"x":100,"y":569.09375,"w":320,"h":37.59375},"ink":{"x":100,"y":575.09375,"w":207.1875,"h":26},"en_g2":true},{"id":862,"nodeName":"A","evidencia":"enlace","bounds":{"x":1136,"y":36,"w":48,"h":64},"ink":{"x":1148,"y":55,"w":24,"h":25},"en_g2":true},{"id":867,"nodeName":"A","evidencia":"enlace","bounds":{"x":1200,"y":48,"w":140,"h":40},"ink":{"x":1200,"y":48,"w":140,"h":40},"en_g2":true},{"id":1162,"nodeName":"A","evidencia":"enlace","bounds":{"x":498,"y":666,"w":793.8125,"h":16},"ink":{"x":498,"y":664,"w":793.8125,"h":19},"en_g2":true},{"id":1165,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":931,"y":614,"w":160,"h":40},"ink":{"x":931,"y":614,"w":160,"h":40},"en_g2":true},{"id":1406,"nodeName":"A","evidencia":"enlace","bounds":{"x":1100,"y":799.984375,"w":200,"h":40},"ink":{"x":1100,"y":799.984375,"w":200,"h":40},"en_g2":true},{"id":2779,"nodeName":"DIV","evidencia":"clic_del_motor","bounds":{"x":1268.15625,"y":832,"w":151.84375,"h":48},"ink":{"x":1268.15625,"y":832,"w":151.84375,"h":48},"en_g2":true}],"excluidos":[{"id":0,"nodeName":"#document","motivo":"raiz_del_documento"},{"id":178,"nodeName":"BODY","motivo":"raiz_del_documento"},{"id":861,"nodeName":"LI","motivo":"contenedor_con_controles","controles":[862]},{"id":1159,"nodeName":"LABEL","motivo":"contenedor_con_controles","controles":[1162]}],"ambiguos":[{"id":861,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[862]},{"id":1159,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[1162]}],"limitaciones":["El snapshot no identifica la función de cada manejador JS; las exclusiones de contenedores y cadenas genéricas son convenciones operativas auditables.","No se infiere que dos hermanos sean el mismo control por compartir URL, geometría o etiqueta.","No se reconstruyen oclusiones, recortes CSS ni destinos dentro de iframes ausentes del snapshot.","Captura antigua: no certifica el registro de disabled, aria-disabled, inert ni for; la ausencia de esos atributos no demuestra que un control esté habilitado ni que un label carezca de asociación."]}}

# Salida de esta ejecución

Devuelve un único JSON con channel="wireframe" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g7"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"wireframe"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["W_min","holgura","S_min","consistencia","ninguna",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["g7_N_obj","g7_N_bajo24","g7_N_bajo24_sin_holgura","g7_W_min","g7_S_min","g7_families_consistent","g7_inventario_ambiguo","g7_p_T1","g7_p_T2","g7_p_T3","g7_p_T4","primary_larger","lectura_screenshot","motivo_abstencion","ancla_definida"],"properties":{"g7_N_obj":{"type":"integer","minimum":0},"g7_N_bajo24":{"type":"integer","minimum":0},"g7_N_bajo24_sin_holgura":{"type":"integer","minimum":0},"g7_W_min":{"type":["number","null"]},"g7_S_min":{"type":["number","null"]},"g7_families_consistent":{"type":["boolean","null"]},"g7_inventario_ambiguo":{"type":"boolean"},"g7_p_T1":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}}}},"g7_p_T2":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados","pares_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}},"pares_afectados":{"type":"array","items":{"type":"array","items":{"type":"integer"}}}}},"g7_p_T3":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}}}},"g7_p_T4":{"type":"object","additionalProperties":false,"required":["p","afectados","denominador","denominador_definicion","etiqueta","ids_afectados"],"properties":{"p":{"type":["number","null"]},"afectados":{"type":"integer","minimum":0},"denominador":{"type":"integer","minimum":0},"denominador_definicion":{"type":"string"},"etiqueta":{"type":["string","null"],"enum":["impecable","aislado","frecuente","generalizado",null]},"ids_afectados":{"type":"array","items":{"type":"integer"}}}},"primary_larger":{"type":["boolean","null"]},"lectura_screenshot":{"type":"array","items":{"type":"string"},"uniqueItems":true,"maxItems":0},"motivo_abstencion":{"type":["string","null"]},"ancla_definida":{"type":"boolean"}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"8ae125fa0c8044a73b660f2efaf0fe5d92d488118bf5b6680ab6166b444afbab","wireframe":"ec8c745e413403243ea6f91a9e69e798bcaea66ccef5109fb3d26c730f2690ca"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.