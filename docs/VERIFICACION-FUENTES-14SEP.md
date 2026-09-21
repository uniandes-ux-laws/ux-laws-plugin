# Verificación de las fuentes primarias de las dieciocho leyes

14 de septiembre de 2026. Se abrieron las fuentes. Lo que no se pudo abrir está marcado como
tal y no se afirma nada sobre ello.

**Abiertas en texto completo:** Miller 1956 · Chase & Simon 1973 · Baddeley & Hitch 1974 ·
Cowan 2001 · Sweller 1988 · Sweller, van Merriënboer & Paas 2019 · Hunt 1995 · Benway & Lane
1998 · Burke et al. 2005 · Glanzer & Cunitz 1966 · Kivetz, Urminsky & Zheng 2006 · Hick 1952 ·
Fitts 1954 (reimpresión verbatim APA 1992) · Iyengar & Lepper 2000 · Scheibehenne et al. 2010 ·
Liu et al. 2020 · Wertheimer 1923 en la traducción de Ellis 1938 · Wagemans et al. 2012 ·
Nielsen 2000 · Tesler s.f. · Thorburn 1918 · Tuch et al. 2012 (preprint).

**Solo resumen o ficha de catálogo:** Palmer 1992 · Palmer & Rock 1994 · Palmer & Beck 2007 ·
Proctor & Schneider 2018 · Hyman 1953 · Benway 1998 HFES · Ning et al. 2023 · Reinecke et al.
2013.

**No alcanzadas:** el original alemán de Wertheimer 1923 (de pago) · Koffka 1935 p. 110 ·
von Restorff 1933 (de pago, en alemán, sin traducción publicada) · Hull 1932 y Hull 1934
(PsycNet bloquea robots) · Saffer, *Designing for Interaction* (libro).

---

# PARTE 1 · Errores que hay que corregir

Ordenados por gravedad. Los cinco primeros son de la clase que un jurado detecta.

## 1.1 · `palmer1994rethinking` está citado para Región Común y no la sostiene

Palmer & Rock (1994), *Rethinking perceptual organization: The role of uniform connectedness*,
**Psychonomic Bulletin & Review** 1(1):29–55, doi:10.3758/BF03200760, trata de **conectividad
uniforme**, y los autores argumentan explícitamente que **no es una forma de agrupación**.
Citarla para Región Común confunde dos principios que ellos separaron a propósito. Sale de esa
ley o se cita por lo que dice.

## 1.2 · El experimento del corredor de ratas es Hull **1934**, no 1932

- **Hull (1932)**, *The goal-gradient hypothesis and maze learning*, **Psychological Review**
  39(1):25–43, doi:10.1037/h0072640 — el paper **teórico** que enuncia la hipótesis.
- **Hull (1934)**, *The rat's speed-of-locomotion gradient in the approach to food*,
  **Journal of Comparative Psychology** 17(3):393–422, doi:10.1037/h0071299 — el
  **experimento** del corredor.

Los propios Kivetz, Urminsky y Zheng lo citan así: «**Hull (1934)** constructed a straight
runway with electrical contacts… the animals ran faster the closer they were to the food
reward». Si el documento dice «Hull (1932) mostró que las ratas corren más rápido al acercarse
a la comida», la frase es falsa.

**Ninguno de los dos Hull se pudo abrir.** Volumen, número, páginas y DOI vienen de bibliografía
secundaria. Verificar en la biblioteca de Uniandes antes de entregar.

## 1.3 · Palmer (1992) no contiene experimentos

*Common region: A new principle of perceptual grouping*, **Cognitive Psychology**
24(3):**436–447** (no 436–441), doi:10.1016/0010-0285(92)90014-S. Su propio resumen dice
«**demonstrations**» y no reporta ninguna cifra; el propio Palmer, en 2002, las llama
«demostraciones de mi laboratorio».

La evidencia experimental de región común está en **Palmer & Beck (2007)**,
*The repetition discrimination task*, **Perception & Psychophysics** 69(1):68–78,
doi:10.3758/BF03194454 — cinco experimentos con tiempos de respuesta que cubren proximidad,
similitud por color y región común con un mismo instrumento. **No está en `references.bib` y es
la cita más valiosa de G1.**

