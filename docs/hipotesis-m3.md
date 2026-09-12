# Hipótesis registradas antes de correr M3

Escritas el **12 de septiembre de 2026**, antes de que exista la capa de medición publicada,
antes de las siete skills y antes de la primera corrida real. Ese orden es el punto: una
predicción escrita después de ver el resultado no es una predicción.

---

## H1 · Determinismo de G1, G2 y G7

**La predicción.** Bajo la decisión 9 —el código mide, el agente juzga—, las tres rúbricas
cuyas anclas son enteramente numéricas deberían comportarse de forma **esencialmente
determinista**: dadas las mismas cifras de entrada, el nivel no tiene grados de libertad.
Sobre cinco repeticiones de la misma página con la misma configuración, se espera:

| | Predicción |
|---|---|
| Rango entre repeticiones | **0 niveles** |
| Fracción de corridas en el nivel modal | **1,00** |
| `trigger` | el mismo en las cinco |

**Qué la falsaría.** Cualquier página donde el rango sea mayor que 0, o donde el `trigger`
cambie entre repeticiones aunque el nivel no cambie. Basta una.

**Qué significaría que falle.** Que **el agente está introduciendo variación donde la entrada
no la tiene**. No sería ruido tolerable: sería evidencia de que la frontera de la decisión 9
no se sostiene en la práctica, porque el agente estaría haciendo algo más que aplicar una tabla
a unos números. Es un hallazgo reportable por sí mismo, y obligaría a revisar si la rúbrica
deja una decisión implícita que su texto no nombra.

**Qué NO significaría que se cumpla.** Que el sistema acierte. Un instrumento perfectamente
estable puede estar perfectamente equivocado; eso lo miden los casos dorados y el acuerdo con
la referencia humana, no la dispersión.

## H2 · G3 a G6 no son deterministas, y eso es esperado

**La predicción.** Las cuatro rúbricas que dependen de juicio semántico —qué cuenta como
unidad de tarea, elemento ajeno, aislado visual, convención rota— deberían mostrar dispersión
mayor que cero en al menos una de las tres páginas. La fracción en el nivel modal se espera
por debajo de 1,00 pero por encima de 0,60.

**Por qué se registra.** Para que el contraste con H1 sea interpretable. Si las siete salieran
igual de estables, la explicación más probable no sería que el juicio semántico es fácil, sino
que el montaje de repeticiones no está midiendo dispersión real. Ver la amenaza de abajo.

## La amenaza que hace falta declarar antes, no después

**Cinco repeticiones ejecutadas por el mismo agente dentro de un mismo contexto no son
independientes.** La segunda corrida ocurre con la primera a la vista, y el sesgo que eso
introduce va **en la dirección de H1**: hacia la coincidencia. Una dispersión de cero medida
así es compatible con dos explicaciones distintas —la rúbrica es determinista, o las
repeticiones se copiaron entre sí— y el diseño, tal como está, no las separa.

Consecuencias, que se aceptan y se declaran:

1. **La dispersión medida en la fase 5 es una cota inferior de la real.** Se reporta con esas
   palabras y no como «dispersión».
2. **H1 no se confirma con una dispersión de cero obtenida así.** Se confirma si además el
   `trigger` y las cifras coinciden, y aun entonces queda como evidencia débil.
3. **La medición fuerte de dispersión es la de M5**, con invocaciones independientes,
   persistiendo por corrida el identificador de modelo, el hash del prompt y el índice de
   repetición, que es lo que el protocolo ya exige.
4. **Un resultado que falsifique H1 sí es fuerte**, precisamente porque el sesgo del montaje
   empuja en la dirección contraria: si aparece variación pese a que el diseño la reprime, la
   variación es real.

## Registro

| | |
|---|---|
| Escritas | 2026-09-12, antes de la fase 1 de M3 |
| Protocolo vigente | `v0.1.0`, commit `50cdc8b1768c52cfc93157b356958865b3934f39` |
| Dónde se responden | Fase 5 de M3, y `docs/contexto/13-PLAN-DE-PRUEBAS.md` nivel 5 |
