# Plan · `resumen.md`, el resultado en español claro

13 de noviembre de 2026. Escrito antes de programar.

## Decisión

`recoger` escribe un tercer archivo, `resumen.md`, junto a `perfil.json` y `perfil.md`. Lo
genera un módulo nuevo, `scripts/resumen-claro.js`, a partir de `perfil.json`, de las
respuestas ya validadas de `resultados/` (solo para citar sus cifras) y de un diccionario
nuevo, `shared/lenguaje-claro.json`. No llama a ningún modelo.

## Justificación

- **Sin modelo.** Si un modelo redactara el resumen sería un octavo evaluador sin que nadie
  lo supiera: es el mismo argumento con el que `ux-audit` prohíbe «arreglar» salidas. Por
  código, la misma entrada da los mismos bytes.
- **Diccionario aparte y verificable.** Cada frase lleva `procedencia`: archivo, líneas y una
  `cita` literal de la rúbrica. Una prueba comprueba que la cita está en esas líneas. Si una
  rúbrica cambia, la prueba falla y obliga a revisar la frase.
- **Explicaciones neutras.** Un mismo código fija niveles altos y bajos (en G4, `P` fija el 2
  y el 3). La entrada de una condición dice *qué mira*; el resultado lo dice el texto del
  nivel, también traducido de la rúbrica, y las cifras de la respuesta.
- **Nada sellado cambia.** No se tocan `skills/*/SKILL.md`, `shared/escala.md`,
  `docs/protocolo.md`, `package.json`, `measure/`, `corpus/` ni `perfil-legible.js`.
  `perfil.json` y `perfil.md` salen igual que antes.

## Alternativas descartadas

| Alternativa | Por qué no |
|---|---|
| Que la skill le pida al agente redactar el resumen | Octavo evaluador; no reproducible |
| Reescribir `perfil.md` | Es salida registrada; el encargo exige que no cambie ni un byte |
| Poner los textos claros dentro de cada `SKILL.md` | Cambia rúbricas selladas |
| Una frase por (código, nivel) | Muchas combinaciones no existen; inventarlas sería afirmar lo que la rúbrica no dice |
| Copiar las recomendaciones que escribe el modelo | Traen ids de nodos y no se miden en v1 (decisión 7); quedan en `resultados/` |
| Un total o un semáforo «para orientar» | La escala es ordinal y G7 (una ley) pesaría igual que G1 (cuatro) |

## Cómo se implementa

1. `shared/lenguaje-claro.json`, versión 1.0.0: escala común, estados (nivel, no aplica, no
   se pudo evaluar), y por grupo: nombre claro, pregunta, base de evidencia, los cinco
   niveles, cada condición (`trigger`) con nombre, explicación, mejora y cifras, la
   condición de «no aplica» y, en G6, las ocho convenciones.
2. `scripts/resumen-claro.js`: función pura `resumenClaro(perfil, opciones)` que devuelve el
   texto, y un modo de línea de comandos para corridas ya cerradas
   (`node scripts/resumen-claro.js <carpeta de la corrida>`).
3. `scripts/orchestrate.js`: `recoger` escribe `resumen.md` después de `perfil.md`. Si el
   resumen no se puede generar, avisa y no invalida el perfil.
4. El resumen tiene cinco partes: qué se evaluó; cómo leerlo; los siete aspectos; qué
   mejorar primero; qué no dice este resultado.
5. Reglas fijas: con varias repeticiones muestra todos los resultados, el más frecuente y la
   diferencia entre el más alto y el más bajo; con una dice que no hay medida de
   estabilidad. «No aplica» y «no se pudo evaluar» nunca se cuentan como cero. Una condición
   sin entrada muestra el código y «sin explicación disponible», sin detener el cierre. Las
   mejoras salen solo de niveles 2 o menores, que es el corte que fijan las siete rúbricas,
   y nunca de G1, que no es interpretable en la versión 1.

## Cómo se prueba (`scripts/resumen-claro.test.js`)

| | Prueba |
|---|---|
| a | Resumen de la corrida de integración existente: se genera y contiene sus siete aspectos |
| b | Cobertura: toda condición de las siete rúbricas (frases y tablas de `trigger`, enumeraciones del esquema, K1–K8, niveles 0–4, «No aplicable») tiene entrada, y no sobra ninguna |
| b' | Procedencia: cada `cita` aparece en las líneas que declara |
| c | Determinismo: dos ejecuciones, mismos bytes |
| d | `perfil.json` y `perfil.md` no cambian: `recoger` sobre una corrida da los mismos bytes con y sin el cambio, salvo la marca `cerrada_en`, que ya existía |
| e | Sin totales, promedios, porcentajes, semáforos ni adjetivos de venta |
| f | Abstención total (como G6 en el piloto): no aparece como cero ni genera mejoras |
| g | Dispersión entre repeticiones: muestra moda, rango y la frase de que el modelo varió |
| h | `trigger` desconocido: muestra el código y «sin explicación disponible», sin fallar |
| i | Legibilidad: ningún código interno aparece sin su explicación en la misma línea |

## Límites conocidos desde el diseño

- El motivo de una abstención es texto del modelo. Se cita entre comillas, marcado como tal,
  con un glosario de los códigos que use. No se reescribe.
- El resumen no ve respuestas inválidas: si hay una, `recoger` no escribe perfil ni resumen.
- Un paquete reconstruido con este cambio ya no es el 0.2.2 registrado. La versión de la
  entrega la decide Juan; aquí no se cambia `release/version.json`.
