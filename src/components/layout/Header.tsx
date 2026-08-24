"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets, nav } from "@/lib/data";

export default function Header() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white pc:hidden">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 md:h-14 md:px-6">
          <button
            type="button"
            aria-label="메뉴 열기"
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
          >
            <span className="block h-[2px] w-5 bg-neutral-800" />
            <span className="block h-[2px] w-5 bg-neutral-800" />
            <span className="block h-[2px] w-3.5 bg-neutral-800" />
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
              className="h-6 w-auto md:h-8"
            />
          </Link>

          <button
            type="button"
            aria-label="site search"
            className="flex h-9 w-9 items-center justify-center"
          >
            <svg
              width="20"
              height="20"
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

      <div className="relative hidden h-[60px] pc:block">
        <div className="fixed inset-x-0 top-0 z-50 bg-white">
          <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between px-[15px]">
            <Link href="/" aria-label="코런 홈">
              <Image
                src={assets.logo}
                alt="KORUN"
                width={121}
                height={40}
                priority
                className="h-auto w-[88px]"
              />
            </Link>

            <nav aria-label="주 메뉴" onMouseLeave={() => setHoveredItem(null)}>
              <ul className="flex items-center gap-6">
                {nav.map((item) => (
                  <li
                    key={item.label}
                    className="relative flex h-[60px] items-center"
                    onMouseEnter={() => setHoveredItem(item.label)}
                  >
                    <a
                      href={item.href}
                      className={`block py-1 text-[14px] leading-[17px] transition-colors duration-300 ${
                        hoveredItem === item.label
                          ? "text-[#212121]/50"
                          : "text-[#212121] hover:text-[#212121]/50"
                      }`}
                    >
                      {item.label}
                    </a>
                    {hoveredItem === item.label && (
                      <div className="absolute left-0 top-full z-50 min-w-[180px] bg-[#333333]">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block whitespace-nowrap px-3.5 py-1.5 text-[12px] text-white/60 transition-colors duration-300 hover:bg-[#444444] hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
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
