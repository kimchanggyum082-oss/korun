import type { Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/app/globals.css";
import { getAdminLocale } from "@/lib/i18n/admin-server";

export const viewport: Viewport = {
  themeColor: "#363636",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getAdminLocale();
  return (
    <html lang={locale} className="h-full antialiased">
      <body className="flex flex-col">{children}</body>
    </html>
  );
}
