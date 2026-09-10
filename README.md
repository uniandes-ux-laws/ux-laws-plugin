# ux-laws

Evaluación automatizada de interfaces web contra dieciocho *Laws of UX* operacionalizadas
como rúbricas ordinales ancladas.

Trabajo de grado en Ingeniería de Sistemas, Universidad de los Andes.
David Hernández · Mateo Rincón · Juan Francisco Rodríguez. Asesor: Camilo Escobar Velásquez.

---

## Qué hace

Toma una URL, la captura a un viewport fijo, produce dos representaciones de la misma
pantalla —el screenshot y un wireframe generado desde el árbol de layout del navegador— y
puntúa siete grupos de constructo en una escala ordinal anclada de 0 a 4.

Las dieciocho leyes se subsumen en siete grupos y **el puntaje se emite por grupo, nunca
por ley**. Puntuar cada ley por separado y sumarlas contaría varias veces el mismo
constructo: cuatro de las dieciocho son principios Gestalt de agrupación y otras cuatro
miden capacidad o segmentación.

| | Constructo | Leyes subsumidas | Canal |
|---|---|---|---|
| G1 | Agrupación perceptual | Proximidad, Prägnanz, Región común, Similitud | Wireframe |
| G2 | Arquitectura de decisión | Ley de Hick, Sobrecarga de elección | Wireframe |
| G3 | Capacidad y segmentación | Miller, Chunking, Memoria de trabajo, Carga cognitiva | Wireframe |
| G4 | Saliencia visual | Von Restorff, Atención selectiva | **Screenshot** |
| G5 | Posición y progreso | Posición serial, Gradiente de meta | Wireframe |
| G6 | Economía y convención | Navaja de Occam, Ley de Tesler, Ley de Jakob | Wireframe |
| G7 | Targeting motor | Ley de Fitts | Wireframe |

G4 es el único grupo fuera del wireframe: lo que sus dos leyes miden vive en el color y el
peso, que es lo que el wireframe abstrae. Por eso el pipeline tiene dos ramas.

## Instalación

El repositorio es un plugin. La carpeta canónica es `skills/`, y cada runtime lee de donde
espera leer, sin duplicar ningún archivo.

```bash
git clone https://github.com/uniandes-ux-laws/ux-laws-plugin
cd ux-laws-plugin
./scripts/link-skills.sh          # o --copy en sistemas sin symlinks
```

**Claude Code** lee `skills/` desde la raíz del plugin, junto al manifiesto
`.claude-plugin/plugin.json`:

```bash
claude --plugin-dir ./ux-laws-plugin
```

**Codex** escanea `.agents/skills`, que el script de arriba deja apuntando a la misma
carpeta canónica.

La misma rúbrica se edita en un solo lugar y ejecuta en los dos runtimes sin modificación.
Eso no es un detalle de portabilidad: es lo que convierte el runtime en una variable
experimental del estudio.

## Uso

```bash
# capturar una página
node capture/capture.js https://ejemplo.co --out captures/ejemplo

# verificar que el wireframe reproduce la geometría del screenshot
node capture/verify-fidelity.js --tolerance 1
```

Después, desde el runtime, la skill `ux-audit` orquesta la evaluación sobre el directorio
de captura.

## Estructura

```
skills/                     una skill por grupo de constructo, más el orquestador
  gN-.../SKILL.md           la rúbrica ES la skill: no hay dos versiones que puedan divergir
shared/
  schemas/                  el esquema de salida que las siete skills deben cumplir
  escala.md                 la escala ordinal común 0-4
  decisiones.md             las ocho decisiones de implementación congeladas
capture/                    URL -> screenshot + wireframe + nodes.json + meta.json
scripts/
  link-skills.sh            genera los directorios que cada runtime escanea
  build-appendix.js         genera el apéndice de rúbricas del documento de tesis
docs/                       salidas generadas para el documento
```

## Por qué las rúbricas viven aquí y no en un documento aparte

La rúbrica es el instrumento, y el instrumento es lo que corre. Si la rúbrica viviera en un
archivo de Word y su copia ejecutable en el repositorio, las dos derivarían, y el protocolo
congelado dejaría de describir lo que el sistema hace. Por eso el `SKILL.md` es la fuente
única, y el apéndice del documento de tesis se **genera** desde estos archivos:

```bash
node scripts/build-appendix.js
```

## Estado

Rúbricas de los siete grupos escritas. Esquema de salida definido. Capa de captura
funcionando con fidelidad verificada sobre fixtures de geometría conocida. Pendiente: el
protocolo fechado y hasheado, el sello del corpus, el piloto de calibración y las
implementaciones de las skills.

## Licencia

MIT.
