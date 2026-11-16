# Comprobar una entrega

Revisión del 16 de noviembre de 2026. Entrega local 0.2.3.

- Comprobar que las siete skills y el documento generado coincidan.
- Confirmar G3 0.2.0 y el diagnóstico de G6 en la ejecución por defecto.
- Revisar que cada resultado tenga el modelo, entorno, repetición, imágenes y prompt correctos.
- Conservar NA, abstención, puntaje e inválidas como estados separados.
- Generar Word y PDF desde las fuentes, renderizarlos y revisar sus páginas.
- Preparar un ZIP nuevo y comprobar los archivos contra `entrega.json`.
- Instalar ese ZIP en una carpeta limpia y ejecutar las comprobaciones del paquete.
- Probar referencia y comparación: 35 y 65 solicitudes con cinco repeticiones.
- Comprobar el cierre y el informe legible de los siete grupos, incluidos los límites de G1 y G6.
- Verificar los datos anteriores, los sellos y las fuentes archivadas sin regenerar sus resultados.
- Revisar las advertencias de captura y las dependencias de la entrega.
- Separar las pruebas sintéticas y las evaluaciones reales. Una preparación no demuestra respuestas del modelo.
- Registrar qué entornos se probaron realmente y los pendientes de instalación o evaluación.
- Mantener la versión exacta de las instrucciones entregadas a expertos antes de comparar resultados.
- Dejar los cambios locales hasta que Juan revise y autorice publicar.

La publicación posterior debe registrar tag, commit y huella del ZIP. No inventar un tag
ni convertir `main` en la referencia fija de la tesis. El protocolo base y los resultados
históricos conservan sus versiones; los cambios posteriores quedan identificados aparte.
