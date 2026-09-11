# Plan de pruebas

10 de septiembre de 2026, actualizado al final del día. Qué se prueba, en qué orden, qué
demuestra cada prueba y cuál es el estado hoy.

Esta revisión añade el nivel 0b —descarte de interstitials—, que no existía cuando se escribió
la primera versión, y sustituye el estado declarado de 1c y 1d por los valores medidos sobre
las treinta páginas.

---

## La distinción que hay que tener clara

**Hay dos clases de prueba y confundirlas es un error de método, no de ingeniería.**

Los niveles 0, 0b, 1 a 4 y el 10 son **pruebas**: pasan o fallan, y una que falla bloquea lo
que viene después. Miden si el sistema hace lo que dice hacer.

Dos de ellas —1c cobertura y 1d parsimonia— no pasan ni fallan contra un umbral absoluto, que
no existe y no se va a inventar después de ver los datos: su criterio de falla es de regresión
contra la línea base sellada. La justificación está en el nivel 1.

Los niveles 5 a 9 son **mediciones**: no pasan ni fallan, reportan un valor. Un acuerdo bajo
o una dispersión alta no son pruebas fallidas, son resultados de la tesis. Tratarlos como
fallas invita a ajustar el instrumento hasta que el número salga bonito, que es exactamente
lo que el pre-registro existe para impedir.

---

## Nivel 0 · Determinismo de la captura

**Qué demuestra:** que dos corridas sobre la misma página producen los mismos artefactos. Sin
esto, ninguna diferencia posterior es atribuible: no se sabría si cambió el modelo o cambió
la entrada.

**Cómo:** capturar dos veces la misma página local y comparar el sha256 de `screenshot.png`,
`wireframe.png` y `nodes.json`.

**Estado: PASA.** Re-verificado el 10 de septiembre de 2026 sobre `capture/pages/portal.html`
con Chromium 153.0.8010.12, la misma versión con la que se capturó el corpus. Los tres
archivos son idénticos byte a byte entre las dos corridas:

| Artefacto | sha256 de las dos corridas |
|---|---|
| `screenshot.png` | `8445f0075d1e185cc1bf1274ea1a4f5698f5ffc4e90add90628ff7a7b248a395` |
| `wireframe.png` | `73daae6f391ac451de2adfc6445be2cbe970d0a1ab333e580719d51c047050ba` |
| `nodes.json` | `7778cbb352716c3a35a23d793e3306537f3db4a46193ed84d5ddb7b3725ec74b` |

**Lo que no cubre:** una página real cambia entre capturas por razones legítimas —rotación de
banners, contenido dinámico, publicidad—. Por eso `meta.json` guarda la fecha y el hash de
cada captura: la comparación se hace contra el artefacto guardado, nunca volviendo a
capturar. El determinismo verificado es el del procedimiento sobre una entrada fija, no el
de la web.

## Nivel 0b · Descarte de interstitials y captura de la página correcta

**Por qué existe este nivel.** No estaba en la primera versión de este documento y es el
hueco que los niveles 1a a 1d no cubren: las tres métricas automáticas verifican que la
representación sea fiel **a la página que se capturó**, y ninguna verifica que se haya
capturado la página correcta. Las tres estaban en verde mientras G01 gov.co medía un modal de
ubicación.

**Qué demuestra:** que lo capturado es la pantalla del sitio y no la capa que se interpone
antes de ella, y —más importante para el método— que toda intervención sobre la página quedó
registrada. Una captura que cierra un modal sin dejar constancia es una intervención
invisible, que es exactamente lo que el protocolo prohíbe.

**Cómo:** `capture/dismiss.js`, catálogo cerrado y fechado en la versión **2026-09-10**. Una
capa entra al procedimiento solo si cubre al menos la mitad del viewport, se declara
`role="dialog"`, o es una franja fija con texto de consentimiento; y solo se cierra si además
ofrece un control que esté en el catálogo. El registro completo —rondas, vía, regla, texto del
control, overlay restante— va a `meta.json`.

**Criterio de paso.** No es un umbral sobre cuántos interstitials se cierran: es que **toda
captura lleve el registro** y que **toda página que quede sucia quede declarada**. La prueba
falla si una captura interviene sin dejar constancia, o si una página con capa sin cerrar pasa
al análisis sin marca.

**Estado: PASA, con una excepción declarada.**

