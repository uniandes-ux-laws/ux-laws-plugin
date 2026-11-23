# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G2 | wireframe | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación: n1=15 supera el rango de los niveles 1 (9 a 12), 2 (6 a 8) y 3 (n1<=5), y el nivel 0 exige n1>12 SIN agrupación, pero g2_fraccion_agrupada=0.8 y el wireframe muestra agrupación al menos parcial (barra de navegación con 10 opciones en un grupo, tres columnas de titulares). Tampoco se confirma ausencia de acción primaria: la dominancia no se determina con suficiencia (razón de áreas 1.58; el mayor área, id 3255, tiene ink de 1070x559 que parece un contenedor y no un control independiente). No se redondea n1 ni se inventa una regla de combinación. |
| G2 | screenshot | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación: n1=15 (>12) pero la agrupación no es ausente (g2_fraccion_agrupada=0.8; barra de temas/navegación de 10 enlaces y grupo de 6 controles de la franja de suscriptores), por lo que no se cumple el nivel 0 ('n1 > 12 sin agrupación'); el nivel 1 exige n1 entre 9 y 12 o agrupación débil, y la agrupación se lee como parcial, no débil; el nivel 2 exige n1 entre 6 y 8; los niveles 3 y 4 exigen n1 <= 5. Tampoco hay un juicio de 'ninguna acción primaria distinguible': el botón Suscríbete destaca por color pero no domina frente a titulares y anuncios. No se redondea n1 ni se inventa una regla de combinación. |
| G4 | screenshot | 1 | No se pudo puntuar | No hay un conjunto principal sostenible. La pantalla es una portada de noticias y su contenido principal (titulares y tarjetas de la fila superior) no tiene un conjunto candidato fiable: DIV#1631 es parcial y mezcla contenedores de distinto papel; LI#351 y DIV#raiz (raíz virtual, parcial) tienen cajas que no corresponden a pares visuales equivalentes. El único conjunto completo y plausiblemente equivalente es DIV#402 (Suscríbete / Iniciar sesión), pero son controles auxiliares de la cabecera y la rúbrica prohíbe sustituir el contenido principal por controles auxiliares para poder puntuar. Sin main_set_id ninguna ancla cubre los juicios. |
| G7 | wireframe | 1 | 1 | W_min |
| G7 | screenshot | 1 | 1 | W_min |
