"use client";

import EntityEditor, {
  type UpdateDraft,
} from "@/components/admin/EntityEditor";
import LocalizedField from "@/components/admin/LocalizedField";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import {
  readLocalized,
  SectionCard,
  type LocalizedValue,
} from "@/components/admin/fields";
import FooterBar from "@/components/layout/FooterBar";
import {
  ENTITY_KEYS,
  type EntitySource,
  type SiteFooterEntity,
} from "@/lib/admin/entities";
import type { Localized } from "@/lib/content/merge";

export type FooterContact = {
  name: LocalizedValue;
  address: LocalizedValue;
  tel: LocalizedValue;
  fax: LocalizedValue;
  email: LocalizedValue;
};

function toLocalized(next: LocalizedValue): Localized<string> {
  const { ko, en } = readLocalized(next);
  return en.length > 0 ? { ko, en } : ko;
}

function FooterForm({
  draft,
  update,
}: {
  draft: SiteFooterEntity;
  update: UpdateDraft<SiteFooterEntity>;
}) {
  const setLabel = (
    key: keyof SiteFooterEntity["labels"],
    value: LocalizedValue,
  ) =>
    update((current) => ({
      ...current,
      labels: { ...current.labels, [key]: toLocalized(value) },
    }));

  const setLink = (
    key: keyof SiteFooterEntity["links"],
    value: LocalizedValue,
  ) =>
    update((current) => ({
      ...current,
      links: { ...current.links, [key]: toLocalized(value) },
    }));

  return (
    <>
      <SectionCard
        title="표기 이름"
        description="푸터에서 각 항목 앞에 붙는 라벨입니다."
      >
        <LocalizedField
          label="회사명 라벨"
          value={draft.labels.company}
          onChange={(next) => setLabel("company", next)}
        />
        <LocalizedField
          label="주소 라벨"
          value={draft.labels.address}
          onChange={(next) => setLabel("address", next)}
        />
        <LocalizedField
          label="전화 라벨"
          value={draft.labels.tel}
          onChange={(next) => setLabel("tel", next)}
        />
        <LocalizedField
          label="팩스 라벨"
          value={draft.labels.fax}
          onChange={(next) => setLabel("fax", next)}
        />
        <LocalizedField
          label="이메일 라벨"
          value={draft.labels.email}
          onChange={(next) => setLabel("email", next)}
        />
      </SectionCard>

      <SectionCard title="저작권 문구">
        <LocalizedField
          label="COPYRIGHT 줄"
          value={draft.copyright}
          onChange={(next) =>
            update((current) => ({
              ...current,
              copyright: toLocalized(next),
            }))
          }
          multiline
          rows={3}
        />
      </SectionCard>

      <SectionCard
        title="정책 링크"
        description="푸터 하단의 약관 링크 이름입니다."
      >
        <LocalizedField
          label="이용약관 링크"
          value={draft.links.policy}
          onChange={(next) => setLink("policy", next)}
        />
        <LocalizedField
          label="개인정보 링크"
          value={draft.links.privacy}
          onChange={(next) => setLink("privacy", next)}
        />
      </SectionCard>
    </>
  );
}

export default function FooterEditor({
  initial,
  source,
  storeReady,
  contact,
}: {
  initial: SiteFooterEntity;
  source: EntitySource;
  storeReady: boolean;
  contact: FooterContact;
}) {
  return (
    <EntityEditor
      entityKey={ENTITY_KEYS.siteFooter}
      label="Footer"
      title="푸터"
      description="푸터의 라벨, 저작권 문구, 정책 링크 이름을 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="푸터 (PC)"
      form={(draft, update) => <FooterForm draft={draft} update={update} />}
      preview={(draft) => (
        <ScaledDesktop>
          <FooterBar
            contact={{
              name: readLocalized(contact.name).ko,
              address: readLocalized(contact.address).ko,
              tel: readLocalized(contact.tel).ko,
              fax: readLocalized(contact.fax).ko,
              email: readLocalized(contact.email).ko,
            }}
            labels={{
              company: readLocalized(draft.labels.company).ko,
              address: readLocalized(draft.labels.address).ko,
              tel: readLocalized(draft.labels.tel).ko,
              fax: readLocalized(draft.labels.fax).ko,
              email: readLocalized(draft.labels.email).ko,
            }}
            links={{
              policy: readLocalized(draft.links.policy).ko,
              privacy: readLocalized(draft.links.privacy).ko,
            }}
            copyright={readLocalized(draft.copyright).ko}
          />
        </ScaledDesktop>
      )}
    />
  );
}