## 1.4 · `sweller1988cognitive` no puede citarse para la taxonomía intrínseca/extrínseca/germana

Esa taxonomía **no está en el paper de 1988**. Es de Sweller, van Merriënboer & Paas (1998).
El de 1988 es modelado computacional (PRISM) más un estudio dual con **24 estudiantes de
décimo grado** de un colegio de Sídney resolviendo seis problemas de trigonometría.

## 1.5 · Baddeley & Hitch (1974) no contiene el bloc visoespacial

El capítulo de 1974 propone un ejecutivo central y un **«phonemic response buffer»**. El
término *articulatory loop* **no aparece**, y el **bloc visoespacial no se nombra ni se
propone**: solo hay una conjetura de que «a comparable system exists for visual memory». El
modelo de tres componentes es **Baddeley (1986)**. Una ley de canal visual que se apoye en «el
bloc visoespacial» no se puede citar a 1974.

Además es un **capítulo de libro**, no un artículo: `@incollection`, editor Bower, *The
Psychology of Learning and Motivation* vol. 8, pp. 47–89, Academic Press. Verificar cómo está
tipado hoy.

## 1.6 · La frase latina de la navaja **no es de Ockham**

Thorburn, W. M. (1918), *The myth of Occam's razor*, **Mind** 27:345–353, establece que
*«Entia non sunt multiplicanda praeter necessitatem»* **no aparece en ninguna obra de Ockham**.
Lo que Ockham sí escribió es *«Pluralitas non est ponenda sine necessitate»* y *«Frustra fit per
plura, quod potest fieri per pauciora»*. La fórmula popular se rastrea a **John Ponce de Cork,
1639**, que ya la llamaba «illud axioma vulgare»; el nombre inglés *Occam's razor* es de
**Hamilton, 1852**. Atribuir la formulación estándar a «William of Ockham, siglo XIV» es un
error con independencia de la cuestión de UX.

## 1.7 · `nielsen2000end` es una columna de blog, no un artículo

Nielsen, J. (22 de julio de 2000), *End of Web Design*, Alertbox / Nielsen Norman Group,
https://www.nngroup.com/articles/end-of-web-design/. La formulación aparece verbatim ahí. Si
está tipado como `@article` con campo *journal*, eso presenta un post como paper revisado por
pares. Tiene que ser `@misc`/`@online` con `url` y `urldate`.

## 1.8 · `benway1998banner` es ambiguo entre dos publicaciones de 1998

- Benway, J. P. (1998), *Banner blindness: The irony of attention grabbing on the World Wide
  Web*, **Proceedings of the HFES Annual Meeting** 42(5):463–467,
  doi:10.1177/154193129804200504 — **autor único**, confirmado contra el editor.
- Benway & Lane (1998), *Banner blindness: Web searchers often miss «obvious» links*,
  *Internetworking: ITG Newsletter* 1(3) — **dos autores**, es la versión que circula, y su
  ficha bibliográfica **no se pudo verificar** (el boletín está extinto).

Hay que fijarla a una de las dos con la lista de autores correcta.

## 1.9 · Rangos de páginas y campos menores

- `cowan2001magical`: **87–114** es el artículo; 87–185 incluye los comentarios abiertos.
- No escribir que Wertheimer acuñó *Prägnanz* en 1923: van Geert et al. (2023,
  doi:10.3758/s13421-023-01445-z) lo atribuyen vía **Schumann (1914)**.
- Si se cita a Wertheimer en inglés, se cita **Ellis (1938)** como traductor: `1923/1938`.
- `fitts1954information` y `iyengar2000choice` no tienen DOI en el `.bib`: son
  10.1037/h0055392 y 10.1037/0022-3514.79.6.995.
- Fitts: casi todos los PDF en línea son la reimpresión de 1992, **121(3):262–269**. Ninguna
  cita con página puede salir de ahí.
- Chase & Simon 1973: el encabezado del PDF muestra «55-61», que es OCR de **55–81**.
- Saffer, *Designing for Interaction*: Wikipedia cita la 2.ª ed. (2010) p. 136 y Yablonski la
  1.ª (2006); los subtítulos difieren. Nadie abrió el libro.

---

# PARTE 2 · Lo que la verificación aporta al argumento

## 2.1 · Miller advierte, él mismo, contra el uso que la divulgación le da

