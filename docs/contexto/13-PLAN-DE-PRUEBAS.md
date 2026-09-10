# Plan de pruebas

10 de septiembre de 2026. Qué se prueba, en qué orden, qué demuestra cada prueba y cuál es
el estado hoy.

---

## La distinción que hay que tener clara

**Hay dos clases de prueba y confundirlas es un error de método, no de ingeniería.**

Los niveles 0 a 4 y el 10 son **pruebas**: pasan o fallan, y una que falla bloquea lo que
viene después. Miden si el sistema hace lo que dice hacer.

Los niveles 5 a 9 son **mediciones**: no pasan ni fallan, reportan un valor. Un acuerdo bajo
o una dispersión alta no son pruebas fallidas, son resultados de la tesis. Tratarlos como
fallas invita a ajustar el instrumento hasta que el número salga bonito, que es exactamente
lo que el pre-registro existe para impedir.

---

## Nivel 0 · Determinismo de la captura

**Qué demuestra:** que dos corridas sobre la misma página producen los mismos artefactos. Sin
esto, ninguna diferencia posterior es atribuible: no se sabría si cambió el modelo o cambió
la entrada.

**Cómo:** capturar dos veces la misma página local y comparar el sha256 de `screenshot.png`,
`wireframe.png` y `nodes.json`.

**Estado: PASA.** Los tres archivos son idénticos byte a byte sobre `portal.html`.

**Lo que no cubre:** una página real cambia entre capturas por razones legítimas —rotación de
banners, contenido dinámico, publicidad—. Por eso `meta.json` guarda la fecha y el hash de
cada captura: la comparación se hace contra el artefacto guardado, nunca volviendo a
capturar.

## Nivel 1 · Fidelidad de la representación

Es la prueba que el asesor pidió ver. Cuatro criterios, dos implementados.

| | Qué demuestra | Cómo | Estado |
|---|---|---|---|
| 1a **Geométrica** | Cada caja está donde el fixture declara | Aserciones `exp_<x>_<y>_<w>_<h>` sobre fixtures de geometría conocida | **PASA · 0,000 px** sobre tres fixtures |
| 1b **De tinta** | La caja de tinta corresponde a lo que se ve | Aserciones `ink_<x>_<y>_<w>_<h>` | **PASA · 0,000 px** sobre cinco aserciones, incluida herencia anidada |
| 1c **Cobertura** | Nada visible se perdió | Máscara de píxeles no-fondo del screenshot contra las cajas del wireframe | **Falta** |
| 1d **Parsimonia** | Nada se dibujó de más | Fracción de bordes dibujados que corresponden a algo en la pantalla | **Falta** |

**Controles negativos, ya implementados y verificados:** una caja declarada a 100 px que mide
137 hace fallar la prueba, y un elemento declarado pero ausente de `nodes.json` también. El
verificador no pasa por vacío.

**1e · Catálogo de modos de falla.** No es una métrica sino un conteo por página de las
formas conocidas de romperse: contenido dentro de un `canvas` o rasterizado en una imagen,
que no tiene caja y no aparece; iframes, que quedan fuera del snapshot; tipografías web que
no cargan y cambian la tinta; encabezados fijos o pegajosos; elementos que aparecen después
del evento de carga; muros de cookies que tapan la página. **Falta**, y es lo que las
primeras capturas reales van a llenar.

## Nivel 2 · Conformidad de la salida

**Qué demuestra:** que ninguna salida inválida entra al análisis.

**Estado: PASA · 10/10.** El esquema acepta un resultado completo y un no-aplicable con
razón, y rechaza un puntaje sin `trigger`, uno sin `measurements`, un no-aplicable sin razón,
un puntaje fuera de 0–4, un grupo inexistente, una repetición fuera de 1–5, un hash mal
formado y un campo extra no declarado.

**Lo que falta:** que la validación esté **dentro del orquestador** y no solo en un script
aparte. Una salida inválida tiene que detenerse en el momento en que se produce, no en una
revisión posterior que alguien puede saltarse.

## Nivel 3 · Calibración de las rúbricas *(bloquea M2)*

**Qué demuestra:** que cada rúbrica usa su escala completa. Una rúbrica cuyos niveles medios
nunca se asignan produce, en los datos, exactamente el mismo aspecto que una rúbrica que
discrimina bien: acuerdo alto. La única forma de distinguirlas es correrla y mirar la
distribución de niveles que produce.

**Cómo:** las siete rúbricas sobre UICrit —983 interfaces móviles anotadas por siete
diseñadores con experiencia—, externo al corpus y a su plataforma. Se reporta, por rúbrica,
la distribución de niveles. La que no mueva sus puntajes se reescribe, y la reescritura se
fecha **antes** del congelamiento.

**Estado: no corrido.** Es el bloqueo real de M2 y va esta semana.

**Por qué no sobre el corpus:** correr el instrumento sobre el corpus antes de sellarlo
destruye el sellado. El piloto tiene que ser sobre datos ajenos.

