"use client";

import { useMemo, useState } from "react";

import CompanyLocationView from "@/components/about/CompanyLocationView";
import { savePageContent } from "@/lib/admin/page-content-actions";
import { resolveAboutFromRows } from "@/lib/content/registry/about-resolve";
import { adminDict } from "@/lib/i18n/admin";
import { useLocale } from "@/lib/i18n/client";
import LocationsEditor from "./LocationsEditor";
import ScaledDesktop from "./ScaledDesktop";

type SaveState = "clean" | "saving" | "saved" | "error";

export default function CompanyLocationsPage({
  initialValue,
  uploadConfigured,
}: {
  initialValue: string;
  uploadConfigured: boolean;
}) {
  const locale = useLocale();
  const t = adminDict[locale].editor;
  const [value, setValue] = useState(initialValue);
  const [state, setState] = useState<SaveState>("clean");
  const [message, setMessage] = useState<string | null>(null);

  const preview = useMemo(() => {
    const rows = {
      "about.location.locations": { ko: value, en: value },
    };
    return resolveAboutFromRows(rows, locale).content["company-location"];
  }, [value, locale]);

  async function save() {
    setState("saving");
    setMessage(null);
    const result = await savePageContent(
      "about.location.locations",
      "ko",
      value,
    );
    if (!result.ok) {
      setState("error");
      setMessage(result.message ?? t.failed);
      return;
    }
    setState("saved");
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
            {adminDict[locale].groups.content}
          </p>
          <h1 className="mt-1.5 text-[22px] font-bold text-ink">
            {adminDict[locale].nav["/admin/company-locations"]}
          </h1>
          <p className="mt-0.5 max-w-[62ch] text-[13px] leading-relaxed text-neutral-500">
            {locale === "ko"
              ? "홈페이지와 회사 소개 > 회사 위치가 같은 목록을 사용합니다. 숨긴 위치는 두 페이지 모두에서 표시되지 않습니다."
              : "The home page and About > Company Location share this list. Hidden locations disappear from both pages."}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {state === "saved" ? (
            <span className="text-[12px] font-semibold text-brand">
              {t.draftSaved}
            </span>
          ) : null}
          {state === "error" && message ? (
            <span
              role="alert"
              className="text-[12px] font-semibold text-[#a51c1c]"
            >
              {message}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => void save()}
            disabled={state === "saving"}
            className="h-9 rounded-md bg-brand px-3.5 text-[13px] font-semibold text-white transition-colors outline-none hover:bg-ink focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {state === "saving" ? t.processing : t.save}
          </button>
        </div>
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
        <div className="flex flex-col gap-4">
          <LocationsEditor
            value={value}
            onChange={(next) => {
              setValue(next);
              setState("clean");
              setMessage(null);
            }}
            uploadConfigured={uploadConfigured}
            onError={(next) => {
              setState("error");
              setMessage(next);
            }}
            t={t}
          />
        </div>

        <aside className="xl:sticky xl:top-6 xl:max-h-[calc(100dvh-48px)] xl:self-start xl:overflow-y-auto">
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
              {t.preview}
            </p>
            <ScaledDesktop>
              <CompanyLocationView content={preview} />
            </ScaledDesktop>
          </div>
        </aside>
      </div>
    </div>
  );
}
