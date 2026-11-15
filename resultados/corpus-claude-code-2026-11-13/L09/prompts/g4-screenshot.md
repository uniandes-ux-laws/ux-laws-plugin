# Ejecución 1.0.0

Evalúa solo G4, captura captures/L09.

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
{"pagina":{"id":"L09","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:19:33.412Z","sanity_ok":null,"consent_limpio":null},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[248,64,24],"g4_conjuntos_pares_total":13,"g4_conjuntos_pares":[{"conjunto":"g4:DIV#148","clave":"DIV#148","id_padre":148,"padre_raiz_virtual":false,"n":4,"area_visible_total":1397286,"parcial":true,"mediana_contraste":288.2,"mediana_area":79977,"atipicos_geometricos":[193,212],"miembros":[{"id":152,"caja":{"x":0,"y":0,"w":1440,"h":61},"rasgos":{"color_medio":[249,247,247],"contraste_con_fondo":288.5,"fraccion_tinta":0.9915,"area":87840,"area_visible":87840,"pixeles_muestreados":87840}},{"id":193,"caja":{"x":509.5,"y":754.1,"w":421,"h":65.9},"rasgos":{"color_medio":[22,133,253],"contraste_con_fondo":329.1,"fraccion_tinta":1,"area":27733,"area_visible":27733,"pixeles_muestreados":27852}},{"id":212,"caja":{"x":0,"y":60,"w":1440,"h":1900},"rasgos":{"color_medio":[239,143,122],"contraste_con_fondo":126.2,"fraccion_tinta":0.4437,"area":2736068,"area_visible":1209600,"pixeles_muestreados":1209600}},{"id":649,"caja":{"x":0,"y":849.9,"w":1440,"h":50.1},"rasgos":{"color_medio":[244,246,247],"contraste_con_fondo":287.9,"fraccion_tinta":1,"area":72113,"area_visible":72113,"pixeles_muestreados":73440}}]},{"conjunto":"g4:DIV#212","clave":"DIV#212","id_padre":212,"padre_raiz_virtual":false,"n":2,"area_visible_total":1209601,"parcial":true,"mediana_contraste":142.7,"mediana_area":726537,"atipicos_geometricos":[213,242],"miembros":[{"id":213,"caja":{"x":0,"y":60,"w":1440,"h":486.1},"rasgos":{"color_medio":[254,88,55],"contraste_con_fondo":39.7,"fraccion_tinta":0.1142,"area":699953,"area_visible":699953,"pixeles_muestreados":701280}},{"id":242,"caja":{"x":0,"y":546.1,"w":1440,"h":523},"rasgos":{"color_medio":[218,218,213],"contraste_con_fondo":245.6,"fraccion_tinta":0.8985,"area":753120,"area_visible":509648,"pixeles_muestreados":509760}}]},{"conjunto":"g4:DIV#242","clave":"DIV#242","id_padre":242,"padre_raiz_virtual":false,"n":2,"area_visible_total":261080,"parcial":true,"mediana_contraste":235.4,"mediana_area":233404,"atipicos_geometricos":[243,273],"miembros":[{"id":243,"caja":{"x":40,"y":572.1,"w":736,"h":263},"rasgos":{"color_medio":[179,174,153],"contraste_con_fondo":183,"fraccion_tinta":0.7336,"area":193568,"area_visible":193568,"pixeles_muestreados":194304}},{"id":273,"caja":{"x":40,"y":851.1,"w":1380,"h":198},"rasgos":{"color_medio":[244,246,247],"contraste_con_fondo":287.9,"fraccion_tinta":1,"area":273240,"area_visible":67512,"pixeles_muestreados":67620}}]},{"conjunto":"g4:DIV#213","clave":"DIV#213","id_padre":213,"padre_raiz_virtual":false,"n":3,"area_visible_total":157434,"parcial":false,"mediana_contraste":63,"mediana_area":53600,"atipicos_geometricos":[214,222],"miembros":[{"id":214,"caja":{"x":244,"y":154,"w":952,"h":94},"rasgos":{"color_medio":[255,103,73],"contraste_con_fondo":63,"fraccion_tinta":0.2096,"area":89488,"area_visible":89488,"pixeles_muestreados":89488}},{"id":222,"caja":{"x":385,"y":302.1,"w":670,"h":80},"rasgos":{"color_medio":[251,249,249],"contraste_con_fondo":291.3,"fraccion_tinta":0.9877,"area":53600,"area_visible":53600,"pixeles_muestreados":54270}},{"id":228,"caja":{"x":419.1,"y":422.1,"w":597.8,"h":24},"rasgos":{"color_medio":[254,98,67],"contraste_con_fondo":55.1,"fraccion_tinta":0.2288,"area":14346,"area_visible":14346,"pixeles_muestreados":14950}}]},{"conjunto":"g4:A#248","clave":"A#248","id_padre":248,"padre_raiz_virtual":false,"n":2,"area_visible_total":149640,"parcial":false,"mediana_contraste":169.1,"mediana_area":74820,"atipicos_geometricos":[249,261],"miembros":[{"id":249,"caja":{"x":40,"y":620.1,"w":348,"h":215},"rasgos":{"color_medio":[249,110,80],"contraste_con_fondo":72.5,"fraccion_tinta":0.3116,"area":74820,"area_visible":74820,"pixeles_muestreados":75168}},{"id":261,"caja":{"x":428,"y":620.1,"w":348,"h":215},"rasgos":{"color_medio":[69,194,171],"contraste_con_fondo":265.6,"fraccion_tinta":0.9998,"area":74820,"area_visible":74820,"pixeles_muestreados":75168}}]},{"conjunto":"g4:SPAN#215","clave":"SPAN#215","id_padre":215,"padre_raiz_virtual":false,"n":3,"area_visible_total":89488,"parcial":false,"mediana_contraste":58.1,"mediana_area":27573,"atipicos_geometricos":[220],"miembros":[{"id":216,"caja":{"x":244,"y":154,"w":293.3,"h":94},"rasgos":{"color_medio":[255,100,69],"contraste_con_fondo":58.1,"fraccion_tinta":0.1969,"area":27573,"area_visible":27573,"pixeles_muestreados":27636}},{"id":218,"caja":{"x":537.3,"y":154,"w":247.8,"h":94},"rasgos":{"color_medio":[255,115,87],"contraste_con_fondo":81.4,"fraccion_tinta":0.2676,"area":23290,"area_visible":23290,"pixeles_muestreados":23406}},{"id":220,"caja":{"x":785.1,"y":154,"w":410.9,"h":94},"rasgos":{"color_medio":[255,98,67],"contraste_con_fondo":55.3,"fraccion_tinta":0.1826,"area":38625,"area_visible":38625,"pixeles_muestreados":38634}}]},{"conjunto":"g4:DIV#152","clave":"DIV#152","id_padre":152,"padre_raiz_virtual":false,"n":3,"area_visible_total":58347,"parcial":false,"mediana_contraste":265,"mediana_area":4356,"atipicos_geometricos":[170],"miembros":[{"id":153,"caja":{"x":16,"y":6.5,"w":88,"h":48},"rasgos":{"color_medio":[251,232,228],"contraste_con_fondo":264.3,"fraccion_tinta":0.9279,"area":4224,"area_visible":4224,"pixeles_muestreados":4312}},{"id":160,"caja":{"x":120,"y":15,"w":140.5,"h":31},"rasgos":{"color_medio":[255,233,228],"contraste_con_fondo":265,"fraccion_tinta":0.9186,"area":4356,"area_visible":4356,"pixeles_muestreados":4371}},{"id":170,"caja":{"x":379.2,"y":6.5,"w":1036.8,"h":48},"rasgos":{"color_medio":[245,245,246],"contraste_con_fondo":286.5,"fraccion_tinta":0.9984,"area":49767,"area_visible":49767,"pixeles_muestreados":50813}}]},{"conjunto":"g4:DIV#170","clave":"DIV#170","id_padre":170,"padre_raiz_virtual":false,"n":2,"area_visible_total":38796,"parcial":false,"mediana_contraste":279.9,"mediana_area":19398,"atipicos_geometricos":[171],"miembros":[{"id":171,"caja":{"x":379.2,"y":6.5,"w":776,"h":48},"rasgos":{"color_medio":[244,244,245],"contraste_con_fondo":285.1,"fraccion_tinta":0.9979,"area":37248,"area_visible":37248,"pixeles_muestreados":38073}},{"id":187,"caja":{"x":1373,"y":12.5,"w":43,"h":36},"rasgos":{"color_medio":[237,237,237],"contraste_con_fondo":274.6,"fraccion_tinta":1,"area":1548,"area_visible":1548,"pixeles_muestreados":1591}}]},{"conjunto":"g4:DIV#649","clave":"DIV#649","id_padre":649,"padre_raiz_virtual":false,"n":2,"area_visible_total":19038,"parcial":false,"mediana_contraste":269.1,"mediana_area":9519,"atipicos_geometricos":[650],"miembros":[{"id":650,"caja":{"x":243.5,"y":863.9,"w":817.1,"h":21},"rasgos":{"color_medio":[223,226,232],"contraste_con_fondo":264.8,"fraccion_tinta":1,"area":17185,"area_visible":17185,"pixeles_muestreados":17996}},{"id":665,"caja":{"x":1302.5,"y":865.5,"w":97.5,"h":19},"rasgos":{"color_medio":[200,245,223],"contraste_con_fondo":273.3,"fraccion_tinta":1,"area":1853,"area_visible":1853,"pixeles_muestreados":1960}}]},{"conjunto":"g4:DIV#198","clave":"DIV#198","id_padre":198,"padre_raiz_virtual":false,"n":2,"area_visible_total":13974,"parcial":false,"mediana_contraste":308.5,"mediana_area":6987,"atipicos_geometricos":[202],"miembros":[{"id":199,"caja":{"x":541.5,"y":775.1,"w":24,"h":24},"rasgos":{"color_medio":[113,181,255],"contraste_con_fondo":292,"fraccion_tinta":1,"area":576,"area_visible":576,"pixeles_muestreados":625}},{"id":202,"caja":{"x":581.5,"y":765.1,"w":304.9,"h":43.9},"rasgos":{"color_medio":[32,139,255],"contraste_con_fondo":325,"fraccion_tinta":1,"area":13398,"area_visible":13398,"pixeles_muestreados":13770}}]},{"conjunto":"g4:DIV#284","clave":"DIV#284","id_padre":284,"padre_raiz_virtual":false,"n":6,"area_visible_total":12558,"parcial":true,"mediana_contraste":299.8,"mediana_area":26244,"atipicos_geometricos":[],"miembros":[{"id":286,"caja":{"x":40,"y":887.1,"w":162,"h":162},"rasgos":{"color_medio":[255,255,255],"contraste_con_fondo":299.8,"fraccion_tinta":1,"area":26244,"area_visible":2093,"pixeles_muestreados":2106}},{"id":300,"caja":{"x":200,"y":887.1,"w":162,"h":162},"rasgos":{"color_medio":[255,255,255],"contraste_con_fondo":299.8,"fraccion_tinta":1,"area":26244,"area_visible":2093,"pixeles_muestreados":2106}},{"id":314,"caja":{"x":360,"y":887.1,"w":162,"h":162},"rasgos":{"color_medio":[255,255,255],"contraste_con_fondo":299.8,"fraccion_tinta":1,"area":26244,"area_visible":2093,"pixeles_muestreados":2106}},{"id":328,"caja":{"x":520,"y":887.1,"w":162,"h":162},"rasgos":{"color_medio":[255,255,255],"contraste_con_fondo":299.8,"fraccion_tinta":1,"area":26244,"area_visible":2093,"pixeles_muestreados":2106}},{"id":342,"caja":{"x":680,"y":887.1,"w":162,"h":162},"rasgos":{"color_medio":[255,255,255],"contraste_con_fondo":299.8,"fraccion_tinta":1,"area":26244,"area_visible":2093,"pixeles_muestreados":2106}},{"id":356,"caja":{"x":840,"y":887.1,"w":162,"h":162},"rasgos":{"color_medio":[255,255,255],"contraste_con_fondo":299.8,"fraccion_tinta":1,"area":26244,"area_visible":2093,"pixeles_muestreados":2106}}]},{"conjunto":"g4:SPAN#202","clave":"SPAN#202","id_padre":202,"padre_raiz_virtual":false,"n":4,"area_visible_total":6473,"parcial":false,"mediana_contraste":310.4,"mediana_area":1723,"atipicos_geometricos":[],"miembros":[{"id":203,"caja":{"x":581.5,"y":765.1,"w":90.1,"h":19},"rasgos":{"color_medio":[52,149,255],"contraste_con_fondo":314.6,"fraccion_tinta":1,"area":1712,"area_visible":1712,"pixeles_muestreados":1820}},{"id":205,"caja":{"x":675.6,"y":765.1,"w":115.6,"h":19},"rasgos":{"color_medio":[83,165,255],"contraste_con_fondo":301.3,"fraccion_tinta":1,"area":2196,"area_visible":2196,"pixeles_muestreados":2340}},{"id":207,"caja":{"x":795.2,"y":765.1,"w":91.3,"h":19},"rasgos":{"color_medio":[49,148,255],"contraste_con_fondo":316.3,"fraccion_tinta":1,"area":1734,"area_visible":1734,"pixeles_muestreados":1840}},{"id":209,"caja":{"x":712.1,"y":790.1,"w":43.7,"h":19},"rasgos":{"color_medio":[71,159,255],"contraste_con_fondo":306.1,"fraccion_tinta":1,"area":831,"area_visible":831,"pixeles_muestreados":880}}]},{"conjunto":"g4:SVG#162","clave":"SVG#162","id_padre":162,"padre_raiz_virtual":false,"n":2,"area_visible_total":1152,"parcial":false,"mediana_contraste":243.1,"mediana_area":576,"atipicos_geometricos":[163,168],"miembros":[{"id":163,"caja":{"x":137,"y":18.5,"w":24,"h":24},"rasgos":{"color_medio":[255,189,176],"contraste_con_fondo":196.9,"fraccion_tinta":0.6983,"area":576,"area_visible":576,"pixeles_muestreados":600}},{"id":168,"caja":{"x":219.5,"y":18.5,"w":24,"h":24},"rasgos":{"color_medio":[255,248,247],"contraste_con_fondo":289.2,"fraccion_tinta":0.9712,"area":576,"area_visible":576,"pixeles_muestreados":625}}]}],"g4_banner_candidatos":[{"id":152,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":61},"contiene_accionables":7}],"g4_cromo_candidatos":[],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[147,2],[148,147],[152,148],[153,152],[154,153],[155,154],[156,155],[157,153],[158,157],[159,158],[160,152],[161,160],[162,161],[163,162],[164,163],[165,162],[166,165],[167,166],[168,162],[169,168],[170,152],[171,170],[172,171],[173,172],[174,173],[175,174],[176,175],[177,174],[178,177],[179,173],[180,179],[181,180],[182,170],[183,182],[184,183],[185,182],[186,185],[187,170],[188,187],[189,188],[190,189],[191,190],[192,191],[193,148],[194,193],[195,194],[196,195],[197,196],[198,197],[199,198],[200,199],[201,200],[202,198],[203,202],[204,203],[205,202],[206,205],[207,202],[208,207],[209,202],[210,209],[212,148],[213,212],[214,213],[215,214],[216,215],[217,216],[218,215],[219,218],[220,215],[221,220],[222,213],[223,222],[224,223],[225,224],[226,225],[227,223],[228,213],[229,228],[230,229],[231,230],[232,231],[233,232],[234,233],[235,231],[236,229],[237,236],[238,237],[239,236],[240,236],[241,240],[242,212],[243,242],[244,243],[245,244],[246,243],[247,246],[248,247],[249,248],[250,249],[251,250],[252,251],[253,252],[254,253],[255,254],[257,255],[259,251],[260,259],[261,248],[262,261],[263,262],[264,263],[265,264],[266,265],[267,266],[269,267],[271,263],[272,271],[273,242],[283,273],[284,283],[286,284],[287,286],[288,287],[289,288],[300,284],[301,300],[302,301],[303,302],[314,284],[315,314],[316,315],[317,316],[328,284],[329,328],[330,329],[331,330],[342,284],[343,342],[344,343],[345,344],[356,284],[357,356],[358,357],[359,358],[370,284],[649,148],[650,649],[651,650],[652,651],[653,651],[655,653],[662,651],[663,650],[664,663],[665,649],[666,665],[667,666],[668,666],[669,668]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"2edf81b37a76b586ac09f8553d77a0b50be89d2564ea906e2a6883a5742e576a","wireframe":"6ca8954c7e788071809303d7431107d90bc62bdc3681a47afa468f0b0b326612"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.