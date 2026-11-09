# G3 y G6: revisión antes de evaluar

20 de octubre de 2026. Juan pidió revisar las mediciones y hacer los pilotos completos.
Esta revisión se hizo **antes de solicitar respuestas nuevas**. No fija puntajes esperados
para las páginas ni se presenta como una calificación experta.

## Qué encontramos

En G3, la propuesta anterior tenía cero o una unidad en siete de las 24 páginas. Esto no
demuestra por sí solo un error; la revisión del código y las pruebas mostraron problemas
concretos: MAIN se descartaba por ocupar casi toda la pantalla, había envoltorios
transparentes tratados como unidades y se cortaban las listas a cuarenta candidatos.
B contaba hijos directos, aunque fueran envoltorios sin contenido propio.

En G6 había 422 candidatos a «contenedor vacío». Entre ellos aparecían imágenes, texto,
campos y botones: no eran una lista fiable de contenedores. Además, el enlace del logo se
entregaba siempre como null; solo se buscaban ciertos controles en la posición esperada,
los SVG no entraban como imágenes y las listas se recortaban. Los pares de botones podían
mezclar controles de partes distintas de la pantalla.

## Qué corregimos

La entrada nueva **1.1.0 por grupo** se construye desde los nodos archivados. No reescribe
la medición original 1.0.6 ni las capturas. Se conservan las listas completas y las relaciones
de padres, incluso cuando un envoltorio no tiene tinta propia.

- G3 conserva las regiones grandes, atraviesa envoltorios transparentes y entrega unidades,
  bloques, hijos efectivos, encabezados y alternativas. El modelo debe justificar su
  selección: no se toma la primera región ni su conteo como una verdad semántica.
- G6 busca candidatos en todas las posiciones visibles, incluye SVG y el enlace retenido
  del ancestro. Excluye de «vacíos» controles, imágenes y contenedores con contenido retenido.
  Los pares de botones deben ser vecinos, compartir padre y no solaparse. La lista nueva
  tiene 50 candidatos vacíos; **todavía no son 50 redundancias confirmadas**.
- Las cajas se limitan a lo visible y las marcas de recorte se conservan como advertencias.
  Se retiran las clases CSS de la entrada al evaluador; G6 conserva los atributos de
  identidad permitidos por su rúbrica. No se registra el texto de los nodos.

El [recuento por página](../revisiones/g3-g6-2026-10-20/mediciones.json) conserva ambas
versiones. No se usó su distribución para mover cortes ni repartir niveles.

## Qué sigue siendo limitado

Los nodos pueden tener cajas incorrectas, ancestros ausentes, recorte u oclusión. No se
reconstruyen a mano. Un candidato geométrico no demuestra unidad semántica, función ni
redundancia. La ausencia de pie, ruta o datos en una captura no demuestra su ausencia en el sitio.
Se revisaron visualmente los wireframes archivados de C02 y C07, sin cambiarlos ni recapturarlos.

G3 conserva combinaciones sin nivel explícito. G6 conserva el catálogo cerrado y distingue
aplicabilidad desconocida de no aplicabilidad. «Casos aislados» usa hasta 10% de bloques;
«mayoría» en la condición compuesta de G6 usa más de 50%, como dice su rúbrica, sin importar
la combinación de tolerancia de otros grupos. Los casos intermedios no cubiertos se abstienen.
Estas aclaraciones son propuestas operativas del equipo, no acuerdos atribuidos a Camilo.

Los dos grupos necesitan screenshot para sus juicios textuales, además del wireframe.
El piloto declara esa ayuda; no se presentará como una comparación limpia entre canales.
Los wireframes son los archivados y sellados, incluidos los anteriores a la marca de imágenes
con X. No se mezclan con nuevas capturas para mejorar su apariencia.

## Cómo se comprobará

Las pruebas cubren envoltorios, regiones de pantalla completa, listas de más de cuarenta,
imágenes y controles que no son vacíos, enlaces de SVG, controles fuera de posición y pares
de botones. También comprueban ids, conteos y combinaciones sin ancla. Un error de ancla se
señala aparte, sin reescribir la respuesta. La preparación del orquestador conserva la
medición archivada y genera entradas nuevas para G3/G6; los otros grupos mantienen sus versiones.

El piloto será de 120 evaluaciones por grupo, cinco por página. La validación experta y el
consenso siguen pendientes; las pruebas técnicas no los sustituyen.