## Nivel 4 · Casos dorados por grupo

**Qué demuestra:** que la rúbrica, ejecutada, asigna el nivel que un humano que lee la misma
rúbrica asignaría. Es la prueba unitaria de una rúbrica y es la que atrapa el caso peligroso:
una rúbrica que se lee bien y puntúa mal.

**Cómo:** cinco páginas por grupo, **fuera del corpus**, puntuadas a mano por el equipo por
consenso, con el nivel esperado escrito **antes** de correr la skill. La skill tiene que caer
dentro de ±1 nivel en al menos cuatro de las cinco. Un fallo se diagnostica con el `trigger`:
dice qué condición disparó el nivel y por tanto dónde está la ambigüedad.

**Estado: falta.** Es lo primero después de implementar cada skill, no lo último.

**Cuidado:** estas páginas no pueden ser del corpus ni de UICrit. Si lo fueran, el caso
dorado y la medición compartirían datos y el resultado dejaría de significar algo.

## Nivel 5 · Dispersión entre repeticiones *(medición)*

**Qué reporta:** k = 5 repeticiones de la misma skill sobre la misma página, misma
configuración. Se reporta la moda, el rango y la fracción de corridas que caen en el nivel
modal.

Un puntaje que oscila entre corridas es un hallazgo a reportar, no un problema a esconder.
Está pre-comprometido así desde la propuesta.

## Nivel 6 · Comparación entre canales *(medición)*

**Qué reporta:** los seis grupos estructurales puntuados sobre las dos representaciones de la
misma página. La diferencia es la estimación de cuánto aporta el screenshot que el wireframe
no tiene.

**Interés especial en G3.** Ahí la diferencia entre canales es la estimación directa de
cuánta carga extrínseca se pierde al abstraer, que es justo la objeción del asesor convertida
en medición.

## Nivel 7 · Comparación entre runtimes *(medición)*

**Qué reporta:** las mismas siete `SKILL.md` bajo Claude Code y bajo Codex. Los manifiestos
difieren; el texto de la rúbrica no. Es una medida de robustez del instrumento frente al
stack que lo ejecuta.

## Nivel 8 · Ablación de la caja de tinta *(medición)*

**Qué reporta:** las mismas páginas capturadas en los dos modos —`perceptual` y
`--no-perceptual`— y puntuadas con las mismas rúbricas. La diferencia por grupo mide cuánto
dependía el puntaje de bordes que no están en la pantalla.

Es barato: el modo alterno ya está implementado. Y convierte una corrección en un resultado
con signo propio.

## Nivel 9 · Acuerdo con la referencia humana *(medición)*

**Qué reporta:** Brennan–Prediger con pesos cuadráticos, agrupado, contra los cuatro
evaluadores expertos sobre las mismas páginas.

**Antes de comparar contra el sistema se calcula y se reporta el acuerdo entre los humanos.**
Si los evaluadores no concuerdan entre sí, el término contra el sistema no es interpretable y
hay que decirlo antes de mirarlo, no después.

El coeficiente agrupado sobre los 210 pares unidad-grupo es el resultado confirmatorio; los
coeficientes por grupo son exploratorios, se reportan con su intervalo y sirven para ordenar
grupos, no para clasificarlos.

## Nivel 10 · Reproducibilidad del artefacto

**Qué demuestra:** que otra persona puede instalarlo y obtener una salida válida. Es la mitad
de la contribución y es la prueba que más se salta la gente.

**Cómo:** en una máquina que no es la de desarrollo, desde el tag congelado, siguiendo
`docs/instalacion.md` palabra por palabra, por las dos vías —comando y prompt—, sin ajustar
nada sobre la marcha.

**Estado: falta.** Va en la semana anterior a la entrega, no el último día.

---

## Orden y dependencias

```
0 determinismo ──┐
1 fidelidad  ────┼──> 3 calibración ──> M2 congelamiento
2 esquema    ────┘                          │
                                            v
                       4 casos dorados ──> 5 dispersión
                                           6 canales
                                           7 runtimes     ──> 9 acuerdo
                                           8 ablación
                                                          10 reproducibilidad
```

Nada de la derecha significa algo si algo de la izquierda falla. Un acuerdo alto sobre una
representación infiel mide la fidelidad al error compartido, no la calidad del instrumento.

## Resumen de estado

| Nivel | Estado |
|---|---|
| 0 · Determinismo | **Pasa** |
| 1a · Fidelidad geométrica | **Pasa**, 0,000 px |
| 1b · Fidelidad de tinta | **Pasa**, 0,000 px |
| 1c · Cobertura | Falta |
| 1d · Parsimonia | Falta |
| 1e · Catálogo de fallas | Falta |
| 2 · Esquema | **Pasa**, 10/10 · falta moverlo al orquestador |
| 3 · Calibración | No corrido — **bloquea M2** |
| 4 · Casos dorados | Falta |
| 5–9 · Mediciones | No corridas, dependen de las anteriores |
| 10 · Reproducibilidad | Falta |
