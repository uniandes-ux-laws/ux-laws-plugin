# Respuesta a los cuatro puntos, y lo que sigue

13 de septiembre de 2026.

## Punto 1: no era un fantasma, son dos copias del LaTeX

`SELLO-CORPUS-v1.md` **sí** está, en la línea 8 de `chapters/14-study-design.tex`, pero en
**otra copia** del documento: la que vive en el contenedor de la sesión de Cowork, no en
`~/git/trabajo-de-grado`. Verificado línea por línea:

```
chapters/14-study-design.tex:8:\pendiente{el manifiesto, el hash del sello y la fecha.
                                Ya existen: corpus/SELLO-CORPUS-v1.md}
```

Que en tu copia no esté significa que **las dos copias llevan divergiendo desde antes de hoy**,
y la divergencia ya es en las dos direcciones:

| | Copia de la sesión | `~/git/trabajo-de-grado` |
|---|---|---|
| `11-capture.tex` §Coverage | vieja, sin reescribir | **reescrita por ti hoy** |
| `06-objectives.tex` §Ethics | **datos del comité escritos hoy** | `\pendiente` vacío |
| `14-study-design.tex` línea 8 | marcador con `SELLO-CORPUS-v1.md` | marcador sin ruta |

Tenías razón en que poner el LaTeX bajo git es más urgente que cualquier punto de la revisión,
y esto lo demuestra: **el hallazgo 1 de la revisión era real y era, además, un síntoma.**

**Resolución, y no hay que discutirla:** la copia de `~/git/trabajo-de-grado` es la canónica,
porque está en disco y es la que va a git. La copia de la sesión no vuelve a editarse. Lo único
que tiene de más va abajo como parche, y con eso queda saldada.

### Lo que hay que hacer, en este orden

1. `git init` en `~/git/trabajo-de-grado`, `.gitignore` con los intermedios de LaTeX
   (`*.aux *.log *.out *.toc *.fls *.fdb_latexmk *.bbl *.blg`) pero **no** con `main.pdf` si
   quieren versionar el PDF entregado. Commit inicial con lo que hay hoy.
2. Aplicar el parche de ética de abajo.
3. Push al repo `trabajo-de-grado` de la organización, que ya existe y está vacío.

### Parche de ética

En `chapters/06-objectives.tex`, sección `Ethical Considerations`, sustituir el `\pendiente`
—`fecha real de radicación ante el comité y estado actual de la solicitud`— por este texto,
que sale de la captura del sistema del comité y no de ninguna reconstrucción:

```latex
The application was filed on 2 September 2026 under reference \texttt{CEI-1147-26}, in the
name of David Hern\'andez Asaf, Facultad de Ingenier\'ia, under the title of this work. As of
13 September 2026 it is in the state \emph{Revisi\'on Profesional VIC}: no committee
representative and no VIC professional have yet been assigned, and no approval or rejection
date has been issued. That state is recorded here as of the stated date and not as a final
outcome.
```

El párrafo siguiente —el de las dos consecuencias, cumplimiento y cronograma— no se toca.

---

## Punto 3: la respuesta correcta era esa, y ahora hay que escribirla

Que el historial no lo pueda reconstruir **es el resultado**, no un fracaso de la
investigación. Un solo commit `e248697` con la corrección ya dentro, la versión vieja de
`ajenos` nunca versionada, y la tabla de 21/3 entrando como prosa en ese mismo commit:
entonces los dos cambios **no son separables del registro**, y eso hay que decirlo en el
capítulo en vez de insinuar que sí lo son.

Añadir a `chapters/14-study-design.tex`, al final de la subsección `Rewriting, Once`:

