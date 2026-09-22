"use client";

import Link from "next/link";
import { HeartIcon } from "@/components/service/ServiceIcons";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";

export type BoardCardItem = {
  idx: string;
  href: string;
  thumbnail: string;
  title: string;
  body: string;
  date: string;
  views: number;
  author?: string;
};

export function bodyText(blocks: { type: string; content?: string }[]): string {
  return blocks
    .filter((block) => block.type === "text")
    .map((block) => block.content ?? "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
}

/**
 * The original "grid_02 type_grid img_border" post grid. Mobile is the imweb
 * card list: two 172.5px cards per row with a 15px gutter, a 133px bordered
 * thumbnail, a 20/10px body, an optional like row and a date/views summary.
 * Desktop keeps the four 320px columns (290px cards, 221px thumbnails).
 */
export default function BoardCardGrid({
  items,
  showLike,
  showWriter,
}: {
  items: BoardCardItem[];
  showLike: boolean;
  showWriter: boolean;
}) {
  const t = chrome[useLocale()];

  return (
    <ul className="grid grid-cols-2 items-start gap-[15px] pc:-mx-[15px] pc:flex pc:flex-wrap pc:gap-0">
      {items.map((item) => (
        <li key={item.idx} className="pc:h-auto pc:w-[320px] pc:p-[15px]">
          <Link href={item.href} className="group flex flex-col pc:block">
            <div
              className="relative h-[133px] w-full overflow-hidden border border-[#eee] bg-neutral-100 bg-cover bg-center bg-no-repeat pc:aspect-auto pc:h-[221px] pc:w-[290px]"
              style={{ backgroundImage: `url(${item.thumbnail})` }}
              role="img"
              aria-label={item.title}
            />
            <div className="pt-[20px] pb-[10px]">
              <h2 className="text-[14px] leading-[18.2px] text-black pc:line-clamp-2 pc:font-normal">
                {item.title}
              </h2>
              <p className="mt-[5px] line-clamp-5 text-[12px] leading-[16.8px] text-[#757575] pc:line-clamp-3">
                {item.body}
              </p>
            </div>
            {showLike && (
              <div className="h-[43.8px] pt-[3px] text-[13px] leading-[20.8px] text-ink">
                <span className="inline-flex items-center">
                  <HeartIcon className="mr-[3px] h-[12px] w-[13.7px] pc:h-[13px] pc:w-[15px]" />
                  <em className="not-italic">0</em>
                </span>
              </div>
            )}
            <div className="block pb-[20px] text-[11px] leading-[15.6px] text-[#757575] pc:text-[13px] pc:text-[#5d5d5d]">
              {showWriter && item.author ? (
                <div className="h-[14.4px] text-[12px] leading-[14.4px] text-[#757575]">
                  {item.author}
                </div>
              ) : null}
              <div>
                <span className="mr-[4px] text-[11px] leading-[13.2px]">
                  {item.date}{" "}
                </span>
                <span className="text-[11px] leading-[13.2px]">
                  <i className="not-italic">{t.board.viewsShort}</i>{" "}
                  {item.views}
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
