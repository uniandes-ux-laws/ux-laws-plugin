# Ejecución 1.0.0

Evalúa solo G4, captura captures/H05.

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
{"pagina":{"id":"H05","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:16:18.524Z","sanity_ok":null,"consent_limpio":null},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[248,248,248],"g4_conjuntos_pares_total":11,"g4_conjuntos_pares":[{"conjunto":"g4:SECTION#860","clave":"SECTION#860","id_padre":860,"padre_raiz_virtual":false,"n":2,"area_visible_total":1633800,"parcial":true,"mediana_contraste":174.3,"mediana_area":1841904,"atipicos_geometricos":[862,950],"miembros":[{"id":862,"caja":{"x":120,"y":219.6,"w":1200,"h":379},"rasgos":{"color_medio":[127,64,163],"contraste_con_fondo":236.1,"fraccion_tinta":0.8636,"area":454800,"area_visible":454800,"pixeles_muestreados":456000}},{"id":950,"caja":{"x":0,"y":0,"w":1310,"h":2464.9},"rasgos":{"color_medio":[185,164,208],"contraste_con_fondo":112.4,"fraccion_tinta":0.4492,"area":3229007,"area_visible":1179000,"pixeles_muestreados":1179000}}]},{"conjunto":"g4:DIV#380","clave":"DIV#380","id_padre":380,"padre_raiz_virtual":false,"n":3,"area_visible_total":1010343,"parcial":true,"mediana_contraste":35.6,"mediana_area":133812,"atipicos_geometricos":[835],"miembros":[{"id":452,"caja":{"x":130,"y":35,"w":1239,"h":108},"rasgos":{"color_medio":[241,245,250],"contraste_con_fondo":7.9,"fraccion_tinta":0.0768,"area":133812,"area_visible":133812,"pixeles_muestreados":133812}},{"id":558,"caja":{"x":0,"y":159,"w":1440,"h":60.6},"rasgos":{"color_medio":[224,228,231],"contraste_con_fondo":35.6,"fraccion_tinta":0.0934,"area":87278,"area_visible":87278,"pixeles_muestreados":87840}},{"id":835,"caja":{"x":140,"y":219.6,"w":1160,"h":2278.3},"rasgos":{"color_medio":[170,135,192],"contraste_con_fondo":148.3,"fraccion_tinta":0.5782,"area":2642806,"area_visible":789253,"pixeles_muestreados":789960}}]},{"conjunto":"g4:DIV#950","clave":"DIV#950","id_padre":950,"padre_raiz_virtual":false,"n":2,"area_visible_total":337553,"parcial":true,"mediana_contraste":37.2,"mediana_area":844524,"atipicos_geometricos":[954],"miembros":[{"id":954,"caja":{"x":140,"y":598.6,"w":746.7,"h":1688.3},"rasgos":{"color_medio":[217,216,226],"contraste_con_fondo":49.7,"fraccion_tinta":0.287,"area":1260566,"area_visible":225035,"pixeles_muestreados":225594}},{"id":1391,"caja":{"x":926.7,"y":598.6,"w":373.3,"h":1147.7},"rasgos":{"color_medio":[231,237,234],"contraste_con_fondo":24.6,"fraccion_tinta":0.1018,"area":428482,"area_visible":112518,"pixeles_muestreados":112948}}]},{"conjunto":"g4:DIV#956","clave":"DIV#956","id_padre":956,"padre_raiz_virtual":false,"n":2,"area_visible_total":206313,"parcial":true,"mediana_contraste":55.8,"mediana_area":498050,"atipicos_geometricos":[],"miembros":[{"id":960,"caja":{"x":140,"y":598.6,"w":373.3,"h":1688.3},"rasgos":{"color_medio":[211,215,217],"contraste_con_fondo":58.5,"fraccion_tinta":0.394,"area":630283,"area_visible":112518,"pixeles_muestreados":112948}},{"id":1071,"caja":{"x":553.3,"y":618.6,"w":333.3,"h":1097.5},"rasgos":{"color_medio":[217,208,232],"contraste_con_fondo":53.1,"fraccion_tinta":0.2149,"area":365817,"area_visible":93795,"pixeles_muestreados":94188}}]},{"conjunto":"g4:LI#392","clave":"LI#392","id_padre":392,"padre_raiz_virtual":false,"n":5,"area_visible_total":141200,"parcial":true,"mediana_contraste":227.5,"mediana_area":2800120,"atipicos_geometricos":[],"miembros":[{"id":394,"caja":{"x":-138594,"y":296,"w":140006,"h":20},"rasgos":{"color_medio":[128,66,164],"contraste_con_fondo":233.6,"fraccion_tinta":0.8517,"area":2800120,"area_visible":28240,"pixeles_muestreados":28240}},{"id":400,"caja":{"x":-138594,"y":324,"w":140006,"h":20},"rasgos":{"color_medio":[126,63,161],"contraste_con_fondo":238.1,"fraccion_tinta":0.8515,"area":2800120,"area_visible":28240,"pixeles_muestreados":28240}},{"id":406,"caja":{"x":-138594,"y":352,"w":140006,"h":20},"rasgos":{"color_medio":[131,71,166],"contraste_con_fondo":227.5,"fraccion_tinta":0.8212,"area":2800120,"area_visible":28240,"pixeles_muestreados":28240}},{"id":412,"caja":{"x":-138594,"y":380,"w":140006,"h":20},"rasgos":{"color_medio":[132,71,165],"contraste_con_fondo":227.3,"fraccion_tinta":0.8269,"area":2800120,"area_visible":28240,"pixeles_muestreados":28240}},{"id":418,"caja":{"x":-138594,"y":408,"w":140006,"h":20},"rasgos":{"color_medio":[138,81,168],"contraste_con_fondo":215.4,"fraccion_tinta":0.8186,"area":2800120,"area_visible":28240,"pixeles_muestreados":28240}}]},{"conjunto":"g4:SECTION#1071","clave":"SECTION#1071","id_padre":1071,"padre_raiz_virtual":false,"n":2,"area_visible_total":87129,"parcial":true,"mediana_contraste":158.4,"mediana_area":179576,"atipicos_geometricos":[1073,1201],"miembros":[{"id":1073,"caja":{"x":553.3,"y":618.6,"w":333.3,"h":254.1},"rasgos":{"color_medio":[220,208,232],"contraste_con_fondo":51.4,"fraccion_tinta":0.2103,"area":84697,"area_visible":84697,"pixeles_muestreados":85170}},{"id":1201,"caja":{"x":553.3,"y":892.7,"w":333.3,"h":823.4},"rasgos":{"color_medio":[32,104,193],"contraste_con_fondo":265.4,"fraccion_tinta":0.875,"area":274454,"area_visible":2432,"pixeles_muestreados":2672}}]},{"conjunto":"g4:LI#1424","clave":"LI#1424","id_padre":1424,"padre_raiz_virtual":false,"n":3,"area_visible_total":65817,"parcial":false,"mediana_contraste":53.9,"mediana_area":21793,"atipicos_geometricos":[],"miembros":[{"id":1428,"caja":{"x":957.7,"y":652.6,"w":311.3,"h":70},"rasgos":{"color_medio":[207,225,217],"contraste_con_fondo":56.3,"fraccion_tinta":0.1729,"area":21793,"area_visible":21793,"pixeles_muestreados":22152}},{"id":1440,"caja":{"x":957.7,"y":737.6,"w":311.3,"h":71.4},"rasgos":{"color_medio":[214,221,216],"contraste_con_fondo":53.9,"fraccion_tinta":0.1947,"area":22231,"area_visible":22231,"pixeles_muestreados":22776}},{"id":1452,"caja":{"x":957.7,"y":824,"w":311.3,"h":70},"rasgos":{"color_medio":[225,228,226],"contraste_con_fondo":37.6,"fraccion_tinta":0.1033,"area":21793,"area_visible":21793,"pixeles_muestreados":22152}}]},{"conjunto":"g4:UL#1088","clave":"UL#1088","id_padre":1088,"padre_raiz_virtual":false,"n":2,"area_visible_total":46106,"parcial":false,"mediana_contraste":13.7,"mediana_area":23053,"atipicos_geometricos":[],"miembros":[{"id":1090,"caja":{"x":568.3,"y":665.7,"w":303.3,"h":76},"rasgos":{"color_medio":[241,238,244],"contraste_con_fondo":12.8,"fraccion_tinta":0.1051,"area":23053,"area_visible":23053,"pixeles_muestreados":23408}},{"id":1110,"caja":{"x":568.3,"y":751.7,"w":303.3,"h":76},"rasgos":{"color_medio":[240,237,243],"contraste_con_fondo":14.5,"fraccion_tinta":0.1129,"area":23053,"area_visible":23053,"pixeles_muestreados":23408}}]},{"conjunto":"g4:LI#582","clave":"LI#582","id_padre":582,"padre_raiz_virtual":false,"n":7,"area_visible_total":23838,"parcial":false,"mediana_contraste":46.8,"mediana_area":3100,"atipicos_geometricos":[596],"miembros":[{"id":586,"caja":{"x":250.9,"y":171.6,"w":36.1,"h":35},"rasgos":{"color_medio":[224,224,224],"contraste_con_fondo":41.6,"fraccion_tinta":0.1447,"area":1264,"area_visible":1264,"pixeles_muestreados":1368}},{"id":591,"caja":{"x":337.1,"y":171.6,"w":95.4,"h":35},"rasgos":{"color_medio":[222,222,222],"contraste_con_fondo":45,"fraccion_tinta":0.1519,"area":3338,"area_visible":3338,"pixeles_muestreados":3456}},{"id":596,"caja":{"x":482.4,"y":171.6,"w":235.1,"h":35},"rasgos":{"color_medio":[222,222,222],"contraste_con_fondo":45,"fraccion_tinta":0.1481,"area":8228,"area_visible":8228,"pixeles_muestreados":8496}},{"id":652,"caja":{"x":767.5,"y":171.6,"w":59,"h":35},"rasgos":{"color_medio":[221,221,221],"contraste_con_fondo":46.8,"fraccion_tinta":0.1569,"area":2066,"area_visible":2066,"pixeles_muestreados":2160}},{"id":668,"caja":{"x":876.5,"y":171.6,"w":105.7,"h":35},"rasgos":{"color_medio":[221,221,221],"contraste_con_fondo":46.8,"fraccion_tinta":0.1607,"area":3698,"area_visible":3698,"pixeles_muestreados":3852}},{"id":792,"caja":{"x":1032.2,"y":171.6,"w":88.6,"h":35},"rasgos":{"color_medio":[220,220,220],"contraste_con_fondo":48.5,"fraccion_tinta":0.176,"area":3100,"area_visible":3100,"pixeles_muestreados":3204}},{"id":823,"caja":{"x":1170.8,"y":171.6,"w":61.3,"h":35},"rasgos":{"color_medio":[220,220,220],"contraste_con_fondo":48.5,"fraccion_tinta":0.1693,"area":2144,"area_visible":2144,"pixeles_muestreados":2268}}]},{"conjunto":"g4:DIV#1096","clave":"DIV#1096","id_padre":1096,"padre_raiz_virtual":false,"n":2,"area_visible_total":618,"parcial":false,"mediana_contraste":156.3,"mediana_area":309,"atipicos_geometricos":[1098,1101],"miembros":[{"id":1098,"caja":{"x":585.1,"y":684.7,"w":14.5,"h":15},"rasgos":{"color_medio":[121,69,173],"contraste_con_fondo":231.9,"fraccion_tinta":0.9,"area":217,"area_visible":217,"pixeles_muestreados":240}},{"id":1101,"caja":{"x":582.3,"y":704.3,"w":20,"h":20},"rasgos":{"color_medio":[203,189,216],"contraste_con_fondo":80.8,"fraccion_tinta":0.3537,"area":401,"area_visible":401,"pixeles_muestreados":441}}]},{"conjunto":"g4:DIV#1116","clave":"DIV#1116","id_padre":1116,"padre_raiz_virtual":false,"n":2,"area_visible_total":618,"parcial":false,"mediana_contraste":156.3,"mediana_area":309,"atipicos_geometricos":[1118,1121],"miembros":[{"id":1118,"caja":{"x":585.1,"y":770.7,"w":14.5,"h":15},"rasgos":{"color_medio":[121,69,173],"contraste_con_fondo":231.9,"fraccion_tinta":0.9,"area":217,"area_visible":217,"pixeles_muestreados":240}},{"id":1121,"caja":{"x":582.3,"y":790.3,"w":20,"h":20},"rasgos":{"color_medio":[203,189,216],"contraste_con_fondo":80.8,"fraccion_tinta":0.3537,"area":401,"area_visible":401,"pixeles_muestreados":441}}]}],"g4_banner_candidatos":[{"id":287,"nodeName":"FORM","caja":{"x":-138602,"y":0,"w":140042,"h":3360.8},"contiene_accionables":24},{"id":378,"nodeName":"DIV","caja":{"x":-138602,"y":0,"w":140042,"h":3360.8},"contiene_accionables":24},{"id":380,"nodeName":"DIV","caja":{"x":-138602,"y":0,"w":140042,"h":3360.8},"contiene_accionables":24},{"id":429,"nodeName":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":41},"contiene_accionables":1},{"id":431,"nodeName":"DIV","caja":{"x":0,"y":8,"w":1080,"h":25},"contiene_accionables":1},{"id":435,"nodeName":"DIV","caja":{"x":0,"y":8,"w":1080,"h":25},"contiene_accionables":1},{"id":439,"nodeName":"DIV","caja":{"x":0,"y":8,"w":1080,"h":25},"contiene_accionables":1},{"id":452,"nodeName":"DIV","caja":{"x":130,"y":35,"w":1239,"h":108},"contiene_accionables":3},{"id":456,"nodeName":"HEADER","caja":{"x":130,"y":35,"w":1239,"h":108},"contiene_accionables":3},{"id":458,"nodeName":"DIV","caja":{"x":130,"y":35,"w":1239,"h":108},"contiene_accionables":3},{"id":462,"nodeName":"DIV","caja":{"x":130,"y":35,"w":1239,"h":108},"contiene_accionables":3},{"id":558,"nodeName":"DIV","caja":{"x":0,"y":159,"w":1440,"h":60.6},"contiene_accionables":7},{"id":562,"nodeName":"NAV","caja":{"x":140,"y":159,"w":1160,"h":57.6},"contiene_accionables":7},{"id":1391,"nodeName":"DIV","caja":{"x":926.7,"y":598.6,"w":373.3,"h":1147.7},"contiene_accionables":3},{"id":1393,"nodeName":"SECTION","caja":{"x":926.7,"y":598.6,"w":373.3,"h":1147.7},"contiene_accionables":3},{"id":1395,"nodeName":"UL","caja":{"x":957.7,"y":652.6,"w":311.3,"h":1077.7},"contiene_accionables":3},{"id":1397,"nodeName":"DIV","caja":{"x":957.7,"y":652.6,"w":311.3,"h":1077.7},"contiene_accionables":3},{"id":1414,"nodeName":"DIV","caja":{"x":957.7,"y":652.6,"w":311.3,"h":1077.7},"contiene_accionables":3},{"id":1416,"nodeName":"DIV","caja":{"x":957.7,"y":652.6,"w":311.3,"h":1077.7},"contiene_accionables":3},{"id":1418,"nodeName":"DIV","caja":{"x":957.7,"y":652.6,"w":311.3,"h":1077.7},"contiene_accionables":3},{"id":1420,"nodeName":"DIV","caja":{"x":957.7,"y":652.6,"w":311.3,"h":1077.7},"contiene_accionables":3},{"id":1424,"nodeName":"UL","caja":{"x":957.7,"y":652.6,"w":311.3,"h":1077.7},"contiene_accionables":3}],"g4_cromo_candidatos":[{"id":452,"caja":{"x":130,"y":35,"w":1239,"h":108},"rasgos":{"color_medio":[241,245,250],"contraste_con_fondo":7.9,"fraccion_tinta":0.0768,"area":133812,"area_visible":133812,"pixeles_muestreados":133812}},{"id":456,"caja":{"x":130,"y":35,"w":1239,"h":108},"rasgos":{"color_medio":[241,245,250],"contraste_con_fondo":7.9,"fraccion_tinta":0.0768,"area":133812,"area_visible":133812,"pixeles_muestreados":133812}},{"id":458,"caja":{"x":130,"y":35,"w":1239,"h":108},"rasgos":{"color_medio":[241,245,250],"contraste_con_fondo":7.9,"fraccion_tinta":0.0768,"area":133812,"area_visible":133812,"pixeles_muestreados":133812}},{"id":462,"caja":{"x":130,"y":35,"w":1239,"h":108},"rasgos":{"color_medio":[241,245,250],"contraste_con_fondo":7.9,"fraccion_tinta":0.0768,"area":133812,"area_visible":133812,"pixeles_muestreados":133812}},{"id":464,"caja":{"x":130,"y":71,"w":106.6,"h":60},"rasgos":{"color_medio":[229,244,242],"contraste_con_fondo":20.3,"fraccion_tinta":0.2114,"area":6398,"area_visible":6398,"pixeles_muestreados":6420}},{"id":468,"caja":{"x":130,"y":71,"w":106.6,"h":60},"rasgos":{"color_medio":[229,244,242],"contraste_con_fondo":20.3,"fraccion_tinta":0.2114,"area":6398,"area_visible":6398,"pixeles_muestreados":6420}},{"id":483,"caja":{"x":966,"y":35,"w":403,"h":108},"rasgos":{"color_medio":[240,243,248],"contraste_con_fondo":9.4,"fraccion_tinta":0.0898,"area":43524,"area_visible":43524,"pixeles_muestreados":43524}},{"id":485,"caja":{"x":966,"y":35,"w":403,"h":108},"rasgos":{"color_medio":[240,243,248],"contraste_con_fondo":9.4,"fraccion_tinta":0.0898,"area":43524,"area_visible":43524,"pixeles_muestreados":43524}},{"id":487,"caja":{"x":966,"y":35,"w":403,"h":108},"rasgos":{"color_medio":[240,243,248],"contraste_con_fondo":9.4,"fraccion_tinta":0.0898,"area":43524,"area_visible":43524,"pixeles_muestreados":43524}},{"id":489,"caja":{"x":966,"y":35,"w":403,"h":108},"rasgos":{"color_medio":[240,243,248],"contraste_con_fondo":9.4,"fraccion_tinta":0.0898,"area":43524,"area_visible":43524,"pixeles_muestreados":43524}},{"id":491,"caja":{"x":966,"y":35,"w":403,"h":108},"rasgos":{"color_medio":[240,243,248],"contraste_con_fondo":9.4,"fraccion_tinta":0.0898,"area":43524,"area_visible":43524,"pixeles_muestreados":43524}},{"id":492,"caja":{"x":966,"y":35,"w":403,"h":108},"rasgos":{"color_medio":[240,243,248],"contraste_con_fondo":9.4,"fraccion_tinta":0.0898,"area":43524,"area_visible":43524,"pixeles_muestreados":43524}},{"id":493,"caja":{"x":966,"y":82,"w":344,"h":38},"rasgos":{"color_medio":[242,242,242],"contraste_con_fondo":10.4,"fraccion_tinta":0.1141,"area":13072,"area_visible":13072,"pixeles_muestreados":13072}},{"id":494,"caja":{"x":982,"y":35,"w":387,"h":108},"rasgos":{"color_medio":[240,243,248],"contraste_con_fondo":9.4,"fraccion_tinta":0.0893,"area":41796,"area_visible":41796,"pixeles_muestreados":41796}},{"id":495,"caja":{"x":982,"y":91,"w":300,"h":18},"rasgos":{"color_medio":[249,249,249],"contraste_con_fondo":1.7,"fraccion_tinta":0.115,"area":5400,"area_visible":5400,"pixeles_muestreados":5400}},{"id":497,"caja":{"x":1247,"y":35,"w":122,"h":108},"rasgos":{"color_medio":[241,244,250],"contraste_con_fondo":8.3,"fraccion_tinta":0.075,"area":13176,"area_visible":13176,"pixeles_muestreados":13176}},{"id":562,"caja":{"x":140,"y":159,"w":1160,"h":57.6},"rasgos":{"color_medio":[234,234,234],"contraste_con_fondo":24.2,"fraccion_tinta":0.0578,"area":66827,"area_visible":66827,"pixeles_muestreados":67280}},{"id":966,"caja":{"x":140,"y":598.6,"w":373.3,"h":37.1},"rasgos":{"color_medio":[237,239,238],"contraste_con_fondo":17.4,"fraccion_tinta":0.0423,"area":13848,"area_visible":13848,"pixeles_muestreados":14212}},{"id":1080,"caja":{"x":568.3,"y":665.7,"w":303.3,"h":162},"rasgos":{"color_medio":[241,238,244],"contraste_con_fondo":12.8,"fraccion_tinta":0.103,"area":49139,"area_visible":49139,"pixeles_muestreados":49552}},{"id":1082,"caja":{"x":568.3,"y":665.7,"w":303.3,"h":162},"rasgos":{"color_medio":[241,238,244],"contraste_con_fondo":12.8,"fraccion_tinta":0.103,"area":49139,"area_visible":49139,"pixeles_muestreados":49552}},{"id":1084,"caja":{"x":568.3,"y":665.7,"w":303.3,"h":162},"rasgos":{"color_medio":[241,238,244],"contraste_con_fondo":12.8,"fraccion_tinta":0.103,"area":49139,"area_visible":49139,"pixeles_muestreados":49552}},{"id":1086,"caja":{"x":568.3,"y":665.7,"w":303.3,"h":162},"rasgos":{"color_medio":[241,238,244],"contraste_con_fondo":12.8,"fraccion_tinta":0.103,"area":49139,"area_visible":49139,"pixeles_muestreados":49552}},{"id":1088,"caja":{"x":568.3,"y":665.7,"w":303.3,"h":162},"rasgos":{"color_medio":[241,238,244],"contraste_con_fondo":12.8,"fraccion_tinta":0.103,"area":49139,"area_visible":49139,"pixeles_muestreados":49552}},{"id":1090,"caja":{"x":568.3,"y":665.7,"w":303.3,"h":76},"rasgos":{"color_medio":[241,238,244],"contraste_con_fondo":12.8,"fraccion_tinta":0.1051,"area":23053,"area_visible":23053,"pixeles_muestreados":23408}},{"id":1092,"caja":{"x":568.3,"y":665.7,"w":303.3,"h":76},"rasgos":{"color_medio":[241,238,244],"contraste_con_fondo":12.8,"fraccion_tinta":0.1051,"area":23053,"area_visible":23053,"pixeles_muestreados":23408}},{"id":1094,"caja":{"x":568.3,"y":665.7,"w":303.3,"h":76},"rasgos":{"color_medio":[241,238,244],"contraste_con_fondo":12.8,"fraccion_tinta":0.1051,"area":23053,"area_visible":23053,"pixeles_muestreados":23408}},{"id":1105,"caja":{"x":626.3,"y":683.7,"w":210.1,"h":37},"rasgos":{"color_medio":[240,240,240],"contraste_con_fondo":13.9,"fraccion_tinta":0.1613,"area":7774,"area_visible":7774,"pixeles_muestreados":8018}},{"id":1110,"caja":{"x":568.3,"y":751.7,"w":303.3,"h":76},"rasgos":{"color_medio":[240,237,243],"contraste_con_fondo":14.5,"fraccion_tinta":0.1129,"area":23053,"area_visible":23053,"pixeles_muestreados":23408}},{"id":1112,"caja":{"x":568.3,"y":751.7,"w":303.3,"h":76},"rasgos":{"color_medio":[240,237,243],"contraste_con_fondo":14.5,"fraccion_tinta":0.1129,"area":23053,"area_visible":23053,"pixeles_muestreados":23408}},{"id":1114,"caja":{"x":568.3,"y":751.7,"w":303.3,"h":76},"rasgos":{"color_medio":[240,237,243],"contraste_con_fondo":14.5,"fraccion_tinta":0.1129,"area":23053,"area_visible":23053,"pixeles_muestreados":23408}},{"id":1125,"caja":{"x":626.3,"y":769.7,"w":183.1,"h":37},"rasgos":{"color_medio":[235,235,235],"contraste_con_fondo":22.5,"fraccion_tinta":0.2111,"area":6776,"area_visible":6776,"pixeles_muestreados":6992}},{"id":1391,"caja":{"x":926.7,"y":598.6,"w":373.3,"h":1147.7},"rasgos":{"color_medio":[231,237,234],"contraste_con_fondo":24.6,"fraccion_tinta":0.1018,"area":428482,"area_visible":112518,"pixeles_muestreados":112948}},{"id":1393,"caja":{"x":926.7,"y":598.6,"w":373.3,"h":1147.7},"rasgos":{"color_medio":[231,237,234],"contraste_con_fondo":24.6,"fraccion_tinta":0.1018,"area":428482,"area_visible":112518,"pixeles_muestreados":112948}}],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[250,2],[287,250],[378,287],[380,378],[384,380],[386,384],[388,386],[392,384],[394,392],[396,394],[400,392],[402,400],[406,392],[408,406],[412,392],[414,412],[418,392],[420,418],[429,380],[431,429],[435,431],[439,435],[441,439],[443,441],[452,380],[456,452],[458,456],[462,458],[464,462],[468,464],[483,462],[485,483],[487,485],[489,487],[491,489],[492,491],[493,492],[494,493],[495,494],[496,494],[497,496],[558,380],[562,558],[571,562],[573,571],[578,573],[580,578],[582,580],[586,582],[587,586],[588,587],[589,588],[590,589],[591,582],[592,591],[593,592],[594,593],[595,594],[596,582],[597,596],[598,597],[599,598],[600,599],[652,582],[653,652],[654,653],[655,654],[656,655],[668,582],[669,668],[670,669],[671,670],[672,671],[792,582],[793,792],[794,793],[795,794],[796,795],[823,582],[824,823],[825,824],[826,825],[827,826],[835,380],[851,835],[856,851],[858,856],[860,858],[862,860],[866,862],[868,866],[870,868],[888,870],[890,888],[892,890],[893,892],[895,893],[896,895],[898,896],[950,860],[954,950],[956,954],[960,956],[962,960],[966,962],[967,966],[969,962],[971,969],[973,971],[975,973],[977,975],[979,977],[981,979],[982,981],[983,982],[985,979],[986,985],[988,979],[990,979],[1071,956],[1073,1071],[1077,1073],[1078,1077],[1080,1073],[1082,1080],[1084,1082],[1086,1084],[1088,1086],[1090,1088],[1092,1090],[1094,1092],[1096,1094],[1098,1096],[1099,1098],[1101,1096],[1102,1101],[1105,1094],[1106,1105],[1110,1088],[1112,1110],[1114,1112],[1116,1114],[1118,1116],[1119,1118],[1121,1116],[1122,1121],[1125,1114],[1126,1125],[1195,1073],[1196,1195],[1197,1196],[1197,1196],[1198,1195],[1201,1071],[1205,1201],[1206,1205],[1391,950],[1393,1391],[1395,1393],[1397,1395],[1414,1397],[1416,1414],[1418,1416],[1420,1418],[1424,1420],[1428,1424],[1430,1428],[1432,1430],[1433,1430],[1440,1424],[1442,1440],[1444,1442],[1445,1442],[1452,1424],[1454,1452],[1456,1454],[1457,1454]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"0c66a7859fe9018524464e8785b25362c0bb9bfb0c60e0857097b8d805c157c6","wireframe":"e410b146fe00b5bf469e5299a30e79195749770eed5171023b22bcfa4c5c0669"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.