# Propuesta formal — texto entregado

**Automated UX Evaluation of Web Interfaces through Operationalized Laws of UX**

David Hernández (202220865) · Mateo Rincón (202221402) · Juan Francisco Rodríguez (202214603)
Asesor: Camilo Escobar Velásquez · Ingeniería de Sistemas, Universidad de los Andes
Término 2026-20 · 46 páginas · 35 referencias · 0 citas sin resolver

---

**Qué es este archivo.** El texto completo de la propuesta entregada, generado desde el
LaTeX fuente (`propuesta-latex/`) y no re-escrito a mano, para que no pueda derivar del PDF.
La numeración de secciones, tablas, figuras y apéndices es la misma del PDF compilado.
El cuerpo está en inglés porque así se entregó; el resto de los documentos de esta carpeta
está en español.

**No se toca.** Una propuesta entregada es un compromiso fechado. Las correcciones
posteriores viven en el documento de tesis, no acá. Lo que sí cambia es el estado de los
`[PENDIENTE: ...]`, que se registra abajo.

**El diagrama del pipeline** (Figura 1) es TikZ en el original; acá va una versión en texto
que preserva los siete grupos, los dos canales y la vía de validación. El original está en el
PDF compilado.

## Estado de los cuatro PENDIENTE

| # | Dónde | Qué falta | Estado |
|---|---|---|---|
| 1 | §3.2.3 The Gap | Registro de la búsqueda bibliográfica: bases, cadenas exactas, idiomas, fecha de corte, criterios de inclusión, versionado junto al protocolo | Abierto. Equipo, antes de M2 |
| 2 | §6.2 Obj. 2 | Qué representación puntúa cada evaluador humano | **Resuelto después de la entrega**: los evaluadores puntúan la página renderizada, nunca el wireframe. Ver `04-DECISIONES-Y-ESCALA.md` |
| 3 | §6.4 Ethical Considerations | Fecha real de radicación ante el comité de ética y estado de la solicitud | Abierto. David con Camilo. Está en la ruta crítica de M4 |
| 4 | Apéndice A | Cuáles de las cinco entidades no estatales del estrato salud quedan cubiertas por la directiva de MinTIC, con la norma exacta | Abierto. Equipo, antes de M2 |

## Qué corrigió la revisión por pares antes de la entrega

Registrado en detalle en `08-REVISION-PARES.md`. Lo que cambió el texto de abajo:
la cita de Benway (era una quimera de dos publicaciones), la razón de exclusión de la Ley de
Conectividad Uniforme (contradecía a Palmer y Rock, su propia fuente), la descripción de la
Cruz Roja Colombiana en el corpus, el Objetivo 3 (ningún objetivo construía el plugin), el
alcance del pre-registro, las fechas de M2 y M6, y dos amenazas a la validez que faltaban.

---

# 1. Context

Interfaces are built faster than anyone can check whether they work for the people who use them. A team can ship a redesign in a sprint. Finding out whether that redesign made the product harder to use takes longer, costs more, and competes for the same budget as the next sprint.

Two families of methods address this. Empirical testing puts real users in front of the interface and observes what happens. It produces the strongest evidence at the highest cost. Inspection methods replace the users with trained evaluators who examine the interface against a set of principles. Nielsen and Molich (1990) introduced heuristic evaluation as the cheap member of the second family: a small number of evaluators inspect the interface against a short list of usability principles and report the problems they find. The method spread because it works without a lab, without participants, and without a research budget.

It still requires evaluators who know what they are looking at.

Removing that last requirement has been an open goal for twenty-five years. Ivory and Hearst (2001) surveyed 132 usability evaluation methods and classified each one by what part of the work was automated. Their axis separates capture, which records what happened; analysis, which detects patterns in the record; and critique, which says that something is a problem and suggests what to do about it. Automation concentrated in capture and analysis. Critique stayed with the human, and the tools that did attempt it worked by checking properties a parser can read: element counts, font sizes, contrast ratios, markup conformance.

That boundary held for a structural reason. Critique needs perception. Whether a button dominates the screen, whether two blocks read as one group, whether the important action is the one the eye lands on first: none of that is in the markup, and a rule engine reading the DOM cannot see it. Twenty-five years later the most widely deployed automated interface tools are still accessibility linters, and the best of them reports covering roughly 57% of accessibility issues by volume, by its own vendor’s count (Deque Systems 2026). Accessibility conformance is the part of interface quality that survives translation into machine-checkable rules.

Most of usability does not.

Multimodal language models move that boundary, and the evidence about how far is split. A benchmark over the 983 expert-annotated mobile screens of the UICrit dataset found that several frontier models reach almost perfect agreement with expert ratings on the visual dimensions of an interface and systematically overestimate the functional ones, usability, learnability and efficiency (Khalil and Rehman 2026). A separate comparison asked GPT-4o to perform heuristic evaluation against Nielsen’s ten heuristics and recovered about a fifth of the problems human specialists reported, while adding problems the specialists did not, some of them hallucinated (Guerino et al. 2026). Section 3.2 states both results with their figures.

Read together, the two results say something more specific than that models are partially reliable. The task that worked asked for a rating on a named dimension. The task that failed asked for open-ended problem discovery against a principle stated in a single sentence. Nielsen’s heuristics were written for human evaluators who supply the missing specificity out of their own training, and handing the same sentence to a model leaves that gap open.

Alongside this, design practice has converged on a second body of principles. The Laws of UX collect thirty statements drawn from experimental psychology and applied to interface design, published as a website (Yablonski 2026); ten of them are developed at length in an accompanying book (Yablonski 2024). Some of the thirty rest on published experiments with measured effects, such as Fitts’s index of difficulty for pointing or Hick’s logarithmic relation between alternatives and decision time. Others are industry heuristics that acquired the name of a law by convention. The collection is widely used as design guidance. The search recorded in Section 3.2.3 found no work turning it into a measurement instrument, and for most of the thirty the distance between the psychology experiment that produced a finding and the interface criterion claiming to apply it is not examined anywhere that search reached.

# 2. Approach to the Problem

The gap described above resolves into five specific problems that, in the work the search of Section 3.2.3 reached, no current tool addresses together.

## 2.1. Inspection Does Not Scale, and Most Teams Have No Inspector

Heuristic evaluation is cheap relative to user testing and expensive relative to nothing. It needs people who can tell a real problem from a personal preference, and the teams that most need the evaluation are the ones least likely to have such a person on staff. The result is not bad evaluation. It is no evaluation. The interface ships unexamined, and the first signal that something is wrong arrives through support tickets or abandonment.

## 2.2. Existing Automation Checks Syntax, Not Perception

The tools that run today over real interfaces check properties expressible as rules over a document: contrast ratios, alternative text, heading order, target sizes. These matter and they are not the same as usability. In the taxonomy of Ivory and Hearst (2001) they sit in analysis and not in critique, and they remain there because the perceptual judgments that usability depends on were not machine-readable. A page can pass every accessibility rule and still bury its primary action.

## 2.3. A One-Sentence Principle Underspecifies the Task

The comparison between the two results in Section 1 points at the specificity of the criterion, and neither study manipulates it. It is one of several differences between them, and Section 4 states which. “Aesthetic and minimalist design” is a complete instruction to a trained evaluator and an incomplete one to a model, which will supply the missing definition itself and produce a judgment that cannot be audited because the standard it applied was never written down. Whether a criterion stated at the level of observable conditions closes that gap is untested.

## 2.4. Static Images Bound What Is Observable, and the Boundary Is Not Respected

The UICrit benchmark locates the asymmetry. Judgments on the functional dimensions, which are the ones a static image supports least, are the ones that miss, and they miss in a specific direction, toward optimism (Khalil and Rehman 2026). That study does not contrast a static against a dynamic condition, so it does not establish the screenshot as the cause; what it establishes is that the dimensions requiring inference beyond what the image shows are where the model departs from the expert. Several of the thirty Laws of UX are explicitly temporal. The Doherty Threshold concerns system response time. The Zeigarnik Effect concerns interrupted tasks. Neither is observable in a captured image, and a system that scores them anyway produces a number with nothing behind it. The same boundary runs inside the visual channel. A law defined by color cannot be evaluated on a representation that has no color, and a law defined by geometry should not depend on one that does.

## 2.5. No Basis for Trusting a Score

Once a system emits a number for an interface, three questions decide whether that number means anything, and in the work located by the search of Section 3.2.3 none of the three is answered alongside the other two. The first is agreement: does the score correspond to what a qualified human would say about the same interface, measured with a statistic appropriate to an ordinal scale. The second is stability: language models are non-deterministic even at low temperature (Ouyang et al. 2025), so a score that moves between repetitions of an identical input is measuring something other than the interface. The third is dependence on the execution stack: if the same written criterion produces different scores when run under a different agent runtime and its model, the score is in part a property of the tooling instead of the page.

A system that reports a total without reporting these is offering an opinion formatted as a measurement.

In practice, then, evaluating a web page against the Laws of UX raises a chain of unanswered questions: whether the principles can be stated as observable conditions at all (Section 2.3), which of them survive the loss of interaction and of visual detail (Section 2.4), and whether the resulting scores agree with human judgment, hold still across repetitions, and survive a change of runtime (Section 2.5). The first two problems have been described in the usability literature for over two decades. The last is recent enough that the search recorded in Section 3.2.3 found no published work measuring it for this setting.

# 3. Background

This chapter introduces the concepts needed to understand the design of the evaluation pipeline and situates the work within existing research. Section 3.1 defines the conceptual framework: the evaluation tradition the system automates, the principles it operationalizes, and the technical elements it relies on. Section 3.2 reviews related work and identifies the gap that motivates the study.

## 3.1. Conceptual Framework

### 3.1.1. Overview of the Proposed Pipeline

Figure 1 gives the shape of the system before the components are described individually. What carries the argument of this proposal is where the diagram branches and where it ends. The capture splits into two representations, not one, because a criterion is scored on the representation where it is measurable, and the six groups whose criteria are geometric are run on both so that the difference between the two can be measured rather than assumed. And the measurement path terminates against a human reference and not against itself, because a score with nothing to compare it to is an opinion.

**Figure 1.** The evaluation pipeline and its validation path. Each of the seven construct skills applies the rubric of one construct group and emits a single score for it. The solid arrow into each group is its reference channel, the representation on which its criterion is measurable (Table 4); the dashed arrow is the second channel on which the six structurally defined groups are also run, which is what makes the representation term of Section 4 measurable. The lane at the bottom is the human reference, and agreement among the evaluators is computed before any comparison against the system.