Miller (1956), **Psychological Review** 63(2):81–97. Metadatos correctos.

No es un experimento: es una revisión de **tres literaturas distintas**. Sobre juntarlas:
«**that is a fundamental mistake**, as I shall be at some pains to demonstrate», y «the span of
absolute judgment and the span of immediate memory are **quite different kinds of limitations**».

Sobre su propio número: «**I suspect that it is only a pernicious, Pythagorean coincidence**».

Y el dato que la versión popular borra: con estímulos multidimensionales la capacidad **sube** —
Pollack y Ficks obtuvieron 7,2 bits, «**about 150 different categories** that could be absolutely
identified without error»— y el *chunking* es el mecanismo que **derrota** el límite: «we manage
to break (or at least stretch) this informational bottleneck».

**Miller no habla de interfaces, menús ni número de opciones en ninguna parte.** No hay
recomendación de diseño en el paper.

## 2.2 · Cowan: el 4 es un piso experimental, no un techo de diseño

Cowan (2001), **BBS** 24(1):87–114, doi:10.1017/S0140525X01003922. Argumenta «a single, central
capacity limit averaging about four chunks». Sobre Miller: «that number was meant more as **a
rough estimate and a rhetorical device** than as a real capacity limit».

Pero su 4 se obtiene **impidiendo deliberadamente** el agrupamiento, el repaso y el apoyo en
memoria a largo plazo. Un usuario navegando tiene los tres. **Usar «4±1» para limitar elementos
de interfaz es una mala aplicación más estrecha que 7±2, no más rigurosa.** Y la unidad son
*chunks*: quien cuenta elementos renderizados cuenta rasgos, no chunks.

## 2.3 · Chase & Simon: el chunking es conocimiento previo, no geometría

*Perception in chess*, **Cognitive Psychology** 4(1):55–81, doi:10.1016/0010-0285(73)90004-2.
Tres jugadores. En posiciones reales de mitad de partida el maestro reconstruyó ~16 piezas, el
Clase A ~8, el principiante ~4. **En posiciones aleatorias «there was no relation at all between
memory of the position and playing strength»**, y los tres quedaron por debajo del principiante
en posiciones reales.

Una posición real y una aleatoria son **visualmente idénticas** en número de elementos, extensión
y geometría de agrupación. Consecuencia directa: **un evaluador que puntúe «calidad del chunking»
desde la geometría de la imagen está midiendo agrupación perceptual, que es un constructo
Gestalt, no chunking.** Si G3 puntúa segmentación sobre el wireframe, o se renombra el
constructo, o se declara que mide una *afordancia* para el chunking de un usuario con
conocimiento, no el chunking.

**Y eso es doble conteo con G1**, que es exactamente el defecto de validez que el proyecto
vigila. Hay que decirlo en el documento.

## 2.4 · Sweller 2019: la cita está confirmada, la lectura hay que corregirla

Sweller, van Merriënboer & Paas (2019), **Educational Psychology Review** 31(2):261–292,
doi:10.1007/s10648-019-09465-5. **Todos los metadatos del equipo son correctos.** La frase está
verbatim, con ortografía británica:

> «As a result of this reconceptualisation, only intrinsic and extraneous cognitive load are
> distinguished as basic categories of cognitive load.»

**Pero la reducción de tres categorías a dos no elimina la carga germana: la reclasifica.** El
mismo paper: «the current formulation eliminates this problem by assuming that germane cognitive
load has a **redistributive function** from extraneous to intrinsic aspects of the task rather
than imposing a load in its own right».

Si la decisión se enuncia como «Sweller 2019 eliminó la carga germana», es una mala lectura y un
revisor devuelve la frase de la redistribución. Enunciarla así: *la formulación de 2019 distingue
solo dos categorías básicas, habiendo reconceptualizado el procesamiento germano como
redistributivo y no como aditivo.*

## 2.5 · La carga cognitiva no tiene constructo que instanciar en una captura

La variable dependiente de Sweller (1988) es la **adquisición de esquemas**, es decir aprendizaje,
y el resumen enmarca todo el aporte en «the ineffectiveness of problem solving as a learning
device». La carga se define **relativa a una tarea y al conocimiento previo de quien la ejecuta**.

