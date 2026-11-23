# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: capa sin cerrar sobre el 100% del viewport

Aviso de captura: El control de sanidad marcó esta captura.

Aviso de captura: Los nodos guardados incluyen un posible diálogo visible (3015). Confirmar en la imagen si tapa contenido.

Aviso de captura: Queda una capa o un aviso sin resolver. No presentar la página como despejada.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G2 | wireframe | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación: n1=6 con agrupación parcial corresponde al nivel 2, pero este exige una acción primaria que no domina; aquí el nodo 3022 (área 245224, razón 2,72 sobre el siguiente) domina de forma visible, lo que se acerca al nivel 3, que exige n1<=5 y grupos coherentes. No se redondea n1. Además el inventario es ambiguo, sanity_ok y consent_limpio son false y hay un posible diálogo (3015) sin resolver. |
| G2 | screenshot | 1 | No se pudo puntuar | Ninguna ancla cubre la combinación: g2_n1=6 queda fuera del nivel 3 (n1<=5) y cae en el rango del nivel 2 (6 a 8) con agrupación parcial, pero el nivel 2 exige una acción primaria que no domina, y en el screenshot el modal del anuncio (id 3022, razón de área 2,72 frente al siguiente) domina claramente. Además el inventario es ambiguo (g2_inventario_ambiguo=true), sanity_ok y consent_limpio son false y hay una capa sin resolver que tapa parte de la página. No se inventa un nivel. |
| G4 | screenshot | 1 | No se pudo puntuar | Un diálogo modal (aprox. x504-936, y135-765 en el screenshot; nodo 3015) tapa la parte central del contenido principal de la página. El único conjunto de contenido principal completo (g4:DIV#259, tres banners promocionales de la fila) tiene el miembro central (263) ocluido: su color medio azul corresponde al diálogo y no a la tarjeta, por lo que no se puede certificar equivalencia visual ni contar I. Los demás conjuntos son navegación o controles auxiliares de la cabecera, o son parciales (DIV#214, DIV#411); no se sustituye el contenido principal por navegación. Sin conjunto principal sostenible no hay combinación Bn/I/P/Cn cubierta por las anclas. sanity_ok=false y consent_limpio=false. |
| G7 | wireframe | 1 | 0 | consistencia |
| G7 | screenshot | 1 | 0 | consistencia |
