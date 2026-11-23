# Ejecución 1.0.0

Evalúa solo G4, captura captures/L02.

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
{"pagina":{"id":"L02","viewport":{"width":1440,"height":900,"deviceScaleFactor":1},"captured_at":"2026-09-10T23:18:00.169Z","sanity_ok":false,"consent_limpio":false},"measurements_version":"1.0.7","formato_prompt":"compacto-v2","g4":{"g4_fondo_pagina":[80,80,80],"g4_conjuntos_pares_total":20,"g4_conjuntos_pares":[{"conjunto":"g4:DIV#221","clave":"DIV#221","id_padre":221,"padre_raiz_virtual":false,"n":5,"area_visible_total":2504078,"parcial":true,"mediana_contraste":68.1,"mediana_area":282240,"atipicos_geometricos":[1802,2057,2231,3989],"miembros":[{"id":222,"caja":{"x":0,"y":0,"w":1440,"h":196},"rasgos":{"color_medio":[131,120,59],"contraste_con_fondo":68.1,"fraccion_tinta":0.5496,"area":282240,"area_visible":282240,"pixeles_muestreados":282240}},{"id":1802,"caja":{"x":-945,"y":196,"w":3330,"h":504.5},"rasgos":{"color_medio":[139,137,128],"contraste_con_fondo":95,"fraccion_tinta":0.5154,"area":1679933,"area_visible":726458,"pixeles_muestreados":727200}},{"id":2057,"caja":{"x":165,"y":744.5,"w":1110,"h":94},"rasgos":{"color_medio":[67,64,63],"contraste_con_fondo":26.7,"fraccion_tinta":0.5187,"area":104340,"area_visible":104340,"pixeles_muestreados":105450}},{"id":2231,"caja":{"x":0,"y":0,"w":1440,"h":1422.5},"rasgos":{"color_medio":[124,120,101],"contraste_con_fondo":63.1,"fraccion_tinta":0.4693,"area":2048378,"area_visible":1296000,"pixeles_muestreados":1296000}},{"id":3989,"caja":{"x":0,"y":0,"w":1440,"h":66},"rasgos":{"color_medio":[244,212,36],"contraste_con_fondo":215.1,"fraccion_tinta":0.9996,"area":95040,"area_visible":95040,"pixeles_muestreados":95040}}]},{"conjunto":"g4:DIV#1894","clave":"DIV#1894","id_padre":1894,"padre_raiz_virtual":false,"n":2,"area_visible_total":652478,"parcial":true,"mediana_contraste":115.2,"mediana_area":720762,"atipicos_geometricos":[1896],"miembros":[{"id":1896,"caja":{"x":-945,"y":267,"w":3330,"h":417.5},"rasgos":{"color_medio":[149,146,135],"contraste_con_fondo":110.2,"fraccion_tinta":0.6096,"area":1390223,"area_visible":601178,"pixeles_muestreados":601920}},{"id":2019,"caja":{"x":720,"y":223,"w":570,"h":90},"rasgos":{"color_medio":[150,149,149],"contraste_con_fondo":120.1,"fraccion_tinta":0.3917,"area":51300,"area_visible":51300,"pixeles_muestreados":51300}}]},{"conjunto":"g4:SECTION#4366","clave":"SECTION#4366","id_padre":4366,"padre_raiz_virtual":false,"n":2,"area_visible_total":625848,"parcial":false,"mediana_contraste":159.4,"mediana_area":312924,"atipicos_geometricos":[4373,4379],"miembros":[{"id":4373,"caja":{"x":586.2,"y":316,"w":267.6,"h":18},"rasgos":{"color_medio":[198,198,198],"contraste_con_fondo":204.4,"fraccion_tinta":0.9619,"area":4816,"area_visible":4816,"pixeles_muestreados":4824}},{"id":4379,"caja":{"x":0,"y":0,"w":1042,"h":596},"rasgos":{"color_medio":[158,152,123],"contraste_con_fondo":114.5,"fraccion_tinta":0.5521,"area":621032,"area_visible":621032,"pixeles_muestreados":621032}}]},{"conjunto":"g4:DIV#1898","clave":"DIV#1898","id_padre":1898,"padre_raiz_virtual":false,"n":3,"area_visible_total":601178,"parcial":true,"mediana_contraste":7.1,"mediana_area":463408,"atipicos_geometricos":[1937],"miembros":[{"id":1899,"caja":{"x":-945,"y":267,"w":1110,"h":417.5},"rasgos":{"color_medio":[85,84,83],"contraste_con_fondo":7.1,"fraccion_tinta":0,"area":463408,"area_visible":68885,"pixeles_muestreados":68970}},{"id":1937,"caja":{"x":165,"y":267,"w":1110,"h":417.5},"rasgos":{"color_medio":[168,165,151],"contraste_con_fondo":141.5,"fraccion_tinta":0.7896,"area":463408,"area_visible":463408,"pixeles_muestreados":463980}},{"id":1975,"caja":{"x":1275,"y":267,"w":1110,"h":417.5},"rasgos":{"color_medio":[84,83,82],"contraste_con_fondo":5.4,"fraccion_tinta":0.0088,"area":463408,"area_visible":68885,"pixeles_muestreados":68970}}]},{"conjunto":"g4:P#4381","clave":"P#4381","id_padre":4381,"padre_raiz_virtual":false,"n":2,"area_visible_total":578290,"parcial":false,"mediana_contraste":187.8,"mediana_area":289145,"atipicos_geometricos":[4382,4389],"miembros":[{"id":4382,"caja":{"x":397.7,"y":356,"w":640.5,"h":67},"rasgos":{"color_medio":[234,234,234],"contraste_con_fondo":266.7,"fraccion_tinta":0.9711,"area":42917,"area_visible":42917,"pixeles_muestreados":43014}},{"id":4389,"caja":{"x":0,"y":0,"w":1031.5,"h":519},"rasgos":{"color_medio":[152,148,125],"contraste_con_fondo":108.8,"fraccion_tinta":0.5319,"area":535373,"area_visible":535373,"pixeles_muestreados":535608}}]},{"conjunto":"g4:DIV#4380","clave":"DIV#4380","id_padre":4380,"padre_raiz_virtual":false,"n":2,"area_visible_total":571260,"parcial":false,"mediana_contraste":163.6,"mediana_area":285630,"atipicos_geometricos":[4381,4404],"miembros":[{"id":4381,"caja":{"x":0,"y":0,"w":1038.3,"h":519},"rasgos":{"color_medio":[152,148,125],"contraste_con_fondo":108.8,"fraccion_tinta":0.5335,"area":538860,"area_visible":538860,"pixeles_muestreados":539241}},{"id":4404,"caja":{"x":394,"y":546,"w":648,"h":50},"rasgos":{"color_medio":[248,216,49],"contraste_con_fondo":218.4,"fraccion_tinta":1,"area":32400,"area_visible":32400,"pixeles_muestreados":32400}}]},{"conjunto":"g4:DIV#1939","clave":"DIV#1939","id_padre":1939,"padre_raiz_virtual":false,"n":2,"area_visible_total":408992,"parcial":false,"mediana_contraste":141.4,"mediana_area":204496,"atipicos_geometricos":[],"miembros":[{"id":1941,"caja":{"x":180,"y":267,"w":390.3,"h":357},"rasgos":{"color_medio":[165,162,150],"contraste_con_fondo":137.3,"fraccion_tinta":0.5948,"area":139325,"area_visible":139325,"pixeles_muestreados":139587}},{"id":1965,"caja":{"x":627.5,"y":268,"w":647.5,"h":416.5},"rasgos":{"color_medio":[171,168,152],"contraste_con_fondo":145.6,"fraccion_tinta":0.9549,"area":269667,"area_visible":269667,"pixeles_muestreados":270216}}]},{"conjunto":"g4:DIV#303","clave":"DIV#303","id_padre":303,"padre_raiz_virtual":false,"n":2,"area_visible_total":141865,"parcial":false,"mediana_contraste":26.7,"mediana_area":70933,"atipicos_geometricos":[],"miembros":[{"id":305,"caja":{"x":0,"y":66,"w":1440,"h":39},"rasgos":{"color_medio":[53,51,50],"contraste_con_fondo":49.7,"fraccion_tinta":0.9481,"area":56160,"area_visible":56160,"pixeles_muestreados":56160}},{"id":551,"caja":{"x":15,"y":120,"w":1405,"h":61},"rasgos":{"color_medio":[83,82,80],"contraste_con_fondo":3.6,"fraccion_tinta":0.0646,"area":85705,"area_visible":85705,"pixeles_muestreados":85705}}]},{"conjunto":"g4:UL#309","clave":"UL#309","id_padre":309,"padre_raiz_virtual":false,"n":2,"area_visible_total":54027,"parcial":false,"mediana_contraste":89.9,"mediana_area":27014,"atipicos_geometricos":[311],"miembros":[{"id":311,"caja":{"x":0,"y":0,"w":476,"h":106},"rasgos":{"color_medio":[174,156,44],"contraste_con_fondo":126.1,"fraccion_tinta":0.9396,"area":50456,"area_visible":50456,"pixeles_muestreados":50456}},{"id":517,"caja":{"x":1229,"y":75,"w":188,"h":19},"rasgos":{"color_medio":[50,49,48],"contraste_con_fondo":53.7,"fraccion_tinta":1,"area":3571,"area_visible":3571,"pixeles_muestreados":3572}}]},{"conjunto":"g4:LI#311","clave":"LI#311","id_padre":311,"padre_raiz_virtual":false,"n":5,"area_visible_total":53300,"parcial":false,"mediana_contraste":53.7,"mediana_area":2909,"atipicos_geometricos":[313,507],"miembros":[{"id":313,"caja":{"x":15,"y":67,"w":74.6,"h":39},"rasgos":{"color_medio":[79,78,77],"contraste_con_fondo":3.7,"fraccion_tinta":0.026,"area":2909,"area_visible":2909,"pixeles_muestreados":2925}},{"id":321,"caja":{"x":101.9,"y":76,"w":58.3,"h":19},"rasgos":{"color_medio":[51,49,48],"contraste_con_fondo":53.2,"fraccion_tinta":1,"area":1107,"area_visible":1107,"pixeles_muestreados":1140}},{"id":329,"caja":{"x":180.5,"y":76,"w":175.3,"h":19},"rasgos":{"color_medio":[50,49,48],"contraste_con_fondo":53.7,"fraccion_tinta":1,"area":3330,"area_visible":3330,"pixeles_muestreados":3344}},{"id":499,"caja":{"x":376.1,"y":76,"w":38.7,"h":19},"rasgos":{"color_medio":[50,49,48],"contraste_con_fondo":53.7,"fraccion_tinta":1,"area":734,"area_visible":734,"pixeles_muestreados":741}},{"id":507,"caja":{"x":0,"y":0,"w":476,"h":95},"rasgos":{"color_medio":[187,167,42],"contraste_con_fondo":143,"fraccion_tinta":0.9524,"area":45220,"area_visible":45220,"pixeles_muestreados":45220}}]},{"conjunto":"g4:DIV#2144","clave":"DIV#2144","id_padre":2144,"padre_raiz_virtual":false,"n":6,"area_visible_total":51643,"parcial":false,"mediana_contraste":46.5,"mediana_area":7261,"atipicos_geometricos":[2146,2206],"miembros":[{"id":2146,"caja":{"x":165,"y":744.5,"w":185,"h":94},"rasgos":{"color_medio":[83,76,77],"contraste_con_fondo":5.8,"fraccion_tinta":0,"area":17390,"area_visible":17390,"pixeles_muestreados":17575}},{"id":2158,"caja":{"x":390.9,"y":758.5,"w":103.3,"h":68.5},"rasgos":{"color_medio":[60,53,50],"contraste_con_fondo":45,"fraccion_tinta":0.9553,"area":7075,"area_visible":7075,"pixeles_muestreados":7245}},{"id":2170,"caja":{"x":607.5,"y":758.5,"w":40,"h":68.5},"rasgos":{"color_medio":[53,52,52],"contraste_con_fondo":47.9,"fraccion_tinta":0.971,"area":2740,"area_visible":2740,"pixeles_muestreados":2829}},{"id":2182,"caja":{"x":758.1,"y":758.5,"w":108.7,"h":68.5},"rasgos":{"color_medio":[48,47,47],"contraste_con_fondo":56.6,"fraccion_tinta":0.971,"area":7446,"area_visible":7446,"pixeles_muestreados":7521}},{"id":2194,"caja":{"x":925.1,"y":758.5,"w":144.8,"h":68.5},"rasgos":{"color_medio":[50,49,48],"contraste_con_fondo":53.7,"fraccion_tinta":0.9639,"area":9918,"area_visible":9918,"pixeles_muestreados":10005}},{"id":2206,"caja":{"x":1130.9,"y":758.5,"w":103.3,"h":68.5},"rasgos":{"color_medio":[84,83,82],"contraste_con_fondo":5.4,"fraccion_tinta":0,"area":7074,"area_visible":7074,"pixeles_muestreados":7245}}]},{"conjunto":"g4:A#2019","clave":"A#2019","id_padre":2019,"padre_raiz_virtual":false,"n":2,"area_visible_total":49860,"parcial":false,"mediana_contraste":118.1,"mediana_area":24930,"atipicos_geometricos":[2021,2032],"miembros":[{"id":2021,"caja":{"x":1013,"y":223,"w":277,"h":90},"rasgos":{"color_medio":[105,104,103],"contraste_con_fondo":41.6,"fraccion_tinta":0.136,"area":24930,"area_visible":24930,"pixeles_muestreados":24930}},{"id":2032,"caja":{"x":720,"y":223,"w":277,"h":90},"rasgos":{"color_medio":[193,192,192],"contraste_con_fondo":194.6,"fraccion_tinta":0.6333,"area":24930,"area_visible":24930,"pixeles_muestreados":24930}}]},{"conjunto":"g4:DIV#4426","clave":"DIV#4426","id_padre":4426,"padre_raiz_virtual":false,"n":2,"area_visible_total":45256,"parcial":false,"mediana_contraste":45.3,"mediana_area":22628,"atipicos_geometricos":[4431],"miembros":[{"id":4428,"caja":{"x":371.3,"y":760.5,"w":44,"h":107.5},"rasgos":{"color_medio":[82,61,50],"contraste_con_fondo":35.6,"fraccion_tinta":0.8677,"area":4730,"area_visible":4730,"pixeles_muestreados":4860}},{"id":4431,"caja":{"x":433.3,"y":781.5,"w":587.3,"h":69},"rasgos":{"color_medio":[49,48,48],"contraste_con_fondo":54.9,"fraccion_tinta":1,"area":40526,"area_visible":40526,"pixeles_muestreados":41160}}]},{"conjunto":"g4:DIV#3991","clave":"DIV#3991","id_padre":3991,"padre_raiz_virtual":false,"n":3,"area_visible_total":35522,"parcial":true,"mediana_contraste":177.7,"mediana_area":7337,"atipicos_geometricos":[4002],"miembros":[{"id":3993,"caja":{"x":410.4,"y":-4,"w":64.6,"h":70},"rasgos":{"color_medio":[195,210,42],"contraste_con_fondo":177.7,"fraccion_tinta":0.9922,"area":4522,"area_visible":4263,"pixeles_muestreados":4356}},{"id":3996,"caja":{"x":491,"y":17.6,"w":333.5,"h":22},"rasgos":{"color_medio":[204,177,37],"contraste_con_fondo":163.2,"fraccion_tinta":1,"area":7337,"area_visible":7337,"pixeles_muestreados":7682}},{"id":4002,"caja":{"x":840.5,"y":12.5,"w":583.5,"h":41},"rasgos":{"color_medio":[244,210,36],"contraste_con_fondo":213.9,"fraccion_tinta":1,"area":23922,"area_visible":23922,"pixeles_muestreados":24528}}]},{"conjunto":"g4:BUTTON#4404","clave":"BUTTON#4404","id_padre":4404,"padre_raiz_virtual":false,"n":2,"area_visible_total":31600,"parcial":false,"mediana_contraste":217.8,"mediana_area":15800,"atipicos_geometricos":[],"miembros":[{"id":4405,"caja":{"x":394,"y":546,"w":316,"h":50},"rasgos":{"color_medio":[248,215,44],"contraste_con_fondo":218.5,"fraccion_tinta":1,"area":15800,"area_visible":15800,"pixeles_muestreados":15800}},{"id":4407,"caja":{"x":726,"y":546,"w":316,"h":50},"rasgos":{"color_medio":[247,214,44],"contraste_con_fondo":217.1,"fraccion_tinta":1,"area":15800,"area_visible":15800,"pixeles_muestreados":15800}}]},{"conjunto":"g4:DIV#4431","clave":"DIV#4431","id_padre":4431,"padre_raiz_virtual":false,"n":2,"area_visible_total":31268,"parcial":false,"mediana_contraste":53.7,"mediana_area":15634,"atipicos_geometricos":[4433],"miembros":[{"id":4433,"caja":{"x":433.3,"y":782.5,"w":351,"h":67.5},"rasgos":{"color_medio":[51,50,49],"contraste_con_fondo":52,"fraccion_tinta":1,"area":23693,"area_visible":23693,"pixeles_muestreados":23936}},{"id":4442,"caja":{"x":829.3,"y":810.4,"w":191.3,"h":39.6},"rasgos":{"color_medio":[49,48,47],"contraste_con_fondo":55.4,"fraccion_tinta":1,"area":7575,"area_visible":7575,"pixeles_muestreados":7680}}]},{"conjunto":"g4:LI#565","clave":"LI#565","id_padre":565,"padre_raiz_virtual":false,"n":4,"area_visible_total":22694,"parcial":false,"mediana_contraste":7.1,"mediana_area":6194,"atipicos_geometricos":[],"miembros":[{"id":567,"caja":{"x":374.2,"y":124.4,"w":61,"h":48},"rasgos":{"color_medio":[85,84,83],"contraste_con_fondo":7.1,"fraccion_tinta":0,"area":2930,"area_visible":2930,"pixeles_muestreados":3038}},{"id":575,"caja":{"x":439.6,"y":124.4,"w":104.5,"h":48},"rasgos":{"color_medio":[85,84,83],"contraste_con_fondo":7.1,"fraccion_tinta":0,"area":5018,"area_visible":5018,"pixeles_muestreados":5194}},{"id":783,"caja":{"x":548.4,"y":124.4,"w":153.7,"h":48},"rasgos":{"color_medio":[85,84,83],"contraste_con_fondo":7.1,"fraccion_tinta":0,"area":7377,"area_visible":7377,"pixeles_muestreados":7595}},{"id":1023,"caja":{"x":706.4,"y":124.4,"w":153.5,"h":48},"rasgos":{"color_medio":[84,83,82],"contraste_con_fondo":5.4,"fraccion_tinta":0,"area":7369,"area_visible":7369,"pixeles_muestreados":7546}}]},{"conjunto":"g4:DIV#4433","clave":"DIV#4433","id_padre":4433,"padre_raiz_virtual":false,"n":2,"area_visible_total":16880,"parcial":false,"mediana_contraste":48.5,"mediana_area":8440,"atipicos_geometricos":[],"miembros":[{"id":4435,"caja":{"x":433.3,"y":781.5,"w":225.3,"h":24},"rasgos":{"color_medio":[54,53,52],"contraste_con_fondo":46.8,"fraccion_tinta":1,"area":5407,"area_visible":5407,"pixeles_muestreados":5650}},{"id":4438,"caja":{"x":433.3,"y":814,"w":314.3,"h":36.5},"rasgos":{"color_medio":[52,51,50],"contraste_con_fondo":50.2,"fraccion_tinta":1,"area":11473,"area_visible":11473,"pixeles_muestreados":11655}}]},{"conjunto":"g4:LI#517","clave":"LI#517","id_padre":517,"padre_raiz_virtual":false,"n":2,"area_visible_total":3186,"parcial":false,"mediana_contraste":52.9,"mediana_area":1593,"atipicos_geometricos":[],"miembros":[{"id":523,"caja":{"x":1229,"y":75,"w":89.2,"h":19},"rasgos":{"color_medio":[51,50,48],"contraste_con_fondo":52.6,"fraccion_tinta":1,"area":1695,"area_visible":1695,"pixeles_muestreados":1710}},{"id":530,"caja":{"x":1338.5,"y":75,"w":78.5,"h":19},"rasgos":{"color_medio":[51,49,48],"contraste_con_fondo":53.2,"fraccion_tinta":1,"area":1491,"area_visible":1491,"pixeles_muestreados":1501}}]},{"conjunto":"g4:SPAN#2021","clave":"SPAN#2021","id_padre":2021,"padre_raiz_virtual":false,"n":2,"area_visible_total":1500,"parcial":false,"mediana_contraste":138.6,"mediana_area":750,"atipicos_geometricos":[2023,2029],"miembros":[{"id":2023,"caja":{"x":1028,"y":253,"w":30,"h":30},"rasgos":{"color_medio":[237,237,237],"contraste_con_fondo":271.9,"fraccion_tinta":0.9,"area":900,"area_visible":900,"pixeles_muestreados":900}},{"id":2029,"caja":{"x":1243,"y":255,"w":24,"h":25},"rasgos":{"color_medio":[84,83,82],"contraste_con_fondo":5.4,"fraccion_tinta":0,"area":600,"area_visible":600,"pixeles_muestreados":600}}]}],"g4_banner_candidatos":[{"id":222,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":196},"contiene_accionables":15},{"id":223,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":196},"contiene_accionables":15},{"id":225,"nodeName":"SECTION","caja":{"x":0,"y":0,"w":1440,"h":196},"contiene_accionables":15},{"id":301,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":196},"contiene_accionables":15},{"id":302,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":196},"contiene_accionables":15},{"id":303,"nodeName":"HEADER","caja":{"x":0,"y":66,"w":1440,"h":130},"contiene_accionables":15},{"id":305,"nodeName":"DIV","caja":{"x":0,"y":66,"w":1440,"h":39},"contiene_accionables":7},{"id":307,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1417,"h":106},"contiene_accionables":7},{"id":309,"nodeName":"NAV","caja":{"x":0,"y":0,"w":1417,"h":106},"contiene_accionables":7},{"id":551,"nodeName":"DIV","caja":{"x":15,"y":120,"w":1405,"h":61},"contiene_accionables":8},{"id":553,"nodeName":"DIV","caja":{"x":15,"y":120,"w":1405,"h":61},"contiene_accionables":8},{"id":1802,"nodeName":"DIV","caja":{"x":-945,"y":196,"w":3330,"h":504.5},"contiene_accionables":4},{"id":1803,"nodeName":"DIV","caja":{"x":-945,"y":196,"w":3330,"h":504.5},"contiene_accionables":4},{"id":1805,"nodeName":"SECTION","caja":{"x":-945,"y":196,"w":3330,"h":504.5},"contiene_accionables":4},{"id":1881,"nodeName":"DIV","caja":{"x":-945,"y":196,"w":3330,"h":504.5},"contiene_accionables":4},{"id":1894,"nodeName":"DIV","caja":{"x":-945,"y":223,"w":3330,"h":461.5},"contiene_accionables":4},{"id":3989,"nodeName":"DIV","caja":{"x":0,"y":0,"w":1440,"h":66},"contiene_accionables":2}],"g4_cromo_candidatos":[{"id":303,"caja":{"x":0,"y":66,"w":1440,"h":130},"rasgos":{"color_medio":[74,73,71],"contraste_con_fondo":12.9,"fraccion_tinta":0.3212,"area":187200,"area_visible":187200,"pixeles_muestreados":187200}},{"id":313,"caja":{"x":15,"y":67,"w":74.6,"h":39},"rasgos":{"color_medio":[79,78,77],"contraste_con_fondo":3.7,"fraccion_tinta":0.026,"area":2909,"area_visible":2909,"pixeles_muestreados":2925}},{"id":315,"caja":{"x":15,"y":67,"w":74.6,"h":39},"rasgos":{"color_medio":[79,78,77],"contraste_con_fondo":3.7,"fraccion_tinta":0.026,"area":2909,"area_visible":2909,"pixeles_muestreados":2925}},{"id":551,"caja":{"x":15,"y":120,"w":1405,"h":61},"rasgos":{"color_medio":[83,82,80],"contraste_con_fondo":3.6,"fraccion_tinta":0.0646,"area":85705,"area_visible":85705,"pixeles_muestreados":85705}},{"id":553,"caja":{"x":15,"y":120,"w":1405,"h":61},"rasgos":{"color_medio":[83,82,80],"contraste_con_fondo":3.6,"fraccion_tinta":0.0646,"area":85705,"area_visible":85705,"pixeles_muestreados":85705}},{"id":1044,"caja":{"x":1012,"y":126.4,"w":408,"h":43},"rasgos":{"color_medio":[78,76,71],"contraste_con_fondo":10,"fraccion_tinta":0.3077,"area":17545,"area_visible":17545,"pixeles_muestreados":17996}},{"id":1057,"caja":{"x":1150.5,"y":126.4,"w":269.5,"h":43},"rasgos":{"color_medio":[84,82,75],"contraste_con_fondo":6.7,"fraccion_tinta":0.1399,"area":11589,"area_visible":11589,"pixeles_muestreados":11880}},{"id":1084,"caja":{"x":1341.3,"y":129.4,"w":68.7,"h":37},"rasgos":{"color_medio":[84,78,53],"contraste_con_fondo":27.4,"fraccion_tinta":0.6339,"area":2543,"area_visible":2543,"pixeles_muestreados":2622}},{"id":2057,"caja":{"x":165,"y":744.5,"w":1110,"h":94},"rasgos":{"color_medio":[67,64,63],"contraste_con_fondo":26.7,"fraccion_tinta":0.5187,"area":104340,"area_visible":104340,"pixeles_muestreados":105450}},{"id":2058,"caja":{"x":165,"y":744.5,"w":1110,"h":94},"rasgos":{"color_medio":[67,64,63],"contraste_con_fondo":26.7,"fraccion_tinta":0.5187,"area":104340,"area_visible":104340,"pixeles_muestreados":105450}},{"id":2060,"caja":{"x":165,"y":744.5,"w":1110,"h":94},"rasgos":{"color_medio":[67,64,63],"contraste_con_fondo":26.7,"fraccion_tinta":0.5187,"area":104340,"area_visible":104340,"pixeles_muestreados":105450}},{"id":2136,"caja":{"x":165,"y":744.5,"w":1110,"h":94},"rasgos":{"color_medio":[67,64,63],"contraste_con_fondo":26.7,"fraccion_tinta":0.5187,"area":104340,"area_visible":104340,"pixeles_muestreados":105450}},{"id":2140,"caja":{"x":165,"y":744.5,"w":1110,"h":94},"rasgos":{"color_medio":[67,64,63],"contraste_con_fondo":26.7,"fraccion_tinta":0.5187,"area":104340,"area_visible":104340,"pixeles_muestreados":105450}},{"id":2142,"caja":{"x":165,"y":744.5,"w":1110,"h":94},"rasgos":{"color_medio":[67,64,63],"contraste_con_fondo":26.7,"fraccion_tinta":0.5187,"area":104340,"area_visible":104340,"pixeles_muestreados":105450}},{"id":2144,"caja":{"x":165,"y":744.5,"w":1069.1,"h":94},"rasgos":{"color_medio":[66,63,63],"contraste_con_fondo":27.8,"fraccion_tinta":0.5381,"area":100498,"area_visible":100498,"pixeles_muestreados":101650}},{"id":4494,"caja":{"x":1214.4,"y":759,"w":225.6,"h":141},"rasgos":{"color_medio":[99,98,92],"contraste_con_fondo":28.8,"fraccion_tinta":0.0926,"area":31809,"area_visible":31809,"pixeles_muestreados":31866}}],"g4_limites_medicion":["Los conjuntos son candidatos por etiqueta y padre retenido, no equivalencia semántica certificada.","contraste_con_fondo es distancia RGB del promedio al fondo global; no es contraste WCAG ni prueba de legibilidad.","La tinta de un contenedor puede incluir sus descendientes; candidatos anidados no son hallazgos independientes.","Cajas parciales y padres raíz virtual requieren declarar evidencia insuficiente si se usan.","La franja superior se operacionaliza en el cuarto superior del viewport; los cortes son convenciones métricas, no umbrales de la escala."],"juicios":[{"campo":"conjunto principal","decide":"Seleccionar un conjunto visualmente equivalente entre los candidatos, sin inventar miembros.","evidencia":"conjuntos completos y screenshot","requiere_lectura":false},{"campo":"I","decide":"Identificar miembros que rompen el patrón visual; los conteos se comprueban contra ids.","evidencia":"rasgos, atípicos y screenshot; atípico geométrico no certifica aislado","requiere_lectura":false},{"campo":"P","decide":"Si el único aislado coincide con lo que la pantalla promueve.","evidencia":"etiquetas y jerarquía del screenshot","requiere_lectura":true,"canal_de_lectura":"screenshot","comparacion_entre_canales":"no aplica: G4 corre solo sobre screenshot"},{"campo":"Bn","decide":"Seleccionar candidatos con navegación/tarea tratados visualmente como publicidad, sin contar ancestro e hijo dos veces.","evidencia":"candidatos geométricos y screenshot; una cabecera convencional no es banner por su forma","requiere_lectura":false},{"campo":"Cn","decide":"Seleccionar contenido sustantivo tratado como cromo, sin duplicación por anidamiento.","evidencia":"proxy RGB y screenshot; el proxy no certifica contenido ni bajo contraste local","requiere_lectura":false}],"g4_criterios_con_lectura_de_texto":["P"]},"geometria_nodos":[[0,null],[2,0],[185,2],[199,185],[205,199],[207,205],[219,207],[221,219],[222,221],[223,222],[225,223],[301,225],[302,301],[303,302],[305,303],[307,305],[309,307],[311,309],[313,311],[315,313],[316,315],[318,311],[321,311],[323,321],[324,323],[326,311],[329,311],[331,329],[332,331],[332,331],[333,331],[496,311],[499,311],[501,499],[502,501],[504,311],[507,311],[509,507],[510,509],[511,509],[517,309],[523,517],[525,523],[526,525],[527,526],[529,517],[530,517],[532,530],[533,532],[534,533],[551,303],[553,551],[555,553],[557,555],[559,557],[563,553],[565,563],[567,565],[569,567],[570,569],[572,565],[575,565],[577,575],[578,577],[780,565],[783,565],[785,783],[786,785],[1020,565],[1023,565],[1025,1023],[1026,1025],[1030,565],[1044,553],[1046,1044],[1048,1046],[1050,1048],[1051,1050],[1057,1044],[1059,1057],[1061,1059],[1062,1061],[1062,1061],[1063,1061],[1084,1057],[1085,1084],[1802,221],[1803,1802],[1805,1803],[1881,1805],[1892,1881],[1894,1892],[1896,1894],[1898,1896],[1899,1898],[1901,1899],[1927,1901],[1929,1927],[1931,1929],[1937,1898],[1939,1937],[1941,1939],[1943,1941],[1945,1943],[1946,1945],[1948,1943],[1949,1948],[1951,1943],[1956,1951],[1957,1956],[1960,1943],[1961,1960],[1965,1939],[1967,1965],[1969,1967],[1975,1898],[1977,1975],[1979,1977],[1981,1979],[1983,1981],[1984,1983],[1986,1981],[1987,1986],[1989,1981],[1994,1989],[1995,1994],[1998,1981],[1999,1998],[2019,1894],[2021,2019],[2023,2021],[2024,2023],[2024,2023],[2026,2021],[2027,2026],[2029,2021],[2030,2029],[2030,2029],[2032,2019],[2034,2032],[2035,2034],[2035,2034],[2037,2032],[2038,2037],[2041,2032],[2041,2032],[2057,221],[2058,2057],[2060,2058],[2136,2060],[2140,2136],[2142,2140],[2144,2142],[2146,2144],[2148,2146],[2150,2148],[2151,2150],[2151,2150],[2153,2148],[2154,2153],[2158,2144],[2160,2158],[2162,2160],[2163,2162],[2163,2162],[2165,2160],[2170,2144],[2172,2170],[2174,2172],[2175,2174],[2175,2174],[2182,2144],[2184,2182],[2186,2184],[2187,2186],[2187,2186],[2194,2144],[2196,2194],[2198,2196],[2199,2198],[2199,2198],[2201,2196],[2202,2201],[2206,2144],[2208,2206],[2210,2208],[2211,2210],[2211,2210],[2213,2208],[2214,2213],[2231,221],[2232,2231],[2234,2232],[2310,2234],[2317,2310],[2318,2317],[2321,2318],[2323,2321],[2325,2323],[3989,221],[3991,3989],[3993,3991],[3994,3993],[3996,3991],[3998,3996],[3999,3998],[4002,3991],[4004,4002],[4005,4004],[4007,4002],[4009,4007],[4011,4009],[4364,185],[4366,4364],[4367,4366],[4373,4366],[4374,4373],[4375,4374],[4379,4366],[4380,4379],[4381,4380],[4382,4381],[4383,4382],[4389,4381],[4391,4389],[4392,4391],[4393,4391],[4395,4393],[4396,4395],[4404,4380],[4405,4404],[4406,4405],[4407,4404],[4408,4407],[4426,185],[4428,4426],[4429,4428],[4431,4426],[4433,4431],[4435,4433],[4436,4435],[4438,4433],[4439,4438],[4442,4431],[4443,4442],[4446,4426],[4448,4446],[4450,4448],[4494,185]]}

