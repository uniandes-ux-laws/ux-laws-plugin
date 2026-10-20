# G5: prueba de progreso terminada

19 de octubre de 2026. **No quedan posiciones pendientes de esta prueba.**

**Actualización posterior:** también terminaron las 70 evaluaciones adicionales: 45 sin
clases CSS y 25 para el caso sin paso actual y los pares de niveles 3/4. P06 ya se evaluó
como E01 con nivel 1 registrado antes de las respuestas. El [estado actual de G5](CIERRE-G5-19OCT.md)
reúne los resultados y límites; el texto siguiente conserva el cierre de la primera serie.

Terminamos las 45 evaluaciones: nueve pantallas locales, cinco conversaciones independientes por pantalla. Las 45 respuestas son válidas, sin fallos técnicos ni respuestas inválidas. Se comprobaron originales, trazas y atribuciones. El sello protege **223 archivos primarios**.

## Qué salió y cómo interpretarlo

- Las **40 posiciones con nivel o NA esperado coincidieron** con las expectativas propuestas. Son expectativas de diseño nuestras, no juicios expertos.
- P10 tiene otras cinco posiciones para revisar el recorte. Todas marcaron evidencia insuficiente; su nivel no entra en la coincidencia porque no había un nivel esperado fijado.
- Los nueve ejemplos mantuvieron el mismo nivel o NA. Solo seis mantuvieron también el trigger. En P04, P05 y P10 alternó entre G_forma y ninguna.
- Hubo 15 marcas de evidencia insuficiente: cinco de P02, cinco de P03 y cinco de P10. Las de P02 no estaban previstas y se conservan como diferencias frente al criterio previo.

**Encontramos un límite en los ejemplos que preparamos:** las medidas incluyen clases CSS como color, forma y recorte. Pueden dar pistas sobre la condición de la pantalla. No se entregaron las expectativas, pero tampoco se puede atribuir la coincidencia únicamente a la lectura de imágenes. El informe lo declara. No cambiamos las clases ni las expectativas después de ver las respuestas.

En P02, el modelo también describió una pérdida del relleno de la barra. El wireframe conserva su división interior; no se debe interpretar que desapareció toda la geometría. Se guarda el argumento original y esta observación posterior por separado.

## Qué se conservó

El piloto general de G5 sigue con sus 120 respuestas originales. Esta serie nueva está en [pilotos/g5-progreso-2026-10-19](../pilotos/g5-progreso-2026-10-19/INFORME.md) y no se suma a ese piloto, a los corpus ni a los casos dorados.

Se mantuvieron gpt-6.1-sol, razonamiento medium, CLI 0.162.0-alpha.17.2, medición 1.0.6 y todos los archivos congelados. El ejecutor quedó en f66f177 y el manifiesto se registró en 3cbfc6b antes de recibir respuestas. No se modificaron el ejecutor, el prompt, la rúbrica, el esquema ni sus dependencias. Solo se mejoraron el informe y las comprobaciones de integridad.

Antes de la renovación habían quedado seis respuestas guardadas en 12dfac4. Después se completaron las 39 restantes. Se conservaron los reinicios gratuitos y no se compraron créditos. La automatización **Completar prueba de progreso de G5**, id completar-prueba-de-progreso-de-g5, quedó **PAUSED** al terminar. La de G2/G7 también sigue pausada.

## Qué falta en G5

Los pendientes técnicos anotados al cerrar esta primera serie se trabajaron en dos pruebas
nuevas, registradas antes de evaluar. Se propuso nivel 1 para P06, se probaron positivos de
nivel 4 en horizontal y vertical y se repitió la comparación sin entregar clases CSS. La
versión nueva fija un trigger por condición. El [resumen de cierre](CIERRE-G5-19OCT.md)
explica las 70 respuestas adicionales y las siete explicaciones imprecisas detectadas después.

Faltan contrastar la nueva regla con Camilo, la evaluación experta y el consenso de los casos
dorados. Se siguen declarando los límites de captura y detección del piloto general.

## Comprobación

```bash
node scripts/pilot-g5-progress.js verificar-entradas
node scripts/verify-g5-progress.js --verify-seal
node scripts/verify-pilot-g5.js pilotos/g5-2026-10-07 --verify-seal
```

El [informe](../pilotos/g5-progreso-2026-10-19/INFORME.md), el [CSV](../pilotos/g5-progreso-2026-10-19/evaluaciones.csv) y el [resumen](../pilotos/g5-progreso-2026-10-19/resumen.json) permiten revisar los resultados. Los cambios quedan en commits locales; no se ha publicado esta prueba en GitHub.
