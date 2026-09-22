import type { Metadata } from "next";
import TechNav from "@/components/layout/TechNav";
import InterestingItemsList from "@/components/layout/InterestingItemsList";
import PageHead from "@/components/service/PageHead";
import { getBoardItems, getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getSiteSettings();
  return {
    title: `Interesting Items | ${company.name}`,
    description: "자사의 기술력으로 구현된 다양한 제품을 소개합니다.",
  };
}

export default async function InterestingItemsPage() {
  const items = await getBoardItems("interesting-items");
  return (
    <>
      <TechNav activeHref="/technology/interesting-items" />
      <PageHead
        subtitle="자사의 기술력으로 구현된 다양한 제품을 소개합니다."
        title="Interesting Items"
        mobileSubtitle="신적이고 탁월한 아이템을 소개드립니다"
      />
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <InterestingItemsList items={items} />
      </section>
    </>
  );
}
