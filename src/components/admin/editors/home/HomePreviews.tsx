"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import CtaBanner from "@/components/home/CtaBanner";
import HeroSlider from "@/components/home/HeroSlider";
import { ListsSection } from "@/components/home/Lists";
import LocationSection from "@/components/home/LocationSection";
import Products from "@/components/home/Products";
import ValuesBanner from "@/components/home/ValuesBanner";
import { toHomeContent, type HomeEntity } from "@/lib/admin/entities";

function PreviewFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-3">
      <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function HomePreviews({ draft }: { draft: HomeEntity }) {
  const content = toHomeContent(draft);

  return (
    <div className="flex flex-col gap-4">
      <PreviewFrame title="Hero">
        <ScaledDesktop>
          <HeroSlider
            slides={content.hero.slides}
            slidesMobile={content.hero.slidesMobile}
          />
        </ScaledDesktop>
      </PreviewFrame>

      <PreviewFrame title="Products">
        <ScaledDesktop>
          <Products content={content.products} />
        </ScaledDesktop>
      </PreviewFrame>

      <PreviewFrame title="CTA">
        <ScaledDesktop>
          <CtaBanner content={content.cta} />
        </ScaledDesktop>
      </PreviewFrame>

      <PreviewFrame title="Lists">
        <ScaledDesktop>
          <ListsSection lists={content.lists} />
        </ScaledDesktop>
      </PreviewFrame>

      <PreviewFrame title="Values">
        <ScaledDesktop>
          <ValuesBanner values={content.values} />
        </ScaledDesktop>
      </PreviewFrame>

      <PreviewFrame title="Location">
        <ScaledDesktop>
          <LocationSection location={content.location} />
        </ScaledDesktop>
      </PreviewFrame>
    </div>
  );
}
