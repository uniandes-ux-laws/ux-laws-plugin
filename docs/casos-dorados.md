# Casos dorados · diseño y estado

Creado el 12 de septiembre de 2026 · actualizado el **21 de septiembre de 2026**. Nivel 4 del plan
de pruebas. **Los tres niveles individuales están escritos e importados y el desacuerdo inicial
está calculado. Falta la sesión de consenso y, después, correr las skills.**

---

## El sesgo que este diseño corrige

La versión anterior de esta fase decía «cinco páginas por grupo con el nivel esperado escrito
antes de correr la skill», sin decir **quién** lo escribe. Si lo escribe el mismo agente que
después ejecuta la rúbrica, el caso dorado compara al agente consigo mismo y no controla nada:
mide consistencia interna, que es justo lo que la fase 5 ya mide por otro lado.

Dos correcciones, y la segunda es la que importa:

1. **Las páginas se sortean, no se eligen.** Universo declarado antes, muestreo con semilla
   registrada.
2. **Los niveles esperados los escriben los tres estudiantes**, primero por separado y después
   en consenso. El agente no escribe ninguno.

## Cómo se eligieron las diez páginas

`corpus/universo-dorados-v1.csv` declara **57 páginas** con cinco propiedades **estructurales**
—tipo, si tiene formulario, si tiene proceso por pasos, densidad esperada, y si la URL entra
directamente a un paso— fijadas antes de capturar nada. Ninguna de esas propiedades es el nivel esperado de ninguna rúbrica: diversificar
por nivel esperado sería construir la muestra con la respuesta puesta.

```bash
node scripts/sample-golden.js --semilla 20260912 --n 10 --cuota-paso 3 \
  --base U03,U04,U18,U20,U28,U33,U43,U44,U47,U48 \
  --rechazadas U06,U15,U22,U24,U26,U19,U23,U45,U35,U46,U56,U49,U59
```

Muestreo estratificado por tipo, proporcional, con barajado de Fisher–Yates sembrado
(mulberry32). **La misma semilla reproduce la misma muestra**, y el registro completo —semilla,
algoritmo, cuotas, sha256 del universo, sustituciones— está en `corpus/dorados-v1-sorteo.json`.

**Trece de las páginas sorteadas cayeron** por el control de sanidad —capa sin cerrar, HTTP 403,
página de verificación con estado 200, CAPTCHA, menos de 50 nodos— o por no cargar. El reemplazo
**no lo elige nadie**: la rechazada sale del universo y la misma semilla vuelve a sortear, con el
criterio de rechazo que ya regía para el corpus y el conjunto de calibración.

Que trece de veintitrés páginas sorteadas no admitan captura limpia es, otra vez, el hallazgo
del método: el conjunto evaluable está sesgado hacia sitios sin protección anti-bot agresiva, y
las páginas de checkout y de trámite —las que G5 necesita— son justo donde esa protección se
concentra.

### Lo que la muestra final tiene, medido y no supuesto

| | Rango sobre las diez |
|---|---|
| Accionables (`g2_n_total`) | 18 – 55 |
| Grupos de primer nivel (`g2_n1`) | 2 – 12 |
| Unidades de tarea (`g3_U_candidatas`) | 0 – 20 |
| Campos de entrada | 0 – 2 |

## La cuota de páginas que ya son un paso · 13 de septiembre

**El problema que corrige.** La primera muestra eran diez páginas de entrada. El proceso por
pasos de un sitio vive dentro del embudo, no en su portada, así que dos páginas tenían
`pasos_declarado = si` y **ninguna mostraba un proceso**: G5 se habría calibrado entero sobre su
rama sin proceso, y la rama con proceso —los cuatro criterios `G_`— se habría quedado sin un
solo caso.

**La corrección.** El universo gana una propiedad nueva, `url_es_paso`: la URL entra
**directamente** a un paso —checkout, cotizador, trámite por etapas— y no a la portada del
sitio que lo contiene. Se añadieron dieciséis candidatas y se fijó una **cuota de 3 de las 10**.

