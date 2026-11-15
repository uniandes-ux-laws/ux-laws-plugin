# Ejecución 1.0.0

Evalúa solo G4, captura captures/G10.

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
{"pagina":{"id":"G10","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:17:43.390Z","sanity_ok":null,"consent_limpio":null},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[248,248,248],"g4_conjuntos_pares_total":17,"g4_conjuntos_pares":[{"conjunto":"g4:DIV#633","clave":"DIV#633","id_padre":633,"padre_raiz_virtual":false,"n":2,"area_visible_total":1589678,"parcial":true,"mediana_contraste":48.3,"mediana_area":1066225,"atipicos_geometricos":[],"miembros":[{"id":634,"caja":{"x":0,"y":0,"w":1340.9,"h":872.7},"rasgos":{"color_medio":[223,224,231],"contraste_con_fondo":38.6,"fraccion_tinta":0.1829,"area":1170255,"area_visible":1170255,"pixeles_muestreados":1170693}},{"id":667,"caja":{"x":-185.9,"y":608.7,"w":2880,"h":334.1},"rasgos":{"color_medio":[212,213,219],"contraste_con_fondo":58,"fraccion_tinta":0.258,"area":962195,"area_visible":419423,"pixeles_muestreados":420480}}]},{"conjunto":"g4:DIV#129","clave":"DIV#129","id_padre":129,"padre_raiz_virtual":false,"n":2,"area_visible_total":659775,"parcial":true,"mediana_contraste":161.1,"mediana_area":353345,"atipicos_geometricos":[138,170],"miembros":[{"id":138,"caja":{"x":0,"y":0,"w":1440,"h":50},"rasgos":{"color_medio":[12,69,182],"contraste_con_fondo":303.5,"fraccion_tinta":0.995,"area":72000,"area_visible":72000,"pixeles_muestreados":72000}},{"id":170,"caja":{"x":165,"y":74,"w":1376.8,"h":461},"rasgos":{"color_medio":[239,236,237],"contraste_con_fondo":18.6,"fraccion_tinta":0.1297,"area":634689,"area_visible":587775,"pixeles_muestreados":587775}}]},{"conjunto":"g4:SECTION#603","clave":"SECTION#603","id_padre":603,"padre_raiz_virtual":false,"n":3,"area_visible_total":592274,"parcial":true,"mediana_contraste":54.4,"mediana_area":290880,"atipicos_geometricos":[746],"miembros":[{"id":604,"caja":{"x":180,"y":384.7,"w":1080,"h":160},"rasgos":{"color_medio":[220,214,216],"contraste_con_fondo":54.4,"fraccion_tinta":0.3107,"area":172851,"area_visible":172851,"pixeles_muestreados":173880}},{"id":630,"caja":{"x":0,"y":608.7,"w":1440,"h":280},"rasgos":{"color_medio":[220,219,220],"contraste_con_fondo":49.1,"fraccion_tinta":0.2289,"area":403200,"area_visible":403200,"pixeles_muestreados":404640}},{"id":746,"caja":{"x":0,"y":888.7,"w":1440,"h":202},"rasgos":{"color_medio":[28,81,185],"contraste_con_fondo":283.3,"fraccion_tinta":0.9226,"area":290880,"area_visible":16223,"pixeles_muestreados":17280}}]},{"conjunto":"g4:DIV#667","clave":"DIV#667","id_padre":667,"padre_raiz_virtual":false,"n":2,"area_visible_total":279437,"parcial":true,"mediana_contraste":73.3,"mediana_area":369893,"atipicos_geometricos":[],"miembros":[{"id":669,"caja":{"x":-185.9,"y":608.7,"w":1440,"h":179.6},"rasgos":{"color_medio":[215,213,216],"contraste_con_fondo":57.8,"fraccion_tinta":0.2778,"area":258685,"area_visible":225289,"pixeles_muestreados":227155}},{"id":678,"caja":{"x":1254.1,"y":608.7,"w":1440,"h":334.1},"rasgos":{"color_medio":[198,196,196],"contraste_con_fondo":88.9,"fraccion_tinta":0.5381,"area":481100,"area_visible":54148,"pixeles_muestreados":54312}}]},{"conjunto":"g4:DIV#171","clave":"DIV#171","id_padre":171,"padre_raiz_virtual":false,"n":2,"area_visible_total":272640,"parcial":true,"mediana_contraste":19.2,"mediana_area":156335,"atipicos_geometricos":[183],"miembros":[{"id":172,"caja":{"x":165,"y":74,"w":478.9,"h":146.3},"rasgos":{"color_medio":[252,247,247],"contraste_con_fondo":4.2,"fraccion_tinta":0.0623,"area":70068,"area_visible":70068,"pixeles_muestreados":70413}},{"id":183,"caja":{"x":925,"y":141.7,"w":616.8,"h":393.3},"rasgos":{"color_medio":[229,227,229],"contraste_con_fondo":34.1,"fraccion_tinta":0.2115,"area":242601,"area_visible":202572,"pixeles_muestreados":202910}}]},{"conjunto":"g4:DIV#670","clave":"DIV#670","id_padre":670,"padre_raiz_virtual":false,"n":2,"area_visible_total":225292,"parcial":true,"mediana_contraste":55.5,"mediana_area":129344,"atipicos_geometricos":[],"miembros":[{"id":671,"caja":{"x":-185.9,"y":608.7,"w":720,"h":179.6},"rasgos":{"color_medio":[221,224,231],"contraste_con_fondo":39.9,"fraccion_tinta":0.1215,"area":129344,"area_visible":95948,"pixeles_muestreados":96835}},{"id":675,"caja":{"x":534.1,"y":608.7,"w":720,"h":179.6},"rasgos":{"color_medio":[210,206,205],"contraste_con_fondo":71.1,"fraccion_tinta":0.3935,"area":129344,"area_visible":129344,"pixeles_muestreados":130501}}]},{"conjunto":"g4:SPAN#642","clave":"SPAN#642","id_padre":642,"padre_raiz_virtual":false,"n":2,"area_visible_total":199481,"parcial":false,"mediana_contraste":54.3,"mediana_area":99741,"atipicos_geometricos":[644],"miembros":[{"id":644,"caja":{"x":0,"y":0,"w":228,"h":870.5},"rasgos":{"color_medio":[228,230,237],"contraste_con_fondo":29.1,"fraccion_tinta":0.1052,"area":198481,"area_visible":198481,"pixeles_muestreados":198588}},{"id":647,"caja":{"x":228,"y":850.3,"w":52.7,"h":19},"rasgos":{"color_medio":[188,201,225],"contraste_con_fondo":79.6,"fraccion_tinta":0.3113,"area":1000,"area_visible":1000,"pixeles_muestreados":1060}}]},{"conjunto":"g4:LI#276","clave":"LI#276","id_padre":276,"padre_raiz_virtual":false,"n":8,"area_visible_total":28719,"parcial":false,"mediana_contraste":51.1,"mediana_area":3246,"atipicos_geometricos":[277,281,289,431],"miembros":[{"id":277,"caja":{"x":155,"y":268.3,"w":58.2,"h":66.4},"rasgos":{"color_medio":[85,85,85],"contraste_con_fondo":282.3,"fraccion_tinta":0.9636,"area":3865,"area_visible":3865,"pixeles_muestreados":3953}},{"id":281,"caja":{"x":265.7,"y":282.3,"w":194.3,"h":37.2},"rasgos":{"color_medio":[222,222,222],"contraste_con_fondo":45,"fraccion_tinta":0.2313,"area":7227,"area_visible":7227,"pixeles_muestreados":7448}},{"id":289,"caja":{"x":541.3,"y":282.3,"w":172.2,"h":37.2},"rasgos":{"color_medio":[225,225,225],"contraste_con_fondo":39.8,"fraccion_tinta":0.1973,"area":6404,"area_visible":6404,"pixeles_muestreados":6574}},{"id":374,"caja":{"x":752.3,"y":282.3,"w":60.1,"h":19},"rasgos":{"color_medio":[217,217,217],"contraste_con_fondo":53.7,"fraccion_tinta":0.2877,"area":1142,"area_visible":1142,"pixeles_muestreados":1220}},{"id":384,"caja":{"x":832.4,"y":282.3,"w":67.8,"h":19},"rasgos":{"color_medio":[217,217,217],"contraste_con_fondo":53.7,"fraccion_tinta":0.2899,"area":1288,"area_visible":1288,"pixeles_muestreados":1380}},{"id":431,"caja":{"x":927.3,"y":282.3,"w":137.6,"h":37.2},"rasgos":{"color_medio":[227,227,227],"contraste_con_fondo":36.4,"fraccion_tinta":0.1791,"area":5118,"area_visible":5118,"pixeles_muestreados":5244}},{"id":491,"caja":{"x":1110.6,"y":282.3,"w":70.6,"h":37.2},"rasgos":{"color_medio":[220,220,220],"contraste_con_fondo":48.5,"fraccion_tinta":0.2577,"area":2627,"area_visible":2627,"pixeles_muestreados":2736}},{"id":554,"caja":{"x":1219.8,"y":282.3,"w":55.2,"h":19},"rasgos":{"color_medio":[217,217,217],"contraste_con_fondo":53.7,"fraccion_tinta":0.2902,"area":1048,"area_visible":1048,"pixeles_muestreados":1120}}]},{"conjunto":"g4:DIV#183","clave":"DIV#183","id_padre":183,"padre_raiz_virtual":false,"n":2,"area_visible_total":18370,"parcial":false,"mediana_contraste":103.8,"mediana_area":9185,"atipicos_geometricos":[187,213],"miembros":[{"id":187,"caja":{"x":925,"y":141.7,"w":350,"h":35},"rasgos":{"color_medio":[246,240,240],"contraste_con_fondo":11.5,"fraccion_tinta":0.1325,"area":12250,"area_visible":12250,"pixeles_muestreados":12600}},{"id":213,"caja":{"x":1404,"y":365,"w":36,"h":170},"rasgos":{"color_medio":[95,134,203],"contraste_con_fondo":196,"fraccion_tinta":0.6828,"area":6120,"area_visible":6120,"pixeles_muestreados":6120}}]},{"conjunto":"g4:INPUT#191","clave":"INPUT#191","id_padre":191,"padre_raiz_virtual":false,"n":2,"area_visible_total":13150,"parcial":false,"mediana_contraste":100.4,"mediana_area":6575,"atipicos_geometricos":[199,204],"miembros":[{"id":199,"caja":{"x":925,"y":141.7,"w":350,"h":35},"rasgos":{"color_medio":[246,240,240],"contraste_con_fondo":11.5,"fraccion_tinta":0.1325,"area":12250,"area_visible":12250,"pixeles_muestreados":12600}},{"id":204,"caja":{"x":1241,"y":144.2,"w":30,"h":30},"rasgos":{"color_medio":[203,118,118],"contraste_con_fondo":189.3,"fraccion_tinta":0.7688,"area":900,"area_visible":900,"pixeles_muestreados":930}}]},{"conjunto":"g4:DIV#142","clave":"DIV#142","id_padre":142,"padre_raiz_virtual":false,"n":2,"area_visible_total":12764,"parcial":false,"mediana_contraste":290.3,"mediana_area":6382,"atipicos_geometricos":[],"miembros":[{"id":144,"caja":{"x":165,"y":10,"w":291.5,"h":30},"rasgos":{"color_medio":[26,80,186],"contraste_con_fondo":285.2,"fraccion_tinta":0.9615,"area":8745,"area_visible":8745,"pixeles_muestreados":8760}},{"id":155,"caja":{"x":1246.2,"y":7,"w":134,"h":30},"rasgos":{"color_medio":[18,74,184],"contraste_con_fondo":295.4,"fraccion_tinta":0.9936,"area":4019,"area_visible":4019,"pixeles_muestreados":4050}}]},{"conjunto":"g4:A#634","clave":"A#634","id_padre":634,"padre_raiz_virtual":false,"n":2,"area_visible_total":5059,"parcial":false,"mediana_contraste":146.8,"mediana_area":2530,"atipicos_geometricos":[658,663],"miembros":[{"id":658,"caja":{"x":164,"y":732.7,"w":56.6,"h":35.5},"rasgos":{"color_medio":[212,218,231],"contraste_con_fondo":49.8,"fraccion_tinta":0.1503,"area":2009,"area_visible":2009,"pixeles_muestreados":2109}},{"id":663,"caja":{"x":1255,"y":732.7,"w":85.9,"h":35.5},"rasgos":{"color_medio":[170,126,52],"contraste_con_fondo":243.7,"fraccion_tinta":0.9991,"area":3050,"area_visible":3050,"pixeles_muestreados":3182}}]},{"conjunto":"g4:LI#215","clave":"LI#215","id_padre":215,"padre_raiz_virtual":false,"n":4,"area_visible_total":3224,"parcial":true,"mediana_contraste":93,"mediana_area":3148,"atipicos_geometricos":[],"miembros":[{"id":217,"caja":{"x":1409,"y":377,"w":98.1,"h":26},"rasgos":{"color_medio":[146,174,211],"contraste_con_fondo":131.3,"fraccion_tinta":0.4801,"area":2551,"area_visible":806,"pixeles_muestreados":806}},{"id":227,"caja":{"x":1409,"y":417,"w":117.5,"h":26},"rasgos":{"color_medio":[180,199,228],"contraste_con_fondo":86.2,"fraccion_tinta":0.3524,"area":3056,"area_visible":806,"pixeles_muestreados":806}},{"id":237,"caja":{"x":1409,"y":457,"w":132.8,"h":26},"rasgos":{"color_medio":[178,198,227],"contraste_con_fondo":88.5,"fraccion_tinta":0.3623,"area":3452,"area_visible":806,"pixeles_muestreados":806}},{"id":247,"caja":{"x":1409,"y":497,"w":124.6,"h":26},"rasgos":{"color_medio":[171,193,224],"contraste_con_fondo":97.6,"fraccion_tinta":0.402,"area":3239,"area_visible":806,"pixeles_muestreados":806}}]},{"conjunto":"g4:SPAN#156","clave":"SPAN#156","id_padre":156,"padre_raiz_virtual":false,"n":2,"area_visible_total":2593,"parcial":false,"mediana_contraste":269.7,"mediana_area":1297,"atipicos_geometricos":[161],"miembros":[{"id":158,"caja":{"x":1246.2,"y":13,"w":24,"h":24},"rasgos":{"color_medio":[67,111,199],"contraste_con_fondo":232.2,"fraccion_tinta":0.9567,"area":576,"area_visible":576,"pixeles_muestreados":600}},{"id":161,"caja":{"x":1274,"y":7,"w":106.2,"h":19},"rasgos":{"color_medio":[9,67,181],"contraste_con_fondo":307.2,"fraccion_tinta":1,"area":2017,"area_visible":2017,"pixeles_muestreados":2033}}]},{"conjunto":"g4:LI#649","clave":"LI#649","id_padre":649,"padre_raiz_virtual":false,"n":8,"area_visible_total":2048,"parcial":false,"mediana_contraste":119.2,"mediana_area":256,"atipicos_geometricos":[651],"miembros":[{"id":650,"caja":{"x":635,"y":856.7,"w":16,"h":16},"rasgos":{"color_medio":[157,178,216],"contraste_con_fondo":119.2,"fraccion_tinta":0.5699,"area":256,"area_visible":256,"pixeles_muestreados":272}},{"id":651,"caja":{"x":657,"y":856.7,"w":16,"h":16},"rasgos":{"color_medio":[69,112,194],"contraste_con_fondo":231.2,"fraccion_tinta":0.8934,"area":256,"area_visible":256,"pixeles_muestreados":272}},{"id":652,"caja":{"x":679,"y":856.7,"w":16,"h":16},"rasgos":{"color_medio":[157,178,216],"contraste_con_fondo":119.2,"fraccion_tinta":0.5699,"area":256,"area_visible":256,"pixeles_muestreados":272}},{"id":653,"caja":{"x":701,"y":856.7,"w":16,"h":16},"rasgos":{"color_medio":[157,178,216],"contraste_con_fondo":119.2,"fraccion_tinta":0.5699,"area":256,"area_visible":256,"pixeles_muestreados":272}},{"id":654,"caja":{"x":723,"y":856.7,"w":16,"h":16},"rasgos":{"color_medio":[157,178,216],"contraste_con_fondo":119.2,"fraccion_tinta":0.5699,"area":256,"area_visible":256,"pixeles_muestreados":272}},{"id":655,"caja":{"x":745,"y":856.7,"w":16,"h":16},"rasgos":{"color_medio":[157,178,216],"contraste_con_fondo":119.2,"fraccion_tinta":0.5699,"area":256,"area_visible":256,"pixeles_muestreados":272}},{"id":656,"caja":{"x":767,"y":856.7,"w":16,"h":16},"rasgos":{"color_medio":[157,178,216],"contraste_con_fondo":119.2,"fraccion_tinta":0.5699,"area":256,"area_visible":256,"pixeles_muestreados":272}},{"id":657,"caja":{"x":789,"y":856.7,"w":16,"h":16},"rasgos":{"color_medio":[157,178,216],"contraste_con_fondo":119.2,"fraccion_tinta":0.5699,"area":256,"area_visible":256,"pixeles_muestreados":272}}]},{"conjunto":"g4:SPAN#663","clave":"SPAN#663","id_padre":663,"padre_raiz_virtual":false,"n":2,"area_visible_total":1892,"parcial":false,"mediana_contraste":240.9,"mediana_area":946,"atipicos_geometricos":[],"miembros":[{"id":664,"caja":{"x":1255,"y":732.7,"w":20,"h":32},"rasgos":{"color_medio":[129,98,66],"contraste_con_fondo":264.2,"fraccion_tinta":1,"area":640,"area_visible":640,"pixeles_muestreados":660}},{"id":665,"caja":{"x":1275,"y":749.2,"w":65.9,"h":19},"rasgos":{"color_medio":[169,151,70],"contraste_con_fondo":217.6,"fraccion_tinta":1,"area":1252,"area_visible":1252,"pixeles_muestreados":1320}}]},{"conjunto":"g4:SPAN#658","clave":"SPAN#658","id_padre":658,"padre_raiz_virtual":false,"n":2,"area_visible_total":1715,"parcial":false,"mediana_contraste":60.3,"mediana_area":858,"atipicos_geometricos":[],"miembros":[{"id":659,"caja":{"x":165,"y":732.7,"w":20,"h":32},"rasgos":{"color_medio":[185,199,224],"contraste_con_fondo":83.3,"fraccion_tinta":0.2879,"area":640,"area_visible":640,"pixeles_muestreados":660}},{"id":661,"caja":{"x":164,"y":749.2,"w":56.6,"h":19},"rasgos":{"color_medio":[222,226,233],"contraste_con_fondo":37.2,"fraccion_tinta":0.086,"area":1075,"area_visible":1075,"pixeles_muestreados":1140}}]}],"g4_banner_candidatos":[{"id":138,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":50},"contiene_accionables":2},{"id":140,"nodeName":"DIV","caja":{"x":165,"y":7,"w":1215.2,"h":33},"contiene_accionables":2},{"id":142,"nodeName":"DIV","caja":{"x":165,"y":7,"w":1215.2,"h":33},"contiene_accionables":2}],"g4_cromo_candidatos":[{"id":170,"caja":{"x":165,"y":74,"w":1376.8,"h":461},"rasgos":{"color_medio":[239,236,237],"contraste_con_fondo":18.6,"fraccion_tinta":0.1297,"area":634689,"area_visible":587775,"pixeles_muestreados":587775}},{"id":171,"caja":{"x":165,"y":74,"w":1376.8,"h":461},"rasgos":{"color_medio":[239,236,237],"contraste_con_fondo":18.6,"fraccion_tinta":0.1297,"area":634689,"area_visible":587775,"pixeles_muestreados":587775}},{"id":172,"caja":{"x":165,"y":74,"w":478.9,"h":146.3},"rasgos":{"color_medio":[252,247,247],"contraste_con_fondo":4.2,"fraccion_tinta":0.0623,"area":70068,"area_visible":70068,"pixeles_muestreados":70413}},{"id":176,"caja":{"x":165,"y":74,"w":478.9,"h":146.3},"rasgos":{"color_medio":[252,247,247],"contraste_con_fondo":4.2,"fraccion_tinta":0.0623,"area":70068,"area_visible":70068,"pixeles_muestreados":70413}},{"id":178,"caja":{"x":165,"y":74,"w":250,"h":146.3},"rasgos":{"color_medio":[249,240,239],"contraste_con_fondo":12.1,"fraccion_tinta":0.1193,"area":36578,"area_visible":36578,"pixeles_muestreados":36750}},{"id":187,"caja":{"x":925,"y":141.7,"w":350,"h":35},"rasgos":{"color_medio":[246,240,240],"contraste_con_fondo":11.5,"fraccion_tinta":0.1325,"area":12250,"area_visible":12250,"pixeles_muestreados":12600}},{"id":189,"caja":{"x":925,"y":141.7,"w":350,"h":35},"rasgos":{"color_medio":[246,240,240],"contraste_con_fondo":11.5,"fraccion_tinta":0.1325,"area":12250,"area_visible":12250,"pixeles_muestreados":12600}},{"id":191,"caja":{"x":925,"y":141.7,"w":350,"h":35},"rasgos":{"color_medio":[246,240,240],"contraste_con_fondo":11.5,"fraccion_tinta":0.1325,"area":12250,"area_visible":12250,"pixeles_muestreados":12600}},{"id":199,"caja":{"x":925,"y":141.7,"w":350,"h":35},"rasgos":{"color_medio":[246,240,240],"contraste_con_fondo":11.5,"fraccion_tinta":0.1325,"area":12250,"area_visible":12250,"pixeles_muestreados":12600}},{"id":644,"caja":{"x":0,"y":0,"w":228,"h":870.5},"rasgos":{"color_medio":[228,230,237],"contraste_con_fondo":29.1,"fraccion_tinta":0.1052,"area":198481,"area_visible":198481,"pixeles_muestreados":198588}}],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[82,2],[129,82],[133,129],[136,129],[138,129],[140,138],[142,140],[144,142],[146,144],[148,146],[150,146],[151,150],[155,142],[156,155],[158,156],[159,158],[159,158],[161,156],[162,161],[170,129],[171,170],[172,171],[176,172],[178,176],[180,176],[181,180],[183,171],[187,183],[189,187],[191,189],[199,191],[204,191],[213,183],[215,213],[217,215],[219,217],[221,219],[227,215],[229,227],[231,229],[237,215],[239,237],[241,239],[247,215],[249,247],[251,249],[261,129],[262,261],[265,262],[275,265],[276,275],[277,276],[278,277],[279,278],[280,279],[281,276],[285,281],[286,285],[287,286],[289,276],[293,289],[294,293],[295,294],[374,276],[380,374],[381,380],[382,381],[384,276],[390,384],[391,390],[392,391],[431,276],[437,431],[438,437],[439,438],[491,276],[497,491],[498,497],[499,498],[554,276],[558,554],[559,558],[560,559],[603,82],[604,603],[605,604],[608,605],[610,608],[614,610],[616,614],[618,610],[630,603],[633,630],[634,633],[635,634],[642,635],[644,642],[645,644],[647,642],[648,647],[649,634],[650,649],[651,649],[652,649],[653,649],[654,649],[655,649],[656,649],[657,649],[658,634],[659,658],[661,658],[662,661],[663,634],[664,663],[665,663],[666,665],[667,633],[669,667],[670,669],[671,670],[672,671],[673,672],[674,673],[675,670],[676,675],[677,676],[678,667],[679,678],[680,679],[746,603],[747,746],[748,747],[751,748],[1605,82],[1606,1605],[1990,82],[1992,1990],[1994,1992],[1996,1994],[2002,82]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"sin_verificar","integridad_ok":true,"capas_sin_resolver":null,"advertencias":["El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"8143c943f0e516ec254ccda7f6b6028b22dcbcef4d625298487b84d7014d4d3d","wireframe":"0c5b5d2fbcfce6826a4f0306e573fc03d3697fbbc124b309ffb11220cb39e858"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.