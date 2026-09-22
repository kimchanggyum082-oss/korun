import { Fragment } from "react";
import SmartImage from "@/components/ui/SmartImage";
import ProductGallery from "@/components/products/ProductGallery";
import type { ChromeDict } from "@/lib/i18n/chrome";
import type { ProductBlock } from "@/lib/data";
import { company } from "@/lib/data";

const INTRO_FRAME: Record<string, [number, "cover" | "contain"]> = {
  "dfd5e2ca620da.png": [282, "cover"],
  "65c03f9afdc23.png": [343, "cover"],
  "35a0a3f679657.png": [297, "cover"],
  "85156c9aa20c8.png": [374, "cover"],
  "34b1cd2b6ab9f.png": [368, "cover"],
  "56d2bcc72d525.png": [374, "contain"],
};

const APP_FRAME: Record<string, number> = {
  "72466c8b4c58f.png": 429,
  "291a098c65577.png": 788,
  "6c73897cb7f5b.png": 217,
  "64ba1499dc4ac.png": 400,
  "d416ea9e1e240.png": 676,
  "9ff259f9d8247.png": 210,
  "0ec4d633ce941.png": 400,
  "e5d8a791c4e84.png": 402,
};

const GALLERY_FRAME: Record<number, number> = {
  1: 307,
  2: 307,
  3: 307,
  4: 228,
};

const MOBILE_INTRO_FRAME: Record<string, number> = {
  "dfd5e2ca620da.png": 282,
  "65c03f9afdc23.png": 343,
  "35a0a3f679657.png": 297,
  "85156c9aa20c8.png": 374,
  "34b1cd2b6ab9f.png": 368,
  "56d2bcc72d525.png": 342,
};

const MOBILE_APP_NAT: Record<string, [number, number]> = {
  "72466c8b4c58f.png": [1458, 500],
  "291a098c65577.png": [1079, 788],
  "6c73897cb7f5b.png": [1704, 296],
  "64ba1499dc4ac.png": [1296, 506],
  "d416ea9e1e240.png": [1034, 676],
  "9ff259f9d8247.png": [1670, 281],
  "0ec4d633ce941.png": [1158, 629],
  "e5d8a791c4e84.png": [1505, 304],
};

const MOBILE_APP_LEAD: Record<string, number[]> = {
  "21:0": [0, 40, 40],
  "22:0": [0, 40, 40],
  "23:0": [0],
  "23:1": [0],
};

const MOBILE_APP_PAD1: Record<string, number[]> = {
  "21:0": [0, 1, 1],
  "22:0": [1, 1, 1],
  "23:0": [1],
  "23:1": [0],
};

const MOBILE_SPEC_ROWS: Record<string, number[]> = {
  "24:0": [89, 65, 65, 89, 89, 89, 89, 89, 89, 212],
  "24:1": [89, 89, 113, 113, 44, 69, 89, 89, 89, 99],
};

const MOBILE_TAIL_TRIM: Record<string, number> = {
  "21": 0,
  "22": -1,
  "23": 1,
  "24": -62,
};

function fileOf(url: string) {
  return url.split("/").pop() ?? "";
}

function Pad({ height }: { height: number }) {
  return (
    <div className="py-[15px]">
      <div style={{ height }} />
    </div>
  );
}

function Rule() {
  return (
    <div className="py-[15px]">
      <hr className="border-t border-black/15" />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-[15px]">
      <p className="text-center leading-[24px]">
        <span className="text-[30px] font-bold leading-[36px] text-ink">
          {children}
        </span>
      </p>
    </div>
  );
}

