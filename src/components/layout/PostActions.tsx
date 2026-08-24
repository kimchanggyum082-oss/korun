"use client";

import Link from "next/link";

export default function PostActions({ listHref }: { listHref: string }) {
  return (
    <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
      <div className="flex items-center gap-3">
        {/* Like */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-[13px] text-neutral-500 transition-colors hover:text-brand md:text-[14px]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          0
        </button>
        {/* Comment count */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-[13px] text-neutral-500 transition-colors hover:text-brand md:text-[14px]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          0
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 text-[13px] text-neutral-500 transition-colors hover:text-brand md:text-[14px]"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 text-[13px] text-neutral-500 transition-colors hover:text-brand md:text-[14px]"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Print
        </button>
        <Link
          href={listHref}
          className="ml-2 bg-ink px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand md:text-[14px]"
        >
          목록
        </Link>
      </div>
    </div>
  );
}
