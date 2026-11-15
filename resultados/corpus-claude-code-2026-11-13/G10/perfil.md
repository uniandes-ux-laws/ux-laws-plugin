# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C4 |
| G2 | wireframe | 1 | 2 | n1 |
| G3 | wireframe | 1 | No se pudo puntuar | Con la región MAIN 603 se seleccionan dos unidades de tarea (banner 614 y carrusel de noticias 630), sin bloques con encabezado propio: el H2 672 es el titular de la diapositiva activa, no un encabezado de bloque, y el banner 614 no tiene título. U=2 con segmentación ausente, H=0, V=false y X=0 no cumple el nivel 3 (exige bloques con encabezado), ni el 2 (U=6..8), ni el 1 (U=9..12, H>=1 o X>=1 que compita), ni el 0. Ninguna ancla cubre la combinación. Además el inventario no es completo: MAIN 603 es parcial, la sección 746 queda cortada en el borde inferior y varias cajas suministradas parecen anómalas. |
| G4 | screenshot | 1 | 2 | P |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | No se puede sostener K=0 entre las aplicables: la aplicabilidad de K3, K7 y K8 es indeterminada y el cumplimiento de K5 es indeterminado. Con K confirmado=0, T=0 y R=0 no hay regla de nivel 0, 1 o 2 demostrada, pero el ancla 3 exige K=0 en todas las aplicables, y esas cuatro convenciones podrían cambiar K. Falta un juicio necesario; se conserva la abstención. |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: No se puede sostener K=0 entre las aplicables: la aplicabilidad de K3, K7 y K8 es indeterminada y el cumplimiento de K5 es indeterminado. Con K confirmado=0, T=0 y R=0 no hay regla de nivel 0, 1 o 2 demostrada, pero el ancla 3 exige K=0 en todas las aplicables, y esas cuatro convenciones podrían cambiar K. Falta un juicio necesario; se conserva la abstención..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 1. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 176, 178, 146, 148 | La pantalla no es un sitio de una sola página (navegación con varias secciones). El logo del Ministerio (178) está arriba a la izquierda (x=165, y=74) y su enlace ancestro 176 apunta a https://www.mineducacion.gov.co/portal/#menu_principal, el inicio del portal. La barra superior lleva además el logo GovCo (148) arriba a la izquierda, enlazado a gov.co. Los demás candidatos del slot K1 (iconos de accesibilidad, banner, imagen del carrusel, SVG del chat) no son logos. |
| K2 | Cumple | 187, 189, 199, 204 | El sitio ofrece búsqueda: campo 199 (title Buscador, placeholder 'Buscar...' en el screenshot) y botón 204 dentro del formulario 189. Está en la zona del encabezado (y≈141), a la derecha (x 925–1275), conforme a la convención. |
| K3 | No se pudo determinar | 156 | En el encabezado visible no hay carrito ni acceso a cuenta; arriba a la derecha solo aparece el enlace 'EN' (156, English version). La ausencia visible no demuestra que el sitio carezca de sesión de usuario, y la lista K3_cuenta_carrito solo contiene enlaces genéricos. No se puede decidir si aplica. |
| K4 | Cumple | 261, 276, 279, 286, 294, 381, 391, 438, 498, 559 | La navegación principal (NAV 261, UL 276) es horizontal bajo el encabezado de marca, arriba de la página (y≈268–336), con Inicio, Transparencia, Atención y Servicios, Participa, Ministerio, Preescolar básica y media, Educación superior y Noticias. |
| K5 | No se pudo determinar | 189, 199, 204 | Hay un formulario (189) con un campo de texto (199). En el screenshot el campo no tiene etiqueta visible: solo el marcador 'Buscar...' y el botón de lupa. K5_etiquetas está vacío y el snapshot no conserva asociaciones for/id ni etiquetas ocultas. Sin etiqueta visible no hay posición que comparar; el catálogo no define si su ausencia rompe la convención de colocación. Queda indeterminado. |
| K6 | No aplica | 658, 663, 635 | K6_pares_de_botones está vacío y en el screenshot no hay un par de acciones primaria/secundaria. Las flechas anterior/siguiente del carrusel (658, 663) son navegación entre diapositivas, y 'Pausar' (635) es un control aislado; ninguno es un par de acción con primaria. |
| K7 | No se pudo determinar | 746 | El pie no está en el viewport; solo asoma una franja inferior (746, parcial, y≈889) sin contenido legible. K7_pie está vacío. La ausencia del pie en la captura no permite concluir que el sitio no tenga pie ni que los enlaces legales estén fuera de él. |
| K8 | No se pudo determinar | 279 | K8_ruta está vacío. La pantalla parece ser el inicio del portal ('Inicio' (279) resaltado en la navegación), donde una ruta de navegación no tendría niveles que mostrar. El catálogo no define el caso de la página de inicio y no se deduce la jerarquía del sitio; la aplicabilidad queda indeterminada y no se infiere incumplimiento de una lista vacía. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

