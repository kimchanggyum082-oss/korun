# KORUN (코런)

Marketing website for **주식회사 코런**, a Korean hot runner system manufacturer. Built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript.

## Stack

- **Next.js 16** (App Router, static export of product pages via `generateStaticParams`)
- **React 19**, **TypeScript 5** (strict)
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css` via `@theme`)
- **Pretendard** variable font (Korean-optimized)
- **ESLint 9** + **Prettier 3**

## Scripts

```bash
npm run dev          # start dev server (http://localhost:3000)
npm run build        # production build
npm run start        # serve production build
npm run lint         # eslint
npm run format       # prettier --write .
npm run format:check # prettier --check .
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # root layout (Header + main + Footer)
│   ├── page.tsx             # homepage
│   ├── globals.css          # tailwind import + @theme tokens
│   └── [page]/page.tsx      # dynamic product pages (/21, /22, /23, /24)
├── components/
│   ├── home/                # homepage sections (Hero, Products, CTA, Lists, Values, Location)
│   ├── layout/              # Header, Footer, ProductNav
│   └── products/            # ProductBlockView (renders a product block)
└── lib/
    └── data.ts              # all site content: nav, company, products, news, downloads
```

## Content Model

All site content lives in `src/lib/data.ts` as typed constants — no CMS, no database. Product pages are keyed by numeric IDs (`"21"`, `"22"`, `"23"`, `"24"`) and rendered by `src/app/[page]/page.tsx` via `generateStaticParams`.

## Image Hosting

Product and asset images are served from `https://cdn.imweb.me` (configured in `next.config.ts` `remotePatterns`). The `CDN` and `UPLOAD` base paths are defined at the top of `src/lib/data.ts`.

## Tailwind Theme

Custom design tokens are defined in `src/app/globals.css` under `@theme`:

| Token            | Value     | Usage                       |
| ---------------- | --------- | --------------------------- |
| `--color-ink`    | `#363636` | primary text                |
| `--color-brand`  | `#23463f` | brand dark green            |
| `--color-brand-red`   | `#c9072b` | accent / CTAs          |
| `--color-brand-teal`  | `#0e5f53` | hover states           |
| `--color-paper`  | `#f7f7f7` | subtle backgrounds          |
| `--breakpoint-pc`| `992px`   | desktop layout breakpoint   |

## Conventions

- **Path alias**: `@/*` → `./src/*`
- **No comments** in source unless explicitly requested
- **Prettier** formatting is enforced; run `npm run format` before committing
- **Korean copy** is authored directly in JSX/data files (no i18n framework)
- **Responsive**: mobile-first with `pc:` breakpoint at 992px for desktop layouts