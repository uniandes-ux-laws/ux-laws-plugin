# Protocolo de medición

**Estado: borrador. Se congela el 20 de septiembre de 2026, fechado y con el hash del commit
del tag.** Hasta ese momento este documento cambia; después, no, y cualquier cambio posterior
se declara como desviación en el documento de tesis.

Versión de trabajo: `unreleased` · última edición 11 de septiembre de 2026.

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
