# Revisión de coherencia · tesis ↔ repositorio

13 de septiembre de 2026. Comparación del LaTeX en `tesis-latex/` contra
`ux-laws-plugin` en el estado de hoy (posterior al tag `v0.1.0`).

Qué se comparó: cada cifra, hash, nombre de archivo, fecha y decisión que el documento
afirma, contra el artefacto del repositorio que debería sostenerla. Lo que sigue son los
puntos donde las dos fuentes no dicen lo mismo, ordenados por gravedad, y la clasificación
de los 48 marcadores `\pendiente` del documento.

**Primero lo que sí cierra**, para no dar la impresión de que todo está mal:

| Afirmación del documento | Artefacto | Estado |
|---|---|---|
| Sello del corpus `f9c0caaa…` · 30 páginas · 120 archivos | `corpus/SELLO-v1.md` | coincide |
| Sello de calibración `82cb74b6…` · 24 páginas · 96 archivos | `corpus/SELLO-CALIBRACION-v1.md` | coincide |
| Tag `v0.1.0`, commit `50cdc8b17685…`, congelado el 12 de septiembre | `docs/protocolo.md` §7 | coincide |
| Fidelidad geométrica 0,000 px con tolerancia 1 | `capture/verify-fidelity.js` | coincide |
| `p_e = 0{,}75` exacto para k=5 con pesos cuadráticos; κ 1,000 / 0,9688 / 0,8750 | `scripts/bp-degenerado.js` | aritmética correcta |
| Primera corrida del piloto el 10 de septiembre; reescritura el 11 | `docs/piloto-calibracion.md` | coincide |
| 18 leyes repartidas 4·2·4·2·2·3·1 entre los siete grupos | `skills/` | suma 18 |
| Grilla de 3.900 invocaciones (30×6×2×2×5 + 30×1×2×5) | `shared/decisiones.md` §3 | aritmética correcta |
| 13 de 23 páginas sorteadas rechazadas; 10 seleccionadas | `corpus/dorados-v1-sorteo.json` | coincide |

---

## 1. Un archivo citado que no existe

`chapters/14-study-design.tex` línea 8 remite a **`corpus/SELLO-CORPUS-v1.md`**. Ese archivo
no existe. El nombre real es **`corpus/SELLO-v1.md`**.

Está dentro de un `\pendiente`, así que hoy no llega al PDF como cita. Pero es la clase de
error que no puede sobrevivir: quien redacte la sección a partir del marcador va a citar la
ruta que el marcador nombra. Corregir el marcador antes de escribir la sección.

## 2. El generador de sellos escribe prosa falsa en dos de los tres sellos

`scripts/seal-corpus.js` tiene cuatro frases con texto fijo que no dependen del conjunto que
está sellando:

| Línea | Texto que emite siempre |
|---|---|
| 205 | «el corpus se capturo la noche del 10 de septiembre hora de Bogota» |
| 219 | «las **treinta** paginas se capturaron con la misma configuracion» |
| 247 | «## Las **treinta** paginas» |
| 266 | «No dice que las **treinta** paginas sigan hoy como estaban» |

Consecuencia medida:

- **`SELLO-DORADOS-v1.md`** certifica 10 páginas capturadas entre el 12 y el 13 de
  septiembre, y afirma en su cuerpo que son treinta y que se capturaron la noche del 10.
  **Las dos afirmaciones son falsas.**
- **`SELLO-CALIBRACION-v1.md`** certifica 24 páginas y afirma que son treinta. Su fecha sí
  es correcta.

Esto es el mismo defecto de clase que las siete filas del manifiesto con la nota en la
columna `capture_date`: un campo de plantilla que arrastra texto perteneciente a otro
conjunto. Y es peor de leer, porque el archivo dice en su segunda línea «No se edita a mano»:
está diciéndole al lector que confíe en el generador exactamente donde el generador miente.

**Lo importante para la tesis: arreglarlo no rompe ninguna cita.** `hashDelSello` se calcula
sobre `bloqueCanonico()`, que es la línea `MANIFEST <sha>` más una línea por página con los
cuatro sha256 de sus archivos. La prosa no entra al hash. Regenerar los tres sellos con el
texto parametrizado deja `f9c0caaa…`, `82cb74b6…` y `08d40886…` idénticos, y
`npm run seal:verify` lo demuestra.

