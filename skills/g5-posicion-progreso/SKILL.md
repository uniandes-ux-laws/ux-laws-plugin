---
name: g5-posicion-progreso
description: Puntúa el grupo de constructo G5, posición y progreso en una secuencia, sobre el wireframe de una pantalla capturada. Subsume Efecto de posición serial y Efecto de gradiente de meta. Úsala cuando haya que evaluar si una interfaz marca jerarquía por posición en sus listas y si ubica al usuario dentro de un proceso de varios pasos.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G5
  channel: wireframe
  scale: ordinal-0-4
  protocol_version: 0.1.0
allowed-tools: Read
---

# G5 · Posición y progreso en una secuencia

| | |
|---|---|
| **Leyes subsumidas** | Efecto de posición serial · Efecto de gradiente de meta |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | Si las listas ordenadas marcan jerarquía por posición, y si la pantalla ubica al usuario dentro del proceso al que pertenece |

## Entradas

- `wireframe.png`
- `nodes.json` — se usan `ink`, `bounds`, `parentId` y `paintOrder`. El orden de lectura de
  una lista sale de combinar geometría con orden de pintura; la pertenencia a una misma
  lista sale de `parentId`.

  La posición de cada ítem se toma de `ink`, la extensión que una persona ve, y no de
  `bounds`: en una lista cuyos ítems son contenedores estirados al ancho del contenedor
  padre, todas las cajas de layout empiezan en la misma x y el orden espacial se pierde. Un
  ítem con `ink: null` no muestra nada y no ocupa posición en la serie.

## Procedimiento

1. **Identificar las listas ordenadas de primer nivel.** Una lista es un conjunto de tres o
   más elementos hermanos, dispuestos en secuencia por geometría, que el usuario recorre en
   orden: una navegación, un menú, un listado de opciones, una tabla de contenidos. La
   lista principal es la de mayor peso en la jerarquía de la pantalla.

2. **Evaluar la jerarquía de orden.** `J_inicio` es verdadero cuando el elemento en la
   posición inicial de la lista principal está diferenciado del cuerpo de la lista por
   forma, tamaño, separación o agrupación propia. `J_final` es lo mismo para la posición
   final. Una lista donde todos los elementos son idénticos y equidistantes es plana:
   ambos falsos.

3. **Determinar si la pantalla pertenece a una secuencia.** `Q` es verdadero cuando la
   pantalla es un paso de un proceso de varios: lo declara un indicador de pasos, una ruta
   de navegación de proceso, una numeración, o un botón que nombra un paso siguiente
   distinto de "enviar".

4. **Evaluar el indicador de progreso.** Cuando `Q` es verdadero, registrar: `G_existe`
   (hay indicador), `G_nombra` (nombra los pasos o dice cuántos son), `G_actual` (marca
   cuál es el paso actual) y `G_forma` (distingue completado de pendiente por forma, borde
   o relleno, y no únicamente por color). Sobre el wireframe, una distinción que solo
   existía en color no aparece: en ese caso `G_forma` es falso y el hallazgo lo dice
   explícitamente, en vez de inventar el estado.

5. **Puntuar contra los niveles.**

6. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando la lista o el
   indicador concreto.

## Entradas de `measurements.json`

Por la **decisión 9** de `shared/decisiones.md`, esta skill **no cuenta ni mide nada**. Recibe
las cifras ya calculadas por `measure/measure-page.js` y trabaja sobre ellas. Los campos que
lee son exactamente estos y ningún otro:

- `g5_listas` — las listas alineadas de tres o más elementos, con su orientación, su área y, para el primero y el último, alto y ancho relativos a la mediana del cuerpo, si pintan frontera propia y su separación
- `g5_lista_principal_sugerida` — la de mayor área
- `g5_indicador_paso_candidatos` — nodos con léxico de paso, proceso o ruta, y los `OL`, con su caja
- `g5_listas_total` — **cuántas listas alineadas hay en total**. `g5_listas` va recortada a las ocho de mayor área

