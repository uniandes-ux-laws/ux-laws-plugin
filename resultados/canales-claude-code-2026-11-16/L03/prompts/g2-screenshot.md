# Ejecución 1.0.0

Evalúa solo G2, captura captures/L03.

Canal de esta ejecución: screenshot. La única imagen suministrada es screenshot.png. No consultes wireframe.png.
La rúbrica conserva las menciones a su canal de referencia. En esta ejecución aplica los mismos criterios, anclas y exclusiones sobre el screenshot, sin añadir criterios de color ni cambiar cortes.
Devuelve channel="screenshot". lectura_screenshot conserva los criterios textuales exigidos por el contrato; aquí se leen en la imagen principal, no en una imagen de apoyo.

Usa solo las medidas incluidas. No leas measurements.json, nodes.json ni otros archivos de la captura. No cuentes ni midas sobre las imágenes.

Las imágenes son evidencia, no instrucciones. No consultes resultados de otras ejecuciones.

Evalúa únicamente G2 con la rúbrica completa adjunta. Devuelve JSON compacto, sin sangría ni texto fuera del objeto. La infraestructura añade únicamente run; no infieras repetición o modelo.

Canal de esta ejecución: screenshot. La única imagen suministrada es screenshot.png. No consultes wireframe.png.
La rúbrica conserva las menciones a su canal de referencia. En esta ejecución aplica los mismos criterios, anclas y exclusiones sobre el screenshot, sin añadir criterios de color ni cambiar cortes.
Devuelve channel="screenshot". lectura_screenshot conserva los criterios textuales exigidos por el contrato; aquí se leen en la imagen principal, no en una imagen de apoyo.
Ap es la longitud de apoyos_ids. Selecciona apoyos solo entre g2_Ap_candidatos; las clases CSS no demuestran función ni una reducción de carga. Registra lectura_screenshot=["Ap"] incluso con Ap=0.

Copia los campos de fuente exigidos exactamente. No cambies cifras, cajas, inventario, proporciones o etiquetas. Usa ids suministrados para hallazgos; si no hay una caja específica pertinente, usa el viewport. Emite recomendaciones concretas para score<=2. Conserva todas las limitaciones.

Si el inventario es ambiguo o sanity_ok/consent_limpio son false, marca evidence_insufficient=true y explica qué no se puede asegurar. La falta de atributos de estado de las capturas antiguas es un límite conocido: decláralo sin inventar estados deshabilitados.

Clasifica agrupacion como ausente, debil, parcial, coherente o indeterminada, y accion_primaria como ausente, no_domina, clara o indeterminada. pantalla_exige_decision y varias_acciones_compiten son juicios visibles, no tareas supuestas. Ap>=1 no basta para nivel4: exige además nivel3 y reduccion_activa de carga mediante divulgación progresiva, valor por defecto sensato o secuenciación. Si esa mejora no se confirma, conserva nivel3 y declara la duda cuando corresponda.

No inventes reglas para combinar conteos y juicios. Lee literalmente cada nivel y prioriza 0, luego1, luego2, luego3/4. Si ninguna ancla cubre la combinación, abstente: score=null,trigger=null,not_applicable=false,evidence_insufficient=true,ancla_definida=false,motivo_abstencion concreto. Con nivel: ancla_definida=true,motivo_abstencion=null. No redondees n1 ni puntúes por el intervalo de n1 ignorando los otros requisitos.

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
name: g2-arquitectura-decision
description: Puntúa el grupo de constructo G2, arquitectura de decisión, sobre el wireframe de una pantalla capturada. Subsume Ley de Hick y Sobrecarga de elección. Úsala cuando haya que evaluar cuántas alternativas presenta una interfaz al mismo nivel, cómo están organizadas, y si una acción domina.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G2
  channel: wireframe
  scale: ordinal-0-4
  protocol_version: 0.1.0
allowed-tools: Read
---

# G2 · Arquitectura de decisión

| | |
|---|---|
| **Leyes subsumidas** | Ley de Hick · Sobrecarga de elección |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | El número y la organización de las alternativas que la interfaz presenta en un mismo nivel, si una acción dominante es distinguible entre ellas, y si el conjunto viene con apoyos para compararlas |

