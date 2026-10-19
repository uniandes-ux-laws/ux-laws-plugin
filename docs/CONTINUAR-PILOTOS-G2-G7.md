# Continuación de los pilotos de G2 y G7

## Estado actual · pausa técnica del 19 de octubre

**No iniciar nuevas solicitudes hasta que Juan confirme el reintento propuesto.** Indicó conservar los reinicios gratuitos y detener las consultas ante un fallo técnico. No se compran créditos ni se usan reinicios.

- Repositorio: `/Users/juan/Desktop/9no/Tesis/ux-laws-plugin`.
- Plan y código congelados: commit `70b7b2b`. Puntos anteriores: `f27c410` y `aa05591`.
- **G7 completo:** 120/120 respuestas válidas, 24 páginas estables en nivel y regla. Sello intacto de 539 archivos. No volver a consultarlo.
- **G2 incompleto:** 117/120 respuestas recibidas, con 41 puntajes y 76 abstenciones. Cero respuestas inválidas. Fallaron R07-r3, R07-r4 y R07-r5, sin respuesta recuperable.
- Hay 120 intentos registrados de G2, pero solo 117 resultados. `pendientes=0` significa cero posiciones sin intentar, no piloto completo. Quedan tres fallos por resolver.
- No hay ejecutores ni solicitudes en curso. El último uso observado era 46 % y seguía disponible. No fue necesario usar reinicios ni comprar créditos.
- Los intentos fallidos permanecen en `trazas/` y tienen copias idénticas en `fallos-tecnicos/2026-10-19-conexion/`. No borrar ni sustituirlos sin seguir el plan de recuperación.
- `SNAPSHOT-PAUSA-3-SHA256.tsv` protege 539 archivos, incluyendo las seis copias JSON/JSONL de los fallos. Excluye sus seis originales activos duplicados para poder conservar el historial si se autoriza un reintento. Los snapshots anteriores siguen intactos. No existe sello final de G2.

El seguimiento `completar-pilotos-g2-y-g7` sigue activo en este chat. Juan cambió la revisión de la mañana a las 09:10, conservando las de las 04:00, 16:00 y 22:00. Mientras esta pausa no esté resuelta debe omitir nuevas solicitudes y no repetir un aviso sin cambios. Desactivarlo cuando ambos pilotos estén completos y verificados o si Juan cancela.

## Paso propuesto, pendiente de confirmación

El [plan concreto](RECUPERACION-G2-19OCT.md) propone un nuevo intento solo de R07-r3/r4/r5, conservando sus registros fallidos. No repetir ninguno de los 117 juicios existentes. La confirmación debe venir de Juan; el paso del tiempo o un nuevo heartbeat no la sustituyen.

Una vez autorizado, comprobar uso y procesos, verificar las copias y retirar solo los registros activos de los tres fallos para que el ejecutor los reconozca como pendientes. Registrar ese paso y la autorización en un archivo nuevo; no modificar los documentos primarios de esta pausa. Usar el ejecutor congelado con `--limit 3`. Si vuelve a haber un fallo técnico, conservarlo y detenerse.

Se mantienen `gpt-6.1-sol`, CLI `0.162.0-alpha.17.2`, esfuerzo `low`, medición `1.0.6`, imágenes, prompts, esquemas y rúbricas. No cambiar el ejecutor ni el contrato. Las únicas modificaciones del código en esta reanudación corresponden a la presentación de los informes: separan respuestas recibidas de intentos, explican el alcance de las auditorías y muestran la variación por página.

## Verificaciones permitidas durante la pausa

```bash
node scripts/report-g2-g7-pilot.js pilotos/g2-2026-10-18
node scripts/verify-pilot-g2-g7.js pilotos/g2-2026-10-18 --partial
node scripts/verify-pilot-g2-g7.js pilotos/g7-2026-10-18 --verify-seal
```

Los datos se recalculan desde las capturas versionadas, sin depender de `measurements.json` ignorados por Git. El diagnóstico y las comprobaciones están en `DIAGNOSTICO-ERROR-TECNICO-19OCT.json`, `PAUSA-TECNICA-19OCT.json` y `QA-REANUDACION-2.json` de G2. Las pruebas anteriores de integridad también se conservan. Los logs completos son locales y están ignorados por Git; el diagnóstico registra sus hashes y un error sin información privada de las solicitudes.

Si los tres nuevos intentos terminan, habrá que comprobar 240 sesiones con respuesta entre G2 y G7, además de las tres sesiones fallidas históricas. Mantener separados los fallos conservados y los nuevos resultados. Revisar los CSV, verificar y sellar G2, actualizar `CLAUDE.md`, `docs/piloto-calibracion.md`, el registro y esta guía, y guardar los cambios en commits locales. La publicación en GitHub requiere autorización aplicable y no es necesaria para completar este seguimiento. No incluir los cuatro `.DS_Store` ajenos a la tarea.

## Pendientes del método

G2 conserva combinaciones sin nivel. C16 alternó entre 0 y 2; C10 y R02 alternaron puntaje y abstención. Hay 105 marcas de evidencia insuficiente y no se identificaron apoyos de decisión en las 117 respuestas. Los niveles 1 y 4 no quedaron ejercitados. Llevar estas dudas a Camilo; no cambiar las reglas durante esta serie.

G7 conserva 105 ceros, diez unos y cinco doses, y 75 marcas de evidencia insuficiente. No ejercitó niveles 3 ni 4. Su rúbrica incluía cifras agregadas del piloto histórico, como se declaró antes de evaluar.

El consenso de casos dorados y el contraste con expertos siguen pendientes. **Piloto terminado y grupo validado son estados distintos.** No declarar completado G2 mientras falten las tres respuestas ni desactivar el seguimiento por haber registrado 120 intentos.
