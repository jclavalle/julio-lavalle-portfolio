# Design notes

The site is built around one idea: you're pitching two things at once — the
**story** (founder, product leader, 12+ years of judgment) and the **receipts**
(verified numbers, stack, dates). The design gives each one its own voice
instead of blending them.

## Type

- **Fraunces** (serif) carries the narrative: headlines, case-study prose.
  It has more character than a default Georgia/Times pairing without
  tipping into a display-only novelty face.
- **IBM Plex Mono** carries the ledger: dates, metrics, stack tags,
  navigation. Anywhere a number or a piece of metadata appears, it's in
  mono — deliberately, because the site's whole pitch rests on those
  numbers being real and specific, not because monospace "looks technical."

Two families, two distinct and legible jobs — not decoration.

## Color

- `ink` (#10141C) — background. A deep navy, not pure black and not the
  warm-cream-plus-serif combination that's become the generic "AI portfolio"
  look.
- `paper` (#EDE9DE) — primary text color. Warm, but used as ink-on-dark
  rather than as a background, which is the inversion that keeps this from
  reading like the cliché.
- `accent` (#5FA88C) — a single desaturated green, used sparingly for links
  and hover states. It's a quiet nod to "positive number in green" from
  financial statements, without being a bright/neon accent.
- `warm` (#D9A868) — reserved for exactly one thing: the "in progress"
  badge. Don't reuse it elsewhere or it stops meaning anything.

## Layout

Left-aligned, single column, generous margins, body copy capped at ~68
characters per line (`max-w-prose`). No card-grid-with-matching-shadows
treatment — project tiles use a plain hairline border that turns the
accent color on hover, nothing else.

The homepage's only numbered/sequenced element should be an actual
chronology (e.g., a career timeline, if you add one) — don't add numbered
markers to the project grid, since it isn't a sequence.

## What to change confidently

- The palette and type choices are a starting point, not a constraint —
  if you want a different feel, change the tokens in `tailwind.config.ts`
  and the two font imports in `app/layout.tsx`; nothing else needs to
  change.
- Motion: there currently isn't any beyond the hover border-color
  transition. If you add a hero entrance animation, keep it to one
  orchestrated moment rather than fading in every section.
