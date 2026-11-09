# Piloto de calibración de las rúbricas

Este archivo conserva los resultados y las actualizaciones de cada fecha. Para ver el
estado actual y los pendientes, está el [resumen de avances del 21 de octubre](AVANCES-GRUPOS-21OCT.md).

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

## Actualización · piloto de G5, 7 de octubre de 2026

El piloto de G5 terminó con **120 respuestas válidas**: 24 capturas y cinco evaluaciones por captura. Se usó la skill con gpt-6.1-sol, Codex CLI 0.160.0, razonamiento medium y medición 1.0.5. Los resultados del piloto histórico que aparece arriba se conservan por separado.

| Grupo | 0 | 1 | 2 | 3 | 4 | NA | Unidad |
|---|---:|---:|---:|---:|---:|---:|---|
| G5 | 55 | 21 | 9 | 25 | 5 | 5 | Evaluación; 120 solicitudes |
| G5 | 11 | 4 | 2 | 5 | 1 | 1 | Nivel más frecuente por captura, sin empate; 24 capturas |

Aparecieron los cinco niveles. **22/24 capturas** mantuvieron el mismo nivel en las cinco repeticiones; C11 y R03 variaron. Hubo **63/120 respuestas con evidencia insuficiente**, incluidos los cinco NA de R02. Debemos revisar si en R02 se omitió una lista antes de interpretar que G5 no aplica.

No se reconoció ningún proceso con progreso visible (`Q=false` en toda la serie). Esa parte de G5 sigue pendiente de probar con casos positivos. También falta comparar con expertos.

**Revisión posterior, 19 de octubre:** revisamos las 63 marcas de evidencia insuficiente
sin cambiar las respuestas. Confirmamos que R02 pierde una lista en dos filas por una
limitación del detector; sus NA no prueban que la página no tenga listas. Dejamos diez
ejemplos sintéticos separados, con criterios guardados antes de capturar, para preparar
la prueba de progreso. En la preparación aún no se habían evaluado con el modelo ni con expertos.
Detalle y siguientes pasos: [revisión de G5](REVISION-G5-19OCT.md).

**Inicio de la prueba separada, 19 de octubre:** se registraron 45 posiciones, nueve ejemplos
por cinco repeticiones. Quedaron seis respuestas válidas antes de reservar margen de uso;
faltan 39. Sus niveles coinciden con lo previsto, pero todavía no hay cinco repeticiones
por página. P02 señaló un límite de medición no previsto y se conserva. La continuación
quedó programada para hoy a las 3:25 p. m. de Bogotá. [Informe de la prueba](../pilotos/g5-progreso-2026-10-19/INFORME.md).

**Cierre de la prueba separada, 19 de octubre:** se completaron las 45 respuestas válidas,
sin fallos técnicos ni inválidas. Las 40 posiciones con nivel o NA esperado coincidieron;
las cinco de P10 solo revisan el recorte y no entran en esa comparación. Los nueve ejemplos
mantuvieron nivel o NA, pero seis mantuvieron también el trigger. Hubo 15 marcas de evidencia
insuficiente y las cinco de P02 no estaban previstas. Las medidas incluyen clases CSS que
pueden dar pistas (color, forma, recorte), por lo que la coincidencia no demuestra juicio
basado solo en imágenes. Se verificaron 45 sesiones y se sellaron 223 archivos. El seguimiento
quedó pausado. Faltan P06, un ejemplo positivo de nivel 4 y la validación experta; esta serie
no se mezcla con el piloto general. [Cierre y limitaciones](CONTINUAR-G5-PROGRESO.md).

El [registro de G5](PILOTO-G5-06OCT.md) explica las correcciones y fases incompletas. El [informe final](../pilotos/g5-2026-10-07/INFORME.md) contiene el detalle de resultados. En este punto seguían pendientes los pilotos de G3, G4 y G6.


## Actualización · cierre de pruebas pendientes de G5, 19 de octubre

Terminamos otras **70 evaluaciones válidas**, sin fallos técnicos ni respuestas inválidas.
Se registraron antes de evaluar y se conservan en dos series separadas:

- **45 sin clases CSS:** mismas imágenes, medidas, rúbrica y configuración de la primera
  prueba de progreso, retirando solo las clases de candidatos. Las 40 posiciones con nivel
  o NA esperado coincidieron y las cinco de P10 se revisan sin nivel esperado. Las 45
  conservaron nivel o NA frente a la serie anterior. Hubo 15 marcas de evidencia insuficiente;
  las cinco de P02 no estaban previstas. Nueve casos mantuvieron nivel y seis, trigger.
