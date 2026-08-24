"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import type { InterestingItem } from "@/lib/data";

function searchableText(item: InterestingItem): string {
  const parts = [
    item.title,
    item.description,
    item.category,
    ...item.blocks
      .filter((b) => b.type === "text")
      .map((b) => (b.type === "text" ? b.content : "")),
  ];
  return parts.join(" ").toLowerCase();
}

export default function InterestingItemsList({
  items,
}: {
  items: InterestingItem[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => searchableText(item).includes(q));
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
          placeholder="아이템 검색"
          aria-label="아이템 검색"
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
                href={`/technology/interesting-items/${item.idx}`}
                className="group flex h-full flex-col overflow-hidden bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <SmartImage
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="inline-block w-fit bg-neutral-800 px-2 py-0.5 text-[11px] font-semibold text-white">
                    {item.category}
                  </span>
                  <h2 className="mt-2 line-clamp-2 text-[15px] font-bold leading-[1.4] text-ink md:text-[16px]">
                    {item.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-[1.6] text-neutral-500 md:text-[14px]">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 pt-3 text-[12px] text-neutral-400">
                    <span>{item.date}</span>
                    <span>·</span>
                    <span>조회 {item.views}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
