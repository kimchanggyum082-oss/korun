import AboutGallery from "@/components/about/AboutGallery";
import type { AboutPatentEntity } from "@/lib/admin/entities";
import type { GalleryImage } from "@/lib/data";

export type PatentCredentialsViewProps = {
  content: AboutPatentEntity["content"];
  assets: { patentImages: readonly GalleryImage[] };
};

export default function PatentCredentialsView({
  content,
  assets,
}: PatentCredentialsViewProps) {
  return (
    <>
      {/* Page title banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col px-[15px] py-[50px] text-center pc:py-[80px]">
          <div className="hidden pc:block pc:col-span-12 pc:h-[60px]" />
          <div className="my-[7.5px] pc:my-0 pc:pt-[20px] pc:pb-[10px]">
            <h1 className="text-[30px] leading-[36px] font-bold text-ink pc:text-[50px] pc:leading-[60px]">
              {content.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <AboutGallery
        images={assets.patentImages}
        variant="certificate"
        galleryId="img_lg"
      />
    </>
  );
}
