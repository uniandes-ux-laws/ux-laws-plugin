# Plan de dos semanas · hasta el 24 de septiembre

Corte: jueves 10 de septiembre de 2026. El asesor pidió, para dentro de dos semanas, una
primera versión, y dijo qué quiere ver sobre todo: **qué tan buenos son los wireframes que
generamos**. Dieciséis de las dieciocho leyes se puntúan sobre el wireframe, así que esa
prioridad es correcta: si el wireframe es malo, dieciséis leyes miden ruido y la tesis no
tiene de qué hablar.

En la misma ventana cae **M2** (20 de septiembre), que congela el protocolo. Las dos cosas se
apoyan: no se puede congelar un instrumento cuya representación de entrada todavía está en
discusión.

---

## 1. Qué significa «un buen wireframe», dicho en números

Un wireframe no es bueno porque se vea bien. Antes de la demostración hay que poder decir
contra qué se juzga, o la conversación con el asesor se vuelve estética. Cuatro criterios,
los dos primeros ya implementados:

| | Criterio | Cómo se mide | Estado |
|---|---|---|---|
| C1 | **Fidelidad geométrica** | Cada caja está donde el fixture declara. Desviación máxima sobre fixtures de geometría conocida | **0,000 px** sobre tres fixtures, con controles negativos |
| C2 | **Fidelidad de tinta** | La caja de tinta corresponde a la extensión que se ve. Aserciones `ink_` sobre fixtures | **0,000 px** sobre cinco aserciones, incluida herencia anidada |
| C3 | **Cobertura** | Fracción de la tinta del screenshot que cae dentro de alguna caja del wireframe. Responde: ¿se perdió algo que sí se ve? | Por implementar |
| C4 | **Parsimonia** | Fracción de los bordes dibujados que corresponden a algo en la pantalla. Responde: ¿se dibujó algo que no se ve? | Por implementar. Sobre la página sintética, la regla nueva elimina 99 de 110 rectángulos |

C1 y C2 son sobre geometría declarada y no admiten discusión. C3 y C4 son los que hay que
construir esta semana, y son los que contestan la pregunta del asesor de forma verificable.

**Y un quinto criterio que no es una métrica sino un catálogo.** Los modos de falla
conocidos, contados por página: contenido dentro de un `canvas` o rasterizado dentro de una
imagen, que no tiene caja y no aparece; iframes, que quedan fuera del snapshot; tipografías
web que no cargan y cambian la tinta; encabezados fijos o pegajosos; elementos que aparecen
después del evento de carga. Cada uno se cuenta, no se estima.

---

## 2. El entregable de la demostración

Un **reporte de wireframes**: una página HTML con, para cada página evaluada, el screenshot
y el wireframe lado a lado, las cuatro métricas, y los defectos encontrados nombrados uno
por uno. Más una tabla agregada al principio.

Que sea HTML y no diapositivas es deliberado: el asesor tiene que poder mirar de cerca, y
una comparación lado a lado a tamaño real es la única forma de juzgar C3 y C4 con el ojo,
que es lo que él va a hacer de todos modos.

Se muestra también **la comparación antes/después**: la misma página con el modo anterior
—cada caja de layout dibujada— y con el corregido. Es la evidencia de que la observación que
él hizo se atendió, y se ve en un segundo.

---

## 3. Restricción que hay que resolver el primer día

**Las capturas hay que correrlas en las máquinas del equipo.** El entorno donde se hizo este
trabajo no puede navegar a páginas externas: la pasarela responde 403 a la conexión, y está
verificado. Todo lo medido hasta ahora sale de fixtures y de una página sintética, y está
dicho así en cada sitio donde aparece la cifra.

Nada de esto bloquea el desarrollo —el pipeline corre entero contra archivos locales— pero
sí bloquea cualquier número sobre páginas reales. Es lo primero de la semana 7.

---

## 4. Semana 7 · 14 – 20 de septiembre

**Objetivo: M2 y las métricas de calidad del wireframe.**

