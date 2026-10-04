import { productPages } from "@/lib/data";
import {
  defineContent,
  type ContentDef,
  type JsonFieldDef,
} from "../registry-types";

/**
 * Flat, MCell-style content registry for the products group (pages 21–24).
 *
 * Structure is namespaced per product id (`products.<id>.…`) and mirrors the
 * data-file shape so `ProductPageData` can be rebuilt key-by-key:
 *   products.<id>.navTitle
 *   products.<id>.block.<bi>.{eyebrow,title,introTitle,introImage,introText,
 *     introBullets,tags,galleryLabel,gallery,
 *     application.<ai>.{title,image.<ii>},spec.rows}
 *
 * The block gallery is a dynamic image list (add/remove/reorder, image +
 * thumbnail per row). The spec table is a dynamic `list` rendered as a fixed
 * two-column table (`variant: "table"`) — admins edit cells and add rows, but
 * the label/value columns are fixed. String arrays (bullets, tags, spec
 * values) use newline-separated `textarea` fields. Purely-layout fields that
 * cannot be expressed (`introTrailingBreak`, `showInquiry`, `galleryColumns`,
 * spec widths and the page meta description) are read back from the data-file
 * defaults by the resolver and are not editable.
 */

export const PRODUCT_SECTIONS: Record<string, { ko: string; en: string }> = {
  "21": { ko: "밸브 게이트 시스템", en: "Valve Gate Systems" },
  "22": { ko: "오픈 게이트 시스템", en: "Open Gate Systems" },
  "23": { ko: "싱글 노즐", en: "Single Nozzle" },
  "24": { ko: "온도·시퀀스 컨트롤러", en: "Time & Temperature Controllers" },
};

const revalidateFor = (id: string): string[] => [`/${id}`, `/en/${id}`];

const galleryFields: JsonFieldDef[] = [
  { key: "src", kind: "image", label: { ko: "이미지", en: "Image" } },
  {
    key: "thumb",
    kind: "image",
    label: { ko: "갤러리 썸네일", en: "Gallery thumbnail" },
  },
];

const specFields: JsonFieldDef[] = [
  { key: "label", kind: "text", label: { ko: "항목", en: "Item" } },
  {
    key: "values",
    kind: "textarea",
    label: { ko: "값 (줄바꿈 구분)", en: "Value (one per line)" },
  },
];

const d = (
  id: string,
  section: { ko: string; en: string },
  key: string,
  labelKo: string,
  labelEn: string,
  kind: ContentDef["kind"],
  fields?: JsonFieldDef[],
  variant?: ContentDef["variant"],
) =>
  defineContent(
    key,
    "products",
    section,
    labelKo,
    labelEn,
    kind,
    revalidateFor(id),
    { fields, variant },
  );

export const productsDefs: ContentDef[] = Object.keys(productPages).flatMap(
  (id) => {
    const page = productPages[id];
    const section = PRODUCT_SECTIONS[id] ?? { ko: id, en: id };
    const defs: ContentDef[] = [
      d(
        id,
        section,
        `products.${id}.navTitle`,
        "내비게이션 제목",
        "Nav title",
        "text",
      ),
    ];

    page.blocks.forEach((block, bi) => {
      const base = `products.${id}.block.${bi}`;
      const b = bi + 1;

      defs.push(
        d(
          id,
          section,
          `${base}.eyebrow`,
          `블록 ${b} 상단 문구`,
          `Block ${b} eyebrow`,
          "text",
        ),
        d(
          id,
          section,
          `${base}.title`,
          `블록 ${b} 제목`,
          `Block ${b} title`,
          "text",
        ),
        d(
          id,
          section,
          `${base}.introTitle`,
          `블록 ${b} 도입 제목`,
          `Block ${b} intro title`,
          "text",
        ),
        d(
          id,
          section,
          `${base}.introImage`,
          `블록 ${b} 도입 이미지`,
          `Block ${b} intro image`,
          "image",
        ),
        d(
          id,
          section,
          `${base}.introText`,
          `블록 ${b} 도입 문단`,
          `Block ${b} intro text`,
          "textarea",
        ),
      );

      if (block.introBullets?.length) {
        defs.push(
          d(
            id,
            section,
            `${base}.introBullets`,
            `블록 ${b} 도입 불릿 (줄바꿈 구분)`,
            `Block ${b} intro bullets (one per line)`,
            "textarea",
          ),
        );
      }

      defs.push(
        d(
          id,
          section,
          `${base}.tags`,
          `블록 ${b} 태그 (줄바꿈 구분)`,
          `Block ${b} tags (one per line)`,
          "textarea",
        ),
        d(
          id,
          section,
          `${base}.galleryLabel`,
          `블록 ${b} 갤러리 라벨`,
          `Block ${b} gallery label`,
          "text",
        ),
        d(
          id,
          section,
          `${base}.gallery`,
          `블록 ${b} 갤러리 이미지 목록`,
          `Block ${b} gallery images`,
          "imageList",
          galleryFields,
        ),
      );

      (block.applications ?? []).forEach((application, ai) => {
        defs.push(
          d(
            id,
            section,
            `${base}.application.${ai}.title`,
            `블록 ${b} 응용 ${ai + 1} 제목`,
            `Block ${b} application ${ai + 1} title`,
            "text",
          ),
        );
        application.images.forEach((_, ii) => {
          defs.push(
            d(
              id,
              section,
              `${base}.application.${ai}.image.${ii}`,
              `블록 ${b} 응용 ${ai + 1} 이미지 ${ii + 1}`,
              `Block ${b} application ${ai + 1} image ${ii + 1}`,
              "image",
            ),
          );
        });
      });

      if (block.spec) {
        defs.push(
          d(
            id,
            section,
            `${base}.spec.rows`,
            `블록 ${b} 스펙 표 (항목 · 값)`,
            `Block ${b} spec table (item · value)`,
            "list",
            specFields,
            "table",
          ),
        );
      }
    });

    return defs;
  },
);
