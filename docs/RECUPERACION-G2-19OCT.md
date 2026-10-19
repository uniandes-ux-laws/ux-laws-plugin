# Recuperación propuesta de G2 · 19 de octubre

**Estado: falta confirmación de Juan. No iniciar nuevas solicitudes todavía.** Su instrucción fue: «ante un error técnico conserva todo y detén nuevas solicitudes».

G2 tiene 117 respuestas: 41 puntajes y 76 abstenciones. Solo **R07-r3, R07-r4 y R07-r5** fallaron. Sus registros no contienen mensaje final ni archivo de respuesta; no hay un puntaje, abstención o respuesta inválida que pueda sustituirse. G7 ya está completo.

La propuesta es hacer **un nuevo intento de esas tres posiciones**, con el mismo ejecutor y la misma configuración. Antes de hacerlo:

1. Comprobar nuevamente el uso y que no haya procesos en curso.
2. Verificar que los originales fallidos coinciden con sus copias en `pilotos/g2-2026-10-18/fallos-tecnicos/2026-10-19-conexion/`. Las copias JSON y JSONL están protegidas por `SNAPSHOT-PAUSA-3-SHA256.tsv`; los logs completos se conservan localmente.
3. Registrar la autorización y mantener las copias sin cambios. Retirar solo los seis registros activos JSON/JSONL de esos tres fallos, una vez comprobadas las copias. Conservar los 117 resultados recibidos y todos sus originales.
4. Ejecutar el programa congelado con `--limit 3`. Al quedar únicamente esas tres posiciones sin registro activo, el programa solicitará solo ellas. No cambiar modelo, CLI, esfuerzo, imágenes, medición, prompts, rúbricas ni validación.

Si vuelve a fallar una solicitud, detenerse y conservar el nuevo intento. No encadenar reintentos automáticos.

Si las tres terminan, documentar por separado los tres fallos históricos, revisar las 120 respuestas de G2 y las 120 de G7, comprobar las sesiones y generar el sello final de G2. Actualizar el estado y los informes, guardar un commit local y desactivar el seguimiento. Completar el piloto no sustituye el consenso de casos dorados ni la validación experta.
