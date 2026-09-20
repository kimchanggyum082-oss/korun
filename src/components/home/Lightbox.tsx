"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { GalleryImage } from "@/lib/data";

const FADE_MS = 200;
const ZOOM_MS = 300;
const ENTER_MS = 150;
const ENTER_DELAY_MS = 150;
const ZOOM_STEP = 1;
// lightGallery hides the bars after `hideBarsDelay` (6000ms) of inactivity.
const IDLE_HIDE_MS = 6000;
// Exact transition carried by .lg-toolbar / .lg-prev / .lg-next (their
// transform/opacity half; the color half is 0.2s linear and is kept on the
// individual buttons so hover feedback still animates).
const HIDE_TRANSITION =
  "transform 350ms cubic-bezier(0,0,.25,1), opacity 350ms cubic-bezier(0,0,.25,1)";
const ARROW_TRANSITION = `${HIDE_TRANSITION}, background-color 200ms linear, color 200ms linear`;

export function parseGalleryHash(
  hash: string,
): { galleryId: string; slide: number } | null {
  const match = hash.match(/^#lg=([^&]+)&slide=(\d+)$/);
  if (!match) return null;
  const slide = Number(match[2]);
  if (!Number.isInteger(slide)) return null;
  return { galleryId: decodeURIComponent(match[1]), slide };
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getHash() {
  return window.location.hash;
}

function getServerHash() {
  return "";
}

export function useGalleryHashSlide(galleryId: string, count: number) {
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const parsed = parseGalleryHash(hash);
  if (!parsed || parsed.galleryId !== galleryId) return null;
  return parsed.slide >= 0 && parsed.slide < count ? parsed.slide : null;
}

function baseUrl() {
  return window.location.pathname + window.location.search;
}

function ToolbarButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className="flex h-[47px] w-[50px] shrink-0 items-center justify-center text-[#999] transition-colors duration-200 hover:text-white disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function ZoomInIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.2" y1="15.2" x2="20.5" y2="20.5" />
      <line x1="7.5" y1="10.5" x2="13.5" y2="10.5" />
      <line x1="10.5" y1="7.5" x2="10.5" y2="13.5" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.2" y1="15.2" x2="20.5" y2="20.5" />
      <line x1="7.5" y1="10.5" x2="13.5" y2="10.5" />
    </svg>
  );
}

function ActualSizeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9.5" y="3.5" width="11" height="11" rx="2" />
      <rect x="3.5" y="9.5" width="11" height="11" rx="2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
      <line x1="18.5" y1="5.5" x2="5.5" y2="18.5" />
    </svg>
  );
}

