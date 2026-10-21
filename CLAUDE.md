# CLAUDE.md

Instrucciones para trabajar en este repositorio. Léelas completas antes de tocar nada.
Actualizado el **20 de octubre de 2026**. La entrega histórica y los responsables están en
**`docs/ENTREGA-21SEP.md`**: léelo después de este archivo. El avance de G4 y G5 figura abajo.

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

## 2. Cómo trabajar con el equipo

Desde el 21 de septiembre el trabajo lo continúan **Mateo y Juan Francisco**; David lo dejó
entregado en el estado que describe `docs/ENTREGA-21SEP.md`. Lo que sigue vale con cualquiera de
los tres.

- **Son los investigadores, no usuarios casuales.** Precisión antes que velocidad.
- **Toma las decisiones técnicas tú** y justifícalas: por qué, alternativa descartada, cómo.
  No devuelvas una lista de opciones para que escojan.
- **Respuestas concisas, en español**, salvo términos técnicos y código.
- **No pidas que copien y peguen errores.** Corre los comandos, lee las salidas, diagnostica.
- **Si algo que propusiste tiene un defecto, dilo al principio**, no enterrado al final.
- **No afirmes el estado de un archivo, una carpeta o un repositorio sin mirarlo.** «Está
  vacío», «no existe», «es la versión más nueva» se verifican antes de actuar: tres errores de
  este proyecto salieron de premisas así.

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
npm run validate                         # esquema de salida v0.2.0, 71 casos
npm run test:g5                          # detección y separación de listas
npm run test:g4                          # candidatos, geometría y proxies de screenshot
npm run test:pilot-g4                    # transporte y reanudación sin repetir juicios
npm run test:actionables                 # inventario de controles compartido por G2/G7
npm run test:controls                    # captura real de controles y estados
npm run metrics                          # cobertura y parsimonia sobre captures/
npm run report                           # docs/reporte-wireframes.html
npm run appendix                         # apendice de rubricas desde los SKILL.md
npm run procedencia -- --out ../trabajo-de-grado/chapters/08-provenance.tex   # capitulo 8 desde docs/procedencia-leyes.md

npm run seal:verify                      # 120 archivos del corpus
npm run seal:calibracion:verify          # 96 del conjunto de calibracion
npm run seal:dorados:verify              # 40 de los casos dorados

npm run dorados:importar -- --todos      # hojas .xlsx -> dorados/esperados-*.csv (no pisa juicios sin --force)
npm run dorados:selftest                 # 24 aserciones; no escribe en dorados/
npm run dorados:acuerdo                  # dorados/acuerdo-inicial.json

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

**G2 y G7 terminaron sus pilotos el 19 de octubre:** 120 respuestas por grupo.
Se usaron medición 1.0.6, gpt-6.1-sol, CLI 0.162.0-alpha.17.2 y razonamiento low.

**G2:** 41 puntajes y 79 abstenciones. Hubo seis ceros, veinticinco doses y diez treses.
Seis de las siete páginas con cinco puntajes conservaron el nivel; la regla fue igual en tres
de esas siete páginas. C16 cambió entre 0 y 2; C10 y R02 tuvieron puntajes y abstenciones.
En 108 respuestas se marcó falta de evidencia. No se identificaron apoyos de decisión
ni se obtuvieron niveles 1 o 4.

**G7:** 120 puntajes. Las 24 páginas repitieron nivel y regla: 105 ceros, diez unos y cinco doses.
Se marcó falta de evidencia en 75 respuestas. No aparecieron niveles 3 ni 4.

Tres solicitudes de G2 fallaron por conexión y no produjeron respuesta. Juan autorizó un solo
reintento de cada una; devolvieron abstenciones. Se conservaron los fallos y los 117 resultados
anteriores. En total se comprobaron 240 conversaciones con respuesta y tres fallidas.
No hay respuestas inválidas ni fallos pendientes. Los sellos protegen 554 archivos de G2 y
539 de G7. El seguimiento automático ya está desactivado y se conservaron los reinicios gratuitos.

