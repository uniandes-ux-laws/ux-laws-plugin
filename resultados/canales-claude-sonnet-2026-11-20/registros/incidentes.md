# Incidentes

## 2026-11-20 · L02 no se pudo cerrar
- `recoger --conservar-invalidas` falló (rc=1): `g7-screenshot-r1: JSON ilegible — Unexpected non-whitespace character after JSON at position 4599`. Registro íntegro del intento: `registros/recoger-L02.log`.
- El orquestador trata un JSON ilegible como problema de archivo que impide el cierre, no como respuesta «inválida» conservable; no escribe perfil. Esa respuesta se conserva sin cambios en `L02/resultados/g7-screenshot-r1.json` y en la carpeta de entrada del subagente.
- Las cinco posiciones de L02 están respondidas y registradas en el libro (aislamiento); falta solo el cierre. L02 queda «en_ejecucion», reanudable. Se declara la interrupción para poder seguir con H03 (plan: no iniciar otra página salvo declaración).
- No se repite la solicitud ni se corrige la respuesta ni se modifica el orquestador. Decisión sobre si cambiarlo mínimamente y con prueba para contar este caso como «inválida»: se pospone al final de la corrida, para no decidirla página a página.
- Fallo del propio script de cierre de esta sesión: siguió tras `rc=1`; se corrige para que se detenga.