**Corrección:** parametrizar por `sello.paginas` y por `condiciones.capturadoEntre`, y
eliminar la frase de la noche del 10 —esa información ya está en la fila «Capturadas entre»,
que sí se calcula—. Regenerar los tres. Verificar que los tres hashes no se mueven.

## 3. El rastro de la única corrección autorizada no reconstruye

Es el hallazgo más serio, porque toca la regla del ajuste único, que es la defensa
metodológica central del capítulo 14.

`docs/piloto-calibracion.md` documenta **dos** cambios al instrumento entre las dos corridas:

1. La reescritura por proporción afectada de G1 y G7 (11 de septiembre).
2. Una **corrección de definición en `p_C1`**: `g_out` se medía contra cualquier nodo externo
   del árbol, de modo que en una página densa siempre había un envoltorio tocando, `g_out = 0`
   y la razón no podía alcanzar 1,5 por construcción. Corregido a medir contra elementos de
   otros grupos de primer nivel.

**`chapters/14-study-design.tex` reporta solo el primero.** La sección «Rewriting, Once» dice
que el piloto aportó «the diagnosis --- the logical form of the anchors --- and not the value
of any threshold», y atribuye el movimiento de G1 a la reescritura. La corrección de C1 no
aparece en ninguna parte del documento.

Y hay un problema de aritmética por debajo, que hay que resolver antes de escribirlo:

| Estado | G1 en nivel 0 | Fuente |
|---|---|---|
| antes de corregir C1 | 24 de 24 | `piloto-calibracion.md`, sección de la corrección |
| primera corrida reportada · 10 sep | 21 de 24 | tabla del documento y del piloto |
| después de la reescritura · 11 sep | 23 de 24 | tabla del documento y del piloto |

La frase del repositorio —«Después de corregirlo… G1 pasó de 24 páginas en 0 a 23»— compara
un estado previo a la primera corrida con el posterior a la reescritura, saltándose el 21. Con
esa redacción **el efecto de la corrección de C1 y el de la reescritura quedan confundidos**,
que es precisamente lo que la regla del ajuste único existe para impedir: un cambio de
definición y un cambio de forma de las anclas, aplicados en la misma ventana, sin atribución
separada.

**Esto no se arregla escribiendo mejor.** Hay que reconstruirlo del historial de
`scripts/pilot-calibracion.js`: en qué commit entró la corrección de `g_out`, y si la tabla de
21/3 se produjo antes o después de ese commit. Las tres distribuciones —24/0, 21/3, 23/1— se
ordenan con esa respuesta y no sin ella. Después, el capítulo declara los dos cambios con su
fecha y su efecto por separado, o declara que no son separables y lo cuenta como amenaza.

## 4. Una decisión que el documento presenta abierta y el repositorio cerró

`chapters/06-objectives.tex` línea 51 dice, en `\pendiente`: «decidir y fijar en el protocolo
qué representación puntúa cada evaluador por grupo… **Decisión de David con Camilo, antes de
M2**».

`shared/decisiones.md` decisión 1, congelada: «**Los evaluadores humanos puntúan la página
renderizada, nunca el wireframe**», con su consecuencia derivada —la concordancia se mide
sistema-sobre-screenshot contra humanos, y la representación se mide sistema-sobre-wireframe
contra sistema-sobre-screenshot—.

Está decidido, congelado dentro del tag y es estructural: los dos términos del objetivo 3
dependen de él. Que el documento lo siga presentando como pendiente de una conversación con
el director tiene un costo concreto ante un jurado: **una decisión de pre-registro que el
documento describe como abierta, y que el repositorio muestra tomada, se lee como decidida
después de ver datos.** Es el peor lugar posible para un desfase de este tipo.

