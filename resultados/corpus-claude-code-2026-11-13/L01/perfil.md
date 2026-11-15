# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: Los nodos guardados incluyen un posible diálogo visible (3851). Confirmar en la imagen si tapa contenido.

Aviso de captura: La imagen guardada tiene una franja de cookies que cubre la parte inferior de la portada. El registro antiguo la marcó como limpia; conservar la advertencia sin cambiar la imagen.

Aviso de captura: Queda una capa o un aviso sin resolver. No presentar la página como despejada.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1, C3, C4 |
| G2 | wireframe | 1 | 2 | n1 |
| G3 | wireframe | 1 | No se pudo puntuar | La capa de consentimiento 3851/3852 (fija, x0 y688.9 w1440 h211.1) cubre el tercio inferior de la región 1391, incluida parte del CTA 1449, los controles 1466/1475 y todo el bloque 1495 (sus hijos 1514 y 1520 quedan ocultos). La revisión de captura la registra como capa sin resolver que no se debe presentar como despejada ni penalizar automáticamente. Si se cuenta como ajeno interior, su área (unión recortada ≈1440×211) supera la unión de las unidades de tarea (≈72.000 px² con 1438,1442,1449,1466,1475) y fijaría nivel 0 por X; si no se cuenta, el inventario sigue incompleto bajo la capa y X=0 no es demostrable para el nivel 3. Ningún juicio de X sostenible permite aplicar un ancla, así que se abstiene. |
| G4 | screenshot | 1 | No se pudo puntuar | No se puede sostener un conjunto principal. La sección principal visible (hero 'Estudiando el cielo desde los Andes', 1432/1436) tiene una sola acción ('Conoce más', 1445) y ningún conjunto de pares entre los candidatos; el contenido bajo el hero queda tapado por el aviso de cookies (3851/3853), con sanity_ok=false y consent_limpio=false. Los únicos conjuntos equivalentes son navegación auxiliar del encabezado (A#255, DIV#291), controles de video (DIV#1462) y botones del interstitial de cookies (BUTTON#3891), que representan otro alcance. Tomar la navegación principal solo para puntuar sustituiría contenido principal incompleto por navegación auxiliar; además su único aislado (269, 'Admisiones' subrayado en amarillo) dejaría P indeterminado: el subrayado puede ser un estado de sección o de cursor y la pantalla no declara que la sección promueva esa entrada. |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | El nivel 3 exige K=0 entre todas las convenciones aplicables, T=0 y R=0. K=0, T=0 y R=0 se confirman sobre lo visible, pero K3, K7 y K8 quedan con aplicabilidad indeterminada: no se ve acceso a cuenta ni pie, y no se puede deducir si el sitio tiene sesión de usuario o si la ausencia de ruta en esta portada es incumplimiento. Si esas tres resultaran aplicables y rotas, K podría llegar a 3 (nivel 0). Ninguna regla prioritaria (K>=3, K=2, K=1, T>=1) está demostrada, así que falta un juicio necesario para sostener el nivel. Además, el diálogo de consentimiento 3851 tapa la franja inferior (y>=689), incluida la región 1511 con el enlace 1520 y el botón flotante 3030, que no pueden juzgarse para R ni T. |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: El nivel 3 exige K=0 entre todas las convenciones aplicables, T=0 y R=0. K=0, T=0 y R=0 se confirman sobre lo visible, pero K3, K7 y K8 quedan con aplicabilidad indeterminada: no se ve acceso a cuenta ni pie, y no se puede deducir si el sitio tiene sesión de usuario o si la ausencia de ruta en esta portada es incumplimiento. Si esas tres resultaran aplicables y rotas, K podría llegar a 3 (nivel 0). Ninguna regla prioritaria (K>=3, K=2, K=1, T>=1) está demostrada, así que falta un juicio necesario para sostener el nivel. Además, el diálogo de consentimiento 3851 tapa la franja inferior (y>=689), incluida la región 1511 con el enlace 1520 y el botón flotante 3030, que no pueden juzgarse para R ni T..

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 1. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 240, 242 | Logo SVG 242 arriba a la izquierda (x=64,y=75) dentro del enlace 240 con href '/' y aria-label 'Ir a la Universidad de los Andes'. El sitio tiene varias secciones en la navegación, no es de una sola página. |
| K2 | Cumple | 293, 295 | Botón 295 'Buscar' en el encabezado, a la derecha (x=1192). El sitio ofrece búsqueda y está arriba a la derecha. |
| K3 | No se pudo determinar |  | En el encabezado solo se leen 'Buscar' y 'Menú'; no hay carrito ni acceso a cuenta visible. La lista K3_cuenta_carrito contiene enlaces y botones genéricos, ninguno identificable como cuenta o carrito. No se puede determinar si el sitio tiene sesión de usuario; la ausencia visible no demuestra que no aplique ni que esté rota. |
| K4 | Cumple | 250, 255, 257, 263, 269, 275, 281 | Navegación principal horizontal arriba (nav 250, contenedor 255) con 'La Universidad', 'Oferta Académica', 'Admisiones', 'Investigación y Creación' y 'Vida Académica'. |
| K5 | No aplica |  | g6_campos_de_entrada=0 y K5_campos/K5_etiquetas vacíos; en el screenshot no hay formulario en la pantalla. |
| K6 | Cumple | 3892, 3894, 3896 | El único conjunto de botones con acción primaria legible está en el diálogo de consentimiento 3851: 'Personalizar', 'Denegar' y 'Aceptar todo'; la acción que acepta y continúa ('Aceptar todo', 3896) va a la derecha. Los tres tienen el mismo estilo. El par 1466/1475 (pausa y silencio del video) no tiene acción primaria. Advertencia: el par pertenece a un interstitial que la captura no descartó. |
| K7 | No se pudo determinar |  | K7_pie vacío; el pie no está en el viewport. Los enlaces legales 3876 y 3887 están dentro del diálogo de cookies, no en un pie. La ausencia de pie en la captura no permite concluir que el sitio no lo tenga. |
| K8 | No se pudo determinar |  | K8_ruta vacío y no se ve ruta bajo el encabezado. La pantalla parece ser la portada (logo enlaza a '/'), donde no se puede decidir si la falta de ruta es incumplimiento, y no se deduce la jerarquía del sitio. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

