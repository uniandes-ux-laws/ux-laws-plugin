# Resumen de la evaluación

Lo arma un programa a partir del resultado (`perfil.json`) y de un diccionario fijo. No lo redacta un modelo ni agrega opiniones a las del evaluador.

## 1. Qué se evaluó

- **Página:** https://www.minsalud.gov.co/
- **Fecha de la captura:** 10 de septiembre de 2026, 23:15 (hora UTC)
- **Alcance:** una sola pantalla: lo que se ve sin desplazarse en una ventana de 1440 × 900 píxeles. No se evaluó el resto de la página ni otras páginas del sitio.
- **Quién evaluó:** el modelo `gpt-6.1-terra`, ejecutado en `codex`. En este resumen, «el evaluador» es ese modelo. Parámetros de generación del modelo: no expuesto por el runtime.
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
| Cantidad y organización de las opciones (sobre el esquema de cajas de la página) | no se pudo evaluar | — |
| Cantidad y organización de las opciones (sobre la imagen de la página) | nivel 3 | grupos de opciones a la vez |
| Qué destaca en la pantalla (sobre la imagen de la página) | no se pudo evaluar | — |
| Tamaño y separación de lo que se puede pulsar (sobre el esquema de cajas de la página) | nivel 0 | tamaño mínimo para pulsar |
| Tamaño y separación de lo que se puede pulsar (sobre la imagen de la página) | nivel 0 | tamaño mínimo para pulsar |

El detalle de cada aspecto sigue abajo.

### 3.1 Cantidad y organización de las opciones (sobre el esquema de cajas de la página)

*En los archivos técnicos: Arquitectura de decisión (G2).*

**Pregunta.** ¿Cuántas opciones enfrenta la persona a la vez, están organizadas en grupos y hay una acción principal que se distinga?

**Resultado.** No se pudo evaluar.

**Por qué no hay nivel.** «No se pudo evaluar»: el aspecto sí aplica, pero faltó evidencia o lo observado no tiene un nivel definido en la rúbrica (la guía escrita con que se evalúa cada aspecto). El evaluador lo explicó así: «Con n1=5 y regiones agrupadas, la acción primaria no es identificable con seguridad en el wireframe. No se observa una exigencia explícita de decidir que active el nivel 0; los niveles 1 y 2 requieren otros intervalos de n1 y el nivel 3 exige una acción primaria clara. Ninguna ancla cubre esta combinación.» Códigos que aparecen en esa explicación: `n1`: grupos de opciones a la vez.

**Para comparar.** En este aspecto, un 0 es: hay más de 12 grupos de opciones a la vez y sin agrupar, o no se distingue ninguna acción principal en una pantalla que pide tomar una decisión. Un 4 es: lo del nivel 3 y, además, la pantalla reduce lo que hay que decidir: muestra las opciones por etapas, trae valores por defecto sensatos u ordena las decisiones en secuencia, con al menos una ayuda para comparar.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen de las fuentes: el estudio de Hick midió tiempos de reacción, no un número aceptable de botones, y el efecto de «sobrecarga de elección» no se ha podido reproducir de forma fiable.

### 3.2 Cantidad y organización de las opciones (sobre la imagen de la página)

*En los archivos técnicos: Arquitectura de decisión (G2).*

**Pregunta.** ¿Cuántas opciones enfrenta la persona a la vez, están organizadas en grupos y hay una acción principal que se distinga?

**Resultado.** Nivel 3 (escala de 0 a 4).

**Qué quiere decir un 3 en este aspecto.** Cinco grupos de opciones o menos, coherentes, y la acción principal es clara.

**Por qué.** La condición que fijó el nivel fue «grupos de opciones a la vez» (código `n1`). Mira cuántos grupos de opciones enfrenta la persona al mismo tiempo. En esta evaluación: grupos de opciones a la vez: 5; elementos sobre los que se puede actuar: 26.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: hay más de 12 grupos de opciones a la vez y sin agrupar, o no se distingue ninguna acción principal en una pantalla que pide tomar una decisión. Un 4 es: lo del nivel 3 y, además, la pantalla reduce lo que hay que decidir: muestra las opciones por etapas, trae valores por defecto sensatos u ordena las decisiones en secuencia, con al menos una ayuda para comparar.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen de las fuentes: el estudio de Hick midió tiempos de reacción, no un número aceptable de botones, y el efecto de «sobrecarga de elección» no se ha podido reproducir de forma fiable.

### 3.3 Qué destaca en la pantalla (sobre la imagen de la página)

*En los archivos técnicos: Saliencia visual (G4).*

**Pregunta.** Entre elementos equivalentes, ¿hay uno que destaque, es el que la sección quiere promover, y hay contenido útil que parezca publicidad o relleno?

**Resultado.** No se pudo evaluar.

