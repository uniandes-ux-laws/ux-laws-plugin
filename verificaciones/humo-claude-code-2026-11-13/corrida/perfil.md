# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C3, C4 |
| G2 | wireframe | 1 | 2 | n1 |
| G3 | wireframe | 1 | 1 | X |
| G4 | screenshot | 1 | 3 | P |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | Ninguna regla prioritaria queda demostrada: K=0 entre las tres convenciones confirmadas como aplicables (K1, K2, K4), R=0 y no se identificó ninguna operación T. El nivel 3 exige además K=0 entre las aplicables y T=0, pero K3, K6, K7 y K8 quedan con aplicabilidad indeterminada (sin cuenta/carrito visible, el único grupo de botones está en el diálogo de consentimiento sin acción primaria visualmente distinguible, sin pie ni ruta en el viewport y sin poder deducir la jerarquía del sitio) y T no es evaluable porque la pantalla no tiene campos de entrada ni resultados. Falta un juicio necesario para fijar el nivel; no se completa la escala. |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

El nivel no coincide con la regla para los juicios declarados. El trigger no corresponde a la condición declarada. La declaración de regla disponible no coincide con esos juicios.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Ninguna regla prioritaria queda demostrada: K=0 entre las tres convenciones confirmadas como aplicables (K1, K2, K4), R=0 y no se identificó ninguna operación T. El nivel 3 exige además K=0 entre las aplicables y T=0, pero K3, K6, K7 y K8 quedan con aplicabilidad indeterminada (sin cuenta/carrito visible, el único grupo de botones está en el diálogo de consentimiento sin acción primaria visualmente distinguible, sin pie ni ruta en el viewport y sin poder deducir la jerarquía del sitio) y T no es evaluable porque la pantalla no tiene campos de entrada ni resultados. Falta un juicio necesario para fijar el nivel; no se completa la escala..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 1. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 244, 246 | La pantalla pertenece a un sitio con varias secciones enlazadas (navegación 259), así que no es un sitio de una sola página. El SVG 246 con aria-label 'Ir a la Universidad de los Andes' está arriba a la izquierda (x=64, y=75.6) dentro del enlace 244 con href '/'. El candidato 3949 (abajo a la izquierda, sin identidad ni enlace) no es el logo del sitio. |
| K2 | Cumple | 297, 299 | El botón 299 con aria-label 'Buscar' (texto 'Buscar' en el screenshot) está en el encabezado, a la derecha (x=1192.9, y=75.1). El sitio ofrece búsqueda y está arriba a la derecha. |
| K3 | No se pudo determinar |  | No hay en el viewport ningún acceso a cuenta, sesión ni carrito; los candidatos de la ranura son enlaces de navegación, botones del encabezado y del diálogo de consentimiento, no una cuenta. La ausencia visible no demuestra que el sitio no tenga sesión de usuario, así que la aplicabilidad queda indeterminada. |
| K4 | Cumple | 254, 259, 261, 267, 273, 279, 285 | La pantalla no es un paso de un flujo que suprima la navegación. La navegación principal (254/259: La Universidad, Oferta Académica, Admisiones, Investigación y Creación, Vida Académica) es horizontal en la parte superior. |
| K5 | No aplica |  | g6_campos_de_entrada=0 y las ranuras K5_campos y K5_etiquetas están vacías; en el screenshot no hay ningún formulario visible en la pantalla capturada. |
| K6 | No se pudo determinar | 3995, 3997, 3999 | Los pares 261-285 son enlaces de navegación, no un par de acciones. El único grupo de botones de acción (3995 Personalizar, 3997 Denegar, 3999 Aceptar todo) está en el diálogo de consentimiento 3954, un interstitial que quedó en la captura; los tres tienen el mismo tratamiento visual, así que no se puede identificar una acción primaria sin suponerla. Aplicabilidad y cumplimiento indeterminados. |
| K7 | No se pudo determinar | 339, 351, 363 | No hay pie visible en el viewport. Los candidatos 339 Transparencia, 351 Participa y 363 Atención a la ciudadanía están en una segunda fila del encabezado (y=133), no en un pie. La ausencia de pie en la captura no permite concluir que el sitio carezca de él ni que los enlaces legales falten allí. |
| K8 | No se pudo determinar |  | La ranura K8_ruta está vacía y no se ve ruta de navegación bajo el encabezado. No se puede deducir desde la captura si esta pantalla está dentro de una jerarquía de secciones que exija ruta; no se infiere la estructura del sitio. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.
El trabajo trasladado no pudo evaluarse como criterio en esta captura. El recuento no demuestra su ausencia en el sitio.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

