"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { assets, nav } from "@/lib/data";
import MobileSlideMenu from "./MobileSlideMenu";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen && !searchOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, searchOpen]);

  const isActive = (hrefs: readonly string[]) =>
    hrefs.some((href) => pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#e7e7e7] bg-white pc:hidden">
        <div className="relative flex h-12 items-center justify-between px-2.5">
          <button
            type="button"
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex h-12 items-center px-[5px] text-[#212121]"
          >
            <span className="mt-[16px] flex flex-col gap-[5.25px] self-start">
              <span className="block h-[1.5px] w-[18px] bg-current" />
              <span className="block h-[1.5px] w-[18px] bg-current" />
              <span className="block h-[1.5px] w-[18px] bg-current" />
            </span>
            <span className="hidden">MENU</span>
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
              unoptimized
              className="h-auto w-[78.65px]"
            />
          </Link>

          <button
            type="button"
            aria-label="site search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(true)}
            className="flex h-12 w-[30px] items-start pl-[10px] pt-[11px] text-[#212121]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <circle cx="7.5" cy="7.5" r="6.6" />
              <line x1="12.2" y1="12.2" x2="19" y2="19" />
            </svg>
          </button>
        </div>
      </header>

      <div className="relative hidden h-[90px] pc:block">
        <div className="fixed inset-x-0 top-0 z-50 h-[90px] bg-white">
          <div className="mx-auto flex h-[90px] max-w-[1280px] items-center justify-between px-[15px]">
            <Link href="/" aria-label="코런 홈">
              <Image
                src={assets.logo}
                alt="KORUN"
                width={121}
                height={40}
                priority
                unoptimized
                className="h-auto w-[121px]"
              />
            </Link>

            <nav aria-label="주 메뉴">
              <ul className="flex h-[90px] items-center">
                {nav.map((item) => {
                  const active = isActive(
                    item.children.map((child) => child.href),
                  );

                  return (
                    <li key={item.label} className="group relative h-[90px]">
                      <a
                        href={item.href}
                        className={`flex h-[90px] items-center px-[18px] text-[18px] leading-[1.6] hover:text-[#212121]/50 ${
                          active ? "font-bold text-ink" : "text-[#212121]"
                        }`}
                      >
                        {item.label}
                      </a>
                      <div className="invisible absolute left-[18px] top-full z-[1000] min-w-[160px] bg-[#333] opacity-0 transition-[opacity,visibility] duration-300 ease-[ease] after:absolute after:inset-x-0 after:top-full after:h-[150px] after:bg-transparent after:content-[''] group-hover:visible group-hover:opacity-100">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block whitespace-nowrap px-5 py-2.5 text-[13px] leading-[1.42857] text-white/60 hover:bg-[#444] hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <MobileSlideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
