# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1, C3, C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=10 cae en el intervalo del nivel 1 (9 a 12), pero ese nivel exige agrupación débil y en el wireframe la agrupación es parcial: la navegación superior (8), la barra de accesos (5) y los puntos del carrusel (6) forman bandas con frontera visible, mientras las tres tarjetas, los botones del carrusel y los flotantes quedan como grupos sueltos (g2_fraccion_agrupada=0.481). El nivel 2 exige n1 entre 6 y 8 y el nivel 0 no se cumple (n1 no supera 12 y existe una acción primaria distinguible, el botón del héroe 1030, aunque no domina). Ninguna ancla cubre n1=10 con agrupación parcial; no se combina por regla inventada. Además g2_inventario_ambiguo=true y sanity_ok/consent_limpio no están certificados (null). |
| G3 | wireframe | 1 | 1 | segmentacion |
| G4 | screenshot | 1 | 0 | Bn |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | K=0 y T=0, pero R=1 (titular del banner repetido en la imagen y en el texto HTML del mismo slide) y su distribución no se sostiene: con 1 bloque afectado, la proporción es 1/6=16,7% (solo encabezado, carrusel, barra de accesos y tres tarjetas), 1/8=12,5% (más los dos botones flotantes) o 1/11=9,1% (más los tres títulos parciales de la fila inferior). Cambia entre intermedia (sin ancla con K=0 y T=0) y aislada (nivel 2) según el denominador, así que no aplico ningún nivel. |
| G7 | wireframe | 1 | 1 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: K=0 y T=0, pero R=1 (titular del banner repetido en la imagen y en el texto HTML del mismo slide) y su distribución no se sostiene: con 1 bloque afectado, la proporción es 1/6=16,7% (solo encabezado, carrusel, barra de accesos y tres tarjetas), 1/8=12,5% (más los dos botones flotantes) o 1/11=9,1% (más los tres títulos parciales de la fila inferior). Cambia entre intermedia (sin ancla con K=0 y T=0) y aislada (nivel 2) según el denominador, así que no aplico ningún nivel..

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 1. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 357, 355 | Logo (IMG alt 'Inicio') arriba a la izquierda, en x=164,y=25,5, dentro del enlace 355 con href '/'. El sitio tiene varias secciones (rutas /afiliados, /contactanos), así que no es un sitio de una sola página. |
| K2 | Cumple | 453, 439 | Campo de texto con aria-label 'Buscar' arriba a la derecha (x=1147,y=24). En el screenshot aparece como un botón circular con lupa en el encabezado. |
| K3 | No se pudo determinar | 472 | No se ve acceso a cuenta ni carrito en el encabezado. Solo hay un menú hamburguesa (472) cuyo contenido no se ve. No puedo saber si el sitio ofrece sesión de usuario, y su ausencia en pantalla no demuestra que no la haya. |
| K4 | Cumple | 364, 369, 373, 380, 387, 394, 401 | Navegación principal horizontal en el encabezado (NAV 364): Afiliados, Empleadores, IPS/Proveedores, Campañas Salud y Prensa. La barra de accesos rápidos (1576) es secundaria y también es horizontal. |
| K5 | No aplica | 453 | No hay formulario visible. El único campo (453) es el buscador, que se muestra contraído en un icono y ya se juzga en K2. K5_etiquetas está vacío. |
| K6 | Cumple | 939, 1538 | Par de botones del carrusel: Previous (939) a la izquierda y Next (1538) a la derecha. Son flechas de dirección más que una acción primaria y otra secundaria; la acción de avanzar está a la derecha. |
| K7 | No se pudo determinar |  | El pie no está dentro del viewport (K7_pie vacío). Esto no demuestra que el sitio no tenga pie ni que sus enlaces estén mal ubicados. |
| K8 | No se pudo determinar |  | No hay ruta de navegación visible (K8_ruta vacío). La pantalla parece la página de inicio, raíz de la jerarquía, donde no se espera una ruta, pero no puedo confirmar que sea el inicio ni deducir la jerarquía del sitio. |

Redundancias identificadas: 1.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