**Por qué no hay nivel.** Lo observado no corresponde a ningún nivel de la rúbrica, o no se pudo sostener cuál es el conjunto principal de elementos. El evaluador lo explicó así: «La convocatoria es el contenido principal visible, pero los candidatos de esa zona no ofrecen un conjunto certificado de elementos equivalentes para evaluar su foco: g4:DIV#759 mezcla la pieza con controles del carrusel y g4:DIV#raiz mezcla secciones distintas y parcialmente visibles. Los conjuntos equivalentes disponibles son navegación o controles auxiliares y no permiten sustituir el contenido principal. No se puede seleccionar un conjunto principal ni aplicar un ancla sin inventar pares.»

**Para comparar.** En este aspecto, un 0 es: hay contenido útil con apariencia de publicidad y, al mismo tiempo, o no destaca nada o destacan tres o más elementos: lo importante está escondido y la pantalla no orienta. Un 4 es: lo del nivel 3 y, además, el elemento destaca por más de una vía a la vez (por ejemplo color y grosor, o color y tamaño), así que no depende solo del color.

**Qué tan firme es la base.** Este aspecto dice si algo se distingue de sus pares, no hacia dónde mira la gente: el efecto original trata de lo que se recuerda, no de la atención.

### 3.4 Tamaño y separación de lo que se puede pulsar (sobre el esquema de cajas de la página)

*En los archivos técnicos: Targeting motor (G7).*

**Pregunta.** ¿Los elementos que se pueden pulsar tienen un tamaño suficiente y están bien separados entre sí?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** Dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** La condición que fijó el nivel fue «tamaño mínimo para pulsar» (código `holgura`). Mira cuántos elementos pulsables miden menos de 24 píxeles en su lado más corto y, además, no tienen alrededor el espacio libre que lo compensaría. En esta evaluación: elementos pulsables que no alcanzan el mínimo: 8 de 27.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, el elemento principal es visiblemente más grande que los secundarios.

**Qué tan firme es la base.** Solo se evalúan el tamaño y la separación, no el tiempo que toma llegar a un elemento. El mínimo de 24 píxeles viene de la norma de accesibilidad WCAG 2.2; los cortes de 32 y de 8 píxeles son convención del proyecto.

### 3.5 Tamaño y separación de lo que se puede pulsar (sobre la imagen de la página)

*En los archivos técnicos: Targeting motor (G7).*

**Pregunta.** ¿Los elementos que se pueden pulsar tienen un tamaño suficiente y están bien separados entre sí?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** Dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** La condición que fijó el nivel fue «tamaño mínimo para pulsar» (código `holgura`). Mira cuántos elementos pulsables miden menos de 24 píxeles en su lado más corto y, además, no tienen alrededor el espacio libre que lo compensaría. En esta evaluación: elementos pulsables que no alcanzan el mínimo: 8 de 27.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, el elemento principal es visiblemente más grande que los secundarios.

**Qué tan firme es la base.** Solo se evalúan el tamaño y la separación, no el tiempo que toma llegar a un elemento. El mínimo de 24 píxeles viene de la norma de accesibilidad WCAG 2.2; los cortes de 32 y de 8 píxeles son convención del proyecto.

## 4. Qué mejorar primero

Solo salen de un nivel 2 o menor y de la condición que lo fijó, del nivel más bajo al más alto. Son la lectura directa de cada condición, no un plan revisado por expertos; el elemento exacto sobre el que actuar está en la carpeta `resultados`.

1. **Tamaño y separación de lo que se puede pulsar (sobre el esquema de cajas de la página)** (nivel 0). Agrandar a 24 píxeles o más los elementos pulsables más pequeños, o darles más espacio libre alrededor. Sale de la condición «tamaño mínimo para pulsar».
2. **Tamaño y separación de lo que se puede pulsar (sobre la imagen de la página)** (nivel 0). Agrandar a 24 píxeles o más los elementos pulsables más pequeños, o darles más espacio libre alrededor. Sale de la condición «tamaño mínimo para pulsar».

Sin mejoras propuestas:

- Cantidad y organización de las opciones (sobre el esquema de cajas de la página): no se pudo evaluar; no se sabe si está bien o mal.
- Cantidad y organización de las opciones (sobre la imagen de la página): obtuvo nivel 3; las rúbricas solo piden mejoras con nivel 2 o menor.
- Qué destaca en la pantalla (sobre la imagen de la página): no se pudo evaluar; no se sabe si está bien o mal.

## 5. Qué este resultado no dice

- Describe una sola pantalla, la que se ve sin desplazarse. No describe la página completa ni el sitio.
- Viene de 1 repetición por aspecto, de un solo modelo (`gpt-6.1-terra`). Otro modelo, u otra repetición, puede dar otro resultado.
- Los niveles son juicios de un modelo sobre medidas que calcula un programa. No sustituyen la revisión de una persona experta, y este resultado no se ha comparado con una.
- Un aspecto que no se pudo evaluar no está bien ni mal: no se sabe. En este resultado: Cantidad y organización de las opciones (sobre el esquema de cajas de la página); Qué destaca en la pantalla (sobre la imagen de la página).
- «No aplica» y «no se pudo evaluar» no son ceros.
- No hay puntaje total ni calificación de la página.

---

Detalle técnico: `perfil.md` y `perfil.json`, en esta misma carpeta. Diccionario de lenguaje claro: versión 1.0.0 (`shared/lenguaje-claro.json`).