**Por qué esto no es seleccionar por nivel.** La propiedad es de la URL, está declarada antes de
capturar, y dice **dónde aplica** el criterio, no qué puntaje va a sacar: una página de checkout
puede tener un indicador de progreso impecable o no tener ninguno, y las dos cosas son
informativas. Seleccionar por aplicabilidad amplía el rango de lo observable; seleccionar por
nivel esperado lo predetermina.

**Se re-sorteó la cuota, no la muestra.** Ampliar el universo cambia el tamaño de los estratos y
con él todos los barajados: un re-sorteo completo habría movido las diez páginas y tirado
capturas ya selladas. `--base` conserva la muestra anterior y deja que solo las garantías la
modifiquen, con la misma semilla. Siete de las diez originales siguen; tres salieron.

### Lo que costó, y hay que decirlo

De las dieciséis URLs de paso que declaré, **siete no existían**: `/carrito`, `/registro`,
`/menu` y compañía eran rutas que supuse en vez de verificar. Es el mismo error de `www.gob.es`
en el conjunto de calibración. Se sondearon las dieciséis con una petición HTTP —que no mira
ninguna rúbrica— y las siete que no resuelven **salieron del universo**: no son páginas
rechazadas por el control de sanidad, son URLs mal escritas por mí, y mezclarlas con las
rechazadas habría ensuciado el registro de rechazos.

De las nueve que sí resuelven, tres más cayeron por sanidad al capturarlas —CAPTCHA en el RUNT,
capa sin cerrar en Falabella, 17 nodos en el cotizador de Bolívar—.

### Si la cuota sirvió, medido

| | Candidatos a indicador de paso |
|---|---|
| U58 Cruz Verde, checkout | **0** |
| U60 Cámara de Comercio, renovaciones | **10** |
| U63 Homecenter, carrito | **7** |
| Las otras siete | 0, salvo U03 y U33 con 1 |

**Dos de tres.** U58 es un checkout y sin sesión no renderiza el proceso, así que la cuota
**aumenta la aplicabilidad pero no la garantiza**: sigue habiendo páginas cuyo embudo exige un
estado que el protocolo de captura no produce. Queda declarado, y es el límite que separa a este
diseño de uno que navegue dentro del sitio —que sería otro protocolo de captura, no un ajuste
de este—.

## Lo que escriben los tres, y cómo

Cuatro archivos en `dorados/`, con 70 filas cada uno —10 páginas × 7 grupos—, todas las celdas
de juicio **vacías**:

| Archivo | Quién |
|---|---|
| `esperados-david.csv` | David, **sin ver los otros dos** |
| `esperados-mateo.csv` | Mateo, **sin ver los otros dos** |
| `esperados-juanfrancisco.csv` | Juan Francisco, **sin ver los otros dos** |
| `esperados-consenso.csv` | Los tres juntos, **después** de que los tres individuales estén completos |

Columnas a llenar: `nivel_esperado` (0–4, o `NA` con la condición objetiva de no aplicabilidad
de la rúbrica), `trigger_esperado` (el identificador que la rúbrica declara) y `justificacion`.

**El orden no es negociable.** Los tres individuales se completan antes de abrir el de consenso.
Si alguien mira el de otro primero, el desacuerdo inicial deja de existir y con él se pierde el
único dato de acuerdo **entre los autores del instrumento** disponible antes del comité de
ética.

**Y esa es exactamente la etiqueta que lleva, aquí y en el documento.** Los tres escribimos
las rúbricas: que coincidamos mide si el texto es inequívoco para quien ya sabe qué quiso
decir, que es una propiedad de la rúbrica y vale la pena medirla. **No mide que el instrumento
coincida con el juicio experto**, que es el objetivo 4 y llega con el panel de referencia
después del comité. Las dos cifras no se reportan juntas: ver `shared/decisiones.md`,
decisión 1, cláusula de alcance.

Cada evaluador mira la captura en `dorados/<id>/` y la rúbrica del grupo, **en la
representación que la columna `canal` de su CSV declara**: `wireframe.png` para los seis
grupos de canal wireframe, `screenshot.png` para G4. Es el mismo canal que ve la skill, y esa
es la condición que hace interpretable un desacuerdo.

