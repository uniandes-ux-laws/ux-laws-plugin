# Fichas de procedencia de las dieciocho leyes

Esqueleto creado el 14 de septiembre de 2026. **Ninguna ficha está abierta todavía.**

Este archivo es la **fuente única del capítulo 8 del documento de tesis**. El capítulo no se
escribe a mano: se genera desde aquí con

```bash
npm run procedencia                       # -> docs/capitulo-08-procedencia.tex
npm run procedencia -- --out ~/git/trabajo-de-grado/chapters/08-provenance.tex
```

igual que el apéndice de rúbricas se genera desde los `SKILL.md`. La razón es la misma que
allá y no es comodidad: una copia editable aparte deriva, y entonces el documento afirma una
procedencia que las fichas no sostienen. Si una ficha está vacía, el capítulo sale con el
hueco visible y rojo. Eso es correcto. Un párrafo inventado que suena bien es peor.

---

## Cómo se abre una ficha

**Las escriben los tres estudiantes, no el agente.** Cada ley tiene un responsable asignado
—el mismo de `docs/contexto/02-ESPECIFICACION-LEYES.md`— y esa persona abre su ficha.

**En inglés.** El texto de los seis campos de contenido entra *literalmente* en el capítulo,
que está en inglés. Los nombres de los campos están en español porque son etiquetas de este
archivo; su contenido no.

**El contenido es LaTeX y pasa sin tocar.** El generador copia el texto de los seis campos tal
cual al `.tex`, sin escapar nada, porque las citas van como `\citet{wertheimer1923untersuchungen}`
contra las claves de `references.bib`. Lo que eso implica: `%`, `&`, `_` y `#` hay que
escribirlos escapados (`\%`, `\&`, `\_`, `\#`) o el capítulo no compila. La alternativa
—escapar automáticamente— haría imposible citar, que es lo único que este capítulo hace.

**Con la fuente abierta.** La regla del proyecto es que ninguna cita se escribe de memoria.
`fuente primaria` lleva la cita completa más DOI o URL, y `verificación` lleva quién la abrió
y en qué fecha. Una ficha con `hallazgo y condiciones` lleno y `verificación` vacío no es una
ficha: es una afirmación sin respaldo, y el generador la trata como incompleta.

**`lawsofux.com` no va nunca en `fuente primaria`.** Es divulgación, y su sitio es
`formulación divulgativa`, que es justamente el campo que existe para separarla del hallazgo.

### Los seis campos de contenido

| Campo | Qué va | Qué NO va |
|---|---|---|
| `fuente primaria` | Cita completa: autores, año, título, publicación, volumen, páginas, DOI o URL | Una fuente secundaria que cita a la primaria sin haberla abierto |
| `verificación` | Quién abrió el documento y cuándo (`JF · 2026-09-20`) | La fecha en que se copió la cita de otro lado |
| `hallazgo y condiciones` | Qué mide el experimento, con qué participantes, con qué tarea, y el efecto reportado con su magnitud | La conclusión que el hallazgo *sugiere* para interfaces |
| `formulación divulgativa` | Cómo lo enuncia la literatura de divulgación, citando dónde | Una paráfrasis nuestra del hallazgo |
| `operacionalización` | Qué mide nuestra rúbrica, en qué canal, contra qué umbral | La ley; esto es lo que el código hace |
| `salto declarado` | La distancia entre el hallazgo y nuestra rúbrica, dicha sin suavizar | «la operacionalización es fiel al hallazgo» si no lo es |

### Las tres sin publicación primaria

Jakob, Tesler y la Navaja de Occam aplicada a interfaz llevan `sin_publicacion_primaria: sí`
desde ya, antes de que nadie abra la ficha. No es un resultado de la búsqueda: es lo que ya
está verificado y escrito en `docs/contexto/02-ESPECIFICACION-LEYES.md` §G6. En esas tres,
`fuente primaria` se abre **declarando la ausencia** y diciendo qué se usó en su lugar —una
entrevista, un artículo de industria, un principio filosófico del siglo XIV—, no poniendo una
referencia plausible. El generador les emite una sección propia en el capítulo.

---

## Secciones de capítulo

Estas tres no son de una ley sino del capítulo entero, y también salen de aquí.

### por qué se separan las tres capas

Three things are kept apart throughout this chapter, and the separation is a requirement of
validity rather than an editorial convention. The first is the \textbf{original empirical
finding} together with the conditions under which it was obtained: the task, the participants,
the stimuli and the reported effect. The second is the \textbf{popularised formulation}, which
compresses that finding into a sentence and generalises it to interfaces. The third is
\textbf{our operationalisation}: the observable criterion by which a specific screen is scored.

Collapsing them is what allows an instrument to inherit an authority its measurements do not
have. If the popularised sentence is treated as the finding, a rubric can cite a 1952
reaction-time experiment on ten lamps as warrant for a threshold on menu items, and the citation
will look impeccable while supporting nothing. The verification recorded in the entries below
produced several instances in which the first layer and the second point in opposite directions,
and one --- Hick's law --- in which the primary source, read literally, argues against the design
rule that invokes it.

The separation also fixes where the burden of proof sits. A primary source can establish that a
phenomenon exists; it cannot establish that our criterion detects it. That second claim is what
the agreement study against expert judgment is for, and no citation substitutes for it.

### las seis categorías de distancia

The distance between an original finding and a criterion applied to a screen is not of one kind.
Six recur across the eighteen entries, and naming them is what makes the gap in each entry
reviewable rather than rhetorical.

\begin{description}[leftmargin=1.2cm,style=nextline]
  \item[The finding does not support the principle] The popular rule is not entailed by the
    result, and may be contradicted by it. Hick's law is the clearest case: the source concerns a
    reaction-time function over equiprobable meaningless alternatives, and
    \citet{liu2020relevant} show that taken seriously it favours presenting more options rather
    than fewer.
  \item[The popular reading distorts the finding] The result is real but is restated as something
    else. Miller's paper reviews three separate literatures and warns explicitly against merging
    them; the popular version merges them and drops his conclusion that multidimensional encoding
    raises capacity to roughly 150 categories.
  \item[The finding comes from another domain] The phenomenon was established on material with no
    interface in it. Von Restorff's isolation effect is memory for a paired associate in a
    homogeneous list, and the goal-gradient effect was first measured in rats approaching food.
  \item[The finding holds only under conditions an interface does not create] The result is sound
    within its paradigm and the paradigm is absent from the object we score. Serial position was
    measured on a list presented sequentially and then withdrawn; a screen presents everything at
    once and withdraws nothing. Cognitive load is defined relative to a learner and a learning
    task, neither of which exists in a screenshot.
  \item[No primary publication exists] The principle is an industry heuristic. Jakob's law is a
    practitioner column, Tesler's law an aphorism on a personal website, and Occam's razor a
    maxim about theory choice whose standard Latin phrasing is not even Ockham's
    \citep{thorburn1918myth}.
  \item[The source is cited through a secondary one] The primary document was not read, and the
    entry says so. Von Restorff (1933) is reported here through \citet{hunt1995subtlety}, and both
    Hull papers are recorded with unverified metadata.
