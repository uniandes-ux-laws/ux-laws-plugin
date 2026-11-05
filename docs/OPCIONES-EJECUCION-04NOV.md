# Opciones de ejecución

4 de noviembre de 2026. Juan autorizó guardar y publicar estos cambios con el mensaje de
commit «Completar grupos». Los próximos cambios requieren una nueva revisión.

El programa ya prepara y recoge los siete grupos en dos modos. Las respuestas de cada
canal quedan separadas; no se mezclan sus repeticiones.

| Modo | Qué prepara con cinco repeticiones |
|---|---|
| Referencia, predeterminado | 35 solicitudes: seis grupos en wireframe y G4 en screenshot. |
| Comparación | 65 solicitudes: seis grupos en ambos canales y G4 solo en screenshot. |

## Qué quedó funcionando

- Cada solicitud individual lleva su prompt, entrada, esquema, imágenes ordenadas y
  atribución exacta. La repetición es un número, no un rango que el modelo deba adivinar.
- Los trece pares de grupo y canal tienen esquemas propios. El orquestador también usa
  los controles de G2 y G7 que ya existían en sus pilotos.
- Ambos canales reciben las mismas medidas por grupo. Cambia la imagen principal y se
  declara el screenshot de apoyo cuando corresponde.
- La preparación conserva las capturas. Si necesita calcular medidas, las guarda dentro
  de la corrida. Una carpeta con contenido no se sobrescribe.
- El cierre valida todos los grupos, canales y repeticiones previstos. Conserva originales,
  NA, abstenciones y ceros; una respuesta inválida detiene el cierre sin pedir reemplazo.
- El perfil incluye 7 series en referencia o 13 en comparación. En comparación también
  produce seis grupos de pares y un CSV de 30 filas con cinco repeticiones.

Los contratos anteriores solo aceptaban wireframe para varios grupos. El código nuevo
comprueba el canal solicitado y valida las demás reglas sobre una copia de la respuesta.
Solo esa copia usa el nombre de canal que reconoce el validador histórico. El JSON
original, sus cifras y su canal no se cambian. Las rúbricas y los contratos sellados se
conservan. La adaptación queda identificada como ejecución **1.0.0**, con perfil **2.0.0**.

## Una prueba de preparación

Este ejemplo usa identificadores de prueba. Sirve para comprobar los archivos y no
solicita respuestas a un modelo ni constituye una evaluación de la tesis.

```bash
node scripts/orchestrate.js preparar --captura calibracion/C13 --out corridas/prueba-c13 --modo comparacion --runtime prueba-local --model-id modelo-prueba-1 --decoding '{"declarado":"prueba local sin modelo"}'
node scripts/orchestrate.js verificar --corrida corridas/prueba-c13
```

`verificar` revisa el plan, las imágenes, las medidas, los prompts, los esquemas y las
solicitudes guardadas. No certifica respuestas que todavía no existen.

Para una evaluación real hay que declarar el runtime, el identificador exacto del modelo
y sus parámetros reales, o declarar expresamente qué parámetros no expone. Cada solicitud
de `solicitudes/` se ejecuta en un contexto nuevo con las imágenes que enumera. Quien la
ejecuta registra en el libro cómo aseguró ese aislamiento, conserva la respuesta completa
y finalmente usa:

```bash
node scripts/orchestrate.js recoger --corrida corridas/nombre-de-la-corrida
```

El cierre genera `perfil.json` y, en comparación, `comparacion-canales.csv`. Si falla,
conserva el perfil y el CSV anteriores y avisa que no se actualizaron.
El CSV incluye captura, runtime, modelo, versión de medidas y huellas de las imágenes,
para que no se pierda su procedencia al reunir archivos de los dos entornos.

## Preparar las treinta páginas en dos entornos

Completa una copia de [runtimes-ejemplo.json](runtimes-ejemplo.json) con los datos reales
de los dos entornos. Los campos de modelo y parámetros están vacíos para no inventarlos.
Guarda esa copia, por ejemplo, en `corridas/mi-config-runtimes.json`, y ejecuta:

```bash
node scripts/preparar-grilla.js --config corridas/mi-config-runtimes.json --out corridas/grilla-v1 --manifiesto corpus/corpus-v1.csv --capturas captures
```

El plan produce 60 carpetas: 30 páginas por dos entornos. Cada una tiene 65 solicitudes,
para **3.900 en total**. La preparación no las ejecuta ni consume evaluaciones del modelo.
Los dos entornos reciben los mismos prompts, medidas e imágenes para cada grupo y canal;
sus datos de modelo y ejecución quedan en solicitudes separadas.

Si la preparación falla, conserva lo generado y deja su estado en `plan.json`. No lo
presenta como un plan completo.

## Cómo leer la comparación

G4 mantiene un solo canal. G1 conserva la marca **no interpretable v1**, aunque haya dos
salidas. G2, G3, G5 y G6 permiten apoyo textual de screenshot en el brazo de wireframe:
sus pares no aíslan el efecto de la representación. G7 tiene imágenes separadas sin ese
apoyo; eso tampoco demuestra que sus puntajes sean correctos.

`lectura_screenshot` conserva los criterios textuales exigidos por cada contrato. En el
brazo de screenshot se leen en la imagen principal, no en una imagen adicional.
Se cuenta cuántos pares tienen dos puntajes. Si no hay ninguno, se conservan los estados
sin presentar un contraste numérico. El campo `interpretable` se refiere a ese contraste
sin apoyo y sin la limitación de G1; no significa validación experta.

## Qué se comprobó y qué sigue pendiente

Pasaron las **276 pruebas**, 19 más que antes. Se probaron preparación, verificación y
cierre de 7, 35 y 65 posiciones, con copias y datos artificiales en carpetas temporales.
También se prepararon 130 solicitudes de una página en dos entornos de prueba, sin
respuestas, y se comprobó el plan de 3.900 posiciones.

Las pruebas revisan cambios de canal, medidas, configuración, prompts y archivos, y
comprueban que las respuestas rechazadas no se reescriban. Los 5.159 archivos históricos
y los diez sellos de pilotos permanecen intactos. No se hicieron evaluaciones nuevas.

En esta terminal se encontró el comando de Codex y no se encontró `claude` en el PATH.
La ejecución real de modelos en ambos entornos sigue pendiente; estas pruebas locales
no demuestran que el servicio de cada modelo esté disponible. Tampoco sustituyen
validación experta, consenso ni la ejecución final de la grilla.

Los cambios de preparación y prompts se registran aquí como posteriores al protocolo
sellado. No se presentan como acuerdos nuevos con Camilo ni como una repetición idéntica
de los pilotos anteriores.
