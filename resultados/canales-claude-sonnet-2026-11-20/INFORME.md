# Informe: canales con Claude Code y Sonnet, 18 páginas

Escrito el 23 de noviembre de 2026. Ejecutado por una sesión de Claude Code (modelo `claude-sonnet-5-5`, según el entorno). La regla de análisis es `docs/ANALISIS-CANALES-SONNET-2026-11-20.md` (commit `5192005`), sin cambios. Esta corrida es ciega al panel: no se calculó acuerdo con el panel ni comparación con Opus.

## 1. Lo primero que debo saber

- Se cerraron **18 de 18 páginas** con el modelo `claude-sonnet-5-5` en Claude Code. Hubo 91 solicitudes: las 90 previstas y una reejecución por un archivo perdido. De las 90 posiciones, 85 tienen respuesta leída y 5 quedaron como inválidas por JSON ilegible.
- Solo 5 páginas (H01, G01, L01, H02, G02) se cerraron antes del corte original (21 de noviembre, 8:00 a. m., Bogotá). El resto se ejecutó el 20 y el 23 de noviembre. David indicó terminar la muestra sin importar las fechas, y queda como desviación fechada.
- G7 dio nivel 0 en 26 de las 33 respuestas con nivel y nivel 1 en las otras 7. Ninguna G7 llegó a 2, 3 ni 4. G4 se abstuvo en 8 de 18 páginas. G2 usó los niveles 1, 2 y 3.
- En las páginas donde ambos canales dieron nivel, wireframe y screenshot coinciden en 25 de 26 pares (G2: 10 de 11; G7: 15 de 15). La única diferencia es L02/G2: wireframe 2, screenshot 1. Los niveles están concentrados (G7: 80 % de los pares en un solo nivel), así que esa coincidencia tiene poco poder para distinguir canales.
- Cinco respuestas son inválidas por una llave de cierre de más en el JSON. Se conservaron sin corregir. Para contarlas como inválidas fue necesario un cambio mínimo en el orquestador, declarado abajo.

## 2. Qué se corrió

