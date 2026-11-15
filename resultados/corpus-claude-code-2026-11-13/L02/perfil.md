# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: Los nodos guardados incluyen un posible diálogo visible (4364, 4366). Confirmar en la imagen si tapa contenido.

Aviso de captura: La imagen guardada tiene un aviso de privacidad sobre el contenido y el fondo desenfocado. El registro antiguo la marcó como limpia; esa marca no confirma que la página esté despejada.

Aviso de captura: Queda una capa o un aviso sin resolver. No presentar la página como despejada.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1, C3, C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=7 cae en el intervalo del nivel 2, pero ese nivel exige además que exista una acción primaria que no domina, y eso no se puede decidir sobre la interfaz evaluada: sanity_ok=false, consent_limpio=false y la revisión 2026-11-04 declara una capa sin resolver. La captura muestra un diálogo de preferencias de privacidad (4364, con 4393, 4405 y 4407) delante de la página, que queda tapada y desenfocada; la única decisión visible es la del diálogo, con dos botones de igual peso. Usar ese diálogo para fijar el nivel 0 (ninguna acción primaria en una pantalla que exige decisión) penalizaría a la página por una capa que la captura no descartó; usar la página de fondo exigiría suponer visible lo que está tapado. Además la evidencia de dominancia es dudosa: g2_razon_area_1_2=24.14 la fija 2318, cuya caja ink (0,0,1275,1419.5) excede su caja bounds (y=882.5) y la pantalla. Ninguna ancla cubre accion_primaria indeterminada. |
| G3 | wireframe | 1 | No se pudo puntuar | La región de contenido de la página (candidata 1892, sección principal y=196..700, y el bloque 2142 debajo) está tapada por un diálogo de privacidad sin resolver (4364/4366) y el fondo aparece desenfocado en el screenshot. No se pueden leer los textos que exigen U, H, V y X ni confirmar unidades, encabezados o pertenencia a la tarea. Puntuar el diálogo de cookies como tarea sería evaluar un interstitial y no la interfaz. Además, las cajas de 4379 (0,0,1042x596) y 4389 (0,0,1031.5x519) no coinciden con el diálogo visible en 370,256,700x388, así que su inventario tampoco es fiable. Sin región ni inventario completos no hay ancla aplicable ni base para NA. |
| G4 | screenshot | 1 | No se pudo puntuar | Captura limitada: sanity_ok=false y consent_limpio=false. El screenshot muestra el diálogo 'Centro de preferencia de privacidad' (4364/4366) sobre la página, con todo el contenido de fondo desenfocado y oscurecido. El único conjunto con equivalencia visual verificable es BUTTON#4404 (Rechazar / Aceptar todo), que pertenece al interstitial y no a la interfaz evaluada. Los conjuntos de la página (navegación LI#565, accesos DIV#2144, pestañas A#2019, diapositivas DIV#1898 con caja parcial) no se pueden juzgar en relleno, peso, color ni borde bajo el desenfoque. No hay conjunto principal sostenible, así que I, P y el nivel no se pueden determinar. |
| G5 | wireframe | 1 | 1 | J_inicio |
| G6 | wireframe | 1 | No se pudo puntuar | Ninguna regla prioritaria queda demostrada (K=0 confirmado entre cuatro convenciones aplicables, ninguna operación T identificada) y el nivel depende de R y T, que no se pueden sostener: el diálogo de privacidad 4364/4366 cubre la pantalla y el screenshot muestra el fondo desenfocado, así que el texto necesario para juzgar redundancia de contenido y trabajo trasladado no es legible. Además K2, K7 y K8 tienen aplicabilidad desconocida, por lo que K podría cambiar. Sin R=0 confirmado no se cumple el ancla 3 y sin R aislado confirmado tampoco el ancla 2. |
| G7 | wireframe | 1 | 1 | S_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Ninguna regla prioritaria queda demostrada (K=0 confirmado entre cuatro convenciones aplicables, ninguna operación T identificada) y el nivel depende de R y T, que no se pueden sostener: el diálogo de privacidad 4364/4366 cubre la pantalla y el screenshot muestra el fondo desenfocado, así que el texto necesario para juzgar redundancia de contenido y trabajo trasladado no es legible. Además K2, K7 y K8 tienen aplicabilidad desconocida, por lo que K podría cambiar. Sin R=0 confirmado no se cumple el ancla 3 y sin R aislado confirmado tampoco el ancla 2..

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 1. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 559, 557 | Sitio con varias secciones (enlaces a /personas, /negocios, /tu360), no es una página única. El logo 559 (alt 'Logo Bancolombia', aria-label 'ir a personas bancolombia') está en el extremo izquierdo del encabezado (x=15, y=120) y su ancestro 557 enlaza a /personas, el inicio del segmento según su aria-label. Por encima hay una franja promocional 3989 que no desplaza el logo de la izquierda. Se acepta /personas como inicio; no se verificó que coincida con la raíz del sitio. |
| K2 | No se pudo determinar | 532 | El único candidato, 532, es un enlace a /personas/consumidor-financiero, no un buscador. No hay campos de entrada visibles (g6_campos_de_entrada=0) y el encabezado está desenfocado bajo el diálogo, así que no se puede leer si hay un icono de búsqueda. Ausencia visible no prueba que el sitio no ofrezca búsqueda. |
| K3 | Cumple | 1061, 1084, 1057 | Hay acceso a la cuenta: 1061 enlaza a https://svpersonas.apps.bancolombia.com/autenticacion y está en el grupo 1057 del extremo derecho del encabezado (x=1150..1420, y=126..169), junto al control 1084. Arriba a la derecha, como pide la convención. El texto no es legible por el desenfoque; la función se toma del href. |
| K4 | Cumple | 563, 565, 309, 311 | La pantalla no es un paso de flujo que suprima la navegación. La navegación principal 563/565 es horizontal en el encabezado (y=124) y la barra de segmentos 309/311 también es horizontal arriba (y=67..106). |
| K5 | No aplica |  | No hay formulario: g6_campos_de_entrada=0 y K5_campos está vacío. Las etiquetas LABEL listadas (1945, 1983, 2026, 2037, 3998) no acompañan controles; se usan como texto de bloques. |
| K6 | Cumple | 4405, 4407, 4404 | El único par de botones es el del diálogo de privacidad: 'Rechazar' (4405) a la izquierda y 'Aceptar todo' (4407) a la derecha. La acción afirmativa, que se toma como primaria, queda a la derecha. Ambos tienen el mismo peso visual, así que la primaria se infiere por el sentido de la acción y no por estilo. El par pertenece a un aviso superpuesto, no al contenido de la página. |
| K7 | No se pudo determinar |  | K7_pie está vacío y no se ve pie en el viewport. Una ausencia en la captura no prueba que el sitio no tenga pie; no se infiere lo que hay fuera de pantalla. |
| K8 | No se pudo determinar |  | K8_ruta está vacío. No se puede determinar si esta pantalla está dentro de una jerarquía que exija ruta (puede ser la portada del segmento) y no se deduce la jerarquía del negocio. El fondo está desenfocado bajo el diálogo. |

Redundancias identificadas: no se pudo determinar.
Operaciones trasladadas identificadas: 0.
El trabajo trasladado no pudo evaluarse como criterio en esta captura. El recuento no demuestra su ausencia en el sitio.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

