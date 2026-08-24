import type { Metadata } from "next";
import ServiceNav from "@/components/layout/ServiceNav";
import DownloadList from "@/components/layout/DownloadList";
import { company, downloadItems } from "@/lib/data";

export const metadata: Metadata = {
  title: `Downloads | ${company.name}`,
  description: "코런 제품 카탈로그 및 기술 자료를 다운로드하실 수 있습니다.",
};

export default function DownloadsPage() {
  return (
    <>
      <ServiceNav activeHref="/downloads" />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
          <p className="text-[16px] font-bold leading-[1.8] text-brand md:text-[20px]">
            코런 제품 자료를 내려받기 하실 수 있습니다
          </p>
          <h1 className="mt-[12px] text-[26px] font-bold leading-[1.2] text-ink md:text-[34px] pc:mt-[16px] pc:text-[44px]">
            Downloads
          </h1>
        </div>
      </section>

      {/* Downloads grid */}
      <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
        <DownloadList items={downloadItems} />
      </section>
    </>
  );
}
