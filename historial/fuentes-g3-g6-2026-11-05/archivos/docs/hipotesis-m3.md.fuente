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

## La amenaza, y cómo quedó mitigada por diseño

**La amenaza, tal como se registró el 12 de septiembre.** Cinco repeticiones ejecutadas por el
mismo agente dentro de un mismo contexto no son independientes: la segunda ocurre con la
primera a la vista, y el sesgo va **en la dirección de H1**, hacia la coincidencia. Una
dispersión de cero medida así sería compatible con dos explicaciones —la rúbrica es
determinista, o las repeticiones se copiaron entre sí— y no habría forma de separarlas.

**Mitigación adoptada el 12 de septiembre, antes de correr: contexto limpio por repetición.**
El orquestador no ejecuta las cinco repeticiones en una conversación. Emite **cinco
invocaciones independientes**, cada una con:

- el **mismo prompt**, byte a byte, y por tanto el **mismo `prompt_hash`**;
- **ninguna historia** de las repeticiones anteriores: la invocación no recibe, ni por
  referencia, el resultado, el nivel ni el `trigger` de ninguna otra;
- su `repetition` y su `contexto_limpio: true` registrados en el libro de invocaciones, junto
  con **cómo** se garantizó el aislamiento, no solo que se garantizó.

`scripts/orchestrate.js` rechaza una corrida cuyo libro no declare contexto limpio en las
cinco, y el propio libro es lo que se audita después. El detalle está en
`skills/ux-audit/SKILL.md`.

**Qué queda en pie pese a la mitigación**, porque mitigar no es eliminar:

1. **El aislamiento es de contexto, no de modelo.** Las cinco invocaciones usan el mismo
   modelo con los mismos pesos; lo que se mide es la variación del muestreo y del juicio, no
   la de dos sistemas distintos.
2. **La mitigación se verifica por declaración del orquestador, no por inspección del
   runtime.** Si alguien corre las repeticiones a mano en una misma sesión y marca
   `contexto_limpio: true`, el libro mentiría y nada lo detectaría. Por eso el libro registra
   también el mecanismo concreto.
3. **La medición fuerte sigue siendo la de M5**, con la grilla completa y sus 3.900
   invocaciones.
4. **Un resultado que falsifique H1 es fuerte igual**: si aparece variación con el prompt fijo
   y sin historia compartida, la variación es del juicio.

## Registro

| | |
|---|---|
| Escritas | 2026-09-12, antes de la fase 1 de M3 |
| Protocolo vigente | `v0.1.0`, commit `50cdc8b1768c52cfc93157b356958865b3934f39` |
| Dónde se responden | Fase 5 de M3, y `docs/contexto/13-PLAN-DE-PRUEBAS.md` nivel 5 |
