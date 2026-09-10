# Especificación de implementación de las dieciocho leyes

Avance semana 6 · David Hernández (202220865) · Mateo Rincón (202221402) · Juan Francisco Rodríguez (202214603)

> Para cada una de las dieciocho leyes implementadas: qué mide, un ejemplo de la diferencia
> entre una página que la cumple y una que no, y qué necesita del wireframe. Después, cómo
> se genera el wireframe desde la página, y las decisiones de implementación que quedan
> fijadas.
>
> Va ordenado por grupo de constructo y no por autor, porque el sistema implementa siete
> skills —una por grupo, con una rúbrica cada una— y cinco de los siete grupos tienen leyes
> de más de un autor. Cada ley lleva marcado quién la trabajó.

## 0.  Alcance de este documento
Para cada una de las dieciocho leyes implementadas: qué mide, un ejemplo de la diferencia entre una página que la cumple y una que no, y qué necesita del wireframe. Después, cómo se genera el wireframe desde la página, y las decisiones de implementación que quedan fijadas.
Va ordenado por grupo de constructo y no por autor, porque el sistema implementa siete skills —una por grupo, con una rúbrica cada una— y cinco de los siete grupos tienen leyes de más de un autor. Los niveles de una rúbrica tienen que ser mutuamente excluyentes dentro del grupo, así que se escriben de una vez juntos. Cada ley lleva marcado quién la trabajó.
Autoría del contenido. Región común, Similitud, Miller, Chunking, Gradiente de meta y Tesler vienen del avance de Juan Francisco. Las demás se redactaron para este documento.

## 1.  Las dieciocho leyes y sus siete grupos

| | Constructo | Leyes subsumidas (autor) | Canal |
|---|---|---|---|
| G1 | Agrupación perceptual | Proximidad (David) · Prägnanz (Mateo) · Región común (Juan F.) · Similitud (Juan F.) | Wireframe |
| G2 | Arquitectura de decisión | Ley de Hick (David) · Sobrecarga de elección (Mateo) | Wireframe |
| G3 | Capacidad y segmentación | Miller (Juan F.) · Chunking (Juan F.) · Memoria de trabajo (Mateo) · Carga cognitiva (Mateo) | Wireframe |
| G4 | Saliencia visual | Von Restorff (David) · Atención selectiva (David) | **Screenshot** |
| G5 | Posición y progreso | Posición serial (Mateo) · Gradiente de meta (Juan F.) | Wireframe |
| G6 | Economía y convención | Navaja de Occam (David) · Ley de Tesler (Juan F.) · Ley de Jakob (Mateo) | Wireframe |
| G7 | Targeting motor | Ley de Fitts (David) | Wireframe |

Todas las leyes se puntúan en la escala ordinal anclada 0–4 del proyecto, y el puntaje se emite por grupo, no por ley. G4 es el único grupo que corre sobre el screenshot: lo que sus dos leyes miden vive en el color y el peso, que es lo que el wireframe abstrae. Los otros seis corren sobre el wireframe, y además sobre el screenshot para medir el término de representación.

## 2.  Las leyes, grupo por grupo

### G1 · Agrupación perceptual — wireframe
Mide si la estructura visual comunica la agrupación que el contenido tiene.

#### Proximidad · David
Qué mide. La separación entre elementos del mismo grupo comparada con la separación entre grupos. Si la interna es mayor o igual que la externa, la geometría comunica una agrupación distinta a la del contenido. Ejemplo. Un footer de cuatro columnas con 8 px entre enlaces y 48 px entre columnas se lee como cuatro grupos; con 16 px y 20 px se lee como dieciséis enlaces sueltos.
Del wireframe. Coordenadas y tamaño exactos de cada caja, y el espacio vacío sin normalizar. El generador no puede colapsar márgenes: el espaciado es la medición.

