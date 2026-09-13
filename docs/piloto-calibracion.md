# Piloto de calibración de las rúbricas

Primera corrida el 10 de septiembre de 2026; segunda corrida el 11, después de reescribir G1 y
G7 por proporción afectada. `node scripts/pilot-calibracion.js calibracion`, detalle por página
en `calibracion/_piloto.json`.

> **La reescritura no es un ajuste a los datos.** Es el procedimiento pre-comprometido
> ejecutándose. El plan de pruebas dice, desde antes de correr nada, que «la que no mueva sus
> puntajes se reescribe, y la reescritura se fecha **antes** del congelamiento». El piloto
> aportó el diagnóstico de qué estaba mal —la forma lógica de las anclas—, no el valor de
> ningún umbral: los cortes de la escala de tolerancia son décimas y cuartos redondos
> declarados en `shared/escala.md` sin mirar ninguna distribución, y la **regla del ajuste
> único**, allí mismo, prohíbe volver a moverlos porque el resultado no quede repartido.

---

## Qué pregunta responde y qué no

Responde una sola: **cada rúbrica, ejecutada, reparte su escala o se apelotona**. Una rúbrica
cuyos niveles medios nunca se asignan produce en los datos el mismo aspecto que una que
discrimina bien —acuerdo alto— y la única forma de distinguirlas es correrla y mirar la
distribución.

No responde si los niveles que asigna son los correctos. Eso lo miden los casos dorados
(nivel 4 del plan de pruebas) y el acuerdo con la referencia humana (nivel 9).

## El conjunto

`corpus/calibracion-v1.csv` · 24 páginas fuera del corpus, capturadas el 10 de septiembre con
el mismo pipeline, el mismo viewport 1440×900 y la misma versión del catálogo de descarte.

| Estrato | Páginas |
|---|---|
| institucional | 4 |
| comercio | 5 |
| producto | 5 |
| medios | 5 |
| educación | 5 |

El conjunto está sellado: `corpus/SELLO-CALIBRACION-v1.md`, hash `82cb74b67c3d…`, 96
archivos certificados. `npm run seal:calibracion:verify` lo recalcula. Sin los artefactos, la
distribución de abajo no sería verificable por nadie más.

Cinco páginas salieron por el criterio de captura declarado antes de capturar, no por su
puntaje: C01 gob.mx (HTTP 200 con página de *challenge*, 8 nodos), C05 gob.cl (HTTP 403),
C08 olimpica.com y C19 publimetro.co (capa sin cerrar sobre el 100 % del viewport), y R01
gob.es (el dominio no resuelve). Las cuatro primeras se reemplazaron por su reserva del mismo
estrato; la quinta era la reserva y agotó la del estrato institucional, que por eso cierra en
cuatro. Las capturas descartadas se conservan en `calibracion/_descartadas/`. El registro está
en `corpus/DECISIONES-CORPUS.md`.

## Qué se pudo correr

**Tres de las siete rúbricas: G1, G2 y G7.** Son las que anclan en cantidades decidibles sobre
`nodes.json`. G3, G4, G5 y G6 anclan en juicios semánticos —qué cuenta como unidad de tarea,
qué es un elemento ajeno, qué convención aplica, cuál es el aislado visual— que no se deciden
sobre el árbol de layout. Su piloto se corre sobre estas mismas capturas cuando existan sus
skills, que es M3.

**`scripts/pilot-calibracion.js` no es la skill publicada.** Es una implementación provisional
de la capa de medición, escrita para poder correr el piloto antes de M3. Por lo tanto cada
distribución de abajo es una propiedad del par (rúbrica, esta implementación), y el reporte
imprime la lista completa de las doce convenciones que la implementación tuvo que cerrar donde
la rúbrica dejaba un hueco.

## El resultado de la primera corrida · 10 de septiembre

| Grupo | 0 | 1 | 2 | 3 | 4 | Niveles usados |
|---|---|---|---|---|---|---|
| **G1** Agrupación perceptual | 21 | 3 | 0 | 0 | 0 | **2 de 5** |
| **G2** Arquitectura de decisión | 0 | 4 | 8 | 9 | 3 | **4 de 5** |
| **G7** Targeting motor | 21 | 3 | 0 | 0 | 0 | **2 de 5** |

**G2 ejercita su escala.** `n1` va de 1 a 10 con mediana 5 sobre las 24 páginas, y los cuatro
niveles que asigna se reparten sin apelotonarse. El nivel 0 no aparece, y eso es esperable: su
ancla es `n1 > 12` sin agrupación, que describe una pantalla peor que cualquiera de estas 24.

