# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1, C3, C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=9 cae en el intervalo del nivel 1 (9 a 12), pero el nivel 1 exige además agrupación débil y en el wireframe la agrupación es parcial: la barra superior forma un grupo coherente de 7, las dos tarjetas comparten fila y la franja inferior está separada, con g2_fraccion_agrupada=0.522. La combinación observada (agrupación parcial, una acción primaria candidata que no domina) corresponde a la descripción del nivel 2, pero ese nivel exige n1 entre 6 y 8. Ninguna ancla cubre n1=9 con agrupación parcial; no se redondea n1 ni se combina por regla propia. |
| G3 | wireframe | 1 | 1 | X |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 3 | J_inicio |
| G6 | wireframe | 1 | Respuesta inválida, conservada sin corregir | g6-wireframe-r1 [g6]: no valida contra el esquema — /findings/1 must NOT have additional properties |
| G7 | wireframe | 1 | 1 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

