"use client";

import { useState } from "react";
import Lightbox from "@/components/home/Lightbox";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";
import type { GalleryImage } from "@/lib/data";

export default function CaseGallery({
  images,
  label,
}: {
  images: GalleryImage[];
  label: string;
}) {
  const t = chrome[useLocale()];
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="-mx-[2.5px] grid grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src} className="p-[2.5px]">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t.gallery.openImage(img.alt || `${label} ${i + 1}`)}
              className="block h-[89px] w-full border border-[#eee]"
            >
              <span
                role="img"
                aria-label={img.alt || `${label} ${i + 1}`}
                className="block h-[87px] w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${img.src})` }}
              />
            </button>
          </li>
        ))}
      </ul>

      {index !== null && (
        <Lightbox
          images={images}
          startIndex={index}
          galleryId={`case-${label}`}
          onClose={() => setIndex(null)}
        />
      )}
    </>
  );
}
