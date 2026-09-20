import type { Metadata } from "next";
import TechNav from "@/components/layout/TechNav";
import InterestingItemsList from "@/components/layout/InterestingItemsList";
import PageHead from "@/components/service/PageHead";
import { getBoardItems, getSiteSettings } from "@/lib/content";

const company = getSiteSettings();

export const metadata: Metadata = {
  title: `Interesting Items | ${company.name}`,
  description: "자사의 기술력으로 구현된 다양한 제품을 소개합니다.",
};

export default function InterestingItemsPage() {
  return (
    <>
      <TechNav activeHref="/technology/interesting-items" />
      <PageHead
        subtitle="자사의 기술력으로 구현된 다양한 제품을 소개합니다."
        title="Interesting Items"
        mobileSubtitle="신적이고 탁월한 아이템을 소개드립니다"
      />
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <InterestingItemsList items={getBoardItems("interesting-items")} />
      </section>
    </>
  );
}
