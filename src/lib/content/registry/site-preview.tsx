"use client";

import PolicyModal from "@/components/layout/PolicyModal";
import FooterBar from "@/components/layout/FooterBar";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import type { ContentDef } from "@/lib/content/registry-types";
import { resolveSiteFromRows } from "@/lib/content/registry/site-resolve";
import { adminDict } from "@/lib/i18n/admin";
import type { Locale } from "@/lib/i18n/locales";

type SiteResolved = ReturnType<typeof resolveSiteFromRows>;

function isResolved(content: unknown): content is SiteResolved {
  return (
    typeof content === "object" &&
    content !== null &&
    "settings" in content &&
    "footer" in content &&
    "policy" in content &&
    "privacy" in content
  );
}

function SettingsPreview({
  settings,
  locale,
}: {
  settings: SiteResolved["settings"];
  locale: Locale;
}) {
  const { metadata } = settings;
  const keywords = metadata.keywords.join(", ");
  const t = adminDict[locale].preview;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-md border border-neutral-200">
        <ScaledDesktop>
          <FooterBar
            contact={{
              name: settings.name,
              address: settings.address,
              tel: settings.tel,
              fax: settings.fax,
              email: settings.email,
            }}
          />
        </ScaledDesktop>
      </div>

      <div className="overflow-hidden rounded-md border border-neutral-200">
        <div className="bg-paper px-4 py-2">
          <p className="text-[11px] font-bold tracking-[0.12em] text-brand uppercase">
            {t.locationMap}
          </p>
        </div>
        {settings.mapEmbed ? (
          <iframe
            src={settings.mapEmbed}
            title={t.mapTitle}
            loading="lazy"
            className="h-[170px] w-full border-0"
          />
        ) : (
          <div className="flex h-[170px] items-center justify-center text-[12px] text-neutral-400">
            {t.mapEmpty}
          </div>
        )}
      </div>

      <div className="rounded-md border border-neutral-200 p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
          {t.searchShare}
        </p>
        <div className="mt-2 flex gap-3">
          <div
            className="h-[62px] w-[110px] shrink-0 rounded border border-neutral-200 bg-neutral-100"
            style={
              metadata.ogImage
                ? {
                    backgroundImage: `url("${metadata.ogImage.replace(/"/g, "%22")}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
            aria-hidden
          />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-ink">
              {metadata.title || t.noTitle}
            </p>
            <p className="mt-0.5 line-clamp-2 text-[12px] text-neutral-500">
              {metadata.description || t.noDescription}
            </p>
            <p className="mt-1 truncate text-[11px] text-neutral-400">
              {keywords || t.noKeywords}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Live WYSIWYG preview of a site section, reusing the public layout components
 * (MCell's `SectionPreview` equivalent). `content` may be the object returned by
 * `resolveSiteFromRows`; when absent, data-file defaults are rendered.
 */
export default function SiteSectionPreview({
  sectionDef,
  content,
  locale,
}: {
  sectionDef: ContentDef;
  content: unknown;
  locale: Locale;
}) {
  const resolved = isResolved(content)
    ? content
    : resolveSiteFromRows({}, locale);
  const key = sectionDef.key;

  if (key.startsWith("site.settings.")) {
    return <SettingsPreview settings={resolved.settings} locale={locale} />;
  }

  if (key.startsWith("site.footer.")) {
    return (
      <ScaledDesktop>
        <FooterBar
          contact={{
            name: resolved.settings.name,
            address: resolved.settings.address,
            tel: resolved.settings.tel,
            fax: resolved.settings.fax,
            email: resolved.settings.email,
          }}
          labels={resolved.footer.labels}
          links={resolved.footer.links}
          copyright={resolved.footer.copyright}
          locale={locale}
        />
      </ScaledDesktop>
    );
  }

  if (key.startsWith("site.policy.")) {
    return (
      <ScaledDesktop>
        <PolicyModal kind="policy" modal={resolved.policy} contained />
      </ScaledDesktop>
    );
  }

  if (key.startsWith("site.privacy.")) {
    return (
      <ScaledDesktop>
        <PolicyModal kind="privacy" modal={resolved.privacy} contained />
      </ScaledDesktop>
    );
  }

  return (
    <div className="px-4 py-10 text-center text-[13px] text-ink/40">
      {locale === "ko"
        ? "이 섹션의 미리보기가 없습니다."
        : "No preview for this section."}
    </div>
  );
}
