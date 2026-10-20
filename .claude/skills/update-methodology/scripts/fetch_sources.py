#!/usr/bin/env python3
"""Fetch podcast transcripts for the methodology map update.

Usage:
  fetch_sources.py                      # discover episodes from 14 days before SNAPSHOT to today
  fetch_sources.py --since 2026-10-20   # discover from a given date (inclusive)
  fetch_sources.py URL [URL ...]        # fetch specific episodes only

Accepted URLs: lennysnewsletter.com/p/<slug>, aidailybrief.ai/e/<date>, youtube.com/watch?v=<id>.
Writes one Markdown file per episode plus manifest.json to .methodology-inbox/<today>/
(gitignored: transcripts are third-party content and must not be committed).
Discovery skips any URL listed in .methodology-inbox/reviewed.txt (episodes already reviewed);
the skill appends to that file once an update is approved.
"""
import argparse, datetime as dt, json, re, sys, urllib.error, urllib.request
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
UA = {"User-Agent": "Mozilla/5.0"}
LENNY_FEED = "https://api.substack.com/feed/podcast/10845.rss"
AIDB_YT_FEED = "https://www.youtube.com/feeds/videos.xml?channel_id=UCKelCK4ZaO6HeEI1KQjqzWA"


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read().decode()


def snapshot_date():
    s = (ROOT / "content/methodology.ts").read_text()
    m = re.search(r'SNAPSHOT = "Snapshot · (\d{1,2} \w{3} \d{4})"', s)
    return dt.datetime.strptime(m.group(1), "%d %b %Y").date()


# --- Lenny's Podcast: Substack post API exposes the transcript file with speaker names ---
def lenny(url):
    slug = url.split("/p/")[-1].split("?")[0].strip("/")
    d = json.loads(get(f"https://www.lennysnewsletter.com/api/v1/posts/{slug}"))
    tr = (d.get("podcastUpload") or {}).get("transcription") or {}
    src = tr.get("cdn_url")
    if not src:
        raise RuntimeError("no transcript on this post")
    if not src.split("?")[0].endswith(".json"):
        src = src.rstrip("/") + "/transcription.json"
    spk = tr.get("speaker_map") or {}
    lines, prev = [], None
    for x in json.loads(get(src)):
        who = spk.get(x.get("speaker"), x.get("speaker"))
        h, r = divmod(int(x.get("start", 0)), 3600)
        m, s = divmod(r, 60)
        txt = x.get("text", "").strip()
        if who != prev:
            lines.append(f"[{h:02d}:{m:02d}:{s:02d}] {who}: {txt}")
        else:
            lines[-1] += " " + txt
        prev = who
    date = d["post_date"][:10]
    return {"show": "Lenny's Podcast", "date": date, "title": d["title"], "url": url,
            "file": f"lenny-{date}-{slug}.md", "body": "\n\n".join(lines)}


def lenny_discover(since, until):
    feed = get(LENNY_FEED)
    out = []
    for link, pub in re.findall(r"<item>.*?<link>(.*?)</link>.*?<pubDate>(.*?)</pubDate>", feed, re.S):
        day = parsedate_to_datetime(pub).date()
        if since <= day <= until:
            out.append(link.strip())
    return out


# --- AI Daily Brief: the site serves /e/<date>/transcript.md for days with an episode ---
def aidb(date):
    try:
        body = get(f"https://aidailybrief.ai/e/{date}/transcript.md")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise
    title = re.search(r"^# (.*?)(?: — Transcript.*)?$", body, re.M)
    return {"show": "The AI Daily Brief", "date": date, "title": title.group(1) if title else date,
            "url": f"https://aidailybrief.ai/e/{date}", "file": f"aidb-{date}.md", "body": body}


