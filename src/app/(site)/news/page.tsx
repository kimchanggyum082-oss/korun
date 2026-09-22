import type { Metadata } from "next";
import ServiceNav from "@/components/layout/ServiceNav";
import NewsList from "@/components/layout/NewsList";
import PageHead from "@/components/service/PageHead";
import { getBoardItems, getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getSiteSettings();
  return {
    title: `News&Events | ${company.name}`,
    description: "코런의 새로운 소식과 이벤트를 확인하실 수 있습니다.",
  };
}

export default async function NewsPage() {
  const items = await getBoardItems("news");
  return (
    <>
      <ServiceNav activeHref="/news" />
      <PageHead
        subtitle="최신 뉴스와 이벤트를 한눈에 보여드립니다"
        title="News&Events"
        mobileTitle="News & Events"
      />
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <NewsList items={items} />
      </section>
    </>
  );
}