#### Prägnanz · Mateo
Qué mide. Regularidad estructural: cuántos ejes de alineación distintos hay entre los bloques principales, cuántos anchos de columna distintos, y si las regiones quedan rectangulares o dentadas. Ejemplo. Cuatro tarjetas sobre una grilla, alineadas a tres ejes y del mismo alto, contra las mismas cuatro con anchos y tops ligeramente distintos, donde cada una se vuelve su propia forma.
Del wireframe. Coordenadas exactas, igual que Proximidad. Recorte declarado. En Wertheimer, Prägnanz es la tendencia organizadora superordinada y no un principio de agrupación al nivel de los otros tres. La rúbrica puntúa regularidad estructural como aproximación operativa y lo declara.

#### Región común · Juan Francisco
Qué mide. Si los elementos de un bloque quedan dentro de un límite reconocible, o si alguno se sale y queda ambiguo a qué grupo pertenece. Ejemplo. Una página de precios con tres tarjetas de plan donde el botón del plan del medio queda desplazado fuera de su tarjeta, entre las otras dos.
Del wireframe. Los bordes, los fondos —con codificación neutra cuando el límite viene de un color de fondo y no de un borde— y los espacios entre elementos. Con cajas de texto sueltas sin límite visual no hay forma de saber a qué región pertenece cada cosa.

#### Similitud · Juan Francisco
Qué mide. Forma, tamaño y alineación entre elementos que deberían ser equivalentes. Ejemplo. Los botones "ver más" en un listado de tarjetas de cursos: si cinco miden lo mismo y uno queda más pequeño o con otra forma, esa diferencia es lo que se busca.
Del wireframe. Dimensiones exactas, radios de esquina y contorno de cada control. Si el generador convierte todo en el mismo rectángulo genérico, borra la diferencia que se mide. Recorte declarado. La similitud por color no se puntúa: el canal no tiene color.
Regla del grupo. Cuando proximidad y región común compiten sobre un mismo elemento —cerca del grupo A, dentro del borde del grupo B— el conflicto mismo es el defecto: la página es ambigua y el grupo baja de nivel. La rúbrica registra el caso como condición observable en vez de decidir cuál principio gana.

### G2 · Arquitectura de decisión — wireframe
Mide cuántas alternativas se presentan al mismo nivel, cómo están organizadas y si una domina. Su rúbrica está escrita completa en el Apéndice C de la propuesta.

#### Ley de Hick · David
Qué mide. Tres números que se reportan crudos junto al puntaje: n_total, todos los elementos accionables; n1, los grupos de primer nivel que se enfrentan a la vez; n_max, el grupo más grande. Ejemplo. Un portal de trámites con 38 enlaces de navegación al mismo nivel y sin acción dominante da n1 = 38, nivel 0. Los mismos 38 en 6 categorías con un botón que domina dan n1 = 6, nivel 3. Cambia la organización, no la cantidad de contenido.
Del wireframe. Saber qué caja es accionable. Sobre rectángulos sin etiqueta, un enlace y un párrafo son la misma caja y n_total no se puede contar. Recorte declarado. No se mide tiempo de reacción. Hick midió tiempo sobre alternativas equiprobables y sin significado y reportó una tasa de información, no un número de botones aceptable; Liu et al. (2020) argumentan que el principio de diseño no se sigue de ahí. La rúbrica puntúa arquitectura de decisión y sus umbrales son convención del proyecto.

#### Sobrecarga de elección · Mateo
Qué mide. Si el conjunto de alternativas viene con apoyos de decisión: filtros, ordenamiento, una opción marcada como recomendada, valores por defecto, tabla comparativa. Es lo que agrega sobre Hick. Ejemplo. Un catálogo de 48 productos en lista plana, sin filtros ni orden ni default, contra los mismos 48 con filtros por categoría, orden por defecto y tres recomendados. El n es idéntico.
Del wireframe. Lo mismo que Hick, más distinguir un control de filtro u ordenamiento de un enlace cualquiera. Recorte declarado. El meta-análisis de Scheibehenne et al. (2010), sobre 63 condiciones de 50 experimentos con 5.036 participantes, halló un efecto de D = 0,02 con intervalo de −0,09 a 0,12. La rúbrica puntúa presentación del surtido, que es lo que el diseñador manipula.