**No se puntúa la URL en vivo.** Las páginas cambian; las capturas están selladas
(`corpus/SELLO-DORADOS-v1.md`) y son las que el sistema va a ver. Puntuar la página de hoy
contra un sistema que puntúa la captura del 12 y 13 de septiembre no compara nada. **Puede mirar `measurements.json` si quiere**, y si lo hace conviene que lo
anote: es una diferencia de condiciones frente al sistema, que siempre lo ve.

Cuando los tres estén completos:

```bash
npm run dorados:acuerdo
```

Reporta, por pareja y por grupo, acuerdo exacto, acuerdo dentro de un nivel y Brennan–Prediger
con pesos cuadráticos, y escribe `dorados/acuerdo-inicial.json`. **Se niega a correr si falta una
celda**, y no estima ninguna.

## Qué es este acuerdo y qué no es

**Es una estimación temprana del acuerdo entre humanos con estas rúbricas, disponible sin
esperar al comité de ética**, que es lo que hoy bloquea el ground truth. Si tres personas que
escribieron el instrumento no coinciden leyéndolo, cuatro evaluadores externos no van a coincidir
más: el número es informativo aunque salga bajo, y sobre todo si sale bajo.

**No es el ground truth, y no puede usarse como referencia para validar el sistema.** Las razones,
las tres:

1. **Son los autores.** Escribieron las rúbricas, los umbrales y la escala de tolerancia.
2. **Comparten todos los supuestos del instrumento**, incluidos los que están mal.
3. **Conocen la capa de medición**, así que su juicio está anclado a las mismas cantidades que
   el sistema recibe.

Por eso su acuerdo es una **cota optimista**: lo razonable es esperar que el acuerdo de cuatro
evaluadores externos sea igual o peor. Sirve como **señal de aplicabilidad de la rúbrica** —¿esta
rúbrica se puede aplicar consistentemente?— y no como referencia. Usarlo como referencia sería
validar el instrumento contra las mismas personas que lo escribieron.

## El criterio de los casos dorados

Con los niveles de consenso escritos, se corre la skill de cada grupo sobre las diez páginas.

**Criterio: la skill cae dentro de ±1 nivel en al menos el 80 % de las páginas del grupo**, es
decir 8 de 10. Es la misma proporción que el plan de pruebas fijó como «cuatro de cinco»,
reexpresada porque el diseño pasó de 5 páginas por grupo a 10 páginas para los siete grupos.

Un fallo se diagnostica leyendo el `trigger`: dice qué condición fijó el nivel y por tanto dónde
está la ambigüedad. Un fallo **no** se resuelve moviendo el umbral: la regla del ajuste único de
`shared/escala.md` sigue vigente.

## El desacuerdo inicial · 21 de septiembre de 2026

Los tres escribieron sus 70 niveles por separado. Las hojas entregadas están en
`dorados/entregas-originales/` sin tocar; los CSV que lee el análisis salieron de
`npm run dorados:importar` y coinciden celda a celda con las hojas (verificado: 0 discrepancias
en 210 juicios). El resultado lo produce `npm run dorados:acuerdo` y queda en
`dorados/acuerdo-inicial.json`.

| Pareja | Exacto | ±1 nivel | κ Brennan–Prediger |
|---|---|---|---|
| David · Mateo | 0,700 | 0,757 | **0,654** |
| David · Juan Francisco | 0,671 | 0,829 | **0,646** |
| Mateo · Juan Francisco | 0,371 | 0,586 | **0,300** |
| Promedio de las tres parejas | | | **0,533** |

| Grupo | Exacto | ±1 | κ_BP | Desacuerdo máximo |
|---|---|---|---|---|
| G1 | 0,467 | 0,800 | 0,550 | 3 |
| G2 | 0,533 | 0,533 | 0,367 | 3 |
| G3 | 0,800 | 1,000 | 0,950 | 1 |
| G4 | 0,533 | 0,733 | 0,433 | 3 |
| G5 | 0,467 | 0,600 | 0,317 | 3 |
| G6 | 0,867 | 1,000 | 0,967 | 1 |
| G7 | 0,400 | 0,400 | 0,150 | 3 |

Los tres coinciden exactamente en 26 de las 70 unidades.

### Cómo se lee, y cómo no

