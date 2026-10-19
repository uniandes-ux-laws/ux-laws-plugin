# Continuar la prueba de progreso de G5

19 de octubre de 2026, corte anterior a la continuación de las 3:25 p. m. de Bogotá.

Juan autorizó evaluar los ejemplos y después pidió programar la continuación para hoy a las 3:25 p. m. La automatización de este chat se llama **Completar prueba de progreso de G5**, id completar-prueba-de-progreso-de-g5. Es una ejecución programada para ese horario; al terminar se desactiva. La automatización antigua de G2/G7 sigue pausada y no debe reactivarse.

## Punto de reanudación

- Carpeta: pilotos/g5-progreso-2026-10-19.
- **6/45 posiciones terminadas**, todas válidas: P01-r1, P02-r1, P03-r1, P04-r1, P05-r1 y P07-r1.
- Niveles respectivos: 0, 1, 2, 3, 3 y 0. Coinciden con las expectativas de nivel propuestas. No hay cinco repeticiones completas de ninguna pantalla y todavía no se puede afirmar estabilidad.
- P02-r1 marcó evidencia insuficiente, a diferencia de lo previsto: señaló que la barra no aparece entre los candidatos medidos y que su relleno se pierde en el wireframe. Se conserva la diferencia. No cambiar el ejemplo ni su expectativa.
- Hay **39 posiciones pendientes**, sin fallos técnicos ni respuestas inválidas en este corte. La siguiente es **P08-r1**, luego P09-r1 y P10-r1; después comienzan las segundas repeticiones.
- Verificación parcial: originales, respuestas con atribución y trazas de seis conversaciones independientes comprobados. El piloto general no se modificó.

## Reglas para seguir

Primero comprobar el uso y los procesos en curso. En este corte la ventana llegó al 94 % y se dejaron de iniciar solicitudes. La renovación automática estaba prevista para las 3:17 p. m. aproximadamente. El horario no garantiza que se haya renovado: verificarlo antes de continuar. **No usar reinicios gratuitos ni comprar créditos.**

La prueba está registrada antes de evaluar en [REGISTRO-PREVIO.md](../pilotos/g5-progreso-2026-10-19/REGISTRO-PREVIO.md). Modelo gpt-6.1-sol, esfuerzo medium, CLI 0.162.0-alpha.17.2, medición 1.0.6, cinco repeticiones. El ejecutor quedó en el commit f66f177 y el manifiesto de la prueba se guardó en 3cbfc6b antes de recibir respuestas. No modificar el ejecutor ni sus dependencias congeladas para continuar.

P06 está excluida por una combinación sin nivel explícito. P10 tiene cinco posiciones para revisar el límite del recorte; no entra en la coincidencia de niveles. Son 40 posiciones con nivel o NA esperado y otras cinco de límite. Las expectativas son propuestas de diseño, no evaluaciones humanas ni casos dorados. No se entregan al modelo.

```bash
node scripts/pilot-g5-progress.js verificar-entradas
node scripts/verify-g5-progress.js --partial
node scripts/pilot-g5-progress.js ejecutar 3
```

Cada lote permite de una a tres solicitudes, con concurrencia uno. Revisar el uso entre lotes y detener solicitudes nuevas al llegar al 94 %. El ejecutor omite posiciones con un intento conservado, incluso si es inválido. Bloquea reintentos ante errores técnicos o trazas sin cerrar: conservar todo y revisar antes de actuar. No volver a evaluar para mejorar un puntaje o una marca de evidencia insuficiente.

Actualizar los derivados sin modificar los originales:

```bash
node scripts/report-g5-progress.js
node scripts/verify-g5-progress.js --partial
```

Los verificadores y el informe se pueden mejorar si aparece un defecto de comprobación; no se cambian las respuestas ni el contrato para hacerlos pasar. Al terminar las 45 posiciones:

```bash
node scripts/report-g5-progress.js
node scripts/verify-g5-progress.js --seal
node scripts/verify-g5-progress.js --verify-seal
```

Actualizar este documento, CLAUDE.md y el estado de G5, guardar commits locales verificables, desactivar el seguimiento y dar a Juan un resumen con el enlace a [INFORME.md](../pilotos/g5-progreso-2026-10-19/INFORME.md). Publicar a GitHub requiere una autorización aplicable; no se ha solicitado publicar esta prueba.

La prueba terminada no cierra P06, el ejemplo positivo de nivel 4 ni la validación con expertos.
