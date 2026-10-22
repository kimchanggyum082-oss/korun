"use client";

import { useState, type ReactNode } from "react";

import {
  AddButton,
  MoveButtons,
  toLocalized,
} from "@/components/admin/editors/about/shared";
import { readLocalized, type LocalizedValue } from "@/components/admin/fields";
import InlineImageInput from "@/components/admin/InlineImageInput";
import { parseListRows, type ListRow } from "@/components/admin/list-values";
import { inputCls } from "@/components/admin/styles";
import type { AdminDict } from "@/lib/i18n/admin";

type LocationsEditorProps = {
  value: string;
  onChange: (next: string) => void;
  uploadConfigured: boolean;
  onError: (message: string) => void;
  t: AdminDict["editor"];
  /** Scroll the WYSIWYG preview to the location being edited. */
  onFocusLocation?: (index: number) => void;
};

const EMPTY_LOCATION: ListRow = {
  name: "",
  headingEn: "",
  heading: "",
  description: "",
  contacts: "",
  mapEmbed: "",
  mapTitle: "",
  images: "",
};

function stringValue(value: LocalizedValue | undefined): string {
  if (typeof value === "string") return value;
  return value?.ko ?? value?.en ?? "";
}

function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-semibold text-ink/70">{label}</span>
      {hint ? (
        <span className="text-[10px] leading-[15px] text-ink/40">{hint}</span>
      ) : null}
    </div>
  );
}

