# Informe: resumen en lenguaje claro y prueba de humo en Claude Code, 13 nov. 2026

Encargo del 13 de noviembre. Commits locales, sin push. Base: `59304c6`. Cabeza al escribir
este informe: `af99fb2`; este informe va en un commit propio encima.

## 1. Lo primero que debo saber

- **`recoger` escribe `resumen.md`** sin llamar a un modelo, byte a byte igual entre cierres y sin cambiar `perfil.json` ni `perfil.md`. El diccionario `shared/lenguaje-claro.json` cita cada texto con su línea de la rúbrica, y una prueba lo comprueba. Ningún archivo sellado cambió.
- **La skill se activa sola con frase libre** («evalúa la UX de …», «revisa esta página con las Laws of UX: …»): el modelo llamó a `Skill ux-laws:ux-audit` en las tres sesiones. Pero en `claude -p` con permisos por defecto esa llamada quedó **denegada**, así que no pasó de ahí. **No verifiqué que una conversación nueva complete la corrida sola.** La corrida de humo la orquesté yo desde esta sesión, con un subagente nuevo por solicitud.
- **El humo cerró:** 7/7 respuestas válidas, `recoger` exit 0 y `resumen.md` escrito. Hubo dos fallos previos, conservados (CAPTCHA en banrep; límite de uso con `claude-fable-5-2`). **La captura de uniandes tiene un banner de cookies que el detector no registró.** Los siete grupos se evaluaron con el banner encima.
- **El humo encontró dos defectos del resumen**, corregidos con prueba en `1d0a10d` y `2dd0b61`: un trigger «C3, C4» salía como «sin explicación», y la línea de parámetros se leía mal.
- **Contradicción con el prompt:** el prompt da por firme que no hay total. `skills/ux-audit/SKILL.md:157-158`, `shared/escala.md:21-22` y `13-usage.tex:135-140` permiten un total si se pide, con su advertencia. `resumen.md` no emite total en ningún caso, así que cumple las dos versiones; la diferencia queda para que la decidan.
- **Error de procedimiento mío:** seguí `docs/instalacion.md` en un clon del repositorio, pero ese documento describe el **ZIP 0.2.2** (`docs/instalacion.md:9`). Allí `npm run verify` y `npm test` sí existen. El ZIP no está en este equipo y no pude reconstruirlo (§6).

## 2. Lo que cambió

```text
af99fb2 Guardar la prueba de humo de la skill en Claude Code del 13 nov.
2dd0b61 Decir en una frase que el runtime no expone los parámetros de generación
1d0a10d Explicar en el resumen los triggers que nombran varias condiciones
c6a7f81 recoger escribe resumen.md junto a perfil.json y perfil.md
3491444 Generar el resumen en lenguaje claro desde el perfil y un diccionario verificable
48c77ac Planear el resumen en lenguaje claro antes de programarlo
```

| Commit | Qué hace | Por qué |
|---|---|---|
| `48c77ac` | `docs/PLAN-RESUMEN-CLARO.md`: decisión, alternativas descartadas, pruebas y límites | El encargo pedía el plan antes del código |
| `3491444` | `shared/lenguaje-claro.json` (diccionario 1.0.0 con procedencia por línea), `scripts/resumen-claro.js`, sus pruebas y `docs/ejemplo-resumen-integracion.md` | Texto determinista y auditable: un modelo que redactara el resumen sería un octavo evaluador |
| `c6a7f81` | `recoger` escribe `resumen.md` después de `perfil.md`; si falla, avisa y deja el perfil escrito. `preparar-entrega.js` incluye el script nuevo | El resumen no puede impedir que se cierre una corrida válida |
| `1d0a10d` | Un trigger con varias condiciones («C3, C4») se explica condición por condición; una parte desconocida sigue mostrando su código | Defecto encontrado en el humo: G1 devolvió «C3, C4» y el resumen decía «sin explicación disponible» |
| `2dd0b61` | «Parámetros de generación del modelo: no expuesto por el runtime.» en lugar de «declarado = …»; se regenera el ejemplo de integración por esa línea | Defecto de redacción encontrado en el humo |
| `af99fb2` | `verificaciones/humo-claude-code-2026-11-13/`: corrida, intentos fallidos, registros y LEEME | El encargo pedía guardarla fuera de `corridas/` y etiquetada como humo |

Archivos fuera de la carpeta del humo (criterio 8):

```text
 docs/PLAN-RESUMEN-CLARO.md          |   79 ++++
 docs/ejemplo-resumen-integracion.md |  178 ++++++++
 scripts/orchestrate-resumen.test.js |   75 +++
 scripts/orchestrate.js              |   15 +
 scripts/preparar-entrega.js         |    2 +-
 scripts/resumen-claro.js            |  355 +++++++++++++++
 scripts/resumen-claro.test.js       |  246 ++++++++++
 shared/lenguaje-claro.json          | 1875 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 8 files changed, 2824 insertions(+), 1 deletion(-)
```

## 3. Resultados de las pruebas

En HEAD `af99fb2`. Las pruebas de captura necesitan Chromium. En este equipo la caché por
defecto (`%LOCALAPPDATA%\ms-playwright`) no tiene `chromium_headless_shell-1243`: sin
`PLAYWRIGHT_BROWSERS_PATH`, 14 pruebas de captura fallan con «Executable doesn't exist».
Corrí todo con `PLAYWRIGHT_BROWSERS_PATH` apuntando a la carpeta aislada donde instalé
Chromium para esta auditoría.

**Copia de trabajo (Windows, `core.autocrlf=true`).** La única falla, `entrega.test.js:65`,
es la conocida: el `package-lock.json` histórico llega con CRLF y el preparador lo da por
cambiado. No la causa este trabajo: con LF pasa.

<details><summary><code>npm run validate</code></summary>

```text
$ npm run validate

> ux-laws-plugin@0.1.0 validate
> node scripts/validate-result.js --selftest

ok     resultado válido -> true (esperado true)
ok     sin trigger -> false (esperado false)
ok     sin measurements -> false (esperado false)
ok     N/A con razón -> true (esperado true)
ok     N/A sin razón -> false (esperado false)
ok     score fuera de 0-4 -> false (esperado false)
ok     grupo inexistente -> false (esperado false)
ok     repetición fuera de 1-5 -> false (esperado false)
ok     hash de prompt mal formado -> false (esperado false)
ok     campo extra no declarado -> false (esperado false)
ok     sin decoding -> false (esperado false)
ok     sin capture_sha256 -> false (esperado false)
ok     sin measurements_version -> false (esperado false)
ok     sin protocol_version -> false (esperado false)
ok     model_id marcador de posición -> false (esperado false)
ok     model_id nombre comercial con espacios -> false (esperado false)
ok     capture_sha256 como cadena suelta -> false (esperado false)
ok     capture_sha256 sin el wireframe -> false (esperado false)
ok     sin model_id -> false (esperado false)
ok     sin prompt_hash -> false (esperado false)
ok     sin repetition -> false (esperado false)
ok     sin runtime -> false (esperado false)
ok     sin captured_at -> false (esperado false)
ok     sin run -> false (esperado false)
ok     sin score -> false (esperado false)
ok     decoding vacío -> false (esperado false)
ok     model_id marcador pendiente -> false (esperado false)
ok     model_id marcador PENDIENTE -> false (esperado false)
ok     model_id marcador tbd -> false (esperado false)
ok     model_id marcador TBD -> false (esperado false)
ok     model_id marcador por-definir -> false (esperado false)
ok     model_id marcador POR-DEFINIR -> false (esperado false)
ok     model_id marcador na -> false (esperado false)
ok     model_id marcador NA -> false (esperado false)
ok     model_id marcador n/a -> false (esperado false)
ok     model_id marcador N/A -> false (esperado false)
ok     model_id marcador none -> false (esperado false)
ok     model_id marcador NONE -> false (esperado false)
ok     model_id marcador null -> false (esperado false)
ok     model_id marcador NULL -> false (esperado false)
ok     model_id marcador modelo -> false (esperado false)
ok     model_id marcador MODELO -> false (esperado false)
ok     model_id marcador model -> false (esperado false)
ok     model_id marcador MODEL -> false (esperado false)
ok     model_id marcador claude -> false (esperado false)
ok     model_id marcador CLAUDE -> false (esperado false)
ok     model_id marcador gpt -> false (esperado false)
ok     model_id marcador GPT -> false (esperado false)
ok     model_id marcador opus -> false (esperado false)
ok     model_id marcador OPUS -> false (esperado false)
ok     model_id marcador sonnet -> false (esperado false)
ok     model_id marcador SONNET -> false (esperado false)
ok     model_id marcador haiku -> false (esperado false)
ok     model_id marcador HAIKU -> false (esperado false)
ok     model_id marcador gemini -> false (esperado false)
ok     model_id marcador GEMINI -> false (esperado false)
ok     model_id marcador llama -> false (esperado false)
ok     model_id marcador LLAMA -> false (esperado false)
ok     model_id formato "test-model-1.0" -> true (esperado true)
ok     model_id formato "vendor/model-2026-10-06" -> true (esperado true)
ok     model_id formato "region.provider.model-v2:1" -> true (esperado true)
ok     model_id formato "TEST-MODEL-1" -> true (esperado true)
ok     model_id formato "test-model" -> false (esperado false)
ok     model_id formato "model2026" -> false (esperado false)
ok     model_id formato "m-1" -> false (esperado false)
ok     model_id formato "test model 1" -> false (esperado false)
ok     model_id formato " test-model-1" -> false (esperado false)
ok     model_id formato "test-model-1 " -> false (esperado false)
ok     model_id formato "test-model-1\n" -> false (esperado false)
ok     model_id formato "test-model-1\r\n" -> false (esperado false)
ok     model_id formato "test-model-1$" -> false (esperado false)

71/71 casos correctos.
exit=0
```
</details>

<details><summary><code>node --test</code> (copia de trabajo)</summary>

