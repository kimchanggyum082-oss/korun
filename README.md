# KORUN (코런)

Marketing website for **주식회사 코런**, a Korean hot runner system manufacturer. Built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript.

## Stack

- **Next.js 16** (App Router, server components; `generateStaticParams` for product/case/board pages)
- **React 19**, **TypeScript 5** (strict)
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css` via `@theme`)
- **Pretendard** variable font (Korean-optimized)
- **Hand-rolled localization** (Korean at the existing root paths, English under `/en/*`; no i18n library — next-intl was evaluated and deliberately not adopted)
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
│   ├── (site)/[lang]/         # public pages; Korean at /, English at /en/*
│   ├── (admin)/admin/         # unlocalized dashboard (lang="ko"), login + (protected)/ pages
│   └── api/admin/             # content, upload, login, logout routes
├── components/
│   ├── home/ layout/ products/ ...   # public UI
│   └── admin/                 # dashboard shell, editors, fields
└── lib/
    ├── data.ts                # bundled default content (typed constants)
    ├── content/               # resolvers: DB overlay merged over defaults
    ├── i18n/                  # locales, client/server helpers, chrome, pages-*, seo
    ├── admin/                 # entity registry, entity store, editor helpers
    ├── auth/                  # admin session (JWT) + credentials
    └── db/                    # Drizzle client + schema
drizzle/                       # generated SQL migrations
scripts/                       # smoke test + capture/compare tooling
```

## Content Model

Default content is bundled in `src/lib/data.ts` as typed constants. The `src/lib/content/*` resolvers serve those defaults and, when `DATABASE_URL` is set, overlay rows from `content_entities` (`draft_json` / `published_json`). Without a database the public site serves the bundled defaults unchanged — the database is never required to render the site.

The admin dashboard at `/admin` edits the overlay (draft → published) and uploads images to Vercel Blob. Content leaves may be `{ ko, en }` localized values; the public resolvers unwrap them for every locale, including Korean, so a Korean page never receives a raw `{ ko, en }` object. English falls back to Korean when a translation is missing. Admin editors use the `LocalizedField` control and store `""` (fall back to the bundled default), `{ ko }`, or `{ ko, en }`.

## Localization

There is no i18n library — next-intl was evaluated and deliberately not adopted; localization is hand-rolled. Korean is served at the existing root paths (`/`, `/about`, `/21`, …) so Korean URLs stay unchanged for SEO and pixel parity; English is served under `/en/*`.

`src/app/(site)/[lang]/layout.tsx` is the public root layout (`<html lang>`) with `generateStaticParams()` for `["ko","en"]` and `dynamicParams = false`. The admin dashboard lives at the unlocalized route `/admin` under its own root layout `src/app/(admin)/admin/layout.tsx` (`lang="ko"`). `src/proxy.ts` guards the admin session cookie (redirect to `/admin/login`) and rewrites unprefixed public paths to `/ko<path>`; it does not auto-detect `Accept-Language` or redirect by cookie, so the default is always Korean.

Locale resolution lives in `src/lib/content/locale.ts`: `resolveActiveLocale(explicit?)` reads the `lang` root param via `next/root-params` and never throws (falling back to `ko`). Every public content resolver accepts an optional `locale`.

UI chrome strings are typed in `src/lib/i18n/chrome.ts` as `Record<Locale, ChromeDict>`, with the Korean copied verbatim from the components. Per-area page-level copy lives in `pages-*.ts` (a stopgap until the CMS covers it). Shared presentational components take a `t: ChromeDict` prop rather than importing `@/lib/i18n/server`. The admin edits both languages through the `LocalizedField` control.

Canonical URLs, hreflang alternates and the sitemap need a site URL from `NEXT_PUBLIC_SITE_URL` or `SITE_URL` (see `src/lib/i18n/seo.ts`); `sitemap.ts` and the alternates are omitted when it is unset.

## Environment

Copy `.env.example` to `.env.local`. Every variable is optional for local development; without them the site runs on bundled content and the admin falls back to development credentials.

| Variable                               | Purpose                                                                   |
| -------------------------------------- | ------------------------------------------------------------------------- |
| `DATABASE_URL`                         | Neon Postgres pooled connection; enables the content overlay + revisions  |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD`       | Admin credentials (env wins over database users)                          |
| `ADMIN_SESSION_SECRET`                 | Session-cookie signing key; **required (32+ chars) in production**        |
| `BLOB_READ_WRITE_TOKEN`                | Vercel Blob token for admin image uploads                                 |
| `NEXT_PUBLIC_SITE_URL` (or `SITE_URL`) | Absolute site URL for canonical URLs, hreflang alternates and the sitemap |

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
- **Localization** is hand-rolled (see Localization above); do not add an i18n framework without an explicit request
- **Responsive**: mobile-first with `pc:` breakpoint at 992px for desktop layouts
