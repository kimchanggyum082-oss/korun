"use client";

import type { UpdateDraft } from "@/components/admin/EntityEditor";
import ImageField from "@/components/admin/ImageField";
import LocalizedField from "@/components/admin/LocalizedField";
import {
  Field,
  readLocalized,
  SectionCard,
  TextInput,
  TwoColumn,
  type LocalizedValue,
} from "@/components/admin/fields";
import type {
  HomeEntity,
  HomeHeroSlideEntity,
  HomeMobilePillEntity,
  HomePillEntity,
  HomeProductCardEntity,
} from "@/lib/admin/entities";
import type { Localized } from "@/lib/content/merge";

function toLocalized(next: LocalizedValue): Localized<string> {
  const { ko, en } = readLocalized(next);
  return en.length > 0 ? { ko, en } : ko;
}

function moveAt<T>(list: T[], index: number, delta: number): T[] {
  const target = index + delta;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next;
}

function removeAt<T>(list: T[], index: number): T[] {
  return list.filter((_, i) => i !== index);
}

function replaceAt<T>(list: T[], index: number, value: T): T[] {
  return list.map((item, i) => (i === index ? value : item));
}

function MoveButtons({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  onMove: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
}) {
  const base =
    "flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 text-[13px] leading-none text-neutral-500 transition-colors outline-none hover:border-neutral-300 hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="위로 이동"
        className={base}
        disabled={index === 0}
        onClick={() => onMove(index, -1)}
      >
        ↑
      </button>
      <button
        type="button"
        aria-label="아래로 이동"
        className={base}
        disabled={index === count - 1}
        onClick={() => onMove(index, 1)}
      >
        ↓
      </button>
      <button
        type="button"
        aria-label="삭제"
        className={`${base} hover:text-[#a51c1c]`}
        onClick={() => onRemove(index)}
      >
        ✕
      </button>
    </div>
  );
}

function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-9 w-fit rounded-md border border-dashed border-neutral-300 bg-white px-3 text-[12px] font-semibold text-neutral-600 transition-colors outline-none hover:border-brand/40 hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/30"
    >
      {children}
    </button>
  );
}

function HeroList({
  title,
  description,
  slides,
  onChange,
  uploadConfigured,
}: {
  title: string;
  description: string;
  slides: HomeHeroSlideEntity[];
  onChange: (next: HomeHeroSlideEntity[]) => void;
  uploadConfigured: boolean;
}) {
  return (
    <SectionCard title={title} description={description}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-semibold text-neutral-500">
              슬라이드 {index + 1}
            </span>
            <MoveButtons
              index={index}
              count={slides.length}
              onMove={(i, delta) => onChange(moveAt(slides, i, delta))}
              onRemove={(i) => onChange(removeAt(slides, i))}
            />
          </div>
          <ImageField
            label="이미지 URL"
            value={slide.src}
            uploadConfigured={uploadConfigured}
            onChange={(next) =>
              onChange(replaceAt(slides, index, { ...slide, src: next }))
            }
          />
          <LocalizedField
            label="대체 텍스트 (alt)"
            value={slide.alt}
            onChange={(next) =>
              onChange(
                replaceAt(slides, index, {
                  ...slide,
                  alt: toLocalized(next),
                }),
              )
            }
          />
        </div>
      ))}
      <AddButton onClick={() => onChange([...slides, { src: "", alt: "" }])}>
        슬라이드 추가
      </AddButton>
    </SectionCard>
  );
}

function PillRow({
  title,
  color,
  padding,
  href,
  onChange,
}: {
  title: Localized<string>;
  color: string;
  padding: string;
  href?: string;
  onChange: (next: {
    label: Localized<string>;
    color: string;
    padding: string;
    href?: string;
  }) => void;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3">
      <LocalizedField
        label="라벨"
        value={title}
        onChange={(next) =>
          onChange({ label: toLocalized(next), color, padding, href })
        }
      />
      <TwoColumn>
        <Field label="색상">
          <div className="flex items-center gap-2">
            <span
              className="h-8 w-8 shrink-0 rounded border border-neutral-200"
              style={{ backgroundColor: color }}
            />
            <TextInput
              value={color}
              onChange={(event) =>
                onChange({
                  label: title,
                  color: event.target.value,
                  padding,
                  href,
                })
              }
            />
          </div>
        </Field>
        <Field label="여백 (padding)">
          <TextInput
            value={padding}
            onChange={(event) =>
              onChange({
                label: title,
                color,
                padding: event.target.value,
                href,
              })
            }
          />
        </Field>
      </TwoColumn>
      {href !== undefined && (
        <Field label="링크 (href)">
          <TextInput
            value={href}
            onChange={(event) =>
              onChange({
                label: title,
                color,
                padding,
                href: event.target.value,
              })
            }
          />
        </Field>
      )}
    </div>
  );
}