```text
$ node --test   (PLAYWRIGHT_BROWSERS_PATH=<carpeta aislada>)
✔ una captura real conserva atributos de estado y normaliza controles de G2/G7 (5565.8936ms)
✔ sin alertas exige una revisión completa, no solo el limpio antiguo (1.8305ms)
✔ Bancolombia conserva el registro antiguo y muestra la observación posterior (7.1268ms)
✔ las observaciones se aplican por la imagen, no por el nombre de la carpeta (7.372ms)
✔ una capa detectada antes impide presentar la captura como despejada (0.4905ms)
✔ una capa detectada despues impide presentar la captura como despejada (0.3269ms)
✔ errores, descarte desactivado y falta de revisión no se convierten en limpio (1.3474ms)
✔ el contenido de un marco no se declara revisado (0.4667ms)
✔ una versión escrita sin el resultado de las comprobaciones no acredita limpieza (0.4462ms)
✔ metadatos ilegibles, nodos ausentes e imágenes cambiadas dejan advertencia (29.5557ms)
✔ detecta un diálogo pequeño con role="dialog" fuera de los puntos centrales (2167.22ms)
✔ detecta un diálogo pequeño con role="alertdialog" fuera de los puntos centrales (706.2656ms)
✔ detecta un diálogo pequeño con aria-modal="true" fuera de los puntos centrales (819.1714ms)
✔ no confunde un encabezado, un chat o un contenedor transparente con un aviso (739.1725ms)
✔ no cuenta diálogos ocultos, fuera del viewport o dentro de un padre invisible (268.6319ms)
✔ distingue un dialog nativo abierto de uno cerrado (350.2759ms)
✔ una superficie visible no deja de tapar por tener pointer-events none (285.0107ms)
✔ detecta una franja de cookies y conserva el catálogo para cerrarla (1170.4783ms)
✔ cuenta marcos visibles cuyo contenido no se revisó (220.8089ms)
▶ capturar conserva capas no cerradas, errores y descarte desactivado como advertencias
  ✔ sin_control (1163.1309ms)
  ✔ sin_descarte (975.8702ms)
  ✔ error (1192.5293ms)
✔ capturar conserva capas no cerradas, errores y descarte desactivado como advertencias (3367.6261ms)
✔ un aviso aparecido entre screenshot y snapshot queda marcado (1372.6786ms)
▶ wireframes distinguish images with X markers in both rendering modes
  ✔ perceptual (3400.7243ms)
  ✔ every-layout-box (1370.2515ms)
✔ wireframes distinguish images with X markers in both rendering modes (6470.688ms)
✔ raíces con listeners no crean opciones ni objetivos de clic (41.3342ms)
✔ controles nativos, enlaces y roles se reconocen sin bandera del motor (25.7387ms)
✔ texto, raíces ARIA no operables y enlaces sin destino ni listener no son controles (4.9455ms)
✔ un icono con clic dentro de un enlace se mide con la caja del enlace (19.1995ms)
✔ contenedores con varios controles no inflan el conteo ni la dominancia (20.3696ms)
✔ un control explícito y otro explícito anidado conservan identidades distintas (1.878ms)
✔ una tarjeta personalizada sin controles internos sigue siendo un objetivo (1.07ms)
✔ cadena genérica de una rama conserva la caja exterior y registra el supuesto (1.4005ms)
✔ varias ramas personalizadas permanecen separadas del contenedor común (1.0651ms)
✔ hermanos no se fusionan por URL ni geometría iguales (1.0444ms)
✔ un widget compuesto con componentes no añade un objetivo exterior (0.9035ms)
✔ geometría inválida, área cero e inputs ocultos se excluyen (1.102ms)
✔ se conserva la caja completa de objetivos parcialmente visibles (0.7546ms)
✔ estados explícitamente inactivos se excluyen sin inventar estados ausentes (0.7895ms)
✔ G2 exige tinta visible y G7 conserva el área de clic (27.7975ms)
✔ G2 reparte cada opción una vez entre sus grupos visibles (34.0273ms)
✔ G7 aplica holgura a un objetivo pequeño aislado sin colisión con raíces (16.6361ms)
✔ G7 detecta colisión de círculos de holgura entre objetivos pequeños (19.1882ms)
✔ G7 cuenta pares adyacentes afectados, no sus dos extremos (44.9914ms)
✔ G7 conserva los umbrales exactos de 24, 32 y 8 px (78.95ms)
✔ G7 conserva la tolerancia de 2 px por familia (79.6378ms)
✔ G7 verifica el ancho y la altura de la familia aunque la dimensión menor sea igual (98.785ms)
✔ G7 informa la tinta reducida sin usarla como área de clic ni inventar tinta ausente (19.1175ms)
✔ G7 distingue falta de pares o familias de una proporción impecable (28.4277ms)
✔ G7 acepta círculos de holgura tangentes sin cambiarlos por solapamiento (53.2421ms)
✔ G7 conserva la separación sin redondear para explicar el umbral de 8 px (15.1988ms)
✔ el inventario es estable aunque cambie el orden del archivo de nodos (1.1943ms)
✔ ids duplicados y ciclos de ancestros se rechazan explícitamente (2.7169ms)
✔ las capturas antiguas declaran la ausencia de metadatos de estado (0.9334ms)
✔ fragmentos decorativos del mismo nodo y controles idénticos no se cuentan dos veces (0.6657ms)
✔ un fieldset deshabilitado conserva la excepción de su primera leyenda (0.9716ms)
✔ G1 prepara una copia con 0 grupos sin cambiar la fuente (6.1089ms)
✔ G1 prepara una copia con 1 grupos sin cambiar la fuente (0.7728ms)
✔ G1 prepara una copia con 2 grupos sin cambiar la fuente (0.6558ms)
✔ G1 no confunde un conteo ausente o inválido con cero grupos (1.4615ms)
✔ G1 rechaza cambiar el conteo o la aplicabilidad recibidos (1.0165ms)
✔ G3 conserva MAIN de pantalla completa y atraviesa envoltorios transparentes (10.4592ms)
✔ G3 no recorta listas de candidatos a 40 ni calcula B sobre envoltorios (5.9772ms)
✔ G6 conserva logos fuera de la posición esperada y encuentra el enlace real (5.0405ms)
✔ G6 no llama vacíos a imágenes, campos, botones ni contenedores con texto retenido (1.8278ms)
✔ G6 limita candidatos a tinta visible y exige pares de botones vecinos sin solaparse (1.3144ms)
✔ un error de área decimal no convierte una caja interior en recortada (4.0934ms)
✔ se mantienen recortes reales, incluso menores de un píxel (0.9507ms)
✔ la proyección solo cambia parcial, clases de banner y la versión declarada (17.3108ms)
✔ incluye pares de dos elementos y preserva todos los miembros (18.1811ms)
✔ no convierte fragmentos ni pseudoelementos en conjuntos (1.574ms)
✔ excluye regiones hijas de BODY, conservando el límite raíz virtual (2.0995ms)
✔ no trunca a ocho conjuntos ni a veinte miembros (73.6682ms)
✔ usa la mediana convencional para conjuntos pares (0.6782ms)
✔ mide solo píxeles visibles y declara cajas parciales (2.1342ms)
✔ el proxy RGB no se interpreta como contraste de legibilidad (1.353ms)
✔ la franja inferior no se marca como banner superior; sin truncación (122.3113ms)
✔ contiene_accionables usa pertenencia retenida, no simple solapamiento (11.3258ms)
✔ menú de LI de alturas distintas alineado por el centro (12.2428ms)
✔ columna de anchos distintos alineada por el centro (1.1872ms)
✔ fila alineada por el borde inferior (0.9309ms)
✔ texto y pseudoelementos no constituyen listas (1.1104ms)
✔ párrafos alineados sin opciones no constituyen listas (1.1272ms)
✔ opciones de A y BUTTON hermanos forman una sola secuencia (1.4334ms)
✔ tarjetas con controles pueden ser opciones; un título sin control queda fuera (1.1769ms)
✔ geometría sin alineación no se convierte en lista (0.5674ms)
✔ tolera cuatro píxeles, sin ampliar el umbral (0.8676ms)
✔ declara recorte y solapamiento sin sustituir ink por bounds (1.1811ms)
✔ no trunca a ocho listas ni duplica registros (1.2988ms)
✔ regiones hermanas de BODY no forman una lista de opciones (0.7255ms)
✔ una lista sin padre retenido tiene identidad propia y declara raíz virtual (0.5818ms)
✔ G5 mide el extremo final contra su vecino, no contra el segundo elemento (110.2134ms)
✔ G5 conserva separaciones iguales en una lista equidistante (30.1704ms)
✔ G5 calcula ambos extremos cuando la lista tiene tres elementos (42.0232ms)
✔ G5 mide la separación de listas verticales (40.415ms)
✔ G5 mide sobre ink aunque las cajas de layout sean más grandes (33.4355ms)
✔ G5 devuelve distancia cero para extremos que tocan o solapan al vecino (42.929ms)
✔ G5 conserva la precisión de una décima de píxel (46.3567ms)
✔ G5 no crea una lista con menos de tres elementos (53.3458ms)
✔ G5 usa la mediana de los dos interiores, sin sesgo al mayor (42.0628ms)
✔ la propuesta cubre seis, siete y ocho sin cambiar la regla histórica (10.1056ms)
✔ los límites de cinco, nueve y trece conservan sus condiciones (8.3363ms)
✔ un dato fuera de vista o una mezcla conservan prioridad sobre la regla añadida (2.0468ms)
✔ la regla nueva necesita un inventario y unidades completos (1.904ms)
✔ adoptar la revisión conserva la lógica comprobada en la propuesta (6378.9001ms)
✔ una discrepancia se informa sin corregir el nivel del modelo (1.4409ms)
✔ G6 conserva las categorías y la abstención, sin puntuar el subconjunto (1.8131ms)
✔ G6 distingue la ausencia confirmada de aplicabilidad de la incertidumbre (1.3228ms)
✔ G6 conserva un cero confirmado aunque queden otras convenciones desconocidas (0.8022ms)
✔ un catálogo duplicado no puede producir un diagnóstico (1.8648ms)
✔ la demo avisa si una capa sigue abierta aunque otra haya cerrado (57.1539ms)
✔ el reporte usa el registro de la captura y muestra el aviso fuera de las notas plegadas (784.3421ms)
✔ los siete prompts y la entrada de G4 reciben el aviso sin reescribir L02 (4075.4971ms)
✔ una imagen que no coincide con su huella impide preparar nuevas evaluaciones (1125.6723ms)
✔ El apéndice conserva el cuerpo de las siete rúbricas y sus fuentes (64.7339ms)
✔ El documento alinea cabeceras antiguas sin cambiar las celdas de las reglas (0.8321ms)
✔ La comprobación rechaza reglas o documentos cambiados (248.1517ms)
✖ La entrega actualiza solo copias, incluye dependencias locales y detecta cambios (290.2527ms)
✔ La entrega admite solo el cambio de fast-uri y su versión de instalación (30.9107ms)
✔ La entrega rechaza una versión antigua o no registrada de fast-uri (6.1046ms)
✔ No se prepara un paquete con reglas desactualizadas (229.3318ms)
✔ El enlace de Codex admite repetición y copia sin borrar contenido ajeno (7203.349ms)
✔ distingue un cero, un no aplica y una abstención (12.6868ms)
✔ una advertencia de evidencia no borra el puntaje recibido (1.4287ms)
✔ rechaza NA con puntaje (1.2732ms)
✔ rechaza NA con trigger (1.7055ms)
✔ rechaza NA sin razón (0.6531ms)
✔ rechaza NA con motivo de abstención (0.8199ms)
✔ rechaza abstención sin advertencia (0.5444ms)
✔ rechaza abstención sin motivo (0.4499ms)
✔ rechaza abstención con razón de NA (0.5167ms)
✔ rechaza puntaje con motivo de abstención (0.8339ms)
✔ rechaza puntaje sin trigger (0.4593ms)
✔ rechaza nivel fuera de escala (0.471ms)
✔ los esquemas de los trece pares de grupo y canal compilan sin cambiar los originales (2149.8143ms)
✔ la adaptación de canal valida una copia y no corrige la respuesta ni sus cifras (101.9396ms)
✔ la comparación conserva NA, abstenciones y ceros como estados distintos (6.9344ms)
✔ las fuentes archivadas coinciden con los registros anteriores (1152.2073ms)
✔ la verificación anterior usa su fuente archivada y no sustituye su huella por la actual (10.393ms)
✔ un cambio de una copia histórica se detecta sin cambiar el archivo original (39.2949ms)
✔ detecta NA y C1 sin base sin reemplazar el puntaje histórico (4.8387ms)
✔ una variación de afectados no pasa como diferencia de redondeo (7.5453ms)
✔ el CSV conserva el cero, los nulos vacíos y la limitación en la misma fila (2.1394ms)
✔ el verificador de integridad rechaza una fuente alterada (29.9709ms)
✔ quitar una fila del sello no deja pasar una lista incompleta (13.6653ms)
✔ G3 conserva los huecos de las anclas y prioriza dependencia de datos visible (29.1548ms)
✔ la unión de áreas no duplica cajas superpuestas (0.8859ms)
✔ G3 rechaza ids y conteos inventados sin alterar la respuesta (19.2202ms)
✔ un desacuerdo con el ancla se conserva y se audita separado del transporte (1.3819ms)
✔ G3 no convierte falta de región en NA (0.9457ms)
✔ un ancestro sin tinta no rompe la atribución de unidades a su región (1.6615ms)
✔ G6 no trata una convención indeterminada como cumplida ni no aplicable (1.2988ms)
✔ G6 distingue mayoría, caso aislado y combinación de R no cubierta (0.9078ms)
✔ G6 acepta una respuesta trazable y una abstención por aplicabilidad desconocida (17.0939ms)
✔ un aviso superpuesto dentro de la región no queda fuera por tener otro padre DOM (9.971ms)
✔ las tres combinaciones nuevas tienen ancla previa sin inferir P para dos (22.6385ms)
✔ se preservan la prioridad de Bn y las condiciones de los niveles altos (1.077ms)
✔ el validador conserva la respuesta y rechaza datos inventados o una regla incoherente (24.7106ms)
✔ una coincidencia de nivel no oculta discrepancia en Bn o Cn (9.1688ms)
✔ una abstención o NA no coincide con un puntaje numérico esperado (1.3139ms)
✔ la ausencia de selección y de trigger no cuenta como otro conjunto ni como otra regla (2.7285ms)
✔ cobertura informa diferencias de trigger y de competencia aunque coincida el nivel (5.4241ms)
✔ NA y cero se comparan como resultados distintos (0.6559ms)
✔ P10 mantiene sus límites y no entra en coincidencia de nivel (1.4306ms)
✔ un criterio de progreso distinto no se oculta por coincidir en puntaje (0.8003ms)
✔ la proyección retira solo las clases, sin modificar medidas ni el original (7.4293ms)
✔ nombres sin paso actual reciben nivel 1 y G_actual, sin inventar orientación (1.2038ms)
✔ el final que compite no eleva a cuatro aunque esté diferenciado (0.8068ms)
✔ un final destacado no compensa la falta de indicador ni la dependencia del color (1.1788ms)
✔ el contrato nuevo rechaza un trigger viejo sin normalizar ni tocar el original (20.0235ms)
✔ dos mediciones de la misma captura tienen la misma huella aunque difiera medido_en (1596.4432ms)
✔ un cambio de contenido cambia la huella; una marca de tiempo no (7.0393ms)
✔ la opción prepara una fase identificada y añade diagnósticos sin cambiar los puntajes (6730.109ms)
✔ cierra los siete grupos con 1 repetición, aunque sus puntajes coincidan (2906.7416ms)
✔ cierra los siete grupos con 5 repeticiones, aunque sus puntajes coincidan (1513.3837ms)
✔ rechaza el libro incompleto que antes dejaba seis grupos sin respuestas (1176.7249ms)
✔ rechaza una repetición duplicada aunque la cantidad total de filas sea correcta (1013.2125ms)
✔ rechaza ids repetidos en grupos distintos (713.8218ms)
✔ rechaza dos entradas que apuntan al mismo archivo con rutas distintas (761.2325ms)
✔ también detecta un archivo repetido a través de un enlace simbólico (1101.6722ms)
✔ rechaza un resultado extra que no está registrado en el libro (1119.38ms)
✔ rechaza un enlace extra aunque apunte a un resultado registrado (956.8432ms)
✔ un enlace roto se informa como resultado faltante (865.124ms)
✔ acepta una carpeta enlazada cuando cada resultado sigue siendo distinto (650.0152ms)
✔ informa si resultados dejó de ser una carpeta (409.4303ms)
✔ rechaza la ausencia de un archivo de resultado sin modificar los demás (407.2172ms)
✔ rechaza un grupo o canal que no pertenece al plan actual (401.8044ms)
✔ rechaza una repetición fuera de las declaradas (388.0495ms)
✔ exige el mismo prompt entre repeticiones de un grupo (434.7048ms)
✔ informa un libro o un resultado con JSON ilegible (759.4835ms)
✔ rechaza un libro vacío, repeticiones fraccionarias y entradas mal formadas (1457.2375ms)
✔ rechaza una entrada sin ruta y una lista vacía (753.6706ms)
✔ comprueba la fecha de captura y los parámetros de la respuesta (762.1474ms)
✔ acepta las mismas propiedades aunque cambie su orden en el JSON (416.0874ms)
✔ ordena las cinco respuestas por repetición al armar el perfil (578.2381ms)
✔ conserva el perfil anterior y avisa cuando un cierre nuevo falla (820.891ms)
✔ preparar no convierte una cantidad inválida de repeticiones en un entero válido (719.3369ms)
✔ cinco respuestas de no_aplica conservan sus motivos y no generan una moda numérica (575.9791ms)
✔ cinco respuestas de abstencion conservan sus motivos y no generan una moda numérica (546.401ms)
✔ un cero y cuatro abstenciones no se reportan como cinco ceros estables (542.4181ms)
✔ muestra la limitación de G1 aunque coincidan sus 1 puntajes (423.88ms)
✔ muestra la limitación de G1 aunque coincidan sus 5 puntajes (528.1385ms)
✔ una abstención sin motivo bloquea el cierre y conserva el perfil anterior (773.6842ms)
✔ cierra G1 con la aplicabilidad prevista para 0 grupos (431.2585ms)
✔ cierra G1 con la aplicabilidad prevista para 1 grupos (423.9342ms)
✔ cierra G1 con la aplicabilidad prevista para 2 grupos (430.0945ms)
✔ rechaza invertir la aplicabilidad de G1 con 1 grupos (410.6849ms)
✔ rechaza invertir la aplicabilidad de G1 con 2 grupos (393.2872ms)
✔ no cierra G1 si se cambia su conteo (411.2478ms)
✔ no cierra G1 si se cambia su hash (416.8187ms)
✔ no cierra G1 si se cambia su archivo (410.4816ms)
✔ no cierra G1 si se cambia su versión (403.6112ms)
✔ no cierra G1 si se cambia su registro (409.0428ms)
✔ el perfil conserva la advertencia de una captura sin cambiar sus puntajes (397.7657ms)
✔ si falta el registro de la captura, el cierre conserva el perfil anterior (744.185ms)
✔ prepara, verifica y recoge 7 posiciones en modo referencia (6739.0954ms)
✔ prepara, verifica y recoge 35 posiciones en modo referencia (5219.8872ms)
✔ prepara, verifica y recoge 65 posiciones en modo comparacion (2881.8473ms)
✔ las solicitudes tienen el canal, las imágenes y la repetición correctos (931.5028ms)
✔ rechaza cambios en canal_faltante antes de evaluar (1240.8041ms)
✔ rechaza cambios en configuracion antes de evaluar (1251.2324ms)
✔ rechaza cambios en medidas antes de evaluar (1269.281ms)
✔ rechaza cambios en prompt antes de evaluar (1220.2707ms)
✔ rechaza cambios en solicitud antes de evaluar (1230.0163ms)
✔ rechaza cambios en nodes antes de evaluar (1271.9666ms)
✔ una respuesta inválida conserva el original, el perfil y el CSV anteriores (2029.3852ms)
✔ no sobrescribe una carpeta preparada (1161.5077ms)
✔ las opciones inválidas o repetidas fallan antes de preparar archivos (2177.4404ms)
✔ G3/G6 reciben evidencia nueva y preparar una corrida no reescribe la medición archivada (4293.6105ms)
✔ G4 recibe su proyección nueva y los otros grupos conservan sus versiones por separado (4145.5267ms)
✔ las corridas nuevas entregan a G5 medidas sin clases y conservan los datos originales (3737.8387ms)
✔ recoger escribe resumen.md sin cambiar perfil.json ni perfil.md, y es idéntico entre dos cierres (7088.5306ms)
✔ si el resumen no se puede generar, recoger avisa y el perfil queda escrito (3606.9623ms)
✔ sanity_ok=false: preparar se niega y no deja solicitudes (2970.8682ms)
✔ con --aceptar-sanidad-fallida prepara y lo escribe en el libro (2306.1483ms)
✔ plantilla: seis libros, columnas exactas, sin autor ni fechas, bytes deterministas (115.3065ms)
✔ importar: descarta los metadatos de Office y no copia el nombre del archivo (32.9457ms)
✔ importar: solo acepta panel-E1.xlsx … panel-E6.xlsx (17.9579ms)
✔ importar: rechaza un evaluador distinto del archivo, vocabulario ajeno y filas reordenadas (21.2703ms)
✔ importar: no pisa juicios escritos sin --force (34.5291ms)
✔ acuerdo: seis evaluadores dan 15 pares y p_e = 0,75 (18.7961ms)
✔ acuerdo: n desigual por par, ponderado por n, NA aparte y G1 con y sin (9.0384ms)
✔ el informe explica G6 sin convertir una abstención o un cero en otra cosa (22.413ms)
✔ G7 respeta límites 0,10, 0,25 y 0,50 y prioridad de combinaciones (2.2821ms)
✔ G7 no convierte denominadores cero en impecables ni en NA (0.3629ms)
✔ G7 desempata por T1,T2,T3,T4 y usa cocientes sin redondear (0.4158ms)
✔ G2 exige todos los requisitos de cada ancla, no solo n1 (1.6846ms)
✔ g2: valida respuesta atribuida y rechaza una cifra cambiada (8.0372ms)
✔ g2: el límite ambiguo debe declararse (0.4284ms)
✔ g2: no permite NA con objetivos (0.4033ms)
✔ g2: un desacuerdo de ancla se conserva como hallazgo independiente de la conformidad (1.3547ms)
✔ g7: valida respuesta atribuida y rechaza una cifra cambiada (7.2601ms)
✔ g7: el límite ambiguo debe declararse (1.9958ms)
✔ g7: no permite NA con objetivos (4.6342ms)
✔ g7: un desacuerdo de ancla se conserva como hallazgo independiente de la conformidad (3.7977ms)
✔ G2 conserva abstención aplicable, distinta de NA y nivel cero (0.9565ms)
✔ G2 no acepta apoyos inventados ni recuentos duplicados (0.4714ms)
✔ G7 no acepta lectura de un screenshot que no recibió (0.5887ms)
✔ Los prompts no incluyen identidad de repetición ni resultados previos (1.0071ms)
✔ se usan solo las 24 páginas declaradas y lotes pequeños (7.4382ms)
✔ cada evaluación adjunta wireframe y screenshot y queda aislada de herramientas e historia (2.8276ms)
✔ las posiciones registradas son 120 por grupo y alternan grupos sin compartir conversación (3.5235ms)
✔ la fase dirigida tiene nueve reales y ocho sintéticos, con cinco posiciones distintas por página (2.0973ms)
✔ el evaluador recibe solo screenshot y se aísla de herramientas, proyecto y expectativas (0.9926ms)
✔ acepta atribución sin modificar respuesta (18.8774ms)
✔ rechaza sustituir cifras o miembros (0.8973ms)
✔ rechaza selección principal inventada (0.5486ms)
✔ rechaza puntaje incompatible con sus juicios (0.3609ms)
✔ los casos sin ancla no se convierten en cero (0.7094ms)
✔ NA se distingue de abstención y exige cero candidatos (0.5491ms)
✔ rechaza doble conteo de banner por ancestro e hijo (0.4277ms)
✔ canales independientes y texto deben quedar declarados (0.4886ms)
✔ exige declarar cajas parciales o raíces virtuales (0.57ms)
✔ las anclas conservadas tienen prioridad y huecos explícitos (0.6722ms)
✔ prompt idéntico y canal screenshot sin wireframe adjunto (1.0741ms)
✔ acepta NA con cero candidatos y sin inventar juicios (4.2199ms)
✔ rechaza trigger sin la condición declarada (0.4024ms)
✔ las dos series tienen planes distintos y no vuelven a incluir P06 en la comparación histórica (9.8543ms)
✔ la ejecución no entrega al modelo expectativas ni archivos fuente (1.1061ms)
✔ cada repetición recorre nueve casos y nunca incluye el caso sin ancla (4.0494ms)
✔ el comando adjunta solo las dos imágenes, usa contexto nuevo y no entrega expectativas (1.0545ms)
✔ valida la respuesta sin alterar juicios ni añadir run al original (8.6836ms)
✔ rechaza la sustitución de una cifra recibida (0.823ms)
✔ rechaza seleccionar un padre que no está en las listas recibidas (0.4624ms)
✔ rechaza no aplicable cuando la fuente sí entrega listas (0.3661ms)
✔ acepta no aplicable con cero listas, Q falso y jerarquía nula (0.6668ms)
✔ exige declarar screenshot incluso si Q es falso (0.5975ms)
✔ rechaza ids de hallazgos inexistentes y puntajes bajos sin recomendaciones (6.3406ms)
✔ el prompt es idéntico entre repeticiones y no incorpora su identificador (0.5042ms)
✔ selección de raíz virtual con padre null se distingue de ausencia de lista (3.6291ms)
✔ exige declarar el límite de pertenencia en una raíz virtual (4.3754ms)
✔ rechaza identidad de lista inventada aunque el padre null coincida (1.8217ms)
✔ sin selección los juicios de jerarquía son nulos también en el nuevo contrato (0.456ms)
✔ treinta páginas y dos runtimes preparan el plan de 3.900 solicitudes (2.5287ms)
✔ no acepta modelos pendientes, configuración incompleta, runtimes repetidos ni ids peligrosos (4.6346ms)
✔ prepara una página en los dos runtimes sin evaluar ni cambiar los archivos de captura (5677.0926ms)
✔ prepara dos posiciones sin resultados y detecta cambios posteriores en las entradas (2258.8574ms)
✔ la validación histórica rechaza otro grupo o atribución sin tocar el JSON recibido (4155.4791ms)
✔ NA y nivel cero no se confunden en la comparación (1.7538ms)
✔ el caso de límite no entra en coincidencia de niveles y conserva una marca ausente (1.5276ms)
✔ una contradicción del ancla se informa sin corregir la respuesta (0.6034ms)
✔ archiva fallo sin respuesta y conserva hashes y atribución (57.7047ms)
✔ no reintenta una respuesta presente (11.9919ms)
✔ rechaza traza alterada (17.2222ms)
✔ deja puntajes, inválidos y abstenciones sin repetir (56.8624ms)
✔ rechaza un fallo que también contiene un juicio emitido (47.2383ms)
✔ b · cada condición de cada rúbrica tiene entrada en el diccionario, y no sobra ninguna (22.9145ms)
✔ b′ · cada cita del diccionario está en las líneas que declara (53.5984ms)
✔ a · resumen de la corrida de integración existente (10.4278ms)
✔ c · determinismo: dos ejecuciones, los mismos bytes, sin rutas ni fecha de hoy (234.5575ms)
✔ d · perfil.md de la corrida registrada sigue saliendo byte a byte de su perfil.json (13.909ms)
✔ e · sin totales, promedios, porcentajes, semáforos ni adjetivos de venta (7.2499ms)
✔ f · abstención total, como G6 en el piloto: ni cero ni mejoras (2.2392ms)
✔ g · dispersión entre repeticiones: moda, rango y la frase de que el modelo varió (4.6123ms)
✔ h · condición desconocida: muestra el código y dice que no hay explicación, sin fallar (2.92ms)
✔ h′ · trigger con varias condiciones («C3, C4», como en el humo del 13 nov.): explica cada una (1.9416ms)
✔ j · parámetros de generación: la declaración del runtime se lee como frase (4.8322ms)
✔ i · legibilidad: ningún código interno aparece sin su explicación en la misma línea (43.359ms)
✔ la revisión conserva los 120 juicios y distingue los dos desacuerdos de C17 (572.765ms)
✔ una marca nueva sin causa revisada hace fallar el informe en lugar de inventar una explicación (1.5927ms)
✔ el sello verifica originales aunque se actualice el informe derivado (14.3191ms)
✔ el sello detecta una respuesta modificada (14.306ms)
✔ el sello detecta un archivo primario omitido (11.338ms)
✔ el sello detecta una fila duplicada (12.8873ms)
ℹ tests 326
ℹ suites 0
ℹ pass 325
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 34079.6752

✖ failing tests:

test at scripts\entrega.test.js:65:1
✖ La entrega actualiza solo copias, incluye dependencias locales y detecta cambios (290.2527ms)
  Error: Cambió el archivo de dependencias histórico.
      at prepararEntrega (C:\Users\d.hernandeza2\Downloads\ux-laws-plugin\scripts\preparar-entrega.js:44:61)
      at TestContext.<anonymous> (C:\Users\d.hernandeza2\Downloads\ux-laws-plugin\scripts\entrega.test.js:69:3)
      at Test.runInAsyncScope (node:async_hooks:214:14)
      at Test.run (node:internal/test_runner/test:1106:25)
      at Test.processPendingSubtests (node:internal/test_runner/test:788:18)
      at Test.postRun (node:internal/test_runner/test:1235:19)
      at Test.run (node:internal/test_runner/test:1163:12)
      at async Test.processPendingSubtests (node:internal/test_runner/test:788:7)
exit=1
```
</details>

