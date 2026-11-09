# Manejo de los casos difíciles

4 de noviembre de 2026. Juan revisó los cambios y autorizó publicarlos con el mensaje
de commit «Diferenciar casos». Los cambios posteriores requieren una nueva revisión.

El perfil ahora separa los casos que tienen puntaje, los que no aplican y los que no se
pueden puntuar. Un dato faltante no se convierte en cero.

## Qué cambia

| Resultado | Cómo se presenta |
|---|---|
| Puntaje de 0 a 4 | Conserva el nivel y la regla que lo produjo. Un cero sigue siendo un puntaje. |
| No aplica (NA) | Conserva la condición objetiva que indica la rúbrica. No tiene puntaje. |
| Abstención (ABST) | El grupo aplica, pero falta evidencia o no hay un nivel definido para esa combinación. Conserva el motivo, sin puntaje. |

Una advertencia de evidencia insuficiente puede acompañar un puntaje. No se borra ese
nivel ni se cambia automáticamente a abstención. Si la respuesta mezcla estados que no
corresponden, el cierre informa el problema y conserva el original.

El perfil guarda el estado y el motivo de cada repetición, además de los recuentos. La
moda y el rango usan solo los puntajes. La fracción en el modo divide entre todas las
repeticiones previstas: un cero y cuatro abstenciones dan 0,2, no 1. Sin puntajes, moda,
fracción y rango quedan nulos. Una serie mixta o con menos de cinco puntajes no se
presenta como estable. «Estable» describe los niveles observados, no confirma su corrección.

Las instrucciones de `ux-audit` también indican conservar las respuestas rechazadas,
sin pedir otras para reemplazarlas automáticamente. Un cierre fallido conserva cualquier
perfil anterior y avisa que no fue actualizado.

## El caso de G1

En las ejecuciones nuevas, G1 recibe una copia de entrada **1.0.7**, obtenida de la
medición **1.0.6**. La copia aplica la regla que ya estaba en la rúbrica: con cero o un
grupo, corresponde **NA**. Un conteo desconocido no se interpreta como cero.

Se comprueban la versión, la huella del archivo y el conteo que devuelve el evaluador.
No se recalculan las proporciones ni se ajustan los cortes. El perfil y la tabla marcan
G1 como **«no interpretable v1»**, porque no distingue suficientemente entre las páginas.

La fuente y los pilotos anteriores se conservan. C13 mantiene su cero histórico y la
discrepancia documentada; esta corrección se aplica a entradas nuevas, no reescribe ese
resultado. Los libros anteriores siguen siendo legibles y reciben la advertencia de G1;
la comprobación de la nueva entrada corresponde a las corridas que registran 1.0.7.

## Archivos para revisar

- [orchestrate.js](../scripts/orchestrate.js): preparación de G1, validación y presentación del perfil.
- [estado-resultado.js](../scripts/estado-resultado.js): comprueba que los tres estados sean coherentes.
- [g1-input.js](../measure/g1-input.js): prepara la copia nueva de G1 y comprueba su aplicabilidad.
- [ux-audit](../skills/ux-audit/SKILL.md): instrucciones ajustadas al manejo de estados.
- Pruebas en `scripts/orchestrate-cierre.test.js`, `scripts/estado-resultado.test.js`,
  `measure/g1-input.test.js` y las pruebas de preparación de G3/G6 y G4.
- [CLAUDE.md](../CLAUDE.md): estado del trabajo y revisión antes de publicar.

## Qué comprobamos

Pasaron las **228 pruebas del proyecto**, 33 más que antes de esta corrección. Cubren
ceros, NA, abstenciones, series mixtas, respuestas incoherentes y la aplicabilidad de G1.
La preparación sobre una copia de C13 conserva la medición original y genera NA en la
entrada nueva. Se verificaron los 5.159 archivos históricos, los diez sellos de pilotos
y el sello del cierre de G1.

También se revisó, sin modificarlos, el formato de estado de 610 originales de los
pilotos recientes. No aparecieron contradicciones con este control de estados. Eso no
los convierte en respuestas válidas: las 30 inválidas de G3 conservan su clasificación
por los problemas de selección y evidencia que ya estaban registrados.

El validador general de skills avisa sobre el campo `compatibility`, que ya existía en
`ux-audit`. Su cabecera se conserva; esta corrección no cambia el formato del plugin.

Para comprobarlo sin solicitar respuestas a un modelo:

```bash
node --test
node scripts/g1-closure.js verificar
```

Las reglas incompletas siguen sin producir un puntaje inventado. Los contratos de cada
grupo y la validación experta siguen siendo necesarios; esta corrección mejora el manejo
de esos límites y no declara terminada la evaluación de la tesis.
