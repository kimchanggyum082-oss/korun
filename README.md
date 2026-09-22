# KORUN (코런)

Marketing website for **주식회사 코런**, a Korean hot runner system manufacturer. Built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript.

## Stack

- **Next.js 16** (App Router, server components; `generateStaticParams` for product/case/board pages)
- **React 19**, **TypeScript 5** (strict)
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css` via `@theme`)
- **Pretendard** variable font (Korean-optimized)
- **Drizzle ORM + Neon Postgres** (optional content overlay behind the admin dashboard)
- **Vercel Blob** (admin image uploads), **jose** + **bcryptjs** (admin auth)
- **ESLint 9** + **Prettier 3**

## Scripts

```bash
npm run dev          # start dev server (http://localhost:3000)
npm run build        # production build
npm run start        # serve production build
npm run lint         # eslint
npm run smoke        # content-layer smoke checks (no database required)
npm run format       # prettier --write .
npm run format:check # prettier --check .
npm run db:generate  # regenerate Drizzle SQL migrations from src/lib/db/schema.ts
npm run capture      # pixel-parity screenshots (reference/)
npm run compare      # pixel-parity diff (reference/)
```

## Project Structure

```
src/
├── app/
│   ├── (site)/                # public pages + /admin dashboard
│   ├── (auth)/admin/login/    # admin login
│   └── api/admin/             # content, upload, login, logout routes
├── components/
│   ├── home/ layout/ products/ ...   # public UI
│   └── admin/                 # dashboard shell, editors, fields
└── lib/
    ├── data.ts                # bundled default content (typed constants)
    ├── content/               # resolvers: DB overlay merged over defaults
    ├── admin/                 # entity registry, entity store, editor helpers
    ├── auth/                  # admin session (JWT) + credentials
    └── db/                    # Drizzle client + schema
drizzle/                       # generated SQL migrations
scripts/                       # smoke test + capture/compare tooling
```

## Content Model

Default content is bundled in `src/lib/data.ts` as typed constants. The `src/lib/content/*` resolvers serve those defaults and, when `DATABASE_URL` is set, overlay rows from `content_entities` (`draft_json` / `published_json`). Without a database the public site serves the bundled defaults unchanged — the database is never required to render the site.

The admin dashboard at `/admin` edits the overlay (draft → published) and uploads images to Vercel Blob. Content leaves may be `{ ko, en }` localized values; resolvers apply `localizeTree(locale, …)` so English falls back to Korean when a translation is missing.

## Environment

Copy `.env.example` to `.env.local`. Every variable is optional for local development; without them the site runs on bundled content and the admin falls back to development credentials.

| Variable                         | Purpose                                                                  |
| -------------------------------- | ------------------------------------------------------------------------ |
| `DATABASE_URL`                   | Neon Postgres pooled connection; enables the content overlay + revisions |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin credentials (env wins over database users)                         |
| `ADMIN_SESSION_SECRET`           | Session-cookie signing key; **required (32+ chars) in production**       |
| `BLOB_READ_WRITE_TOKEN`          | Vercel Blob token for admin image uploads                                |

## Image Hosting

Product and asset images are served from `https://cdn.imweb.me` (configured in `next.config.ts` `remotePatterns`). The `CDN` and `UPLOAD` base paths are defined at the top of `src/lib/data.ts`.

## Tailwind Theme

Custom design tokens are defined in `src/app/globals.css` under `@theme`:

| Token                | Value     | Usage                     |
| -------------------- | --------- | ------------------------- |
| `--color-ink`        | `#363636` | primary text              |
| `--color-brand`      | `#23463f` | brand dark green          |
| `--color-brand-red`  | `#c9072b` | accent / CTAs             |
| `--color-brand-teal` | `#0e5f53` | hover states              |
| `--color-paper`      | `#f7f7f7` | subtle backgrounds        |
| `--breakpoint-pc`    | `992px`   | desktop layout breakpoint |

## Conventions

- **Path alias**: `@/*` → `./src/*`
- **No comments** in source unless explicitly requested
- **Prettier** formatting is enforced; run `npm run format` before committing
- **Localized copy** is authored directly in JSX/data files; do not add an i18n framework without an explicit request
- **Responsive**: mobile-first with `pc:` breakpoint at 992px for desktop layouts
