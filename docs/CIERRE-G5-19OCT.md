# G5: pruebas y estado actual

19 de octubre de 2026. **Terminamos las 70 evaluaciones adicionales de G5: 45 sin
clases CSS y 25 de los casos pendientes.** Todas son válidas, sin fallos técnicos ni
respuestas inválidas. La validación con expertos todavía está pendiente.

## Qué cambiamos

- **Etapas sin paso actual: nivel 1.** El indicador existe y nombra el recorrido, pero
  no ubica al usuario. Juan autorizó esta decisión antes de evaluar el caso. El 0 queda
  para un proceso sin indicador; el 2 exige nombres y ubicación actual. La regla queda
  propuesta para contrastarla con Camilo.
- **Una justificación por condición.** Las nuevas evaluaciones usan una regla fija para
  el campo trigger. El validador rechaza contradicciones y conserva la respuesta original.
- **El nivel 4 queda explícito.** Además del nivel 3, el final debe estar diferenciado
  y tener menos peso que el inicio. El modelo registra ese juicio; el código no lo
  convierte en un puntaje por tamaño.
- **Entrada sin clases CSS para G5.** Las medidas originales se conservan y el evaluador
  recibe una copia que retira solo las clases de los candidatos a indicador. Los demás
  datos permanecen iguales.

Las [decisiones](DECISIONES-G5-CIERRE-19OCT.md) y el [registro de las dos series](PRUEBAS-G5-CIERRE-19OCT.md)
se guardaron antes de evaluar. El registro de ambas quedó en el commit 782dd66.

## Qué probamos

El piloto general conserva sus 120 respuestas y la primera prueba de progreso sus 45.
Las pruebas adicionales se guardan aparte:

| Serie | Respuestas | Resultado |
|---|---|---|
| [Sin clases CSS](../pilotos/g5-sin-pistas-2026-10-19/INFORME.md) | 45/45 válidas | 40/40 coincidieron con nivel o NA esperado; P10 tiene otras cinco sin nivel esperado |
| [Casos pendientes](../pilotos/g5-cierre-2026-10-19/INFORME.md) | 25/25 válidas | 25/25 coincidieron con los niveles y campos previstos |

En la segunda serie, E01 recibió 1 en sus cinco repeticiones. Los controles E02/E04
recibieron 3 y los finales destacados E03/E05 recibieron 4, tanto en horizontal como
en vertical. Los cinco casos mantuvieron nivel y justificación. Son expectativas de
diseño nuestras, no calificaciones de expertos.

Al retirar las clases, las 45 posiciones conservaron el nivel o NA de la serie anterior.
Los nueve casos mantuvieron nivel y seis mantuvieron también el trigger. Hubo 15 marcas
de evidencia insuficiente: cinco de P02, cinco de P03 y cinco de P10. Las de P02 no estaban
previstas y se conservaron. Este resultado con nueve pantallas y un solo modelo no demuestra
que las clases nunca influyan ni valida el grupo para cualquier página.

**La explicación también tiene límites:** siete respuestas de esa serie dicen que
el relleno se conservó en el wireframe. Allí queda un contorno interior, que sí distingue
el estado, pero no el relleno oscuro. Registramos esta imprecisión
[por separado](../revisiones/g5-cierre-2026-10-19/REVISION-EXPLICACIONES.md), después de evaluar.
Los niveles y campos pueden coincidir aunque una frase sea imprecisa. Se conservan los
originales y no se repiten solicitudes para conseguir explicaciones mejores.

## Qué sigue pendiente

Tenemos que contrastar la regla nueva con Camilo y hacer la validación experta y el
consenso de los casos dorados según el protocolo y el estado de ética. Dejamos una
[guía para esa revisión](REVISION-EXPERTA-G5.md), sin calificaciones humanas inventadas.

La [revisión de las 63 marcas del piloto general](REVISION-G5-19OCT.md) conserva las
limitaciones de R02, C07, los recortes, las superposiciones y la raíz virtual. Una futura
corrección de captura o detección necesita otra versión y pruebas separadas. También
seguimos declarando qué criterios de G5 consultan el screenshot: no presentamos esos
juicios como una comparación que usó únicamente wireframes.

No hemos probado todas las páginas ni todas las formas posibles de un proceso. Estas
pantallas sirven para ejercitar los casos pendientes, no para declarar validado todo G5.

## Dónde comprobarlo

Cada informe incluye CSV, resumen, respuestas originales y trazas. Se comprobaron
**235 conversaciones distintas y 1.107 archivos primarios sellados** entre las cuatro
series. Los sellos y registros históricos siguen iguales al commit 1a5d066. Estos totales
describen la auditoría; los resultados de las series se interpretan por separado.

Pasaron las 12 pruebas del cierre y las 36 comprobaciones anteriores de medición, ejecución
y revisión de evidencia. Se conservaron los reinicios gratuitos y los seguimientos automáticos
de G5 y G2/G7 siguen pausados. Los cambios quedan en commits locales.

Para comprobarlo desde la carpeta del proyecto:

```bash
node scripts/verify-g5-closure.js
npm run test:g5-cierre
```

La comprobación conjunta deja su registro en
[VERIFICACION.json](../revisiones/g5-cierre-2026-10-19/VERIFICACION.json).
