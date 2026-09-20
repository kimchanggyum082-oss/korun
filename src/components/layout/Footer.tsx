import Link from "next/link";
import { company } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#020202] text-[#9b9b9b] pc:bg-[#131313] pc:text-[#b3b3b3]">
      {/* Mobile */}
      <div className="pc:hidden">
        <div className="mx-auto max-w-[1280px] px-[15px]">
          <div className="py-[7.5px]">
            <div className="h-[30px]" />
          </div>
          <div className="py-[7.5px] text-[15px] leading-[24px]">
            <p>
              <br />
            </p>
            <p>
              <span className="text-[14px] leading-[22.4px]">
                회사명 &nbsp;{company.name.replace(/\s+/g, "")}
              </span>
            </p>
            <p>
              <span className="text-[14px] leading-[22.4px]">
                주소 &nbsp;{company.address}
              </span>
            </p>
            <p>
              <span className="text-[14px] leading-[22.4px]">
                TEL &nbsp;{company.tel}
              </span>
            </p>
            <p>
              <span className="text-[14px] leading-[22.4px]">
                Fax &nbsp;{company.fax}
              </span>
            </p>
            <p>
              <span className="text-[14px] leading-[22.4px]">
                E-mail &nbsp;
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-white"
                >
                  {company.email}
                </a>
              </span>
            </p>
            <p>
              <br />
            </p>
            <p>
              <span className="text-[14px] leading-[22.4px]">
                COPYRIGHT © {company.name.replace(/\s+/g, "")}. ALL RIGHTS
                RESERVED. DESIGN HOSTING BY WEMENTO.
              </span>
            </p>
            <p>
              <br />
            </p>
          </div>
          <div className="-mx-[7.5px] flex text-[15px] leading-[24px]">
            <div className="w-[93.75px] px-[7.5px] py-[7.5px] font-bold">
              <Link
                href="/?mode=policy"
                className="transition-colors hover:text-white"
              >
                이용약관
              </Link>
            </div>
            <div className="w-[281.25px] px-[7.5px] py-[7.5px] font-bold">
              <p>
                <Link
                  href="/?mode=privacy"
                  className="transition-colors hover:text-white"
                >
                  개인정보취급방침
                </Link>
              </p>
              <p>
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PC */}
      <div className="mx-auto hidden max-w-[1280px] px-[15px] pb-[55px] pt-[110px] text-[15px] leading-[24px] pc:block pc:pb-[40px] pc:pt-[40px]">
        <div className="py-[15px]">
          <div className="h-[30px]" />
        </div>
        <div className="pc:py-[15px]">
          <p>
            회사명 &nbsp;{company.name.replace(/\s+/g, "")} &nbsp; &nbsp;|
            &nbsp; &nbsp; 주소 &nbsp;{company.address}
          </p>
          <p>
            TEL &nbsp;{company.tel} &nbsp; &nbsp; | &nbsp; &nbsp; Fax &nbsp;
            {company.fax} &nbsp; &nbsp;| &nbsp; &nbsp; E-mail &nbsp;
            <a
              href={`mailto:${company.email}`}
              className="transition-colors hover:text-white"
            >
              {company.email}
            </a>
          </p>
          <p>
            <br />
          </p>
          <p>
            COPYRIGHT © {company.name.replace(/\s+/g, "")}. ALL RIGHTS RESERVED.
            DESIGN HOSTING BY WEMENTO.
          </p>
          <p>
            <br />
          </p>
          <p className="font-bold">
            <Link
              href="/?mode=policy"
              className="transition-colors hover:text-white"
            >
              이용약관
            </Link>
            <strong className="pc:font-bold">&nbsp; &nbsp; &nbsp;</strong>
            <Link
              href="/?mode=privacy"
              className="transition-colors hover:text-white"
            >
              개인정보취급방침
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
