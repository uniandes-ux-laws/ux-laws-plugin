# Resumen de la evaluación

Lo arma un programa a partir del resultado (`perfil.json`) y de un diccionario fijo. No lo redacta un modelo ni agrega opiniones a las del evaluador.

## 1. Qué se evaluó

- **Página:** https://www.epssura.com/
- **Fecha de la captura:** 10 de septiembre de 2026, 23:16 (hora UTC)
- **Alcance:** una sola pantalla: lo que se ve sin desplazarse en una ventana de 1440 × 900 píxeles. No se evaluó el resto de la página ni otras páginas del sitio.
- **Quién evaluó:** el modelo `claude-opus-5-5`, ejecutado en `claude-code-vscode`. En este resumen, «el evaluador» es ese modelo. Parámetros de generación del modelo: no expuesto por el runtime.
- **Cuántas veces:** cada aspecto se evaluó 1 vez. Con una sola evaluación no hay medida de estabilidad: no se sabe si el modelo repetiría este resultado.
- **Aviso sobre la captura:** El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

## 2. Cómo leerlo

1. Cada aspecto recibe un nivel de 0 a 4. En general: 0, la pantalla falla en ese aspecto; 3, cumple en todo lo que se pudo observar; 4, cumple y además hace algo adicional, definido en cada aspecto (no significa «muy bueno»). Qué es un 0 y un 4 en cada aspecto está escrito en cada uno.
2. El resultado es un perfil de siete aspectos, no una calificación de la página.
3. No hay puntaje total: los niveles son etiquetas ordenadas, no cantidades, así que no se promedian; y un total haría pesar igual un aspecto que reúne una sola ley y otro que reúne cuatro.

«No aplica»: la pantalla cumple una condición objetiva por la que ese aspecto no tiene nada que evaluar. «No se pudo evaluar»: el aspecto sí aplica, pero faltó evidencia o lo observado no tiene un nivel definido en la rúbrica (la guía escrita con que se evalúa cada aspecto). Ninguno de los dos es un cero.

## 3. Los siete aspectos

De un vistazo:

| Aspecto | Resultado | Condición que lo fijó |
|---|---|---|
| Agrupación visual de los elementos | nivel 0 (no interpretable) | separación entre grupos y alineación y anchos regulares y uniformidad entre elementos equivalentes |
| Cantidad y organización de las opciones | no se pudo evaluar | — |
| Cantidad de contenido a la vez y cómo está dividido | nivel 2 | unidades de contenido a la vez |
| Qué destaca en la pantalla | nivel 1 | elementos que destacan entre sus pares |
| Orden de las listas y avance en un proceso | nivel 1 | primer elemento de la lista principal |
| Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación | nivel 2 | elementos sobrantes |
| Tamaño y separación de lo que se puede pulsar | nivel 0 | tamaños uniformes por familia |

El detalle de cada aspecto sigue abajo.

### 3.1 Agrupación visual de los elementos

*En los archivos técnicos: Agrupación perceptual (G1).*

**Pregunta.** ¿La forma en que los elementos están separados, enmarcados y alineados deja ver qué va con qué?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** En toda la pantalla, el espacio, los marcos y la forma dicen cosas distintas sobre qué va con qué: dos o más de las cuatro condiciones fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** El evaluador nombró 3 condiciones a la vez como las que fijaron el nivel:

- «separación entre grupos» (código `C1`). Mira si cada grupo está más separado de lo que lo rodea que sus propios elementos entre sí (al menos una vez y media). En esta evaluación: grupos con más de un elemento que no cumplen la separación: 1 de 3.
- «alineación y anchos regulares» (código `C3`). Mira si los bloques caen en los cuatro ejes de alineación y en los tres anchos más usados de la pantalla. En esta evaluación: bloques principales fuera de los ejes o de los anchos más usados: 8 de 13.
- «uniformidad entre elementos equivalentes» (código `C4`). Mira si los elementos que cumplen la misma función (por ejemplo, las tarjetas de una fila) tienen el mismo alto y la misma alineación. El ancho no cuenta. En esta evaluación: conjuntos de elementos equivalentes con algún miembro distinto en alto o en alineación: 13 de 19.

