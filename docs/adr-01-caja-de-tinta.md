# ADR-01 · La caja de tinta

**Estado:** aceptada · **Fecha:** 10 de septiembre de 2026 · **Afecta:** capa de captura,
G1, G2, G3, G5, G6, G7 · **Anterior al congelamiento del protocolo (M2).**

Origen: dos observaciones del asesor sobre el avance de la semana 6. Ninguna de las dos era
un detalle de implementación; las dos tocaban validez de constructo. Este documento registra
qué se midió, qué se decidió y qué queda declarado.

---

## 1. Hallazgo: la caja de layout no es lo que el ojo ve

### 1.1 El problema

El wireframe se generaba dibujando un rectángulo con contorno por cada nodo que el motor
hubiera dispuesto y que pintara. Eso incluye los contenedores: `<div>`, `<section>`, `<ul>`,
`<li>` y el resto de la estructura de marcado. Un contenedor sin fondo, sin borde y sin
sombra **no dibuja nada en la pantalla**, pero su caja de layout puede ocupar todo el ancho
del viewport.

Dibujarlo pone en el wireframe un borde que no está en el screenshot. Y toda medida de
proximidad tomada contra ese borde deja de medir la pantalla y pasa a medir el CSS.

Esto no es cosmético: la Ley de Proximidad es el constructo central de G1 y su criterio es
una razón entre separaciones. Si las separaciones salen de cajas invisibles, la razón mide
una geometría que nadie percibe. Es un defecto de validez de constructo.

### 1.2 La evidencia, medida

Sobre `capture/pages/inkgap.html`, una página cuya geometría está declarada dentro del
propio archivo: cuatro etiquetas que el ojo lee como dos pares, cada una dentro de un
contenedor estirado a un cuarto del viewport.

| Medida sobre | Separaciones (px) | `r` = mayor / menor no nula |
|---|---|---|
| Cajas de layout | 0 · 0 · 0 | **indefinida** — las cuatro leen como una sola tira |
| Cajas de tinta | 72,4 · 385,5 · 72,2 | **5,34** — dos grupos, muy por encima del umbral 1,5 |

El umbral de la rúbrica G1 es `r ≥ 1.5`. Con cajas de layout el criterio no se puede
evaluar; con cajas de tinta se evalúa y se cumple con holgura.

Sobre `capture/pages/portal.html` —una página **sintética**, escrita para imitar la
estructura de marcado de un portal institucional, **no una página real y no una página del
corpus**— la magnitud agregada:

- 73 cajas dispuestas por el motor.
- **64 (87,7 %) no pintan ninguna frontera visible.**
- De esas 64, **43 (67,2 %) son más anchas que su contenido por más de 50 px.**
- Inflación horizontal de las invisibles: mediana 172,6 px · p90 275,1 px · máximo 547,7 px.

Al capturarla con la capa completa: 110 nodos retenidos, de los cuales 10 pintan frontera
visible, 99 no, y 1 queda indecidible. **99 de los 110 rectángulos que el wireframe dibujaba
eran bordes que no están en la pantalla.**

### 1.3 Decisión

Cada nodo lleva dos cajas y cada grupo declara sobre cuál mide.

```
bounds  la caja que el motor de layout le dio al nodo
ink     la extensión que una persona ve:
          - su propia caja, si pinta una frontera visible: background-color
            con alfa > 0, background-image distinto de none, borde u outline
            con ancho > 0 y estilo visible, box-shadow, o elemento reemplazado
          - si no pinta ninguna, la unión de la tinta de lo que contiene
          - null si no muestra nada
```

Y el wireframe **no dibuja el contorno de un nodo sin frontera visible**. Su contenido sí se
dibuja; su caja no.

**Quién mide sobre qué**

| Grupo | Mide sobre | Por qué |
|---|---|---|
| G1 Agrupación perceptual | `ink` | Mide percepción. Una caja invisible no agrupa. |
| G2 Arquitectura de decisión | `ink` para los grupos, `isClickable` para el conteo | Un contenedor invisible no forma un grupo de opciones. |
| G3 Capacidad y segmentación | `ink` | Las unidades son lo que hay que leer, no los envoltorios. |
| G5 Posición y progreso | `ink` | En una lista de ítems estirados, todas las cajas empiezan en la misma x y el orden espacial se pierde. |
| G6 Economía y convención | `ink` + `visibleBoundary` | La distinción contenedor/contenido deja de ser un juicio. |
| **G7 Targeting motor** | **`bounds`** | Fitts mide el área que acepta el clic, no la que se ve. El mínimo de la WCAG está definido sobre esa misma área. |
| G4 Saliencia visual | screenshot | No usa wireframe. |

Que G7 sea la excepción no es una inconsistencia: es la distinción entre percibir y apuntar.
Un botón con relleno transparente alrededor de su etiqueta se acierta en todo su ancho
aunque el ojo solo vea el texto. El caso inverso —área de clic mucho mayor que el área
visible— sí se registra en `measurements`, porque el usuario no sabe que puede tocar ahí.

