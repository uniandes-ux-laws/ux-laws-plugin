# Registro de decisiones sobre el corpus

Todo cambio al manifiesto queda acá con su fecha y su razón. Un corpus que cambia sin
registro no se puede sellar: el sello certifica *qué* páginas se evaluaron, y eso incluye
por qué unas entraron y otras salieron.

---

## 2026-09-10 · Se fija el user agent

**Qué.** La captura pasa a usar un user agent de Chrome normal y locale `es-CO`, en vez del
que Chromium anuncia en modo headless.

**Por qué.** Con el user agent por defecto, nueve de las treinta páginas devolvieron 403, 500,
o un 200 con la página vacía. Ocho de las nueve cargan completas con un user agent de Chrome.
Lo que el WAF bloqueaba era la etiqueta, no la petición. El locale acompaña porque el corpus
es colombiano y lo que se evalúa es la página que se le sirve a un usuario colombiano.

**Consecuencia.** Se recapturaron las treinta, no las nueve. Un corpus capturado con dos
configuraciones distintas no es un corpus: cualquier diferencia entre estratos podría venir de
que unas páginas se sirvieron a un navegador y otras a otro.

**Evidencia.** `captures/_probe.json`, corrida del 2026-09-10.

## 2026-09-10 · Se añade control de sanidad

**Qué.** Cada captura se marca cuando el estado HTTP no es 200, cuando tiene menos de 50 nodos
retenidos, o cuando el título o el texto visible contienen señales de página de bloqueo.

**Por qué.** EPS Sanitas devolvió **HTTP 200** con una página de CAPTCHA de Radware. Sin el
control, esa página entraba al corpus como "una página muy simple" y contaminaba los
resultados sin que nadie lo notara. El umbral de conteo la atrapó por un solo nodo —49 contra
50—, lo cual es suerte y no diseño; por eso el control busca además el texto del bloqueo, que
no depende de cuántos nodos tenga.

**Umbral.** 50 nodos retenidos es convención de este proyecto, fijada con los datos de la
primera corrida: las páginas bloqueadas quedaron entre 10 y 37 nodos, y la más escueta de las
que sí cargaron quedó en 208.

## 2026-09-10 · Dos reemplazos por bloqueo

| Sale | Entra | Razón |
|---|---|---|
| H09 EPS Sanitas | **H09 EPS Famisanar** | CAPTCHA de Radware Bot Manager, HTTP 200. Famisanar es EPS de régimen contributivo, el análogo más cercano; mantiene el estrato en 5 entidades estatales y 5 no estatales |
| L04 Avianca | **L04 Wingo** | HTTP 403 con los dos user agents. LATAM Colombia y Despegar también dan 403; Wingo es la única aerolínea con operación colombiana que carga |

**Lo que no se hizo y por qué.** No se resolvieron CAPTCHAs ni se añadieron técnicas de
evasión más allá de un user agent honesto. Un conjunto de datos construido esquivando
controles de acceso es un problema en un trabajo de grado, y el protocolo declarado ante el
comité de ética no lo contempla.

## Amenaza a la validez que estos reemplazos introducen

**El corpus queda seleccionado, en parte, por ser capturable.** Los sitios con protección
anti-bot agresiva quedan sistemáticamente fuera, y no hay razón para creer que esa protección
esté repartida al azar: tiende a concentrarse en sitios de alto tráfico y comerciales. Los
resultados describen, entonces, páginas colombianas *que admiten evaluación automatizada*, que
es un conjunto más estrecho que "páginas colombianas".

Se declara en las limitaciones del documento. Dos de treinta es el tamaño observado del
efecto y se reporta como tal.

**Y es un hallazgo con valor propio:** que dos de treinta sitios colombianos bloqueen por
completo la evaluación automatizada dice algo sobre la viabilidad del método en producción, no
solo sobre este corpus.

## 2026-09-10 · Descarte de interstitials

**El problema.** La captura se tomaba apenas cargaba la página, y varias de las treinta
presentaban en ese momento una capa fija que tapaba la pantalla: muros de cookies, solicitudes
de ubicación, avisos promocionales. Con eso, G1 mide la geometría del muro y G3 cuenta sus
botones. En gov.co, la mitad superior de la captura era un modal de ubicación.

**Cuántas, exactamente: seis.** G01, G04, H09, H10, L03 y L07, que entre las seis encadenan
siete capas porque L03 trae dos. La cifra sale del campo `consent` de los treinta `meta.json`
de la corrida sellada del 2026-09-10 —sello `f9c0caaaa2ea…`—, medida con el detector
`medirOverlay` de `capture/dismiss.js`, el que exige `elementFromPoint` además de la geometría.

