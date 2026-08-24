import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SmartImage from "@/components/ui/SmartImage";
import CaseNav from "@/components/layout/CaseNav";
import Gallery from "@/components/home/Gallery";
import { caseNav, casePages, company, type CasePageData } from "@/lib/data";

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

function CaseSection({ page }: { page: CasePageData }) {
  const { section } = page;
  if (!section) return null;

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 md:py-16 pc:px-[15px]">
      {section.heading && (
        <h2 className="text-left text-[24px] font-bold leading-[1.2] text-ink md:text-[30px]">
          {section.heading}
        </h2>
      )}
      <p className="mt-4 text-left text-[15px] leading-[1.7] text-neutral-600 md:text-[20px]">
        {section.text}
      </p>
      {section.images.length > 0 && (
        <div className="mt-8 space-y-4 md:space-y-6">
          {section.images.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[13/2] w-full overflow-hidden"
            >
              <SmartImage
                src={src}
                alt={`${section.heading || page.title} ${i + 1}`}
                fill
                sizes="(min-width: 1280px) 1210px, 100vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      )}
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

      {/* Title section */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center md:px-6 md:py-10 pc:px-[15px] pc:py-[35px]">
          <p className="text-[16px] font-bold leading-[1.8] text-brand md:text-[20px]">
            {page.subtitle}
          </p>
          <h1 className="mt-[12px] text-[26px] font-bold leading-[1.2] text-ink md:text-[34px] pc:mt-[16px] pc:text-[44px]">
            {page.title}
          </h1>
        </div>
      </section>

      {/* Hero image (mobile: square, PC: container-width, natural ratio) */}
      <section className="pc:hidden">
        <div className="relative aspect-square overflow-hidden">
          <SmartImage
            src={page.heroImageMobile}
            alt={page.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      </section>
      <section className="hidden pc:block">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 pc:px-[15px]">
          <div className="relative w-full overflow-hidden">
            <SmartImage
              src={page.heroImagePc}
              alt={page.title}
              width={page.heroWidth}
              height={page.heroHeight}
              priority
              sizes="(min-width: 1280px) 1210px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* Content section */}
      <CaseSection page={page} />

      {/* Gallery */}
      {page.galleryImages && page.galleryImages.length > 0 && (
        <Gallery images={page.galleryImages} variant="cover" />
      )}
    </>
  );
}
