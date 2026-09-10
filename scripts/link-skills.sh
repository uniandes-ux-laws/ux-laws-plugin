#!/usr/bin/env bash
# Genera los directorios que cada runtime escanea, apuntando a la única carpeta canónica
# skills/. Nada se duplica: una rúbrica se edita en un solo lugar.
#
#   ./scripts/link-skills.sh          crea enlaces simbólicos
#   ./scripts/link-skills.sh --copy   copia (para sistemas sin symlinks)
set -euo pipefail
cd "$(dirname "$0")/.."
MODE="${1:---link}"

mkdir -p .agents
rm -rf .agents/skills

if [ "$MODE" = "--copy" ]; then
  cp -R skills .agents/skills
  echo "Copiado skills/ -> .agents/skills/  (Codex)"
else
  ln -s ../skills .agents/skills
  echo "Enlazado skills/ -> .agents/skills/  (Codex)"
fi

echo "Claude Code lee skills/ directamente desde la raíz del plugin."
echo "Listo. Skills disponibles:"
ls -1 skills/
