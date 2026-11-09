# Revisión del proyecto y del material para evaluadores

4 de noviembre de 2026. Revisión del commit `36668ae`, que coincide con `origin/main`.

**El proyecto todavía no está completo al 100 %.** Las capturas, las skills y los pilotos
están preparados y conservados, pero faltan cerrar la versión de las reglas, corregir
algunos puntos de integración y completar la evaluación y el análisis de la tesis.
Enviar las imágenes a los evaluadores no demuestra por sí solo que esos pasos estén terminados.

Esto tampoco exige que el modelo acierte siempre. Un resultado negativo puede ser parte
de la tesis. Lo necesario es que las reglas y las versiones estén claras, que la ejecución
sea fiable y que los resultados se interpreten con sus límites.

## Qué se revisó

- `/Users/juan/Downloads/corpus-v1-evaluadores.zip` y su carpeta `dataset`.
- El PDF `tesis-21sep.pdf`, incluida su propuesta y los objetivos, métodos y resultados pendientes.
- El texto de la propuesta conservado en `docs/contexto/01-PROPUESTA-FORMAL.md`.
- Las siete skills, el orquestador, los pilotos y sus verificaciones, el protocolo,
  los casos dorados, el apéndice y los documentos de cierre.
- Un apéndice PDF local en Descargas. Se inspeccionó como posible material anterior;
  **no está confirmado que sea el que recibieron los evaluadores**.

Juan confirmó en este chat que **ética ya aprobó el estudio**, que los evaluadores aún
no han respondido y que Camilo no dio respuestas claras sobre las decisiones abiertas.
No se recibió el acta ni su fecha exacta. Tampoco quedó identificada la rúbrica o el
formulario enviados junto con las imágenes. Estos datos faltantes no se completan por suposición.

## Lo que sí quedó comprobado

El ZIP contiene **30 capturas, un manifiesto y el sello**. Los 32 archivos coinciden con
los de la carpeta recibida. Las 30 imágenes coinciden byte por byte con los screenshots
del corpus del proyecto y con sus hashes sellados. Son PNG válidos de 1440 × 900.

El manifiesto coincide al normalizar los finales de línea. La diferencia de formato entre
Windows y macOS no cambia las páginas ni sus datos. El sello Markdown también coincide.
Usar screenshots para los humanos corresponde a lo que establece la tesis; la falta de
wireframes en este paquete no es un defecto.

Pasaron estas comprobaciones locales:

| Comprobación | Resultado | Qué permite afirmar |
|---|---|---|
| Pruebas existentes del código | 171 aprobadas, ninguna fallida | El comportamiento cubierto por esas pruebas se mantiene. |
| Validador de resultados | 71/71 casos correctos | Se comprueba el formato y la identificación de los resultados. |
| Compatibilidad de campos de las skills | 7/7 | Los campos citados existen. Hay avisos de campos no leídos en dos grupos. |
| Fidelidad geométrica | PASS; desviación máxima 0 px en las páginas de prueba | La geometría de esas pruebas se conserva; no certifica que todas las páginas reales estén limpias. |
| Sellos de corpus, calibración y dorados | Válidos | 120, 96 y 40 archivos comprobados, respectivamente. |
| Cierre de G1 y preservación de pilotos | Válidos | Se reprodujeron 24 resultados; se conservaron 5.159 archivos anteriores y diez sellos de pilotos con 4.160 archivos protegidos. |

Estas pruebas no sustituyen el juicio experto ni cubren todos los errores posibles.

## Lo que falta en el material de evaluación

### 1. Confirmar la misma versión de las reglas para humanos y modelo

El ZIP no contiene rúbrica, instrucciones de puntuación ni formulario. Pueden haberse
enviado por otro medio; no se puede comprobar con esta carpeta. Hay que conservar la
versión exacta que recibieron, junto con las instrucciones sobre puntuación, «no aplica»
y casos que no se pueden puntuar. El modelo y los humanos deben compararse bajo reglas
compatibles, sin dar a los expertos las respuestas del modelo.

El apéndice versionado, [apendice-rubricas.md](apendice-rubricas.md), fue generado el
12 de septiembre. Su contenido **no coincide con las skills actuales de G2, G3, G4,
G5, G6 y G7**. G1 sí coincide. El PDF local del apéndice es todavía anterior, del
10 de septiembre; por ejemplo, en G1 aún usa `bounds` donde la versión actual usa `ink`.
No se concluye que los expertos hayan recibido esos archivos: falta confirmarlo.

