# Ejecución 1.0.0

Evalúa solo G4, captura captures/L07.

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
{"pagina":{"id":"L07","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:19:15.671Z","sanity_ok":null,"consent_limpio":null},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[248,248,248],"g4_conjuntos_pares_total":15,"g4_conjuntos_pares":[{"conjunto":"g4:DIV#raiz","clave":"DIV#raiz","id_padre":null,"padre_raiz_virtual":true,"n":2,"area_visible_total":1648716,"parcial":true,"mediana_contraste":243.8,"mediana_area":1296000,"atipicos_geometricos":[],"miembros":[{"id":427,"caja":{"x":-472.1,"y":0,"w":1440,"h":900},"rasgos":{"color_medio":[134,96,99],"contraste_con_fondo":241.5,"fraccion_tinta":0.7633,"area":1296000,"area_visible":871116,"pixeles_muestreados":871200}},{"id":777,"caja":{"x":-576,"y":0,"w":1440,"h":900},"rasgos":{"color_medio":[132,93,96],"contraste_con_fondo":246.1,"fraccion_tinta":0.7618,"area":1296000,"area_visible":777600,"pixeles_muestreados":777600}}]},{"conjunto":"g4:DIV#929","clave":"DIV#929","id_padre":929,"padre_raiz_virtual":false,"n":2,"area_visible_total":842489,"parcial":false,"mediana_contraste":233.8,"mediana_area":421245,"atipicos_geometricos":[935],"miembros":[{"id":935,"caja":{"x":0,"y":0,"w":1440,"h":580},"rasgos":{"color_medio":[142,81,74],"contraste_con_fondo":263.4,"fraccion_tinta":0.7939,"area":835200,"area_visible":835200,"pixeles_muestreados":835200}},{"id":2779,"caja":{"x":1268.2,"y":832,"w":151.8,"h":48},"rasgos":{"color_medio":[217,157,68],"contraste_con_fondo":204.1,"fraccion_tinta":0.9768,"area":7289,"area_visible":7289,"pixeles_muestreados":7296}}]},{"conjunto":"g4:SECTION#929","clave":"SECTION#929","id_padre":929,"padre_raiz_virtual":false,"n":2,"area_visible_total":460800,"parcial":true,"mediana_contraste":221.6,"mediana_area":237600,"atipicos_geometricos":[1130,1380],"miembros":[{"id":1130,"caja":{"x":0,"y":580,"w":1440,"h":140},"rasgos":{"color_medio":[87,85,80],"contraste_con_fondo":284.1,"fraccion_tinta":0.9217,"area":201600,"area_visible":201600,"pixeles_muestreados":201600}},{"id":1380,"caja":{"x":0,"y":720,"w":1440,"h":190},"rasgos":{"color_medio":[149,145,178],"contraste_con_fondo":159.1,"fraccion_tinta":0.5777,"area":273600,"area_visible":259200,"pixeles_muestreados":259200}}]},{"conjunto":"g4:DIV#183","clave":"DIV#183","id_padre":183,"padre_raiz_virtual":false,"n":2,"area_visible_total":144000,"parcial":false,"mediana_contraste":17.3,"mediana_area":72000,"atipicos_geometricos":[],"miembros":[{"id":184,"caja":{"x":0,"y":0,"w":1440,"h":36},"rasgos":{"color_medio":[248,248,246],"contraste_con_fondo":2,"fraccion_tinta":0.0749,"area":51840,"area_visible":51840,"pixeles_muestreados":51840}},{"id":400,"caja":{"x":0,"y":36,"w":1440,"h":64},"rasgos":{"color_medio":[241,226,225],"contraste_con_fondo":32.6,"fraccion_tinta":0.1209,"area":92160,"area_visible":92160,"pixeles_muestreados":92160}}]},{"conjunto":"g4:LI#782","clave":"LI#782","id_padre":782,"padre_raiz_virtual":false,"n":4,"area_visible_total":52225,"parcial":false,"mediana_contraste":333.4,"mediana_area":12568,"atipicos_geometricos":[788,811],"miembros":[{"id":788,"caja":{"x":100,"y":213,"w":140.9,"h":140.2},"rasgos":{"color_medio":[153,67,63],"contraste_con_fondo":275.7,"fraccion_tinta":0.8164,"area":19749,"area_visible":19749,"pixeles_muestreados":19881}},{"id":811,"caja":{"x":100,"y":384.3,"w":209.5,"h":113},"rasgos":{"color_medio":[87,22,21],"contraste_con_fondo":358.5,"fraccion_tinta":0.9622,"area":23669,"area_visible":23669,"pixeles_muestreados":23940}},{"id":830,"caja":{"x":100,"y":528.5,"w":131.5,"h":26},"rasgos":{"color_medio":[90,46,45],"contraste_con_fondo":327.1,"fraccion_tinta":0.8799,"area":3420,"area_visible":3420,"pixeles_muestreados":3564}},{"id":835,"caja":{"x":100,"y":575.1,"w":207.2,"h":26},"rasgos":{"color_medio":[58,49,49],"contraste_con_fondo":339.6,"fraccion_tinta":1,"area":5387,"area_visible":5387,"pixeles_muestreados":5616}}]},{"conjunto":"g4:LI#432","clave":"LI#432","id_padre":432,"padre_raiz_virtual":false,"n":2,"area_visible_total":51420,"parcial":false,"mediana_contraste":196.1,"mediana_area":25710,"atipicos_geometricos":[540],"miembros":[{"id":540,"caja":{"x":689.8,"y":213,"w":218.1,"h":221.7},"rasgos":{"color_medio":[178,120,116],"contraste_con_fondo":196.7,"fraccion_tinta":0.945,"area":48359,"area_visible":48359,"pixeles_muestreados":48618}},{"id":575,"caja":{"x":689.8,"y":465.9,"w":117.7,"h":26},"rasgos":{"color_medio":[163,135,113],"contraste_con_fondo":195.5,"fraccion_tinta":1,"area":3061,"area_visible":3061,"pixeles_muestreados":3213}}]},{"conjunto":"g4:FIELDSET#1138","clave":"FIELDSET#1138","id_padre":1138,"padre_raiz_virtual":false,"n":2,"area_visible_total":24480,"parcial":false,"mediana_contraste":252.3,"mediana_area":12240,"atipicos_geometricos":[1158],"miembros":[{"id":1158,"caja":{"x":470,"y":664,"w":821.8,"h":22},"rasgos":{"color_medio":[87,87,87],"contraste_con_fondo":278.9,"fraccion_tinta":0.9865,"area":18080,"area_visible":18080,"pixeles_muestreados":18084}},{"id":1164,"caja":{"x":931,"y":614,"w":160,"h":40},"rasgos":{"color_medio":[232,178,34],"contraste_con_fondo":225.7,"fraccion_tinta":1,"area":6400,"area_visible":6400,"pixeles_muestreados":6400}}]},{"conjunto":"g4:DIV#185","clave":"DIV#185","id_padre":185,"padre_raiz_virtual":false,"n":2,"area_visible_total":17348,"parcial":false,"mediana_contraste":26.9,"mediana_area":8674,"atipicos_geometricos":[],"miembros":[{"id":186,"caja":{"x":0,"y":0,"w":320.1,"h":26},"rasgos":{"color_medio":[243,241,231],"contraste_con_fondo":19.1,"fraccion_tinta":0.2164,"area":8323,"area_visible":8323,"pixeles_muestreados":8346}},{"id":208,"caja":{"x":838.6,"y":8,"w":501.4,"h":18},"rasgos":{"color_medio":[228,228,228],"contraste_con_fondo":34.6,"fraccion_tinta":0.2299,"area":9025,"area_visible":9025,"pixeles_muestreados":9036}}]},{"conjunto":"g4:LI#546","clave":"LI#546","id_padre":546,"padre_raiz_virtual":false,"n":7,"area_visible_total":13718,"parcial":false,"mediana_contraste":142.3,"mediana_area":1801,"atipicos_geometricos":[547,559,563,567,571],"miembros":[{"id":547,"caja":{"x":721.8,"y":252.6,"w":186.1,"h":19},"rasgos":{"color_medio":[165,100,96],"contraste_con_fondo":227.8,"fraccion_tinta":0.9866,"area":3536,"area_visible":3536,"pixeles_muestreados":3740}},{"id":551,"caja":{"x":721.8,"y":279.8,"w":125.9,"h":19},"rasgos":{"color_medio":[201,154,152],"contraste_con_fondo":142.3,"fraccion_tinta":0.8583,"area":2392,"area_visible":2392,"pixeles_muestreados":2540}},{"id":555,"caja":{"x":721.8,"y":307,"w":94.8,"h":19},"rasgos":{"color_medio":[216,172,171],"contraste_con_fondo":112.8,"fraccion_tinta":0.8984,"area":1801,"area_visible":1801,"pixeles_muestreados":1920}},{"id":559,"caja":{"x":721.8,"y":334.2,"w":138,"h":19},"rasgos":{"color_medio":[207,171,169],"contraste_con_fondo":117.7,"fraccion_tinta":0.9302,"area":2622,"area_visible":2622,"pixeles_muestreados":2780}},{"id":563,"caja":{"x":721.8,"y":361.3,"w":63.4,"h":19},"rasgos":{"color_medio":[178,127,125],"contraste_con_fondo":186.2,"fraccion_tinta":0.9615,"area":1205,"area_visible":1205,"pixeles_muestreados":1300}},{"id":567,"caja":{"x":721.8,"y":388.5,"w":77.3,"h":19},"rasgos":{"color_medio":[177,96,95],"contraste_con_fondo":227.1,"fraccion_tinta":0.9715,"area":1469,"area_visible":1469,"pixeles_muestreados":1580}},{"id":571,"caja":{"x":721.8,"y":415.7,"w":36.5,"h":19},"rasgos":{"color_medio":[210,187,184],"contraste_con_fondo":96.2,"fraccion_tinta":0.9566,"area":693,"area_visible":693,"pixeles_muestreados":760}}]},{"conjunto":"g4:LI#419","clave":"LI#419","id_padre":419,"padre_raiz_virtual":false,"n":4,"area_visible_total":12312,"parcial":false,"mediana_contraste":58,"mediana_area":1674,"atipicos_geometricos":[420],"miembros":[{"id":420,"caja":{"x":210,"y":36,"w":119.2,"h":64},"rasgos":{"color_medio":[202,49,38],"contraste_con_fondo":292.9,"fraccion_tinta":0.9637,"area":7628,"area_visible":7628,"pixeles_muestreados":7680}},{"id":580,"caja":{"x":357.2,"y":58,"w":74.3,"h":18},"rasgos":{"color_medio":[218,218,218],"contraste_con_fondo":52,"fraccion_tinta":0.2578,"area":1337,"area_visible":1337,"pixeles_muestreados":1350}},{"id":714,"caja":{"x":471.5,"y":58,"w":102.6,"h":18},"rasgos":{"color_medio":[214,214,214],"contraste_con_fondo":58.9,"fraccion_tinta":0.3002,"area":1847,"area_visible":1847,"pixeles_muestreados":1872}},{"id":769,"caja":{"x":614.1,"y":58,"w":83.3,"h":18},"rasgos":{"color_medio":[215,215,215],"contraste_con_fondo":57.2,"fraccion_tinta":0.2784,"area":1500,"area_visible":1500,"pixeles_muestreados":1512}}]},{"conjunto":"g4:DIV#213","clave":"DIV#213","id_padre":213,"padre_raiz_virtual":false,"n":3,"area_visible_total":8014,"parcial":false,"mediana_contraste":39.8,"mediana_area":1848,"atipicos_geometricos":[215],"miembros":[{"id":215,"caja":{"x":838.6,"y":9,"w":261.7,"h":17},"rasgos":{"color_medio":[225,225,225],"contraste_con_fondo":39.8,"fraccion_tinta":0.2599,"area":4448,"area_visible":4448,"pixeles_muestreados":4471}},{"id":308,"caja":{"x":1120.3,"y":9,"w":101.1,"h":17},"rasgos":{"color_medio":[227,227,227],"contraste_con_fondo":36.4,"fraccion_tinta":0.2474,"area":1718,"area_visible":1718,"pixeles_muestreados":1734}},{"id":319,"caja":{"x":1237.3,"y":8,"w":102.7,"h":18},"rasgos":{"color_medio":[224,224,224],"contraste_con_fondo":41.6,"fraccion_tinta":0.2621,"area":1848,"area_visible":1848,"pixeles_muestreados":1854}}]},{"conjunto":"g4:LI#817","clave":"LI#817","id_padre":817,"padre_raiz_virtual":false,"n":3,"area_visible_total":7438,"parcial":false,"mediana_contraste":385.8,"mediana_area":2069,"atipicos_geometricos":[818,822],"miembros":[{"id":818,"caja":{"x":132,"y":423.9,"w":108.9,"h":19},"rasgos":{"color_medio":[104,46,47],"contraste_con_fondo":319.3,"fraccion_tinta":0.906,"area":2069,"area_visible":2069,"pixeles_muestreados":2180}},{"id":822,"caja":{"x":132,"y":451.1,"w":177.5,"h":19},"rasgos":{"color_medio":[74,6,3],"contraste_con_fondo":385.8,"fraccion_tinta":1,"area":3373,"area_visible":3373,"pixeles_muestreados":3560}},{"id":826,"caja":{"x":132,"y":478.3,"w":105.1,"h":19},"rasgos":{"color_medio":[64,3,1],"contraste_con_fondo":393.6,"fraccion_tinta":1,"area":1996,"area_visible":1996,"pixeles_muestreados":2120}}]},{"conjunto":"g4:LI#794","clave":"LI#794","id_padre":794,"padre_raiz_virtual":false,"n":4,"area_visible_total":6828,"parcial":false,"mediana_contraste":295.9,"mediana_area":1825,"atipicos_geometricos":[795,807],"miembros":[{"id":795,"caja":{"x":132,"y":252.6,"w":108.9,"h":19},"rasgos":{"color_medio":[98,2,1],"contraste_con_fondo":379.5,"fraccion_tinta":1,"area":2069,"area_visible":2069,"pixeles_muestreados":2180}},{"id":799,"caja":{"x":132,"y":279.8,"w":87,"h":19},"rasgos":{"color_medio":[211,72,61],"contraste_con_fondo":259.4,"fraccion_tinta":0.9165,"area":1654,"area_visible":1654,"pixeles_muestreados":1760}},{"id":803,"caja":{"x":132,"y":307,"w":58.4,"h":19},"rasgos":{"color_medio":[157,26,18],"contraste_con_fondo":332.4,"fraccion_tinta":1,"area":1109,"area_visible":1109,"pixeles_muestreados":1180}},{"id":807,"caja":{"x":132,"y":334.2,"w":105.1,"h":19},"rasgos":{"color_medio":[182,150,150],"contraste_con_fondo":153.5,"fraccion_tinta":0.45,"area":1996,"area_visible":1996,"pixeles_muestreados":2120}}]},{"conjunto":"g4:LI#195","clave":"LI#195","id_padre":195,"padre_raiz_virtual":false,"n":3,"area_visible_total":6605,"parcial":false,"mediana_contraste":41.6,"mediana_area":1057,"atipicos_geometricos":[196],"miembros":[{"id":196,"caja":{"x":0,"y":0,"w":174.7,"h":26},"rasgos":{"color_medio":[248,243,226],"contraste_con_fondo":22.6,"fraccion_tinta":0.2631,"area":4542,"area_visible":4542,"pixeles_muestreados":4550}},{"id":200,"caja":{"x":182.7,"y":9,"w":59.2,"h":17},"rasgos":{"color_medio":[223,223,223],"contraste_con_fondo":43.3,"fraccion_tinta":0.2931,"area":1006,"area_visible":1006,"pixeles_muestreados":1020}},{"id":204,"caja":{"x":257.9,"y":9,"w":62.2,"h":17},"rasgos":{"color_medio":[224,224,224],"contraste_con_fondo":41.6,"fraccion_tinta":0.2849,"area":1057,"area_visible":1057,"pixeles_muestreados":1088}}]},{"conjunto":"g4:LI#860","clave":"LI#860","id_padre":860,"padre_raiz_virtual":false,"n":2,"area_visible_total":6200,"parcial":false,"mediana_contraste":44.2,"mediana_area":3100,"atipicos_geometricos":[866],"miembros":[{"id":861,"caja":{"x":1148,"y":55,"w":24,"h":25},"rasgos":{"color_medio":[224,224,224],"contraste_con_fondo":41.6,"fraccion_tinta":0.2367,"area":600,"area_visible":600,"pixeles_muestreados":600}},{"id":866,"caja":{"x":1200,"y":48,"w":140,"h":40},"rasgos":{"color_medio":[221,221,221],"contraste_con_fondo":46.8,"fraccion_tinta":0.2129,"area":5600,"area_visible":5600,"pixeles_muestreados":5600}}]}],"g4_banner_candidatos":[{"id":183,"nodeName":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":100},"contiene_accionables":13},{"id":184,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":36},"contiene_accionables":6},{"id":185,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1340,"h":26},"contiene_accionables":6},{"id":400,"nodeName":"DIV","caja":{"x":0,"y":36,"w":1440,"h":64},"contiene_accionables":7},{"id":402,"nodeName":"DIV","caja":{"x":100,"y":36,"w":1240,"h":64},"contiene_accionables":7}],"g4_cromo_candidatos":[{"id":183,"caja":{"x":0,"y":0,"w":1440,"h":100},"rasgos":{"color_medio":[243,234,233],"contraste_con_fondo":21.1,"fraccion_tinta":0.1043,"area":144000,"area_visible":144000,"pixeles_muestreados":144000}},{"id":184,"caja":{"x":0,"y":0,"w":1440,"h":36},"rasgos":{"color_medio":[248,248,246],"contraste_con_fondo":2,"fraccion_tinta":0.0749,"area":51840,"area_visible":51840,"pixeles_muestreados":51840}},{"id":185,"caja":{"x":0,"y":0,"w":1340,"h":26},"rasgos":{"color_medio":[245,245,242],"contraste_con_fondo":7.3,"fraccion_tinta":0.1115,"area":34840,"area_visible":34840,"pixeles_muestreados":34840}},{"id":186,"caja":{"x":0,"y":0,"w":320.1,"h":26},"rasgos":{"color_medio":[243,241,231],"contraste_con_fondo":19.1,"fraccion_tinta":0.2164,"area":8323,"area_visible":8323,"pixeles_muestreados":8346}},{"id":195,"caja":{"x":0,"y":0,"w":320.1,"h":26},"rasgos":{"color_medio":[243,241,231],"contraste_con_fondo":19.1,"fraccion_tinta":0.2164,"area":8323,"area_visible":8323,"pixeles_muestreados":8346}},{"id":196,"caja":{"x":0,"y":0,"w":174.7,"h":26},"rasgos":{"color_medio":[248,243,226],"contraste_con_fondo":22.6,"fraccion_tinta":0.2631,"area":4542,"area_visible":4542,"pixeles_muestreados":4550}},{"id":197,"caja":{"x":0,"y":0,"w":174.7,"h":26},"rasgos":{"color_medio":[248,243,226],"contraste_con_fondo":22.6,"fraccion_tinta":0.2631,"area":4542,"area_visible":4542,"pixeles_muestreados":4550}}],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[178,2],[183,178],[184,183],[185,184],[186,185],[195,186],[196,195],[197,196],[198,197],[199,197],[200,195],[201,200],[203,201],[204,195],[205,204],[207,205],[208,185],[213,208],[215,213],[216,215],[217,216],[217,216],[218,216],[219,216],[220,219],[308,213],[309,308],[309,308],[310,308],[311,310],[319,213],[320,319],[321,320],[321,320],[322,320],[322,320],[325,320],[326,325],[400,183],[401,400],[402,400],[410,402],[411,410],[412,411],[413,410],[418,413],[419,418],[420,419],[421,420],[422,421],[422,421],[423,421],[426,null],[427,null],[428,427],[429,428],[430,428],[432,428],[540,432],[541,540],[546,540],[547,546],[548,547],[549,548],[550,549],[551,546],[552,551],[555,546],[556,555],[559,546],[560,559],[563,546],[564,563],[567,546],[568,567],[571,546],[572,571],[575,432],[576,575],[580,419],[581,580],[583,581],[583,581],[584,581],[587,null],[714,419],[715,714],[717,715],[717,715],[718,715],[721,null],[769,419],[770,769],[772,770],[772,770],[773,770],[776,null],[777,null],[778,777],[779,778],[780,778],[781,780],[782,778],[788,782],[789,788],[790,789],[791,789],[792,791],[792,791],[794,788],[795,794],[796,795],[797,796],[798,797],[799,794],[800,799],[801,800],[802,801],[803,794],[804,803],[805,804],[806,805],[807,794],[808,807],[809,808],[810,809],[811,782],[812,811],[813,812],[814,812],[815,814],[815,814],[817,811],[818,817],[819,818],[820,819],[821,820],[822,817],[823,822],[824,823],[825,824],[826,817],[827,826],[828,827],[829,828],[830,782],[831,830],[832,831],[833,831],[834,833],[834,833],[835,782],[836,835],[837,836],[838,836],[839,838],[839,838],[860,402],[861,860],[862,861],[864,862],[865,864],[865,864],[866,860],[867,866],[869,867],[870,869],[870,869],[871,867],[872,871],[929,178],[935,929],[953,935],[954,953],[959,954],[960,953],[1101,929],[1130,929],[1131,1130],[1132,1131],[1138,1132],[1158,1138],[1159,1158],[1162,1159],[1163,1162],[1164,1138],[1165,1164],[1167,1165],[1168,1167],[1380,929],[1381,1380],[1382,1381],[1388,1382],[1389,1382],[1391,1389],[1396,1391],[1403,1389],[1404,1403],[1405,1389],[1406,1405],[1408,1406],[1409,1408],[2779,929],[2780,2779],[2781,2780],[2781,2780],[2782,2779],[2783,2782]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"8ae125fa0c8044a73b660f2efaf0fe5d92d488118bf5b6680ab6166b444afbab","wireframe":"ec8c745e413403243ea6f91a9e69e798bcaea66ccef5109fb3d26c730f2690ca"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.