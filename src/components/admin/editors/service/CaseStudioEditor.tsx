"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  studioEntityKey,
  type EntitySource,
  type ServiceCaseStudioItemEntity,
} from "@/lib/admin/entities";
import { caseStudioDict } from "@/lib/i18n/boards/caseStudio";
import { useLocale } from "@/lib/i18n/client";
import CaseStudioForms from "./CaseStudioForms";
import CaseStudioPreviews from "./CaseStudioPreviews";

export default function CaseStudioEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: ServiceCaseStudioItemEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  const t = caseStudioDict[useLocale()].editor;

  return (
    <EntityEditor<ServiceCaseStudioItemEntity>
      entityKey={studioEntityKey(initial.idx)}
      label={t.label}
      title={t.title}
      description={t.description}
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel={t.previewLabel}
      form={(draft, update) => (
        <CaseStudioForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft, locale) => (
        <CaseStudioPreviews draft={draft} locale={locale} />
      )}
    />
  );
}