**Para comparar.** En este aspecto, un 0 es: en toda la pantalla, el espacio, los marcos y la forma dicen cosas distintas sobre qué va con qué: dos o más de las cuatro condiciones fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, la agrupación se lee en dos niveles: los grupos forman secciones y las secciones se separan entre sí más que los grupos que contienen.

**Qué tan firme es la base.** Los cortes numéricos de este aspecto son una convención del proyecto: las fuentes muestran que la cercanía organiza lo que vemos, pero no dan un número a partir del cual una interfaz sea aceptable.

**Advertencia.** Este aspecto no es interpretable en la versión 1 del instrumento: en las páginas de prueba no distinguió lo suficiente entre una página y otra. Su resultado se muestra como diagnóstico y no se usa para proponer mejoras.

### 3.2 Cantidad y organización de las opciones

*En los archivos técnicos: Arquitectura de decisión (G2).*

**Pregunta.** ¿Cuántas opciones enfrenta la persona a la vez, están organizadas en grupos y hay una acción principal que se distinga?

**Resultado.** No se pudo evaluar.

**Por qué no hay nivel.** «No se pudo evaluar»: el aspecto sí aplica, pero faltó evidencia o lo observado no tiene un nivel definido en la rúbrica (la guía escrita con que se evalúa cada aspecto). El evaluador lo explicó así: «g2_n1=10 cae en el intervalo del nivel 1 (9 a 12), pero el nivel 1 exige además agrupación débil y la agrupación observada es parcial: la barra superior, el encabezado (8 opciones) y la navegación principal (7) forman filas coherentes separadas por reglas, mientras la franja 'opciones a un clic' queda repartida en grupos de una opción y el enlace flotante 2010 se agrupa con 986. El nivel 2 exige n1 entre 6 y 8 y el nivel 3 n1<=5, así que ninguna ancla cubre n1=10 con agrupación parcial. El nivel 0 no aplica: n1 no supera 12 y existen acciones primarias distinguibles (408, 789), aunque no dominan.» Códigos que aparecen en esa explicación: `n1`: grupos de opciones a la vez.

**Para comparar.** En este aspecto, un 0 es: hay más de 12 grupos de opciones a la vez y sin agrupar, o no se distingue ninguna acción principal en una pantalla que pide tomar una decisión. Un 4 es: lo del nivel 3 y, además, la pantalla reduce lo que hay que decidir: muestra las opciones por etapas, trae valores por defecto sensatos u ordena las decisiones en secuencia, con al menos una ayuda para comparar.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen de las fuentes: el estudio de Hick midió tiempos de reacción, no un número aceptable de botones, y el efecto de «sobrecarga de elección» no se ha podido reproducir de forma fiable.

### 3.3 Cantidad de contenido a la vez y cómo está dividido

*En los archivos técnicos: Capacidad y segmentación (G3).*

**Pregunta.** ¿Cuántas cosas hay que atender a la vez, están divididas en bloques con título, queda algún dato necesario fuera de la vista y hay contenido ajeno compitiendo con la tarea?

**Resultado.** Nivel 2 (escala de 0 a 4).

**Qué quiere decir un 2 en este aspecto.** Entre 6 y 8 unidades, divididas en bloques con título, sin mezclas, sin datos fuera de la vista y sin contenido ajeno dentro de la zona de la tarea.

**Por qué.** La condición que fijó el nivel fue «unidades de contenido a la vez» (código `U`). Mira cuántas unidades (un campo, una tarjeta, una fila, un bloque de texto) hay que leer o decidir por separado en la zona principal. En esta evaluación: unidades que contó el evaluador: 6.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: pasa alguna de estas tres cosas: hay más de 12 unidades de contenido a la vez sin dividir en bloques; un dato necesario queda fuera de la vista; o el contenido ajeno ocupa más espacio que la tarea en su propia zona. Un 4 es: lo del nivel 3 y, además, la pantalla deja para después lo que no se necesita ahora (secciones plegadas o pasos en secuencia), de modo que se reconoce el bloque activo sin leer los demás.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen del estudio de Miller; la capacidad de memoria que suele citarse, el «siete», está desactualizada.

