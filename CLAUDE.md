# CLAUDE.md

Instrucciones para trabajar en este repositorio. Léelas completas antes de tocar nada.

---

## 1. Qué es esto

Trabajo de grado de pregrado en Ingeniería de Sistemas, Universidad de los Andes, término
2026-20. **David Hernández** (202220865), **Mateo Rincón** (202221402), **Juan Francisco
Rodríguez** (202214603). Asesor: **Camilo Escobar Velásquez**.

Un sistema que toma una URL, la captura a viewport fijo, produce dos representaciones de la
misma pantalla —el screenshot y un wireframe generado desde el árbol de layout del navegador—
y puntúa **siete grupos de constructo** derivados de dieciocho Laws of UX, en una escala
ordinal anclada de 0 a 4.

**La contribución no es la herramienta sino la medición**: establecer hasta qué punto esos
puntajes corresponden al juicio experto humano, cuáles principios admiten un criterio
observable y cuáles resisten, y cuánto de la salida es estable y cuánto es artefacto de una
corrida concreta.

El artefacto se entrega como plugin instalable en dos runtimes de agente. Un resultado que
nadie más puede re-correr sobre una página propia es una afirmación sobre treinta páginas
colombianas y nada más.

Todo el contexto está en **`docs/contexto/`**. Empieza por `00-INDICE.md`.

## 2. Cómo tratar a David

Es el investigador, no un usuario casual. Prioriza precisión sobre velocidad.

- **Toma las decisiones técnicas tú.** Cuando pida "la mejor decisión para el grupo", decide
  y justifica; no devuelvas una lista de opciones para que él escoja.
- **Respuestas concisas.** Sin preámbulos ni relleno. Pregunta puntual, respuesta puntual.
- **Español**, salvo términos técnicos y código.
- **No le pidas que copie y pegue errores.** Tienes el repositorio: corre los comandos, lee
  las salidas, diagnostica. Solo pídele que ejecute algo cuando de verdad no puedas hacerlo.
- **Si algo que propusiste tiene un defecto, dilo al principio de la respuesta**, no
  enterrado al final.

## 3. Reglas que gobiernan el trabajo

Estas no se re-litigan sin evidencia nueva. Si algo las contradice, deténte y señálalo.

### Citas y fuentes

- **Ninguna cita sin abrir.** Toda fuente, paper, librería o versión se verifica en el
  momento, no se recuerda. Si no la pudiste verificar, dilo: "no pude confirmar X" es
  aceptable; presentarlo como hecho no lo es.
- **Nunca inventes una cita.** Ni autor, ni año, ni volumen, ni páginas, ni DOI. Una
  referencia fabricada en un trabajo de grado es una falta grave.
- **`lawsofux.com` no es autoridad de una ley.** Es divulgación. Cada ley se cita por su
  fuente primaria verificada. Distingue siempre tres capas y no las mezcles: el hallazgo
  empírico original con sus condiciones, la formulación divulgativa, y nuestra
  operacionalización. El salto de la primera a la tercera es donde vive el riesgo de validez
  de esta tesis.
- Varias "leyes" son heurísticas de industria y no hallazgos empíricos —Jakob, Tesler, Occam
  aplicado a UI—. Cuando aparezcan, dilo en vez de vestirlas de ciencia.

### Medición

- **Ningún puntaje sin rúbrica** de criterios observables definida antes de puntuar.
- **Ningún puntaje sin varianza.** Reporta repeticiones y dispersión. Un puntaje que oscila
  entre corridas es un hallazgo, no un problema a esconder.
- **Ningún puntaje sin ground truth.** La validación es contra evaluación humana experta con
  acuerdo entre evaluadores. Sin eso no hay tesis, hay demo.
- **El perfil por grupo es el resultado primario.** Un total con ponderación uniforme haría
  que G7, que subsume una ley, pesara lo mismo que G1, que subsume cuatro.
- **Vigila el doble conteo.** Si dos criterios miden el mismo constructo, dilo.

### Escritura

- Registro sobrio. Nada de "revolucionario" ni "innovador". El aporte se demuestra.
- Cada afirmación soportada o marcada como supuesto. "No ha sido estudiado" es verificable y
  hay que haberlo verificado.
- **No rellenes.** Si falta información, escribe `[PENDIENTE: qué falta exactamente y quién
  lo consigue]`. Un párrafo inventado que suena bien es peor que un hueco visible.
- Toda propuesta lleva limitaciones. Una sección de limitaciones honesta suma credibilidad.

### Decisiones técnicas

Nunca entregues una decisión sin justificarla: **POR QUÉ** (razón y alternativas descartadas,
con el trade-off explícito) y **CÓMO** (forma concreta de implementarlo). Estructura:
decisión → justificación → implementación → documentación.

## 4. Decisiones congeladas

No las cambies sin discutirlo. Están todas en `docs/contexto/04-DECISIONES-Y-ESCALA.md`.

