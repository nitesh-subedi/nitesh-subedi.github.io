# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio site for Nitesh Subedi (robotics/AI researcher). Plain static HTML + CSS + one small vanilla JS file, no build, no JS framework, no dependencies. Hosted on GitHub Pages; pushing to `main` auto-deploys to https://nitesh-subedi.github.io/.

## Running / testing
Open any `*.html` directly in a browser, or `python3 -m http.server` from the repo root. There is no build, lint, or test step.

## Structure
- `index.html`, `about.html`, `portfolio.html`, `contact.html` — the four pages. Nav (`<header><nav>`) is duplicated in each; edit all four when changing nav links.
- `style.css` — single stylesheet for the whole site. All colors/spacing come from CSS variables in `:root` (dark "control-systems" theme, signal-blue `--primary`, `--amber` for live/award accents). Use existing variables (`--bg`, `--primary`, `--accent`, `--mono`, `--radius`, `--transition`) and existing component classes (`.section`, `.feat-card`, `.skill-pill`, `.btn`, `.badge`) rather than ad-hoc styles. Data-like labels (eyebrows, stats, tags, dates, badges) use the `--mono` (JetBrains Mono) layer — keep that convention. Signature elements: blueprint grid (`body::before`) and the hero trajectory SVG (`.hero-traj` in `index.html`); all motion is gated by `prefers-reduced-motion`.
- `app.js` — progressive-enhancement only (IntersectionObserver scroll-reveal + stat count-up), loaded `defer` on all four pages. Adds the `.reveal` hiding class itself, so the site is fully visible with JS disabled; bails early under `prefers-reduced-motion`.
- `images/` — assets grouped by project in subdirs (`lcla/`, `plant_manipulation/`, `quadcopter/`, `robocon/`).
- `*.pdf` (root) — CV (`NIteshCV-3.pdf`) and project reports, linked for download.
- `ICRA_Plant_Manipulation/`, `LCLA_RSS_2026/` — untracked source/paper material, not part of the deployed site.

## Conventions
- File/image names: lowercase with underscores.
- Layout uses Flexbox/Grid; keep it responsive (existing media queries in `style.css`).
- `GEMINI.md` holds the same project overview for Gemini CLI — keep it in sync if project facts change.
