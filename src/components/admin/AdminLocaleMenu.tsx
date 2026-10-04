"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { adminDict } from "@/lib/i18n/admin";
import {
  LOCALE_COOKIE,
  getPathLocale,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/locales";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const OPTIONS: Array<{
  value: Locale;
  labelKey: "korean" | "english";
  code: string;
}> = [
  { value: "ko", labelKey: "korean", code: "KR" },
  { value: "en", labelKey: "english", code: "EN" },
];

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.4 3.9 5.6 3.9 9S14.5 18.6 12 21c-2.5-2.4-3.9-5.6-3.9-9S9.5 5.4 12 3Z" />
    </svg>
  );
}

/**
 * Admin language selector — globe button + dropdown (한국어 / English), the
 * same pattern as MCell's site header. Switching navigates between `/admin`
 * and `/en/admin` and remembers the choice in a cookie.
 */
export default function AdminLocaleMenu() {
  const pathname = usePathname() ?? "/admin";
  const router = useRouter();
  const locale = getPathLocale(pathname);
  const t = adminDict[locale].layout;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    // eslint-disable-next-line react-hooks/immutability -- locale cookie, not React state
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
    router.push(switchLocalePath(pathname, next));
    router.refresh();
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.language}
        className="flex items-center gap-1.5 rounded-full border border-black/15 px-2.5 py-1 text-[13px] leading-[18px] text-ink transition-colors outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-brand/30"
      >
        <GlobeIcon className="h-3.5 w-3.5" />
        <span className="font-medium">{locale === "ko" ? "KR" : "EN"}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={t.language}
          className="absolute right-0 top-[calc(100%+8px)] z-[1002] min-w-[150px] overflow-hidden rounded-md border border-black/10 bg-white py-1 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)]"
        >
          {OPTIONS.map((option) => {
            const active = option.value === locale;
            return (
              <li key={option.value} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => switchTo(option.value)}
                  className={`flex w-full items-center justify-between gap-3 px-3.5 py-2 text-left text-[13px] transition-colors hover:bg-black/5 ${
                    active ? "font-bold text-ink" : "text-ink/70"
                  }`}
                >
                  <span>
                    {t[option.labelKey]}
                    <span className="ml-1.5 text-[11px] text-ink/40">
                      {option.code}
                    </span>
                  </span>
                  {active && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden
                      className="shrink-0"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