> Two changes to the instrument fall between the two runs, and only one of them was the
> rewrite. The operational definition of the C1 separation condition was also corrected:
> `g_out` had been measured against any external node of the tree, so on a dense page some
> wrapper or text always touched the group, `g_out` was zero, and the ratio could not reach
> 1.5 by construction. It was corrected to measure against the elements of other first-level
> groups. That correction is admissible under the single-adjustment rule --- it is a
> demonstrated defect in a definition and not a threshold moved to reshape a distribution ---
> but it was committed together with the rewrite, in a single commit, and the pre-correction
> implementation was never under version control. **The two changes therefore cannot be
> attributed separately from the record.** The distribution reported before the rewrite
> already includes the C1 correction; what the record cannot support is a claim about how much
> of G1's movement each change produced. This is recorded as a limitation of the pilot's audit
> trail, and it is the reason every subsequent change to a rubric is committed on its own.

Y en `docs/piloto-calibracion.md`, la frase «G1 pasó de 24 páginas en 0 a 23» hay que acotarla
igual: dice el efecto conjunto, no el de la corrección sola.

**Y la lección operativa, que vale más que el párrafo:** un cambio a una rúbrica, un commit.
Nunca dos en el mismo. Ponlo en `CLAUDE.md`.

---

## Punto 4: las cifras están bien, pero cobertura tiene techo y hay que declararlo

Cobertura **mediana 100,0 %**. Con el filtro de ≥ 90 % del viewport ya puesto, una mediana en
el máximo exacto significa que **al menos la mitad de las páginas están en el tope de la
escala**: la métrica no discrimina en su mitad superior. Discrimina abajo —81,8 · 86,3 · 91,1—
y ahí es útil, pero entre una página buena y una excelente no distingue nada.

Es el mismo patrón que G1 en el piloto, y por eso no se arregla moviendo el umbral de tinta
hasta que la mediana baje: **eso sería medir la voluntad de quien ajusta**, exactamente lo que
prohíbe la regla del ajuste único. Lo que se hace es declararlo:

- Reportar cobertura **con su mediana y su mínimo**, nunca solo la mediana. La mediana sola
  dice 100 % y sugiere una precisión que la métrica no tiene.
- Decir en el capítulo que **cobertura es una prueba de piso, no una escala**: detecta que se
  perdió algo visible, y no ordena wireframes buenos entre sí. Parsimonia sí ordena —mediana
  98,9 %, mínimo 68,1 %, y los cinco peores repartidos— y es la que sirve para comparar.
- Las páginas del tope no son un hallazgo positivo. Son el rango donde la métrica calla.

Con eso el capítulo puede usar las cifras sin afirmar de más, que era el riesgo del
`\pendiente` original.

---

## Tus tres preguntas

- **`docs/REVISION-COHERENCIA-13SEP.md` se queda en el repo.** Commitearlo fue lo correcto:
  es el registro fechado de qué se revisó y qué se encontró, y un trabajo que presume de
  declarar sus defectos no esconde el documento que los lista. Igual el
  `docs/MENSAJE-CASOS-DORADOS.md`.
- **El archivo sin versionar va.** Si es la copia local del mismo documento, `git add` y
  adentro; si es un duplicado del que ya commiteaste, bórralo en vez de versionar dos copias
  del mismo texto.
- **Sobre haber commiteado sin preguntar:** está bien y no hace falta avisar cada vez. Lo que
  sí hace falta es no usar `git add -A` a ciegas: recoge lo que esté suelto en el árbol, y
  algún día lo que esté suelto va a ser una captura descartada o un `node_modules` mal
  ignorado. `git add` por ruta.

---

## Ya está hecho, no lo rehagas

Dos archivos del repo ya están editados desde la sesión, así que hazles `git add` y déjalos
como están:

- `shared/decisiones.md` — la decisión 1 gana una **cláusula de alcance** fechada: gobierna el
  panel de referencia, no los casos dorados, que se puntúan en el canal que ve la skill.
  Sin esa cláusula la decisión prohibía literalmente lo que la plantilla `esperados-*.csv`
  pide, con su columna `canal` en `wireframe` en 60 de 70 filas.
- `docs/casos-dorados.md` — «acuerdo humano» pasa a «acuerdo **entre los autores del
  instrumento**», con la razón, y se añade que no se puntúa la URL en vivo sino la captura
  sellada.