Hace falta generar y revisar el apéndice de la versión que finalmente se utilice.
Si los evaluadores ya comenzaron con otra versión, se conserva ese hecho y se acuerda
cómo separar las fases; no se sustituye el documento en silencio.

### 2. Aclarar las capturas con contenido tapado

- **L02, Bancolombia:** se ve un modal de preferencias de privacidad que tapa el contenido
  y desenfoca el fondo. Sin embargo, `meta.json` dice `sanity.ok=true` y `consent.limpio=true`.
  Es una diferencia confirmada entre lo visible y el control automático, que no estaba
  incluida en la advertencia del sello sobre capas sin cerrar.
- **L03, Éxito:** conserva un anuncio modal encima de la página. Este caso sí estaba
  declarado: sanidad fallida y capa sin cerrar. Se mantiene esa advertencia.
- **G04, Colpensiones:** se observa un carrusel central vacío e imágenes o iconos que no
  se muestran. Es una observación de la captura; no se atribuye una causa sin comprobarla.

Los archivos son los originales correctos, pero eso no garantiza que su contenido sea
adecuado para cualquier interpretación. Hay que dejar claro si se evalúa la pantalla tal
como fue capturada y cómo se tratan sus límites. Si se decide sustituir o excluir una
captura, debe registrarse una versión o exclusión justificada y comunicarse de forma
consistente. Las capturas ya enviadas no se reemplazaron en esta revisión.

## Lo que falta en las skills y su integración

### 3. Dejar por escrito las decisiones que todavía no están cerradas

| Grupo | Estado y decisión pendiente |
|---|---|
| G1 | Cerrado para v1 como **no interpretable**. Mantener esa marca y la limitación; no cambiar cortes para repartir puntajes. El 0 histórico de C13 sigue contradiciendo la regla de «no aplica» con menos de dos grupos y debe leerse con esa advertencia. |
| G2 | El piloto conserva 41 puntajes y 79 abstenciones. Faltan reglas para algunas combinaciones y aclarar acción ausente frente a acción que no destaca. |
| G3 | Conserva 20 puntajes, 70 abstenciones y 30 inválidas. Hay combinaciones sin nivel y variación al elegir la tarea y sus unidades. |
| G4 | Las tres reglas nuevas y la selección del conjunto son propuestas probadas, no acuerdos claros con Camilo. En S07 hubo cinco desacuerdos con el nivel previsto. |
| G5 | La regla de nivel 1 para etapas nombradas sin paso actual está propuesta y probada. Falta confirmar que sea la misma que recibirán los humanos. Se conservan las explicaciones imprecisas y los límites de captura y detección. |
| G6 | Las 120 respuestas se abstuvieron. Debe definirse el alcance de lo evaluable cuando el pie o la ruta no se pueden resolver y cómo se reportará esa limitación. No se inventa un nivel para completar la tabla. |
| G7 | El piloto terminó y fue estable. Falta el contraste experto; estabilidad no significa corrección. |

No hace falta convertir todos los grupos en casos exitosos. Sí hay que decidir si la
versión final conserva estas abstenciones y límites o si habrá otra versión registrada
antes de nuevas evaluaciones. La falta de una respuesta clara de Camilo no equivale a
aprobación de criterios concretos.

### 4. Corregir el cierre automático y preparar la comparación de canales

Se comprobó un fallo en [orchestrate.js](../scripts/orchestrate.js): `recoger` valida las
entradas que aparecen en el libro, pero no exige que estén los siete grupos ni todas las
repeticiones previstas. En un control local con una copia de una respuesta real de G7,
un libro con **una sola entrada** y cinco repeticiones declaradas produjo un perfil:
G7 tenía una respuesta y los otros seis grupos tenían cero. El proceso terminó sin error.
Es una prueba de software, no una nueva corrida del estudio.

Antes de dar por terminado el artefacto, el cierre debe verificar grupos, repeticiones,
duplicados y completitud. El perfil también debe conservar explícitamente la diferencia
entre abstención y «no aplica», y llevar G1 marcado como no interpretable. Actualmente
resume principalmente niveles y triggers; no incluye esas distinciones como estados propios.
La skill `ux-audit` además habla de volver a pedir salidas rechazadas, mientras los pilotos
registrados conservan las inválidas sin sustituirlas. Esa instrucción debe alinearse con
el modo de investigación, manteniendo todos los intentos y respuestas.

