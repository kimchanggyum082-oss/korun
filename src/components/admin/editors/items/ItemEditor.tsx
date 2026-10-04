"use client";

import EntityEditor from "@/components/admin/EntityEditor";
import {
  interestingItemEntityKey,
  type EntitySource,
  type InterestingItemEntity,
} from "@/lib/admin/entities";
import { itemsDict } from "@/lib/i18n/boards/items";
import { useLocale } from "@/lib/i18n/client";
import ItemForms from "./ItemForms";
import ItemPreviews from "./ItemPreviews";

export default function ItemEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: InterestingItemEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  const t = itemsDict[useLocale()].editor;

  return (
    <EntityEditor<InterestingItemEntity>
      entityKey={interestingItemEntityKey(initial.idx)}
      label={t.label}
      title={t.title}
      description={t.description}
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel={t.previewLabel}
      form={(draft, update) => (
        <ItemForms
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft, locale) => (
        <ItemPreviews draft={draft} locale={locale} />
      )}
    />
  );
}
