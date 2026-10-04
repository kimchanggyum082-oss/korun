import { company, sitePolicyModals } from "@/lib/data";
import type { Locale } from "@/lib/i18n/locales";
import type { ContentRows } from "../page-content";
import { pickLines, pickText } from "../registry-resolve";
import { SITE_EN } from "./site-en";

export type SiteSettingsResolved = {
  name: string;
  nameEn: string;
  tagline: string;
  taglineSub: string;
  tel: string;
  fax: string;
  email: string;
  address: string;
  mapEmbed: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
};

export type SiteFooterResolved = {
  labels: {
    company: string;
    address: string;
    tel: string;
    fax: string;
    email: string;
  };
  copyright: string;
  links: {
    policy: string;
    privacy: string;
  };
};

export type SitePolicyResolved = {
  title: string;
  html: string;
};

export interface SiteResolved {
  settings: SiteSettingsResolved;
  footer: SiteFooterResolved;
  policy: SitePolicyResolved;
  privacy: SitePolicyResolved;
}

/** Metadata defaults — kept in sync with `SITE_METADATA_DEFAULT` in the
 *  admin entity store (inlined here so this resolver stays client-safe). */
const METADATA_DEFAULT = {
  title: "코런",
  description:
    "코런은 밸브 게이트, 오픈 게이트, 싱글 노즐, 온도·시퀀스 컨트롤러를 개발·제조하는 핫러너 시스템 전문기업입니다. 다양한 사출 환경에 최적화된 기술과 맞춤형 솔루션을 제공합니다.",
  keywords: ["코런"],
  ogImage:
    "https://cdn.imweb.me/upload/S20240617d196c3c9ecacb/2b04303145abc.png",
};

/** Footer defaults — kept in sync with `siteFooterDefault()` in the admin
 *  entity store (inlined here so this resolver stays client-safe). */
const FOOTER_DEFAULT: SiteFooterResolved = {
  labels: {
    company: "회사명",
    address: "주소",
    tel: "TEL",
    fax: "Fax",
    email: "E-mail",
  },
  copyright:
    "COPYRIGHT © 주식회사코런. ALL RIGHTS RESERVED. DESIGN HOSTING BY WEMENTO.",
  links: {
    policy: "이용약관",
    privacy: "개인정보취급방침",
  },
};

/**
 * Pure resolver — used by both the public site resolvers (server) and the admin
 * preview (client). Overrides win, then the EN default (when locale is en),
 * then the data-file default. Every key is recorded into `collect` (arrays
 * joined with newlines) for the admin editor's default prefill.
 */
export function resolveSiteFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): SiteResolved {
  const t = (key: string, fallback: string) => {
    const value = pickText(
      rows,
      key,
      locale,
      locale === "en" ? (SITE_EN[key] ?? fallback) : fallback,
    );
    collect?.set(key, value);
    return value;
  };
  const lines = (key: string, fallback: readonly string[]) => {
    const value = pickLines(
      rows,
      key,
      locale,
      locale === "en" && SITE_EN[key] ? SITE_EN[key].split(/\r?\n/) : fallback,
    );
    collect?.set(key, value.join("\n"));
    return value;
  };

  const settings: SiteSettingsResolved = {
    name: t("site.settings.name", company.name),
    nameEn: t("site.settings.nameEn", company.nameEn),
    tagline: t("site.settings.tagline", company.tagline),
    taglineSub: t("site.settings.taglineSub", company.taglineSub),
    tel: t("site.settings.tel", company.tel),
    fax: t("site.settings.fax", company.fax),
    email: t("site.settings.email", company.email),
    address: t("site.settings.address", company.address),
    mapEmbed: t("site.settings.mapEmbed", company.mapEmbed),
    metadata: {
      title: t("site.settings.metadata.title", METADATA_DEFAULT.title),
      description: t(
        "site.settings.metadata.description",
        METADATA_DEFAULT.description,
      ),
      keywords: lines(
        "site.settings.metadata.keywords",
        METADATA_DEFAULT.keywords,
      ),
      ogImage: t("site.settings.metadata.ogImage", METADATA_DEFAULT.ogImage),
    },
  };

  const footer: SiteFooterResolved = {
    labels: {
      company: t("site.footer.labels.company", FOOTER_DEFAULT.labels.company),
      address: t("site.footer.labels.address", FOOTER_DEFAULT.labels.address),
      tel: t("site.footer.labels.tel", FOOTER_DEFAULT.labels.tel),
      fax: t("site.footer.labels.fax", FOOTER_DEFAULT.labels.fax),
      email: t("site.footer.labels.email", FOOTER_DEFAULT.labels.email),
    },
    copyright: t("site.footer.copyright", FOOTER_DEFAULT.copyright),
    links: {
      policy: t("site.footer.links.policy", FOOTER_DEFAULT.links.policy),
      privacy: t("site.footer.links.privacy", FOOTER_DEFAULT.links.privacy),
    },
  };

  const policy: SitePolicyResolved = {
    title: t("site.policy.title", sitePolicyModals.policy.title),
    html: t("site.policy.html", sitePolicyModals.policy.html),
  };

  const privacy: SitePolicyResolved = {
    title: t("site.privacy.title", sitePolicyModals.privacy.title),
    html: t("site.privacy.html", sitePolicyModals.privacy.html),
  };

  return { settings, footer, policy, privacy };
}
