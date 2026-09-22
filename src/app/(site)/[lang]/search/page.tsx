import type { Metadata } from "next";
import SearchForm from "@/components/search/SearchForm";
import SearchResultRow from "@/components/search/SearchResultRow";
import { CaretGlyph, PagerArrow } from "@/components/search/SearchIcons";
import {
  runSearch,
  SEARCH_PAGE_SIZE,
  type SearchHit,
} from "@/components/search/searchData";
import { resolveActiveLocale } from "@/lib/content";
import { getChrome } from "@/lib/i18n/server";
import { localizeHref, type Locale } from "@/lib/i18n/locales";
import { metadataAlternates } from "@/lib/i18n/seo";
import { pagesService } from "@/lib/i18n/pages-service";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveActiveLocale();
  const copy = pagesService[locale];
  return {
    title: copy.search.meta.title,
    description: copy.search.meta.description,
    alternates: metadataAlternates("/search", locale),
  };
}

const TABS = [
  { key: "post", label: "board" },
  { key: "map", label: "map" },
  { key: "gallery", label: "gallery" },
] as const;

const liBase = {
  display: "inline-block",
  verticalAlign: "top",
  width: 24,
  height: 24,
  borderRadius: "50%",
} as const;

const aBase = {
  display: "inline-block",
  width: 24,
  height: 24,
  lineHeight: "24px",
  fontSize: 14,
  textAlign: "center",
  borderRadius: "50%",
} as const;

function queryString(
  type: string,
  keyword: string,
  sort: string,
  page: number,
): string {
  const params = new URLSearchParams();
  params.set("type", type);
  params.set("sort", sort);
  params.set("keyword", keyword);
  if (page > 1) params.set("page", String(page));
  return params.toString();
}

function Pager({
  current,
  total,
  type,
  keyword,
  sort,
  locale,
}: {
  current: number;
  total: number;
  type: string;
  keyword: string;
  sort: string;
  locale: Locale;
}) {
  const pages = Array.from({ length: total }, (_, index) => index + 1);
  return (
    <nav
      className="paging-block"
      style={{ position: "relative", minHeight: 64, textAlign: "center" }}
    >
      <ul
        className="pagination"
        style={{
          display: "inline-block",
          verticalAlign: "top",
          lineHeight: 0,
          margin: "20px 0",
          padding: 0,
          listStyle: "none",
          borderRadius: 4,
        }}
      >
        <li style={liBase}>
          <span
            aria-disabled
            style={{ ...aBase, color: "rgba(54, 54, 54, 0.4)" }}
          >
            <PagerArrow direction="left" />
          </span>
        </li>
        {pages.map((page) => {
          const active = page === current;
          return (
            <li key={page} style={{ ...liBase, margin: "0 3px" }}>
              <a
                href={localizeHref(
                  `/search?${queryString(type, keyword, sort, page)}`,
                  locale,
                )}
                style={{
                  ...aBase,
                  fontWeight: active ? 700 : 400,
                  color: active ? "#363636" : "rgba(54, 54, 54, 0.4)",
                }}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li style={liBase}>
          <span
            aria-disabled
            style={{ ...aBase, color: "rgba(54, 54, 54, 0.4)" }}
          >
            <PagerArrow direction="right" />
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const [t, locale] = await Promise.all([getChrome(), resolveActiveLocale()]);
  const keyword = typeof params.keyword === "string" ? params.keyword : "";
  const type = typeof params.type === "string" ? params.type : "";
  const rawSort = typeof params.sort === "string" ? params.sort : "";
  const sort = rawSort === "time_desc" ? "time_desc" : "consensus_desc";
  const rawPage = typeof params.page === "string" ? Number(params.page) : 1;
  const currentPage =
    Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;

  const hits: SearchHit[] = await runSearch(keyword, sort, locale);
  const totalPages = Math.max(1, Math.ceil(hits.length / SEARCH_PAGE_SIZE));
  const pageHits = hits.slice(
    (currentPage - 1) * SEARCH_PAGE_SIZE,
    currentPage * SEARCH_PAGE_SIZE,
  );
  const hasKeyword = keyword.trim() !== "";

  return (
    <section className="mx-auto max-w-[1280px] px-[15px] pt-[50px]">
      <div className="search_widget">
        <SearchForm type={type} keyword={keyword} sort={sort} />

        <div className="categorize shop-content">
          <ul
            className="site_nav"
            style={{
              display: "flex",
              listStyle: "none",
              margin: "0 0 20px",
              padding: 0,
              borderBottom: "1px solid rgba(128, 128, 128, 0.2)",
            }}
          >
            {TABS.map((tab, index) => {
              const active = index === 0;
              return (
                <li key={tab.key} style={{ display: "block" }}>
                  <a
                    href={localizeHref(
                      `/search?${queryString(tab.key, keyword, sort, 1)}`,
                      locale,
                    )}
                    aria-current={active ? "page" : undefined}
                    style={{
                      display: "block",
                      position: "relative",
                      lineHeight: "50px",
                      fontSize: 15,
                      margin: index === 0 ? "0 15px 0 0" : "0 15px",
                      color: active ? "#363636" : "rgba(54, 54, 54, 0.7)",
                    }}
                  >
                    {t.search.tabs[tab.label]}
                    {active && (
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: -1,
                          height: 1,
                          borderBottom: "1px solid #363636",
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div
            className="shop-tools clearfix"
            style={{
              margin: "5px 0",
              padding: "0 0 15px",
              textAlign: "right",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              className="inline-blocked float_l"
              style={{ display: "block" }}
            >
              {hits.length > 0 && (
                <span style={{ color: "rgba(54, 54, 54, 0.7)" }}>
                  {t.search.resultCount(hits.length)}
                </span>
              )}
            </div>
            <div
              className="down-btn"
              style={{
                marginLeft: "auto",
                position: "relative",
                display: "inline-block",
              }}
            >
              <select
                className="form-control"
                name="sort"
                title={t.search.sort}
                style={{
                  display: "inline-block",
                  border: 0,
                  background: "transparent",
                  height: "auto",
                  padding: "0 15px 0 0",
                  fontSize: 15,
                  lineHeight: "21.4286px",
                  color: "#363636",
                  appearance: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="consensus_desc">{t.search.sortAccuracy}</option>
                <option value="time_desc">{t.search.sortLatest}</option>
              </select>
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  opacity: 0.5,
                  pointerEvents: "none",
                }}
              >
                <CaretGlyph />
              </span>
            </div>
          </div>
        </div>

        <div className="view_box" style={{ padding: "50px 0" }}>
          {hits.length > 0 ? (
            <>
              {pageHits.map((hit, index) => (
                <SearchResultRow key={hit.key} hit={hit} first={index === 0} />
              ))}
              <Pager
                current={currentPage}
                total={totalPages}
                type={type}
                keyword={keyword}
                sort={sort}
                locale={locale}
              />
            </>
          ) : (
            <p
              style={{
                margin: "0 0 10px",
                textAlign: hasKeyword ? "center" : "start",
                fontSize: 15,
                lineHeight: "24px",
                color: "#363636",
              }}
            >
              {hasKeyword ? t.search.noResults : t.search.prompt}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
