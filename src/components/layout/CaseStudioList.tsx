"use client";

import { useMemo, useState } from "react";
import type { ServiceCaseStudioItem } from "@/lib/data";
import BoardCardGrid, { bodyText } from "@/components/service/BoardCardGrid";
import BoardSearch from "@/components/service/BoardSearch";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref } from "@/lib/i18n/locales";

export default function CaseStudioList({
  items,
}: {
  items: ServiceCaseStudioItem[];
}) {
  const locale = useLocale();
  const t = chrome[locale];
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
      {/* PC board */}
      <div className="hidden pc:block">
        <div className="pc:pb-[15px]">
          <BoardCardGrid
            showLike={false}
            showWriter={false}
            items={filtered.map((item) => ({
              idx: item.idx,
              href: localizeHref(`/case-studio/${item.idx}`, locale),
              thumbnail: item.thumbnail,
              title: item.title,
              description: item.description,
              body: item.summary ?? bodyText(item.blocks),
              date: item.date,
              views: item.views,
            }))}
          />
          <div className="mt-[15px] h-[41px] text-center">
            <BoardSearch
              query={query}
              onQueryChange={setQuery}
              ariaLabel={t.board.searchLabel("케이스 스튜디오")}
            />
          </div>
        </div>

        <div className="pc:h-[110px] pc:pt-[15px]">
          <div className="pc:h-[80px]" />
        </div>
      </div>

      {/* Mobile grid */}
      <div className="pc:hidden">
        <div className="pt-[7.5px] pb-[17.5px]">
          <BoardCardGrid
            showLike={false}
            showWriter={false}
            items={filtered.map((item) => ({
              idx: item.idx,
              href: localizeHref(`/case-studio/${item.idx}`, locale),
              thumbnail: item.thumbnail,
              title: item.title,
              description: item.description,
              body: item.summary ?? bodyText(item.blocks),
              date: item.date,
              views: item.views,
            }))}
          />
        </div>
        <div className="h-[55px]" />
      </div>
    </>
  );
}