| | Resultado sobre las 30 capturas del 10 de septiembre |
|---|---|
| Capturas con registro `consent` y versión del catálogo | 30 / 30 |
| Páginas que presentaron interstitial | 6 · G01, G04, H09, H10, L03 y L07 · siete capas en total, porque L03 encadena dos |
| Cerrados por el catálogo | 6 · tres por selector, tres por texto (`acepto`, `entendido`, `close`) |
| Páginas con `sanity.ok: true` | 29 / 30 |
| Páginas con `consent.limpio: false` | 1 · L03 |

**La excepción: L03 Éxito.** La primera capa se cerró por el texto `acepto`; la segunda no
tiene ningún control de descarte presente en el catálogo y quedó registrada con el motivo
`sin control de descarte en el catalogo`. La captura lleva `limpio: false` y el control de
sanidad la marcó con `capa sin cerrar sobre el 100% del viewport`. **Su puntaje se lee con esa
advertencia y el catálogo no se amplía a la medida de ese sitio**: una regla escrita para
cerrar el modal de Éxito produce un procedimiento que funciona en estas treinta páginas y en
ninguna otra. La pérdida que la capa provoca es medible y está en el nivel 1c: L03 es la peor
cobertura del corpus con 81,8 %.

**Lo que no cubre.** Una capa que no llegue a media pantalla, no se declare `role="dialog"` y
no mencione cookies no entra al procedimiento. Y el catálogo **acepta** el consentimiento en
vez de rechazarlo, decisión declarada en el propio módulo: rechazar deja a varios sitios en un
estado degradado que casi ningún usuario ve.

**Procedencia de la cifra.** Las seis páginas salen del campo `consent` de los treinta
`meta.json` de la corrida sellada del 10 de septiembre —sello `f9c0caaaa2ea…`—, medidas con el
detector `medirOverlay`, el que exige `elementFromPoint` además de la geometría.

Hasta el 10 de septiembre el encabezado de `capture/dismiss.js` decía **nueve**, y la
corrección vale la pena registrarla porque el error tenía dos capas. La tabla del sondeo de la
que salía la cifra tenía ocho páginas con capa al 100 %, no nueve; y ese sondeo corrió antes
del cambio de user agent —con nueve páginas devolviendo 403 o 500— y con un detector que
todavía no probaba `elementFromPoint`, de modo que contaba como muro cualquier capa fija y
grande aunque no tapara nada. Una cifra escrita sin decir sobre qué corrida y con qué detector
se midió queda huérfana y sobrevive a los cambios que la invalidan: por eso el encabezado
corregido lleva ahora su procedencia.

## Nivel 1 · Fidelidad de la representación

Es la prueba que el asesor pidió ver. Cuatro criterios, los cuatro implementados.

| | Qué demuestra | Cómo | Estado |
|---|---|---|---|
| 1a **Geométrica** | Cada caja está donde el fixture declara | Aserciones `exp_<x>_<y>_<w>_<h>` sobre fixtures de geometría conocida | **PASA · 0,000 px** sobre tres fixtures |
| 1b **De tinta** | La caja de tinta corresponde a lo que se ve | Aserciones `ink_<x>_<y>_<w>_<h>` | **PASA · 0,000 px** sobre cinco aserciones, incluida herencia anidada |
| 1c **Cobertura** | Nada visible se perdió | Máscara de píxeles no-fondo del screenshot contra las cajas del wireframe | **Implementada y corrida** sobre las 30 · mediana 100,0 %, mínimo 81,8 % |
| 1d **Parsimonia** | Nada se dibujó de más | Fracción de cajas dibujadas que corresponden a algo en la pantalla | **Implementada y corrida** sobre las 30 · mediana 98,9 %, mínimo 68,1 % |

**Controles negativos, ya implementados y verificados:** una caja declarada a 100 px que mide
137 hace fallar la prueba, y un elemento declarado pero ausente de `nodes.json` también. El
verificador no pasa por vacío.

### 1c · Cobertura

**Definición.** Fracción de los píxeles de tinta del screenshot que caen dentro de alguna caja
retenida. Un píxel cuenta como tinta cuando se aparta del color de fondo más de 24 unidades de
distancia euclídea en RGB; el fondo es el color más frecuente cuantizado a pasos de 8. El
umbral de 24 es convención de este proyecto: por debajo, el ruido de compresión y los
degradados suaves empiezan a contar como contenido.