\end{description}

A seventh case appeared during verification and belongs with these: a primary source that is
often cited as experimental and is not. \citet{palmer1992common} reports demonstrations, and the
objective evidence for common region lies in \citet{palmerbeck2007rdt}.

### las tres entradas sin publicación primaria

Three of the eighteen have no empirical publication behind them, and the absence is declared here
rather than covered with a plausible reference.

\textbf{Jakob's law} appears in an Alertbox column of 22 July 2000 \citep{nielsen2000end}, which
presents no study, sample or measurement; its author confirms that he formulated it there. The
only measured support located is grey literature from his own consultancy.

\textbf{Tesler's law} was never published. Larry Tesler dates his own formulation to
approximately 1984 on his personal website \citep{tesler1984complexity}, and it reaches print
through an interview in a practitioner book. As stated, invoking an ``inherent, irreducible''
complexity with no independent operational definition, it is not falsifiable.

\textbf{Occam's razor} is a principle of theory choice, and its application to interfaces is an
analogy. No empirical study testing it in an HCI context was located, at the scope of the search
recorded with this document. The formulation usually quoted is moreover not Ockham's:
\citet{thorburn1918myth} traces it to John Ponce of Cork in 1639.

What was done instead, in all three cases, is the same. The heuristic is named as a heuristic;
the real source of the \emph{formulation} is cited as a source of formulation and not as
evidence; and the empirical claim underneath it is supported, where a literature exists, by work
that measures something adjacent. For conformance to familiar conventions and for visual
economy that literature is \citet{tuch2012visual} and \citet{reinecke2013predicting}, both of
which obtain human judgments over static screenshots, which is the modality this work uses.
These three groups therefore carry a weaker warrant than the other fifteen, and the results
chapter reports them as such.

---

## L01 · Proximidad — Law of Proximity

grupo: G1
responsable: D
sin_publicacion_primaria: no

### fuente primaria

Wertheimer, M. (1923). Untersuchungen zur Lehre von der Gestalt II. \emph{Psychologische Forschung} 4(1), 301--350, doi:10.1007/BF00410640 \citep{wertheimer1923untersuchungen}. Read in the English translation by Ellis (1938), \emph{A source book of Gestalt psychology}, pp. 71--88; the German original was not opened.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} Ellis translation read in full; German original paywalled and not consulted. Methodological characterisation cross-checked against \citet{wagemans2012century}, read in full.

### hallazgo y condiciones

This is a demonstration paper, not a controlled experiment. It reports no participants, no manipulated variable, no dependent measure and no statistics. Wertheimer presents arrays of dots and line figures and asks the reader to observe what is seen: ``We are interested here in what is actually \emph{seen}.'' The proximity claim is stated as ``That form of grouping is most natural which involves the smallest interval \ldots{} the predominant influence of what we may call \emph{The Factor of Proximity}.'' \citet{wagemans2012century} record that the movement was ``severely criticized for offering mere demonstrations, using either very simple or confounded stimuli.'' The first objective response-time evidence for proximity grouping is later, in the repetition-discrimination task of \citet{palmerbeck2007rdt}.

### formulación divulgativa

The popular formulation states that objects near each other are perceived as a group \citep{yablonski2024laws}. This generalises a perceptual demonstration over abstract marks into a design rule over meaningful interface elements.

### operacionalización

G1 computes, over the \texttt{ink} boxes of \texttt{nodes.json}, the ratio $r = g_{\text{out}}/g_{\text{in}}$ between the gap separating a first-level group from the elements of other first-level groups and the gaps inside it. Condition C1 fails for a group whose $r < 1.5$; the denominator is the set of first-level groups with more than one element. The level is set by the proportion of groups affected, through the tolerance scale of Section~\ref{ss:tolerance}.

### salto declarado

Wertheimer establishes that a proximity grouping tendency exists in simple visual arrays. He does not establish any function relating distance to grouping strength, any threshold, or any claim about interfaces. The ratio 1.5 is a convention of this project, dated and declared, and its validity rests on the human reference study and not on the source. One point runs in our favour and is worth stating: Wertheimer's demonstrations are deliberately stripped of colour, typography and semantics, which is an argument for evaluating this law on the wireframe rather than against it.

---

## L02 · Prägnanz — Law of Prägnanz

grupo: G1
responsable: M
sin_publicacion_primaria: no

### fuente primaria

The concept appears in \citet{wertheimer1923untersuchungen}; the canonical English formulation is Koffka, K. (1935), \emph{Principles of Gestalt psychology}, p. 110 \citep{koffka1935principles}: ``psychological organization will always be as `good' as the prevailing conditions allow.''

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} \textbf{Partial.} Koffka p.~110 was not read directly: only chapter~1 of the available scan loaded. The wording and page are taken from \citet{vangeert2023pragnanz}, which was read in full. Treat as second-hand until a physical copy is checked.

### hallazgo y condiciones

There is no finding. Pr\"agnanz is a theoretical postulate, not an empirical result, and it is stated at a level of generality that makes it unfalsifiable as written. \citet{wagemans2012century} render it: ``the perceptual field and objects within it will take on the simplest and most encompassing structure permitted by the given conditions.'' Neither Wertheimer nor Koffka defines ``good'' or ``simplest'' independently of the perceptual outcome; Koffka's own scare quotes around ``good'' are an admission of the circularity.

### formulación divulgativa

The popular formulation states that people perceive ambiguous or complex images as the simplest form possible \citep{yablonski2024laws}.

### operacionalización

G1 scores structural regularity rather than simplicity: condition C3 marks a first-level block whose left edge does not fall on one of the four most frequent alignment axes of the screen, or whose width is not one of the three most frequent widths. The denominator is the set of first-level blocks.

### salto declarado

This is the weakest of the eighteen and the gap is the largest in the instrument. Because the source defines simplicity only by its outcome, it predicts nothing in advance, and any 0--4 rubric measures the definition of regularity this project stipulates rather than Pr\"agnanz. It is also the entry most exposed to double counting: structural regularity correlates with what C1, C2 and C4 already measure. A note on attribution: the term \emph{Pr\"agnanz der Gestalt} predates the 1923 paper, being traced by \citet{vangeert2023pragnanz} to Schumann (1914), so it must not be described as coined there.

---

## L03 · Región común — Law of Common Region

grupo: G1
responsable: JF
sin_publicacion_primaria: no

### fuente primaria

Palmer, S. E. (1992). Common region: a new principle of perceptual grouping. \emph{Cognitive Psychology} 24(3), 436--447, doi:10.1016/0010-0285(92)90014-S \citep{palmer1992common}. The experimental evidence is not in that paper but in \citet{palmerbeck2007rdt}: Palmer \& Beck (2007), \emph{Perception \& Psychophysics} 69(1), 68--78, doi:10.3758/BF03194454.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} \textbf{Partial.} Neither Palmer (1992) nor Palmer \& Beck (2007) could be opened in full text; both abstracts were read verbatim, and the characterisation below is corroborated by \citet{palmer2002grouping} and \citet{wagemans2012century}, both read in full.

### hallazgo y condiciones

Palmer (1992) is a demonstration paper. Its own abstract reads ``\emph{Demonstrations} analogous to Wertheimer's original displays show that this factor strongly influences perceived grouping'', never uses the words experiment, participants or significant, and reports no figures; Palmer himself later describes them as ``recent demonstrations from my own laboratory'' \citep{palmer2002grouping}. Its substantive claim is that a shared bounded region can override proximity and similarity when the three conflict. The objective evidence comes from the repetition discrimination task of \citet{palmerbeck2007rdt}, where observers reported the shape of a repeated element faster when the repeated shapes fell inside the same surrounding region; five experiments are reported, whose participant numbers and effect sizes this project has not verified.

### formulación divulgativa

The popular formulation states that elements sharing a clearly defined boundary are perceived as a group \citep{yablonski2024laws}.

### operacionalización

G1 condition C2 marks an element whose \texttt{ink} box extends outside the \texttt{ink} box of its visible container. The denominator is the set of elements that have a visible boundary of their own and sit inside a visible container. Visibility is decided by the \texttt{visibleBoundary} field of \texttt{nodes.json}, which records whether a node paints a border, a background or a shadow, and not by the layout box.

### salto declarado

This is the best supported of the four Gestalt entries, and the override claim is directly relevant to interfaces, where cards and panels routinely fight raw spatial distance. Two limits remain. The 1992 demonstrations used abstract marks inside ovals, not interfaces. And the operationalisation measures containment failure, which is a necessary condition for the cue to work but not the cue itself. Note for the bibliography: \citet{palmer1994rethinking} must not be cited here. It concerns uniform connectedness, which Palmer and Rock argue explicitly is not a form of grouping at all.

---

## L04 · Similitud — Law of Similarity

grupo: G1
responsable: JF
sin_publicacion_primaria: no

### fuente primaria

\citet{wertheimer1923untersuchungen}, same source and same method as Proximity. Read in the Ellis (1938) translation; the German original was not opened.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} Ellis translation read in full. The list of demonstrated dimensions is corroborated by \citet{wagemans2012century}.

### hallazgo y condiciones

A demonstration in the same paper, by the same method and with the same absence of participants, measurement and statistics. Wertheimer's statement, in Ellis's translation: ``The tendency of like parts to band together --- which we may call \emph{The Factor of Similarity}.'' \citet{wagemans2012century} record that the dimensions he varied were \textbf{colour, size and orientation}.

### formulación divulgativa

The popular formulation states that the eye perceives similar elements as a group even when they are separated \citep{yablonski2024laws}, and routinely extends similarity to function or component type.

### operacionalización

G1 condition C4 marks an element whose set of equivalents contains a member diverging in height or alignment. An equivalent set is defined operationally as elements sharing \texttt{nodeName} and \texttt{parentId}; the denominator is the set of equivalent sets with two or more members.

### salto declarado

Two gaps, and the second is a defect this work has already recorded. First, the source demonstrates low-level featural similarity over meaningless marks, and one of its three dimensions is \textbf{colour, which the wireframe abstracts away}; the wireframe evaluation therefore covers a strict subset of the construct, and the screenshot channel would be required to cover the rest. Second, the operational definition of an equivalent set marks any two sibling containers as equivalent when they have no reason to share a height. That is a demonstrated candidate defect in the definition, and Section~\ref{ss:g1-cost} records why it may not be corrected by inspecting the distribution it produces.

---

## L05 · Ley de Hick — Hick's Law

grupo: G2
responsable: D
sin_publicacion_primaria: no

### fuente primaria

Hick, W. E. (1952). On the rate of gain of information. \emph{Quarterly Journal of Experimental Psychology} 4(1), 11--26, doi:10.1080/17470215208416600 \citep{hick1952rate}. Reviewed by \citet{proctor2018hicks}; its relevance to interaction is assessed by \citet{liu2020relevant}.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} Hick (1952) read in full from a scanned copy; \citet{liu2020relevant} read in full; \citet{proctor2018hicks} abstract only. Hyman (1953) was not opened and no detail is attributed to it here.

### hallazgo y condiciones

Ten pea lamps were arranged ``in a somewhat irregular circle'', placed close enough together ``to obviate the need for eye movements''; the participant's ten fingers rested on ten Morse keys and pressed the key corresponding to the lit lamp, with two to ten alternatives active. \textbf{Experiment~I had one participant, Hick himself}: ``The experimenter acted as subject'', after more than 8{,}000 practice reactions; Experiment~II had two. Stimuli were equiprobable by construction. The fitted form is $RT = b\log(n+1)$, and Hick justified the added unit as the entropy contributed by the possibility of no stimulus. He concluded that the rate of gain of information is roughly constant at about five bits per second. \citet{liu2020relevant} show that a logarithmic fit to interaction data does not by itself indicate Hick's law, since visual search and scrolling produce logarithms of their own.

### formulación divulgativa

The popular formulation states that the time to decide grows with the number and complexity of choices, and is used to justify limiting the number of options presented \citep{yablonski2024laws}.

### operacionalización

G2 scores the architecture of the alternatives and \textbf{sets no threshold on their number}. The code reports $n_{\text{total}}$, $n_1$ and $n_{\max}$ as raw measurements: the count of actionable elements, the count of first-level groups, and the largest group. The agent judges whether the alternatives are grouped, whether a dominant action is distinguishable by visual weight and relative size, and whether comparison supports are present. The \texttt{trigger} field names which of these set the level.

### salto declarado

Every boundary condition of the source is violated by a web page: menu items are not equiprobable, they carry meaning, they require visual search and pointing that the apparatus deliberately excluded, and the measurement came from one extremely practised participant. More decisively, \citet{liu2020relevant} conclude that ``Hick's law speaks against, not for, the popular principle that `less is better' '', since the law taken seriously favours presenting more items rather than fewer. Citing Hick as the authority for a limit on menu items is therefore not defensible, and this instrument does not do so. The thresholds that do appear are declared conventions of this project, and the source is cited for the finding rather than for the design rule.

---

## L06 · Sobrecarga de elección — Choice Overload

grupo: G2
responsable: M
sin_publicacion_primaria: no

### fuente primaria

Iyengar, S. S., \& Lepper, M. R. (2000). When choice is demotivating: can one desire too much of a good thing? \emph{Journal of Personality and Social Psychology} 79(6), 995--1006, doi:10.1037/0022-3514.79.6.995 \citep{iyengar2000choice}. Replication status: Scheibehenne, B., Greifeneder, R., \& Todd, P. M. (2010), \emph{Journal of Consumer Research} 37(3), 409--425, doi:10.1086/651235 \citep{scheibehenne2010ever}.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} Both read in full text.

### hallazgo y condiciones

Study~1 was a field study at a supermarket on two consecutive Saturdays, with 6 or 24 jam flavours on a tasting display. Of 242 customers passing the extensive display, 60\,\% (145) stopped; of 260 passing the limited display, 40\,\% (104) stopped. Of those who stopped, 30\,\% (31) bought in the limited condition against 3\,\% (4) in the extensive one, $\chi^2(1, N = 249) = 32.34$, $p < .0001$. Note the direction of the attention effect: \textbf{the larger assortment attracted more people}. Study~2 offered 197 undergraduates 6 or 30 essay topics, with 74\,\% against 60\,\% completion. Study~3 offered 134 students 6 or 30 chocolates. The meta-analysis of \citet{scheibehenne2010ever} covers 50 experiments, 63 conditions and 5{,}036 participants and reports an overall effect of $D = 0.02$, 95\,\% CI $[-0.09, 0.12]$: ``the overall effect size in the meta-analysis was virtually zero'', with ``a slight publication bias in favor of choice overload results''.

### formulación divulgativa

The popular formulation states that too many options impair the ability to decide \citep{yablonski2024laws}.

### operacionalización

G2 does not score the number of options. It scores the presence of decision support: whether filters, sorting, defaults, a recommended option or a comparison table are available when the screen presents a set of alternatives. The condition is named \texttt{Ap} and is emitted by reading the screenshot, which is recorded as one of the twelve criteria that depend on text.

### salto declarado

The effect is contested, and this document does not present it as established. The operational decision to score decision support rather than option count was taken before the meta-analysis was consulted, and the verification turns it from a convenience into a deliberate response to a failed replication. Two further limits: even taken at face value the original concerns purchase and satisfaction with physical assortments rather than the visual quality of a layout, and the jam study is a single-site field study across two Saturdays with unequal and non-randomised foot traffic. A later meta-analysis by Chernev and colleagues, and a published re-analysis of \citet{scheibehenne2010ever}, were not consulted; the state of this debate is therefore reported as unsettled in both directions rather than as resolved.

---

## L07 · Ley de Miller — Miller's Law

grupo: G3
responsable: JF
sin_publicacion_primaria: no

### fuente primaria

Miller, G. A. (1956). The magical number seven, plus or minus two: some limits on our capacity for processing information. \emph{Psychological Review} 63(2), 81--97 \citep{miller1956magical}.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} Read in full text.