### 3.4 Qué destaca en la pantalla

*En los archivos técnicos: Saliencia visual (G4).*

**Pregunta.** Entre elementos equivalentes, ¿hay uno que destaque, es el que la sección quiere promover, y hay contenido útil que parezca publicidad o relleno?

**Resultado.** Nivel 1 (escala de 0 a 4).

**Qué quiere decir un 1 en este aspecto.** Hay contenido útil con apariencia de publicidad; o bien, sin eso, no destaca ningún elemento entre sus pares o destacan tres o más, que para este aspecto equivale a ninguno.

**Por qué.** La condición que fijó el nivel fue «elementos que destacan entre sus pares» (código `I`). Mira cuántos elementos del conjunto principal rompen el patrón visual de sus equivalentes, por relleno, borde, grosor de letra, tamaño o color. En esta evaluación: elementos que destacan en el conjunto principal: 0.

**Para comparar.** En este aspecto, un 0 es: hay contenido útil con apariencia de publicidad y, al mismo tiempo, o no destaca nada o destacan tres o más elementos: lo importante está escondido y la pantalla no orienta. Un 4 es: lo del nivel 3 y, además, el elemento destaca por más de una vía a la vez (por ejemplo color y grosor, o color y tamaño), así que no depende solo del color.

**Qué tan firme es la base.** Este aspecto dice si algo se distingue de sus pares, no hacia dónde mira la gente: el efecto original trata de lo que se recuerda, no de la atención.

### 3.5 Orden de las listas y avance en un proceso

*En los archivos técnicos: Posición y progreso (G5).*

**Pregunta.** ¿Las listas distinguen su primer elemento del resto y, si la pantalla es un paso de un proceso, muestra en qué paso va la persona?

**Resultado.** Nivel 1 (escala de 0 a 4).

**Qué quiere decir un 1 en este aspecto.** Hay un indicador de avance, pero no explica el recorrido o no señala el paso actual; o bien solo una lista secundaria distingue posiciones y la principal es plana.

**Por qué.** La condición que fijó el nivel fue «primer elemento de la lista principal» (código `J_inicio`). Mira si el primer elemento de la lista principal está diferenciado del resto por forma, tamaño, separación o agrupación propia. En esta evaluación: el primer elemento está diferenciado: no.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: la pantalla es un paso de un proceso y no lo indica; o bien no lo es y todas sus listas son planas, es decir, ningún elemento se distingue por su posición. Un 4 es: lo del nivel 3 y, además, el último elemento de la lista principal también está diferenciado, sin competir con el primero.

**Qué tan firme es la base.** Se evalúa si el avance se hace visible, no si eso motiva a la persona: el efecto de motivación no se puede observar en una imagen.

### 3.6 Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación

*En los archivos técnicos: Economía y convención (G6).*

**Pregunta.** ¿Hay elementos sin función, tareas que la pantalla le deja a la persona aunque el sistema podría resolverlas, o elementos habituales puestos donde no se acostumbra?

**Resultado.** Nivel 2 (escala de 0 a 4).

**Qué quiere decir un 2 en este aspecto.** Una costumbre de ubicación rota; o elementos sobrantes en casos aislados, sin costumbres rotas ni trabajo dejado a la persona.

**Por qué.** La condición que fijó el nivel fue «elementos sobrantes» (código `R`). Mira cuántos elementos no llevan información ni permiten una acción: separadores decorativos, recuadros vacíos y repeticiones del mismo dato. En esta evaluación: elementos sobrantes identificados: 1.

**Lo que sí se pudo revisar.** De las 8 costumbres de ubicación del catálogo: comprobadas, 4 (se cumplen: 4; no se cumplen: 0); no aplican a esta pantalla, 2; sin determinar, 2. Se cumple: el logo va arriba a la izquierda y lleva al inicio (código `K1`); el buscador va arriba, centrado o a la derecha (código `K2`); el carrito o el acceso a la cuenta va arriba a la derecha (código `K3`); el menú principal va horizontal arriba o vertical a la izquierda (código `K4`).

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: tres o más costumbres de ubicación rotas; o bien la pantalla le deja trabajo a la persona y, además, los elementos sobrantes afectan a la mayoría de los bloques. Un 4 es: lo del nivel 3 y, además, la pantalla le quita trabajo a la persona: valores por defecto sensatos, campos ya llenos con lo que el sistema sabe, varios formatos aceptados o cálculos ya resueltos.

