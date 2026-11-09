# Criterio recomendado para G3 y G6

5 de noviembre de 2026. Nota posterior a la propuesta y su prueba local.

Juan aclaró que Camilo les encargó tomar las decisiones de evaluación. Considera adecuada
la ampliación de G3 y propone mostrar en G6 lo que sí pudo evaluarse. Esta nota registra
esa orientación y la recomendación para el equipo; no atribuye la decisión a Camilo ni
afirma que los demás autores ya la hayan aprobado.

## G3

Recomendamos conservar la ampliación ya implementada: nivel 2 para seis a ocho unidades
completas, con encabezados, sin mezcla, sin datos requeridos fuera de vista y sin contenido
ajeno, con inventario completo. Los problemas que activan antes los niveles 0 y 1
conservan su prioridad.

La razón es corregir una condición incompleta: antes ese caso tenía nivel cuando había
contenido ajeno fuera de la región, pero no cuando ese contenido desaparecía. No se
cambiaron los cortes para obtener más coincidencias en los pilotos.

El nivel 2 es una decisión de nuestra rúbrica. No se presenta como una nota indicada por
la ley de Miller ni como una medición directa de memoria. El propio sitio de
[Laws of UX sobre Miller](https://lawsofux.com/millers-law/) recomienda no usar el número
siete para justificar restricciones innecesarias. Su explicación de
[chunking](https://lawsofux.com/chunking/) destaca la agrupación con significado y jerarquía.

Los demás casos sin regla siguen identificados como tales. Para completarlos después,
se define y registra primero el criterio y luego se prueba con casos nuevos. No se
asigna una nota por obligación ni se modifican las respuestas anteriores.

## G6

Recomendamos entregar el diagnóstico de la evidencia visible. Cada criterio conserva:

- Qué se pudo comprobar como cumplido o incumplido, con su evidencia.
- Qué se confirmó como no aplicable.
- Qué quedó indeterminado y por qué.
- Cuántos criterios se evaluaron y cuántos quedaron pendientes.

También se muestran los juicios sobre redundancia y trabajo trasladado. Un recuento de
operaciones observadas no demuestra que todo el sitio carezca de trabajo innecesario.

El puntaje global se conserva únicamente cuando una regla lo sostiene. Cuando falta
evidencia para decidirlo, el informe muestra el diagnóstico y la abstención. No se
promedian convenciones ni se calcula una nota del subconjunto como si evaluara todo G6.

El catálogo de ocho convenciones es la forma en que el proyecto hizo observable una
parte de G6. La [formulación de Jakob en Laws of UX](https://lawsofux.com/jakobs-law/)
trata de las expectativas que los usuarios traen de otros productos; no equivale por sí
sola a nuestro catálogo ni demuestra cómo puntuar cada captura.

## Cómo cerrar esta decisión

La recomendación es que el equipo adopte y justifique este alcance como decisión propia.
La orientación de Camilo puede ayudar a explicarlo en la tesis; su aprobación no se
trata como un requisito técnico para decidir cada condición.

Antes de integrarlo en la entrega final, hay que dejar identificada la revisión elegida
y comprobar que sus instrucciones, código y documento de reglas coincidan. Las pruebas
ya realizadas cubren 297 casos del código y dos evaluaciones reales de desarrollo sobre
una misma pantalla de ejemplo. No validan el instrumento frente a expertos ni todas las
combinaciones posibles.

Al comparar con evaluadores, se conserva la versión exacta que recibieron. Una revisión
nueva no se aplica hacia atrás a sus calificaciones ni a los pilotos. También se informa
qué proporción de respuestas tiene puntaje, abstención o error; las abstenciones no
cuentan como ceros ni se excluyen en silencio.

## Estado de los archivos

La implementación sigue local y opcional, con identificador `propuesta-2026-11-05`.
Esta nota no la activa por defecto ni reemplaza el ZIP 0.2.1. La mención a estar pendiente
de Camilo en la propuesta y en el informe corresponde al estado anterior a esta aclaración
de Juan; esos archivos se conservan porque forman parte de la prueba registrada.

La [propuesta original](PROPUESTA-ALCANCE-G3-G6-05NOV.md) y el
[informe de la prueba](../verificaciones/alcance-g3-g6-2026-11-05/INFORME.md) siguen intactos.
No se ejecutaron nuevas evaluaciones ni se publicó nada con esta nota.
