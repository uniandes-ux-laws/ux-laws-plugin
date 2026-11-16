# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C4 |
| G2 | wireframe | 1 | 2 | n1 |
| G3 | wireframe | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación. Con U=4 bloques encabezados, B=1, H=0 y V=false la pantalla cumpliría el nivel 3 salvo por X: el aviso de cookies fijo (1134, y 817.1-900) intersecta geométricamente el borde inferior de la región 289 (y hasta 828.8, unos 11.7 px) y es un aviso no vinculado a la tarea. Con un ajeno interior no se cumplen los niveles 2 ni 3; no compite por posición con las acciones Entrar (339, 359, 379; la última termina en y 797.8, sin solape) ni ocupa más área que la tarea, así que tampoco aplican 0 ni 1. Además la captura no fue revisada por el detector actual y el aviso de cookies debió descartarse antes de capturar; su presencia puede ser límite de captura. |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | Solo K1 está confirmada como rota (K>=1, T=0). K2, K3 y K4 tienen aplicabilidad indeterminada y K6 cumplimiento indeterminado; si una sola de ellas resultara aplicable y rota, K=2 fijaría nivel 1 por una regla de mayor prioridad. La regla de nivel 2 (K=1) no puede sostenerse mientras los niveles 0 y 1 no estén descartados. Además R=1 con distribución intermedia no tiene ancla propia. |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

El nivel no coincide con la regla para los juicios declarados. La declaración de regla disponible no coincide con esos juicios.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Solo K1 está confirmada como rota (K>=1, T=0). K2, K3 y K4 tienen aplicabilidad indeterminada y K6 cumplimiento indeterminado; si una sola de ellas resultara aplicable y rota, K=2 fijaría nivel 1 por una regla de mayor prioridad. La regla de nivel 2 (K=1) no puede sostenerse mientras los niveles 0 y 1 no estén descartados. Además R=1 con distribución intermedia no tiene ancla propia..

Convenciones evaluadas: 2 de 8. No aplicables confirmadas: 1. Indeterminadas: 5.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Incumple | 284, 282, 280, 278 | El sitio tiene varias secciones (enlaces /personas, /empresas, /ips), no es de una sola página. El logo (img 284, alt Inicio) enlaza a / mediante 282, pero está centrado arriba (x 645-795 de 1440), no arriba a la izquierda. No se ve una razón funcional para centrarlo. |
| K2 | No se pudo determinar |  | No hay candidato de buscador en la pantalla. La ausencia visible no demuestra que el sitio no ofrezca búsqueda; aplicabilidad indeterminada. |
| K3 | No se pudo determinar |  | No se ve carrito ni acceso a cuenta; los candidatos de la ranura son enlaces de selección de usuario, el botón flotante de canales de servicio (138), enlaces de cookies y botones del aviso. No se puede saber desde la captura si el sitio tiene sesión de usuario. |
| K4 | No se pudo determinar | 134, 282, 545, 704, 837 | No hay navegación principal horizontal arriba ni vertical a la izquierda; los NAV 545, 704 y 837 están en el pie y quedan tapados por el aviso de cookies. La pantalla es un selector de tipo de usuario (Personas, Empresas e independientes, IPS) que puede suprimir la navegación deliberadamente; no se puede decidir si aplica. |
| K5 | No aplica |  | g6_campos_de_entrada=0 y no se ve formulario en la pantalla. |
| K6 | No se pudo determinar | 1153, 1155, 1158 | Hay un par de botones en el aviso de cookies: Aceptar (1155) a la izquierda y No, gracias (1158) a la derecha. El botón con relleno visible es No, gracias, mientras Aceptar parece texto; no se puede determinar cuál es la acción primaria, así que el cumplimiento queda indeterminado. |
| K7 | Cumple | 513, 545, 704, 837 | Hay pie (FOOTER 513) dentro del viewport. Contiene NAV con aria-label menu-lineas-atencion (545, contacto) y normatividad (704, legal). Su texto está tapado por el aviso de cookies, así que el juicio se apoya en la identidad declarada y no en la lectura de los enlaces. |
| K8 | No se pudo determinar |  | No hay ruta de navegación visible. La pantalla parece la entrada del sitio, donde no se espera una ruta, pero no se deduce la jerarquía de secciones del sitio; aplicabilidad indeterminada. |

Redundancias identificadas: 1.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