<details><summary><code>npm run dorados:selftest</code></summary>

```text
$ npm run dorados:selftest

> ux-laws-plugin@0.1.0 dorados:selftest
> node scripts/dorados-selftest.js

temporal  C:\Users\D146E~1.HER\AppData\Local\Temp\dorados-selftest-mEsqAa

  ok    ninguna ruta de prueba apunta a dorados/
  ok    hoja valida: importa
  ok    hoja valida: setenta filas
  ok    hoja rota: no importa
  ok    hoja rota: no deja CSV a medias
  ok    hoja rota: detecta el nivel 7
  ok    hoja rota: detecta el trigger inventado
  ok    hoja rota: detecta la justificacion vacia
  ok    celdas auto-cerradas: reporta nivel vacio
  ok    celdas auto-cerradas: no lee el trigger como nivel
  ok    guarda: rechaza un destino con juicios
  ok    guarda: dice cuantas filas
  ok    guarda: menciona --force
  ok    guarda: no toca el archivo
  ok    --force: sobrescribe
  ok    --force: avisa de las filas pisadas
  ok    plantilla vacia: la guarda no la confunde con juicios
  ok    prefijo x: en el XML: importa
  ok    prefijo x: en el XML: mismo CSV que sin prefijo
  ok    Target antes que Id en los rels: importa
  ok    contador de la plantilla: importa
  ok    juicio sin pagina: se rechaza
  ok    juicio sin pagina: lo nombra
  ok    dorados/ byte a byte igual que antes de la prueba

todo ok  ·  temporal borrado
exit=0
```
</details>

