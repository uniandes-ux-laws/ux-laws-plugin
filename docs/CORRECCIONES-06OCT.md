# Correcciones de validación y separación de G5

Fecha: **6 de octubre de 2026**. Este registro explica los problemas encontrados, los cambios y las pruebas realizadas. Los cambios también quedaron anotados en `docs/protocolo.md`, sección 9.

## Qué estaba fallando

Había dos problemas. El primero impedía iniciar la validación de resultados y el orquestador, que prepara las evaluaciones. El segundo calculaba mal la distancia entre el último elemento de una lista y el elemento que tenía al lado.

## Validación de resultados

En Node **20.20.2**, una regla para revisar el nombre del modelo no era compatible con JavaScript. Por eso fallaban `npm run validate` y el inicio de `scripts/orchestrate.js`.

Se corrigió la regla en `shared/schemas/group-result.schema.json`. Se mantienen los requisitos del nombre: versión con dígitos, separador, caracteres permitidos, longitud mínima y ausencia de espacios. También se rechazan nombres provisionales como `PENDIENTE`, sus variantes en mayúsculas y los saltos de línea al final.

Se añadieron pruebas con nombres válidos, inválidos y campos obligatorios ausentes. Los nombres inventados para estas pruebas solo sirven para comprobar la validación. El formato del resultado sigue siendo **v0.2.0** y las reglas de puntuación no cambiaron.

## Distancias entre elementos en G5

El cálculo comparaba ambos extremos de la lista con el segundo elemento. Para medir el extremo final, debía usar el penúltimo. Además, las listas de tres elementos devolvían una distancia vacía.

Estos ejemplos muestran la diferencia, usando elementos de 20 px de ancho:

| Posiciones x | Distancia inicial correcta | Distancia final correcta | Distancia final anterior |
|---|---:|---:|---:|
| 0, 40, 80, 300 | 20 px | **200 px** | 240 px |
| 0, 40, 80, 120 | 20 px | **20 px** | 60 px |
| 0, 50, 200 | **30 px** | **130 px** | null en ambos extremos |

Ahora cada extremo se compara con su vecino interior. La distancia se mide entre los bordes de lo que se ve (`ink`), con precisión de una décima de píxel. En una lista de tres elementos, el elemento del centro es vecino de ambos extremos.

La medición pasa a la versión **1.0.1**. Esta corrección puede cambiar los resultados futuros de `J_inicio` y `J_final`, que indican si los extremos están separados del resto. Por eso las evaluaciones nuevas deben distinguirse de las hechas con 1.0.0. Las capturas y los resultados anteriores se conservan.

## Qué se comprobó

| Comprobación | Resultado |
|---|---|
| Validación de resultados | **71/71** pruebas aprobadas |
| Distancias de G5 | **8/8**, incluidos los ejemplos de la tabla |
| Validación de mediciones | **10/10**, con la medición de G01 en versión 1.0.1 |
| Campos usados por las siete skills | **7/7** compatibles con la medición |
| Archivos originales | Corpus: **30 páginas / 120 archivos**; calibración: **24 / 96**; dorados: **10 / 40**, todos intactos |
| Preparación del orquestador | **35 evaluaciones pendientes** y siete instrucciones preparadas sobre una copia temporal de G01 |

Las pruebas de G5 cubren listas horizontales y verticales, tres elementos, distancias iguales, cajas estiradas, contacto, solapamiento, decimales y listas insuficientes. Antes de corregir el cálculo fallaban siete de los ocho casos.

La prueba del orquestador solo preparó las evaluaciones: no consultó modelos ni produjo puntajes. Comprobó que registraran la versión 1.0.1, que las cinco repeticiones de cada grupo recibieran los mismos datos y que se rechazara `PENDIENTE` como nombre de modelo. La copia temporal se eliminó. Solo se regeneró `captures/G01/measurements.json`, un archivo derivado que Git no guarda.

<details>
<summary>Comandos para repetir las comprobaciones</summary>

```bash
npm run validate
npm run test:g5
npm run measure -- captures/G01
npm run validate:measurements
npm run check:skills
npm run seal:verify
npm run seal:calibracion:verify
npm run seal:dorados:verify
```

</details>

Estas correcciones recuperaron la validación y arreglaron una medida de G5. En este punto todavía faltaba ejecutar el piloto real; sus resultados se registraron después en los informes correspondientes.