```
                                  ┌─ G1  Perceptual grouping        ─┐
                    ┌─ Wireframe ─┼─ G2  Choice architecture        ─┤
                    │             ├─ G3  Capacity and segmentation  ─┤
URL → Capture ──────┤             ├─ G5  Position and progress      ─┼→ Score per construct
     fixed viewport │             ├─ G6  Economy and convention     ─┤   group → Profile
                    │             └─ G7  Motor targeting            ─┤   over the seven
                    │                  ↑ (the six structural groups) │
                    └─ Screenshot ─────┴─ G4  Visual salience       ─┘
                                                                        k repetitions
                                                                        × 2 execution stacks
                                                                        × 2 channels for
                                                                          G1–G3, G5–G7

Four expert evaluators → Human reference ─────────→ Agreement per group
                         (same seven rubrics)       (weighted Brennan–Prediger κ)
                                                            ↑
                                              Profile over the seven
```

The chapter proceeds from the evaluation tradition the system automates (Section 3.1.2), through the principles it operationalizes (Sections 3.1.3 to 3.1.6), to the technical elements the pipeline relies on (Sections 3.1.7 to 3.1.11).

### 3.1.2. Heuristic Evaluation and the Automation Boundary

Heuristic evaluation is an inspection method in which evaluators examine an interface against a short list of principles and report the problems they find (Nielsen and Molich 1990). It is cheap compared to testing with users, and its cost is concentrated in a single resource, an evaluator who can distinguish a usability problem from a personal preference.

Of the three automation types Ivory and Hearst (2001) distinguish, and which Section 1 introduces, critique is the only one that produces a judgment. That is what makes it the hard case, and it is where this work operates.

That restriction is the boundary this work tests. A rule engine reading markup can verify that an image has alternative text. It cannot determine whether the primary action is visually dominant, because dominance is a property of the rendered result and not of the document that produced it.

### 3.1.3. The Laws of UX and Three Distinct Layers

Any attempt to use the collection introduced in Section 1 as a measurement instrument has to keep three things apart, and most applied writing about it does not. The first layer is the original empirical finding, together with the experimental conditions under which it was obtained. The second is the popularized formulation, which compresses that finding into a sentence and generalizes it to interfaces. The third is the operationalization: the observable criterion by which a specific interface is scored.

The distance between the first and the third layer is where the validity of this work is at risk, and the size of that distance varies by law. For some it is small. For others, as Section 3.1.5 shows for Hick’s Law, published work argues that the popularized formulation contradicts the finding it claims to rest on.

A further distinction applies within the collection. Some entries rest on published experiments with measured effects. Others are conventions of design practice that acquired the name of a law by usage, with Occam’s Razor as the clearest case. It is a principle of theory selection from fourteenth-century philosophy, not a result about human perception. Whether operationalizability tracks empirical grounding is a question this work can ask, because it carries the provenance of each law separately through to the result, where dissolving the thirty into one number would lose it. Section 3.1.6 states the granularity at which scoring actually happens, together with the limits that granularity places on the comparison.

### 3.1.4. Division of the Thirty Laws and Scope of the Implemented Set

The evaluation system is built by three students working on a shared repository. The thirty Laws of UX were partitioned into three disjoint sets of ten, one per student, following the order in which the collection is published. Each student then selects six of their ten for implementation, for eighteen laws in the final system.

Selection follows two criteria applied in order. A law enters the implemented set only if its criterion is *observable in a single captured screen*, which excludes laws defined over elapsed time, over a sequence of interactions, or over a property of the user instead of the interface; and only if it is *distinguishable* from the laws already selected. That second criterion addresses the double-counting problem described in Section 3.1.6. Table 1 records the partition and the resulting selection.

**Tabla 1. Partition of the thirty laws among the three students. Laws in bold are the eighteen selected for implementation.**

|                              |                            |                          |
|:-----------------------------|:---------------------------|:-------------------------|
| **David Hernández**          | **Mateo Rincón**           | **Juan F. Rodríguez**    |
| **202220865**                | **202221402**              | **202214603**            |
| Aesthetic-Usability Effect   | **Choice Overload**        | **Chunking**             |
| Cognitive Bias               | **Cognitive Load**         | Doherty Threshold        |
| **Fitts’s Law**              | Flow                       | **Goal-Gradient Effect** |
| **Hick’s Law**               | **Jakob’s Law**            | **Law of Common Region** |
| **Law of Proximity**         | **Law of Prägnanz**        | **Law of Similarity**    |
| Law of Uniform Connectedness | Mental Model               | **Miller’s Law**         |
| **Occam’s Razor**            | Paradox of the Active User | Pareto Principle         |
| Parkinson’s Law              | Peak-End Rule              | Postel’s Law             |
| **Selective Attention**      | **Serial Position Effect** | **Tesler’s Law**         |
| **Von Restorff Effect**      | **Working Memory**         | Zeigarnik Effect         |

Twelve of the thirty do not enter the scored set, and the reason for each is recorded because the pattern is itself a result about the collection. Table 2 groups them.

**Tabla 2. The twelve laws that do not enter the scored set, and the reason in each case.**

| **Reason**                                                                                                     | **Laws excluded**                                                                                     |
|:---------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------|
| Defined over elapsed time or over a sequence of interactions, and therefore not observable in a captured image | Doherty Threshold, Flow, Parkinson’s Law, Peak-End Rule, Zeigarnik Effect, Paradox of the Active User |
| A property of the user or of usage data, not of the interface                                                  | Cognitive Bias, Mental Model, Pareto Principle                                                        |
| Observable only through interaction with the system, not from its rendered state                               | Postel’s Law                                                                                          |
| Not distinguishable from a selected law on the representation used here                                        | Law of Uniform Connectedness                                                                          |
| Retained as an instrument rather than as a scored law                                                          | Aesthetic-Usability Effect                                                                            |

Three of these decisions need more than a row.

The Aesthetic-Usability Effect is the one entry in the table that is not excluded for lack of observability. It is the mechanism the representation comparison tests, and scoring it alongside the laws it is suspected of biasing would confound that comparison. Keeping it as an instrument, reported separately, avoids that.

The Goal-Gradient Effect is retained despite belonging to the family of temporal laws. Motivation increasing as a goal approaches is not observable in a captured image. What is observable is the design affordance the effect depends on: whether progress toward completion is made visible at all, and how. The rubric therefore scores the affordance and not the effect, and the distinction is declared in the rubric itself.

This is the same narrowing that Section 3.1.5 applies to Hick’s Law, where the rubric measures choice architecture and not reaction time. Applying it a second time is consistent, but it does widen the gap between the original finding and the operationalization, and the analysis reports both laws among the cases where that gap is widest.

The Law of Uniform Connectedness is excluded on the distinguishability criterion, and that exclusion needs a qualification the table cannot carry. Palmer and Rock (1994), who introduced the principle, argue the opposite of redundancy: uniform connectedness is not reducible to proximity or similarity, its effects hold even when opposed by them, and it operates before them, organizing the field into the units on which the classical grouping principles then act. The exclusion here is therefore not a claim that the construct duplicates another. It is a claim about what this instrument can separate. On a wireframe, where every retained element is drawn as an outlined rectangle, a uniformly connected region and a common region are the same drawn box, and no rubric applied to that image could assign them different levels. The construct is excluded because the representation cannot distinguish it from one already selected, which is a limitation of the wireframe and not a property of perception, and it is recorded as such.

The partition is a division of labour and not a division of the thesis. Each column of Table 1 was worked by the author named at its head, who located and verified the primary source of all ten laws in it and argued the case for the six that entered the implemented set. Hernández took the first column, Rincón the second, and Rodríguez the third. The eighteen that survived are implemented, evaluated, and reported as one system, and no result in this document is attributed to one author.

The partition does not survive into the build, and that is deliberate rather than an oversight. The seven construct groups cut across the three columns: G1 alone draws the Law of Proximity from the first, the Law of Prägnanz from the second, and the Law of Common Region and the Law of Similarity from the third. Seven groups do not divide among three authors, and handing a skill to whoever happened to hold the most laws in it would split rubrics that have to be drafted against one another to stay mutually exclusive. Each skill is therefore drafted by the author who verified the largest share of the laws it subsumes and reviewed by the other two before the freeze, and the assignment is recorded in the repository. The capture layer, the plugin packaging, the orchestrator, the output schema, the corpus, and the analysis are shared work throughout.

### 3.1.5. Primary Sources of the Implemented Laws

Every implemented law is traced to its origin, and the origin is opened and read rather than taken from a secondary account of it. For thirteen of the eighteen that origin is a primary publication cited directly. For two the original could not be read at first hand and the law is cited through a source that restates it, marked as such in the table and explained below. For three there is no publication to cite at all, and the record says so; a plausible-looking reference in that slot would be worse than the gap. Table 3 lists the eighteen with the representation on which each criterion is measurable and the nature of its evidential basis.

**Tabla 3. The eighteen implemented laws, their primary sources, the channel on which each is scored, and the nature of the evidence behind each.**

| **Law**                | **Primary source**                                      | **Channel** | **Evidential basis**                          |
|:-----------------------|:--------------------------------------------------------|:------------|:----------------------------------------------|
| Law of Proximity       | Wertheimer (1923)                                       | Wireframe   | Experimental, qualitative                     |
| Law of Prägnanz        | Wertheimer (1923)                                       | Wireframe   | Experimental, qualitative                     |
| Law of Similarity      | Wertheimer (1923)                                       | Wireframe   | Experimental, qualitative                     |
| Law of Common Region   | Palmer (1992)                                           | Wireframe   | Experimental, quantified                      |
| Hick’s Law             | Hick (1952)                                             | Wireframe   | Experimental, contested in HCI                |
| Choice Overload        | Iyengar and Lepper (2000)                               | Wireframe   | Experimental, not replicated in meta-analysis |
| Miller’s Law           | Miller (1956)                                           | Wireframe   | Experimental, misread and later revised       |
| Chunking               | Miller (1956)                                           | Wireframe   | Experimental                                  |
| Working Memory         | Baddeley and Hitch (1974)                               | Wireframe   | Experimental, model                           |
| Cognitive Load         | Sweller (1988)                                          | Wireframe   | Experimental, different domain                |
| Von Restorff Effect    | von Restorff (1933), through Hunt (1995)                | Screenshot  | Experimental, commonly misread                |
| Selective Attention    | Benway (1998)                                           | Screenshot  | Experimental, web-specific                    |
| Serial Position Effect | Glanzer and Cunitz (1966)                               | Wireframe   | Experimental, condition-bound                 |
| Goal-Gradient Effect   | Hull (1934), through Kivetz, Urminsky, and Zheng (2006) | Wireframe   | Experimental, effect in humans replicated     |
| Occam’s Razor          | William of Ockham, 14th c.                              | Wireframe   | Philosophical, not empirical                  |
| Tesler’s Law           | Larry Tesler, Xerox PARC                                | Wireframe   | Industry principle, no publication            |
| Jakob’s Law            | Nielsen (2000)                                          | Wireframe   | Industry article, no study                    |
| Fitts’s Law            | Fitts (1954)                                            | Wireframe   | Experimental, quantified                      |