```text
$ npm run seal:verify

> ux-laws-plugin@0.1.0 seal:verify
> node scripts/seal-corpus.js --verify

sello verificado sobre 30 paginas y 120 archivos
hash del sello  f9c0caaaa2eaec7793860e46c0bf78530489877af1e33a5ac417ee8490933437
manifiesto      70e31ac57ac31fbb30a8fb158dd4e72972584b8ef0f0cf3773ce1fa3124ec5a3
exit=0
```

**Clon de `af99fb2` con `core.autocrlf=false`**, como recomienda el README para Windows:

```text
$ node --test   (clon con core.autocrlf=false)
ℹ tests 326
ℹ suites 0
ℹ pass 326
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 32743.4584
exit=0
$ node scripts/g1-closure.js verificar
{
  "estado": "cierre_documental_con_limitacion_no_interpretable_v1",
  "paginas_reproducidas": 24,
  "niveles": [
    23,
    1,
    0,
    0,
    0
  ],
  "discrepancia_no_aplica": [
    "C13"
  ],
  "llamadas_modelo": 0,
  "historicos_sin_cambios": 5159,
  "sellos_anteriores": 10,
  "sello_cierre_verificado": true
}
exit=0
$ py -3 scripts/verify-g3-g6-closure.py
{"sesiones": 240, "originales_y_csv_comprobados": true, "historicos_sin_cambios": 4111, "sellos_anteriores": 8, "informe_coincide": "revisiones/g3-g6-2026-10-20/QA-CIERRE-21OCT.json", "limite": ["hash en bruto de measurements.json no verificable desde un clon: el archivo no se versiona y contiene medido_en; se verificó su contenido regenerándolo con el código archivado"]}
exit=0
$ npm run seal:calibracion:verify
sello verificado sobre 24 paginas y 96 archivos
hash del sello  82cb74b67c3d9ea977d3b246867a2c23b89408a6871582e322cc38dd2a9c6c68
manifiesto      16df1f6926602dbf268cf3abaab9d29e31ece522947f6c5ecac5278373a7d749
exit=0
$ npm run seal:dorados:verify
sello verificado sobre 10 paginas y 40 archivos
hash del sello  08d4088679ec8dfde8326599c9941537e2efbf4fd10dcf15b53b71ef2c00a771
manifiesto      cd61d73ebeadf1426c9d17063d04f627ba3100dfbf233cd3f89fbdfea0c15e35
exit=0
```

En la copia de trabajo, `node scripts/g1-closure.js verificar` falla con
`ENOENT … calibracion\C02\meta.json`. El archivo existe: el manifiesto se lee con CRLF y
cada nombre llega con `\r`. CLAUDE.md §8 ya lo registra («pasa con `core.autocrlf=false`»).

Prueba antes/después de `perfil.json` y `perfil.md` (`scratchpad/r13/antes-despues.js`).
Cierra la misma corrida temporal con el `orchestrate.js` de `59304c6` y con el actual:

```text
IGUALES: perfil.md byte a byte; perfil.json byte a byte salvo la línea cerrada_en
orchestrate.js restaurado: true
```

### Criterios de aceptación

| # | Criterio | Estado | Evidencia |
|---|---|---|---|
| 1 | `resumen.md` en `recoger`, sin modelo, byte-idéntico | Cumple | `orchestrate-resumen.test.js` («idéntico entre dos cierres»), prueba c. `resumen-claro.js` no importa ningún cliente de modelo |
| 2 | `perfil.json` y `perfil.md` existentes no cambian | Cumple | prueba d (perfil.md de la integración 0.2.2 regenerado byte a byte) y prueba antes/después de arriba. Ningún archivo de corridas existentes aparece en el diff |
| 3 | Cada condición de cada rúbrica tiene entrada con procedencia | Cumple | pruebas b (las condiciones se extraen de los `SKILL.md` y de los esquemas, no de una lista escrita a mano) y b′ (cada cita está en las líneas que declara) |
| 4 | Sin totales ni promedios; abstención y NA no son cero | Cumple | pruebas e y f, y la expresión `PROHIBIDO` en `orchestrate-resumen.test.js` |
| 5 | Las cuatro comprobaciones pasan después del último commit | Cumple con una excepción declarada | Salidas arriba: validate 71/71, dorados 24 aserciones, seal f9c0caaa…; `node --test` 326/326 en LF y 325/326 en la copia CRLF (falla conocida `entrega.test.js:65`) |
| 6 | Evidencia de la instalación y de la activación con frase libre | Cumple | `registros/instalacion.log`, `registros/node-test.log`, `registros/descubrimiento/` (§4) |
| 7 | Corrida de humo con libro, perfil.json, perfil.md y resumen.md | Cumple | `verificaciones/humo-claude-code-2026-11-13/corrida/` |
| 8 | Ningún archivo sellado modificado | Cumple | diff de arriba: 8 archivos, ninguno sellado. `git diff --name-only 59304c6..HEAD -- skills/ shared/escala.md docs/protocolo.md package.json package-lock.json docs/hipotesis-m3.md measure/ corpus/ calibracion/ dorados/ captures/ pilotos/ historial/ preparacion/ .claude-plugin/plugin.json` no devuelve nada. `v0.1.0` sigue en `50cdc8b`; no ejecuté ningún comando sobre tags |

## 4. Prueba de punta a punta

Carpeta: `verificaciones/humo-claude-code-2026-11-13/` (ver su `LEEME.md`). **Es humo, no un
resultado de la tesis.**

**Entorno.** Windows 11, extensión de VS Code, Node v24.13.0, npm 11.6.2, Claude Code CLI 2.1.267.

### 4.1 Instalación desde cero

Hecha en un clon nuevo de la copia local en `c6a7f81` (`registros/instalacion.log`).

