# Casos dorados · diseño y estado

12 de septiembre de 2026. Nivel 4 del plan de pruebas. **Las capturas están listas; los niveles
esperados los escriben los tres estudiantes y todavía no están escritos.**

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
único dato de acuerdo humano disponible antes del comité de ética.

Cada evaluador mira la captura en `dorados/<id>/` —`screenshot.png` y `wireframe.png`— y la
rúbrica del grupo. **Puede mirar `measurements.json` si quiere**, y si lo hace conviene que lo
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

## Estado

| | |
|---|---|
| Universo declarado | ✅ 57 páginas —48 iniciales, más 9 URLs de paso verificadas— sha256 en el registro |
| Muestreo con semilla | ✅ `20260912`, reproducible |
| Diez capturas | ✅ las diez pasan el control de sanidad |
| `measurements.json` | ✅ diez, válidos contra su esquema |
| Sello del conjunto | ✅ `08d4088679ec…` · 10 páginas, 40 archivos · `npm run seal:dorados:verify` |
| Plantillas de los tres | ✅ creadas, **70 filas, cero celdas rellenas** |
| Niveles individuales | ⬜ los escriben David, Mateo y Juan Francisco |
| Consenso | ⬜ después de los tres individuales |
| Desacuerdo inicial | ⬜ `npm run dorados:acuerdo` |
| Corrida de las skills | ⬜ fase 5 |
