"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import CtaBanner from "@/components/home/CtaBanner";
import HeroSlider from "@/components/home/HeroSlider";
import { ListsSection } from "@/components/home/Lists";
import LocationSection from "@/components/home/LocationSection";
import Products from "@/components/home/Products";
import ValuesBanner from "@/components/home/ValuesBanner";
import type { HomeContent } from "@/lib/data";

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

export default function HomePreviews({ draft }: { draft: HomeContent }) {
  return (
    <div className="flex flex-col gap-4">
      <PreviewFrame title="Hero">
        <ScaledDesktop>
          <HeroSlider
            slides={draft.hero.slides}
            slidesMobile={draft.hero.slidesMobile}
          />
        </ScaledDesktop>
      </PreviewFrame>

      <PreviewFrame title="Products">
        <ScaledDesktop>
          <Products content={draft.products} />
        </ScaledDesktop>
      </PreviewFrame>

      <PreviewFrame title="CTA">
        <ScaledDesktop>
          <CtaBanner content={draft.cta} />
        </ScaledDesktop>
      </PreviewFrame>

      <PreviewFrame title="Lists">
        <ScaledDesktop>
          <ListsSection lists={draft.lists} />
        </ScaledDesktop>
      </PreviewFrame>

      <PreviewFrame title="Values">
        <ScaledDesktop>
          <ValuesBanner values={draft.values} />
        </ScaledDesktop>
      </PreviewFrame>

      <PreviewFrame title="Location">
        <ScaledDesktop>
          <LocationSection location={draft.location} />
        </ScaledDesktop>
      </PreviewFrame>
    </div>
  );
}