### 1.4 Alternativas descartadas

| Alternativa | Por qué no |
|---|---|
| Dejar el wireframe como estaba y corregir el umbral de G1 | El umbral no es el problema. Con separaciones de cero no existe umbral que rescate la medición. |
| Segmentar el screenshot para hallar los grupos visuales | Mete un segundo modelo cuyos errores caen en el mismo pipeline. Una divergencia entre canales ya no se podría atribuir al evaluador. Es la razón por la que el wireframe se genera desde el árbol de layout desde el principio. |
| Dibujar solo hojas y descartar todo contenedor | Borra las regiones comunes reales —una tarjeta con borde, un panel con fondo— que son justamente lo que la Ley de Región Común mide. |
| Recortar la caja de layout al contenido con una heurística de márgenes | Aproximación sin fuente. El dato exacto ya viene en la captura. |

### 1.5 Implementación

`DOMSnapshot.captureSnapshot` devuelve, además del árbol de layout, `documents[0].textBoxes`
—descrito en la especificación como *"The post-layout inline text nodes"*— con `layoutIndex`,
`bounds`, `start` y `length`. Es decir, la caja de cada corrida de glifos efectivamente
pintada. El dato ya estaba en la misma llamada y se descartaba.

1. `COMPUTED_STYLES` pide además `background-color`, `background-image`, `outline-width`,
   `outline-style`, los cuatro `border-*-width`, los cuatro `border-*-style` y `box-shadow`.
   **Ninguno se dibuja.** Solo responden si hay frontera. `background-image` está en la lista
   porque un panel decorativo o un héroe pintan superficie sin `background-color`, y
   omitirlo borraría cajas que sí están en la pantalla.
2. `visibleBoundaryOf()` decide por nodo. Devuelve `true`, `false`, o **`null` cuando el
   motor no reportó los estilos**; en ese caso el nodo conserva su caja. La regla nunca borra
   una caja por falta de evidencia.
3. `assignInk()` propaga la tinta hacia arriba por la cadena de padres del DOM, sobre todos
   los candidatos y no solo los retenidos, para que la tinta no se pierda por un ancestro
   filtrado.
4. `nodes.json` gana dos campos por nodo: `ink` y `visibleBoundary: {visible, reason}`.
5. `meta.json` registra `wireframeMode` y los conteos de fronteras visibles, invisibles e
   indecidibles.
6. `capture.js --no-perceptual` reproduce el comportamiento anterior. Existe para la
   ablación, no como opción de gusto.

### 1.6 Verificación

- Las tres fixtures de geometría conocida siguen en **0,000 px** de desviación máxima. El
  cambio no tocó la fidelidad geométrica.
- Se añadió una convención de aserción: `ink_<x>_<y>_<w>_<h>` afirma la caja de tinta, no la
  de layout. La fixture `inkbox.html` declara cinco, incluido el caso de un contenedor
  invisible que hereda la extensión de una tarjeta con borde anidada dentro. **Las cinco
  pasan en 0,000 px.**
- El verificador falla si un nodo con aserción `ink_` no tiene caja de tinta. No pasa por
  vacío.

### 1.7 Lo que hay que declarar

**El wireframe consume información de color, aunque no la muestre.** Decidir si un fondo
existe requiere leer `background-color`. La representación deja de ser una función solo de
la geometría del DOM. La justificación: el wireframe nunca pretendió ser ciego al color,
sino ciego a la estética; y sin este filtro no representa la geometría percibida sino el
árbol de marcado, que es el error que se está corrigiendo. Pero la afirmación «el wireframe
solo contiene geometría» ya no es exacta y no se debe escribir así en el documento.

**La comparación entre canales cambia de significado.** Antes contrastaba «geometría cruda»
contra «página renderizada». Ahora contrasta «geometría percibida» contra «página
renderizada», que es una distancia menor. Se declara.

**La ablación convierte el arreglo en un resultado.** Las mismas páginas se capturan en los
dos modos y se puntúan con las mismas rúbricas. La diferencia por grupo es una medida de
cuánto dependía el puntaje de bordes que no están en la pantalla. Es barato —el modo alterno
ya está implementado— y es un hallazgo reportable con signo propio. Entra en el protocolo
antes de M2.

---

## 2. Hallazgo: la carga cognitiva y el canal

### 2.1 El problema

G3 subsume cuatro constructos —Miller, Chunking, Memoria de trabajo y Carga cognitiva— y
tiene un solo canal de referencia. La objeción es correcta: buena parte de lo que produce
carga cognitiva en una pantalla real es contraste, jerarquía tipográfica y densidad visual,
y el wireframe abstrae exactamente eso.

### 2.2 Lo que dice la fuente

