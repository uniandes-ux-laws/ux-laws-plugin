# G4: cierre de la fase dirigida

20 de octubre de 2026. **Terminada: 85/85 evaluaciones, ninguna pendiente.** La respuesta
S01-r1 se conservó y se ejecutaron las otras 84 después de la renovación automática del uso.
El seguimiento `completar-fase-dirigida-de-g4`, autorizado para las 3:40 a. m. de Bogotá,
quedó pausado al terminar. No se usaron reinicios gratuitos ni se compraron créditos.

## Resultado

- **Ejemplos separados:** 40 puntajes, 35 coincidencias de nivel. S07 recibió 4 en sus cinco
  respuestas, aunque el diseño esperaba 3 por color solamente. Las tres reglas propuestas
  coincidieron en sus cinco repeticiones. Las expectativas son nuestras, no expertas.
- **Nueve páginas reales:** 12 puntajes y 33 abstenciones; 42 advertencias de evidencia
  insuficiente. Alkosto varió entre 2 y 4. Canadá mantuvo nivel 1, pero cambió de conjunto.
  Panamericana y La República mezclaron una respuesta de nivel 1 con cuatro abstenciones.
- **Sin respuestas inválidas ni fallos técnicos.** Se comprobaron las 85 conversaciones,
  los originales, las trazas y las copias con atribución. El sello protege 382 archivos.

Se revisaron las explicaciones después de evaluar. Once respuestas sintéticas atribuyen un
canal de peso tipográfico que no está respaldado por los estilos congelados; otra lo menciona
solo en su explicación. Se conserva esa observación aparte, sin corregir respuestas ni
cambiar expectativas. El resumen tampoco cuenta la falta de selección como otro conjunto.

## Qué se conservó

Modelo gpt-6.1-sol, esfuerzo low, CLI 0.162.0-alpha.17.2, contrato 0.2.0 y proyección G4
1.0.7 sobre fuente 1.0.6. No cambiaron rúbrica, ejecutor, dependencias, capturas, prompts ni
archivos registrados. Preparación: 067e9f7; registro anterior a las respuestas: cc9098d.
Solo se mejoraron los informes y su resumen derivado. Los datos de cada fase siguen separados.

Las tres carpetas históricas de G4 siguen iguales a 2f1f7e6: 798 archivos versionados.
También se verificó el sello de 540 archivos de la fase de 120 respuestas. No se modificaron
el corpus, los casos dorados ni los instrumentos de los otros grupos.

## Archivos y comprobación

- [Informe de resultados](../pilotos/g4-cierre-2026-10-20/INFORME.md).
- [Revisión posterior y puntos para Camilo](REVISION-G4-FASE2-20OCT.md).
- [Revisión inicial de conjuntos](REVISION-G4-20OCT.md).
- [Registro previo](FASE-G4-20OCT.md) y [decisiones propuestas](DECISIONES-G4-20OCT.md).

```bash
node scripts/g4-phase2-results.js verificar --verify-seal
node scripts/verify-pilot-g4.js pilotos/g4-2026-10-07-v3 --verify-seal
```

La tarea automática terminó; no quedan solicitudes para reanudar en esta fase. **G4 todavía
no está validado:** faltan revisar los criterios con Camilo, evaluación experta y consenso.
El panel humano depende de aprobación ética. Los cambios se guardan en commits locales;
publicar a GitHub requiere autorización aplicable.
