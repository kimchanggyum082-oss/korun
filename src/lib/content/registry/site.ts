import { defineContent, type ContentDef } from "../registry-types";

/**
 * Site group — global settings (company + metadata), footer, and the two
 * policy documents. All keys are prefixed `site.` and resolved by
 * `resolveSiteFromRows` (see `./site-resolve`).
 */
const SITE = [
  "/",
  "/en",
  "/admin/site/settings",
  "/admin/site/footer",
  "/admin/site/policy",
];

const settingsSec = { ko: "사이트 설정", en: "Site settings" };
const footerSec = { ko: "푸터", en: "Footer" };
const policySec = { ko: "이용약관", en: "Terms of service" };
const privacySec = { ko: "개인정보처리방침", en: "Privacy policy" };

const d = (
  key: string,
  section: { ko: string; en: string },
  labelKo: string,
  labelEn: string,
  kind: Parameters<typeof defineContent>[5],
) => defineContent(key, "site", section, labelKo, labelEn, kind, SITE);

/**
 * Company contact keys, exported so other groups (e.g. the home location
 * section) can surface the same keys in their editor — one storage location.
 */
const contactDefs = {
  name: d("site.settings.name", settingsSec, "회사명", "Company name", "text"),
  tel: d("site.settings.tel", settingsSec, "전화", "Telephone", "text"),
  email: d("site.settings.email", settingsSec, "이메일", "Email", "text"),
  address: d("site.settings.address", settingsSec, "주소", "Address", "text"),
};

export const siteContactDefs = contactDefs;

export const siteDefs: ContentDef[] = [
  // ── Company & metadata ──
  contactDefs.name,
  d("site.settings.nameEn", settingsSec, "영문명", "English name", "text"),
  d("site.settings.tagline", settingsSec, "대표 문구", "Tagline", "text"),
  d(
    "site.settings.taglineSub",
    settingsSec,
    "보조 문구",
    "Sub tagline",
    "textarea",
  ),
  contactDefs.tel,
  d("site.settings.fax", settingsSec, "팩스", "Fax", "text"),
  contactDefs.email,
  contactDefs.address,
  d(
    "site.settings.mapEmbed",
    settingsSec,
    "지도 임베드 URL",
    "Map embed URL",
    "url",
  ),
  d(
    "site.settings.metadata.title",
    settingsSec,
    "사이트 제목",
    "Site title",
    "text",
  ),
  d(
    "site.settings.metadata.description",
    settingsSec,
    "사이트 설명",
    "Site description",
    "textarea",
  ),
  d(
    "site.settings.metadata.keywords",
    settingsSec,
    "키워드 (줄바꿈 구분)",
    "Keywords (one per line)",
    "textarea",
  ),
  d(
    "site.settings.metadata.ogImage",
    settingsSec,
    "OG 이미지",
    "OG image",
    "image",
  ),

  // ── Footer ──
  d(
    "site.footer.labels.company",
    footerSec,
    "회사명 라벨",
    "Company label",
    "text",
  ),
  d(
    "site.footer.labels.address",
    footerSec,
    "주소 라벨",
    "Address label",
    "text",
  ),
  d("site.footer.labels.tel", footerSec, "TEL 라벨", "TEL label", "text"),
  d("site.footer.labels.fax", footerSec, "팩스 라벨", "Fax label", "text"),
  d(
    "site.footer.labels.email",
    footerSec,
    "이메일 라벨",
    "Email label",
    "text",
  ),
  d("site.footer.copyright", footerSec, "저작권 문구", "Copyright", "textarea"),
  d(
    "site.footer.links.policy",
    footerSec,
    "이용약관 링크 라벨",
    "Terms link label",
    "text",
  ),
  d(
    "site.footer.links.privacy",
    footerSec,
    "개인정보 링크 라벨",
    "Privacy link label",
    "text",
  ),

  // ── Terms of service ──
  d("site.policy.title", policySec, "제목", "Title", "text"),
  d("site.policy.html", policySec, "본문 (HTML)", "Body (HTML)", "textarea"),

  // ── Privacy policy ──
  d("site.privacy.title", privacySec, "제목", "Title", "text"),
  d("site.privacy.html", privacySec, "본문 (HTML)", "Body (HTML)", "textarea"),
];
