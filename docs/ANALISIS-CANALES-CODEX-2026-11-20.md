# Regla de análisis: canales con Codex

Esta regla se fija antes de evaluar cualquiera de las 30 páginas del estudio. Debe quedar en un commit local antes de la primera solicitud del estudio. Los resultados de la prueba de humo con una página de calibración no forman parte de la muestra. Una corrección posterior a la observación de resultados se registra como desviación fechada y no reescribe esta regla.

El análisis es descriptivo. No se presentan pruebas de significancia ni se atribuyen causas. Se usan G2 y G7 en ambos canales y G4 en screenshot; G1, G3, G5 y G6 quedan fuera. Se conserva una repetición por página, grupo, canal y runtime. La corrida con Codex no lee el panel ni ejecuta su comparación: otra sesión realizará las secciones diferidas con los mismos criterios aquí fijados.

## Unidad, estados y cobertura

Una unidad es página × grupo × canal × runtime. Su nivel es el entero 0–4 de una respuesta válida con puntaje. No aplica, abstención e inválida no tienen nivel y nunca se convierten en cero. Una respuesta inválida se conserva sin corrección ni segunda solicitud; sus motivos se registran. Las páginas sin cierre y las posiciones no ejecutadas se distinguen de las abstenciones y de las respuestas inválidas. Se informan los denominadores, los modelos y la cobertura real.

La cobertura completa prevista son 150 solicitudes: G2 y G7 en wireframe y screenshot, más G4 en screenshot, una vez en cada una de 30 páginas. G4 en wireframe no está previsto y no se cuenta como ausencia. Para representar la distribución se informa, por grupo y canal, la cantidad en cada nivel 0–4 y las cantidades de no aplica, abstención e inválida.

## Cálculo y bootstrap

Se remuestrean páginas completas con reemplazo, conservando juntas todas sus unidades y ambos lados de cada pareja. Cada intervalo es percentil del 95 %, con 2000 réplicas y semilla fija 20261113, usando el generador mulberry32 y la convención de extremos de `scripts/comparar-panel.js`. En cada réplica se calcula de nuevo la estadística; se descartan las réplicas en que no está definida y se informa cuántas fueron válidas. Para una celda con n < 5 se informa la estimación sin intervalo y se añade «n insuficiente». Si no hay al menos dos páginas o ninguna réplica válida, el intervalo también queda no definido con su motivo.

El acuerdo exacto es la proporción de pares con igual nivel; ±1 incluye los pares con diferencia absoluta de hasta un nivel. Se informa τ_b, con valor no definido si su denominador es cero. Para Brennan–Prediger cuadrático, `w(i,j) = 1 - ((i-j)/(k-1))²`, `p_o` es el promedio de esos pesos y `BP = (p_o-p_e)/(1-p_e)`. Se usa `k=5`, `p_e=0,75` en la escala del sistema y `k=4`, `p_e=104/144` en la escala del panel. Es un coeficiente con término de azar fijo; si una distribución se concentra en un nivel se informa esa concentración y su límite. Los niveles son ordinales: una diferencia media de niveles se presenta como resumen descriptivo, sin asumir distancias iguales entre niveles.

## Representación dentro de Codex

Para G2 y G7, por separado y en conjunto con remuestreo por página, se incluyen las páginas donde ambos canales tienen nivel. Para cada celda se informa n, media de `screenshot − wireframe` con intervalo, acuerdo exacto, ±1, τ_b y BP cuadrático con k=5. Se informa la distribución de diferencias de −4 a 4.

Por grupo y dirección se cuentan aparte las unidades en que un canal puntuó y el otro dio no aplica, abstención o inválida; también se informa cuando ninguno produjo nivel o falta una posición. En G2 el wireframe recibe el screenshot como apoyo para `Ap`: el contraste cambia la imagen principal y conserva ese apoyo. G7 en wireframe no recibe screenshot de apoyo. Ambos canales reciben las mismas medidas del grupo por página.

## Panel por canal: diferido a otra sesión

La sesión que ejecuta esta regla no abre el panel. La comparación posterior usa la correspondencia de unidades de la comparación anterior y lleva los niveles del sistema a la escala 1–4: 0 y 1 se leen como 1; 2, 3 y 4 conservan su valor. Se informan por grupo y canal n, diferencia media sistema − panel, acuerdo exacto, ±1, τ_b y BP con k=4. G4 se informa únicamente en screenshot.

Para G2 y G7, el contraste principal `(screenshot vs. panel) − (wireframe vs. panel)` usa exclusivamente triples con panel y ambos canales puntuados en la misma página. Se calcula por grupo y agrupado para la diferencia media, acuerdo exacto, ±1, τ_b y BP; los intervalos remuestrean las mismas páginas para ambos lados. Se informan también las comparaciones de cada canal sobre sus respectivas unidades disponibles, con sus n, sin sustituir el contraste pareado. Como el panel puntuó la página renderizada, screenshot y panel comparten esa representación.

## Implementación: diferido a otra sesión

Se emparejan por página y grupo las unidades de Claude Code y Codex de G2 y G7 en wireframe y G4 en screenshot, con máximo previsto de 90 unidades. Para cada grupo y en conjunto se informa n, media `Codex − Claude` con intervalo, exacto, ±1, τ_b y BP con k=5. Se registran las diferencias de huellas o entradas observadas como posibles diferencias adicionales de implementación; no se inventan valores ausentes.

El acuerdo con el panel de cada runtime y la diferencia de sus métricas se calcula sobre las mismas unidades con nivel válido en ambos runtimes y en el panel, remuestreando páginas de forma pareada. Se informa por grupo y en conjunto, además de los n disponibles por separado. La comparación mezcla runtime, modelo y decodificación. Una repetición por runtime no permite estimar el ruido entre corridas, que también puede contribuir a la diferencia.

## Sensibilidad y lectura

Todas las tablas y contrastes se repiten con las páginas disponibles y excluyendo G01, G04, L01, L02 y L03. Se presentan las transiciones de estado, los motivos de no aplica, abstención e inválida por grupo, canal y runtime, y las ausencias por interrupción. La sesión Codex solo calcula las secciones que no necesitan datos del panel ni resultados de Claude Code.

Se describen estimaciones, denominadores e intervalos sin calificativos de magnitud o calidad. Un intervalo que incluye cero se describe como compatible con cero en esta muestra; no demuestra equivalencia. Un intervalo que no incluye cero se informa por sus extremos y no se presenta como prueba causal ni como resultado significativo. τ_b no definido y celdas sin pares se declaran como tales. Una repetición no ofrece una medida de dispersión. Cada unidad del panel tiene un evaluador y el evaluador está confundido con el estrato: E1/E2 salud, E3/E4 gobierno y E5/E6 libre.
