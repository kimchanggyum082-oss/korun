import type { Metadata } from "next";
import SmartImage from "@/components/ui/SmartImage";
import { assets, company } from "@/lib/data";
import AboutNav from "@/components/layout/AboutNav";
import AboutGallery from "@/components/about/AboutGallery";

export const metadata: Metadata = {
  title: `Greetings | ${company.name}`,
  description:
    "주식회사 코런은 2014년에 설립되어 고품질의 런너리스 사출성형 시스템 Hot Runner System 전문 제조 회사입니다.",
};

export default function GreetingsPage() {
  return (
    <>
      <AboutNav activeHref="/about/greetings" />

      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col px-[15px] py-[50px] text-center pc:py-[80px]">
          <div className="my-[7.5px] pc:my-0 pc:py-[15px]">
            <p className="text-[15px] leading-[24px] font-bold text-brand pc:text-[22px] pc:leading-[31px]">
              HOT RUNNER SYSTEM 전문 제조 회사로서
              <br />
              가격, 품질, 서비스로 보답하는 국내 핫런너 전문메이커
            </p>
          </div>
          <div className="my-[7.5px] pc:my-0 pc:pt-[20px] pc:pb-[10px]">
            <h1 className="text-[30px] leading-[36px] font-bold text-ink pc:text-[50px] pc:leading-[60px]">
              Greetings
            </h1>
          </div>
        </div>
      </section>

      {/* Greeting content */}
      <section className="bg-white pc:mx-auto pc:max-w-[1280px] pc:px-0 pc:py-0">
        {/* Mobile greeting */}
        <div className="pc:hidden">
          <div className="mx-auto max-w-[1280px] px-[15px]">
            <div className="py-[15px] pl-[15px] pr-[50px] break-keep [overflow-wrap:break-word]">
              <h2 className="text-[20px] leading-[26px] font-bold text-ink">
                틀에 대한 HOT RUNNER의 색다른 접근!
              </h2>
              <p className="text-[15px] leading-[24px] text-ink">&nbsp;</p>
              <p className="text-[15px] leading-[24px] text-ink">
                주식회사 코런은 2014년에 설립되어 고품질의 런너리스 사출성형
                시스템 Hot Runner System 전문 제조 회사 입니다.
              </p>
              <p className="text-[15px] leading-[24px] text-ink">
                {"\u00a0"}
                <br />
                고객의 목표에 가장 적합하고, 정확하도록 문의 단계 부터 철저한
                분석과 정확한 공학 이론과 혁신적인 설계를 적용하여 완벽한 핫런너
                솔루션을 제공 합니다.
              </p>
              <p className="text-[15px] leading-[24px] text-ink">
                {"\u00a0"}
                <br />
                전기차베터리 부품(MPPO+GF) 부터 의료용 제품 부품까지 다양한 제품
                적용 실적 노하우로 신뢰 할 수 있는 고객의 파트너로서 고객의 원가
                절감과 안정적 제품 생산에 파트너 되어 드리겠습니다.
              </p>
              <p className="text-[15px] leading-[24px] text-ink">&nbsp;</p>
              <p className="text-[15px] leading-[24px] text-ink">&nbsp;</p>
              <p className="text-[15px] leading-[24px] font-bold text-ink">
                주식회사 코런 임직원 일동
              </p>
            </div>
            <div className="pt-[7.5px] pb-[7.5px]">
              <div className="relative h-[233px] overflow-hidden bg-neutral-200">
                <SmartImage
                  src={assets.greetingImageMobile}
                  alt="코런 인사말"
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
            <div className="h-[45px] pt-[7.5px] pb-[7.5px]" />
          </div>
        </div>

        <div className="hidden pc:grid grid-cols-1 gap-8 pc:grid-cols-12 pc:gap-0">
          {/* Text */}
          <div className="pc:col-span-7 pc:px-[15px] pc:py-[15px]">
            <div className="pc:min-h-[368px] pc:pl-[15px] pc:pr-[50px]">
              <h2 className="pc:text-[30px] pc:leading-[36px] pc:font-bold pc:text-ink">
                틀에 대한 HOT RUNNER의 색다른 접근!
              </h2>
              <div className="pc:text-[20px] pc:leading-[26px] pc:text-neutral-700">
                <div className="pc:h-[24px]" />
                <p>
                  주식회사 코런은 2014년에 설립되어 고품질의 런너리스 사출성형
                  시스템 Hot Runner System 전문 제조 회사 입니다.
                </p>
                <p>
                  {"\u00a0"}
                  <br />
                  고객의 목표에 가장 적합하고, 정확하도록 문의 단계 부터 철저한
                  분석과 정확한 공학 이론과 혁신적인 설계를 적용하여 완벽한
                  핫런너 솔루션을 제공 합니다.
                </p>
                <p>
                  {"\u00a0"}
                  <br />
                  전기차베터리 부품(MPPO+GF) 부터 의료용 제품 부품까지 다양한
                  제품 적용 실적 노하우로 신뢰 할 수 있는 고객의 파트너로서
                  고객의 원가 절감과 안정적 제품 생산에 파트너 되어
                  드리겠습니다.
                </p>
              </div>
              <p className="pc:pt-[50px] pc:text-[20px] pc:font-bold pc:leading-[24px] pc:text-ink">
                주식회사 코런 임직원 일동
              </p>
            </div>
          </div>

          {/* PC greeting image */}
          <div className="pc:col-span-5 pc:px-[15px] pc:py-[15px]">
            <div className="relative aspect-[1.4] overflow-hidden bg-neutral-200 pc:aspect-auto pc:h-[367px] pc:w-full">
              <SmartImage
                src={assets.greetingImage}
                alt="코런 인사말"
                fill
                sizes="(max-width: 992px) 0px, 40vw"
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Trailing spacer row */}
          <div className="pc:col-span-12 pc:h-[110px]" />
        </div>
      </section>

      {/* Gallery */}
      <AboutGallery
        images={assets.galleryImages}
        variant="facility"
        galleryId="img_lg"
      />
    </>
  );
}