Contrato G4 0.2.0. Sin Bn: I=0 recibe 1/I; I=2 recibe 2/I con o sin jerarquía; I=1 y P=false recibe 2/P; I=1, P=true y Cn>0 recibe 2/Cn; con Cn=0 recibe 3/P con un canal y 4/canales con dos o más. Bn conserva prioridad: 0/Bn con I=0 o I>=3; 1/Bn en los otros casos. P indeterminado conserva abstención. No uses ninguna como trigger. Cambios de color en texto, relleno y borde son un mismo canal; un borde independiente exige forma, grosor o estilo distinto. Explica la selección o la imposibilidad de selección en main_set_justification, según la tarea visible; no elijas por área sola ni conviertas controles auxiliares en contenido principal. No se entregan clases de candidatos a banner; retirarlas no prueba por sí solo falta de evidencia. La entrada G4 1.0.7 corrige falsas marcas de recorte numéricas de la fuente 1.0.6, sin añadir candidatos ni corregir cajas. Conserva advertencias por recortes reales, cajas incoherentes y superposiciones.

# Salida de esta ejecución

Devuelve un único JSON con channel="screenshot" y run copiado de la solicitud individual. Esa solicitud fija la repetición y la atribución exacta.

Las frases del material histórico sobre añadir run se refieren al ejecutor anterior. Aquí se exige el objeto completo del esquema siguiente.

