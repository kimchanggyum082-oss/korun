import type { Metadata } from "next";
import Image from "next/image";
import { assets, company } from "@/lib/data";
import AboutNav from "@/components/layout/AboutNav";
import Gallery from "@/components/home/Gallery";

export const metadata: Metadata = {
  title: `Greetings | ${company.name}`,
  description:
    "주식회사 코런은 2014년에 설립되어 고품질의 러너리스 사출성형 시스템 Hot Runner System 전문 제조 회사입니다.",
};

export default function GreetingsPage() {
  return (
    <>
      <AboutNav activeHref="/about/greetings" />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-10 text-center md:px-6 md:py-12 pc:px-[15px] pc:py-[50px]">
          <p className="text-[18px] font-bold leading-[2] text-brand md:text-[22px]">
            HOT RUNNER SYSTEM 전문 제조 회사로서
            <br />
            가격, 품질, 서비스로 보답하는 국내 핫런너 전문메이커
          </p>
          <h1 className="mt-[20px] text-[30px] font-bold leading-[1.2] text-ink pc:mt-[24px] pc:text-[50px]">
            Greetings
          </h1>
        </div>
      </section>

      {/* Greeting content */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 md:py-16 pc:px-[15px] pc:py-[60px]">
        {/* Mobile greeting image */}
        <div className="mb-8 pc:hidden">
          <div className="relative aspect-[3/2] overflow-hidden bg-neutral-200">
            <Image
              src={assets.greetingImageMobile}
              alt="코런 인사말"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 pc:grid-cols-12 pc:gap-[40px]">
          {/* Text */}
          <div className="pc:col-span-7">
            <h2 className="text-[24px] font-bold leading-[1.3] text-ink md:text-[30px]">
              틀에 대한 HOT RUNNER의 색다른 접근!
            </h2>
            <div className="mt-5 space-y-2 text-[16px] leading-[1.5] text-neutral-700 md:text-[20px] md:leading-[1.5]">
              <p>
                주식회사 코런은 2014년에 설립되어 고품질의 러너리스 사출성형
                시스템 Hot Runner System 전문 제조 회사 입니다.
              </p>
              <p>
                고객의 목표에 가장 적합하고, 정확하도록 문의 단계 부터 철저한
                분석과 정확한 공학 이론과 혁신적인 설계를 적용하여 완벽한 핫런너
                솔루션을 제공 합니다.
              </p>
              <p>
                전기차베터리 부품(MPPO+GF) 부터 의료용 제품 부품까지 다양한 제품
                적용 실적 노하우로 신뢰 할 수 있는 고객의 파트너로서 고객의 원가
                절감과 안정적 제품 생산에 파트너 되어 드리겠습니다.
              </p>
            </div>
            <p className="mt-6 text-[16px] font-bold text-ink md:text-[20px]">
              주식회사 코런 임직원 일동
            </p>
          </div>

          {/* PC greeting image */}
          <div className="hidden pc:col-span-5 pc:block">
            <div className="relative aspect-[1.4] overflow-hidden bg-neutral-200">
              <Image
                src={assets.greetingImage}
                alt="코런 인사말"
                fill
                sizes="(max-width: 992px) 0px, 40vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Gallery />
    </>
  );
}
