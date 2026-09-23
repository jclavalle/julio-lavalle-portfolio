# Julio Lavalle — Portfolio

Next.js + MDX portfolio. Every project (case study or build) is one MDX
file in `content/projects/`. Add a file, push, and it appears on the site
automatically — no other code changes needed.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy (Vercel, free subdomain)

1. Push this folder to a new GitHub repo (public or private, your call).
2. Go to https://vercel.com, sign in with GitHub, click "Add New Project,"
   and import the repo.
3. Leave all settings on their defaults (Vercel auto-detects Next.js) and
   click Deploy.
4. You'll get a URL like `julio-lavalle-portfolio.vercel.app`. That's your
   site — no domain purchase required to start.

Every subsequent `git push` to your main branch redeploys automatically.
When you're ready for a custom domain later, it's a "Domains" tab in the
Vercel project settings — nothing about the codebase changes.

## Add a new project

1. Copy `content/TEMPLATE.mdx` into `content/projects/your-slug.mdx`.
2. Fill in the frontmatter (title, subtitle, track, org, role, period,
   status, stack, metrics, links) and the three body sections.
3. `git add`, `git commit`, `git push`.

That's the whole workflow — this is what "easy to upload future projects"
means in practice here.

## Before you publish

A few things are deliberately left as placeholders or flagged for you to
confirm — search the repo for `TODO` to find all of them:

- **Contact links** in `app/page.tsx` (email, LinkedIn, GitHub) are
  placeholders — replace with your real ones.
- **`content/projects/clade.mdx`** — the 0.8% failure-rate and 108%
  adoption-growth figures are hedged ("approximately") pending
  reconciliation against the original Clade data. Confirm before removing
  the hedge.
- **`content/projects/mibolsillo.mdx`** — deliberately has no user-count
  metric. Your source-of-truth doc flags 120K vs. 500K as unreconciled
  (120K actually belongs to Poupa Certo). Don't add a number here until
  that's resolved.
- **StableFlow and FeedbackFlow** are marked `in-progress` with short
  placeholder write-ups. When each project is finished, replace the body
  with the fuller README content you're already planning for each
  (architecture, failure states, what you learned) — the frontmatter
  structure won't need to change, just flip `status` to `"live"` and add
  `metrics`/`links` once you have real ones.

## Project structure

```
app/
  layout.tsx           — fonts + global metadata
  globals.css           — design tokens applied, MDX article styles
  page.tsx               — homepage (hero, ledger metrics, two project tracks)
  projects/[slug]/page.tsx — one project's detail page, driven by its MDX file
lib/
  projects.ts             — reads content/projects/*.mdx, no code changes needed to add projects
components/
  LedgerStrip.tsx         — the homepage's metric strip
  ProjectCard.tsx          — one project tile in the grid
content/
  TEMPLATE.mdx             — copy this to add a new project
  projects/*.mdx           — one file per project
DESIGN.md                   — the reasoning behind the palette/type choices
```

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · MDX via
`next-mdx-remote` + `gray-matter` — no headless CMS, no database. Content
lives in the git repo as plain files, which is also why it's easy to
extend with AI coding tools like Cursor or Claude Code: the whole content
model is just "add a markdown file."
