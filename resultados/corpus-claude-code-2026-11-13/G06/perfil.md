# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=14 supera el intervalo 9-12 del nivel 1 y el 6-8 del nivel 2, y la agrupación es parcial (g2_fraccion_agrupada=0.556, barra superior de 5 enlaces y 6 controles de paginación agrupados), no ausente, así que la primera cláusula del nivel 0 (n1>12 sin agrupación) no se cumple. La segunda cláusula del nivel 0 exige ninguna acción primaria distinguible en una pantalla cuyo propósito exige una decisión: en el wireframe ninguna acción domina (g2_razon_area_1_2=1, las dos mayores son los controles laterales 1871 y 1879 del carrusel, de igual área), pero sí hay acciones distinguibles que no dominan, y que esta portada informativa exija una decisión no es un juicio visible inequívoco. Ninguna ancla cubre la combinación n1=14, agrupación parcial, acción primaria que no domina; no se combina por regla propia. |
| G3 | wireframe | 1 | No se pudo puntuar | La combinación U=4 con segmentación débil (dos bloques sin encabezado propio de bloque), H=0, V=false y X=0 no está cubierta por ningún ancla: el nivel 3 exige que cada bloque tenga encabezado, el nivel 2 exige U entre 6 y 8 y el nivel 1 exige U entre 9 y 12 con segmentación débil, H>=1 o X>=1 compitiendo. Además el inventario no es completo: las tres tarjetas están cortadas por el borde inferior del viewport y la tarjeta 1989 queda parcialmente tapada por el asistente fijo 2579. |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 2 | J_inicio |
| G6 | wireframe | 1 | No se pudo puntuar | Con K=0 entre las aplicables confirmadas (K1, K2, K4), T=0 y R=0 la combinación apuntaría al nivel 3, pero ese nivel exige K=0 entre todas las convenciones aplicables y la aplicabilidad de K3, K7 y K8 no se pudo determinar: no hay evidencia visible de si existe sesión de usuario (K3), el pie queda fuera del viewport y su ausencia no prueba que no exista (K7), y no se puede establecer si esta pantalla es la raíz del sitio donde no se espera ruta de navegación (K8). Si alguna aplicara y estuviera rota, el nivel sería otro (K=1 daría 2). Ninguna regla prioritaria (0, 1 o 2) queda demostrada, así que falta un juicio necesario y se conserva la abstención. |
| G7 | wireframe | 1 | 0 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Con K=0 entre las aplicables confirmadas (K1, K2, K4), T=0 y R=0 la combinación apuntaría al nivel 3, pero ese nivel exige K=0 entre todas las convenciones aplicables y la aplicabilidad de K3, K7 y K8 no se pudo determinar: no hay evidencia visible de si existe sesión de usuario (K3), el pie queda fuera del viewport y su ausencia no prueba que no exista (K7), y no se puede establecer si esta pantalla es la raíz del sitio donde no se espera ruta de navegación (K8). Si alguna aplicara y estuviera rota, el nivel sería otro (K=1 daría 2). Ninguna regla prioritaria (0, 1 o 2) queda demostrada, así que falta un juicio necesario y se conserva la abstención..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 2. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 146, 144 | El sitio tiene varias secciones (navegación 174 con enlaces internos), así que no es un sitio de una sola página. El logo RUNT (146, alt «Inicio») está arriba a la izquierda (x=72, y=64) y su ancestro 144 enlaza a «/». El logo GOV.CO (66) de la barra superior enlaza a otro sitio y no es el logo propio. |
| K2 | Cumple | 381, 379 | La ranura K2_buscador viene vacía, pero el screenshot muestra un botón con icono de lupa en la barra de navegación, que corresponde al control 381 (accionable, dentro del ítem 379 de la lista de navegación), a la derecha (x≈1190) y arriba (y≈188). La identidad de búsqueda se lee solo del icono: el nodo no trae aria-label ni role. |
| K3 | No se pudo determinar |  | No se ve carrito ni acceso a cuenta en la pantalla. Los candidatos de la ranura K3 son enlaces y botones genéricos sin identidad de cuenta. Su ausencia visible no demuestra que el sitio no tenga sesión de usuario, así que no se puede decidir si la convención aplica. |
| K4 | Cumple | 174, 179 | La navegación principal (174, role=navigation; lista 179 con Actores, Registros RUNT, Sobre el RUNT, Sala de prensa, Transparencia) es horizontal y está arriba (y≈188-244). La pantalla no es un paso de un flujo que suprima la navegación. |
| K5 | No aplica |  | No hay formulario en la pantalla: g6_campos_de_entrada=0, y las ranuras K5_campos y K5_etiquetas están vacías. El screenshot no muestra campos. |
| K6 | No aplica | 1632, 1634, 1636, 1638, 1640, 1642, 1871, 1879 | Los pares vecinos de la ranura K6 son indicadores de posición de un carrusel (aria-label «Slide 0».. «Slide 5»), y 1871/1879 son las zonas de anterior y siguiente del mismo carrusel. Ninguno forma un par de acción primaria y secundaria, que es lo que la convención juzga. |
| K7 | No se pudo determinar |  | La ranura K7_pie está vacía y el pie no está dentro del viewport. Su ausencia en la captura no permite concluir que el sitio no tenga pie. El enlace de contacto (91) aparece en la barra superior, lo cual no prueba ni descarta que también esté en el pie. |
| K8 | No se pudo determinar |  | No hay ruta de navegación visible bajo el encabezado (ranura K8_ruta vacía). Los href internos anidados (por ejemplo 1929, /actores/ciudadano/...) sugieren jerarquía, pero no se puede determinar si esta pantalla es la página de inicio, donde la ruta no se espera. No se deduce la jerarquía del negocio. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

