# Comparación de canales: regla de análisis

16 de noviembre de 2026. **Se escribe y se commitea antes de la primera solicitud de la
corrida de canales.** No se cambia después de ver un número. Si aparece un defecto, se
declara como desviación fechada en el informe de la corrida; esta regla no se reescribe.

Implementación: `scripts/comparar-canales.js`, con pruebas en `scripts/comparar-canales.test.js`.
El acuerdo con el panel usa `scripts/comparar-panel.js` con la opción `--canal`, añadida
para esto. Con el valor por defecto (`referencia`), su resultado es idéntico al del 16 nov.

## 0. Datos

| | |
|---|---|
| **C2**, esta corrida | `resultados/canales-claude-code-2026-11-16/`. Modo `comparacion`, una repetición, las 30 páginas. 13 solicitudes por página: G1, G2, G3, G5, G6 y G7 en wireframe y en screenshot, y G4 en screenshot. En total, 390. |
| **C1**, corrida anterior | `resultados/corpus-claude-code-2026-11-13/`. Modo `referencia`, una repetición. Seis grupos en wireframe y G4 en screenshot. |
| Panel | `panel/respuestas/panel-consolidado.csv`, 210 calificaciones, escala 1–4. Un evaluador por unidad. |
| Páginas marcadas | G01, G04, L01, L02 y L03 tienen `sanity_ok=false` aceptado por el equipo el 15 nov. |

Unidad: página × grupo × canal. Los **grupos de doble canal** son G1, G2, G3, G5, G6 y G7.
G4 tiene un solo canal.

**Lo que esta comparación aísla y lo que no.** Hay que leerlo antes de cualquier número:

- Los dos brazos reciben **las mismas medidas** del árbol de layout. Solo cambia la imagen
  principal (`docs/OPCIONES-EJECUCION-04NOV.md`).
- En G2, G3, G5 y G6, el brazo de wireframe **ya recibe el screenshot como apoyo textual**.
  En esos grupos, la diferencia entre brazos mide el cambio de la imagen principal con
  las mismas medidas. No mide wireframe sin screenshot frente a screenshot.
- G7 tiene las imágenes separadas, sin ese apoyo. G1 tampoco lo tiene, pero G1 es no
  interpretable en v1.
- Por eso el contraste que más se acerca al término de representación es el de **G7**.
- No se declara significancia ni causalidad. Todo es descripción con su incertidumbre.

## 1. Nivel del sistema en una unidad

Con una repetición, la unidad tiene nivel si la respuesta es un puntaje válido. Si no, la
unidad queda como NA, abstención o inválida, y **nunca cuenta como cero**. Es la función
`nivelSistema` de `comparar-panel.js`, que con una repetición se reduce a eso.

## 2. Comparación entre canales (C2, pareada, por grupo)

**Unidades comparables:** las páginas donde los dos brazos dieron nivel. Por grupo, y
agrupado con G1 y sin G1, se reporta:

| Estadístico | Definición |
|---|---|
| n | unidades pareadas |
| Diferencia media | promedio de (screenshot − wireframe) en la escala 0–4 del sistema |
| IC 95 % de la diferencia | bootstrap sobre páginas: 2.000 réplicas, semilla 20261113, percentiles en los índices ⌊0,025·(R−1)⌋ y ⌈0,975·(R−1)⌉, como `comparar-panel.js`. Una réplica sin unidades no entra, y se reporta cuántas entraron. |
| Distribución | cuántas unidades tienen diferencia −4 … +4 |
| Acuerdo exacto, ±1 | fracción de unidades |
| τ_b de Kendall | entre los dos brazos; nulo si un brazo es constante |
| κ_BP entre canales | Brennan–Prediger con pesos cuadráticos sobre k = 5 (escala 0–4): w = 1 − ((i−j)/4)², p_e = 0,75 (se calcula) |

**Aviso de coeficiente degenerado.** El término de azar del coeficiente es fijo. Si en
cualquiera de los dos brazos un mismo nivel cubre el 80 % o más de las unidades pareadas
del grupo, el κ_BP de ese grupo lleva la marca `nivel_casi_constante`. Con esa marca no se
interpreta, porque se mueve con la distancia y no con el acuerdo (tesis, capítulo 14,
sección del caso degenerado). El umbral del 80 % se fija aquí.

**Muestra pequeña.** Un grupo con menos de 10 unidades pareadas se reporta con la marca
`n_pequeno` y no se interpreta.

**Unidades no comparables, por grupo y dirección.** Se cuentan y se reportan como
hallazgo, no como hueco:

- el wireframe puntuó y el screenshot no: NA, abstención o inválida;
- el screenshot puntuó y el wireframe no: igual, por estado;
- ninguno de los dos puntuó.

