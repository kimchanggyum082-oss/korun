import type { Metadata } from "next";
import ServiceNav from "@/components/layout/ServiceNav";
import NewsList from "@/components/layout/NewsList";
import { company, newsItems } from "@/lib/data";

export const metadata: Metadata = {
  title: `News & Events | ${company.name}`,
  description: "코런의 새로운 소식과 이벤트를 확인하실 수 있습니다.",
};

export default function NewsPage() {
  return (
    <>
      <ServiceNav activeHref="/news" />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
          <p className="text-[16px] font-bold leading-[1.8] text-brand md:text-[20px]">
            코런의 소식을 전해드립니다
          </p>
          <h1 className="mt-[12px] text-[26px] font-bold leading-[1.2] text-ink md:text-[34px] pc:mt-[16px] pc:text-[44px]">
            News &amp; Events
          </h1>
        </div>
      </section>

      {/* News table */}
      <section className="mx-auto max-w-[1100px] px-4 py-8 md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
        <NewsList items={newsItems} />
      </section>
    </>
  );
}
