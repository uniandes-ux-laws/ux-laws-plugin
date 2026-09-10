# Qué sigue · GitHub, datos y avance

10 de septiembre de 2026 · semana 6 de 17

---

## 1. Avance: 44 %

Con 35 % del tiempo transcurrido. **Nueve puntos adelante**, no diez.

| Frente | Peso | Antes | Ahora | Qué movió |
|---|---|---|---|---|
| Instrumento | 25 % | 85 % | 88 % | Seis rúbricas revisadas por la decisión de la caja de tinta; G3 con su constructo acotado y citado |
| Sistema y plugin | 20 % | 45 % | 55 % | Caja de tinta implementada y verificada, modo de ablación, aserciones `ink_`, herramienta de diagnóstico, licencia y documentación de instalación |
| Ground truth humano | 20 % | 15 % | 15 % | Sin cambio. Bloqueado por ética |
| Medición y análisis | 20 % | 15 % | 15 % | Sin cambio |
| Documento de tesis | 15 % | 30 % | 34 % | Estructura completa de capítulos; el ADR es el capítulo 9.3 escrito |

**Lo que no subió es lo que importa vigilar.** Ground truth y medición llevan tres semanas en
el mismo número. Ninguno depende de nosotros escribiendo mejor: uno depende del comité de
ética y el otro depende de que las skills existan. Si dentro de dos semanas siguen igual, el
problema deja de ser de cronograma y pasa a ser de alcance.

## 2. GitHub

**Sí, organización. Y dos repositorios, no uno.**

### Por qué organización y no repo personal

Un repositorio bajo la cuenta de una persona ata el artefacto a esa cuenta: los permisos, la
URL y la continuidad después de graduarse. El documento de tesis va a citar esa URL de forma
permanente. Una organización cuesta lo mismo —cero, para repos públicos— y resuelve las tres
cosas: los tres son miembros con el mismo peso, la URL no lleva el nombre de uno solo, y el
asesor puede quedar como propietario cuando ustedes se gradúen, que es coherente con que él
sea el custodio de los datos después de la graduación.

El nombre ya está asumido en `plugin.json`: **`uniandes-ux-laws`**. Si se cambia, hay que
cambiarlo también ahí, en `CITATION.cff` y en `docs/instalacion.md`.

### Por qué dos repositorios

| Repo | Qué lleva | Visibilidad |
|---|---|---|
| `ux-laws-plugin` | El plugin: las siete skills, la capa de captura, el esquema, los scripts, la documentación de instalación | **Público** |
| `trabajo-de-grado` | El LaTeX del documento, el manifiesto del corpus, el protocolo congelado, los scripts de análisis | Privado hasta la sustentación |

La razón no es orden sino contaminación. El primero es lo que un desconocido instala y tiene
que poder clonar sin llevarse el borrador de la tesis ni los datos del estudio. El segundo
lleva material que está sujeto a las decisiones del comité de ética. Mezclarlos pone datos
gobernados por un protocolo de ética en el mismo árbol que el artefacto público, y eso no se
arregla después con un `.gitignore`.

### Qué queda listo para subir

Ya está en el repositorio, escrito hoy:

- `LICENSE` — MIT con los tres autores. Estaba declarado en tres archivos y el archivo no
  existía.
- `CITATION.cff` — para que quien lo use lo cite bien.
- `docs/instalacion.md` — las dos vías, incluido el prompt que mencionaste, con las
  condiciones que ese prompt supone dichas en voz alta.
- `docs/checklist-release.md` — la lista para publicar una versión.
- `.gitignore` con `.claude/skills` añadido.

### Los comandos

```bash
# después de crear la organización uniandes-ux-laws y el repo vacío ux-laws-plugin
cd ux-laws-plugin
git init && git add -A
git commit -m "Instrumento inicial: siete rúbricas, capa de captura, esquema de salida"
git branch -M main
git remote add origin https://github.com/uniandes-ux-laws/ux-laws-plugin.git
git push -u origin main
```

