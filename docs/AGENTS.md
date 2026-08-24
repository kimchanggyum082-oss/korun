# AGENTS.md

Guide for AI coding agents working on this repository. Read this before making changes.

## Commands

```bash
npm run lint           # eslint — always run after edits
npx tsc --noEmit       # typecheck — always run after edits
npm run format         # prettier write — run before committing
npm run dev            # dev server at :3000
npm run build          # production build
```

After any code change, run `npm run lint` and `npx tsc --noEmit`. Both must pass.

## Architecture

### Content

All site content is hardcoded in `src/lib/data.ts` as `as const` typed objects. There is no CMS or database. To add or edit content, modify that file directly. Product pages are keyed by string IDs (`"21"`–`"24"`) and rendered by `src/app/[page]/page.tsx`, which calls `generateStaticParams` from `Object.keys(productPages)`.

### Routing

- `/` — homepage (`src/app/page.tsx`)
- `/21`, `/22`, `/23`, `/24` — product pages (`src/app/[page]/page.tsx`, `dynamicParams = false`)
- All other routes 404

### Layout

`src/app/layout.tsx` wraps every page with `<Header />` + `<main>` + `<Footer />`. The header has separate mobile (`pc:hidden`) and desktop (`hidden pc:block`) markup. The `pc` breakpoint is 992px, defined in `globals.css`.

### Product pages

Each product page renders 1–2 `ProductBlock`s via `ProductBlockView`. A block with `title` renders a page header; blocks without `title` render an `<hr>` separator (mobile only). The PC layout is a two-column grid (image | text); mobile is stacked.

### Images

All images come from `https://cdn.imweb.me` (allowed in `next.config.ts`). Use `next/image` with explicit `width`/`height` and `sizes`. Never import local images for product content.

## Style

- **Tailwind v4** — no `tailwind.config.js`; theme tokens live in `src/app/globals.css` under `@theme`. Custom colors: `ink`, `brand`, `brand-red`, `brand-teal`, `paper`. Custom breakpoint: `pc` (992px).
- **No comments** in source code unless explicitly requested by the user.
- **Prettier** is the formatter. Config in `.prettierrc.json` (markdown files use `proseWrap: preserve`).
- **Path alias**: import via `@/` (e.g. `@/lib/data`, `@/components/home/HeroSlider`).
- **Korean text** is written inline in JSX and data files. Do not introduce an i18n library.
- **Mobile-first**: write base styles for mobile, add `md:` and `pc:` variants for larger screens.

## Conventions for edits

- Read the full file before editing. Match existing patterns and naming.
- Prefer editing existing files over creating new ones.
- Do not create documentation files unless explicitly requested.
- Never commit changes unless the user explicitly asks.
- Run lint + typecheck after every edit. If a command fails, fix it before reporting back.

## Next.js version

This project uses Next.js 16. The `next dev` server regenerates agent rules into `AGENTS.md` at the repo root (see `node_modules/next/dist/server/lib/generate-agent-files.js`). If that file appears as an uncommitted change, it is expected — commit it or ignore it.