# Piloto real de G5 · 6 de octubre de 2026

## Registro previo a la ejecución

Objetivo: ejecutar la skill publicada de G5 sobre las **24 capturas de calibración selladas**, con **cinco evaluaciones independientes por página**. No son puntajes humanos ni aproximaciones de `scripts/pilot-calibracion.js`. Ese piloto histórico se conserva.

Se usa el modelo **gpt-6.1-sol**, configurado localmente y disponible en el runtime **Codex CLI 0.160.0**, con esfuerzo de razonamiento **xhigh**, como en la configuración del usuario. La comprobación técnica del runtime respondió el 6 de octubre; no evalúa ninguna página y queda fuera de los resultados. No se cambia de modelo a mitad del experimento. Temperatura y top-p no están expuestos por este runtime y se declara su ausencia; no se presume temperatura cero.

Cada evaluación recibe una conversación nueva (`codex exec --ephemeral`, sin resume), el mismo prompt, esquema y par de imágenes dentro de las cinco repeticiones de una página, y ninguna salida anterior. Solo se suministra el bloque medido de G5, sin puntajes de otros grupos ni niveles humanos. No se habilitan consultas web, conectores o comandos del evaluador. La primera imagen es el wireframe y la segunda, el screenshot para los criterios textuales. Las consultas del segundo canal se registran; esto no es una corrida exclusivamente sobre wireframe.

Los archivos primarios no se recapturan ni modifican. La geometría usa mediciones **1.0.3**, que incluyen la corrección de separación de G5 del 6 de octubre. El wireframe sellado conserva su convención histórica; no se sustituye por uno nuevo con X. Los hashes de captura, medición suministrada, skill, prompt, esquema y script de ejecución se guardan antes de solicitar puntajes.

**Atribución por infraestructura.** El modelo devuelve los juicios y hallazgos en un esquema de transporte estricto. La respuesta original se conserva. La infraestructura añade únicamente el bloque `run` con modelo, runtime, repetición, parámetros y hashes; no modifica puntajes, triggers, mediciones, hallazgos ni recomendaciones. La repetición es un identificador de ejecución, no evidencia de la página, y por ello no se incluye en el prompt común. Se conserva el identificador real de sesión de cada solicitud y su uso de tokens. Esta adaptación del transporte permite mantener idéntico el prompt sin pedir al evaluador que adivine la repetición.

Antes de correr se aclaran dos contradicciones de las instrucciones de G5: los alias de conteos inexistentes se sustituyen por campos de fuente; una consulta del screenshot para decidir `Q` se registra incluso cuando resulta falso. No se modifican niveles, tolerancias ni condiciones para producir una distribución más repartida.

## Análisis predefinido

- Distribución de los niveles 0–4 por evaluación y por página; los no aplicables y resultados inválidos se cuentan aparte, con sus denominadores.
- Por página: cinco niveles y triggers originales, moda (todas las modas si hay empate), fracción en la moda, rango ordinal y número de triggers distintos. No se promedian niveles ordinales como si fueran intervalares.
- Número de casos con evidencia insuficiente, consultas del screenshot, selección de lista y valores de `Q`. Se documenta qué ramas del constructo ejercita este conjunto; son páginas de entrada, por lo que no se presupone presencia de procesos.
- Conformidad con el esquema del proyecto y consistencia de atribución y cifras de fuente. Una salida inválida se conserva y no entra como un puntaje válido.
- Los errores técnicos pueden reintentarse en una conversación nueva, conservando todos los intentos. No se repite una evaluación por obtener un nivel incómodo, una abstención o un desacuerdo.
- No se recalibran umbrales a partir de las frecuencias. Los desacuerdos se revisan como resultados del instrumento. El acuerdo con expertos y casos dorados consensuados queda fuera de este piloto.

## Estado

Registrado antes de ejecutar la primera evaluación de G5. Los resultados se añadirán después de la ejecución y validación; una preparación o un intento fallido no se reportarán como piloto completado.
