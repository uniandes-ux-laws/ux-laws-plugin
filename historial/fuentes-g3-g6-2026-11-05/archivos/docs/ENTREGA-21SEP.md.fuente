# Entrega · 21 de septiembre de 2026

De David Hernández a **Mateo Rincón** y **Juan Francisco Rodríguez**, que continúan el trabajo
de grado desde hoy. Semana 8 de 17. Asesor: Camilo Escobar Velásquez.

Este es el documento de arranque. Si solo lees uno, es este. Todo lo que afirma tiene un
archivo detrás que lo prueba, y la ruta está al lado.

---

## 1. Dónde vive todo

| Repositorio | Qué tiene | En GitHub |
|---|---|---|
| `ux-laws-plugin` | El código: captura, skills, rúbricas, corpus, casos dorados, scripts, y los documentos de trabajo en `docs/` | `uniandes-ux-laws/ux-laws-plugin` |
| `trabajo-de-grado` | El documento de tesis en LaTeX | `uniandes-ux-laws/trabajo-de-grado` |

Los dos se clonan **uno al lado del otro** en la misma carpeta, porque el capítulo 8 se genera
desde el plugin hacia la tesis con una ruta relativa:

```bash
git clone https://github.com/uniandes-ux-laws/ux-laws-plugin.git
git clone https://github.com/uniandes-ux-laws/trabajo-de-grado.git
```

**Si trabajan con Claude Code**, ábranlo en `ux-laws-plugin`: lee `CLAUDE.md` solo y con eso
tiene el contexto del proyecto, las reglas y el estado.

## 2. Comprobar que heredaron algo sano · diez minutos

En `ux-laws-plugin`:

```bash
npm install
npm run validate                  # esquema de salida v0.2.0 → 18/18
npm run fidelity                  # geometría y tinta → desviación máxima 0,000 px
npm run seal:verify               # corpus → 120 archivos intactos
npm run seal:calibracion:verify   # calibración → 96 archivos intactos
npm run seal:dorados:verify       # casos dorados → 40 archivos intactos
npm run dorados:selftest          # importador → 24/24, no escribe en dorados/
npm run dorados:acuerdo           # recalcula dorados/acuerdo-inicial.json
```

En `trabajo-de-grado`:

```bash
latexmk -pdf main.tex             # → 152 páginas, 0 errores, 0 referencias ni citas indefinidas
grep -rn "pendiente{" chapters/ appendices/ | wc -l     # → 19
```

Si alguna de estas cifras no sale igual, **paren y averigüen por qué antes de tocar nada**. Es
la única forma de saber que lo que heredan es lo que este documento describe.

## 3. Qué está hecho

| | Evidencia |
|---|---|
| Corpus de 30 páginas colombianas, capturado y sellado | `corpus/SELLO-v1.md` · `f9c0caaa…` |
| Conjunto de calibración, 24 páginas fuera del corpus, sellado | `corpus/SELLO-CALIBRACION-v1.md` · `82cb74b6…` |
| Casos dorados, 10 páginas sorteadas con semilla, selladas | `corpus/SELLO-DORADOS-v1.md` · `08d40886…` · `corpus/dorados-v1-sorteo.json` |
| Capa de captura con caja de tinta, fidelidad 0,000 px | `capture/` · `docs/adr-01-caja-de-tinta.md` |
| Cobertura y parsimonia sobre las 30 páginas | `npm run metrics` · tesis §11 |
| Protocolo congelado, tag `v0.1.0`, commit `50cdc8b1…` | `docs/protocolo.md` §7 y §9 (desviaciones posteriores) |
| Las siete skills y el orquestador | `skills/` · `scripts/orchestrate.js` |
| Piloto de calibración de G1, G2 y G7, con G1 congelado como no discriminante | `docs/piloto-calibracion.md` · tesis §14 |
| Las 18 fuentes primarias abiertas y verificadas | `docs/VERIFICACION-FUENTES-14SEP.md` |
| Las 18 fichas de procedencia y el capítulo 8 generado de ellas | `docs/procedencia-leyes.md` · tesis cap. 8 |
| Niveles individuales de los tres en los casos dorados, importados | `dorados/esperados-{david,mateo,juanfrancisco}.csv` |
| Desacuerdo inicial entre los tres autores | `dorados/acuerdo-inicial.json` · tesis §14 «The Golden Cases» |
| Solicitud al comité de ética radicada | CEI-1147-26, 2 de septiembre; en *Revisión Profesional VIC* al 13 de septiembre |

## 4. Las cifras que el documento afirma, y de dónde salen

Si una de estas cambia, cambia en el artefacto primero y después en el documento. Nunca al revés.

