import type { Metadata } from "next";
import { assets, company } from "@/lib/data";
import AboutNav from "@/components/layout/AboutNav";
import Gallery from "@/components/home/Gallery";

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
        <div className="mx-auto max-w-[1280px] px-4 py-10 text-center md:px-6 md:py-12 pc:px-[15px] pc:py-[50px]">
          <h1 className="text-[30px] font-bold leading-[1.2] text-ink md:text-[40px] pc:text-[50px]">
            Patent &amp; Credentials
          </h1>
        </div>
      </section>

      {/* Gallery */}
      <Gallery images={assets.patentImages} variant="contain" />
    </>
  );
}
