import type { SearchHit } from "@/components/search/searchData";

export default function SearchResultRow({
  hit,
  first,
}: {
  hit: SearchHit;
  first: boolean;
}) {
  return (
    <div style={{ maxWidth: 900, marginTop: first ? 0 : 50 }}>
      {hit.thumbnail && (
        <div
          style={{
            display: "table-cell",
            verticalAlign: "top",
            paddingRight: 16,
            width: 171,
          }}
        >
          <a href={hit.href}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hit.thumbnail}
              alt=""
              loading="lazy"
              style={{
                display: "block",
                width: 155,
                height: 155,
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
          </a>
        </div>
      )}
      <div style={{ display: "table-cell", verticalAlign: "top" }}>
        <a href={hit.listHref}>
          <span
            style={{
              fontSize: 15,
              lineHeight: "24px",
              color: "rgba(54, 54, 54, 0.7)",
            }}
          >
            {hit.boardName}
          </span>
        </a>
        <a href={hit.href}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              lineHeight: "25.6px",
              color: "#363636",
            }}
          >
            {hit.title}{" "}
          </div>
          <span
            className="line-clamp-2 break-words"
            style={{
              fontSize: 15,
              lineHeight: "24px",
              color: "#363636",
            }}
          >
            {hit.summary}
          </span>
        </a>
      </div>
    </div>
  );
}
