# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=9 cae en el intervalo del nivel 1 (9 a 12), pero ese nivel exige además agrupación débil y la agrupación observada en el wireframe es parcial: el encabezado (ids 214-262), la barra superior (206, 209) y la fila de once tarjetas (446-557) forman grupos con frontera visible, mientras cerca de un tercio de los accionables (g2_fraccion_agrupada=0.658) queda fuera de un contenedor que agrupa. El nivel 2 exige g2_n1 entre 6 y 8, el nivel 3 g2_n1<=5, y el nivel 0 exige g2_n1>12 o ausencia de acción primaria distinguible. Ninguna ancla cubre g2_n1=9 con agrupación parcial y acción primaria que no domina; no se redondea g2_n1 ni se inventa una regla de combinación. |
| G3 | wireframe | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación observada y faltan juicios necesarios. Con las unidades visibles de contenido (U=6) la segmentación es débil (sin encabezados de bloque), H=0, V=false y hay dos avisos ajenos interiores (6399 aviso de cookies fijo, 285 aviso de ubicación). El nivel 2 exige segmentación encabezada y X=0 o ajenos solo fuera; el nivel 3 exige encabezados; el nivel 1 solo se alcanzaría con X compitiendo con la acción de la tarea, y en esta portada no hay una acción principal identificable sin inferir una tarea externa, por lo que X_compite queda sin resolver. Además, las diez unidades de 'Compra por categoría' (467-557) quedan tapadas por el aviso de cookies fijo y el inventario no es completo. |
| G4 | screenshot | 1 | No se pudo puntuar | No se puede sostener un conjunto principal con evidencia completa. El único conjunto de contenido vinculado a la tarea visible es LI#463 (tarjetas de 'Compra por categoría'), pero es parcial: solo asoma su borde superior en y=844 y queda tapado por la barra de cookies, de modo que no se puede juzgar I sobre sus miembros. Los demás conjuntos equivalentes son navegación auxiliar (pestañas Falabella/Homecenter, enlaces utilitarios, pestañas Ofertas/0% interés, enlaces del aviso de cookies) o puntos de carrusel, que la rúbrica no permite sustituir por el contenido principal. Además sanity_ok y consent_limpio son null, la revisión de captura está sin verificar y el screenshot muestra un aviso de cookies y un popover de ubicación sin cerrar. |
| G5 | wireframe | 1 | 2 | J_inicio |
| G6 | wireframe | 1 | No se pudo puntuar | Con la evidencia confirmada K=0 (K1-K4 aplican y cumplen), T=0 y R=0, pero K5 (cumplimiento), K7 y K8 (aplicabilidad) quedan indeterminadas. El nivel 3 exige K=0 entre todas las convenciones aplicables; si las indeterminadas resultaran aplicables y rotas, K podría llegar a 3 (nivel 0). Ninguna regla prioritaria (0, 1 o 2) está demostrada, de modo que no se puede sostener un nivel sin completar juicios que la evidencia no da. |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Con la evidencia confirmada K=0 (K1-K4 aplican y cumplen), T=0 y R=0, pero K5 (cumplimiento), K7 y K8 (aplicabilidad) quedan indeterminadas. El nivel 3 exige K=0 entre todas las convenciones aplicables; si las indeterminadas resultaran aplicables y rotas, K podría llegar a 3 (nivel 0). Ninguna regla prioritaria (0, 1 o 2) está demostrada, de modo que no se puede sostener un nivel sin completar juicios que la evidencia no da..

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 1. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 214, 215 | El enlace 214 (x=32, y=37) está arriba a la izquierda con href https://www.falabella.com.co/falabella-co (inicio); el screenshot muestra ahí el logo falabella.com. El sitio no es de una sola página, así que la excepción no aplica. |
| K2 | Cumple | 226, 231, 232 | Campo de búsqueda 231 con botón 232 dentro de 226 (x=439 a 1037, y≈49) en el encabezado, en posición central; el screenshot muestra 'Buscar en falabella.com'. |
| K3 | Cumple | 241, 251, 262 | Acceso a cuenta ('Hola, Inicia sesión' 241 y 'Mi cuenta' 251, href myaccount/dashboard) y carrito 262 (href basket, x=1367) están arriba a la derecha del encabezado. |
| K4 | Cumple | 217, 272, 334, 337 | La navegación principal se abre con el botón 'Menú' 217 en el encabezado superior; además hay enlaces horizontales arriba (NAV 272, 'Ofertas' 334, '0% interés' 337). No hay navegación fuera de la parte superior. |
| K5 | No se pudo determinar | 231, 229 | Hay un campo de entrada (231) con un LABEL candidato 229 cuya caja (x=749.7, y=73, h=43) queda sobre la mitad del campo y se extiende debajo de él, no encima ni a la izquierda. En el screenshot no se ve texto en esa caja y el campo usa un marcador de posición. El snapshot no conserva la asociación for/id ni si la etiqueta está oculta a propósito, así que no se confirma ni el cumplimiento ni la ruptura. |
| K6 | No aplica |  | La lista de pares de botones está vacía y el screenshot no muestra un par de botones de acción en la pantalla. El botón 'Aceptar' 6408 y la X 6410 del aviso de cookies no forman un par de acciones primaria/secundaria. |
| K7 | No se pudo determinar | 6399, 6402, 6405 | El pie del sitio no está en el viewport. El candidato 6399 es el aviso de cookies superpuesto abajo, no el pie, aunque contiene enlaces de privacidad (6402) y cookies (6405). La ausencia del pie en la pantalla no demuestra que el sitio no tenga pie. |
| K8 | No se pudo determinar |  | No hay ruta de navegación candidata. Es la página de inicio y la rúbrica no permite deducir la jerarquía de secciones del negocio, así que no se puede determinar si aplica. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

