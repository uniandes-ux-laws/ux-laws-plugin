# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: La imagen guardada muestra el carrusel central vacío e imágenes o iconos que no se ven. No se conoce la causa; revisar antes de interpretar su diseño.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C3, C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=8 cae en el intervalo del nivel 2, pero ese nivel exige además que exista una acción primaria que no domina, y el nivel 0 exige que no haya ninguna acción primaria distinguible. Ninguna de las dos condiciones se puede asegurar: la región central mayor (carrusel 4506) aparece vacía en la captura por causa desconocida según la revisión 2026-11-04, y la evidencia de dominancia (g2_areas_mayores, g2_razon_area_1_2=1.03) la dominan los puntos del carrusel 4831-4871, cuya caja ink parte de (0,0) con unos 613x641 px para un control de 13x13, lo que la hace sospechosa. Con accion_primaria indeterminada ninguna ancla cubre la combinación; además sanity_ok=false, consent_limpio=null y el inventario es ambiguo. |
| G3 | wireframe | 1 | No se pudo puntuar | Con las unidades seleccionadas U=7, B=6, H=0 y V=false, pero la segmentación es débil: el carrusel 4506 no tiene encabezado propio y solo el bloque de accesos rápidos (5348-5390) tiene el encabezado 5327. El nivel 2 exige segmentación encabezada e inventario completo; el nivel 1 exige U entre 9 y 12 con segmentación débil, H>=1 o X>=1 compitiendo; ninguna condición de nivel 0 se observa. Ninguna ancla cubre U=7 con segmentación débil. Además el inventario no es completo: las seis tarjetas están cortadas por el borde inferior (parcial=true), 4541 está parcial, y la revisión de captura advierte que el carrusel central se ve vacío y que imágenes e iconos no se cargaron, por lo que no se puede juzgar si el contenido del carrusel es de tarea o ajeno (X no resuelto). |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | Con K confirmado = 0, T = 0 y R = 0 el único ancla posible es el nivel 3, que exige K = 0 entre todas las convenciones aplicables. K3 (cuenta/carrito), K7 (pie) y K8 (ruta) tienen aplicabilidad indeterminada y K5 tiene cumplimiento indeterminado; cualquiera de ellas podría sumar K >= 1 y bajar el nivel. Además la revisión de la captura advierte carrusel vacío e imágenes no visibles, lo que debilita la lectura de R. Ninguna regla prioritaria (0, 1 o 2) está demostrada, así que no se sostiene un nivel. |
| G7 | wireframe | 1 | 0 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Con K confirmado = 0, T = 0 y R = 0 el único ancla posible es el nivel 3, que exige K = 0 entre todas las convenciones aplicables. K3 (cuenta/carrito), K7 (pie) y K8 (ruta) tienen aplicabilidad indeterminada y K5 tiene cumplimiento indeterminado; cualquiera de ellas podría sumar K >= 1 y bajar el nivel. Además la revisión de la captura advierte carrusel vacío e imágenes no visibles, lo que debilita la lectura de R. Ninguna regla prioritaria (0, 1 o 2) está demostrada, así que no se sostiene un nivel..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 1. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 202, 204, 128, 129 | El logo de Colpensiones (204) está arriba a la izquierda (x=120, y=71) dentro del enlace 202 con href "/", que lleva al inicio. La pantalla no es un sitio de una sola página: hay navegación a otras secciones. La barra superior Gov.co (129 en 128) es un logo institucional distinto que enlaza a gov.co. |
| K2 | Cumple | 227, 229 | El sitio ofrece búsqueda: campo type=search 227 y botón submit 229 en el encabezado, a la derecha (x=1125..1315, y=82..112). El screenshot muestra "Buscar" en esa caja. |
| K3 | No se pudo determinar | 3820 | No se ve carrito ni acceso a cuenta en la parte superior derecha. Los candidatos de la ranura son enlaces y controles genéricos sin identidad de cuenta. El ítem de navegación "Zona Transaccional" (3820, href "#") sugiere servicios con sesión, pero no confirma que el sitio tenga sesión de usuario; no se puede afirmar que aplique ni que no aplique. |
| K4 | Cumple | 2101, 2122, 2128, 2134, 2140, 2366, 2372, 3820 | La navegación principal (NAV 2101) es horizontal arriba, bajo el encabezado (y=147), con seis ítems: Inicio, Transparencia..., Atención y servicios..., Participa, Zona Informativa, Zona Transaccional. La pantalla no es un paso de flujo. |
| K5 | No se pudo determinar | 224, 227 | Hay un campo (227, búsqueda) con una LABEL 224 cuya caja (x=1124, y=87) queda dentro del campo (x=1125, y=82, w=152, h=30); en el screenshot "Buscar" aparece dentro del campo, como marcador. No está encima ni a la izquierda. El snapshot no conserva la asociación for/id ni si la etiqueta funciona como marcador intencional de un buscador compacto; no se confirma la violación. |
| K6 | No aplica | 4467, 4826 | La ranura de pares de botones está vacía. Los botones Anterior (4467) y Siguiente (4826) del carrusel están en extremos opuestos y son navegación, no un par de acción primaria/secundaria. No se ve ningún par de botones de acción en la pantalla. |
| K7 | No se pudo determinar |  | No hay pie dentro del viewport (ranura vacía). La ausencia de pie en la captura no permite concluir que el sitio no lo tenga, ni evaluar dónde están los enlaces legales y de contacto. |
| K8 | No se pudo determinar |  | No hay ruta de navegación visible bajo el encabezado. La pantalla parece ser el inicio (ítem Inicio activo), donde la ruta no se espera, pero no se deduce la jerarquía del sitio desde la captura; aplicabilidad indeterminada. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

