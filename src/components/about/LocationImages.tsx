"use client";

import { useState } from "react";
import Lightbox from "@/components/home/Lightbox";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";
import type { GalleryImage } from "@/lib/data";

export default function LocationImages({
  images,
  variant = "default",
}: {
  images: readonly GalleryImage[];
  variant?: "default" | "split";
}) {
  const t = chrome[useLocale()];
  const [index, setIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const split = variant === "split";

  return (
    <>
      <div
        className={
          split
            ? "mt-[15px] flex flex-col gap-[24px] pc:mt-0 pc:gap-[20px]"
            : "mt-[15px] flex flex-col gap-[24px]"
        }
      >
        {images.map((img, i) => (
          <div
            key={img.fullSrc || i}
            className={
              split
                ? "flex flex-col gap-[8px] pc:gap-[10px]"
                : "flex flex-col gap-[8px]"
            }
          >
            {img.title || img.description ? (
              <div
                className={
                  split
                    ? "flex flex-col gap-[4px] pc:order-2"
                    : "flex flex-col gap-[4px]"
                }
              >
                {img.title ? (
                  <p
                    className={
                      split
                        ? "text-[18px] leading-[24px] font-bold text-brand pc:text-[16px] pc:leading-[22px]"
                        : "text-[18px] leading-[24px] font-bold text-brand pc:text-[22px] pc:leading-[26.4px]"
                    }
                  >
                    {img.title}
                  </p>
                ) : null}
                {img.description ? (
                  <p
                    className={
                      split
                        ? "whitespace-pre-line text-[14px] leading-[22px] text-ink/70 pc:text-[14px] pc:leading-[21px]"
                        : "whitespace-pre-line text-[14px] leading-[22px] text-ink/70 pc:text-[15px] pc:leading-[24px]"
                    }
                  >
                    {img.description}
                  </p>
                ) : null}
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t.gallery.openImage(
                img.alt || img.title || `location ${i + 1}`,
              )}
              className={
                split
                  ? "relative block w-full cursor-pointer overflow-hidden border border-[#eee] pc:order-1"
                  : "relative block w-full cursor-pointer overflow-hidden border border-[#eee]"
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="block h-auto w-full"
              />
            </button>
          </div>
        ))}
      </div>

      {index !== null && (
        <Lightbox
          images={images}
          startIndex={index}
          galleryId="img_location"
          onClose={() => setIndex(null)}
        />
      )}
    </>
  );
}
