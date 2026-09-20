import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductNav from "@/components/layout/ProductNav";
import ProductBlockView from "@/components/products/ProductBlockView";
import { company, productPages } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(productPages).map((page) => ({ page }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const product = productPages[page];
  if (!product) return {};
  return {
    title: `${product.navTitle} | ${company.name}`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const product = productPages[page];
  if (!product) notFound();

  return (
    <>
      <ProductNav activeId={product.id} />
      <div className="flex-1">
        {product.blocks.map((block, blockIndex) => (
          <ProductBlockView
            key={block.introTitle}
            block={block}
            blockIndex={blockIndex}
            page={page}
            isLastBlock={blockIndex === product.blocks.length - 1}
          />
        ))}
      </div>
    </>
  );
}
