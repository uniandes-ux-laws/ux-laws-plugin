# Entrega actualizada

Actualización posterior: la entrega 0.2.1 del 5 de noviembre corrige el aviso de
fast-uri. Ver [el cambio y sus comprobaciones](ACTUALIZACION-DEPENDENCIA-05NOV.md).
Este documento conserva el estado de la entrega 0.2.0.

4 de noviembre de 2026. Cambios locales para que Juan los revise antes de publicar.

## Qué dejamos preparado

Actualizamos el README, la guía de instalación y la lista de revisión. Explican cómo
instalar, ver un wireframe y preparar los siete grupos. También distinguen preparar
solicitudes de ejecutarlas con un modelo. Se revisó la redacción para usar frases
cortas y explicar los pasos sin adornos.

El documento de reglas vuelve a salir de las siete skills actuales. Se generan
Markdown, Word y PDF desde la misma fuente. Se acomodaron las tablas del documento
para que sus cabeceras y columnas coincidan; no se cambiaron los criterios de las
skills. Las copias anteriores están en `dist/reglas-anteriores/`.

La entrega instalable es `dist/ux-laws-0.2.0.zip`. Lleva el código de uso, las ocho
skills —siete grupos y el orquestador—, esquemas, reglas y una guía corta. No lleva
pilotos, capturas del estudio, conversaciones ni dependencias ya instaladas.

## Por qué no cambiamos la versión original del repositorio

`package.json` y su archivo de dependencias forman parte del sello de G1. Se conservan
con sus bytes anteriores. El preparador actualiza solo las copias del paquete a 0.2.0,
junto con el manifiesto de Claude. Esto queda registrado en `entrega.json` para poder
comprobar qué se copió y qué metadatos cambiaron. Todavía no hay tag ni publicación nueva.

La entrega usa protocolo 0.1.0, esquema de resultados 0.2.0, ejecución 1.0.0 y perfil
2.0.0. Cada número corresponde a una parte distinta del proyecto.

## Qué comprobamos

- Las reglas y sus huellas coinciden con las siete skills. Word y PDF se generaron
  desde esas fuentes y se revisaron sus páginas.
- La instalación con `npm ci` se probó en una carpeta temporal fuera del repositorio,
  en este mismo Mac. Se comprobó el enlace de Codex, la captura de páginas locales,
  la geometría y la preparación de 35 y 65 solicitudes, sin respuestas de modelos.
- El validador oficial de Claude aceptó el manifiesto del plugin. Eso comprueba su
  estructura; no es una prueba de evaluación con un modelo de Claude.
- Pasaron las 282 pruebas del proyecto. El registro de pruebas local guarda el recuento
  en `dist/COMPROBACION-ENTREGA.json` junto con las huellas de la entrega.
- Los 5.159 archivos históricos y los diez sellos de pilotos siguen intactos. No se
  cambiaron capturas, resultados ni reglas para acomodar esta entrega.

## Qué sigue pendiente

Juan debe revisar esta entrega antes de publicarla. Falta comprobar la instalación
con otra persona en otro equipo y ejecutar los modelos reales de ambos entornos.
Los pilotos no sustituyen las respuestas de expertos ni el consenso. Según Juan,
el comité de ética ya aprobó el estudio; las respuestas expertas siguen pendientes.
G1 conserva su límite de falta de diferencias entre páginas y su marca no interpretable v1.

`npm ci` también informa un aviso moderado en la dependencia indirecta `fast-uri`
3.1.7. Queda registrado; no se ejecutó `npm audit fix` sobre el archivo sellado ni se
presenta la entrega como libre de avisos de dependencias. Su actualización necesita
una revisión aparte del archivo de dependencias. El aviso está descrito en
[el registro de seguridad de fast-uri](https://github.com/advisories/GHSA-w74x-v6f9-j3xg).

## Archivos principales

- `README.md`, `capture/README.md` y `docs/instalacion.md`: instrucciones actuales.
- `docs/apendice-rubricas.*`: reglas, fuentes y comprobación de sus copias.
- `docs/checklist-release.md`: revisión antes de compartir públicamente.
- `release/version.json`: versión y estado de la entrega.
- `scripts/preparar-reglas.js` y `scripts/preparar-entrega.js`: preparación.
- `scripts/verificar-reglas.js`, `scripts/verificar-entrega.js` y
  `scripts/probar-entrega.js`: comprobaciones locales.

No se hizo commit ni se subió esta actualización a GitHub.
