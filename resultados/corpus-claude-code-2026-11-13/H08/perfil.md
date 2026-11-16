# Resultado de la evaluación

Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.
Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.

Revisión: alcance-2026-11-05.

Aviso de captura: El detector actual no comprobó esta captura antes y después de guardar la pantalla. Revisar la imagen.

| Grupo | Canal | Repetición | Resultado | Motivo o condición |
|---|---|---:|---|---|
| G1 | wireframe | 1 | 0 | C1, C3, C4 |
| G2 | wireframe | 1 | No se pudo puntuar | g2_n1=10 cae en el intervalo del nivel 1 (9 a 12), pero el nivel 1 exige además agrupación débil y la agrupación observada es parcial: la barra superior, el encabezado (8 opciones) y la navegación principal (7) forman filas coherentes separadas por reglas, mientras la franja 'opciones a un clic' queda repartida en grupos de una opción y el enlace flotante 2010 se agrupa con 986. El nivel 2 exige n1 entre 6 y 8 y el nivel 3 n1<=5, así que ninguna ancla cubre n1=10 con agrupación parcial. El nivel 0 no aplica: n1 no supera 12 y existen acciones primarias distinguibles (408, 789), aunque no dominan. |
| G3 | wireframe | 1 | 2 | U |
| G4 | screenshot | 1 | 1 | I |
| G5 | wireframe | 1 | 1 | J_inicio |
| G6 | wireframe | 1 | 2 | R |
| G7 | wireframe | 1 | 0 | consistencia |

G1 conserva la advertencia de instrumento no interpretable en v1.

## G3 wireframe repetición 1

No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.
Esta comprobación no confirma que la región o las unidades elegidas sean correctas.

## G6 wireframe repetición 1

Resultado global: **2**.

Convenciones evaluadas: 4 de 8. No aplicables confirmadas: 2. Indeterminadas: 2.

| Criterio | Resultado | Evidencia por id | Razón |
|---|---|---|---|
| K1 | Cumple | 383, 379 | La imagen 383 (logo EPS SURA en el screenshot) está arriba a la izquierda (x=120,y=55) dentro del enlace retenido 379 con href '/'. Los demás candidatos de la ranura (234 icono de accesibilidad, 773 imagen del carrusel, 1041/1066/1089 imágenes de tarjetas) no son el logo. La página muestra varias secciones, no es un sitio de una sola página. |
| K2 | Cumple | 459 | El botón 459 con aria-label 'search' (lupa en el screenshot) está en el encabezado, arriba a la derecha (x=1278,y=53). |
| K3 | Cumple | 408 | El botón 408 'INICIAR SESIÓN' (acceso a la cuenta, leído en el screenshot) está en el encabezado, en la mitad derecha (x=1093..1253,y=56). No se observa carrito. |
| K4 | Cumple | 504, 508, 513, 519, 524, 529, 534, 539 | La navegación principal (Inicio, Afiliados, Empleadores, Independientes, Asesores comerciales, Prestadores de servicio, PAC) es una franja horizontal arriba (y=127), bajo el encabezado. |
| K5 | No aplica | 779 | No hay campos de entrada visibles (g6_campos_de_entrada=0, K5_campos vacío). El LABEL 779 envuelve el texto del carrusel ('Consulta las sedes habilitadas...'), no un campo de formulario. No hay formulario en la pantalla. |
| K6 | No aplica | 408, 459 | El único par candidato (408 'Iniciar sesión' y 459 búsqueda) no es un par de acciones primaria/secundaria sobre una misma tarea; son controles independientes del encabezado. No se observa otro par de botones de acción. |
| K7 | No se pudo determinar |  | El pie no aparece en el viewport (K7_pie vacío). Su ausencia en la captura no demuestra que el sitio carezca de pie, así que no se puede decidir aplicabilidad ni cumplimiento. Hay enlaces 'Ley de transparencia' (389) y 'Canales de contacto' (401) en el encabezado, lo que no prueba que falten en el pie. |
| K8 | No se pudo determinar |  | No hay candidato de ruta (K8_ruta vacío). La pantalla parece la portada (carrusel, enlace 'Inicio'), donde no se espera ruta, pero no se confirma la URL ni se deduce la jerarquía del sitio. Aplicabilidad indeterminada. |

Redundancias identificadas: 1.
Operaciones trasladadas identificadas: 0.

El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.

[Ver respuesta original](<resultados/g6-wireframe-r1.json>).

