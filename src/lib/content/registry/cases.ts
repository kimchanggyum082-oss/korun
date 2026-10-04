import { casePages } from "@/lib/data";
import {
  defineContent,
  type ContentDef,
  type JsonFieldDef,
} from "../registry-types";

/**
 * Flat, MCell-style content registry for the "Case Of Applications" group
 * (the five case pages). Structure is namespaced per slug (`cases.<slug>.…`)
 * and mirrors the data-file shape so `CasePageData` can be rebuilt key-by-key:
 *   cases.<slug>.subtitle / title
 *   cases.<slug>.heroImage
 *   cases.<slug>.section.{heading,text,images}
 *
 * Section images are a dynamic image list (add/remove/reorder) and open in the
 * shared image viewer on the site. The thumbnail gallery (`galleryImages`) is a
 * mobile-only bundled widget whose images are not editable. Purely-layout
 * fields that cannot be expressed (`heroWidth`, `heroHeight` and each image's
 * `width`/`height`) are read back from the data-file defaults by the resolver.
 */

const CASE_SECTIONS: Record<string, { ko: string; en: string }> = {
  "automotive-parts": { ko: "자동차 부품", en: "Automotive Parts" },
  "transparent-parts": { ko: "투명 제품", en: "Transparent Parts" },
  "office-house-appliances": {
    ko: "사무·가정용 가전",
    en: "Office & House Appliances",
  },
  "daily-supplies": { ko: "생활용품", en: "Daily Supplies" },
  "engineering-plastics-parts": {
    ko: "엔지니어링 플라스틱",
    en: "Engineering Plastics Parts",
  },
};

const revalidateFor = (slug: string): string[] => [
  `/cases/${slug}`,
  `/en/cases/${slug}`,
];

const sectionImageFields: JsonFieldDef[] = [
  { key: "src", kind: "image", label: { ko: "이미지", en: "Image" } },
];

const d = (
  slug: string,
  section: { ko: string; en: string },
  key: string,
  labelKo: string,
  labelEn: string,
  kind: ContentDef["kind"],
  fields?: JsonFieldDef[],
) =>
  defineContent(
    key,
    "cases",
    section,
    labelKo,
    labelEn,
    kind,
    revalidateFor(slug),
    { fields },
  );

export const casesDefs: ContentDef[] = Object.keys(casePages).flatMap(
  (slug) => {
    const page = casePages[slug];
    const section = CASE_SECTIONS[slug] ?? { ko: slug, en: slug };
    const defs: ContentDef[] = [
      d(slug, section, `cases.${slug}.subtitle`, "부제", "Subtitle", "text"),
      d(slug, section, `cases.${slug}.title`, "제목", "Title", "text"),
      d(
        slug,
        section,
        `cases.${slug}.heroImage`,
        "히어로 이미지",
        "Hero image",
        "image",
      ),
    ];

    if (page.section) {
      defs.push(
        d(
          slug,
          section,
          `cases.${slug}.section.heading`,
          "섹션 제목",
          "Section heading",
          "text",
        ),
        d(
          slug,
          section,
          `cases.${slug}.section.text`,
          "섹션 설명",
          "Section text",
          "textarea",
        ),
        d(
          slug,
          section,
          `cases.${slug}.section.images`,
          "섹션 이미지 목록",
          "Section images",
          "imageList",
          sectionImageFields,
        ),
      );
    }

    return defs;
  },
);
