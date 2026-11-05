# ux-laws

Trabajo de grado de Ingeniería de Sistemas, Universidad de los Andes.
David Hernández, Mateo Rincón y Juan Francisco Rodríguez. Asesor: Camilo Escobar Velásquez.

La herramienta captura una pantalla de una página web, genera su wireframe y prepara
la evaluación de siete grupos de criterios de UX. Cada grupo usa niveles de 0 a 4.
Las imágenes del wireframe se representan con una X.

Para encontrar el código, los informes y los archivos de entrega, consulta la
[guía de carpetas y documentos](docs/README.md).

## Entrega actual

La entrega **0.2.1**, del 5 de noviembre de 2026, está preparada y comprobada localmente.
El ZIP todavía no tiene un tag nuevo ni una publicación como Release. Las instrucciones
para usarla están en [instalación](docs/instalacion.md).

El documento de [reglas](docs/apendice-rubricas.md) se genera desde las siete skills.
El ZIP incluye ese documento también en Word y PDF, los archivos para ejecutar la
herramienta y un registro para comprobar que las copias coinciden.

Los metadatos originales del repositorio siguen en 0.1.0 porque forman parte del
registro sellado de G1. Al preparar la entrega se actualizan **solo las copias** de
`package.json` y el manifiesto de Claude a 0.2.1. El archivo de dependencias nuevo
sale de `release/package-lock.json` y lleva fast-uri 3.1.9. El protocolo
conserva 0.1.0; el esquema de resultados usa 0.2.0, la ejecución 1.0.0 y el perfil 2.0.0.
Son versiones de partes distintas, no versiones que deban igualarse.

La entrega 0.2.1 corrige el aviso de fast-uri 3.1.7. Para usarla, instala el ZIP nuevo
y trabaja desde su carpeta. `npm ci` en la raíz del repositorio conserva las dependencias
históricas. La explicación del cambio está en [la actualización del 5 de noviembre](docs/ACTUALIZACION-DEPENDENCIA-05NOV.md).

## Preparar la entrega desde este repositorio

Se necesita Node.js con npm, Chromium de Playwright y LibreOffice para generar el PDF.
La instalación se comprobó con Node.js 20 y npm 10.

```bash
npm ci
npx playwright install chromium
node scripts/preparar-reglas.js
node scripts/preparar-entrega.js --zip
```

Esto deja `dist/ux-laws-0.2.1/`, el ZIP y su huella de comprobación. No publica nada.
Si ya existe la carpeta de entrega, usa `--out dist/otra-entrega` para conservarla.
No edites las reglas en Word: cambia su fuente solamente cuando el equipo autorice
una nueva revisión y vuelve a generar los documentos. Las rúbricas históricas no se
han cambiado en esta actualización.

## Qué se puede ejecutar

| Grupo | Criterio | Canal de referencia |
|---|---|---|
| G1 | Agrupación perceptual | Wireframe; no interpretable v1 |
| G2 | Arquitectura de decisión | Wireframe con apoyo textual de screenshot |
| G3 | Capacidad y segmentación | Wireframe con apoyo textual de screenshot |
| G4 | Saliencia visual | Screenshot |
| G5 | Posición y progreso | Wireframe con apoyo textual de screenshot |
| G6 | Economía y convención | Wireframe con apoyo textual de screenshot |
| G7 | Tamaño y separación de controles | Wireframe |

El modo de referencia prepara 35 solicitudes por página y entorno, con cinco
repeticiones. El de comparación prepara 65: los otros seis grupos en ambos canales
y G4 solo en screenshot. Preparar solicitudes **no ejecuta los modelos**.
Las respuestas originales se guardan y el cierre revisa que estén completas y sean válidas.

Los resultados distinguen puntaje, «no aplica» y abstención. Los dos últimos llevan
su motivo y no cuentan como ceros. Los avisos de captura se muestran en las entradas,
el perfil y la demo; una revisión automática sin alertas no garantiza una página despejada.

La [prueba pequeña en Codex](verificaciones/codex-0.2.1-2026-11-05/INFORME.md) completó
el recorrido con siete respuestas reales válidas sobre una página de ejemplo, una por
grupo. G3 y G6 se abstuvieron y el perfil conservó sus motivos. Es una comprobación
funcional, sin validación experta ni prueba de estabilidad.

## Límites y pendientes

G1 no distingue suficientemente entre páginas: su piloto dejó 23 de 24 en nivel 0.
Sus resultados conservan la marca «no interpretable v1». Las reglas propuestas de
G4 y G5 siguen identificadas como propuestas del equipo, sin atribuirlas a Camilo.

G3 conserva combinaciones sin nivel definido: su piloto tuvo 20 puntajes, 70 abstenciones
y 30 respuestas inválidas. G6 se abstuvo en sus 120 evaluaciones. Los pilotos terminaron
de ejecutarse, pero esos resultados limitan lo que puede afirmarse de ambos grupos.
El [cierre de G3 y G6](docs/CIERRE-G3-G6-21OCT.md) explica los casos pendientes.

La comparación de G2, G3, G5 y G6 no separa por completo el efecto del canal porque
el wireframe permite apoyo textual del screenshot. La herramienta evalúa una
pantalla, no un recorrido completo ni tiempos de respuesta.

Los pilotos terminados no equivalen a validación experta. Según Juan, al 4 de
noviembre el comité de ética ya aprobó el estudio; las respuestas de los evaluadores
y el consenso siguen pendientes. También falta ejecutar la grilla con los modelos
y parámetros reales de ambos entornos. Las pruebas locales no sustituyen esos pasos.

El [estado de la entrega](docs/ENTREGA-ACTUAL-04NOV.md) resume lo revisado.
Los pilotos y sus originales siguen en el repositorio; no se incluyen en el ZIP de uso.
Licencia MIT.
