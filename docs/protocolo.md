# Protocolo de medición

**Estado: CONGELADO el 12 de septiembre de 2026**, ocho días antes de la fecha prevista.
Desde este momento el documento no cambia, y cualquier cambio posterior se declara como
desviación fechada en el documento de tesis.

Versión: **0.1.0** · tag `v0.1.0` · identidad y hashes en §7 · lo que NO congela, en §8.

El congelamiento es **por etapas**: se congela lo verificado, y lo que no lo está queda
declarado como tal con fecha para su cierre. Ver §2.

---

## 1. Qué congela este protocolo

Lo que un lector necesita para re-correr la medición y obtener lo mismo: qué páginas, qué se
capturó de ellas, con qué reglas se puntúan, cómo se ejecuta la grilla y cómo se analiza.

| Pieza | Dónde vive | Estado |
|---|---|---|
| Manifiesto y sello del corpus | `corpus/corpus-v1.csv`, `corpus/SELLO-v1.md` | **Sellado** · `f9c0caaaa2ea…` |
| Conjunto de calibración | `corpus/calibracion-v1.csv`, `corpus/SELLO-CALIBRACION-v1.md` | **Sellado** · `82cb74b67c3d…` · 24 páginas, 96 archivos |
| Capa de captura | `capture/`, ADR-01 | Verificada · fidelidad 0,000 px |
| Escala ordinal y escala de tolerancia | `shared/escala.md` | Cerrada |
| Decisiones de implementación | `shared/decisiones.md` | Congeladas |
| Esquema de salida | `shared/schemas/group-result.schema.json` | Verificado · 10/10 |
| Las siete rúbricas | `skills/*/SKILL.md` | Tres calibradas, cuatro sin piloto · ver §3 |
| Grilla de ejecución | — | `[PENDIENTE: 3.900 invocaciones; falta confirmar presupuesto en los dos backends]` |
| Análisis y coeficientes | — | `[PENDIENTE: scripts de análisis; el coeficiente y sus pesos están decididos, la implementación no existe]` |
| Protocolo con evaluadores humanos | — | `[PENDIENTE: depende de la aprobación del comité de ética, sin confirmar]` |

## 2. El congelamiento es por etapas

**El 20 de septiembre se congela lo que está verificado, y lo que no lo está queda declarado
como no calibrado, con fecha para su piloto.** No se congelan las siete rúbricas como si las
siete estuvieran calibradas.

La razón es directa: un protocolo que declara «rúbricas calibradas» cuando cuatro de las siete
no se han visto ejercitar afirma algo que no se verificó, y el lector no tiene cómo saber
cuáles sí. Declarar la etapa cuesta una tabla y compra que el resultado sea interpretable.

| Etapa | Qué se congela | Cuándo |
|---|---|---|
| **M2 · 20 de septiembre** | Corpus sellado, conjunto de calibración sellado, capa de captura, esquema, escalas, decisiones, y las rúbricas **G1, G2 y G7** con su piloto corrido y fechado | 20 sep 2026 |
| **M3 · 4 de octubre** | Las rúbricas **G3, G4, G5 y G6**, una vez implementadas sus skills y corrido su piloto sobre el mismo conjunto de calibración | 4 oct 2026 |

**Lo que queda declarado el 20 de septiembre**, y tiene que aparecer así en el documento de
tesis y en cualquier reporte de resultados:

> G3, G4, G5 y G6 se congelan sin piloto de calibración. Sus anclas dependen de juicios
> semánticos que no se deciden sobre el árbol de layout, y su ejecución no existía a la fecha
> del congelamiento. Su piloto se corre sobre el mismo conjunto de calibración en M3 y se
> fecha entonces. Hasta ese momento, sus puntajes se interpretan sin evidencia de que la
> rúbrica ejercite su escala.

**Consecuencia sobre el análisis.** El coeficiente agrupado sobre los 210 pares unidad-grupo
sigue siendo el resultado confirmatorio, pero se reporta **separando los grupos calibrados de
los no calibrados** hasta que el piloto de M3 esté corrido. Un coeficiente alto en un grupo
cuya rúbrica no ejercita su escala no es evidencia de acuerdo: es el efecto descrito en §4.

## 3. Estado de calibración de las siete rúbricas

Corrida del 11 de septiembre sobre las 24 páginas de `corpus/calibracion-v1.csv`. Detalle en
`docs/piloto-calibracion.md`.

