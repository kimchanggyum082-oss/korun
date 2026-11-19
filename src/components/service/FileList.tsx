import type { ReactNode } from "react";

import {
  DownloadIcon,
  DownloadSolidIcon,
} from "@/components/service/ServiceIcons";

type FileEntry = { name: string; size: string; url?: string };

function FileLink({
  file,
  children,
}: {
  file: FileEntry;
  children: ReactNode;
}) {
  if (!file.url) {
    return <div className="relative block">{children}</div>;
  }
  return (
    <a
      href={file.url}
      className="relative block"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function FileBody({
  file,
  icon,
  mobile,
}: {
  file: FileEntry;
  icon: ReactNode;
  mobile?: boolean;
}) {
  return (
    <>
      <p className="m-0 text-[15px] leading-[21px] text-ink">{file.name}</p>
      {file.size ? (
        <em
          className={`block text-[11px] leading-[17.6px] text-[#888] ${
            mobile ? "not-italic" : ""
          }`}
        >
          {file.size}
        </em>
      ) : null}
      {file.url ? (
        <span
          className={
            mobile
              ? "absolute top-1/2 right-0 -mt-[12px] block h-[24px] text-[#8c8c8c]"
              : "absolute top-1/2 right-0 -translate-y-1/2 text-[#999]"
          }
        >
          {icon}
        </span>
      ) : null}
    </>
  );
}

export default function FileList({ files }: { files: FileEntry[] }) {
  if (files.length === 0) return null;

  return (
    <>
      {/* PC */}
      <div className="hidden pc:block">
        <ul className="mb-[10px]">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className={
                i > 0
                  ? "bg-[#f7f7f7] p-[15px] pc:h-[70.59px] pc:mt-[5px]"
                  : "bg-[#f7f7f7] p-[15px] pc:h-[70.59px]"
              }
            >
              <FileLink file={file}>
                <FileBody
                  file={file}
                  icon={<DownloadIcon className="h-[24px] w-[14px]" />}
                />
              </FileLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile */}
      <div className="pc:hidden">
        <ul className="mb-[10px]">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className={`relative bg-[#f7f7f7] px-[15px] pt-[15px] pb-[17px] ${i > 0 ? "mt-[5px]" : ""}`}
            >
              <FileLink file={file}>
                <FileBody file={file} icon={<DownloadSolidIcon />} mobile />
              </FileLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
