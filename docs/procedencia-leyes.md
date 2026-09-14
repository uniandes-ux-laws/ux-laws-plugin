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

### las seis categorías de distancia

### las tres entradas sin publicación primaria

---

## L01 · Proximidad — Law of Proximity

grupo: G1
responsable: D
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L02 · Prägnanz — Law of Prägnanz

grupo: G1
responsable: M
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L03 · Región común — Law of Common Region

grupo: G1
responsable: JF
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L04 · Similitud — Law of Similarity

grupo: G1
responsable: JF
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L05 · Ley de Hick — Hick's Law

grupo: G2
responsable: D
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L06 · Sobrecarga de elección — Choice Overload

grupo: G2
responsable: M
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L07 · Ley de Miller — Miller's Law

grupo: G3
responsable: JF
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L08 · Chunking — Chunking

grupo: G3
responsable: JF
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L09 · Memoria de trabajo — Working Memory

grupo: G3
responsable: M
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L10 · Carga cognitiva — Cognitive Load

grupo: G3
responsable: M
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L11 · Efecto Von Restorff — Von Restorff Effect

grupo: G4
responsable: D
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L12 · Atención selectiva — Selective Attention

grupo: G4
responsable: D
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L13 · Efecto de posición serial — Serial Position Effect

grupo: G5
responsable: M
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L14 · Efecto de gradiente de meta — Goal-Gradient Effect

grupo: G5
responsable: JF
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L15 · Navaja de Occam — Occam's Razor

grupo: G6
responsable: D
sin_publicacion_primaria: sí

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L16 · Ley de Tesler — Tesler's Law

grupo: G6
responsable: JF
sin_publicacion_primaria: sí

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L17 · Ley de Jakob — Jakob's Law

grupo: G6
responsable: M
sin_publicacion_primaria: sí

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado

---

## L18 · Ley de Fitts — Fitts's Law

grupo: G7
responsable: D
sin_publicacion_primaria: no

### fuente primaria

### verificación

### hallazgo y condiciones

### formulación divulgativa

### operacionalización

### salto declarado
