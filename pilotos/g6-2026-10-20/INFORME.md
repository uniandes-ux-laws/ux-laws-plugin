# G6: Economía y convención

Registro del 20 de octubre de 2026. **Ejecución terminada: 120/120 posiciones; 0 pendientes.**

Se usan las 24 páginas de calibración, con cinco conversaciones nuevas por página. Se conservan las capturas archivadas y sus límites. Modelo gpt-6.1-sol, esfuerzo low, CLI 0.162.0-alpha.17.2 y evidencia de medición 1.1.0 sobre la fuente 1.0.6. La primera imagen es el wireframe; el screenshot se usa para los criterios que requieren leer. Esta no es una comparación limpia entre canales.

## Resultados

- Puntajes: **0**; no aplicables: **0**; abstenciones: **120**.
- Respuestas inválidas: **0**; fallos técnicos: **0**.
- Niveles 0, 1, 2, 3 y 4: **0, 0, 0, 0, 0**.
- Marcas de evidencia insuficiente en respuestas conformes: **120**, incluidas las abstenciones.
- Respuestas con observaciones al aplicar sus propias anclas: **0**.

Una abstención conserva incertidumbre o una combinación que la rúbrica no cubre. No es cero ni «no aplica». Una respuesta que cumple formato puede aplicar mal un ancla o interpretar mal la imagen: eso se registra sin arreglarla ni repetirla.

Las marcas de insuficiencia de la tabla se cuentan en respuestas conformes. Un cero en una fila con respuestas inválidas no demuestra que su evidencia fuera suficiente.

| Página | Cinco respuestas | Evidencia insuficiente | Observaciones de ancla |
|---|---|---:|---:|
| C02 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C03 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C04 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C06 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C07 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C09 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C10 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C11 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C12 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C13 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C14 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C15 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C16 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C17 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C18 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C20 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C21 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C22 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C23 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C24 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C25 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| R02 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| R03 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| R07 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |

Ninguna página tiene cinco puntajes numéricos. Los casos mixtos y los no aplicables se conservan aparte; no se declaran estables por una sola respuesta numérica. Los niveles no se promedian. Modas, empates, rangos y cambios de región o aplicabilidad aparecen en [resumen.json](resumen.json).

## Lectura del cierre

Las 120 respuestas se abstuvieron. K7, sobre el pie de página, quedó con aplicabilidad desconocida en las 120; K8 tampoco se pudo resolver en ninguna. Hay convenciones cumplidas e incumplidas registradas, pero no se pudo cerrar el nivel global con la prioridad de las anclas. La misma salida final no significa igualdad de juicios: la selección de convenciones aplicables cambió en C13, C17, C23 y R07. No hay puntajes numéricos con los que afirmar estabilidad ordinal o precisión.

La [revisión del cierre del 21 de octubre](../../docs/CIERRE-G3-G6-21OCT.md) reúne los ejemplos, sus límites y lo que falta consultar con Camilo. Es una revisión posterior de las salidas del modelo, sin nuevas calificaciones humanas.


## Qué se revisó antes de evaluar

La [revisión de mediciones](../../docs/REVISION-MEDICIONES-G3-G6-20OCT.md) registra los problemas encontrados y las correcciones. La evidencia nueva conserva las listas completas, las cajas visibles y los datos originales; no certifica equivalencia, función, ausencia de oclusión ni una tarea del negocio. Se mantienen las combinaciones sin ancla.

Las [observaciones posteriores](../../docs/OBSERVACIONES-G3-G6-20OCT.md) separan los problemas detectados al ejecutar. En G3 la auditoría geométrica derivada clasifica X por intersección con la región; conserva aparte la auditoría original que usaba parentesco. Esa corrección no cambia prompts, datos, niveles ni trazas.

G6 mantiene el catálogo cerrado v1 del 10 de septiembre. Una lista vacía no demuestra una convención rota; aplicabilidad desconocida no es no aplicabilidad. Sus principios son heurísticas de práctica, no leyes experimentales. Los candidatos vacíos y los separadores no son redundancias confirmadas.

## Archivos y pendientes

[Registro previo](REGISTRO-PREVIO.md), [rúbrica](RUBRICA.md), [CSV](evaluaciones.csv), [resumen](resumen.json), originales en respuestas/, copias con atribución en resultados/ y registros de cada conversación en trazas/. La [verificación](VERIFICACION.json) y el [sello de integridad](SELLO-SHA256.tsv) permiten comprobar los archivos. Los resultados anteriores no se sobrescriben.

La ejecución terminó. **La validación experta, el consenso y la revisión con Camilo siguen pendientes.** El panel humano depende de aprobación ética. No se presentan las salidas del modelo como referencia humana.