| Grupo | Piloto | Niveles usados | Estado para el congelamiento |
|---|---|---|---|
| G1 Agrupación perceptual | Corrido | **2 de 5** | Congela **declarada como no discriminante**: reescrita por proporción y sigue sin ejercitar la escala. **Deja cuatro de las dieciocho leyes sin resultado interpretable** |
| G2 Arquitectura de decisión | Corrido | **4 de 5** | Congela calibrada |
| G3 Capacidad y segmentación | No corrido | — | Declarada · piloto en M3 |
| G4 Saliencia visual | No corrido | — | Declarada · piloto en M3 |
| G5 Posición y progreso | No corrido | — | Declarada · piloto en M3 |
| G6 Economía y convención | No corrido | — | Declarada · piloto en M3 |
| G7 Targeting motor | Corrido | **3 de 5** | Congela calibrada |

G1 se congela con la advertencia puesta en vez de seguir ajustándola, por la regla de §4.

### Lo que cuesta congelar G1 como no discriminante

**G1 subsume cuatro de las dieciocho leyes —Proximidad, Prägnanz, Región común y Similitud—,
más que ningún otro grupo, y son la familia Gestalt completa.** La unidad de puntaje es el
grupo y nunca la ley, así que la consecuencia es directa: **congelar G1 sin que ejercite su
escala deja esas cuatro leyes sin resultado interpretable en la versión 1.** No salen mal: no
salen. Un puntaje que vale 0 en 23 de 24 páginas no ordena pantallas, y su coeficiente de
acuerdo mide la convergencia en el 0, con el efecto que cuantifica §5.

Esto obliga a tres cosas en el reporte de resultados, y las tres son de cumplimiento
obligatorio, no recomendaciones:

1. **El coeficiente agrupado se reporta con y sin G1.** Incluirlo sin decirlo infla el
   resultado confirmatorio con un grupo cuyos puntajes no varían.
2. **El perfil de los siete grupos lleva G1 marcado como no interpretable**, en la tabla misma
   y no en una nota al pie. Un lector que mire el perfil tiene que ver el hueco sin buscarlo.
3. **La sección de resultados dice explícitamente qué preguntas quedan sin responder para esas
   cuatro leyes**: la de correspondencia con el juicio experto queda sin responder; la de qué
   principios admiten un criterio observable sí queda respondida, en negativo, y es un hallazgo
   legítimo del trabajo.

**El alcance de la afirmación es estrecho y hay que mantenerlo estrecho.** Lo medido es que
*esta* rúbrica, con *esta* implementación provisional, sobre *estas* 24 páginas, no reparte su
escala. No que los principios Gestalt no sean medibles.

**Y es exactamente por este costo que la regla del ajuste único existe.** Cuando lo que está
en juego son cuatro de las dieciocho leyes, la presión para mover el corte hasta que G1
reparta es máxima. El único camino abierto es el de §4: demostrar un defecto en la definición
de C4, argumentado, fechado y registrado antes de volver a correr.

## 4. La regla del ajuste único

Definida en `shared/escala.md` y repetida aquí porque gobierna todo lo que venga después.

La escala, reproducida aquí para que este documento se lea solo:

| Etiqueta | Proporción afectada |
|---|---|
| **impecable** | `p = 0` |
| **aislado** | `0 < p ≤ 0,10` |
| **frecuente** | `0,10 < p ≤ 0,25` |
| **generalizado** | `p > 0,25` |

Combinación: **0** dos o más generalizadas o una con `p > 0,50` · **1** una generalizada o dos
o más frecuentes · **2** ninguna generalizada y al menos una frecuente · **3** todas con
`p ≤ 0,10` · **4** todas impecables más la condición adicional que la rúbrica nombra.

Los cortes son décimas y cuartos redondos, elegidos por interpretables. **No se derivan de los
datos del piloto, ni de la literatura, ni de ningún corpus.**

**Los umbrales de la escala de tolerancia —0, 0,10, 0,25 y 0,50— se fijan una vez y no se
vuelven a tocar mirando la distribución que producen.**

Si después de aplicarla una rúbrica sigue sin usar alguno de sus niveles, **eso es un hallazgo
sobre las páginas evaluadas, no una razón para mover los umbrales**. Un umbral que se reajusta
hasta que la distribución queda repartida deja de medir la pantalla y pasa a medir la voluntad
de quien lo ajusta.

**La única razón admisible para volver a tocar una condición** es demostrar un defecto en su
*definición* —que mida algo distinto de lo que dice medir—, con el mecanismo explicado y
verificable, nunca la forma de la distribución. Un cambio así se argumenta, se fecha y se
registra **antes** de volver a correr. Ejemplo de los dos casos, del 11 de septiembre:

