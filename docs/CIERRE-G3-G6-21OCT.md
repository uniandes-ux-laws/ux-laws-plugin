# G3 y G6: cierre de los pilotos

21 de octubre de 2026. **Terminó la ejecución: 120 posiciones por grupo**, sobre las
24 capturas de calibración con cinco repeticiones. Se conservaron todas las respuestas,
incluidas las inválidas y las abstenciones. No se repitió ninguna para conseguir un puntaje.

| Grupo | Puntajes | Abstenciones | Inválidas | Fallos técnicos | Pendientes |
|---|---:|---:|---:|---:|---:|
| G3 | 20 | 70 | 30 | 0 | 0 |
| G6 | 0 | 120 | 0 | 0 | 0 |

No hubo «no aplica». Los informes completos están en [G3](../pilotos/g3-2026-10-20/INFORME.md)
y [G6](../pilotos/g6-2026-10-20/INFORME.md).

## Qué encontramos en G3

Los 20 puntajes fueron seis ceros y catorce unos. Solo **C17** tuvo cinco puntajes:
repitió nivel 0 y regla X, con advertencia de evidencia insuficiente en las cinco respuestas.
No se obtuvieron puntajes conformes de niveles 2, 3 o 4. Tampoco hay referencia experta
para decir si los niveles asignados son correctos.

Las **30 inválidas** tienen el mismo problema: no declararon el límite exigido por el
contrato ante una selección o unidades incompletas. Los JSON originales siguen guardados;
sus puntajes no se suman a los 20 conformes. C03, C15 y R07 quedaron inválidas cinco veces.
Las 87 marcas de evidencia insuficiente se cuentan solo en las 90 respuestas conformes.

Estos ejemplos ayudan a explicar los cambios:

| Caso | Qué pasó | Qué deja pendiente |
|---|---|---|
| C02 | Cinco abstenciones: U=7, bloques encabezados y X=0 no tienen regla en la escala actual. | Aclarar esa combinación antes de otra fase. |
| C06 | Cuatro abstenciones y un nivel 0; cambió qué se contó como tarea y como promoción ajena. | Revisar selección y cajas que difieren de la imagen. |
| C10 | Inválida / 1 / 1 / 1 / abstención. | Tres unos no bastan para declarar estable toda la serie. |
| C18 | 1 / abstención / inválida / 1 / inválida. | Revisar competencia del anuncio, área y declaración de límites. |
| C22 | 1 / abstención / 1 / 1 / abstención; U alternó entre nueve y cuatro. | Acordar qué opciones cuentan como unidades de la tarea. |
| C24 | Cinco abstenciones y tres regiones distintas entre las respuestas. | Revisar también la selección, además de la salida final. |
| R03 | Abstención / 1 / abstención / 1 / abstención. | Resolver la discrepancia entre candidatos medidos y contenido visible. |

Hay **cinco observaciones automáticas** en C06-r2, C18-r2, C23-r3, C18-r4 y C23-r4.
Se distinguen tres diferencias de área, una abstención prudente y una marca de trigger
dependiente del orden interno del auditor. En C18-r4, segmentación y competencia respaldan
el mismo nivel 1; la marca no demuestra por sí sola un trigger incorrecto. No se reporta
«cinco errores expertos». Las [notas posteriores](OBSERVACIONES-G3-G6-20OCT.md) explican
cada caso y mantienen la auditoría original junto a la geométrica 1.0.2.

## Qué encontramos en G6

Las 120 respuestas se abstuvieron y declararon evidencia insuficiente. **K7, sobre el pie,
tuvo aplicabilidad desconocida en las 120. K8, sobre la ruta de navegación, tampoco se
resolvió:** en 118 no se estableció aplicabilidad y en dos no se estableció cumplimiento.
Con las reglas congeladas, no se pudo cerrar el nivel global sin asumir información
fuera de la captura.

El modelo sí registró convenciones cumplidas e incumplidas. Por ejemplo, en R07 señaló
dos incumplimientos, pero conservó incertidumbre sobre otras convenciones que podían
cambiar el nivel. Esos registros son juicios del modelo, no calificaciones humanas.

La selección de convenciones aplicables varió en C13, C17, C23 y R07 aunque todas sus
salidas fueran abstenciones. En C18 también se advirtió un formulario dentro del anuncio
que no está desglosado en los nodos guardados. No se inventaron ids ni se corrigieron
las cantidades para completar esa evidencia. **No hay puntajes numéricos de G6 con los
que afirmar estabilidad ordinal o precisión.**

## Qué quedó comprobado

Se verificaron 240 conversaciones distintas, originales, registros, atribución y CSV.
Los sellos protegen **504 archivos de G3 y 534 de G6**, 1.038 en total. No se modificaron
los 4.111 archivos históricos de calibración, capturas, corpus, dorados y pilotos anteriores
frente a d0ac313. Sus ocho sellos, con 3.122 archivos protegidos, siguen válidos y no se regeneraron.

Se mantuvieron modelo gpt-6.1-sol, esfuerzo low, CLI 0.162.0-alpha.17.2, evidencia 1.1.0
sobre fuente 1.0.6 y contratos 0.1.0. La preparación es 39714db y el registro anterior a las
respuestas, 0dfbdd9. Se usó wireframe primero y screenshot como apoyo textual declarado;
esta fase no es una comparación limpia entre canales. La CLI se conservó aparte al
actualizarse la aplicación. El fallo anterior de consulta de uso permanece registrado;
no fue un fallo de evaluación. No se usaron reinicios ni se compraron créditos.

Para comprobar el cierre otra vez, sin solicitar respuestas ni crear sellos:

```bash
python3 scripts/verify-g3-g6-closure.py
```

La comprobación guarda [el detalle](../revisiones/g3-g6-2026-10-20/QA-CIERRE-21OCT.json),
incluidos los motivos de abstención, hashes de originales y recuentos por convención.
Es una revisión posterior de estas salidas; no agrega expectativas ni resultados expertos.

## Qué falta para cerrar los grupos

Revisar con Camilo las combinaciones sin regla de G3, la selección de unidades y el alcance
de la evidencia de G6. Cualquier cambio debe quedar escrito antes de otra fase, conservando
esta. Las reglas operativas actuales son propuestas; no se atribuyen a Camilo.

**Faltan validación experta y consenso de los casos dorados.** El panel humano depende de
aprobación ética. Los pilotos terminaron; los grupos todavía requieren esas revisiones.
Los avances se guardan en commits locales, sin publicar en GitHub.

El seguimiento `completar-pilotos-g3-y-g6` fue eliminado después de comprobar el cierre;
ya no quedan continuaciones programadas para estos pilotos.