Ten of the eighteen need comment, because the operationalization does not follow from the source as directly as the popular formulation suggests. They fall into six kinds, and the kind matters more than the individual case. The count is itself a result: ten of the eighteen carry a documented gap between what was found and what the design principle claims. The six paragraphs below name eleven cases, because the Von Restorff Effect falls into two of the categories.

#### The finding does not support the design principle.

Two laws are in this position, and both sit in the same construct group.

Hick (1952) measured choice reaction time over up to ten alternatives and fitted it as a logarithmic function of their number, reporting a rate of information gain of the order of five bits per second. The alternatives were equiprobable and appeared in random order. Proctor and Schneider (2018) report that the slope ranges from zero to several hundred milliseconds with stimulus–response compatibility, that extensive practice can eliminate the set-size effect altogether, and that the logarithmic relation is reliable only for roughly two to eight alternatives. Liu et al. (2020) go further and argue that Hick’s Law is misapplied in HCI on four grounds: interfaces have very good stimulus–response compatibility, which makes choice reaction time nearly constant in the number of options; a logarithmic latency function mathematically favors displaying more items at once, not fewer; the stimulus–response paradigm rarely matches an interface task, which is a matter of visual search and not of choosing among known alternatives; and, stated directly, that “the design principle cannot be justified by Hick’s law”.

Choice Overload is in worse condition. Iyengar and Lepper (2000) reported that a tasting booth offering 24 jam varieties drew more visitors than one offering six but produced purchases from 3% of them against 30%, and the result became one of the most cited findings in applied psychology. A meta-analysis of 63 conditions drawn from 50 experiments with 5,036 participants then found a mean effect size of $D = 0.02$, with a confidence interval from $-0.09$ to $0.12$, and concluded that the authors “could not reliably identify sufficient conditions that explain when and why an increase in assortment size will decrease satisfaction” (Scheibehenne, Greifeneder, and Todd 2010).

Both laws are retained. Excluding them would remove the two clearest cases of the gap this work exists to examine, and the rubric for their construct group declares the position explicitly: it scores choice architecture, the property a designer manipulates, and its thresholds are a convention adopted for reproducibility and not values obtained from either source.

#### The popular reading misstates the finding.

Miller’s Law is the most widely repeated law in the collection and the most clearly misread. Miller himself declined to treat the recurrence of the number as meaningful, writing of the sevens that “I suspect that it is only a pernicious, Pythagorean coincidence” (Miller 1956). His paper is about recoding: the escape from the limit is to form chunks with more bits each, which is why Chunking and Miller’s Law are two readings of one source and belong in one construct group. Cowan (2001) later placed the capacity at about four chunks and not seven, and only under conditions that prevent rehearsal and recoding, which is the opposite of what an interface affords.

The Von Restorff Effect is misread in the same way. Hunt (1995) re-examined the 1933 study and argues that perceptual salience is not necessary for the isolation effect, that distinctiveness is a relational property defined against a similarity context, and that the effect concerns recall and not attention. Expecting a visually distinct control to attract the eye extrapolates on both counts, and the rubric says so.

#### The finding comes from another domain.

Sweller (1988) introduced cognitive load in the context of mathematics instruction, arguing that conventional problem solving through means-ends analysis consumes capacity that is then unavailable for schema acquisition. The studies concern learning kinematics, geometry, and trigonometry, and no part of the paper concerns interface design. Carrying the construct across to a web page is a transfer between domains, and the rubric for its group is written against observable properties of the screen and not against the theory’s internal constructs.

#### The finding holds only under conditions an interface does not create.

The Serial Position Effect is the clearest case. Glanzer and Cunitz (1966) separated the two halves of the curve experimentally: slowing presentation raised recall at the start of a list and left the end untouched, while inserting a counting task between presentation and recall removed the end peak. Their result is stated plainly, that “the 10-sec delay was sufficient to remove most of the end peak” and that with thirty seconds “there is no trace at all of the end peak”.

Recency, in other words, survives about ten seconds of interference. A user who scans a menu, moves the mouse, reads a label, and then acts has spent that budget. The primacy half of the curve does not carry the same restriction, and the rubric for the group weights the two positions accordingly instead of treating first and last as equivalent.

#### No primary publication exists.

Three entries have no empirical source to verify, and that is itself the finding. Occam’s Razor is a principle of theory selection attributed to a fourteenth-century philosopher. Tesler’s Law is attributed to Larry Tesler at Xerox PARC and was first written down in an interview, with no study behind it. Jakob’s Law has a locatable origin, Nielsen (2000), and that article states the principle as professional advice supported by examples, with no empirical study reported. The three are kept together in one construct group for the reason given in Section 3.1.6.

#### Cited through a secondary source.

Two originals could not be read directly. The 1933 von Restorff study exists only in German, and Hull’s goal-gradient work is cited here through Kivetz, Urminsky, and Zheng (2006), who restate it and, more usefully, replicate the effect in humans: customers of a café reward programme purchased more frequently as they approached a free item, with mean interpurchase time falling by about 20%, and the acceleration also appeared when progress was illusory, produced by bonus stamps that changed the perceived distance to the goal without changing the real one. That second result is what the rubric scores, because a progress indicator is exactly a claim about perceived distance.

### 3.1.6. Grouping Laws by Construct

The eighteen selected laws are not eighteen independent constructs. Four of them are Gestalt principles of perceptual grouping, distributed across all three partitions; four more measure aspects of capacity or segmentation that overlap heavily. Scoring each separately and summing the result counts the same underlying property more than once and inflates the aggregate. That is a defect of validity and not a matter of presentation.

The eighteen are therefore grouped by the construct they measure, and one skill is implemented per group inside the plugin described in Section 3.1.10. A skill applies the group’s rubric, which states observable conditions covering the laws it subsumes, and emits one score for the group. The scored unit of this system is therefore the construct group and not the individual law; what stays attached to each law is its provenance note. Table 4 gives the resulting seven groups.

**Tabla 4. The eighteen laws grouped into seven constructs, one skill each. The channel is the representation on which the group’s criterion is measurable.**

|     | **Construct**                       | **Laws subsumed**                                                          | **Channel** |
|:----|:------------------------------------|:---------------------------------------------------------------------------|:------------|
| G1  | Perceptual grouping                 | Law of Proximity, Law of Prägnanz, Law of Common Region, Law of Similarity | Wireframe   |
| G2  | Choice architecture                 | Hick’s Law, Choice Overload                                                | Wireframe   |
| G3  | Capacity and segmentation           | Miller’s Law, Chunking, Working Memory, Cognitive Load                     | Wireframe   |
| G4  | Visual salience                     | Von Restorff Effect, Selective Attention                                   | Screenshot  |
| G5  | Position and progress in a sequence | Serial Position Effect, Goal-Gradient Effect                               | Wireframe   |
| G6  | Economy and convention              | Occam’s Razor, Tesler’s Law, Jakob’s Law                                   | Wireframe   |
| G7  | Motor targeting                     | Fitts’s Law                                                                | Wireframe   |

The grouping has consequences the analysis has to carry.

G6 collects the three entries with no empirical source behind them, established in Section 3.1.5. Isolating them is deliberate, and it is the alternative to distributing them so that no group looks compromised. It lets the analysis compare the agreement achieved on a group with no empirical basis against the agreement achieved on groups that have one.

The reach of that comparison is limited, and the limit belongs here rather than in the results. It sets one group against six, and those groups differ at the same time in construct, in the number of laws each subsumes, and in the channel on which each is scored, so no single factor is isolated by it. Appendix B states that per-group coefficients do not support classifying a group into an agreement band, and this comparison inherits that restriction. It is therefore read as a descriptive observation over seven groups. It is not a contrast with replicates, and it is reported as exploratory.

G2 turns out to matter for the same reason and was not designed to. Both of the laws it subsumes have a documented gap between the finding and the design principle, one contested in this field and one that a meta-analysis places near zero. The group therefore measures a property designers manipulate daily whose empirical warrant is weaker than its popularity suggests, and any agreement it achieves is a statement about the rubric and not about the laws.

G7 contains one law because nothing else in the collection measures pointing. A group of one is not a defect; forcing Fitts’s Law into a larger group to balance the table would merge distinct constructs for cosmetic reasons.

G1 is evaluated on the wireframe, so the Law of Similarity is scored on similarity of shape, size, and alignment only. Similarity by color is not observable on a representation that has no color, and that restriction is declared as a limitation of the group instead of being resolved by moving the whole group to the visual channel.

### 3.1.7. Screenshot and Wireframe as Two Representations

The pipeline produces two representations of the same captured screen. The screenshot preserves color, typography, imagery, and contrast. The wireframe removes those and preserves position, proportion, and grouping.

Each law is assigned to the representation on which its criterion is measurable, and a construct group inherits the channel of the laws it subsumes. A law defined by color cannot be scored on an image without color. A law defined by geometry can be scored on either, and the six groups whose criteria are geometric are therefore run on both, which is what makes the representation comparison possible: the same rubric applied to two representations that differ only in the visual layer.

The fidelity of the wireframe transformation is a precondition, not an implementation detail. If the transformation displaces elements, a difference between channels becomes uninterpretable.

### 3.1.8. Generating the Wireframe

The wireframe has to preserve the geometry of the screenshot exactly, because a difference between the two channels is only interpretable if the transformation introduced none. Two approaches are available and they differ in whether that guarantee is structural or empirical.

#### Decision.

The wireframe is generated from the browser’s own layout tree rather than by segmenting the rendered image.

#### Justification.

A vision-based approach would detect regions in the screenshot with a segmentation model and draw boxes around them. It requires no access to the page internals and works on any image, including a screenshot taken by hand. Its cost is decisive here. It introduces a second model whose errors land in the same pipeline as the evaluator’s, and a divergence between channels could then originate in the segmenter instead of the evaluator. That is the one thing the representation comparison has to rule out.

Taking the boxes from the layout tree removes that confound by construction. The coordinates come from the same layout pass that produced the screenshot, so the geometry of the two representations descends from one computation instead of from two independent estimates, and no segmentation error can enter the comparison. Residual difference remains, introduced by rasterization, stroke width, and rounding. The verification below measures that deviation; assuming it to be zero is what the layout-tree choice does not buy. The generator is also deterministic, and that matters for a study that reports dispersion across repetitions: any variance observed is attributable to the evaluator and not to the input.

The cost of this choice is stated, not absorbed. Content painted outside the layout tree, inside a `canvas` element or as part of a raster image, has no box and does not appear in the wireframe. Pages that render their primary content this way are therefore unsuitable, and the corpus was checked against this condition at selection time.

#### Implementation.

