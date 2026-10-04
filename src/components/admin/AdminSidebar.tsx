"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { adminGroups, type AdminNavItem } from "@/lib/admin/nav";
import { adminDict } from "@/lib/i18n/admin";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref } from "@/lib/i18n/locales";

function hrefFor(item: AdminNavItem, locale: "ko" | "en"): string {
  const base = localizeHref(item.href, locale);
  if (!item.query) return base;
  return `${base}?${new URLSearchParams(item.query).toString()}`;
}

export default function AdminSidebar() {
  const pathname = usePathname() ?? "/admin";
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = adminDict[locale];

  const isActive = (item: AdminNavItem): boolean => {
    const base = localizeHref(item.href, locale);
    const pathMatch = item.exact
      ? pathname === base
      : pathname === base || pathname.startsWith(`${base}/`);
    if (!pathMatch) return false;
    if (!item.query) return true;
    return Object.entries(item.query).every(
      ([key, value]) => searchParams.get(key) === value,
    );
  };

  return (
    <nav
      aria-label={t.layout.title}
      className="sticky top-[104px] hidden max-h-[calc(100dvh-124px)] w-[210px] shrink-0 flex-col overflow-y-auto rounded-[4px] border border-black/10 bg-white p-2.5 pc:flex"
    >
      {adminGroups.map((group) => (
        <div key={group.key} className="mb-3 last:mb-0">
          <p className="px-3 pb-1 text-[11px] font-medium tracking-wide text-ink/40 uppercase">
            {t.groups[group.key]}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = isActive(item);
              return (
                <li key={hrefFor(item, locale)}>
                  <Link
                    href={hrefFor(item, locale)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center rounded-[3px] border px-3 py-2 text-[13px] leading-[1.4] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${
                      active
                        ? "border-brand bg-brand font-semibold text-white"
                        : "border-transparent text-ink/70 hover:border-black/15 hover:text-ink"
                    }`}
                  >
                    {t.nav[item.labelKey] ?? item.labelKey}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