No aplica: score y trigger nulos, not_applicable=true y na_reason con la condición objetiva. Si la rúbrica permite abstenerse: score y trigger nulos, not_applicable=false, evidence_insufficient=true y measurements.motivo_abstencion con la razón.

Un puntaje con advertencia de evidencia insuficiente se conserva; no lo cambies automáticamente a abstención. Nunca inventes un nivel para completar la tabla.

# Esquema de respuesta
{"type":"object","additionalProperties":false,"required":["group_id","group_name","laws_subsumed","channel","not_applicable","na_reason","score","trigger","measurements","findings","recommendations","evidence_insufficient","run"],"properties":{"group_id":{"type":"string","const":"g4"},"group_name":{"type":"string"},"laws_subsumed":{"type":"array","items":{"type":"string"}},"channel":{"type":"string","const":"screenshot"},"not_applicable":{"type":"boolean"},"na_reason":{"type":["string","null"]},"score":{"type":["integer","null"],"minimum":0,"maximum":4},"trigger":{"type":["string","null"],"enum":["Bn","I","P","Cn","canales",null]},"evidence_insufficient":{"type":"boolean"},"measurements":{"type":"object","additionalProperties":false,"required":["sets","g4_conjuntos_pares_total","I_total","Bn","Cn","channels_of_isolation","I_principal","P","main_set_id","jerarquia_entre_dos","ancla_definida","motivo_abstencion","Bn_ids","Cn_ids","canales_aislamiento","lectura_screenshot","juicios_conjuntos","main_set_justification"],"properties":{"sets":{"type":"integer","minimum":0},"g4_conjuntos_pares_total":{"type":"integer","minimum":0},"I_total":{"type":"integer","minimum":0},"Bn":{"type":"integer","minimum":0},"Cn":{"type":"integer","minimum":0},"channels_of_isolation":{"type":"integer","minimum":0},"I_principal":{"type":["integer","null"],"minimum":0},"P":{"type":["boolean","null"]},"main_set_id":{"type":["string","null"]},"jerarquia_entre_dos":{"type":["boolean","null"]},"ancla_definida":{"type":"boolean"},"motivo_abstencion":{"type":["string","null"]},"Bn_ids":{"type":"array","items":{"type":"integer"}},"Cn_ids":{"type":"array","items":{"type":"integer"}},"canales_aislamiento":{"type":"array","items":{"type":"string","enum":["color","peso","tamaño","borde"]}},"lectura_screenshot":{"type":"array","items":{"type":"string","enum":["P"]},"uniqueItems":true},"juicios_conjuntos":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["conjunto","equivalentes","aislados_ids"],"properties":{"conjunto":{"type":"string"},"equivalentes":{"type":"boolean"},"aislados_ids":{"type":"array","items":{"type":"integer"}}}}},"main_set_justification":{"type":"string","minLength":1}}},"findings":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["observation","node_ids","region","severity"],"properties":{"observation":{"type":"string"},"node_ids":{"type":"array","items":{"type":"integer"}},"region":{"type":"object","additionalProperties":false,"required":["x","y","w","h"],"properties":{"x":{"type":"number"},"y":{"type":"number"},"w":{"type":"number"},"h":{"type":"number"}}},"severity":{"type":"string","enum":["alta","media","baja"]}}}},"recommendations":{"type":"array","items":{"type":"string"}},"run":{"type":"object","additionalProperties":false,"required":["model_id","prompt_hash","repetition","runtime","captured_at","decoding","capture_sha256","measurements_version","protocol_version"],"description":"Metadata de trazabilidad. Sin ella un resultado no es atribuible a una configuración declarada.","properties":{"model_id":{"type":"string","pattern":"^(?!.*\\s)(?=[^\\s]*[0-9])(?=[^\\s]*[-._:])[A-Za-z0-9][A-Za-z0-9._:@/-]{5,}$","$comment":"Patrón ECMAScript compatible con Node 20. Los marcadores de posición enumerados en el orquestador no contienen dígitos y ya se rechazan por el requisito de versión, también en mayúsculas. No hace falta el modificador local (?i:...). La prohibición explícita de espacios evita que $ acepte un salto de línea final.","description":"Identificador exacto del modelo, no el nombre comercial del producto. El patrón exige una versión y un separador, y rechaza marcadores de posición como \"pendiente\" y nombres comerciales con espacios como \"Claude Opus 5\". Un dataset con model_id inservible no se arregla después: la corrida se repite entera."},"prompt_hash":{"type":"string","pattern":"^[a-f0-9]{64}$","description":"sha256 del texto de la rúbrica y la plantilla efectivamente enviados."},"repetition":{"type":"integer","minimum":1,"maximum":5,"description":"Índice de repetición. El protocolo fija cinco por configuración."},"runtime":{"type":"string","description":"Runtime de agente que ejecutó la skill."},"decoding":{"type":"object","description":"Parámetros de decodificación empleados. Obligatorio desde v0.2.0: cambian la salida, así que o se declaran, o se declara explícitamente que el runtime no los expone ({\"declarado\": \"no expuesto por el runtime\"}). Lo que no se admite es el silencio.","additionalProperties":true,"minProperties":1},"captured_at":{"type":"string","format":"date-time"},"capture_sha256":{"type":"object","additionalProperties":false,"required":["screenshot","wireframe"],"description":"Los sha256 de las dos representaciones evaluadas, copiados de meta.json. Obligatorio desde v0.2.0, y objeto y no cadena: ata el puntaje a unos bytes concretos y no a una URL, que sirve otra página cada semana. Antes era una cadena opcional, con lo cual un resultado podía no decir qué capturó evaluó.","properties":{"screenshot":{"type":"string","pattern":"^[a-f0-9]{64}$"},"wireframe":{"type":"string","pattern":"^[a-f0-9]{64}$"}}},"measurements_version":{"type":"string","pattern":"^\\d+\\.\\d+\\.\\d+$","description":"schema_version del measurements.json que la skill recibió. Es atribución: la misma rúbrica sobre cifras producidas por otra versión de la capa de medición da otro puntaje, y sin este campo esa diferencia sería indistinguible de un cambio de juicio."},"protocol_version":{"type":"string","description":"Versión del protocolo bajo la que corrió, por ejemplo 0.1.0. El prompt_hash ya identifica el texto exacto, pero resolver un hash exige tener el repositorio; esto hace el resultado legible por sí solo."}}}}}

# Revisión de la captura
{"version":"2026-11-04","estado":"con_advertencias","integridad_ok":true,"capas_sin_resolver":true,"advertencias":["Los nodos guardados incluyen un posible diálogo visible (4364, 4366). Confirmar en la imagen si tapa contenido.","La imagen guardada tiene un aviso de privacidad sobre el contenido y el fondo desenfocado. El registro antiguo la marcó como limpia; esa marca no confirma que la página esté despejada.","Queda una capa o un aviso sin resolver. No presentar la página como despejada.","El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen."],"sha256":{"screenshot":"e03c05e9bf942ea9f733faf495b9be74770e14fb33fae323d239ddc8748b7ff8","wireframe":"65910d21c6dfa7953fa15d27bab7751083b31375bb04c39053a985e6065c24db"}}

Las marcas históricas de limpieza no sustituyen esta revisión. No supongas visible lo que está tapado; aplica los límites de la rúbrica sin penalizar automáticamente la página.