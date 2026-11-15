# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: capa sin cerrar sobre el 100% del viewport

Aviso de captura: El control de sanidad marcó esta captura.

Aviso de captura: Los nodos guardados incluyen un posible diálogo visible (3015). Confirmar en la imagen si tapa contenido.

Aviso de captura: Queda una capa o un aviso sin resolver. No presentar la página como despejada.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 1 | C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=6 cae en el intervalo del nivel 2, pero ese nivel exige una acción primaria que existe y no domina. El elemento de mayor peso visual es el enlace 3022 (área 245224, razón 2.72 frente al siguiente) dentro de una capa emergente sin cerrar (3015) que cubre el centro del viewport; la revisión de la captura la marca como capa sin resolver, con sanity_ok=false y consent_limpio=false. Si esa capa cuenta como parte de la interfaz, la acción primaria sería clara, y n1=6 con acción clara no tiene ancla (el nivel 3 exige n1<=5). Si no cuenta, la acción primaria de la página queda tapada y no se puede determinar. Ninguna de las dos lecturas tiene un ancla definida, y el inventario es ambiguo. |
| G3 | wireframe | 1 | 1 | segmentacion |
| G4 | screenshot | 1 | No se pudo puntuar | Captura limitada (sanity_ok=false, consent_limpio=false): un modal promocional sin cerrar (posible diálogo 3015) ocupa el centro del viewport y tapa el miembro central (263) del único conjunto vinculado al contenido principal, g4:DIV#259. No se puede certificar su equivalencia ni contar aislados. Las demás alternativas pertinentes son parciales o heterogéneas (g4:DIV#214, g4:DIV#411) y los conjuntos equivalentes restantes son navegación auxiliar del encabezado, que no sustituye al contenido principal. Sin conjunto principal sostenible no hay I_principal y ninguna ancla cubre los juicios. |
| G5 | wireframe | 1 | 1 | J_inicio |
| G6 | wireframe | 1 | No se pudo puntuar | Ninguna regla prioritaria (0, 1 o 2) queda demostrada: K=0 confirmado, T=0 y R=0 en lo observable. El nivel 3 exige K=0 entre las convenciones aplicables, pero K5 aplica (formulario de búsqueda 93/94) y su cumplimiento es indeterminado: el campo no muestra etiqueta externa, solo un marcador de posición y el botón con lupa, y el catálogo v1 no define si ese patrón cumple o rompe la convención. K7 y K8 tienen aplicabilidad indeterminada (pie y ruta fuera del viewport o no observables). Además, un diálogo promocional (3015) sobre una capa a pantalla completa (3013) tapa el centro de la pantalla, incluida la tarjeta 263, y la revisión de la captura marca capas sin resolver. Con esos juicios pendientes no se sostiene el nivel 3 y no se completa la escala. |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Ninguna regla prioritaria (0, 1 o 2) queda demostrada: K=0 confirmado, T=0 y R=0 en lo observable. El nivel 3 exige K=0 entre las convenciones aplicables, pero K5 aplica (formulario de búsqueda 93/94) y su cumplimiento es indeterminado: el campo no muestra etiqueta externa, solo un marcador de posición y el botón con lupa, y el catálogo v1 no define si ese patrón cumple o rompe la convención. K7 y K8 tienen aplicabilidad indeterminada (pie y ruta fuera del viewport o no observables). Además, un diálogo promocional (3015) sobre una capa a pantalla completa (3013) tapa el centro de la pantalla, incluida la tarjeta 263, y la revisión de la captura marca capas sin resolver. Con esos juicios pendientes no se sostiene el nivel 3 y no se completa la escala..

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 1. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 89, 90 | El logo (90, alt 'Logo exito.com') está arriba a la izquierda y su ancestro 89 enlaza a '/' con aria-label 'Volver al inicio'. El sitio tiene varias secciones enlazadas, así que no es un sitio de una sola página. |
| K2 | Cumple | 93, 94, 95 | Hay un formulario con role=search (93), campo 94 y botón de envío 95 en el encabezado; el campo ocupa la franja central superior del encabezado, no la esquina izquierda. El screenshot muestra 'Buscar en exito.com'. |
| K3 | Cumple | 116, 118, 122, 125 | Acceso a la cuenta (116, 'Mi cuenta', enlace de autenticación) y carrito (122, 'Carrito') están arriba a la derecha del encabezado. |
| K4 | Cumple | 172, 177, 178, 182, 186, 192, 193, 195, 198, 201, 204 | La navegación principal es horizontal arriba: botón 'Menú' (172), categorías Mercado, Tecnología y Hogar (178, 182, 186) y la lista NAV 192/193 con enlaces de ofertas, en la segunda fila del encabezado. |
| K5 | No se pudo determinar | 93, 94 | Hay un formulario visible (búsqueda) con un campo (94) y la lista de etiquetas está vacía. En el screenshot el campo no tiene etiqueta encima ni a la izquierda; solo un marcador de posición 'Buscar en exito.com' y el botón con lupa. El snapshot no conserva asociaciones for/id y el catálogo v1 no define si ese patrón de buscador cumple o rompe la convención; no se amplía el catálogo, así que el cumplimiento queda indeterminado. |
| K6 | No aplica | 116, 122 | El único par candidato es 'Mi cuenta' (116, enlace) y 'Carrito' (122): son accesos independientes del encabezado, no un par de acción primaria y secundaria. No se observa otro par de botones en la pantalla visible. |
| K7 | No se pudo determinar |  | No hay pie en el viewport (K7_pie vacío). La ausencia de pie en la captura no permite concluir que el sitio no tenga pie ni evaluar su contenido. |
| K8 | No se pudo determinar |  | No hay ruta de navegación candidata (K8_ruta vacía). La pantalla parece ser la de inicio, donde no se espera una ruta, y no se deduce la jerarquía del negocio; aplicabilidad indeterminada. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

