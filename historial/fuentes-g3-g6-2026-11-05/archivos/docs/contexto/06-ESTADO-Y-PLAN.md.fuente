# Estado y plan

Corte: 10 de septiembre de 2026 (actualizado al final del día) · semana 6 de 17 · término 2026-20
El término empezó el 3 de agosto y la clase termina el 28 de noviembre.

---

## 1. Avance

**44 % del trabajo completo, con 35 % del tiempo transcurrido.**

El peso de cada frente refleja lo que la propuesta declara como la contribución: la
medición, no la herramienta.

| Frente | Peso | Avance | Qué falta |
|---|---|---|---|
| Instrumento | 25 % | 90 % | Protocolo fechado y hasheado, piloto de calibración. El sello del corpus quedó hecho el 10 de septiembre |
| Sistema y plugin | 20 % | 55 % | Implementar las siete skills, el orquestador, publicar el repositorio |
| Ground truth humano | 20 % | 15 % | Ética, reclutamiento, guion de entrenamiento, sesiones |
| Medición y análisis | 20 % | 15 % | Ejecutar la grilla, scripts de análisis |
| Documento de tesis | 15 % | 34 % | Resultados, amenazas actualizadas, limitaciones |

Ground truth y medición llevan tres semanas en el mismo número, y entre los dos pesan 40 %.
Si en dos semanas siguen igual, deja de ser un problema de cronograma y pasa a ser de
alcance.

## 2. Hitos

| | Fecha | Condición | Estado |
|---|---|---|---|
| M1 | 30 ago · s4 | 18 leyes seleccionadas, 12 exclusiones justificadas, orígenes trazados contra fuente | Cumplido |
| M2 | 20 sep · s7 | **Congelamiento por etapas.** Se congela lo verificado: corpus y conjunto de calibración sellados, captura, esquema, escalas, y G1, G2 y G7 con piloto corrido. G3–G6 quedan declaradas sin calibrar, con su piloto fechado en M3 | En curso |
| M3 | 4 oct · s9 | De URL a salida válida contra el esquema, sobre páginas de prueba | Pendiente |
| M4 | 18 oct · s11 | Corpus puntuado por todos los evaluadores, acuerdo entre humanos calculado | Pendiente |
| M5 | 25 oct · s12 | 3.900 invocaciones ejecutadas y persistidas con su metadata | Pendiente |
| M5b | 8 nov · s14 | Acuerdo por grupo, dispersión, comparación entre canales y entre runtimes | Pendiente |
| M6 | 15 nov · s15 | Borrador con resultados, amenazas y limitaciones al asesor | Pendiente |
| M7 | 28 nov · s17 | Documento, dataset y repositorio | Pendiente |

**M2 se corrió del 13 al 20 de septiembre.** Razón: escribir seis rúbricas buenas en tres
días no se podía, y una rúbrica apurada arruina el instrumento que la tesis mide de sí
misma. La semana se recuperó arrancando la capa de captura en paralelo, que no dependía de
las rúbricas.

## 3. Qué está cerrado

- Las **siete rúbricas** con sus cinco niveles anclados, como `SKILL.md` en el repositorio.
- El **esquema de salida**, validado contra diez casos.
- La **capa de captura** y el generador de wireframe, con fidelidad verificada en 0.000 px
  sobre tres fixtures de geometría conocida.
- El **archivo paralelo** con los ocho campos.
- Los **manifiestos del plugin** y el script que deja una sola carpeta canónica leída por
  los dos runtimes.
- El **generador del apéndice**: las rúbricas del documento de tesis salen del repositorio.
- Las **ocho decisiones de implementación** congeladas.
- La **decisión de la caja de tinta** (ADR-01), implementada, verificada en 0,000 px sobre
  cinco aserciones nuevas, con modo de ablación disponible.
- La **licencia, la cita y la documentación de instalación** del repositorio.
- El **corpus**: 30 URLs verificadas y fechadas.

## 4. Qué falta

| Pieza | Estado | Bloquea |
|---|---|---|
| Protocolo | `docs/protocolo.md`, borrador con sus PENDIENTE declarados. Falta fecharlo y hashearlo el 20 | M2, toda la medición |
| ~~Sello del corpus~~ | **Hecho el 10 de septiembre.** 30 páginas, 120 archivos, hash `f9c0caaaa2ea…`. Verificable con `npm run seal:verify` | — |
| Piloto de calibración | **Corrido en G1, G2 y G7** sobre 24 páginas propias fuera del corpus, selladas. Tras la reescritura por proporción: G2 4 niveles de 5, G7 3, **G1 sigue en 2 y se congela declarada como no discriminante**. G3–G6 dependen de M3 | Confianza en M5b |
| Las siete skills | Rúbricas escritas; falta implementarlas contra el esquema | M3 |
| Orquestador | No existe | M3 |
| Comité de ética | Estado sin confirmar | M4 |
| Reclutamiento | No iniciado | M4 |
| Guion de entrenamiento de evaluadores | No escrito | M4 |
| Scripts de análisis | No escritos | M5b |