- **Diseño.** Modo comparación, una repetición, 18 páginas en el orden H01, G01, L01, H02, G02, L02, H03, G03, L03, H04, G04, L04, H05, G05, L05, H06, G06, L06. Por página, 5 solicitudes: G2 y G7 en wireframe y screenshot, y G4 en screenshot. Cinco páginas con `sanity_ok=false` (G01, G04, L01, L02, L03) con `--aceptar-sanidad-fallida`.
- **Runtime y modelo.** `RUNTIME=Claude Code`, `MODEL_ID=claude-sonnet-5-5`, `DECODING={"declarado":"no expuesto por el runtime"}`. El modelo viene del entorno de esta sesión. Los subagentes informaron el mismo identificador (no se pudo verificar de otra forma); un subagente (G01/G4) no entregó un reporte útil, así que para esa solicitud el modelo solo consta por el `run` copiado de `solicitud.json`. No cambió el modelo durante la corrida.
- **Aislamiento.** Un subagente nuevo por solicitud (herramienta Agent, tipo general-purpose, sin fork), con una carpeta de entrada exclusiva (`pruebas-claude-sonnet-2026-11-20/entradas/<página>/<solicitud>/`, con copias verificadas por huella de solicitud, prompt, entrada, esquema, imágenes y skill). Encargo: «lee solo tu carpeta de entrada; no abras `panel/`, `resultados/` ni el historial Git». Cada respuesta se copió sin modificar a la ruta del libro. En el libro: `contexto_limpio: true` y mecanismo «Subagente nuevo (herramienta Agent, sin fork, tipo general-purpose), una solicitud por subagente, sin transcripción previa ni otras respuestas; carpeta de entrada exclusiva; encargo de leer solo esa carpeta (sin barrera del sistema de archivos)». Los cinco subagentes de una página corrieron en paralelo.
- **Ceguera.** Antes de evaluar se verificó que `CLAUDE.md` fuera la versión neutra (11 líneas) y se lanzó una sonda: un subagente nuevo respondió que no conoce resultados de acuerdo entre el sistema y el panel, y que ve 0 cifras (`registros/sonda-de-ceguera.md`). `~/.claude/CLAUDE.md` no existe. Dos archivos de la memoria del usuario contienen líneas con decimales o porcentajes (revisadas solo por conteo, sin copiarlas ni leerlas; no se determinó qué cifras son). La sonda no las vio. El `CLAUDE.md` original se restauró al terminar: SHA-256 `b11101596d1244a4e5fe4def356b27ca2108a1ae0460775e1667a6aa71384f21`, igual al respaldo (700 líneas, `cmp` sin diferencias).
- **Medición de la primera página (H01).** 5 solicitudes, 433.243 tokens visibles en las notificaciones de los subagentes, y 1,43 minutos entre el inicio de la página y el cierre registrado. **Estimación, no verificada:** con ese ritmo, 18 páginas habrían ocupado unos 26 minutos y 7,8 millones de tokens. Los datos reales: 8.115.793 tokens visibles en total en los subagentes de las 18 páginas (sin contar los 71.485 de la solicitud reejecutada que se perdió, ni los 43.506 de la sonda). Las páginas sin pausas tardaron entre 1,4 y 26,9 minutos desde el inicio hasta el cierre; H03 y L02 muestran 4.460 y 4.510 minutos porque se cerraron tras una pausa de tres días. No apareció ningún límite de uso. Esos tiempos incluyen mis esperas, no son el tiempo de cómputo de los subagentes.
- **Cierre por página.** `paquetes-codex.js registrar` + `orchestrate verificar` + `recoger --conservar-invalidas` + `registrar-cierre-codex.js`, un commit por página. Los registros están en `registros/` (`aislamiento.jsonl`, `cronologia.jsonl`, `incidentes.md`, `recoger-*.log`, `preparar-*.log`).
- **Código (commits locales).** Se incorporaron sin reescribir los scripts que dejó Codex sin commit (`orchestrate.js` con `--series`, `paquetes-codex.js`, `registrar-cierre-codex.js`, `analizar-representacion-codex.js` y sus pruebas). Cambios míos: `--mecanismo` en `paquetes-codex.js`, carpeta de corrida opcional en `registrar-cierre-codex.js`, y en `orchestrate.js` (`recoger --conservar-invalidas`) un JSON ilegible se cuenta como inválida (prueba nueva `scripts/orchestrate-ilegible.test.js`).

## 3. Lo que dio el sistema, por grupo y canal

Cantidad de páginas en cada nivel 0–4 y en cada estado sin nivel. Nunca se convirtió un estado sin nivel en cero. «NA» es no aplica: no hubo ninguno.

**Las 18 páginas** (denominador 18 por celda)

| Grupo / canal | 0 | 1 | 2 | 3 | 4 | NA | Abstención | Inválida |
|---|---|---|---|---|---|---|---|---|
| G2 wireframe | 0 | 4 | 5 | 2 | 0 | 0 | 5 | 2 |
| G2 screenshot | 0 | 7 | 5 | 2 | 0 | 0 | 4 | 0 |
| G4 screenshot | 0 | 8 | 1 | 1 | 0 | 0 | 8 | 0 |
| G7 wireframe | 13 | 4 | 0 | 0 | 0 | 0 | 0 | 1 |
| G7 screenshot | 13 | 3 | 0 | 0 | 0 | 0 | 0 | 2 |

**Sin G01, G04, L01, L02 y L03** (13 páginas por celda)

| Grupo / canal | 0 | 1 | 2 | 3 | 4 | NA | Abstención | Inválida |
|---|---|---|---|---|---|---|---|---|
| G2 wireframe | 0 | 3 | 3 | 2 | 0 | 0 | 4 | 1 |
| G2 screenshot | 0 | 5 | 3 | 2 | 0 | 0 | 3 | 0 |
| G4 screenshot | 0 | 5 | 1 | 1 | 0 | 0 | 6 | 0 |
| G7 wireframe | 9 | 3 | 0 | 0 | 0 | 0 | 0 | 1 |
| G7 screenshot | 9 | 3 | 0 | 0 | 0 | 0 | 0 | 1 |

