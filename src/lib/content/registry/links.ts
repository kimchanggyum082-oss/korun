import { PRODUCT_SECTIONS } from "./products";

/**
 * Catalog of in-site links offered by the admin link picker (`kind: "link"`).
 * Grouped for the dropdown; labels are bilingual. `#` is the explicit
 * "no link" option (kept from the original markup, e.g. value pills).
 */

export interface LinkOption {
  href: string;
  label: { ko: string; en: string };
}

export interface LinkOptionGroup {
  label: { ko: string; en: string };
  options: LinkOption[];
}

const productOptions: LinkOption[] = Object.keys(PRODUCT_SECTIONS).map(
  (id) => ({
    href: `/${id}`,
    label: PRODUCT_SECTIONS[id],
  }),
);

export const LINK_OPTION_GROUPS: LinkOptionGroup[] = [
  {
    label: { ko: "기본", en: "General" },
    options: [{ href: "/", label: { ko: "홈", en: "Home" } }],
  },
  {
    label: { ko: "회사 소개", en: "About KORUN" },
    options: [
      { href: "/about/greetings", label: { ko: "인사말", en: "Greetings" } },
      {
        href: "/about/patent-credentials",
        label: { ko: "특허 및 인증", en: "Patent & Credentials" },
      },
      {
        href: "/about/company-location",
        label: { ko: "회사 위치", en: "Company Location" },
      },
      {
        href: "/about/job-posting",
        label: { ko: "채용 정보", en: "Job Posting" },
      },
    ],
  },
  {
    label: { ko: "적용 사례", en: "Case Of Applications" },
    options: [
      {
        href: "/cases/automotive-parts",
        label: { ko: "자동차 부품", en: "Automotive Parts" },
      },
      {
        href: "/cases/transparent-parts",
        label: { ko: "투명 제품", en: "Transparent Parts" },
      },
      {
        href: "/cases/office-house-appliances",
        label: { ko: "사무·가정용 가전", en: "Office & House Appliances" },
      },
      {
        href: "/cases/daily-supplies",
        label: { ko: "생활용품", en: "Daily Supplies" },
      },
      {
        href: "/cases/engineering-plastics-parts",
        label: { ko: "엔지니어링 플라스틱", en: "Engineering Plastics Parts" },
      },
    ],
  },
  {
    label: { ko: "제품", en: "Products" },
    options: productOptions,
  },
  {
    label: { ko: "서비스 센터", en: "Service Center" },
    options: [
      {
        href: "/case-studio",
        label: { ko: "케이스 스튜디오", en: "Case Studio" },
      },
      { href: "/news", label: { ko: "뉴스&이벤트", en: "News & Events" } },
      { href: "/downloads", label: { ko: "자료실", en: "Downloads" } },
      {
        href: "/technology/interesting-items",
        label: { ko: "흥미로운 아이템", en: "Interesting Items" },
      },
    ],
  },
  {
    label: { ko: "기타", en: "Other" },
    options: [{ href: "#", label: { ko: "링크 없음 (#)", en: "No link (#)" } }],
  },
];

export const LINK_OPTION_MAP: Map<string, LinkOption> = new Map(
  LINK_OPTION_GROUPS.flatMap((group) =>
    group.options.map((option) => [option.href, option]),
  ),
);

/** Loose validation for stored link values: catalog entry, path, or URL. */
export function isAllowedLink(value: string): boolean {
  if (/[\s<>"]/.test(value)) return false;
  return value === "#" || value.startsWith("/") || /^https?:\/\//.test(value);
}
