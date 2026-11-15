# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: Los nodos guardados incluyen un posible diálogo visible (280). Confirmar en la imagen si tapa contenido.

Aviso de captura: Se ve un cuadro de ubicación sobre parte del banner. No cubre toda la página, pero sigue visible aunque el registro haya dado otro aviso por cerrado.

Aviso de captura: Queda una capa o un aviso sin resolver. No presentar la página como despejada.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1, C3, C4 generalizadas (C1 con p=1 > 0,50) |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=11 cae en el intervalo 9-12 del nivel 1, pero el nivel 1 exige agrupación débil y en el wireframe la agrupación es parcial: el encabezado está delimitado por bandas y los nueve trámites forman una cuadrícula con cajas visibles, mientras cerca de la mitad de los accionables (g2_fraccion_agrupada=0.528) quedan sueltos. El nivel 2 exige g2_n1 entre 6 y 8 y el nivel 3 g2_n1<=5; el nivel 0 no aplica porque g2_n1 no supera 12 y existe una acción primaria distinguible (la búsqueda) aunque no domina. Ninguna ancla cubre n1=11 con agrupación parcial. Además sanity_ok y consent_limpio son false y queda un diálogo de ubicación sin resolver sobre el banner. |
| G3 | wireframe | 1 | 0 | X |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 3 | J_inicio |
| G6 | wireframe | 1 | No se pudo puntuar | K=0 y T=0, pero R=1 (logo gov.co repetido con el mismo href en la franja superior 187 y en el encabezado 200) afecta 1 de 8 bloques visibles declarados (12,5 %), por encima del corte de casos aislados (<=10 %) y lejos de la mayoría: distribución intermedia. La redundancia intermedia sin K ni T no tiene ancla en G6; se conserva abstención sin mover umbrales. Además, el denominador de bloques es juicio del evaluador (no viene en las medidas) y un diálogo de ubicación sin resolver (280) queda sobre el banner. |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: K=0 y T=0, pero R=1 (logo gov.co repetido con el mismo href en la franja superior 187 y en el encabezado 200) afecta 1 de 8 bloques visibles declarados (12,5 %), por encima del corte de casos aislados (<=10 %) y lejos de la mayoría: distribución intermedia. La redundancia intermedia sin K ni T no tiene ancla en G6; se conserva abstención sin mover umbrales. Además, el denominador de bloques es juicio del evaluador (no viene en las medidas) y un diálogo de ubicación sin resolver (280) queda sobre el banner..

Convenciones evaluadas: 5 de 8. No aplicables confirmadas: 0. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 187, 188, 200, 201 | Logo gov.co arriba a la izquierda (x=153) con enlace del ancestro a https://www.gov.co/ y aria-label 'Te llevará al inicio'. La pantalla tiene navegación a otras secciones, no es un sitio de una sola página. |
| K2 | Cumple | 239, 249, 254 | Campo de búsqueda 239 con botones de voz y buscar, en la fila superior del encabezado (y=69), en posición central. El sitio ofrece búsqueda. |
| K3 | Cumple | 264, 267 | 'Inicia sesión' (264, href /login) y 'Regístrate' (267, href /registro) en el extremo derecho de la fila superior del encabezado; hay sesión de usuario. |
| K4 | Cumple | 297, 300, 305, 311, 317, 323, 329 | Navegación principal horizontal arriba (y=123-164): Inicio, Biblioteca, Caja de Herramientas, Entidades, Ventanilla Únicas, Conmigov. La pantalla no es un paso de flujo. |
| K5 | No se pudo determinar | 239, 208 | Hay un campo de entrada visible (búsqueda 239). En el screenshot no tiene etiqueta visible propia: el LABEL 208 a su izquierda se lee como selector de ámbito 'Trámites', y el snapshot no conserva la asociación etiqueta-control. No se puede confirmar cumplimiento ni incumplimiento. |
| K6 | Cumple | 264, 267 | El slot K6 llega vacío, pero en el screenshot 'Inicia sesión' (contorno) y 'Regístrate' (relleno, visualmente primaria) forman un par de botones vecinos con role=button; la acción con mayor énfasis está a la derecha. Juicio sobre elementos suministrados, no candidato nuevo. |
| K7 | No se pudo determinar |  | No hay pie en el viewport (slot K7 vacío). La ausencia en la captura no demuestra que el sitio carezca de pie; aplicabilidad indeterminada. |
| K8 | No se pudo determinar |  | Slot K8 vacío y no se ve ruta de navegación. La pantalla parece ser la portada (Inicio activo); no se deduce si la convención de ruta aplica a esta página ni la jerarquía del sitio fuera de pantalla. |

Redundancias identificadas: 1.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