### G3 · Capacidad y segmentación — wireframe
Mide cuánto se pide sostener a la vez y qué tan bien está partido el contenido para no tener que hacerlo.

#### Ley de Miller · Juan Francisco
Qué mide. Las unidades expuestas al mismo tiempo y si hay agrupación o resúmenes que ayuden a manejarlas. No se usa un tope fijo de siete. Ejemplo. Un formulario de doce campos seguidos sin separación, contra esos doce en tres bloques de cuatro con encabezado.
Del wireframe. Cada campo como unidad separable, y las separaciones y encabezados entre grupos, aunque el contenido se dibuje como barra.

#### Chunking · Juan Francisco
Qué mide. Si los bloques agrupados corresponden a una sola idea o mezclan cosas distintas por dentro. Es lo que lo distingue de Miller, que solo cuenta. Ejemplo. Una pantalla de pedido con tres cajas donde una mezcla producto, dirección de envío y precio.
Del wireframe. Los divisores y la jerarquía espacial: qué encabezado corresponde a qué grupo.

#### Memoria de trabajo · Mateo
Qué mide. Si un dato requerido por un campo o una acción está fuera de vista en el momento en que se necesita. Ejemplo. Una tabla larga cuyo encabezado de columna se sale de vista al hacer scroll mientras las filas siguen, contra la misma con encabezado fijo.
Del wireframe. Posición de las cajas y si el elemento está fijo o pegajoso, que sale del estilo computado. Recorte declarado. Baddeley y Hitch (1974) proponen un modelo de la arquitectura de la memoria, no una regla de diseño. La rúbrica puntúa co-visibilidad, que es observable, y no carga de memoria.

#### Carga cognitiva · Mateo
Qué mide. Elementos presentados a la vez que compiten con la tarea de la pantalla sin pertenecer a ella. Ejemplo. Un checkout donde el formulario de pago convive con carrusel de promociones, productos relacionados y suscripción al boletín, contra el mismo con eso retirado.
Del wireframe. Conteo de cajas, límites de región y tipo de elemento. Recorte declarado. Sweller (1988) introdujo el constructo estudiando instrucción en matemáticas; ninguna parte del artículo trata de interfaces. La rúbrica se escribe contra propiedades observables de la pantalla y no contra los constructos internos de la teoría, que no se separan desde una captura.
Regla del grupo. Cuatro constructos de tres tradiciones distintas emiten un solo puntaje, así que la salida lleva además el campo que nombra cuál condición disparó el nivel. Sin eso, un G3 bajo no es diagnosticable. Nota: Cowan (2001) ubica la capacidad cerca de cuatro unidades y no de siete, y solo bajo condiciones que impiden el repaso, que es lo contrario de lo que una interfaz permite.

### G4 · Saliencia visual — screenshot
Único grupo fuera del wireframe. Lo que sus dos leyes miden vive en el color, el peso y el relleno; abstraerlos no las empeora, las deja sin objeto.

#### Efecto Von Restorff · David
Qué mide. Si existe exactamente un elemento que rompe el patrón visual de sus pares, y si es el que corresponde al propósito de la sección. Ejemplo. Una tabla de tres planes donde el del medio tiene fondo y borde distintos: un solo aislado. Contra cinco tarjetas donde tres tienen tratamientos distintos entre sí: tres énfasis compitiendo, que para el constructo es lo mismo que ninguno.
Del wireframe. Nada. Necesita el screenshot con color, tipografía y contraste intactos. Recorte declarado. Hunt (1995) muestra que el efecto es de recuerdo y no de atención, y que lo distintivo es relacional, definido contra un contexto de similitud. La rúbrica puntúa si hay un aislado respecto de su conjunto, no si atrae la mirada.

