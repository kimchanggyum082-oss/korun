"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  jobPostEntityKey,
  type EntitySource,
  type JobPostEntity,
} from "@/lib/admin/entities";
import { jobsDict } from "@/lib/i18n/boards/jobs";
import { useLocale } from "@/lib/i18n/client";
import JobForms from "./JobForms";
import JobPreviews from "./JobPreviews";

export default function JobEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: JobPostEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  const t = jobsDict[useLocale()].editor;

  return (
    <EntityEditor<JobPostEntity>
      entityKey={jobPostEntityKey(initial.idx)}
      label={t.label}
      title={t.title}
      description={t.description}
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel={t.previewLabel}
      form={(draft, update) => (
        <JobForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft, locale) => <JobPreviews draft={draft} locale={locale} />}
    />
  );
}