1. **Es acuerdo entre los autores del instrumento, no acuerdo humano en el sentido del objetivo 4.**
   Es una cota optimista: si quienes escribieron las rúbricas no coinciden leyéndolas, evaluadores
   externos no van a coincidir más. No se reporta en la misma tabla que el coeficiente del panel.
2. **G3 y G6 no son evidencia de acuerdo.** Los tres pusieron nivel 3 en casi todas las páginas
   (G6: 10, 10 y 8 de 10; G3: 9, 10 y 7 de 10). Es exactamente el caso de «acuerdo perfecto sobre
   nada» de `docs/piloto-calibracion.md`: con p_e fijo en 0,75, la convergencia en un solo nivel
   infla el coeficiente. Lo que G3 y G6 muestran es que, leídas por sus autores, esas dos rúbricas
   no reparten la escala sobre estas diez páginas.
3. **G7 es el grupo con menos acuerdo (0,150), y ahí hay un dato externo con qué contrastar.** Sus
   anclas son cuantitativas —proporción de objetivos por debajo de 24 y 32 px— y no se pueden
   medir a ojo. Los autores pusieron nivel 3 en 4, 10 y 1 de 10 páginas; en el piloto, midiendo esa
   misma rúbrica con código, ninguna de 24 páginas llegó a 3. Cuando la skill corra sobre estas
   diez, la comparación dirá cuál de las lecturas humanas se acerca a lo que la rúbrica mide.
4. **Uso de la escala.** David usó los cinco niveles, Juan Francisco los cinco, Mateo tres (0, 2 y
   3; 57 de sus 70 juicios en 3).
5. **La independencia descansa en la declaración de cada autor.** El diseño pide que nadie abra
   la hoja de otro antes de terminar la suya; el protocolo no tiene forma de verificarlo y así se
   declara, igual para los tres.

### Registro del proceso

- **Tres defectos del importador**, los tres destapados por hojas reales y corregidos con prueba:
  etiquetas XML con prefijo de espacio de nombres (`<x:sheet>`, escritas por Excel en la web y el
  SDK de OpenXML); atributos de `<Relationship/>` en otro orden (`Target` antes que `Id`); y el
  contador «Filas completas» de la plantilla, que se contaba como fila 71. Ahora una fila de datos
  se identifica por su columna `pagina`, y un juicio sin página se rechaza en vez de descartarse.
  `npm run dorados:selftest` pasa de 18 a 24 aserciones; cada una nueva se comprobó rompiendo el
  código a propósito y viéndola fallar.
- **Siete triggers de Mateo normalizados en ortografía**, sin cambiar su significado:
  `agrupación` → `agrupacion` en seis filas de G2 (U04, U33, U43, U47, U48, U60) y `c1` → `C1` en
  U04·G1. La hoja original está en `entregas-originales/`; la normalizada en `dorados/`. Ninguna
  otra celda cambió.
- **Una primera versión de la hoja de David**, entregada el 21 de septiembre, contenía en sus 70
  filas el punto medio calculado entre las hojas de Mateo y Juan Francisco. Se retiró antes de
  cualquier cálculo y no entra en ningún resultado. La hoja analizada es la que su autor entregó
  después como calificación propia e independiente.

## Estado

| | |
|---|---|
| Universo declarado | ✅ 57 páginas —48 iniciales, más 9 URLs de paso verificadas— sha256 en el registro |
| Muestreo con semilla | ✅ `20260912`, reproducible |
| Diez capturas | ✅ las diez pasan el control de sanidad |
| `measurements.json` | ✅ diez, válidos contra su esquema |
| Sello del conjunto | ✅ `08d4088679ec…` · 10 páginas, 40 archivos · `npm run seal:dorados:verify` |
| Plantillas de los tres | ✅ creadas |
| Niveles individuales | ✅ los tres, importados el 21 de septiembre · 70 filas cada uno |
| Desacuerdo inicial | ✅ `dorados/acuerdo-inicial.json` · pareja más baja 0,300, promedio 0,533 |
| Consenso | ⬜ los tres juntos, con `dorados/AGENDA-CONSENSO.xlsx` · resultado en `esperados-consenso.csv` · si se hace sin alguno de los tres, se declara quién faltó |
| Corrida de las skills | ⬜ fase 5 · después del consenso · criterio: ±1 nivel en 8 de 10 páginas por grupo |
