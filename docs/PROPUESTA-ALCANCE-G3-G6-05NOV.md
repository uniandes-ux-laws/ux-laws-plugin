# Propuesta para cerrar el alcance de G3 y G6

5 de noviembre de 2026. Propuesta del equipo preparada por solicitud de Juan.
**Pendiente de revisión con Camilo.** No se presenta como una decisión suya ni como
una regla validada por expertos.

## Qué problema estamos resolviendo

En G3 hay una condición incompleta: seis a ocho unidades bien separadas, con encabezados,
sin mezcla temática y sin datos requeridos fuera de vista reciben nivel 2 si hay contenido
ajeno fuera de la región. Si ese contenido ajeno desaparece, la regla deja de asignar nivel.
Esto deja sin respuesta un caso más limpio que el que sí estaba cubierto.

En G6, una captura no permite confirmar todo lo que el catálogo pregunta. Un pie recortado
no demuestra que falten enlaces de contacto y no ver una ruta no demuestra que el sitio
carezca de jerarquía. Cambiar esas dudas por «no aplica» o por cumplimiento produciría
puntajes que la evidencia no sostiene.

## G3: ampliación pequeña del nivel 2

Proponemos incluir el caso con **seis a ocho unidades, segmentación con encabezados,
sin mezcla, sin dependencia de datos fuera de vista y sin contenido ajeno**. Exigimos
inventario completo y unidades no recortadas para este caso nuevo.

Se conservan los cortes de 5, 8 y 12, la prioridad de las reglas 0 y 1 y la condición
adicional del nivel 4. La presencia de contenido ajeno fuera de la región deja de ser
obligatoria para obtener el nivel 2. No se modifican los otros niveles.

La justificación es el vacío de la definición, no conseguir una distribución determinada
en los pilotos. Los cortes siguen siendo una convención del proyecto, no un límite de
memoria demostrado por esta prueba.

Las demás combinaciones sin regla continúan como abstención. Por ejemplo, no asignamos
automáticamente un nivel a nueve unidades bien segmentadas. Las cifras dudosas, el
inventario incompleto y los elementos tapados siguen llevando su advertencia.

## G6: diagnóstico parcial y puntaje global separados

Conservamos el catálogo v1 y sus ocho convenciones, los niveles y las condiciones de
abstención. Añadimos un diagnóstico que muestra, con sus ids y razones:

- Convenciones observadas que se cumplen.
- Incumplimientos observados.
- Convenciones confirmadas como no aplicables.
- Convenciones que no se pudieron determinar.
- Cuántas convenciones se evaluaron y cuántas quedaron indeterminadas, además de los
  juicios visibles sobre redundancia y trabajo trasladado.

El diagnóstico puede ser útil aunque el grupo no tenga puntaje. No calculamos un promedio
de las convenciones visibles ni presentamos un puntaje parcial como si calificara el sitio.
Un cero confirmado por una regla prioritaria puede conservarse aunque haya otras dudas;
la incertidumbre sigue declarada. Tampoco se transforma una abstención en «no aplica».

**Este cierre acepta expresamente que G6 puede no dar un nivel global con una sola
captura.** Si el objetivo exige un nivel en todas las páginas, hace falta acordar otra
versión del instrumento o ampliar la evidencia. Esa decisión cambia el método y no se
resuelve completando información por suposición. Las convenciones no resueltas no se
cuentan como errores de la página.

## Cómo queda separado del trabajo anterior

La revisión tiene identificador `propuesta-2026-11-05`. Su implementación está en
[alcance-g3-g6.js](../scripts/alcance-g3-g6.js). Las rúbricas canónicas, el contrato
0.1.0, los pilotos de octubre y la entrega 0.2.1 conservan sus archivos y resultados.

La rúbrica de G3 propuesta se genera como una copia para esta fase. El documento original
no se sobrescribe. G6 recibe la misma rúbrica y el diagnóstico se deriva de su respuesta
original después de evaluarla; no se entrega al evaluador un resultado esperado.

La comprobación pequeña usa otra vez la pantalla sintética `portal.html` de la prueba
funcional anterior. Se declaran ese uso y su carácter de desarrollo: no es una muestra
independiente ni reemplaza calibración, consenso o validación experta.

## Qué se comprueba antes y después

Antes de pedir respuestas, se guardan estas reglas, sus pruebas, las instrucciones exactas,
las imágenes, los formatos y sus huellas. Las pruebas del código usan juicios sintéticos
definidos para comprobar los límites de las reglas; no son evaluaciones humanas ni del modelo.

Después se prevén solo dos posiciones nuevas, una por grupo, con `gpt-6.1-sol`, esfuerzo
bajo y sesiones distintas de Codex. Se conserva cada respuesta incluso si es inválida,
se abstiene o discrepa. Un fallo técnico detiene nuevas solicitudes. No se usan reinicios
gratuitos ni se repiten respuestas para conseguir coincidencias.

La revisión de G3 comprueba la coherencia del nivel con los propios juicios del modelo.
Eso no confirma que el modelo haya identificado bien las unidades o la región. El informe
de G6 muestra el diagnóstico con sus límites. Los resultados de esta fase se guardan aparte,
sin sumar sus puntajes a los pilotos anteriores.

## Decisión para revisar con Camilo

Proponemos aceptar esta ampliación pequeña de G3 y entregar G6 como diagnóstico de la
evidencia visible, conservando el nivel global solo cuando las reglas lo permitan.
Si Camilo pide otra solución, se registra una revisión nueva antes de evaluarla.
Las reglas de los evaluadores deben identificarse antes de comparar sus resultados con
cualquier versión nueva.

## Cómo usar la propuesta en una corrida nueva

En el repositorio de trabajo, se añade `--revision-g3-g6 propuesta-2026-11-05` al
comando `preparar` del orquestador. Las demás opciones de modelo, entorno, captura
y repeticiones se siguen declarando igual. El libro, las solicitudes, las entradas
y el perfil identifican la revisión. Se guardan también las huellas de sus fuentes.

Sin esa opción se mantienen las instrucciones anteriores. No se aplica la revisión
a una corrida ya preparada. En el perfil de esta propuesta, cada evaluación de G6
incluye `diagnostico` y G3 incluye la revisión del nivel contra sus propios juicios.
El cierre conserva el puntaje original del modelo, incluso si la revisión discrepa.

La prueba pequeña separada se prepara con `node scripts/prueba-alcance-g3-g6.js preparar`.
Ese paso no ejecuta modelos. El mismo script permite `verificar`, `ejecutar-una` y `cerrar`.
Antes de cada evaluación se consulta el uso disponible y se comprueba que no haya otro
ejecutor trabajando. Se detienen las solicitudes si falta margen o aparece un fallo técnico.

La entrega 0.2.1 ya comprobada no se regenera con estos cambios. Esta revisión queda
local para revisarla antes de incorporarla a una nueva entrega.