- **Admisible:** `p_C1` valía 1,000 en el 100 % de las páginas calculables porque `g_out` se
  medía contra cualquier nodo del árbol y en una página densa siempre hay uno tocando, de modo
  que la razón no podía alcanzar 1,5 por construcción. Defecto de definición, demostrable sin
  mirar la distribución de niveles. Corregido y registrado.
- **No admisible:** subir el corte de «generalizado» de 0,25 a 0,40 para que G1 dejara de dar
  0. No se hizo, y este párrafo existe para que quede constancia de que se consideró y se
  rechazó.

## 5. Por qué la calibración no es opcional

Brennan–Prediger con pesos cuadráticos usa un acuerdo esperado fijo, `p_e = 0,75` para `k = 5`,
que no depende de las marginales. Si una rúbrica solo puede asignar un nivel, el sistema y el
humano coinciden en ese nivel y el coeficiente sale **1,000**: acuerdo perfecto sobre nada.
Con la distribución realmente medida de G1 y G7 antes de la reescritura —21 ceros y 3 unos—
contra un humano que converge en 0, el coeficiente es **0,969**, más alto que el **0,875** de
dos evaluadores que sí usan los cinco niveles y discrepan la mitad de las veces.

`node scripts/bp-degenerado.js` reproduce los cuatro números.

Por eso el piloto bloquea M2, y por eso los grupos sin piloto se reportan aparte.

## 6. Lo que este protocolo todavía no dice

- `[PENDIENTE: la grilla de ejecución completa —modelos, temperaturas, orden de invocación y
  presupuesto— depende de confirmar el presupuesto de invocaciones en los dos backends]`
- `[PENDIENTE: los scripts de análisis y el cálculo del intervalo de los coeficientes por
  grupo]`
- `[PENDIENTE: el protocolo de sesión con evaluadores humanos, bloqueado por la aprobación del
  comité de ética, cuyo estado no está confirmado]`

Un protocolo con huecos declarados es honesto. Uno con huecos rellenados a último momento con
texto plausible es lo que este documento existe para evitar.

## 7. Identidad de esta versión congelada

**Tag: `v0.1.0`.** Es el artefacto que el documento de tesis cita. Un lector que instale la
rama por defecto dentro de un año obtiene algo distinto de lo que la tesis describe; por eso
se cita el tag y su hash, nunca `main`.

| | |
|---|---|
| Fecha del congelamiento | 12 de septiembre de 2026 |
| Tag | `v0.1.0` |
| Commit congelado | `50cdc8b1768c52cfc93157b356958865b3934f39` |
| Objeto del tag | `be4808d8fcc79689148778da3629924e3656f990` |
| Sello del corpus | `f9c0caaaa2eaec7793860e46c0bf78530489877af1e33a5ac417ee8490933437` · 30 páginas, 120 archivos |
| Sello del conjunto de calibración | `82cb74b67c3d9ea977d3b246867a2c23b89408a6871582e322cc38dd2a9c6c68` · 24 páginas, 96 archivos |
| Versión de las rúbricas | `protocol_version: 0.1.0` en las siete `SKILL.md` |

**Por qué el hash del commit aparece anotado y no calculado dentro del archivo.** Un archivo
no puede contener su propio hash: escribir el hash lo cambia. El procedimiento, y su orden,
es el siguiente y queda declarado:

1. Este documento se cierra con el marcador `[HASH-DEL-COMMIT]` y se commitea. Ese commit es
   el que el tag señala.
2. Se crea el tag anotado `v0.1.0` sobre él. **El mensaje del tag —que se escribe después del
   commit y por tanto sí puede contenerlo— lleva el hash, los dos sellos y el estado de
   calibración de las siete rúbricas.**
3. El commit inmediatamente siguiente sustituye el marcador por el hash real. Ese commit ya no
   está dentro del tag: es la anotación, no el artefacto. **Dentro del tag, la fila dice
   `[HASH-DEL-COMMIT]`**, y eso es correcto y esperado: la copia congelada no puede nombrarse
   a sí misma. Quien quiera el hash lo obtiene de `git rev-parse v0.1.0^{}` o del mensaje del
   tag, que son fuentes que no dependen de este archivo.

Verificación, que no depende de creerle a este documento:

```bash
git rev-parse v0.1.0^{}       # el commit congelado; sin el ^{} devuelve el objeto del tag
git tag -n99 v0.1.0           # el mensaje del tag, con los sellos
npm run seal:verify           # 120 archivos del corpus
npm run seal:calibracion:verify   # 96 del conjunto de calibración
npm run validate              # esquema, 10/10
npm run fidelity              # geometría y tinta, 0,000 px
```

## 8. Qué NO congela esta versión, y qué significa

Un protocolo que se presenta como completo cuando no lo está es peor que uno con huecos
visibles. Estos son los huecos, y ninguno se rellena con texto plausible:

| Hueco | Consecuencia si no se cierra |
|---|---|
| Piloto de G3, G4, G5 y G6 | Cuatro rúbricas se aplican sin evidencia de que ejerciten su escala. Sus coeficientes se reportan aparte hasta M3 |
| G1 no discriminante | Cuatro de las dieciocho leyes sin resultado interpretable · §3 |
| Grilla de ejecución | El tramo de medición no tiene presupuesto confirmado; si no cabe, se reduce el número de repeticiones y se declara |
| Scripts de análisis | No existen. El cálculo del coeficiente y sus intervalos está decidido y no implementado |
| Aprobación de ética | Sin ella no hay ground truth humano, y sin ground truth la tesis reporta el instrumento, la dispersión y las comparaciones entre canales y entre runtimes, declarando la ausencia |
| Reproducibilidad en otra máquina | El nivel 10 del plan de pruebas no se ha corrido: nadie ha instalado esto desde cero fuera de la máquina de desarrollo |

**Congelar con huecos declarados es la decisión, y es deliberada.** La alternativa —esperar a
tenerlo todo— deja el corpus sin sellar y las rúbricas sin fechar mientras la medición corre,
que es exactamente el orden que invalida un pre-registro.

## 9. Desviaciones posteriores al congelamiento

El protocolo se congeló el 12 de septiembre de 2026. Todo cambio posterior a un artefacto que
`v0.1.0` contiene entra en esta tabla, con su fecha y su efecto sobre lo medido. Una desviación
declarada es parte del método; una desviación silenciosa lo anula.

| Fecha | Qué cambió | Efecto sobre lo que `v0.1.0` mide |
|---|---|---|
| 2026-09-12 | **Decisión 9** en `shared/decisiones.md`: el código calcula los *measurements*, el agente asigna el nivel y nombra el `trigger`, y el agente nunca cuenta ni mide sobre la imagen | **Ninguno sobre los umbrales ni sobre el corpus.** No cambia ninguna ancla, ningún corte de la escala de tolerancia, ninguna página ni ningún hash. Fija el reparto de trabajo entre código y agente, que en `v0.1.0` estaba implícito en las rúbricas y no declarado |
| 2026-09-12 | **Doce criterios se emiten leyendo el screenshot aunque su grupo declare el wireframe como canal de referencia.** Marcados en cada `SKILL.md` y en `measurements.json` | **Sobre el nivel 6, comparación entre canales: deja de ser limpio para esos criterios.** Ninguna ancla cambia, ningún umbral se mueve. Ver el detalle abajo |
| 2026-09-12 | `capture/capture.js` registra `consent.descartado: false` cuando se captura con `--keep-interstitials`, en vez de dejar `consent` en `null` | **Ninguno sobre las capturas selladas**, que no se vuelven a tomar. Afecta solo a capturas futuras, y hace distinguible el brazo con muro del brazo sin muro en la ablación del nivel 8 |

**Por qué esta desviación se admite.** Las ocho decisiones congeladas regulan *qué* se mide y
*contra qué escala*. La novena regula *quién* calcula cada cosa dentro del sistema, que es una
capa por debajo y no toca el instrumento. Dejarla sin declarar habría sido peor: las siete
skills de M3 se implementan contra ella, y un lector que comparase las rúbricas de `v0.1.0`
con su implementación encontraría una división del trabajo que ningún documento explica.

**Lo que esto obliga.** El congelamiento siguiente —el de M3, con G3 a G6 calibradas— incorpora
la decisión 9 al cuerpo congelado y esta fila pasa a ser historia, no excepción vigente.

### Los doce criterios que dependen del texto

`nodes.json` no registra el texto de los nodos, y **no se va a registrar**. La razón no es de
esfuerzo ni de sello: el wireframe abstrae el contenido, y entregarle el texto al evaluador del
canal wireframe le daría justo lo que el wireframe no muestra. La comparación entre canales
—que existe para estimar cuánto aporta el screenshot que el wireframe no tiene— dejaría de
medir eso.

