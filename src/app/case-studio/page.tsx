import type { Metadata } from "next";
import ServiceNav from "@/components/layout/ServiceNav";
import CaseStudioList from "@/components/layout/CaseStudioList";
import { company, caseStudioItems } from "@/lib/data";

export const metadata: Metadata = {
  title: `Case Studio | ${company.name}`,
  description: "코런의 다양한 적용 사례를 확인하실 수 있습니다.",
};

export default function CaseStudioPage() {
  return (
    <>
      <ServiceNav activeHref="/case-studio" />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
          <p className="text-[16px] font-bold leading-[1.8] text-brand md:text-[20px]">
            코런의 다양한 적용 사례를 소개합니다
          </p>
          <h1 className="mt-[12px] text-[26px] font-bold leading-[1.2] text-ink md:text-[34px] pc:mt-[16px] pc:text-[44px]">
            Case Studio
          </h1>
        </div>
      </section>

      {/* Case studio grid */}
      <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
        <CaseStudioList items={caseStudioItems} />
      </section>
    </>
  );
}
