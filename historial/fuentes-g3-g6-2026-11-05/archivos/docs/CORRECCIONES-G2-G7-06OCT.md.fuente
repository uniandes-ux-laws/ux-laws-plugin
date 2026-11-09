# Correcciones de G2 y G7

Fecha: **6 de octubre de 2026**, después de las correcciones de validación y G5. Las reglas descritas aquí se fijaron antes de volver a medir las capturas.

## Qué encontramos

G2 y G7 contaban algunos elementos de más. Por ejemplo, una página de prueba podía aparecer con tres opciones aunque solo tuviera eventos de clic en el documento y sus contenedores generales. Un icono dentro de un enlace también podía contarse como otro botón.

Esto alteraba la cantidad de opciones de G2 y el cálculo de tamaños y separaciones de G7. Un objetivo pequeño podía aparecer pegado a un contenedor que ocupaba toda la página, aunque ese contenedor no representara una opción independiente.

La marca `isClickable` del navegador indica que un elemento responde a clics, pero no demuestra por sí sola que sea una opción para el usuario. La definición se revisó en [DOMSnapshot](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-NodeTreeSnapshot) y en la [implementación de Chromium](https://chromium.googlesource.com/chromium/src/+/3ca21435ac073fe124ed3665100eb771964c7776/third_party/blink/renderer/core/inspector/inspector_dom_snapshot_agent.cc).

## Cómo se corrigió el conteo

Se creó un listado común de controles en `measure/actionable-inventory.js`. Se conservan sus cajas originales y se aplican estas reglas:

- Excluir el documento completo, texto, elementos decorativos, cajas inválidas y elementos totalmente fuera de la pantalla. Los controles parcialmente visibles conservan su caja completa.
- Reconocer botones, campos, listas desplegables, enlaces con destino y controles que declaran una función interactiva. Una etiqueta de navegación o presentación no basta.
- Excluir controles ocultos o deshabilitados cuando la captura registra ese estado. Si falta el dato, no se supone.
- Evitar contar el contenido decorativo de un control, como el icono dentro de un enlace. Si hay dos controles con identidad propia, se conservan ambos, incluso si uno contiene al otro.
- Evitar añadir un contenedor como otra opción cuando ya contiene controles. En estructuras genéricas de una sola rama se usa el elemento exterior; si hay varias ramas, se conservan sus objetivos.
- Conservar objetivos separados aunque compartan enlace, etiqueta o tamaño. Pueden ocupar lugares distintos y representar clics diferentes.
- Marcar las relaciones ambiguas cuando no se sabe si un contenedor tiene una acción propia.

Estas reglas permiten repetir el conteo, pero no reconstruyen lo que hacen todas las funciones de JavaScript. Los registros con un mismo identificador y datos contradictorios, o con relaciones circulares, se rechazan. Las repeticiones idénticas y los fragmentos decorativos válidos se admiten. Ordenar el archivo de otra manera no cambia el listado final.

## Qué cambia en cada grupo

**G2** usa el área visible (`ink`) de cada control y lo asigna una sola vez a un grupo visual. Si el conteo depende de una relación ambigua, la evaluación debe marcar evidencia insuficiente.

**G7** usa el área que recibe el clic (`bounds`). Al eliminar elementos duplicados y contenedores generales, se vuelven a calcular tamaños, separaciones, familias y proporciones. Se mantienen los límites de **24, 32, 8 y 2 px**, y las tolerancias de **0,10 y 0,25**.

La medición pasa a **1.0.2**. Las instrucciones de G2 y G7 se guardaron en commits separados para poder seguir cada cambio. G1, G3, G4, G5 y G6 conservaron sus mediciones.

## Límites de las capturas antiguas

Las capturas nuevas guardan los atributos `disabled`, `aria-disabled`, `inert` y `for`, con la versión `interactionAttributesVersion: 1.0.0`. Esto ayuda a identificar controles deshabilitados y asociaciones con etiquetas, sin cambiar la geometría ni las imágenes con X.

Las capturas antiguas no tenían esos datos. Tampoco permiten reconstruir todas las acciones de JavaScript, los elementos tapados, los recortes de estilo o los controles de marcos no capturados. Estas limitaciones se registran en la revisión. El piloto histórico se conserva y no se presenta como una evaluación nueva.

## Comparación con las mediciones anteriores

Se midieron las mismas 64 capturas con la versión **1.0.1** del commit `fc91dc7` y con la corrección. Los archivos originales no cambiaron. Las mediciones de los otros cinco grupos quedaron idénticas.

| Conjunto | Páginas | Objetivos G7 antes | Objetivos G7 corregidos | Páginas con relaciones ambiguas |
|---|---:|---:|---:|---:|
| Corpus | 30 | 953 | 834 | 20 |
| Calibración | 24 | 791 | 688 | 15 |
| Dorados | 10 | 296 | 252 | 9 |

Por ejemplo, el conteo de G2 y G7 pasó de 38 a 36 en G01, de 24 a 17 en C02 y de 18 a 14 en U03. Se comprobó que ningún listado incluyera el documento completo y que cada opción de G2 apareciera una sola vez en sus grupos.

Las **44 páginas** con relaciones ambiguas quedan marcadas para revisión. Esa marca señala una duda; no significa que se hayan confirmado 44 errores. Estas comparaciones son de medición, no de puntajes ni de acuerdo con expertos.

## Segunda corrección de G7

La siguiente revisión, también registrada el **6 de octubre** antes de medir de nuevo, pasa a la versión **1.0.3**.

G7 pedía información que el código no entregaba: cuántos objetivos estaban por debajo de 24 px, cuántos no tenían suficiente separación y qué elementos explicaban cada problema. Se añadieron esos conteos, las cajas, las familias y el detalle de los pares cercanos. En T2 se cuentan pares, aunque se identifiquen sus dos extremos para ubicarlos. Las distancias se conservan sin redondear: **7,96 px** no se presentan como 8 px.

También se corrigió T4, que revisa la uniformidad de tamaño. Antes, dos botones de **40×40 y 90×40 px** podían considerarse iguales porque solo se comparaba su dimensión menor. Ahora se comparan ancho y alto, usando el límite de **2 px** que ya tenía la rúbrica. La condición afecta a toda la familia si cualquiera de los dos rangos supera ese límite.

Cuando no hay observaciones, las proporciones quedan vacías (`null`). No se interpretan como ausencia de problemas. Lo mismo ocurre cuando falta un área visible válida. Para escoger entre T1–T4 se usa la mayor proporción afectada; si hay empate, se sigue ese orden. La agrupación de G2 y los límites de 24, 32 y 8 px se mantienen.

## Pruebas realizadas

Se probaron controles con iconos, contenedores, controles anidados, tarjetas, roles, estados deshabilitados, cajas inválidas y elementos fuera de pantalla. También se revisaron los límites exactos de las reglas. Son ejemplos de prueba con respuesta esperada, separados de los resultados de la tesis.

| Comprobación final de 1.0.3 | Resultado |
|---|---|
| Inventario y medidas de G2/G7 | **31/31** pruebas aprobadas |
| Validación de mediciones | **28/28** controles aprobados |
| Campos de las skills | **7/7** compatibles |
| Captura en Chromium | **1/1** |
| Imágenes con X | **3/3** |
| Fidelidad de la geometría en ejemplos de prueba | Desviación máxima **0,000 px CSS** |
| Mediciones sobre las capturas del estudio | **64/64** válidas |
| Archivos originales | **256/256** intactos |
| Preparación del orquestador en una copia temporal | **35 evaluaciones** preparadas, sin consultar modelos |

Frente a 1.0.1, las mediciones de G1, G3, G4, G5 y G6 quedaron iguales. Frente a 1.0.2, G2 y T1–T3 también quedaron iguales. T4 cambió en **27 páginas**: 10 del corpus, 15 de calibración y dos dorados, al revisar también el ancho.

La validación calcula G01 en memoria a partir de los originales. Comprueba identificadores, duplicados, conteos, reparto de opciones y marcas de ambigüedad, sin escribir en el corpus.

<details>
<summary>Comandos para repetir las comprobaciones</summary>

```bash
npm run test:actionables
npm run test:controls
npm run test:wireframe-images
npm run fidelity
npm run validate
npm run test:g5
npm run measure -- captures/G01
npm run validate:measurements
npm run check:skills
npm run seal:verify
npm run seal:calibracion:verify
npm run seal:dorados:verify
```

</details>

Las correcciones de código quedaron comprobadas con estas pruebas. Para cerrar G2 y G7 en la tesis todavía falta evaluar las skills frente a los casos dorados consensuados y a los expertos, teniendo en cuenta los límites de las capturas antiguas.
