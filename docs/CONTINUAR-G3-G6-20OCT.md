# G3 y G6: punto de continuación

20 de octubre de 2026. **Los pilotos están registrados e iniciados, todavía incompletos.**
El estado exacto está en cada `VERIFICACION.json`; no repetir posiciones con respuesta.
Juan autorizó continuar automáticamente después de la renovación del uso si hace falta.
Se conservan los reinicios gratuitos y no se compran créditos.

## Corte de esta ventana

La continuación de la noche conservó **72 respuestas nuevas** y detuvo solicitudes al
**90% de uso**, a las 7:52 p. m. de Bogotá. El control volvió a responder y no hubo
fallos técnicos ni intentos abiertos de evaluación. El incidente de la tarde se conserva
como historial; no está pendiente una evaluación fallida que deba reintentarse.

Quedan **46 posiciones**: 23 de G3 y 23 de G6. La próxima es **G3/C03-r5**.
Las cuatro primeras repeticiones están completas en ambos grupos; C02-r5 también.

| Grupo | Conservadas | Puntajes conformes | Abstenciones | Inválidas | Pendientes |
|---|---:|---:|---:|---:|---:|
| G3 | 97/120 | 18 | 55 | 24 | 23 |
| G6 | 97/120 | 0 | 97 | 0 | 23 |

La continuación está **programada para el 21 de octubre de 2026 a las 00:19, Bogotá**,
después de la renovación de las 00:17 indicada por la consulta de uso. El seguimiento
activo es `completar-pilotos-g3-y-g6`, en este mismo chat. Antes de evaluar debe comprobarse
el uso y que no hay otro ejecutor. Si vuelve a faltar margen, actualizar este seguimiento
para la próxima renovación real, sin crear duplicados ni pedir autorización de nuevo.
No se usaron reinicios ni se compraron créditos; siguen disponibles los tres reinicios.

Se comprobaron 194 conversaciones distintas. Hay cinco respuestas de G3 con observaciones
de la auditoría derivada; no son cinco errores expertos. Las notas separan las diferencias
aritméticas, la prudencia por evidencia parcial y el orden de condiciones del auditor.
La auditoría original permanece en las trazas y en el resumen. Los CSV y los informes
reflejan el estado parcial; los sellos finales se crearán solo con las 120 posiciones.

La revisión del corte anterior comprobó los ocho sellos históricos, con 3.122 archivos
protegidos, sin regenerarlos. Frente a d0ac313 se preservan 4.099 archivos históricos de
capturas y pilotos y, al incluir corpus, 4.111. El incidente anterior del control está en
`revisiones/g3-g6-2026-10-20/CONTROL-USO-20OCT.json`; no se sobrescribe para presentar la
consulta como exitosa.

## Preparación conservada

- Revisión: [mediciones](REVISION-MEDICIONES-G3-G6-20OCT.md).
- Registro congelado: [PILOTOS-G3-G6-20OCT.md](PILOTOS-G3-G6-20OCT.md).
- Fuente de preparación: `39714dbed6238d7d817e30063fb0449ee77163c7`.
- Entradas y prompts anteriores a las respuestas: `0dfbdd9462c9580513c79f8e63c54b2e58169463`.
- G3: `pilotos/g3-2026-10-20`; G6: `pilotos/g6-2026-10-20`.

Son 120 posiciones por grupo: 24 páginas × cinco repeticiones. Se alternan grupos por
página y repetición. Modelo gpt-6.1-sol, esfuerzo low, CLI 0.162.0-alpha.17.2, evidencia
1.1.0 desde la fuente 1.0.6, contratos 0.1.0. Una solicitud a la vez, con wireframe y
screenshot. Se declara la lectura textual; no es comparación limpia entre canales.

El primer resultado, G3/C02-r1, fue abstención por una combinación sin ancla: U=7,
segmentación encabezada, H=0, V=false, X=0. No se completó la escala ni se corrigió.
Consultar los informes para los resultados posteriores, sin tomarlos como puntajes esperados.

## Antes de retomar

La aplicación se actualizó después del primer corte. Para conservar la CLI registrada,
usar la copia comprobada de 0.162.0-alpha.17.2; no ejecutar evaluaciones con la CLI nueva:

```bash
export PATH="/Users/juan/.codex/pilot-runtimes/codex-0.162.0-alpha.17.2:$PATH"
codex --version
node /Users/juan/.codex/pilot-runtimes/check-g3-g6-usage.cjs
```

El último comando solo consulta el uso actual mediante el servidor local. No inicia
evaluaciones, no usa reinicios y no compra créditos. Si vuelve a estar disponible la
herramienta de uso de la aplicación, también sirve para comprobar el límite. Los detalles
de la copia están en las observaciones posteriores. No cambiar hashes para aceptar otra CLI.
Si cada llamada abre una terminal distinta, el `export` anterior no persiste: aplicar el
PATH en la misma llamada que ejecuta el lote. El verificador de uso también debe recibirlo.

Comprobar uso y procesos activos. No iniciar otro ejecutor si hay una evaluación en curso.
Si no hay margen suficiente o la ventana no se renovó, conservar el estado sin solicitudes.
Los siguientes comandos no repiten respuestas ni sustituyen inválidas o abstenciones:

```bash
node scripts/pilot-g3-g6-real.js verificar-entradas
node scripts/g3-g6-results.js verificar --partial
PATH="/Users/juan/.codex/pilot-runtimes/codex-0.162.0-alpha.17.2:$PATH" node scripts/pilot-g3-g6-real.js ejecutar 1
node scripts/g3-g6-results.js analizar
node scripts/g3-g6-results.js verificar --partial
```

Cada lote admite 1, 2 o 3. Revisar uso entre lotes y dejar margen antes del 94%; detener
con antelación para guardar informes y commits. Si hace falta otro reinicio automático,
programar este chat poco después de la hora real de renovación, sin usar créditos ni
reinicios gratuitos. Un fallo técnico o intento sin cerrar bloquea nuevas solicitudes;
se conserva y no se reintenta automáticamente.

**No editar el ejecutor ni sus dependencias, rúbricas, esquemas, entradas, prompts o capturas
fijados por hash.** Solo se pueden mejorar verificadores e informes derivados. Un problema
de formato permanece como inválido; un problema de ancla queda auditado aparte. Ninguno se
reescribe para mejorar el resultado.

## Al completar ambos grupos

```bash
node scripts/g3-g6-results.js analizar
node scripts/g3-g6-results.js verificar
node scripts/g3-g6-results.js sellar
node scripts/g3-g6-results.js verificar --verify-seal
```

Revisar las explicaciones después de evaluar, declarando notas posteriores por separado.
Verificar CSV contra originales y distinguir los errores de ancla de la validez visual.
Comprobar que capturas, corpus, dorados y los pilotos previos permanecen iguales a d0ac313,
y verificar sus sellos sin regenerarlos. Actualizar CLAUDE.md y el registro general,
guardar commits locales verificables y desactivar el seguimiento cuando exista.

No publicar a GitHub sin autorización nueva aplicable. Los informes están en
[G3](../pilotos/g3-2026-10-20/INFORME.md) y [G6](../pilotos/g6-2026-10-20/INFORME.md).
Pilotos terminados no significa grupos validados: faltan referencia experta, consenso y
revisión con Camilo. El panel humano depende de aprobación ética.
