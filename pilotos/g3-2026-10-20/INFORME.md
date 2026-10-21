# G3: Capacidad y segmentación

Registro del 20 de octubre de 2026. **Ejecución terminada: 120/120 posiciones; 0 pendientes.**

Se usan las 24 páginas de calibración, con cinco conversaciones nuevas por página. Se conservan las capturas archivadas y sus límites. Modelo gpt-6.1-sol, esfuerzo low, CLI 0.162.0-alpha.17.2 y evidencia de medición 1.1.0 sobre la fuente 1.0.6. La primera imagen es el wireframe; el screenshot se usa para los criterios que requieren leer. Esta no es una comparación limpia entre canales.

## Resultados

- Puntajes: **20**; no aplicables: **0**; abstenciones: **70**.
- Respuestas inválidas: **30**; fallos técnicos: **0**.
- Niveles 0, 1, 2, 3 y 4: **6, 14, 0, 0, 0**.
- Marcas de evidencia insuficiente en respuestas conformes: **87**, incluidas las abstenciones.
- Respuestas con observaciones al aplicar sus propias anclas: **5**.

Una abstención conserva incertidumbre o una combinación que la rúbrica no cubre. No es cero ni «no aplica». Una respuesta que cumple formato puede aplicar mal un ancla o interpretar mal la imagen: eso se registra sin arreglarla ni repetirla.

Las marcas de insuficiencia de la tabla se cuentan en respuestas conformes. Un cero en una fila con respuestas inválidas no demuestra que su evidencia fuera suficiente.

| Página | Cinco respuestas | Evidencia insuficiente | Observaciones de ancla |
|---|---|---:|---:|
| C02 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C03 | invalido / invalido / invalido / invalido / invalido | 0 | 0 |
| C04 | ABSTENCIÓN / ABSTENCIÓN / invalido / invalido / ABSTENCIÓN | 3 | 0 |
| C06 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / 0 / ABSTENCIÓN | 5 | 1 |
| C07 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C09 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C10 | invalido / 1 / 1 / 1 / ABSTENCIÓN | 4 | 0 |
| C11 | ABSTENCIÓN / invalido / invalido / ABSTENCIÓN / ABSTENCIÓN | 3 | 0 |
| C12 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C13 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C14 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C15 | invalido / invalido / invalido / invalido / invalido | 0 | 0 |
| C16 | invalido / invalido / 1 / invalido / 1 | 0 | 0 |
| C17 | 0 / 0 / 0 / 0 / 0 | 5 | 0 |
| C18 | 1 / ABSTENCIÓN / invalido / 1 / invalido | 3 | 2 |
| C20 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C21 | invalido / invalido / invalido / 1 / invalido | 1 | 0 |
| C22 | 1 / ABSTENCIÓN / 1 / 1 / ABSTENCIÓN | 5 | 0 |
| C23 | ABSTENCIÓN / ABSTENCIÓN / 1 / ABSTENCIÓN / invalido | 3 | 2 |
| C24 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| C25 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| R02 | ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN / ABSTENCIÓN | 5 | 0 |
| R03 | ABSTENCIÓN / 1 / ABSTENCIÓN / 1 / ABSTENCIÓN | 5 | 0 |
| R07 | invalido / invalido / invalido / invalido / invalido | 0 | 0 |

La página C17 tiene cinco puntajes numéricos; repitió el nivel y repitió la regla. Los casos mixtos y los no aplicables se conservan aparte; no se declaran estables por una sola respuesta numérica. Los niveles no se promedian. Modas, empates, rangos y cambios de región o aplicabilidad aparecen en [resumen.json](resumen.json).

## Lectura del cierre

C17 fue la única página con cinco puntajes: repitió nivel 0 y regla X, con advertencias de evidencia insuficiente. C10, C18, C22 y R03 combinan puntajes con abstenciones o respuestas inválidas. Las 30 inválidas no declararon el límite exigido por el contrato ante selección o unidades incompletas; sus puntajes originales no se suman a los conformes. Las cinco observaciones de auditoría incluyen una abstención prudente, diferencias de área y una marca dependiente del orden interno del auditor. No son cinco errores establecidos por expertos.

La [revisión del cierre del 21 de octubre](../../docs/CIERRE-G3-G6-21OCT.md) reúne los ejemplos, sus límites y lo que falta consultar con Camilo. Es una revisión posterior de las salidas del modelo, sin nuevas calificaciones humanas.


## Qué se revisó antes de evaluar

La [revisión de mediciones](../../docs/REVISION-MEDICIONES-G3-G6-20OCT.md) registra los problemas encontrados y las correcciones. La evidencia nueva conserva las listas completas, las cajas visibles y los datos originales; no certifica equivalencia, función, ausencia de oclusión ni una tarea del negocio. Se mantienen las combinaciones sin ancla.

Las [observaciones posteriores](../../docs/OBSERVACIONES-G3-G6-20OCT.md) separan los problemas detectados al ejecutar. En G3 la auditoría geométrica derivada clasifica X por intersección con la región; conserva aparte la auditoría original que usaba parentesco. Esa corrección no cambia prompts, datos, niveles ni trazas.

G3 exige justificar la región y las unidades. U, B, H y X se respaldan con ids; los envoltorios transparentes no se cuentan automáticamente. Los juicios semánticos usan screenshot y no equivalen a medir memoria o carga cognitiva humana.

## Archivos y pendientes

[Registro previo](REGISTRO-PREVIO.md), [rúbrica](RUBRICA.md), [CSV](evaluaciones.csv), [resumen](resumen.json), originales en respuestas/, copias con atribución en resultados/ y registros de cada conversación en trazas/. La [verificación](VERIFICACION.json) y el [sello de integridad](SELLO-SHA256.tsv) permiten comprobar los archivos. Los resultados anteriores no se sobrescriben.

La ejecución terminó. **La validación experta, el consenso y la revisión con Camilo siguen pendientes.** El panel humano depende de aprobación ética. No se presentan las salidas del modelo como referencia humana.
