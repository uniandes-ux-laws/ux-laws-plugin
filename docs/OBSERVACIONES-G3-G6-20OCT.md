# G3 y G6: observaciones después de iniciar

20 de octubre de 2026. Estas notas son posteriores al inicio y no se presentan como
criterios previos. No cambian instrucciones, instrumento, respuestas ni calificaciones.

En G3/C03-r1 el modelo usó un bloque parcial, pero dejó `evidence_insufficient=false`.
La comprobación lo conservó como respuesta inválida; no se corrigió ni se volvió a pedir.

La revisión de esa respuesta también mostró un error en nuestra auditoría de área de G3:
para decidir si X estaba dentro de la región se usaba parentesco DOM. Un aviso superpuesto
puede estar dentro de las coordenadas sin ser descendiente del bloque. La instrucción ya
pedía comparar posición y unión de cajas; el error estaba en la comprobación derivada.

Se añadió una auditoría geométrica posterior, por intersección con la región y unión de
cajas sin duplicar solapamientos. Se conserva la auditoría original en cada traza y también
en el resumen. La verificación comprueba ambas: no se reescribe ninguna traza ni juicio.
Esta revisión no decide si X pertenece semánticamente a la tarea; usa los ids que el modelo
ya seleccionó. Tampoco sustituye revisión experta ni convierte una respuesta inválida en válida.
