import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getFooter, getSiteSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contact, footer] = await Promise.all([getSiteSettings(), getFooter()]);

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer
        contact={contact}
        labels={footer.labels}
        links={footer.links}
        copyright={footer.copyright}
      />
    </>
  );
}
