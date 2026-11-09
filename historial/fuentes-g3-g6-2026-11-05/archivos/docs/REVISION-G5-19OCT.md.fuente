# G5: revisión y preparación de la parte de progreso

19 de octubre de 2026.

El piloto general ya terminó: **120 respuestas válidas**. Revisamos las 63 que marcaron evidencia insuficiente, sin cambiar sus puntajes, sus NA ni sus observaciones. También dejamos diez ejemplos separados para preparar la prueba de progreso. **Al cerrar esta preparación aún no tenían evaluaciones del modelo ni de expertos.**

**Actualización posterior del 19 de octubre:** Juan autorizó evaluar los ejemplos y se completaron las **45 respuestas válidas**, sin fallos técnicos ni inválidas. Las 40 posiciones con nivel o NA esperado coincidieron; las cinco de P10 se revisan aparte. Hubo diferencias en las marcas de evidencia insuficiente de P02 y se detectaron clases CSS que pueden dar pistas al modelo. Estas limitaciones están en el [informe de ejecución](../pilotos/g5-progreso-2026-10-19/INFORME.md). Se comprobaron las 45 sesiones y se sellaron 223 archivos primarios. El seguimiento quedó pausado. Los criterios y expectativas previos no se modificaron.

**Última actualización del 19 de octubre:** terminaron otras **70 respuestas válidas**,
separadas en una comparación sin clases CSS y una prueba de los casos pendientes. P06 ya
se evaluó como E01 con una expectativa de nivel 1 autorizada por Juan y registrada antes
de las respuestas. También se probaron positivos de nivel 4 en horizontal y vertical.
El [cierre actual](CIERRE-G5-19OCT.md) reúne los resultados y las explicaciones imprecisas
encontradas. La evaluación experta sigue pendiente.

## Qué encontramos en las 63 respuestas

La marca de evidencia insuficiente no significa que la respuesta esté mal formada. Advierte que alguna parte de la evidencia no alcanza para asegurar el juicio. En este piloto aparece en 13 de las 24 páginas.

Agrupamos cada respuesta por su motivo principal para no contarla dos veces:

| Motivo principal | Respuestas | Páginas |
|---|---:|---|
| Lista recortada y cajas superpuestas | 20 | C06, C09, C18, R03 |
| Lista recortada | 10 | C02, C10 |
| Cajas superpuestas y orden ambiguo | 15 | C15, C21, C23 |
| Elementos agrupados bajo una raíz virtual | 5 | C12 |
| Opciones que no quedaron en los nodos de la captura | 5 | C07 |
| Lista en dos filas que el detector no reconoce | 5 | R02 |
| Publicidad superpuesta sobre una lista secundaria | 3 | C17 |
| **Total** | **63** | **13 páginas** |

Los primeros cuatro motivos salen de los campos de la lista elegida en cada respuesta: 50 marcas ya tienen un límite registrado por la medición. Los otros tres se revisaron con las imágenes y los nodos originales. Una misma respuesta puede mencionar más problemas; la tabla solo muestra el principal. Por ejemplo, C02 también señala una posible lista secundaria omitida.

- **R02:** confirmamos que «Most requested» tiene ocho elementos LI bajo el padre retenido 1829, repartidos en dos filas. El detector exige que todo el conjunto esté alineado en una fila o columna; por eso no lo entrega. Los cinco NA se conservan, pero **no podemos usarlos como prueba de que G5 no aplica a esa página**. Es una limitación del detector, no ausencia demostrada de lista.
- **C07:** «Mercado» y «Reacondicionados» aparecen entre «Hogar» y «Otros» en el screenshot, pero no están representados en ese tramo de los nodos guardados. No basta con cambiar el detector de listas: habría que revisar la captura en una fase nueva. El archivo reducido no permite saber por qué se descartaron. No rellenamos esos nodos a mano.
- **C17:** las repeticiones 2, 4 y 5 señalaron publicidad sobre la lista secundaria. Las 1 y 3 no marcaron insuficiencia. Conservamos las cinco respuestas. Que el nivel sea estable no significa que también haya acuerdo sobre la calidad de la evidencia.
- **C12:** una raíz virtual agrupa nodos sin ancestro retenido. Permite referirse a esa secuencia, pero no demuestra que sus elementos fueran hermanos en la página original. No se inventa un padre.

Los recortes y solapamientos se mantienen como límites del piloto. No se completan mirando otra zona de la página ni se vuelve a evaluar hasta obtener un puntaje distinto. Si luego mejoramos la captura o la detección, será otra versión y se reportará aparte.

