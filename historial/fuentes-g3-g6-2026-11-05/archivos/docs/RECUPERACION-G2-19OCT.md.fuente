# Los tres reintentos de G2 · 19 de octubre

Durante el piloto, R07-r3, R07-r4 y R07-r5 fallaron por conexión. En ese momento había 117 respuestas: 41 puntajes y 76 abstenciones. Los tres registros fallidos no tenían mensaje final ni un archivo de respuesta que se pudiera recuperar.

Se detuvieron las solicitudes y se guardaron los fallos. Juan confirmó: **«Sí, reintentar únicamente esas tres»**. La autorización está en [este registro](../pilotos/g2-2026-10-18/REINTENTO-TECNICO-AUTORIZADO-19OCT.json).

## Qué hicimos

1. Comprobamos que había uso disponible y que no había otra ejecución en curso.
2. Revisamos que los tres fallos coincidieran con sus copias en `fallos-tecnicos/2026-10-19-conexion/`, dentro de G2. Esas copias están protegidas por `SNAPSHOT-PAUSA-3-SHA256.tsv`; los logs completos se conservan localmente.
3. Retiramos solo los seis registros activos duplicados de esas posiciones, después de comprobar las copias. Los 117 resultados recibidos se conservaron.
4. Ejecutamos el mismo programa con `--limit 3`. Como solo faltaban esas tres posiciones, no volvió a pedir las demás. Se mantuvieron el modelo, la CLI, el razonamiento, las imágenes, la medición y las reglas.

Lo autorizado era un solo reintento por posición. Si volvía a fallar una solicitud, correspondía detenerse y guardar el nuevo fallo.

## Cómo terminó

Las tres devolvieron abstenciones que cumplieron el formato. **G2 quedó con 120 respuestas: 41 puntajes y 79 abstenciones**, sin fallos pendientes. Sus 117 resultados anteriores siguen iguales.

Se comprobaron 240 conversaciones con respuesta entre G2 y G7, más las tres fallidas. El sello de G2 protege 554 archivos y el de G7, 539. El detalle de las comprobaciones está en [QA-CIERRE.json](../pilotos/g2-2026-10-18/QA-CIERRE.json).

El seguimiento automático ya está desactivado. No hay reintentos pendientes. La comparación con expertos sigue siendo un paso aparte de este piloto.
