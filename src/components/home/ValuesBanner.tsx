import SmartImage from "@/components/ui/SmartImage";
import { assets, values } from "@/lib/data";

export default function ValuesBanner() {
  return (
    <section className="relative h-[420px] w-full overflow-hidden pc:h-[221px]">
      <SmartImage
        src={assets.valuesBg}
        alt="코런 전시 부스"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45 pc:bg-black/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-4 pc:hidden">
        {values.map((v) => (
          <span
            key={v.label}
            style={{ backgroundColor: v.color }}
            className="rounded-full px-8 py-3 text-sm font-bold text-white shadow-lg md:px-10 md:py-3.5 md:text-base"
          >
            {v.label}
          </span>
        ))}
      </div>

      <div className="absolute inset-0 z-10 hidden items-center justify-center gap-[31px] pc:flex">
        {values.map((v) => (
          <a
            key={v.label}
            href="#"
            style={
              {
                "--pill-bg": v.color,
                paddingLeft: v.padding,
                paddingRight: v.padding,
              } as React.CSSProperties
            }
            className="flex h-[61px] items-center rounded-full bg-(--pill-bg) text-[22px] leading-none text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            {v.label}
          </a>
        ))}
      </div>
    </section>
  );
}
