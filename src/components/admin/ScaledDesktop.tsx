"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders children at the real desktop container width (1280px) scaled down to
 * fit the preview column, so the admin preview is a true WYSIWYG thumbnail of
 * the live page layout.
 */
export default function ScaledDesktop({
  children,
  width = 1280,
}: {
  children: ReactNode;
  width?: number;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const update = () => {
      const outerWidth = outer.clientWidth;
      setScale(outerWidth > 0 ? Math.min(1, outerWidth / width) : 0);
      setInnerHeight(inner.offsetHeight);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(outer);
    observer.observe(inner);

    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={outerRef}
      className="overflow-hidden"
      style={{ height: innerHeight && scale ? innerHeight * scale : undefined }}
    >
      <div
        ref={innerRef}
        className="pointer-events-none select-none"
        style={{
          width,
          transform: scale ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
