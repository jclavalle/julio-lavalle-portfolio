#!/usr/bin/env python3
"""Simulate the map's dot placement (mirrors lib/methodology.ts) and report problems.

Prints dots per era and per ring, any dot pushed outside its own era wedge,
and any pair of dots closer than 12px. Exit code 1 if there is a problem.
Keep the constants below in sync with lib/methodology.ts.
"""
import math, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
R0, STEP, CX, CY, MIN_GAP, CLAMP = 30, 26, 400, 400, 15, 142

s = (ROOT / "content/methodology.ts").read_text()
eras = [dict(zip(("a", "b", "lo", "hi", "label", "e1", "e2"), (float(a), float(b), float(lo), float(hi), lab, float(e1), float(e2))))
        for a, b, lo, hi, lab, e1, e2 in re.findall(
            r'\{ a: (-?[\d.]+), b: (-?[\d.]+), lo: ([\d.]+), hi: ([\d.]+), label: "([^"]*)", e1: (-?[\d.]+), e2: (-?[\d.]+) \}', s)]
body = s.split("export const SIGNALS")[1]
sig = [{"name": n, "ring": int(r), "date": float(d)}
       for n, r, d in re.findall(r'name: "((?:[^"\\]|\\.)*)",\s*ring: (\d),\s*date: ([\d.]+)', body)]

rmid = lambda k: R0 + (k - 0.5) * STEP
pt = lambda r, t: (CX + r * math.sin(math.radians(t)), CY - r * math.cos(math.radians(t)))

for e in eras:
    g = sorted([x for x in sig if e["lo"] <= x["date"] < e["hi"]], key=lambda x: (x["date"], x["ring"]))
    e["n"] = len(g)
    for i, x in enumerate(g):
        x["t0"] = e["a"] + (i + 0.5) / len(g) * (e["b"] - e["a"])
        x["era"] = e
offsets = [0, -6, 6]
for k in range(1, 9):
    for i, x in enumerate(sorted([x for x in sig if x["ring"] == k], key=lambda x: x["t0"])):
        x["rr"], x["th"] = rmid(k) + offsets[i % 3], x["t0"]
for _ in range(80):
    for k in range(1, 9):
        g = [x for x in sig if x["ring"] == k]
        for i in range(len(g)):
            for j in range(i + 1, len(g)):
                A, B = g[i], g[j]
                d = math.dist(pt(A["rr"], A["th"]), pt(B["rr"], B["th"]))
                if d < MIN_GAP:
                    push = ((MIN_GAP - d) / 2) / ((A["rr"] + B["rr"]) / 2) * 180 / math.pi + 0.2
                    if A["th"] <= B["th"]:
                        A["th"] -= push; B["th"] += push
                    else:
                        A["th"] += push; B["th"] -= push
                    A["th"] = max(-CLAMP, min(CLAMP, A["th"])); B["th"] = max(-CLAMP, min(CLAMP, B["th"]))

print(f"{len(sig)} dots")
for e in eras:
    rings = [sum(1 for x in sig if x.get("era") is e and x["ring"] == k) for k in range(1, 9)]
    print(f"  {e['label']:<30} {e['n']:>3} dots  {e['e2'] - e['e1']:>5.1f}°  per ring {rings}")
outside = [x for x in sig if not (x["era"]["e1"] < x["th"] < x["era"]["e2"])]
close = [(a["name"], b["name"]) for i, a in enumerate(sig) for b in sig[i + 1:]
         if math.dist(pt(a["rr"], a["th"]), pt(b["rr"], b["th"])) < 12]
for x in outside:
    print(f"OUTSIDE WEDGE  ring {x['ring']}  {x['name'][:60]}  ({x['th']:.1f}° vs {x['era']['e1']}..{x['era']['e2']})")
for a, b in close:
    print(f"OVERLAP  {a[:40]}  ×  {b[:40]}")
print("OK" if not (outside or close) else "PROBLEMS FOUND")
sys.exit(1 if outside or close else 0)
