# G3 y G6: cierre de los pilotos

21 de octubre de 2026. Terminamos las **120 evaluaciones de cada grupo**: 24 páginas,
cinco repeticiones por página. Guardamos todas las respuestas, incluidas las inválidas
y las abstenciones. No volvimos a pedir ninguna para conseguir un puntaje diferente.

| Grupo | Puntajes | Abstenciones | Inválidas | Fallos técnicos | Pendientes |
|---|---:|---:|---:|---:|---:|
| G3 | 20 | 70 | 30 | 0 | 0 |
| G6 | 0 | 120 | 0 | 0 | 0 |

No hubo casos de «no aplica». Los resultados por página están en los informes de
[G3](../pilotos/g3-2026-10-20/INFORME.md) y [G6](../pilotos/g6-2026-10-20/INFORME.md).
**Los pilotos terminaron, pero la revisión con expertos sigue pendiente.**

## Qué pasó en G3

Los 20 puntajes fueron seis ceros y catorce unos. Solo **C17** tuvo cinco puntajes:
repitió 0 y la regla X. Las cinco respuestas advirtieron que la evidencia era insuficiente.
No obtuvimos puntajes válidos de niveles 2, 3 o 4.

Las **30 inválidas** no declararon la advertencia exigida al elegir elementos incompletos.
Guardamos sus respuestas originales, pero no contamos sus puntajes entre los 20 válidos.
C03, C15 y R07 tuvieron cinco inválidas cada una. Entre las 90 respuestas que sí cumplieron
las reglas de salida hubo 87 advertencias de evidencia insuficiente.

Estos casos sirven para mostrar qué varió:

| Caso | Qué encontramos |
|---|---|
| C02 | Cinco abstenciones: la combinación U=7, bloques con encabezado y X=0 no tiene nivel definido en la rúbrica actual. |
| C06 | Cuatro abstenciones y un 0. Cambió qué tarjetas se consideraron parte de la tarea y cuáles se trataron como promociones ajenas. |
| C10 | Inválida / 1 / 1 / 1 / abstención. Los tres unos no alcanzan para decir que toda la serie fue estable. |
| C18 | 1 / abstención / inválida / 1 / inválida. Cambiaron los juicios sobre el anuncio y sus límites. |
| C22 | 1 / abstención / 1 / 1 / abstención. El número de unidades de tarea cambió entre nueve y cuatro. |
| C24 | Cinco abstenciones y tres regiones distintas elegidas. También necesitamos revisar qué parte de la página se está evaluando. |
| R03 | Abstención / 1 / abstención / 1 / abstención. Se mantuvo una diferencia entre los candidatos medidos y lo que aparece en la imagen. |

El código de revisión dejó **cinco observaciones**: C06-r2, C18-r2, C23-r3, C18-r4 y C23-r4.
Son tres diferencias de área, una abstención prudente y una diferencia que depende del orden
en que el código revisa las reglas. En C18-r4, dos condiciones respaldan el mismo nivel 1;
la marca no demuestra que el trigger elegido esté mal. Las [notas posteriores](OBSERVACIONES-G3-G6-20OCT.md)
explican cada observación y conservan tanto la revisión original como la versión 1.0.2.
Estas marcas no son calificaciones de expertos.

## Qué pasó en G6

Las **120 respuestas se abstuvieron** y marcaron evidencia insuficiente. En ninguna se pudo
resolver K7, sobre el pie de página, ni K8, sobre la ruta de navegación. Con las reglas y
capturas actuales no se pudo asignar un nivel global sin asumir información que faltaba.

El modelo sí registró convenciones cumplidas e incumplidas. En R07, por ejemplo, señaló
dos incumplimientos, pero dejó otras convenciones sin resolver. En C13, C17, C23 y R07
cambió qué convenciones consideró aplicables entre repeticiones. La abstención final fue
igual, aunque los juicios intermedios variaron.

En C18 también se señaló un formulario dentro del anuncio que los nodos guardados no
describen por separado. Conservamos esa limitación. **No hay puntajes numéricos de G6
para afirmar precisión ni estabilidad en la escala.**

## Qué comprobamos

Revisamos las 240 conversaciones, sus originales y las tablas CSV. Los sellos protegen
504 archivos de G3 y 534 de G6, 1.038 en total. Los 4.111 archivos anteriores frente a
d0ac313 siguen iguales; también sus ocho sellos, que protegen 3.122 archivos.

Mantuvimos gpt-6.1-sol, esfuerzo low, CLI 0.162.0-alpha.17.2, evidencia 1.1.0 sobre fuente
1.0.6 y contratos 0.1.0. La preparación quedó en 39714db y el registro previo en 0dfbdd9.
Se usó primero el wireframe y también el screenshot para leer contenido. Por eso esta
prueba no permite comparar ambos canales de forma independiente. La recuperación de la
CLI y el fallo de consulta de uso están registrados en las notas posteriores; ese fallo
no fue una evaluación fallida. No se usaron reinicios ni se compraron créditos.

Para comprobar los archivos sin pedir nuevas respuestas:

```bash
python3 scripts/verify-g3-g6-closure.py
```

El comando guarda el [detalle de la comprobación](../revisiones/g3-g6-2026-10-20/QA-CIERRE-21OCT.json).
El seguimiento automático fue eliminado; no quedan evaluaciones programadas para estos pilotos.

## Qué sigue

Tenemos que revisar con Camilo las combinaciones sin regla de G3, la selección de unidades
y lo que podemos concluir con la evidencia de G6. Los criterios operativos son propuestas
del equipo; todavía no son acuerdos del asesor. Si cambiamos una regla, se registra otra
versión antes de evaluar y se conserva esta fase.

También faltan la validación experta y el consenso de los casos dorados. El panel humano
depende de aprobación ética. El [resumen de los siete grupos](AVANCES-GRUPOS-21OCT.md)
permite ver estos pendientes junto con los demás avances.