**Implementación.** `scripts/metrics-wireframe.js`, `npm run metrics`. Detalle por página en
`captures/_metricas.json`.

| | |
|---|---|
| Mediana | **100,0 %** |
| Media | 98,6 % |
| Mínimo | 81,8 % |
| Páginas en 100,0 % exacto | 18 / 30 |
| Páginas por debajo de 95 % | 3 / 30 · L03, L10, G04 |

**La cola, que es donde está la información:** L03 81,8 % · L10 86,3 % · G04 91,1 % ·
G01 99,0 % · G07 99,5 %.

L03 coincide con la única página que quedó con una capa sin cerrar (nivel 0b): la capa tapa
tinta que ninguna caja retenida cubre. Para **L10 y G04 la causa no está diagnosticada**.
`[PENDIENTE: clasificar la pérdida de L10 y G04 contra el catálogo de modos de falla de 1e,
abriendo screenshot y wireframe lado a lado — va con el reporte HTML, antes de implementar las
skills]`.

**Cuidado con el 100 %.** Dieciocho de treinta páginas dan cobertura exacta de 100,0 %, y una
métrica que satura es sospechosa antes que celebrable: ya pasó dos veces con esta misma
métrica. Lo que sostiene que aquí sí mide es que **discrimina en la cola** —hay un rango de 18
puntos entre el máximo y el mínimo— y que las tres peores son páginas con una causa
identificable o por identificar, no ruido.

### 1d · Parsimonia

**Definición.** Fracción de las cajas dibujadas cuyo interior contiene al menos 2 % de tinta en
el screenshot. Se mide **por caja y no por píxel**: un contorno cae sobre el borde de lo que
encierra, y un conteo por píxel mediría el grosor de la línea en vez de si la caja se
justifica.

| | |
|---|---|
| Mediana | **98,9 %** |
| Media | 96,0 % |
| Mínimo | 68,1 % |
| Páginas en 100,0 % exacto | 14 / 30 |
| Páginas por debajo de 95 % | 7 / 30 |

**La cola:** L02 68,1 % con 29 cajas sin justificar de 91 · G06 77,6 % con 13 de 58 ·
G05 86,7 % con 6 de 45 · L05 90,0 % con 8 de 80 · G02 90,9 % con 3 de 33.

`_metricas.json` guarda por página las cinco peores cajas sin justificar con su `nodeName` y su
geometría: eso es lo que permite diagnosticar el generador sin volver a capturar. Ninguna de
las 30 páginas dibujó cajas fuera de pantalla (`drawnOffscreen: 0` en las treinta), que era el
defecto de parsimonia del que se partió.

**Corrección del 10 de septiembre.** El resumen impreso reportaba 99,1 % de parsimonia mediana
porque la función `med()` devolvía el mayor de los dos valores centrales cuando `n` es par. Con
la definición estándar la mediana es **98,9 %**. Los valores por página nunca cambiaron; lo que
cambió es el número que se iba a citar en el documento.

### La decisión de método sobre 1c y 1d

**Ninguna de las dos tiene umbral absoluto de paso, y no se le fija uno ahora.** Fijar el
umbral después de haber visto los treinta valores es elegir el umbral que los treinta ya pasan,
que es precisamente lo que el pre-registro existe para impedir. Se declaran en dos usos
distintos:

1. **Como descripción**, se reportan por página con su cola en el documento de tesis. Su valor
   está en las peores páginas, no en el agregado.
2. **Como prueba**, el criterio es de **regresión contra la línea base sellada**: una vez
   sellado el corpus, ningún cambio al generador de wireframes puede bajar la cobertura o la
   parsimonia de una página por debajo del valor registrado en `captures/_metricas.json`. Si la
   baja, el cambio se justifica por escrito o se revierte. La línea base es ese archivo tal como
   quedó junto al sello `f9c0caaaa2ea…` del 10 de septiembre, sobre las capturas que el sello
   certifica: comparar contra una recaptura sería comparar contra otra web.

Así quedan en el nivel 1 como prueba real —tienen un criterio que puede fallar— sin inventar un
número que nadie declaró antes de medir.

### 1e · Catálogo de modos de falla

No es una métrica sino un conteo por página de las formas conocidas de romperse. Lo que sigue
sale de las 30 capturas del 10 de septiembre, leyendo `meta.json` y `nodes.json`.

