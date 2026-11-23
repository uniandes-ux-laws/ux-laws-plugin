# Estado de la entrega 0.2.3

> Este es el README anterior del repositorio, movido aquí sin cambiar su contenido (solo los
> enlaces relativos). El README de la raíz ahora es la puerta de entrada para quien quiere usar la herramienta.

Trabajo de grado de Ingeniería de Sistemas, Universidad de los Andes.
David Hernández, Mateo Rincón y Juan Francisco Rodríguez. Asesor: Camilo Escobar Velásquez.

La herramienta captura una pantalla web, genera su wireframe y prepara la evaluación
de siete grupos de criterios de UX. Las imágenes del wireframe se representan con una X.
La [guía de carpetas](README.md) ayuda a encontrar el código y los informes.

## Corridas de canales y modelos, 20 y 23 de noviembre

Tres corridas sobre el corpus sellado, cada una con su regla de análisis escrita antes de evaluar:
la de referencia con Opus (30 páginas, 210 evaluaciones), la de canales con Sonnet (18 páginas, 90
solicitudes: G2 y G7 en wireframe y screenshot, G4 en screenshot) y un piloto con Codex
(`gpt-6.1-terra`, 4 páginas cerradas). El análisis contra el panel y entre modelos está en
`resultados/canales-claude-sonnet-2026-11-20/analisis-sonnet.json`, calculado con
`node scripts/analizar-sonnet.js`. Límites declarados: una repetición, subagentes con acceso de lectura
al repositorio, cinco respuestas inválidas por JSON mal formado, niveles concentrados, y solo cinco
páginas de Sonnet cerradas antes del corte del 21 de noviembre (el resto, el 23). Reglas:
`docs/ANALISIS-CANALES-CODEX-2026-11-20.md` y `docs/ANALISIS-CANALES-SONNET-2026-11-20.md`.

## Entrega actual

La entrega **0.2.3**, del 16 de noviembre de 2026, es la versión de cierre del plugin.
Conserva las siete rúbricas y el alcance de G3 y G6 de la 0.2.2, y añade dos cambios
del cierre usados en la corrida del corpus: mide de nuevo en memoria una captura con
medición antigua, y `recoger --conservar-invalidas` cuenta aparte las respuestas
inválidas en vez de detener el cierre. El [cierre del plugin](CIERRE-PLUGIN-16NOV.md)
dice qué se comprobó, cómo se genera el ZIP y qué falta para publicarla: la revisión
de Juan, el tag y la huella del ZIP. Las [instrucciones de instalación](instalacion.md)
describen cómo usarla.

G3 incluye el caso de seis a ocho unidades organizadas y sin contenido ajeno, con las
condiciones de inventario y visibilidad de la rúbrica. G6 muestra lo que pudo evaluar,
lo que no aplica y lo que quedó indeterminado. Su nota global queda vacía cuando falta
información para sostenerla. La [decisión de alcance](ALCANCE-G3-G6-05NOV.md)
explica los cambios y sus límites.

Las corridas nuevas usan esta revisión por defecto. Las instrucciones, el código y el
[documento de reglas](apendice-rubricas.md), también incluido en Word y PDF,
corresponden a las siete skills actuales.

## Usar desde el repositorio

No hay una Release publicada: el ZIP de la entrega se construye localmente (ver abajo).
Desde un clon se puede capturar, ver el wireframe y preparar una corrida. **El puntaje
lo asigna un runtime de agente con modelo (Claude Code o Codex), no este repositorio**:
`preparar` escribe las solicitudes y `recoger` valida las respuestas.

```bash
npm ci
npx playwright install chromium                    # el navegador que pide Playwright
node scripts/demo.js https://www.ejemplo.com       # captura y wireframe, en alrededor de un minuto
node scripts/orchestrate.js preparar --url https://www.ejemplo.com --out corridas/ejemplo \
  --runtime "<runtime>" --model-id "<id exacto del modelo>" --decoding '<JSON o no-expuesto-por-el-runtime>'
node --test                                         # pruebas; no necesitan ningún archivo derivado
```

Cada solicitud de `corridas/ejemplo/solicitudes/` se ejecuta en una sesión nueva del
runtime; después, `node scripts/orchestrate.js recoger --corrida corridas/ejemplo` arma el
perfil. Si la captura sale con `sanity_ok=false`, `preparar` se niega salvo
`--aceptar-sanidad-fallida`, que queda escrito en el libro. En Windows conviene clonar con
`git clone -c core.autocrlf=false`.

## Límites del instrumento

- **Una sola pantalla**: 1440 × 900, solo lo visible sin desplazarse. No evalúa flujos.
- **El corpus son 30 páginas colombianas** (gobierno, salud, comercio y otros sectores).
  Los resultados describen ese conjunto, no «cualquier web».
- **Leyes temporales fuera de alcance**: Doherty, Flow, Zeigarnik y Parkinson. De
  Goal-Gradient el efecto queda fuera; se puntúa la affordance de progreso (G5).
- **Tres leyes sin fuente empírica**: Jakob, Tesler y la Navaja de Occam aplicada a
  interfaces son heurísticas de industria o principios, no hallazgos experimentales. G6 las
  agrupa por eso.
- **Sesgo de captura que golpea a G5**: en el sorteo de los casos dorados, 13 de 23 páginas
  no admitieron captura limpia, concentradas en checkout y trámites, que son justo donde G5
  aplica (`docs/casos-dorados.md`).
- **G1 no es interpretable en la versión 1**: sus cuatro leyes quedan sin resultado.
- **No se calcula un total**: el resultado es el perfil por grupo. Un total con ponderación
  uniforme haría pesar igual a G7 (una ley) que a G1 (cuatro).