#### Atención selectiva · David
Qué mide. Contenido que carga significado y está tratado como publicidad: en posición de banner (franja superior a todo el ancho, columna derecha), con proporción de banner y tratamiento saturado, llevando navegación o una tarea. Ejemplo. Una página de EPS donde "Agendar cita" es una franja ancha de color arriba de todo, que se lee como promoción, contra la misma acción como botón dentro de la columna de contenido.
Del wireframe. La geometría, aunque el puntaje salga del screenshot: la posición y la proporción se miden sobre las cajas. Es el único grupo que lee las dos entradas. Recorte declarado. Benway (1998) es específico de web: documenta que los usuarios fallan en encontrar enlaces obvios cuando parecen banner.

### G5 · Posición y progreso en una secuencia — wireframe
Mide si el orden y el avance están expresados en la pantalla.

#### Efecto de posición serial · Mateo
Qué mide. Si una lista ordenada marca jerarquía por posición —un elemento destacado al inicio, o inicio y final diferenciados del cuerpo— o si es plana y todo pesa igual. Ejemplo. Una navegación de siete ítems donde el acceso a la cuenta está en la posición 4, contra la misma con ese acceso en el extremo y visualmente separado del resto.
Del wireframe. El orden de lectura de las cajas, que sale de geometría más orden de pintura, y la relación de contención para saber qué cajas forman una lista. Recorte declarado. Glanzer y Cunitz (1966) informan que diez segundos de interferencia eliminan la mayor parte del pico final y que con treinta no queda rastro. La recencia no sobrevive a un usuario que recorre un menú, lee y actúa, así que la rúbrica pondera la primacía por encima de la recencia.

#### Efecto de gradiente de meta · Juan Francisco
Qué mide. Si la pantalla deja ver en qué paso va el usuario y qué tan lejos está la meta. No se mide motivación. Ejemplo. Un trámite de cuatro pasos cuya pantalla del paso dos muestra los cuatro nombres y marca cuál va, contra una que solo tiene un botón "Continuar".
Del wireframe. Posición y longitud total del indicador, y la diferencia entre completado, actual y pendiente representada con forma o borde. Si esa diferencia depende solo del color, se marca como evidencia insuficiente en vez de inventar un estado.

### G6 · Economía y convención — wireframe
Ninguna de las tres leyes de este grupo tiene fuente empírica, y están juntas por eso. Occam es un principio de selección de teorías del siglo XIV. Tesler se atribuye a Larry Tesler en Xerox PARC y se escribió por primera vez en una entrevista. Jakob tiene origen en Nielsen (2000), que enuncia el principio como consejo profesional con ejemplos y sin estudio. Cualquier acuerdo que saque G6 es una afirmación sobre la rúbrica y no sobre una ley: es el grupo que permite preguntar si la operacionalizabilidad depende de que haya evidencia detrás.

#### Navaja de Occam · David
Qué mide. Elementos que no llevan información ni habilitan una acción: separadores decorativos, etiquetas repetidas, contenedores vacíos con peso visual, ayuda que solo repite la etiqueta. Ejemplo. Un formulario donde cada campo tiene etiqueta, placeholder que repite la etiqueta y ayuda que la repite por tercera vez, contra el mismo con una etiqueta y una ayuda que agrega el formato esperado.
Del wireframe. Conteo de cajas, jerarquía, y distinguir una caja que lleva contenido de una que es contenedor o decoración.

#### Ley de Tesler · Juan Francisco
Qué mide. Lo que le toca calcular o completar al usuario a mano frente a lo que resuelve el sistema por él. Ejemplo. Una pantalla que pide sumar tres subtotales manualmente, contra otra que muestra el total ya calculado.
Del wireframe. Distinguir campos de entrada de campos de resultado. Si todos se ven como la misma caja anónima, no hay forma de saber cuál exige algo y cuál informa.

