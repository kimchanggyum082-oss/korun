"use client";

import EntityEditor, {
  type UpdateDraft,
} from "@/components/admin/EntityEditor";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import {
  Field,
  SectionCard,
  TextArea,
  TextInput,
  TwoColumn,
} from "@/components/admin/fields";
import FooterBar from "@/components/layout/FooterBar";
import {
  ENTITY_KEYS,
  type EntitySource,
  type SiteFooterEntity,
} from "@/lib/admin/entities";

export type FooterContact = {
  name: string;
  address: string;
  tel: string;
  fax: string;
  email: string;
};

function FooterForm({
  draft,
  update,
}: {
  draft: SiteFooterEntity;
  update: UpdateDraft<SiteFooterEntity>;
}) {
  const setLabel = (key: keyof SiteFooterEntity["labels"], value: string) =>
    update((current) => ({
      ...current,
      labels: { ...current.labels, [key]: value },
    }));

  const setLink = (key: keyof SiteFooterEntity["links"], value: string) =>
    update((current) => ({
      ...current,
      links: { ...current.links, [key]: value },
    }));

  return (
    <>
      <SectionCard
        title="표기 이름"
        description="푸터에서 각 항목 앞에 붙는 라벨입니다."
      >
        <TwoColumn>
          <Field label="회사명 라벨" htmlFor="footer-label-company">
            <TextInput
              id="footer-label-company"
              value={draft.labels.company}
              onChange={(event) => setLabel("company", event.target.value)}
            />
          </Field>
          <Field label="주소 라벨" htmlFor="footer-label-address">
            <TextInput
              id="footer-label-address"
              value={draft.labels.address}
              onChange={(event) => setLabel("address", event.target.value)}
            />
          </Field>
        </TwoColumn>
        <TwoColumn>
          <Field label="전화 라벨" htmlFor="footer-label-tel">
            <TextInput
              id="footer-label-tel"
              value={draft.labels.tel}
              onChange={(event) => setLabel("tel", event.target.value)}
            />
          </Field>
          <Field label="팩스 라벨" htmlFor="footer-label-fax">
            <TextInput
              id="footer-label-fax"
              value={draft.labels.fax}
              onChange={(event) => setLabel("fax", event.target.value)}
            />
          </Field>
        </TwoColumn>
        <Field label="이메일 라벨" htmlFor="footer-label-email">
          <TextInput
            id="footer-label-email"
            value={draft.labels.email}
            onChange={(event) => setLabel("email", event.target.value)}
          />
        </Field>
      </SectionCard>

      <SectionCard title="저작권 문구">
        <Field label="COPYRIGHT 줄" htmlFor="footer-copyright">
          <TextArea
            id="footer-copyright"
            rows={3}
            value={draft.copyright}
            onChange={(event) =>
              update((current) => ({
                ...current,
                copyright: event.target.value,
              }))
            }
          />
        </Field>
      </SectionCard>

      <SectionCard
        title="정책 링크"
        description="푸터 하단의 약관 링크 이름입니다."
      >
        <TwoColumn>
          <Field label="이용약관 링크" htmlFor="footer-link-policy">
            <TextInput
              id="footer-link-policy"
              value={draft.links.policy}
              onChange={(event) => setLink("policy", event.target.value)}
            />
          </Field>
          <Field label="개인정보 링크" htmlFor="footer-link-privacy">
            <TextInput
              id="footer-link-privacy"
              value={draft.links.privacy}
              onChange={(event) => setLink("privacy", event.target.value)}
            />
          </Field>
        </TwoColumn>
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
            contact={contact}
            labels={draft.labels}
            links={draft.links}
            copyright={draft.copyright}
          />
        </ScaledDesktop>
      )}
    />
  );
}