| | |
|---|---|
| **Alcance** | Una sola pantalla. Viewport 1440×900, solo lo visible sin scroll, nunca página completa |
| **Doble canal** | Cada grupo se puntúa sobre la representación donde su criterio es medible |
| **Escala** | Ordinal anclada 0–4, común a los siete grupos. Ordinal, no intervalar: pesos cuadráticos |
| **Unidad de puntaje** | El grupo de constructo, **nunca la ley individual**. La ley es unidad de procedencia |
| **Fuera de alcance v1** | Leyes temporales: Doherty, Flow, Goal-Gradient, Zeigarnik, Parkinson. No son observables en una captura estática. Si te piden evaluarlas sobre una imagen fija, recuerda esta restricción en vez de inventar una medición |
| **Carpeta canónica** | Una sola, `skills/`. `.claude/skills` y `.agents/skills` son generados y van en `.gitignore` |
| **`trigger` obligatorio** | Todo puntaje nombra la condición observable que fijó el nivel |
| **Evaluadores humanos** | Puntúan la **página renderizada**, nunca el wireframe |

### Los siete grupos

| | Constructo | Leyes subsumidas | Canal |
|---|---|---|---|
| G1 | Agrupación perceptual | Proximidad · Prägnanz · Región común · Similitud | Wireframe |
| G2 | Arquitectura de decisión | Hick · Sobrecarga de elección | Wireframe |
| G3 | Capacidad y segmentación | Miller · Chunking · Memoria de trabajo · Carga cognitiva | Wireframe |
| G4 | Saliencia visual | Von Restorff · Atención selectiva | **Screenshot** |
| G5 | Posición y progreso | Posición serial · Gradiente de meta | Wireframe |
| G6 | Economía y convención | Occam · Tesler · Jakob | Wireframe |
| G7 | Targeting motor | Fitts | Wireframe |

## 5. La capa de captura

Lo más importante que hay que entender antes de tocar `capture/`.

### Dos cajas por nodo

```
bounds  la caja que el motor de layout le dio al nodo
ink     la extension que una persona ve:
          - su propia caja, si pinta frontera visible: background-color con
            alfa > 0, background-image, borde u outline con ancho > 0 y estilo
            visible, box-shadow, o elemento reemplazado
          - si no pinta ninguna, la union de la tinta de lo que contiene
          - null si no muestra nada
```

**G1, G2, G3, G5 y G6 miden sobre `ink`. G7 mide sobre `bounds`** y es la única excepción:
Fitts mide el área que acepta el clic, no la que se ve, y el mínimo de la WCAG está definido
sobre esa misma área. Detalle completo en `docs/adr-01-caja-de-tinta.md`.

### Reglas del generador

- El wireframe se genera **desde el árbol de layout**, nunca segmentando la imagen. Un
  segmentador mete un segundo modelo cuyos errores caen en el mismo pipeline.
- **No se dibuja el contorno de un nodo que no pinta frontera visible.** Pondría un borde en
  el wireframe que no está en la pantalla.
- **Solo ocluye lo que pinta superficie opaca.** Un div transparente a pantalla completa no
  tapa nada; tratarlo como opaco borró el encabezado entero de INVIMA.
- **Solo entran nodos que tocan el área visible.** El árbol de layout describe el documento
  completo; entre el 78 % y el 98 % de los nodos caían fuera de la pantalla.
- **Los interstitials se descartan antes de capturar** con un catálogo cerrado y fechado
  (`capture/dismiss.js`, versión 2026-09-10). Cookies, ubicación, avisos. **No** se tocan
  encabezados fijos, navegación pegajosa ni chats: eso es la interfaz que se evalúa.
- **Si un `visible` sale `null`** —el motor no reportó los estilos— el nodo conserva su caja.
  La regla nunca borra sobre falta de evidencia.

### Comandos

```bash
npm install
npx playwright install chromium          # una vez

npm run fidelity                         # geometria y tinta contra fixtures declarados
npm run validate                         # esquema de salida, 10 casos
npm run metrics                          # cobertura y parsimonia sobre captures/
npm run report                           # docs/reporte-wireframes.html
npm run appendix                         # apendice de rubricas desde los SKILL.md

node scripts/capture-corpus.js corpus/corpus-v1.csv --out captures
node scripts/capture-corpus.js corpus/corpus-v1.csv --out captures --only G01,H03
node capture/probe-blocked.js            # diagnostica paginas que no cargan
node capture/diagnose-grouping.js        # mide el efecto de la caja de tinta
```

**El navegador no corre en el contenedor remoto.** Chromium vive en el AppData de Windows. Si
tienes acceso al shell del contenedor y no al de David, los comandos que lanzan navegador
tiene que correrlos él.

## 6. Cómo se verifica que algo funciona

Hay **dos clases de prueba y confundirlas es un error de método**. Detalle en
`docs/contexto/13-PLAN-DE-PRUEBAS.md`.

