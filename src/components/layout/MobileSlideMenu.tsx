"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/client";
import { chrome } from "@/lib/i18n/chrome";
import { localizeHref } from "@/lib/i18n/locales";
import { nav } from "@/lib/data";
import LocaleMenu from "./LocaleMenu";

type MobileSlideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSlideMenu({
  open,
  onClose,
}: MobileSlideMenuProps) {
  const locale = useLocale();
  const t = chrome[locale];
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const localize = (href: string) =>
    href.startsWith("/") ? localizeHref(href, locale) : href;

  return (
    <div
      className={`fixed bottom-0 top-0 z-[9999] overflow-x-hidden overflow-y-auto ${
        open ? "left-0 w-full" : "right-0 w-0"
      }`}
    >
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-[1100] bg-black/60 transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`absolute left-0 top-0 z-[1500] h-full w-[300px] bg-white shadow-[0_2px_5px_0_rgba(0,0,0,0.16),0_2px_10px_0_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full overflow-y-auto pb-2.5">
          <div className="relative border border-transparent bg-[#2b2b2b] p-5 text-left">
            <div className="w-full text-[14px] font-normal text-white">
              <span className="leading-[26px] opacity-60">
                {t.header.loginRequired}
              </span>
              <button
                type="button"
                className="float-right bg-transparent px-3 py-1.5 text-[12px] leading-none text-white"
              >
                {t.header.login}
              </button>
            </div>
          </div>

          <div className="border-t border-[#f3f3f3] px-5 py-[13px]">
            <LocaleMenu variant="mobile" onSelect={onClose} />
          </div>

          <ul>
            {nav.map((item) => {
              const isExpanded = expandedItem === item.label;

              return (
                <li
                  key={item.label}
                  className="border-t border-[#f3f3f3] last:border-b"
                >
                  <div className="relative">
                    {item.children.length > 0 ? (
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedItem(isExpanded ? null : item.label)
                        }
                        className="block w-full pb-[14px] pl-5 pr-[50px] pt-[13px] text-left text-[14px] leading-none text-[#212121]/[0.89]"
                      >
                        {t.nav.sections[item.label]}
                      </button>
                    ) : (
                      <Link
                        href={localize(item.href)}
                        onClick={onClose}
                        className="block pb-[14px] pl-5 pr-[50px] pt-[13px] text-[14px] leading-none text-[#212121]/[0.89]"
                      >
                        {t.nav.sections[item.label]}
                      </Link>
                    )}
                    {item.children.length > 0 && (
                      <button
                        type="button"
                        aria-label={t.header.submenu(
                          t.nav.sections[item.label],
                        )}
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedItem(isExpanded ? null : item.label)
                        }
                        className="absolute right-0 top-0 text-[#212121]/[0.89]"
                      >
                        <span className="flex pb-[14px] pl-5 pr-5 pt-[13px]">
                          <svg
                            width="13"
                            height="6"
                            viewBox="0 0 13 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            aria-hidden
                            className={`mt-[3px] ${isExpanded ? "rotate-180" : ""}`}
                          >
                            <path d="M0.5 0.5 6.5 5.5 12.5 0.5" />
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>

                  {isExpanded && (
                    <ul className="mb-3.5">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={localize(child.href)}
                            onClick={onClose}
                            className="block py-2 pl-[30px] pr-[50px] text-[13px] leading-none text-[#212121]/[0.89]"
                          >
                            {t.nav.links[child.href]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <button
        type="button"
        aria-label={t.header.menuClose}
        onClick={onClose}
        className={`fixed left-[310px] top-[17px] z-[1100] flex h-[32.72px] w-8 items-start p-2 text-white transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <line x1="0.7" y1="0.7" x2="15.3" y2="15.3" />
          <line x1="15.3" y1="0.7" x2="0.7" y2="15.3" />
        </svg>
      </button>
    </div>
  );
}
