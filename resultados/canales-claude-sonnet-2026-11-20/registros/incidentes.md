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
