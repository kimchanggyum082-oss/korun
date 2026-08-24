"use client";

import { useImageLoaded } from "@/hooks/useImageLoaded";

type SmartBackgroundProps = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/**
 * Renders a div with a background-image that shows a shimmer placeholder
 * until the image has finished loading. Drop-in replacement for a
 * `<div style={{ backgroundImage: url(...) }} />` pattern.
 */
export default function SmartBackground({
  src,
  className = "",
  style = {},
  children,
}: SmartBackgroundProps) {
  const loaded = useImageLoaded(src);

  return (
    <div
      className={className}
      style={{
        ...style,
        backgroundImage: loaded ? `url(${src})` : undefined,
      }}
    >
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-neutral-200"
          aria-hidden
        />
      )}
      {children}
    </div>
  );
}
