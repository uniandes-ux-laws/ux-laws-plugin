# G4: registro previo de la fase dirigida

20 de octubre de 2026. Juan autorizó proponer los criterios al confirmar que todavía no
hay acuerdo con Camilo. Las decisiones están en DECISIONES-G4-20OCT.md. No se presenta esta
fase como acuerdo del asesor, validación experta ni repetición completa de calibración.

## Qué se evaluará

Se fijan **85 posiciones**, cinco conversaciones por pantalla:

- Nueve páginas reales: C06, C07, C09, C13, C17, C20, C25, R02 y R03. Se seleccionaron por
  variación de conjunto, puntaje, abstención o P indeterminado en el piloto anterior. Se
  conservan screenshots y nodos históricos. No tienen un puntaje correcto fijado: se
  describen sus cinco respuestas, selección, canales, advertencias y diferencias con la
  fase anterior. Las notas e ids preferidos de nuestra revisión no se entregan al modelo.
- Ocho ejemplos sintéticos nuevos: S01 sin foco (1), S02 dos aislados con jerarquía (2),
  S03 foco pertinente con contenido sustantivo tratado como auxiliar (2), S04 tres aislados
  (1), S05 tarea presentada como banner y sin foco (0), S06 foco no pertinente (2), S07 foco
  pertinente por color (3), S08 foco pertinente por varios canales (4). Cada pantalla tiene
  nueve opciones; el grupo LI es el principal propuesto. Las expectativas son de diseño,
  no una referencia experta ni una afirmación de atención o recuerdo del usuario.

Los diseños y expectativas se registran antes de capturar. Si la comprobación técnica
falla, se conserva esa preparación y se documenta otra versión antes de evaluar; no se
cambian ejemplos después de leer respuestas para mejorar la coincidencia.

## Configuración fija

Modelo gpt-6.1-sol, Codex CLI 0.162.0-alpha.17.2, esfuerzo low, concurrencia uno, cinco
repeticiones por página, screenshot como único canal, viewport 1440 × 900. Temperatura y
top-p no están expuestos. Cada posición tiene conversación nueva, sin herramientas,
web, documentos del proyecto, respuestas previas ni expectativas. El contexto base y
el prompt por página se guardan completos; no se incluye la repetición en el prompt.

Se usa contrato G4 0.2.0 y proyección G4 1.0.7 sobre la fuente de medición 1.0.6. Solo se
corrige la marca parcial mediante bordes y se retiran clases de candidatos a banner. Los
ids, las cajas, los rasgos y las cantidades se conservan. No se cambian capturas, corpus,
casos dorados, instrumento de otros grupos ni datos de las fases anteriores. En esta
fase cambian reglas, selección, metadatos y CLI; no se atribuye su efecto a un solo cambio.

## Qué se conservará y cómo se leerá

Se guardan originales, copias con atribución, trazas, sesiones, comandos, consumo y hashes.
El ejecutor y sus dependencias se fijan por hash. El manifiesto, los prompts y las entradas
se guardan en Git antes de pedir respuestas. Se ejecuta en lotes de uno a tres, revisando
el uso entre lotes y dejando margen al 94 %. Se conservan los reinicios gratuitos y no se
compran créditos. Un error técnico o un intento sin cerrar detiene nuevas solicitudes.

No se repite ni sustituye una respuesta por ser inválida, abstenerse o discrepar. Las
inválidas y los errores permanecen en los denominadores previstos. No se alteran umbrales
ni reglas para repartir mejor los niveles. Las expectativas nunca se entregan al evaluador.

En las 40 posiciones sintéticas se compara exactamente nivel/NA/abstención y, por separado,
I_principal, P, Bn, Cn y trigger. Los casos reales se describen sin una expectativa de nivel.
Se reportan por página las cinco respuestas, modas y empates, rango ordinal, variación de
conjunto y trigger, abstenciones, NA, inválidas y evidencia insuficiente. No se promedian
niveles ni se mezclan las 85 posiciones con las 120 anteriores. No se fija un umbral nuevo
para declarar aprobado G4. La estabilidad del trigger se interpreta como parte del contrato.

Se revisan las explicaciones y se guardan aparte las observaciones posteriores, sin
reescribir respuestas ni fingir que eran criterios previos. Una respuesta válida en formato
no garantiza que su interpretación visual sea correcta. Los ejemplos sintéticos tampoco
sustituyen validación experta. Si cambia una regla tras discutirla con Camilo, será otra
versión registrada antes de evaluar. Ética y consenso siguen pendientes.

Al terminar se generan CSV, resúmenes, informe en español y sello de integridad. Los
originales anteriores y la sesión técnica fallida permanecen intactos. Los cambios se
guardan en commits locales. Publicar a GitHub requiere autorización aplicable.