- `g5_criterios_con_lectura_de_texto` — los criterios de esta rúbrica que exigen leer el screenshot, declarados por la capa de medición. Cada juicio trae además `requiere_lectura` y, cuando es verdadero, `canal_de_lectura` y la advertencia sobre la comparación entre canales

Además del canal —`wireframe.png`— **para situar los hallazgos y para los juicios que la tabla
de abajo declara**, nunca para contar.

**Si una cifra parece equivocada, no se sustituye.** No se recuenta sobre la imagen, no se
estima y no se corrige: se emite el puntaje con `evidence_insufficient: true` y el hallazgo
dice qué cifra se sospecha y por qué. Un agente que ajusta los números que recibe vuelve a
meter por la puerta de atrás la medición no reproducible que la decisión 9 saca por delante.

## Qué decide el agente y qué no

| | Lo trae `measurements.json` | Lo decide el agente |
|---|---|---|
| Las listas, su geometría y los rasgos de primero y último | **Cuál es la lista principal.** El código propone la de mayor área; el peso en la jerarquía no es solo área |
| Cuánto se apartan primero y último de la mediana del cuerpo | **`J_inicio` y `J_final`: si esa diferencia es una diferenciación real** o ruido de una celda más alta |
| Los candidatos a indicador de paso, con su caja | **`Q`: si la pantalla es un paso de un proceso.** Exige leer el indicador: un `OL` puede ser una lista cualquiera |
| — | **`G_nombra`, `G_actual` y `G_forma`**: si el indicador nombra los pasos o dice cuántos son, marca el actual, y distingue completado de pendiente por forma y no solo por color |
| — | **El nivel**, y `evidence_insufficient` cuando la distinción existía solo en color y el canal es el wireframe |

**`G_forma` es el caso que obliga a marcar en vez de inventar.** Sobre el
wireframe, una distinción que solo vivía en el color no aparece. La rúbrica no autoriza a
suponer que existe ni a suponer que no: se emite el puntaje con `evidence_insufficient: true`
y el hallazgo dice exactamente eso.

### Criterios que dependen del texto

El texto no está en `nodes.json` y **no se va a registrar**. La razón no es de esfuerzo: el
wireframe abstrae el contenido, y dárselo al evaluador del canal wireframe le entregaría
justo lo que el wireframe no muestra, con lo cual la comparación entre canales dejaría de
medir lo que dice medir. La consecuencia se declara **por criterio y no por grupo**.

Criterios de esta rúbrica que se emiten **leyendo el screenshot**, aunque el canal de
referencia del grupo sea el wireframe: `Q`, `G_nombra`, `G_actual` y `G_forma`.

Para esos criterios **el término de comparación entre canales no es limpio**, y así se
reporta: la corrida «sobre wireframe» los decidió mirando el screenshot. `J_inicio` y `J_final` no dependen del texto: son geometría. Un puntaje de G5 sobre una pantalla con `Q` falso —que no es un paso de un proceso— tiene comparación limpia; uno con `Q` verdadero, no.

La salida lo hace explícito. `measurements.lectura_screenshot` lleva la lista de criterios
que en esta corrida exigieron leer; si está vacía, la comparación entre canales de ese
puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
de promediarlos todos juntos.

## Niveles

**0** — `Q` verdadero y `G_existe` falso: la pantalla es un paso de un proceso y no lo
dice. O bien `Q` falso y todas las listas de primer nivel son planas.

**1** — Hay indicador pero no ubica: `G_nombra` falso, muestra avance sin decir cuántos
pasos son ni cuál es este. O bien la jerarquía de orden aparece solo en una lista
secundaria y la principal es plana.

**2** — `G_nombra` y `G_actual` verdaderos, pero `G_forma` falso: la diferencia entre
completado y pendiente depende solo del color y no sobrevive al canal. O bien, cuando `Q`
es falso, la lista principal marca jerarquía únicamente de manera débil (un solo elemento
apenas diferenciado).

