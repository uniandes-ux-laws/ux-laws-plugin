# Regla de análisis: canales con Claude Code y Sonnet

Esta regla se fija antes de evaluar cualquier página de esta corrida. Debe estar en un commit local antes de la primera solicitud. Una corrección posterior a la observación de resultados se registra como desviación fechada y no reescribe esta regla.

## Base y diferencias

Se aplican sin cambios las secciones de `docs/ANALISIS-CANALES-CODEX-2026-11-20.md` (commit b2d730a): unidad, estados y cobertura; cálculo y bootstrap; representación; panel por canal, diferido a otra sesión; sensibilidad y lectura. Solo cambia lo siguiente.

**Muestra.** Dieciocho páginas: las seis primeras de cada estrato en el orden fijo H01, G01, L01, H02, G02, L02, H03, G03, L03, H04, G04, L04, H05, G05, L05, H06, G06, L06. La selección sigue ese orden y no depende de ningún resultado; el motivo es el límite de uso disponible. Cobertura prevista: 5 solicitudes por página (G2 y G7 en wireframe y screenshot, G4 en screenshot), 90 en total.

**Runtime y modelo.** Claude Code con Sonnet. El identificador real lo informa el entorno al ejecutar; si no es visible se escribe «no verificado». Si el modelo cambia durante la corrida, cada solicitud conserva el suyo y el informe separa las páginas por modelo.

**Sanidad marcada.** De las dieciocho páginas, cinco tienen `sanity_ok=false` (G01, G04, L01, L02, L03) y se ejecutan con `--aceptar-sanidad-fallida`. Todo se repite sin esas cinco (13 páginas).

**Implementación, sustituida por modelo.** Se emparejan por página y grupo las unidades de Sonnet con las de la corrida del 13 de noviembre (`claude-opus-5-5`, mismo runtime) en G2 y G7 sobre wireframe y G4 sobre screenshot: máximo 54 unidades. Se informa n, media `Sonnet − Opus` con intervalo, exacto, ±1, τ_b y BP con k=5, por grupo y en conjunto. Compara **modelos dentro de un mismo runtime**, no runtimes; mezcla modelo y ruido entre corridas, y con una repetición por corrida el ruido no se puede estimar.

**Piloto de Codex.** Las páginas que Codex (`gpt-6.1-terra`) alcanzó a cerrar en `resultados/canales-codex-2026-11-20/` se describen aparte, sin agruparlas con las de Sonnet. Solo en esas páginas existe una comparación entre runtimes (máximo 12 unidades); con n < 5 por celda se informa sin intervalo y como «n insuficiente». La página que Codex dejó incompleta no entra al análisis.

**Lo que no cambia.** El análisis es descriptivo, sin pruebas de significancia ni causas. Una repetición, un runtime y un evaluador del panel por unidad, confundido con el estrato. La sesión que ejecuta esta corrida no abre el panel: el acuerdo con el panel lo calcula otra sesión con los mismos criterios.
