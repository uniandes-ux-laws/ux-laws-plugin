# Ejemplos adicionales de G5

19 de octubre de 2026. La [galería](index.html) permite mostrar las cinco pantallas junto
a sus wireframes. Estos ejemplos se mantienen separados del corpus y de los casos dorados.

- **E01** reutiliza P06, que no se había evaluado. Conserva la fecha original de su captura.
  Tiene nombres de etapas, pero no señala la actual. La expectativa de nivel 1 se registró
  antes de enviar esta pantalla al modelo.
- **E02/E03** forman el par horizontal y **E04/E05** el vertical. En cada par solo cambia
  el tamaño del último elemento: pasa de ser igual al cuerpo a quedar destacado, con menos
  peso que el inicio. Las expectativas son 3 para los controles y 4 para los finales destacados.

Los cuatro HTML nuevos usan nombres de clases neutros. Además, las clases de los candidatos
no se entregan al evaluador. Se mantienen los ids, las cajas y las demás medidas.

El [registro](REGISTRO.json) y los [criterios previos](CRITERIOS-PREVIOS.md) quedaron
guardados antes de capturar los cuatro ejemplos nuevos. La comprobación de geometría y
los hashes de las capturas están en CONTROL-CAPTURAS.json y SELLO-CAPTURAS.tsv. Las capturas
son de 1440 × 900 y conservan la advertencia de pocos nodos propia de pantallas pequeñas.

La prueba de cinco repeticiones por pantalla queda en el
[informe de cobertura](../../pilotos/g5-cierre-2026-10-19/INFORME.md). Las expectativas son
propuestas de diseño nuestras, no una referencia experta. Esta preparación no cambia las
imágenes ni las respuestas de los pilotos anteriores.
