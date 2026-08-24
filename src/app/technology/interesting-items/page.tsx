import type { Metadata } from "next";
import TechNav from "@/components/layout/TechNav";
import InterestingItemsList from "@/components/layout/InterestingItemsList";
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

      {/* Item grid with search */}
      <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
        <InterestingItemsList items={interestingItems} />
      </section>
    </>
  );
}
