import SmartImage from "@/components/ui/SmartImage";
import ProductGallery from "@/components/products/ProductGallery";
import type { ProductBlock } from "@/lib/data";
import { company } from "@/lib/data";

function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-full border border-neutral-200 bg-paper px-4 py-1.5 text-[13px] font-semibold text-neutral-500"
        >
          #{t}
        </li>
      ))}
    </ul>
  );
}

function InquiryLink() {
  return (
    <a
      href={`mailto:${company.email}`}
      className="inline-flex items-center gap-1 text-sm font-bold text-brand-red transition-opacity hover:opacity-70"
    >
      문의하기
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

function IntroContent({ block }: { block: ProductBlock }) {
  return (
    <>
      {block.introText ? (
        <p className="leading-loose text-neutral-600">{block.introText}</p>
      ) : null}
      {block.introBullets?.length ? (
        <ul className="space-y-2.5">
          {block.introBullets.map((b) => (
            <li key={b} className="flex gap-2 leading-relaxed text-neutral-600">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Tags tags={block.tags} />
      </div>
      {block.showInquiry ? (
        <div className="mt-6">
          <InquiryLink />
        </div>
      ) : null}
    </>
  );
}

function SpecTable({ block }: { block: ProductBlock }) {
  const spec = block.spec!;
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24">
      <h3 className="mb-8 text-xl font-extrabold tracking-tight text-neutral-900 md:text-2xl">
        Specification <span className="text-neutral-300">-</span>{" "}
        <span className="text-base font-bold text-neutral-500 md:text-lg">
          사양
        </span>
      </h3>
      <dl className="divide-y divide-neutral-200 overflow-hidden rounded-md border border-neutral-200 text-sm">
        {spec.rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[160px_minmax(0,1fr)]"
          >
            <dt className="bg-paper px-4 py-3.5 font-bold text-neutral-700">
              {row.label}
            </dt>
            <dd className="px-4 py-3.5 leading-relaxed text-neutral-600">
              {row.values.length > 1 ? (
                <ul className="space-y-1">
                  {row.values.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              ) : (
                row.values[0]
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function ProductBlockView({ block }: { block: ProductBlock }) {
  const hasTitle = Boolean(block.title);
  return (
    <>
      {block.title ? (
        <header className="border-b border-neutral-100 bg-paper pc:hidden">
          <div className="mx-auto max-w-6xl px-4 py-12 text-center md:px-6 md:py-16">
            {block.eyebrow ? (
              <p className="text-sm font-bold text-brand-red md:text-base">
                {block.eyebrow}
              </p>
            ) : null}
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
              {block.title}
            </h1>
          </div>
        </header>
      ) : null}

      {block.title ? (
        <header className="hidden bg-white pb-[10px] pt-[80px] text-center pc:block">
          {block.eyebrow ? (
            <p className="text-[20px] font-bold text-brand">{block.eyebrow}</p>
          ) : null}
          <h1 className="mt-[10px] text-[54px] font-bold leading-[1.3] text-ink">
            {block.title}
          </h1>
        </header>
      ) : null}

      {!hasTitle ? (
        <hr className="mx-auto max-w-6xl border-neutral-200 pc:hidden" />
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-14 pc:hidden md:px-6 md:py-20">
        <div className="md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-10">
          <h2 className="text-lg font-extrabold tracking-tight text-neutral-900 md:text-xl">
            {block.introTitle}
          </h2>
          <div className="mt-4 md:mt-0">
            <IntroContent block={block} />
          </div>
        </div>

        {block.introImage ? (
          <div className="mt-10 md:mt-14">
            <SmartImage
              src={block.introImage}
              alt={block.introTitle}
              width={1280}
              height={720}
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="h-auto w-full"
            />
          </div>
        ) : null}
      </section>

      <section className="mx-auto hidden max-w-[1280px] px-[15px] pb-[40px] pt-[24px] pc:block">
        <div className="grid grid-cols-2 gap-[30px]">
          <div>
            {block.introImage ? (
              <SmartImage
                src={block.introImage}
                alt={block.introTitle}
                width={1220}
                height={1060}
                sizes="(min-width: 992px) 50vw"
                className="h-auto w-full"
              />
            ) : null}
          </div>
          <div className="pl-[50px] pt-[56px]">
            <h2 className="text-[30px] font-bold leading-[1.2] text-ink">
              {block.introTitle}
            </h2>
            <div className="mt-[18px] space-y-4 text-[15px] leading-[1.75] text-ink">
              <IntroContent block={block} />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-paper py-10 text-center md:py-14">
        <p className="mx-auto max-w-6xl px-4 text-lg font-extrabold tracking-tight text-neutral-800 md:px-6 md:text-2xl">
          {block.galleryLabel}
        </p>
      </div>

      {block.gallery.length ? (
        <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <ProductGallery
            images={[...block.gallery]}
            label={block.galleryLabel}
          />
        </section>
      ) : null}

      {block.applications?.map((s) => (
        <section key={s.title} className="bg-paper">
          <div className="mx-auto max-w-[1100px] px-4 py-12 md:px-6 md:py-16">
            <h3 className="mb-6 text-base font-extrabold tracking-tight text-neutral-900 md:mb-8 md:text-lg">
              {s.title}
            </h3>
            <div className="space-y-6">
              {s.images.map((src) => (
                <SmartImage
                  key={src}
                  src={src}
                  alt={s.title}
                  width={1100}
                  height={700}
                  sizes="(min-width: 1100px) 1100px, 100vw"
                  className="h-auto w-full"
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {block.spec ? <SpecTable block={block} /> : null}
    </>
  );
}
