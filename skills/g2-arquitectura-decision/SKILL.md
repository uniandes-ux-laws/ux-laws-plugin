---
name: g2-arquitectura-decision
description: Puntúa el grupo de constructo G2, arquitectura de decisión, sobre el wireframe de una pantalla capturada. Subsume Ley de Hick y Sobrecarga de elección. Úsala cuando haya que evaluar cuántas alternativas presenta una interfaz al mismo nivel, cómo están organizadas, y si una acción domina.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G2
  channel: wireframe
  scale: ordinal-0-4
  protocol_version: unreleased
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
