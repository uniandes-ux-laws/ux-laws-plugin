# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=15 supera el intervalo del nivel 1 (9-12) y de los niveles 2-3, pero el nivel 0 exige n1>12 sin agrupación o ninguna acción primaria distinguible en una pantalla que exige decisión. Aquí hay agrupación parcial (g2_fraccion_agrupada=0.8: banda de temas, banda de cabecera y columnas de contenido con contenedor visible), existe una acción candidata (botones de cabecera 438 y 465) que no domina, y la portada no exige una decisión visible. Ninguna ancla cubre n1>12 con agrupación parcial y acción primaria que no domina; no se combina por regla inventada. |
| G3 | wireframe | 1 | 0 | X |
| G4 | screenshot | 1 | No se pudo puntuar | No se puede sostener un conjunto principal. El objetivo visible de la sección principal son las noticias de portada, y su único candidato (g4:DIV#1631) es parcial, mezcla una columna de texto (1632) con una fotografía (1673) y tiene cajas incoherentes con la pantalla (1659 y 1700 empiezan en 0,0 y abarcan casi todo el viewport; 1645 y 1715 quedan casi fuera). No se certifica la equivalencia de sus miembros. Las alternativas son auxiliares o de otro alcance: los temas del día (g4:LI#351, con cajas acumuladas desde x=0 que no localizan cada ítem), los botones de cuenta del encabezado (g4:DIV#402), los iconos de búsqueda y menú (g4:LABEL#402). Elegirlos sustituiría contenido principal incompleto por navegación auxiliar solo para poder puntuar. Además, sanity_ok y consent_limpio son null, la captura está sin verificar y un anuncio fijo inferior tapa la continuación de las noticias. |
| G5 | wireframe | 1 | 1 | J_inicio |
| G6 | wireframe | 1 | 1 | K |
| G7 | wireframe | 1 | 1 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

El nivel no coincide con la regla para los juicios declarados. El trigger no corresponde a la condición declarada. La declaración de regla disponible no coincide con esos juicios.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **1**.

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 0. Indeterminadas: 4.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Incumple | 420, 422 | El logo (SVG 422, aria-label 'Logo de EL TIEMPO') enlaza al inicio (420, href https://www.eltiempo.com), pero está centrado en el encabezado (x=591..849), no arriba a la izquierda. La pantalla no es un sitio de una sola página. No se observa razón funcional para la posición: la esquina izquierda la ocupan los íconos 404 y 412. |
| K2 | Incumple | 404, 406, 489, 491 | El sitio ofrece búsqueda (botón 491 aria-label 'Buscar'). El único acceso visible en el screenshot es el ícono de lupa 404/406, arriba a la izquierda (x=120), no centrado ni a la derecha. El campo 489 figura centrado en el inventario (x=467, y=473), pero no se ve en el screenshot; no se supone visible lo que está oculto. |
| K3 | Cumple | 465, 438 | El acceso a la cuenta ('INICIAR SESIÓN', 465) está arriba a la derecha del encabezado (x=1181..1320), junto a 'SUSCRÍBETE' (438). |
| K4 | Cumple | 335, 412 | La navegación 335 ('Temas del día' con enlaces a temas) es horizontal en la franja superior; el menú 412 (ícono de hamburguesa) está arriba a la izquierda. Ambas posiciones corresponden a la convención. |
| K5 | No se pudo determinar | 489, 1556, 404, 412, 465, 479 | No hay formulario visible en el screenshot. El campo 489 y el textarea 1556 (parcial, en el borde derecho) existen en el inventario, pero no se ven. Las etiquetas 404, 412, 465 y 479 funcionan como controles de íconos o de sesión, no como rótulos de campos. No se puede confirmar si aplica. |
| K6 | No se pudo determinar | 438, 465 | El inventario no encontró pares de botones. En el encabezado, 'SUSCRÍBETE' (438, relleno, a la izquierda) y 'INICIAR SESIÓN' (465, contorno, a la derecha) se ven como pareja, pero son acciones distintas, no la elección principal y secundaria de una misma decisión. No se puede confirmar que sea un par de botones en el sentido de la convención. |
| K7 | No se pudo determinar |  | No hay pie dentro del viewport. Eso no demuestra que el sitio carezca de pie, y la convención no puede comprobarse en esta pantalla. |
| K8 | No se pudo determinar |  | Los href muestran secciones (/justicia/delitos, /unidad-investigativa), pero la pantalla parece la portada. No se ve ruta de navegación, y una lista vacía no demuestra que la convención esté rota. No se determina si aplica a esta pantalla. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

