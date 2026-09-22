"use client";

import { useMemo, useState } from "react";
import type { ServiceDownloadItem } from "@/lib/data";
import BoardCardGrid, { bodyText } from "@/components/service/BoardCardGrid";
import BoardSearch from "@/components/service/BoardSearch";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref } from "@/lib/i18n/locales";

export default function DownloadList({
  items,
}: {
  items: ServiceDownloadItem[];
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
            showLike
            showWriter={false}
            items={filtered.map((item) => ({
              idx: item.idx,
              href: localizeHref(`/downloads/${item.idx}`, locale),
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
              ariaLabel={t.board.searchLabel("다운로드")}
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
            showLike
            showWriter={false}
            items={filtered.map((item) => ({
              idx: item.idx,
              href: localizeHref(`/downloads/${item.idx}`, locale),
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
