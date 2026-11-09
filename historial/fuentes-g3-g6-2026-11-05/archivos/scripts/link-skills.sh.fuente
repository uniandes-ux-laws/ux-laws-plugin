#!/usr/bin/env bash
# Genera los directorios que cada runtime escanea, apuntando a la única carpeta canónica
# skills/. Nada se duplica: una rúbrica se edita en un solo lugar.
#
#   ./scripts/link-skills.sh          crea enlaces simbólicos
#   ./scripts/link-skills.sh --copy   copia (para sistemas sin symlinks)
set -euo pipefail
cd "$(dirname "$0")/.."
MODE="${1:---link}"
if [ "$MODE" != "--link" ] && [ "$MODE" != "--copy" ]; then
  echo "Uso: ./scripts/link-skills.sh [--link|--copy]" >&2
  exit 1
fi

mkdir -p .agents
if [ -L .agents/skills ]; then
  if [ "$(readlink .agents/skills)" != "../skills" ]; then
    echo "Ya hay un enlace distinto en .agents/skills. No se reemplaza." >&2
    exit 1
  fi
  if [ "$MODE" = "--copy" ]; then
    rm .agents/skills
  else
    echo "El enlace a skills/ ya está listo."
    exit 0
  fi
elif [ -e .agents/skills ]; then
  if [ "$MODE" = "--copy" ] && diff -qr skills .agents/skills >/dev/null; then
    echo "La copia de skills/ ya coincide con la fuente."
    exit 0
  fi
  echo "Ya hay una carpeta o archivo en .agents/skills. Revisa su contenido o usa una carpeta limpia." >&2
  exit 1
fi

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
