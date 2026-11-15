# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C3, C4 |
| G2 | wireframe | 1 | No se pudo puntuar | Combinación sin ancla: g2_n1=5 (rango del nivel 3) con grupos coherentes en el wireframe, pero la acción primaria no domina. El nivel 3 exige acción primaria clara; el nivel 2 (existe acción primaria que no domina) exige n1 entre 6 y 8; el nivel 0 exige n1>12 sin agrupación o ninguna acción primaria distinguible. Ninguna ancla cubre n1<=5 con acción primaria que no domina. Además g2_inventario_ambiguo=true (FORM 236 con 19 controles cuya delegación no se puede distinguir). |
| G3 | wireframe | 1 | No se pudo puntuar | La combinación U=6, segmentación ausente (ningún bloque con encabezado propio en la región 747), H=0, V=false y X=0 no está cubierta por ninguna ancla: el nivel 0 exige U>12 sin segmentación, V verdadero o X de mayor área; el nivel 1 exige U 9-12 con segmentación débil, H>=1 o X>=1 compitiendo; el nivel 2 exige U 6-8 segmentadas en bloques con encabezado; el nivel 3 exige U<=5 bloques con encabezado. No se completa la escala. |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | Con K=0 confirmado, T=0 y R=0 el ancla posible es 3, pero exige K=0 entre todas las convenciones aplicables y falta un juicio necesario: K5 aplica (etiqueta 397 y campo 400) y su cumplimiento es indeterminado, porque la caja de la etiqueta se superpone a la parte inferior del campo y el screenshot solo muestra un texto dentro del campo, sin poder confirmar si la etiqueta es visible o si ese texto es un marcador. Si K5 incumpliera, K=1 llevaría a nivel 2. Además K3, K7 y K8 tienen aplicabilidad desconocida (sin cuenta/carrito, pie ni ruta visibles en el viewport, lo que no prueba su ausencia en el sitio). El nivel queda entre 2 y 3 sin regla que lo fije. |
| G7 | wireframe | 1 | 0 | holgura |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Con K=0 confirmado, T=0 y R=0 el ancla posible es 3, pero exige K=0 entre todas las convenciones aplicables y falta un juicio necesario: K5 aplica (etiqueta 397 y campo 400) y su cumplimiento es indeterminado, porque la caja de la etiqueta se superpone a la parte inferior del campo y el screenshot solo muestra un texto dentro del campo, sin poder confirmar si la etiqueta es visible o si ese texto es un marcador. Si K5 incumpliera, K=1 llevaría a nivel 2. Además K3, K7 y K8 tienen aplicabilidad desconocida (sin cuenta/carrito, pie ni ruta visibles en el viewport, lo que no prueba su ausencia en el sitio). El nivel queda entre 2 y 3 sin regla que lo fije..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 1. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 381, 379 | La imagen 381 con alt de logo del Ministerio está arriba a la izquierda y su ancestro retenido 379 enlaza a href='/'. La pantalla tiene navegación por secciones, así que no es un sitio de una sola página. |
| K2 | Cumple | 400, 410 | Campo de texto 400 con botón 410 arriba a la derecha; en el screenshot se lee 'Buscar por componente' y un icono de lupa. |
| K3 | No se pudo determinar |  | Ningún candidato de K3 es un acceso a cuenta o carrito según su identidad y el screenshot; la lista agrupa nodos genéricos. La ausencia visible no demuestra que el sitio no tenga sesión de usuario. |
| K4 | Cumple | 476, 562 | NAV 476 con role navigation y aria-label 'Menú Minsalud', lista horizontal 562 bajo el encabezado, arriba de la pantalla. |
| K5 | No se pudo determinar | 397, 400 | Hay un campo de entrada 400 con etiqueta 397. La caja de la etiqueta (y=170.25, h=22) queda dentro de la franja inferior del campo (y=148.75, h=42), no encima ni a la izquierda. En el screenshot solo se ve un texto dentro del campo; no se puede determinar si es la etiqueta o un marcador con la etiqueta oculta, ni si hay razón funcional visible. |
| K6 | No aplica | 818, 822, 823, 784, 793 | Los pares visibles son indicadores del carrusel ('Slide 1'/'Slide 2', 822/823) y flechas anterior/siguiente (793/784). Son navegación simétrica del carrusel, sin acción primaria frente a secundaria. |
| K7 | No se pudo determinar |  | No hay candidatos de pie en el viewport. La ausencia de pie en la captura no permite concluir que el sitio no lo tenga. |
| K8 | No se pudo determinar |  | No hay ruta de navegación visible. Los submenús sugieren secciones, pero no se deduce la jerarquía del sitio ni se puede confirmar si esta pantalla es el inicio, donde la ruta no sería necesaria. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