Informes: `pilotos/g2-2026-10-18/INFORME.md` y `pilotos/g7-2026-10-18/INFORME.md`.
Registro: `docs/PILOTO-G2-G7-18OCT.md`; resumen del cierre: `docs/CONTINUAR-PILOTOS-G2-G7.md`.
**Falta la validación con expertos y el consenso de los casos dorados.** También hay que aclarar
con Camilo las combinaciones sin nivel de G2. La rúbrica de G7 incluía cifras del piloto
anterior, un límite que ya estaba anotado antes de empezar. Los pilotos terminados no significan
que los grupos ya estén validados.

**G5, actualización del 19 de octubre:** el piloto general del 7 de octubre conserva
120 respuestas válidas, medición 1.0.5 y 534 archivos primarios sellados. Se revisaron
sus 63 marcas de evidencia insuficiente: R02 omite una lista en dos filas, C07 pierde
opciones en los nodos guardados y C17 discrepa sobre la suficiencia de la evidencia.
Informe: `pilotos/g5-2026-10-07/INFORME.md`; revisión: `docs/REVISION-G5-19OCT.md`.

La primera prueba separada de progreso terminó con 45 respuestas válidas y 223 archivos
sellados. Las 40 posiciones con nivel o NA esperado coincidieron; P10 tiene cinco sin
nivel esperado. Las clases CSS podían dar pistas. Esa serie se conserva con su contrato,
15 marcas de evidencia insuficiente y triggers variables en tres páginas.

**También terminaron las 70 evaluaciones adicionales**, todas válidas y sin fallos técnicos:
45 sin entregar clases CSS y 25 de los casos pendientes. La comparación sin clases conserva
nivel o NA en las 45 posiciones: 40/40 coincidieron con la expectativa y P10 se revisa aparte.
Los nueve casos mantuvieron nivel y seis mantuvieron trigger. P02 conserva cinco marcas
no previstas de evidencia insuficiente; P03 y P10 tienen otras cinco cada uno.

Juan autorizó fijar **nivel 1 para etapas nombradas sin paso actual**, antes de evaluar
P06 como E01. El contrato G5 0.2.0 fija el trigger por condición y explicita si el final
compite con el inicio. La serie nueva obtuvo 25/25 coincidencias con nivel y campos previstos:
E01=1, E02/E04=3, E03/E05=4, con cinco repeticiones por caso. Se declararon siete frases
imprecisas que atribuyen al wireframe un relleno que queda como contorno interior. No se
reescriben ni repiten respuestas por esa observación. Las nuevas corridas del orquestador
entregan a G5 una copia de medidas sin clases de candidatos y conservan las originales.

Se comprobaron **235 conversaciones distintas y 1.107 archivos primarios sellados** entre
las cuatro series, sin sumar sus resultados como una sola muestra. Se preservaron las
versiones anteriores, los corpus y los casos dorados. Los seguimientos de G5 y G2/G7 están
pausados y se conservaron los reinicios gratuitos. **Faltan contrastar la nueva regla con
Camilo, validación experta y consenso.** Se declaran los límites de captura/detección y la
lectura del screenshot en los criterios que la requieren; no se afirma validación de G5.

Resumen actual: `docs/CIERRE-G5-19OCT.md`; revisión experta: `docs/REVISION-EXPERTA-G5.md`.
Informes nuevos: `pilotos/g5-sin-pistas-2026-10-19/INFORME.md` y
`pilotos/g5-cierre-2026-10-19/INFORME.md`. Comprobación conjunta:
`node scripts/verify-g5-closure.js`. Los cambios están en commits locales.

**G4:** piloto real concluido, 120 respuestas conformes sobre las 24 capturas × 5,
con medición 1.0.6, gpt-6.1-sol y razonamiento low. Son 56 puntajes y 64 abstenciones:
59 por cobertura incompleta de las anclas y cinco por P indeterminado. Se observaron
niveles 2, 3 y 4; ocho de las nueve páginas con cinco puntajes mantuvieron su nivel.
Hay 111 marcas de evidencia insuficiente. No se ejercitaron Bn/Cn positivos ni I≥3.
Informe: `pilotos/g4-2026-10-07-v3/INFORME.md`; registro: `docs/PILOTO-G4-07OCT.md`.
El fallo técnico de uso y las fases preliminares se preservan separados. G4 requiere
acordar las combinaciones sin ancla, revisar selección/evidencia y contrastar con expertos;
no está cerrado metodológicamente. Los pilotos de G3/G6 se completaron después; ver el cierre del 21 de octubre.
**G4, 20 de octubre:** Juan confirmó que todavía no hay acuerdo con Camilo y autorizó
proponer criterios. Se registraron nivel 1 sin aislados, nivel 2 para dos con jerarquía y
nivel 2 para foco pertinente con Cn positivo. El contrato 0.2.0 pide justificar el conjunto
principal, fija un trigger por condición y aclara canales independientes. Son propuestas,
no aprobación del asesor. Se revisaron las 120 respuestas y nueve páginas dudosas.

