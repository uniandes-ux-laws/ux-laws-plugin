# Encargo para Claude Code (Sonnet): 18 páginas, 90 solicitudes, ciego

Decisión de David, 20 de noviembre de 2026. Eres el ingeniero que ejecuta la medición. Nadie contestará preguntas: decide, justifica y deja constancia escrita. Prioriza la exactitud. Un resultado negativo bien medido es un resultado. Responde en español.

## 1. Qué se ejecuta

Modo `comparacion`, **una repetición**, **18 páginas** en este orden fijo: H01, G01, L01, H02, G02, L02, H03, G03, L03, H04, G04, L04, H05, G05, L05, H06, G06, L06. Por página, **5 solicitudes**: G2 y G7 en wireframe y en screenshot, y G4 en screenshot (`--series g2-wireframe,g2-screenshot,g4-screenshot,g7-wireframe,g7-screenshot`). Total: **90**. G1, G3, G5 y G6 no se ejecutan.

Salida en `resultados/canales-claude-sonnet-2026-11-20/`. Runtime: Claude Code. Modelo: **Sonnet**; declara `RUNTIME`, `MODEL_ID` y `DECODING` con lo que el entorno informe y lo que el orquestador admita; si algo no es visible, escribe «no verificado». No cambies de modelo a mitad de corrida.

Las cinco páginas con `sanity_ok=false` (G01, G04, L01, L02, L03) se ejecutan con `--aceptar-sanidad-fallida`.

## 2. Lee esto (y solo esto) antes de empezar

1. `docs/ANALISIS-CANALES-SONNET-2026-11-20.md`: la regla de análisis. **Ya está commiteada** (commit `5192005`, rama `canales-codex`). Verifícalo con `git log --oneline -3`. No la cambies. Si hallas un defecto, decláralo como desviación fechada.
2. `docs/ANALISIS-CANALES-CODEX-2026-11-20.md` (la base de la regla) y `docs/PLAN-CANALES-CODEX-2026-11-20.md` (procedimiento por solicitud; **sus pasos aplican, cambiando «Codex» por «Claude Code» y `fork_turns=none` por «subagente nuevo, sin fork»**).
3. `skills/ux-audit/SKILL.md`, `shared/escala.md`, `docs/instalacion.md`, y el código y las pruebas de `scripts/orchestrate.js`, `scripts/paquetes-codex.js`, `scripts/analizar-representacion-codex.js`. Estos tres scripts y el selector `--series` los dejó una sesión de Codex en el árbol de trabajo, **sin commit**; reutilízalos y no los reescribas. Si algo no sirve con Claude Code, el cambio es mínimo, con prueba y declarado.

**No leas** `panel/`, `resultados/` (de ninguna corrida), `README.md`, `docs/ESTADO-DE-LA-ENTREGA.md`, `docs/CIERRE-PLUGIN-16NOV.md`, `docs/ANALISIS-PANEL-13NOV.md` ni el historial de Git de esos archivos: contienen resultados de comparaciones anteriores. Esta corrida es ciega.

## 3. Reglas que no se rompen

- **Nada inventado.** Ni cifra, ni modelo, ni ruta, ni opción de CLI que no hayas visto.
- **No toques lo sellado:** `skills/*/SKILL.md`, `shared/escala.md`, `protocolo.md`, `package.json` raíz, `hipotesis-m3.md`, `measure/`, `corpus/`, `.claude-plugin/plugin.json`, `historial/`, `pilotos/`, `preparacion/`, los documentos fechados y `captures/`. `npm run seal:verify` al empezar y al terminar.
- **No toques** `resultados/canales-codex-2026-11-20/` (es el piloto de Codex: cuatro páginas cerradas y una incompleta) ni `resultados/canales-claude-code-2026-11-16/`.
- **Un subagente nuevo por solicitud** (herramienta Agent, sin fork), con una carpeta exclusiva de entrada y el encargo: «lee solo tu carpeta de entrada; no abras `panel/`, `resultados/` ni el historial Git». No ve ninguna otra respuesta. Marca `contexto_limpio: true` y nombra el mecanismo real. Declara como límite que el subagente puede leer el repositorio y que su contexto incluye el `CLAUDE.md` neutro de esta corrida y las instrucciones MCP del usuario.
- **No corrijas ni repitas respuestas inválidas:** `recoger --conservar-invalidas`; se cuentan aparte.
- **Sin `git push`.** Commits locales en español, imperativo, uno por cambio lógico; añade `Co-Authored-By` con el nombre real del modelo que informe el entorno. **Haz `git add` solo de rutas explícitas:** nunca `-A`, y **nunca añadas `CLAUDE.md`** ni los archivos de la corrida de Codex. **No corras `git status` plano** (se cuelga): usa `git status --short -uno` con tiempo límite o `git diff --stat -- <ruta>`.
- **No edites la tesis.** Tu entrega es el informe y los datos.