export function ProductTitleBlock({
  block,
  page,
}: {
  block: ProductBlock;
  page: string;
}) {
  return (
    <section className="hidden bg-white pc:block">
      <div className="mx-auto max-w-[1280px] px-[15px] py-[80px]">
        <div className="py-[15px]">
          <p className="text-center leading-[30px]">
            <span className="text-[22px] font-bold leading-[26.4px] text-brand">
              {block.eyebrow}
            </span>
          </p>
        </div>
        {page === "23" ? (
          <div className="py-[15px] text-center">
            <p className="my-[10px] leading-[27.006px]">
              <span className="text-[50px] font-bold leading-[70px] text-ink">
                {block.title}
              </span>
            </p>
          </div>
        ) : (
          <h1 className="mb-[10px] mt-[20px] text-center text-[50px] font-bold leading-[60px] text-ink">
            {block.title}
          </h1>
        )}
      </div>
    </section>
  );
}

function IntroBody({ block, t }: { block: ProductBlock; t: ChromeDict }) {
  const bulletLines = block.introBullets ?? [];
  const tagLines =
    bulletLines.length > 0 ? [] : splitTags(block.tags as readonly string[]);
  return (
    <>
      <p className="leading-[24px]">
        <span className="text-[30px] font-bold leading-[36px] text-ink">
          {block.introTitle}
        </span>
      </p>
      <p className="leading-[24px]">
        <br />
      </p>
      {block.introText ? (
        <p className="leading-[24px]">
          <span className="text-[20px] leading-[24px]">{block.introText}</span>
        </p>
      ) : null}
      {bulletLines.map((b) => (
        <p key={b} className="leading-[24px]">
          <span className="text-[20px] leading-[24px]">
            <strong className="font-bold text-brand">#</strong> {b}
          </span>
        </p>
      ))}
      {block.introText ||
      bulletLines.length === 0 ||
      block.introTrailingBreak ? (
        <p className="leading-[24px]">
          <br />
        </p>
      ) : null}
      {tagLines.map((line, i) => (
        <p
          key={line.join("|")}
          className={`text-[19.29px] leading-[27.006px] ${
            i === 0 ? "mt-[10px]" : ""
          } mb-[10px]`}
        >
          <span className="text-[20px] font-bold leading-[24px] text-brand">
            {line.map((t, j) => (
              <span key={t}>
                {j > 0 ? " \u00a0 \u00a0 " : ""}#{t}
              </span>
            ))}
          </span>
        </p>
      ))}
      {block.showInquiry ? (
        <>
          <p className="leading-[24px]">
            <br />
          </p>
          <p className="leading-[24px]">
            <a
              href={`mailto:${company.email}`}
              className="inline-block rounded-[2px] border border-brand bg-paper px-[22px] py-[6px]"
            >
              <span className="text-[16px] leading-[24px] text-brand">
                {t.product.inquiry}
              </span>
            </a>
          </p>
        </>
      ) : null}
    </>
  );
}

function splitTags(tags: readonly string[]) {
  if (tags.length === 0) return [];
  const first = Math.min(3, tags.length);
  return [tags.slice(0, first), tags.slice(first)].filter((l) => l.length > 0);
}