La proyección G4 1.0.7 sobre la fuente 1.0.6 corrige falsas marcas de parcialidad numéricas:
110 conjuntos, seleccionados por 33 respuestas anteriores. Solo cambia parcial, clases de
candidatos a banner y versión de entrada. No corrige cajas ni elimina otros límites. La
comparación histórica por áreas también existe en G5; revisar ese alcance por separado.

La fase dirigida **terminó: 85/85 respuestas**, 52 puntajes y 33 abstenciones, sin inválidas
ni fallos técnicos. Las 40 sintéticas dieron 35 coincidencias de nivel; S07 recibió cinco
niveles 4 frente al 3 previsto por color solamente. Las tres reglas propuestas coincidieron
en sus cinco repeticiones. La revisión posterior encontró 11 respuestas con un canal de peso
tipográfico no respaldado por los estilos del diseño y otra mención en S02-r4. No se cambió
ningún juicio ni expectativa.

En las nueve reales hubo 12 puntajes, 33 abstenciones y 42 marcas de evidencia insuficiente.
C07 varió 2/4/4/2/2. R02 mantuvo nivel 1, pero cambió de conjunto; C09 y C20 mezclaron un
nivel 1 con cuatro abstenciones. C06, C13, C17, C25 y R03 se abstuvieron cinco veces.
Solo C07 y R02 tienen cinco puntajes; ninguna mantuvo a la vez nivel y conjunto.

Se comprobaron 85 conversaciones nuevas y se sellaron 382 archivos. Las tres carpetas
históricas siguen iguales a 2f1f7e6 y el sello anterior de 540 archivos permanece válido.
Preparación 067e9f7 y registro cc9098d, antes de evaluar. El seguimiento
`completar-fase-dirigida-de-g4` quedó pausado; se conservaron los reinicios gratuitos.
Los cambios están en commits locales. No se publicó esta fase en GitHub.

Cierre: `docs/CONTINUAR-G4-20OCT.md`; registro previo: `docs/FASE-G4-20OCT.md`;
revisión posterior: `docs/REVISION-G4-FASE2-20OCT.md`;
informe: `pilotos/g4-cierre-2026-10-20/INFORME.md`.
No editar ejecutor ni dependencias congeladas. Faltan revisar reglas y alcance con Camilo,
validación experta y consenso; el panel depende de ética. Los otros grupos mantienen sus instrumentos.

**G3/G6, 20 de octubre:** Juan autorizó revisar mediciones y ejecutar 120 evaluaciones por
grupo, conservando reinicios y continuando automáticamente después de renovar el uso si
hace falta. La evidencia 1.1.0 se genera aparte de los originales 1.0.6. Se corrigieron
regiones, envoltorios y candidatos de convenciones; no se cambiaron anclas para repartir niveles.
Propuestas operativas, no aprobación de Camilo. Registro previo: `docs/PILOTOS-G3-G6-20OCT.md`;
revisión: `docs/REVISION-MEDICIONES-G3-G6-20OCT.md`. Fuente 39714db, registro 0dfbdd9.

**Los dos pilotos terminaron el 21 de octubre: 120 posiciones por grupo.** G3 tiene
20 puntajes (seis ceros y catorce unos), 70 abstenciones y 30 inválidas por selección o
unidades incompletas sin declarar el límite exigido. C17 fue la única página con cinco
puntajes: repitió nivel 0 y regla X, con advertencias de evidencia insuficiente. Hay
87 marcas de insuficiencia entre las 90 respuestas conformes. G6 tiene 120 abstenciones:
K7 y K8 no pudieron cerrarse con la evidencia capturada. No hubo NA ni fallos técnicos.

