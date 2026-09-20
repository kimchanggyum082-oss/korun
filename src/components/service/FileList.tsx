import { DownloadIcon, DownloadSolidIcon } from "@/components/service/ServiceIcons";

export default function FileList({
  files,
}: {
  files: { name: string; size: string; url?: string }[];
}) {
  if (files.length === 0) return null;

  return (
    <>
      {/* PC */}
      <div className="hidden pc:block">
        <ul className="mb-[10px]">
          {files.map((file, i) => (
            <li
              key={file.name}
              className={
                i > 0
                  ? "bg-[#f7f7f7] p-[15px] pc:h-[70.59px] pc:mt-[5px]"
                  : "bg-[#f7f7f7] p-[15px] pc:h-[70.59px]"
              }
            >
              <a
                href={file.url ?? "#"}
                className="relative block"
                target={file.url ? "_blank" : undefined}
                rel={file.url ? "noopener noreferrer" : undefined}
              >
                <p className="m-0 text-[15px] leading-[21px] text-ink">
                  {file.name}
                </p>
                <em className="block text-[11px] leading-[17.6px] text-[#888]">
                  {file.size}
                </em>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#999]">
                  <DownloadIcon className="h-[24px] w-[14px]" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile */}
      <div className="pc:hidden">
        <ul className="mb-[10px]">
          {files.map((file, i) => (
            <li
              key={file.name}
              className={`relative bg-[#f7f7f7] px-[15px] pt-[15px] pb-[17px] ${i > 0 ? "mt-[5px]" : ""}`}
            >
              <a
                href={file.url ?? "#"}
                className="relative block"
                target={file.url ? "_blank" : undefined}
                rel={file.url ? "noopener noreferrer" : undefined}
              >
                <p className="m-0 text-[15px] leading-[21px] text-ink">
                  {file.name}
                </p>
                <em className="block text-[11px] leading-[17.6px] text-[#888] not-italic">
                  {file.size}
                </em>
                <span className="absolute top-1/2 right-0 -mt-[12px] block h-[24px] text-[#8c8c8c]">
                  <DownloadSolidIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
