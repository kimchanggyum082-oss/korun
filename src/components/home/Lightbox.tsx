import { useCallback, useEffect, useState } from "react";

type GalleryImage = {
  src: string;
  fullSrc: string;
  alt: string;
};

export default function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: readonly GalleryImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [imgLoading, setImgLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const count = images.length;
  const current = images[index];

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
    setImgLoading(true);
    resetView();
  }, [count, resetView]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
    setImgLoading(true);
    resetView();
  }, [count, resetView]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "+" || e.key === "=")
        setZoom((z) => Math.min(z + 0.5, 4));
      else if (e.key === "-") setZoom((z) => Math.max(z - 0.5, 1));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.5, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.5, 1));

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPanX = pan.x;
    const startPanY = pan.y;

    setIsDragging(true);

    const onMove = (ev: MouseEvent) => {
      setPan({
        x: ev.clientX - startX + startPanX,
        y: ev.clientY - startY + startPanY,
      });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="이미지 뷰어"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white md:px-6">
        <p className="text-[15px] font-semibold md:text-[18px]">
          {current.alt}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-white/70 md:text-[15px]">
            {index + 1} / {count}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/15"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        style={{
          cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
        }}
      >
        {/* Previous */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="이전 이미지"
          className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:left-6 md:h-12 md:w-12"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Loading spinner */}
        {imgLoading && (
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          </div>
        )}

        {/* Natural-size image — no upscaling beyond intrinsic dimensions */}
        <img
          key={index}
          src={current.fullSrc}
          alt={current.alt}
          className="max-h-full max-w-full select-none object-contain"
          onLoad={() => setImgLoading(false)}
          draggable={false}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isDragging ? "none" : "transform 0.2s ease-out",
          }}
        />

        {/* Next */}
        <button
          type="button"
          onClick={goNext}
          aria-label="다음 이미지"
          className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:right-6 md:h-12 md:w-12"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Bottom bar: zoom controls */}
      <div className="flex items-center justify-center gap-3 px-4 py-4 md:py-5">
        <button
          type="button"
          onClick={zoomOut}
          disabled={zoom <= 1}
          aria-label="축소"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 disabled:opacity-30 disabled:hover:bg-white/10"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <span className="min-w-[55px] text-center text-[13px] text-white/70 md:text-[15px]">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={zoomIn}
          disabled={zoom >= 4}
          aria-label="확대"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 disabled:opacity-30 disabled:hover:bg-white/10"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
