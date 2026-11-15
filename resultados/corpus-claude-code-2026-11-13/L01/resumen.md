# Resumen de la evaluación

Lo arma un programa a partir del resultado (`perfil.json`) y de un diccionario fijo. No lo redacta un modelo ni agrega opiniones a las del evaluador.

## 1. Qué se evaluó

- **Página:** https://uniandes.edu.co/
- **Fecha de la captura:** 10 de septiembre de 2026, 23:17 (hora UTC)
- **Alcance:** una sola pantalla: lo que se ve sin desplazarse en una ventana de 1440 × 900 píxeles. No se evaluó el resto de la página ni otras páginas del sitio.
- **Quién evaluó:** el modelo `claude-opus-5-5`, ejecutado en `claude-code-vscode`. En este resumen, «el evaluador» es ese modelo. Parámetros de generación del modelo: no expuesto por el runtime.
- **Cuántas veces:** cada aspecto se evaluó 1 vez. Con una sola evaluación no hay medida de estabilidad: no se sabe si el modelo repetiría este resultado.
- **Aviso sobre la captura:** Los nodos guardados incluyen un posible diálogo visible (3851). Confirmar en la imagen si tapa contenido.
- **Aviso sobre la captura:** La imagen guardada tiene una franja de cookies que cubre la parte inferior de la portada. El registro antiguo la marcó como limpia; conservar la advertencia sin cambiar la imagen.
- **Aviso sobre la captura:** Queda una capa o un aviso sin resolver. No presentar la página como despejada.
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
| Cantidad y organización de las opciones | nivel 2 | grupos de opciones a la vez |
| Cantidad de contenido a la vez y cómo está dividido | no se pudo evaluar | — |
| Qué destaca en la pantalla | no se pudo evaluar | — |
| Orden de las listas y avance en un proceso | nivel 0 | listas planas |
| Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación | no se pudo evaluar | — |
| Tamaño y separación de lo que se puede pulsar | nivel 0 | tamaños uniformes por familia |

El detalle de cada aspecto sigue abajo.

### 3.1 Agrupación visual de los elementos

*En los archivos técnicos: Agrupación perceptual (G1).*

**Pregunta.** ¿La forma en que los elementos están separados, enmarcados y alineados deja ver qué va con qué?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** En toda la pantalla, el espacio, los marcos y la forma dicen cosas distintas sobre qué va con qué: dos o más de las cuatro condiciones fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** El evaluador nombró 3 condiciones a la vez como las que fijaron el nivel:

- «separación entre grupos» (código `C1`). Mira si cada grupo está más separado de lo que lo rodea que sus propios elementos entre sí (al menos una vez y media). En esta evaluación: grupos con más de un elemento que no cumplen la separación: 1 de 3.
- «alineación y anchos regulares» (código `C3`). Mira si los bloques caen en los cuatro ejes de alineación y en los tres anchos más usados de la pantalla. En esta evaluación: bloques principales fuera de los ejes o de los anchos más usados: 10 de 13.
- «uniformidad entre elementos equivalentes» (código `C4`). Mira si los elementos que cumplen la misma función (por ejemplo, las tarjetas de una fila) tienen el mismo alto y la misma alineación. El ancho no cuenta. En esta evaluación: conjuntos de elementos equivalentes con algún miembro distinto en alto o en alineación: 10 de 18.

**Para comparar.** En este aspecto, un 0 es: en toda la pantalla, el espacio, los marcos y la forma dicen cosas distintas sobre qué va con qué: dos o más de las cuatro condiciones fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, la agrupación se lee en dos niveles: los grupos forman secciones y las secciones se separan entre sí más que los grupos que contienen.

**Qué tan firme es la base.** Los cortes numéricos de este aspecto son una convención del proyecto: las fuentes muestran que la cercanía organiza lo que vemos, pero no dan un número a partir del cual una interfaz sea aceptable.

**Advertencia.** Este aspecto no es interpretable en la versión 1 del instrumento: en las páginas de prueba no distinguió lo suficiente entre una página y otra. Su resultado se muestra como diagnóstico y no se usa para proponer mejoras.

### 3.2 Cantidad y organización de las opciones

*En los archivos técnicos: Arquitectura de decisión (G2).*

