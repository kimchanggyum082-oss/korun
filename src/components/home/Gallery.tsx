"use client";

import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { assets } from "@/lib/data";
import Lightbox from "./Lightbox";

type GalleryImage = {
  src: string;
  fullSrc: string;
  alt: string;
};

export default function Gallery({
  images = assets.galleryImages,
  variant = "cover",
}: {
  images?: readonly GalleryImage[];
  variant?: "cover" | "contain";
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isContain = variant === "contain";

  return (
    <section className="bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-14 pc:px-[15px] pc:py-[50px]">
        <div
          className={
            isContain
              ? "grid grid-cols-2 gap-[12px] sm:grid-cols-3 sm:gap-[14px] lg:grid-cols-4 lg:gap-[16px] xl:grid-cols-5 xl:gap-[18px]"
              : "grid grid-cols-3 gap-[15px] sm:grid-cols-4 sm:gap-[16px] lg:grid-cols-5 lg:gap-[18px] xl:grid-cols-6 xl:gap-[20px]"
          }
        >
          {images.map((img, i) => (
            <button
              key={img.alt}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className={
                isContain
                  ? "group relative aspect-[3/4] overflow-hidden bg-white ring-1 ring-neutral-200"
                  : "group relative aspect-square overflow-hidden bg-neutral-200"
              }
              aria-label={`${img.alt} 보기`}
            >
              <SmartImage
                src={img.src}
                alt={img.alt}
                fill
                sizes={
                  isContain
                    ? "(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
                    : "(max-width: 640px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 17vw"
                }
                loading="lazy"
                className={`transition-transform duration-500 group-hover:scale-105 ${
                  isContain ? "object-contain" : "object-cover"
                }`}
              />
              {!isContain && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-left text-[11px] font-semibold text-white pc:text-[13px]">
                  {img.alt}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