### hallazgo y condiciones

The paper is a review of \textbf{three separate literatures}, and Miller warns against merging them: ``the span of absolute judgment and the span of immediate memory are quite different kinds of limitations''. For absolute judgment of unidimensional stimuli he reports channel capacities near 2.5 bits for pitch and 2.3 for loudness. For \textbf{multidimensional} stimuli capacity rises: Pollack and Ficks obtained 7.2 bits, ``about 150 different categories that could be absolutely identified without error''. The span of immediate memory is a different limit in different units, about nine for binary items and about five for monosyllabic words. His synthesis is that the number of \emph{bits} is constant for absolute judgment and the number of \emph{chunks} for immediate memory. Of the recurring integer he writes: ``I suspect that it is only a pernicious, Pythagorean coincidence.'' \citet{cowan2001magical} argues for a limit near four chunks and states that Miller's ``number was meant more as a rough estimate and a rhetorical device than as a real capacity limit''.

### formulación divulgativa

The popular formulation states that people can hold about seven items in working memory, and is used to justify limiting the number of interface elements \citep{yablonski2024laws}.

### operacionalización

G3 reports $U$, the count of first-level task units in the region, and does not compare it against seven or any other fixed number. The level is set by whether those units are segmented into coherent blocks, whether each carries its own heading, whether a datum required by a field is co-visible with it, and how much content extraneous to the task competes with it.

