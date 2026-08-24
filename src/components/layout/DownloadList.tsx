"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import type { ServiceDownloadItem } from "@/lib/data";

export default function DownloadList({
  items,
}: {
  items: ServiceDownloadItem[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    );
  }, [items, query]);

  return (
    <>
      {/* Search */}
      <div className="relative mx-auto mb-8 max-w-[420px]">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색"
          aria-label="다운로드 검색"
          className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-11 pr-4 text-[14px] text-ink outline-none transition-colors focus:border-brand md:text-[15px]"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-[14px] text-neutral-500 md:text-[15px]">
          &ldquo;{query}&rdquo; 에 대한 검색 결과가 없습니다.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <li key={item.idx} className="h-full">
              <Link
                href={`/downloads/${item.idx}`}
                className="group block h-full overflow-hidden bg-white shadow-sm ring-1 ring-neutral-100 transition-all duration-300 hover:shadow-xl hover:ring-1 hover:ring-brand/30"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <SmartImage
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="m-3 rounded bg-white/90 px-3 py-1 text-[12px] font-semibold text-brand">
                      다운로드
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="line-clamp-2 text-[14px] font-bold leading-[1.4] text-ink md:text-[15px]">
                    {item.title}
                  </h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