- **Abstenciones.** Los motivos que registraron los subagentes: en G2, una combinación de medidas que ninguna ancla de la rúbrica cubre (por ejemplo n1 fuera de los rangos 1–3 o n1 bajo con agrupación parcial); en G4, la ausencia de un conjunto principal completo y equivalente (conjuntos parciales, cajas anidadas, oclusión por un modal o por el borde del viewport). El detalle por página está en `analisis-representacion.json` (`motivos`) y en cada `resumen.md`.
- **Inválidas (5).** L02 `g7-screenshot`, G04 `g2-wireframe`, H06 `g2-wireframe`, H06 `g7-wireframe`, G06 `g7-screenshot`. En todas el archivo termina en `}}}` y `JSON.parse` falla («Unexpected non-whitespace character after JSON»). Se conservaron sin corregir ni repetir; el motivo está en `perfil.json` de cada página.
- **Evidencia insuficiente.** Muchas respuestas con nivel llevan `evidence_insufficient=true` (inventario ambiguo, captura sin verificar, capas o modales sin resolver). Se conserva el nivel y no se cuentan como abstención.

## 4. Representación (regla del 20 de noviembre, solo páginas con nivel en ambos canales)

Estadísticos de `screenshot − wireframe`; intervalo percentil del 95 % con página como unidad de remuestreo, 2000 réplicas, semilla 20261113 (`analisis-representacion.json`).

**Las 18 páginas**

| Celda | n | Diferencia media | IC 95 % | Exacto | ±1 | τ_b | BP (k=5) | Diferencias |
|---|---|---|---|---|---|---|---|---|
| G2 | 11 | −0,0909 | [−0,2727; 0] | 0,9091 | 1 | 0,8947 | 0,9773 | 0 en 10, −1 en 1 |
| G7 | 15 | 0 | [0; 0] | 1 | 1 | 1 | 1 | 0 en 15 |
| G2 y G7 | 26 | −0,0385 | [−0,1304; 0] | 0,9615 | 1 | 0,9756 | 0,9904 | 0 en 25, −1 en 1 |

**Sin las 5 páginas marcadas**

| Celda | n | Diferencia media | IC 95 % | Exacto | ±1 | τ_b | BP (k=5) |
|---|---|---|---|---|---|---|---|
| G2 | 8 | 0 | [0; 0] | 1 | 1 | 1 | 1 |
| G7 | 11 | 0 | [0; 0] | 1 | 1 | 1 | 1 |
| G2 y G7 | 19 | 0 | [0; 0] | 1 | 1 | 1 | 1 |

- **Lectura.** Los intervalos incluyen el cero (como extremo) en esta muestra; los intervalos con un solo valor posible ([0; 0]) reflejan que no hubo pares distintos al remuestrear, no una medida de dispersión. Una diferencia de nivel entre canales apareció en 1 de 26 pares (L02, G2: wireframe 2, screenshot 1). Una repetición no permite estimar el ruido entre corridas.
- **Concentración.** En G7 el nivel más frecuente reúne 0,8 de los pares con nivel (0,7273 sin las marcadas); en G2, 0,4545 (0,375). Con tantos pares en el mismo nivel, el exacto, τ_b y BP tienen poco contenido: BP usa un término de azar fijo (p_e = 0,75) y no se ajusta a esa concentración.
- **Pares sin nivel en ambos lados (las 18 páginas).** G2: screenshot con nivel y wireframe sin él, 3 veces (1 abstención, 2 inválidas); sin nivel en ninguno, 4 veces (abstención en ambos). G7: wireframe con nivel y screenshot inválida, 2 veces; screenshot con nivel y wireframe inválida, 1 vez. G2 wireframe recibe el screenshot como apoyo solo para `Ap`; G7 wireframe no lo recibe.

## 5. Límites

