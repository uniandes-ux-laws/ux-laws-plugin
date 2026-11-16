# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | No aplica | g1_grupos_primer_nivel = 1 (grupo 104): la captura tiene menos de dos grupos de primer nivel, condición objetiva de no aplicabilidad de G1. Se conserva la limitación «no interpretable v1» sin cambiar cortes. |
| G2 | wireframe | 1 | 2 | n1 |
| G3 | wireframe | 1 | No se pudo puntuar | Con la selección declarada U=17 (>12) y la segmentación es débil, no ausente: hay tres bloques (fila de categorías 272, banner 353, sección de enlaces 430), pero dos no tienen encabezado propio. El nivel 0 por U exige U>12 sin segmentación en bloques; el nivel 1 por U cubre solo U entre 9 y 12; no hay H>=1, V verdadero ni X interior que active 0 o 1; 2 y 3 exigen U<=8. Ninguna ancla cubre la combinación U>12 con segmentación débil. Además la única región suministrada (83) incluye el encabezado global y es parcial, y el juicio de si el banner 367 es ajeno a la tarea de una portada no queda fijado por la pantalla. |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 1 | J_inicio |
| G6 | wireframe | 1 | No se pudo puntuar | K=0 entre las cinco convenciones con aplicabilidad confirmada (K1-K5), T=0 y R=0 apuntarían al nivel 3, pero K5 tiene cumplimiento indeterminado y K7 y K8 aplicabilidad indeterminada. Si esas tres resultaran aplicables y rotas, K podría llegar a 3 (nivel 0); con dos, a 2 (nivel 1). Ninguna regla prioritaria queda demostrada y el nivel 3 exige K=0 confirmado, así que no se sostiene un nivel global. |
| G7 | wireframe | 1 | 1 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: K=0 entre las cinco convenciones con aplicabilidad confirmada (K1-K5), T=0 y R=0 apuntarían al nivel 3, pero K5 tiene cumplimiento indeterminado y K7 y K8 aplicabilidad indeterminada. Si esas tres resultaran aplicables y rotas, K podría llegar a 3 (nivel 0); con dos, a 2 (nivel 1). Ninguna regla prioritaria queda demostrada y el nivel 3 exige K=0 confirmado, así que no se sostiene un nivel global..

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 1. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 178, 175 | El logo (IMG 178, alt 'Sodimac Logo') está arriba a la izquierda (x=84, y=38.5) dentro del enlace 175 con title 'Home' y href '/homecenter-co/'. El sitio tiene varias secciones (enlaces de categoría), no es de una sola página. |
| K2 | Cumple | 193, 192 | El screenshot muestra un buscador ('¿Qué estás buscando?') en el encabezado: INPUT 193 dentro del contenedor 192 (x=486.7 a 766.3, y=52.5). Ocupa la franja central del encabezado, tras el logo y el botón Categorías; se lee como arriba y centrado. |
| K3 | Cumple | 212, 216, 231, 232 | Hay carrito (enlace 212 con href '/cart/', contador '0') y acceso a la cuenta ('Mi Cuenta', 231/232) en la mitad derecha del encabezado principal (x=983 a 1299, y=57). |
| K4 | Cumple | 182, 108, 144 | La navegación principal es el botón 'Categorías' (182, con ícono de hamburguesa) en la franja horizontal superior, acompañado de la barra de enlaces de servicio (NAV 108) arriba. La pantalla no es un paso de flujo. |
| K5 | No se pudo determinar | 193 | Hay un campo de entrada (INPUT 193, buscador). El screenshot no muestra etiqueta visible encima ni a la izquierda; solo un marcador de posición dentro del campo y los íconos de cámara y lupa. K5_etiquetas está vacía y el snapshot no conserva asociaciones for/id. No se deduce incumplimiento por una lista vacía; no hay etiqueta separada cuya posición se pueda juzgar. |
| K6 | No aplica |  | K6_pares_de_botones está vacía. El screenshot no muestra un par de botones de acción primaria y secundaria; los íconos de cámara y lupa dentro del buscador no forman un par confirmar/cancelar. |
| K7 | No se pudo determinar |  | El pie no está dentro del viewport (K7_pie vacía). Su ausencia en la captura no demuestra que el sitio no tenga pie. Los enlaces de contacto telefónico (111, 131) están en la barra superior, pero eso no resuelve si el pie existe ni qué contiene. |
| K8 | No se pudo determinar |  | No hay ruta de navegación visible (K8_ruta vacía). Los enlaces de categoría sugieren jerarquía de secciones, pero la pantalla parece la página raíz, donde una ruta no tendría niveles que mostrar. Con la evidencia disponible no se puede determinar si la convención aplica a esta pantalla. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