| Paso | Resultado |
|---|---|
| `npm ci` | exit 0, 3 s. Un aviso moderado de una dependencia: la raíz conserva sus dependencias históricas y la actualización vive en `release/` (CLAUDE.md §8) |
| `npx playwright install chromium` | exit 0, en una carpeta aislada |
| `npm run link` | **Falla en Windows**: `"." no se reconoce como un comando interno o externo`. `package.json:8` llama `./scripts/link-skills.sh` y npm usa cmd.exe. `bash scripts/link-skills.sh` sí funciona. En el ZIP el script ya es `bash scripts/link-skills.sh` (`scripts/preparar-entrega.js:85`) |
| `npm run verify`, `npm test` | `Missing script`. **No es defecto del documento:** existen solo en el ZIP, y ese documento es para el ZIP |
| `node --test` (README) | 323/324 en aquel momento. Falla `entrega.test.js:65` por CRLF, porque cloné sin la `core.autocrlf=false` que pide el README |
| `node scripts/demo.js https://www.banrep.gov.co` | 17 s, cobertura 99,6 %, parsimonia 89,9 % |

### 4.2 Descubrimiento y activación con frase libre

Comando: `claude -p --plugin-dir . --model claude-sonnet-5-5 --output-format stream-json --verbose --max-turns 3 [opciones] "<frase>"`.
`claude-fable-5-2` y `claude-opus-5-5` no se pudieron usar: la CLI 2.1.267 responde
«does not support this model; version 2.1.290 or newer is required».

- **`/ux-laws:ux-audit` existe.** El arranque lista los ocho comandos `ux-laws:*` y las ocho skills.
- **Activación con frase libre: sí, el modelo elige la skill.** Pero **no se ejecuta**: en modo `-p` con permisos por defecto la llamada `Skill` queda en `permission_denials` y la sesión termina en `error_max_turns`.

```text
=== descubrimiento-0-init
modelo de la sesión: claude-fable-5-2 · versión: 2.1.267 · permisos: default · plugins: ux-laws, superpowers, brag
llamadas a herramientas: 0 {}
skills invocadas: NINGUNA
resultado: success · error: true · turnos: 1 · 1 s · costo equivalente USD 0 · modelos: 
texto final: API Error: 400 Claude Code 2.1.267 does not support this model; version 2.1.290 or newer is required. Run 'claude update', or update the Claude desktop app, then try again.
=== descubrimiento-1-frase-entorno-usuario
modelo de la sesión: claude-sonnet-5-5 · versión: 2.1.267 · permisos: default · plugins: ux-laws, superpowers, brag
→ Skill {"skill":"ux-laws:ux-audit","args":"https://www.banrep.gov.co"}
llamadas a herramientas: 5 {"Skill":1,"Glob":2,"Bash":1,"Read":1}
skills invocadas: ux-laws:ux-audit
resultado: error_max_turns · error: true · turnos: 4 · 14 s · costo equivalente USD 0.1964522 · modelos: claude-sonnet-5-5
permisos denegados: Skill {"skill":"ux-laws:ux-audit","args":"https://www.banrep.gov.co"}
texto final: 
=== descubrimiento-2-frase-solo-plugin
modelo de la sesión: claude-sonnet-5-5 · versión: 2.1.267 · permisos: default · plugins: ux-laws
→ Skill {"skill":"ux-laws:ux-audit","args":"https://www.banrep.gov.co"}
llamadas a herramientas: 4 {"Skill":1,"Glob":2,"Read":1}
skills invocadas: ux-laws:ux-audit
resultado: error_max_turns · error: true · turnos: 4 · 7 s · costo equivalente USD 0.0674916 · modelos: claude-haiku-4-5-20251001, claude-sonnet-5-5
permisos denegados: Skill {"skill":"ux-laws:ux-audit","args":"https://www.banrep.gov.co"}
texto final: 
=== descubrimiento-3-frase2-solo-plugin
modelo de la sesión: claude-sonnet-5-5 · versión: 2.1.267 · permisos: default · plugins: ux-laws
→ Skill {"skill":"ux-laws:ux-audit","args":"https://www.banrep.gov.co"}
llamadas a herramientas: 4 {"Skill":1,"Glob":1,"Bash":1,"Read":1}
skills invocadas: ux-laws:ux-audit
resultado: error_max_turns · error: true · turnos: 4 · 11 s · costo equivalente USD 0.14446900000000001 · modelos: claude-haiku-4-5-20251001, claude-sonnet-5-5
permisos denegados: Skill {"skill":"ux-laws:ux-audit","args":"https://www.banrep.gov.co"}
texto final: 
```

Sesiones 2 y 3: `--setting-sources project,local --strict-mcp-config`, para cargar solo el
plugin. Sus transcripciones completas están en `registros/descubrimiento/`. La sesión 1 usó el
entorno del usuario; solo se versiona su resumen, porque la transcripción trae el correo y los
servidores MCP.

**Ejecución desde una conversación nueva: no probada.** Intenté correr la skill completa con
`claude -p --allowedTools …` y el clasificador del modo automático de esta sesión denegó el
comando. No insistí.

### 4.3 Ejecución

| | |
|---|---|
| Página | `https://uniandes.edu.co/` (L01; captura nueva del 13 nov., 16:30:51 UTC) |
| `RUNTIME` | `claude-code-vscode` |
| `MODEL_ID` | `claude-opus-5-5` (el que informó cada subagente; la transcripción lo confirma) |
| `DECODING` | `no-expuesto-por-el-runtime` |
| Modo | referencia, 1 repetición: 7 solicitudes. No corrí la referencia de 35 (era opcional) |
| Aislamiento | un subagente nuevo por solicitud: herramienta Agent, tipo por defecto, sin fork, `model=opus` |

Cronología (`registros/humo-orquestacion.log`):

1. 16:30:04. `preparar --url https://www.banrep.gov.co`: CAPTCHA («bot manager, incident id»). `preparar` se negó por `sanity_ok=false`. No usé `--aceptar-sanidad-fallida`. → `intento-1-banrep-bloqueada/`.
2. 16:30:44. `preparar --url https://uniandes.edu.co/`: 7,5 s, «Sin alertas automáticas».
3. 16:31:41. Siete subagentes con el modelo heredado `claude-fable-5-2`. Los siete recibieron «You've hit your 5-hour limit» a los 9–12 s y no escribieron respuestas. → `intento-2-uniandes-limite-de-uso/`.
4. La sesión pasó a `claude-opus-5-5`. Volví a correr `preparar --captura` sobre la misma captura, con el libro a nombre del modelo real.
5. 16:34:57. Siete subagentes con `model=opus`. Duraron 39–109 s cada uno; 164 s desde el lanzamiento hasta la última respuesta.
6. Anoté en el libro `contexto_limpio` y el mecanismo, con su límite. Corrí `verificar` (7/7) y `recoger` (exit 0). No medí el tiempo de `recoger`.

Resultado: G1 0 (no interpretable v1), G2 2, G3 1, G4 3, G5 0, G6 sin nivel, G7 0.
**Ninguna respuesta inválida, corregida ni repetida.**

**¿Orquesta una conversación sin pegar 35 (aquí 7) solicitudes?** En esta prueba sí: nadie
pegó nada. Pero la conversación era esta sesión, que conocía el repositorio; no es la de un
usuario que llega con la frase. Intervenciones que tuvo que hacer el orquestador:

1. Cambiar de página tras el CAPTCHA.
2. Detectar el límite de uso, cambiar de modelo y volver a preparar para que el libro dijera el modelo real.
3. **Redactar el encargo de cada subagente.** `ux-audit/SKILL.md:80-88` dice «sesión o subagente nuevo», pero no da el texto del encargo ni las restricciones (no leer otros archivos, no usar resultados de pilotos).
4. Anotar `contexto_limpio` y `mecanismo_de_aislamiento` en el libro con un script.
5. Correr `verificar` y `recoger`.

Ninguna requirió al usuario.

**Qué se rompió o quedó débil:**

- **Banner de cookies no detectado.** Panel de y=689 a 900 dentro de un `div` fijo de pantalla completa con `role="dialog"` y `aria-label="Interfaz de la plataforma de gestión del consentimiento"` (nodo 3954). El catálogo 2026-09-10 no hizo ninguna ronda y `revisionCapas` 2026-11-04 dio `capas: []` antes y después. La captura sellada de L01 tiene el mismo banner, y `revisiones/capturas-2026-11-04/INFORME.md:29` ya lo había marcado al revisar los nodos guardados. **El detector en vivo no lo ve.** G2 y G4 lo notaron en la imagen y marcaron evidencia insuficiente.
- **El contexto de los subagentes no estaba vacío.** Un subagente de sondeo, sin herramientas, confirmó que su contexto incluía el `CLAUDE.md` del repositorio y citó «G6 tiene 120 abstenciones». También traía las instrucciones de los servidores MCP del usuario. El libro lo declara en `mecanismo_de_aislamiento`. Con `contexto_limpio: true` y ese límite escrito, el lector decide.
- **Prompts de G3 y G6 con líneas de 27.223 y 28.574 caracteres.** Comprobado en la transcripción: llegaron completas a los subagentes. `Read` solo paginó por líneas y cada uno leyó el resto en una segunda llamada. No es un problema.
- **G1 devolvió `trigger: "C3, C4"`** aunque `g1-agrupacion-perceptual/SKILL.md:236` nombra una sola condición. El esquema lo acepta porque solo exige texto. El resumen lo maneja desde `1d0a10d`.
- **`prompt_hash` distinto entre los intentos 2 y 3** sobre la misma captura (por ejemplo g1 `1550c37e…` → `0b8cf939…`). La causa es que el prompt lleva escrita la ruta de la captura (línea 3: «Evalúa solo G1, captura <ruta>»), y la ruta cambió al mover la carpeta. Dos corridas sobre la misma captura guardada en lugares distintos no comparten `prompt_hash`. Esto afecta la comparación entre runtimes que propone `12-plugin.tex`, si cada runtime prepara en su propia carpeta. No lo cambié.

**¿Se entiende `resumen.md`?** Juicio mío, no probado con lectores. El orden de cinco
secciones y la tabla «De un vistazo» se leen sin conocer el proyecto. Puntos débiles:

1. La explicación de G6 cita entero el texto del evaluador, con ocho códigos glosados en la misma línea: es el párrafo más denso.
2. «El evaluador advirtió que la evidencia era incompleta» no dice por qué. Aquí era el banner, y eso está en `findings`, que el resumen no muestra.
3. La sección 4 propone mejoras medidas con el banner encima, y el resumen no lo advierte porque la captura salió sin alertas.

Los dos últimos dependen de la captura, no del diccionario.

**Cambio mínimo propuesto, no implementado.** Añadir a `skills/ux-audit/SKILL.md`, después de la línea 88:

1. El texto del encargo para un subagente nuevo: leer solo su solicitud, el prompt y las imágenes; escribir solo `resultado_esperado`; no ejecutar comandos ni usar resultados de pilotos.
2. La frase de límite para Claude Code: el subagente hereda el `CLAUDE.md` y las instrucciones MCP de la sesión.

Comprobé que el cambio no altera hashes verificados. `ux-audit/SKILL.md` no está en el sello de `g1-closure`. Los cuatro manifiestos históricos que lo nombran (`historial/fuentes-g3-g6-2026-11-05/MANIFIESTO.json`, `verificaciones/integracion-0.2.2-2026-11-05/…`, `verificaciones/codex-0.2.1-2026-11-05/REGISTRO-PREVIO.json`, `revisiones/auditoria-2026-11-04/control-preparacion.json`) se comprueban contra copias propias: la huella registrada `5ecf…` ya difiere del archivo vivo y los verificadores pasan. **No lo implementé** porque cambia la entrega descrita en `docs/instalacion.md` y en la tesis. Lo decide Juan.

## 5. Ejemplos de `resumen.md`

### 5.1 Corrida de integración 0.2.2 (`docs/ejemplo-resumen-integracion.md`, código actual)

````markdown
# Resumen de la evaluación

Lo arma un programa a partir del resultado (`perfil.json`) y de un diccionario fijo. No lo redacta un modelo ni agrega opiniones a las del evaluador.