## 3. Acuerdo con el panel por canal

Es la misma regla del 13 nov. (`docs/ANALISIS-PANEL-13NOV.md`), con el mismo script y las
mismas unidades del panel:

- escala común: el 0 y el 1 del sistema se leen como 1;
- κ_BP cuadrático con k = 4, p_e = 104/144;
- bootstrap sobre páginas, 2.000 réplicas, semilla 20261113;
- τ_b, acuerdo exacto y ±1.

Brazos de C2, sobre los grupos de doble canal:

- **(a)** sistema-wireframe frente al panel;
- **(b)** sistema-screenshot frente al panel. El panel calificó la página renderizada, así
  que (b) es la comparación sin cambio de representación.

Se reporta agrupado con G1 y sin G1, y por grupo. G4 se reporta aparte: tiene un solo
canal y su valor es igual en (a) y en (b). Por eso no entra en la diferencia.

**Diferencia (b) − (a).**

- **Principal:** sobre las **unidades comunes**, donde los dos brazos dieron nivel y el
  panel calificó. Δκ = κ_BP(b) − κ_BP(a) y Δ de la diferencia media (sistema − panel),
  con un bootstrap **pareado** sobre páginas: el mismo remuestreo sirve para los dos brazos.
- **Secundaria:** cada brazo sobre sus propias unidades, con su n, y Δκ con un bootstrap
  sobre páginas que calcula cada brazo con las unidades que tiene en la réplica.

**Contexto:** se incluye, sin recalcularla, la comparación de C1 con el panel (16 nov.).

## 4. Segunda medida (C1 frente a C2, n = 2 corridas)

Para cada grupo, se compara el brazo de C2 con la respuesta de C1 en el mismo canal:

- los seis grupos de doble canal, en wireframe;
- G4, en screenshot.

Se reporta:

| Estadístico | Definición |
|---|---|
| Fracción que repite nivel | sobre las unidades con nivel en las dos corridas |
| Rango máximo | máximo de \|nivel C2 − nivel C1\|, con la distribución de esa diferencia |
| Transiciones | tabla de estados de C1 × C2: puntaje, NA, abstención, inválida |
| Mismo prompt | cuántas unidades tienen igual `prompt_hash`, `entrada_sha256` y huellas de imagen en las dos corridas. Las que difieren se reportan aparte y no se mezclan con las demás. |
| Modelo | `model_id` de cada corrida |

Son **dos corridas**, no una estimación de dispersión con cinco repeticiones. Si el modelo
cambió entre corridas, la diferencia mezcla el ruido del modelo con el cambio de modelo, y
así se dice.

## 5. Sensibilidad

Todo lo anterior se reporta:

- **con las 30 páginas y sin las 5 marcadas;**
- **con G1 y sin G1.** G1 es no interpretable en v1.

## 6. Lo no puntuado

Se cuentan NA, abstenciones e inválidas por grupo y canal. El JSON guarda el motivo de cada
unidad. El informe resume, leyendo esos motivos, los más frecuentes por grupo, como
descripción.

## 7. Cómo se leerá cada resultado (fijado antes)

| Resultado | Se describe como |
|---|---|
| \|diferencia media\| < 0,5 niveles **y** el IC incluye 0 | «sin diferencia detectable en esta muestra». No como equivalencia. |
| IC que **excluye** 0 | «en esta muestra, el brazo de screenshot dio en promedio *x* niveles más (o menos) que el de wireframe». En G2, G3, G5 y G6 se añade: «con las mismas medidas y con screenshot de apoyo en ambos brazos». Sin atribuir causa. |
| \|diferencia media\| ≥ 0,5 **con** un IC que incluye 0 | «diferencia de *x* niveles con incertidumbre que incluye 0» |
| Δκ con IC que incluye 0 | «sin diferencia detectable de acuerdo con el panel entre brazos» |
| Δκ con IC que excluye 0 | se informa con su signo. Si el screenshot concuerda **menos** que el wireframe, se reporta con el mismo peso. |
| κ_BP con marca `nivel_casi_constante` | se informa el número, pero no se interpreta |
| Fracción que repite nivel entre C1 y C2 | «en dos corridas idénticas, *x* de *n* unidades repitieron nivel». No es estabilidad. |
| Grupo con marca `n_pequeno` | se reporta el n y no se interpreta |

No hay pruebas de hipótesis, valores p ni correcciones por comparaciones múltiples: no se
contrasta ninguna hipótesis.

## 8. Si la corrida no termina

Las páginas cerradas entran al análisis. Las que no, se listan como no ejecutadas. Ningún
número se presenta como si cubriera 30 páginas cuando no las cubre.
