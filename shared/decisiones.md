# Decisiones de implementación congeladas

Fijadas antes de escribir las rúbricas, para que las siete se escriban contra las mismas
reglas. Cambiar cualquiera después del congelamiento del protocolo rompe el pre-registro.

**1. Los evaluadores humanos puntúan la página renderizada, nunca el wireframe.** El
ground truth tiene que ser juicio experto sobre la interfaz y no sobre un artefacto
intermedio del proyecto. Consecuencia: la concordancia se mide comparando el sistema sobre
screenshot contra los humanos, y la representación se mide comparando el sistema sobre
wireframe contra el sistema sobre screenshot. Los dos términos quedan separados sin trabajo
humano adicional.

*Alcance, añadido el 13 de septiembre de 2026.* Esta decisión gobierna **el panel de
referencia**: los evaluadores externos cuyo juicio es el ground truth del objetivo 4. No
gobierna **los casos dorados** del nivel 4 del plan de pruebas, donde los tres autores
escriben el nivel esperado en el canal que la skill ve —wireframe para seis grupos,
screenshot para G4—. La distinción no es una excepción de conveniencia y tiene una razón por
lado:

- El panel produce ground truth, y un juicio experto sobre un artefacto intermedio de este
  proyecto no lo sería. Por eso siempre la página renderizada.
- Los casos dorados prueban el instrumento, no lo validan. Si el evaluador y la skill miran
  representaciones distintas, un desacuerdo no es interpretable: no se puede saber si la skill
  juzgó mal o si simplemente vio otra cosa. Por eso el mismo canal.

**Consecuencia que hay que respetar al reportar:** el acuerdo de los casos dorados es acuerdo
**entre los autores del instrumento**, no acuerdo humano en el sentido del objetivo 4. Mide si
el texto de la rúbrica es inequívoco para quien ya sabe qué quiso decir, que es una propiedad
útil de la rúbrica y no evidencia de validez. **No se reporta en la misma tabla que el
coeficiente del panel**, porque puestas juntas las dos cifras se leen como comparables.

**2. Viewport fijo de 1440 × 900 px, y se captura solo lo visible sin scroll.** Es lo que
la propuesta llama "una sola pantalla capturada". Capturar la página completa haría
incomparables una página larga y una corta, y dejaría n1 indefinido. Costo declarado: el
contenido bajo el pliegue no se evalúa.

**3. Cinco repeticiones por configuración.** La grilla queda en 30 páginas × 6 grupos ×
2 canales × 2 runtimes × 5, más 30 × 1 grupo × 2 runtimes × 5 para G4: 3.900 invocaciones.

**4. La salida de cada grupo lleva un campo `trigger`** que nombra la condición observable
que fijó el nivel. Aplica a los siete y no solo a G3. Un puntaje sin la condición detrás no
es auditable ni diagnosticable.

**5. `not_applicable` solo con una condición objetiva declarada por adelantado en cada
rúbrica.** Un caso marcado N/A por ambas partes se excluye del grupo y se reporta cuántos
se excluyeron. Si una parte marca N/A y la otra puntúa, cuenta como desacuerdo máximo, para
que la exclusión no pueda inflar el acuerdo.

**6. El instrumento puntúa propiedades independientes de la tarea del usuario, y se
declara.** Los criterios están redactados sin suponer una tarea: la acción dominante de G2
se determina por peso visual y tamaño relativo; G5 puntúa si hay jerarquía de orden marcada
y no cuál ítem es más importante; G3 puntúa co-visibilidad de un dato con el campo que lo
requiere. Declarar una tarea por página sería otro estudio.

**7. Las recomendaciones se emiten y no se miden en la v1.** Las rúbricas las exigen cuando
el puntaje es 2 o menor y el sistema las produce, pero ningún objetivo verifica si son
accionables. Salen como salida declarada no validada.

**8. El catálogo de convenciones de Jakob queda cerrado en ocho patrones y fechado.** Está
en la rúbrica de G6. Sin catálogo cerrado el criterio es una opinión.

---

**9. El código mide, el agente juzga, y el agente nunca cuenta sobre la imagen.**
*Adoptada el 12 de septiembre de 2026, después del congelamiento de `v0.1.0`. Se declara como
desviación fechada en `docs/protocolo.md` §9.*

El reparto es este y no admite zonas grises:

