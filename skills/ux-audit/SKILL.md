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

`scripts/orchestrate.js` prepara, verifica y recoge ejecuciones. No asigna niveles.
Antes de usar los comandos, declara `RUNTIME`, `MODEL_ID` y `DECODING` con los datos reales
del entorno. No inventes un modelo o sus parámetros para completar la atribución.

```bash
node scripts/orchestrate.js preparar --captura captures/G01 --out corridas/G01 --modo referencia --runtime "$RUNTIME" --model-id "$MODEL_ID" --decoding "$DECODING"
node scripts/orchestrate.js preparar --captura captures/G01 --out corridas/G01-comparacion --modo comparacion --runtime "$RUNTIME" --model-id "$MODEL_ID" --decoding "$DECODING"
node scripts/orchestrate.js verificar --corrida corridas/G01
node scripts/orchestrate.js recoger  --corrida corridas/G01
```

**`preparar`** captura si hace falta, calcula `measurements.json`, lo valida, escribe un
prompt por grupo y emite el **libro de invocaciones** (`invocaciones.json`): una entrada por
(grupo, canal, repetición) con su `prompt_hash`, su `repetition`, su `model_id`, su `runtime`
y su `captured_at`.

Con cinco repeticiones, `--modo referencia` prepara 35 solicitudes: un canal por grupo.
`--modo comparacion` prepara 65: G1, G2, G3, G5, G6 y G7 en ambos canales; G4 solo sobre
screenshot. El modo de referencia sigue siendo el predeterminado. La salida debe estar
vacía: no se sobrescriben solicitudes ni respuestas anteriores.

Cada archivo de `solicitudes/` contiene una sola invocación: prompt, entrada, esquema,
imágenes ordenadas y `run` con la repetición exacta. La imagen principal va primero; el
screenshot de apoyo solo aparece en las solicitudes de wireframe que lo permiten.
Las mediciones nuevas se guardan dentro de la corrida, sin escribir sobre las capturas.

**`verificar`** comprueba el plan y las huellas de los archivos, sin llamar a un modelo.
No demuestra que las respuestas sean válidas: eso corresponde a `recoger`.

**`recoger`** valida cada salida contra `shared/schemas/group-result.schema.json`, comprueba
que el `group_id`, el `channel`, la `repetition` y el `prompt_hash` coincidan con los que el
libro fijó, distingue puntajes, «no aplica» y abstenciones, y arma el perfil.
**Si algo no cuadra, falla nombrando el grupo y la repetición, y no escribe perfil.**
No corrige salidas: un orquestador que arregla un
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

**Cómo se ejecuta.** Cada invocación se lanza en una sesión o subagente nuevo. Carga solo su
archivo individual de `solicitudes/`, el prompt y las imágenes que enumera, en ese orden.
Entrega también su `run` exacto: no se infiere del nombre del modelo ni de otras repeticiones.
La respuesta completa se conserva en la ruta indicada. Quien la ejecuta rellena en el libro:

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

El perfil conserva por repetición el estado, el resultado y su motivo. Distingue:

- **Puntaje:** nivel de 0 a 4 y su `trigger`. Puede llevar una advertencia de evidencia insuficiente.
- **No aplica:** se cumple la condición objetiva de la rúbrica; `not_applicable: true`,
  `score: null`, `trigger: null` y la razón en `na_reason`.
- **Abstención:** el grupo sí aplica, pero falta evidencia o una combinación no tiene nivel
  definido en la rúbrica. Usa `not_applicable: false`, `score: null`, `trigger: null`,
  `evidence_insufficient: true` y la razón en `measurements.motivo_abstencion`.
  No inventes un puntaje ni nuevas reglas de abstención donde el contrato no las permite.

La moda, el rango y los triggers distintos se calculan solo con puntajes. La fracción en
el modo divide entre todas las repeticiones previstas, incluidas NA y abstenciones.
Sin puntajes, moda, fracción y rango son nulos. Una serie mixta o con menos de cinco
puntajes no se presenta como estable. También se conservan los criterios leídos del screenshot.

