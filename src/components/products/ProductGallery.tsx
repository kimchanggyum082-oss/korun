"use client";

import { useState } from "react";
import type { GalleryImage } from "@/lib/data";
import SmartImage from "@/components/ui/SmartImage";
import Lightbox, { useGalleryHashSlide } from "@/components/home/Lightbox";

function defaultGalleryId(src: string) {
  const file = src.split("/").pop() ?? "";
  const base = file.replace(/\.[a-z0-9]+$/i, "");
  return `img_${base || "gallery"}`;
}

export default function ProductGallery({
  images,
  thumbs,
  columns,
  label,
  galleryId,
  frameHeight = 307,
}: {
  images: string[];
  thumbs?: string[];
  columns?: number;
  label: string;
  galleryId?: string;
  frameHeight?: number;
}) {
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const id = galleryId ?? defaultGalleryId(images[0] ?? label);
  const hashSlide = useGalleryHashSlide(id, images.length);
  const lightboxIndex = manualIndex ?? hashSlide;

  const galleryImages: GalleryImage[] = images.map((src, i) => ({
    src,
    fullSrc: src,
    alt: `${label} ${i + 1}`,
  }));

  const gridSrc = (i: number) => thumbs?.[i] ?? images[i];
  const slots = Math.max(columns ?? images.length, images.length);
  const mobileSlots = Math.ceil(images.length / 2) * 2;

  return (
    <>
      <div className="-mx-[2.5px] grid grid-cols-2 pc:hidden">
        {Array.from({ length: mobileSlots }, (_, i) => (
          <div key={`ms-${i}`} className="p-[2.5px]">
            {i < images.length ? (
              <button
                type="button"
                onClick={() => setManualIndex(i)}
                aria-label={`${label} ${i + 1} 보기`}
                className="block w-full border border-[#eee]"
              >
                <span
                  className="block h-[133px] bg-cover bg-center"
                  style={{ backgroundImage: `url("${gridSrc(i)}")` }}
                />
              </button>
            ) : null}
          </div>
        ))}
      </div>

      <div className="-mx-[5px] hidden pc:block">
        <div className="table w-full table-fixed">
          <div className="table-row">
            {Array.from({ length: slots }, (_, i) => (
              <div
                key={`slot-${i}`}
                className="table-cell p-[5px] align-top"
                style={{ width: `${100 / slots}%` }}
              >
                {i < images.length ? (
                  <button
                    type="button"
                    onClick={() => setManualIndex(i)}
                    aria-label={`${label} ${i + 1} 보기`}
                    className="block w-full cursor-pointer overflow-hidden border border-[#eee]"
                  >
                    <div
                      className="relative w-full bg-white"
                      style={{ height: frameHeight }}
                    >
                      <SmartImage
                        src={gridSrc(i)}
                        alt={`${label} ${i + 1}`}
                        fill
                        unoptimized
                        sizes={`${Math.floor(1250 / slots)}px`}
                        className="object-cover"
                      />
                    </div>
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          startIndex={lightboxIndex}
          galleryId={id}
          onClose={() => setManualIndex(null)}
        />
      )}
    </>
  );
}
