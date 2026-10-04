"use client";

import type { ComponentProps } from "react";

import CompanyLocationView from "@/components/about/CompanyLocationView";
import GreetingsView from "@/components/about/GreetingsView";
import JobPostingView from "@/components/about/JobPostingView";
import PatentCredentialsView from "@/components/about/PatentCredentialsView";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import type { ContentDef } from "@/lib/content/registry-types";
import { resolveAboutFromRows } from "@/lib/content/registry/about-resolve";
import { company, jobPosts } from "@/lib/data";
import { chrome } from "@/lib/i18n/chrome";
import type { Locale } from "@/lib/i18n/locales";

type AboutResolved = ReturnType<typeof resolveAboutFromRows>;
type LocationCompany = ComponentProps<typeof CompanyLocationView>["company"];

function isResolved(content: unknown): content is AboutResolved {
  return (
    typeof content === "object" &&
    content !== null &&
    "content" in content &&
    "assets" in content
  );
}

/**
 * Live WYSIWYG preview of an about section, reusing the public page components
 * (MCell's `SectionPreview` equivalent). `content` may be the object returned by
 * `resolveAboutFromRows`; when absent, data-file defaults are rendered.
 */
export default function AboutSectionPreview({
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
    : resolveAboutFromRows({}, locale);
  const key = sectionDef.key;

  if (key.startsWith("about.greetings.")) {
    return (
      <ScaledDesktop>
        <GreetingsView
          content={resolved.content.greetings}
          assets={resolved.assets}
        />
      </ScaledDesktop>
    );
  }

  if (key.startsWith("about.patent.")) {
    return (
      <ScaledDesktop>
        <PatentCredentialsView
          content={resolved.content["patent-credentials"]}
          assets={resolved.assets}
        />
      </ScaledDesktop>
    );
  }

  if (key.startsWith("about.location.")) {
    return (
      <ScaledDesktop>
        <CompanyLocationView
          content={resolved.content["company-location"]}
          company={company as LocationCompany}
        />
      </ScaledDesktop>
    );
  }

  if (key.startsWith("about.job-posting.")) {
    return (
      <ScaledDesktop>
        <JobPostingView
          t={chrome[locale]}
          locale={locale}
          content={resolved.content["job-posting"]}
          jobPosts={jobPosts}
        />
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
