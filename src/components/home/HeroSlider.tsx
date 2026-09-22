"use client";

import { useCallback, useEffect, useState } from "react";
import { homeContent } from "@/lib/data";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";

type HeroSlide = { readonly src: string; readonly alt: string };

function HeroCarousel({
  slides,
  autoplayMs,
  transitionMs,
  sectionClassName,
  paneClassName,
  showDots,
}: {
  slides: readonly HeroSlide[];
  autoplayMs: number;
  transitionMs: number;
  sectionClassName: string;
  paneClassName: string;
  showDots: boolean;
}) {
  const t = chrome[useLocale()];
  const count = slides.length;
  const [position, setPosition] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  const goTo = useCallback((target: number) => {
    setWithTransition(true);
    setPosition(target);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setWithTransition(true);
      setPosition((current) => (current >= count ? current : current + 1));
    }, autoplayMs);
    return () => clearInterval(timer);
  }, [autoplayMs, count]);

  useEffect(() => {
    if (position < count) return;
    const timer = setTimeout(() => {
      setWithTransition(false);
      setPosition(0);
    }, transitionMs);
    return () => clearTimeout(timer);
  }, [position, count, transitionMs]);

  useEffect(() => {
    if (withTransition) return;
    const frame = requestAnimationFrame(() => setWithTransition(true));
    return () => cancelAnimationFrame(frame);
  }, [withTransition]);

  const active = position % count;
  const panes = [...slides, slides[0]];

  return (
    <section className={sectionClassName}>
      <div
        className="flex h-full w-full"
        style={{
          transform: `translate3d(-${position * 100}%, 0, 0)`,
          transition: withTransition
            ? `transform ${transitionMs}ms ease`
            : "none",
        }}
      >
        {panes.map((slide, i) => (
          <div
            key={`${slide.src}-${i}`}
            role="img"
            aria-label={slide.alt}
            aria-hidden={i === panes.length - 1 || undefined}
            className={`h-full w-full shrink-0 ${paneClassName}`}
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        ))}
      </div>

      {showDots && (
        <div className="absolute inset-x-0 bottom-[5px] z-20 flex h-[25px] justify-center">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={t.gallery.slideTo(i + 1)}
              onClick={() => goTo(i)}
              className="flex h-[18px] w-4 items-center justify-center"
            >
              <span
                className={`block size-2 rounded-full border border-white ${
                  i === active ? "bg-white" : "bg-transparent"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default function HeroSlider({
  slides = homeContent.hero.slides,
  slidesMobile = homeContent.hero.slidesMobile,
}: {
  slides?: readonly HeroSlide[];
  slidesMobile?: readonly HeroSlide[];
}) {
  return (
    <>
      <HeroCarousel
        slides={slidesMobile}
        autoplayMs={5000}
        transitionMs={200}
        sectionClassName="relative w-full overflow-hidden aspect-[375/445] pc:hidden"
        paneClassName="bg-cover bg-center bg-no-repeat"
        showDots
      />
      <HeroCarousel
        slides={slides}
        autoplayMs={4000}
        transitionMs={1000}
        sectionClassName="relative hidden h-[499px] w-full overflow-hidden pc:block"
        paneClassName="bg-[#dddddd] bg-cover bg-center bg-no-repeat"
        showDots={false}
      />
    </>
  );
}
