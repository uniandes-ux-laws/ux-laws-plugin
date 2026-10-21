# G3 y G6: ejecución terminada

Registro del 20 de octubre; cierre del **21 de octubre de 2026**. Se conservaron las
120 posiciones de cada grupo. **No quedan solicitudes pendientes y no se deben repetir
respuestas**, incluidas las inválidas y las abstenciones.

El seguimiento `completar-pilotos-g3-y-g6` fue eliminado al completar la comprobación.
No quedan continuaciones programadas ni se necesita reanudar el ejecutor.

| Grupo | Conservadas | Puntajes | Abstenciones | Inválidas | Fallos técnicos |
|---|---:|---:|---:|---:|---:|
| G3 | 120/120 | 20 | 70 | 30 | 0 |
| G6 | 120/120 | 0 | 120 | 0 | 0 |

No hubo NA. Se comprobaron 240 conversaciones distintas, sus originales, registros,
atribución y tablas. Los sellos protegen 504 archivos de G3 y 534 de G6. Ya existen:
**no volver a ejecutar `sellar` ni regenerarlos**. Las marcas de insuficiencia se cuentan
en respuestas conformes: 87 en G3 y 120 en G6. Las 30 inválidas de G3 se conservan aparte.

Informes: [G3](../pilotos/g3-2026-10-20/INFORME.md),
[G6](../pilotos/g6-2026-10-20/INFORME.md).
[Resumen del cierre y revisión de explicaciones](CIERRE-G3-G6-21OCT.md).

## Comprobar lo guardado

```bash
node scripts/pilot-g3-g6-real.js verificar-entradas
node scripts/g3-g6-results.js verificar --verify-seal
python3 scripts/verify-g3-g6-closure.py
```

La última comprobación compara los CSV con los originales, las conversaciones y los sellos,
y guarda un informe derivado en `revisiones/g3-g6-2026-10-20/QA-CIERRE-21OCT.json`.
No solicita respuestas ni cambia calificaciones. Los 4.111 archivos históricos frente a
d0ac313 siguen iguales; los ocho sellos anteriores, con 3.122 archivos, no se regeneraron.

## Registro que se conserva

La fuente de preparación es `39714dbed6238d7d817e30063fb0449ee77163c7`; el registro anterior
a las respuestas es `0dfbdd9462c9580513c79f8e63c54b2e58169463`. El
[registro previo](PILOTOS-G3-G6-20OCT.md), las rúbricas, entradas, prompts, ejecutor,
dependencias y capturas fijados por hash permanecen intactos.

Se mantuvieron gpt-6.1-sol, low, CLI 0.162.0-alpha.17.2, evidencia 1.1.0 sobre fuente 1.0.6
y contratos 0.1.0. La CLI se conservó en
`/Users/juan/.codex/pilot-runtimes/codex-0.162.0-alpha.17.2` después de actualizarse la app.
Los detalles, el incidente anterior de consulta de uso y los ejemplos están en las
[observaciones posteriores](OBSERVACIONES-G3-G6-20OCT.md). No se usaron reinicios ni se
compraron créditos. Se registró el apoyo textual de screenshot; no es una comparación
limpia entre canales. La auditoría geométrica 1.0.2 conserva aparte la auditoría original.
Sus cinco observaciones no se toman como cinco errores establecidos por expertos.

## Pendientes de la tesis

La ejecución terminó. Faltan revisar reglas, selección y evidencia con Camilo, validar con
expertos y completar el consenso de los casos dorados. Los criterios operativos son
propuestas del equipo, no acuerdos atribuidos al asesor. El panel humano depende de
aprobación ética. No publicar esta fase en GitHub sin una autorización nueva aplicable.
