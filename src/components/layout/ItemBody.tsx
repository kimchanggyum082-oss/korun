"use client";

import { useState } from "react";
import Lightbox from "@/components/home/Lightbox";
import type { GalleryImage } from "@/lib/data";
import type { InterestingItemBlock, TextAlign, TextRun } from "@/lib/data";

export default function ItemBody({
  blocks,
  title,
  defaultAlign = "center",
}: {
  blocks: InterestingItemBlock[];
  title: string;
  defaultAlign?: TextAlign;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images: GalleryImage[] = blocks
    .filter((b): b is { type: "image"; src: string } => b.type === "image")
    .map((b) => ({ src: b.src, fullSrc: b.src, alt: title }));

  const spanFor = (run: TextRun, i: number) => (
    <span
      key={i}
      style={{
        fontSize: run.fontSize ? `${run.fontSize}px` : undefined,
        fontWeight: run.bold ? 700 : undefined,
        textDecoration: run.underline ? "underline" : undefined,
      }}
    >
      {run.text}
    </span>
  );

  return (
    <>
      <div className="text-[15px] leading-[1.6] text-[#363636]">
        {blocks.map((block, i) => {
          const textAlign =
            (block.type === "text" ||
              block.type === "br" ||
              block.type === "button") &&
            block.align
              ? block.align
              : defaultAlign;

          if (block.type === "text") {
            if (block.parts) {
              return (
                <p key={i} style={{ margin: 0, textAlign }}>
                  {block.parts.map(spanFor)}
                </p>
              );
            }
            if (block.fontSize || block.bold || block.underline) {
              return (
                <p key={i} style={{ margin: 0, textAlign }}>
                  {spanFor(
                    {
                      text: block.content,
                      fontSize: block.fontSize,
                      bold: block.bold,
                      underline: block.underline,
                    },
                    0,
                  )}
                </p>
              );
            }
            return (
              <p key={i} style={{ margin: 0, textAlign }}>
                {block.content}
              </p>
            );
          }

          if (block.type === "br") {
            return (
              <p key={i} style={{ margin: 0, textAlign }}>
                {block.fontSize ? (
                  <span style={{ fontSize: `${block.fontSize}px` }}>
                    <br />
                  </span>
                ) : (
                  <br />
                )}
              </p>
            );
          }

          if (block.type === "hr") {
            return (
              <hr
                key={i}
                style={{
                  margin: "20px 0",
                  border: 0,
                  borderTop: "1px solid #ddd",
                }}
              />
            );
          }

          if (block.type === "button") {
            return (
              <p key={i} style={{ margin: 0, textAlign: block.align ?? defaultAlign }}>
                <a
                  href={block.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    border: "1px solid #363636",
                    borderRadius: "2px",
                    backgroundColor: "#363636",
                    color: "#ffffff",
                    fontSize: "12px",
                    lineHeight: "17.1429px",
                    letterSpacing: "1px",
                    verticalAlign: "middle",
                  }}
                >
                  {block.label}
                </a>
              </p>
            );
          }

          const imgIndex = images.findIndex((img) => img.src === block.src);
          const open = () => setLightboxIndex(imgIndex);
          const onKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              open();
            }
          };
          return (
            <p key={i} style={{ margin: 0, textAlign: defaultAlign }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.src}
                alt={title}
                loading="lazy"
                role="button"
                tabIndex={0}
                aria-label="이미지 확대 보기"
                onClick={open}
                onKeyDown={onKeyDown}
                className="h-auto max-w-full cursor-pointer"
                style={
                  block.block
                    ? {
                        display: "block",
                        margin: "10px auto",
                        width: block.width ? `${block.width}px` : undefined,
                      }
                    : {
                        display: "inline-block",
                        margin: "5px 0",
                        verticalAlign: "middle",
                        width: block.width ? `${block.width}px` : undefined,
                      }
                }
              />
            </p>
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