The Chrome DevTools Protocol exposes the layout tree through the `DOMSnapshot` domain, whose `captureSnapshot` method returns, for each node, its absolute bounding box, its text content when it is a text node, and a global paint order index derived from the stacking order of the document (Chrome DevTools Protocol 2026). Without the paint order the output would be unusable. A document contains many wrapper elements whose boxes are large and which paint nothing, and rendering every box would produce a diagram of the markup instead of the page. The generator therefore keeps a node only when it paints, when its box has non-zero area, and when it is not fully contained in a sibling that paints over it, and renders the survivors as outlined rectangles with text nodes marked as filled bars.

#### Verification.

Fidelity is checked, not assumed. On a set of fixture pages with known geometry, the position and size of every retained box in the wireframe is compared against the same node’s box in the screenshot capture, and the maximum deviation is reported alongside every result of the representation comparison. The tolerance is fixed in the protocol before measurement.

### 3.1.9. Anchored Ordinal Rubrics and Agreement

Each construct group is scored on a shared ordinal scale of five levels, with observable conditions stated for each level and covering every law the group subsumes; Appendix C gives one rubric in full. The scale is coarse by design. A finer numeric range suggests a precision the judgment does not have and forces discriminations that no evaluator can define, and it lowers agreement without raising resolution.

Agreement between evaluators is the quantity that decides whether a score means anything, and the statistic has to suit an ordinal scale with unbalanced categories. Cohen’s $\kappa$ corrects for chance using the observed marginal distributions, which distorts the correction when most cases fall in one or two categories. Brennan–Prediger $\kappa$ uses a uniform chance model instead (Brennan and Prediger 1981), and it is the statistic used in the closest published comparison of this kind (Khalil and Rehman 2026). The scale is ordinal, so the coefficient is applied with quadratic weights, which treat a disagreement of one level as less serious than a disagreement of three. Both choices are fixed in the pre-registered protocol, before any score exists, and the number of evaluators it implies is derived in Appendix B.

### 3.1.10. The Deliverable: a Plugin of Construct Skills

The system is delivered as a plugin, published as a public repository, which a reader installs into their own agent runtime and runs against their own pages. That form is what makes the artifact usable by the teams described in Section 5 without any part of this work being re-implemented, and it is why the repository and not a hosted service is the deliverable.

Two levels have to be kept apart, because only one of them is portable.

The *skill* is the unit of capability, and it is the portable one. A skill is a directory containing a `SKILL.md` file with metadata and instructions, optionally accompanied by scripts and reference material (Agent Skills 2026). Agents load skills through progressive disclosure, holding only the name and description in context until a task matches, at which point the full instructions are read. Both runtimes used here read that same file: Claude Code discovers skills under a `skills/` directory (Anthropic 2026b) and Codex scans `.agents/skills` (OpenAI 2026). They differ in the directory they scan and not in the file format they read. Seven skills are written, one per construct group, and each carries the rubric of its group.

One component sits outside both levels and is named here because Section 7.3 treats it as the project’s single internal dependency. The orchestrator is the thin layer that reads a captured page, invokes each construct skill on the representation its group is assigned, collects the seven schema-valid results, and writes them out with the run metadata attached. It holds no evaluation logic of its own. Every judgment lives in a rubric, and a judgment moved into the orchestrator would sit outside the frozen instrument and outside the artifact a reader installs.

The *plugin* is the unit of distribution, and it is not portable in the same sense. Each runtime defines its own packaging convention: a Claude Code plugin is a directory carrying a `.claude-plugin/plugin.json` manifest alongside its `skills/` directory (Anthropic 2026a), while Codex distributes skills through a plugin directory of its own (OpenAI 2026). The repository therefore carries the manifest each runtime expects over one shared set of skill files, so that a single installation delivers the seven skills and the capture layer together instead of leaving the reader to assemble them.

That separation is what makes the implementation comparison a controlled one. The manifests differ; the rubric text does not. The same seven `SKILL.md` files execute under two independent runtimes without modification, so the instrument is held fixed while the execution stack varies around it. What varies with it is stated in Section 4: the runtime and the model family it invokes move together, and the term measures the pair rather than the harness alone.

### 3.1.11. Non-determinism in Model Output

Language models produce different outputs across repetitions of an identical input, including at low temperature (Ouyang et al. 2025). For a system that emits a score, this has a direct consequence. A single run reports one sample from a distribution whose spread is unknown. The evaluation therefore repeats every configuration and reports dispersion alongside every aggregate. A construct group whose score moves across repetitions of the same page is recorded as unstable. Instability is a property of the instrument and belongs in the results.

## 3.2. State of the Art

### 3.2.1. Automated Usability Evaluation Before Language Models

The ambition to automate interface evaluation predates the current generation of models by decades, and the survey by Ivory and Hearst (2001) remains the reference map of that period. The tools that reached practical use were guideline checkers operating over the document. They verify properties that can be expressed as rules and they do not attempt perceptual judgment. Their modern descendants are the accessibility linters whose partial coverage Section 1 reports (Deque Systems 2026).

### 3.2.2. Language Models as Usability Evaluators

Recent work applies language models to the evaluation task directly, with results that diverge according to how the task is posed.

Asked to perform heuristic evaluation in the conventional open-ended form against Nielsen’s ten heuristics, GPT-4o reproduced 21.2% of the problems reported by human specialists, reported 27 problems the specialists did not, and produced false positives attributed to hallucination (Guerino et al. 2026).

Asked instead to rate defined dimensions, performance is substantially better and splits by dimension type. Over the 983 expert-annotated mobile screens of the UICrit dataset (Duan et al. 2024), several frontier models reached Brennan–Prediger $\kappa$ of 0.81 or above against expert ratings on visual dimensions, while systematically overestimating the functional dimensions by median differences of between $+1.00$ and $+3.00$ points (Khalil and Rehman 2026). Few-shot prompting decreased agreement instead of improving it, by between 0.01 and 0.27.

### 3.2.3. The Gap

What the work above leaves open defines the gap this thesis occupies. The three statements below are claims of absence, and a claim of absence is only as strong as the search behind it. Each is made at the scope of the literature search recorded with this proposal and not as a statement about all published work. **\[PENDIENTE: adjuntar el registro de búsqueda: bases consultadas, cadenas exactas, idiomas, fecha de corte y criterios de inclusión, versionado junto al protocolo. Lo arma el equipo antes de M2\]**

First, the specificity of the criterion is a plausible explanation for the difference between the two families of results, and we found no study of interface evaluation that manipulates it. The task that succeeded supplied a named dimension; the task that failed supplied a one-sentence heuristic written for human evaluators. Whether a criterion stated as observable conditions per level closes that gap has not been measured in this setting.

Second, the representation supplied to the evaluator is not treated as a variable in the work we located. Every study cited above evaluates a rendered screenshot. Whether a judgment about structure changes when the visual layer is removed is unexamined there, even though the UICrit result implies that these models are strongly influenced by visual dimensions.

Third, we found no study that runs the same evaluation instrument across independent agent implementations. Published model comparisons vary the model while holding a single harness fixed. Holding the instrument fixed and changing the whole execution stack became possible only with the convergence on a portable skill file format, and we located no work that has done it for interface evaluation. This work does not invert the published design, because the runtime and its model family move together here (Section 4); it varies the pair, which is the configuration a reader who installs the plugin actually chooses between.

Two of these three would survive the discovery of adjacent work, because they are properties of a design and not of a topic: a study that manipulated representation or runtime would sharpen the comparison rather than remove the question. The first would not, and it is the one the search record has to cover most carefully.

The Laws of UX are not the evaluation framework in any of the work above, where the framework is Nielsen’s heuristics or a set of rating dimensions. Applying them raises the additional question, absent from that literature, of whether principles of varying evidential quality can be operationalized to a comparable standard.

# 4. Research Question

Two lines of published work bound this problem from opposite sides, and Section 3.2 reports both in full. On one side, multimodal models approximate expert judgment closely on the visual dimensions of interface quality and overestimate the functional ones (Khalil and Rehman 2026). On the other, the same class of model asked to perform heuristic evaluation in the conventional way recovers about a fifth of what a human specialist reports (Guerino et al. 2026).

The two studies differ in more than one respect, and saying so is a condition of using them honestly. They differ in the model generation, in the platform, mobile screens against a web system, in the output demanded, an ordinal rating against a list of problems, and in how the reference was built, expert ratings against problems found by specialists. Any of those could carry the difference in outcome.

What makes the specificity of the criterion worth isolating is not that it is the only candidate but that it is the one under a designer’s control and the one neither study varies. It enters here as the motivating conjecture, not as an established cause, and the design that follows does not put it to the test. No arm of the study supplies a one-sentence formulation over the same pages, so this proposal cannot report that an anchored criterion outperforms a heuristic one. What it can report is whether an anchored criterion reaches agreement worth using at all.

**Research question.** To what extent can the Laws of UX be operationalized as anchored rubrics whose automated application to a web interface agrees with expert human evaluation, and how far does that agreement depend on the representation supplied to the evaluator and on the agent implementation that executes the rubric?

The question has three terms, and each is measured separately.

The **agreement** term asks whether an anchored rubric, which names observable conditions for every level of the scale, produces scores that a qualified human would assign to the same interface. It is a stricter instrument than a one-sentence heuristic, and the question is whether that strictness is enough, not whether it beats the looser form, which this design cannot establish. A negative answer would be informative, not fatal. It would put the limit in how the model reads the interface, leaving the criterion’s clarity out of the account.

The **representation** term asks whether the score changes when the evaluator is given a wireframe instead of the original screenshot. Removing color, typography, and imagery while preserving geometry and hierarchy means that, for a criterion defined structurally the two representations should in principle yield the same score. A systematic difference would mean the evaluator’s judgment of structure is contaminated by visual treatment. That would be the Aesthetic-Usability Effect operating on an automated evaluator rather than a human one. This term is the least studied of the three, and it is also what justifies the wireframe stage, which would otherwise be an arbitrary step in the pipeline.

The **implementation** term asks how much of a reported score belongs to the interface and how much to the tooling that produced it. Because the seven skills are written in the file format both runtimes read, the same rubric text runs unchanged under each, so the instrument is held fixed while the execution stack varies around it (Section 3.1.10).

What varies is a pair, not a single factor. Each runtime invokes its own model family, and pulling the harness apart from the model would take a crossed design this term does not accommodate. Any divergence therefore belongs to the runtime and the model together, so the term is reported as sensitivity to the whole execution stack. Variance across repetitions of one configuration bounds the precision of the measurement, and it is reported; averaging it away would hide the thing being measured.

# 5. Justification

The asymmetry between production and evaluation is widening, not closing. Interface generation has been substantially automated over the last three years, while the assessment of whether a generated interface is any good has not moved past manual inspection by someone qualified to perform it. Every increase in the rate at which interfaces are produced raises the cost of the bottleneck.

