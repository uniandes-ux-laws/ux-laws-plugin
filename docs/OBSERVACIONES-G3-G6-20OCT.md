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

## Parada del control de uso

La continuación llegó a 61 posiciones por grupo. Después de un lote comprobado, la siguiente
consulta de uso no respondió en 25 segundos. Se detuvieron solicitudes nuevas y se conservó
el estado, sin repetir la consulta en bucle ni ninguna evaluación. La última lectura exitosa
era 69% a las 3:08 p. m. de Bogotá; no se afirma que se hubiera agotado el cupo.

Los 122 originales y sus trazas se verificaron, sin errores técnicos ni intentos abiertos
de evaluación. El fallo pertenece al control previo, no a una posición de la muestra. Se
guardó el [registro del incidente](../revisiones/g3-g6-2026-10-20/CONTROL-USO-20OCT.json).
La continuación quedó para las 7:17 p. m., después de la renovación indicada en la última
lectura exitosa. Antes de pedir respuestas debe comprobar que el control vuelve a responder.

## Reanudación de la noche y otras diferencias

Al retomar a las 7:17 p. m., el control volvió a responder y la primera lectura de la
ventana renovada fue 1%. También volvió a estar disponible la herramienta de uso de la
aplicación. Se continuó solo con posiciones pendientes, sin repetir la consulta fallida
como una evaluación ni volver a pedir respuestas anteriores.

En **G3/C06-r4** apareció nivel 0 después de tres abstenciones. El modelo eligió cinco
tarjetas como tarea y clasificó varias promociones como ajenas. Afirmó que su unión de
cajas superaba la de esas tarjetas, pero también advirtió cajas que no corresponden bien
con lo visible y un inventario incompleto. La conformidad de esa respuesta no demuestra
que esa selección semántica sea correcta; queda para la revisión con expertos.

En **G3/C23-r3** se conservó nivel 1, pero la auditoría detectó una contradicción de área:
la respuesta dice que el aviso ocupa menos que las unidades elegidas; con esos mismos ids,
la unión suministrada da 146.857,5 frente a 131.510,5625. No se cambió el nivel ni se agregó
una unidad para corregir la comparación. Es una observación sobre sus propios datos, no una
calificación experta de la página.

En **G3/C18-r4**, el auditor marca el trigger porque revisa la competencia de X antes
que la segmentación. La respuesta eligió `segmentacion`, con U=10 y segmentación débil;
ambas condiciones respaldan nivel 1 en las anclas. Esa marca depende del orden interno
del auditor y no basta para decir que el trigger elegido es incorrecto: el texto fija
prioridad entre niveles, pero no una elección única entre esas dos condiciones de nivel 1.
Se conserva la observación de la versión 1.0.2 con este límite, sin cambiar la respuesta
ni presentar una regla nueva como si se hubiera fijado antes de evaluar.

**G3/C23-r4** se abstuvo, pero volvió a declarar que el aviso no supera a las mismas tres
unidades. La auditoría conserva la diferencia aritmética ya vista en r3. Es un segundo
registro de esa observación, no una segunda página con calificación experta incorrecta.

Al cortar esta ventana al 90% quedaron 97 posiciones por grupo, sin fallos técnicos ni
intentos abiertos. Los 194 originales y sus trazas se conservan. Quedan 23 por grupo;
no se ha cerrado la ejecución ni la validación. La continuación está programada para
el 21 de octubre a las 00:19 de Bogotá, conservando los reinicios gratuitos.

## Cierre del 21 de octubre

Se conservaron las 120 posiciones de cada grupo: G3 tuvo 20 puntajes, 70 abstenciones y
30 inválidas; G6 tuvo 120 abstenciones. No hubo NA, fallos técnicos ni intentos abiertos.
La interrupción de la conversación durante la última continuación no dejó una evaluación
sin cerrar: el lote externo terminó, se comprobó su estado y se siguió solo con pendientes.

Los 30 incumplimientos de contrato de G3 corresponden a selección o unidades incompletas
sin declarar la insuficiencia exigida. Las cinco observaciones de auditoría se mantienen
con las distinciones anteriores. Se revisaron los motivos por página y los cambios entre
repeticiones. En G6, K7 quedó con aplicabilidad desconocida en 120 respuestas; K8 quedó
sin resolver también en las 120. No se convirtió esa falta de evidencia en cumplimiento,
incumplimiento ni no aplicabilidad.

El [cierre](CIERRE-G3-G6-21OCT.md) reúne los resultados y los pendientes. Se comprobaron
240 conversaciones y los CSV contra los originales; los sellos protegen 1.038 archivos
nuevos. Los ocho sellos anteriores y los 4.111 archivos históricos permanecen iguales.
Esta revisión es posterior, conserva los juicios y no reemplaza la validación experta.
