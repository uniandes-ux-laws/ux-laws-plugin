# ux-laws 0.2.1

Entrega del 5 de noviembre de 2026, preparada para revisión. No se ha publicado una
versión nueva. Este paquete permite capturar una página, generar su wireframe y
preparar y recoger las evaluaciones de los siete grupos de UX.

Esta versión actualiza fast-uri a 3.1.9 para corregir los avisos conocidos de esa
librería. La entrega 0.2.0 se conserva como anterior. [Explicación del cambio](docs/ACTUALIZACION-DEPENDENCIA-05NOV.md).

## Empezar

Descomprime el ZIP y abre una terminal **dentro de esta carpeta**, donde está
`package.json`. Necesitas Node.js con npm; la prueba local se hizo con Node.js 20 y
npm 10. Estos pasos descargan las dependencias y el navegador:

```bash
npm ci
npx playwright install chromium
npm run link
npm run verify
npm test
```

La prueba usa páginas locales y prepara 35 y 65 solicitudes sin llamar a modelos.
Si algo falla, conserva el mensaje y revisa ese paso antes de evaluar una página.
El paquete no incluye las capturas, pilotos ni resultados históricos de la tesis.

Para Codex, abre esta carpeta e inicia `codex`; el enlace de `.agents/skills` apunta
a las skills incluidas. Para Claude Code, desde esta misma carpeta ejecuta:

```bash
claude --plugin-dir .
```

En esa sesión la skill principal es `/ux-laws:ux-audit`. Las dos aplicaciones se
instalan por separado y requieren su acceso correspondiente. La instalación local
no comprueba disponibilidad ni respuestas de sus modelos.

## Ver una página

```bash
node scripts/demo.js https://www.banrep.gov.co
```

La terminal indica dónde quedó `demo.html`. Ábrelo en un navegador para ver la captura,
el wireframe y sus avisos. No es una evaluación del modelo.

Para preparar una evaluación, sigue [instalación y uso](docs/instalacion.md).
Referencia prepara 35 solicitudes por página y entorno; comparación prepara 65,
con cinco repeticiones. G4 usa solo screenshot. La preparación no envía solicitudes.

## Leer los resultados

Los siete grupos usan niveles de 0 a 4. «No aplica» y abstención conservan su motivo
y no cuentan como ceros. G1 lleva la marca «no interpretable v1» porque no distingue
suficientemente entre páginas. Las propuestas de G4 y G5 no son validación experta.
Las advertencias de captura deben revisarse, aunque las comprobaciones de geometría pasen.
G2, G3, G5 y G6 permiten apoyo textual de screenshot en wireframe, por lo que su
comparación no separa completamente el efecto del canal.

Las [reglas](docs/apendice-rubricas.md) también están en Word y PDF dentro de `docs/`.
Salen de los siete archivos `SKILL.md`. No se deben editar las copias por separado.
`entrega.json` registra qué archivos se incluyeron y sus huellas; `npm run verify`
comprueba sus copias. El protocolo sigue en 0.1.0, el esquema en 0.2.0, la ejecución
en 1.0.0 y el perfil en 2.0.0. La versión instalable de este paquete es 0.2.1.

Para regenerar Word y PDF se necesita también LibreOffice en el PATH:
`npm run appendix`. Eso actualiza los documentos, pero no crea una nueva entrega;
para distribuir cambios debe prepararse otro paquete desde el repositorio.

Faltan las respuestas expertas, el consenso y la evaluación final con los modelos
reales de ambos entornos. Ninguna prueba local reemplaza esos resultados.

Fuentes de instalación: [skills de Codex](https://learn.chatgpt.com/docs/build-skills)
y [plugins locales de Claude Code](https://code.claude.com/docs/en/plugins/create).
Licencia MIT. Trabajo de grado de David Hernández, Mateo Rincón y Juan Francisco
Rodríguez, Universidad de los Andes; asesor: Camilo Escobar Velásquez.