### salto declarado

Miller nowhere discusses interfaces, displays, menus or limiting options, and the paper contains no design recommendation of any kind. Its own argument runs against a fixed-capacity reading twice over, since multidimensional encoding raises capacity to roughly 150 categories and chunking is presented as the mechanism that stretches the bottleneck rather than a limit imposed by it. Cowan's four is lower but it is a floor obtained by deliberately preventing rehearsal, chunking and long-term support, all of which a person browsing a page has available; using it to cap interface elements is a tighter misapplication, not a more rigorous one. Its unit is chunks, and an evaluator counting rendered elements is counting features.

---

## L08 · Chunking — Chunking

grupo: G3
responsable: JF
sin_publicacion_primaria: no

### fuente primaria

\citet{miller1956magical} coins the term and gives the first demonstration through Sidney Smith's binary-digit recoding study. The stronger empirical establishment is Chase, W. G., \& Simon, H. A. (1973), Perception in chess, \emph{Cognitive Psychology} 4(1), 55--81, doi:10.1016/0010-0285(73)90004-2 \citep{chase1973perception}.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} Both read in full text.

### hallazgo y condiciones

Miller frames recoding as ``the very lifeblood of the thought processes'': the operator ``recodes the input into another code that contains fewer chunks with more bits per chunk''. Chase and Simon tested three players --- one master, one Class~A, one beginner --- on twenty real positions and eight random ones, with five seconds of exposure before reconstruction. On real middle-game positions the master placed about sixteen pieces correctly on the first trial, the Class~A player about eight and the beginner about four. \textbf{On random positions ``there was no relation at all between memory of the position and playing strength''}, and all three performed worse than the beginner had on real positions. A chunk was operationalised as a run of pieces placed with intervals shorter than two seconds, and chunk sizes were small, roughly two to three pieces.

### formulación divulgativa

The popular formulation states that grouping content into chunks makes it easier to process and remember \citep{yablonski2024laws}.

### operacionalización

G3 scores segmentation: whether the units in the task region are grouped into blocks and whether those blocks carry their own heading, detected as an \texttt{H1}--\texttt{H6} inside the unit. The \texttt{trigger} names \texttt{segmentacion} when this condition sets the level.

### salto declarado

