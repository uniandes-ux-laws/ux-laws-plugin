# Corrida del corpus en Claude Code y comparación con el panel

13–15 de noviembre de 2026. **Corrida parcial**: 18 de las 30 páginas del corpus quedaron
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
| Cerradas con perfil | G01–G10, H01–H05, L01–L03 (18 páginas, 126 evaluaciones) |
| De ellas, con `sanity_ok=false` aceptado por decisión del equipo (15 nov.) | G01, G04, L01, L02, L03. El detector dejó una capa o un aviso sin resolver, o una imagen incompleta; L03 tiene el interstitial de Éxito ya declarado. La aceptación está en cada `invocaciones.json` y en `registros/preparar-sanidad-aceptada.log`. Sus puntajes se leen con esa advertencia |
| Preparadas, sin cerrar | H06 (2 de 7 respuestas), H07–H10, L04–L10 |

La corrida se detuvo tres veces por el límite de uso de 5 horas de la cuenta. Ocho
respuestas las escribió un subagente que se detuvo por el límite antes de enviar su
reporte (G09-g6, H04-g6, H05-g2…g7); se conservaron porque pasan el esquema y el contrato.
Varios subagentes reescribieron su propio archivo antes de terminar, al notar un campo
fuera del esquema; en todos los casos queda la versión final que escribieron. Uno (L01-g5)
intentó ejecutar un comando contra la restricción del encargo; el permiso lo denegó y no
se ejecutó nada. **Ninguna respuesta la corrigió ni la repitió el orquestador.**
Registros: `registros/`.

Primer intento de preparación: falló en las 30 páginas porque las capturas selladas traen
la medición 1.0.0 (defecto M4 de la auditoría del 12 nov.). Se corrigió en `68565ab` sin
tocar las capturas y se volvió a preparar.

## 2. Lo que dio el sistema (126 evaluaciones)

| Grupo | 0 | 1 | 2 | 3 | 4 | NA | Abst. | Inv. |
|---|---|---|---|---|---|---|---|---|
| G1 | 17 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| G2 | 0 | 1 | 5 | 3 | 0 | 0 | 9 | 0 |
| G3 | 1 | 4 | 0 | 0 | 0 | 0 | 12 | 1 |
| G4 | 0 | 10 | 2 | 0 | 0 | 0 | 6 | 0 |
| G5 | 11 | 3 | 2 | 1 | 0 | 1 | 0 | 0 |
| G6 | 0 | 0 | 0 | 0 | 0 | 0 | 18 | 0 |
| G7 | 14 | 4 | 0 | 0 | 0 | 0 | 0 | 0 |

79 puntajes, 1 NA (G02-G5), 45 abstenciones y 1 inválida (G02-G3, selección o unidades
incompletas sin declarar). G1 dio 0 en 17 de 18 páginas. G6 se abstuvo en todas. Ningún
grupo llegó a 4.

## 3. Comparación con el panel

Las 18 páginas cubren salud (H01–H05, E1), gobierno (G01–G10, E3 y E4) y tres del estrato
libre (L01–L03, E5). **E2 y E6 no entran.** En estas unidades el panel usó 2 (35), 3 (42) y
4 (2).

| | n | κ_BP (IC 95 %) | Exacto | ±1 | τ_b |
|---|---|---|---|---|---|
| **18 páginas**, con G1 | 79 | 0,008 (−0,221; 0,227) | 0,09 | 0,52 | −0,09 |
| **18 páginas**, sin G1 | 61 | 0,095 (−0,090; 0,273) | 0,11 | 0,54 | −0,10 |
| Sensibilidad: las 13 que pasaron el control, con G1 | 59 | 0,234 (0,033; 0,442) | 0,10 | 0,66 | −0,04 |
| Sensibilidad: las 13, sin G1 | 46 | 0,261 (0,090; 0,446) | 0,13 | 0,67 | −0,06 |

| Grupo (18 páginas) | n | κ_BP | Exacto | ±1 | τ_b | Diferencia media sistema − panel |
|---|---|---|---|---|---|---|
| G1 | 18 | −0,29 | 0 | 0,44 | — (casi constante) | −1,67 |
| G2 | 9 | 0,78 | 0,44 | 1,00 | 0,10 | −0,11 |
| G3 | 5 | −0,12 | 0 | 0,40 | — | −1,60 |
| G4 | 12 | −0,10 | 0 | 0,42 | 0,26 | −1,58 |
| G5 | 17 | 0,11 | 0,18 | 0,53 | −0,14 | −1,29 |
| G6 | 0 | — | — | — | — | — |
| G7 | 18 | −0,07 | 0 | 0,44 | — | −1,56 |

Excluidas: 84 unidades del panel sin dato del sistema (páginas no evaluadas), 45
abstenciones, 1 NA y 1 inválida. El sistema dio 0 en 43 de las 79 unidades comparadas; la
escala común las lee como 1. Un dash en τ_b indica que el sistema dio un nivel constante o
casi constante en el grupo.

**Lectura.**

1. **No hay acuerdo útil del sistema con el panel.** Con las 18 páginas el coeficiente
   agrupado es prácticamente 0 y su intervalo incluye el 0; el acuerdo exacto es del 9 % y
   el orden de las páginas no coincide (τ_b ≈ −0,1).
2. **El sistema puntúa más bajo que el panel**: menor en 70 de 79 unidades, igual en 7 y
   mayor en 2. Salvo G2, la diferencia media va de 1,3 a 1,7 niveles.
3. **El κ de 0,23 de las 13 páginas era efecto de los pesos.** Al entrar las cinco páginas
   aceptadas (G01, G04 y L01–L03; las tres últimas las calificó E5, el evaluador que más 4
   dio), la distancia media crece y el coeficiente cae a 0. El acuerdo exacto casi no
   cambia (10 % → 9 %): lo que cambia es cuán lejos queda el sistema.
4. **G2 es el único grupo con correspondencia**: diferencia media −0,11, todas las unidades
   a ±1 y casi la mitad exactas, sobre 9 unidades. Se mantiene con y sin las páginas
   aceptadas.
5. G6 no se puede comparar y G3 tiene 5 unidades. La comparación por evaluador queda
   confundida con el estrato y no se interpreta.

## 4. Límites

- Parcial: 18 de 30 páginas; del estrato libre solo L01–L03; cuatro de los seis evaluadores.
- Cinco de las 18 páginas tienen la captura marcada por el control de sanidad.
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
# sacar panel/respuestas y panel/entregas del repositorio mientras se evalúa;
# evaluar las solicitudes que faltan (un contexto nuevo por solicitud) y luego:
node scripts/orchestrate.js recoger --corrida resultados/corpus-claude-code-2026-11-13/<página> --conservar-invalidas
node scripts/comparar-panel.js resultados/corpus-claude-code-2026-11-13 --out resultados/corpus-claude-code-2026-11-13/comparacion-panel.json
```

Faltan: H06 (G2, G4–G7), H07–H10 y L04–L10, 82 solicitudes.
`[PENDIENTE: completar las 12 páginas restantes con el mismo procedimiento — Mateo y Juan Francisco.]`
