import { company } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#131313] text-[#b3b3b3]">
      <div className="mx-auto max-w-[1280px] px-[15px] pb-[55px] pt-[110px] text-[15px] leading-[24px] pc:pb-[58px] pc:pt-[115px]">
        <p>
          회사명 {company.name.replace(/\s+/g, "")}&nbsp;&nbsp;|&nbsp;&nbsp;주소{" "}
          {company.address}
        </p>
        <p>
          TEL {company.tel}&nbsp;&nbsp;|&nbsp;&nbsp;Fax {company.fax}
          &nbsp;&nbsp;|&nbsp;&nbsp;E-mail{" "}
          <a
            href={`mailto:${company.email}`}
            className="transition-colors hover:text-white"
          >
            {company.email}
          </a>
        </p>
        <p className="mt-[27px]">
          COPYRIGHT © {company.name.replace(/\s+/g, "")}. ALL RIGHTS RESERVED.
          DESIGN HOSTING BY WEMENTO.
        </p>
        <p className="mt-[24px] flex gap-[17px] font-bold">
          <a href="#" className="transition-colors hover:text-white">
            이용약관
          </a>
          <a href="#" className="transition-colors hover:text-white">
            개인정보취급방침
          </a>
        </p>
      </div>
    </footer>
  );
}