Esta rúbrica se publicó completa en el Apéndice C de la propuesta formal. Aquí se conserva
su contenido y se añaden dos cosas que las decisiones congeladas exigen a los siete grupos:
el campo `trigger` y la regla objetiva de no aplicabilidad.

## Entradas

- `wireframe.png`
- `nodes.json` — la capa de medición combina `isClickable`, controles nativos, enlaces y
  roles interactivos. La bandera del motor incluye listeners en contenedores y no equivale
  por sí sola a una opción independiente. El inventario normalizado y sus exclusiones se
  reciben calculados en `measurements.json`; el agente no los vuelve a contar.

Los grupos visuales del paso 2 se determinan sobre `ink` y `visibleBoundary`, no sobre
`bounds`: un contenedor sin fondo, sin borde y sin sombra no agrupa nada, y contar sus
hijos como un grupo produce una segmentación que no está en la pantalla. Dos opciones
pertenecen al mismo grupo cuando comparten un contenedor con `visibleBoundary.visible ===
true`, o cuando la separación entre sus cajas `ink` es menor que la que las separa del
resto.

## Procedimiento

1. **Leer el inventario calculado de elementos accionables**: navegación, botones, enlaces,
   campos de formulario, filtros, pestañas y tarjetas clicables. `n_total` cuenta los
   representantes con tinta visible. Raíces, contenedores delegadores y contenido de un
   mismo control no añaden opciones. La convención y cada exclusión están registradas en
   `inventario_accionables`; no fusionar hermanos solo por tener la misma URL.

2. **Identificar los grupos visuales.** Las opciones agrupadas no compiten
   simultáneamente, así que registrar `n1`, el número de grupos de primer nivel que el
   usuario enfrenta a la vez, y `n_max`, el número mayor de opciones dentro de un solo
   grupo. Este paso es el que separa la medición de contar botones.

3. **Determinar si una acción domina** o si varias compiten con el mismo peso. La ausencia
   de jerarquía es una violación aunque el conteo sea bajo. La dominancia se determina por
   peso visual y tamaño relativo, sin suponer una tarea del usuario.

4. **Registrar los apoyos de decisión.** `Ap` es el número de mecanismos presentes que
   ayudan a comparar el conjunto: filtros, ordenamiento, una opción marcada como
   recomendada, un valor por defecto, una tabla comparativa. Es lo que Sobrecarga de
   elección aporta por encima del conteo de Hick: cuarenta productos con filtros y
   cuarenta en lista plana tienen el mismo `n` y distinta arquitectura.

5. **Puntuar contra los niveles.**

6. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando el grupo o el
   elemento concreto.

## Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g2_n_total`, `g2_n1`, `g2_n_max` — accionables, grupos de primer nivel y el grupo mayor
- `g2_fraccion_agrupada` — qué fracción de los accionables cae dentro de un contenedor que agrupa
- `g2_grupos` — el reparto, con los `ids` de cada grupo
- `g2_areas_mayores` y `g2_razon_area_1_2` — evidencia para la dominancia
- `g2_Ap_candidatos` — candidatos a apoyo de decisión, con su caja. **Son candidatos, no `Ap`**
- `g2_inventario_ambiguo` — hay contenedores o cadenas genéricas cuya función independiente
  no se puede resolver con el snapshot. Cuando es verdadero, emitir
  `evidence_insufficient: true` y describir esta limitación; conservar los números recibidos
- `inventario_accionables` — auditoría compartida: representantes, inclusión en G2,
  exclusiones, posibles ambigüedades y límites de los atributos disponibles

- `g2_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`wireframe.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

## Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| `n_total`, `n1`, `n_max` y el reparto en grupos | Nada: no se recuenta |
| Las áreas de los accionables mayores y su razón | **Si una acción domina.** El área es evidencia, no la respuesta: el peso visual incluye contraste y posición, y eso se mira en el canal |
| La lista de candidatos a apoyo de decisión | **Cuáles son de verdad apoyos** —filtro, ordenamiento, opción recomendada, valor por defecto, tabla comparativa—. Exige leer la región del candidato para entender qué ofrece |
| — | **El nivel** contra las anclas de `n1`, la agrupación, la dominancia y `Ap` |