export default function HomeForms({
  draft,
  update,
  uploadConfigured,
}: {
  draft: HomeEntity;
  update: UpdateDraft<HomeEntity>;
  uploadConfigured: boolean;
}) {
  const setProduct = (index: number, patch: Partial<HomeProductCardEntity>) =>
    update((current) => ({
      ...current,
      products: {
        ...current.products,
        items: replaceAt(current.products.items, index, {
          ...current.products.items[index],
          ...patch,
        }),
      },
    }));

  const setDesktopPill = (index: number, patch: Partial<HomePillEntity>) =>
    update((current) => ({
      ...current,
      values: {
        ...current.values,
        pc: replaceAt(current.values.pc, index, {
          ...current.values.pc[index],
          ...patch,
        }),
      },
    }));

  const setMobilePill = (index: number, patch: Partial<HomeMobilePillEntity>) =>
    update((current) => ({
      ...current,
      values: {
        ...current.values,
        mobile: replaceAt(current.values.mobile, index, {
          ...current.values.mobile[index],
          ...patch,
        }),
      },
    }));

  const setCta = (patch: Partial<HomeEntity["cta"]>) =>
    update((current) => ({ ...current, cta: { ...current.cta, ...patch } }));

  const setLists = (patch: Partial<HomeEntity["lists"]>) =>
    update((current) => ({
      ...current,
      lists: { ...current.lists, ...patch },
    }));

  const setLocation = (patch: Partial<HomeEntity["location"]>) =>
    update((current) => ({
      ...current,
      location: { ...current.location, ...patch },
    }));

  return (
    <>
      <HeroList
        title="히어로 슬라이드 — 데스크톱"
        description="PC 메인 상단에 노출됩니다. 위/아래로 순서를 바꾸고 추가·삭제할 수 있습니다."
        slides={draft.hero.slides}
        onChange={(next) =>
          update((current) => ({
            ...current,
            hero: { ...current.hero, slides: next },
          }))
        }
        uploadConfigured={uploadConfigured}
      />

      <HeroList
        title="히어로 슬라이드 — 모바일"
        description="모바일 메인 상단에 노출됩니다."
        slides={draft.hero.slidesMobile}
        onChange={(next) =>
          update((current) => ({
            ...current,
            hero: { ...current.hero, slidesMobile: next },
          }))
        }
        uploadConfigured={uploadConfigured}
      />

      <SectionCard
        title="제품 카드"
        description="홈에 노출되는 4개 제품의 제목, 링크, 이미지입니다."
      >
        {draft.products.items.map((card, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-md border border-neutral-200 p-3"
          >
            <span className="text-[12px] font-semibold text-neutral-500">
              카드 {index + 1}
            </span>
            <LocalizedField
              label="제목"
              value={card.title}
              onChange={(next) =>
                setProduct(index, { title: toLocalized(next) })
              }
            />
            <Field label="링크 (href)">
              <TextInput
                value={card.href}
                onChange={(event) =>
                  setProduct(index, { href: event.target.value })
                }
              />
            </Field>
            <ImageField
              label="이미지"
              value={card.src}
              uploadConfigured={uploadConfigured}
              onChange={(next) => setProduct(index, { src: next })}
            />
            <ImageField
              label="호버 이미지"
              value={card.hoverSrc}
              uploadConfigured={uploadConfigured}
              onChange={(next) => setProduct(index, { hoverSrc: next })}
            />
            <ImageField
              label="모바일 이미지"
              value={card.mobileSrc}
              uploadConfigured={uploadConfigured}
              onChange={(next) => setProduct(index, { mobileSrc: next })}
            />
          </div>
        ))}
      </SectionCard>

      <SectionCard
        title="가치 배너 — 데스크톱"
        description="PC 가치 배너의 알약(pill)입니다."
      >
        {draft.values.pc.map((pill, index) => (
          <PillRow
            key={index}
            title={pill.label}
            color={pill.color}
            padding={pill.padding}
            href={pill.href}
            onChange={(next) => setDesktopPill(index, next)}
          />
        ))}
      </SectionCard>

      <SectionCard
        title="가치 배너 — 모바일"
        description="모바일 가치 배너의 알약(pill)입니다."
      >
        {draft.values.mobile.map((pill, index) => (
          <PillRow
            key={index}
            title={pill.label}
            color={pill.color}
            padding={pill.padding}
            onChange={(next) =>
              setMobilePill(index, {
                label: next.label,
                color: next.color,
                padding: next.padding,
              })
            }
          />
        ))}
      </SectionCard>

      <SectionCard title="CTA 배너" description="카피와 이미지입니다.">
        <LocalizedField
          label="문구 1"
          value={draft.cta.line1}
          onChange={(next) => setCta({ line1: toLocalized(next) })}
        />
        <LocalizedField
          label="문구 2"
          value={draft.cta.line2}
          onChange={(next) => setCta({ line2: toLocalized(next) })}
        />
        <ImageField
          label="데스크톱 사진"
          value={draft.cta.photo}
          uploadConfigured={uploadConfigured}
          onChange={(next) => setCta({ photo: next })}
        />
        <ImageField
          label="모바일 사진"
          value={draft.cta.photoMobile}
          uploadConfigured={uploadConfigured}
          onChange={(next) => setCta({ photoMobile: next })}
        />
        <ImageField
          label="모바일 펜"
          value={draft.cta.penMobile}
          uploadConfigured={uploadConfigured}
          onChange={(next) => setCta({ penMobile: next })}
        />
        <ImageField
          label="화살표"
          value={draft.cta.arrowDark}
          uploadConfigured={uploadConfigured}
          onChange={(next) => setCta({ arrowDark: next })}
        />
      </SectionCard>

      <SectionCard
        title="목록 섹션"
        description="뉴스/자료실 목록의 제목과 작성자 라벨입니다."
      >
        <TwoColumn>
          <Field label="뉴스 영문 제목">
            <TextInput
              value={draft.lists.newsHeadingEn}
              onChange={(event) =>
                setLists({ newsHeadingEn: event.target.value })
              }
            />
          </Field>
          <Field label="뉴스 국문 제목">
            <TextInput
              value={draft.lists.newsHeadingKo}
              onChange={(event) =>
                setLists({ newsHeadingKo: event.target.value })
              }
            />
          </Field>
        </TwoColumn>
        <TwoColumn>
          <Field label="자료실 영문 제목">
            <TextInput
              value={draft.lists.downloadsHeadingEn}
              onChange={(event) =>
                setLists({ downloadsHeadingEn: event.target.value })
              }
            />
          </Field>
          <Field label="자료실 국문 제목">
            <TextInput
              value={draft.lists.downloadsHeadingKo}
              onChange={(event) =>
                setLists({ downloadsHeadingKo: event.target.value })
              }
            />
          </Field>
        </TwoColumn>
        <LocalizedField
          label="작성자 라벨"
          value={draft.lists.writer}
          onChange={(next) =>
            update((current) => ({
              ...current,
              lists: { ...current.lists, writer: toLocalized(next) },
            }))
          }
        />
      </SectionCard>

      <SectionCard
        title="오시는 길"
        description="섹션 제목과 지도 iframe 제목입니다."
      >
        <TwoColumn>
          <Field label="영문 제목">
            <TextInput
              value={draft.location.headingEn}
              onChange={(event) =>
                setLocation({ headingEn: event.target.value })
              }
            />
          </Field>
          <Field label="국문 제목">
            <TextInput
              value={draft.location.headingKo}
              onChange={(event) =>
                setLocation({ headingKo: event.target.value })
              }
            />
          </Field>
        </TwoColumn>
        <LocalizedField
          label="지도 제목 (iframe title)"
          value={draft.location.mapTitle}
          onChange={(next) => setLocation({ mapTitle: toLocalized(next) })}
        />
      </SectionCard>
    </>
  );
}
