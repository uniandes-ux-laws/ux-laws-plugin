# Corrección del cierre de resultados

4 de noviembre de 2026. Corrección revisada y autorizada para publicación por Juan.

El cierre podía aceptar una lista incompleta y generar un perfil con grupos sin respuestas.
Ahora comprueba que estén los siete grupos y todas las repeticiones declaradas, entre una
y cinco por grupo. La configuración actual usa el canal de referencia de cada grupo.

## Qué cambiamos

- Se rechazan grupos, repeticiones e identificadores repetidos o fuera del plan.
- Cada entrada debe apuntar a un resultado distinto. Se detectan rutas equivalentes y
  enlaces que intentan reutilizar el mismo archivo.
- Se señalan resultados que faltan o archivos JSON extra que no están en la lista.
- Se revisa que las repeticiones de un grupo tengan el mismo prompt registrado.
- La fecha de captura y los parámetros de la respuesta deben coincidir con el registro.
- Las respuestas se ordenan por repetición antes de armar el perfil.
- Una cantidad de repeticiones como `2.5` o `2abc` se rechaza al preparar la corrida.

Las repeticiones independientes pueden tener el mismo puntaje. Eso sigue siendo válido.
Los errores no se corrigen automáticamente ni se vuelven a solicitar respuestas al modelo.
Si hay un perfil de un cierre anterior, se conserva y se avisa que no fue actualizado.

## Archivos para revisar

| Archivo | Cambio |
|---|---|
| [orchestrate.js](../scripts/orchestrate.js) | Comprobaciones previas al cierre y validación de los resultados. |
| [orchestrate-cierre.test.js](../scripts/orchestrate-cierre.test.js) | 24 pruebas locales del cierre. Usan datos artificiales, sin llamadas al modelo. |
| [CLAUDE.md](../CLAUDE.md) | Registra la preferencia de código y textos claros y la revisión de Juan antes de publicar. |

## Cómo se comprobó

Pasaron las **195 pruebas del proyecto**, incluidas las 24 nuevas. El control de la
auditoría que declaraba cinco repeticiones y solo incluía una entrada ahora falla sin
generar perfil. Los casos completos de una y cinco repeticiones sí cierran.

También se verificaron la preservación de los 5.159 archivos anteriores y los diez sellos
de pilotos. Se mantuvieron los puntajes, las rúbricas, las capturas y las respuestas históricas.

Para repetir las pruebas:

```bash
node --test scripts/orchestrate-cierre.test.js
node --test
```

Este cambio corresponde al cierre y la detección de duplicados. El manejo y presentación
de «no aplica», abstenciones y la advertencia de G1 siguen como la siguiente tarea.

Juan autorizó publicar esta corrección con el mensaje **«Cierre resultados»**.
Los próximos cambios siguen sujetos a su revisión antes de publicarse.
