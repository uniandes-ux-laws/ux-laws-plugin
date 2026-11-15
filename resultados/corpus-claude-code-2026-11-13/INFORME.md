# Corrida del corpus en Claude Code y comparación con el panel

13–15 de noviembre de 2026. **Corrida parcial**: 13 de las 25 páginas preparadas quedaron
cerradas. La comparación con el panel aplica la regla fijada antes de evaluar
(`docs/ANALISIS-PANEL-13NOV.md`); no se cambió después de ver los números.

## 1. Qué se corrió

| | |
|---|---|
| Código | `68565ab` (preparación) y `4ca8118`/`a7ca506` (cierre con `--conservar-invalidas`) |
| Páginas | las 30 del corpus sellado (`captures/`, sello `f9c0caaa…`, verificado después de preparar) |
| Runtime | `claude-code-vscode` |
| Modelo | `claude-opus-5-5`, el que informó cada subagente |
| Parámetros | no expuestos por el runtime |
| Modo | referencia, **una repetición** por grupo: 7 solicitudes por página |
| Aislamiento | un subagente nuevo por solicitud (herramienta Agent, sin fork), con el encargo de la prueba de humo del 13 nov. Durante la corrida las calificaciones del panel estuvieron fuera del repositorio |

| Estado | Páginas |
|---|---|
| No preparadas: `sanity_ok=false`, no se forzó | G01, G04, L01, L02, L03 (el detector dejó una capa o un aviso sin resolver, o una imagen incompleta; ver `registros/preparar.log`) |
| Cerradas con perfil | G02, G03, G05–G10, H01–H05 (13 páginas, 91 evaluaciones) |
| Preparadas, sin cerrar | H06 (2 de 7 respuestas), H07–H10, L04–L10 |

La corrida se detuvo tres veces por el límite de uso de 5 horas de la cuenta. Ocho
respuestas de páginas cerradas las escribió un subagente que se detuvo por el límite
antes de enviar su reporte: G09-g6, H04-g6 y H05-g2…g7. Se conservaron porque pasan el
esquema y el contrato; ninguna se reanudó ni se reescribió. Ninguna respuesta se corrigió
ni se repitió. Registros: `registros/preparar.log` y `registros/recoger-<página>.log`.

Primer intento de preparación: falló en las 30 páginas porque las capturas selladas traen
la medición 1.0.0 (defecto M4 de la auditoría del 12 nov.). Se corrigió en `68565ab` sin
tocar las capturas y se volvió a preparar.

## 2. Lo que dio el sistema (91 evaluaciones)

| Grupo | 0 | 1 | 2 | 3 | 4 | NA | Abst. | Inv. |
|---|---|---|---|---|---|---|---|---|
| G1 | 13 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| G2 | 0 | 1 | 4 | 3 | 0 | 0 | 5 | 0 |
| G3 | 0 | 3 | 0 | 0 | 0 | 0 | 9 | 1 |
| G4 | 0 | 8 | 2 | 0 | 0 | 0 | 3 | 0 |
| G5 | 9 | 1 | 2 | 0 | 0 | 1 | 0 | 0 |
| G6 | 0 | 0 | 0 | 0 | 0 | 0 | 13 | 0 |
| G7 | 10 | 3 | 0 | 0 | 0 | 0 | 0 | 0 |

59 puntajes, 1 NA (G02-G5), 30 abstenciones y 1 inválida (G02-G3, selección o unidades
incompletas sin declarar). G1 dio 0 en las 13 páginas: sigue sin discriminar, como en el
piloto. G6 se abstuvo en todas. Ningún grupo llegó a 4.

## 3. Comparación con el panel

Las 13 páginas son de salud (H01–H05, evaluador E1) y gobierno (G02–G10, E3 y E4). **El
estrato libre y los evaluadores E2, E5 y E6 no entran.** En estas unidades el panel usó solo
2 y 3 (35 y 24).

| | n | κ_BP (IC 95 %) | Exacto | ±1 | τ_b |
|---|---|---|---|---|---|
| Con G1 | 59 | 0,234 (0,033–0,442) | 0,10 | 0,66 | −0,04 |
| Sin G1 | 46 | 0,261 (0,090–0,446) | 0,13 | 0,67 | −0,06 |

| Grupo | n | κ_BP | Exacto | ±1 | τ_b | Diferencia media sistema − panel |
|---|---|---|---|---|---|---|
| G1 | 13 | 0,14 | 0 | 0,62 | — (sistema constante) | −1,38 |
| G2 | 8 | 0,80 | 0,50 | 1,00 | 0,20 | 0,00 |
| G3 | 3 | 0,20 | 0 | 0,67 | — | −1,33 |
| G4 | 10 | 0,00 | 0 | 0,50 | 0,33 | −1,50 |
| G5 | 12 | 0,27 | 0,17 | 0,67 | −0,32 | −1,17 |
| G6 | 0 | — | — | — | — | — |
| G7 | 13 | 0,14 | 0 | 0,62 | — (sistema constante) | −1,38 |

Excluidas: 119 unidades del panel sin dato del sistema (páginas no evaluadas), 30
abstenciones, 1 NA y 1 inválida. El sistema dio 0 en 32 de las 59 unidades comparadas;
la escala común las lee como 1.

**Lectura.**

1. **El sistema puntúa más bajo que el panel**: menor en 51 de 59 unidades, igual en 6 y
   mayor en 2. Salvo G2, la diferencia media va de 1,2 a 1,5 niveles.
2. **El κ agrupado positivo no indica que ordenen igual las páginas.** El acuerdo exacto es
   del 10 % y τ_b ronda 0. En G1 y G7 el sistema dio el mismo nivel en todas las páginas, y
   τ_b no está definido. El κ sale de que las diferencias son de uno o dos niveles, que los
   pesos cuadráticos cuentan como acuerdo parcial. Es el caso que la tesis discute como
   rúbrica degenerada.
3. **G2 es el único grupo con correspondencia**: diferencia media 0, todas las unidades a
   ±1 y la mitad exactas, sobre 8 unidades.
4. G6 no se puede comparar y G3 tiene 3 unidades. La comparación por evaluador (E1 n=22,
   E3 n=14, E4 n=23) queda confundida con el estrato y no se interpreta.

## 4. Límites

- Parcial: 13 de 30 páginas, dos de los tres estratos y tres de los seis evaluadores.
- Una repetición: no mide la dispersión del sistema en el corpus (la de los pilotos está
  en `pilotos/`).
- Un runtime y un modelo. No hay comparación con Codex ni entre canales.
- Un evaluador por unidad y la guía del equipo, distinta en partes de la rúbrica (§6 de
  `docs/ANALISIS-PANEL-13NOV.md`).
- El contexto de cada subagente incluía el `CLAUDE.md` del repositorio y las instrucciones
  MCP del usuario. Se les pidió no leer otros archivos; las calificaciones del panel no
  estaban en disco.

## 5. Cómo completarla

```bash
# evaluar las solicitudes que faltan (un contexto nuevo por solicitud) y luego:
node scripts/orchestrate.js recoger --corrida resultados/corpus-claude-code-2026-11-13/<página> --conservar-invalidas
node scripts/comparar-panel.js resultados/corpus-claude-code-2026-11-13 --out resultados/corpus-claude-code-2026-11-13/comparacion-panel.json
```

Faltan: H06 (G2, G4–G7), H07–H10 y L04–L10, 82 solicitudes.
`[PENDIENTE: completar las 12 páginas restantes con el mismo procedimiento — Mateo y Juan Francisco.]`
