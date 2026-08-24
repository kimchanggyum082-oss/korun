import Image from "next/image";
import Link from "next/link";
import { assets, nav } from "@/lib/data";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white pc:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16 md:px-6">
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
              className="h-7 w-auto md:h-9"
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

      <div className="relative hidden h-[70px] pc:block">
        <div className="fixed inset-x-0 top-0 z-50 bg-white">
          <div className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-[15px]">
            <Link href="/" aria-label="코런 홈">
              <Image
                src={assets.logo}
                alt="KORUN"
                width={121}
                height={40}
                priority
                className="h-auto w-[100px]"
              />
            </Link>

            <nav aria-label="주 메뉴">
              <ul className="flex items-center gap-7">
                {nav.map((item) => (
                  <li
                    key={item.label}
                    className="group relative flex h-[70px] items-center"
                  >
                    <a
                      href={item.href}
                      className="block py-1.5 text-[16px] leading-[19px] text-[#212121] transition-colors duration-300 hover:text-[#212121]/50"
                    >
                      {item.label}
                    </a>
                    <div className="invisible absolute left-0 top-full z-50 min-w-[210px] bg-[#333333] opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block whitespace-nowrap px-4 py-2 text-[13px] text-white/60 transition-colors duration-300 hover:bg-[#444444] hover:text-white focus-visible:bg-[#444444] focus-visible:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
