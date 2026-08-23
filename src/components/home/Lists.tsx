import Link from "next/link";
import { SectionHeading } from "./Products";
import { news, downloads, type NewsItem } from "@/lib/data";

function ListRow({
  href,
  badge,
  title,
  date,
}: {
  href: string;
  badge?: NewsItem["category"];
  title: string;
  date: string;
}) {
  return (
    <li className="border-b border-neutral-200">
      <Link
        href={href}
        className="flex items-center gap-3 py-4 transition-colors hover:text-brand-teal md:gap-4 md:py-5"
      >
        {badge && (
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white ${
              badge === "EVENT" ? "bg-rose-500" : "bg-sky-600"
            }`}
          >
            {badge}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate text-sm text-neutral-700 md:text-[15px]">
          {title}
        </span>
        <span className="shrink-0 text-xs text-neutral-400 md:text-sm">{date}</span>
      </Link>
    </li>
  );
}

export function NewsEvents() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading en="News & Events" ko="뉴스&이벤트" />
      <ul className="-mt-6 md:-mt-8">
        {news.map((item) => (
          <ListRow
            key={item.href}
            href={item.href}
            badge={item.category}
            title={item.title}
            date={item.date}
          />
        ))}
      </ul>
    </section>
  );
}

export function Downloads() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeading en="Downloads" ko="다운로드" />
        <ul className="-mt-6 md:-mt-8">
          {downloads.map((item) => (
            <ListRow key={item.href} href={item.href} title={item.title} date={item.date} />
          ))}
        </ul>
      </div>
    </section>
  );
}