- **No hay acuerdo útil con el panel**: en las 30 páginas del corpus el κ agrupado es −0,14
  (intervalo con 0) y el sistema puntúa entre 1,2 y 1,9 niveles por debajo del panel; solo G2
  corresponde y G6 se abstuvo casi siempre. Con una repetición y un runtime
  (`resultados/corpus-claude-code-2026-11-13/INFORME.md`).

## Preparar la entrega

Se necesita Node.js con npm, Chromium de Playwright y LibreOffice para generar el PDF.

```bash
npm ci
npx playwright install chromium
node scripts/preparar-reglas.js
node scripts/preparar-entrega.js --zip
```

Esto genera `dist/ux-laws-0.2.3/`, el ZIP y su huella. No publica nada ni reemplaza las
entregas anteriores. El preparador rechaza una carpeta que ya tenga archivos.

Los metadatos originales de la raíz siguen en 0.1.0 por el sello de G1. El paquete
usa copias con 0.2.3 y `release/package-lock.json`, con fast-uri 3.1.9. El protocolo
base conserva 0.1.0; el esquema de respuestas usa 0.2.0, la ejecución 1.0.0 y el perfil
2.1.0. La revisión de G3/G6 se identifica aparte como `alcance-2026-11-05`.

## Evaluación y resultados

Referencia prepara 35 solicitudes por página y entorno; comparación prepara 65,
con cinco repeticiones. G4 usa solo screenshot. Preparar no envía solicitudes al modelo.
Cada respuesta debe conservar su atribución y producirse en una sesión independiente.

| Grupo | Canal de referencia |
|---|---|
| G1 | Wireframe; instrumento no interpretable v1. |
| G2 | Wireframe con apoyo textual de screenshot. |
| G3 | Wireframe con apoyo textual de screenshot; contrato 0.2.0. |
| G4 | Screenshot. |
| G5 | Wireframe con apoyo textual de screenshot. |
| G6 | Wireframe con apoyo textual de screenshot; diagnóstico por criterio. |
| G7 | Wireframe. |

El cierre genera `perfil.json` y un informe legible, `perfil.md`. Ambos distinguen
puntaje, no aplicabilidad y abstención. Estos dos últimos no cuentan como ceros.
G6 incluye las razones y la cobertura de las convenciones. No se calcula un promedio
de grupos ni una nota de las convenciones que alcanzaron a verse.

Los avisos de captura se conservan. Una revisión automática sin alertas no garantiza
que la página esté despejada. La comparación de G2, G3, G5 y G6 no aísla por completo
el efecto del canal, porque el wireframe permite apoyo textual de screenshot.

## Trabajo anterior y límites

Las versiones 0.2.0 y 0.2.1 y las respuestas previas se conservan. El código utilizado
en G3/G6 se archivó con sus huellas. Estas comprobaciones no ejecutan modelos y pasan en
un clon limpio, comprobado el 12 de noviembre de 2026 en Windows:

```bash
node scripts/verificar-fuentes-historicas.js     # fuentes archivadas y entradas de G3/G6
python3 scripts/verify-g3-g6-closure.py            # cierre de G3/G6: 240 sesiones, 8 sellos
node scripts/verificar-integracion-real.js --solo-sello   # sello de la prueba 0.2.2
node scripts/g1-closure.js verificar              # cierre de G1; ver la nota de Windows
```

`g1-closure.js verificar` pasa en un clon con `core.autocrlf=false`. Con la configuración
por defecto de Git para Windows falla, porque lee un manifiesto de `revisiones/` que esa
configuración convierte a CRLF: clona con `git clone -c core.autocrlf=false`.

Sus límites: las entradas de los pilotos se verifican regenerando su medición con el
código archivado, porque el `measurements.json` original no se versiona y lleva marca de
tiempo; su hash en bruto no se puede reproducir. Dos comprobaciones **no** pasan desde
un clon: `verify-g5-closure.js` falla desde el commit `15f158b` (4 de noviembre), porque
`capture/capture.js` y `capture/dismiss.js` cambiaron después del registro de la
preparación de G5; y `verificar-integracion-real.js --verify-seal` necesita el paquete
0.2.2, que no está en el repositorio.

Los [pilotos de G3/G6](CIERRE-G3-G6-21OCT.md) terminaron con 20 puntajes, 70
abstenciones y 30 inválidas en G3, y 120 abstenciones en G6. No se cambian esos resultados.
La revisión nueva no obliga a puntuar todos los casos: G3 conserva otras combinaciones
sin regla y G6 puede entregar solo un diagnóstico parcial.

G1 mantiene su falta de discriminación. Los criterios del proyecto no equivalen a
validación de las leyes ni de sus puntajes. Siguen pendientes la comparación experta,
el consenso y la medición final con los modelos de ambos entornos. El panel son seis
evaluadores externos escogidos por el equipo y anónimos en los datos. Cada uno calificó
cinco páginas en escala 1–4 con la guía del equipo. La regla para compararlos con el
sistema está fijada en `docs/ANALISIS-PANEL-13NOV.md`, antes de tener los puntajes.

El [informe de integración](INTEGRACION-G3-G6-05NOV.md) recoge la comprobación de
esta entrega. Los pilotos y el historial no se incluyen en el ZIP de uso.

## Licencia

La licencia MIT cubre **el código** de este repositorio. **No cubre las capturas de sitios de
terceros**: las imágenes y los datos de página de `captures/`, `calibracion/`, `dorados/`,
`pilotos/`, `preparacion/` y `verificaciones/` son de sus titulares y se incluyen solo para
que la medición se pueda verificar. Ver `LICENSE`.
