import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function FlagIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 15 15"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      {...props}
    >
      <path d="M1.5 0.5v14" />
      <path d="M1.5 0.5h11.75v7H1.5" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 15 13"
      width="15"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      {...props}
    >
      <path d="M7.5 12.1 1.6 6.2A3 3 0 0 1 7.5 2.6a3 3 0 0 1 5.9 3.6z" />
    </svg>
  );
}

export function BubbleIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 17 17"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      {...props}
    >
      <path d="M8.5 1.5a7 7 0 0 1 0 14H2.2l1.4-2.6A7 7 0 0 1 8.5 1.5z" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 17 17"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      {...props}
    >
      <circle cx="13.2" cy="3.6" r="2.4" />
      <circle cx="3.8" cy="8.5" r="2.4" />
      <circle cx="13.2" cy="13.4" r="2.4" />
      <path d="M6 7.3 11 4.8M6 9.7l5 2.5" />
    </svg>
  );
}

export function FaxIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 17 17"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      {...props}
    >
      <path d="M4 6V1.6h9V6" />
      <rect x="1.5" y="6" width="14" height="6.4" rx=".6" />
      <path d="M4 12.4v3h9v-3" />
      <path d="M4 9.2h1.6" />
    </svg>
  );
}

export function PaperclipIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 15 15"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      {...props}
    >
      <path d="M12.7 7.1 7.4 12.4a3.6 3.6 0 0 1-5.1-5.1l5.6-5.6a2.4 2.4 0 0 1 3.4 3.4l-5.6 5.6a1.2 1.2 0 0 1-1.7-1.7l5.1-5.1" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
      {...props}
    >
      <path d="M12 3v13" />
      <path d="M6.5 11.5 12 17l5.5-5.5" />
      <path d="M4 21h16" />
    </svg>
  );
}

export function DownloadSolidIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 14 24"
      width="14"
      height="24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M3 3h8v6h3l-7 6.6L0 9h3z" />
      <rect x="0" y="18" width="14" height="2" />
    </svg>
  );
}

export function PictureIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 18 18"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
      {...props}
    >
      <rect x="1.5" y="2.5" width="15" height="13" rx=".6" />
      <path d="M1.5 12.5 6 8l3.4 3.4L12 9l4.5 4.5" />
      <circle cx="6" cy="6.2" r="1" />
    </svg>
  );
}

export function MagnifierIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 15 15"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      {...props}
    >
      <circle cx="6.3" cy="6.3" r="4.9" />
      <path d="m10 10 3.9 3.9" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 13 13"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      {...props}
    >
      <path d="M9 1 3.5 6.5 9 12" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 13 13"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      {...props}
    >
      <path d="M4 1l5.5 5.5L4 12" />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      {...props}
    >
      <path d="M1 4.5 7 10.5 13 4.5" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      {...props}
    >
      <path d="M1 9.5 7 3.5l6 6" />
    </svg>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
      {...props}
    >
      <path d="M13.5 8a5.5 5.5 0 1 1-1.7-4" />
      <path d="M13.6 1.8v3h-3" />
    </svg>
  );
}

export function CaretDownIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 9 5"
      width="9"
      height="5"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M0 0h9L4.5 5z" />
    </svg>
  );
}
