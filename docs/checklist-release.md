# Checklist para publicar una versión

Una versión publicada es una afirmación: «esto es lo que el documento describe». Ningún
punto de esta lista es opcional.

## Antes del tag

- [ ] `npm run validate` reporta 10/10
- [ ] `npm run fidelity` reporta PASS con tolerancia 1 px
- [ ] `npm run appendix` corrido, y `docs/apendice-rubricas.md` commiteado en el mismo commit
      que las rúbricas que lo generan
- [ ] Ninguna rúbrica quedó editada sin regenerar el apéndice
- [ ] `protocol_version` en el frontmatter de las siete skills dice la versión que se va a
      publicar, no `unreleased`
- [ ] La versión en `.claude-plugin/plugin.json` y en `package.json` coinciden
- [ ] `git status` limpio y `node_modules/` fuera del árbol

## El tag

```bash
git tag -a v0.1.0 -m "Protocolo congelado M2"
git push origin v0.1.0
git rev-parse v0.1.0        # este hash va en el protocolo y en el documento
```

## Después del tag

- [ ] El hash del commit del tag está escrito en el protocolo congelado
- [ ] El documento de tesis cita el tag, no `main`
- [ ] Instalación probada desde cero en una máquina que no es la de desarrollo, siguiendo la
      vía 1 de `docs/instalacion.md` palabra por palabra
- [ ] El prompt de la vía 2 probado tal como está escrito, sin ajustarlo sobre la marcha

El último punto es el que se suele saltar y es el que decide si el artefacto es reproducible
o solo funciona en la máquina donde se escribió.
