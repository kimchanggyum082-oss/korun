"use client";

import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";

type SearchOverlayProps = {
  open: boolean;
  action?: string;
  onClose: () => void;
};

export default function SearchOverlay({
  open,
  action = "/search",
  onClose,
}: SearchOverlayProps) {
  const t = chrome[useLocale()];

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 text-white">
      <form action={action} method="get" className="px-[15px] pt-[200px]">
        <input type="hidden" name="type" value="" />
        <button
          type="button"
          aria-label={t.search.close}
          onClick={onClose}
          className="absolute right-0 top-0 flex h-[46px] w-[46px] items-center justify-center p-[15px] text-white md:h-[90px] md:w-[90px] md:p-[30px]"
        >
          <svg
            className="h-4 w-4 md:h-[30px] md:w-[30px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden
          >
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>

        <div className="relative mx-auto w-full max-w-[740px]">
          <input
            id="search_input"
            type="text"
            name="keyword"
            placeholder={t.search.placeholder}
            autoComplete="off"
            title={t.search.label}
            className="w-full border-b border-white bg-transparent py-2 pr-[25px] text-[16px] leading-[1.42857] text-white outline-none placeholder:text-white/60 md:border-white/20 md:py-[15px] md:pr-[35px] md:text-[25px]"
          />
          <button
            type="submit"
            aria-label={t.search.submit}
            className="absolute right-0 top-0 flex h-[40px] items-center text-white md:h-full"
          >
            <svg
              className="h-4 w-4 md:h-[25px] md:w-[25px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
