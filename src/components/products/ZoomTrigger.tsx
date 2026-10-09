"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Lightbox from "@/components/home/Lightbox";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";
import type { GalleryImage } from "@/lib/data";

export default function ZoomTrigger({
  src,
  alt,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children: ReactNode;
}) {
  const t = chrome[useLocale()];
  const [open, setOpen] = useState(false);
  const image: GalleryImage = { src, fullSrc: src, alt };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.gallery.openImage(alt)}
        className={className}
      >
        {children}
      </button>
      {open && (
        <Lightbox
          images={[image]}
          startIndex={0}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
