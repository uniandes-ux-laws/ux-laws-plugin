# Corrección del inventario de G2 y G7

Fecha: **6 de octubre de 2026**, después de las correcciones de validación y G5. La definición se registra antes de volver a medir las capturas. Ningún umbral se elige a partir de la distribución que produzca.

## Defecto demostrado

La medición publicada usaba `isClickable` más cuatro tipos de control nativo sin normalizar el inventario. Una página sintética con solo listeners en `#document`, `HTML` y `BODY` daba tres opciones y tres objetivos. Un icono con clic dentro de un enlace añadía otro objetivo, con su caja interior pequeña. Esto puede inventar dominancia de un contenedor, inflar denominadores y hacer que un objetivo pequeño pierda la excepción por separación porque «colisiona» con el documento completo.

El protocolo CDP describe `isClickable` como respuesta a clics, incluidos listeners JS; no como identidad de una opción del usuario. Chromium lo obtiene de `WillRespondToMouseClickEvents`. Fuentes primarias consultadas: [DOMSnapshot](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-NodeTreeSnapshot) y [implementación de Chromium](https://chromium.googlesource.com/chromium/src/+/3ca21435ac073fe124ed3665100eb771964c7776/third_party/blink/renderer/core/inspector/inspector_dom_snapshot_agent.cc).

## Decisión operativa

`measure/actionable-inventory.js` calcula un inventario común. Cada nodo conserva su caja original; no se agranda por unión ni se recorta el área de clic para mejorar un resultado.

1. Excluir raíces, nodos de texto/pseudoelementos, geometría inválida o sin área y cajas totalmente fuera del viewport. Mantener la caja completa de los objetivos parcialmente visibles, como exige el protocolo.
2. Reconocer `BUTTON`, `INPUT`, `SELECT` y `TEXTAREA`, enlaces con `href`, roles interactivos declarados y objetivos personalizados con bandera de clic. Un rol de navegación o presentación no basta para crear un control.
3. Excluir inputs ocultos y estados inactivos **cuando están registrados**. Un dato ausente no se convierte en un estado supuesto.
4. Conservar controles con identidad explícita, incluso cuando otro control explícito los contiene. Su contenido genérico se representa por la caja del control, evitando contar un icono aparte.
5. Un contenedor genérico con controles descendientes no añade otra opción. Un compuesto ARIA con componentes operables se representa por esos componentes. En una cadena genérica de una única rama, conservar el representante exterior; cuando hay varias ramas, conservar sus objetivos y excluir el contenedor común.
6. No deduplicar hermanos por compartir URL, geometría o etiqueta: pueden ser objetivos físicos diferentes.
7. Registrar las exclusiones de contenedores y las cadenas genéricas como ambiguas cuando no se conoce la identidad de sus manejadores. La alternativa de presentar esa inferencia como certeza se descarta: un contenedor podría tener una acción propia. Tampoco se elimina un control solo porque sea grande.

La elección de representantes es una **convención reproducible**, no una prueba de que dos listeners hagan lo mismo. Se rechazan registros contradictorios de un mismo id y ciclos de ancestros; se admiten repeticiones idénticas y fragmentos decorativos del mismo pseudoelemento, que CDP sí genera. Los representantes se ordenan por id para que cambiar el orden del archivo no cambie el inventario.

## Efecto por grupo

- **G2:** usa representantes con `ink` válida que toca el viewport. Cada uno se asigna una vez a los grupos visuales ya definidos. Se conservan todos los ids del reparto. `g2_inventario_ambiguo` informa cuándo el recuento depende de relaciones JS no resueltas; la skill debe emitir `evidence_insufficient` en esos casos.
- **G7:** usa los representantes sobre `bounds`. Al excluir los duplicados y las raíces se recalculan el tamaño mínimo, las áreas, las familias, las proporciones y la excepción por separación. Los cortes 24, 32, 8 y 2 px, así como los cortes de tolerancia 0,10 y 0,25, se conservan.
- **Otros grupos:** se mantiene su implementación previa. Esta corrección no cambia sus candidatos ni sus juicios.

El inventario y su auditoría se guardan en `inventario_accionables`. La capa de medición pasa a **1.0.2**, distinta de 1.0.1, y esa versión se registra en cada ejecución. La revisión de las instrucciones de G2 y la de G7 se versionan por separado, conforme a la regla del repositorio.

## Capturas nuevas y datos históricos

Las capturas nuevas conservan `disabled`, `aria-disabled`, `inert` y `for`, y certifican ese registro con `interactionAttributesVersion: 1.0.0` en `meta.json`. No se agrega texto ni se cambia la geometría o la convención de imágenes con X.

Las capturas históricas no registraban esos atributos; su ausencia no demuestra que los controles estén habilitados ni permite resolver todas las asociaciones de labels. Se declara esa limitación en la auditoría. El snapshot tampoco permite reconstruir funciones de JS, oclusiones, recortes CSS o controles de iframes no capturados. Estas limitaciones impiden afirmar perfección universal o validación contra expertos.

El piloto histórico de `scripts/pilot-calibracion.js` reproduce aproximaciones previas; no se modifica ni se sobrescribe como si fuera una ejecución nueva de las skills. Las comparaciones antes/después de esta corrección se harán sobre mediciones derivadas, conservando los archivos primarios y sus sellos.

## Pruebas

```bash
npm run test:actionables
npm run validate
npm run test:g5
npm run measure -- captures/G01
npm run validate:measurements
npm run check:skills
npm run seal:verify
npm run seal:calibracion:verify
npm run seal:dorados:verify
```

Las pruebas incluyen ejemplos con respuestas esperadas definidas antes de la corrección: raíces sin controles, enlace con icono, delegación en contenedores, controles explícitos anidados, tarjetas personalizadas, roles, ramas genéricas, geometría inválida, estados inactivos, alcance del viewport, diferencia `ink`/`bounds`, agrupación, excepción por separación y límites exactos de la rúbrica. Los fixtures son sintéticos y no son resultados del estudio.

## Comparación de mediciones sobre las capturas selladas

Referencia anterior: **1.0.1**, commit `fc91dc7` —sin modificar su implementación—. Se generaron ambas mediciones a partir de los mismos archivos archivados, se validaron las 64 salidas y se compararon sus representaciones JSON. G1, G3, G4, G5 y G6 permanecen idénticos. La comparación no interpreta la eliminación de un candidato como prueba de la función real de su manejador.

| Conjunto | Páginas | Objetivos G7 antes | Objetivos G7 normalizados | Páginas con supuestos ambiguos |
|---|---:|---:|---:|---:|
| Corpus | 30 | 953 | 834 | 20 |
| Calibración | 24 | 791 | 688 | 15 |
| Dorados | 10 | 296 | 252 | 9 |

Ejemplos de conteo de G2 y G7: G01 pasa de 38 a 36; C02 de 24 a 17; U03 de 18 a 14. Se comprueba que no hay raíces en ninguno de los 64 inventarios y que las opciones de G2 aparecen exactamente una vez en su reparto. Estas son verificaciones de medición y procedencia, **no puntajes de las skills ni comparación contra expertos**.

Los estados de deshabilitación y las relaciones de JS ausentes de las capturas antiguas siguen siendo límites del instrumento. Los 44 casos con relaciones ambiguas llevan una marca explícita; no se presentan como 44 clasificaciones erróneas confirmadas ni se eliminan del corpus.

El selftest de mediciones ahora deriva G01 en memoria desde los datos primarios, para no depender de un archivo derivado antiguo ni escribir en el corpus al probar. Además de la forma, rechaza objetivos duplicados, representantes inexistentes, diferencias entre inventario y conteos, opciones repetidas en grupos, denominadores incorrectos y declaraciones de ambigüedad contradictorias.
