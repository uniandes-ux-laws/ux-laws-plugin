# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G2 | wireframe | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación: n1=4 (<=5) pero la agrupación es parcial (un grupo de 20 de 25 accionables, n_max=20) y la acción primaria no domina (razón de áreas 1,17), por lo que no se cumple el nivel 3; el nivel 2 exige n1 entre 6 y 8; el nivel 1 exige n1 entre 9 y 12, agrupación débil o varias acciones compitiendo con agrupación no parcial; el nivel 0 exige n1>12 sin agrupación o ausencia de acción primaria en una pantalla que exija decisión (no se juzga que la exija). Además el inventario es ambiguo. |
| G2 | screenshot | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación observada: n1=4 (<=5) pero la agrupación se lee parcial y la acción primaria no domina (razón de áreas 1.17 entre los dos mayores enlaces de navegación, sin CTA dominante). El nivel 3 exige grupos coherentes y acción primaria clara; el nivel 2 está definido para n1 entre 6 y 8; los niveles 0 y 1 exigen n1>12 o ausencia de acción primaria en una pantalla que exige decisión, o n1 9-12, agrupación débil o acciones compitiendo, que no se confirman. Además el inventario es ambiguo (g2_inventario_ambiguo=true) y no se sustituyen las cifras. |
| G4 | screenshot | 1 | No se pudo puntuar | No se puede sostener un conjunto principal. La pantalla es una portada institucional cuyo contenido principal es un carrusel con un banner de marca (id 2031/2033) y un menú de navegación. Los candidatos de pares no sirven: LI#438 (menú) trae cajas incoherentes con la imagen (siete cajas desde x=0 con anchos acumulativos, no ítems contiguos), así que su equivalencia visual no se certifica; A#278 son iconos de redes sociales y el logo innovimanet (auxiliares, no objetivo de la sección); LI#2053 son miniaturas de carrusel y A#2036/SPAN#2064/SPAN#2059 son controles anterior/siguiente del carrusel (la rúbrica prohíbe elegirlos solo para poder puntuar); DIV#2030, SECTION#2029 (parcial, caja fuera del viewport) y DIV#245 agrupan franjas de distinta función, no pares. Sin conjunto principal I_principal es indefinido y ninguna ancla de la rúbrica cubre el caso. Sanity y consentimiento no verificados (null) y la revisión de captura es sin_verificar. |
| G7 | wireframe | 1 | 0 | consistencia |
| G7 | screenshot | 1 | 0 | consistencia |
