"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/service/ServiceIcons";

/**
 * Board pagination: 24x24 cells, 3px gaps, the active page in bold, inside a
 * 64px tall block (20px margins). Identical on mobile and desktop.
 */
export default function BoardPagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="페이지 네비게이션" className="h-[64px] text-center">
      <ul className="my-[20px] inline-flex h-[24px] items-center">
        <li className="text-center">
          <button
            type="button"
            onClick={() => onChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex h-[24px] w-[24px] items-center justify-center text-[14px] leading-[24px] text-[rgba(54,54,54,0.4)] disabled:cursor-default"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="-mt-[2px] [stroke-width:1.6]" />
          </button>
        </li>
        {pages.map((p) => {
          const active = p === page;
          return (
            <li key={p} className="mx-[3px] text-center">
              <button
                type="button"
                onClick={() => onChange(p)}
                aria-current={active ? "page" : undefined}
                className={`flex h-[24px] w-[24px] items-center justify-center text-[14px] leading-[24px] ${
                  active ? "font-bold text-ink" : "text-[rgba(54,54,54,0.4)]"
                }`}
              >
                {p}
              </button>
            </li>
          );
        })}
        <li className="text-center">
          <button
            type="button"
            onClick={() => onChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="flex h-[24px] w-[24px] items-center justify-center text-[14px] leading-[24px] text-[rgba(54,54,54,0.4)] disabled:cursor-default"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="-mt-[2px] [stroke-width:1.6]" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