**Pregunta.** ¿Cuántas opciones enfrenta la persona a la vez, están organizadas en grupos y hay una acción principal que se distinga?

**Resultado.** Nivel 2 (escala de 0 a 4).

**Qué quiere decir un 2 en este aspecto.** Entre 6 y 8 grupos de opciones, agrupados solo en parte; hay una acción principal, pero no domina.

**Por qué.** La condición que fijó el nivel fue «grupos de opciones a la vez» (código `n1`). Mira cuántos grupos de opciones enfrenta la persona al mismo tiempo. En esta evaluación: grupos de opciones a la vez: 8; elementos sobre los que se puede actuar: 19.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: hay más de 12 grupos de opciones a la vez y sin agrupar, o no se distingue ninguna acción principal en una pantalla que pide tomar una decisión. Un 4 es: lo del nivel 3 y, además, la pantalla reduce lo que hay que decidir: muestra las opciones por etapas, trae valores por defecto sensatos u ordena las decisiones en secuencia, con al menos una ayuda para comparar.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen de las fuentes: el estudio de Hick midió tiempos de reacción, no un número aceptable de botones, y el efecto de «sobrecarga de elección» no se ha podido reproducir de forma fiable.

### 3.3 Cantidad de contenido a la vez y cómo está dividido

*En los archivos técnicos: Capacidad y segmentación (G3).*

**Pregunta.** ¿Cuántas cosas hay que atender a la vez, están divididas en bloques con título, queda algún dato necesario fuera de la vista y hay contenido ajeno compitiendo con la tarea?

**Resultado.** No se pudo evaluar.

**Por qué no hay nivel.** Lo observado no corresponde a ningún nivel definido en la rúbrica, o faltó evidencia. La escala no se completa a la fuerza. El evaluador lo explicó así: «La capa de consentimiento 3851/3852 (fija, x0 y688.9 w1440 h211.1) cubre el tercio inferior de la región 1391, incluida parte del CTA 1449, los controles 1466/1475 y todo el bloque 1495 (sus hijos 1514 y 1520 quedan ocultos). La revisión de captura la registra como capa sin resolver que no se debe presentar como despejada ni penalizar automáticamente. Si se cuenta como ajeno interior, su área (unión recortada ≈1440×211) supera la unión de las unidades de tarea (≈72.000 px² con 1438,1442,1449,1466,1475) y fijaría nivel 0 por X; si no se cuenta, el inventario sigue incompleto bajo la capa y X=0 no es demostrable para el nivel 3. Ningún juicio de X sostenible permite aplicar un ancla, así que se abstiene.» Códigos que aparecen en esa explicación: `X`: contenido ajeno a la tarea.

**Para comparar.** En este aspecto, un 0 es: pasa alguna de estas tres cosas: hay más de 12 unidades de contenido a la vez sin dividir en bloques; un dato necesario queda fuera de la vista; o el contenido ajeno ocupa más espacio que la tarea en su propia zona. Un 4 es: lo del nivel 3 y, además, la pantalla deja para después lo que no se necesita ahora (secciones plegadas o pasos en secuencia), de modo que se reconoce el bloque activo sin leer los demás.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen del estudio de Miller; la capacidad de memoria que suele citarse, el «siete», está desactualizada.

### 3.4 Qué destaca en la pantalla

*En los archivos técnicos: Saliencia visual (G4).*

**Pregunta.** Entre elementos equivalentes, ¿hay uno que destaque, es el que la sección quiere promover, y hay contenido útil que parezca publicidad o relleno?

**Resultado.** No se pudo evaluar.

