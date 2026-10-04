"use client";

import ScaledDesktop from "@/components/admin/ScaledDesktop";
import ProductBlockView from "@/components/products/ProductBlockView";
import {
  toProductPageData,
  type ProductPageEntity,
} from "@/lib/admin/entities";
import { chrome } from "@/lib/i18n/chrome";
import { adminDict } from "@/lib/i18n/admin";
import type { Locale } from "@/lib/i18n/locales";

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

export default function ProductPreviews({
  draft,
  locale,
}: {
  draft: ProductPageEntity;
  locale: Locale;
}) {
  const content = toProductPageData(draft, locale);
  const t = adminDict[locale].preview;
  return (
    <div className="flex flex-col gap-4">
      {content.blocks.map((block, index) => (
        <PreviewFrame key={index} title={t.blockLabel(index + 1)}>
          <ScaledDesktop>
            <ProductBlockView
              t={chrome[locale]}
              block={block}
              blockIndex={index}
              page={content.id}
              isLastBlock={index === content.blocks.length - 1}
            />
          </ScaledDesktop>
        </PreviewFrame>
      ))}
    </div>
  );
}
