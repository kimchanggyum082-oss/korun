"use client";

import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import Lightbox, { useGalleryHashSlide } from "@/components/home/Lightbox";
import type { GalleryImage } from "@/lib/data";

export default function AboutGallery({
  images,
  variant,
  galleryId,
}: {
  images: readonly GalleryImage[];
  variant: "facility" | "certificate";
  galleryId: string;
}) {
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const hashSlide = useGalleryHashSlide(galleryId, images.length);
  const lightboxIndex = manualIndex ?? hashSlide;

  const isFacility = variant === "facility";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-[15px]">
        <div className="pt-[7.5px] pb-[7.5px] pc:py-[15px]">
          <div
            className={
              isFacility
                ? "-mx-[7.5px] grid grid-cols-2 pc:-mx-[15px] pc:grid-cols-5 pc:gap-0"
                : "-mx-[12.5px] grid grid-cols-2 pc:-mx-[25px] pc:grid-cols-4 pc:gap-0"
            }
          >
            {images.map((img, i) => (
              <button
                key={img.fullSrc}
                type="button"
                onClick={() => setManualIndex(i)}
                aria-label={`${img.alt} 보기`}
                className={
                  isFacility
                    ? "group block text-center p-[7.5px] pc:p-[15px]"
                    : "group block p-[12.5px] pc:p-[25px]"
                }
              >
                <span
                  className={
                    isFacility
                      ? "relative block h-[129px] overflow-hidden border border-[#eee] bg-cover bg-center bg-[image:var(--thumb)] pc:h-[169px] pc:bg-none"
                      : "relative block h-[236px] overflow-hidden border border-[#eee] bg-white pc:h-[387px] pc:border-0"
                  }
                  style={
                    isFacility
                      ? ({
                          "--thumb": `url(${img.src})`,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  <span
                    className={
                      isFacility
                        ? "absolute inset-0 hidden pc:block"
                        : "absolute inset-0 block bg-cover bg-center bg-[image:var(--thumb)] pc:inset-[1px] pc:bg-none"
                    }
                    style={
                      isFacility
                        ? undefined
                        : ({
                            "--thumb": `url(${img.src})`,
                          } as React.CSSProperties)
                    }
                  >
                    <span className="absolute inset-0 hidden pc:block">
                      <SmartImage
                        src={img.src}
                        alt={img.alt}
                        fill
                        unoptimized
                        sizes={
                          isFacility
                            ? "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                            : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        }
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                  </span>
                </span>
                {isFacility && (
                  <span className="block pt-[10px] pb-[10px] text-[18px] leading-[28.8px] text-ink">
                    {img.alt}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[55px] pt-[7.5px] pb-[7.5px] pc:hidden" />

        <div className="hidden pc:block pc:h-[110px]" />
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          galleryId={galleryId}
          onClose={() => setManualIndex(null)}
        />
      )}
    </section>
  );
}
