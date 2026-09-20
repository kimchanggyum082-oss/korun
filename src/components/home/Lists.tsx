import Image from "next/image";
import Link from "next/link";
import { assets, news, downloads, type NewsItem } from "@/lib/data";

const MOBILE_PEN =
  "https://cdn.imweb.me/upload/S20240617d196c3c9ecacb/3ab2e78924f62.png";

function MobileHeading({ en, ko }: { en: string; ko: string }) {
  return (
    <div className="my-[7.5px]">
      <p className="text-[15px] font-bold leading-[24px] text-brand">{en}</p>
      <p className="text-[24px] font-bold leading-[28.8px] text-ink">
        {ko}
        <Image
          src={MOBILE_PEN}
          alt=""
          width={156}
          height={537}
          className="my-[5px] inline-block w-[16px] align-middle"
        />
      </p>
    </div>
  );
}

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
    <li className="flex h-[41.8125px] items-center border-b border-[rgba(54,54,54,0.1)]">
      <Link href={href} className="flex min-w-0 flex-1 items-center">
        <span className="h-[20px] min-w-0 flex-1 overflow-hidden pr-[4px] text-[14px] leading-[20px] text-ink">
          {badge && (
            <em
              className="pr-[5px] text-[14px] not-italic"
              style={{ color: badge === "EVENT" ? "#6ecc51" : "#00b8ff" }}
            >
              {badge}
            </em>
          )}
          {title}
        </span>
        <span className="w-[67.92px] shrink-0 text-[12px] leading-[20px] text-ink/70">
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
    <li className="border-b border-ink/10 text-[15px] leading-[20px]">
      <Link
        href={href}
        className="flex items-center py-[10px] leading-[20px] transition-colors hover:text-brand-teal"
      >
        <span className="min-w-0 flex-1 truncate leading-[20px]">
          {badge && (
            <em
              className="shrink-0 pr-[5px] text-[14px] not-italic"
              style={{ color: badge === "EVENT" ? "#6ecc51" : "#00b8ff" }}
            >
              {badge}
            </em>
          )}
          <span className="text-[14px] text-ink">{title}</span>
        </span>
        {showWriter ? (
          <span className="shrink-0 text-[12px] leading-[20px] text-ink">
            코런 관리자
          </span>
        ) : (
          <span className="w-[67.92px] shrink-0 text-[12px] leading-[20px] text-ink/70">
            <span className="inline-block align-middle">{date}</span>
          </span>
        )}
      </Link>
    </li>
  );
}

function PcHeading({ en, ko }: { en: string; ko: string }) {
  return (
    <div className="py-[15px]">
      <p className="text-[36px] leading-[43.2px]">
        <span className="text-[18px] font-bold leading-[21.6px] text-brand">
          {en}
        </span>
      </p>
      <p className="text-[36px] leading-[43.2px]">
        <span className="text-[36px] font-bold leading-[43.2px] text-ink">
          {ko}
          <Image
            src={assets.penSmall}
            alt=""
            width={156}
            height={537}
            className="my-[5px] ml-[6px] inline-block w-[15px] align-middle"
          />
        </span>
      </p>
    </div>
  );
}

export function NewsEvents() {
  return (
    <section className="pc:hidden flex flex-col break-keep px-[15px]">
      <div className="my-[7.5px] h-[30px]" />
      <MobileHeading en="News & Events" ko="뉴스&이벤트" />
      <ul className="my-[7.5px]">
        {news.map((item) => (
          <MobileRow
            key={item.idx}
            href={`/news/${item.idx}`}
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
    <section className="pc:hidden flex flex-col break-keep px-[15px]">
      <div className="my-[7.5px] h-[30px]" />
      <MobileHeading en="Downloads" ko="다운로드" />
      <ul className="my-[7.5px]">
        {downloads.map((item) => (
          <MobileRow
            key={item.idx}
            href={`/downloads/${item.idx}`}
            title={item.title}
            date={item.date}
          />
        ))}
      </ul>
      <div className="my-[7.5px] h-[30px]" />
    </section>
  );
}

function PcNews() {
  return (
    <div>
      <PcHeading en="News & Events" ko="뉴스&이벤트" />
      <ul className="py-[15px]">
        {news.map((item) => (
          <PcRow
            key={item.idx}
            href={`/news/${item.idx}`}
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
      <ul className="py-[15px]">
        {downloads.map((item) => (
          <PcRow
            key={item.idx}
            href={`/downloads/${item.idx}`}
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
      <NewsEvents />
      <Downloads />
      <div className="mx-auto hidden max-w-[1280px] grid-cols-2 gap-[30px] px-[15px] py-20 pc:grid">
        <PcNews />
        <PcDownloads />
      </div>
    </>
  );
}
