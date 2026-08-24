import type { Metadata } from "next";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import TechNav from "@/components/layout/TechNav";
import { company, interestingItems } from "@/lib/data";

export const metadata: Metadata = {
  title: `Interesting Items | ${company.name}`,
  description: "자사의 기술력으로 구현된 다양한 제품을 소개합니다.",
};

export default function InterestingItemsPage() {
  return (
    <>
      <TechNav activeHref="/technology/interesting-items" />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
          <p className="text-[16px] font-bold leading-[1.8] text-brand md:text-[20px]">
            신적이고 탁월한 아이템을 소개드립니다
          </p>
          <h1 className="mt-[12px] text-[26px] font-bold leading-[1.2] text-ink md:text-[34px] pc:mt-[16px] pc:text-[44px]">
            Interesting Items
          </h1>
        </div>
      </section>

      {/* Item grid */}
      <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {interestingItems.map((item) => (
            <li key={item.idx} className="h-full">
              <Link
                href={`/technology/interesting-items/${item.idx}`}
                className="group flex h-full flex-col overflow-hidden bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <SmartImage
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="inline-block w-fit bg-neutral-800 px-2 py-0.5 text-[11px] font-semibold text-white">
                    {item.category}
                  </span>
                  <h2 className="mt-2 line-clamp-2 text-[15px] font-bold leading-[1.4] text-ink md:text-[16px]">
                    {item.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-[1.6] text-neutral-500 md:text-[14px]">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 pt-3 text-[12px] text-neutral-400">
                    <span>{item.date}</span>
                    <span>·</span>
                    <span>조회 {item.views}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
