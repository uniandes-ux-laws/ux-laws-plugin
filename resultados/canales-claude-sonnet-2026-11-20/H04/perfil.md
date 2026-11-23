# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G2 | wireframe | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación: g2_n1=16 supera 12, así que los niveles 1 (n1 de 9 a 12), 2 (n1 de 6 a 8) y 3 (n1 <= 5) no aplican, y el nivel 0 exige n1 > 12 sin agrupación, pero hay agrupación parcial (g2_fraccion_agrupada=0.432; barra de navegación de 9 enlaces, buscador, grupo de 6 puntos del carrusel, lista de 3 enlaces, herramientas de accesibilidad). La otra vía del nivel 0 (ninguna acción primaria distinguible en una pantalla cuyo propósito exija una decisión) no se sostiene: el enlace 465 tiene área 2.65 veces la del segundo y la pantalla es una portada sin tarea supuesta, por lo que pantalla_exige_decision queda indeterminada (null). No se redondea n1 ni se inventa una regla de combinación. Ap=0: g2_Ap_candidatos está vacío y se leyó el screenshot sin añadir apoyos fuera de los candidatos. Límite: capa de captura antigua sin atributos de estado y sin verificar (estado sin_verificar); no se supone ningún estado deshabilitado. |
| G2 | screenshot | 1 | 1 | agrupacion |
| G4 | screenshot | 1 | 1 | I |
| G7 | wireframe | 1 | 0 | W_min |
| G7 | screenshot | 1 | 0 | W_min |