Una captura estática **no tiene aprendiz, ni objetivo de aprendizaje, ni esquema que adquirir, ni
tarea, ni post-test**. La formulación honesta es que el sistema puntúa **complejidad visual y
estructural del artefacto**, a lo sumo un proxy de un antecedente de la carga extrínseca, y que
no se afirma haber medido carga cognitiva.

## 2.6 · G4 contiene una contradicción interna y hay que resolverla

Es el hallazgo más importante de esta tanda.

**Von Restorff** (vía Hunt 1995, **Psychonomic Bulletin & Review** 2(1):105–112,
doi:10.3758/BF03214414): un elemento aislado se **recuerda mejor**. Pero Hunt demuestra que **la
saliencia perceptual no es el mecanismo**, y que la propia von Restorff lo mostró: el aislado
aparecía en la posición 2 o 3, «at which point the subjects could not know anything about the
contents of the whole list». Y el efecto es **relacional**: exige un fondo **homogéneo**.
«Distinctiveness in the context of similarity facilitates performance more than does
distinctiveness unaligned to similarity.»

**Benway** (leído en texto completo): un elemento visualmente destacado se **ignora**. Piloto:
los banners se encontraron el **58 %** de las veces contra el **94 %** de los controles
(t(5)=2,80, p=0,03). Experimento principal, 72 estudiantes: 6,02 s cuando el banner era
irrelevante contra 5,51 s cuando **sí ayudaba** — «This difference was not significant, Wilks'
Lambda F(2,59)=0,97, p=,38». Solo 17 de 71 reportaron haber visto los banners no publicitarios.
Y la recomendación de los propios autores: «perhaps a better strategy would be to **increase the
perceptual grouping**». Su frase citable: «**One item separated visually from everything else on
a web page may be completely ignored by web searchers.**»

**G4 subsume las dos.** Una rúbrica que premie el aislamiento por Von Restorff y lo penalice por
atención selectiva produce puntajes incoherentes. La resolución existe y es defendible —Von
Restorff es **memoria de un aislado en una lista homogénea**, Benway es **búsqueda visual bajo un
esquema aprendido de evitación**— pero hay que **escribirla**. Y la rúbrica tiene que puntuar
*contraste contra un campo homogéneo*, degradando cuando el campo ya es heterogéneo.

Replicación moderna, útil y verificada: **Burke et al. (2005)**, **ACM TOCHI** 12(4):631–662 —con
seguimiento ocular, los banners se fijaron en el 11,7 % de los ensayos y aun así **costaron**
6,3–7,5 % de tiempo de búsqueda (p<0,005)— y **Ning et al. (2023)**,
doi:10.1007/s10339-023-01131-7, que muestra que la ceguera **varía** con el tipo de banner y la
consistencia temática. Benway tiene 28 años y sus estímulos son páginas de 1998.

## 2.7 · Posición serial: desajuste de constructo, no de alcance

Glanzer & Cunitz (1966), **JVLVB** 5(4):351–360, doi:10.1016/S0022-5371(66)80044-0. Experimento 2,
46 soldados: con 10 s de conteo intercalado «the end peak» casi desaparece y con 30 s «there is
no trace at all», mientras la primacía queda intacta. Es una **disociación doble funcional**, no
el descubrimiento de la curva.

Y midieron **recuerdo de una lista presentada secuencialmente y ya retirada**. Una captura
presenta **todo simultáneamente y de forma persistente**: no hay intervalo de retención, no hay
recuerdo, hay **búsqueda visual sobre un display disponible**. La inferencia habitual —«poner lo
importante primero y último»— es una **analogía con la posición espacial tomada de un hallazgo de
orden temporal**, y si es cierta lo será por patrones de escaneo y saliencia de borde, que tienen
su propia literatura.

**Esto no es el mismo hueco que las leyes temporales fuera de alcance, y es peor porque es
invisible.** Va declarado como amenaza a la validez de constructo.

*Ebbinghaus no es la cita correcta:* su paradigma era aprendizaje serial de sílabas sin sentido
hasta criterio, con **n = 1, él mismo**, y no estableció la disociación. Glanzer & Cunitz no lo
citan. Para la curva canónica de recuerdo libre, **Murdock (1962)**, **Journal of Experimental
Psychology** 64(5):482–488, doi:10.1037/h0045106 — ojo, hay agregadores que la listan en JVLVB,
que es falso.

