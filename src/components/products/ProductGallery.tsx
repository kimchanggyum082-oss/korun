"use client";

import { useState } from "react";
import type { GalleryImage } from "@/lib/data";
import SmartImage from "@/components/ui/SmartImage";
import Lightbox from "@/components/home/Lightbox";

export default function ProductGallery({
  images,
  label,
}: {
  images: string[];
  label: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages: GalleryImage[] = images.map((src, i) => ({
    src,
    fullSrc: src,
    alt: `${label} ${i + 1}`,
  }));

  const desktopCols = images.length <= 2 ? 2 : images.length <= 3 ? 3 : 4;

  const gridClass =
    desktopCols === 2
      ? "grid-cols-2"
      : desktopCols === 3
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-2 md:grid-cols-4";

  return (
    <>
      <div className={`grid ${gridClass} gap-4 md:gap-5`}>
        {galleryImages.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden bg-neutral-200"
            aria-label={`${img.alt} 보기`}
          >
            <SmartImage
              src={img.src}
              alt={img.alt}
              fill
              sizes={`(max-width: 768px) 50vw, ${Math.floor(100 / desktopCols)}vw`}
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
