export type AdminNavGroupKey = "main" | "content" | "boards" | "manage";

export interface AdminNavItem {
  href: string;
  /** Optional query params (used by the grouped page-content editor). */
  query?: Record<string, string>;
  /** Match the path exactly (dashboard root). */
  exact?: boolean;
  /** Key into `adminDict.nav`. */
  labelKey: string;
}

export interface AdminNavGroup {
  key: AdminNavGroupKey;
  items: AdminNavItem[];
}

/**
 * Admin sidebar structure. Labels live in `adminDict` (`/lib/i18n/admin.ts`)
 * keyed by `labelKey`, so the whole dashboard is bilingual — same model as
 * MCell. Page content is grouped behind `/admin/pages?group=…`.
 */
export const adminGroups: AdminNavGroup[] = [
  {
    key: "main",
    items: [
      { href: "/admin", exact: true, labelKey: "/admin" },
      { href: "/admin/requests", labelKey: "/admin/requests" },
    ],
  },
  {
    key: "content",
    items: [
      {
        href: "/admin/pages",
        query: { group: "home" },
        labelKey: "pages:home",
      },
      {
        href: "/admin/pages",
        query: { group: "about" },
        labelKey: "pages:about",
      },
      {
        href: "/admin/pages",
        query: { group: "products" },
        labelKey: "pages:products",
      },
      {
        href: "/admin/pages",
        query: { group: "cases" },
        labelKey: "pages:cases",
      },
      {
        href: "/admin/interesting-items",
        labelKey: "/admin/interesting-items",
      },
    ],
  },
  {
    key: "boards",
    items: [
      { href: "/admin/news", labelKey: "/admin/news" },
      { href: "/admin/downloads", labelKey: "/admin/downloads" },
      { href: "/admin/case-studio", labelKey: "/admin/case-studio" },
      { href: "/admin/job-posting", labelKey: "/admin/job-posting" },
    ],
  },
  {
    key: "manage",
    items: [
      {
        href: "/admin/pages",
        query: { group: "site" },
        labelKey: "pages:site",
      },
    ],
  },
];