| Cifra | Valor | Sale de |
|---|---|---|
| Páginas del corpus | 30 | `corpus/corpus-v1.csv` |
| Grilla de ejecución | 3.900 invocaciones | `shared/decisiones.md` decisión 3 |
| Fidelidad geométrica | 0,000 px | `npm run fidelity` |
| Cobertura del wireframe | mediana 100,0 %, mínimo 81,8 % | `npm run metrics` |
| Parsimonia del wireframe | mediana 98,9 %, mínimo 68,1 % | `npm run metrics` |
| Piloto, G1 antes/después | 21·3·0·0·0 → 23·1·0·0·0 | `docs/piloto-calibracion.md` |
| κ de una rúbrica degenerada contra una que discrimina | 0,969 contra 0,875 | `npm run bp` |
| Casos dorados, acuerdo entre autores | parejas 0,654 · 0,646 · 0,300 · promedio 0,533 | `npm run dorados:acuerdo` |
| Casos dorados rechazados en la captura | 13 de 23 sorteados | `corpus/dorados-v1-sorteo.json` |

En la tesis los tres autores aparecen como *Author 1, 2 y 3*, en el orden David, Mateo, Juan
Francisco. En `docs/casos-dorados.md`, que es documento de trabajo, van con nombre.

## 5. Qué falta, en orden

Cada fila dice qué es, dónde está el hueco en la tesis, y qué significa terminarlo.

### Ya, esta semana

| # | Qué | Hueco en la tesis | Hecho significa |
|---|---|---|---|
| 1 | **Avance con Camilo, jueves 24 de septiembre** | — | Ver §6 |
| 2 | **Sesión de consenso de los casos dorados** | ninguno todavía; alimenta §14 y la fase 5 | `dorados/esperados-consenso.csv` lleno con nivel, trigger y el «por qué» de cada fila, a partir de `dorados/AGENDA-CONSENSO.xlsx`. Son 70 filas; las 29 con diferencia de 2 o 3 niveles son las que importan. Por diseño es de los tres; si se hace sin David, se declara |
| 3 | **Revisar el estado del comité** (CEI-1147-26) y actualizar la frase fechada del cap. 6 | cap. 6, §Ethical Considerations | La frase dice el estado a una fecha nueva. **La contingencia del cap. 7 ya se activó**: la fase 4 abría en la semana 8 sin aprobación. Si no llega antes de la semana 13 (26 de octubre), el objetivo 4 no se ejecuta y se declara así |

### Antes de M3 · 4 de octubre

| # | Qué | Hueco en la tesis | Hecho significa |
|---|---|---|---|
| 4 | **Piloto de G3 a G6** sobre las 24 páginas de calibración | cap. 16 §Which Principles… | Distribución por grupo como en el piloto de G1/G2/G7. Si una rúbrica no reparte, **no se mueve el umbral**: regla del ajuste único |
| 5 | **Correr las siete skills sobre los 10 casos dorados** | — (entra en §14 «The Golden Cases») | Criterio fijado de antemano: ±1 nivel del consenso en 8 de 10 páginas por grupo. Un fallo se lee por su `trigger` |
| 6 | **Auditoría de punta a punta** sobre una página fuera del corpus | cap. 13 §A Worked Audit | Salida real de las siete skills y su lectura |
| 7 | **Salida `.tex` del generador de rúbricas** | Apéndice C y cap. 10 §The Rubric Is the Instrument | `npm run appendix` escribe `appendices/c-rubrics.tex`. Cierra dos huecos a la vez |
| 8 | **Registro de búsqueda bibliográfica** | cap. 3 §The Gap y Apéndice E | Bases, cadenas exactas, idiomas, fecha de corte, criterios. Sostiene tres afirmaciones de ausencia que ya están escritas. **Tiene que incluir a Reinecke et al. (2013)**, trabajo previo cercano que la verificación encontró |
| 9 | **MinTIC entidad por entidad** | Apéndice A | Norma con número y año para cada una de las cinco entidades de salud |

### M4 a M6

| # | Qué | Hueco en la tesis | Hito |
|---|---|---|---|
| 10 | Panel humano: reclutamiento, entrenamiento, calificación | cap. 14 §The Human Panel | M4 · 18 oct · depende del comité |
| 11 | La grilla de 3.900 invocaciones | cap. 14 §The Execution Grid | M5 · 25 oct |
| 12 | Resultados: acuerdo, dispersión, canales, runtimes, ablación, no aplicables | cap. 15 · seis huecos | M5 |
| 13 | Comparación entre runtimes | cap. 12 §Claude Code and Codex | M5 |
| 14 | Discusión: el coeficiente y las amenazas de la Parte I actualizadas | cap. 16 · dos huecos | M6 · 15 nov |
| 15 | Conclusiones | cap. 17 | M6, al final |

