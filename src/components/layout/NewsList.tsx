"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceNewsItem } from "@/lib/data";

const PAGE_SIZE = 10;

export default function NewsList({ items }: { items: ServiceNewsItem[] }) {
  const [category, setCategory] = useState<"ALL" | "NEWS" | "EVENT">("ALL");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list =
      category === "ALL" ? items : items.filter((i) => i.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [items, category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (current - 1) * PAGE_SIZE,
    current * PAGE_SIZE,
  );

  const goCategory = (c: "ALL" | "NEWS" | "EVENT") => {
    setCategory(c);
    setPage(1);
  };

  const catColor = (cat: string) => (cat === "EVENT" ? "#6ecc51" : "#00b8ff");

  return (
    <>
      {/* Search */}
      <div className="relative mx-auto mb-6 max-w-[420px]">
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
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="검색"
          aria-label="뉴스 검색"
          className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-11 pr-4 text-[14px] text-ink outline-none transition-colors focus:border-brand md:text-[15px]"
        />
      </div>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(
          [
            { key: "ALL", label: "전체" },
            { key: "NEWS", label: "NEWS" },
            { key: "EVENT", label: "EVENT" },
          ] as const
        ).map((c) => {
          const active = category === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => goCategory(c.key)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                active
                  ? "bg-ink text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-neutral-200 bg-white">
        {/* Header (desktop) */}
        <div className="hidden grid-cols-[64px_120px_1fr_120px_90px_90px] border-b border-neutral-200 bg-neutral-50 text-[12px] font-semibold text-neutral-500 md:grid">
          <div className="px-3 py-3 text-center">No</div>
          <div className="px-3 py-3 text-center">카테고리</div>
          <div className="px-3 py-3 text-left">제목</div>
          <div className="px-3 py-3 text-center">작성시간</div>
          <div className="px-3 py-3 text-center">조회수</div>
          <div className="px-3 py-3 text-center">좋아요</div>
        </div>

        <ul>
          {pageItems.map((item, i) => {
            const no = filtered.length - ((current - 1) * PAGE_SIZE + i);
            return (
              <li
                key={item.idx}
                className="border-b border-neutral-100 last:border-0"
              >
                {/* Desktop row */}
                <Link
                  href={`/news/${item.idx}`}
                  className="hidden grid-cols-[64px_120px_1fr_120px_90px_90px] items-center px-3 py-4 text-[13px] transition-colors hover:bg-neutral-50 md:grid"
                >
                  <div className="text-center text-neutral-400">{no}</div>
                  <div
                    className="text-center font-semibold"
                    style={{ color: catColor(item.category) }}
                  >
                    {item.category}
                  </div>
                  <div className="truncate pr-3 font-medium text-ink">
                    {item.title}
                  </div>
                  <div className="text-center text-neutral-500">
                    {item.date}
                  </div>
                  <div className="text-center text-neutral-500">
                    {item.views}
                  </div>
                  <div className="text-center text-neutral-500">
                    {item.likes}
                  </div>
                </Link>

                {/* Mobile row */}
                <Link
                  href={`/news/${item.idx}`}
                  className="flex flex-col gap-1 px-3 py-4 transition-colors hover:bg-neutral-50 md:hidden"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="font-semibold"
                      style={{ color: catColor(item.category) }}
                    >
                      {item.category}
                    </span>
                    <span className="text-[12px] text-neutral-400">
                      {item.date}
                    </span>
                  </div>
                  <p className="font-medium text-ink">{item.title}</p>
                  <div className="text-[12px] text-neutral-400">
                    조회 {item.views} · 좋아요 {item.likes}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {pageItems.length === 0 && (
          <p className="py-16 text-center text-[14px] text-neutral-500">
            등록된 게시물이 없습니다.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="페이지 네비게이션"
          className="mt-8 flex items-center justify-center gap-1"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            className="flex h-9 min-w-9 items-center justify-center rounded border border-neutral-200 px-3 text-[13px] text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const active = p === current;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`flex h-9 min-w-9 items-center justify-center rounded border px-3 text-[13px] transition-colors ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {p}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={current === totalPages}
            className="flex h-9 min-w-9 items-center justify-center rounded border border-neutral-200 px-3 text-[13px] text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
          >
            다음
          </button>
        </nav>
      )}
    </>
  );
}