#### Ley de Jakob · Mateo
Qué mide. Conformidad con un catálogo cerrado de ocho convenciones, fijado por escrito en la skill: logo arriba a la izquierda enlazando al inicio; buscador arriba, centrado o a la derecha; carrito o cuenta arriba a la derecha; navegación principal horizontal arriba o vertical a la izquierda; etiquetas de formulario encima o a la izquierda del campo; acción primaria a la derecha en un par de botones; enlaces legales en el pie; ruta de navegación bajo el encabezado. Ejemplo. Una tienda con el carrito abajo a la izquierda y el logo centrado en el pie rompe dos de las ocho sin razón funcional.
Del wireframe. Identidad, no solo tipo de elemento: sobre rectángulos en blanco no se distingue el logo de cualquier imagen. Los atributos del nodo (alt, aria-label, href, nombre de etiqueta) la dan sin dibujar texto. Recorte declarado. La convención es específica de plataforma y de época. El catálogo es de convenciones web, se fecha, y se cita como convención del proyecto y no como hallazgo.

### G7 · Targeting motor — wireframe
Un solo constructo: nada más en la colección mide apuntar, y no se fuerza a otra ley adentro para equilibrar la tabla.

#### Ley de Fitts · David
Qué mide. Tamaño de cada objetivo interactivo y separación entre objetivos adyacentes. Ejemplo. Una navegación a ancho de móvil con iconos de 24×24 px y 4 px entre ellos, contra la misma con 44×44 y 12 px: en la primera el error de un toque cae sobre el vecino.
Del wireframe. Dimensiones exactas en píxeles, que el árbol de layout da nativamente, y saber cuáles cajas son objetivos. Recorte declarado. Fitts necesita amplitud y ancho del objetivo; en una captura estática no hay posición inicial del cursor, así que solo el ancho es observable. El tamaño de objetivo además es criterio WCAG y los linters ya lo revisan: lo que distingue a esta rúbrica es la separación entre objetivos adyacentes.

## 3.  De la página al wireframe
El wireframe se genera desde el árbol de layout del navegador y no segmentando la imagen. Segmentar metería un segundo modelo cuyos errores caen en el mismo pipeline que los del evaluador, y una divergencia entre canales podría originarse ahí. Tomando las cajas del layout, la geometría de las dos representaciones sale de una sola pasada.
- Capturar con Chrome DevTools Protocol usando DOMSnapshot.captureSnapshot, que devuelve la caja de cada nodo, su texto y el orden de pintura.
- Retener solo los nodos que pintan algo, tienen área mayor a cero y no están completamente tapados por un hermano que pinta encima. Sin ese filtro el wireframe dibuja la estructura del HTML y no la página.
- Dibujar los nodos retenidos como rectángulos con contorno y los de texto como barras rellenas.
- Verificar fidelidad antes de evaluar: comparar posición y tamaño de cada elemento contra el original sobre páginas de prueba con geometría conocida, con una tolerancia fijada antes de medir.

### 3.1  El wireframe son dos archivos
Catorce de las dieciséis leyes que corren en wireframe necesitan algo que un rectángulo con contorno no comunica —accionabilidad, tipo de nodo, jerarquía, identidad, posición fija—. Todo eso ya viene en la misma llamada y se descarta al dibujar. captureSnapshot devuelve dos estructuras: LayoutTreeSnapshot con bounds, text, paintOrders y styles (los estilos computados que se pidan en el parámetro computedStyles), y NodeTreeSnapshot con nodeName, attributes e isClickable, definido en la especificación como "whether this DOM node responds to mouse clicks".
El generador produce entonces, por página, la imagen igual a como está descrita más un JSON con un registro por nodo retenido y el mismo id en los dos. La imagen no cambia, así que la comparación entre canales tampoco se toca.


