import Image from "next/image";
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
      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_320px]">
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
        {spec.image ? (
          <Image
            src={spec.image}
            alt={spec.model}
            width={640}
            height={480}
            sizes="(min-width: 768px) 320px, 100vw"
            className="h-auto w-full"
          />
        ) : null}
      </div>
    </section>
  );
}

export default function ProductBlockView({ block }: { block: ProductBlock }) {
  const isFirst = Boolean(block.title);
  return (
    <>
      {block.title ? (
        <header className="border-b border-neutral-100 bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-12 text-center md:px-6 md:py-16">
            {block.eyebrow ? (
              <p className="text-sm font-bold text-brand-red md:text-base">
                {block.eyebrow}
              </p>
            ) : null}
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
              {block.title}
            </h1>
            {block.subtitleLines?.length ? (
              <p className="mt-3 text-sm leading-relaxed text-neutral-500 md:text-base">
                {block.subtitleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            ) : null}
          </div>
          {block.heroSrc ? (
            <div className="mx-auto max-w-5xl px-4 pb-12 md:px-6 md:pb-16">
              <Image
                src={block.heroSrc}
                alt={block.heroAlt ?? block.title}
                width={1280}
                height={720}
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="h-auto w-full"
              />
            </div>
          ) : null}
        </header>
      ) : null}

      {!isFirst ? (
        <hr className="mx-auto max-w-6xl border-neutral-200" />
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-10">
          <h2 className="text-lg font-extrabold tracking-tight text-neutral-900 md:text-xl">
            {block.introTitle}
          </h2>
          <div className="mt-4 md:mt-0">
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
          </div>
        </div>
      </section>

      <div className="bg-paper py-10 text-center md:py-14">
        <p className="mx-auto max-w-6xl px-4 text-lg font-extrabold tracking-tight text-neutral-800 md:px-6 md:text-2xl">
          {block.galleryLabel}
        </p>
      </div>

      {block.sections.map((s) => (
        <section
          key={s.title}
          className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
        >
          <h3 className="mb-6 text-base font-extrabold tracking-tight text-neutral-900 md:mb-8 md:text-lg">
            {s.title}
          </h3>
          <div className="space-y-6 md:space-y-8">
            {s.images.map((src) => (
              <Image
                key={src}
                src={src}
                alt={`${s.title}`}
                width={1280}
                height={720}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="h-auto w-full"
              />
            ))}
          </div>
        </section>
      ))}

      {block.spec ? <SpecTable block={block} /> : null}
    </>
  );
}
