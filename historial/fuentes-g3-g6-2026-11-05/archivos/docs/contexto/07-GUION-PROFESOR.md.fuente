# Guion para presentarle el avance al profesor

Semana 6 · Evaluación automatizada de UX con las Laws of UX
David Hernández · Mateo Rincón · Juan Francisco Rodríguez

> Lo que nos pidió: para las leyes de cada uno, un ejemplo de cómo se evaluaría cada una y
> qué se necesitaría en el wireframe. Y cómo convertir una página web a wireframe.
>
> Esto es un guion hablado, no un texto para leer en voz alta palabra por palabra. Está
> pensado para unos ocho a diez minutos, con el documento conjunto proyectado al lado.
> Las marcas `[…]` son indicaciones de qué mostrar.

---

## 1. Apertura — treinta segundos

> Profesor, traemos las dieciocho leyes especificadas. Pero antes de entrar en ellas, una
> decisión que tomamos al juntarlas y que le cambia la forma al entregable.
>
> Nos pidió que cada uno documentara sus leyes. Cuando fuimos a juntar los tres documentos
> nos dimos cuenta de que no se podía: **el sistema no tiene dieciocho skills, tiene siete.**
> Una por grupo de constructo. Y cinco de esos siete grupos tienen leyes de más de un autor
> — G1 tiene leyes de los tres.
>
> Los niveles de una rúbrica tienen que ser mutuamente excluyentes dentro del grupo, y eso
> solo se logra escribiéndolos uno contra el otro. Así que entregamos un documento
> ordenado por grupo, con cada ley marcada con quién la trabajó. Se ve quién hizo qué, y
> además queda utilizable para implementar.

**[Mostrar la tabla de la sección 1: los siete grupos, las dieciocho leyes, el autor de
cada una, el canal.]**

---

## 2. El mapa — un minuto

> Esta tabla es el resumen. Dos cosas se leen directo de ella.
>
> **G4 es el único grupo que corre sobre el screenshot**, y sus dos leyes son de David:
> Von Restorff y Atención selectiva. Eso no es un detalle de implementación. Lo que esas dos
> miden vive en el color, el peso y el relleno, que es exactamente lo que el wireframe
> abstrae. Sobre el wireframe no quedan peor medidas: quedan sin objeto. Ese grupo es la
> razón por la que el pipeline tiene dos ramas.
>
> Las otras dieciséis leyes corren sobre el wireframe, y además sobre el screenshot para
> poder medir si el puntaje cambia entre las dos representaciones, que es uno de los tres
> términos de nuestra pregunta de investigación.

---

## 3. Cómo se evalúa cada ley — cuatro minutos

> No voy a recorrer las dieciocho. Voy a mostrar el patrón con cuatro casos que cubren los
> cuatro tipos de problema que nos encontramos, y el documento tiene las dieciocho con el
> mismo formato: qué mide, un ejemplo de página que cumple contra una que no, y qué necesita
> del wireframe.

### Caso 1 · Una ley que el canal sirve perfecto — Proximidad, G1

> Lo que se mide no es si hay espacio, es una comparación: la separación entre elementos
> del mismo grupo tiene que ser menor que la separación entre grupos.
>
> El ejemplo: un footer con cuatro columnas de enlaces. Con 8 píxeles entre enlaces y 48
> entre columnas se leen cuatro grupos. Con 16 y 20, el ojo lee dieciséis enlaces sueltos.
> El contenido está agrupado; la geometría no lo comunica.
>
> Del wireframe necesita solo coordenadas exactas. Es pura geometría, no necesita texto ni
> color. Es la mejor servida por el canal.

### Caso 2 · Una ley que tuvimos que recortar — Ley de Hick, G2

> Acá está una de las cosas que queríamos mostrarle. **No medimos tiempo de reacción.** No
> sale de una imagen fija, y además Liu y sus coautores argumentan en 2020 que el principio
> de diseño no se sigue de la ley de Hick — que una función de latencia logarítmica favorece
> matemáticamente mostrar *más* opciones a la vez, no menos.
>
> Entonces la rúbrica puntúa arquitectura de decisión, que es lo que el diseñador sí
> manipula: cuántas alternativas compiten al mismo nivel, si están agrupadas, si una acción
> domina. Y la rúbrica lo declara: los umbrales son convención nuestra, adoptada por
> reproducibilidad, no valores derivados de Hick.
>
> El ejemplo: un portal de trámites con 38 enlaces al mismo nivel y sin acción dominante da
> nivel 0. Los mismos 38 repartidos en seis categorías con un botón que domina da nivel 3.
> Misma cantidad de contenido, distinta arquitectura.