| Día | Qué | Quién |
|---|---|---|
| Lun 14 | Correr la captura sobre las 30 páginas del corpus en una máquina del equipo. Sellar el corpus con hash y fecha | David |
| Lun 14 | Implementar C3, cobertura de tinta: máscara de píxeles no-fondo del screenshot contra las cajas del wireframe | — |
| Mar 15 | Implementar C4, parsimonia, y el catálogo de modos de falla contado por página | — |
| Mar 15 | Correr las dos métricas sobre las 30 páginas y leer la cola: las peores cinco páginas dicen qué falta | Equipo |
| Mié 16 | Arreglar lo que la cola muestre. Los candidatos previsibles son `canvas`, iframes y contenido que aparece después del evento de carga | — |
| Jue 17 | Piloto de calibración: las siete rúbricas sobre UICrit, revisando la distribución de niveles de cada una | Equipo |
| Vie 18 | Reescribir cualquier rúbrica que no ejercite su escala. Fechar la reescritura antes del congelamiento | Equipo |
| Sáb 19 | Escribir el protocolo: rúbricas, esquema, umbrales, grilla, estadístico, criterios de N/A, y la ablación de la caja de tinta | — |
| Dom 20 | **Congelar el protocolo, fecharlo, hashearlo y publicarlo. M2** | Equipo |

El piloto tiene que correr **después** de que la caja de tinta esté en su sitio. Calibrar las
rúbricas contra una representación que va a cambiar es trabajo perdido.

## 5. Semana 8 · 21 – 24 de septiembre

**Objetivo: la primera versión que el asesor va a ver.**

| Día | Qué |
|---|---|
| Lun 21 | Implementar las skills de G1, G2 y G7 contra el esquema congelado. Son las tres que más dependen de la caja de tinta, así que son la prueba de que el arreglo sirve |
| Mar 22 | Orquestador mínimo: capturar, invocar los tres grupos en su canal, validar contra el esquema, armar el perfil parcial |
| Mié 23 | Generar el reporte de wireframes sobre 10 páginas, con las cuatro métricas y el antes/después |
| Jue 24 | **Demostración.** Reporte de wireframes, una auditoría completa de punta a punta con tres grupos, y el protocolo congelado |

Tres grupos y no siete es deliberado: el asesor pidió ver la calidad del wireframe, no siete
rúbricas a medio implementar. Los otros cuatro entran en la semana 9, como estaba planeado.

---

## 6. Qué se le dice al asesor sobre sus dos observaciones

Las dos tenían razón y las dos ya están resueltas en el repositorio. El detalle completo está
en `09-CORRECCION-WIREFRAME.md`; en una frase cada una:

**Sobre los componentes más anchos que su texto.** Era un defecto de validez y no un detalle
de dibujo: medido sobre una página de geometría declarada, la razón de agrupación de G1 daba
indefinida con cajas de layout —todas las separaciones valían cero— y da 5,34 con cajas de
tinta. Cada nodo lleva ahora dos cajas, `bounds` y `ink`, y cada grupo declara sobre cuál
mide. G7 es la única excepción y mide sobre `bounds`, porque Fitts mide el área que acepta el
clic y no la que se ve.

**Sobre carga cognitiva.** Tenía razón en que buena parte de lo que produce carga en una
pantalla real no está en el wireframe. No se cambia el canal: se acota el constructo. El
término mide carga extrínseca de origen estructural, la intrínseca queda fuera por
definición del constructo —Sweller y coautores, 2019, revisan su propia taxonomía y dejan
solo intrínseca y extrínseca como categorías básicas— y la parte no estructural de la
extrínseca queda fuera de este canal. Y esa segunda exclusión no es una excusa: G3 ya se
corre también sobre el screenshot, así que la diferencia entre los dos puntajes **es** la
medida de cuánto se pierde al abstraer. Si es grande, es un hallazgo.

---

## 7. Lo que puede salir mal

**El piloto de calibración obliga a reescribir rúbricas y M2 no cabe.** Es el riesgo más
probable. Contingencia: congelar con las rúbricas que sí ejercitan su escala y declarar por
escrito cuáles quedaron con calibración pendiente, en vez de congelar un instrumento que no
se revisó. Un congelamiento honesto y parcial vale más que uno completo y ciego.

**Las páginas reales rompen la capa de captura de formas que las fixtures no anticipan.** Es
lo que la cola de las peores cinco páginas está para encontrar, y por eso esa tarea va el
martes y no el viernes.

**El comité de ética sigue sin confirmar y está en la ruta crítica de M4.** No bloquea estas
dos semanas, sí bloquea la semana 11. Sigue siendo el `[PENDIENTE]` más caro de los tres que
quedan abiertos.

---

## 8. Lo único que necesito de ustedes

Correr la captura sobre las 30 páginas en una máquina con red y pasarme los cuatro
artefactos por página. Con eso las métricas C3 y C4 salen sobre páginas reales en vez de
sobre una sintética, y el reporte que ve el asesor deja de tener asteriscos.
