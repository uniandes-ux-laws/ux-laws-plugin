#!/usr/bin/env python3
"""Verificación posterior: compara originales, tablas y sellos sin pedir respuestas.

Auditoría del 12 de noviembre (B1). Tres cambios para que pase en un clon limpio:
- La verificación de los pilotos corre sobre el código archivado del cierre
  (historial/fuentes-g3-g6-2026-11-05, que contiene el SKILL.md de G3 de f7e4663)
  mediante scripts/verificar-pilotos-g3-g6.js, en vez de sobre HEAD.
- Todo se lee en UTF-8; en Windows Python usaba la codificación del sistema.
- No reescribe revisiones/g3-g6-2026-10-20/QA-CIERRE-21OCT.json: lo compara con lo
  que calcula y falla si difiere. Un verificador que reescribe su registro no puede
  detectar que cambió.
"""
import csv
import hashlib
import json
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def git(*args):
    return subprocess.check_output(["git", *args], cwd=ROOT)


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def cell(value):
    if value is None:
        return ""
    if isinstance(value, (dict, list)):
        return json.dumps(value, ensure_ascii=False, separators=(",", ":"))
    if isinstance(value, bool):
        return str(value).lower()
    return str(value)


def main():
    verified = json.loads(subprocess.check_output(
        ["node", "scripts/verificar-pilotos-g3-g6.js", "cierre"], cwd=ROOT).decode("utf-8"))
    nota_medicion = {v.pop("nota_medicion", None) for v in verified} - {None}
    assert all(v["pendientes"] == v["errores_tecnicos"] == 0 for v in verified)
    result = {"revision_posterior": True, "validacion_experta": False, "grupos": {}}
    sessions = set()
    for group in ("g3", "g6"):
        folder = ROOT / "pilotos" / f"{group}-2026-10-20"
        summary = json.loads((folder / "resumen.json").read_text(encoding="utf-8"))
        with (folder / "evaluaciones.csv").open(newline="", encoding="utf-8") as stream:
            rows = list(csv.DictReader(stream))
        assert len(rows) == len({row["id"] for row in rows}) == 120
        by_id = {row["id"]: row for row in summary["evaluaciones"]}
        counts, levels, errors = Counter(), Counter(), Counter()
        conventions = defaultdict(Counter)
        reviewed, reasons = [], defaultdict(list)
        for row in rows:
            key = row["id"]
            proof = json.loads((folder / "trazas" / f"{key}.json").read_text(encoding="utf-8"))
            original = folder / "respuestas" / f"{key}.json"
            raw = json.loads(original.read_text(encoding="utf-8"))
            assert proof["status"] == row["estado"] == by_id[key]["estado"]
            assert sha(original) == proof["raw_sha256"]
            assert proof["thread_id"] and proof["thread_id"] not in sessions
            sessions.add(proof["thread_id"])
            counts[proof["status"]] += 1
            errors.update(proof["errors"])
            reviewed.append({"id": key, "original_sha256": sha(original)})
            if row["estado"] == "invalido":
                assert all(row[field] == "" for field in
                           ("score", "not_applicable", "trigger", "evidence_insufficient"))
                assert json.loads(row["errores"]) == proof["errors"]
                continue
            for field, value in row.items():
                if field in {"id", "pagina", "repeticion", "estado", "errores", "anchor_audit"}:
                    continue
                assert value == cell(raw.get(field, raw["measurements"].get(field))), (group, key, field)
            assert json.loads(row["anchor_audit"]) == by_id[key]["anchor_audit"]
            if raw["score"] is not None:
                levels[raw["score"]] += 1
            if row["estado"] == "abstencion":
                reasons[row["pagina"]].append({"id": key, "motivo": raw["measurements"]["motivo_abstencion"]})
            if group == "g6":
                for convention in raw["measurements"]["convenciones"]:
                    state = "aplica" if convention["aplica"] is True else "no_aplica" if convention["aplica"] is False else "aplicabilidad_desconocida"
                    conventions[convention["id"]][state] += 1
                    if convention["aplica"] is True:
                        state = "cumple" if convention["cumple"] is True else "incumple" if convention["cumple"] is False else "cumplimiento_desconocido"
                        conventions[convention["id"]][state] += 1
        assert len(reviewed) == 120
        assert all(counts[state] == count for state, count in summary["estados"].items())
        assert [levels[level] for level in range(5)] == summary["niveles"]
        result["grupos"][group] = {
            "estados": dict(counts), "niveles": summary["niveles"],
            "csv_igual_a_originales": True, "csv_sha256": sha(folder / "evaluaciones.csv"),
            "originales_revisados": reviewed, "errores_registrados": dict(errors),
            "motivos_de_abstencion": dict(reasons),
            "convenciones": {key: dict(value) for key, value in conventions.items()},
        }
    scopes = ["calibracion", "captures", "corpus", "dorados", "pilotos"]
    previous = set(git("ls-tree", "-r", "--name-only", "d0ac313", "--", *scopes).decode().splitlines())
    changed = set(git("diff", "--name-only", "d0ac313", "--", *scopes).decode().splitlines())
    assert not previous.intersection(changed)
    seals = []
    for seal in sorted((ROOT / "pilotos").glob("*/SELLO-SHA256.tsv")):
        if seal.parent.name in {"g3-2026-10-20", "g6-2026-10-20"}:
            continue
        assert seal.read_bytes() == git("show", "d0ac313:" + seal.relative_to(ROOT).as_posix())
        seen = set()
        for line in seal.read_text(encoding="utf-8").splitlines():
            digest, name = line.split("\t")
            assert not Path(name).is_absolute() and ".." not in Path(name).parts and name not in seen
            seen.add(name)
            assert sha(seal.parent / name) == digest
        seals.append({"carpeta": seal.parent.name, "archivos": len(seen)})
    assert len(seals) == 8
    assert len(sessions) == 240
    result.update({"sesiones_distintas": len(sessions), "archivos_historicos_sin_cambios": len(previous),
                   "base_historica": "d0ac313", "sellos_anteriores": seals,
                   "verificacion_de_los_pilotos": verified})
    output = ROOT / "revisiones/g3-g6-2026-10-20/QA-CIERRE-21OCT.json"
    registrado = json.loads(output.read_text(encoding="utf-8"))
    assert registrado == result, "El cálculo no coincide con " + str(output.relative_to(ROOT))
    print(json.dumps({"sesiones": len(sessions), "originales_y_csv_comprobados": True,
                      "historicos_sin_cambios": len(previous), "sellos_anteriores": len(seals),
                      "informe_coincide": output.relative_to(ROOT).as_posix(),
                      "limite": sorted(nota_medicion)}, ensure_ascii=False))


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
