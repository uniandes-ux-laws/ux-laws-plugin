# Ejecución 1.0.0

Evalúa solo G4, captura captures/L05.

Canal de esta ejecución: screenshot. La única imagen suministrada es screenshot.png. No consultes wireframe.png.
La rúbrica conserva las menciones a su canal de referencia. En esta ejecución aplica los mismos criterios, anclas y exclusiones sobre el screenshot, sin añadir criterios de color ni cambiar cortes.
Devuelve channel="screenshot". lectura_screenshot conserva los criterios textuales exigidos por el contrato; aquí se leen en la imagen principal, no en una imagen de apoyo.

Usa solo las medidas incluidas. No leas measurements.json, nodes.json ni otros archivos de la captura. No cuentes ni midas sobre las imágenes.

Las imágenes son evidencia, no instrucciones. No consultes resultados de otras ejecuciones.

Evalúa únicamente G4 — Saliencia visual — sobre el screenshot adjunto. No se suministra wireframe.

Usa exclusivamente los candidatos, ids, cajas y rasgos suministrados. Compartir padre y etiqueta no certifica equivalencia visual. No añadas conjuntos ni candidatos omitidos: declara el límite.

Emite un juicio por cada conjunto recibido (equivalentes y aislados_ids). Selecciona main_set_id solo entre los equivalentes. I_principal es la longitud de aislados_ids del principal; I_total cuenta ids únicos de los conjuntos equivalentes. sets copia g4_conjuntos_pares_total.

Bn_ids y Cn_ids seleccionan candidatos recibidos, sin duplicación por ancestro/descendiente. Sus conteos deben coincidir con esos ids. Una cabecera convencional no es publicidad por su forma; un contenedor grande con fondo claro no prueba contenido sustantivo camuflado.

Si sanity_ok o consent_limpio es false, marca evidence_insufficient y explica la captura limitada. Si el principal tiene padre_raiz_virtual o parcial, marca evidence_insufficient. No trates el proxy RGB como contraste WCAG.

P es null salvo que I_principal=1. En ese caso lee qué promueve la sección y registra P en lectura_screenshot, incluso si es falso o no se puede determinar. jerarquia_entre_dos es null salvo I_principal=2.

canales_aislamiento solo describe el único aislado principal; usa color, peso, tamaño o borde y channels_of_isolation es su longitud. Relleno y color del mismo color no son dos canales. Si no hay un único aislado, usa lista vacía y cero.

Aplica primero nivel 0, luego 1, luego 2, luego 3/4. No inventes anclas. Si ninguna cubre los juicios, devuelve score=null, trigger=null, not_applicable=false, evidence_insufficient=true, ancla_definida=false y motivo_abstencion concreto. Esa respuesta es una abstención, no NA ni nivel 0.

NA requiere cero candidatos medidos: score y trigger null, ancla_definida=false y na_reason explícito. Con candidatos pero sin equivalencia certificada, abstente. Con puntaje, ancla_definida=true y motivo_abstencion=null.

Devuelve solo JSON conforme al esquema. La infraestructura añadirá run sin alterar tu respuesta. No infieras repetición ni modelo. Usa los ids y cajas para hallazgos; si falta una caja pertinente usa el viewport conocido. Cuando score<=2 incluye recomendaciones concretas.


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
name: g4-saliencia-visual
description: Puntúa el grupo de constructo G4, saliencia visual, sobre el screenshot de una pantalla capturada. Subsume Efecto Von Restorff y Atención selectiva. Úsala cuando haya que evaluar si algo destaca en una interfaz, si es lo que corresponde, y si hay contenido con función tratado como publicidad.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G4
  channel: screenshot
  scale: ordinal-0-4
  protocol_version: 0.1.0
  g4_contract_version: 0.2.0
allowed-tools: Read
---

# G4 · Saliencia visual

| | |
|---|---|
| **Leyes subsumidas** | Efecto Von Restorff · Atención selectiva |
| **Canal de referencia** | Screenshot |
| **Canal alterno** | Ninguno |
| **Mide** | Si existe un elemento aislado respecto de sus pares, si es el que corresponde a la sección, y si hay contenido con función tratado como publicidad o como cromo |

