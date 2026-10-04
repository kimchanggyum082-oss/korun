"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLocaleMenu from "@/components/admin/AdminLocaleMenu";
import { adminDict } from "@/lib/i18n/admin";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref } from "@/lib/i18n/locales";

type AdminShellProps = {
  email: string;
  children: React.ReactNode;
};

export default function AdminShell({ email, children }: AdminShellProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = adminDict[locale];
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace(localizeHref("/admin/login", locale));
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-[1280px] px-[15px] py-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[22px] font-bold text-ink">{t.layout.title}</h1>
            <p className="mt-1 truncate text-[13px] text-ink/60">{email}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <AdminLocaleMenu />
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="h-8 rounded-[3px] border border-black/10 bg-white px-3 text-[12px] font-semibold text-ink/70 transition-colors outline-none hover:border-black/20 hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/30 disabled:opacity-60"
            >
              {signingOut ? t.layout.signingOut : t.layout.signOut}
            </button>
          </div>
        </header>

        <div className="hidden pc:flex pc:items-start pc:gap-6">
          <AdminSidebar />
          <main className="min-w-0 flex-1">{children}</main>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 rounded-[6px] border border-black/10 bg-white px-6 py-16 text-center pc:hidden">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-ink/40"
            aria-hidden
          >
            <rect x="2" y="4" width="20" height="13" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          <p className="text-[16px] font-bold text-ink">
            {t.layout.desktopOnly}
          </p>
          <p className="max-w-[320px] text-[13px] leading-6 text-ink/60">
            {t.layout.desktopOnlyHint}
          </p>
        </div>
      </div>
    </div>
  );
}