The random-position control is the load-bearing result and it constrains this instrument directly. A real position and a random one are visually identical in element count, spatial extent and grouping geometry, so the chunking advantage is a function of \textbf{prior domain knowledge in long-term memory, not of the structure of the display}. An evaluator scoring chunking from wireframe geometry is therefore measuring perceptual grouping, which is the Gestalt construct of G1 under another name. This work declares the consequence rather than concealing it: what G3 scores here is an \emph{affordance} for chunking by a knowledgeable user, not chunking, and the overlap with G1 is a live double-counting risk that the per-group profile must be read against. Note also that the study tested three players and is a case study, not a powered experiment.

---

## L09 · Memoria de trabajo — Working Memory

grupo: G3
responsable: M
sin_publicacion_primaria: no

### fuente primaria

Baddeley, A. D., \& Hitch, G. (1974). Working memory. In G. H. Bower (Ed.), \emph{The Psychology of Learning and Motivation}, vol.~8, pp.~47--89. New York: Academic Press \citep{baddeley1974working}. Capacity estimate: Cowan, N. (2001), \emph{Behavioral and Brain Sciences} 24(1), 87--114, doi:10.1017/S0140525X01003922 \citep{cowan2001magical}.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} Both read in full text. Numbers from Table~III of Baddeley and Hitch are reported here only qualitatively, because the extraction of that table was not reliable.

### hallazgo y condiciones

Ten dual-task experiments, with participants holding digit loads of zero to six while performing grammatical reasoning, prose comprehension or free recall. The result that mattered was how small the interference was: ``a load of three items appears to have little or no decremental effect, an unexpected finding which is common to all three situations'', and disruption ``even with a near-span concurrent memory load, was far from massive''. That dissociation is what displaced the unitary short-term store. Cowan argues for ``a single, central capacity limit averaging about four chunks'', with three to five as the population average, converging from whole report of visual arrays, enumeration, multi-object tracking and mathematical modelling.

### formulación divulgativa

The popular formulation states that working memory is a limited resource and that interfaces should avoid overloading it \citep{yablonski2024laws}.

### operacionalización

G3 condition V marks a datum that a field requires but that is not co-visible with it in the captured viewport, computed over the \texttt{ink} boxes and the fixed viewport of $1440 \times 900$. The denominator is the set of input fields in the task region.

### salto declarado

Co-visibility is a defensible proxy for one antecedent of memory load --- a value that must be held while looking elsewhere --- but it is not a measurement of working memory, and no such measurement is claimed. Two cautions on the source. The 1974 chapter proposes a central executive and a \emph{phonemic response buffer}; the term \emph{articulatory loop} does not appear in it, and \textbf{the visuo-spatial sketchpad is neither named nor proposed}, being introduced by Baddeley (1986). Any claim about a visual store must not be attributed to this chapter. Cowan's four, in turn, is measured under conditions engineered to prevent the chunking and rehearsal that a page reader has available.

---

## L10 · Carga cognitiva — Cognitive Load

grupo: G3
responsable: M
sin_publicacion_primaria: no

### fuente primaria

Sweller, J. (1988). Cognitive load during problem solving: effects on learning. \emph{Cognitive Science} 12(2), 257--285, doi:10.1207/s15516709cog1202\_4 \citep{sweller1988cognitive}. Current formulation: Sweller, J., van Merri\"enboer, J. J. G., \& Paas, F. (2019), Cognitive architecture and instructional design: 20 years later, \emph{Educational Psychology Review} 31(2), 261--292, doi:10.1007/s10648-019-09465-5 \citep{sweller2019twenty}.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} Both read in full text; the 2019 quotation was confirmed verbatim against the publisher version.

### hallazgo y condiciones

The 1988 paper combines a production-system model with a dual-task study of 24 Year~10 students solving trigonometry problems, and with reanalyses in which conventionally taught groups made four to six times more errors per calculation. Its dependent variable is \textbf{schema acquisition}, that is learning, and its stated contribution is to explain ``the ineffectiveness of problem solving as a learning device''. The three-way intrinsic/extraneous/germane taxonomy is \emph{not} in it; that is Sweller, van Merri\"enboer and Paas (1998). The 2019 restatement reduces the categories to two: ``As a result of this reconceptualisation, only intrinsic and extraneous cognitive load are distinguished as basic categories of cognitive load.'' The same paper is explicit that germane load was not abolished but redefined, ``assuming that germane cognitive load has a redistributive function from extraneous to intrinsic aspects of the task rather than imposing a load in its own right''.

### formulación divulgativa

The popular formulation states that the total cognitive load imposed by an interface should be minimised \citep{yablonski2024laws}.

### operacionalización

G3 scores \textbf{extraneous load of structural origin only}, and the narrowing follows \citet{sweller2019twenty}. Condition X measures the proportion of the captured viewport occupied by content extraneous to the dominant task region. When this term sets the level, the \texttt{trigger} takes the value \texttt{carga\_extrinseca\_estructural}, which allows the frequency with which it governs the group to be counted over the corpus.

### salto declarado

This is the largest gap in the instrument after Pr\"agnanz, and it is a gap of construct rather than of precision. Cognitive load is defined relative to a task and to the prior knowledge of the person performing it. A static screenshot has \textbf{no learner, no learning objective, no schema to acquire, no problem-solving task and no post-test}, so there is no construct in the theory that the input can instantiate. What the system scores is the visual and structural complexity of the artefact, which is at best a proxy for one antecedent of extraneous load. No claim of having measured cognitive load is made, and the restriction to two categories is stated as the 2019 reconceptualisation rather than as the elimination of germane load.

---

## L11 · Efecto Von Restorff — Von Restorff Effect

grupo: G4
responsable: D
sin_publicacion_primaria: no

### fuente primaria

von Restorff, H. (1933). \"Uber die Wirkung von Bereichsbildungen im Spurenfeld. \emph{Psychologische Forschung} 18(1), 299--342, doi:10.1007/BF02409636. Read through Hunt, R. R. (1995), The subtlety of distinctiveness: what von Restorff really did, \emph{Psychonomic Bulletin \& Review} 2(1), 105--112, doi:10.3758/BF03214414 \citep{hunt1995subtlety}.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} \textbf{Partial.} \citet{hunt1995subtlety} read in full. \textbf{The 1933 original was not opened}: it is paywalled, in German, and has no authoritative published translation. Everything stated about von Restorff's own experiments is Hunt's account of them and is attributed as such.

### hallazgo y condiciones

Per Hunt, von Restorff used paired-associate lists of nine homogeneous items plus one of a different type, across many materials. Hunt's central claim is that \textbf{perceptual salience was not the mechanism}, and that von Restorff showed this herself: in two lists the isolate appeared at the second and third serial positions, ``at which point the subjects could not know anything about the contents of the whole list''. Her explanation was figure and ground: homogeneous items agglutinate into an undifferentiated ground and the isolate remains figure through dissimilarity. Hunt's own replication used 40 undergraduates. He states the target of his correction plainly: ``The mistake is to assume that perceptual salience is necessary for the isolation effect.'' The effect is relational: ``distinctiveness in the context of similarity facilitates performance more than does distinctiveness unaligned to similarity.''