The consequence is not evenly distributed. Organizations with a design function absorb it by hiring. Small teams, internal tools, public-sector portals, and student projects absorb it by skipping the evaluation. That is why the interfaces that most affect people with the fewest alternatives are frequently the ones that have never been examined by anyone trained to examine them. A method that produces a structured, auditable reading of an interface without a specialist in the room is worth something to those teams specifically, and worth nothing at all if the reading cannot be defended. What this work can offer them is that reading, plus the evidence for how far it corresponds to expert judgment. It is no verdict on whether users will succeed on the page; Section 6.3 says why the design cannot supply one.

That condition is what puts the contribution in the measurement rather than in the tool. Building a system that emits scores for a web page is a semester of engineering. Establishing whether those scores correspond to expert judgment, which of the thirty principles admit an observable criterion and which resist one, and how much of the output is stable and how much is an artifact of a particular model run, is the part that produces knowledge.

A negative result on any of these is still a result. Knowing which perceptual judgments about interfaces are currently automatable, and which are not, is useful to anyone who intends to build on this class of system, and the search recorded in Section 3.2.3 located no such map.

The Laws of UX were chosen deliberately as the framework. They are already in wide use as design guidance, so the operationalization question is live whether or not anyone studies it: practitioners are applying these principles to interfaces daily, and the criteria they apply are unwritten. They also span a useful range for this question, from principles with measured experimental effects to principles that are industry convention wearing the name of a law. That range is what lets the analysis ask whether operationalizability tracks empirical grounding, on the terms and within the limits Section 3.1.6 sets out. The question is about the collection itself; no single page answers it.

The work is feasible now for reasons that did not hold earlier. The first is that multimodal models can be given an image of an interface and asked about its visual and spatial properties. That is the capability the critique automation described by Ivory and Hearst (2001) lacked. The second is that agent skills have converged on a file format that more than one runtime reads. That turns what would otherwise be a packaging detail into an experimental control, for the reason set out in Section 3.1.10, and it is also what lets the result ship as a plugin a reader can install, not merely a description of one.

Finally, the scope is chosen to be finishable. The system evaluates one captured screen, never a multi-screen flow. The temporal laws are excluded outright, where a looser project would approximate them. Validation runs against expert human evaluation on a sealed corpus, and it supports no claim of general applicability. These restrictions cost coverage, and the document states them as limitations; absorbing them silently is what would make the result unreadable. That is the difference between a bounded result and an overclaimed one.

# 6. Objectives

## 6.1. Main Objective

To produce empirical evidence about the degree to which the Laws of UX can be operationalized as anchored rubrics applied automatically to web interfaces, by building the evaluation pipeline and the installable plugin of seven construct skills that implements eighteen of them, and by measuring the agreement of its output against expert human evaluation over a sealed corpus of real pages, under a protocol fixed before the first model is run over the corpus.

The eighteen laws are subsumed into seven construct groups and the system emits one score per group, for the reason given in Section 3.1.6. The individual law is the unit of provenance throughout the document. It is not the unit of scoring, and no coefficient is computed at that level.

## 6.2. Specific Objectives

1.  **Select and operationalize eighteen Laws of UX into anchored rubrics with verified provenance.**

    To select eighteen of the thirty laws against the two criteria stated in Section 3.1.4, observability in a single captured screen and distinguishability from the laws already selected, recording the reason for every exclusion; to group them into the seven constructs given in Section 3.1.6; and for each group to write a rubric that names observable conditions for every level of the shared 0–4 ordinal scale, to assign that rubric to the representation on which its criterion is measurable, and to document its provenance in three separated layers: the original empirical finding with its experimental conditions, the popularized formulation, and the operationalization adopted here.

    The three layers are kept apart for the reason given in Section 3.1.3. Several entries in the collection are industry heuristics and not empirical findings, and any such law that enters the final set is labeled as one.

    *Verification:* seven rubrics versioned in the repository, one per construct group, and eighteen provenance notes. Each note records the origin of its law and how that origin was reached: a primary publication opened and read, a restating source where the original could not be read directly, or the recorded absence of any publication. Each also states what the operationalization adds to or assumes beyond what the origin establishes.

2.  **Pre-register the measurement protocol before the corpus is measured.**

    To define, version, and freeze the instrument: the rubrics and the output schema; the number of repetitions per configuration; the agreement statistic and its justification for an ordinal scale; the treatment of cases marked not applicable, including whether they are excluded or carried as a category of the agreement computation; and the criterion for declaring a construct group unstable. The literature search behind the claims of absence in Section 3.2.3 is recorded and versioned in the same act, because a claim of absence that cannot be re-run is not checkable.

    The corpus is fixed as part of the same act. It consists of thirty pages in three strata of ten. Appendix A lists them with the reasoning behind the strata and the limits the selection imposes on any conclusion; the authoritative record is the versioned manifest in the repository.

    Freezing precedes measurement for a reason that is not procedural. Once scores exist, a rubric can always be adjusted until agreement improves, and the resulting number would measure the adjustment instead of the interface.

    A dated and hashed protocol is the only defense against that.

    Calibration comes before the freeze, and it cannot happen on the corpus. A rubric whose middle levels are never exercised looks, in the data, exactly like a rubric that discriminates well, and the only way to tell the two apart is to run it and inspect the spread of scores it produces. Doing that on the sealed corpus would defeat the sealing. The instrument is therefore piloted against UICrit (Duan et al. 2024), a public dataset of 983 mobile interfaces annotated by seven experienced designers, external to this corpus and to its platform. The pilot reports, for each of the seven rubrics, the distribution of levels it assigns across the pilot pages. A rubric whose scores do not move across that set is rewritten, and the rewrite is dated before the freeze.

    What the pilot is not: UICrit records global quality dimensions and free-text critiques, not judgments per law, so it offers no per-law reference against which agreement could be computed. It calibrates the range of the instrument. It does not validate it, and no agreement figure is derived from it.

    *Verification:* the protocol is published as a versioned document and the corpus manifest is sealed with its hash recorded, both dated before the first invocation over the corpus; the pilot distribution for each of the seven rubrics is published with the protocol, together with any rubric revised in response to it.

3.  **Build the system: the capture layer, the seven construct skills, and the plugin that distributes them.**

    To implement the path from a URL to the two representations the evaluation consumes: a screenshot at a fixed and recorded viewport, and a wireframe that abstracts color, typography, and imagery while preserving the position and proportion of every element. Fidelity of that transformation is a precondition of the representation comparison and not an implementation detail, for the reason given in Section 3.1.8.

    To implement one skill per construct group against the frozen output schema, each applying its group’s rubric and emitting a single score with the observations behind it, and to package the seven together with the capture layer as a plugin carrying the manifest each runtime expects, so that a reader installs one artifact and runs the evaluation on their own pages (Section 3.1.10).

    The plugin is the form the contribution takes outside this document. A result nobody can re-run on a page of their own choosing is a claim about our corpus, and nothing beyond it.

    *Verification:* on a set of fixture pages with known geometry, element positions in the wireframe reproduce those of the screenshot within a declared tolerance, and the tolerance is reported alongside every result of the representation comparison. Each of the seven skills runs end to end on the fixtures and emits schema-valid output, and the plugin installs from the public repository and runs unmodified under both runtimes.

4.  **Establish expert human ground truth over the sealed corpus.**

    To recruit evaluators with documented experience in interface design or evaluation, train them on the same rubrics the system uses, and have them score the corpus independently and without access to any system output, so that agreement between the human evaluators themselves is computed before the system is compared against them.

    The representation the evaluators are shown is a parameter of the protocol and not a detail of the session, because six of the seven groups are scored by the system on the wireframe. If the evaluators score the rendered page, the agreement term and the representation term stop being separable; if they score the wireframe, the reference is expert judgment about a wireframe and not about the interface. **\[PENDIENTE: decidir y fijar en el protocolo qué representación puntúa cada evaluador por grupo, y qué comparación queda disponible en cada caso. Decisión de David con Camilo, antes de M2\]**

    Agreement among the humans is reported first and on its own. Where the experts diverge on a construct group, no comparison against the system on that group can be interpreted. What such a divergence means is a separate question, and Section 6.3 sets out the two readings the analysis keeps apart; under either one it is a finding about the difficulty of operationalizing the laws that group subsumes, reported as it stands. Repairing a rubric once its scores are known would measure the repair.

    *Precondition:* this objective depends on the availability of qualified evaluators, which is external to this work. The target is four evaluators and the floor is three; Appendix B gives the calculation, and the reason for the fourth is identifiability of a biased rater rather than precision. Below three, the design’s own guarantee is gone: two raters cannot separate a systematically severe evaluator from genuine disagreement. Should fewer than three be recruited by the end of week 6, the study proceeds with those available and reports the agreement as not interpretable for that purpose, stated as a coverage limitation and not absorbed into the results.

    *Verification:* every case in the corpus carries independent scores from all participating evaluators, with inter-rater agreement computed per construct group and reported before any system-to-human comparison.

5.  **Execute the measurement grid and analyze its three terms with per-case traceability.**

    To run the pipeline over the sealed corpus across the grid defined by the protocol, with repetitions per configuration, on both agent implementations and, for the structurally defined laws, on both representations; and to produce the analysis the protocol prescribes: agreement against human ground truth per construct group, the paired comparison between representations, and the comparison between agents together with dispersion across repetitions.

    Aggregate figures are reported together with the per-case data behind them. A mean score with no accompanying distribution hides exactly the instability this thesis set out to measure.

    The rubrics also require a recommendation wherever a group scores two or lower, and the system emits them. Their quality is not measured here. No objective verifies them, no evaluator rates them, and nothing in this design distinguishes a recommendation that is actionable from one that is generic or wrong. They are an output of the tool, not a result of the study, and the document says so where it lists what the system emits.

    *Verification:* the complete per-case dataset is exported alongside every aggregate figure, such that any reported number can be traced back to the individual cases that compose it without re-invoking a model.

## 6.3. Threats to Validity

The threats below are the ones capable of invalidating a result and not merely of limiting its reach, and each is paired with the measure taken against it.

#### Construct validity: the operationalization is not the law.

The rubrics score interface properties that stand in for psychological findings obtained under laboratory conditions. Hick’s alternatives were equiprobable and meaningless; a navigation menu is neither (Hick 1952). The isolation effect concerns recall, not gaze (Hunt 1995). Where published work argues the popular design principle does not follow from the finding, as Liu et al. (2020) do for Hick’s Law, the rubric says so. The mitigation is disclosure, not repair. Every rubric records what its operationalization adds beyond the source, and the analysis reports which construct groups carry the widest gap between what their sources establish and what their rubrics score.

#### Construct validity: the reference may not be a reference.

The study compares the system against expert humans, and that assumes the experts agree with each other. If they do not, there is no ground truth for that construct group and the comparison is undefined. Agreement among evaluators is therefore computed and reported before any system-to-human comparison, and a group whose human agreement is low is reported as unmeasurable, and not as a group the system failed.