### Caso 3 · Un grupo sin evidencia detrás — G6, y es a propósito

> G6 junta Occam, Tesler y Jakob, y **ninguna de las tres tiene fuente empírica.** Occam es
> un principio de selección de teorías del siglo XIV. Tesler se escribió por primera vez en
> una entrevista. Jakob tiene origen localizable en un artículo de Nielsen del 2000, que
> abrimos y leímos: enuncia el principio como consejo profesional con ejemplos, sin estudio.
>
> No están juntas por descuido. Están juntas porque aislarlas nos deja comparar el acuerdo
> que alcanzamos sobre principios sin respaldo experimental contra el que alcanzamos sobre
> los que sí lo tienen. Cualquier acuerdo que saque G6 es una afirmación sobre nuestra
> rúbrica, no sobre una ley, y así está escrito en la rúbrica misma.
>
> Para que Jakob fuera reproducible cerramos un **catálogo de ocho convenciones**, fechado:
> logo arriba a la izquierda, buscador arriba, carrito arriba a la derecha, y así. Sin
> catálogo cerrado, "rompe la convención" es una opinión.

### Caso 4 · Una ley donde solo la mitad es observable — Fitts, G7

> Fitts necesita dos cosas: la amplitud, que es la distancia desde donde arranca el cursor,
> y el ancho del objetivo. En una captura estática no hay posición inicial del cursor.
> **De los dos términos solo el ancho es observable**, y la rúbrica lo declara.
>
> Y hay algo que preferimos decir nosotros antes de que nos lo pregunten: el tamaño de
> objetivo es un criterio de WCAG, o sea que es lo que los linters ya revisan. Lo que salva
> a esta rúbrica de ser redundante es la separación entre objetivos adyacentes y la
> excepción por holgura. El umbral de 24 píxeles no es invento nuestro: es el criterio 2.5.8
> de WCAG 2.2, nivel AA. Los de 32 y 8 sí son convención nuestra, y está dicho.

---

## 4. Cómo convertimos la página en wireframe — dos minutos

> Lo generamos **desde el árbol de layout del navegador, no segmentando la imagen.**
>
> La razón no es de conveniencia. Un segmentador mete un segundo modelo cuyos errores caen
> en el mismo pipeline que los del evaluador, y entonces una diferencia entre canales podría
> originarse en el segmentador en vez de en el evaluador. Descartar eso es justo lo que la
> comparación entre canales tiene que poder hacer. Tomando las cajas del layout, la
> geometría de las dos representaciones sale de una sola pasada.
>
> El procedimiento son cuatro pasos: capturamos con Chrome DevTools Protocol usando
> `DOMSnapshot.captureSnapshot`; retenemos solo los nodos que pintan, tienen área y no están
> tapados por un hermano que pinta encima; dibujamos los que sobreviven como rectángulos con
> contorno y los de texto como barras rellenas; y verificamos que la geometría se reproduce
> antes de usarlo para evaluar.

**[Si quiere ver números:]**

> Eso ya está implementado y verificado. Sobre tres fixtures con geometría conocida
> — cajas absolutas, una grilla CSS y una fila flex — la desviación máxima es **cero coma
> cero cero cero píxeles**, con la tolerancia fijada en uno antes de medir y no después.

### El hallazgo que salió de escribir las dieciocho juntas