### formulación divulgativa

The popular formulation states that when several similar objects are present, the one that differs most is the most likely to be remembered \citep{yablonski2024laws}, and is commonly read as a rule for making important elements visually distinct so they are noticed.

### operacionalización

G4 is the only group scored on the \textbf{screenshot} channel. It identifies sets of two or more elements presented as equivalents, and marks an isolate relative to its peers on colour, contrast and size, all extracted from the image by code. The agent decides whether the isolate is the one the section calls for. The group returns \texttt{not\_applicable} when no set of two or more equivalents exists, since without a similarity context there is nothing for distinctiveness to be relative to.

### salto declarado

Two gaps and one contradiction. The effect is a \textbf{memory} effect measured as recall of paired associates, whereas the design reading concerns what a user \emph{notices}; those are different constructs with different measures, and Hunt's argument is precisely that the salience reading is the misattribution. The effect is also \textbf{relational}, so a criterion that asks only whether a distinct element exists, without scoring the homogeneity of the field it sits against, measures the wrong thing; the rubric therefore requires a homogeneous set of equivalents as its denominator. The contradiction with Selective Attention is stated in the next entry and in Section~\ref{ss:what-resists}.

---

## L12 · Atención selectiva — Selective Attention

grupo: G4
responsable: D
sin_publicacion_primaria: no

### fuente primaria

Benway, J. P. (1998). Banner blindness: the irony of attention grabbing on the World Wide Web. \emph{Proceedings of the Human Factors and Ergonomics Society Annual Meeting} 42(5), 463--467, doi:10.1177/154193129804200504 \citep{benway1998banner}. Modern replications: Burke et al. (2005), \emph{ACM Transactions on Computer-Human Interaction} 12(4), 631--662 \citep{burke2005banner}; Ning et al. (2023), \emph{Cognitive Processing} 24(3), 313--326, doi:10.1007/s10339-023-01131-7 \citep{ning2023banner}.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} \textbf{Partial.} The companion full text by Benway and Lane was read in full; the HFES proceedings version was verified at publisher level with its abstract only. \citet{burke2005banner} read in full from a preprint, its DOI unresolved. \citet{ning2023banner} abstract only.

### hallazgo y condiciones

A pilot with six experienced professionals over 24 search tasks found the experimental banners ``about 58\,\% of the time compared to 94\,\% of the control items'', $t(5) = 2.80$, $p = .03$. The main experiment used 72 undergraduates: selection took 6.02~s when the banner was irrelevant and 5.51~s when it \emph{could have helped}, a difference that was not significant, $F(2,59) = 0.97$, $p = .38$ --- \textbf{a genuinely useful banner produced no measurable benefit}. Only 17 of 71 participants reported seeing the non-advertising banners. The authors' own recommendation runs against the isolation reading: ``perhaps a better strategy would be to \emph{increase} the perceptual grouping''. Their summary: ``One item separated visually from everything else on a web page may be completely ignored by web searchers.'' \citet{burke2005banner} confirm non-fixation with eye tracking, banners being fixated in 11.7\,\% of trials, while adding that they still cost 6.3--7.5\,\% of search time. \citet{ning2023banner} report that blindness varies with banner format and with the thematic fit between advertisement and content.

### formulación divulgativa

The popular formulation states that users filter out elements resembling advertising \citep{yablonski2024laws}.

### operacionalización

G4 condition P marks content that carries a function but is rendered in the visual idiom of advertising or chrome --- a bounded rectangular block in a peripheral position with a treatment unlike the surrounding content --- read from the screenshot. The denominator is the set of functional elements on the screen.

### salto declarado

The study is 28 years old and its stimuli are 1998 pages, so it is cited alongside its modern replications rather than alone, and \citet{ning2023banner} qualifies it substantially: blindness is not a constant property of a salient rectangle but is modulated by format and semantic fit. The more serious matter is internal. \textbf{G4 subsumes two laws that pull in opposite directions}: Von Restorff says an isolate is remembered better, Benway measured that an isolate is ignored, and Benway's own recommendation is to increase grouping rather than break it. The resolution this work adopts is that the two concern different tasks --- memory for an isolate within a homogeneous list, against visual search under a learned avoidance schema --- and it is stated here rather than left for the scores to expose. A rubric that rewarded isolation under one law and penalised it under the other would produce incoherent levels.

---

## L13 · Efecto de posición serial — Serial Position Effect

grupo: G5
responsable: M
sin_publicacion_primaria: no

### fuente primaria

Glanzer, M., \& Cunitz, A. R. (1966). Two storage mechanisms in free recall. \emph{Journal of Verbal Learning and Verbal Behavior} 5(4), 351--360, doi:10.1016/S0022-5371(66)80044-0 \citep{glanzer1966two}. The canonical free-recall curve is \citet{murdock1962serial}.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} \citet{glanzer1966two} read in full text. The issue number is the one weakly sourced field.

### hallazgo y condiciones

Experiment~1 used 240 participants and eight twenty-word lists; increasing the presentation interval raised recall across early and middle positions while leaving the terminal positions untouched. Experiment~2, the decisive one, used 46 participants and fifteen fifteen-word lists, with recall either immediate or after 10 or 30 seconds of counting aloud: ``The 10-sec delay was sufficient to remove most of the end peak. With a 30-sec delay there is no trace at all of the end peak'', while primacy was statistically unaffected. The contribution is therefore a \textbf{functional double dissociation} --- rate moves primacy only, filled delay abolishes recency only --- and not the discovery of the curve. Ebbinghaus is not the right citation for the effect as popularly stated: his paradigm was serial learning of nonsense syllables to criterion, with himself as the only participant, and he established no dissociation; Glanzer and Cunitz do not cite him.

### formulación divulgativa

The popular formulation states that users best remember the first and last items in a series \citep{yablonski2024laws}, and is used to justify placing important navigation items at the ends.

### operacionalización

G5 scores whether an ordered list marks hierarchy by position: condition \texttt{lista\_plana} marks a list of three or more sibling elements in sequence in which no positional emphasis is expressed through size, weight or spacing. The denominator is the set of such lists. G5 scores whether order is marked, not which item ought to be first.

### salto declarado

This is a \textbf{construct mismatch}, and it is more dangerous than the temporal laws excluded from version one because it is not visible as a gap. Glanzer and Cunitz measured retrieval from memory of a list that had been presented sequentially and then withdrawn. A screenshot presents every element simultaneously and persistently: there is no retention interval, nothing is recalled, and what a person does is visual search over an available display. The usual inference that critical items belong first and last is an \textbf{analogy to spatial position borrowed from a finding about temporal order}; if it holds, it holds through scanning patterns and edge salience, which have their own literature and are not cited by this source. The citation supports the existence of the memory phenomenon and does not license the spatial reading.

