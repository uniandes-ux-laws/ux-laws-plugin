# Integración de G3 y G6

5 de noviembre de 2026. Entrega 0.2.2, guardada en local para revisión de Juan.

## Qué quedó integrado

G3 ya cubre el caso de seis a ocho unidades organizadas, con encabezados y sin
contenido ajeno, siempre que se cumplan las demás condiciones de la rúbrica.
Recibe nivel 2. Los otros casos sin regla conservan la abstención y su motivo.

G6 muestra cada convención, lo que se pudo evaluar y lo que quedó indeterminado,
con sus razones. Mantiene las reglas de su nota global; no calcula una nota para
el subconjunto visible. Cuando falta información, conserva la abstención.

Las corridas nuevas usan estos cambios por defecto. Al cerrar se generan los datos
en `perfil.json` y una lectura más sencilla en `perfil.md`. Son decisiones de los
investigadores solicitadas por Juan, sin atribuir una aprobación a Camilo.
El [documento de alcance](ALCANCE-G3-G6-05NOV.md) explica las condiciones exactas.

## Archivos principales

| Parte | Archivos |
|---|---|
| Reglas | `skills/g3-capacidad-segmentacion/SKILL.md` y `skills/g6-economia-convencion/SKILL.md`. |
| Evaluación y cierre | `scripts/orchestrate.js`, `scripts/alcance-g3-g6.js` y `scripts/perfil-legible.js`. |
| Instrucciones | `skills/ux-audit/SKILL.md`, README, instalación, guía de documentos y checklist. |
| Entrega | `release/`, preparador del paquete y documento de reglas generado en Markdown, Word y PDF. |
| Trabajo anterior | `historial/fuentes-g3-g6-2026-11-05/` y sus verificadores. |
| Comprobación real | `scripts/chequeo-integracion-real.js`, `scripts/verificar-integracion-real.js` y su carpeta en `verificaciones/`. |

El paquete usa versión 0.2.2, el perfil 2.1.0 y el contrato de G3 0.2.0. El contrato
de G6 sigue en 0.1.0. El esquema de respuestas, las mediciones y las dependencias
conservan sus versiones. El ZIP mantiene fast-uri 3.1.9.

## Comprobaciones

- Pasaron las 301 pruebas del código.
- El ZIP se instaló en una carpeta limpia fuera del repositorio. Pasaron la revisión
  de sus 94 archivos, los enlaces de skills, la captura y la preparación de 35 y 65
  solicitudes. Estas últimas pruebas no llaman a modelos.
- La revisión de dependencias terminó con cero avisos conocidos en ese momento.
- Se revisaron las 42 páginas de las reglas. El PDF de entrega coincide página por
  página con el PDF renderizado desde Word.
- Los 5.159 archivos históricos y diez sellos de pilotos siguen intactos. También
  se comprobaron el cierre de G1, los sellos de las pruebas anteriores de noviembre
  y las 236 fuentes archivadas contra tres registros previos.
- La prueba real en Codex completó siete respuestas válidas, sin reintentos, y el
  cierre del perfil. G3 dio 2 en el caso añadido; G6 mostró una convención evaluada,
  dos no aplicables y cinco indeterminadas, conservando su abstención global.

Las comprobaciones guardadas están en
[la carpeta de integración](../verificaciones/integracion-0.2.2-2026-11-05/comprobaciones/).
La prueba con modelo real se describe en
[su informe](../verificaciones/integracion-0.2.2-2026-11-05/INFORME.md).

## Qué significa este cierre

Se integra el funcionamiento de la entrega sin recalificar los pilotos anteriores.
G1 conserva su limitación como instrumento no interpretable v1. G3 todavía puede
abstenerse en otras combinaciones y G6 no demuestra el funcionamiento de todo un sitio.

Faltan la validación experta, el consenso y las mediciones finales de la tesis. Una
prueba funcional pequeña tampoco demuestra estabilidad entre repeticiones ni el
funcionamiento real en ambos entornos. No se hizo commit ni publicación en GitHub.
