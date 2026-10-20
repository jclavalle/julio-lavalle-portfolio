#!/usr/bin/env python3
"""Build one Method Log entry (JSON) for an approved map update.

Usage:
  log_entry.py "20 Oct 2026" extras.json > entry.json

Reads the signals under the `// <label> update` comment in content/methodology.ts and merges
extras.json, which holds what only the update session knows:
  {"headline": "...", "takeaways": ["..."], "status": [{"name","from","to","why"}],
   "tensions": [{"a","b","note"}], "housekeeping": ["..."],
   "sources": [{"show","date","title","url"}]}
`sources` may be omitted: it is then taken from .methodology-inbox/<date>/manifest.json.
"""
import datetime as dt, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
label, extras_path = sys.argv[1], sys.argv[2]
s = (ROOT / "content/methodology.ts").read_text()
date = dt.datetime.strptime(label, "%d %b %Y").date().isoformat()

block = s.split(f"// {label} update", 1)
if len(block) < 2:
    sys.exit(f"No '// {label} update' block in content/methodology.ts")
body = block[1].split("\n];", 1)[0]
added = [
    {"ring": int(r), "name": n.replace('\\"', '"'), "note": note.replace('\\"', '"'), "url": url}
    for n, r, note, url in re.findall(
        r'name: "((?:[^"\\]|\\.)*)",\s*ring: (\d),.*?note: "((?:[^"\\]|\\.)*)",.*?url: "([^"]*)"', body, re.S)
]
total = len(re.findall(r"^    ring: \d,", s, re.M))
extras = json.loads(Path(extras_path).read_text())
if "sources" not in extras:
    manifest = ROOT / ".methodology-inbox" / date / "manifest.json"
    extras["sources"] = [{k: m[k] for k in ("show", "date", "title", "url")} for m in json.loads(manifest.read_text())]
entry = {"date": date, "label": label, "added": added, "totalDots": total, **extras}
json.dump(entry, sys.stdout, indent=2, ensure_ascii=False)
print(f"\n{len(added)} signals, {total} dots total", file=sys.stderr)
