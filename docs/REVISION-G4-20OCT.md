# G4: revisión de los conjuntos dudosos

20 de octubre de 2026. Revisamos las 120 respuestas originales. Nueve páginas requieren
revisión por cambios de conjunto, nivel, puntaje/abstención o P indeterminado. Se contrastaron
sus screenshots y las cajas suministradas. Esto no equivale a calificación experta.

## Un problema en las marcas de recorte

La comparación histórica restaba áreas decimales. Un residuo numérico podía marcar como
parcial una caja completamente interior. La proyección nueva de G4 compara sus bordes y
solo ignora el margen de error de la aritmética de máquina: mantiene recortes reales incluso
menores de un píxel. Corrige **110 conjuntos** de las 24 páginas; **33 respuestas anteriores**
seleccionaron esos conjuntos. Estos números no son las 111 respuestas con evidencia insuficiente.

Las marcas originales quedan intactas. Quitar una falsa marca no demuestra que la evidencia
restante sea suficiente: hay cajas mal asociadas, recortes reales, superposiciones y dudas
sobre el objetivo de la sección. La entrada nueva declara versión G4 1.0.7 sobre la fuente
1.0.6; también retira las clases de los candidatos a banner. Los otros grupos se conservan.

## Qué observamos

**C06**. La tarjeta de entretenimiento sí difiere visualmente, pero su caja 688 abarca desde el origen hasta parte de la fila. Área y color de esa caja no describen solo la tarjeta. La fila no declara una prioridad común: P desconocido no debe convertirse automáticamente en falso. Hay cookies visibles.

**C07**. Las cuatro ofertas permiten comparar tratamientos, aunque el iPhone y el televisor tienen tamaños diferentes. Las respuestas discrepan sobre si hay uno o dos aislados. La fila se ve completa; el aviso inferior puede limitar otras zonas. La nueva regla no decide por sí sola cuántos aislados hay.

**C09**. El conjunto 798 son puntos del carrusel, un control de estado pequeño. El 815 contiene cajas grandes y superpuestas desde el origen, que no describen por separado las opciones visibles. Ninguno acredita por tamaño ser el contenido principal. Hay elementos flotantes y cookies.

**C13**. El par de acceso y registro se ve completo en el encabezado. Su marca de parcialidad es un error decimal. El cambio entre 3 y 4 depende de qué canales reconoce el evaluador, no de un recorte visible de ese par. Debe justificarse el alcance del encabezado.

**C17**. Se alternaron botones de suscripción/acceso y tarjetas de noticias bajas. Son alcances distintos. Las noticias bajas están tapadas en parte por publicidad; esa publicidad real no se cuenta como tarea camuflada (Bn) solo por ser un anuncio.

**C20**. Se alternaron iconos del encabezado y noticias inferiores. La caja 881 abarca regiones ajenas a su tarjeta; las inferiores también llegan al borde. Seleccionar los iconos completos no demuestra que representen la tarea editorial principal.

**C25**. La navegación horizontal y la lista lateral son secciones distintas. La lista lateral llega al borde inferior; la horizontal está visible y su marca de recorte es decimal. Ninguna elección se fija como referencia humana: debe explicarse qué sección se evalúa.

**R02**. Los ocho accesos de Most requested están visibles en dos filas. Su marca de recorte es decimal. La cuadrícula de servicios inferior sí queda cortada. El título de cada sección ayuda a justificar la selección; mezclar ambos alcances cambia lo evaluado.

**R03**. La tarjeta de entretenimiento difiere de las utilidades vecinas, pero la caja 697 abarca desde el origen. La fila no declara qué opción debe promover. La ausencia de esa declaración no demuestra P=false. Hay cookies visibles.

## Cómo seguimos

Se propone una fase dirigida con estas nueve páginas y ejemplos sintéticos separados.
Las observaciones y los ids preferidos no se entregan al evaluador. Debe justificar su
selección con la pantalla y los candidatos; si no alcanza la evidencia, se conserva la
abstención. No se recapturan páginas ni se arreglan cajas a mano.

Las reglas nuevas están en [las decisiones propuestas](DECISIONES-G4-20OCT.md), pendientes
de revisión con Camilo. La galería permite ver las cajas de los conjuntos seleccionados
en la fase anterior, sin asignarles una selección correcta automática.

- [Galería con cajas](../revisiones/g4-2026-10-20/index.html).
- [Revisión completa y hashes](../revisiones/g4-2026-10-20/revision.json).
- [Una fila por respuesta](../revisiones/g4-2026-10-20/revision.csv).

La comparación por áreas también existe en la detección histórica de G5. Esta fase corrige
solo la entrada de G4; el alcance sobre G5 requiere una revisión separada antes de tratar
sus marcas de parcialidad como recortes visualmente confirmados.
