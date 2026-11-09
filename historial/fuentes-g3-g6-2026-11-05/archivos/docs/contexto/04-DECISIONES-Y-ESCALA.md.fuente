# Decisiones de implementación y escala

Estado al 10 de septiembre de 2026. Fuente única: `shared/escala.md` y `shared/decisiones.md`
del repositorio del plugin.

---

# La escala ordinal común 0–4

Los siete grupos de constructo puntúan en la misma escala. Es deliberadamente gruesa: un
rango numérico más fino sugiere una precisión que el juicio no tiene, fuerza
discriminaciones que ningún evaluador puede definir, y baja el acuerdo sin subir la
resolución.

| Nivel | Significado transversal |
|---|---|
| **0** | La propiedad que el grupo mide está ausente o contradicha. La pantalla falla en el constructo. |
| **1** | La propiedad existe pero falla de forma generalizada. |
| **2** | La propiedad se cumple con excepciones aisladas. |
| **3** | La propiedad se cumple en todo lo observable. Es el nivel de una interfaz bien hecha. |
| **4** | Nivel 3, y además la pantalla hace algo activo por encima del cumplimiento. No es "muy bueno": es una condición adicional nombrada en cada rúbrica. |

**El nivel 4 no es un premio.** Cada rúbrica declara exactamente qué condición observable
lo separa del 3. Si esa condición no está presente, el puntaje es 3, por bien resuelta que
esté la pantalla.

**Los puntajes no se promedian entre grupos.** El resultado primario es el perfil de los
siete. Un total con ponderación uniforme haría que G7, que subsume una sola ley, pesara lo
mismo que G1, que subsume cuatro; si se reporta un total, esa limitación se declara.

**Los puntajes son ordinales, no de intervalo.** La distancia entre 0 y 1 no es la misma
que entre 3 y 4. Por eso el coeficiente de acuerdo se aplica con pesos cuadráticos, que
tratan un desacuerdo de un nivel como menos grave que uno de tres.
# Decisiones de implementación congeladas

Fijadas antes de escribir las rúbricas, para que las siete se escriban contra las mismas
reglas. Cambiar cualquiera después del congelamiento del protocolo rompe el pre-registro.

**1. Los evaluadores humanos puntúan la página renderizada, nunca el wireframe.** El
ground truth tiene que ser juicio experto sobre la interfaz y no sobre un artefacto
intermedio del proyecto. Consecuencia: la concordancia se mide comparando el sistema sobre
screenshot contra los humanos, y la representación se mide comparando el sistema sobre
wireframe contra el sistema sobre screenshot. Los dos términos quedan separados sin trabajo
humano adicional.

**2. Viewport fijo de 1440 × 900 px, y se captura solo lo visible sin scroll.** Es lo que
la propuesta llama "una sola pantalla capturada". Capturar la página completa haría
incomparables una página larga y una corta, y dejaría n1 indefinido. Costo declarado: el
contenido bajo el pliegue no se evalúa.

**3. Cinco repeticiones por configuración.** La grilla queda en 30 páginas × 6 grupos ×
2 canales × 2 runtimes × 5, más 30 × 1 grupo × 2 runtimes × 5 para G4: 3.900 invocaciones.

**4. La salida de cada grupo lleva un campo `trigger`** que nombra la condición observable
que fijó el nivel. Aplica a los siete y no solo a G3. Un puntaje sin la condición detrás no
es auditable ni diagnosticable.

**5. `not_applicable` solo con una condición objetiva declarada por adelantado en cada
rúbrica.** Un caso marcado N/A por ambas partes se excluye del grupo y se reporta cuántos
se excluyeron. Si una parte marca N/A y la otra puntúa, cuenta como desacuerdo máximo, para
que la exclusión no pueda inflar el acuerdo.

**6. El instrumento puntúa propiedades independientes de la tarea del usuario, y se
declara.** Los criterios están redactados sin suponer una tarea: la acción dominante de G2
se determina por peso visual y tamaño relativo; G5 puntúa si hay jerarquía de orden marcada
y no cuál ítem es más importante; G3 puntúa co-visibilidad de un dato con el campo que lo
requiere. Declarar una tarea por página sería otro estudio.

**7. Las recomendaciones se emiten y no se miden en la v1.** Las rúbricas las exigen cuando
el puntaje es 2 o menor y el sistema las produce, pero ningún objetivo verifica si son
accionables. Salen como salida declarada no validada.

**8. El catálogo de convenciones de Jakob queda cerrado en ocho patrones y fechado.** Está
en la rúbrica de G6. Sin catálogo cerrado el criterio es una opinión.