## 2.8 · Gradiente de meta: la exclusión de v1 queda respaldada, con una tentación que hay que nombrar

Kivetz, Urminsky & Zheng (2006), **JMR** 43(1):39–58, doi:10.1509/jmkr.43.1.39, leído completo.
Estudio 1: 949 tarjetas completadas, ~10.000 compras; la diferencia media entre el primer y el
último intervalo entre compras fue de **0,7 días (t=2,6, p<0,05)**, ~20 % de aceleración.
Estudio 2: 108 clientes; tarjeta de 10 casillas contra tarjeta de 12 **con 2 ya selladas** —el
mismo trabajo real— dan **15,6 días contra 12,7** (t=2,0, p<0,05).

**Toda variable dependiente es una tasa de cambio a lo largo del tiempo.** El efecto *es* la
pendiente. Una captura no tiene eje temporal ni medidas repetidas: **el constructo no tiene
proyección estática**. Esto respalda la exclusión ya decidida, y conviene citarlo en limitaciones
como evidencia de que la exclusión es de principio y no de conveniencia.

**La tentación que hay que resistir por escrito:** el «progreso dotado» del estudio 2 es un
**artefacto visible** —una tarjeta que muestra 2/12— y sí se ve en una captura. Puntuar
«hay indicador de progreso y está enmarcado como parcialmente avanzado» es legítimo; llamarlo
«puntaje de gradiente de meta» es un **error de categoría**: sustituir un constructo inobservable
por un proxy observable sin declarar la sustitución.

## 2.9 · Hick y sobrecarga de elección: las fuentes respaldan la decisión ya tomada

Hick (1952), **QJEP** 4(1):11–26, doi:10.1080/17470215208416600. Diez lámparas «in a somewhat
irregular circle», colocadas para «obviate the need for eye movements», diez dedos sobre teclas
Morse. **«The experimenter acted as subject»** — el experimento I tuvo un solo sujeto, él mismo,
tras más de 8.000 reacciones de práctica. Estímulos equiprobables por construcción.

Y el argumento decisivo ya está en la bibliografía: Liu, Gori, Rioul, Beaudouin-Lafon y Guiard
(CHI 2020, doi:10.1145/3313831.3376878): «the stimulus-response paradigm is **rarely relevant to
HCI tasks**» y **«Hick's law speaks against, not for, the popular principle that "less is
better"»**.

Iyengar & Lepper (2000): de 242 clientes que pasaron por el surtido amplio **se detuvo el 60 %**;
del limitado, el 40 %. Compraron 30 % contra 3 %. **El surtido grande atrajo más gente.**
Scheibehenne, Greifeneder & Todd (2010), doi:10.1086/651235: 50 experimentos, 5.036
participantes, **D = 0,02, IC 95 % [−0,09; 0,12]**, con «a slight publication bias in favor of
choice overload results» y el año de publicación como moderador significativo.

**No se puede presentar como regularidad establecida.** La decisión de puntuar apoyos a la
decisión en vez de `n` pasa de conveniencia a respuesta deliberada a una replicación fallida.

*Antes de decir «el efecto es nulo»:* no se abrieron la meta-análisis de Chernev et al. ni un
re-análisis titulado «Re-Analyzing a Meta-Analysis». Presentar una literatura en disputa como
zanjada en cualquiera de las dos direcciones es el mismo error.

## 2.10 · Fitts: **W tampoco es determinable** sin A

Fitts (1954), **JEP** 47(6):381–391, doi:10.1037/h0055392. Tres experimentos: golpeo recíproco
(dieciséis universitarios diestros), transferencia de discos (otros dieciséis), transferencia de
pines (veinte). Verbatim: «a binary index of difficulty (Id) is defined as **Id = log2 2A/Ws**».

Que A no se observe en una captura ya estaba declarado. **Lo nuevo:** W es la tolerancia **a lo
largo del eje de movimiento**, y ese eje lo fija la dirección de A. Sin A, un botón de 200 × 40 px
**no tiene un W determinado**: son 200 px para una aproximación horizontal y 40 px para una
vertical. La captura entrega una caja, de la que hay que **elegir** un W por convención declarada
—la dimensión menor, como cota de peor caso—.

