# Resumen de la evaluación

Lo arma un programa a partir del resultado (`perfil.json`) y de un diccionario fijo. No lo redacta un modelo ni agrega opiniones a las del evaluador.

## 1. Qué se evaluó

- **Página:** https://www.registraduria.gov.co/
- **Fecha de la captura:** 10 de septiembre de 2026, 23:17 (hora UTC)
- **Alcance:** una sola pantalla: lo que se ve sin desplazarse en una ventana de 1440 × 900 píxeles. No se evaluó el resto de la página ni otras páginas del sitio.
- **Quién evaluó:** el modelo `claude-sonnet-5-5`, ejecutado en `Claude Code`. En este resumen, «el evaluador» es ese modelo. Parámetros de generación del modelo: no expuesto por el runtime.
- **Cuántas veces:** cada aspecto se evaluó 1 vez. Con una sola evaluación no hay medida de estabilidad: no se sabe si el modelo repetiría este resultado.
- **Aviso sobre la captura:** El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

## 2. Cómo leerlo

1. Cada aspecto recibe un nivel de 0 a 4. En general: 0, la pantalla falla en ese aspecto; 3, cumple en todo lo que se pudo observar; 4, cumple y además hace algo adicional, definido en cada aspecto (no significa «muy bueno»). Qué es un 0 y un 4 en cada aspecto está escrito en cada uno.
2. El resultado es un perfil de 3 aspectos seleccionados, no una calificación de la página.
3. No hay puntaje total: los niveles son etiquetas ordenadas, no cantidades, así que no se promedian; y un total haría pesar igual un aspecto que reúne una sola ley y otro que reúne cuatro.

«No aplica»: la pantalla cumple una condición objetiva por la que ese aspecto no tiene nada que evaluar. «No se pudo evaluar»: el aspecto sí aplica, pero faltó evidencia o lo observado no tiene un nivel definido en la rúbrica (la guía escrita con que se evalúa cada aspecto). Ninguno de los dos es un cero.

## 3. Los 5 aspectos

De un vistazo:

| Aspecto | Resultado | Condición que lo fijó |
|---|---|---|
| Cantidad y organización de las opciones (sobre el esquema de cajas de la página) | nivel 1 | grupos de opciones a la vez |
| Cantidad y organización de las opciones (sobre la imagen de la página) | nivel 1 | grupos de opciones a la vez |
| Qué destaca en la pantalla (sobre la imagen de la página) | nivel 1 | elementos que destacan entre sus pares |
| Tamaño y separación de lo que se puede pulsar (sobre el esquema de cajas de la página) | nivel 0 | tamaño cómodo |
| Tamaño y separación de lo que se puede pulsar (sobre la imagen de la página) | nivel 0 | tamaño cómodo |

El detalle de cada aspecto sigue abajo.

### 3.1 Cantidad y organización de las opciones (sobre el esquema de cajas de la página)

*En los archivos técnicos: Arquitectura de decisión (G2).*

**Pregunta.** ¿Cuántas opciones enfrenta la persona a la vez, están organizadas en grupos y hay una acción principal que se distinga?

**Resultado.** Nivel 1 (escala de 0 a 4).

**Qué quiere decir un 1 en este aspecto.** Entre 9 y 12 grupos de opciones a la vez, con agrupación débil y varias acciones compitiendo con el mismo peso visual.

**Por qué.** La condición que fijó el nivel fue «grupos de opciones a la vez» (código `n1`). Mira cuántos grupos de opciones enfrenta la persona al mismo tiempo. En esta evaluación: grupos de opciones a la vez: 9; elementos sobre los que se puede actuar: 18.

**Para comparar.** En este aspecto, un 0 es: hay más de 12 grupos de opciones a la vez y sin agrupar, o no se distingue ninguna acción principal en una pantalla que pide tomar una decisión. Un 4 es: lo del nivel 3 y, además, la pantalla reduce lo que hay que decidir: muestra las opciones por etapas, trae valores por defecto sensatos u ordena las decisiones en secuencia, con al menos una ayuda para comparar.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen de las fuentes: el estudio de Hick midió tiempos de reacción, no un número aceptable de botones, y el efecto de «sobrecarga de elección» no se ha podido reproducir de forma fiable.

### 3.2 Cantidad y organización de las opciones (sobre la imagen de la página)

*En los archivos técnicos: Arquitectura de decisión (G2).*

**Pregunta.** ¿Cuántas opciones enfrenta la persona a la vez, están organizadas en grupos y hay una acción principal que se distinga?

**Resultado.** Nivel 1 (escala de 0 a 4).

**Qué quiere decir un 1 en este aspecto.** Entre 9 y 12 grupos de opciones a la vez, con agrupación débil y varias acciones compitiendo con el mismo peso visual.

**Por qué.** La condición que fijó el nivel fue «grupos de opciones a la vez» (código `n1`). Mira cuántos grupos de opciones enfrenta la persona al mismo tiempo. En esta evaluación: grupos de opciones a la vez: 9; elementos sobre los que se puede actuar: 18.

**Para comparar.** En este aspecto, un 0 es: hay más de 12 grupos de opciones a la vez y sin agrupar, o no se distingue ninguna acción principal en una pantalla que pide tomar una decisión. Un 4 es: lo del nivel 3 y, además, la pantalla reduce lo que hay que decidir: muestra las opciones por etapas, trae valores por defecto sensatos u ordena las decisiones en secuencia, con al menos una ayuda para comparar.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen de las fuentes: el estudio de Hick midió tiempos de reacción, no un número aceptable de botones, y el efecto de «sobrecarga de elección» no se ha podido reproducir de forma fiable.

### 3.3 Qué destaca en la pantalla (sobre la imagen de la página)

