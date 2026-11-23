# Resumen de la evaluación

Lo arma un programa a partir del resultado (`perfil.json`) y de un diccionario fijo. No lo redacta un modelo ni agrega opiniones a las del evaluador.

## 1. Qué se evaluó

- **Página:** https://www.invima.gov.co/
- **Fecha de la captura:** 10 de septiembre de 2026, 23:16 (hora UTC)
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
| Cantidad y organización de las opciones (sobre el esquema de cajas de la página) | no se pudo evaluar | — |
| Cantidad y organización de las opciones (sobre la imagen de la página) | no se pudo evaluar | — |
| Qué destaca en la pantalla (sobre la imagen de la página) | no se pudo evaluar | — |
| Tamaño y separación de lo que se puede pulsar (sobre el esquema de cajas de la página) | nivel 0 | tamaños uniformes por familia |
| Tamaño y separación de lo que se puede pulsar (sobre la imagen de la página) | nivel 0 | tamaños uniformes por familia |

El detalle de cada aspecto sigue abajo.

### 3.1 Cantidad y organización de las opciones (sobre el esquema de cajas de la página)

*En los archivos técnicos: Arquitectura de decisión (G2).*

**Pregunta.** ¿Cuántas opciones enfrenta la persona a la vez, están organizadas en grupos y hay una acción principal que se distinga?

**Resultado.** No se pudo evaluar.

**Por qué no hay nivel.** «No se pudo evaluar»: el aspecto sí aplica, pero faltó evidencia o lo observado no tiene un nivel definido en la rúbrica (la guía escrita con que se evalúa cada aspecto). El evaluador lo explicó así: «Ninguna ancla cubre la combinación: n1=4 (<=5) pero la agrupación es parcial (un grupo de 20 de 25 accionables, n_max=20) y la acción primaria no domina (razón de áreas 1,17), por lo que no se cumple el nivel 3; el nivel 2 exige n1 entre 6 y 8; el nivel 1 exige n1 entre 9 y 12, agrupación débil o varias acciones compitiendo con agrupación no parcial; el nivel 0 exige n1>12 sin agrupación o ausencia de acción primaria en una pantalla que exija decisión (no se juzga que la exija). Además el inventario es ambiguo.» Códigos que aparecen en esa explicación: `n_max`: opciones del grupo más grande; `n1`: grupos de opciones a la vez.

**Para comparar.** En este aspecto, un 0 es: hay más de 12 grupos de opciones a la vez y sin agrupar, o no se distingue ninguna acción principal en una pantalla que pide tomar una decisión. Un 4 es: lo del nivel 3 y, además, la pantalla reduce lo que hay que decidir: muestra las opciones por etapas, trae valores por defecto sensatos u ordena las decisiones en secuencia, con al menos una ayuda para comparar.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen de las fuentes: el estudio de Hick midió tiempos de reacción, no un número aceptable de botones, y el efecto de «sobrecarga de elección» no se ha podido reproducir de forma fiable.

### 3.2 Cantidad y organización de las opciones (sobre la imagen de la página)

*En los archivos técnicos: Arquitectura de decisión (G2).*

**Pregunta.** ¿Cuántas opciones enfrenta la persona a la vez, están organizadas en grupos y hay una acción principal que se distinga?

**Resultado.** No se pudo evaluar.

**Por qué no hay nivel.** «No se pudo evaluar»: el aspecto sí aplica, pero faltó evidencia o lo observado no tiene un nivel definido en la rúbrica (la guía escrita con que se evalúa cada aspecto). El evaluador lo explicó así: «Ninguna ancla cubre la combinación observada: n1=4 (<=5) pero la agrupación se lee parcial y la acción primaria no domina (razón de áreas 1.17 entre los dos mayores enlaces de navegación, sin CTA dominante). El nivel 3 exige grupos coherentes y acción primaria clara; el nivel 2 está definido para n1 entre 6 y 8; los niveles 0 y 1 exigen n1>12 o ausencia de acción primaria en una pantalla que exige decisión, o n1 9-12, agrupación débil o acciones compitiendo, que no se confirman. Además el inventario es ambiguo (g2_inventario_ambiguo=true) y no se sustituyen las cifras.» Códigos que aparecen en esa explicación: `n1`: grupos de opciones a la vez.

**Para comparar.** En este aspecto, un 0 es: hay más de 12 grupos de opciones a la vez y sin agrupar, o no se distingue ninguna acción principal en una pantalla que pide tomar una decisión. Un 4 es: lo del nivel 3 y, además, la pantalla reduce lo que hay que decidir: muestra las opciones por etapas, trae valores por defecto sensatos u ordena las decisiones en secuencia, con al menos una ayuda para comparar.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen de las fuentes: el estudio de Hick midió tiempos de reacción, no un número aceptable de botones, y el efecto de «sobrecarga de elección» no se ha podido reproducir de forma fiable.

### 3.3 Qué destaca en la pantalla (sobre la imagen de la página)

*En los archivos técnicos: Saliencia visual (G4).*

**Pregunta.** Entre elementos equivalentes, ¿hay uno que destaque, es el que la sección quiere promover, y hay contenido útil que parezca publicidad o relleno?

**Resultado.** No se pudo evaluar.

