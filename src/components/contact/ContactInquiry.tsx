"use client";

import { useEffect, useState } from "react";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";

type Status = "idle" | "sending" | "done" | "error";

const EMPTY = {
  company: "",
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const inputClass =
  "h-[42px] w-full rounded-[3px] border border-[#ddd] bg-white px-3 text-[15px] text-ink outline-none placeholder:text-[#aaa] focus:border-brand";

export default function ContactInquiry({
  label,
  subject,
}: {
  label: string;
  subject?: string;
}) {
  const locale = useLocale();
  const t = chrome[locale].contact;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ ...EMPTY, subject: subject ?? "" });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function openDialog() {
    setStatus("idle");
    setForm({ ...EMPTY, subject: subject ?? "" });
    setOpen(true);
  }

  function field(key: keyof typeof EMPTY) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          locale,
          page: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="inline-block rounded-[2px] border border-brand bg-paper px-[22px] py-[6px]"
      >
        <span className="text-[16px] leading-[24px] text-brand">{label}</span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 px-[15px] py-[40px] pc:items-center pc:py-[60px]"
        >
          <div className="w-full max-w-[560px] rounded-[4px] bg-white p-[20px] pc:p-[30px]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[20px] font-bold text-ink pc:text-[24px]">
                  {t.title}
                </h2>
                <p className="mt-[6px] text-[13px] leading-[20px] text-ink/60">
                  {t.intro}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="shrink-0 text-[24px] leading-none text-ink/40 transition-colors hover:text-ink"
              >
                ×
              </button>
            </div>

            {status === "done" ? (
              <div className="py-[40px] text-center">
                <p className="text-[16px] font-bold text-ink">
                  {t.successTitle}
                </p>
                <p className="mt-[8px] text-[14px] text-ink/60">
                  {t.successBody}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-[24px] rounded-[3px] bg-brand px-[22px] py-[9px] text-[14px] font-semibold text-white transition-colors hover:bg-ink"
                >
                  {t.close}
                </button>
              </div>
            ) : (
              <form
                className="mt-[20px] flex flex-col gap-[14px]"
                onSubmit={onSubmit}
              >
                <div className="grid gap-[14px] pc:grid-cols-2">
                  <label className="flex flex-col gap-[6px]">
                    <span className="text-[13px] font-semibold text-ink">
                      {t.name} <span className="text-brand-red">*</span>
                    </span>
                    <input
                      className={inputClass}
                      value={form.name}
                      onChange={field("name")}
                      maxLength={120}
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-[6px]">
                    <span className="text-[13px] font-semibold text-ink">
                      {t.company}
                    </span>
                    <input
                      className={inputClass}
                      value={form.company}
                      onChange={field("company")}
                      maxLength={200}
                    />
                  </label>
                  <label className="flex flex-col gap-[6px]">
                    <span className="text-[13px] font-semibold text-ink">
                      {t.email} <span className="text-brand-red">*</span>
                    </span>
                    <input
                      type="email"
                      className={inputClass}
                      value={form.email}
                      onChange={field("email")}
                      maxLength={254}
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-[6px]">
                    <span className="text-[13px] font-semibold text-ink">
                      {t.phone}
                    </span>
                    <input
                      className={inputClass}
                      value={form.phone}
                      onChange={field("phone")}
                      maxLength={60}
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-[6px]">
                  <span className="text-[13px] font-semibold text-ink">
                    {t.subject}
                  </span>
                  <input
                    className={inputClass}
                    value={form.subject}
                    onChange={field("subject")}
                    maxLength={200}
                  />
                </label>
                <label className="flex flex-col gap-[6px]">
                  <span className="text-[13px] font-semibold text-ink">
                    {t.message} <span className="text-brand-red">*</span>
                  </span>
                  <textarea
                    className="min-h-[130px] w-full rounded-[3px] border border-[#ddd] bg-white px-3 py-[10px] text-[15px] text-ink outline-none placeholder:text-[#aaa] focus:border-brand"
                    value={form.message}
                    onChange={field("message")}
                    rows={5}
                    maxLength={5000}
                    required
                  />
                </label>

                {status === "error" ? (
                  <p className="text-[13px] text-brand-red">{t.error}</p>
                ) : null}

                <div className="mt-[4px] flex justify-end">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-[3px] bg-brand px-[24px] py-[10px] text-[14px] font-semibold text-white transition-colors hover:bg-ink disabled:opacity-60"
                  >
                    {status === "sending" ? t.sending : t.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
