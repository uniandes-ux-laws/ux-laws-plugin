# Cierre de los pilotos de G2 y G7 · 19 de octubre

**Los dos pilotos están terminados. No quedan posiciones por consultar ni reintentos autorizados pendientes.** Este documento conserva el punto de cierre; no es una instrucción para volver a ejecutar las colas.

## Resultado final

| Grupo | Respuestas | Puntajes | Abstenciones | Inválidas | Fallos sin resolver |
|---|---:|---:|---:|---:|---:|
| G2 | 120 | 41 | 79 | 0 | 0 |
| G7 | 120 | 120 | 0 | 0 | 0 |

- [Informe de G2](../pilotos/g2-2026-10-18/INFORME.md): seis ceros, veinticinco doses y diez treses. Seis de las siete páginas con cinco puntajes mantuvieron el nivel; tres mantuvieron la regla. Hay 108 marcas de evidencia insuficiente.
- [Informe de G7](../pilotos/g7-2026-10-18/INFORME.md): 105 ceros, diez unos y cinco doses. Nivel y regla estables en las 24 páginas. Hay 75 marcas de evidencia insuficiente.
- Sellos comprobados: **554 archivos primarios de G2 y 539 de G7**. Los CSV contienen las 120 posiciones por grupo y separan las abstenciones de los puntajes.

Se mantuvieron `gpt-6.1-sol`, CLI `0.162.0-alpha.17.2`, esfuerzo `low`, medición `1.0.6`, imágenes, prompts, rúbricas, esquemas y contrato registrados en `70b7b2b`. Las modificaciones posteriores del código fueron de presentación de informes. No se corrigieron puntajes, juicios ni umbrales.

## Historial técnico conservado

G2 tuvo tres desconexiones en R07-r3/r4/r5, sin respuesta recuperable. Juan autorizó un único reintento de cada una; las tres devolvieron abstenciones. Los 117 resultados previos quedaron intactos. G2 registra 123 intentos para 120 posiciones, contando los tres fallidos históricos. Entre G2 y G7 hay **240 sesiones con respuesta y tres fallidas, todas distintas**.

Las copias de los fallos permanecen en `pilotos/g2-2026-10-18/fallos-tecnicos/2026-10-19-conexion/`. Los logs completos se guardan localmente y están ignorados por Git. Los diagnósticos, pausas, snapshots y el [plan de recuperación](RECUPERACION-G2-19OCT.md) conservan los estados anteriores; no significan que todavía falten resultados. La autorización está en `REINTENTO-TECNICO-AUTORIZADO-19OCT.json` y la comprobación final en `QA-CIERRE.json`, dentro de G2.

No se usaron reinicios gratuitos ni se compraron créditos. Los avances se guardan en commits locales. Publicar en GitHub requiere autorización aplicable; no es necesario para este cierre. Los cuatro `.DS_Store` ajenos a la tarea se conservan sin incluirlos.

## Comprobación sin nuevas evaluaciones

```bash
node scripts/verify-pilot-g2-g7.js pilotos/g2-2026-10-18 --verify-seal
node scripts/verify-pilot-g2-g7.js pilotos/g7-2026-10-18 --verify-seal
```

Estas verificaciones recalculan las medidas desde las capturas versionadas y comprueban originales, atribuciones y trazas. No hacen consultas al modelo. Los informes y tablas son derivados; los archivos primarios sellados se conservan sin cambios.

El seguimiento `completar-pilotos-g2-y-g7` debe quedar desactivado después de registrar el commit de cierre. **No reanudarlo ni volver a evaluar las posiciones completadas.** Un nuevo experimento requiere una nueva decisión y otro registro.

## Lo que falta para validar los grupos

G2 necesita acordar con Camilo cómo tratar las combinaciones sin nivel y cómo distinguir una acción principal ausente de una presente sin destacar. C16 alternó entre niveles 0 y 2; C10 y R02 alternaron puntaje y abstención. Quince páginas tuvieron cinco abstenciones. No se identificaron apoyos de decisión ni se ejercitaron los niveles 1 y 4.

G7 no ejercitó los niveles 3 ni 4. Además, su rúbrica incluía cifras agregadas del piloto histórico, como se declaró antes de evaluar. La estabilidad en estas capturas no prueba coincidencia con expertos.

El consenso de casos dorados y el contraste con expertos siguen pendientes. Tampoco se supone aprobación ética. **Piloto terminado y grupo validado son estados distintos.**