#### Internal validity: a biased evaluator.

A systematically severe or lenient evaluator depresses agreement and cannot be distinguished from genuine disagreement with three raters. Appendix B shows that a fourth evaluator buys identifiability of such a rater while adding almost nothing to precision, and that is why four are targeted. Per-evaluator marginal distributions are reported so a divergent rater is visible.

#### Internal validity: instability of the instrument.

Model output varies across repetitions of an identical input, including at temperature zero (Ouyang et al. 2025). A single run would report one draw from an unknown distribution. Every configuration is repeated and dispersion is reported with every aggregate; a construct group whose score moves across repetitions is recorded as unstable.

#### Internal validity: contamination of the comparison.

If the wireframe transformation displaced elements, a difference between channels could originate in the transformation instead of the evaluator. Generating the wireframe from the layout tree removes this by construction (Section 3.1.8), and the residual deviation is measured on fixtures and reported.

#### Conclusion validity: precision at the group level.

With thirty units per construct group, the interval around a coefficient of 0.70 straddles the conventional boundary between moderate and substantial agreement. Per-group coefficients therefore cannot support a claim about which band a group falls in, and are reported as exploratory with their intervals; the pooled coefficient is the confirmatory result.

#### External validity: the corpus.

Thirty Colombian pages chosen purposively support no claim about web pages in general, and every case is an entry page, with the three exceptions Appendix A marks, so the corpus exercises navigation and hierarchy more than input and transactional flow. Appendix A states both restrictions, and they constrain the conclusions instead of being corrected.

#### Construct validity: agreement is not utility.

The evaluators are trained on the rubrics the system applies, so what the agreement term measures is whether a model and a person reading the same criterion over the same image reach the same level. That is fidelity to the instrument. It is not evidence that a page scoring low on a construct group is harder for anyone to use. No arm of this design connects a score to an observable difficulty for a user, and none is added, because a usability study over thirty pages does not fit the term. The consequence is declared, because within this term it cannot be mitigated: the results support claims about the instrument, not about the quality of the pages. Section 5 promises a structured, auditable reading of an interface on that basis, and stops short of a usability verdict.

#### Construct validity: disagreement may not be the rubric’s fault.

The threat above assumes that when experts disagree, the rubric is unclear. Published work on inspection methods reports the opposite possibility. Hertzum and Jacobsen (2003) review eleven studies across cognitive walkthrough, heuristic evaluation, and thinking-aloud, and report that average agreement between any two evaluators using the same method on the same system ranges from 5% to 65%, an effect present for novices and experienced evaluators alike. Evaluator variance is therefore a property of inspection and not only of the criterion, and attributing low agreement to the rubric alone would be a pre-committed misreading. The analysis distinguishes unstructured disagreement, which is consistent with an ambiguous rubric, from disagreement structured by evaluator or by stratum, which is visible in the per-evaluator marginals already reported and is read as evidence about the construct. Both readings are declared before measurement, which closes off choosing between them once the coefficients are in hand.

#### External validity: a moving target.

Model versions change during a term. Every run records the exact model identifier, the prompt template and its hash, and the decoding parameters, so that a result attaches to a stated configuration rather than to a vendor’s product name, which may denote something different six months later.

## 6.4. Ethical Considerations

The study involves human participants, and submission to the University’s ethics committee is a requirement of the programme. Evaluation sessions begin once approval is in hand and not before. **\[PENDIENTE: fecha real de radicación ante el comité y estado actual de la solicitud; lo confirma David con Camilo\]**

Two consequences follow from that requirement and they are not the same one. The programme requirement is satisfied by filing, and on the advisor’s guidance a delayed response does not affect it. The schedule is a separate matter: no session can be held before approval, and Objective 4 supplies the reference that Objective 5 is analysed against, so the committee’s turnaround is recorded in Section 7.3 as a scheduling dependency with a stated contingency. Treating the compliance question and the scheduling question as one would leave the only dependency capable of removing the ground truth outside the risk register.

Participants are professionals recruited for their expertise, not a vulnerable population, and the task carries no foreseeable risk beyond the time it consumes. Participation is voluntary and revocable, informed consent is obtained in writing before the first session, and a participant may withdraw at any point without giving a reason and without their partial data being used.

Evaluator identity is separated from evaluator scores. Each participant is assigned an identifier at recruitment, the mapping is held apart from the analysis data, and only the identifier appears in the published dataset. Per-evaluator marginal distributions are reported, as the threats above require, under those identifiers. This matters because the analysis explicitly looks for a divergent rater, and a published dataset that made that person nameable would expose an individual professional’s judgment to comparison in a way they did not agree to.

The pages evaluated are public and no personal data is collected from them. No access control is circumvented at any point: the capture policy, and the pages it excluded during selection, are recorded in Appendix A.

# 7. Schedule

The 2026-20 term began on August 3 and instruction ends on November 28, with final examinations held between November 30 and December 5. This proposal is written in week 3. Fifteen weeks remain for the work described in Section 6.

One constraint shapes the ordering of everything below. The human evaluation that supplies ground truth cannot be compressed. Expert evaluators have to be found, trained on the rubric, and scheduled around their own commitments, and none of that fits into a single week. Recruitment therefore begins in week 4, before any code exists, and the human study runs alongside implementation, not after it. A plan that leaves validation until the end produces a system with no evidence behind it.

That is the failure mode this schedule is built to avoid.

A second ordering decision follows the pre-registration principle stated in Objective 2: the rubrics, the output schema, and the evaluation protocol are frozen and dated before the first model is run over the corpus. Once a score exists, the temptation to adjust the rubric so the numbers look better is real, and the only defense against it is a timestamp.

## 7.1. Phases

**Tabla 5. Work plan by phase for term 2026-20.**

| **\#** | **Weeks** | **Dates**       | **Work**                                                                                                                                                                                                                                                                                                                                                    | **Verification**                                                                                                                                                                                                                                                    |
|:-------|:----------|:----------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **\#** | **Weeks** | **Dates**       | **Work**                                                                                                                                                                                                                                                                                                                                                    | **Verification**                                                                                                                                                                                                                                                    |
| 0      | 3–4       | Aug 17 – Aug 30 | Finish this proposal. Divide the thirty laws for source verification, select the eighteen that meet both criteria, and locate and verify the primary source of each.                                                                                                                                                                                        | Eighteen laws selected with the reason for each of the twelve exclusions recorded, and each selected law carrying a provenance note that names its origin, states how that origin was reached, and separates the original finding from the popularized formulation. |
|        | 4–6       | Aug 24 – Sep 13 | Operationalize each construct group: observable criteria per level of the 0–4 scale, the fixed output schema, and the channel assignment. Pilot the rubrics against UICrit to check that each one exercises its scale, and revise any that do not, before the freeze. Fix the thirty-page corpus and seal its manifest. Begin recruiting expert evaluators. | Rubric document and JSON schema versioned in the repository. Score distribution per rubric over the pilot set published, with any resulting revision dated before the freeze. Corpus manifest sealed and hashed. Evaluators contacted and confirmed.                |
|        | 5–7       | Aug 31 – Sep 20 | Build the capture and wireframe module: screenshot at a fixed viewport, wireframe generation, and a check that the transformation preserves geometry.                                                                                                                                                                                                       | The wireframe of a fixture page reproduces element positions within a declared tolerance.                                                                                                                                                                           |
|        | 7–9       | Sep 14 – Oct 4  | Implement one skill per construct group against the frozen schema, package them as an installable plugin with the manifest each runtime expects, plus orchestrator integration. Capture the sealed corpus with the layer built in Phase 2 and record the capture date of every page.                                                                        | Each skill runs end to end on fixtures and emits schema-valid output, and the plugin installs and runs unmodified under both runtimes. Both representations of every page in the corpus captured and stored.                                                        |
|        | 8–11      | Sep 21 – Oct 18 | Run the human evaluation, which cannot start before ethics approval; see the contingency in Section 7.3. Evaluators score the corpus against the same rubric the system uses, independently and without access to system output.                                                | Inter-rater agreement computed among human evaluators, reported before any system comparison.                                                                                                                                                                       |
|        | 10–12     | Oct 5 – Oct 25  | Execute the pipeline over the sealed corpus: repetitions per construct group per page, on both agents, and on both channels for the structurally defined groups.                                                                                                                                                                                            | Per-trial artifacts persisted, including model identifier, prompt hash, and run index.                                                                                                                                                                              |
|        | 12–14     | Oct 19 – Nov 8  | Analysis: agreement per construct group, dispersion across repetitions, comparison between agents, comparison between channels.                                                                                                                                                                                                                             | Every aggregate figure traceable to the individual cases behind it.                                                                                                                                                                                                 |
|        | 14–15     | Nov 2 – Nov 15  | Write results, threats to validity, and limitations.                                                                                                                                                                                                                                                                                                        | Complete draft delivered to the advisor with the remaining thirteen days reserved for revision.                                                                                                                                                                     |
|        | 15–17     | Nov 16 – Nov 28 | Corrections, final document, and defense preparation.                                                                                                                                                                                                                                                                                                       | Final document submitted.                                                                                                                                                                                                                                           |
|        |           |                 |                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                     |

Phases overlap deliberately. Weeks 8 through 11 carry both the human study and implementation work. It is the busiest stretch of the term and the point where slippage is most likely.

## 7.2. Milestones

**Tabla 6. Milestones and completion conditions.**

| **Milestone**                      | **Target**       | **Condition**                                                                                                                                                                                  |
|:-----------------------------------|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| M1 — Laws selected, origins traced | Aug 30 (week 4)  | Eighteen laws selected, twelve exclusions justified, and every origin opened and recorded, including the entries for which no publication exists                                               |
| M2 — Protocol frozen               | Sep 13 (week 6)  | Rubrics, schema, protocol and corpus manifest dated and hashed before any run over the corpus, with the external calibration pilot completed and any rubric it revised dated before the freeze |
| M3 — Pipeline operational          | Oct 4 (week 9)   | Full path from URL to schema-valid output on fixtures                                                                                                                                          |
| M4 — Human ground truth complete   | Oct 18 (week 11) | Corpus scored by all evaluators, agreement computed                                                                                                                                            |
| M5 — Measurements complete         | Oct 25 (week 12) | All runs executed and persisted                                                                                                                                                                |
| M5b — Analysis complete            | Nov 8 (week 14)  | Agreement per group, dispersion, and the representation and implementation comparisons computed                                                                                                |
| M6 — Draft delivered               | Nov 15 (week 15) | Results, threats and limitations written and sent to the advisor                                                                                                                               |
| M7 — Final submission              | Nov 28           | Document delivered                                                                                                                                                                             |

## 7.3. Dependencies and Risks

One dependency is internal to the work and three sit outside it.

