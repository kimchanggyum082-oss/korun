"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import ProductBlockView from "@/components/products/ProductBlockView";
import type { ProductPageData } from "@/lib/data";

function PreviewFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-3">
      <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function ProductPreviews({ draft }: { draft: ProductPageData }) {
  return (
    <div className="flex flex-col gap-4">
      {draft.blocks.map((block, index) => (
        <PreviewFrame key={index} title={`블록 ${index + 1}`}>
          <ScaledDesktop>
            <ProductBlockView
              block={block}
              blockIndex={index}
              page={draft.id}
              isLastBlock={index === draft.blocks.length - 1}
            />
          </ScaledDesktop>
        </PreviewFrame>
      ))}
    </div>
  );
}