export default function Lightbox({
  images,
  startIndex,
  onClose,
  galleryId = "img_lg",
}: {
  images: readonly GalleryImage[];
  startIndex: number;
  onClose: () => void;
  galleryId?: string;
}) {
  const count = images.length;
  const [index, setIndex] = useState(startIndex);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [entered, setEntered] = useState(false);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [idleHidden, setIdleHidden] = useState(false);
  const [initialHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash,
  );
  const openedFromHash = useRef(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Record<number, HTMLImageElement | null>>({});
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    panX: number;
    panY: number;
  } | null>(null);

  useEffect(() => {
    const parsed = parseGalleryHash(initialHash);
    if (parsed && parsed.galleryId === galleryId && parsed.slide < count) {
      openedFromHash.current = true;
    }
  }, [initialHash, galleryId, count]);

  useEffect(() => {
    window.history.replaceState(
      null,
      "",
      `${baseUrl()}#lg=${galleryId}&slide=${index}`,
    );
  }, [galleryId, index]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Mirrors lightGallery: bind the activity handler once on the overlay, then
  // add `.lg-hide-items` (fade the toolbar + arrows out) after 6s of no
  // movement. Any pointer/touch activity clears the timer and brings them back.
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const schedule = () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = window.setTimeout(() => {
        hideTimerRef.current = null;
        setIdleHidden(true);
      }, IDLE_HIDE_MS);
    };

    const onActivity = () => {
      setIdleHidden(false);
      schedule();
    };

    el.addEventListener("pointermove", onActivity);
    el.addEventListener("pointerdown", onActivity);
    schedule();

    return () => {
      el.removeEventListener("pointermove", onActivity);
      el.removeEventListener("pointerdown", onActivity);
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, []);

  // lightGallery resets zoom whenever the slide changes.
  const goNext = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const close = useCallback(() => {
    if (openedFromHash.current) window.history.back();
    else window.history.replaceState(null, "", baseUrl());
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close, goNext, goPrev]);

  // lightGallery anchors button zooms on the window centre, so every button
  // zoom recentres the image (the wrapper translate returns to 0,0).
  const applyZoom = useCallback((next: number) => {
    setPan({ x: 0, y: 0 });
    setScale(Math.max(1, next));
  }, []);

  const handleZoomIn = () => applyZoom(scale + ZOOM_STEP);
  const handleZoomOut = () => applyZoom(scale - ZOOM_STEP);

  const handleActualSize = () => {
    if (scale > 1) {
      applyZoom(1);
      return;
    }
    const img = imageRefs.current[index];
    if (!img) return;
    const displayed = img.offsetWidth;
    const natural = img.naturalWidth || displayed;
    const ratio = displayed > 0 ? natural / displayed : 1;
    applyZoom(ratio > 1 ? ratio : 1);
  };

  const clampPan = useCallback(
    (x: number, y: number) => {
      const stage = stageRef.current;
      const img = imageRefs.current[index];
      if (!stage || !img) return { x: 0, y: 0 };
      const maxX = Math.max(
        0,
        (img.offsetWidth * scale - stage.clientWidth) / 2,
      );
      const maxY = Math.max(
        0,
        (img.offsetHeight * scale - stage.clientHeight) / 2,
      );
      return {
        x: Math.min(maxX, Math.max(-maxX, x)),
        y: Math.min(maxY, Math.max(-maxY, y)),
      };
    },
    [index, scale],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (scale <= 1) return;
    const stage = stageRef.current;
    const img = imageRefs.current[index];
    if (!stage || !img) return;
    const overflows =
      img.offsetWidth * scale > stage.clientWidth ||
      img.offsetHeight * scale > stage.clientHeight;
    if (!overflows) return;
    e.preventDefault();
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    setPan(
      clampPan(
        drag.panX + (e.clientX - drag.startX),
        drag.panY + (e.clientY - drag.startY),
      ),
    );
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(drag.pointerId);
  };

  const zoomed = scale > 1;
  const current = images[index];
  const nextIndex = (index + 1) % count;
  const prevIndex = (index - 1 + count) % count;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="이미지 뷰어"
      style={{
        opacity: entered ? 1 : 0,
        transition: `opacity ${ENTER_MS}ms ease ${ENTER_DELAY_MS}ms`,
      }}
    >
      <div
        ref={stageRef}
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          {!loaded[index] && (
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            </div>
          )}

          {images.map((img, i) => {
            const shouldLoad =
              i === index ||
              i === nextIndex ||
              i === prevIndex ||
              Boolean(loaded[i]);
            const isActive = i === index;
            return (
              <img
                key={img.fullSrc}
                ref={(node) => {
                  imageRefs.current[i] = node;
                }}
                src={shouldLoad ? img.fullSrc : undefined}
                alt={img.alt}
                draggable={false}
                decoding="async"
                onLoad={() =>
                  setLoaded((prev) => (prev[i] ? prev : { ...prev, [i]: true }))
                }
                onPointerDown={isActive ? handlePointerDown : undefined}
                onPointerMove={isActive ? handlePointerMove : undefined}
                onPointerUp={isActive ? handlePointerUp : undefined}
                onPointerCancel={isActive ? handlePointerUp : undefined}
                className={`absolute inset-0 m-auto h-auto max-h-full w-auto max-w-full select-none object-contain ${
                  isActive
                    ? zoomed
                      ? dragging
                        ? "cursor-grabbing"
                        : "cursor-grab"
                      : ""
                    : "pointer-events-none opacity-0"
                }`}
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`
                    : undefined,
                  touchAction: zoomed ? "none" : undefined,
                  transition:
                    isActive && !dragging
                      ? `transform ${ZOOM_MS}ms cubic-bezier(0,0,.25,1), opacity ${FADE_MS}ms ease`
                      : `opacity ${FADE_MS}ms ease`,
                }}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="이전 이미지"
          className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 md:left-6 md:h-12 md:w-12"
          style={{
            opacity: idleHidden ? 0 : 1,
            transform: idleHidden
              ? "translate3d(-10px,0,0)"
              : "translate3d(0,0,0)",
            transition: ARROW_TRANSITION,
          }}
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

        <button
          type="button"
          onClick={goNext}
          aria-label="다음 이미지"
          className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 md:right-6 md:h-12 md:w-12"
          style={{
            opacity: idleHidden ? 0 : 1,
            transform: idleHidden
              ? "translate3d(10px,0,0)"
              : "translate3d(0,0,0)",
            transition: ARROW_TRANSITION,
          }}
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

      <div
        className="absolute inset-x-0 top-0 z-20 h-[47px] text-[#999]"
        style={{
          opacity: idleHidden ? 0 : 1,
          transform: idleHidden
            ? "translate3d(0,-10px,0)"
            : "translate3d(0,0,0)",
          transition: HIDE_TRANSITION,
        }}
      >
        <div className="absolute top-[12px] left-[20px] text-[16px] leading-none">
          <span>{index + 1}</span> / <span>{count}</span>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <ToolbarButton label="실제 크기" onClick={handleActualSize}>
            <ActualSizeIcon />
          </ToolbarButton>
          <ToolbarButton
            label="축소"
            onClick={handleZoomOut}
            disabled={!zoomed}
          >
            <ZoomOutIcon />
          </ToolbarButton>
          <ToolbarButton label="확대" onClick={handleZoomIn}>
            <ZoomInIcon />
          </ToolbarButton>
          <ToolbarButton label="닫기" onClick={close}>
            <CloseIcon />
          </ToolbarButton>
        </div>
      </div>

      <p className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-[20px] text-left text-[19px] leading-snug font-normal text-white">
        {current.alt}
      </p>
    </div>
  );
}
