# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1 |
| G2 | wireframe | 1 | 2 | n1 |
| G3 | wireframe | 1 | No se pudo puntuar | U=15 con segmentación débil (bloques sin encabezado propio y de tamaño muy desigual, B=9 frente a 1). El nivel 0 exige U>12 sin segmentación en bloques y el nivel 1 exige U entre 9 y 12; ninguna ancla cubre U>12 con segmentación débil. H=0 y V=false no disparan nivel. El único ajeno identificado (967) no se puede juzgar como competidor de la acción principal porque la portada no expone una acción de tarea sin inferir una tarea externa (X_compite=null). Además el inventario es incompleto: 1147, 1195, 1185 y 1680 tienen caja pero no se ven en el screenshot, y U cambia de rango si la fila de redes sociales se juzga ajena (U=6) o si los controles y la leyenda del carrusel no se cuentan aparte (U=11). |
| G4 | screenshot | 1 | No se pudo puntuar | No se puede sostener la selección del conjunto principal. La sección principal visible es el carrusel de portada (LI#1106), cuyas diapositivas son un conjunto parcial: solo una (1156) está en pantalla y las otras dos (1132, 1180) quedan fuera del viewport, así que no hay pares visibles contra los cuales juzgar un aislado. Las alternativas completas pertenecen a otro alcance: la navegación del encabezado (LI#724), con cuatro de siete cajas incoherentes (742, 784, 842, 882 en x=0,y=0 con alturas de 204-212 px que no coinciden con los ítems visibles en y≈188); los iconos de redes sociales (A#1038), navegación auxiliar; y los controles del carrusel (A#1102), excluidos como puntos de carrusel. Sustituir el contenido principal incompleto por esa navegación solo para puntuar está fuera de la rúbrica. |
| G5 | wireframe | 1 | 0 | lista_plana |
| G6 | wireframe | 1 | No se pudo puntuar | No se puede fijar un nivel. K3, K7 y K8 tienen aplicabilidad indeterminada y K5 aplica con cumplimiento indeterminado, así que K confirmado=0 pero el K real podría estar entre 0 y 4: no se sostiene ni el nivel 3 (exige K=0 entre las aplicables) ni se demuestra una regla prioritaria (K>=1). Además R=1 afecta a 1 de 9 bloques visibles (11%), redundancia intermedia que con K=0 y T=0 no tiene ancla explícita en la rúbrica. |
| G7 | wireframe | 1 | 1 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: No se puede fijar un nivel. K3, K7 y K8 tienen aplicabilidad indeterminada y K5 aplica con cumplimiento indeterminado, así que K confirmado=0 pero el K real podría estar entre 0 y 4: no se sostiene ni el nivel 3 (exige K=0 entre las aplicables) ni se demuestra una regla prioritaria (K>=1). Además R=1 afecta a 1 de 9 bloques visibles (11%), redundancia intermedia que con K=0 y T=0 no tiene ancla explícita en la rúbrica..

Convenciones evaluadas: 3 de 8. No aplicables confirmadas: 1. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 656, 654 | El sitio tiene varias secciones (navegación con submenús), así que no es un sitio de una sola página. El escudo 656 está arriba a la izquierda del encabezado del sitio y su ancestro 654 enlaza a '/'. El logo GOV.CO 537 de la barra superior enlaza al portal nacional, no al inicio de este sitio; es la barra de gobierno y no sustituye al logo propio. |
| K2 | Cumple | 664, 672, 677 | Hay buscador (formulario 664, campo 672 con texto 'Buscar en el sitio' en el screenshot, botón 677) en la parte superior derecha del encabezado (x≈1046-1345, y≈75-119). |
| K3 | No se pudo determinar | 599, 600, 134 | No se ve carrito ni acceso a cuenta en la pantalla; arriba a la derecha están el selector de idioma 600 y el botón de accesibilidad 134. Que no se vea no demuestra que el sitio no tenga sesión de usuario (podría estar en el menú 'Miembros de la Institución'), así que la aplicabilidad queda indeterminada. |
| K4 | Cumple | 716, 724, 730, 736, 744, 780, 786, 844, 884 | La navegación principal (NAV 716) es horizontal y está arriba, bajo el encabezado (y≈180-212): Home, Transparencia, Atención y Servicio, Participa, Nuestra Institución, Unidades, Miembros. |
| K5 | No se pudo determinar | 664, 672 | Hay un formulario visible, el de búsqueda (664, con el campo 672). No hay etiqueta visible encima ni a la izquierda del campo; el screenshot solo muestra un texto de ejemplo dentro del campo y el botón con lupa. El catálogo no dice si un buscador que se identifica por el texto dentro del campo y la lupa incumple K5 o tiene una razón funcional visible, y el inventario no conserva asociaciones de etiquetas (K5_etiquetas vacío). No se declara incumplimiento. |
| K6 | No aplica | 134, 677, 1229, 1232 | No hay pares de botones de acción primaria y secundaria: los dos botones visibles (accesibilidad 134 y enviar búsqueda 677) no forman un par, y las flechas del carrusel 1229/1232 son navegación simétrica, no una acción primaria. K6_pares_de_botones está vacío y el screenshot lo confirma. |
| K7 | No se pudo determinar | 122 | No se ve el pie en el viewport. El enlace oculto 'Skip to Footer' (122) sugiere que existe, pero su contenido está fuera de pantalla y no se puede saber si tiene enlaces legales y de contacto. No se infiere estructura fuera de pantalla. |
| K8 | No se pudo determinar | 693, 716, 1034 | Los submenús visibles indican que el sitio tiene secciones, pero la pantalla parece ser la de inicio (carrusel principal, enlace 'Home'), donde una ruta de navegación no tendría niveles que mostrar. Bajo el encabezado y la navegación aparece la barra de redes 1034, no una ruta. No se puede confirmar si la convención aplica a esta pantalla. |

Redundancias identificadas: 1.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

