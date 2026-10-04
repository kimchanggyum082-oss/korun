"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminDict } from "@/lib/i18n/admin";
import { localizeHref } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";

export default function LoginForm({ locale }: { locale: Locale }) {
  const t = adminDict[locale].login;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(data?.error ?? t.failed);
        setPending(false);
        return;
      }
      router.replace(localizeHref("/admin", locale));
      router.refresh();
    } catch {
      setError(t.networkError);
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[420px] rounded-xl border border-neutral-200 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.12)]"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-sm font-bold text-white">
          K
        </span>
        <span className="text-sm font-semibold tracking-[0.18em] text-neutral-400 uppercase">
          {t.brand}
        </span>
      </div>

      <h1 className="mt-6 text-[22px] font-bold text-ink">{t.title}</h1>
      <p className="mt-1.5 text-sm text-neutral-500">{t.subtitle}</p>

      <div className="mt-7 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="admin-email"
            className="text-[13px] font-semibold text-ink"
          >
            {t.email}
          </label>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@korun.co.kr"
            className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm text-ink transition-colors outline-none placeholder:text-neutral-400 hover:border-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="admin-password"
            className="text-[13px] font-semibold text-ink"
          >
            {t.password}
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm text-ink transition-colors outline-none placeholder:text-neutral-400 hover:border-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-md border border-[#f0c2c2] bg-[#fdf3f3] px-3 py-2 text-[13px] text-[#a51c1c]"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 h-11 w-full rounded-md bg-brand text-sm font-semibold text-white transition-colors outline-none hover:bg-ink focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? t.submitting : t.submit}
      </button>

      <p className="mt-6 border-t border-neutral-100 pt-4 text-xs leading-relaxed text-neutral-400">
        {t.footnote}
      </p>
    </form>
  );
}