## 1. Qué se evaluó

- **Página:** file:///Users/juan/Desktop/9no/Tesis/ux-laws-plugin/dist/chequeo-codex-0.2.2/ux-laws-0.2.2/capture/pages/portal.html
- **Fecha de la captura:** 5 de noviembre de 2026, 14:45 (hora UTC)
- **Alcance:** una sola pantalla: lo que se ve sin desplazarse en una ventana de 1440 × 900 píxeles. No se evaluó el resto de la página ni otras páginas del sitio.
- **Quién evaluó:** el modelo `gpt-6.1-sol`, ejecutado en `codex-cli`. En este resumen, «el evaluador» es ese modelo. Parámetros de generación declarados: model_reasoning_effort = low; temperature = no expuesto por el runtime; top_p = no expuesto por el runtime.
- **Cuántas veces:** cada aspecto se evaluó 1 vez. Con una sola evaluación no hay medida de estabilidad: no se sabe si el modelo repetiría este resultado.

## 2. Cómo leerlo

1. Cada aspecto recibe un nivel de 0 a 4. En general: 0, la pantalla falla en ese aspecto; 3, cumple en todo lo que se pudo observar; 4, cumple y además hace algo adicional, definido en cada aspecto (no significa «muy bueno»). Qué es un 0 y un 4 en cada aspecto está escrito en cada uno.
2. El resultado es un perfil de siete aspectos, no una calificación de la página.
3. No hay puntaje total: los niveles son etiquetas ordenadas, no cantidades, así que no se promedian; y un total haría pesar igual un aspecto que reúne una sola ley y otro que reúne cuatro.

«No aplica»: la pantalla cumple una condición objetiva por la que ese aspecto no tiene nada que evaluar. «No se pudo evaluar»: el aspecto sí aplica, pero faltó evidencia o lo observado no tiene un nivel definido en la rúbrica (la guía escrita con que se evalúa cada aspecto). Ninguno de los dos es un cero.

## 3. Los siete aspectos

De un vistazo:

| Aspecto | Resultado | Condición que lo fijó |
|---|---|---|
| Agrupación visual de los elementos | nivel 2 (no interpretable) | uniformidad entre elementos equivalentes |
| Cantidad y organización de las opciones | nivel 3 | grupos de opciones a la vez |
| Cantidad de contenido a la vez y cómo está dividido | nivel 2 | unidades de contenido a la vez |
| Qué destaca en la pantalla | nivel 1 | elementos que destacan entre sus pares |
| Orden de las listas y avance en un proceso | nivel 0 | listas planas |
| Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación | no se pudo evaluar | — |
| Tamaño y separación de lo que se puede pulsar | nivel 0 | tamaño cómodo |

El detalle de cada aspecto sigue abajo.

### 3.1 Agrupación visual de los elementos

*En los archivos técnicos: Agrupación perceptual (G1).*

**Pregunta.** ¿La forma en que los elementos están separados, enmarcados y alineados deja ver qué va con qué?

**Resultado.** Nivel 2 (escala de 0 a 4).

**Qué quiere decir un 2 en este aspecto.** Ninguna condición falla de forma generalizada, pero al menos una falla con frecuencia (entre una décima y una cuarta parte de los casos).

**Por qué.** La condición que fijó el nivel fue «uniformidad entre elementos equivalentes» (código `C4`). Mira si los elementos que cumplen la misma función (por ejemplo, las tarjetas de una fila) tienen el mismo alto y la misma alineación. El ancho no cuenta. En esta evaluación: conjuntos de elementos equivalentes con algún miembro distinto en alto o en alineación: 2 de 8.

**Para comparar.** En este aspecto, un 0 es: en toda la pantalla, el espacio, los marcos y la forma dicen cosas distintas sobre qué va con qué: dos o más de las cuatro condiciones fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, la agrupación se lee en dos niveles: los grupos forman secciones y las secciones se separan entre sí más que los grupos que contienen.

**Qué tan firme es la base.** Los cortes numéricos de este aspecto son una convención del proyecto: las fuentes muestran que la cercanía organiza lo que vemos, pero no dan un número a partir del cual una interfaz sea aceptable.

**Advertencia.** Este aspecto no es interpretable en la versión 1 del instrumento: en las páginas de prueba no distinguió lo suficiente entre una página y otra. Su resultado se muestra como diagnóstico y no se usa para proponer mejoras.

### 3.2 Cantidad y organización de las opciones

*En los archivos técnicos: Arquitectura de decisión (G2).*

**Pregunta.** ¿Cuántas opciones enfrenta la persona a la vez, están organizadas en grupos y hay una acción principal que se distinga?

**Resultado.** Nivel 3 (escala de 0 a 4).

**Qué quiere decir un 3 en este aspecto.** Cinco grupos de opciones o menos, coherentes, y la acción principal es clara.

**Por qué.** La condición que fijó el nivel fue «grupos de opciones a la vez» (código `n1`). Mira cuántos grupos de opciones enfrenta la persona al mismo tiempo. En esta evaluación: grupos de opciones a la vez: 2; elementos sobre los que se puede actuar: 6.

**Para comparar.** En este aspecto, un 0 es: hay más de 12 grupos de opciones a la vez y sin agrupar, o no se distingue ninguna acción principal en una pantalla que pide tomar una decisión. Un 4 es: lo del nivel 3 y, además, la pantalla reduce lo que hay que decidir: muestra las opciones por etapas, trae valores por defecto sensatos u ordena las decisiones en secuencia, con al menos una ayuda para comparar.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen de las fuentes: el estudio de Hick midió tiempos de reacción, no un número aceptable de botones, y el efecto de «sobrecarga de elección» no se ha podido reproducir de forma fiable.

### 3.3 Cantidad de contenido a la vez y cómo está dividido

*En los archivos técnicos: Capacidad y segmentación (G3).*

**Pregunta.** ¿Cuántas cosas hay que atender a la vez, están divididas en bloques con título, queda algún dato necesario fuera de la vista y hay contenido ajeno compitiendo con la tarea?

**Resultado.** Nivel 2 (escala de 0 a 4).

**Qué quiere decir un 2 en este aspecto.** Entre 6 y 8 unidades, divididas en bloques con título, sin mezclas, sin datos fuera de la vista y sin contenido ajeno dentro de la zona de la tarea.

**Por qué.** La condición que fijó el nivel fue «unidades de contenido a la vez» (código `U`). Mira cuántas unidades (un campo, una tarjeta, una fila, un bloque de texto) hay que leer o decidir por separado en la zona principal. En esta evaluación: unidades que contó el evaluador: 6.

**Para comparar.** En este aspecto, un 0 es: pasa alguna de estas tres cosas: hay más de 12 unidades de contenido a la vez sin dividir en bloques; un dato necesario queda fuera de la vista; o el contenido ajeno ocupa más espacio que la tarea en su propia zona. Un 4 es: lo del nivel 3 y, además, la pantalla deja para después lo que no se necesita ahora (secciones plegadas o pasos en secuencia), de modo que se reconoce el bloque activo sin leer los demás.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen del estudio de Miller; la capacidad de memoria que suele citarse, el «siete», está desactualizada.

### 3.4 Qué destaca en la pantalla

*En los archivos técnicos: Saliencia visual (G4).*

**Pregunta.** Entre elementos equivalentes, ¿hay uno que destaque, es el que la sección quiere promover, y hay contenido útil que parezca publicidad o relleno?

**Resultado.** Nivel 1 (escala de 0 a 4).

**Qué quiere decir un 1 en este aspecto.** Hay contenido útil con apariencia de publicidad; o bien, sin eso, no destaca ningún elemento entre sus pares o destacan tres o más, que para este aspecto equivale a ninguno.

**Por qué.** La condición que fijó el nivel fue «elementos que destacan entre sus pares» (código `I`). Mira cuántos elementos del conjunto principal rompen el patrón visual de sus equivalentes, por relleno, borde, grosor de letra, tamaño o color. En esta evaluación: elementos que destacan en el conjunto principal: 0.

**Para comparar.** En este aspecto, un 0 es: hay contenido útil con apariencia de publicidad y, al mismo tiempo, o no destaca nada o destacan tres o más elementos: lo importante está escondido y la pantalla no orienta. Un 4 es: lo del nivel 3 y, además, el elemento destaca por más de una vía a la vez (por ejemplo color y grosor, o color y tamaño), así que no depende solo del color.

**Qué tan firme es la base.** Este aspecto dice si algo se distingue de sus pares, no hacia dónde mira la gente: el efecto original trata de lo que se recuerda, no de la atención.

### 3.5 Orden de las listas y avance en un proceso

*En los archivos técnicos: Posición y progreso (G5).*

**Pregunta.** ¿Las listas distinguen su primer elemento del resto y, si la pantalla es un paso de un proceso, muestra en qué paso va la persona?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** La pantalla es un paso de un proceso y no lo indica; o bien no lo es y todas sus listas son planas, es decir, ningún elemento se distingue por su posición.

**Por qué.** La condición que fijó el nivel fue «listas planas» (código `lista_plana`). Mira si todas las listas son planas: sus elementos son idénticos y están a la misma distancia, sin que ninguno se distinga por su posición. En esta evaluación: listas encontradas en la pantalla: 5.

**Para comparar.** En este aspecto, un 0 es: la pantalla es un paso de un proceso y no lo indica; o bien no lo es y todas sus listas son planas, es decir, ningún elemento se distingue por su posición. Un 4 es: lo del nivel 3 y, además, el último elemento de la lista principal también está diferenciado, sin competir con el primero.

**Qué tan firme es la base.** Se evalúa si el avance se hace visible, no si eso motiva a la persona: el efecto de motivación no se puede observar en una imagen.

### 3.6 Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación

*En los archivos técnicos: Economía y convención (G6).*

**Pregunta.** ¿Hay elementos sin función, tareas que la pantalla le deja a la persona aunque el sistema podría resolverlas, o elementos habituales puestos donde no se acostumbra?

**Resultado.** No se pudo evaluar.

**Por qué no hay nivel.** Con lo que se ve en una sola pantalla no se pudo comprobar lo suficiente para sostener un nivel; por ejemplo, que algo no se vea en la captura no demuestra que el sitio no lo tenga. El nivel queda vacío y se muestra lo que sí se pudo revisar. El evaluador lo explicó así: «No se puede establecer el cumplimiento de todas las convenciones pertinentes ni comprobar T: faltan evidencia sobre búsqueda, sesión, jerarquía y enlace de la marca, y campos o resultados para evaluar trabajo trasladado. Ninguna regla prioritaria sostiene un nivel.» Códigos que aparecen en esa explicación: `T`: trabajo que se le deja a la persona.

**Lo que sí se pudo revisar.** De las 8 costumbres de ubicación del catálogo: comprobadas, 1 (se cumplen: 1; no se cumplen: 0); no aplican a esta pantalla, 2; sin determinar, 5. Se cumple: el menú principal va horizontal arriba o vertical a la izquierda (código `K4`).

**Para comparar.** En este aspecto, un 0 es: tres o más costumbres de ubicación rotas; o bien la pantalla le deja trabajo a la persona y, además, los elementos sobrantes afectan a la mayoría de los bloques. Un 4 es: lo del nivel 3 y, además, la pantalla le quita trabajo a la persona: valores por defecto sensatos, campos ya llenos con lo que el sistema sabe, varios formatos aceptados o cálculos ya resueltos.

**Qué tan firme es la base.** Las tres «leyes» de este aspecto (Occam, Tesler y Jakob) son consejos de práctica profesional, sin estudio experimental detrás. El resultado dice algo sobre los criterios de este proyecto, no sobre una ley comprobada.

### 3.7 Tamaño y separación de lo que se puede pulsar

*En los archivos técnicos: Targeting motor (G7).*

