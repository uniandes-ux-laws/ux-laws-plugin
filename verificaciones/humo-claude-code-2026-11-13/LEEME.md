# Prueba de humo en Claude Code, 13 de noviembre de 2026

**Es una prueba de humo de usabilidad, no un resultado de la tesis.** Una página, una
repetición por grupo, un modelo. No mide estabilidad, no se compara con expertos y no se
suma al corpus, a la calibración ni a la grilla. Informe: `docs/INFORME-RESUMEN-Y-HUMO-13NOV.md`.

## Qué se probó

Si una conversación de Claude Code (extensión de VS Code, Windows 11) puede llevar la
skill de punta a punta: preparar las solicitudes, evaluar cada grupo en un contexto nuevo,
cerrar con `recoger` y entregar `resumen.md`.

| | |
|---|---|
| Código | clon local de `c6a7f81` (antes de las correcciones `1d0a10d` y `2dd0b61`) |
| Página | `https://uniandes.edu.co/` (L01 del corpus; captura nueva, no la sellada) |
| Runtime | `claude-code-vscode` |
| Modelo | `claude-opus-5-5`, el que informó cada subagente |
| Parámetros | no expuestos por el runtime |
| Aislamiento | un subagente nuevo por solicitud (herramienta Agent, sin fork) |

## Carpetas

- `intento-1-banrep-bloqueada/`: banrep.gov.co sirvió una página de CAPTCHA. `preparar`
  se negó a seguir por `sanity_ok=false`. No se forzó.
- `intento-2-uniandes-limite-de-uso/`: captura de uniandes y libro preparado para
  `claude-fable-5-2`. Los siete subagentes recibieron el límite de uso de 5 horas y no
  escribieron respuestas. **La captura de esta carpeta es la que usa `corrida/`.**
- `corrida/`: intento 3, misma captura, libro con `claude-opus-5-5`. Siete respuestas,
  `perfil.json`, `perfil.md` y `resumen.md`, tal como los escribió `recoger`.
  `resumen-con-codigo-corregido.md` es el mismo perfil pasado después por
  `scripts/resumen-claro.js` con las dos correcciones que salieron de esta prueba.
- `registros/`: instalación, pruebas, orquestación, descubrimiento de la skill y un
  resumen de cada sesión de subagente.

## Lo que hay que saber al leerla

- **La captura tiene un banner de cookies** en la franja inferior: panel de y=689 a 900,
  dentro de un `div` fijo de pantalla completa con `role="dialog"` (nodo 3954 de
  `nodes.json`). El detector de capas 2026-11-04 no lo registró (`capas: []` antes y
  después) y la captura salió «sin alertas». G2 y G4 lo vieron en la imagen y marcaron
  evidencia insuficiente. Todos los grupos se evaluaron con el banner encima.
- **El contexto de los subagentes no estaba vacío.** Cada uno cargó el `CLAUDE.md` del
  repositorio, que resume resultados de pilotos sobre otras páginas, y las instrucciones
  de los servidores MCP del usuario. Se les pidió no usarlos. El libro dice
  `contexto_limpio: true` con ese límite escrito en `mecanismo_de_aislamiento`.
- **Ninguna respuesta se corrigió ni se repitió.**
- Las transcripciones completas de los subagentes y de las sesiones de descubrimiento
  con el entorno del usuario no se versionan: incluyen el prompt de sistema con datos
  personales (correo, servidores MCP). `registros/sesiones-subagentes.md` y
  `registros/descubrimiento/resumen-transcripciones.txt` resumen lo que hicieron. Sí se
  versionan completas las dos sesiones de descubrimiento con solo el plugin cargado.
