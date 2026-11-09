# ux-laws 0.2.2

Esta entrega integra el alcance elegido por el equipo para G3 y G6. Permite capturar
una pantalla, generar su wireframe y preparar y recoger evaluaciones de siete grupos.
Está preparada localmente para revisión, sin un tag público nuevo.

## Empezar

Descomprime el ZIP y abre una terminal dentro de su carpeta, donde está `package.json`.
Necesitas Node.js con npm y Chromium de Playwright:

```bash
npm ci
npx playwright install chromium
npm run link
npm run verify
npm test
```

La prueba del paquete usa páginas locales y prepara 35 y 65 solicitudes sin llamar a
modelos. Las aplicaciones de Codex y Claude Code se instalan por separado y requieren
su acceso correspondiente. El ZIP no incluye los pilotos ni las capturas de la tesis.

Desde la carpeta instalada, inicia `codex` para Codex. Para Claude Code:

```bash
claude --plugin-dir .
```

La skill principal en esa sesión es `/ux-laws:ux-audit`. Para ver el wireframe de una página:

```bash
node scripts/demo.js https://www.banrep.gov.co
```

Abre la ruta de `demo.html` indicada por la terminal. La demo no produce puntajes del modelo.
Las [instrucciones de instalación y uso](instalacion.md) explican las evaluaciones.

## Leer la evaluación

Las corridas nuevas usan `alcance-2026-11-05` por defecto. G3 incluye nivel 2 para el caso
completo de seis a ocho unidades organizadas y sin contenido ajeno. G6 conserva su nota
global cuando se puede sostener y añade el detalle de lo evaluado y de lo indeterminado.
Las [reglas de alcance](ALCANCE-G3-G6-05NOV.md) describen las condiciones.

Al cerrar, abre `perfil.md` para leer el resultado o `perfil.json` para consultar los datos.
G6 muestra convenciones cumplidas, incumplidas, no aplicables e indeterminadas, con su
razón y cobertura. Un caso sin nota no es un cero. No se calcula una nota del subconjunto.

G1 sigue marcado como no interpretable v1. G3 conserva otras combinaciones sin regla y
G6 puede abstenerse. Los avisos de captura se conservan. G2, G3, G5 y G6 permiten apoyo
textual de screenshot en wireframe; su comparación no separa completamente el canal.

El [documento de reglas](apendice-rubricas.md), también incluido en Word y PDF, se genera
desde las siete skills. El protocolo base sigue en 0.1.0, el esquema de respuestas en
0.2.0, la ejecución en 1.0.0 y el perfil en 2.1.0. El paquete instalable es 0.2.2.
`entrega.json` conserva los archivos y sus huellas. No edites las copias del documento
por separado; la regeneración requiere LibreOffice y se hace con `npm run appendix`.

La integración no sustituye la validación experta, el consenso ni la evaluación final
con modelos en ambos entornos. Las versiones anteriores mantienen sus resultados.
Licencia MIT. Trabajo de grado de la Universidad de los Andes.
