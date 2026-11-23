# Ejecución 1.0.0

Evalúa solo G4, captura captures/H04.

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
{"pagina":{"id":"H04","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:16:13.213Z","sanity_ok":null,"consent_limpio":null},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[248,248,248],"g4_conjuntos_pares_total":21,"g4_conjuntos_pares":[{"conjunto":"g4:SECTION#450","clave":"SECTION#450","id_padre":450,"padre_raiz_virtual":false,"n":3,"area_visible_total":756943,"parcial":true,"mediana_contraste":15.8,"mediana_area":474540,"atipicos_geometricos":[454,549],"miembros":[{"id":454,"caja":{"x":-1,"y":323.4,"w":1446.6,"h":328},"rasgos":{"color_medio":[87,137,122],"contraste_con_fondo":232.6,"fraccion_tinta":0.9468,"area":474540,"area_visible":472388,"pixeles_muestreados":473760}},{"id":527,"caja":{"x":31.5,"y":675.4,"w":1377.1,"h":68},"rasgos":{"color_medio":[235,239,249],"contraste_con_fondo":15.8,"fraccion_tinta":0.1424,"area":93642,"area_visible":93642,"pixeles_muestreados":95082}},{"id":549,"caja":{"x":0,"y":767.4,"w":1440,"h":570.8},"rasgos":{"color_medio":[244,244,244],"contraste_con_fondo":6.9,"fraccion_tinta":0.0131,"area":821948,"area_visible":190913,"pixeles_muestreados":191520}}]},{"conjunto":"g4:DIV#457","clave":"DIV#457","id_padre":457,"padre_raiz_virtual":false,"n":3,"area_visible_total":469499,"parcial":false,"mediana_contraste":234.3,"mediana_area":1527,"atipicos_geometricos":[458,520],"miembros":[{"id":458,"caja":{"x":0,"y":327.4,"w":1440,"h":324},"rasgos":{"color_medio":[86,136,121],"contraste_con_fondo":234.3,"fraccion_tinta":0.9465,"area":466628,"area_visible":466628,"pixeles_muestreados":468000}},{"id":512,"caja":{"x":100.8,"y":606.9,"w":74.5,"h":20.5},"rasgos":{"color_medio":[58,168,136],"contraste_con_fondo":234.6,"fraccion_tinta":0.8565,"area":1527,"area_visible":1527,"pixeles_muestreados":1672}},{"id":520,"caja":{"x":664,"y":611.4,"w":112,"h":12},"rasgos":{"color_medio":[219,224,230],"contraste_con_fondo":41.7,"fraccion_tinta":0.851,"area":1344,"area_visible":1344,"pixeles_muestreados":1456}}]},{"conjunto":"g4:DIV#83","clave":"DIV#83","id_padre":83,"padre_raiz_virtual":false,"n":2,"area_visible_total":194017,"parcial":false,"mediana_contraste":23.7,"mediana_area":97009,"atipicos_geometricos":[],"miembros":[{"id":95,"caja":{"x":85,"y":82,"w":1269,"h":71.2},"rasgos":{"color_medio":[248,250,250],"contraste_con_fondo":2.8,"fraccion_tinta":0.0525,"area":90337,"area_visible":90337,"pixeles_muestreados":91368}},{"id":110,"caja":{"x":0,"y":185.4,"w":1440,"h":72},"rasgos":{"color_medio":[217,223,228],"contraste_con_fondo":44.6,"fraccion_tinta":0.1444,"area":103680,"area_visible":103680,"pixeles_muestreados":105120}}]},{"conjunto":"g4:LI#124","clave":"LI#124","id_padre":124,"padre_raiz_virtual":false,"n":9,"area_visible_total":72726,"parcial":false,"mediana_contraste":26.6,"mediana_area":8529,"atipicos_geometricos":[125],"miembros":[{"id":125,"caja":{"x":193,"y":185.4,"w":69.2,"h":69},"rasgos":{"color_medio":[12,81,138],"contraste_con_fondo":309.3,"fraccion_tinta":0.9702,"area":4772,"area_visible":4772,"pixeles_muestreados":4900}},{"id":129,"caja":{"x":262.2,"y":185.4,"w":128.2,"h":69},"rasgos":{"color_medio":[233,234,235],"contraste_con_fondo":24.3,"fraccion_tinta":0.0744,"area":8848,"area_visible":8848,"pixeles_muestreados":9030}},{"id":136,"caja":{"x":390.4,"y":185.4,"w":167.3,"h":69},"rasgos":{"color_medio":[231,232,233],"contraste_con_fondo":27.7,"fraccion_tinta":0.0957,"area":11547,"area_visible":11547,"pixeles_muestreados":11760}},{"id":168,"caja":{"x":557.7,"y":185.4,"w":102.4,"h":69},"rasgos":{"color_medio":[233,234,235],"contraste_con_fondo":24.3,"fraccion_tinta":0.0707,"area":7068,"area_visible":7068,"pixeles_muestreados":7280}},{"id":197,"caja":{"x":660.2,"y":185.4,"w":68.7,"h":69},"rasgos":{"color_medio":[234,235,236],"contraste_con_fondo":22.6,"fraccion_tinta":0.0582,"area":4738,"area_visible":4738,"pixeles_muestreados":4830}},{"id":269,"caja":{"x":728.8,"y":185.4,"w":133.7,"h":69},"rasgos":{"color_medio":[232,233,233],"contraste_con_fondo":26.6,"fraccion_tinta":0.0891,"area":9222,"area_visible":9222,"pixeles_muestreados":9450}},{"id":336,"caja":{"x":862.5,"y":185.4,"w":159.1,"h":69},"rasgos":{"color_medio":[231,232,233],"contraste_con_fondo":27.7,"fraccion_tinta":0.0964,"area":10979,"area_visible":10979,"pixeles_muestreados":11200}},{"id":359,"caja":{"x":1021.6,"y":185.4,"w":123.6,"h":69},"rasgos":{"color_medio":[231,232,233],"contraste_con_fondo":27.7,"fraccion_tinta":0.0915,"area":8529,"area_visible":8529,"pixeles_muestreados":8750}},{"id":430,"caja":{"x":1145.2,"y":185.4,"w":101.8,"h":69},"rasgos":{"color_medio":[233,234,235],"contraste_con_fondo":24.3,"fraccion_tinta":0.0689,"area":7023,"area_visible":7023,"pixeles_muestreados":7140}}]},{"conjunto":"g4:A#527","clave":"A#527","id_padre":527,"padre_raiz_virtual":false,"n":3,"area_visible_total":58393,"parcial":false,"mediana_contraste":30.9,"mediana_area":20170,"atipicos_geometricos":[],"miembros":[{"id":528,"caja":{"x":31.5,"y":675.4,"w":771.5,"h":28},"rasgos":{"color_medio":[224,231,246],"contraste_con_fondo":29.5,"fraccion_tinta":0.2236,"area":21603,"area_visible":21603,"pixeles_muestreados":22388}},{"id":535,"caja":{"x":815,"y":675.4,"w":593.6,"h":28},"rasgos":{"color_medio":[223,230,246],"contraste_con_fondo":30.9,"fraccion_tinta":0.2246,"area":16620,"area_visible":16620,"pixeles_muestreados":17255}},{"id":542,"caja":{"x":359.8,"y":715.4,"w":720.4,"h":28},"rasgos":{"color_medio":[223,230,246],"contraste_con_fondo":30.9,"fraccion_tinta":0.2223,"area":20170,"area_visible":20170,"pixeles_muestreados":20938}}]},{"conjunto":"g4:BUTTON#457","clave":"BUTTON#457","id_padre":457,"padre_raiz_virtual":false,"n":2,"area_visible_total":28006,"parcial":false,"mediana_contraste":239.3,"mediana_area":14003,"atipicos_geometricos":[],"miembros":[{"id":502,"caja":{"x":1224,"y":457,"w":216,"h":64.8},"rasgos":{"color_medio":[132,130,127],"contraste_con_fondo":205,"fraccion_tinta":0.9864,"area":14003,"area_visible":14003,"pixeles_muestreados":14256}},{"id":507,"caja":{"x":0,"y":457,"w":216,"h":64.8},"rasgos":{"color_medio":[27,154,117],"contraste_con_fondo":273.6,"fraccion_tinta":0.9385,"area":14003,"area_visible":14003,"pixeles_muestreados":14256}}]},{"conjunto":"g4:DIV#554","clave":"DIV#554","id_padre":554,"padre_raiz_virtual":false,"n":4,"area_visible_total":16784,"parcial":true,"mediana_contraste":8.7,"mediana_area":98729,"atipicos_geometricos":[],"miembros":[{"id":555,"caja":{"x":100,"y":885,"w":280,"h":340},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":95200,"area_visible":4196,"pixeles_muestreados":4200}},{"id":564,"caja":{"x":420,"y":885,"w":280,"h":389.2},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":108977,"area_visible":4196,"pixeles_muestreados":4200}},{"id":573,"caja":{"x":740,"y":885,"w":280,"h":365.2},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":102257,"area_visible":4196,"pixeles_muestreados":4200}},{"id":582,"caja":{"x":1060,"y":885,"w":280,"h":340},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":95200,"area_visible":4196,"pixeles_muestreados":4200}}]},{"conjunto":"g4:SPAN#529","clave":"SPAN#529","id_padre":529,"padre_raiz_virtual":false,"n":2,"area_visible_total":16146,"parcial":false,"mediana_contraste":39.9,"mediana_area":8073,"atipicos_geometricos":[533],"miembros":[{"id":530,"caja":{"x":31.5,"y":675.4,"w":28,"h":28},"rasgos":{"color_medio":[219,227,245],"contraste_con_fondo":35.9,"fraccion_tinta":0.2747,"area":784,"area_visible":784,"pixeles_muestreados":841}},{"id":533,"caja":{"x":71.5,"y":678.4,"w":731.5,"h":21},"rasgos":{"color_medio":[213,222,243],"contraste_con_fondo":43.9,"fraccion_tinta":0.2966,"area":15362,"area_visible":15362,"pixeles_muestreados":16104}}]},{"conjunto":"g4:SPAN#543","clave":"SPAN#543","id_padre":543,"padre_raiz_virtual":false,"n":2,"area_visible_total":15072,"parcial":false,"mediana_contraste":46.9,"mediana_area":7536,"atipicos_geometricos":[547],"miembros":[{"id":544,"caja":{"x":359.8,"y":715.4,"w":28,"h":28},"rasgos":{"color_medio":[207,218,242],"contraste_con_fondo":51.2,"fraccion_tinta":0.3496,"area":784,"area_visible":784,"pixeles_muestreados":841}},{"id":547,"caja":{"x":399.8,"y":718.4,"w":680.4,"h":21},"rasgos":{"color_medio":[214,223,243],"contraste_con_fondo":42.5,"fraccion_tinta":0.2906,"area":14288,"area_visible":14288,"pixeles_muestreados":15004}}]},{"conjunto":"g4:SPAN#536","clave":"SPAN#536","id_padre":536,"padre_raiz_virtual":false,"n":2,"area_visible_total":12409,"parcial":false,"mediana_contraste":51.2,"mediana_area":6205,"atipicos_geometricos":[540],"miembros":[{"id":537,"caja":{"x":815,"y":675.4,"w":28,"h":28},"rasgos":{"color_medio":[200,213,240],"contraste_con_fondo":59.9,"fraccion_tinta":0.3781,"area":784,"area_visible":784,"pixeles_muestreados":841}},{"id":540,"caja":{"x":855,"y":678.4,"w":553.6,"h":21},"rasgos":{"color_medio":[214,223,243],"contraste_con_fondo":42.5,"fraccion_tinta":0.2913,"area":11625,"area_visible":11625,"pixeles_muestreados":12210}}]},{"conjunto":"g4:BUTTON#70","clave":"BUTTON#70","id_padre":70,"padre_raiz_virtual":false,"n":3,"area_visible_total":5760,"parcial":false,"mediana_contraste":242.4,"mediana_area":1920,"atipicos_geometricos":[],"miembros":[{"id":71,"caja":{"x":1392,"y":327,"w":48,"h":40},"rasgos":{"color_medio":[56,112,159],"contraste_con_fondo":251.6,"fraccion_tinta":0.8073,"area":1920,"area_visible":1920,"pixeles_muestreados":1920}},{"id":75,"caja":{"x":1392,"y":367,"w":48,"h":40},"rasgos":{"color_medio":[64,118,163],"contraste_con_fondo":240.8,"fraccion_tinta":0.7708,"area":1920,"area_visible":1920,"pixeles_muestreados":1920}},{"id":79,"caja":{"x":1392,"y":407,"w":48,"h":40},"rasgos":{"color_medio":[63,117,162],"contraste_con_fondo":242.4,"fraccion_tinta":0.7771,"area":1920,"area_visible":1920,"pixeles_muestreados":1920}}]},{"conjunto":"g4:SPAN#507","clave":"SPAN#507","id_padre":507,"padre_raiz_virtual":false,"n":2,"area_visible_total":3288,"parcial":false,"mediana_contraste":225.9,"mediana_area":1644,"atipicos_geometricos":[510],"miembros":[{"id":508,"caja":{"x":97.5,"y":467.9,"w":21,"h":42},"rasgos":{"color_medio":[67,172,142],"contraste_con_fondo":223.1,"fraccion_tinta":0.7949,"area":882,"area_visible":882,"pixeles_muestreados":946}},{"id":510,"caja":{"x":107.5,"y":489.9,"w":114.6,"h":21},"rasgos":{"color_medio":[62,170,140],"contraste_con_fondo":228.8,"fraccion_tinta":0.8311,"area":2406,"area_visible":2406,"pixeles_muestreados":2552}}]},{"conjunto":"g4:SPAN#502","clave":"SPAN#502","id_padre":502,"padre_raiz_virtual":false,"n":2,"area_visible_total":3161,"parcial":true,"mediana_contraste":187.1,"mediana_area":1639,"atipicos_geometricos":[505],"miembros":[{"id":503,"caja":{"x":1321.5,"y":467.9,"w":21,"h":42},"rasgos":{"color_medio":[162,160,157],"contraste_con_fondo":153,"fraccion_tinta":0.7949,"area":882,"area_visible":882,"pixeles_muestreados":946}},{"id":505,"caja":{"x":1331.5,"y":489.9,"w":114.1,"h":21},"rasgos":{"color_medio":[122,121,118],"contraste_con_fondo":221.1,"fraccion_tinta":0.9817,"area":2395,"area_visible":2279,"pixeles_muestreados":2398}}]},{"conjunto":"g4:SPAN#138","clave":"SPAN#138","id_padre":138,"padre_raiz_virtual":false,"n":2,"area_visible_total":3016,"parcial":false,"mediana_contraste":58.9,"mediana_area":1508,"atipicos_geometricos":[139],"miembros":[{"id":139,"caja":{"x":406.4,"y":201.4,"w":89.3,"h":32},"rasgos":{"color_medio":[214,214,214],"contraste_con_fondo":58.9,"fraccion_tinta":0.3074,"area":2856,"area_visible":2856,"pixeles_muestreados":2970}},{"id":141,"caja":{"x":539.7,"y":201.4,"w":10,"h":16},"rasgos":{"color_medio":[214,214,214],"contraste_con_fondo":58.9,"fraccion_tinta":0.2353,"area":160,"area_visible":160,"pixeles_muestreados":187}}]},{"conjunto":"g4:SPAN#271","clave":"SPAN#271","id_padre":271,"padre_raiz_virtual":false,"n":2,"area_visible_total":2869,"parcial":false,"mediana_contraste":52.8,"mediana_area":1435,"atipicos_geometricos":[272],"miembros":[{"id":272,"caja":{"x":744.8,"y":201.4,"w":84.6,"h":32},"rasgos":{"color_medio":[221,221,221],"contraste_con_fondo":46.8,"fraccion_tinta":0.2333,"area":2709,"area_visible":2709,"pixeles_muestreados":2838}},{"id":274,"caja":{"x":844.5,"y":201.4,"w":10,"h":16},"rasgos":{"color_medio":[214,214,214],"contraste_con_fondo":58.9,"fraccion_tinta":0.2406,"area":160,"area_visible":160,"pixeles_muestreados":187}}]},{"conjunto":"g4:SPAN#338","clave":"SPAN#338","id_padre":338,"padre_raiz_virtual":false,"n":2,"area_visible_total":2761,"parcial":false,"mediana_contraste":60.6,"mediana_area":1381,"atipicos_geometricos":[339],"miembros":[{"id":339,"caja":{"x":878.5,"y":201.4,"w":81.3,"h":32},"rasgos":{"color_medio":[212,212,212],"contraste_con_fondo":62.4,"fraccion_tinta":0.3234,"area":2601,"area_visible":2601,"pixeles_muestreados":2706}},{"id":341,"caja":{"x":1003.6,"y":201.4,"w":10,"h":16},"rasgos":{"color_medio":[214,214,214],"contraste_con_fondo":58.9,"fraccion_tinta":0.2406,"area":160,"area_visible":160,"pixeles_muestreados":187}}]},{"conjunto":"g4:SPAN#361","clave":"SPAN#361","id_padre":361,"padre_raiz_virtual":false,"n":2,"area_visible_total":1877,"parcial":false,"mediana_contraste":62.3,"mediana_area":939,"atipicos_geometricos":[362],"miembros":[{"id":362,"caja":{"x":1037.6,"y":201.4,"w":53.7,"h":32},"rasgos":{"color_medio":[210,210,210],"contraste_con_fondo":65.8,"fraccion_tinta":0.3477,"area":1717,"area_visible":1717,"pixeles_muestreados":1815}},{"id":364,"caja":{"x":1127.2,"y":201.4,"w":10,"h":16},"rasgos":{"color_medio":[214,214,214],"contraste_con_fondo":58.9,"fraccion_tinta":0.2406,"area":160,"area_visible":160,"pixeles_muestreados":187}}]},{"conjunto":"g4:SPAN#170","clave":"SPAN#170","id_padre":170,"padre_raiz_virtual":false,"n":2,"area_visible_total":1127,"parcial":false,"mediana_contraste":61.5,"mediana_area":564,"atipicos_geometricos":[171],"miembros":[{"id":171,"caja":{"x":573.7,"y":201.4,"w":60.4,"h":16},"rasgos":{"color_medio":[211,211,211],"contraste_con_fondo":64.1,"fraccion_tinta":0.3472,"area":967,"area_visible":967,"pixeles_muestreados":1054}},{"id":173,"caja":{"x":642.2,"y":201.4,"w":10,"h":16},"rasgos":{"color_medio":[214,214,214],"contraste_con_fondo":58.9,"fraccion_tinta":0.2406,"area":160,"area_visible":160,"pixeles_muestreados":187}}]},{"conjunto":"g4:SPAN#432","clave":"SPAN#432","id_padre":432,"padre_raiz_virtual":false,"n":2,"area_visible_total":1117,"parcial":false,"mediana_contraste":64.1,"mediana_area":559,"atipicos_geometricos":[433],"miembros":[{"id":433,"caja":{"x":1161.2,"y":201.4,"w":59.8,"h":16},"rasgos":{"color_medio":[211,211,211],"contraste_con_fondo":64.1,"fraccion_tinta":0.3412,"area":957,"area_visible":957,"pixeles_muestreados":1020}},{"id":435,"caja":{"x":1229,"y":201.4,"w":10,"h":16},"rasgos":{"color_medio":[211,211,211],"contraste_con_fondo":64.1,"fraccion_tinta":0.2471,"area":160,"area_visible":160,"pixeles_muestreados":170}}]},{"conjunto":"g4:BUTTON#520","clave":"BUTTON#520","id_padre":520,"padre_raiz_virtual":false,"n":6,"area_visible_total":864,"parcial":false,"mediana_contraste":38,"mediana_area":144,"atipicos_geometricos":[],"miembros":[{"id":521,"caja":{"x":664,"y":611.4,"w":12,"h":12},"rasgos":{"color_medio":[239,241,243],"contraste_con_fondo":12.4,"fraccion_tinta":0.2821,"area":144,"area_visible":144,"pixeles_muestreados":156}},{"id":522,"caja":{"x":684,"y":611.4,"w":12,"h":12},"rasgos":{"color_medio":[222,226,233],"contraste_con_fondo":37.2,"fraccion_tinta":0.7308,"area":144,"area_visible":144,"pixeles_muestreados":156}},{"id":523,"caja":{"x":704,"y":611.4,"w":12,"h":12},"rasgos":{"color_medio":[222,227,232],"contraste_con_fondo":37.1,"fraccion_tinta":0.8013,"area":144,"area_visible":144,"pixeles_muestreados":156}},{"id":524,"caja":{"x":724,"y":611.4,"w":12,"h":12},"rasgos":{"color_medio":[221,226,231],"contraste_con_fondo":38.8,"fraccion_tinta":0.9423,"area":144,"area_visible":144,"pixeles_muestreados":156}},{"id":525,"caja":{"x":744,"y":611.4,"w":12,"h":12},"rasgos":{"color_medio":[221,226,231],"contraste_con_fondo":38.8,"fraccion_tinta":0.8718,"area":144,"area_visible":144,"pixeles_muestreados":156}},{"id":526,"caja":{"x":764,"y":611.4,"w":12,"h":12},"rasgos":{"color_medio":[215,220,225],"contraste_con_fondo":49,"fraccion_tinta":0.9808,"area":144,"area_visible":144,"pixeles_muestreados":156}}]},{"conjunto":"g4:SPAN#199","clave":"SPAN#199","id_padre":199,"padre_raiz_virtual":false,"n":2,"area_visible_total":587,"parcial":false,"mediana_contraste":63.8,"mediana_area":294,"atipicos_geometricos":[200],"miembros":[{"id":200,"caja":{"x":676.2,"y":201.4,"w":26.7,"h":16},"rasgos":{"color_medio":[209,208,208],"contraste_con_fondo":68.7,"fraccion_tinta":0.366,"area":427,"area_visible":427,"pixeles_muestreados":459}},{"id":202,"caja":{"x":710.8,"y":201.4,"w":10,"h":16},"rasgos":{"color_medio":[214,214,214],"contraste_con_fondo":58.9,"fraccion_tinta":0.2353,"area":160,"area_visible":160,"pixeles_muestreados":187}}]}],"g4_banner_candidatos":[{"id":83,"nodeName":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":257.4},"contiene_accionables":15},{"id":84,"nodeName":"NAV","caja":{"x":0,"y":0,"w":1440,"h":48},"contiene_accionables":2},{"id":95,"nodeName":"DIV","caja":{"x":85,"y":82,"w":1269,"h":71.2},"contiene_accionables":4},{"id":98,"nodeName":"DIV","caja":{"x":85,"y":105.2,"w":1265.8,"h":48},"contiene_accionables":3},{"id":110,"nodeName":"DIV","caja":{"x":0,"y":185.4,"w":1440,"h":72},"contiene_accionables":9}],"g4_cromo_candidatos":[{"id":95,"caja":{"x":85,"y":82,"w":1269,"h":71.2},"rasgos":{"color_medio":[248,250,250],"contraste_con_fondo":2.8,"fraccion_tinta":0.0525,"area":90337,"area_visible":90337,"pixeles_muestreados":91368}},{"id":98,"caja":{"x":85,"y":105.2,"w":1265.8,"h":48},"rasgos":{"color_medio":[245,249,248],"contraste_con_fondo":3.2,"fraccion_tinta":0.0698,"area":60759,"area_visible":60759,"pixeles_muestreados":62034}},{"id":103,"caja":{"x":1049.8,"y":108.2,"w":301,"h":42},"rasgos":{"color_medio":[234,234,234],"contraste_con_fondo":24.2,"fraccion_tinta":0.1635,"area":12642,"area_visible":12642,"pixeles_muestreados":12986}},{"id":104,"caja":{"x":1049.8,"y":108.2,"w":301,"h":42},"rasgos":{"color_medio":[234,234,234],"contraste_con_fondo":24.2,"fraccion_tinta":0.1635,"area":12642,"area_visible":12642,"pixeles_muestreados":12986}},{"id":105,"caja":{"x":1049.8,"y":108.2,"w":301,"h":42},"rasgos":{"color_medio":[234,234,234],"contraste_con_fondo":24.2,"fraccion_tinta":0.1635,"area":12642,"area_visible":12642,"pixeles_muestreados":12986}},{"id":106,"caja":{"x":1049.8,"y":108.2,"w":301,"h":42},"rasgos":{"color_medio":[234,234,234],"contraste_con_fondo":24.2,"fraccion_tinta":0.1635,"area":12642,"area_visible":12642,"pixeles_muestreados":12986}},{"id":129,"caja":{"x":262.2,"y":185.4,"w":128.2,"h":69},"rasgos":{"color_medio":[233,234,235],"contraste_con_fondo":24.3,"fraccion_tinta":0.0744,"area":8848,"area_visible":8848,"pixeles_muestreados":9030}},{"id":136,"caja":{"x":390.4,"y":185.4,"w":167.3,"h":69},"rasgos":{"color_medio":[231,232,233],"contraste_con_fondo":27.7,"fraccion_tinta":0.0957,"area":11547,"area_visible":11547,"pixeles_muestreados":11760}},{"id":168,"caja":{"x":557.7,"y":185.4,"w":102.4,"h":69},"rasgos":{"color_medio":[233,234,235],"contraste_con_fondo":24.3,"fraccion_tinta":0.0707,"area":7068,"area_visible":7068,"pixeles_muestreados":7280}},{"id":197,"caja":{"x":660.2,"y":185.4,"w":68.7,"h":69},"rasgos":{"color_medio":[234,235,236],"contraste_con_fondo":22.6,"fraccion_tinta":0.0582,"area":4738,"area_visible":4738,"pixeles_muestreados":4830}},{"id":269,"caja":{"x":728.8,"y":185.4,"w":133.7,"h":69},"rasgos":{"color_medio":[232,233,233],"contraste_con_fondo":26.6,"fraccion_tinta":0.0891,"area":9222,"area_visible":9222,"pixeles_muestreados":9450}},{"id":336,"caja":{"x":862.5,"y":185.4,"w":159.1,"h":69},"rasgos":{"color_medio":[231,232,233],"contraste_con_fondo":27.7,"fraccion_tinta":0.0964,"area":10979,"area_visible":10979,"pixeles_muestreados":11200}},{"id":359,"caja":{"x":1021.6,"y":185.4,"w":123.6,"h":69},"rasgos":{"color_medio":[231,232,233],"contraste_con_fondo":27.7,"fraccion_tinta":0.0915,"area":8529,"area_visible":8529,"pixeles_muestreados":8750}},{"id":430,"caja":{"x":1145.2,"y":185.4,"w":101.8,"h":69},"rasgos":{"color_medio":[233,234,235],"contraste_con_fondo":24.3,"fraccion_tinta":0.0689,"area":7023,"area_visible":7023,"pixeles_muestreados":7140}},{"id":527,"caja":{"x":31.5,"y":675.4,"w":1377.1,"h":68},"rasgos":{"color_medio":[235,239,249],"contraste_con_fondo":15.8,"fraccion_tinta":0.1424,"area":93642,"area_visible":93642,"pixeles_muestreados":95082}},{"id":528,"caja":{"x":31.5,"y":675.4,"w":771.5,"h":28},"rasgos":{"color_medio":[224,231,246],"contraste_con_fondo":29.5,"fraccion_tinta":0.2236,"area":21603,"area_visible":21603,"pixeles_muestreados":22388}},{"id":529,"caja":{"x":31.5,"y":675.4,"w":771.5,"h":28},"rasgos":{"color_medio":[224,231,246],"contraste_con_fondo":29.5,"fraccion_tinta":0.2236,"area":21603,"area_visible":21603,"pixeles_muestreados":22388}},{"id":554,"caja":{"x":100,"y":885,"w":1240,"h":389.2},"rasgos":{"color_medio":[252,252,252],"contraste_con_fondo":6.9,"fraccion_tinta":0.0628,"area":482612,"area_visible":18581,"pixeles_muestreados":18600}},{"id":555,"caja":{"x":100,"y":885,"w":280,"h":340},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":95200,"area_visible":4196,"pixeles_muestreados":4200}},{"id":556,"caja":{"x":100,"y":885,"w":280,"h":340},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":95200,"area_visible":4196,"pixeles_muestreados":4200}},{"id":564,"caja":{"x":420,"y":885,"w":280,"h":389.2},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":108977,"area_visible":4196,"pixeles_muestreados":4200}},{"id":565,"caja":{"x":420,"y":885,"w":280,"h":389.2},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":108977,"area_visible":4196,"pixeles_muestreados":4200}},{"id":573,"caja":{"x":740,"y":885,"w":280,"h":365.2},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":102257,"area_visible":4196,"pixeles_muestreados":4200}},{"id":574,"caja":{"x":740,"y":885,"w":280,"h":365.2},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":102257,"area_visible":4196,"pixeles_muestreados":4200}},{"id":582,"caja":{"x":1060,"y":885,"w":280,"h":340},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":95200,"area_visible":4196,"pixeles_muestreados":4200}},{"id":583,"caja":{"x":1060,"y":885,"w":280,"h":340},"rasgos":{"color_medio":[253,253,253],"contraste_con_fondo":8.7,"fraccion_tinta":0.0695,"area":95200,"area_visible":4196,"pixeles_muestreados":4200}}],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[60,2],[70,60],[71,70],[72,71],[72,71],[75,70],[76,75],[76,75],[79,70],[80,79],[80,79],[83,60],[84,83],[85,84],[86,84],[87,86],[88,87],[89,87],[90,87],[91,87],[92,87],[93,84],[94,93],[94,93],[95,83],[96,95],[97,96],[98,95],[99,98],[100,99],[101,98],[102,101],[103,98],[104,103],[105,104],[106,105],[108,105],[109,108],[109,108],[110,83],[111,110],[112,111],[116,112],[124,116],[125,124],[126,125],[127,126],[128,127],[129,124],[130,129],[131,130],[132,131],[136,124],[137,136],[138,137],[139,138],[140,139],[141,138],[142,141],[142,141],[168,124],[169,168],[170,169],[171,170],[172,171],[173,170],[174,173],[174,173],[197,124],[198,197],[199,198],[200,199],[201,200],[202,199],[203,202],[203,202],[269,124],[270,269],[271,270],[272,271],[273,272],[274,271],[275,274],[275,274],[336,124],[337,336],[338,337],[339,338],[340,339],[341,338],[342,341],[342,341],[359,124],[360,359],[361,360],[362,361],[363,362],[364,361],[365,364],[365,364],[430,124],[431,430],[432,431],[433,432],[434,433],[435,432],[436,435],[436,435],[446,60],[447,446],[449,447],[450,447],[451,450],[452,451],[453,452],[454,450],[456,454],[457,454],[458,457],[460,458],[461,460],[462,461],[463,462],[464,463],[465,460],[466,465],[502,457],[503,502],[504,503],[504,503],[505,502],[506,505],[507,457],[508,507],[509,508],[509,508],[510,507],[511,510],[512,457],[516,512],[517,516],[517,516],[518,516],[519,518],[520,457],[521,520],[522,520],[523,520],[524,520],[525,520],[526,520],[527,450],[528,527],[529,528],[530,529],[531,530],[532,531],[533,529],[534,533],[535,527],[536,535],[537,536],[538,537],[539,538],[540,536],[541,540],[542,527],[543,542],[544,543],[545,544],[546,545],[547,543],[548,547],[549,450],[550,549],[551,550],[552,551],[553,551],[554,550],[555,554],[556,555],[564,554],[565,564],[573,554],[574,573],[582,554],[583,582]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"b914a2d93c476a01f0bc8d52e6abed6ba34e6bd8016e1c1686401415715c3b57","wireframe":"19ea4cb3ca5fa2ab5016c8aaea1d0bd7ebcd48d0869334750a2f983c7eb16c8c"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.