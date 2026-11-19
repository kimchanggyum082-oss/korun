import {
  defineContent,
  type ContentDef,
  type JsonFieldDef,
} from "../registry-types";
import { locationListDef } from "./about";
import { siteContactDefs } from "./site";

const HOME = ["/", "/en"];

const heroSec = { ko: "히어로", en: "Hero" };
const prodSec = { ko: "제품 소개", en: "Products" };
const valSec = { ko: "가치 배너", en: "Values banner" };
const ctaSec = { ko: "CTA 배너", en: "CTA banner" };
const listSec = { ko: "뉴스 · 다운로드", en: "News · Downloads" };
const locSec = { ko: "오시는 길", en: "Location" };

const slideFields: JsonFieldDef[] = [
  {
    key: "src",
    kind: "image",
    label: { ko: "슬라이드 이미지", en: "Slide image" },
  },
];

const productFields: JsonFieldDef[] = [
  { key: "title", kind: "text", label: { ko: "이름", en: "Name" } },
  { key: "href", kind: "link", label: { ko: "링크", en: "Link" } },
  { key: "src", kind: "image", label: { ko: "이미지", en: "Image" } },
  {
    key: "hoverSrc",
    kind: "image",
    label: { ko: "호버 이미지", en: "Hover image" },
  },
];

const pillFields: JsonFieldDef[] = [
  { key: "label", kind: "text", label: { ko: "문구", en: "Label" } },
  { key: "href", kind: "link", label: { ko: "링크", en: "Link" } },
];

const d = (
  key: string,
  section: { ko: string; en: string },
  labelKo: string,
  labelEn: string,
  kind: Parameters<typeof defineContent>[5],
  fields?: JsonFieldDef[],
  maxItems?: number,
  shared?: boolean,
) =>
  defineContent(key, "home", section, labelKo, labelEn, kind, HOME, {
    fields,
    maxItems,
    shared,
  });

export const homeDefs: ContentDef[] = [
  // ── Hero (image carousel — dynamic list, one image per slide) ──
  d(
    "home.hero.slides",
    heroSec,
    "슬라이드 목록",
    "Slides",
    "imageList",
    slideFields,
  ),

  // ── Products ──
  d("home.products.bg", prodSec, "배경 이미지", "Background image", "image"),
  d(
    "home.products.title",
    prodSec,
    "제목 (줄바꿈으로 모바일 줄 나눔)",
    "Title (newlines split mobile lines)",
    "textarea",
  ),
  d(
    "home.products.body",
    prodSec,
    "설명 (줄바꿈으로 모바일 줄 나눔)",
    "Description (newlines split mobile lines)",
    "textarea",
  ),
  d(
    "home.products.items",
    prodSec,
    "제품 목록 (최대 4개)",
    "Products (max 4)",
    "list",
    productFields,
    4,
  ),

  // ── Values banner ──
  d("home.values.bg", valSec, "배경 이미지", "Background image", "image"),
  d("home.values.pills", valSec, "배지 목록", "Pills", "list", pillFields),

  // ── CTA banner ──
  d(
    "home.cta.photo",
    ctaSec,
    "사진 (PC·모바일 공용)",
    "Photo (desktop & mobile)",
    "image",
  ),
  d(
    "home.cta.text",
    ctaSec,
    "문구 (줄바꿈으로 줄 나눔)",
    "Text (newlines split lines)",
    "textarea",
  ),

  // ── News · Downloads ──
  d(
    "home.lists.newsHeadingEn",
    listSec,
    "뉴스 영문 라벨 (공통)",
    "News eyebrow (EN, shared)",
    "text",
    undefined,
    undefined,
    true,
  ),
  d(
    "home.lists.newsHeadingKo",
    listSec,
    "뉴스 제목 (국문/영문)",
    "News heading (KO/EN)",
    "text",
  ),
  d(
    "home.lists.downloadsHeadingEn",
    listSec,
    "다운로드 영문 라벨 (공통)",
    "Downloads eyebrow (EN, shared)",
    "text",
    undefined,
    undefined,
    true,
  ),
  d(
    "home.lists.downloadsHeadingKo",
    listSec,
    "다운로드 제목 (국문/영문)",
    "Downloads heading (KO/EN)",
    "text",
  ),

  // ── Location ──
  d(
    "home.location.headingEn",
    locSec,
    "영문 상단 문구 (공통)",
    "English kicker (shared)",
    "text",
    undefined,
    undefined,
    true,
  ),
  d(
    "home.location.headingKo",
    locSec,
    "제목 (국문/영문)",
    "Heading (KO/EN)",
    "text",
  ),
];

/**
 * Site-level contact keys surfaced in the home location section (same keys,
 * same storage — editing here edits the site settings).
 */
export const homeLocationExtraDefs: ContentDef[] = [
  ...[
    siteContactDefs.name,
    siteContactDefs.tel,
    siteContactDefs.email,
    siteContactDefs.address,
  ].map((def) => ({ ...def, section: locSec })),
  { ...locationListDef, section: locSec },
];