**Corrección del 2026-09-10.** Esta entrada y el encabezado de `capture/dismiss.js` decían
**nueve**, por dos errores acumulados: la tabla del sondeo de la que salía la cifra tenía ocho
páginas con capa al 100 %, no nueve; y ese sondeo corrió antes del cambio de user agent —con
nueve páginas devolviendo 403 o 500, que es de donde viene el nueve— y con un detector que aún
no probaba `elementFromPoint`, de modo que contaba como muro cualquier capa fija y grande
aunque no tapara nada. Se corrigen las dos y queda escrito de dónde sale la cifra nueva: una
cifra sin procedencia sobrevive a los cambios que la invalidan, que es exactamente lo que pasó
con esta.

**Por qué no se dejó así.** El argumento decisivo no es estético sino de reproducibilidad:
si el sitio recuerda el consentimiento, la siguiente captura devuelve otra página. Un corpus
sellado cuyo contenido depende del estado de cookies del navegador no está sellado.

**Por qué no se cierra a mano.** Tampoco sería reproducible, y el lector que instale el
plugin no va a repetir esos clics. Lo que el protocolo no puede describir como regla no puede
ser parte del método.

**Qué se descarta y qué no.** Solo interstitials: capas que se interponen *antes* de la
página y que el usuario atraviesa una vez. No se toca nada que forme parte del diseño de la
pantalla —encabezados fijos, navegación pegajosa, chats acoplados a una esquina, banners
dentro del flujo—, porque eso es justamente la interfaz que se evalúa y G3 puntúa
explícitamente si un encabezado permanece fijo.

La distinción es operativa: una capa entra al procedimiento solo si cubre al menos la mitad
del viewport, o se declara `role="dialog"`, o es una franja fija cuyo texto menciona cookies,
consentimiento o privacidad. Y solo se cierra si además ofrece un control que esté en el
catálogo.

**El catálogo es cerrado y fechado: versión 2026-09-10.** Igual que el de convenciones de G6.
Cada entrada nueva lleva su fecha y se registra acá. Un catálogo que crece en silencio
mientras se mide es una intervención no declarada. En particular, **no se persiguió el DOM de
cada sitio hasta encontrar su selector**: eso produce un catálogo hecho a la medida de estas
treinta páginas, que es exactamente la intervención no reproducible que se está evitando.

**Decisión declarada: se acepta, no se rechaza.** Rechazar cookies deja a varios sitios en un
estado degradado —sin mapas, sin video, sin recomendaciones— que no es el que ve un usuario
corriente.

### Resultado sobre el corpus

| | |
|---|---|
| Páginas con interstitial detectado | **6 de 30** |
| Resueltas por completo | **5** |
| Resisten al catálogo | **1** — L03 Éxito, capa del 100 % |

Reglas que dispararon: `aria-label*="close"` (2), `aria-label*="cerrar"` (1), `close` (1),
texto «acepto» (1), texto «entendido» (1).

**L03 Éxito queda declarada.** Su modal publicitario tiene un backdrop que cubre toda la
pantalla y un control de cierre que el catálogo no reconoce. La captura se conserva, la
página queda marcada por el control de sanidad, y su puntaje se leerá con esa advertencia.
No se amplió el catálogo a la medida de ese sitio.

### Dos defectos del propio procedimiento, corregidos el mismo día

**Falsos positivos.** El detector marcaba como overlay cualquier elemento `fixed` de área
grande. El menú lateral oculto de Wingo (`div.dropdown-mobile`, 95 % del viewport) cumplía la
condición con la página intacta. La prueba dejó de ser geométrica y pasó a ser de
comportamiento: se consulta `elementFromPoint` en cinco puntos y la capa cuenta solo si es
ella —o un descendiente— lo que responde arriba. Un detector que marca páginas buenas hace
tanto daño como uno que deja pasar las malas.

**Bucle de reglas.** En Éxito, el backdrop cubre toda la pantalla, así que todos los botones
de la página se solapan con él y el procedimiento pulsaba tres veces el mismo botón de
cookies mientras el modal seguía intacto. Una regla ya aplicada no se repite en la misma
página.

### Amenaza a la validez que esto introduce

El procedimiento decide, por una regla escrita de antemano, qué parte de lo que el usuario ve
al entrar **no** es la interfaz. Esa decisión es defendible y está declarada, pero es una
decisión: un usuario real sí se encuentra el muro. Lo que se evalúa es la página *después*
del consentimiento, y el documento debe decirlo con esas palabras.

