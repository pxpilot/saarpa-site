# saarpa.com — Astro Site Context

> Every Claude session opened in this folder (VS Code or CLI) should read this first.
> **After any session that completes a TODO: mark it ✅ and add the date.**

---

## Project Overview

- **Goal:** Personal portfolio + blog for Saar Paamoni (`saarpa.com`)
- **Migrated from:** Wix (Thunderbolt) → Astro static site
- **Motivation:** Eliminate Wix ~$200–420/yr, improve Core Web Vitals, own the content
- **Deploy target:** Cloudflare Pages — ❌ NOT YET DEPLOYED
- **Dev URL:** `localhost:4321` via `npm run dev`

---

## Tech Stack

| | |
|---|---|
| Framework | Astro v5.16.5, Clay theme (minimalist image-first portfolio) |
| TypeScript | Strict mode (`astro/tsconfigs/strict`) |
| Content | Content Collections API with Zod schemas (`src/content/config.ts`) |
| PostCSS | `postcss-custom-properties`, `postcss-color-function`, `autoprefixer`, `postcss-easy-import` |
| Fonts | League Spartan (display/sans), EB Garamond (body/serif) — Google Fonts |
| Transitions | Astro `ClientRouter` (view transitions) |
| Sitemap | `@astrojs/sitemap` |

**Commands:**
- `npm run dev` → dev server at `localhost:4321`
- `npm run build` → static output in `dist/`

---

## Brand Tokens (`src/styles/vars.css`)

| Token | Light | Dark |
|---|---|---|
| Background (`--color-bg`) | `#FFF8F1` cream | `#1a1210` dark warm brown |
| Text (`--color-base`) | `#5B4D43` warm brown | `#e0d6cf` warm off-white |
| Accent/Primary (`--color-primary`) | `#8B2635` burgundy | `#c4697a` softer burgundy |
| Border (`--color-border`) | `#e0cfbe` warm | `#4a3f36` dark |

Dark mode: `data-theme="dark"` attribute on `<html>` + `localStorage` persistence (init in `Layout.astro`).

---

## Site Structure

**Routes:**
| Route | File |
|---|---|
| `/` | `src/pages/index.astro` |
| `/about` | `src/pages/about.astro` |
| `/art` | `src/pages/art/` |
| `/blog` | `src/pages/blog/` |
| `/consulting` | `src/pages/consulting.astro` ← new page (not on Wix) |
| `/contact` | `src/pages/contact.astro` |
| `/:slug` | `src/pages/[...slug].astro` — catch-all dispatching to templates |

**Content collections** (`src/content/`):
- `work/` — 7 paintings (`painting-1.md` … `painting-7.md`)
- `news/` — Blog posts (currently only `first-post.md` placeholder)
- `pages/` — Static page content (`bio.md`, `contact.md`, `index.md`, `news.md`, `work.md`, `elements.md`)

**Key files:**
- `src/content/config.ts` — Zod schemas (shared `commonSchema` for all collections)
- `src/layouts/Layout.astro` — Master layout (dark mode init, ClientRouter, meta tags)
- `src/pages/[...slug].astro` — Catch-all router dispatching to templates
- `src/styles/vars.css` — CSS variables (colors, fonts, breakpoints, sizes)
- `src/components/Header.astro` — Nav + dark mode toggle
- `src/components/Footer.astro` — Footer (currently says "Clay" — needs fix)
- `astro.config.mjs` — ✅ Updated site URL to `https://saarpa.com` (2026-03-04)
- `public/_headers` — ✅ Security headers for Cloudflare Pages (2026-03-04)

---

## Current Completion Status

- ✅ All pages built and styled
- ✅ Art gallery (7 paintings) with prev/next nav and video support
- ✅ Dark mode + responsive layout
- ✅ Consulting page (new — not on original Wix site)
- ⚠️ **Contact form (Google Forms):** Update `src/pages/contact.astro` — replace `YOUR_GOOGLE_FORM_EMBED_URL` with embed src from Google Forms → Send → Embed
- ⚠️ **Hero portrait:** Hero now uses `/img/homepage-me2.png` as circular portrait — replace with a close-cropped portrait photo if desired
- ⚠️ **Footer:** says "Clay" — fix `src/components/Footer.astro` line 4 (change "Clay" → "Saar Paamoni")
- ❌ **Cloudflare Pages:** not deployed — `astro.config.mjs` site URL updated to `saarpa.com` but not yet deployed
- ❌ **Blog posts:** only 2 posts (`first-post.md` placeholder + `youtube-playlist.md`) — migrate Wix posts to `src/content/news/*.md`
- ❌ **Art images:** verify all 7 paintings have correct image paths in `src/content/work/`
- ✅ **Netlify CMS /admin/ removed** (2026-03-04) — leftover from migration, now gone
- ✅ **astro.config.mjs site URL** fixed to `https://saarpa.com` (2026-03-04)
- ✅ **Security headers** added at `public/_headers` (2026-03-04)
- ✅ **Homepage redesigned** — split portrait + text hero, sharper copy, League Spartan 300 typography (2026-03-04)
- ✅ **All page copy rewritten** — about, consulting, contact (2026-03-04)

---

## Maintenance Protocol

After any session that completes a task above:
1. Mark the item ✅ with the date (e.g., `✅ 2026-03-04`)
2. Update the Site Structure section if new pages/collections were added
3. Add new TODOs discovered during work

After deploying to Cloudflare Pages:
- Update `astro.config.mjs` `site:` field with live URL
- Update this file: mark ❌ Cloudflare Pages as ✅ with the live URL
