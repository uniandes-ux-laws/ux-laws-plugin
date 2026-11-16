# Corrida del corpus en Claude Code y comparación con el panel

13–16 de noviembre de 2026. **Las 30 páginas del corpus quedaron evaluadas y cerradas.**
La comparación con el panel aplica la regla fijada antes de evaluar
(`docs/ANALISIS-PANEL-13NOV.md`); no se cambió después de ver los números.

## 1. Qué se corrió

| | |
|---|---|
| Código | `68565ab` (preparación) y `4ca8118`/`a7ca506` (cierre con `--conservar-invalidas`) |
| Páginas | las 30 del corpus sellado (`captures/`, sello `f9c0caaa…`, verificado después de preparar) |
| Runtime | `claude-code-vscode` |
| Modelo | `claude-opus-5-5`, el que informó cada subagente |
| Parámetros | no expuestos por el runtime |
| Modo | referencia, **una repetición** por grupo: 7 solicitudes por página, 210 en total |
| Aislamiento | un subagente nuevo por solicitud (herramienta Agent, sin fork), con el encargo de la prueba de humo del 13 nov. Durante la corrida las calificaciones del panel estuvieron fuera del repositorio |

Cinco páginas (G01, G04, L01, L02, L03) tienen la captura marcada con `sanity_ok=false`: el
detector dejó una capa o un aviso sin resolver, o una imagen incompleta; L03 tiene el
interstitial de Éxito ya declarado. Se dejaron fuera al principio y el 15 nov. el equipo
decidió evaluarlas con `--aceptar-sanidad-fallida`. La aceptación está en cada
`invocaciones.json` y en `registros/preparar-sanidad-aceptada.log`; sus puntajes se leen
con esa advertencia y se reportan también sin ellas (§3).

La corrida se detuvo varias veces por el límite de uso de 5 horas de la cuenta y por el tope
de 20 subagentes simultáneos. Los subagentes detenidos sin respuesta se reanudaron con su
propio contexto. **26 respuestas las escribió un subagente que se detuvo por el límite antes
de enviar su reporte**: G09-g6, H04-g6, H05-g2…g7, H06-g1, H06-g3, H10-g4, H10-g6,
L04-g3, L04-g4, L04-g6, L08-g6, L09-g3, L09-g4, L09-g6 y L10-g1…g7. Se conservaron como
quedaron y `recoger` las validó. Varios subagentes reescribieron su propio archivo antes de
terminar al notar un campo fuera del esquema; queda la versión final que escribieron. Uno
(L01-g5) intentó ejecutar un comando contra la restricción del encargo; el permiso lo denegó.
H09 se cerró antes de que dos subagentes terminaran y se volvió a cerrar con sus respuestas
finales (`registros/recoger-H09.log`). **Ninguna respuesta la corrigió ni la repitió el
orquestador.** Registros: `registros/`.

Primer intento de preparación: falló en las 30 páginas porque las capturas selladas traen
la medición 1.0.0 (defecto M4 de la auditoría del 12 nov.). Se corrigió en `68565ab` sin
tocar las capturas y se volvió a preparar.

## 2. Lo que dio el sistema (210 evaluaciones)

| Grupo | 0 | 1 | 2 | 3 | 4 | NA | Abst. | Inv. |
|---|---|---|---|---|---|---|---|---|
| G1 | 27 | 2 | 0 | 0 | 0 | 1 | 0 | 0 |
| G2 | 0 | 1 | 8 | 3 | 0 | 0 | 18 | 0 |
| G3 | 3 | 7 | 1 | 1 | 0 | 0 | 17 | 1 |
| G4 | 2 | 15 | 2 | 1 | 0 | 0 | 10 | 0 |
| G5 | 15 | 7 | 3 | 4 | 0 | 1 | 0 | 0 |
| G6 | 0 | 1 | 1 | 0 | 0 | 0 | 27 | 1 |
| G7 | 20 | 9 | 1 | 0 | 0 | 0 | 0 | 0 |

134 puntajes, 2 NA, 72 abstenciones y 2 inválidas. G1 dio 0 en 27 de 30 páginas. G6 se
abstuvo en 27 de 30. Ningún grupo llegó a 4.

## 3. Comparación con el panel

Las 30 páginas y los seis evaluadores entran. En las unidades comparadas el panel usó 2
(45), 3 (78) y 4 (11).

