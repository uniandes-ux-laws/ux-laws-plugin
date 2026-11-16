# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1, C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=9 cae en el intervalo del nivel 1, pero en el wireframe la agrupación es parcial y no débil: la navegación (6), las pestañas (4), los puntos del carrusel (4) y los botones inferiores (3) están en bandas o contenedores delimitados, con cinco accionables sueltos (g2_fraccion_agrupada=0.636). El nivel 1 exige agrupación débil y el nivel 2 exige n1 entre 6 y 8. Ninguna ancla cubre n1=9 con agrupación parcial y una acción primaria que existe sin dominar; no se redondea n1. |
| G3 | wireframe | 1 | No se pudo puntuar | La combinación seleccionada no tiene ancla: U=6 (rango 6..8) con segmentación débil, porque el bloque de accesos rápidos 3372 (4 enlaces) no tiene encabezado propio ni en el árbol ni en el screenshot, mientras el hero 3224 y la sección 3567 sí lo tienen. El nivel 2 exige segmentación encabezada; el nivel 1 exige U entre 9 y 12 con segmentación débil, H>=1 o X>=1 compitiendo; el nivel 3 exige U<=5. Con H=0, V=false y X=0 ninguna ancla cubre el caso. Además el inventario no es completo: las pestañas 3687, 3714 y 3740 están cortadas en el borde inferior (y=882, h=18, parcial) y no son legibles en el screenshot, y las cajas de 3384, 3409 y 3434 (x=0,y=0, alto 752) parecen erróneas frente a la franja visible y=688..752. La decisión de no contar los cuatro puntos del carrusel (3285-3288) como unidades separadas también afecta U: con ellos U=10 y el caso caería en nivel 1, así que el resultado depende de un juicio de selección que se declara. |
| G4 | screenshot | 1 | No se pudo puntuar | I_principal=1 en g4:DIV#3379 (pestaña 3381, 'Canales de venta para personas', con relleno celeste frente a las otras tres en blanco), pero P no se puede determinar: la sección 'Conoce cómo te acompañamos' no declara cuál de las cuatro entradas promueve; el relleno parece marcar la pestaña activa cuyo panel queda fuera del viewport, no una recomendación. Con P indeterminado el nivel no se puede fijar entre 2/P y 3/P. Además, tres de las cuatro cajas del conjunto (3381, 3406, 3431) son incoherentes con la fila visible y sus rasgos se midieron sobre otra región. |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | Las convenciones confirmadas (K1, K3, K4) se cumplen y no se identificaron R ni T, pero el nivel 3 exige K=0 entre todas las convenciones aplicables y la aplicabilidad de K2, K7 y K8 no se puede determinar desde la pantalla: no hay buscador, pie ni ruta visibles y su ausencia en el viewport no prueba que el sitio no los tenga. Esas tres podrían fijar K entre 0 y 3, de modo que ningún ancla queda sostenida y no hay una regla prioritaria demostrada (K=0, T=0, R=0 confirmados). Además T_evaluable=false: no hay campos de entrada ni de resultado visibles. |
| G7 | wireframe | 1 | 0 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Las convenciones confirmadas (K1, K3, K4) se cumplen y no se identificaron R ni T, pero el nivel 3 exige K=0 entre todas las convenciones aplicables y la aplicabilidad de K2, K7 y K8 no se puede determinar desde la pantalla: no hay buscador, pie ni ruta visibles y su ausencia en el viewport no prueba que el sitio no los tenga. Esas tres podrían fijar K entre 0 y 3, de modo que ningún ancla queda sostenida y no hay una regla prioritaria demostrada (K=0, T=0, R=0 confirmados). Además T_evaluable=false: no hay campos de entrada ni de resultado visibles..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 2. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 357, 355 | Logo con alt 'logo Sura' (357) arriba a la izquierda (x=156, y=77), dentro del enlace 355 con href https://www.sura.co y title 'ir a Inicio'. La pantalla no es un sitio de una sola página: la navegación principal ofrece secciones. |
| K2 | No se pudo determinar |  | La lista K2_buscador está vacía y el screenshot no muestra buscador en la pantalla. No se puede afirmar que el sitio no ofrezca búsqueda ni que la tenga fuera de su ubicación; aplicabilidad indeterminada. |
| K3 | Cumple | 3013, 3015 | El screenshot muestra 'Iniciar sesión' (3013, role=button) arriba a la derecha (x=1093..1284, y=68..124): hay sesión de usuario y el acceso está en la posición convencional. La lista K3 incluye otros candidatos (documento, cuerpo, tarjetas, puntos del carrusel, chat) que no son acceso a cuenta ni carrito. |
| K4 | Cumple | 351, 467, 471, 1347, 2818 | NAV 351 con aria-label 'Menu principal' horizontal en el encabezado, con Personas (471), Empresas (1347) y Centro de Ayuda (2818). La pantalla no es un paso de flujo que suprima la navegación. |
| K5 | No aplica |  | g6_campos_de_entrada=0 y el screenshot no muestra ningún formulario ni campo en la pantalla evaluada. |
| K6 | No aplica | 3284, 3285, 3286, 3287, 3288 | Los únicos pares candidatos (3285-3288, padre 3284) son los indicadores del carrusel, sin acción primaria ni secundaria. 'Pago express' (3005) es un enlace de texto junto al botón 'Iniciar sesión' (3013), no un par de botones de una misma acción. No se observa un par de botones de acción en la pantalla. |
| K7 | No se pudo determinar |  | K7_pie está vacío y el pie no aparece en el viewport; su ausencia no prueba que el sitio carezca de pie. El enlace 'Ley de transparencia' (341) en la franja superior no permite juzgar si los enlaces legales también están en el pie. |
| K8 | No se pudo determinar | 3127, 3130 | K8_ruta está vacía. Bajo el encabezado aparece el texto 'SEGUROS' (3127), que no se identifica como ruta de navegación. No se puede determinar si la pantalla está en un nivel de jerarquía que exija ruta (puede ser la página de inicio de la sección); no se deduce la jerarquía del negocio. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.
El trabajo trasladado no pudo evaluarse como criterio en esta captura. El recuento no demuestra su ausencia en el sitio.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