**Pregunta.** ¿Los elementos que se pueden pulsar tienen un tamaño suficiente y están bien separados entre sí?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** Dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** La condición que fijó el nivel fue «tamaño cómodo» (código `W_min`). Mira cuántos elementos pulsables miden menos de 32 píxeles en su lado más corto. En esta evaluación: elementos pulsables que miden menos de 32 píxeles en su lado más corto: 5 de 6; píxeles en el lado más corto del elemento más pequeño: 18.

**Para comparar.** En este aspecto, un 0 es: dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, el elemento principal es visiblemente más grande que los secundarios.

**Qué tan firme es la base.** Solo se evalúan el tamaño y la separación, no el tiempo que toma llegar a un elemento. El mínimo de 24 píxeles viene de la norma de accesibilidad WCAG 2.2; los cortes de 32 y de 8 píxeles son convención del proyecto.

## 4. Qué mejorar primero

Solo salen de un nivel 2 o menor y de la condición que lo fijó, del nivel más bajo al más alto. Son la lectura directa de cada condición, no un plan revisado por expertos; el elemento exacto sobre el que actuar está en la carpeta `resultados`.

1. **Orden de las listas y avance en un proceso** (nivel 0). Diferenciar el primer elemento de la lista principal por forma, tamaño, separación o agrupación propia. Sale de la condición «listas planas».
2. **Tamaño y separación de lo que se puede pulsar** (nivel 0). Agrandar los elementos pulsables hasta 32 píxeles o más en su lado más corto. Sale de la condición «tamaño cómodo».
3. **Qué destaca en la pantalla** (nivel 1). Hacer que destaque un solo elemento del conjunto principal: el que la sección quiere promover. Sale de la condición «elementos que destacan entre sus pares».
4. **Cantidad de contenido a la vez y cómo está dividido** (nivel 2). Mostrar menos unidades a la vez o dividirlas en bloques con título; el nivel 3 pide cinco bloques o menos. Sale de la condición «unidades de contenido a la vez».

Sin mejoras propuestas:

- Agrupación visual de los elementos: no es interpretable en la versión 1.
- Cantidad y organización de las opciones: obtuvo nivel 3; las rúbricas solo piden mejoras con nivel 2 o menor.
- Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación: no se pudo evaluar; no se sabe si está bien o mal.

## 5. Qué este resultado no dice

- Describe una sola pantalla, la que se ve sin desplazarse. No describe la página completa ni el sitio.
- Viene de 1 repetición por aspecto, de un solo modelo (`gpt-6.1-sol`). Otro modelo, u otra repetición, puede dar otro resultado.
- Los niveles son juicios de un modelo sobre medidas que calcula un programa. No sustituyen la revisión de una persona experta, y este resultado no se ha comparado con una.
- «Agrupación visual de los elementos» no es interpretable en la versión 1 del instrumento: su nivel no sirve para comparar páginas.
- Un aspecto que no se pudo evaluar no está bien ni mal: no se sabe. En este resultado: Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación.
- «No aplica» y «no se pudo evaluar» no son ceros.
- No hay puntaje total ni calificación de la página.

---

Detalle técnico: `perfil.md` y `perfil.json`, en esta misma carpeta. Diccionario de lenguaje claro: versión 1.0.0 (`shared/lenguaje-claro.json`).
````

### 5.2 Corrida de humo, tal como la escribió `recoger` en `c6a7f81`

Muestra los dos defectos corregidos después: la línea de parámetros y G1 «`C3, C4`, sin explicación».
La versión con el código actual está en `corrida/resumen-con-codigo-corregido.md`; difiere
en esas tres partes (§2).

````markdown
# Resumen de la evaluación

Lo arma un programa a partir del resultado (`perfil.json`) y de un diccionario fijo. No lo redacta un modelo ni agrega opiniones a las del evaluador.

## 1. Qué se evaluó

- **Página:** https://uniandes.edu.co/
- **Fecha de la captura:** 13 de noviembre de 2026, 16:30 (hora UTC)
- **Alcance:** una sola pantalla: lo que se ve sin desplazarse en una ventana de 1440 × 900 píxeles. No se evaluó el resto de la página ni otras páginas del sitio.
- **Quién evaluó:** el modelo `claude-opus-5-5`, ejecutado en `claude-code-vscode`. En este resumen, «el evaluador» es ese modelo. Parámetros declarados: declarado = no expuesto por el runtime.
- **Cuántas veces:** cada aspecto se evaluó 1 vez. Con una sola evaluación no hay medida de estabilidad: no se sabe si el modelo repetiría este resultado.

## 2. Cómo leerlo

1. Cada aspecto recibe un nivel de 0 a 4. En general: 0, la pantalla falla en ese aspecto; 3, cumple en todo lo que se pudo observar; 4, cumple y además hace algo adicional, definido en cada aspecto (no significa «muy bueno»). Qué es un 0 y un 4 en cada aspecto está escrito en cada uno.
2. El resultado es un perfil de siete aspectos, no una calificación de la página.
3. No hay puntaje total: los niveles son etiquetas ordenadas, no cantidades, así que no se promedian; y un total haría pesar igual un aspecto que reúne una sola ley y otro que reúne cuatro.

«No aplica»: la pantalla cumple una condición objetiva por la que ese aspecto no tiene nada que evaluar. «No se pudo evaluar»: el aspecto sí aplica, pero faltó evidencia o lo observado no tiene un nivel definido en la rúbrica (la guía escrita con que se evalúa cada aspecto). Ninguno de los dos es un cero.

## 3. Los siete aspectos

De un vistazo:

| Aspecto | Resultado | Condición que lo fijó |
|---|---|---|
| Agrupación visual de los elementos | nivel 0 (no interpretable) | código `C3, C4`, sin explicación disponible |
| Cantidad y organización de las opciones | nivel 2 | grupos de opciones a la vez |
| Cantidad de contenido a la vez y cómo está dividido | nivel 1 | contenido ajeno a la tarea |
| Qué destaca en la pantalla | nivel 3 | correspondencia de lo que destaca |
| Orden de las listas y avance en un proceso | nivel 0 | listas planas |
| Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación | no se pudo evaluar | — |
| Tamaño y separación de lo que se puede pulsar | nivel 0 | tamaños uniformes por familia |

El detalle de cada aspecto sigue abajo.

### 3.1 Agrupación visual de los elementos

*En los archivos técnicos: Agrupación perceptual (G1).*

**Pregunta.** ¿La forma en que los elementos están separados, enmarcados y alineados deja ver qué va con qué?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** En toda la pantalla, el espacio, los marcos y la forma dicen cosas distintas sobre qué va con qué: dos o más de las cuatro condiciones fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** La condición que fijó el nivel tiene el código `C3, C4`: sin explicación disponible.

**Para comparar.** En este aspecto, un 0 es: en toda la pantalla, el espacio, los marcos y la forma dicen cosas distintas sobre qué va con qué: dos o más de las cuatro condiciones fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, la agrupación se lee en dos niveles: los grupos forman secciones y las secciones se separan entre sí más que los grupos que contienen.

**Qué tan firme es la base.** Los cortes numéricos de este aspecto son una convención del proyecto: las fuentes muestran que la cercanía organiza lo que vemos, pero no dan un número a partir del cual una interfaz sea aceptable.

**Advertencia.** Este aspecto no es interpretable en la versión 1 del instrumento: en las páginas de prueba no distinguió lo suficiente entre una página y otra. Su resultado se muestra como diagnóstico y no se usa para proponer mejoras.

### 3.2 Cantidad y organización de las opciones

*En los archivos técnicos: Arquitectura de decisión (G2).*

**Pregunta.** ¿Cuántas opciones enfrenta la persona a la vez, están organizadas en grupos y hay una acción principal que se distinga?

**Resultado.** Nivel 2 (escala de 0 a 4).

**Qué quiere decir un 2 en este aspecto.** Entre 6 y 8 grupos de opciones, agrupados solo en parte; hay una acción principal, pero no domina.

**Por qué.** La condición que fijó el nivel fue «grupos de opciones a la vez» (código `n1`). Mira cuántos grupos de opciones enfrenta la persona al mismo tiempo. En esta evaluación: grupos de opciones a la vez: 8; elementos sobre los que se puede actuar: 19.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: hay más de 12 grupos de opciones a la vez y sin agrupar, o no se distingue ninguna acción principal en una pantalla que pide tomar una decisión. Un 4 es: lo del nivel 3 y, además, la pantalla reduce lo que hay que decidir: muestra las opciones por etapas, trae valores por defecto sensatos u ordena las decisiones en secuencia, con al menos una ayuda para comparar.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen de las fuentes: el estudio de Hick midió tiempos de reacción, no un número aceptable de botones, y el efecto de «sobrecarga de elección» no se ha podido reproducir de forma fiable.

### 3.3 Cantidad de contenido a la vez y cómo está dividido

*En los archivos técnicos: Capacidad y segmentación (G3).*

**Pregunta.** ¿Cuántas cosas hay que atender a la vez, están divididas en bloques con título, queda algún dato necesario fuera de la vista y hay contenido ajeno compitiendo con la tarea?

**Resultado.** Nivel 1 (escala de 0 a 4).

**Qué quiere decir un 1 en este aspecto.** Entre 9 y 12 unidades con división débil (bloques sin título o muy desiguales), o algún bloque mezcla contenidos de distinta clase, o hay contenido ajeno compitiendo por posición con la acción de la tarea.

**Por qué.** La condición que fijó el nivel fue «contenido ajeno a la tarea» (código `X`). Mira cuántos elementos de la zona principal no pertenecen ni a la tarea ni a la navegación: promociones, contenido relacionado, suscripciones, avisos. En esta evaluación: elementos ajenos identificados: 2.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: pasa alguna de estas tres cosas: hay más de 12 unidades de contenido a la vez sin dividir en bloques; un dato necesario queda fuera de la vista; o el contenido ajeno ocupa más espacio que la tarea en su propia zona. Un 4 es: lo del nivel 3 y, además, la pantalla deja para después lo que no se necesita ahora (secciones plegadas o pasos en secuencia), de modo que se reconoce el bloque activo sin leer los demás.

**Qué tan firme es la base.** Los cortes numéricos son una convención del proyecto y no salen del estudio de Miller; la capacidad de memoria que suele citarse, el «siete», está desactualizada.

### 3.4 Qué destaca en la pantalla

*En los archivos técnicos: Saliencia visual (G4).*

**Pregunta.** Entre elementos equivalentes, ¿hay uno que destaque, es el que la sección quiere promover, y hay contenido útil que parezca publicidad o relleno?

**Resultado.** Nivel 3 (escala de 0 a 4).

**Qué quiere decir un 3 en este aspecto.** Destaca un solo elemento y es el que la sección promueve; no hay contenido útil con apariencia de publicidad ni presentado como secundario.

**Por qué.** La condición que fijó el nivel fue «correspondencia de lo que destaca» (código `P`). Mira si el elemento que destaca es el que la propia pantalla promueve, por ejemplo el plan marcado como recomendado. En esta evaluación: lo destacado es lo que la sección promueve: sí.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: hay contenido útil con apariencia de publicidad y, al mismo tiempo, o no destaca nada o destacan tres o más elementos: lo importante está escondido y la pantalla no orienta. Un 4 es: lo del nivel 3 y, además, el elemento destaca por más de una vía a la vez (por ejemplo color y grosor, o color y tamaño), así que no depende solo del color.

**Qué tan firme es la base.** Este aspecto dice si algo se distingue de sus pares, no hacia dónde mira la gente: el efecto original trata de lo que se recuerda, no de la atención.

### 3.5 Orden de las listas y avance en un proceso

*En los archivos técnicos: Posición y progreso (G5).*

**Pregunta.** ¿Las listas distinguen su primer elemento del resto y, si la pantalla es un paso de un proceso, muestra en qué paso va la persona?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** La pantalla es un paso de un proceso y no lo indica; o bien no lo es y todas sus listas son planas, es decir, ningún elemento se distingue por su posición.

