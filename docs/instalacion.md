# Instalación y uso

Actualizado el 16 de noviembre de 2026. La entrega actual es **0.2.3, local para revisión**.
No tiene un tag público nuevo. El commit y la huella del ZIP realmente entregado deben
registrarse al publicarla; no se cita `main` como si fuera una versión fija.

## Instalar

Descomprime `ux-laws-0.2.3.zip` y abre una terminal dentro de `ux-laws-0.2.3`.

```bash
npm ci
npx playwright install chromium
npm run link
npm run verify
npm test
```

Se necesita Node.js con npm. La instalación y Chromium requieren red. La prueba del
paquete comprueba archivos, formatos, captura y preparación local; no consume respuestas
del modelo. Si no puedes crear enlaces, usa `bash scripts/link-skills.sh --copy` en una
carpeta limpia. El script conserva las carpetas ajenas.

Las aplicaciones se instalan por separado. Desde la raíz del paquete, ejecuta `codex`
para Codex o `claude --plugin-dir .` para Claude Code. Codex usa `.agents/skills`,
enlazado a `skills/`. En Claude Code, la skill de esa sesión es `/ux-laws:ux-audit`.
Referencias: [skills de Codex](https://learn.chatgpt.com/docs/build-skills) y
[plugins locales de Claude](https://code.claude.com/docs/en/plugins/create).

## Capturar y ver el wireframe

```bash
node scripts/demo.js https://www.banrep.gov.co
node capture/capture.js https://www.banrep.gov.co --out captures/ejemplo
```

El primer comando genera `demo.html`; abre la ruta indicada por la terminal. El segundo
guarda la captura para evaluación. Se usa una pantalla de 1440 × 900, sin scroll. Revisa
sus avisos y la imagen: no tener alertas automáticas no garantiza una página despejada.

## Preparar y cerrar

Declara `RUNTIME`, `MODEL_ID` y `DECODING` con el entorno, el identificador real del modelo
y sus parámetros en JSON. Si el entorno no expone un parámetro, se declara ese límite.

```bash
node scripts/orchestrate.js preparar --captura captures/ejemplo --out corridas/ejemplo --modo referencia --runtime "$RUNTIME" --model-id "$MODEL_ID" --decoding "$DECODING"
node scripts/orchestrate.js verificar --corrida corridas/ejemplo
```

Usa una carpeta nueva para cada corrida. Referencia prepara 35 solicitudes, siete grupos
por cinco repeticiones. Comparación prepara 65, con G4 solo en screenshot. No se envían
solicitudes al modelo durante la preparación. La revisión G3/G6 actual se activa por defecto.

Cada archivo de `solicitudes/` fija su prompt, entrada, esquema, imágenes ordenadas,
atribución y ruta de respuesta. Ejecuta cada solicitud en una sesión nueva, sin otras
respuestas. Guarda el JSON completo con el `run` solicitado. En el libro registra
`contexto_limpio: true` y explica el mecanismo; no lo marques sin haberlo comprobado.

Cuando existan todas las respuestas:

```bash
node scripts/orchestrate.js recoger --corrida corridas/ejemplo
```

Se generan `perfil.json` y `perfil.md`, y en comparación también el CSV de canales.
Si faltan respuestas o alguna es inválida, no se cierra como completo. Los originales
se conservan sin corregirlos ni pedir automáticamente un reemplazo.

## Entender el resultado

La nota es por grupo, de 0 a 4. No se promedian los siete grupos. «No aplica» y abstención
conservan el motivo y no se cuentan como ceros. Con nota se registra la condición que
la sostiene. El [alcance de G3/G6](ALCANCE-G3-G6-05NOV.md) y las [reglas completas](apendice-rubricas.md)
identifican qué versión se está usando.

G6 muestra en el informe cada convención, su resultado, ids, razón y cobertura. Los
criterios indeterminados quedan separados. Su nota global puede quedar vacía; no se
calcula una nota de las convenciones que alcanzaron a verse. El recuento de operaciones
no demuestra que todo el sitio carezca de trabajo innecesario.

G1 sigue como no interpretable v1. La comparación de G2, G3, G5 y G6 declara apoyo textual
de screenshot y no aísla completamente el canal. No se evalúan recorridos ni tiempos.

## Si trabajas desde el repositorio

Los metadatos originales siguen en 0.1.0 por el sello de G1. La entrega se prepara con
`release/version.json` y `release/package-lock.json`, conservando fast-uri 3.1.9.
La raíz usa el archivo histórico de dependencias: para ejecutar el paquete corregido,
instala su ZIP y trabaja desde esa carpeta.

```bash
node scripts/preparar-reglas.js
node scripts/preparar-entrega.js --zip
node scripts/verificar-fuentes-historicas.js
```

Los dos primeros pasos necesitan las dependencias instaladas y LibreOffice para el PDF.
La entrega nueva queda en `dist/`; no reemplaza las anteriores. El último comando
recrea temporalmente el código anterior para verificar G3/G6. No ejecuta modelos ni
recalifica respuestas. El historial y los pilotos no se incluyen en el ZIP de uso.
