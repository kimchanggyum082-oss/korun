import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductNav from "@/components/layout/ProductNav";
import ProductBlockView from "@/components/products/ProductBlockView";
import {
  getProductPage,
  getProductPages,
  getSiteSettings,
} from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getProductPages();
  return Object.keys(pages).map((page) => ({ page }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const product = await getProductPage(page);
  if (!product) return {};
  const company = await getSiteSettings();
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
  const product = await getProductPage(page);
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
