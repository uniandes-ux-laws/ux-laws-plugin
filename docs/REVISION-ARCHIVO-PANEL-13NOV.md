# Revisión del archivo de calificaciones de expertos, 13 de noviembre de 2026

**Conclusión:** el archivo no sirve todavía como referencia humana de la tesis. No se
importó al flujo del panel, no se calculó acuerdo y no se comparó con el sistema. No
afirma nada sobre la calidad de las skills. Antes de usarlo hay que aclarar su
procedencia y cómo se calificó (§4).

## 1. El archivo

| | |
|---|---|
| Nombre recibido | `Rubrica_Evaluacion_Expertos_calificada.xlsx` |
| SHA-256 | `5b99752dbe24bf7e885f8122f328e4d3112646e0b97e655deb5e567d4553850f` |
| Copia local | `panel/entregas/recibidos-2026-11-13/` (fuera de git, como exige `panel/README.md`) |
| Hojas | «Guia de Grupos» y «Experto 1» … «Experto 6», todas visibles |
| Metadatos | `creator = openpyxl`, creado el 2026-11-04 01:38; guardado por última vez el 2026-11-13 02:35 por un integrante del equipo (Mateo, según `lastModifiedBy`) |
| Contenido | 210 filas: página, sitio, URL, grupo, descripción y «calificación (1-4)». Sin comentarios, fórmulas ni hojas ocultas. La validación de datos admite enteros de 1 a 4 |

Lo que sí cuadra: las 210 filas cubren las 30 páginas de `corpus/corpus-v1.csv` × 7
grupos, sin duplicados, y cada URL coincide con la del corpus. Todos los valores son
enteros de 1 a 4. Los evaluadores aparecen solo como «Experto 1…6»; el archivo no trae
nombres de evaluadores.

## 2. Diferencias con el protocolo del panel

| Protocolo (`panel/README.md`, `scripts/panel-plantilla.js:33-37`) | Archivo recibido | Consecuencia |
|---|---|---|
| Seis evaluadores califican **las 30 páginas**: 210 unidades cada uno | Cada evaluador calificó **5 páginas distintas**; cada unidad tiene una sola calificación | El acuerdo entre evaluadores (Brennan–Prediger, 15 pares) **no se puede calcular**: ningún par comparte unidades |
| Escala 0–4 con anclas de la rúbrica, y NA si el grupo no aplica | Escala 1–4 sin anclas, sin 0 y sin NA | No es la escala congelada. Pasar de 1–4 a 0–4 exige una regla que nadie fijó antes de ver los datos |
| Trigger obligatorio y justificación por unidad | No hay trigger ni justificación | No se puede auditar qué condición observó cada evaluador |
| Calificar la página renderizada a 1440 × 900, solo lo visible sin desplazarse | La hoja no dice viewport ni pliegue; la URL va «solo referencia» | No se sabe qué parte de la página se calificó, ni en qué fecha (los sitios cambiaron desde la captura del 10 sep.) |
| Plantillas `panel-E1.xlsx` … `panel-E6.xlsx` y el documento de rúbricas | Un solo libro generado por script, con una «Guía de Grupos» propia | Ver §3 |

**Evaluador y sector quedan confundidos.** El Experto 1 y el 2 calificaron solo páginas
de salud (H), el 3 y el 4 solo de gobierno (G), y el 5 y el 6 solo del estrato libre (L).
Una diferencia entre sectores no se distingue de la severidad de quien calificó.

## 3. La guía que acompaña las calificaciones no es la rúbrica

La hoja «Guia de Grupos» describe constructos distintos de los que miden las rúbricas:

- **G5** aparece como «visibilidad del estado del sistema, ubicación actual del usuario dentro del sitio y retroalimentación sobre su avance». Esa es la primera heurística de Nielsen. La rúbrica mide si las listas destacan su primer elemento y la affordance de progreso.
- **G6** aparece como «adherencia a estándares y patrones de diseño». Eso cubre Jakob, pero no Occam (elementos sobrantes) ni Tesler (trabajo que se le deja a la persona).
- **G2** incluye «flujos», que una captura estática no muestra.