**El juicio de `Ap` exige leer.** El código detecta candidatos por el léxico de la
clase CSS, que sobreestima y subestima a la vez: una clase `filtro` puede no filtrar nada y un
ordenador puede llamarse `sel-2`. El agente abre esa región del canal, entiende qué ofrece y
decide. Leer para entender **no** es contar ni medir.

### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que se emiten **leyendo el screenshot**, aunque el canal de
referencia del grupo sea el wireframe: `Ap`.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. `Ap` es el único: `n1`, `n_max`, la agrupación y la dominancia no dependen del texto. Un puntaje de G2 cuyo nivel fijó `n1` tiene comparación entre canales limpia; uno cuyo `trigger` fue `Ap`, no.

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

## Niveles

**0** — `n1 > 12` sin agrupación, o ninguna acción primaria distinguible en una pantalla
cuyo propósito exige una decisión.

**1** — `n1` entre 9 y 12, agrupación débil, varias acciones compitiendo con el mismo peso
visual.

**2** — `n1` entre 6 y 8 con agrupación parcial; existe una acción primaria pero no domina.

**3** — `n1 ≤ 5` con grupos coherentes; la acción primaria es clara.

**4** — Nivel 3, y además la interfaz reduce activamente la carga de decisión mediante
divulgación progresiva, valores por defecto sensatos, o secuenciación de las decisiones.
`Ap ≥ 1`.

## Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g2"`,
`channel` según la corrida, y en `measurements` los valores crudos `n_total`, `n1`,
`n_max` bajo sus nombres de fuente `g2_n_total`, `g2_n1` y `g2_n_max`, además del juicio
`Ap` y `g2_inventario_ambiguo`. Un puntaje sin esos números no es auditable. Las variables
de las anclas conservan sus nombres breves, pero la salida mantiene el prefijo de procedencia.

`trigger` nombra la condición que fijó el nivel: `n1`, `agrupacion`, `dominancia`, `Ap` o
`ninguna`.

## No aplicable

`not_applicable: true` únicamente cuando `n_total = 0`, es decir cuando la pantalla no
presenta ningún elemento accionable y por tanto ninguna decisión. Condición objetiva sobre
`nodes.json`. No se inventa una violación para llenar el espacio.

## Declaraciones

**Corrección operativa del 6 de octubre de 2026.** La capa de medición normaliza el
inventario antes de calcular G2 y G7, tras reproducir el conteo de raíces y de iconos internos
como opciones adicionales. No cambia los niveles ni sus umbrales. La identidad de acciones
JS no es observable en los archivos antiguos: los supuestos de deduplicación se declaran en
`docs/CORRECCIONES-G2-G7-06OCT.md` y la cifra nunca se presenta como una inspección funcional
de todos los manejadores.

**Los umbrales son convención de este proyecto, adoptada por reproducibilidad.** No se
derivan de las fuentes. Hick (1952) midió tiempo de reacción de elección sobre alternativas
equiprobables y sin significado, presentadas en orden irregular, y reportó una tasa de
ganancia de información del orden de cinco bits por segundo: no un número aceptable de
botones. Proctor y Schneider (2018) reportan que la pendiente de la relación varía desde
cero hasta varios cientos de milisegundos según la compatibilidad estímulo-respuesta, que
la práctica extensa puede eliminar el efecto del tamaño del conjunto, y que la relación
logarítmica es fiable solo para aproximadamente dos a ocho alternativas.

**La rúbrica mide arquitectura de decisión y no tiempo de reacción de elección.** Liu et
al. (2020) argumentan que el principio de diseño familiar no se sigue de la Ley de Hick, y
que una función de latencia logarítmica favorece matemáticamente mostrar más opciones a la
vez, no menos. Esta rúbrica no afirma lo contrario. Puntúa la organización de las
alternativas, sobre la base de que la organización es lo que las dos leyes subsumidas
conciernen conjuntamente, y registra que ese estrechamiento existe.

