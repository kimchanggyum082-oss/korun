"use client";

import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import Lightbox from "@/components/home/Lightbox";

type GalleryImage = {
  src: string;
  fullSrc: string;
  alt: string;
};

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

  return (
    <>
      <div className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-3 md:gap-4">
        {galleryImages.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-square w-[calc(50%-6px)] overflow-hidden bg-neutral-200 ring-1 ring-neutral-200 md:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)]"
            aria-label={`${img.alt} 보기`}
          >
            <SmartImage
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
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
