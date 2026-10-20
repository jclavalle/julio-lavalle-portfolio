#!/usr/bin/env python3
"""Which podcast episodes has Julio listened to on Spotify?

  spotify.py auth                          # one-time: approve in the browser, key saved to macOS Keychain
  spotify.py listened --since 2026-10-06   # episodes of the tracked shows, with listening progress

Uses Spotify's Authorization Code flow with PKCE (no client secret) and only the
`user-read-playback-position` scope. The refresh token lives in the login Keychain under
service "methodology-spotify"; it never touches the repo.
"""
import argparse, base64, datetime as dt, hashlib, http.server, json, secrets, subprocess, sys, threading
import urllib.parse, urllib.request, webbrowser

CLIENT_ID = "6736b524187542bf8b019104c3a65100"
REDIRECT = "http://127.0.0.1:8888/callback"
SCOPE = "user-read-playback-position"
KEYCHAIN = ("methodology-spotify", "refresh_token")
# Shows to check: label -> Spotify show name (prefix match). To track another podcast, add it here
# and give fetch_sources.py a transcript source for it.
SHOWS = {"The AI Daily Brief": "The AI Daily Brief", "Lenny's Podcast": "Lenny's Podcast"}
LISTENED_SHARE = 0.8  # finished, or at least 80% through: used without asking
PARTIAL_SHARE = 0.1   # 10-80%: partly heard, ask Julio to confirm (partial listens can count)


def keychain_get():
    r = subprocess.run(["security", "find-generic-password", "-s", KEYCHAIN[0], "-a", KEYCHAIN[1], "-w"],
                       capture_output=True, text=True)
    return r.stdout.strip() or None


def keychain_set(token):
    subprocess.run(["security", "add-generic-password", "-U", "-s", KEYCHAIN[0], "-a", KEYCHAIN[1], "-w", token],
                   check=True, capture_output=True)


def token_request(fields):
    req = urllib.request.Request("https://accounts.spotify.com/api/token",
                                 data=urllib.parse.urlencode(fields).encode(),
                                 headers={"Content-Type": "application/x-www-form-urlencoded"})
    return json.loads(urllib.request.urlopen(req, timeout=30).read())


def auth():
    verifier = secrets.token_urlsafe(64)
    challenge = base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b"=").decode()
    state = secrets.token_urlsafe(16)
    got = {}

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            got.update({k: v[0] for k, v in q.items()})
            ok = "code" in got and got.get("state") == state
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            msg = "Spotify connected. You can close this tab." if ok else "Spotify did not connect: " + got.get("error", "unknown error")
            self.wfile.write(f"<p style='font:16px system-ui;margin:40px'>{msg}</p>".encode())
            threading.Thread(target=server.shutdown, daemon=True).start()

        def log_message(self, *a):
            pass

    server = http.server.HTTPServer(("127.0.0.1", 8888), Handler)
    url = "https://accounts.spotify.com/authorize?" + urllib.parse.urlencode({
        "client_id": CLIENT_ID, "response_type": "code", "redirect_uri": REDIRECT, "scope": SCOPE,
        "code_challenge_method": "S256", "code_challenge": challenge, "state": state})
    print("Opening Spotify's approval page. If it doesn't open, visit:\n" + url, flush=True)
    webbrowser.open(url)
    server.serve_forever()
    if got.get("state") != state or "code" not in got:
        sys.exit("Authorization failed: " + got.get("error", "state mismatch"))
    tok = token_request({"grant_type": "authorization_code", "code": got["code"], "redirect_uri": REDIRECT,
                         "client_id": CLIENT_ID, "code_verifier": verifier})
    keychain_set(tok["refresh_token"])
    print("Connected. Refresh token saved to the Keychain (service 'methodology-spotify').")


def access_token():
    refresh = keychain_get()
    if not refresh:
        sys.exit("Not connected to Spotify. Run: spotify.py auth")
    tok = token_request({"grant_type": "refresh_token", "refresh_token": refresh, "client_id": CLIENT_ID})
    if tok.get("refresh_token"):  # PKCE refresh tokens rotate; keep the newest
        keychain_set(tok["refresh_token"])
    return tok["access_token"]


def api(path, token):
    req = urllib.request.Request("https://api.spotify.com/v1" + path, headers={"Authorization": f"Bearer {token}"})
    return json.loads(urllib.request.urlopen(req, timeout=30).read())


def find_show(name, token):
    res = api("/search?" + urllib.parse.urlencode({"q": name, "type": "show", "limit": 5, "market": "BR"}), token)
    norm = lambda t: t.lower().replace("’", "'")
    for s in res["shows"]["items"]:
        if s and norm(s["name"]).startswith(norm(name)):
            return s
    sys.exit(f"Show not found on Spotify: {name}")


def listened(since, until):
    token = access_token()
    out = []
    for label, name in SHOWS.items():
        show = find_show(name, token)
        offset = 0
        while True:
            page = api(f"/shows/{show['id']}/episodes?limit=50&offset={offset}&market=BR", token)
            items = [e for e in page["items"] if e]
            for e in items:
                day = dt.date.fromisoformat(e["release_date"][:10])
                if not (since <= day <= until):
                    continue
                rp = e.get("resume_point") or {}
                pos, dur = rp.get("resume_position_ms", 0), e["duration_ms"]
                share = 1.0 if rp.get("fully_played") else pos / dur if dur else 0
                out.append({"show": label, "date": day.isoformat(), "title": e["name"],
                            "spotify": e["external_urls"]["spotify"], "fully_played": bool(rp.get("fully_played")),
                            "progress": round(share, 2), "listened": share >= LISTENED_SHARE,
                            "group": "finished" if share >= LISTENED_SHARE else "partial" if share >= PARTIAL_SHARE else "not started"})
            oldest = min((dt.date.fromisoformat(e["release_date"][:10]) for e in items), default=since)
            if not page.get("next") or oldest < since:
                break
            offset += 50
    out.sort(key=lambda x: (x["date"], x["show"]))
    return out


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("auth")
    p = sub.add_parser("listened")
    p.add_argument("--since", type=dt.date.fromisoformat, required=True)
    p.add_argument("--until", type=dt.date.fromisoformat, default=dt.date.today())
    p.add_argument("--json", action="store_true")
    a = ap.parse_args()
    if a.cmd == "auth":
        auth()
        return
    rows = listened(a.since, a.until)
    if a.json:
        print(json.dumps(rows, indent=2, ensure_ascii=False))
        return
    for group in ("finished", "partial", "not started"):
        g = [r for r in rows if r["group"] == group]
        print(f"\n{group.upper()} on Spotify ({len(g)})")
        for r in g:
            print(f"  {r['date']}  {int(r['progress'] * 100):>3}%  {r['show']}: {r['title'][:70]}")


if __name__ == "__main__":
    main()
