/**
 * Service / Technology page title band: a centred subtitle above the section
 * heading. Desktop follows the original imweb rows (80px section padding,
 * 15px widget margins, 50px heading); mobile uses the original's separate
 * mobile_section (50px padding, 7.5px widget margins, 30px heading, a 15px
 * subtitle in rgb(0, 53, 29)).
 */
export default function PageHead({
  subtitle,
  title,
  mobileSubtitle,
  mobileTitle,
  subtitleColor = "#23463f",
  mobileSubtitleColor = "rgb(0, 53, 29)",
}: {
  subtitle?: string;
  title: string;
  mobileSubtitle?: string;
  mobileTitle?: string;
  subtitleColor?: string;
  mobileSubtitleColor?: string;
}) {
  const mobileSub = mobileSubtitle ?? subtitle;
  const mobileHead = mobileTitle ?? title;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-[15px] py-[50px] text-center pc:flex pc:flex-col pc:py-[80px]">
        {(subtitle || mobileSub) && (
          <div
            className={`mt-[7.5px] mb-[15px] pc:my-[15px] ${subtitle ? "" : "pc:hidden"}`}
          >
            <p className="text-center text-[15px] leading-[24px] pc:leading-[30px]">
              {mobileSub && (
                <span
                  className={`font-bold ${subtitle ? "pc:hidden" : ""}`}
                  style={{ color: mobileSubtitleColor }}
                >
                  {mobileSub}
                </span>
              )}
              {subtitle && (
                <span
                  className="hidden font-bold pc:inline pc:text-[22px] pc:leading-[26.4px]"
                  style={{ color: subtitleColor }}
                >
                  {subtitle}
                </span>
              )}
            </p>
          </div>
        )}
        <h1 className="my-[7.5px] text-[30px] font-bold leading-[36px] text-ink pc:mt-[20px] pc:mb-[10px] pc:text-[50px] pc:leading-[60px]">
          {mobileHead === title ? (
            title
          ) : (
            <>
              <span className="pc:hidden">{mobileHead}</span>
              <span className="hidden pc:inline">{title}</span>
            </>
          )}
        </h1>
      </div>
    </section>
  );
}
