# Cierre del plugin: entrega 0.2.3

16 de noviembre de 2026. Es la versión con la que se cierra el código del trabajo de grado.
Está preparada y comprobada en local. **Falta la revisión de Juan** para hacer push, crear el
tag y publicar el ZIP (CLAUDE.md §2).

## Qué cambia frente a 0.2.2

Las siete rúbricas, el alcance de G3/G6 (`alcance-2026-11-05`), los contratos y los esquemas
no cambian. El documento de reglas solo cambia en su línea de versión y edición.

| Cambio | Commit | Por qué |
|---|---|---|
| Medir de nuevo en memoria una captura con medición de otra versión | `68565ab` | Las capturas selladas traen la medición 1.0.0 y `preparar` fallaba en las 30 páginas (M4). La captura no se toca. |
| `recoger --conservar-invalidas` | `4ca8118` | Una respuesta que no cumple el esquema o el contrato queda como `invalida`, contada aparte, sin detener el cierre. Los errores de integridad (prompt, modelo, aislamiento) siguen deteniéndolo. |
| `preparar` se niega con `sanity_ok=false` salvo `--aceptar-sanidad-fallida` | `2bb0f6c` | La aceptación queda escrita en `invocaciones.json`. |
| Resumen en lenguaje claro (`resumen.md`) al cerrar | `3491444`, `c6a7f81` | Generado desde el perfil y `shared/lenguaje-claro.json`; no lo redacta un modelo. |
| El autotest del paquete acepta la sanidad marcada de su página local | `5b32879` | Con el cambio anterior, `npm test` fallaba dentro del paquete instalado. Se encontró al instalar el ZIP. |
| El preparador comprime también en Windows | `ff9b6d7` | Usa el `tar` de Windows cuando no hay `/usr/bin/zip`. |

Los scripts del panel (`panel-consolidado.js`, `comparar-panel.js`) son del estudio y no van
en el paquete: dependen de las calificaciones, que no se versionan.

## El paquete

| | |
|---|---|
| Archivo | `dist/ux-laws-0.2.3.zip` (fuera de git) |
| SHA-256 | `6bc24a92c998903194e78e853e2f7e5fe7f9dcc8f97c2a2e0307038fdd005301` |
| Commit base | `5b32879` (en `entrega.json`; es el commit del que salió el ZIP) |
| Archivos | 96, con sus huellas en `entrega.json` |
| PDF de reglas | 44 páginas, SHA-256 `0ce3c69b…`. **Se exportó con Microsoft Word 16 en Windows**, no con LibreOffice: este equipo no tiene LibreOffice. El Word y el Markdown salen del generador de siempre. El PDF no se revisó página por página aquí, porque no había cómo renderizarlo. |

El ZIP se armó desde un clon limpio con `core.autocrlf=false`, no desde la copia de trabajo de
Windows. En una copia con CRLF, una prueba de `entrega.test.js` falla porque cambia la huella
de `package-lock.json`. No es un defecto del código.

## Qué se comprobó (16 nov., Windows 11, Node, Chromium de Playwright)

En el clon limpio del commit `5b32879`:

- `node --test`: 335 de 335.
- `seal:verify`, `seal:calibracion:verify`, `seal:dorados:verify`, `validate` (71/71) y `dorados:selftest`.
- `g1-closure.js verificar`, `verificar-fuentes-historicas.js`, `verify-g3-g6-closure.py` (240 sesiones, 4.111 archivos, 8 sellos), `verificar-integracion-real.js --solo-sello` y `verificar-reglas.js`.

Con el ZIP descomprimido en una carpeta vacía:

- `npm ci`, `npm run verify`, `npm test` (captura local, medición y preparación de 35 y 65 solicitudes, sin modelos) y `npm run link`.

No se comprobó aquí: el validador de manifiestos de Claude (no hay `claude` en el PATH de este
equipo), ni respuestas nuevas de un modelo con el paquete 0.2.3. Las respuestas del corpus se
obtuvieron con el código del repositorio en `141b96c`, que tiene los mismos cambios de cierre.

## Para publicar, cuando Juan lo autorice

```bash
git push origin main
git tag -a v0.2.3 5b32879 -m "Entrega 0.2.3"     # o el commit que Juan apruebe
git push origin v0.2.3
```

Y adjuntar `dist/ux-laws-0.2.3.zip` con su `.sha256` a la Release. La tesis cita el tag con su
hash, nunca `main` (CLAUDE.md §9). Si se regenera el ZIP en otra máquina, su huella cambia y hay
que citar la nueva.

## Lo que este cierre no cambia

- Una repetición y un runtime en el corpus. No hay segundo runtime, dispersión ni comparación entre canales.
- G1 sigue no interpretable v1. G3 y G6 conservan sus abstenciones.
- No hay validación experta de las rúbricas más allá de la comparación con el panel, que dio κ_BP −0,14 / −0,05 (`resultados/corpus-claude-code-2026-11-13/INFORME.md`).
- `verify-g5-closure.js` y `verificar-integracion-real.js --verify-seal` siguen sin pasar desde un clon (nota del 12 nov. en CLAUDE.md §8).
