# Índice del trabajo de grado — estado al 10 de septiembre de 2026

**Evaluación automatizada de UX de interfaces web mediante Laws of UX operacionalizadas**

David Hernández (202220865) · Mateo Rincón (202221402) · Juan Francisco Rodríguez (202214603)
Asesor: Camilo Escobar Velásquez · Ingeniería de Sistemas, Universidad de los Andes
Término 2026-20 · semana 6 de 17 · actualizado el 10 de septiembre

---

## Qué hay en esta carpeta

| Documento | Qué contiene | Estado |
|---|---|---|
| `01-PROPUESTA-FORMAL.md` | La propuesta entregada: contexto, problema, marco, pregunta, objetivos, cronograma, amenazas, apéndices | Entregada, no se toca |
| `02-ESPECIFICACION-LEYES.md` | Las 18 leyes: qué mide cada una, ejemplo y qué necesita del wireframe. Ordenado por grupo | Cerrado |
| `03-RUBRICAS.md` | Las siete rúbricas completas con sus cinco niveles anclados. Generado desde el repositorio | Cerrado |
| `04-DECISIONES-Y-ESCALA.md` | La escala ordinal 0–4 y las ocho decisiones de implementación congeladas | Cerrado |
| `05-ARQUITECTURA-PLUGIN.md` | Estructura del repositorio, capa de captura, esquema de salida, cómo se instala | Cerrado |
| `06-ESTADO-Y-PLAN.md` | Avance por frente, hitos con fechas, plan semanal hasta el 28 de noviembre | Vivo |
| `07-GUION-PROFESOR.md` | Guion hablado para presentar el avance de semana 6, con preguntas anticipadas | Para usar |
| `08-REVISION-PARES.md` | Hallazgos del panel de revisión sobre la propuesta y qué se corrigió | Histórico |
| `09-CORRECCION-WIREFRAME.md` | Los dos hallazgos del asesor en la semana 6: la caja de layout no es lo que el ojo ve, y el canal de carga cognitiva. Qué se midió, qué se decidió, qué queda declarado | Cerrado |
| `10-ESTRUCTURA-TESIS.md` | El esqueleto del documento de tesis: qué va en cada capítulo, de dónde sale y qué falta | Vivo |
| `11-PLAN-2-SEMANAS.md` | Plan hasta el 24 de septiembre, con la calidad del wireframe como prioridad y M2 dentro de la ventana | Vivo |
| `12-QUE-SIGUE.md` | Avance al 44 %, decisión sobre GitHub, dónde vive cada uno de los cuatro conjuntos de datos, y el reparto de tareas de la semana | Vivo |
| `13-PLAN-DE-PRUEBAS.md` | Los once niveles de prueba, qué demuestra cada uno, cuáles pasan hoy y en qué orden van | Vivo |

## El proyecto en cinco frases

Un sistema que toma una URL, la captura a viewport fijo, produce dos representaciones de la
misma pantalla —el screenshot y un wireframe generado desde el árbol de layout del
navegador— y puntúa siete grupos de constructo en una escala ordinal anclada de 0 a 4.

Las dieciocho leyes implementadas se subsumen en siete grupos y **el puntaje se emite por
grupo, nunca por ley**: cuatro de las dieciocho son principios Gestalt de agrupación y otras
cuatro miden capacidad o segmentación, así que puntuarlas por separado y sumarlas contaría
el mismo constructo varias veces.

La contribución no es la herramienta sino la medición: establecer hasta qué punto esos
puntajes corresponden al juicio experto humano, cuáles de los treinta principios admiten un
criterio observable y cuáles resisten, y cuánto de la salida es estable y cuánto es artefacto
de una corrida concreta.

El artefacto se entrega como un plugin instalable en dos runtimes de agente, porque un
resultado que nadie más puede re-correr sobre una página propia es una afirmación sobre
treinta páginas colombianas y nada más.

Un resultado negativo bien medido sigue siendo un resultado, y está pre-comprometido como
tal desde la propuesta.

## Los siete grupos

| | Constructo | Leyes subsumidas (autor) | Canal |
|---|---|---|---|
| G1 | Agrupación perceptual | Proximidad (D) · Prägnanz (M) · Región común (JF) · Similitud (JF) | Wireframe |
| G2 | Arquitectura de decisión | Ley de Hick (D) · Sobrecarga de elección (M) | Wireframe |
| G3 | Capacidad y segmentación | Miller (JF) · Chunking (JF) · Memoria de trabajo (M) · Carga cognitiva (M) | Wireframe |
| G4 | Saliencia visual | Von Restorff (D) · Atención selectiva (D) | **Screenshot** |
| G5 | Posición y progreso | Posición serial (M) · Gradiente de meta (JF) | Wireframe |
| G6 | Economía y convención | Navaja de Occam (D) · Ley de Tesler (JF) · Ley de Jakob (M) | Wireframe |
| G7 | Targeting motor | Ley de Fitts (D) | Wireframe |

D = David · M = Mateo · JF = Juan Francisco. La partición es división de trabajo y no
división de la tesis: el sistema se implementa y se reporta como uno solo.

## Reglas que gobiernan todo el trabajo

1. **Ninguna cita sin abrir.** Cada ley se cita por su fuente primaria verificada contra el
   original. Donde el original no se pudo leer, se declara y se cita a través de quien lo
   restata. Donde no existe publicación, se declara la ausencia en vez de poner una
   referencia plausible.
2. **`lawsofux.com` no es autoridad de una ley.** Es divulgación. Se distinguen siempre tres
   capas: el hallazgo empírico original con sus condiciones, la formulación divulgativa, y
   nuestra operacionalización. El salto de la primera a la tercera es donde vive el riesgo
   de validez de esta tesis.
3. **Ningún puntaje sin rúbrica, sin varianza y sin ground truth.** Criterios observables
   definidos antes de puntuar, repeticiones con dispersión reportada, y validación contra
   evaluación humana experta con acuerdo entre evaluadores.
4. **El perfil por grupo es el resultado primario.** Un total con ponderación uniforme haría
   que G7, que subsume una ley, pesara lo mismo que G1, que subsume cuatro; si se reporta,
   la limitación se declara.

## Dónde está lo que no es texto

- **Repositorio del plugin**: las siete rúbricas como `SKILL.md`, la capa de captura, el
  esquema de salida, los manifiestos y los scripts. Entregado como `ux-laws-plugin.zip`.
- **Tablero de estado**: artefacto publicado con el avance, los hitos y el plan marcable
  por los tres.
- **Propuesta compilada**: el LaTeX y su PDF de 46 páginas.

## Nota de mantenimiento

El archivo `PROPUESTA-FORMAL.md` que estaba en esta carpeta se eliminó el 10 de septiembre.
Era una copia anterior a las correcciones de la revisión por pares: llevaba la cita rota de
Benway, la razón equivocada de exclusión de Conectividad Uniforme, `law_id` en vez de
`group_id`, un PENDIENTE ya resuelto y las fechas viejas de M6. Tener dos versiones de la
propuesta con distinto contenido era exactamente el problema que el resto de este trabajo
está montado para evitar. `01-PROPUESTA-FORMAL.md` la reemplaza y se genera desde el LaTeX
fuente, no se escribe a mano.
