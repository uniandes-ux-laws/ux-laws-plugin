# Prueba pequeña de la versión 0.2.1 en Codex

5 de noviembre de 2026. Guardada localmente para revisión de Juan.

El recorrido completo funcionó en esta prueba: se instaló el ZIP, se capturó una página,
se prepararon los siete grupos, se recibieron siete respuestas reales y se generó
el [perfil final](corrida/perfil.json). No hubo errores de ejecución ni respuestas inválidas.

Usamos la página de ejemplo `portal.html` incluida en el paquete, una repetición por grupo
y el modo de referencia. El modelo solicitado fue `gpt-6.1-sol`, con esfuerzo bajo,
desde Codex CLI `0.164.0-alpha.11.1`. Cada evaluación tuvo una sesión nueva.

| Grupo | Resultado guardado |
|---|---|
| G1 | 2, con la advertencia de que el instrumento todavía no distingue suficientemente entre páginas. |
| G2 | 3. |
| G3 | Sin puntaje: la combinación observada no tiene una regla que le asigne nivel. |
| G4 | 1. |
| G5 | 0. |
| G6 | Sin puntaje: no se pudieron resolver varias convenciones con la evidencia disponible. |
| G7 | 0. |

G3 y G6 entregaron abstenciones válidas. El cierre las conservó como tales, separadas de
los ceros de G5 y G7. Estos resultados describen lo que respondió el modelo; no son
calificaciones confirmadas por expertos.

## Qué comprobamos

- El paquete instalado coincide con sus 90 archivos registrados y conserva la dependencia corregida, `fast-uri 3.1.9`.
- La captura y el wireframe se generaron. La revisión automática no encontró alertas y las imágenes se revisaron visualmente.
- Las siete respuestas cumplieron los formatos y reglas de comprobación del paquete.
- Las respuestas guardadas coinciden con los mensajes originales de las siete sesiones. No hubo reintentos ni correcciones de respuestas.
- El perfil final conserva las advertencias y no presenta una sola repetición como prueba de estabilidad.
- Los 5.159 archivos históricos y los diez sellos revisados siguen sin cambios.

## Hasta dónde llega esta prueba

Es una comprobación funcional sobre una sola pantalla de ejemplo. No comprueba que los
puntajes sean correctos en cualquier página. Tampoco prueba Claude, la comparación entre
captura y wireframe, ni la activación automática de la skill al pedirla dentro de un chat.
Las siete llamadas se ejecutaron desde la terminal con los prompts, imágenes y formatos
generados por el paquete. La pantalla no contiene imágenes, así que aquí no se comprobó
su reemplazo por una X.

G1 mantiene su limitación. Siguen pendientes la revisión experta y los demás escenarios
que no cubre esta prueba pequeña.

## Archivos para revisar

- [Comprobación resumida](COMPROBACION.json), [registro previo](REGISTRO-PREVIO.json) y [salida del cierre](CIERRE.log).
- [Respuestas originales](corrida/resultados/) y [registros de las sesiones](trazas/).
- [Captura](captura/screenshot.png) y [wireframe](captura/wireframe.png).
- [Consultas de uso](USO.json). No se usaron reinicios gratuitos ni se compraron créditos.
- `SHA256SUMS` permite comprobar que estos archivos no cambiaron: desde esta carpeta, ejecutar `shasum -a 256 -c SHA256SUMS`.

Para esta comprobación solo se agregó un ejecutor pequeño, esta carpeta de evidencia y
una nota de estado en `CLAUDE.md`. El código del paquete y los pilotos anteriores se
conservaron. No se hizo commit ni se subió nada a GitHub.