El capítulo 6 es Parte I —la propuesta entregada—. Resolverlo cambia la propuesta, así que no
es una edición silenciosa: o se resuelve con una nota de cambio fechada, o se deja el marcador
en Parte I y la decisión se declara en el capítulo 14 como cierre explícito de ese pendiente,
con su fecha. Lo que no se puede hacer es dejar las dos versiones conviviendo sin que ninguna
mencione a la otra. **Falta además confirmar con Camilo que la decisión 1 es lo que él
avaló**, porque el marcador dice que la decisión era suya y del director.

## 5. Tres afirmaciones de ausencia sin el registro que las sostiene

`chapters/03-background.tex` línea 610 hace tres claims of absence y dice, correctamente, que
«a claim of absence is only as strong as the search behind it». El registro de búsqueda que
las respaldaría es `appendices/e-search-record.tex`, que hoy es un `\pendiente` vacío, y **no
existe ningún artefacto equivalente en el repositorio**: no hay bases consultadas, ni cadenas,
ni fecha de corte, ni criterios.

Contra tu propia regla —toda afirmación soportada o marcada como supuesto— hay tres
afirmaciones verificables en el cuerpo del documento sin nada detrás. Lo mismo vale, en
pequeño, para `appendices/a-corpus.tex` línea 45: qué entidades de salud quedan cubiertas por
la directiva de MinTIC, con la norma, su número y su año. Es una afirmación jurídica, no una
estimación.

**Recomendación aparte, que no pediste:** un `docs/verificacion-citas.md` en el repositorio,
una fila por entrada de `references.bib`, con quién la verificó, cuándo, contra qué URL o DOI,
y qué dice exactamente el pasaje que se cita. Hoy la verificación de las citas existe como
historia de conversaciones y no como artefacto auditable. Es el único punto del trabajo donde
tu restricción más fuerte no tiene un archivo que la respalde.

## 6. Desfases menores, cada uno con su corrección

**6.1 · `docs/protocolo.md` §7 dice `npm run validate # esquema, 10/10`.** Era correcto dentro
del tag. Desde el 13 de septiembre el esquema es v0.2.0 y la validación son 18 casos, como
dicen §1 y §9 del mismo archivo. El bloque de §7 se presenta como «verificación que no depende
de creerle a este documento»: un lector que lo corra en `main` obtiene 18/18 y concluye que
algo no cuadra. Añadir una línea: dentro del tag son 10; en `main`, 18, por la desviación de
§9.

**6.2 · El sello de casos dorados no está en el documento.** `chapters/13-usage.tex` lista dos
sellos. Existen tres: `08d40886…` · 10 páginas · 40 archivos. Los casos dorados son el nivel 4
del plan de pruebas y parte del método, así que el tercer sello va en la tabla de versión.

**6.3 · La definición de cobertura del capítulo no es la que el código mide.**
`chapters/11-capture.tex` §Coverage and Parsimony define cobertura como «the fraction of the
screenshot's non-background ink that falls inside some box of the wireframe».
`scripts/metrics-wireframe.js` mide eso **excluyendo las cajas que ocupan ≥ 90 % del
viewport** (`MAX_COVER_FRACTION`) y con un umbral de tinta de 24 sobre la distancia al color
de fondo (`INK_THRESHOLD`). Las dos decisiones son correctas y están justificadas —sin la
exclusión la métrica da 100 % trivialmente, que ya pasó una vez—, pero **no están en el
capítulo**. Escribir las cifras bajo la definición actual sería describir mal lo que se midió.
La definición del capítulo tiene que incorporar la exclusión y el umbral antes de que entre
ningún número.

**6.4 · El contenido del marcador de esquema está vencido.**
`chapters/12-plugin.tex` línea 15 enumera «las tres decisiones codificadas en el esquema»:
`trigger` obligatorio, `measurements` obligatorio, y `run` con `model_id`, `prompt_hash`,
`repetition`, `runtime` y `captured_at`. El esquema hoy es **v0.2.0** y también exige
`decoding`, `capture_sha256`, `measurements_version` y `protocol_version`, con patrón en
`model_id`. Quien redacte la sección desde el marcador va a contar la historia de v0.1.0.

