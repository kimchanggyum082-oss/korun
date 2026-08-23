import { company } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <ul className="space-y-1.5 text-[13px] leading-relaxed text-neutral-300">
            <li>회사명 {company.name}</li>
            <li>주소 {company.address}</li>
            <li>TEL {company.tel}</li>
            <li>Fax {company.fax}</li>
            <li>
              E-mail{" "}
              <a
                href={`mailto:${company.email}`}
                className="text-neutral-300 underline-offset-2 hover:underline"
              >
                {company.email}
              </a>
            </li>
            <li className="pt-4 text-[11px] text-neutral-500">
              COPYRIGHT © {company.name}. ALL RIGHTS RESERVED.
            </li>
          </ul>

          <div className="flex gap-3">
            <a
              href="#"
              className="border border-neutral-600 px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-white hover:text-black"
            >
              이용약관
            </a>
            <a
              href="#"
              className="border border-neutral-600 px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-white hover:text-black"
            >
              개인정보취급방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
