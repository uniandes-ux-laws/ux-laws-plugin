# Ejecución 1.0.0

Evalúa solo G4, captura captures/L10.

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
{"pagina":{"id":"L10","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:19:46.711Z","sanity_ok":null,"consent_limpio":null},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[0,48,160],"g4_conjuntos_pares_total":20,"g4_conjuntos_pares":[{"conjunto":"g4:DIV#3139","clave":"DIV#3139","id_padre":3139,"padre_raiz_virtual":false,"n":3,"area_visible_total":1828128,"parcial":true,"mediana_contraste":95.8,"mediana_area":965568,"atipicos_geometricos":[3196,3567],"miembros":[{"id":3196,"caja":{"x":-1440,"y":190,"w":5760,"h":450},"rasgos":{"color_medio":[16,62,155],"contraste_con_fondo":21.8,"fraccion_tinta":0.102,"area":2592000,"area_visible":648000,"pixeles_muestreados":648000}},{"id":3362,"caja":{"x":0,"y":0,"w":1284,"h":752},"rasgos":{"color_medio":[70,108,186],"contraste_con_fondo":95.8,"fraccion_tinta":0.4095,"area":965568,"area_visible":965568,"pixeles_muestreados":965568}},{"id":3567,"caja":{"x":0,"y":751,"w":1440,"h":629},"rasgos":{"color_medio":[242,244,249],"contraste_con_fondo":323.9,"fraccion_tinta":1,"area":905760,"area_visible":214560,"pixeles_muestreados":214560}}]},{"conjunto":"g4:DIV#3379","clave":"DIV#3379","id_padre":3379,"padre_raiz_virtual":false,"n":4,"area_visible_total":1638222,"parcial":false,"mediana_contraste":92,"mediana_area":434386,"atipicos_geometricos":[3431,3456],"miembros":[{"id":3381,"caja":{"x":0,"y":0,"w":437.1,"h":752},"rasgos":{"color_medio":[66,107,189],"contraste_con_fondo":93.2,"fraccion_tinta":0.3872,"area":328695,"area_visible":328695,"pixeles_muestreados":329376}},{"id":3406,"caja":{"x":0,"y":0,"w":718.2,"h":752},"rasgos":{"color_medio":[64,105,190],"contraste_con_fondo":90.8,"fraccion_tinta":0.3734,"area":540077,"area_visible":540077,"pixeles_muestreados":540688}},{"id":3431,"caja":{"x":0,"y":0,"w":999.3,"h":752},"rasgos":{"color_medio":[62,104,190],"contraste_con_fondo":88.8,"fraccion_tinta":0.366,"area":751460,"area_visible":751460,"pixeles_muestreados":752000}},{"id":3456,"caja":{"x":999.3,"y":688,"w":281.1,"h":64},"rasgos":{"color_medio":[242,246,255],"contraste_con_fondo":326.8,"fraccion_tinta":1,"area":17990,"area_visible":17990,"pixeles_muestreados":18048}}]},{"conjunto":"g4:DIV#299","clave":"DIV#299","id_padre":299,"padre_raiz_virtual":false,"n":2,"area_visible_total":1569600,"parcial":true,"mediana_contraste":133.7,"mediana_area":10022040,"atipicos_geometricos":[3138],"miembros":[{"id":325,"caja":{"x":0,"y":0,"w":1440,"h":190},"rasgos":{"color_medio":[87,132,220],"contraste_con_fondo":135,"fraccion_tinta":0.7599,"area":273600,"area_visible":273600,"pixeles_muestreados":273600}},{"id":3138,"caja":{"x":-1440,"y":0,"w":5760,"h":3432.4},"rasgos":{"color_medio":[97,130,197],"contraste_con_fondo":132.3,"fraccion_tinta":0.5003,"area":19770480,"area_visible":1296000,"pixeles_muestreados":1296000}}]},{"conjunto":"g4:DIV#3568","clave":"DIV#3568","id_padre":3568,"padre_raiz_virtual":false,"n":2,"area_visible_total":1318320,"parcial":true,"mediana_contraste":227.8,"mediana_area":967320,"atipicos_geometricos":[3644,3672],"miembros":[{"id":3644,"caja":{"x":0,"y":751,"w":1440,"h":113},"rasgos":{"color_medio":[240,243,250],"contraste_con_fondo":322.1,"fraccion_tinta":1,"area":162720,"area_visible":162720,"pixeles_muestreados":162720}},{"id":3672,"caja":{"x":0,"y":0,"w":1284,"h":1380},"rasgos":{"color_medio":[98,131,196],"contraste_con_fondo":133.4,"fraccion_tinta":0.5066,"area":1771920,"area_visible":1155600,"pixeles_muestreados":1155600}}]},{"conjunto":"g4:DIV#3204","clave":"DIV#3204","id_padre":3204,"padre_raiz_virtual":false,"n":2,"area_visible_total":649288,"parcial":false,"mediana_contraste":45.4,"mediana_area":324644,"atipicos_geometricos":[3224],"miembros":[{"id":3224,"caja":{"x":0,"y":190,"w":1440,"h":450},"rasgos":{"color_medio":[16,62,155],"contraste_con_fondo":21.8,"fraccion_tinta":0.102,"area":648000,"area_visible":648000,"pixeles_muestreados":648000}},{"id":3284,"caja":{"x":674,"y":606,"w":92,"h":14},"rasgos":{"color_medio":[51,94,165],"contraste_con_fondo":68.9,"fraccion_tinta":0.5093,"area":1288,"area_visible":1288,"pixeles_muestreados":1288}}]},{"conjunto":"g4:LI#3683","clave":"LI#3683","id_padre":3683,"padre_raiz_virtual":false,"n":3,"area_visible_total":442629,"parcial":true,"mediana_contraste":330.5,"mediana_area":14140,"atipicos_geometricos":[3685],"miembros":[{"id":3685,"caja":{"x":0,"y":0,"w":487.1,"h":944.5},"rasgos":{"color_medio":[94,129,199],"contraste_con_fondo":130.1,"fraccion_tinta":0.4848,"area":460090,"area_visible":438413,"pixeles_muestreados":439200}},{"id":3712,"caja":{"x":641,"y":882,"w":226.2,"h":62.5},"rasgos":{"color_medio":[248,248,248],"contraste_con_fondo":330.5,"fraccion_tinta":1,"area":14140,"area_visible":4072,"pixeles_muestreados":4086}},{"id":3738,"caja":{"x":1091,"y":882,"w":8,"h":48},"rasgos":{"color_medio":[248,248,248],"contraste_con_fondo":330.5,"fraccion_tinta":1,"area":384,"area_visible":144,"pixeles_muestreados":162}}]},{"conjunto":"g4:SECTION#330","clave":"SECTION#330","id_padre":330,"padre_raiz_virtual":false,"n":2,"area_visible_total":273600,"parcial":false,"mediana_contraste":191,"mediana_area":136800,"atipicos_geometricos":[332,347],"miembros":[{"id":332,"caja":{"x":0,"y":0,"w":1440,"h":48},"rasgos":{"color_medio":[218,230,254],"contraste_con_fondo":299.1,"fraccion_tinta":0.9967,"area":69120,"area_visible":69120,"pixeles_muestreados":69120}},{"id":347,"caja":{"x":0,"y":48,"w":1440,"h":142},"rasgos":{"color_medio":[43,99,209],"contraste_con_fondo":82.8,"fraccion_tinta":0.6799,"area":204480,"area_visible":204480,"pixeles_muestreados":204480}}]},{"conjunto":"g4:DIV#347","clave":"DIV#347","id_padre":347,"padre_raiz_virtual":false,"n":2,"area_visible_total":129408,"parcial":false,"mediana_contraste":68.8,"mediana_area":64704,"atipicos_geometricos":[349,3125],"miembros":[{"id":349,"caja":{"x":156,"y":68,"w":1128,"h":56},"rasgos":{"color_medio":[83,135,215],"contraste_con_fondo":132.2,"fraccion_tinta":1,"area":63168,"area_visible":63168,"pixeles_muestreados":63168}},{"id":3125,"caja":{"x":0,"y":144,"w":1440,"h":46},"rasgos":{"color_medio":[2,53,161],"contraste_con_fondo":5.5,"fraccion_tinta":0.0118,"area":66240,"area_visible":66240,"pixeles_muestreados":66240}}]},{"conjunto":"g4:DIV#351","clave":"DIV#351","id_padre":351,"padre_raiz_virtual":false,"n":2,"area_visible_total":59400,"parcial":false,"mediana_contraste":143.2,"mediana_area":29700,"atipicos_geometricos":[438],"miembros":[{"id":353,"caja":{"x":156,"y":77,"w":109.5,"h":38},"rasgos":{"color_medio":[88,139,248],"contraste_con_fondo":154.2,"fraccion_tinta":1,"area":4156,"area_visible":4156,"pixeles_muestreados":4180}},{"id":438,"caja":{"x":297.5,"y":68,"w":986.5,"h":56},"rasgos":{"color_medio":[85,136,210],"contraste_con_fondo":132.2,"fraccion_tinta":1,"area":55244,"area_visible":55244,"pixeles_muestreados":55272}}]},{"conjunto":"g4:DIV#3655","clave":"DIV#3655","id_padre":3655,"padre_raiz_virtual":false,"n":2,"area_visible_total":41136,"parcial":false,"mediana_contraste":274.3,"mediana_area":20568,"atipicos_geometricos":[3657],"miembros":[{"id":3657,"caja":{"x":156,"y":769,"w":698,"h":48},"rasgos":{"color_medio":[199,215,252],"contraste_con_fondo":275.6,"fraccion_tinta":1,"area":33503,"area_visible":33503,"pixeles_muestreados":33504}},{"id":3663,"caja":{"x":156,"y":828,"w":477,"h":16},"rasgos":{"color_medio":[212,212,212],"contraste_con_fondo":273,"fraccion_tinta":1,"area":7633,"area_visible":7633,"pixeles_muestreados":7648}}]},{"conjunto":"g4:DIV#438","clave":"DIV#438","id_padre":438,"padre_raiz_virtual":false,"n":2,"area_visible_total":26230,"parcial":false,"mediana_contraste":176.4,"mediana_area":13115,"atipicos_geometricos":[3003],"miembros":[{"id":440,"caja":{"x":297.5,"y":87,"w":425.5,"h":18},"rasgos":{"color_medio":[92,142,248],"contraste_con_fondo":158.3,"fraccion_tinta":1,"area":7659,"area_visible":7659,"pixeles_muestreados":7686}},{"id":3003,"caja":{"x":952.4,"y":68,"w":331.6,"h":56},"rasgos":{"color_medio":[145,176,139],"contraste_con_fondo":194.6,"fraccion_tinta":1,"area":18571,"area_visible":18571,"pixeles_muestreados":18592}}]},{"conjunto":"g4:DIV#3463","clave":"DIV#3463","id_padre":3463,"padre_raiz_virtual":false,"n":2,"area_visible_total":6819,"parcial":false,"mediana_contraste":303.1,"mediana_area":3410,"atipicos_geometricos":[3471],"miembros":[{"id":3465,"caja":{"x":1017.8,"y":703,"w":28.8,"h":34},"rasgos":{"color_medio":[224,233,254],"contraste_con_fondo":305.3,"fraccion_tinta":1,"area":978,"area_visible":978,"pixeles_muestreados":1020}},{"id":3471,"caja":{"x":1056.5,"y":702,"w":166.9,"h":35},"rasgos":{"color_medio":[219,231,255],"contraste_con_fondo":300.8,"fraccion_tinta":1,"area":5841,"area_visible":5841,"pixeles_muestreados":5880}}]},{"conjunto":"g4:DIV#3389","clave":"DIV#3389","id_padre":3389,"padre_raiz_virtual":false,"n":2,"area_visible_total":6602,"parcial":false,"mediana_contraste":266.4,"mediana_area":3301,"atipicos_geometricos":[3397],"miembros":[{"id":3391,"caja":{"x":174.5,"y":703,"w":29.5,"h":34},"rasgos":{"color_medio":[186,208,253],"contraste_con_fondo":262.4,"fraccion_tinta":1,"area":1004,"area_visible":1004,"pixeles_muestreados":1054}},{"id":3397,"caja":{"x":214,"y":702,"w":160,"h":35},"rasgos":{"color_medio":[192,213,255],"contraste_con_fondo":270.4,"fraccion_tinta":1,"area":5598,"area_visible":5598,"pixeles_muestreados":5600}}]},{"conjunto":"g4:LI#467","clave":"LI#467","id_padre":467,"padre_raiz_virtual":false,"n":3,"area_visible_total":6507,"parcial":false,"mediana_contraste":165.4,"mediana_area":1854,"atipicos_geometricos":[2816],"miembros":[{"id":469,"caja":{"x":297.5,"y":87,"w":98,"h":18},"rasgos":{"color_medio":[97,145,248],"contraste_con_fondo":163,"fraccion_tinta":1,"area":1763,"area_visible":1763,"pixeles_muestreados":1782}},{"id":1345,"caja":{"x":427.5,"y":87,"w":103,"h":18},"rasgos":{"color_medio":[99,147,248],"contraste_con_fondo":165.4,"fraccion_tinta":1,"area":1854,"area_visible":1854,"pixeles_muestreados":1872}},{"id":2816,"caja":{"x":562.4,"y":87,"w":160.6,"h":18},"rasgos":{"color_medio":[102,149,248],"contraste_con_fondo":168.4,"fraccion_tinta":1,"area":2890,"area_visible":2890,"pixeles_muestreados":2916}}]},{"conjunto":"g4:DIV#3439","clave":"DIV#3439","id_padre":3439,"padre_raiz_virtual":false,"n":2,"area_visible_total":3212,"parcial":false,"mediana_contraste":290,"mediana_area":1606,"atipicos_geometricos":[],"miembros":[{"id":3441,"caja":{"x":770,"y":703,"w":34,"h":34},"rasgos":{"color_medio":[218,229,253],"contraste_con_fondo":298.2,"fraccion_tinta":1,"area":1156,"area_visible":1156,"pixeles_muestreados":1190}},{"id":3447,"caja":{"x":814,"y":711.5,"w":128.5,"h":16},"rasgos":{"color_medio":[202,220,255],"contraste_con_fondo":281.8,"fraccion_tinta":1,"area":2056,"area_visible":2056,"pixeles_muestreados":2210}}]},{"conjunto":"g4:DIV#3414","clave":"DIV#3414","id_padre":3414,"padre_raiz_virtual":false,"n":2,"area_visible_total":3050,"parcial":false,"mediana_contraste":284.3,"mediana_area":1525,"atipicos_geometricos":[],"miembros":[{"id":3416,"caja":{"x":494,"y":703,"w":34,"h":34},"rasgos":{"color_medio":[211,224,253],"contraste_con_fondo":290.1,"fraccion_tinta":1,"area":1156,"area_visible":1156,"pixeles_muestreados":1190}},{"id":3422,"caja":{"x":538,"y":711.5,"w":118.4,"h":16},"rasgos":{"color_medio":[199,218,255],"contraste_con_fondo":278.4,"fraccion_tinta":1,"area":1894,"area_visible":1894,"pixeles_muestreados":2040}}]},{"conjunto":"g4:SPAN#2818","clave":"SPAN#2818","id_padre":2818,"padre_raiz_virtual":false,"n":2,"area_visible_total":2602,"parcial":false,"mediana_contraste":156.8,"mediana_area":1301,"atipicos_geometricos":[2820],"miembros":[{"id":2820,"caja":{"x":562.4,"y":87,"w":136.6,"h":18},"rasgos":{"color_medio":[110,155,249],"contraste_con_fondo":177.4,"fraccion_tinta":1,"area":2458,"area_visible":2458,"pixeles_muestreados":2484}},{"id":2829,"caja":{"x":711,"y":91,"w":12,"h":12},"rasgos":{"color_medio":[70,126,247],"contraste_con_fondo":136.2,"fraccion_tinta":1,"area":144,"area_visible":144,"pixeles_muestreados":156}}]},{"conjunto":"g4:SPAN#1347","clave":"SPAN#1347","id_padre":1347,"padre_raiz_virtual":false,"n":2,"area_visible_total":1566,"parcial":false,"mediana_contraste":157.8,"mediana_area":783,"atipicos_geometricos":[1349],"miembros":[{"id":1349,"caja":{"x":427.5,"y":87,"w":79,"h":18},"rasgos":{"color_medio":[113,156,249],"contraste_con_fondo":179.9,"fraccion_tinta":1,"area":1422,"area_visible":1422,"pixeles_muestreados":1440}},{"id":1358,"caja":{"x":518.4,"y":91,"w":12,"h":12},"rasgos":{"color_medio":[69,126,247],"contraste_con_fondo":135.7,"fraccion_tinta":1,"area":144,"area_visible":144,"pixeles_muestreados":156}}]},{"conjunto":"g4:SPAN#471","clave":"SPAN#471","id_padre":471,"padre_raiz_virtual":false,"n":2,"area_visible_total":1475,"parcial":false,"mediana_contraste":156.8,"mediana_area":738,"atipicos_geometricos":[473],"miembros":[{"id":473,"caja":{"x":297.5,"y":87,"w":74,"h":18},"rasgos":{"color_medio":[111,155,249],"contraste_con_fondo":178,"fraccion_tinta":1,"area":1331,"area_visible":1331,"pixeles_muestreados":1350}},{"id":482,"caja":{"x":383.5,"y":91,"w":12,"h":12},"rasgos":{"color_medio":[69,126,247],"contraste_con_fondo":135.7,"fraccion_tinta":1,"area":144,"area_visible":144,"pixeles_muestreados":156}}]},{"conjunto":"g4:BUTTON#3284","clave":"BUTTON#3284","id_padre":3284,"padre_raiz_virtual":false,"n":4,"area_visible_total":784,"parcial":false,"mediana_contraste":79.1,"mediana_area":196,"atipicos_geometricos":[3286],"miembros":[{"id":3285,"caja":{"x":674,"y":606,"w":14,"h":14},"rasgos":{"color_medio":[54,98,189],"contraste_con_fondo":79.1,"fraccion_tinta":0.8367,"area":196,"area_visible":196,"pixeles_muestreados":196}},{"id":3286,"caja":{"x":700,"y":606,"w":14,"h":14},"rasgos":{"color_medio":[177,192,108],"contraste_con_fondo":234,"fraccion_tinta":0.8367,"area":196,"area_visible":196,"pixeles_muestreados":196}},{"id":3287,"caja":{"x":726,"y":606,"w":14,"h":14},"rasgos":{"color_medio":[54,98,189],"contraste_con_fondo":79.1,"fraccion_tinta":0.8367,"area":196,"area_visible":196,"pixeles_muestreados":196}},{"id":3288,"caja":{"x":752,"y":606,"w":14,"h":14},"rasgos":{"color_medio":[54,98,189],"contraste_con_fondo":79.1,"fraccion_tinta":0.8367,"area":196,"area_visible":196,"pixeles_muestreados":196}}]}],"g4_banner_candidatos":[{"id":325,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":190},"contiene_accionables":7},{"id":326,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":190},"contiene_accionables":7},{"id":328,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":190},"contiene_accionables":7},{"id":330,"nodeName":"HEADER","caja":{"x":0,"y":0,"w":1440,"h":190},"contiene_accionables":7},{"id":332,"nodeName":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":48},"contiene_accionables":1},{"id":347,"nodeName":"SECTION","caja":{"x":0,"y":48,"w":1440,"h":142},"contiene_accionables":6},{"id":349,"nodeName":"DIV","caja":{"x":156,"y":68,"w":1128,"h":56},"contiene_accionables":6},{"id":351,"nodeName":"NAV","caja":{"x":156,"y":68,"w":1128,"h":56},"contiene_accionables":6},{"id":3125,"nodeName":"DIV","caja":{"x":0,"y":144,"w":1440,"h":46},"contiene_accionables":0},{"id":3196,"nodeName":"DIV","caja":{"x":-1440,"y":190,"w":5760,"h":450},"contiene_accionables":5},{"id":3197,"nodeName":"DIV","caja":{"x":-1440,"y":190,"w":5760,"h":450},"contiene_accionables":5},{"id":3198,"nodeName":"DIV","caja":{"x":-1440,"y":190,"w":5760,"h":450},"contiene_accionables":5},{"id":3200,"nodeName":"DIV","caja":{"x":-1440,"y":190,"w":5760,"h":450},"contiene_accionables":5},{"id":3204,"nodeName":"DIV","caja":{"x":-1440,"y":190,"w":5760,"h":450},"contiene_accionables":5}],"g4_cromo_candidatos":[{"id":3196,"caja":{"x":-1440,"y":190,"w":5760,"h":450},"rasgos":{"color_medio":[16,62,155],"contraste_con_fondo":21.8,"fraccion_tinta":0.102,"area":2592000,"area_visible":648000,"pixeles_muestreados":648000}},{"id":3197,"caja":{"x":-1440,"y":190,"w":5760,"h":450},"rasgos":{"color_medio":[16,62,155],"contraste_con_fondo":21.8,"fraccion_tinta":0.102,"area":2592000,"area_visible":648000,"pixeles_muestreados":648000}},{"id":3198,"caja":{"x":-1440,"y":190,"w":5760,"h":450},"rasgos":{"color_medio":[16,62,155],"contraste_con_fondo":21.8,"fraccion_tinta":0.102,"area":2592000,"area_visible":648000,"pixeles_muestreados":648000}},{"id":3200,"caja":{"x":-1440,"y":190,"w":5760,"h":450},"rasgos":{"color_medio":[16,62,155],"contraste_con_fondo":21.8,"fraccion_tinta":0.102,"area":2592000,"area_visible":648000,"pixeles_muestreados":648000}},{"id":3204,"caja":{"x":-1440,"y":190,"w":5760,"h":450},"rasgos":{"color_medio":[16,62,155],"contraste_con_fondo":21.8,"fraccion_tinta":0.102,"area":2592000,"area_visible":648000,"pixeles_muestreados":648000}},{"id":3224,"caja":{"x":0,"y":190,"w":1440,"h":450},"rasgos":{"color_medio":[16,62,155],"contraste_con_fondo":21.8,"fraccion_tinta":0.102,"area":648000,"area_visible":648000,"pixeles_muestreados":648000}}],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[183,2],[233,183],[239,233],[240,239],[241,240],[244,239],[265,183],[295,183],[297,295],[299,297],[325,299],[326,325],[328,326],[330,328],[332,330],[334,332],[339,334],[341,339],[342,341],[347,330],[349,347],[351,349],[353,351],[355,353],[357,355],[438,351],[440,438],[451,440],[452,451],[453,452],[455,453],[459,455],[461,459],[463,461],[465,463],[467,465],[469,467],[471,469],[473,471],[475,473],[477,475],[478,477],[482,471],[484,482],[486,484],[487,486],[487,486],[1345,467],[1347,1345],[1349,1347],[1351,1349],[1353,1351],[1354,1353],[1358,1347],[1360,1358],[1362,1360],[1363,1362],[1363,1362],[2816,467],[2818,2816],[2820,2818],[2822,2820],[2824,2822],[2825,2824],[2829,2818],[2831,2829],[2833,2831],[2834,2833],[2834,2833],[3003,438],[3005,3003],[3007,3005],[3008,3007],[3011,3003],[3013,3011],[3015,3013],[3016,3015],[3125,347],[3127,3125],[3129,3127],[3130,3129],[3138,299],[3139,3138],[3196,3139],[3197,3196],[3198,3197],[3200,3198],[3204,3200],[3224,3204],[3226,3224],[3228,3224],[3230,3228],[3231,3230],[3233,3228],[3234,3233],[3236,3228],[3237,3236],[3240,3224],[3284,3204],[3285,3284],[3286,3284],[3287,3284],[3288,3284],[3362,3139],[3363,3362],[3364,3363],[3366,3364],[3368,3366],[3370,3368],[3372,3370],[3378,3372],[3379,3378],[3381,3379],[3382,3381],[3384,3382],[3386,3384],[3387,3386],[3389,3386],[3391,3389],[3393,3391],[3397,3389],[3398,3397],[3399,3398],[3406,3379],[3407,3406],[3409,3407],[3411,3409],[3412,3411],[3414,3411],[3416,3414],[3418,3416],[3422,3414],[3423,3422],[3424,3423],[3431,3379],[3432,3431],[3434,3432],[3436,3434],[3437,3436],[3439,3436],[3441,3439],[3443,3441],[3447,3439],[3448,3447],[3449,3448],[3456,3379],[3457,3456],[3459,3457],[3461,3459],[3463,3461],[3465,3463],[3467,3465],[3471,3463],[3472,3471],[3473,3472],[3567,3139],[3568,3567],[3644,3568],[3645,3644],[3647,3645],[3649,3647],[3651,3649],[3653,3651],[3655,3653],[3657,3655],[3659,3657],[3660,3659],[3663,3655],[3664,3663],[3672,3568],[3673,3672],[3675,3673],[3677,3675],[3679,3677],[3681,3679],[3683,3681],[3685,3683],[3687,3685],[3689,3687],[3700,3689],[3702,3700],[3703,3702],[3712,3683],[3714,3712],[3716,3714],[3726,3716],[3728,3726],[3729,3728],[3738,3683],[3740,3738],[3742,3740],[3752,3742],[3754,3752],[7320,183],[7321,7320]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"de3bc039bafeb69a0ca89b554d417035ff95a5a3bbed44d13e3f52873fbd6db6","wireframe":"7345dd87bb8a09155ff0dded6c658d5ba6f03d41c2930f0aca80a925837deaaa"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.