**6.5 · «La misma semilla reproduce la misma muestra» es cierto solo para un universo fijo.**
`docs/casos-dorados.md` lo afirma en negrita. El comentario de `scripts/sample-golden.js` dice
lo contrario y tiene razón: «Ampliar el universo cambia el tamaño de los estratos y con el
todos los barajados». El universo hoy tiene 57 páginas y `casos-dorados.md` dice que se añadieron dieciséis
candidatas para la cuota, de donde antes tenía 41: el sorteo original y el actual no corrieron
sobre el mismo universo. La afirmación hay que acotarla: **para un universo dado, identificado por su sha256**
—que el registro sí guarda: `a452f8cddcc5…`—. Con esa acotación la reproducibilidad del
sorteo queda bien sostenida, y la cuota de paso sí está sorteada y no elegida a mano, que era
lo que había que verificar: `garantizar()` baraja los candidatos con el mismo `rnd` sembrado.

**6.6 · `npm run seal:dorados` no pasa `--rol`,** a diferencia de `seal:calibracion`. Hoy no
causa daño porque `dorados-v1.csv` no tiene columna `role` y el filtro queda en `null`. Vale
dejarlo declarado antes de que alguien añada la columna y el sello empiece a certificar un
subconjunto distinto del que cree.

---

## 7. Los 48 marcadores `\pendiente`, clasificados

No son 45: son **48**. El reparto por archivo está al final de esta sección.

### Clase A · El dato ya existe en el repositorio y solo hay que traerlo (22)

Estos se cierran esta semana y no dependen de nadie de fuera.

| Marcador | De dónde sale |
|---|---|
| `14` §Corpus and Sealing | `corpus/SELLO-v1.md` (corregir el nombre, punto 1) |
| `14` §The Pre-registered Protocol | `docs/protocolo.md` §1, §2, §7 |
| `14` §The Agreement Statistic | `docs/protocolo.md` §5 + `shared/escala.md` + `scripts/bp-degenerado.js` |
| `13` §Installing by Command | `docs/instalacion.md` |
| `13` §Installing by Prompt | `docs/contexto/PROMPT-INICIAL.md` |
| `13` §Reading the Output | esquema v0.2.0 + `shared/escala.md` (la regla de no emitir total) |
| `11` §Coverage and Parsimony | `scripts/metrics-wireframe.js`, corriendo `npm run metrics` — **con el arreglo 6.3 primero** |
| `12` ×5 | `.claude-plugin/`, `scripts/link-skills.sh`, `shared/schemas/`, `scripts/orchestrate.js` |
| `09` ×8 | las siete `skills/*/SKILL.md` |
| `08` ×3 | §3.1.3 de la Parte I + `docs/contexto/02-ESPECIFICACION-LEYES.md` |
| `d-protocol` | `docs/protocolo.md`, completo y sin editar |

### Clase B · Esperan un resultado que va a llegar (17)

Legítimos. No se tocan, no se rellenan, y el documento no promete su contenido.

Los seis de `15-results` y los cuatro primeros de `16-discussion` esperan que corra la grilla y
el piloto de G3–G6. Los dos de `17-conclusions` esperan a los anteriores. `14` §Execution Grid
espera el conteo ejecutado contra el planeado. `14` §Human Panel y `06`:164 esperan al comité
de ética. `16` §Limitations espera poco: tiene casi todo su contenido ya (ver punto 8).

### Clase C · Esconden una decisión sin tomar (9) — estos primero

| Marcador | Qué esconde realmente |
|---|---|
| `06`:51 representación del evaluador | **Ya decidido en el repositorio y no en el documento.** Punto 4 |
| `03`:610 + `e-search-record` | Tres afirmaciones de ausencia sin registro de búsqueda. Punto 5 |
| `a-corpus`:45 MinTIC | Afirmación jurídica sin verificar, entidad por entidad |
| `10`:171 + `c-rubrics` | Bloqueados por una sola cosa: el generador no emite `.tex`. No es una decisión, es una tarea pequeña que bloquea dos apéndices enteros |
| `11`:167 modos de falla | Requiere contar sobre las capturas reales. El script no existe |
| `12`:15 esquema | Contenido vencido. Punto 6.4 |
| `06`:164 ética | La fecha real existe y no está escrita en ninguna parte |

