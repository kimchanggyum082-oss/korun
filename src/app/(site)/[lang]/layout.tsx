import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getFooter, getSiteSettings } from "@/lib/content";
import { hasLocale, locales, type Locale } from "@/lib/i18n/locales";
import {
  absoluteUrl,
  metadataAlternates,
  metadataBaseUrl,
} from "@/lib/i18n/seo";

const DEFAULT_METADATA: Record<Locale, { name: string; description: string }> =
  {
    ko: {
      name: "코런",
      description:
        "코런은 밸브 게이트, 오픈 게이트, 싱글 노즐, 온도·시퀀스 컨트롤러를 개발·제조하는 핫러너 시스템 전문기업입니다. 다양한 사출 환경에 최적화된 기술과 맞춤형 솔루션을 제공합니다.",
    },
    en: {
      name: "KORUN",
      description:
        "KORUN is a hot runner system specialist that develops and manufactures valve gate systems, open gate systems, single nozzles, and time & temperature controllers, with technology and tailored solutions optimised for every injection molding environment.",
    },
  };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const metadataBase = metadataBaseUrl();
  const alternates = metadataAlternates("/", lang);
  const { name, description } = DEFAULT_METADATA[lang];
  const url = absoluteUrl("/", lang);
  return {
    ...(metadataBase ? { metadataBase } : {}),
    title: name,
    description,
    keywords: [name],
    applicationName: name,
    ...(alternates ? { alternates } : {}),
    openGraph: {
      type: "website",
      ...(url ? { url } : {}),
      title: name,
      description,
      images: [
        {
          url: "https://cdn.imweb.me/upload/S20240617d196c3c9ecacb/2b04303145abc.png",
          width: 1200,
          height: 627,
        },
      ],
    },
    other: {
      "msapplication-navbutton-color": "#363636",
      "msapplication-tooltip": name,
      "msapplication-TileImage":
        "https://cdn.imweb.me/thumbnail/20240625/4cfca407a9cda.png",
      "msapplication-square310x310logo":
        "https://cdn.imweb.me/thumbnail/20240625/8158baa507984.png",
      "apple-mobile-web-app-status-bar-style": "default",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#363636",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function SiteRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const [contact, footer] = await Promise.all([getSiteSettings(), getFooter()]);

  return (
    <html lang={lang} className="h-full antialiased">
      <body className="flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer
          contact={contact}
          labels={footer.labels}
          links={footer.links}
          copyright={footer.copyright}
        />
      </body>
    </html>
  );
}
