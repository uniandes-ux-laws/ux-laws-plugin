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
