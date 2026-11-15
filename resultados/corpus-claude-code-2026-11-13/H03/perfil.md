# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=4 cumple el intervalo del nivel 3 (n1<=5), pero la acción primaria no es clara: ninguna acción domina por peso visual (g2_razon_area_1_2=1.17 entre enlaces del menú) y la agrupación es parcial. El nivel 2 exige n1 entre 6 y 8, el nivel 1 entre 9 y 12, y el nivel 0 exige n1>12 sin agrupación o ausencia de acción primaria en una pantalla cuyo propósito exige una decisión, lo que no se observa en esta portada informativa. Ninguna ancla cubre n1<=5 con acción primaria que no domina; no se redondea n1 ni se puntúa solo por su intervalo. |
| G3 | wireframe | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación U=8, segmentación débil (un solo bloque sin encabezado), H=0, V=false, X=1 interior que no compite por posición y no ocupa más área que la tarea. No es nivel 0 (U<=12, V falso, X sin área mayor), ni 1 (U fuera de 9..12, H=0, X no compite), ni 2 (exige segmentación encabezada y ningún ajeno interior), ni 3 (exige U<=5 con encabezados). Con X=0 tampoco habría ancla, porque U=6..8 sin segmentación encabezada no está definido. |
| G4 | screenshot | 1 | No se pudo puntuar | No se puede sostener un conjunto principal. La sección principal visible es el carrusel 'Invima evoluciona' (2031/2033), sin acción ni pares de contenido entre los candidatos; sus únicos conjuntos equivalentes son controles del carrusel (miniaturas LI#2053 y flechas A#2036), que la rúbrica pide no tomar como principal por representar otro alcance. La alternativa, la navegación principal LI#438, pertenece al encabezado y sus siete cajas son incoherentes (todas parten de x=0, y=0 con anchos acumulados de 77.8 a 1270.2 y altos de 169-190), de modo que sus rasgos y su atípico 1341 no describen cada ítem. Usarla sería sustituir contenido principal por navegación auxiliar con evidencia geométrica defectuosa solo para poder puntuar. Sin conjunto principal no hay I_principal ni P, y ninguna ancla cubre el caso. |
| G5 | wireframe | 1 | 1 | J_inicio |
| G6 | wireframe | 1 | No se pudo puntuar | No se puede sostener ningún ancla. K=0 confirmado, T=0 y R=0 apuntan al nivel 3, pero ese nivel exige K=0 entre todas las convenciones aplicables y quedan juicios sin cerrar: K5 aplica (hay un formulario de búsqueda) y su cumplimiento es indeterminado, porque el campo 352 no muestra etiqueta visible y el snapshot no conserva asociaciones de etiqueta; K7 y K8 tienen aplicabilidad desconocida porque el pie y una posible ruta no están en el viewport y su ausencia no prueba que no existan. Si esas tres estuvieran rotas K podría llegar a 3 (nivel 0), por lo que ninguna regla prioritaria queda demostrada. Además varias cajas de la evidencia parecen erróneas (ver hallazgos). |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: No se puede sostener ningún ancla. K=0 confirmado, T=0 y R=0 apuntan al nivel 3, pero ese nivel exige K=0 entre todas las convenciones aplicables y quedan juicios sin cerrar: K5 aplica (hay un formulario de búsqueda) y su cumplimiento es indeterminado, porque el campo 352 no muestra etiqueta visible y el snapshot no conserva asociaciones de etiqueta; K7 y K8 tienen aplicabilidad desconocida porque el pie y una posible ruta no están en el viewport y su ausencia no prueba que no existan. Si esas tres estuvieran rotas K podría llegar a 3 (nivel 0), por lo que ninguna regla prioritaria queda demostrada. Además varias cajas de la evidencia parecen erróneas (ver hallazgos)..

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 1. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 340, 342, 343 | El logo del sitio (343, alt 'Invima'; 342 role=img 'Logo of Invima') está arriba a la izquierda (x=15,y=57) y su ancestro 340 enlaza a '/'. El sitio tiene varias secciones, no es de una sola página. El logo 259 'Gov.co' es la barra gubernamental y enlaza a gov.co; 80 y 2040 del slot no son logos. |
| K2 | Cumple | 350, 352, 354 | Hay buscador (350 role=search, campo 352 type=search, botón 354 'Búsqueda') en la banda superior (y=64), cerca del centro horizontal (x 578-909 de 1440). |
| K3 | Cumple | 399, 404 | El acceso a la cuenta (399, href /web/login; en el screenshot 'Inicia Sesión') está arriba a la derecha (x=1281,y=68). No hay carrito. Los demás candidatos del slot (documento, body, redes sociales, menú, carrusel) no son acceso a cuenta. |
| K4 | Cumple | 243, 438, 442, 448, 455, 459, 676, 680, 863, 869, 876, 880, 1079, 1083, 1343, 1347, 1534 | La navegación principal (243 aria-label Main, 438 role=menu) es horizontal arriba: los textos de sus ítems están en una fila a y=147 bajo la banda del logo, como confirma el screenshot (Inicio ... Trámites y servicios). La pantalla no es un paso de flujo. Las cajas de los LI/A del menú parecen erróneas, pero los textos sostienen la posición. |
| K5 | No se pudo determinar | 348, 352 | Hay formulario (348) con un campo (352). En el screenshot el campo solo muestra el marcador 'Buscar...' y una lupa; no hay etiqueta visible encima ni a la izquierda (K5_etiquetas vacío). El snapshot no conserva asociaciones de etiqueta y el catálogo no define si un buscador de un solo campo con marcador y botón identificado cuenta como incumplimiento sin razón funcional visible. Indeterminado. |
| K6 | No aplica | 2059, 2064 | No hay pares de botones de acción en la pantalla (K6_pares_de_botones vacío). Los controles Anterior (2059) y Siguiente (2064) del carrusel están en lados opuestos y no forman un par de acción primaria y secundaria. |
| K7 | No se pudo determinar |  | No hay pie en el viewport (K7_pie vacío; la franja 2070/2071 en y=898 está cortada). La ausencia en la captura no prueba que el sitio no tenga pie; no se supone lo que hay fuera de pantalla. |
| K8 | No se pudo determinar | 241, 438 | No hay ruta visible bajo el encabezado (K8_ruta vacío). La pantalla parece ser la de inicio ('Inicio' resaltado) y el menú muestra desplegables, pero no se confirma la jerarquía de secciones ni el catálogo define si la portada debe mostrar ruta. Indeterminado. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

