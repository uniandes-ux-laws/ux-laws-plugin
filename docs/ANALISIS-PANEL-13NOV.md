# Panel de expertos: diseño aplicado y regla de comparación con el sistema

13 de noviembre de 2026. Fija cómo se usa el panel que entregó el equipo y cómo se compara
con el sistema. **Se escribe antes de que existan puntajes del sistema sobre el corpus**:
la regla no puede ajustarse después de ver el resultado.

## 1. El panel, como lo diseñaron los investigadores

Decisión del equipo (Mateo, 13 de noviembre de 2026):

- Seis evaluadores externos, E1–E6. Cada uno calificó **cinco páginas** del corpus en los
  siete grupos: 35 unidades por evaluador y 210 en total, una calificación por unidad.
- E1 y E2 calificaron salud; E3 y E4, gobierno; E5 y E6, el estrato libre.
- Escala **1–4**, con la guía de grupos que preparó el equipo.
- Cada evaluador entregó su archivo. Mateo recibió los seis y un programa los unió en un
  solo libro con las hojas «Experto 1» … «Experto 6». Por eso el libro dice
  `creator = openpyxl`.

Este diseño reemplaza, para la tesis, al de `panel/README.md`, que preveía que los seis
calificaran las 30 páginas en 0–4. Las plantillas y `scripts/panel-importar.js` se
conservan por si el equipo amplía el panel.

Lo que el diseño permite y lo que no, sin discutir la decisión:

| | |
|---|---|
| Acuerdo del sistema con el evaluador de cada página | Sí. Es el resultado principal (§2) |
| Distribución por grupo, evaluador y estrato | Sí (`describir`) |
| Acuerdo entre evaluadores | No se calcula: ninguna unidad tiene dos calificaciones |
| Separar el efecto del evaluador del efecto del estrato | No: cada estrato lo calificaron dos personas que no calificaron otro |

El libro original queda fuera de git, en `panel/entregas/recibidos-2026-11-13/`
(SHA-256 `5b99752dbe24bf7e885f8122f328e4d3112646e0b97e655deb5e567d4553850f`).

## 2. Regla de comparación del sistema con el panel

Implementada en `scripts/comparar-panel.js` y probada en `scripts/panel-consolidado.test.js`.

**Decisión 1. Canal.** Cada grupo se toma del canal donde su criterio es medible: G4 del
screenshot y los demás del wireframe.
*Por qué:* es la decisión congelada de doble canal. *Descartado:* promediar canales, que
mezclaría dos mediciones distintas.

**Decisión 2. Nivel del sistema por unidad.** Si más de la mitad de las repeticiones dio
puntaje, se toma la **mediana inferior** de esos puntajes. Si no, la unidad queda sin
puntaje (NA si la mayoría fue NA; si no, abstención) y se cuenta aparte, nunca como cero.
*Por qué:* la mediana es ordinal y siempre está definida; la moda empata con cinco
repeticiones repartidas. *Descartado:* el promedio, que trata la escala como intervalar.

**Decisión 3. Escala común.** El panel usa 1–4 y el sistema 0–4. Se juntan el 0 y el 1
del sistema en 1; el 2, el 3 y el 4 quedan iguales.
*Por qué:* en las dos escalas el 3 es «bien hecho» y el 4 es «algo más»
(`shared/escala.md`). El panel no tenía forma de separar «ausente» de «falla
generalizada». *Descartado:* reescalar 1–4 a 0–4 en forma lineal, que da niveles
fraccionarios, y restar 1 al panel, que obligaría a leer cada 4 del panel como un 3.
*Costo:* se pierde la diferencia entre 0 y 1 del sistema. Por eso se reporta cuántas
unidades tenían 0.

**Decisión 4. Coeficiente principal.** Brennan–Prediger con pesos cuadráticos sobre
k = 4: `w = 1 − ((i − j)/3)²`, `p_e = 104/144 = 0,7222`. Es el mismo coeficiente del
protocolo con k ajustado a la escala común. Se agrupan todas las unidades y se reporta
con y sin G1. Los valores por grupo son exploratorios, con un intervalo bootstrap del
95 % que remuestrea páginas: 2.000 réplicas, semilla 20261113.

**Decisión 5. Secundarios.** Tau-b de Kendall por grupo, que no depende de la decisión 3;
acuerdo exacto y a ±1 nivel; y el acuerdo por evaluador, solo como descripción, porque
queda confundido con el estrato.

**Decisión 6. Runtimes.** Si hay perfiles de Claude Code y de Codex, cada runtime se
compara aparte con el panel.

## 3. Cómo se corre

```bash
# 1. Importar el libro (una vez; queda en panel/respuestas/, fuera de git)
node scripts/panel-consolidado.js importar panel/entregas/recibidos-2026-11-13/Rubrica_Evaluacion_Expertos_calificada.xlsx
node scripts/panel-consolidado.js describir           # -> panel/descripcion-panel.json

# 2. Evaluar las 30 páginas del corpus con las skills (una corrida por página)
node scripts/orchestrate.js preparar --captura captures/H01 --out corridas/corpus/H01 --repeticiones 5
#    ... evaluar cada solicitud en un contexto nuevo y cerrar:
node scripts/orchestrate.js recoger --corrida corridas/corpus/H01

# 3. Comparar
node scripts/comparar-panel.js corridas/corpus    # -> panel/comparacion-panel.json
```

## 4. Lo que el panel muestra hoy (`describir`)

| Grupo | n | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| G1 | 30 | 0 | 10 | 16 | 4 |
| G2 | 30 | 0 | 13 | 15 | 2 |
| G3 | 30 | 0 | 12 | 18 | 0 |
| G4 | 30 | 0 | 5 | 15 | 10 |
| G5 | 30 | 0 | 13 | 17 | 0 |
| G6 | 30 | 0 | 0 | 20 | 10 |
| G7 | 30 | 0 | 10 | 20 | 0 |

| Estrato | Evaluadores | 2 | 3 | 4 |
|---|---|---|---|---|
| salud | E1, E2 | 33 | 35 | 2 |
| gobierno | E3, E4 | 26 | 43 | 1 |
| libre | E5, E6 | 4 | 43 | 23 |

Ninguna calificación es 1. Hay 15 perfiles distintos en 30 páginas. Ocho perfiles se
repiten en más de una página; cinco de ellos, entre evaluadores distintos.

## 5. Lo que falta

- **Puntajes del sistema sobre el corpus.** Corrida parcial en Claude Code, 18 de 30 páginas,
  una repetición: `resultados/corpus-claude-code-2026-11-13/INFORME.md`. La regla de este
  documento se aplicó sin cambios.
  `[PENDIENTE: cerrar las 12 páginas preparadas que faltan — Mateo y Juan Francisco.]`
- `[PENDIENTE: perfil agregado de los evaluadores (experiencia, formación) y qué instrucciones recibió cada uno, solo lo que el equipo confirme — Mateo.]`

## 6. Limitaciones que el documento de tesis declara

- Una calificación por unidad: el acuerdo es con la persona que calificó cada página, no
  con un consenso. No hay estimación de la confiabilidad de la referencia.
- El evaluador y el estrato no se pueden separar. Una diferencia del sistema entre
  estratos puede ser una diferencia de severidad entre evaluadores.
- La guía del panel describe los grupos con otras palabras que las rúbricas. Por ejemplo,
  en G5 habla de visibilidad del estado del sistema. Una discrepancia en un grupo puede
  venir de esa diferencia de constructo.
- La escala común pierde la distinción 0/1 del sistema (decisión 3).