**Por qué.** La condición que fijó el nivel fue «listas planas» (código `lista_plana`). Mira si todas las listas son planas: sus elementos son idénticos y están a la misma distancia, sin que ninguno se distinga por su posición. En esta evaluación: listas encontradas en la pantalla: 3.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: la pantalla es un paso de un proceso y no lo indica; o bien no lo es y todas sus listas son planas, es decir, ningún elemento se distingue por su posición. Un 4 es: lo del nivel 3 y, además, el último elemento de la lista principal también está diferenciado, sin competir con el primero.

**Qué tan firme es la base.** Se evalúa si el avance se hace visible, no si eso motiva a la persona: el efecto de motivación no se puede observar en una imagen.

### 3.6 Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación

*En los archivos técnicos: Economía y convención (G6).*

**Pregunta.** ¿Hay elementos sin función, tareas que la pantalla le deja a la persona aunque el sistema podría resolverlas, o elementos habituales puestos donde no se acostumbra?

**Resultado.** No se pudo evaluar.

**Por qué no hay nivel.** Con lo que se ve en una sola pantalla no se pudo comprobar lo suficiente para sostener un nivel; por ejemplo, que algo no se vea en la captura no demuestra que el sitio no lo tenga. El nivel queda vacío y se muestra lo que sí se pudo revisar. El evaluador lo explicó así: «Ninguna regla prioritaria queda demostrada: K=0 entre las tres convenciones confirmadas como aplicables (K1, K2, K4), R=0 y no se identificó ninguna operación T. El nivel 3 exige además K=0 entre las aplicables y T=0, pero K3, K6, K7 y K8 quedan con aplicabilidad indeterminada (sin cuenta/carrito visible, el único grupo de botones está en el diálogo de consentimiento sin acción primaria visualmente distinguible, sin pie ni ruta en el viewport y sin poder deducir la jerarquía del sitio) y T no es evaluable porque la pantalla no tiene campos de entrada ni resultados. Falta un juicio necesario para fijar el nivel; no se completa la escala.» Códigos que aparecen en esa explicación: `K1`: el logo va arriba a la izquierda y lleva al inicio; `K2`: el buscador va arriba, centrado o a la derecha; `K3`: el carrito o el acceso a la cuenta va arriba a la derecha; `K4`: el menú principal va horizontal arriba o vertical a la izquierda; `K6`: en un par de botones, la acción principal va a la derecha; `K7`: los enlaces legales y de contacto van en el pie de página; `K8`: la ruta de navegación va justo debajo del encabezado; `R`: elementos sobrantes; `T`: trabajo que se le deja a la persona; `K`: costumbres de ubicación rotas.

**Lo que sí se pudo revisar.** De las 8 costumbres de ubicación del catálogo: comprobadas, 3 (se cumplen: 3; no se cumplen: 0); no aplican a esta pantalla, 1; sin determinar, 4. Se cumple: el logo va arriba a la izquierda y lleva al inicio (código `K1`); el buscador va arriba, centrado o a la derecha (código `K2`); el menú principal va horizontal arriba o vertical a la izquierda (código `K4`).

**Para comparar.** En este aspecto, un 0 es: tres o más costumbres de ubicación rotas; o bien la pantalla le deja trabajo a la persona y, además, los elementos sobrantes afectan a la mayoría de los bloques. Un 4 es: lo del nivel 3 y, además, la pantalla le quita trabajo a la persona: valores por defecto sensatos, campos ya llenos con lo que el sistema sabe, varios formatos aceptados o cálculos ya resueltos.

**Qué tan firme es la base.** Las tres «leyes» de este aspecto (Occam, Tesler y Jakob) son consejos de práctica profesional, sin estudio experimental detrás. El resultado dice algo sobre los criterios de este proyecto, no sobre una ley comprobada.

### 3.7 Tamaño y separación de lo que se puede pulsar

*En los archivos técnicos: Targeting motor (G7).*

**Pregunta.** ¿Los elementos que se pueden pulsar tienen un tamaño suficiente y están bien separados entre sí?

**Resultado.** Nivel 0 (escala de 0 a 4).

**Qué quiere decir un 0 en este aspecto.** Dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad.

**Por qué.** La condición que fijó el nivel fue «tamaños uniformes por familia» (código `consistencia`). Mira si los elementos pulsables del mismo tipo y del mismo grupo tienen el mismo ancho y el mismo alto, con 2 píxeles de tolerancia. En esta evaluación: elementos pulsables de una familia con tamaños desiguales: 5 de 8.

**Advertencia del evaluador.** El evaluador advirtió que la evidencia era incompleta para este nivel.

**Para comparar.** En este aspecto, un 0 es: dos o más de las cuatro condiciones de tamaño y separación fallan en más de la cuarta parte de los casos, o una sola falla en más de la mitad. Un 4 es: las cuatro condiciones se cumplen sin excepción y, además, el elemento principal es visiblemente más grande que los secundarios.

**Qué tan firme es la base.** Solo se evalúan el tamaño y la separación, no el tiempo que toma llegar a un elemento. El mínimo de 24 píxeles viene de la norma de accesibilidad WCAG 2.2; los cortes de 32 y de 8 píxeles son convención del proyecto.

## 4. Qué mejorar primero

Solo salen de un nivel 2 o menor y de la condición que lo fijó, del nivel más bajo al más alto. Son la lectura directa de cada condición, no un plan revisado por expertos; el elemento exacto sobre el que actuar está en la carpeta `resultados`.

1. **Orden de las listas y avance en un proceso** (nivel 0). Diferenciar el primer elemento de la lista principal por forma, tamaño, separación o agrupación propia. Sale de la condición «listas planas».
2. **Tamaño y separación de lo que se puede pulsar** (nivel 0). Igualar el ancho y el alto de los elementos pulsables de una misma familia. Sale de la condición «tamaños uniformes por familia».
3. **Cantidad de contenido a la vez y cómo está dividido** (nivel 1). Sacar de la zona de la tarea el contenido que no pertenece a ella. Sale de la condición «contenido ajeno a la tarea».
4. **Cantidad y organización de las opciones** (nivel 2). Reunir las opciones en menos grupos visibles a la vez; el nivel 3 pide cinco o menos. Sale de la condición «grupos de opciones a la vez».

Sin mejoras propuestas:

- Agrupación visual de los elementos: no es interpretable en la versión 1.
- Qué destaca en la pantalla: obtuvo nivel 3; las rúbricas solo piden mejoras con nivel 2 o menor.
- Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación: no se pudo evaluar; no se sabe si está bien o mal.

## 5. Qué este resultado no dice

- Describe una sola pantalla, la que se ve sin desplazarse. No describe la página completa ni el sitio.
- Viene de 1 repetición por aspecto, de un solo modelo (`claude-opus-5-5`). Otro modelo, u otra repetición, puede dar otro resultado.
- Los niveles son juicios de un modelo sobre medidas que calcula un programa. No sustituyen la revisión de una persona experta, y este resultado no se ha comparado con una.
- «Agrupación visual de los elementos» no es interpretable en la versión 1 del instrumento: su nivel no sirve para comparar páginas.
- Un aspecto que no se pudo evaluar no está bien ni mal: no se sabe. En este resultado: Elementos sobrantes, trabajo que se le deja a la persona y costumbres de ubicación.
- «No aplica» y «no se pudo evaluar» no son ceros.
- No hay puntaje total ni calificación de la página.

---

Detalle técnico: `perfil.md` y `perfil.json`, en esta misma carpeta. Diccionario de lenguaje claro: versión 1.0.0 (`shared/lenguaje-claro.json`).
````

## 6. Lo que no pude hacer o no pude verificar

| Qué | Por qué | Quién puede |
|---|---|---|
| Instalar desde el ZIP 0.2.2 como dice `docs/instalacion.md` (`npm run link/verify/test` del paquete) | El ZIP no está en este equipo. Al reconstruirlo en un clon temporal, `preparar-entrega.js` se negó («El docx cambió respecto al documento generado»), y regenerar el documento exige LibreOffice, que no está instalado | Quien tenga el ZIP 0.2.2 o LibreOffice (la revisión del 4 nov. se hizo en macOS) |
| Que una conversación nueva de Claude Code, partiendo de la frase libre, complete la corrida | En `-p` la skill queda denegada por permisos; el modo automático de esta sesión denegó correrla con permisos ampliados | Juan o Mateo, en una sesión interactiva de Claude Code, aprobando los permisos a mano |
| Probar `claude-fable-5-2` o `claude-opus-5-5` en la CLI | La CLI 2.1.267 pide 2.1.290 o superior | Quien actualice la CLI (no lo hice: cambia el entorno del usuario) |
| Referencia de 35 solicitudes y estabilidad | Era opcional; habría consumido cinco veces más uso, y el límite ya había cortado un intento | — |
| Que `resumen.md` lo entienda alguien ajeno al proyecto | No hubo lectores | El equipo, con una o dos personas fuera del proyecto |
| Tiempo de `recoger` en el humo | No lo medí | — |
| Que el banner de cookies cambie los niveles | No se recapturó sin banner: intervenir a mano está prohibido (CLAUDE.md §10) | Una regla nueva del detector, revisada por Juan |

## 7. Hallazgos sobre archivos sellados

No cambié ninguno.

| Archivo | Hallazgo | Por qué no lo cambié |
|---|---|---|
| `package.json:8` | `"link": "./scripts/link-skills.sh"` falla en Windows (npm usa cmd.exe). `bash scripts/link-skills.sh` funciona y ya es la forma del ZIP | `package.json` está en el sello de `g1-closure` |
| `skills/g5-posicion-progreso/SKILL.md:76` | Comilla invertida sin cerrar en `g5_listas_total`. El subagente de G5 lo notó en la línea 197 del prompt; la frase se lee completa | Rúbrica sellada; un cambio a una rúbrica va en su propio commit (CLAUDE.md §11) |
| `skills/ux-audit/SKILL.md:157-158` | Permite emitir un total si se pide; el prompt de este encargo lo trata como prohibido | Contradicción para decidir, no para resolver en silencio |
| `skills/g1-agrupacion-perceptual/SKILL.md:236` y `shared/schemas/group-result.schema.json:68` | La rúbrica nombra una condición; el esquema acepta cualquier texto, y G1 devolvió «C3, C4» | Endurecer el esquema cambia el instrumento y volvería inválidas respuestas que hoy se aceptan |
| `capture/` (detector de capas 2026-11-04) | No ve un `role="dialog"` fijo de pantalla completa cuyo panel visible ocupa la franja inferior | No es sellado, pero cambiarlo altera la captura y agrava el problema ya registrado de `verify-g5-closure.js` |

## 8. Texto de la tesis afectado

Solo lista; no edité la tesis (`~/git/trabajo-de-grado`, que además tiene cambios ajenos sin commitear).

- `chapters/13-usage.tex:61-63`: «A Worked Audit» describe la 0.2.2 del 5 nov.; el cierre ahora produce un tercer archivo.
- `chapters/13-usage.tex:74-75`: «the closing step built the profile…»: ahora también escribe `resumen.md`.
- `chapters/13-usage.tex:108-109`: «The readable profile … the data profile keeps the detail»: falta el resumen en lenguaje claro y su límite (traduce, no juzga).
- `chapters/13-usage.tex:111-114`: «run under one runtime, not under Claude; … does not test the automatic selection of the skill from a free conversation»: sigue siendo cierto para esa auditoría, pero ya hay evidencia de humo en Claude Code (la skill se selecciona sola y queda bloqueada por permisos en `-p`).
- `chapters/13-usage.tex:116-133` («Reading the Output»): explica `trigger` y `measurements` como campos técnicos; el resumen los traduce y convendría decirlo.
- `chapters/13-usage.tex:135-140`: el total opcional; ver la contradicción del §1.
- Fuera de 13-usage, por si sirve: `chapters/12-plugin.tex:86-88` (el orquestador también escribe el resumen) y `chapters/12-plugin.tex:97-103` (contexto limpio: en Claude Code el subagente hereda `CLAUDE.md`).
