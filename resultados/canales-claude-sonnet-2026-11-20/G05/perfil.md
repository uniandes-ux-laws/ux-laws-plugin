# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G2 | wireframe | 1 | 2 | n1 |
| G2 | screenshot | 1 | 2 | n1 |
| G4 | screenshot | 1 | No se pudo puntuar | Los conjuntos que representan el contenido principal (banner de portada y carrusel de Últimas Noticias) no certifican equivalencia o son parciales: DIV#1977 reúne imagen y columna de texto del mismo slide (no son pares), DIV#1944 reúne slides con cajas fuera del viewport (parcial=true) y DIV#1890 mezcla portada, filtro y carrusel. Los únicos conjuntos completos y de miembros equivalentes son la navegación superior (LI#469) y las flechas del carrusel (BUTTON#2272), que son controles auxiliares de otro alcance y no se pueden sustituir por el contenido principal solo para puntuar. Sin conjunto principal sostenible no hay I_principal y ninguna ancla cubre los juicios. |
| G7 | wireframe | 1 | 1 | W_min |
| G7 | screenshot | 1 | 1 | W_min |