**Por qué no hay nivel.** Lo observado no corresponde a ningún nivel de la rúbrica, o no se pudo sostener cuál es el conjunto principal de elementos. El evaluador lo explicó así: «No se puede sostener un conjunto principal. La pantalla es una portada institucional cuyo contenido principal es un carrusel con un banner de marca (id 2031/2033) y un menú de navegación. Los candidatos de pares no sirven: LI#438 (menú) trae cajas incoherentes con la imagen (siete cajas desde x=0 con anchos acumulativos, no ítems contiguos), así que su equivalencia visual no se certifica; A#278 son iconos de redes sociales y el logo innovimanet (auxiliares, no objetivo de la sección); LI#2053 son miniaturas de carrusel y A#2036/SPAN#2064/SPAN#2059 son controles anterior/siguiente del carrusel (la rúbrica prohíbe elegirlos solo para poder puntuar); DIV#2030, SECTION#2029 (parcial, caja fuera del viewport) y DIV#245 agrupan franjas de distinta función, no pares. Sin conjunto principal I_principal es indefinido y ninguna ancla de la rúbrica cubre el caso. Sanity y consentimiento no verificados (null) y la revisión de captura es sin_verificar.»

**Para comparar.** En este aspecto, un 0 es: hay contenido útil con apariencia de publicidad y, al mismo tiempo, o no destaca nada o destacan tres o más elementos: lo importante está escondido y la pantalla no orienta. Un 4 es: lo del nivel 3 y, además, el elemento destaca por más de una vía a la vez (por ejemplo color y grosor, o color y tamaño), así que no depende solo del color.

**Qué tan firme es la base.** Este aspecto dice si algo se distingue de sus pares, no hacia dónde mira la gente: el efecto original trata de lo que se recuerda, no de la atención.

### 3.4 Tamaño y separación de lo que se puede pulsar (sobre el esquema de cajas de la página)

*En los archivos técnicos: Targeting motor (G7).*

**Pregunta.** ¿Los elementos que se pueden pulsar tienen un tamaño suficiente y están bien separados entre sí?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** Dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** La condición que fijó el nivel fue «tamaños uniformes por familia» (código `consistencia`). Mira si los elementos pulsables del mismo tipo y del mismo grupo tienen el mismo ancho y el mismo alto, con 2 píxeles de tolerancia. En esta evaluación: elementos pulsables de una familia con tamaños desiguales: 9 de 11.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, el elemento principal es visiblemente más grande que los secundarios.

**Qué tan firme es la base.** Solo se evalúan el tamaño y la separación, no el tiempo que toma llegar a un elemento. El mínimo de 24 píxeles viene de la norma de accesibilidad WCAG 2.2; los cortes de 32 y de 8 píxeles son convención del proyecto.

### 3.5 Tamaño y separación de lo que se puede pulsar (sobre la imagen de la página)

*En los archivos técnicos: Targeting motor (G7).*

**Pregunta.** ¿Los elementos que se pueden pulsar tienen un tamaño suficiente y están bien separados entre sí?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** Dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** La condición que fijó el nivel fue «tamaños uniformes por familia» (código `consistencia`). Mira si los elementos pulsables del mismo tipo y del mismo grupo tienen el mismo ancho y el mismo alto, con 2 píxeles de tolerancia. En esta evaluación: elementos pulsables de una familia con tamaños desiguales: 9 de 11.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, el elemento principal es visiblemente más grande que los secundarios.

**Qué tan firme es la base.** Solo se evalúan el tamaño y la separación, no el tiempo que toma llegar a un elemento. El mínimo de 24 píxeles viene de la norma de accesibilidad WCAG 2.2; los cortes de 32 y de 8 píxeles son convención del proyecto.

## 4. Qué mejorar primero

Solo salen de un nivel 2 o menor y de la condición que lo fijó, del nivel más bajo al más alto. Son la lectura directa de cada condición, no un plan revisado por expertos; el elemento exacto sobre el que actuar está en la carpeta `resultados`.

1. **Tamaño y separación de lo que se puede pulsar (sobre el esquema de cajas de la página)** (nivel 0). Igualar el ancho y el alto de los elementos pulsables de una misma familia. Sale de la condición «tamaños uniformes por familia».
2. **Tamaño y separación de lo que se puede pulsar (sobre la imagen de la página)** (nivel 0). Igualar el ancho y el alto de los elementos pulsables de una misma familia. Sale de la condición «tamaños uniformes por familia».

Sin mejoras propuestas:

- Cantidad y organización de las opciones (sobre el esquema de cajas de la página): no se pudo evaluar; no se sabe si está bien o mal.
- Cantidad y organización de las opciones (sobre la imagen de la página): no se pudo evaluar; no se sabe si está bien o mal.
- Qué destaca en la pantalla (sobre la imagen de la página): no se pudo evaluar; no se sabe si está bien o mal.

## 5. Qué este resultado no dice

- Describe una sola pantalla, la que se ve sin desplazarse. No describe la página completa ni el sitio.
- Viene de 1 repetición por aspecto, de un solo modelo (`claude-sonnet-5-5`). Otro modelo, u otra repetición, puede dar otro resultado.
- Los niveles son juicios de un modelo sobre medidas que calcula un programa. No sustituyen la revisión de una persona experta, y este resultado no se ha comparado con una.
- Un aspecto que no se pudo evaluar no está bien ni mal: no se sabe. En este resultado: Cantidad y organización de las opciones (sobre el esquema de cajas de la página); Cantidad y organización de las opciones (sobre la imagen de la página); Qué destaca en la pantalla (sobre la imagen de la página).
- «No aplica» y «no se pudo evaluar» no son ceros.
- No hay puntaje total ni calificación de la página.

---

Detalle técnico: `perfil.md` y `perfil.json`, en esta misma carpeta. Diccionario de lenguaje claro: versión 1.0.0 (`shared/lenguaje-claro.json`).