| Modo de falla | Presencia en el corpus | Qué se hace |
|---|---|---|
| Iframes fuera del snapshot | **23 / 30 páginas**, 245 subdocumentos en total | Quedan fuera y cada `meta.json` lo anota. Es la fuga más extendida del corpus |
| Contenido dentro de un `canvas` | 1 / 30 páginas, 2 nodos | El nodo tiene caja pero su contenido no; entra como superficie |
| Encabezados fijos o pegajosos | 26 / 30 páginas, 61 nodos `fixed` o `sticky` retenidos | **No se tocan**: son la interfaz que se evalúa, no una capa que se atraviesa |
| Nodo sin `position` computado | 30 / 30 páginas, exactamente 1 nodo por página, siempre `#document` | Conserva su caja: la regla no borra sobre falta de evidencia |
| Interstitial al entrar | 6 / 30 páginas, siete capas | Nivel 0b |
| Tipografías web que no cargan y cambian la tinta | No medido | `[PENDIENTE: exige capturar con y sin fuentes web y comparar la máscara de tinta; decidir si entra a v1 o se declara como limitación]` |
| Contenido rasterizado dentro de una imagen | No separable automáticamente | `[PENDIENTE: solo se distingue con anotación manual; hoy se declara como limitación del canal wireframe]` |

Que 23 de 30 páginas tengan iframes excluidos es un hallazgo con consecuencia directa sobre la
validez: el wireframe de esas páginas describe la pantalla menos lo que vive en un
subdocumento. Va a las limitaciones, no a una nota al pie.

## Nivel 2 · Conformidad de la salida

**Qué demuestra:** que ninguna salida inválida entra al análisis.

**Estado: PASA · 10/10.** El esquema acepta un resultado completo y un no-aplicable con
razón, y rechaza un puntaje sin `trigger`, uno sin `measurements`, un no-aplicable sin razón,
un puntaje fuera de 0–4, un grupo inexistente, una repetición fuera de 1–5, un hash mal
formado y un campo extra no declarado.

**Lo que falta:** que la validación esté **dentro del orquestador** y no solo en un script
aparte. Una salida inválida tiene que detenerse en el momento en que se produce, no en una
revisión posterior que alguien puede saltarse.

## Nivel 3 · Calibración de las rúbricas *(bloquea M2)*

**Qué demuestra:** que cada rúbrica usa su escala completa. Una rúbrica cuyos niveles medios
nunca se asignan produce, en los datos, exactamente el mismo aspecto que una rúbrica que
discrimina bien: acuerdo alto. La única forma de distinguirlas es correrla y mirar la
distribución de niveles que produce.

**Cómo:** las siete rúbricas sobre un **conjunto de calibración propio**: 24 páginas fuera del
corpus, capturadas con el mismo pipeline (`corpus/calibracion-v1.csv`). Se reporta, por
rúbrica, la distribución de niveles. La que no mueva sus puntajes se reescribe, y la
reescritura se fecha **antes** del congelamiento.

**UICrit quedó fuera el 10 de septiembre.** Es material móvil, no pasa por nuestro pipeline y
sus anotaciones no son puntajes en esta escala. El razonamiento, y qué reemplaza a UICrit en
cada uno de sus dos papeles —piloto y referencia—, está en `corpus/DECISIONES-CORPUS.md`.

**El piloto no lo corren los evaluadores humanos.** Calibrar con las mismas personas que
después producen la referencia hace circular la validación, y ataría M2 a la aprobación del
comité de ética.

**Estado: corrido el 10 de septiembre sobre tres de las siete rúbricas.** Resultados completos
en `docs/piloto-calibracion.md`.

Primera corrida, 10 de septiembre, con las rúbricas cuantificadas universalmente:

| Grupo | 0 | 1 | 2 | 3 | 4 | Niveles usados |
|---|---|---|---|---|---|---|
| G1 | 21 | 3 | 0 | 0 | 0 | **2 de 5** |
| G2 | 0 | 4 | 8 | 9 | 3 | **4 de 5** |
| G7 | 21 | 3 | 0 | 0 | 0 | **2 de 5** |

Segunda corrida, 11 de septiembre, después de reescribir G1 y G7 **por proporción afectada**
con la escala de tolerancia de `shared/escala.md`:

| Grupo | 0 | 1 | 2 | 3 | 4 | Niveles usados |
|---|---|---|---|---|---|---|
| G1 | 23 | 1 | 0 | 0 | 0 | **2 de 5** |
| G2 | 0 | 4 | 8 | 9 | 3 | **4 de 5** |
| G7 | 14 | 7 | 3 | 0 | 0 | **3 de 5** |

