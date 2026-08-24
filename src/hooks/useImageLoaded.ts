"use client";

import { useEffect, useState } from "react";

/**
 * Preloads an image URL (e.g. for CSS background-image) and returns
 * whether it has finished loading. Useful for showing a shimmer
 * placeholder until a background image is ready.
 */
export function useImageLoaded(src: string | undefined): boolean {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;
    const img = new window.Image();
    img.onload = () => setLoadedSrc(src);
    img.src = src;
    return () => {
      img.onload = null;
    };
  }, [src]);

  return loadedSrc === src;
}