## Qué dejamos preparado

La [galería de diez ejemplos](../preparacion/g5-progreso-2026-10-19/index.html) permite abrir cada pantalla y comparar su captura con su wireframe. Los [criterios previos](../preparacion/g5-progreso-2026-10-19/criterios.md) y las [expectativas de diseño](../preparacion/g5-progreso-2026-10-19/casos.json) quedaron registrados antes de capturar.

| Casos | Qué permiten revisar | Estado |
|---|---|---|
| P01–P02 | Proceso sin indicador y barra que no nombra ni ubica | Evaluados en la primera serie y en la comparación sin clases |
| P03 | Estado que depende solo del color | Evaluado; se conserva la marca de evidencia insuficiente |
| P04–P05 | Estado por forma, con total explícito y sin total | Evaluados; se conserva la distinción entre total declarado y no declarado |
| P06 | Nombra las etapas pero no marca la actual | Evaluado como E01: nivel 1 en las cinco repeticiones con la regla nueva |
| P07–P09 | Carrusel, ruta común y formulario con Enviar | Evaluados como controles, sin inventar un proceso |
| P10 | Indicador cortado por el borde de la pantalla | Evaluado aparte, sin nivel esperado; se conserva el límite |

Son pantallas hechas por nosotros para probar situaciones concretas. No sustituyen páginas reales ni el consenso de expertos. Las expectativas propuestas no se deben enviar al modelo cuando se evalúen.

Los diez casos tienen sus cuatro archivos de captura, medidas de G5 y hashes. Las listas de etapas llegan completas en P03–P06, y P10 conserva el recorte previsto. Las capturas son de 1440 × 900. El control general de captura marca pocos nodos en estos ejemplos pequeños (17–49 frente al mínimo de 50 para páginas reales); dejamos esa advertencia tal como salió. La inspección visual y la comprobación de las listas verifican que las pantallas locales sí cargaron. No se bajó el umbral.

Esta preparación usa medición 1.0.6 y el generador actual de wireframes con X. El piloto de octubre conserva sus imágenes históricas y la medición 1.0.5. No se mezclan sus resultados. Al cerrar la preparación aún no se había ejecutado ninguna solicitud nueva al modelo; el avance posterior aparece al inicio de este documento.

## Qué falta para cerrar G5

1. Contrastar con Camilo la regla de nivel 1 autorizada por Juan. Las pruebas del caso sin paso actual y de los positivos de nivel 4 ya terminaron.
2. Mantener declarados los límites de captura y detección y las siete explicaciones imprecisas de la prueba nueva. La comparación sin clases también terminó; sus 45 posiciones conservaron nivel o NA, pero eso no valida todos los argumentos del modelo.
3. Comparar con expertos y completar el consenso de los casos dorados. La prueba técnica por sí sola no valida el grupo.

Podemos presentar el avance así: **«Terminamos el piloto general de G5, revisamos sus 63 marcas de evidencia insuficiente y completamos las pruebas separadas de progreso. Después hicimos 70 evaluaciones adicionales para retirar las pistas de clases CSS y probar los casos pendientes de niveles 1 y 4. Los niveles coincidieron con lo previsto; conservamos los límites y las explicaciones imprecisas. Falta contrastar la nueva regla con Camilo y comparar con expertos».**

## Archivos y comprobación

- [Revisión por respuesta, CSV](../revisiones/g5-2026-10-19/respuestas-con-limite.csv): las 63 marcas, sus causas principales y rutas a la evidencia original.
- [Revisión completa, JSON](../revisiones/g5-2026-10-19/revision.json): las 120 respuestas, incluidos los dos casos de C17 sin marca, con hashes y hallazgos originales.
- [Registro previo de los ejemplos](../preparacion/g5-progreso-2026-10-19/REGISTRO.json) y [control de capturas](../preparacion/g5-progreso-2026-10-19/CONTROL-CAPTURAS.json).
- [Informe del piloto general](../pilotos/g5-2026-10-07/INFORME.md), que se conserva sin cambios.

Para comprobar los archivos desde la carpeta del proyecto:

```bash
node scripts/verify-pilot-g5.js pilotos/g5-2026-10-07 --verify-seal
node scripts/review-g5-evidence.js
node --test scripts/review-g5-evidence.test.js
node scripts/prepare-g5-progress.js verify
```

La primera comprobación revisa los 534 archivos primarios, las 120 sesiones y que cada resultado siga igual a su respuesta original. Los scripts de esta revisión no llaman al modelo ni cambian el instrumento.
