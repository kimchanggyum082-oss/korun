"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * Drop-in replacement for next/image that shows a shimmer placeholder
 * while the image loads, then fades the image in smoothly.
 *
 * Works with both `fill` mode (absolute positioned in a relative parent)
 * and explicit `width`/`height` mode.
 */
export default function SmartImage({
  className = "",
  fill,
  onLoad,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad: ImageProps["onLoad"] = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  if (fill) {
    return (
      <>
        {!loaded && (
          <div
            className="absolute inset-0 animate-pulse bg-neutral-200"
            aria-hidden
          />
        )}
        <Image
          {...props}
          fill
          className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleLoad}
        />
      </>
    );
  }

  return (
    <span
      className={`relative block overflow-hidden ${loaded ? "" : "animate-pulse bg-neutral-200"}`}
    >
      <Image
        {...props}
        className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={handleLoad}
      />
    </span>
  );
}