Después, en Settings → Collaborators: Mateo y Juan Francisco como **maintainers**, Camilo
como **owner**.

### Una regla que hay que fijar ahora y no después

**El documento cita un tag con su hash, nunca `main`.** Un lector que instale `main` dentro
de un año obtiene algo distinto de lo que el documento describe, y la comparación deja de ser
posible. Cuando se congele el protocolo en M2 sale el primer tag y su hash entra en el
protocolo y en el documento. El checklist de release lo tiene paso a paso.

Y una protección barata: proteger `main` para que exija pull request. Con tres personas
tocando las mismas rúbricas, un push directo que rompa el apéndice generado es cuestión de
tiempo.

## 3. Los datos: son cuatro cosas distintas y solo dos van a GitHub

Acá hay que ser preciso porque «el dataset» son cuatro cosas con reglas distintas.

| | Qué es | Dónde vive | Cuándo |
|---|---|---|---|
| **Corpus** | Las 30 URLs, su estratificación y el manifiesto | Manifiesto en `trabajo-de-grado`. **Se sella con hash en M2** | Esta semana |
| **Capturas** | Los cuatro artefactos por página | Fuera de git por tamaño; el `meta.json` con los hashes sí va versionado | Esta semana |
| **UICrit** | Dataset externo, 983 interfaces anotadas por siete diseñadores | Se descarga, no se redistribuye | Esta semana, para el piloto |
| **Ground truth humano** | Los puntajes de los cuatro evaluadores | **No va a GitHub.** Google Drive institucional, cinco años, custodio Camilo. La versión anonimizada se deposita en el repositorio DataHub de Uniandes con DOI | Semanas 10–11, después de la aprobación de ética |

Lo importante: **el dataset humano no es un archivo del repositorio, es un depósito con DOI.**
Eso ya está decidido en las respuestas al comité y hay que respetarlo. Subirlo a GitHub
«mientras tanto» sería incumplir el protocolo declarado.

**Y una pregunta que hay que hacerle a Camilo antes de publicar nada:** el corpus son
capturas de pantalla de treinta sitios de terceros. El manifiesto de URLs no tiene problema;
redistribuir las imágenes es otra cosa. Puede resolverse publicando las URLs y los hashes en
vez de las imágenes, de modo que cualquiera pueda recapturar y verificar que obtuvo lo mismo.
Es la opción que recomiendo, pero la decisión no es nuestra.

## 4. Qué hago yo y qué hacen ustedes, esta semana

**Ustedes, el lunes:**

1. Crear la organización `uniandes-ux-laws` y los dos repositorios. Subir el plugin con los
   comandos de arriba. Proteger `main`.
2. **Correr la captura sobre las 30 páginas en una máquina con red.** Este entorno no puede
   navegar a sitios externos —la pasarela responde 403, está verificado— así que todos los
   números medidos hasta ahora salen de fixtures y de una página sintética. Sin capturas
   reales, el reporte que ve Camilo el 24 tiene asteriscos.
3. Sellar el corpus: hash del manifiesto y fecha de captura registrada.
4. Confirmarle a Camilo el estado del comité de ética. Es el `[PENDIENTE]` más caro.

**Yo, en paralelo:**

1. Cobertura y parsimonia, las dos métricas de calidad del wireframe que faltan.
2. El catálogo de modos de falla, contado por página, sobre las capturas reales cuando
   lleguen.
3. El piloto de calibración sobre UICrit.
4. El protocolo escrito, para congelarlo el 20.

El detalle de las pruebas —cuáles pasan hoy, cuáles faltan y en qué orden— está en
`13-PLAN-DE-PRUEBAS.md`.

## 5. Lo que decide si esto llega a 10

No es el plugin. El plugin va bien y va adelantado.

Es que **ground truth y medición llevan tres semanas sin moverse**, y son el 40 % del peso.
La propuesta dice, con todas las letras, que sin evaluación humana no hay tesis sino demo. El
comité de ética está en la ruta crítica y su estado sigue sin confirmar. Todo lo demás que
hagamos bien no compensa eso.
