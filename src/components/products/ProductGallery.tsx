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
      <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-4 md:gap-5">
        {galleryImages.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] w-[calc(50%-8px)] overflow-hidden bg-neutral-200 md:w-[calc(33.33%-10px)]"
            aria-label={`${img.alt} 보기`}
          >
            <SmartImage
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Darken hover overlay */}
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
