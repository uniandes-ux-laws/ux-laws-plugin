---
name: g7-targeting-motor
description: Puntúa el grupo de constructo G7, targeting motor, sobre el wireframe de una pantalla capturada. Subsume la Ley de Fitts. Úsala cuando haya que evaluar el tamaño de los objetivos interactivos de una interfaz y la separación entre objetivos adyacentes.
license: MIT
compatibility: ">=1.0"
metadata:
  group: G7
  channel: wireframe
  scale: ordinal-0-4
  protocol_version: unreleased
allowed-tools: Read
---

# G7 · Targeting motor

| | |
|---|---|
| **Leyes subsumidas** | Ley de Fitts |
| **Canal de referencia** | Wireframe |
| **Canal alterno** | Screenshot (para el término de representación) |
| **Mide** | El tamaño de cada objetivo interactivo y la separación entre objetivos adyacentes |

El grupo contiene una sola ley porque nada más en la colección mide apuntar. Un grupo de
uno no es un defecto: forzar otra ley adentro para equilibrar la tabla habría fusionado
constructos distintos por razones cosméticas.

## Entradas

- `nodes.json` — es la entrada principal. `isClickable` identifica qué caja es un objetivo
  y `bounds` da sus dimensiones en píxeles CSS. Este grupo es el mejor servido por el
  canal: el árbol de layout entrega la medición directamente, sin estimarla sobre la
  imagen.

  **Este grupo mide sobre `bounds` y no sobre `ink`, y es el único que lo hace.** Los demás
  grupos que corren en wireframe miden sobre `ink` porque miden percepción, y una caja sin
  fondo ni borde no se percibe. Fitts mide otra cosa: el área que acepta el clic. Un botón
  con 20 px de relleno transparente alrededor de su etiqueta es un objetivo de todo su
  ancho aunque el ojo solo vea el texto, y el criterio de tamaño mínimo de la WCAG está
  definido sobre esa misma área. Medirlo sobre `ink` subestimaría el objetivo y reportaría
  como defecto un botón que se acierta sin problema.

  El caso inverso sí es un hallazgo y se registra: cuando `bounds` es mucho mayor que `ink`,
  el área que acepta el clic es mayor que la que el usuario cree que puede tocar. Registrar
  `bounds`, `ink` y su razón para todo objetivo cuya área de tinta sea menor que la mitad
  de su área de layout; no cambia el nivel, pero entra en `measurements` y alimenta las
  recomendaciones.
- `wireframe.png` — para situar los hallazgos y verificar adyacencia visual.

## Procedimiento

1. **Enumerar los objetivos.** Todo nodo con `isClickable` verdadero y área mayor que
   cero. Registrar `N_obj`.

2. **Medir cada objetivo.** Para cada uno, su dimensión menor en píxeles CSS. Registrar
   `W_min` (la más pequeña de toda la pantalla) y `N_bajo24` (cuántos objetivos tienen su
   dimensión menor por debajo de 24 px).

3. **Medir la separación entre adyacentes.** Dos objetivos son adyacentes cuando sus cajas
   no se solapan y la distancia entre sus bordes más cercanos es menor que la dimensión
   mayor del más pequeño de los dos. Para cada par adyacente, registrar la distancia entre
   bordes. `S_min` es la menor de todas.

4. **Aplicar la excepción por separación.** Un objetivo por debajo de 24 px no cuenta como
   deficiente si un círculo de 24 px de diámetro centrado en su caja no intersecta ni otro
   objetivo ni el círculo de otro objetivo subdimensionado. Registrar `N_bajo24_sin_holgura`
   como los que no cumplen la excepción.

5. **Verificar la consistencia por familia.** Objetivos de la misma familia son los que
   comparten `nodeName` y `parentId`. Registrar si dentro de cada familia el tamaño es
   uniforme, y si el objetivo primario de la pantalla es mayor que los secundarios.

6. **Puntuar contra los niveles.**

7. Donde el puntaje sea 2 o menor, escribir recomendaciones nombrando el objetivo concreto
   y su medida.

## Niveles

**0** — `N_bajo24_sin_holgura ≥ 1`: existe al menos un objetivo por debajo de 24 px que
tampoco tiene la holgura que lo compensaría.

**1** — Todo objetivo cumple el mínimo o su excepción, pero `S_min < 8 px` entre algún par
adyacente, o `N_bajo24 ≥ 3` aunque todos cumplan por holgura: el error de un toque cae
sobre el vecino.

**2** — `W_min ≥ 24 px` y `S_min ≥ 8 px`, pero algún objetivo por debajo de 32 px, o
tamaños inconsistentes dentro de una misma familia.

**3** — Todo objetivo tiene su dimensión menor `≥ 32 px`, `S_min ≥ 8 px`, y cada familia
de objetivos es internamente consistente en tamaño.

**4** — Nivel 3, y además el objetivo primario de la pantalla es visiblemente mayor que los
secundarios, de modo que el tamaño mismo comunica la jerarquía de acción.

## Salida requerida

Un objeto conforme a `shared/schemas/group-result.schema.json`, con `group_id: "g7"` y en
`measurements`: `N_obj`, `W_min`, `N_bajo24`, `N_bajo24_sin_holgura`, `S_min`,
`families_consistent` y `primary_larger`.

`trigger` nombra la condición que fijó el nivel: `W_min`, `holgura`, `S_min`,
`consistencia` o `ninguna`.

## No aplicable

`not_applicable: true` únicamente cuando `N_obj = 0`, es decir cuando la pantalla no
contiene ningún elemento interactivo. Condición objetiva sobre `nodes.json`.

## Declaraciones

**Solo la mitad del índice de dificultad es observable.** La Ley de Fitts relaciona el
tiempo de movimiento con la amplitud — la distancia desde donde arranca el puntero — y el
ancho del objetivo. En una captura estática no existe posición inicial del puntero, así que
de los dos términos únicamente el ancho es observable. Esta rúbrica puntúa tamaño de
objetivo y separación entre objetivos adyacentes, y no afirma nada sobre tiempo de
movimiento. Fitts (1954) midió tiempo, no tamaños aceptables de botón.

**El umbral de 24 px y su excepción no son convención de este proyecto.** Vienen del
criterio de conformidad 2.5.8 de WCAG 2.2, Target Size (Minimum), nivel AA, que exige que
el objetivo para entradas de puntero sea de al menos 24 por 24 píxeles CSS, con una
excepción por espaciado: los objetivos subdimensionados se aceptan cuando un círculo de
24 px de diámetro centrado en la caja de cada uno no intersecta otro objetivo ni el círculo
de otro objetivo subdimensionado. Los umbrales de 32 px de los niveles 2 y 3, y el de 8 px
de separación, sí son convención de este proyecto.

**Este es el grupo más cercano a lo que los linters ya resuelven, y conviene decirlo.** El
tamaño de objetivo es un criterio de accesibilidad verificable por regla, y la propuesta de
este trabajo cita "target sizes" como ejemplo de lo que la automatización sintáctica ya
cubre. Lo que distingue a esta rúbrica de esa comprobación es la separación entre objetivos
adyacentes, la excepción por holgura y la consistencia por familia, que son relaciones
entre elementos y no propiedades de un elemento aislado. Si el análisis muestra que G7
alcanza acuerdo alto, ese resultado hay que leerlo teniendo presente que parte del
constructo es sintácticamente verificable.
