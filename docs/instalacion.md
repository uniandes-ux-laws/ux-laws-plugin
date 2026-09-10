# Instalación y uso

Dos vías. La primera para quien quiera control sobre lo que instala; la segunda para quien
quiera probarlo en un minuto.

> **Cite siempre un tag, nunca la rama principal.** El documento de tesis describe una
> versión concreta del instrumento. Un lector que instale `main` dentro de un año obtendrá
> algo distinto de lo que el documento describe, y la comparación deja de ser posible.
> Los tags tienen la forma `v0.1.0` y cada uno tiene un hash de commit publicado en el
> protocolo.

## Vía 1 — por comando

```bash
git clone --branch <TAG> https://github.com/uniandes-ux-laws/ux-laws-plugin.git
cd ux-laws-plugin
npm install
./scripts/link-skills.sh          # o --copy en sistemas sin enlaces simbólicos
```

Después, en su agente:

```bash
claude --plugin-dir .             # Claude Code
codex                             # Codex lee .agents/skills
```

Verificar que la instalación quedó bien antes de usarla:

```bash
npm run validate                  # esquema de salida, 10/10 casos
npm run fidelity                  # fidelidad geométrica y de tinta sobre las fixtures
```

Si `npm run fidelity` no reporta `PASS`, la capa de captura no está produciendo la geometría
que las rúbricas esperan y ningún puntaje posterior es interpretable.

## Vía 2 — por prompt

Copie esto en un agente con acceso a red y permiso de escritura en disco:

```text
Instala el plugin de evaluación de UX que está en
https://github.com/uniandes-ux-laws/ux-laws-plugin (usa el tag <TAG>, no main):
clónalo, corre `npm install` y `./scripts/link-skills.sh`, y verifica la instalación
con `npm run validate` y `npm run fidelity`. Los dos tienen que pasar antes de seguir.

Después audita <URL> con la skill `ux-audit`: captura la página a viewport 1440x900
sin scroll, corre los siete grupos de constructo en el canal que declara cada uno, y
devuélveme el perfil de los siete con el `trigger` y los `measurements` de cada grupo.
No promedies los siete en un número.
```

**Condiciones que este prompt supone y conviene decir en voz alta:** que el agente pueda
navegar a internet, que pueda escribir en el disco, y que tenga Chromium disponible o pueda
instalarlo. Si alguna falla, la vía 1 dice exactamente en qué paso se rompió; el prompt no.

## Qué devuelve

Un objeto por grupo de constructo, validado contra `shared/schemas/group-result.schema.json`.
Siete objetos, uno por grupo, **nunca uno por ley**.

Campos que siempre están: `group_id`, `group_name`, `laws_subsumed`, `channel`,
`not_applicable`, `run`, `measurements`. Con puntaje, además `score` y `trigger`. Sin
puntaje, además `na_reason`.

`trigger` nombra la condición observable que fijó el nivel. Un puntaje sin la condición
detrás no es auditable ni sirve para diagnosticar, y por eso el esquema lo exige.

`measurements` lleva los valores crudos. Toda cifra agregada viaja junto a los datos por caso
que la componen.

## Lo que el plugin no hace

- **No promedia los siete grupos en un número**, salvo que se le pida explícitamente, y en
  ese caso emite la advertencia de que G7 subsume una ley y G1 subsume cuatro, de modo que
  una ponderación uniforme no es neutral.
- **No evalúa flujos de varias pantallas.** El alcance es una pantalla capturada.
- **No evalúa las leyes temporales** —Doherty, Flow, Zeigarnik, Parkinson— porque no son
  observables en una captura estática.
- **No es un linter de accesibilidad** y no reemplaza uno.
