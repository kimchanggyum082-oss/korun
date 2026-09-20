import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import CaseImage from "@/components/cases/CaseImage";
import CaseGallery from "@/components/cases/CaseGallery";
import CaseNav from "@/components/layout/CaseNav";
import { casePages, company, type CasePageData } from "@/lib/data";

const HERO_FRAME: Record<string, number> = {
  "transparent-parts": 418,
  "engineering-plastics-parts": 418,
};

/**
 * Mobile hero band measured off the original at 390px: the automotive hero is
 * full-bleed, the others sit inside the 15px section gutter. `mt` is the gap
 * above the image, `h` the fixed rendered height the original's image widget
 * sets (600x600 sources, so the rendered width equals `h`).
 */
const MOBILE_HERO: Record<string, { bleed: boolean; h: number; mt: number }> = {
  "automotive-parts": { bleed: true, h: 345, mt: 0 },
  "transparent-parts": { bleed: false, h: 360, mt: 7.5 },
  "office-house-appliances": { bleed: false, h: 360, mt: 7.5 },
  "daily-supplies": { bleed: false, h: 345, mt: 7.5 },
  "engineering-plastics-parts": { bleed: false, h: 360, mt: 15 },
};

const MOBILE_HERO_SPACER: Record<string, { mt: number; h: number }> = {
  "automotive-parts": { mt: 15, h: 30 },
  "transparent-parts": { mt: 15, h: 30 },
  "office-house-appliances": { mt: 15, h: 30 },
  "daily-supplies": { mt: 22.5, h: 41 },
};

const MOBILE_HEADING_MT: Record<string, number> = {
  "automotive-parts": 22.5,
  "daily-supplies": 22.5,
};

const MOBILE_SHOW_SECTION_IMAGES: Record<string, boolean> = {
  "transparent-parts": true,
};

/**
 * The original's mobile text widgets use `word-break: keep-all`, so Korean runs
 * only wrap at spaces. Two strings in the closed data block differ from the
 * original widget text (a lost hard line break on automotive, one misplaced
 * space on daily) and the engineering title is two paragraphs in the original.
 * The mobile branch carries the original's exact strings; the desktop keeps
 * using the data block untouched.
 */
const MOBILE_BODY_TEXT: Record<string, string> = {
  "automotive-parts":
    "전기차 시대가 도래하면서 새로운 재료와 공정이 자동차를 재정립 하고 있습니다\n내외장제품 및 엔진룸, 샤시 등 자동차 부품의 해법! 바로 코런 Hot Runner System 입니다",
  "daily-supplies":
    "코런의 제품군은 합리적 가격과 우수한 품질로 고객사의 인정을 받고 있으며, 생활용품 업계에 점차 시장을 넓혀 가고있으며, 최적화된 설계와 우수한 내구성으로 오랜기간 많은 수량을 안정적으로 양산할 수 있도록 최선으로 다하고 있습니다. ",
};

const MOBILE_TITLE_TEXT: Record<string, string> = {
  "engineering-plastics-parts": "Engineering\nPlastics Parts",
};

const MOBILE_SUBTITLE_TEXT: Record<string, string> = {
  "office-house-appliances": "사무 및 하우스 가전제품 적용사례",
  "daily-supplies": "생활용품 적용사례",
};

const KEEP_ALL = "[word-break:keep-all] [overflow-wrap:break-word]";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(casePages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = casePages[slug];
  if (!page) return {};
  return {
    title: `${page.title} | ${company.name}`,
    description: page.subtitle,
  };
}

function Pad({ height }: { height: number }) {
  return (
    <div className="py-[15px]">
      <div style={{ height }} />
    </div>
  );
}

function CaseTextBody({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </>
  );
}

function MobileHero({
  page,
  hero,
}: {
  page: CasePageData;
  hero: { bleed: boolean; h: number; mt: number };
}) {
  return (
    <div
      style={{ marginTop: hero.mt }}
      className={hero.bleed ? "" : "px-[15px]"}
    >
      <div className="w-full" style={{ height: hero.h }}>
        <Image
          src={page.heroImageMobile}
          alt={page.title}
          width={hero.h}
          height={hero.h}
          priority
          unoptimized
          className="mx-auto h-full w-auto"
        />
      </div>
    </div>
  );
}

