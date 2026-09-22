"use client";

import { useEffect, useRef, useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { homeContent, type HomeContent } from "@/lib/data";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref } from "@/lib/i18n/locales";

// Matches animate.css fadeInUp as used by the original home (0.7s, ease, both).
const REVEAL_KEYFRAMES = `@keyframes fadeInUp {
  from { opacity: 0; transform: translate3d(0, 60%, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}`;

const REVEAL_DELAYS = ["0s", "0.2s", "0.4s"];

export default function ValuesBanner({
  values = homeContent.values,
}: {
  values?: HomeContent["values"];
} = {}) {
  const locale = useLocale();
  const pillsRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = pillsRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }
    // The original plays fadeInUp once the widget enters the viewport
    // (and immediately at load when it is already on screen).
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{REVEAL_KEYFRAMES}</style>
      <section className="pc:hidden relative w-full overflow-hidden">
        <SmartImage
          src={values.bgMobile}
          alt={values.bgAlt}
          fill
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 flex flex-col px-[15px]">
          <div className="my-[7.5px] h-[30px]" />
          {values.mobile.map((v) => (
            <div key={v.label} className="my-[7.5px] flex justify-center">
              <span
                style={{
                  backgroundColor: v.color,
                  paddingLeft: v.padding,
                  paddingRight: v.padding,
                }}
                className="rounded-full py-[15px] text-[18px] leading-[25.7143px] text-white"
              >
                {v.label}
              </span>
            </div>
          ))}
          <div className="my-[7.5px] h-[30px]" />
        </div>
      </section>

      <section className="relative hidden w-full overflow-hidden pc:block">
        <SmartImage
          src={values.bg}
          alt={values.bgAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45 pc:bg-black/40" />

        <div
          ref={pillsRef}
          className="relative z-10 hidden items-center justify-center gap-[31px] py-[80px] pc:flex"
        >
          {values.pc.map((v, i) => (
            <a
              key={v.label}
              href={
                v.href.startsWith("/") ? localizeHref(v.href, locale) : v.href
              }
              style={
                {
                  "--pill-bg": v.color,
                  paddingLeft: v.padding,
                  paddingRight: v.padding,
                  opacity: revealed ? undefined : 0,
                  transform: revealed ? undefined : "translate3d(0, 60%, 0)",
                  animation: revealed
                    ? `fadeInUp 0.7s ease ${REVEAL_DELAYS[i]} both`
                    : undefined,
                } as React.CSSProperties
              }
              className="flex items-center rounded-full bg-(--pill-bg) py-[15px] text-[22px] leading-[31.4286px] text-white ring-1 ring-black/20 ring-inset transition-colors duration-300 hover:bg-white hover:text-black"
            >
              {v.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