Se comprobaron 240 conversaciones distintas, originales, atribución, registros y CSV.
Los sellos protegen 504 archivos de G3 y 534 de G6; no regenerarlos. Los 4.111 archivos
históricos frente a d0ac313 y sus ocho sellos permanecen intactos. La auditoría de G3
conserva cinco observaciones, con sus límites; no son cinco errores expertos. La auditoría
original se conserva separada. Las 30 inválidas no se reescribieron ni se repitieron.

Se mantuvo la CLI 0.162.0-alpha.17.2 conservada aparte tras actualizarse la app. No se usaron
reinicios ni se compraron créditos. Los avances están en commits locales, sin publicar en
GitHub. Cierre y revisión: `docs/CIERRE-G3-G6-21OCT.md`. Para comprobarlo sin solicitudes:
`python3 scripts/verify-g3-g6-closure.py`. **Faltan revisión con Camilo, validación experta
y consenso**; el panel humano depende de aprobación ética.

G3/C02-r1 se abstuvo por combinación sin ancla. G3/C03-r1 quedó inválida por no declarar
insuficiencia con un bloque parcial; no se repite. La auditoría derivada de G3 se corrigió
para clasificar contenido ajeno por intersección geométrica, conservando intacta la auditoría
original de cada traza. Notas posteriores: `docs/OBSERVACIONES-G3-G6-20OCT.md`.
Continuación: `docs/CONTINUAR-G3-G6-20OCT.md`. Los cambios se guardan localmente, sin publicar.

El corte de septiembre que sigue se conserva como historial.


Corte **21 de septiembre de 2026**, semana 8 de 17. El detalle completo, con dueño y ruta de
cada pendiente, está en **`docs/ENTREGA-21SEP.md`**. Resumen:

**Cerrado:** corpus de 30 páginas sellado; conjunto de calibración (24) y de casos dorados (10)
sellados; tag `v0.1.0` congelado el 12 de septiembre; las siete skills y el orquestador; el
esquema de salida v0.2.0; el piloto de G1, G2 y G7; las dieciocho fichas de procedencia
verificadas contra sus fuentes y el capítulo 8 generado de ellas; los tres niveles individuales
de los casos dorados importados y su desacuerdo inicial calculado.

**Abierto, en este orden:**

1. **Sesión de consenso de los casos dorados** con `dorados/AGENDA-CONSENSO.xlsx`, y el
   resultado en `dorados/esperados-consenso.csv`.
2. **Piloto de G3 a G6** sobre las 24 páginas de calibración.
3. **Correr las siete skills** sobre los diez casos dorados y aplicar el criterio fijado:
   ±1 nivel del consenso en 8 de 10 páginas por grupo.
4. **La grilla de 3.900 invocaciones** sobre el corpus, con presupuesto confirmado.
5. **Panel humano**, en cuanto el comité de ética responda (CEI-1147-26).
6. **El registro de búsqueda bibliográfica** y **la verificación MinTIC** del Apéndice A: no
   dependen de nada y nadie los ha empezado.

**Riesgo mayor:** el comité de ética. Sin aprobación no hay panel y sin panel no hay ground
truth; la tesis reportaría instrumento, dispersión y comparaciones, declarando la ausencia.

**Declarado y sin resolver:** L03 Éxito tiene un interstitial que el catálogo no cierra; queda
marcada y su puntaje se lee con esa advertencia. No amplíes el catálogo a la medida de ese
sitio.

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
- **No tocar la propuesta formal** (`docs/contexto/01-PROPUESTA-FORMAL.md`). Está entregada.
  En el documento de tesis la Parte I conserva su texto: un `\pendiente` suyo se cierra en su
  sitio con una nota que dice que la resolución es posterior a la entrega y cuándo; una
  corrección de fondo va en la Parte IV y se declara. No se edita hacia atrás en silencio.

## 11. Una regla que se aprendió rompiéndola

**Un cambio a una rúbrica, un commit. Nunca dos en el mismo.**

El 11 de septiembre la corrección de la definición de `g_out` en C1 y la reescritura de G1 y G7
por proporción afectada entraron en el mismo commit, y la implementación previa nunca estuvo
versionada. Resultado: las tres distribuciones del piloto —24/0, 21/3, 23/1— no se pueden
ordenar con el historial, y el efecto de cada cambio no es atribuible por separado. La regla del
ajuste único quedó declarada y sin registro que la sostuviera.

Esto no se arregla escribiendo mejor. Se evita commiteando por separado.
