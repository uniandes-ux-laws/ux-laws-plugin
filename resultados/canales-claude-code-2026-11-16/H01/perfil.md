# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C3, C4 |
| G1 | screenshot | 1 | 0 | C3, C4 |
| G2 | wireframe | 1 | 3 | n1 |
| G2 | screenshot | 1 | 3 | n1 |
| G3 | wireframe | 1 | No se pudo puntuar | En la región 747 (carrusel principal) se seleccionan U=6 unidades agrupadas en un solo bloque sin encabezado propio (segmentacion=debil), con H=0, V=false y X=0. El nivel 2 exige segmentación encabezada; el nivel 1 exige U entre 9 y 12 con segmentación débil, H>=1 o X>=1 compitiendo; el nivel 0 exige U>12 sin segmentación, V verdadero o X de mayor área; el nivel 3 exige U<=5 con encabezados. Ninguna ancla cubre U=6 con segmentación débil, H=0, V=false y X=0, por lo que se aplica abstención. |
| G3 | screenshot | 1 | No se pudo puntuar | Con la región 747 (carrusel principal) se seleccionan U=6 unidades (banner 775, flechas 793 y 784, botón Pausar 810, puntos 822 y 823) agrupadas en un único bloque 759 sin encabezado propio: segmentacion=debil, H=0, V=false, X=0. Ninguna ancla cubre la combinación: nivel 0 exige U>12 sin segmentación, V verdadero o X de mayor área; nivel 1 exige U entre 9 y 12 con segmentación débil, H>=1 o X>=1 compitiendo; nivel 2 exige segmentación encabezada; nivel 3 exige U<=5. No se completa la escala. |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 0 | lista_plana |
| G5 | screenshot | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | Con la evidencia confirmada K=0, T=0 y R=0, pero el nivel 3 exige K=0 entre todas las convenciones aplicables y cinco quedan sin determinar: K3, K6, K7 y K8 con aplicabilidad desconocida y K5 aplicable con cumplimiento desconocido. Si cualquiera resultara aplicable e incumplida, K=1 llevaría a nivel 2. Ninguna regla prioritaria (0, 1 o 2) está demostrada, así que no hay ancla que sostenga un nivel. |
| G6 | screenshot | 1 | No se pudo puntuar | Con K=0 confirmadas, T=0 y R=0 solo el nivel 3 sería candidato, pero exige K=0 entre todas las convenciones aplicables y quedan cuatro juicios sin resolver: K3 y K7 con aplicabilidad desconocida (no hay cuenta/carrito ni pie en el viewport, y la ausencia no prueba que no existan) y K5 y K8 aplicables con cumplimiento indeterminado. Esas convenciones podrían llevar K hasta 4, lo que cambiaría el nivel; ninguna regla prioritaria está demostrada, así que se conserva la abstención. |
| G7 | wireframe | 1 | 0 | holgura |
| G7 | screenshot | 1 | 0 | holgura |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G3 screenshot repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Con la evidencia confirmada K=0, T=0 y R=0, pero el nivel 3 exige K=0 entre todas las convenciones aplicables y cinco quedan sin determinar: K3, K6, K7 y K8 con aplicabilidad desconocida y K5 aplicable con cumplimiento desconocido. Si cualquiera resultara aplicable e incumplida, K=1 llevaría a nivel 2. Ninguna regla prioritaria (0, 1 o 2) está demostrada, así que no hay ancla que sostenga un nivel..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 0. Indeterminadas: 5.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 379, 381 | El sitio tiene navegación por secciones, no es de una sola página. La imagen 381 (alt 'Logo del Ministerio de Salud y Protección Social') está arriba a la izquierda del encabezado y su ancestro 379 enlaza a '/'. El candidato 777 es el banner del carrusel, no un logo, y se excluye. |
| K2 | Cumple | 400, 410 | El campo 400 con el botón 410 (lupa en el screenshot, texto 'Buscar por componente') es un buscador situado arriba a la derecha del encabezado. |
| K3 | No se pudo determinar |  | En la pantalla no se ve carrito ni acceso a cuenta. La lista de candidatos es genérica (navegación, botones del carrusel y de accesibilidad) y ninguno es cuenta o carrito. La ausencia visible no prueba que el sitio no tenga sesión de usuario, así que la aplicabilidad queda indeterminada. |
| K4 | Cumple | 476, 562 | La navegación principal 476 (role navigation, 'Menú Minsalud') es una barra horizontal bajo el logo y el buscador, en la parte superior. Es una portada con navegación, no un paso de flujo. |
| K5 | No se pudo determinar | 397, 400 | Hay un campo de entrada (400) con etiqueta (397). Según las cajas suministradas, la etiqueta queda dentro de la caja del campo, y en el screenshot el texto 'Buscar por componente' se lee dentro del campo, no encima ni a la izquierda. No se puede determinar si es una etiqueta flotante que sube al enfocar ni la asociación for/id, porque el snapshot no las conserva. Tampoco si el patrón de etiqueta dentro de un buscador compacto tiene una razón funcional. El cumplimiento queda indeterminado. |
| K6 | No se pudo determinar | 822, 823, 793, 784 | Los pares de botones visibles son de navegación del carrusel: los indicadores 822/823 ('Slide 1'/'Slide 2') y anterior/siguiente 793/784. En ninguno se identifica una acción primaria frente a una secundaria, así que no se puede decidir si la convención aplica. Si se leyera anterior/siguiente como par, 'next' está a la derecha y no habría violación. |
| K7 | No se pudo determinar |  | El pie no aparece en el viewport (lista K7_pie vacía). Eso no demuestra que el sitio no tenga pie ni que los enlaces legales estén mal ubicados. |
| K8 | No se pudo determinar |  | No se ve ruta de navegación (lista K8_ruta vacía). La pantalla parece ser la portada (logo e 'Inicio' enlazan a '/'), donde no se puede confirmar si se espera una ruta. No se deduce la jerarquía del sitio ni una violación a partir de la lista vacía. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

