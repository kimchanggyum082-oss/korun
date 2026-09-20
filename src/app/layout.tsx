import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

const DESCRIPTION =
  "코런은 밸브 게이트, 오픈 게이트, 싱글 노즐, 온도·시퀀스 컨트롤러를 개발·제조하는 핫러너 시스템 전문기업입니다. 다양한 사출 환경에 최적화된 기술과 맞춤형 솔루션을 제공합니다.";

export const metadata: Metadata = {
  title: "코런",
  description: DESCRIPTION,
  keywords: ["코런"],
  applicationName: "코런",
  alternates: {
    canonical: "http://korun15.co.kr/",
  },
  openGraph: {
    type: "website",
    url: "http://korun15.co.kr/",
    title: "코런",
    description: DESCRIPTION,
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
    "msapplication-tooltip": "코런",
    "msapplication-TileImage":
      "https://cdn.imweb.me/thumbnail/20240625/4cfca407a9cda.png",
    "msapplication-square310x310logo":
      "https://cdn.imweb.me/thumbnail/20240625/8158baa507984.png",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#363636",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex flex-col">{children}</body>
    </html>
  );
}
