---
name: update-methodology
description: Weekly update of the "Verification-driven product building" map on Julio's homepage (content/methodology.ts, rendered by components/home/Methodology.tsx). Use when Julio asks to update or refresh the methodology map/chart/section, add signals from podcasts (The AI Daily Brief, Lenny's Podcast) or articles, process episode links he pastes, or when the Sunday scheduled run fires.
---

# Update the methodology map

The map is Julio's personal synthesis. You find and draft; **he decides**. Every update is **additive**: new signals go on top of the existing ones. Never rewrite, re-date or remove an existing signal unless he explicitly approves that specific change.

Scripts live in `scripts/` next to this file. Run them from the repo root.

## 1. Gather sources

- **Links pasted:** `python3 .claude/skills/update-methodology/scripts/fetch_sources.py URL [URL ...]` (Lenny's `/p/` links, `aidailybrief.ai/e/<date>` links, YouTube links).
- **No links (e.g. the scheduled run):** `python3 .claude/skills/update-methodology/scripts/fetch_sources.py`. It discovers episodes of both shows from 14 days before the current `SNAPSHOT` to today, and skips URLs in `.methodology-inbox/reviewed.txt`.
- Articles Julio sends: read them with WebFetch.

Transcripts land in `.methodology-inbox/<today>/` with a `manifest.json`. That folder is gitignored: transcripts are third-party content, so never commit them or quote them at length.

Notes on the sources:
- Lenny's posts are marked paid-only, but the transcript file is served publicly through the post API; that is the normal way the site shows it, and Julio confirmed he can see transcripts without a subscription.
- The AI Daily Brief site has `/e/<date>/transcript.md`. Some episodes exist only on YouTube; the script catches them from the channel feed and drops YouTube copies of episodes already fetched from the site.
- If YouTube blocks caption requests, fall back to opening the video's transcript panel in the built-in browser.

## 2. Confirm which episodes he listened to

Julio only feeds the map from episodes and articles he actually went through (a partial listen counts once he confirms it). Never draft candidates from a source he hasn't confirmed.

If the sources weren't hand-picked by him, check Spotify for the same window:
`python3 .claude/skills/update-methodology/scripts/spotify.py listened --since <same since date> --json`
(only the shows in its `SHOWS` list; the refresh token is in the macOS Keychain, service `methodology-spotify`; if it says "Not connected", ask Julio to run `spotify.py auth` and approve in the browser). Match Spotify episodes to the fetched transcripts by date (±1 day) and title; AI Daily Brief titles differ slightly between Spotify, YouTube and the site. Then present three groups:
- **Finished on Spotify** (≥80%): used without asking.
- **Partly heard** (10–80%), with the percentage: ask him to confirm or drop each.
- **Not started on Spotify** (<10%) and episodes only found on YouTube: list briefly, since he sometimes listens on other platforms.

Read nothing in depth until he answers; sources he doesn't confirm are dropped (still log them in `reviewed.txt` at the end so they don't come back).

## 3. Read and draft candidates

Read the current `SIGNALS` in `content/methodology.ts` first, then every chosen transcript in full (skip sponsor reads). Pull out signals that shape how to **build products with AI**, not general AI news.

A signal earns a candidate slot when it:
- changes a decision a product builder makes, and fits one of the 8 layers (`RINGS`);
- has a named person or source and a primary link;
- is not already on the map. If it only reinforces an existing dot, propose a status change instead (emerging `m` → converging `c` when several independent sources now agree).

Present one table per layer with: #, signal (`Title — Person`, date), why it matters (one plain sentence), and a recommendation: ✅ keep, 🤔 maybe, ✂️ cut (duplicate). Then list:
- optional status changes to existing dots (each needs his explicit OK);
- housekeeping: snapshot date, month rollover (step 5), anything stale.

Flag tensions with existing dots rather than hiding them (e.g. "Loops are scaffolding" vs "Loop engineering").

**Stop here and wait for Julio's decisions.** Unmentioned 🤔 items stay out.

## 4. Apply the approved changes

Append new entries at the end of `SIGNALS` under a `// <D Mon YYYY> update` comment, so the existing order (and `DEFAULT_SELECTED` in `lib/methodology.ts`) stays put. Entry format:

```ts
{
  name: "Short title — Person or source",
  ring: 1-8,
  date: 2026.771,          // year + day_of_year / 365, 3 decimals
  status: "m",             // new signals start as emerging unless Julio says otherwise
  when: "Oct 2026",        // "Mon YYYY", optionally " · Venue"
  note: "One or two plain sentences, under ~120 characters, in Julio's voice.",
  source: { type: "Podcast", cite: "The AI Daily Brief, 9 Oct 2026: <episode title>", url: "https://aidailybrief.ai/e/2026-10-09" },
},
```

Cite formats: `The AI Daily Brief, <D Mon YYYY>: <title>` (site URL, or the YouTube URL for YouTube-only episodes) and `Lenny’s Podcast, <D Mon YYYY>: <title>` (the `/p/` URL). Use curly apostrophes like the existing entries.

Then update `SNAPSHOT` (`"Snapshot · <D Mon YYYY>"`, the run date) and `AS_OF` (`long` / `short` month).

## 5. Month rollover

The last era is always the **current month** (`"<MONTH> 2026 SIGNALS"`). When the month changes:
- the previous last era's months fold into the `2026 · AGENTIC ENGINEERING` era (raise its `hi`);
- the last era gets `lo` = first day of the new month as a decimal year and the new label;
- in a new year, rename eras deliberately and ask Julio how to label them.

## 6. Rebalance and check the layout

Run `python3 .claude/skills/update-methodology/scripts/check_layout.py`. It mirrors the placement code and reports dots outside their era wedge or overlapping.

If it reports problems, resize the wedges in `ERAS`: share the 290° between `e1 = -145` (first era) and `e2 = 145` (last era) roughly in proportion to dot count, keep adjacent eras sharing a boundary, and set each era's `a`/`b` 3–5° inside its `e1`/`e2`. Divider lines follow `ERAS` automatically. Rerun until it prints `OK`.

## 7. Verify

- `npx next build` must pass.
- Start the `portfolio-dev` preview (`.claude/launch.json`), scroll to the map (`#method`), take a screenshot and send it to Julio. Check that the era labels read correctly, the snapshot and "as of" text are right, and selecting a new dot shows its card and source link.

## 8. Ship (only with his OK)

- Commit only `content/methodology.ts` (plus `lib/`/component files if you changed them) with a message like `Methodology snapshot · <D Mon YYYY>` and a short summary of what was added. Leave unrelated files alone.
- Push to `main` only when Julio says to publish. Vercel deploys `main` to production; check the commit status with `gh api repos/jclavalle/julio-lavalle-portfolio/commits/<sha>/status` until it reports `success`.
- Append every episode URL reviewed in this run (used or not) to `.methodology-inbox/reviewed.txt`.

## 9. Log the update in the Method Log

Julio keeps a private visual log of every update: https://claude.ai/artifact/4buwQYbDY4CpmwMLvUyy2J (one database document per update in the `updates` collection, id = the run date `YYYY-MM-DD`; the page renders the newest one on top with a mini map, takeaways, layers, what moved, sources, and a layer-activity grid across weeks).

1. Write `.methodology-inbox/<date>/log-extras.json` with: `headline` (one line), `takeaways` (3–5 plain sentences he should remember from this update), `status` (`{name, from, to, why}`), `tensions` (`{a, b, note}`), `housekeeping` (strings), and `sources` (`{show, date, title, url}` for the episodes and articles actually used). See `.methodology-inbox/2026-10-20/log-extras.json` for the shape.
2. Run `python3 .claude/skills/update-methodology/scripts/log_entry.py "<D Mon YYYY>" .methodology-inbox/<date>/log-extras.json > .methodology-inbox/<date>/log-entry.json`. It pulls the new signals from the `// <D Mon YYYY> update` block.
3. Write it with `ArtifactData` `set` (`url` above, `collection: "updates"`, `doc_id: "<date>"`, `file_path` the entry). Never change earlier entries. Then send Julio the link.

## Scheduled run (Sundays 18:00, São Paulo)

Nobody is watching when it starts. Do step 1 (discover and fetch), then stop at step 2: end with the three Spotify groups (finished, partly heard with %, not started) and ask him to confirm the partly heard ones, flag any not-started ones he heard elsewhere, and add any articles. Do not read transcripts in depth or draft candidates yet. Continue from step 3 only with the sources he confirms when he replies in that session. Do **not** edit `content/methodology.ts`, commit or push until he approves.
