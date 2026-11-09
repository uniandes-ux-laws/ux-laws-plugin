# Cierre de los pilotos de G2 y G7 · 19 de octubre

Los dos pilotos terminaron y el seguimiento automático está desactivado. Esta nota resume lo que quedó y cómo comprobarlo.

| Grupo | Respuestas | Puntajes | Abstenciones | Respuestas inválidas | Fallos pendientes |
|---|---:|---:|---:|---:|---:|
| G2 | 120 | 41 | 79 | 0 | 0 |
| G7 | 120 | 120 | 0 | 0 | 0 |

En G2 hubo seis ceros, veinticinco doses y diez treses. Seis de las siete páginas con cinco puntajes repitieron el nivel; la regla fue igual en tres de esas siete páginas. Se marcó falta de evidencia en 108 respuestas.

En G7 hubo 105 ceros, diez unos y cinco doses. Las 24 páginas repitieron nivel y regla. Se marcó falta de evidencia en 75 respuestas.

Los informes están en [G2](../pilotos/g2-2026-10-18/INFORME.md) y [G7](../pilotos/g7-2026-10-18/INFORME.md).

## Qué pasó con los tres fallos de G2

R07-r3, R07-r4 y R07-r5 fallaron por conexión y no devolvieron una respuesta. Se guardaron sus registros y se detuvieron nuevas solicitudes. Después de que Juan autorizó reintentar solo esas tres, se repitieron una vez y devolvieron abstenciones.

Los 117 resultados anteriores quedaron iguales. En total, G2 tiene 123 intentos para 120 respuestas. Entre ambos grupos hay **240 conversaciones con respuesta y tres fallidas, todas distintas**. El [registro de recuperación](RECUPERACION-G2-19OCT.md) explica ese paso.

Las copias de los fallos están en `pilotos/g2-2026-10-18/fallos-tecnicos/2026-10-19-conexion/`. Los archivos de pausa se conservan como historial. El diagnóstico, la autorización y `QA-CIERRE.json` permiten revisar qué ocurrió.

## Cómo comprobar los archivos

Los sellos protegen 554 archivos de G2 y 539 de G7. Se revisaron las respuestas originales, los datos de cada corrida, las medidas y los registros de ejecución. Los CSV contienen 120 posiciones por grupo. Para comprobarlos otra vez:

```bash
node scripts/verify-pilot-g2-g7.js pilotos/g2-2026-10-18 --verify-seal
node scripts/verify-pilot-g2-g7.js pilotos/g7-2026-10-18 --verify-seal
```

Estos comandos revisan los archivos guardados; no hacen nuevas consultas al modelo.

Se mantuvieron `gpt-6.1-sol`, CLI `0.162.0-alpha.17.2`, razonamiento `low`, medición `1.0.6` y las imágenes e instrucciones registradas en `70b7b2b`. Se conservaron los reinicios gratuitos y no se compraron créditos. Las respuestas ya están completas; otro experimento tendría que registrarse por separado.

## Qué sigue

Con Camilo tenemos que revisar las combinaciones sin nivel de G2 y cómo distinguir una acción principal ausente de una que existe pero no destaca. C16 cambió entre niveles 0 y 2; C10 y R02 tuvieron puntajes y abstenciones. Quince páginas tuvieron cinco abstenciones. No obtuvimos niveles 1 ni 4 ni apoyos de decisión positivos.

En G7 no obtuvimos niveles 3 ni 4. Su rúbrica incluía cifras del piloto anterior, lo cual puede influir en las respuestas. Todavía falta compararlas con expertos.

También falta completar el consenso de los casos dorados y revisar el estado del comité de ética. **Los pilotos terminaron, pero la validación de los grupos sigue pendiente.**