**G7 pasó de dos niveles a tres. G1 sigue en dos** y se congela declarada como no
discriminante: `p_C4` es generalizada en las 24 páginas. **G1 subsume cuatro de las dieciocho
leyes —la familia Gestalt completa—, así que congelarla así deja esas cuatro sin resultado
interpretable en la versión 1**; el coeficiente agrupado se reporta con y sin ella. La **regla del ajuste único** de
`shared/escala.md` prohíbe seguir moviendo umbrales hasta que reparta; la única vía abierta es
demostrar un defecto en la definición de C4, argumentado y fechado antes de volver a correr.

**Por qué esto no es cosmético.** Con cuantificación universal, sistema y humanos convergen en
0 y Brennan–Prediger con pesos cuadráticos da **1,000**: acuerdo perfecto sobre nada. Con la
distribución realmente medida de G1 y G7 —21 ceros y 3 unos— contra un humano que converge en
0 da **0,969**, más que el **0,875** de dos evaluadores que sí usan los cinco niveles y
discrepan la mitad de las veces. `npm run bp` reproduce los números.

**G3, G4, G5 y G6 siguen sin piloto.** Sus anclas son juicios semánticos que no se deciden
sobre `nodes.json` y que solo tendrán ejecución con sus skills, en M3. Si M2 se congela antes,
se congela sabiendo que cuatro rúbricas no se han visto ejercitar.

**Por qué no sobre el corpus:** correr el instrumento sobre el corpus antes de sellarlo
destruye el sellado. El piloto tiene que ser sobre datos ajenos.

**Quién lo ejecutó:** `scripts/pilot-calibracion.js`, una implementación **provisional** de la
capa de medición de G1, G2 y G7, no la skill publicada. Cada distribución es por tanto una
propiedad del par (rúbrica, implementación), y el reporte imprime las doce convenciones que la
implementación tuvo que cerrar donde la rúbrica dejaba un hueco. Dos de ellas resultaron ser
defectos de la implementación y no de la rúbrica —un contenedor de página completa que
colapsaba `n1` a uno, y una comparación de anchos en C4—, se detectaron mirando las medidas
crudas y quedaron escritas en el propio script.

## Nivel 4 · Casos dorados por grupo

**Qué demuestra:** que la rúbrica, ejecutada, asigna el nivel que un humano que lee la misma
rúbrica asignaría. Es la prueba unitaria de una rúbrica y es la que atrapa el caso peligroso:
una rúbrica que se lee bien y puntúa mal.

**Cómo:** cinco páginas por grupo, **fuera del corpus**, puntuadas a mano por el equipo por
consenso, con el nivel esperado escrito **antes** de correr la skill. La skill tiene que caer
dentro de ±1 nivel en al menos cuatro de las cinco. Un fallo se diagnostica con el `trigger`:
dice qué condición disparó el nivel y por tanto dónde está la ambigüedad.

**Estado: falta.** Es lo primero después de implementar cada skill, no lo último.

**Cuidado:** estas páginas no pueden ser del corpus ni de UICrit. Si lo fueran, el caso
dorado y la medición compartirían datos y el resultado dejaría de significar algo.

## Nivel 5 · Dispersión entre repeticiones *(medición)*

**Qué reporta:** k = 5 repeticiones de la misma skill sobre la misma página, misma
configuración. Se reporta la moda, el rango y la fracción de corridas que caen en el nivel
modal.

Un puntaje que oscila entre corridas es un hallazgo a reportar, no un problema a esconder.
Está pre-comprometido así desde la propuesta.

## Nivel 6 · Comparación entre canales *(medición)*

**Qué reporta:** los seis grupos estructurales puntuados sobre las dos representaciones de la
misma página. La diferencia es la estimación de cuánto aporta el screenshot que el wireframe
no tiene.

**Interés especial en G3.** Ahí la diferencia entre canales es la estimación directa de
cuánta carga extrínseca se pierde al abstraer, que es justo la objeción del asesor convertida
en medición.

## Nivel 7 · Comparación entre runtimes *(medición)*

**Qué reporta:** las mismas siete `SKILL.md` bajo Claude Code y bajo Codex. Los manifiestos
difieren; el texto de la rúbrica no. Es una medida de robustez del instrumento frente al
stack que lo ejecuta.

