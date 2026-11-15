# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C3,C4 |
| G2 | wireframe | 1 | 1 | n1 |
| G3 | wireframe | 1 | No se pudo puntuar | Con la región 332 se seleccionan U=3 unidades (341, 369, 387): 369 y 387 forman un bloque con encabezado propio (360 'Servicios a la ciudadanía', con subtítulo 363), pero 341 (enlace 'Resultados elección alcalde Tunja - Boyacá') queda sin agrupación ni encabezado, de modo que la segmentación es débil y no encabezada. Con H=0, V=false y X=0, ninguna ancla cubre la combinación: el nivel 3 exige que cada bloque tenga encabezado, el nivel 2 exige U entre 6 y 8 con segmentación encabezada, el nivel 1 exige U entre 9 y 12 con segmentación débil, H>=1 o X>=1 compitiendo, y el nivel 0 no se cumple. Además, la pertenencia de 341 a la tarea es un juicio dudoso: si se leyera como aviso ajeno, cambiarían U, X y X_compite. |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 2 | J_inicio |
| G6 | wireframe | 1 | No se pudo puntuar | Con K=0 confirmado, T=0 y R=0 el ancla candidata sería 3, pero exige K=0 entre todas las convenciones aplicables y falta un juicio necesario: K1 aplica y su cumplimiento es null (el logo 178 está arriba a la izquierda, pero no hay enlace_ancestro ni href retenido que muestre si enlaza al inicio), y K2, K3, K7 y K8 tienen aplicabilidad indeterminada en esta captura. Cualquiera de ellas podría resultar aplicable e incumplida, lo que movería el nivel a 2 o menos. No se completa la escala. |
| G7 | wireframe | 1 | 0 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Con K=0 confirmado, T=0 y R=0 el ancla candidata sería 3, pero exige K=0 entre todas las convenciones aplicables y falta un juicio necesario: K1 aplica y su cumplimiento es null (el logo 178 está arriba a la izquierda, pero no hay enlace_ancestro ni href retenido que muestre si enlaza al inicio), y K2, K3, K7 y K8 tienen aplicabilidad indeterminada en esta captura. Cualquiera de ellas podría resultar aplicable e incumplida, lo que movería el nivel a 2 o menos. No se completa la escala..

Convenciones evaluadas: 1 de 8. No aplicables confirmadas: 2. Indeterminadas: 5.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | No se pudo determinar | 178, 176 | El sitio tiene varias secciones enlazadas (no es de una sola página), así que aplica. El logo 178 está arriba a la izquierda (x=16,y=0), lo que cumple la posición, pero enlace_ancestro=null y no hay href retenido; sin esa evidencia no se puede afirmar ni negar que enlace al inicio. |
| K2 | No se pudo determinar |  | La ranura K2_buscador está vacía y en el screenshot no se ve buscador. La ausencia en la captura no demuestra que el sitio no ofrezca búsqueda; aplicabilidad indeterminada. |
| K3 | No se pudo determinar |  | Los candidatos de K3_cuenta_carrito son enlaces de redes sociales, mosaicos de sección y navegación; ninguno se lee en el screenshot como carrito o cuenta. No se puede confirmar si el sitio tiene sesión de usuario. |
| K4 | Cumple | 285, 289, 296, 303, 310, 317, 324 | La lista 285 con seis enlaces (Registrador Nacional, Atención y servicios a la ciudadanía, Participa, Capacitación Electoral - SICE, CEDAE, Observatorio Electoral) es una navegación principal horizontal en la zona del encabezado (bloque 168, y≈425-470). Se lee como navegación horizontal superior, al pie del encabezado y no en el borde superior del viewport. |
| K5 | No aplica |  | g6_campos_de_entrada=0, K5_campos y K5_etiquetas vacíos, y el screenshot no muestra formulario en la pantalla evaluada. |
| K6 | No aplica |  | K6_pares_de_botones vacío y el screenshot no muestra un par de botones de acción. |
| K7 | No se pudo determinar |  | No hay pie en el viewport (K7_pie vacío). La ausencia de pie en la captura no permite concluir que el sitio no lo tenga. |
| K8 | No se pudo determinar |  | K8_ruta vacío y no se ve ruta de navegación. La pantalla parece ser la portada, donde no se puede determinar si se espera una ruta; no se deduce la jerarquía del sitio. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

