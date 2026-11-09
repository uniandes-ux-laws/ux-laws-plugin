# Alcance de G3 y G6 en la entrega 0.2.2

5 de noviembre de 2026. Integración solicitada por Juan como decisión del equipo.
No se atribuye esta decisión a Camilo ni se presenta como validación experta.

## G3

El nivel 2 también cubre seis a ocho unidades completas, agrupadas con encabezados,
sin mezcla temática, sin datos requeridos fuera de vista y sin contenido ajeno.
El inventario debe estar completo. Las condiciones más graves de los niveles 0 y 1
conservan su prioridad. Los cortes de 5, 8 y 12 y las demás condiciones no cambian.

La regla anterior cubría el caso cuando había contenido ajeno fuera de la región,
pero no cuando ese contenido desaparecía. Se cierra ese vacío. Los demás casos sin
regla conservan la abstención y su motivo; no reciben una nota por obligación.

El nivel 2 es una convención de nuestra rúbrica. No es una medición directa de memoria
ni una nota indicada por Miller. La fuente actual es `skills/g3-capacidad-segmentacion/SKILL.md`,
con contrato G3 0.2.0.

## G6

El catálogo v1 de ocho convenciones y las reglas del puntaje global se conservan.
La respuesta puede tener puntaje si una condición lo sostiene o abstenerse si falta
información para decidirlo. «No aplica» necesita la condición explícita de la rúbrica.

El cierre añade un diagnóstico por repetición y canal. Se muestran las convenciones
cumplidas, incumplidas, no aplicables e indeterminadas, con sus ids y razones. También
se informa cuántas se evaluaron y qué se observó sobre redundancia y trabajo trasladado.

No se promedian convenciones ni se asigna una nota al subconjunto visible. Un T=0 indica
que no se identificaron operaciones; si T_evaluable es falso, el informe aclara que el
criterio no se pudo evaluar. La captura no demuestra cómo funciona todo el sitio.

El contrato de la respuesta de G6 sigue en 0.1.0. Su diagnóstico se genera después,
a partir de los juicios originales del modelo. No modifica la respuesta ni la puntúa.

## Ejecución y lectura

Las corridas nuevas usan `alcance-2026-11-05` por defecto. No hace falta activar una
opción adicional. La revisión aparece en el libro, las solicitudes, las entradas y
el perfil, junto con las huellas de las fuentes usadas.

Al cerrar se generan `perfil.json` y `perfil.md`. El primero conserva los datos y el
segundo permite leer el resultado y el diagnóstico de G6. El perfil usa versión 2.1.0.
La comparación añade el CSV de canales y conserva sus límites declarados.

La revisión del nivel contra los propios juicios de G3 puede señalar discrepancias.
Se informa lo encontrado, sin corregir la nota ni pedir otra respuesta automáticamente.
Esa comprobación no determina si el modelo identificó bien las unidades o la tarea.

## Versiones y resultados anteriores

Esta es una revisión posterior al protocolo base 0.1.0. La revisión de reglas y el
hash del prompt identifican el instrumento concreto; citar solo el protocolo no basta.
Los resultados de versiones distintas se separan antes de compararlos.

Las fuentes anteriores están en `historial/fuentes-g3-g6-2026-11-05`. Se contrastaron
con los registros guardados antes de las evaluaciones. Los pilotos y sus originales
siguen en sus carpetas. No se recalifican con las reglas nuevas.

Para comprobar los pilotos anteriores y la prueba local de la propuesta con su código:

```bash
node scripts/verificar-fuentes-historicas.js
node scripts/g1-closure.js verificar
```

El primer comando recrea una copia temporal del código anterior y solo ejecuta
verificaciones. No pide respuestas al modelo. El segundo comprueba el cierre de G1
y la preservación de los datos anteriores.

Las entregas 0.2.0 y 0.2.1 se conservan. La 0.2.2 es una entrega local nueva. Antes
de comparar con expertos hay que identificar la versión exacta de sus instrucciones.
La integración no sustituye esa comparación, el consenso ni la medición final de la tesis.