The internal one is the coupling between components. Every component is shared, so a delay in the orchestrator or the output schema stops the measurement for all seven construct groups at once. The mitigation is ordering: the schema is frozen at the protocol milestone in week 6, before any skill depends on it, and the groups are implemented against the frozen schema independently of one another.

The first external dependency is evaluator availability. The floor, and what happens if recruitment falls below it, are stated as a precondition of Objective 4.

The second is ethics approval, and it is separated here from the programme requirement it is often confused with. Filing satisfies the requirement, and on the advisor’s guidance a delayed response does not affect that. It does affect the schedule, because no session can be held before approval and M4 falls in week 11. The contingency is stated instead of assumed away, and it moves the sessions rather than the panel, because the panel size is what makes a biased rater identifiable and cutting it would discard a mitigation Section 6.3 relies on. Phase 4 opens in week 8; if approval has not arrived by then, the sessions slide into the slack between weeks 10 and 13 that Phase 5 and Phase 6 leave, and the schedule absorbs it. If approval has not arrived by week 13, Objective 4 is not executed. In that case the agreement analysis is declared not executed with the reason recorded, and the thesis reports what does not depend on a human reference: the instrument itself, the dispersion of its scores across repetitions, the representation comparison, and the implementation comparison. The main objective is then met in part and not in whole, and the document says which part, because the agreement term is the one that would go unanswered.

The third is access to model backends. The comparison between the two agent implementations assumes both remain available under the same terms for the duration of the term. If one becomes unavailable, the robustness comparison is dropped and the single-agent results are reported as such.

The remaining risks are internal. Low agreement between human evaluators would mean the rubric does not describe observable criteria clearly enough. That is a result about the difficulty of operationalizing these laws and belongs in the document instead of in a revision of the rubric. High dispersion across repetitions of the same input would mean the measurement is unstable, and that is reported too. Neither outcome leaves the thesis without content, and the schedule does not assume either one away.

## 7.4. Deliverables

Five artifacts are produced, and each is the object a specific objective is verified against.

1.  The seven rubrics, each accompanied by the provenance notes of the laws it subsumes, separating the original finding, the popularized formulation, and the operationalization adopted (Objective 1).

2.  The pre-registered protocol and the output schema it freezes, dated and hashed before the first run over the corpus, together with the sealed corpus manifest, the literature search record behind the claims in Section 3.2.3, and the calibration pilot: the score distribution each rubric produced over the external pilot set and any rubric revised in response, both dated before the freeze (Objective 2).

3.  The plugin: an open-source repository bundling the seven construct skills and the capture layer, installable into either agent runtime and executable there without modification, so that a reader can run the evaluation on their own pages (Objective 3).

4.  The annotated dataset: the corpus, the expert human scores under participant identifiers, and the per-trial system outputs with their run metadata (Objectives 4 and 5).

5.  The thesis document, reporting the profile per construct group, the pooled agreement, the representation and implementation comparisons, and the threats in Section 6.3 (Objectives 4 and 5).

All five are produced and released jointly by the three authors. The dataset and the repository accompany the document, so that any figure it reports can be recomputed from the artifacts without re-invoking a model.

# Appendix A. Corpus

The corpus is thirty publicly reachable Colombian web pages in three strata of ten. Every entry was opened and confirmed to resolve, to be reachable without authentication, and to be the page it is named as, on 21 August 2026. The authoritative record is the versioned manifest `corpus/corpus-v1.csv` in the project repository, which carries the exact URL, the page type, the verification date, and the capture date for each case.

**Tabla 7. The thirty pages of the corpus, by stratum.**

| **Health**                  | **Government**          | **Familiar**             |
|:----------------------------|:------------------------|:-------------------------|
| Ministerio de Salud         | Portal Único del Estado | Universidad de los Andes |
| Instituto Nacional de Salud | DIAN                    | Bancolombia Personas     |
| INVIMA                      | Registraduría Nacional  | Éxito                    |
| ADRES                       | Colpensiones            | Avianca                  |
| Superintendencia de Salud   | ICBF                    | El Tiempo                |
| Nueva EPS                   | RUNT                    | Falabella Colombia       |
| Salud Total EPS             | Alcaldía de Bogotá      | Claro Personas           |
| EPS SURA                    | Policía Nacional        | Homecenter               |
| EPS Sanitas                 | TransMilenio            | Rappi Colombia           |
| Cruz Roja Colombiana        | Ministerio de Educación | Seguros SURA             |

## A.1. Rationale for the Strata

Strata vary along the dimension the system is expected to be sensitive to. Health and government pages are produced under procurement constraints, regulatory content obligations, and institutional review cycles that frequently push against the principles being measured. The third stratum collects pages the authors use as ordinary consumers, produced by organizations that employ design teams, and it supplies the contrast. If the scores do not separate these strata at all, that is evidence about the instrument, not about the pages.

One stratum is also constrained by law. Colombian state web properties are subject to accessibility directives issued by the Ministry of Information Technologies, and the government stratum is made up of them. Five entries in the health stratum are state bodies and fall under the same directives. Of the remaining five, four are health insurers (EPS) and one, the Cruz Roja Colombiana, is a humanitarian organization; whether each falls under the same directives depends on its legal status and its share of public funds, which the manifest records case by case. **\[PENDIENTE: confirmar, entidad por entidad, cuáles de esas cinco quedan cubiertas por la directiva de MinTIC, y registrar la norma exacta con su número y año en el manifiesto. Lo hace el equipo antes de M2\]** Any difference in score between strata has to be read with that split in mind.

## A.2. Selection and Its Limits

Ten pages per stratum is a bound set by the cost of the human evaluation, not a sample size derived from a power calculation. The corpus is a purposive sample and not a random one. Within each stratum the entries were chosen to span organization types and were not drawn from an enumerable population, so no claim about Colombian web pages in general follows from a result on this corpus.

Every case is the entry page of its site, with three exceptions marked in the manifest where the entry page redirects into a section. Entry pages were chosen because every site has one and because they are comparable across all thirty cases. The cost is that they exercise navigation and hierarchy more than they exercise forms, so the construct groups whose criteria concern input and transactional flow are evaluated on weaker evidence than the rest. This is recorded as a limitation of the corpus, not corrected by mixing page types, a trade of comparability for coverage.

## A.3. Capture Conditions

Pages change. A case whose page changes between the human evaluation and the system run is invalid, so the manifest records a capture date per case and the captured artifacts are stored and reused instead of re-fetched. The viewport is fixed at the value declared in the protocol and recorded with every run.

Capture requires a real browser, not an HTTP client. Several candidate pages examined during selection returned only an application shell to a plain fetch, with all content rendered client-side, and the same is true of some included entries. Verification also turned up two conditions that constrain the capture layer: some Colombian sites disallow automated agents in `robots.txt`, and others sit behind a web application firewall that challenges non-interactive clients. Pages exhibiting either condition were excluded from the corpus at selection time, so that capture never requires circumventing an access control.

The policy is written down. Capture is limited to pages that serve their content to an ordinary browser session without a challenge.

# Appendix B. Determination of the Number of Evaluators

The number of human evaluators is fixed at four, with three as a declared floor. This appendix gives the calculation behind that figure. The full simulation is in `power/` in the project repository and reproduces with `numpy` alone.

## B.1. What Is Being Estimated

Agreement is measured with the weighted Brennan-Prediger coefficient (Brennan and Prediger 1981), which corrects for chance using a uniform model instead of the observed marginals. That choice matters here because the scores are expected to concentrate in the middle of the scale. Most pages are neither critical nor exemplary, and a coefficient that derives its chance correction from observed marginals is distorted precisely under that condition, which Sim and Wright (2005) identify as the prevalence problem. With five categories and quadratic weights the chance term is fixed at $p_e = 0.75$.

## B.2. Method

Rather than apply a closed-form table built for two raters and a dichotomous outcome, the design was simulated directly. Each page carries a latent quality per construct group drawn from a standard normal; each evaluator observes that latent value plus independent noise and discretizes it into the five levels at fixed cut points. The noise is calibrated by bisection so that the population coefficient lands at 0.60, 0.75, and 0.85. Four thousand replications per cell give the sampling distribution, and the half-width of its central 95% interval is reported.

The implementation was validated before use. Perfect agreement returns 1.000 and uniformly random ratings return 0.001.

## B.3. Result

Table 8 gives the half-width of the 95% interval.

**Tabla 8. Half-width of the 95% interval on weighted Brennan-Prediger, by number of evaluators.**

| **Scope and true value**              | **2** | **3** | **4** | **5** | **7** |
|:--------------------------------------|------:|------:|------:|------:|------:|
| One group (30 units), $\kappa = 0.75$ | 0.133 | 0.094 | 0.078 | 0.071 | 0.060 |
| One group (30 units), $\kappa = 0.60$ | 0.208 | 0.150 | 0.124 | 0.109 | 0.094 |
| Pooled (210 units), $\kappa = 0.75$   | 0.051 | 0.037 | 0.030 | 0.027 | 0.022 |
| Pooled (210 units), $\kappa = 0.60$   | 0.079 | 0.058 | 0.047 | 0.041 | 0.036 |

Precision is not what settles the number. Moving from three evaluators to five narrows the interval on a single group from $\pm0.094$ to $\pm0.071$, at a cost of two additional recruits for 0.023. Moving from 30 units to 210 with the same three evaluators narrows it from $\pm0.094$ to $\pm0.037$. Units dominate evaluators. That is the conclusion Sim and Wright (2005) reach for the two-rater case and which holds here for the multi-rater one.

What settles the number is robustness to a systematically biased evaluator. When evaluators differ in severity, with a standard deviation of 0.50 on the latent scale, three evaluators yield $\pm0.278$ around a coefficient that has itself fallen from 0.75 to 0.62, and nothing in that result identifies which evaluator diverged. Four narrow it to $\pm0.222$ and, more usefully, make the outlying evaluator identifiable against the other three. A fifth evaluator buys 0.007 of half-width and does not justify the recruitment cost.

## B.4. Consequence for Reporting

The table has a consequence the analysis must respect. At 30 units, a per-group coefficient of 0.70 with four evaluators carries a lower bound near 0.60, straddling the conventional boundary between moderate and substantial agreement. A per-group figure therefore cannot support a claim about which band a group falls in.

The pooled coefficient over all 210 unit-group pairs is accordingly the confirmatory result, and per-group coefficients are reported as exploratory, with their intervals, and are used to rank groups and not to classify them. Following Sim and Wright (2005), the lower bound of the interval is evaluated against a stated minimum instead of zero; the minimum is fixed in the protocol before measurement.

## B.5. Limitations of This Calculation

The simulation assumes independent evaluator noise and identical cut points across evaluators. A severe or lenient evaluator violates the second. That is why the table above quantifies that case separately. The figures are a design aid and not a guarantee. Results report an interval computed by bootstrap over the observed data, not taken from this table.

