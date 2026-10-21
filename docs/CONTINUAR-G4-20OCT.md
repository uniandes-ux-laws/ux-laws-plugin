# G4: prueba de los casos pendientes

20 de octubre de 2026. Terminamos las **85 evaluaciones** de esta fase. La hicimos para
probar los criterios propuestos y volver a revisar nueve páginas dudosas. Los resultados
del piloto anterior se conservaron por separado. **Falta revisar las propuestas con Camilo
antes de hablar de validación.**

## Qué salió

| Parte de la prueba | Respuestas | Resultado |
|---|---:|---|
| Ocho ejemplos, cinco repeticiones por ejemplo | 40 | 35 coincidencias con el nivel previsto; S07 dio 4 en las cinco, frente al 3 esperado. |
| Nueve páginas reales, cinco repeticiones por página | 45 | 12 puntajes y 33 abstenciones. Hubo 42 advertencias de evidencia insuficiente. |

Las tres reglas nuevas coincidieron con el nivel previsto en sus cinco repeticiones.
Las expectativas son las que propusimos al diseñar los ejemplos; no son calificaciones
expertas. En las páginas reales no fijamos un puntaje correcto.

Alkosto varió entre 2 y 4. Canadá mantuvo nivel 1, pero cambió qué conjunto de elementos
evaluó. Panamericana y La República tuvieron un puntaje de nivel 1 y cuatro abstenciones
cada una. La elección del conjunto sigue siendo un punto para revisar.

También miramos las explicaciones. Once respuestas de los ejemplos contaron una diferencia
de peso tipográfico que los estilos del diseño no respaldan; otra la mencionó solo en su
explicación. Guardamos esa observación después de evaluar, sin corregir las respuestas.
El [detalle de la revisión](REVISION-G4-FASE2-20OCT.md) explica qué pasó en cada caso.

## Qué comprobamos

No hubo respuestas inválidas ni fallos técnicos. Revisamos las 85 conversaciones y sus
originales. El sello protege 382 archivos. S01-r1 ya estaba guardada y se completaron las
otras 84 tras renovarse el uso. El seguimiento automático quedó pausado al terminar;
no se usaron reinicios gratuitos ni se compraron créditos.

Se mantuvieron gpt-6.1-sol, esfuerzo low, CLI 0.162.0-alpha.17.2 y contrato 0.2.0. La copia
de medidas de G4 usa versión 1.0.7 sobre la fuente 1.0.6. La preparación quedó en 067e9f7
y el registro previo en cc9098d. Los datos e instrucciones registrados antes de evaluar
siguen intactos.

Las tres carpetas históricas de G4 conservan sus 798 archivos frente a 2f1f7e6. También
se verificó el sello de 540 archivos del piloto de 120 respuestas. El corpus, los casos
dorados y los instrumentos de los demás grupos se mantuvieron.

## Qué sigue y dónde ver los archivos

Debemos revisar con Camilo las reglas propuestas, qué conjunto se evalúa y cuándo una
captura incompleta permite puntuar con una advertencia. Faltan la evaluación experta y
el consenso. El panel humano depende de aprobación ética.

- [Informe de las 85 evaluaciones](../pilotos/g4-cierre-2026-10-20/INFORME.md).
- [Revisión posterior y preguntas para Camilo](REVISION-G4-FASE2-20OCT.md).
- [Revisión inicial de los conjuntos](REVISION-G4-20OCT.md).
- [Registro previo](FASE-G4-20OCT.md) y [criterios propuestos](DECISIONES-G4-20OCT.md).

```bash
node scripts/g4-phase2-results.js verificar --verify-seal
node scripts/verify-pilot-g4.js pilotos/g4-2026-10-07-v3 --verify-seal
```

La ejecución de esta fase terminó; no quedan solicitudes para reanudar. El
[resumen de avances](AVANCES-GRUPOS-21OCT.md) permite ver G4 junto con los demás grupos.
