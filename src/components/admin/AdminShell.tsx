"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar, { AdminNavStrip } from "@/components/admin/AdminSidebar";

type AdminShellProps = {
  email: string;
  children: React.ReactNode;
};

export default function AdminShell({ email, children }: AdminShellProps) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-[1280px] gap-6 px-[15px] py-6">
        <AdminSidebar
          email={email}
          signingOut={signingOut}
          onSignOut={handleSignOut}
        />
        <main className="min-w-0 flex-1">
          <div className="mb-4 rounded-[4px] border border-neutral-200 bg-paper px-4 py-3 pc:hidden">
            <p className="text-[13px] leading-[1.6] text-neutral-600">
              관리자 콘텐츠 편집은 PC 화면(가로 992px 이상)에 최적화되어
              있습니다.
            </p>
            <div className="mt-3">
              <AdminNavStrip />
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
