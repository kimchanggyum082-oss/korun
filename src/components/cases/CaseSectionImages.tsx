"use client";

import { useState } from "react";
import Image from "next/image";
import CaseImage from "@/components/cases/CaseImage";
import Lightbox from "@/components/home/Lightbox";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";
import type { GalleryImage } from "@/lib/data";

type SectionImage = { src: string; width: number; height: number };

export default function CaseSectionImages({
  images,
  heading,
  slug,
  variant,
}: {
  images: readonly SectionImage[];
  heading: string;
  slug: string;
  variant: "pc" | "mobile";
}) {
  const t = chrome[useLocale()];
  const [index, setIndex] = useState<number | null>(null);
  const gallery: GalleryImage[] = images.map((image, i) => ({
    src: image.src,
    fullSrc: image.src,
    alt: `${heading} ${i + 1}`,
  }));

  if (variant === "mobile") {
    return (
      <>
        {images.map((img, i) => (
          <div key={img.src} className="mt-[15px] px-[15px]">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t.gallery.openImage(`${heading} ${i + 1}`)}
              className="block w-full cursor-pointer"
            >
              <div
                className="w-full"
                style={{ height: Math.round((360 * img.height) / img.width) }}
              >
                <Image
                  src={img.src}
                  alt={heading}
                  width={img.width}
                  height={img.height}
                  unoptimized
                  className="h-full w-full"
                />
              </div>
            </button>
          </div>
        ))}

        {index !== null && (
          <Lightbox
            images={gallery}
            startIndex={index}
            galleryId={`case-${slug}-section`}
            onClose={() => setIndex(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      {images.map((img, i) => (
        <div key={img.src} className="py-[15px]">
          <button
            type="button"
            onClick={() => setIndex(i)}
            aria-label={t.gallery.openImage(`${heading} ${i + 1}`)}
            className="block w-full cursor-pointer"
          >
            <CaseImage
              src={img.src}
              alt={`${heading} ${i + 1}`}
              width={img.width}
              height={img.height}
              className="h-auto w-full"
            />
          </button>
        </div>
      ))}

      {index !== null && (
        <Lightbox
          images={gallery}
          startIndex={index}
          galleryId={`case-${slug}-section`}
          onClose={() => setIndex(null)}
        />
      )}
    </>
  );
}
