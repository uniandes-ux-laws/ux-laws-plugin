# Comprobación de las capturas

4 de noviembre de 2026. Juan autorizó guardar y publicar estos cambios con el mensaje de
commit «Capturas». Los próximos cambios requieren una nueva revisión.

El problema era que una captura podía quedar marcada como limpia aunque tuviera un aviso
encima. Pasaba con la imagen guardada de Bancolombia: el registro decía que estaba limpia,
pero se ve un aviso de privacidad que tapa el contenido.

## Qué cambiamos

- El detector comprueba los diálogos dentro de su propia caja, aunque sean pequeños.
  Incluye alertas, diálogos nativos y capas declaradas como modales.
- Distingue las capas visibles de encabezados, chats pequeños y contenedores transparentes.
  También comprueba franjas de cookies y superficies que no aceptan clics pero sí tapan.
- Revisa antes del screenshot y después de obtener los nodos. Si aparece un aviso entre
  ambos momentos, deja la advertencia; no repite la captura para ocultar la diferencia.
- Un error del detector o un descarte desactivado ya no se presenta como ausencia de avisos.
  El contenido dentro de marcos queda declarado como no revisado.
- La demo, el reporte y el perfil muestran las advertencias. Las entradas de los siete
  grupos también las reciben. Una advertencia no baja automáticamente un puntaje.
- Las imágenes se comparan con sus huellas guardadas. Si faltan o no coinciden, se detiene
  la preparación o el cierre, conservando los resultados existentes.

El mensaje favorable es **«sin alertas automáticas; revisar también la imagen»**. No se
afirma que el detector reconozca todos los avisos posibles. Las capturas sin esta revisión
nueva quedan como pendientes, aunque el registro anterior dijera que estaban limpias.

## Las treinta capturas guardadas

Se revisaron sus registros, nodos y huellas. Los 30 pares de imágenes coinciden con sus
registros. El resumen dejó **cinco capturas con advertencias o señales** y **25 pendientes
del control nuevo**; esto no significa que esas 25 estén mal.

- **L02, Bancolombia:** la advertencia posterior explica el aviso de privacidad visible y
  la marca incorrecta del registro antiguo.
- **L03, Éxito:** se conserva la advertencia del aviso sin cerrar. Haber cerrado otra capa
  antes no hace desaparecer este problema del reporte.
- **G04, Colpensiones:** se conserva la observación visual del carrusel vacío y los recursos
  que no se ven. No se atribuye una causa que no se haya comprobado.
- **L01, Universidad de los Andes:** se ve una franja de cookies sobre la parte inferior
  de la portada, aunque el registro antiguo la marcara como limpia.
- **G01, GOV.CO:** queda un cuadro de ubicación sobre parte del banner. No tapa toda la
  página, pero haber cerrado un aviso antes no confirma que este también haya desaparecido.

Las observaciones posteriores están asociadas a la huella de cada imagen, no al nombre de
la carpeta o al dominio. No se aplicarán a una captura distinta del mismo sitio.

El [informe de las 30 capturas](../revisiones/capturas-2026-11-04/INFORME.md) y su
`revision.json` son derivados nuevos. Los originales, las calificaciones y los sellos
permanecen intactos.

## Versiones y límites

El detector nuevo queda identificado como **2026-11-04**. El catálogo de botones y textos
que se pueden pulsar conserva su versión **2026-09-10**: no se añadieron controles para
un sitio concreto. Detectar mejor puede cambiar qué aviso se intenta cerrar en capturas
nuevas; no deben mezclarse con las anteriores sin declarar esa diferencia.

Esta nota registra el cambio posterior. El protocolo histórico sellado se conserva.
No se recapturó el corpus, no se cambiaron imágenes ni se ejecutaron nuevas evaluaciones
del modelo. El detector revisa el documento principal y puntos de las cajas visibles;
no certifica todos los marcos, componentes encapsulados o cambios posteriores de la página.

## Archivos principales

- `capture/dismiss.js` y `capture/capture.js`: detección, comprobaciones y registro.
- `capture/capture-check.js`: reúne advertencias y comprueba las huellas de las imágenes.
- `scripts/demo.js`, `scripts/build-wireframe-report.js`, `scripts/capture-corpus.js` y
  `scripts/orchestrate.js`: muestran y conservan las advertencias.
- `corpus/observaciones-capturas-2026-11-04.json`: observaciones posteriores de imágenes concretas.
- `scripts/revisar-capturas.js`: genera el informe sin cambiar las capturas.

Pasaron las **257 pruebas del proyecto**, 29 más que antes de esta corrección. Incluyen
capturas de páginas locales con avisos, fallos del detector, diálogos ocultos y capas que
aparecen tarde. También se comprobaron la preservación de 5.159 archivos históricos y los
diez sellos de pilotos. Se revisó visualmente que el reporte muestra la advertencia de
Bancolombia encima de sus métricas e imágenes.

Los prompts nuevos incluyen esta revisión y cambian sus huellas. Los pilotos de octubre
conservan sus entradas originales; no se presenta este cambio como una repetición idéntica.

Para repetir las comprobaciones sin solicitudes a un modelo:

```bash
node --test
node scripts/g1-closure.js verificar
node scripts/revisar-capturas.js captures --out revisiones/capturas-2026-11-04
```
