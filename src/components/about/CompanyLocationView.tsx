import type { AboutContentMap } from "@/lib/data";
import LocationImages from "@/components/about/LocationImages";

export type CompanyLocationViewProps = {
  content: AboutContentMap["company-location"];
};

/**
 * Presentational view for About > Company Location. Shared by the public page
 * (server) and the admin preview (client, inside ScaledDesktop).
 *
 * Every location renders the same block: heading, name/description, a dynamic
 * key/value contact list, an optional map, and its image gallery.
 */
export default function CompanyLocationView({
  content,
}: CompanyLocationViewProps) {
  return (
    <>
      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col px-[15px] py-[50px] text-center pc:py-[80px]">
          <div className="hidden pc:block pc:h-[60px]" />
          <div className="my-[7.5px] pc:my-0 pc:pt-[20px] pc:pb-[10px]">
            <h1 className="text-[30px] leading-[36px] font-bold text-ink pc:text-[50px] pc:leading-[60px]">
              {content.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="mx-auto max-w-[1280px] px-[15px] pc:py-0">
        {content.locations.map((location, index) => (
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
                    title={location.mapTitle || content.title}
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

        {/* Trailing spacer row */}
        <div className="h-[55px] pt-[7.5px] pb-[7.5px] pc:hidden" />
        <div className="hidden pc:block pc:h-[110px]" />
      </section>
    </>
  );
}
