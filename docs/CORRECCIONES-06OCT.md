# Correcciones de validación y separación de G5

Fecha: **6 de octubre de 2026**. Defectos reproducidos antes de corregirlos. Este registro acompaña las desviaciones de `docs/protocolo.md`, §9.

## Validación del resultado

En Node **20.20.2**, el patrón de `run.model_id` impedía compilar `shared/schemas/group-result.schema.json`: `SyntaxError: Invalid regular expression / Invalid group`. Afectaba tanto a `npm run validate` como al arranque de `scripts/orchestrate.js`.

Se reemplazó la exclusión con modificador local `(?i:...)` por una expresión compatible con ECMAScript que conserva los requisitos del identificador: dígito de versión, separador, caracteres permitidos, longitud mínima y ausencia de espacios. Los marcadores enumerados —incluidos sus equivalentes en mayúsculas— no contienen dígitos y ya quedan excluidos por el requisito de versión. También se rechazan saltos de línea finales, que el ancla `$` por sí sola puede admitir y que el control de modelo del orquestador ya rechaza.

Se amplió el selftest con los marcadores, formatos sintéticos válidos e inválidos y omisiones de campos obligatorios. Los identificadores sintéticos de prueba no constituyen una afirmación sobre la existencia de modelos ni una configuración de ejecución del estudio. No se cambiaron las anclas, las rúbricas ni el formato del resultado v0.2.0.

## Separación de los extremos en G5

La implementación usaba siempre el segundo elemento de la lista para medir la separación de cualquier extremo. La comparación `ord === cuerpo` nunca era verdadera: `cuerpo` se obtiene como una copia parcial de `ord`.

Reproducción horizontal, con cajas de tinta de 20 px de ancho:

| Posiciones x | Separación inicial correcta | Separación final correcta | Valor final anterior |
|---|---:|---:|---:|
| 0, 40, 80, 300 | 20 px | **200 px** | 240 px |
| 0, 40, 80, 120 | 20 px | **20 px** | 60 px |
| 0, 50, 200 | **30 px** | **130 px** | null en ambos extremos |

Ahora el primero se compara con el primer miembro del cuerpo y el último con el último miembro del cuerpo. La distancia sigue siendo de borde a borde sobre `ink`, no sobre `bounds`, y conserva la precisión de una décima de píxel. En una lista de tres elementos, el único miembro interior es vecino de ambos extremos.

La nueva capa de medición declara **1.0.1** en `schema_version`, que el orquestador transmite como `run.measurements_version`. No se edita la rúbrica G5 ni se mueve un umbral. La corrección puede modificar los juicios `J_inicio` y `J_final` de futuras evaluaciones, por lo que esas corridas deben distinguirse de las hechas con 1.0.0. El piloto histórico y las capturas selladas se conservan.

## Verificación reproducible

```bash
npm run validate
npm run test:g5
npm run measure -- captures/G01
npm run validate:measurements
npm run check:skills
npm run seal:verify
npm run seal:calibracion:verify
npm run seal:dorados:verify
```

`measure/g5-spacing.test.js` prueba la entrada/salida pública `medirCaptura` con archivos temporales de geometría sintética: extremos, equidistancia, tres elementos, orientación vertical, cajas de layout estiradas, contacto/solapamiento, precisión decimal y listas insuficientes. Las pruebas no sobrescriben datos del estudio. Antes de la corrección fallaban siete de los ocho casos.

Resultados comprobados en Node 20.20.2:

| Verificación | Resultado |
|---|---|
| Validación de resultados | **71/71**; acepta formatos válidos y rechaza los casos incompletos o mal formados probados |
| Separación G5 | **8/8**, incluidos los tres ejemplos de la tabla |
| Validación de mediciones | **10/10** sobre la medición derivada de G01 regenerada con 1.0.1 |
| Campos citados por las skills | **7/7** consistentes con la capa de medición |
| Sellos de datos | Corpus: **30 páginas / 120 archivos**; calibración: **24 / 96**; dorados: **10 / 40**, todos verificados |
| Arranque y preparación del orquestador | **35 invocaciones pendientes** y siete prompts preparados sobre una copia temporal de G01; todas registran mediciones 1.0.1, cinco hashes iguales por grupo y rechazo de `PENDIENTE` como modelo |

La comprobación del orquestador usó un identificador sintético de modelo y no ejecutó evaluaciones ni produjo puntuaciones; su carpeta temporal se eliminó al terminar. La única medición guardada en el corpus fue el derivado ignorado por Git `captures/G01/measurements.json`.

Recuperar la validación y corregir esta medida no acredita todavía el piloto de G5 ni una ejecución real de las siete skills. Esos resultados deben producirse y registrarse por separado.