Esos son los **19 `\pendiente`** del documento: **7 antes de M3** (#4, #6, #9, y dos cada uno
#7 y #8) y **12 que esperan la medición** (#10 a #15). Las tareas #1 a #3 no tienen hueco en la
tesis.

### Acabado, al final

- 14 cajas desbordadas de más de 20 pt, casi todas por nombres largos en `\texttt` (cap. 11,
  12, 13 y apéndices C y D). Cosmético; se arregla cuando el texto esté quieto.
- El Apéndice D reproduce el protocolo congelado: no se edita, se regenera si cambia la versión.

## 6. El avance del 24 de septiembre

Camilo pidió ver, sobre todo, **qué tan buenos wireframes sacamos**. Lo que hay para mostrar:

1. **La demo**: `npm run demo -- <url>` con una URL que él nombre en el momento. Captura,
   wireframe y medición en vivo.
2. **El reporte de las 30 páginas**: `npm run report` → `docs/reporte-wireframes.html`.
3. **Cobertura y parsimonia**, con la advertencia honesta: cobertura es prueba de piso y no
   escala (mediana en el tope); parsimonia es la que ordena.
4. **El piloto y la tabla de Brennan–Prediger**: por qué un 0,97 puede valer menos que un 0,875.
5. **El desacuerdo inicial de los casos dorados**: 0,300 en la pareja más baja, G3 y G6 altos
   por convergencia y no por acuerdo, G7 el más bajo. Es un resultado, no un problema a esconder.
6. **La pregunta al asesor**: qué hacer si el comité no responde; la contingencia del cap. 7 ya
   está activa.

## 7. Reglas que no se negocian

1. **Ninguna cita sin abrir la fuente.** Si no se pudo abrir, se dice. Una referencia inventada
   en una tesis es una falta grave. `lawsofux.com` no es autoridad de ninguna ley.
2. **Ningún `\pendiente` se cierra sin el dato.** Un hueco visible es mejor que un párrafo que
   suena bien.
3. **El capítulo 8 y el Apéndice C se generan.** Nunca se editan a mano.
4. **Un cambio a una rúbrica, un commit.** Nunca dos juntos: el piloto ya perdió su rastro por eso.
5. **Ningún umbral se mueve mirando la distribución que produce.** Solo un defecto demostrado
   en la definición autoriza a tocarlo, y se fecha antes de volver a correr.
6. **Compilar la tesis antes de cada commit** del repositorio del documento.
7. **Toda desviación se declara con fecha.** En `docs/protocolo.md` §9 si toca el protocolo, en
   `corpus/DECISIONES-CORPUS.md` si toca el corpus.
8. **No se afirma el estado de un archivo sin mirarlo.** «Está vacío», «no existe», «es la
   última versión» se comprueban.

## 8. Qué documento manda en qué

| Tema | Documento canónico |
|---|---|
| Contexto, reglas, comandos, qué falló | `CLAUDE.md` |
| Estado y qué sigue | **este archivo** |
| Protocolo congelado y sus desviaciones | `docs/protocolo.md` |
| Decisiones de implementación | `shared/decisiones.md` |
| Escala 0–4, tolerancia, ajuste único | `shared/escala.md` |
| Rúbricas | `skills/*/SKILL.md` |
| Fuentes de las 18 leyes | `docs/procedencia-leyes.md` (y su verificación en `docs/VERIFICACION-FUENTES-14SEP.md`) |
| Casos dorados | `docs/casos-dorados.md` |
| Piloto | `docs/piloto-calibracion.md` |
| Corpus y sus cambios | `corpus/DECISIONES-CORPUS.md` |
| Plan de pruebas | `docs/contexto/13-PLAN-DE-PRUEBAS.md` |

`docs/REVISION-COHERENCIA-13SEP.md` y `docs/NOTA-CLAUDE-CODE-13SEP.md` son registros fechados de
una revisión ya aplicada: se conservan como historia, no como instrucciones vigentes.

## 9. Lo que pasó el 21 de septiembre

- Los tres niveles individuales se importaron. El importador tenía **tres defectos** que solo
  aparecieron con hojas reales —XML con prefijo `x:`, atributos en otro orden, y el contador de
  la plantilla contado como fila 71—; se corrigieron, y el selftest pasó de 18 a 24 aserciones,
  cada una comprobada rompiendo el código a propósito.
- Siete triggers de Mateo se normalizaron en ortografía (`agrupación` → `agrupacion`, `c1` →
  `C1`) sin cambiar ningún nivel ni justificación. Las hojas tal como se entregaron están en
  `dorados/entregas-originales/`.
- Una primera versión de la hoja de David, que contenía el punto medio de las otras dos, se
  retiró antes de cualquier cálculo. La analizada es la que entregó después como propia.
- En la tesis: sección nueva «The Golden Cases» en el cap. 14; cerrado el hueco de la
  representación del evaluador en el cap. 6 con nota fechada; traídas las tres notas azules del
  cap. 11 (caja de tinta con su evidencia, tabla del archivo paralelo, fidelidad de tinta);
  corregido «six of the seven wireframe groups» por «five of the six»; dueños y fechas de todos
  los `\pendiente` actualizados; ninguno quedó vacío.
