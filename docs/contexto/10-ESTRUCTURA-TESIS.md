# Estructura del documento de tesis

Versión 1 · 10 de septiembre de 2026. Recoge lo que el asesor indicó sobre el formato: el
documento arranca con la propuesta formal y sigue con el funcionamiento por ley agrupada,
las rúbricas, y después el desarrollo del plugin.

Este archivo no es la tesis. Es el esqueleto con el que se escribe: qué va en cada sección,
de dónde sale el material, y qué falta. Una sección sin fuente declarada es una sección que
todavía no se puede escribir.

---

## Regla que gobierna todo el documento

**Nada se escribe dos veces.** Cada afirmación tiene un solo lugar canónico y el resto
remite. Un documento de tesis que repite su propio contenido acumula versiones que se
contradicen, y este proyecto ya perdió tiempo por exactamente eso.

Y una regla de generación: **el apéndice de rúbricas y la descripción de cada skill salen
del repositorio**, no se transcriben. `node scripts/build-appendix.js` los produce. Si la
rúbrica cambia, el apéndice cambia con ella.

---

## Índice

### Parte I — La propuesta (capítulos 1 a 5)

Es la propuesta formal entregada, incorporada al documento. Cambia poco: se actualizan las
fechas, se resuelven los `[PENDIENTE]` y se incorporan las correcciones posteriores a la
entrega, marcadas como tales.

| Cap. | Sección | Fuente | Estado |
|---|---|---|---|
| 1 | Contexto | `01-PROPUESTA-FORMAL.md` §1 | Listo |
| 2 | Aproximación al problema | §2 | Listo |
| 3 | Marco conceptual y estado del arte | §3 | Listo. Falta incorporar los cuatro trabajos que la revisión por pares encontró y la propuesta no citaba |
| 4 | Pregunta de investigación | §4 | Listo |
| 5 | Justificación y objetivos | §5, §6 | Listo |

**Trabajo real de esta parte:** el registro de la búsqueda bibliográfica (`[PENDIENTE 1]`),
sin el cual las tres afirmaciones de ausencia del §3.2.3 no se sostienen ante un jurado.

### Parte II — El instrumento (capítulos 6 a 8)

Es lo que se presentó en la semana 6, escrito como documento.

**Cap. 6 — De treinta leyes a siete grupos de constructo**

- 6.1 Los dos criterios de selección y las doce exclusiones. Fuente: propuesta §3.1.4, tablas 1 y 2.
- 6.2 Por qué el puntaje se emite por grupo y no por ley. Fuente: propuesta §3.1.6.
- 6.3 Las dieciocho leyes y su procedencia verificada, en tres capas separadas: hallazgo
  empírico original con sus condiciones, formulación divulgativa, operacionalización.
  Fuente: propuesta tabla 3 y `02-ESPECIFICACION-LEYES.md`.
- 6.4 Las tres leyes sin publicación primaria, declaradas. Fuente: propuesta §3.1.5.

**Cap. 7 — Cómo se evalúa cada ley**

Una sección por grupo, siete en total. Cada una responde tres preguntas: qué mide el grupo,
cómo se evalúa cada ley que subsume con un ejemplo concreto, y qué necesita del wireframe.
Fuente: `02-ESPECIFICACION-LEYES.md`, que ya está escrito con esa estructura.

Acá van los cuatro casos que muestran el rango del problema, y conviene que estén juntos
porque juntos son el argumento: Proximidad, donde el canal sirve perfectamente; Hick, donde
hubo que angostar el constructo; G6, donde ninguna de las tres leyes tiene base empírica; y
Fitts, donde solo la mitad del índice de dificultad es observable en una captura.

**Cap. 8 — Las rúbricas**

- 8.1 La escala ordinal anclada 0–4, común a los siete grupos, y por qué ordinal y no
  intervalar. Fuente: `04-DECISIONES-Y-ESCALA.md`.
- 8.2 La anatomía de una rúbrica: entradas, procedimiento, condiciones observables, niveles,
  salida requerida, no aplicable, declaraciones.
- 8.3 Una rúbrica completa en el cuerpo del documento, como caso trabajado. G2 —está en la
  propuesta como Apéndice C— porque es donde la distancia entre el hallazgo y la
  operacionalización es mayor.
- 8.4 Las ocho decisiones de implementación congeladas, con su justificación.
- **Apéndice: las siete rúbricas completas, generado desde el repositorio.**

> **Sobre pegar los `SKILL.md` en el documento.** Sí, completos, pero en el apéndice y
> generados, no en el cuerpo y no transcritos. En el cuerpo va una sola rúbrica como caso
> trabajado más la anatomía. Razón: la rúbrica **es** el instrumento y un jurado tiene que
> poder leerla entera para juzgar si ancla; pero siete rúbricas de mil palabras en medio del
> argumento lo entierran. Y generarlas evita el problema real, que es que la rúbrica del
> documento diga una cosa y la que se ejecutó diga otra.