Otro control local de `preparar`, con cinco repeticiones, generó **35 solicitudes**:
siete grupos en sus canales de referencia. La propuesta requiere **65 por página y runtime**:
seis grupos en dos canales, G4 en uno, y cinco repeticiones. Falta implementar o documentar
la preparación de esa grilla completa y su ejecución en ambos runtimes. Ambos controles
usaron copias temporales y solicitaron **cero respuestas al modelo**.

## Lo que falta para cumplir la propuesta de tesis

### 5. Completar los casos de referencia y la medición final

El archivo [esperados-consenso.csv](../dorados/esperados-consenso.csv) conserva **70 filas
sin nivel, trigger ni justificación de consenso**. Existen las evaluaciones individuales
de los autores; falta registrar el consenso. Tampoco hay evidencia en el repositorio
revisado de la ejecución de las siete skills contra ese consenso, con el criterio
previamente fijado de ±1 nivel en al menos ocho de diez casos por grupo, y el tratamiento
de G1 conforme a su cierre no interpretable.

Los pilotos sobre 24 capturas de calibración y los ejemplos de desarrollo **no son la
evaluación final de las 30 páginas**. No se encontró el conjunto final de 3.900 invocaciones
previstas ni sus comparaciones entre runtimes y entre representaciones. Si se reduce el
alcance por tiempo o presupuesto, debe acordarse y declararse; no contar pilotos como
si fueran esa grilla.

### 6. Recibir las calificaciones humanas y hacer el análisis

Juan confirma que los evaluadores todavía no han respondido. Falta conservar sus niveles
independientes, documentar su experiencia y entrenamiento y el número efectivo de
participantes. La propuesta apunta a cuatro, con tres como mínimo declarado.

Primero se calcula el acuerdo entre humanos y después se compara el modelo con la
referencia. Faltan los resultados, los intervalos, el análisis de variación y las
comparaciones de canales y runtimes. Deben reportarse las abstenciones, inválidas y
casos no aplicables, y el acuerdo global con y sin G1. Los scripts existentes para
acuerdo inicial de los autores y ejemplos del coeficiente no constituyen ese análisis
final del panel. Sin calificaciones humanas no se puede afirmar validación experta.

### 7. Actualizar la documentación y la entrega

- **Ética:** la aprobación está confirmada por Juan. Falta registrar el soporte y la fecha
  real en el estado actual y en el documento de tesis, sin reescribir retrospectivamente
  la propuesta ni los registros previos. Ajustar el cronograma a las fechas reales.
- **Documento de tesis:** el PDF disponible es la versión del 21 de septiembre. Los
  capítulos de resultados, análisis y discusión todavía contienen pendientes y no
  incorporan los pilotos de octubre. No se recibió una versión posterior para revisar.
- **Búsqueda bibliográfica y MinTIC:** en los archivos revisados siguen figurando como
  pendientes el registro reproducible de búsqueda y la comprobación entidad por entidad.
  No se encontró su cierre. Esto no afirma qué normas aplican; esa revisión sigue por hacer.
- **Versión instalable:** el único tag es `v0.1.0`, de septiembre. Las skills actuales
  tienen cambios posteriores. Falta identificar una versión final que corresponda al
  material de los expertos y al documento, y registrar su instalación y uso desde cero
  en otra máquina y en ambos runtimes. Las pruebas locales no demuestran ese punto.

## Orden recomendado para continuar

1. Recuperar exactamente la rúbrica, instrucciones y formulario que recibieron los expertos.
2. Aclarar y registrar el tratamiento de L02, L03 y las capturas con límites, conservando
   lo ya enviado y cualquier trabajo que hayan empezado.
3. Escribir qué reglas y limitaciones tendrá la versión que se comparará con ellos.
4. Corregir la integración, actualizar el apéndice de esa versión y comprobar la entrega
   instalable. Esos cambios deben quedar separados de las respuestas históricas.
5. Completar el consenso y su comprobación; ejecutar la grilla acordada o declarar el
   alcance revisado. Recibir la evaluación humana y calcular los resultados.
6. Llevar los resultados y sus límites a la tesis, junto con las fechas y desviaciones reales.

## Evidencia guardada

La [carpeta de esta revisión](../revisiones/auditoria-2026-11-04/LEEME.md) contiene hashes,
comparaciones, salida de las 171 pruebas y los dos controles locales de integración.

Esta revisión solo agregó el informe y su evidencia. No modificó el instrumento, las
capturas enviadas, los resultados anteriores ni sus sellos. No se ejecutaron nuevos
pilotos, no se usaron reinicios y no se publicaron cambios en GitHub.
