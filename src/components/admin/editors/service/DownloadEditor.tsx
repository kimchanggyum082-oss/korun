"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  downloadEntityKey,
  type EntitySource,
  type ServiceDownloadItemEntity,
} from "@/lib/admin/entities";
import { downloadsDict } from "@/lib/i18n/boards/downloads";
import { useLocale } from "@/lib/i18n/client";
import DownloadForms from "./DownloadForms";
import DownloadPreviews from "./DownloadPreviews";

export default function DownloadEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: ServiceDownloadItemEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  const t = downloadsDict[useLocale()].editor;

  return (
    <EntityEditor<ServiceDownloadItemEntity>
      entityKey={downloadEntityKey(initial.idx)}
      label={t.label}
      title={t.title}
      description={t.description}
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel={t.previewLabel}
      form={(draft, update) => (
        <DownloadForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft, locale) => (
        <DownloadPreviews draft={draft} locale={locale} />
      )}
    />
  );
}
