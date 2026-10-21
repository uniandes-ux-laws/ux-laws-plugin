#!/usr/bin/env python3
"""Verificación posterior: compara originales, tablas y sellos sin pedir respuestas."""
import csv
import hashlib
import json
import subprocess
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
        ["node", "scripts/g3-g6-results.js", "verificar", "--verify-seal"], cwd=ROOT))
    assert all(v["pendientes"] == v["errores_tecnicos"] == 0 for v in verified)
    result = {"revision_posterior": True, "validacion_experta": False, "grupos": {}}
    sessions = set()
    for group in ("g3", "g6"):
        folder = ROOT / "pilotos" / f"{group}-2026-10-20"
        summary = json.loads((folder / "resumen.json").read_text())
        with (folder / "evaluaciones.csv").open(newline="") as stream:
            rows = list(csv.DictReader(stream))
        assert len(rows) == len({row["id"] for row in rows}) == 120
        by_id = {row["id"]: row for row in summary["evaluaciones"]}
        counts, levels, errors = Counter(), Counter(), Counter()
        conventions = defaultdict(Counter)
        reviewed, reasons = [], defaultdict(list)
        for row in rows:
            key = row["id"]
            proof = json.loads((folder / "trazas" / f"{key}.json").read_text())
            original = folder / "respuestas" / f"{key}.json"
            raw = json.loads(original.read_text())
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
        assert seal.read_bytes() == git("show", "d0ac313:" + str(seal.relative_to(ROOT)))
        seen = set()
        for line in seal.read_text().splitlines():
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
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"sesiones": len(sessions), "originales_y_csv_comprobados": True,
                      "historicos_sin_cambios": len(previous), "sellos_anteriores": len(seals),
                      "informe": str(output.relative_to(ROOT))}, ensure_ascii=False))


if __name__ == "__main__":
    main()