| | Lo hace el código | Lo hace el agente |
|---|---|---|
| Enumerar nodos, contar accionables, medir distancias y tamaños | **sí** | nunca |
| Calcular proporciones y su denominador | **sí** | nunca |
| Extraer color, contraste y tamaño de un elemento del screenshot | **sí** | nunca |
| Decidir qué cuenta como unidad de tarea, elemento ajeno, aislado visual o convención rota | no | **sí** |
| Asignar el nivel contra las anclas de la rúbrica | no | **sí** |
| Nombrar el `trigger` que fijó el nivel | no | **sí** |

**Por qué.** Contar cajas mirando un PNG es exactamente lo que un modelo hace peor, y no es
reproducible: dos corridas sobre la misma imagen devuelven conteos distintos sin que nada haya
cambiado en la pantalla. El árbol de layout ya tiene esos números de forma exacta. Separar
medición de juicio, además, **hace atribuible la varianza**: si el nivel oscila entre
repeticiones, la oscilación es del juicio, porque las cifras de entrada son idénticas byte a
byte. Con medición y juicio mezclados no habría forma de saber si el modelo cambió de opinión
o si contó distinto.

**Consecuencias, y hay que aceptarlas las tres.**

1. **Toda cantidad que una rúbrica necesite tiene que ser calculable por código, o declarada
   explícitamente como juicio semántico con la evidencia sobre la que se emite.** No hay
   tercera categoría. Esto obligó a reescribir las siete rúbricas declarando, campo por campo,
   qué leen de `measurements.json` y qué deciden.
2. **El agente no puede corregir una cifra mirando la pantalla.** Si cree que el número está
   mal, no lo sustituye por el suyo: marca `evidence_insufficient` y lo dice en el hallazgo. Un
   agente que ajusta las cifras que recibe vuelve a meter la medición no reproducible por la
   puerta de atrás.
3. **El techo de calidad del sistema pasa a ser el de la capa de medición.** Si el código
   agrupa mal, el agente juzga bien sobre datos malos y el puntaje sale mal igual. Por eso la
   capa de medición tiene su propio esquema y se valida por separado, y por eso sus
   convenciones se declaran una por una.

**Lo que esta decisión no dice.** No dice que el juicio semántico sea prescindible: G3 a G6
dependen de él y sin él no hay puntaje. Dice dónde empieza.


---

**Desviación del 9 de noviembre de 2026: G3, G6 y `ux-audit` cambiaron en un solo commit.**
*Registrada el 12 de noviembre de 2026 (auditoría `docs/AUDITORIA-SKILL-2026-11-12.md`, A2).
Solo documentación: no cambia ninguna rúbrica.*

**Qué pasó.** El commit `e54778a` («Ultimo retoque», 9 nov.) cambió las rúbricas de G3 y de G6
y la skill orquestadora `ux-audit`, junto con otros 404 archivos. Eso incumple la regla §11
de `CLAUDE.md`: **un cambio a una rúbrica, un commit**. Es el mismo defecto que el 11 de
septiembre dejó sin atribución los cambios de G1 y G7: con el historial, el efecto de cada
cambio no se puede separar del de los demás. Los tres diffs van abajo, por separado.

**La regla nueva de G3 es un ajuste posterior a la observación.** El contrato del 20 de
octubre, registrado antes del piloto, nombraba la combinación `U=6..8`, segmentación
encabezada y `X=0` como «sin ancla» y la dejaba en abstención. El piloto de G3 corrió el 20 y
21 de octubre y terminó con 70 abstenciones. La regla que asigna nivel 2 exactamente a esa
combinación se escribió el 5 de noviembre (`docs/PROPUESTA-ALCANCE-G3-G6-05NOV.md`), **después
de ver que el piloto la dejaba sin ancla**. La propuesta la justifica por «el vacío de la
definición, no conseguir una distribución determinada en los pilotos». Ese argumento se
registra tal cual, pero el orden de los hechos es el que se acaba de describir, y la regla no
se presenta como anterior a la observación.

**Resultado del piloto de G3.**
- *Con la regla anterior*, reproducido hoy desde salidas selladas con
  `python3 scripts/verify-g3-g6-closure.py`: 120 posiciones, 20 puntajes (seis ceros y catorce
  unos; ningún 2, 3 ni 4), 70 abstenciones y 30 inválidas.
- *Con la regla nueva*: `[PENDIENTE: el piloto no se volvió a correr con la regla nueva. Aplicar
  la regla a las respuestas de octubre no sería su resultado, porque el modelo calificó con la
  rúbrica anterior. Lo obtiene quien corra G3 de nuevo sobre las 24 páginas, con autorización.]`

#### G3 · `skills/g3-capacidad-segmentacion/SKILL.md` · `1 file changed, 14 insertions(+), 7 deletions(-)`

