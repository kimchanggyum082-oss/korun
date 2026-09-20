"use client";

import { useEffect, useRef, useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { assets, values } from "@/lib/data";

// Matches animate.css fadeInUp as used by the original home (0.7s, ease, both).
const REVEAL_KEYFRAMES = `@keyframes fadeInUp {
  from { opacity: 0; transform: translate3d(0, 60%, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}`;

const REVEAL_DELAYS = ["0s", "0.2s", "0.4s"];

const MOBILE_BG = "https://cdn.imweb.me/thumbnail/20240625/c23d13b2d5be7.png";

const MOBILE_VALUES = [
  { label: "기술성 Technology", color: "#00ac68", padding: 30 },
  { label: "안정성 Stability", color: "#e9b346", padding: 45 },
  { label: "효율성 Effciency", color: "#005dac", padding: 40 },
];

export default function ValuesBanner() {
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
          src={MOBILE_BG}
          alt="코런 전시 부스"
          fill
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 flex flex-col px-[15px]">
          <div className="my-[7.5px] h-[30px]" />
          {MOBILE_VALUES.map((v) => (
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
          src={assets.valuesBg}
          alt="코런 전시 부스"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45 pc:bg-black/40" />

        <div
          ref={pillsRef}
          className="relative z-10 hidden items-center justify-center gap-[31px] py-[80px] pc:flex"
        >
          {values.map((v, i) => (
            <a
              key={v.label}
              href="#"
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
