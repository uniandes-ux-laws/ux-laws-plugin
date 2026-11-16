# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C4 |
| G2 | wireframe | 1 | 2 | n1 |
| G3 | wireframe | 1 | 0 | X |
| G4 | screenshot | 1 | 3 | P |
| G5 | wireframe | 1 | 3 | J_inicio |
| G6 | wireframe | 1 | No se pudo puntuar | No hay ancla que cubra la combinación ni regla prioritaria demostrada. K=0 y T=0 confirmados, pero K3, K7 y K8 quedan indeterminadas (acceso a cuenta sin sesión confirmada; sin pie ni ruta en el viewport, lo que no prueba su ausencia), así que K entre las aplicables no puede cerrarse. Además R=2 (flechas del paginador '1 de 1') afecta a 1 de 7 bloques (14 %), distribución intermedia, que sin K ni T no tiene nivel explícito. |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: No hay ancla que cubra la combinación ni regla prioritaria demostrada. K=0 y T=0 confirmados, pero K3, K7 y K8 quedan indeterminadas (acceso a cuenta sin sesión confirmada; sin pie ni ruta en el viewport, lo que no prueba su ausencia), así que K entre las aplicables no puede cerrarse. Además R=2 (flechas del paginador '1 de 1') afecta a 1 de 7 bloques (14 %), distribución intermedia, que sin K ni T no tiene nivel explícito..

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 1. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 165, 166 | La pantalla enlaza a otras páginas (estado de vuelos, términos), no es un sitio de una sola página. El logo 166 (alt 'Wingo') está arriba a la izquierda del encabezado (x=105, y=56) y su ancestro 165 enlaza a '/'. |
| K2 | Cumple | 454, 1397 | El sitio ofrece búsqueda: el buscador de vuelos 454 con botón 'Buscar' 1397 está en la parte superior, justo bajo el encabezado y centrado (x=208..1232). Interpretación: es búsqueda de vuelos, no de contenido del sitio; no se ve otro buscador. |
| K3 | No se pudo determinar | 175, 178, 191 | 'Mi Reserva' 175 y 'CHECK-IN' 178 enlazan a páginas de login de reservas, pero no se puede confirmar que sea una sesión de usuario o cuenta. No hay carrito visible. Si aplicara, el acceso está en el centro-derecha del encabezado y no en la esquina derecha, que ocupa el selector de idioma 191; no se juzga sin confirmar aplicabilidad. |
| K4 | Cumple | 171, 175, 182, 185, 188, 191 | Navegación principal horizontal arriba, en el encabezado (UL 171: Mi Reserva, Promociones y destinos, Servicios opcionales, Ayuda, ESP). No es un paso de flujo que la suprima. |
| K5 | Cumple | 469, 470, 473, 474, 587, 590, 1116, 1119 | Hay formulario. Las etiquetas de origen 590 y destino 1119 ('¿De dónde sales?', '¿A dónde vas?') van encima de su campo. Los radios 469/473 llevan su etiqueta a la derecha (470/474), que es la colocación convencional de una opción y no se cuenta como ruptura sin razón funcional. |
| K6 | No aplica | 456, 458, 460, 462 | Los únicos pares vecinos candidatos son pestañas (role=tab) del tablist 455: Vuelo, Vuelo + hotel, Hotel, Auto. No forman un par acción primaria/secundaria. 'Aplica condiciones' y 'Comprar ya' están apilados, no en par, y las flechas del carrusel son navegación. |
| K7 | No se pudo determinar |  | No hay pie en el viewport (K7_pie vacío). Su ausencia en la captura no permite concluir que el sitio no tenga pie ni que los enlaces legales falten. |
| K8 | No se pudo determinar |  | No hay ruta de navegación visible (K8_ruta vacía). La pantalla parece la página de inicio, pero no se puede deducir la jerarquía de secciones del sitio desde esta captura. |

Redundancias identificadas: 2.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

