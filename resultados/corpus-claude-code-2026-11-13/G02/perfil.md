# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C3, C4 |
| G2 | wireframe | 1 | 3 | Ap |
| G3 | wireframe | 1 | Respuesta inválida, conservada sin corregir | g3-wireframe-r1: selección o unidades incompletas sin declarar |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | No aplica | Q=false y g5_listas_total=0: la lectura del screenshot no muestra indicador de pasos, ruta de proceso, numeración ni botón de paso siguiente, y la medición no entrega ninguna lista alineada de tres o más elementos. Se declara evidencia insuficiente porque se sospecha una omisión del instrumento (ver hallazgos). |
| G6 | wireframe | 1 | No se pudo puntuar | No se puede sostener K=0 entre las convenciones aplicables: K1 y K4 aplican pero su cumplimiento es indeterminado (logo 101 sin ancestro de enlace retenido; ningún candidato de navegación principal confirmado en el viewport, y su ausencia no prueba que esté rota), y K2, K3, K7 y K8 tienen aplicabilidad desconocida. Ningún K roto está confirmado, así que no se activan los niveles 0-2 por K; T=0 no es evaluable (sin campos ni resultados); R=1 con distribución indeterminada. Ninguna ancla queda determinada con la evidencia suministrada. |
| G7 | wireframe | 1 | 0 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: No se puede sostener K=0 entre las convenciones aplicables: K1 y K4 aplican pero su cumplimiento es indeterminado (logo 101 sin ancestro de enlace retenido; ningún candidato de navegación principal confirmado en el viewport, y su ausencia no prueba que esté rota), y K2, K3, K7 y K8 tienen aplicabilidad desconocida. Ningún K roto está confirmado, así que no se activan los niveles 0-2 por K; T=0 no es evaluable (sin campos ni resultados); R=1 con distribución indeterminada. Ninguna ancla queda determinada con la evidencia suministrada..

Convenciones evaluadas: 0 de 8. No aplicables confirmadas: 2. Indeterminadas: 6.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | No se pudo determinar | 101, 69, 67 | El logo de la entidad (IMG 101, x=164,y=41) está arriba a la izquierda; el screenshot muestra escudo y DIAN, con secciones de portales y servicios que indican un sitio de más de una página. El enlace al inicio no se puede comprobar: 101 tiene enlace_ancestro=null y la ausencia de un ancestro retenido no prueba que no enlace. El IMG 69 enlazado (67, href gov.co) es el logo de la barra GOV.CO, no el del sitio. |
| K2 | No se pudo determinar |  | No hay candidato de buscador ni se ve un campo de búsqueda en el screenshot. No se puede concluir que el sitio no ofrezca búsqueda a partir de su ausencia en el viewport. |
| K3 | No se pudo determinar | 0, 67, 114 | Los candidatos 0, 67 y 114 son el documento, el enlace a gov.co y el banner; ninguno es acceso a cuenta ni carrito según el screenshot. No se ve acceso a cuenta arriba; la existencia de sesión de usuario no se puede confirmar ni descartar (la tarjeta 'Transaccional' no basta). |
| K4 | No se pudo determinar | 73 | La pantalla es una página de inicio y no un paso de flujo que suprima la navegación, por lo que la convención aplica. El único candidato (73) es la barra GOV.CO con el texto 'Dirección de Impuestos y Aduanas Nacionales', no una navegación principal. No se ve un menú horizontal arriba ni vertical a la izquierda, pero una lista vacía no permite deducir una convención rota: no se sabe si la navegación existe en otra posición fuera del viewport. |
| K5 | No aplica |  | g6_campos_de_entrada=0, sin candidatos de campos ni etiquetas; el screenshot no muestra formulario en esta pantalla. |
| K6 | No aplica |  | g6_botones=0 y no hay pares de botones candidatos; el screenshot no muestra pares de botones. |
| K7 | No se pudo determinar |  | No hay pie en el viewport; su ausencia en la captura no permite concluir que el sitio no tenga pie. |
| K8 | No se pudo determinar |  | No se ve ruta de navegación; al ser la página de inicio no es esperable aquí, pero no se deduce la jerarquía del sitio, por lo que la aplicabilidad queda indeterminada. |

Redundancias identificadas: 1.
Operaciones trasladadas identificadas: 0.
El trabajo trasladado no pudo evaluarse como criterio en esta captura. El recuento no demuestra su ausencia en el sitio.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

