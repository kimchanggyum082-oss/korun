"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/data";

const AUTOPLAY_MS = 5000;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const count = assets.heroSlides.length;

  const goTo = useCallback((i: number) => setActive(i % count), [count]);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-neutral-900 pc:h-[500px]">
      {assets.heroSlides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 pc:hidden">
        {assets.heroSlides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`${i + 1}번 슬라이드로 이동`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active
                ? "w-6 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