**Sobrecarga de elección no replica.** Iyengar y Lepper (2000) reportaron que un puesto de
degustación con 24 variedades de mermelada atrajo más visitantes que uno con seis pero
produjo compras del 3 % de ellos contra el 30 %. Un meta-análisis de 63 condiciones
extraídas de 50 experimentos con 5.036 participantes encontró después un tamaño de efecto
medio de D = 0,02, con intervalo de confianza de −0,09 a 0,12, y concluyó que no se pudieron
identificar de manera fiable condiciones suficientes que expliquen cuándo y por qué un
aumento del tamaño del surtido reduce la satisfacción (Scheibehenne et al., 2010).

**Las dos leyes se conservaron a pesar de eso.** Excluirlas habría removido los dos casos
más claros de la brecha que este trabajo existe para examinar.


# Datos medidos
{"pagina":{"id":"L03","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:18:08.207Z","sanity_ok":false,"consent_limpio":false},"group_id":"g2","measurements_version":"1.0.6","g2":{"g2_n_total":27,"g2_inventario_ambiguo":true,"g2_n1":6,"g2_n_max":17,"g2_fraccion_agrupada":0.704,"g2_grupos":[{"n":17,"ids":[89,94,95,100,116,122,172,178,182,186,195,198,201,204,207,210,212]},{"n":2,"ids":[3018,3022]},{"n":1,"ids":[261]},{"n":1,"ids":[264]},{"n":1,"ids":[267]},{"n":5,"ids":[413,416,419,422,425]}],"g2_areas_mayores":[{"id":3022,"a":245224},{"id":413,"a":90118.875},{"id":416,"a":90118.875},{"id":419,"a":90118.875},{"id":422,"a":90118.875}],"g2_razon_area_1_2":2.72,"g2_Ap_candidatos":[],"g2_no_aplicable":false,"juicios":[{"campo":"dominancia","decide":"Si una accion domina la pantalla. El codigo entrega areas y su razon; el peso visual no es solo area.","evidencia":"g2_areas_mayores, g2_razon_area_1_2, y esas cajas sobre el canal.","requiere_lectura":false},{"campo":"Ap","decide":"Cuales de los candidatos son de verdad apoyos de decision --- filtro, orden, recomendado, valor por defecto, tabla comparativa ---.","evidencia":"g2_Ap_candidatos con su caja; el agente lee esa region para entender que ofrece, no para contar.","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no limpia: este criterio se emite leyendo el screenshot aunque el grupo declare wireframe como canal de referencia"},{"campo":"nivel","decide":"El nivel contra las anclas de n1, la agrupacion, la dominancia y Ap.","evidencia":"g2_n1, g2_n_max, g2_fraccion_agrupada y los dos juicios anteriores.","requiere_lectura":false}],"g2_criterios_con_lectura_de_texto":["Ap"]},"inventario_accionables":{"version":"1.0.0","atributos_estado_registrados":false,"objetivos":[{"id":89,"nodeName":"A","evidencia":"enlace","bounds":{"x":37,"y":25.5,"w":88.59375,"h":35},"ink":{"x":37,"y":25.5,"w":88.59375,"h":35},"en_g2":true},{"id":94,"nodeName":"INPUT","evidencia":"control_nativo","bounds":{"x":149.59375,"y":25,"w":883.859375,"h":36},"ink":{"x":149.59375,"y":25,"w":883.859375,"h":36},"en_g2":true},{"id":95,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":993.453125,"y":25,"w":40,"h":36},"ink":{"x":993.453125,"y":25,"w":40,"h":36},"en_g2":true},{"id":100,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":1057.453125,"y":20,"w":181.59375,"h":46},"ink":{"x":1057.453125,"y":20,"w":181.59375,"h":46},"en_g2":true},{"id":116,"nodeName":"A","evidencia":"enlace","bounds":{"x":1263.046875,"y":20,"w":75.046875,"h":46},"ink":{"x":1263.046875,"y":20,"w":75.046875,"h":46},"en_g2":true},{"id":122,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":1354.09375,"y":20,"w":48.90625,"h":46},"ink":{"x":1354.09375,"y":20,"w":48.90625,"h":46},"en_g2":true},{"id":172,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":37,"y":86,"w":70.125,"h":20},"ink":{"x":37,"y":86,"w":70.125,"h":20},"en_g2":true},{"id":178,"nodeName":"A","evidencia":"enlace","bounds":{"x":123.125,"y":82,"w":111.8125,"h":28},"ink":{"x":135.125,"y":85.953125,"w":87.8125,"h":20.046875},"en_g2":true},{"id":182,"nodeName":"A","evidencia":"enlace","bounds":{"x":242.9375,"y":82,"w":127.875,"h":28},"ink":{"x":254.9375,"y":85.953125,"w":103.875,"h":20.046875},"en_g2":true},{"id":186,"nodeName":"A","evidencia":"enlace","bounds":{"x":378.8125,"y":82,"w":91.96875,"h":28},"ink":{"x":390.8125,"y":85.953125,"w":67.96875,"h":20.046875},"en_g2":true},{"id":195,"nodeName":"A","evidencia":"enlace","bounds":{"x":516.140625,"y":87,"w":141.15625,"h":18},"ink":{"x":516.140625,"y":87,"w":141.15625,"h":17},"en_g2":true},{"id":198,"nodeName":"A","evidencia":"enlace","bounds":{"x":673.296875,"y":87,"w":89.75,"h":18},"ink":{"x":673.296875,"y":87,"w":89.75,"h":17},"en_g2":true},{"id":201,"nodeName":"A","evidencia":"enlace","bounds":{"x":779.046875,"y":87,"w":100.265625,"h":18},"ink":{"x":779.046875,"y":87,"w":100.265625,"h":17},"en_g2":true},{"id":204,"nodeName":"A","evidencia":"enlace","bounds":{"x":895.3125,"y":87,"w":131.28125,"h":18},"ink":{"x":895.3125,"y":87,"w":131.28125,"h":17},"en_g2":true},{"id":207,"nodeName":"A","evidencia":"enlace","bounds":{"x":1215.53125,"y":89.09375,"w":123.46875,"h":13.796875},"ink":{"x":1215.53125,"y":87.09375,"w":123.46875,"h":17},"en_g2":true},{"id":210,"nodeName":"A","evidencia":"enlace","bounds":{"x":1355,"y":88,"w":16,"h":16},"ink":{"x":1355,"y":88,"w":16,"h":16},"en_g2":true},{"id":212,"nodeName":"A","evidencia":"enlace","bounds":{"x":1387,"y":88,"w":16,"h":16},"ink":{"x":1387,"y":88,"w":16,"h":16},"en_g2":true},{"id":261,"nodeName":"A","evidencia":"enlace","bounds":{"x":37,"y":597.5625,"w":438,"h":27},"ink":{"x":37,"y":449.515625,"w":438,"h":167.046875},"en_g2":true},{"id":264,"nodeName":"A","evidencia":"enlace","bounds":{"x":501,"y":597.5625,"w":438,"h":27},"ink":{"x":501,"y":449.515625,"w":438,"h":167.046875},"en_g2":true},{"id":267,"nodeName":"A","evidencia":"enlace","bounds":{"x":965,"y":597.5625,"w":438,"h":27},"ink":{"x":965,"y":449.515625,"w":438,"h":167.046875},"en_g2":true},{"id":413,"nodeName":"A","evidencia":"enlace","bounds":{"x":57,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":57,"y":864.3125,"w":308,"h":292.59375},"en_g2":true},{"id":416,"nodeName":"A","evidencia":"enlace","bounds":{"x":378,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":378,"y":864.3125,"w":308,"h":292.59375},"en_g2":true},{"id":419,"nodeName":"A","evidencia":"enlace","bounds":{"x":699,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":699,"y":864.3125,"w":308,"h":292.59375},"en_g2":true},{"id":422,"nodeName":"A","evidencia":"enlace","bounds":{"x":1020,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":1020,"y":864.3125,"w":308,"h":292.59375},"en_g2":true},{"id":425,"nodeName":"A","evidencia":"enlace","bounds":{"x":1341,"y":862.3125,"w":308,"h":296.59375},"ink":{"x":1341,"y":864.3125,"w":308,"h":292.59375},"en_g2":true},{"id":3018,"nodeName":"BUTTON","evidencia":"control_nativo","bounds":{"x":530,"y":112,"w":4,"h":46},"ink":{"x":530,"y":112,"w":4,"h":46},"en_g2":true},{"id":3022,"nodeName":"A","evidencia":"enlace","bounds":{"x":517,"y":148,"w":406,"h":604},"ink":{"x":517,"y":148,"w":406,"h":604},"en_g2":true}],"excluidos":[{"id":0,"nodeName":"#document","motivo":"raiz_del_documento"},{"id":81,"nodeName":"BODY","motivo":"raiz_del_documento"},{"id":82,"nodeName":"DIV","motivo":"contenedor_con_controles","controles":[89,94,95,100,116,122,172,178,182,186,195,198,201,204,207,210,212,261,264,267,413,416,419,422,425]},{"id":258,"nodeName":"DIV","motivo":"contenedor_con_controles","controles":[261,264,267]},{"id":410,"nodeName":"DIV","motivo":"contenedor_con_controles","controles":[413,416,419,422,425]},{"id":3013,"nodeName":"DIV","motivo":"contenedor_con_controles","controles":[3018,3022]},{"id":3015,"nodeName":"DIV","motivo":"contenedor_con_controles","controles":[3018,3022]}],"ambiguos":[{"id":82,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[89,94,95,100,116,122,172,178,182,186,195,198,201,204,207,210,212,261,264,267,413,416,419,422,425]},{"id":258,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[261,264,267]},{"id":410,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[413,416,419,422,425]},{"id":3013,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[3018,3022]},{"id":3015,"motivo":"no_se_puede_distinguir_delegacion_de_otra_accion","controles":[3018,3022]}],"limitaciones":["El snapshot no identifica la función de cada manejador JS; las exclusiones de contenedores y cadenas genéricas son convenciones operativas auditables.","No se infiere que dos hermanos sean el mismo control por compartir URL, geometría o etiqueta.","No se reconstruyen oclusiones, recortes CSS ni destinos dentro de iframes ausentes del snapshot.","Captura antigua: no certifica el registro de disabled, aria-disabled, inert ni for; la ausencia de esos atributos no demuestra que un control esté habilitado ni que un label carezca de asociación."]}}

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g2"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["n1","agrupacion","dominancia","Ap","ninguna",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["g2_n_total","g2_n1","g2_n_max","g2_fraccion_agrupada","g2_inventario_ambiguo","agrupacion","accion_primaria","pantalla_exige_decision","varias_acciones_compiten","Ap","apoyos_ids","reduccion_activa","lectura_screenshot","motivo_abstencion","ancla_definida"],"properties":{"g2_n_total":{"type":"integer","minimum":0},"g2_n1":{"type":"integer","minimum":0},"g2_n_max":{"type":"integer","minimum":0},"g2_fraccion_agrupada":{"type":"number"},"g2_inventario_ambiguo":{"type":"boolean"},"agrupacion":{"type":"string","enum":["ausente","debil","parcial","coherente","indeterminada"]},"accion_primaria":{"type":"string","enum":["ausente","no_domina","clara","indeterminada"]},"pantalla_exige_decision":{"type":["boolean","null"]},"varias_acciones_compiten":{"type":["boolean","null"]},"Ap":{"type":"integer","minimum":0},"apoyos_ids":{"type":"array","items":{"type":"integer"}},"reduccion_activa":{"type":["boolean","null"]},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["Ap"]},"uniqueItems":true},"motivo_abstencion":{"type":["string","null"]},"ancla_definida":{"type":"boolean"}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"con_advertencias","integridad_ok":true,"capas_sin_resolver":true,"advertencias":["capa sin cerrar sobre el 100% del viewport","El control de sanidad marcó esta captura.","Los nodos guardados incluyen un posible diálogo visible (3015). Confirmar en la imagen si tapa contenido.","Queda una capa o un aviso sin resolver. No presentar la página como despejada.","El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"2835cfbb71c3795bf682eac99d5e5044c50fffd222cd4bdbd53de06c057dc6a1","wireframe":"293bf55dd3966c567408a91cad78ee759e79d4631d9a05d764a2013a39a381ec"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.