La teoría distingue componentes. Sweller, van Merriënboer y Paas (2019) —los mismos autores
de la formulación de 1998— definen la carga **intrínseca** como la complejidad del material
y su interactividad entre elementos, y la **extrínseca** como *"how the information is
presented and what the learner is required to do by the instructional procedure"*. En ese
mismo artículo revisan la carga **germana** y concluyen que ya no es una categoría aditiva
sino una redistribución de recursos: *"only intrinsic and extraneous cognitive load are
distinguished as basic categories of cognitive load"*.

> Sweller, J., van Merriënboer, J. J. G., & Paas, F. (2019). Cognitive architecture and
> instructional design: 20 years later. *Educational Psychology Review*, 31(2), 261–292.
> doi:10.1007/s10648-019-09465-5

Consecuencia directa: la rúbrica que teníamos mencionaba las tres categorías. Con la
revisión de los propios autores, invocar carga germana es citar una versión superada.

### 2.3 Decisión

**No se cambia el canal de G3. Se acota el constructo y se declara el resto.**

El término de carga cognitiva de G3 mide **carga extrínseca de origen estructural**. Quedan
fuera dos cosas, por razones distintas:

- La **carga intrínseca** es una propiedad del contenido, no de su presentación. No es
  observable en ninguna captura y tampoco es lo que un diseñador manipula. Fuera de alcance
  **por definición del constructo**, no por límite del canal.
- La parte **no estructural de la carga extrínseca** sí es presentación, pero el wireframe la
  abstrae. Fuera de alcance **de este canal**.

### 2.4 Por qué acotar y no mover de canal

Mover Carga cognitiva a un grupo de screenshot rompe dos cosas: deja a G3 con tres
constructos y mete un constructo de capacidad en G4, que mide saliencia. Un grupo con
constructos heterogéneos vuelve el puntaje no interpretable, que es justo el defecto que la
agrupación por constructo existe para evitar.

Además, acotar es lo mismo que ya se hizo con Hick, y por la misma razón: G2 mide
arquitectura de decisión y no tiempo de reacción. Renombrar lo que se mide es más honesto
que estirar la medición.

Y lo decisivo: **el diseño ya mide esta pregunta.** Los seis grupos estructurales se corren
también sobre el screenshot. La diferencia entre los dos puntajes de G3 sobre las mismas
páginas **es** la estimación de cuánta carga extrínseca se pierde al abstraer. Si esa
diferencia es sistemática y grande, el hallazgo es que el wireframe no basta para este
término. Eso es un resultado, no un fallo.

### 2.5 Implementación

- La rúbrica G3 declara el alcance acotado y cita la revisión de 2019. No menciona carga
  germana.
- Cuando el nivel del grupo lo fija este término, `trigger` toma el valor
  `carga_extrinseca_estructural`. Como `trigger` ya es obligatorio en G3, eso permite contar
  sobre el corpus con qué frecuencia este término gobierna el puntaje.
- El análisis reporta la diferencia entre canales **por grupo y por trigger**, no solo por
  grupo.

### 2.6 Lo que hay que declarar

Que el término mide una parte del constructo y no el constructo. Un puntaje de G3 no es una
medida de carga cognitiva, y el documento no debe escribirlo así en ninguna parte.

---

## 3. Estado del repositorio después de esta decisión

| Archivo | Cambio |
|---|---|
| `capture/capture.js` | Estilos de frontera, `visibleBoundaryOf`, `assignInk`, campos `ink` y `visibleBoundary`, `wireframeMode`, `--no-perceptual` |
| `capture/verify-fidelity.js` | Aserciones `ink_<x>_<y>_<w>_<h>` además de `exp_` |
| `capture/fixtures/inkbox.html` | Nueva. Cinco aserciones de caja de tinta |
| `capture/pages/inkgap.html` | Nueva. Reproduce el defecto con geometría declarada |
| `capture/pages/portal.html` | Nueva. Página sintética para la magnitud agregada |
| `capture/diagnose-grouping.js` | Nuevo. Mide el efecto sobre cualquier página |
| `skills/g1…g3, g5, g6` | Miden sobre `ink`; G1 redefine región común sobre `visibleBoundary` |
| `skills/g7` | Declara explícitamente por qué mide sobre `bounds` |
| `docs/apendice-rubricas.{md,docx}` | Regenerados |

Verificaciones que siguen pasando: fidelidad geométrica 0,000 px sobre tres fixtures;
fidelidad de tinta 0,000 px sobre cinco aserciones; esquema de salida 10/10; apéndice 7/7
rúbricas.

## 4. Restricción de entorno encontrada al medir

El contenedor donde se hizo este trabajo **no puede navegar a páginas externas**: la pasarela
responde 403 a la conexión (denegación de política), verificado contra `lawsofux.com`. Por
eso las cifras agregadas de arriba salen de una página sintética y no de una real, y está
dicho así en cada sitio donde aparecen.

**Consecuencia operativa:** las capturas del corpus tienen que correrse en las máquinas del
equipo, no acá. Es un requisito del plan, no un imprevisto.