Si los evaluadores calificaron con esta guía y no con las rúbricas, sus números miden otra
cosa que el sistema. `[PENDIENTE: confirmar qué documento recibió cada evaluador — Mateo o Juan.]`

## 4. Regularidades que hay que aclarar antes de usar los datos

Son hechos del archivo, no una conclusión sobre cómo se produjo:

- Ninguna de las 210 calificaciones es un 1. La escala tampoco ofrecía 0.
- En 30 páginas hay solo **15 perfiles distintos** (los siete niveles G1…G7 de una página). Varios se repiten idénticos entre evaluadores que, según el diseño, trabajaron por separado:

  | Perfil G1…G7 | Páginas | Evaluadores |
  |---|---|---|
  | 2 2 2 3 2 3 2 | H05, H09, G02, G08 | 1, 2, 3 y 4 |
  | 2 2 2 2 2 3 2 | H03, G03, G06 | 1, 3 y 4 |
  | 3 3 3 3 2 3 3 | H06, H07, G05, G09 | 2, 3 y 4 |
  | 3 3 3 4 3 4 3 | H08, L03, L06, L08 | 2, 5 y 6 |
  | 4 4 3 4 3 4 3 | L04, L09 | 5 y 6 |

- G3, G5 y G7 nunca reciben 4; G6 nunca recibe menos de 3. La distribución por evaluador, de 1 a 4, es 0/24/11/0, 0/9/24/2, 0/13/21/1, 0/13/22/0, 0/4/18/13 y 0/0/25/10.

Puede tener explicaciones legítimas: una transcripción desde las hojas originales, una
guía común con valores sugeridos o evaluadores que se consultaron. Pero CLAUDE.md §6 pide
sospechar del instrumento ante un resultado demasiado regular, y una referencia humana
exige saber cómo se produjo cada número.

`[PENDIENTE — Mateo: ¿estas calificaciones las escribieron los evaluadores o se transcribieron? ¿Dónde están las hojas originales de cada uno? ¿Calificaron por separado y sin ver las demás?]`

## 5. Qué se puede hacer con el archivo, y qué no

| | ¿Se puede? | Por qué |
|---|---|---|
| Acuerdo entre evaluadores | No | Ninguna unidad tiene dos calificaciones |
| Acuerdo del sistema con expertos | No, por ahora | No hay puntajes del modelo sobre páginas del corpus: la grilla no se ha corrido, y los pilotos usaron el conjunto de calibración. La prueba de humo sobre L01 no es un resultado de la tesis |
| Importarlo con `scripts/panel-importar.js` | No | Exige `panel-E<n>.xlsx`, hoja «Calificar», nivel 0–4/NA y trigger. Convertirlo obligaría a inventar trigger, NA y la regla 1–4 → 0–4 |
| Describirlo | Sí | La distribución de §4 queda registrada aquí |

## 6. Lo que haría falta para tener referencia humana

1. Que cada evaluador califique con la plantilla `panel-E<n>.xlsx` y el documento de rúbricas, en 0–4 con NA, trigger y justificación. Alternativa mínima, que deben decidir los investigadores: diseño con solapamiento, al menos dos evaluadores por unidad en una muestra fijada de antemano, para poder medir el acuerdo.
2. Que las calificaciones de este archivo, si se conservan, se reporten como lo que son: una calificación por unidad, en una escala 1–4 distinta, con la guía de §3, y sin acuerdo medible.
3. Que la regla para pasar de 1–4 a 0–4, si se usa, se fije y se registre antes de comparar con el sistema.

`[PENDIENTE: decisión de los investigadores sobre rehacer o completar el panel, y consulta con Camilo — Juan, Mateo.]`
