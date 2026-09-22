import Link from "next/link";

export type FooterBarLabels = {
  company: string;
  address: string;
  tel: string;
  fax: string;
  email: string;
};

export type FooterBarContact = {
  name: string;
  address: string;
  tel: string;
  fax: string;
  email: string;
};

export type FooterBarLinks = {
  policy: string;
  privacy: string;
};

const DEFAULT_LABELS: FooterBarLabels = {
  company: "회사명",
  address: "주소",
  tel: "TEL",
  fax: "Fax",
  email: "E-mail",
};

const DEFAULT_LINKS: FooterBarLinks = {
  policy: "이용약관",
  privacy: "개인정보취급방침",
};

/**
 * Presentational footer markup shared by the public `Footer` (server) and the
 * admin footer preview (client, rendered inside a ScaledDesktop frame).
 * Defaults reproduce the frozen public-site values exactly.
 */
export default function FooterBar({
  contact,
  labels = DEFAULT_LABELS,
  links = DEFAULT_LINKS,
  copyright,
}: {
  contact: FooterBarContact;
  labels?: FooterBarLabels;
  links?: FooterBarLinks;
  copyright?: string;
}) {
  const copyrightLine =
    copyright ??
    `COPYRIGHT © ${contact.name.replace(/\s+/g, "")}. ALL RIGHTS RESERVED. DESIGN HOSTING BY WEMENTO.`;

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
                {labels.company} &nbsp;{contact.name.replace(/\s+/g, "")}
              </span>
            </p>
            <p>
              <span className="text-[14px] leading-[22.4px]">
                {labels.address} &nbsp;{contact.address}
              </span>
            </p>
            <p>
              <span className="text-[14px] leading-[22.4px]">
                {labels.tel} &nbsp;{contact.tel}
              </span>
            </p>
            <p>
              <span className="text-[14px] leading-[22.4px]">
                {labels.fax} &nbsp;{contact.fax}
              </span>
            </p>
            <p>
              <span className="text-[14px] leading-[22.4px]">
                {labels.email} &nbsp;
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </span>
            </p>
            <p>
              <br />
            </p>
            <p>
              <span className="text-[14px] leading-[22.4px]">
                {copyrightLine}
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
                {links.policy}
              </Link>
            </div>
            <div className="w-[281.25px] px-[7.5px] py-[7.5px] font-bold">
              <p>
                <Link
                  href="/?mode=privacy"
                  className="transition-colors hover:text-white"
                >
                  {links.privacy}
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
            {labels.company} &nbsp;{contact.name.replace(/\s+/g, "")} &nbsp;
            &nbsp;| &nbsp; &nbsp; {labels.address} &nbsp;{contact.address}
          </p>
          <p>
            {labels.tel} &nbsp;{contact.tel} &nbsp; &nbsp; | &nbsp; &nbsp;{" "}
            {labels.fax} &nbsp;{contact.fax} &nbsp; &nbsp;| &nbsp; &nbsp;{" "}
            {labels.email} &nbsp;
            <a
              href={`mailto:${contact.email}`}
              className="transition-colors hover:text-white"
            >
              {contact.email}
            </a>
          </p>
          <p>
            <br />
          </p>
          <p>{copyrightLine}</p>
          <p>
            <br />
          </p>
          <p className="font-bold">
            <Link
              href="/?mode=policy"
              className="transition-colors hover:text-white"
            >
              {links.policy}
            </Link>
            <strong className="pc:font-bold">&nbsp; &nbsp; &nbsp;</strong>
            <Link
              href="/?mode=privacy"
              className="transition-colors hover:text-white"
            >
              {links.privacy}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
