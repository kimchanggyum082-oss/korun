"use client";

import { useState } from "react";
import Lightbox from "@/components/home/Lightbox";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";
import type { GalleryImage } from "@/lib/data";

export default function LocationImages({
  images,
}: {
  images: readonly GalleryImage[];
}) {
  const t = chrome[useLocale()];
  const [index, setIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-[15px] flex flex-col gap-[15px]">
        {images.map((img, i) => (
          <button
            key={img.fullSrc || i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={t.gallery.openImage(img.alt || `location ${i + 1}`)}
            className="relative block w-full cursor-pointer overflow-hidden border border-[#eee]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="block h-auto w-full"
            />
          </button>
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