La bandera `--keep-interstitials` conserva el comportamiento anterior, de modo que la
diferencia entre puntuar con muro y sin muro es medible sobre las mismas páginas. Entra al
protocolo como una ablación más, junto a la de la caja de tinta.

### Hallazgo metodológico

Ninguna de las tres métricas automáticas detectó este problema. La fidelidad geométrica, la
cobertura y la parsimonia estaban las tres en verde mientras gov.co medía un modal de
ubicación. **Las métricas verifican que la representación sea fiel a la página que se
capturó; ninguna verifica que se haya capturado la página correcta.** Lo encontró una persona
mirando las treinta capturas juntas. Va al capítulo de la capa de captura y a las amenazas.

## 2026-09-10 · Se repara la forma del manifiesto antes de sellarlo

**Qué.** Siete filas del CSV —L03, L05, L06, L07, L08, L09, L10— tenían siete campos en vez
de ocho: la nota había quedado en la columna `capture_date`. Un lector que cargara el
manifiesto por posición leía `e-commerce` como fecha de captura. Se movió cada nota a su
columna y se dejó `capture_date` vacía para volver a llenarla del `meta.json`.

**Por qué se registra.** No cambia qué páginas entran ni qué se midió: cambia la forma del
archivo, y el archivo se va a hashear. Un manifiesto sellado con las columnas corridas
certifica un error.

**Cómo apareció.** Sellando. El script exige ocho columnas por fila y se detuvo en L03.

## 2026-09-10 · Se registra la fecha de captura y se sella el corpus v1

**Qué.** La columna `capture_date` se llenó desde el `capturedAt` de cada `meta.json`: las
treinta páginas se capturaron el **2026-09-10**, entre las 23:15:58 y las 23:19:46 UTC. La
fecha es la UTC de la captura, no la hora local de Bogotá, y así queda declarado.

**El sello.** `corpus/SELLO-v1.md` y `corpus/SELLO-v1.json`, generados por
`scripts/seal-corpus.js`, el 2026-09-11T00:09:58Z —las 19:09 del 10 de septiembre en Bogotá—.
Todas las marcas de tiempo del sello están en UTC y por eso la fecha que imprime es la del 11;
el trabajo y la captura son del 10 hora local. Hash del sello:

```
f9c0caaaa2eaec7793860e46c0bf78530489877af1e33a5ac417ee8490933437
```

Certifica tres cosas que se suelen confundir: *qué páginas* —el sha256 del manifiesto—, *qué
se capturó de ellas* —el sha256 de los cuatro artefactos de cada página, 120 archivos— y *en
qué condiciones* —Chromium 153.0.8010.12, viewport 1440×900 a escala 1, modo `perceptual`,
catálogo de descarte 2026-09-10, un solo user agent para las treinta—.

**Por qué no bastaba con hashear el CSV.** Un manifiesto de URLs no dice nada sobre lo que se
midió: la misma URL sirve una página distinta cada semana. Lo que el análisis va a leer son
los bytes de las capturas, y eso es lo que el sello fija.

**Certificación cruzada.** El sello recalcula el sha256 de cada `screenshot.png` y cada
`wireframe.png` y lo compara contra el que la propia captura guardó en su `meta.json`. Si un
PNG se reemplaza después de capturarlo, `npm run seal:verify` lo dice y sale con código 1.

**Controles negativos, corridos el mismo día.** Un byte añadido a `captures/L09/nodes.json`
hace fallar la verificación nombrando el archivo; un `sha256` alterado dentro de un
`meta.json` hace fallar la certificación cruzada nombrando la página. Un verificador que
nunca falla no verifica nada.

**Lo que el sello declara sucio.** Interstitial cerrado por el catálogo en G01, G04, H09, H10,
L03 y L07. Capa sin cerrar en **L03**, que además falla el control de sanidad. El sello nombra
esas páginas en vez de esconderlas: el puntaje de L03 se lee con la advertencia puesta.

**Finales de línea.** Se añadió `.gitattributes` fijando LF para los `.json` de `captures/` y
para el CSV, y el árbol de trabajo se volvió a extraer con esa regla. Sin eso, un clon en
Windows con `core.autocrlf` activo reescribe los bytes y el sello no verifica en la máquina de
otra persona, que es justo lo que el sello existe para permitir. El hash de los archivos de
texto se calcula además con CRLF normalizado a LF, de modo que el número no dependa de la
plataforma ni de la configuración de git.

**Qué desbloquea.** M2. Falta el piloto de calibración y el protocolo fechado.