- Una repetición por página, grupo y canal; un solo runtime; sin estimación del ruido entre corridas. Los números son descriptivos, sin pruebas de significancia ni causas.
- **El subagente puede leer todo el repositorio**: la restricción a su carpeta es un encargo, no una barrera del sistema de archivos. Su contexto incluye el `CLAUDE.md` neutro de la corrida y las instrucciones MCP del usuario. Un subagente informó haber leído el prompt desde una copia guardada de un `cat` de su propia carpeta; ninguno reportó haber abierto `panel/` ni `resultados/`. Yo no abrí `panel/` ni `resultados/` de ninguna otra corrida; solo listé los nombres de carpetas de `resultados/`.
- **Escritura de las respuestas por los propios subagentes.** Ningún subagente validó su archivo contra el esquema con un validador; `recoger` sí lo valida. Varias respuestas, sobre todo hasta L03, se escribieron con scripts propios de los subagentes en la carpeta temporal compartida, y algunas con ediciones intermedias (ver `aislamiento.jsonl` y `incidentes.md`); no se contó cuántas. Desde la reejecución de L03 se les pidió escribir con Write directamente y sin scripts en la carpeta temporal compartida. Ese cambio de encargo (no del prompt ni de la rúbrica) se aplicó a partir de la reejecución de L03/G2 screenshot y de H04; las páginas anteriores usaron el encargo original.
- **Incidente de L03 (carpeta temporal compartida).** El subagente de L03 `g7-screenshot` ejecutó un `mk.js` ajeno, que sobrescribió `L03/g2-screenshot-r1/respuesta.json` con contenido de otra posición. La respuesta original (que su subagente describió como nivel 2) se perdió y no se reconstruyó. Esa única posición se reejecutó con un subagente nuevo y se usa la reejecución (abstención), sea cual fuera su resultado. Detalle en `registros/incidentes.md` y evidencia en `registros/L03-incidente/`. La comprobación de integridad (grupo y canal por posición, y medidas copiadas frente a `entrada.json`) cubrió las 90 respuestas finales; no detecta un contenido propio de la misma posición pero de otra página con medidas idénticas.
- **Corte ampliado.** El corte fijado (21 nov., 8:00 a. m., Bogotá) pasó con 5 páginas cerradas. H03 y L02 tenían sus cinco respuestas del 20 de nov., pero se cerraron el 23. G03, L03, H04, G04, L04, H05, G05, L05, H06, G06 y L06 se ejecutaron el 23 de nov. Sobre la base de la instrucción de David de terminar sin importar las fechas.
- **JSON ilegible.** El cambio en `orchestrate.js` se hizo tras observar el problema en dos páginas y antes de calcular ningún análisis; yo ya había visto los reportes de los subagentes, pero el cambio no depende del contenido de las respuestas y no cambia ninguna. Sin ese cambio, cinco respuestas (y las páginas L02, G04, H06 y G06) no habrían cerrado.
- **Pruebas.** `node --test` al empezar: 340 pruebas, 289 pasan, 51 fallan. Al terminar: 341 pruebas, 290 pasan, 51 fallan. Son las mismas 51 del inicio, causadas por rutas temporales fuera del repositorio en este entorno (por ejemplo `orchestrate-series.test.js`); no las modifiqué. Pasan las pruebas de los scripts que usé y la nueva.
- G1, G3, G5 y G6 no se ejecutaron (fuera del diseño).

## 6. Lo que no se pudo hacer o verificar

- Acuerdo con el panel y comparación con la corrida de Opus del 13 de noviembre: las calcula otra sesión; no se ejecutaron ni se abrió `panel/`.
- Comparación con el piloto de Codex (`resultados/canales-codex-2026-11-20/`): no se abrió ni se tocó.
- Parámetros de decodificación: no los expone el runtime.
- Modelo de cada subagente: solo por declaración de cada uno, sin forma de verificarlo desde fuera. Para la solicitud G01/G4 no hay declaración.
- Tokens: solo los que muestran las notificaciones de los subagentes (`tokens_visibles` en `aislamiento.jsonl`); no hay un total del entorno.
- `git status` plano no se ejecutó; el archivo `docs/PLAN-CANALES-CODEX-2026-11-20.md` ya figuraba modificado (sin commit) cuando empezó la sesión y no lo edité. `CLAUDE.md` del disco difiere del commit del repositorio desde antes de empezar; este informe no lo cambia. Ningún archivo sellado cambió: `npm run seal:verify` verificó 30 páginas y 120 archivos (hash `f9c0caaa…3437`) al empezar y al terminar, y `git diff --stat` contra el commit `5192005` sobre `skills`, `shared`, `protocolo.md`, `package.json`, `hipotesis-m3.md`, `measure`, `corpus`, `.claude-plugin`, `historial`, `pilotos`, `preparacion`, `captures` y los documentos de análisis no muestra cambios, salvo esa modificación previa del plan de Codex.
