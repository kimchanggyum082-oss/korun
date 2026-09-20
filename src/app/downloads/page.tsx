import type { Metadata } from "next";
import ServiceNav from "@/components/layout/ServiceNav";
import DownloadList from "@/components/layout/DownloadList";
import PageHead from "@/components/service/PageHead";
import { company, downloadItems } from "@/lib/data";

export const metadata: Metadata = {
  title: `Downloads | ${company.name}`,
  description: "코런 제품 카탈로그 및 기술 자료를 다운로드하실 수 있습니다.",
};

export default function DownloadsPage() {
  return (
    <>
      <ServiceNav activeHref="/downloads" />
      <PageHead
        subtitle={"\u00a0코런의 제품과 회사소개서를 다운받을 수 있습니다.\u00a0"}
        title="Downloads"
        mobileSubtitle="다운로드 파일을 제공해드립니다"
      />
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        <DownloadList items={downloadItems} />
      </section>
    </>
  );
}
