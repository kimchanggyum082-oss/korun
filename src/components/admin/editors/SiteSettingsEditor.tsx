"use client";

import EntityEditor, {
  type UpdateDraft,
} from "@/components/admin/EntityEditor";
import ImageField from "@/components/admin/ImageField";
import ScaledDesktop from "@/components/admin/ScaledDesktop";
import FooterBar from "@/components/layout/FooterBar";
import {
  Field,
  SectionCard,
  TextArea,
  TextInput,
  TwoColumn,
} from "@/components/admin/fields";
import {
  ENTITY_KEYS,
  type EntitySource,
  type SiteMetadata,
  type SiteSettingsEntity,
} from "@/lib/admin/entities";

function SettingsForm({
  draft,
  update,
  uploadConfigured,
}: {
  draft: SiteSettingsEntity;
  update: UpdateDraft<SiteSettingsEntity>;
  uploadConfigured: boolean;
}) {
  const setMetadata = (patch: Partial<SiteMetadata>) =>
    update((current) => ({
      ...current,
      metadata: { ...current.metadata, ...patch },
    }));

  return (
    <>
      <SectionCard
        title="회사 정보"
        description="푸터, 상세 페이지, 지도 안내에 함께 사용됩니다."
      >
        <TwoColumn>
          <Field label="회사명" htmlFor="settings-name">
            <TextInput
              id="settings-name"
              value={draft.name}
              onChange={(event) =>
                update((current) => ({ ...current, name: event.target.value }))
              }
            />
          </Field>
          <Field label="영문명" htmlFor="settings-name-en">
            <TextInput
              id="settings-name-en"
              value={draft.nameEn}
              onChange={(event) =>
                update((current) => ({
                  ...current,
                  nameEn: event.target.value,
                }))
              }
            />
          </Field>
        </TwoColumn>

        <Field label="대표 문구" htmlFor="settings-tagline">
          <TextInput
            id="settings-tagline"
            value={draft.tagline}
            onChange={(event) =>
              update((current) => ({ ...current, tagline: event.target.value }))
            }
          />
        </Field>

        <Field label="보조 문구" htmlFor="settings-tagline-sub">
          <TextInput
            id="settings-tagline-sub"
            value={draft.taglineSub}
            onChange={(event) =>
              update((current) => ({
                ...current,
                taglineSub: event.target.value,
              }))
            }
          />
        </Field>

        <TwoColumn>
          <Field label="전화" htmlFor="settings-tel">
            <TextInput
              id="settings-tel"
              value={draft.tel}
              onChange={(event) =>
                update((current) => ({ ...current, tel: event.target.value }))
              }
            />
          </Field>
          <Field label="팩스" htmlFor="settings-fax">
            <TextInput
              id="settings-fax"
              value={draft.fax}
              onChange={(event) =>
                update((current) => ({ ...current, fax: event.target.value }))
              }
            />
          </Field>
        </TwoColumn>

        <TwoColumn>
          <Field label="이메일" htmlFor="settings-email">
            <TextInput
              id="settings-email"
              type="email"
              value={draft.email}
              onChange={(event) =>
                update((current) => ({ ...current, email: event.target.value }))
              }
            />
          </Field>
          <Field label="주소" htmlFor="settings-address">
            <TextInput
              id="settings-address"
              value={draft.address}
              onChange={(event) =>
                update((current) => ({
                  ...current,
                  address: event.target.value,
                }))
              }
            />
          </Field>
        </TwoColumn>

        <Field
          label="지도 임베드 URL"
          htmlFor="settings-map"
          hint="Google 지도 > 공유 > 지도 퍼가기에 있는 src 주소를 붙여넣습니다."
        >
          <TextArea
            id="settings-map"
            rows={3}
            value={draft.mapEmbed}
            onChange={(event) =>
              update((current) => ({
                ...current,
                mapEmbed: event.target.value,
              }))
            }
          />
        </Field>
      </SectionCard>

      <SectionCard
        title="사이트 메타데이터"
        description="검색 결과와 공유 카드에 사용되는 값입니다."
      >
        <Field label="사이트 제목" htmlFor="settings-title">
          <TextInput
            id="settings-title"
            value={draft.metadata.title}
            onChange={(event) => setMetadata({ title: event.target.value })}
          />
        </Field>

        <Field label="설명" htmlFor="settings-description">
          <TextArea
            id="settings-description"
            rows={4}
            value={draft.metadata.description}
            onChange={(event) =>
              setMetadata({ description: event.target.value })
            }
          />
        </Field>

        <Field
          label="키워드"
          htmlFor="settings-keywords"
          hint="쉼표로 구분합니다."
        >
          <TextInput
            id="settings-keywords"
            value={draft.metadata.keywords.join(", ")}
            onChange={(event) =>
              setMetadata({
                keywords: event.target.value
                  .split(",")
                  .map((keyword) => keyword.trim())
                  .filter((keyword) => keyword.length > 0),
              })
            }
          />
        </Field>

        <ImageField
          label="OG 이미지"
          value={draft.metadata.ogImage}
          uploadConfigured={uploadConfigured}
          onChange={(next) => setMetadata({ ogImage: next })}
          hint="1200×627 비율을 권장합니다."
        />
      </SectionCard>
    </>
  );
}