**3** — Cuando `Q` es verdadero: `G_existe`, `G_nombra`, `G_actual` y `G_forma`, los
cuatro. Cuando `Q` es falso: `J_inicio` verdadero en la lista principal.

**4** — Nivel 3, y además `J_final` verdadero: la posición final de la lista principal
también está diferenciada del cuerpo, sin competir con la inicial por el mismo peso.

### Ponderación de primacía sobre recencia

El nivel 3 exige la posición inicial y el nivel 4 añade la final. La asimetría es
deliberada y está fundamentada abajo: la mitad de recencia de la curva no sobrevive al
patrón de uso de una interfaz, así que exigirla para aprobar puntuaría una propiedad que el
usuario no llega a aprovechar. Marcarla igual suma, y por eso está en el nivel 4.

## Salida requerida

**Los `measurements` de la salida repiten los campos de `measurements.json` que sostuvieron
el puntaje**, con los mismos nombres, más los juicios que el agente emitió. No se inventan
nombres nuevos: un número que aparezca en la salida y no exista en `measurements.json` ni esté
declarado como juicio es un número sin procedencia.

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g5"` y en
`measurements`: `lists` (número de listas de primer nivel), `main_list_length`,
`J_inicio`, `J_final`, `Q`, `G_existe`, `G_nombra`, `G_actual`, `G_forma`, y
`steps_declared` (cuántos pasos nombra el indicador, o null).

`trigger` nombra la condición que fijó el nivel: `G_existe`, `G_nombra`, `G_actual`,
`G_forma`, `J_inicio`, `lista_plana` o `ninguna`.

## No aplicable

`not_applicable: true` únicamente cuando `Q` es falso **y** la pantalla no contiene
ninguna lista de tres o más elementos hermanos en secuencia. Sin secuencia ni lista, el
constructo no tiene objeto. Condición objetiva sobre `nodes.json`.

## Declaraciones

**La recencia tiene una frontera temporal y la interfaz la cruza.** Glanzer y Cunitz (1966)
separaron las dos mitades de la curva experimentalmente: retardar la presentación elevó el
recuerdo del inicio de la lista y dejó el final intacto, mientras que insertar una tarea de
conteo entre presentación y recuerdo eliminó el pico final. Su resultado está enunciado sin
rodeos: diez segundos bastaron para remover la mayor parte del pico final, y con treinta no
queda rastro de él. Un usuario que recorre un menú, mueve el mouse, lee una etiqueta y
actúa ya gastó ese presupuesto. La mitad de primacía no carga la misma restricción, y por
eso la rúbrica pondera las dos posiciones distinto en vez de tratarlas como equivalentes.

**El gradiente de meta se puntúa como affordance, no como efecto.** El aumento de
motivación al acercarse a una meta no es observable en una imagen capturada. Lo que sí es
observable es la condición de diseño de la que el efecto depende: si el avance hacia la
meta se hace visible, y cómo. Esta rúbrica puntúa eso y lo declara. Es el mismo
estrechamiento que se aplica a la Ley de Hick en G2, y el análisis reporta ambas leyes
entre los casos donde la distancia entre el hallazgo y la operacionalización es más ancha.

**El original de Hull no se leyó directamente.** El trabajo de Hull sobre el gradiente de
meta se cita a través de Kivetz et al. (2006), que lo reformulan y, más útil para este
proyecto, replican el efecto en humanos: los clientes de un programa de recompensas de
cafetería compraron con más frecuencia a medida que se acercaban al premio, con el tiempo
medio entre compras cayendo alrededor de un 20 %, y la aceleración también apareció cuando
el progreso era ilusorio, producido por sellos de bonificación que cambiaban la distancia
percibida a la meta sin cambiar la real. Ese segundo resultado es el que la rúbrica puntúa,
porque un indicador de progreso es exactamente una afirmación sobre distancia percibida.
