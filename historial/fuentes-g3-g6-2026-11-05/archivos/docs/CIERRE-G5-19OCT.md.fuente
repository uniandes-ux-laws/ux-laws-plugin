# G5: pruebas y estado actual

19 de octubre de 2026. Terminamos las **70 evaluaciones adicionales de G5**: 45 sin
clases CSS y 25 para los casos que faltaban probar. Todas cumplieron las reglas de salida,
sin fallos técnicos. **La comparación con expertos sigue pendiente.**

## Qué cambiamos

- **Etapas sin paso actual: nivel 1.** El indicador nombra el recorrido, pero no ubica
  al usuario. Juan autorizó esta propuesta antes de probar el caso. El 0 queda para
  un proceso sin indicador y el 2 exige nombres y ubicación actual. Falta contrastarlo
  con Camilo.
- **Una regla fija para el trigger.** Este campo identifica qué condición sostiene el
  puntaje. Las nuevas respuestas deben usar la que corresponde a cada caso. Si hay una
  contradicción, el validador conserva la respuesta como inválida.
- **Nivel 4 más claro.** Además de cumplir el nivel 3, el final debe distinguirse y tener
  menos peso que el inicio. El modelo debe explicar ese juicio; no se decide solo por tamaño.
- **Medidas sin clases CSS.** Retiramos los nombres de clases de los candidatos a indicador
  en la copia que recibe el evaluador. Los datos originales y los demás campos se conservan.

Las [decisiones](DECISIONES-G5-CIERRE-19OCT.md) y el [registro de las dos series](PRUEBAS-G5-CIERRE-19OCT.md)
quedaron guardados antes de evaluar. El registro está en el commit 782dd66.

## Qué probamos

El piloto general conserva sus 120 respuestas y la primera prueba de progreso sus 45.
Las dos pruebas adicionales se guardaron aparte:

| Serie | Respuestas | Qué salió |
|---|---|---|
| [Sin clases CSS](../pilotos/g5-sin-pistas-2026-10-19/INFORME.md) | 45 válidas | 40 coincidieron con el nivel o NA previsto. P10 tiene otras cinco sin nivel esperado. |
| [Casos pendientes](../pilotos/g5-cierre-2026-10-19/INFORME.md) | 25 válidas | Las 25 coincidieron con los niveles y campos previstos. |

En la segunda serie, E01 recibió 1 en las cinco repeticiones. E02/E04 recibieron 3 y
E03/E05 recibieron 4, en los ejemplos horizontales y verticales. Los cinco casos mantuvieron
nivel y trigger. Es una comparación con lo que esperábamos de nuestros diseños, no con
calificaciones de expertos.

Al retirar las clases, las 45 respuestas conservaron el nivel o NA de la serie anterior.
Los nueve casos mantuvieron nivel y seis también el trigger. Hubo 15 advertencias de evidencia
insuficiente: cinco de P02, cinco de P03 y cinco de P10. Las de P02 no estaban previstas.
Este resultado con nueve pantallas no demuestra que las clases nunca influyan en el modelo.

En la prueba de los casos pendientes encontramos **siete explicaciones imprecisas**:
dicen que el relleno se conserva en el wireframe, cuando allí queda un contorno interior.
Los campos coinciden con lo previsto, pero esa frase no describe bien la imagen. Guardamos
[el detalle](../revisiones/g5-cierre-2026-10-19/REVISION-EXPLICACIONES.md) después de evaluar,
sin cambiar puntajes ni volver a pedir respuestas.

## Qué falta

Tenemos que revisar con Camilo la regla de nivel 1, hacer la evaluación experta y completar
el consenso de los casos dorados. La [guía de revisión](REVISION-EXPERTA-G5.md) reúne el
material para esa conversación. El panel humano depende de aprobación ética.

La [revisión de las 63 advertencias del piloto general](REVISION-G5-19OCT.md) también
conserva problemas de captura y detección: R02 tiene una lista en dos filas que el detector
omite; en C07 faltan opciones en los nodos guardados. Los recortes, las superposiciones y
los elementos sin padre retenido siguen siendo límites. Una corrección futura necesita
otra versión y pruebas separadas.

G5 consulta el screenshot para algunos juicios de contenido. Por eso estos resultados no
son una comparación que haya usado únicamente wireframes. Los ejemplos prueban situaciones
concretas; no cubren todas las páginas ni todas las formas posibles de un proceso.

## Dónde comprobarlo

Los informes tienen CSV, resúmenes, originales y registros de ejecución. Se comprobaron
**235 conversaciones distintas y 1.107 archivos primarios sellados** entre las cuatro
series. Los registros históricos verificados siguen iguales a 1a5d066. Estos totales
sirven para comprobar los archivos; los resultados de las series se leen por separado.

Pasaron las 12 pruebas del cierre y las 36 comprobaciones anteriores de medición, ejecución
y revisión. Los seguimientos automáticos de G5 y G2/G7 quedaron pausados. Se conservaron
los reinicios gratuitos.

```bash
node scripts/verify-g5-closure.js
npm run test:g5-cierre
```

La comprobación guarda [VERIFICACION.json](../revisiones/g5-cierre-2026-10-19/VERIFICACION.json).
El [resumen de los grupos](AVANCES-GRUPOS-21OCT.md) reúne este avance con los demás pilotos.
