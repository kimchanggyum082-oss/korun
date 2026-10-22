import type { AboutLocationItem } from "@/lib/data";
import LocationImages from "@/components/about/LocationImages";

/**
 * The repeated location block used by the company-location page and the home
 * page. Keeping it in one place guarantees both pages stay visually identical.
 */
export default function CompanyLocationsList({
  locations,
  mapTitleFallback = "Location map",
}: {
  locations: readonly AboutLocationItem[];
  mapTitleFallback?: string;
}) {
  return (
    <>
      {locations.map((location, index) => (
        <div
          key={index}
          data-preview-location-index={index}
          className={
            index > 0
              ? "border-t border-ink/15 pt-[30px] pc:pt-[50px]"
              : undefined
          }
        >
          {location.headingEn ? (
            <p className="text-[24px] leading-[29px] font-bold text-brand pc:text-[36px] pc:leading-[43.2px] pc:font-normal">
              <span className="text-[15px] leading-[18px] pc:text-[20px] pc:leading-[24px] pc:font-bold">
                {location.headingEn}
              </span>
            </p>
          ) : null}
          {location.heading ? (
            <p className="text-[28px] leading-[33.6px] font-bold text-ink pc:text-[48px] pc:leading-[57.6px]">
              {location.heading}
            </p>
          ) : null}

          {location.name ? (
            <p className="mt-[7.5px] text-[18px] leading-[24px] font-bold text-brand pc:text-[22px] pc:leading-[26.4px]">
              {location.name}
            </p>
          ) : null}
          {location.description ? (
            <p className="mt-[10px] whitespace-pre-line text-[15px] leading-[24px] text-ink pc:text-[18px] pc:leading-[28.8px]">
              {location.description}
            </p>
          ) : null}

          {location.contacts.length > 0 ? (
            <>
              <div className="hidden pc:block pc:h-[24px]" />
              <p className="text-[15px] leading-[24px] text-ink pc:hidden">
                &nbsp;
              </p>

              <dl className="w-full text-[15px] leading-[24px]">
                {location.contacts.map((contact, contactIndex) => (
                  <div
                    key={`${contact.label}-${contactIndex}`}
                    className="flex"
                  >
                    <dt className="w-[89px] shrink-0 px-[8px] py-[8px] text-left font-bold text-ink pc:w-[21.5%] pc:px-0">
                      <span className="pc:text-[20px]">{contact.label}</span>
                    </dt>
                    <dd className="min-w-0 flex-1 px-[8px] py-[8px] text-ink pc:px-0">
                      <span className="break-words whitespace-pre-line pc:text-[20px]">
                        {contact.value}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          ) : null}

          {location.mapEmbed ? (
            <>
              <hr className="my-[20px] border-ink/15" />
              <div className="h-[472px] py-[7.5px] pc:h-auto pc:py-[15px]">
                <iframe
                  src={location.mapEmbed}
                  title={location.mapTitle || mapTitleFallback}
                  className="block h-[450px] w-full border-0 pc:h-[457px]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </>
          ) : null}

          <LocationImages images={location.images} />
        </div>
      ))}
    </>
  );
}
