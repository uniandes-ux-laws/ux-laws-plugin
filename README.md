# ux-laws

Evaluación automatizada de la UX de una página web con las *Laws of UX*. Una sola pantalla
(1440 × 900) entra; sale un perfil por grupo, de 0 a 4, con la razón de cada nota.
Trabajo de grado de Ingeniería de Sistemas, Universidad de los Andes: David Hernández,
Mateo Rincón y Juan Francisco Rodríguez. Asesor: Camilo Escobar Velásquez.

## Qué hace

1. Captura la página y genera su wireframe.
2. Prepara una solicitud por grupo, con su rúbrica y sus mediciones.
3. Un agente (Claude Code o Codex) puntúa cada solicitud en una sesión nueva.
4. `recoger` valida las respuestas y arma el perfil.

**El puntaje lo asigna el agente con su modelo; este repositorio prepara, valida y resume.**

| Grupo | Carpeta de la skill |
|---|---|
| G1 | `g1-agrupacion-perceptual` |
| G2 | `g2-arquitectura-decision` |
| G3 | `g3-capacidad-segmentacion` |
| G4 | `g4-saliencia-visual` (único que usa el screenshot) |
| G5 | `g5-posicion-progreso` |
| G6 | `g6-economia-convencion` |
| G7 | `g7-targeting-motor` |

La skill que coordina todo es `ux-audit`. Las reglas de cada nota están en el
[apéndice de rúbricas](docs/apendice-rubricas.md).

## Instalar

Requiere Node.js con npm y red. Descomprime `ux-laws-0.2.3.zip`, abre una terminal en
`ux-laws-0.2.3` y ejecuta:

```bash
npm ci
npx playwright install chromium
npm run link
npm run verify
npm test
```

Todavía no hay una Release pública con el ZIP; la huella y el tag los fija quien publica.
Detalles, sin atajos y con las alternativas en [docs/instalacion.md](docs/instalacion.md).

## Usar

Desde la carpeta del paquete:

- **Claude Code:** `claude --plugin-dir .` y luego `/ux-laws:ux-audit`.
- **Codex:** `codex`; las skills se listan con `/skills` o se mencionan con `$`.

En las pruebas del 13 de noviembre la skill también se activó con una frase libre
(«evalúa la UX de https://…»); el comando es la ruta fija. El agente necesita permiso para
ejecutar Node y Chromium. Ver [INFORME-RESUMEN-Y-HUMO-13NOV.md](docs/INFORME-RESUMEN-Y-HUMO-13NOV.md).

**Costo.** El modo referencia prepara 35 solicitudes por página (siete grupos × cinco
repeticiones), cada una en una sesión nueva; con `--repeticiones 1` son siete. Pueden
agotar los límites de uso de una cuenta.

Ruta manual, sin la skill:

```bash
node scripts/demo.js https://www.ejemplo.com        # captura y wireframe
node scripts/orchestrate.js preparar --url https://www.ejemplo.com --out corridas/ejemplo \
  --runtime "<runtime>" --model-id "<id exacto del modelo>" --decoding '<JSON o no-expuesto-por-el-runtime>'
node scripts/orchestrate.js recoger --corrida corridas/ejemplo
```

## Qué entrega

Tres archivos en la carpeta de la corrida:

- `resumen.md`: el resultado en lenguaje llano (se genera sin modelo; ver [PLAN-RESUMEN-CLARO.md](docs/PLAN-RESUMEN-CLARO.md)).
- `perfil.md`: el perfil por grupo, con la razón de cada nota.
- `perfil.json`: los mismos datos para otros programas.

La nota es por grupo, de 0 a 4, y **no se calcula un total**. «No aplica» y «abstención»
conservan su motivo y no cuentan como ceros.

## Límites

- **Una sola pantalla**, lo visible sin desplazarse. No evalúa flujos ni tiempos
  (Doherty, Flow, Zeigarnik y Parkinson quedan fuera).
- **El corpus son 30 páginas colombianas.** Los resultados describen ese conjunto.
- **G1 no es interpretable en la versión 1.**
- **Jakob, Tesler y la Navaja de Occam** son heurísticas de industria, no hallazgos
  experimentales; G6 las agrupa por eso.
- **Acuerdo con un panel de seis expertos:** κ agrupado de −0,14 en las 30 páginas
  (intervalo que incluye 0); el sistema puntúa por debajo del panel. Solo G2 tiene
  correspondencia directa con lo que puntuó el panel (κ 0,63, n = 12). Una repetición por
  unidad. Informe: `resultados/corpus-claude-code-2026-11-13/INFORME.md`.
- **Canales y modelos:** en G2 y G7, el nivel fue el mismo con wireframe y con screenshot en 25 de 26
  pares (18 páginas, Sonnet). Sonnet y Opus dieron el mismo nivel en las 31 unidades donde ambos
  puntuaron, y un piloto de Codex en 4 páginas coincidió donde ambos puntuaron. Los niveles están
  concentrados, así que esa igualdad dice poco sobre si el instrumento discrimina. Informes:
  `resultados/canales-claude-sonnet-2026-11-20/INFORME.md` y `resultados/canales-codex-2026-11-20/ESTADO.md`.

## Para investigadores

Estado de la entrega, historial de cada grupo, sellos y pruebas: [docs/README.md](docs/README.md)
y [docs/ESTADO-DE-LA-ENTREGA.md](docs/ESTADO-DE-LA-ENTREGA.md). Para citar: [CITATION.cff](CITATION.cff).

## Licencia

La licencia MIT cubre **el código**. **No cubre las capturas de sitios de terceros**: las
imágenes y datos de `captures/`, `calibracion/`, `dorados/`, `pilotos/`, `preparacion/` y
`verificaciones/` son de sus titulares y se incluyen solo para que la medición se pueda
verificar. Ver [LICENSE](LICENSE).
