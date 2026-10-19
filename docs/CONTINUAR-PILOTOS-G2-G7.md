# Continuación de los pilotos de G2 y G7

Juan pidió ejecutar ambos pilotos y después indicó **conservar los reinicios gratuitos y continuar tras la renovación automática**. No se compran créditos ni se usan reinicios. La tarea sigue pendiente hasta completar los dos grupos y verificar sus resultados.

## Punto guardado

- Repositorio: `/Users/juan/Desktop/9no/Tesis/ux-laws-plugin`.
- Preparación y reglas registradas en el commit `70b7b2b` y `docs/PILOTO-G2-G7-18OCT.md`.
- G2: `pilotos/g2-2026-10-18/`, 24 posiciones completadas: diez puntajes y 14 abstenciones; faltan 96.
- G7: `pilotos/g7-2026-10-18/`, 48 posiciones completadas, todas válidas; faltan 72.
- No hay fallos técnicos ni respuestas inválidas. Las 72 sesiones son distintas y los originales se verificaron.
- Se detuvo la cola de forma preventiva y terminaron todas las solicitudes en curso. No hay ejecutores activos al guardar este punto.
- La siguiente renovación automática observada es `1792399615` (19 de octubre, 03:46:55 en Bogotá). Comprobar el estado actual antes de actuar; ese dato es histórico si ya pasó.
- Seguimiento del mismo chat: `completar-pilotos-g2-y-g7`, programado a las 04:00, 10:00, 16:00 y 22:00. Desactivarlo cuando el trabajo esté completo o si el usuario cancela.

## Cómo continuar

Primero revisar cambios locales, el uso disponible y si hay un ejecutor activo. No lanzar dos ejecutores sobre el mismo grupo. Si la ventana todavía no se ha renovado o queda poco margen, conservar este punto y esperar la siguiente ejecución del seguimiento.

El modelo registrado es `gpt-6.1-sol`, CLI `0.162.0-alpha.17.2`, razonamiento `low`, medición `1.0.6`, cinco repeticiones y tres solicitudes simultáneas por ejecución. Mantener iguales el ejecutor, el contrato, los esquemas, las instrucciones, la rúbrica y las entradas fijados por hashes. Si cambia la CLI, documentar el problema antes de iniciar otra solicitud; no sustituirla silenciosamente.

Reanudar por lotes pequeños. El ejecutor omite todas las posiciones que ya tienen un registro, incluyendo abstenciones e inválidas. `--limit` cuenta posiciones pendientes, no repeticiones nuevas de páginas terminadas. Una abstención es un resultado; no se vuelve a pedir para obtener un puntaje.

```bash
node scripts/pilot-g2-g7-real.js ejecutar --out pilotos/g7-2026-10-18 --limit 12
node scripts/pilot-g2-g7-real.js ejecutar --out pilotos/g2-2026-10-18 --limit 12
```

Comprobar el consumo entre lotes y detener nuevas solicitudes dejando margen para guardar y verificar. En el primer tramo se pasó aproximadamente de 6 % a más de 60 % de uso durante la preparación y las primeras evaluaciones; no suponer que todo lo restante cabe en una sola ventana. Cada grupo puede continuar en varias ventanas con la misma configuración. Si se solicita detener un lote, enviar SIGTERM al proceso de Node del ejecutor y esperar a que termine lo que está en curso; no matar los procesos de las solicitudes individuales.

Ante error técnico, preservar el intento y detener nuevas consultas. Si ya hubo un juicio, no repetirlo. El ejecutor no reintenta fallos por sí solo. Guardar una pausa adicional en un archivo nuevo, sin sobrescribir `PAUSA-POR-USO-1.json`.

## Informes y verificación

```bash
node scripts/report-g2-g7-pilot.js pilotos/g2-2026-10-18
node scripts/report-g2-g7-pilot.js pilotos/g7-2026-10-18
node scripts/verify-pilot-g2-g7.js pilotos/g2-2026-10-18 --partial
node scripts/verify-pilot-g2-g7.js pilotos/g7-2026-10-18 --partial
```

Las verificaciones recalculan medidas desde los archivos originales; no dependen de `measurements.json` ignorados por Git. La lógica de anclas se audita aparte de la conformidad del formato y los datos: las discrepancias no se corrigen ni se excluyen silenciosamente.

Cuando un grupo llegue a sus 120 posiciones y no queden errores técnicos, verificar sin `--partial`, generar el sello con `--seal` y comprobarlo con `--verify-seal`. Los snapshots de pausa se conservan como historial; no son el sello final.

Completar los informes y resúmenes con las cifras reales, marcar las limitaciones y actualizar `CLAUDE.md`, `docs/piloto-calibracion.md` y el resultado de `docs/PILOTO-G2-G7-18OCT.md`. Registrar los cambios en commits. Conservar los archivos `.DS_Store` ajenos a la tarea sin incluirlos. La publicación a GitHub depende de la autorización que conste en el chat; el usuario ya ha solicitado publicar avances previamente.

El consenso de los casos dorados sigue vacío y no se completa con juicios del modelo. Estos pilotos no son validación experta ni prueba de aprobación ética. La rúbrica de G2 tiene combinaciones sin nivel que deben revisarse con Camilo; G7 puede concentrarse en niveles bajos sin que eso autorice a cambiar sus cortes.

Al completar y verificar ambos pilotos, dejar un resumen claro con enlaces a los dos informes finales y desactivar el seguimiento para evitar más solicitudes.
