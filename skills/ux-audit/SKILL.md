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

## El procedimiento, tal como lo ejecuta el código

`scripts/orchestrate.js` tiene dos modos y ninguna lógica de evaluación.

```bash
node scripts/orchestrate.js preparar --url https://ejemplo.com --out corridas/ej --repeticiones 5
node scripts/orchestrate.js preparar --captura captures/G01 --out corridas/G01
node scripts/orchestrate.js recoger  --corrida corridas/G01
```

**`preparar`** captura si hace falta, calcula `measurements.json`, lo valida, escribe un
prompt por grupo y emite el **libro de invocaciones** (`invocaciones.json`): una entrada por
(grupo, canal, repetición) con su `prompt_hash`, su `repetition`, su `model_id`, su `runtime`
y su `captured_at`.

**`recoger`** valida cada salida contra `shared/schemas/group-result.schema.json`, comprueba
que el `group_id`, el `channel`, la `repetition` y el `prompt_hash` coincidan con los que el
libro fijó, y arma el perfil. **Si algo no cuadra, falla ruidoso nombrando el grupo y la
repetición, y no escribe perfil.** No corrige salidas: un orquestador que arregla un
resultado inválido se convierte en el octavo evaluador y nadie sabría que lo es.

## Cada repetición es una invocación con contexto limpio

**Este requisito no es negociable y el código lo verifica.**

Las cinco repeticiones de una misma configuración se ejecutan en **cinco invocaciones
independientes**: el mismo prompt byte a byte —y por tanto el mismo `prompt_hash`—, sin que
ninguna reciba el resultado, el nivel, el `trigger` ni la existencia de las otras.

**Por qué.** Si las cinco comparten contexto, la segunda ve la primera y tiende a repetirla.
Lo que se mediría entonces no es la dispersión del instrumento sino el efecto de anclaje, y
ese sesgo empuja hacia la coincidencia, que es exactamente la dirección de la hipótesis H1 de
`docs/hipotesis-m3.md` —la que la fase 5 existe para falsificar—. Una dispersión de cero
obtenida con contexto compartido no distingue «la rúbrica es determinista» de «las
repeticiones se copiaron».

**Cómo se ejecuta.** Cada invocación se lanza en una sesión o subagente nuevo, con el prompt
que `preparar` dejó en `prompts/`, y escribe su JSON en la ruta que el libro indica. Quien la
ejecuta rellena en la entrada del libro:

```json
"contexto_limpio": true,
"mecanismo_de_aislamiento": "subagente nuevo por invocación; sin transcripción previa en el contexto"
```

**`recoger` rechaza la corrida** si alguna entrada no declara `contexto_limpio: true`, o si lo
declara sin nombrar el mecanismo. Eso último es deliberado: «contexto limpio» sin decir cómo
es una afirmación que nadie puede auditar.

**Lo que esta garantía no cubre, y está declarado en `docs/hipotesis-m3.md`:** el aislamiento
es de contexto y no de modelo, y se verifica por declaración del orquestador, no inspeccionando
el runtime. Quien corra las cinco a mano en una sola sesión y marque `contexto_limpio: true`
produce un libro que miente y nada lo detecta.

## Qué registra el libro, por invocación

| Campo | Qué es |
|---|---|
| `model_id` | Identificador exacto del modelo, no el nombre comercial |
| `prompt_hash` | sha256 del prompt efectivamente enviado. Idéntico en las cinco repeticiones |
| `repetition` | 1 a 5 |
| `runtime` | El runtime de agente que la ejecutó |
| `captured_at` | Fecha de la captura evaluada, no de la invocación |
| `contexto_limpio` | `true` solo si la invocación no vio ninguna otra repetición |
| `mecanismo_de_aislamiento` | **Cómo** se garantizó. Sin esto, `recoger` rechaza |

El perfil que sale de `recoger` reporta, por grupo: los cinco niveles, el **nivel modal**, la
**fracción de corridas en el modo**, el **rango**, cuántos `trigger` distintos aparecieron, y
los criterios que esa corrida necesitó leer del screenshot —con los que decide si la
comparación entre canales de ese puntaje es limpia—.

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
