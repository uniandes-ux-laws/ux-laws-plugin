# Fuentes anteriores de G3 y G6

Copia local del 5 de noviembre de 2026, previa a la integración en 0.2.2.
Los archivos se conservan tal como estaban, incluso sus referencias a una propuesta
pendiente. Esas referencias describen el estado de su momento.

El manifiesto registra sus huellas y los registros de pilotos con los que se contrastaron.
No ejecutar evaluaciones desde esta carpeta ni editar sus copias. Los datos originales
siguen en sus carpetas de pilotos y verificaciones.

La comprobación actual se hace desde el repositorio con
`node scripts/verificar-fuentes-historicas.js`.

Las copias terminan en `.fuente` para separarlas del código activo y evitar que
las pruebas automáticas actuales ejecuten las antiguas. Sus bytes son los originales.
El verificador reconstruye sus nombres originales solo en una carpeta temporal.