function SettingsPreview({ draft }: { draft: SiteSettingsEntity }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-md border border-neutral-200">
        <ScaledDesktop>
          <FooterBar
            contact={{
              name: draft.name,
              address: draft.address,
              tel: draft.tel,
              fax: draft.fax,
              email: draft.email,
            }}
          />
        </ScaledDesktop>
      </div>

      <div className="overflow-hidden rounded-md border border-neutral-200">
        <div className="bg-paper px-4 py-2">
          <p className="text-[11px] font-bold tracking-[0.12em] text-brand uppercase">
            Location map
          </p>
        </div>
        {draft.mapEmbed ? (
          <iframe
            src={draft.mapEmbed}
            title="지도 미리보기"
            loading="lazy"
            className="h-[170px] w-full border-0"
          />
        ) : (
          <div className="flex h-[170px] items-center justify-center text-[12px] text-neutral-400">
            지도 URL을 입력하면 여기에 표시됩니다.
          </div>
        )}
      </div>

      <div className="rounded-md border border-neutral-200 p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
          Search &amp; share
        </p>
        <div className="mt-2 flex gap-3">
          <div
            className="h-[62px] w-[110px] shrink-0 rounded border border-neutral-200 bg-neutral-100"
            style={
              draft.metadata.ogImage
                ? {
                    backgroundImage: `url("${draft.metadata.ogImage.replace(/"/g, "%22")}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
            aria-hidden
          />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-ink">
              {draft.metadata.title || "제목 없음"}
            </p>
            <p className="mt-0.5 line-clamp-2 text-[12px] text-neutral-500">
              {draft.metadata.description || "설명이 비어 있습니다."}
            </p>
            <p className="mt-1 truncate text-[11px] text-neutral-400">
              {draft.metadata.keywords.join(", ") || "키워드 없음"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SiteSettingsEditor({
  initial,
  source,
  storeReady,
  uploadConfigured,
}: {
  initial: SiteSettingsEntity;
  source: EntitySource;
  storeReady: boolean;
  uploadConfigured: boolean;
}) {
  return (
    <EntityEditor
      entityKey={ENTITY_KEYS.siteSettings}
      label="Settings"
      title="기본 설정"
      description="회사 정보, 지도, 사이트 메타데이터를 관리합니다."
      source={source}
      initial={initial}
      storeReady={storeReady}
      previewLabel="사이트 정보"
      form={(draft, update) => (
        <SettingsForm
          draft={draft}
          update={update}
          uploadConfigured={uploadConfigured}
        />
      )}
      preview={(draft) => <SettingsPreview draft={draft} />}
    />
  );
}
