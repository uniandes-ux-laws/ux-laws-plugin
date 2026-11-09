# G3 y G6: registro previo de los pilotos

20 de octubre de 2026. Juan autorizó revisar las mediciones, ejecutar los pilotos completos
y continuar automáticamente después de renovar el uso si hace falta. Se conservan los
reinicios gratuitos y no se compran créditos. Este registro se guarda antes de evaluar.

## Muestra y configuración

Son las **24 capturas de calibración**, cinco repeticiones por página y grupo: **120 de G3
y 120 de G6**. No se añaden capturas, páginas del corpus ni casos dorados. Las imágenes,
nodos y mediciones anteriores se conservan; las entradas nuevas se guardan aparte.

Se fija gpt-6.1-sol, Codex CLI **0.162.0-alpha.17.2**, esfuerzo **low**, una solicitud a la vez,
viewport **1440 × 900**, evidencia **1.1.0** sobre fuente **1.0.6**, contratos **0.1.0** y
catálogo de G6 **v1, 10 de septiembre de 2026**. Temperatura y top-p no están expuestos.
Orden: por repetición y página, alternando G3 y G6. Las cinco repeticiones de una página
reciben exactamente el mismo prompt, sin índice de repetición ni respuestas anteriores.

Cada evaluación abre una conversación nueva, efímera, sin configuración personal,
instrucciones del proyecto, herramientas, web ni conectores. Se adjuntan wireframe primero
y screenshot después. El screenshot se usa para U/H/V/X en G3 y R/T/K_ap/K en G6. Se declara
la lectura incluso al concluir ausencia de problema. No es comparación limpia entre canales.
No se envían expectativas de nivel ni juicios humanos al evaluador.

## Instrumento y resultados incómodos

La [revisión previa](REVISION-MEDICIONES-G3-G6-20OCT.md) documenta las correcciones técnicas.
Las anclas y los cortes no se ajustan para obtener una distribución mejor. Las aclaraciones
son propuestas operativas, no acuerdos atribuidos a Camilo.

Se conservan las combinaciones sin ancla como abstención, con razón y evidencia insuficiente.
Una región ausente no demuestra NA en G3; la aplicabilidad desconocida no demuestra NA en G6.
Las listas medidas son candidatos, no funciones certificadas. El modelo selecciona ids y el
código verifica que los conteos correspondan a esa selección. No se reconstruyen cajas.

La conformidad de datos se verifica separada de la aplicación de anclas. Una respuesta
conforme que aplica mal su propia ancla queda señalada en una auditoría; no se corrige ni se
convierte automáticamente en otro nivel. Ninguna de esas auditorías es referencia experta.
Un resultado inválido permanece como inválido. No se repite ni sustituye por abstención,
desacuerdo, nivel poco frecuente ni falta de nivel alto.

## Evidencia y ejecución

Antes de solicitar respuestas se guardan en Git rúbricas, contratos, esquemas, manifiestos,
prompts, entradas y hashes del ejecutor y sus dependencias. Después solo pueden mejorarse
verificadores, informes y resúmenes derivados. Si hace falta cambiar el instrumento, se
conserva esta fase y se registra otra versión; no se edita a mitad de las respuestas.

Se guardan JSON originales, copias con atribución, eventos, conversaciones, comandos, hashes
y consumo. Los datos de G3 y G6 permanecen separados. Se trabaja en lotes de una a tres,
revisando uso entre lotes y dejando margen antes de llegar al 94%. Si no alcanza, se guarda
el punto y se programa este mismo chat para poco después del reinicio automático.
No se usan reinicios gratuitos ni se compran créditos. Un fallo técnico o intento sin cerrar
detiene solicitudes nuevas; se conserva y no se reintenta automáticamente.

## Análisis fijado

Se cuentan por separado puntajes 0–4, NA, abstenciones, inválidas y fallos técnicos. Por página
se muestran las cinco salidas, modas y empates, rango ordinal, cambios de trigger y cambios
de región en G3 o de convenciones aplicables en G6. No se promedian los niveles.
Se declara nivel estable solo con cinco puntajes numéricos. Las series mixtas y los cinco
NA o abstenciones quedan aparte, sin forzar estabilidad ordinal. Se informan advertencias
de evidencia insuficiente y desacuerdos con las anclas para sus propios juicios.

No se fija un umbral nuevo para aprobar los grupos. Se revisarán las explicaciones después,
sin corregirlas ni presentar esas notas como criterios previos. Los resultados se reportan
como pilotos del modelo, pendientes de referencia experta, consenso y revisión con Camilo.

Al terminar se generan CSV, resúmenes, informes en español y sellos, se verifican originales
y trazas, se actualiza el estado del proyecto y se guardan commits locales. No se publica en
GitHub sin autorización nueva aplicable. El seguimiento se desactiva al completar ambos
grupos. El panel humano depende de aprobación ética; no se fabrican calificaciones humanas.
