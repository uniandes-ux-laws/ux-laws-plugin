# G5: criterios antes de probar los ejemplos

19 de octubre de 2026. Esta preparación se hace después del piloto general. Sabemos que allí Q fue falso en las 120 respuestas. Buscamos cubrir esa parte pendiente; no usamos estos ejemplos para cambiar el resultado anterior.

## Qué vamos a preparar

Diez pantallas locales hechas por nosotros: siete muestran un proceso, incluidas dos de límite, y tres sirven para revisar que no se confunda cualquier navegación con progreso. Son ejemplos sintéticos, no páginas tomadas del corpus, casos dorados ni evaluaciones de expertos.

Cada pantalla debe funcionar sin internet, sin datos personales ni transacciones. Usamos 1440 × 900, sin desplazarnos por la página. Guardamos screenshot, wireframe, nodos y medidas en una carpeta aparte. Usamos la medición actual 1.0.6 y el generador actual de wireframes con X; no sustituimos las imágenes de septiembre usadas en el piloto general con medición 1.0.5.

## Cómo se revisarán

- Q exige una señal de que el usuario está en un proceso. Los puntos de un carrusel, una ruta de catálogo y un botón genérico Enviar no bastan.
- G_existe indica si hay un indicador. G_nombra indica si nombra las etapas o declara cuántas son. G_actual exige ubicar el paso actual.
- G_forma exige distinguir completado de pendiente mediante forma, borde o relleno que sobreviva al wireframe. En el ejemplo que solo cambia de color debe quedar falso, con evidencia insuficiente, según la rúbrica actual.
- steps_declared solo contiene un total escrito explícitamente. No se cuentan etiquetas para completar ese campo. P04 y P05 permiten revisar esta diferencia.
- J_inicio y J_final se revisan en el wireframe, usando la lista recibida. No se usa el color o el texto de la captura para decidir su jerarquía. Los casos de progreso completos dejan el último elemento igual que otra etapa pendiente: no se espera nivel 4.
- Se registra la consulta del screenshot para Q, G_nombra, G_actual y G_forma. Es una lectura combinada de canales, no una comparación pura entre screenshot y wireframe.
- Se conservan las cifras, los ids y las cajas entregadas por el código. Recorte, superposición o pertenencia incierta se declaran; no se reparan dentro de la respuesta.

Aplicamos los niveles actuales: 0 si el proceso no tiene indicador; 1 si el indicador no nombra ni ubica; 2 si nombra y ubica, pero depende del color; 3 si cumple los cuatro criterios de progreso. El 4 requiere además el final diferenciado de la lista principal, sin competir con el inicio. Esta serie no prepara un positivo de nivel 4; no cambia ese requisito.

P06 queda **sin puntuar**: la rúbrica no dice expresamente qué nivel asignar cuando nombra las etapas pero no marca la actual. Hay que acordarlo con Camilo y registrarlo antes de evaluar ese caso. P10 sirve para revisar un recorte y no se incluirá en la exactitud de niveles. Su marca de evidencia insuficiente sí se puede revisar. Un null en las expectativas significa que ese campo no se fija como respuesta correcta; no es una abstención ya recibida.

## Antes de enviar cualquier evaluación

Los valores de casos.json son expectativas de diseño propuestas por nosotros, no respuestas del modelo ni una referencia experta. La comprobación técnica revisa archivos, geometría y preparación; no calcula acuerdo con esos valores.

Primero se guardan estos criterios, los casos y sus hashes. Después se generan las capturas. Si una pantalla no cumple su diseño, se conserva el intento y se abre otra versión antes de evaluarla. No se cambian expectativas para que coincidan con una respuesta.

La futura evaluación debe tener su propio registro de modelo, versión de CLI, esfuerzo, repeticiones, esquema, prompts, archivos y hashes. Este paquete no ejecuta solicitudes al modelo. El ejecutor del piloto general exige las 24 páginas de calibración: no debe usarse con estos casos cambiando a escondidas su contrato.

Al evaluar, las expectativas y esta explicación no se entregan al modelo. Solo recibe la rúbrica, la escala, sus medidas y las imágenes de cada caso. Se guardan todas las respuestas, incluidas las inválidas y las abstenciones. Se reportan los ejemplos de prueba aparte del piloto general y de cualquier validación experta.

## Cuándo queda lista esta preparación

Los diez casos están registrados, capturados y verificables; las listas completas previstas llegan a la medición y P10 conserva su recorte. Hay una galería para revisarlos con Camilo. Esto deja preparada la prueba de progreso, pero no demuestra que la skill ya la haya superado ni que G5 esté validado.
