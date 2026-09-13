# Casos dorados · mensaje al equipo y qué mandarles

---

## Antes de mandar nada: dos cosas que hay que arreglar primero

**1. La plantilla les pide puntuar el wireframe, y la decisión 1 lo prohíbe.**

`esperados-*.csv` tiene una columna `canal` que dice `wireframe` en 60 de las 70 filas y
`screenshot` en 10 (las de G4). `shared/decisiones.md` decisión 1, congelada, dice: «Los
evaluadores humanos puntúan la página renderizada, **nunca** el wireframe».

Tal como está escrita, la decisión 1 prohíbe exactamente lo que la fase de casos dorados
necesita. **No es un error de diseño, es una cláusula de alcance que falta.** Son dos cosas
distintas y la decisión las mete en el mismo saco:

- **El panel de referencia** (los cuatro evaluadores externos, después del comité) produce el
  *ground truth*. Ahí la decisión 1 manda: página renderizada, siempre, porque el juicio
  experto tiene que ser sobre la interfaz y no sobre un artefacto intermedio nuestro.
- **Los casos dorados** (ustedes tres, ahora) no son ground truth: son una prueba del
  instrumento. Ahí el evaluador tiene que ver **lo mismo que ve la skill**, o un desacuerdo no
  se puede interpretar —no se sabría si la skill juzgó mal o si simplemente vio otra cosa—.

Antes de que ellos llenen una sola celda, la decisión 1 necesita esa cláusula: *aplica al
panel de referencia; los casos dorados se puntúan en el canal que la skill ve, y eso los hace
una prueba del instrumento y no evidencia de validez*. Si no, el documento tiene una frase que
contradice el archivo que ellos están llenando, y es de las que un jurado encuentra.

**2. El acuerdo entre ustedes tres no es acuerdo humano, es acuerdo entre autores.**

`docs/casos-dorados.md` lo llama «el único dato de acuerdo humano disponible antes del comité
de ética». Esa frase hay que cambiarla. Ustedes tres escribieron las rúbricas. Que coincidan
mide **si el texto de la rúbrica es inequívoco para gente que ya sabe qué quiso decir**, que es
información útil y es una razón legítima para hacer este ejercicio. No mide que el instrumento
coincida con el juicio experto, que es otra cosa y llega con el panel.

Llamarlo «acuerdo entre los autores del instrumento» en los documentos y **nunca reportarlo en
la misma tabla que el del panel**. Si esas dos cifras aparecen juntas, se leen como
comparables y no lo son.

---

## El mensaje