## G6 screenshot repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Con K=0 confirmadas, T=0 y R=0 solo el nivel 3 sería candidato, pero exige K=0 entre todas las convenciones aplicables y quedan cuatro juicios sin resolver: K3 y K7 con aplicabilidad desconocida (no hay cuenta/carrito ni pie en el viewport, y la ausencia no prueba que no existan) y K5 y K8 aplicables con cumplimiento indeterminado. Esas convenciones podrían llevar K hasta 4, lo que cambiaría el nivel; ninguna regla prioritaria está demostrada, así que se conserva la abstención..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 1. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 381, 379 | La imagen 381 (alt: logo del Ministerio de Salud) está arriba a la izquierda (x=98.5, y=129) dentro del enlace 379 con href '/'. El sitio tiene varias secciones en la navegación, así que no es un sitio de una sola página. |
| K2 | Cumple | 400, 410, 397 | Se ve un buscador ('Buscar por componente') con el campo 400 y el botón de lupa 410, en el encabezado arriba a la derecha (x≈1075–1376, y≈149–191). |
| K3 | No se pudo determinar |  | No se ve carrito ni acceso a cuenta en el viewport. Los candidatos de la ranura son nodos genéricos (cuerpo, navegación, carrusel, accesibilidad) y ninguno es acceso a cuenta. La ausencia visible no demuestra que el sitio carezca de sesión de usuario, así que la aplicabilidad queda indeterminada. |
| K4 | Cumple | 476, 562, 564, 571, 578, 609, 616, 650, 669, 676 | La navegación principal 476 (role navigation, 'Menú Minsalud') es horizontal, arriba, bajo el logo: Inicio, Transparencia, Atención y Servicios, Participa, Salud, Protección Social, Normativa, Comunicaciones. |
| K5 | No se pudo determinar | 397, 400 | Hay un campo de entrada visible (400, búsqueda). La caja de la etiqueta 397 queda dentro de la del campo y en el screenshot solo se lee un texto dentro del campo ('Buscar por componente'), que parece marcador de posición; no se ve una etiqueta encima ni a la izquierda. No se puede determinar si ese texto es la etiqueta o un marcador, ni si la lupa constituye una razón funcional visible, así que el cumplimiento queda indeterminado. |
| K6 | No aplica | 822, 823, 793, 784 | Los únicos pares de botones visibles son controles del carrusel: los puntos 822/823 ('Slide 1'/'Slide 2') y anterior/siguiente 793/784. Son navegación entre diapositivas equivalentes, sin una acción primaria frente a una secundaria, que es lo que la convención juzga. De todos modos 'siguiente' está a la derecha. |
| K7 | No se pudo determinar |  | No hay pie en el viewport (ranura K7 vacía; abajo empieza la sección 'Noticias'). La ausencia de pie en la captura no demuestra que el sitio no lo tenga, ni permite juzgar dónde están los enlaces legales y de contacto. |
| K8 | No se pudo determinar | 476, 582, 620, 654, 680 | El sitio tiene jerarquía de secciones: la navegación muestra submenús (controles 'Abrir submenú' 582, 620, 654, 680). No se ve ruta de navegación bajo el encabezado (ranura K8 vacía), pero la pantalla parece ser la página de inicio, donde no hay ruta que mostrar, y una lista vacía no permite deducir una convención rota. Cumplimiento indeterminado. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-screenshot-r1.json>).

