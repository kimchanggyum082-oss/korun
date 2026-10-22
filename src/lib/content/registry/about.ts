import {
  defineContent,
  type ContentDef,
  type JsonFieldDef,
} from "../registry-types";

const greetingsSec = { ko: "인사말", en: "Greetings" };
const patentSec = { ko: "특허 및 인증", en: "Patent & Credentials" };
const locationSec = { ko: "오시는 길", en: "Company Location" };
const jobSec = { ko: "채용 정보", en: "Job Posting" };

const GREETINGS = ["/about/greetings", "/en/about/greetings"];
const PATENT = ["/about/patent-credentials", "/en/about/patent-credentials"];
const LOCATION = ["/about/company-location", "/en/about/company-location"];
const JOB = ["/about/job-posting", "/en/about/job-posting"];

const d = (
  key: string,
  section: { ko: string; en: string },
  labelKo: string,
  labelEn: string,
  kind: ContentDef["kind"],
  revalidate: string[],
  fields?: JsonFieldDef[],
  sharedList?: boolean,
) =>
  defineContent(key, "about", section, labelKo, labelEn, kind, revalidate, {
    fields,
    sharedList,
  });

const paragraphFields: JsonFieldDef[] = [
  {
    key: "text",
    kind: "textarea",
    label: { ko: "단락", en: "Paragraph" },
    localized: true,
  },
];

const galleryFields: JsonFieldDef[] = [
  { key: "src", kind: "image", label: { ko: "이미지", en: "Image" } },
  {
    key: "fullSrc",
    kind: "image",
    label: { ko: "원본 이미지", en: "Full image" },
  },
];

/** Facility gallery: the title is the caption shown below each image. */
const facilityGalleryFields: JsonFieldDef[] = [
  ...galleryFields,
  {
    key: "title",
    kind: "text",
    label: {
      ko: "이미지 제목 (이미지 아래 문구)",
      en: "Image title (caption below image)",
    },
    localized: true,
  },
];

const locationGalleryFields: JsonFieldDef[] = [
  ...galleryFields,
  {
    key: "title",
    kind: "text",
    label: { ko: "제목", en: "Title" },
    localized: true,
  },
  {
    key: "description",
    kind: "textarea",
    label: { ko: "설명", en: "Description" },
    localized: true,
  },
];

/** Key/value row used by each location's contact list. */
const locationContactFields: JsonFieldDef[] = [
  {
    key: "label",
    kind: "text",
    label: { ko: "항목명", en: "Label" },
    localized: true,
  },
  {
    key: "value",
    kind: "text",
    label: { ko: "값", en: "Value" },
    localized: true,
  },
];

const locationFields: JsonFieldDef[] = [
  {
    key: "name",
    kind: "text",
    label: { ko: "위치 이름", en: "Location name" },
    localized: true,
  },
  {
    key: "headingEn",
    kind: "text",
    label: { ko: "영문 상단 제목", en: "Kicker (EN)" },
  },
  {
    key: "heading",
    kind: "text",
    label: { ko: "제목", en: "Heading" },
    localized: true,
  },
  {
    key: "description",
    kind: "textarea",
    label: { ko: "설명", en: "Description" },
    localized: true,
  },
  {
    key: "mapEmbed",
    kind: "url",
    label: { ko: "지도 임베드 URL", en: "Map embed URL" },
  },
  {
    key: "mapTitle",
    kind: "text",
    label: { ko: "지도 제목", en: "Map title" },
    localized: true,
  },
  {
    key: "contacts",
    kind: "list",
    label: { ko: "연락처 목록", en: "Contacts" },
    fields: locationContactFields,
  },
  {
    key: "images",
    kind: "list",
    label: { ko: "이미지 목록", en: "Images" },
    fields: locationGalleryFields,
  },
];

export const aboutDefs: ContentDef[] = [
  // ── Greetings ──
  d(
    "about.greetings.banner.line1",
    greetingsSec,
    "배너 문구 1",
    "Banner line 1",
    "text",
    GREETINGS,
  ),
  d(
    "about.greetings.banner.line2",
    greetingsSec,
    "배너 문구 2",
    "Banner line 2",
    "text",
    GREETINGS,
  ),
  d(
    "about.greetings.banner.title",
    greetingsSec,
    "배너 제목",
    "Banner title",
    "text",
    GREETINGS,
  ),
  d(
    "about.greetings.heading",
    greetingsSec,
    "본문 제목",
    "Heading",
    "text",
    GREETINGS,
  ),
  d(
    "about.greetings.intro",
    greetingsSec,
    "도입 문단",
    "Intro",
    "textarea",
    GREETINGS,
  ),
  d(
    "about.greetings.paragraphs",
    greetingsSec,
    "본문 단락",
    "Paragraphs",
    "list",
    GREETINGS,
    paragraphFields,
    true,
  ),
  d(
    "about.greetings.signature",
    greetingsSec,
    "서명",
    "Signature",
    "text",
    GREETINGS,
  ),
  d(
    "about.greetings.image",
    greetingsSec,
    "인사말 이미지",
    "Greeting image",
    "image",
    GREETINGS,
  ),
  d(
    "about.greetings.gallery",
    greetingsSec,
    "시설 이미지 목록",
    "Facility images",
    "imageList",
    GREETINGS,
    facilityGalleryFields,
  ),

  // ── Patent & Credentials ──
  d(
    "about.patent.title",
    patentSec,
    "페이지 제목",
    "Page title",
    "text",
    PATENT,
  ),
  d(
    "about.patent.images",
    patentSec,
    "인증 이미지 목록",
    "Credential images",
    "imageList",
    PATENT,
    galleryFields,
  ),

  // ── Company Location ──
  d(
    "about.location.title",
    locationSec,
    "페이지 제목",
    "Page title",
    "text",
    LOCATION,
  ),
  d(
    "about.location.locations",
    locationSec,
    "위치 목록",
    "Locations",
    "list",
    LOCATION,
    locationFields,
    true,
  ),

  // ── Job Posting ──
  d(
    "about.job-posting.title",
    jobSec,
    "페이지 제목",
    "Page title",
    "text",
    JOB,
  ),
  d(
    "about.job-posting.detailTagline",
    jobSec,
    "상단 문구",
    "Tagline",
    "text",
    JOB,
  ),
];
