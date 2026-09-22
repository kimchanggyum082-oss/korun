import Link from "next/link";
import type { ProductPageData } from "@/lib/data";

export default function ProductList({
  products,
}: {
  products: Record<string, ProductPageData>;
}) {
  const entries = Object.values(products);
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
          Products
        </p>
        <h1 className="text-[24px] font-bold text-ink">제품</h1>
        <p className="text-sm text-neutral-500">
          제품 페이지 4종의 구성 요소와 사양을 관리합니다. 편집할 제품을
          선택하세요.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {entries.map((product) => (
          <Link
            key={product.id}
            href={`/admin/products/${product.id}`}
            className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-4 transition-colors outline-none hover:border-brand/40 focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            <div className="flex items-center gap-2">
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[11px] text-neutral-500">
                product:{product.id}
              </span>
              <span className="text-[11px] text-neutral-400">
                블록 {product.blocks.length}개
              </span>
            </div>
            <p className="text-[15px] font-bold text-ink">{product.navTitle}</p>
            <p className="line-clamp-2 text-[12px] leading-relaxed text-neutral-500">
              {product.description}
            </p>
            <span className="mt-1 text-[12px] font-semibold text-brand">
              편집하기 →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