## Nivel 8 · Ablación de la caja de tinta *(medición)*

**Qué reporta:** las mismas páginas capturadas en los dos modos —`perceptual` y
`--no-perceptual`— y puntuadas con las mismas rúbricas. La diferencia por grupo mide cuánto
dependía el puntaje de bordes que no están en la pantalla.

Es barato: el modo alterno ya está implementado. Y convierte una corrección en un resultado
con signo propio.

## Nivel 9 · Acuerdo con la referencia humana *(medición)*

**Qué reporta:** Brennan–Prediger con pesos cuadráticos, agrupado, contra los cuatro
evaluadores expertos sobre las mismas páginas.

**Antes de comparar contra el sistema se calcula y se reporta el acuerdo entre los humanos.**
Si los evaluadores no concuerdan entre sí, el término contra el sistema no es interpretable y
hay que decirlo antes de mirarlo, no después.

El coeficiente agrupado sobre los 210 pares unidad-grupo es el resultado confirmatorio; los
coeficientes por grupo son exploratorios, se reportan con su intervalo y sirven para ordenar
grupos, no para clasificarlos.

## Nivel 10 · Reproducibilidad del artefacto

**Qué demuestra:** que otra persona puede instalarlo y obtener una salida válida. Es la mitad
de la contribución y es la prueba que más se salta la gente.

**Cómo:** en una máquina que no es la de desarrollo, desde el tag congelado, siguiendo
`docs/instalacion.md` palabra por palabra, por las dos vías —comando y prompt—, sin ajustar
nada sobre la marcha.

**Estado: falta.** Va en la semana anterior a la entrega, no el último día.

**Lo que ya se puede verificar desde cualquier clon:** `npm run seal:verify` recalcula los 120
archivos del corpus contra `corpus/SELLO-v1.json` y contra el sha256 que cada `meta.json`
guardó de su propio screenshot, y sale con código 1 si algo cambió. Es la parte del nivel 10
que no depende de instalar nada, y está en `docs/checklist-release.md` como paso previo al tag.

---

## Orden y dependencias

```
0  determinismo ──┐
0b interstitials ─┤
1  fidelidad  ────┼──> 3 calibración ──> M2 congelamiento
2  esquema    ────┘                          │
                                             v
                        4 casos dorados ──> 5 dispersión
                                            6 canales
                                            7 runtimes     ──> 9 acuerdo
                                            8 ablación
                                                           10 reproducibilidad
```

Nada de la derecha significa algo si algo de la izquierda falla. Un acuerdo alto sobre una
representación infiel mide la fidelidad al error compartido, no la calidad del instrumento. Y
el nivel 0b va antes que el 1 por la misma razón: una representación perfectamente fiel de la
capa equivocada es fiel a la capa equivocada.

## Resumen de estado

Corte del 10 de septiembre de 2026, al final del día.

| Nivel | Estado |
|---|---|
| 0 · Determinismo | **Pasa** · re-verificado hoy, tres hashes idénticos |
| 0b · Interstitials y sanidad | **Pasa** · 30/30 con registro, 29/30 limpias, L03 declarada |
| 1a · Fidelidad geométrica | **Pasa**, 0,000 px |
| 1b · Fidelidad de tinta | **Pasa**, 0,000 px |
| 1c · Cobertura | **Corrida sobre 30** · mediana 100,0 %, mínimo 81,8 % · criterio de regresión contra la línea base |
| 1d · Parsimonia | **Corrida sobre 30** · mediana 98,9 %, mínimo 68,1 % · criterio de regresión contra la línea base |
| 1e · Catálogo de fallas | **Parcial** · cinco modos contados sobre las 30, dos pendientes |
| 2 · Esquema | **Pasa**, 10/10 · falta moverlo al orquestador |
| 3 · Calibración | **Corrido en G1, G2 y G7** sobre 24 páginas · G2 usa 4 niveles de 5; G1 y G7 usan 2 · G3–G6 sin piloto hasta M3 |
| 4 · Casos dorados | Falta |
| 5–9 · Mediciones | No corridas, dependen de las anteriores |
| 10 · Reproducibilidad | Falta |

Los niveles 0, 0b, 1a, 1b, 2 se re-corrieron el 10 de septiembre antes de escribir este
resumen; 1c, 1d y 1e se leen de `captures/_metricas.json` y de los `meta.json` de esa misma
fecha. Ningún estado de esta tabla está copiado de una corrida anterior.