> Parceros, arranca la fase de casos dorados y es lo único que está bloqueando el avance.
> Les explico rápido qué es y qué necesito.
>
> Tenemos 10 páginas capturadas y selladas, y 7 grupos de constructo. Cada uno de nosotros
> tres escribe, **por separado y sin ver el de los otros dos**, qué nivel de 0 a 4 debería
> sacar cada página en cada grupo. Son 70 filas. Después nos sentamos los tres y sacamos una
> versión de consenso.
>
> **Para qué sirve:** cuando corramos las skills, comparamos lo que sacó el sistema contra lo
> que pusimos nosotros. Si el sistema se aleja, sabemos que el problema está en la skill y no
> en la página. Sin esto no tenemos con qué comparar nada hasta que salga el comité de ética,
> y eso puede demorarse.
>
> **Cada uno llena su archivo:**
> - Mateo → `dorados/esperados-mateo.csv`
> - Juanfra → `dorados/esperados-juanfrancisco.csv`
> - Yo → `dorados/esperados-david.csv`
>
> Tres columnas por fila: `nivel_esperado` (0 a 4, o `NA` si la rúbrica declara que no
> aplica, y en ese caso poner cuál es la condición), `trigger_esperado` (el identificador que
> la rúbrica nombra) y `justificacion` (una o dos frases, qué viste que te hizo poner ese
> nivel).
>
> **Cuatro reglas, y estas sí no son negociables:**
>
> 1. **No abran el CSV de otro hasta que los tres estén completos.** El desacuerdo inicial es
>    el dato. Si uno mira el del otro primero, se pierde y no se recupera.
> 2. **No abran la URL en vivo.** Las páginas ya cambiaron. Puntúen la captura que está en
>    `dorados/<id>/`, que es la que el sistema va a ver. Si puntúan la página de hoy y el
>    sistema puntúa la de anteayer, la comparación no significa nada.
> 3. **Miren la representación que dice la columna `canal`.** Si dice `wireframe`, puntúen
>    sobre `wireframe.png`; si dice `screenshot`, sobre `screenshot.png`. La idea es ver lo
>    mismo que ve la skill.
> 4. **Pueden abrir `measurements.json` si quieren**, pero si lo hacen anótenlo en la
>    justificación. El sistema siempre lo ve, entonces es una diferencia de condiciones que
>    hay que dejar escrita.
>
> **Un aviso:** no traten de adivinar qué va a responder el sistema. Lo que queremos es qué
> nivel creen ustedes que merece la página según la rúbrica. Si les parece que la rúbrica está
> mal escrita o que no se puede decidir con lo que se ve, **escríbanlo en la justificación en
> vez de forzar un número**. Eso es justamente uno de los resultados que buscamos.
>
> Necesito los tres individuales **completos el [FECHA]**, para que alcancemos a sacar el de
> consenso antes del avance con Camilo el 24. Cuando estén los tres corro `npm run
> dorados:acuerdo` y vemos en qué grupos nos peleamos, que ahí es donde la rúbrica está floja.
>
> Cualquier duda de una rúbrica me escriben antes de llenar, no después.

*(Pon la fecha: si quieres consenso antes del 24, los individuales tienen que estar a más
tardar el miércoles 17.)*

---

## Qué mandarles

### Opción buena: que clonen el repo

Los dos están en la organización. Es lo correcto, porque garantiza que puntúan las capturas
selladas y no unas sueltas que se desincronizan.

```
git clone https://github.com/uniandes-ux-laws/ux-laws-plugin.git
cd ux-laws-plugin
npm run seal:dorados:verify     # confirma que las 10 capturas están intactas
```

Y les dices: tu archivo es `dorados/esperados-<tu nombre>.csv`, las capturas están en
`dorados/U03/` … `dorados/U63/`, y las rúbricas en `skills/*/SKILL.md`.

**Ojo:** lo que está en `main` hoy incluye los arreglos que Claude Code está haciendo. Diles
que clonen **después** de que él termine y haga push, no antes, o van a trabajar sobre
capturas que se re-sellaron.

### Opción de respaldo: mandarles un ZIP

Si alguno no quiere pelear con git, un ZIP por persona con exactamente esto y nada más:

| Qué | Ruta | Por qué |
|---|---|---|
| Su archivo, solo el suyo | `dorados/esperados-mateo.csv` | Si le mandas los cuatro, la regla 1 se rompe sola |
| Las 10 capturas | `dorados/U03/` … `dorados/U63/` (10 carpetas) | Es lo que puntúan |
| Las siete rúbricas | `docs/apendice-rubricas.docx` | Es la versión legible; el `.md` también sirve |
| La escala | `shared/escala.md` | Los niveles 0–4, la escala de tolerancia y la regla de combinación. Sin esto el 3 y el 4 no se distinguen |
| Las instrucciones | `docs/casos-dorados.md`, sección «Lo que escriben los tres, y cómo» | Para que no dependan de acordarse del mensaje |

**No les mandes** `esperados-consenso.csv` ni el CSV del otro. El de consenso lo abren los tres
juntos y solo cuando los tres individuales estén completos.

Cada carpeta `dorados/<id>/` trae `screenshot.png`, `wireframe.png`, `nodes.json`,
`meta.json` y `measurements.json`. Mándalas completas: si les quitas `measurements.json` les
estás quitando una opción que el diseño les da a propósito.
