# Arquitectura del plugin

Estado al 10 de septiembre de 2026. Corresponde al repositorio entregado como
`ux-laws-plugin.zip`.

---

## 1. Qué se entrega y por qué es un plugin

El sistema se entrega como un **plugin instalable**, publicado como repositorio público,
que un lector instala en su propio runtime de agente y corre contra sus propias páginas.
Esa forma es lo que hace que el artefacto sea usable sin re-implementar nada, y es la mitad
de la contribución: un resultado que nadie más puede re-correr sobre una página de su
elección es una afirmación sobre nuestras treinta páginas y nada más.

Hay que separar dos niveles, porque solo uno es portable.

**La skill es la unidad de capacidad, y es la portable.** Un directorio con un `SKILL.md`
que lleva metadata e instrucciones. Los dos runtimes leen ese mismo archivo: Claude Code
descubre skills bajo un directorio `skills/`, Codex escanea `.agents/skills`. Difieren en el
directorio que escanean, no en el formato que leen.

**El plugin es la unidad de distribución, y no es portable en el mismo sentido.** Cada
runtime define su propia convención de empaquetado. El repositorio lleva el manifiesto que
cada uno espera sobre un único conjunto de archivos de skill.

Esa separación es lo que hace controlada la comparación entre implementaciones: los
manifiestos difieren, el texto de la rúbrica no. Las mismas siete `SKILL.md` ejecutan bajo
dos runtimes independientes sin modificación, así que el instrumento se mantiene fijo
mientras el stack de ejecución varía alrededor.

## 2. La rúbrica es el instrumento, y por eso vive en el repositorio

Cada rúbrica **es** el `SKILL.md` de su skill. No hay una copia editable aparte.

Si la rúbrica viviera en un documento y su versión ejecutable en el repositorio, las dos
derivarían, y el protocolo congelado dejaría de describir lo que el sistema hace. El
apéndice del documento de tesis se **genera** desde esos archivos:

```bash
node scripts/build-appendix.js     # -> docs/apendice-rubricas.{md,docx}
```

Cuando se corrige una rúbrica, se vuelve a correr el comando y el apéndice queda al día.
Nunca hay dos versiones que puedan discrepar.

## 3. Estructura

```
ux-laws-plugin/
├─ .claude-plugin/plugin.json      manifiesto de Claude Code
├─ .agents/skills                  generado, apunta a skills/ (en .gitignore)
├─ skills/
│  ├─ g1-agrupacion-perceptual/SKILL.md
│  ├─ g2-arquitectura-decision/SKILL.md
│  ├─ g3-capacidad-segmentacion/SKILL.md
│  ├─ g4-saliencia-visual/SKILL.md
│  ├─ g5-posicion-progreso/SKILL.md
│  ├─ g6-economia-convencion/SKILL.md
│  ├─ g7-targeting-motor/SKILL.md
│  └─ ux-audit/SKILL.md            orquestador
├─ shared/
│  ├─ schemas/group-result.schema.json
│  ├─ escala.md                    la escala ordinal 0-4 común
│  └─ decisiones.md                las ocho decisiones congeladas
├─ capture/
│  ├─ capture.js                   URL -> screenshot + wireframe + nodes.json + meta.json
│  ├─ verify-fidelity.js           comprueba que el wireframe reproduce la geometría
│  └─ fixtures/                    tres páginas de geometría conocida
├─ scripts/
│  ├─ link-skills.sh               genera el directorio que cada runtime escanea
│  ├─ build-appendix.js            SKILL.md -> apéndice del documento
│  └─ validate-result.js           valida una salida contra el esquema
└─ docs/                           salidas generadas
```

Una sola carpeta canónica, `skills/`. Nada se duplica: una rúbrica se edita en un lugar.

## 4. La capa de captura

```bash
node capture/capture.js <url> --out captures/<nombre>
node capture/verify-fidelity.js --tolerance 1
```

Produce cuatro artefactos por página:

- `screenshot.png` — la página renderizada a **viewport fijo 1440 × 900 px, solo lo visible
  sin scroll**. Nunca página completa.
- `wireframe.png` — la misma geometría redibujada **desde el árbol de layout del navegador**,
  nunca segmentando la imagen.
- `nodes.json` — el archivo paralelo, un registro por nodo retenido.
- `meta.json` — procedencia: url, fecha, viewport, user agent, versión de Chromium, sha256
  de las dos imágenes, y conteo de nodos retenidos contra el total.

### Por qué desde el árbol de layout y no segmentando la imagen

Un segmentador introduce un segundo modelo cuyos errores caen en el mismo pipeline que los
del evaluador, y entonces una divergencia entre canales podría originarse en el segmentador
en vez de en el evaluador. Descartar eso es exactamente lo que la comparación entre canales
tiene que poder hacer. Tomando las cajas del layout, la geometría de las dos representaciones
sale de una sola pasada en vez de dos estimaciones independientes.

### Procedimiento

1. Capturar con Chrome DevTools Protocol usando `DOMSnapshot.captureSnapshot`, pidiendo los
   estilos computados que el esquema registra.
2. Retener un nodo solo cuando pinta, su caja tiene área mayor que cero, no está
   completamente tapado por un hermano que pinta encima, y no es invisible por
   `visibility: hidden` ni por opacidad cero. Sin ese filtro el wireframe dibuja la
   estructura del HTML en vez de la página.
