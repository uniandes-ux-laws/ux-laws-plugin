# G5: ejemplos para probar progreso

**Preparación terminada; prueba separada ejecutada.** Hay diez pantallas locales, sus capturas y sus wireframes. Los criterios y las expectativas propuestas quedaron registrados antes de capturar. No hay respuestas del modelo ni de expertos en esta carpeta.

**Actualización posterior del 19 de octubre:** la evaluación con el modelo terminó en una carpeta distinta, con 45 respuestas válidas: [informe de ejecución](../../pilotos/g5-progreso-2026-10-19/INFORME.md). Allí se declaran las limitaciones de P02 y de las clases CSS que pueden dar pistas. Este paquete y su galería conservan el estado previo a evaluar; no se cambian los criterios ni las expectativas según las respuestas recibidas.

Abre [index.html](index.html) para ver los ejemplos. La [revisión de G5](../../docs/REVISION-G5-19OCT.md) explica qué encontramos en el piloto general y qué falta.

- [criterios.md](criterios.md): reglas fijadas antes de preparar las imágenes.
- [casos.json](casos.json): situaciones y expectativas propuestas; no son resultados ni una referencia experta.
- [REGISTRO.json](REGISTRO.json): fecha, versión del código y hashes anteriores a las capturas.
- casos/: pantallas HTML sin servicios externos. Se pueden abrir directamente. Los botones son de demostración.
- capturas/: screenshot, wireframe, nodos y metadatos de cada pantalla.
- entradas/: medidas de G5 para una futura evaluación; no contienen las expectativas.
- [CONTROL-CAPTURAS.json](CONTROL-CAPTURAS.json): comprobación de medidas, archivos y recorte previsto.
- SELLO-CAPTURAS.tsv: hashes de los 50 archivos de captura y entradas.

P06 queda sin puntuar porque falta aclarar el ancla. P10 solo sirve para revisar el límite de un recorte. Los otros ocho permiten preparar una evaluación de niveles o NA. Los diez tienen menos de 50 nodos por su tamaño: se conserva la advertencia del control general de captura, sin cambiar ese umbral.

Para verificar lo guardado:

```bash
node scripts/prepare-g5-progress.js verify
```

prepare registró los archivos antes de capturar y capture produjo las imágenes después. Ambos comandos rechazan sobrescribir esta preparación. Si hace falta cambiar un caso, se conserva esta versión y se registra otra antes de evaluarla.

La futura evaluación necesita otro registro con modelo, CLI, esfuerzo, repeticiones y prompts. No debe recibir casos.json, esta galería ni las expectativas. No se suma al piloto general ni se presenta como validación humana.
