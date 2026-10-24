# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio site for Nitesh Subedi (robotics/AI researcher). Plain static HTML + CSS + one small vanilla JS file, no build, no JS framework, no dependencies. Hosted on GitHub Pages; pushing to `main` auto-deploys to https://nitesh-subedi.github.io/.

## Running / testing
Open any `*.html` directly in a browser, or `python3 -m http.server` from the repo root. There is no build, lint, or test step.

## Structure
- `index.html`, `about.html`, `portfolio.html`, `contact.html` — the four pages. Nav (`<header><nav>`) is duplicated in each; edit all four when changing nav links.
- `style.css` — single stylesheet for the whole site. Apple-inspired design: SF Pro / Inter type, frosted-glass dark nav, black hero with a blue→violet→pink gradient (`--grad`, `.grad` text), alternating white / `--paper` (#f5f5f7) / black sections, pill buttons (`.btn`) and `.link-more ›` text links. All colors/spacing come from CSS variables in `:root` (`--primary`, `--link`, `--link-dark`, `--amber` for "New" accents, `--radius`/`--radius-lg`, `--ease`, `--transition`). Reuse the component classes rather than ad-hoc styles: `.ribbon` (announcement bar on home), `.spotlight` + `.venue-pill` + `.spotlight-points` (big product-style paper features), `.bento` + `.tile` (rounded tiles, `.span-2/4/6`, `.dark`, `.tile-media.cover`), `.proj-card` (`.featured-proj` = full-width stacked, `.wide` = full-width side-by-side, default = half-width card in the 2-col research grid), `.cta-band`, `.award-grid`. Signature element: the gradient hero trajectory SVG (`.hero-traj` in `index.html`) over a drifting glow; all motion is gated by `prefers-reduced-motion`.
- `app.js` — progressive-enhancement only (nav `.scrolled` state, IntersectionObserver scroll-reveal, `.zoom-in` image scale-in, stat count-up), loaded `defer` on all four pages. Adds the `.reveal` / `html.js-motion` hiding hooks itself, so the site is fully visible with JS disabled; bails early under `prefers-reduced-motion`.
- `images/` — assets grouped by project in subdirs (`lcla/`, `plant_manipulation/`, `quadcopter/`, `robocon/`).
- `*.pdf` (root) — CV (`NIteshCV-3.pdf`) and project reports, linked for download.
- `ICRA_Plant_Manipulation/`, `LCLA_RSS_2026/` — untracked source/paper material, not part of the deployed site.

## Conventions
- File/image names: lowercase with underscores.
- Layout uses Flexbox/Grid; keep it responsive (existing media queries in `style.css`).
- `GEMINI.md` holds the same project overview for Gemini CLI — keep it in sync if project facts change.