3. Dibujar los retenidos como rectángulos con contorno y los de texto como barras rellenas.
4. Verificar fidelidad antes de evaluar, con tolerancia fijada antes de medir.

### Estado verificado

Sobre tres fixtures de geometría conocida — cajas absolutas, una grilla CSS y una fila
flex — la desviación máxima medida es **0.000 px**, con tolerancia de 1 px fijada antes de
medir. Pasa también con tolerancia 0. Se verificó además con controles negativos: una caja
declarada a 100 px que medía 137 reporta la desviación y falla, y un elemento declarado pero
ausente del `nodes.json` también falla. El verificador no pasa por vacío.

## 5. El archivo paralelo

**Catorce de las dieciséis leyes que corren en wireframe necesitan algo que un rectángulo
con contorno no comunica**: accionabilidad, tipo de nodo, jerarquía, identidad, posición
fija. Ese dato ya viene en la misma llamada de captura y se descartaba al dibujar.

`captureSnapshot` devuelve dos estructuras: `LayoutTreeSnapshot` con `bounds`, `text`,
`paintOrders` y `styles`, y `NodeTreeSnapshot` con `nodeName`, `attributes` e `isClickable`,
que la especificación define como si el nodo responde a clics del ratón.

Entonces el wireframe son dos archivos. La imagen no cambia — cambiar el dibujo contaminaría
la comparación entre canales — y el JSON viaja al lado con el mismo `id` por caja.

| Campo | Origen | Quién lo usa |
|---|---|---|
| `id` | índice del nodo | Amarra el JSON con el dibujo |
| `bounds` | `LayoutTreeSnapshot.bounds` | G1 Proximidad y Prägnanz, G5, G7, G4 como apoyo |
| `isClickable` | `NodeTreeSnapshot.isClickable` | G2 (`n_total` y `n1`), G7 (qué caja es objetivo) |
| `nodeName` | `NodeTreeSnapshot.nodeName` | G6 contenedor vs contenido, G6 Tesler entrada vs resultado, G2, G3 |
| `attributes` | `NodeTreeSnapshot.attributes` | G6 Jakob: `alt`, `aria-label`, `href`, `role` dan identidad sin dibujar texto |
| `position` | `styles`, pidiendo `position` | G3 Memoria de trabajo (encabezado fijo o pegajoso) |
| `parentId` | `NodeTreeSnapshot.parentIndex` | G1 Región común, G3 Chunking, G5 (qué cajas forman una lista) |
| `paintOrder` | `LayoutTreeSnapshot.paintOrders` | Filtro de nodos tapados y orden de lectura de G5 |

`parentId` apunta al ancestro **retenido** más cercano, no al padre crudo del DOM, que
normalmente queda filtrado y colgaría.

## 6. El esquema de salida

`shared/schemas/group-result.schema.json`. La unidad puntuada es el grupo de constructo,
nunca la ley individual.

Campos obligatorios: `group_id`, `group_name`, `laws_subsumed`, `channel`, `not_applicable`,
`run` y `measurements`. Cuando `not_applicable` es falso, además `score` y `trigger`.
Cuando es verdadero, además `na_reason`.

Tres decisiones están codificadas en el esquema y no solo en prosa:

- **`trigger` es obligatorio** siempre que haya puntaje. Nombra la condición observable que
  fijó el nivel. Un puntaje sin la condición detrás no es auditable ni diagnosticable.
- **`measurements` es obligatorio**, con los valores crudos que sostienen el puntaje. Toda
  cifra agregada viaja junto a los datos por caso que la componen.
- **`run` exige `model_id`, `prompt_hash`, `repetition`, `runtime` y `captured_at`**, para
  que un resultado sea atribuible a una configuración declarada y no al nombre comercial de
  un producto.

Validado contra diez casos: acepta un resultado completo y un no-aplicable con razón, y
rechaza un puntaje sin `trigger`, uno sin `measurements`, un no-aplicable sin razón, un
puntaje fuera de 0–4, un grupo inexistente, una repetición fuera de 1–5, un hash mal formado
y un campo extra no declarado.

```bash
node scripts/validate-result.js --selftest    # 10/10
node scripts/validate-result.js resultado.json
```

## 7. El orquestador

`skills/ux-audit/SKILL.md`. No contiene lógica de evaluación: todo juicio vive en la rúbrica
de su grupo. Mover un juicio al orquestador lo sacaría del instrumento congelado y del
artefacto que el lector instala.

Captura, invoca cada grupo en su canal, valida cada salida contra el esquema y arma el
perfil de los siete. No promedia los siete en un número; si se pide un total, se emite con
la ponderación declarada y con la advertencia de que G7 subsume una ley y G1 subsume cuatro.

## 8. Instalación

```bash
git clone <repo> && cd ux-laws-plugin
./scripts/link-skills.sh          # o --copy en sistemas sin symlinks
claude --plugin-dir ./ux-laws-plugin
```

## 9. Lo que el wireframe no puede dar

- **G4 completo** (Von Restorff y Atención selectiva). Corre en screenshot, y por eso el
  pipeline tiene dos ramas.
- **Similitud por color.** Se puntúa por forma, tamaño y alineación.
- **Gradiente de meta** cuando la diferencia entre paso completado y pendiente depende solo
  del color. Se marca `evidence_insufficient` en vez de inventar el estado.
- **Contenido pintado fuera del árbol de layout**, dentro de un `canvas` o como parte de una
  imagen rasterizada. No tiene caja y no aparece. El corpus se revisó contra esta condición
  al seleccionarlo.
