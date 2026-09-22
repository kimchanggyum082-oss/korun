"use client";

import { Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localeSwitchHref, useLocale } from "@/lib/i18n/client";
import { chrome } from "@/lib/i18n/chrome";
import { locales } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";

const COOKIE_NAME = "korun_locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const shortLabels: Record<Locale, string> = {
  ko: "KR",
  en: "EN",
};

function setLocaleCookie(locale: Locale) {
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

type LocaleMenuProps = {
  variant?: "desktop" | "mobile";
  onSelect?: () => void;
};

export default function LocaleMenu({
  variant = "desktop",
  onSelect,
}: LocaleMenuProps) {
  const locale = useLocale();
  const t = chrome[locale];
  const pathname = usePathname();
  const router = useRouter();

  const mobile = variant === "mobile";

  const handleSelect = (next: Locale) => {
    if (next !== locale) {
      setLocaleCookie(next);
      router.push(localeSwitchHref(pathname, window.location.search, next));
      router.refresh();
    }

    onSelect?.();
  };

  const optionClassName = (value: Locale) =>
    `${mobile ? "px-1 py-0.5" : "px-[3px] py-1"} transition-colors ${
      value === locale
        ? "font-bold text-[#212121]"
        : `hover:text-[#212121] ${
            mobile ? "text-[#212121]/[0.89]" : "text-[#212121]/50"
          }`
    }`;

  return (
    <div
      role="group"
      aria-label={t.locale.label}
      className={`flex items-center leading-none ${
        mobile ? "gap-3 text-[14px]" : "gap-2 text-[13px]"
      }`}
    >
      {locales.map((value, index) => (
        <Fragment key={value}>
          {index > 0 && (
            <span aria-hidden className="h-[10px] w-px bg-[#e7e7e7]" />
          )}
          <button
            type="button"
            lang={value}
            aria-current={value === locale ? "true" : undefined}
            aria-label={t.locale.options[value]}
            onClick={() => handleSelect(value)}
            className={optionClassName(value)}
          >
            {shortLabels[value]}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
