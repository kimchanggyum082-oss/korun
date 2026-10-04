import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getAdminSession } from "@/lib/auth/session";
import { adminDict } from "@/lib/i18n/admin";
import { getAdminLocale } from "@/lib/i18n/admin-server";
import { localizeHref } from "@/lib/i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  return {
    title: `${adminDict[locale].login.metaTitle} | KORUN`,
    robots: { index: false, follow: false },
  };
}

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  const locale = await getAdminLocale();
  if (session) redirect(localizeHref("/admin", locale));

  return (
    <main className="flex min-h-dvh items-center justify-center bg-paper px-6 py-16">
      <LoginForm locale={locale} />
    </main>
  );
}