export function IntroSection({
  block,
  blockIndex,
  t,
}: {
  block: ProductBlock;
  blockIndex: number;
  t: ChromeDict;
}) {
  if (!block.introImage) return null;
  const [frameH, fit] = INTRO_FRAME[fileOf(block.introImage)] ?? [343, "cover"];
  return (
    <section className="hidden pc:block">
      <div className="mx-auto max-w-[1280px] px-[15px]">
        {blockIndex > 0 ? <Pad height={80} /> : null}
        <div className="-mx-[15px] flex items-center">
          <div className="w-1/2 px-[15px]">
            <div className="py-[15px]">
              <div
                className="relative overflow-hidden rounded-[20px] bg-paper"
                style={{ height: frameH }}
              >
                <SmartImage
                  src={block.introImage}
                  alt={block.introTitle}
                  fill
                  unoptimized
                  sizes="(min-width: 992px) 610px"
                  className={
                    fit === "cover" ? "object-cover" : "object-contain"
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 px-[15px]">
            <div className="py-[15px] pl-[50px] pr-[15px]">
              <IntroBody block={block} t={t} />
            </div>
          </div>
        </div>
        <Pad height={50} />
        <Rule />
        <Pad height={50} />
      </div>
    </section>
  );
}

export function GallerySection({
  block,
  t,
}: {
  block: ProductBlock;
  t: ChromeDict;
}) {
  const slots = Math.max(
    block.galleryColumns ?? block.gallery.length,
    block.gallery.length,
  );
  return (
    <section className="hidden pc:block">
      <div className="mx-auto max-w-[1280px] px-[15px]">
        <SectionTitle>{block.galleryLabel}</SectionTitle>
        <div className="py-[15px]">
          <ProductGallery
            images={[...block.gallery]}
            thumbs={block.galleryThumbs ? [...block.galleryThumbs] : undefined}
            columns={block.galleryColumns}
            label={block.galleryLabel}
            frameHeight={GALLERY_FRAME[slots] ?? 307}
          />
        </div>
        <Pad height={50} />
        {block.spec ? (
          <>
            <SectionTitle>Specification</SectionTitle>
            <div className="py-[15px]">
              <SpecTable spec={block.spec} t={t} />
            </div>
            <Pad height={80} />
          </>
        ) : (
          <>
            <Rule />
            <Pad height={50} />
          </>
        )}
      </div>
    </section>
  );
}

export function AppSection({
  app,
  index,
  pad1,
}: {
  app: { title: string; images: string[] };
  index: number;
  pad1: boolean;
}) {
  const src = app.images[0];
  const frameH = APP_FRAME[fileOf(src)] ?? 400;
  return (
    <section className="hidden pc:block">
      <div className="mx-auto max-w-[1280px] px-[15px]">
        {index > 0 ? <Pad height={80} /> : null}
        <SectionTitle>{app.title}</SectionTitle>
        {pad1 ? <Pad height={1} /> : null}
        <div className="py-[15px]">
          <div className="relative w-full" style={{ height: frameH }}>
            <SmartImage
              src={src}
              alt={app.title}
              fill
              unoptimized
              sizes="(min-width: 992px) 1250px"
              className="object-contain"
            />
          </div>
        </div>
        <Pad height={80} />
      </div>
    </section>
  );
}

function SpecTable({
  spec,
  t,
}: {
  spec: NonNullable<ProductBlock["spec"]>;
  t: ChromeDict;
}) {
  return (
    <table className="w-full text-[15px] leading-[24px]">
      <tbody>
        <tr>
          <td
            style={{ width: "20%" }}
            className="border border-[#ececec] bg-[#54acd2] p-[8px] align-middle"
          >
            <div className="text-center">
              <span className="text-[20px] font-bold text-white">-</span>
            </div>
          </td>
          <td
            style={{ width: "50%" }}
            className="border border-[#ececec] bg-[#54acd2] p-[8px] align-middle"
          >
            <div className="text-center">
              <br />
            </div>
            <div className="text-center">
              <span className="text-[20px] font-bold text-white">
                {t.product.specs}
              </span>
            </div>
            <p>
              <br />
            </p>
          </td>
        </tr>
        {spec.rows.map((row) => (
          <Fragment key={row.label}>
            <tr>
              <td
                rowSpan={row.values.length === 2 ? 2 : 1}
                style={{ width: row.labelWidth ?? "20%" }}
                className="border border-[#ececec] bg-[#54acd2] p-[8px] align-middle"
              >
                <div className="text-center">
                  <span className="text-[20px]">
                    <br />
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[20px] font-bold text-white">
                    {row.label}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[20px]">
                    <br />
                  </span>
                </div>
              </td>
              <ValueCell
                lines={row.values.length === 2 ? [row.values[0]] : row.values}
                width={row.valueWidth}
              />
            </tr>
            {row.values.length === 2 ? (
              <tr>
                <ValueCell lines={[row.values[1]]} width={row.valueWidth} />
              </tr>
            ) : null}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

function ValueCell({
  lines,
  width = "50%",
}: {
  lines: readonly string[];
  width?: string;
}) {
  return (
    <td
      style={{ width }}
      className="border border-[#ececec] p-[8px] align-middle"
    >
      <div className="text-center">
        <span className="text-[20px] text-ink">
          {lines.map((line, i) => (
            <span key={line}>
              {i > 0 ? <br /> : null}
              {line}
            </span>
          ))}
          <br />
        </span>
      </div>
    </td>
  );
}

function MRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-[7.5px] text-[15px] leading-[24px]">{children}</div>
  );
}

function MPad({ height }: { height: number }) {
  return (
    <MRow>
      <div style={{ height }} />
    </MRow>
  );
}

function MSection({
  bg,
  pad,
  children,
}: {
  bg?: string;
  pad?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="pc:hidden"
      style={bg ? { backgroundColor: bg } : undefined}
    >
      <div
        className={`mx-auto max-w-[1280px] break-keep break-words px-[15px] ${pad ?? ""}`}
      >
        {children}
      </div>
    </section>
  );
}

function MHeading({ block, bg }: { block: ProductBlock; bg?: string }) {
  return (
    <MSection bg={bg} pad="py-[50px]">
      {block.eyebrow ? (
        <MRow>
          <p className="text-center">
            <strong className="text-[15px] font-bold leading-[24px] text-[#00351d]">
              {block.eyebrow}
            </strong>
          </p>
        </MRow>
      ) : null}
      <MRow>
        <p className="text-center">
          <strong className="text-[30px] font-bold leading-[36px] text-ink">
            {block.title}
          </strong>
        </p>
      </MRow>
    </MSection>
  );
}

function MIntroImage({
  block,
  page,
  blockIndex,
  bg,
}: {
  block: ProductBlock;
  page: string;
  blockIndex: number;
  bg?: string;
}) {
  if (!block.introImage) return null;
  const height = MOBILE_INTRO_FRAME[fileOf(block.introImage)] ?? 282;
  return (
    <MSection bg={bg}>
      {blockIndex > 0 ? <MPad height={40} /> : null}
      <MRow>
        <div className="relative w-full" style={{ height }}>
          <SmartImage
            src={block.introImage}
            alt={block.introTitle}
            fill
            unoptimized
            sizes="100vw"
          />
        </div>
      </MRow>
      {blockIndex > 0 && page === "24" ? <MPad height={25} /> : null}
    </MSection>
  );
}

function MTagLines({ tags, h6 }: { tags: readonly string[]; h6: boolean }) {
  const first = Math.min(3, tags.length);
  const line1 = tags
    .slice(0, first)
    .map((t) => `#${t}`)
    .join(" \u00a0 \u00a0 ");
  const line2 = tags
    .slice(first)
    .map((t) => `#${t}`)
    .join(" \u00a0 \u00a0 ");
  if (h6) {
    return (
      <h6 className="my-[10px] text-[16px] leading-[22.4px]">
        <span className="text-[16px] leading-[22.4px] text-brand">
          <strong>{line1}&nbsp;</strong>
        </span>
        {line2 ? (
          <span className="text-[16px] leading-[22.4px] text-brand">
            <strong>{line2}</strong>
          </span>
        ) : null}
      </h6>
    );
  }
  return (
    <>
      <p>
        <span className="text-[16px] leading-[25.6px] text-brand">
          <strong>{line1}</strong>
        </span>
      </p>
      {line2 ? (
        <p>
          <span className="text-[16px] leading-[25.6px] text-brand">
            <strong>{line2}</strong>
          </span>
        </p>
      ) : null}
    </>
  );
}

function MIntroText({
  block,
  page,
  bg,
}: {
  block: ProductBlock;
  page: string;
  bg?: string;
}) {
  const bullets = block.introBullets ?? [];
  return (
    <MSection bg={bg}>
      <MPad height={1} />
      <MRow>
        <p>
          <strong className="text-[22px] font-bold leading-[26.4px] text-ink">
            {block.introTitle}
          </strong>
        </p>
        <p>
          <span className="text-[16px] leading-[25.6px]">
            <br />
          </span>
        </p>
        {bullets.length ? (
          bullets.map((b) => (
            <p key={b}>
              <span className="text-[16px] leading-[25.6px]">
                <span className="text-brand">#</span> {b}
              </span>
            </p>
          ))
        ) : (
          <>
            <p>
              <span className="text-[16px] leading-[25.6px]">
                {block.introText}
              </span>
            </p>
            <p>
              <span className="text-[16px] leading-[25.6px]">
                <br />
              </span>
            </p>
            <MTagLines tags={block.tags} h6={page === "21"} />
          </>
        )}
      </MRow>
      <MPad height={30} />
    </MSection>
  );
}

function MGallery({
  block,
  bg,
  specHeights,
  trim = 0,
  t,
}: {
  block: ProductBlock;
  bg?: string;
  specHeights?: number[];
  trim?: number;
  t: ChromeDict;
}) {
  return (
    <MSection bg={bg}>
      <MRow>
        <p className="text-center">
          <strong className="text-[20px] font-bold leading-[24px] text-ink">
            {block.galleryLabel}
          </strong>
        </p>
      </MRow>
      <MRow>
        <ProductGallery
          images={[...block.gallery]}
          thumbs={block.galleryThumbs ? [...block.galleryThumbs] : undefined}
          label={block.galleryLabel}
        />
      </MRow>
      <MPad height={25} />
      {block.spec ? (
        <>
          <MRow>
            <p className="text-center">
              <strong className="text-[20px] font-bold leading-[24px] text-ink">
                Specification
              </strong>
            </p>
          </MRow>
          <MRow>
            <MSpecTable spec={block.spec} heights={specHeights ?? []} t={t} />
          </MRow>
          <MPad height={40 - trim} />
        </>
      ) : (
        <>
          <MRow>
            <hr className="border-t border-black/15" />
          </MRow>
          <MPad height={25} />
        </>
      )}
    </MSection>
  );
}

function MValueCell({
  lines,
  width = "50%",
  height,
}: {
  lines: readonly string[];
  width?: string;
  height?: number;
}) {
  return (
    <td
      style={{ width, height }}
      className="border border-[#ececec] p-[8px] text-center align-middle"
    >
      <div
        className="text-center"
        style={{ minHeight: height ? height - 16 : undefined }}
      >
        <span className="text-[15px] leading-[18px] text-ink">
          {lines.map((line, i) => (
            <span key={line}>
              {i > 0 ? <br /> : null}
              {line}
            </span>
          ))}
          <br />
        </span>
      </div>
    </td>
  );
}

function MSpecTable({
  spec,
  heights,
  t,
}: {
  spec: NonNullable<ProductBlock["spec"]>;
  heights: number[];
  t: ChromeDict;
}) {
  return (
    <table className="w-full text-[15px] leading-[18px]">
      <tbody>
        <tr>
          <td className="border border-[#ececec] bg-[#54acd2] p-[8px] text-center align-middle">
            <div
              style={{ minHeight: heights[0] ? heights[0] - 16 : undefined }}
            >
              <span className="text-[15px] font-bold text-white">-</span>
            </div>
          </td>
          <td className="border border-[#ececec] bg-[#54acd2] p-[8px] text-center align-middle">
            <div
              style={{ minHeight: heights[0] ? heights[0] - 16 : undefined }}
            >
              <div>
                <br />
              </div>
              <div>
                <span className="text-[15px] font-bold text-white">
                  {t.product.specs}
                </span>
              </div>
              <p>
                <br />
              </p>
            </div>
          </td>
        </tr>
        {spec.rows.map((row, i) => (
          <Fragment key={row.label}>
            <tr>
              <td
                rowSpan={row.values.length === 2 ? 2 : 1}
                style={{
                  width: row.labelWidth ?? "20%",
                  height: heights[i + 1],
                }}
                className="border border-[#ececec] bg-[#54acd2] p-[8px] align-middle"
              >
                <div
                  className="text-center"
                  style={{
                    minHeight: heights[i + 1]
                      ? (row.values.length === 2
                          ? heights[i + 1] + (heights[i + 2] ?? 0)
                          : heights[i + 1]) - 16
                      : undefined,
                  }}
                >
                  <span className="text-[15px] font-bold text-white">
                    {row.label}
                  </span>
                </div>
              </td>
              <MValueCell
                lines={row.values.length === 2 ? [row.values[0]] : row.values}
                width={row.valueWidth}
                height={heights[i + 1]}
              />
            </tr>
            {row.values.length === 2 ? (
              <tr>
                <MValueCell
                  lines={[row.values[1]]}
                  width={row.valueWidth}
                  height={heights[i + 2]}
                />
              </tr>
            ) : null}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

function MApp({
  app,
  page,
  blockIndex,
  index,
  trim = 0,
}: {
  app: { title: string; images: string[] };
  page: string;
  blockIndex: number;
  index: number;
  trim?: number;
}) {
  const key = `${page}:${blockIndex}`;
  const lead = MOBILE_APP_LEAD[key]?.[index] ?? 0;
  const pad1 = MOBILE_APP_PAD1[key]?.[index] ?? 0;
  const src = app.images[0];
  const [nw, nh] = MOBILE_APP_NAT[fileOf(src)] ?? [1280, 720];
  const bg =
    index === 1 && (page === "21" || page === "22")
      ? "rgba(247,247,247,0.95)"
      : blockIndex > 0
        ? "#f7f7f7"
        : undefined;
  return (
    <MSection bg={bg}>
      {lead ? <MPad height={lead} /> : null}
      <MRow>
        <p className="text-center">
          <strong className="text-[20px] font-bold leading-[24px] text-ink">
            {app.title}
          </strong>
        </p>
      </MRow>
      {pad1 ? <MPad height={pad1} /> : null}
      <MRow>
        <SmartImage
          src={src}
          alt={app.title}
          width={nw}
          height={nh}
          unoptimized
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="h-auto w-full"
        />
      </MRow>
      <MPad height={40 - trim} />
    </MSection>
  );
}

export default function ProductBlockView({
  t,
  block,
  blockIndex,
  page,
  isLastBlock = false,
}: {
  t: ChromeDict;
  block: ProductBlock;
  blockIndex: number;
  page: string;
  isLastBlock?: boolean;
}) {
  const apps = block.applications ?? [];
  const mBg = blockIndex > 0 ? "#f7f7f7" : undefined;
  const tailTrim = isLastBlock ? (MOBILE_TAIL_TRIM[page] ?? 0) : 0;
  return (
    <>
      {block.title ? <ProductTitleBlock block={block} page={page} /> : null}

      {block.title ? <MHeading block={block} bg={mBg} /> : null}

      {block.introImage ? (
        <MIntroImage
          block={block}
          page={page}
          blockIndex={blockIndex}
          bg={mBg}
        />
      ) : null}

      {block.introText || (block.introBullets?.length ?? 0) > 0 ? (
        <MIntroText block={block} page={page} bg={mBg} />
      ) : null}

      {block.gallery.length ? (
        <MGallery
          block={block}
          bg={mBg}
          specHeights={MOBILE_SPEC_ROWS[`${page}:${blockIndex}`]}
          trim={block.spec ? tailTrim : 0}
          t={t}
        />
      ) : null}

      {apps.map((app, i) => (
        <MApp
          key={app.title}
          app={app}
          page={page}
          blockIndex={blockIndex}
          index={i}
          trim={i === apps.length - 1 ? tailTrim : 0}
        />
      ))}

      <IntroSection block={block} blockIndex={blockIndex} t={t} />

      {block.gallery.length ? <GallerySection block={block} t={t} /> : null}

      {apps.map((app, i) => (
        <AppSection
          key={app.title}
          app={app}
          index={i}
          pad1={
            !(page === "21" && blockIndex === 0 && i === 0) &&
            !(page === "23" && blockIndex === 1 && i === 0)
          }
        />
      ))}
    </>
  );
}