**Qué tan firme es la base.** Las tres «leyes» de este aspecto (Occam, Tesler y Jakob) son consejos de práctica profesional, sin estudio experimental detrás. El resultado dice algo sobre los criterios de este proyecto, no sobre una ley comprobada.

### 3.7 Tamaño y separación de lo que se puede pulsar

*En los archivos técnicos: Targeting motor (G7).*

**Pregunta.** ¿Los elementos que se pueden pulsar tienen un tamaño suficiente y están bien separados entre sí?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** Dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** La condición que fijó el nivel fue «tamaños uniformes por familia» (código `consistencia`). Mira si los elementos pulsables del mismo tipo y del mismo grupo tienen el mismo ancho y el mismo alto, con 2 píxeles de tolerancia. En esta evaluación: elementos pulsables de una familia con tamaños desiguales: 4 de 4.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, el elemento principal es visiblemente más grande que los secundarios.

**Qué tan firme es la base.** Solo se evalúan el tamaño y la separación, no el tiempo que toma llegar a un elemento. El mínimo de 24 píxeles viene de la norma de accesibilidad WCAG 2.2; los cortes de 32 y de 8 píxeles son convención del proyecto.

## 4. Qué mejorar primero

Solo salen de un nivel 2 o menor y de la condición que lo fijó, del nivel más bajo al más alto. Son la lectura directa de cada condición, no un plan revisado por expertos; el elemento exacto sobre el que actuar está en la carpeta `resultados`.

1. **Tamaño y separación de lo que se puede pulsar** (nivel 0). Igualar el ancho y el alto de los elementos pulsables de una misma familia. Sale de la condición «tamaños uniformes por familia».
2. **Qué destaca en la pantalla** (nivel 1). Hacer que destaque un solo elemento del conjunto principal: el que la sección quiere promover. Sale de la condición «elementos que destacan entre sus pares».
3. **Orden de las listas y avance en un proceso** (nivel 1). Diferenciar el primer elemento de la lista principal por forma, tamaño o separación. Sale de la condición «primer elemento de la lista principal».
4. **Cantidad de contenido a la vez y cómo está dividido** (nivel 2). Mostrar menos unidades a la vez o dividirlas en bloques con título; el nivel 3 pide cinco bloques o menos. Sale de la condición «unidades de contenido a la vez».
5. **Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación** (nivel 2). Quitar los elementos que no informan ni permiten actuar, y las repeticiones del mismo dato. Sale de la condición «elementos sobrantes».

Sin mejoras propuestas:

- Agrupación visual de los elementos: no es interpretable en la versión 1.
- Cantidad y organización de las opciones: no se pudo evaluar; no se sabe si está bien o mal.

## 5. Qué este resultado no dice

- Describe una sola pantalla, la que se ve sin desplazarse. No describe la página completa ni el sitio.
- Viene de 1 repetición por aspecto, de un solo modelo (`claude-opus-5-5`). Otro modelo, u otra repetición, puede dar otro resultado.
- Los niveles son juicios de un modelo sobre medidas que calcula un programa. No sustituyen la revisión de una persona experta, y este resultado no se ha comparado con una.
- «Agrupación visual de los elementos» no es interpretable en la versión 1 del instrumento: su nivel no sirve para comparar páginas.
- Un aspecto que no se pudo evaluar no está bien ni mal: no se sabe. En este resultado: Cantidad y organización de las opciones.
- «No aplica» y «no se pudo evaluar» no son ceros.
- No hay puntaje total ni calificación de la página.

---

Detalle técnico: `perfil.md` y `perfil.json`, en esta misma carpeta. Diccionario de lenguaje claro: versión 1.0.0 (`shared/lenguaje-claro.json`).