## 4. Ceguera: el `CLAUDE.md` neutro

El `CLAUDE.md` del repositorio contiene cifras de la comparación con el panel y lo heredan los subagentes. David ya lo **sustituyó por una versión neutra de once líneas**; el original está respaldado en `C:\Users\d.hernandeza2\Downloads\_respaldo-ciego\CLAUDE.md.original-del-disco`. Abre **esta sesión nueva** con el neutro cargado.

- Antes de evaluar, un subagente nuevo debe responder que **no conoce** resultados de acuerdo entre el sistema y un panel humano. Si cita cifras, **detente** y reporta. Es la compuerta.
- Comprueba también que `~/.claude/CLAUDE.md` (si existe) y la memoria no traigan esas cifras; reporta lo que encuentres sin copiarlas.
- **Al terminar la última solicitud, restaura el original** (`copy` del respaldo sobre `CLAUDE.md`) y demuestra con el hash que coincide con el respaldo. No restaures antes.

## 5. Ejecución

1. `npm run seal:verify`; `npm run validate`; `node --test` (si el ejecutor falla con `spawn EPERM`, ejecuta cada archivo de prueba con `node` directamente). Reporta tal cual.
2. Prepara las 18 páginas con el selector de series y verifica con `orchestrate verificar` (cinco solicitudes y cero respuestas por página).
3. **Una página a la vez**, sus cinco subagentes en paralelo (máximo cinco simultáneos). Cierra cada página con `recoger --conservar-invalidas`, registra el aislamiento y commitea el avance.
4. **Mide la primera página cerrada** (minutos, solicitudes y tokens si el entorno los muestra) y escribe una estimación **marcada como estimación**. No cambies el diseño por ella.
5. **Si aparece el límite de uso:** cierra limpio lo cerrado, deja el estado reanudable, anota en `registros/` dónde quedó y espera a que se libere. No abrevies el aislamiento ni cambies de modelo para seguir.
6. **Corte:** el 21 de noviembre de 2026 a las 8:00 a. m., hora de Bogotá. Lo cerrado hasta entonces entra al análisis; lo demás se declara no ejecutado, con la lista de páginas.
7. Al terminar (o al llegar el corte): restaura `CLAUDE.md`; corre solo lo que no necesita el panel con `scripts/analizar-representacion-codex.js` (sobre esta corrida; si requiere un cambio mínimo para otra carpeta, declararlo); `npm run seal:verify`; demuestra con `git diff --stat` que ningún archivo sellado cambió.

## 6. Entregables

`resultados/canales-claude-sonnet-2026-11-20/` con las páginas, libros, respuestas, `registros/` (aislamiento, sonda de ceguera, cronología) e `INFORME.md`. Formato del informe: (1) lo primero que debo saber, en 3 a 6 líneas, con páginas cerradas de 18, modelo y runtime reales y la conclusión en lenguaje llano y sin adjetivos; (2) qué se corrió; (3) lo que dio el sistema, por grupo y canal (0–4, NA, abstención, inválida); (4) representación, según la regla; (5) límites; (6) lo que no se pudo hacer o verificar. **El acuerdo con el panel y la comparación de modelo con Opus las calcula otra sesión después; no las ejecutes.**

## 7. Si algo sale mal

Conserva el intento fallido en `registros/`; no «arregles» el orquestador para que pase. Si el resultado contradice lo esperado, repórtalo con el mismo peso. Cobertura parcial declarada es aceptable; presentada como completa, no.
