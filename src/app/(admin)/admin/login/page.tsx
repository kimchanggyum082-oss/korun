import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getAdminSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "관리자 로그인 | 코런",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <main className="flex min-h-dvh items-center justify-center bg-paper px-6 py-16">
      <LoginForm />
    </main>
  );
}
