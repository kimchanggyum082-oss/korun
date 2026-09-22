import type { getAboutPage } from "@/lib/content";
import type { AboutGreetingsEntity } from "@/lib/admin/entities";
import SmartImage from "@/components/ui/SmartImage";
import AboutGallery from "@/components/about/AboutGallery";

type AboutPageData = Awaited<ReturnType<typeof getAboutPage>>;

export type GreetingsViewProps = {
  content: AboutGreetingsEntity["content"];
  assets: AboutPageData["assets"];
};

export default function GreetingsView({ content, assets }: GreetingsViewProps) {
  return (
    <>
      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col px-[15px] py-[50px] text-center pc:py-[80px]">
          <div className="my-[7.5px] pc:my-0 pc:py-[15px]">
            <p className="text-[15px] leading-[24px] font-bold text-brand pc:text-[22px] pc:leading-[31px]">
              {content.banner.line1}
              <br />
              {content.banner.line2}
            </p>
          </div>
          <div className="my-[7.5px] pc:my-0 pc:pt-[20px] pc:pb-[10px]">
            <h1 className="text-[30px] leading-[36px] font-bold text-ink pc:text-[50px] pc:leading-[60px]">
              {content.banner.title}
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
                {content.heading}
              </h2>
              <p className="text-[15px] leading-[24px] text-ink">&nbsp;</p>
              <p className="text-[15px] leading-[24px] text-ink">
                {content.intro}
              </p>
              {content.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-[15px] leading-[24px] text-ink">
                  {"\u00a0"}
                  <br />
                  {paragraph}
                </p>
              ))}
              <p className="text-[15px] leading-[24px] text-ink">&nbsp;</p>
              <p className="text-[15px] leading-[24px] text-ink">&nbsp;</p>
              <p className="text-[15px] leading-[24px] font-bold text-ink">
                {content.signature}
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
                {content.heading}
              </h2>
              <div className="pc:text-[20px] pc:leading-[26px] pc:text-neutral-700">
                <div className="pc:h-[24px]" />
                <p>{content.intro}</p>
                {content.paragraphs.map((paragraph, index) => (
                  <p key={index}>
                    {"\u00a0"}
                    <br />
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="pc:pt-[50px] pc:text-[20px] pc:font-bold pc:leading-[24px] pc:text-ink">
                {content.signature}
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