| | n | κ_BP (IC 95 %) | Exacto | ±1 | τ_b |
|---|---|---|---|---|---|
| **30 páginas**, con G1 | 134 | −0,140 (−0,328; 0,044) | 0,08 | 0,46 | 0,07 |
| **30 páginas**, sin G1 | 105 | −0,051 (−0,212; 0,112) | 0,10 | 0,49 | 0,09 |
| Sensibilidad: las 25 sin advertencia, con G1 | 114 | −0,049 (−0,230; 0,137) | 0,09 | 0,52 | 0,11 |
| Sensibilidad: las 25, sin G1 | 90 | 0,009 (−0,162; 0,182) | 0,11 | 0,54 | 0,12 |

| Grupo (30 páginas) | n | κ_BP | Exacto | ±1 | τ_b | Diferencia media sistema − panel |
|---|---|---|---|---|---|---|
| G1 | 29 | −0,46 | 0 | 0,34 | — (casi constante) | −1,79 |
| G2 | 12 | 0,63 | 0,33 | 0,92 | −0,05 | −0,42 |
| G3 | 12 | 0,03 | 0,08 | 0,50 | 0,31 | −1,42 |
| G4 | 20 | −0,54 | 0 | 0,30 | 0,22 | −1,85 |
| G5 | 29 | 0,19 | 0,21 | 0,59 | 0,18 | −1,21 |
| G6 | 2 | — | 0 | 0 | — | −2,50 |
| G7 | 30 | −0,16 | 0 | 0,37 | 0,13 | −1,63 |

| Estrato | Evaluadores | n | κ_BP | Exacto | Diferencia media |
|---|---|---|---|---|---|
| Gobierno | E3, E4 | 46 | 0,08 | 0,13 | −1,30 |
| Salud | E1, E2 | 48 | 0,05 | 0,04 | −1,38 |
| Libre | E5, E6 | 40 | −0,62 | 0,08 | −1,85 |

Excluidas: 72 abstenciones, 2 NA y 2 inválidas. El sistema dio 0 en 67 de las 134 unidades
comparadas; la escala común las lee como 1. Un guion en τ_b indica que el sistema dio un nivel
constante o casi constante. G6 tiene dos unidades y no se interpreta.

**Lectura.**

1. **El sistema no concuerda con el panel.** El coeficiente agrupado es negativo y su
   intervalo incluye el 0, con y sin G1 y con y sin las páginas con advertencia. El acuerdo
   exacto es del 8 % y el orden de las páginas apenas coincide (τ_b ≈ 0,1).
2. **El sistema puntúa más bajo que el panel**: menor en 121 de 134 unidades, igual en 11 y
   mayor en 2. Salvo G2, la diferencia media va de 1,2 a 1,9 niveles.
3. **Las cifras parciales anteriores dependían de qué páginas habían entrado.** Con 13
   páginas el κ era 0,23, con 18 páginas 0,01, y con 30 es −0,14. El acuerdo exacto se
   mantuvo entre 8 % y 10 % todo el tiempo: lo que cambia es cuán lejos queda el sistema,
   no cuán a menudo coincide. Es el comportamiento que la tesis anticipa para un coeficiente
   con término de azar fijo.
4. **El estrato libre es donde más se aleja** (−1,85 niveles, κ −0,62). Lo calificaron E5 y
   E6, los evaluadores que más 4 dieron; el diseño no permite separar el efecto de la página
   del efecto del evaluador.
5. **G2 es el único grupo con correspondencia**: 11 de 12 unidades a ±1 y un tercio exactas,
   κ 0,63, diferencia media −0,42. Se abstuvo en 18 de 30 páginas.

## 4. Límites

- Una repetición: no mide la dispersión del sistema en el corpus (la de los pilotos está
  en `pilotos/`).
- Un runtime y un modelo. No hay comparación con Codex ni entre canales.
- Cinco páginas con la captura marcada; se reportan con y sin ellas.
- Un evaluador por unidad y la guía del equipo, distinta en partes de la rúbrica (§6 de
  `docs/ANALISIS-PANEL-13NOV.md`). Evaluador y estrato están confundidos.
- 26 respuestas sin reporte final del subagente (§1).
- El contexto de cada subagente incluía el `CLAUDE.md` del repositorio y las instrucciones
  MCP del usuario. Se les pidió no leer otros archivos; las calificaciones del panel no
  estaban en disco.

## 5. Cómo reproducir la comparación

```bash
node scripts/panel-consolidado.js importar panel/entregas/recibidos-2026-11-13/Rubrica_Evaluacion_Expertos_calificada.xlsx
node scripts/comparar-panel.js resultados/corpus-claude-code-2026-11-13 --out resultados/corpus-claude-code-2026-11-13/comparacion-panel.json
```
