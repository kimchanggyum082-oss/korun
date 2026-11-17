import type { CSSProperties } from "react";
import type { AboutLocationItem } from "@/lib/data";
import LocationImages from "@/components/about/LocationImages";

/** Desktop photo width (% of the content row): own column vs. behind the text. */
const DEFAULT_PHOTO_WIDTH = 44;
const MIN_PHOTO_WIDTH = 30;
const MAX_PHOTO_WIDTH = 100;

function photoWidthOf(location: AboutLocationItem): number {
  const parsed = location.imageWidth;
  if (!Number.isFinite(parsed)) return DEFAULT_PHOTO_WIDTH;
  return Math.min(MAX_PHOTO_WIDTH, Math.max(MIN_PHOTO_WIDTH, parsed));
}

const MAX_PHOTO_LIFT = 240;

function photoLiftOf(location: AboutLocationItem): number {
  const parsed = location.imageLift;
  if (!Number.isFinite(parsed)) return 0;
  return Math.min(MAX_PHOTO_LIFT, Math.max(0, parsed));
}

/**
 * The repeated location block used by the company-location page and the home
 * page. Keeping it in one place guarantees both pages stay visually identical.
 *
 * `variant="split"` moves each location's photos into a right-hand column next
 * to the text on desktop (mobile keeps the stacked text -> map -> photos order).
 */
export default function CompanyLocationsList({
  locations,
  mapTitleFallback = "Location map",
  variant = "default",
}: {
  locations: readonly AboutLocationItem[];
  mapTitleFallback?: string;
  variant?: "default" | "split";
}) {
  return (
    <>
      {locations.map((location, index) => {
        const split = variant === "split" && location.images.length > 0;
        const photoWidth = photoWidthOf(location);
        const photoLift = photoLiftOf(location);

        return (
          <div
            key={index}
            data-preview-location-index={index}
            className={
              index > 0
                ? "border-t border-ink/15 pt-[30px] pc:pt-[50px]"
                : undefined
            }
          >
            <div
              className={
                split
                  ? "pc:grid pc:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] pc:items-start pc:gap-x-[48px]"
                  : undefined
              }
            >
              {/* Text column: headings, name, description and contact rows.
                  Sits above the photo when the photo is widened behind it. */}
              <div
                className={
                  split
                    ? "min-w-0 pc:relative pc:z-10 pc:col-start-1 pc:row-start-1"
                    : "min-w-0"
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
                            <span className="pc:text-[20px]">
                              {contact.label}
                            </span>
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
              </div>

              {/* Map row: full width below both columns. On desktop it is an
                  opaque layer above the photos, so a photo that overhangs
                  upward is masked by the block above instead of covering it. */}
              {location.mapEmbed ? (
                <div
                  className={
                    split
                      ? "pc:relative pc:z-10 pc:col-span-2 pc:col-start-1 pc:row-start-2 pc:bg-white"
                      : undefined
                  }
                >
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
                </div>
              ) : null}

              {/* Photos: desktop is an absolute, bottom-anchored layer behind
                  the text, so growth goes upward and never moves the map.
                  Mobile keeps the stacked order after the map. */}
              {split ? (
                <div className="pc:col-span-2 pc:col-start-1 pc:row-start-1 pc:relative pc:z-0 pc:self-stretch">
                  <div
                    className="pc:absolute pc:right-0 pc:w-[var(--loc-photo-w)]"
                    style={
                      {
                        "--loc-photo-w": `${photoWidth}%`,
                        bottom: photoLift,
                      } as CSSProperties
                    }
                  >
                    <LocationImages images={location.images} variant="split" />
                  </div>
                </div>
              ) : (
                <LocationImages images={location.images} />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
