# G4: criterios propuestos para la fase nueva

20 de octubre de 2026. Juan confirmó que todavía no hay acuerdo con Camilo y pidió
proponer los criterios. Son decisiones operativas del equipo para probar el instrumento;
no se atribuyen al asesor ni se presentan como consenso experto. Se registran antes de
pedir respuestas nuevas. Las fases anteriores conservan sus reglas y resultados.

## Sin aislados y sin contenido funcional tratado como publicidad

Se propone **nivel 1** para Bn=0 e I=0. La rúbrica ya equiparaba tres o más énfasis que
compiten con no tener foco. Dar 3 supondría orientación que no está acreditada; dar 0
confundiría este caso con el problema combinado de publicidad y falta de foco. La nueva
regla completa un hueco, sin cambiar los cortes geométricos.

## Dos aislados con jerarquía

Se propone **nivel 2**, igual que con dos sin jerarquía. Reconocer una diferencia entre
los dos no demuestra que el dominante corresponda al objetivo de la sección. El nivel 3
conserva su requisito de foco único y pertinente. Se registra la jerarquía, pero no se
redefine P ni se concede un nivel alto sin esa evidencia. Es una elección conservadora
que debe contrastarse con Camilo y los expertos.

## Foco pertinente con contenido sustantivo tratado como auxiliar

Se propone **nivel 2** para I=1, P=true, Bn=0 y Cn>0. La pantalla orienta el foco, pero
relega información de la tarea. El 3 exige Cn=0 y no se concede; tampoco se equipara este
caso al 0 combinado con publicidad. El trigger Cn identifica el problema que limita el nivel.

P indeterminado, falta de equivalencia o imposibilidad de seleccionar un conjunto siguen
permitiendo abstenerse. Completar las reglas no autoriza a inventar evidencia. No aplicable
sigue separado de una abstención y de un cero. Las combinaciones nuevas se probarán en una
fase independiente antes de hablar de validación.

## Selección del conjunto principal

Se pide una razón breve de selección y se prioriza la tarea visible de la sección. Ni el
área, ni un botón destacado del encabezado, ni los puntos de un carrusel demuestran que
ese sea el conjunto principal del contenido. Si no se puede sostener la equivalencia o la
selección, se conserva la abstención. No se entregan al evaluador nuestras preferencias
por ids de las páginas revisadas. Esta aclaración puede cambiar la selección y por eso se
registra antes de la fase nueva. No es una referencia experta ni una lista fija de conjuntos.

## Justificación consistente

El contrato 0.2.0 fija un trigger por condición, en orden de prioridad. El 4 usa canales
para distinguir la condición adicional del 3. El esquema histórico se conserva; el nuevo
validador rechaza incoherencias sin reescribir respuestas. La estabilidad de ese campo se
informa como cumplimiento de contrato, no como una mejora espontánea del razonamiento.

## Entrada de G4 1.0.7 y clases de candidatos

La revisión detectó una falsa marca de parcialidad causada por comparar áreas decimales.
La versión nueva para G4 compara bordes con un margen de ocho épsilon de máquina, escalado
por coordenada. Ese margen absorbe redondeo de la aritmética, no recortes visuales: una
salida real de 0,00001 píxeles sigue marcada en las pruebas. No se cambia un umbral de la
rúbrica ni se elimina el recorte de cajas que salen de la pantalla.

La proyección recibe la fuente 1.0.6 y entrega G4 1.0.7. Solo recalcula parcial y retira las
clases de los candidatos a banner, para evitar que nombres de implementación decidan un
juicio visual. Conserva ids, cajas, rasgos y cantidades. No edita las capturas, las medidas
originales ni otros grupos. Se comparan todos los campos y se prueba la regresión concreta
antes de recibir respuestas nuevas. Hay 110 conjuntos con marca corregida y 33 respuestas
históricas que los eligieron; eso no equivale a eliminar sus otros límites de evidencia.

La fase cambia rúbrica, aclaración de selección, metadatos y versión de CLI respecto de la
anterior. Sus diferencias no se atribuirán a un solo cambio. Los registros de octubre
anteriores conservan sus propios contratos y fechas.

## Canales visuales independientes

Para la fase nueva se aclara que cambiar el color de un borde o del texto sigue siendo
el canal color. El borde solo añade otro canal si cambia forma, grosor o estilo. Así no
se concede 4 por nombrar dos veces la misma señal cromática. La aclaración se registra
antes de evaluar los controles de uno y varios canales.
