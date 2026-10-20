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

Al revisar los primeros puntajes también se precisó la auditoría derivada: H desconocido
no bloquea un nivel 1 ya fijado por competencia posicional, si las condiciones de nivel 0
están descartadas. Una comparación de área que el modelo declara indeterminada no se convierte
en una certeza solo porque las cajas permitan calcular un número. Los problemas de esas
cajas siguen siendo un límite. Una abstención prudente por inventario incompleto se distingue
de asignar un nivel incompatible con los propios juicios. Esta revisión lógica es posterior,
queda como versión de auditoría 1.0.2 y conserva el registro original sin cambios.

## Continuación con la misma versión

Al retomar por la tarde, la aplicación ya tenía CLI 0.163.0-alpha.10.2. No se enviaron
evaluaciones con esa versión. Se encontró CLI 0.162.0-alpha.17.2 en la extensión instalada
de VS Code y se conservó una copia local en
`/Users/juan/.codex/pilot-runtimes/codex-0.162.0-alpha.17.2`.
Se comprobaron los 43 archivos regulares de la copia contra su fuente. El ejecutable tiene
SHA-256 `9b47aa34d14c35d87fbe2702fc6c4163d965b30fd88b3defd19e80e780f40d8d`.

La continuación usa esa copia por PATH, sin editar el ejecutor ni sus archivos congelados.
El comando y la versión registrados en las trazas se mantienen. La consulta de uso se hace
aparte, con `account/rateLimits/read`; no envía una evaluación ni consume reinicios.
Esta nota registra la recuperación del entorno, no un cambio del instrumento.

## Ejemplos revisados después de la segunda repetición

- **G3/C18:** pasó de nivel 1 a abstención. En la primera respuesta el anuncio compite
  con las noticias; en la segunda no se identifica una acción principal única. También
  cambió el id elegido para el anuncio. La auditoría señala una diferencia en la comparación
  de áreas de la segunda respuesta; no decide por eso cuál lectura semántica es correcta.
- **G3/C22:** pasó de nivel 1 a abstención y de nueve a cuatro unidades. La segunda
  respuesta excluye la navegación temática y no confirma que el aviso de cookies compita
  con la acción principal. Conservar el nivel por sí solo habría ocultado esas diferencias.
- **G3/R03:** pasó de abstención a nivel 1. Ambas respuestas eligieron ocho unidades y
  advirtieron un candidato medido que no aparece en el screenshot. La primera dejó
  indeterminada la comparación de áreas; la segunda afirmó que el contenido ajeno no supera
  la tarea. El problema de captura no se reparó.
- **Inválidas de G3:** C04-r3 y R07-r2 reconocen tarjetas recortadas, pero no declaran
  evidencia insuficiente. Sus niveles originales quedan guardados sin contarlos como
  puntajes conformes. La misma comprobación se aplica a todas las posiciones.
- **G6/C23-r2 y R03-r2:** la incertidumbre sobre pie, jerarquía, etiquetas o acción primaria
  impide cerrar el juicio aunque las redundancias y operaciones observadas sean cero.
  No ver un pie o una ruta en el viewport no demuestra que no existan en el sitio.

Son ejemplos del resultado parcial, no una selección de respuestas correctas. Las otras
repeticiones siguen pendientes; no se adelanta una conclusión de estabilidad ni validación.