function LocalizedField({
  label,
  hint,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: {
  label: string;
  hint?: string;
  value: LocalizedValue;
  onChange: (next: LocalizedValue) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const pair = readLocalized(value);
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel label={label} hint={hint} />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {(["ko", "en"] as const).map((lang) => (
          <label key={lang} className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold tracking-wide text-ink/35 uppercase">
              {lang === "ko" ? "한국어" : "English"}
            </span>
            {multiline ? (
              <textarea
                rows={rows}
                value={lang === "ko" ? pair.ko : pair.en}
                onChange={(event) =>
                  onChange(toLocalized({ ...pair, [lang]: event.target.value }))
                }
                className={inputCls}
              />
            ) : (
              <input
                type="text"
                value={lang === "ko" ? pair.ko : pair.en}
                onChange={(event) =>
                  onChange(toLocalized({ ...pair, [lang]: event.target.value }))
                }
                className={inputCls}
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

function SimpleField({
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <FieldLabel label={label} hint={hint} />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputCls}
      />
    </label>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-[5px] border border-black/10 bg-paper/25 p-3">
      <div className="flex flex-col gap-0.5">
        <h4 className="text-[12px] font-bold text-ink">{title}</h4>
        {hint ? (
          <p className="text-[10px] leading-[15px] text-ink/45">{hint}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

/**
 * Dedicated editor for `about.location.locations`. Locations are expanded one
 * at a time and grouped into basic info, contacts, map, and images so every
 * input has an obvious owner.
 */
export default function LocationsEditor({
  value,
  onChange,
  uploadConfigured,
  onError,
  t,
  onFocusLocation,
}: LocationsEditorProps) {
  const rows = parseListRows(value);
  const [openRows, setOpenRows] = useState<Record<number, boolean>>({
    0: true,
  });

  const isOpen = (index: number) => openRows[index] ?? index === 0;
  const toggle = (index: number) =>
    setOpenRows((state) => ({ ...state, [index]: !isOpen(index) }));

  const commit = (next: ListRow[]) => onChange(JSON.stringify(next));

  const setField = (index: number, key: string, next: LocalizedValue) =>
    commit(
      rows.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [key]: next } : row,
      ),
    );

  const moveLocation = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    commit(next);
    setOpenRows({ [target]: true });
  };

  const removeLocation = (index: number) => {
    commit(rows.filter((_, rowIndex) => rowIndex !== index));
    setOpenRows({ 0: true });
  };

  const addLocation = () => {
    commit([...rows, { ...EMPTY_LOCATION }]);
    setOpenRows((state) => ({ ...state, [rows.length]: true }));
    onFocusLocation?.(rows.length);
  };

  const nested = (row: ListRow, key: string) => parseListRows(row[key]);

  const setNested = (
    rowIndex: number,
    listKey: string,
    nestedIndex: number,
    nestedKey: string,
    next: LocalizedValue,
  ) => {
    const list = nested(rows[rowIndex], listKey);
    setField(
      rowIndex,
      listKey,
      JSON.stringify(
        list.map((entry, index) =>
          index === nestedIndex ? { ...entry, [nestedKey]: next } : entry,
        ),
      ),
    );
  };

  const addNested = (rowIndex: number, listKey: string, seed: ListRow) => {
    const list = nested(rows[rowIndex], listKey);
    setField(rowIndex, listKey, JSON.stringify([...list, seed]));
  };

  const removeNested = (
    rowIndex: number,
    listKey: string,
    nestedIndex: number,
  ) => {
    const list = nested(rows[rowIndex], listKey);
    setField(
      rowIndex,
      listKey,
      JSON.stringify(list.filter((_, index) => index !== nestedIndex)),
    );
  };

  const moveNested = (
    rowIndex: number,
    listKey: string,
    nestedIndex: number,
    delta: number,
  ) => {
    const list = nested(rows[rowIndex], listKey);
    const target = nestedIndex + delta;
    if (target < 0 || target >= list.length) return;
    const next = [...list];
    const [item] = next.splice(nestedIndex, 1);
    next.splice(target, 0, item);
    setField(rowIndex, listKey, JSON.stringify(next));
  };

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, index) => {
        const name = readLocalized(row.name ?? "");
        const contacts = nested(row, "contacts");
        const images = nested(row, "images");
        const open = isOpen(index);

        return (
          <div
            key={index}
            onFocus={() => onFocusLocation?.(index)}
            className="overflow-hidden rounded-[6px] border border-black/15 bg-white"
          >
            <div className="flex items-center justify-between gap-2 bg-paper/60 px-3 py-2">
              <button
                type="button"
                onClick={() => {
                  toggle(index);
                  onFocusLocation?.(index);
                }}
                aria-expanded={open}
                className="flex min-w-0 items-center gap-2 text-left"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[10px] font-bold text-brand">
                  {index + 1}
                </span>
                <span className="truncate text-[12px] font-bold text-ink">
                  {name.ko || name.en || "새 위치 / New location"}
                </span>
                <span
                  className={`text-[10px] text-ink/40 transition-transform ${open ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>
              <MoveButtons
                index={index}
                count={rows.length}
                onMove={moveLocation}
                onRemove={removeLocation}
              />
            </div>

            {open ? (
              <div className="flex flex-col gap-3 border-t border-black/5 p-3">
                <Section title="기본 정보 / Basic info">
                  <LocalizedField
                    label="위치 이름 / Location name"
                    hint="연락처 위에 표시되는 이름입니다. 예: 주식회사 코런, KORUN THAI Branch"
                    value={row.name ?? ""}
                    onChange={(next) => setField(index, "name", next)}
                  />
                  <SimpleField
                    label="상단 영문 제목 / Kicker (EN)"
                    hint="제목 위에 작게 표시되는 영문 문구입니다. 예: HEAD OFFICE & FACTORY"
                    value={stringValue(row.headingEn)}
                    onChange={(next) => setField(index, "headingEn", next)}
                  />
                  <LocalizedField
                    label="제목 / Heading"
                    hint="큰 제목입니다. 예: 본사 및 공장 / Head Office & Factory"
                    value={row.heading ?? ""}
                    onChange={(next) => setField(index, "heading", next)}
                  />
                  <LocalizedField
                    label="설명 / Description"
                    hint="비워두면 표시되지 않습니다."
                    value={row.description ?? ""}
                    onChange={(next) => setField(index, "description", next)}
                    multiline
                  />
                </Section>

                <Section
                  title="연락처 / Contacts"
                  hint="TEL, FAX, EMAIL, ADDRESS 등 필요한 항목을 자유롭게 추가할 수 있습니다. 항목명과 값을 각각 한국어/English로 입력하세요. English를 비워두면 한국어 값이 표시됩니다."
                >
                  <div className="flex flex-col gap-2">
                    {contacts.map((contact, contactIndex) => {
                      const label = readLocalized(contact.label ?? "");
                      const contactValue = readLocalized(contact.value ?? "");
                      return (
                        <div
                          key={contactIndex}
                          className="flex flex-col gap-2 rounded-[4px] border border-black/10 bg-white p-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-ink/40">
                              연락처 #{contactIndex + 1}
                            </span>
                            <MoveButtons
                              index={contactIndex}
                              count={contacts.length}
                              onMove={(target, delta) =>
                                moveNested(index, "contacts", target, delta)
                              }
                              onRemove={(target) =>
                                removeNested(index, "contacts", target)
                              }
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <label className="flex flex-col gap-1">
                              <span className="text-[10px] font-semibold text-ink/45">
                                항목명 (KO)
                              </span>
                              <input
                                type="text"
                                aria-label={`연락처 ${contactIndex + 1} 항목명 (KO)`}
                                value={label.ko}
                                placeholder="TEL."
                                onChange={(event) =>
                                  setNested(
                                    index,
                                    "contacts",
                                    contactIndex,
                                    "label",
                                    toLocalized({
                                      ...label,
                                      ko: event.target.value,
                                    }),
                                  )
                                }
                                className={inputCls}
                              />
                            </label>
                            <label className="flex flex-col gap-1">
                              <span className="text-[10px] font-semibold text-ink/45">
                                항목명 (EN)
                              </span>
                              <input
                                type="text"
                                aria-label={`연락처 ${contactIndex + 1} 항목명 (EN)`}
                                value={label.en}
                                placeholder="TEL."
                                onChange={(event) =>
                                  setNested(
                                    index,
                                    "contacts",
                                    contactIndex,
                                    "label",
                                    toLocalized({
                                      ...label,
                                      en: event.target.value,
                                    }),
                                  )
                                }
                                className={inputCls}
                              />
                            </label>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            <label className="flex flex-col gap-1">
                              <span className="text-[10px] font-semibold text-ink/45">
                                값 (KO)
                              </span>
                              <input
                                type="text"
                                aria-label={`연락처 ${contactIndex + 1} 값 (KO)`}
                                value={contactValue.ko}
                                title={contactValue.ko}
                                onChange={(event) =>
                                  setNested(
                                    index,
                                    "contacts",
                                    contactIndex,
                                    "value",
                                    toLocalized({
                                      ...contactValue,
                                      ko: event.target.value,
                                    }),
                                  )
                                }
                                className={inputCls}
                              />
                            </label>
                            <label className="flex flex-col gap-1">
                              <span className="text-[10px] font-semibold text-ink/45">
                                값 (EN)
                              </span>
                              <input
                                type="text"
                                aria-label={`연락처 ${contactIndex + 1} 값 (EN)`}
                                value={contactValue.en}
                                title={contactValue.en}
                                onChange={(event) =>
                                  setNested(
                                    index,
                                    "contacts",
                                    contactIndex,
                                    "value",
                                    toLocalized({
                                      ...contactValue,
                                      en: event.target.value,
                                    }),
                                  )
                                }
                                className={inputCls}
                              />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {contacts.length === 0 ? (
                    <p className="text-[11px] text-ink/40">
                      등록된 연락처가 없습니다. 아래 버튼으로 추가하세요.
                    </p>
                  ) : null}
                  <AddButton
                    onClick={() =>
                      addNested(index, "contacts", { label: "", value: "" })
                    }
                  >
                    + 연락처 추가
                  </AddButton>
                </Section>

                <Section
                  title="지도 / Map"
                  hint="Google Maps 임베드 URL을 입력하면 이 위치 아래에 지도가 표시됩니다. 비워두면 지도가 표시되지 않습니다."
                >
                  <SimpleField
                    label="지도 임베드 URL / Map embed URL"
                    value={stringValue(row.mapEmbed)}
                    onChange={(next) => setField(index, "mapEmbed", next)}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                  <LocalizedField
                    label="지도 제목 / Map title"
                    hint="지도 iframe의 접근성 제목입니다."
                    value={row.mapTitle ?? ""}
                    onChange={(next) => setField(index, "mapTitle", next)}
                  />
                </Section>

                <Section
                  title="이미지 / Images"
                  hint="위치 사진이나 지도 이미지를 추가합니다. 첫 번째 이미지가 대표 이미지로 표시됩니다."
                >
                  {images.length === 0 ? (
                    <p className="text-[11px] text-ink/40">
                      등록된 이미지가 없습니다. 아래 버튼으로 추가하세요.
                    </p>
                  ) : null}
                  {images.map((image, imageIndex) => {
                    return (
                      <div
                        key={imageIndex}
                        className="flex flex-col gap-3 rounded-[4px] border border-black/10 bg-white p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-ink/50">
                            이미지 #{imageIndex + 1}
                          </span>
                          <MoveButtons
                            index={imageIndex}
                            count={images.length}
                            onMove={(target, delta) =>
                              moveNested(index, "images", target, delta)
                            }
                            onRemove={(target) =>
                              removeNested(index, "images", target)
                            }
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex flex-col gap-1.5">
                            <FieldLabel label="이미지 URL / Image" />
                            <InlineImageInput
                              value={stringValue(image.src)}
                              onChange={(next) =>
                                setNested(
                                  index,
                                  "images",
                                  imageIndex,
                                  "src",
                                  next,
                                )
                              }
                              uploadConfigured={uploadConfigured}
                              onError={onError}
                              t={t}
                              ariaLabel="이미지 URL"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <FieldLabel
                              label="원본 이미지 URL / Full image"
                              hint="라이트박스에서 크게 볼 이미지입니다. 비워두면 위 이미지와 동일하게 사용됩니다."
                            />
                            <InlineImageInput
                              value={stringValue(image.fullSrc)}
                              onChange={(next) =>
                                setNested(
                                  index,
                                  "images",
                                  imageIndex,
                                  "fullSrc",
                                  next,
                                )
                              }
                              uploadConfigured={uploadConfigured}
                              onError={onError}
                              t={t}
                              ariaLabel="원본 이미지 URL"
                            />
                          </div>
                        </div>
                        <LocalizedField
                          label="제목 / Title"
                          value={image.title ?? ""}
                          onChange={(next) =>
                            setNested(
                              index,
                              "images",
                              imageIndex,
                              "title",
                              next,
                            )
                          }
                        />
                        <LocalizedField
                          label="설명 / Description"
                          value={image.description ?? ""}
                          onChange={(next) =>
                            setNested(
                              index,
                              "images",
                              imageIndex,
                              "description",
                              next,
                            )
                          }
                          multiline
                          rows={2}
                        />
                      </div>
                    );
                  })}
                  <AddButton
                    onClick={() =>
                      addNested(index, "images", {
                        src: "",
                        fullSrc: "",
                        title: "",
                        description: "",
                      })
                    }
                  >
                    + 이미지 추가
                  </AddButton>
                </Section>
              </div>
            ) : null}
          </div>
        );
      })}

      <AddButton onClick={addLocation}>+ 위치 추가</AddButton>
    </div>
  );
}
