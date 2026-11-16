# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1, C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=13 (>12) con agrupación parcial (g2_fraccion_agrupada=0.432; las listas de enlaces forman columnas y el encabezado reúne 13 accionables) y con controles en caja visibles de los que ninguno domina. El nivel 0 exige n1>12 sin agrupación, o ninguna acción primaria distinguible; el nivel 1 exige n1 entre 9 y 12. Ninguna ancla cubre n1=13 con agrupación parcial y acción primaria que no domina. Además, g2_inventario_ambiguo=true y sanity_ok/consent_limpio son null. |
| G3 | wireframe | 1 | No se pudo puntuar | El inventario de g3_unidades está incompleto para la región elegida (MAIN 929): el contenido del hero (titular, botón 'Contrátalo aquí', campo de número, botón 'Llámame ahora' y casilla de autorización, visibles en el screenshot dentro del nodo 960) no tiene unidades candidatas; en la sección 1130 faltan el título '¿Eres cliente Claro?', el selector 'Móvil' y el campo de número, y la caja del FORM 1138 (0,0,1291.8x696) no coincide con la sección 1130 (y=580..720). Además los menús desplegables 427 y 777 aparecen en el wireframe sobre el hero aunque el screenshot no los muestra. Sin unidades ni encabezados con id no se puede confirmar U, la segmentación encabezada ni H; con X=1 interior (1380) que no compite por posición, ninguna ancla 0/1 se cumple y las anclas 2/3 exigen X=0 e inventario completo. Ninguna ancla cubre la combinación. |
| G4 | screenshot | 1 | No se pudo puntuar | No se puede sostener la selección de un conjunto principal. La sección principal visible es el carrusel de fibra 900 megas, cuyas acciones («Contrátalo aquí», «Llámame ahora») no forman ningún conjunto suministrado. Los candidatos situados sobre el carrusel (LI#782, LI#794, LI#817, LI#432, LI#546) cuelgan de diapositivas con raíz virtual y caja parcial (427, 777) cuyas cajas no coinciden con el contenido que se ve en esa región; DIV#raiz es raíz virtual y parcial. Los únicos conjuntos equivalentes certificables (LI#419 navegación principal, LI#195 segmentos, DIV#213 enlaces utilitarios) son navegación auxiliar de otro alcance; usarlos sustituiría contenido principal incompleto por navegación solo para poder puntuar. |
| G5 | wireframe | 1 | 3 | J_inicio |
| G6 | wireframe | 1 | No se pudo puntuar | Ninguna regla de prioridad 0, 1 o 2 está demostrada (K confirmado = 0, T = 0, R = 0), y el nivel 3 exige K = 0 entre las aplicables: K5 aplica pero su cumplimiento es indeterminado (los campos visibles en el screenshot no están en el inventario y solo muestran marcador de posición), y K7/K8 tienen aplicabilidad desconocida. Si K5 estuviera rota el nivel sería 2; el nivel no se puede fijar. Además, el inventario y el wireframe incluyen capas de menú desplegable que el screenshot no muestra y omiten el formulario del hero. |
| G7 | wireframe | 1 | 1 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Ninguna regla de prioridad 0, 1 o 2 está demostrada (K confirmado = 0, T = 0, R = 0), y el nivel 3 exige K = 0 entre las aplicables: K5 aplica pero su cumplimiento es indeterminado (los campos visibles en el screenshot no están en el inventario y solo muestran marcador de posición), y K7/K8 tienen aplicabilidad desconocida. Si K5 estuviera rota el nivel sería 2; el nivel no se puede fijar. Además, el inventario y el wireframe incluyen capas de menú desplegable que el screenshot no muestra y omiten el formulario del hero..

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 1. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 411, 412 | Logo (img 412, alt 'Logo Claro') arriba a la izquierda (x=100, y=49) dentro del enlace 411 con href '/personas/', inicio de la sección. El sitio no es de una sola página. |
| K2 | Cumple | 861, 862 | Control de búsqueda 862 (aria-label 'Buscador', title 'Buscar') en el encabezado, a la derecha (x=1148, y=55); el screenshot muestra la lupa. |
| K3 | Cumple | 867 | Acceso a cuenta 'Mi Claro' (867, aria-label 'Mi Claro') arriba a la derecha (x=1200, y=48). No se observa carrito; la cuenta basta para la convención. |
| K4 | Cumple | 413, 421, 581, 715, 770 | Navegación principal NAV 413 horizontal en el encabezado (Servicios, Tienda, Beneficios, Soporte). No es un paso de flujo. |
| K5 | No se pudo determinar | 1138, 1159, 1165 | El screenshot muestra formularios (campo de número en el hero, selector 'Móvil' y campo con '+57' en la franja de clientes), pero g6_campos_de_entrada=0 y K5_campos está vacío: los campos no están en el inventario. Los campos visibles solo muestran marcador de posición, sin etiqueta visible cuya posición se pueda juzgar; las casillas llevan su texto a la derecha, lo habitual en casillas. No se puede confirmar cumplimiento ni incumplimiento. |
| K6 | No aplica |  | K6_pares_de_botones vacío y en el screenshot no se ve un par de botones de acción alternativa (las flechas del carrusel son controles de desplazamiento, no un par primaria/secundaria). Advertencia: los controles del hero no están en el inventario. |
| K7 | No se pudo determinar |  | El pie no está en el viewport (K7_pie vacío). Su ausencia en la captura no demuestra que el sitio no tenga pie. |
| K8 | No se pudo determinar |  | No hay ruta de navegación visible (K8_ruta vacío). La pantalla parece la portada de la sección Personas y no se deduce la jerarquía del sitio; no se puede afirmar aplicabilidad ni incumplimiento. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