**Por qué no hay nivel.** Lo observado no corresponde a ningún nivel de la rúbrica, o no se pudo sostener cuál es el conjunto principal de elementos. El evaluador lo explicó así: «No se puede sostener un conjunto principal. La sección principal visible (hero 'Estudiando el cielo desde los Andes', 1432/1436) tiene una sola acción ('Conoce más', 1445) y ningún conjunto de pares entre los candidatos; el contenido bajo el hero queda tapado por el aviso de cookies (3851/3853), con sanity_ok=false y consent_limpio=false. Los únicos conjuntos equivalentes son navegación auxiliar del encabezado (A#255, DIV#291), controles de video (DIV#1462) y botones del interstitial de cookies (BUTTON#3891), que representan otro alcance. Tomar la navegación principal solo para puntuar sustituiría contenido principal incompleto por navegación auxiliar; además su único aislado (269, 'Admisiones' subrayado en amarillo) dejaría P indeterminado: el subrayado puede ser un estado de sección o de cursor y la pantalla no declara que la sección promueva esa entrada.» Códigos que aparecen en esa explicación: `P`: correspondencia de lo que destaca.

**Para comparar.** En este aspecto, un 0 es: hay contenido útil con apariencia de publicidad y, al mismo tiempo, o no destaca nada o destacan tres o más elementos: lo importante está escondido y la pantalla no orienta. Un 4 es: lo del nivel 3 y, además, el elemento destaca por más de una vía a la vez (por ejemplo color y grosor, o color y tamaño), así que no depende solo del color.

**Qué tan firme es la base.** Este aspecto dice si algo se distingue de sus pares, no hacia dónde mira la gente: el efecto original trata de lo que se recuerda, no de la atención.

### 3.5 Orden de las listas y avance en un proceso

*En los archivos técnicos: Posición y progreso (G5).*

**Pregunta.** ¿Las listas distinguen su primer elemento del resto y, si la pantalla es un paso de un proceso, muestra en qué paso va la persona?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** La pantalla es un paso de un proceso y no lo indica; o bien no lo es y todas sus listas son planas, es decir, ningún elemento se distingue por su posición.

**Por qué.** La condición que fijó el nivel fue «listas planas» (código `lista_plana`). Mira si todas las listas son planas: sus elementos son idénticos y están a la misma distancia, sin que ninguno se distinga por su posición. En esta evaluación: listas encontradas en la pantalla: 2.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: la pantalla es un paso de un proceso y no lo indica; o bien no lo es y todas sus listas son planas, es decir, ningún elemento se distingue por su posición. Un 4 es: lo del nivel 3 y, además, el último elemento de la lista principal también está diferenciado, sin competir con el primero.

**Qué tan firme es la base.** Se evalúa si el avance se hace visible, no si eso motiva a la persona: el efecto de motivación no se puede observar en una imagen.

### 3.6 Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación

*En los archivos técnicos: Economía y convención (G6).*

**Pregunta.** ¿Hay elementos sin función, tareas que la pantalla le deja a la persona aunque el sistema podría resolverlas, o elementos habituales puestos donde no se acostumbra?

**Resultado.** No se pudo evaluar.

**Por qué no hay nivel.** Con lo que se ve en una sola pantalla no se pudo comprobar lo suficiente para sostener un nivel; por ejemplo, que algo no se vea en la captura no demuestra que el sitio no lo tenga. El nivel queda vacío y se muestra lo que sí se pudo revisar. El evaluador lo explicó así: «El nivel 3 exige K=0 entre todas las convenciones aplicables, T=0 y R=0. K=0, T=0 y R=0 se confirman sobre lo visible, pero K3, K7 y K8 quedan con aplicabilidad indeterminada: no se ve acceso a cuenta ni pie, y no se puede deducir si el sitio tiene sesión de usuario o si la ausencia de ruta en esta portada es incumplimiento. Si esas tres resultaran aplicables y rotas, K podría llegar a 3 (nivel 0). Ninguna regla prioritaria (K>=3, K=2, K=1, T>=1) está demostrada, así que falta un juicio necesario para sostener el nivel. Además, el diálogo de consentimiento 3851 tapa la franja inferior (y>=689), incluida la región 1511 con el enlace 1520 y el botón flotante 3030, que no pueden juzgarse para R ni T.» Códigos que aparecen en esa explicación: `K3`: el carrito o el acceso a la cuenta va arriba a la derecha; `K7`: los enlaces legales y de contacto van en el pie de página; `K8`: la ruta de navegación va justo debajo del encabezado; `R`: elementos sobrantes; `T`: trabajo que se le deja a la persona; `K`: costumbres de ubicación rotas.

**Lo que sí se pudo revisar.** De las 8 costumbres de ubicación del catálogo: comprobadas, 4 (se cumplen: 4; no se cumplen: 0); no aplican a esta pantalla, 1; sin determinar, 3. Se cumple: el logo va arriba a la izquierda y lleva al inicio (código `K1`); el buscador va arriba, centrado o a la derecha (código `K2`); el menú principal va horizontal arriba o vertical a la izquierda (código `K4`); en un par de botones, la acción principal va a la derecha (código `K6`).

**Para comparar.** En este aspecto, un 0 es: tres o más costumbres de ubicación rotas; o bien la pantalla le deja trabajo a la persona y, además, los elementos sobrantes afectan a la mayoría de los bloques. Un 4 es: lo del nivel 3 y, además, la pantalla le quita trabajo a la persona: valores por defecto sensatos, campos ya llenos con lo que el sistema sabe, varios formatos aceptados o cálculos ya resueltos.

**Qué tan firme es la base.** Las tres «leyes» de este aspecto (Occam, Tesler y Jakob) son consejos de práctica profesional, sin estudio experimental detrás. El resultado dice algo sobre los criterios de este proyecto, no sobre una ley comprobada.

### 3.7 Tamaño y separación de lo que se puede pulsar

*En los archivos técnicos: Targeting motor (G7).*

**Pregunta.** ¿Los elementos que se pueden pulsar tienen un tamaño suficiente y están bien separados entre sí?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** Dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** La condición que fijó el nivel fue «tamaños uniformes por familia» (código `consistencia`). Mira si los elementos pulsables del mismo tipo y del mismo grupo tienen el mismo ancho y el mismo alto, con 2 píxeles de tolerancia. En esta evaluación: elementos pulsables de una familia con tamaños desiguales: 5 de 8.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, el elemento principal es visiblemente más grande que los secundarios.

**Qué tan firme es la base.** Solo se evalúan el tamaño y la separación, no el tiempo que toma llegar a un elemento. El mínimo de 24 píxeles viene de la norma de accesibilidad WCAG 2.2; los cortes de 32 y de 8 píxeles son convención del proyecto.

## 4. Qué mejorar primero

Solo salen de un nivel 2 o menor y de la condición que lo fijó, del nivel más bajo al más alto. Son la lectura directa de cada condición, no un plan revisado por expertos; el elemento exacto sobre el que actuar está en la carpeta `resultados`.

1. **Orden de las listas y avance en un proceso** (nivel 0). Diferenciar el primer elemento de la lista principal por forma, tamaño, separación o agrupación propia. Sale de la condición «listas planas».
2. **Tamaño y separación de lo que se puede pulsar** (nivel 0). Igualar el ancho y el alto de los elementos pulsables de una misma familia. Sale de la condición «tamaños uniformes por familia».
3. **Cantidad y organización de las opciones** (nivel 2). Reunir las opciones en menos grupos visibles a la vez; el nivel 3 pide cinco o menos. Sale de la condición «grupos de opciones a la vez».

Sin mejoras propuestas:

- Agrupación visual de los elementos: no es interpretable en la versión 1.
- Cantidad de contenido a la vez y cómo está dividido: no se pudo evaluar; no se sabe si está bien o mal.
- Qué destaca en la pantalla: no se pudo evaluar; no se sabe si está bien o mal.
- Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación: no se pudo evaluar; no se sabe si está bien o mal.

## 5. Qué este resultado no dice

- Describe una sola pantalla, la que se ve sin desplazarse. No describe la página completa ni el sitio.
- Viene de 1 repetición por aspecto, de un solo modelo (`claude-opus-5-5`). Otro modelo, u otra repetición, puede dar otro resultado.
- Los niveles son juicios de un modelo sobre medidas que calcula un programa. No sustituyen la revisión de una persona experta, y este resultado no se ha comparado con una.
- «Agrupación visual de los elementos» no es interpretable en la versión 1 del instrumento: su nivel no sirve para comparar páginas.
- Un aspecto que no se pudo evaluar no está bien ni mal: no se sabe. En este resultado: Cantidad de contenido a la vez y cómo está dividido; Qué destaca en la pantalla; Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación.
- «No aplica» y «no se pudo evaluar» no son ceros.
- No hay puntaje total ni calificación de la página.

---

Detalle técnico: `perfil.md` y `perfil.json`, en esta misma carpeta. Diccionario de lenguaje claro: versión 1.0.0 (`shared/lenguaje-claro.json`).
