# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1,C3,C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=16 supera 12, pero la agrupación es parcial (g2_fraccion_agrupada=0.432; barra de navegación de 9 enlaces, puntos del carrusel de 6 y otros grupos con contorno visible) y no ausente, de modo que no se cumple la primera cláusula del nivel 0. La segunda cláusula tampoco se cumple: existen acciones candidatas a primaria distinguibles (el enlace del carrusel 465, de mayor área con g2_razon_area_1_2=2.65, y la franja de aviso 452), aunque ninguna domina. Los niveles 1 (n1 9-12), 2 (n1 6-8) y 3 (n1<=5) exigen intervalos de n1 que 16 no satisface. Ninguna ancla cubre la combinación n1>12 con agrupación parcial y acción primaria que no domina. |
| G3 | wireframe | 1 | No se pudo puntuar | La combinación observada no la cubre ninguna ancla: U=6 con segmentación débil (solo el bloque 549 tiene encabezado visible, 551 'OFICINA VIRTUAL'; el banner 452, el carrusel 460 y el bloque de enlaces 527 no tienen encabezado propio), H=0, V=false y X=0. El nivel 2 exige bloques con encabezado e inventario y unidades completos; el nivel 1 exige U 9..12, H>=1 o X>=1 que compita; el nivel 0 no se cumple. Además el inventario no es completo: la sección 549 está cortada por el borde inferior (556, 565, 574, 583 parciales). |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | Las anclas 0, 1 y 2 no se activan: K=0 confirmado, T=0 y R=0. El nivel 3 exige K=0 entre las convenciones aplicables, y la aplicabilidad de K5, K7 y K8 no se pudo determinar: el único campo es el buscador (no se fija si cuenta como formulario para K5), el pie no está en el viewport y no puede concluirse que el sitio carezca de él (K7), y en la página de inicio no se determina si la ruta de navegación aplica (K8). Si alguna de ellas aplicara y estuviera rota, el nivel bajaría a 2 o 1. Falta un juicio necesario para el nivel 3; el nivel 4 además no se sostiene porque no hay mejora observable de eliminación de trabajo. |
| G7 | wireframe | 1 | 0 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Las anclas 0, 1 y 2 no se activan: K=0 confirmado, T=0 y R=0. El nivel 3 exige K=0 entre las convenciones aplicables, y la aplicabilidad de K5, K7 y K8 no se pudo determinar: el único campo es el buscador (no se fija si cuenta como formulario para K5), el pie no está en el viewport y no puede concluirse que el sitio carezca de él (K7), y en la página de inicio no se determina si la ruta de navegación aplica (K8). Si alguna de ellas aplicara y estuviera rota, el nivel bajaría a 2 o 1. Falta un juicio necesario para el nivel 3; el nivel 4 además no se sostiene porque no hay mejora observable de eliminación de trabajo..

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 1. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 99, 100 | El sitio tiene varias secciones (menú 124), así que no es un sitio de una sola página. El logo ADRES (img 100, alt de ADRES) está arriba a la izquierda del encabezado y su ancestro 99 enlaza a '/' con aria-label 'Ir a la página de inicio'. El SVG 87 de la barra superior es el acceso 'Funcionarios (intranet)', no el logo. |
| K2 | Cumple | 106, 108 | Hay buscador (input 106 role=searchbox, botón 108 'Buscar') en el encabezado, arriba a la derecha (x≈1050-1351, y≈108-150). |
| K3 | Cumple | 96 | El screenshot muestra el enlace 'Iniciar sesión' (96) arriba a la derecha (x≈1264-1354, y≈82). No hay carrito. Duda declarada: su href es '/admin', que podría ser acceso administrativo y no cuenta de usuario; se juzga por el texto visible. |
| K4 | Cumple | 111, 124, 126, 130, 137, 169, 198, 270, 337, 360, 431 | La navegación principal (nav 111 'Menú ADRES', menubar 124) es horizontal, arriba, bajo el encabezado (y≈185-257). No hay indicio de flujo que suprima la navegación. |
| K5 | No se pudo determinar | 106 | El único campo de entrada es el buscador 106, sin etiqueta visible: solo un marcador 'Búsqueda...' y aria-label. K5_etiquetas está vacía. El catálogo no fija si un buscador aislado, ya cubierto por K2, constituye un formulario para K5; no se deduce incumplimiento de una lista vacía. |
| K6 | No aplica | 521, 522, 523, 524, 525, 526, 502, 507 | Los pares candidatos son puntos indicadores del carrusel (521-526, 'Ir a diapositiva n'), equivalentes entre sí y sin acción primaria. Las flechas anterior/siguiente (507 a la izquierda, 502 a la derecha) están en extremos opuestos del carrusel, no forman un par de acción primaria/secundaria. |
| K7 | No se pudo determinar |  | K7_pie está vacío y no se ve pie en el viewport (la captura termina en 'Oficina virtual'). La ausencia del pie en pantalla no demuestra que el sitio no tenga pie; aplicabilidad y cumplimiento indeterminados. |
| K8 | No se pudo determinar |  | K8_ruta está vacío y no hay ruta bajo el encabezado. Es la página de inicio (ítem 'Inicio' 126 activo, href '/'); el menú muestra secciones con submenús, pero no se determina desde esta captura si la convención de ruta aplica a la página raíz. No se deduce incumplimiento de una lista vacía. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

