import type { Metadata } from "next";
import ServiceNav from "@/components/layout/ServiceNav";
import CaseStudioList from "@/components/layout/CaseStudioList";
import PageHead from "@/components/service/PageHead";
import { company, caseStudioItems } from "@/lib/data";

export const metadata: Metadata = {
  title: `Case Studio | ${company.name}`,
  description: "코런의 다양한 적용 사례를 확인하실 수 있습니다.",
};

export default function CaseStudioPage() {
  return (
    <>
      <ServiceNav activeHref="/case-studio" />
      <PageHead
        title="Case Studio"
        mobileSubtitle="다운로드 파일을 제공해드립니다"
        mobileTitle="Downloads"
      />
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <CaseStudioList items={caseStudioItems} />
      </section>
    </>
  );
}
