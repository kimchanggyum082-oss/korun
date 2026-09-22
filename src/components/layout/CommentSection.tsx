"use client";

import { useState } from "react";
import { PictureIcon, RefreshIcon } from "@/components/service/ServiceIcons";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";

type Comment = { name: string; body: string; date: string };

export default function CommentSection({
  variant = "guest",
}: {
  initialCount?: number;
  variant?: "guest" | "login";
}) {
  const t = chrome[useLocale()];
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [body, setBody] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) {
      setError(t.comment.validation.nameAndBody);
      return;
    }
    setError("");
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    setComments((prev) => [
      { name: name.trim(), body: body.trim(), date },
      ...prev,
    ]);
    setName("");
    setPassword("");
    setBody("");
    setCaptcha("");
  };

  const fields = (
    <>
      <div className="mb-[10px] flex">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.comment.name}
          aria-label={t.comment.name}
          className="mr-[2%] h-[43.6px] w-[49%] border border-[rgba(128,128,128,0.2)] px-4 py-2 text-[16px] leading-[25.6px] text-ink outline-none pc:mr-[10px] pc:h-[42px] pc:w-[150px] pc:text-[15px] pc:leading-[24px]"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.comment.password}
          aria-label={t.comment.password}
          className="h-[43.6px] w-[49%] border border-[rgba(128,128,128,0.2)] px-4 py-2 text-[16px] leading-[25.6px] text-ink outline-none pc:h-[42px] pc:w-[150px] pc:text-[15px] pc:leading-[24px]"
        />
      </div>
      <div className="border border-[rgba(128,128,128,0.2)] p-[12px] pc:h-[140px] pc:p-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={t.comment.bodyPlaceholder}
          aria-label={t.comment.body}
          className="mb-[12px] h-[62px] w-full resize-none align-top text-[16px] leading-[25.6px] text-ink outline-none pc:text-[15px] pc:leading-[24px]"
        />
        <div className="flex items-center justify-between">
          <span className="flex h-[26px] w-[26px] items-center justify-center text-ink">
            <PictureIcon />
          </span>
          <button
            type="submit"
            className="h-[32px] border border-[#363636] bg-[#363636] px-5 py-[6px] text-[12px] leading-[18px] text-white"
          >
            {t.comment.submit}
          </button>
        </div>
      </div>
      <div className="mt-[16px] pc:h-[40px]">
        <div className="flex flex-wrap items-center">
          <div className="mr-[16px] flex items-center gap-[8px]">
            <span className="flex h-[30px] w-[113px] items-center justify-center gap-[3px] bg-[#f0eef4] text-[19px] font-bold tracking-[1px] text-[#5b3a7a]">
              gvdE4
            </span>
            <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-neutral-300 text-neutral-500">
              <RefreshIcon />
            </span>
          </div>
          <input
            type="text"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            placeholder={t.comment.captchaPlaceholder}
            aria-label={t.comment.captcha}
            className="h-[40px] w-[185px] border border-[#dbdee3] bg-white px-[10px] text-[14px] leading-[20px] text-[#212121] outline-none pc:w-[200px]"
          />
          <span className="mt-[8px] text-[14px] leading-[24px] text-[#9fa3ab] pc:mt-0 pc:ml-4">
            {t.comment.captchaHint}
          </span>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-[12px] text-brand-red pc:text-[13px]">
          {error}
        </p>
      )}
    </>
  );

  const loginBox = (
    <div className="border border-[rgba(128,128,128,0.2)] p-[12px] pc:h-[140px] pc:p-4">
      <textarea
        disabled
        placeholder={t.comment.loginRequired}
        aria-label={t.comment.body}
        className="mb-[12px] h-[62px] w-full resize-none align-top text-[16px] leading-[25.6px] text-ink outline-none pc:text-[15px] pc:leading-[24px]"
      />
      <div className="flex justify-end">
        <button
          type="button"
          disabled
          className="h-[32px] border border-[#363636] bg-[#363636] px-5 py-[6px] text-[12px] leading-[18px] text-white"
        >
          {t.comment.submit}
        </button>
      </div>
    </div>
  );

  const form = (
    <div className="mt-[30px] pt-[10px]">
      <form onSubmit={variant === "login" ? undefined : handleSubmit}>
        {variant === "login" ? loginBox : fields}
      </form>
    </div>
  );

  return (
    <div className="pc:mb-[24px]">
      {form}
      <ul className="pc:hidden">
        {comments.map((c, i) => (
          <li
            key={i}
            className="border-b border-neutral-100 pb-4 last:border-0"
          >
            <div className="flex items-center gap-2 text-[13px]">
              <span className="font-semibold text-ink">{c.name}</span>
              <span className="text-neutral-400">{c.date}</span>
            </div>
            <p className="mt-1.5 whitespace-pre-line text-[13px] leading-[1.6] text-neutral-700">
              {c.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
