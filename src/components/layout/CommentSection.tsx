"use client";

import { useState } from "react";

type Comment = { name: string; body: string; date: string };

/**
 * Frontend-only comment section (no backend / database yet).
 * Mirrors the original non-member comment form (name + password + textarea +
 * submit) and renders submitted comments locally so the UI is fully interactive.
 */
export default function CommentSection({
  initialCount = 0,
}: {
  initialCount?: number;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const total = initialCount + comments.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) {
      setError("이름과 댓글 내용을 입력해 주세요.");
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
  };

  return (
    <div className="mt-8 border-t border-neutral-200 pt-6">
      <p className="mb-4 text-[14px] font-bold text-ink md:text-[15px]">
        댓글 {total}
      </p>

      {/* Leave comment form (non-member) */}
      <form
        onSubmit={handleSubmit}
        className="rounded-md border border-neutral-200 bg-neutral-50 p-3 md:p-4"
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            className="w-full rounded border border-neutral-200 bg-white px-3 py-2 text-[13px] text-ink outline-none focus:border-brand sm:w-40 md:text-[14px]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full rounded border border-neutral-200 bg-white px-3 py-2 text-[13px] text-ink outline-none focus:border-brand sm:w-40 md:text-[14px]"
          />
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="댓글을 남겨주세요"
          rows={3}
          className="mt-2 w-full resize-none rounded border border-neutral-200 bg-white px-3 py-2 text-[13px] text-ink outline-none focus:border-brand md:text-[14px]"
        />
        <div className="mt-2 flex items-center justify-between">
          {error ? (
            <span className="text-[12px] text-brand-red">{error}</span>
          ) : (
            <span className="text-[12px] text-neutral-400">
              비회원 댓글은 비밀번호로 관리됩니다.
            </span>
          )}
          <button
            type="submit"
            className="bg-ink px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand md:text-[14px]"
          >
            작성
          </button>
        </div>
      </form>

      {/* Submitted comments */}
      <ul className="mt-5 space-y-4">
        {comments.length === 0 && (
          <li className="text-[13px] text-neutral-400 md:text-[14px]">
            등록된 댓글이 없습니다.
          </li>
        )}
        {comments.map((c, i) => (
          <li
            key={i}
            className="border-b border-neutral-100 pb-4 last:border-0"
          >
            <div className="flex items-center gap-2 text-[13px]">
              <span className="font-semibold text-ink">{c.name}</span>
              <span className="text-neutral-400">{c.date}</span>
            </div>
            <p className="mt-1.5 whitespace-pre-line text-[13px] leading-[1.6] text-neutral-700 md:text-[14px]">
              {c.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
