# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G2 | wireframe | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación: n1=3 (<=5) cumple el umbral del nivel 3, pero el nivel 3 exige grupos coherentes y aquí la agrupación se juzga parcial (g2_fraccion_agrupada=0.542; el grupo de 11 mezcla la diapositiva-enlace, flechas, puntos, pausa y pestaña lateral). Los niveles 1 y 2 exigen n1 de 9-12 o 6-8 (no se cumple), o agrupación débil o acción primaria que no domina (no se juzgan así). El nivel 0 no aplica. No se inventa una regla para combinar n1 bajo con agrupación parcial. Además el inventario es ambiguo y sanity_ok/consent_limpio son null. |
| G2 | screenshot | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación: n1=3 (<=5) pero la agrupación es parcial (fracción agrupada 0,542; el grupo mayor reúne 11 opciones) y la acción primaria no domina, por lo que no cumple nivel 3 (exige grupos coherentes y acción primaria clara); el nivel 2 exige n1 entre 6 y 8 y el nivel 1 exige n1 entre 9 y 12, agrupación débil o competencia sin ninguna otra condición que encaje de forma literal. No se redondea n1 ni se inventa una regla para combinar. Además el inventario es ambiguo (g2_inventario_ambiguo=true) y sanity_ok/consent_limpio son null. |
| G4 | screenshot | 1 | 2 | P |
| G7 | wireframe | 1 | 0 | consistencia |
| G7 | screenshot | 1 | 0 | consistencia |
