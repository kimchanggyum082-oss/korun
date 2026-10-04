"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  newsEntityKey,
  type EntitySource,
  type ServiceNewsItemEntity,
} from "@/lib/admin/entities";
import { newsDict } from "@/lib/i18n/boards/news";
import { useLocale } from "@/lib/i18n/client";
import NewsForms from "./NewsForms";
import NewsPreviews from "./NewsPreviews";

export default function NewsEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: ServiceNewsItemEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  const t = newsDict[useLocale()].editor;

  return (
    <EntityEditor<ServiceNewsItemEntity>
      entityKey={newsEntityKey(initial.idx)}
      label={t.label}
      title={t.title}
      description={t.description}
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel={t.previewLabel}
      form={(draft, update) => (
        <NewsForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft, locale) => (
        <NewsPreviews draft={draft} locale={locale} />
      )}
    />
  );
}