- **25 de casos pendientes:** nivel 1 para nombres de etapas sin paso actual, autorizado
  por Juan y registrado antes de evaluar; pares horizontales y verticales de niveles 3/4.
  Las 25 respuestas coincidieron con niveles y campos previstos. La versión nueva fija
  un trigger por condición y explicita si el final compite con el inicio.

Después se detectaron siete explicaciones que atribuyen al wireframe un relleno que queda
como contorno interior. La observación se conserva aparte; coincidir en nivel no valida
cada frase. No se reemplazaron respuestas ni se cambiaron los experimentos anteriores.

Se verificaron 235 conversaciones distintas y 1.107 archivos primarios sellados entre las
cuatro series. La comparación con expectativas de diseño no sustituye el juicio experto.
Faltan contrastar la regla nueva con Camilo, validación humana y consenso. Los límites
reales de captura y detección se siguen declarando.

[Resumen actual de G5](CIERRE-G5-19OCT.md), [comparación sin clases](../pilotos/g5-sin-pistas-2026-10-19/INFORME.md)
y [casos pendientes](../pilotos/g5-cierre-2026-10-19/INFORME.md). Los seguimientos siguen
pausados; se conservaron los reinicios gratuitos y los cambios quedan en commits locales.

## Actualización · piloto de G4, 7 de octubre de 2026

El piloto de G4 también terminó: **120 respuestas, con 56 puntajes y 64 abstenciones**, sin NA ni respuestas inválidas. Se evaluaron las mismas 24 capturas cinco veces, usando solo la captura original, medición 1.0.6, gpt-6.1-sol, CLI 0.160.0 y razonamiento low.

El intento que falló por límite de uso se conservó y se retomó sin repetir los juicios ya recibidos. Las fases preliminares quedan separadas, porque cambiaron varios aspectos de la configuración.

| Grupo | 0 | 1 | 2 | 3 | 4 | Abstenciones | Unidad |
|---|---:|---:|---:|---:|---:|---:|---|
| G4 | 0 | 0 | 5 | 32 | 19 | 64 | Evaluación; 120 solicitudes completadas |

La distribución usa los **56 puntajes**. De las abstenciones, **59** corresponden a situaciones que la rúbrica no cubre y **cinco** a la duda sobre si el elemento destacado corresponde a lo que la sección promueve (`P`). Nueve páginas tuvieron cinco puntajes y **ocho mantuvieron el nivel**; cinco páginas alternaron puntaje y abstención. Hubo **111/120 marcas de evidencia insuficiente**.

No aparecieron casos positivos de contenido funcional tratado como publicidad (`Bn`), contenido importante presentado como auxiliar (`Cn`) ni tres o más elementos aislados. Las reglas se mantuvieron y esas situaciones quedaron pendientes de probar. Para cerrar G4 falta acordar las reglas incompletas y comparar con expertos.

El [registro de G4](PILOTO-G4-07OCT.md) y el [informe final](../pilotos/g4-2026-10-07-v3/INFORME.md) conservan el detalle. El cierre posterior de G3/G6 está en la actualización del 21 de octubre.


## Pilotos de G2 y G7 · 18 y 19 de octubre de 2026

Terminamos las 120 respuestas de cada grupo sobre las 24 páginas de calibración, con cinco evaluaciones separadas por página. Usamos las medidas corregidas de G2/G7 en la versión 1.0.6, el modelo gpt-6.1-sol, CLI 0.162.0-alpha.17.2 y razonamiento low. Los resultados del piloto de septiembre se conservan aparte.

| Grupo | Respuestas | Puntajes | Abstenciones | Respuestas inválidas | Fallos pendientes |
|---|---:|---:|---:|---:|---:|
| G2 | 120 | 41 | 79 | 0 | 0 |
| G7 | 120 | 120 | 0 | 0 | 0 |

**G2 dejó muchos casos sin puntaje.** Hubo seis ceros, veinticinco doses y diez treses. Solo siete páginas tuvieron cinco puntajes; seis de ellas conservaron el nivel. En tres de esas siete páginas se repitió la regla que lo justificaba. C16 cambió entre 0 y 2; C10 y R02 tuvieron puntajes y abstenciones. En 108 respuestas el modelo marcó falta de evidencia. Las 79 abstenciones se guardaron con sus motivos.

**G7 repitió el resultado en todas las páginas.** Hubo 105 ceros, diez unos y cinco doses. Las 24 páginas conservaron nivel y regla en las cinco evaluaciones. En 75 respuestas se marcó falta de evidencia. No aparecieron niveles 3 ni 4. Su rúbrica incluía cifras del piloto anterior; ese posible efecto estaba anotado antes de evaluar.

