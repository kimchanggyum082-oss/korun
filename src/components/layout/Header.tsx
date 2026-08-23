import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/data";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
        <button
          type="button"
          aria-label="메뉴 열기"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
        >
          <span className="block h-[2px] w-6 bg-neutral-800" />
          <span className="block h-[2px] w-6 bg-neutral-800" />
          <span className="block h-[2px] w-4 bg-neutral-800" />
        </button>

        <Link
          href="/"
          aria-label="코런 홈"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <Image
            src={assets.logo}
            alt="KORUN"
            width={121}
            height={40}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>

        <button
          type="button"
          aria-label="site search"
          className="flex h-10 w-10 items-center justify-center"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
