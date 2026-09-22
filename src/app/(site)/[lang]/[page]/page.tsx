import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductNav from "@/components/layout/ProductNav";
import ProductBlockView from "@/components/products/ProductBlockView";
import {
  getProductPage,
  getProductPages,
  getSiteSettings,
  resolveActiveLocale,
} from "@/lib/content";
import { getChrome } from "@/lib/i18n/server";
import { metadataAlternates } from "@/lib/i18n/seo";

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
  const [company, locale] = await Promise.all([
    getSiteSettings(),
    resolveActiveLocale(),
  ]);
  return {
    title: `${product.navTitle} | ${company.name}`,
    description: product.description,
    alternates: metadataAlternates(`/${page}`, locale),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const [product, t, locale] = await Promise.all([
    getProductPage(page),
    getChrome(),
    resolveActiveLocale(),
  ]);
  if (!product) notFound();

  return (
    <>
      <ProductNav activeId={product.id} locale={locale} />
      <div className="flex-1">
        {product.blocks.map((block, blockIndex) => (
          <ProductBlockView
            key={block.introTitle}
            t={t}
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