```diff
diff --git a/skills/g3-capacidad-segmentacion/SKILL.md b/skills/g3-capacidad-segmentacion/SKILL.md
index cd6f38f..fb396d7 100644
--- a/skills/g3-capacidad-segmentacion/SKILL.md
+++ b/skills/g3-capacidad-segmentacion/SKILL.md
@@ -8,7 +8,8 @@ metadata:
   channel: wireframe
   scale: ordinal-0-4
   protocol_version: 0.1.0
-  g3_contract_version: 0.1.0
+  g3_contract_version: 0.2.0
+  scope_revision: alcance-2026-11-05
 allowed-tools: Read
 ---
 
@@ -133,7 +134,7 @@ que en esta corrida exigieron leer; si está vacía, la comparación entre canal
 puntaje es limpia. El nivel 6 del plan de pruebas separa los puntajes según ese campo en vez
 de promediarlos todos juntos.
 
-## Contrato registrado antes del piloto · 20 de octubre de 2026
+## Contrato del piloto y revisión del 5 de noviembre de 2026
 
 Se elige una región suministrada y se justifica; la propuesta no decide el resultado.
 `unidades_ids` selecciona unidades reales de esa región sin contar a la vez un ancestro
@@ -144,13 +145,15 @@ se acredita segmentación encabezada. Un encabezado visual puede tener otro tag
 respaldarse con id y screenshot. Si la pertenencia no se puede sostener, se declara el límite.
 
 X registra los ids ajenos identificados dentro y fuera de la región. Las condiciones 0/1
-usan los interiores y la condición 2 mantiene el requisito exterior de su ancla. La
+usan los interiores. En nivel 2 puede no haber ajenos; si los hay, solo están fuera de la región. La
 comparación de área se obtiene de la unión de las cajas suministradas, recortadas a la
 región, sin duplicar solapamientos. No es una medición de píxeles de contenido ni de atención.
 V necesita una dependencia observable; no se inventa un dato o un encabezado fuera de vista.
 
-Los niveles siguientes se mantienen. Se aplican en orden 0, 1, 2, 3/4. Hay combinaciones
-sin ancla —por ejemplo U=6..8, segmentación encabezada y X=0— que conservan abstención:
+Se conserva la prioridad 0, 1, 2, 3/4. La revisión del equipo del 5 de noviembre
+también asigna nivel 2 cuando U=6..8,
+la segmentación es encabezada, H=0, V=false y X=0, con inventario completo y unidades
+completas. Conserva los cortes anteriores. Las demás combinaciones sin regla conservan abstención:
 `score=null`, `trigger=null`, `not_applicable=false`, `evidence_insufficient=true`, motivo
 explícito y `ancla_definida=false`. No se completa la escala mirando los resultados.
 La falta de región o de candidatos fiables tampoco demuestra NA. Para NA se exige una
@@ -158,7 +161,9 @@ región identificada, menos de dos unidades y un inventario declarado completo.
 
 La conformidad de datos y la aplicación de las anclas se auditan por separado. Un nivel
 incoherente con los juicios declarados queda señalado sin reescribirlo ni repetirlo.
-Esta es una propuesta operativa para el piloto, no un acuerdo atribuido a Camilo.
+La ampliación se adopta como decisión del equipo para la entrega 0.2.2. No se atribuye
+a Camilo ni se presenta como validación experta. Las respuestas del piloto conservan su
+versión original de rúbrica y no se recalifican con esta revisión.
 
 ## Niveles
 
@@ -171,7 +176,9 @@ desigual), o `H ≥ 1`, un bloque mezcla clases distintas de contenido, o `X ≥
 compitiendo por posición con la acción de la tarea.
 
 **2** — `U` entre 6 y 8, segmentadas en bloques con encabezado, `H = 0`, `V` falso, y
-`X ≥ 1` pero fuera de la región de la tarea.
+sin contenido ajeno dentro de la región. Puede no haber contenido ajeno (`X=0`)
+o estar únicamente fuera. El caso añadido con X=0 requiere inventario completo y
+unidades completas. Esta ampliación es decisión del equipo para la entrega 0.2.2; no es una regla empírica de memoria.
 
 **3** — `U ≤ 5` bloques de primer nivel, cada uno con encabezado, `B ≤ 5`, `H = 0`,
 `V` falso y `X = 0` en la región de la tarea.
