---
name: ux-audit
description: Orquesta la evaluación completa de una página web contra las dieciocho Laws of UX implementadas. Captura la página, genera las dos representaciones, invoca las siete skills de grupo en el canal que corresponde a cada una y arma el perfil por constructo. Úsala cuando se pida evaluar la UX de una URL o de una captura ya existente.
license: MIT
compatibility: ">=1.0"
metadata:
  role: orchestrator
  groups: 7
  laws: 18
  protocol_version: 0.1.0
allowed-tools: Read, Bash
---

# ux-audit · orquestador

Evalúa una página contra los siete grupos de constructo y devuelve el perfil. No contiene
lógica de evaluación: todo juicio vive en la rúbrica de su grupo. Mover un juicio aquí lo
sacaría del instrumento congelado y del artefacto que el lector instala.

## Qué hace

1. **Captura.** Si la entrada es una URL, ejecuta `capture/capture.js` con viewport fijo
   1440 × 900 y solo lo visible sin scroll. Produce `screenshot.png`, `wireframe.png`,
   `nodes.json` y `meta.json`. Si la entrada ya es un directorio de captura, lo usa.

2. **Invoca cada grupo en su canal.** G4 solo sobre el screenshot. G1, G2, G3, G5, G6 y G7
   sobre el wireframe, y —cuando la corrida es de la grilla completa— también sobre el
   screenshot, que es lo que hace medible el término de representación.

3. **Valida cada salida** contra `shared/schemas/group-result.schema.json`. Un resultado
   sin `measurements` o sin `trigger` se rechaza y se vuelve a pedir; no se acepta un
   puntaje que no se pueda auditar.

4. **Arma el perfil.** Los siete puntajes con sus condiciones disparadas y sus valores
   crudos. Sin promedio entre grupos: el perfil es el resultado, por la razón que está en
   `shared/escala.md`.

## Qué no hace

- **No promedia los siete en un número.** Si se pide un total, se emite con la ponderación
  declarada y con la advertencia de que G7 subsume una ley y G1 subsume cuatro.
- **No inventa un puntaje cuando el grupo no aplica.** Devuelve `not_applicable` con la
  condición objetiva que se cumplió.
- **No repara una rúbrica sobre la marcha.** Si un grupo devuelve algo que el esquema
  rechaza dos veces seguidas, lo reporta como fallo de corrida en vez de ablandar la
  validación.

## Salida

Un objeto con la metadata de captura y un arreglo de los siete resultados de grupo, cada
uno conforme al esquema. Toda cifra agregada viaja junto a los datos por caso que la
componen, de modo que cualquier número reportado se puede rastrear sin volver a invocar un
modelo.

## Nota sobre repeticiones

Una sola corrida reporta una muestra de una distribución cuya dispersión es desconocida:
los modelos de lenguaje producen salidas distintas ante entradas idénticas, incluso a
temperatura baja. El protocolo fija cinco repeticiones por configuración, y la dispersión
se reporta junto a cada agregado. Un grupo cuyo puntaje se mueve entre repeticiones de la
misma página se registra como inestable, y eso es un hallazgo sobre el instrumento, no un
problema a esconder.