### Parte III — El sistema (capítulos 9 a 11)

Es lo que hay que construir. Acá está el trabajo de las próximas semanas.

**Cap. 9 — La capa de captura**

- 9.1 De URL a cuatro artefactos: screenshot, wireframe, `nodes.json`, `meta.json`.
- 9.2 Por qué el wireframe se genera desde el árbol de layout y no segmentando la imagen.
- 9.3 **La caja de tinta.** Por qué la caja de layout no es lo que el ojo ve, qué se midió y
  qué se decidió. Fuente: `09-CORRECCION-WIREFRAME.md` / `docs/adr-01-caja-de-tinta.md`.
- 9.4 El archivo paralelo: los ocho campos y qué grupo usa cada uno.
- 9.5 Verificación de fidelidad: geométrica y de tinta, con controles negativos.
- 9.6 Lo que el wireframe no puede dar.

**Cap. 10 — El plugin**

- 10.1 Skill y plugin: la unidad portable y la unidad de distribución. Por qué el artefacto
  se entrega como plugin instalable y no como código de la tesis.
- 10.2 Arquitectura del repositorio: una sola carpeta canónica de skills, manifiestos por
  runtime, esquema compartido.
- 10.3 Anatomía de una skill: frontmatter, entradas, procedimiento, salida.
- 10.4 El orquestador: por qué no contiene ningún juicio de evaluación.
- 10.5 El esquema de salida y las tres decisiones codificadas en él.
- 10.6 Claude Code y Codex: qué difiere y qué no. Las mismas `SKILL.md` bajo dos runtimes.

Fuente: `05-ARQUITECTURA-PLUGIN.md`, que ya cubre 10.1 a 10.5.

**Cap. 11 — Cómo se usa**

- 11.1 Instalación por comando.
- 11.2 **Instalación por prompt.** Un bloque de texto que el lector copia en su agente, con
  el enlace del repositorio. Es la forma en que la mayoría de los lectores lo van a usar y
  merece estar en el cuerpo, no en un README.
- 11.3 Una auditoría completa de ejemplo, de principio a fin, sobre una página que no es del
  corpus.
- 11.4 Cómo leer la salida: el perfil por grupo, el `trigger`, los `measurements`.

> **Sobre el prompt de instalación.** Hay que fijar dos cosas antes de escribirlo. Primero,
> **el documento debe citar un tag congelado con su hash**, no la rama principal: un lector
> que instale la tesis dentro de un año tiene que obtener lo que la tesis describe.
> Segundo, un prompt de instalación depende de que el agente del lector tenga red y pueda
> escribir en disco, y eso hay que declararlo junto al prompt en vez de suponerlo. Van las
> dos vías: comando para quien quiera control, prompt para quien quiera probarlo rápido.

### Parte IV — La medición (capítulos 12 a 14)

**Cap. 12 — Diseño del estudio**

Corpus y su sellado; el protocolo pre-registrado; la grilla de ejecución (repeticiones ×
runtimes × canales); el panel humano, su tamaño derivado por simulación y su entrenamiento;
el estadístico de acuerdo y por qué Brennan–Prediger con pesos cuadráticos.
Fuente: propuesta §6.2 y apéndices A y B.

**Cap. 13 — Resultados**

Acuerdo por grupo contra la referencia humana; dispersión entre repeticiones; comparación
entre canales; comparación entre runtimes; la ablación de la caja de tinta. Cada agregado
acompañado de los datos por caso que lo componen.

**Cap. 14 — Discusión, amenazas y limitaciones**

Las amenazas de la propuesta, actualizadas con lo que la medición mostró. Las tres nuevas
que salieron después de la entrega: el acuerdo no es utilidad; el desacuerdo puede no ser
culpa de la rúbrica; el wireframe consume información de color.

### Parte V — Cierre

Conclusiones · Trabajo futuro · Referencias · Apéndices (corpus, potencia, rúbricas
generadas, protocolo congelado, registro de búsqueda).

---

## Qué existe y qué no

| Parte | Ya escrito | Falta |
|---|---|---|
| I — Propuesta | Todo | Registro de búsqueda; incorporar los cuatro trabajos adyacentes |
| II — Instrumento | Casi todo, en los `.md` de esta carpeta | Redacción como capítulo continuo |
| III — Sistema | Capítulo 9 casi completo; 10 en borrador | Las siete skills implementadas, el orquestador, el plugin publicado, el capítulo 11 entero |
| IV — Medición | El diseño está en la propuesta | Todos los resultados |
| V — Cierre | Nada | Todo |

La parte II es la que está más adelantada y es la que el asesor pidió para esta semana. La
parte III es el trabajo de las próximas cuatro semanas y es lo que decide si hay tesis o
hay demo.