```

#### G6 · `skills/g6-economia-convencion/SKILL.md` · `1 file changed, 24 insertions(+)`

```diff
diff --git a/skills/g6-economia-convencion/SKILL.md b/skills/g6-economia-convencion/SKILL.md
index 1f30ca6..faa316e 100644
--- a/skills/g6-economia-convencion/SKILL.md
+++ b/skills/g6-economia-convencion/SKILL.md
@@ -9,6 +9,7 @@ metadata:
   scale: ordinal-0-4
   protocol_version: 0.1.0
   g6_contract_version: 0.1.0
+  scope_revision: alcance-2026-11-05
   evidential_basis: none
 allowed-tools: Read
 ---
@@ -184,6 +185,29 @@ La conformidad de datos y la aplicación de las anclas se auditan por separado.
 se conservan aunque no coincidan con el ancla. Esta es una propuesta operativa para el piloto,
 no un acuerdo atribuido a Camilo. El catálogo y los niveles no se amplían ni se redistribuyen.
 
+## Alcance de la entrega 0.2.2
+
+La decisión del equipo es informar lo que se pudo evaluar en la pantalla suministrada.
+El catálogo y los niveles se conservan. El resultado puede incluir un puntaje global
+cuando una regla lo sostenga, o una abstención con diagnóstico de los criterios visibles.
+
+Cada convención conserva aplicabilidad, cumplimiento, ids y razón. Una ausencia visible
+no demuestra que la función no exista en el sitio. «No se pudo determinar» se mantiene
+separado de «no aplica» y de «incumple». Los juicios siguen siendo del modelo, no de expertos.
+
+El cierre organiza esas respuestas en un diagnóstico: convenciones cumplidas, incumplidas,
+no aplicables e indeterminadas; cuántas se evaluaron; y qué se observó sobre redundancia
+y trabajo trasladado. Un T=0 cuenta operaciones identificadas, pero T_evaluable=false
+indica que este criterio no pudo comprobarse. No se infiere el trabajo de todo el sitio.
+
+No se calcula un puntaje del subconjunto ni un promedio de convenciones. Si el nivel
+global no se puede sostener, queda vacío. Una regla prioritaria ya demostrada puede
+sostener un nivel aunque haya otras dudas; estas conservan su advertencia.
+
+El diagnóstico lo genera el cierre a partir de la respuesta original. Devuelve los
+campos del esquema solicitado; no agregues un objeto diagnóstico fuera de ese esquema.
+Esta decisión corresponde al equipo y no modifica las respuestas de los pilotos anteriores.
+
 ## Niveles
 
 **0** — `K ≥ 3` convenciones aplicables rotas, o bien `T ≥ 1` junto con redundancia
```

#### Orquestador · `skills/ux-audit/SKILL.md` · `1 file changed, 9 insertions(+), 1 deletion(-)`

```diff
diff --git a/skills/ux-audit/SKILL.md b/skills/ux-audit/SKILL.md
index 8aa4d7b..8de2e58 100644
--- a/skills/ux-audit/SKILL.md
+++ b/skills/ux-audit/SKILL.md
@@ -20,6 +20,13 @@ sacaría del instrumento congelado y del artefacto que el lector instala.
 ## El procedimiento, tal como lo ejecuta el código
 
 `scripts/orchestrate.js` prepara, verifica y recoge ejecuciones. No asigna niveles.
+
+La entrega 0.2.2 usa `alcance-2026-11-05` por defecto. Sus reglas están en
+`docs/ALCANCE-G3-G6-05NOV.md`. G3 incluye el caso completo de seis a ocho unidades
+organizadas y sin contenido ajeno. G6 conserva su puntaje global cuando se puede
+sostener y añade un diagnóstico de lo observado y lo indeterminado. Es una decisión
+del equipo, sin atribuir aprobación a Camilo ni afirmar validación experta. Las
+corridas anteriores conservan sus reglas; no se recalifican con esta revisión.
 Antes de usar los comandos, declara `RUNTIME`, `MODEL_ID` y `DECODING` con los datos reales
 del entorno. No inventes un modelo o sus parámetros para completar la atribución.
 
@@ -156,7 +163,8 @@ No cambies los cortes para producir niveles distintos.
 
 ## Salida
 
-`perfil.json` reúne la metadata de captura y el resumen de los siete grupos. Los resultados
+`perfil.md` permite leer el resultado y el diagnóstico de G6 por criterio, con razones
+y cobertura. `perfil.json` reúne la metadata de captura y el resumen de los siete grupos. Los resultados
 originales siguen en `resultados/`; el perfil añade los estados y sus recuentos sin
 reescribirlos. Si el cierre falla, un perfil anterior se conserva con una advertencia
 en la terminal: no debe presentarse como actualizado.
```

Reproducir: `git diff e54778a^ e54778a -- skills/<skill>/SKILL.md`.
