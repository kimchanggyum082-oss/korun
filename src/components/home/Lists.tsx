import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "./Products";
import { assets, news, downloads, type NewsItem } from "@/lib/data";

function MobileRow({
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
              badge === "EVENT" ? "bg-[#6ecc51]" : "bg-[#00b8ff]"
            }`}
          >
            {badge}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate text-sm text-neutral-700 md:text-[15px]">
          {title}
        </span>
        <span className="shrink-0 text-xs text-neutral-400 md:text-sm">
          {date}
        </span>
      </Link>
    </li>
  );
}

function PcRow({
  href,
  badge,
  title,
  date,
  showWriter,
}: {
  href: string;
  badge?: NewsItem["category"];
  title: string;
  date: string;
  showWriter?: boolean;
}) {
  return (
    <li className="border-b border-ink/10">
      <Link
        href={href}
        className="flex items-center py-[10px] transition-colors hover:text-brand-teal"
      >
        {badge && (
          <em
            className="shrink-0 pr-[5px] not-italic"
            style={{ color: badge === "EVENT" ? "#6ecc51" : "#00b8ff" }}
          >
            {badge}
          </em>
        )}
        <span className="min-w-0 flex-1 truncate text-[14px] text-ink">
          {title}
        </span>
        <span className="shrink-0 text-[12px] text-ink/70">
          {showWriter ? "코런 관리자" : date}
        </span>
      </Link>
    </li>
  );
}

function PcHeading({ en, ko }: { en: string; ko: string }) {
  return (
    <div className="mb-12">
      <p className="text-[18px] font-bold leading-[1.2] text-brand">{en}</p>
      <p className="mt-[6px] text-[36px] font-bold leading-[1.2] text-ink">
        {ko}
        <Image
          src={assets.penSmall}
          alt=""
          width={15}
          height={30}
          className="ml-[6px] inline-block w-[15px] align-middle"
        />
      </p>
    </div>
  );
}

export function NewsEvents() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading en="News & Events" ko="뉴스&이벤트" />
      <ul className="-mt-6 md:-mt-8">
        {news.map((item) => (
          <MobileRow
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
            <MobileRow
              key={item.href}
              href={item.href}
              title={item.title}
              date={item.date}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function PcNews() {
  return (
    <div>
      <PcHeading en="News & Events" ko="뉴스&이벤트" />
      <ul>
        {news.map((item) => (
          <PcRow
            key={item.href}
            href={item.href}
            badge={item.category}
            title={item.title}
            date={item.date}
          />
        ))}
      </ul>
    </div>
  );
}

function PcDownloads() {
  return (
    <div>
      <PcHeading en="Downloads" ko="다운로드" />
      <ul>
        {downloads.map((item) => (
          <PcRow
            key={item.href}
            href={item.href}
            title={item.title}
            date={item.date}
            showWriter
          />
        ))}
      </ul>
    </div>
  );
}

export function ListsSection() {
  return (
    <>
      <div className="pc:hidden">
        <NewsEvents />
        <Downloads />
      </div>
      <div className="mx-auto hidden max-w-[1280px] grid-cols-2 gap-[30px] px-[15px] py-20 pc:grid">
        <PcNews />
        <PcDownloads />
      </div>
    </>
  );
}
