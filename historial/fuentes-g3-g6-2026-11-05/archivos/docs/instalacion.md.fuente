# Instalación y uso

Actualizado el 5 de noviembre de 2026. La entrega actual es **0.2.1, candidata local**.
Todavía no tiene un tag público. Para citarla después de publicarla se debe registrar
el commit y la huella del ZIP realmente entregado; no inventar un tag ni citar `main`
como si fuera una versión fija.

## Instalar el ZIP

Descomprime `ux-laws-0.2.1.zip` y abre la terminal dentro de `ux-laws-0.2.1`.
Se necesita Node.js con npm; se comprobó con Node.js 20 y npm 10.

```bash
npm ci
npx playwright install chromium
npm run link
npm run verify
npm test
```

`npm ci` usa las versiones del archivo de dependencias. La instalación y Chromium
requieren red. `npm test` comprueba archivos, esquemas, geometría de páginas locales
y preparación de los siete grupos. No consume evaluaciones del modelo.

Si no puedes crear enlaces, usa `bash scripts/link-skills.sh --copy` en una carpeta
limpia. Una copia debe actualizarse cuando cambien las skills. El script no borra
carpetas ajenas ni reemplaza enlaces distintos.

## Abrir las skills

Las aplicaciones se instalan por separado y requieren una cuenta con acceso al modelo.
En ambos casos abre la terminal en la raíz del paquete, sin volver a agregar su nombre:

```bash
codex
```

Codex encuentra `.agents/skills`, que apunta a `skills/`. Para Claude Code:

```bash
claude --plugin-dir .
```

Ese comando carga el plugin en la sesión. Allí la skill principal se llama
`/ux-laws:ux-audit`. No es una instalación global ni una publicación en un catálogo.
Referencias: [Codex](https://learn.chatgpt.com/docs/build-skills) y
[Claude Code](https://code.claude.com/docs/en/plugins/create).

## Capturar y ver el wireframe

```bash
node scripts/demo.js https://www.banrep.gov.co
```

Abre la ruta de `demo.html` que muestra la terminal. Las imágenes del wireframe tienen
una X. La demo no llama al modelo ni produce puntajes.

Para guardar una captura para evaluación:

```bash
node capture/capture.js https://www.banrep.gov.co --out captures/ejemplo
```

Se guardan screenshot, wireframe, nodos y metadatos de una pantalla de 1440 × 900,
sin scroll. Revisa sus avisos antes de usarla. «Sin alertas automáticas» no garantiza
que esté despejada; una captura antigua sin comprobación se declara sin verificar.
Si la imagen cambió respecto a su huella, la preparación o el cierre se detiene.

## Preparar las evaluaciones

Primero declara `RUNTIME`, `MODEL_ID` y `DECODING` en la terminal con los datos reales
del entorno, el identificador exacto del modelo y sus parámetros en JSON. Si el
entorno no expone algún parámetro, decláralo. No uses nombres de prueba en la tesis.

```bash
node scripts/orchestrate.js preparar --captura captures/ejemplo --out corridas/ejemplo --modo referencia --runtime "$RUNTIME" --model-id "$MODEL_ID" --decoding "$DECODING"
node scripts/orchestrate.js verificar --corrida corridas/ejemplo
```

Usa una carpeta nueva para cada corrida. Referencia prepara 35 solicitudes, siete
grupos por cinco repeticiones. Para comparar canales, usa `--modo comparacion` y otra
salida: serán 65, con G4 solo en screenshot. La preparación no ejecuta modelos.

Cada archivo de `solicitudes/` indica su prompt, entrada, esquema, imágenes ordenadas,
atribución y ruta de respuesta. Ejecuta cada solicitud en una sesión nueva, sin que vea
otras respuestas. Conserva la respuesta completa en la ruta indicada. En la entrada
correspondiente de `invocaciones.json`, registra `contexto_limpio: true` y explica
cómo lo aseguraste en `mecanismo_de_aislamiento`; no lo marques sin haberlo hecho.

Cuando existan todas las respuestas:

```bash
node scripts/orchestrate.js recoger --corrida corridas/ejemplo
```

Se generan `perfil.json` y, en comparación, `comparacion-canales.csv`. Si falta una
respuesta o alguna es inválida, no se cierra como completo. Se conserva lo recibido;
no se corrige ni se pide otra respuesta automáticamente para reemplazarla.

## Entender el perfil

Se devuelve un resultado por grupo, nunca uno por ley. No se calcula un promedio de
los siete. Con puntaje, se guarda el nivel y la condición que lo justifica (`trigger`).
«No aplica» usa `na_reason`. La abstención usa `evidence_insufficient: true` y su
razón en `measurements.motivo_abstencion`, según el contrato del grupo. Ninguna cuenta
como cero. Las reglas completas están en [el apéndice](apendice-rubricas.md).

G1 sigue como no interpretable v1. G2, G3, G5 y G6 usan apoyo textual de screenshot
en wireframe: sus pares no aíslan el efecto del canal. La comparación no reemplaza
la validación experta. No se evalúan recorridos completos ni tiempos de respuesta.

## Si trabajas desde el repositorio

Los originales de `package.json` y el manifiesto siguen en 0.1.0 por el sello histórico
de G1. La entrega instalable se prepara aparte con `release/version.json`:

```bash
npm ci
npx playwright install chromium
node scripts/preparar-reglas.js
node scripts/preparar-entrega.js --zip
```

El tercer paso necesita LibreOffice (`soffice`) para el PDF. Se crean las reglas en
Markdown, Word y PDF y luego el paquete en `dist/`. Los Word/PDF antiguos quedan en
`dist/reglas-anteriores/`. El paquete lleva 0.2.1 y usa `release/package-lock.json`, con fast-uri 3.1.9.
La raíz conserva el archivo de dependencias histórico: para usar la corrección,
instala el ZIP nuevo y ejecuta desde su carpeta.
El ZIP no lleva capturas ni pilotos. La grilla de la tesis usa esos datos del repositorio
y las configuraciones reales de [opciones de ejecución](OPCIONES-EJECUCION-04NOV.md).
