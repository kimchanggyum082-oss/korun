import { company } from "@/lib/data";

export default function LocationSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-14">
        <div className="md:col-span-3">
          <iframe
            src={company.mapEmbed}
            title="코런 본사 위치 지도"
            className="h-[300px] w-full border-0 md:h-[420px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-bold tracking-[0.2em] text-neutral-400">
            HEAD OFFICE &amp; FACTORY
          </p>
          <h2 className="mt-2 text-xl font-extrabold text-neutral-900 md:text-2xl">
            본사 및 공장
          </h2>
          <hr className="my-6 border-neutral-200" />

          <table className="w-full text-sm md:text-[15px]">
            <tbody>
              <Row label="" value={company.name} bold />
              <Row label="TEL." value={company.tel} />
              <Row label="EMAIL." value={company.email} />
              <Row label="ADDRESS." value={company.address} />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <tr className="align-top">
      {!bold && (
        <th
          scope="row"
          className="w-24 py-2.5 pr-4 text-left font-bold text-neutral-900 md:w-28"
        >
          {label}
        </th>
      )}
      <td
        colSpan={bold ? 2 : 1}
        className={`py-2.5 text-neutral-600 ${bold ? "font-bold" : ""}`}
      >
        {value}
      </td>
    </tr>
  );
}
