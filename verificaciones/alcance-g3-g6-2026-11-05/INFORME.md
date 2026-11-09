# Revisión propuesta de G3 y G6

5 de noviembre de 2026. Trabajo local para revisión de Juan y, después, de Camilo.

Preparamos una solución acotada y la probamos con dos evaluaciones reales nuevas en
Codex. Las dos respuestas cumplieron el formato y fueron coherentes con las reglas
para los propios juicios declarados por el modelo. Esto no confirma que esos juicios
sean los mismos que emitirían los expertos.

## Qué cambió

**G3:** la propuesta asigna nivel 2 al caso de seis a ocho unidades con encabezados,
sin mezcla, sin datos requeridos fuera de vista y sin contenido ajeno. El inventario
y las unidades deben estar completos. Se conservan los cortes anteriores y la prioridad
de los problemas más graves. Las demás combinaciones sin regla siguen como abstención.

**G6:** se conserva el catálogo y el puntaje global cuando se puede determinar. Se añade
un diagnóstico separado de lo cumplido, incumplido, no aplicable e indeterminado. No
convertimos las convenciones desconocidas en cumplimiento ni damos un puntaje al subconjunto.

Las [reglas propuestas](../../docs/PROPUESTA-ALCANCE-G3-G6-05NOV.md) se guardaron antes
de estas evaluaciones. No son un acuerdo con Camilo ni una validación experta.

## Qué respondió el modelo

| Grupo | Respuesta nueva | Qué comprobamos |
|---|---|---|
| G3 | **Nivel 2**, con seis unidades y trigger U. | El modelo eligió la región de las seis tarjetas y aplicó la regla añadida. La revisión de sus propios juicios no encontró discrepancias. |
| G6 | **Abstención global.** | El diagnóstico separó una convención evaluada, dos no aplicables y cinco indeterminadas. La abstención coincide con esas dudas. |

En G6, el modelo consideró cumplida la posición de la navegación. Identificó K5 y K6
como no aplicables, y dejó K1, K2, K3, K7 y K8 indeterminadas, con sus razones. No
confirmó incumplimientos. Esto no demuestra que el sitio cumpla todo el catálogo.

La aplicabilidad de K3 varió respecto de la prueba funcional anterior: aquí quedó
indeterminada y antes figuró como no aplicable. Conservamos ambas respuestas. Que el
resultado global se repita no demuestra estabilidad de los juicios intermedios.

## Cómo se hizo

Fueron dos posiciones, una por grupo, con `gpt-6.1-sol`, esfuerzo bajo y Codex CLI
0.164.0-alpha.11.1, en sesiones nuevas y distintas de las siete anteriores. Se usó
otra vez la pantalla sintética `portal.html`, con wireframe primero y screenshot
como apoyo textual declarado. Los originales y registros están en esta carpeta.
No se repitieron ni corrigieron respuestas.

Antes pasaron **297 pruebas del código**. Los casos sintéticos comprobaron los límites
de la regla y que los diagnósticos no alteraran los puntajes. La prueba de integración
usó copias temporales identificadas como `synthetic-test`; no se cuentan como respuestas
reales ni como un piloto nuevo.

El preparador tardó más que la primera espera y se intentaron dos comandos dependientes
antes de que acabara. Detectaron archivos todavía ausentes; no iniciaron evaluaciones.
Se esperó el cierre y se verificaron las entradas antes de enviar las dos solicitudes.
El detalle se conserva en [la incidencia de preparación](INCIDENCIA-PREPARACION.json).

El validador genérico de skills rechazó el campo `compatibility`, que ya existe en la
versión publicada. Se comprobó que el encabezado no cambió y que el mismo rechazo ocurre
con esa versión anterior. No se quitaron metadatos para ocultar el aviso.

## Cómo queda disponible

La propuesta se activa únicamente al preparar una corrida nueva con
`--revision-g3-g6 propuesta-2026-11-05`. El libro y el perfil identifican la revisión;
G6 incorpora su diagnóstico y G3 la revisión de coherencia de sus reglas. Sin esa opción
se mantienen las instrucciones anteriores.

La versión 0.2.1 y sus archivos comprobados se conservaron. Esta revisión no está aún
incorporada a un ZIP nuevo ni publicada en GitHub. Los pilotos de octubre, sus fuentes
y sus entradas siguen intactos; también los 5.159 archivos históricos y diez sellos
comprobados. No se usaron reinicios gratuitos ni se compraron créditos.

## Qué falta para aceptarla como cierre

Juan debe revisar esta propuesta y el equipo debe contrastar el criterio con Camilo.
La comprobación real cubrió un solo ejemplo por grupo. Si se acepta una fase más amplia,
sus casos y criterios se registran antes de ejecutarla, sin reemplazar estos originales.
Después se prepara una nueva entrega que identifique la revisión aceptada.

**G6 sigue sin garantizar un puntaje global sobre cualquier captura.** El cierre propuesto
acepta ese límite y entrega el diagnóstico de lo observable. Si se exige un nivel global
en todas las páginas, habrá que acordar otro alcance o más evidencia. Eso sigue siendo
una decisión metodológica pendiente, no un fallo que se arregle forzando un número.

## Archivos de la comprobación

- [Resultados y diagnóstico de G6](RESULTADOS.json).
- [Comprobación resumida](COMPROBACION.json) y [registro previo](REGISTRO-PREVIO.json).
- [Original de G3](respuestas/g3-r1.json) y [original de G6](respuestas/g6-r1.json).
- [Pruebas del código](PRUEBAS-CODIGO.log), [uso](USO.json) y [preservación](PRESERVACION.json).
- `SHA256SUMS` permite comprobar los archivos desde esta carpeta con `shasum -a 256 -c SHA256SUMS`.

La carpeta queda cerrada como evidencia. No se vuelve a ejecutar `cerrar` sobre ella,
porque regenerar los derivados cambiaría sus huellas.
