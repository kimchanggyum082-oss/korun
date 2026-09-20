import type { CSSProperties } from "react";
import Image from "next/image";

export default function CaseImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(min-width: 1280px) 1250px, 100vw"
      priority={priority}
      className={className}
      style={style}
    />
  );
}
