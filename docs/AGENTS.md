# AGENTS.md

Guide for AI coding agents working on this repository. Read this before making changes.

## Commands

```bash
npm run lint           # eslint — always run after edits
npx tsc --noEmit       # typecheck — always run after edits
npm run smoke          # content-layer smoke checks (no database required)
npm run format         # prettier write — run before committing
npm run dev            # dev server at :3000
npm run build          # production build
npm run db:generate    # regenerate Drizzle migrations from src/lib/db/schema.ts
```

After any code change, run `npm run lint` and `npx tsc --noEmit`. Both must pass.

## Architecture

### Content

Bundled default content lives in `src/lib/data.ts` as `as const` typed objects. The `src/lib/content/*` resolvers serve those defaults and, when `DATABASE_URL` is set, overlay rows from `content_entities` (`draft_json` / `published_json`). No database is required to render the public site — resolvers fall back to the bundled defaults (including when the database is unreachable).

The admin dashboard at `/admin` edits the overlay (save draft → publish), uploads images to Vercel Blob, and is gated by an admin session cookie. Entity keys are registered in `src/lib/admin/entities.ts`; `src/lib/admin/entity-store.ts` maps each key to its bundled default and load/edit flow.

Content leaves may be `{ ko, en }` localized values; resolvers apply `localizeTree(locale, …)` so English falls back to Korean when a translation is missing.

Product pages are keyed by string IDs (`"21"`–`"24"`) and rendered by `src/app/(site)/[page]/page.tsx`, which calls `generateStaticParams` from `Object.keys(productPages)`.

### Routing

- `/` — homepage (`src/app/(site)/page.tsx`)
- `/21`, `/22`, `/23`, `/24` — product pages (`src/app/(site)/[page]/page.tsx`, `dynamicParams = false`)
- `/about/*`, `/cases/[slug]`, `/case-studio`, `/news`, `/downloads`, `/technology/interesting-items`, `/search` — site sections
- `/admin` — dashboard (`src/app/(site)/admin/**`, session-gated) and `/admin/login` (`src/app/(auth)/admin/login`)
- `/api/admin/*` — content, upload, login, logout route handlers

### Layout

`src/app/(site)/layout.tsx` wraps every page with `<Header />` + `<main>` + `<Footer />`. The header has separate mobile (`pc:hidden`) and desktop (`hidden pc:block`) markup. The `pc` breakpoint is 992px, defined in `globals.css`.

### Product pages

Each product page renders 1–2 `ProductBlock`s via `ProductBlockView`. A block with `title` renders a page header; blocks without `title` render an `<hr>` separator (mobile only). The PC layout is a two-column grid (image | text); mobile is stacked.

### Images

Public product and asset images come from `https://cdn.imweb.me` (allowed in `next.config.ts`). Use `next/image` with explicit `width`/`height` and `sizes`. Never import local images for product content.

Admin uploads are written to Vercel Blob (`BLOB_READ_WRITE_TOKEN`). The upload route allowlists PNG/JPEG/GIF/WEBP by magic bytes and derives the stored extension/content type server-side.

### Admin auth

Session tokens are HS256 JWTs (`jose`) in an httpOnly cookie. Production requires `ADMIN_SESSION_SECRET` (32+ characters) and fails closed without it; environment credentials (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) take priority over database users. `.env.example` documents every variable.

## Style

- **Tailwind v4** — no `tailwind.config.js`; theme tokens live in `src/app/globals.css` under `@theme`. Custom colors: `ink`, `brand`, `brand-red`, `brand-teal`, `paper`. Custom breakpoint: `pc` (992px).
- **No comments** in source code unless explicitly requested by the user.
- **Prettier** is the formatter. Config in `.prettierrc.json` (markdown files use `proseWrap: preserve`).
- **Path alias**: import via `@/` (e.g. `@/lib/data`, `@/components/home/HeroSlider`).
- **Localized copy** is written inline in JSX and data files; do not introduce an i18n framework without an explicit request.
- **Mobile-first**: write base styles for mobile, add `md:` and `pc:` variants for larger screens.

## Conventions for edits

- Read the full file before editing. Match existing patterns and naming.
- Prefer editing existing files over creating new ones.
- Do not create documentation files unless explicitly requested.
- Never commit changes unless the user explicitly asks.
- Run lint + typecheck after every edit. If a command fails, fix it before reporting back.

## Next.js version

This project uses Next.js 16. The `next dev` server regenerates agent rules into `AGENTS.md` at the repo root (see `node_modules/next/dist/server/lib/generate-agent-files.js`). If that file appears as an uncommitted change, it is expected — commit it or ignore it.
