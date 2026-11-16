# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=11 cae en el intervalo del nivel 1 (9-12), pero el nivel 1 exige además agrupación débil y en el wireframe la agrupación es parcial: encabezado en tres franjas delimitadas, carrusel, fila de iconos, pestañas y tarjetas en contenedores visibles, con 69,4 % de los accionables agrupados y cinco grupos de un solo elemento. El nivel 2 exige n1 entre 6 y 8 y el nivel 0 exige n1>12 o ausencia de acción primaria en una pantalla que exige decisión; ninguna ancla cubre n1=11 con agrupación parcial y una acción primaria que existe pero no domina. Además el inventario es ambiguo (id 754), sanity_ok y consent_limpio son null y la captura muestra un banner de cookies sobre la parte inferior. |
| G3 | wireframe | 1 | 1 | X |
| G4 | screenshot | 1 | 0 | Bn |
| G5 | wireframe | 1 | 1 | J_inicio |
| G6 | wireframe | 1 | No se pudo puntuar | Entre lo determinable K=0, T=0 y R=0, pero K7 (pie) y K8 (ruta) quedan indeterminadas por no estar en el viewport, y el cumplimiento de K5 no se puede fijar. Una sola convención rota confirmada bajaría el nivel a 2, así que el nivel 3 no se sostiene; ninguna regla prioritaria (K>=2 o T>=1) está demostrada. Además varias cajas del inventario parecen anómalas y la captura incluye un banner de cookies sin verificar. |
| G7 | wireframe | 1 | 0 | W_min |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **No se pudo puntuar**.
Motivo: Entre lo determinable K=0, T=0 y R=0, pero K7 (pie) y K8 (ruta) quedan indeterminadas por no estar en el viewport, y el cumplimiento de K5 no se puede fijar. Una sola convención rota confirmada bajaría el nivel a 2, así que el nivel 3 no se sostiene; ninguna regla prioritaria (K>=2 o T>=1) está demostrada. Además varias cajas del inventario parecen anómalas y la captura incluye un banner de cookies sin verificar..

Convenciones evaluadas: 5 de 8. No aplicables confirmadas: 0. Indeterminadas: 3.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 834, 830 | El logo (IMG 834, alt 'Logo de Salud Total') está arriba a la izquierda (x=35, y=65) y su ancestro retenido 830 enlaza a '/'. El sitio tiene varias secciones en la navegación, no es de una sola página. |
| K2 | Cumple | 787, 794, 798 | Hay un formulario role=search (787) con campo 794 y botón 798 en la franja superior (y=40), a la derecha del centro (x=798 a 1076). |
| K3 | Cumple | 817, 821 | El screenshot muestra 'Oficina Virtual' (817) y 'Regístrate' (821, href .../autenticacion/Registrar), acceso a cuenta, en la esquina superior derecha (x=1234 a 1393, y=40). |
| K4 | Cumple | 841, 843 | La navegación principal (NAV 841) es horizontal en el encabezado (y=82), de INICIO a TRANSPARENCIA. No hay indicio de un flujo que la suprima. |
| K5 | No se pudo determinar | 794, 750 | El único campo de entrada es el buscador 794. En el screenshot no tiene etiqueta visible, solo el marcador 'Buscar...' y el ícono de lupa, así que no hay una etiqueta cuya posición juzgar. El candidato 750 es la etiqueta del interruptor de alto contraste ('ALTO CONTRASTE' a la izquierda del interruptor), que no está contado como campo. El snapshot no conserva asociaciones for/id. No se deduce una convención rota. |
| K6 | Cumple | 2774, 2777, 2780, 764, 772 | En el banner de cookies, 'Personalizar' (2774), 'Denegar' (2777) y 'Aceptar todo' (2780) ponen la acción afirmativa a la derecha. Los tres tienen el mismo estilo, así que la primaria se identifica por el texto y no por la forma. El par 764/772 (disminuir/aumentar letra) no es primaria/secundaria. El banner es un interstitial que quedó en la captura. |
| K7 | No se pudo determinar | 2762, 2768 | K7_pie está vacío y no se ve un pie en el viewport. Esa ausencia no demuestra que el sitio no tenga pie. Los enlaces de protección de datos 2762 y 2768 están en el banner de cookies, no en un pie. |
| K8 | No se pudo determinar |  | K8_ruta está vacío y bajo el encabezado sigue un carrusel. La pantalla parece una portada, pero no se puede confirmar ni deducir la jerarquía de secciones que haría aplicable la ruta. Una lista vacía no demuestra que la convención esté rota. |

Redundancias identificadas: 0.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

