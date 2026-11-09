# Prueba de la entrega integrada

5 de noviembre de 2026. Comprobación local de la versión 0.2.2.

La prueba completó captura, preparación, siete respuestas válidas y cierre del perfil.
G3 aplicó nivel 2 al caso añadido. G6 conservó su abstención y mostró el detalle de las
ocho convenciones. No hubo fallos técnicos, respuestas reemplazadas ni reintentos.

## Cómo se hizo

Se usó el ZIP 0.2.2 instalado aparte, con fast-uri 3.1.9. Se capturó `portal.html`,
la misma pantalla sintética incluida en las comprobaciones anteriores. No es una
página nueva de validación ni tiene una calificación experta.

Se pidió `gpt-6.1-sol`, esfuerzo `low`, mediante Codex CLI 0.164.0-alpha.11.1.
Se ejecutó una repetición por grupo en siete sesiones independientes, sin historial
ni herramientas. Cada sesión recibió el prompt, esquema, solicitud e imágenes
preparados por la entrega. G4 recibió screenshot; los grupos que lo requieren
conservaron el apoyo textual declarado de screenshot en wireframe.

El [registro previo](REGISTRO-PREVIO.json) guarda el ZIP, ejecutor, archivos del paquete
y configuración antes de las respuestas. Los prompts y las solicitudes se prepararon
antes de la primera evaluación. Los originales y sus registros están en `corrida/`
y `trazas/`. La prueba usa los prompts preparados; no comprueba la selección automática
de la skill a partir de una conversación libre.

## Qué devolvió

| Grupo | Resultado | Condición |
|---|---|---|
| G1 | 2, con advertencia de instrumento no interpretable v1 | C4 |
| G2 | 3 | n1 |
| G3 | 2 | U |
| G4 | 1 | I |
| G5 | 0 | lista_plana |
| G6 | Abstención con diagnóstico | Información insuficiente para el nivel global |
| G7 | 0 | W_min |

G3 declaró U=6, segmentación encabezada, H=0, V=false, X=0 e inventario completo.
La revisión del nivel contra sus propios juicios no encontró discrepancias. Esto no
confirma por sí solo que el modelo haya elegido correctamente la región y las unidades.

En G6, K4 se registró como cumplida; K5 y K6 como no aplicables; K1, K2, K3, K7 y K8
como indeterminadas. Son una convención evaluada, dos no aplicables y cinco pendientes
de evidencia. No se identificaron incumplimientos confirmados. R y T quedaron en cero,
pero T no fue evaluable: esos ceros no demuestran ausencia de problemas en todo el sitio.
No se calculó una nota de ese subconjunto.

El [perfil legible](corrida/perfil.md) muestra las razones y los ids. El
[perfil de datos](corrida/perfil.json) conserva el detalle. Los siete puntajes o estados
coinciden con las respuestas originales; no se corrigieron durante el cierre.

## Comprobar lo guardado

Desde el repositorio, conservando la instalación de prueba en `dist/chequeo-codex-0.2.2`:

```bash
node scripts/verificar-integracion-real.js --verify-seal
```

Comprueba las siete sesiones, originales, solicitudes, huellas, esquema, contratos,
atribución y correspondencia con el perfil. No llama al modelo. `SHA256SUMS` protege
los archivos de esta carpeta. El informe general de cambios y las demás comprobaciones
están en [la integración de G3/G6](../../docs/INTEGRACION-G3-G6-05NOV.md).

## Límites

Es una pantalla y una repetición, suficiente para una comprobación pequeña del flujo,
no para demostrar estabilidad, acuerdo experto o exactitud en cualquier página.
No se ejecutaron modelos en Claude ni una comparación real entre canales. La captura
no tuvo alertas automáticas, lo cual no garantiza que el detector cubra todos los avisos.
Los pilotos anteriores se conservan con sus versiones y resultados; no se mezclan con
esta prueba. Todo permanece local para revisión de Juan.