### Reparto

`09` 8 · `15` 6 · `16` 5 · `14` 5 · `12` 5 · `13` 4 · `08` 3 · `17` 2 · `11` 2 · `06` 2 ·
`10` 1 · `03` 1 · `a-corpus` 1 · `c-rubrics` 1 · `d-protocol` 1 · `e-search-record` 1.

---

## 8. El sesgo del conjunto evaluable merece su propia línea en limitaciones

Sobre el hallazgo de los casos dorados —13 de 23 páginas sorteadas sin captura limpia,
concentradas en checkout y trámite—: **sí, va como línea propia, y no dentro de «corpus de
treinta páginas colombianas».**

La razón es que es de otra especie. Un sesgo general de corpus desplaza todos los grupos por
igual y se declara una vez. Este golpea **un constructo en particular**: las páginas donde
existiría un indicador de progreso —checkout, cotizador, trámite por etapas— son
sistemáticamente las que más protección anti-bot tienen. Eso significa que **la rama
`not_applicable` de G5 no falta al azar**. Un grupo cuya rama aplicable es justo la que el
método no puede capturar no tiene un problema de tamaño de muestra: tiene un problema de
identificación, y la frecuencia de no-aplicable que `15-results` va a reportar como «hallazgo
sobre el constructo» sería, en parte, un artefacto de la capa de captura.

Redacción que propongo para `16-discussion` §Limitations, a confirmar:

> El conjunto de páginas que admite captura automática limpia no es una muestra aleatoria de
> la web: está sesgado hacia sitios sin protección anti-bot agresiva. Sobre las 23 páginas
> sorteadas para los casos dorados, 13 no admitieron captura. El sesgo no es uniforme entre
> grupos: se concentra en páginas de checkout y de trámite por etapas, que son exactamente
> donde el criterio de progreso de G5 aplica. La frecuencia de `not_applicable` de G5 hay que
> leerla, por tanto, como propiedad conjunta del constructo y de la capa de captura, y no del
> constructo solo.

Y una obligación que se deriva: **G5 no puede reportar su frecuencia de no-aplicable sin el
denominador de páginas que fueron rechazadas por captura.** Sin eso la cifra no es
interpretable.

## 9. El esquema v0.2.0 queda confirmado

Endurecer con cero `group-result` producidos es la única ventana en que endurecer no invalida
nada, y haberlo notado es correcto. `decoding` y `capture_sha256` obligatorios eran necesarios
—sin `decoding` la varianza entre repeticiones no es atribuible, y sin `capture_sha256` un
resultado no está amarrado a la captura que lo produjo—. `measurements_version` y
`protocol_version` añadidos por cuenta propia: bien, son los dos campos que hacen falta para
que un resultado viejo siga siendo legible cuando las rúbricas cambien. Los seis controles
negativos que pasaban bajo v0.1.0 son el argumento, no el adorno: pónganlos en el capítulo 12.

Lo que **no** queda confirmado: el tag `v0.1.0` no se toca, la fila de §9 se mantiene, y el
próximo congelamiento —el de M3— absorbe la desviación en el cuerpo congelado.

## 10. Orden de trabajo

1. Arreglar `seal-corpus.js` (punto 2), regenerar los tres sellos, verificar que los tres
   hashes no se mueven. Es lo único que hoy pone una afirmación falsa en un archivo que la
   tesis cita como certificación.
2. Reconstruir del historial de git el orden de la corrección de C1 (punto 3). Sin esa
   respuesta, el capítulo 14 no se puede cerrar.
3. Arreglar la definición de cobertura en el capítulo 11 (6.3), correr `npm run metrics`, y
   escribir las cifras. Es el pendiente que Camilo va a mirar el 24.
4. Añadir la salida `.tex` al generador de rúbricas. Desbloquea dos apéndices.
5. Resolver `06`:51 con Camilo (punto 4) y escribir la fecha de ética.
6. Empezar el registro de búsqueda (punto 5). Es el hueco más viejo y el que más tarda.
7. Los 22 de clase A, en el orden en que estén sus artefactos.
