# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1, C3, C4 |
| G2 | wireframe | 1 | 2 | n1 |
| G3 | wireframe | 1 | 1 | segmentacion |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | Con la evidencia suministrada K=0 confirmado, T=0 y R=0, pero el nivel 3 exige K=0 entre todas las convenciones aplicables y quedan sin resolver K3 (aplicabilidad desconocida: no se ve cuenta ni carrito, y su ausencia en el viewport no prueba que no haya sesión), K5 (único campo es el buscador con marcador de posición e icono, sin etiqueta visible ni asociación conservada; el catálogo no fija si eso incumple), K7 (no hay pie visible; el candidato 562 es la navegación principal, no un pie) y K8 (no hay ruta visible bajo el encabezado, pero la pantalla parece la portada, donde la ruta no se espera; no se puede confirmar). Si alguna de ellas resultara rota el nivel sería 2 o menor, así que ninguna ancla queda sostenida sin completar juicios. No se demuestra ninguna regla prioritaria (K>=1, T>=1). |
| G7 | wireframe | 1 | 1 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Con la evidencia suministrada K=0 confirmado, T=0 y R=0, pero el nivel 3 exige K=0 entre todas las convenciones aplicables y quedan sin resolver K3 (aplicabilidad desconocida: no se ve cuenta ni carrito, y su ausencia en el viewport no prueba que no haya sesión), K5 (único campo es el buscador con marcador de posición e icono, sin etiqueta visible ni asociación conservada; el catálogo no fija si eso incumple), K7 (no hay pie visible; el candidato 562 es la navegación principal, no un pie) y K8 (no hay ruta visible bajo el encabezado, pero la pantalla parece la portada, donde la ruta no se espera; no se puede confirmar). Si alguna de ellas resultara rota el nivel sería 2 o menor, así que ninguna ancla queda sostenida sin completar juicios. No se demuestra ninguna regla prioritaria (K>=1, T>=1)..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 1. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 468, 464 | La pantalla pertenece a un sitio con varias secciones (navegación 562), no a un sitio de una sola página. El logo de Supersalud (468) está en el extremo izquierdo del encabezado del sitio y su enlace ancestro 464 apunta a '/'. El logo de gov.co (443) en la barra superior enlaza al portal gov.co, no al inicio del sitio, y no cambia el juicio. |
| K2 | Cumple | 495, 496 | El sitio ofrece búsqueda: campo 495 (type=search, 'Buscar en el sitio') con botón 496, arriba a la derecha del encabezado (x=982, y=91). |
| K3 | No se pudo determinar |  | No se observa carrito ni acceso a cuenta en el encabezado visible del screenshot. La lista K3_cuenta_carrito solo contiene accionables genéricos sin identidad de cuenta. La ausencia en la captura no demuestra que el sitio carezca de sesión de usuario, así que la aplicabilidad queda indeterminada. |
| K4 | Cumple | 562, 587, 592, 597, 653, 669, 793, 824 | La navegación principal (562, role=navigation) es horizontal y está arriba, justo bajo el encabezado (y=159), con siete entradas visibles. La pantalla no es un paso de un flujo. |
| K5 | No se pudo determinar | 495 | Hay un campo de entrada visible (495, buscador). K5_etiquetas está vacía y el snapshot no conserva asociaciones for/id. En el screenshot el campo no tiene etiqueta encima ni a la izquierda; lo identifican el marcador 'Buscar en el sitio' y el icono de lupa. El catálogo no define si un buscador así incumple la convención o tiene razón funcional visible; no se deduce incumplimiento de una lista vacía. |
| K6 | No aplica |  | K6_pares_de_botones está vacía y en el screenshot no se ve ningún par de botones de acción primaria y secundaria. Las flechas del carrusel y 'Pausar' son controles de navegación del carrusel, no un par de acciones. |
| K7 | No se pudo determinar | 562 | No hay pie visible en el viewport. El único candidato, 562, es la navegación principal en y=159, no un pie; la cifra del inventario parece errónea y no se corrige. La ausencia de pie en la captura no permite concluir que el sitio no lo tenga. |
| K8 | No se pudo determinar | 562 | La navegación visible muestra secciones (Transparencia, Normatividad, Vigilados), así que el sitio tiene jerarquía. K8_ruta está vacía y en el screenshot no hay ruta bajo el encabezado. El contenido (banner principal, noticias, eventos, enlaces útiles) sugiere que es la portada, donde la ruta no se espera, pero no se puede confirmar; no se deduce incumplimiento. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

