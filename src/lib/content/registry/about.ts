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
) =>
  defineContent(key, "about", section, labelKo, labelEn, kind, revalidate, {
    fields,
  });

const paragraphFields: JsonFieldDef[] = [
  { key: "text", kind: "textarea", label: { ko: "단락", en: "Paragraph" } },
];

const galleryFields: JsonFieldDef[] = [
  { key: "src", kind: "image", label: { ko: "이미지", en: "Image" } },
  {
    key: "fullSrc",
    kind: "image",
    label: { ko: "원본 이미지", en: "Full image" },
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
    galleryFields,
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
    "about.location.headingEn",
    locationSec,
    "영문 제목",
    "Heading (EN)",
    "text",
    LOCATION,
  ),
  d(
    "about.location.headingKo",
    locationSec,
    "국문 제목",
    "Heading (KO)",
    "text",
    LOCATION,
  ),
  d(
    "about.location.labels.tel",
    locationSec,
    "TEL 라벨",
    "TEL label",
    "text",
    LOCATION,
  ),
  d(
    "about.location.labels.email",
    locationSec,
    "EMAIL 라벨",
    "EMAIL label",
    "text",
    LOCATION,
  ),
  d(
    "about.location.labels.address",
    locationSec,
    "ADDRESS 라벨",
    "ADDRESS label",
    "text",
    LOCATION,
  ),
  d(
    "about.location.name",
    locationSec,
    "위치 이름",
    "Location name",
    "text",
    LOCATION,
  ),
  d(
    "about.location.description",
    locationSec,
    "위치 설명",
    "Location description",
    "textarea",
    LOCATION,
  ),
  d(
    "about.location.images",
    locationSec,
    "위치 이미지 목록",
    "Location images",
    "imageList",
    LOCATION,
    galleryFields,
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
