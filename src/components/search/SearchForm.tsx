"use client";

import { useRef, useState } from "react";
import { ClearGlyph, SearchGlyph } from "@/components/search/SearchIcons";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref } from "@/lib/i18n/locales";

export default function SearchForm({
  type,
  keyword,
  sort,
}: {
  type: string;
  keyword: string;
  sort: string;
}) {
  const locale = useLocale();
  const t = chrome[locale];
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(keyword);

  const active = value !== "";

  return (
    <div
      className={active ? "control_box active" : "control_box"}
      id="control_box"
      style={{
        maxWidth: 600,
        width: "100%",
        margin: "0 auto 50px",
        position: "relative",
      }}
    >
      <form
        ref={formRef}
        action={localizeHref("/search", locale)}
        method="get"
        id="s_form"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          columnGap: 16,
        }}
      >
        <input type="hidden" name="type" value={type || "post"} />
        <input type="hidden" name="sort" value={sort} />
        <div
          className="form-group"
          style={{
            display: "grid",
            gridTemplateColumns: "subgrid",
            gridColumn: "1 / -1",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <div
            style={{
              position: "relative",
              gridColumn: "1 / -1",
              maxWidth: 400,
              width: "100%",
              justifySelf: "center",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="form-control"
              name="keyword"
              placeholder={t.search.placeholder}
              title={t.search.label}
              autoComplete="off"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              style={{
                display: "block",
                width: "100%",
                height: 44,
                padding: "6px 50px",
                borderRadius: 3,
                border: "1px solid rgba(0, 0, 0, 0.2)",
                backgroundColor: "#ffffff",
                color: "#212121",
                fontSize: 16,
                lineHeight: "1.42857",
                outline: "none",
              }}
            />
            <button
              type="submit"
              className="icon"
              style={{
                position: "absolute",
                zIndex: 9,
                top: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 44,
                fontSize: 20,
                color: "#363636",
                background: "transparent",
                border: 0,
                padding: 0,
                cursor: "pointer",
              }}
            >
              <SearchGlyph />
              <span className="sr-only">{t.search.submit}</span>
            </button>
            <button
              type="button"
              className="icon close"
              aria-hidden={!active}
              tabIndex={active ? 0 : -1}
              onClick={() => {
                setValue("");
                inputRef.current?.focus();
              }}
              style={{
                position: "absolute",
                zIndex: 9,
                top: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 57,
                height: 44,
                fontSize: 17,
                color: "#999999",
                background: "transparent",
                border: 0,
                padding: "0 25px 0 15px",
                opacity: active ? 1 : 0,
                cursor: "pointer",
              }}
            >
              <ClearGlyph />
              <span className="sr-only">{t.search.clear}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
