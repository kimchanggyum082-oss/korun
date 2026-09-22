"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav, adminNavLeaves, type AdminNavItem } from "@/lib/admin/nav";

function isItemActive(pathname: string, item: AdminNavItem): boolean {
  if (item.children) {
    return item.children.some((child) => isItemActive(pathname, child));
  }
  if (item.href === "/admin") return pathname === "/admin";
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function NavLink({ item, pathname }: { item: AdminNavItem; pathname: string }) {
  const active = isItemActive(pathname, item);
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center rounded-[3px] px-3 py-2 text-[13px] leading-[1.4] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${
        active
          ? "bg-brand font-semibold text-white"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
      }`}
    >
      {item.ko}
    </Link>
  );
}

export function AdminNavStrip() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="관리자 메뉴"
      className="flex items-center gap-1 overflow-x-auto pb-1"
    >
      {adminNavLeaves.map((item) => {
        const active = isItemActive(pathname, item);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-[3px] border px-3 py-1.5 text-[12px] leading-[1.4] whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${
              active
                ? "border-brand bg-brand font-semibold text-white"
                : "border-neutral-200 bg-white text-neutral-600 hover:text-ink"
            }`}
          >
            {item.ko}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminSidebar({
  email,
  signingOut,
  onSignOut,
}: {
  email: string;
  signingOut: boolean;
  onSignOut: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="sticky top-[104px] hidden max-h-[calc(100dvh-124px)] w-[190px] shrink-0 flex-col overflow-y-auto rounded-[4px] border border-neutral-200 bg-white pc:flex">
      <div className="border-b border-neutral-200 px-3.5 py-3">
        <p className="text-[13px] leading-[1.4] font-bold text-ink">
          콘텐츠 관리
        </p>
      </div>

      <nav
        aria-label="관리자 메뉴"
        className="flex flex-1 flex-col gap-0.5 p-2.5"
      >
        {adminNav.map((item) =>
          item.children ? (
            <div key={item.href} className="mt-3 first:mt-0">
              <p className="px-3 pb-1.5 text-[10px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
                {item.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {item.children.map((child) => (
                  <NavLink key={child.href} item={child} pathname={pathname} />
                ))}
              </div>
            </div>
          ) : (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ),
        )}
      </nav>

      <div className="border-t border-neutral-200 px-3.5 py-3">
        <p className="truncate text-[11px] leading-[1.4] text-neutral-500">
          {email}
        </p>
        <button
          type="button"
          onClick={onSignOut}
          disabled={signingOut}
          className="mt-2 h-8 w-full rounded-[3px] border border-neutral-200 text-[12px] font-semibold text-neutral-600 transition-colors outline-none hover:border-neutral-300 hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/30 disabled:opacity-60"
        >
          {signingOut ? "로그아웃 중…" : "로그아웃"}
        </button>
      </div>
    </div>
  );
}
