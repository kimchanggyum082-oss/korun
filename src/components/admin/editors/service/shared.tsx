"use client";

import type { InterestingItemBlock, TextRun } from "@/lib/data";
import { bgStyle } from "../news/shared";

export { PreviewCard, bgStyle } from "../news/shared";

export type ServiceBoardItem = {
  idx: string;
  title: string;
  date: string;
  views: number;
  thumbnail: string;
  description: string;
  summary?: string;
  blocks: InterestingItemBlock[];
  files: { name: string; size: string; url: string }[];
};

function TextRunSpan({ run }: { run: TextRun }) {
  return (
    <span
      style={{
        fontSize: run.fontSize ? `${run.fontSize}px` : undefined,
        fontWeight: run.bold ? 700 : undefined,
        textDecoration: run.underline ? "underline" : undefined,
      }}
    >
      {run.text}
    </span>
  );
}

export function BoardBlockPreview({ block }: { block: InterestingItemBlock }) {
  const textAlign =
    (block.type === "text" || block.type === "br" || block.type === "button") &&
    block.align
      ? block.align
      : "center";

  if (block.type === "text") {
    return (
      <p style={{ margin: 0, textAlign }}>
        {block.parts ? (
          block.parts.map((run, i) => <TextRunSpan key={i} run={run} />)
        ) : block.fontSize || block.bold || block.underline ? (
          <TextRunSpan
            run={{
              text: block.content,
              fontSize: block.fontSize,
              bold: block.bold,
              underline: block.underline,
            }}
          />
        ) : (
          block.content
        )}
      </p>
    );
  }

  if (block.type === "br") {
    return (
      <p style={{ margin: 0, textAlign }}>
        <br />
      </p>
    );
  }

  if (block.type === "hr") {
    return (
      <hr
        style={{ margin: "20px 0", border: 0, borderTop: "1px solid #ddd" }}
      />
    );
  }

  if (block.type === "button") {
    return (
      <p style={{ margin: 0, textAlign: block.align ?? "center" }}>
        <span
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
          {block.label || "버튼"}
        </span>
      </p>
    );
  }

  return (
    <p style={{ margin: 0, textAlign: "center" }}>
      <span
        role="img"
        aria-label="본문 이미지"
        className="block bg-contain bg-center bg-no-repeat"
        style={{
          ...bgStyle(block.src),
          display: block.block ? "block" : "inline-block",
          margin: block.block ? "10px auto" : "5px 0",
          width: block.width ? `${block.width}px` : undefined,
          height: block.width ? "90px" : "120px",
          maxWidth: "100%",
        }}
      />
    </p>
  );
}
