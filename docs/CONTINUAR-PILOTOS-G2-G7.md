# Continuación de los pilotos de G2 y G7

Juan pidió ejecutar ambos pilotos y después indicó **conservar los reinicios gratuitos y continuar tras la renovación automática**. No se compran créditos ni se usan reinicios. Falta terminar G2; G7 ya completó su piloto. Ambos siguen pendientes de validación experta.

## Punto guardado · 19 de octubre

- Repositorio: `/Users/juan/Desktop/9no/Tesis/ux-laws-plugin`.
- Preparación y reglas registradas en el commit `70b7b2b` y `docs/PILOTO-G2-G7-18OCT.md`. El primer punto de pausa quedó en `f27c410`.
- **G2:** `pilotos/g2-2026-10-18/`, 60 posiciones completadas: 29 puntajes y 31 abstenciones. **Faltan 60, desde C16-r1.**
- **G7:** `pilotos/g7-2026-10-18/`, **120/120 válidas, piloto terminado**. Las 24 páginas mantuvieron nivel y regla. Sus 539 archivos primarios tienen sello comprobable. No iniciar más solicitudes de G7.
- No hay respuestas inválidas, fallos técnicos ni discrepancias de anclas. Se comprobaron los originales, las atribuciones y las trazas de las 180 sesiones distintas entre ambos grupos.
- No hay ejecutores ni solicitudes en curso. G2 tiene `PAUSA-POR-USO-2.json` y `SNAPSHOT-PAUSA-2-SHA256.tsv`, con 300 archivos. El snapshot es parcial; no es el sello final.
- Se dejó margen al observar 77 % de uso. La siguiente renovación automática observada fue `1792418828` (19 de octubre, 09:07:08 en Bogotá). El dato queda como historial: comprobar el estado actual antes de actuar y retomar después de la renovación.
- El seguimiento `completar-pilotos-g2-y-g7` continúa activo en este chat, a las 04:00, 10:00, 16:00 y 22:00. Desactivarlo cuando ambos pilotos estén completos y verificados o si el usuario cancela.

## Cómo continuar G2

Primero revisar cambios locales, el uso disponible y si hay un ejecutor activo. No lanzar dos ejecutores sobre el mismo grupo. Si la ventana todavía no se ha renovado o queda poco margen, conservar este punto y esperar la siguiente ejecución del seguimiento, sin repetir un informe sin cambios.

El modelo registrado es `gpt-6.1-sol`, CLI `0.162.0-alpha.17.2`, razonamiento `low`, medición `1.0.6`, cinco repeticiones y tres solicitudes simultáneas por ejecución. Mantener iguales el ejecutor, el contrato, los esquemas, las instrucciones, las rúbricas y las entradas fijadas por hashes. Si cambia la CLI, documentar el problema antes de iniciar otra solicitud; no sustituirla silenciosamente.

Reanudar únicamente G2 por lotes pequeños. El ejecutor omite todas las posiciones que ya tienen un registro, incluyendo abstenciones e inválidas. `--limit` cuenta posiciones pendientes. Una abstención es un resultado; no se vuelve a pedir para conseguir un puntaje. No volver a preparar estas carpetas ni sustituir sus imágenes.

```bash
node scripts/pilot-g2-g7-real.js ejecutar --out pilotos/g2-2026-10-18 --limit 12
```

Comprobar el consumo entre lotes y dejar margen para guardar y verificar. En la última ventana se añadieron 108 respuestas entre ambos grupos y se llegó a 77 % de uso; no dar por hecho que cualquier lote cabe. Si se necesita detener un lote, enviar SIGTERM al proceso de Node del ejecutor y esperar las solicitudes en curso; no matar las solicitudes individuales.

Ante un error técnico, preservar el intento y detener nuevas consultas. Si ya hubo un juicio, no repetirlo. El ejecutor no reintenta fallos por sí solo. Guardar cualquier pausa adicional en un archivo nuevo, sin sobrescribir las pausas ni snapshots anteriores.

## Informes y verificación

```bash
node scripts/report-g2-g7-pilot.js pilotos/g2-2026-10-18
node scripts/verify-pilot-g2-g7.js pilotos/g2-2026-10-18 --partial
node scripts/verify-pilot-g2-g7.js pilotos/g7-2026-10-18 --verify-seal
```

Las verificaciones recalculan las medidas desde las capturas versionadas y no dependen de `measurements.json` ignorados por Git. La auditoría de anclas se conserva separada de la validez del formato y los datos: las discrepancias no se corrigen ni se excluyen silenciosamente. Las comprobaciones de esta reanudación están en `QA-REANUDACION-1.json` de cada grupo; las pruebas de integridad anteriores siguen en `QA-INTEGRIDAD.json`.

Solo se simplificó la presentación de los motivos de abstención en `scripts/report-g2-g7-pilot.js`; los nombres y datos originales siguen en JSON y CSV. No se cambió ningún archivo del contrato congelado. Los informes y tablas son derivados; los 539 archivos primarios de G7 ya sellados se conservan sin cambios.

Cuando G2 llegue a las 120 posiciones y no queden errores técnicos, verificar sin `--partial`, generar su sello con `--seal` y comprobarlo con `--verify-seal`. Conservar los snapshots como historial. Comprobar también que las 240 sesiones de ambos grupos sean distintas y que los CSV mantengan 120 posiciones por grupo.

Completar los informes con las cifras reales y actualizar `CLAUDE.md`, `docs/piloto-calibracion.md`, `docs/PILOTO-G2-G7-18OCT.md` y esta guía. Registrar los cambios en commits locales verificables. Conservar los cuatro `.DS_Store` ajenos a la tarea sin incluirlos. La publicación en GitHub requiere autorización aplicable del usuario; no es necesaria para completar este seguimiento.

## Qué sigue pendiente del método

G2 tiene combinaciones sin nivel explícito. C10 alternó cuatro ceros y una abstención por la duda sobre si la pantalla exige una decisión. Las primeras 60 respuestas no identificaron apoyos de decisión y no probaron la rama de reducción activa. Conservar estos resultados y llevar las dudas a Camilo; no completar las reglas durante esta serie.

G7 terminó con 105 ceros, diez unos y cinco doses, y 75 marcas de evidencia insuficiente. No ejercitó niveles 3 ni 4. Su estabilidad no equivale a coincidencia con expertos ni autoriza a cambiar los cortes para repartir niveles.

El consenso de los casos dorados sigue vacío y no se completa con juicios del modelo. Tampoco se supone aprobación ética. **Piloto terminado y grupo validado son estados distintos.**

Al completar y verificar G2, dejar un resumen con enlaces a los informes finales de ambos grupos y desactivar el seguimiento para evitar nuevas solicitudes. No desactivarlo todavía: faltan 60 posiciones de G2.
