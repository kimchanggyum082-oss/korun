"use client";

import Link from "next/link";
import type { InterestingItem } from "@/lib/data";
import { itemsDict } from "@/lib/i18n/boards/items";
import { useLocale } from "@/lib/i18n/client";

export default function ItemList({ items }: { items: InterestingItem[] }) {
  const t = itemsDict[useLocale()].list;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
          {t.eyebrow}
        </p>
        <h1 className="text-[24px] font-bold text-ink">{t.title}</h1>
        <p className="text-sm text-neutral-500">
          {t.description(items.length)}
        </p>
      </header>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full border-collapse text-left text-[12px]">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-[11px] text-neutral-500">
              <th className="px-3 py-2 font-semibold">{t.columns.no}</th>
              <th className="px-3 py-2 font-semibold">{t.columns.category}</th>
              <th className="px-3 py-2 font-semibold">{t.columns.title}</th>
              <th className="hidden px-3 py-2 font-semibold md:table-cell">
                {t.columns.author}
              </th>
              <th className="hidden px-3 py-2 font-semibold sm:table-cell">
                {t.columns.date}
              </th>
              <th className="hidden px-3 py-2 text-right font-semibold sm:table-cell">
                {t.columns.views}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.idx}
                className="border-b border-neutral-100 last:border-b-0 hover:bg-paper/60"
              >
                <td className="px-3 py-2 align-top text-neutral-400">
                  {item.no}
                </td>
                <td className="px-3 py-2 align-top">
                  <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-600">
                    {item.category}
                  </span>
                </td>
                <td className="px-3 py-2 align-top">
                  <Link
                    href={`/admin/interesting-items/${item.idx}`}
                    className="font-semibold text-ink outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/30"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-0.5 font-mono text-[10px] text-neutral-400">
                    {item.idx}
                  </p>
                </td>
                <td className="hidden px-3 py-2 align-top text-neutral-500 md:table-cell">
                  {item.author}
                </td>
                <td className="hidden px-3 py-2 align-top text-neutral-500 sm:table-cell">
                  {item.date}
                </td>
                <td className="hidden px-3 py-2 text-right align-top text-neutral-500 sm:table-cell">
                  {item.views}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