# Appendix C. A Worked Rubric

The claim that an anchored rubric is a stricter instrument than a one-sentence heuristic is central to this proposal, so one rubric is given in full. G2 is used because it is the group where the distance between the source finding and the operationalization is largest, and that puts the declarations the format requires in plain view.

## C.1. G2 — Choice Architecture

|                   |                                                                                                                                              |
|:------------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| **Laws subsumed** | Hick’s Law; Choice Overload                                                                                                                  |
| **Channel**       | Wireframe                                                                                                                                    |
| **Measures**      | The number and organization of alternatives the interface presents at one level, and whether a dominant action is distinguishable among them |

### C.1.1. Procedure

1.  Enumerate every actionable element: navigation items, buttons, links, form fields, filters, tabs, clickable cards. Record $n_{\text{total}}$.

2.  Identify the visual groups. Grouped options do not compete simultaneously, so record $n_{1}$, the number of first-level groups the user faces at once, and $n_{\max}$, the largest number of options inside a single group. This step is what separates the measurement from counting buttons.

3.  Determine whether one action dominates or several compete at equal weight. Absence of hierarchy is a violation even when the count is low.

4.  Score against the levels below.

5.  Where the score is 2 or lower, write recommendations naming the specific group or element.

### C.1.2. Levels

|       |                                                                                                                                            |
|:-----:|:-------------------------------------------------------------------------------------------------------------------------------------------|
| **0** | $n_{1} > 12$ with no grouping, or no distinguishable primary action on a screen whose purpose requires a decision                          |
| **1** | $n_{1}$ between 9 and 12, weak grouping, several actions competing at equal visual weight                                                  |
| **2** | $n_{1}$ between 6 and 8 with partial grouping; a primary action exists but does not dominate                                               |
| **3** | $n_{1} \leq 5$ with coherent groups; the primary action is clear                                                                           |
| **4** | As level 3, and the interface actively reduces decision load through progressive disclosure, sensible defaults, or sequencing of decisions |

### C.1.3. Required Output

An object conforming to the shared schema, carrying `group_id: "g2"`, `channel: "wireframe"`, and, in every finding, the raw values $n_{\text{total}}$, $n_{1}$ and $n_{\max}$. A score without those numbers is not auditable. Where the screen presents no decision, the group is marked `not_applicable` and excluded from the aggregate. No violation is invented to fill the slot.

### C.1.4. Declarations

Wherever the scores of this rubric are reported, they carry two statements with them.

The thresholds are a convention of this project adopted for reproducibility. They are not derived from the source. Hick (1952) measured reaction time over equiprobable, meaningless alternatives and reported an information rate, not a number of acceptable buttons, and Proctor and Schneider (2018) report that the slope of the relation varies from zero upward with stimulus–response compatibility and practice.

The rubric measures choice architecture, the property a designer manipulates, and not choice reaction time. Liu et al. (2020) argue that the familiar design principle does not follow from Hick’s Law, and that a logarithmic latency function favors presenting more options at once, not fewer. This rubric does not claim otherwise. It scores the organization of alternatives on the grounds that organization is what the two subsumed laws jointly concern, and it records the disagreement in the literature instead of resolving it by assertion.

The remaining six rubrics follow this structure and are versioned in the repository alongside the schema they emit.

# References

- Agent Skills. 2026. “Agent Skills: A Standardized Way to Give AI Agents New Capabilities.” <https://agentskills.io>.

- Anthropic. 2026a. “Create Plugins.” <https://code.claude.com/docs/en/plugins>.

- Anthropic. 2026b. “Extend Claude with Skills.” <https://code.claude.com/docs/en/skills>.

- Baddeley, Alan D., and Graham Hitch. 1974. “Working Memory.” In *The Psychology of Learning and Motivation*, edited by Gordon H. Bower, 8:47–89. Academic Press.

- Benway, Jan Panero. 1998. “Banner Blindness: The Irony of Attention Grabbing on the World Wide Web.” In *Proceedings of the Human Factors and Ergonomics Society Annual Meeting*, 42:463–67. <https://doi.org/10.1177/154193129804200504>.

- Brennan, Robert L., and Dale J. Prediger. 1981. “Coefficient Kappa: Some Uses, Misuses, and Alternatives.” *Educational and Psychological Measurement* 41 (3): 687–99. <https://doi.org/10.1177/001316448104100307>.

- Chrome DevTools Protocol. 2026. “DOMSnapshot Domain.” <https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/>.

- Cowan, Nelson. 2001. “The Magical Number 4 in Short-Term Memory: A Reconsideration of Mental Storage Capacity.” *Behavioral and Brain Sciences* 24 (1): 87–185.

- Deque Systems. 2026. “The Automated Accessibility Coverage Report.” <https://www.deque.com/automated-accessibility-coverage-report/>.

- Duan, Peitong, Chin-yi Chen, Gang Li, Bjoern Hartmann, and Yang Li. 2024. “UICrit: Enhancing Automated Design Evaluation with a UI Critique Dataset.” In *Proceedings of the 37th Annual ACM Symposium on User Interface Software and Technology (UIST ’24)*. <https://doi.org/10.1145/3654777.3676381>.

- Fitts, Paul M. 1954. “The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement.” *Journal of Experimental Psychology* 47 (6): 381–91.

- Glanzer, Murray, and Anita R. Cunitz. 1966. “Two Storage Mechanisms in Free Recall.” *Journal of Verbal Learning and Verbal Behavior* 5 (4): 351–60.

- Guerino, Guilherme, Luiz Rodrigues, Bruna Capeleti, Rafael Ferreira Mello, André Freire, and Luciana Zaina. 2026. “Can GPT-4o Evaluate Usability Like Human Experts? A Comparative Study on Issue Identification in Heuristic Evaluation.” In *Human-Computer Interaction – INTERACT 2025*, edited by Carmelo Ardito, Simone Diniz Junqueira Barbosa, Tayana Conte, André Freire, Isabela Gasparini, Philippe Palanque, and Raquel Prates, 16110:381–402. Lecture Notes in Computer Science. Cham: Springer. <https://doi.org/10.1007/978-3-032-05005-2_20>.

- Hertzum, Morten, and Niels E. Jacobsen. 2003. “The Evaluator Effect: A Chilling Fact about Usability Evaluation Methods.” *International Journal of Human–Computer Interaction* 15 (1): 183–204. <https://doi.org/10.1207/S15327590IJHC1501_14>.

- Hick, William E. 1952. “On the Rate of Gain of Information.” *Quarterly Journal of Experimental Psychology* 4 (1): 11–26. <https://doi.org/10.1080/17470215208416600>.

- Hunt, R. Reed. 1995. “The Subtlety of Distinctiveness: What von Restorff Really Did.” *Psychonomic Bulletin & Review* 2 (1): 105–12. <https://doi.org/10.3758/BF03214414>.

- Ivory, Melody Y., and Marti A. Hearst. 2001. “The State of the Art in Automating Usability Evaluation of User Interfaces.” *ACM Computing Surveys* 33 (4): 470–516. <https://doi.org/10.1145/503112.503114>.

- Iyengar, Sheena S., and Mark R. Lepper. 2000. “When Choice Is Demotivating: Can One Desire Too Much of a Good Thing?” *Journal of Personality and Social Psychology* 79 (6): 995–1006.

- Khalil, Mahmoud, and Umair Rehman. 2026. “Can Multimodal LLMs Model Expert Ratings in Mobile UI Usability Evaluation?” In *Human-Centered Design, Operation and Evaluation of Mobile Communications*, edited by June Wei and George Margetis, 16747:202–16. Lecture Notes in Computer Science. Cham: Springer. <https://doi.org/10.1007/978-3-032-30549-7_12>.

- Kivetz, Ran, Oleg Urminsky, and Yuhuang Zheng. 2006. “The Goal-Gradient Hypothesis Resurrected: Purchase Acceleration, Illusionary Goal Progress, and Customer Retention.” *Journal of Marketing Research* 43 (1): 39–58.

- Liu, Wanyu, Julien Gori, Olivier Rioul, Michel Beaudouin-Lafon, and Yves Guiard. 2020. “How Relevant Is Hick’s Law for HCI?” In *Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems*, 1–12. ACM. <https://doi.org/10.1145/3313831.3376878>.

- Miller, George A. 1956. “The Magical Number Seven, Plus or Minus Two: Some Limits on Our Capacity for Processing Information.” *Psychological Review* 63 (2): 81–97.

- Nielsen, Jakob. 2000. “End of Web Design.” <https://www.nngroup.com/articles/end-of-web-design/>.

- Nielsen, Jakob, and Rolf Molich. 1990. “Heuristic Evaluation of User Interfaces.” In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI ’90)*, 249–56. ACM. <https://doi.org/10.1145/97243.97281>.

- OpenAI. 2026. “Codex Agent Skills.” <https://learn.chatgpt.com/docs/build-skills>.

- Ouyang, Shuyin, Jie M. Zhang, Mark Harman, and Meng Wang. 2025. “An Empirical Study of the Non-Determinism of ChatGPT in Code Generation.” *ACM Transactions on Software Engineering and Methodology*. <https://doi.org/10.1145/3697010>.

- Palmer, Stephen E. 1992. “Common Region: A New Principle of Perceptual Grouping.” *Cognitive Psychology* 24 (3): 436–47.

- Palmer, Stephen E., and Irvin Rock. 1994. “Rethinking Perceptual Organization: The Role of Uniform Connectedness.” *Psychonomic Bulletin & Review* 1 (1): 29–55. <https://doi.org/10.3758/BF03200760>.

- Proctor, Robert W., and Darryl W. Schneider. 2018. “Hick’s Law for Choice Reaction Time: A Review.” *Quarterly Journal of Experimental Psychology* 71 (6): 1281–99. <https://doi.org/10.1080/17470218.2017.1322622>.

- Scheibehenne, Benjamin, Rainer Greifeneder, and Peter M. Todd. 2010. “Can There Ever Be Too Many Options? A Meta-Analytic Review of Choice Overload.” *Journal of Consumer Research* 37 (3): 409–25.

- Sim, Julius, and Chris C. Wright. 2005. “The Kappa Statistic in Reliability Studies: Use, Interpretation, and Sample Size Requirements.” *Physical Therapy* 85 (3): 257–68.

- Sweller, John. 1988. “Cognitive Load During Problem Solving: Effects on Learning.” *Cognitive Science* 12 (2): 257–85.

- Wertheimer, Max. 1923. “Untersuchungen Zur Lehre von Der Gestalt. II.” *Psychologische Forschung* 4: 301–50. <https://doi.org/10.1007/BF00410640>.

- Yablonski, Jon. 2024. *Laws of UX: Using Psychology to Design Better Products and Services*. 2nd ed. O’Reilly Media.

- Yablonski, Jon. 2026. “Laws of UX.” <https://lawsofux.com/>.
