# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 1 | C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=4 cae en el intervalo del nivel 3 (n1<=5), pero el nivel 3 exige además grupos coherentes y una acción primaria clara. En el wireframe hay acciones con contorno (941, 1012 en la segunda banda y 2144 en el área central) que se distinguen de los enlaces de texto, pero ninguna domina: 941 y 1012 tienen el mismo tratamiento y tamaño, y 2144 no es mayor. El nivel 2 exige n1 entre 6 y 8 y el nivel 1 entre 9 y 12; el nivel 0 no aplica porque sí hay acciones distinguibles. Ninguna ancla cubre n1<=5 con acción primaria que no domina y agrupación parcial, por lo que me abstengo. |
| G3 | wireframe | 1 | 3 | ninguna |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | Con R=0 y T=0 confirmados y K=0 entre las violaciones confirmadas, el único nivel posible sería 3, que exige K=0 entre todas las convenciones aplicables. No puede sostenerse: K5 aplica (formulario de búsqueda 487) pero su cumplimiento es indeterminado porque el campo 496 no muestra etiqueta visible y el snapshot no conserva etiquetas ni asociaciones; K3, K7 y K8 tienen aplicabilidad desconocida (no se ve cuenta ni carrito, el pie y la ruta quedan fuera del viewport o no se puede afirmar que esta pantalla los requiera). K podría valer entre 0 y 4, de modo que ningún ancla queda determinada y no hay regla prioritaria demostrada (0, 1 o 2). |
| G7 | wireframe | 1 | 2 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Con R=0 y T=0 confirmados y K=0 entre las violaciones confirmadas, el único nivel posible sería 3, que exige K=0 entre todas las convenciones aplicables. No puede sostenerse: K5 aplica (formulario de búsqueda 487) pero su cumplimiento es indeterminado porque el campo 496 no muestra etiqueta visible y el snapshot no conserva etiquetas ni asociaciones; K3, K7 y K8 tienen aplicabilidad desconocida (no se ve cuenta ni carrito, el pie y la ruta quedan fuera del viewport o no se puede afirmar que esta pantalla los requiera). K podría valer entre 0 y 4, de modo que ningún ancla queda determinada y no hay regla prioritaria demostrada (0, 1 o 2)..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 1. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 258, 260 | Imagen 260 con alt 'Logo Cruz Roja Colombiana' arriba a la izquierda (x=57, y=10), dentro del enlace 258 con href a la raíz del dominio. Nada indica un sitio de una sola página. |
| K2 | Cumple | 487, 496, 502 | Formulario role=search 487 con campo type=search 496 y botón de envío 502 en la franja superior, a la derecha (x≈1026-1273, y≈12-52). |
| K3 | No se pudo determinar | 546 | En el screenshot no se ve carrito ni acceso a cuenta; arriba a la derecha solo está el selector de idioma 546. La ausencia visible no demuestra que el sitio carezca de sesión, así que la aplicabilidad queda indeterminada. |
| K4 | Cumple | 269, 288, 580, 599, 918, 937 | Dos barras de navegación horizontales arriba: NAV 269 (y≈0-41) y NAV 580/918 (franja y≈81-137), con elementos dispuestos en fila. |
| K5 | No se pudo determinar | 487, 496, 502 | Hay un formulario (búsqueda 487) con un campo 496. En el screenshot el campo no muestra etiqueta de texto visible encima ni a la izquierda; solo el botón con lupa 502 a la derecha. K5_etiquetas está vacío y el snapshot no conserva etiquetas, placeholder ni aria-label del campo, por lo que no se puede determinar si la convención de posición se cumple o se rompe. |
| K6 | No aplica | 941, 1012 | K6_pares_de_botones está vacío. Los únicos elementos con aspecto de botón contiguos, 'Voluntariado' 941 y 'Dona aquí' 1012, son disparadores de menú dentro de NAV 918 con el mismo estilo, no un par de acción primaria y secundaria. No se ve otro par de botones. |
| K7 | No se pudo determinar | 4073, 4087 | No se ve pie en el viewport; K7_pie solo propone BODY 238, que no es un pie. Hay un botón flotante de PQRS (4087, enlace a fpqrs-2) abajo a la derecha, que no es un pie. La ausencia del pie en la captura no permite concluir que el sitio no lo tenga. |
| K8 | No se pudo determinar |  | K8_ruta está vacío y no se ve ruta de navegación. Los menús con flechas de despliegue sugieren secciones, pero la pantalla parece de inicio (carrusel principal) y no se puede afirmar que requiera una ruta ni deducir la jerarquía del sitio. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