## Pausas y tres solicitudes fallidas

| Momento | G2: respuestas / puntajes / abstenciones | G7: respuestas / puntajes |
|---|---|---|
| Primera pausa | 24 / 10 / 14 | 48 / 48 |
| Primera continuación | 60 / 29 / 31 | 120 / 120 |
| Fallo de conexión | 117 / 41 / 76; tres sin respuesta | 120 / 120 |
| Cierre | 120 / 41 / 79 | 120 / 120 |

Las primeras pausas fueron por uso. Después de la renovación automática se siguió con las posiciones que faltaban. Se conservaron los reinicios gratuitos y no se compraron créditos.

R07-r3, R07-r4 y R07-r5 fallaron por conexión sin producir una respuesta recuperable. Se detuvieron nuevas solicitudes y se guardaron los registros originales y sus copias. Juan autorizó un único reintento de esas tres; devolvieron abstenciones. Los 117 resultados anteriores quedaron iguales. El [registro completo](PILOTO-G2-G7-18OCT.md) y la [nota de recuperación](RECUPERACION-G2-19OCT.md) contienen los detalles.

## Archivos y pendientes

Se comprobaron 240 conversaciones con respuesta y tres fallidas, todas distintas. Los sellos protegen 554 archivos de G2 y 539 de G7. Se conservaron las respuestas originales, las medidas, las tablas y los registros de ejecución. Los informes están en [G2](../pilotos/g2-2026-10-18/INFORME.md) y [G7](../pilotos/g7-2026-10-18/INFORME.md). El seguimiento automático ya está desactivado.

Con Camilo falta aclarar las combinaciones sin nivel de G2 y la diferencia entre una acción principal ausente y una que existe pero no destaca. Tampoco obtuvimos niveles 1 ni 4 ni apoyos de decisión positivos. En G7 siguen por probarse los niveles 3 y 4.

Todavía debemos completar el consenso de los casos dorados y comparar los resultados con expertos. **Los pilotos están terminados, pero los grupos siguen pendientes de validación.**

## Actualización · cierre de la fase dirigida de G4, 20 de octubre

Juan autorizó proponer criterios porque todavía no hay acuerdo con Camilo. Se registraron
los tres casos sin ancla, una selección justificada y el contrato 0.2.0. La revisión de las
120 respuestas identificó nueve páginas dudosas y falsas marcas numéricas de recorte. La
entrada G4 1.0.7 corrige 110 marcas de conjuntos sin modificar las capturas originales.

**Terminaron las 85 evaluaciones**, sin respuestas inválidas ni fallos técnicos:

- Los ocho ejemplos separados tuvieron 40 puntajes y 35 coincidencias de nivel. Las tres
  reglas propuestas coincidieron en sus cinco repeticiones. S07 recibió cinco niveles 4,
  frente al 3 previsto por color solamente. Las expectativas no son calificaciones expertas.
- Las nueve páginas reales tuvieron 12 puntajes y 33 abstenciones. Hubo 42 advertencias de
  evidencia insuficiente. C07 varió entre 2 y 4; R02 mantuvo 1, pero cambió de conjunto.
  C09 y C20 mezclaron un nivel 1 con cuatro abstenciones cada una.

La revisión posterior encontró 11 respuestas sintéticas que cuentan peso tipográfico como
canal adicional y otra que lo menciona en su explicación. Los estilos de las tarjetas
mantienen peso 400. Esas observaciones no se usaron para corregir ni repetir respuestas.

Se comprobaron 85 conversaciones y 382 archivos primarios sellados. Las tres fases
anteriores siguen iguales a 2f1f7e6, incluido el sello de 540 archivos de la fase final.
El seguimiento automático quedó pausado y se conservaron los reinicios gratuitos.
Los cambios están en commits locales. [Informe](../pilotos/g4-cierre-2026-10-20/INFORME.md),
[revisión posterior](REVISION-G4-FASE2-20OCT.md) y [cierre](CONTINUAR-G4-20OCT.md).

La fase terminó, pero G4 sigue pendiente de revisión con Camilo, validación experta y
consenso. El panel humano depende de aprobación ética. El piloto posterior de G3/G6 terminó el 21 de octubre.


## Actualización · pilotos de G3 y G6, 20 de octubre

Se revisaron las mediciones antes de evaluar y se registró evidencia 1.1.0, manteniendo
los archivos originales 1.0.6. G3 corrige regiones y envoltorios; G6 conserva candidatos
fuera de su ubicación esperada y excluye controles e imágenes de supuestos contenedores
vacíos. Las listas se conservan completas. No se ajustaron niveles para repartir resultados.

