"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceNewsItem } from "@/lib/data";
import BoardSearch from "@/components/service/BoardSearch";
import BoardPagination from "@/components/service/BoardPagination";
import {
  CaretDownIcon,
  FlagIcon,
  HeartIcon,
} from "@/components/service/ServiceIcons";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref } from "@/lib/i18n/locales";

const PAGE_SIZE = 10;

const COLUMNS = "grid-cols-[62.5px_187.5px_637.5px_150px_125px_87.5px]";

export default function NewsList({ items }: { items: ServiceNewsItem[] }) {
  const locale = useLocale();
  const t = chrome[locale];
  const [category, setCategory] = useState<"ALL" | "NEWS" | "EVENT">("ALL");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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

  const catColor = (cat: string) => (cat === "EVENT" ? "#6ecc51" : "#00b8ff");

  const categories = [
    { key: "ALL", label: t.board.all },
    { key: "NEWS", label: "NEWS" },
    { key: "EVENT", label: "EVENT" },
  ] as const;

  return (
    <>
      {/* PC board */}
      <div className="hidden pc:block">
        <div className="pc:pt-[15px] pc:pb-[15px]">
          <div className="border-t border-[#363636]">
            <ul
              className={`grid h-[45px] ${COLUMNS} items-center border-b border-[rgba(54,54,54,0.3)] text-[15px] leading-[24px] text-[rgba(54,54,54,0.5)]`}
            >
              <li className="text-center">No</li>
              <li className="relative text-center">
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-expanded={menuOpen}
                  className="relative inline-block"
                >
                  {t.board.category}
                  <CaretDownIcon className="absolute left-full top-[8px] ml-[11px] text-[#363636]" />
                </button>
                {menuOpen && (
                  <div className="absolute left-1/2 top-[32px] z-10 w-[110px] -translate-x-1/2 border border-neutral-200 bg-white py-1 text-[13px] text-ink shadow">
                    {categories.map((c) => (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => {
                          setCategory(c.key);
                          setPage(1);
                          setMenuOpen(false);
                        }}
                        className="block w-full px-3 py-1.5 text-center hover:bg-neutral-50"
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>
              <li className="text-center">{t.board.title}</li>
              <li className="text-center">{t.board.date}</li>
              <li className="text-center">{t.board.views}</li>
              <li className="text-center">{t.board.likes}</li>
            </ul>

            {pageItems.map((item, i) => {
              const no = filtered.length - ((current - 1) * PAGE_SIZE + i);
              const notice = Boolean(item.notice);
              return (
                <Link
                  key={item.idx}
                  href={localizeHref(`/news/${item.idx}`, locale)}
                  className={`grid h-[45px] ${COLUMNS} items-center border-b border-[rgba(54,54,54,0.15)] text-[15px] leading-[24px] ${
                    notice ? "bg-[rgba(54,54,54,0.04)]" : ""
                  }`}
                >
                  <div className="text-center">
                    {notice ? <FlagIcon className="mx-auto" /> : no}
                  </div>
                  <div
                    className="text-center"
                    style={{ color: catColor(item.category) }}
                  >
                    <em className="not-italic pr-[5px]">{item.category}</em>
                  </div>
                  <div className="truncate pl-[7px] pr-[7px] text-[14px] leading-[22.4px] text-ink">
                    {item.title}
                  </div>
                  <div className="text-center text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                    {item.date}
                  </div>
                  <div className="text-center text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                    {item.views}
                  </div>
                  <div className="text-center text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                    {item.likes}
                  </div>
                </Link>
              );
            })}

            {pageItems.length === 0 && (
              <p className="border-b border-[rgba(54,54,54,0.15)] py-16 text-center text-[14px] text-[rgba(54,54,54,0.65)]">
                {t.board.empty}
              </p>
            )}
          </div>

          <div className="mt-[15px] h-[41px] text-center">
            <BoardSearch
              query={query}
              onQueryChange={(v) => {
                setQuery(v);
                setPage(1);
              }}
              ariaLabel={t.board.searchLabel("뉴스")}
            />
          </div>

          {totalPages > 1 && (
            <BoardPagination
              page={current}
              totalPages={totalPages}
              onChange={setPage}
            />
          )}
        </div>

        <div className="pc:h-[110px] pc:pt-[15px]">
          <div className="pc:h-[80px]" />
        </div>
      </div>

      {/* Mobile list */}
      <div className="pc:hidden">
        <div className="py-[7.5px]">
          <ul className="border-t border-[rgba(54,54,54,0.15)]">
            {pageItems.map((item) => {
              const notice = Boolean(item.notice);
              return (
                <li
                  key={item.idx}
                  className={`relative block border-b border-[rgba(54,54,54,0.15)] px-[15px] pt-[10px] pb-[15px] text-[15px] leading-[24px] ${
                    notice ? "bg-[rgba(54,54,54,0.04)]" : ""
                  }`}
                >
                  <Link
                    href={localizeHref(`/news/${item.idx}`, locale)}
                    className="absolute inset-0 z-[1]"
                  >
                    <span className="sr-only">{item.title}</span>
                  </Link>
                  <div className="relative block pr-[45px] text-left leading-[21px]">
                    {!notice && (
                      <a
                        className="text-[15px] leading-[21px]"
                        style={{ color: catColor(item.category) }}
                      >
                        <em className="not-italic pr-[5px]">{item.category}</em>
                      </a>
                    )}
                    {!notice && " "}
                    <span className="text-[18px] leading-[25.2px]">
                      {notice && (
                        <FlagIcon className="mr-[9.5px] inline-block h-[18px] w-[18px] align-middle text-[#363636]" />
                      )}
                    </span>
                    <a className="text-[14px] leading-[19.6px] text-[#363636]">
                      {item.title}
                    </a>
                  </div>
                  <div className="table-cell pt-[5px] pr-[10px] text-center text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                    {item.date}
                  </div>
                  <div className="table-cell pt-[5px] pr-[10px] text-center text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                    {t.board.views}
                    {item.views}
                  </div>
                  <div className="table-cell pt-[5px] pr-[10px] text-center text-[12px] leading-[19.2px] text-[rgba(54,54,54,0.65)]">
                    <HeartIcon className="mr-[3px] inline-block h-[12px] w-[13.7px] align-middle" />
                    {item.likes}
                  </div>
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <div className="mt-[10px]">
              <BoardPagination
                page={current}
                totalPages={totalPages}
                onChange={setPage}
              />
            </div>
          )}
        </div>
        <div className="h-[55px]" />
      </div>
    </>
  );
}