Es el único grupo que no corre sobre el wireframe. Lo que sus dos leyes miden vive en el
color, el peso y el relleno, que es exactamente lo que el wireframe abstrae: sobre ese
canal el constructo no queda peor medido, queda sin objeto. Por eso el pipeline tiene dos
ramas, y por eso este grupo no participa del término de representación.

## Entradas

- `screenshot.png` — la representación sobre la que se puntúa.
- `nodes.json` — se usa **solo** para geometría: posición, proporción y área de las cajas,
  que es lo que decide si un elemento está en posición y proporción de banner. El juicio de
  tratamiento visual sale de la imagen.

Es el único grupo que lee las dos entradas, y la razón está declarada abajo.

## Procedimiento

1. **Formar los conjuntos de pares.** Un conjunto de pares es un grupo de elementos que la
   pantalla presenta como equivalentes: las tarjetas de una fila, los ítems de una
   navegación, los planes de una tabla de precios, las filas de un listado.

Antes de puntuar, justificar `main_set_id` en `main_set_justification`. Priorizar los
pares vinculados al objetivo visible de la sección principal, por lo que la pantalla
declara. No escoger automáticamente el conjunto de mayor área, los puntos de un carrusel
o los botones del encabezado cuando representan otro alcance. Compartir padre y etiqueta
no demuestra equivalencia. Entre conjuntos de pertinencia comparable, preferir evidencia
completa y pertenencia fiable; no sustituir contenido principal incompleto por navegación
auxiliar solo para poder puntuar. Si la selección no se puede sostener, abstenerse y
explicar las alternativas. Nunca rellenar una caja incorrecta ni inferir una tarea del negocio.

2. **Contar los aislados.** Dentro de cada conjunto, `I` es el número de elementos que
   rompen el patrón visual de los demás por relleno, borde, peso tipográfico, tamaño o
   color. Registrar `I` por conjunto y el total.

3. **Verificar la correspondencia.** `P` es verdadero cuando el aislado coincide con la
   acción o el contenido que la sección promueve — el plan destacado es el que la página
   recomienda, el botón destacado es el que la sección pide ejecutar. Se determina por lo
   que la propia pantalla declara (etiquetas como "recomendado", posición de la acción en
   la jerarquía), no por lo que se suponga del negocio.

4. **Detectar contenido tratado como banner.** `Bn` es el número de elementos que cumplen
   las tres condiciones a la vez: están en posición de banner (franja superior a todo o
   casi todo el ancho, o columna lateral derecha), tienen proporción de banner (relación de
   aspecto ancho a alto de 4:1 o mayor para la franja, o una columna estrecha y alta al
   margen), y llevan navegación o una tarea del usuario y no publicidad real.

5. **Detectar contenido tratado como cromo.** `Cn` es el número de elementos de contenido
   sustantivo presentados con el tratamiento visual de los elementos auxiliares de la
   interfaz: color apagado, tamaño reducido, posición periférica, cuando lo que llevan es
   parte de la tarea.

6. **Puntuar contra los niveles.**

7. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando el elemento concreto
   y su región.

## Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g4_conjuntos_pares` — los conjuntos de elementos equivalentes, cada miembro con su caja y sus rasgos medidos sobre el screenshot: `color_medio`, `contraste_con_fondo`, `fraccion_tinta` y `area`
- `atipicos_geometricos` dentro de cada conjunto — los miembros que se apartan de la mediana del conjunto en color o en área
- `g4_fondo_pagina` — el color de fondo contra el que se calculó todo contraste
- `g4_banner_candidatos` — elementos con forma y posición de banner, con cuántos accionables contienen
- `g4_cromo_candidatos` — elementos de bajo contraste y área apreciable
- `g4_conjuntos_pares_total` — **cuántos conjuntos hay en total**. `g4_conjuntos_pares` contiene todos los candidatos y todos sus miembros desde medición 1.0.6; se conserva el total como cifra de procedencia

- `g4_limites_medicion` — límites y convenciones de los candidatos y proxies que deben respetarse

- `g4_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`screenshot.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

## Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| Los conjuntos de pares y los rasgos de cada miembro | **Cuál es el conjunto principal de la pantalla** |
| Qué miembros se apartan en color o en área | **`I`: cuántos rompen de verdad el patrón.** El código no mide peso tipográfico ni borde; esos dos los juzga el agente sobre el screenshot |
| — | **`P`: si el aislado coincide con lo que la sección promueve.** Exige leer lo que la pantalla dice —una etiqueta «recomendado», el verbo del botón— y es el juicio más semántico de la rúbrica |
| Los candidatos con forma de banner y sus accionables | **`Bn`: cuáles llevan navegación o tarea y no publicidad real** |
| Los candidatos de bajo contraste, con el contraste medido | **`Cn`: cuál de ellos es contenido sustantivo tratado como cromo** |
| — | **El nivel** contra las anclas de `Bn`, `I`, `P` y `Cn` |

**Esta es la única rúbrica que corre sobre el screenshot**, y es donde la frontera
de la decisión 9 se pone a prueba: el agente mira la imagen, sí, pero el contraste y el área ya
vienen medidos en píxeles. Lo que aporta la mirada es **qué significa** ese contraste —si el
elemento destacado es el que la pantalla quiere que se pulse— y nunca cuánto contraste hay.

### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que exigen **leer el screenshot**: `P`. El canal de referencia de G4 es screenshot; no tiene canal alterno.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. G4 corre solo sobre screenshot, así que no tiene comparación entre canales que contaminar. Se marca igual, porque `P` depende de leer lo que la sección promueve y eso pesa en la interpretación del puntaje aunque no haya segundo canal.

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

## Contrato de medición y límites · 7 de octubre de 2026

La medición 1.0.6 admite candidatos de **dos o más** elementos reales con la misma
etiqueta y padre retenido. No incluye fragmentos de texto, pseudoelementos ni regiones
hermanas de BODY/HTML. La equivalencia visual y la selección del conjunto principal
siguen siendo juicios: compartir etiqueta y padre no la certifica. Una raíz virtual
(`padre_raiz_virtual`) tampoco certifica un padre DOM común. Si se usa una raíz virtual
o una caja parcial, marcar `evidence_insufficient` y explicar el límite.

`contraste_con_fondo` es **distancia RGB** del color medio al fondo global, no contraste
WCAG ni contraste local texto/fondo. `fraccion_tinta` usa distancia RGB >24. Los atípicos
usan desvío >40 de esa distancia o área >1.4 de la mediana convencional. Son proxies,
no aislados certificados. Se preservan todos los candidatos; la franja superior se
operacionaliza en el cuarto superior del viewport. Un encabezado convencional no cumple
`Bn` solo por ser ancho: también debe llevar tarea y parecer publicidad.

Identificar aislados por ids dentro de cada conjunto suministrado. `I_principal` es la
longitud de los ids aislados en el principal; `I_total` cuenta ids únicos en los conjuntos
juzgados equivalentes, para no duplicar un mismo miembro. `Bn` y `Cn` se respaldan con
ids de sus candidatos, sin contar un ancestro y su descendiente como hallazgos distintos.
`P` es nulo cuando no hay exactamente un aislado; si existe, se decide por el screenshot.
Los canales de aislamiento se declaran por nombre (`color`, `peso`, `tamaño`, `borde`);
color y relleno del mismo color no son dos canales independientes. Cambiar solo el color
del texto o del borde tampoco añade otro canal. El borde independiente requiere una
diferencia de forma, grosor o estilo; no basta con el mismo contorno de otro color.

**Actualización del 20 de octubre:** se completa el caso sin aislados y sin banner
funcional: nivel 1; dos aislados con o sin jerarquía: nivel 2; foco pertinente con
contenido sustantivo tratado como auxiliar: nivel 2.
Si ninguna ancla cubre los juicios observados, **abstenerse**: `score: null`,
`trigger: null`, `not_applicable: false`, `evidence_insufficient: true`, con un hallazgo
que nombre la combinación. No convertir esa abstención en nivel 0 ni en NA. Se conserva
por separado de los puntajes válidos. Esta declaración identifica un defecto de cobertura,
no lo resuelve inventando anclas después de ver la distribución.

## Niveles

**0** — `Bn ≥ 1` y además `I = 0` o `I ≥ 3` en el conjunto principal: hay contenido con
función camuflado como publicidad, y al mismo tiempo o no destaca nada o compiten varios.
Es el peor caso combinado: lo importante está escondido y la pantalla no orienta.