La tesis puede puntuar **adecuación de tamaño de objetivo** contra una convención declarada y
fechada. No puede afirmar que mide la ley de Fitts.

## 2.11 · Gestalt: demostraciones, no experimentos — y eso favorece al wireframe

Wertheimer 1923 no tiene participantes, ni variable manipulada, ni medida, ni estadística.
Wagemans et al. (2012, doi:10.1037/a0029333) registran que el movimiento fue «severely criticized
for offering **mere demonstrations**, using either very simple or confounded stimuli».

Eso **no invalida** el canal wireframe: las demostraciones de Wertheimer están deliberadamente
despojadas de color, tipografía y semántica, que es un argumento **a favor** del wireframe y
conviene hacerlo explícito. Lo que no autoriza es ningún «elementos a menos de N píxeles se
perciben como grupo». Ese umbral es del equipo.

**Similitud:** Wertheimer la demostró con **color, tamaño y orientación**. El wireframe abstrae
el color. O Similitud pasa al canal screenshot, o se declara que la evaluación sobre wireframe
cubre un subconjunto estricto de la ley.

**Prägnanz es la más débil, y por un margen amplio.** Ni Wertheimer ni Koffka definen «bueno» o
«simple» con independencia del resultado perceptual —Koffka pone «good» entre comillas por eso—,
así que no predice nada por adelantado. Cualquier rúbrica 0–4 de Prägnanz mide la definición de
simplicidad que estipule el equipo. Y es la más expuesta al doble conteo con las otras tres.

## 2.12 · Las tres sin publicación primaria: confirmado, con sustitutos verificados

**Jakob.** Nielsen, *End of Web Design*, 22 de julio de 2000. Es comentario: sin estudio, sin
participantes, sin datos. El propio Nielsen confirma el origen en su post de UX Tigers (2023):
«formulated this law in 2000», con enlace a esa columna. El único respaldo medido es literatura
gris de NN/g (Whitenton 2016, 50 usuarios, 14 sitios: fallo de navegación 4 % con logo a la
izquierda contra 24 % centrado).

**Tesler.** Nunca se publicó. La fuente primaria es su propia página,
nomodes.com/larry-tesler-consulting/adages-and-coinages, donde la fecha **ca. 1984** y no nombra
ningún medio. Llega a letra impresa por una entrevista en Saffer, *Designing for Interaction*.
Y, como está enunciada —una complejidad «inherente e irreducible» sin definición operacional
independiente—, **no es falsable**. Eso es una crítica más aguda que «no hay estudio» y merece
una frase.

**Occam.** Analogía pura: no se encontró ningún estudio empírico que pruebe la navaja en
interfaz. Y la formulación estándar ni siquiera es de Ockham (§1.6).

**Los sustitutos, los dos verificados y los dos basados en capturas estáticas:**

> **Tuch, A. N., Presslaber, E. E., Stöcklin, M., Opwis, K., & Bargas-Avila, J. A. (2012).**
> *The role of visual complexity and prototypicality regarding first impression of websites.*
> **International Journal of Human-Computer Studies** 70(11):794–811,
> doi:10.1016/j.ijhcs.2012.06.003. Estudio 1: 59 participantes, 119 capturas de páginas
> corporativas, exposiciones de 50/500/1000 ms con enmascaramiento; estímulos validados por 267
> evaluadores sobre 270 sitios. Prototipicidad sobre juicio de belleza:
> **F(1,0; 56,0)=241,365, p<0,001, ηp²=0,812**; complejidad visual: F(1,8; 99,9)=77,607,
> p<0,001, ηp²=0,581. Estudio 2: 82 participantes, efectos que sobreviven a **17 ms**.

> **Reinecke, K., Yeh, T., Miratrix, L., Mardiko, R., Zhao, Y., Liu, J., & Gajos, K. Z. (2013).**
> *Predicting users' first impressions of website aesthetics with a quantification of perceived
> visual complexity and colorfulness.* **CHI '13**, pp. 2049–2058, doi:10.1145/2470654.2481281.
> **548 participantes, 450 sitios**, 500 ms. Medidas computacionales de complejidad visual y
> colorido más demografía explican cerca de la mitad de la varianza en los juicios estéticos.
> *Solo se leyó el resumen: no citar cifras internas sin abrirlo.*

