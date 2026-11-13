# Panel de evaluadores

## El panel aplicado (13 de noviembre de 2026)

Diseño decidido por los investigadores: cada evaluador (E1–E6) calificó **cinco páginas**
en los siete grupos, en escala **1–4**, con la guía del equipo. Mateo recibió seis archivos
y un programa los unió en un libro con las hojas «Experto 1» … «Experto 6».

```bash
# el libro va en panel/entregas/ (fuera de git)
node scripts/panel-consolidado.js importar panel/entregas/recibidos-2026-11-13/Rubrica_Evaluacion_Expertos_calificada.xlsx
node scripts/panel-consolidado.js describir          # -> panel/descripcion-panel.json
node scripts/comparar-panel.js corridas/corpus       # -> panel/comparacion-panel.json
```

La regla de comparación con el sistema está en `docs/ANALISIS-PANEL-13NOV.md`. Con un
evaluador por página no hay acuerdo entre evaluadores: `acuerdo-panel.js` no aplica a este
diseño.

## El diseño original con plantillas

Lo que sigue es el protocolo previsto antes del 13 de noviembre. Se conserva por si el
equipo amplía el panel con las plantillas.

Seis evaluadores externos, escogidos por el equipo, califican las 30 páginas del corpus
sellado en los siete grupos: 210 unidades cada uno. El equipo sabe quiénes son. Lo que
es anónimo es lo que se guarda y se reporta: **no se reportan nombres ni datos que
permitan identificar a los evaluadores**. Cada uno es `E1` … `E6` y nada más.

## Qué entra a git y qué no

| | Dónde | ¿Git? |
|---|---|---|
| Este archivo y las plantillas vacías | `panel/README.md`, `panel/plantillas/` | sí |
| Las hojas devueltas por los evaluadores | `panel/entregas/` | **no** |
| Las respuestas importadas y el acuerdo | `panel/respuestas/`, `panel/acuerdo-panel.json` | **no**, hasta que el equipo decida |
| La tabla que asocia `E1…E6` con personas | Drive institucional, custodio Camilo | **nunca** |

`.gitignore` ignora todo `panel/` salvo este archivo y `panel/plantillas/`.

## Paso a paso

```bash
node scripts/panel-plantilla.js          # regenera panel/plantillas/panel-E1.xlsx … panel-E6.xlsx
```

1. Enviar a cada evaluador **su** plantilla y el documento de rúbricas. Califican la
   **página renderizada** (la URL de la hoja «Paginas»), nunca el wireframe.
2. Al recibir cada archivo, guardarlo como `panel/entregas/panel-E<n>.xlsx`. Si llega
   con otro nombre, renombrarlo **antes** de importarlo: el importador rechaza
   cualquier nombre que no sea `panel-E1.xlsx` … `panel-E6.xlsx`.
3. Importar:

   ```bash
   node scripts/panel-importar.js --todos        # -> panel/respuestas/respuestas-E<n>.csv
   ```

   Si algo no cuadra (filas fuera de orden, un nivel que no es 0–4 o NA, un trigger
   fuera del vocabulario del grupo, un evaluador distinto del nombre del archivo), no
   escribe nada y dice qué fila. No pisa un CSV con juicios sin `--force`.
4. Calcular el acuerdo entre evaluadores:

   ```bash
   node scripts/acuerdo-panel.js                 # -> panel/acuerdo-panel.json
   ```

## Lo que el importador hace con los datos personales

Excel escribe en el archivo el nombre de quien lo guardó (`docProps/core.xml`,
`docProps/app.xml`) y el autor de cada comentario de celda. El importador **no lee esas
partes**: solo la hoja «Calificar». El CSV resultante lleva `E<n>` y las calificaciones, y
no copia el nombre del archivo original. Los `.xlsx` devueltos sí conservan esos
metadatos: por eso `panel/entregas/` no entra a git y conviene guardarlos con la tabla
de correspondencia, en el Drive institucional.

## El acuerdo

Brennan–Prediger con pesos cuadráticos, `w_ij = 1 − ((i − j)/4)²`, `p_e = 0,75`, que no
depende del número de evaluadores. Con seis hay 15 pares. Cada par se calcula sobre las
unidades que **ambos** calificaron con un nivel de 0 a 4, y su `n` se reporta. NA y
celdas vacías no entran al coeficiente y se cuentan aparte. El valor global y el de cada
grupo ponderan cada par por su `n`; al lado va el promedio simple de los pares. Todo se
reporta con y sin G1, que es no interpretable en la versión 1.

Es acuerdo **entre** evaluadores humanos, no acuerdo del sistema con ellos.

`[PENDIENTE: decisión del equipo sobre publicar el dataset anonimizado — dónde, cuándo y con qué licencia.]`