**G1 y G7 no la ejercitan: nunca asignan 2, 3 ni 4.** Y las dos por la misma razón
estructural, que es el hallazgo del piloto.

## Por qué G1 y G7 colapsan

**Sus niveles altos están cuantificados universalmente sobre todos los elementos de la
pantalla.** G1 nivel 3 exige que *todo* grupo tenga `r ≥ 1.5`, que *ningún* elemento se salga
de su contenedor, y que *ningún* conjunto de equivalentes tenga un miembro divergente. G7
nivel 3 exige que *todo* objetivo mida 32 px o más. En una página real con decenas de grupos y
decenas de objetivos, una sola violación entre todas decide el nivel de la pantalla entera, y
la probabilidad de que ninguna aparezca tiende a cero con el tamaño de la pantalla.

Los números:

| G1 · condición | Páginas que la fallan, de 24 |
|---|---|
| C4 consistencia de equivalentes | **24** |
| C3 regularidad (`A ≤ 4`, `W ≤ 3`) | 17 |
| C1 separación (`r ≥ 1.5` en todo grupo) | 16 |
| C2 límites | 8 |

Diez de las 24 páginas fallan tres condiciones y cinco fallan las cuatro. Dieciséis tienen al
menos un conflicto entre proximidad y región común, que además fija el techo en 1. La mediana
de grupos de primer nivel por página es 8, con un máximo de 31.

**C4 falla en 24 de 24, que es una condición que no discrimina.** Con la definición operativa
que la propia rúbrica da —conjunto equivalente = elementos que comparten `nodeName` y
`parentId`—, cualquier página tiene decenas de conjuntos así, y basta que uno tenga un miembro
de altura distinta. Vale la pena notar que la primera versión de esta implementación comparaba
además los anchos y fallaba igual en 24 de 24: corregirla a alto y alineación no cambió el
resultado, que es lo que permite atribuirlo a la definición y no a la mecanización.

| G7 | |
|---|---|
| Páginas con al menos un objetivo bajo 24 px sin holgura | **21 de 24** |
| Objetivos por página | de 9 a 63 |
| Objetivos bajo 24 px en una sola página | hasta 21 |

Los objetivos que disparan el nivel 0 son enlaces de texto corrientes de 18 o 19 px de alto
—pie de página, enlaces dentro de párrafos, avisos de cookies—. La rúbrica dice «todo nodo con
`isClickable` verdadero», así que entran, y con eso el nivel 0 se dispara en casi cualquier
página web real.

## Por qué esto importaba: acuerdo perfecto sobre nada

Una rúbrica que no ejercita su escala no arruina el piloto: arruina **el resultado
confirmatorio de la tesis**, y lo arruina de la peor forma posible, que es saliendo bien.

El acuerdo se mide con Brennan–Prediger con pesos cuadráticos. Su ventaja sobre kappa de Cohen
es que el acuerdo esperado por azar es **fijo** y no depende de las marginales de los
evaluadores: con `k = 5` categorías y pesos `w_ij = 1 − ((i−j)/4)²`, vale exactamente
`p_e = 0,75`. Esa misma propiedad es la que lo vuelve ciego frente a una rúbrica degenerada.
Si la rúbrica solo puede asignar 0, el sistema asigna 0, el humano que lee la misma rúbrica
asigna 0, el acuerdo observado es 1 y el coeficiente sale **1,000**.

`node scripts/bp-degenerado.js`, sobre las 24 unidades del conjunto de calibración:

| Caso | `p_o` | `p_e` | **κ_BP** |
|---|---|---|---|
| Sistema y humanos convergen en 0 en las 24 páginas | 1,0000 | 0,7500 | **1,0000** |
| G1 antes de la reescritura (21 ceros, 3 unos) contra humanos que convergen en 0 | 0,9922 | 0,7500 | **0,9688** |
| G7 antes de la reescritura (21 ceros, 3 unos) contra humanos que convergen en 0 | 0,9922 | 0,7500 | **0,9688** |
| Contraste: dos evaluadores que usan los cinco niveles y discrepan un nivel en la mitad de los casos —12 de 24— | 0,9688 | 0,7500 | **0,8750** |

Las dos filas del medio son la distribución **realmente medida** el 10 de septiembre, no un
supuesto; lo hipotético es únicamente el vector humano, puesto en el caso más favorable a la
apariencia de acuerdo.

