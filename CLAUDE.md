# camilojm27.github.io

Personal website for Camilo Mezú Mina. Built with Astro (blog template) and deployed to GitHub Pages via GitHub Actions.

## Stack

- **Astro** — static site generator, blog template
- **Vanilla JS** — language toggle (EN/ES)
- **Google Fonts** — Inter (body) + VT323 (footer)
- No CSS framework, no React

## Design

Minimal, light pergamino palette:
- `--bg: #f7f1e3` (main background)
- `--ink: #3a2f23` (text)
- `--ink-soft: #6b5a45` (muted text)
- `--accent: #8b5a2b` (hover states)
- `--rule: #d9cdb3` (borders, dividers)

Reference: [karrisaarinen.com](https://karrisaarinen.com/)

## i18n

Client-side EN/ES toggle. Language is persisted in `localStorage` under the key `lang`.

All translatable strings live in `src/i18n/translations.ts`. To add a string:

1. Add the key and both translations to `translations.ts`
2. Use `t(lang, 'key')` in `.astro` files
3. Add `data-en="..."` and `data-es="..."` attributes so the client-side script can swap on toggle

The `lang` prop flows from each page → Header → Footer.

## Project structure

```
src/
  i18n/translations.ts   ← all EN/ES strings
  components/
    BaseHead.astro        ← meta tags, global CSS import
    Header.astro          ← nav + language toggle script
    Footer.astro          ← VT323 footer
    FormattedDate.astro   ← date formatter (from template)
  layouts/
    BlogPost.astro        ← wraps blog posts
  pages/
    index.astro           ← home (description + abilities + links)
    projects/index.astro  ← projects page
    blog/index.astro      ← blog list
    blog/[...slug].astro  ← individual post
    about.astro           ← redirects to /
  content/
    blog/                 ← markdown posts
  styles/global.css       ← all styles (no framework)
```

## Dev

```bash
npm install
npm run dev       # localhost:4321
npm run build     # outputs to dist/
npm run preview   # preview built site
```

## Deployment

Push to `main` — GitHub Actions builds Astro and deploys to GitHub Pages.

**Important:** In the repo settings, set Pages source to **GitHub Actions** (not a branch).

## Adding a blog post

Create `src/content/blog/my-post.md`:

```md
---
title: 'Post title'
description: 'Short description for meta tags'
pubDate: '2024-01-15'
---

Content here...
```

Posts auto-appear in `/blog/` sorted by date, newest first. No hero images required.

## Content notes

- Focus on **abilities, not technologies** — describe what was achieved, not which framework was used
- Descriptions are en English by default; `data-es` attributes provide Spanish equivalents
- Blog posts are English only for now — add a `lang` frontmatter field if you want to filter by language later