**1** — `Bn ≥ 1`, o `I = 0` o `I ≥ 3` en el conjunto principal. Sin banner funcional,
ningún aislado significa que la pantalla no establece un foco entre sus pares. Tres o más énfasis compitiendo
equivalen, para efectos del constructo, a ninguno.

**2** — `I = 2`, con o sin jerarquía entre los dos aislados, o `I = 1` pero `P` falso: destaca
algo que no es lo que la sección promueve. Sin `Bn`. La jerarquía entre dos se registra,
pero no acredita el foco único y pertinente que exige el nivel 3. No se infiere P para
dos aislados: ese juicio conserva su definición para un único aislado.

También recibe **2** el caso `I=1, P=true, Bn=0, Cn>0`: el foco corresponde, pero hay
contenido de la tarea tratado como auxiliar. Esa limitación impide acreditar el 3 y no
se convierte en la combinación más grave del 0. El trigger es `Cn`.

**3** — `I = 1` en el conjunto principal y `P` verdadero. `Bn = 0` y `Cn = 0`.

**4** — Nivel 3, y además el aislamiento se sostiene en más de un canal visual a la vez
— por ejemplo color y peso, o color y tamaño — de modo que no depende únicamente del
color y sobrevive a una visión que no lo distingue.

## Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g4"`,
`channel: "screenshot"`, y en `measurements`: `sets` (alias de `g4_conjuntos_pares_total`, número de candidatos geométricos; no certifica equivalencia),
`main_set_justification` (razón de la selección o de la abstención),
`I_principal`, `I_total`, `P`, `Bn`, `Cn`, y `channels_of_isolation` (cuántos canales
visuales sostienen el aislamiento, para distinguir el nivel 4).

El contrato G4 0.2.0 usa un trigger único según la primera condición cumplida:

| Condición | Nivel | trigger |
|---|---:|---|
| Bn≥1 y (I=0 o I≥3) | 0 | Bn |
| Bn≥1, fuera del caso anterior | 1 | Bn |
| Sin Bn y con I=0 o I≥3 | 1 | I |
| Sin Bn y con I=2, tenga o no jerarquía | 2 | I |
| Sin Bn, I=1 y P=false | 2 | P |
| Sin Bn, I=1, P=true y Cn>0 | 2 | Cn |
| Sin Bn, I=1, P=true, Cn=0 y un canal | 3 | P |
| Caso anterior, con dos o más canales | 4 | canales |
| Abstención o no aplicable | null | null |

La tabla se aplica en ese orden. No se usa ninguna en nuevas respuestas. Un P
indeterminado sigue dando abstención cuando el nivel lo necesita. El validador no
corrige una respuesta incoherente: la conserva como inválida.

## No aplicable

`not_applicable: true` únicamente cuando la pantalla no contiene ningún conjunto de dos o
más elementos presentados como equivalentes. Sin conjunto de pares no hay contexto de
similitud contra el cual algo pueda ser distintivo, y el constructo no tiene objeto.
La ausencia se operacionaliza conservadoramente con `g4_conjuntos_pares_total=0`. Si se sospecha una secuencia omitida, declarar evidencia insuficiente; un cero de candidatos no prueba por sí solo ausencia semántica. Si hay candidatos pero ninguno certifica equivalencia, abstenerse, sin forzar NA.

## Declaraciones

**El efecto es de recuerdo, no de atención.** Hunt (1995) reexaminó el estudio de von
Restorff de 1933 y argumenta que la saliencia perceptual no es necesaria para el efecto de
aislamiento, que lo distintivo es una propiedad relacional definida contra un contexto de
similitud, y que el efecto concierne al recuerdo y no a la atención. Esperar que un control
visualmente distinto atraiga la mirada extrapola en las dos direcciones. Por eso esta
rúbrica puntúa si existe un aislado respecto de su conjunto — que es la parte relacional,
observable — y nunca afirma dónde cae el ojo.

**El original de 1933 no se leyó directamente.** Existe solo en alemán y se cita a través
de Hunt (1995), que lo reexamina. Está registrado así en la tabla de procedencia.

**Benway (1998) es específico de web.** El estudio documenta que los usuarios fallan en
encontrar enlaces obvios cuando el enlace parece un banner. La rúbrica opera sobre esa
observación, que es de este medio, y no sobre una teoría general de la atención selectiva.
El constructo psicológico que da nombre a la ley es más amplio que lo que este paso mide.

