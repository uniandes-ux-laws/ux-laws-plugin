# G3 y G6: punto de continuación

20 de octubre de 2026. **Los pilotos están registrados e iniciados, todavía incompletos.**
El estado exacto está en cada `VERIFICACION.json`; no repetir posiciones con respuesta.
Juan autorizó continuar automáticamente después de la renovación del uso si hace falta.
Se conservan los reinicios gratuitos y no se compran créditos.

## Corte de esta ventana

Se detuvieron nuevas solicitudes al **90% de uso**, sin errores técnicos ni intentos abiertos.
Quedan **176 posiciones**: 88 de G3 y 88 de G6. La próxima es **G3/C12-r2**.

| Grupo | Conservadas | Puntajes conformes | Abstenciones | Inválidas | Pendientes |
|---|---:|---:|---:|---:|---:|
| G3 | 32/120 | 4 | 20 | 8 | 88 |
| G6 | 32/120 | 0 | 32 | 0 | 88 |

La continuación está **programada para el 20 de octubre de 2026 a la 1:51 p. m., Bogotá**,
tras la renovación prevista cerca de la 1:49 p. m. El seguimiento activo es
`completar-pilotos-g3-y-g6`, en este mismo chat. Si vuelve a faltar uso, actualizar ese
mismo seguimiento para la próxima renovación real; no crear duplicados. No se usan reinicios
ni créditos. Consultar los VERIFICACION.json antes de retomar: este corte puede quedar atrás.

Se comprobaron 64 conversaciones distintas. Hay una observación de la auditoría derivada en
G3, pendiente de revisión junto con sus límites; no es referencia experta. La auditoría
original permanece en las trazas y en el resumen. Los CSV y los dos informes reflejan el
estado parcial. Los sellos finales se generarán únicamente al completar las 120 posiciones.

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

Comprobar uso y procesos activos. No iniciar otro ejecutor si hay una evaluación en curso.
Si no hay margen suficiente o la ventana no se renovó, conservar el estado sin solicitudes.
Los siguientes comandos no repiten respuestas ni sustituyen inválidas o abstenciones:

```bash
node scripts/pilot-g3-g6-real.js verificar-entradas
node scripts/g3-g6-results.js verificar --partial
node scripts/pilot-g3-g6-real.js ejecutar 1
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