**La última fila es la que hay que leer dos veces.** Dos evaluadores que sí usan la escala y
discrepan la mitad de las veces sacan **0,875**, menos que los **0,969** de una rúbrica que no
distingue nada. Sin el piloto, ese 0,97 habría entrado al documento como resultado
confirmatorio de que el sistema concuerda con el juicio experto, cuando lo único que dice es
que ni el sistema ni el humano tenían otra cosa que decir.

## Después de la reescritura · 11 de septiembre

G1 y G7 se reescribieron por proporción afectada, con la escala de tolerancia y la regla de
combinación comunes de `shared/escala.md`. Segunda corrida sobre las mismas 24 páginas:

| Grupo | 0 | 1 | 2 | 3 | 4 | Niveles usados | Antes |
|---|---|---|---|---|---|---|---|
| **G1** | 23 | 1 | 0 | 0 | 0 | **2 de 5** | 2 de 5 |
| **G2** | 0 | 4 | 8 | 9 | 3 | **4 de 5** | 4 de 5 (sin cambios) |
| **G7** | 14 | 7 | 3 | 0 | 0 | **3 de 5** | 2 de 5 |

**G7 mejoró: de dos niveles a tres.** Sus cuatro condiciones se reparten el disparo —T3 tamaño
cómodo en 12 páginas, T1 mínimo de clic en 4, T2 separación en 4, T4 familias en 4—, y las
proporciones medianas son informativas en vez de saturadas: `p_T1` 0,26 · `p_T2` 0,10 ·
`p_T3` 0,37 · `p_T4` 0,00.

**G1 no mejoró: sigue en dos niveles, ahora 23 en 0 y una en 1.** La razón está en las
proporciones: `p_C4` es **generalizada en las 24 páginas** —mediana 0,67— y `p_C3` lo es en
13. Dos condiciones generalizadas dan 0 por la regla de combinación, y eso ocurre en casi
todas.

**Y aquí es donde la regla del ajuste único hace su trabajo.** Lo natural sería subir los
cortes hasta que G1 reparta, y es exactamente lo que no se puede hacer: sería medir la
voluntad del que ajusta. Lo que queda escrito es el hallazgo —**G1 sigue sin ejercitar su
escala después de la corrección autorizada**— y cuál es la única vía admisible para volver a
tocarla: demostrar que la *definición* de C4 mide algo distinto de lo que dice medir. Hay
motivo para sospecharlo —«conjunto equivalente = elementos que comparten `nodeName` y
`parentId`» marca como equivalentes a dos divs hermanos cualesquiera, que no tienen por qué
compartir alto— pero **esa demostración hay que hacerla y fecharla antes de correr otra vez**,
no después de ver que el número no gustó.

## Lo que cuesta congelar G1 como no discriminante

**G1 subsume cuatro de las dieciocho leyes: Proximidad, Prägnanz, Región común y Similitud.**
Es el grupo más cargado de los siete —G7 subsume una sola— y esas cuatro son, además, la
familia Gestalt entera que el trabajo declaró evaluar.

La unidad de puntaje es el grupo y nunca la ley, por decisión congelada. La consecuencia es
directa y hay que decirla con todas las letras: **si G1 se congela sin ejercitar su escala,
esas cuatro leyes se quedan sin resultado interpretable en la versión 1.** No es que salgan
mal; es que no salen. Un puntaje que vale 0 en 23 de 24 páginas no ordena pantallas, y un
coeficiente de acuerdo calculado sobre él mide la convergencia en el 0, como cuantifica la
sección anterior.

Qué significa eso para cada pregunta que la tesis se hizo:

| La pregunta | Qué puede responder la tesis sobre estas cuatro leyes |
|---|---|
| ¿Los puntajes corresponden al juicio experto? | **No es interpretable para G1.** El coeficiente saldría alto por convergencia en un nivel, no por acuerdo |
| ¿Qué principios admiten un criterio observable y cuáles resisten? | **Sí responde, y en negativo:** bajo esta operacionalización, las cuatro leyes de agrupación resisten. Es un hallazgo, y es de los más citables del trabajo |
| ¿Cuánto de la salida es estable? | Sí responde: la dispersión entre repeticiones se mide igual |

**Lo que este resultado NO autoriza a decir.** Que los principios Gestalt no sirven, o que no
son medibles. Lo medido es mucho más estrecho: *esta* rúbrica, con *esta* implementación
provisional, sobre *estas* 24 páginas, no reparte su escala. Tres candidatos distintos a
culpable —la rúbrica, la mecanización, el conjunto— y el piloto no los separa.