## 5. El plan

### Semana 7 · 14 – 20 sep
- ~~Sellar el corpus con hash y registrar la fecha de captura.~~ Hecho el 10 de septiembre: `corpus/SELLO-v1.md`, hash `f9c0caaaa2ea…`, fecha de captura registrada en el manifiesto.
- ~~Correr el piloto de calibración sobre UICrit~~ → UICrit se retiró el 10 de septiembre.
  El piloto corre sobre un conjunto propio de 24 páginas fuera del corpus, y ya está corrido
  en G1, G2 y G7: ver docs/piloto-calibracion.md.
- ~~Reescribir cualquier rúbrica que no ejercite su escala~~ Hecho el 11 de septiembre: G1 y
  G7 reescritas por proporción afectada, con la escala de tolerancia y la regla del ajuste
  único en `shared/escala.md`. G7 pasó de 2 niveles a 3; G1 sigue en 2 y se congela declarada.
- Congelar el protocolo **por etapas**, fecharlo y publicarlo. El 20 se congela lo verificado;
  G3–G6 quedan declaradas sin piloto, con fecha en M3. **M2.**
- Confirmar el estado del comité de ética.

### Semana 8 · 21 – 27 sep
- Implementar las skills de G1, G2 y G7 contra el esquema congelado.
- Abrir el reclutamiento de los cuatro evaluadores.
- Escribir el guion de entrenamiento de evaluadores.

### Semana 9 · 28 sep – 4 oct
- Implementar G3, G4, G5 y G6.
- Orquestador: invoca cada skill en su canal y arma la salida.
- Empaquetar como plugin con el manifiesto de cada runtime y publicar el repositorio.
- Pipeline corriendo de punta a punta sobre fixtures. **M3.**

### Semanas 10 – 11 · 5 – 18 oct
- Capturar las 30 páginas en los dos canales.
- Correr las sesiones de evaluación sobre la página renderizada.
- Calcular y reportar el acuerdo entre humanos, antes de comparar contra el sistema. **M4.**

### Semanas 11 – 12 · 12 – 25 oct
- Ejecutar la grilla: 3.900 invocaciones con cinco repeticiones por configuración.
- Persistir por corrida el identificador de modelo, el hash del prompt y el índice de
  repetición. **M5.**

### Semanas 13 – 14 · 26 oct – 8 nov
- Acuerdo por grupo contra el ground truth; dispersión entre repeticiones; comparación entre
  canales y entre runtimes. **M5b.**

### Semanas 14 – 15 · 9 – 15 nov
- Escribir resultados con los datos por caso al lado de cada agregado; amenazas y
  limitaciones. **M6.**

### Semanas 16 – 17 · 16 – 28 nov
- Correcciones, documento final, dataset y repositorio, preparación de la sustentación. **M7.**

## 6. Qué separa un 10 de un 7

Ninguna es trabajo extra: todas son promesas que la propuesta ya hizo.

1. **Rúbricas que de verdad anclan.** Dos personas leyendo la misma pantalla tienen que
   llegar al mismo nivel. Si las rúbricas son vagas, el coeficiente mide la vaguedad.
2. **El piloto antes de congelar.** Es la diferencia entre un acuerdo alto que significa
   algo y uno alto porque todo se apelotonó en el mismo nivel.
3. **Un plugin que otro instale y corra.** El artefacto es la mitad de la contribución.
4. **El resultado negativo reportado igual de bien.** Acuerdo bajo o dispersión alta se
   reportan como hallazgo. Está pre-comprometido.
5. **Cada número rastreable a su caso**, sin volver a invocar un modelo para reconstruirlo.
6. **El catálogo de procedencia intacto**: las 18 leyes trazadas a su fuente, con las
   brechas documentadas y las tres entradas sin publicación declaradas. Es la parte más
   difícil de replicar.

## 7. Riesgos abiertos

**El comité de ética está en la ruta crítica y su estado no está confirmado.** Radicar
satisface el requisito del programa, pero ninguna sesión con evaluadores puede empezar antes
de la aprobación, y M4 cae en la semana 11. Contingencia: si la aprobación no llega para la
semana 9, las sesiones se corren al espacio entre las semanas 10 y 13. Si no llega para la
semana 13, el objetivo del ground truth no se ejecuta, se declara así con la razón
registrada, y la tesis reporta lo que no depende de la referencia humana — el instrumento,
la dispersión, y las comparaciones entre canales y entre runtimes.

**El reclutamiento tiene piso.** El objetivo son cuatro evaluadores y el piso son tres; el
cuarto compra identificabilidad de un evaluador sesgado y no precisión. Por debajo de tres,
dos evaluadores no pueden separar a uno sistemáticamente severo del desacuerdo genuino, y el
acuerdo se reporta como no interpretable para ese propósito.

**El presupuesto de invocaciones no está confirmado** con los dos backends. La grilla son
3.900 invocaciones y decide si el tramo de medición cabe en las semanas asignadas.
