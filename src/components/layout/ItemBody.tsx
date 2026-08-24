"use client";

import { useState } from "react";
import Lightbox from "@/components/home/Lightbox";
import type { GalleryImage } from "@/lib/data";
import type { InterestingItemBlock } from "@/lib/data";

/**
 * Renders the ordered body blocks of an Interesting Item (text / image / hr)
 * and opens a full-screen Lightbox when a body image is clicked.
 */
export default function ItemBody({
  blocks,
  title,
}: {
  blocks: InterestingItemBlock[];
  title: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images: GalleryImage[] = blocks
    .filter((b): b is { type: "image"; src: string } => b.type === "image")
    .map((b) => ({ src: b.src, fullSrc: b.src, alt: title }));

  return (
    <>
      <div className="space-y-6 text-[14px] leading-[1.8] text-ink md:text-[15px]">
        {blocks.map((block, i) => {
          if (block.type === "text") {
            return (
              <p key={i} className="whitespace-pre-line">
                {block.content}
              </p>
            );
          }
          if (block.type === "hr") {
            return <hr key={i} className="border-neutral-200" />;
          }
          // image
          const imgIndex = images.findIndex((img) => img.src === block.src);
          return (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxIndex(imgIndex)}
              className="group block w-full overflow-hidden rounded-md"
              aria-label="이미지 확대 보기"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.src}
                alt={title}
                className="mx-auto max-h-[520px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