---

## L14 · Efecto de gradiente de meta — Goal-Gradient Effect

grupo: G5
responsable: JF
sin_publicacion_primaria: no

### fuente primaria

Hull, C. L. (1932). The goal-gradient hypothesis and maze learning. \emph{Psychological Review} 39(1), 25--43, doi:10.1037/h0072640 \citep{hull1932goal} states the hypothesis; the runway experiment is Hull, C. L. (1934), The rat's speed-of-locomotion gradient in the approach to food, \emph{Journal of Comparative Psychology} 17(3), 393--422, doi:10.1037/h0071299 \citep{hull1934rat}. Human evidence: Kivetz, R., Urminsky, O., \& Zheng, Y. (2006), \emph{Journal of Marketing Research} 43(1), 39--58, doi:10.1509/jmkr.43.1.39 \citep{kivetz2006goal}.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} \textbf{Partial.} \citet{kivetz2006goal} read in full text. \textbf{Neither Hull paper could be opened}; their volume, issue, pages and DOI come from secondary bibliography and are marked unverified. The attribution of the runway experiment to 1934 rather than 1932 follows \citet{kivetz2006goal}, who write that ``Hull (1934) constructed a straight runway with electrical contacts \ldots{} the animals ran faster the closer they were to the food reward''.

### hallazgo y condiciones

Study~1 tracked 949 completed ten-stamp loyalty cards over roughly 10{,}000 purchases: the mean difference between the first and last inter-purchase interval was 0.7 days, $t = 2.6$, $p < .05$, an acceleration of about 20\,\%. Study~2 randomly assigned 108 customers to a ten-stamp card or a twelve-stamp card with two stamps already applied --- identical real effort, different framing --- and found completion in 15.6 days against 12.7, $t = 2.0$, $p < .05$. Study~3 replicated the acceleration on a music-rating site with 148 participants. Study~4 showed that effort resets between successive cards. \textbf{Every dependent measure is a rate of change of behaviour across repeated occasions over time}; the effect is the slope.

### formulación divulgativa

The popular formulation states that the tendency to approach a goal increases with proximity to it, and that showing artificial progress accelerates completion \citep{yablonski2024laws}.

### operacionalización

\textbf{Excluded from version one.} G5 scores only whether a step indicator exists, whether it names the steps, whether it marks the current one and whether its form distinguishes completed from pending steps, under the conditions \texttt{G\_existe}, \texttt{G\_nombra}, \texttt{G\_actual} and \texttt{G\_forma}. No score is emitted for the goal-gradient effect itself.

### salto declarado

The construct has no static projection: a single screenshot has no time axis, no repeated measures and no record of prior progress, so no slope can be estimated from it. This is not a measurement difficulty that better prompting could overcome, and the verification therefore supports the scope decision as principled rather than convenient. One temptation is recorded here so that it is not taken later: the endowed-progress manipulation of Study~2 is a \textbf{visible artefact}, a card showing two of twelve, and a screenshot can score whether a progress indicator is framed as partially advanced. Scoring that artefact is legitimate; reporting it as a goal-gradient score would be a category error, substituting an observable proxy for an unobservable construct without declaring the substitution.

---

## L15 · Navaja de Occam — Occam's Razor

grupo: G6
responsable: D
sin_publicacion_primaria: sí

### fuente primaria

\textbf{No primary empirical publication exists.} The principle is a fourteenth-century methodological maxim attributed to William of Ockham. The formulation usually quoted, \emph{entia non sunt multiplicanda praeter necessitatem}, does not appear in his writings: \citet{thorburn1918myth}, Thorburn, W. M. (1918), The myth of Occam's razor, \emph{Mind} 27, 345--353, establishes this and traces the Latin formula to John Ponce of Cork (1639), who already called it \emph{illud axioma vulgare}; the English term ``Occam's razor'' first appears with Hamilton in 1852. What Ockham did write is \emph{pluralitas non est ponenda sine necessitate}. In place of the missing empirical source this work cites \citet{tuch2012visual} and \citet{reinecke2013predicting} for the visual-complexity claim.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} \citet{thorburn1918myth} read in full; its issue number and page range were not confirmed against JSTOR. \citet{tuch2012visual} read in full as an author preprint; \citet{reinecke2013predicting} abstract only, and no internal statistic of it is quoted.

### hallazgo y condiciones

There is no experiment to report, because the principle is about theory choice and not about interfaces. A search for empirical work testing the razor in an HCI context returned nothing; that is a negative search result over the scope recorded with this document and not a proof of non-existence. The substitute literature is empirical and, usefully, uses the same stimulus modality as this work. \citet{tuch2012visual} showed 119 homepage screenshots to 59 participants at exposures of 50, 500 and 1000~ms with masking, on stimuli pre-validated by 267 raters over 270 sites, and found a main effect of visual complexity on beauty ratings, $F(1.8, 99.9) = 77.607$, $p < .001$, $\eta_p^2 = .581$, surviving at 17~ms in a second study with 82 participants. \citet{reinecke2013predicting} obtained aesthetic ratings from 548 participants over 450 websites at 500~ms and predicted roughly half the variance from computational measures of visual complexity and colourfulness.

### formulación divulgativa

The popular formulation states that a design should carry no more elements than necessary \citep{yablonski2024laws}.

### operacionalización

G6 condition R marks an element that occupies space without carrying a function: a decorative block with no text, no actionable target and no informational content inside it. The denominator is the set of first-level blocks.

### salto declarado

Applying a principle of theory choice to interface elements is an \textbf{analogy}, and it does not transfer cleanly: fewer entities in an explanation and fewer elements in a screen are different claims, and the second is false past some point, since removing necessary controls degrades the interface. The razor carries its own escape clause in \emph{praeter necessitatem}, and necessity in an interface is exactly what it gives no method for deciding. This work therefore does not cite Ockham as authority for a design criterion. What the rubric scores is the presence of elements without function, and the empirical grounding offered for the underlying claim is the visual-complexity literature named above.

---

## L16 · Ley de Tesler — Tesler's Law

grupo: G6
responsable: JF
sin_publicacion_primaria: sí

### fuente primaria

\textbf{No primary empirical publication exists.} The source of the formulation is Larry Tesler's own website, where he lists it among his coinages and dates it to approximately 1984: ``Every application has an inherent amount of irreducible complexity. The only question is: Who will have to deal with it --- the user, the application developer, or the platform developer?'' \citep{tesler1984complexity}. It reaches print through an interview in Saffer's \emph{Designing for Interaction}; the edition carrying that passage was not confirmed, secondary sources disagreeing between the 2006 first edition and the 2010 second.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} Tesler's page read in full. A second page on the same site giving a longer statement is disallowed by robots and was not reached, and the Wayback copy was also unreachable. Saffer's book was not obtained.

