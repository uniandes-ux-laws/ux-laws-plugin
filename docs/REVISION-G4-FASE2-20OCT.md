# G4: revisión después de las 85 evaluaciones

20 de octubre de 2026. Estas notas se escribieron después de evaluar. No son criterios
previos, calificaciones expertas ni acuerdos con Camilo. No se corrigió ni repitió ninguna
respuesta. El [informe](../pilotos/g4-cierre-2026-10-20/INFORME.md) conserva las cifras completas.

## Ejemplos separados

Los ocho ejemplos tuvieron cinco respuestas cada uno. Hubo **35/40 coincidencias de nivel**.
Las tres reglas propuestas tuvieron el nivel previsto en sus cinco repeticiones: sin foco,
dos destacados con jerarquía y foco pertinente con contenido importante presentado como auxiliar.
También coincidieron los casos de tres destacados, banner funcional, foco equivocado y
aislamiento por color y borde.

En los 40 ejemplos coincidieron los campos previstos de aislados, pertinencia, banner,
contenido auxiliar y conjunto principal. En el caso de dos destacados también coincidió la
jerarquía. Estos son resultados contra nuestro diseño, no contra expertos.

**S07 fue el desacuerdo:** esperábamos nivel 3 por color solamente, pero las cinco respuestas
dieron 4. Todas atribuyeron al texto un peso mayor y contaron color y peso como dos canales.
No cambiamos la expectativa para hacerla coincidir con el modelo.

Después comprobamos los estilos de los HTML congelados de S02, S03, S07 y S08, sin volver a
capturar ni modificar los ejemplos. Los títulos, párrafos y botones de todas sus tarjetas
usan peso **400**. La [comprobación](../revisiones/g4-cierre-2026-10-20/tipografia.json)
guarda los archivos consultados y sus hashes. No se entregó al evaluador.

Encontramos **11 respuestas que cuentan una diferencia de peso tipográfico**: las cinco de S03,
las cinco de S07 y S08-r1. S02-r4 también lo menciona en su explicación, aunque no lo cuenta
como canal. Esa diferencia no está respaldada por los estilos del diseño. En S03 el nivel
depende del contenido auxiliar y en S08 también hay un borde doble; por eso esas respuestas
coinciden en nivel aunque su explicación incluya un rasgo adicional. **Repetir el nivel
esperado no asegura que toda la explicación sea correcta.**

## Páginas reales

No les fijamos un puntaje correcto. De sus 45 respuestas, **12 dieron puntaje y 33 se
abstuvieron**. Hubo 42 marcas de evidencia insuficiente, incluidas las abstenciones.
No se detectaron banners funcionales ni contenido sustantivo tratado como auxiliar en estas
nueve páginas. Las capturas siguen teniendo límites de cajas, recortes y superposiciones.

| Caso | Qué pasó en las cinco respuestas |
|---|---|
| C06 y R03, Mercado Libre | Cinco abstenciones en cada caso. Identifican un destacado, pero la fila no declara una prioridad que permita resolver si corresponde destacarlo. También señalan cajas incoherentes y recorte. |
| C07, Alkosto | 2, 4, 4, 2, 2. Siempre eligen las mismas cuatro promociones; cambia si el televisor cuenta como segundo destacado junto al iPhone. El nivel más frecuente es 2 y el rango es de dos niveles. |
| C09, Panamericana | Abstención, 1, abstención, abstención, abstención. Una respuesta puntúa las categorías con advertencias; las otras cuatro consideran que sus cajas superpuestas impiden una selección fiable. |
| C13, Linear | Cinco abstenciones. Reconocen pares de navegación y acceso, pero no los usan para sustituir el contenido principal del producto. |
| C17, El Espectador | Cinco abstenciones. La publicidad superpuesta impide comparar las tarjetas de noticias. Publicidad real no se cuenta como tarea camuflada en un banner. |
| C20, La República | Abstención, abstención, 1, abstención, abstención. La tercera puntúa la fila de noticias con advertencias; las otras cuatro rechazan la selección por recorte y una caja incoherente. |
| C25, UTP | Cinco abstenciones. El contenido central no tiene pares medidos adecuados; la navegación auxiliar no se usa para sustituirlo. |
| R02, Canadá | Cinco niveles 1 y la misma regla. Tres eligen «Most requested» completo; dos eligen el directorio temático recortado y advierten evidencia insuficiente. El nivel es estable, la selección no. |

Solo C07 y R02 tienen cinco puntajes. Ninguna mantuvo a la vez el nivel y el conjunto principal.
Las otras siete no se cuentan como páginas con nivel estable. Una única respuesta numérica
en C09 o C20 no basta para declararlo.

En las mismas 45 posiciones anteriores había 16 puntajes y 29 abstenciones. Cambiaron de
nivel o estado 26 posiciones; 25 cambiaron de selección o pasaron a no elegir principal.
No atribuimos estas diferencias a una sola causa: cambiaron reglas, selección, metadatos y
versión de CLI. Las conversaciones son independientes y las fases no se suman como una muestra.

## Qué debemos revisar con Camilo

- Confirmar o modificar las tres reglas propuestas. Todavía no son acuerdos del asesor.
- Definir el alcance cuando el contenido principal no tiene pares adecuados: si debemos
  abstenernos o permitir evaluar una sección de navegación nombrándola expresamente.
- Aclarar cuándo las cajas incompletas permiten puntuar con una advertencia y cuándo obligan
  a abstenerse. C09 y C20 muestran que esa decisión todavía varía.
- Revisar la separación entre color y peso con S07. Que el error se repita cinco veces no
  lo convierte en un acierto.

La fase está terminada y sus archivos están comprobados. Falta revisar estas decisiones,
comparar con expertos y completar el consenso. El panel humano depende de la aprobación ética.
Si cambia un criterio, habrá que registrar otra versión antes de pedir nuevas evaluaciones.
