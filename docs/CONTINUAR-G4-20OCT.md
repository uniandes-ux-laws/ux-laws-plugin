# G4: punto de continuación

20 de octubre de 2026. La fase dirigida está **preparada e iniciada, todavía incompleta**.
Hay una respuesta válida conservada: S01-r1, nivel 1. Quedan **84 de las 85 posiciones**.
No se interpreta una sola repetición como resultado estable. No hubo fallo técnico ni respuesta
inválida. No se usaron reinicios gratuitos ni se compraron créditos.

## Qué quedó hecho

Juan confirmó que no hay acuerdo con Camilo y autorizó proponer criterios. Se propuso nivel 1
sin aislados, nivel 2 para dos aislados con jerarquía y nivel 2 para foco pertinente con contenido
sustantivo tratado como auxiliar. Se registraron por separado, antes de las respuestas nuevas.
Las [decisiones](DECISIONES-G4-20OCT.md) siguen pendientes de contraste con Camilo y expertos.

Se revisaron las 120 respuestas anteriores y se contrastaron las nueve páginas dudosas.
La [revisión](REVISION-G4-20OCT.md) declara cajas mal asociadas, cambios de sección, dudas de P,
recortes y oclusión. La proyección G4 1.0.7 corrige 110 falsas marcas de parcialidad de conjuntos;
33 respuestas anteriores eligieron esos conjuntos. No elimina sus otros límites de evidencia.
La revisión advierte que la comparación de áreas también existe en G5 y merece revisión aparte.

La fase nueva fija nueve páginas reales y ocho ejemplos sintéticos, cinco repeticiones cada
una. Los ejemplos cubren las reglas propuestas y controles de niveles 0–4. Sus expectativas
son nuestras y no se entregan al modelo. Las capturas pasaron el control técnico. No se mezclan
con el corpus, los casos dorados ni las fases anteriores. La [galería de revisión](../revisiones/g4-2026-10-20/index.html)
y la [galería de ejemplos](../preparacion/g4-cierre-2026-10-20/index.html) permiten revisar la evidencia.

Los scripts, ejemplos y criterios quedaron en **067e9f7**. El manifiesto, entradas y prompts
quedaron en **cc9098d** antes de solicitar respuestas. Se verificaron los 540 archivos sellados
de la fase anterior, sus 120 conversaciones completadas y la sesión fallida conservada. La
comparación con Git confirma que las tres carpetas históricas permanecen iguales a 2f1f7e6.

## Antes de continuar

El uso llegó al 92 % al detener solicitudes. La renovación estaba prevista para el **20 de
octubre cerca de las 3:29 a. m. de Bogotá**. Juan autorizó continuar automáticamente y quedó
programado para el **20 de octubre de 2026 a las 3:40 a. m., hora de Bogotá**. El seguimiento
`completar-fase-dirigida-de-g4` está activo en este mismo chat y tiene una sola ejecución
programada. Antes de retomar, comprobar capacidad y continuar solo las posiciones pendientes.

Antes de una solicitud, comprobar el uso disponible y que no haya otro ejecutor de G4 activo.
Mantener gpt-6.1-sol, esfuerzo low, CLI 0.162.0-alpha.17.2, contrato 0.2.0 y proyección G4 1.0.7
sobre fuente 1.0.6. No editar el ejecutor, sus dependencias ni los archivos congelados. Los
verificadores y derivados sí pueden mejorarse conservando los juicios y los criterios previos.

```bash
node scripts/pilot-g4-phase2.js verificar-entradas
node scripts/g4-phase2-results.js verificar --partial
node scripts/pilot-g4-phase2.js ejecutar 1
node scripts/g4-phase2-results.js analizar
node scripts/g4-phase2-results.js verificar --partial
```

Cada lote admite 1, 2 o 3 solicitudes. Revisar uso entre lotes, dejar margen al 94 %, conservar
reinicios gratuitos y no comprar créditos. No repetir posiciones con respuesta, aunque sean
inválidas, abstenciones o desacuerdos. Un error técnico o intento sin cerrar detiene nuevas
solicitudes y se conserva para revisar; no reintentar automáticamente.

## Al terminar las 85 posiciones

```bash
node scripts/g4-phase2-results.js analizar
node scripts/g4-phase2-results.js verificar
node scripts/g4-phase2-results.js sellar
node scripts/g4-phase2-results.js verificar --verify-seal
node scripts/verify-pilot-g4.js pilotos/g4-2026-10-07-v3 --verify-seal
```

Revisar explicaciones sin corregirlas, describir reales y sintéticos por separado y no convertir
sus expectativas en referencia experta. Actualizar este punto, CLAUDE.md y el registro del piloto,
guardar commits locales y desactivar el seguimiento `completar-fase-dirigida-de-g4`. Publicar a GitHub
requiere autorización aplicable. Faltan contraste de las reglas con Camilo, validación experta,
ética y consenso. El [informe de la fase](../pilotos/g4-cierre-2026-10-20/INFORME.md) muestra su estado real.
