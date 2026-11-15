# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1, C3, C4 |
| G2 | wireframe | 1 | 2 | n1 |
| G3 | wireframe | 1 | No se pudo puntuar | Combinación sin ancla: U=7 con segmentación débil (el banner 1906 no pertenece a ningún bloque encabezado; solo el carrusel queda bajo el H2 1922), H=0, V=false, X=0. El nivel 1 exige U 9-12, H>=1 o X>=1 compitiendo; el nivel 2 exige segmentación encabezada e inventario completo; el nivel 3 exige U<=5. Además el inventario no es completo: la región es parcial (1985 y el carrusel siguen bajo el pliegue) y las cajas 1964, 1969, 1972 y 2013 figuran dentro del viewport pero no se ven en el screenshot. |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | K=1 confirmado (K1) sostendría el nivel 2 solo si no hubiera más convenciones rotas, pero K3, K7 y K8 tienen aplicabilidad indeterminada y K5 cumplimiento indeterminado. Cualquiera de ellas podría llevar K a 2 o a 3 o más, anclas de mayor prioridad (niveles 1 y 0). El nivel 2 no es una regla prioritaria demostrada que excluya esas anclas; falta un juicio necesario y se conserva abstención. |
| G7 | wireframe | 1 | 1 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: K=1 confirmado (K1) sostendría el nivel 2 solo si no hubiera más convenciones rotas, pero K3, K7 y K8 tienen aplicabilidad indeterminada y K5 cumplimiento indeterminado. Cualquiera de ellas podría llevar K a 2 o a 3 o más, anclas de mayor prioridad (niveles 1 y 0). El nivel 2 no es una regla prioritaria demostrada que excluya esas anclas; falta un juicio necesario y se conserva abstención..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 1. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Incumple | 443, 440, 189, 188 | La pantalla no es un sitio de una sola página: hay navegación con varias secciones. El logo del sitio (443, alt y title 'ICBF', y en el screenshot 'Bienestar Familiar') está arriba a la derecha (x≈1214, y≈45), no a la izquierda, y no tiene un ancestro enlace retenido. Arriba a la izquierda solo está 189, el logo de GOV.CO en la barra superior, que enlaza a https://www.gov.co y no al inicio de este sitio. La posición incumple la convención, sin una razón funcional visible: a la izquierda de la fila del logo hay espacio en blanco. No se afirma que al logo le falte el enlace; solo se observa la posición. |
| K2 | Cumple | 1844, 1847, 1838 | Hay un buscador (1844, aria-label 'Buscar', y el botón 1847) arriba a la derecha (x≈1119, y≈131), en la franja de navegación. Cumple la convención. |
| K3 | No se pudo determinar | 197 | En el viewport no se ve carrito ni acceso a cuenta; arriba a la derecha solo está el botón de Accesibilidad (197). La lista K3_cuenta_carrito solo trae candidatos genéricos sin identidad de cuenta. Una ausencia visible no demuestra que el sitio no tenga sesión de usuario, así que no se sabe si aplica. |
| K4 | Cumple | 458, 467, 469 | La navegación principal (458, role navigation, aria-label 'Navegación principal') es horizontal y está arriba (y≈133), bajo el encabezado. Cumple. |
| K5 | No se pudo determinar | 1838, 1844 | Hay un formulario de búsqueda (1838) con un campo de texto (1844). K5_etiquetas está vacío y el screenshot solo muestra un marcador dentro del campo ('Buscar por palabra') y el ícono de lupa, sin etiqueta visible encima ni a la izquierda. El snapshot no conserva asociaciones for/id, y no se puede determinar si un campo único de búsqueda identificado con ícono rompe la convención sin ampliar el catálogo. Cumplimiento indeterminado. |
| K6 | No aplica | 1847, 2274, 2277 | K6_pares_de_botones está vacío. Los botones visibles son el envío de la búsqueda (1847), solo junto a su campo, y las flechas Anterior y Siguiente del carrusel (2274, 2277), en extremos opuestos: es navegación y no un par de acción primaria y secundaria. En esta pantalla no hay pares de botones de acción. |
| K7 | No se pudo determinar |  | K7_pie está vacío y el pie no está dentro del viewport capturado, que termina en el carrusel de noticias. Una ausencia del pie en la captura no permite concluir que el sitio no tenga pie ni evaluar dónde están los enlaces legales y de contacto. |
| K8 | No se pudo determinar | 458, 469 | K8_ruta está vacío y no se ve una ruta de navegación bajo el encabezado. El menú muestra secciones con submenús, pero no se deduce la jerarquía del sitio ni se puede confirmar si esta pantalla es la raíz, donde no se espera una ruta. La aplicabilidad queda indeterminada. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

