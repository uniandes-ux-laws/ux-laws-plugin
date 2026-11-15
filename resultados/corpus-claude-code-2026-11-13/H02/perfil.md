# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1 |
| G2 | wireframe | 1 | 3 | n1 |
| G3 | wireframe | 1 | 1 | U |
| G4 | screenshot | 1 | No se pudo puntuar | No se puede sostener un conjunto principal. La sección principal visible es el carrusel de noticias (SECTION#760, caja x=-2880 w=18720), y los candidatos que la representan son parciales y no equivalentes (g4:SECTION#758, g4:DIV#760). Lo único completo dentro del carrusel son controles auxiliares: los puntos (g4:LI#935, cuyo aislado 939 marca la diapositiva activa) y las flechas (g4:BUTTON#920). Los conjuntos completos restantes son la navegación principal (g4:LI#478, aislado 480 'Inicio' como página actual) y los botones utilitarios del encabezado (g4:A#338), que representan otro alcance. Elegir cualquiera sustituiría el contenido principal incompleto por navegación auxiliar. Además sanity_ok y consent_limpio son null y la revisión de captura 2026-11-04 está sin verificar. |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación observada: K=0 confirmadas, T=0 y R=1 con distribución intermedia (1 de 7 bloques, 14 %). La rúbrica no da nivel a redundancia intermedia sin K ni T. Además K1 (enlace del logo), K5, K7 y K8 quedan indeterminadas, de modo que K=0 no está demostrado para todas las aplicables y no se puede descartar un nivel inferior ni sostener el 3. |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Ninguna ancla cubre la combinación observada: K=0 confirmadas, T=0 y R=1 con distribución intermedia (1 de 7 bloques, 14 %). La rúbrica no da nivel a redundancia intermedia sin K ni T. Además K1 (enlace del logo), K5, K7 y K8 quedan indeterminadas, de modo que K=0 no está demostrado para todas las aplicables y no se puede descartar un nivel inferior ni sostener el 3..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 1. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | No se pudo determinar | 354, 356, 361 | Sitio con varias secciones (navegación con Inicio, Transparencia, Participa, etc.), así que aplica. Los logos Salud e INS (356, 361) están arriba a la izquierda, pero no hay enlace de ancestro retenido (enlace_ancestro=null); sin href observado no se confirma ni se descarta que enlacen al inicio. |
| K2 | Cumple | 371 | Campo type=search (371) con texto 'Buscar' en el screenshot, en la franja superior del encabezado, al centro-derecha (x 587–1171, y 134–190). |
| K3 | Cumple | 349 | Enlace 'Iniciar sesión' (349, href /_layouts/authenticate.aspx) indica acceso de cuenta; está arriba a la derecha (x 1233–1365, y 60–99). |
| K4 | Cumple | 436, 478, 482, 491, 500, 651, 660, 715, 724 | Navegación principal horizontal (UL 478) bajo el encabezado, en la parte superior de la pantalla (y 250–319), con siete entradas legibles en el screenshot. |
| K5 | No se pudo determinar | 371 | El único campo es el buscador 371, sin etiqueta visible (solo marcador 'Buscar' e icono). No se puede determinar si un buscador aislado constituye el formulario al que se refiere la convención, y el snapshot no conserva asociaciones label/for; no se declara incumplimiento. |
| K6 | No aplica | 340, 343, 346, 349 | Los candidatos 340/343/346/349 son enlaces a destinos independientes (Micología Colombia, puntos de donación de sangre, Intranet, Iniciar sesión), no un par de acciones primaria/secundaria. Los botones del carrusel 921 y 932 están en extremos opuestos y no forman un par. No se observa par de botones de acción. |
| K7 | No se pudo determinar |  | No hay pie en el viewport (K7_pie vacío). La ausencia en la captura no demuestra que el sitio carezca de pie ni de enlaces legales; no se puede evaluar. |
| K8 | No se pudo determinar | 482 | No hay ruta de navegación visible (K8_ruta vacío). La pantalla parece ser la página de inicio ('Inicio' activo, href /), donde una ruta tendría un único nivel; no se puede determinar si la convención aplica a la raíz ni deducir la jerarquía del sitio, así que queda indeterminada y no se cuenta como rota. |

Redundancias identificadas: 1.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

