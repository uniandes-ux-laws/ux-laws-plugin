# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C2,C4 |
| G2 | wireframe | 1 | 3 | Ap |
| G3 | wireframe | 1 | No se pudo puntuar | La combinación U=6, segmentación débil (el bloque 689 de accesos a servicios no tiene encabezado propio; el H2 675 pertenece al bloque 672 del buscador), H=0, V=false y X=0 dentro de la región no está cubierta por ninguna ancla: el nivel 1 exige U entre 9 y 12 con segmentación débil, H>=1 o X interior compitiendo; el nivel 2 exige segmentación encabezada además de inventario y unidades completos; el nivel 3 exige U<=5. Además las tarjetas de servicio no tienen un contenedor candidato en g3_unidades (692, 706, 719, 731 y 743 no se suministran como unidades), por lo que se representan con su H3 y las unidades no están completas. |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | Ninguna regla prioritaria queda demostrada (K confirmado=0, T=0, R=0) y el nivel 3 exige K=0 entre todas las convenciones aplicables, lo que no se sostiene: K1 aplica pero no se observa si el logo enlaza al inicio (sin href retenido), y K3, K5, K7 y K8 tienen aplicabilidad indeterminada. Con esas cuatro o cinco convenciones abiertas K podría ir de 0 a 5, de modo que el nivel podría ser cualquiera entre 0 y 3. No se completa la escala. |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Ninguna regla prioritaria queda demostrada (K confirmado=0, T=0, R=0) y el nivel 3 exige K=0 entre todas las convenciones aplicables, lo que no se sostiene: K1 aplica pero no se observa si el logo enlaza al inicio (sin href retenido), y K3, K5, K7 y K8 tienen aplicabilidad indeterminada. Con esas cuatro o cinco convenciones abiertas K podría ir de 0 a 5, de modo que el nivel podría ser cualquiera entre 0 y 3. No se completa la escala..

Convenciones evaluadas: 2 de 8. No aplicables confirmadas: 1. Indeterminadas: 5.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | No se pudo determinar | 88, 89 | El screenshot muestra el logotipo BOGOTÁ arriba a la izquierda (H1 89, x=220, y=0) y la navegación principal indica un sitio de varias secciones, así que la convención aplica. La posición cumple, pero no hay un href retenido para el logo (89 no tiene enlace ancestro y su imagen no está en el inventario); según los límites, eso no prueba que no enlace al inicio. Cumplimiento indeterminado. El candidato 667 de la ranura es el banner (alt 'banner fenomeno del niño'), no el logo. |
| K2 | Cumple | 679, 681, 682 | Hay un buscador (INPUT 681 y BUTTON 682 con title 'Buscar') centrado horizontalmente en la mitad superior de la primera pantalla, bajo el título 'Trámites y servicios'. No está en la barra del encabezado; la razón funcional se ve en pantalla: es la búsqueda principal destacada del portal de trámites. No se cuenta como rota sin razón funcional visible. |
| K3 | No se pudo determinar | 618 | No se ve carrito ni acceso a cuenta. Arriba a la derecha solo aparece el enlace 'PQRS-Bogotá te escucha' (618), que no es una sesión de usuario. Que no se vea una sesión no demuestra que el sitio no la tenga. Aplicabilidad indeterminada. |
| K4 | Cumple | 96, 97, 101, 283, 339, 389, 445, 507 | NAV 96 con UL 97 (aria-label 'Menú principal Portal Bogotá') y seis enlaces horizontales en el encabezado (Mi ciudad, ¿Qué hacer?, Servicios, Yo participo, Así vamos, Internacional). Es navegación horizontal arriba. |
| K5 | No se pudo determinar | 681 | El único campo es el buscador 681, que solo tiene un texto de ejemplo dentro ('¿Qué quieres hacer hoy? Busca trámites...') y ninguna etiqueta visible encima ni a la izquierda (K5_etiquetas vacío). El catálogo no define si un buscador aislado cuenta como formulario, y ese mismo control ya se evaluó en K2; evaluarlo otra vez arriesgaría un doble conteo. El snapshot tampoco conserva asociaciones for/id. Aplicabilidad indeterminada. |
| K6 | No aplica | 682 | g6_botones=1 y K6_pares_de_botones está vacío. En la pantalla solo se ve el botón de búsqueda, sin pares de botones. |
| K7 | No se pudo determinar | 764, 768 | El pie no se ve en la captura. Abajo solo asoma una franja oscura parcial (764/768, h≈17) que no permite identificar su contenido. La ausencia en la captura no permite concluir que el sitio no tenga pie. Indeterminado. |
| K8 | No se pudo determinar |  | No se ve ninguna ruta de navegación (K8_ruta vacío). La pantalla parece ser la raíz del portal, y el catálogo no define si la convención aplica en la página de inicio. No se infiere la jerarquía del sitio. Indeterminado. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

