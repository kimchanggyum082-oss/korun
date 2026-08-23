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
        {product.blocks.map((block) => (
          <ProductBlockView key={block.introTitle} block={block} />
        ))}
      </div>

      <section className="bg-neutral-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center md:flex-row md:justify-between md:px-6 md:py-14 md:text-left">
          <p className="text-lg font-extrabold tracking-tight md:text-xl">
            제품에 대해 궁금하신 점이 있으신가요?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${company.tel.replace(/\./g, "")}`}
              className="border border-neutral-500 px-6 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-black"
            >
              TEL {company.tel}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="bg-brand-red px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
            >
              E-mail {company.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