# --- YouTube (AI Daily Brief episodes missing from the site) ---
def youtube(vid):
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
    except ImportError:
        sys.exit("youtube-transcript-api missing: python3 -m pip install --user youtube-transcript-api")
    meta = json.loads(get(f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"))
    page = get(f"https://www.youtube.com/watch?v={vid}")
    m = re.search(r'"(?:publishDate|uploadDate)":"([\d-]{10})', page)
    date = m.group(1) if m else "unknown"
    lines = []
    for x in YouTubeTranscriptApi().fetch(vid):
        h, r = divmod(int(x.start), 3600)
        mm, s = divmod(r, 60)
        lines.append(f"[{h:02d}:{mm:02d}:{s:02d}] {x.text}")
    return {"show": meta["author_name"], "date": date, "title": meta["title"],
            "url": f"https://www.youtube.com/watch?v={vid}", "file": f"yt-{date}-{vid}.md", "body": "\n".join(lines)}


def yt_discover(since, until):
    feed = get(AIDB_YT_FEED)
    out = []
    for vid, pub in re.findall(r"<yt:videoId>(.*?)</yt:videoId>.*?<published>(.*?)</published>", feed, re.S):
        if since <= dt.date.fromisoformat(pub[:10]) <= until + dt.timedelta(days=1):
            out.append(vid)
    return out


def shingles(text, n=8):
    words = re.findall(r"[a-z']+", re.sub(r"\[[\d:]+\]", " ", text.lower()))
    return {" ".join(words[i:i + n]) for i in range(0, max(len(words) - n, 0), 3)}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("urls", nargs="*")
    ap.add_argument("--since", type=dt.date.fromisoformat)
    ap.add_argument("--until", type=dt.date.fromisoformat, default=dt.date.today())
    ap.add_argument("--out", type=Path)
    a = ap.parse_args()
    out = a.out or ROOT / ".methodology-inbox" / dt.date.today().isoformat()
    out.mkdir(parents=True, exist_ok=True)

    lenny_urls, aidb_dates, yt_ids = [], [], []
    if a.urls:
        for u in a.urls:
            if "lennysnewsletter.com/p/" in u:
                lenny_urls.append(u)
            elif m := re.search(r"aidailybrief\.ai/e/([\d-]{10})", u):
                aidb_dates.append(m.group(1))
            elif m := re.search(r"(?:v=|youtu\.be/)([\w-]{11})", u):
                yt_ids.append(m.group(1))
            else:
                print(f"SKIP unrecognised URL: {u}")
    else:
        since = a.since or snapshot_date() - dt.timedelta(days=14)
        print(f"Discovering episodes {since} → {a.until}")
        lenny_urls = lenny_discover(since, a.until)
        d = since
        while d <= a.until:
            aidb_dates.append(d.isoformat())
            d += dt.timedelta(days=1)
        yt_ids = yt_discover(since, a.until)

    eps = []
    for fn, args in [(lenny, u) for u in lenny_urls] + [(aidb, d) for d in aidb_dates]:
        try:
            ep = fn(args)
            if ep:
                eps.append(ep)
        except Exception as e:
            print(f"FAIL {args}: {e}")
    site = [shingles(e["body"]) for e in eps if e["show"] == "The AI Daily Brief"]
    for vid in yt_ids:
        try:
            ep = youtube(vid)
        except Exception as e:
            print(f"FAIL youtube {vid}: {e}")
            continue
        sh = shingles(ep["body"])
        if not a.urls and any(len(sh & s) / max(len(sh), 1) > 0.15 for s in site):
            continue  # same episode already fetched from aidailybrief.ai
        eps.append(ep)

    reviewed_file = ROOT / ".methodology-inbox" / "reviewed.txt"
    reviewed = set(reviewed_file.read_text().split()) if reviewed_file.exists() else set()
    if not a.urls:
        skipped = [e for e in eps if e["url"] in reviewed]
        eps = [e for e in eps if e["url"] not in reviewed]
        if skipped:
            print(f"Skipped {len(skipped)} already-reviewed episodes")

    manifest = []
    for ep in sorted(eps, key=lambda e: e["date"]):
        head = f"# {ep['title']}\nShow: {ep['show']}\nDate: {ep['date']}\nSource: {ep['url']}\n\n"
        (out / ep["file"]).write_text(head + ep["body"])
        words = len(ep["body"].split())
        manifest.append({k: ep[k] for k in ("show", "date", "title", "url", "file")} | {"words": words})
        print(f"OK {ep['date']}  {words:>6} words  {ep['show']}: {ep['title'][:70]}")
    (out / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
    print(f"\n{len(manifest)} episodes → {out}")


if __name__ == "__main__":
    main()
