# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C4 |
| G2 | wireframe | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación: g2_n1=4 (≤5) con grupos coherentes cumple la parte de conteo y agrupación del nivel 3, pero la acción primaria existe y no domina (el accionable mayor es el enlace del logotipo 268; el campo de consulta de ruta 3071 es el segundo, con g2_razon_area_1_2=1.46, y compite con el buscador del encabezado 308 y con la barra de navegación de bloques de peso similar). El nivel 3 exige acción primaria clara; el nivel 2 exige n1 entre 6 y 8; el nivel 1 exige n1 entre 9 y 12; el nivel 0 exige n1>12 o ninguna acción primaria distinguible. Además g2_inventario_ambiguo=true y sanity_ok/consent_limpio son null. |
| G3 | wireframe | 1 | 1 | U |
| G4 | screenshot | 1 | 2 | P |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | El nivel 3 exige K=0 entre todas las convenciones aplicables, T=0 y R=0. R=0 y T=0 se sostienen y no hay violación confirmada (K=0 sobre K_ap=4), pero K5 tiene cumplimiento indeterminado (las etiquetas 305 y 3066 existen pero no se ven en el screenshot y sus cajas caen dentro de los campos 308 y 3071) y K3, K7 y K8 tienen aplicabilidad desconocida. Si K5 se juzgara incumplida, K=1 daría nivel 2; con la evidencia disponible no se puede elegir entre 2 y 3, así que se mantiene la abstención sin forzar el nivel. |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: El nivel 3 exige K=0 entre todas las convenciones aplicables, T=0 y R=0. R=0 y T=0 se sostienen y no hay violación confirmada (K=0 sobre K_ap=4), pero K5 tiene cumplimiento indeterminado (las etiquetas 305 y 3066 existen pero no se ven en el screenshot y sus cajas caen dentro de los campos 308 y 3071) y K3, K7 y K8 tienen aplicabilidad desconocida. Si K5 se juzgara incumplida, K=1 daría nivel 2; con la evidencia disponible no se puede elegir entre 2 y 3, así que se mantiene la abstención sin forzar el nivel..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 1. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 268, 270, 80, 78 | El logo de la entidad (270, alt 'Logo oficial del Transmilenio s.a') está arriba a la izquierda (x=80, y=56) y su ancestro 268 enlaza a '/'. Encima va la barra GovCo con su logo (80) enlazado a gov.co, también a la izquierda. El sitio tiene varias secciones en la navegación, así que no es un sitio de una sola página. |
| K2 | Cumple | 301, 308, 313 | El buscador (301, role=search, aria-label 'Buscador de la sede electrónica') con el campo 308 y el botón 313 está en el encabezado, a la derecha (x=919..1304, y=158). En el screenshot se ve como 'Buscar en sede electrónica ...'. El buscador de rutas 3071 es una función de contenido, no el buscador del sitio. |
| K3 | No se pudo determinar |  | No se ve carrito ni acceso a cuenta. Arriba a la derecha solo hay idioma (146 'EN', 152 'Otras Lenguas') y botones de accesibilidad (114, 121, 128, 135). Que no se vea no prueba que el sitio no tenga sesión de usuario, así que la aplicabilidad queda indeterminada. Los 34 candidatos de la ranura son enlaces y botones genéricos, no una cuenta identificada. |
| K4 | Cumple | 407, 417, 423, 729, 909, 918, 1092, 1221, 1327 | La navegación principal (NAV 407) es horizontal y está bajo el encabezado (y=286): Inicio, Transparencia..., Atención y Servicio..., Participa, Nuestra entidad, Comunicaciones y Viaje en TransMi, más un menú adicional (1327). |
| K5 | No se pudo determinar | 305, 308, 3066, 3071, 3016, 3021, 3042, 3044 | Hay formularios: el buscador del encabezado (308), el buscador de rutas (3071) y los radios Troncal/TransMiZonal (3021, 3044), cuyas etiquetas 3016 y 3042 los envuelven. Las etiquetas 305 y 3066 existen en el árbol, pero sus cajas caen dentro de la parte superior izquierda de sus campos y no se ven en el screenshot. Los campos se identifican solo por el placeholder y el icono de lupa. No se puede afirmar si están ocultas a propósito o si la caja es errónea, ni si un buscador con lupa tiene una razón funcional visible para no mostrar etiqueta. El cumplimiento queda indeterminado. |
| K6 | No aplica | 146, 152 | La ranura de pares de botones está vacía. En pantalla no hay ningún par de acciones primaria/secundaria. Los botones contiguos 'EN' y 'Otras Lenguas' eligen idioma y no tienen una acción primaria, y Troncal/TransMiZonal son radios, no botones. |
| K7 | No se pudo determinar |  | El pie no está dentro del viewport y la ranura K7 está vacía. Que no se vea en la captura no prueba que el sitio no tenga pie. 'Mapa Del Sitio' (284) está arriba, pero no es un enlace legal ni de contacto del pie. |
| K8 | No se pudo determinar | 2992 | No se ve una ruta de navegación y la ranura K8 está vacía. La navegación muestra secciones, pero la pantalla parece la portada (el H1 2992, oculto, tiene un ancho parecido al de 'Inicio'). No se puede determinar si en esta página se espera una ruta. No se deduce ni la jerarquía ni el incumplimiento a partir de una lista vacía. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