**Pruebas** (pasan o fallan, y una que falla bloquea lo que sigue): determinismo de la
captura, fidelidad geométrica, fidelidad de tinta, cobertura, parsimonia, conformidad de
esquema, calibración de rúbricas, casos dorados, reproducibilidad del artefacto.

**Mediciones** (reportan un valor, no fallan): dispersión entre repeticiones, comparación
entre canales, comparación entre runtimes, ablaciones, acuerdo con la referencia humana.

Tratar una medición como prueba fallida invita a ajustar el instrumento hasta que el número
salga bonito, que es lo que el pre-registro existe para impedir.

**Una métrica que da el máximo en todos los casos no está midiendo nada.** Pasó dos veces con
cobertura. Si un resultado sale perfecto en toda la línea, sospecha del instrumento antes de
celebrar.

## 7. Lo que ya falló, para que no se repita

Ocho defectos encontrados el 10 de septiembre, todos por ejecutar y ninguno por leer código.

| Defecto | Cómo apareció |
|---|---|
| `executablePath` de Chromium fijo a la ruta de un contenedor | Instalar en otra máquina |
| WAF bloqueando por el user agent `HeadlessChrome` | 9 de 30 páginas con 403/500 |
| CAPTCHA servido con **HTTP 200** y página vacía | Control de sanidad |
| `nodes.json` con el documento entero en vez de la pantalla | Métrica de parsimonia |
| Overlay transparente borrando media página al ocluir | Métrica de cobertura |
| Cobertura mal definida (cajas hoja; luego cajas gigantes) | Mirar la cola de páginas |
| Capturar con el interstitial encima | David mirando las 30 juntas |
| `.gitignore` con comentarios en la misma línea | El derivado entró al commit |

**El más importante para el método:** las tres métricas automáticas estaban en verde mientras
gov.co medía un modal de ubicación. **Las métricas verifican que la representación sea fiel a
la página que se capturó; ninguna verifica que se haya capturado la página correcta.**

## 8. Estado y qué sigue

Corte 10 de septiembre de 2026, semana 6 de 17. **44 % del trabajo, 35 % del tiempo.**

**Cerrado:** las siete rúbricas como `SKILL.md`; el esquema de salida; la capa de captura con
fidelidad geométrica y de tinta en 0,000 px; las 30 capturas del corpus; cobertura y
parsimonia; el registro de decisiones del corpus; licencia, cita y guía de instalación.

**Abierto y en este orden:**

1. **Sellar el corpus** con hash y fecha. Bloquea M2.
2. **Piloto de calibración** de las siete rúbricas contra UICrit. Es el bloqueo real de M2:
   una rúbrica cuyos niveles medios nunca se asignan se ve, en los datos, igual que una que
   discrimina bien.
3. **Congelar el protocolo** el 20 de septiembre, fechado y hasheado.
4. **Implementar G1, G2 y G7** contra el esquema, más el orquestador.
5. **Casos dorados**: cinco páginas por grupo, fuera del corpus, con el nivel esperado
   escrito antes de correr la skill.
6. **Avance al asesor el 24 de septiembre**: el reporte de wireframes y el pipeline corriendo.

**Riesgo mayor:** ground truth humano y medición llevan tres semanas sin moverse y pesan 40 %
juntos. El comité de ética está en la ruta crítica y su estado no está confirmado.

**Declarado y sin resolver:** L03 Éxito tiene un interstitial que el catálogo no cierra; queda
marcada y su puntaje se lee con esa advertencia. No amplíes el catálogo a la medida de ese
sitio: produce un procedimiento que funciona en estas treinta páginas y en ninguna otra.

## 9. Al publicar una versión

`docs/checklist-release.md` tiene la lista. Lo esencial:

- **El documento cita un tag con su hash, nunca `main`.** Un lector que instale la rama por
  defecto dentro de un año obtiene algo distinto de lo que la tesis describe.
- El apéndice de rúbricas **se genera** desde los `SKILL.md`; nunca se edita a mano.
- `captures/` **sí** se versiona: el sello del corpus certifica esos archivos contra los
  hashes de cada `meta.json`.
- Los derivados —el reporte HTML, el `.docx` y el `.pdf` del apéndice— **no** se versionan.

## 10. Lo que no se hace

- **No resolver CAPTCHAs ni evadir controles de acceso.** Un conjunto de datos construido
  esquivando controles es un problema en un trabajo de grado. Que dos de treinta sitios
  bloqueen la evaluación automatizada es un resultado del método, no un obstáculo a rodear.
- **No intervenir a mano en una captura.** Lo que el protocolo no pueda describir como una
  regla no puede ser parte del método: el lector que instale el plugin no va a repetir esos
  clics.
- **No ampliar un catálogo cerrado en silencio.** Cada entrada nueva lleva su fecha y se
  registra en `corpus/DECISIONES-CORPUS.md`.
- **No tocar la propuesta formal.** Está entregada. Si el trabajo posterior la contradice, la
  corrección va en el documento de tesis y se declara; no se edita hacia atrás.