| Campo | Origen | Quién lo usa |
|---|---|---|
| `id` | índice del nodo | Amarra el JSON con el dibujo |
| `bounds` | `LayoutTreeSnapshot.bounds` | G1 Proximidad y Prägnanz, G5, G7, G4 como apoyo |
| `isClickable` | `NodeTreeSnapshot.isClickable` | G2 (n_total y n1), G7 (qué caja es objetivo) |
| `nodeName` | `NodeTreeSnapshot.nodeName` | G6 contenedor vs contenido, G6 Tesler entrada vs resultado, G2, G3 |
| `attributes` | `NodeTreeSnapshot.attributes` | G6 Jakob: alt, aria-label, href y role dan identidad sin dibujar texto |
| `position` | `styles`, pidiendo `position` | G3 Memoria de trabajo (encabezado fijo o pegajoso) |
| `parentId` | `NodeTreeSnapshot.parentIndex` | G1 Región común, G3 Chunking, G5 (qué cajas forman una lista) |
| `paintOrder` | `LayoutTreeSnapshot.paintOrders` | Filtro de nodos tapados y orden de lectura de G5 |

### 3.2  Lo que el wireframe no puede dar
- G4 completo. Corre en screenshot, y por eso el pipeline tiene dos ramas.
- Similitud por color. Se puntúa por forma, tamaño y alineación.
- Gradiente de meta cuando la diferencia entre paso completado y pendiente depende solo del color. Se marca como evidencia insuficiente.
- Contenido pintado fuera del árbol de layout, dentro de un canvas o como parte de una imagen rasterizada. No tiene caja y no aparece; el corpus se revisó contra esta condición.

## 4.  Decisiones de implementación
Quedan fijadas acá para que las siete rúbricas se escriban contra las mismas reglas.
1.  Los evaluadores humanos puntúan la página renderizada, nunca el wireframe. El ground truth tiene que ser juicio experto sobre la interfaz y no sobre un artefacto intermedio nuestro. Esto deja los dos términos separados y limpios: la concordancia se mide comparando el sistema sobre screenshot contra los humanos, y la representación se mide comparando el sistema sobre wireframe contra el sistema sobre screenshot, sin trabajo humano adicional.
2.  Viewport fijo de 1440 × 900 px, y se captura solo lo visible sin scroll. Es lo que la propuesta llama "una sola pantalla capturada". Capturar la página completa haría incomparables una página larga y una corta, y dejaría n1 indefinido. Costo declarado: el contenido bajo el pliegue no se evalúa, y es una limitación de alcance.
3.  Cinco repeticiones por configuración. Suficiente para reportar dispersión sin volver impagable la medición. La grilla queda en 30 páginas × 6 grupos × 2 canales × 2 runtimes × 5, más 30 × 1 grupo × 2 runtimes × 5 para G4: 3.900 invocaciones.
4.  La salida de cada grupo lleva un campo que nombra la condición que disparó el nivel. Aplica a los siete y no solo a G3. Un puntaje sin la condición detrás no es auditable ni diagnosticable.
5.  not_applicable solo con una condición objetiva declarada por adelantado en cada rúbrica (por ejemplo, G2 sobre una pantalla sin ningún elemento accionable, o G5 sobre una sin ninguna secuencia). Un caso marcado N/A por ambas partes se excluye del grupo y se reporta cuántos se excluyeron. Si una parte marca N/A y la otra puntúa, cuenta como desacuerdo máximo, para que la exclusión no pueda inflar el acuerdo.
6.  El instrumento puntúa propiedades independientes de la tarea del usuario, y se declara. Por eso los criterios están redactados sin suponer una tarea: la acción dominante de Hick se determina por peso visual y tamaño relativo; Posición serial puntúa si hay jerarquía de orden marcada y no cuál ítem es más importante; Memoria de trabajo puntúa co-visibilidad de un dato con el campo que lo requiere. Declarar una tarea por página sería otro estudio.
7.  Las recomendaciones se emiten y no se miden en la v1. Las rúbricas las exigen cuando el puntaje es 2 o menor, y el sistema las produce, pero ningún objetivo verifica si son accionables. Salen como salida declarada no validada.
8.  El catálogo de convenciones de Jakob queda cerrado en ocho patrones y fechado, como se listan en G6. Sin catálogo cerrado el criterio es una opinión, y con él es reproducible aunque su base sea convención y no evidencia.