**Lo que tampoco autoriza es seguir ajustando.** Que el costo sea alto es precisamente la
razón por la que la regla del ajuste único existe: cuando lo que está en juego son cuatro de
las dieciocho leyes, la tentación de mover el corte hasta que G1 reparta es máxima, y ceder a
ella convertiría el resultado en una función de esa tentación.

**Lo que sí queda por hacer, en orden.** Demostrar —o descartar— que la definición operativa
de C4 mide algo distinto de lo que dice medir. Que «conjunto equivalente = elementos que
comparten `nodeName` y `parentId`» marque como equivalentes a dos divs hermanos cualesquiera
es sospechoso y es la hipótesis a examinar. Si la demostración se hace, se fecha y se registra
**antes** de volver a correr; si no se hace, G1 se reporta así, con estas cuatro leyes
declaradas sin resultado interpretable y la razón escrita.

### Una corrección de definición que sí se hizo, con su demostración

`p_C1` valía **1,000 en el 100 % de las páginas donde era calculable**: ningún grupo podía
aprobar jamás. El mecanismo es demostrable y no depende de ningún umbral: `g_out` se medía
contra *cualquier* nodo externo del árbol, y en una página densa siempre hay un envoltorio o
un texto tocando, de modo que `g_out = 0` y la razón `r = g_out / g_in` no puede alcanzar 1,5
por construcción. Corregido a medir contra los elementos de **otros grupos de primer nivel**.
Es un defecto de definición, no un umbral, que es lo único que la regla del ajuste único
admite.

**Y aquí hay que acotar lo que el registro sostiene.** La secuencia 24 → 23 páginas en nivel 0
es el **efecto conjunto** de la corrección de C1 y de la reescritura por proporción, no el de la
corrección sola. Los dos cambios se commitearon juntos —`e248697`, el único commit que ha tocado
`scripts/pilot-calibracion.js`— y la implementación previa a la corrección **nunca estuvo bajo
control de versiones**: `git log -S` sobre la expresión vieja de `g_out` no devuelve nada. La
tabla intermedia de 21/3 entró como prosa en ese mismo commit, y ningún artefacto versionado la
reproduce: el `_piloto.json` commiteado es el del estado final.

Por lo tanto **los dos cambios no son atribuibles por separado del registro**. Lo que se puede
afirmar es que la distribución reportada antes de la reescritura ya incluía la corrección de C1;
lo que el registro no sostiene es cuánto del movimiento de G1 produjo cada cambio. Queda como
limitación de la trazabilidad del piloto, y es la razón por la que desde ahora **cada cambio a
una rúbrica va en su propio commit**.

## Lo que esto implica antes de congelar

Esto es lo que el plan de la semana 7 anticipaba: «reescribir cualquier rúbrica que no
ejercite su escala, y fechar la reescritura **antes** del congelamiento». El piloto dice que
**G1 y G7 son las que hay que reescribir**, y dice además en qué dirección.

La corrección es la que la propia G1 ya usaba para separar su nivel 1 de su nivel 2: **hablar
de proporción de grupos u objetivos afectados en vez de cuantificar universalmente**. Se
aplicó el 11 de septiembre a G1 y G7, con la escala de tolerancia común de `shared/escala.md`,
y sus resultados están arriba.

**Lo que se consideró y no se hizo, para que las dos cosas no se mezclen.** Separar los
enlaces de texto en flujo de los controles de la pantalla, y aplicar el mínimo de la WCAG solo
a los segundos, es una corrección distinta: cambia *qué* se mide, no *cómo* se combina. Habría
entrado junto con la de proporción y ninguna de las dos sería atribuible por separado. Queda
propuesta y fechada, sin aplicar.

## Amenazas de este piloto

1. **Tres de siete.** G3, G4, G5 y G6 siguen sin piloto. Si M2 se congela con este resultado,
   se congela sabiendo que cuatro rúbricas no se han visto ejercitar.
2. **El ejecutor no es el definitivo.** Una distribución degenerada puede venir de la rúbrica o
   de la convención que la implementación provisional cerró. Las dos veces que eso pasó en esta
   corrida —el fondo de página que colapsaba `n1` a uno, y el ancho en C4— se detectaron
   mirando las medidas crudas y quedaron escritas en el propio script. No hay garantía de que
   no queden más.
3. **Sin repeticiones.** Una corrida por página. La dispersión entre repeticiones es el nivel 5
   y no aplica a una implementación determinista, pero sí aplicará a las skills.
4. **Sin juicio humano.** El piloto verifica que la escala se ejercite, no que se ejercite bien.
