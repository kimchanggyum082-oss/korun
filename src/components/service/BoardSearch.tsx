"use client";

import { MagnifierIcon } from "@/components/service/ServiceIcons";

/**
 * Desktop board search box (220x34) that the original renders centred below
 * the list, plus the design's mobile equivalent.
 */
export default function BoardSearch({
  query,
  onQueryChange,
  ariaLabel,
  placeholder = "Search",
  onSubmit,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
  onSubmit?: () => void;
}) {
  return (
    <div className="text-center">
      {/* PC */}
      <form
        className="relative mx-auto hidden h-[34px] w-[220px] pc:block"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
        }}
        role="search"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          className="h-[34px] w-full border border-[rgba(0,0,0,0.1)] bg-white px-3 py-[6px] text-[14px] leading-[20px] text-[#212121] outline-none placeholder:text-[#999]"
        />
        <button
          type="submit"
          aria-label="검색"
          className="absolute right-1 top-0 flex h-[34px] w-[23px] items-center justify-center text-[#212121]"
        >
          <MagnifierIcon />
        </button>
      </form>

      {/* Mobile */}
      <div className="relative mx-auto max-w-[420px] pc:hidden">
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="검색"
          aria-label={ariaLabel}
          className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-11 pr-4 text-[14px] text-ink outline-none transition-colors focus:border-brand"
        />
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
          <MagnifierIcon />
        </span>
      </div>
    </div>
  );
}
