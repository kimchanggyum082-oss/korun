"use client";

import { useMemo, useState } from "react";
import type { InterestingItem } from "@/lib/data";
import BoardCardGrid, { bodyText } from "@/components/service/BoardCardGrid";
import BoardSearch from "@/components/service/BoardSearch";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref } from "@/lib/i18n/locales";

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
  const locale = useLocale();
  const t = chrome[locale];
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => searchableText(item).includes(q));
  }, [items, query]);

  return (
    <>
      {/* PC board */}
      <div className="hidden pc:block">
        <div className="pc:pb-[15px]">
          <BoardCardGrid
            showLike
            showWriter
            items={filtered.map((item) => ({
              idx: item.idx,
              href: localizeHref(
                `/technology/interesting-items/${item.idx}`,
                locale,
              ),
              thumbnail: item.thumbnail,
              title: item.title,
              description: item.description,
              body: bodyText(item.blocks),
              date: item.date,
              views: item.views,
              author: item.author,
            }))}
          />
          <div className="mt-[15px] h-[41px] text-center">
            <BoardSearch
              query={query}
              onQueryChange={setQuery}
              ariaLabel={t.board.searchLabel("아이템")}
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
            showWriter
            items={filtered.map((item) => ({
              idx: item.idx,
              href: localizeHref(
                `/technology/interesting-items/${item.idx}`,
                locale,
              ),
              thumbnail: item.thumbnail,
              title: item.title,
              description: item.description,
              body: bodyText(item.blocks),
              date: item.date,
              views: item.views,
              author: item.author,
            }))}
          />
        </div>
        <div className="h-[55px]" />
      </div>
    </>
  );
}