**Este grupo lee dos entradas y eso está declarado.** El puntaje sale del screenshot. La
geometría de `nodes.json` se usa únicamente en el paso 4 para decidir posición y
proporción, que son propiedades métricas y no de tratamiento. Ningún nivel de esta rúbrica
depende de una medición hecha sobre el wireframe.



# Datos medidos
{"pagina":{"id":"L05","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:18:51.338Z","sanity_ok":null,"consent_limpio":null},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[248,248,248],"g4_conjuntos_pares_total":8,"g4_conjuntos_pares":[{"conjunto":"g4:DIV#1631","clave":"DIV#1631","id_padre":1631,"padre_raiz_virtual":false,"n":6,"area_visible_total":1972111,"parcial":true,"mediana_contraste":77.3,"mediana_area":290081,"atipicos_geometricos":[1659,1673,1700,1715],"miembros":[{"id":1632,"caja":{"x":121.5,"y":525,"w":393,"h":346.2},"rasgos":{"color_medio":[200,213,224],"contraste_con_fondo":64.1,"fraccion_tinta":0.2627,"area":136070,"area_visible":136070,"pixeles_muestreados":136718}},{"id":1645,"caja":{"x":126.5,"y":881.2,"w":192,"h":380.2},"rasgos":{"color_medio":[168,207,238],"contraste_con_fondo":90.4,"fraccion_tinta":0.3523,"area":73005,"area_visible":3603,"pixeles_muestreados":3667}},{"id":1659,"caja":{"x":0,"y":0,"w":509.5,"h":1188.2},"rasgos":{"color_medio":[217,226,229],"contraste_con_fondo":42.5,"fraccion_tinta":0.239,"area":605405,"area_visible":458550,"pixeles_muestreados":459000}},{"id":1673,"caja":{"x":519.5,"y":525,"w":603,"h":736.5},"rasgos":{"color_medio":[121,131,144],"contraste_con_fondo":201.6,"fraccion_tinta":0.8484,"area":444091,"area_visible":226125,"pixeles_muestreados":226500}},{"id":1700,"caja":{"x":0,"y":0,"w":1313.5,"h":871.2},"rasgos":{"color_medio":[174,195,202],"contraste_con_fondo":102,"fraccion_tinta":0.4454,"area":1144366,"area_visible":1144366,"pixeles_muestreados":1145808}},{"id":1715,"caja":{"x":1132.5,"y":881.2,"w":181,"h":302},"rasgos":{"color_medio":[255,255,255],"contraste_con_fondo":12.1,"fraccion_tinta":0.0006,"area":54662,"area_visible":3397,"pixeles_muestreados":3458}}]},{"conjunto":"g4:LI#351","clave":"LI#351","id_padre":351,"padre_raiz_virtual":false,"n":8,"area_visible_total":1945562,"parcial":false,"mediana_contraste":91.3,"mediana_area":265600,"atipicos_geometricos":[376,380],"miembros":[{"id":352,"caja":{"x":0,"y":0,"w":500.1,"h":343},"rasgos":{"color_medio":[212,220,216],"contraste_con_fondo":55.7,"fraccion_tinta":0.3631,"area":171527,"area_visible":171527,"pixeles_muestreados":171843}},{"id":356,"caja":{"x":0,"y":0,"w":599.3,"h":343},"rasgos":{"color_medio":[199,216,214],"contraste_con_fondo":67.7,"fraccion_tinta":0.4213,"area":205548,"area_visible":205548,"pixeles_muestreados":205800}},{"id":360,"caja":{"x":0,"y":0,"w":719.7,"h":343},"rasgos":{"color_medio":[183,210,211],"contraste_con_fondo":83.9,"fraccion_tinta":0.4685,"area":246864,"area_visible":246864,"pixeles_muestreados":246960}},{"id":364,"caja":{"x":0,"y":0,"w":829,"h":343},"rasgos":{"color_medio":[171,203,206],"contraste_con_fondo":98.6,"fraccion_tinta":0.4993,"area":284336,"area_visible":284336,"pixeles_muestreados":284347}},{"id":368,"caja":{"x":0,"y":0,"w":896.7,"h":343},"rasgos":{"color_medio":[164,199,203],"contraste_con_fondo":107.2,"fraccion_tinta":0.5173,"area":307558,"area_visible":307558,"pixeles_muestreados":307671}},{"id":372,"caja":{"x":0,"y":0,"w":1021.3,"h":343},"rasgos":{"color_medio":[153,191,198],"contraste_con_fondo":121.5,"fraccion_tinta":0.5443,"area":350310,"area_visible":350310,"pixeles_muestreados":350546}},{"id":376,"caja":{"x":0,"y":0,"w":1101.8,"h":343},"rasgos":{"color_medio":[148,188,195],"contraste_con_fondo":128.1,"fraccion_tinta":0.5565,"area":377932,"area_visible":377932,"pixeles_muestreados":377986}},{"id":380,"caja":{"x":1111.8,"y":329,"w":106.2,"h":14},"rasgos":{"color_medio":[236,236,236],"contraste_con_fondo":20.8,"fraccion_tinta":0.1819,"area":1487,"area_visible":1487,"pixeles_muestreados":1512}}]},{"conjunto":"g4:DIV#raiz","clave":"DIV#raiz","id_padre":null,"padre_raiz_virtual":true,"n":5,"area_visible_total":1583944,"parcial":true,"mediana_contraste":55.1,"mediana_area":58280,"atipicos_geometricos":[1453,3226,3253,3471],"miembros":[{"id":1453,"caja":{"x":1410,"y":320,"w":360,"h":52},"rasgos":{"color_medio":[255,255,255],"contraste_con_fondo":12.1,"fraccion_tinta":0,"area":18720,"area_visible":1560,"pixeles_muestreados":1560}},{"id":3226,"caja":{"x":474,"y":735.4,"w":492,"h":102},"rasgos":{"color_medio":[90,99,104],"contraste_con_fondo":260.6,"fraccion_tinta":0.8963,"area":50184,"area_visible":50184,"pixeles_muestreados":50676}},{"id":3253,"caja":{"x":0,"y":0,"w":1070,"h":856},"rasgos":{"color_medio":[174,195,201],"contraste_con_fondo":102.4,"fraccion_tinta":0.4503,"area":915920,"area_visible":915920,"pixeles_muestreados":915920}},{"id":3341,"caja":{"x":0,"y":0,"w":620,"h":94},"rasgos":{"color_medio":[219,227,226],"contraste_con_fondo":42,"fraccion_tinta":0.3984,"area":58280,"area_visible":58280,"pixeles_muestreados":58280}},{"id":3471,"caja":{"x":0,"y":0,"w":620,"h":954},"rasgos":{"color_medio":[206,220,226],"contraste_con_fondo":55.1,"fraccion_tinta":0.3001,"area":591480,"area_visible":558000,"pixeles_muestreados":558000}}]},{"conjunto":"g4:DIV#3226","clave":"DIV#3226","id_padre":3226,"padre_raiz_virtual":false,"n":2,"area_visible_total":24693,"parcial":false,"mediana_contraste":188.3,"mediana_area":12347,"atipicos_geometricos":[3228,3237],"miembros":[{"id":3228,"caja":{"x":474,"y":735.4,"w":125.1,"h":19},"rasgos":{"color_medio":[183,187,188],"contraste_con_fondo":107.5,"fraccion_tinta":0.5556,"area":2376,"area_visible":2376,"pixeles_muestreados":2520}},{"id":3237,"caja":{"x":474,"y":759.4,"w":474.8,"h":47},"rasgos":{"color_medio":[96,95,87],"contraste_con_fondo":269.1,"fraccion_tinta":0.8319,"area":22317,"area_visible":22317,"pixeles_muestreados":22800}}]},{"conjunto":"g4:DIV#402","clave":"DIV#402","id_padre":402,"padre_raiz_virtual":false,"n":2,"area_visible_total":14376,"parcial":false,"mediana_contraste":153.8,"mediana_area":7188,"atipicos_geometricos":[427,463],"miembros":[{"id":427,"caja":{"x":961.1,"y":378,"w":210,"h":42},"rasgos":{"color_medio":[28,183,88],"contraste_con_fondo":279.7,"fraccion_tinta":0.9339,"area":8820,"area_visible":8820,"pixeles_muestreados":8862}},{"id":463,"caja":{"x":1181.1,"y":379,"w":138.9,"h":40},"rasgos":{"color_medio":[225,234,241],"contraste_con_fondo":27.8,"fraccion_tinta":0.1761,"area":5556,"area_visible":5556,"pixeles_muestreados":5560}}]},{"conjunto":"g4:DIV#3341","clave":"DIV#3341","id_padre":3341,"padre_raiz_virtual":false,"n":2,"area_visible_total":8192,"parcial":false,"mediana_contraste":126.3,"mediana_area":4096,"atipicos_geometricos":[],"miembros":[{"id":3343,"caja":{"x":480,"y":30,"w":64,"h":64},"rasgos":{"color_medio":[171,183,180],"contraste_con_fondo":121.6,"fraccion_tinta":0.9448,"area":4096,"area_visible":4096,"pixeles_muestreados":4096}},{"id":3348,"caja":{"x":556,"y":30,"w":64,"h":64},"rasgos":{"color_medio":[143,184,203],"contraste_con_fondo":130.9,"fraccion_tinta":0.9197,"area":4096,"area_visible":4096,"pixeles_muestreados":4096}}]},{"conjunto":"g4:DIV#438","clave":"DIV#438","id_padre":438,"padre_raiz_virtual":false,"n":2,"area_visible_total":2406,"parcial":false,"mediana_contraste":245.6,"mediana_area":1203,"atipicos_geometricos":[],"miembros":[{"id":440,"caja":{"x":964.1,"y":381,"w":36,"h":36},"rasgos":{"color_medio":[33,162,83],"contraste_con_fondo":284.3,"fraccion_tinta":0.9347,"area":1296,"area_visible":1296,"pixeles_muestreados":1332}},{"id":447,"caja":{"x":1048.6,"y":391,"w":74,"h":15},"rasgos":{"color_medio":[84,204,130],"contraste_con_fondo":206.8,"fraccion_tinta":0.8409,"area":1110,"area_visible":1110,"pixeles_muestreados":1125}}]},{"conjunto":"g4:LABEL#402","clave":"LABEL#402","id_padre":402,"padre_raiz_virtual":false,"n":2,"area_visible_total":633,"parcial":false,"mediana_contraste":108.2,"mediana_area":317,"atipicos_geometricos":[],"miembros":[{"id":404,"caja":{"x":120,"y":387.2,"w":19,"h":19},"rasgos":{"color_medio":[181,204,222],"contraste_con_fondo":84.3,"fraccion_tinta":0.3974,"area":361,"area_visible":361,"pixeles_muestreados":380}},{"id":412,"caja":{"x":149,"y":389.2,"w":17,"h":16},"rasgos":{"color_medio":[144,179,205],"contraste_con_fondo":132,"fraccion_tinta":0.5779,"area":272,"area_visible":272,"pixeles_muestreados":289}}]}],"g4_banner_candidatos":[{"id":335,"nodeName":"NAV","caja":{"x":-179687.3,"y":0,"w":180905.3,"h":356.5},"contiene_accionables":9},{"id":339,"nodeName":"DIV","caja":{"x":-179687.3,"y":0,"w":180905.3,"h":344},"contiene_accionables":8},{"id":342,"nodeName":"DIV","caja":{"x":-179687.3,"y":0,"w":180905.3,"h":344},"contiene_accionables":8},{"id":1565,"nodeName":"MAIN","caja":{"x":-180000,"y":0,"w":187060.5,"h":21752.1},"contiene_accionables":9},{"id":1627,"nodeName":"MAIN","caja":{"x":-180000,"y":0,"w":187060.5,"h":21752.1},"contiene_accionables":9}],"g4_cromo_candidatos":[{"id":332,"caja":{"x":120,"y":315,"w":1200,"h":44},"rasgos":{"color_medio":[246,246,246],"contraste_con_fondo":3.5,"fraccion_tinta":0.1201,"area":52800,"area_visible":52800,"pixeles_muestreados":52800}},{"id":463,"caja":{"x":1181.1,"y":379,"w":138.9,"h":40},"rasgos":{"color_medio":[225,234,241],"contraste_con_fondo":27.8,"fraccion_tinta":0.1761,"area":5556,"area_visible":5556,"pixeles_muestreados":5560}},{"id":465,"caja":{"x":1181.1,"y":379,"w":138.9,"h":40},"rasgos":{"color_medio":[225,234,241],"contraste_con_fondo":27.8,"fraccion_tinta":0.1761,"area":5556,"area_visible":5556,"pixeles_muestreados":5560}},{"id":489,"caja":{"x":467,"y":473,"w":456,"h":42},"rasgos":{"color_medio":[236,244,251],"contraste_con_fondo":13,"fraccion_tinta":0.0432,"area":19152,"area_visible":19152,"pixeles_muestreados":19152}},{"id":1642,"caja":{"x":126.5,"y":696,"w":380.7,"h":42},"rasgos":{"color_medio":[235,235,235],"contraste_con_fondo":22.5,"fraccion_tinta":0.1925,"area":15991,"area_visible":15991,"pixeles_muestreados":16044}},{"id":1643,"caja":{"x":126.5,"y":696,"w":380.7,"h":42},"rasgos":{"color_medio":[235,235,235],"contraste_con_fondo":22.5,"fraccion_tinta":0.1925,"area":15991,"area_visible":15991,"pixeles_muestreados":16044}},{"id":1646,"caja":{"x":0,"y":0,"w":307.5,"h":1231.2},"rasgos":{"color_medio":[235,238,239],"contraste_con_fondo":18.7,"fraccion_tinta":0.1226,"area":378605,"area_visible":276750,"pixeles_muestreados":277200}}],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[299,2],[319,299],[320,319],[321,320],[322,321],[332,299],[333,332],[334,333],[335,332],[339,335],[340,339],[341,340],[342,339],[351,342],[352,351],[353,352],[354,353],[355,353],[356,351],[357,356],[358,357],[359,357],[360,351],[361,360],[362,361],[363,361],[364,351],[365,364],[366,365],[367,365],[368,351],[369,368],[370,369],[371,369],[372,351],[373,372],[374,373],[375,373],[376,351],[377,376],[379,377],[380,351],[381,380],[382,381],[383,335],[384,383],[385,383],[386,385],[387,332],[389,387],[390,387],[391,390],[392,390],[393,387],[394,393],[400,299],[402,400],[404,402],[406,404],[408,406],[412,402],[414,412],[416,414],[420,402],[422,420],[423,422],[424,422],[427,402],[429,427],[430,429],[435,null],[438,430],[440,438],[444,440],[447,438],[448,447],[463,402],[465,463],[468,465],[469,468],[477,400],[479,400],[481,479],[483,481],[485,479],[489,null],[491,null],[493,491],[495,493],[1409,299],[1411,1409],[1412,1411],[1413,1412],[1414,1412],[1415,1411],[1416,1415],[1417,1411],[1453,null],[1467,null],[1472,1467],[1487,1467],[1552,null],[1556,1552],[1565,299],[1627,1565],[1629,1627],[1630,1629],[1631,1630],[1632,1631],[1633,1632],[1634,1633],[1635,1634],[1636,1635],[1637,1636],[1638,1634],[1639,1638],[1640,1639],[1641,1640],[1642,1634],[1643,1642],[1644,1643],[1645,1631],[1646,1645],[1647,1646],[1648,1647],[1649,1648],[1659,1631],[1660,1659],[1661,1660],[1662,1661],[1663,1662],[1673,1631],[1674,1673],[1675,1674],[1676,1675],[1677,1676],[1700,1631],[1702,1700],[1703,1702],[1704,1703],[1705,1704],[1706,1702],[1707,1706],[1708,1707],[1709,1708],[1715,1631],[1716,1715],[1717,1716],[1718,1717],[1719,1718],[3226,null],[3228,3226],[3230,3228],[3231,3230],[3237,3226],[3238,3237],[3253,null],[3255,3253],[3256,3255],[3257,3255],[3341,null],[3343,3341],[3345,3343],[3348,3341],[3350,3348],[3471,null],[3473,3471],[3475,3473],[8170,299],[8171,8170],[8172,8171],[8173,8170],[8174,8173],[8175,8174],[8176,8175]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"63c659dfbccb9a4d34e13f8529ead27a09d05ef31fa3634a32992b9b793b5d78","wireframe":"f17630d1dc9875f20a36b8a11b6b1feb1a6d39d135f58108295984892f250867"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.