function MobileCase({ page, slug }: { page: CasePageData; slug: string }) {
  const { section } = page;
  if (!section) return null;

  const title = page.title;
  const heading = section.heading || page.title;
  const hero = MOBILE_HERO[slug];
  const heroSpacer = MOBILE_HERO_SPACER[slug];
  const headingMt = MOBILE_HEADING_MT[slug] ?? 15;
  const showSectionImages = MOBILE_SHOW_SECTION_IMAGES[slug] === true;
  const gallery = page.galleryImages ?? [];
  const isEngineering = slug === "engineering-plastics-parts";
  const subtitle = MOBILE_SUBTITLE_TEXT[slug] ?? page.subtitle;
  const mobileTitle = MOBILE_TITLE_TEXT[slug] ?? page.title;
  const bodyText = MOBILE_BODY_TEXT[slug] ?? section.text;

  const titleNode = (
    <h1 className="mt-[15px] text-[30px] font-bold leading-[36px] text-ink">
      {mobileTitle.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </h1>
  );

  const titleBlock = (
    <section className="px-[15px] pt-[57.5px] pb-[57.5px] text-center">
      <p className={`text-[15px] leading-[24px] ${KEEP_ALL}`}>
        <span className="font-bold" style={{ color: "rgb(0, 53, 29)" }}>
          {subtitle}
        </span>
      </p>
      {titleNode}
      {isEngineering ? (
        <>
          <div className="mt-[15px] h-[30px]" />
          <div className="mt-[15px] w-full text-left">
            <div className="w-full" style={{ height: hero.h }}>
              <Image
                src={page.heroImageMobile}
                alt={page.title}
                width={hero.h}
                height={hero.h}
                priority
                unoptimized
                className="mx-auto h-full w-auto"
              />
            </div>
          </div>
        </>
      ) : null}
    </section>
  );

  return (
    <div className="flex flex-col pb-[7.5px] pc:hidden">
      {titleBlock}

      {!isEngineering && hero && <MobileHero page={page} hero={hero} />}

      {!isEngineering && heroSpacer && (
        <div style={{ marginTop: heroSpacer.mt, height: heroSpacer.h }} />
      )}

      <div
        className="px-[15px]"
        style={{ marginTop: isEngineering ? 7.5 : headingMt }}
      >
        <p className={`pb-[2px] text-[20px] leading-[24px] ${KEEP_ALL}`}>
          <span className="font-bold text-ink">{heading}</span>
        </p>
      </div>

      <div className="mt-[15px] px-[15px]">
        <p className={`text-[15px] leading-[24px] text-ink ${KEEP_ALL}`}>
          <span className="text-[15px] leading-[18px]">
            <CaseTextBody text={bodyText} />
          </span>
        </p>
      </div>

      <div className="mt-[15px] h-[15px]" />

      {showSectionImages &&
        section.images.map((img) => (
          <div key={img.src} className="mt-[15px] px-[15px]">
            <div
              className="w-full"
              style={{ height: Math.round((360 * img.height) / img.width) }}
            >
              <Image
                src={img.src}
                alt={heading}
                width={img.width}
                height={img.height}
                unoptimized
                className="h-full w-full"
              />
            </div>
          </div>
        ))}

      {showSectionImages && <div className="mt-[15px] h-[40px]" />}

      {gallery.length > 0 && (
        <div className="mt-[15px] px-[15px]">
          <CaseGallery images={gallery} label={title} />
        </div>
      )}

      {gallery.length > 0 && <div className="mt-[15px] h-[30px]" />}
    </div>
  );
}

function PcTitle({ page }: { page: CasePageData }) {
  return (
    <section className="hidden bg-white pc:block">
      <div className="mx-auto max-w-[1280px] px-[15px] py-[80px]">
        <div className="py-[15px]">
          <p className="text-center leading-[30px]">
            <span className="text-[22px] font-bold leading-[26.4px] text-brand">
              {page.subtitle}
            </span>
          </p>
        </div>
        <h1 className="mb-[10px] mt-[20px] text-center text-[50px] font-bold leading-[60px] text-ink">
          {page.title}
        </h1>
      </div>
    </section>
  );
}

function PcHero({ page, slug }: { page: CasePageData; slug: string }) {
  const frame = HERO_FRAME[slug];
  const naturalHeight = (1250 * page.heroHeight) / page.heroWidth;
  const cropOffset = frame ? -Math.round((naturalHeight - frame) / 2) : 0;
  return (
    <section className="hidden pc:block">
      <div className="mx-auto max-w-[1280px] px-[15px]">
        <div className="py-[15px]">
          {frame ? (
            <div
              className="relative w-full overflow-hidden"
              style={{ height: frame }}
            >
              <CaseImage
                src={page.heroImagePc}
                alt={page.title}
                width={page.heroWidth}
                height={page.heroHeight}
                priority
                className="block w-full"
                style={{ marginTop: cropOffset }}
              />
            </div>
          ) : (
            <CaseImage
              src={page.heroImagePc}
              alt={page.title}
              width={page.heroWidth}
              height={page.heroHeight}
              priority
              className="h-auto w-full"
            />
          )}
        </div>
        <Pad height={80} />
      </div>
    </section>
  );
}

function PcContent({ page }: { page: CasePageData }) {
  const { section } = page;
  if (!section) return null;
  const heading = section.heading || page.title;

  return (
    <section className="hidden pc:block">
      <div className="mx-auto max-w-[1280px] px-[15px]">
        <div className="py-[15px]">
          <p className="leading-[24px]">
            <span className="text-[30px] font-bold leading-[36px] text-ink">
              {heading}
            </span>
          </p>
        </div>
        <div className="py-[15px]">
          <p className="leading-[24px]">
            <span className="text-[20px] leading-[24px] text-ink">
              <CaseTextBody text={section.text} />
            </span>
          </p>
        </div>
        <Pad height={30} />
        {section.images.map((img, i) => (
          <div key={img.src} className="py-[15px]">
            <CaseImage
              src={img.src}
              alt={`${heading} ${i + 1}`}
              width={img.width}
              height={img.height}
              className="h-auto w-full"
            />
          </div>
        ))}
        <Pad height={80} />
      </div>
    </section>
  );
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = casePages[slug];
  if (!page) notFound();

  const activeHref = `/cases/${slug}`;

  return (
    <>
      <CaseNav activeHref={activeHref} />

      <MobileCase page={page} slug={slug} />

      <PcTitle page={page} />

      <PcHero page={page} slug={slug} />

      <PcContent page={page} />
    </>
  );
}
