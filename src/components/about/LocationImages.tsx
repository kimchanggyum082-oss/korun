"use client";

import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
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
      <div className="mt-[15px] grid grid-cols-2 gap-[10px] pc:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.fullSrc || i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={t.gallery.openImage(img.alt || `location ${i + 1}`)}
            className="group relative block overflow-hidden border border-[#eee]"
          >
            <span className="relative block h-[150px] w-full bg-white pc:h-[220px]">
              <SmartImage
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                sizes="(max-width: 992px) 50vw, 33vw"
                className="object-cover"
              />
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1] bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