### hallazgo y condiciones

There is no study, no sample and no measurement. The frequently quoted argument that a million users each wasting a minute a day justifies a week of engineering effort is a normative claim about where to allocate work, not a finding. As stated, the law is also \textbf{not falsifiable}: ``inherent, irreducible complexity'' has no operational definition independent of the outcome, so no observation could contradict it.

### formulación divulgativa

The popular formulation states that complexity can be moved between user and system but not removed \citep{yablonski2024laws}.

### operacionalización

G6 condition T marks work that the interface transfers to the user and that the system holds the information to do itself: a required format the user must construct, a value the user must compute from data already displayed, or a re-entry of something the screen already shows. The denominator is the set of input fields and result fields on the screen.

### salto declarado

The absence is declared rather than filled with a plausible reference. This work cites Tesler's own statement as the source of the \emph{formulation} and not as evidence for it, and does not attempt to measure inherent complexity, which the source gives no means of defining. What the rubric scores is a narrower and observable thing --- specific transfers of work that the displayed data would allow the system to absorb --- and the relationship between that proxy and Tesler's construct is an assumption of the operationalisation, not a result.

---

## L17 · Ley de Jakob — Jakob's Law

grupo: G6
responsable: M
sin_publicacion_primaria: sí

### fuente primaria

\textbf{No primary empirical publication exists.} The formulation appears in a practitioner column: Nielsen, J. (22 July 2000), \emph{End of Web Design}, Alertbox, Nielsen Norman Group \citep{nielsen2000end}: ``Users spend most of their time on \emph{other} sites. This means that users prefer your site to work the same way as all the other sites they already know.'' Nielsen confirms in a later post that he formulated the law in that column. In place of the missing empirical source this work cites \citet{tuch2012visual} for prototypicality.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} The Alertbox column read in full, as was Nielsen's later post confirming its origin. No peer-reviewed publication establishing the law was located. The article face reads 22 July 2000; some secondary sources give 23 July.

### hallazgo y condiciones

The column presents no study, no participants, no sample and no measurement; it argues from observed conventions and examples. The only measured support located is grey literature from the author's own consultancy. The empirical substitute is stronger and is screenshot-based: \citet{tuch2012visual} found that \textbf{prototypicality} --- a page's similarity to the typical exemplar of its category --- predicts aesthetic judgement with a main effect of $F(1.0, 56.0) = 241.365$, $p < .001$, $\eta_p^2 = .812$, larger than that of visual complexity, and detectable at exposures as short as 17~ms.

### formulación divulgativa

The popular formulation is the sentence quoted above, circulated as ``Jakob's Law'' \citep{yablonski2024laws}.

### operacionalización

G6 condition K scores conformance against a \textbf{closed catalogue of eight placement conventions}, dated and frozen in the rubric: logo top-left linking home; search top, centred or right; cart or account top-right; primary navigation horizontal at top or vertical at left; field label above or left of its field; primary action right in a pair of buttons; legal and contact links in the footer; breadcrumb immediately below the header. Each convention declares the condition under which it does not apply, and $K_{ap}$ counts those that do; without a closed catalogue the criterion would be an opinion.

### salto declarado

The absence is declared. Nielsen's claim concerns \emph{behavioural} outcomes --- what users prefer and how they perform --- and this instrument measures neither; it measures conformance to eight placement conventions chosen by this team. The link between conformance and the outcomes Nielsen asserts is assumed, not demonstrated, and the catalogue itself is a convention of this project with a date rather than a finding. \citet{tuch2012visual} supports a weaker and different claim: that similarity to a category prototype predicts aesthetic judgement within milliseconds.

---

## L18 · Ley de Fitts — Fitts's Law

grupo: G7
responsable: D
sin_publicacion_primaria: no

### fuente primaria

Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. \emph{Journal of Experimental Psychology} 47(6), 381--391, doi:10.1037/h0055392 \citep{fitts1954information}.

### verificación

Claude (Cowork session) \textperiodcentered{} 2026-09-14 \textperiodcentered{} Read in full text, in the verbatim APA centennial reprint of 1992, \emph{JEP: General} 121(3), 262--269. No page-specific citation is taken from the reprint.

### hallazgo y condiciones

Three experiments. Reciprocal tapping, with sixteen right-handed male undergraduates alternating between two metal plates with styluses of 1~oz and 1~lb, target widths of 2 to 0.25~inches and amplitudes of 2 to 16~inches. Disc transfer, with a further sixteen participants, amplitudes of 4 to 32~inches and tolerances of 1/16 to 1/2~inch. Pin transfer, with twenty participants, ten men and ten women. The result, verbatim: ``a binary index of difficulty (Id) is defined as $I_d = \log_2 2A/W_s$ bits/response''. Empirically, ``for each category of $W_s$, movement time increased progressively as movement amplitude increased'', and for each amplitude as tolerance decreased.

### formulación divulgativa

The popular formulation states that the time to acquire a target is a function of its distance and its size, and is used to justify minimum touch-target sizes \citep{yablonski2024laws}.

### operacionalización

G7 scores \textbf{target-size adequacy} against a declared convention and does not compute an index of difficulty. It measures over \texttt{bounds} rather than \texttt{ink}, because the clickable area is the layout box and not the visible glyphs. Four conditions: T1 marks a target whose smaller dimension is below 24~px without satisfying the spacing exception; T2 marks an adjacent pair separated by less than 8~px; T3 marks a target whose smaller dimension is below 32~px; T4 marks a target whose family differs in size by more than 2~px. Each denominator is declared in the rubric.

### salto declarado

The index of difficulty \textbf{cannot be computed from this input at all}, and the reason is stronger than previously recorded. Amplitude $A$ is the distance from the movement's starting point to the target, and a static screenshot has no cursor, no touch origin and no prior interaction state, so no starting point exists in the image. \textbf{Nor is $W$ determinate}: in Fitts's formulation $W$ is the tolerance \emph{along the axis of movement}, and that axis is fixed by the direction of $A$. Without $A$, a target of $200 \times 40$~px has no single $W$ --- it is 200~px for a horizontal approach and 40 for a vertical one --- so the capture yields a box from which a $W$ must be \emph{chosen} by declared convention, here the smaller dimension as a worst-case bound. Two further gaps: the experiments involved physical stylus movements in one dimension against mechanical targets rather than cursor or touch acquisition on a display, and the dependent variable was movement time, which this work does not measure. What is scored is therefore a size-adequacy criterion against a dated convention, and it is not a measurement of Fitts's law.