Se fijaron 120 evaluaciones por grupo, cinco por página, con wireframe y apoyo textual de
screenshot declarado. **Ambos pilotos terminaron el 21 de octubre: 120 posiciones por grupo.**
G3 tiene 20 puntajes (seis ceros y catorce unos), 70 abstenciones y 30 inválidas. Las inválidas
no declararon el límite exigido ante selección o unidades incompletas; se conservaron y
no se repitieron. C17 fue la única página con cinco puntajes y mantuvo nivel 0 y regla X.
Hay 87 marcas de insuficiencia entre las 90 respuestas conformes. No hubo NA.

G6 tuvo 120 abstenciones: el pie y la ruta de navegación no quedaron resueltos con las
capturas. Las convenciones aplicables variaron en cuatro páginas pese a la misma salida
final. No hay puntajes numéricos para afirmar estabilidad ordinal o precisión de G6.

Se comprobaron 240 conversaciones distintas, originales, registros, atribución y CSV,
sin fallos técnicos ni intentos abiertos. Los sellos protegen 504 archivos de G3 y 534 de
G6. Los 4.111 archivos históricos y los ocho sellos anteriores permanecen intactos.
La auditoría geométrica de G3 conserva cinco observaciones con sus límites y mantiene
aparte la auditoría original. No se cambiaron calificaciones ni instrumentos para ajustar
resultados. Se conservó la CLI original tras actualizarse la app, sin usar reinicios ni
comprar créditos. Los avances se guardan localmente, sin publicar en GitHub.

[Cierre y revisión de explicaciones](CIERRE-G3-G6-21OCT.md),
[informe G3](../pilotos/g3-2026-10-20/INFORME.md) e
[informe G6](../pilotos/g6-2026-10-20/INFORME.md). Comprobación:
`python3 scripts/verify-g3-g6-closure.py`. Los sellos ya existen y no se regeneran.
**Faltan revisión con Camilo, validación experta y consenso**; el panel humano depende de
aprobación ética. Las reglas actuales son propuestas, no aprobación del asesor.

El seguimiento `completar-pilotos-g3-y-g6` fue eliminado después de comprobar el cierre.

## Cierre de G1 con su limitación · 21 de octubre

**G1 queda cerrado para la versión 1 como no interpretable.** Juan confirmó que se debe
mantener documentada su falta de discriminación, según lo acordado con Camilo. No se
cambian umbrales para repartir puntajes ni se presenta este cierre como validación.

Se reprodujeron los 24 resultados de G1 del 11 de septiembre con el mismo script, sobre
copias temporales: coincidieron completos. El archivo histórico conserva 23 ceros y un
uno (C04); no se sobrescribió. Es el piloto técnico provisional, no un piloto del modelo
ni de la skill publicada. El 21/3 anterior tiene respaldo narrativo, no originales que
permitan repetir esa corrida. La reproducción local no comprueba la hipótesis H1.

La medición 1.0.6 conserva los afectados, denominadores y categorías de C1–C4 en las
24 páginas. Las proporciones tienen cuatro decimales, frente a tres en el histórico;
se registran esas diferencias. C4 supera 0,25 en las 24 páginas y 0,50 en veinte.
La equivalencia por etiqueta HTML y padre puede juntar funciones distintas; no se
atribuye toda la concentración a una causa única ya demostrada.

La revisión posterior señala C1 sin base en ocho páginas y una discrepancia en C13:
tiene un solo grupo, pero conserva su 0 original. El piloto provisional y la capa
1.0.6 usan NA solo sin grupos; la skill exige menos de dos. No se cambió el resultado.
Las otras 23 páginas siguen concentradas en 22 ceros y un uno. Los perfiles deben marcar
G1 **no interpretable v1** en la tabla, y el futuro acuerdo global se reportará con y
sin G1. No hay calificaciones expertas para calcular ese acuerdo ahora.

Se guardaron datos, CSV, comprobaciones y sello propio. Se preservaron 5.159 archivos
anteriores frente a 2313903 y los diez sellos de pilotos (4.160 archivos protegidos).
Se verificaron también los sellos de corpus, calibración y dorados sin regenerarlos.
La rúbrica y las capturas siguen intactas. Los cambios se guardan localmente, sin publicar.

[Cierre](CIERRE-G1-21OCT.md) e [informe](../revisiones/g1-cierre-2026-10-21/INFORME.md).
Comprobación sin solicitudes: `node scripts/g1-closure.js verificar`.
Las cuatro leyes del grupo quedan sin resultado interpretable en esta versión.
Validación experta y consenso pendientes; el panel humano depende de aprobación ética.