**Reinecke et al. es además trabajo previo directo de esta tesis:** es cuantificación
computacional desde capturas validada contra juicio humano a escala, que es estructuralmente el
mismo problema. **Va al estado del arte y toca contra las tres afirmaciones de ausencia de
§3.2.3**, se resuelvan como se resuelvan.

---

# PARTE 3 · Entradas a añadir a `references.bib`

Todas verificadas en esta sesión salvo donde se indica.

| Clave sugerida | Entrada |
|---|---|
| `palmerbeck2007rdt` | Palmer & Beck (2007), *Perception & Psychophysics* 69(1):68–78, doi:10.3758/BF03194454 |
| `wagemans2012century` | Wagemans et al. (2012), *Psychological Bulletin* 138(6):1172–1217, doi:10.1037/a0029333 |
| `chase1973perception` | Chase & Simon (1973), *Cognitive Psychology* 4(1):55–81, doi:10.1016/0010-0285(73)90004-2 |
| `hull1934rat` | Hull (1934), *J. Comparative Psychology* 17(3):393–422, doi:10.1037/h0071299 · **metadatos sin verificar** |
| `hull1932goal` | Hull (1932), *Psychological Review* 39(1):25–43, doi:10.1037/h0072640 · **metadatos sin verificar** |
| `murdock1962serial` | Murdock (1962), *J. Experimental Psychology* 64(5):482–488, doi:10.1037/h0045106 |
| `burke2005banner` | Burke et al. (2005), *ACM TOCHI* 12(4):631–662 · **DOI sin resolver, verificar** |
| `ning2023banner` | Ning et al. (2023), *Cognitive Processing* 24(3):313–326, doi:10.1007/s10339-023-01131-7 |
| `tuch2012visual` | Tuch et al. (2012), *IJHCS* 70(11):794–811, doi:10.1016/j.ijhcs.2012.06.003 |
| `reinecke2013predicting` | Reinecke et al. (2013), *CHI '13* 2049–2058, doi:10.1145/2470654.2481281 |
| `thorburn1918myth` | Thorburn (1918), *Mind* 27:345–353 |
| `tesler1984complexity` | Tesler (ca. 1984), nomodes.com · `@misc` |
| `koffka1935principles` | Koffka (1935), *Principles of Gestalt psychology* |
| `sweller2019twenty` | Sweller, van Merriënboer & Paas (2019), doi:10.1007/s10648-019-09465-5 |

---

# PARTE 4 · No verificado · no presentar como hecho

1. Texto completo de Palmer (1992). La conclusión «demostraciones, no experimentos» descansa en
   tres indicios convergentes, incluido su propio resumen y la descripción del autor, no en una
   lectura de primera mano.
2. Koffka 1935 p. 110: cita y página vienen de van Geert et al. (2023).
3. N, diseños y tamaños de efecto de los cinco experimentos de Palmer & Beck (2007).
4. Hyman (1953), doi:10.1037/h0056940: es real, no se abrió. No atribuirle ningún detalle.
5. **von Restorff (1933)**, doi:10.1007/BF02409636: ficha de catálogo y resumen alemán. Todo lo
   que la tesis diga de sus datos va atribuido a la lectura de Hunt, no afirmado directamente.
6. **Hull 1932 y Hull 1934**: ninguno abierto.
7. Cifras de la Tabla III de Baddeley & Hitch y las proporciones de recuerdo de la réplica de
   Hunt: revisar contra el PDF antes de citarlas.
8. Número de participantes de Ning et al. (2023): el resumen dice 27 hombres y 40 mujeres = 67.
9. Ficha bibliográfica de Benway & Lane en *Internetworking*; edición de Saffer.
10. Base logarítmica de las constantes de Hick (0,626 y 0,518): la aritmética sugiere base 10 y
    concuerda con sus «approximately five bits per second», pero eso es inferencia.
11. Que la traducción de Ellis (1938) sea formalmente una abreviación.
12. Cifras internas de Reinecke et al. (2013).

**Regla de proceso que sale de esto:** no copiar referencias de agregadores. Se encontró en vivo
un agregador que lista Murdock (1962) en la revista equivocada.