La consecuencia se declara **por criterio, no por grupo**:

| Grupo | Criterios que exigen leer el screenshot | Comparación entre canales |
|---|---|---|
| G1 | ninguno | **limpia** |
| G2 | `Ap` | limpia cuando el `trigger` no es `Ap` |
| G3 | `U`, `H`, `V`, `X` | **contaminada casi siempre**: son cuatro de sus cinco juicios |
| G4 | `P` | no aplica: G4 corre solo sobre screenshot |
| G5 | `Q`, `G_nombra`, `G_actual`, `G_forma` | limpia cuando `Q` es falso |
| G6 | `R`, `T`, `K_ap`, `K` | **nunca limpia**: son todos sus juicios |
| G7 | ninguno | **limpia** |

**Cómo se reporta.** Cada salida lleva en `measurements.lectura_screenshot` los criterios que
esa corrida concreta necesitó leer. El nivel 6 separa los puntajes por ese campo en vez de
promediarlos juntos: un término de representación calculado sobre puntajes contaminados mide
la contaminación.

**Lo que esto le cuesta a la tesis, dicho sin rodeos.** El objetivo de estimar cuánto aporta el
screenshot sobre el wireframe queda respondible en G1 y G7, parcialmente en G2 y G5, y no
respondible en G3 y G6. Se reporta así, con el recuento de criterios, y no como un promedio
sobre los seis grupos estructurales.

## 10. Ningún campo de atribución admite valor por defecto

**Regla.** Si un campo decide *a qué sistema, a qué versión o a qué artefacto se atribuye un
resultado*, no puede tener valor por defecto. Falta el valor, falla la corrida.

**Por qué es una regla y no una buena práctica.** Un default silencioso no rompe nada en el
momento: la corrida termina, los archivos se escriben, los números salen. El daño aparece
meses después, cuando hay que decir qué modelo produjo qué puntaje y la respuesta es
«pendiente» en 3.900 filas. Eso no se arregla: la corrida se repite entera, o el tramo se
declara perdido.

**El matiz que la hace aplicable.** Un valor por defecto es admisible cuando el valor
*efectivo* queda registrado en el artefacto. El viewport, el user agent y el modo de wireframe
de `capture/capture.js` tienen default, y son legítimos porque cada `meta.json` guarda el
valor con el que se capturó: la atribución sobrevive. Lo prohibido es el default que **no deja
rastro** o que deja un rastro que no distingue dos situaciones distintas.

### Auditoría del 12 de septiembre de 2026

| Campo | Estaba | Ahora |
|---|---|---|
| `model_id` del orquestador | default `"pendiente"` | **obligatorio**, y validado contra un patrón de identificador real: se rechazan marcadores de posición, nombres comerciales sueltos y valores con espacios |
| `runtime` del orquestador | default `"claude-code"` | **obligatorio**. El nivel 7 compara runtimes: sin este campo la comparación no es atribuible |
| `decoding` | ausente del libro y opcional en el esquema | **obligatorio** en el libro: o los parámetros como JSON, o el literal `no-expuesto-por-el-runtime`. Lo que no se admite es el silencio |
| `capture_sha256` | opcional en el esquema y ausente del libro | **registrado en el libro** por invocación: ata el puntaje a los bytes evaluados y no a una URL |
| `--out` de la corrida | default `corridas/sin-nombre` | **obligatorio** |
| `consent` en `meta.json` con `--keep-interstitials` | `null`, **idéntico a una página sin interstitial** | registra `descartado: false` con su razón. Sin esto, la ablación del nivel 8 —puntuar con muro y sin muro sobre las mismas páginas— no podía distinguir sus dos brazos |
| `--repeticiones` | default `5` | **se conserva**: no es atribución sino la constante del protocolo (decisión 3), queda registrada en el libro y se valida contra 1–5 |
| viewport, user agent, modo de wireframe | default | **se conservan**: el valor efectivo va en cada `meta.json` |

### Lo que esta auditoría encontró y no se ha corregido

`group-result.schema.json` declara `decoding` y `capture_sha256` como **opcionales**. Una
salida sin ellos valida igual, y el esquema está dentro del tag `v0.1.0`: volverlos
obligatorios es una modificación del artefacto congelado con efecto sobre toda salida ya
producida. Mientras tanto el orquestador los exige en su libro, que es donde la atribución de
estas corridas vive. **Queda propuesto para el congelamiento de M3**, no aplicado por mi
cuenta.
