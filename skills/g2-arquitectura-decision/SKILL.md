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
- `nodes.json` — `isClickable` es indispensable: sobre rectángulos sin etiqueta un enlace y
  un párrafo son la misma caja, y sin distinguirlos no se puede contar nada. `nodeName` y
  `attributes` distinguen además un control de filtro u ordenamiento de un enlace común.

Los grupos visuales del paso 2 se determinan sobre `ink` y `visibleBoundary`, no sobre
`bounds`: un contenedor sin fondo, sin borde y sin sombra no agrupa nada, y contar sus
hijos como un grupo produce una segmentación que no está en la pantalla. Dos opciones
pertenecen al mismo grupo cuando comparten un contenedor con `visibleBoundary.visible ===
true`, o cuando la separación entre sus cajas `ink` es menor que la que las separa del
resto.

## Procedimiento

1. **Enumerar todo elemento accionable**: navegación, botones, enlaces, campos de
   formulario, filtros, pestañas, tarjetas clicables. Registrar `n_total`.

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
`n_max` y `Ap`. Un puntaje sin esos números no es auditable.

`trigger` nombra la condición que fijó el nivel: `n1`, `agrupacion`, `dominancia`, `Ap` o
`ninguna`.

## No aplicable

`not_applicable: true` únicamente cuando `n_total = 0`, es decir cuando la pantalla no
presenta ningún elemento accionable y por tanto ninguna decisión. Condición objetiva sobre
`nodes.json`. No se inventa una violación para llenar el espacio.

## Declaraciones

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
