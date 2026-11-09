# G1: cerrado con la limitación documentada

21 de octubre de 2026. **G1 queda cerrado para la versión 1 como no interpretable.**
Se terminó la revisión técnica y documental. Sus resultados no permiten distinguir
suficientemente entre las páginas del piloto; no se presenta como un grupo validado.

| Grupo y estado | Páginas | Nivel 0 | Nivel 1 | Niveles 2–4 |
|---|---:|---:|---:|---:|
| G1 — no interpretable v1 | 24 | 23 | 1 | 0 |

El [informe completo](../revisiones/g1-cierre-2026-10-21/INFORME.md) incluye los datos,
las limitaciones y la comprobación por página.

## Qué dejamos listo

- Reprodujimos los 24 resultados del piloto técnico de septiembre con su script original,
  sobre copias temporales. Coincidieron completos y se conservó el archivo histórico.
- Revisamos las mediciones 1.0.6: los conteos y las categorías de C1–C4 coinciden con
  el piloto. Las diferencias entre tres y cuatro decimales quedan registradas.
- Señalamos C1 sin base de cálculo en ocho páginas y el caso C13: tiene un solo grupo,
  pero recibió 0 aunque la skill indica «no aplica» con menos de dos. No se cambió ese 0.
- Guardamos datos, CSV, comprobaciones y hashes. Los diez sellos de pilotos anteriores
  siguen válidos y los 5.159 archivos anteriores de datos y pilotos permanecen intactos.

Es una reproducción de código provisional, **no un piloto nuevo del modelo**. No prueba
su repetibilidad ni la correspondencia con expertos. No se movieron umbrales, se modificó
la rúbrica ni se generaron calificaciones humanas.

## Qué significa el cierre

Juan confirmó en este chat que se debe mantener esta limitación, según lo acordado con
Camilo. Este registro recoge ese alcance; no agrega una aprobación experta de los puntajes.

El perfil de resultados debe mostrar **G1: no interpretable v1** en la tabla. Cuando se
pueda calcular acuerdo con expertos, se reportará con y sin G1, como ya establece el
[protocolo](protocolo.md). No se calculan coeficientes sin esas calificaciones.

Las cuatro leyes del grupo siguen sin resultado interpretable en esta versión:
Proximidad, Prägnanz, Región común y Similitud. El problema observado corresponde a esta
rúbrica, su implementación y estas 24 capturas; no demuestra que las leyes sean inválidas
ni que todas las páginas tengan la misma calidad.

No hace falta seguir cambiando G1 para repartir sus puntajes. Si después se propone otra
versión, se resolverán la aplicabilidad, los casos sin base y la definición de conjuntos;
las reglas se registrarán antes de evaluar y esta evidencia se conservará. La validación
experta y el consenso permanecen pendientes; el panel humano depende de aprobación ética.

## Cómo comprobarlo

```bash
node --test scripts/g1-closure.test.js
node scripts/g1-closure.js verificar
```

El segundo comando reproduce el piloto en una carpeta temporal, compara los datos y el
CSV y verifica las fuentes, los resultados sellados y los diez sellos anteriores.
No solicita respuestas ni escribe sobre capturas, mediciones o pilotos históricos.
Los cambios se guardan en un commit local; este cierre no se publica en GitHub.