*En los archivos técnicos: Saliencia visual (G4).*

**Pregunta.** Entre elementos equivalentes, ¿hay uno que destaque, es el que la sección quiere promover, y hay contenido útil que parezca publicidad o relleno?

**Resultado.** Nivel 1 (escala de 0 a 4).

**Qué quiere decir un 1 en este aspecto.** Hay contenido útil con apariencia de publicidad; o bien, sin eso, no destaca ningún elemento entre sus pares o destacan tres o más, que para este aspecto equivale a ninguno.

**Por qué.** La condición que fijó el nivel fue «elementos que destacan entre sus pares» (código `I`). Mira cuántos elementos del conjunto principal rompen el patrón visual de sus equivalentes, por relleno, borde, grosor de letra, tamaño o color. En esta evaluación: elementos que destacan en el conjunto principal: 0.

**Para comparar.** En este aspecto, un 0 es: hay contenido útil con apariencia de publicidad y, al mismo tiempo, o no destaca nada o destacan tres o más elementos: lo importante está escondido y la pantalla no orienta. Un 4 es: lo del nivel 3 y, además, el elemento destaca por más de una vía a la vez (por ejemplo color y grosor, o color y tamaño), así que no depende solo del color.

**Qué tan firme es la base.** Este aspecto dice si algo se distingue de sus pares, no hacia dónde mira la gente: el efecto original trata de lo que se recuerda, no de la atención.

### 3.4 Tamaño y separación de lo que se puede pulsar (sobre el esquema de cajas de la página)

*En los archivos técnicos: Targeting motor (G7).*

**Pregunta.** ¿Los elementos que se pueden pulsar tienen un tamaño suficiente y están bien separados entre sí?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** Dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** La condición que fijó el nivel fue «tamaño cómodo» (código `W_min`). Mira cuántos elementos pulsables miden menos de 32 píxeles en su lado más corto. En esta evaluación: elementos pulsables que miden menos de 32 píxeles en su lado más corto: 12 de 18; píxeles en el lado más corto del elemento más pequeño: 16.

**Para comparar.** En este aspecto, un 0 es: dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, el elemento principal es visiblemente más grande que los secundarios.

**Qué tan firme es la base.** Solo se evalúan el tamaño y la separación, no el tiempo que toma llegar a un elemento. El mínimo de 24 píxeles viene de la norma de accesibilidad WCAG 2.2; los cortes de 32 y de 8 píxeles son convención del proyecto.

### 3.5 Tamaño y separación de lo que se puede pulsar (sobre la imagen de la página)

*En los archivos técnicos: Targeting motor (G7).*

**Pregunta.** ¿Los elementos que se pueden pulsar tienen un tamaño suficiente y están bien separados entre sí?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** Dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** La condición que fijó el nivel fue «tamaño cómodo» (código `W_min`). Mira cuántos elementos pulsables miden menos de 32 píxeles en su lado más corto. En esta evaluación: elementos pulsables que miden menos de 32 píxeles en su lado más corto: 12 de 18; píxeles en el lado más corto del elemento más pequeño: 16.

**Para comparar.** En este aspecto, un 0 es: dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, el elemento principal es visiblemente más grande que los secundarios.

**Qué tan firme es la base.** Solo se evalúan el tamaño y la separación, no el tiempo que toma llegar a un elemento. El mínimo de 24 píxeles viene de la norma de accesibilidad WCAG 2.2; los cortes de 32 y de 8 píxeles son convención del proyecto.

## 4. Qué mejorar primero

Solo salen de un nivel 2 o menor y de la condición que lo fijó, del nivel más bajo al más alto. Son la lectura directa de cada condición, no un plan revisado por expertos; el elemento exacto sobre el que actuar está en la carpeta `resultados`.

1. **Tamaño y separación de lo que se puede pulsar (sobre el esquema de cajas de la página)** (nivel 0). Agrandar los elementos pulsables hasta 32 píxeles o más en su lado más corto. Sale de la condición «tamaño cómodo».
2. **Tamaño y separación de lo que se puede pulsar (sobre la imagen de la página)** (nivel 0). Agrandar los elementos pulsables hasta 32 píxeles o más en su lado más corto. Sale de la condición «tamaño cómodo».
3. **Cantidad y organización de las opciones (sobre el esquema de cajas de la página)** (nivel 1). Reunir las opciones en menos grupos visibles a la vez; el nivel 3 pide cinco o menos. Sale de la condición «grupos de opciones a la vez».
4. **Cantidad y organización de las opciones (sobre la imagen de la página)** (nivel 1). Reunir las opciones en menos grupos visibles a la vez; el nivel 3 pide cinco o menos. Sale de la condición «grupos de opciones a la vez».
5. **Qué destaca en la pantalla (sobre la imagen de la página)** (nivel 1). Hacer que destaque un solo elemento del conjunto principal: el que la sección quiere promover. Sale de la condición «elementos que destacan entre sus pares».

## 5. Qué este resultado no dice

- Describe una sola pantalla, la que se ve sin desplazarse. No describe la página completa ni el sitio.
- Viene de 1 repetición por aspecto, de un solo modelo (`claude-sonnet-5-5`). Otro modelo, u otra repetición, puede dar otro resultado.
- Los niveles son juicios de un modelo sobre medidas que calcula un programa. No sustituyen la revisión de una persona experta, y este resultado no se ha comparado con una.
- Un aspecto que no se pudo evaluar no está bien ni mal: no se sabe.
- «No aplica» y «no se pudo evaluar» no son ceros.
- No hay puntaje total ni calificación de la página.

---

Detalle técnico: `perfil.md` y `perfil.json`, en esta misma carpeta. Diccionario de lenguaje claro: versión 1.0.0 (`shared/lenguaje-claro.json`).