**G1 queda marcado como «no interpretable v1» en el perfil y en la tabla.** No distingue
suficientemente entre las páginas del piloto; sus niveles son diagnósticos. Para las
ejecuciones nuevas recibe una copia de entrada 1.0.7: con cero o un grupo devuelve NA,
como exige su rúbrica. La fuente 1.0.6 y el resultado histórico de C13 se conservan.
No cambies los cortes para producir niveles distintos.

## Qué hace

1. **Captura.** Si la entrada es una URL, ejecuta `capture/capture.js` con viewport fijo
   1440 × 900 y solo lo visible sin scroll. Produce `screenshot.png`, `wireframe.png`,
   `nodes.json` y `meta.json`. Si la entrada ya es un directorio de captura, lo usa.
   Lee las advertencias de captura que el orquestador incluye en las entradas y en el
   perfil. Una marca antigua de «limpio» o una cobertura alta no confirma que la página
   esté despejada. Si falta comprobarla, decláralo; si el aviso tapa evidencia, sigue el
   manejo de límites de la rúbrica. No bajes el nivel automáticamente por la advertencia.
   Las imágenes que no coinciden con sus huellas detienen la preparación o el cierre.

2. **Invoca cada grupo en su canal.** G4 solo sobre el screenshot. G1, G2, G3, G5, G6 y G7
   sobre el wireframe, y —cuando la corrida es de la grilla completa— también sobre el
   screenshot, que es lo que hace medible el término de representación.

3. **Valida cada salida** contra `shared/schemas/group-result.schema.json`, el estado y el
   contrato del grupo. Conserva las respuestas rechazadas con su motivo; detén el cierre
   sin sustituirlas ni pedir otra respuesta para la misma posición automáticamente.

4. **Arma el perfil.** Los siete puntajes con sus condiciones disparadas y sus valores
   crudos. Sin promedio entre grupos: el perfil es el resultado, por la razón que está en
   `shared/escala.md`.

## Qué no hace

- **No promedia los siete en un número.** Si se pide un total, se emite con la ponderación
  declarada y con la advertencia de que G7 subsume una ley y G1 subsume cuatro.
- **No inventa un puntaje cuando el grupo no aplica.** Devuelve `not_applicable` con la
  condición objetiva que se cumplió.
- **No repara una rúbrica sobre la marcha.** Si una respuesta es inválida, informa el
  problema sin cambiar la respuesta ni la validación para aceptarla.

## Salida

`perfil.json` reúne la metadata de captura y el resumen de los siete grupos. Los resultados
originales siguen en `resultados/`; el perfil añade los estados y sus recuentos sin
reescribirlos. Si el cierre falla, un perfil anterior se conserva con una advertencia
en la terminal: no debe presentarse como actualizado.

En modo comparación hay 13 series de grupo y canal, sin mezclar sus repeticiones. El
perfil añade seis comparaciones por pares y `comparacion-canales.csv`; G4 no tiene par.
Se conservan NA, abstenciones, ceros y motivos por separado. G1 mantiene su limitación.
El apoyo textual de screenshot se declara: esos pares no aíslan el efecto de la
representación. Un resultado igual entre canales no prueba validación experta.

Para preparar las 30 páginas en dos runtimes, consulta
[`docs/OPCIONES-EJECUCION-04NOV.md`](../../docs/OPCIONES-EJECUCION-04NOV.md).

## Nota sobre repeticiones

Una sola corrida reporta una muestra de una distribución cuya dispersión es desconocida:
los modelos de lenguaje producen salidas distintas ante entradas idénticas, incluso a
temperatura baja. El protocolo fija cinco repeticiones por configuración, y la dispersión
se reporta junto a cada agregado. Un grupo cuyo puntaje se mueve entre repeticiones de la
misma página se registra como inestable, y eso es un hallazgo sobre el instrumento, no un
problema a esconder.