> Y acá está lo que sacamos de haber juntado los tres documentos, que no habría salido de
> ninguno por separado.
>
> **Catorce de las dieciséis leyes que corren en wireframe necesitan algo que un rectángulo
> con contorno no comunica.** La rúbrica de Hick arranca diciendo "enumere todo elemento
> accionable", y sobre rectángulos sin etiqueta un enlace y un párrafo son la misma caja.
> Fitts no sabe cuál caja es un objetivo. Jakob no distingue el logo de cualquier imagen.
>
> Fuimos a la especificación del protocolo y resulta que **el dato ya viene en la misma
> llamada y lo estábamos botando al dibujar.** `captureSnapshot` devuelve dos estructuras,
> no una: la del layout con las cajas, y la de los nodos con `nodeName`, `attributes` e
> `isClickable`, que la especificación define literalmente como si el nodo responde a clics.
>
> Entonces el wireframe pasó a ser dos archivos: la imagen igual a como estaba, más un JSON
> paralelo con un registro por nodo y el mismo identificador. La imagen no cambia — que
> importa, porque cambiar el dibujo contaminaría la comparación entre canales — y las
> catorce leyes quedan con base sobre la cual puntuar.

---

## 5. Cierre — treinta segundos

> Con eso, las siete rúbricas quedaron escritas, con sus cinco niveles anclados cada una, y
> viven como el archivo de su skill en el repositorio: la rúbrica **es** el instrumento, así
> que no hay una copia editable aparte que pueda derivar de lo que el sistema ejecuta. El
> apéndice del documento de tesis se genera desde esos mismos archivos con un comando.
>
> La capa de captura corre. Lo que sigue es implementar las siete skills contra el esquema
> de salida, que ya está definido y validado, y correr un piloto de calibración antes de
> congelar el protocolo.

---

## Preguntas que probablemente le hagan, con la respuesta corta

**¿Por qué siete grupos y no dieciocho leyes por separado?**
Porque cuatro de las dieciocho son principios Gestalt de agrupación y otras cuatro miden
capacidad o segmentación. Puntuar cada una y sumarlas contaría el mismo constructo varias
veces e inflaría el agregado. Es un defecto de validez, no un asunto de presentación.

**¿Entonces pierden la resolución por ley?**
El puntaje sí es por grupo. Lo que se conserva por ley es la nota de procedencia: qué
encontró el estudio original, bajo qué condiciones, y qué añade nuestra operacionalización.
Esa es la que necesitamos para la pregunta sobre si la operacionalizabilidad depende de que
haya evidencia detrás.

**¿Qué representación ven los evaluadores humanos?**
La página renderizada, nunca el wireframe. El ground truth tiene que ser juicio experto
sobre la interfaz y no sobre un artefacto intermedio nuestro. Y sale gratis un beneficio:
la concordancia se mide contra el sistema sobre screenshot, y la representación se mide
sistema-contra-sistema, sin trabajo humano adicional.

**¿Capturan la página completa o solo lo visible?**
Solo lo visible, a viewport fijo 1440 × 900. Capturar la página completa haría incomparables
una página larga y una corta, y dejaría indefinido el conteo de opciones simultáneas. Costo
declarado: lo que está bajo el pliegue no se evalúa.

**¿Cuántas repeticiones?**
Cinco por configuración. La grilla completa queda en 3.900 invocaciones. Los modelos son
estocásticos incluso a temperatura baja, así que una sola corrida reporta una muestra de una
distribución cuya dispersión no conoceríamos.

**¿Qué pasa si una ley no aplica a una pantalla?**
Cada rúbrica declara por adelantado una condición objetiva de no aplicabilidad —por ejemplo,
G2 sobre una pantalla sin ningún elemento accionable— y se marca. Nunca por juicio. Y si el
sistema marca no-aplicable y el humano puntúa, eso cuenta como desacuerdo máximo, para que
excluir casos no pueda inflar el acuerdo.

**¿Y las recomendaciones que emite el sistema?**
Se emiten y no se miden en la versión 1. Las rúbricas las exigen cuando el puntaje es 2 o
menor, pero ningún objetivo verifica si son accionables. Salen declaradas como salida no
validada, en vez de dejarlas pasar como si estuvieran evaluadas.

**¿Por qué las rúbricas están en el repositorio y no en un documento?**
Porque la rúbrica es el instrumento y el instrumento es lo que corre. Si viviera en un
archivo aparte, las dos versiones derivarían y el protocolo congelado dejaría de describir
lo que el sistema hace. El apéndice del documento se genera desde el repositorio.
