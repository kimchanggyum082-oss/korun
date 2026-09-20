import type { Metadata } from "next";
import { assets, company } from "@/lib/data";
import AboutNav from "@/components/layout/AboutNav";
import AboutGallery from "@/components/about/AboutGallery";

export const metadata: Metadata = {
  title: `Patent & Credentials | ${company.name}`,
  description: `${company.name}의 특허 및 인증 현황을 확인하실 수 있습니다.`,
};

export default function PatentCredentialsPage() {
  return (
    <>
      <AboutNav activeHref="/about/patent-credentials" />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col px-[15px] py-[50px] text-center pc:py-[80px]">
          <div className="hidden pc:block pc:col-span-12 pc:h-[60px]" />
          <div className="my-[7.5px] pc:my-0 pc:pt-[20px] pc:pb-[10px]">
            <h1 className="text-[30px] leading-[36px] font-bold text-ink pc:text-[50px] pc:leading-[60px]">
              Patent &amp; Credentials&nbsp;
            </h1>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <AboutGallery
        images={assets.patentImages}
        variant="certificate"
        galleryId="img_lg"
      />
    </>
  );
}
