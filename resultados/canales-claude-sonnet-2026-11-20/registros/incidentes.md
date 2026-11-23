# Incidentes

## 2026-11-20 · L02 no se pudo cerrar
- `recoger --conservar-invalidas` falló (rc=1): `g7-screenshot-r1: JSON ilegible — Unexpected non-whitespace character after JSON at position 4599`. Registro íntegro del intento: `registros/recoger-L02.log`.
- El orquestador trata un JSON ilegible como problema de archivo que impide el cierre, no como respuesta «inválida» conservable; no escribe perfil. Esa respuesta se conserva sin cambios en `L02/resultados/g7-screenshot-r1.json` y en la carpeta de entrada del subagente.
- Las cinco posiciones de L02 están respondidas y registradas en el libro (aislamiento); falta solo el cierre. L02 queda «en_ejecucion», reanudable. Se declara la interrupción para poder seguir con H03 (plan: no iniciar otra página salvo declaración).
- No se repite la solicitud ni se corrige la respuesta ni se modifica el orquestador. Decisión sobre si cambiarlo mínimamente y con prueba para contar este caso como «inválida»: se pospone al final de la corrida, para no decidirla página a página.
- Fallo del propio script de cierre de esta sesión: siguió tras `rc=1`; se corrige para que se detenga.

## 2026-11-23 · Desviación fechada: se amplía el corte
- El encargo fijaba el corte el 21 de nov. de 2026 a las 8:00 a. m. (Bogotá). La sesión se reanudó el 23 de nov. de 2026 (17:18 según el reloj del sistema), con 5 páginas cerradas (H01, G01, L01, H02, G02), H03 con sus cinco respuestas obtenidas el 20 de nov. y L02 con el incidente anterior.
- David indicó por escrito en la sesión que se termine la muestra sin importar las fechas («No pasa nada, solo termina… no importa las fechas»). Se amplía el corte; las páginas ejecutadas después del 21 de nov. 8:00 se identifican por las fechas de `cronologia.jsonl`. No se cambia ninguna otra regla, ni el modelo, ni el aislamiento.
- El informe separa las páginas cerradas antes y después del corte original.

## Correccion de registro (G03)
- En `registros/aislamiento.jsonl`, la linea de G03 dice `sanidad_fallida_aceptada: "si"` por error de captura al escribirla. G03 no esta entre las cinco paginas con sanity_ok=false y su libro no usa `--aceptar-sanidad-fallida` (ver `G03/invocaciones.json`, campo `sanidad`). Vale el libro.

## 2026-11-23 · L03: respuesta de g2-screenshot sobrescrita por un script ajeno (colisión en la carpeta temporal compartida)
- Los subagentes escribieron sus respuestas con scripts temporales llamados `mk.js` en la carpeta temporal del sistema, que comparten todos. El subagente de L03 `g7-screenshot` reportó haber ejecutado por error un `mk.js` que no era suyo (contenía la respuesta G2/wireframe de L03). El script escribe `respuesta.json` en el directorio de trabajo y toma `run` de `solicitud.json` de ese directorio.
- Resultado: `L03/g2-screenshot-r1/respuesta.json` quedó con `group_id=g2`, `channel=wireframe`, `score=null` (contenido de otra posición) y fecha de modificación posterior al reporte de su subagente, que había informado puntaje 2. El original se perdió. No se reconstruye a partir del reporte ni de la transcripción.
- Copias de evidencia en `registros/L03-incidente/` (el script y el archivo contaminado).
- Comprobación de integridad (`group_id`/`channel` por posición y medidas copiadas frente a `entrada.json`) sobre las 45 respuestas existentes: alertas solo en L02 `g7-screenshot` (JSON ilegible, ver arriba) y L03 `g2-screenshot`. Las otras 43 coinciden. Límite: la comprobación no detecta un contenido propio de la misma posición pero de otra página con medidas idénticas; ningún otro subagente reportó ejecutar scripts ajenos.
- Medida: se borró el `mk.js` suelto, y desde esta posición los subagentes escriben `respuesta.json` directamente con la herramienta Write, sin scripts compartidos. Esto cambia el encargo del ejecutor, no el prompt ni la rúbrica.
- Desviación: la posición `L03/g2-screenshot` se reejecuta una vez con un subagente nuevo, porque el archivo se perdió por una falla de infraestructura, no por una respuesta inválida del modelo. Se usa la reejecución sea cual sea su resultado; el puntaje que informó el subagente original (2) no se usa. La reejecución cuenta como 1 solicitud adicional.
