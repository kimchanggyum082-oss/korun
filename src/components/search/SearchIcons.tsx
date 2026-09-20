export function SearchGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <circle cx="8.6" cy="8.6" r="6.3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M13.2 13.2L18.4 18.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ClearGlyph() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <circle cx="8.5" cy="8.5" r="7.6" stroke="currentColor" strokeWidth="1" />
      <path
        d="M5.5 5.5L11.5 11.5M11.5 5.5L5.5 11.5"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function CaretGlyph() {
  return (
    <svg
      width="9.58"
      height="23"
      viewBox="0 0 9.58 23"
      aria-hidden
      focusable="false"
      style={{ display: "block" }}
    >
      <path d="M0 9.5H9.58L4.79 14.4Z" fill="#999999" />
    </svg>
  );
}

export function PagerArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden
      focusable="false"
      style={{ verticalAlign: "middle", marginTop: -2 }}
    >
      <path
        d={direction === "left" ? "M8.4 1.2L2.8 6.5L8.4 11.8" : "M4.6 1.2L10.2 6.5L4.6 11.8"}
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}
